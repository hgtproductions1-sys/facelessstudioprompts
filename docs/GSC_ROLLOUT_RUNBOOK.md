# Search Console rollout

## Before release

1. Install dependencies from the existing lockfile. Run npm test, the TypeScript check, and both the site and editorial verifiers.
2. Use the Vercel production build command locally. Start the resulting Next.js server at port 3090 and run npm run verify:seo. The command compares the new output with the 238 routes in [seo-baseline.json](../seo-baseline.json).
3. Check the homepage, prompt pagination, Studio, the three new free tools, the three model hubs, and representative Sanity articles on a Vercel preview with the intended environment configuration. If Vercel protects preview URLs, use an authenticated session.
4. Publish the verified deployment. Keep the previous production deployment available for rollback.

## Release day

1. Set SITE_BASE_URL to https://www.thefacelessprompts.com and run npm run verify:seo. Require zero violations. Check both sitemaps and the existing AdSense verification.
2. In the existing Search Console domain property, open **Indexing → Sitemaps**. Confirm the submitted sitemap is https://www.thefacelessprompts.com/sitemap.xml and check its processing status. Submit the same address again if you need Search Console to fetch it after the update.
3. Use **URL Inspection → Test Live URL** for the homepage, /prompts, /prompts?page=2, /studio and /free-tools/faceless-video-script-generator. Check fetch success, indexing permission, user-declared canonical, and rendered HTML. The canonical for page 2 includes ?page=2. Studio variants use /studio as their canonical.
4. If the live checks pass, request indexing once for the major new and materially revised URLs. Existing articles remain discoverable through the sitemap.

## Days 3–7

Check the Pages report for changes in 404s, accidental noindex exclusions, and crawl blocks. Review Core Web Vitals and structured-data reports for new issues. Compare reported examples against the baseline and run the live verifier again if a regression appears.

## Days 14–28

Inspect discovery and indexing for the six new landing pages. Check sample Studio parameter URLs for consolidation under the canonical Studio page. Compare impressions, clicks, and CTR for the homepage, prompt pages, and niche playbooks with the preceding 28-day period. Read changes alongside seasonality and the timing of Google's crawl.

The automated gate measures the site's technical indexing signals. Search Console supplies Google's indexing status, selected canonicals, and field performance.
