import { motion } from "framer-motion";
import type { ProductionPackage } from "@/lib/generator";
import { CharacterCard } from "./CharacterCard";
import { VisualCard } from "./VisualCard";
import { CameraCard } from "./CameraCard";
import { VariationCard } from "./VariationCard";

export function StepPanels({ pkg }: { pkg: ProductionPackage }) {
  const cards = [
    <CharacterCard key="s1" pkg={pkg} />,
    <VisualCard key="s2" pkg={pkg} />,
    <CameraCard key="s3" pkg={pkg} />,
    <VariationCard key="s4" pkg={pkg} />,
  ];

  return (
    <div className="mx-auto mt-6 grid max-w-[1600px] grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className="h-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.12 }}
        >
          {card}
        </motion.div>
      ))}
    </div>
  );
}
