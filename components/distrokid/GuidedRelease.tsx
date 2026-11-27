'use client';

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import { ArrowDown, ArrowLeft, ArrowUp, Check, Download, FileAudio, GripVertical, SlidersHorizontal, Trash2 } from 'lucide-react';
import {
  analyzeAudio, AUDIO_FORMATS, compileAudio, compileDuration, MAX_MEDIA_BYTES,
  previewAudio, probeMedia, type AudioFormat,
} from '@/lib/distrokid-media';
import type { StudioClip } from './AudioCompiler';
import CatalogCheck from './CatalogCheck';
import CoverGenerator from './CoverGenerator';
import NameGenerator from './NameGenerator';
import ReleaseAudioEditor, { releaseSections, type ReleaseAudioSettings } from './ReleaseAudioEditor';
import {
  AudioPlayer, downloadBlob, Dropzone, errorMessage, maxSeconds, Notice,
  safeName, sizeLabel, timelineTime, validateFiles, wasCancelled, type RunMedia,
} from './shared';
import styles from './studio.module.css';

type ReleaseStep = 'audio' | 'name' | 'cover' | 'review';
type Step = ReleaseStep | 'edit';
type QueuedVideo = { id: string; file: File; duration?: number; error?: string };
type Master = {
  audio: Blob; preview?: Blob; format: AudioFormat; waveform: number[];
  duration: number; peakDb: number | null; settings: ReleaseAudioSettings;
};
type EditSession = { returnStep: ReleaseStep; seed?: { start: number; end: number } };
export type GuidedReleaseHandle = { focusQueue: () => void };

const steps: { id: ReleaseStep; label: string }[] = [
  { id: 'audio', label: 'Add videos' },
  { id: 'name', label: 'Name release' },
  { id: 'cover', label: 'Create cover' },
  { id: 'review', label: 'Review release' },
];
const formats = ['wav', 'mp3', 'm4a', 'flac', 'aiff', 'wma'] as const;

