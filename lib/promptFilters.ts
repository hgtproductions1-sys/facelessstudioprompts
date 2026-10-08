import type {Prompt} from '@/data/promptLibrary';
import {CATEGORY_LABELS} from './categories';
export const PROMPT_LEVELS=['Beginner','Intermediate','Advanced'] as const;
export const PROMPT_TOOLS=['Text assistant','Google Flow / Veo','Runway','Kling','Sora','Image model','Midjourney','Flux','Leonardo'] as const;
export type PromptLevel=typeof PROMPT_LEVELS[number];
export type PromptFormat='Shorts'|'Long-form';
export type PromptInfo={level:PromptLevel;formats:PromptFormat[];tools:string[];guide:string};
const advanced=new Set(['vid-sketch-control','niche-fusion-transformation','char-recurring-cast','vid-ai-drama-english','vid-ai-drama-tagalog']);
const intermediate=new Set(['img-character-sheet','img-4k-upscale','img-b-roll-set','img-storyboard-frames','img-comic-panel','vid-loop-transition','vid-time-of-day-shift','vid-camera-motion-pack','char-turnaround-sheet','char-consistent-template','niche-anime-fight','niche-true-crime-cold-open','niche-ai-whale-pov','niche-3d-cars-challenge','niche-retention-editing','niche-repurpose-shorts']);
const shorts=new Set(['seo-hashtag-generator','seo-shorts-hook-script','vid-asmr','vid-embroidery','vid-loop-transition','vid-hook-first-second','vid-product-spin','niche-quiz-content','niche-daily-prayers','niche-color-mixing']);
const longForm=new Set(['niche-true-crime-cold-open','niche-ai-whale-pov','niche-retention-editing']);
const guides:Record<string,string>={'Image Gen':'write-ai-image-prompts','Video Gen':'write-ai-video-prompts',Character:'consistent-ai-characters',Niche:'choose-faceless-youtube-niche',SEO:'faceless-channel-content-pillars'};
export function getPromptInfo(p:Prompt):PromptInfo{
 const tools=p.category==='Video Gen'?['Google Flow / Veo','Runway','Kling','Sora']:p.category==='Image Gen'||(p.category==='Character'&&p.id!=='char-voice-profile')?['Image model','Midjourney','Flux','Leonardo']:['Text assistant'];
 return {level:advanced.has(p.id)?'Advanced':intermediate.has(p.id)?'Intermediate':'Beginner',formats:shorts.has(p.id)?['Shorts']:longForm.has(p.id)?['Long-form']:['Shorts','Long-form'],tools,guide:guides[p.category]};
}
export type PromptFilters={query?:string;category?:string;level?:string;tool?:string;format?:string;onlySaved?:boolean;saved?:string[]};
export function filterPrompts(prompts:Prompt[],filters:PromptFilters){
 const words=(filters.query||'').trim().toLowerCase().split(/\s+/).filter(Boolean);
 return prompts.filter(p=>{
  const info=getPromptInfo(p);
  const text=[p.title,p.prompt,p.niche,p.tips,CATEGORY_LABELS[p.category],info.level,...info.tools,...info.formats].join(' ').toLowerCase();
  return (!filters.category||p.category===filters.category)&&(!filters.level||info.level===filters.level)&&(!filters.tool||info.tools.includes(filters.tool))&&(!filters.format||info.formats.includes(filters.format as PromptFormat))&&(!filters.onlySaved||filters.saved?.includes(p.id))&&words.every(w=>text.includes(w));
 });
}
export function parseSavedPrompts(value:unknown,validIds:string[]):string[]{
 const raw=Array.isArray(value)?value:value&&typeof value==='object'&&'promptIds' in value?(value as {promptIds:unknown}).promptIds:null;
 if(!Array.isArray(raw))throw new Error('Choose a saved-prompts JSON file exported from this site.');
 return [...new Set(raw.filter((id):id is string=>typeof id==='string'&&validIds.includes(id)))];
}
