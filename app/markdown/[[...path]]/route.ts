import {pageMarkdown,markdownHeaders,unavailableMarkdown} from '@/lib/publicContent';
import {getEditorialPost,getEditorialPosts} from '@/lib/editorial';
import {SITE_URL} from '@/lib/site';
export const dynamic='force-dynamic';
export async function GET(_request:Request,{params}:{params:Promise<{path?:string[]}>}){
 try{const {path:parts}=await params;const path=parts?.length?'/'+parts.join('/'):'/';
  // Unknown and private paths are rejected before requesting any CMS content.
  if(/^\/(?:api|admin|preview|markdown)(?:\/|$)/.test(path))return missing();
  let body=pageMarkdown(path,[]);
  if(path==='/articles'||path==='/guides')body=pageMarkdown(path,await getEditorialPosts());
  else if(!body&&parts?.length===2&&(parts[0]==='articles'||parts[0]==='guides')){
   const post=await getEditorialPost(parts[0],parts[1]);
   if(post)body=pageMarkdown(path,[post]);
  }
  return body?new Response(body,{headers:markdownHeaders(path)}):missing();
 }catch{return unavailableMarkdown();}
}
function missing(){return new Response(`# Page not found\n\nThis address does not match a public page. Browse [the prompt library](${SITE_URL}/prompts), [creator guides](${SITE_URL}/guides), or the [sitemap](${SITE_URL}/sitemap.xml).\n`,{status:404,headers:{...markdownHeaders(),'X-Robots-Tag':'noindex, follow'}});}
