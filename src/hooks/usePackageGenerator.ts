import { useCallback, useEffect, useRef, useState } from "react";
import { generatePackage, hashSeed, type ProductionPackage } from "@/lib/generator";

export const LOADING_STEPS = [
  "Analyzing niche archetypes",
  "Building character profile",
  "Rendering style prompts",
  "Mapping camera motion",
];

const TOTAL_MS = 2400;

export function usePackageGenerator() {
  const [pkg, setPkg] = useState<ProductionPackage | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const run = useCallback((niche: string, topic: string, seed?: number) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLoading(true);
    setStep(0);
    [600, 1200, 1800].forEach((ms, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), ms));
    });
    timers.current.push(
      setTimeout(() => {
        setPkg(generatePackage({ niche, topic, seed: seed ?? hashSeed(`${niche}::${topic}`) }));
        setStep(LOADING_STEPS.length);
        setLoading(false);
      }, TOTAL_MS),
    );
  }, []);

  const regenerate = useCallback(() => {
    if (!pkg) return;
    run(pkg.niche, pkg.topic, pkg.seed + 7919);
  }, [pkg, run]);

  return { pkg, loading, step, run, regenerate, totalMs: TOTAL_MS };
}
