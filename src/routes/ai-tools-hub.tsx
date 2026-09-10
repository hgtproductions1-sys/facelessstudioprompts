import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LeaderboardAd } from "@/components/site/AdSlot";
import { AI_TOOLS, ENGINE_GROUPS } from "@/config/aiTools";
import { handleCtaClick } from "@/config/affiliates";

const TITLE = "AI Tools Hub — Image, Video & Voice Engines for Faceless Creators";
const DESC =
  "The image generators, video animators, and voice engines faceless creators use daily — what each one is best at, and the prompt syntax that works.";

export const Route = createFileRoute("/ai-tools-hub")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToolsHub,
});

function ToolsHub() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden text-ink">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-20 pt-28">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          The <span className="gradient-text">AI Tools Hub</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-ink-dim md:text-base">
          Every engine the generator writes prompts for, grouped by the job it does in a faceless
          production line. Links below are affiliate links — we may earn a commission at no cost to
          you.
        </p>

        <LeaderboardAd className="mt-10" />

        {ENGINE_GROUPS.map((group) => (
          <section key={group.key} className="mt-14">
            <h2 className="text-xl font-bold">{group.label}</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {AI_TOOLS.filter((t) => t.category === group.key).map((tool) => (
                <article key={tool.id} className="glass-card flex flex-col p-5">
                  <h3 className="text-lg font-semibold text-ink">{tool.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-dim">{tool.blurb}</p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onClick={() => handleCtaClick(tool.id)}
                    className="from-purple to-cyan mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-[#0a0a0c] transition-all hover:brightness-110"
                  >
                    Try on {tool.name}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16">
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
