import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Search, Wand2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { copyText } from "@/components/site/primitives";
import { PROMPTS, PROMPT_CATEGORIES, type PromptCategory } from "@/data/promptLibrary";
import { NICHES } from "@/lib/generator";
import { cn } from "@/lib/utils";

const TITLE = "Prompt Library — 60+ Faceless AI Video Prompts | The Faceless Prompts";
const DESC =
  "A searchable library of 60+ copy-paste prompts for faceless AI video creators: image generation, video generation, SEO, character consistency and niche playbooks.";

export const Route = createFileRoute("/library")({
  head: () => pageHead({ path: "/library", title: TITLE, description: DESC, type: "website" }),
  component: LibraryPage,
});

const BADGE: Record<PromptCategory, string> = {
  "Image Gen": "border-purple/40 bg-purple/15 text-purple-bright",
  "Video Gen": "border-cyan/40 bg-cyan/15 text-cyan",
  SEO: "border-amber-400/40 bg-amber-400/15 text-amber-300",
  Character: "border-pink-400/40 bg-pink-400/15 text-pink-300",
  Niche: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
};

/** Best-effort mapping from a library entry to one of the generator's niches. */
function toGeneratorNiche(niche: string | undefined, category: PromptCategory): string {
  const key = (niche ?? "").toLowerCase();
  if (key.includes("true crime")) return NICHES[10];
  if (key.includes("drama")) return NICHES[6];
  if (key.includes("anime")) return NICHES[3];
  if (key.includes("asmr")) return NICHES[5];
  if (key.includes("pov")) return NICHES[2];
  if (key.includes("influencer")) return NICHES[8];
  if (key.includes("nursery")) return NICHES[9];
  if (key.includes("cooking")) return NICHES[1];
  if (key.includes("stickman")) return NICHES[4];
  if (category === "SEO") return NICHES[16];
  if (category === "Character") return NICHES[0];
  return NICHES[0];
}

function LibraryPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<"All" | PromptCategory>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (active !== "All" && p.category !== active) return false;
      if (!q) return true;
      return p.title.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q);
    });
  }, [query, active]);

  return (
    <div className="bg-canvas relative min-h-screen overflow-x-hidden text-ink">
      <div className="ambient-glow pointer-events-none absolute inset-x-0 top-0 z-0 h-[50vh]" />
      <Navbar />

      <main className="relative z-10 px-4 pt-32 pb-20">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Prompt <span className="gradient-text">Library</span>
          </h1>
          <p className="mt-4 text-base text-ink-dim md:text-lg">
            60+ proven prompts for faceless AI video creators. Copy, paste, create.
          </p>
        </header>

        {/* SEARCH */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompts…"
              aria-label="Search prompts"
              className="bg-surface2 border-line-hover h-12 w-full rounded-xl border pr-3 pl-10 text-sm text-ink placeholder:text-ink-muted focus:border-purple focus:ring-2 focus:ring-purple focus:outline-none"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2">
          {(["All", ...PROMPT_CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-1.5 text-xs transition-colors",
                active === c
                  ? "border-purple bg-purple/15 text-white"
                  : "border-line bg-surface2 hover:border-purple text-ink-dim hover:text-white",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-ink-muted">
          Showing {filtered.length} of {PROMPTS.length} prompts
        </p>

        {/* GRID */}
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="glass-card top-rail-pc group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-shadow hover:shadow-[0_0_46px_-18px_rgba(139,92,246,0.75)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase",
                    BADGE[p.category],
                  )}
                >
                  {p.category}
                </span>
                {p.reactions ? (
                  <span className="flex items-center gap-1 text-[11px] text-ink-muted">
                    <Heart className="h-3.5 w-3.5" aria-hidden />
                    {p.reactions}
                  </span>
                ) : null}
              </div>

              <h2 className="mt-3 text-base font-bold text-ink">{p.title}</h2>
              {p.niche ? <p className="mt-1 text-[11px] text-ink-muted">{p.niche}</p> : null}

              <pre className="border-line bg-code mt-3 line-clamp-4 overflow-hidden rounded-lg border p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap text-[#d4d4dc]">
                {p.prompt}
              </pre>

              {p.tips ? <p className="mt-2 text-[11px] text-ink-dim">{p.tips}</p> : null}

              <div className="mt-4 flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => void copyText(p.prompt, "Prompt copied to clipboard")}
                  className="from-purple to-cyan inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r px-3 py-2 text-xs font-semibold text-[#0a0a0c] transition-all hover:brightness-110 focus-visible:ring-2 focus-visible:ring-purple-bright focus-visible:outline-none"
                >
                  Copy Prompt
                </button>
                <Link
                  to="/"
                  search={{
                    niche: toGeneratorNiche(p.niche, p.category),
                    topic: p.niche ? `${p.niche} — ${p.title}` : p.title,
                  }}
                  hash="generator"
                  className="border-line-hover bg-surface2 hover:border-purple inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs text-ink transition-colors hover:text-white"
                >
                  <Wand2 className="h-3.5 w-3.5" aria-hidden />
                  Try in Generator
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-ink-dim">
            No prompts match that search. Try a different word or category.
          </p>
        ) : null}

      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
