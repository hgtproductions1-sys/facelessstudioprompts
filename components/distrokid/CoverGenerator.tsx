'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, ImagePlus } from 'lucide-react';
import { coverStyles, drawCover } from './cover';
import { Notice, downloadBlob, errorMessage, safeName } from './shared';
import styles from './studio.module.css';

export default function CoverGenerator({ title, onTitle, artist, onArtist, waveform, active }: {
  title: string;
  onTitle: (title: string) => void;
  artist: string;
  onArtist: (artist: string) => void;
  waveform: number[];
  active: boolean;
}) {
  const [style, setStyle] = useState(0);
  const [background, setBackground] = useState<string>(coverStyles[0].background);
  const [accent, setAccent] = useState<string>(coverStyles[0].accent);
  const [ink, setInk] = useState<string>(coverStyles[0].ink);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<{ source: File; image: HTMLImageElement }>();
  const [useWaveform, setUseWaveform] = useState(false);
  const [exporting, setExporting] = useState(false);
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

  async function save() {
    setExporting(true);
    setError('');
    const imageCanvas = document.createElement('canvas');
    imageCanvas.width = 3000;
    imageCanvas.height = 3000;
    try {
      drawCover(imageCanvas, { style, background, accent, ink, title, artist, artwork, waveform: useWaveform ? waveform : [] });
      const jpg = await new Promise<Blob>((resolve, reject) => imageCanvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('The browser could not export this cover.')), 'image/jpeg', 0.95,
      ));
      downloadBlob(jpg, safeName(title || 'Untitled') + ' - Cover.jpg');
    } catch (problem) {
      setError(errorMessage(problem));
    } finally {
      imageCanvas.width = 1;
      imageCanvas.height = 1;
      setExporting(false);
    }
  }

  return (
    <div className={styles.panelGrid}>
      <div className={styles.coverDisplay}>
        <canvas className={styles.coverCanvas} ref={canvas} width={740} height={740} aria-label="Generated cover art preview" role="img" />
        <div className={styles.coverCaption}><span>Cover preview</span><span>3000 × 3000 JPG</span></div>
      </div>
      <aside className={styles.settings}>
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
        <label>Release title<input value={title} maxLength={80} placeholder="Untitled" onChange={event => onTitle(event.target.value)} /></label>
        <label>Artist<input value={artist} maxLength={70} placeholder="Artist name" onChange={event => onArtist(event.target.value)} /></label>
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
        <button className={styles.primary} disabled={exporting || Boolean(file && !artwork)} onClick={() => void save()}><Download size={16} /> {exporting ? 'Exporting…' : 'Download cover JPG'}</button>
      </aside>
    </div>
  );
}
