import {Breadcrumbs,PageIntro,Cta} from '@/components/Shared';
import GuideCard from '@/components/GuideCard';
import {ARTICLE_GUIDES} from '@/data/articleGuides';
import {metadataFor} from '@/lib/site';
import {getEditorialPosts,type EditorialPost} from '@/lib/editorial';
import {EditorialCard} from '@/components/EditorialPost';
import editorialConfig from '@/config/editorial.json';
export const dynamic='force-dynamic';
export const metadata=metadataFor('/guides','Practical Faceless YouTube & AI Video Creator Guides','Learn niche selection, AI character consistency, video prompting, scripting, editing, and original production workflows for faceless channels.');
export default async function Page(){const legacy=ARTICLE_GUIDES.filter(g=>!(editorialConfig.migratedGuideSlugs as string[]).includes(g.slug));let cmsPosts:EditorialPost[]=[];let unavailable=false;try{cmsPosts=await getEditorialPosts();}catch{unavailable=true;}const posts=cmsPosts.filter(p=>p.section==='guides'&&!legacy.some(g=>g.slug===p.slug));return <div className="container page-content">
  <Breadcrumbs items={[{label:'Creator guides',href:'/guides'}]}/>
  <PageIntro eyebrow={(legacy.length+posts.length)+' guides. A clearer next step.'} title="Make things you’re proud to publish." description="Learn the decisions behind a good video. Follow a practical workflow, then put it into practice with your own project."/>
  {unavailable&&<p className="notice" role="status">New guides are temporarily unavailable. You can still read the guides below.</p>}
  <div className="guide-grid">{posts.map(p=><EditorialCard post={p} key={p._id}/>)}{legacy.map(g=><GuideCard guide={g} key={g.slug}/>)}</div>
  <div className="footer-spacer"/><Cta/>
</div>;}

