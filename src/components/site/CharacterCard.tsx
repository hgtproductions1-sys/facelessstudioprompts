import { AFFILIATES } from "@/config/affiliates";
import { ArrowRight, Mic } from "lucide-react";
import type { ProductionPackage } from "@/lib/generator";
import { CardShell } from "./CardShell";
import { AffiliateCta, BlockLabel, CopyButton, FooterCta, MonoBlock, SpecGrid } from "./primitives";

export function CharacterCard({ pkg }: { pkg: ProductionPackage }) {
  const c = pkg.character;
  const hooksText = c.hooks.map((h) => `${h.label}: ${h.text}`).join("\n");
  const cueText = c.cueSheet.map((r) => `${r.cue} ${r.line}`).join("\n");

  const allText = [
    "SCRIPT & VOICEOVER",
    Object.entries(c.voiceSpec)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
    "",
    hooksText,
    "",
    cueText,
    "",
    c.retentionBeats.map((b) => `- ${b}`).join("\n"),
  ].join("\n");

  return (
    <CardShell
      icon={Mic}
      step="STEP 01"
      title="Script & Voiceover"
      subtitle="Voice delivery profile plus a ready-to-record cue sheet."
      copyAllValue={allText}
      rail="pc"
    >
      <div>
        <BlockLabel>Voice &amp; Delivery Profile</BlockLabel>
        <SpecGrid rows={Object.entries(c.voiceSpec) as [string, string][]} />
      </div>

      <div>
        <BlockLabel action={<CopyButton value={hooksText} />}>
          Hook Script (First 3 Seconds)
        </BlockLabel>
        <MonoBlock>{hooksText}</MonoBlock>
      </div>

      <AffiliateCta ctaKey="card1Mid" className="w-full">
        {AFFILIATES.card1Mid.label}
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </AffiliateCta>

      <div>
        <BlockLabel action={<CopyButton value={cueText} />}>
          Voiceover Cue Sheet (ElevenLabs v3 tags)
        </BlockLabel>
        <div className="border-line divide-line divide-y rounded-lg border">
          {c.cueSheet.map((r) => (
            <div key={r.timestamp} className="p-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-cyan">{r.timestamp}</span>
                <span className="font-mono text-[11px] text-purple-bright">{r.cue}</span>
              </div>
              <p className="mt-1 text-sm text-ink">{r.line}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <BlockLabel>Retention Beats</BlockLabel>
        <ul className="space-y-1.5 text-sm text-ink-dim">
          {c.retentionBeats.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-warning">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <FooterCta
        ctaKey="card1Foot"
        headline="Your voice is the only asset you can't fake."
        copy="Clone a broadcast-quality AI voice in under 3 minutes — free tier inside."
      />
    </CardShell>
  );
}
