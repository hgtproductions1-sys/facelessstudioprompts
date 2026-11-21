import {IMPORTED_NICHE_COMPARISON} from './importedNiches.ts';

export type NicheComparisonMeta = {
  primaryFormat: 'Shorts (9:16)' | 'Long-Form (16:9)' | 'Both';
  typicalVideoLength: string;
  estimatedEffort: 'Low (1–2h)' | 'Medium (2–5h)' | 'High (5h+)';
  voiceoverType: 'None / SFX Only' | 'Optional' | 'Required (AI or Human)';
  characterConsistencyNeed: 'Low' | 'Medium' | 'High';
  policyDisclosureSensitivity: 'Standard' | 'Elevated (Synthetic / Sensitive)';
  beginnerFriendlyScore: 1 | 2 | 3;
};

const shorts = 'Shorts (9:16)';
const long = 'Long-Form (16:9)';
const low = 'Low (1–2h)';
const medium = 'Medium (2–5h)';
const high = 'High (5h+)';
const none = 'None / SFX Only';
const narration = 'Required (AI or Human)';
const elevated = 'Elevated (Synthetic / Sensitive)';

export const NICHE_COMPARISON: Record<string, NicheComparisonMeta> = {
  ...IMPORTED_NICHE_COMPARISON,
  'ai-cat-and-pet-stories': {primaryFormat: shorts, typicalVideoLength: '30–60s', estimatedEffort: medium,
    voiceoverType: 'Optional', characterConsistencyNeed: 'High', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'ai-animal-cooking': {primaryFormat: shorts, typicalVideoLength: '8–20s', estimatedEffort: high,
    voiceoverType: 'Optional', characterConsistencyNeed: 'High', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 1},
  'pov-immersive-vlogs': {primaryFormat: shorts, typicalVideoLength: '8–30s', estimatedEffort: low,
    voiceoverType: 'Optional', characterConsistencyNeed: 'Low', policyDisclosureSensitivity: elevated, beginnerFriendlyScore: 3},
  'anime-fight-versus': {primaryFormat: shorts, typicalVideoLength: '8–20s', estimatedEffort: medium,
    voiceoverType: 'Optional', characterConsistencyNeed: 'High', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'stickman-explainer-and-skits': {primaryFormat: 'Both', typicalVideoLength: '30–90s', estimatedEffort: low,
    voiceoverType: narration, characterConsistencyNeed: 'Low', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 3},
  'ai-asmr-cooking-cleaning-restoration': {primaryFormat: shorts, typicalVideoLength: '8–30s', estimatedEffort: medium,
    voiceoverType: none, characterConsistencyNeed: 'Low', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'zombie-apocalypse-drama': {primaryFormat: shorts, typicalVideoLength: '30–60s', estimatedEffort: high,
    voiceoverType: 'Optional', characterConsistencyNeed: 'High', policyDisclosureSensitivity: elevated, beginnerFriendlyScore: 1},
  'bible-and-mythology-anime': {primaryFormat: 'Both', typicalVideoLength: '45–90s', estimatedEffort: medium,
    voiceoverType: narration, characterConsistencyNeed: 'High', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'ai-influencer-product-reviews': {primaryFormat: 'Both', typicalVideoLength: '30–90s', estimatedEffort: high,
    voiceoverType: narration, characterConsistencyNeed: 'High', policyDisclosureSensitivity: elevated, beginnerFriendlyScore: 1},
  'lullaby-and-sleep-music': {primaryFormat: long, typicalVideoLength: '1–3h', estimatedEffort: medium,
    voiceoverType: none, characterConsistencyNeed: 'Low', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 3},
  'analog-horror-and-unsolved-mysteries': {primaryFormat: 'Both', typicalVideoLength: '45–90s', estimatedEffort: high,
    voiceoverType: 'Optional', characterConsistencyNeed: 'Medium', policyDisclosureSensitivity: elevated, beginnerFriendlyScore: 1},
  'diy-cardboard-and-miniature-builds': {primaryFormat: 'Both', typicalVideoLength: '30–90s', estimatedEffort: medium,
    voiceoverType: 'Optional', characterConsistencyNeed: 'Low', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'vegetable-and-fruit-carving': {primaryFormat: shorts, typicalVideoLength: '8–30s', estimatedEffort: medium,
    voiceoverType: none, characterConsistencyNeed: 'Low', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'ai-car-wash-and-restoration': {primaryFormat: shorts, typicalVideoLength: '30–60s', estimatedEffort: medium,
    voiceoverType: none, characterConsistencyNeed: 'Medium', policyDisclosureSensitivity: elevated, beginnerFriendlyScore: 2},
  'miniature-asmr-cooking': {primaryFormat: shorts, typicalVideoLength: '15–45s', estimatedEffort: medium,
    voiceoverType: none, characterConsistencyNeed: 'Medium', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'nostalgia-toy-unboxing': {primaryFormat: 'Both', typicalVideoLength: '30–60s', estimatedEffort: low,
    voiceoverType: 'Optional', characterConsistencyNeed: 'Low', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 3},
  'ranking-and-top-5-countdowns': {primaryFormat: 'Both', typicalVideoLength: '30–60s', estimatedEffort: low,
    voiceoverType: narration, characterConsistencyNeed: 'Low', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 3},
  'vox-style-paper-cut-commentary': {primaryFormat: 'Both', typicalVideoLength: '1–3 min', estimatedEffort: high,
    voiceoverType: narration, characterConsistencyNeed: 'Low', policyDisclosureSensitivity: elevated, beginnerFriendlyScore: 1},
  'elderly-wisdom-and-stoic-long-form': {primaryFormat: long, typicalVideoLength: '8–20 min', estimatedEffort: high,
    voiceoverType: narration, characterConsistencyNeed: 'Medium', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'ai-music-videos': {primaryFormat: 'Both', typicalVideoLength: '15–60s', estimatedEffort: medium,
    voiceoverType: none, characterConsistencyNeed: 'Medium', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'cartoon-horror-illustration': {primaryFormat: shorts, typicalVideoLength: '30–90s', estimatedEffort: medium,
    voiceoverType: 'Optional', characterConsistencyNeed: 'High', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
  'pixel-game-pov': {primaryFormat: shorts, typicalVideoLength: '8–30s', estimatedEffort: low,
    voiceoverType: 'Optional', characterConsistencyNeed: 'Low', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 3},
  'celebrity-evolution-and-glow-up': {primaryFormat: shorts, typicalVideoLength: '30–60s', estimatedEffort: medium,
    voiceoverType: 'Optional', characterConsistencyNeed: 'High', policyDisclosureSensitivity: elevated, beginnerFriendlyScore: 2},
  'poor-vs-rich-animals-ai-skits': {primaryFormat: shorts, typicalVideoLength: '20–60s', estimatedEffort: medium,
    voiceoverType: 'Optional', characterConsistencyNeed: 'High', policyDisclosureSensitivity: 'Standard', beginnerFriendlyScore: 2},
};

export type NicheComparisonRow = {slug: string; name: string} & NicheComparisonMeta;

export const NICHE_COMPARISON_FILTERS = [
  ['all', 'All'],
  ['shorts', 'Shorts'],
  ['long', 'Long-Form'],
  ['no-voiceover', 'No Voiceover Needed'],
  ['beginner', 'Beginner-Friendly'],
  ['low-effort', 'Low Effort'],
] as const;

export type NicheComparisonFilter = typeof NICHE_COMPARISON_FILTERS[number][0];

export function matchesNicheComparison(row: NicheComparisonMeta, filter: NicheComparisonFilter) {
  switch (filter) {
    case 'shorts': return row.primaryFormat === shorts || row.primaryFormat === 'Both';
    case 'long': return row.primaryFormat === long || row.primaryFormat === 'Both';
    case 'no-voiceover': return row.voiceoverType !== narration;
    case 'beginner': return row.beginnerFriendlyScore === 3;
    case 'low-effort': return row.estimatedEffort === low;
    default: return true;
  }
}

export const NICHE_SORT_COLUMNS = [
  ['primaryFormat', 'Format'],
  ['estimatedEffort', 'Effort'],
  ['voiceoverType', 'Voiceover'],
  ['characterConsistencyNeed', 'Consistency'],
  ['beginnerFriendlyScore', 'Beginner fit'],
] as const;

export type NicheSortKey = typeof NICHE_SORT_COLUMNS[number][0];

const SORT_ORDERS = {
  primaryFormat: [shorts, 'Both', long],
  estimatedEffort: [low, medium, high],
  voiceoverType: [none, 'Optional', narration],
  characterConsistencyNeed: ['Low', 'Medium', 'High'],
};

export function compareNicheRows(a: NicheComparisonRow, b: NicheComparisonRow, key: NicheSortKey) {
  if (key === 'beginnerFriendlyScore') return a[key] - b[key];
  return SORT_ORDERS[key].indexOf(a[key]) - SORT_ORDERS[key].indexOf(b[key]);
}
