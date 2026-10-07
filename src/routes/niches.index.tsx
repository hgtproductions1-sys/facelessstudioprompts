import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { getNicheGuide } from "@/data/nicheGuides";
import { NICHE_PAGES } from "@/data/niches";
import { pageHead } from "@/lib/seo";

const PATH = "/niches";
const TITLE = "24 Faceless Video Niche Ideas & Playbooks";
const DESC =
  "Explore 24 faceless video niche ideas with channel angles, video concepts, repeatable workflows, editable AI prompts, and practical publishing checks.";

export const Route = createFileRoute("/niches/")({
  head: () => pageHead({ path: PATH, title: TITLE, description: DESC, type: "website" }),
  component: NichesDirectory,
});

function NichesDirectory() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return NICHE_PAGES.filter((n) => {
      if (difficulty !== "All" && n.difficulty !== difficulty) return false;
      if (!needle) return true;
      const guide = getNicheGuide(n.slug);
      const haystack = [
        n.name,
        n.primaryKeyword,
        ...n.secondaryKeywords,
        guide?.searchSummary ?? "",
        guide?.audience ?? "",
        ...(guide?.bestFormats ?? []),
      ].join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [difficulty, query]);

  return (
    <div className="bg-base min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-20">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">Faceless niche playbooks</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pick a format you can publish <span className="gradient-text">more than once</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-dim">
            Explore 24 channel directions. Each guide includes a clear audience promise, three channel angles, six starter ideas, a repeatable episode workflow, editable production prompts, FAQs, and related niches.
          </p>
        </header>

        <section className="mx-auto mt-10 max-w-4xl" aria-label="Filter niche playbooks">
          <div className="border-line bg-surface rounded-2xl border p-3 sm:flex sm:items-center sm:gap-3">
            <label className="relative block flex-1">
              <span className="sr-only">Search niches</span>
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pets, ASMR, POV, explainers, horror…"
                className="border-line bg-surface2 h-11 w-full rounded-xl border pr-4 pl-10 text-sm text-white outline-none placeholder:text-ink-muted focus:border-purple"
              />
            </label>
            <label className="mt-3 block sm:mt-0">
              <span className="sr-only">Filter by planning complexity</span>
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
                className="border-line bg-surface2 h-11 w-full rounded-xl border px-3 text-sm text-ink outline-none focus:border-purple sm:w-44"
              >
                <option value="All">All complexity</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-ink-muted">
            <span>{results.length} of {NICHE_PAGES.length} playbooks</span>
            {query || difficulty !== "All" ? (
              <button type="button" onClick={() => { setQuery(""); setDifficulty("All"); }} className="text-cyan hover:text-white">Clear filters</button>
            ) : null}
          </div>
        </section>

        {results.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((n) => {
              const guide = getNicheGuide(n.slug);
              return (
                <Link
                  key={n.slug}
                  to="/niches/$slug"
                  params={{ slug: n.slug }}
                  className="glass-card hover:border-purple group flex min-h-[260px] flex-col p-5 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="border-line bg-surface2 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider text-ink-dim uppercase">{n.difficulty} planning</span>
                    <span className="text-[10px] font-medium text-ink-muted">5 blueprints</span>
                  </div>
                  <h2 className="mt-5 text-lg font-semibold text-white">{n.name}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-dim">{guide?.searchSummary ?? n.intro}</p>
                  {guide ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {guide.bestFormats.slice(0, 2).map((format) => (
                        <span key={format} className="bg-purple/10 text-purple-bright rounded-md px-2 py-1 text-[10px]">{format}</span>
                      ))}
                    </div>
                  ) : null}
                  <span className="text-cyan mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold transition-colors group-hover:text-white">
                    Open playbook
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="border-line bg-surface mt-8 rounded-2xl border px-6 py-14 text-center">
            <h2 className="text-lg font-semibold text-white">No niche matches those filters</h2>
            <p className="mt-2 text-sm text-ink-dim">Try a broader keyword or clear the planning-complexity filter.</p>
            <button type="button" onClick={() => { setQuery(""); setDifficulty("All"); }} className="text-cyan mt-5 text-sm font-semibold hover:text-white">Show all niches</button>
          </div>
        )}

        <section className="border-line bg-surface mt-16 rounded-2xl border p-6 sm:p-8" aria-labelledby="how-to-pick-heading">
          <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">Choosing a niche</p>
          <h2 id="how-to-pick-heading" className="mt-2 text-2xl font-bold text-white">Choose for repeatability, not hype</h2>
          <div className="mt-5 grid gap-5 text-sm leading-6 text-ink-dim md:grid-cols-3">
            <p><strong className="text-white">Can you make 20 ideas?</strong><br />A useful niche should give you enough distinct premises to test without repeating the same clip.</p>
            <p><strong className="text-white">Can you keep it recognizable?</strong><br />Recurring characters, sets, visual rules, or episode structures make a channel easier to understand.</p>
            <p><strong className="text-white">Can you add real value?</strong><br />Original storytelling, research, editing, or production choices matter more than generating a large volume of similar assets.</p>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
