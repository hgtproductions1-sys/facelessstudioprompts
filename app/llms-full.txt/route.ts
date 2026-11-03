import {publishedContent,llmsIndex,pageMarkdown,markdownHeaders,unavailableMarkdown} from '@/lib/publicContent';
export const dynamic='force-dynamic';
export async function GET(){try{const {pages,posts}=await publishedContent();return new Response(llmsIndex(pages)+'\n---\n\n'+pages.map(p=>pageMarkdown(p.path,posts)).join('\n\n---\n\n'),{headers:markdownHeaders()});}catch{return unavailableMarkdown();}}