export default function GuidedRelease({ active, busy, run, title, onTitle, artist, onArtist, ref }: {
  active: boolean;
  busy: boolean;
  run: RunMedia;
  title: string;
  onTitle: (title: string) => void;
  artist: string;
  onArtist: (artist: string) => void;
  ref?: Ref<GuidedReleaseHandle>;
}) {
  const [step, setStep] = useState<Step>('audio');
  const [queue, setQueue] = useState<QueuedVideo[]>([]);
  const [master, setMaster] = useState<Master>();
  const [editing, setEditing] = useState<EditSession>();
  const [message, setMessage] = useState('');
  const [problem, setProblem] = useState('');
  const [progress, setProgress] = useState<number>();
  const [dragged, setDragged] = useState<string>();
  const [dropTarget, setDropTarget] = useState<string>();
  const headings = useRef<Partial<Record<Step, HTMLHeadingElement>>>({});
  const focusStep = useRef(false);

  useEffect(() => {
    if (!active || !focusStep.current) return;
    focusStep.current = false;
    focusHeading(step);
  }, [step, active]);

  function focusHeading(target: Step) {
    const heading = headings.current[target];
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ block: 'start' });
  }

  function goTo(next: Step) {
    if (next === step) return;
    focusStep.current = true;
    setStep(next);
  }

  useImperativeHandle(ref, () => ({
    focusQueue() {
      if (step === 'audio' && active) focusHeading('audio');
      else {
        focusStep.current = true;
        setStep('audio');
      }
    },
  }), [active, step]);

  function openEditor(seed?: EditSession['seed']) {
    if (step === 'edit') return;
    setEditing({ returnStep: step, seed });
    goTo('edit');
  }

  function finishEditing() {
    goTo(editing?.returnStep ?? 'review');
    setEditing(undefined);
  }

  function resetMaster() {
    setMaster(undefined);
    setEditing(undefined);
  }

  function updateVideo(id: string, data: Pick<QueuedVideo, 'duration' | 'error'>) {
    setQueue(previous => previous.map(video => video.id === id ? { ...video, ...data } : video));
  }

  async function reviewVideos(remaining: QueuedVideo[]) {
    setProblem('');
    setMessage('');
    try {
      await run('Checking videos', async signal => {
        for (const { id, file } of remaining) {
          signal.throwIfAborted();
          try {
            const info = await probeMedia(file, signal);
            if (!info.hasVideo) throw new Error('Choose a video file with audio.');
            if (!info.hasAudio) throw new Error('This video has no audio track.');
            if (info.duration > maxSeconds) throw new Error('Choose a video with no more than 10 minutes of audio.');
            if (info.duration < 0.05) throw new Error('This video has less than 0.05 seconds of readable audio.');
            updateVideo(id, { duration: info.duration });
          } catch (error) {
            if (signal.aborted || wasCancelled(error)) throw error;
            updateVideo(id, { error: errorMessage(error) });
          }
        }
      });
    } catch (error) {
      if (wasCancelled(error)) setMessage('Video check canceled. Your files are still here.');
      else setProblem(errorMessage(error));
    }
  }

  function addVideos(files: File[]) {
    const invalid = validateFiles(files, queue.map(video => video.file));
    if (invalid) {
      const oversized = files.find(file => file.size > MAX_MEDIA_BYTES);
      const empty = files.find(file => !file.size);
      setProblem(empty ? empty.name + ' is empty.' : oversized ? oversized.name + ' exceeds 100 MB.' : invalid);
      return;
    }
    if (!files.length) return;
    const added = files.map(file => ({ id: crypto.randomUUID(), file }));
    setQueue(previous => [...previous, ...added]);
    resetMaster();
    void reviewVideos(added);
  }

  function changeOrder(index: number, target: number) {
    if (index === target || index < 0 || target < 0 || target >= queue.length) return;
    setQueue(previous => {
      const ordered = [...previous];
      const [video] = ordered.splice(index, 1);
      ordered.splice(target, 0, video);
      return ordered;
    });
    resetMaster();
    setProblem('');
    setMessage(queue[index].file.name + ' moved to position ' + (target + 1) + '.');
  }

  const clips: StudioClip[] = queue.flatMap(({ id, file, duration }) => duration === undefined ? [] : [{ id, file, duration, start: 0, end: duration }]);
  const duration = compileDuration(clips);
  const pending = queue.filter(video => video.duration === undefined && !video.error);
  const ready = clips.length > 0 && clips.length === queue.length && duration <= maxSeconds + 1e-6;

  async function buildMaster(format: AudioFormat, settings: ReleaseAudioSettings) {
    const sections = releaseSections(settings);
    const total = compileDuration(settings.clips, settings.transition, sections);
    setProgress(0);
    try {
      return await run('Compiling audio', async signal => {
        const audio = await compileAudio(settings.clips, {
          format, bitrate: format === 'wma' ? 192 : 320, transition: settings.transition, normalize: settings.normalize,
          sections, signal, onProgress: setProgress,
        });
        signal.throwIfAborted();
        let preview: Blob | undefined = audio;
        let waveform: number[] = [];
        let peakDb: number | null = null;
        if (!document.createElement('audio').canPlayType(audio.type)) {
          preview = await previewAudio(audio, signal).catch(error => {
            if (signal.aborted) throw error;
            return undefined;
          });
        }
        try {
          ({ waveform, peakDb } = await analyzeAudio(audio, signal));
        } catch (error) {
          if (signal.aborted) throw error;
        }
        signal.throwIfAborted();
        return { audio, preview, waveform, peakDb, format, duration: total, settings };
      });
    } finally {
      setProgress(undefined);
    }
  }

  async function renderMaster(format: AudioFormat) {
    if (format === master?.format) {
      goTo('name');
      return;
    }
    setProblem('');
    setMessage('');
    try {
      const settings = master?.settings ?? { clips, transition: 'seamless', normalize: false, edits: [] };
      setMaster(await buildMaster(format, settings));
      setEditing(undefined);
      goTo('name');
    } catch (error) {
      if (wasCancelled(error)) setMessage('Compilation canceled. Choose a format to retry.');
      else setProblem(errorMessage(error));
    }
  }

  function previewFailed() {
    setMaster(previous => previous && { ...previous, preview: undefined });
  }

  const masterSummary = master && (
    <div><FileAudio size={18} aria-hidden="true" /><span><strong>Audio master</strong>
      <small>{master.format.toUpperCase()} · {timelineTime(master.duration)} · {sizeLabel(master.audio.size)}</small>
    </span></div>
  );
  const masterPlayer = master?.preview ? <AudioPlayer blob={master.preview} label="Preview audio master" onError={previewFailed} />
    : <p className={styles.muted}>Preview unavailable in this browser.</p>;
  const compileProgress = progress !== undefined && <progress className={styles.progress} max={1} value={progress || undefined} aria-label="Audio compilation progress" />;

  return (
    <div className={styles.guided}>
      <div className={styles.panelIntro}>
        <h2>Create a release</h2>
        <p>Compile the audio from your videos, then name the release and design its cover.</p>
      </div>
      <ol className={styles.releaseSteps} aria-label="Release steps">
        {steps.map(({ id, label }, index) => (
          <li key={id}>
            <button type="button" className={styles.releaseStep} aria-current={step === id ? 'step' : undefined}
              onClick={() => goTo(id)} disabled={busy || (id !== 'audio' && (!master || (id !== 'name' && !title.trim())))}>
              <span aria-hidden="true">{index + 1}</span>{label}
            </button>
          </li>
        ))}
      </ol>
      <span className={styles.liveStatus} role="status" aria-atomic="true">
        {progress === undefined ? '' : progress === 1 ? 'Audio compiled. Preparing preview…' : 'Compiling audio. ' + Math.floor(progress * 10) * 10 + '% complete.'}
      </span>
      <div className={styles.stack}>
        <section className={styles.panelGrid} hidden={step !== 'audio'} aria-labelledby="release-upload-heading">
          <div className={styles.stack}>
            <h3 id="release-upload-heading" className={styles.stepHeading} tabIndex={-1} ref={node => { if (node) headings.current.audio = node; }}>Video queue</h3>
            <Dropzone title="Drop your videos here" hint="Up to 8 videos, 100 MB each and 250 MB combined." videos multiple
              disabled={busy} compact={queue.length > 0} onFiles={addVideos} />
            {queue.length > 1 && <p className={styles.muted}>Drag the handles or use the arrows to change playback order.</p>}
            {!!queue.length && <ol className={styles.releaseQueue} aria-label="Video playback order">
              {queue.map((video, index) => <li key={video.id} data-drop-target={dropTarget === video.id}
                onDragOver={event => {
                  if (!dragged || busy) return;
                  event.preventDefault();
                  event.dataTransfer.dropEffect = 'move';
                  setDropTarget(video.id !== dragged ? video.id : undefined);
                }}
                onDrop={event => {
                  if (!dragged || busy) return;
                  event.preventDefault();
                  changeOrder(queue.findIndex(entry => entry.id === dragged), index);
                  setDragged(undefined);
                  setDropTarget(undefined);
                }}>
                <div className={styles.queueRow}>
                  <span className={styles.queueNumber} aria-hidden="true" draggable={!busy && queue.length > 1}
                    onDragStart={event => {
                      event.dataTransfer.effectAllowed = 'move';
                      event.dataTransfer.setData('text/plain', video.file.name);
                      setDragged(video.id);
                    }}
                    onDragEnd={() => { setDragged(undefined); setDropTarget(undefined); }}>
                    {queue.length > 1 && <GripVertical size={16} />}{index + 1}
                  </span>
                  <span className={styles.queueFile}>
                    <strong>{video.file.name}</strong>
                    <small>{sizeLabel(video.file.size)}{video.duration !== undefined ? ' · ' + timelineTime(video.duration) : !video.error ? ' · Check pending' : ''}</small>
                  </span>
                  <div className={styles.queueActions}>
                    <button type="button" disabled={busy} aria-disabled={index === 0} className={styles.iconButton}
                      aria-label={'Move ' + video.file.name + ' up'} onClick={() => changeOrder(index, index - 1)}><ArrowUp size={16} aria-hidden="true" /></button>
                    <button type="button" disabled={busy} aria-disabled={index === queue.length - 1} className={styles.iconButton}
                      aria-label={'Move ' + video.file.name + ' down'} onClick={() => changeOrder(index, index + 1)}><ArrowDown size={16} aria-hidden="true" /></button>
                    <button type="button" disabled={busy} className={styles.iconButton} aria-label={'Remove ' + video.file.name}
                      onClick={() => {
                        setQueue(previous => previous.filter(entry => entry.id !== video.id));
                        resetMaster();
                        setProblem('');
                        setMessage(video.file.name + ' removed.');
                      }}><Trash2 size={16} aria-hidden="true" /></button>
                  </div>
                </div>
                {video.error && <p className={styles.error} role="alert">{video.error}</p>}
              </li>)}
            </ol>}
            {pending.length > 0 && !busy && <button type="button" className={styles.secondary} onClick={() => void reviewVideos(pending)}>Check remaining videos</button>}
            {problem && <Notice danger>{problem}</Notice>}
            {message && <Notice>{message}</Notice>}
          </div>
          <div className={styles.settings}>
            <h3>Master format</h3>
            <p className={styles.muted}>{master ? 'Choose a format to export your current audio mix.' : 'Choosing a format compiles the audio in the order shown, using straight cuts.'}</p>
            <div className={styles.formatButtons} role="group" aria-label="Audio master formats">
              {formats.map(format => {
                const label = AUDIO_FORMATS.find(option => option.id === format)?.label;
                return <button key={format} type="button" className={format === 'wav' ? styles.primary : styles.secondary}
                  aria-label={'Compile as ' + label} onClick={() => void renderMaster(format)} disabled={!ready || busy}>
                  {master?.format === format && <Check size={15} aria-hidden="true" />}{label}{format === 'wav' && <small>Recommended</small>}
                </button>;
              })}
            </div>
            {step === 'audio' && compileProgress}
            {queue.length > 0 && <p className={styles.muted}>{clips.length} of {queue.length} ready{clips.length > 0 && ' · ' + timelineTime(duration) + ' of audio'}</p>}
            {duration > maxSeconds + 1e-6 && <Notice danger>Remove videos to bring the master down to 10 minutes or less.</Notice>}
            {queue.some(video => video.error) && <p className={styles.muted}>Remove files with errors before compiling.</p>}
          </div>
        </section>
        {active && master && (step === 'name' || step === 'cover' || step === 'edit') && <div className={styles.masterStrip}>
          {masterSummary}
          {masterPlayer}
          <div className={styles.actions}>
            <button type="button" className={styles.secondary}
              onClick={() => downloadBlob(master.audio, safeName(title) + '.' + master.format)}><Download size={16} aria-hidden="true" /> Download master</button>
            {step !== 'edit' && <button type="button" className={styles.secondary} disabled={busy}
              onClick={() => openEditor()}><SlidersHorizontal size={16} aria-hidden="true" /> Edit audio</button>}
          </div>
        </div>}
        <section className={styles.stack} hidden={step !== 'name'} aria-labelledby="release-name-heading">
          <h3 id="release-name-heading" className={styles.stepHeading} tabIndex={-1} ref={node => { if (node) headings.current.name = node; }}>Name your release</h3>
          <NameGenerator title={title} onTitle={onTitle} onCover={() => goTo('cover')} />
        </section>
        <section className={styles.stack} hidden={step !== 'cover' && step !== 'review'} aria-labelledby={step === 'review' ? 'release-review-heading' : 'release-cover-heading'}>
          <h3 id="release-cover-heading" hidden={step !== 'cover'} className={styles.stepHeading} tabIndex={-1} ref={node => { if (node) headings.current.cover = node; }}>Design your cover</h3>
          <h3 id="release-review-heading" hidden={step !== 'review'} className={styles.stepHeading} tabIndex={-1} ref={node => { if (node) headings.current.review = node; }}>Review release</h3>
          <CoverGenerator title={title} onTitle={onTitle} artist={artist} onArtist={onArtist}
            waveform={master?.waveform ?? []} active={active && (step === 'cover' || step === 'review')}
            onReview={() => goTo('review')}
            review={step === 'review' && master ? { audio: master.audio, format: master.format, busy, run, player: (
              <div className={styles.reviewMaster}>{masterSummary}{active && masterPlayer}</div>
            ) } : undefined} />
          <div className={styles.actions}>
            <button type="button" className={styles.secondary} disabled={busy} onClick={() => goTo(step === 'review' ? 'cover' : 'audio')}>
              <ArrowLeft size={16} aria-hidden="true" /> {step === 'review' ? 'Back to cover' : 'Back to video queue'}
            </button>
            {step === 'review' && <button type="button" className={styles.secondary} disabled={busy}
              onClick={() => openEditor()}><SlidersHorizontal size={16} aria-hidden="true" /> Edit audio</button>}
          </div>
        </section>
        {master && <section className={styles.stack} hidden={step !== 'review'} aria-label="Master checks">
          <div className={styles.track}>
            <h3>Audio levels</h3>
            <p className={styles.muted}>{master.peakDb === null ? 'Sample peak measurement unavailable.' : 'Sample peak ' + master.peakDb.toFixed(1) + ' dBFS'}</p>
            {master.peakDb !== null && master.peakDb >= -0.1 && <Notice danger>The master reaches the clipping threshold. Lower the clip gain or turn on normalization in Edit audio.</Notice>}
          </div>
          <CatalogCheck source={{ blob: master.audio, duration: master.duration }} busy={busy} run={run} onEditExcerpt={openEditor} />
        </section>}
        {master && editing && <section className={styles.stack} hidden={step !== 'edit'} aria-labelledby="release-edit-heading">
          <h3 id="release-edit-heading" className={styles.stepHeading} tabIndex={-1} ref={node => { if (node) headings.current.edit = node; }}>Edit audio</h3>
          {step === 'edit' && compileProgress}
          <ReleaseAudioEditor active={active && step === 'edit'} busy={busy} run={run} settings={master.settings} master={{ audio: master.audio, duration: master.duration }}
            seed={editing.seed} onCancel={finishEditing} onApply={async settings => {
              setMaster(await buildMaster(master.format, settings));
              setQueue(current => {
                const byId = new Map(current.map(video => [video.id, video]));
                return settings.clips.map(clip => byId.get(clip.id)!);
              });
              finishEditing();
            }} />
        </section>}
      </div>
    </div>
  );
}
