export const affiliateTools = {
  'google-flow': {name: 'Google Flow', directUrl: 'https://flow.google/', env: 'NEXT_PUBLIC_AFFILIATE_GOOGLE_FLOW'},
  runway: {name: 'Runway', directUrl: 'https://runway.com/', env: 'NEXT_PUBLIC_AFFILIATE_RUNWAY'},
  kling: {name: 'Kling', directUrl: 'https://klingai.com/', env: 'NEXT_PUBLIC_AFFILIATE_KLING'},
  midjourney: {name: 'Midjourney', directUrl: 'https://www.midjourney.com/', env: 'NEXT_PUBLIC_AFFILIATE_MIDJOURNEY'},
  leonardo: {name: 'Leonardo', directUrl: 'https://leonardo.ai/', env: 'NEXT_PUBLIC_AFFILIATE_LEONARDO'},
  elevenlabs: {name: 'ElevenLabs', directUrl: 'https://elevenlabs.io/', env: 'NEXT_PUBLIC_AFFILIATE_ELEVENLABS'},
  capcut: {name: 'CapCut', directUrl: 'https://www.capcut.com/', env: 'NEXT_PUBLIC_AFFILIATE_CAPCUT'},
  'davinci-resolve': {name: 'DaVinci Resolve', directUrl: 'https://www.blackmagicdesign.com/products/davinciresolve', env: 'NEXT_PUBLIC_AFFILIATE_DAVINCI_RESOLVE'},
  suno: {name: 'Suno', directUrl: 'https://suno.com/', env: 'NEXT_PUBLIC_AFFILIATE_SUNO'},
  'epidemic-sound': {name: 'Epidemic Sound', directUrl: 'https://www.epidemicsound.com/', env: 'NEXT_PUBLIC_AFFILIATE_EPIDEMIC_SOUND'},
} as const;

export type AffiliateToolId = keyof typeof affiliateTools;
type Environment = Readonly<Record<string, string | undefined>>;

export function configuredHttpsUrl(value: unknown) {
  if (typeof value !== 'string' || !value.trim() || /[\x00-\x20\x7f\\]/.test(value.trim())) return undefined;
  try {
    const url = new URL(value.trim());
    const host = url.hostname;
    if (url.protocol !== 'https:' || url.username || url.password || url.port
      || !host.includes('.') || /^(?:\d+\.)+\d+$/.test(host) || host === 'localhost' || /\.(?:localhost|local|internal)$/.test(host)) return undefined;
    return url;
  } catch {
    return undefined;
  }
}

export function resolveAffiliate(toolId: AffiliateToolId, env: Environment = process.env) {
  const {name, directUrl, env: key} = affiliateTools[toolId];
  const affiliateUrl = configuredHttpsUrl(env[key])?.href;
  const isAffiliateActive = env.NEXT_PUBLIC_AFFILIATES_ENABLED === 'true'
    && !!affiliateUrl && affiliateUrl !== new URL(directUrl).href;
  return {
    name,
    directUrl,
    affiliateUrl,
    isAffiliateActive,
    href: isAffiliateActive ? affiliateUrl : directUrl,
    target: '_blank',
    rel: isAffiliateActive ? 'sponsored noopener noreferrer' : 'noopener noreferrer',
  } as const;
}

export type ResolvedAffiliate = ReturnType<typeof resolveAffiliate>;

export function hasActiveAffiliateLinks(env: Environment = process.env) {
  return (Object.keys(affiliateTools) as AffiliateToolId[]).some(tool => resolveAffiliate(tool, env).isAffiliateActive);
}

export const affiliateDisclosureCopy = 'Some tool links below are affiliate links. If you subscribe through them, we may earn a commission at no extra cost to you.';

export function affiliateDisclosureStatus(env?: Environment) {
  return hasActiveAffiliateLinks(env)
    ? 'Some tool links in the AI Tools Directory and niche playbooks use affiliate tracking. We may earn a commission when you subscribe through a labeled link at no extra cost to you.'
    : 'The AI Tools Directory and niche playbooks currently use direct provider links.';
}

type StackEntry = {tool: AffiliateToolId; role: string};
const flow: StackEntry = {tool: 'google-flow', role: 'Generate one focused scene'};
const runway: StackEntry = {tool: 'runway', role: 'Animate an approved frame'};
const kling: StackEntry = {tool: 'kling', role: 'Direct image-to-video motion'};
const midjourney: StackEntry = {tool: 'midjourney', role: 'Build distinct reference frames'};
const leonardo: StackEntry = {tool: 'leonardo', role: 'Develop character or prop references'};
const elevenlabs: StackEntry = {tool: 'elevenlabs', role: 'Create narration with an approved voice'};
const capcut: StackEntry = {tool: 'capcut', role: 'Assemble a short edit and captions'};
const resolve: StackEntry = {tool: 'davinci-resolve', role: 'Edit, grade, and mix your timeline'};
const suno: StackEntry = {tool: 'suno', role: 'Explore music drafts and check usage terms'};
const epidemic: StackEntry = {tool: 'epidemic-sound', role: 'Explore licensed music or sound effects'};

const nicheStacks: Record<string, readonly StackEntry[]> = {
  'ai-cat-and-pet-stories': [leonardo, runway, elevenlabs, capcut],
  'ai-animal-cooking': [midjourney, kling, capcut],
  'pov-immersive-vlogs': [flow, kling, capcut],
  'anime-fight-versus': [midjourney, runway, capcut],
  'stickman-explainer-and-skits': [leonardo, elevenlabs, capcut],
  'ai-asmr-cooking-cleaning-restoration': [flow, kling, resolve],
  'zombie-apocalypse-drama': [leonardo, runway, epidemic, resolve],
  'bible-and-mythology-anime': [midjourney, elevenlabs, resolve],
  'ai-influencer-product-reviews': [leonardo, elevenlabs, capcut],
  'lullaby-and-sleep-music': [midjourney, suno, resolve],
  'analog-horror-and-unsolved-mysteries': [runway, epidemic, resolve],
  'diy-cardboard-and-miniature-builds': [kling, capcut],
  'vegetable-and-fruit-carving': [kling, resolve],
  'ai-car-wash-and-restoration': [leonardo, kling, capcut],
  'miniature-asmr-cooking': [flow, kling, resolve],
  'nostalgia-toy-unboxing': [leonardo, capcut],
  'ranking-and-top-5-countdowns': [leonardo, elevenlabs, capcut],
  'vox-style-paper-cut-commentary': [midjourney, elevenlabs, epidemic, resolve],
  'elderly-wisdom-and-stoic-long-form': [midjourney, elevenlabs, resolve],
  'ai-music-videos': [midjourney, suno, runway, resolve],
  'cartoon-horror-illustration': [midjourney, epidemic, capcut],
  'pixel-game-pov': [leonardo, kling, capcut],
  'celebrity-evolution-and-glow-up': [elevenlabs, capcut],
  'poor-vs-rich-animals-ai-skits': [leonardo, elevenlabs, capcut],
};

export function resolveNicheProductionStack(slug: string, env?: Environment) {
  if (!Object.hasOwn(nicheStacks, slug)) return [];
  return nicheStacks[slug].map(({tool, role}) => ({tool, role, link: resolveAffiliate(tool, env)}));
}
