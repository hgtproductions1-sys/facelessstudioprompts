# The Faceless Prompts upgrade handoff

21 November 2026

- Website branch **upgrade/seo-safe**, based on deployed source 1ffcb00.
- Sanity Studio branch **upgrade/seo-safe-media**, commit 7a7e516.
- Verification used a locally built Next.js production server and the published Sanity dataset. The existing Vercel production deployment and hosted Sanity Studio still serve the previous release.

## Verification

| Check | Result |
| --- | --- |
| TypeScript, website and companion Sanity Studio | Passed |
| npm test | 26 passed |
| Site and editorial verification | 138 static source routes, 144 Studio blueprint combinations, and mocked AI and email integrations passed |
| Next.js production build | Passed |
| npm run build, portable Vinext target | Passed |
| Companion Sanity Studio build | Passed |
| npm run verify:seo, against next start | 244 HTTP pages passed with zero violations |
| Sitemap preservation | 238 baseline URLs retained, six added, and 10 existing video sitemap entries retained |
| Prompt crawlability | 67 of 67 server-rendered detail links across pagination and the category hubs |
| Browser checks | Prompt session inputs, Studio handoff, Studio exports, free tools, and niche comparison passed targeted checks |

The HTTP gate verified canonical and Open Graph URLs, titles and H1s from the baseline, robots directives, pagination responses, sitemap entries, internal fragments, related niches, Markdown samples, and parseable JSON-LD. See the [production baseline](../seo-baseline.json) and [Search Console rollout](GSC_ROLLOUT_RUNBOOK.md). Search Console indexing reports, field Core Web Vitals, and live provider delivery are release follow-ups.

## Configuration

All new services start off. The canonical origin is fixed in config/site.json.

| Optional feature | Default | Configuration |
| --- | --- | --- |
| Studio live AI | NEXT_PUBLIC_STUDIO_AI_ENABLED=false | Existing GLM_API_KEY and optional AI_MODEL or GLM_API_URL. Use UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for shared quotas. |
| Published Sanity output samples | SANITY_SAMPLE_OUTPUTS_ENABLED=false | Deploy the companion schema and add genuine output assets. |
| Newsletter and one-time blueprint email | EMAIL_CAPTURE_ENABLED=false | Set EMAIL_PROVIDER, EMAIL_API_KEY, EMAIL_LIST_ID and, for delivery, EMAIL_FROM. STUDIO_EMAIL_RESEND_API_KEY allows transactional delivery with a separate newsletter provider. |
| Affiliate links | NEXT_PUBLIC_AFFILIATES_ENABLED=false | Set the NEXT_PUBLIC_AFFILIATE_* URLs for active partnerships. |
| Starter kits | NEXT_PUBLIC_STARTER_KITS_ENABLED=false | Provide STARTER_KITS_JSON for existing product listings. |

See the complete [.env.example](../.env.example) and [setup details](UPGRADE_OPERATIONS.md).

## Founder inputs and release follow-up

1. Add genuine output samples to the [media checklist](SAMPLE_MEDIA_CHECKLIST.md). Add test observations only after running them, using the [field-test templates](FIELD_TEST_TEMPLATE.md). A founder headshot and verified social profiles can be added to lib/authors.ts. Existing public articles retain their CMS author credit and recorded dates.
2. If enabling email or live AI, configure the selected provider and run a controlled deliverability or generation check. For commercial links, supply approved affiliate URLs and verified checkout listings before enabling the corresponding flags.
3. Follow the [Search Console rollout](GSC_ROLLOUT_RUNBOOK.md) once the verified build is deployed. Media playback needs genuine sample assets, and reported Google indexing depends on recrawl and selection.

## Files changed by workstream

### P0 baseline, Studio, niches and prompt pagination (449136b)

