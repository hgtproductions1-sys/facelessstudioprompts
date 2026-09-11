import { CheckCircle2, Circle, Loader2, Sparkles } from "lucide-react";
import { LOADING_STEPS } from "@/hooks/usePackageGenerator";

export function ProgressStepper({
  step,
  totalMs,
  slow,
}: {
  step: number;
  totalMs: number;
  slow: boolean;
}) {
  const finished = slow;
  return (
    <div className="glass-card relative mx-auto max-w-7xl overflow-hidden p-4">
      <div
        className="from-purple/15 pointer-events-none absolute inset-0 bg-gradient-to-r via-transparent to-cyan/15"
        aria-hidden
      />
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <span className="from-purple to-cyan relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br">
            <Sparkles className="h-4 w-4 text-white" aria-hidden />
            <span
              className="bg-purple/40 absolute inset-0 animate-ping rounded-xl opacity-60"
              aria-hidden
            />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Generating Blueprint…</p>
            <p className="text-ink-muted text-xs">
              Writing script, image prompt and shot list for your selected format, vibe and pacing.
            </p>
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LOADING_STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={label} className="flex items-center gap-2 text-xs">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />
                ) : active ? (
                  <Loader2 className="h-4 w-4 animate-spin text-purple-bright" aria-hidden />
                ) : (
                  <Circle className="h-4 w-4 text-ink-muted" aria-hidden />
                )}
                <span className={done || active ? "text-ink" : "text-ink-muted"}>{label}</span>
              </li>
            );
          })}
        </ol>
        <div className="bg-surface2 mt-4 h-1 w-full overflow-hidden rounded-full">
          <div
            className="from-purple to-cyan h-full rounded-full bg-gradient-to-r"
            style={
              finished
                ? { width: "100%", animation: "fsp-pulse 1.6s ease-in-out infinite" }
                : { width: "100%", animation: `fsp-fill ${totalMs}ms linear forwards` }
            }
          />
        </div>
        {finished ? (
          <p className="text-ink-muted mt-3 text-xs">
            Still writing — a real AI blueprint takes 30&ndash;60 seconds. Keep this tab open and
            your blueprint will appear here.
          </p>
        ) : null}
      </div>
      <style>{`@keyframes fsp-fill { from { width: 0% } to { width: 100% } } @keyframes fsp-pulse { 0%, 100% { opacity: 0.35 } 50% { opacity: 1 } } @keyframes fsp-shimmer { 100% { transform: translateX(100%) } }`}</style>
    </div>
  );
}

function Bar({ w }: { w: string }) {
  return <div className={`bg-surface2 h-3 rounded ${w}`} />;
}

const SKELETON_LABELS = [
  "Script & Voiceover",
  "Master Image Prompt",
  "Video Generation Prompts",
  "Variation & Anti-Generic Plan",
];

export function SkeletonCards() {
  return (
    <div className="mx-auto mt-6 grid max-w-[1600px] grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
      {SKELETON_LABELS.map((label, i) => (
        <div
          key={label}
          className="glass-card relative isolate h-full overflow-hidden p-5"
          style={{ boxShadow: "0 0 40px -20px rgba(139,92,246,0.6)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{ animation: `fsp-shimmer 1.8s ${i * 0.2}s ease-in-out infinite` }}
            aria-hidden
          />
          <div className="relative animate-pulse space-y-4">
            <div className="flex items-center gap-3">
              <div className="from-purple/40 to-cyan/40 h-10 w-10 rounded-lg bg-gradient-to-br" />
              <div className="flex-1 space-y-2">
                <p className="text-xs font-semibold tracking-widest text-ink-dim uppercase">
                  {label}
                </p>
                <Bar w="w-2/3" />
              </div>
            </div>
            <div className="space-y-2">
              <Bar w="w-5/6" />
              <Bar w="w-full" />
              <Bar w="w-3/4" />
            </div>
            <div className="bg-surface2 h-24 rounded-lg" />
            <div className="space-y-2">
              <Bar w="w-2/3" />
              <Bar w="w-4/5" />
            </div>
            <div className="bg-surface2 h-11 rounded-xl" />
            <div className="bg-surface2 h-28 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
