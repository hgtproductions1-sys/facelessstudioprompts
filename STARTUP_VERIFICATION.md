# The Faceless Prompts — Startup Verification

Prepared for founder review on 11 October 2026. This internal file is not a public website page and is not an official Anthropic verification requirement. Application drafts below have not been submitted.

## 1. Project profile

| Field | Current information | Evidence or remaining action |
| --- | --- | --- |
| Project | The Faceless Prompts | Live product and repository branding |
| Website | https://www.thefacelessprompts.com | Public pages returned HTTP 200 during this audit |
| Company-domain email | founder@thefacelessprompts.com | Supplied by the founder; address syntax and mailto links checked, mailbox delivery not independently tested |
| Founding year | 2023 | Supplied by the founder in this conversation; not inferred from website update dates or repository history |
| Founding month | Not supplied | Founder must provide the real month if a form requires it |
| Public founder name | Vince Elijah Alvarez | Supplied and approved for use by the founder in this conversation |
| Operating country | Not supplied for publication | Founder confirmation required |
| Funding | Bootstrapped and founder-funded | Owner-provided business description; no external investment or funding round claimed |
| Funding date | Not applicable to an external round | No external round has been disclosed; do not invent one |
| Registration | Unregistered and unincorporated | Owner-provided business description, not an independent registry search |
| Stage | Live, early-stage creator-tools project | Working product; no independently measured traction supplied |
| Repository | Private GitHub repository: hgtproductions1-sys/facelessstudioprompts | Keep source private unless the founder explicitly changes access |
| Hosting | Existing Vercel project: facelessstudioprompts | Vercel deployment configuration and current public site |

The latest available source and dated release evidence do not establish a 2023 public launch. The founding year and product launch date are separate facts. The original launch date remains unverified.

## 2. Product evidence

Counts verified against source data and the existing verifier: 67 prompts, 24 niches, 8 creator guides, and 10 credited video tutorials. The production sitemap currently has 130 page URLs; the proposed review adds one useful product-updates page, for 131. A sitemap URL count is not a Google index count.

| Capability | Public URL | Evidence |
| --- | --- | --- |
| Product overview | https://www.thefacelessprompts.com/ | Server rendering and live HTTP check |
| Guided first-video workflow | https://www.thefacelessprompts.com/start-here | Source, checklist storage, and existing journey tests |
| Video Planning Studio | https://www.thefacelessprompts.com/studio | Input controls, scene plans, narration, continuity, and edit output |
| Prompt library | https://www.thefacelessprompts.com/prompts | 67 distinct prompt records; filtering and bookmark tests |
| Niche playbooks | https://www.thefacelessprompts.com/niches | 24 preserved original niche records and detail routes |
| Creator guides | https://www.thefacelessprompts.com/guides | 8 existing guides and detail routes |
| Video lessons | https://www.thefacelessprompts.com/videos | 10 credited lessons; privacy-enhanced players |
| Free helper tools | https://www.thefacelessprompts.com/free-tools | Browser-based tools; existing source retained |
| Tool resource directory | https://www.thefacelessprompts.com/ai-tools-hub | Direct provider links, no affiliate tracking added |
| Contact | https://www.thefacelessprompts.com/contact | Review changes use the founder's domain address |
| Product updates | https://www.thefacelessprompts.com/updates | Proposed review page; not yet deployed to production |

### Genuine dated evidence

- 8 October 2026: commit `40b9471` imported the returned Antigravity site and connected server-side AI generation for Vercel. Commit `62c9d2562c6cab2a6f88d02c410fe89aa9e57aaa` contains the resulting deployment configuration. Current product pages are live.
- 8 October 2026: commit `e6b9134eafc4515dd88081ab4d3bbc9527ebbc93` restored the site's existing AdSense verification tag and ads.txt. Both remain live and are preserved by this review.
- 11 October 2026: this audit prepared credibility and Studio corrections on a review branch. This is development evidence, not a claim that the changes have already been publicly released.

Earlier screenshots and a real AI generation test from 8 October exist in this conversation. They show a completed six-scene AI draft with the requested kitten/scarf continuity, engine switching, and plan export. They are historical evidence, not a fresh guarantee of provider availability. The 11 October live GET status check returned `aiAvailable: true` and `templateAvailable: true`; that status checks configuration, not output quality.

## 3. Current technical capabilities and limits

- Next.js 16.3.4 App Router, React 19.2.6, TypeScript, and the existing CSS design system. Vercel uses a native Next build with pnpm 11.25.0. Retained Vinext/Sites tooling remains in the repository for portability.
- The browser sends an explicitly selected AI brief to `/api/generate`; the Node.js route validates it with Zod and calls the configured service at `https://api.hcnsec.cn/v1/chat/completions`. The configured request model defaults to `auto` and may route to different upstream models. This is not a verified direct Claude integration.
- The provider key stays server-side under `GLM_API_KEY`. No real API key, GitHub token, or credential belongs in this file or in public source.
- AI input validation caps a topic at 300 characters and request bodies at 8,192 characters. Output validation requires the expected six to eight scenes, hook, continuity, thumbnail direction, and editing notes.
- The server has bounded request deadlines and an in-memory four-requests-per-minute limiter. That limiter is per instance, not a durable global spending cap. The current correction attempt can consume a second provider request.
- Template planning is generated in the browser. The review fixes a radio-button bug that previously routed template selection back to AI.
- Browser storage keys remain `fp-saved-prompts`, `fp-studio-draft`, and `fp-start-progress`. No account system, payment collection, or server database for creative briefs is introduced.
- The site includes AdSense verification metadata and ads.txt. No application-level ad or analytics script is loaded by the reviewed source. Review status does not equal AdSense approval.

