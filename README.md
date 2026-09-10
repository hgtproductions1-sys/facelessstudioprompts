# Blueprint Studio Pro

# MASTER BUILD PROMPT — "Faceless Studio Pro"
### React + Vite + TypeScript + Tailwind CSS + shadcn/ui single-page application

You are an elite product designer and senior full-stack React engineer. Build a complete, production-quality, fully responsive web application called **Faceless Studio Pro**. Follow every instruction below precisely. Do not skip sections, do not summarize, and do not leave placeholder TODOs — implement everything end-to-end with working interactivity and realistic mock data.

---

## 1. PRODUCT OVERVIEW & CORE PURPOSE

**Faceless Studio Pro** is a free, high-converting creative utility for faceless short-form video creators (TikTok, YouTube Shorts, Instagram Reels). It generates **structured AI video production packages** that fuel CPA (cost-per-action) marketing funnels.

A user selects a **Niche** and enters a **Topic**, and the app instantly returns a three-part production blueprint:

1. **Master Character Profile & Voiceover Cues** — the recurring faceless persona (avatar description, wardrobe, tone, pacing, hook script beats, VO delivery notes).
2. **Visual Style Prompts** — ready-to-paste prompts for Leonardo.ai / Midjourney, including aspect ratio and rendering flags.
3. **Camera Motion & Animation Plan** — per-shot camera moves, transitions, timing, and animation cues.

The app is a **traffic and lead-gen asset first**, a tool second. Every output card must contain strategically placed, high-contrast **affiliate / CPA call-to-action buttons**.

**Positioning tagline:** *"Build the blueprint. Stay faceless. Scale the traffic."*

---

## 2. TECH STACK & PROJECT SETUP

- **Framework:** React 18 + Vite + TypeScript (`.tsx` everywhere, strict typing, no `any` unless unavoidable).
- **Styling:** Tailwind CSS with a custom theme extension. Use `shadcn/ui` components for inputs, selects, buttons, cards, badges, tabs, accordions, tooltips, toasts (`sonner`).
- **Icons:** `lucide-react`.
- **Routing:** `react-router-dom` with routes: `/` (app), `/privacy`, `/terms`, `/affiliate-disclosure`.
- **State:** Local React state + a small custom hook (`usePackageGenerator`). No backend, no external API calls — all generation is deterministic client-side logic over curated mock datasets.
- **Animations:** `framer-motion` for card entrance, loading shimmer, and accordion reveals. Keep it tasteful and fast (no animation longer than 400ms).
- **Clipboard:** Use `navigator.clipboard.writeText` with a success toast for every copy button.
- **Fonts:** `Inter` for UI/body, `JetBrains Mono` for prompt/code blocks (loaded via Google Fonts in `index.html`).
- **Accessibility:** Semantic HTML, all inputs labeled, focus-visible rings, `aria-live="polite"` on the results region, keyboard-operable dropdowns, WCAG AA contrast minimums.

---

## 3. BRANDING & VISUAL AESTHETIC

**Theme:** Dark-mode "creative studio" — looks like a premium editing suite at 2 AM. Sleek, modular, cinematic, slightly futuristic. Never playful or cartoonish.

**Color tokens (define as CSS variables in `src/index.css` and mirror in `tailwind.config.ts`):**

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0A0A0C` | Page background |
| `--bg-elevated` | `#121216` | Navbar, footer |
| `--surface` | `#16161C` | Card base |
| `--surface-2` | `#1E1E26` | Nested panels, input backgrounds |
| `--border-subtle` | `#26262F` | Card borders (1px) |
| `--border-hover` | `#3A3A47` | Hover state borders |
| `--accent-purple` | `#8B5CF6` | Primary accent |
| `--accent-purple-bright` | `#A78BFA` | Gradient stop, hovers |
| `--accent-cyan` | `#22D3EE` | Secondary accent |
| `--accent-cyan-bright` | `#67E8F9` | Gradient stop |
| `--text-primary` | `#F4F4F6` | Headings, body |
| `--text-secondary` | `#A1A1AC` | Labels, meta |
| `--text-muted` | `#6B6B78` | Helper text |
| `--success` | `#34D399` | Copy success, badges |
| `--warning` | `#FBBF24` | Pro-tip badges |

