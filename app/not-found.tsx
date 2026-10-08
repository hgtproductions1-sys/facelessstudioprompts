import {metadataFor} from '@/lib/site';
export const metadata={...metadataFor('/404','Page not found','Find the prompt library, niche playbooks, and creator guides at The Faceless Prompts.'),robots:{index:false,follow:true}};
export default function NotFound(){return <div className="container page-content"><div className="empty-state not-found"><p className="eyebrow">404 / A missing scene</p><h1>This page isn’t in the storyboard.</h1><p>The link may have changed. Find a fresh starting point below.</p><div className="button-row"><a className="button" href="/">Back to home ↗</a><a className="button button-outline" href="/prompts">Browse prompts</a></div></div></div>;}

