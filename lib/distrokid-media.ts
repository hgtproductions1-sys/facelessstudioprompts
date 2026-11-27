import type { FFmpeg } from "@ffmpeg/ffmpeg";

export const MAX_MEDIA_BYTES = 100 * 1024 * 1024;
export const MAX_BATCH_BYTES = 250 * 1024 * 1024;
export const MAX_MEDIA_FILES = 8;
export const MAX_MEDIA_DURATION = 600;

export const AUDIO_FORMATS = [
  { id: "mp3", label: "MP3", mime: "audio/mpeg", lossy: true, muxer: "mp3", codec: "libmp3lame" },
  { id: "wav", label: "WAV", mime: "audio/wav", lossy: false, muxer: "wav", codec: "pcm_s24le" },
  { id: "m4a", label: "M4A (AAC)", mime: "audio/mp4", lossy: true, muxer: "ipod", codec: "aac" },
  { id: "flac", label: "FLAC", mime: "audio/flac", lossy: false, muxer: "flac", codec: "flac" },
  { id: "aiff", label: "AIFF", mime: "audio/aiff", lossy: false, muxer: "aiff", codec: "pcm_s24be" },
  { id: "wma", label: "WMA", mime: "audio/x-ms-wma", lossy: true, muxer: "asf", codec: "wmav2" },
] as const;

export type AudioFormat = (typeof AUDIO_FORMATS)[number]["id"];
export type Bitrate = 128 | 192 | 320;
export type Transition = "seamless" | "gap" | "crossfade";

export interface MediaInfo {
  duration: number;
  hasAudio: boolean;
  hasVideo: boolean;
  codec: string;
  channels: number;
  sampleRate: number;
  tags: Record<string, string>;
}

export interface MediaClip {
  file: File;
  start: number;
  end: number;
  gainDb?: number;
  fadeIn?: number;
  fadeOut?: number;
}

export interface AudioInterval {
  start: number;
  end: number;
}

export interface AudioSection extends AudioInterval {
  mode: "cut" | "mute";
}

export interface AudioOptions {
  format: AudioFormat;
  bitrate?: Bitrate;
  normalize?: boolean;
  onProgress?: (progress: number) => void;
  signal?: AbortSignal;
}

interface ProbeStream {
  codec_type?: string;
  disposition?: { attached_pic?: number };
  codec_name?: string;
  duration?: string;
  channels?: number;
  sample_rate?: string;
  tags?: Record<string, string>;
}

interface ProbeResult {
  streams?: ProbeStream[];
  format?: { duration?: string; tags?: Record<string, string> };
}

const ASSETS = "/distrokid-media/ffmpeg-0.12.15-core-0.12.10";
const WORKER_LOAD_TIMEOUT = 30_000;
const JOB_TIMEOUT = 180_000;
const COMPILE_RATE = 44_100;
const GAP = 0.5;
const CROSSFADE = 1;
const NORMALIZE = "loudnorm=I=-14:TP=-1:LRA=11";
const probeCache = new WeakMap<Blob, MediaInfo>();
const generatedAudio = new WeakMap<Blob, number>();
let engine: FFmpeg | null = null;
let activeJob: AbortController | null = null;

function abortError() {
  return new DOMException("The audio operation was canceled.", "AbortError");
}

function releaseEngine() {
  engine?.terminate();
  engine = null;
}

export function cancelMediaJob() {
  if (activeJob) activeJob.abort();
  else releaseEngine();
}

async function loadEngine(signal: AbortSignal) {
  if (engine) return engine;
  if (typeof Worker === "undefined" || typeof DecompressionStream === "undefined") {
    throw new Error("Audio processing requires a current browser with WebAssembly and streaming decompression.");
  }

  const [{ FFmpeg: BrowserFFmpeg }, response] = await Promise.all([
    import("@ffmpeg/ffmpeg"),
    fetch(`${ASSETS}/ffmpeg-core.wasm.gz`, { signal }),
  ]);
  if (!response.ok || !response.body) throw new Error("The audio engine could not be downloaded. Try again.");
  const wasm = await new Response(response.body.pipeThrough(new DecompressionStream("gzip")), {
    headers: { "Content-Type": "application/wasm" },
  }).blob();
  signal.throwIfAborted();

  const wasmURL = URL.createObjectURL(wasm);
  const instance = new BrowserFFmpeg();
  engine = instance;
  let loadTimer: ReturnType<typeof setTimeout> | undefined;
  try {
    const absolute = (asset: string) => new URL(`${ASSETS}/${asset}`, window.location.origin).href;
    await Promise.race([
      instance.load({ classWorkerURL: absolute("worker.js"), coreURL: absolute("ffmpeg-core.js"), wasmURL }),
      new Promise<never>((_, reject) => {
        loadTimer = setTimeout(() => reject(new Error("The audio worker could not start. Try again.")), WORKER_LOAD_TIMEOUT);
      }),
    ]);
    signal.throwIfAborted();
    return instance;
  } catch (error) {
    if (engine === instance) releaseEngine();
    throw error;
  } finally {
    clearTimeout(loadTimer);
    URL.revokeObjectURL(wasmURL);
  }
}

