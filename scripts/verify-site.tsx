import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {buildTemplate,DEFAULT_OPTIONS,FORMATS,timeline,formatShot,exportBlueprint} from '../lib/blueprint';
import {NICHE_PAGES,NICHES_DATA} from '../data/niches';
import {getNicheGuide} from '../data/nicheGuides';
import {PROMPTS} from '../data/promptLibrary';
import {PROMPT_COLLECTIONS} from '../data/promptPages';
import {ARTICLE_GUIDES} from '../data/articleGuides';
import {VIDEOS,GUIDE_LESSONS,getPrimaryVideoForGuide,filterVideos} from '../data/videos';
import {GUIDE_IMAGES} from '../data/guideImages';
import {INFO_PAGES} from '../data/legal';
import {schema,SITE_URL,resolveSiteUrl} from '../lib/site';
import {filterPrompts,getPromptInfo,parseSavedPrompts} from '../lib/promptFilters';
import {parseStudioDraft} from '../lib/studioOptions';
import {START_PATHS,studioUrl} from '../data/startPaths';
import StartHere from '../app/start-here/page';
import {GET as status,POST} from '../app/api/generate/route';
import {GET as sitemap,allPaths,modifiedFor} from '../app/sitemap.xml/route';
import {GET as videoSitemap} from '../app/video-sitemap.xml/route';
import {GET as robots} from '../app/robots.txt/route';
import Home from '../app/page';
import Prompts from '../app/prompts/page';
import PromptPage,{generateMetadata as promptMetadata} from '../app/prompts/[slug]/page';
import Niches from '../app/niches/page';
import NichePage,{generateMetadata as nicheMetadata} from '../app/niches/[slug]/page';
import Guides from '../app/guides/page';
import GuidePage,{generateMetadata as guideMetadata} from '../app/guides/[slug]/page';
import Videos from '../app/videos/page';
import VideoPage,{generateMetadata as videoMetadata} from '../app/videos/[slug]/page';
import StudioPage from '../app/studio/page';
import FreeTools from '../app/free-tools/page';
import Tools from '../app/ai-tools-hub/page';
import Workflow from '../app/faceless-youtube-automation/page';
import InfoPage,{generateMetadata as infoMetadata} from '../app/[page]/page';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const paths=allPaths();assert.equal(new Set(paths).size,paths.length);
assert.equal(NICHE_PAGES.length,24);assert.equal(NICHES_DATA.length,24);
assert.equal(new Set(PROMPTS.map(p=>p.id)).size,PROMPTS.length);
assert.equal(new Set(VIDEOS.map(v=>v.id)).size,VIDEOS.length);
assert.equal(new Set(VIDEOS.map(v=>v.slug)).size,VIDEOS.length);
assert.equal(new Set(ARTICLE_GUIDES.map(g=>GUIDE_IMAGES[g.slug]?.src)).size,ARTICLE_GUIDES.length);
assert.equal(new Set(Object.values(GUIDE_LESSONS)).size,ARTICLE_GUIDES.length);
for(const g of ARTICLE_GUIDES){assert(GUIDE_IMAGES[g.slug]?.alt);assert(getPrimaryVideoForGuide(g.slug));}
for(const v of VIDEOS){assert(/^[A-Za-z0-9_-]{11}$/.test(v.id));assert(ARTICLE_GUIDES.some(g=>g.slug===v.guide));assert(v.practiceTips.length>0);if(v.uploaded)assert(!Number.isNaN(Date.parse(v.uploaded)));}
assert.deepEqual(filterVideos(VIDEOS,'  RUNWAY  ','').map(v=>v.slug),['runway-character-references','runway-3d-scene-references']);
assert.deepEqual(filterVideos(VIDEOS,'','Publishing').map(v=>v.slug),['youtube-ai-content-disclosure']);
assert.equal(filterVideos(VIDEOS,'no-such-video-lesson','').length,0);
assert.equal(new Set([...PROMPTS.map(p=>p.id),...PROMPT_COLLECTIONS.map(p=>p.slug)]).size,PROMPTS.length+PROMPT_COLLECTIONS.length);
assert.equal(resolveSiteUrl('https://thefacelessprompts.com/'),'https://thefacelessprompts.com');
for(const origin of ['http://example.com','https://example.com/path','https://user:pass@example.com','https://example.com?q=x','https://example.com/#x'])assert.throws(()=>resolveSiteUrl(origin));
assert.equal(modifiedFor('/prompts/char-identity-lock'),undefined);
assert.equal(modifiedFor('/start-here'),'2026-10-08');
assert.deepEqual(filterPrompts(PROMPTS,{query:'  STICKMAN   animation  '}).map(p=>p.id),['vid-stickman-explainer']);
assert(filterPrompts(PROMPTS,{category:'Video Gen',tool:'Runway',level:'Beginner',format:'Shorts'}).length>0);
assert.equal(filterPrompts(PROMPTS,{category:'SEO',tool:'Runway'}).length,0);
assert.deepEqual(filterPrompts(PROMPTS,{onlySaved:true,saved:['char-identity-lock']}).map(p=>p.id),['char-identity-lock']);
assert.deepEqual(parseSavedPrompts({promptIds:['char-identity-lock','missing','char-identity-lock',3]},PROMPTS.map(p=>p.id)),['char-identity-lock']);
assert.throws(()=>parseSavedPrompts({wrong:[]},PROMPTS.map(p=>p.id)));
assert.equal(parseStudioDraft({...DEFAULT_OPTIONS,topic:'x'},NICHES_DATA.map(n=>n.id)),null);
assert.equal(parseStudioDraft({...DEFAULT_OPTIONS,engine:'invented'},NICHES_DATA.map(n=>n.id)),null);
assert.deepEqual(parseStudioDraft(DEFAULT_OPTIONS,NICHES_DATA.map(n=>n.id)),DEFAULT_OPTIONS);
for(const p of PROMPTS){const info=getPromptInfo(p);assert(ARTICLE_GUIDES.some(g=>g.slug===info.guide));assert(info.tools.length);assert(info.formats.length);}
for(const p of START_PATHS){assert(NICHES_DATA.some(n=>n.id===p.niche));assert(PROMPTS.some(x=>x.id===p.prompt));assert(ARTICLE_GUIDES.some(g=>g.slug===p.guide));assert(VIDEOS.some(v=>v.slug===p.video));const u=new URL(studioUrl(p,'An idea & another idea','story','Runway'),SITE_URL);assert.equal(u.searchParams.get('topic'),'An idea & another idea');assert.equal(u.searchParams.get('niche'),p.niche);assert.equal(u.searchParams.get('format'),'story');}
let blueprintChecks=0;
for(const n of NICHES_DATA){assert(NICHE_PAGES.some(p=>p.slug===n.id));assert(getNicheGuide(n.slug));for(const f of FORMATS){const o={...DEFAULT_OPTIONS,niche:n.id,format:f.id,topic:'An original production brief for '+n.title};const b=buildTemplate(o);assert.equal(b.source,'template');assert.equal(b.shots.length,f.shots);assert(b.topic===o.topic);assert(b.niche===n.title);assert.equal(b.shots[0].time.split(' – ')[0],'0:00');assert.equal(b.shots.at(-1)!.time.split(' – ')[1],Math.floor(f.seconds/60)+':00');assert.deepEqual(b.shots.map(s=>s.time),timeline(f.shots,f.id));assert(exportBlueprint(b,'Universal').includes(o.topic));assert(formatShot(b.shots[0],b,'Midjourney').startsWith('Create a single reference frame.'));assert(!formatShot(b.shots[0],b,'Runway').includes('--motion'));blueprintChecks++;}}
const originalKey=process.env.GLM_API_KEY;const originalFetch=globalThis.fetch;delete process.env.GLM_API_KEY;
const req=(body:unknown,ip='test')=>new Request(SITE_URL+'/api/generate',{method:'POST',headers:{'Content-Type':'application/json','cf-connecting-ip':ip},body:JSON.stringify(body)});
try{
 assert.equal((await status()).status,200);assert.equal((await (await status()).json() as {aiAvailable:boolean}).aiAvailable,false);
 assert.equal((await POST(req({...DEFAULT_OPTIONS,mode:'template'}))).status,200);
 for(const bad of [{...DEFAULT_OPTIONS,topic:'x'},{...DEFAULT_OPTIONS,topic:'a'.repeat(301)},{...DEFAULT_OPTIONS,niche:'invented'},{...DEFAULT_OPTIONS,engine:'invented'},{...DEFAULT_OPTIONS,format:'invented'}])assert.equal((await POST(req(bad))).status,400);
 assert.equal((await POST(req({...DEFAULT_OPTIONS,mode:'ai'}))).status,503);
 assert.equal((await POST(new Request(SITE_URL+'/api/generate',{method:'POST',body:'not-json'}))).status,400);
 assert.equal((await POST(new Request(SITE_URL+'/api/generate',{method:'POST',body:' '.repeat(9000)}))).status,413);
 process.env.GLM_API_KEY='test-only-placeholder';
 const sample=buildTemplate(DEFAULT_OPTIONS);globalThis.fetch=(async()=>Response.json({choices:[{message:{content:JSON.stringify(sample)}}]})) as typeof fetch;
 const live=await POST(req({...DEFAULT_OPTIONS,mode:'ai'},'valid-ai'));assert.equal(live.status,200);assert.equal((await live.json() as {source:string}).source,'ai');
 globalThis.fetch=(async()=>Response.json({choices:[{message:{content:'not-json'}}]})) as typeof fetch;assert.equal((await POST(req({...DEFAULT_OPTIONS,mode:'ai'},'invalid-json'))).status,502);
 globalThis.fetch=(async()=>Response.json({choices:[{message:{content:JSON.stringify({...sample,shots:sample.shots.slice(0,2)})}}]})) as typeof fetch;assert.equal((await POST(req({...DEFAULT_OPTIONS,mode:'ai'},'incomplete'))).status,502);
 globalThis.fetch=(async()=>new Response('',{status:429})) as typeof fetch;assert.equal((await POST(req({...DEFAULT_OPTIONS,mode:'ai'},'provider-limit'))).status,429);
 globalThis.fetch=(async()=>{throw new DOMException('Timed out','AbortError');}) as typeof fetch;assert.equal((await POST(req({...DEFAULT_OPTIONS,mode:'ai'},'timeout'))).status,504);
 for(let i=0;i<4;i++)assert.equal((await POST(req({...DEFAULT_OPTIONS,mode:'ai'},'rate-test'))).status,504);assert.equal((await POST(req({...DEFAULT_OPTIONS,mode:'ai'},'rate-test'))).status,429);
}finally{globalThis.fetch=originalFetch;if(originalKey===undefined)delete process.env.GLM_API_KEY;else process.env.GLM_API_KEY=originalKey;}
assert(!schema({name:'</script><script>bad</script>'}).includes('</script>'));
const xml=await (await sitemap()).text();assert.equal((xml.match(/<loc>/g)||[]).length,paths.length);assert(paths.every(p=>xml.includes('<loc>'+SITE_URL+p+'</loc>')));
assert((await (await videoSitemap()).text()).includes('<video:player_loc>'));assert((await (await robots()).text()).includes('Disallow: /api/'));
const videoXml=await (await videoSitemap()).text();assert.equal((videoXml.match(/<video:video>/g)||[]).length,VIDEOS.length);assert(!videoXml.includes('>null<'));assert.equal((videoXml.match(/<video:publication_date>/g)||[]).length,VIDEOS.filter(v=>v.uploaded).length);
const rendered=new Map<string,string>();
async function page(path:string,el:React.ReactNode){const html=renderToStaticMarkup(<>{el}</>);assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,path+' must have one h1');assert(!html.includes('Starter Project'));for(const match of html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)){JSON.parse(match[1]);}rendered.set(path,html);}
await page('/',<Home/>);await page('/start-here',<StartHere/>);await page('/prompts',await Prompts({searchParams:Promise.resolve({})}));await page('/niches',<Niches/>);await page('/guides',<Guides/>);await page('/videos',<Videos/>);await page('/studio',await StudioPage({searchParams:Promise.resolve({})}));await page('/free-tools',<FreeTools/>);await page('/ai-tools-hub',<Tools/>);await page('/faceless-youtube-automation',<Workflow/>);
assert(!rendered.get('/videos')!.includes('<iframe'));assert.equal((rendered.get('/videos')!.match(/class="video-poster"/g)||[]).length,VIDEOS.length);
for(const n of NICHE_PAGES){await page('/niches/'+n.slug,await NichePage({params:Promise.resolve({slug:n.slug})}));const m=await nicheMetadata({params:Promise.resolve({slug:n.slug})});assert.equal(m.alternates?.canonical,SITE_URL+'/niches/'+n.slug);}
const promptDescriptions:string[]=[];
for(const p of [...PROMPTS.map(x=>x.id),...PROMPT_COLLECTIONS.map(x=>x.slug)]){await page('/prompts/'+p,await PromptPage({params:Promise.resolve({slug:p})}));const m=await promptMetadata({params:Promise.resolve({slug:p})});assert.equal(m.alternates?.canonical,SITE_URL+'/prompts/'+p);assert(m.description);promptDescriptions.push(m.description!);}
assert.equal(new Set(promptDescriptions).size,promptDescriptions.length);
for(const g of ARTICLE_GUIDES){await page('/guides/'+g.slug,await GuidePage({params:Promise.resolve({slug:g.slug})}));const m=await guideMetadata({params:Promise.resolve({slug:g.slug})});assert.equal(m.alternates?.canonical,SITE_URL+'/guides/'+g.slug);}
for(const v of VIDEOS){await page('/videos/'+v.slug,await VideoPage({params:Promise.resolve({slug:v.slug})}));const m=await videoMetadata({params:Promise.resolve({slug:v.slug})});assert.equal(m.alternates?.canonical,SITE_URL+'/videos/'+v.slug);}
for(const p of Object.keys(INFO_PAGES)){await page('/'+p,await InfoPage({params:Promise.resolve({page:p})}));const m=await infoMetadata({params:Promise.resolve({page:p})});assert.equal(m.alternates?.canonical,SITE_URL+'/'+p);}
assert.equal(rendered.size,paths.length);
for(const v of VIDEOS){const html=rendered.get('/videos/'+v.slug)!;assert.equal((html.match(/<iframe/g)||[]).length,1);assert(html.includes('src="https://www.youtube-nocookie.com/embed/'+v.id+'"'));assert(!html.includes('autoplay=1'));}
const extra=renderToStaticMarkup(<><SiteHeader/><SiteFooter/></>);
for(const [path,html] of [...rendered,['chrome',extra] as const]){
 for(const [,href] of html.matchAll(/href="([^"]+)"/g)){if(href.startsWith('/')){const u=new URL(href.replace(/&#x([0-9a-f]+);/gi,(_,h)=>String.fromCodePoint(parseInt(h,16))).replace(/&#([0-9]+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&amp;/g,'&').replace(/&quot;/g,'\"'),SITE_URL);assert(existsSync('public'+u.pathname)||paths.includes(u.pathname)||['/library','/sitemap.xml','/robots.txt','/video-sitemap.xml'].includes(u.pathname),path+' broken local link '+u.pathname);if(u.hash){const target=rendered.get(u.pathname)||html;assert(target.includes('id="'+decodeURIComponent(u.hash.slice(1))+'"'),path+' broken section '+href);}}}
 for(const [,src] of html.matchAll(/src="(\/[^"]+)"/g)){assert(existsSync('public'+src),path+' missing asset '+src);}for(const [,set] of html.matchAll(/srcSet="([^"]+)"/g))for(const entry of set.split(',')){const src=entry.trim().split(/\s+/)[0];if(src.startsWith('/'))assert(existsSync('public'+src),path+' missing responsive asset '+src);}
}
await assert.rejects(()=>NichePage({params:Promise.resolve({slug:'missing'})}));await assert.rejects(()=>PromptPage({params:Promise.resolve({slug:'missing'})}));await assert.rejects(()=>GuidePage({params:Promise.resolve({slug:'missing'})}));await assert.rejects(()=>InfoPage({params:Promise.resolve({page:'missing'})}));
const css=readFileSync('app/globals.css','utf8');assert(css.includes('prefers-reduced-motion'));assert(css.includes(':focus-visible'));assert(css.includes('@media(max-width:520px)'));
console.log(JSON.stringify({status:'passed',renderedPages:rendered.size,prompts:PROMPTS.length,niches:NICHE_PAGES.length,guides:ARTICLE_GUIDES.length,videos:VIDEOS.length,blueprintCombinations:blueprintChecks,checks:['server rendering','internal links and fragments','local assets','unique canonical URLs','structured-data JSON','domain portability','prompt filters and bookmark imports','beginner journey links','draft import validation','responsive image sources','unique prompt descriptions','accurate sitemap dates','sitemaps','all niche and duration templates','API input validation','missing AI configuration','mocked AI success and failure','rate limiting','unknown content slugs','mobile CSS rules and reduced motion']},null,2));

