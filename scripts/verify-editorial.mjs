import {createRequire} from 'node:module';
import {mkdirSync, readdirSync, rmSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

const require = createRequire(import.meta.url);
const esbuildDir = readdirSync('node_modules/.pnpm').filter(n => /^esbuild@/.test(n)).sort().at(-1);
const esbuild = require('../node_modules/.pnpm/' + esbuildDir + '/node_modules/esbuild');
const realSanity = require.resolve('next-sanity');
const out = '.sites-runtime/verification/verify-editorial.mjs';
mkdirSync('.sites-runtime/verification', {recursive: true});
await esbuild.build({
  entryPoints: ['scripts/verify-editorial.tsx'], outfile: out, bundle: true,
  platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic', tsconfig: 'tsconfig.json',
  plugins: [{name: 'cms-boundary-tests', setup(b) {
    b.onResolve({filter: /next-sanity[\\/]dist[\\/]index\.js$/}, a => ({path: pathToFileURL(a.path).href, external: true}));
    b.onResolve({filter: /^next\/(navigation|link)$/}, a => ({path: a.path + '.js', external: true}));
    b.onResolve({filter: /^server-only$/}, () => ({path: 'server-only', namespace: 'test-stub'}));
    b.onLoad({filter: /.*/, namespace: 'test-stub'}, () => ({contents: 'export {};'}));
    b.onResolve({filter: /^next-sanity\/draft-mode$/}, () => ({path: 'preview', namespace: 'draft-guard'}));
    b.onLoad({filter: /.*/, namespace: 'draft-guard'}, () => ({contents: 'export function defineEnableDraftMode() { throw new Error("Unconfigured preview must stop before creating the draft handler"); }'}));
    b.onResolve({filter: /^next-sanity$/}, () => ({path: 'client', namespace: 'mock-cms'}));
    b.onLoad({filter: /.*/, namespace: 'mock-cms'}, () => ({contents: `
      export * from ${JSON.stringify(realSanity)};
      export function createClient(config) {
        return {fetch: (query, params, options) => globalThis.__cmsFetch(query, params, options),
          withConfig: (extra) => createClient({...config, ...extra})};
      }
    `, resolveDir: process.cwd()}));
  }}], logLevel: 'error',
});
process.env.SANITY_ENABLED = 'true';
try { await import(pathToFileURL(process.cwd() + '/' + out).href); }
finally { rmSync(out, {force: true}); }
