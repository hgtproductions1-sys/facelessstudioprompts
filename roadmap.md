# Roadmap

## Done
- [x] Fixed mobile overlap: empty-state card was being rendered inside the Generate button; removed it and added mt-8/mt-12 + z-10 to the results section — clean at 375/768/1440, no overlap, no horizontal scroll
- [x] Locker toast verified: Download button fires "Locker script not installed yet" toast via openContentLocker()
- [x] Removed console statements (console.info in affiliates.ts)
- [x] tsgo clean; eslint 0 errors (only standard shadcn fast-refresh warnings)
- [x] Routes /, /privacy, /terms, /affiliate-disclosure all return 200 with correct headings
- [x] CPA placeholder comment present in src/routes/__root.tsx body
- [x] Zero console/page errors across all routes
