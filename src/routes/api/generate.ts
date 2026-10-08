import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getNicheProfile, hashSeed, type ProductionPackage } from "@/lib/generator";
import { dedupePhrases, normalizeCameraMove, sanitizeMidjourneyPrompt, stripFormatSpecs, stripPromptFlags, toElevenLabsCue, toRawLine } from "@/lib/prompt-sanitize";
import { resolveStyle, type ResolvedStyle, type StyleSelection } from "@/lib/styleOptions";
import { isHumanSubject, midjourneyNegativeFor, subjectRule } from "@/lib/subject";

const GLM_ENDPOINT = "https://api.hcnsec.cn/v1/chat/completions";
const TIMEOUT_MS = 85_000;
const GATEWAY_RESPONSES_ENDPOINT = "https://ai.gateway.lovable.dev/v1/responses";
const LOVABLE_MODEL = "openai/gpt-6-astra";
const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

const line = z.string().trim().min(1);
const strings = z.array(line);
const packageSchema = z.object({
  character: z.object({
    archetype: line, physicalDescription: line,
    consistencyScore: z.coerce.number().finite().optional().default(0),
    toneTags: strings.optional().default([]), wardrobe: strings.optional().default([]),
    voiceSpec: z.record(z.union([z.string(), z.number()]).transform(String)),
    hooks: z.array(z.object({ label: line, text: line })).min(1).max(3),
    cueSheet: z.array(z.object({ timestamp: line, line, cue: z.string().optional().default("") })),
    retentionBeats: strings.min(1),
  }),
  visual: z.object({
    styleDNA: strings.min(1), aspectRatio: z.string().optional().default(""), resolution: z.string().optional().default(""),
    model: z.string().optional().default(""), stylize: z.coerce.number().optional().default(0),
    chaos: z.coerce.number().optional().default(0), seedValue: z.coerce.number().optional().default(0),
    negativePrompt: line, masterPrompt: line, leonardoPrompt: line, midjourneyPrompt: line, googleFlowPrompt: line,
    consistencyToken: z.string().optional().default(""), negativeLibrary: strings.optional().default([]),
  }),
  camera: z.object({
    overview: z.record(z.union([z.string(), z.number()]).transform(String)).optional().default({}),
    shots: z.array(z.object({
      index: z.coerce.number().optional().default(0), timecode: z.string().optional().default(""),
      motion: line, transition: line, animationCue: line,
    })).length(4),
    rigCheatSheet: strings.optional().default([]), soundDesign: strings.min(1),
  }),
  variation: z.object({ hookStyle: line, storyStructure: line, pacingProfile: line, editingStyle: line, emotionalTone: line, copyPastePrompt: line }),
});

// A valid JSON example is easier for compatible models to follow than pseudocode types.
const SCHEMA_SHAPE = JSON.stringify({
  character: { archetype: "Specific subject", physicalDescription: "Subject appearance and unchanging identifying details", toneTags: ["tone"], wardrobe: ["Relevant props or clothing, omit for objects"], voiceSpec: { "Voice Type": "Appropriate voice or None", "Pace (WPM)": "180", "Emotional Register": "Specific tone" }, hooks: [{ label: "Opening", text: "A specific short opening line" }], cueSheet: [{ timestamp: "0:00", line: "Write real spoken words here", cue: "[excited]" }], retentionBeats: ["0:00 — Specific opening beat"] },
  visual: { styleDNA: ["Selected visual style"], masterPrompt: "Complete single-scene image prompt", negativePrompt: "text, watermark, unwanted artifacts", leonardoPrompt: "Complete image prompt", midjourneyPrompt: "Complete image prompt without flags", googleFlowPrompt: "One single-shot video prompt" },
  camera: { shots: [{ motion: "Push-in", transition: "Hard cut", animationCue: "A complete sentence naming the specific subject, stable identifying details, action and location." }], soundDesign: ["Relevant audible sounds or appropriate music"], rigCheatSheet: ["Practical shooting note"] },
  variation: { hookStyle: "Specific hook", storyStructure: "Specific sequence", pacingProfile: "Specific pacing", editingStyle: "Specific editing", emotionalTone: "Specific tone", copyPastePrompt: "A practical variation plan that preserves all user constraints" },
});

