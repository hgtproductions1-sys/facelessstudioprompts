import assert from 'node:assert/strict';
import test from 'node:test';
import {getModelHub, getModelHubPrompts, modelHubs} from '../data/modelPromptHubs.ts';
import {PROMPTS} from '../data/promptLibrary.ts';

test('canonical prompts declare reviewed, unique model tags', () => {
  const models = new Set(['veo-3', 'kling', 'midjourney', 'runway', 'leonardo', 'elevenlabs']);
  for (const prompt of PROMPTS) {
    assert(Array.isArray(prompt.compatibleModels), prompt.id);
    assert(prompt.compatibleModels.every(model => models.has(model)), prompt.id);
    assert.equal(new Set(prompt.compatibleModels).size, prompt.compatibleModels.length, prompt.id);
  }
  assert.deepEqual(PROMPTS.find(prompt => prompt.id === 'seo-title-generator')?.compatibleModels, []);
  assert.deepEqual(PROMPTS.find(prompt => prompt.id === 'img-nano-banana-portrait')?.compatibleModels, []);
  assert.deepEqual(PROMPTS.find(prompt => prompt.id === 'char-voice-profile')?.compatibleModels, ['elevenlabs']);
});

test('model hubs have unique slugs, sufficiently deep guidance and relevant choices', () => {
  const promptIds = new Set(PROMPTS.map(prompt => prompt.id));
  assert.deepEqual(modelHubs.map(hub => hub.slug), ['veo-3', 'kling', 'midjourney']);
  for (const hub of modelHubs) {
    assert(!promptIds.has(hub.slug), hub.slug);
    assert.equal(getModelHub(hub.slug), hub);
    assert.equal(hub.failures.length, 3, hub.slug);

    const copy = [
      hub.intro,
      ...hub.sections.flatMap(section => section.paragraphs),
      hub.example.text,
      ...hub.failures.flatMap(failure => [failure.symptom, failure.fix]),
    ].join(' ');
    const wordCount = copy.split(/\s+/).length;
    assert(wordCount >= 500 && wordCount <= 700, hub.slug + ' guidance length ' + wordCount);

    const compatible = getModelHubPrompts(hub, PROMPTS);
    assert(compatible.length >= 8, hub.slug);
    assert(compatible.every(prompt => promptIds.has(prompt.id) && prompt.compatibleModels.includes(hub.slug)), hub.slug);
    assert(compatible.every(prompt => hub.slug === 'midjourney'
      ? ['Image Gen', 'Character'].includes(prompt.category)
      : ['Video Gen', 'Niche'].includes(prompt.category)), hub.slug);
  }
  assert.equal(getModelHub('unsupported'), undefined);
});
