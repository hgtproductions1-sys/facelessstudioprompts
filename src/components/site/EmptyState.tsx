import { Clapperboard } from "lucide-react";

export function EmptyState() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="border-line bg-surface2/30 flex flex-col items-center rounded-2xl border border-dashed px-6 py-16 text-center">
        <span className="from-purple/15 to-cyan/15 border-line-hover flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-br">
          <Clapperboard className="h-7 w-7 text-purple-bright" aria-hidden />
        </span>
        <h2 className="mt-5 text-lg font-semibold text-ink">Your blueprint will appear here</h2>
        <p className="mt-2 max-w-sm text-sm text-ink-dim">
          Pick a niche, drop a topic, and hit Generate.
        </p>
      </div>
    </div>
  );
}
