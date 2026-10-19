'use client';
import {useEffect,useRef,useState} from 'react';

type Pos={x:number;y:number};
type Mood='sit'|'trot'|'hop'|'lick';

export default function RoamingCat(){
  const wrapRef=useRef<HTMLDivElement>(null);
  const targetRef=useRef<Pos>({x:0,y:0});
  const posRef=useRef<Pos>({x:0,y:0});
  const rafRef=useRef<number>(0);
  const lastFaceRef=useRef<'left'|'right'>('right');
  const [render,setRender]=useState<Pos>({x:-120,y:-120});
  const [face,setFace]=useState<'left'|'right'>('right');
  const [mood,setMood]=useState<Mood>('sit');
  const [showBubble,setShowBubble]=useState(false);
  const [mounted,setMounted]=useState(false);
  const stepRef=useRef(0);

  useEffect(()=>{
    setMounted(true);
    const reduceMotion=!window.matchMedia('(prefers-reduced-motion: reduce)').matches===false;
    const start=()=>{posRef.current={x:window.innerWidth/2-32,y:window.innerHeight-90};targetRef.current=posRef.current;setRender(posRef.current);};
    start();

    const onMove=(e:PointerEvent)=>{targetRef.current={x:e.clientX-32,y:e.clientY-40};};
    const onTouch=(e:TouchEvent)=>{const t=e.touches[0];if(t)targetRef.current={x:t.clientX-32,y:t.clientY-40};};
    const onClick=(e:PointerEvent)=>{
      if(reduceMotion)return;
      setMood('hop');setShowBubble(true);
      window.setTimeout(()=>setShowBubble(false),1100);
      targetRef.current={x:e.clientX-32,y:e.clientY-40};
      window.setTimeout(()=>setMood('sit'),700);
    };

    window.addEventListener('pointermove',onMove,{passive:true});
    window.addEventListener('touchmove',onTouch,{passive:true});
    window.addEventListener('pointerdown',onClick,{passive:true});

    const tick=()=>{
      const pos=posRef.current;
      const target=targetRef.current;
      const dx=target.x-pos.x;
      const dy=target.y-pos.y;
      const dist=Math.hypot(dx,dy);

      if(reduceMotion){
        // sit in place, no movement
      }else if(dist>4){
        const speed=Math.min(dist*0.045,5.5);
        const nx=pos.x+dx/dist*speed;
        const ny=pos.y+dy/dist*speed;
        posRef.current={x:nx,y:ny};
        const dir=dx>0?'right':'left';
        if(dir!==lastFaceRef.current){lastFaceRef.current=dir;setFace(dir);}
        stepRef.current=(stepRef.current+1)%60;
        setMood('trot');
      }else{
        // arrived — occasionally lick paw
        stepRef.current=(stepRef.current+1)%(240+Math.floor(Math.random()*200));
        setMood(prev=>prev==='trot'?'sit':prev);
        if(stepRef.current===1&&Math.random()<0.25)setMood('lick');
        if(stepRef.current===2&&Math.random()<0.15){setMood('lick');}
      }
      setRender(posRef.current);
      rafRef.current=requestAnimationFrame(tick);
    };
    rafRef.current=requestAnimationFrame(tick);

    return()=>{
      window.removeEventListener('pointermove',onMove);
      window.removeEventListener('touchmove',onTouch);
      window.removeEventListener('pointerdown',onClick);
      cancelAnimationFrame(rafRef.current);
    };
  },[]);

  if(!mounted)return null;
  const frame=mood==='trot'?Math.floor(stepRef.current/8)%2:0;
  const bodyClass=`cat-body cat-${mood}${frame?' cat-frame-alt':''} cat-face-${face}`;

  return (
    <div ref={wrapRef} className="roaming-cat" aria-hidden="true" style={{left:render.x,top:render.y}} aria-label="A roaming pixel cat">
      <div className={bodyClass}>
        <span className="cat-ear cat-ear-l"/>
        <span className="cat-ear cat-ear-r"/>
        <span className="cat-head"/>
        <span className="cat-eye"/>
        <span className="cat-nose"/>
        <span className="cat-torso"/>
        <span className="cat-leg cat-leg-fl"/>
        <span className="cat-leg cat-leg-fr"/>
        <span className="cat-leg cat-leg-bl"/>
        <span className="cat-leg cat-leg-br"/>
        <span className="cat-tail"/>
        {mood==='lick'&&<span className="cat-paw"/>}
      </div>
      {showBubble&&<span className="cat-bubble">meow!</span>}
    </div>
  );
}
