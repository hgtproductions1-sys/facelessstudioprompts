import { createFileRoute } from "@tanstack/react-router";
import { generatePackage, hashSeed, type ProductionPackage } from "@/lib/generator";

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
  return {
    ...fallbackPackage(niche, topic),
    ...p,
    niche,
    topic,
    seed: hashSeed(`${niche}::${topic}`),
    generatedAt: new Date().toISOString(),
  } as ProductionPackage;
}

async function generateWithGlm(niche: string, topic: string, apiKey: string): Promise<ProductionPackage | null> {
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
        temperature: 0.8,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a faceless-video production engine. Return ONLY valid JSON matching the ProductionPackage shape (character, visual, camera sections). No markdown, no code fences, no commentary.",
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
        const topic = typeof body.topic === "string" ? body.topic.trim() : "";
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
