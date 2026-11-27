'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AudioLines, Disc3, ImageIcon, ListMusic, ShieldCheck, Square, Type } from 'lucide-react';
import { cancelMediaJob, probeMedia } from '@/lib/distrokid-media';
import AudioCompiler, { type StudioClip } from './AudioCompiler';
import BatchConverter from './BatchConverter';
import CopyrightCheck from './CopyrightCheck';
import CoverGenerator from './CoverGenerator';
import NameGenerator from './NameGenerator';
import { errorMessage, maxSeconds, validateFiles, wasCancelled, type RunMedia } from './shared';
import styles from './studio.module.css';

const tools = [
  { id: 'check', label: 'Copyright check', description: 'Inspect a file, look up a recording, or compare a reference.', icon: ShieldCheck },
  { id: 'convert', label: 'Batch converter', description: 'Extract audio from videos or convert audio files in one batch.', icon: AudioLines },
  { id: 'compile', label: 'Audio compiler', description: 'Shape, arrange, and export clips as one master.', icon: ListMusic },
  { id: 'names', label: 'Name generator', description: 'Find a working title for your track, album, or EP.', icon: Type },
  { id: 'cover', label: 'Cover generator', description: 'Make a square cover with editable text, colors, and artwork.', icon: ImageIcon },
] as const;

type ToolId = typeof tools[number]['id'];

export default function DistrokidStudio() {
  const [active, setActive] = useState<ToolId>('check');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [waveform, setWaveform] = useState<number[]>([]);
  const [clips, setClips] = useState<StudioClip[]>([]);
  const [job, setJob] = useState<string>();
  const jobController = useRef<AbortController | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => () => {
    if (!jobController.current) return;
    jobController.current.abort();
    cancelMediaJob();
  }, []);

  const run: RunMedia = async (label, action) => {
    if (jobController.current) throw new Error('Wait for the current audio task to finish.');
    const controller = new AbortController();
    jobController.current = controller;
    setJob(label);
    try {
      return await action(controller.signal);
    } finally {
      jobController.current = null;
      setJob(undefined);
    }
  };

  async function addCompilerFiles(files: File[]) {
    const invalid = validateFiles(files, clips.map(clip => clip.file));
    if (invalid) return [invalid];
    return run('Reading clips', async signal => {
      const additions: StudioClip[] = [];
      const errors: string[] = [];
      for (const file of files) {
        signal.throwIfAborted();
        try {
          const info = await probeMedia(file, signal);
          signal.throwIfAborted();
          if (!info.hasAudio) throw new Error('No audio track.');
          if (info.duration > maxSeconds) throw new Error('Keep each source under 10 minutes.');
          if (info.duration < 0.05) throw new Error('The clip is shorter than 0.05 seconds.');
          additions.push({ id: crypto.randomUUID(), file, start: 0, end: info.duration, duration: info.duration });
        } catch (problem) {
          if (signal.aborted || wasCancelled(problem)) throw problem;
          errors.push(file.name + ' — ' + errorMessage(problem));
        }
      }
      if (additions.length) setWaveform([]);
      setClips(current => [...current, ...additions]);
      return errors;
    });
  }

  function changeTab(id: ToolId) {
    setActive(id);
    tabs.current[tools.findIndex(tool => tool.id === id)]?.focus();
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tools.length - 1;
    const targets: Record<string, number> = { ArrowLeft: index > 0 ? index - 1 : last, ArrowRight: index < last ? index + 1 : 0, Home: 0, End: last };
    if (targets[event.key] === undefined) return;
    event.preventDefault();
    changeTab(tools[targets[event.key]].id);
  }

  const screens = {
    check: <CopyrightCheck busy={Boolean(job)} run={run} />,
    convert: <BatchConverter busy={Boolean(job)} run={run} addToCompiler={async file => {
      const errors = await addCompilerFiles([file]);
      if (errors.length) throw new Error(errors.join(' '));
      changeTab('compile');
    }} />,
    compile: <AudioCompiler busy={Boolean(job)} run={run} clips={clips} setClips={setClips} addFiles={addCompilerFiles}
      title={title} setTitle={setTitle} setWaveform={setWaveform} />,
    names: <NameGenerator title={title} onTitle={setTitle} onCover={() => changeTab('cover')} />,
    cover: <CoverGenerator title={title} onTitle={setTitle} artist={artist} onArtist={setArtist} waveform={waveform} active={active === 'cover'} />,
  };

  return (
    <section className={styles.studio} aria-label="Distrokid Studio">
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.heroMark}><Disc3 size={18} /> The Faceless Prompts</span>
          <h1>Distrokid Studio</h1>
          <p>Check a recording, turn video into audio, and prepare your master, title, and cover in one place.</p>
        </div>
        <div className={styles.heroArt} aria-hidden="true"><span /><span /><span /><i /></div>
      </header>
      <div className={styles.workspace}>
        <div className={styles.tabs} role="tablist" aria-label="Studio tools">
          {tools.map((tool, index) => (
            <button key={tool.id} ref={element => { tabs.current[index] = element; }}
              role="tab" id={'distrokid-tab-' + tool.id} aria-selected={active === tool.id}
              aria-controls={'distrokid-panel-' + tool.id} tabIndex={active === tool.id ? 0 : -1}
              onKeyDown={event => navigate(event, index)} onClick={() => changeTab(tool.id)}>
              <tool.icon size={19} /><span>{tool.label}</span>
            </button>
          ))}
        </div>
        {job && <div className={styles.job} role="status">
          <span><i className={styles.spinner} /> {job}…</span>
          <button className={styles.secondary} onClick={() => { jobController.current?.abort(); cancelMediaJob(); }}><Square size={13} /> Cancel</button>
        </div>}
        {tools.map(tool => (
          <section key={tool.id} role="tabpanel" id={'distrokid-panel-' + tool.id}
            aria-labelledby={'distrokid-tab-' + tool.id} className={styles.tabPanel} hidden={active !== tool.id}>
            <div className={styles.panelIntro}><h2>{tool.label}</h2><p>{tool.description}</p></div>
            {screens[tool.id]}
          </section>
        ))}
      </div>
    </section>
  );
}
