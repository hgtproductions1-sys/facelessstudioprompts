# ChatGPT Import Instructions

Use these instructions to import the audited source into a new ChatGPT Sites project and deploy to the production domain.

---

## Step 1: Upload and Import

1. Open ChatGPT in the **destination account** (the account that will own the production site).
2. Upload `The_Faceless_Prompts_Antigravity_Return.zip`.
3. Enable **Sites** if not already enabled.
4. Paste this import prompt:

> Use Sites to import this archive as the source template for a new Site in this account. Read TRANSFER.md, README.md, CHANGELOG.md, and AUDIT-RESULTS.md.
>
> Retain the React/Vinext server-rendered routes, content, media assets, responsive images, and the build integration in `build/`, `scripts/`, `vite.config.ts`, and `pnpm-lock.yaml`. Register a new Site identity in this account; the sanitized hosting manifest (`.openai/hosting.json`) has no project ID. Do not reuse an old account's Site identity or credentials.
>
> Keep all 130 content paths stable. The production canonical origin is `https://thefacelessprompts.com` in `config/site.json`.
>
> Run these verification commands in order:
> ```
> node scripts/verify-site.mjs
> ```
> Then build and deploy. After preparing the Site, connect `thefacelessprompts.com` using the native Sites custom-domain flow and provide the exact returned DNS records.

## Step 2: Verify the Build

After import, confirm these checks pass:

1. **TypeScript:** `tsc --noEmit` should produce zero errors.
2. **Verification script:** `node scripts/verify-site.mjs` should output `{"status":"passed","renderedPages":130,...}`.
3. **Production build:** The Sites build integration should complete without errors.

## Step 3: Domain and DNS Setup

1. In the Sites dashboard, request the custom domain `thefacelessprompts.com`.
2. Use the **exact DNS records** returned by Sites (A records for apex, CNAME for www if used).
3. **Do not guess DNS values.** Do not remove existing MX, TXT, or email records.
4. If connecting both `www.thefacelessprompts.com` and the apex domain, set up a permanent redirect from `www` to the apex.
5. Verify HTTPS is working and pages are accessible.

## Step 4: Make the Site Public

1. Set the Site to **public** for the production launch.
2. Confirm `config/site.json` has `"indexable": true`.
3. Clear any old `SITE_URL` environment override that may point to a preview origin.

## Step 5: Google Search Console

1. Verify domain ownership in [Google Search Console](https://search.google.com/search-console).
2. Optionally add the verification token to `config/site.json` → `searchConsoleVerification`.
3. Submit these sitemaps:
   - `https://thefacelessprompts.com/sitemap.xml` (130 content paths)
   - `https://thefacelessprompts.com/video-sitemap.xml` (10 video entries)
4. Inspect the homepage and representative content pages.
5. Monitor indexing status and Core Web Vitals as traffic becomes available.

## Step 6: Post-Launch Verification

Run through the [TRANSFER.md public launch checks](./TRANSFER.md#public-launch-checks):

- [ ] Homepage and content pages accessible over HTTPS without sign-in
- [ ] Canonical links and social images use `thefacelessprompts.com`
- [ ] Unknown paths return 404 with `noindex` metadata
- [ ] `/robots.txt`, `/sitemap.xml`, `/video-sitemap.xml` all serve correctly
- [ ] YouTube videos play on the actual domain
- [ ] Mobile menu, prompt filters, copy/download, bookmarks work in a real browser
- [ ] Domain verified in Search Console, sitemaps submitted

## Step 7: Optional AI Drafting

Template mode works without credentials. To enable AI drafting:

1. Configure `GLM_API_KEY` as a **server-side secret** in the Sites dashboard.
2. Optionally set `GLM_API_URL` and `AI_MODEL` (defaults are retained from the original configuration).
3. **Never put credentials in source code** or the client bundle.
4. Redeploy after adding the secret.

## Step 8: AdSense Setup (When Ready)

When you're ready to enable Google AdSense:

1. Create an `ads.txt` route at `app/ads.txt/route.ts` with your AdSense publisher ID.
2. Update the Privacy Policy (`data/legal.ts` → `privacy` → `Advertising and analytics` section) to reflect the advertising services actually used.
3. Add required consent controls if serving ads in jurisdictions that require them (GDPR, etc.).

---

## Files Included in This Archive

| File/Directory | Purpose |
|---------------|---------|
| `app/` | All application routes and pages |
| `build/` | Sites/Vinext build integration (required) |
| `components/` | React components |
| `config/` | Site configuration (`site.json`) |
| `data/` | Content data (prompts, niches, guides, videos, legal) |
| `db/` | Database schema |
| `drizzle/` | Database migrations metadata |
| `examples/` | D1 integration examples |
| `hooks/` | React hooks |
| `lib/` | Utility libraries |
| `public/` | Static assets (images, SVGs) |
| `scripts/` | Build and verification scripts |
| `types/` | TypeScript type definitions |
| `vendor/` | Vendored CSS and licenses |
| `.openai/hosting.json` | Sanitized hosting manifest (no project ID) |
| `.env.example` | Environment variable documentation |
| `.gitignore` | Git exclusions |
| `.npmrc` | npm/pnpm configuration |
| `package.json` | Dependencies and scripts |
| `pnpm-lock.yaml` | Dependency lockfile |
| `pnpm-workspace.yaml` | Workspace configuration |
| `tsconfig.json` | TypeScript configuration |
| `vite.config.ts` | Vite build configuration |
| `next.config.ts` | Next.js configuration |
| `postcss.config.mjs` | PostCSS configuration |
| `eslint.config.mjs` | ESLint configuration |
| `drizzle.config.ts` | Drizzle ORM configuration |
| `cloudflare-env.d.ts` | Cloudflare Workers type definitions |
| `components.json` | shadcn/ui configuration |
| `README.md` | Project documentation |
| `TRANSFER.md` | Domain transfer and launch guide |
| `ASSETS.md` | Asset provenance documentation |
| `CHANGELOG.md` | Changes made during audit |
| `AUDIT-RESULTS.md` | Audit checks, results, and measurements |
| `CHATGPT-IMPORT.md` | This file |
| `audit-evidence/` | Audit evidence and reports |

## What Was Excluded

- Git history (`.git/`)
- `node_modules/`
- `dist/` (generated deployment output)
- `.next/` (Next.js build cache)
- `.wrangler/` (Wrangler local state)
- `.sites-runtime/` (build runtime cache)
- `.env` / `.env.local` (real environment files)
- API keys, tokens, credentials
