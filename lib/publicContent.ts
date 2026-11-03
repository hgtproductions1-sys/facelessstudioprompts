import 'server-only';
import {SITE_NAME,SITE_URL,CONTACT_EMAIL,INDEXABLE} from '@/lib/site';
import {PROMPTS} from '@/data/promptLibrary';
import {PROMPT_COLLECTIONS,getPromptsForCollection} from '@/data/promptPages';
import {ARTICLE_GUIDES} from '@/data/articleGuides';
import {NICHE_PAGES} from '@/data/niches';
import {getNicheGuide} from '@/data/nicheGuides';
import {VIDEOS} from '@/data/videos';
import {INFO_PAGES} from '@/data/legal';
import {PRODUCT_UPDATES} from '@/data/productUpdates';
import {RESOURCE_NOTES} from '@/data/creatorResources';
import {START_PATHS} from '@/data/startPaths';
import {getEditorialPosts,editorialPath,safeContentUrl,cmsImageUrl,cmsBodyImage,cmsYoutubeId,type EditorialPost} from '@/lib/editorial';
import editorialConfig from '@/config/editorial.json';

type PublicPage={path:string;title:string;description:string};
const mainPages:PublicPage[]=[
 {path:'/',title:SITE_NAME,description:'Free AI prompts and video production plans for faceless content creators.'},
 {path:'/start-here',title:'Make your first faceless video',description:'Choose a beginner path, a lesson, and an editable production checklist.'},
 {path:'/studio',title:'Free AI video prompt and storyboard Studio',description:'Create an editable hook, shot list, scene prompts, narration direction, and editing checklist.'},
 {path:'/prompts',title:'Free AI prompt library',description:'Editable image, video, character, niche, and YouTube prompt templates.'},
 {path:'/niches',title:'24 faceless YouTube niche playbooks',description:'Audience ideas, episode structures, scene prompts, and production checks.'},
 {path:'/guides',title:'Faceless creator guides',description:'Guidance on planning, AI prompting, continuity, and responsible publishing.'},
 {path:'/videos',title:'AI video tutorials',description:'Credited external lessons with original practice exercises.'},
 {path:'/free-tools',title:'Free hook, narration time, and shot prompt tools',description:'Browser tools for openings, speaking-time estimates, and single-shot prompts.'},
 {path:'/ai-tools-hub',title:'AI tools for faceless video production',description:'Direct official links for image, video, voice, and editing tools.'},
 {path:'/faceless-youtube-automation',title:'Faceless YouTube production workflow',description:'A practical process from viewer promise to script, shots, editing, and publication.'},
 {path:'/updates',title:'Product updates',description:'Dated changes to the project.'},
];
const workflow=[
 ['Choose the viewer promise','Write who the video is for and the one thing it should deliver. Choose a specific topic or original fictional premise.'],
 ['Draft the structure and script','Decide on the opening image, the main change or question, and the final payoff. Keep a source record for factual claims.'],
 ['Plan the visuals one shot at a time','Create a stable subject reference, then assign one action and one camera movement to each clip.'],
 ['Generate and review the media','Inspect continuity, motion, rights, and voice permissions. Save useful versions and revise shots that drift.'],
 ['Edit and publish','Refine narration, captions, sound, and pacing. Write a title and thumbnail that match the finished video.'],
];
const absolute=(value:string)=>value.startsWith('/')?SITE_URL+value:value;
const escape=(value:string)=>value.replace(/([\\`*_[\]<>])/g,'\\$1');
const link=(title:string,url:string)=>`[${escape(title)}](${absolute(url)})`;
const list=(items:string[])=>items.map(x=>'- '+x).join('\n');
const code=(text:string)=>{const fence='`'.repeat(Math.max(3,...[...text.matchAll(/`+/g)].map(x=>x[0].length+1)));return `${fence}text\n${text}\n${fence}`;};
const footer=`\n\n---\nPublisher: ${link(SITE_NAME,'/about')} · ${link('Editorial policy','/editorial-policy')} · ${link('Contact','/contact')}\n`;

export function publicPages(posts:EditorialPost[]):PublicPage[]{
 const migrated=new Set<string>(editorialConfig.migratedGuideSlugs);
 return [...mainPages,...Object.entries(INFO_PAGES).map(([slug,p])=>({path:'/'+slug,title:p.eyebrow,description:p.description})),
  ...PROMPT_COLLECTIONS.map(p=>({path:'/prompts/'+p.slug,title:p.title,description:p.description})),
  ...PROMPTS.map(p=>({path:'/prompts/'+p.id,title:p.title,description:p.tips||'Editable '+p.category+' prompt template.'})),
  ...NICHE_PAGES.map(n=>({path:'/niches/'+n.slug,title:n.name,description:n.metaDescription})),
  ...ARTICLE_GUIDES.filter(g=>!migrated.has(g.slug)).map(g=>({path:'/guides/'+g.slug,title:g.title,description:g.description})),
  ...VIDEOS.map(v=>({path:'/videos/'+v.slug,title:v.title,description:v.description})),
  ...(posts.some(p=>p.section==='articles')?[{path:'/articles',title:'Articles for faceless creators',description:'Original prompt breakdowns, production notes, and AI video workflows.'}]:[]),
  ...posts.map(p=>({path:editorialPath(p),title:p.title!,description:p.excerpt!})),
 ];
}

// Portable Text is serialized from the published query, never from a draft token or preview.
export function portableMarkdown(body:EditorialPost['body']){
 return (body||[]).map(block=>{
  if(block._type==='image'){
   const image=cmsBodyImage(block.asset?._ref);return image?`![${escape(block.alt||'')}](${image.url})${block.caption?'\n\n'+block.caption:''}`:'';
  }
  if(block._type!=='block')return '';
  const text=(block.children||[]).map(span=>{
   let value=escape(span.text||'');
   for(const mark of span.marks||[]){
    const definition=(block.markDefs||[]).find(d=>d._key===mark);const href=definition&&safeContentUrl(definition.href);
    if(href)value=link(span.text||'',href);else if(mark==='strong')value=`**${value}**`;else if(mark==='em')value=`*${value}*`;else if(mark==='code')value='`'+(span.text||'').replace(/`/g,'')+'`';
   }
   return value;
  }).join('');
  const style=block.style||'normal';
  return /^h[1-6]$/.test(style)?'#'.repeat(Number(style[1]))+' '+text:block.listItem?(block.listItem==='number'?'1. ':'- ')+text:style==='blockquote'?'> '+text:text;
 }).filter(Boolean).join('\n\n');
}
function resourceNotes(path:string){return (RESOURCE_NOTES[path]||[]).map(s=>`## ${s.title}\n\n${s.body.join('\n\n')}${s.links?'\n\n'+list(s.links.map(l=>link(l.label,l.href))):''}`).join('\n\n');}

export function pageMarkdown(path:string,posts:EditorialPost[]):string|null{
 const page=publicPages(posts).find(p=>p.path===path);if(!page)return null;
 const content:string[]=[`# ${page.title}`,`Canonical URL: ${SITE_URL+path}`,page.description];
 const post=posts.find(p=>editorialPath(p)===path);
 if(post){
  content.push(`By ${post.authorName}\n\nPublished: ${post.publishedAt}\nUpdated: ${post._updatedAt}`);
  const cover=cmsImageUrl(post.cover?.url);if(cover)content.push(`![${escape(post.cover?.alt||'')}](${cover})`);
  if(post.takeaways?.length)content.push('## What you’ll take away\n\n'+list(post.takeaways));
  content.push(portableMarkdown(post.body));
  const id=cmsYoutubeId(post.youtubeVideo?.videoId);if(id)content.push(`## Supporting YouTube lesson\n\n${link(post.youtubeVideo?.title||'Watch lesson','https://www.youtube.com/watch?v='+id)}\n\nBy ${post.youtubeVideo?.creator||'the credited creator'}. ${post.youtubeVideo?.description||''}`);
  if(post.sources?.length)content.push('## Sources\n\n'+list(post.sources.flatMap(s=>{const url=safeContentUrl(s.url);return url?[link(s.label||url,url)]:[];})));
  if(post.authorBio)content.push('## About the author\n\n'+post.authorBio);
 }else if(path.startsWith('/prompts/')){
  const slug=path.split('/')[2],p=PROMPTS.find(p=>p.id===slug),c=PROMPT_COLLECTIONS.find(c=>c.slug===slug);
  if(p)content.push(`By ${SITE_NAME}`,p.tips||'', '## Editable prompt\n\n'+code(p.prompt),'## How to use it\n\nReplace placeholders with your own topic, audience, and source material. Paste the prompt into your chosen tool, check its supported controls, and review the result for accuracy, rights, and fit with the finished video.');
  if(c)content.push(c.intro,'## Use this collection for\n\n'+list(c.bestFor),...c.workflow.map(s=>'## '+s.title+'\n\n'+s.body),'## Prompts in this collection\n\n'+list(getPromptsForCollection(c).map(p=>link(p.title,'/prompts/'+p.id))),...c.faq.map(f=>'## '+f.question+'\n\n'+f.answer));
 }else if(path.startsWith('/guides/')){
  const g=ARTICLE_GUIDES.find(g=>path==='/guides/'+g.slug)!;
  content.push(`By ${SITE_NAME}\n\nUpdated: ${g.updated}`,g.summary,'## What you’ll take away\n\n'+list(g.takeaways));
  for(const s of g.sections)content.push(`## ${s.title}`,s.paragraphs?.join('\n\n')||'',s.bullets?list(s.bullets):'',s.steps?.map(x=>'### '+x.title+'\n\n'+x.body).join('\n\n')||'',s.example?'### '+s.example.label+'\n\n'+code(s.example.text):'',s.callout?'### '+s.callout.title+'\n\n'+s.callout.body:'');
  if(g.sources)content.push('## Sources\n\n'+list(g.sources.map(s=>link(s.label,s.url)+(s.note?' — '+s.note:''))));
 }else if(path.startsWith('/niches/')){
  const n=NICHE_PAGES.find(n=>path==='/niches/'+n.slug)!,g=getNicheGuide(n.slug);
  content.push(`By ${SITE_NAME}`,n.intro);
  if(g)content.push(g.promise,'## Audience\n\n'+g.audience,'## Formats\n\n'+list(g.bestFormats),...g.channelAngles.map(a=>'## '+a.title+'\n\n'+a.description),'## Episode ideas\n\n'+list(g.videoIdeas),...g.episodeStructure.map(s=>'## '+s.title+'\n\n'+s.description),'## Quality checks\n\n'+list(g.qualityChecks));
  for(const p of n.prompts)content.push('## '+p.title,'Narration / character direction: '+p.character,'### Image prompt\n\n'+code(p.visual),'### Motion prompt\n\n'+code(p.camera));
  content.push(...n.faqs.map(f=>'## '+f.question+'\n\n'+f.answer));
 }else if(path.startsWith('/videos/')){
  const v=VIDEOS.find(v=>path==='/videos/'+v.slug)!;
  content.push(`${link(v.originalTitle,'https://www.youtube.com/watch?v='+v.id)}\n\nVideo by ${link(v.creator,v.creatorUrl)}${v.uploaded?' · Published '+v.uploaded:''}. Practice notes by ${SITE_NAME}.`,v.note||'','## What to learn\n\n'+v.takeaway,'## Your practice exercise\n\n'+v.exercise,list(v.practiceTips),code(v.prompt),link(v.resourceLabel,v.resourceUrl),link('Read the related creator guide','/guides/'+v.guide));
 }else if(INFO_PAGES[path.slice(1)]){
  const info=INFO_PAGES[path.slice(1)];if(info.updated)content.push('Updated: '+info.updated);
  for(const s of info.sections)content.push('## '+s.title,s.body.join('\n\n'),s.links?list(s.links.map(l=>link(l.label,l.href))):'');
 }else if(path==='/updates'){
  content.push(...PRODUCT_UPDATES.map(u=>`## ${u.date}: ${u.title}\n\n${u.body.join('\n\n')}`));
 }else if(path==='/start-here'){
  content.push('Choose a beginner path, watch the matching lesson, customize a prompt, build a plan, and review your first video. Checklist progress is saved in this browser.',...START_PATHS.map(p=>`## ${p.name}\n\n${p.description}\n\n${link('Plan this video','/studio?niche='+p.niche)}\n\n${link('Practice prompt','/prompts/'+p.prompt)}\n\n${link('Watch lesson','/videos/'+p.video)}\n\n${link('Creator guide','/guides/'+p.guide)}`));
 }else if(path==='/'){
  content.push('The Faceless Prompts helps creators plan videos without an on-camera presenter. Browse free prompt templates, 24 niche playbooks, creator guides, credited YouTube lessons, and original articles. The Studio creates editable production plans; it does not render or upload videos.','## When to use this site\n\nUse these resources to choose a faceless channel format, write a visual prompt, keep AI characters consistent, plan a shot list, or improve narration and editing. Prompts are starting points that need your own creative direction and review.','## Start creating\n\n'+list(mainPages.filter(p=>p.path!=='/').map(p=>link(p.title,p.path))),link('Read the creator articles','/articles'));
 }else if(path==='/faceless-youtube-automation'){
  content.push(...workflow.map(([title,body],i)=>`## ${i+1}. ${title}\n\n${body}`));
 }else if(path==='/free-tools'){
  content.push('## Browser tools\n\nHook idea builder: enter your topic to generate five reusable opening structures.\n\nNarration time estimator: divide word count by words per minute, then multiply by 60 to estimate seconds.\n\nSingle-shot prompt builder: combine a subject, one action, camera movement, light, and frame ratio. These interactive tools run in your browser.');
 }
 const indexPrefix:Record<string,string>={'/prompts':'/prompts/','/niches':'/niches/','/guides':'/guides/','/videos':'/videos/','/articles':'/articles/'};
 if(indexPrefix[path])content.push('## Browse\n\n'+list(publicPages(posts).filter(p=>p.path.startsWith(indexPrefix[path])).map(p=>link(p.title,p.path)+' — '+p.description)));
 if(path==='/ai-tools-hub')content.push('## Official providers\n\n'+list([link('Google Flow','https://flow.google/'),link('Runway','https://runway.com/'),link('Kling','https://klingai.com/'),link('Midjourney','https://www.midjourney.com/'),link('Leonardo','https://leonardo.ai/'),link('ElevenLabs','https://elevenlabs.io/'),link('CapCut','https://www.capcut.com/'),link('DaVinci Resolve','https://www.blackmagicdesign.com/products/davinciresolve')]));
 content.push(resourceNotes(path));
 return content.filter(Boolean).join('\n\n')+footer;
}
export async function publishedContent(){const posts=await getEditorialPosts();return {posts,pages:publicPages(posts)};}
export function markdownHeaders(path?:string){return {'Content-Type':'text/markdown; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...(!INDEXABLE?{'X-Robots-Tag':'noindex, follow'}:{}),...(path?{'Link':`<${SITE_URL+path}>; rel="canonical"`}:{})};}
export function unavailableMarkdown(){return new Response('# Temporarily unavailable\n\nPlease try again shortly. '+link('Home','/')+' · '+link('Sitemap','/sitemap.xml')+'\n',{status:503,headers:{...markdownHeaders(),'Retry-After':'60'}});}
export function llmsIndex(pages:PublicPage[]){return `# ${SITE_NAME}\n\n> Free AI prompts and workflows for faceless content creators.\n\n## When to use this site\n\nUse the site for editable image and video prompts, shot lists, narration planning, character continuity, niche playbooks, and original creator articles. The Studio creates a production plan, not finished videos. Prompts do not guarantee views, monetization, or platform approval.\n\n## Reading the content\n\nCanonical pages contain server-rendered HTML. Follow the text/markdown alternate link in each page for a text representation at /markdown. ${link('Complete public content','/llms-full.txt')} contains the same published source material in one file. Drafts, private previews, and API endpoints are excluded.\n\n## Resources\n\n${list(pages.map(p=>link(p.title,p.path)+' — '+p.description))}\n\n## Publisher and contact\n\n${link('About the project','/about')} · ${link('Editorial policy','/editorial-policy')} · ${link('Privacy','/privacy')}\n\nEmail: ${CONTACT_EMAIL}\n\n${link('XML sitemap','/sitemap.xml')} · ${link('Video sitemap','/video-sitemap.xml')}\n`;}
