import NicheExplorer from '@/components/NicheExplorer';
import NicheComparison from '@/components/NicheComparison';
import {NICHE_COMPARISON} from '@/data/nicheComparison';
import {Breadcrumbs,PageIntro,Cta} from '@/components/Shared';
import {NICHE_LINKS,NICHE_PAGES} from '@/data/niches';
import {NICHE_IMAGES} from '@/data/nicheImages';
import {metadataFor} from '@/lib/site';
import {NewsletterCapture} from '@/components/EmailCapture';
import {newsletterConfig} from '@/lib/emailConfig';
export const metadata=metadataFor('/niches','24 Faceless YouTube Niches & Video Prompt Playbooks','Explore 24 faceless video niches with original story ideas, editable scene prompts, audience notes, and practical production workflows.');
const comparison = NICHE_PAGES.map(({slug,name}) => ({slug,name,...NICHE_COMPARISON[slug]}));
const shortCategory=(category:string)=>category.split(' & ')[0].replace('Pets, Animals','Animals').replace('Food, Culinary','Food').replace('Documentary, Commentary','Documentary');
export default function Page(){const cards=NICHE_PAGES.map(n=>({slug:n.slug,name:n.name,difficulty:n.difficulty,description:n.shortSummary,category:shortCategory(NICHE_LINKS.find(x=>x.slug===n.slug)?.category||'Creative formats'),image:NICHE_IMAGES[n.slug]?.src,imageAlt:NICHE_IMAGES[n.slug]?.alt}));return <div className="container page-content"><Breadcrumbs items={[{label:'Niches',href:'/niches'}]}/><PageIntro eyebrow={cards.length+' creative directions'} title="Find a format you can make your own." description="Explore the audience, the story possibilities, and the work involved. Choose a niche you can sustain, then test a few original videos."/><NicheComparison rows={comparison}/><NicheExplorer niches={cards}/><p className="notice">Difficulty labels describe production effort, not audience demand or expected revenue. Your results depend on the idea, execution, and viewer response.</p>{newsletterConfig() && <NewsletterCapture/>}<div className="footer-spacer"/><Cta/></div>;}

