import { CheckCircle2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { buildBlueprintText } from "@/lib/format";
import { copyText } from "@/components/site/primitives";
import { slugify, type ProductionPackage } from "@/lib/generator";

const CHECKLIST = [
  "Character + voiceover prompt",
  "Visual style prompt with render flags",
  "Camera motion & animation plan",
];

export function BlueprintCard({ pkg }: { pkg: ProductionPackage | null }) {
  const ready = Boolean(pkg);

  const downloadBlueprint = () => {
    if (!pkg) return;
    const blob = new Blob([buildBlueprintText(pkg)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(pkg.topic)}-faceless-blueprint.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Blueprint downloaded as .txt");
  };

  const copyBlueprint = () => {
    if (!pkg) return;
    copyText(buildBlueprintText(pkg), "Blueprint copied");
  };

  return (
    <section aria-labelledby="blueprint-card-title" className="relative">
      <div className="glass-card top-rail-pc relative overflow-hidden rounded-2xl p-6 md:p-8">
        <span className="border-line-hover bg-surface2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-widest text-cyan uppercase">
          Complete Blueprint
        </span>

        <h2
          id="blueprint-card-title"
          className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl"
        >
          Download the{" "}
          <span className="gradient-text">Complete Faceless Video Blueprint</span>
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
          Everything you just generated — character profile, voiceover script, visual prompts, and
          camera motion plan — packaged as a single .txt file. Copy it, paste it, use it anywhere.
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
              <CheckCircle2 className="text-cyan mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={downloadBlueprint}
            disabled={!ready}
            className="from-purple to-cyan inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-6 py-4 text-base font-bold text-[#0a0a0c] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_28px_-4px_rgba(139,92,246,0.65)] focus-visible:ring-2 focus-visible:ring-purple-bright focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none disabled:hover:brightness-100"
          >
            <Download className="h-5 w-5" aria-hidden />
            Download as .txt
          </button>
          <button
            type="button"
            onClick={copyBlueprint}
            disabled={!ready}
            className="border-line-hover inline-flex flex-1 items-center justify-center gap-2 rounded-xl border bg-transparent px-6 py-4 text-base font-bold text-ink transition-colors duration-200 hover:border-cyan hover:text-cyan focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Copy className="h-5 w-5" aria-hidden />
            Copy Full Blueprint
          </button>
        </div>

        <p className="mt-3 text-xs text-ink-muted">
          {ready
            ? "Instant download · No email · No signup"
            : "Generate a blueprint first to unlock this download."}
        </p>
      </div>
    </section>
  );
}
