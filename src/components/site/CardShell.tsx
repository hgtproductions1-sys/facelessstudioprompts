import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./primitives";

export function CardShell({
  icon: Icon,
  step,
  title,
  subtitle,
  copyAllValue,
  rail = "pc",
  children,
}: {
  icon: LucideIcon;
  step: string;
  title: string;
  subtitle: string;
  copyAllValue: string;
  rail?: "pc" | "cp";
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "glass-card hover:shadow-[0_0_46px_-18px_rgba(139,92,246,0.75)] relative flex h-full max-h-[550px] flex-col overflow-hidden p-5 transition-shadow xl:p-7",
        rail === "pc" ? "top-rail-pc" : "top-rail-cp",
      )}
      aria-label={title}
    >
      <header className="flex shrink-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="from-purple/20 to-cyan/20 border-line-hover flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br">
            <Icon className="h-5 w-5 text-purple-bright" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] tracking-widest text-ink-muted">{step}</p>
            <h3 className="text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-0.5 text-xs text-ink-dim">{subtitle}</p>
          </div>
        </div>
        <CopyButton value={copyAllValue} label="Copy All" className="shrink-0" />
      </header>

      <div className="mt-5 min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">{children}</div>
    </section>
  );
}
