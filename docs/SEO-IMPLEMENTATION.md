# SEO and design update — 24 October 2026

## Search intent map

These targets describe the site's actual content. Search volumes and ranking forecasts have not been invented.

| Page family | Main intent | Supporting topics |
| --- | --- | --- |
| Home | Free AI video prompts for faceless creators | Faceless YouTube content ideas, storyboards |
| /prompts | Free AI prompt library | Image, video, character, YouTube templates |
| /prompts/youtube | AI prompts for faceless YouTube channels | Hooks, channel planning, packaging |
| /prompts/image-generation | AI image prompt templates | Framing, lighting, reference images |
| /prompts/video-generation | AI video prompt templates | Actions, motion, camera movement |
| /prompts/character-consistency | Character consistency prompts | Identity and reference sheets |
| /prompts/seo | YouTube SEO prompts | Titles, descriptions, tags |
| Individual prompts | The named task in each prompt's title | Exact input fields, format, suitable tool category |
| /niches | Faceless YouTube niches | Channel ideas and production playbooks |
| Individual niches | The specific niche + video ideas and prompts | Audience, episode structures, scene examples |
| /guides and guide articles | Faceless YouTube creator guides | The specific production decision covered by each article |
| /videos and video lessons | AI video tutorials | Credited lessons, original practice prompts |
| /studio | Video planning studio | Editable storyboards, narration and scene prompts |
| /free-tools | Free creator planning tools | Actual tools available on the page |
| /ai-tools-hub | AI creator tools directory | Provider links and tool selection |
| /faceless-youtube-automation | Faceless YouTube production workflow | Human review and production steps |
| About, contact and policies | Project identity, support and publishing policies | Clear factual information; no keyword repetition targets |

Preserved every existing URL and all 24 niches. Updated hub headings to describe their content. Prompt pages now expose their actual input fields, format and tool category in server-rendered HTML. Metadata descriptions are normalized and constrained without keyword lists. Titles include the brand where it fits and retain the page's subject when it does not.

## Crawlability

- Canonical HTTPS host, server-rendered page content, breadcrumb markup, main sitemap and video sitemap retained.
- Explicit search-crawler groups retain the prior public-access policy and exclude /api/.
- Optional /llms.txt is a concise content directory. It is not a Google ranking requirement or a promise of AI citations.
- Modification dates updated for materially changed hub, niche and prompt content; unrelated article dates are preserved.
- AdSense publisher declaration and ads.txt retained. Account approval and actual indexing require inspection in the owner's Google accounts.

## Design decisions

The storyboard is the central visual device: an idea beside an example scene, followed by an actionable topic brief. Kept the established green palette and original illustrations. Applied Taste's editorial report direction and UI/UX Pro Max's readability, touch-target and reduced-motion guidance, adapted to this existing content product. Retained functional collection grids; changed the workflow to editorial rows. Core content no longer waits on reveal animations. Shared typography and page templates improve all page families.

## Verification

Production build and TypeScript checked. Existing verification renders 131 public pages and validates internal links, fragments, canonical URLs, assets, structured-data JSON, prompt descriptions, sitemaps, and 96 niche/format combinations. API behavior is exercised with mocked responses; this is not a live paid-provider quality assessment.

Google documentation: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
Google spam policy: https://developers.google.com/search/docs/essentials/spam-policies
OpenAI crawler guidance: https://help.openai.com/en/articles/12627856
