import {IMPORTED_CREATOR_PROMPTS} from './importedCreatorPrompts.ts';
import {IMPORTED_FORMAT_PROMPTS} from './importedFormatPrompts.ts';
import {IMPORTED_STORY_PROMPTS} from './importedStoryPrompts.ts';
import {getNicheBySlug, type NichePage} from './niches.ts';
import type {Prompt} from './promptLibrary';

const sharedPlaybooks: Record<string, string> = {
  'Tagalog Microdrama': 'vertical-microdrama',
  'English Microdrama': 'vertical-microdrama',
  'Mandarin Suspense Microdrama': 'vertical-microdrama',
  'Logo Quiz': 'visual-quiz-shorts',
  'Printed Quiz Sheets': 'visual-quiz-shorts',
  'Illustrated Mystery': 'analog-horror-and-unsolved-mysteries',
};

const nicheByPrompt = new Map<string, NichePage>();
const promptsByNiche = new Map<string, Prompt[]>();
for (const prompt of [...IMPORTED_CREATOR_PROMPTS, ...IMPORTED_FORMAT_PROMPTS, ...IMPORTED_STORY_PROMPTS]) {
  if (!prompt.niche) continue;
  const niche = getNicheBySlug(sharedPlaybooks[prompt.niche] ?? prompt.niche);
  if (!niche) continue;
  nicheByPrompt.set(prompt.id, niche);
  const prompts = promptsByNiche.get(niche.slug) ?? [];
  prompts.push(prompt);
  promptsByNiche.set(niche.slug, prompts);
}

export function getPromptNiche(promptId: string): NichePage | undefined {
  return nicheByPrompt.get(promptId);
}

export function getNichePrompts(slug: string): Prompt[] {
  return promptsByNiche.get(slug) ?? [];
}
