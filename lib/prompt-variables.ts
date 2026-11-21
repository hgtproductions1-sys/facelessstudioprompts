export type PromptValues = Record<string, string>;
type Token = { text: string; key: string; label: string };
type Segment = { text: string; key?: never } | Token;

const sharedGroups = {
  TOPIC: ['PASTE YOUR TOPIC', 'PASTE TOPIC', 'YOUR TOPIC', 'VIDEO TOPIC'],
  NICHE: ['PASTE NICHE', 'PASTE YOUR NICHE', 'YOUR NICHE', 'CHANNEL NICHE'],
  AUDIENCE: ['TARGET AUDIENCE', 'YOUR AUDIENCE'],
  STYLE: ['VISUAL STYLE', 'ART STYLE'],
  CHARACTER: ['CHARACTER DESCRIPTION', 'MAIN CHARACTER'],
};
const shared = new Map(Object.entries(sharedGroups)
  .flatMap(([key, variations]) => [key, ...variations].map(variation => [variation, key] as const)));

export function parsePromptVariables(prompt: string, promptId: string) {
  const segments: Segment[] = [];
  const fields = new Map<string, Token>();
  let end = 0;
  for (const match of prompt.matchAll(/\[([A-Z0-9 _/-]{2,48})\](?!\()/g)) {
    const name = match[1].trim().replace(/\s+/g, ' ');
    if (!name) continue;
    const sharedKey = shared.get(name);
    const key = sharedKey ?? promptId + ':' + name;
    const label = (sharedKey ?? name).toLowerCase().replace(/_/g, ' ').replace(/^./, first => first.toUpperCase());
    const token = { text: match[0], key, label };
    if (match.index > end) segments.push({ text: prompt.slice(end, match.index) });
    segments.push(token);
    if (!fields.has(key)) fields.set(key, token);
    end = match.index + match[0].length;
  }
  if (end < prompt.length) segments.push({ text: prompt.slice(end) });
  return { segments, fields: [...fields.values()] };
}

export function fillPrompt(segments: Segment[], values: PromptValues) {
  return segments.map(segment => segment.key ? values[segment.key]?.trim() || segment.text : segment.text).join('');
}

const normalizedNiche = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '');
export function studioPromptHref(values: PromptValues, niches: { slug: string; name: string }[]) {
  const query = new URLSearchParams();
  const topic = values.TOPIC?.trim().slice(0, 300);
  if (topic && topic.length >= 3) query.set('topic', topic);
  const name = normalizedNiche(values.NICHE ?? '');
  const niche = name && niches.find(item => normalizedNiche(item.name) === name || normalizedNiche(item.slug) === name);
  if (niche) query.set('niche', niche.slug);
  return '/studio' + (query.size ? '?' + query : '');
}
