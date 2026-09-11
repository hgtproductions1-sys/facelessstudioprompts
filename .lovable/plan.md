# Free Membership Tier for The Faceless Prompts

## What you asked for

Free accounts (no payments yet) that give people four things:

- a personal library where their generated blueprints are saved and revisitable
- more generations than a visitor gets
- no ads
- access to downloads

and that control access to the generator output, the prompt library, the free tools vault, and the playbook/guides.

## The two levels

```text
Visitor (not signed in)
  - 3 generations a day
  - sees Step 01 and Step 02 in full; Steps 03 and 04 blurred behind a sign-in prompt
  - no file downloads
  - sees ads
  - prompt library and tools vault: first few entries only
  - guides: public intro, locked deeper sections

Member (free account)
  - 50 generations a day
  - all four output cards, every time
  - downloads unlocked, plus a Save button on every result
  - no ads anywhere
  - full prompt library, full tools vault, full guides
  - /account lists everything they have saved
```

Both limits are one number each in a single config file, so you can retune them any time without touching the rest of the site.

## Why this needs three build passes, and what it costs

You have **92.6 credits left** this period. I can't honestly price this feature: build cost is usage-based and depends on how many fix-up messages it takes, and a membership tier touches logins, the database, the ad slots, the download section, and four content pages at once. Plan mode messages cost 1 credit each.

So the plan is deliberately split. Each pass is useful on its own and can stop or pause without leaving the site half-finished:

- **Pass 1 — accounts and member perks.** Logins, the saved-blueprint library, ads off, downloads unlocked. This is the visible product.
- **Pass 2 — generation limits.** Visitor cap, member cap, the friendly "you're out of runs today" state.
- **Pass 3 — content gating.** Prompt library, tools vault, playbook and guide sections behind the same sign-in prompt.

One cost warning worth deciding on now: every generation calls an AI model that is charged to this same credit balance (the last real run cost about 0.65 credits). Truly unlimited member generations would drain your balance on a busy day, which is why the member cap above exists rather than no cap at all.

## First step: connect a backend

Nothing is connected to this project yet, so accounts and saved blueprints have nowhere to live. Enabling **Lovable Cloud** adds logins and a database with no external accounts or setup, and it is what makes "sign in and find my blueprints again" actually work.

## What gets stored

Two tables, each protected so a person can only ever see their own rows:

- **Saved blueprints** — the niche, topic, style choices and the full generated package, tied to the account that saved it.
- **Daily generation counts** — one row per person or device per day, used to enforce the caps.

Visitors are counted by a label stored in their browser. That is a soft limit — someone determined can clear it and get more runs — but the member cap is enforced on the server and cannot be talked around.

## What changes on screen

- **Navbar** gains a sign-in / account item; a small account menu with name, saved count, and sign out.
- **New pages** at `/signin`, `/signup`, and `/account` (saved blueprints, each reopenable and deletable).
- **A single reusable sign-in prompt** — one component, used on the locked output cards, the locked library and vault entries, the download button, and the locked guide sections, so the messaging stays identical everywhere.
- **Results** gain a Save button; saving needs an account.
- **Ads** disappear for signed-in members, including for anyone who signs in mid-visit.

## Technical notes

- Enable Lovable Cloud, then a single migration: `public.blueprints` and `public.generation_usage` with `GRANT` statements, row-level security scoped to `auth.uid()`, and a unique constraint on the daily-count rows so concurrent generations can't double-count.
- Auth helpers in a client-safe module (`src/lib/member.functions.ts`) using `createServerFn` with the Cloud auth middleware; a `useMember()` hook that reads server-validated state, never browser storage, so the perks can't be faked from devtools.
- `/api/generate` is a public endpoint, so the quota check reads the session there before calling the model and rejects with a clear code when the cap is reached; the hook turns that code into the "come back tomorrow" message. Local fallback still counts as a run.
- Ad gating happens in `AdSlot.tsx` — member means the slot never renders and the AdSense script is never pushed, which also helps page speed.
- Locked content is produced by gated server functions, so hidden prompt text isn't sitting in the browser bundle for anyone who opens devtools.
- Public pages stay indexable: no `noindex` on gated pages, and the teasers are real content rather than an empty shell, so the SEO work already done keeps working.
- Privacy policy gets a line about account details; the sitemap does not gain the account pages.

## How I'll check it

TypeScript clean, then a real browser run: create an account, generate, save, sign out, sign back in and confirm the blueprint is still there, confirm ads are gone for that account and present for a visitor, and confirm a fourth visitor generation in a day is refused with the friendly message rather than a broken page.
