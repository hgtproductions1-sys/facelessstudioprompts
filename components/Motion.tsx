'use client';
import {useEffect,useLayoutEffect,useRef,useState,type CSSProperties,type ReactNode} from 'react';

const finePointer=()=>window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const motionAllowed=()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Reveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}){
  const ref=useRef<HTMLDivElement>(null);
  const [pre,setPre]=useState(false);
  useLayoutEffect(()=>{
    const el=ref.current;if(!el)return;
    if(!motionAllowed()||el.getBoundingClientRect().top<window.innerHeight)return;
    setPre(true);
    const io=new IntersectionObserver(es=>{
      if(es.some(x=>x.isIntersecting)){io.disconnect();setPre(false);}
    },{threshold:.12,rootMargin:'0px 0px -36px 0px'});
    io.observe(el);
    return()=>io.disconnect();
  },[]);
  const style=(delay?{'--d':delay+'ms'}:undefined) as CSSProperties|undefined;
  return <div ref={ref} style={style} className={'fx-reveal'+(pre?' fx-pre':'')+(className?' '+className:'')}>{children}</div>;
}

export function Tilt({children,max=7,className=''}:{children:ReactNode;max?:number;className?:string}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=ref.current;if(!el||!motionAllowed()||!finePointer())return;
    let raf=0;
    const move=(e:PointerEvent)=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const r=el.getBoundingClientRect();
        const px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
        el.style.setProperty('--rx',(-py*max).toFixed(2)+'deg');
        el.style.setProperty('--ry',(px*max).toFixed(2)+'deg');
        el.style.setProperty('--px',(px*100+50).toFixed(1)+'%');
        el.style.setProperty('--py',(py*100+50).toFixed(1)+'%');
      });
    };
    const reset=()=>{cancelAnimationFrame(raf);
      el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg');
    };
    el.addEventListener('pointermove',move);
    el.addEventListener('pointerleave',reset);
    return()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);cancelAnimationFrame(raf);};
  },[max]);
  return <div ref={ref} className={'fx-tilt'+(className?' '+className:'')}>{children}</div>;
}
