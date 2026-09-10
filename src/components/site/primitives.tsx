import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { AFFILIATES, handleCtaClick, type AffiliateKey } from "@/config/affiliates";

export async function copyText(text: string, label = "Copied to clipboard") {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(label);
  } catch {
    toast.error("Couldn't access the clipboard");
  }
}

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await copyText(value, `${label === "Copy" ? "Copied" : label} — ready to paste`);
        setDone(true);
        setTimeout(() => setDone(false), 1400);
      }}
      aria-label={`${label} to clipboard`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-ink-dim transition-colors hover:text-cyan focus-visible:ring-2 focus-visible:ring-purple focus-visible:outline-none",
        className,
      )}
    >
      {done ? (
        <Check className="h-3.5 w-3.5 text-success" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden />
      )}
      <span>{label}</span>
    </button>
  );
}

export function BlockLabel({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-2 flex items-center justify-between gap-2">
      <h4 className="text-[11px] font-medium tracking-widest text-ink-dim uppercase">{children}</h4>
      {action}
    </div>
  );
}

export function MonoBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <pre
      className={cn(
        "border-line bg-code max-h-[200px] overflow-auto rounded-lg border p-3 font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-[#d4d4dc]",
        className,
      )}
    >
      {children}
    </pre>
  );
}

export function SpecGrid({
  rows,
  copyable = false,
}: {
  rows: [string, string][];
  copyable?: boolean;
}) {
  return (
    <dl className="border-line bg-surface2/60 divide-line divide-y rounded-lg border">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between gap-3 px-3 py-2">
          <dt className="text-xs text-ink-dim">{k}</dt>
          <dd className="flex items-center gap-1 text-right font-mono text-xs text-ink">
            <span className="break-all">{v}</span>
            {copyable ? <CopyButton value={v} label="" className="px-1" /> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "from-purple to-cyan inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-semibold text-[#0a0a0c] transition-all duration-200 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-purple-bright focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:outline-none active:scale-[0.98]",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:shadow-[0_0_28px_-4px_rgba(139,92,246,0.65)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-surface2 border-line-hover hover:border-purple inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm text-ink transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-purple focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </button>
  );
}

const ctaBase =
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-bright focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:outline-none active:scale-[0.98]";

export function AffiliateCta({
  ctaKey,
  className,
  variant = "primary",
  children,
}: {
  ctaKey: AffiliateKey;
  className?: string;
  variant?: "primary" | "secondary";
  children?: ReactNode;
}) {
  const cta = AFFILIATES[ctaKey];
  const internal = cta.internal;
  return (
    <a
      href={cta.url}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer sponsored" })}
      onClick={() => handleCtaClick(cta.id, internal)}
      className={cn(
        ctaBase,
        variant === "primary"
          ? "from-purple to-cyan bg-gradient-to-r px-5 py-3 text-[#0a0a0c] hover:brightness-110 hover:shadow-[0_0_28px_-4px_rgba(139,92,246,0.65)]"
          : "bg-surface2 border-line-hover hover:border-purple border px-4 py-2.5 font-normal text-ink hover:text-white",
        className,
      )}
    >
      {children ?? cta.label}
    </a>
  );
}

export function FooterCta({
  ctaKey,
  headline,
  copy,
}: {
  ctaKey: AffiliateKey;
  headline: string;
  copy: string;
}) {
  return (
    <div className="border-purple/30 from-purple/10 to-cyan/5 rounded-xl border bg-gradient-to-br p-4">
      <p className="text-sm font-bold text-ink">{headline}</p>
      <p className="mt-1 text-xs text-ink-dim">{copy}</p>
      <AffiliateCta ctaKey={ctaKey} className="mt-3 w-full" />
      {AFFILIATES[ctaKey].internal ? null : (
        <p className="mt-2 text-[10px] text-ink-muted">
          Affiliate link — we may earn a commission at no cost to you.
        </p>
      )}
    </div>
  );
}
