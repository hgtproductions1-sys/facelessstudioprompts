import {notFound} from 'next/navigation';
import {Breadcrumbs,PageIntro,JsonLd} from '@/components/Shared';
import CopyButton from '@/components/CopyButton';
import VideoPlayer from '@/components/VideoPlayer';
import {VIDEOS,formatVideoDate} from '@/data/videos';
import {getArticleGuide} from '@/data/articleGuides';
import {metadataFor,SITE_URL} from '@/lib/site';

export function generateStaticParams(){return VIDEOS.map(v=>({slug:v.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;const v=VIDEOS.find(x=>x.slug===slug);
  return v?metadataFor('/videos/'+slug,v.title,v.description,'website',{src:'https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg',alt:v.originalTitle,width:480,height:360}):{};
}
export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;const v=VIDEOS.find(x=>x.slug===slug);if(!v)notFound();
  const guide=getArticleGuide(v.guide);
  const related=VIDEOS.filter(x=>x.category===v.category&&x.slug!==slug);
  const more=(related.length?related:VIDEOS.filter(x=>x.slug!==slug)).slice(0,3);
  return <div className="container page-content watch-page">
    <Breadcrumbs items={[{label:'Watch & learn',href:'/videos'},{label:v.title,href:'/videos/'+slug}]}/>
    <PageIntro eyebrow={v.category+' / '+v.level+' lesson'} title={v.title} description={v.description}/>
    <VideoPlayer id={v.id} title={v.originalTitle} priority embedInitially/>
    <p className="muted small">Video by <a className="inline-link" href={v.creatorUrl} target="_blank" rel="noopener noreferrer">{v.creator}</a>{v.uploaded?' · Published '+formatVideoDate(v.uploaded):''} · <a className="inline-link" href={'https://www.youtube.com/watch?v='+v.id} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></p>
    {v.note&&<p className="notice">{v.note}</p>}
    <div className="footer-spacer"/>
    <article className="prose legal-prose">
      <section><h2>Watch for this</h2><p>{v.takeaway}</p><p><a href={v.resourceUrl} target="_blank" rel="noopener noreferrer">{v.resourceLabel} ↗</a></p></section>
      <section>
        <h2>Your practice exercise</h2><p>{v.exercise}</p>
        <ul>{v.practiceTips.map(t=><li key={t}>{t}</li>)}</ul>
        <pre className="prompt-full">{v.prompt}</pre>
        <div className="article-actions"><CopyButton text={v.prompt} label="Copy practice prompt"/>{v.studioTopic&&<a className="button button-outline button-small" href={'/studio?topic='+encodeURIComponent(v.studioTopic)}>Plan your practice video ↗</a>}</div>
      </section>
      <section><h2>Keep learning</h2><div className="related-grid"><a className="related-card" href={'/guides/'+v.guide}>{guide?.title||'Read the related creator guide'} ↗</a><a className="related-card" href="/prompts">Explore editable prompt templates ↗</a></div></section>
    </article>
    <section className="more-lessons"><div className="section-heading"><div><p className="eyebrow">Keep the ideas moving</p><h2>Watch another lesson.</h2></div><a className="text-link" href="/videos">All video lessons ↗</a></div>
      <div className="guide-grid">{more.map(x=><a className="guide-card" href={'/videos/'+x.slug} key={x.id}><div className="guide-art"><img src={'https://i.ytimg.com/vi/'+x.id+'/hqdefault.jpg'} alt="" width="480" height="360" loading="lazy" decoding="async"/><span className="pill">{x.category}</span></div><div className="guide-card-body"><p className="small muted">{x.creator}</p><h3>{x.title}</h3></div></a>)}</div>
    </section>
    {v.uploaded&&<JsonLd data={{'@type':'VideoObject',name:v.originalTitle,description:v.description,thumbnailUrl:'https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg',uploadDate:v.uploaded,embedUrl:'https://www.youtube-nocookie.com/embed/'+v.id,url:SITE_URL+'/videos/'+slug,creator:{'@type':'Organization',name:v.creator,url:v.creatorUrl},isAccessibleForFree:true}}/>}
  </div>;
}

