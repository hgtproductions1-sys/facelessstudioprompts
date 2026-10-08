import assert from 'node:assert/strict';
import { default as worker } from '../../.vercel/output/functions/__server.func/index.mjs';
// Deliberately long topic: the previous sanitizer cut it to "the an ... wearing a".
const topic = 'An orange kitten wearing a yellow scarf repairs a broken birdhouse, then watches a sparrow move in.';
const script = [
 'An orange kitten found a broken birdhouse beside the old tree in the garden.',
 'Wearing its yellow scarf, it gathered tools and carefully fitted the loose wooden roof.',
 'It tapped the nails into place, then brushed every sharp splinter from the entrance.',
 'A little sparrow watched from a branch before hopping down to inspect the doorway.',
 'The kitten stepped back quietly, letting its new neighbor settle into a warm home.',
];
const draft = {
 character: { archetype:'Orange kitten', physicalDescription:'An orange kitten wearing a yellow scarf.', voiceSpec:{'Voice Type':'Warm narrator'}, hooks:[{label:'Opening',text:'A broken birdhouse needed a very small builder.'}],cueSheet:script.map((line,i)=>({timestamp:`0:${i*6}`,line,cue:''})),retentionBeats:['0:00 — The broken birdhouse','0:12 — A careful repair','0:24 — A new neighbor'] },
 visual:{styleDNA:['3D'],masterPrompt:'An orange kitten wearing a yellow scarf repairs a wooden birdhouse in a sunlit garden.',negativePrompt:'text, watermark',leonardoPrompt:'An orange kitten in a yellow scarf repairing a birdhouse.',midjourneyPrompt:'An orange kitten in a yellow scarf repairing a birdhouse.',googleFlowPrompt:'A kitten in a yellow scarf taps a nail into the birdhouse roof.'},
 camera:{shots:['Push-in','Tracking shot','Orbit','Pull-out'].map(motion=>({motion,transition:'Hard cut',animationCue:'The orange kitten wearing a yellow scarf taps a nail into a wooden birdhouse in a sunlit garden.'})),soundDesign:['Soft hammer taps and a sparrow chirping']},
 variation:{hookStyle:'A visual problem',storyStructure:'Repair and arrival',pacingProfile:'Energetic action',editingStyle:'Four clear shots',emotionalTone:'Warm',copyPastePrompt:'Keep the kitten orange and the scarf yellow. Change the first view of the broken birdhouse.'},
};
process.env.GLM_API_KEY='regression-test-only'; delete process.env.LOVABLE_API_KEY;
const request=async (overrides={})=>worker.fetch(new Request('https://example.test/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({niche:'AI Cat & Pet Stories',topic,pacing:'fast',vibe:'render3d',...overrides})}),{}, {waitUntil(){}});
const reply=p=>Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(p)}}]});
let calls=0;
globalThis.fetch=async()=>++calls===1?Response.json({choices:[{message:{content:null}}]}):reply(draft);
let res=await request();assert.equal(res.status,200);assert.equal(calls,2);let p=(await res.json()).package;
assert.equal(p.topic,topic);assert.ok(p.camera.shots.every(s=>s.prompt.startsWith(s.motion+': ') && s.prompt.includes('yellow scarf')));
assert.ok(!JSON.stringify(p).includes('the an '));assert.ok(!p.visual.masterPrompt.includes('--'));
assert.equal(p.camera.overview['Avg Shot Length'],'7.5s');assert.equal(p.character.cueSheet.length,5);
calls=0;globalThis.fetch=async()=>{calls++;return reply({...draft,character:{...draft.character,cueSheet:[{timestamp:'0:00',line:'Too short.',cue:''}]}})};
res=await request();assert.equal(res.status,502);assert.equal(calls,2);assert.ok(!(await res.json()).package);
const silent={...draft,camera:{...draft.camera,soundDesign:['Water spray on the truck panels','Soft brushing on wet paint']}};
globalThis.fetch=async()=>reply(silent);
res=await request({niche:'AI Car Wash & Restoration',topic:'Wash a red pickup truck. No voiceover, only water and brush sounds.',pacing:'slow'});
assert.equal(res.status,200);p=(await res.json()).package;assert.equal(p.narrationMode,'ambient');assert.deepEqual(p.character.cueSheet,[]);assert.equal(p.character.voiceSpec['Pace (WPM)'],'Not applicable');
calls=0;globalThis.fetch=async()=>{calls++;return new Response('',{status:401})};res=await request();assert.equal(res.status,503);assert.equal(calls,1);assert.match((await res.json()).error,/credentials/);
// A full provider timeout must not trigger a second 85-second request.
const originalSetTimeout = globalThis.setTimeout;
globalThis.setTimeout = (callback, delay, ...args) => originalSetTimeout(callback, delay === 85000 ? 5 : delay, ...args);
calls = 0;
globalThis.fetch = async (_url, options) => {
 calls++;
 assert.equal(JSON.parse(options.body).reasoning_effort, 'low');
 return new Promise((_resolve, reject) => options.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true }));
};
try {
 res = await request();
 assert.equal(res.status, 504);
 assert.equal(calls, 1);
 assert.match((await res.json()).error, /took too long/);
} finally { globalThis.setTimeout = originalSetTimeout; }
console.log('PASS: retry, quality rejection, full subject preservation, consistent movement, neutral image prompts, silent mode and auth errors.');
process.exit(0);
