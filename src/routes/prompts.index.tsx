import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Image as ImageIcon,
  SearchCheck,
  Sparkles,
  UserRound,
  Video,
  Youtube,
} from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { PROMPTS } from "@/data/promptLibrary";
import {
  PROMPT_COLLECTIONS,
  getPromptsForCollection,
  type PromptCollection,
} from "@/data/promptPages";
import { pageHead } from "@/lib/seo";

const PATH = "/prompts";
const TITLE = `${PROMPTS.length} Free AI Prompt Guides for Faceless Content`;
const DESC =
  `Browse ${PROMPTS.length} free AI prompt guides for faceless YouTube, image generation, video generation, SEO, character consistency, and channel planning.`;

const ICONS = {
  youtube: Youtube,
  "image-generation": ImageIcon,
  "video-generation": Video,
  seo: SearchCheck,
  "character-consistency": UserRound,
} as const;

export const Route = createFileRoute("/prompts/")({
  head: () => pageHead({ path: PATH, title: TITLE, description: DESC, type: "website" }),
  component: PromptsHub,
});

function PromptsHub() {
  const popular = [...PROMPTS].sort((a, b) => (b.reactions ?? 0) - (a.reactions ?? 0)).slice(0, 8);

  return (
    <div className="bg-base min-h-screen">
      <Navbar />
      <main className="pb-20">
        <header className="relative overflow-hidden px-4 pt-28 pb-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(139,92,246,0.15),transparent_32%),radial-gradient(circle_at_82%_0%,rgba(34,211,238,0.10),transparent_28%)]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">Free prompt guides</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Start with a prompt. <span className="gradient-text">Know what to change.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-dim sm:text-lg">
              Browse practical prompt templates for faceless videos, images, YouTube packaging, recurring characters, and repeatable channel systems. Every guide explains what to customize and what to review before publishing.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/library" className="from-purple to-cyan inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-semibold text-[#0a0a0c] hover:brightness-110">
                Search all prompts <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link to="/niches" className="border-line bg-surface2 hover:border-purple inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold text-white">
                Browse niche playbooks
              </Link>
            </div>
          </div>
        </header>

        <section className="px-4" aria-labelledby="collections-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Choose by task</p>
                <h2 id="collections-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Prompt collections</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-dim">Start with the decision you are trying to make, then open the specific prompt guide you need.</p>
              </div>
              <span className="text-sm text-ink-muted">{PROMPTS.length} prompt guides</span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {PROMPT_COLLECTIONS.map((collection) => (
                <CollectionCard key={collection.slug} collection={collection} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-16" aria-labelledby="popular-guides-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">Useful starting points</p>
                <h2 id="popular-guides-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Popular prompt guides</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-dim">Open the guide to see the full prompt, customization fields, usage notes, and related templates.</p>
              </div>
              <Link to="/library" className="text-cyan inline-flex items-center gap-1.5 text-sm font-semibold hover:text-white">
                Search the full library <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((prompt) => (
                <Link
                  key={prompt.id}
                  to="/prompts/$slug"
                  params={{ slug: prompt.id }}
                  className="glass-card hover:border-purple group flex min-h-[230px] flex-col rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="border-purple/40 bg-purple/10 text-purple-bright rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">{prompt.category}</span>
                    {(prompt.reactions ?? 0) >= 600 ? <Sparkles className="h-4 w-4 text-amber-300" aria-label="Popular" /> : null}
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-white">{prompt.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-dim">{prompt.tips ?? "Copy the prompt, replace the bracketed fields, and adapt the result to your own content."}</p>
                  <span className="text-cyan mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold group-hover:text-white">
                    Open prompt guide <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-16" aria-labelledby="how-prompts-heading">
          <div className="mx-auto max-w-5xl rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Use AI prompts responsibly</p>
            <h2 id="how-prompts-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">The prompt is only the first draft of the decision</h2>
            <div className="mt-6 grid gap-5 text-sm leading-6 text-ink-dim md:grid-cols-3">
              <p><strong className="text-white">Be specific.</strong><br />Replace every placeholder with details from the actual topic, audience, scene, or character you are making.</p>
              <p><strong className="text-white">Review the output.</strong><br />Check facts, continuity, rights, platform rules, and whether the result matches the promise of your content.</p>
              <p><strong className="text-white">Add your own judgment.</strong><br />Use AI for structure and options, then make the final creative and editorial decisions yourself.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

function CollectionCard({ collection }: { collection: PromptCollection }) {
  const Icon = ICONS[collection.slug as keyof typeof ICONS] ?? Sparkles;
  const count = getPromptsForCollection(collection).length;
  return (
    <Link
      to="/prompts/$slug"
      params={{ slug: collection.slug }}
      className="glass-card hover:border-purple group flex min-h-[250px] flex-col rounded-2xl p-5 transition-all hover:-translate-y-0.5"
    >
      <span className="border-line bg-surface2 text-purple-bright inline-flex h-10 w-10 items-center justify-center rounded-xl border">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-4 text-base font-bold text-white">{collection.label}</h3>
      <p className="mt-2 line-clamp-4 text-sm leading-6 text-ink-dim">{collection.description}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-xs text-ink-muted">{count} prompts</span>
        <span className="text-cyan inline-flex items-center gap-1 text-xs font-semibold group-hover:text-white">Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden /></span>
      </div>
    </Link>
  );
}