const PRODUCTION_RULES = [
  "Return ONLY one complete JSON object. No markdown fences or commentary. All content is in English unless the user requests another language.",
  "Explicit user requirements and selected visual style override niche conventions. Preserve subject colors, clothing, props and factual constraints across all outputs. Do not invent historical claims, statistics or guaranteed outcomes.",
  "Write natural complete sentences. Never insert the raw topic as a noun phrase. Do not use placeholder text from the example schema. Do not split or truncate sentences.",
  "Create a 30-second production plan with exactly FOUR shots covering 0:00–0:30. Each shot lasts 7–8 seconds. Fast pacing means energetic action within those shots, NOT a false claim that four shots of 1.5 seconds cover 30 seconds. Slow pacing means restrained movement and longer pauses.",
  "Each shot has one camera movement in motion and a full visual sentence in animationCue. Name the subject, recurring appearance, action and brief setting in EVERY animationCue so each copied prompt is independently usable. Never put camera movement or editing commands in animationCue. Put editing in transition.",
  "Use one of: Push-in, Pull-out, Pan left, Pan right, Tilt up, Tilt down, Tracking shot, Orbit, Crane shot, Snap-zoom, Static shot. No model-specific command-line flags in text.",
  "For narrated videos, write exactly FIVE cue rows. Follow the word budget supplied below, count the words, and revise before returning. cueSheet line contains spoken words only; cue contains optional delivery tags, never music or visual directions. Start at 0:00 and finish within 30 seconds.",
  "For videos with NO narration, cueSheet must be an EMPTY array and Voice Type must be None. Hooks describe visual openings. All actions belong in the shots. Do not introduce speech, narration or a voiceover call to action anywhere.",
  "Return 1–3 hooks of at most 12 words each. For narration these must be actual spoken opening lines, never visual directions. For ambient videos they are short visual opening descriptions. Return three timestamped retention beats. The master image prompt describes one frame in 60–100 words, not a whole film. Other image prompts describe that same subject and frame; the Flow prompt describes ONLY ONE of the four shots, not the full story or a sequence of multiple events. No engine flags, resolution or aspect-ratio parameters in prose.",
  "The variation plan may change camera angles, framing or the opening order ONLY. It must preserve the specific subject, colors, clothes, props, setting, facts and audio constraints in the user brief. Never suggest swapping the character, changing its scarf or repainting a vehicle when those details were specified. This is a variation of the same brief, not a different story.",
  "For factual explainers, the visual demonstration must show the same cause described in the narration. Do not animate a supposedly stationary object in a way that contradicts the explanation. Keep any text labels out of generated images and shots; optional labels may be added later during editing.",
  "Keep each image prompt below 110 words and the variation paragraph below 100 words. Sound design must fit the scene and obey any no-music or ambient-only requirement. Do not substitute unrelated preset sounds.",
];

