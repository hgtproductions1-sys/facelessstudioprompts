'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { AudioLines, ExternalLink, FileSearch, Fingerprint, Search } from 'lucide-react';
import { createRecognitionExcerpts, probeMedia, type MediaInfo } from '@/lib/distrokid-media';
import { isAudible, readExcerpt, similarWaveforms } from './reference';
import { Dropzone, Notice, clock, errorMessage, maxSeconds, validateFiles, wasCancelled, type RunMedia } from './shared';
import styles from './studio.module.css';

type Track = { title: string; artist: string; album?: string; releaseDate?: string; link?: string; isrc?: string };
type Sample = { offset: number; duration: number; status: 'match' | 'no_match' | 'unavailable' | 'silent'; track?: Track; message?: string };
type LoadedFile = { file: File; info: MediaInfo };
type Mode = 'scan' | 'lookup' | 'compare';
const api = '/api/distrokid-studio/';
const registry = 'https://ifpi-isrc.soundexchange.com/';
const labels: Record<string, string> = { title: 'Title', artist: 'Artist', album: 'Album', isrc: 'ISRC', copyright: 'Copyright notice', license: 'License text', publisher: 'Publisher' };

function normalizeIsrc(value: string) {
  return value.replace(/[\s-]/g, '').toUpperCase();
}

function validIsrc(value: string) {
  return /^[A-Z]{2}[A-Z0-9]{3}\d{7}$/.test(normalizeIsrc(value));
}

