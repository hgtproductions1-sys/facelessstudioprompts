import { createFileRoute } from "@tanstack/react-router";
import { generatePackage, hashSeed, type ProductionPackage } from "@/lib/generator";
import { getTopPromptsForNiche } from "@/data/promptLibrary";
import {
  buildShotPrompt,
  clampWords,
  dedupePhrases,
  extractMixDirective,
  sanitizeMidjourneyPrompt,
  sanitizeTopic,
  stripPromptFlags,
  toElevenLabsCue,
} from "@/lib/prompt-sanitize";

const GLM_ENDPOINT = "https://api.hcnsec.cn/v1/chat/completions";
const GLM_MODEL = "glm-5.3-flash";
const TIMEOUT_MS = 60_000;

const SCHEMA_SHAPE = `{
  "niche": string,
  "topic": string,
  "character": {
    "archetype": string,
    "consistencyScore": number (85-99),
    "toneTags": string[3],
    "physicalDescription": string,
    "wardrobe": string[4],
    "voiceSpec": { "Voice Type": string, "Pace (WPM)": string, "Pitch": string, "Accent": string, "Emotional Register": string, "Signature Pause": string },
    "hooks": [{ "label": string, "text": string }] (3 items),
    "cueSheet": [{ "timestamp": string, "line": string, "cue": string }] (6 items),
    "retentionBeats": string[4]
  },
  "visual": {
    "styleDNA": string[5],
    "aspectRatio": "9:16",
    "resolution": string,
    "model": string,
    "stylize": number,
    "chaos": number,
    "seedValue": number,
    "negativePrompt": string,
    "leonardoPrompt": string,
    "midjourneyPrompt": string,
    "googleFlowPrompt": string,
    "consistencyToken": string,
    "negativeLibrary": string[5]
  },
  "camera": {
    "overview": { "Shot Count": string, "Avg Shot Length": string, "Pacing Arc": string, "Transition Style": string },
    "shots": [{ "index": number, "timecode": string, "motion": string, "transition": string, "animationCue": string }] (8 items),
    "rigCheatSheet": string[4],
    "soundDesign": string[3]
  }
}`;

function fallbackPackage(niche: string, topic: string): ProductionPackage {
  return generatePackage({ niche, topic, seed: hashSeed(`${niche}::${topic}`) });
}

function normalizePackage(raw: unknown, niche: string, topic: string): ProductionPackage | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  if (!p["character"] || !p["visual"] || !p["camera"]) return null;
  const merged = {
    ...fallbackPackage(niche, topic),
    ...p,
    niche,
    topic,
    seed: hashSeed(`${niche}::${topic}`),
    generatedAt: new Date().toISOString(),
  } as ProductionPackage;

  return sanitizePackage(merged);
}

/** Applies the shared sanitisation rules to any package (local or model-generated). */
function sanitizePackage(pkg: ProductionPackage): ProductionPackage {
  const seed = pkg.visual.seedValue || pkg.seed;
  const mixCues: string[] = [];

  const cueSheet = (pkg.character.cueSheet ?? []).map((r) => {
    const mix = extractMixDirective(r.cue ?? "");
    if (mix) mixCues.push(`${r.timestamp} — ${mix}`);
    return {
      timestamp: r.timestamp,
      line: dedupePhrases(r.line ?? ""),
      cue: toElevenLabsCue(r.cue ?? ""),
    };
  });

  const shots = (pkg.camera.shots ?? []).map((s, i) => ({
    ...s,
    prompt: buildShotPrompt({
      motion: s.motion ?? "slow push in",
      subjectAction: dedupePhrases(
        `faceless ${pkg.character.archetype.toLowerCase().replace(/^the /, "")}, ${s.animationCue ?? ""}`,
      ),
      environmentLighting: clampWords(pkg.visual.styleDNA.join(", "), 20),
      motionStrength: 3 + (i % 2),
    }),
  }));

  return {
    ...pkg,
    topic: sanitizeTopic(pkg.topic),
    character: {
      ...pkg.character,
      hooks: (pkg.character.hooks ?? []).map((h) => ({
        label: h.label,
        text: dedupePhrases(h.text ?? ""),
      })),
      cueSheet,
    },
    visual: {
      ...pkg.visual,
      leonardoPrompt: clampWords(stripPromptFlags(pkg.visual.leonardoPrompt ?? ""), 100),
      midjourneyPrompt: sanitizeMidjourneyPrompt(pkg.visual.midjourneyPrompt ?? "", seed),
      googleFlowPrompt: clampWords(stripPromptFlags(pkg.visual.googleFlowPrompt ?? ""), 100),
    },
    camera: {
      ...pkg.camera,
      shots,
      soundDesign: [...(pkg.camera.soundDesign ?? []), ...mixCues],
    },
  };
}

