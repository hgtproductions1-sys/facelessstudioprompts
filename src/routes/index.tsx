import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Brush,
  Car,
  Cat,
  ChefHat,
  Clapperboard,
  Download,
  Drama,
  Eye,
  Gamepad2,
  Ghost,
  ListOrdered,
  Loader2,
  type LucideIcon,
  Moon,
  Music,
  Newspaper,
  Package,
  PawPrint,
  PencilLine,
  RefreshCw,
  Search,
  Skull,
  Sparkles,
  Star,
  Swords,
  UtensilsCrossed,
  Wand2,
  Waves,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { StepPanels } from "@/components/site/StepPanels";
import { ProgressStepper, SkeletonCards } from "@/components/site/LoadingState";
import { FinalCta, HowItWorks, TrustStrip } from "@/components/site/Sections";
import { EmptyState } from "@/components/site/EmptyState";
import { BlueprintCard } from "@/components/site/BlueprintCard";
import { LeaderboardAd, NativeAd } from "@/components/site/AdSlot";
import { Playbook } from "@/components/site/Playbook";

import { ScrollToTopButton } from "@/components/site/ScrollToTopButton";
import { copyText, PrimaryButton, SecondaryButton } from "@/components/site/primitives";
import { WorkedExample } from "@/components/site/WorkedExample";
import { usePackageGenerator } from "@/hooks/usePackageGenerator";
import { NICHES, packageToText, slugify } from "@/lib/generator";
import { FORMATS, PACINGS, VIBES } from "@/lib/styleOptions";

const TITLE = "Free AI Prompts for Faceless Videos | The Faceless Prompts";
const DESC =
  "Browse free AI prompts, faceless video niche playbooks, and creator tools. Turn one idea into a script, visual prompts, and a practical shot plan.";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const out: { niche?: string; topic?: string } = {};
    if (typeof search["niche"] === "string") out.niche = search["niche"];
    if (typeof search["topic"] === "string") out.topic = search["topic"];
    return out;
  },
  head: () => pageHead({ path: "/", title: TITLE, description: DESC }),
  component: Index,
});

const NICHE_ICONS: Record<string, LucideIcon> = {
  "AI Cat & Pet Stories": Cat,
  "AI Animal Cooking": ChefHat,
  "POV Immersive Vlogs": Eye,
  "Anime Fight Versus": Swords,
  "Stickman Explainer & Skits": PencilLine,
  "AI ASMR (Cooking, Cleaning, Restoration)": Waves,
  "Zombie Apocalypse Drama": Skull,
  "Bible & Mythology Anime": BookOpen,
  "AI Influencer Product Reviews": Sparkles,
  "Lullaby & Sleep Music": Moon,
  "Analog Horror & Unsolved Mysteries": Ghost,
  "DIY Cardboard & Miniature Builds": Boxes,
  "Vegetable & Fruit Carving": Brush,
  "AI Car Wash & Restoration": Car,
  "Miniature ASMR Cooking": UtensilsCrossed,
  "Nostalgia Toy Unboxing": Package,
  "Ranking & Top 5 Countdowns": ListOrdered,
  "Vox-Style Paper-Cut Commentary": Newspaper,
  "Elderly Wisdom & Stoic Long-Form": Drama,
  "AI Music Videos": Music,
  "Cartoon Horror Illustration": Clapperboard,
  "Pixel Game POV": Gamepad2,
  "Celebrity Evolution & Glow-Up": Star,
  "Poor vs. Rich Animals (AI Skits)": PawPrint,
};

const QUICK_STARTS: { topic: string; niche: string }[] = [
  { topic: "A stray cat saves a bakery", niche: NICHES[0] },
  { topic: "Bear cooks campfire ramen", niche: NICHES[1] },
  { topic: "Rusty 1969 Mustang barn find", niche: NICHES[13] },
  { topic: "Top 5 strangest deep sea creatures", niche: NICHES[16] },
];

