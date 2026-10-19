'use client';
import {useEffect,useRef} from 'react';
export default function ScrollProgress(){
  const ref=useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      let raf=0;
      const update=()=>{
        const max=document.documentElement.scrollHeight-window.innerHeight;
        el.style.setProperty('--p',max>0?String(Math.min(1,window.scrollY/max)):'0');
      };
      const onScroll=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(update);};
      addEventListener('scroll',onScroll,{passive:true});
      addEventListener('resize',onScroll,{passive:true});
      update();
      return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);cancelAnimationFrame(raf);};
    }
  },[]);
  return <div className="scroll-progress" aria-hidden="true"><span ref={ref}/></div>;
}