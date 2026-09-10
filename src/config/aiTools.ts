import type { ProductionPackage } from "@/lib/generator";
import { buildParagraph, sanitizeMidjourneyPrompt, stripPromptFlags } from "@/lib/prompt-sanitize";

export type EngineCategory = "image" | "video" | "audio";

export interface AiTool {
  id: string;
  name: string;
  category: EngineCategory;
  blurb: string;
  /** Official destination; swap in a tracking link once the program approves. */
  url: string;
  build: (pkg: ProductionPackage) => string;
}

const shots = (pkg: ProductionPackage) =>
  pkg.camera.shots.map((s) => `${s.timecode} — ${s.prompt}`).join("\n");

const subject = (pkg: ProductionPackage) =>
  `${pkg.character.archetype}, ${pkg.character.physicalDescription}`;

const style = (pkg: ProductionPackage) => pkg.visual.styleDNA.join(", ");

export const AI_TOOLS: AiTool[] = [
  {
    id: "midjourney",
    name: "Midjourney v6",
    category: "image",
    blurb: "Best-in-class stylised stills with strong character consistency.",
    url: "https://www.midjourney.com",
    build: (pkg) => sanitizeMidjourneyPrompt(pkg.visual.midjourneyPrompt, pkg.visual.seedValue),
  },
  {
    id: "leonardo",
    name: "Leonardo.ai",
    category: "image",
    blurb: "Fast batch generation with reusable character references.",
    url: "https://leonardo.ai",
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
    url: "https://blackforestlabs.ai",
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
    url: "https://labs.google/fx/tools/image-fx",
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
    url: "https://runwayml.com",
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
    url: "https://klingai.com",
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
    url: "https://lumalabs.ai/dream-machine",
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
    url: "https://labs.google/fx/tools/flow",
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
    url: "https://try.elevenlabs.io/la852vd4qv68",
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
