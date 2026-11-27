import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { Play, Scissors, Trash2, VolumeOff } from 'lucide-react';
import {
  compileDuration, mapAudioIntervalToMix, previewAudioSection, validAudioInterval,
  type AudioInterval, type AudioSection, type Transition,
} from '@/lib/distrokid-media';
import { clipTrimError, CompilerClips, CompilerMixFields, type StudioClip } from './AudioCompiler';
import { AudioPlayer, errorMessage, maxSeconds, Notice, timelineTime, wasCancelled, type RunMedia } from './shared';
import styles from './studio.module.css';

type ReleaseSectionEdit = { id: string; mode: AudioSection['mode']; ranges: AudioInterval[] };

export type ReleaseAudioSettings = {
  clips: StudioClip[];
  transition: Transition;
  normalize: boolean;
  edits: ReleaseSectionEdit[];
};

export function releaseSections({ edits }: Pick<ReleaseAudioSettings, 'edits'>): AudioSection[] {
  return edits.flatMap(({ mode, ranges }) => ranges.map(range => ({ ...range, mode })));
}

function sectionFields(seed: AudioInterval | undefined, duration: number) {
  return {
    seed,
    start: seed ? String(Math.max(0, Math.min(seed.start, duration))) : '',
    end: seed ? String(Math.max(0, Math.min(seed.end, duration))) : '',
  };
}

