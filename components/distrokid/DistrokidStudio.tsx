'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowDown, AudioLines, BookOpen, Disc3, ImageIcon, ListMusic, Settings2, ShieldCheck, Square, Type } from 'lucide-react';
import { cancelMediaJob, probeMedia } from '@/lib/distrokid-media';
import AudioCompiler, { type StudioClip } from './AudioCompiler';
import BatchConverter from './BatchConverter';
import CopyrightCheck from './CopyrightCheck';
import CoverGenerator from './CoverGenerator';
import GuidedRelease from './GuidedRelease';
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
type Workspace = 'release' | 'tools';
const workspaces = [
  { id: 'release', label: 'Create a release', icon: Disc3 },
  { id: 'tools', label: 'Studio tools', icon: Settings2 },
] as const;

export default function DistrokidStudio({ offer }: { offer?: ReactNode }) {
  const [workspace, setWorkspace] = useState<Workspace>('release');
  const [active, setActive] = useState<ToolId>('check');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [waveform, setWaveform] = useState<number[]>([]);
  const [clips, setClips] = useState<StudioClip[]>([]);
  const [job, setJob] = useState<string>();
  const jobController = useRef<AbortController | null>(null);
  const workspaceTabs = useRef<(HTMLButtonElement | null)[]>([]);
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

  function navigateWorkspace(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const targets: Record<string, number> = { ArrowLeft: 1 - index, ArrowRight: 1 - index, Home: 0, End: 1 };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setWorkspace(workspaces[next].id);
    workspaceTabs.current[next]?.focus();
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
    cover: <CoverGenerator title={title} onTitle={setTitle} artist={artist} onArtist={setArtist} waveform={waveform} active={workspace === 'tools' && active === 'cover'} />,
  };

  return (
    <section className={styles.studio} aria-label="Distrokid Studio">
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.heroMark}><Disc3 size={18} aria-hidden="true" /> The Faceless Prompts</span>
          <h1>Distrokid Studio</h1>
          <p>Turn your videos into an audio master, then give your release a name and a cover.</p>
          <a href="#earning-methods" className={styles.heroLink}><BookOpen size={16} aria-hidden="true" /> Earning methods tutorial <ArrowDown size={14} aria-hidden="true" /></a>
        </div>
        <div className={styles.heroArt} aria-hidden="true"><span /><span /><span /><i /></div>
      </header>
      {offer}
      <div className={styles.workspace}>
        <span className={styles.liveStatus} role="status" aria-atomic="true">{job ? job + '…' : ''}</span>
        <div className={styles.workspaceTabs} role="tablist" aria-label="Distrokid Studio workspace">
          {workspaces.map(({ id, label, icon: Icon }, index) => (
            <button key={id} type="button" ref={element => { workspaceTabs.current[index] = element; }}
              role="tab" id={'distrokid-workspace-tab-' + id} aria-selected={workspace === id}
              aria-controls={'distrokid-workspace-panel-' + id} tabIndex={workspace === id ? 0 : -1}
              onKeyDown={event => navigateWorkspace(event, index)} onClick={() => setWorkspace(id)}>
              <Icon size={19} aria-hidden="true" />{label}
            </button>
          ))}
        </div>
        {job && <div className={styles.job}>
          <span aria-hidden="true"><i className={styles.spinner} /> {job}…</span>
          <button type="button" className={styles.secondary} onClick={() => { jobController.current?.abort(); cancelMediaJob(); }}><Square size={13} aria-hidden="true" /> Cancel</button>
        </div>}
        <section role="tabpanel" id="distrokid-workspace-panel-release" aria-labelledby="distrokid-workspace-tab-release"
          className={styles.tabPanel} hidden={workspace !== 'release'}>
          <GuidedRelease active={workspace === 'release'} busy={Boolean(job)} run={run} title={title} onTitle={setTitle} artist={artist} onArtist={setArtist} />
        </section>
        <section role="tabpanel" id="distrokid-workspace-panel-tools" aria-labelledby="distrokid-workspace-tab-tools" hidden={workspace !== 'tools'}>
          <div className={styles.tabs} role="tablist" aria-label="Studio tools">
            {tools.map((tool, index) => (
              <button key={tool.id} type="button" ref={element => { tabs.current[index] = element; }}
                role="tab" id={'distrokid-tab-' + tool.id} aria-selected={active === tool.id}
                aria-controls={'distrokid-panel-' + tool.id} tabIndex={active === tool.id ? 0 : -1}
                onKeyDown={event => navigate(event, index)} onClick={() => changeTab(tool.id)}>
                <tool.icon size={19} aria-hidden="true" /><span>{tool.label}</span>
              </button>
            ))}
          </div>
          {tools.map(tool => (
            <section key={tool.id} role="tabpanel" id={'distrokid-panel-' + tool.id}
              aria-labelledby={'distrokid-tab-' + tool.id} className={styles.tabPanel} hidden={active !== tool.id}>
              <div className={styles.panelIntro}><h2>{tool.label}</h2><p>{tool.description}</p></div>
              {screens[tool.id]}
            </section>
          ))}
        </section>
      </div>
    </section>
  );
}
