import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const baseline = JSON.parse(await readFile(new URL('../seo-baseline.json', import.meta.url), 'utf8'));
const origin = 'https://www.thefacelessprompts.com';
const base = new URL(process.env.SITE_BASE_URL || 'http://127.0.0.1:3090');
const baselineOnly = process.argv.includes('--baseline-only');
const newPages = [
  '/free-tools/faceless-video-script-generator',
  '/free-tools/youtube-shorts-hook-generator',
  '/free-tools/voiceover-length-calculator',
  '/prompts/veo-3', '/prompts/kling', '/prompts/midjourney',
];
const collections = ['youtube', 'image-generation', 'video-generation', 'seo', 'character-consistency'];
const findings = [];
const check = (condition, message) => { if (!condition) findings.push(message); };
const htmlEntities = {'amp':'&','quot':'"','apos':"'",'lt':'<','gt':'>','nbsp':' '};
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|nbsp);|&#(?:x[\da-f]+|\d+);/gi, entity => {
  if (/^&#x/i.test(entity)) return String.fromCodePoint(parseInt(entity.slice(3,-1),16));
  if (entity.startsWith('&#')) return String.fromCodePoint(Number(entity.slice(2,-1)));
  return htmlEntities[entity.slice(1,-1).toLowerCase()] ?? entity;
});
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
  .map(([,key,a,b,c]) => [key.toLowerCase(),decode(a ?? b ?? c)]));
const tags = (html,name) => [...html.matchAll(new RegExp('<'+name+'\\b[^>]*>','gi'))]
  .map(match => attributes(match[0]));
const canonicals = html => tags(html,'link').filter(tag => tag.rel==='canonical').map(tag => tag.href);
const text = html => decode(html.replace(/<[^>]+>/g,'')).replace(/\s+/g,' ').trim();
const locs = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>decode(match[1]));
const normalized = value => { try { return new URL(value).href; } catch { return null; } };
const canonicalPath = path => new URL(path,origin).href;
const sameOriginPath = (href,path) => {
  try {
    const target=new URL(href,new URL(path,origin));
    return target.origin===origin ? target.pathname : null;
  } catch { return null; }
};
const withoutScripts = html => html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'');

async function fetchPage(path) {
  for (let attempt=0; ; attempt++) {
    try {
      const response=await fetch(new URL(path,base),{redirect:'manual',signal:AbortSignal.timeout(30000)});
      if (response.status>=500 && attempt<2) { await response.body?.cancel(); continue; }
      return { status:response.status, body:await response.text(), headers:response.headers };
    } catch (error) {
      if (attempt===2) throw new Error(path+' failed: '+error.message,{cause:error});
    }
  }
}

async function mapLimit(items,fn) {
  let next=0;
  const results=new Array(items.length);
  await Promise.all(Array.from({length:Math.min(items.length,6)},async()=>{
    while (next<items.length) {
      const position=next++;
      results[position]=await fn(items[position]);
    }
  }));
  return results;
}

