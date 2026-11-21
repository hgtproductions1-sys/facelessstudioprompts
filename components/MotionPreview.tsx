'use client';

import {Pause, Play} from 'lucide-react';
import {useEffect, useRef, useState, useSyncExternalStore, type ReactNode} from 'react';
import {responsiveImage} from '@/lib/images';
import styles from './MotionPreview.module.css';

const motionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToMotion(listener: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', listener);
  return () => query.removeEventListener('change', listener);
}

function subscribeToVisibility(listener: () => void) {
  document.addEventListener('visibilitychange', listener);
  return () => document.removeEventListener('visibilitychange', listener);
}

type Props = {
  clip: string;
  poster: string;
  alt: string;
  label: string;
  className: string;
  children?: ReactNode;
  auto?: boolean;
};

export default function MotionPreview({clip, poster, alt, label, className, children, auto = false}: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [mode, setMode] = useState<'default' | 'play' | 'pause'>('default');
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia(motionQuery).matches, () => true);
  const pageVisible = useSyncExternalStore(subscribeToVisibility, () => !document.hidden, () => false);

  useEffect(() => {
    if (!frame.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
    }, {threshold: [0, 0.35]});
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  const automatic = auto && !reducedMotion;
  const loadVideo = !failed && (mode !== 'default' || automatic && (inView || started));
  const shouldPlay = loadVideo && pageVisible && inView && (mode === 'play' || mode === 'default' && automatic);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (shouldPlay) void element.play().catch(() => {});
    else element.pause();
  }, [loadVideo, shouldPlay]);

  function toggle() {
    if (playing) {
      video.current?.pause();
      setMode('pause');
      return;
    }
    setInView(true);
    setMode('play');
    if (video.current) void video.current.play().catch(() => {});
  }

  function handleError() {
    setFailed(true);
    setPlaying(false);
  }

  const action = playing && loadVideo ? 'Pause' : 'Play';
  const Icon = action === 'Pause' ? Pause : Play;
  const media = '/preview-media/' + clip;

  return (
    <div ref={frame} className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element -- The responsive WebP sizes are pre-generated. */}
      <img src={poster} {...responsiveImage(poster, auto ? '(max-width: 900px) 100vw, 600px' : undefined)}
        alt={alt} width="1280" height="720" loading={auto ? 'eager' : 'lazy'}
        fetchPriority={auto ? 'high' : undefined} decoding="async"/>
      {loadVideo && <video ref={video} className={styles.video} data-started={started} aria-hidden="true"
        muted loop playsInline preload="none" poster={poster} onPlaying={() => {setPlaying(true); setStarted(true);}}
        onPause={() => setPlaying(false)} onError={handleError}>
        <source src={media + '.mp4'} type="video/mp4"/>
        <source src={media + '.webm'} type="video/webm" onError={handleError}/>
      </video>}
      {children}
      {!failed && <button type="button" className={styles.control} aria-label={`${action} ${label} preview`}
        title={`${action} preview`} onClick={toggle}>
        <Icon size={16} strokeWidth={2.4} aria-hidden="true"/>
        {auto && <span>{action} preview</span>}
      </button>}
    </div>
  );
}
