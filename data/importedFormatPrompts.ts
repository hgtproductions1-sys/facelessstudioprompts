import type { Prompt } from "./promptLibrary";

export const IMPORTED_FORMAT_PROMPTS: Prompt[] = [
  {
    id: "factory-documentary-shot-list",
    title: "Factory Documentary Shot List and Narration",
    category: "Niche",
    compatibleModels: ["veo-3", "kling", "runway"],
    niche: "Factory Documentaries",
    tips: "Start with a product whose production steps can be verified. A paper notebook or ceramic mug gives you several clear on-screen transformations.",
    prompt: `Plan a faceless industrial documentary from intake to dispatch.

PRODUCT: [PRODUCT]
VERIFIED SOURCE NOTES: [SOURCE NOTES]
TARGET RUNTIME: [RUNTIME]
FRAME: [ASPECT RATIO]

If the product is blank, suggest 20 varied manufacturing ideas and pick one with a visible transformation and an accessible source. Map the confirmed stages in process order. For each stage, list the incoming material, the visible operation, and the material that moves to the next station. Cover inspection, packing, and dispatch where relevant. Flag any process detail that needs checking and leave out unsourced numbers.

Turn the workflow into a timed shot list. Give each shot one self-contained generation prompt with duration, material state, machine action, camera position, lighting, and the final frame that leads into the next step. Use short shots only where the action reads clearly. State the total duration and check it against the sum of shot timings.

Keep the facility layout, machine scale, worker PPE, and product dimensions consistent. Treat generated scenes as a reconstruction and reserve readable labels and titles for editing. Add a short line of voiceover per shot, then finish with the complete continuous narration in a separate section.`,
  },
  {
    id: "anatomical-fitness-single-rep",
    title: "3D Fitness Anatomy and Form B-Roll",
    category: "Video Gen",
    compatibleModels: ["veo-3", "kling", "runway"],
    niche: "3D Fitness Anatomy",
    tips: "Try bench press, lat pulldown, dumbbell curl, squat, or pull-up. Check the muscle overlay and full repetition against a qualified form reference.",
    prompt: `Visualize one controlled repetition as a 10–15 second vertical 9:16 fitness anatomy clip.

EXERCISE: [EXERCISE]
EQUIPMENT: [EQUIPMENT]
FORM REFERENCE: [REFERENCE NOTES]
MUSCLE OVERLAY: [MUSCLE GROUPS]

Use a faceless matte-white anatomical mannequin in charcoal gym shorts. Set one consistent lighting direction with a cool rim light and muted amber overlay. Start with an unobstructed three-quarter view. Show the setup, one complete repetition, and a steady return. Add one side view when it makes the equipment path easier to read.

Keep limb proportions, contact points, and equipment geometry stable. Highlight each confirmed muscle group only during the phase it helps explain. Keep the bar connected to both hands or the machine cable connected to its attachment, as applicable. End on a balanced frame with the equipment controlled. Return the shot timing, visual prompt, and a short checklist for reviewing anatomy and movement before publishing.`,
  },
  {
    id: "horoscope-zodiac-reflection-reel",
    title: "Zodiac Horoscope Reflection Reel",
    category: "Niche",
    compatibleModels: ["veo-3", "kling", "runway"],
    niche: "Horoscope Shorts",
    tips: "Use the same narration rhythm for a series, then vary the emblem, palette, and reflection question for each sign.",
    prompt: `Plan a 30–45 second 9:16 horoscope short framed as astrology entertainment and reflection.

SIGN: [ZODIAC SIGN]
REFLECTION THEME: [THEME]
NARRATION LANGUAGE: [LANGUAGE]
PALETTE: [COLOR PALETTE]

Open with a question that names the sign and introduces the theme. Write a short narration with one relatable situation, one optional reflection, and a closing question the viewer can answer for themselves. Keep the narration free of promised outcomes, diagnoses, and investment recommendations.

Return three visual shots, each with a timed action, lighting, palette, and motion. Start on the sign's emblem, pass through a constellation or celestial transition, and finish on a quiet composition that leaves space for captions. Use one steady narration voice and simple background music in the edit. Append a concise caption split and a final entertainment label.`,
  },
  {
    id: "guess-the-logo-quiz-reveal",
    title: "Guess the Logo Quiz with a Five-Second Hold",
    category: "Niche",
    compatibleModels: ["veo-3", "kling", "runway"],
    niche: "Logo Quiz",
    tips: "Composite authorized logo files in the editor. That keeps the clue faithful and the answer legible.",
    prompt: `Create a 10-second vertical 9:16 logo-guessing round for each supplied asset.

CATEGORY: [BRAND CATEGORY]
LOGO ASSETS APPROVED FOR USE: [LOGO ASSETS]
ROUND COUNT: [ROUND COUNT]
DIFFICULTY: [DIFFICULTY]

Return a round sheet with the source asset, the exact brand spelling, the clue treatment, and a matching reveal. Use exactly one brand per round. For a wordmark, cover one or two letters during the clue while keeping the remaining letter positions intact. With a symbol-only mark, use the symbol as the clue. If an asset or answer is unclear, flag it for review before writing that round.

Use 0–1 seconds for a clean radial-burst background, 1–2 seconds for a quick scale-and-settle logo pop, 2–3 seconds for a short spoken question, 3–8 seconds for an exact five-second silent hold, and 8–10 seconds for the complete brand-name reveal and spoken answer. Provide the background prompt and editing instructions separately. Leave any countdown and the original logo art for the edit. Keep the layout consistent across rounds.`,
  },
  {
    id: "printed-quiz-sheet-pen-reveal",
    title: "Printed Quiz Sheet with a Pen-Tick Reveal",
    category: "Niche",
    compatibleModels: ["veo-3", "kling", "runway"],
    niche: "Printed Quiz Sheets",
    tips: "Typeset or print the worksheet yourself. Check that the hand lands on the same question number, letter, and answer in the key.",
    prompt: `Plan an overhead 9:16 quiz short built around one physical worksheet.

QUIZ TOPIC: [TOPIC]
QUESTION COUNT: [QUESTION COUNT]
AUDIENCE LEVEL: [AUDIENCE LEVEL]
SOURCE NOTES: [SOURCE NOTES]

Write the requested number of distinct questions, each with 3–4 short options and exactly one unambiguous correct answer. Vary the correct option position. Provide clean, print-ready text for one page and a separate answer key. Check that every question fits on the fixed sheet and every spoken question fits within its allocated time.

Give each question a 10-second scene. Start with narration that reads only the question. Hold still and silent for five seconds after the narration ends. Then show the same hand entering from the edge and placing one tick by that question's answer. For each scene specify the exact question number, letter, and answer text. Preserve earlier ticks and keep the worksheet, camera, desk, pen, and lighting fixed. Supply one initial reference shot description and one prompt per scene, with any countdown reserved for post-production.`,
  },
  {
    id: "daily-prayer-eight-short-series",
    title: "Eight-Part Daily Prayer Shorts Series",
    category: "Niche",
    compatibleModels: ["veo-3", "kling", "runway", "elevenlabs"],
    niche: "Daily Prayer Shorts",
    tips: "Record the prayers and time the captions first, then choose B-roll movements that leave room for the spoken pauses.",
    prompt: `Plan eight calm 9:16 daily prayer shorts.

TRADITION: [FAITH TRADITION]
NARRATION LANGUAGE: [LANGUAGE]
TIME PER VIDEO: [RUNTIME]
VISUAL PALETTE: [COLOR PALETTE]

Prepare one short each for morning guidance, restful sleep, strength, family, peace, healing, gratitude, and hope. Give each episode a distinct opening sentence and one grounded visual motif, such as dawn fog, a softly lit window, or hands around a kitchen table.

For each episode, deliver a spoken prayer with natural pauses, one slow camera prompt, approximate caption timings, and a brief audio note. Keep the music below the voice and use gentle room or nature ambience where it fits. Express healing as a request for comfort and support. When quoting scripture, use the supplied reference and translation, or mark the wording as a paraphrase.`,
  },
  {
    id: "affiliate-product-commercial-b-roll",
    title: "Affiliate Product Commercial B-Roll",
    category: "Video Gen",
    compatibleModels: ["veo-3", "kling", "runway"],
    niche: "AI Influencer Product Reviews",
    tips: "Check every generated angle against the original product image, especially packaging text, caps, controls, and proportions.",
    prompt: `Create a 9:16 commercial B-roll sequence from an approved product reference.

PRODUCT: [PRODUCT]
REFERENCE IMAGE: [REFERENCE IMAGE]
VISIBLE FEATURE: [FEATURE]
SURFACE AND LIGHTING: [SET DESCRIPTION]

Build three shots: a clean establishing frame, a close-up of the chosen feature, and a closing hero shot with room for the disclosure and call to action. Use controlled movement, plausible reflections, and consistent product scale. Keep the exact silhouette, color, materials, visible controls, and packaging consistent with the approved reference. Keep any unreadable label detail out of the shot or composite the approved packaging in post.

Return a short timing plan and a stand-alone prompt for each shot. Limit demonstrations to visible, verified behavior. Put any pricing, product claims, and affiliate disclosure in the edit using the supplied copy.`,
  },
  {
    id: "affiliate-virtual-presenter-demo",
    title: "Virtual Presenter Affiliate Product Demo",
    category: "Video Gen",
    compatibleModels: ["veo-3", "kling", "runway"],
    niche: "AI Influencer Product Reviews",
    tips: "Add a clear affiliate disclosure before the call to action and identify the presenter as virtual where applicable.",
    prompt: `Create a vertical product demo with a fictional adult presenter and an approved product image.

PRODUCT: [PRODUCT]
APPROVED PRODUCT IMAGE: [REFERENCE IMAGE]
PRESENTER: [CHARACTER DESCRIPTION]
APPROVED DEMO LINE: [SCRIPT]
LIFESTYLE SETTING: [LOCATION]

Use a medium shot of the presenter holding the product in a believable grip, followed by a close shot of one verified feature. Keep the product shape, color, scale, visible packaging, and hand position consistent through the cut. Use an original adult presenter or a reference that has been approved for this use.

Deliver a short shot list, the exact line as provided, and a final composition with room for the affiliate disclosure. Keep the demonstration factual and use wording that reflects the presenter is virtual. Omit first-person testing claims and performance promises unless the supplied copy is backed by real documentation.`,
  },
  {
    id: "scripted-ai-podcast-clip",
    title: "Scripted AI Podcast Clip with Clean Dialogue",
    category: "Video Gen",
    compatibleModels: ["veo-3", "kling", "runway", "elevenlabs"],
    niche: "Scripted Podcast Clips",
    tips: "Read the script aloud and split it between natural pauses before generating multiple takes.",
    prompt: `Create a vertical 9:16 scripted podcast clip with one fictional adult speaker.

SPEAKER: [CHARACTER DESCRIPTION]
SCRIPT: [SCRIPT]
LANGUAGE AND ACCENT: [LANGUAGE AND ACCENT]
STUDIO: [STUDIO DESCRIPTION]

Frame the speaker chest-up in warm studio light. Place a boom microphone near the mouth without obscuring it. Keep the gaze slightly off-camera toward an implied interviewer. Use natural blinking, small pauses, subtle gestures, and a steady camera. Keep the speaker, wardrobe, microphone position, and background fixed.

Have the speaker deliver the supplied script word for word. Keep the audio clean and dry with no added dialogue. If the line runs long, identify natural breakpoints and return one prompt per clip using the same set and reference. Save captions for editing and label the finished segment as scripted with a virtual presenter.`,
  },
  {
    id: "original-construction-brick-timelapse",
    title: "Original Construction-Brick Build Timelapse",
    category: "Video Gen",
    compatibleModels: ["veo-3", "kling", "runway"],
    niche: "DIY Cardboard & Miniature Builds",
    tips: "Use matching end frames between clips. Check that built pieces stay attached and that the final reveal matches the approved design.",
    prompt: `Design a 9:16 fixed-camera timelapse of an original miniature assembled from generic interlocking bricks.

ORIGINAL BUILD: [BUILD DESIGN]
REFERENCE SKETCH: [REFERENCE IMAGE]
BRICK PALETTE: [COLOR PALETTE]
DURATION: [RUNTIME]

Start with one brick and use plausible hand placements to build out a base, a recognizable silhouette, and the final details. Use one desk, one viewpoint, steady soft light, and a consistent scale. Plan successive milestones so every clip starts from the previous clip's ending state. Show the hand connecting each featured piece and keep the rest of the build physically stable between cuts.

End with the completed unbranded model in the same frame. Provide a timed milestone list, generation prompts, and a separate short narration that points out what changes at each stage.`,
  },
];
