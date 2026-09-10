import { AFFILIATES } from "@/config/affiliates";
import { ArrowRight, UserRound } from "lucide-react";
import type { ProductionPackage } from "@/lib/generator";
import { CardShell } from "./CardShell";
import { AffiliateCta, BlockLabel, CopyButton, FooterCta, MonoBlock, SpecGrid } from "./primitives";

export function CharacterCard({ pkg }: { pkg: ProductionPackage }) {
  const c = pkg.character;
  const allText = [
    `MASTER CHARACTER PROFILE — ${c.archetype}`,
    `Tone: ${c.toneTags.join(", ")} | Consistency Score: ${c.consistencyScore}/100`,
    ``,
    c.physicalDescription,
    ``,
    c.wardrobe.map((w) => `- ${w}`).join("\n"),
    ``,
    Object.entries(c.voiceSpec)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
    ``,
    c.hooks.map((h) => `${h.label}: ${h.text}`).join("\n"),
    ``,
    c.cueSheet.map((r) => `${r.cue} ${r.line}`).join("\n"),
    ``,
    c.retentionBeats.map((b) => `- ${b}`).join("\n"),
  ].join("\n");

  return (
    <CardShell
      icon={UserRound}
      step="STEP 01"
      title="Master Character Profile"
      subtitle="Your recurring faceless persona + VO delivery script."
      copyAllValue={allText}
      rail="pc"
    >
      <div>
        <BlockLabel>Archetype</BlockLabel>
        <div className="flex flex-wrap items-center gap-2">
          <span className="border-purple/40 bg-purple/10 rounded-full border px-3 py-1 text-xs font-medium text-purple-bright">
            {c.archetype}
          </span>
          {c.toneTags.map((t) => (
            <span
              key={t}
              className="border-line bg-surface2 rounded-full border px-3 py-1 text-xs text-ink-dim"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] text-ink-dim">
            <span>Consistency Score</span>
            <span className="text-ink">{c.consistencyScore}/100</span>
          </div>
          <div className="bg-surface2 mt-1.5 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="from-purple to-cyan h-full rounded-full bg-gradient-to-r"
              style={{ width: `${c.consistencyScore}%` }}
            />
          </div>
        </div>
      </div>

      <div>
        <BlockLabel action={<CopyButton value={c.physicalDescription} />}>
          Physical Description
        </BlockLabel>
        <MonoBlock>{c.physicalDescription}</MonoBlock>
      </div>

      <div>
        <BlockLabel action={<CopyButton value={c.wardrobe.join("\n")} />}>
          Wardrobe &amp; Props
        </BlockLabel>
        <ul className="space-y-1.5 text-sm text-ink-dim">
          {c.wardrobe.map((w) => (
            <li key={w} className="flex gap-2">
              <span className="text-cyan">•</span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </div>

      <AffiliateCta ctaKey="card1Mid" className="w-full">
        {AFFILIATES.card1Mid.label}
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
      </AffiliateCta>

      <div>
        <BlockLabel>Voice &amp; Delivery Profile</BlockLabel>
        <SpecGrid rows={Object.entries(c.voiceSpec) as [string, string][]} />
      </div>

      <div>
        <BlockLabel
          action={<CopyButton value={c.hooks.map((h) => `${h.label}: ${h.text}`).join("\n")} />}
        >
          Hook Script (First 3 Seconds)
        </BlockLabel>
        <MonoBlock>{c.hooks.map((h) => `${h.label}: ${h.text}`).join("\n")}</MonoBlock>
      </div>

      <div>
        <BlockLabel
          action={
            <CopyButton
              value={c.cueSheet.map((r) => `${r.timestamp} | ${r.line} | ${r.cue}`).join("\n")}
            />
          }
        >
          Voiceover Cue Sheet
        </BlockLabel>
        <div className="border-line divide-line divide-y rounded-lg border">
          {c.cueSheet.map((r) => (
            <div key={r.timestamp} className="p-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-cyan">{r.timestamp}</span>
                <span className="text-sm text-ink">{r.line}</span>
              </div>
              <p className="mt-1 font-mono text-[11px] text-ink-muted">{r.cue}</p>
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