function Index() {
  const search = Route.useSearch();
  const [niche, setNiche] = useState(search.niche ?? "");
  const [topic, setTopic] = useState(search.topic ?? "");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"checking" | "ai" | "unavailable" | "unknown">("checking");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/generate", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => { if (!response.ok) throw new Error("Mode unavailable"); return response.json(); })
      .then((data: { mode?: string }) => setMode(data.mode === "ai" ? "ai" : data.mode === "unavailable" ? "unavailable" : "unknown"))
      .catch(() => { if (!controller.signal.aborted) setMode("unknown"); });
    return () => controller.abort();
  }, []);
  const [format, setFormat] = useState<string>(FORMATS[0]!.id);
  const [vibe, setVibe] = useState<string>(VIBES[0]!.id);
  const [pacing, setPacing] = useState<string>(PACINGS[0]!.id);
  const resultsRef = useRef<HTMLDivElement>(null);
  const autoRan = useRef(false);
  const topicRef = useRef<HTMLTextAreaElement>(null);
  const { pkg, error: generationError, loading, step, slow, run, regenerate, totalMs } = usePackageGenerator();
  const styleRef = useRef({ format, vibe, pacing });
  styleRef.current = { format, vibe, pacing };

  useEffect(() => {
    const el = topicRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [topic]);

  useEffect(() => {
    if (autoRan.current) return;
    const n = search.niche;
    const t = search.topic;
    if (!n || !t || t.trim().length < 3) return;
    autoRan.current = true;
    setNiche(n);
    setTopic(t);
    run(n, t, styleRef.current);
    setTimeout(
      () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80,
    );
  }, [search.niche, search.topic, run]);

  const scrollToResults = () => {
    setTimeout(
      () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50,
    );
  };

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!niche) {
      setError("Pick a niche before generating.");
      toast.error("Pick a niche before generating.");
      return;
    }
    if (topic.trim().length < 3) {
      setError("Add a topic of at least 3 characters.");
      toast.error("Add a topic of at least 3 characters.");
      return;
    }
    setError("");
    run(niche, topic, { format, vibe, pacing });
    scrollToResults();
  };

  const quickStart = (q: (typeof QUICK_STARTS)[number]) => {
    setNiche(q.niche);
    setTopic(q.topic);
    setError("");
    topicRef.current?.focus();
  };

  const exportTxt = () => {
    if (!pkg) return;
    const blob = new Blob([packageToText(pkg)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `faceless-studio-pro-${slugify(pkg.topic)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Package exported as .txt");
  };

  const disabled = !niche || topic.trim().length < 3 || loading;

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-canvas relative min-h-screen overflow-x-hidden text-ink">
        <div className="ambient-glow pointer-events-none absolute inset-x-0 top-0 z-0 h-[60vh]" />
        <div className="grid-overlay pointer-events-none absolute inset-x-0 top-0 z-0 h-[70vh]" />

        <Navbar />

        <main className="relative z-10">
          {/* VALUE-FIRST HERO */}
          <section className="px-4 pt-32 pb-8">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
              <div>
                <span className="border-line-hover bg-surface2 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs text-ink-dim">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" aria-hidden />
                  Free prompts, niche playbooks &amp; video planning tools
                </span>
                <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                  Create better <span className="gradient-text">faceless content</span> without starting from zero.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-dim md:text-xl">
                  Browse ready-to-customize AI prompts, explore proven faceless video formats, or turn one idea into a practical script and shot plan.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#generator" className="from-purple to-cyan inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 font-semibold text-[#0a0a0c] transition-all hover:brightness-110">
                    <Wand2 className="h-4 w-4" aria-hidden />
                    Generate a video plan
                  </a>
                  <a href="/library" className="border-line-hover bg-surface2 hover:border-purple inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-6 py-3 font-semibold text-ink transition-colors hover:text-white">
                    Browse prompt library
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
                  <span>✓ No signup required</span>
                  <span>✓ 24 faceless niches</span>
                  <span>✓ Copy-ready prompts</span>
                </div>
              </div>

              <div className="glass-card top-rail-cp relative overflow-hidden p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-cyan">See the workflow</p>
                    <h2 className="mt-1 text-2xl font-bold text-ink">One idea in. A usable content plan out.</h2>
                  </div>
                  <Sparkles className="mt-1 h-7 w-7 shrink-0 text-purple-bright" aria-hidden />
                </div>

                <div className="mt-5 rounded-2xl border border-line bg-surface2/80 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-bright">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-purple/40 bg-purple/10 text-[11px]">1</span>
                    Start with a simple idea
                  </div>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-ink">
                    “Make a 45-second faceless video about a rusty 1969 Mustang barn find.”
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-ink-muted">
                    <span className="rounded-full border border-line px-2.5 py-1">45 sec</span>
                    <span className="rounded-full border border-line px-2.5 py-1">cinematic</span>
                    <span className="rounded-full border border-line px-2.5 py-1">fast hook</span>
                  </div>
                </div>

                <div className="relative my-3 flex justify-center" aria-hidden>
                  <div className="h-5 w-px bg-gradient-to-b from-purple to-cyan" />
                </div>

                <div className="rounded-2xl border border-cyan/20 bg-cyan/[0.035] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-cyan/35 bg-cyan/10 text-[11px]">2</span>
                    Get a practical draft
                  </div>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                    {[
                      { label: "Script", icon: PencilLine, copy: "Hook + scene-by-scene narration" },
                      { label: "Visuals", icon: Eye, copy: "Prompts for each key moment" },
                      { label: "Shot plan", icon: Clapperboard, copy: "Camera direction and pacing" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="rounded-xl border border-line bg-surface p-3">
                          <Icon className="h-4 w-4 text-purple-bright" aria-hidden />
                          <p className="mt-2 text-sm font-semibold text-ink">{item.label}</p>
                          <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.copy}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    quickStart(QUICK_STARTS[2]!);
                    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="mt-4 flex w-full items-center justify-between rounded-xl border border-purple/30 bg-purple/10 px-4 py-3 text-left text-sm font-semibold text-purple-bright transition-colors hover:bg-purple/15"
                >
                  Try this Mustang example
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>

                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Or browse by resource</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    {[
                      { title: "Image prompts", href: "/library" },
                      { title: "Video prompts", href: "/library" },
                      { title: "SEO prompts", href: "/library" },
                      { title: "Niche playbooks", href: "/niches" },
                    ].map((item) => (
                      <a key={item.title} href={item.href} className="border-line bg-surface2 hover:border-purple rounded-lg border px-3 py-2.5 text-ink-dim transition-colors hover:text-white">
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DISCOVERY STRIP */}
          <section className="px-4 py-8" aria-labelledby="discover-heading">
            <div className="mx-auto max-w-7xl">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-semibold text-purple-bright">Explore by goal</p>
                  <h2 id="discover-heading" className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">Find a faster starting point</h2>
                </div>
                <a href="/niches" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:text-cyan-bright">
                  View all niches <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { eyebrow: "Storytelling", title: "AI Cat & Pet Stories", copy: "Build emotional recurring-character shorts.", href: "/niches/ai-cat-and-pet-stories" },
                  { eyebrow: "Satisfying", title: "ASMR & Restoration", copy: "Plan visual-first sequences with clear motion.", href: "/niches/ai-asmr-cooking-cleaning-restoration" },
                  { eyebrow: "Education", title: "Ranking & Countdowns", copy: "Turn research into structured list videos.", href: "/niches/ranking-and-top-5-countdowns" },
                  { eyebrow: "Visual", title: "POV Immersive Vlogs", copy: "Create first-person concepts and shot direction.", href: "/niches/pov-immersive-vlogs" },
                ].map((item) => (
                  <a key={item.title} href={item.href} className="border-line bg-surface/80 hover:border-line-hover rounded-2xl border p-5 transition-all hover:-translate-y-0.5">
                    <p className="text-xs font-semibold tracking-wider text-ink-muted uppercase">{item.eyebrow}</p>
                    <h3 className="mt-2 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-dim">{item.copy}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan">Open playbook <ArrowRight className="h-3.5 w-3.5" aria-hidden /></span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* GENERATOR */}
          <section id="generator" className="scroll-mt-20 px-4 pt-14 pb-10">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold text-purple-bright">Free AI video planner</span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">Turn one idea into a <span className="gradient-text">production-ready draft</span></h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">
                Choose a niche, describe your idea, and generate a script, visual prompts, and shot-by-shot camera direction you can review and customize.
              </p>
            </div>

            <form
              onSubmit={submit}
              className="glass-card top-rail-pc relative mx-auto mt-8 max-w-3xl overflow-hidden p-5 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="niche"
                    className="mb-2.5 block text-sm font-semibold text-ink"
                  >
                    Niche
                  </label>
                  <Select value={niche} onValueChange={(v) => setNiche(v)}>
                    <SelectTrigger
                      id="niche"
                      className="bg-surface2 border-line-hover !h-auto min-h-12 w-full gap-3 rounded-xl px-4 py-3 text-left text-base focus:ring-2 focus:ring-purple [&>span]:min-w-0 [&>span]:line-clamp-none [&>span]:whitespace-normal [&>svg]:shrink-0"
                    >
                      <SelectValue placeholder="Select a niche…" />
                    </SelectTrigger>
                    <SelectContent className="border-line bg-surface max-w-[calc(100vw-2rem)]">
                      {NICHES.map((n) => {
                        const Icon = NICHE_ICONS[n] ?? Search;
                        return (
                          <SelectItem key={n} value={n} className="py-2.5 text-sm">
                            <span className="flex min-w-0 items-center gap-2.5">
                              <Icon className="h-4 w-4 shrink-0 text-purple-bright" aria-hidden />
                              {n}
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="mb-2.5 block text-sm font-semibold text-ink"
                  >
                    Topic or video angle
                  </label>
                  <Textarea
                    ref={topicRef}
                    id="topic"
                    aria-describedby="topic-count"
                    rows={4}
                    value={topic}
                    maxLength={300}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., A tiny robot transforms an abandoned rooftop into a garden"
                    className="bg-surface2 border-line-hover min-h-32 w-full resize-y rounded-xl border px-4 py-3 text-base leading-relaxed text-ink shadow-none placeholder:text-ink-muted focus:border-purple focus:ring-2 focus:ring-purple focus:outline-none focus-visible:ring-0"
                  />
                  <span
                    id="topic-count"
                    className={`mt-2 block text-right text-sm tabular-nums ${
                      topic.length > 270 ? "text-warning" : "text-ink-muted"
                    }`}
                  >
                    {topic.length}/300
                  </span>
                </div>

              </div>

              <div className="border-line mt-6 grid grid-cols-1 gap-5 border-t pt-6 sm:grid-cols-3">
                {[
                  {
                    id: "format",
                    label: "Format",
                    value: format,
                    onChange: setFormat,
                    options: FORMATS,
                  },
                  {
                    id: "vibe",
                    label: "Visual vibe",
                    value: vibe,
                    onChange: setVibe,
                    options: VIBES,
                  },
                  {
                    id: "pacing",
                    label: "Pacing",
                    value: pacing,
                    onChange: setPacing,
                    options: PACINGS,
                  },
                ].map((field) => (
                  <div key={field.id} className="min-w-0">
                    <label
                      htmlFor={field.id}
                      className="mb-2.5 block text-sm font-semibold text-ink"
                    >
                      {field.label}
                    </label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id={field.id}
                        className="bg-surface2 border-line-hover !h-auto min-h-12 w-full gap-2 rounded-xl px-3 py-3 text-left text-sm [&>span]:min-w-0 [&>span]:line-clamp-none [&>span]:whitespace-normal [&>svg]:shrink-0 focus:ring-2 focus:ring-purple"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-line bg-surface max-w-[calc(100vw-2rem)]">
                        {field.options.map((o) => (
                          <SelectItem key={o.id} value={o.id} className="py-2.5 text-sm">
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="border-line bg-surface2 mt-6 rounded-xl border p-4 text-sm leading-relaxed text-ink-dim" role="status">
                <strong className="text-ink">{mode === "ai" ? "AI mode" : mode === "unavailable" ? "AI temporarily unavailable" : mode === "checking" ? "Checking AI availability…" : "AI generation"}</strong>
                <p className="mt-1">{mode === "ai" ? "Create a script, visual prompts, and a shot plan with AI. Review the draft before publishing." : mode === "unavailable" ? "Generation is temporarily unavailable. Please try again later." : "AI creates your text draft. No image, video, or audio is rendered here."}</p>
              </div>
              <PrimaryButton
                type="submit"
                disabled={disabled}
                className="mt-5 min-h-12 w-full px-6 text-base whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Generating…
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" aria-hidden />
                    Generate Package
                  </>
                )}
              </PrimaryButton>

              {error ? <p className="mt-2 text-sm text-warning" role="alert">{error}</p> : null}
              {generationError && !loading ? <div className="mt-3 text-sm text-warning" role="alert"><p>{generationError}</p><button type="button" className="mt-2 underline" onClick={() => submit()}>Try again</button></div> : null}

              <p className="border-line mt-6 mb-3 border-t pt-6 text-sm font-semibold text-ink-dim">
                Start with an example
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {QUICK_STARTS.map((q) => (
                  <button
                    key={q.topic}
                    type="button"
                    onClick={() => quickStart(q)}
                    disabled={loading}
                    className="border-line bg-surface2 hover:border-purple cursor-pointer flex min-h-14 items-center rounded-xl border px-4 py-3 text-left text-sm leading-relaxed text-ink-dim transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {q.topic}
                  </button>
                ))}
              </div>
            </form>
          </section>

          {/* LEADERBOARD AD */}
          <LeaderboardAd className="mt-2 mb-4" />

          {/* RESULTS */}
          <div
            ref={resultsRef}
            id="results"
            aria-live="polite"
            className="relative z-10 mt-8 scroll-mt-24 px-4 md:mt-12"
          >
            {!loading && !pkg ? <EmptyState /> : null}

            {loading ? (
              <>
                <ProgressStepper step={step} totalMs={totalMs} slow={slow} />
                <SkeletonCards />
              </>
            ) : null}

            {!loading && pkg ? (
              <>
                <div className="mx-auto flex max-w-7xl flex-col flex-wrap justify-end gap-2 sm:flex-row">
                  <SecondaryButton
                    className="w-full sm:w-auto"
                    onClick={() => copyText(packageToText(pkg), "Full package copied to clipboard")}
                  >
                    Copy Full Package
                  </SecondaryButton>
                  <SecondaryButton className="w-full sm:w-auto" onClick={regenerate}>
                    <RefreshCw className="h-4 w-4" aria-hidden />
                    Regenerate
                  </SecondaryButton>
                  <SecondaryButton className="w-full sm:w-auto" onClick={exportTxt}>
                    <Download className="h-4 w-4" aria-hidden />
                    Export as .txt
                  </SecondaryButton>
                </div>

                <p className="mx-auto max-w-7xl text-sm text-ink-dim" role="status">AI-generated draft. Check facts and adapt it before publishing.</p>
                <StepPanels pkg={pkg} />
              </>
            ) : null}
          </div>

          {/* NATIVE AD — between generator output and educational content */}
          <NativeAd className="mt-14" />

          {/* BONUS DOWNLOAD */}
          <div className="relative z-10 mx-auto mt-14 max-w-4xl px-4">
            <BlueprintCard pkg={pkg} />
          </div>

          <WorkedExample />
          <Playbook />
          <HowItWorks />
          <TrustStrip />
          <FinalCta />
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </MotionConfig>
  );
}