export default function ReleaseAudioEditor({ active = true, busy, run, settings, master, seed, onApply, onCancel }: {
  active?: boolean;
  busy: boolean;
  run: RunMedia;
  settings: ReleaseAudioSettings;
  master: { audio: Blob; duration: number };
  seed?: AudioInterval;
  onApply: (settings: ReleaseAudioSettings) => Promise<void>;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(settings);
  const [fields, setFields] = useState(() => sectionFields(seed, master.duration));
  const [preview, setPreview] = useState<{ master: Blob; audio: Blob; range: AudioInterval }>();
  const [clearSections, setClearSections] = useState(false);
  const [sectionError, setSectionError] = useState('');
  const [sectionStatus, setSectionStatus] = useState('');
  const [problem, setProblem] = useState('');
  const [message, setMessage] = useState('');
  const rangeStart = useRef<HTMLInputElement>(null);
  const mixSettings = useRef<HTMLHeadingElement>(null);

  if (seed && seed !== fields.seed) {
    setFields(sectionFields(seed, master.duration));
    setSectionError('');
    setSectionStatus('');
  }

  const selection = { start: Number(fields.start), end: Number(fields.end) };
  const hasSelection = fields.start !== '' && fields.end !== '';
  const validSelection = hasSelection && validAudioInterval(selection, master.duration);
  const currentPreview = preview?.master === master.audio && validSelection &&
    preview.range.start === selection.start && preview.range.end === selection.end ? preview.audio : undefined;
  const timingChanged = draft.transition !== settings.transition || draft.clips.some((clip, index) => {
    const original = settings.clips[index];
    return clip.id !== original.id || clip.start !== original.start || clip.end !== original.end;
  });
  const changed = timingChanged || draft.normalize !== settings.normalize || draft.edits.length !== settings.edits.length ||
    draft.edits.some((edit, index) => edit !== settings.edits[index]) || draft.clips.some((clip, index) => {
      const original = settings.clips[index];
      return (clip.gainDb ?? 0) !== (original.gainDb ?? 0) || (clip.fadeIn ?? 0) !== (original.fadeIn ?? 0) ||
        (clip.fadeOut ?? 0) !== (original.fadeOut ?? 0);
    });
  const needsClear = timingChanged && draft.edits.length > 0;
  const nextDraft = needsClear ? { ...draft, edits: [] } : draft;
  const trimError = clipTrimError(draft.clips);
  const duration = trimError ? 0 : compileDuration(nextDraft.clips, nextDraft.transition, releaseSections(nextDraft));
  const canApply = changed && !trimError && duration >= 0.05 - 1e-6 && duration <= maxSeconds + 1e-6 && (!needsClear || clearSections);

  const setClips: Dispatch<SetStateAction<StudioClip[]>> = update => {
    setDraft(current => ({ ...current, clips: typeof update === 'function' ? update(current.clips) : update }));
    setClearSections(false);
    setProblem('');
    setMessage('');
  };

  function updateField(field: 'start' | 'end', value: string) {
    setFields(previous => ({ ...previous, [field]: value }));
    setSectionError('');
    setSectionStatus('');
  }

  async function previewSelection() {
    setSectionError('');
    setSectionStatus('');
    setPreview(undefined);
    try {
      const audio = await run('Preparing section preview', signal => previewAudioSection(master.audio, selection, signal));
      setPreview({ master: master.audio, audio, range: selection });
      setSectionStatus('Section preview ready.');
    } catch (error) {
      if (wasCancelled(error)) setSectionStatus('Section preview canceled.');
      else setSectionError(errorMessage(error));
    }
  }

  function addEdit(mode: AudioSection['mode']) {
    const baseDuration = compileDuration(settings.clips, settings.transition);
    const ranges = mapAudioIntervalToMix(selection, baseDuration, releaseSections(settings));
    if (!ranges.length) return;
    const edits = [...draft.edits, { id: crypto.randomUUID(), mode, ranges }];
    if (compileDuration(draft.clips, draft.transition, releaseSections({ edits })) < 0.05 - 1e-6) {
      setSectionError('Choose a smaller cut to leave at least 0.05 seconds of audio.');
      return;
    }
    setDraft({ ...draft, edits });
    setSectionError('');
    setSectionStatus(mode === 'cut' ? 'Cut added to the edit draft.' : 'Mute added to the edit draft.');
  }

  async function apply() {
    setProblem('');
    setMessage('');
    try {
      await onApply(nextDraft);
    } catch (error) {
      if (wasCancelled(error)) setMessage('Rebuild canceled. Apply the draft again when ready.');
      else setProblem(errorMessage(error));
    }
  }

  return <div className={styles.stack}>
    <div className={styles.track}>
      <h4>Cut or mute a section</h4>
      <p className={styles.muted}>{fields.seed
        ? 'Start with the sampled excerpt. Listen and adjust the times for the part you want to edit.'
        : 'Enter start and end times from the current master.'} Cut joins the surrounding audio. Mute leaves silence for the same duration.</p>
      <div className={styles.fieldRow}>
        <label>Start (sec)<input ref={rangeStart} type="number" name="section-start" min={0} max={master.duration} step="any"
          value={fields.start} onChange={event => updateField('start', event.currentTarget.value)} disabled={busy || timingChanged}
          aria-invalid={hasSelection && !validSelection} /></label>
        <label>End (sec)<input type="number" name="section-end" min={0} max={master.duration} step="any"
          value={fields.end} onChange={event => updateField('end', event.currentTarget.value)} disabled={busy || timingChanged}
          aria-invalid={hasSelection && !validSelection} /></label>
      </div>
      {!timingChanged && hasSelection && !validSelection && <Notice danger>Enter an end after the start and within {timelineTime(master.duration)}.</Notice>}
      {timingChanged && <Notice>Apply the clip timing changes to edit sections on the revised master.</Notice>}
      <div className={styles.actions}>
        <button type="button" className={styles.secondary} disabled={busy || timingChanged || !validSelection}
          onClick={() => void previewSelection()}><Play size={16} aria-hidden="true" /> Preview section</button>
        <button type="button" className={styles.secondary} disabled={busy || timingChanged || !validSelection}
          onClick={() => addEdit('cut')}><Scissors size={16} aria-hidden="true" /> Cut section</button>
        <button type="button" className={styles.secondary} disabled={busy || timingChanged || !validSelection}
          onClick={() => addEdit('mute')}><VolumeOff size={16} aria-hidden="true" /> Mute section</button>
      </div>
      {sectionError && <Notice danger>{sectionError}</Notice>}
      <span className={styles.liveStatus} role="status" aria-atomic="true">{sectionStatus}</span>
      {active && currentPreview && !timingChanged && <AudioPlayer blob={currentPreview} label="Preview selected section before editing" />}
      {draft.edits.length > 0 && <div className={styles.stack}>
        <h5>Section edits</h5>
        <p className={styles.muted}>Times are shown on the mix before cuts.</p>
        <ul className={styles.trackList} aria-label="Section edits">
          {draft.edits.map(edit => {
            const action = edit.mode === 'cut' ? 'Cut' : 'Mute';
            const times = edit.ranges.map(range => `${timelineTime(range.start)}–${timelineTime(range.end)}`).join(', ');
            return <li key={edit.id} className={styles.trackHeading}>
              <span><strong>{action}</strong><small>{times}</small></span>
              <button type="button" className={styles.iconButton} disabled={busy} aria-label={`Undo ${action.toLowerCase()} at ${times}`}
                onClick={() => {
                  setDraft(current => ({ ...current, edits: current.edits.filter(item => item.id !== edit.id) }));
                  setSectionStatus(`${action} removed from the edit draft.`);
                  (timingChanged ? mixSettings.current : rangeStart.current)?.focus();
                }}><Trash2 size={17} aria-hidden="true" /></button>
            </li>;
          })}
        </ul>
      </div>}
    </div>
    <div className={styles.panelGrid}>
      <div className={styles.stack}>
        <h4>Source clips</h4>
        <CompilerClips busy={busy} clips={draft.clips} setClips={setClips} />
        {trimError && <Notice danger>{trimError}</Notice>}
      </div>
      <div className={styles.settings}>
        <div className={styles.settingsTitle}><h4 ref={mixSettings} tabIndex={-1}>Mix settings</h4>{!trimError && <span>{timelineTime(duration)}</span>}</div>
        <CompilerMixFields busy={busy} transition={draft.transition} normalize={draft.normalize}
          onTransition={transition => {
            setDraft(current => ({ ...current, transition }));
            setClearSections(false);
          }}
          onNormalize={normalize => setDraft(current => ({ ...current, normalize }))} />
        {duration > maxSeconds + 1e-6 && <Notice danger>Trim the master to 10 minutes or less before rebuilding.</Notice>}
        {needsClear && <label className={styles.check}>
          <input type="checkbox" name="clear-sections" disabled={busy} checked={clearSections}
            onChange={event => setClearSections(event.target.checked)} /> Clear section edits when applying the new clip timing.
        </label>}
        {problem && <Notice danger>{problem}</Notice>}
        {message && <Notice>{message}</Notice>}
        <button type="button" className={styles.primary} disabled={busy || !canApply} onClick={() => void apply()}>Apply and rebuild</button>
        <button type="button" className={styles.secondary} disabled={busy} onClick={onCancel}>Cancel edits</button>
      </div>
    </div>
  </div>;
}
