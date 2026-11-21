import 'server-only';
import { createHash } from 'node:crypto';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { trackerPath, type DeliveryConfig, type NewsletterConfig } from '@/lib/emailConfig';

async function send(url:string, data:unknown, auth:Record<string,string>) {
  const res = await fetch(url,{
    method:'POST', headers:{'Content-Type':'application/json',...auth}, body:JSON.stringify(data),
    signal:AbortSignal.timeout(6000), cache:'no-store', redirect:'error',
  });
  await res.body?.cancel();
  if (!res.ok) throw new Error('Email provider request failed with status ' + res.status);
}

export async function addNewsletterSubscriber(config:NewsletterConfig, email:string) {
  const id = encodeURIComponent(config.listId);
  const bearer = {Authorization:'Bearer '+config.key};
  switch (config.provider) {
    case 'resend':
      await send('https://api.resend.com/contacts',{email,segments:[{id:config.listId}]},bearer);
      return false;
    case 'kit':
      // Kit's form subscription uses the form's configured incentive/confirmation email.
      await send('https://api.convertkit.com/v3/forms/'+id+'/subscribe',{api_key:config.key,email}, {});
      return true;
    case 'beehiiv':
      await send('https://api.beehiiv.com/v2/publications/'+id+'/subscriptions',
        {email,double_opt_override:'on',reactivate_existing:false,send_welcome_email:true},bearer);
      return true;
    case 'buttondown':
      await send('https://api.buttondown.com/v1/subscribers',
        {email_address:email,...(config.listId?{tags:[config.listId]}:{})},{Authorization:'Token '+config.key});
      return true;
  }
}

async function sendResend(config:DeliveryConfig, email:string, subject:string, text:string) {
  const key = createHash('sha256').update(JSON.stringify([email,subject,text,Math.floor(Date.now()/3600000)])).digest('hex');
  await send('https://api.resend.com/emails',{from:config.from,to:[email],subject,text},
    {Authorization:'Bearer '+config.key,'Idempotency-Key':key});
}

export function sendTracker(config:DeliveryConfig, email:string) {
  return sendResend(config,email,'Your Faceless Production Tracker',
    'Download the tracker and open it in Excel, Sheets, or a compatible spreadsheet app.\n\n'+SITE_URL+trackerPath+
    '\n\nThe Faceless Prompts');
}

function safeLine(text:string) {
  return text.replace(/[\u0000-\u001f\u007f]+/g,' ').replace(/\b(?:[a-z][\w+.-]*:\/\/|www\.)\S+/gi,'[link removed]')
    .replace(/\b[\w-]+(?:\.[\w-]+)*\.[a-z]{2,}(?:\/\S*)?/gi,'[link removed]').replace(/\s+/g,' ').trim();
}

export type BlueprintEmailSummary = {topic:string; niche:string; hook:string; shots:{title:string; time:string; action:string}[]};

export function sendBlueprintSummary(config:DeliveryConfig, email:string, plan:BlueprintEmailSummary) {
  const shots = plan.shots.map((shot,index)=>
    String(index+1)+'. '+safeLine(shot.time)+' '+safeLine(shot.title)+'\n'+safeLine(shot.action)).join('\n\n');
  return sendResend(config,email,'Your Studio blueprint',
    SITE_NAME+' Studio\n\n'+safeLine(plan.topic)+'\n'+safeLine(plan.niche)+'\n\nOpening\n'+safeLine(plan.hook)+
    '\n\nShot plan\n'+shots+'\n\nOpen Studio\n'+SITE_URL+'/studio');
}
