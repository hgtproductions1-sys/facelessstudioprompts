# The Faceless Prompts — Credibility Review

Prepared 11 October 2026 for Vince Elijah Alvarez. Review branch: `startup-credibility-20261011`. Production base: `e6b9134eafc4515dd88081ab4d3bbc9527ebbc93`.

This review improves the existing Vercel website. It does not recreate the site, activate Claude, change DNS, publish the source publicly, or submit a startup application. The supplied implementation brief requires separate approval before production deployment.

## A. Project audit

### Existing stack and behavior

- Next.js 16.3.4 App Router, React 19.2.6, TypeScript, existing CSS, and pnpm 11.25.0.
- Native Next builds on the existing Vercel project. Retained Sites/Vinext tools remain available; no host migration is proposed.
- Verified data: 67 prompts, 24 original niches, 8 guides, and 10 credited video tutorials.
- The baseline verifier passed for 130 public content pages and 96 niche/duration combinations.
- Working features to retain: library filtering/customization, bookmarks, niche routes, educational guides, video lessons, beginner checklist, Studio scene plans, template drafting, AI drafting, engine formatting, creative-brief imports/exports, and plan copying/downloads.
- Existing browser storage keys are unchanged. No account, payment system, database, dependency, or new paid service is added.

### Verified problems

| Finding | Evidence | Resolution |
| --- | --- | --- |
| Public contact still used Gmail | Live Contact page and shared email constant | Replace public contact references with founder@thefacelessprompts.com |
| About lacked founder and founding year | Live About page and source data | Use Vince Elijah Alvarez and 2023 as supplied by the founder |
| Brief's unconfigured-AI description was stale | Live GET /api/generate returned both availability flags true | Preserve existing AI integration; avoid presenting Claude as connected |
| Template selector chose AI | Committed template radio used setMode('ai') | Correct the selector and preserve an explicit template result |
| Browser aborted at 42 seconds | Studio timeout versus the server's 120-second deadline | Use a 130-second browser timeout |
| Unavailable AI exposed setup wording | Public option text said Unconfigured and referenced a site key | Show plain checking/unavailable states and keep template mode usable |
| Canonical conflicted with existing redirect | Apex resolves to www, while live canonicals and source fallback used apex | Use www in the source canonical and environment example; do not change DNS |
| Privacy described a private Sites deployment | Existing public site is on Vercel | Describe actual hosting, local storage, AI routing, email, and ad verification |
| No maintainable public product history | No updates route in baseline | Add one lightweight page using confirmed October 2026 release evidence |
| Missing genuine application evidence pack | Requested in brief | Add private verification, proposal, and review Markdown files |

The founder has supplied the public name, contact email, and founding year. Founding month, operating country, approved profile link, original launch date, and measured traction remain unavailable. No missing value is published as a placeholder.

## B. Implementation summary

| Files | Change and purpose |
| --- | --- |
| lib/site.ts | Shared founder name, contact email, and founding-year constants |
| config/site.json; .env.example | Canonical fallback uses the working www hostname |
| data/legal.ts | Natural About/Contact copy; actual hosting and AI-processing disclosures; independent operator identified |
| app/[page]/page.tsx | Visible mailto contact near the top, related product links, accurate page-specific update dates |
| app/layout.tsx | Preserve AdSense tag; add approved contact/founder identity to existing publisher schema |
| app/page.tsx | Refine existing workflow section and CTAs; explain actual AI/template behavior without a redesign |
| components/SiteFooter.tsx | Independent-project description, founder email link, product updates link |
| components/Studio.tsx | Fix mode selection, availability handling, import/example defaults, and browser deadline |
| app/api/generate/route.ts | Plain provider-authentication failure text; existing provider, key handling, limits, and request logic preserved |
| app/updates/page.tsx; data/productUpdates.ts | Lightweight changelog with confirmed 8 October 2026 work; no fabricated launch date |
| app/sitemap.xml/route.ts | Include /updates and changed-page modification dates |
| scripts/verify-site.tsx; scripts/verify-site.mjs | Include the new route, identity/privacy checks, private-pack exclusions, and Next Link resolution in the existing verifier |
| README.md | Correct hosting/canonical instructions and document the private review pack |
| STARTUP_VERIFICATION.md | Genuine profile, evidence, pending facts, and short/detailed application drafts |
| CLAUDE_INTEGRATION_PLAN.md | Secure optional Claude proposal, staged evaluation, cost limits, and approval dependencies |
| STARTUP_REVIEW.md | This audit, content record, verification limits, deployment checklist, and cost report |

Changed-page navigation uses Next Link. The existing CSS, images, typography, niche collection, prompt data, guide text, video collection, package versions, and lockfile remain unchanged. Existing ads.txt is preserved exactly; it is not a newly invented account entry.

