'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowUpRight,Bookmark,Search,X} from 'lucide-react';
import CopyButton,{DownloadButton} from '@/components/CopyButton';
import type {Prompt} from '@/data/promptLibrary';
import {CATEGORY_LABELS} from '@/lib/categories';
import {filterPrompts,getPromptInfo,parseSavedPrompts,PROMPT_LEVELS,PROMPT_TOOLS} from '@/lib/promptFilters';

type Props={prompts:Prompt[];validIds:string[];initialCategory?:string;initialQuery?:string;initialLevel?:string;initialTool?:string;initialFormat?:string};
export default function PromptExplorer({prompts,validIds,initialCategory='',initialQuery='',initialLevel='',initialTool='',initialFormat=''}:Props){
 const [query,setQuery]=useState(initialQuery);const [category,setCategory]=useState(initialCategory);
 const [level,setLevel]=useState(initialLevel);const [tool,setTool]=useState(initialTool);const [format,setFormat]=useState(initialFormat);
 const [saved,setSaved]=useState<string[]>([]);const [onlySaved,setOnlySaved]=useState(false);const [limit,setLimit]=useState(12);const [notice,setNotice]=useState('');const importRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{try{setSaved(parseSavedPrompts(JSON.parse(localStorage.getItem('fp-saved-prompts')||'[]'),validIds));}catch{}},[validIds]);
 const filtered=useMemo(()=>filterPrompts(prompts,{query,category,level,tool,format,onlySaved,saved}),[prompts,query,category,level,tool,format,onlySaved,saved]);
 function save(next:string[]){setSaved(next);try{localStorage.setItem('fp-saved-prompts',JSON.stringify(next));}catch{setNotice('Saved for this visit. Your browser could not store bookmarks.');}}
 function toggle(id:string){save(saved.includes(id)?saved.filter(x=>x!==id):[...saved,id]);}
 function reset(){setQuery('');setCategory('');setLevel('');setTool('');setFormat('');setOnlySaved(false);setLimit(12);}
 async function importSaved(e:React.ChangeEvent<HTMLInputElement>){const file=e.target.files?.[0];e.target.value='';if(!file)return;try{if(file.size>200000)throw new Error('Choose a saved-prompts file smaller than 200 KB.');const ids=parseSavedPrompts(JSON.parse(await file.text()),validIds);if(!ids.length)throw new Error('No matching prompt bookmarks were found in this file.');save([...new Set([...saved,...ids])]);setNotice('Imported '+ids.length+' bookmarks. Existing bookmarks were kept.');}catch(error){setNotice(error instanceof Error?error.message:'That bookmark file could not be read.');}}
 const filtersActive=Boolean(query||category||level||tool||format||onlySaved);
 const savedExport=JSON.stringify({version:1,type:'faceless-saved-prompts',promptIds:saved},null,2);
 const savedText='# Saved prompts\n\n'+prompts.filter(p=>saved.includes(p.id)).map(p=>'## '+p.title+'\n\n'+p.prompt+'\n').join('\n');
 return <>
  <div className="toolbar prompt-toolbar">
   <label className="search-input"><Search size={17}/><span className="sr-only">Search prompts</span><input type="search" placeholder="Search a task, subject, or camera move…" value={query} onChange={e=>{setQuery(e.target.value);setLimit(12);}}/>{query&&<button type="button" className="plain-icon" onClick={()=>{setQuery('');setLimit(12);}} aria-label="Clear search"><X size={15}/></button>}</label>
   <div className="filter-row" aria-label="Prompt categories"><button className="filter-chip" aria-pressed={!category} onClick={()=>{setCategory('');setLimit(12);}}>All categories</button>{Object.entries(CATEGORY_LABELS).map(([k,v])=><button className="filter-chip" key={k} aria-pressed={category===k} onClick={()=>{setCategory(k);setLimit(12);}}>{v}</button>)}</div>
   <div className="advanced-filters">
    <label>Experience level<select value={level} onChange={e=>{setLevel(e.target.value);setLimit(12);}}><option value="">Any level</option>{PROMPT_LEVELS.map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Prompt destination<select value={tool} onChange={e=>{setTool(e.target.value);setLimit(12);}}><option value="">Any tool</option>{PROMPT_TOOLS.map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Video format<select value={format} onChange={e=>{setFormat(e.target.value);setLimit(12);}}><option value="">Any format</option><option>Shorts</option><option>Long-form</option></select></label>
    <div className="saved-filter"><button className="filter-chip" aria-pressed={onlySaved} onClick={()=>{setOnlySaved(!onlySaved);setLimit(12);}}><Bookmark size={14}/>Saved ({saved.length})</button>{filtersActive&&<button className="text-link" onClick={reset}>Clear filters <X size={14}/></button>}</div>
   </div>
   <p className="muted small">Levels describe setup complexity. Destinations are suggestions for adapting the wording; use your tool’s supported controls.</p>
  </div>
  <div className="library-result-bar"><p className="result-count" role="status" aria-live="polite">{filtered.length} {filtered.length===1?'prompt':'prompts'}{query?' matching “'+query+'”':''}</p><details className="saved-transfer"><summary>Move your saved prompts</summary><p>Bookmarks stay in this browser. Export a backup and import it on your new domain or another device.</p><div className="button-row">{!!saved.length&&<><DownloadButton text={savedExport} filename="faceless-saved-prompts.json" label="Export bookmarks" mime="application/json"/><DownloadButton text={savedText} filename="saved-prompts.md" label="Download prompt text"/></>}<button className="copy-button" onClick={()=>importRef.current?.click()}>Import bookmarks</button></div><input className="sr-only" type="file" accept="application/json,.json" tabIndex={-1} ref={importRef} onChange={importSaved} aria-label="Import saved prompt bookmarks"/></details></div>
  {notice&&<p className="notice" role="status">{notice}</p>}
  <div className="prompt-grid">{filtered.slice(0,limit).map(p=>{const info=getPromptInfo(p);return <article className="prompt-card" key={p.id}>
   <div className="card-meta"><span className="pill">{CATEGORY_LABELS[p.category]}</span><button type="button" className="plain-icon" aria-label={(saved.includes(p.id)?'Unsave ':'Save ')+p.title} aria-pressed={saved.includes(p.id)} onClick={()=>toggle(p.id)}><Bookmark size={17} fill={saved.includes(p.id)?'currentColor':'none'}/></button></div>
   <a href={'/prompts/'+p.id}><h3>{p.title}</h3></a><div className="prompt-tags"><span>{info.level}</span><span>{info.formats.join(' / ')}</span></div>
   <p className="prompt-excerpt">{p.tips||p.prompt.slice(0,190)+(p.prompt.length>190?'…':'')}</p>
   <details className="prompt-quick-preview"><summary>Preview template</summary><pre>{p.prompt}</pre></details>
   <div className="card-actions"><CopyButton text={p.prompt}/><a className="text-link" href={'/prompts/'+p.id}>Customize <ArrowUpRight size={16}/></a></div>
  </article>;})}</div>
  {!filtered.length&&<div className="empty-state"><h2>{onlySaved?'No saved prompts match these filters.':'No prompts found.'}</h2><p>{onlySaved?'Try clearing filters, or bookmark a prompt to keep it in this browser.':'Try a broader search or a different tool and format.'}</p><button className="button button-outline" onClick={reset}>Browse all prompts</button></div>}
  {limit<filtered.length&&<div className="load-more"><button className="button button-outline" onClick={()=>setLimit(limit+12)}>Show more prompts ({filtered.length-limit} remaining)</button></div>}
 </>;
}

