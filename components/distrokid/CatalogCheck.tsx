import { useEffect, useState, type ReactNode } from 'react';
import { ExternalLink, Fingerprint } from 'lucide-react';
import { createRecognitionExcerpts } from '@/lib/distrokid-media';
import { isAudible, readExcerpt } from './reference';
import { Notice, errorMessage, timelineTime, wasCancelled, type RunMedia } from './shared';
import styles from './studio.module.css';

export type Track = { title: string; artist: string; album?: string; releaseDate?: string; link?: string; isrc?: string };
type SampleRange = { start: number; end: number };
type Sample = SampleRange & {
  status: 'pending' | 'match' | 'no_match' | 'unavailable' | 'silent';
  track?: Track;
  message?: string;
};
type Recognition = {
  blob?: Blob;
  consent: boolean;
  samples: Sample[];
  phase: 'ready' | 'checking' | 'finished' | 'canceled' | 'error';
  message?: string;
};

const endpoint = '/api/distrokid-studio/recognize';

export function TrackDetails({ track }: { track: Track }) {
  return <div className={styles.trackSummary}>
    <strong>{track.title}</strong>
    <p>{[track.artist, track.album, track.isrc].filter(Boolean).join(' · ')}</p>
    {track.link && /^https:\/\//.test(track.link) && <a className={styles.inlineLink} href={track.link} target="_blank" rel="noreferrer">
      Open catalog entry <ExternalLink size={14} aria-hidden="true" />
    </a>}
  </div>;
}

function checkedDuration(samples: Sample[]) {
  let coveredThrough = 0;
  let seconds = 0;
  for (const { start, end } of samples) {
    seconds += Math.max(0, end - Math.max(start, coveredThrough));
    coveredThrough = Math.max(coveredThrough, end);
  }
  return seconds;
}

function sampleMessage(sample: Sample, checking: boolean) {
  if (sample.status === 'pending') return checking ? 'Waiting to check…' : 'Not checked.';
  if (sample.status === 'silent') return 'Silent excerpt skipped.';
  return sample.message ?? 'No catalog match.';
}

