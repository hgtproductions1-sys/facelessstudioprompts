import {createRequire} from 'node:module';
import {mkdirSync,readdirSync,rmSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
// Verify the repository's existing pages without depending on remote CMS content.
process.env.SANITY_ENABLED='false';
const esbuildDir=readdirSync('node_modules/.pnpm').filter(n=>/^esbuild@/.test(n)).sort().at(-1);
const esbuild=require('../node_modules/.pnpm/'+esbuildDir+'/node_modules/esbuild');
const dir='.sites-runtime/verification';mkdirSync(dir,{recursive:true});
const out=dir+'/verify-site.mjs';
await esbuild.build({
  entryPoints:['scripts/verify-site.tsx'], outfile:out, bundle:true,
  platform:'node', format:'esm', packages:'external', loader:{'.css':'empty'},
  jsx:'automatic', tsconfig:'tsconfig.json', logLevel:'error',
  plugins:[{name:'next-node-import',setup(build){
    build.onResolve({filter:/^next\/(navigation|link|image|server)$/},args=>({path:args.path+'.js',external:true}));
    build.onResolve({filter:/^server-only$/},()=>({path:'server-only',namespace:'server-verification'}));
    build.onLoad({filter:/.*/,namespace:'server-verification'},()=>({contents:'export {};',loader:'js'}));
    build.onResolve({filter:/\.module\.css$/},args=>({path:args.path,namespace:'css-module-verification'}));
    build.onLoad({filter:/.*/,namespace:'css-module-verification'},()=>({
      contents:'export default new Proxy({}, {get:(_target,key)=>String(key)});',loader:'js',
    }));
  }}],
});
try{await import(pathToFileURL(process.cwd()+'/'+out).href);}finally{rmSync(out,{force:true});}

