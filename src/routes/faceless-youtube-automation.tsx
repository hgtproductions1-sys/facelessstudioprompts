import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  AudioLines,
  Camera,
  CircleCheck,
  Clapperboard,
  Compass,
  ImageIcon,
  Sparkles,
  TriangleAlert,
  Wallet,
} from "lucide-react";

import { LeaderboardAd, NativeAd } from "@/components/site/AdSlot";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { NICHES } from "@/lib/generator";
import { SITE_NAME, SITE_URL, pageHead } from "@/lib/seo";

const PATH = "/faceless-youtube-automation";
const TITLE = "Faceless YouTube Automation Guide | The Faceless Prompts";
const DESC =
  "How to start a faceless YouTube automation channel: pick a niche, lock a recurring character, generate image and video prompts, and narrate with AI.";

export const Route = createFileRoute("/faceless-youtube-automation")({
  head: () => pageHead({ path: PATH, title: TITLE, description: DESC, type: "article" }),
  component: FacelessYouTubeAutomationGuide,
});

const STAGES = [
  {
    title: "Fix the niche before you make anything",
    Icon: Compass,
    body: "One niche decides your character, palette, pacing and audience, so pick it once and stop re-deciding. A faceless channel that publishes cat-drama on Monday and finance listicles on Thursday teaches the algorithm nothing about who to show it to. Choose from the twenty-four niches the generator already knows, or use the same list as faceless TikTok niche ideas — the verticals overlap almost completely.",
    action: { label: "Pick a niche in the generator", to: "/" as const, hash: "generator" },
  },
  {
    title: "Lock one recurring character",
    Icon: Sparkles,
    body: "Write the character down once — species, age, wardrobe, one signature prop — and paste the same description into every prompt. That consistency token, plus a fixed seed, is what stops your protagonist mutating between shots. Midjourney character consistency prompts work the same way: a reference description and a locked seed, repeated verbatim rather than rewritten from memory each video.",
    action: { label: "Browse character prompts", to: "/library" as const, hash: undefined },
  },
  {
    title: "Generate stills, then motion",
    Icon: ImageIcon,
    body: "Still frames first, animation second. An image model such as Midjourney, Leonardo, Flux or Imagen produces the keyframes; an animator such as Veo, Runway, Kling or Luma turns them into shots with deliberate camera movement. Writing one engine-ready prompt per shot — camera motion, subject action, environment, lighting — keeps the result from turning into random drift.",
    action: { label: "See the video animators", to: "/ai-tools-hub" as const, hash: undefined },
  },
  {
    title: "Narrate and design the sound",
    Icon: AudioLines,
    body: "Keep the spoken script separate from the sound design. Your voiceover copy should hold natural dialogue plus a few emotional and pacing tags; the music beds, whooshes and mix notes belong in a second list the editor reads. ElevenLabs viral voiceover scripts are written for exactly that split, and it is the difference between a clean narration track and an editor guessing what you meant.",
    action: { label: "Voice and audio tools", to: "/ai-tools-hub" as const, hash: undefined },
  },
  {
    title: "Publish on a fixed cadence",
    Icon: Clapperboard,
    body: "Pick a slot you can hold for ninety days — one short a day beats three on Sunday — and batch the work: script, stills, motion and voice in one sitting, uploads on the schedule. YouTube Short automation is mostly scheduling discipline; the creative decisions should already be made before you sit down.",
    action: { label: "Generate tomorrow's blueprint", to: "/" as const, hash: "generator" },
  },
];

const STACK = [
  ["Script and hooks", "The Faceless Prompts generator", "Three competing openings, a shot list and a cue sheet per topic."],
  ["Stills", "Midjourney, Leonardo, Flux, Google Imagen", "Keyframes with a locked character, palette and seed."],
  ["Motion", "Google Veo, Runway, Kling, Luma", "Short clips with intentional camera movement."],
  ["Voice", "ElevenLabs", "Narration read with pacing and emotional tags."],
  ["Assembly", "CapCut, DaVinci Resolve, Premiere", "Cuts, captions, music bed, loudness."],
  ["Scheduling", "YouTube Studio, TikTok", "Fixed publishing slots instead of opportunistic uploads."],
];

