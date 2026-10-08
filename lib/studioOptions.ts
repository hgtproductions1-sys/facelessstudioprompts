export const ENGINES=['Google Flow / Veo','Runway','Kling','Sora','Luma','Pika','Hailuo','Leonardo','Midjourney','Flux','Universal'] as const;
export const STYLES=['Cinematic natural light','Cozy storybook','Documentary realism','Clean illustration','Moody noir','Dreamlike fantasy'] as const;
export const FORMATS=[{id:'short',label:'60-second Short / Reel',seconds:60,ratio:'9:16',shots:6},{id:'story',label:'3-minute story',seconds:180,ratio:'16:9',shots:8},{id:'long',label:'10-minute video',seconds:600,ratio:'16:9',shots:8},{id:'documentary',label:'15-minute documentary',seconds:900,ratio:'16:9',shots:8}] as const;
export type Options={topic:string;niche:string;engine:string;style:string;format:string};
export type Shot={title:string;action:string;narration:string;camera:string;sound:string;time:string};
export type Blueprint={topic:string;niche:string;format:string;style:string;hook:string;character:string;shots:Shot[];thumbnail:string;editing:string[];source:'template'|'ai'};
export const SAMPLE_TOPIC='A tiny cat finds shelter in a midnight bakery';
export const DEFAULT_OPTIONS:Options={topic:SAMPLE_TOPIC,niche:'ai-cat-and-pet-stories',engine:'Google Flow / Veo',style:'Cozy storybook',format:'short'};
export function parseStudioDraft(value:unknown,nicheIds:string[]):Options|null{
 if(!value||typeof value!=='object')return null;
 const d=value as Partial<Options>;
 if(typeof d.topic!=='string'||d.topic.trim().length<3||d.topic.length>300||typeof d.niche!=='string'||!nicheIds.includes(d.niche)||!ENGINES.some(e=>e===d.engine)||!STYLES.some(s=>s===d.style)||!FORMATS.some(f=>f.id===d.format))return null;
 return {topic:d.topic,niche:d.niche,engine:d.engine!,style:d.style!,format:d.format!};
}
