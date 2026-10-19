import {spawnSync} from 'node:child_process';
import {rmSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));

// Regenerate pages and styles together rather than reusing stale build output.
rmSync(join(root,'.next'),{recursive:true,force:true});
const result=spawnSync(process.execPath,[join(root,'node_modules/next/dist/bin/next'),'build'],{
  cwd:root,
  stdio:'inherit',
});

if(result.error)console.error('Next.js build could not start:',result.error.message);
process.exit(result.status??1);
