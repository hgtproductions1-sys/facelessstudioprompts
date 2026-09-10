# Faceless Studio Pro — Build Plan

A dark, cinematic single-page tool that turns a niche + topic into a three-part faceless-video production blueprint, with affiliate CTAs throughout and three real legal pages.

## What gets built

**Main page (`/`)**
- Sticky blurred navbar: gradient logo lockup, desktop links (Generator, How It Works, Prompt Library, Resources), "Get the Creator Stack" CTA, mobile slide-down menu.
- Hero with ambient purple/cyan glow, faint grid overlay, free-forever pill badge, gradient headline, subhead.
- Generator panel: niche dropdown (10 niches, each with an icon), topic field (140-char counter that turns amber past 120), Generate button with loading state, Enter-to-submit, inline validation plus toast errors, and 4 quick-start chips that fill both fields and generate.
- Loading experience: results scroll into view, three shimmer skeleton cards, a 4-step progress stepper (analyzing → character → prompts → camera) advancing at 600ms intervals with a filling gradient bar, real cards revealed at ~2.4s with staggered fade-up.
- Results toolbar: Copy Full Package, Regenerate (new seed), Export as .txt.
- Three output cards (side-by-side on desktop, stacked on mobile), each with gradient top rail, icon tile, step eyebrow, Copy All, per-block copy buttons, a mid-card affiliate button and a footer CTA block with the affiliate disclosure line:
  1. Master Character Profile — archetype badges, consistency score bar, physical description, wardrobe, voice spec grid, three hooks, timestamped voiceover cue sheet, retention beats.
  2. Visual Style Prompts — style DNA chips, render-flag spec grid with per-value copy, Leonardo prompt, Midjourney prompt, regenerable consistency token, negative-prompt chips.
  3. Camera Motion Plan — sequence overview grid, numbered timeline of 5–7 shots with motion/transition/animation cue and per-shot copy, rig cheat sheet, sound design notes.
- How It Works (3 steps), trust strip with 4 gradient stats plus 6 testimonial cards, final CTA banner with risk-reversal line.
- Four-column footer with brand, product, resources, legal links, social buttons, bottom bar, and the full independence/affiliate disclaimer.

**Legal pages** — `/privacy`, `/terms`, `/affiliate-disclosure`: real prose content, "Last updated" line, sectioned headings, shared navbar/footer, "Back to Generator" button.

## Generation logic

`src/lib/generator.ts` exports `generatePackage({ niche, topic, seed })` returning the fully typed `ProductionPackage` shape from the brief. A `NICHE_PROFILES` record holds archetype, tone tags, wardrobe, voice spec, style DNA, palette, environments, pacing, sound notes and hook templates for each of the 10 niches. Template functions weave the topic into hooks, prompts, shot descriptions and the cue sheet. The seed is a hash of the topic, so output is stable and Regenerate produces a new but reproducible variation. Includes a `slugify` helper for the consistency token and export filename.

`src/config/affiliates.ts` holds every partner URL as a named constant with `// TODO: replace with your tracking link` comments; `handleCtaClick(id)` fires a success toast.

## Technical notes

- The project runs on TanStack Start with TanStack Router, not `react-router-dom` — the router is fixed on this stack. Routes are built as `src/routes/index.tsx`, `privacy.tsx`, `terms.tsx`, `affiliate-disclosure.tsx`, with the shared shell in `__root.tsx`, and each page gets its own title/description/social metadata.
- Styling uses Tailwind v4: all the specified color tokens are declared in `src/styles.css` and exposed as semantic utility classes (no `tailwind.config.ts` on this stack). Inter and JetBrains Mono load via a `<link>` in the root route.
- shadcn/ui for select, input, button, card, badge, accordion, tooltip; `sonner` for toasts (mounted once in the root); `framer-motion` for entrances; `lucide-react` for icons.
- Everything is client-side: no backend, no network calls, no signup.
- Accessibility: labeled inputs, `aria-live="polite"` results region, focus-visible rings, keyboard-operable dropdowns, AA contrast.

## Out of scope

Real affiliate tracking links, analytics, and a live cookie-preferences manager (the footer link is present but non-functional) — say the word if you want any of these wired up.