**Signature visual treatments:**
- **Ambient glow:** A fixed, absolutely-positioned radial gradient behind the hero — purple at top-left (`rgba(139,92,246,0.18)`), cyan at top-right (`rgba(34,211,238,0.14)`), fading to transparent by 60% viewport height. `pointer-events-none`, `z-0`.
- **Grid overlay:** Subtle `repeating-linear-gradient` grid (1px lines, `rgba(255,255,255,0.025)`, 48px spacing) masked with a vertical fade. Optional but strongly preferred.
- **Glass cards:** `bg-[#16161C]/80 backdrop-blur-xl border border-[#26262F] rounded-2xl` with `shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]`.
- **Gradient accents:** Headline keywords use `bg-gradient-to-r from-[#A78BFA] to-[#67E8F9] bg-clip-text text-transparent`.
- **Accent top-rail:** Each output card has a 2px top border gradient: Card 1 → purple→cyan (left-to-right); Card 2 → cyan→purple; Card 3 → purple→cyan. Plus a matching soft glow shadow on hover.
- **Buttons — Primary (CTA):** `bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-[#0A0A0C] font-semibold rounded-xl px-5 py-3 hover:brightness-110 hover:shadow-[0_0_28px_-4px_rgba(139,92,246,0.65)] transition-all duration-200 active:scale-[0.98]`.
- **Buttons — Secondary:** `bg-[#1E1E26] border border-[#3A3A47] text-[#F4F4F6] rounded-xl hover:border-[#8B5CF6] hover:text-white`.
- **Buttons — Ghost/Copy:** small, icon + label, `text-[#A1A1AC] hover:text-[#22D3EE]`.
- **Typography scale:** Hero H1 `text-4xl md:text-6xl font-extrabold tracking-tight`; section H2 `text-2xl md:text-3xl font-bold`; card H3 `text-lg font-semibold`; body `text-sm md:text-base leading-relaxed`; labels `text-xs font-medium uppercase tracking-widest text-[#A1A1AC]`.

---

## 4. PAGE STRUCTURE (top to bottom)

### 4.1 STICKY NAVBAR

- Fixed to top, `z-50`, height `h-16`, background `bg-[#121216]/80 backdrop-blur-xl`, bottom border `border-b border-[#26262F]`.
- **Left:** Logo lockup — a `28x28` rounded-lg square with a purple→cyan gradient fill containing a `Sparkles` or `Clapperboard` lucide icon in dark, followed by wordmark: **Faceless** (white, `font-bold`) **Studio Pro** (gradient text). Entire lockup links to `/`.
- **Center (desktop only, `hidden md:flex`):** Nav links — `Generator` (scrolls to `#generator`), `How It Works` (`#how-it-works`), `Prompt Library` (`#library`), `Resources` (`#resources`). `text-sm text-[#A1A1AC] hover:text-white transition-colors`, with an animated gradient underline on hover.
- **Right:** A compact secondary button labeled **"Get the Creator Stack"** with an `ArrowUpRight` icon (this is a CPA CTA — wire `onClick` to `handleCtaClick('navbar-creator-stack')`). On mobile, collapse nav links into a `Menu` icon that opens a full-width slide-down panel (dark, blurred, with the same links plus the CTA as a full-width primary button).
- Add a very subtle 1px gradient line at the very bottom of the navbar: `from-transparent via-[#8B5CF6]/40 to-transparent`.

### 4.2 HERO + INTERACTIVE GENERATOR (the centerpiece — `id="generator"`)

**Hero copy block (centered, max-w-4xl, `pt-32 pb-10`):**
- Small pill badge above the H1: `bg-[#1E1E26] border border-[#3A3A47] rounded-full px-4 py-1.5 text-xs text-[#A1A1AC]` containing a pulsing cyan dot (`animate-pulse`) + text **"100% Free · No signup required · Unlimited generations"**.
- **H1:** `Build Faceless Video Blueprints That Actually Convert` — with "Faceless Video Blueprints" rendered in the purple→cyan gradient.
- **Subhead:** `text-lg text-[#A1A1AC] max-w-2xl mx-auto` — *"Generate a complete AI production package — recurring character profile, Leonardo & Midjourney style prompts, and shot-by-shot camera motion — in one click. Built for creators running CPA traffic."*

**Generator Form Panel** — a glass card, `max-w-3xl mx-auto mt-10 p-6 md:p-8 rounded-2xl`, with a gradient top rail.

