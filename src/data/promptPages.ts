import { PROMPTS, type Prompt, type PromptCategory } from "@/data/promptLibrary";

export type PromptCollection = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  categories: PromptCategory[];
  includedIds?: string[];
  bestFor: string[];
  workflow: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
};

export const PROMPT_COLLECTIONS: PromptCollection[] = [
  {
    slug: "youtube",
    label: "YouTube prompts",
    eyebrow: "Plan, package, and repurpose",
    title: "Free AI Prompts for Faceless YouTube Channels",
    description:
      "Use free AI prompts for faceless YouTube channel planning, titles, descriptions, hooks, retention edits, Shorts repurposing, and repeatable content systems.",
    intro:
      "These prompts are for the work around the upload as much as the upload itself: finding a repeatable angle, shaping a hook, packaging a real video clearly, and turning one production into more useful content. Treat them as drafting systems, then verify facts and rewrite the result in your own channel voice.",
    categories: ["SEO", "Niche"],
    includedIds: ["vid-hook-first-second", "vid-camera-motion-pack"],
    bestFor: [
      "Planning a faceless channel around a repeatable format instead of one-off ideas.",
      "Drafting titles, descriptions, hooks, thumbnail text, community posts, and upload metadata.",
      "Turning long-form videos into Shorts, edit maps, and recurring series systems.",
    ],
    workflow: [
      { title: "Start with a real video", body: "Give the prompt a specific topic, audience, format, and the promise your finished video can actually deliver." },
      { title: "Use one prompt per decision", body: "Separate ideation, scripting, packaging, and repurposing so you can judge each output instead of accepting one giant draft." },
      { title: "Review against the finished video", body: "Check every title, description, hook, and claim against what is actually in the upload before publishing." },
    ],
    faq: [
      { question: "Can AI prompts help start a faceless YouTube channel?", answer: "They can speed up planning and drafting, but the channel still needs an original point of view, accurate information, useful editing, and a format you can repeat consistently." },
      { question: "Should I use AI-generated YouTube titles exactly as written?", answer: "Use them as options. Pick or rewrite the clearest title that matches the finished video. Avoid promises, numbers, or claims the upload does not support." },
      { question: "Do these prompts guarantee views or monetization?", answer: "No. They help structure creative work. Reach, approval, retention, and revenue depend on the content, audience, platform rules, execution, and many other factors." },
    ],
  },
  {
    slug: "image-generation",
    label: "Image generation prompts",
    eyebrow: "Frames, thumbnails, and references",
    title: "AI Image Generation Prompts for Faceless Content",
    description:
      "Browse free AI image prompts for faceless content, thumbnails, character references, scene frames, storyboards, b-roll sets, transformations, and visual concepts.",
    intro:
      "A useful image prompt makes the composition easier to control. These templates focus on subject, framing, lighting, lens choices, continuity, and negative constraints so you can generate cleaner starting frames instead of piling unrelated style words into one request.",
    categories: ["Image Gen"],
    bestFor: [
      "Creating starting frames, thumbnails, scene references, and storyboard images.",
      "Defining lighting, camera perspective, wardrobe, environment, and visual continuity.",
      "Building reusable visual references before moving into image-to-video workflows.",
    ],
    workflow: [
      { title: "Lock the subject", body: "Describe who or what the image is about before adding style, camera, or environment details." },
      { title: "Control the frame", body: "Specify composition, lens feel, camera angle, lighting direction, and only the visual details that matter to the shot." },
      { title: "Iterate one variable at a time", body: "If the result is close, change one thing—pose, wardrobe, setting, or lighting—rather than rewriting the entire prompt." },
    ],
    faq: [
      { question: "What makes an AI image prompt more consistent?", answer: "Stable subject details, a clear reference image when supported, repeated wardrobe and camera notes, and changing fewer variables between generations all help." },
      { question: "Do I need camera terms in every image prompt?", answer: "No. Use them when framing, depth of field, or perspective matters. For simple illustrations or flat graphics, subject and composition may be enough." },
      { question: "Can I use these prompts with any image model?", answer: "Most of the descriptive structure transfers, but model-specific parameters may not. Remove unsupported flags and adapt the wording to the tool you use." },
    ],
  },
  {
    slug: "video-generation",
    label: "Video generation prompts",
    eyebrow: "Motion, camera, and pacing",
    title: "AI Video Generation Prompts for Faceless Videos",
    description:
      "Browse free AI video prompts for camera movement, POV scenes, transitions, ASMR, product shots, cinematic clips, hooks, loops, and faceless video production.",
    intro:
      "Video prompts work best when one clip has one clear job. These templates separate subject action, camera motion, scene progression, audio cues, and duration so a model is not being asked to perform several unrelated shots in one generation.",
    categories: ["Video Gen"],
    bestFor: [
      "Directing a short clip with one readable action and one primary camera movement.",
      "Creating hooks, POV moments, transitions, product shots, reactions, and scene variations.",
      "Turning a still reference or storyboard beat into a focused motion prompt.",
    ],
    workflow: [
      { title: "Define the beat", body: "Write the exact action that should happen during this clip and what state the scene should end in." },
      { title: "Choose one camera move", body: "Use a push-in, pan, orbit, handheld drift, locked shot, or another simple motion instead of stacking several movements." },
      { title: "Split scene changes", body: "If location, time, subject, or action changes substantially, make it a separate generation and edit the clips together later." },
    ],
    faq: [
      { question: "How long should an AI video prompt be?", answer: "Long enough to define the shot, but not so long that it contains several different scenes. A concise action, camera instruction, setting, lighting, and end state is often easier to control." },
      { question: "Why do generated videos ignore part of my prompt?", answer: "The request may contain too many competing actions or camera instructions. Simplify the clip and move extra beats into separate shots." },
      { question: "Should I include audio directions?", answer: "Include them only if the model supports audio or if the note helps your downstream edit. Otherwise keep sound design in a separate production plan." },
    ],
  },
  {
    slug: "seo",
    label: "YouTube SEO prompts",
    eyebrow: "Packaging without overpromising",
    title: "YouTube SEO Prompts for Titles, Descriptions & Tags",
    description:
      "Use free YouTube SEO prompts for titles, descriptions, tags, hashtags, thumbnail text, hooks, channel names, upload packages, and community posts.",
    intro:
      "These templates help turn a finished topic into clearer packaging. They are designed to generate options and structure—not fake search data, guaranteed CTR predictions, or promises that a video cannot fulfill. The best output is the one that accurately communicates why the right viewer should care.",
    categories: ["SEO"],
    bestFor: [
      "Generating several title and thumbnail-text directions from one real video topic.",
      "Drafting descriptions, tags, hashtags, hooks, channel names, and community content.",
      "Building an upload checklist without pretending metadata alone determines performance.",
    ],
    workflow: [
      { title: "Package after the content", body: "Use the actual finished topic, claims, examples, and audience so the metadata describes the video you really made." },
      { title: "Generate options", body: "Ask for several distinct directions, then choose the clearest promise instead of automatically taking the first output." },
      { title: "Fact-check the package", body: "Remove unsupported numbers, invented keywords, misleading urgency, and anything that implies results you cannot substantiate." },
    ],
    faq: [
      { question: "Can ChatGPT know the exact best YouTube keywords?", answer: "Not without current search or analytics data. Use these prompts to organize known topics and keyword ideas, then validate demand with the platform or a current SEO data source when that matters." },
      { question: "Do YouTube tags still matter?", answer: "Tags can help with context and misspellings, but they are only one small part of packaging and discovery. A clear topic, useful video, strong title, and thumbnail remain more important creative decisions." },
      { question: "Can an AI predict my CTR?", answer: "It can critique clarity and curiosity, but it should not present an invented CTR percentage as a reliable prediction. Actual performance requires real audience data." },
    ],
  },
  {
    slug: "character-consistency",
    label: "Character consistency prompts",
    eyebrow: "Build repeatable visual identity",
    title: "AI Character Consistency Prompts & Reference Templates",
    description:
      "Use free AI character consistency prompts for character sheets, identity locks, turnaround views, recurring casts, voice profiles, wardrobe continuity, and reference images.",
    intro:
      "Character consistency is a system, not a magic phrase. These prompts help you define stable identity details—face, hair, wardrobe, proportions, voice, props, and references—then reuse those details across scenes while reviewing each output against the source material.",
    categories: ["Character"],
    includedIds: ["img-character-sheet", "img-nano-banana-portrait", "img-ai-influencer"],
    bestFor: [
      "Creating a master reference sheet before generating a series of scenes.",
      "Keeping wardrobe, distinctive features, props, and voice notes consistent across episodes.",
      "Defining a recurring cast so later prompts can reuse the same identity vocabulary.",
    ],
    workflow: [
      { title: "Make a master reference", body: "Create or select one approved reference that clearly shows the identity details you intend to preserve." },
      { title: "Write an identity lock", body: "List the small set of traits that must remain stable, then separate those from scene-specific pose, lighting, and wardrobe changes." },
      { title: "Compare every output", body: "Do not assume a seed, token, or prompt guarantees identity. Check face shape, hairline, proportions, wardrobe, and other critical details each time." },
    ],
    faq: [
      { question: "Can a prompt guarantee the exact same AI character every time?", answer: "No. Consistency improves with references, stable identity details, and tool-specific controls, but each output still needs review." },
      { question: "What should go in a character reference sheet?", answer: "Include several useful angles, a neutral expression, key wardrobe, distinctive features, and lighting that makes the face and proportions easy to read." },
      { question: "Should scene details be part of the identity lock?", answer: "Only permanent details belong in the identity lock. Keep location, pose, temporary wardrobe, lighting, and action separate so they can change without redefining the character." },
    ],
  },
];

