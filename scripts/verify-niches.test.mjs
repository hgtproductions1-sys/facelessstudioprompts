import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {NICHE_IMAGES} from '../data/nicheImages.ts';
import {NICHE_LINKS, NICHE_PAGES} from '../data/niches.ts';
import {responsiveImage} from '../lib/images.ts';
import {getRelatedNiches} from '../lib/relatedNiches.ts';

test('all playbooks recommend three distinct, deterministic alternatives', () => {
  assert.deepEqual(NICHE_LINKS.map(niche => niche.slug), NICHE_PAGES.map(niche => niche.slug));
  for (const {slug, category} of NICHE_LINKS) {
    assert.ok(category, slug + ' must resolve to a directory category');
    const result = getRelatedNiches(NICHE_LINKS, slug);
    assert.equal(result.length, 3, slug);
    assert.equal(new Set(result.map(niche => niche.slug)).size, 3, slug);
    assert.ok(result.every(niche => niche.slug !== slug), slug);
    assert.deepEqual(result, getRelatedNiches(NICHE_LINKS, slug), slug);
    if (NICHE_LINKS.some(niche => niche.slug !== slug && niche.category === category)) {
      assert.equal(result[0].category, category, slug);
    }
  }
});

test('related playbooks handle a limited candidate pool and duplicate slugs', () => {
  const niches = ['one', 'two', 'two', 'three'].map(slug => ({slug, category: 'category'}));
  const result = getRelatedNiches(niches, 'one').map(niche => niche.slug);
  assert.deepEqual(new Set(result), new Set(['two', 'three']));
  assert.equal(result.length, 2);
  assert.deepEqual(getRelatedNiches(niches, 'one', 0), []);
});

test('all niche card summaries are distinct and complete', () => {
  const summaries = NICHE_PAGES.map(niche => niche.shortSummary);
  assert.equal(new Set(summaries).size, NICHE_PAGES.length);
  for (const {slug, shortSummary} of NICHE_PAGES) {
    assert.ok(shortSummary.length >= 110 && shortSummary.length <= 145, slug);
    assert.match(shortSummary, /^[A-Z].+\.$/, slug);
  }
});

test('all niche playbooks have distinct covers with responsive WebP files', () => {
  const covers = new Set();
  const fingerprints = new Set();

  for (const {slug} of NICHE_PAGES) {
    const image = NICHE_IMAGES[slug];
    assert.ok(image?.alt.trim(), slug + ' needs a cover with alt text');
    assert.match(image.src, /^\/[a-z0-9/_-]+\.webp$/, slug);
    assert.ok(!covers.has(image.src), slug + ' reuses the cover ' + image.src);
    covers.add(image.src);

    const sources = responsiveImage(image.src).srcSet?.split(', ').map(source => source.split(' ')[0]);
    assert.equal(new Set(sources).size, 3, slug + ' needs three cover sizes');
    assert.ok(sources.includes(image.src), slug + ' cover must appear in its source set');

    for (const source of sources) {
      const file = readFileSync(new URL('../public' + source, import.meta.url));
      assert.equal(file.toString('ascii', 0, 4), 'RIFF', source);
      assert.equal(file.toString('ascii', 8, 12), 'WEBP', source);
      if (source === image.src) {
        const fingerprint = createHash('sha256').update(file).digest('hex');
        assert.ok(!fingerprints.has(fingerprint), slug + ' uses duplicate cover artwork');
        fingerprints.add(fingerprint);
      }
    }
  }
});
