import { Video, Zap } from "lucide-react";
import type { ProductionPackage } from "@/lib/generator";
import { AFFILIATES } from "@/config/affiliates";
import { CardShell } from "./CardShell";
import { AffiliateCta, BlockLabel, CopyButton, FooterCta, MonoBlock } from "./primitives";

export function CameraCard({ pkg }: { pkg: ProductionPackage }) {
  const cam = pkg.camera;

  const allText = [
    "VIDEO GENERATION PROMPTS",
    cam.shots.map((s) => `Shot ${String(s.index).padStart(2, "0")}\n${s.prompt}`).join("\n\n"),
    "",
    "SOUND DESIGN & MUSIC CUES",
    cam.soundDesign.map((r) => `- ${r}`).join("\n"),
  ].join("\n");

  return (
    <CardShell
      icon={Video}
      step="STEP 03"
      title="Video Generation Prompts"
      subtitle="Copy-paste shot prompts for Runway, Kling, Luma or Veo."
      copyAllValue={allText}
      rail="pc"
    >
      <div>
        <BlockLabel>Shot List — One Prompt Per Clip</BlockLabel>
        <ol className="space-y-3">
          {cam.shots.map((s) => (
            <li key={s.index} className="border-line bg-surface2/50 rounded-lg border p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-ink">
                  Shot {String(s.index).padStart(2, "0")}
                </p>
                <CopyButton value={s.prompt} label="" className="px-1" />
              </div>
              <MonoBlock className="mt-1.5 max-h-none text-[11px]">{s.prompt}</MonoBlock>
            </li>
          ))}
        </ol>
      </div>

      <AffiliateCta ctaKey="card3Mid" className="w-full">
        <Zap className="h-4 w-4 shrink-0" aria-hidden />
        {AFFILIATES.card3Mid.label}
      </AffiliateCta>

      <div>
        <BlockLabel action={<CopyButton value={cam.soundDesign.join("\n")} />}>
          Sound Design &amp; Music Cues
        </BlockLabel>
        <ul className="space-y-1.5 text-sm text-ink-dim">
          {cam.soundDesign.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="text-cyan">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <FooterCta
        ctaKey="card3Foot"
        headline="Static images don't retain. Motion does."
        copy="Test the AI animation engine top faceless channels are quietly using."
      />
    </CardShell>
  );
}