async function generateWithGlm(
  niche: string,
  topic: string,
  apiKey: string,
): Promise<ProductionPackage | null> {
  const references = getTopPromptsForNiche(niche, 3)
    .map((p, i) => `${i + 1}. "${p.title}"${p.niche ? ` (${p.niche})` : ""}:\n${p.prompt}`)
    .join("\n\n");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(GLM_ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GLM_MODEL,
        temperature: 0.6,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: [
              "You are a senior faceless-video producer for TikTok/Shorts/Reels. Return ONLY valid JSON matching the ProductionPackage shape (character, visual, camera). No markdown, no code fences, no commentary.",
              `Reference style examples from successful creators:\n${references}`,
              "Match the structure, tone, and specificity of these reference examples when generating the production package. Be equally detailed and concrete — no generic filler.",
              "Every field must be concrete and shoot-ready, specific to the given niche and topic — never generic filler.",
              "Rules: physicalDescription and wardrobe must be precise enough to redraw the same character every time (fabrics, colors, props, silhouette).",
              "hooks must be scroll-stopping spoken lines under 12 words with clean grammar; never repeat a phrase already present in the sentence.",
              "cueSheet lines are natural spoken dialogue only. The cue field may contain ONLY ElevenLabs v3 delivery tags such as [whisper], [pause], [sigh], [firm], [drawn out], [excited]. Never put music, mixing, bed-track, dB, BPM or microphone directions in cueSheet — those belong in camera.soundDesign.",
              "leonardoPrompt, midjourneyPrompt and googleFlowPrompt must each be ONE concise coherent paragraph of 80-100 words combining subject, environment, lighting and camera. Never repeat the same descriptive block twice.",
              "midjourneyPrompt must contain no --flags at all; flags are appended by the app.",
              "googleFlowPrompt must be a Google Flow (Veo 3) text-to-video scene prompt: one shot, vertical 9:16.",
              "Each camera shot's motion must be pure camera movement with no editing transitions (no dissolve, whip-pan, hard cut, frames counts) inside it; put those only in the transition field.",
              "Face never visible in any prompt.",
            ].join(" "),
          },
          {
            role: "user",
            content: `Niche: ${niche}\nTopic: ${topic}\n\nReturn a single JSON object matching exactly this shape:\n${SCHEMA_SHAPE}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      console.warn(`[generate] GLM responded with HTTP ${res.status}`);
      return null;
    }
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.warn("[generate] GLM response had no message content");
      return null;
    }
    return normalizePackage(JSON.parse(content), niche, topic);
  } catch (err) {
    console.warn(`[generate] GLM call failed: ${err instanceof Error ? err.name : "unknown"}`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { niche?: unknown; topic?: unknown };
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }
        const niche = typeof body.niche === "string" ? body.niche.trim() : "";
        const topic = typeof body.topic === "string" ? sanitizeTopic(body.topic) : "";
        if (!niche || !topic || niche.length > 200 || topic.length > 300) {
          return Response.json({ error: "niche and topic are required" }, { status: 400 });
        }

        const apiKey = process.env["GLM_API_KEY"];
        if (!apiKey) console.warn("[generate] GLM_API_KEY is not set");
        const pkg = apiKey ? await generateWithGlm(niche, topic, apiKey) : null;
        const result = pkg ?? fallbackPackage(niche, topic);
        return Response.json({ package: result, source: pkg ? "glm" : "local" });
      },
    },
  },
});
