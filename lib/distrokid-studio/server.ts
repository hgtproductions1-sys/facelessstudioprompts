import 'server-only';
import {requestBucket, reserveRequest} from '@/lib/studioRateLimit';

type Track = {
  title: string;
  artist: string;
  album?: string;
  releaseDate?: string;
  link?: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const SAMPLE_RATE = 22050;
const BYTES_PER_SAMPLE = 2;
const WAV_HEADER_BYTES = 44;
const RIFF = 0x52494646;
const WAVE = 0x57415645;
const FORMAT_CHUNK = 0x666d7420;
const AUDIO_CHUNK = 0x64617461;
const MAX_AUDIO_BYTES = 12 * SAMPLE_RATE * BYTES_PER_SAMPLE;
const MAX_FORM_BYTES = 550 * 1024;
const AUDD_LINKS = new Set(['lis.tn']);
const APPLE_LINKS = new Set(['itunes.apple.com', 'music.apple.com']);

class SampleTooLarge extends Error {}

export function studioJson(data: unknown, status = 200, retryAfter?: number) {
  const headers = new Headers({
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  if (retryAfter !== undefined) headers.set('Retry-After', String(retryAfter));
  return Response.json(data, {status, headers});
}

export function recognitionConfig() {
  const token = process.env.AUDD_API_TOKEN?.trim();
  const limitText = process.env.AUDD_MONTHLY_MAX_REQUESTS?.trim() ?? '';
  const monthlyLimit = Number(limitText);
  if (!token || !/^[1-9]\d*$/.test(limitText) || !Number.isSafeInteger(monthlyLimit)
    || !process.env.UPSTASH_REDIS_REST_URL?.trim() || !process.env.UPSTASH_REDIS_REST_TOKEN?.trim()) {
    return null;
  }
  return {token, monthlyLimit};
}

async function readSampleForm(request: Request) {
  if (Number(request.headers.get('content-length')) > MAX_FORM_BYTES) throw new SampleTooLarge();
  const contentType = request.headers.get('content-type') ?? '';
  if (!/^multipart\/form-data\s*;/i.test(contentType) || !request.body) return null;
  const reader = request.body.getReader();
  const body = new Uint8Array(MAX_FORM_BYTES);
  let length = 0;
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      if (length + value.byteLength > MAX_FORM_BYTES) throw new SampleTooLarge();
      body.set(value, length);
      length += value.byteLength;
    }
  } finally {
    reader.releaseLock();
  }
  const form = await new Response(body.subarray(0, length), {
    headers: {'Content-Type': contentType},
  }).formData();
  const entries = Array.from(form.entries());
  const entry = entries[0];
  if (entries.length !== 1 || entry[0] !== 'sample' || typeof entry[1] === 'string') return null;
  return entry[1].arrayBuffer();
}

function canonicalSample(bytes: ArrayBuffer) {
  if (bytes.byteLength < WAV_HEADER_BYTES) return null;
  const wave = new DataView(bytes);
  if (wave.getUint32(0) !== RIFF || wave.getUint32(8) !== WAVE
    || wave.getUint32(4, true) !== bytes.byteLength - 8) return null;

  let hasFormat = false;
  let audio: Uint8Array<ArrayBuffer> | undefined;
  let offset = 12;
  while (offset + 8 <= bytes.byteLength) {
    const type = wave.getUint32(offset);
    const size = wave.getUint32(offset + 4, true);
    const content = offset + 8;
    offset = content + size + (size % 2);
    if (offset > bytes.byteLength) return null;

    if (type === FORMAT_CHUNK) {
      if (hasFormat || size < 16 || wave.getUint16(content, true) !== 1
        || wave.getUint16(content + 2, true) !== 1
        || wave.getUint32(content + 4, true) !== SAMPLE_RATE
        || wave.getUint32(content + 8, true) !== SAMPLE_RATE * BYTES_PER_SAMPLE
        || wave.getUint16(content + 12, true) !== BYTES_PER_SAMPLE
        || wave.getUint16(content + 14, true) !== 16) return null;
      hasFormat = true;
    } else if (type === AUDIO_CHUNK) {
      if (audio || size === 0 || size > MAX_AUDIO_BYTES || size % BYTES_PER_SAMPLE) return null;
      audio = new Uint8Array(bytes, content, size);
    }
  }

  if (!hasFormat || !audio || offset !== bytes.byteLength) return null;
  // Rebuild the WAV so the provider receives PCM only, without filename or embedded metadata.
  const clean = new Uint8Array(WAV_HEADER_BYTES + audio.byteLength);
  const header = new DataView(clean.buffer);
  header.setUint32(0, RIFF);
  header.setUint32(4, clean.byteLength - 8, true);
  header.setUint32(8, WAVE);
  header.setUint32(12, FORMAT_CHUNK);
  header.setUint32(16, 16, true);
  header.setUint16(20, 1, true);
  header.setUint16(22, 1, true);
  header.setUint32(24, SAMPLE_RATE, true);
  header.setUint32(28, SAMPLE_RATE * BYTES_PER_SAMPLE, true);
  header.setUint16(32, BYTES_PER_SAMPLE, true);
  header.setUint16(34, 16, true);
  header.setUint32(36, AUDIO_CHUNK);
  header.setUint32(40, audio.byteLength, true);
  clean.set(audio, WAV_HEADER_BYTES);
  return new Blob([clean], {type: 'audio/wav'});
}

function providerText(value: unknown) {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 240) || undefined
    : undefined;
}

