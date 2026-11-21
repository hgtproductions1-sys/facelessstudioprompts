'use client';

import {useEffect, useId, useRef} from 'react';
import styles from './RoamingCat.module.css';

const WIDTH = 82;
const HEIGHT = 54;
const EDGE = 4;

function pointerTarget(event: PointerEvent) {
  const {clientX, clientY} = event;
  const below = clientY + HEIGHT + 22 <= window.innerHeight;
  return {
    x: Math.max(EDGE, Math.min(clientX - WIDTH / 2, window.innerWidth - WIDTH - EDGE)),
    y: Math.max(EDGE, below ? clientY + 16 : clientY - HEIGHT - 18),
  };
}

export default function RoamingCat() {
  const catRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const coatId = useId();

  useEffect(() => {
    const cat = catRef.current;
    const figure = figureRef.current;
    if (!cat || !figure) return;

    const motionAllowed = window.matchMedia('(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)');
    let position = {x: 0, y: 0};
    let target = position;
    let frame = 0;
    let lastTime = 0;
    let visible = false;
    let walking = false;
    let facing = 'right';
    let pounce: Animation | undefined;

    function paint() {
      cat!.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
    }

    function setWalking(next: boolean) {
      if (walking === next) return;
      walking = next;
      cat!.dataset.gait = next ? 'trot' : 'idle';
    }

    function hide() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      visible = false;
      delete cat!.dataset.visible;
      setWalking(false);
      pounce?.cancel();
    }

    function tick(time: number) {
      frame = 0;
      const dx = target.x - position.x;
      const dy = target.y - position.y;
      const distance = Math.hypot(dx, dy);
      if (distance <= 0.8) {
        position = target;
        paint();
        setWalking(false);
        lastTime = 0;
        return;
      }

      const elapsed = lastTime ? Math.min(time - lastTime, 32) : 16;
      lastTime = time;
      const step = Math.min(distance * (1 - Math.exp(-elapsed / 96)), elapsed * 0.78);
      position.x += dx / distance * step;
      position.y += dy / distance * step;
      paint();
      setWalking(distance > 4);

      // Keep the same heading when the pointer moves vertically or settles nearby.
      if (Math.abs(dx) > 9) {
        const nextFacing = dx < 0 ? 'left' : 'right';
        if (nextFacing !== facing) {
          facing = nextFacing;
          cat!.dataset.facing = facing;
        }
      }
      frame = requestAnimationFrame(tick);
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !motionAllowed.matches || document.hidden) return;
      target = pointerTarget(event);
      if (!visible) {
        position = {...target};
        paint();
        cat!.dataset.visible = 'true';
        visible = true;
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function onClick(event: PointerEvent) {
      if (!visible || event.pointerType !== 'mouse' || event.button !== 0 || !motionAllowed.matches) return;
      if (pounce?.playState === 'running') return;
      pounce = figure!.animate([
        {transform: 'translateY(0)'},
        {transform: 'translateY(-9px)', offset: 0.38},
        {transform: 'translateY(0)'},
      ], {duration: 320, easing: 'ease-in-out'});
    }

    function onLeave(event: PointerEvent) {
      if (event.pointerType === 'mouse' && !event.relatedTarget) hide();
    }

    window.addEventListener('pointermove', onMove, {passive: true});
    window.addEventListener('pointerdown', onClick, {passive: true});
    window.addEventListener('pointerout', onLeave, {passive: true});
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', hide, {capture: true, passive: true});
    window.addEventListener('resize', hide);
    document.addEventListener('visibilitychange', hide);
    motionAllowed.addEventListener('change', hide);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onClick);
      window.removeEventListener('pointerout', onLeave);
      window.removeEventListener('blur', hide);
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
      document.removeEventListener('visibilitychange', hide);
      motionAllowed.removeEventListener('change', hide);
      hide();
    };
  }, []);

  return (
    <div ref={catRef} className={styles.cat} data-roaming-cat="" aria-hidden="true" style={{width: WIDTH, height: HEIGHT}}>
      <div ref={figureRef} className={styles.figure}>
        <svg className={styles.mascot} viewBox="0 0 116 76" width={WIDTH} height={HEIGHT} focusable="false">
          <defs>
            <linearGradient id={coatId} x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#ffd078"/>
              <stop offset="55%" stopColor="#f4a653"/>
              <stop offset="100%" stopColor="#dc743d"/>
            </linearGradient>
          </defs>
          <ellipse cx="61" cy="69" rx="37" ry="4.3" fill="#26181d" opacity="0.3"/>
          <g stroke="#5b302a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <g className={styles.tail}>
              <path d="M38 48C26 49 15 48 12 41c-3-6 3-12 3-18c0-5-4-8-7-5c-4 4-6 15-5 23c2 11 12 17 26 16l10-2Z" fill={`url(#${coatId})`}/>
              <path d="M6 24l8 3m-10 5 7 3m-7 5 7 3" fill="none" stroke="#a65330" strokeWidth="2.8"/>
            </g>
            <g className={styles.farHind}>
              <path d="M37 48c-4 4-4 8-2 12l2 6h9c3 0 3-4 0-5l-4-1 3-12Z" fill="#b76036"/>
            </g>
            <g className={styles.farFront}>
              <path d="m74 49 2 16h10c3 0 3-4 0-5l-4-1 1-11Z" fill="#b76036"/>
            </g>
            <g className={styles.body}>
              <path d="M27 48c1-10 10-17 23-16l16 2c9 1 12-3 18-6l9 11c0 10-9 16-18 17l-16 1c-9 2-21 5-27-1c-4-2-6-4-5-8Z" fill={`url(#${coatId})`}/>
              <path d="M35 49c7 4 14 2 21 2c10 0 18-1 25-7c-2 8-11 12-22 12c-10 2-21 4-27-1Z" fill="#d47741" stroke="none"/>
              <path d="M44 34q4 4 4 10m6-10q4 5 4 9m6-9q4 3 4 7" fill="none" stroke="#aa542f" strokeWidth="2.8"/>
            </g>
            <g className={styles.nearHind}>
              <path d="M38 45c6-5 14 1 11 8l-5 8l6 1c4 1 4 6 0 6H38c-3 0-4-3-3-5l2-7c-4-3-3-8 1-11Z" fill={`url(#${coatId})`}/>
              <path d="M38 63h11c2 0 3 2 2 3H38Z" fill="#ffe3b4" stroke="none"/>
            </g>
            <g className={styles.nearFront}>
              <path d="M73 45c3 2 6 3 9 2l-2 14l5 1c3 1 4 6 0 6H73c-3 0-3-2-3-5l2-15Z" fill={`url(#${coatId})`}/>
              <path d="M72 63h12c2 0 4 2 2 3H73Z" fill="#ffe3b4" stroke="none"/>
            </g>
            <g className={styles.head}>
              <path d="M77 29c-4-5-5-13-5-20c6 0 12 5 16 10l8 1c4-6 10-9 14-9c1 8-1 14-4 19c5 4 7 10 4 15c-3 6-12 9-20 8c-10-1-17-6-17-13c-1-4 1-8 4-11Z" fill={`url(#${coatId})`}/>
              <path d="M76 13c4 2 8 5 10 8l-7 4c-2-3-3-7-3-12Zm31 2c-4 1-7 4-9 7l6 4c2-3 3-7 3-11Z" fill="#f68f7f" stroke="none"/>
              <path d="M82 43c0-4 8-5 11-2c6-4 15-2 15 3c-1 6-12 8-18 6c-4-1-7-3-8-7Z" fill="#ffe4b5" stroke="none"/>
              <path d="M87 22q2 3 3 6m3-6 1 5m4-4-1 5" fill="none" stroke="#a65330" strokeWidth="2.3"/>
              <g className={styles.eyes} fill="#3c2425" stroke="none">
                <ellipse cx="86" cy="35" rx="3" ry="3.5"/>
                <ellipse cx="102" cy="34.5" rx="2.7" ry="3.3"/>
                <circle cx="87" cy="34" r="0.95" fill="#fff5d1"/>
                <circle cx="103" cy="33.5" r="0.85" fill="#fff5d1"/>
              </g>
              <path d="M92 40q3-2 6 0l-3 3Z" fill="#b75559" stroke="none"/>
              <path d="M95 43c0 3-4 4-6 2m6-2c0 3 3 4 5 2m-18-4-8-2m8 5-8 1m31-4 8-2m-8 5 8 1" fill="none" strokeWidth="1.15"/>
              <path d="M78 49q4 5 11 5l-2 4q-7-1-11-6Z" fill="#317b72" strokeWidth="1.4"/>
              <circle cx="88" cy="56" r="2.25" fill="#ffcc6f" strokeWidth="1.2"/>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
