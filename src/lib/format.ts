import type { ProductionPackage } from "@/lib/generator";

/**
 * Builds a clean, plain-text blueprint document from a production package.
 */
export function buildBlueprintText(pkg: ProductionPackage): string {
  const c = pkg.character;
  const v = pkg.visual;
  const cam = pkg.camera;
  const line = "=".repeat(60);
  const date = new Date(pkg.generatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const prompt1 = [
    c.physicalDescription,
    "",
    "Wardrobe & props:",
    ...c.wardrobe.map((w) => `- ${w}`),
    "",
    "Voice & delivery:",
    ...Object.entries(c.voiceSpec).map(([k, val]) => `- ${k}: ${val}`),
    "",
    "Opening hook:",
    c.hooks[0]?.text ?? "",
  ].join("\n");

  const prompt2 = [
    v.leonardoPrompt,
    "",
    v.midjourneyPrompt,
    "",
    "Google Flow (Veo 3):",
    v.googleFlowPrompt,
  ].join("\n");

  const prompt3 = cam.shots
    .map((sh) => `${String(sh.index).padStart(2, "0")} | ${sh.timecode}\n${sh.prompt}`)
    .join("\n\n");

  const editPoints = cam.shots
    .map((sh) => `${String(sh.index).padStart(2, "0")} | ${sh.transition} | ${sh.animationCue}`)
    .join("\n");

  return [
    line,
    "",
    "FACELESS VIDEO BLUEPRINT",
    "",
    `Niche: ${pkg.niche}`,
    `Topic: ${pkg.topic}`,
    `Generated: ${date}`,
    "",
    line,
    "",
    "── COPY-PASTE PROMPT #1: CHARACTER + VOICEOVER ──",
    "",
    prompt1,
    "",
    "── COPY-PASTE PROMPT #2: VISUAL STYLE ──",
    "",
    prompt2,
    "",
    "── COPY-PASTE PROMPT #3: CAMERA MOTION ──",
    "",
    prompt3,
    "",
    "── DETAILED REFERENCE ──",
    "",
    "[CHARACTER]",
    `Archetype: ${c.archetype}`,
    `Tone: ${c.toneTags.join(", ")}`,
    `Voice Spec: ${Object.entries(c.voiceSpec)
      .map(([k, val]) => `${k} ${val}`)
      .join(", ")}`,
    c.hooks.map((h) => `${h.label}: ${h.text}`).join("\n"),
    "",
    "VO Cue Sheet (ElevenLabs v3 tags only):",
    c.cueSheet.map((r) => `${r.timestamp} | ${r.cue} ${r.line}`).join("\n"),
    "",
    "[VISUAL]",
    `Style DNA: ${v.styleDNA.join(", ")}`,
    `Aspect Ratio: ${v.aspectRatio}`,
    `Model / Flags: ${v.model} · stylize ${v.stylize} · chaos ${v.chaos} · seed ${v.seedValue}`,
    `Negative Prompt: ${v.negativePrompt}`,
    "",
    "[CAMERA]",
    `Overview: ${Object.entries(cam.overview)
      .map(([k, val]) => `${k}: ${val}`)
      .join(" · ")}`,
    "",
    "Shot List (engine-ready):",
    prompt3,
    "",
    "Edit Points & Animation Cues (NLE only):",
    editPoints,
    "",
    "[SOUND DESIGN & MUSIC CUES]",
    cam.soundDesign.map((sd) => `- ${sd}`).join("\n"),
    "",
    "[END OF BLUEPRINT]",
    "",
  ].join("\n");
}
