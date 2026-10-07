import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass, FileCheck2, Sparkles, Workflow } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { ARTICLE_GUIDES } from "@/data/articleGuides";
import { pageHead } from "@/lib/seo";

const PATH = "/guides";
const TITLE = "Faceless Content Guides: Strategy, Prompts, Workflow & YouTube Policy";
const DESC =
  "Practical guides for faceless creators covering niche selection, AI image and video prompting, character consistency, production workflow, originality, and YouTube AI policies.";

export const Route = createFileRoute("/guides/")({
  head: () => pageHead({ path: PATH, title: TITLE, description: DESC, type: "website" }),
  component: GuidesHub,
});

const CATEGORY_ICONS = {
  Strategy: Compass,
  Prompting: Sparkles,
  Workflow: Workflow,
  Policy: FileCheck2,
} as const;

function GuidesHub() {
  return (
    <div className="bg-base min-h-screen">
      <Navbar />
      <main className="pb-20">
        <header className="relative overflow-hidden px-4 pt-28 pb-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.16),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.10),transparent_30%)]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Creator guides</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Build the system, not just the <span className="gradient-text">next prompt.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-dim sm:text-lg">
              Practical, long-form guides for planning faceless channels, writing better image and video prompts, keeping characters consistent, building repeatable workflows, and understanding current YouTube AI-content rules.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/prompts"
                className="from-purple to-cyan inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-semibold text-[#0a0a0c] hover:brightness-110"
              >
                Browse prompt guides <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/niches"
                className="border-line bg-surface2 hover:border-purple inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold text-white"
              >
                Explore niche playbooks
              </Link>
            </div>
          </div>
        </header>

        <section className="px-4" aria-labelledby="guides-list-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">Start with the problem</p>
                <h2 id="guides-list-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Practical guides for the decisions that slow creators down
                </h2>
              </div>
              <span className="text-sm text-ink-muted">{ARTICLE_GUIDES.length + 1} in-depth guides</span>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <Link
                to="/faceless-youtube-automation"
                className="glass-card hover:border-purple group flex min-h-[300px] flex-col rounded-2xl p-6 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="border-cyan/30 bg-cyan/10 text-cyan inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">
                    <BookOpen className="h-3.5 w-3.5" aria-hidden />
                    Cornerstone
                  </span>
                  <span className="text-xs text-ink-muted">10 min</span>
                </div>
                <h3 className="mt-5 text-xl font-bold leading-snug text-white">Faceless YouTube Automation: The Start-a-Channel Guide</h3>
                <p className="mt-3 text-sm leading-6 text-ink-dim">
                  A complete production-loop overview covering niche, recurring characters, stills, motion, narration, and publishing cadence.
                </p>
                <span className="text-cyan mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold group-hover:text-white">
                  Read guide <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>

              {ARTICLE_GUIDES.map((guide) => {
                const Icon = CATEGORY_ICONS[guide.category];
                return (
                  <Link
                    key={guide.slug}
                    to="/guides/$slug"
                    params={{ slug: guide.slug }}
                    className="glass-card hover:border-purple group flex min-h-[300px] flex-col rounded-2xl p-6 transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="border-purple/35 bg-purple/10 text-purple-bright inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                        {guide.category}
                      </span>
                      <span className="text-xs text-ink-muted">{guide.readMinutes} min</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold leading-snug text-white">{guide.title}</h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-ink-dim">{guide.summary}</p>
                    <span className="text-cyan mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold group-hover:text-white">
                      Read guide <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 pt-16" aria-labelledby="guide-method-heading">
          <div className="mx-auto max-w-5xl rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Editorial approach</p>
            <h2 id="guide-method-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Useful first. Searchable second.
            </h2>
            <div className="mt-6 grid gap-5 text-sm leading-6 text-ink-dim md:grid-cols-3">
              <p><strong className="text-white">Specific workflows.</strong><br />Each guide turns a broad topic into decisions, examples, checklists, or steps you can actually use.</p>
              <p><strong className="text-white">No growth guarantees.</strong><br />We do not present niches, prompts, or tools as guaranteed views, revenue, RPM, or monetization approval.</p>
              <p><strong className="text-white">Policy claims sourced.</strong><br />When platform rules matter, we link to first-party documentation and date the review so you can verify current guidance.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
