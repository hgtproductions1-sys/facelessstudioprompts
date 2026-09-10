import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { LOADING_STEPS } from "@/hooks/usePackageGenerator";

export function ProgressStepper({ step, totalMs }: { step: number; totalMs: number }) {
  return (
    <div className="glass-card mx-auto max-w-7xl p-4">
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
          style={{ width: "100%", animation: `fsp-fill ${totalMs}ms linear forwards` }}
        />
      </div>
      <style>{`@keyframes fsp-fill { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}

function Bar({ w }: { w: string }) {
  return <div className={`bg-surface2 h-3 rounded ${w}`} />;
}

export function SkeletonCards() {
  return (
    <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="glass-card animate-pulse space-y-4 p-5">
          <div className="flex items-center gap-3">
            <div className="bg-surface2 h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Bar w="w-1/3" />
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
      ))}
    </div>
  );
}
