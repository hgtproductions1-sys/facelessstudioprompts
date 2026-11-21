import {formatShot} from './blueprintFormat';
import {FORMATS, parseStudioDraft, type Blueprint, type Options, type Shot} from './studioOptions';

export const VOICEOVER_PACES = [140, 160, 180] as const;
export const VISUAL_EXPORT_MODELS = ['Veo 3', 'Kling', 'Runway Gen-4', 'Midjourney', 'Generic Universal'] as const;
export type VisualExportModel = typeof VISUAL_EXPORT_MODELS[number];
export const STUDIO_BACKUP_LIMIT = 2 * 1024 * 1024;
export const VOICEOVER_TEXT_LIMIT = 50000;

const WORD = new RegExp("[\\p{L}\\p{N}]+(?:[’'-][\\p{L}\\p{N}]+)*", 'gu');
const CLOCK = '(?:\\d{1,2}:)?\\d{1,3}:[0-5]\\d(?:[.,]\\d{1,3})?';
const LEADING_TIME = new RegExp('^\\[?(' + CLOCK + ')(?:\\s*[-–—]\\s*' + CLOCK + ')?\\]?\\s*[:–—-]?\\s*');
const TIME_RANGE = new RegExp('^(' + CLOCK + ')\\s*[-–—]\\s*(' + CLOCK + ')$');
const CUE = /\[(visual|camera|sfx|audio|music|sound(?: effects?)?|b-roll|vo|voiceover|narration|spoken)\]|^[ \t]*(visual|camera|sfx|audio|music|sound(?: effects?)?|b-roll|vo|voiceover|narration|spoken)[ \t]*:/gim;

function spokenCue(cue: string) {
  return /^(?:vo|voiceover|narration|spoken)$/i.test(cue);
}