function providerLink(value: unknown, hosts: ReadonlySet<string>) {
  if (typeof value !== 'string' || value.length > 2048) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.port && !url.username && !url.password && hosts.has(url.hostname)) {
      return url.href;
    }
  } catch {
    return undefined;
  }
}

function trackMetadata(fields: {
  title: unknown; artist: unknown; album: unknown; releaseDate: unknown; link: unknown;
}, hosts: ReadonlySet<string>): Track | null {
  const title = providerText(fields.title);
  const artist = providerText(fields.artist);
  if (!title || !artist) return null;
  const date = providerText(fields.releaseDate)?.slice(0, 10);
  return {
    title,
    artist,
    album: providerText(fields.album),
    releaseDate: date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined,
    link: providerLink(fields.link, hosts),
  };
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function recognitionUnavailable() {
  return studioJson({status: 'unavailable', message: 'Audio recognition is temporarily unavailable. You can search by title or artist.'}, 503);
}

export async function recognizeSample(request: Request) {
  const origin = request.headers.get('origin');
  const fetchSite = request.headers.get('sec-fetch-site');
  // The browser's fetch metadata sees the public URL even when a proxy rewrites the request URL.
  if (fetchSite === 'cross-site' || (fetchSite !== 'same-origin' && origin && origin !== new URL(request.url).origin)) {
    return studioJson({status: 'invalid_sample', message: 'Send audio samples from Distrokid Studio.'}, 403);
  }
  const config = recognitionConfig();
  if (!config) return recognitionUnavailable();

  let sample: Blob | null = null;
  try {
    const bytes = await readSampleForm(request);
    if (bytes) sample = canonicalSample(bytes);
  } catch (error) {
    if (error instanceof SampleTooLarge) {
      return studioJson({status: 'invalid_sample', message: 'Send one WAV sample up to 12 seconds.'}, 413);
    }
  }
  if (!sample) {
    return studioJson({status: 'invalid_sample', message: 'Send one 16-bit mono WAV sample at 22.05 kHz, up to 12 seconds.'}, 400);
  }

  try {
    const perIp = await reserveRequest('distrokid-audd-ip', requestBucket(request), 9, DAY_MS, {requireDurable: true});
    if (perIp) {
      return studioJson({status: 'rate_limited', message: 'You’ve reached the daily audio sample limit.'}, 429, perIp);
    }
    const global = await reserveRequest('distrokid-audd-provider', 'all', config.monthlyLimit, 30 * DAY_MS, {requireDurable: true});
    if (global) {
      return studioJson({status: 'rate_limited', message: 'Audio recognition has reached its shared usage limit. You can still search by title or artist.'}, 429, global);
    }
  } catch {
    return recognitionUnavailable();
  }

  const form = new FormData();
  form.set('api_token', config.token);
  form.set('file', sample, 'sample.wav');
  try {
    const response = await fetch('https://api.audd.io/', {
      method: 'POST',
      body: form,
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(12000)]),
      cache: 'no-store',
      redirect: 'error',
    });
    if (!response.ok) throw new Error('AudD returned an error');
    const payload = record(await response.json());
    if (payload?.status !== 'success') throw new Error('AudD did not complete recognition');
    if (payload.result === null) return studioJson({status: 'no_match'});
    const result = record(payload.result);
    const track = result && trackMetadata({
      title: result.title, artist: result.artist, album: result.album,
      releaseDate: result.release_date, link: result.song_link,
    }, AUDD_LINKS);
    if (!track) throw new Error('AudD returned invalid track metadata');
    return studioJson({status: 'match', track});
  } catch {
    return studioJson({status: 'provider_error', message: 'The recognition provider couldn’t check this sample. Try again later.'}, 502);
  }
}

