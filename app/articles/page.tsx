import Link from 'next/link';
import {Breadcrumbs,PageIntro} from '@/components/Shared';
import {EditorialCard} from '@/components/EditorialPost';
import {getEditorialPosts} from '@/lib/editorial';
import {metadataFor} from '@/lib/site';

export const dynamic='force-dynamic';
export async function generateMetadata(){const posts=(await getEditorialPosts()).filter(p=>p.section==='articles');return {...metadataFor('/articles','Articles for Faceless Video Creators','Practical AI video workflows, prompt breakdowns, and production notes for faceless content creators.'),...(!posts.length?{robots:{index:false,follow:true}}:{})};}
export default async function Articles(){
 const posts=(await getEditorialPosts()).filter(p=>p.section==='articles');
 return <div className="container page-content"><Breadcrumbs items={[{label:'Articles',href:'/articles'}]}/><PageIntro eyebrow="The creator’s notebook" title="Articles for faceless creators." description="Prompt breakdowns, production notes, and clear explanations for your next faceless video."/>{posts.length?<div className="guide-grid">{posts.map(p=><EditorialCard key={p._id} post={p}/>)}</div>:<section className="callout editorial-empty"><h2>Start with the creator guides.</h2><p>Our practical tutorials cover niche selection, consistent characters, and the production workflow. New articles will appear here when published.</p><Link className="button" href="/guides">Explore creator guides ↗</Link></section>}</div>;
}
