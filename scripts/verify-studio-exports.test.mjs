import assert from 'node:assert/strict';
import {readdirSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const require = createRequire(import.meta.url);
const repo = fileURLToPath(new URL('../', import.meta.url));
const esbuildDir = readdirSync(new URL('../node_modules/.pnpm/', import.meta.url))
  .filter(name => name.startsWith('esbuild@')).sort().at(-1);
const esbuild = require('../node_modules/.pnpm/' + esbuildDir + '/node_modules/esbuild');
const compiled = await esbuild.build({
  stdin: {contents: "export * from './lib/studio-exports'; export {DEFAULT_OPTIONS} from './lib/studioOptions';", resolveDir: repo},
  bundle: true, write: false, platform: 'node', format: 'esm',
});
const {
  DEFAULT_OPTIONS, cleanVoiceover, blueprintVoiceover, countSpokenWords, estimatedSpeakingSeconds,
  exportVisualBatch, exportShotListCsv, exportStudioProject, parseStudioProject,
} = await import('data:text/javascript;base64,' + Buffer.from(compiled.outputFiles[0].contents).toString('base64'));

const sampleShot = {
  title: 'The "blue" kite',
  action: 'A kite rises over a quiet beach.\nKeep it above the horizon.',
  narration: '[VO] The kite rises. [PAUSE] Let it drift.',
  camera: 'Slow tilt upward',
  sound: 'Low wind',
  time: '0:00 – 0:10',
};
const blueprint = {
  topic: DEFAULT_OPTIONS.topic,
  niche: 'AI Cat & Pet Stories',
  format: DEFAULT_OPTIONS.format,
  style: DEFAULT_OPTIONS.style,
  hook: 'Start on the movement.',
  character: 'Handmade blue kite with a red tail',
  shots: Array.from({length: 6}, () => ({...sampleShot})),
  thumbnail: 'Leave open sky behind the kite.',
  editing: ['Check the horizon.'],
  source: 'template',
};

test('voiceover keeps spoken paragraphs and removes production instructions', () => {
  const raw = [
    '## Shot 1 (0:00 – 0:10)',
    '[VISUAL] The curtain opens',
    'A second line of directions',
    '[VO] **The kite rises.** [PAUSE] Let it drift. [SFX] Wind.',
    '',
    '## Shot 2',
    '[0:10] Follow [the red kite](https://example.org/kite).',
    '[CAMERA: fast pan]',
    '',
    '[Write the narration for the next scene.]',
    'No narration. Let the sound carry this beat.',
  ].join('\n');
  assert.equal(cleanVoiceover(raw), 'The kite rises... Let it drift.\n\nFollow the red kite.');
  assert.equal(cleanVoiceover('A kite [SFX: loud wind] flies.'), 'A kite flies.');
  assert.equal(blueprintVoiceover({shots: [{narration: '[SFX] Birds only'}, sampleShot]}), 'The kite rises... Let it drift.');
  assert.equal(countSpokenWords("A well-timed pause... don't count punctuation. Élan"), 7);
  assert.equal(estimatedSpeakingSeconds(160, 160), 60);
  assert.equal(estimatedSpeakingSeconds(1, 180), 1);
  assert.equal(estimatedSpeakingSeconds(8, 0), 0);
});

test('visual batch formats every shot without another tool’s parameters', () => {
  const veo = exportVisualBatch(blueprint, 'Veo 3');
  const kling = exportVisualBatch(blueprint, 'Kling');
  const runway = exportVisualBatch(blueprint, 'Runway Gen-4');
  assert.equal((veo.match(/^Scene \d+/gm) ?? []).length, 6);
  assert.match(veo, /Ambient audio — Low wind/);
  assert.match(kling, /Subject movement/);
  assert.match(runway, /approved reference image/);
  for (const batch of [veo, kling, runway, exportVisualBatch(blueprint, 'Generic Universal')]) {
    assert.doesNotMatch(batch, /--ar|--stylize|The kite rises\.\s+\[PAUSE\]/);
  }
  assert.equal((exportVisualBatch(blueprint, 'Midjourney').match(/--ar 9:16 --stylize 250/g) ?? []).length, 6);
  assert.match(exportVisualBatch({...blueprint, format: 'long'}, 'Midjourney'), /--ar 16:9 --stylize 250/);
});

test('shot CSV has a UTF-8 BOM, RFC-4180 records, quoted descriptions, and safe text cells', () => {
  const unsafe = {...sampleShot, title: '  =SUM(1,2)', camera: '＠A1', sound: 'She says "go"\nthen stops.', time: 'unavailable'};
  const csv = exportShotListCsv({...blueprint, shots: [sampleShot, unsafe, ...blueprint.shots.slice(2)]}, 'Veo 3');
  assert.equal(csv.codePointAt(0), 0xfeff);
  assert.match(csv, /^\uFEFFScene #,Est\. Start \(s\),Est\. Duration \(s\),Beat Purpose,Narration \/ VO Line,Visual Prompt,Camera Movement,Audio \/ SFX Cue,Asset Status\r\n/);
  assert.match(csv, /\r\n1,0,10,"The ""blue"" kite","The kite rises\.\.\. Let it drift\."/);
  assert.match(csv, /\r\n2,10,10,"'  =SUM\(1,2\)"/);
  assert.ok(csv.includes('"\'＠A1","She says ""go""\r\nthen stops.","To create"'));
  assert.equal(csv.replace(/\r\n/g, '').includes('\n'), false);
});

test('current backups round-trip and older drafts keep their original options', () => {
  const niches = [DEFAULT_OPTIONS.niche];
  const savedNarration = 'The first line is rewritten.';
  const project = JSON.parse(exportStudioProject(DEFAULT_OPTIONS, blueprint, savedNarration, 'Kling'));
  assert.deepEqual(parseStudioProject(project, niches), {
    options: DEFAULT_OPTIONS, blueprint, narration: savedNarration, visualModel: 'Kling',
  });
  assert.deepEqual(parseStudioProject({type: 'faceless-studio-draft', version: 1, options: DEFAULT_OPTIONS}, niches), {options: DEFAULT_OPTIONS});
  assert.deepEqual(parseStudioProject(DEFAULT_OPTIONS, niches), {options: DEFAULT_OPTIONS});
  assert.equal(parseStudioProject({...project, blueprint: {...blueprint, shots: [null]}}, niches), null);
  assert.equal(parseStudioProject({...project, blueprint: {...blueprint, topic: 'Different project'}}, niches), null);
  assert.equal(parseStudioProject(project, []), null);
});
