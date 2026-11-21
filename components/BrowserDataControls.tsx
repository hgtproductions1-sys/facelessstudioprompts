'use client';
import {useState} from 'react';
const KEYS=['fp-saved-prompts','fp-studio-draft','fp-start-progress'];
export default function BrowserDataControls(){
 const [notice,setNotice]=useState('');
 return <section className="callout" id="browser-data"><h2>Manage this browser’s saved data</h2><p>Clear prompt bookmarks, the Studio draft, beginner-checklist progress, and the prompt inputs saved in this tab. Download any brief or bookmarks you want to keep first.</p><button type="button" className="button button-outline button-small" onClick={()=>{try{KEYS.forEach(key=>localStorage.removeItem(key));sessionStorage.removeItem('tfp_prompt_vars_v1');setNotice('Saved site data was cleared. Reload any other open site tabs to refresh them.');}catch{setNotice('Browser storage could not be changed. Use your browser’s site-data settings instead.');}}}>Clear my saved site data</button><p role="status" aria-live="polite">{notice}</p></section>;
}