Layout: responsive grid — `grid grid-cols-1 md:grid-cols-[1fr_1.4fr_auto] gap-4 items-end`.

1. **Niche dropdown** (shadcn `Select`):
   - Label: `NICHE` (uppercase, tracking-widest, `text-xs`).
   - Placeholder: `Select a niche…`
   - Options (each with a small lucide icon rendered in the item):
     - `True Crime & Unsolved Mysteries` (`Search`)
     - `Stoic Philosophy & Discipline` (`Columns3`)
     - `Wealth, Finance & Passive Income` (`TrendingUp`)
     - `Dark Psychology & Human Behavior` (`Brain`)
     - `Ancient History & Lost Civilizations` (`Landmark`)
     - `Space, Science & the Unknown` (`Rocket`)
     - `Stoicism for Entrepreneurs` (`Briefcase`)
     - `Survival & Prepper Skills` (`Tent`)
     - `Luxury Lifestyle & Success Mindset` (`Crown`)
     - `Health, Longevity & Biohacking` (`HeartPulse`)
   - Trigger styling: `h-12 bg-[#1E1E26] border-[#3A3A47] rounded-xl text-sm` with purple focus ring.

2. **Topic text input**:
   - Label: `TOPIC OR VIDEO ANGLE`.
   - Placeholder: `e.g., The man who faked his own death for insurance money`
   - `h-12 bg-[#1E1E26] border-[#3A3A47] rounded-xl`, purple focus ring, `maxLength={140}` with a subtle character counter in the bottom-right of the field (`text-[10px] text-[#6B6B78]`) that turns amber past 120 chars.
   - Pressing `Enter` submits the form.

3. **Generate button** (primary gradient, `h-12 px-6 whitespace-nowrap`):
   - Default label: **Generate Package** with a `Wand2` icon.
   - Loading label: **Generating…** with a spinning `Loader2`.
   - Disabled (opacity-50, cursor-not-allowed, no glow) when niche is empty, topic length < 3, or loading is true.
   - On mobile (`< md`), this button spans the full width below the two fields.

**Under the form:** a row of 3–4 "quick start" chips (`bg-[#1E1E26] border border-[#26262F] rounded-full px-3 py-1.5 text-xs text-[#A1A1AC] hover:border-[#8B5CF6] hover:text-white cursor-pointer`) that pre-fill both fields and auto-generate. Examples: `The Dyatlov Pass Incident`, `Marcus Aurelius on Anger`, `How the Rich Avoid Taxes`, `The Dark Side of Dopamine`.

**Validation & errors:** If the user submits an incomplete form, show an inline `text-[#FBBF24] text-xs mt-2` message plus a `toast.error`. Never use browser `alert()`.

### 4.3 LOADING STATE (must feel real and premium)

When generation is triggered:
- Scroll the results region into view (`scrollIntoView({ behavior: 'smooth', block: 'start' })`).
- Immediately render **three skeleton cards** in the same grid layout as the output, using a shimmer effect (`animate-pulse` over `bg-[#1E1E26]` blocks with rounded corners). Vary skeleton block widths so it looks like real text.
- Simultaneously display a **progress stepper** above the grid — a horizontal 4-step tracker with labels:
  1. `Analyzing niche archetypes`
  2. `Building character profile`
  3. `Rendering style prompts`
  4. `Mapping camera motion`
- Each step activates in sequence at ~600ms, ~1200ms, ~1800ms, and completes at ~2400ms total. Active step shows a purple spinning `Loader2`; completed steps show a green `CheckCircle2`; upcoming steps are muted. Include a thin animated gradient progress bar beneath the stepper that fills 0→100% over the same duration.
- After ~2400ms total, replace skeletons with the real output cards, animate them in with `framer-motion` (staggered: 0ms, 120ms, 240ms; `opacity: 0→1`, `y: 16→0`).

### 4.4 OUTPUT ARCHITECTURE — THREE CARDS (`id="results"`)

Render in a `grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 mt-12`. **Desktop: three equal columns side-by-side. Mobile/tablet: fully stacked**, with the CTA buttons still prominent.

