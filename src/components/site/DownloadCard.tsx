import { CheckCircle2, Download } from "lucide-react";

const BLUEPRINT_URL = "/faceless-video-blueprint.pdf";

const CHECKLIST = [
  "47-page PDF blueprint",
  "12 niche-specific persona templates",
  "Master prompt library (Midjourney+ Google Flow + Leonardo)",
  "Step-by-step CPA funnel diagram",
];

export function DownloadCard() {
  return (
    <section aria-labelledby="download-card-title" className="relative">
      <div className="glass-card top-rail-pc relative overflow-hidden rounded-2xl p-6 md:p-8">
        <span className="border-line-hover bg-surface2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-widest text-cyan uppercase">
          Free Download
        </span>

        <h2
          id="download-card-title"
          className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl"
        >
          Bonus: Download the{" "}
          <span className="gradient-text">Complete Faceless Video Blueprint</span> (PDF)
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
          The 47-page playbook covering niche selection, persona locking, prompt stacking, camera
          motion templates, and the exact funnel structure top faceless channels use to convert cold
          traffic.
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
              <CheckCircle2 className="text-cyan mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={BLUEPRINT_URL}
          download
          className="from-purple to-cyan mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-6 py-4 text-base font-bold text-[#0a0a0c] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_28px_-4px_rgba(139,92,246,0.65)] focus-visible:ring-2 focus-visible:ring-purple-bright focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:outline-none active:scale-[0.98] sm:w-auto"
        >
          <Download className="h-5 w-5" aria-hidden />
          Download Free Blueprint (PDF)
        </a>

        <p className="mt-3 text-xs text-ink-muted">
          No email required · Instant download · 100% free
        </p>
      </div>
    </section>
  );
}