function searchWords(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/\p{M}/gu, '').match(/[\p{L}\p{N}]+/gu) ?? [];
}

function matchScore(query: string[], field: string) {
  if (!query.length) return 0;
  const words = searchWords(field);
  if (query.join(' ') === words.join(' ')) return 2;
  return query.every(term => words.some(word => word.startsWith(term))) ? 1 : -1;
}

export async function lookupTracks(request: Request) {
  const {searchParams} = new URL(request.url);
  const title = searchParams.get('title')?.trim() ?? '';
  const artist = searchParams.get('artist')?.trim() ?? '';
  const queries = [title, artist];
  if (queries.some(query => query.length > 120 || /[\u0000-\u001f\u007f]/.test(query))
    || !/[\p{L}\p{N}]/u.test(title + artist)
    || searchParams.getAll('title').length > 1 || searchParams.getAll('artist').length > 1) {
    return studioJson({status: 'invalid_query', message: 'Enter a song title or an artist name, up to 120 characters each.'}, 400);
  }

  try {
    const perIp = await reserveRequest('distrokid-lookup-ip', requestBucket(request), 12, 60000);
    const retry = perIp || await reserveRequest('distrokid-lookup-provider', 'all', 18, 60000);
    if (retry) {
      return studioJson({status: 'rate_limited', message: 'Too many searches. Please try again shortly.'}, 429, retry);
    }
  } catch {
    return studioJson({status: 'unavailable', message: 'Catalog search is temporarily unavailable.'}, 503);
  }

  const url = new URL('https://itunes.apple.com/search');
  url.search = new URLSearchParams({
    term: queries.filter(Boolean).join(' '), country: 'US', media: 'music', entity: 'song', limit: '25',
  }).toString();
  try {
    const response = await fetch(url, {
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(6000)]),
      cache: 'no-store',
      redirect: 'error',
    });
    if (!response.ok) throw new Error('Apple search returned an error');
    const data = record(await response.json());
    if (!Array.isArray(data?.results)) throw new Error('Apple search returned invalid metadata');

    const titleWords = searchWords(title);
    const artistWords = searchWords(artist);
    const candidates = data.results.flatMap((item: unknown) => {
      const row = record(item);
      if (row?.kind !== 'song') return [];
      const track = trackMetadata({
        title: row.trackName, artist: row.artistName, album: row.collectionName,
        releaseDate: row.releaseDate, link: row.trackViewUrl,
      }, APPLE_LINKS);
      if (!track) return [];
      const titleScore = matchScore(titleWords, track.title);
      const artistScore = matchScore(artistWords, track.artist);
      if (titleScore < 0 || artistScore < 0) return [];
      return [{track, score: titleScore + artistScore}];
    }).sort((a, b) => b.score - a.score);

    const seen = new Set<string>();
    const tracks = candidates.flatMap(({track}) => {
      const key = JSON.stringify([track.title, track.artist, track.album].map(value => value?.toLowerCase()));
      if (seen.has(key)) return [];
      seen.add(key);
      return [track];
    }).slice(0, 8);
    return studioJson({status: 'results', tracks});
  } catch {
    return studioJson({status: 'provider_error', message: 'The music catalog couldn’t complete this search. Try again later.'}, 502);
  }
}
