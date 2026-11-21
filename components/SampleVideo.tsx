'use client';

import Image from 'next/image';
import {useEffect, useRef, useState, useSyncExternalStore} from 'react';
import type {SampleOutputMedia} from '@/lib/sampleOutput';
import styles from './SampleOutputs.module.css';

const motionQuery = '(prefers-reduced-motion: reduce)';

function watchMotion(onChange: () => void) {
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener('change', onChange);
  return () => preference.removeEventListener('change', onChange);
}

export default function SampleVideo({sample, sizes}: {
  sample: Extract<SampleOutputMedia, {mediaType: 'video-loop'}>;
  sizes: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reducedMotion = useSyncExternalStore(watchMotion, () => window.matchMedia(motionQuery).matches, () => true);
  const [inView, setInView] = useState(false);
  const [playback, setPlayback] = useState<'auto' | 'play' | 'pause'>('auto');
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!frame.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      setInView(visible);
      if (!visible) {
        setPlaying(false);
        setPlayback(previous => previous === 'play' ? 'auto' : previous);
      }
    }, {threshold: [0, 0.35]});
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  const showVideo = !failed && inView && (!reducedMotion || playback === 'play');
  const shouldPlay = showVideo && playback !== 'pause';

  useEffect(() => {
    const clip = video.current;
    if (!clip) return;
    if (shouldPlay) void clip.play().catch(() => {});
    else clip.pause();
  }, [shouldPlay]);

  function togglePlayback() {
    if (playing && showVideo) {
      video.current?.pause();
      setPlayback('pause');
      return;
    }
    setInView(true);
    setPlayback('play');
    if (video.current) void video.current.play().catch(() => {});
  }

  return (
    <div ref={frame} className={styles.frame} style={{aspectRatio: sample.width + ' / ' + sample.height}}>
      <Image src={sample.posterSrc} alt={showVideo ? '' : sample.alt} fill sizes={sizes} loading="lazy"/>
      {showVideo && (
        <video ref={video} muted loop playsInline preload="none" poster={sample.posterSrc}
          aria-label={sample.alt} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}>
          <source src={sample.webmSrc} type="video/webm"/>
          <source src={sample.src} type="video/mp4"/>
        </video>
      )}
      {!failed && <button className={styles.playback} type="button" onClick={togglePlayback}>
        {playing && showVideo ? 'Pause preview' : 'Play preview'}
      </button>}
    </div>
  );
}
