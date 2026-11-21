import 'server-only';

export const trackerPath = '/faceless-production-tracker.csv';
export type NewsletterConfig = {provider:'resend'|'kit'|'beehiiv'|'buttondown'; key:string; listId:string};
export type DeliveryConfig = {key:string; from:string};

export function newsletterConfig(): NewsletterConfig | null {
  if (process.env.EMAIL_CAPTURE_ENABLED !== 'true') return null;
  const provider = process.env.EMAIL_PROVIDER?.trim().toLowerCase();
  const key = process.env.EMAIL_API_KEY?.trim();
  const listId = process.env.EMAIL_LIST_ID?.trim() ?? '';
  if (!key) return null;
  if (provider === 'buttondown') return /^[a-z0-9_-]*$/i.test(listId) ? {provider,key,listId} : null;
  if (provider === 'kit') return /^\d+$/.test(listId) ? {provider,key,listId} : null;
  if (provider === 'resend' || provider === 'beehiiv') {
    return /^[a-z0-9_-]{2,100}$/i.test(listId) ? {provider,key,listId} : null;
  }
  return null;
}

export function studioDeliveryConfig(): DeliveryConfig | null {
  if (process.env.EMAIL_CAPTURE_ENABLED !== 'true') return null;
  const from = process.env.EMAIL_FROM?.trim();
  const key = process.env.STUDIO_EMAIL_RESEND_API_KEY?.trim() ||
    (process.env.EMAIL_PROVIDER?.trim().toLowerCase() === 'resend' ? process.env.EMAIL_API_KEY?.trim() : undefined);
  return from && key && !/[\r\n]/.test(from) ? {key,from} : null;
}
