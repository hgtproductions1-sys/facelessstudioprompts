import { useState } from "react";
import { Palette, RefreshCw, Sparkles } from "lucide-react";
import type { ProductionPackage } from "@/lib/generator";
import { AFFILIATES } from "@/config/affiliates";
import { CardShell } from "./CardShell";
import { AffiliateCta, BlockLabel, CopyButton, FooterCta, MonoBlock, SpecGrid } from "./primitives";

function rerollToken(token: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return token.replace(/FSP-CORE-[^-]+-v1/, `FSP-CORE-${out}-v1`);
}

export function VisualCard({ pkg }: { pkg: ProductionPackage }) {
  const v = pkg.visual;
  const [token, setToken] = useState(v.consistencyToken);

  const specRows: [string, string][] = [
    ["Aspect Ratio", v.aspectRatio],
    ["Resolution", v.resolution],
    ["Model", v.model],
    ["Stylize", String(v.stylize)],
    ["Chaos", String(v.chaos)],
    ["Seed", String(v.seedValue)],
    ["Negative Prompt", v.negativePrompt],
  ];

  const allText = [
    `VISUAL STYLE PROMPTS`,
    `Style DNA: ${v.styleDNA.join(", ")}`,
    specRows.map(([k, val]) => `${k}: ${val}`).join("\n"),
    ``,
    `LEONARDO.AI PROMPT\n${v.leonardoPrompt}`,
    ``,
    `MIDJOURNEY PROMPT\n${v.midjourneyPrompt}`,
    ``,
    `GOOGLE FLOW (VEO 3) PROMPT\n${v.googleFlowPrompt}`,
    ``,
    `CONSISTENCY TOKEN: ${token}`,
    ``,
    v.negativeLibrary.map((n) => `- ${n}`).join("\n"),
  ].join("\n");

  return (
    <CardShell
      icon={Palette}
      step="STEP 02"
      title="Visual Style Prompts"
      subtitle="Copy-paste prompts for Leonardo.ai, Midjourney & Google Flow."
      copyAllValue={allText}
      rail="cp"
    >
      <div>
        <BlockLabel>Style DNA</BlockLabel>
        <div className="flex flex-wrap gap-2">
          {v.styleDNA.map((t) => (
            <span
              key={t}
              className="border-cyan/30 bg-cyan/10 rounded-full border px-3 py-1 text-xs text-cyan-bright"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div>
        <BlockLabel>Aspect Ratio &amp; Render Flags</BlockLabel>
        <SpecGrid rows={specRows} copyable />
      </div>

      <AffiliateCta ctaKey="card2Mid" className="w-full">
        <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
        {AFFILIATES.card2Mid.label}
      </AffiliateCta>

      <div>
        <BlockLabel action={<CopyButton value={v.leonardoPrompt} />}>Leonardo.ai Prompt</BlockLabel>
        <MonoBlock>{v.leonardoPrompt}</MonoBlock>
      </div>

      <div>
        <BlockLabel action={<CopyButton value={v.midjourneyPrompt} />}>
          Midjourney Prompt
        </BlockLabel>
        <MonoBlock>{v.midjourneyPrompt}</MonoBlock>
      </div>

      <div>
        <BlockLabel action={<CopyButton value={v.googleFlowPrompt} />}>
          Google Flow (Veo 3) Prompt
        </BlockLabel>
        <MonoBlock>{v.googleFlowPrompt}</MonoBlock>
      </div>

      <div>
        <BlockLabel
          action={
            <div className="flex items-center gap-1">
              <CopyButton value={token} />
              <button
                type="button"
                aria-label="Regenerate consistency token"
                onClick={() => setToken(rerollToken(token))}
                className="rounded-md p-1 text-ink-dim transition-colors hover:text-cyan"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          }
        >
          Character Consistency Token
        </BlockLabel>
        <MonoBlock>{token}</MonoBlock>
      </div>

      <div>
        <BlockLabel>Negative Prompt Library</BlockLabel>
        <div className="flex flex-wrap gap-2">
          {v.negativeLibrary.map((n) => (
            <span
              key={n}
              className="border-line bg-surface2 flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-ink-dim"
            >
              {n}
              <CopyButton value={n} label="" className="px-1" />
            </span>
          ))}
        </div>
      </div>

      <FooterCta
        ctaKey="card2Foot"
        headline="Stop fighting inconsistent AI images."
        copy="Grab our 40-prompt consistency pack plus the exact seed settings."
      />
    </CardShell>
  );
}
