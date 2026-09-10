# Roadmap

## Done
- [x] Fixed mobile overlap: empty-state card was being rendered inside the Generate button; removed it and added mt-8/mt-12 + z-10 to the results section — clean at 375/768/1440, no overlap, no horizontal scroll
- [x] Removed console statements (console.info in affiliates.ts)
- [x] tsgo clean; eslint 0 errors (only standard shadcn fast-refresh warnings)
- [x] Routes /, /privacy, /terms, /affiliate-disclosure all return 200 with correct headings
- [x] CPA content locker fully removed: playabledownloads scripts, LockerCard.tsx, and locker.ts deleted; no references remain
- [x] Zero console/page errors across all routes
- [x] Restored plain download section: DownloadCard.tsx (no locker/gating) below results
- [x] Download button wired to /faceless-video-blueprint.pdf with download attr; placeholder PDF added at public/faceless-video-blueprint.pdf — replace that file with the real blueprint