export default function CatalogCheck({ source, busy, run, onEditExcerpt, children }: {
  source?: { blob: Blob; duration: number };
  busy: boolean;
  run: RunMedia;
  onEditExcerpt?: (range: SampleRange) => void;
  children?: ReactNode;
}) {
  const blob = source?.blob;
  const [available, setAvailable] = useState<boolean>();
  const [state, setState] = useState<Recognition>({ blob, consent: false, samples: [], phase: 'ready' });
  if (state.blob !== blob) setState({ blob, consent: false, samples: [], phase: 'ready' });

  const isMaster = Boolean(onEditExcerpt);
  const shouldCheckAvailability = !isMaster || Boolean(source);
  useEffect(() => {
    if (!shouldCheckAvailability) return;
    const controller = new AbortController();
    fetch(endpoint, { signal: controller.signal, cache: 'no-store' })
      .then(async response => response.ok ? await response.json() as { available?: boolean } : undefined)
      .then(result => { if (!controller.signal.aborted) setAvailable(Boolean(result?.available)); })
      .catch(() => { if (!controller.signal.aborted) setAvailable(false); });
    return () => controller.abort();
  }, [shouldCheckAvailability]);

  async function recognize() {
    if (!source || state.blob !== source.blob || !state.consent || !available || busy) return;
    const update = (patch: Partial<Recognition>) => {
      setState(current => current.blob === source.blob ? { ...current, ...patch } : current);
    };
    update({ phase: 'checking', samples: [], message: undefined });
    try {
      await run('Checking sampled audio', async signal => {
        const excerpts = await createRecognitionExcerpts(source.blob, source.duration, signal);
        const decoded = await Promise.all(excerpts.map(excerpt => readExcerpt(excerpt.blob)));
        signal.throwIfAborted();
        const samples: Sample[] = excerpts.map(({ offset }, index) => ({
          start: offset,
          end: Math.min(source.duration, offset + decoded[index].duration),
          status: isAudible(decoded[index].samples) ? 'pending' : 'silent',
        }));
        update({ samples: [...samples] });

        for (const [index, excerpt] of excerpts.entries()) {
          signal.throwIfAborted();
          const sample = samples[index];
          if (sample.status === 'silent') continue;
          const body = new FormData();
          body.append('sample', excerpt.blob, 'sample.wav');
          let stop = false;
          try {
            const response = await fetch(endpoint, { method: 'POST', body, signal });
            const result = await response.json() as { status: string; track?: Track; message?: string };
            signal.throwIfAborted();
            if (response.ok && result.status === 'match' && result.track) {
              samples[index] = { ...sample, status: 'match', track: result.track };
            } else if (response.ok && result.status === 'no_match') {
              samples[index] = { ...sample, status: 'no_match' };
            } else {
              samples[index] = { ...sample, status: 'unavailable', message: result.message ?? 'The catalog could not check this excerpt.' };
              stop = response.status === 429 || result.status === 'unavailable';
            }
          } catch (problem) {
            if (signal.aborted) throw problem;
            samples[index] = { ...sample, status: 'unavailable', message: 'The recognition service did not respond.' };
            stop = true;
          }
          update({ samples: [...samples] });
          if (stop) break;
        }
      });
      update({ phase: 'finished' });
    } catch (problem) {
      if (wasCancelled(problem)) update({ phase: 'canceled', message: 'Catalog check canceled.' });
      else update({ phase: 'error', message: errorMessage(problem) });
    }
  }

  const checked = state.samples.filter(sample => sample.status === 'match' || sample.status === 'no_match');
  const found = checked.some(sample => sample.status === 'match');
  const checking = state.phase === 'checking';
  const controls = <div className={styles.settings}>
    <h3>{isMaster ? 'Check master' : 'Live recognition'}</h3>
    <p className={styles.muted}>AudD compares short excerpts from your {isMaster ? 'master' : 'file'} against its recording catalog.</p>
    {available === false && <Notice>{isMaster ? 'Live recognition is currently unavailable.' : 'Live recognition is currently unavailable. File scan and registry lookup are available.'}</Notice>}
    {available === true && <>
      <label className={styles.check}><input type="checkbox" checked={state.consent} disabled={!source || busy || checking}
        onChange={event => setState(current => ({ ...current, consent: event.target.checked }))} /> Send up to three 12-second audio excerpts to AudD.</label>
      <a className={styles.inlineLink} href="https://audd.io/privacy/index.php" target="_blank" rel="noreferrer">
        AudD privacy policy <ExternalLink size={14} aria-hidden="true" />
      </a>
      <button type="button" className={styles.primary} disabled={!source || !state.consent || busy || checking} onClick={() => void recognize()}>
        <Fingerprint size={17} aria-hidden="true" />{checking ? 'Checking catalog…' : state.phase === 'ready' ? 'Check catalog' : 'Check catalog again'}
      </button>
    </>}
    {available === undefined && <p className={styles.muted} role="status">Checking service availability…</p>}
    <p className={styles.muted}>Use any matches to investigate recording rights. Clearance requires confirmation from the rights holder.</p>
  </div>;

  const results = <>
    {state.message && <Notice danger={state.phase === 'error'}>{state.message}</Notice>}
    {source && state.samples.length > 0 && <div className={styles.track}>
      <h3>Catalog results</h3>
      <p className={styles.muted} role="status" aria-atomic="true">
        {checked.length} of {state.samples.length} excerpts checked · {timelineTime(checkedDuration(checked))} of {timelineTime(source.duration)}.
        {' '}{found ? 'Recording match found.' : checking ? 'Checking the remaining excerpts…' : checked.length ? 'No match in checked excerpts. The result is inconclusive.' : 'The scan has no completed catalog checks.'}
      </p>
      {found && isMaster && <p className={styles.muted}>Listen in the editor to confirm the start and end of the audio you want to change.</p>}
      <ul className={styles.trackList} aria-label="Sampled excerpts">
        {state.samples.map(sample => {
          const range = `${timelineTime(sample.start)}–${timelineTime(sample.end)}`;
          return <li key={sample.start} className={styles.sample}>
            <span className={styles.timestamp}>{range}</span>
            <div className={styles.stack}>
              {sample.track ? <TrackDetails track={sample.track} /> : <p>{sampleMessage(sample, checking)}</p>}
              {sample.track && onEditExcerpt && <div className={styles.actions}>
                <button type="button" className={styles.secondary} disabled={busy || checking} aria-label={`Edit this excerpt, ${range}`}
                  onClick={() => onEditExcerpt({ start: sample.start, end: sample.end })}>Edit this excerpt</button>
              </div>}
            </div>
          </li>;
        })}
      </ul>
    </div>}
  </>;

  if (children) return <div className={styles.panelGrid}>
    <div className={styles.stack}>{children}{results}</div>
    {controls}
  </div>;
  return <div className={styles.stack}>{controls}{results}</div>;
}
