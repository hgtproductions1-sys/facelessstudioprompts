import {SITE_URL} from '@/lib/site';
export function GET(){return Response.redirect(SITE_URL+'/prompts',308);}