const AUTOMATE = [
  "Prompt construction — same character block, same flags, every time.",
  "Shot planning — camera motion written before you open an editor.",
  "First-pass scripting and hook variants.",
  "Narration drafts and sound-design checklists.",
  "Publishing slots and file naming.",
];

const KEEP_HUMAN = [
  "The niche choice and the promise the channel makes.",
  "Which of the three hooks is actually worth shipping.",
  "The cut that decides pacing — no tool judges rhythm well.",
  "Anything factual you assert about the world.",
  "Reading the comments for what your audience keeps asking for.",
];

const PITFALLS = [
  ["Re-deciding the niche every week", "Nine videos across four topics teaches the algorithm nothing and resets your own templates. Pick one lane and give it fifty uploads."],
  ["Rewriting the character from memory", "Every re-typed description drifts, and the audience notices a face that changes. Store the block and paste it."],
  ["Automating the taste", "Tools produce options, not judgement. Shipping the first draft is how an automated channel ends up sounding like everyone else's."],
  ["Waiting for permission to start", "No threshold stops you publishing. Build the library first; the eligibility numbers only matter once people are watching."],
];

const FAQ = [
  [
    "Do I need to show my face?",
    "No. The whole workflow is built around a recurring character or illustrated subject, a voice track and cut shots. Nothing in the pipeline requires a camera on you.",
  ],
  [
    "How many videos a week?",
    "One short a day is the default recommendation because cadence is what the ranking systems reward, but a sustainable five a week beats a burnout sprint of twenty-one. Batch production makes the difference: make a week of blueprints in one sitting.",
  ],
  [
    "Which tools do I actually have to pay for?",
    "You can start free: this generator needs no signup, and most image, video and voice tools offer a free tier or trial. Pay for the one thing that becomes the bottleneck — usually video generation minutes or voice characters.",
  ],
  [
    "Can I reuse one blueprint across platforms?",
    "Yes, with care. A vertical 9:16 short uploads to YouTube Shorts, TikTok and Reels, but keep each platform's watermark off the file you repost and re-title for the platform's own search behaviour.",
  ],
  [
    "Is faceless YouTube automation allowed?",
    "Automating production is fine; republishing someone else's material or mass-producing repetitive, low-effort uploads is what gets channels demonetised. Original scripts, original visuals and a real editorial decision on every upload keep you on the right side of that line.",
  ],
];

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Faceless YouTube Automation: The Start-a-Channel Guide",
        description: DESC,
        inLanguage: "en",
        author: { "@type": "Organization", name: SITE_NAME },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}${PATH}`,
        about: [
          "Faceless YouTube automation",
          "Short-form video prompt generator",
          "Midjourney character consistency prompts",
          "Faceless TikTok niche ideas",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Generator", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Library", item: SITE_URL + "/library" },
          {
            "@type": "ListItem",
            position: 3,
            name: "Faceless YouTube Automation Guide",
            item: SITE_URL + PATH,
          },
        ],
      },
    ],
  };
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}

function FacelessYouTubeAutomationGuide() {
  return (
    <div className="bg-base relative min-h-screen overflow-x-hidden text-ink">
      <div className="ambient-glow pointer-events-none absolute inset-x-0 top-0 z-0 h-[50vh]" />
      <JsonLd />
      <Navbar />

      <main className="relative z-10 px-4 pt-32 pb-20">
        <article className="mx-auto max-w-3xl">
          <header className="text-center">
            <p className="text-[11px] tracking-widest text-cyan uppercase">Free guide</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              Faceless YouTube <span className="gradient-text">Automation</span>
            </h1>
            <p className="mt-2 text-sm text-ink-muted">The start-a-channel guide</p>
            <p className="mt-6 text-base leading-relaxed text-ink-dim md:text-lg">
              A faceless channel is a production line, not a personality. This guide walks through
              the whole loop — niche, recurring character, stills, motion, narration and a publishing
              cadence — using a short-form video prompt generator so the only thing you decide each
              day is the topic.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                hash="generator"
                className="from-purple to-cyan inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-6 py-3 text-sm font-semibold text-[#0a0a0c] transition-all hover:brightness-110 sm:w-auto"
              >
                <Sparkles className="h-4 w-4" aria-hidden />
                Generate a blueprint free
              </Link>
              <Link
                to="/library"
                className="border-line-hover bg-surface2 hover:border-purple inline-flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm text-ink transition-colors hover:text-white sm:w-auto"
              >
                Browse the prompt library
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </header>
        </article>

        <LeaderboardAd className="mt-14" />

        <article className="mx-auto max-w-3xl space-y-12 pt-14">
          <section aria-labelledby="what-it-is">
            <h2 id="what-it-is" className="text-2xl font-bold md:text-3xl">
              What faceless YouTube automation <span className="gradient-text">actually is</span>
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-dim md:text-base">
              <p>
                The phrase gets used two ways. The honest one: a repeatable production system where
                the format, character and workflow are fixed in advance, so each video costs a small
                amount of decisions instead of a large amount of inspiration. The dishonest one: a
                button that uploads money. The first works. The second is why so many faceless
                channels stall at ten videos.
              </p>
              <p>
                What makes it automatable is that the expensive part — a recurring character that
                looks the same in every frame, a palette that never moves, a shot grammar you don't
                re-invent — is written down once. After that the pipeline is: topic in, blueprint
                out, then stills, motion and voice.
              </p>
            </div>
          </section>

          <section aria-labelledby="what-to-automate">
            <h2 id="what-to-automate" className="text-2xl font-bold md:text-3xl">
              What you automate, and <span className="gradient-text">what you keep</span>
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="glass-card p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                  <CircleCheck className="h-4 w-4 text-cyan" aria-hidden />
                  Hand these to the tools
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-ink-dim">
                  {AUTOMATE.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                  <TriangleAlert className="h-4 w-4 text-amber-300" aria-hidden />
                  Keep these human
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-ink-dim">
                  {KEEP_HUMAN.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <NativeAd className="my-2" />

          <section aria-labelledby="five-stages">
            <h2 id="five-stages" className="text-2xl font-bold md:text-3xl">
              The five-stage loop, <span className="gradient-text">start to upload</span>
            </h2>
            <ol className="mt-8 space-y-5">
              {STAGES.map((stage, i) => (
                <li key={stage.title} className="glass-card relative overflow-hidden p-6">
                  <Camera className="absolute -right-4 -bottom-4 h-24 w-24 text-white/[0.03]" aria-hidden />
                  <div className="flex items-start gap-4">
                    <span className="from-purple to-cyan flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-[#0a0a0c]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
                        <stage.Icon className="h-4 w-4 text-cyan" aria-hidden />
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-dim">{stage.body}</p>
                      <Link
                        to={stage.action.to}
                        hash={stage.action.hash}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm text-purple-bright transition-colors hover:text-cyan"
                      >
                        {stage.action.label}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="niches">
            <h2 id="niches" className="text-2xl font-bold md:text-3xl">
              Twenty-four niches worth <span className="gradient-text">testing first</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim md:text-base">
              These are the verticals the generator is tuned for. Each opens a pre-filled blueprint
              so you can see what a finished package looks like before committing to a lane — the
              same list doubles as faceless TikTok niche ideas, because the formats travel between
              platforms almost unchanged.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {NICHES.map((n) => (
                <li key={n}>
                  <Link
                    to="/"
                    search={{ niche: n }}
                    hash="generator"
                    className="border-line-hover bg-surface2 hover:border-purple inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-ink-dim transition-colors hover:text-white"
                  >
                    {n}
                    <ArrowRight className="h-3 w-3 text-cyan" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="stack">
            <h2 id="stack" className="text-2xl font-bold md:text-3xl">
              The stack, <span className="gradient-text">role by role</span>
            </h2>
            <div className="border-line mt-6 overflow-x-auto rounded-xl border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Tools used at each stage of a faceless YouTube automation workflow
                </caption>
                <thead className="border-line bg-surface2/60 border-b text-[11px] tracking-widest text-ink-muted uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Stage</th>
                    <th scope="col" className="px-4 py-3 font-medium">Typical tools</th>
                    <th scope="col" className="px-4 py-3 font-medium">What it contributes</th>
                  </tr>
                </thead>
                <tbody className="divide-line divide-y text-ink-dim">
                  {STACK.map(([stage, tools, role]) => (
                    <tr key={stage}>
                      <th scope="row" className="px-4 py-3 text-left font-semibold text-ink">{stage}</th>
                      <td className="px-4 py-3">{tools}</td>
                      <td className="px-4 py-3">{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-ink-muted">
              Each tool's own terms, pricing and watermark rules change often — check the current
              plan before you build a workflow on top of it.
            </p>
          </section>

          <NativeAd className="my-2" />

          <section aria-labelledby="money">
            <h2 id="money" className="text-2xl font-bold md:text-3xl">
              Where the revenue <span className="gradient-text">actually comes from</span>
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-dim md:text-base">
              <p>
                <Wallet className="mr-1 inline h-4 w-4 text-cyan" aria-hidden />
                Three sources, usually in this order. Ad revenue first: YouTube's Partner Program
                currently opens at 1,000 subscribers plus either 4,000 public watch hours in the last
                year or 10 million Shorts views in the last 90 days, and the exact numbers do move,
                so read{" "}
                <a
                  href="https://support.google.com/youtube/answer/13443954"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan"
                >
                  the current eligibility terms
                </a>{" "}
                rather than trusting a screenshot. Shorts pays far less per thousand views than
                long-form does, which is the part most "automation" content leaves out.
              </p>
              <p>
                Affiliate income second: recommend tools you genuinely use, disclose it, and put the
                link where the decision happens. This site's own disclosure lives on the{" "}
                <Link to="/affiliate-disclosure" className="text-cyan underline underline-offset-2">
                  affiliate disclosure
                </Link>{" "}
                page.
              </p>
              <p>
                Your own product third, and it is the one that scales: a template pack, a prompt
                library, a paid tier of whatever you already give away. Nothing to approve, no
                per-view ceiling.
              </p>
            </div>
          </section>

          <section aria-labelledby="pitfalls">
            <h2 id="pitfalls" className="text-2xl font-bold md:text-3xl">
              Where beginners <span className="gradient-text">go wrong</span>
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {PITFALLS.map(([heading, body]) => (
                <div key={heading} className="border-line bg-surface2/40 rounded-xl border p-5">
                  <h3 className="text-sm font-semibold text-ink">{heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="faq">
            <h2 id="faq" className="text-2xl font-bold md:text-3xl">
              Common <span className="gradient-text">questions</span>
            </h2>
            <div className="mt-6 divide-line divide-y">
              {FAQ.map(([q, a]) => (
                <div key={q} className="py-5">
                  <h3 className="text-base font-semibold text-ink">{q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="start" className="pt-4">
            <div className="from-purple/40 to-cyan/40 rounded-2xl bg-gradient-to-r p-px">
              <div className="glass-card rounded-2xl px-6 py-12 text-center">
                <h2 id="start" className="text-2xl font-bold md:text-3xl">
                  Start with <span className="gradient-text">one blueprint</span>
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-ink-dim md:text-base">
                  Pick a niche, type a topic, and get a recurring character, image prompts, a shot
                  list and a narration cue sheet in one pass. No account, no card.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to="/"
                    hash="generator"
                    className="from-purple to-cyan inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-6 py-3 text-sm font-semibold text-[#0a0a0c] transition-all hover:brightness-110 sm:w-auto"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden />
                    Generate now
                  </Link>
                  <Link
                    to="/ai-tools-hub"
                    className="border-line-hover bg-surface2 hover:border-purple inline-flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm text-ink transition-colors hover:text-white sm:w-auto"
                  >
                    See the AI tools hub
                  </Link>
                </div>
                <p className="mt-4 text-xs text-ink-muted">
                  Free to use · Results are not guaranteed and vary by niche and effort.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