function TrackDetails({ track }: { track: Track }) {
  return <div className={styles.trackSummary}>
    <strong>{track.title}</strong>
    <p>{[track.artist, track.album, track.isrc].filter(Boolean).join(' · ')}</p>
    {track.link && /^https:\/\//.test(track.link) && <a className={styles.inlineLink} href={track.link} target="_blank" rel="noreferrer">Open catalog entry <ExternalLink size={14} /></a>}
  </div>;
}

export default function CopyrightCheck({ busy, run }: { busy: boolean; run: RunMedia }) {
  const [mode, setMode] = useState<Mode>('scan');
  const [available, setAvailable] = useState<boolean>();
  const [source, setSource] = useState<LoadedFile>();
  const [reference, setReference] = useState<LoadedFile>();
  const [consent, setConsent] = useState(false);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [sampleTotal, setSampleTotal] = useState(0);
  const [comparison, setComparison] = useState<string>();
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [isrc, setIsrc] = useState('');
  const [looking, setLooking] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [tracks, setTracks] = useState<Track[]>();

  useEffect(() => {
    const controller = new AbortController();
    fetch(api + 'recognize', { signal: controller.signal, cache: 'no-store' })
      .then(async response => await response.json() as { available?: boolean })
      .then(result => setAvailable(Boolean(result.available)))
      .catch(problem => { if (!wasCancelled(problem)) setAvailable(false); });
    return () => controller.abort();
  }, []);

  async function load(file: File | undefined, second = false) {
    if (!file) return;
    const invalid = validateFiles([file]);
    setError(invalid);
    if (invalid) return;
    setComparison(undefined);
    if (second) setReference(undefined);
    else {
      setSource(undefined);
      setSamples([]);
      setSampleTotal(0);
      setConsent(false);
    }
    try {
      await run('Reading file information', async signal => {
        const info = await probeMedia(file, signal);
        signal.throwIfAborted();
        if (!info.hasAudio) throw new Error('This file has no audio track.');
        if (info.duration > maxSeconds) throw new Error('Choose a file that is 10 minutes or shorter.');
        if (second) setReference({ file, info });
        else setSource({ file, info });
      });
    } catch (problem) {
      if (!wasCancelled(problem)) setError(errorMessage(problem));
    }
  }

  async function recognize() {
    if (!source || !consent || !available) return;
    setSamples([]);
    setSampleTotal(0);
    setError('');
    try {
      await run('Checking sampled audio', async signal => {
        const excerpts = await createRecognitionExcerpts(source.file, source.info.duration, signal);
        signal.throwIfAborted();
        setSampleTotal(excerpts.length);
        for (const excerpt of excerpts) {
          signal.throwIfAborted();
          const { duration, samples: pcm } = await readExcerpt(excerpt.blob);
          const base = { offset: excerpt.offset, duration };
          if (!isAudible(pcm)) {
            setSamples(current => [...current, { ...base, status: 'silent' }]);
            continue;
          }
          const body = new FormData();
          body.append('sample', excerpt.blob, 'sample.wav');
          try {
            const response = await fetch(api + 'recognize', { method: 'POST', body, signal });
            const result = await response.json() as { status: string; track?: Track; message?: string };
            if (response.ok && result.status === 'match' && result.track) {
              setSamples(current => [...current, { ...base, status: 'match', track: result.track }]);
            } else if (response.ok && result.status === 'no_match') {
              setSamples(current => [...current, { ...base, status: 'no_match' }]);
            } else {
              setSamples(current => [...current, { ...base, status: 'unavailable', message: result.message ?? 'The catalog could not check this excerpt.' }]);
              if (response.status === 429 || result.status === 'unavailable') break;
            }
          } catch (problem) {
            if (signal.aborted) throw problem;
            setSamples(current => [...current, { ...base, status: 'unavailable', message: 'The recognition service did not respond.' }]);
            break;
          }
        }
      });
    } catch (problem) {
      if (!wasCancelled(problem)) setError(errorMessage(problem));
    }
  }

  async function lookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() && !artist.trim()) return;
    setLooking(true);
    setLookupError('');
    setTracks(undefined);
    try {
      const query = new URLSearchParams({ title: title.trim(), artist: artist.trim() });
      const response = await fetch(api + 'lookup?' + query.toString(), { cache: 'no-store' });
      const result = await response.json() as { tracks?: Track[]; message?: string };
      if (!response.ok || !result.tracks) throw new Error(result.message ?? 'The catalog search is temporarily unavailable.');
      setTracks(result.tracks);
    } catch (problem) {
      setLookupError(errorMessage(problem));
    } finally {
      setLooking(false);
    }
  }

  async function compare() {
    if (!source || !reference) return;
    setError('');
    setComparison(undefined);
    try {
      await run('Comparing audio files', async signal => {
        const first = await createRecognitionExcerpts(source.file, source.info.duration, signal);
        signal.throwIfAborted();
        const second = await createRecognitionExcerpts(reference.file, reference.info.duration, signal);
        signal.throwIfAborted();
        const decode = (excerpts: typeof first) => Promise.all(excerpts.map(async excerpt => (await readExcerpt(excerpt.blob)).samples));
        const [a, b] = await Promise.all([decode(first), decode(second)]);
        signal.throwIfAborted();
        if (!a.some(isAudible) || !b.some(isAudible)) {
          setComparison('One or both files had no audible signal in the sampled sections.');
        } else {
          setComparison(a.some(left => b.some(right => similarWaveforms(left, right)))
            ? 'Similar waveform found in the sampled sections.'
            : 'No strong waveform similarity found in the sampled sections.');
        }
      });
    } catch (problem) {
      if (!wasCancelled(problem)) setError(errorMessage(problem));
    }
  }

  const matches = samples.filter(sample => sample.status === 'match' || sample.status === 'no_match');
  const metadata = source && Object.entries(labels).flatMap(([tag, label]) => {
    const value = source.info.tags[tag];
    return value ? [{ tag, label, value }] : [];
  });

  return (
    <div className={styles.stack}>
      <div className={styles.segment} aria-label="Copyright check modes">
        <button aria-pressed={mode === 'scan'} onClick={() => setMode('scan')}><FileSearch size={17} /> File scan</button>
        <button aria-pressed={mode === 'lookup'} onClick={() => setMode('lookup')}><Search size={17} /> Registry lookup</button>
        <button aria-pressed={mode === 'compare'} onClick={() => setMode('compare')}><AudioLines size={17} /> Reference compare</button>
      </div>
      {mode === 'scan' && <div className={styles.panelGrid}>
        <div className={styles.stack}>
          <Dropzone onFiles={files => void load(files[0])} title="Audio or video to check" compact={Boolean(source)}
            hint="Inspect file details and scan for possible recording matches." disabled={busy} />
          {error && <Notice danger>{error}</Notice>}
          {source && <div className={styles.track}>
            <div className={styles.trackHeading}><span><strong>{source.file.name}</strong><small>{clock(source.info.duration)} · {source.info.codec.toUpperCase()} · {source.info.channels} ch</small></span></div>
            {metadata?.length ? <dl className={styles.metadata}>
              {metadata.map(({ tag, label, value }) => <div key={tag}><dt>{label}</dt><dd>{value}{tag === 'isrc' && (validIsrc(value) ? ' · Valid format' : ' · Unrecognized format')}</dd></div>)}
            </dl> : <p className={styles.muted}>No title, rights, or release tags were found in this file.</p>}
          </div>}
          {sampleTotal > 0 && <div className={styles.track}>
            <h3>Catalog results</h3>
            <p className={styles.muted}>{matches.length} of {sampleTotal} excerpts checked. {samples.some(sample => sample.status === 'match') ? 'Recording match found.' : matches.length ? 'No match in checked excerpts. The result is inconclusive.' : 'The scan has no completed catalog checks.'}</p>
            {samples.map(sample => <div key={sample.offset} className={styles.sample}>
              <span className={styles.timestamp}>{clock(sample.offset)}–{clock(sample.offset + sample.duration)}</span>
              {sample.track ? <TrackDetails track={sample.track} /> : <p>{sample.status === 'silent' ? 'Silent excerpt skipped.' : sample.message ?? 'No catalog match'}</p>}
            </div>)}
          </div>}
        </div>
        <aside className={styles.settings}>
          <h3>Live recognition</h3>
          <p className={styles.muted}>AudD compares short excerpts from your file against its recording catalog.</p>
          {available === false && <Notice>Live recognition is currently unavailable. File scan and registry lookup are available.</Notice>}
          {available === true && <>
            <label className={styles.check}><input type="checkbox" checked={consent} disabled={!source || busy}
              onChange={event => setConsent(event.target.checked)} /> Send up to three 12-second audio excerpts to AudD.</label>
            <a className={styles.inlineLink} href="https://audd.io/privacy/index.php" target="_blank" rel="noreferrer">AudD privacy policy <ExternalLink size={14} /></a>
            <button className={styles.primary} disabled={!source || !consent || busy} onClick={() => void recognize()}><Fingerprint size={17} /> Check catalog</button>
          </>}
          {available === undefined && <p className={styles.muted}>Checking service availability…</p>}
          <p className={styles.muted}>Use the results to investigate recording rights. Clearance requires confirmation from the rights holder.</p>
        </aside>
      </div>}
      {mode === 'lookup' && <div className={styles.panelGrid}>
        <div className={styles.stack}>
          <form className={styles.track} onSubmit={event => void lookup(event)}>
            <h3>Find a recording</h3>
            <div className={styles.fieldRow}>
              <label>Track title<input value={title} maxLength={120} placeholder="Track name" disabled={looking} onChange={event => setTitle(event.target.value)} /></label>
              <label>Artist<input value={artist} maxLength={120} placeholder="Artist name" disabled={looking} onChange={event => setArtist(event.target.value)} /></label>
            </div>
            <div className={styles.actions}>
              <button className={styles.primary} disabled={looking || (!title.trim() && !artist.trim())}><Search size={16} /> {looking ? 'Searching…' : 'Search catalog'}</button>
              {source && (source.info.tags.title || source.info.tags.artist) && <button type="button" className={styles.secondary} disabled={looking} onClick={() => {
                setTitle(source.info.tags.title ?? '');
                setArtist(source.info.tags.artist ?? '');
                setTracks(undefined);
              }}>Use file tags</button>}
            </div>
          </form>
          {lookupError && <Notice danger>{lookupError}</Notice>}
          {tracks && (tracks.length ? <ul className={styles.trackList}>{tracks.map((track, i) => <li key={i} className={styles.track}><TrackDetails track={track} /></li>)}</ul>
            : <Notice>No catalog results for this search. Try a different title or artist spelling.</Notice>)}
        </div>
        <aside className={styles.settings}>
          <h3>Check an ISRC</h3>
          <label>Recording code<input value={isrc} maxLength={24} placeholder="US-XXX-26-00001" onChange={event => setIsrc(event.target.value)} /></label>
          {isrc.trim() && <p className={styles.muted} role="status">{validIsrc(isrc) ? 'Valid format · ' + normalizeIsrc(isrc) : 'Enter the 12-character code from your recording.'}</p>}
          <a className={styles.secondary} href={registry} target="_blank" rel="noreferrer">Open public ISRC search <ExternalLink size={15} /></a>
          <p className={styles.muted}>A valid code format is a starting point. Check the registry for the corresponding recording.</p>
        </aside>
      </div>}
      {mode === 'compare' && <div className={styles.panelGrid}>
        <div className={styles.stack}>
          <Dropzone onFiles={files => void load(files[0])} title="Audio to check" compact={Boolean(source)}
            hint={source?.file.name ?? 'Choose your audio or video file.'} disabled={busy} />
          <Dropzone onFiles={files => void load(files[0], true)} title="Reference recording"
            hint={reference?.file.name ?? 'Choose the recording you want to compare against.'} compact={Boolean(reference)} disabled={busy} />
          {error && <Notice danger>{error}</Notice>}
          {comparison && <Notice>{comparison}</Notice>}
        </div>
        <aside className={styles.settings}>
          <h3>Compare files</h3>
          <p className={styles.muted}>The studio samples both files on this device and looks for similar waveforms. Edits, remixes, and tempo changes can reduce similarity.</p>
          <button className={styles.primary} disabled={!source || !reference || busy} onClick={() => void compare()}><AudioLines size={17} /> Compare audio</button>
        </aside>
      </div>}
    </div>
  );
}
