import {SITE_URL,SITE_NAME} from '@/lib/site';
import {NICHE_PAGES} from '@/data/niches';
import {ARTICLE_GUIDES} from '@/data/articleGuides';
import {PROMPT_COLLECTIONS} from '@/data/promptPages';
export function GET(){
 const link=(path:string,title:string)=>`- [${title}](${SITE_URL}${path})`;
 const text=[`# ${SITE_NAME}`,'','> Free editable AI prompts, faceless YouTube niche playbooks, and practical video production guides.','',
 'The Studio creates text production plans. It does not render videos or upload to YouTube. External tools have their own prices, terms, and limits. Examples are creative starting points, not promises of views or revenue.','',
 '## Start here',link('/start-here','First-video checklist'),link('/studio','Video Planning Studio'),link('/prompts','AI prompt library'),link('/niches','Faceless YouTube niches'),link('/guides','Creator guides'),link('/videos','Credited video lessons and practice exercises'),'',
 '## Prompt collections',...PROMPT_COLLECTIONS.map(p=>link('/prompts/'+p.slug,p.title)),'',
 '## Niche playbooks',...NICHE_PAGES.map(n=>link('/niches/'+n.slug,n.name)),'',
 '## Creator guides',...ARTICLE_GUIDES.map(g=>link('/guides/'+g.slug,g.title)),'',
 '## About this project',link('/about','About The Faceless Prompts'),link('/editorial-policy','Editorial policy'),link('/contact','Contact'),link('/privacy','Privacy policy'),'','Sitemap: '+SITE_URL+'/sitemap.xml',''].join('\n');
 return new Response(text,{headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'public, max-age=3600'}});
}
