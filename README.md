# The Faceless Prompts

An existing creator-tools project with a video-planning Studio and dedicated, server-rendered content pages. The public website is hosted on Vercel; retained Sites/Vinext tooling supports portability.

## Contents

- 67 searchable prompt templates with category, tool, level, and format filters, quick previews, customization pages, and exportable browser bookmarks.
- 24 niche playbooks, each with episode angles, examples, quality checks, and studio links.
- Eight creator guides with source links and related prompts.
- Ten attributed YouTube lessons with searchable topics, dedicated watch pages, and original practice exercises.
- A beginner Start Here journey with three paths and a downloadable project checklist.
- A video planning studio with template mode, optional server-side AI drafting, and creative-brief export/import.
- Hook, narration-time, and single-shot prompt helper tools.
- About, Contact, Editorial Policy, Privacy, Terms, Disclosure, and Product Updates pages.

## Run and validate

Keep the existing pnpm 11.25.0 package manager and lockfile. For the chosen Vercel host:

```sh
npx --yes pnpm@11.25.0 install --frozen-lockfile
node node_modules/typescript/bin/tsc --noEmit
node scripts/verify-site.mjs
node node_modules/next/dist/bin/next build
```

The verification script renders every content page, checks internal links and fragments, tests all 96 niche/duration combinations, validates metadata and sitemaps, and exercises API input errors and mocked provider success and failure. It makes no live AI calls.

Browser visual QA was unavailable in the authoring environment. Compile, source-rendering, content, link, and API regression checks are documented separately from browser testing.

## Live AI configuration

Template mode is fully usable without credentials. The existing Vercel production deployment has server-side AI configuration. Its key is supplied as the server-only Vercel Secret GLM_API_KEY. Optional server-side values are GLM_API_URL and AI_MODEL; their defaults retain the routing-service endpoint from the supplied export. Never put a real key in source, a client bundle, or the hosting manifest. Runtime changes require a new deployment.

Live-provider behavior cannot be verified without a configured working credential. The endpoint validates inputs and structured output, limits request size, enforces a provider timeout, returns useful errors, and applies a bounded per-instance rate limit. For a high-traffic public deployment, add a durable global usage budget or a hosting-level rate limit before enabling unlimited anonymous AI access.

## SEO and public launch

The configured production canonical origin is https://www.thefacelessprompts.com, matching the existing redirect from the apex domain. Update config/site.json for another origin, or use a validated SITE_URL environment override. An existing override takes precedence, so confirm it agrees with the intended canonical before deployment. Search Console HTML verification can be added with searchConsoleVerification in the same config. The site includes server-rendered content, unique page metadata, matching structured data, breadcrumbs, an XML sitemap, a video sitemap, robots.txt, and real 404 paths.

The existing public Vercel site remains the destination. The domain property has already been verified in Search Console, and both sitemap URLs have been submitted. The earlier video-sitemap report showed a fetch issue even though Google's live URL test succeeded; that report needs a fresh owner check after processing. A sitemap submission or live fetch does not guarantee indexing. Historical transfer documents describe a separate Sites workflow and should not be used to move the current domain.

The existing AdSense verification metadata and ads.txt are preserved. No advertising or application analytics scripts are loaded. The public contact is founder@thefacelessprompts.com. Review the factual privacy text against future tracking, advertising, or provider changes.

## Source changes from the supplied exports

Navigation and detail pages no longer depend on hidden tabs or modals. The visitor-facing archive download was removed. Duplicate legacy data exports and unverified ratings were removed. Prompt examples no longer carry unsupported old model flags or invented hashtag audience sizes. Published content does not display fictional reaction counts or predicted click-through rates.


## Performance and usability

All 14 editorial WebP images have 480px and 800px variants in addition to their 1280px sources. Cards and content covers use responsive source sets; the homepage hero is prioritized. The Studio receives a compact niche selector from its server page and loads template-production data only when a template is requested. Video indexes use click-to-load players. The mobile menu supports Escape and outside-click dismissal, and Studio tabs support arrow/Home/End navigation. No field performance scores are claimed.

## Vercel configuration for this release

Vercel builds the existing Next.js App Router source using vercel.json and pnpm exec next build. Keep pnpm 11.25.0 and pnpm-lock.yaml. Set server-only GLM_API_KEY and AI_MODEL=auto; GLM_API_URL defaults to https://api.hcnsec.cn/v1/chat/completions. No real key is committed. Studio starts with AI when available and offers an explicit template option. If its availability check fails, it makes template planning usable; a generation error preserves the input without silently substituting a template result.

The first provider attempt has a 90-second timeout, with at most one format correction inside a 120-second total deadline. Client timeout is 130 seconds and Vercel maxDuration is 180 seconds.

Sites/Vinext scripts are retained for portability, but Vercel is the chosen host for this release. Earlier transfer documents describe Sites hosting; do not change DNS or move the domain.

## Startup credibility review

Vince Elijah Alvarez supplied the founding year 2023 and contact address founder@thefacelessprompts.com. No founding month or operating country has been supplied for publication. The project is described as bootstrapped, self-funded, unregistered, and unincorporated. Do not invent missing details or an external funding round.

- [Startup verification and application drafts](STARTUP_VERIFICATION.md)
- [Proposed Claude integration](CLAUDE_INTEGRATION_PLAN.md)
- [Implementation review and deployment checklist](STARTUP_REVIEW.md)

These Markdown files stay in the private repository and are not website routes or public downloads. Claude remains a proposal. The credibility review requires founder approval before merging to the production branch; no application submission is part of the deployment.
