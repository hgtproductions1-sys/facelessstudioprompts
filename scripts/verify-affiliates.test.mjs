import assert from 'node:assert/strict';
import test from 'node:test';
import baseline from '../seo-baseline.json' with {type: 'json'};
import {affiliateDisclosureStatus, affiliateTools, hasActiveAffiliateLinks, resolveAffiliate, resolveNicheProductionStack} from '../lib/affiliates.ts';
import {NICHE_SLUGS} from '../data/niches.ts';

const off = {NEXT_PUBLIC_AFFILIATES_ENABLED: 'false', NEXT_PUBLIC_AFFILIATE_RUNWAY: 'https://example.com/track?ref=fixture'};
const on = {...off, NEXT_PUBLIC_AFFILIATES_ENABLED: 'true'};

test('direct links preserve untracked official URLs when disabled', () => {
  assert.equal(hasActiveAffiliateLinks(off), false);
  assert.match(affiliateDisclosureStatus(off), /direct provider links/);
  for (const [id, tool] of Object.entries(affiliateTools)) {
    const link = resolveAffiliate(id, off);
    assert.equal(link.href, tool.directUrl);
    assert.equal(link.isAffiliateActive, false);
    assert.equal(link.target, '_blank');
    assert.equal(link.rel, 'noopener noreferrer');
  }
});

test('only an enabled and configured safe link is sponsored', () => {
  const link = resolveAffiliate('runway', on);
  assert.equal(link.href, on.NEXT_PUBLIC_AFFILIATE_RUNWAY);
  assert(link.isAffiliateActive);
  assert.equal(link.rel, 'sponsored noopener noreferrer');
  assert.equal(link.target, '_blank');
  assert.equal(resolveAffiliate('kling', on).rel, 'noopener noreferrer');
  assert.match(affiliateDisclosureStatus(on), /affiliate tracking/);
  for (const url of [
    'javascript:alert(1)', 'https://127.0.0.1/private', 'https://www.something.local/', 'https://user:password@example.com/',
    'https://example.com:8443/', 'https://example.com/line\nbreak', affiliateTools.runway.directUrl,
  ]) assert.equal(resolveAffiliate('runway', {...on, NEXT_PUBLIC_AFFILIATE_RUNWAY: url}).isAffiliateActive, false);
});

test('existing niche stacks are preserved and configured stacks use distinct, disclosed links', () => {
  const existingSlugs = baseline.routes.filter(({path}) => path.startsWith('/niches/')).map(({path}) => path.slice('/niches/'.length));
  for (const slug of existingSlugs) {
    assert(NICHE_SLUGS.includes(slug), slug);
    assert(resolveNicheProductionStack(slug, off).length >= 2, slug);
  }
  for (const slug of NICHE_SLUGS) {
    const stack = resolveNicheProductionStack(slug, off);
    if (!stack.length) continue;
    assert(stack.length >= 2 && stack.length <= 4, slug);
    assert.equal(new Set(stack.map(entry => entry.tool)).size, stack.length, slug);
    assert(stack.every(entry => !entry.link.isAffiliateActive), slug);
  }
  assert(resolveNicheProductionStack('ai-cat-and-pet-stories', on).some(entry => entry.link.isAffiliateActive));
  assert(!resolveNicheProductionStack('ai-asmr-cooking-cleaning-restoration', on).some(entry => entry.link.isAffiliateActive));
  assert.deepEqual(resolveNicheProductionStack('__proto__', on), []);
});
