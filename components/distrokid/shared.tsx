'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { FileAudio, Upload } from 'lucide-react';
import { AUDIO_FORMATS, MAX_BATCH_BYTES, MAX_MEDIA_BYTES, MAX_MEDIA_DURATION, MAX_MEDIA_FILES, type AudioFormat, type Bitrate } from '@/lib/distrokid-media';
import styles from './studio.module.css';

export const maxSeconds = MAX_MEDIA_DURATION;
export const mediaAccept = 'video/*,audio/*,.mkv,.m4a,.aiff,.wma,.flac,.ogg,.opus';

export type RunMedia = <T>(label: string, work: (signal: AbortSignal) => Promise<T>) => Promise<T>;

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong. Try again.';
}

export function wasCancelled(error: unknown) {
  return error instanceof Error && error.name === 'AbortError';
}

export function clock(seconds: number) {
  const value = Math.floor(Math.max(0, seconds) + 0.0001);
  return Math.floor(value / 60) + ':' + String(value % 60).padStart(2, '0');
}

export function timelineTime(seconds: number) {
  const hundredths = Math.round(Math.max(0, seconds) * 100);
  const whole = Math.floor(hundredths / 100);
  return clock(whole) + '.' + String(hundredths % 100).padStart(2, '0');
}

export function sizeLabel(bytes: number) {
  return bytes >= 1024 * 1024 ? (bytes / 1024 / 1024).toFixed(1) + ' MB' : Math.max(1, Math.round(bytes / 1024)) + ' KB';
}

export function baseName(filename: string) {
  return filename.replace(/\.[^.]+$/, '');
}

export function safeName(name: string) {
  return name.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-').trim().replace(/[. ]+$/, '').slice(0, 100) || 'Untitled';
}

export function validateFiles(next: File[], current: File[] = []) {
  if (next.some(file => file.size === 0)) return 'One of the files is empty.';
  if (next.some(file => file.size > MAX_MEDIA_BYTES)) return 'Choose files up to 100 MB each.';
  const total = [...current, ...next];
  if (total.length > MAX_MEDIA_FILES) return 'Choose up to eight files.';
  if (total.reduce((sum, file) => sum + file.size, 0) > MAX_BATCH_BYTES) return 'Keep the total under 250 MB.';
  return '';
}

export function Notice({ children, danger = false }: { children: ReactNode; danger?: boolean }) {
  return <p className={danger ? styles.error : styles.notice} role={danger ? 'alert' : 'status'}>{children}</p>;
}

export function Dropzone({ onFiles, title, hint, multiple = false, compact = false, disabled = false }: {
  onFiles: (files: File[]) => void;
  title: string;
  hint: string;
  multiple?: boolean;
  compact?: boolean;
  disabled?: boolean;
}) {
  const inputId = useId();
  const [dragging, setDragging] = useState(false);
  return (
    <div className={styles.drop}
      data-compact={compact}
      data-dragging={dragging}
      onDragOver={event => { event.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={event => {
        event.preventDefault();
        setDragging(false);
        if (disabled) return;
        const files = Array.from(event.dataTransfer.files);
        onFiles(multiple ? files : files.slice(0, 1));
      }}>
      <div className={styles.dropIcon}><FileAudio size={23} /></div>
      <strong>{title}</strong>
      <p>{hint}</p>
      <div className={styles.filePicker}>
        <input id={inputId} type="file" accept={mediaAccept} multiple={multiple} disabled={disabled}
          aria-label={multiple ? 'Choose media files' : 'Choose ' + title.toLowerCase()}
          onChange={event => {
            const files = Array.from(event.currentTarget.files ?? []);
            event.currentTarget.value = '';
            if (files.length) onFiles(files);
          }} />
        <label className={styles.secondary} htmlFor={inputId}><Upload size={15} /> {multiple ? 'Choose files' : 'Choose file'}</label>
      </div>
    </div>
  );
}

export function FormatFields({ format, bitrate, onFormat, onBitrate, disabled }: {
  format: AudioFormat;
  bitrate: Bitrate;
  onFormat: (format: AudioFormat) => void;
  onBitrate: (bitrate: Bitrate) => void;
  disabled: boolean;
}) {
  const lossy = AUDIO_FORMATS.find(option => option.id === format)?.lossy;
  return (
    <div className={styles.fieldRow}>
      <label>Output format
        <select value={format} onChange={event => onFormat(event.target.value as AudioFormat)} disabled={disabled}>
          {AUDIO_FORMATS.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
        </select>
      </label>
      {lossy && <label>Bitrate
        <select value={format === 'wma' && bitrate === 320 ? 192 : bitrate} onChange={event => onBitrate(Number(event.target.value) as Bitrate)} disabled={disabled}>
          <option value={128}>128 kbps</option><option value={192}>192 kbps</option>
          {format !== 'wma' && <option value={320}>320 kbps</option>}
        </select>
      </label>}
    </div>
  );
}

export function AudioPlayer({ blob, label }: { blob: Blob; label: string }) {
  const player = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const audio = player.current;
    if (!audio) return;
    const url = URL.createObjectURL(blob);
    audio.src = url;
    return () => {
      audio.removeAttribute('src');
      audio.load();
      URL.revokeObjectURL(url);
    };
  }, [blob]);
  return <audio ref={player} className={styles.audio} controls preload="none" aria-label={label} />;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
