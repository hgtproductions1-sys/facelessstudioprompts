import {SITE_URL,INDEXABLE} from '@/lib/site';
export function GET(){return new Response('User-agent: *\n'+(INDEXABLE?'Allow: /\nDisallow: /api/\n':'Disallow: /\n')+'\nSitemap: '+SITE_URL+'/sitemap.xml\nSitemap: '+SITE_URL+'/video-sitemap.xml\n',{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}});}

