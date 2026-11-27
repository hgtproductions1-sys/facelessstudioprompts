'use client';

import { useState } from 'react';
import { Download, ListPlus, Play, Trash2 } from 'lucide-react';
import { convertMedia, previewAudio, type AudioFormat, type Bitrate } from '@/lib/distrokid-media';
import { AudioPlayer, Dropzone, FormatFields, Notice, baseName, downloadBlob, errorMessage, safeName, sizeLabel, validateFiles, wasCancelled, type RunMedia } from './shared';
import styles from './studio.module.css';

type Result = { audio: Blob; format: AudioFormat; bitrate: Bitrate };
type Item = { id: string; file: File; result?: Result; preview?: Blob; error?: string };

const maxZipBytes = 150 * 1024 * 1024;

export default function BatchConverter({ busy, run, addToCompiler }: {
  busy: boolean;
  run: RunMedia;
  addToCompiler: (file: File) => Promise<void>;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [format, setFormat] = useState<AudioFormat>('mp3');
  const [bitrate, setBitrate] = useState<Bitrate>(320);
  const [error, setError] = useState('');
  const [active, setActive] = useState<{ id: string; percent: number }>();
  const [zipping, setZipping] = useState(false);
  const selectedBitrate = format === 'wma' && bitrate === 320 ? 192 : bitrate;

  function addFiles(files: File[]) {
    const invalid = validateFiles(files, items.map(item => item.file));
    setError(invalid);
    if (invalid) return;
    setItems(current => [...current, ...files.map(file => ({ file, id: crypto.randomUUID() }))]);
  }

  function update(id: string, info: Partial<Item>) {
    setItems(current => current.map(item => item.id === id ? { ...item, ...info } : item));
  }

  async function convert(selected: Item[]) {
    setError('');
    try {
      await run('Converting audio', async signal => {
        for (const item of selected) {
          if (signal.aborted) break;
          setActive({ id: item.id, percent: 0 });
          update(item.id, { error: undefined });
          try {
            const audio = await convertMedia(item.file, {
              format, bitrate: selectedBitrate, signal,
              onProgress: progress => setActive({ id: item.id, percent: Math.min(100, Math.max(0, progress * 100)) }),
            });
            if (signal.aborted) break;
            update(item.id, { result: { audio, format, bitrate: selectedBitrate }, preview: undefined });
          } catch (problem) {
            if (signal.aborted || wasCancelled(problem)) break;
            update(item.id, { error: errorMessage(problem) });
          }
        }
      });
    } catch (problem) {
      if (!wasCancelled(problem)) setError(errorMessage(problem));
    } finally {
      setActive(undefined);
    }
  }

  async function showPreview(item: Item) {
    if (!item.result) return;
    setError('');
    try {
      const audio = item.result.format === 'mp3' || item.result.format === 'wav'
        ? item.result.audio : await run('Preparing audio preview', signal => previewAudio(item.file, signal));
      update(item.id, { preview: audio });
    } catch (problem) {
      if (!wasCancelled(problem)) setError(errorMessage(problem));
    }
  }

  const ready = items.flatMap(item => item.result ? [item as Item & { result: Result }] : []);
  const waiting = items.filter(item => !item.result || item.error ||
    item.result.format !== format || item.result.bitrate !== selectedBitrate);
  const zipTooLarge = ready.reduce((sum, item) => sum + item.result.audio.size, 0) > maxZipBytes;

  function filename(item: Item & { result: Result }) {
    return safeName(baseName(item.file.name)) + '.' + item.result.format;
  }

  async function zipDownloads() {
    setZipping(true);
    setError('');
    try {
      const { zip } = await import('fflate');
      const entries: Record<string, Uint8Array> = Object.create(null);
      const used = new Set<string>();
      for (const item of ready) {
        const stem = safeName(baseName(item.file.name));
        const extension = '.' + item.result.format;
        let unique = stem + extension;
        for (let copy = 2; used.has(unique.toLowerCase()); copy++) unique = stem + ' (' + copy + ')' + extension;
        used.add(unique.toLowerCase());
        entries[unique] = new Uint8Array(await item.result.audio.arrayBuffer());
      }
      const buffer = await new Promise<Uint8Array<ArrayBuffer>>((resolve, reject) => {
        zip(entries, { level: 0 }, (problem, output) => problem ? reject(problem) : resolve(new Uint8Array(output)));
      });
      downloadBlob(new Blob([buffer], { type: 'application/zip' }), 'distrokid-studio-audio.zip');
    } catch (problem) {
      setError(errorMessage(problem));
    } finally {
      setZipping(false);
    }
  }

  return (
    <div className={styles.panelGrid}>
      <div className={styles.stack}>
        <Dropzone onFiles={addFiles} multiple compact={items.length > 0} title="Drop video or audio files"
          hint="Up to 8 files, 100 MB each, 250 MB total. Maximum 10 minutes per file." disabled={busy || zipping} />
        {error && <Notice danger>{error}</Notice>}
        {items.length > 0 && <ul className={styles.trackList}>
          {items.map(item => {
            const result = item.result;
            return <li key={item.id} className={styles.track}>
              <div className={styles.trackHeading}>
                <span><strong>{item.file.name}</strong><small>{sizeLabel(item.file.size)}{result ? ' · ' + result.format.toUpperCase() + ' ready' : ''}</small></span>
                <button type="button" className={styles.iconButton} aria-label={'Remove ' + item.file.name}
                  disabled={busy || zipping} onClick={() => setItems(current => current.filter(entry => entry.id !== item.id))}><Trash2 size={17} /></button>
              </div>
              {active?.id === item.id && <progress className={styles.progress} max="100"
                value={active.percent || undefined} aria-label={'Converting ' + item.file.name} />}
              {item.error && <Notice danger>{item.error}</Notice>}
              {(item.error || result) && <div className={styles.actions}>
                {item.error && <button className={styles.secondary} onClick={() => void convert([item])} disabled={busy || zipping}>Retry</button>}
                {result && !item.preview && <button className={styles.secondary} onClick={() => void showPreview(item)} disabled={busy || zipping}><Play size={15} /> Preview</button>}
                {result && <button className={styles.secondary} onClick={() => downloadBlob(result.audio, filename({ ...item, result }))}><Download size={15} /> Download</button>}
                {result && <button className={styles.secondary} disabled={busy || zipping} onClick={() => {
                  const name = filename({ ...item, result });
                  void addToCompiler(new File([result.audio], name, { type: result.audio.type })).catch(problem => setError(errorMessage(problem)));
                }}><ListPlus size={15} /> Add to compiler</button>}
              </div>}
              {item.preview && <AudioPlayer blob={item.preview} label={'Preview of ' + item.file.name} />}
            </li>;
          })}
        </ul>}
      </div>
      <aside className={styles.settings}>
        <h3>Export settings</h3>
        <FormatFields format={format} bitrate={bitrate} onFormat={setFormat} onBitrate={setBitrate} disabled={busy || zipping} />
        <button className={styles.primary} onClick={() => void convert(waiting)} disabled={busy || zipping || waiting.length === 0}>
          {waiting.length > 0 ? 'Convert ' + waiting.length + (waiting.length === 1 ? ' file' : ' files') : 'Convert files'}
        </button>
        {ready.length > 1 && <button className={styles.secondary} disabled={busy || zipping || zipTooLarge} onClick={() => void zipDownloads()}>
          <Download size={16} /> {zipping ? 'Packing files…' : 'Download all as ZIP'}
        </button>}
        {zipTooLarge && <p className={styles.muted}>ZIP downloads are limited to 150 MB. Each export is available individually.</p>}
        <p className={styles.muted}>MP3 is the default for easy sharing. Choose WAV or FLAC for a lossless export.</p>
      </aside>
    </div>
  );
}
