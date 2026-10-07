# The Faceless Prompts

Read `../HANDOFF.md` before changing the application.

This is an AI-only video planning tool built with React, TanStack Start, TypeScript, Vite, Tailwind and Nitro. It generates text scripts and prompts, not finished images, audio or video.

## Local development

Use Bun with the supplied lockfile: `bun install --frozen-lockfile`, then `bun run dev`.
Use `bun run build` for the current build target. Run TypeScript checking with `node node_modules/typescript/bin/tsc --noEmit`.
After building, run `node scripts/tests/generation-regression.mjs`. These regression tests use mocked API responses, not paid requests.

The supplied server environment file contains the user's AI provider key. Never commit it or expose it through VITE_* variables. Configure hosting secrets separately; uploading source does not configure production credentials.

## Hosting status

This source snapshot currently builds Cloudflare-compatible output for the private Sites review copy. The final target remains the existing Vercel deployment at thefacelessprompts.com. Vercel adaptation and a real deployment still need verification. Do not treat this archive as an already verified Vercel deployment package.

Historical material under docs/legacy-build-notes.md is obsolete: do not restore template mode or replace the current framework based on those notes.
