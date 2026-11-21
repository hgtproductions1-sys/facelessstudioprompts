import ResourceNotes from '@/components/ResourceNotes';
import PublisherByline from '@/components/PublisherByline';
import Studio from '@/components/Studio';
import {NICHES_DATA} from '@/data/niches';
import {Breadcrumbs,PageIntro,JsonLd} from '@/components/Shared';
import {metadataFor,webApplicationJsonLd} from '@/lib/site';
import {studioAiKey} from '@/lib/studioAi';
export const metadata=metadataFor('/studio','Free AI Video Prompt & Storyboard Studio','Create a faceless video blueprint with an opening hook, shot-by-shot scene prompts, narration direction, continuity notes, and an editing checklist.');
export default async function Page({searchParams}:{searchParams:Promise<{topic?:string;niche?:string;format?:string;engine?:string;style?:string;journey?:string}>}){const p=await searchParams;return <div className="container page-content"><Breadcrumbs items={[{label:'Video prompt studio',href:'/studio'}]}/><PageIntro eyebrow="Your idea, with a plan" title="Plan a faceless video, one shot at a time." description="Choose a niche and a topic. Get a clear first draft, then bring your own creative decisions to every shot."/><PublisherByline/><Studio aiAvailable={Boolean(studioAiKey())} nicheOptions={NICHES_DATA.map(n=>({id:n.id,title:n.title}))} initialTopic={typeof p.topic==="string"?p.topic.slice(0,300):undefined} initialNiche={p.niche} initialFormat={p.format} initialEngine={p.engine} initialStyle={p.style} journey={p.journey}/><JsonLd data={webApplicationJsonLd('/studio','The Faceless Prompts Video Studio','Create editable video blueprints, scene prompts, and narration direction.')}/><ResourceNotes path="/studio"/></div>;}

