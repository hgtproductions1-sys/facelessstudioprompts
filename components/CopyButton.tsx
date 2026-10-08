'use client';
import {useState} from 'react';
import {Check,Copy,Download} from 'lucide-react';
export default function CopyButton({text,label='Copy prompt',className=''}:{text:string;label?:string;className?:string}){const [status,setStatus]=useState('');async function copy(){try{await navigator.clipboard.writeText(text);setStatus('Copied');setTimeout(()=>setStatus(''),2000);}catch{setStatus('Select the text to copy');}}return <button className={'copy-button '+className} onClick={copy} aria-live="polite">{status==='Copied'?<Check size={15}/>:<Copy size={15}/>} {status||label}</button>;}
export function DownloadButton({text,filename='video-blueprint.md',label='Download plan',mime='text/markdown'}:{text:string;filename?:string;label?:string;mime?:string}){return <button type="button" className="copy-button" onClick={()=>{const u=URL.createObjectURL(new Blob([text],{type:mime}));const a=document.createElement('a');a.href=u;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}}><Download size={15}/> {label}</button>;}

