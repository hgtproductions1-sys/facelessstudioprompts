/**
 * Shared sanitisation helpers for the prompt generation engine.
 * Keeps generated copy free of duplicated phrases, duplicated Midjourney
 * flags, and mixes engine-ready syntax for video tools.
 */

const LEAD_FILLERS =
  /^(?:please\s+|make\s+(?:me\s+)?(?:a\s+)?(?:video\s+about\s+)?|create\s+(?:a\s+)?(?:video\s+about\s+)?|generate\s+(?:a\s+)?|build\s+(?:a\s+)?|show\s+me\s+(?:a\s+)?|do\s+(?:a\s+)?|a\s+video\s+about\s+|video\s+about\s+|how\s+to\s+)/i;

const SMALL_WORDS = new Set([
  "a",
  "an",
  "the",
  "of",
  "in",
  "on",
  "at",
  "with",
  "and",
  "to",
  "for",
  "this",
  "that",
  "his",
  "her",
  "its",
  "their",
]);

/** Collapses immediately repeated word groups: "bear cooks bear cooks ramen" → "bear cooks ramen". */
export function dedupePhrases(input: string): string {
  let out = (input ?? "").replace(/\s+/g, " ").trim();
  for (let n = 6; n >= 1; n--) {
    const re = new RegExp(`\\b((?:[\\w'-]+\\s+){${n - 1}}[\\w'-]+)(?:\\s+\\1\\b)+`, "gi");
    out = out.replace(re, "$1");
  }
  return out.replace(/\s{2,}/g, " ").trim();
}

/** Normalises raw user topic input: trims filler verbs, punctuation and repeats. */
export function sanitizeTopic(raw: string): string {
  let t = (raw ?? "").replace(/\s+/g, " ").trim();
  t = t.replace(LEAD_FILLERS, "");
  t = t.replace(/[.!?,;:\s]+$/, "");
  t = dedupePhrases(t);
  return t.trim();
}

