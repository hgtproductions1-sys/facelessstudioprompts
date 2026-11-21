export const SAMPLE_ASPECT_RATIOS = {'16:9': 16 / 9, '9:16': 9 / 16, '1:1': 1, '4:5': 4 / 5} as const;
type SampleAspectRatio = keyof typeof SAMPLE_ASPECT_RATIOS;

type SampleDetails = {
  id: string;
  src: string;
  alt: string;
  aspectRatio: SampleAspectRatio;
  width: number;
  height: number;
  modelUsed: string;
  promptExcerpt: string;
  settingsNote?: string;
  capturedAt: string;
};

export type SampleOutputMedia = SampleDetails & (
  | {mediaType: 'image'}
  | {mediaType: 'video-loop'; posterSrc: string; webmSrc: string; durationSeconds: number}
);

type CdnSource = {projectId: string; dataset: string};
const localSamplePath = /^\/samples\/(?:[a-z0-9][a-z0-9_-]*\/)*[a-z0-9][a-z0-9_-]*\.[a-z0-9]+$/i;

export function sampleAssetUrl(value: unknown, kind: 'image' | 'mp4' | 'webm', cdn: CdnSource) {
  if (typeof value !== 'string') return undefined;
  const extensions = {image: /\.(avif|webp)$/i, mp4: /\.mp4$/i, webm: /\.webm$/i};
  if (localSamplePath.test(value) && extensions[kind].test(value)) return value;
  try {
    const url = new URL(value);
    const type = kind === 'image' ? 'images' : 'files';
    const prefix = '/' + type + '/' + cdn.projectId + '/' + cdn.dataset + '/';
    if (url.origin === 'https://cdn.sanity.io' && !url.username && !url.password && !url.search && !url.hash
      && url.pathname.startsWith(prefix) && /^[a-z0-9-]+\.[a-z0-9]+$/i.test(url.pathname.slice(prefix.length))
      && extensions[kind].test(url.pathname)) return url.href;
  } catch {}
  return undefined;
}

function text(value: unknown, max: number) {
  return typeof value === 'string' && value.trim() && value.length <= max ? value.trim() : undefined;
}

export function normalizeSampleOutput(value: unknown, cdn: CdnSource): SampleOutputMedia | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const sample = value as Record<string, unknown>;
  const id = text(sample.id, 128);
  const alt = text(sample.alt, 300);
  const modelUsed = text(sample.modelUsed, 100);
  const promptExcerpt = text(sample.promptExcerpt, 5000);
  const settingsNote = text(sample.settingsNote, 250);
  const capturedAt = text(sample.capturedAt, 10);
  const {mediaType, width, height, aspectRatio} = sample;
  if (!id || !alt || !modelUsed || !promptExcerpt || !capturedAt
    || !/^\d{4}-\d{2}-\d{2}$/.test(capturedAt) || !Number.isFinite(Date.parse(capturedAt))
    || new Date(capturedAt).toISOString().slice(0, 10) !== capturedAt
    || typeof width !== 'number' || typeof height !== 'number'
    || !Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0
    || typeof aspectRatio !== 'string' || !Object.hasOwn(SAMPLE_ASPECT_RATIOS, aspectRatio)) return undefined;

  const ratio = aspectRatio as SampleAspectRatio;
  if (Math.abs(width / height / SAMPLE_ASPECT_RATIOS[ratio] - 1) > 0.015) return undefined;
  const details = {id, alt, modelUsed, promptExcerpt, settingsNote, capturedAt, width, height, aspectRatio: ratio};
  if (mediaType === 'image') {
    const src = sampleAssetUrl(sample.src, 'image', cdn);
    if (!src || width > 1200) return undefined;
    return {...details, src, mediaType};
  }
  if (mediaType !== 'video-loop' || Math.min(width, height) > 720 || Math.max(width, height) > 1280) return undefined;
  const src = sampleAssetUrl(sample.src, 'mp4', cdn);
  const webmSrc = sampleAssetUrl(sample.webmSrc, 'webm', cdn);
  const posterSrc = sampleAssetUrl(sample.posterSrc, 'image', cdn);
  const durationSeconds = sample.durationSeconds;
  if (!src || !webmSrc || !posterSrc || !/\.webp$/i.test(posterSrc)
    || typeof durationSeconds !== 'number' || !Number.isFinite(durationSeconds)
    || durationSeconds < 3 || durationSeconds > 4) return undefined;
  return {...details, src, webmSrc, posterSrc, mediaType, durationSeconds};
}
