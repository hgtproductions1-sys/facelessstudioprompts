import { useState } from "react";
import { motion } from "framer-motion";
import type { ProductionPackage } from "@/lib/generator";
import { CharacterCard } from "./CharacterCard";
import { VisualCard } from "./VisualCard";
import { CameraCard } from "./CameraCard";
import { cn } from "@/lib/utils";

const TABS = ["Script", "Image", "Video"] as const;

export function StepPanels({ pkg }: { pkg: ProductionPackage }) {
  const [tab, setTab] = useState(0);

  const cards = [
    <CharacterCard key="s1" pkg={pkg} />,
    <VisualCard key="s2" pkg={pkg} />,
    <CameraCard key="s3" pkg={pkg} />,
  ];

  return (
    <>
      {/* Desktop — equal 3-column layout */}
      <div className="mx-auto mt-6 hidden max-w-7xl grid-cols-3 items-start gap-6 lg:grid">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.12 }}
          >
            {card}
          </motion.div>
        ))}
      </div>

      {/* Mobile / tablet — simple 3-tab switcher */}
      <div className="mx-auto mt-6 max-w-3xl lg:hidden">
        <div
          role="tablist"
          aria-label="Blueprint steps"
          className="border-line bg-surface2 grid grid-cols-3 gap-1 rounded-xl border p-1"
        >
          {TABS.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                tab === i
                  ? "from-purple to-cyan bg-gradient-to-r font-semibold text-[#0a0a0c]"
                  : "text-ink-dim hover:text-white",
              )}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
        <div className="mt-4">{cards[tab]}</div>
      </div>
    </>
  );
}
