import NicheExplorer from '@/components/NicheExplorer';
import {Breadcrumbs,PageIntro,Cta} from '@/components/Shared';
import {NICHE_PAGES,NICHES_DATA} from '@/data/niches';
import {NICHE_GUIDES} from '@/data/nicheGuides';
import {NICHE_IMAGES} from '@/data/nicheImages';
import {metadataFor} from '@/lib/site';
export const metadata=metadataFor('/niches','24 Faceless YouTube Niches & Video Prompt Playbooks','Explore 24 faceless video niches with original story ideas, editable scene prompts, audience notes, and practical production workflows.');
const shortCategory=(category:string)=>category.split(' & ')[0].replace('Pets, Animals','Animals').replace('Food, Culinary','Food').replace('Documentary, Commentary','Documentary');
export default function Page(){const cards=NICHE_PAGES.map(n=>({slug:n.slug,name:n.name,difficulty:n.difficulty,description:NICHE_GUIDES[n.slug]?.searchSummary||n.metaDescription,category:shortCategory(NICHES_DATA.find(x=>x.slug===n.slug||x.id===n.slug)?.category||'Creative formats'),image:NICHE_IMAGES[n.slug]?.src,imageAlt:NICHE_IMAGES[n.slug]?.alt}));return <div className="container page-content"><Breadcrumbs items={[{label:'Niches',href:'/niches'}]}/><PageIntro eyebrow={cards.length+' creative directions'} title="24 faceless YouTube niches" description="Explore the audience, the story possibilities, and the work involved. Choose a niche you can sustain, then test a few original videos."/><NicheExplorer niches={cards}/><p className="notice">Difficulty labels describe production effort, not audience demand or expected revenue. Your results depend on the idea, execution, and viewer response.</p><div className="footer-spacer"/><Cta/></div>;}

