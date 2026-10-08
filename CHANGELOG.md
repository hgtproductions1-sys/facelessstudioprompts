# Changelog

All notable changes made during the Antigravity audit and handoff preparation.

## 2026-10-08 — Antigravity Audit

### Changed

| File | Change | Reason |
|------|--------|--------|
| `components/SiteFooter.tsx` | Added `aria-label="The Faceless Prompts home"` to the footer brand `<a>` element | The header brand link had this attribute for screen-reader context, but the identical footer brand link was missing it. Accessibility parity fix; zero visual change. |
| `app/error.tsx` | Added `import {useEffect} from 'react'`, destructured the `error` prop, and added `useEffect(() => { console.error(error); }, [error])` | The error boundary received the `error` prop in its type signature but never used it. Logging the error to the browser console follows the standard Next.js error-boundary pattern and makes client-side exceptions trackable in DevTools. Zero visual change. |

### Not Changed (Documented Only)

| Issue | Proposed Fix | Why Not Applied |
|-------|-------------|-----------------|
| Mobile menu lacks a focus trap | Wrap mobile nav links in a focus-trap component | Adding a focus trap would require adding a dependency or significant component logic. The menu already handles Escape and outside-click dismissal. A focus trap is a recommended accessibility enhancement but was deferred to avoid introducing untested behavioral changes. |
| `ads.txt` is missing | Add `app/ads.txt/route.ts` returning the publisher's AdSense `ads.txt` content | The site does not currently run advertising. Adding `ads.txt` requires the actual AdSense publisher ID from the site owner. Documented as a pre-launch task. |
| Hardcoded sitemap `lastmod` dates | Wire `PAGE_MODIFIED` to build-time variables | Changing the date source would require a build-pipeline modification with no demonstrated bug. The current dates (`2026-10-08`) are accurate for this export. |
| `oai-authenticated-user-*` headers not stripped in production worker | Add header stripping to `build/sites-worker.ts` | The ChatGPT Sites hosting platform strips these headers upstream before requests reach the Worker. Modifying the worker entry could break the Sites integration. Documented as a security consideration for non-Sites deployments. |
