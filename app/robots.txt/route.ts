import {SITE_URL,INDEXABLE} from '@/lib/site';
export function GET(){
 const rules=INDEXABLE?'Allow: /\nDisallow: /api/\n':'Disallow: /\n';
 const agents=['*','OAI-SearchBot','Claude-SearchBot','PerplexityBot'];
 return new Response(agents.map(agent=>'User-agent: '+agent+'\n'+rules).join('\n')+'\nSitemap: '+SITE_URL+'/sitemap.xml\nSitemap: '+SITE_URL+'/video-sitemap.xml\n',{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}});
}
