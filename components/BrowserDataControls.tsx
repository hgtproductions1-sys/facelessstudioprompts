'use client';
import {useState} from 'react';
const KEYS=['fp-saved-prompts','fp-studio-draft','fp-start-progress'];
export default function BrowserDataControls(){
 const [notice,setNotice]=useState('');
 return <section className="callout" id="browser-data"><h2>Manage this browser’s saved data</h2><p>Remove saved prompt bookmarks, your Studio input draft, and beginner-checklist progress from this browser. Download any brief or bookmarks you want to keep first. Files you already exported are separate.</p><button type="button" className="button button-outline button-small" onClick={()=>{try{KEYS.forEach(key=>localStorage.removeItem(key));setNotice('Saved prompts, the Studio draft, and checklist progress were removed from this browser. Reload other open site tabs to refresh them.');}catch{setNotice('Browser storage could not be changed. Use your browser’s site-data settings instead.');}}}>Clear my saved site data</button><p role="status" aria-live="polite">{notice}</p></section>;
}
