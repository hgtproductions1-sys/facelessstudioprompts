import {SITE_URL} from '@/lib/site';
import {NICHE_PAGES} from '@/data/niches';
import {PROMPT_COLLECTION_SLUGS,PROMPT_PAGE_SLUGS} from '@/data/promptPages';
import {ARTICLE_GUIDES} from '@/data/articleGuides';
import {VIDEOS} from '@/data/videos';
import {INFO_PAGES} from '@/data/legal';
import {getEditorialPosts,editorialPath} from '@/lib/editorial';
import editorialConfig from '@/config/editorial.json';
export const dynamic='force-dynamic';
export function allPaths(){return [...new Set(['/', '/start-here','/studio','/prompts','/niches','/guides','/videos','/free-tools','/ai-tools-hub','/faceless-youtube-automation','/updates',...Object.keys(INFO_PAGES).map(s=>'/'+s),...NICHE_PAGES.map(n=>'/niches/'+n.slug),...[...PROMPT_COLLECTION_SLUGS,...PROMPT_PAGE_SLUGS].map(s=>'/prompts/'+s),...ARTICLE_GUIDES.map(g=>'/guides/'+g.slug),...VIDEOS.map(v=>'/videos/'+v.slug)])];}
const PAGE_MODIFIED:Record<string,string>={'/':'2026-10-19','/start-here':'2026-10-08','/studio':'2026-10-11','/prompts':'2026-10-08','/niches':'2026-10-08','/guides':'2026-10-08','/videos':'2026-10-08','/about':'2026-10-11','/contact':'2026-10-11','/terms':'2026-10-11','/updates':'2026-10-11','/editorial-policy':'2026-10-08','/privacy':'2026-10-19'};
export function modifiedFor(path:string){const guide=ARTICLE_GUIDES.find(g=>path==='/guides/'+g.slug);return guide?new Date(guide.updated).toISOString().slice(0,10):PAGE_MODIFIED[path];}
function escape(s:string){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
export async function GET(){try{const posts=await getEditorialPosts();const migrated=new Set<string>(editorialConfig.migratedGuideSlugs.map(s=>'/guides/'+s));const paths=[...new Set([...allPaths().filter(p=>!migrated.has(p)),...(posts.some(p=>p.section==='articles')?['/articles']:[]),...posts.map(editorialPath)])];const dates=new Map(posts.map(p=>[editorialPath(p),p._updatedAt]));const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>{const date=dates.get(p)||modifiedFor(p);return '<url><loc>'+escape(SITE_URL+p)+'</loc>'+(date?'<lastmod>'+escape(date)+'</lastmod>':'')+'</url>';}).join('')+'</urlset>';return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'no-store'}});}catch{return new Response('Sitemap temporarily unavailable',{status:503,headers:{'Retry-After':'60','Cache-Control':'no-store'}});}}