- `.env.example` (updated)
- `app/[page]/page.tsx` (updated)
- `app/api/generate/route.ts` (updated)
- `app/globals.css` (updated)
- `app/niches/[slug]/page.tsx` (updated)
- `app/niches/page.tsx` (updated)
- `app/page.tsx` (updated)
- `app/prompts/page.tsx` (updated)
- `app/studio/page.tsx` (updated)
- `components/NicheExplorer.tsx` (updated)
- `components/PrivacyChoices.tsx` (updated)
- `components/PromptDirectory.tsx` (updated)
- `components/PromptExplorer.tsx` (updated)
- `components/Studio.tsx` (updated)
- `data/creatorResources.ts` (updated)
- `data/niches.ts` (updated)
- `lib/blueprint.ts` (updated)
- `lib/prompt-pagination.ts` (added)
- `lib/relatedNiches.ts` (added)
- `lib/site.ts` (updated)
- `lib/studioAi.ts` (added)
- `lib/studioRateLimit.ts` (added)
- `next.config.ts` (updated)
- `package.json` (updated)
- `proxy.ts` (added)
- `scripts/verify-niches.test.mjs` (added)
- `scripts/verify-seo.mjs` (added)
- `scripts/verify-site.tsx` (updated)
- `seo-baseline.json` (added)

### P1 prompt input, exports, media and niche comparison (89173f4)

- `.env.example` (updated)
- `app/globals.css` (updated)
- `app/niches/[slug]/page.tsx` (updated)
- `app/niches/page.tsx` (updated)
- `app/prompts/[slug]/page.tsx` (updated)
- `app/prompts/layout.tsx` (added)
- `components/NicheComparison.module.css` (added)
- `components/NicheComparison.tsx` (added)
- `components/PromptCustomizer.tsx` (updated)
- `components/PromptDirectory.tsx` (updated)
- `components/PromptExplorer.tsx` (updated)
- `components/PromptVariablesProvider.tsx` (added)
- `components/SampleOutputs.module.css` (added)
- `components/SampleOutputs.tsx` (added)
- `components/SampleVideo.tsx` (added)
- `components/Studio.tsx` (updated)
- `components/StudioProductionKit.module.css` (added)
- `components/StudioProductionKit.tsx` (added)
- `data/nicheComparison.ts` (added)
- `data/niches.ts` (updated)
- `data/promptLibrary.ts` (updated)
- `docs/MEDIA_SPEC.md` (added)
- `docs/SAMPLE_MEDIA_CHECKLIST.md` (added)
- `lib/prompt-variables.ts` (added)
- `lib/sampleOutput.ts` (added)
- `lib/sampleOutputs.ts` (added)
- `lib/studio-exports.ts` (added)
- `next.config.ts` (updated)
- `scripts/verify-niche-comparison.test.mjs` (added)
- `scripts/verify-prompt-variables.test.mjs` (added)
- `scripts/verify-sample-media.test.mjs` (added)
- `scripts/verify-site.mjs` (updated)
- `scripts/verify-studio-exports.test.mjs` (added)

### P1 and P2 editorial attribution, schemas and field notes (99b31af)

- `app/[page]/page.tsx` (updated)
- `app/ai-tools-hub/page.tsx` (updated)
- `app/free-tools/page.tsx` (updated)
- `app/guides/[slug]/page.tsx` (updated)
- `app/layout.tsx` (updated)
- `app/markdown/[[...path]]/route.ts` (updated)
- `app/niches/[slug]/page.tsx` (updated)
- `app/prompts/[slug]/page.tsx` (updated)
- `app/studio/page.tsx` (updated)
- `components/AuthorByline.tsx` (added)
- `components/EditorialPost.tsx` (updated)
- `components/FieldTestNote.module.css` (added)
- `components/FieldTestNote.tsx` (added)
- `components/JsonLd.tsx` (added)
- `components/PromptCustomizer.tsx` (updated)
- `components/Shared.tsx` (updated)
- `data/creatorResources.ts` (updated)
- `data/legal.ts` (updated)
- `data/niches.ts` (updated)
- `data/promptLibrary.ts` (updated)
- `docs/FIELD_TEST_TEMPLATE.md` (added)
- `lib/authors.ts` (added)
- `lib/editorial.ts` (updated)
- `lib/fieldTest.ts` (added)
- `lib/sampleOutput.ts` (updated)
- `lib/site.ts` (updated)
- `scripts/verify-editorial.tsx` (updated)
- `scripts/verify-field-tests.test.mjs` (added)