## 4. Traction and feedback

No verified user count, revenue, funding amount, customer testimonials, or usage dashboard was supplied. Do not convert visits, sitemap entries, repository commits, or sample illustrations into customer or traction figures. Add only genuine measurements or feedback that the founder can substantiate and has permission to use.

## 5. Application answer drafts

These are truthful working drafts. Missing date and country fields must be completed if required by the application. Check the actual form and current program terms at submission time.

### What does your startup build?

**Short:** The Faceless Prompts builds planning tools and editable prompts for faceless video creators.

**Detailed:** The Faceless Prompts helps independent creators turn a video concept into a structured production plan. The live product combines a video-planning Studio, 67 editable prompts, 24 niche playbooks, creator guides, and credited tutorial videos. Users can review scene instructions, continuity notes, narration direction, and editing checklists, then copy or download a plan for their chosen production tools.

### When was it founded?

**Short:** 2023.

**Detailed:** The founder states that the project was founded in 2023. The exact founding month has not yet been supplied. The current website's dated release evidence is from 2026; it is separate from the founding date and does not establish the original public launch date.

### Who is the founder?

**Short:** Vince Elijah Alvarez.

**Detailed:** Vince Elijah Alvarez is the founder and independently operates The Faceless Prompts. The project contact is founder@thefacelessprompts.com. An approved professional profile link can be added if the founder supplies one; no profile or additional private identity information is invented here.

### What stage is the startup at?

**Short:** An early-stage project with a live product.

**Detailed:** The website and core planning resources are publicly accessible. The product has a working planning workflow and an existing server-side AI integration, while improvements to reliability and product transparency are being reviewed. No user, revenue, or growth figures are claimed without evidence.

### How is it funded?

**Short:** Bootstrapped and founder-funded; no external funding round disclosed.

**Detailed:** Development and operation are self-funded by the founder. The project has not disclosed venture capital, institutional investment, or another external round. There is no invented investor, funding amount, or funding date.

### What is the current product?

**Short:** A live video-planning Studio, prompt library, niche playbooks, and creator learning resources.

**Detailed:** Users choose a niche, topic, format, prompt destination, and visual style. The Studio produces a hook, scene plan, narration direction, continuity notes, and an editing checklist through AI drafting or an optional browser-generated template. The product supports copying plans, downloads, local bookmarks, and creative-brief import/export. It plans media; it does not render or upload finished videos.

### How will Claude be used?

**Short:** A proposed server-side option for drafting structured video blueprints; not currently integrated.

**Detailed:** Subject to approval and a controlled implementation, Claude would refine a creator's concept and draft scene actions, narration, continuity notes, and editing recommendations within the existing Studio. The integration would validate inputs and outputs, keep credentials server-side, apply usage and budget controls, and preserve the current provider and template workflow. See CLAUDE_INTEGRATION_PLAN.md.

### Why would Claude's API be helpful?

**Short:** To evaluate whether Claude can improve scene specificity and narrative continuity in production drafts.

**Detailed:** The proposed evaluation would compare topic fidelity, scene continuity, narrative pacing, structured output completion, latency, and cost against the current planning workflow. Claude's value has not yet been measured in this product, so the application should describe an intended evaluation rather than claim untested performance gains.

### What demonstrates that the project is active?

**Short:** A live product, source history, dated changes, and tested planning workflows.

**Detailed:** The public site exposes its Studio, library, niche playbooks, guides, and tutorials. GitHub records dated development and deployment work, while the current review includes build and functionality checks and public product-history improvements. Genuine demos and approved founder profiles can provide additional evidence; none are fabricated here.

### Is the business incorporated?

**Short:** No. It is currently an independent, unincorporated project.

**Detailed:** The founder describes the project as unregistered and unincorporated. Do not provide a registration number, legal company suffix, employee count, or company entity that does not exist. Any future registration details should be added only after they become real and are approved for use.

## 6. Program context checked on 11 October 2026

Anthropic's 6 October announcement describes an eligibility window of founded within five years **or** funded within two years. Its current program FAQ accepts bootstrapped startups without VC funding. The supplied 2023 founding year fits that announced founding window; it does not guarantee acceptance. The current FAQ also reports capacity constraints on the free Team and $1,000 API-credit offers. Do not promise those benefits or represent this project as an accepted program member.

Official sources:

- https://claude.com/resources/articles/were-expanding-the-claude-startups-program-to-help-founders-build
- https://claude.com/programs/startups
- https://www.anthropic.com/startup-program-official-terms

## 7. Founder checklist

Required before a form that asks for these details can be completed:

- Confirm the actual founding month and operating country.
- Test incoming and outgoing mail for founder@thefacelessprompts.com using the founder's mail account; no message was sent during this task.
- Review all business descriptions and application drafts for accuracy.
- Supply real launch evidence if available. Do not backdate posts, documents, or commits.
- Decide whether to approve the website review for production. No Claude application is submitted by this review.

Optional, free credibility improvements:

- Link a real approved founder profile to the project.
- Publish a current product demonstration or genuine launch/update announcement with its real date.
- Request authentic beta feedback and permission to quote it.
- Keep product updates and support contact information consistent.
- Publish a sanitized demonstration repository only if the founder wants to; the existing private source does not need to become public for the site to function.

These optional identity and evidence steps are separate from technical operation. No company registration, purchase, paid API activation, invented traction, or public source disclosure was performed.
