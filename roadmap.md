# Roadmap

## In progress
- [ ] Fix mobile overlap: Generate button / quick-start chips overlapping the empty-state card (spacing, flow, z-index); verify at 375/768/1440
- [ ] Re-verify locker toast fires on Download click (Playwright reported no toast)

## Production finalization (from prior request)
- [x] Remove console.log/debug statements (removed console.info in affiliates.ts)
- [x] Fix lint/TS errors (tsgo clean; eslint 0 errors, only shadcn fast-refresh warnings)
- [x] Verify routes /, /privacy, /terms, /affiliate-disclosure (all 200)
- [x] Locker card renders with Download button wired to openContentLocker()
- [x] CPA placeholder present in src/routes/__root.tsx before closing body (JSX comment — lives in source, not rendered HTML)
- [x] No horizontal overflow at 375/768/1440
