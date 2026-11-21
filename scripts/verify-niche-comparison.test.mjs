import assert from 'node:assert/strict';
import test from 'node:test';
import {NICHE_SLUGS} from '../data/niches.ts';
import {compareNicheRows, matchesNicheComparison, NICHE_COMPARISON, NICHE_COMPARISON_FILTERS, NICHE_SORT_COLUMNS} from '../data/nicheComparison.ts';

const rows = NICHE_SLUGS.map(slug => ({slug, name: slug, ...NICHE_COMPARISON[slug]}));

test('all 24 existing playbooks have complete comparison rows', () => {
  assert.equal(rows.length, 24);
  assert.deepEqual(Object.keys(NICHE_COMPARISON).toSorted(), NICHE_SLUGS.toSorted());
  assert(rows.every(row => /\d/.test(row.typicalVideoLength)));
  assert(rows.every(row => [1, 2, 3].includes(row.beginnerFriendlyScore)));
  assert(rows.every(row => /^Standard|^Elevated/.test(row.policyDisclosureSensitivity)));
});

test('comparison filters keep both layouts and distinguish optional narration', () => {
  assert.equal(rows.filter(row => matchesNicheComparison(row, 'all')).length, 24);
  for (const [key] of NICHE_COMPARISON_FILTERS.slice(1)) {
    const matching = rows.filter(row => matchesNicheComparison(row, key));
    assert(matching.length > 0 && matching.length < 24, key);
  }
  const both = rows.find(row => row.primaryFormat === 'Both');
  assert(matchesNicheComparison(both, 'shorts'));
  assert(matchesNicheComparison(both, 'long'));
  assert(rows.filter(row => matchesNicheComparison(row, 'no-voiceover')).every(row => row.voiceoverType !== 'Required (AI or Human)'));
});

test('each sortable column supplies a stable comparison rank', () => {
  for (const [key] of NICHE_SORT_COLUMNS) {
    const ranked = rows.toSorted((a, b) => compareNicheRows(a, b, key));
    assert.equal(new Set(ranked.map(row => row.slug)).size, 24);
    assert(ranked.every((row, index) => index === 0 || compareNicheRows(ranked[index - 1], row, key) <= 0), key);
  }
});
