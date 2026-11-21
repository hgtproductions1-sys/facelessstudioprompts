'use client';

import {useId, useState, type FormEvent} from 'react';
import Link from 'next/link';
import CopyButton, {DownloadButton} from '@/components/CopyButton';
import type {FreeToolSlug} from '@/data/freeToolPages';
import {
  buildShortsHooks, compileScriptOutline, durationLabel, HOOK_PATTERNS, PACING_PRESETS,
  pacingForDuration, pacingForScript, SCRIPT_FORMATS, SCRIPT_TONES, type HookPattern, type ScriptFormatId, type ScriptTone,
} from '@/lib/creator-tools';
import {cleanVoiceover} from '@/lib/studio-exports';
import {DEFAULT_OPTIONS} from '@/lib/studioOptions';
import styles from './DedicatedFreeTool.module.css';

export type ToolNiche = {id: string; label: string; cue: string};

function NicheSelect({id, value, onChange, niches}: {
  id: string; value: string; onChange: (value: string) => void; niches: ToolNiche[];
}) {
  return <label htmlFor={id}>Niche
    <select id={id} value={value} onChange={event => onChange(event.target.value)}>
      {niches.map(niche => <option key={niche.id} value={niche.id}>{niche.label}</option>)}
    </select>
  </label>;
}

