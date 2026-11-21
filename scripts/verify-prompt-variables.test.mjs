import assert from 'node:assert/strict';
import test from 'node:test';
import { fillPrompt, parsePromptVariables, studioPromptHref } from '../lib/prompt-variables.ts';

test('normalizes shared fields and preserves literal Markdown links', () => {
  const prompt = '[PASTE YOUR TOPIC] and [VIDEO TOPIC]\n[YOUR NICHE] · [SOURCE](https://example.com) · [ERA OR DECADE]';
  const { fields, segments } = parsePromptVariables(prompt, 'first');
  assert.deepEqual(fields.map(({key})=>key),['TOPIC','NICHE','first:ERA OR DECADE']);
  assert.equal(fillPrompt(segments,{}),prompt);
  assert.equal(fillPrompt(segments,{TOPIC:'Film history',NICHE:'AI ASMR','first:ERA OR DECADE':'1970s'}),
    'Film history and Film history\nAI ASMR · [SOURCE](https://example.com) · 1970s');
  assert.notEqual(parsePromptVariables('[ERA OR DECADE]','second').fields[0].key,fields[2].key);
  assert.equal(fillPrompt(segments,{TOPIC:'[YOUR NICHE]',NICHE:'Cats'}).startsWith('[YOUR NICHE] and [YOUR NICHE]'),true);
});

test('encodes a topic for Studio and validates the niche against existing playbooks', () => {
  const niches=[{slug:'ai-asmr',name:'AI ASMR'}];
  assert.equal(studioPromptHref({TOPIC:'Rain & glass',NICHE:'AI ASMR'},niches),'/studio?topic=Rain+%26+glass&niche=ai-asmr');
  assert.equal(studioPromptHref({TOPIC:'ab',NICHE:'other'},niches),'/studio');
});
