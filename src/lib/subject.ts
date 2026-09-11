/**
 * Subject rules per niche.
 *
 * "Faceless" constraints (hidden face, cropped head, anonymous silhouette,
 * "visible face" in the negative prompt) only make sense when the on-screen
 * subject is a real human. Applying them to animals, objects, vehicles or
 * illustrated characters produces mutated, faceless creatures.
 */

export type SubjectKind = "human" | "animal" | "object" | "illustrated";

const SUBJECT_BY_NICHE: Record<string, SubjectKind> = {
  "AI Cat & Pet Stories": "animal",
  "AI Animal Cooking": "animal",
  "POV Immersive Vlogs": "human",
  "Anime Fight Versus": "illustrated",
  "Stickman Explainer & Skits": "illustrated",
  "AI ASMR (Cooking, Cleaning, Restoration)": "object",
  "Zombie Apocalypse Drama": "human",
  "Bible & Mythology Anime": "illustrated",
  "AI Influencer Product Reviews": "illustrated",
  "Lullaby & Sleep Music": "object",
  "Analog Horror & Unsolved Mysteries": "human",
  "DIY Cardboard & Miniature Builds": "object",
  "Vegetable & Fruit Carving": "object",
  "AI Car Wash & Restoration": "object",
  "Miniature ASMR Cooking": "object",
  "Nostalgia Toy Unboxing": "object",
  "Ranking & Top 5 Countdowns": "object",
  "Vox-Style Paper-Cut Commentary": "illustrated",
  "Elderly Wisdom & Stoic Long-Form": "human",
  "AI Music Videos": "illustrated",
  "Cartoon Horror Illustration": "illustrated",
  "Pixel Game POV": "illustrated",
  "Celebrity Evolution & Glow-Up": "illustrated",
  "Poor vs. Rich Animals (AI Skits)": "animal",
};

const ANIMAL_HINTS = /\b(cat|kitten|dog|puppy|pet|animal|bird|fox|horse|panda|lion|tiger)\b/i;
const OBJECT_HINTS = /\b(car|vehicle|truck|toy|product|object|food|kitchen|miniature|build)\b/i;

export function getSubjectKind(niche: string): SubjectKind {
  const known = SUBJECT_BY_NICHE[niche];
  if (known) return known;
  if (ANIMAL_HINTS.test(niche)) return "animal";
  if (OBJECT_HINTS.test(niche)) return "object";
  return "human";
}

export function isHumanSubject(niche: string): boolean {
  return getSubjectKind(niche) === "human";
}

/** Framing clause for image prompts — faceless only when the subject is human. */
export function subjectFramingClause(niche: string): string {
  switch (getSubjectKind(niche)) {
    case "human":
      return "faceless framing, face never visible — head cropped or hidden in shadow, hands and posture in sharp focus";
    case "animal":
      return "full expressive animal subject, complete anatomy, natural face and eyes clearly visible, correct number of limbs";
    case "object":
      return "hero product framing, full object in frame, crisp surface texture and material detail";
    default:
      return "stylised character fully rendered, expressive face and clean linework, complete anatomy";
  }
}

/** Short subject prefix used before the archetype noun. */
export function subjectPrefix(niche: string): string {
  return isHumanSubject(niche) ? "faceless " : "";
}

/** Negative-prompt list; only humans exclude "visible face". */
export function negativePromptFor(niche: string): string {
  const kind = getSubjectKind(niche);
  const base = "blurry, lowres, text, watermark, logo, oversaturated";
  if (kind === "human") return `${base}, deformed hands, extra fingers, visible face`;
  if (kind === "animal") return `${base}, deformed anatomy, extra limbs, missing face, mutated features`;
  if (kind === "object") return `${base}, warped geometry, melted edges, duplicated objects`;
  return `${base}, broken anatomy, extra limbs, distorted face`;
}

/** Midjourney --no list for this niche. */
export function midjourneyNegativeFor(niche: string): string {
  const kind = getSubjectKind(niche);
  if (kind === "human") return "blurry, lowres, visible face, text, watermark, extra limbs";
  if (kind === "animal") return "blurry, lowres, deformed anatomy, mutated face, text, watermark, extra limbs";
  if (kind === "object") return "blurry, lowres, warped geometry, text, watermark, duplicate objects";
  return "blurry, lowres, distorted anatomy, text, watermark, extra limbs";
}

/** Rule text handed to the model so it applies the same logic. */
export function subjectRule(niche: string): string {
  const kind = getSubjectKind(niche);
  if (kind === "human") {
    return `SUBJECT: this niche has a HUMAN subject. Keep the face hidden (cropped, shadowed or turned away) and include "visible face" in negativePrompt.`;
  }
  const label =
    kind === "animal" ? "an ANIMAL" : kind === "object" ? "an OBJECT/VEHICLE/FOOD" : "an ILLUSTRATED character";
  return `SUBJECT: this niche's subject is ${label}, NOT a human. NEVER use the words faceless, anonymous silhouette, head cropped, hidden face or no visible face anywhere. NEVER put "visible face" in negativePrompt. Render the subject complete with correct anatomy and a natural, clearly visible face where one exists.`;
}
