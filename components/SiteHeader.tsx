'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,Clapperboard,Menu,X} from 'lucide-react';
const links=[{href:'/start-here',label:'Start here'},{href:'/prompts',label:'Prompts'},{href:'/niches',label:'Niches'},{href:'/guides',label:'Learn'},{href:'/videos',label:'Watch'},{href:'/free-tools',label:'Free tools'}];
export default function SiteHeader(){
 const [open,setOpen]=useState(false);const path=usePathname();const toggleRef=useRef<HTMLButtonElement>(null);const headerRef=useRef<HTMLElement>(null);
 useEffect(()=>{setOpen(false);},[path]);
 useEffect(()=>{if(!open)return;function key(e:KeyboardEvent){if(e.key==='Escape'){setOpen(false);toggleRef.current?.focus();}}function outside(e:PointerEvent){if(!headerRef.current?.contains(e.target as Node))setOpen(false);}document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};},[open]);
 return <header className="site-header" ref={headerRef}><div className="container header-inner"><a className="brand" href="/" aria-label="The Faceless Prompts home"><span className="brand-mark"><Clapperboard size={21}/></span><span>The Faceless<span className="brand-second">Prompts<span className="brand-dot">.</span></span></span></a><nav className="desktop-nav" aria-label="Main navigation">{links.map(l=><a key={l.href} href={l.href} aria-current={path?.startsWith(l.href)?'page':undefined}>{l.label}</a>)}</nav><a className="button button-small header-cta" href="/studio">Open studio <ArrowUpRight size={16}/></a><button type="button" ref={toggleRef} className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div><nav id="mobile-nav" hidden={!open} className="mobile-nav container" aria-label="Mobile navigation">{links.map(l=><a key={l.href} href={l.href} aria-current={path?.startsWith(l.href)?'page':undefined} onClick={()=>setOpen(false)}>{l.label}</a>)}<a href="/studio" onClick={()=>setOpen(false)}>Open studio ↗</a></nav></header>;
}

