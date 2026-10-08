import {notFound} from 'next/navigation';
import {Breadcrumbs,PageIntro,JsonLd} from '@/components/Shared';
import CopyButton from '@/components/CopyButton';
import VideoPlayer from '@/components/VideoPlayer';
import {ARTICLE_GUIDES,getArticleGuide} from '@/data/articleGuides';
import {GUIDE_IMAGES} from '@/data/guideImages';
import {getPrimaryVideoForGuide,formatVideoDate} from '@/data/videos';
import {getPromptBySlug,getPromptCollection} from '@/data/promptPages';
import {getNichePage} from '@/data/niches';
import {metadataFor,SITE_URL} from '@/lib/site';
import {responsiveImage} from '@/lib/images';

export function generateStaticParams(){return ARTICLE_GUIDES.map(g=>({slug:g.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const g=getArticleGuide(slug);
  return g?metadataFor('/guides/'+slug,g.seoTitle,g.description,'article',GUIDE_IMAGES[slug]):{};
}
export default async function Page({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const g=getArticleGuide(slug); if(!g)notFound();
  const image=GUIDE_IMAGES[slug];
  const lesson=getPrimaryVideoForGuide(slug);
  return <div className="container page-content">
    <Breadcrumbs items={[{label:'Creator guides',href:'/guides'},{label:g.eyebrow,href:'/guides/'+slug}]}/>
    <PageIntro eyebrow={g.category+' / Creator guide'} title={g.title} description={g.summary}>
      <div className="article-meta"><span>By <a className="inline-link" href="/about">The Faceless Prompts</a></span><a className="inline-link" href="/editorial-policy">Editorial approach</a><span>{g.readMinutes} min read</span><span>Updated {g.updated}</span></div>
    </PageIntro>
    <div className="article-layout">
      <article className="prose">
        {image&&<figure className="guide-cover"><img src={image.src} {...responsiveImage(image.src,"(max-width: 900px) 100vw, 800px")} decoding="async" alt={image.alt} width="1280" height="720" fetchPriority="high"/><figcaption>Guide illustration · {g.eyebrow}</figcaption></figure>}
        <div className="callout"><h2>What you’ll take away</h2><ul>{g.takeaways.map(x=><li key={x}>{x}</li>)}</ul></div>
        {g.sections.map(s=><section id={s.id} key={s.id}>
          <h2>{s.title}</h2>
          {s.paragraphs?.map(p=><p key={p}>{p}</p>)}
          {s.bullets&&<ul>{s.bullets.map(b=><li key={b}>{b}</li>)}</ul>}
          {s.steps&&<div className="step-list">{s.steps.map((x,i)=><div className="step-item" key={x.title}><span>0{i+1}</span><div><h3>{x.title}</h3><p>{x.body}</p></div></div>)}</div>}
          {s.example&&<div className="prompt-example"><h3>{s.example.label}</h3><pre className="prompt-full">{s.example.text}</pre><CopyButton text={s.example.text} label="Copy example"/></div>}
          {s.callout&&<div className="callout"><h3>{s.callout.title}</h3><p>{s.callout.body}</p></div>}
        </section>)}
        {lesson&&<section id="watch-related" className="guide-related-video">
          <h2>Watch a related lesson</h2>
          <h3>{lesson.title}</h3><p>{lesson.description}</p>
          <VideoPlayer id={lesson.id} title={lesson.originalTitle}/>
          <p className="lesson-meta">Video by <a href={lesson.creatorUrl} target="_blank" rel="noopener noreferrer">{lesson.creator}</a>{lesson.uploaded?' · '+formatVideoDate(lesson.uploaded):''} · <a href={'https://www.youtube.com/watch?v='+lesson.id} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></p>
          <a className="button button-outline button-small" href={'/videos/'+lesson.slug}>Try the matching exercise ↗</a>
        </section>}
        {!!g.sources?.length&&<section id="sources"><h2>Sources & further reading</h2><ul>{g.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>{s.note&&<p>{s.note}</p>}</li>)}</ul><p>Provider features and platform policies can change. Use the linked primary sources to check requirements for your project.</p></section>}
        <section id="next">
          <h2>Put it into practice.</h2>
          <div className="related-grid">{[...new Set(g.relatedPromptSlugs)].map(s=>{const p=getPromptBySlug(s);const c=getPromptCollection(s);return p||c?<a className="related-card" href={'/prompts/'+s} key={s}>{p?.title||c?.label} ↗</a>:null;})}{g.relatedNicheSlugs.map(s=>{const n=getNichePage(s);return n?<a className="related-card" href={'/niches/'+s} key={s}>{n.name} playbook ↗</a>:null;})}</div>
          <a className="button" href="/studio">Create a video plan ↗</a>
        </section>
      </article>
      <aside className="toc"><h2>In this guide</h2>{g.sections.map(s=><a href={'#'+s.id} key={s.id}>{s.title}</a>)}{lesson&&<a href="#watch-related">Watch a related lesson</a>}{!!g.sources?.length&&<a href="#sources">Sources & further reading</a>}<a href="#next">Put it into practice</a></aside>
    </div>
    <JsonLd data={{'@type':'Article',headline:g.title,description:g.description,url:SITE_URL+'/guides/'+slug,dateModified:new Date(g.updated).toISOString().slice(0,10),author:{'@type':'Organization',name:'The Faceless Prompts',url:SITE_URL+'/about'},publisher:{'@type':'Organization',name:'The Faceless Prompts',logo:{'@type':'ImageObject',url:SITE_URL+'/logo-mark.png'}},image:SITE_URL+(image?.src||'/social-cover.jpg')}}/>
  </div>;
}