Each card shares this shell:
- Glass card styling + gradient top rail (see §3).
- **Card header:** icon in a `40x40 rounded-lg bg-gradient-to-br from-[#8B5CF6]/20 to-[#22D3EE]/20 border border-[#3A3A47]` tile, then a step eyebrow (`STEP 01` / `STEP 02` / `STEP 03`, `text-[10px] tracking-widest text-[#6B6B78]`), then the card title (`text-lg font-semibold`), then a one-line description in `text-xs text-[#A1A1AC]`.
- **Header right:** a "Copy All" ghost button (`Copy` icon + `Copy All`) that copies the entire card contents as formatted plain text.
- **Body:** sectioned content blocks, each with a mini-label and a copy button. Prompt/text blocks use `font-mono text-[13px] bg-[#0F0F13] border border-[#26262F] rounded-lg p-3 leading-relaxed text-[#D4D4DC]` with `whitespace-pre-wrap` and a max-height of ~200px with internal scroll on overflow.
- **Mid-card CTA:** after the second content block, insert a full-width **primary gradient affiliate button**.
- **Footer CTA:** the card ends with a distinct CTA block — `rounded-xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/10 to-[#22D3EE]/5 p-4` containing a bold micro-headline, one line of supporting copy, and a primary button. Also include a small `text-[10px] text-[#6B6B78]` disclosure line: *"Affiliate link — we may earn a commission at no cost to you."*
- Every CTA button calls `handleCtaClick(id)` which fires a `toast.success("Opening partner offer…")` and (in a real deploy) would open the affiliate URL. Define all affiliate URLs as constants in `src/config/affiliates.ts` with clear `// TODO: replace with your tracking link` comments and sensible placeholder URLs.

---

**CARD 1 — MASTER CHARACTER PROFILE & VOICEOVER CUES**
- Icon: `UserRound`. Title: **Master Character Profile**. Subtitle: *"Your recurring faceless persona + VO delivery script."*
- Content blocks:
  - **Archetype** — a badge row: archetype name (e.g., `The Relentless Investigator`), tone tags (`Authoritative`, `Measured`, `Low and Slow`), and a `Consistency Score: 94/100` progress bar in purple→cyan.
  - **Physical Description** — 3–5 lines of monospace text describing the faceless persona (silhouette, hands, wardrobe, environment, lighting) generated from the niche + topic.
  - **Wardrobe & Props** — bulleted list, 4 items.
  - **Voice & Delivery Profile** — a small spec grid: `Voice Type`, `Pace (WPM)`, `Pitch`, `Accent`, `Emotional Register`, `Signature Pause`. Render as label/value rows with a divider.
  - **Hook Script (First 3 Seconds)** — monospace block containing 3 alternative hooks (labeled `Hook A`, `Hook B`, `Hook C`), each under 12 words.
  - **Voiceover Cue Sheet** — a mini table or stacked rows with columns: `Timestamp | Line | Delivery Cue`. 5–7 rows covering 0:00–0:45. Delivery cues like `[pause 0.5s, drop pitch]`, `[accelerate, build tension]`.
  - **Retention Beats** — 3 bullets describing where to place open loops.
- **Mid-card CTA:** primary button — **"Get 5,000+ Done-For-You Voiceover Scripts"** with `ArrowRight`.
- **Footer CTA block:** headline *"Your voice is the only asset you can't fake."* / copy *"Clone a broadcast-quality AI voice in under 3 minutes — free tier inside."* / button **"Unlock AI Voice Studio"**.

---

**CARD 2 — VISUAL STYLE PROMPTS**
- Icon: `Palette`. Title: **Visual Style Prompts**. Subtitle: *"Copy-paste prompts for Leonardo.ai & Midjourney."*
- Content blocks:
  - **Style DNA** — a badge cluster (e.g., `Cinematic Noir`, `Volumetric Fog`, `Teal & Orange`, `35mm Grain`, `Hyper-Detailed`).
  - **Aspect Ratio & Render Flags** — a compact spec grid with labeled values: `Aspect Ratio` (`9:16`), `Resolution` (`1080x1920`), `Model` (`Leonardo Phoenix / MJ v6.1`), `Stylize` (`250`), `Chaos` (`12`), `Seed` (a deterministic 6-digit number), `Negative Prompt` (a short monospace line). Include a one-tap copy button on each value.
  - **Leonardo.ai Prompt** — full monospace block, 60–110 words, ending with the render flags (`--ar 9:16 --style raw --stylize 250`).
  - **Midjourney Prompt** — a second monospace block, distinct wording, ending with MJ flags (`--ar 9:16 --v 6.1 --stylize 250 --chaos 12 --no text, watermark, extra limbs`).
  - **Character Consistency Token** — a single-line monospace string the user pastes into every future prompt to lock the persona (e.g., `FSP-CORE-[8charID]-v1`), with a `Copy` button and a `Refresh` icon button to regenerate the token.
  - **Negative Prompt Library** — 3 chips, each copyable.
