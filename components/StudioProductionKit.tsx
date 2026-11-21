'use client';

import {useId, useMemo} from 'react';
import CopyButton, {DownloadButton} from '@/components/CopyButton';
import {
  VOICEOVER_PACES, VISUAL_EXPORT_MODELS, VOICEOVER_TEXT_LIMIT,
  cleanVoiceover, countSpokenWords, estimatedSpeakingSeconds, exportShotListCsv,
  exportStudioProject, exportVisualBatch, isVisualExportModel, type VisualExportModel,
} from '@/lib/studio-exports';
import type {Blueprint, Options} from '@/lib/studioOptions';
import styles from './StudioProductionKit.module.css';

type Props = {
  blueprint: Blueprint;
  options: Options;
  narration: string;
  onNarrationChange: (narration: string) => void;
  model: VisualExportModel;
  onModelChange: (model: VisualExportModel) => void;
};

function durationLabel(seconds: number) {
  return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
}

export default function StudioProductionKit({blueprint, options, narration, onNarrationChange, model, onModelChange}: Props) {
  const id = useId();
  const voiceover = useMemo(() => cleanVoiceover(narration), [narration]);
  const words = countSpokenWords(voiceover);
  const visualBatch = useMemo(() => exportVisualBatch(blueprint, model), [blueprint, model]);
  const shotList = useMemo(() => exportShotListCsv(blueprint, model), [blueprint, model]);
  const projectBackup = useMemo(
    () => exportStudioProject(options, blueprint, narration, model),
    [options, blueprint, narration, model],
  );

  return <details className={styles.kit}>
    <summary>Export Production Kit</summary>
    <div className={styles.sections}>
      <section className={styles.section} aria-labelledby={id + '-voice-heading'}>
        <h3 id={id + '-voice-heading'}>Voiceover script</h3>
        <label htmlFor={id + '-voice'}>Review or add spoken narration</label>
        <textarea id={id + '-voice'} rows={5} value={narration} maxLength={VOICEOVER_TEXT_LIMIT}
          onChange={event => onNarrationChange(event.target.value)}
          placeholder="Add the words you want the narrator to read."/>
        <p className={styles.timing} aria-live="polite">
          <strong>{words} {words === 1 ? 'word' : 'words'}</strong>
          {VOICEOVER_PACES.map(pace =>
            <span key={pace}>{durationLabel(estimatedSpeakingSeconds(words, pace))} at {pace} WPM</span>,
          )}
        </p>
        {voiceover ? <div className="button-row">
          <DownloadButton text={voiceover} filename="voiceover-script.txt" label="Download voiceover (.txt)" mime="text/plain;charset=utf-8"/>
          <CopyButton text={voiceover} label="Copy voiceover"/>
        </div> : <p className={styles.hint}>Add spoken lines to create a voiceover file.</p>}
      </section>
      <section className={styles.section} aria-labelledby={id + '-visual-heading'}>
        <h3 id={id + '-visual-heading'}>Visual prompts</h3>
        <div className={styles.generator}>
          <label htmlFor={id + '-model'}>Generator</label>
          <select id={id + '-model'} value={model} onChange={event => {
            if (isVisualExportModel(event.target.value)) onModelChange(event.target.value);
          }}>
            {VISUAL_EXPORT_MODELS.map(item => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="button-row">
          <DownloadButton text={visualBatch} filename="visual-prompts.txt" label="Download prompts (.txt)" mime="text/plain;charset=utf-8"/>
          <CopyButton text={visualBatch} label="Copy prompts"/>
        </div>
        <details className={styles.preview}>
          <summary>Preview visual prompts</summary>
          <pre className="shot-prompt">{visualBatch}</pre>
        </details>
      </section>
      <section className={styles.section} aria-labelledby={id + '-handoff-heading'}>
        <h3 id={id + '-handoff-heading'}>Project files</h3>
        <div className="button-row">
          <DownloadButton text={shotList} filename="production-shot-list.csv" label="Download shot list (.csv)" mime="text/csv;charset=utf-8"/>
          <DownloadButton text={projectBackup} filename="faceless-studio-project.json" label="Download backup (.json)" mime="application/json"/>
        </div>
        <p className={styles.hint}>Restore the backup using Import draft in your creative brief.</p>
      </section>
    </div>
  </details>;
}
