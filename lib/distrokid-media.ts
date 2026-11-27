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

export interface AudioOptions {
  format: AudioFormat;
  bitrate?: Bitrate;
  normalize?: boolean;
  onProgress?: (progress: number) => void;
  signal?: AbortSignal;
}

interface ProbeStream {
  codec_type?: string;
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
const generatedAudio = new WeakSet<Blob>();
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

function assertAudio(info: MediaInfo) {
  if (!info.hasAudio) throw new Error("This file has no audio track.");
  if (info.duration <= 0) throw new Error("The audio duration could not be read.");
  if (info.duration > MAX_MEDIA_DURATION) throw new Error("Each audio source can be up to 10 minutes long.");
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
    generatedAudio.add(blob);
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
    assertAudio(info);
    const filters = options.normalize ? ["-af", NORMALIZE] : [];
    // Keep 44.1 kHz sources at their original rate and cap high-rate inputs at 48 kHz.
    const rate = info.sampleRate <= 44_100 ? 44_100 : 48_000;
    return runOutput(ffmpeg, [
      "-i", path, "-map", "0:a:0", "-map_metadata", "-1", ...filters,
      "-ac", info.channels === 1 ? "1" : "2", "-ar", String(rate), ...args,
    ], format.mime, info.duration, options.onProgress);
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

export function compileDuration(
  clips: readonly Pick<MediaClip, "start" | "end">[],
  transition: Transition = "seamless",
): number {
  const durations = clips.map(activeDuration);
  return durations.reduce((total, duration, index) => {
    if (index > 0 && transition === "gap") return total + duration + GAP;
    if (index > 0 && transition === "crossfade") return total + duration - overlap(durations[index - 1], duration);
    return total + duration;
  }, 0);
}

function bounded(value: number | undefined, min: number, max: number) {
  return Math.min(max, Math.max(min, value !== undefined && Number.isFinite(value) ? value : 0));
}

function compileFilter(clips: readonly MediaClip[], transition: Transition, normalize: boolean) {
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
  chain.push(`[${mixed}]${masterFilter}[master]`);
  return chain.join(";");
}

export async function compileAudio(
  clips: readonly MediaClip[],
  options: AudioOptions & { transition?: Transition },
) {
  if (clips.length === 0) throw new Error("Add at least one clip to compile.");
  if (clips.length > MAX_MEDIA_FILES) throw new Error("Compile up to eight clips at once.");
  if (clips.reduce((total, { file }) => total + file.size, 0) > MAX_BATCH_BYTES) {
    throw new Error("The combined source files can be up to 250 MB.");
  }
  const transition = options.transition ?? "seamless";
  const duration = compileDuration(clips, transition);
  if (duration > MAX_MEDIA_DURATION + 1e-6) throw new Error("A compiled master can be up to 10 minutes long.");
  const files = clips.map(({ file }) => file);
  const { format, args } = encodingOptions(options);
  return runMediaJob((ffmpeg) => withInputs(ffmpeg, files, async (paths) => {
    const preparedClips: MediaClip[] = [];
    for (const [index, clip] of clips.entries()) {
      const info = await readProbe(ffmpeg, clip.file, paths[index]);
      assertAudio(info);
      if (!Number.isFinite(clip.start) || !Number.isFinite(clip.end) ||
          clip.start < 0 || clip.end > info.duration + 0.01 || clip.start >= Math.min(clip.end, info.duration)) {
        throw new Error(`Check the trim times for ${clip.file.name}.`);
      }
      preparedClips.push({ ...clip, end: Math.min(clip.end, info.duration) });
    }
    return runOutput(ffmpeg, [
      ...paths.flatMap((path) => ["-i", path]),
      "-filter_complex", compileFilter(preparedClips, transition, options.normalize ?? false),
      "-map", "[master]", "-map_metadata", "-1", "-ar", String(COMPILE_RATE), "-ac", "2", ...args,
    ], format.mime, compileDuration(preparedClips, transition), options.onProgress);
  }), options.signal);
}

export function previewAudio(file: Blob, signal?: AbortSignal) {
  return convertMedia(file, { format: "mp3", bitrate: 128, signal });
}

export async function createRecognitionExcerpts(file: Blob, duration: number, signal?: AbortSignal) {
  return runMediaJob((ffmpeg) => withInputs(ffmpeg, [file], async ([path]) => {
    const info = await readProbe(ffmpeg, file, path);
    assertAudio(info);
    const usableDuration = Math.min(numberOrZero(duration) || info.duration, info.duration);
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
