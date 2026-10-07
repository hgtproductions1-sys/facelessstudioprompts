import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  ExternalLink,
  Lightbulb,
  ListChecks,
  Sparkles,
} from "lucide-react";

import { EditorialByline } from "@/components/site/EditorialByline";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { ARTICLE_GUIDES, getArticleGuide } from "@/data/articleGuides";
import { NICHE_PAGES } from "@/data/niches";
import { PROMPTS } from "@/data/promptLibrary";
import { SITE_NAME, SITE_URL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = getArticleGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.guide) return {};
    const guide = loaderData.guide;
    return pageHead({
      path: `/guides/${guide.slug}`,
      title: guide.seoTitle,
      description: guide.description,
      type: "article",
    });
  },
  component: GuideArticle,
});

function GuideArticle() {
  const { guide } = Route.useLoaderData();
  const relatedPrompts = guide.relatedPromptSlugs
    .map((slug) => PROMPTS.find((prompt) => prompt.id === slug))
    .filter(Boolean);
  const relatedNiches = guide.relatedNicheSlugs
    .map((slug) => NICHE_PAGES.find((niche) => niche.slug === slug))
    .filter(Boolean);
  const otherGuides = ARTICLE_GUIDES.filter((item) => item.slug !== guide.slug).slice(0, 3);

  const articleUrl = `${SITE_URL}/guides/${guide.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        dateModified: "2026-10-07",
        datePublished: "2026-10-07",
        inLanguage: "en",
        author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/favicon.png` },
        mainEntityOfPage: articleUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: guide.title, item: articleUrl },
        ],
      },
    ],
  };

  return (
    <div className="bg-base min-h-screen">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <Navbar />
      <main className="pb-20">
        <header className="relative overflow-hidden px-4 pt-28 pb-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(139,92,246,0.15),transparent_32%),radial-gradient(circle_at_78%_0%,rgba(34,211,238,0.09),transparent_28%)]" />
          <div className="relative mx-auto max-w-4xl">
            <Link to="/guides" className="text-cyan inline-flex items-center gap-1.5 text-sm font-semibold hover:text-white">
              <ArrowLeft className="h-4 w-4" aria-hidden /> All guides
            </Link>
            <p className="text-purple-bright mt-8 text-[11px] font-semibold tracking-[0.16em] uppercase">{guide.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">{guide.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-ink-dim sm:text-lg">{guide.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" aria-hidden /> {guide.readMinutes} min read</span>
              <span>{guide.category}</span>
            </div>
            <EditorialByline updated={guide.updated} className="mt-3" />
          </div>
        </header>

        <div className="px-4">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article className="min-w-0">
              <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="takeaways-heading">
                <div className="flex items-center gap-2 text-white">
                  <ListChecks className="h-5 w-5 text-cyan" aria-hidden />
                  <h2 id="takeaways-heading" className="text-lg font-bold">Key takeaways</h2>
                </div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {guide.takeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-2.5 text-sm leading-6 text-ink-dim">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-cyan" aria-hidden />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-10 space-y-12">
                {guide.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph.slice(0, 80)} className="mt-4 text-[15px] leading-7 text-ink-dim sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul className="mt-5 space-y-3">
                        {section.bullets.map((item) => (
                          <li key={item} className="flex gap-3 text-[15px] leading-7 text-ink-dim sm:text-base">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.steps ? (
                      <ol className="mt-6 space-y-4">
                        {section.steps.map((step, index) => (
                          <li key={step.title} className="glass-card flex gap-4 rounded-2xl p-5">
                            <span className="from-purple to-cyan flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-[#09090b]">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="font-semibold text-white">{step.title}</h3>
                              <p className="mt-1.5 text-sm leading-6 text-ink-dim">{step.body}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : null}
                    {section.example ? (
                      <div className="border-purple/30 bg-purple/5 mt-6 rounded-2xl border p-5">
                        <div className="text-purple-bright flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                          <Lightbulb className="h-4 w-4" aria-hidden /> {section.example.label}
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink">{section.example.text}</p>
                      </div>
                    ) : null}
                    {section.callout ? (
                      <div className="border-cyan/25 bg-cyan/5 mt-6 rounded-2xl border p-5">
                        <h3 className="font-semibold text-white">{section.callout.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink-dim">{section.callout.body}</p>
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>

              {guide.sources?.length ? (
                <section className="mt-12 border-t border-line pt-8" aria-labelledby="sources-heading">
                  <h2 id="sources-heading" className="text-xl font-bold text-white">Official sources checked for this guide</h2>
                  <p className="mt-2 text-sm leading-6 text-ink-dim">Platform policies can change. These first-party pages are the best place to verify the current wording.</p>
                  <ul className="mt-5 space-y-3">
                    {guide.sources.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="glass-card group block rounded-xl p-4"
                        >
                          <span className="text-cyan inline-flex items-center gap-1.5 text-sm font-semibold group-hover:text-white">
                            {source.label} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          {source.note ? <span className="mt-1 block text-xs leading-5 text-ink-muted">{source.note}</span> : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="mt-12 rounded-3xl border border-line bg-surface p-6 sm:p-8" aria-labelledby="next-action-heading">
                <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Put it into practice</p>
                <h2 id="next-action-heading" className="mt-2 text-2xl font-bold text-white">Turn the guide into your next production brief</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-dim">Use the prompt library for a starting structure, then bring the result into the free video planner to turn the idea into a script, visual direction, and shot plan.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/prompts" className="from-purple to-cyan inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-[#09090b] hover:brightness-110">
                    Browse prompt guides <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link to="/" hash="generator" className="border-line bg-surface2 hover:border-purple inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold text-white">
                    Open video planner
                  </Link>
                </div>
              </section>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <nav className="rounded-2xl border border-line bg-surface p-5" aria-label="Guide contents">
                <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">In this guide</p>
                <ol className="mt-3 space-y-2">
                  {guide.sections.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="group flex gap-2 text-sm leading-5 text-ink-dim hover:text-white">
                        <span className="text-ink-muted group-hover:text-cyan">{index + 1}.</span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {relatedPrompts.length ? (
                <section className="rounded-2xl border border-line bg-surface p-5">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="h-4 w-4 text-purple-bright" aria-hidden />
                    <h2 className="text-sm font-semibold">Related prompts</h2>
                  </div>
                  <div className="mt-3 space-y-2">
                    {relatedPrompts.map((prompt) => prompt ? (
                      <Link key={prompt.id} to="/prompts/$slug" params={{ slug: prompt.id }} className="border-line bg-surface2 hover:border-purple block rounded-xl border p-3 text-sm text-ink-dim hover:text-white">
                        {prompt.title}
                      </Link>
                    ) : null)}
                  </div>
                </section>
              ) : null}

              {relatedNiches.length ? (
                <section className="rounded-2xl border border-line bg-surface p-5">
                  <h2 className="text-sm font-semibold text-white">Related niche playbooks</h2>
                  <div className="mt-3 space-y-2">
                    {relatedNiches.map((niche) => niche ? (
                      <Link key={niche.slug} to="/niches/$slug" params={{ slug: niche.slug }} className="text-cyan flex items-center justify-between gap-2 rounded-lg py-1.5 text-sm hover:text-white">
                        <span>{niche.name}</span><ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    ) : null)}
                  </div>
                </section>
              ) : null}
            </aside>
          </div>
        </div>

        <section className="px-4 pt-16" aria-labelledby="more-guides-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">Keep building</p>
                <h2 id="more-guides-heading" className="mt-2 text-2xl font-bold text-white">More creator guides</h2>
              </div>
              <Link to="/guides" className="text-cyan hidden items-center gap-1.5 text-sm font-semibold hover:text-white sm:inline-flex">
                All guides <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {otherGuides.map((item) => (
                <Link key={item.slug} to="/guides/$slug" params={{ slug: item.slug }} className="glass-card hover:border-purple group rounded-2xl p-5 transition-all">
                  <div className="flex items-center justify-between gap-2 text-xs text-ink-muted">
                    <span>{item.category}</span><span>{item.readMinutes} min</span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug text-white">{item.title}</h3>
                  <span className="text-cyan mt-4 inline-flex items-center gap-1 text-xs font-semibold group-hover:text-white">Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden /></span>
                </Link>
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
