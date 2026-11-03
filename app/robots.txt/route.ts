import {SITE_URL,INDEXABLE} from '@/lib/site';
export function GET(){
 const access=INDEXABLE?'Disallow: /api/\nDisallow: /admin/\nDisallow: /preview/\nAllow: /\n':'Disallow: /\n';
 // Search discovery is explicit. Training crawlers retain the existing wildcard policy.
 const groups=['*','OAI-SearchBot','PerplexityBot','Claude-SearchBot'].map(bot=>`User-agent: ${bot}\n${access}`).join('\n');
 return new Response(groups+'\nSitemap: '+SITE_URL+'/sitemap.xml\nSitemap: '+SITE_URL+'/video-sitemap.xml\n',{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}});
}

