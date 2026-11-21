import { z } from 'zod';
import { newsletterConfig, studioDeliveryConfig, trackerPath } from '@/lib/emailConfig';
import { addNewsletterSubscriber, sendTracker } from '@/lib/emailDelivery';
import { emailFields, emailQuota, emailResponse, readEmailRequest } from '@/lib/emailRequests';

export const runtime = 'nodejs';
const schema = z.object(emailFields);

export async function POST(req:Request) {
  const config = newsletterConfig();
  if (!config) return emailResponse({error:'Email signups are currently closed.'},503);
  const data = await readEmailRequest(req,2048);
  if (data instanceof Response) return data;
  const parsed = schema.safeParse(data.body);
  if (!parsed.success) return emailResponse({error:'Enter a valid email address.'},400);
  const {email,website} = parsed.data;
  if (website) return emailResponse({ok:true});
  try {
    const retry = await emailQuota(req,'subscribe',email);
    if (retry) return emailResponse({error:'Too many recent requests. Try again later.'},429,retry);
    const confirmation = await addNewsletterSubscriber(config,email);
    const delivery = studioDeliveryConfig();
    let trackerEmailed = false;
    if (delivery) {
      try { await sendTracker(delivery,email); trackerEmailed = true; } catch { /* The tracker remains downloadable. */ }
    }
    return emailResponse({ok:true,confirmation,trackerEmailed,tracker:trackerPath});
  } catch {
    return emailResponse({error:'We could not save the signup. Try again shortly.'},503);
  }
}