- **Mid-card CTA:** primary button — **"Generate These Visuals in Leonardo.ai — Free Credits"**.
- **Footer CTA block:** headline *"Stop fighting inconsistent AI images."* / copy *"Grab our 40-prompt consistency pack plus the exact seed settings."* / button **"Download the Prompt Pack"**.

---

**CARD 3 — CAMERA MOTION & ANIMATION PLAN**
- Icon: `Video`. Title: **Camera Motion Plan**. Subtitle: *"Shot-by-shot movement, timing, and transitions."*
- Content blocks:
  - **Sequence Overview** — spec grid: `Total Runtime`, `Shot Count`, `Avg Shot Length`, `Pacing Profile` (e.g., `Slow-Burn → Accelerating`), `Target Platform`.
  - **Shot List** — a vertical timeline. Each shot is a row with:
    - A left rail: a numbered circle (`01`, `02`, …) connected by a vertical gradient line.
    - `Shot 01 — 0:00–0:04`
    - **Motion:** (e.g., `Slow push-in, 5% scale over 4s`)
    - **Transition:** (e.g., `Hard cut on beat`)
    - **Animation Cue:** (e.g., `Subtle parallax on foreground fog; particle drift`)
    - Include 5–7 shots total. Each shot row has its own tiny copy button.
  - **Camera Rig Cheat Sheet** — 3 bullets: recommended AI video tool settings, FPS, and motion-strength values.
  - **Sound Design Layer** — 3 bullets: bed track BPM, SFX hits, silence placement.
- **Mid-card CTA:** primary button — **"Animate These Shots in One Click"**.
- **Footer CTA block:** headline *"Static images don't retain. Motion does."* / copy *"Test the AI animation engine top faceless channels are quietly using."* / button **"Try the Animation Engine"**.

---

**GLOBAL RESULT ACTIONS (above the three-card grid, right-aligned):**
- A compact toolbar with: `Copy Full Package` (primary-ish, copies all three cards as one structured text doc with `===` dividers), `Regenerate` (ghost, `RefreshCw`, re-runs generation with a new seed), and `Export as .txt` (ghost, `Download`, generates and downloads a Blob). On mobile this toolbar wraps and buttons go full-width.

---

### 4.5 "HOW IT WORKS" SECTION (`id="how-it-works"`)
Three-column feature row beneath the results. Each item: numbered gradient circle, bold title, 2-line description, muted icon watermark. Titles: **1. Pick Your Niche**, **2. Lock Your Persona**, **3. Publish & Scale**. Wrapped in `max-w-6xl mx-auto py-24` with a subtle top border divider.

### 4.6 TRUST / SOCIAL PROOF STRIP (`id="library"`)
A horizontal strip with 4 stat blocks separated by vertical dividers: `128,400+ Blueprints Generated`, `3,900+ Faceless Creators`, `12 Niches Supported`, `4.9/5 Avg. Creator Rating`. Numbers in gradient text, labels in muted uppercase. Below it, a marquee or 3-column grid of 6 short testimonial cards (avatar circle placeholder, name, handle, one-line quote, 5 star icons in cyan).

### 4.7 FINAL CTA BANNER (`id="resources"`)
Full-width glass panel with a strong gradient border, centered: headline **"Ready to scale your faceless channel?"**, subcopy, a large primary button **"Get the Complete Creator Stack"**, and a secondary ghost button **"Browse Free Resources"**. Add a small risk-reversal line beneath: *"Free tier available · No credit card required."*

---

## 5. FOOTER

- Background `bg-[#121216]`, top border `border-t border-[#26262F]`, `py-14`.
- **Four-column grid on desktop (`grid-cols-1 md:grid-cols-4 gap-10`), stacked on mobile:**
  1. **Brand column:** logo lockup (same as navbar) + tagline *"Build the blueprint. Stay faceless. Scale the traffic."* + 4 social icon buttons (YouTube, TikTok, X, Instagram) as muted circles that highlight purple on hover.
  2. **Product:** `Generator`, `How It Works`, `Prompt Library`, `Creator Stack`, `Changelog`.
  3. **Resources:** `Blog`, `Niche Playbooks`, `Voiceover Scripts`, `AI Tool Reviews`, `Contact`.
  4. **Legal:** `Privacy Policy` → `/privacy`, `Terms of Service` → `/terms`, `Affiliate Disclosure` → `/affiliate-disclosure`, `Cookie Preferences`.
