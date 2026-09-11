import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, AudioLines, Camera, ImageIcon } from "lucide-react";

import { LeaderboardAd, NativeAd } from "@/components/site/AdSlot";
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
import { NICHE_PAGES, getNichePage, type NichePage, type NichePrompt } from "@/data/niches";
import { SITE_URL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/niches/$slug")({
  loader: ({ params }) => {
    const page = getNichePage(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ params, loaderData }) => {
    const page = loaderData?.page;
    if (!page) {
      return {
        meta: [{ title: "Niche not found | The Faceless Prompts" }, { name: "robots", content: "noindex" }],
      };
    }
    const base = pageHead({
      path: `/niches/${params.slug}`,
      title: page.seoTitle,
      description: page.metaDescription,
      type: "article",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
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

function NicheLandingPage() {
  const { page } = Route.useLoaderData();
  const related = page.relatedSlugs
    .map((s) => getNichePage(s))
    .filter((n): n is NichePage => Boolean(n));

  return (
    <div className="bg-base min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pt-28 pb-20">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-dim">
          <Link to="/niches" className="hover:text-white">
            Niches
          </Link>
          <span className="px-1.5">/</span>
          <span className="text-ink">{page.name}</span>
        </nav>

        <article>
          <header className="mt-4 max-w-3xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{page.h1}</h1>
            <p className="mt-4 leading-relaxed text-ink-dim">{page.intro}</p>
            <Link
              to="/"
              search={{ niche: page.niche, topic: "" }}
              hash="generator"
              className="from-purple to-cyan mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-5 py-2.5 text-sm font-semibold text-[#0a0a0c] transition-all hover:brightness-110"
            >
              Generate a {page.name} blueprint
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </header>

          <div className="mt-10">
            <LeaderboardAd />
          </div>

          <section className="mt-10" aria-labelledby="blueprints">
            <h2 id="blueprints" className="text-xl font-bold text-white">
              Five {page.name} prompt blueprints
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-ink-dim">
              Copy any block straight into Midjourney, Veo, Runway, Kling or ElevenLabs. Swap
              <span className="font-mono"> [your topic] </span>
              for the story you&apos;re telling and keep everything else identical so the character
              stays consistent.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {page.prompts.map((p, i) => (
                <PromptCard key={p.title} prompt={p} index={i} />
              ))}
            </div>
          </section>

          <div className="mt-10">
            <NativeAd />
          </div>

          <section className="mt-12" aria-labelledby="faq">
            <h2 id="faq" className="text-xl font-bold text-white">
              {page.name} questions
            </h2>
            <Accordion type="single" collapsible className="mt-4">
              {page.faqs.map((f) => (
                <AccordionItem key={f.question} value={f.question} className="border-line">
                  <AccordionTrigger className="text-left text-sm text-white hover:no-underline">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-ink-dim">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </article>

        {related.length > 0 ? (
          <section className="mt-14" aria-labelledby="related">
            <h2 id="related" className="text-xl font-bold text-white">
              Related niches
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((n) => (
                <Link
                  key={n.slug}
                  to="/niches/$slug"
                  params={{ slug: n.slug }}
                  className="glass-card hover:border-purple group p-5 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-white">{n.name}</h3>
                  <p className="mt-2 line-clamp-2 text-xs text-ink-dim">{n.metaDescription}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-purple-bright group-hover:text-cyan">
                    View prompts
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink-dim">
              Or browse all{" "}
              <Link to="/niches" className="text-purple-bright hover:text-cyan">
                24 faceless video niches
              </Link>
              .
            </p>
          </section>
        ) : null}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export const ALL_NICHE_SLUGS = NICHE_PAGES.map((n) => n.slug);
