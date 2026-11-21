import { z } from 'zod';
import { newsletterConfig, studioDeliveryConfig } from '@/lib/emailConfig';
import { addNewsletterSubscriber, sendBlueprintSummary } from '@/lib/emailDelivery';
import { emailFields, emailQuota, emailResponse, readEmailRequest } from '@/lib/emailRequests';

export const runtime = 'nodejs';
const schema = z.object({
  ...emailFields,
  newsletter:z.boolean().optional(),
  summary:z.object({
    topic:z.string().trim().min(3).max(300),
    niche:z.string().trim().min(1).max(120),
    hook:z.string().trim().max(300),
    shots:z.array(z.object({title:z.string().max(120),time:z.string().max(35),action:z.string().max(260)})).min(1).max(12),
  }),
});

export async function POST(req:Request) {
  const config = studioDeliveryConfig();
  if (!config) return emailResponse({error:'Email delivery is currently closed. Download the blueprint instead.'},503);
  const data = await readEmailRequest(req,16000);
  if (data instanceof Response) return data;
  const parsed = schema.safeParse(data.body);
  if (!parsed.success) return emailResponse({error:'Check your email address and blueprint details.'},400);
  const {email,website,newsletter,summary} = parsed.data;
  if (website) return emailResponse({ok:true});
  try {
    const retry = await emailQuota(req,'blueprint',email);
    if (retry) return emailResponse({error:'Too many recent requests. Download the blueprint or try again later.'},429,retry);
    await sendBlueprintSummary(config,email,summary);
  } catch {
    return emailResponse({error:'We could not email the blueprint. You can still download it.'},503);
  }
  const signup = newsletter && newsletterConfig();
  if (signup) {
    try {
      if (await emailQuota(req,'subscribe',email)) throw new Error('Signup limit');
      const confirmation = await addNewsletterSubscriber(signup,email);
      return emailResponse({ok:true,subscribed:true,confirmation});
    } catch { return emailResponse({ok:true,subscribed:false}); }
  }
  return emailResponse({ok:true});
}