/** Prepare pasted or generated narration for a speech tool. */
export function cleanVoiceover(text: string) {
  const paragraphs: string[] = [];
  let spoken = true;
  for (const line of text.replace(/\r\n?/g, '\n').split('\n')) {
    const withoutDirections = line.replace(/\[(?:visual|camera|sfx|audio|music|sound(?: effects?)?|b-roll)\s*:[^\]\n]*\]/gi, '');
    const source = withoutDirections.trim().replace(/^#{1,6}\s+/, '');
    if (/^(?:scene|shot|beat)\s+\d+(?:\s*[:–—-].*|\s+\([^)]+\))?\s*$/i.test(source)) {
      spoken = true;
      continue;
    }
    if (
      /^\(?\s*(?:no narration|no voiceover)\b/i.test(source)
      || /^\[(?:write|add|draft|insert)\b.*\]$/i.test(source)
      || /^(?:-{3,}|_{3,}|\*{3,}|\x60{3,}\w*)$/.test(source)
    ) continue;

    let position = 0;
    let content = '';
    for (const marker of source.matchAll(CUE)) {
      if (spoken) content += source.slice(position, marker.index);
      spoken = spokenCue(marker[1] ?? marker[2]);
      position = marker.index + marker[0].length;
    }
    if (spoken) content += source.slice(position);
    if (!content && source) continue;

    paragraphs.push(content
      .trim()
      .replace(LEADING_TIME, '')
      .replace(/^(?:[-+*>]|\d+[.)])\s+/, '')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
      .replace(/\[([^\[\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\[(?:pause|beat)(?:\s+[^\]]+)?\]|\((?:pause|beat)\)/gi, ' ... ')
      .replace(/\[(?:laughs?|sighs?|shivering|whispering|breath(?:e|ing)?)\]/gi, '')
      .replace(/(\*\*|__|\*|_|\x60|~~)(.+?)\1/g, '$2')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s+([,.!?])/g, '$1')
      .replace(/\.{4,}/g, '...')
      .trim());
  }

  return paragraphs.join('\n').split(/\n{2,}/)
    .map(paragraph => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean).join('\n\n');
}

export function blueprintVoiceover(blueprint: Blueprint) {
  return blueprint.shots.map(shot => cleanVoiceover(shot.narration)).filter(Boolean).join('\n\n');
}

export function countSpokenWords(text: string) {
  return text.match(WORD)?.length ?? 0;
}

export function estimatedSpeakingSeconds(words: number, wordsPerMinute: number) {
  if (!Number.isFinite(words) || !Number.isFinite(wordsPerMinute) || words <= 0 || wordsPerMinute <= 0) return 0;
  return Math.max(1, Math.round(words * 60 / wordsPerMinute));
}

export function isVisualExportModel(value: unknown): value is VisualExportModel {
  return VISUAL_EXPORT_MODELS.some(model => model === value);
}

export function defaultVisualExportModel(engine: string): VisualExportModel {
  if (engine === 'Google Flow / Veo') return 'Veo 3';
  if (engine === 'Runway') return 'Runway Gen-4';
  return isVisualExportModel(engine) ? engine : 'Generic Universal';
}

export function formatVisualExport(shot: Shot, blueprint: Blueprint, model: VisualExportModel) {
  const {ratio} = FORMATS.find(format => format.id === blueprint.format) ?? FORMATS[0];
  const frame = 'Frame the scene in ' + ratio + '.';
  const style = 'Visual direction — ' + blueprint.style;
  const camera = 'Camera — ' + shot.camera;
  const subject = 'Subject and continuity — ' + blueprint.character;
  if (model === 'Veo 3') return [subject, 'Action and setting — ' + shot.action, camera, style, 'Ambient audio — ' + shot.sound, frame].join('\n');
  if (model === 'Kling') return [frame, subject, 'Subject movement — ' + shot.action, camera, style, 'Maintain stable subject proportions, framing, and light across the motion.'].join('\n');
  if (model === 'Runway Gen-4') return [
    'Start from the approved reference image when available. Keep these details recognizable — ' + blueprint.character,
    'Focus on one physical action — ' + shot.action,
    camera, style, frame,
  ].join('\n');
  if (model === 'Midjourney') return [
    blueprint.character, shot.action, 'Composition — ' + shot.camera, style,
  ].join(' ').replace(/\s+/g, ' ').trim() + ' --ar ' + ratio + ' --stylize 250';
  return formatShot(shot, blueprint, 'Universal');
}

export function exportVisualBatch(blueprint: Blueprint, model: VisualExportModel) {
  return blueprint.shots.map((shot, index) =>
    'Scene ' + (index + 1) + ' — ' + shot.title + ' (' + shot.time + ')\n' + formatVisualExport(shot, blueprint, model),
  ).join('\n\n');
}

const SHOT_COLUMNS = [
  'Scene #', 'Est. Start (s)', 'Est. Duration (s)', 'Beat Purpose', 'Narration / VO Line',
  'Visual Prompt', 'Camera Movement', 'Audio / SFX Cue', 'Asset Status',
];

function csvCell(value: string | number) {
  if (typeof value === 'number') return String(value);
  const normalized = value.replace(/\r\n|\r|\n/g, '\r\n');
  // Keep text fields literal when a spreadsheet opens the CSV.
  const safeText = /^[\s\u200B-\u200D\uFEFF]*[=+\-@\t\r\n＝＋－＠]/.test(normalized) ? "'" + normalized : normalized;
  return '"' + safeText.replace(/"/g, '""') + '"';
}

function timecodeSeconds(timecode: string) {
  return timecode.split(':').reduce((seconds, part) => seconds * 60 + Number(part.replace(',', '.')), 0);
}

export function exportShotListCsv(blueprint: Blueprint, model: VisualExportModel) {
  const {seconds} = FORMATS.find(format => format.id === blueprint.format) ?? FORMATS[0];
  const sequence = blueprint.shots.map(shot => {
    const range = TIME_RANGE.exec(shot.time.trim());
    return range ? {start: timecodeSeconds(range[1]), end: timecodeSeconds(range[2])} : null;
  });
  const timed = sequence.every((range, index) => range && range.end > range.start
    && range.end <= seconds && range.start >= (sequence[index - 1]?.end ?? 0));
  const rows = blueprint.shots.map((shot, index) => {
    const range = timed ? sequence[index] : null;
    const start = range?.start ?? Math.round(index * seconds / blueprint.shots.length);
    const end = range?.end ?? Math.round((index + 1) * seconds / blueprint.shots.length);
    const duration = Number((end - start).toFixed(3));
    return [
      index + 1, start, duration, shot.title, cleanVoiceover(shot.narration), formatVisualExport(shot, blueprint, model),
      shot.camera, shot.sound, 'To create',
    ].map(csvCell).join(',');
  });
  return '\uFEFF' + [SHOT_COLUMNS.join(','), ...rows].join('\r\n') + '\r\n';
}

function validText(value: unknown, max = 5000): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

function isProjectBlueprint(value: unknown, options: Options): value is Blueprint {
  if (!value || typeof value !== 'object') return false;
  const blueprint = value as Partial<Blueprint>;
  const format = FORMATS.find(item => item.id === options.format);
  return blueprint.topic === options.topic.trim() && blueprint.format === options.format && blueprint.style === options.style
    && (blueprint.source === 'ai' || blueprint.source === 'template')
    && [blueprint.niche, blueprint.hook, blueprint.character, blueprint.thumbnail].every(field => validText(field))
    && Array.isArray(blueprint.shots) && blueprint.shots.length === format?.shots
    && blueprint.shots.every(shot => shot && typeof shot === 'object'
      && [shot.title, shot.action, shot.narration, shot.camera, shot.sound].every(field => validText(field))
      && validText(shot.time, 120))
    && Array.isArray(blueprint.editing) && blueprint.editing.length > 0 && blueprint.editing.length <= 8
    && blueprint.editing.every(field => validText(field));
}

type ImportedStudioProject = {
  options: Options;
  blueprint?: Blueprint;
  narration?: string;
  visualModel?: VisualExportModel;
};

export function parseStudioProject(value: unknown, nicheIds: string[]): ImportedStudioProject | null {
  if (!value || typeof value !== 'object') return null;
  const options = parseStudioDraft('options' in value ? value.options : value, nicheIds);
  if (!options) return null;
  if (!('type' in value) || value.type !== 'faceless-studio-draft' || !('version' in value) || value.version !== 2) {
    return {options};
  }
  if (!('blueprint' in value) || !isProjectBlueprint(value.blueprint, options)
    || !('narration' in value) || typeof value.narration !== 'string' || value.narration.length > VOICEOVER_TEXT_LIMIT
    || !('visualModel' in value) || !isVisualExportModel(value.visualModel)) return null;
  return {options, blueprint: value.blueprint, narration: value.narration, visualModel: value.visualModel};
}

export function exportStudioProject(options: Options, blueprint: Blueprint, narration: string, visualModel: VisualExportModel) {
  return JSON.stringify({type: 'faceless-studio-draft', version: 2, options, blueprint, narration, visualModel}, null, 2);
}
