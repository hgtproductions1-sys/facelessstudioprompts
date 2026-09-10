import { CheckCircle2, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { openContentLocker } from "@/lib/locker";

const CHECKLIST = [
  "47-page PDF blueprint",
  "12 niche-specific persona templates",
  "Master prompt library (Midjourney + Leonardo)",
  "Step-by-step CPA funnel diagram",
];

export function LockerCard() {
  const handleUnlockClick = () => {
    toast.loading("Unlocking your blueprint…", { id: "locker" });
    const triggered = openContentLocker();
    setTimeout(() => {
      if (triggered) {
        toast.success("Locker opened — complete an offer to unlock.", { id: "locker" });
      } else {
        toast.info("Locker script not installed yet. See /src/lib/locker.ts.", { id: "locker" });
      }
    }, 600);
  };

  return (
    <div className="relative">
      {/* ambient background glow */}
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-full bg-[#8b5cf6]/30 blur-3xl" />
      <div
        aria-hidden
        className="absolute -right-10 -bottom-10 -z-10 h-56 w-56 rounded-full bg-[#06b6d4]/20 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-[#8b5cf6]/40 bg-gradient-to-br from-[#161b22] via-[#161b22] to-[#1c2128] p-6 shadow-[0_0_60px_-20px_rgba(139,92,246,0.5)] md:p-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* LEFT — content */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/20 px-3 py-1 text-[10px] font-semibold tracking-widest text-[#c4b5fd]">
              BONUS
            </span>

            <h2 className="mt-4 text-2xl leading-tight font-bold md:text-3xl">
              Bonus: Download the{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                Complete Faceless Video Blueprint
              </span>{" "}
              (PDF)
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#8b949e]">
              The 47-page playbook covering niche selection, persona locking, prompt stacking,
              camera motion templates, and the exact funnel structure top faceless channels use to
              convert cold traffic.
            </p>

            <ul className="mt-5 space-y-2.5">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#c9d1d9]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#06b6d4]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-5 max-w-xl text-[11px] leading-relaxed text-[#6e7681]">
              Free download. Completing a short sponsor offer unlocks the file instantly — this
              keeps the tool free for everyone.
            </p>
          </div>

          {/* RIGHT — locked visual + CTA */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-3xl bg-[#8b5cf6]/25 blur-xl motion-safe:animate-pulse"
              />
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-[#8b5cf6]/40 bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20">
                <Download className="h-10 w-10 text-[#8b5cf6]" aria-hidden />
                {/* shimmer sweep */}
                <div
                  aria-hidden
                  className="shimmer-sweep absolute inset-0 motion-safe:animate-[shimmer_2.5s_linear_infinite]"
                />
              </div>
            </div>

            <div className="mt-5 flex rotate-[-4deg] items-center gap-2 rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-2 opacity-70">
              <FileText className="h-4 w-4 shrink-0 text-[#8b949e]" aria-hidden />
              <span className="font-mono text-xs text-[#c9d1d9]">Faceless-Video-Blueprint.pdf</span>
              <span className="rounded-full border border-[#06b6d4]/40 bg-[#06b6d4]/20 px-2 py-0.5 text-[10px] text-[#67e8f9]">
                PDF
              </span>
            </div>

            <button
              type="button"
              onClick={handleUnlockClick}
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] px-8 py-4 text-base font-bold text-[#0d1117] transition-all hover:shadow-[0_0_40px_-4px_rgba(139,92,246,0.8)] hover:brightness-110 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#8b5cf6] focus-visible:outline-none"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Complete Package
            </button>

            <p className="mt-3 text-center text-[11px] text-[#6e7681]">
              Instant download · No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
