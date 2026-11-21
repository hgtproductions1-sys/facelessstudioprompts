import assert from 'node:assert/strict';
import test from 'node:test';
import {NICHE_LINKS, NICHE_PAGES} from '../data/niches.ts';
import {getRelatedNiches} from '../lib/relatedNiches.ts';

test('all 24 playbooks recommend three distinct, deterministic alternatives', () => {
  assert.equal(NICHE_LINKS.length, 24);
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
  assert.equal(new Set(summaries).size, 24);
  for (const {slug, shortSummary} of NICHE_PAGES) {
    assert.ok(shortSummary.length >= 110 && shortSummary.length <= 145, slug);
    assert.match(shortSummary, /^[A-Z].+\.$/, slug);
  }
});
