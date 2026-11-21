import {configuredHttpsUrl} from './affiliates';

export interface StarterKit {
  nicheSlug: string;
  title: string;
  description: string;
  includes: readonly string[];
  productUrl: string;
}

type Environment = Readonly<Record<string, string | undefined>>;

function validText(value: unknown, maximum: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maximum;
}

function parseStarterKit(value: unknown): StarterKit | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const {nicheSlug, title, description, includes, productUrl} = value as Record<string, unknown>;
  if (typeof nicheSlug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(nicheSlug)
    || !validText(title, 150) || !validText(description, 400)
    || !Array.isArray(includes) || includes.length === 0 || includes.length > 6
    || !includes.every(item => validText(item, 115))) return undefined;

  const url = configuredHttpsUrl(productUrl);
  if (!url || url.pathname === '/' || url.hash) return undefined;
  const productListing = /\.lemonsqueezy\.com$/.test(url.hostname) && /^\/(?:checkout\/)?buy\/[a-z0-9-]+\/?$/i.test(url.pathname)
    || /(^|\.)gumroad\.com$/.test(url.hostname) && /^\/l\/[a-z0-9_-]+\/?$/i.test(url.pathname)
    || url.hostname === 'buy.stripe.com' && /^\/[a-z0-9]+\/?$/i.test(url.pathname);
  if (!productListing) return undefined;
  const items = [...new Set(includes.map(item => item.trim()))];
  return {nicheSlug, title: title.trim(), description: description.trim(), includes: items, productUrl: url.href};
}

export function getStarterKit(slug: string, env: Environment = process.env) {
  if (env.NEXT_PUBLIC_STARTER_KITS_ENABLED !== 'true' || !env.STARTER_KITS_JSON) return undefined;
  let value: unknown;
  try {
    value = JSON.parse(env.STARTER_KITS_JSON);
  } catch {
    return undefined;
  }
  if (!Array.isArray(value)) return undefined;
  const kits = value.map(parseStarterKit).filter(kit => kit?.nicheSlug === slug);
  return kits.length === 1 ? kits[0] : undefined;
}
