'use client';
import {useEffect} from 'react';
export default function ErrorPage({error,reset}:{error:Error;reset:()=>void}){useEffect(()=>{console.error(error);},[error]);return <div className="container page-content"><div className="empty-state not-found"><h1>This page couldn&apos;t load.</h1><p>Try loading it again, or return to the prompt library.</p><div className="button-row"><button className="button" onClick={reset}>Try again</button><a className="button button-outline" href="/prompts">Prompt library</a></div></div></div>;}
