import config from '@/config/editorial.json';
import {redirect} from 'next/navigation';
export const metadata={title:'Article editor',robots:{index:false,follow:false}};
export default function Editor(){const studioUrl=process.env.SANITY_STUDIO_URL||config.studioUrl;if(studioUrl){const u=new URL(studioUrl);if(u.protocol==='https:')redirect(u.origin);}return <div className="container page-content"><h1>Article editor</h1><p>The standalone Sanity Studio is being connected. Editors sign in with their own Sanity account; editing is not available on this page.</p><a className="button" href={`https://www.sanity.io/manage/project/${config.projectId}`}>Open Sanity project ↗</a></div>;}
