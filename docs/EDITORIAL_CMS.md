# Editorial CMS

## Ownership and locations

- Sanity project: `egy1s59p`, dataset `production`, owned by the user's Sanity account signed in through GitHub.
- Editor: https://thefacelessprompts-editor-egy1s59p.sanity.studio
- Editor shortcut: https://www.thefacelessprompts.com/admin/articles
- Public articles: https://www.thefacelessprompts.com/articles
- Frontend source: `facelessstudioprompts` on GitHub, deployed to the existing Vercel project.
- Studio source: `../studio-thefacelessprompts`, a separate application beside this app. Do not move it into this app or replace the `/studio` video-planning tool.
- Studio private repository: https://github.com/hgtproductions1-sys/studio-thefacelessprompts. Clone both repositories into the same parent folder for TypeGen.

The Studio schema files are authoritative. Sanity stores editorial content independently of Git and Vercel deployments. Frontend deployments do not seed, reset, or overwrite documents.

## Publish an article

1. Open the editor and sign in with the GitHub identity that owns the project.
2. Open **Articles and new guides**, create a document, and choose Article.
3. Add the title, URL slug, excerpt and body. Set the author type/name and publication date. Add a cover with alternative text, relevant sources, takeaways and related guides where useful.
4. Sanity saves drafts automatically. Wait for the saved indicator before closing. Use Presentation and the **Private saved-draft preview** location. Use **Refresh saved draft** in the preview after saving edits.
5. Check the page, links, images, factual claims and sources, then Publish. Publication and unpublication are read on the next server request. A tab already open may need a refresh.
6. Editing a published article creates a draft; visitors continue to see its published version until you publish the update. Use Unpublish to remove it from the public page, listing and sitemap while retaining its draft.

Keep published URLs stable. Schema validation rejects a section or slug change while a published version exists. After unpublishing, retain the same URL when republishing. A deliberate URL change needs a developer-managed permanent redirect. Future publication dates remain hidden until that time, but are not a replacement for the Publish action.

## Existing guides and search

The eight existing guides still use the repository content and their original URLs, anchors, images and video lessons. Their slugs are reserved in the CMS and rejected by the public adapter. `config/editorial.json` has an empty `migratedGuideSlugs` list. Migrate a guide only after comparing all its content and behavior. An explicitly migrated guide must not fall back to its source version after unpublishing.

Published articles have server-rendered content, canonical metadata, social metadata, breadcrumbs and Article JSON-LD. Author type distinguishes a person from an organization. Only valid published documents with a publication date at or before now appear publicly. An empty article index is `noindex,follow` and absent from the sitemap. Admin and preview pages are excluded; previews require verified Sanity secrets and an HttpOnly Next.js Draft Mode cookie. Private previews use noindex/private-cache headers and block third-party scripts. Sanity media assets use public CDN URLs, including images uploaded for drafts; do not upload confidential media.

CMS failures produce an article error state and a 503 sitemap response. Existing guide detail pages remain independent of CMS availability. The guide index preserves existing guides and explains when new guides cannot be loaded. Existing AdSense code remains in the root layout.

Adding a CMS does not itself prevent indexing. Preserving URLs, canonical tags, crawl access and existing content reduces migration risk; rankings and indexing timing remain search-engine decisions. Verify the two sitemaps and representative URLs in Search Console after release. No new analytics tracker or keyword-volume service was configured by this CMS change.

## Configuration and maintenance

- Public project/dataset/API version/editor URL and activation: `config/editorial.json`.
- Server-only credential: `SANITY_API_READ_TOKEN`, stored as a Vercel Secret for Production and Preview. It has Sanity viewer access. Never prefix it with `NEXT_PUBLIC_`.
- Optional server overrides: `SANITY_ENABLED`, `SANITY_STUDIO_URL`.
- Studio local-preview override: `SANITY_STUDIO_PREVIEW_URL=http://localhost:3000` before building/running the Studio. Production defaults to the canonical website.
- CORS origins permit the canonical app and localhost for authenticated preview. Add only specific additional preview origins as needed.
- Generate schema/query types from the sibling Studio with `pnpm typegen`; commit the generated `sanity.types.ts` with the frontend. Explicit generated query-result types are used because pnpm's isolated dependencies do not expose `@sanity/client` at the app root for TypeGen module augmentation.
- Studio: `pnpm dev`, `pnpm check`, `pnpm build`, `pnpm exec sanity schemas deploy`, `pnpm deploy`. Its CLI config records the hosted app ID.
- App: `pnpm exec tsc --noEmit`, `node scripts/verify-site.mjs`, `node scripts/verify-editorial.mjs`, `node scripts/build-vercel.mjs`.

Use document history to restore an earlier revision as a draft, preview it, then publish deliberately. History retention follows the Sanity plan; this setup adds no separate revision archive. Export a dataset using `sanity dataset export production <private-backup-path>` from the Studio. Keep backups and credentials outside Git. Test imports into a separate dataset before replacing production content.

No paid plan upgrade was performed. Review current Sanity and Vercel usage/retention limits in their dashboards as content grows. CMS reads bypass shared application/CDN caches to keep publication changes visible on the next request, so traffic consumes API and server usage. Consider signed webhooks and caching if usage warrants it.

## Verification record

The existing source regression suite checks 131 rendered pages, 67 prompts, 24 niches, 8 guides, 10 videos and 96 blueprint combinations. Editorial tests cover safe links/images, invalid dates, empty/noindex behavior, missing articles, reserved-guide collisions, sitemap preservation and CMS outages.

Real Sanity API checks exercise image upload, draft save/reload, anonymous access rejection, signed preview, publish, separate draft edits, stale-revision rejection, update and unpublish. Browser checks cover article link navigation and direct reload. These checks do not establish Google indexing or rankings, or every Studio accessibility/session-expiry behavior.

Production release `f045404` was verified on 3 November 2026: all 131 pre-release sitemap URLs remained; existing guide canonicals and video lessons, homepage AdSense, domain redirect, article empty/noindex state, editor redirect, missing/unpublished 404s and invalid-preview 401 passed. A real signed private preview returned 200 with noindex, private/no-store and preview CSP headers; its draft remained absent from public articles and the sitemap. Temporary test documents were removed. No error/fatal runtime logs matched the production deployment during the release check. Search Console processing remains an owner-side measurement step.
