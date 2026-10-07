import { useCallback, useEffect, useRef, useState } from "react";
import { hashSeed, type ProductionPackage } from "@/lib/generator";
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
): Promise<{ package?: ProductionPackage; source?: string; error?: string }> {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche, topic, seed, ...style }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({})) as { error?: string };
      return { error: data.error || "AI generation failed. Please try again." };
    }
    const data = (await res.json()) as { package?: ProductionPackage; source?: string };
    return data.package ? { package: data.package, source: data.source ?? "unknown" } : { error: "The AI response was incomplete. Please try again." };
  } catch {
    return { error: "Connection interrupted. Please check your connection and try again." };
  }
}

export function usePackageGenerator() {
  const [pkg, setPkg] = useState<ProductionPackage | null>(null);
  const [error, setError] = useState("");
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [slow, setSlow] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastStyle = useRef<StyleSelection>({});

  const currentResult = useRef({ pkg, source, loading });
  currentResult.current = { pkg, source, loading };
  useEffect(() => {
    const context = (document as Document & { modelContext?: {
      registerTool: (tool: { name: string; description: string; inputSchema: object;
        annotations: { readOnlyHint: boolean }; execute: (input: unknown) => unknown },
        options: { signal: AbortSignal }) => void | Promise<void>;
    } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(context.registerTool({
        name: "read_current_production_package",
        description: "Read the production package currently shown in the generator, its generation method, and loading status.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true },
        execute(input) {
          if (!input || typeof input !== "object" || Array.isArray(input) || Object.keys(input).length) {
            throw new Error("Expected an empty object.");
          }
          return currentResult.current;
        },
      }, { signal: lifecycle.signal })).catch(() => {});
    } catch { /* Browser integration is optional. */ }
    return () => lifecycle.abort();
  }, []);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const run = useCallback(
    (niche: string, topic: string, style: StyleSelection = {}, seed?: number) => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      lastStyle.current = style;
      setError("");
      setPkg(null);
      setSource(null);
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
            setPkg(remote?.package ?? null);
            setSource(remote?.source ?? null);
            if (!remote.package) setError(remote.error || "AI generation could not finish. Please try again.");
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

  return { pkg, source, error, loading, step, slow, run, regenerate, totalMs: TOTAL_MS };
}