function ambientOnly(niche: string, topic: string): boolean {
  if (/\b(?:no|without)\s+(?:any\s+)?(?:voice[ -]?over|narration|dialogue|speech)\b|\bsilent video\b/i.test(topic)) return true;
  if (/\b(?:with (?:a )?(?:voice[ -]?over|narration)|narrate)\b/i.test(topic)) return false;
  return /no narration/i.test(getNicheProfile(niche).voVoiceType);
}
function noMusic(topic: string): boolean {
  return /\b(?:no|without)\s+(?:any\s+)?music\b|\bonly\b[^.!?]*(?:sounds?|sfx)\b/i.test(topic);
}
function styleRules(st: ResolvedStyle, niche: string): string[] {
  return [subjectRule(niche),
    `Visual style: ${st.vibe.label}; ${st.vibe.style}; ${st.vibe.lighting}. Use the selected style consistently even if the niche often uses another style.`,
    `Frame: ${st.format.aspectRatio}, ${st.format.resolution}. Pacing: ${st.pacing.label}. Four shots total, average 7.5 seconds.`,
  ];
}
function userInstruction(niche: string, topic: string, st: ResolvedStyle, seed: number): string {
  const silent = ambientOnly(niche, topic);
  return `Niche: ${niche}\nUser brief: ${topic}\nVariation seed: ${seed}\nAudio: ${silent ? "NO NARRATION. Empty cueSheet, visual hooks only." : `Narration required: exactly five cue rows with ${st.pacing.id === "slow" ? "40–50" : "65–80"} spoken words IN TOTAL.`}\n${noMusic(topic) ? "NO MUSIC. Only the sounds specified by the user." : "Choose sound to match the user's scene."}\nFollow this JSON structure, replacing the example values with real content. Expand camera.shots to FOUR objects; use FIVE cueSheet rows for narration, or [] for no narration:\n${SCHEMA_SHAPE}`;
}
function parseJsonLoose(text: string): unknown {
  const cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  try { return JSON.parse(cleaned); } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    try { return match ? JSON.parse(match[0]) : null; } catch { return null; }
  }
}
const clean = (s: string) => dedupePhrases(toRawLine(stripPromptFlags(s)));
const wordCount = (s: string) => s.match(/\b[\w’'-]+\b/g)?.length ?? 0;

function normalizePackage(raw: unknown, niche: string, topic: string, st: ResolvedStyle, seed: number): ProductionPackage | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const r = raw as Record<string, any>;
  if (r["character"] && typeof r["character"] === "object") {
    for (const key of ["cueSheet", "retentionBeats"]) {
      if (!r["character"][key] && Array.isArray(r[key])) r["character"][key] = r[key];
    }
    // The explicit no-narration choice is authoritative, even if a model adds a script.
    if (ambientOnly(niche, topic)) r["character"]["cueSheet"] = [];
  }
  const parsed = packageSchema.safeParse(r);
  if (!parsed.success) {
    console.warn("[generate] Invalid fields: " + parsed.error.issues.map(i => i.path.join(".")).join(", "));
    return null;
  }
  const p = parsed.data;
  // Optional alternatives must not invalidate a usable opening. Never truncate AI text.
  const shortHooks = p.character.hooks.filter(h => wordCount(clean(h.text)) <= 12);
  const selectedHooks = shortHooks.length ? shortHooks : p.character.hooks;
  const silent = ambientOnly(niche, topic);
  const cueSheet = p.character.cueSheet.map((row, i) => ({ ...row, timestamp: `0:${String(i * 6).padStart(2, "0")}`, line: clean(row.line), cue: toElevenLabsCue(row.cue) }));
  const times = ["0:00–0:07", "0:07–0:15", "0:15–0:22", "0:22–0:30"];
  const shots = p.camera.shots.map((shot, i) => {
    const motion = /static|locked/i.test(shot.motion) ? "Static shot" : normalizeCameraMove(shot.motion);
    const action = clean(shot.animationCue);
    return { ...shot, index: i + 1, timecode: times[i]!, motion, animationCue: action, prompt: `${motion}: ${action}` };
  });
  const image = (s: string) => clean(stripFormatSpecs(s));
  let negative = clean(p.visual.negativePrompt);
  if (!isHumanSubject(niche)) negative = negative.split(",").filter(s => !/faceless|anonymous silhouette|head cropped|hidden face|visible face/i.test(s)).join(",").trim();
  const result: ProductionPackage = {
    ...p, niche, topic, seed, generatedAt: new Date().toISOString(), narrationMode: silent ? "ambient" : "voiceover",
    character: { ...p.character, cueSheet, voiceSpec: { ...p.character.voiceSpec, "Voice Type": silent ? "None — ambient sound only" : p.character.voiceSpec["Voice Type"] || "Narrator", "Pace (WPM)": silent ? "Not applicable" : st.pacing.wpm }, hooks: selectedHooks.map(h => ({ label: clean(h.label), text: clean(h.text) })) },
    visual: { ...p.visual, aspectRatio: st.format.aspectRatio, resolution: st.format.resolution, seedValue: seed, masterPrompt: image(p.visual.masterPrompt), negativePrompt: negative, leonardoPrompt: image(p.visual.leonardoPrompt), midjourneyPrompt: sanitizeMidjourneyPrompt(image(p.visual.midjourneyPrompt), seed, st.format.aspectRatio, midjourneyNegativeFor(niche)), googleFlowPrompt: image(p.visual.googleFlowPrompt) },
    camera: { ...p.camera, shots, overview: { ...p.camera.overview, "Shot Count": "4", "Avg Shot Length": "7.5s", "Pacing Arc": st.pacing.label }, soundDesign: p.camera.soundDesign.map(clean) },
    variation: { ...p.variation, copyPastePrompt: clean(p.variation.copyPastePrompt) },
  };
  return result;
}
function qualityIssues(p: ProductionPackage, st: ResolvedStyle): string[] {
  const issues: string[] = [];
  if (p.character.hooks.some(h => wordCount(h.text) > 12)) issues.push("Each hook must contain at most 12 words. Write a short spoken opening for narrated videos, not stage directions.");
  if (p.narrationMode !== "ambient") {
    const words = wordCount(p.character.cueSheet.map(r => r.line).join(" "));
    const [min, max] = st.pacing.id === "slow" ? [40, 50] : [65, 80];
    if (p.character.cueSheet.length !== 5 || words < min! || words > max!) issues.push(`Write exactly five cue rows totaling ${min}–${max} spoken words; you returned ${words} words in ${p.character.cueSheet.length} rows.`);
  }
  if (p.camera.shots.some(s => wordCount(s.animationCue) < 7 || /\bthe (?:a|an|the)\b/i.test(s.animationCue))) issues.push("Every shot needs a complete grammatical sentence naming its subject, identifying details, action and setting.");
  if (noMusic(p.topic) && p.camera.soundDesign.some(s => /music|bed track|piano|soundtrack|bpm/i.test(s) && !/\b(?:no|none|without|omit)\b/i.test(s))) issues.push("Remove music entirely. Use only the sounds the user requested.");
  return issues;
}

/** Streams a production package out of the Lovable AI gateway Responses API. */
async function generateWithLovableAi(
  niche: string,
  topic: string,
  st: ResolvedStyle,
  seed: number,
  apiKey: string,
  initialRunId?: string,
  extraRules: string[] = [],
): Promise<{ pkg: ProductionPackage; runId: string | undefined } | null> {
  try {
    const res = await fetch(GATEWAY_RESPONSES_ENDPOINT, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
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
              ...extraRules,

            ].join(" "),
          },
          { role: "user", content: userInstruction(niche, topic, st, seed) },
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
    const pkg = normalizePackage(parseJsonLoose(finalText), niche, topic, st, seed);
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

class GenerationError extends Error {
  constructor(message: string, public status = 502, public retryable = true) { super(message); }
}
async function generateWithGlm(niche: string, topic: string, st: ResolvedStyle, seed: number, apiKey: string, extraRules: string[] = [], compatibility = false): Promise<ProductionPackage | null> {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(GLM_ENDPOINT, {
      method: "POST", signal: controller.signal,
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env["AI_MODEL"] || "auto", max_tokens: 10000, temperature: 0.4,
        reasoning_effort: "low",
        ...(!compatibility ? { response_format: { type: "json_object" } } : {}),
        messages: [{ role: "system", content: [...PRODUCTION_RULES, ...styleRules(st, niche), ...extraRules].join("\n") }, { role: "user", content: userInstruction(niche, topic, st, seed) }],
      }),
    });
    if (!res.ok) {
      console.warn(`[generate] Provider HTTP ${res.status}`);
      if (res.status === 401 || res.status === 403) throw new GenerationError("The AI service credentials need attention. Please contact the site owner.", 503, false);
      if (res.status === 429) throw new GenerationError("The AI provider is at its usage limit. Please try again later.", 429, false);
      throw new GenerationError("The AI provider is temporarily unavailable. Please try again.", 502);
    }
    const data = await res.json() as { model?: string; choices?: { finish_reason?: string; message?: { content?: string | { type?: string; text?: string }[] } }[] };
    const choice = data.choices?.[0];
    const content = choice?.message?.content;
    const text = typeof content === "string" ? content : Array.isArray(content) ? content.map(b => b.text || "").join("") : "";
    console.info(`[generate] Provider completed: model=${data.model || "unknown"}, finish=${choice?.finish_reason || "unknown"}, content=${text.length}`);
    if (!text || choice?.finish_reason === "length") return null;
    return normalizePackage(parseJsonLoose(text), niche, topic, st, seed);
  } catch (error) {
    if (error instanceof GenerationError) throw error;
    if (controller.signal.aborted) {
      console.warn(`[generate] Provider timeout: model=${process.env["AI_MODEL"] || "auto"}, elapsedMs=${Date.now() - startedAt}`);
      throw new GenerationError("The AI provider took too long. Your topic is still here; please try again shortly.", 504, false);
    }
    throw new GenerationError("The AI connection was interrupted. Please try again.", 502);
  } finally { clearTimeout(timer); }
}

