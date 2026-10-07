import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Copy,
  Image as ImageIcon,
  Layers3,
  Search,
  SearchCheck,
  Sparkles,
  UserRound,
  Video,
  Wand2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { copyText } from "@/components/site/primitives";
import { PROMPTS, PROMPT_CATEGORIES, type Prompt, type PromptCategory } from "@/data/promptLibrary";
import { NICHE_PAGES } from "@/data/niches";
import { NICHES } from "@/lib/generator";
import { cn } from "@/lib/utils";

const TITLE = `${PROMPTS.length} Free AI Prompts for Faceless Content | The Faceless Prompts`;
const DESC =
  `Browse ${PROMPTS.length} free AI prompts for faceless videos, images, YouTube SEO, recurring characters, and niche planning. Search, filter, copy, and customize.`;

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

const CATEGORY_COPY: Record<PromptCategory, { eyebrow: string; description: string }> = {
  "Image Gen": {
    eyebrow: "Image prompts",
    description: "Build stronger starting frames, thumbnails, scenes, and visual references.",
  },
  "Video Gen": {
    eyebrow: "Video prompts",
    description: "Direct movement, camera behavior, pacing, dialogue, and scene progression.",
  },
  SEO: {
    eyebrow: "YouTube packaging",
    description: "Draft titles, descriptions, tags, hooks, and community content around a real video.",
  },
  Character: {
    eyebrow: "Character systems",
    description: "Define repeatable appearance, wardrobe, voice, and reference details across scenes.",
  },
  Niche: {
    eyebrow: "Channel planning",
    description: "Turn a niche idea into repeatable formats, content angles, and production workflows.",
  },
};

const PROMPT_GUIDANCE: Record<PromptCategory, { use: string; customize: string; mistake: string }> = {
  "Image Gen": {
    use: "You need a starting frame or visual reference for a scene.",
    customize: "Subject, setting, lighting, framing, and visual style.",
    mistake: "Too many competing subjects or styles. Start with one clear composition and inspect the result.",
  },
  "Video Gen": {
    use: "You have a scene or starting image and need focused motion direction.",
    customize: "Subject action, one camera movement, audio, and the clip's progression.",
    mistake: "Asking one clip to cover several locations or unrelated actions. Split those into separate shots.",
  },
  SEO: {
    use: "You have a real video topic or outline and need clearer packaging.",
    customize: "The actual topic, audience, format, facts, and promise of your video.",
    mistake: "Using packaging that promises something the video never delivers. Treat scores as drafting guidance, not performance predictions.",
  },
  Character: {
    use: "You want to describe a recurring character across multiple scenes.",
    customize: "Distinctive features, wardrobe, props, voice, and reference images where supported.",
    mistake: "Assuming a seed or invented token guarantees consistency. Compare every result with your reference.",
  },
  Niche: {
    use: "You are planning a faceless channel or repeatable format and need a starting structure.",
    customize: "Your topic, audience, tone, publishing format, and production constraints.",
    mistake: "Publishing the draft unchanged. Check facts and add your own observations, examples, and storytelling choices.",
  },
};

const CATEGORY_ICONS: Record<PromptCategory, typeof ImageIcon> = {
  "Image Gen": ImageIcon,
  "Video Gen": Video,
  SEO: SearchCheck,
  Character: UserRound,
  Niche: Layers3,
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

function placeholdersFor(prompt: string) {
  return Array.from(new Set(prompt.match(/\[[^\]\n]{2,60}\]/g) ?? [])).slice(0, 4);
}

function searchableText(prompt: Prompt) {
  return `${prompt.title} ${prompt.category} ${prompt.niche ?? ""} ${prompt.tips ?? ""} ${prompt.prompt}`.toLowerCase();
}

function LibraryPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<"All" | PromptCategory>("All");
  const [niche, setNiche] = useState("All");
  const [sort, setSort] = useState<"recommended" | "az">("recommended");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryCounts = useMemo(
    () => Object.fromEntries(PROMPT_CATEGORIES.map((category) => [category, PROMPTS.filter((p) => p.category === category).length])) as Record<PromptCategory, number>,
    [],
  );

  const niches = useMemo(
    () => Array.from(new Set(PROMPTS.map((p) => p.niche).filter((value): value is string => Boolean(value)))).sort(),
    [],
  );

  const popular = useMemo(
    () => [...PROMPTS].sort((a, b) => (b.reactions ?? 0) - (a.reactions ?? 0)).slice(0, 4),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = PROMPTS.filter((p) => {
      if (active !== "All" && p.category !== active) return false;
      if (niche !== "All" && p.niche !== niche) return false;
      if (q && !searchableText(p).includes(q)) return false;
      return true;
    });

    return [...result].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      return (b.reactions ?? 0) - (a.reactions ?? 0);
    });
  }, [query, active, niche, sort]);

  const hasFilters = query.trim().length > 0 || active !== "All" || niche !== "All";

  function clearFilters() {
    setQuery("");
    setActive("All");
    setNiche("All");
  }

  async function handleCopy(prompt: Prompt) {
    await copyText(prompt.prompt, "Prompt copied to clipboard");
    setCopiedId(prompt.id);
    window.setTimeout(() => setCopiedId((current) => (current === prompt.id ? null : current)), 1800);
  }

  return (
    <div className="bg-canvas relative min-h-screen overflow-x-hidden text-ink">
      <div className="ambient-glow pointer-events-none absolute inset-x-0 top-0 z-0 h-[58vh]" />
      <Navbar />

      <main className="relative z-10 pb-20">
        <section className="px-4 pt-28 sm:pt-32">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <div className="border-purple/30 bg-purple/10 mx-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide text-purple-bright uppercase">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Free prompt library
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Find a better starting prompt in <span className="gradient-text">seconds</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
                Search {PROMPTS.length} practical prompts for faceless videos, images, YouTube packaging,
                recurring characters, and niche planning. Copy one, replace the bracketed details, then make it yours.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-3xl">
              <label htmlFor="prompt-search" className="sr-only">Search the prompt library</label>
              <div className="glass-card relative rounded-2xl p-2 shadow-[0_22px_80px_-45px_rgba(139,92,246,0.8)]">
                <Search
                  className="pointer-events-none absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-ink-muted"
                  aria-hidden
                />
                <input
                  id="prompt-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “thumbnail”, “POV”, “character”, “YouTube title”…"
                  className="bg-surface2 border-line-hover h-14 w-full rounded-xl border pr-12 pl-12 text-base text-ink placeholder:text-ink-muted focus:border-purple focus:ring-2 focus:ring-purple/40 focus:outline-none"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute top-1/2 right-5 -translate-y-1/2 rounded-md p-1 text-ink-muted transition-colors hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {PROMPT_CATEGORIES.map((category) => {
                const Icon = CATEGORY_ICONS[category];
                const selected = active === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActive(selected ? "All" : category)}
                    aria-pressed={selected}
                    className={cn(
                      "glass-card group cursor-pointer rounded-2xl p-4 text-left transition-all hover:-translate-y-0.5 hover:border-purple/60",
                      selected && "border-purple/70 bg-purple/10 shadow-[0_0_35px_-20px_rgba(139,92,246,0.9)]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="border-line bg-surface2 inline-flex h-9 w-9 items-center justify-center rounded-xl border text-purple-bright">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="text-xs font-semibold text-ink-muted">{categoryCounts[category]}</span>
                    </div>
                    <p className="mt-3 text-sm font-bold text-white">{CATEGORY_COPY[category].eyebrow}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">{CATEGORY_COPY[category].description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {!hasFilters ? (
          <section className="px-4 pt-14" aria-labelledby="popular-prompts-heading">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-purple-bright uppercase">Start here</p>
                  <h2 id="popular-prompts-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Popular prompt picks</h2>
                  <p className="mt-2 max-w-2xl text-sm text-ink-dim">A quick cross-section of the library if you are not sure what to search for yet.</p>
                </div>
                <a href="#all-prompts" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:text-white">
                  Browse all prompts <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {popular.map((p) => (
                  <article key={`popular-${p.id}`} className="glass-card flex flex-col rounded-2xl p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase", BADGE[p.category])}>
                        {p.category}
                      </span>
                      <Sparkles className="h-4 w-4 text-amber-300" aria-label="Popular pick" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-white"><Link to="/prompts/$slug" params={{ slug: p.id }} className="hover:text-cyan">{p.title}</Link></h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-dim">{PROMPT_GUIDANCE[p.category].use}</p>
                    <button
                      type="button"
                      onClick={() => void handleCopy(p)}
                      className="border-line-hover bg-surface2 hover:border-purple mt-auto inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold text-white transition-colors"
                    >
                      {copiedId === p.id ? <Check className="h-4 w-4 text-emerald-300" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                      {copiedId === p.id ? "Copied" : "Copy prompt"}
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="all-prompts" className="scroll-mt-24 px-4 pt-16" aria-labelledby="all-prompts-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest text-purple-bright uppercase">Prompt directory</p>
                <h2 id="all-prompts-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {active === "All" ? "All prompts" : CATEGORY_COPY[active].eyebrow}
                </h2>
                <p className="mt-2 text-sm text-ink-dim">
                  Showing {filtered.length} of {PROMPTS.length}. Use filters to narrow the library without opening dozens of tabs.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="sr-only" htmlFor="niche-filter">Filter by niche</label>
                <select
                  id="niche-filter"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="bg-surface2 border-line-hover h-11 min-w-48 rounded-xl border px-3 text-sm text-ink focus:border-purple focus:outline-none"
                >
                  <option value="All">All niches</option>
                  {niches.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>

                <label className="sr-only" htmlFor="sort-prompts">Sort prompts</label>
                <select
                  id="sort-prompts"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as "recommended" | "az")}
                  className="bg-surface2 border-line-hover h-11 min-w-44 rounded-xl border px-3 text-sm text-ink focus:border-purple focus:outline-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="az">A–Z</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {(["All", ...PROMPT_CATEGORIES] as const).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={active === category}
                  className={cn(
                    "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                    active === category
                      ? "border-purple bg-purple/15 text-white"
                      : "border-line bg-surface2 hover:border-purple text-ink-dim hover:text-white",
                  )}
                >
                  {category}{category !== "All" ? ` (${categoryCounts[category]})` : ""}
                </button>
              ))}
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-1 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:text-white"
                >
                  <X className="h-3.5 w-3.5" aria-hidden /> Clear filters
                </button>
              ) : null}
            </div>

            {filtered.length > 0 ? (
              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => {
                  const placeholders = placeholdersFor(p.prompt);
                  return (
                    <article
                      key={p.id}
                      className="glass-card top-rail-pc group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_46px_-18px_rgba(139,92,246,0.65)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase", BADGE[p.category])}>
                            {p.category}
                          </span>
                          {p.niche ? <span className="text-xs text-ink-muted">{p.niche}</span> : null}
                        </div>
                        {(p.reactions ?? 0) >= 600 ? <Sparkles className="h-4 w-4 shrink-0 text-amber-300" aria-label="Popular pick" /> : null}
                      </div>

                      <h3 className="mt-4 text-lg font-bold leading-snug text-white"><Link to="/prompts/$slug" params={{ slug: p.id }} className="hover:text-cyan">{p.title}</Link></h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-dim">{PROMPT_GUIDANCE[p.category].use}</p>

                      {placeholders.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Fields to customize">
                          {placeholders.map((placeholder) => (
                            <span key={placeholder} className="border-line bg-code rounded-md border px-2 py-1 font-mono text-[10px] text-ink-muted">
                              {placeholder}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <details className="border-line bg-code/60 mt-4 rounded-xl border p-3 open:bg-code">
                        <summary className="cursor-pointer select-none text-sm font-semibold text-cyan">Preview prompt & usage notes</summary>
                        <pre className="mt-3 max-h-72 overflow-auto font-mono text-xs leading-relaxed whitespace-pre-wrap break-words text-[#d4d4dc]">{p.prompt}</pre>
                        <dl className="border-line mt-4 space-y-3 border-t pt-4 text-xs leading-relaxed text-ink-dim">
                          <div><dt className="font-semibold text-ink">Customize</dt><dd className="mt-0.5">{placeholders.join(", ") || PROMPT_GUIDANCE[p.category].customize}</dd></div>
                          <div><dt className="font-semibold text-ink">Watch out for</dt><dd className="mt-0.5">{PROMPT_GUIDANCE[p.category].mistake}</dd></div>
                          {p.tips ? <div><dt className="font-semibold text-ink">Tip</dt><dd className="mt-0.5">{p.tips}</dd></div> : null}
                        </dl>
                      </details>

                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        <button
                          type="button"
                          onClick={() => void handleCopy(p)}
                          className="from-purple to-cyan inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-3 py-2.5 text-sm font-semibold text-[#0a0a0c] transition-all hover:brightness-110 focus-visible:ring-2 focus-visible:ring-purple-bright focus-visible:outline-none"
                        >
                          {copiedId === p.id ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                          {copiedId === p.id ? "Copied" : "Copy Prompt"}
                        </button>
                        <Link
                          to="/"
                          search={{
                            niche: toGeneratorNiche(p.niche, p.category),
                            topic: p.niche ? `${p.niche} — ${p.title}` : p.title,
                          }}
                          hash="generator"
                          className="border-line-hover bg-surface2 hover:border-purple inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:text-white"
                        >
                          <Wand2 className="h-4 w-4" aria-hidden />
                          Use Generator
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card mt-8 rounded-2xl px-6 py-14 text-center">
                <Search className="mx-auto h-8 w-8 text-ink-muted" aria-hidden />
                <h3 className="mt-4 text-lg font-bold text-white">No matching prompts</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-ink-dim">Try a broader keyword, another niche, or clear the filters to return to the full library.</p>
                <button type="button" onClick={clearFilters} className="border-line-hover bg-surface2 hover:border-purple mt-5 rounded-lg border px-4 py-2 text-sm font-semibold text-white">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="px-4 pt-20" aria-labelledby="niche-collections-heading">
          <div className="mx-auto max-w-7xl">
            <div className="glass-card overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-widest text-cyan uppercase">Need more than one prompt?</p>
                  <h2 id="niche-collections-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Explore complete niche playbooks</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">Niche pages combine character, image, camera, and planning prompts so you can build a repeatable workflow instead of collecting disconnected prompt snippets.</p>
                </div>
                <Link to="/niches" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan hover:text-white">
                  View all {NICHE_PAGES.length} niches <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {NICHE_PAGES.slice(0, 4).map((item) => (
                  <Link
                    key={item.slug}
                    to="/niches/$slug"
                    params={{ slug: item.slug }}
                    className="border-line bg-surface2/70 hover:border-purple group rounded-2xl border p-4 transition-colors"
                  >
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-muted">{item.intro}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-purple-bright group-hover:text-cyan">
                      Open playbook <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pt-20" aria-labelledby="prompt-help-heading">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-widest text-purple-bright uppercase">Use prompts better</p>
              <h2 id="prompt-help-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">A prompt is a starting point, not the finished work</h2>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                ["1", "Replace the brackets", "Swap every placeholder for specific details from your actual topic, scene, audience, or character."],
                ["2", "Generate one clear beat", "Keep each image or clip focused. Split major location, action, or time changes into separate generations."],
                ["3", "Review before publishing", "Check facts, continuity, rights, platform rules, and whether the output really matches the promise of your content."],
              ].map(([step, title, body]) => (
                <div key={step} className="glass-card rounded-2xl p-5">
                  <span className="border-purple/40 bg-purple/10 inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold text-purple-bright">{step}</span>
                  <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
