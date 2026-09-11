import { pageHead, SITE_NAME, SITE_URL } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig, motion } from "framer-motion";
import {
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
import { usePackageGenerator } from "@/hooks/usePackageGenerator";
import { NICHES, packageToText, slugify } from "@/lib/generator";
import { FORMATS, PACINGS, VIBES } from "@/lib/styleOptions";

const TITLE = "The Faceless Prompts | Free AI Video Generator";
const DESC =
  "Generate viral faceless video blueprints, Midjourney image prompts, and ElevenLabs voiceover scripts in seconds.";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const out: { niche?: string; topic?: string } = {};
    if (typeof search["niche"] === "string") out.niche = search["niche"];
    if (typeof search["topic"] === "string") out.topic = search["topic"];
    return out;
  },
  head: () => {
    const base = pageHead({ path: "/", title: TITLE, description: DESC, type: "website" });
    return {
      ...base,
      meta: [
        ...base.meta,
        { property: "og:video:type", content: "text/html" },
        { name: "medium", content: "video" },
        {
          name: "keywords",
          content:
            "faceless YouTube automation, short-form video prompt generator, Midjourney character consistency prompts, ElevenLabs viral voiceover scripts, faceless TikTok niche ideas, YouTube Short automation",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Faceless Video Blueprint Generator — YouTube Shorts & TikTok Automation",
            description:
              "How to generate a complete faceless video blueprint: recurring character profile, Midjourney character consistency prompts, Google Flow and Leonardo style prompts, shot-by-shot camera motion, and ElevenLabs viral voiceover scripts for YouTube Short automation and TikTok.",
            uploadDate: "2026-01-15T09:00:00+00:00",
            contentUrl: `${SITE_URL}/`,
            embedUrl: `${SITE_URL}/`,
            genre: ["Faceless YouTube automation", "Short-form video", "AI video generation"],
            keywords:
              "faceless YouTube automation, short-form video prompt generator, Midjourney character consistency prompts, ElevenLabs viral voiceover scripts, faceless TikTok niche ideas, YouTube Short automation",
            publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to make a faceless YouTube Short with AI prompts",
            description:
              "Pick a faceless TikTok niche, lock a recurring character, generate Midjourney character consistency prompts, animate the shots, and narrate with ElevenLabs.",
            step: [
              { "@type": "HowToStep", name: "Choose a faceless niche and topic" },
              { "@type": "HowToStep", name: "Lock a recurring character profile and seed" },
              { "@type": "HowToStep", name: "Generate image prompts for Midjourney or Leonardo" },
              { "@type": "HowToStep", name: "Animate the keyframes with Veo, Runway, or Kling" },
              { "@type": "HowToStep", name: "Narrate the script with ElevenLabs voice settings" },
            ],
          }),
        },
      ],
    };
  },
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
  const [format, setFormat] = useState<string>(FORMATS[0]!.id);
  const [vibe, setVibe] = useState<string>(VIBES[0]!.id);
  const [pacing, setPacing] = useState<string>(PACINGS[0]!.id);
  const resultsRef = useRef<HTMLDivElement>(null);
  const autoRan = useRef(false);
  const { pkg, loading, step, slow, run, regenerate, totalMs } = usePackageGenerator();
  const styleRef = useRef({ format, vibe, pacing });
  styleRef.current = { format, vibe, pacing };

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
    run(niche, topic);
    scrollToResults();
  };

  const quickStart = (q: (typeof QUICK_STARTS)[number]) => {
    setNiche(q.niche);
    setTopic(q.topic);
    setError("");
    run(q.niche, q.topic);
    scrollToResults();
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
          {/* HERO + GENERATOR */}
          <section id="generator" className="px-4 pt-32 pb-10">
            <div className="mx-auto max-w-4xl text-center">
              <span className="border-line-hover bg-surface2 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs text-ink-dim">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" aria-hidden />
                100% Free · No signup required · Unlimited generations
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                Build <span className="gradient-text">Faceless Video Blueprints</span> That Actually
                Convert
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-dim">
                Generate a complete AI production package — recurring character profile, Google Flow,
                Leonardo &amp; Midjourney style prompts, and shot-by-shot camera motion — in one click.
                &nbsp;
              </p>
            </div>

            <form
              onSubmit={submit}
              className="glass-card top-rail-pc relative mx-auto mt-10 max-w-3xl overflow-hidden p-6 md:p-8"
            >
              <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_1.4fr_auto]">
                <div>
                  <label
                    htmlFor="niche"
                    className="mb-2 block text-xs font-medium tracking-widest text-ink-dim uppercase"
                  >
                    Niche
                  </label>
                  <Select value={niche} onValueChange={(v) => setNiche(v)}>
                    <SelectTrigger
                      id="niche"
                      className="bg-surface2 border-line-hover !h-12 w-full rounded-xl text-sm focus:ring-2 focus:ring-purple"
                    >
                      <SelectValue placeholder="Select a niche…" />
                    </SelectTrigger>
                    <SelectContent className="border-line bg-surface">
                      {NICHES.map((n) => {
                        const Icon = NICHE_ICONS[n] ?? Search;
                        return (
                          <SelectItem key={n} value={n} className="text-sm">
                            <span className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-purple-bright" aria-hidden />
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
                    className="mb-2 block text-xs font-medium tracking-widest text-ink-dim uppercase"
                  >
                    Topic or Video Angle
                  </label>
                  <div className="relative">
                    <input
                      id="topic"
                      value={topic}
                      maxLength={140}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., The man who faked his own death for insurance money"
                      className="bg-surface2 border-line-hover h-12 w-full rounded-xl border px-3 pr-14 text-sm text-ink placeholder:text-ink-muted focus:border-purple focus:ring-2 focus:ring-purple focus:outline-none"
                    />
                    <span
                      className={`pointer-events-none absolute right-3 bottom-1.5 text-[10px] ${
                        topic.length > 120 ? "text-warning" : "text-ink-muted"
                      }`}
                    >
                      {topic.length}/140
                    </span>
                  </div>
                </div>

                <PrimaryButton
                  type="submit"
                  disabled={disabled}
                  className="h-12 w-full px-6 whitespace-nowrap md:w-auto"
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
              </div>

              {error ? <p className="mt-2 text-xs text-warning">{error}</p> : null}

              <div className="mt-5 flex flex-wrap gap-2">
                {QUICK_STARTS.map((q) => (
                  <button
                    key={q.topic}
                    type="button"
                    onClick={() => quickStart(q)}
                    className="border-line bg-surface2 hover:border-purple cursor-pointer rounded-full border px-3 py-1.5 text-xs text-ink-dim transition-colors hover:text-white"
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
