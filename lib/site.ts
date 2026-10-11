import type { Metadata } from 'next';
import config from '@/config/site.json';
export {CATEGORY_LABELS} from './categories';
export const SITE_NAME = 'The Faceless Prompts';
export function resolveSiteUrl(value:string){
 const url=new URL(value);
 if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash||url.pathname!=='/')throw new Error('SITE_URL must be an HTTPS origin without a path, credentials, query, or fragment.');
 return url.origin;
}
export const SITE_URL = resolveSiteUrl(process.env.SITE_URL || config.canonicalUrl);
export const INDEXABLE = config.indexable;
export const SEARCH_CONSOLE_VERIFICATION = config.searchConsoleVerification;
export const CONTACT_EMAIL = 'founder@thefacelessprompts.com';
export const FOUNDER_NAME = 'Vince Elijah Alvarez';
export const FOUNDING_YEAR = 2023;
export const UPDATED = '2026-10-08';
export function metadataFor(path: string, title: string, description: string, type: 'website' | 'article' = 'website', image?: {src:string;alt:string;width?:number;height?:number}): Metadata {
 const url = SITE_URL + path;
 const preview=image?{url:image.src.startsWith('https://')?image.src:SITE_URL+image.src,width:image.width||1280,height:image.height||720,alt:image.alt}:{url:SITE_URL+'/social-cover.jpg',width:1200,height:675,alt:'A cinematic cat story from The Faceless Prompts'};
 return {title, description, alternates:{canonical:url}, robots:{index:INDEXABLE,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1},
 openGraph:{title,description,url,type,siteName:SITE_NAME,locale:'en_US',images:[preview]},
 twitter:{card:'summary_large_image',title,description,images:[preview.url]}};
}
export function schema(data:Record<string,unknown>){return JSON.stringify({'@context':'https://schema.org',...data}).replace(/</g,'\\u003c');}
export function breadcrumbSchema(items:{label:string;href:string}[]){return {'@type':'BreadcrumbList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.label,item:SITE_URL+item.href}))};}

