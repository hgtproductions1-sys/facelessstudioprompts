import {defineEnableDraftMode} from 'next-sanity/draft-mode';
import {editorialClient} from '@/lib/editorial';
export async function GET(request:Request){const token=process.env.SANITY_API_READ_TOKEN;if(!token)return new Response('Preview is not configured.',{status:503,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'}});const {GET}=defineEnableDraftMode({client:editorialClient.withConfig({token})});return GET(request);}