- **Bottom bar:** `border-t border-[#26262F] mt-12 pt-6 flex flex-col md:flex-row justify-between gap-3` containing:
  - Left: `© 2025 Faceless Studio Pro. All rights reserved.`
  - Right: `Built for creators who'd rather stay behind the camera.`
- **Required disclaimer text** (small, `text-[11px] text-[#6B6B78] max-w-3xl mt-6 leading-relaxed`):
  > *"Faceless Studio Pro is an independent creative tool and is not affiliated with, endorsed by, or sponsored by Leonardo.ai, Midjourney, TikTok, YouTube, Instagram, or any third-party platform referenced on this site. Some links on this page are affiliate links, and we may earn a commission if you make a purchase through them — at no additional cost to you. Results are not guaranteed and vary by effort, niche, and execution. This site does not provide financial, legal, or investment advice."*

---

## 6. LEGAL PAGES (must be real, routable, and readable)

Build all three as standalone pages sharing the navbar + footer, each with a `max-w-3xl mx-auto py-20` prose layout (`prose prose-invert`), an H1, a "Last updated" line, and clearly sectioned H2s:

- **`/privacy` — Privacy Policy:** data collected (form inputs are processed client-side only; analytics/affiliate cookies disclosure), cookies & tracking, third-party affiliate networks, user rights (GDPR/CCPA mention), data retention, contact email placeholder `privacy@facelessstudiopro.com`.
- **`/terms` — Terms of Service:** acceptance, acceptable use, no-guarantee-of-results clause, intellectual property (generated output ownership belongs to the user), third-party links, limitation of liability, changes to terms, governing law placeholder.
- **`/affiliate-disclosure` — Affiliate Disclosure:** plain-English statement that the site earns commissions, FTC-compliant language, list of affiliate program categories (AI video tools, voiceover software, hosting, courses), statement that commissions never affect recommendations or pricing, and instructions for questions.

Include a "Back to Generator" ghost button at the top of each legal page.

---

## 7. GENERATION LOGIC (CLIENT-SIDE, DETERMINISTIC, NICHE-AWARE)

Create `src/lib/generator.ts` exporting `generatePackage({ niche, topic, seed }): ProductionPackage`.

- Build a `NICHE_PROFILES` record keyed by the 10 niche strings, each containing: archetype name, tone tags, wardrobe items, voice spec (voice type, WPM, pitch, accent, register, pause), style DNA tags, palette names, environment descriptors, camera pacing profile, sound design notes, and 3 hook templates.
- Use the `topic` string plus the niche profile to compose all output text via template functions. Substitute the topic into hooks, shot descriptions, and prompts so output feels bespoke (e.g., `"The truth about ${topic} is worse than you think."`).
- Derive a deterministic `seed` from the topic string (simple hash → 6 digits) so `Regenerate` produces a new but stable variation when the seed is incremented.
- Include a `slugify` helper for the Character Consistency Token and the `.txt` export filename.
- `generatePackage` must return a fully typed object:

```ts
interface ProductionPackage {
  niche: string;
  topic: string;
  seed: number;
  generatedAt: string;
  character: {
    archetype: string; consistencyScore: number; toneTags: string[];
    physicalDescription: string; wardrobe: string[]; voiceSpec: Record<string,string>;
    hooks: { label: string; text: string }[];
    cueSheet: { timestamp: string; line: string; cue: string }[];
    retentionBeats: string[];
  };
  visual: {
    styleDNA: string[]; aspectRatio: string; resolution: string; model: string;
    stylize: number; chaos: number; seedValue: number; negativePrompt: string;
    leonardoPrompt: string; midjourneyPrompt: string;
    consistencyToken: string; negativeLibrary: string[];
  };
  camera: {
    overview: Record<string,string>;
    shots: { index: number; timecode: string; motion: string; transition: string; animationCue: string }[];
    rigCheatSheet: string[]; soundDesign: string[];
  };
}

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://facelessstudioprompts.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7c8b573b-17ba-46d3-90a7-f78747b70fd1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
