import { cn } from "@/lib/utils";

/**
 * Google AdSense placeholder slots.
 * Drop your <ins class="adsbygoogle" …> markup inside once your account is approved.
 */
export function LeaderboardAd({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Advertisement"
      className={cn("mx-auto w-full max-w-[728px] px-4", className)}
    >
      <div className="border-line bg-surface2/40 flex h-[90px] w-full items-center justify-center rounded-xl border border-dashed">
        {/* AdSense slot: 728x90 leaderboard */}
        <span className="text-[10px] tracking-widest text-ink-muted uppercase">
          Advertisement · 728×90
        </span>
      </div>
    </aside>
  );
}

export function NativeAd({ className }: { className?: string }) {
  return (
    <aside aria-label="Advertisement" className={cn("mx-auto w-full max-w-4xl px-4", className)}>
      <div className="border-line bg-surface2/40 flex min-h-[250px] w-full flex-col items-center justify-center gap-1 rounded-2xl border border-dashed p-6 text-center">
        {/* AdSense slot: in-article / native fluid */}
        <span className="text-[10px] tracking-widest text-ink-muted uppercase">
          Advertisement · Native in-article
        </span>
        <span className="text-xs text-ink-muted">
          Sponsored placement — helps keep this generator free.
        </span>
      </div>
    </aside>
  );
}
