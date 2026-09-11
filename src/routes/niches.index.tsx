import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { NICHE_PAGES } from "@/data/niches";
import { pageHead } from "@/lib/seo";

const PATH = "/niches";
const TITLE = "24 Faceless Video Niches with AI Prompts";
const DESC =
  "Browse 24 proven faceless video niches. Each page has copy-paste character, image and camera prompts for Midjourney, Veo, Runway and ElevenLabs.";

export const Route = createFileRoute("/niches/")({
  head: () => pageHead({ path: PATH, title: TITLE, description: DESC, type: "website" }),
  component: NichesDirectory,
});

function NichesDirectory() {
  return (
    <div className="bg-base min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-20">
        <header className="max-w-3xl">
          <p className="text-[11px] font-medium tracking-widest text-ink-dim uppercase">
            Niche directory
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            24 faceless video niches, each with <span className="gradient-text">ready prompts</span>
          </h1>
          <p className="mt-4 text-ink-dim">
            Pick the format you want to publish. Every niche page carries five copy-paste blueprints
            — character and voiceover, master image prompt, and camera shot prompt — plus answers to
            the questions creators ask before they start.
          </p>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NICHE_PAGES.map((n) => (
            <Link
              key={n.slug}
              to="/niches/$slug"
              params={{ slug: n.slug }}
              className="glass-card hover:border-purple group flex flex-col p-5 transition-colors"
            >
              <h2 className="text-base font-semibold text-white">{n.name}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-ink-dim">{n.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-purple-bright transition-colors group-hover:text-cyan">
                View prompts
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
