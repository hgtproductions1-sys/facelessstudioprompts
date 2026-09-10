import { useState } from "react";
import { ArrowUpRight, Cpu } from "lucide-react";
import type { ProductionPackage } from "@/lib/generator";
import { AI_TOOLS, ENGINE_GROUPS, type EngineCategory } from "@/config/aiTools";
import { handleCtaClick } from "@/config/affiliates";
import { BlockLabel, CopyButton, MonoBlock } from "./primitives";
import { cn } from "@/lib/utils";

export function EnginePrompts({ pkg }: { pkg: ProductionPackage }) {
  const [tab, setTab] = useState<EngineCategory>("image");
  const tools = AI_TOOLS.filter((t) => t.category === tab);

  return (
    <section
      aria-label="Prompt syntax per AI engine"
      className="glass-card top-rail-cp relative overflow-hidden p-5 md:p-7"
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="from-purple/20 to-cyan/20 border-line-hover flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br">
            <Cpu className="h-5 w-5 text-purple-bright" aria-hidden />
          </span>
          <div>
            <p className="text-[10px] tracking-widest text-ink-muted">STEP 04</p>
            <h3 className="text-lg font-semibold text-ink">Engine-Ready Prompt Syntax</h3>
            <p className="mt-0.5 text-xs text-ink-dim">
              The same blueprint, rewritten in the exact syntax each AI tool expects.
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Engine category"
          className="border-line bg-surface2 flex flex-wrap gap-1 rounded-xl border p-1"
        >
          {ENGINE_GROUPS.map((g) => (
            <button
              key={g.key}
              role="tab"
              type="button"
              aria-selected={tab === g.key}
              onClick={() => setTab(g.key)}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-1.5 text-xs transition-colors",
                tab === g.key
                  ? "from-purple to-cyan bg-gradient-to-r font-semibold text-[#0a0a0c]"
                  : "text-ink-dim hover:text-white",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {tools.map((tool) => {
          const value = tool.build(pkg);
          return (
            <div key={tool.id} className="border-line bg-surface2/40 rounded-xl border p-4">
              <BlockLabel action={<CopyButton value={value} label="Copy Prompt" />}>
                {tool.name}
              </BlockLabel>
              <p className="-mt-1 mb-3 text-xs text-ink-muted">{tool.blurb}</p>
              <MonoBlock>{value}</MonoBlock>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => handleCtaClick(tool.id)}
                className="border-cyan/30 bg-cyan/10 hover:border-cyan mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-cyan-bright transition-colors"
              >
                Try on {tool.name}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[10px] text-ink-muted">
        Tool links are affiliate links — we may earn a commission at no cost to you.
      </p>
    </section>
  );
}
