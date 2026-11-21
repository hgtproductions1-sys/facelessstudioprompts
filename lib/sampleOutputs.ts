import 'server-only';
import {cache} from 'react';
import config from '@/config/editorial.json';
import {editorialClient, editorialEnabled} from '@/lib/editorial';
import {normalizeSampleOutput, type SampleOutputMedia} from '@/lib/sampleOutput';

const SAMPLE_QUERY = [
  '*[_type == "sampleOutput" && section in ["niches", "prompts"] && defined(targetSlug)] | order(capturedAt desc, _id asc)[0...300]{',
  '"id": _id, "path": "/" + section + "/" + targetSlug, mediaType, alt, aspectRatio, modelUsed, promptExcerpt, settingsNote, capturedAt,',
  '"width": select(mediaType == "image" => image.asset->metadata.dimensions.width, width),',
  '"height": select(mediaType == "image" => image.asset->metadata.dimensions.height, height),',
  '"src": select(mediaType == "image" => image.asset->url, mp4.asset->url),',
  '"srcBytes": select(mediaType == "image" => image.asset->size, mp4.asset->size),',
  '"posterSrc": poster.asset->url, "posterBytes": poster.asset->size,',
  '"webmSrc": webm.asset->url, "webmBytes": webm.asset->size, durationSeconds}',
].join('\n');
type CmsSample = {path?: unknown; mediaType?: unknown; srcBytes?: unknown; posterBytes?: unknown; webmBytes?: unknown};

function fileFits(value: unknown, limit: number) {
  return typeof value === 'number' && value > 0 && value < limit;
}

const readRegistry = cache(async (): Promise<unknown[]> => {
  if (!editorialEnabled || process.env.SANITY_SAMPLE_OUTPUTS_ENABLED !== 'true') return [];
  try {
    return await editorialClient.withConfig({timeout: 3500, maxRetries: 0}).fetch<unknown[]>(SAMPLE_QUERY, {}, {
      cache: 'force-cache',
      next: {revalidate: 300},
      perspective: 'published',
      token: process.env.SANITY_API_READ_TOKEN,
    });
  } catch {
    // Optional proof assets must not make a public page unavailable.
    return [];
  }
});

export async function getSampleOutputs(path: string, local: readonly SampleOutputMedia[] = []) {
  const samples = new Map<string, SampleOutputMedia>();
  for (const value of local) {
    const sample = normalizeSampleOutput(value, config);
    if (sample) samples.set(sample.id, sample);
  }
  for (const value of await readRegistry()) {
    if (!value || typeof value !== 'object') continue;
    const record = value as CmsSample;
    if (record.path !== path) continue;
    if (record.mediaType === 'image' && !fileFits(record.srcBytes, 120000)) continue;
    if (record.mediaType === 'video-loop' && (!fileFits(record.srcBytes, 800000)
      || !fileFits(record.webmBytes, 800000) || !fileFits(record.posterBytes, 50000))) continue;
    const sample = normalizeSampleOutput(record, config);
    if (sample) samples.set(sample.id, sample);
  }
  return [...samples.values()];
}
