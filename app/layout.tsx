import type { Metadata } from 'next';
import Script from 'next/script';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import {JsonLd} from '@/components/Shared';
import {SITE_NAME,SITE_URL,SEARCH_CONSOLE_VERIFICATION,CONTACT_EMAIL,FOUNDER_NAME} from '@/lib/site';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title:{default:'Free AI Video Prompts & Creator Guides | The Faceless Prompts',template:'%s | The Faceless Prompts'},description:'Turn your ideas into faceless video plans with free scene prompts, 24 niche playbooks, a searchable prompt library, and practical creator guides.',verification:SEARCH_CONSOLE_VERIFICATION?{google:SEARCH_CONSOLE_VERIFICATION}:undefined,other:{'google-adsense-account':'ca-pub-3120853344446369'},icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><Script id="adsense-verify" strategy="afterInteractive" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3120853344446369" crossOrigin="anonymous"/></head><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader/><main id="main">{children}</main><SiteFooter/><JsonLd data={{'@type':'WebSite',name:SITE_NAME,url:SITE_URL,inLanguage:'en',publisher:{'@id':SITE_URL+'/#organization'}}}/><JsonLd data={{'@type':'Organization','@id':SITE_URL+'/#organization',name:SITE_NAME,url:SITE_URL,email:CONTACT_EMAIL,founder:{'@type':'Person',name:FOUNDER_NAME},logo:SITE_URL+'/logo-mark.png',description:'Free editable prompts, video planning tools, niche playbooks, and creator guides.',publishingPrinciples:SITE_URL+'/editorial-policy'}}/></body></html>;}
