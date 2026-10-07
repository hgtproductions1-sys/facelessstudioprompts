import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Copy,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";

import { EditorialByline } from "@/components/site/EditorialByline";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { CopyButton, MonoBlock } from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type Prompt, type PromptCategory } from "@/data/promptLibrary";
import {
  getPromptBySlug,
  getPromptCollection,
  getPromptsForCollection,
  primaryCollectionSlug,
  relatedPrompts,
  type PromptCollection,
} from "@/data/promptPages";
import { NICHES } from "@/lib/generator";
import { SITE_NAME, SITE_URL, pageHead } from "@/lib/seo";

const CATEGORY_GUIDANCE: Record<PromptCategory, { use: string; customize: string; review: string }> = {
  "Image Gen": {
    use: "Use this when you need a clearer starting frame, visual reference, thumbnail concept, or scene image.",
    customize: "Subject, environment, composition, lighting, camera perspective, wardrobe, and the visual details that matter to the frame.",
    review: "Check anatomy, text artifacts, continuity, brand or trademark issues, and whether the image actually matches the intended scene.",
  },
  "Video Gen": {
    use: "Use this when a clip needs one readable action, one primary camera behavior, and a clear beginning-to-end progression.",
    customize: "Subject action, camera motion, duration, setting, lighting, audio notes where supported, and the end state of the clip.",
    review: "Check motion continuity, physics, identity drift, unwanted scene changes, and whether the shot should be split into smaller generations.",
  },
  SEO: {
    use: "Use this after you have a real topic or finished video and need clearer packaging or audience-facing copy.",
    customize: "The actual topic, audience, format, facts, channel voice, and promise your content can support.",
    review: "Remove invented data, unsupported claims, fake urgency, misleading keywords, or packaging that promises something the video does not deliver.",
  },
  Character: {
    use: "Use this to define stable identity details for a recurring character or cast across several generations.",
    customize: "Permanent facial features, hair, proportions, wardrobe rules, props, voice notes, and reference images where the tool supports them.",
    review: "Compare each result with the approved reference. A prompt, seed, or invented token does not guarantee identity consistency.",
  },
  Niche: {
    use: "Use this when you are turning a channel idea into a repeatable format, episode system, content plan, or editing workflow.",
    customize: "Your audience, topic, publishing format, production limits, tone, examples, and the value your channel adds beyond generated assets.",
    review: "Verify facts, remove generic filler, add original examples and editorial judgment, and make sure the format is sustainable for more than one upload.",
  },
};

export const Route = createFileRoute("/prompts/$slug")({
  loader: ({ params }) => {
    const collection = getPromptCollection(params.slug);
    if (collection) return { kind: "collection" as const, collection };
    const prompt = getPromptBySlug(params.slug);
    if (prompt) return { kind: "prompt" as const, prompt };
    throw notFound();
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Prompt not found | The Faceless Prompts" }, { name: "robots", content: "noindex" }] };
    }
    if (loaderData.kind === "collection") {
      const collection = loaderData.collection;
      return pageHead({
        path: `/prompts/${params.slug}`,
        title: `${collection.title} | ${SITE_NAME}`,
        description: collection.description,
        type: "article",
      });
    }
    const prompt = loaderData.prompt;
    const description = `Copy and customize the ${prompt.title} prompt. See what to change, how to use it, what to review, and related faceless content prompts.`;
    return pageHead({
      path: `/prompts/${params.slug}`,
      title: `${prompt.title} Prompt | ${SITE_NAME}`,
      description,
      type: "article",
    });
  },
  component: PromptSlugPage,
});

function PromptSlugPage() {
  const data = Route.useLoaderData();
  return data.kind === "collection" ? <CollectionPage collection={data.collection} /> : <PromptPage prompt={data.prompt} />;
}