## C. Final About page copy

### Helping creators turn ideas into videos, one prompt at a time.

An independent, founder-operated project helping faceless creators organize ideas, prompts, and video production plans.

### The story behind The Faceless Prompts

The Faceless Prompts was founded in 2023 by Vince Elijah Alvarez. It is an independently developed, founder-operated project, bootstrapped and self-funded.

The goal is practical: give independent creators more structure between a first idea and a finished video. A useful plan makes it easier to decide what to show, what to say, and how each scene fits the story.


### What you can do today

Browse and customize 67 prompt templates, explore 24 niche playbooks, and learn from 8 creator guides and credited video tutorials.

In the Video Planning Studio, enter a topic, choose a niche and format, and create a blueprint with an opening hook, scene prompts, narration direction, continuity notes, and an editing checklist. Review the draft, switch the prompt destination, then copy or download the plan for your production tools.

AI drafting uses the connected AI service to write scene details. The optional template planner builds editable directions in your browser without an AI request. You can also save prompts locally and import or export your creative brief.

- [Open the Video Planning Studio](https://www.thefacelessprompts.com/studio)
- [Explore the Prompt Library](https://www.thefacelessprompts.com/prompts)
- [Browse niche playbooks](https://www.thefacelessprompts.com/niches)
- [Read creator guides](https://www.thefacelessprompts.com/guides)

### Made for the creative process

Bring your own references, point of view, and editorial decisions. The Studio produces a planning draft; you use your chosen image, video, voice, and editing tools to make the final media.

Review every draft for accuracy, originality, rights, and continuity. A prompt or production plan cannot guarantee views, audience growth, platform approval, or revenue.


### Where the project is going

The focus remains clearer scene planning, more useful creator resources, and better control over the drafting workflow. Additional AI-provider choices, including a possible Claude integration, are future proposals rather than current features. No release dates are promised.

- [Read product updates](https://www.thefacelessprompts.com/updates)

### Independent operation and attribution

The Faceless Prompts is an independent, unincorporated project. It is not presented as a registered company or as an official partner of the AI tools it discusses.

Planning templates and guide text are published under The Faceless Prompts name. Linked YouTube tutorials belong to their credited creators. Illustrations are AI-generated editorial artwork. Fictional premises and templates are planning aids, not claims of first-hand production results.

- [Read the editorial policy](https://www.thefacelessprompts.com/editorial-policy)

### Talk to the founder

For questions, support, corrections, or collaboration ideas, contact founder@thefacelessprompts.com. Practical feedback helps identify what needs a closer look.

- [Contact the project](https://www.thefacelessprompts.com/contact)


## D. Other content and technical changes

### Contact, homepage, Studio, and legal pages

The Contact page now uses `mailto:founder@thefacelessprompts.com`, with sections for general questions/collaboration, product support and bugs, corrections, privacy/rights, and external-provider accounts. No form backend, email-delivery guarantee, or response-time promise is added.

The homepage retains its hero, visuals, three-card workflow, educational sections, and existing content. The workflow explains choosing a niche, entering a concept, reviewing scenes, and copying or downloading a production plan. Its direct CTAs are “Open the Video Planning Studio” and “Explore the Prompt Library.”

Studio remains AI-capable with an optional template planner. An unavailable configuration selects a usable template start; a failed AI generation does not silently return a template. Capability checks have a bounded 10-second wait, and the generation browser deadline is 130 seconds. Imports and the example loader respect the available mode. Existing drafts and storage keys are preserved.

Privacy identifies Vercel, local storage, the current api.hcnsec.cn routing service, upstream-model processing, email handling, YouTube embeds, and existing AdSense verification. Unknown third-party retention periods are not represented as verified. No advertising or analytics runtime script is enabled.

Terms identify the independent unincorporated operator. Editorial Policy and Disclosure content remain intact. Founder Person data uses only the approved public name, with no invented profile, registration number, funding round, ratings, or full founding date.

### Verification results

| Check | Result and practical limit |
| --- | --- |
| Baseline site verifier | Passed: 130 pages; 96 template combinations |
| Final site verifier | Passed: 131 pages; 96 combinations; 67 prompts/24 niches/8 guides/10 videos |
| Final native Next production build | Passed, including TypeScript compilation; /updates generated successfully |
| Standalone TypeScript | Passed |
| Scoped lint on changed source | Passed with zero errors; three warnings for retained img tags using existing responsive image sources |
| Full repository lint | 25 pre-existing errors and nine warnings; all errors are in unchanged files listed below |
| Diff whitespace check | Passed |
| Internal navigation, assets, metadata | Existing verifier checks links/fragments, responsive image files, canonical URLs, one H1 per content page, unique prompt descriptions, structured-data JSON, and sitemap coverage |
| API behavior | Mocked success/error, request validation, rate limits, and missing-key cases pass; no new paid provider call made |
| Domain reachability | Both apex and www return HTTP 200 after the existing apex-to-www redirect |
| Production sitemap endpoints | HTTP 200; 130 page entries and 10 video entries before this review |
| AdSense identity | Existing account tag and exact ads.txt remain present |
| Browser storage | Keys and schemas preserved; existing bookmark and draft-import validation passes |
| Browser visual/end-to-end QA | Not performed for this review in the local environment; no supported local browser-control plugin was available |
| Mailbox delivery | Not tested; no email sent |
| Performance | Existing responsive images and loading strategies retained; no field performance score or new Lighthouse claim |
| Startup/AdSense approval | Not guaranteed or obtained by these source changes |

Full-lint errors are in unchanged `app/error.tsx`, guide/niche/prompt/video detail pages, `app/not-found.tsx`, `components/PromptExplorer.tsx`, `components/Shared.tsx`, `components/SiteHeader.tsx`, and `components/StartJourney.tsx`. They concern legacy anchor-navigation or state-in-effect rules. They do not block the native Next build. This review does not suppress those repository-wide findings or broaden the changes to unrelated components.

An initial local build failed because reused dependencies were a symlink outside Turbopack's project root. Reusing the same installed dependencies inside the isolated checkout resolved that environment issue without changing package inputs. The final native build passes.

### AI evidence

The existing production key is configured according to its status endpoint. A real production browser-to-provider-to-rendered-result test was completed on 8 October. Today's regression tests use mocks and do not re-measure provider quality or availability. Neither configuration status nor a mock is represented as a fresh live output-quality test. Claude is a future proposal.

### SEO and infrastructure

The source fallback now agrees with the existing www redirect. Vercel's actual `SITE_URL` value takes precedence and must also use www; no environment variable or DNS record was changed during this review. Canonicals, Open Graph URLs, robots sitemap references, and schema URLs use the same shared origin. The review sitemap contains 131 content URLs, including /updates; the video sitemap retains its 10 entries.

Search Console is already verified and sitemap URLs have been submitted. The earlier video-sitemap fetch report needs a fresh owner check after processing. This review does not claim that the sitemap report is now fixed or all URLs are indexed. The existing AdSense review remains separate from this code review.

## E. Startup verification pack

See [STARTUP_VERIFICATION.md](STARTUP_VERIFICATION.md) for the actual profile, dated evidence, current product, pending facts, optional free founder-verification steps, and ten application questions with short and detailed drafts. See [CLAUDE_INTEGRATION_PLAN.md](CLAUDE_INTEGRATION_PLAN.md) for the proposed server-only adapter, schema and semantic checks, usage limits, privacy requirements, and staged evaluation.

These files are private repository documents. They are not in public/ and do not appear in the site sitemap. No application is submitted and no program membership or partnership is claimed.

## F. Remaining actions and deployment checklist

Before production:

1. Review the changes and the PR diff. Use an existing Vercel preview if one is available; check desktop/mobile layout, template selection, draft preservation, imports, and copying/downloads.
2. Confirm that the Vercel production `SITE_URL` override agrees with https://www.thefacelessprompts.com. Keep existing server secrets in Vercel; no secret must be moved into this repository.
3. Obtain the founder's explicit production approval, as required by the supplied brief.
4. Merge the reviewed branch into main through the normal Git workflow. Do not force push, rewrite existing history, or move the domain.
5. Wait for Vercel's deployment success. Verify About/Contact, both sitemap endpoints, ads.txt, and the AI availability endpoint.
6. Perform an approved live generation check through the browser before claiming a new end-to-end AI test. Keep real provider failures distinct from template output.
7. Check Search Console's updated sitemap processing and the existing AdSense review separately. Do not repeatedly resubmit unchanged sitemaps without an actual issue.
8. If rollback is necessary, revert the new commit through normal history and let Vercel rebuild. Do not expose private verification files as public downloads.

Founder-dependent items remain the actual founding month, operating country, optional profile link, original launch evidence, and any real traction or feedback. Test the domain mailbox yourself before an application. A proposed Claude activation or application submission requires separate approval.

## G. Cost report

- New paid services, subscriptions, databases, or hosting purchases: none.
- New package dependencies or changed package versions: none.
- New Claude API activation or paid evaluation calls: none.
- DNS changes, domain transfer, business registration, or public source publication: none.
- Hosting remains on the existing Vercel project; normal builds and traffic stay subject to the existing plan.
- Existing AI usage remains subject to the configured provider's charges and limits. The review does not promise that provider generation is cost-free.
- A future Claude integration would have usage-based charges unless covered by valid credits. No credit award or free benefit is assumed.
