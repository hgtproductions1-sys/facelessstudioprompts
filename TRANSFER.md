# Publish The Faceless Prompts from your other account

The prepared production address is **https://thefacelessprompts.com**. The current private preview remains a separate Sites project. The transfer archive includes the application source, artwork, responsive image variants, lockfile, checks, and this guide. It does not include the original Site identity, Git history, credentials, dependencies, or deployment cache.

## Use the archive in the destination ChatGPT account

Upload `The_Faceless_Prompts_Domain_Transfer.zip`, enable Sites, and paste:

> Use Sites to import this archive as the source template for a new Site in this account. Read TRANSFER.md and README.md. Retain the React/Vinext server-rendered routes, content, media assets, and build integration. Register a new Site identity in this account; the sanitized hosting manifest has no project ID. Do not reuse the old account's Site identity or credentials. Keep all 130 content paths stable. Run the TypeScript and site verification checks, then build and deploy. The production canonical origin is https://thefacelessprompts.com in config/site.json. After preparing the Site, connect thefacelessprompts.com using the native Sites custom-domain flow and provide the exact returned DNS records. Preserve existing mail-related DNS records. Make the Site public for the domain launch and verify HTTPS and page access before submitting sitemaps.

The existing source uses the supplied Sites/Vinext integration. Import it as a retained template and let the current Sites skill configure the execution profile and dependency installation. Keep `build/`, `scripts/`, `vite.config.ts`, and the lockfile. Rebuilding it as a client-only single-page app would change its routing and crawlable content.

## Domain and SEO settings

- `config/site.json` sets `canonicalUrl`, `indexable`, and an optional public `searchConsoleVerification` token.
- `SITE_URL`, if configured in the build/runtime environment, overrides `canonicalUrl`. Use exactly `https://thefacelessprompts.com`, without a path. Clear any old preview-origin override before building.
- Metadata, social previews, breadcrumbs, organization data, article/video URLs, robots.txt, and both sitemaps use the same configured origin.
- Keep `indexable: true` for the public launch. Private previews remain protected by their hosting audience settings.
- Choose one primary hostname. This build uses the apex domain. If you also connect `www.thefacelessprompts.com`, configure a permanent redirect to the apex hostname in the hosting or DNS-provider redirect settings. Keep the path and query string. Verify the redirect on the actual deployment.
- Request the apex domain through Sites and use its returned A records and validation records. Subdomains use the returned CNAME and validation records. Do not guess DNS values or remove unrelated MX, TXT, or email records.

The domain has not been attached or DNS-configured in this account. These steps must be completed on the destination Site.

## Public launch checks

1. Confirm the homepage and a guide, prompt, niche, and Watch page are accessible without sign-in over HTTPS.
2. Check that canonical links and social images use thefacelessprompts.com, and that unknown paths return a real 404 with noindex metadata.
3. Check `/robots.txt`, `/sitemap.xml`, and `/video-sitemap.xml`. The normal sitemap lists 130 unique content paths. Modification dates are included only where recorded; video publication dates are omitted when unknown.
4. Play the YouTube videos on the actual domain. Dedicated Watch pages retain a primary iframe in their initial server-rendered content; index pages load the player after a click.
5. Test the mobile menu, beginner checklist, prompt filters, copy/download actions, and bookmark/draft export and import in a real browser.
6. Verify the domain in your Google Search Console account, then submit `sitemap.xml` and `video-sitemap.xml`. Inspect the homepage and representative content pages. Review indexing and Core Web Vitals as traffic becomes available.
7. Measure mobile loading, responsiveness, and layout stability on the final domain. Responsive assets and deferred Studio template data are implemented; field performance scores have not been measured.

If an older public version is already indexed, map each old content path to the matching new URL and use permanent redirects where that host permits them. This private preview does not establish an indexed-domain migration by itself.

## Carry your saved work

Saved prompts, the Studio creative brief, and checklist progress are browser-local. They do not move automatically when the hostname or device changes.

- In the prompt library, open **Move your saved prompts**, export bookmarks, and import them on the new site. Import merges valid bookmarks without removing existing ones. You can also download the full text of saved prompts available in the current collection.
- In Studio, open **Keep or move your creative brief** and export the draft JSON. Import it on the new site and create a blueprint. Generated plans have their own Markdown download.
- Download the first-video checklist if you want a portable record of your progress.

## Optional AI drafting

Template mode needs no provider credentials. To enable AI drafting, configure `GLM_API_KEY` as a server-side secret in the destination Site, then redeploy. Optional `GLM_API_URL` and `AI_MODEL` settings retain the original provider configuration defaults. No real keys are included in this archive. Provider availability has not been live-tested with a working key.

## What was verified before export

TypeScript, production build, server rendering of all 130 pages, internal links/fragments, local and responsive media, unique canonical URLs and prompt descriptions, structured-data JSON, both sitemaps, all 96 niche/duration blueprints, filter combinations, bookmark parsing, draft validation, API input handling, and mocked provider behavior are checked by the included scripts. Browser visual QA, live video playback, DNS, Search Console, and real-user performance must be verified on the final destination deployment.

No tested prompt-to-result showcase was added, as requested. Fictional examples and AI illustrations remain clearly identified as planning material.
