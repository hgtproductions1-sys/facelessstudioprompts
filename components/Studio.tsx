'use client';

import Link from 'next/link';
import {useEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent} from 'react';
import {ArrowUpRight, Check, Clapperboard, Film, LoaderCircle, RefreshCw, Sparkles} from 'lucide-react';
import CopyButton, {DownloadButton} from '@/components/CopyButton';
import StudioProductionKit from '@/components/StudioProductionKit';
import {responsiveImage} from '@/lib/images';
import {DEFAULT_OPTIONS, ENGINES, STYLES, FORMATS, parseStudioDraft, type Options, type Blueprint} from '@/lib/studioOptions';
import {formatShot, exportBlueprint} from '@/lib/blueprintFormat';
import {
  STUDIO_BACKUP_LIMIT, blueprintVoiceover, defaultVisualExportModel, parseStudioProject, type VisualExportModel,
} from '@/lib/studio-exports';

const tabs = [
  {id: 'shots', label: 'Shot list'},
  {id: 'script', label: 'Narration'},
  {id: 'continuity', label: 'Continuity'},
  {id: 'packaging', label: 'Thumbnail & edit'},
] as const;

type DraftMode = 'template' | 'brief' | 'ai';
type Output = {kind: 'brief'; text: string} | {kind: 'blueprint'; blueprint: Blueprint; options: Options};
type Props = {
  nicheOptions: {id: string; title: string}[];
  aiAvailable: boolean;
  initialTopic?: string;
  initialNiche?: string;
  initialFormat?: string;
  initialEngine?: string;
  initialStyle?: string;
  journey?: string;
};

const modes = [
  {id: 'template', title: 'Instant Blueprint', description: 'Build a shot list, hook, narration outline, visual prompts, and editing checklist in your browser.'},
  {id: 'brief', title: 'Master AI Brief', description: 'Turn your topic, niche, pacing, and visual style into one prompt for ChatGPT, Claude, or Gemini.'},
  {id: 'ai', title: 'Live AI draft', description: 'Ask the connected AI service for a draft tailored to your idea. Two requests every 24 hours.'},
] as const;

const buttonLabels = {template: 'Create Instant Blueprint', brief: 'Prepare Master AI Brief', ai: 'Create live AI draft'};

