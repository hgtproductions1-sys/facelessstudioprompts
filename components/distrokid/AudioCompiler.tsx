'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowDown, ArrowUp, Download, Play, Trash2 } from 'lucide-react';
import { analyzeAudio, compileAudio, compileDuration, type AudioFormat, type Bitrate, type MediaClip, type Transition } from '@/lib/distrokid-media';
import { AudioPlayer, Dropzone, FormatFields, Notice, downloadBlob, errorMessage, maxSeconds, safeName, timelineTime, wasCancelled, type RunMedia } from './shared';
import styles from './studio.module.css';

export type StudioClip = MediaClip & { id: string; duration: number };
type Preview = { key: string; audio: Blob; peakDb: number | null; waveform: number[] };
type Master = { key: string; audio: Blob; format: AudioFormat };

export default function AudioCompiler({ busy, run, clips, setClips, addFiles, title, setTitle, setWaveform }: {
  busy: boolean;
  run: RunMedia;
  clips: StudioClip[];
  setClips: Dispatch<SetStateAction<StudioClip[]>>;
  addFiles: (files: File[]) => Promise<string[]>;
  title: string;
  setTitle: (title: string) => void;
  setWaveform: (waveform: number[]) => void;
}) {
  const [format, setFormat] = useState<AudioFormat>('wav');
  const [bitrate, setBitrate] = useState<Bitrate>(320);
  const [transition, setTransition] = useState<Transition>('seamless');
  const [normalize, setNormalize] = useState(false);
  const [preview, setPreview] = useState<Preview>();
  const [master, setMaster] = useState<Master>();
  const [error, setError] = useState('');
  const bitrateValue = format === 'wma' && bitrate === 320 ? 192 : bitrate;
  const invalidTrim = clips.some(clip => clip.start < 0 || clip.end > clip.duration || clip.end - clip.start < 0.05);
  const duration = invalidTrim ? 0 : compileDuration(clips, transition);
  const key = JSON.stringify([transition, normalize, clips.map(clip => [clip.id, clip.start, clip.end, clip.gainDb])]);
  const masterKey = JSON.stringify([key, format, bitrateValue]);
  const activePreview = preview?.key === key ? preview : undefined;
  const activeMaster = master?.key === masterKey ? master : undefined;
  const clipsPeak = activePreview?.peakDb != null && activePreview.peakDb >= -0.1;
  const blocked = busy || !clips.length || invalidTrim || duration <= 0 || duration > maxSeconds;

  function move(position: number, amount: number) {
    setWaveform([]);
    setClips(current => {
      const ordered = [...current];
      [ordered[position], ordered[position + amount]] = [ordered[position + amount], ordered[position]];
      return ordered;
    });
  }

  function update(id: string, patch: Partial<StudioClip>) {
    setWaveform([]);
    setClips(current => current.map(clip => clip.id === id ? { ...clip, ...patch } : clip));
  }

  async function add(files: File[]) {
    setWaveform([]);
    setError('');
    try {
      setError((await addFiles(files)).join(' '));
    } catch (problem) {
      if (!wasCancelled(problem)) setError(errorMessage(problem));
    }
  }

  async function measure(signal: AbortSignal) {
    const audio = await compileAudio(clips, { format: 'mp3', bitrate: 192, transition, normalize, signal });
    signal.throwIfAborted();
    const result = await analyzeAudio(audio, signal);
    signal.throwIfAborted();
    const next = { key, audio, ...result };
    setPreview(next);
    setWaveform(next.waveform);
    return next;
  }

  async function render(exportMaster: boolean) {
    setError('');
    try {
      await run(exportMaster ? 'Rendering master' : 'Rendering preview', async signal => {
        if (!exportMaster) {
          await measure(signal);
          return;
        }
        if (!activePreview) {
          const measured = await measure(signal);
          if (measured.peakDb != null && measured.peakDb >= -0.1) return;
        }
        signal.throwIfAborted();
        const audio = await compileAudio(clips, { format, bitrate: bitrateValue, transition, normalize, signal });
        signal.throwIfAborted();
        setMaster({ key: masterKey, audio, format });
        downloadBlob(audio, safeName(title || 'Compiled master') + '.' + format);
      });
    } catch (problem) {
      if (!wasCancelled(problem)) setError(errorMessage(problem));
    }
  }

  return (
    <div className={styles.panelGrid}>
      <div className={styles.stack}>
        <Dropzone onFiles={files => void add(files)} multiple compact={clips.length > 0} title="Drop clips to compile"
          hint="Add up to 8 video or audio clips. Arrange them in playback order." disabled={busy} />
        {error && <Notice danger>{error}</Notice>}
        {clips.length > 0 && <ol className={styles.trackList}>
          {clips.map((clip, i) => <li className={styles.track} key={clip.id}>
            <div className={styles.trackHeading}>
              <span><strong>{clip.file.name}</strong><small>Source {timelineTime(clip.duration)}</small></span>
              <div className={styles.actions}>
                <button className={styles.iconButton} disabled={busy || i === 0} aria-label={'Move clip ' + (i + 1) + ' up'} onClick={() => move(i, -1)}><ArrowUp size={17} /></button>
                <button className={styles.iconButton} disabled={busy || i === clips.length - 1} aria-label={'Move clip ' + (i + 1) + ' down'} onClick={() => move(i, 1)}><ArrowDown size={17} /></button>
                <button className={styles.iconButton} disabled={busy} aria-label={'Remove clip ' + (i + 1)} onClick={() => { setWaveform([]); setClips(current => current.filter(item => item.id !== clip.id)); }}><Trash2 size={17} /></button>
              </div>
            </div>
            <div className={styles.clipFields}>
              <label>Start <span>sec</span><input type="number" aria-label={'Clip ' + (i + 1) + ' start'} min={0} max={clip.duration} step="any" value={clip.start} disabled={busy} onChange={event => update(clip.id, { start: Number(event.target.value) })} /></label>
              <label>End <span>sec</span><input type="number" aria-label={'Clip ' + (i + 1) + ' end'} min={0} max={clip.duration} step="any" value={clip.end} disabled={busy} onChange={event => update(clip.id, { end: Number(event.target.value) })} /></label>
              <label>Gain <span>dB</span><input type="number" aria-label={'Clip ' + (i + 1) + ' gain'} min={-24} max={12} step={0.5} value={clip.gainDb ?? 0} disabled={busy} onChange={event => update(clip.id, { gainDb: Number(event.target.value) })} /></label>
            </div>
          </li>)}
        </ol>}
        {invalidTrim && <Notice danger>Set each end at least 0.05 seconds after its start and within the source duration.</Notice>}
        {duration > maxSeconds && <Notice danger>Trim the master to 10 minutes or less before rendering.</Notice>}
        {activePreview && <div className={styles.track}>
          <div className={styles.trackHeading}><strong>Master preview</strong>
            {activePreview.peakDb != null && <small>Peak {activePreview.peakDb.toFixed(1)} dBFS</small>}
          </div>
          <AudioPlayer blob={activePreview.audio} label="Compiled master preview" />
          {clipsPeak && <Notice danger>The preview reaches the clipping threshold. Lower clip gain or turn on normalization.</Notice>}
        </div>}
      </div>
      <aside className={styles.settings}>
        <div className={styles.settingsTitle}><h3>Master settings</h3>{clips.length > 0 && <span>{timelineTime(duration)}</span>}</div>
        <label>Release title<input value={title} maxLength={80} placeholder="Untitled" onChange={event => setTitle(event.target.value)} /></label>
        <label>Transitions<select value={transition} disabled={busy} onChange={event => { setWaveform([]); setTransition(event.target.value as Transition); }}>
          <option value="seamless">Straight cuts</option><option value="crossfade">Crossfade up to 1 second</option><option value="gap">Half-second gaps</option>
        </select></label>
        <label className={styles.check}><input type="checkbox" checked={normalize} disabled={busy} onChange={event => { setWaveform([]); setNormalize(event.target.checked); }} /> Normalize master loudness</label>
        <FormatFields format={format} bitrate={bitrate} onFormat={setFormat} onBitrate={setBitrate} disabled={busy} />
        <button className={styles.secondary} disabled={blocked} onClick={() => void render(false)}><Play size={16} /> Render preview</button>
        <button className={styles.primary} disabled={blocked} onClick={() => {
          if (activeMaster) downloadBlob(activeMaster.audio, safeName(title || 'Compiled master') + '.' + activeMaster.format);
          else void render(true);
        }}><Download size={16} /> {activeMaster ? 'Download master' : clipsPeak ? 'Export anyway' : 'Export master'}</button>
      </aside>
    </div>
  );
}
