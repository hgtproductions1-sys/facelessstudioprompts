'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import CopyButton, { DownloadButton } from '@/components/CopyButton';
import { usePromptVariables } from '@/components/PromptVariablesProvider';
import { fillPrompt, parsePromptVariables, studioPromptHref } from '@/lib/prompt-variables';

type Props = {
  prompt: string;
  promptId: string;
  compact?: boolean;
  niches?: { slug: string; name: string }[];
};

export default function PromptCustomizer({ prompt, promptId, compact = false, niches }: Props) {
  const id = useId();
  const { values, setValue, clear } = usePromptVariables();
  const [previewValues, setPreviewValues] = useState(values);
  const [edited, setEdited] = useState<string | null>(null);
  const { fields, segments } = useMemo(() => parsePromptVariables(prompt, promptId), [prompt, promptId]);
  useEffect(() => {
    const delay = setTimeout(() => setPreviewValues(values), 120);
    return () => clearTimeout(delay);
  }, [values]);
  const filled = fillPrompt(segments, values);
  const result = edited ?? filled;
  const missing = fields.filter(field => !values[field.key]?.trim() && result.includes(field.text)).length;
  const highlight = fields.some(field => previewValues[field.key]?.trim());

  return <div className="customizer">
    {fields.length > 0 && <fieldset className="prompt-variables">
      <legend>Fill placeholders before copying</legend>
      <div className="customizer-fields">
        {fields.map(field => <label key={field.key}>{field.label}
          <input value={values[field.key] ?? ''} maxLength={1000} placeholder={field.text}
            onChange={event => { setValue(field.key, event.target.value); setEdited(null); }}/>
        </label>)}
      </div>
    </fieldset>}
    <pre className="prompt-full" aria-label="Prompt preview">{highlight ? segments.map((segment, index) => {
      if (!segment.key) return segment.text;
      const replacement = previewValues[segment.key]?.trim();
      return replacement
        ? <mark key={index} className="prompt-value">{replacement}</mark>
        : <span key={index} className="prompt-unfilled">{segment.text}</span>;
    }) : prompt}</pre>
    {!compact && <details className="prompt-quick-preview">
      <summary>Edit the full prompt</summary>
      <label htmlFor={id} className="sr-only">Your editable prompt</label>
      <textarea id={id} className="prompt-editor" value={result} onChange={event => setEdited(event.target.value)}
        rows={Math.min(22, Math.max(10, result.split('\n').length))}/>
    </details>}
    {missing > 0 && <p className="muted small" aria-live="polite">{missing} {missing === 1 ? 'placeholder still unfilled' : 'placeholders still unfilled'}</p>}
    <div className="article-actions">
      <CopyButton text={result} label="Copy filled prompt"/>
      <CopyButton text={prompt} label="Copy raw template"/>
      {!compact && <DownloadButton text={result} filename="faceless-prompt.md"/>}
      {!!Object.keys(values).length && <button type="button" className="filter-chip" onClick={() => { clear(); setEdited(null); }}>Clear saved inputs</button>}
      {edited !== null && <button type="button" className="filter-chip" onClick={() => setEdited(null)}>Reset draft edits</button>}
      {niches && <a className="text-link" href={studioPromptHref(values, niches)}>Send to Studio ↗</a>}
    </div>
  </div>;
}

export function PromptVariableDrawer({ prompt, promptId }: Pick<Props, 'prompt' | 'promptId'>) {
  const [open, setOpen] = useState(false);
  return <details className="prompt-quick-preview" onToggle={event => setOpen(event.currentTarget.open)}>
    <summary>Preview and fill template</summary>
    {open ? <PromptCustomizer prompt={prompt} promptId={promptId} compact/> : <pre>{prompt}</pre>}
  </details>;
}
