import 'server-only';
import { z } from 'zod';
import { requestBucket, reserveRequest } from '@/lib/studioRateLimit';
import { SITE_URL } from '@/lib/site';

const hour = 3600000;
export const emailFields = {
  email:z.string().trim().max(254).email(),
  website:z.string().max(150).optional(),
};

export function emailResponse(body:Record<string,unknown>, status=200, retryAfter?:number) {
  return Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',
    ...(retryAfter?{'Retry-After':String(retryAfter)}:{})}});
}

export async function readEmailRequest(req:Request, limit:number) {
  const origin = req.headers.get('origin');
  if ((origin && origin!==SITE_URL && origin!==new URL(req.url).origin) || req.headers.get('sec-fetch-site')==='cross-site') {
    return emailResponse({error:'Submit from this website.'},403);
  }
  if (!/^application\/json(?:;|$)/i.test(req.headers.get('content-type') ?? '')) {
    return emailResponse({error:'Send a JSON submission.'},415);
  }
  if (Number(req.headers.get('content-length')) > limit) return emailResponse({error:'This submission is too large.'},413);
  if (!req.body) return emailResponse({error:'Enter an email address.'},400);
  const reader = req.body.getReader();
  const decoder = new TextDecoder('utf-8',{fatal:true});
  let bytes = 0;
  let content = '';
  try {
    for (;;) {
      const {value,done} = await reader.read();
      if (done) break;
      bytes+=value.byteLength;
      if (bytes>limit) {
        await reader.cancel();
        return emailResponse({error:'This submission is too large.'},413);
      }
      content+=decoder.decode(value,{stream:true});
    }
    return {body:JSON.parse(content+decoder.decode()) as unknown};
  } catch { return emailResponse({error:'Check the submitted details and try again.'},400); }
  finally { reader.releaseLock(); }
}

export async function emailQuota(req:Request, scope:'subscribe'|'blueprint', email:string) {
  const retry = await reserveRequest('email-'+scope,requestBucket(req),scope==='blueprint'?3:5,hour);
  if (retry) return retry;
  const recipient = await reserveRequest('email-'+scope+'-recipient',email.toLowerCase(),2,hour);
  if (recipient) return recipient;
  return reserveRequest('email-all-outgoing','global',100,hour);
}
