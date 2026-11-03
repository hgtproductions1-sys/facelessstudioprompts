'use client';
import Link from 'next/link';
export default function Error({reset}:{reset:()=>void}){return <div className="container page-content"><h1>Articles are temporarily unavailable.</h1><p>Please try again shortly, or explore our <Link href="/guides">creator guides</Link>.</p><button className="button" onClick={reset}>Try again</button></div>;}
