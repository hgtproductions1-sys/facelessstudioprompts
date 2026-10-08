# The Faceless Prompts

A rebuilt creator studio that combines the updated interface direction with dedicated, server-rendered content pages. It is deployed with Sites using the supplied Vinext starter.

## Contents

- 67 searchable prompt templates with category, tool, level, and format filters, quick previews, customization pages, and exportable browser bookmarks.
- 24 niche playbooks, each with episode angles, examples, quality checks, and studio links.
- Eight creator guides with source links and related prompts.
- Ten attributed YouTube lessons with searchable topics, dedicated watch pages, and original practice exercises.
- A beginner Start Here journey with three paths and a downloadable project checklist.
- A video planning studio with template mode, optional server-side AI drafting, and creative-brief export/import.
- Hook, narration-time, and single-shot prompt helper tools.
- About, Contact, Editorial Policy, Privacy, Terms, and Disclosure pages.

## Run and validate

Use the Sites dependency helper if dependencies are missing. The project uses its retained package manager.

```sh
node /root/.codex/plugins/cache/openai-curated-remote/sites/1.0.0-c/scripts/install-dependencies.mjs
node node_modules/typescript/bin/tsc --noEmit
node scripts/verify-site.mjs
node /root/.codex/plugins/cache/openai-curated-remote/sites/1.0.0-c/scripts/build-site.mjs
```

The verification script renders every content page, checks internal links and fragments, tests all 96 niche/duration combinations, validates metadata and sitemaps, and exercises API input errors and mocked provider success and failure. It makes no live AI calls.

Browser visual QA was unavailable in the authoring environment. Compile, source-rendering, content, link, and API regression checks are documented separately from browser testing.

## Live AI configuration

Template mode is fully usable without credentials. To enable live AI drafting, configure the production runtime secret GLM_API_KEY through Sites. Optional server-side values are GLM_API_URL and AI_MODEL; their defaults retain the provider endpoint from the supplied Google AI Studio export. Never put a real key in source, a client bundle, or the hosting manifest. Deploy after changing runtime environment values.

Live-provider behavior cannot be verified without a configured working credential. The endpoint validates inputs and structured output, limits request size, enforces a provider timeout, returns useful errors, and applies a bounded per-instance rate limit. For a high-traffic public deployment, add a durable global usage budget or a hosting-level rate limit before enabling unlimited anonymous AI access.

## SEO and public launch

The configured production canonical origin is https://thefacelessprompts.com. Update config/site.json for another origin, or use a validated SITE_URL environment override. Search Console HTML verification can be added with searchConsoleVerification in the same config. The site includes server-rendered content, unique page metadata, matching structured data, breadcrumbs, an XML sitemap, a video sitemap, robots.txt, and real 404 paths.

Sites creates this deployment privately by default. Private pages cannot be indexed by Google. For the destination account launch, create a new Site from the sanitized export, attach the domain using the returned DNS validation records, make that destination Site public, rebuild with the canonical configuration, and submit sitemap.xml and video-sitemap.xml in the owner's Search Console property. See TRANSFER.md for the full handoff. Search Console access and domain ownership verification were not supplied for this build. Technical SEO improves discoverability; it does not guarantee rankings.

No advertising or application analytics scripts are loaded. The contact email is retained from the supplied project. Review the factual privacy text against any future tracking, advertising, or provider changes.

## Source changes from the supplied exports

Navigation and detail pages no longer depend on hidden tabs or modals. The visitor-facing archive download was removed. Duplicate legacy data exports and unverified ratings were removed. Prompt examples no longer carry unsupported old model flags or invented hashtag audience sizes. Published content does not display fictional reaction counts or predicted click-through rates.


## Performance and usability

All 14 editorial WebP images have 480px and 800px variants in addition to their 1280px sources. Cards and content covers use responsive source sets; the homepage hero is prioritized. The Studio receives a compact niche selector from its server page and loads template-production data only when a template is requested. Video indexes use click-to-load players. The mobile menu supports Escape and outside-click dismissal, and Studio tabs support arrow/Home/End navigation. No field performance scores are claimed.

## Vercel release configuration — 2026-10-08

This repository contains the Antigravity return version. Vercel uses the existing Next.js App Router source through `vercel.json` and builds with `pnpm exec next build`; Sites/Vinext source and scripts remain available. Keep pnpm 11.25.0 and the supplied lockfile. Configure server-only GLM_API_KEY, AI_MODEL=auto, and optionally GLM_API_URL (the default is https://api.hcnsec.cn/v1/chat/completions). No real key is committed.

Studio defaults to AI. Template planning remains an explicit optional selection; AI failures never fall back silently. Provider requests have a 90-second first-attempt deadline, one bounded format correction if required, a 120-second total deadline, and a 130-second client deadline. The Vercel API function declares maxDuration=180.

Before promoting a deployment, verify the build and real generation in that deployment. Older transfer instructions in CHATGPT-IMPORT.md and TRANSFER.md describe Sites hosting; Vercel is the selected host for this release. Do not change DNS or connect the domain to another provider.