function auditSchema(html,path) {
  for (const [,script] of html.matchAll(/<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let data;
    try { data=JSON.parse(script); }
    catch { check(false,path+' has malformed JSON-LD'); continue; }
    function scan(entry,key,parentType) {
      if (!entry) return;
      if (Array.isArray(entry)) { for (const child of entry) scan(child,key,parentType); return; }
      if (typeof entry==='object') {
        for (const [k,v] of Object.entries(entry)) scan(v,k,entry['@type'] ?? parentType);
        return;
      }
      if (typeof entry==='string' && typeof key==='string' &&
        ['@id','url','item','mainEntityOfPage'].includes(key) &&
        (/thefacelessprompts\.com|localhost|127\.0\.0\.1|\.vercel\.app/i.test(entry) ||
          ['CollectionPage','WebApplication','WebSite','Article','BreadcrumbList','ListItem'].includes(parentType) && key==='item')) {
        check(normalized(entry)?.startsWith(origin+'/'),path+' has noncanonical JSON-LD '+key+' '+entry);
      }
    }
    scan(data);
  }
}

async function inspect(path, expectedCanonical=canonicalPath(path), { indexable=true }={}) {
  const {status, body, headers}=await fetchPage(path);
  check(status===200,path+' returned '+status);
  if (status!==200) return {path,body:'',links:[],markdown:[]};
  const html=withoutScripts(body);
  const head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const canonical=canonicals(html);
  check(canonical.length===1 && canonicals(head).length===1,path+' must have one canonical in the initial head');
  check(normalized(canonical[0])===expectedCanonical,path+' canonical is '+String(canonical[0]));
  const rob=tags(html,'meta').filter(meta=>['robots','googlebot'].includes(meta.name?.toLowerCase())).map(meta=>meta.content).join(',')+','+(headers.get('x-robots-tag')||'');
  check(indexable ? !/\b(?:noindex|none)\b/i.test(rob) : /\bnoindex\b/i.test(rob),path+' robots directives are '+rob);
  if (indexable) check(/(?:^|[,;\s])index(?:$|[,;\s])/i.test(rob) && /(?:^|[,;\s])follow(?:$|[,;\s])/i.test(rob) && !/\bnofollow\b/i.test(rob),path+' lacks index, follow');
  const h1=[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match=>text(match[1]));
  check(h1.length===1,path+' must render one H1');
  const titles=[...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(match=>text(match[1]));
  check(titles.length===1 && Boolean(titles[0]),path+' must have one nonempty title');
  const markdown=tags(html,'link').filter(link=>link.rel==='alternate' && link.type==='text/markdown').map(link=>link.href);
  const pathname=new URL(path,origin).pathname;
  const expectedMarkdown=origin+'/markdown'+(pathname==='/'?'':pathname);
  check(markdown.length===1 && markdown[0]===expectedMarkdown,path+' Markdown alternate is '+markdown.join(','));
  const social=tags(head,'meta').filter(meta=>meta.property==='og:url').map(meta=>normalized(meta.content));
  check(social.length===1 && social[0]===expectedCanonical,path+' Open Graph URL does not match its canonical');
  auditSchema(body,path);
  return {path,body:html,links:tags(html,'a'),markdown,title:titles[0],h1:h1[0],description:tags(head,'meta').find(meta=>meta.name==='description')?.content};
}

const [sitemap,robots,videoSitemap]=await Promise.all(['/sitemap.xml','/robots.txt','/video-sitemap.xml'].map(fetchPage));
assert.equal(baseline.origin,origin);
check(sitemap.status===200 && /^\s*(?:<\?xml[^>]*>\s*)?<urlset\b[^>]*>[\s\S]*<\/urlset>\s*$/.test(sitemap.body),'Invalid main sitemap');
check(videoSitemap.status===200,'Video sitemap returned '+videoSitemap.status);
for (const url of baseline.videoSitemapUrls) check(locs(videoSitemap.body).includes(url),'Lost video sitemap URL '+url);
check(robots.status===200 && robots.body.includes('Sitemap: '+origin+'/sitemap.xml'),'Missing main sitemap declaration in robots.txt');
check(!/^Disallow:\s*(?:\/\s*$|\/_next(?:\/|$))/mi.test(robots.body),'robots.txt blocks public routes or Next.js assets');
const urls=locs(sitemap.body);
check(new Set(urls).size===urls.length,'Duplicate sitemap URL');
for (const url of urls) check(url.startsWith(origin+'/') && !/[?#]/.test(url),'Invalid sitemap URL '+url);
const sitemapPaths=new Set(urls.map(url=>new URL(url).pathname));
const baselinePaths=baseline.routes.map(route=>route.path);
for (const path of [...baselinePaths,...(baselineOnly?[]:newPages)]) check(sitemapPaths.has(path),'Missing sitemap route '+path);
const paths=[...new Set([...baselinePaths,...sitemapPaths])];
const rows=await mapLimit(paths,path=>inspect(path));
const pages=new Map(rows.map(row=>[row.path,row]));
for (const old of baseline.routes) {
  const row=pages.get(old.path);
  check(row?.title===old.title?.[0],old.path+' existing search title changed');
  check(row?.h1===old.h1?.[0],old.path+' existing H1 changed');
}

const pagination=[pages.get('/prompts'),...await mapLimit([2,3,4],page=>inspect('/prompts?page='+page))];
const promptIds=new Set(baselinePaths.filter(path=>path.startsWith('/prompts/')&&!collections.includes(path.split('/').at(-1))));
const discoveredPrompts=new Set();
for (const [index,page] of pagination.entries()) {
  if (!page) { check(false,'Missing prompt library'); continue; }
  check(page.body.includes('aria-label="Prompt library pagination"'),page.path+' lacks crawlable pagination');
  check((page.body.match(/class="prompt-card"/g)||[]).length===(index===3?13:18),page.path+' renders an unexpected number of cards');
  if (index) {
    check(page.title?.includes('Page '+(index+1)),page.path+' title lacks page number');
    check(page.description?.includes('page '+(index+1)+' of 4'),page.path+' description lacks archive context');
  }
  for (const link of page.links) {
    const path=sameOriginPath(link.href,page.path);
    if (promptIds.has(path)) discoveredPrompts.add(path);
  }
}
check(promptIds.size===67 && discoveredPrompts.size===67,'Expected 67 crawlable prompt details; found '+discoveredPrompts.size);
const sectionIds=new Set();
for (const collection of collections) {
  const page=pages.get('/prompts/'+collection);
  check(Boolean(page),'/prompts/'+collection+' is missing');
  for (const link of page?.links ?? []) {
    const path=sameOriginPath(link.href,page.path);
    if(promptIds.has(path)) sectionIds.add(path);
  }
}
check(sectionIds.size===67,'Prompt categories expose '+sectionIds.size+'/67 details');

for (const row of rows.filter(row=>row.path.startsWith('/niches/'))) {
  const related=[...row.body.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/gi)].find(match=>match[0].includes('Explore another direction'))?.[0] ?? '';
  const targets=tags(related,'a').map(link=>sameOriginPath(link.href,row.path)).filter(path=>path?.startsWith('/niches/'));
  check(targets.length===3 && new Set(targets).size===3 && !targets.includes(row.path),row.path+' has invalid related niches');
}
const home=pages.get('/')?.body ?? '';
check(!/your next (?:vi|vid|n|fo|for)(?=\s*<)/i.test(home),'Homepage has visibly truncated boilerplate');
for (const path of ['/prompts','/studio']) {
  const content=text(pages.get(path)?.body ?? '');
  check(!/\bor domain\b|\bnew domain\b/i.test(content),path+' has outdated migration copy');
  if (path==='/studio' && process.env.NEXT_PUBLIC_STUDIO_AI_ENABLED!=='true') check(!/temporarily unavailable/i.test(content),'Studio advertises an unavailable mode');
}

await inspect('/studio?niche=ai-music-videos&topic=test',canonicalPath('/studio'));
await inspect('/prompts?q=stickman',canonicalPath('/prompts'),{indexable:false});
for (const variant of ['1','0','abc','999']) {
  const result=await fetchPage('/prompts?page='+variant);
  if (variant==='999') check(result.status===404,'Out-of-range prompt page returned '+result.status);
  else {
    const target=new URL(result.headers.get('location')||'/',base);
    check(result.status===301 && target.pathname==='/prompts' && !target.search,'Invalid placeholder page "'+variant+'" did not redirect to /prompts with 301');
  }
}
const markdownPaths=['/markdown','/markdown/prompts','/markdown/studio','/markdown/niches/ai-music-videos',
  '/markdown/articles/faceless-video-operator-prompt',...(baselineOnly?[]:newPages.map(path=>'/markdown'+path))];
await mapLimit(markdownPaths,async path=>{
  const result=await fetchPage(path);
  check(result.status===200 && result.headers.get('content-type')?.startsWith('text/markdown'),path+' did not return readable Markdown');
});
const knownNonpages=new Set(['/sitemap.xml','/video-sitemap.xml','/robots.txt','/llms.txt','/llms-full.txt']);
const extraLinks=new Set();
const idsByPage=new Map(rows.map(row=>[row.path,new Set([...row.body.matchAll(/\bid=(?:"([^"]+)"|'([^']+)')/g)].map(match=>decode(match[1]??match[2])))]));
const missingFragments=new Set();
for(const row of rows){
 for(const link of row.links){
  if(!link.href)continue;
  const path=sameOriginPath(link.href,row.path);
  if(path && !sitemapPaths.has(path) && !knownNonpages.has(path))extraLinks.add(path);
  if(path && link.href.includes('#') && idsByPage.has(path)){
   const fragment=new URL(link.href,new URL(row.path,origin)).hash.slice(1);
   if(fragment && !idsByPage.get(path).has(decodeURIComponent(fragment)))missingFragments.add(row.path+' → '+link.href);
  }
 }
}
for(const link of missingFragments)check(false,'Missing internal fragment '+link);
await mapLimit([...extraLinks],async path=>{
 const result=await fetchPage(path);
 const location=result.headers.get('location');
 const redirectPath=location?new URL(location,base).pathname:null;
 const legacy=path==='/library'&&[301,308].includes(result.status)&&redirectPath==='/prompts';
 check(result.status===200 || legacy,path+' is an internal link returning '+result.status);
});
if (process.env.NEXT_PUBLIC_AFFILIATES_ENABLED==='true') {
  const configured=new Set(Object.entries(process.env).filter(([key,value])=>key.startsWith('NEXT_PUBLIC_AFFILIATE_') && value).map(([,value])=>normalized(value)));
  for (const row of rows) {
    for (const link of row.links.filter(link=>configured.has(normalized(link.href)) && normalized(link.href))) {
      check(link.rel?.split(/\s+/).includes('sponsored'),row.path+' has an unsponsored affiliate link');
    }
  }
}
if (findings.length) {
  for (const finding of findings) console.error(finding);
  process.exitCode=1;
} else {
  console.log(JSON.stringify({httpPages:rows.length,baselinePages:baselinePaths.length,sitemap:urls.length,
    discoverablePrompts:discoveredPrompts.size,categoryPrompts:sectionIds.size,relatedNichePages:24,
    markdownSamples:markdownPaths.length,otherInternalTargets:extraLinks.size,violations:0},null,2));
}