### P2 dedicated tools, models and email (77af848)

- `.env.example` (updated)
- `app/ai-tools-hub/page.tsx` (updated)
- `app/api/generate/route.ts` (updated)
- `app/api/studio-email/route.ts` (added)
- `app/api/subscribe/route.ts` (added)
- `app/free-tools/[slug]/page.tsx` (added)
- `app/guides/[slug]/page.tsx` (updated)
- `app/niches/[slug]/page.tsx` (updated)
- `app/niches/page.tsx` (updated)
- `app/prompts/[slug]/page.tsx` (updated)
- `app/prompts/page.tsx` (updated)
- `app/sitemap.xml/route.ts` (updated)
- `app/studio/page.tsx` (updated)
- `components/AuthorByline.tsx` (updated)
- `components/BrowserDataControls.tsx` (updated)
- `components/DedicatedFreeTool.module.css` (added)
- `components/DedicatedFreeTool.tsx` (added)
- `components/EmailCapture.module.css` (added)
- `components/EmailCapture.tsx` (added)
- `components/FreeTools.tsx` (updated)
- `components/ModelPromptHub.tsx` (added)
- `components/SiteFooter.tsx` (updated)
- `components/Studio.tsx` (updated)
- `components/StudioProductionKit.tsx` (updated)
- `data/freeToolPages.ts` (added)
- `data/legal.ts` (updated)
- `data/modelPromptHubs.ts` (added)
- `data/promptLibrary.ts` (updated)
- `docs/GSC_ROLLOUT_RUNBOOK.md` (added)
- `docs/UPGRADE_OPERATIONS.md` (added)
- `lib/authors.ts` (updated)
- `lib/blueprint.ts` (updated)
- `lib/creator-tools.ts` (added)
- `lib/emailConfig.ts` (added)
- `lib/emailDelivery.ts` (added)
- `lib/emailRequests.ts` (added)
- `lib/publicContent.ts` (updated)
- `lib/studioOptions.ts` (updated)
- `lib/studioRateLimit.ts` (updated)
- `public/faceless-production-tracker.csv` (added)
- `scripts/verify-free-tools.test.mjs` (added)
- `scripts/verify-model-hubs.test.mjs` (added)
- `scripts/verify-site.tsx` (updated)

### P3 monetization and final release safeguards (d1966bd)

- `.env.example` (updated)
- `README.md` (updated)
- `app/ai-tools-hub/page.tsx` (updated)
- `app/niches/[slug]/page.tsx` (updated)
- `app/sitemap.xml/route.ts` (updated)
- `components/AffiliateLink.tsx` (added)
- `components/EmailCapture.tsx` (updated)
- `components/NicheProductionStack.tsx` (added)
- `components/StarterKitCard.tsx` (added)
- `data/legal.ts` (updated)
- `docs/UPGRADE_OPERATIONS.md` (updated)
- `lib/affiliates.ts` (added)
- `lib/starterKits.ts` (added)
- `lib/studio-quota.ts` (added)
- `scripts/verify-affiliates.test.mjs` (added)
- `scripts/verify-seo.mjs` (updated)

### Companion Sanity Studio (7a7e516)

- sanity.config.ts (updated)
- schemaTypes/index.ts (updated)
- schemaTypes/sample-output.ts (added)

### Handoff

- docs/SEO_UPGRADE_HANDOFF.md (added)