export const PROMPT_COLLECTION_SLUGS = PROMPT_COLLECTIONS.map((collection) => collection.slug);
export const PROMPT_PAGE_SLUGS = PROMPTS.map((prompt) => prompt.id);

export function getPromptCollection(slug: string): PromptCollection | undefined {
  return PROMPT_COLLECTIONS.find((collection) => collection.slug === slug);
}

export function getPromptsForCollection(collection: PromptCollection): Prompt[] {
  const ids = new Set(collection.includedIds ?? []);
  return PROMPTS.filter((prompt) => collection.categories.includes(prompt.category) || ids.has(prompt.id));
}

export function getPromptBySlug(slug: string): Prompt | undefined {
  return PROMPTS.find((prompt) => prompt.id === slug);
}

export function primaryCollectionSlug(prompt: Prompt): string {
  if (prompt.category === "Image Gen") return "image-generation";
  if (prompt.category === "Video Gen") return "video-generation";
  if (prompt.category === "SEO") return "seo";
  if (prompt.category === "Character") return "character-consistency";
  return "youtube";
}

export function relatedPrompts(prompt: Prompt, count = 4): Prompt[] {
  const sameNiche = PROMPTS.filter((item) => item.id !== prompt.id && prompt.niche && item.niche === prompt.niche);
  const sameCategory = PROMPTS.filter((item) => item.id !== prompt.id && item.category === prompt.category && !sameNiche.some((n) => n.id === item.id));
  const fallback = PROMPTS.filter((item) => item.id !== prompt.id && !sameNiche.some((n) => n.id === item.id) && !sameCategory.some((n) => n.id === item.id));
  return [...sameNiche, ...sameCategory, ...fallback]
    .sort((a, b) => (b.reactions ?? 0) - (a.reactions ?? 0))
    .slice(0, count);
}
