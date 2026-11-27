'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import { ArrowDown, ArrowUp, Download, Play, Trash2 } from 'lucide-react';
import { analyzeAudio, compileAudio, compileDuration, type AudioFormat, type Bitrate, type MediaClip, type Transition } from '@/lib/distrokid-media';
import { AudioPlayer, Dropzone, FormatFields, Notice, downloadBlob, errorMessage, maxSeconds, safeName, timelineTime, wasCancelled, type RunMedia } from './shared';
import styles from './studio.module.css';

export type StudioClip = MediaClip & { id: string; duration: number };
type Preview = { key: string; audio: Blob; peakDb: number | null; waveform: number[] };
type Master = { key: string; audio: Blob; format: AudioFormat };

export function clipTrimError(clips: readonly StudioClip[]) {
  if (clips.some(clip => !Number.isFinite(clip.start) || !Number.isFinite(clip.end) ||
    clip.start < 0 || clip.end > clip.duration || clip.end - clip.start < 0.05 - 1e-6)) {
    return 'Set each end at least 0.05 seconds after its start and within the source duration.';
  }
  if (clips.some(clip => [clip.fadeIn ?? 0, clip.fadeOut ?? 0].some(fade =>
    !Number.isFinite(fade) || fade < 0 || fade > (clip.end - clip.start) / 2 + 1e-6))) {
    return 'Set each fade between zero and half of its trimmed clip length.';
  }
  if (clips.some(clip => clip.gainDb !== undefined && (!Number.isFinite(clip.gainDb) || clip.gainDb < -24 || clip.gainDb > 12))) {
    return 'Set gain between −24 and 12 dB.';
  }
  return '';
}

export function CompilerClips({ busy, clips, setClips, allowRemove = false }: {
  busy: boolean;
  clips: StudioClip[];
  setClips: Dispatch<SetStateAction<StudioClip[]>>;
  allowRemove?: boolean;
}) {
  const [announcement, setAnnouncement] = useState('');

  function move(position: number, amount: number) {
    const next = position + amount;
    if (next < 0 || next >= clips.length) return;
    setClips(current => {
      const ordered = [...current];
      [ordered[position], ordered[next]] = [ordered[next], ordered[position]];
      return ordered;
    });
    setAnnouncement(`${clips[position].file.name} moved to position ${next + 1}.`);
  }

  function update(id: string, patch: Partial<StudioClip>) {
    setClips(current => current.map(clip => clip.id === id ? { ...clip, ...patch } : clip));
  }

  return <>
    <span className={styles.liveStatus} role="status" aria-atomic="true">{announcement}</span>
    {clips.length > 0 && <ol className={styles.trackList} aria-label="Clip playback order">
      {clips.map((clip, i) => {
        const clipLabel = `Clip ${i + 1}`;
        const fadeLimit = Number.isFinite(clip.end - clip.start) ? Math.max(0, (clip.end - clip.start) / 2) : undefined;
        return <li className={styles.track} key={clip.id}>
          <div className={styles.trackHeading}>
            <span><strong>{clip.file.name}</strong><small>Source {timelineTime(clip.duration)}</small></span>
            <div className={styles.actions}>
              <button type="button" className={styles.iconButton} disabled={busy} aria-disabled={i === 0}
                aria-label={`Move ${clip.file.name} up`} onClick={() => move(i, -1)}><ArrowUp size={17} aria-hidden="true" /></button>
              <button type="button" className={styles.iconButton} disabled={busy} aria-disabled={i === clips.length - 1}
                aria-label={`Move ${clip.file.name} down`} onClick={() => move(i, 1)}><ArrowDown size={17} aria-hidden="true" /></button>
              {allowRemove && <button type="button" className={styles.iconButton} disabled={busy} aria-label={`Remove ${clip.file.name}`}
                onClick={() => setClips(current => current.filter(item => item.id !== clip.id))}><Trash2 size={17} aria-hidden="true" /></button>}
            </div>
          </div>
          <div className={styles.clipFields}>
            <label>Start <span>sec</span><input type="number" name="clip-start" aria-label={`${clipLabel} start in seconds`} min={0} max={clip.duration} step="any"
              value={Number.isFinite(clip.start) ? clip.start : ''} disabled={busy}
              onChange={event => update(clip.id, { start: event.currentTarget.valueAsNumber })} /></label>
            <label>End <span>sec</span><input type="number" name="clip-end" aria-label={`${clipLabel} end in seconds`} min={0} max={clip.duration} step="any"
              value={Number.isFinite(clip.end) ? clip.end : ''} disabled={busy}
              onChange={event => update(clip.id, { end: event.currentTarget.valueAsNumber })} /></label>
            <label>Gain <span>dB</span><input type="number" name="clip-gain" aria-label={`${clipLabel} gain in decibels`} min={-24} max={12} step={0.5}
              value={Number.isFinite(clip.gainDb ?? 0) ? clip.gainDb ?? 0 : ''} disabled={busy}
              onChange={event => update(clip.id, { gainDb: event.currentTarget.valueAsNumber })} /></label>
          </div>
          <div className={styles.fieldRow}>
            <label>Fade in (sec)<input type="number" name="clip-fade-in" aria-label={`${clipLabel} fade in seconds`} min={0} max={fadeLimit} step="any"
              value={Number.isFinite(clip.fadeIn ?? 0) ? clip.fadeIn ?? 0 : ''} disabled={busy}
              onChange={event => update(clip.id, { fadeIn: event.currentTarget.valueAsNumber })} /></label>
            <label>Fade out (sec)<input type="number" name="clip-fade-out" aria-label={`${clipLabel} fade out seconds`} min={0} max={fadeLimit} step="any"
              value={Number.isFinite(clip.fadeOut ?? 0) ? clip.fadeOut ?? 0 : ''} disabled={busy}
              onChange={event => update(clip.id, { fadeOut: event.currentTarget.valueAsNumber })} /></label>
          </div>
        </li>;
      })}
    </ol>}
  </>;
}

