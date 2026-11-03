import Link from 'next/link';
import {PortableText} from 'next-sanity';
import type {EditorialPost as Post} from '@/lib/editorial';
import {cmsImageUrl,cmsBodyImage,editorialPath,safeContentUrl} from '@/lib/editorial';
import {Breadcrumbs,PageIntro,JsonLd} from '@/components/Shared';
import {metadataFor,SITE_URL,SITE_NAME} from '@/lib/site';
import {ARTICLE_GUIDES} from '@/data/articleGuides';

export function editorialMetadata(post:Post) {
 const path=editorialPath(post); const src=cmsImageUrl(post.cover?.url);
 return metadataFor(path,post.seoTitle||post.title!,post.seoDescription||post.excerpt!,'article',src?{src,alt:post.cover?.alt||post.title!}:undefined);
}
export function EditorialCard({post}:{post:Post}){
 const src=cmsImageUrl(post.cover?.url,800);
 return <article className="editorial-card">{src&&<Link href={editorialPath(post)} tabIndex={-1} aria-hidden="true"><img src={src} alt="" width="800" height="450" loading="lazy" decoding="async"/></Link>}<div className="editorial-card-copy"><span className="eyebrow">{post.category||'Creator workflow'}</span><h2><Link href={editorialPath(post)}>{post.title}</Link></h2><p>{post.excerpt}</p><p className="muted small">{post.authorName} · {formatDate(post.publishedAt!)}</p><Link className="text-link" href={editorialPath(post)}>Read {post.section==='guides'?'guide':'article'} ↗</Link></div></article>;
}
function formatDate(value:string){return Number.isFinite(Date.parse(value))?new Intl.DateTimeFormat('en',{dateStyle:'long',timeZone:'UTC'}).format(new Date(value)):'Date not set';}
export default function EditorialPost({post,preview=false}:{post:Post;preview?:boolean}){
 const path=editorialPath(post);const section=post.section==='guides'?'Creator guides':'Articles';const src=cmsImageUrl(post.cover?.url);
 const links=(post.relatedGuideSlugs||[]).flatMap(slug=>{const g=ARTICLE_GUIDES.find(g=>g.slug===slug);return g?[g]:[];});
 return <div className="container page-content">
  {preview&&<aside className="notice" role="status">Private draft preview. This version is not published. <form><button className="button button-outline button-small" type="submit">Refresh saved draft</button></form><form action="/api/editorial/disable-preview"><button className="text-link" type="submit">Exit preview</button></form></aside>}
  <Breadcrumbs items={[{label:section,href:post.section==='guides'?'/guides':'/articles'},{label:post.title!,href:path}]}/>
  <PageIntro eyebrow={post.category||section} title={post.title!} description={post.excerpt!}><div className="article-meta"><span>By {post.authorName}</span>{post.publishedAt&&<time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}<Link href="/editorial-policy">Editorial approach</Link></div></PageIntro>
  <article className="prose editorial-body">
   {src&&<figure className="guide-cover"><img src={src} srcSet={`${cmsImageUrl(post.cover?.url,480)} 480w, ${cmsImageUrl(post.cover?.url,800)} 800w, ${src} 1280w`} sizes="(max-width:900px) 100vw, 800px" alt={post.cover?.alt||''} width={post.cover?.dimensions?.width||1280} height={post.cover?.dimensions?.height||720}/></figure>}
   {!!post.takeaways?.length&&<section className="callout"><h2>What you’ll take away</h2><ul>{post.takeaways.map((s,i)=><li key={i}>{s}</li>)}</ul></section>}
   <PortableText value={post.body||[]} components={{
    marks:{link:({value,children})=>{const href=safeContentUrl(value?.href);return href?<a href={href} rel={href.startsWith('http')?'noopener noreferrer':undefined}>{children}</a>:<>{children}</>;}},
    types:{image:({value})=>{const img=cmsBodyImage(value.asset?._ref);const small=cmsBodyImage(value.asset?._ref,480);const medium=cmsBodyImage(value.asset?._ref,800);return img?<figure><img src={img.url} srcSet={`${small?.url} 480w, ${medium?.url} 800w, ${img.url} 1280w`} sizes="(max-width:900px) 100vw, 800px" alt={value.alt||''} width={img.width} height={img.height} loading="lazy" decoding="async"/>{value.caption&&<figcaption>{value.caption}</figcaption>}</figure>:null;}}
   }}/>
   {!!post.sources?.length&&<section><h2>Sources & further reading</h2><ul>{post.sources.map(s=>{const href=safeContentUrl(s.url);return href?<li key={s._key}><a href={href} rel="noopener noreferrer">{s.label}</a></li>:null;})}</ul></section>}
   {post.authorBio&&<section className="callout"><h2>About {post.authorName}</h2><p>{post.authorBio}</p></section>}
   <section><h2>Put it into practice</h2>{links.length>0&&<ul>{links.map(g=><li key={g.slug}><Link href={'/guides/'+g.slug}>{g.title}</Link></li>)}</ul>}<Link className="button" href="/studio">Create a video plan ↗</Link></section>
  </article>
  {!preview&&<JsonLd data={{'@type':'Article',headline:post.title,description:post.excerpt,url:SITE_URL+path,datePublished:post.publishedAt,dateModified:post._updatedAt,author:{'@type':post.authorType==='Organization'?'Organization':'Person',name:post.authorName},publisher:{'@type':'Organization',name:SITE_NAME,url:SITE_URL},...(src?{image:src}:{})}}/>}
 </div>;
}
