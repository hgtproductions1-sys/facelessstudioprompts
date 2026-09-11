import { useCallback, useEffect, useRef, useState } from "react";
import { generatePackage, hashSeed, type ProductionPackage } from "@/lib/generator";
import type { StyleSelection } from "@/lib/styleOptions";

export const LOADING_STEPS = [
  "Analyzing niche archetypes",
  "Writing the voiceover script",
  "Rendering the master image prompt",
  "Mapping camera motion",
];

const TOTAL_MS = 2400;

async function fetchPackage(
  niche: string,
  topic: string,
  style: StyleSelection,
  seed: number,
): Promise<ProductionPackage | null> {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche, topic, seed, ...style }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { package?: ProductionPackage };
    return data.package ?? null;
  } catch {
    return null;
  }
}

export function usePackageGenerator() {
  const [pkg, setPkg] = useState<ProductionPackage | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [slow, setSlow] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastStyle = useRef<StyleSelection>({});

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const run = useCallback(
    (niche: string, topic: string, style: StyleSelection = {}, seed?: number) => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      lastStyle.current = style;
      setLoading(true);
      setStep(0);
      setSlow(false);
      [600, 1200, 1800].forEach((ms, i) => {
        timers.current.push(setTimeout(() => setStep(i + 1), ms));
      });

      const resolvedSeed = seed ?? hashSeed(`${niche}::${topic}`);
      const request = fetchPackage(niche, topic, style, resolvedSeed);

      timers.current.push(
        setTimeout(() => {
          setSlow(true);
          void request.then((remote) => {
            setPkg(remote ?? generatePackage({ niche, topic, seed: resolvedSeed, style }));
            setStep(LOADING_STEPS.length);
            setSlow(false);
            setLoading(false);
          });
        }, TOTAL_MS),
      );
    },
    [],
  );

  const regenerate = useCallback(() => {
    if (!pkg) return;
    run(pkg.niche, pkg.topic, lastStyle.current, pkg.seed + 7919);
  }, [pkg, run]);

  return { pkg, loading, step, slow, run, regenerate, totalMs: TOTAL_MS };
}
