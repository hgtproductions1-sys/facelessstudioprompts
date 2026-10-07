export type GuideSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: { title: string; body: string }[];
  example?: { label: string; text: string };
  callout?: { title: string; body: string };
};

export type GuideSource = {
  label: string;
  url: string;
  note?: string;
};

export type ArticleGuide = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  category: "Strategy" | "Prompting" | "Workflow" | "Policy";
  readMinutes: number;
  updated: string;
  summary: string;
  takeaways: string[];
  sections: GuideSection[];
  relatedPromptSlugs: string[];
  relatedNicheSlugs: string[];
  sources?: GuideSource[];
};

export const ARTICLE_GUIDES: ArticleGuide[] = [
  {
    slug: "choose-faceless-youtube-niche",
    title: "How to Choose a Faceless YouTube Niche You Can Actually Sustain",
    seoTitle: "How to Choose a Faceless YouTube Niche: A Practical Framework",
    description:
      "Choose a faceless YouTube niche with a practical framework based on repeatable ideas, production difficulty, audience promise, and room for original value.",
    eyebrow: "Niche strategy",
    category: "Strategy",
    readMinutes: 8,
    updated: "October 7, 2026",
    summary:
      "A useful niche is not just a topic with demand. It is a topic you can turn into many distinct videos with a recognizable promise, a production process you can afford, and enough room for original commentary or storytelling.",
    takeaways: [
      "Judge a niche by idea depth, not by one viral example.",
      "Choose a repeatable viewer promise before choosing a visual style.",
      "Test production difficulty with three sample videos before committing.",
      "Prefer niches where your research, structure, taste, or storytelling can create a clear difference.",
    ],
    sections: [
      {
        id: "start-with-promise",
        title: "Start with the viewer promise, not the tool",
        paragraphs: [
          `A common mistake is choosing a niche because a specific AI tool makes it easy to produce. That reverses the decision. Tools change quickly; the reason a viewer returns should remain understandable even if you replace every tool in your stack.`,
          `Write the channel promise in one sentence: “Every video helps this viewer get this kind of result or feeling.” A restoration channel might promise satisfying transformations. A history channel might promise one surprising story with a clear beginning, conflict, and consequence. A ranking channel might promise fast comparisons with evidence instead of arbitrary lists.`,
          `If the promise needs a paragraph to explain, it is probably too broad. If it produces only five obvious video ideas, it is probably too narrow.`,
        ],
        example: {
          label: "Simple promise test",
          text: "For curious car fans, each video reveals the story behind one unusual barn find, restoration decision, or forgotten model in under five minutes.",
        },
      },
      {
        id: "four-tests",
        title: "Use four tests before you commit",
        steps: [
          {
            title: "1. Idea depth",
            body: "List 30 specific video titles without using filler words like ‘part 2.’ If the list becomes repetitive after ten ideas, the niche may not have enough depth for the format you want.",
          },
          {
            title: "2. Production fit",
            body: "Estimate the hardest recurring task: research, sourcing visuals, character consistency, animation, voice, or editing. A niche that looks simple can become expensive if every episode needs custom historical research or dozens of generated shots.",
          },
          {
            title: "3. Differentiation",
            body: "Describe what your version adds. It might be better explanations, a recurring character, cleaner comparisons, a specific point of view, original diagrams, or unusually careful sourcing. ‘AI-generated’ is not differentiation by itself.",
          },
          {
            title: "4. Repeatability",
            body: "Build three test videos on different topics. If each one requires a totally new workflow, you do not yet have a format. The goal is repeated structure with meaningful variation, not repeated content with cosmetic changes.",
          },
        ],
      },
      {
        id: "scorecard",
        title: "A simple niche scorecard",
        paragraphs: [
          `Score each candidate niche from 1 to 5 for idea depth, production difficulty, source availability, originality potential, and your willingness to make twenty videos about it. Production difficulty is reverse-scored: easier production receives the higher score.`,
          `Do not treat the final number as a prediction of views. The scorecard is a decision aid. Its job is to reveal tradeoffs before you invest in a logo, automation, or a large batch of content.`,
        ],
        bullets: [
          "Idea depth: Can you name 30 distinct topics now?",
          "Production fit: Can you make a good episode with your current time and budget?",
          "Source availability: Can you verify facts and obtain usable visuals or create your own?",
          "Originality potential: Can your channel contribute something beyond summarizing existing videos?",
          "Personal durability: Would you still want to research this after the novelty wears off?",
        ],
      },
      {
        id: "test-before-branding",
        title: "Test the format before you overbuild the brand",
        paragraphs: [
          `Make three small pilots before you spend much time on branding. Use three different topics, but keep the same promise, duration range, visual grammar, and publishing standard. The test is not whether all three videos perform well. The test is whether you can make them without reinventing the production system.`,
          `After the pilots, note where quality dropped because the workflow was too slow. That bottleneck tells you more than a generic list of “profitable niches.” If you cannot sustain the research or shot count, simplify the format before you simplify the content.`,
        ],
        callout: {
          title: "Good niche decisions reduce future decisions",
          body: "A strong niche gives you recurring questions, recurring visual patterns, and recurring audience expectations. It should make the next video easier to plan without making it interchangeable with the previous one.",
        },
      },
    ],
    relatedPromptSlugs: ["niche-faceless-series-bible", "niche-faceless-series-bible", "niche-top5-ranking"],
    relatedNicheSlugs: ["ranking-and-top-5-countdowns", "stickman-explainer-and-skits", "ai-car-wash-and-restoration"],
  },
  {
    slug: "consistent-ai-characters",
    title: "How to Keep AI Characters Consistent Across Images and Video",
    seoTitle: "How to Keep AI Characters Consistent Across Images and Video",
    description:
      "Build a reusable AI character system with a master identity sheet, fixed visual anchors, shot-level prompting, and continuity checks for faceless content.",
    eyebrow: "Character system",
    category: "Prompting",
    readMinutes: 9,
    updated: "October 7, 2026",
    summary:
      "Consistency improves when you separate permanent identity from temporary scene details. Define the character once, reuse stable anchors, and change only pose, expression, camera, action, and environment at the shot level.",
    takeaways: [
      "Create one master identity block and stop rewriting it from memory.",
      "Keep permanent traits separate from wardrobe, pose, emotion, and scene instructions.",
      "Use reference images or model-specific consistency features when available.",
      "Reject visually attractive shots that break continuity.",
    ],
    sections: [
      {
        id: "identity-vs-scene",
        title: "Separate identity from scene direction",
        paragraphs: [
          `The most reliable character workflow starts with two layers. The identity layer contains traits that should almost never change: approximate age, face shape, hair, eye color, body proportions, signature clothing elements, and distinctive accessories. The scene layer contains everything that is allowed to change: expression, pose, lighting, camera angle, background, action, and temporary wardrobe details.`,
          `When both layers are rewritten from scratch in every prompt, small language differences can create large visual drift. Store the identity block in one place and reuse it exactly. Then append the shot instructions beneath it.`,
        ],
        example: {
          label: "Identity block",
          text: "Young adult woman, oval face, short black bob with blunt bangs, warm brown eyes, small silver star earring in left ear, teal windbreaker with white zipper, compact athletic build. Preserve facial proportions, hairstyle, earring placement, and jacket design.",
        },
      },
      {
        id: "reference-sheet",
        title: "Build a reference sheet before making scenes",
        paragraphs: [
          `Generate a neutral reference set before asking for dramatic shots. Useful views include front, three-quarter, profile, full body, and two controlled expressions. Keep the background simple so the model is not learning accidental scene details as part of the character.`,
          `Pick one approved version as the canonical reference. If your image or video model supports reference images, character references, identity strength, seeds, or similar controls, use the same approved asset consistently. The exact control names vary by model, so treat the reference sheet as portable creative documentation rather than a feature tied to one vendor.`,
        ],
      },
      {
        id: "change-one-layer",
        title: "Change one creative layer at a time",
        steps: [
          {
            title: "Lock identity",
            body: "Keep the master character description and reference image stable.",
          },
          {
            title: "Set the shot",
            body: "Choose framing and lens language before adding action: close-up, medium, full body, overhead, low angle, or over-the-shoulder.",
          },
          {
            title: "Add one action",
            body: "Use a clear physical action with a readable start and end. Complex multi-step actions often create anatomy or continuity problems.",
          },
          {
            title: "Add environment and light",
            body: "Describe location, time of day, major light direction, and the few props that matter to the story.",
          },
        ],
      },
      {
        id: "continuity-check",
        title: "Use a continuity checklist, not your memory",
        bullets: [
          "Face: same proportions, eye color, nose, jaw, and age cues.",
          "Hair: same cut, length, texture, part, and color unless the story changes it.",
          "Signature details: earrings, glasses, scars, logos, or props remain on the correct side.",
          "Wardrobe: colors, closures, sleeves, shoes, and accessories match adjacent shots.",
          "Scale: character height and prop size remain believable across camera angles.",
          "Environment: doors, windows, major furniture, vehicles, and weather do not teleport between cuts.",
        ],
        callout: {
          title: "Continuity beats isolated beauty",
          body: "A slightly less impressive frame that matches the surrounding shots is usually more useful than a beautiful frame that makes the character look like a different person.",
        },
      },
      {
        id: "video-handoff",
        title: "Hand off to video with motion instructions, not a new character prompt",
        paragraphs: [
          `When animating a still, the image already carries identity. The video prompt should focus on what changes over time: subject motion, camera motion, environmental motion, timing, and what must remain fixed. Re-describing the entire character can invite the model to reinterpret features that were already correct.`,
          `For multi-shot sequences, write a short continuity note between shots: “same jacket, same wet street, camera moves from medium profile to rear tracking shot.” This gives you a practical edit target even when individual generations vary.`,
        ],
      },
    ],
    relatedPromptSlugs: ["img-character-sheet", "char-identity-lock", "char-turnaround-sheet"],
    relatedNicheSlugs: ["ai-cat-and-pet-stories", "zombie-apocalypse-drama", "ai-influencer-product-reviews"],
  },
  {
    slug: "write-ai-image-prompts",
    title: "How to Write AI Image Prompts for Faceless Content",
    seoTitle: "How to Write AI Image Prompts for Faceless Content",
    description:
      "Write clearer AI image prompts for thumbnails, story frames, characters, products, and faceless videos using subject, action, scene, camera, light, and constraints.",
    eyebrow: "Image prompting",
    category: "Prompting",
    readMinutes: 8,
    updated: "October 7, 2026",
    summary:
      "Strong image prompts behave more like art direction than adjective lists. Give the model a clear subject, scene, composition, lighting plan, and constraints in the order that matters to the image.",
    takeaways: [
      "Lead with the subject and the visual job of the image.",
      "Describe composition and camera before adding style words.",
      "Use concrete light sources and materials instead of vague ‘cinematic’ adjectives.",
      "Keep negative constraints short and tied to real failure modes.",
    ],
    sections: [
      {
        id: "prompt-an-image-job",
        title: "Give the image a job",
        paragraphs: [
          `A thumbnail, a story frame, a product beauty shot, and a character reference are different image jobs. Start by naming the job internally before you write the visual description. The same subject should be composed differently depending on where the image will be used.`,
          `For a thumbnail, leave deliberate negative space for text and favor one readable focal point. For a story frame, prioritize continuity with adjacent shots. For a character sheet, remove dramatic perspective and use neutral lighting so identity is easier to compare.`,
        ],
      },
      {
        id: "six-parts",
        title: "A six-part prompt structure",
        steps: [
          { title: "Subject", body: "Who or what is the focal point? Include only identity details that materially change the result." },
          { title: "Action", body: "What is happening in this exact frame? Prefer one readable action." },
          { title: "Scene", body: "Where is it, what time is it, and which environmental details support the story?" },
          { title: "Composition", body: "Specify framing, angle, focal placement, depth, and useful negative space." },
          { title: "Lighting and material", body: "Name the source and quality of light plus important textures: soft window light, hard noon sun, wet asphalt reflections, brushed metal." },
          { title: "Constraints", body: "State the few things that must not change or appear, especially continuity requirements." },
        ],
        example: {
          label: "Structured example",
          text: "YouTube thumbnail frame: weathered red 1969 Mustang half-revealed inside a dusty wooden barn, tarp being pulled from the hood, three-quarter front view, car filling the right two-thirds of frame, clear dark negative space at upper left for title text, narrow shafts of warm morning light through wall gaps, visible dust in air, realistic oxidized paint and chrome, no people, no logos, no text in image.",
        },
      },
      {
        id: "specific-not-bloated",
        title: "Be specific without making the prompt bloated",
        paragraphs: [
          `Long prompts are not automatically better. Extra adjectives can compete with the main composition. Add detail when it controls a decision the model must make: which side the subject faces, where empty space belongs, how light enters, which clothing detail must remain consistent, or what era the environment represents.`,
          `Remove adjectives that merely restate quality. “Beautiful, stunning, amazing, hyper-detailed, professional” usually contributes less than one concrete visual instruction such as “soft side light from a single north-facing window.”`,
        ],
      },
      {
        id: "iterate-diagnostically",
        title: "Iterate by diagnosing one failure at a time",
        bullets: [
          "Wrong composition: change framing, angle, or subject placement before changing style.",
          "Wrong identity: strengthen the reference or identity block; do not add more scene adjectives.",
          "Flat lighting: name the light source, direction, softness, and contrast.",
          "Too much clutter: identify the hero object and remove secondary props.",
          "Unreadable thumbnail: increase subject scale and simplify the background.",
          "Inconsistent series: reuse a stable palette, camera grammar, and character reference.",
        ],
      },
      {
        id: "thumbnail-rule",
        title: "For thumbnails, optimize for recognition before decoration",
        paragraphs: [
          `A thumbnail is viewed small. Fine details disappear. Build around a simple silhouette, a clear focal object or face, and strong separation between subject and background. If the concept only works when viewed full-screen, it is probably too complicated for a thumbnail.`,
          `Generate the visual without baked-in text whenever possible, then add typography in an editor. That gives you control over wording, spelling, hierarchy, contrast, and mobile legibility.`,
        ],
      },
    ],
    relatedPromptSlugs: ["img-thumbnail-composition", "img-storyboard-frames", "img-ai-influencer"],
    relatedNicheSlugs: ["ai-car-wash-and-restoration", "ai-asmr-cooking-cleaning-restoration", "ai-influencer-product-reviews"],
  },
  {
    slug: "write-ai-video-prompts",
    title: "How to Write AI Video Prompts That Produce Usable Shots",
    seoTitle: "How to Write AI Video Prompts That Produce Usable Shots",
    description:
      "Write AI video prompts with clear subject action, camera movement, timing, environment motion, and continuity so generated clips are easier to edit together.",
    eyebrow: "Video prompting",
    category: "Prompting",
    readMinutes: 9,
    updated: "October 7, 2026",
    summary:
      "A useful video prompt describes change over time. Instead of stacking visual adjectives, define the shot's starting state, subject action, camera movement, environmental motion, and end state.",
    takeaways: [
      "Prompt one shot, not an entire scene montage.",
      "Separate subject motion from camera motion.",
      "Define a simple start and end state when timing matters.",
      "Write adjacent shots with editing continuity in mind.",
    ],
    sections: [
      {
        id: "motion-not-image",
        title: "A video prompt is not an image prompt with the word ‘moving’ added",
        paragraphs: [
          `An image prompt describes a frame. A video prompt must describe what changes between frames. If you spend most of the prompt on static appearance, the model has to invent the motion. That can produce drifting cameras, unnecessary gestures, or subjects that change shape as the clip progresses.`,
          `Start with the action you need for the edit. Then define how the camera observes it. Appearance can be inherited from a reference image or described briefly if you are generating from text alone.`,
        ],
      },
      {
        id: "five-parts",
        title: "Use a five-part shot structure",
        steps: [
          { title: "Starting state", body: "Describe the subject and camera at the first beat of the shot." },
          { title: "Subject action", body: "Give one primary physical action with a clear direction or intention." },
          { title: "Camera movement", body: "Choose one main camera behavior: locked, slow push-in, lateral track, orbit, handheld follow, crane up, or another precise move." },
          { title: "Environment motion", body: "Add only the motion that supports realism or story: rain, steam, dust, passing lights, cloth, crowd movement." },
          { title: "End state", body: "When the cut depends on a final position, say where the subject and camera should finish." },
        ],
        example: {
          label: "Shot prompt example",
          text: "Start on a medium three-quarter view of a rusty 1969 Mustang inside a dim barn. A gloved hand pulls the dusty tarp backward in one smooth motion, revealing the hood and grille. Camera performs a slow 20-degree lateral slide to the right while maintaining the car as the focal point. Fine dust falls through warm sunbeams; tarp fabric ripples naturally. End with the Mustang grille fully visible and camera settled at a lower front angle. No sudden zoom, no extra people, no vehicle movement.",
        },
      },
      {
        id: "one-shot",
        title: "Keep each generation responsible for one edit decision",
        paragraphs: [
          `Trying to generate a wide shot, close-up, orbit, reaction, and transition inside one short clip gives the model too many directing decisions. Generate separate shots and make the montage in the edit. This also makes failures cheaper: you replace one bad shot instead of regenerating an entire sequence.`,
          `For dialogue or character work, avoid asking for complex body movement, elaborate camera movement, and precise mouth performance at the same time unless the model and reference setup can reliably support it. Decide which element matters most to the shot.`,
        ],
      },
      {
        id: "continuity",
        title: "Write prompts for the cut, not just the clip",
        bullets: [
          "Match screen direction: if the subject exits frame right, the next shot should respect that direction unless the edit intentionally resets it.",
          "Match wardrobe and prop state between adjacent clips.",
          "Keep time of day, weather, and dominant light direction consistent.",
          "Avoid jumping camera height without a reason; it can make generated sequences feel disconnected.",
          "Use establishing shots sparingly. Most short-form sequences benefit from getting to the action quickly.",
        ],
      },
      {
        id: "diagnose",
        title: "Diagnose video failures with motion language",
        paragraphs: [
          `If the subject morphs, simplify the action and strengthen the visual reference. If the camera drifts, state that it is locked or name one exact movement. If the shot feels lifeless, add one environmental motion cue rather than five new style adjectives. If pacing feels wrong, change the action timing or shot duration in the edit instead of forcing a complex sequence into one generation.`,
        ],
        callout: {
          title: "The editor is part of the prompt strategy",
          body: "Generate clean building blocks. Use editing for timing, rhythm, transitions, text, sound, and montage. A generator does not need to solve the entire finished video inside one prompt.",
        },
      },
    ],
    relatedPromptSlugs: ["vid-camera-motion-pack", "vid-veo3-selfie-vlog", "vid-product-spin"],
    relatedNicheSlugs: ["pov-immersive-vlogs", "ai-asmr-cooking-cleaning-restoration", "zombie-apocalypse-drama"],
  },
  {
    slug: "faceless-content-workflow",
    title: "A Repeatable Faceless Content Workflow: Idea to Published Video",
    seoTitle: "Faceless Content Workflow: From Idea to Published Video",
    description:
      "Build a repeatable faceless content workflow from idea selection through research, script, visual plan, generation, editing, quality review, and publishing.",
    eyebrow: "Production system",
    category: "Workflow",
    readMinutes: 10,
    updated: "October 7, 2026",
    summary:
      "Automation works best around a clear editorial process. Standardize the recurring steps, templates, file structure, and checks while keeping topic choice, factual judgment, creative direction, and final approval human.",
    takeaways: [
      "Batch similar decisions instead of trying to finish one video from start to upload before planning the next.",
      "Create a production brief before generating assets.",
      "Use a shot list as the handoff between script and visual generation.",
      "Add a final originality, factual, rights, and continuity review before publishing.",
    ],
    sections: [
      {
        id: "brief",
        title: "Stage 1: Write the production brief",
        paragraphs: [
          `Before the script, write a small brief: audience, one-sentence promise, format, target duration, topic, what the viewer should know or feel by the end, and the evidence or source material you need. This prevents the script generator from deciding the purpose of the video for you.`,
          `The brief should fit on one screen. If it becomes a full essay, you are doing script work too early.`,
        ],
      },
      {
        id: "research-script",
        title: "Stage 2: Research first, then script",
        paragraphs: [
          `For factual topics, collect the claims and sources before drafting narration. Mark uncertain facts instead of allowing the script to smooth over gaps. For fictional or entertainment formats, define the story beats, character goal, conflict, and ending before writing dialogue.`,
          `Generate multiple hook options, but choose one that truthfully matches the payoff. A strong hook narrows attention; it should not promise a result the video never delivers.`,
        ],
      },
      {
        id: "shot-list",
        title: "Stage 3: Convert the script into a shot list",
        paragraphs: [
          `Break the narration into visual beats. Each beat should specify what the viewer sees, what changes during the shot, and why that visual supports the line. This is where a faceless workflow becomes practical: the script is no longer an abstract paragraph; it becomes a list of assets to generate, film, license, or design.`,
        ],
        bullets: [
          "Shot number and approximate duration",
          "Narration or dialogue line covered",
          "Visual objective",
          "Image or source asset needed",
          "Motion or camera direction",
          "On-screen text if necessary",
          "Continuity note from the previous shot",
        ],
      },
      {
        id: "batch",
        title: "Stage 4: Batch by task, not only by video",
        paragraphs: [
          `Once you have several approved briefs, batch similar work: outline three scripts, then generate reference images, then create shots, then record or synthesize voice, then edit. Context switching is expensive. A repeatable channel becomes faster when you make the same kind of decision several times in a row.`,
          `Do not batch low-quality output just because the tooling makes it cheap. The batch should pass the same review standard as a single video.`,
        ],
      },
      {
        id: "edit-sound",
        title: "Stage 5: Edit for comprehension before decoration",
        paragraphs: [
          `First make the sequence understandable without effects. Check whether each cut advances the explanation or story. Then add captions, music, transitions, sound effects, and graphic polish. This order prevents style from hiding structural problems.`,
          `Sound is especially important for faceless content because it carries continuity when the visuals come from multiple generators or sources. Keep narration level, room tone, music intensity, and transition sounds consistent enough that the video feels intentionally assembled.`,
        ],
      },
      {
        id: "review",
        title: "Stage 6: Run a four-part publishing review",
        steps: [
          { title: "Accuracy", body: "Verify factual claims, dates, names, product details, and quotations against reliable sources." },
          { title: "Originality", body: "Ask what this video contributes beyond rearranging material that already exists. Strengthen commentary, explanation, narrative, or original visuals where needed." },
          { title: "Rights and disclosure", body: "Confirm you can use the footage, images, music, likenesses, and claims in the way you intend. Add platform-required AI or sponsorship disclosures when applicable." },
          { title: "Continuity and packaging", body: "Check character identity, props, subtitles, thumbnail promise, title accuracy, description, and links before scheduling." },
        ],
      },
      {
        id: "measure",
        title: "Stage 7: Learn from production and audience signals separately",
        paragraphs: [
          `Track two kinds of feedback. Production feedback tells you where the workflow is slow or unreliable: too many shots, difficult character consistency, excessive research, or expensive generations. Audience feedback tells you which topics and formats hold attention or trigger useful comments.`,
          `Do not solve an audience problem with production automation. If viewers are confused, the fix may be a clearer explanation, not a faster generator. Likewise, do not treat one weak upload as proof that the entire niche is wrong.`,
        ],
      },
    ],
    relatedPromptSlugs: ["niche-faceless-series-bible", "img-storyboard-frames", "seo-full-package"],
    relatedNicheSlugs: ["stickman-explainer-and-skits", "ranking-and-top-5-countdowns", "ai-asmr-cooking-cleaning-restoration"],
  },
  {
    slug: "avoid-generic-ai-videos",
    title: "How to Avoid Generic, Mass-Produced AI Videos",
    seoTitle: "How to Avoid Generic, Mass-Produced AI Videos",
    description:
      "Make AI-assisted faceless videos more original by adding real research, editorial decisions, custom visual direction, meaningful variation, and a channel-specific point of view.",
    eyebrow: "Originality",
    category: "Strategy",
    readMinutes: 8,
    updated: "October 7, 2026",
    summary:
      "The fastest way to make a channel feel mass-produced is to automate the decisions that should define the channel. Use templates for structure and operations, but make the topic framing, evidence, story, visual choices, and final edit meaningfully specific to each video.",
    takeaways: [
      "Templates should standardize workflow, not make every episode interchangeable.",
      "Original value can come from research, explanation, commentary, storytelling, design, or editing.",
      "Replace generic stock-like visuals with shot decisions tied to the actual script.",
      "Review a batch side by side to detect repetition you may miss one video at a time.",
    ],
    sections: [
      {
        id: "template-vs-content",
        title: "Standardize the container, vary the substance",
        paragraphs: [
          `A repeatable intro length, caption style, color palette, folder structure, and shot-list template are useful. They reduce production overhead. The problem starts when the same story beats, visuals, narration phrases, and conclusions are reused with only the subject name changed.`,
          `Think of a news program: the graphics and segment structure can be consistent while every report contains different evidence and reporting. Your faceless format should work the same way.`,
        ],
      },
      {
        id: "originality-layers",
        title: "Add originality at more than one layer",
        bullets: [
          "Research: use primary or high-quality sources instead of copying another creator's summary.",
          "Framing: choose a specific question, comparison, tension, or point of view.",
          "Script: explain why facts matter instead of listing them.",
          "Visuals: design shots around the argument or story rather than using interchangeable background footage.",
          "Editing: use pacing, diagrams, labels, sound, and sequencing to clarify meaning.",
          "Packaging: make the title and thumbnail accurately express the unique angle of that specific video.",
        ],
      },
      {
        id: "batch-test",
        title: "Use the five-video interchangeability test",
        paragraphs: [
          `Open five recent videos from your channel without looking at the titles. If the narration, visual rhythm, examples, and conclusions could be swapped between them with minimal changes, the format is probably too generic.`,
          `A recognizable style is good. Interchangeable substance is not. Keep the signature elements viewers recognize, then give each episode a different central question and evidence path.`,
        ],
        callout: {
          title: "A useful template leaves room for surprise",
          body: "The viewer can know what kind of experience they will get without already knowing every beat of the video.",
        },
      },
      {
        id: "prompting",
        title: "Prompt for decisions, not filler",
        paragraphs: [
          `Ask AI systems for alternatives and structured options instead of asking them to “make a viral script.” For example: request three different explanatory structures, five counterintuitive questions about the source material, or a shot list where each visual proves or illustrates a specific line.`,
          `Then choose, combine, reject, and rewrite. Your editorial selection is part of the creative contribution. A prompt should expand your decision space, not remove your responsibility for the finished work.`,
        ],
      },
      {
        id: "quality-gate",
        title: "Create a quality gate before the upload button",
        steps: [
          { title: "Specificity", body: "Could this script be reused for a different topic by changing a few nouns? If yes, rewrite the weak sections." },
          { title: "Evidence", body: "For factual claims, can you identify where the information came from and whether it is current enough for the topic?" },
          { title: "Visual purpose", body: "Does each generated or sourced shot support the narration, or is it merely moving wallpaper?" },
          { title: "Human approval", body: "Did someone actually watch the final export, check the title and thumbnail promise, and decide it was worth publishing?" },
        ],
      },
    ],
    relatedPromptSlugs: ["niche-repurpose-shorts", "niche-retention-editing", "img-storyboard-frames"],
    relatedNicheSlugs: ["ranking-and-top-5-countdowns", "bible-and-mythology-anime", "stickman-explainer-and-skits"],
  },
  {
    slug: "youtube-ai-content-monetization",
    title: "YouTube AI Content: Disclosure, Reused Content, and Monetization",
    seoTitle: "YouTube AI Content: Disclosure, Reused Content & Monetization",
    description:
      "Understand YouTube's current approach to AI disclosure, inauthentic or mass-produced content, reused content, and monetization for AI-assisted faceless channels.",
    eyebrow: "YouTube policy",
    category: "Policy",
    readMinutes: 10,
    updated: "October 7, 2026",
    summary:
      "YouTube does not treat AI use by itself as a blanket monetization ban. The bigger issues are originality, authenticity, reused material, mass-produced or repetitive content, and disclosure when realistic content has been meaningfully altered or synthetically generated.",
    takeaways: [
      "AI-assisted channels can still be eligible for monetization if they follow YouTube's monetization policies.",
      "YouTube clarified in July 2025 that repetitive or mass-produced content falls under its renamed ‘inauthentic content’ policy.",
      "Reused content is a separate monetization issue from copyright permission or fair use.",
      "YouTube provides AI/altered-content disclosure tools and may apply labels in some cases.",
    ],
    sections: [
      {
        id: "ai-not-ban",
        title: "AI use is not the same thing as inauthentic content",
        paragraphs: [
          `YouTube has stated that creators can use AI tools and remain eligible for monetization. The platform's monetization review focuses on whether the channel follows its policies, including the requirement for original and authentic value.`,
          `This distinction matters for faceless channels. A video can use AI-generated images, animation, voice, or writing assistance and still involve meaningful original work. It can also be produced without AI and still be repetitive, scraped, or minimally transformed. The production tool is not the whole policy question.`,
        ],
      },
      {
        id: "inauthentic",
        title: "What YouTube means by inauthentic or mass-produced content",
        paragraphs: [
          `In July 2025, YouTube renamed its “repetitious content” monetization policy to “inauthentic content” and clarified that repetitive or mass-produced material is included. YouTube describes channels with highly repetitive, template-like videos and minimal meaningful variation as ineligible for monetization under this policy.`,
          `For an AI-assisted creator, the practical lesson is not “avoid templates.” Production templates are normal. The risk is publishing videos whose substance is so similar that they feel interchangeable and contribute little distinct educational, entertainment, or creative value.`,
        ],
      },
      {
        id: "reused",
        title: "Reused content is a different test",
        paragraphs: [
          `YouTube's reused-content policy looks at channels that repurpose material already available on YouTube or elsewhere without enough original commentary, substantive modification, or added educational or entertainment value. YouTube also notes that this monetization policy is separate from copyright enforcement. Having permission to use material does not automatically make a channel eligible under the reused-content review.`,
          `If your faceless format relies on clips, compilations, public-domain material, screenshots, or stock footage, make your contribution visible. Commentary, explanation, original narrative structure, substantive editing, original graphics, and contextualization are stronger signals than simply placing a new voiceover over existing material.`,
        ],
      },
      {
        id: "disclosure",
        title: "When AI or altered-content disclosure matters",
        paragraphs: [
          `YouTube's current help documentation includes a “How this content was made” disclosure area and a “Made with AI” label for content that is meaningfully altered or synthetically generated in relevant cases. The platform has continued updating these disclosure systems as generative media becomes more common.`,
          `Treat disclosure as a transparency step, not a punishment. If realistic synthetic or altered content could lead viewers to believe something real happened when it did not, review YouTube's current disclosure requirements at upload time. Policies and interface wording can change, so the official help page should be your final reference.`,
        ],
      },
      {
        id: "channel-review",
        title: "Monetization review looks beyond a single video",
        paragraphs: [
          `YouTube says reviewers may look at the channel as a whole, including videos, titles, descriptions, and how the content appears to have been created or produced. That means a few original uploads do not necessarily offset a large library of low-effort repetitive material.`,
          `For a growing site or channel, this is a reason to improve the production standard before scaling volume. A smaller library of distinct, useful videos creates a better foundation than hundreds of near-duplicates that you later have to clean up.`,
        ],
      },
      {
        id: "creator-checklist",
        title: "A practical pre-publish policy checklist",
        bullets: [
          "Is the script meaningfully specific to this topic rather than a template with nouns swapped?",
          "If you used third-party material, is your original commentary, modification, or educational/entertainment contribution obvious?",
          "Have you checked copyright and licensing separately from monetization eligibility?",
          "If realistic synthetic or altered content is involved, did you review the current YouTube disclosure requirements?",
          "Does the title and thumbnail accurately represent the finished video?",
          "Would a reviewer understand what you created or added to the channel's content?",
        ],
        callout: {
          title: "Policies can change",
          body: "This guide summarizes official YouTube material checked on October 7, 2026. Always review the current YouTube Help pages before making monetization or disclosure decisions.",
        },
      },
    ],
    relatedPromptSlugs: ["niche-faceless-series-bible", "niche-retention-editing", "seo-full-package"],
    relatedNicheSlugs: ["ranking-and-top-5-countdowns", "vox-style-paper-cut-commentary", "zombie-apocalypse-drama"],
    sources: [
      {
        label: "YouTube channel monetization policies",
        url: "https://support.google.com/youtube/answer/1311392",
        note: "Official YouTube Help page covering inauthentic and reused content.",
      },
      {
        label: "Understanding ‘How this content was made’ disclosures on YouTube",
        url: "https://support.google.com/youtube/answer/15447836",
        note: "Official YouTube Help page explaining AI and altered-content disclosures.",
      },
      {
        label: "Response to creator questions about YPP policies (July 2025)",
        url: "https://support.google.com/youtube/thread/356734251",
        note: "TeamYouTube clarification that AI use itself does not automatically make a channel ineligible for monetization.",
      },
      {
        label: "YouTube spam policy",
        url: "https://support.google.com/youtube/answer/2801973",
        note: "Official policy covering spam, manipulation, and repetitive deceptive behavior.",
      },
    ],
  },
  {
    slug: "faceless-channel-content-pillars",
    title: "How to Build Content Pillars for a Faceless Channel",
    seoTitle: "How to Build Content Pillars for a Faceless Channel",
    description:
      "Turn one faceless niche into clear content pillars that create variety, repeatable planning, stronger internal series, and a more coherent viewer promise.",
    eyebrow: "Content planning",
    category: "Strategy",
    readMinutes: 7,
    updated: "October 7, 2026",
    summary:
      "Content pillars are recurring question types inside one niche. They create enough variety to prevent repetition while keeping the channel recognizable. A good pillar describes what viewers get, not just a vague topic label.",
    takeaways: [
      "Use three to five pillars rather than dozens of disconnected categories.",
      "Define pillars as repeatable viewer questions or outcomes.",
      "Give each pillar its own visual grammar or episode pattern when useful.",
      "Use performance data to adjust the mix, not to erase the channel's core promise after every upload.",
    ],
    sections: [
      {
        id: "what-is-pillar",
        title: "A pillar is a repeatable question, not just a tag",
        paragraphs: [
          `“Cars” is a niche. “Barn-find stories” can be a pillar. “What this restoration decision changes” can be another. “Forgotten models that solved one unusual problem” can be a third. Each pillar gives you a repeatable way to turn the broad niche into a specific episode.`,
          `This is more useful than organizing the channel by arbitrary labels such as “fun,” “educational,” and “viral.” Those words describe tone or ambition, not what the viewer will actually receive.`,
        ],
      },
      {
        id: "three-to-five",
        title: "Start with three to five pillars",
        paragraphs: [
          `Too few pillars can make the channel feel repetitive. Too many can make it look unfocused. Three to five is a practical starting range because it gives you enough variety to compare formats without turning every upload into a new experiment.`,
        ],
        example: {
          label: "Example: science explainer channel",
          text: "Pillar 1: everyday phenomena explained; Pillar 2: myth vs evidence; Pillar 3: one experiment or discovery and why it mattered; Pillar 4: visual comparison of scale, speed, distance, or probability.",
        },
      },
      {
        id: "pillar-test",
        title: "Test whether each pillar can carry a series",
        bullets: [
          "Can you list at least ten non-duplicate episode ideas for it?",
          "Does it fit the channel's core audience and promise?",
          "Can it use a repeatable production structure?",
          "Does it add a different reason to return than the other pillars?",
          "Can you recognize the pillar from a title or thumbnail without needing an internal tag?",
        ],
      },
      {
        id: "series-grammar",
        title: "Give strong pillars a visual and editorial grammar",
        paragraphs: [
          `A myth-versus-evidence series might open with the claim, show the strongest reason people believe it, then test that reason against evidence. A transformation series might open with the finished result, return to the starting condition, then move through three decisive changes.`,
          `The grammar should make planning faster without dictating the conclusion. If every episode reaches the same emotional beat or repeats the same wording, loosen the template.`,
        ],
      },
      {
        id: "calendar",
        title: "Use pillars to build a balanced calendar",
        paragraphs: [
          `Plan upcoming videos by pillar instead of choosing topics randomly. If you publish three times a week, you might rotate three pillars or give your strongest pillar two slots and a testing pillar one slot. The point is visibility: you should be able to see whether the channel is accidentally becoming one repetitive format.`,
          `After enough uploads to have meaningful feedback, compare production cost and audience response by pillar. Retire a pillar when it no longer serves the viewer promise, not simply because one topic underperformed.`,
        ],
      },
    ],
    relatedPromptSlugs: ["niche-faceless-series-bible", "niche-top5-ranking", "niche-faceless-series-bible"],
    relatedNicheSlugs: ["stickman-explainer-and-skits", "ai-car-wash-and-restoration", "ranking-and-top-5-countdowns"],
  },
];

export const ARTICLE_GUIDE_SLUGS = ARTICLE_GUIDES.map((guide) => guide.slug);

export function getArticleGuide(slug: string) {
  return ARTICLE_GUIDES.find((guide) => guide.slug === slug);
}
