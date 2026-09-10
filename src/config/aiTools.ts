import type { ProductionPackage } from "@/lib/generator";

export type EngineCategory = "image" | "video" | "audio";

export interface AiTool {
  id: string;
  name: string;
  category: EngineCategory;
  blurb: string;
  /** TODO: replace with your real affiliate / referral link. */
  url: string;
  build: (pkg: ProductionPackage) => string;
}

const shots = (pkg: ProductionPackage) =>
  pkg.camera.shots
    .map((s) => `${s.timecode} — ${s.motion}; ${s.transition}; ${s.animationCue}`)
    .join("\n");

const subject = (pkg: ProductionPackage) =>
  `${pkg.character.archetype}, ${pkg.character.physicalDescription}`;

const style = (pkg: ProductionPackage) => pkg.visual.styleDNA.join(", ");

export const AI_TOOLS: AiTool[] = [
  {
    id: "midjourney",
    name: "Midjourney v6",
    category: "image",
    blurb: "Best-in-class stylised stills with strong character consistency.",
    url: "https://example.com/midjourney",
    build: (pkg) =>
      `${pkg.visual.midjourneyPrompt} --v 6 --style raw --ar ${pkg.visual.aspectRatio} --s ${pkg.visual.stylize} --c ${pkg.visual.chaos} --seed ${pkg.visual.seedValue} --no ${pkg.visual.negativePrompt}`,
  },
  {
    id: "leonardo",
    name: "Leonardo.ai",
    category: "image",
    blurb: "Fast batch generation with reusable character references.",
    url: "https://example.com/leonardo",
    build: (pkg) =>
      [
        `Prompt: ${pkg.visual.leonardoPrompt}`,
        `Negative prompt: ${pkg.visual.negativePrompt}`,
        `Model: ${pkg.visual.model} | Preset: Cinematic | Alchemy: On | PhotoReal: On`,
        `Aspect ratio: ${pkg.visual.aspectRatio} | Guidance: 7 | Seed: ${pkg.visual.seedValue}`,
        `Character reference token: ${pkg.visual.consistencyToken}`,
      ].join("\n"),
  },
  {
    id: "flux",
    name: "Flux.1",
    category: "image",
    blurb: "Sharp prompt adherence and clean text rendering.",
    url: "https://example.com/flux",
    build: (pkg) =>
      [
        `${subject(pkg)}. ${style(pkg)}. ${pkg.visual.leonardoPrompt}`,
        ``,
        `guidance_scale: 3.5 | steps: 28 | width x height: ${pkg.visual.resolution} | seed: ${pkg.visual.seedValue}`,
        `avoid: ${pkg.visual.negativePrompt}`,
      ].join("\n"),
  },
  {
    id: "imagen",
    name: "Google Imagen / ImageFX",
    category: "image",
    blurb: "Photoreal lighting and natural-language prompting.",
    url: "https://example.com/imagefx",
    build: (pkg) =>
      [
        `A ${pkg.visual.aspectRatio} cinematic frame of ${subject(pkg)}.`,
        `Lighting and finish: ${style(pkg)}.`,
        `Scene: ${pkg.visual.leonardoPrompt}`,
        `Do not include: ${pkg.visual.negativePrompt}.`,
      ].join("\n"),
  },
  {
    id: "runway",
    name: "Runway Gen-3",
    category: "video",
    blurb: "Image-to-video with precise camera motion control.",
    url: "https://example.com/runway",
    build: (pkg) =>
      [
        `[camera] ${pkg.camera.overview["Camera Style"] ?? "cinematic handheld"}`,
        `[subject] ${subject(pkg)}`,
        `[motion] ${pkg.camera.shots[0]?.motion ?? "slow dolly in"}, continuous, no cuts`,
        `[style] ${style(pkg)}`,
        `[duration] 10s | [ratio] ${pkg.visual.aspectRatio}`,
        ``,
        `Shot sequence:\n${shots(pkg)}`,
      ].join("\n"),
  },
  {
    id: "kling",
    name: "Kling AI",
    category: "video",
    blurb: "Long-duration clips with strong physical motion.",
    url: "https://example.com/kling",
    build: (pkg) =>
      [
        `Prompt: ${subject(pkg)} — ${pkg.camera.shots[0]?.animationCue ?? "subtle idle motion"}. ${style(pkg)}.`,
        `Negative prompt: ${pkg.visual.negativePrompt}`,
        `Mode: Professional | Duration: 10s | Creativity: 0.5 | Ratio: ${pkg.visual.aspectRatio}`,
        `Camera movement: ${pkg.camera.shots[1]?.motion ?? "push in"}`,
      ].join("\n"),
  },
  {
    id: "luma",
    name: "Luma Dream Machine",
    category: "video",
    blurb: "Natural, physics-aware motion from a single frame.",
    url: "https://example.com/luma",
    build: (pkg) =>
      [
        `${subject(pkg)}. ${pkg.camera.shots[0]?.motion ?? "slow push in"}, ${style(pkg)}.`,
        `Keep the character identical between keyframes (token ${pkg.visual.consistencyToken}).`,
        `Loop: off | Enhance prompt: off | Ratio: ${pkg.visual.aspectRatio}`,
      ].join("\n"),
  },
  {
    id: "veo",
    name: "Google Veo",
    category: "video",
    blurb: "Cinematic shots with synced ambience and dialogue.",
    url: "https://example.com/veo",
    build: (pkg) =>
      [
        pkg.visual.googleFlowPrompt,
        ``,
        `Audio: ${pkg.camera.soundDesign.join("; ")}`,
        `Shot list:\n${shots(pkg)}`,
      ].join("\n"),
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "audio",
    blurb: "Voice cloning and narration with emotion tags.",
    url: "https://example.com/elevenlabs",
    build: (pkg) => {
      const v = pkg.character.voiceSpec;
      const specs = Object.entries(v)
        .map(([k, val]) => `${k}: ${val}`)
        .join("\n");
      const script = pkg.character.cueSheet.map((c) => `[${c.cue}] ${c.line}`).join("\n\n");
      return [
        `VOICE SETTINGS\n${specs}`,
        `Stability: 45% | Similarity: 80% | Style exaggeration: 25% | Speaker boost: on`,
        ``,
        `TAGGED SCRIPT\n${script}`,
      ].join("\n");
    },
  },
];

export const ENGINE_GROUPS: { key: EngineCategory; label: string }[] = [
  { key: "image", label: "Image Generators" },
  { key: "video", label: "Video Animators" },
  { key: "audio", label: "Voice & Audio" },
];