async function runMediaJob<T>(
  task: (ffmpeg: FFmpeg) => Promise<T>,
  signal?: AbortSignal,
): Promise<T> {
  signal?.throwIfAborted();
  if (activeJob) throw new Error("Wait for the current audio operation to finish.");

  const controller = new AbortController();
  activeJob = controller;
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  controller.signal.addEventListener("abort", releaseEngine, { once: true });

  try {
    const ffmpeg = await loadEngine(controller.signal);
    controller.signal.throwIfAborted();
    const output = await task(ffmpeg);
    controller.signal.throwIfAborted();
    return output;
  } catch (error) {
    if (controller.signal.aborted) throw abortError();
    throw error;
  } finally {
    signal?.removeEventListener("abort", abort);
    controller.signal.removeEventListener("abort", releaseEngine);
    activeJob = null;
  }
}

function assertFileSize(file: Blob) {
  if (!file.size) throw new Error("This file is empty.");
  if (file.size > MAX_MEDIA_BYTES && !generatedAudio.has(file)) {
    throw new Error("Each source file must be 100 MB or smaller.");
  }
}

function sourceDuration(info: MediaInfo, file: Blob) {
  if (!info.hasAudio) throw new Error("This file has no audio track.");
  if (info.duration <= 0) throw new Error("The audio duration could not be read.");
  const duration = Math.min(info.duration, generatedAudio.get(file) ?? info.duration);
  if (duration > MAX_MEDIA_DURATION + 1e-6) throw new Error("Each audio source can be up to 10 minutes long.");
  return duration;
}

async function withInputs<T>(
  ffmpeg: FFmpeg,
  files: readonly Blob[],
  task: (paths: string[]) => Promise<T>,
): Promise<T> {
  files.forEach(assertFileSize);
  const directory = "/distrokid-inputs";
  const blobs = files.map((file, index) => {
    const originalName = file instanceof File ? file.name : "";
    const extension = originalName.match(/\.[a-z0-9]{1,8}$/i)?.[0] ?? "";
    return { name: `media-${index}${extension}`, data: file };
  });
  await ffmpeg.createDir(directory);
  try {
    const mounted = await ffmpeg.mount("WORKERFS" as Parameters<FFmpeg["mount"]>[0], { blobs }, directory);
    if (!mounted) throw new Error("The audio engine could not read these files.");
    try {
      return await task(blobs.map(({ name }) => `${directory}/${name}`));
    } finally {
      if (ffmpeg.loaded) await ffmpeg.unmount(directory);
    }
  } finally {
    if (ffmpeg.loaded) await ffmpeg.deleteDir(directory);
  }
}

