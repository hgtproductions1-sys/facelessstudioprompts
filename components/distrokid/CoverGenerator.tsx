'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Download, ImagePlus } from 'lucide-react';
import type { AudioFormat } from '@/lib/distrokid-media';
import { coverStyles, drawCover, renderCoverJpg } from './cover';
import { buildReleaseZip } from './release-package';
import { Notice, downloadBlob, errorMessage, safeName, wasCancelled, type RunMedia } from './shared';
import styles from './studio.module.css';

export default function CoverGenerator({ title, onTitle, artist, onArtist, waveform, active, onReview, review }: {
  title: string;
  onTitle: (title: string) => void;
  artist: string;
  onArtist: (artist: string) => void;
  waveform: number[];
  active: boolean;
  onReview?: () => void;
  review?: { audio: Blob; format: AudioFormat; busy: boolean; run: RunMedia; player: ReactNode };
}) {
  const [style, setStyle] = useState(0);
  const [background, setBackground] = useState<string>(coverStyles[0].background);
  const [accent, setAccent] = useState<string>(coverStyles[0].accent);
  const [ink, setInk] = useState<string>(coverStyles[0].ink);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<{ source: File; image: HTMLImageElement }>();
  const [useWaveform, setUseWaveform] = useState(false);
  const [exporting, setExporting] = useState<'jpg' | 'zip'>();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  const artwork = image?.source === file ? image?.image : undefined;

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const next = new Image();
    next.onload = () => setImage({ source: file, image: next });
    next.onerror = () => {
      setError('Choose a JPG, PNG, or WebP image the browser can open.');
      setFile(null);
    };
    next.src = url;
    return () => {
      next.onload = null;
      next.onerror = null;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    if (!active) return;
    const frame = requestAnimationFrame(() => {
      if (!canvas.current) return;
      try {
        drawCover(canvas.current, { style, background, accent, ink, title, artist, artwork, waveform: useWaveform ? waveform : [] });
      } catch (problem) {
        setError(errorMessage(problem));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [active, style, background, accent, ink, title, artist, artwork, waveform, useWaveform]);

  async function save(kind: 'jpg' | 'zip') {
    if (kind === 'zip' && !review) return;
    setExporting(kind);
    setError('');
    setStatus('');
    const name = safeName(title);
    const settings = { style, background, accent, ink, title, artist, artwork, waveform: useWaveform ? waveform : [] };
    const coverName = name + ' - Cover.jpg';
    try {
      if (kind === 'zip' && review) {
        const archive = await review.run('Building release ZIP', async signal => {
          const cover = await renderCoverJpg(settings);
          signal.throwIfAborted();
          return buildReleaseZip([
            { name: name + '.' + review.format, blob: review.audio },
            { name: coverName, blob: cover },
          ], signal);
        });
        downloadBlob(archive, name + ' - Release.zip');
      } else {
        downloadBlob(await renderCoverJpg(settings), coverName);
      }
    } catch (problem) {
      if (wasCancelled(problem)) setStatus('ZIP creation canceled. You can retry or download the files individually.');
      else setError(errorMessage(problem));
    } finally {
      setExporting(undefined);
    }
  }

  const waitingForArt = Boolean(file && !artwork);
  const titleField = <label>Release title<input name="release-title" autoComplete="off" value={title} maxLength={80} placeholder="Untitled" onChange={event => onTitle(event.target.value)} /></label>;
  const artistField = <label>Artist<input name="release-artist" autoComplete="off" value={artist} maxLength={70} placeholder="Artist name (optional)" onChange={event => onArtist(event.target.value)} /></label>;
  const coverDownload = <button type="button" className={review || onReview ? styles.secondary : styles.primary}
    disabled={Boolean(exporting) || waitingForArt} onClick={() => void save('jpg')}>
    <Download size={16} aria-hidden="true" /> {exporting === 'jpg' ? 'Exporting…' : 'Download cover JPG'}
  </button>;

  return (
    <div className={styles.panelGrid}>
      <div className={styles.coverDisplay}>
        <canvas className={styles.coverCanvas} ref={canvas} width={740} height={740} aria-label="Generated cover art preview" role="img" />
        <div className={styles.coverCaption}><span>Cover preview</span><span>3000 × 3000 JPG</span></div>
      </div>
      {review ? <div className={styles.settings}>
        {review.player}
        {titleField}
        {artistField}
        <button type="button" className={styles.primary} disabled={Boolean(exporting) || waitingForArt || review.busy}
          onClick={() => void save('zip')}><Download size={16} aria-hidden="true" /> {exporting === 'zip' ? 'Building ZIP…' : 'Download release ZIP'}</button>
        <div className={styles.releaseDownloads}>
          <button type="button" className={styles.secondary}
            onClick={() => downloadBlob(review.audio, safeName(title) + '.' + review.format)}>
            <Download size={16} aria-hidden="true" /> Download master
          </button>
          {coverDownload}
        </div>
        {status && <Notice>{status}</Notice>}
        {error && <Notice danger>{error}</Notice>}
      </div> : <aside className={styles.settings}>
        <h3>Cover settings</h3>
        <label>Design<select value={style} onChange={event => {
          const id = Number(event.target.value);
          setStyle(id);
          setBackground(coverStyles[id].background);
          setAccent(coverStyles[id].accent);
          setInk(coverStyles[id].ink);
        }}>
          {coverStyles.map((option, i) => <option key={option.name} value={i}>{option.name}</option>)}
        </select></label>
        {titleField}
        {artistField}
        <div className={styles.colorRow}>
          <label><input type="color" value={background} onChange={event => setBackground(event.target.value)} /> Background</label>
          <label><input type="color" value={accent} onChange={event => setAccent(event.target.value)} /> Accent</label>
          <label><input type="color" value={ink} onChange={event => setInk(event.target.value)} /> Text</label>
        </div>
        <div className={styles.actions}>
          <label className={styles.imagePicker}>
            <input type="file" accept="image/jpeg,image/png,image/webp" aria-label="Upload artwork" onChange={event => {
              const chosen = event.currentTarget.files?.[0];
              event.currentTarget.value = '';
              if (!chosen) return;
              if (chosen.size > 15 * 1024 * 1024 || !/^image\/(jpeg|png|webp)$/.test(chosen.type)) {
                setError('Choose a JPG, PNG, or WebP image up to 15 MB.');
                return;
              }
              setImage(undefined);
              setFile(chosen);
              setError('');
            }} />
            <span className={styles.secondary}><ImagePlus size={16} /> {file ? 'Replace artwork' : 'Upload artwork'}</span>
          </label>
          {file && <button className={styles.secondary} onClick={() => { setFile(null); setImage(undefined); }}>Remove</button>}
        </div>
        {!!waveform.length && <label className={styles.check}><input type="checkbox" checked={useWaveform} onChange={event => setUseWaveform(event.target.checked)} /> Add compiled audio waveform</label>}
        {error && <Notice danger>{error}</Notice>}
        {onReview && <button type="button" className={styles.primary} disabled={waitingForArt} onClick={onReview}>
          Review release <ArrowRight size={16} aria-hidden="true" />
        </button>}
        {coverDownload}
      </aside>}
    </div>
  );
}
