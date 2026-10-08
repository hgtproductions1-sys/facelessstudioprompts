export type PromptCategory = "Image Gen" | "Video Gen" | "SEO" | "Character" | "Niche";

export type Prompt = {
  id: string;
  title: string;
  category: PromptCategory;
  niche?: string;
  prompt: string;
  tips?: string;
  reactions?: number;
};

export const PROMPT_CATEGORIES: PromptCategory[] = [
  "Image Gen",
  "Video Gen",
  "SEO",
  "Character",
  "Niche",
];

export const PROMPTS: Prompt[] = [
  // ---------------------------------------------------------------- SEO
  {
    id: "seo-title-generator",
    title: "YouTube Title Generator (Title Ideas)",
    category: "SEO",

    tips: "Paste your topic in the brackets. Pick the title with the strongest curiosity gap, not the cleverest one.",
    prompt: `You are a YouTube packaging strategist.

TOPIC: [PASTE YOUR TOPIC]
NICHE: [PASTE YOUR NICHE]
FORMAT: [Shorts / Long-form]

Write 15 video titles. Rules:
- Maximum 60 characters each so nothing truncates on mobile.
- Each title must open a curiosity gap without being clickbait that the video can't pay off.
- Use at least 4 different patterns across the set: number list, negative/warning, question, "how X did Y", contrarian statement, story tease.
- No emojis, no ALL CAPS words except one optional power word.
- Include the primary keyword in the first 3 words for at least 5 of them.

Output as a numbered list. After each title, append a pipe, a clarity and curiosity assessment (LOW / MID / HIGH), and a 6-word reason. Do not predict click-through rates.`,
  },
  {
    id: "seo-description-generator",
    title: "Video Description Generator",
    category: "SEO",

    prompt: `Write a YouTube video description for the video below.

TITLE: [PASTE TITLE]
TOPIC: [PASTE TOPIC]
NICHE: [PASTE NICHE]
CHANNEL: [CHANNEL NAME]

Structure exactly:
1. Hook paragraph (2-3 sentences, ~250 characters) that repeats the primary keyword naturally in the first sentence and makes the viewer want to keep watching.
2. "In this video:" — 5 bullet points describing what is covered, each starting with a verb.
3. Timestamps block using only timings supplied with the finished video. If timing is unknown, use placeholder chapter times and label them as placeholders.
4. A 2-sentence call to action to subscribe and to check the pinned comment.
5. A 3-line disclaimer block (educational purposes / not professional advice / some links may be affiliate links).
6. A final line of 10 comma-separated keyword phrases.

Keep total length between 900 and 1400 characters. Plain text only, no markdown.`,
  },
  {
    id: "seo-tags-generator",
    title: "Tags Generator (30 Tags, 500 Characters)",
    category: "SEO",

    prompt: `Act as a YouTube SEO specialist. For the video below, generate a tag set.

TITLE: [PASTE TITLE]
NICHE: [PASTE NICHE]

Rules:
- Exactly 30 tags, comma separated, total under 500 characters.
- Tag 1 must be the exact primary keyword.
- Tags 2-8: close variations and long-tail versions of the primary keyword.
- Tags 9-20: related search phrases a viewer of this niche types.
- Tags 21-30: broad category tags plus 2 competitor channel-style tags.
- All lowercase, no hashtags, no duplicates, no single generic words like "video".

Output only the comma-separated tag string on one line, then on a new line report the total character count.`,
  },
  {
    id: "seo-hashtag-generator",
    title: "Shorts Hashtag Generator",
    category: "SEO",

    prompt: `Generate hashtags for a faceless short-form video.

TOPIC: [PASTE TOPIC]
PLATFORM: [YouTube Shorts / TikTok / Instagram Reels]

Return three groups:
BROAD (3 relevant broad-topic hashtags).
SPECIFIC (5 hashtags closely related to the topic).
NICHE (7 hashtags for the precise subject or community).

Then output a single ready-to-paste line of the 8 best hashtags with a mix of broad and specific topics, ordered by relevance. No explanations after that line.`,
  },
  {
    id: "seo-channel-name",
    title: "Faceless Channel Name Generator",
    category: "SEO",

    prompt: `You are a brand naming expert for faceless YouTube channels.

NICHE: [PASTE NICHE]
TONE: [dark / cinematic / calm / playful / premium]
AUDIENCE: [PASTE AUDIENCE]

Generate 25 channel names. Rules:
- One or two words preferred, maximum three.
- Easy to spell after hearing it once, no numbers, no hyphens.
- No trademarked terms and no creator's personal name.
- Must still make sense if the channel expands to adjacent topics in the same niche.

Group them: 10 Evocative, 10 Descriptive, 5 Abstract.
For each name add a 6-word positioning line and a suggested handle in the form @name. Do not claim that the handle is available; ask me to check it.
Finish with your top 3 picks and one sentence each on why.`,
  },
  {
    id: "seo-full-package",
    title: "Complete SEO Package (Title + Description + Tags)",
    category: "SEO",

    tips: "This is the one-shot prompt — run it once per video and you have your entire upload screen filled.",
    prompt: `You are handling the full upload package for a faceless YouTube video.

TOPIC: [PASTE TOPIC]
NICHE: [PASTE NICHE]
VIDEO LENGTH: [e.g. 8 minutes]
TARGET VIEWER: [PASTE AUDIENCE]

Deliver, in this exact order and with these exact section headers:

TITLES
5 options, each under 60 characters, ranked by clarity and relevance to the finished video.

THUMBNAIL TEXT
5 options, maximum 4 words each, that do NOT repeat the title wording.

DESCRIPTION
900-1300 characters: hook paragraph, 5 bullets, 6 timestamps starting at 00:00, subscribe CTA, disclaimer.

TAGS
30 comma-separated tags under 500 characters total.

HASHTAGS
3 hashtags for the title area, 8 for the description.

PINNED COMMENT
One comment under 200 characters designed to start a debate in the replies.

Plain text output only.`,
  },

  // ---------------------------------------------------------------- Image Gen
  {
    id: "img-character-sheet",
    title: "Consistent Character Sheet (Master Reference)",
    category: "Image Gen",
    niche: "AI Influencer",

    tips: "Generate this once, then feed the resulting image back as a reference for every subsequent shot.",
    prompt: `Character reference sheet, single subject repeated across a clean grid, 6 panels on a neutral light grey seamless background (#e6e6e6).

SUBJECT: 28-year-old [gender] with [hair colour and cut], [eye colour] eyes, [skin tone] skin, [one distinctive permanent feature: freckles across nose / small scar above left eyebrow / silver septum ring], wearing [exact outfit: charcoal wool overcoat, black crew neck, dark denim].

PANELS: front full body, three-quarter left, profile left, back, waist-up neutral expression, waist-up subtle smile.

Consistent flat studio lighting from a large softbox at 45 degrees camera left, no coloured gels, no shadows on the background. Shot on 85mm lens, f/5.6, sharp focus edge to edge, photorealistic skin texture with visible pores, natural colour grading.

Identical face geometry, identical hairstyle, identical wardrobe in every panel. No text, no watermarks, no logos, no additional people, no props.

Aspect ratio: 3:2.`,
  },
  {
    id: "img-nano-banana-portrait",
    title: "Nano Banana Hyper-Real Portrait",
    category: "Image Gen",

    prompt: `Using the attached reference image as the exact identity, generate a new photorealistic portrait of the same person. Do not change facial structure, eye shape, nose, jawline, hairline, or skin tone.

NEW SCENE: [describe: standing on a rain-soaked city street at night, neon signs reflecting in puddles behind them].
WARDROBE: [describe exactly].
LIGHTING: soft key light from camera left, cool rim light from behind right, practical neon sources visible in the background bokeh.
CAMERA: 50mm lens, f/1.8, shallow depth of field, subject sharp, background compressed and blurred.
FINISH: natural skin texture with pores and fine hairs visible, no beauty smoothing, no plastic sheen, subtle film grain, colour graded with cool shadows and warm highlights.

Keep the identity 100% consistent with the reference. Photorealistic, editorial photography quality, 4K detail.`,
  },
  {
    id: "img-anime-to-realistic",
    title: "Anime Character → Realistic Human",
    category: "Image Gen",
    niche: "Anime",

    prompt: `Convert the attached anime character into a photorealistic real human being while preserving every design signature.

PRESERVE: exact hair colour and silhouette, eye colour, outfit design and colour palette, accessories, signature pose, and overall vibe.
TRANSLATE: stylised proportions into realistic human anatomy, flat cel shading into real subsurface-scattering skin, anime eyes into realistic eyes of the same colour with matching intensity.

RENDER AS: full body editorial photograph, shot on 85mm at f/2.0, studio three-point lighting with a soft key camera left and a coloured rim light matching the character's dominant accent colour, dark neutral backdrop.

Photorealistic skin texture, real fabric weave and stitching on the costume, realistic hair strands with flyaways, cinematic colour grade. No cartoon lines, no cel shading, no text.

Aspect ratio: 2:3.`,
  },
  {
    id: "img-cartoon-horror",
    title: "Cartoon Horror Creature",
    category: "Image Gen",
    niche: "Drama",

    prompt: `A cartoon horror illustration: [describe creature, e.g. a grinning porcelain doll with too many teeth and hollow button eyes], drawn in a 1930s rubber-hose animation style corrupted into nightmare fuel.

STYLE: thick confident ink outlines, limited palette of bone white, dried blood red and deep charcoal, heavy film-scratch texture and vignette like a damaged reel.
COMPOSITION: creature centre frame, slightly low angle so it looms over the viewer, empty negative space around it.
LIGHTING: single harsh light source from below, long distorted shadow thrown up the wall behind.
MOOD: unsettling, uncanny, silent — the moment before it moves.

No gore, no blood spatter, no text, no watermark. High detail, print quality.

Aspect ratio: 16:9.`,
  },
  {
    id: "img-pixel-game-pov",
    title: "Pixel Game POV Frame",
    category: "Image Gen",

    prompt: `First-person POV pixel art game screenshot, 32-bit era aesthetic.

SCENE: [describe, e.g. standing at the entrance of a flooded subway tunnel, torchlight ahead].
UI: retro HUD along the bottom — heart containers top left, stamina bar, an inventory hotbar of 6 slots, small minimap top right.
PALETTE: 24 colours maximum, dithered gradients, strong contrast between lit and unlit areas.
DETAIL: crisp pixel edges, no anti-aliasing, no blur, visible pixel grid, subtle CRT scanline overlay.

Composed as a real playable frame, not concept art. No modern typography, no photorealism.

Aspect ratio: 16:9.`,
  },
  {
    id: "img-ai-influencer",
    title: "AI Influencer Lifestyle Shot",
    category: "Image Gen",
    niche: "AI Influencer",

    tips: "Attach your character sheet as a reference so the face stays locked across the whole feed.",
    prompt: `Photorealistic lifestyle photograph of the same person as the attached reference. Identity must remain identical — same face, same hair, same body proportions.

SCENE: [e.g. sitting at a corner table in a sunlit Lisbon café, iced coffee on the table, tiled wall behind].
WARDROBE: [exact outfit].
POSE: candid, mid-gesture, looking slightly off camera, natural body language, not posed for the lens.
CAMERA: 35mm lens, f/2.2, eye level, subject placed on the right third.
LIGHT: warm natural window light from camera left, soft falloff, gentle highlight on the cheekbone.
FINISH: real skin texture with pores and fine hair, slight lens vignette, natural colour science like a Fujifilm sensor, no beauty filter, no HDR look.

Instagram editorial quality, believable as a real photo. No text, no logos, no extra hands or fingers.

Aspect ratio: 4:5.`,
  },
  {
    id: "img-room-transformation",
    title: "Room Transformation (Before → After)",
    category: "Image Gen",

    prompt: `Using the attached photo of a room as the exact base, generate the transformed "after" version.

KEEP IDENTICAL: room dimensions, window positions and shapes, door placement, ceiling height, and the camera angle and lens of the original photo.
CHANGE TO: [target style, e.g. warm Japandi — oak flooring, off-white lime-wash walls, low linen sofa, paper pendant lamp, three potted plants, minimal styling].
LIGHTING: golden hour daylight entering through the existing window, soft bounce fill, realistic contact shadows under every object.
RENDER: architectural interior photography, 24mm lens, f/8, verticals perfectly straight, photorealistic materials with accurate reflections and texture.

No people, no text, no floating furniture, nothing that ignores the original room geometry.

Aspect ratio: 3:2.`,
  },
  {
    id: "img-4k-upscale",
    title: "4K Detail Restoration & Upscale",
    category: "Image Gen",

    prompt: `Upscale and restore the attached image to 4K resolution.

DO: reconstruct fine detail in skin pores, individual hair strands, fabric weave, and background texture; remove compression artefacts, banding and colour noise; recover shadow detail without lifting the black point; sharpen edges naturally.
DO NOT: change the subject's identity, facial proportions, expression, pose, wardrobe, framing, or colour grade. Do not add jewellery, makeup, or background objects that were not there. Do not smooth skin into plastic.

Output a photorealistic, print-ready image that looks like the original was shot on a higher resolution sensor. Preserve natural film grain at a reduced level.`,
  },

  // ---------------------------------------------------------------- Video Gen
  {
    id: "vid-veo3-selfie-vlog",
    title: "Veo 3 Selfie Vlog (Talking Head)",
    category: "Video Gen",
    niche: "POV Vlog",

    tips: "Keep dialogue under 20 words for an 8-second clip or the delivery gets rushed.",
    prompt: `A selfie-style vlog shot on a phone front camera, handheld at arm's length.

SUBJECT: [describe person: mid-20s woman, curly dark hair, olive green windbreaker].
LOCATION: [e.g. a windy clifftop path above the sea at golden hour].
ACTION: she walks toward camera while talking, wind moving her hair, occasionally glancing past the lens at the view.
CAMERA: front-facing phone lens, slight wide-angle distortion, natural handheld micro-shake, subject fills the left two-thirds of frame.
LIGHTING: warm low sun behind her creating a rim light, face lifted by soft sky bounce.
AUDIO: her voice close and slightly breathy from walking, real wind noise, distant waves, no music.
DIALOGUE (spoken by the subject): "[write one line, under 20 words, conversational, no narration voice]"

Photorealistic, natural colour, 8 seconds, no subtitles, no text overlays, no cuts.`,
  },
  {
    id: "vid-pov-night-forest",
    title: "POV Night Forest Walk",
    category: "Video Gen",
    niche: "POV Vlog",

    prompt: `First-person POV, camera mounted at eye level on a person walking.

SCENE: a dense pine forest at 2am. A handheld torch beam sweeps left to right across trunks and low mist. Breath fogs faintly at the bottom of frame.
MOVEMENT: slow forward walk, natural footstep bounce, the beam leading the eye, one hesitant pause when a sound comes from the right and the beam swings toward it.
CAMERA: 18mm wide, deep shadows, heavy natural vignetting, torch is the only light source, everything beyond 8 metres falls to black.
AUDIO: crunching pine needles underfoot, distant owl, one sharp branch snap off-screen right, breathing close to the mic. No music, no narration.
GRADE: desaturated cold blues in shadow, warm tungsten torch beam, visible sensor grain.

Photorealistic, continuous single take, 8 seconds, no text.`,
  },
  {
    id: "vid-asmr",
    title: "ASMR Close-Up Trigger Loop",
    category: "Video Gen",
    niche: "ASMR",

    prompt: `Extreme close-up macro video for ASMR.

SUBJECT: [e.g. hands slowly slicing a translucent bar of kinetic sand with a chrome blade].
CAMERA: 100mm macro lens, f/4, subject fills the entire frame, shallow focus with a slow rack focus across the action, locked-off tripod, zero camera shake.
MOTION: deliberate and slow, one continuous action from start to finish, no cuts.
LIGHTING: soft top light with a subtle warm rim, gentle specular highlights on every edge, clean dark background.
AUDIO: binaural, very close mic — crisp cutting sound, fine granular crumble, soft fabric contact, no music, no voice, no room echo.
FINISH: photorealistic, 4K detail, satisfying and tactile.

8 seconds, seamless loop-friendly start and end pose, no text.`,
  },
  {
    id: "vid-ai-cooking-anime",
    title: "AI Cooking Anime Sequence",
    category: "Video Gen",
    niche: "Animal Cooking",

    prompt: `Anime-style cooking sequence in the visual language of a modern Japanese food anime.

SCENE: [e.g. a small wooden kitchen at dawn, steam catching the light from a paper window].
ACTION: hands lift the lid of a clay pot, steam bursts upward in slow motion, broth ripples, a ladle draws up noodles that stretch and glisten.
STYLE: hand-drawn cel animation, clean line work, lush painted backgrounds, exaggerated food shine and steam volume, sakuga-quality motion on the hero action.
CAMERA: starts wide, pushes in fast on the pot, snap cut to macro on the broth surface, then slow pull back.
AUDIO: bubbling broth, sizzling, a soft chime, gentle piano underscore. No dialogue.
GRADE: warm ambers and soft golds, glowing highlights.

8 seconds, no subtitles, no text on screen.`,
  },
  {
    id: "vid-cardboard-diy",
    title: "Cardboard DIY Build Time-Lapse",
    category: "Video Gen",

    prompt: `Top-down time-lapse of a cardboard DIY build.

SETUP: overhead camera locked directly above a wooden workbench, frame filled edge to edge with the work surface.
ACTION: two hands cut, fold, glue and assemble [object: a working mini vending machine] from plain corrugated cardboard. The build progresses visibly: flat sheets, cut pieces, folded body, assembled structure, final working mechanism demonstrated once at the end.
CAMERA: static overhead, no zoom, no pan.
LIGHTING: even soft daylight, no harsh shadows across the work area.
AUDIO: crisp blade cuts, cardboard flex, tape peel, hands moving — no music, no voice.
FINISH: photorealistic, sharp texture on the corrugated edges, natural colour.

8 seconds, smooth accelerated motion, no text overlays.`,
  },
  {
    id: "vid-embroidery",
    title: "Embroidery Macro Loop",
    category: "Video Gen",

    prompt: `Macro video of hand embroidery in progress.

SUBJECT: a needle pulling [colour] thread through taut natural linen in a wooden hoop, forming a [motif: single petal of a poppy].
CAMERA: 100mm macro, f/3.5, framed tight on the needle entry point, tiny slow dolly-in over the shot.
MOTION: one continuous stitch — needle enters, thread pulls through with slight fabric tension, thread settles.
LIGHTING: soft directional window light from the left, delicate shadow in the fabric weave, gentle sheen on the thread.
AUDIO: the faint pop of the needle through fabric, thread drag, ambient room tone only.
FINISH: photorealistic, visible individual linen fibres and thread twist, natural colour.

8 seconds, no text, no music.`,
  },
  {
    id: "vid-lullaby",
    title: "Nursery Lullaby Scene",
    category: "Video Gen",
    niche: "Nursery Rhymes",

    prompt: `Soft 3D animated lullaby scene for young children.

SCENE: a cosy round bedroom in a treehouse, a sleepy [animal: baby elephant] tucked under a patchwork quilt, a paper moon lamp glowing by the window, gentle snow falling outside.
STYLE: rounded soft-shape 3D animation, plush felt-like textures, pastel palette of dusty blue, cream and peach, no sharp edges anywhere.
MOTION: very slow — the quilt rises and falls with breathing, the lamp sways slightly, snowflakes drift past the window, one blink.
CAMERA: slow gentle push-in, no cuts.
AUDIO: soft music-box lullaby melody, faint wind outside, no voice.
MOOD: calm, safe, drowsy.

8 seconds, no text, nothing startling, no fast motion.`,
  },
  {
    id: "vid-sandwich-making",
    title: "Sandwich Build Food Cinematography",
    category: "Video Gen",

    prompt: `Cinematic food video of a sandwich being built.

ACTION: layers land one by one in rhythm — toasted sourdough, butter spread, folded ham, melting cheese, crisp lettuce, tomato slices, top slice pressed down, then a clean knife cut with the cheese pulling apart.
CAMERA: 50mm macro at a low 20-degree angle just above table height, slow arc around the plate, final beat pushes in on the cut cross-section.
LIGHTING: hard key from behind creating bright rim highlights on every edge, soft bounce fill in front, dark moody background.
MOTION: slow motion at the impact of each layer, real-time on the cut.
AUDIO: crunch, sizzle, knife through crust, no music.
FINISH: photorealistic, glistening textures, steam visible, ultra-sharp detail.

8 seconds, no hands visible above the wrist, no text.`,
  },
  {
    id: "vid-zombie-apocalypse",
    title: "Zombie Apocalypse Street Shot",
    category: "Video Gen",

    prompt: `Cinematic post-apocalyptic street scene.

SCENE: an abandoned four-lane city street choked with rusted cars and drifting ash, tower blocks broken against a bruised sky, one figure in a gas mask walking down the centre line away from camera.
MOTION: slow handheld follow behind the figure, ash swirling in the air, a traffic light swinging on its cable, distant silhouettes shambling between the cars in the far background.
CAMERA: 35mm, f/2.8, slight handheld drift, subject centred, deep atmospheric haze.
LIGHTING: overcast diffuse light, low contrast, one distant fire glow off frame right.
AUDIO: wind through empty streets, metal creaking, one distant guttural cry, low sub-bass drone. No music, no dialogue.
GRADE: desaturated teal and ash grey, crushed blacks, heavy grain.

8 seconds, photorealistic, single continuous take, no text, no gore.`,
  },
  {
    id: "vid-ai-drama-english",
    title: "AI Drama Scene (English Dialogue)",
    category: "Video Gen",
    niche: "Drama",

    prompt: `A short dramatic film scene, photorealistic.

CHARACTERS: [A: 40s man in a rain-soaked jacket] and [B: 30s woman holding a car key].
LOCATION: a supermarket car park at night, rain falling through the sodium lamps.
BEAT: she is leaving; he arrives one second too late.
CAMERA: medium two-shot on a 50mm, slow push-in, shallow focus favouring whoever speaks, one subtle rack focus on the final line.
LIGHTING: orange sodium key from above, cold blue fill from a storefront off frame left, rain catching the light.
AUDIO: rain on metal, distant traffic, no music.
DIALOGUE:
A: "[one line, under 12 words]"
B: "[one line, under 12 words]"
Delivery: restrained, quiet, both avoiding eye contact until the last word.

8 seconds, natural lip sync, no subtitles, no text overlays.`,
  },
  {
    id: "vid-ai-drama-tagalog",
    title: "AI Drama Scene (Tagalog Dialogue)",
    category: "Video Gen",
    niche: "Drama",

    tips: "State the language explicitly and write the line phonetically natural — the model follows the written line exactly.",
    prompt: `A short dramatic film scene with Tagalog dialogue, photorealistic.

CHARACTERS: [A: nanay in her 50s, apron on] and [B: her son, early 20s, backpack on one shoulder].
LOCATION: the doorway of a small house in a Manila neighbourhood, late afternoon light, laundry lines above the alley.
BEAT: he is leaving to work abroad; neither wants to say goodbye first.
CAMERA: 35mm medium shot from inside the house looking out, slow push toward the doorway, natural handheld.
LIGHTING: warm golden hour spill through the doorway, soft shadow inside.
AUDIO: neighbourhood ambience, tricycle passing, a rooster, no music.
DIALOGUE — spoken in natural conversational Tagalog:
A: "[isang linya, wala pang 12 salita]"
B: "[isang linya, wala pang 12 salita]"
Delivery: soft, held back, voices tight.

8 seconds, accurate Tagalog lip sync, no subtitles, no text on screen.`,
  },
  {
    id: "vid-stickman-explainer",
    title: "Stickman Explainer Animation",
    category: "Video Gen",
    niche: "Stickman",

    prompt: `2D stickman animation explaining a concept on a plain background.

CONCEPT: [e.g. how compound interest snowballs].
STYLE: black stick figures with thick rounded strokes on a clean off-white background, one accent colour ([#8b5cf6]) used only for the key element, simple hand-drawn icons appearing as needed.
ACTION: the stickman starts small on the left, drags a coin that doubles each step, and ends dwarfed by the final stack on the right.
MOTION: snappy pose-to-pose animation with strong anticipation and overshoot, elements pop in with a quick scale bounce.
CAMERA: static wide, one quick zoom-out at the end to reveal the full scale.
AUDIO: light pops and whooshes on each beat, upbeat minimal underscore, no voice.

8 seconds, clean and readable at phone size, no text unless numbers are essential.`,
  },
  {
    id: "vid-sketch-control",
    title: "Sketch-to-Video Control Shot",
    category: "Video Gen",

    prompt: `Use the attached rough sketch as the exact composition and staging reference for this video.

RESPECT FROM THE SKETCH: subject placement in frame, horizon line, camera angle, and the direction the subject faces. Do not reframe or recompose.
RENDER AS: photorealistic live action, [describe subject and environment in detail].
MOTION: bring the sketch to life with [describe: the subject turning their head slowly toward camera while fabric moves in the wind].
CAMERA: hold the sketched angle, add only a slow 5% push-in.
LIGHTING: [describe key, fill and rim].
AUDIO: [describe ambience], no music.

8 seconds, single continuous take, photorealistic, no text, no sketch lines visible in the output.`,
  },
  {
    id: "vid-talking-objects",
    title: "AI Talking Objects",
    category: "Video Gen",

    prompt: `A photorealistic everyday object that talks, Pixar-style expression on a real object.

OBJECT: [e.g. a chipped diner coffee mug on a formica counter].
FACE: eyes and mouth formed naturally from the object's own surface features — no cartoon overlay, no stickers. The material itself deforms to express.
ACTION: it looks around, sighs, then delivers its line directly to camera with a resigned expression.
CAMERA: 50mm macro at object eye level, shallow depth of field, slow push-in.
LIGHTING: warm practical light from a window off frame right, soft shadow on the counter.
AUDIO: room ambience plus the object's voice — [describe voice: dry, tired, middle-aged].
DIALOGUE: "[one line, under 15 words]"

8 seconds, photorealistic materials, accurate lip sync, no text, no human hands.`,
  },

  // ---------------------------------------------------------------- Character
  {
    id: "char-identity-lock",
    title: "Identity Lock Sheet (Reusable Description)",
    category: "Character",

    tips: "Paste the resulting paragraph verbatim into every future prompt — that literal repetition is what keeps the face stable.",
    prompt: `Write a reusable identity lock paragraph for a recurring faceless-channel character.

INPUTS:
Niche: [PASTE NICHE]
Gender / age range: [PASTE]
Vibe: [PASTE, e.g. calm, authoritative, weathered]

Produce a single dense paragraph of 90-120 words that specifies, in this order: age, ethnicity and skin tone, face shape, jaw and cheekbone structure, eye colour and shape, eyebrow shape, nose shape, lip shape, exact hairstyle including length, part and texture, facial hair, three permanent distinguishing marks, build and height, posture, and the fixed core wardrobe.

Rules:
- Every attribute must be concrete and visual. No adjectives like "beautiful" or "striking".
- No emotion, no pose, no lighting, no background — those change per shot.
- Written so it can be pasted unchanged into any image or video prompt.

Then output a 12-word short version for use when the prompt budget is tight.`,
  },
  {
    id: "char-turnaround-sheet",
    title: "Character Turnaround Sheet",
    category: "Character",

    prompt: `Character turnaround sheet, 5 full-body views of the same character in a single horizontal row on a flat neutral grey background.

VIEWS, left to right: front, three-quarter front left, profile left, three-quarter back left, straight back.

CHARACTER: [PASTE YOUR IDENTITY LOCK PARAGRAPH HERE]

RULES: identical height and proportions across all five views, aligned to the same horizon and ground line, feet on the same baseline, T-pose relaxed with arms slightly away from the body, neutral expression, identical wardrobe and accessories in every view.

LIGHTING: flat even studio lighting, no dramatic shadows, no coloured light.
RENDER: photorealistic, 85mm lens compression, sharp throughout.

No text, no labels, no measurement lines, no extra characters, no background objects.

Aspect ratio: 16:9.`,
  },
  {
    id: "char-consistent-template",
    title: "Consistent Character Shot Template",
    category: "Character",

    prompt: `[IDENTITY LOCK — paste the exact same paragraph every single time, word for word]

SHOT: [wide / medium / close-up / extreme close-up]
SCENE: [location, time of day, season, weather]
WARDROBE VARIATION: [only change layers and colours, never the core silhouette]
POSE / ACTION: [one clear action]
EXPRESSION: [one emotion, described physically — brow lowered, jaw set]
CAMERA: [focal length], [aperture], [angle: eye level / low / high], subject on the [left / centre / right] third
LIGHTING: key [direction and quality], fill [strength], rim [colour and direction], practicals [list]
GRADE: [palette and contrast]

Consistency rules: identical facial geometry, hairline, eye colour and permanent marks as described in the identity lock. No aging, no weight change, no hairstyle change.

Photorealistic, no text, no watermark, no extra people.`,
  },

  // ---------------------------------------------------------------- Niche
  {
    id: "niche-animal-cooking",
    title: "Animal Cooking Channel Series Plan",
    category: "Niche",
    niche: "Animal Cooking",

    prompt: `You are building a faceless "animal cooking" short-form channel where realistic animals cook real dishes in tiny kitchens.

Deliver:
1. Ten episode concepts. For each: the animal, the dish, the tiny-kitchen setting, and the one visual gag that makes it shareable.
2. For the strongest three, write the full 8-second video generation prompt including scene, animal behaviour, camera move, lighting, food detail and audio — no dialogue, sound design only.
3. A consistency block describing the kitchen set so every episode is recognisably the same place.
4. Ten title options under 60 characters.
5. The posting order for the first 10 uploads, strongest hook first.

Plain text, no markdown headers beyond the numbers.`,
  },
  {
    id: "niche-anime-fight",
    title: "Anime Fight — Versus Format",
    category: "Niche",
    niche: "Anime",

    prompt: `Generate an anime "versus" fight short.

FIGHTER A: [describe design, powers, colour signature].
FIGHTER B: [describe design, powers, colour signature].
ARENA: [describe, e.g. a shattered rooftop above a neon city in the rain].

Write the 8-second video prompt as a beat sheet:
0.0-1.5s — standoff, slow push-in, both auras igniting in their signature colours.
1.5-3.5s — A closes distance with a speed blur, impact frame with radial shockwave lines.
3.5-6.0s — B counters, camera whip-pans, debris and rain suspended mid-air.
6.0-8.0s — clash lock, screen briefly whites out, pull back to the two silhouettes.

Include for each beat: camera move, animation style notes (sakuga key frames, smear frames, impact flashes), lighting, and sound design. Style: modern TV anime, clean line art, dramatic colour grading. No dialogue, no subtitles, no text.`,
  },
  {
    id: "niche-pov-videos",
    title: "POV Video Idea Machine",
    category: "Niche",
    niche: "POV Vlog",

    prompt: `Act as a short-form ideation engine for first-person POV faceless videos.

NICHE: [PASTE NICHE]

Generate 20 POV concepts. Each entry must contain exactly:
- POV line: "POV: [situation]" — under 12 words, present tense, dropping the viewer straight into the moment.
- Opening frame: the first thing on screen in the first 0.5 seconds.
- Tension: what the viewer is waiting to find out.
- Payoff: what happens in the final 2 seconds.
- Loop hook: how the last frame invites an instant rewatch.

Rank all 20 by scroll-stopping power and mark the top 5 with an asterisk.`,
  },
  {
    id: "niche-fusion-transformation",
    title: "Fusion / Transformation Morph",
    category: "Niche",

    prompt: `An 8-second transformation morph video.

START SUBJECT: [e.g. a cracked stone gargoyle].
END SUBJECT: [e.g. a living raven mid-flight].
FUSION LOGIC: the stone fractures from the inside out, fragments lift and reorganise into feathers, mass and silhouette shifting continuously with no cut.

CAMERA: slow 180-degree orbit around the subject, locked centre framing, 50mm.
TIMING: 0-2s the original subject holds still with tiny stress cracks appearing; 2-6s the transformation cascades from the core outward; 6-8s the new form settles and takes one breath.
LIGHTING: single dramatic key from the upper left, volumetric dust catching the beam, dark backdrop.
AUDIO: stone grinding into feather rustle, deep sub impact at the halfway point, no music.

Photorealistic, continuous single take, no cuts, no text.`,
  },
  {
    id: "niche-creepy-entities",
    title: "Creepy Entity Sighting",
    category: "Niche",
    niche: "True Crime",

    prompt: `A found-footage style sighting clip of an unexplained entity.

FOOTAGE TYPE: [security camera / dashcam / phone held low], with the matching artefacts — timestamp burn-in, low frame rate, IR grain or compression blocking.
LOCATION: [e.g. an empty petrol station forecourt at 3:14am].
ENTITY: [describe: tall, wrong proportions, stays at the edge of the light, never fully resolves].
BEAT: the entity is barely visible in the background for 5 seconds, then moves once — fast and unnaturally — and is gone before the camera can react.
CAMERA: fixed or barely moving, the entity is NOT the centre of frame, the viewer has to find it.
AUDIO: electrical hum, wind, one low frequency drop at the movement, no music, no scream.

8 seconds, photorealistic, restrained — suggestion over reveal. No gore, no jump-scare flash, no text besides the timestamp.`,
  },
  {
    id: "niche-top5-ranking",
    title: "Top 5 Ranking Video Ideas",
    category: "Niche",

    prompt: `Act as a faceless list-channel producer.

NICHE: [PASTE NICHE]

Generate 15 "Top 5" video concepts. For each:
- Title, under 60 characters.
- The 5 ranked items with a one-sentence reason each, ordered so the most surprising entry sits at number 2 (not number 1) to hold retention.
- A cold-open line, under 20 words, that teases number 1 without naming it.
- The single strongest visual for the thumbnail.
- Estimated search demand: LOW / MEDIUM / HIGH.

Then pick the 3 with the best demand-to-competition ratio and explain each in one sentence.`,
  },
  {
    id: "niche-quiz-content",
    title: "Interactive Quiz Short",
    category: "Niche",

    prompt: `Write a faceless interactive quiz short.

TOPIC: [PASTE TOPIC]
LENGTH: 45 seconds, 5 questions.

For each question provide:
- The on-screen question text, maximum 8 words.
- Four answer options, maximum 3 words each.
- A 3-second countdown beat description.
- The reveal, plus a one-line "most people got this wrong" fact.
- The visual for that question described as an image prompt.

Open with a challenge line under 12 words. Close with a line that dares the viewer to comment their score. Include the exact on-screen text for every frame and the pacing in seconds.`,
  },
  {
    id: "niche-ai-whale-pov",
    title: "AI Whale POV Deep Dive",
    category: "Niche",
    niche: "POV Vlog",

    prompt: `First-person POV from the head of a blue whale.

SCENE: descending from sunlit surface water into the twilight zone. Shafts of light break apart above, particles drift past, the blue deepens toward black.
MOTION: slow powerful body undulation causing a gentle rhythmic rise and fall of the camera, a school of fish parting ahead, one distant whale silhouette crossing far below.
CAMERA: ultra-wide 14mm with a slight fisheye, the leading edge of the whale's rostrum just visible at the bottom of frame for scale.
LIGHTING: god rays from directly above, falling off into deep blue-black, faint bioluminescent specks in the lower third.
AUDIO: muffled underwater pressure, low whale song, distant clicks, no music.
GRADE: cyan highlights, deep navy shadows, natural underwater colour absorption.

8 seconds, photorealistic documentary quality, single continuous take, no text.`,
  },
  {
    id: "niche-3d-cars-challenge",
    title: "3D Cars Obstacle Challenge",
    category: "Niche",

    prompt: `A 3D animated car challenge short in the satisfying-simulation style.

SETUP: [number] cars of different sizes, each a solid distinct colour, lined up at the start of a giant obstacle course made of oversized ramps, crushers, water pits and narrow beams, set against a clean gradient sky.
ACTION: they launch simultaneously; obstacles eliminate them one at a time; the smallest car survives the crusher by fitting through a gap.
PHYSICS: exaggerated but believable — real weight, suspension compression, bounce and roll.
CAMERA: dynamic chase cam behind the pack, cutting to a low slow-motion angle at each elimination, ending on a wide aerial of the finish.
STYLE: clean 3D render, soft global illumination, glossy car paint, soft contact shadows, no photorealistic environment clutter.
AUDIO: engine whines, impacts, whooshes, a rising chime at the finish. No voice.

8 seconds, no text overlays, satisfying and readable at phone size.`,
  },
  {
    id: "niche-color-mixing",
    title: "Color Mixing Satisfying Loop",
    category: "Niche",

    prompt: `A satisfying colour mixing macro video.

SETUP: a shallow white ceramic dish filled with glossy white base liquid, shot from directly overhead filling the entire frame.
ACTION: three drops of saturated pigment fall in sequence — [colour 1], [colour 2], [colour 3] — each blooming outward in fractal tendrils, then a slow stir draws them into a marbled spiral.
CAMERA: locked overhead macro, no movement, subject fills frame edge to edge.
LIGHTING: large soft overhead source, even, with a subtle sheen on the liquid surface, no hotspots.
MOTION: 120fps slow motion on the drops, real time on the stir.
AUDIO: soft droplet impacts, viscous stirring, no music.
FINISH: photorealistic fluid simulation, ultra-saturated pigment against pure white, 4K detail.

8 seconds, loop-friendly, no hands in frame after the third drop, no text.`,
  },
  {
    id: "niche-music-for-kids",
    title: "Kids Music Video Scene",
    category: "Niche",
    niche: "Nursery Rhymes",

    prompt: `A bright 3D animated music video scene for children aged 2-5.

SCENE: [e.g. a sunny meadow with oversized daisies and a friendly cartoon sun].
CHARACTERS: [e.g. three round, soft-shaped animal friends] singing and bouncing on the beat.
STYLE: rounded shapes, no sharp corners, saturated primary-adjacent pastels, soft toy-like textures, thick friendly outlines.
MOTION: everything moves on the beat — characters bounce in a simple squash-and-stretch cycle, flowers sway, the sun blinks. Movement is smooth and never sudden.
CAMERA: gentle side-to-side sway, no fast cuts, no zooms.
AUDIO: cheerful nursery melody at roughly 100 BPM, simple ukulele and glockenspiel, cheerful "la la la" vocals.
SAFETY: nothing scary, no dark shadows, no flashing lights, no fast strobing.

8 seconds, loop-friendly, no text on screen.`,
  },
  {
    id: "niche-daily-prayers",
    title: "Daily Prayer / Devotional Short",
    category: "Niche",

    prompt: `Create a calm daily devotional short for a faceless channel.

THEME: [e.g. gratitude at the start of the day]

Deliver:
1. A 60-word spoken script — warm, plain language, second person, one central image, ending on a single short sentence the viewer can repeat.
2. The delivery notes: pace in words per minute, where to pause, which two words to soften.
3. The visual prompt for the background: a slow, gentle scene described with camera, lighting, palette and motion (e.g. dawn light moving across still water, slow drift, warm amber to soft rose, no cuts).
4. The on-screen text: 4 short lines, maximum 5 words each, with the timing in seconds for each.
5. Three title options under 60 characters.

Respectful and non-denominational unless a tradition is specified. No music suggestion louder than a soft ambient pad.`,
  },
  {
    id: "niche-gaming-branding",
    title: "Gaming Channel Branding Kit",
    category: "Niche",

    prompt: `Build a complete visual branding kit for a faceless gaming channel.

GAME / GENRE: [PASTE]
TONE: [PASTE, e.g. high energy, competitive, slightly unhinged]

Deliver:
1. Five channel name options with handles.
2. A logo prompt: describe the mark, the silhouette test it must pass at 24px, the colour palette with hex codes, and what to avoid.
3. A banner prompt sized 2560x1440 with the safe area for the centre 1546x423.
4. A thumbnail formula: layout grid, face/subject placement, maximum 4 words of text, the two accent colours, and the one repeating element that makes every thumbnail recognisable as this channel.
5. An intro animation description, 3 seconds, with motion and sound design.
6. The typography pairing — display font for thumbnails, UI font for overlays — and the exact usage rules.`,
  },
  {
    id: "niche-true-crime-cold-open",
    title: "True Crime Cold Open Script",
    category: "Niche",
    niche: "True Crime",

    prompt: `Write the cold open for a faceless true crime video.

CASE: [PASTE CASE OR TOPIC]

Rules:
- 90 to 120 words, spoken in under 45 seconds.
- Open on a single concrete sensory detail, not a date and not a location dump.
- Withhold the central question until the final sentence of the open.
- Present tense, short sentences, no adjectives stacked more than one deep.
- Absolutely no "in this video we will" and no channel introduction.
- Respectful to victims: no lurid detail, no speculation stated as fact.

Then output: the matching visual beat list, one image prompt per sentence group, and the two audio cues (ambience and the single sting) with their timing.`,
  },
  {
    id: "niche-asmr-series",
    title: "ASMR Series Plan (30 Episodes)",
    category: "Niche",
    niche: "ASMR",

    prompt: `Plan a 30-episode faceless ASMR short-form series.

CORE TRIGGER FAMILY: [e.g. cutting / crushing / tapping / liquid]

Deliver a table in plain text with one line per episode containing: episode number, the subject, the primary trigger, the secondary trigger, the camera setup, and the one-line hook that appears in the first 0.5 seconds.

Rules:
- No two consecutive episodes may share the same primary trigger.
- Every subject must be macro-friendly and fill the frame.
- Escalate visual satisfaction across the series so episode 30 is the most striking.

Finish with the recurring set description that keeps the whole series visually consistent, and the posting cadence you recommend.`,
  },
  {
    id: "niche-ai-influencer-content-plan",
    title: "AI Influencer 30-Day Content Plan",
    category: "Niche",
    niche: "AI Influencer",

    prompt: `Build a 30-day content plan for an AI influencer persona.

PERSONA: [paste identity lock paragraph]
NICHE: [PASTE]
PLATFORM: [Instagram / TikTok / YouTube Shorts]

Deliver one line per day containing: day number, format (photo carousel / talking video / b-roll / POV), the concept in under 12 words, the caption hook in under 15 words, and the image or video prompt seed.

Rules:
- Rotate three content pillars evenly and name them at the top.
- Every seventh day is a higher-effort hero post.
- The persona's face, wardrobe core and locations must stay consistent — list the three recurring locations you're using.
- No day may repeat the concept of the previous three days.`,
  },
  {
    id: "img-thumbnail-composition",
    title: "High-CTR Thumbnail Composition",
    category: "Image Gen",

    prompt: `Design a YouTube thumbnail image, 1280x720.

CONCEPT: [describe the single idea the thumbnail must communicate in under one second].
COMPOSITION: hero subject filling the left 60% of frame, strong negative space on the right for text placement, subject facing into the space.
CONTRAST: subject separated from the background by a bright rim light and a deep dark background; the two brightest points in the image are the subject's face and the focal object.
PALETTE: two dominant colours plus one high-saturation accent used only on the focal object.
STYLE: photorealistic, high micro-contrast, slight vignette, colour graded for punch on a small screen.

Legible at 200px wide. No text in the image itself, no borders, no watermark, no clutter in the background.

Aspect ratio: 16:9.`,
  },
  {
    id: "img-b-roll-set",
    title: "Cinematic B-Roll Frame Set",
    category: "Image Gen",

    prompt: `Generate a cohesive set of 6 cinematic b-roll still frames for a faceless video about [TOPIC].

Shared look across all six: same colour grade ([describe palette]), same lens character ([focal length], shallow depth of field), same time of day, same atmospheric condition (haze / rain / dust).

The six frames:
1. Establishing wide, subject small in frame.
2. Medium detail of a hand interacting with an object.
3. Extreme macro texture detail.
4. Silhouette against a light source.
5. Overhead top-down composition.
6. Slow-shutter motion abstract.

Photorealistic, no people's faces visible, no text, no logos. Each frame must cut together with the others without a grade mismatch.

Aspect ratio: 16:9.`,
  },
  {
    id: "img-text-overlay-plate",
    title: "Clean Text-Overlay Background Plate",
    category: "Image Gen",

    prompt: `Generate a background plate designed for text to be placed on top of it.

SCENE: [describe, e.g. dark volumetric fog rolling across a black void with a single cool blue light source top left].
COMPOSITION: the centre 60% of the frame must stay visually quiet — low detail, low contrast — so overlaid text remains readable. All visual interest sits in the outer thirds.
CONTRAST: overall dark, exposure held below mid-grey in the centre.
DETAIL: subtle grain, gentle gradient falloff, no busy patterns, no hard edges crossing the centre.

No text, no subject, no logos, no watermarks.

Aspect ratio: 9:16.`,
  },
  {
    id: "vid-loop-transition",
    title: "Seamless Loop Transition Clip",
    category: "Video Gen",

    prompt: `An 8-second video engineered as a perfect seamless loop.

SCENE: [describe, e.g. ink dropping into water and dispersing].
LOOP RULE: the final frame must match the first frame exactly in composition, lighting and subject position, so the cut is invisible on repeat.
MOTION: one continuous cyclical movement, constant speed, no acceleration at the start or end.
CAMERA: locked off, absolutely no drift, no zoom, no handheld.
LIGHTING: constant throughout — no flickering, no changing light direction.
AUDIO: continuous ambient bed with no distinguishable start or end point, no music with a bar structure.

Photorealistic, no cuts, no text, no fade in or out.`,
  },
  {
    id: "vid-hook-first-second",
    title: "First-Second Hook Shot",
    category: "Video Gen",

    tips: "Use this as the opening 1-2 seconds of any short — the rest of the video can be generated separately.",
    prompt: `Generate a 2-second opening hook shot for a short-form video.

REQUIREMENT: something visually unresolved happens in the first 6 frames — motion, a reveal starting, or an object already falling. Nothing static, no establishing beat, no logo.

SCENE: [describe the moment mid-action, not the setup].
CAMERA: fast push-in or whip into the subject, ending on a held frame.
LIGHTING: high contrast, the subject is the brightest thing on screen.
AUDIO: one impact or whoosh landing on frame 1, then room tone.
GRADE: punchy, saturated, crushed blacks for small-screen contrast.

Photorealistic, vertical 9:16, no text, no title card, no fade in.`,
  },
  {
    id: "vid-product-spin",
    title: "Product Turntable Spin",
    category: "Video Gen",

    prompt: `A studio turntable product video.

PRODUCT: [describe exactly, including materials and finish].
MOTION: a smooth 360-degree rotation at constant speed, completing exactly one full revolution in 8 seconds so it loops.
CAMERA: locked off at a 15-degree elevated angle, 85mm lens, f/5.6, product centred and filling 70% of frame height.
LIGHTING: large softbox key from the upper left, strip light rim from behind right for edge definition, subtle gradient falloff on the seamless background, clean contact shadow directly beneath.
BACKGROUND: [colour] seamless, no props, no reflections of the studio.
AUDIO: none or a soft ambient pad.

Photorealistic, accurate material response — the metal reflects, the plastic diffuses, the glass refracts. No text, no logos other than the product's own, no hands.`,
  },
  {
    id: "vid-time-of-day-shift",
    title: "Day-to-Night Hyperlapse",
    category: "Video Gen",

    prompt: `A holy-grail hyperlapse from day to night.

SCENE: [describe location, e.g. a coastal harbour with moored fishing boats].
TRANSITION: the full 8 seconds carries the scene from midday through golden hour, blue hour, and into full night with practical lights coming on progressively.
MOTION: slow forward hyperlapse dolly along a fixed line, plus clouds racing and water surface smoothing into a long-exposure blur.
CAMERA: 24mm, locked horizon, perfectly stable, no rolling shutter wobble.
EXPOSURE: smooth continuous ramp with no flicker and no stepped brightness jumps.
AUDIO: ambience evolving from daytime activity to quiet night, no music.

Photorealistic, cinematic, single continuous take, no cuts, no text.`,
  },
  {
    id: "seo-thumbnail-text",
    title: "Thumbnail Text Generator",
    category: "SEO",

    prompt: `Generate thumbnail text options for this video.

TITLE: [PASTE TITLE]
TOPIC: [PASTE TOPIC]

Rules:
- 12 options, maximum 4 words each, ideally 2 or 3.
- The thumbnail text must NOT repeat the title — together they should form one complete thought.
- Use tension words, numbers, or a single provocative noun.
- All caps friendly, readable at 200px wide.

Group them: 4 Curiosity, 4 Stakes, 4 Number/Result.
For each, add the emotion it triggers in one word. Mark your top 3 and pair each with the best matching title variant.`,
  },
  {
    id: "seo-shorts-hook-script",
    title: "Shorts Hook Script (First 3 Seconds)",
    category: "SEO",

    prompt: `Write 12 opening hooks for a faceless short-form video.

TOPIC: [PASTE TOPIC]
NICHE: [PASTE NICHE]

Each hook must be:
- Spoken in under 3 seconds (roughly 8-11 words).
- Written in spoken language, not written language — read it aloud and it must sound natural.
- Free of any greeting, channel name, or "in this video".
- Structured to create an open loop the viewer must close.

Use at least 5 different mechanisms across the set: contradiction, direct accusation, impossible claim, countdown, unfinished sentence, secret, warning.

For each hook add the matching visual for that first second, and mark the three with the strongest retention potential.`,
  },
  {
    id: "char-voice-profile",
    title: "Narrator Voice Profile",
    category: "Character",

    prompt: `Define a reusable narrator voice profile for a faceless channel.

NICHE: [PASTE NICHE]
AUDIENCE: [PASTE]

Deliver:
1. Voice description in 40 words: age impression, timbre, accent, pace in words per minute, energy level, breathiness, and the emotional default.
2. Delivery rules: sentence length preference, where the narrator pauses, which syllables get weight, what the narrator never does.
3. Five sample lines written the way this narrator would say them, with pause markers.
4. The TTS settings to approximate it: recommended stability, similarity and style values, plus what to adjust if the read sounds flat.
5. The three phrases that become this narrator's signature across every video.`,
  },
  {
    id: "char-recurring-cast",
    title: "Recurring Cast Bible",
    category: "Character",

    prompt: `Build a cast bible for a faceless narrative channel with recurring characters.

PREMISE: [PASTE]
CAST SIZE: [number]

For each character deliver: name, role in the series, the identity lock paragraph (90-120 words of purely visual, concrete attributes), the fixed wardrobe core, one prop that always appears with them, their speech pattern in one sentence, and their relationship to every other character in one line each.

Then deliver:
- A visual contrast check confirming no two characters share silhouette, hair colour, or dominant wardrobe colour.
- The three recurring locations described so they can be regenerated consistently.
- A continuity checklist to run before generating any new episode.`,
  },
  {
    id: "img-storyboard-frames",
    title: "Storyboard Frame Generator",
    category: "Image Gen",

    prompt: `Generate a 6-panel storyboard for a faceless short.

STORY: [PASTE the beat in one sentence]

Render as a 2x3 grid of rough greyscale storyboard panels on white, drawn in loose marker-and-pencil style with quick hatching for shadow.

For each panel show: the framing (wide / medium / close), the subject staging, and arrows indicating camera movement or subject movement.

Panel beats: establish, approach, discovery, reaction, escalation, resolution.

Keep the same character silhouette in every panel. Rough and fast, not polished illustration. No colour, no text, no panel numbers drawn in the image.

Aspect ratio: 3:2.`,
  },
  {
    id: "vid-camera-motion-pack",
    title: "Camera Motion Pack (10 Moves)",
    category: "Video Gen",

    prompt: `Act as a cinematographer. For the scene below, write 10 alternative camera motion descriptions I can drop straight into a video generation prompt.

SCENE: [PASTE SCENE]

For each move deliver one paragraph containing: the move name, the start framing, the path and speed of the move, the end framing, the lens and aperture, and what emotion the move creates.

Cover at least: slow push-in, pull-back reveal, orbit, crane down, whip pan, dolly zoom, handheld follow, static hold with subject movement, low tracking, and top-down descent.

Every description must be self-contained and usable without additional context. No bullet points inside the paragraphs.`,
  },
  {
    id: "niche-faceless-series-bible",
    title: "Faceless Channel Series Bible",
    category: "Niche",

    prompt: `Write the complete series bible for a new faceless channel.

NICHE: [PASTE NICHE]
FORMAT: [Shorts / long-form / both]
UPLOAD CADENCE: [PASTE]

Deliver:
1. Positioning statement in one sentence.
2. The target viewer: who they are, what they're avoiding, what they want to feel by the end of a video.
3. Three content pillars with 5 example videos each.
4. The repeatable episode structure with timings.
5. The visual identity: palette with hex codes, typography, thumbnail formula, the recurring motif.
6. The audio identity: narrator profile, music direction, the recurring sound cue.
7. The first 20 video titles in posting order.
8. The three metrics to watch in the first 30 days and the trigger point for changing direction.`,
  },
  {
    id: "niche-retention-editing",
    title: "Retention Edit Map",
    category: "Niche",

    prompt: `Act as a retention editor for a faceless video.

SCRIPT: [PASTE SCRIPT OR SUMMARY]
LENGTH: [PASTE]

Produce a second-by-second edit map covering: every cut point, the b-roll or visual on screen at each moment, the on-screen text and its exact wording, the sound design cue, and the pattern interrupt used.

Rules:
- No shot may hold longer than 4 seconds without a visual change.
- Place a pattern interrupt at least every 15 seconds.
- Mark the three highest drop-off risk moments and what you're doing to bridge them.
- Identify anything in the script that should be cut entirely and say why in one line.`,
  },
  {
    id: "niche-repurpose-shorts",
    title: "Long-Form to Shorts Repurposing",
    category: "Niche",

    prompt: `Take the long-form video below and extract short-form clips.

TRANSCRIPT OR SUMMARY: [PASTE]

Deliver 8 short-form clips. For each: the start and end timestamp, why this moment stands alone without context, the rewritten first line so it hooks cold viewers, the vertical reframing note (what stays in the 9:16 crop), the on-screen text, and a title under 60 characters.

Rank all 8 by standalone potential. Mark any clip that needs a new intro line recorded, and write that line.`,
  },
  {
    id: "img-comic-panel",
    title: "Comic Panel Sequence",
    category: "Image Gen",

    prompt: `A single dramatic comic book panel, modern western comic art.

SCENE: [describe the moment].
STYLE: bold confident inking with variable line weight, dramatic spot blacks, flat colour with hard-edged cel shading, halftone texture in the mid-tones.
COMPOSITION: dynamic diagonal, low angle, foreground element cropped at the frame edge for depth.
LIGHTING: single strong light source, deep shadow occupying at least a third of the panel.
PALETTE: [two dominant colours plus one accent].

Leave clear negative space in the upper left for a caption box, but do not draw the box or any text.

No speech bubbles, no lettering, no watermark, no panel borders.

Aspect ratio: 2:3.`,
  },
  {
    id: "vid-crowd-reaction",
    title: "Crowd Reaction Cutaway",
    category: "Video Gen",

    prompt: `A short crowd reaction cutaway for use between main shots.

SCENE: [describe the crowd and setting, e.g. a packed indoor arena, faces lit by the stage].
ACTION: the reaction lands as one wave — a beat of stillness, then everyone reacts together, hands to faces, a few standing.
CAMERA: 85mm from a low angle at the edge of the crowd, shallow focus with two faces sharp in the foreground and the rest falling into bokeh, slight handheld.
LIGHTING: strong coloured stage light from behind creating rim separation, faces lifted by soft spill.
AUDIO: a rising collective gasp then noise, no music.

8 seconds, photorealistic, no recognisable real people, no text, no logos on clothing.`,
  },
  {
    id: "seo-community-post",
    title: "Community Post & Comment Engine",
    category: "SEO",

    prompt: `Write engagement content for a faceless channel.

NICHE: [PASTE NICHE]
RECENT VIDEO: [PASTE TITLE]

Deliver:
1. Five community posts — each under 200 characters, each ending in a question that can be answered in three words.
2. Three poll posts with the question and 4 options each, designed so the results are genuinely uncertain.
3. Five pinned comment options for the recent video, each written to provoke replies rather than compliments.
4. Three reply templates for common comment types: the compliment, the correction, and the hostile take. Each reply must be short, warm, and invite one more exchange.

Plain text, no emojis beyond one per post maximum.`,
  },
  {
    id: "niche-monetization-map",
    title: "Faceless Monetization Map",
    category: "Niche",

    prompt: `Map the monetization path for a faceless channel.

NICHE: [PASTE NICHE]
CURRENT SIZE: [subscribers / monthly views]

Deliver:
1. Four revenue streams ranked by realistic revenue per 1,000 views in this niche, with the reasoning.
2. For each stream: what has to be true before it works, the setup steps, and the realistic timeline.
3. The three highest-intent moments inside a video where an offer can be placed without hurting retention, with the exact wording for each placement.
4. The single offer to build first and why.
5. The three mistakes that kill monetization in this specific niche.

Be concrete about numbers and honest about ranges. No hype.`,
  },
];

export const PROMPT_COUNT = PROMPTS.length;

function byReactions(a: Prompt, b: Prompt) {
  return (b.reactions ?? 0) - (a.reactions ?? 0);
}

export function getTopPromptsForNiche(niche: string, count: number): Prompt[] {
  const needle = niche.trim().toLowerCase();
  const matches = needle
    ? PROMPTS.filter((p) => {
        const haystack = `${p.niche ?? ""} ${p.title}`.toLowerCase();
        return haystack.includes(needle) || (!!p.niche && needle.includes(p.niche.toLowerCase()));
      })
    : [];
  const pool = matches.length > 0 ? matches : PROMPTS;
  return [...pool].sort(byReactions).slice(0, Math.max(0, count));
}

