import { Compass, Layers, Rocket, Star } from "lucide-react";

import { AffiliateCta } from "./primitives";

const STEPS = [
  {
    title: "1. Pick Your Niche",
    copy: "Choose from ten proven faceless verticals. Each one carries its own archetype, palette, and pacing profile.",
    Icon: Compass,
  },
  {
    title: "2. Lock Your Persona",
    copy: "Copy the consistency token into every prompt so your character, wardrobe, and lighting never drift.",
    Icon: Layers,
  },
  {
    title: "3. Publish & Scale",
    copy: "Follow the shot list and cue sheet, export the package, and ship a video a day without ever being on camera.",
    Icon: Rocket,
  },
];

const STATS = [
  ["128,400+", "Blueprints Generated"],
  ["3,900+", "Faceless Creators"],
  ["12", "Niches Supported"],
  ["4.9/5", "Avg. Creator Rating"],
];

const TESTIMONIALS = [
  [
    "Dana R.",
    "@quietcasefiles",
    "First blueprint hit 410k views. The hook options alone are worth it.",
  ],
  ["Milo T.", "@stoicdaily", "My character finally looks the same in every single frame."],
  [
    "Priya N.",
    "@passivepriya",
    "The cue sheet cut my scripting time from two hours to twelve minutes.",
  ],
  [
    "Jonas K.",
    "@deepfieldshorts",
    "Camera plan is the part every other tool skips. This one nails it.",
  ],
  ["Ava L.", "@darkpsychnotes", "Pasted the Midjourney prompt straight in. Zero edits needed."],
  ["Ben O.", "@offgridben", "Ran nine videos off one package. Retention went up 22%."],
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-line mt-24 border-t">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          How <span className="gradient-text">Faceless Studio Pro</span> works
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="glass-card relative overflow-hidden p-6">
              <s.Icon
                className="absolute -right-4 -bottom-4 h-24 w-24 text-white/[0.03]"
                aria-hidden
              />
              <span className="from-purple to-cyan flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-[#0a0a0c]">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section id="library" className="border-line border-t">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="divide-line grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x">
          {STATS.map(([value, label]) => (
            <div key={label} className="px-2 text-center">
              <p className="gradient-text text-2xl font-extrabold md:text-3xl">{value}</p>
              <p className="mt-1 text-[11px] tracking-widest text-ink-muted uppercase">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map(([name, handle, quote]) => (
            <figure key={handle} className="glass-card p-5">
              <div className="flex items-center gap-3">
                <span className="from-purple/40 to-cyan/40 h-9 w-9 rounded-full bg-gradient-to-br" />
                <div>
                  <figcaption className="text-sm font-semibold text-ink">{name}</figcaption>
                  <p className="text-xs text-ink-muted">{handle}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-cyan text-cyan" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-2 text-sm text-ink-dim">“{quote}”</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="resources" className="px-4 pb-24">
      <div className="from-purple/40 to-cyan/40 mx-auto max-w-5xl rounded-2xl bg-gradient-to-r p-px">
        <div className="glass-card rounded-2xl px-6 py-14 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Ready to scale your <span className="gradient-text">faceless channel?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-dim md:text-base">
            Everything you need to run a faceless page at volume — voice, visuals, motion, and the
            offers that monetise the traffic.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AffiliateCta ctaKey="finalBanner" className="w-full px-7 py-3.5 sm:w-auto" />
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            Free tier available · No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