export function CompilerMixFields({ busy, transition, normalize, onTransition, onNormalize }: {
  busy: boolean;
  transition: Transition;
  normalize: boolean;
  onTransition: (transition: Transition) => void;
  onNormalize: (normalize: boolean) => void;
}) {
  return <>
    <label>Transitions<select name="clip-transition" value={transition} disabled={busy} onChange={event => onTransition(event.target.value as Transition)}>
      <option value="seamless">Straight cuts</option><option value="crossfade">Crossfade up to 1 second</option><option value="gap">Half-second gaps</option>
    </select></label>
    <label className={styles.check}><input type="checkbox" name="normalize-audio" checked={normalize} disabled={busy}
      onChange={event => onNormalize(event.target.checked)} /> Normalize master loudness</label>
  </>;
}

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
  const trimError = clipTrimError(clips);
  const duration = trimError ? 0 : compileDuration(clips, transition);
  const key = JSON.stringify([transition, normalize, clips.map(clip => [clip.id, clip.start, clip.end, clip.gainDb, clip.fadeIn, clip.fadeOut])]);
  const masterKey = JSON.stringify([key, format, bitrateValue]);
  const activePreview = preview?.key === key ? preview : undefined;
  const activeMaster = master?.key === masterKey ? master : undefined;
  const clipsPeak = activePreview?.peakDb != null && activePreview.peakDb >= -0.1;
  const blocked = busy || !clips.length || Boolean(trimError) || duration <= 0 || duration > maxSeconds;

  const updateClips: typeof setClips = update => {
    setWaveform([]);
    setClips(update);
  };

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
        <CompilerClips busy={busy} clips={clips} setClips={updateClips} allowRemove />
        {trimError && <Notice danger>{trimError}</Notice>}
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
        <CompilerMixFields busy={busy} transition={transition} normalize={normalize}
          onTransition={value => { setWaveform([]); setTransition(value); }} onNormalize={value => { setWaveform([]); setNormalize(value); }} />
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
