import { ArrowRight, Shuffle } from "lucide-react";
import type { ProductionPackage } from "@/lib/generator";
import { AFFILIATES } from "@/config/affiliates";
import { CardShell } from "./CardShell";
import { AffiliateCta, BlockLabel, CopyButton, MonoBlock, SpecGrid } from "./primitives";

export function VariationCard({ pkg }: { pkg: ProductionPackage }) {
  const variation = pkg.variation;
  const rows: [string, string][] = [
    ["Hook Style", variation.hookStyle],
    ["Story Structure", variation.storyStructure],
    ["Pacing Profile", variation.pacingProfile],
    ["Editing Style", variation.editingStyle],
    ["Emotional Tone", variation.emotionalTone],
  ];
  const allText = [
    "VARIATION & ANTI-GENERIC PLAN",
    "",
    "COPY-PASTE PROMPT",
    variation.copyPastePrompt,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  return (
    <CardShell
      icon={Shuffle}
      step="STEP 04"
      title="Variation & Anti-Generic Plan"
      subtitle="Keep every upload unique — YouTube's 2026 review criteria"
      copyAllValue={allText}
      rail="cp"
    >
      <div>
        <BlockLabel action={<CopyButton value={variation.copyPastePrompt} label="Copy Prompt" />}>
          Copy-Paste Prompt
        </BlockLabel>
        <MonoBlock className="max-h-none">{variation.copyPastePrompt}</MonoBlock>
      </div>

      <AffiliateCta ctaKey="card4Mid" className="w-full">
        {AFFILIATES.card4Mid.label}
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </AffiliateCta>

      <SpecGrid rows={rows} />

      <p className="text-xs leading-relaxed text-ink-muted">
        YouTube reviewers check videos 1, 3, 7, 12, and 20 for consistency. This plan varies each to
        keep your channel original.
      </p>
    </CardShell>
  );
}