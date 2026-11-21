import assert from 'node:assert/strict';
import {readdirSync} from 'node:fs';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL('../', import.meta.url));
const esbuildDir = readdirSync(new URL('../node_modules/.pnpm/', import.meta.url))
  .filter(name => name.startsWith('esbuild@')).sort().at(-1);
const esbuild = require('../node_modules/.pnpm/' + esbuildDir + '/node_modules/esbuild');
const built = await esbuild.build({
  stdin: {contents: [
    "export * from './lib/creator-tools';",
    "export * from './lib/blueprint';",
    "export * from './data/freeToolPages';",
  ].join('\n'), resolveDir: root},
  bundle: true, write: false, platform: 'node', format: 'esm',
  tsconfig: fileURLToPath(new URL('../tsconfig.json', import.meta.url)),
});
const {
  buildShortsHooks, compileMasterBrief, compileScriptOutline, buildTemplate, DEFAULT_OPTIONS, FORMATS,
  HOOK_PATTERNS, SCRIPT_FORMATS, FREE_TOOL_PAGES, getFreeToolPage, pacingForDuration, pacingForScript,
} = await import('data:text/javascript;base64,' + Buffer.from(built.outputFiles[0].contents).toString('base64'));

test('eight distinct hooks match each chosen pattern and retain topic and niche direction', () => {
  for (const pattern of HOOK_PATTERNS) {
    const hooks = buildShortsHooks('A folded paper hinge', pattern, 'Show the crease at phone size.');
    assert.equal(hooks.length, 8);
    assert.equal(new Set(hooks.map(hook => hook.line)).size, 8);
    assert.equal(new Set(hooks.map(hook => hook.visual)).size, 8);
    assert.ok(hooks.every(hook => hook.visual.includes('A folded paper hinge') && hook.visual.includes('Show the crease')));
  }
  assert.deepEqual(buildShortsHooks(' ', HOOK_PATTERNS[0], ''), []);
});

test('script formats keep exact running times and Studio handoff keeps compatible IDs', () => {
  assert.equal(FORMATS.filter(format => ['short','story','long','documentary'].includes(format.id)).length, 4);
  for (const format of SCRIPT_FORMATS) {
    const options = {...DEFAULT_OPTIONS, topic: 'Paper hinge comparison', format: format.id};
    const beats = compileScriptOutline({topic: options.topic, tone: 'Documentary', hook: 'Visual Reveal', format: format.id, nicheCue: 'Show the hinge'});
    assert.equal(beats[0].start, 0);
    assert.equal(beats.at(-1).end, format.seconds);
    assert.ok(beats.slice(1).every((beat, index) => beat.start === beats[index].end));
    assert.equal(beats[0].note, 'Show the hinge');
    assert.match(beats[1].narration, /Paper hinge comparison/);
    const blueprint = buildTemplate(options);
    const final = Math.floor(format.seconds / 60) + ':' + String(format.seconds % 60).padStart(2, '0');
    assert.ok(blueprint.shots.at(-1).time.endsWith(final));
    assert.ok(compileMasterBrief(options).includes(format.seconds + ' seconds'));
  }
});

test('voiceover calculator estimates both directions and labels cuts as a range', () => {
  assert.deepEqual(pacingForDuration(45, 165), {words: 124, cuts: [9, 12]});
  assert.deepEqual(pacingForDuration(0, 165), {words: 0, cuts: [0, 0]});
  assert.deepEqual(pacingForScript(Array.from({length: 160}, () => 'word').join(' '), 160), {words: 160, seconds: 60});
  assert.deepEqual(pacingForScript(' \n', 160), {words: 0, seconds: 0});
});

test('registry has distinct search pages and the complete visible sample and pacing content', () => {
  assert.equal(FREE_TOOL_PAGES.length, 3);
  assert.equal(new Set(FREE_TOOL_PAGES.map(tool => tool.seoTitle)).size, 3);
  const script = getFreeToolPage('faceless-video-script-generator');
  assert.equal(script.samples.length, 3);
  assert.equal(script.faq.length, 5);
  assert.equal(script.pacingTable.rows.length, 7);
  assert.equal(getFreeToolPage('unknown-tool'), undefined);
});
