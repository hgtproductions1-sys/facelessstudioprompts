'use client';
import {useState} from 'react';
import {Play} from 'lucide-react';

export default function VideoPlayer({id,title,priority=false,embedInitially=false}:{id:string;title:string;priority?:boolean;embedInitially?:boolean}) {
  const [playingId,setPlayingId]=useState<string|null>(null);
  return <div className="video-frame">
    {embedInitially||playingId===id?<iframe
      src={'https://www.youtube-nocookie.com/embed/'+id+(playingId===id?'?autoplay=1':'')}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen referrerPolicy="strict-origin-when-cross-origin"
    />:<button className="video-poster" onClick={()=>setPlayingId(id)} aria-label={'Play '+title}>
      <img src={'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg'} alt="" width="480" height="360" loading={priority?'eager':'lazy'} decoding="async"/>
      <span className="video-play-icon"><Play size={25} fill="currentColor" aria-hidden="true"/></span>
      <span className="video-poster-label">Play lesson</span>
    </button>}
    <noscript><a className="video-nojs" href={'https://www.youtube.com/watch?v='+id} target="_blank" rel="noopener noreferrer">Watch {title} on YouTube ↗</a></noscript>
  </div>;
}
