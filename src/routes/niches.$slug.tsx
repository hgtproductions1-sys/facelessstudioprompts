import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowRight,
  AudioLines,
  Camera,
  Check,
  ImageIcon,
  ListChecks,
} from "lucide-react";

import { LeaderboardAd, NativeAd } from "@/components/site/AdSlot";
import { EditorialByline } from "@/components/site/EditorialByline";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { CopyButton } from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getNicheGuide } from "@/data/nicheGuides";
import { getNichePage, type NichePage, type NichePrompt } from "@/data/niches";
import { getTopPromptsForNiche } from "@/data/promptLibrary";
import { SITE_NAME, SITE_URL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/niches/$slug")({
  loader: ({ params }) => {
    const page = getNichePage(params.slug);
    const guide = getNicheGuide(params.slug);
    if (!page || !guide) throw notFound();
    return { page, guide };
  },
  head: ({ params, loaderData }) => {
    const page = loaderData?.page;
    const guide = loaderData?.guide;
    if (!page || !guide) {
      return {
        meta: [{ title: "Niche not found | The Faceless Prompts" }, { name: "robots", content: "noindex" }],
      };
    }
    const base = pageHead({
      path: `/niches/${params.slug}`,
      title: `${page.name} Ideas & AI Prompts`,
      description: guide.searchSummary,
      type: "article",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${page.name} Channel Ideas, Prompts & Workflow`,
            description: guide.searchSummary,
            mainEntityOfPage: `${SITE_URL}/niches/${page.slug}`,
            datePublished: "2026-10-07",
            dateModified: "2026-10-07",
            author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/about` },
            publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/favicon.png` },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Niches", item: `${SITE_URL}/niches` },
              {
                "@type": "ListItem",
                position: 2,
                name: page.name,
                item: `${SITE_URL}/niches/${page.slug}`,
              },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: NicheNotFound,
  component: NicheLandingPage,
});

function NicheNotFound() {
  return (
    <div className="bg-base min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-white">That niche doesn&apos;t exist</h1>
        <p className="mt-3 text-ink-dim">
          The page you asked for isn&apos;t one of our 24 faceless niches. Browse the full directory
          instead.
        </p>
        <Link
          to="/niches"
          className="from-purple to-cyan mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-5 py-2.5 text-sm font-semibold text-[#0a0a0c] hover:brightness-110"
        >
          See all niches
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </main>
      <Footer />
    </div>
  );
}

const PROMPT_FIELDS = [
  { key: "character", label: "Audio — character & voiceover", Icon: AudioLines },
  { key: "visual", label: "Visual — master image prompt", Icon: ImageIcon },
  { key: "camera", label: "Camera — video shot prompt", Icon: Camera },
] as const;

function PromptCard({ prompt, index }: { prompt: NichePrompt; index: number }) {
  return (
    <article className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white">
        <span className="text-purple-bright font-mono text-xs">
          {String(index + 1).padStart(2, "0")}
        </span>{" "}
        {prompt.title}
      </h3>
      <div className="mt-4 space-y-4">
        {PROMPT_FIELDS.map(({ key, label, Icon }) => (
          <div key={key}>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <h4 className="flex items-center gap-1.5 text-[11px] font-medium tracking-widest text-ink-dim uppercase">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </h4>
              <CopyButton value={prompt[key]} label="Copy" />
            </div>
            <p className="border-line bg-surface2 rounded-lg border p-3 font-mono text-xs leading-relaxed break-words text-ink">
              {prompt[key]}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">{children}</p>;
}

function NicheLandingPage() {
  const { page, guide } = Route.useLoaderData();
  const related = page.relatedSlugs
    .map((s) => getNichePage(s))
    .filter((n): n is NichePage => Boolean(n));
  const recommendedPrompts = getTopPromptsForNiche(page.niche, 3);

  return (
    <div className="bg-base min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pt-28 pb-20">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-dim">
          <Link to="/niches" className="hover:text-white">Niches</Link>
          <span className="px-1.5">/</span>
          <span className="text-ink">{page.name}</span>
        </nav>

        <article>
          <header className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,.75fr)] lg:items-start">
            <div>
              <SectionLabel>{page.primaryKeyword}</SectionLabel>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{page.name} Channel Ideas, Prompts &amp; Workflow</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-ink-dim">{page.intro}</p>
              <EditorialByline updated="October 7, 2026" className="mt-4" />
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
                <span className="border-line bg-surface2 rounded-full border px-3 py-1.5 text-ink-dim">
                  Planning: <span className="text-ink">{page.difficulty}</span>
                </span>
                {guide.bestFormats.map((format) => (
                  <span key={format} className="border-line bg-surface2 rounded-full border px-3 py-1.5 text-ink">{format}</span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/"
                  search={{ niche: page.niche, topic: "" }}
                  hash="generator"
                  className="from-purple to-cyan inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-5 py-3 text-sm font-semibold text-[#0a0a0c] transition-all hover:brightness-110"
                >
                  Generate a {page.name} draft
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a href="#ideas" className="border-line bg-surface2 inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold text-white hover:border-purple">
                  See video ideas
                </a>
              </div>
            </div>

            <aside className="glass-card relative overflow-hidden p-6">
              <div className="from-purple/20 via-transparent to-cyan/10 pointer-events-none absolute inset-0 bg-gradient-to-br" />
              <div className="relative">
                <p className="text-cyan text-xs font-semibold">Channel fit</p>
                <h2 className="mt-1 text-xl font-bold text-white">What this niche should promise</h2>
                <p className="mt-3 text-sm leading-6 text-ink-dim">{guide.promise}</p>
                <div className="border-line mt-5 border-t pt-5">
                  <p className="text-[11px] font-semibold tracking-widest text-ink-muted uppercase">Likely audience</p>
                  <p className="mt-2 text-sm leading-6 text-ink">{guide.audience}</p>
                </div>
              </div>
            </aside>
          </header>

          <div className="mt-10"><LeaderboardAd /></div>

          <nav aria-label="On this page" className="border-line bg-surface/80 mt-10 flex flex-wrap gap-x-5 gap-y-2 rounded-xl border px-4 py-3 text-xs text-ink-dim">
            <span className="font-semibold text-white">On this page</span>
            <a href="#angles" className="hover:text-cyan">Channel angles</a>
            <a href="#ideas" className="hover:text-cyan">Video ideas</a>
            <a href="#workflow" className="hover:text-cyan">Workflow</a>
            <a href="#prompt-tools" className="hover:text-cyan">Prompt tools</a>
            <a href="#blueprints" className="hover:text-cyan">Blueprints</a>
            <a href="#faq" className="hover:text-cyan">FAQ</a>
          </nav>

          <section id="angles" className="mt-16 scroll-mt-24" aria-labelledby="angles-heading">
            <SectionLabel>Build a recognizable channel</SectionLabel>
            <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 id="angles-heading" className="text-2xl font-bold text-white sm:text-3xl">Three channel angles worth testing</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-dim">Pick one angle for your first batch of uploads. A narrower promise makes it easier to judge what viewers actually respond to.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {guide.channelAngles.map((angle, index) => (
                <article key={angle.title} className="glass-card p-5">
                  <div className="bg-purple/10 text-purple-bright flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold">0{index + 1}</div>
                  <h3 className="mt-4 text-base font-semibold text-white">{angle.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-dim">{angle.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="ideas" className="mt-16 scroll-mt-24" aria-labelledby="ideas-heading">
            <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <SectionLabel>Start with a concrete premise</SectionLabel>
                <h2 id="ideas-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Six {page.name} video ideas</h2>
                <p className="mt-3 text-sm leading-6 text-ink-dim">These are starting points, not predictions of what will go viral. Change the subject, setting, or constraint until the idea fits the audience you want to build.</p>
                <Link to="/" search={{ niche: page.niche, topic: guide.videoIdeas[0] ?? "" }} hash="generator" className="text-cyan mt-5 inline-flex items-center gap-1.5 text-sm font-semibold hover:text-white">
                  Generate the first idea <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {guide.videoIdeas.map((idea, index) => (
                  <li key={idea} className="border-line bg-surface rounded-xl border p-4">
                    <div className="flex gap-3">
                      <span className="text-purple-bright font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm leading-6 text-ink">{idea}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <div className="mt-12"><NativeAd /></div>

          <section id="workflow" className="mt-16 scroll-mt-24" aria-labelledby="workflow-heading">
            <SectionLabel>Repeatable production system</SectionLabel>
            <h2 id="workflow-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">A simple episode workflow</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-dim">Use the same sequence for several uploads before changing the format. That gives you cleaner feedback on the idea instead of changing the concept, style, and workflow at the same time.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {guide.episodeStructure.map((step, index) => (
                <article key={step.title} className="glass-card p-5">
                  <p className="text-cyan font-mono text-xs">STEP {index + 1}</p>
                  <h3 className="mt-3 text-sm font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-dim">{step.description}</p>
                </article>
              ))}
            </div>

            <div className="border-line bg-surface2 mt-6 rounded-xl border p-5">
              <div className="flex items-center gap-2">
                <ListChecks className="text-purple-bright h-4 w-4" aria-hidden />
                <h3 className="text-sm font-semibold text-white">Before you publish</h3>
              </div>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {guide.qualityChecks.map((check) => (
                  <li key={check} className="flex gap-2.5 text-sm leading-6 text-ink-dim">
                    <Check className="text-cyan mt-1 h-4 w-4 shrink-0" aria-hidden />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="prompt-tools" className="mt-16 scroll-mt-24" aria-labelledby="prompt-tools-heading">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <SectionLabel>Use the library, not a blank page</SectionLabel>
                <h2 id="prompt-tools-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Recommended prompt tools</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-dim">Use these alongside the niche-specific blueprints below for packaging, visuals, and repeatable production.</p>
              </div>
              <Link to="/library" className="text-cyan inline-flex items-center gap-1.5 text-sm font-semibold hover:text-white">Browse all prompts <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recommendedPrompts.map((prompt) => (
                <article key={prompt.id} className="glass-card flex flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="border-purple/40 bg-purple/10 text-purple-bright rounded-full border px-2 py-1 text-[10px] font-semibold tracking-wider uppercase">{prompt.category}</span>
                    <CopyButton value={prompt.prompt} label="Copy" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{prompt.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-dim">{prompt.tips ?? "Copy the prompt, replace the bracketed fields, and adapt the result to your channel."}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="blueprints" className="mt-16 scroll-mt-24" aria-labelledby="blueprints-heading">
            <SectionLabel>Production examples</SectionLabel>
            <h2 id="blueprints-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Five {page.name} prompt blueprints</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-dim">
              Use these as editable starting points for your preferred image, video, and voice tools. Keep the identity details that matter, replace the story-specific parts, and review every output before publishing.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {page.prompts.map((p, i) => <PromptCard key={p.title} prompt={p} index={i} />)}
            </div>
          </section>

          <section id="faq" className="mt-16 scroll-mt-24" aria-labelledby="faq-heading">
            <SectionLabel>Common planning questions</SectionLabel>
            <h2 id="faq-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">{page.name} FAQ</h2>
            <Accordion type="single" collapsible className="mt-5">
              {page.faqs.map((f) => (
                <AccordionItem key={f.question} value={f.question} className="border-line">
                  <AccordionTrigger className="text-left text-sm text-white hover:no-underline">{f.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-ink-dim">{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </article>

        {related.length > 0 ? (
          <section className="mt-16" aria-labelledby="related-heading">
            <SectionLabel>Keep exploring</SectionLabel>
            <h2 id="related-heading" className="mt-2 text-2xl font-bold text-white">Related faceless niches</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((n) => (
                <Link key={n.slug} to="/niches/$slug" params={{ slug: n.slug }} className="glass-card hover:border-purple group p-5 transition-colors">
                  <h3 className="text-sm font-semibold text-white">{n.name}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-ink-dim">{getNicheGuide(n.slug)?.searchSummary ?? n.metaDescription}</p>
                  <span className="text-purple-bright group-hover:text-cyan mt-4 inline-flex items-center gap-1.5 text-xs font-semibold">Open guide <ArrowRight className="h-3 w-3" aria-hidden /></span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <Link to="/niches" className="text-purple-bright hover:text-cyan">Browse all 24 niches</Link>
              <span className="text-ink-muted">•</span>
              <Link to="/library" className="text-purple-bright hover:text-cyan">Search the prompt library</Link>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