export const Route = createFileRoute("/api/generate")({
  server: { handlers: {
    GET: () => Response.json({ mode: process.env["GLM_API_KEY"] || process.env["LOVABLE_API_KEY"] ? "ai" : "unavailable" }, { headers: { "Cache-Control": "no-store" } }),
    POST: async ({ request }) => {
      let body: Record<string, unknown>;
      try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
      if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });
      const niche = typeof body["niche"] === "string" ? body["niche"].trim() : "";
      const topic = typeof body["topic"] === "string" ? body["topic"].replace(/\s+/g, " ").trim() : "";
      if (!niche || topic.length < 3 || niche.length > 200 || topic.length > 300) return Response.json({ error: "Choose a niche and enter a topic between 3 and 300 characters." }, { status: 400 });
      const selection: StyleSelection = { ...(typeof body["format"] === "string" ? { format: body["format"] } : {}), ...(typeof body["vibe"] === "string" ? { vibe: body["vibe"] } : {}), ...(typeof body["pacing"] === "string" ? { pacing: body["pacing"] } : {}) };
      const st = resolveStyle(selection);
      const seed = typeof body["seed"] === "number" && Number.isFinite(body["seed"]) ? Math.trunc(body["seed"]) : hashSeed(`${niche}::${topic}`);
      const key = process.env["GLM_API_KEY"], gatewayKey = process.env["LOVABLE_API_KEY"];
      if (!key && !gatewayKey) return Response.json({ error: "AI generation is not configured. Please contact the site owner." }, { status: 503 });
      let feedback: string[] = [], lastError = new GenerationError("The AI returned an incomplete draft twice. Please try again.");
      // Retry incomplete drafts or transient errors once, but never repeat a full timeout.
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const extra = feedback.length ? ["Correct these issues before returning the complete JSON: " + feedback.join(" ")] : [];
          const pkg = key ? await generateWithGlm(niche, topic, st, seed, key, extra, attempt > 0)
            : (await generateWithLovableAi(niche, topic, st, seed, gatewayKey!, request.headers.get(RUN_ID_HEADER) || undefined, extra))?.pkg;
          if (pkg) {
            feedback = qualityIssues(pkg, st);
            if (!feedback.length) return Response.json({ package: pkg, source: key ? "trustedrouter" : "lovable" }, { headers: { "Cache-Control": "no-store" } });
            console.warn("[generate] Quality correction: " + feedback.join(" "));
          } else feedback = ["Return all required fields with complete content. Ensure valid JSON, exactly four shots and the specified narration word count. Do not return reasoning without the final JSON."];
        } catch (error) {
          lastError = error instanceof GenerationError ? error : new GenerationError("AI generation failed. Please try again.");
          if (!lastError.retryable) break;
        }
      }
      return Response.json({ error: lastError.message }, { status: lastError.status, headers: { "Cache-Control": "no-store" } });
    },
  } },
});
