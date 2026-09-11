import type { ProductionPackage } from "@/lib/generator";

/**
 * Builds a clean, plain-text blueprint document from a production package.
 */
export function buildBlueprintText(pkg: ProductionPackage): string {
  const c = pkg.character;
  const v = pkg.visual;
  const cam = pkg.camera;
  const variation = pkg.variation;
  const line = "=".repeat(60);
  const date = new Date(pkg.generatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const prompt1 = [
    "Voice & delivery:",
    ...Object.entries(c.voiceSpec).map(([k, val]) => `- ${k}: ${val}`),
    "",
    "Opening hook:",
    c.hooks[0]?.text ?? "",
  ].join("\n");

  const prompt2 = [
    v.masterPrompt || v.leonardoPrompt,
    "",
    "Negative prompt:",
    v.negativePrompt,
  ].join("\n");

  const prompt3 = cam.shots
    .map((sh) => `${String(sh.index).padStart(2, "0")}\n${sh.prompt}`)
    .join("\n\n");

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
    "── STEP 1: SCRIPT & VOICEOVER ──",
    "",
    prompt1,
    "",
    "VO Cue Sheet (ElevenLabs v3 tags only):",
    c.cueSheet.map((r) => `${r.timestamp} | ${r.cue} ${r.line}`).join("\n"),
    "",
    "Retention beats:",
    c.retentionBeats.map((b) => `- ${b}`).join("\n"),
    "",
    "── STEP 2: MASTER IMAGE PROMPT ──",
    "",
    prompt2,
    "",
    "── STEP 3: VIDEO GENERATION PROMPTS ──",
    "",
    prompt3,
    "",
    "[SOUND DESIGN & MUSIC CUES]",
    cam.soundDesign.map((sd) => `- ${sd}`).join("\n"),
    "",
    "── STEP 4: VARIATION & ANTI-GENERIC PLAN ──",
    "",
    "COPY-PASTE PROMPT",
    variation.copyPastePrompt,
    "",
    `Hook Style: ${variation.hookStyle}`,
    `Story Structure: ${variation.storyStructure}`,
    `Pacing Profile: ${variation.pacingProfile}`,
    `Editing Style: ${variation.editingStyle}`,
    `Emotional Tone: ${variation.emotionalTone}`,
    "",
    "[END OF BLUEPRINT]",
    "",
  ].join("\n");
}
