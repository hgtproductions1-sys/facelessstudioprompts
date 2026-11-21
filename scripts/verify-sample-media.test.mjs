import assert from 'node:assert/strict';
import test from 'node:test';
import {normalizeSampleOutput} from '../lib/sampleOutput.ts';

const cdn = {projectId: 'egy1s59p', dataset: 'production'};
const still = {
  id: 'fixture', mediaType: 'image', src: '/samples/niches/fixture/01.webp',
  alt: 'An illustrative test frame', width: 1200, height: 675, aspectRatio: '16:9',
  modelUsed: 'Fixture', promptExcerpt: 'A fixture prompt', capturedAt: '2026-11-21',
};
const video = {
  ...still, mediaType: 'video-loop', width: 720, height: 1280, aspectRatio: '9:16',
  src: 'https://cdn.sanity.io/files/egy1s59p/production/mock.mp4',
  webmSrc: 'https://cdn.sanity.io/files/egy1s59p/production/mock.webm',
  posterSrc: 'https://cdn.sanity.io/images/egy1s59p/production/mock-720x1280.webp',
  durationSeconds: 3.5,
};

test('only accepts optimized still frames at the documented aspect and width', () => {
  assert.equal(normalizeSampleOutput(still, cdn)?.src, still.src);
  assert.equal(normalizeSampleOutput({...still, width: 1600, height: 900}, cdn), undefined);
  assert.equal(normalizeSampleOutput({...still, width: 900}, cdn), undefined);
  assert.equal(normalizeSampleOutput({...still, src: '/samples/fixture.jpg'}, cdn), undefined);
  assert.equal(normalizeSampleOutput({...still, capturedAt: '2026-02-30'}, cdn), undefined);
});

test('requires two safe loop encodings, a poster and measured duration', () => {
  assert.equal(normalizeSampleOutput(video, cdn)?.mediaType, 'video-loop');
  for (const patch of [
    {webmSrc: undefined}, {posterSrc: undefined}, {durationSeconds: 4.2}, {width: 900, height: 1600},
    {src: 'https://cdn.sanity.io/files/other-project/production/mock.mp4'},
    {posterSrc: 'https://cdn.sanity.io/images/egy1s59p/production/mock.webp?redirect=1'},
    {posterSrc: 'https://cdn.sanity.io.evil.invalid/images/egy1s59p/production/mock.webp'},
    {posterSrc: '/samples/../mock.webp'}, {posterSrc: '//cdn.sanity.io/mock.webp'},
  ]) assert.equal(normalizeSampleOutput({...video, ...patch}, cdn), undefined);
});