function normalizeWord(w: string): string {
  return w.toLowerCase().replace(/[^a-z0-9']/g, "");
}

function stem(w: string): string {
  return w.replace(/(?:es|s|ing|ed)$/, "");
}

/**
 * Removes words from the start of `topic` that the sentence before `{topic}`
 * already says, so templates never read "This bear cooks bear cooks ramen".
 */
const ACTION_VERBS = new Set([
  "cook",
  "make",
  "build",
  "craft",
  "bake",
  "fight",
  "review",
  "clean",
  "restore",
  "unbox",
  "explain",
  "rank",
  "sing",
  "play",
  "eat",
  "try",
  "test",
  "carve",
  "wash",
  "paint",
  "draw",
  "tell",
  "survive",
]);

/**
 * Reduces a topic to its object phrase so sentences that already contain the
 * subject and verb don't repeat them: "bear cooks campfire ramen" → "campfire ramen".
 */
export function topicPhrase(topic: string): string {
  const words = sanitizeTopic(topic).split(" ").filter(Boolean);
  if (words.length >= 3) {
    const second = stem(normalizeWord(words[1] ?? ""));
    if (ACTION_VERBS.has(second)) return words.slice(2).join(" ");
  }
  const first = stem(normalizeWord(words[0] ?? ""));
  if (words.length >= 2 && ACTION_VERBS.has(first)) return words.slice(1).join(" ");
  return words.join(" ");
}

export function fitTopicToTemplate(template: string, topic: string): string {
  const before = template.split("{topic}")[0] ?? "";
  const ctx = new Set(
    (before.toLowerCase().match(/[a-z0-9']+/g) ?? []).flatMap((w) => [w, stem(w)]),
  );
  const words = topicPhrase(topic).split(" ").filter(Boolean);
  let i = 0;
  while (i < words.length - 1) {
    const w = normalizeWord(words[i] ?? "");
    if (!w) {
      i++;
      continue;
    }
    if (ctx.has(w) || ctx.has(stem(w)) || (i === 0 && SMALL_WORDS.has(w))) i++;
    else break;
  }
  const trimmed = words.slice(i).join(" ").trim();
  return trimmed || words.join(" ");
}

/** Fills a `{topic}` template with clean grammar and no duplicated phrases. */
export function renderTemplate(template: string, topic: string): string {
  const filled = template.replace("{topic}", fitTopicToTemplate(template, topic));
  const clean = dedupePhrases(filled);
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

/** Removes every `--flag value` segment from a prompt string. */
export function stripPromptFlags(prompt: string): string {
  const cut = (prompt ?? "").split(/\s+--[a-z]/i)[0] ?? "";
  return cut.replace(/[\s,;:.]+$/, "").trim();
}

/**
 * Strips markdown syntax so copied prompts are pure raw text:
 * code fences, bold/italic markers, headings, list bullets and link syntax.
 */
export function stripMarkdown(text: string): string {
  return (text ?? "")
    .replace(/```[a-z]*\n?/gi, "")
    .replace(/```/g, "")
    .replace(/`+/g, "")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s{0,3}[-*+]\s+/gm, "")
    .replace(/^\s{0,3}\d+[.)]\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1$2")
    .replace(/(^|[^_])_([^_\n]+)_/g, "$1$2")
    .replace(/^\s*[-*_]{3,}\s*$/gm, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Markdown-free single-line text (for prompts that must be one paragraph). */
export function toRawLine(text: string): string {
  return stripMarkdown(text).replace(/\s*\n+\s*/g, " ").replace(/\s{2,}/g, " ").trim();
}

export const MJ_NEGATIVE = "blurry, lowres, visible face, text, watermark, extra limbs";

/** Rebuilds a Midjourney prompt with exactly one canonical set of flags. */
export function sanitizeMidjourneyPrompt(
  prompt: string,
  seed: number,
  aspect = "9:16",
  negative: string = MJ_NEGATIVE,
): string {
  const body = dedupePhrases(stripPromptFlags(toRawLine(prompt)));
  const flags = [
    `--ar ${aspect}`,
    "--v 6.1",
    "--style raw",
    "--stylize 250",
    "--chaos 12",
    `--seed ${Math.abs(Math.trunc(seed)) || 1}`,
    `--no ${negative}`,
  ].join(" ");
  return `${body} ${flags}`.replace(/\s{2,}/g, " ").trim();
}

/** Trims a paragraph to a maximum word count without cutting mid-sentence badly. */
export function clampWords(text: string, max = 95): string {
  const clean = dedupePhrases(toRawLine(text))
    .replace(/\s{2,}/g, " ")
    .trim();
  const words = clean.split(" ");
  if (words.length <= max) return clean;
  return `${words
    .slice(0, max)
    .join(" ")
    .replace(/[\s,;:.]+$/, "")}.`;
}

/** Joins prompt fragments into ONE coherent paragraph with no duplicated blocks. */
export function buildParagraph(parts: (string | undefined)[], max = 95): string {
  const seen = new Set<string>();
  const kept: string[] = [];
  for (const raw of parts) {
    const part = (raw ?? "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/[.,;]+$/, "");
    if (!part) continue;
    const key = part.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    kept.push(part);
  }
  return clampWords(`${kept.join(". ")}.`, max);
}

/* ---------- ElevenLabs v3 voiceover tags vs. mix directives ---------- */

const EL_TAG_RULES: { re: RegExp; tag: string }[] = [
  { re: /whisper|hushed|intimate|breathy/i, tag: "[whisper]" },
  { re: /sigh|exhale/i, tag: "[sigh]" },
  { re: /pause|hold|beat|silence|full stop/i, tag: "[pause]" },
  { re: /drawn out|slow|drag|linger/i, tag: "[drawn out]" },
  { re: /accelerate|build|urgen|lift|hype|excite|energy/i, tag: "[excited]" },
  { re: /firm|clip|dry|authorit|serious|drop pitch|forward/i, tag: "[firm]" },
  { re: /laugh|smile|grin/i, tag: "[laughs]" },
];

const MIX_TERMS =
  /bed track|no music|music (?:out|in|enters)|close-mic|mix|sfx|track enters|-?\d+db|bpm|foley|score|stinger|reverb/i;

/** True when a cue is an NLE / audio-mix instruction rather than a delivery tag. */
export function isMixDirective(cue: string): boolean {
  return MIX_TERMS.test(cue ?? "");
}

/** Converts a free-form delivery cue into ElevenLabs v3 supported bracket tags. */
export function toElevenLabsCue(cue: string): string {
  const source = (cue ?? "").replace(/[[\]]/g, " ");
  const tags: string[] = [];
  for (const { re, tag } of EL_TAG_RULES) {
    if (re.test(source) && !tags.includes(tag)) tags.push(tag);
  }
  if (!tags.length) tags.push("[pause]");
  return tags.slice(0, 2).join(" ");
}

/** Splits mix directives out of a cue and returns the sound-design text. */
export function extractMixDirective(cue: string): string | null {
  const parts = (cue ?? "")
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p && isMixDirective(p));
  return parts.length ? parts.join(", ") : null;
}

/* ---------- Engine-ready video shot syntax ---------- */

const NLE_TRANSITION =
  /(hard cut|whip[- ]?pan|match cut|luma dissolve|dissolve|cut to black|speed ramp|cross[- ]?fade|j-cut|l-cut)[^,.]*/gi;

/** Strips NLE transition language out of motion/action copy. */
export function stripTransitions(text: string): string {
  return toRawLine(text)
    .replace(NLE_TRANSITION, "")
    .replace(/\s*,\s*,/g, ",")
    .replace(/^[\s,.-]+|[\s,.-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export interface ShotPromptInput {
  motion: string;
  subjectAction: string;
  environmentLighting: string;
  motionStrength?: number;
}

/**
 * "[Camera Motion]: [Subject & Physical Action], [Environment & Lighting],
 *  continuous motion, cinematic 24fps --motion 3"
 */
export function buildShotPrompt({
  motion,
  subjectAction,
  environmentLighting,
  motionStrength = 3,
}: ShotPromptInput): string {
  const m = stripTransitions(motion).replace(/[.:,]+$/, "");
  const subject = stripTransitions(subjectAction).replace(/[.,]+$/, "");
  const env = stripTransitions(environmentLighting).replace(/[.,]+$/, "");
  const strength = Math.min(4, Math.max(3, Math.round(motionStrength)));
  return dedupePhrases(
    `${m}: ${subject}, ${env}, continuous motion, cinematic 24fps --motion ${strength}`,
  );
}
