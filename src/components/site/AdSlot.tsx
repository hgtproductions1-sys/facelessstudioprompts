import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const ADSENSE_CLIENT = "ca-pub-3120853344446369";
/** Replace with the ad-unit slot IDs from your AdSense dashboard. */
export const ADSENSE_SLOTS = {
  leaderboard: "0000000000",
  inArticle: "0000000000",
} as const;

function pushAd(ref: React.RefObject<HTMLModElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.adStatus === "done") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet (e.g. ad blocker) — slot collapses gracefully.
    }
  }, [ref]);
}

export function LeaderboardAd({ className }: { className?: string }) {
  const insRef = useRef<HTMLModElement>(null);
  pushAd(insRef);

  return (
    <aside
      aria-label="Advertisement"
      className={cn("mx-auto w-full max-w-[728px] px-4", className)}
    >
      <div className="border-line bg-surface2/40 flex min-h-[90px] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "inline-block", width: "728px", maxWidth: "100%", height: "90px" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={ADSENSE_SLOTS.leaderboard}
        />
      </div>
    </aside>
  );
}

export function NativeAd({ className }: { className?: string }) {
  const insRef = useRef<HTMLModElement>(null);
  pushAd(insRef);

  return (
    <aside aria-label="Advertisement" className={cn("mx-auto w-full max-w-4xl px-4", className)}>
      <div className="border-line bg-surface2/40 flex min-h-[250px] w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border border-dashed p-6 text-center">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={ADSENSE_SLOTS.inArticle}
        />
        <span className="text-xs text-ink-muted">
          Sponsored placement — helps keep this generator free.
        </span>
      </div>
    </aside>
  );
}
