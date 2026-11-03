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
await esbuild.build({entryPoints:['scripts/verify-site.tsx'],outfile:out,bundle:true,platform:'node',format:'esm',packages:'external',plugins:[{name:'next-node-import',setup(b){b.onResolve({filter:/^next\/(navigation|link)$/},args=>({path:args.path+'.js',external:true}));b.onResolve({filter:/^server-only$/},()=>({path:'server-only',namespace:'server-verification'}));b.onLoad({filter:/.*/,namespace:'server-verification'},()=>({contents:'export {};',loader:'js'}));}}],loader:{'.css':'empty'},jsx:'automatic',tsconfig:'tsconfig.json',logLevel:'error'});
try{await import(pathToFileURL(process.cwd()+'/'+out).href);}finally{rmSync(out,{force:true});}

