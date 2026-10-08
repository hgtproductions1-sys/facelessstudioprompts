import {notFound} from 'next/navigation';
import {Breadcrumbs,PageIntro} from '@/components/Shared';
import {INFO_PAGES} from '@/data/legal';
import {CONTACT_EMAIL,metadataFor,UPDATED} from '@/lib/site';
export function generateStaticParams(){return Object.keys(INFO_PAGES).map(page=>({page}));}
export async function generateMetadata({params}:{params:Promise<{page:string}>}){const {page}=await params;const d=INFO_PAGES[page];return d?metadataFor('/'+page,d.eyebrow,d.description):{};}
export default async function Page({params}:{params:Promise<{page:string}>}){const {page}=await params;const d=INFO_PAGES[page];if(!d)notFound();return <div className="container page-content"><Breadcrumbs items={[{label:d.eyebrow,href:'/'+page}]}/><PageIntro eyebrow={d.eyebrow} title={d.title} description={d.description}/><p className="article-meta">Updated {UPDATED}</p><div className="footer-spacer"/><article className="prose legal-prose">{d.sections.map(s=><section key={s.title}><h2>{s.title}</h2>{s.body.map(b=><p key={b}>{b}</p>)}</section>)}{page==='contact'?<div className="callout"><h2>Email the site contact</h2><a href={'mailto:'+CONTACT_EMAIL}>{CONTACT_EMAIL} ↗</a></div>:<p><a href="/contact">Contact the project ↗</a></p>}</article></div>;}

