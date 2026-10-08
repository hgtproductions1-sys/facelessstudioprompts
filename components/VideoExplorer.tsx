'use client';
import {useMemo,useState} from 'react';
import {ArrowUpRight,Search} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import {VIDEO_CATEGORIES,filterVideos,formatVideoDate,type VideoLesson} from '@/data/videos';

export default function VideoExplorer({videos}:{videos:VideoLesson[]}) {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('');
  const filtered=useMemo(()=>filterVideos(videos,query,category),[videos,query,category]);
  return <>
    <div className="toolbar">
      <label className="search-input"><Search size={17}/><span className="sr-only">Search video lessons</span><input placeholder="Find a skill, tool, or creator..." value={query} onChange={e=>setQuery(e.target.value)}/></label>
      <div className="filter-row" role="group" aria-label="Filter lessons by topic">
        <button className="filter-chip" aria-pressed={!category} onClick={()=>setCategory('')}>All lessons</button>
        {VIDEO_CATEGORIES.map(c=><button className="filter-chip" key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}
      </div>
    </div>
    <p className="result-count" role="status">{filtered.length} {filtered.length===1?'lesson':'lessons'} · Watch a skill, then put it into practice.</p>
    <div className="video-library">{filtered.map(v=><article className="video-card" key={v.id}>
      <VideoPlayer id={v.id} title={v.originalTitle}/>
      <div className="video-card-body">
        <div className="card-meta"><span className="pill">{v.category}</span><span>{v.level}</span></div>
        <h2><a href={'/videos/'+v.slug}>{v.title}</a></h2>
        <p className="lesson-meta">By {v.creator}{v.uploaded?' · '+formatVideoDate(v.uploaded):''}</p>
        <p>{v.description}</p>
        <div className="video-card-footer"><a className="text-link" href={'/videos/'+v.slug}>Try the exercise <ArrowUpRight size={16}/></a><a className="small muted" href={'https://www.youtube.com/watch?v='+v.id} target="_blank" rel="noopener noreferrer">YouTube ↗</a></div>
      </div>
    </article>)}</div>
    {!filtered.length&&<div className="empty-state"><h2>No lessons found.</h2><p>Try another skill, tool, or creator.</p><button className="button button-outline" onClick={()=>{setQuery('');setCategory('');}}>Show all lessons</button></div>}
  </>;
}