function ScriptGenerator({niches}: {niches: ToolNiche[]}) {
  const id = useId();
  const [nicheId, setNicheId] = useState(niches[0].id);
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState<ScriptFormatId>('short-45');
  const [tone, setTone] = useState<ScriptTone>('Conversational');
  const [hook, setHook] = useState<HookPattern>('Visual Reveal');
  const [script, setScript] = useState<{
    beats: ReturnType<typeof compileScriptOutline>;
    topic: string;
    nicheId: string;
    format: ScriptFormatId;
    tone: ScriptTone;
    hook: HookPattern;
  } | null>(null);
  const [error, setError] = useState('');
  const [preparing, setPreparing] = useState(false);
  const [masterBrief, setMasterBrief] = useState('');
  const [briefCopied, setBriefCopied] = useState(false);

  function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const premise = topic.trim();
    if (premise.length < 3) {
      setError('Enter a topic with at least three characters.');
      return;
    }
    const nicheCue = niches.find(niche => niche.id === nicheId)?.cue ?? '';
    const beats = compileScriptOutline({topic: premise, tone, format, hook, nicheCue});
    setScript({beats, topic: premise, nicheId, format, tone, hook});
    setMasterBrief('');
    setBriefCopied(false);
    setError('');
  }

  async function prepareMasterBrief() {
    if (!script || preparing) return;
    setPreparing(true);
    setBriefCopied(false);
    setError('');
    try {
      const {compileMasterBrief} = await import('@/lib/blueprint');
      const brief = compileMasterBrief({
        ...DEFAULT_OPTIONS, topic: script.topic, niche: script.nicheId, format: script.format,
        engine: 'Universal',
      });
      const full = [
        brief,
        '',
        'SCRIPT DIRECTION',
        'Narration tone — ' + script.tone,
        'Opening pattern — ' + script.hook,
        'Keep the timed beats below. Adapt any bracketed writing notes and flag factual details that need verification.',
        ...script.beats.map(beat => durationLabel(beat.start) + '–' + durationLabel(beat.end) + ' · ' + beat.label + '\n' + beat.narration),
      ].join('\n');
      setMasterBrief(full);
      try {
        await navigator.clipboard.writeText(full);
        setBriefCopied(true);
      } catch {
        setError('The brief is ready. Select its text below to copy it.');
      }
    } catch {
      setError('The brief could not be prepared. Try again.');
    } finally {
      setPreparing(false);
    }
  }

  const voiceover = script?.beats.map(beat => cleanVoiceover(beat.narration
    .replace(/\[(?:name|give|explain)\b[^\]\n]*\]/gi, '')))
    .filter(Boolean).join('\n\n') ?? '';
  const studioUrl = script ? '/studio?' + new URLSearchParams({
    topic: script.topic, niche: script.nicheId, format: script.format,
  }).toString() : '/studio';

  return <section className="free-tool" aria-label="Script generator">
    <form onSubmit={create}>
      <div className={styles.fields}>
        <NicheSelect id={id + '-niche'} value={nicheId} onChange={setNicheId} niches={niches}/>
        <label htmlFor={id + '-format'}>Format
          <select id={id + '-format'} value={format} onChange={event => setFormat(event.target.value as ScriptFormatId)}>
            {SCRIPT_FORMATS.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label htmlFor={id + '-tone'}>Tone
          <select id={id + '-tone'} value={tone} onChange={event => setTone(event.target.value as ScriptTone)}>
            {SCRIPT_TONES.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label htmlFor={id + '-hook'}>Hook style
          <select id={id + '-hook'} value={hook} onChange={event => setHook(event.target.value as HookPattern)}>
            {HOOK_PATTERNS.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <label htmlFor={id + '-topic'}>Topic</label>
      <input id={id + '-topic'} required minLength={3} maxLength={300} value={topic}
        onChange={event => setTopic(event.target.value)} placeholder="A stick figure shows how a lever lifts a box"/>
      <button type="submit" className="button button-small" disabled={preparing}>Generate script outline</button>
    </form>
    {error && <p role="status" className="notice">{error}</p>}
    {script && <div className={styles.results}>
      <h2>Editable script</h2>
      <p className="muted small">Replace the writing notes in brackets with details you can show or verify.</p>
      {script.beats.map((beat, index) => <div key={beat.start} className={styles.card}>
        <label htmlFor={id + '-beat-' + index}><strong>{beat.label}</strong> <span className="muted small">{durationLabel(beat.start)}–{durationLabel(beat.end)}</span></label>
        <textarea id={id + '-beat-' + index} rows={3} maxLength={3000} value={beat.narration} onChange={event => {
          const narration = event.target.value;
          setScript(current => current && {...current, beats: current.beats.map((item, i) => i === index ? {...item, narration} : item)});
          setMasterBrief('');
          setBriefCopied(false);
        }}/>
        {beat.note && <p className="muted small">{beat.note}</p>}
      </div>)}
      <div className="button-row">
        <CopyButton text={voiceover} label="Copy Voiceover Only"/>
        <DownloadButton text={voiceover} filename="faceless-video-voiceover.txt" label="Download voiceover (.txt)" mime="text/plain;charset=utf-8"/>
        <button type="button" className="copy-button" disabled={preparing} aria-live="polite" onClick={() => void prepareMasterBrief()}>
          {preparing ? 'Preparing Master AI Brief…' : briefCopied ? 'Master AI Brief copied' : 'Copy Master AI Brief'}
        </button>
      </div>
      {masterBrief && <details className={styles.card} open>
        <summary>Master AI Brief</summary>
        <pre className="prompt-full">{masterBrief}</pre>
      </details>}
      <Link className="text-link" href={studioUrl}>Expand into Full Visual Storyboard in Studio ↗</Link>
    </div>}
  </section>;
}

function HookGenerator({niches}: {niches: ToolNiche[]}) {
  const id = useId();
  const [nicheId, setNicheId] = useState(niches[0].id);
  const [topic, setTopic] = useState('');
  const [pattern, setPattern] = useState<HookPattern>('Visual Reveal');
  const [hooks, setHooks] = useState<ReturnType<typeof buildShortsHooks>>([]);
  const [notice, setNotice] = useState('');

  function build(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const niche = niches.find(item => item.id === nicheId);
    const next = buildShortsHooks(topic, pattern, niche?.cue ?? '');
    setHooks(next);
    setNotice(next.length ? next.length + ' editable openings for “' + topic.trim() + '”.' : 'Enter a topic with at least three characters.');
  }

  function changeHook(id: number, field: 'line' | 'visual', value: string) {
    setHooks(current => current.map(item => item.id === id ? {...item, [field]: value} : item));
  }

  return <section className="free-tool" aria-label="Shorts hook generator">
    <form onSubmit={build}>
      <div className={styles.fields}>
        <NicheSelect id={id + '-niche'} value={nicheId} onChange={setNicheId} niches={niches}/>
        <label htmlFor={id + '-pattern'}>Hook pattern
          <select id={id + '-pattern'} value={pattern} onChange={event => setPattern(event.target.value as HookPattern)}>
            {HOOK_PATTERNS.map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <label htmlFor={id + '-topic'}>Core curiosity gap or topic</label>
      <input id={id + '-topic'} value={topic} onChange={event => setTopic(event.target.value)} required minLength={3} maxLength={300}
        placeholder="A paper hinge holds a surprising amount of weight"/>
      <button type="submit" className="button button-small">Generate eight hooks</button>
    </form>
    <p role="status" className="muted small">{notice}</p>
    {hooks.length > 0 && <div className={styles.results}>
      <h2>Opening lines and first shots</h2>
      {hooks.map(item => <article className={styles.card} key={item.id}>
        <h3>Opening {item.id}</h3>
        <label>Hook line
          <textarea rows={2} maxLength={300} value={item.line} onChange={event => changeHook(item.id, 'line', event.target.value)}/>
        </label>
        <label>First-two-second visual direction
          <textarea rows={3} maxLength={900} value={item.visual} onChange={event => changeHook(item.id, 'visual', event.target.value)}/>
        </label>
        <CopyButton text={item.line.trim() + '\n\n' + item.visual.trim()} label="Copy opening and visual"/>
      </article>)}
    </div>}
  </section>;
}

function VoiceoverCalculator() {
  const id = useId();
  const [mode, setMode] = useState<'script' | 'duration'>('script');
  const [script, setScript] = useState('');
  const [rate, setRate] = useState(160);
  const [seconds, setSeconds] = useState('45');
  const validDuration = seconds.trim() !== '' && Number(seconds) >= 1 && Number(seconds) <= 14400;
  const speech = pacingForScript(script, rate);
  const budget = pacingForDuration(validDuration ? Number(seconds) : 0, rate);

  return <section className="free-tool" aria-label="Voiceover calculator">
    <fieldset className={styles.mode}>
      <legend>Calculate from</legend>
      <label><input type="radio" name={id + '-mode'} checked={mode === 'script'} onChange={() => setMode('script')}/> Script text</label>
      <label><input type="radio" name={id + '-mode'} checked={mode === 'duration'} onChange={() => setMode('duration')}/> Target video length</label>
    </fieldset>
    {mode === 'script' ? <label htmlFor={id + '-script'}>Narration script
      <textarea id={id + '-script'} value={script} onChange={event => setScript(event.target.value)}
        placeholder="Paste the words your narrator will read…" rows={6} maxLength={50000}/>
    </label> : <label htmlFor={id + '-duration'}>Target length in seconds
      <input id={id + '-duration'} type="number" min={1} max={14400} step={1} value={seconds}
        onChange={event => setSeconds(event.target.value)}/>
    </label>}
    <label htmlFor={id + '-pace'}>Pace preset
      <select id={id + '-pace'} value={PACING_PRESETS.some(item => item.wpm === rate) ? rate : 'custom'}
        onChange={event => { if (event.target.value !== 'custom') setRate(Number(event.target.value)); }}>
        {PACING_PRESETS.map(pace => <option key={pace.wpm} value={pace.wpm}>{pace.label} · {pace.wpm} WPM</option>)}
        <option value="custom" disabled>Custom pace</option>
      </select>
    </label>
    <label htmlFor={id + '-range'}>Speaking pace · {rate} words per minute</label>
    <input id={id + '-range'} type="range" min={75} max={240} step={1} value={rate}
      onChange={event => setRate(Number(event.target.value))}/>
    <div className="read-time-output" aria-live="polite">
      {mode === 'script' ? <>
        <div><strong>{speech.words}</strong><span>words</span></div>
        <div><strong>{durationLabel(speech.seconds)}</strong><span>estimated speaking time</span></div>
      </> : <>
        <div><strong>{validDuration ? budget.words : '—'}</strong><span>estimated word budget</span></div>
        <div><strong>{validDuration ? budget.cuts.join('–') : '—'}</strong><span>suggested visual beats</span></div>
      </>}
    </div>
    <p className={styles.resultNote}>Record a short sample at your intended pace to account for pauses and delivery.</p>
  </section>;
}

export default function DedicatedFreeTool({slug, niches}: {slug: FreeToolSlug; niches: ToolNiche[]}) {
  if (slug === 'faceless-video-script-generator') return <ScriptGenerator niches={niches}/>;
  if (slug === 'youtube-shorts-hook-generator') return <HookGenerator niches={niches}/>;
  return <VoiceoverCalculator/>;
}
