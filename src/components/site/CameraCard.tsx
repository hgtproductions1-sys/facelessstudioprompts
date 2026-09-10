import { Video, Zap } from "lucide-react";
import type { ProductionPackage } from "@/lib/generator";
import { AFFILIATES } from "@/config/affiliates";
import { CardShell } from "./CardShell";
import { AffiliateCta, BlockLabel, CopyButton, FooterCta, SpecGrid } from "./primitives";

export function CameraCard({ pkg }: { pkg: ProductionPackage }) {
  const cam = pkg.camera;
  const shotText = (s: (typeof cam.shots)[number]) => s.prompt;

  const allText = [
    "CAMERA MOTION PLAN",
    Object.entries(cam.overview)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
    "",
    cam.shots.map(shotText).join("\n\n"),
    "",
    cam.rigCheatSheet.map((r) => `- ${r}`).join("\n"),
    "",
    cam.soundDesign.map((r) => `- ${r}`).join("\n"),
  ].join("\n");

  return (
    <CardShell
      icon={Video}
      step="STEP 03"
      title="Camera Motion Plan"
      subtitle="Shot-by-shot movement, timing, and transitions."
      copyAllValue={allText}
      rail="pc"
    >
      <div>
        <BlockLabel>Sequence Overview</BlockLabel>
        <SpecGrid rows={Object.entries(cam.overview) as [string, string][]} />
      </div>

      <div>
        <BlockLabel>Shot List</BlockLabel>
        <ol className="relative space-y-4">
          {cam.shots.map((s, i) => (
            <li key={s.index} className="relative flex gap-3">
              <div className="flex flex-col items-center">
                <span className="border-purple/40 bg-surface2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] text-purple-bright">
                  {String(s.index).padStart(2, "0")}
                </span>
                {i < cam.shots.length - 1 ? (
                  <span className="from-purple/60 to-cyan/20 mt-1 w-px flex-1 bg-gradient-to-b" />
                ) : null}
              </div>
              <div className="border-line bg-surface2/50 flex-1 rounded-lg border p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">
                    Shot {String(s.index).padStart(2, "0")} — {s.timecode}
                  </p>
                  <CopyButton value={shotText(s)} label="" className="px-1" />
                </div>
                <p className="mt-1.5 text-xs text-ink-dim">
                  <span className="text-cyan">Motion:</span> {s.motion}
                </p>
                <p className="mt-1 text-xs text-ink-dim">
                  <span className="text-cyan">Transition:</span> {s.transition}
                </p>
                <p className="mt-1 text-xs text-ink-dim">
                  <span className="text-cyan">Animation Cue:</span> {s.animationCue}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <AffiliateCta ctaKey="card3Mid" className="w-full">
        <Zap className="h-4 w-4 shrink-0" aria-hidden />
        {AFFILIATES.card3Mid.label}
      </AffiliateCta>

      <div>
        <BlockLabel>Camera Rig Cheat Sheet</BlockLabel>
        <ul className="space-y-1.5 text-sm text-ink-dim">
          {cam.rigCheatSheet.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="text-purple-bright">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <BlockLabel>Sound Design Layer</BlockLabel>
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
