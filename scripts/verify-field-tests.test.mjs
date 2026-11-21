import assert from 'node:assert/strict';
import test from 'node:test';
import {normalizeFieldTest} from '../lib/fieldTest.ts';
import {sampleAssetUrl} from '../lib/sampleOutput.ts';

const cdn = {projectId: 'egy1s59p', dataset: 'production'};
const resolveImage = src => sampleAssetUrl(src, 'image', cdn);
const note = {
  title: 'Field test fixture',
  toolVersion: 'Fixture',
  testedDate: '2025-10-10',
  takeOneIssue: 'Original observation',
  promptFixApplied: 'Change to compare',
  takeTwoOutcome: 'Second observation',
};

test('empty, incomplete, future and impossible field tests are hidden', () => {
  for (const invalid of [
    undefined, {}, {...note, takeTwoOutcome: ' '}, {...note, testedDate: '2026-02-30'}, {...note, testedDate: '2999-01-01'},
  ]) assert.equal(normalizeFieldTest(invalid, resolveImage), undefined);
});

test('an observed note can be complete without images', () => {
  const parsed = normalizeFieldTest(note, resolveImage);
  assert.equal(parsed?.promptFixApplied, note.promptFixApplied);
  assert.equal(parsed?.before, undefined);
  assert.equal(parsed?.after, undefined);
});

test('an attached frame needs a matching permitted path, alt and dimensions', () => {
  const before = {beforeImageSrc: '/samples/niches/test/01.webp', beforeImageAlt: 'Frame fixture', beforeImageWidth: 900, beforeImageHeight: 506};
  assert.equal(normalizeFieldTest({...note, ...before}, resolveImage)?.before?.src, before.beforeImageSrc);
  assert.equal(normalizeFieldTest({...note, ...before, beforeImageAlt: undefined}, resolveImage), undefined);
  assert.equal(normalizeFieldTest({...note, ...before, beforeImageSrc: 'https://example.com/01.webp'}, resolveImage), undefined);
  assert.equal(normalizeFieldTest({...note, ...before, beforeImageWidth: 1500}, resolveImage), undefined);
});
