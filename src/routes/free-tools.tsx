import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Search, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import { pageHead } from "@/lib/seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LeaderboardAd } from "@/components/site/AdSlot";
import { TOOL_CATEGORIES, VAULT_HACKS } from "@/data/freeTools";
import { cn } from "@/lib/utils";

const TITLE = "The Zero-Budget Creator Vault — Free AI Tools for Faceless Creators";
const DESC =
  "Every free AI tool a faceless creator needs: video & image generators, AI voices, editors, YouTube SEO utilities, and workflow hacks — sorted into one searchable vault.";

export const Route = createFileRoute("/free-tools")({
  head: () => pageHead({ path: "/free-tools", title: TITLE, description: DESC, type: "website" }),
  component: FreeToolsPage,
});

const HACKS_TAB = "hacks";

function FreeToolsPage() {
  const [active, setActive] = useState<string>(TOOL_CATEGORIES[0]?.id ?? "video-image");
  const [query, setQuery] = useState("");
  const [openHack, setOpenHack] = useState<number | null>(0);

  const q = query.trim().toLowerCase();
  const activeCategory = TOOL_CATEGORIES.find((c) => c.id === active);

  const visibleTools = useMemo(() => {
    if (!activeCategory) return [];
    if (!q) return activeCategory.tools;
    return activeCategory.tools.filter(
      (t) => t.name.toLowerCase().includes(q) || t.blurb.toLowerCase().includes(q),
    );
  }, [activeCategory, q]);

  const tabs = [...TOOL_CATEGORIES.map((c) => ({ id: c.id, label: c.label })), { id: HACKS_TAB, label: "Hacks & Tutorials" }];

  return (
    <div className="bg-canvas min-h-screen overflow-x-hidden text-ink">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-20 pt-28">
        <p className="text-[11px] font-medium tracking-[0.25em] text-ink-muted uppercase">
          Zero-Budget Creator Vault
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          The <span className="gradient-text">Zero-Budget Creator Vault</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-ink-dim md:text-base">
          Every free tool that runs a zero-budget faceless channel — sorted by job, searchable, and
          one click away. Some links are affiliate links; we may earn a commission at no cost to
          you.
        </p>

        <LeaderboardAd className="mt-10" />

        {/* Search */}
        <div className="relative mt-10 max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools in this category…"
            aria-label="Search tools"
            className="border-line bg-surface2 focus:border-purple w-full rounded-xl border py-2.5 pr-3 pl-9 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
          />
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Tool categories"
          className="mt-6 flex flex-wrap gap-2 border-b border-line pb-4"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded-lg border px-3.5 py-2 text-sm transition-colors",
                active === tab.id
                  ? "border-purple from-purple/20 to-cyan/15 bg-gradient-to-r font-semibold text-white"
                  : "border-line bg-surface2 text-ink-dim hover:border-line-hover hover:text-white",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tool grid */}
        {active !== HACKS_TAB ? (
          <section aria-label={activeCategory?.label} className="mt-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="glass-card group flex items-center justify-between gap-3 p-4 transition-shadow hover:shadow-[0_0_36px_-16px_rgba(139,92,246,0.75)]"
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-ink group-hover:text-white">
                      {tool.name}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-ink-dim">{tool.blurb}</p>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-cyan"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
            {visibleTools.length === 0 ? (
              <p className="mt-8 text-sm text-ink-muted">
                No tools match “{query}” in this category.
              </p>
            ) : null}
          </section>
        ) : (
          /* Hacks accordion */
          <section aria-label="Hacks and tutorials" className="mt-8 space-y-3">
            {VAULT_HACKS.map((hack, i) => {
              const open = openHack === i;
              return (
                <div key={hack.title} className="glass-card overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenHack(open ? null : i)}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <Wrench className="h-4 w-4 shrink-0 text-cyan" aria-hidden />
                      <span className="text-sm font-semibold text-ink">{hack.title}</span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-ink-muted transition-transform",
                        open && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <p className="border-line border-t px-4 py-4 text-sm leading-relaxed text-ink-dim">
                      {hack.body}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </section>
        )}

        <LeaderboardAd className="mt-14" />

        <div className="mt-14">
          <Link
            to="/"
            className="border-line bg-surface2 hover:border-purple inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-ink-dim transition-colors hover:text-white"
          >
            Back to the Generator
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