function numberOrZero(value: number | string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

async function readProbe(ffmpeg: FFmpeg, file: Blob, path: string): Promise<MediaInfo> {
  const cached = probeCache.get(file);
  if (cached) return cached;

  const reportPath = "/distrokid-probe.json";
  try {
    const status = await ffmpeg.ffprobe([
      "-v", "error", "-show_format", "-show_streams", "-of", "json", "-o", reportPath, path,
    ], 30_000);
    // This core returns -1 even when ffprobe successfully writes the JSON report.
    const raw = status <= 0 ? await ffmpeg.readFile(reportPath, "utf8").catch(() => undefined) : undefined;
    let report: ProbeResult;
    try {
      report = typeof raw === "string" ? JSON.parse(raw) : {};
    } catch {
      report = {};
    }
    if (!report.streams?.length) throw new Error("The media file is damaged or uses an unsupported format.");
    const audio = report.streams.find((stream) => stream.codec_type === "audio");
    const tags = Object.fromEntries(Object.entries({ ...report.format?.tags, ...audio?.tags })
      .filter(([, value]) => typeof value === "string")
      .map(([key, value]) => [key.toLowerCase(), value.slice(0, 2048)]));
    const info = {
      duration: numberOrZero(audio?.duration) || numberOrZero(report.format?.duration),
      hasAudio: Boolean(audio),
      hasVideo: report.streams.some(stream => stream.codec_type === "video" && !stream.disposition?.attached_pic),
      codec: audio?.codec_name ?? "",
      channels: numberOrZero(audio?.channels),
      sampleRate: numberOrZero(audio?.sample_rate),
      tags,
    };
    probeCache.set(file, info);
    return info;
  } finally {
    if (ffmpeg.loaded) await ffmpeg.deleteFile(reportPath).catch(() => undefined);
  }
}

export async function probeMedia(file: Blob, signal?: AbortSignal) {
  signal?.throwIfAborted();
  const cached = probeCache.get(file);
  if (cached) return cached;
  return runMediaJob((ffmpeg) => withInputs(ffmpeg, [file], ([path]) => readProbe(ffmpeg, file, path)), signal);
}

function encodingOptions(options: AudioOptions) {
  const format = AUDIO_FORMATS.find(({ id }) => id === options.format);
  if (!format) throw new Error("Choose a supported audio format.");
  const args = ["-c:a", format.codec, "-f", format.muxer];
  if (format.lossy) {
    const bitrate = options.bitrate ?? 320;
    if (![128, 192, 320].includes(bitrate)) throw new Error("Choose a supported bitrate.");
    args.push("-b:a", `${bitrate}k`);
  }
  if (format.id === "flac") args.push("-sample_fmt", "s32", "-bits_per_raw_sample", "24");
  return { format, args };
}

async function runOutput(
  ffmpeg: FFmpeg,
  args: string[],
  mime: string,
  duration: number,
  onProgress?: AudioOptions["onProgress"],
): Promise<Blob> {
  const output = "/distrokid-output";
  const handleProgress = ({ time }: { time: number }) => {
    if (time > 0 && duration > 0) onProgress?.(Math.min(0.98, time / 1_000_000 / duration));
  };
  if (onProgress) ffmpeg.on("progress", handleProgress);
  try {
    onProgress?.(0);
    const status = await ffmpeg.exec(["-v", "error", ...args, output], JOB_TIMEOUT);
    if (status !== 0) throw new Error("Audio processing failed. Try a smaller file or a different format.");
    const data = await ffmpeg.readFile(output);
    if (typeof data === "string" || data.byteLength === 0) throw new Error("The audio output was empty.");
    // ffmpeg.wasm transfers the worker-owned ArrayBuffer when reading a file.
    const blob = new Blob([data as Uint8Array<ArrayBuffer>], { type: mime });
    generatedAudio.set(blob, duration);
    onProgress?.(1);
    return blob;
  } finally {
    if (onProgress) ffmpeg.off("progress", handleProgress);
    if (ffmpeg.loaded) await ffmpeg.deleteFile(output).catch(() => undefined);
  }
}

export async function convertMedia(file: Blob, options: AudioOptions) {
  const { format, args } = encodingOptions(options);
  return runMediaJob((ffmpeg) => withInputs(ffmpeg, [file], async ([path]) => {
    const info = await readProbe(ffmpeg, file, path);
    const duration = sourceDuration(info, file);
    const filters = options.normalize ? ["-af", NORMALIZE] : [];
    const trimPadding = duration < info.duration ? ["-t", String(duration)] : [];
    // Keep 44.1 kHz sources at their original rate and cap high-rate inputs at 48 kHz.
    const rate = info.sampleRate <= 44_100 ? 44_100 : 48_000;
    return runOutput(ffmpeg, [
      "-i", path, "-map", "0:a:0", "-map_metadata", "-1", ...trimPadding, ...filters,
      "-ac", info.channels === 1 ? "1" : "2", "-ar", String(rate), ...args,
    ], format.mime, duration, options.onProgress);
  }), options.signal);
}

function activeDuration(clip: Pick<MediaClip, "start" | "end">) {
  const difference = clip.end - clip.start;
  return Number.isFinite(difference) ? Math.max(0, difference) : 0;
}

function overlap(previous: number, next: number) {
  // Quantize to the same time base as the compiled audio.
  return Math.floor(Math.min(CROSSFADE, previous / 2, next / 2) * COMPILE_RATE) / COMPILE_RATE;
}

function mixDuration(
  clips: readonly Pick<MediaClip, "start" | "end">[],
  transition: Transition,
): number {
  const durations = clips.map(activeDuration);
  return durations.reduce((total, duration, index) => {
    if (index > 0 && transition === "gap") return total + duration + GAP;
    if (index > 0 && transition === "crossfade") return total + duration - overlap(durations[index - 1], duration);
    return total + duration;
  }, 0);
}

function sampleIndex(seconds: number) {
  return Math.round(seconds * COMPILE_RATE);
}

export function validAudioInterval({ start, end }: AudioInterval, duration: number) {
  return Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end <= duration + 1e-6 &&
    sampleIndex(end) > sampleIndex(start);
}

function sectionSegments(duration: number, sections: readonly AudioSection[]) {
  const limit = sampleIndex(duration);
  const ranges = sections.map(({ start, end, mode }) => ({ start: sampleIndex(start), end: Math.min(sampleIndex(end), limit), mode }));
  const endpoints = [...new Set([0, limit, ...ranges.flatMap(({ start, end }) => [start, end])])].sort((a, b) => a - b);
  const segments: { start: number; end: number; mode?: AudioSection["mode"] }[] = [];
  for (let index = 1; index < endpoints.length; index++) {
    const start = endpoints[index - 1];
    const end = endpoints[index];
    const active = ranges.filter(range => range.start <= start && range.end >= end);
    const mode = active.some(range => range.mode === "cut") ? "cut" : active[0]?.mode;
    const previous = segments.at(-1);
    if (previous && previous.mode === mode) previous.end = end;
    else segments.push({ start, end, mode });
  }
  return segments;
}

export function compileDuration(
  clips: readonly Pick<MediaClip, "start" | "end">[],
  transition: Transition = "seamless",
  sections: readonly AudioSection[] = [],
) {
  const duration = mixDuration(clips, transition);
  if (!sections.some(section => section.mode === "cut")) return duration;
  const cutSamples = sectionSegments(duration, sections).reduce((sum, segment) =>
    sum + (segment.mode === "cut" ? segment.end - segment.start : 0), 0);
  return (sampleIndex(duration) - cutSamples) / COMPILE_RATE;
}

/** Translate a selection on the exported master back to the pre-cut mix. */
export function mapAudioIntervalToMix(selection: AudioInterval, duration: number, sections: readonly AudioSection[]) {
  const ranges: AudioInterval[] = [];
  const selectedStart = sampleIndex(selection.start);
  const selectedEnd = sampleIndex(selection.end);
  let offset = 0;
  for (const segment of sectionSegments(duration, sections.filter(section => section.mode === "cut"))) {
    if (segment.mode === "cut") continue;
    const nextOffset = offset + segment.end - segment.start;
    const start = Math.max(offset, selectedStart);
    const end = Math.min(nextOffset, selectedEnd);
    if (end > start) ranges.push({
      start: (segment.start + start - offset) / COMPILE_RATE,
      end: Math.min(duration, (segment.start + end - offset) / COMPILE_RATE),
    });
    offset = nextOffset;
  }
  return ranges;
}

function bounded(value: number | undefined, min: number, max: number) {
  return Math.min(max, Math.max(min, value !== undefined && Number.isFinite(value) ? value : 0));
}

function compileFilter(clips: readonly MediaClip[], transition: Transition, normalize: boolean, sections: readonly AudioSection[]) {
  const durations = clips.map(activeDuration);
  const chain = clips.map((clip, index) => {
    const duration = durations[index];
    const gain = bounded(clip.gainDb, -24, 12);
    const fadeIn = bounded(clip.fadeIn, 0, duration / 2);
    const fadeOut = bounded(clip.fadeOut, 0, duration / 2);
    const filters = [
      `[${index}:a:0]atrim=start=${clip.start}:end=${clip.end}`,
      "asetpts=PTS-STARTPTS",
      `aresample=${COMPILE_RATE}`,
      "aformat=sample_fmts=fltp:channel_layouts=stereo",
    ];
    if (gain !== 0) filters.push(`volume=${gain}dB`);
    if (fadeIn > 0) filters.push(`afade=t=in:st=0:d=${fadeIn.toFixed(6)}`);
    if (fadeOut > 0) filters.push(`afade=t=out:st=${(duration - fadeOut).toFixed(6)}:d=${fadeOut.toFixed(6)}`);
    if (transition === "gap" && index < clips.length - 1) filters.push(`apad=pad_dur=${GAP}`);
    return `${filters.join(",")}[clip${index}]`;
  });

  let mixed = "clip0";
  if (transition === "crossfade") {
    for (let index = 1; index < clips.length; index++) {
      const next = `transition${index}`;
      const samples = Math.round(overlap(durations[index - 1], durations[index]) * COMPILE_RATE);
      const filter = samples > 0 ? `acrossfade=ns=${samples}:c1=tri:c2=tri` : "concat=n=2:v=0:a=1";
      chain.push(`[${mixed}][clip${index}]${filter}[${next}]`);
      mixed = next;
    }
  } else if (clips.length > 1) {
    const inputs = clips.map((_, index) => `[clip${index}]`).join("");
    mixed = "combined";
    chain.push(`${inputs}concat=n=${clips.length}:v=0:a=1[${mixed}]`);
  }

  const masterFilter = normalize ? `${NORMALIZE},aresample=${COMPILE_RATE}` : "anull";
  if (!sections.length) {
    chain.push(`[${mixed}]${masterFilter}[master]`);
    return chain.join(";");
  }

  // Work in samples after transitions and normalization, so a mute is exactly silent in the PCM mix.
  const segments = sectionSegments(mixDuration(clips, transition), sections).filter(({ mode }) => mode !== "cut");
  chain.push(`[${mixed}]${masterFilter}[sectionSource]`);
  if (segments.length > 1) {
    const inputs = segments.map((_, index) => `[sectionIn${index}]`).join("");
    chain.push(`[sectionSource]asplit=${segments.length}${inputs}`);
  }
  for (const [index, segment] of segments.entries()) {
    const input = segments.length === 1 ? "sectionSource" : `sectionIn${index}`;
    const output = segments.length === 1 ? "master" : `sectionOut${index}`;
    const mute = segment.mode === "mute" ? ",volume=0" : "";
    chain.push(`[${input}]atrim=start_sample=${segment.start}:end_sample=${segment.end},asetpts=N/SR/TB${mute}[${output}]`);
  }
  if (segments.length > 1) {
    const inputs = segments.map((_, index) => `[sectionOut${index}]`).join("");
    chain.push(`${inputs}concat=n=${segments.length}:v=0:a=1[master]`);
  }
  return chain.join(";");
}

export async function compileAudio(
  clips: readonly MediaClip[],
  options: AudioOptions & { transition?: Transition; sections?: readonly AudioSection[] },
) {
  if (clips.length === 0) throw new Error("Add at least one clip to compile.");
  if (clips.length > MAX_MEDIA_FILES) throw new Error("Compile up to eight clips at once.");
  if (clips.reduce((total, { file }) => total + file.size, 0) > MAX_BATCH_BYTES) {
    throw new Error("The combined source files can be up to 250 MB.");
  }
  const transition = options.transition ?? "seamless";
  const sections = options.sections ?? [];
  const durationFor = (input: readonly MediaClip[]) => {
    const duration = mixDuration(input, transition);
    if (sections.some(section => !validAudioInterval(section, duration) || !["cut", "mute"].includes(section.mode))) {
      throw new Error("Set section times within the master and put each end after its start.");
    }
    const editedDuration = compileDuration(input, transition, sections);
    if (editedDuration > MAX_MEDIA_DURATION + 1e-6) throw new Error("A compiled master can be up to 10 minutes long.");
    if (sections.length && editedDuration < 0.05) throw new Error("Keep at least 0.05 seconds of audio in the master.");
    return editedDuration;
  };
  durationFor(clips);
  const files = clips.map(({ file }) => file);
  const { format, args } = encodingOptions(options);
  return runMediaJob((ffmpeg) => withInputs(ffmpeg, files, async (paths) => {
    const preparedClips: MediaClip[] = [];
    for (const [index, clip] of clips.entries()) {
      const info = await readProbe(ffmpeg, clip.file, paths[index]);
      sourceDuration(info, clip.file);
      if (!Number.isFinite(clip.start) || !Number.isFinite(clip.end) ||
          clip.start < 0 || clip.end > info.duration + 0.01 || clip.start >= Math.min(clip.end, info.duration)) {
        throw new Error(`Check the trim times for ${clip.file.name}.`);
      }
      preparedClips.push({ ...clip, end: Math.min(clip.end, info.duration) });
    }
    const duration = durationFor(preparedClips);
    return runOutput(ffmpeg, [
      ...paths.flatMap((path) => ["-i", path]),
      "-filter_complex", compileFilter(preparedClips, transition, options.normalize ?? false, sections),
      "-map", "[master]", "-map_metadata", "-1", "-ar", String(COMPILE_RATE), "-ac", "2", ...args,
    ], format.mime, duration, options.onProgress);
  }), options.signal);
}

export function previewAudio(file: Blob, signal?: AbortSignal) {
  return convertMedia(file, { format: "mp3", bitrate: 128, signal });
}

export async function previewAudioSection(file: Blob, selection: AudioInterval, signal?: AbortSignal) {
  return runMediaJob((ffmpeg) => withInputs(ffmpeg, [file], async ([path]) => {
    const fileDuration = sourceDuration(await readProbe(ffmpeg, file, path), file);
    const start = selection.start;
    const end = Math.min(selection.end, fileDuration);
    if (!validAudioInterval({ start, end }, fileDuration)) throw new Error("Choose a section within the audio master.");
    const { format, args } = encodingOptions({ format: "mp3", bitrate: 128 });
    return runOutput(ffmpeg, [
      "-ss", String(start), "-i", path, "-t", String(end - start), "-map", "0:a:0", "-map_metadata", "-1", ...args,
    ], format.mime, end - start);
  }), signal);
}

export async function createRecognitionExcerpts(file: Blob, duration: number, signal?: AbortSignal) {
  return runMediaJob((ffmpeg) => withInputs(ffmpeg, [file], async ([path]) => {
    const info = await readProbe(ffmpeg, file, path);
    const fileDuration = sourceDuration(info, file);
    const usableDuration = Math.min(numberOrZero(duration) || fileDuration, fileDuration);
    const length = Math.min(12, usableDuration);
    const finalOffset = Math.max(0, usableDuration - length);
    const offsets = finalOffset < 1 ? [0] : finalOffset < 12 ? [0, finalOffset] : [0, finalOffset / 2, finalOffset];
    const excerpts: { offset: number; blob: Blob }[] = [];
    for (const offset of offsets) {
      const blob = await runOutput(ffmpeg, [
        "-ss", String(offset), "-i", path, "-t", String(length), "-map", "0:a:0", "-map_metadata", "-1",
        "-ac", "1", "-ar", "22050", "-c:a", "pcm_s16le", "-f", "wav",
      ], "audio/wav", length);
      excerpts.push({ offset, blob });
    }
    return excerpts;
  }), signal);
}

export async function analyzeAudio(file: Blob, signal?: AbortSignal): Promise<{ peakDb: number | null; waveform: number[] }> {
  return runMediaJob((ffmpeg) => withInputs(ffmpeg, [file], async ([path]) => {
    let peakDb: number | null = null;
    const onLog = ({ message }: { message: string }) => {
      const peak = message.match(/max_volume:\s*(-?\d+(?:\.\d+)?)\s*dB/i);
      if (peak) peakDb = Number(peak[1]);
    };
    const samplesPath = "/distrokid-waveform.pcm";
    ffmpeg.on("log", onLog);
    try {
      const status = await ffmpeg.exec([
        "-v", "info", "-i", path, "-map", "0:a:0", "-t", String(MAX_MEDIA_DURATION),
        "-af", "volumedetect", "-ar", "4000", "-ac", "1", "-c:a", "pcm_s16le", "-f", "s16le", samplesPath,
      ], JOB_TIMEOUT);
      if (status !== 0) throw new Error("Audio levels could not be read.");
      const samples = await ffmpeg.readFile(samplesPath);
      if (typeof samples === "string" || samples.length < 2) return { peakDb, waveform: [] };
      const data = new DataView(samples.buffer, samples.byteOffset, samples.byteLength);
      const count = Math.floor(data.byteLength / 2);
      const binCount = Math.min(count, 96);
      const waveform = new Array<number>(binCount).fill(0);
      for (let index = 0; index < count; index++) {
        const bin = Math.floor(index * binCount / count);
        waveform[bin] = Math.max(waveform[bin], Math.abs(data.getInt16(index * 2, true)) / 32768);
      }
      return { peakDb, waveform };
    } finally {
      ffmpeg.off("log", onLog);
      if (ffmpeg.loaded) await ffmpeg.deleteFile(samplesPath).catch(() => undefined);
    }
  }), signal);
}
