import { Link } from "@tanstack/react-router";
import { Compass, ImageIcon, Layers, Mic, Rocket, Sparkles, Video } from "lucide-react";

import { NICHES } from "@/lib/generator";
import { AffiliateCta } from "./primitives";

const STEPS = [
  {
    title: "1. Pick Your Niche",
    copy: "Choose from twenty-four faceless verticals. Each one carries its own archetype, palette, and pacing profile.",
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

const FEATURES = [
  {
    title: "Recurring character profile",
    copy: "Archetype, physical description, wardrobe and voice spec written once so you can paste the same block into every prompt and stop the character drifting between shots.",
    Icon: Sparkles,
  },
  {
    title: "Image prompts for four engines",
    copy: "Leonardo, Midjourney, Google Flow and Flux-ready copy, each carrying the same seed and consistency token rather than four different descriptions of the same scene.",
    Icon: ImageIcon,
  },
  {
    title: "Shot list with camera motion",
    copy: "Timecoded shots written engine-ready for Veo, Runway, Kling or Luma — the camera movement is stated in the prompt instead of left to the model to invent.",
    Icon: Video,
  },
  {
    title: "Narration cue sheet, plus sound design",
    copy: "Spoken lines with pacing and emotional tags for your voice tool, kept separate from the music beds and mix notes your editor works from.",
    Icon: Mic,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-line mt-24 border-t">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          How <span className="gradient-text">The Faceless Prompts</span> works
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
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          What's in <span className="gradient-text">every blueprint</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink-dim md:text-base">
          One run of the generator returns all four of these for the niche and topic you type —
          written to paste straight into your tools, not to read and forget.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass-card p-6">
              <f.Icon className="h-5 w-5 text-cyan" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{f.copy}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-muted">
          {NICHES.length} niches tuned · more prompts in the{" "}
          <Link to="/library" className="text-cyan underline underline-offset-2 hover:text-white">
            prompt library
          </Link>{" "}
          · free to use, no account required. Views are never guaranteed.
        </p>
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
