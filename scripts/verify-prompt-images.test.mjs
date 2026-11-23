import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {PROMPTS} from '../data/promptLibrary.ts';

function dimensions(bytes) {
  assert.equal(bytes.toString('ascii',0,4),'RIFF');
  assert.equal(bytes.toString('ascii',8,12),'WEBP');
  for(let offset=12;offset+8<bytes.length;){
    const type=bytes.toString('ascii',offset,offset+4);
    const size=bytes.readUInt32LE(offset+4);
    const data=offset+8;
    if(type==='VP8 ')return [bytes.readUInt16LE(data+6)&0x3fff,bytes.readUInt16LE(data+8)&0x3fff];
    if(type==='VP8L'){
      const bits=bytes.readUInt32LE(data+1);
      return [(bits&0x3fff)+1,((bits>>>14)&0x3fff)+1];
    }
    if(type==='VP8X')return [bytes.readUIntLE(data+4,3)+1,bytes.readUIntLE(data+7,3)+1];
    offset=data+size+(size%2);
  }
  throw Error('Image dimensions missing');
}

test('every published prompt has unique, descriptive artwork and three valid responsive sizes',async()=>{
  const images=JSON.parse(await readFile(new URL('../data/promptImages.generated.json',import.meta.url),'utf8'));
  assert.deepEqual(Object.keys(images).sort(),PROMPTS.map(p=>p.id).sort());
  const hashes=new Set();
  for(const prompt of PROMPTS){
    const image=images[prompt.id];
    assert.equal(image.src,`/prompt-images/${prompt.id}.webp`);
    assert.ok(image.alt.trim().length>20,`Descriptive alt missing: ${prompt.id}`);
    assert.deepEqual([image.width,image.height],[1280,720]);
    for(const width of [1280,800,480]){
      const src=image.src.replace('.webp',(width===1280?'':`-${width}`)+'.webp');
      const bytes=await readFile(new URL('../public'+src,import.meta.url));
      assert.deepEqual(dimensions(bytes),[width,width*9/16],src);
      if(width===1280){
        const hash=createHash('sha256').update(bytes).digest('hex');
        assert.ok(!hashes.has(hash),`Artwork reused for ${prompt.id}`);
        hashes.add(hash);
      }
    }
  }
  assert.equal(hashes.size,PROMPTS.length);
});
