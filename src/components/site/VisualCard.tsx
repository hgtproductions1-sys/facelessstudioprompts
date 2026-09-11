import { Image as ImageIcon, Sparkles } from "lucide-react";
import type { ProductionPackage } from "@/lib/generator";
import { AFFILIATES } from "@/config/affiliates";
import { CardShell } from "./CardShell";
import { AffiliateCta, BlockLabel, CopyButton, FooterCta, MonoBlock } from "./primitives";

export function VisualCard({ pkg }: { pkg: ProductionPackage }) {
  const v = pkg.visual;
  const master = v.masterPrompt || v.leonardoPrompt;

  const allText = [
    "MASTER IMAGE PROMPT",
    master,
    "",
    "NEGATIVE PROMPT",
    v.negativePrompt,
  ].join("\n");

  return (
    <CardShell
      icon={ImageIcon}
      step="STEP 02"
      title="Master Image Prompt"
      subtitle="One universal prompt that works in any AI image engine."
      copyAllValue={allText}
      rail="cp"
    >
      <div>
        <BlockLabel action={<CopyButton value={master} label="Copy Prompt" />}>
          Master Prompt
        </BlockLabel>
        <MonoBlock className="max-h-none">{master}</MonoBlock>
      </div>

      <AffiliateCta ctaKey="card2Mid" className="w-full">
        <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
        {AFFILIATES.card2Mid.label}
      </AffiliateCta>

      <div>
        <BlockLabel action={<CopyButton value={v.negativePrompt} label="Copy Negative" />}>
          Negative Prompt
        </BlockLabel>
        <MonoBlock className="max-h-none">{v.negativePrompt}</MonoBlock>
      </div>

      <FooterCta
        ctaKey="card2Foot"
        headline="Stop fighting inconsistent AI images."
        copy="Grab our 40-prompt consistency pack plus the exact seed settings."
      />
    </CardShell>
  );
}
