import {Breadcrumbs,PageIntro,Cta} from '@/components/Shared';
import GuideCard from '@/components/GuideCard';
import {ARTICLE_GUIDES} from '@/data/articleGuides';
import {metadataFor} from '@/lib/site';
export const metadata=metadataFor('/guides','Practical Faceless YouTube & AI Video Creator Guides','Learn niche selection, AI character consistency, video prompting, scripting, editing, and original production workflows for faceless channels.');
export default function Page(){return <div className="container page-content">
  <Breadcrumbs items={[{label:'Creator guides',href:'/guides'}]}/>
  <PageIntro eyebrow={ARTICLE_GUIDES.length+' guides. A clearer next step.'} title="Faceless YouTube creator guides" description="Learn the decisions behind a good video. Each guide pairs a practical workflow with a relevant YouTube lesson and an exercise you can try."/>
  <div className="guide-grid">{ARTICLE_GUIDES.map(g=><GuideCard guide={g} key={g.slug}/>)}</div>
  <div className="footer-spacer"/><Cta/>
</div>;}

