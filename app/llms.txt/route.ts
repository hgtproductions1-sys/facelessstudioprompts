import {publishedContent,llmsIndex,markdownHeaders,unavailableMarkdown} from '@/lib/publicContent';
export const dynamic='force-dynamic';
export async function GET(){try{const {pages}=await publishedContent();return new Response(llmsIndex(pages),{headers:markdownHeaders()});}catch{return unavailableMarkdown();}}
