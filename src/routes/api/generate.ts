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
  stripMarkdown,
  stripPromptFlags,
  toElevenLabsCue,
  toRawLine,
} from "@/lib/prompt-sanitize";
import { resolveStyle, type ResolvedStyle, type StyleSelection } from "@/lib/styleOptions";
import { isHumanSubject, midjourneyNegativeFor, subjectPrefix, subjectRule } from "@/lib/subject";

const GLM_ENDPOINT = "https://api.hcnsec.cn/v1/chat/completions";
const GLM_MODEL = "glm-5.3-flash";
const TIMEOUT_MS = 60_000;

const GATEWAY_RESPONSES_ENDPOINT = "https://ai.gateway.lovable.dev/v1/responses";
const LOVABLE_MODEL = "openai/gpt-6-astra";
const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

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
    "cueSheet": [{ "timestamp": string, "line": string, "cue": string }] (exactly 5 items, 65-80 spoken words total, max 30 seconds),
    "retentionBeats": string[3]
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
    "masterPrompt": string,
    "leonardoPrompt": string,
    "midjourneyPrompt": string,
    "googleFlowPrompt": string,
    "consistencyToken": string,
    "negativeLibrary": string[5]
  },
  "camera": {
    "overview": { "Shot Count": string, "Avg Shot Length": string, "Pacing Arc": string, "Transition Style": string },
    "shots": [{ "index": number, "timecode": string, "motion": string, "transition": string, "animationCue": string }] (exactly 4 items),
    "rigCheatSheet": string[4],
    "soundDesign": string[3]
  }
}`;

const PRODUCTION_RULES = [
  "You are a senior faceless-video producer for TikTok/Shorts/Reels. Return ONLY valid JSON matching the ProductionPackage shape (character, visual, camera). No markdown, no code fences, no commentary.",
  "OUTPUT SANITISATION: every string value is pure raw plain text. Never use markdown — no asterisks, no bold, no italics, no hashtags or headings, no backticks, no code fences, no bullet characters, no numbered list prefixes. Prompts must be copy-paste ready for external engines exactly as written.",
  "Match the structure, tone, and specificity of these reference examples when generating the production package. Be equally detailed and concrete — no generic filler.",
  "Every field must be concrete and shoot-ready, specific to the given niche and topic — never generic filler.",
  "Rules: physicalDescription and wardrobe must be precise enough to redraw the same character every time (fabrics, colors, props, silhouette).",
  "hooks must be scroll-stopping spoken lines under 12 words with clean grammar; never repeat a phrase already present in the sentence.",
  "HARD LIMIT — SCRIPT LENGTH: the cueSheet is a maximum of 30 seconds of spoken audio. Return EXACTLY 5 cue rows whose spoken lines total between 65 and 80 words in all. Never write a long or multi-minute script. Timestamps must stay within 0:00 to 0:30.",
  "cueSheet lines are natural spoken dialogue only. The cue field may contain ONLY ElevenLabs v3 delivery tags such as [whisper], [pause], [sigh], [firm], [drawn out], [excited]. Never put music, mixing, bed-track, dB, BPM or microphone directions in cueSheet — those belong in camera.soundDesign.",
  "HARD LIMIT — IMAGE PROMPT: masterPrompt is the primary output and must be EXACTLY ONE dense paragraph of comma-separated visual descriptors (80-100 words). No bullet points, no line breaks, no headings, no engine names. The app appends the --ar flag. It works unchanged in Midjourney, Leonardo, Flux, Imagen or any image model and covers subject, wardrobe/prop detail, environment, lighting, lens and style.",
  "negativePrompt is a single comma-separated list of things to exclude, always including text and watermark.",
  "leonardoPrompt, midjourneyPrompt and googleFlowPrompt must each be ONE concise coherent paragraph of 80-100 words combining subject, environment, lighting and camera. Never repeat the same descriptive block twice.",
  "midjourneyPrompt must contain no --flags at all; flags are appended by the app.",
  "googleFlowPrompt must be a Google Flow (Veo 3) text-to-video scene prompt: one single shot.",
  "HARD LIMIT — SHOT COUNT: camera.shots must contain EXACTLY 4 essential shots. Never 5, 7 or 8. Each shot is exactly ONE short sentence using the strict syntax [Specific Camera Movement] + [Subject Action] + [Brief Scene Setting]. Keep the scene setting to a few words and NEVER repeat long lighting, palette or style descriptions in every shot.",
  "Each camera shot's motion must be pure camera movement with no editing transitions (no dissolve, whip-pan, hard cut, frames counts) inside it; put those only in the transition field.",
];

function fallbackPackage(niche: string, topic: string, style?: StyleSelection): ProductionPackage {
  return generatePackage({
    niche,
    topic,
    seed: hashSeed(`${niche}::${topic}`),
    ...(style ? { style } : {}),
  });
}

function referenceBlock(niche: string): string {
  return getTopPromptsForNiche(niche, 3)
    .map((p, i) => `${i + 1}. "${p.title}"${p.niche ? ` (${p.niche})` : ""}:\n${p.prompt}`)
    .join("\n\n");
}

/** Turns the user's format / vibe / pacing choices into hard model instructions. */
function styleRules(st: ResolvedStyle, niche: string): string[] {
  return [subjectRule(niche), ..._styleRules(st)];
}

function _styleRules(st: ResolvedStyle): string[] {
  return [
    `OUTPUT FORMAT: ${st.format.label}. Every image and video prompt must describe a ${st.format.orientation} ${st.format.aspectRatio} frame at ${st.format.resolution}. visual.aspectRatio must be "${st.format.aspectRatio}" and visual.resolution must be "${st.format.resolution}". Never mention any other aspect ratio.`,
    `VISUAL VIBE: ${st.vibe.label}. Lighting keywords to use: ${st.vibe.lighting}. Style keywords to use: ${st.vibe.style}. Every image prompt must clearly read as this look.`,
    `PACING: ${st.pacing.label}. Camera motion must be ${st.pacing.camera}. Average shot length about ${st.pacing.avgShotLength}, and the voice pace (voiceSpec "Pace (WPM)") must be ${st.pacing.wpm}.`,
  ];
}

function userInstruction(niche: string, topic: string, st: ResolvedStyle): string {
  return `Niche: ${niche}\nTopic: ${topic}\nFormat: ${st.format.label} (${st.format.aspectRatio})\nVisual vibe: ${st.vibe.label}\nPacing: ${st.pacing.label}\n\nReturn a single json object matching exactly this shape:\n${SCHEMA_SHAPE}`;
}

/** Parses model output that may be wrapped in prose or code fences. */
function parseJsonLoose(text: string): unknown | null {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function normalizePackage(
  raw: unknown,
  niche: string,
  topic: string,
  st: ResolvedStyle,
): ProductionPackage | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  if (!p["character"] || !p["visual"] || !p["camera"]) return null;
  const merged = {
    ...fallbackPackage(niche, topic, {
      format: st.format.id,
      vibe: st.vibe.id,
      pacing: st.pacing.id,
    }),
    ...p,
    niche,
    topic,
    seed: hashSeed(`${niche}::${topic}`),
    generatedAt: new Date().toISOString(),
  } as ProductionPackage;

  return sanitizePackage(merged, st);
}

/** Applies the shared sanitisation rules to any package (local or model-generated). */
function sanitizePackage(pkg: ProductionPackage, st: ResolvedStyle): ProductionPackage {
  const seed = pkg.visual.seedValue || pkg.seed;
  const mixCues: string[] = [];

  // Hard caps: max 30s of script (5 rows) and exactly 4 shots.
  const cueSheet = (pkg.character.cueSheet ?? []).slice(0, 5).map((r) => {
    const mix = extractMixDirective(r.cue ?? "");
    if (mix) mixCues.push(`${r.timestamp} — ${mix}`);
    return {
      timestamp: toRawLine(r.timestamp ?? ""),
      line: dedupePhrases(toRawLine(r.line ?? "")),
      cue: toElevenLabsCue(r.cue ?? ""),
    };
  });

  const human = isHumanSubject(pkg.niche);
  const shots = (pkg.camera.shots ?? []).slice(0, 4).map((s, i) => ({
    ...s,
    index: i + 1,
    motion: toRawLine(s.motion ?? ""),
    prompt: buildShotPrompt({
      motion: s.motion ?? st.pacing.camera,
      subjectAction: dedupePhrases(
        `${subjectPrefix(pkg.niche)}${pkg.character.archetype.toLowerCase().replace(/^the /, "")}, ${s.animationCue ?? ""}`,
      ),
      // Brief scene setting only — no repeated lighting essays per shot.
      environmentLighting: clampWords(pkg.visual.styleDNA.slice(0, 2).join(", "), 8),
      motionStrength: st.pacing.id === "fast" ? 4 : 3,
    }),
  }));

  return {
    ...pkg,
    topic: sanitizeTopic(pkg.topic),
    character: {
      ...pkg.character,
      voiceSpec: { ...pkg.character.voiceSpec, "Pace (WPM)": st.pacing.wpm },
      hooks: (pkg.character.hooks ?? []).map((h) => ({
        label: h.label,
        text: dedupePhrases(toRawLine(h.text ?? "")),
      })),
      cueSheet,
    },
    visual: {
      ...pkg.visual,
      aspectRatio: st.format.aspectRatio,
      resolution: st.format.resolution,
      negativePrompt: toRawLine(pkg.visual.negativePrompt ?? ""),
      masterPrompt: clampWords(
        stripPromptFlags(
          dedupePhrases(toRawLine(pkg.visual.masterPrompt || pkg.visual.leonardoPrompt || "")),
        ),
        100,
      ),
      leonardoPrompt: clampWords(stripPromptFlags(pkg.visual.leonardoPrompt ?? ""), 100),
      midjourneyPrompt: sanitizeMidjourneyPrompt(
        pkg.visual.midjourneyPrompt ?? "",
        seed,
        st.format.aspectRatio,
      ),
      googleFlowPrompt: clampWords(stripPromptFlags(pkg.visual.googleFlowPrompt ?? ""), 100),
    },
    camera: {
      ...pkg.camera,
      shots,
      soundDesign: [...(pkg.camera.soundDesign ?? []), ...mixCues].map((line) =>
        stripMarkdown(line),
      ),
    },
  };
}

/** Streams a production package out of the Lovable AI gateway Responses API. */
async function generateWithLovableAi(
  niche: string,
  topic: string,
  st: ResolvedStyle,
  apiKey: string,
  initialRunId?: string,
): Promise<{ pkg: ProductionPackage; runId: string | undefined } | null> {
  try {
    const res = await fetch(GATEWAY_RESPONSES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
        ...(initialRunId ? { [RUN_ID_HEADER]: initialRunId } : {}),
      },
      body: JSON.stringify({
        model: LOVABLE_MODEL,
        store: false,
        stream: true,
        reasoning: { effort: "low" },
        text: { format: { type: "json_object" } },
        input: [
          {
            role: "system",
            content: [
              ...PRODUCTION_RULES,
              ...styleRules(st, niche),
              `Reference style examples from successful creators:\n${referenceBlock(niche)}`,
            ].join(" "),
          },
          { role: "user", content: userInstruction(niche, topic, st) },
        ],
      }),
    });

    const runId = res.headers.get(RUN_ID_HEADER) ?? initialRunId;
    if (!res.ok) {
      console.warn(`[generate] Lovable AI responded with HTTP ${res.status}`);
      return null;
    }
    if (!res.body) {
      console.warn("[generate] Lovable AI response had no body");
      return null;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let streamed = "";
    let completed = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";
      for (const event of events) {
        for (const line of event.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const parsed = JSON.parse(payload) as {
              type?: string;
              delta?: string;
              response?: { output_text?: string };
            };
            if (parsed.type === "response.output_text.delta" && typeof parsed.delta === "string") {
              streamed += parsed.delta;
            } else if (parsed.type === "response.completed") {
              completed = parsed.response?.output_text ?? "";
            }
          } catch {
            // Keep-alive or comment line — nothing to extract.
          }
        }
      }
    }

    const finalText = streamed || completed;
    if (!finalText) {
      console.warn("[generate] Lovable AI stream returned no text");
      return null;
    }
    const pkg = normalizePackage(parseJsonLoose(finalText), niche, topic, st);
    if (!pkg) {
      console.warn("[generate] Lovable AI output did not match the ProductionPackage shape");
      return null;
    }
    return { pkg, runId };
  } catch (err) {
    console.warn(`[generate] Lovable AI call failed: ${err instanceof Error ? err.name : "unknown"}`);
    return null;
  }
}

async function generateWithGlm(
  niche: string,
  topic: string,
  st: ResolvedStyle,
  apiKey: string,
): Promise<ProductionPackage | null> {
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
              ...PRODUCTION_RULES,
              ...styleRules(st, niche),
              `Reference style examples from successful creators:\n${referenceBlock(niche)}`,
            ].join(" "),
          },
          { role: "user", content: userInstruction(niche, topic, st) },
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
    return normalizePackage(parseJsonLoose(content), niche, topic, st);
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
        let body: {
          niche?: unknown;
          topic?: unknown;
          format?: unknown;
          vibe?: unknown;
          pacing?: unknown;
        };
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

        const selection: StyleSelection = {
          ...(typeof body.format === "string" ? { format: body.format } : {}),
          ...(typeof body.vibe === "string" ? { vibe: body.vibe } : {}),
          ...(typeof body.pacing === "string" ? { pacing: body.pacing } : {}),
        };
        const st = resolveStyle(selection);

        const initialRunId = request.headers.get(RUN_ID_HEADER)?.trim() || undefined;
        const glmKey = process.env["GLM_API_KEY"];
        if (glmKey) {
          const pkg = await generateWithGlm(niche, topic, st, glmKey);
          if (pkg) return Response.json({ package: pkg, source: "glm" });
        } else {
          console.warn("[generate] GLM_API_KEY is not set");
        }

        const gatewayKey = process.env["LOVABLE_API_KEY"];
        if (gatewayKey) {
          const result = await generateWithLovableAi(niche, topic, st, gatewayKey, initialRunId);
          if (result) {
            return Response.json(
              { package: result.pkg, source: "lovable" },
              {
                headers: result.runId
                  ? { [RUN_ID_HEADER]: result.runId, "Access-Control-Expose-Headers": RUN_ID_HEADER }
                  : {},
              },
            );
          }
        } else {
          console.warn("[generate] LOVABLE_API_KEY is not set");
        }

        return Response.json({
          package: fallbackPackage(niche, topic, selection),
          source: "local",
        });
      },
    },
  },
});