export default function Studio({
  nicheOptions, aiAvailable, initialTopic, initialNiche, initialFormat, initialEngine, initialStyle, journey,
}: Props) {
  const [options, setOptions] = useState<Options>({
    ...DEFAULT_OPTIONS,
    topic: initialTopic || DEFAULT_OPTIONS.topic,
    niche: nicheOptions.find(item => item.id === initialNiche)?.id ?? DEFAULT_OPTIONS.niche,
    format: FORMATS.find(format => format.id === initialFormat)?.id ?? DEFAULT_OPTIONS.format,
    engine: ENGINES.find(engine => engine === initialEngine) ?? DEFAULT_OPTIONS.engine,
    style: STYLES.find(style => style === initialStyle) ?? DEFAULT_OPTIONS.style,
  });
  const [mode, setMode] = useState<DraftMode>('template');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [output, setOutput] = useState<Output | null>(null);
  const [narration, setNarration] = useState('');
  const [visualModel, setVisualModel] = useState<VisualExportModel>('Veo 3');
  const [tab, setTab] = useState<typeof tabs[number]['id']>('shots');
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLInputElement>(null);

  // Browser storage is read only after hydration.
  /* eslint-disable react-hooks/set-state-in-effect -- Restore the saved brief and report browser storage failures. */
  useEffect(() => {
    if (!initialTopic && !initialNiche && !initialFormat && !initialEngine && !initialStyle) {
      try {
        const saved = JSON.parse(localStorage.getItem('fp-studio-draft') || 'null');
        const draft = parseStudioDraft(saved, nicheOptions.map(niche => niche.id));
        if (draft) setOptions(draft);
      } catch {}
    }
    setReady(true);
  }, [initialTopic, initialNiche, initialFormat, initialEngine, initialStyle, nicheOptions]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem('fp-studio-draft', JSON.stringify(options));
    } catch {
      setStorageNotice('Draft changes will last for this visit. Browser storage is unavailable.');
    }
  }, [options, ready]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!output) return;
    const timer = setTimeout(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      resultRef.current?.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block: 'start'});
    }, 80);
    return () => clearTimeout(timer);
  }, [output]);

  function change(key: keyof Options, value: string) {
    setOptions(current => ({...current, [key]: value}));
  }

  function selectMode(next: DraftMode) {
    setMode(next);
    setError('');
  }

  function showBlueprint(blueprint: Blueprint, sourceOptions: Options) {
    setOutput({kind: 'blueprint', blueprint, options: sourceOptions});
    setNarration(blueprintVoiceover(blueprint));
    setVisualModel(defaultVisualExportModel(sourceOptions.engine));
  }

  async function importDraft(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];
    input.value = '';
    if (!file || busy) return;

    setBusy(true);
    try {
      if (file.size > STUDIO_BACKUP_LIMIT) throw new Error('Choose a Studio backup no larger than 2 MB.');
      const project = parseStudioProject(JSON.parse(await file.text()), nicheOptions.map(niche => niche.id));
      if (!project) throw new Error('This Studio backup has invalid project data or settings.');
      setOptions(project.options);
      if (project.blueprint) {
        showBlueprint(project.blueprint, project.options);
        setNarration(project.narration ?? blueprintVoiceover(project.blueprint));
        setVisualModel(project.visualModel ?? defaultVisualExportModel(project.options.engine));
      } else {
        setOutput(null);
      }
      selectMode('template');
      setTab('shots');
      setStorageNotice(project.blueprint ? 'Restored your blueprint and export settings.' : 'Imported your creative brief. Create a blueprint when you are ready.');
    } catch (cause) {
      setStorageNotice(cause instanceof Error ? cause.message : 'The draft could not be imported.');
    } finally {
      setBusy(false);
    }
  }

  async function prepare(next: DraftMode) {
    if (busy) return;
    selectMode(next);
    const topic = options.topic.trim();
    if (topic.length < 3 || topic.length > 300) {
      setError('Enter a topic between 3 and 300 characters.');
      return;
    }

    setBusy(true);
    const briefOptions = {...options, topic};
    try {
      if (next === 'ai') {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({...briefOptions, mode: 'ai'}),
          signal: AbortSignal.timeout(130000),
        });
        const data = await response.json() as Blueprint & {error?: string};
        if (!response.ok) throw new Error(data.error || 'The live AI draft could not be created.');
        if (!Array.isArray(data.shots) || !Array.isArray(data.editing) || !data.topic || !data.character) {
          throw new Error('The live AI draft was incomplete.');
        }
        showBlueprint(data, briefOptions);
      } else {
        const {buildTemplate, compileMasterBrief} = await import('@/lib/blueprint');
        if (next === 'brief') setOutput({kind: 'brief', text: compileMasterBrief(briefOptions)});
        else showBlueprint(buildTemplate(briefOptions), briefOptions);
      }
      setTab('shots');
    } catch (cause) {
      if (cause instanceof Error && ['AbortError', 'TimeoutError'].includes(cause.name)) {
        setError('The AI service took too long. Your topic and settings are still here.');
      } else {
        setError(cause instanceof Error ? cause.message : 'The draft could not be created.');
      }
    } finally {
      setBusy(false);
    }
  }

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void prepare(mode);
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const active = tabs.findIndex(item => item.id === tab);
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? tabs.length - 1
      : (active + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setTab(tabs[next].id);
    document.getElementById('tab-' + tabs[next].id)?.focus();
  }

  const activeBlueprint = output?.kind === 'blueprint' ? output : null;
  const result = activeBlueprint?.blueprint;
  const plan = result ? exportBlueprint(result, options.engine) : '';
  const backup = JSON.stringify({type: 'faceless-studio-draft', version: 1, options}, null, 2);

  return (
    <div className="studio-layout">
      <form onSubmit={generate} className="studio-form">
        {journey && <div className="journey-studio-note">
          <p>You brought your first-video brief into the Studio.</p>
          <Link className="inline-link" href="/start-here">Return to your checklist ↗</Link>
        </div>}
        <div className="studio-form-head">
          <span className="icon-square"><Clapperboard size={21}/></span>
          <div><h2>Your creative brief</h2><p>Choose your topic, format, and starting point.</p></div>
        </div>
        <fieldset>
          <legend><span>01</span>What’s the idea?</legend>
          <label htmlFor="studio-topic" className="field-label">Topic or story premise</label>
          <textarea id="studio-topic" required minLength={3} maxLength={300} rows={3} value={options.topic}
            onChange={event => change('topic', event.target.value)} placeholder="Be specific about who, what happens, and where."/>
          <div className="field-hint"><span>A specific idea gives you a clearer draft.</span><span>{options.topic.length}/300</span></div>
          <label htmlFor="studio-niche" className="field-label">Creative niche</label>
          <select id="studio-niche" value={options.niche} onChange={event => change('niche', event.target.value)}>
            {nicheOptions.map(niche => <option key={niche.id} value={niche.id}>{niche.title}</option>)}
          </select>
          <Link className="field-link" href={'/niches/' + options.niche}>Explore this niche <ArrowUpRight size={12}/></Link>
        </fieldset>
        <fieldset>
          <legend><span>02</span>Choose the format</legend>
          <label htmlFor="studio-format" className="field-label">Video length & layout</label>
          <select id="studio-format" value={options.format} onChange={event => change('format', event.target.value)}>
            {FORMATS.map(format => <option key={format.id} value={format.id}>{format.label} · {format.ratio}</option>)}
          </select>
          <div className="form-two">
            <label className="field-label" htmlFor="studio-engine">Prompt destination
              <select id="studio-engine" value={options.engine} onChange={event => change('engine', event.target.value)}>
                {ENGINES.map(engine => <option key={engine}>{engine}</option>)}
              </select>
            </label>
            <label className="field-label" htmlFor="studio-style">Visual direction
              <select id="studio-style" value={options.style} onChange={event => change('style', event.target.value)}>
                {STYLES.map(style => <option key={style}>{style}</option>)}
              </select>
            </label>
          </div>
        </fieldset>
        <fieldset disabled={busy}>
          <legend><span>03</span>Choose your starting point</legend>
          <div className="mode-options">
            {modes.filter(item => item.id !== 'ai' || aiAvailable).map(item => (
              <label key={item.id} className={mode === item.id ? 'selected' : undefined}>
                <input type="radio" name="draft-mode" value={item.id} checked={mode === item.id}
                  onChange={() => selectMode(item.id)}/>
                <div><strong>{item.title}</strong><span>{item.description}</span></div>
              </label>
            ))}
          </div>
        </fieldset>
        {error && <div className="error-message">
          <p role="alert">{error}</p>
          {mode === 'ai' && <div className="button-row">
            <button type="button" className="copy-button" onClick={() => void prepare('template')}>Create Instant Blueprint</button>
            <button type="button" className="copy-button" onClick={() => void prepare('brief')}>Prepare Master AI Brief</button>
          </div>}
        </div>}
        {storageNotice && <p className="notice" role="status">{storageNotice}</p>}
        <button className="button studio-submit" disabled={busy} type="submit">
          {busy
            ? <><LoaderCircle size={18} className="spin"/>Preparing your draft…</>
            : <><Sparkles size={18}/>{buttonLabels[mode]} <ArrowUpRight size={17}/></>}
        </button>
        <p className="studio-footnote">Take your plan into your image, video, and editing tools.</p>
        <details className="draft-transfer">
          <summary>Keep or move your creative brief</summary>
          <p className="muted small">Download your project file to pick up later or continue on another device.</p>
          <div className="button-row">
            <DownloadButton text={backup} filename="faceless-studio-draft.json" label="Export draft" mime="application/json"/>
            <button type="button" className="copy-button" disabled={busy} onClick={() => importRef.current?.click()}>Import draft</button>
          </div>
          <input type="file" className="sr-only" tabIndex={-1} accept="application/json,.json" ref={importRef}
            onChange={importDraft} aria-label="Import Studio creative brief"/>
        </details>
      </form>
      <div className="studio-output" ref={resultRef}>
        {output?.kind === 'brief' ? <div className="output-head">
          <h2>Your Master AI Brief</h2>
          <div className="output-actions">
            <CopyButton text={output.text} label="Copy Master Brief"/>
            <button type="button" className="copy-button" disabled={busy} onClick={() => void prepare('template')}>
              Also generate Instant Blueprint
            </button>
          </div>
          <pre className="shot-prompt">{output.text}</pre>
          <ol className="basic-list">
            <li>Copy the brief.</li>
            <li>Paste it into ChatGPT, Claude, or Gemini.</li>
            <li>Return to Studio or the <Link className="inline-link" href="/prompts">Prompt Library</Link> to refine individual shots.</li>
          </ol>
        </div> : activeBlueprint && result ? <>
          <div className="output-head">
            <p className="eyebrow"><Check size={12}/>Your starting point is ready</p>
            <h2>{result.topic}</h2>
            <p>{result.niche} · {FORMATS.find(format => format.id === result.format)?.label} · {result.source === 'ai' ? 'Live AI draft' : 'Instant Blueprint'}</p>
            <div className="output-actions">
              <CopyButton text={plan} label="Copy plan"/>
              <DownloadButton text={plan}/>
            </div>
            <StudioProductionKit blueprint={result} options={activeBlueprint.options}
              narration={narration} onNarrationChange={setNarration} model={visualModel} onModelChange={setVisualModel}/>
          </div>
          <div className="result-tabs" role="tablist" aria-label="Blueprint sections">
            {tabs.map(item => <button key={item.id} role="tab" aria-selected={tab === item.id}
              aria-controls={'panel-' + item.id} id={'tab-' + item.id} tabIndex={tab === item.id ? 0 : -1}
              onKeyDown={navigateTabs} onClick={() => setTab(item.id)}>{item.label}</button>)}
          </div>
          <div role="tabpanel" id={'panel-' + tab} aria-labelledby={'tab-' + tab}>
            {tab === 'shots' && <>
              <div className="hook-card"><span className="eyebrow">Opening hook</span><p>{result.hook}</p></div>
              <p className="muted small output-note">Story beats cover the full video. Generate shorter clips to fill each beat, then edit them together.</p>
              {result.shots.map((shot, index) => <div className="shot-card" key={index}>
                <div className="shot-card-head">
                  <span className="shot-index">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{shot.title}</h3><span>{shot.time}</span></div>
                  <CopyButton text={formatShot(shot, result, options.engine)}/>
                </div>
                <pre className="shot-prompt">{formatShot(shot, result, options.engine)}</pre>
                <p className="shot-narration"><strong>Narration</strong> {shot.narration}</p>
              </div>)}
            </>}
            {tab === 'script' && <>
              <div className="hook-card"><span className="eyebrow">Start with the promise</span><p>{result.hook}</p></div>
              <CopyButton text={result.shots.map(shot => shot.narration).join('\n\n')} label="Copy narration draft"/>
              {result.shots.map((shot, index) => <div className="script-row" key={index}>
                <span>{shot.time}</span><h3>{shot.title}</h3><p>{shot.narration}</p>
              </div>)}
              <p className="notice">Adjust the narration to your footage and speaking speed.</p>
              <Link className="text-link" href="/free-tools#read-time">Check narration time ↗</Link>
            </>}
            {tab === 'continuity' && <>
              <h3 className="output-section-title">Keep the subject recognizable</h3>
              <pre className="prompt-full">{result.character}</pre>
              <CopyButton text={result.character} label="Copy continuity notes"/>
              <ul className="basic-list">
                <li>Use the same approved reference image when your tool supports it.</li>
                <li>Keep defining shapes, markings, clothes, and materials stable.</li>
                <li>Review adjacent shots together so changes are easier to spot.</li>
              </ul>
              <Link href="/guides/consistent-ai-characters" className="text-link">Read the character consistency guide ↗</Link>
            </>}
            {tab === 'packaging' && <>
              <h3 className="output-section-title">Thumbnail direction</h3>
              <pre className="prompt-full">{result.thumbnail}</pre>
              <CopyButton text={result.thumbnail} label="Copy thumbnail brief"/>
              <h3 className="output-section-title">Editing checklist</h3>
              <ul className="basic-list">{result.editing.map(item => <li key={item}>{item}</li>)}</ul>
            </>}
          </div>
        </> : <div className="output-empty">
          <div className="output-preview">
            <img src="/story-cat.webp" {...responsiveImage('/story-cat.webp', '(max-width: 900px) 100vw, 700px')}
              width="1280" height="720" loading="lazy" decoding="async" alt="Example story illustration of a kitten outside a bakery"/>
            <span className="pill">Example storyboard inspiration</span>
          </div>
          <div className="output-empty-body">
            <span className="icon-square"><Film size={25}/></span>
            <h2>From one idea<br/>to a shot-by-shot plan</h2>
            <p>Your hook, scene prompts, narration direction, and editing checklist will appear here.</p>
            <button className="text-link" type="button" disabled={busy} onClick={() => {
              setOptions(DEFAULT_OPTIONS);
              selectMode('template');
            }}><RefreshCw size={13}/>Load the bakery example</button>
          </div>
        </div>}
      </div>
    </div>
  );
}