function CollectionPage({ collection }: { collection: PromptCollection }) {
  const prompts = getPromptsForCollection(collection);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: `${SITE_URL}/prompts/${collection.slug}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    hasPart: prompts.slice(0, 20).map((prompt) => ({
      "@type": "Article",
      headline: `${prompt.title} Prompt`,
      url: `${SITE_URL}/prompts/${prompt.id}`,
    })),
  };

  return (
    <div className="bg-base min-h-screen">
      <Navbar />
      <main className="pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

        <header className="relative overflow-hidden px-4 pt-28 pb-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(139,92,246,0.15),transparent_34%),radial-gradient(circle_at_85%_0%,rgba(34,211,238,0.10),transparent_28%)]" />
          <div className="relative mx-auto max-w-5xl">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-ink-muted" aria-label="Breadcrumb">
              <Link to="/prompts" className="hover:text-cyan">Prompts</Link><span>/</span><span>{collection.label}</span>
            </nav>
            <p className="text-purple-bright mt-7 text-[11px] font-semibold tracking-[0.16em] uppercase">{collection.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{collection.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-ink-dim">{collection.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#prompt-list" className="from-purple to-cyan inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-semibold text-[#0a0a0c] hover:brightness-110">
                Browse {prompts.length} prompts <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link to="/library" className="border-line bg-surface2 hover:border-purple inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold text-white">
                <Search className="h-4 w-4" aria-hidden /> Search library
              </Link>
            </div>
          </div>
        </header>

        <section className="px-4" aria-labelledby="best-for-heading">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {collection.bestFor.map((item, index) => (
              <article key={item} className="glass-card rounded-2xl p-5">
                <span className="bg-purple/10 text-purple-bright inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold">0{index + 1}</span>
                <h2 id={index === 0 ? "best-for-heading" : undefined} className="mt-4 text-sm font-semibold text-white">{index === 0 ? "What this collection helps with" : index === 1 ? "Where it fits" : "What to expect"}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-dim">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="prompt-list" className="scroll-mt-24 px-4 pt-16" aria-labelledby="prompt-list-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Copy, customize, review</p>
                <h2 id="prompt-list-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">{collection.label}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-dim">Open any prompt for the full template, customization fields, practical guidance, and related prompts.</p>
              </div>
              <span className="text-sm text-ink-muted">{prompts.length} guides</span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {prompts.map((prompt) => (
                <Link key={prompt.id} to="/prompts/$slug" params={{ slug: prompt.id }} className="glass-card hover:border-purple group flex min-h-[230px] flex-col rounded-2xl p-5 transition-all hover:-translate-y-0.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="border-purple/40 bg-purple/10 text-purple-bright rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">{prompt.category}</span>
                    {prompt.niche ? <span className="text-[10px] text-ink-muted">{prompt.niche}</span> : null}
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-white">{prompt.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-dim">{prompt.tips ?? CATEGORY_GUIDANCE[prompt.category].use}</p>
                  <span className="text-cyan mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold group-hover:text-white">Open prompt guide <ArrowRight className="h-4 w-4" aria-hidden /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-16" aria-labelledby="workflow-heading">
          <div className="mx-auto max-w-7xl">
            <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">A better prompting workflow</p>
            <h2 id="workflow-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Use the template as a controlled starting point</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {collection.workflow.map((step, index) => (
                <article key={step.title} className="border-line bg-surface rounded-2xl border p-5">
                  <p className="text-cyan font-mono text-xs">STEP {index + 1}</p>
                  <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-dim">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-16" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-4xl">
            <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Common questions</p>
            <h2 id="faq-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">{collection.label} FAQ</h2>
            <Accordion type="single" collapsible className="mt-5">
              {collection.faq.map((item) => (
                <AccordionItem key={item.question} value={item.question} className="border-line">
                  <AccordionTrigger className="text-left text-sm text-white hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-6 text-ink-dim">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

function PromptPage({ prompt }: { prompt: Prompt }) {
  const guidance = CATEGORY_GUIDANCE[prompt.category];
  const fields = extractFields(prompt.prompt);
  const collectionSlug = primaryCollectionSlug(prompt);
  const collection = getPromptCollection(collectionSlug);
  const related = relatedPrompts(prompt, 4);
  const generatorNiche = toGeneratorNiche(prompt);

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${prompt.title} Prompt`,
    description: `Copy and customize the ${prompt.title} prompt for faceless content creation.`,
    url: `${SITE_URL}/prompts/${prompt.id}`,
    datePublished: "2026-10-07",
    dateModified: "2026-10-07",
    author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/about` },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/favicon.png` },
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Prompts", item: `${SITE_URL}/prompts` },
      { "@type": "ListItem", position: 2, name: collection?.label ?? prompt.category, item: `${SITE_URL}/prompts/${collectionSlug}` },
      { "@type": "ListItem", position: 3, name: prompt.title, item: `${SITE_URL}/prompts/${prompt.id}` },
    ],
  };

  return (
    <div className="bg-base min-h-screen">
      <Navbar />
      <main className="pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

        <article className="mx-auto max-w-5xl px-4 pt-28">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-ink-muted" aria-label="Breadcrumb">
            <Link to="/prompts" className="hover:text-cyan">Prompts</Link><span>/</span>
            <Link to="/prompts/$slug" params={{ slug: collectionSlug }} className="hover:text-cyan">{collection?.label ?? prompt.category}</Link><span>/</span>
            <span className="max-w-[20rem] truncate">{prompt.title}</span>
          </nav>

          <header className="mt-8 grid gap-8 lg:grid-cols-[1fr_.58fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="border-purple/40 bg-purple/10 text-purple-bright rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">{prompt.category}</span>
                {prompt.niche ? <span className="border-line bg-surface2 rounded-full border px-2.5 py-1 text-[10px] text-ink-dim">{prompt.niche}</span> : null}
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{prompt.title} Prompt</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-ink-dim">{prompt.tips ?? guidance.use}</p>
              <EditorialByline updated="October 7, 2026" className="mt-4" />
              <div className="mt-6 flex flex-wrap gap-3">
                <CopyButton value={prompt.prompt} label="Copy prompt" className="from-purple to-cyan rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-semibold text-[#0a0a0c] hover:text-[#0a0a0c]" />
                <Link
                  to="/"
                  search={{ niche: generatorNiche, topic: prompt.niche ? `${prompt.niche} — ${prompt.title}` : prompt.title }}
                  hash="generator"
                  className="border-line bg-surface2 hover:border-purple inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold text-white"
                >
                  <Wand2 className="h-4 w-4" aria-hidden /> Use generator
                </Link>
              </div>
            </div>

            <aside className="border-line bg-surface rounded-2xl border p-5" aria-label="Prompt use summary">
              <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Before you paste it</p>
              <dl className="mt-4 space-y-4 text-sm leading-6">
                <div><dt className="font-semibold text-white">Best used for</dt><dd className="mt-1 text-ink-dim">{guidance.use}</dd></div>
                <div><dt className="font-semibold text-white">Customize</dt><dd className="mt-1 text-ink-dim">{fields.length ? fields.join(", ") : guidance.customize}</dd></div>
                <div><dt className="font-semibold text-white">Review</dt><dd className="mt-1 text-ink-dim">{guidance.review}</dd></div>
              </dl>
            </aside>
          </header>

          <section className="mt-12" aria-labelledby="prompt-template-heading">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">Copy-ready template</p>
                <h2 id="prompt-template-heading" className="mt-2 text-2xl font-bold text-white">The prompt</h2>
              </div>
              <CopyButton value={prompt.prompt} label="Copy" className="border-line bg-surface2 rounded-lg border px-3 py-2 text-sm" />
            </div>
            <MonoBlock className="mt-5 max-h-none rounded-2xl p-5 text-[13px] leading-7">{prompt.prompt}</MonoBlock>
          </section>

          <section className="mt-14" aria-labelledby="customize-heading">
            <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Make it yours</p>
                <h2 id="customize-heading" className="mt-2 text-2xl font-bold text-white">What to customize</h2>
                <p className="mt-3 text-sm leading-6 text-ink-dim">Replace the bracketed fields with details from the content you are actually making. If the template has no explicit brackets, use the guidance on the right as your edit checklist.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(fields.length ? fields : guidance.customize.split(",").map((item) => item.trim())).map((field) => (
                  <div key={field} className="border-line bg-surface rounded-xl border p-4">
                    <div className="flex gap-2.5">
                      <Check className="text-cyan mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span className="text-sm leading-6 text-ink">{field}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="use-heading">
            <p className="text-purple-bright text-[11px] font-semibold tracking-[0.16em] uppercase">Three-pass workflow</p>
            <h2 id="use-heading" className="mt-2 text-2xl font-bold text-white">How to use this prompt</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["1", "Fill the real context", "Replace placeholders with the actual subject, audience, scene, channel, or production constraints you are working with."],
                ["2", "Generate options, not truth", "Treat the response as a draft or set of choices. Do not assume generated facts, metrics, references, or predictions are correct."],
                ["3", "Review and rewrite", guidance.review],
              ].map(([number, title, body]) => (
                <article key={number} className="glass-card rounded-2xl p-5">
                  <span className="bg-purple/10 text-purple-bright inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold">{number}</span>
                  <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-dim">{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14" aria-labelledby="related-heading">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-cyan text-[11px] font-semibold tracking-[0.16em] uppercase">Keep building</p>
                <h2 id="related-heading" className="mt-2 text-2xl font-bold text-white">Related prompt guides</h2>
              </div>
              <Link to="/prompts/$slug" params={{ slug: collectionSlug }} className="text-cyan inline-flex items-center gap-1.5 text-sm font-semibold hover:text-white">Browse {collection?.label ?? prompt.category} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.id} to="/prompts/$slug" params={{ slug: item.id }} className="glass-card hover:border-purple group flex min-h-[190px] flex-col rounded-2xl p-4 transition-colors">
                  <span className="text-[10px] font-semibold tracking-wider text-purple-bright uppercase">{item.category}</span>
                  <h3 className="mt-3 text-sm font-semibold leading-6 text-white">{item.title}</h3>
                  <span className="text-cyan mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold group-hover:text-white">Open guide <ArrowRight className="h-3.5 w-3.5" aria-hidden /></span>
                </Link>
              ))}
            </div>
          </section>

          <section className="border-line bg-surface mt-14 rounded-2xl border p-5 sm:p-6" aria-labelledby="prompt-note-heading">
            <div className="flex items-start gap-3">
              <Sparkles className="text-purple-bright mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <div>
                <h2 id="prompt-note-heading" className="text-sm font-semibold text-white">A note on generated output</h2>
                <p className="mt-2 text-sm leading-6 text-ink-dim">This template is designed to reduce blank-page work, not replace editorial judgment. Review outputs for accuracy, continuity, rights, disclosures, and platform rules before you publish or act on them.</p>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

function extractFields(text: string): string[] {
  const matches = text.match(/\[[^\]\n]{2,80}\]/g) ?? [];
  const cleaned = matches
    .map((match) => match.slice(1, -1).trim().replace(/\s*\/\s*/g, " / "))
    .filter((value) => value.length > 1 && !/^optional$/i.test(value));
  return [...new Set(cleaned)].slice(0, 12);
}

function toGeneratorNiche(prompt: Prompt): string {
  const key = (prompt.niche ?? "").toLowerCase();
  if (key.includes("true crime")) return NICHES[10];
  if (key.includes("drama")) return NICHES[6];
  if (key.includes("anime")) return NICHES[3];
  if (key.includes("asmr")) return NICHES[5];
  if (key.includes("pov")) return NICHES[2];
  if (key.includes("influencer")) return NICHES[8];
  if (key.includes("nursery")) return NICHES[9];
  if (key.includes("cooking")) return NICHES[1];
  if (key.includes("stickman")) return NICHES[4];
  if (prompt.category === "SEO") return NICHES[16];
  return NICHES[0];
}
