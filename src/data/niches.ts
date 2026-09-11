/**
 * Programmatic SEO data for /niches/$slug landing pages.
 *
 * One entry per generator niche. Edit the copy freely — the route, sitemap
 * and directory page all read from this array.
 */

export interface NichePrompt {
  /** Short label for the beat this prompt covers. */
  title: string;
  /** Character + voiceover direction (Step 1). */
  character: string;
  /** Master image prompt (Step 2). */
  visual: string;
  /** Video/camera shot prompt (Step 3). */
  camera: string;
}

export interface NicheFaq {
  question: string;
  answer: string;
}

export interface NichePage {
  slug: string;
  /** Display name used in cards and headings. */
  name: string;
  /** Matching generator niche label, used to prefill the generator. */
  niche: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  prompts: NichePrompt[];
  faqs: NicheFaq[];
  relatedSlugs: string[];
}

export const NICHE_PAGES: NichePage[] = [
  {
    slug: "ai-cat-and-pet-stories",
    name: "AI Cat & Pet Stories",
    niche: "AI Cat & Pet Stories",
    seoTitle: "AI Cat & Pet Stories Video Prompts | Faceless Prompts",
    metaDescription:
      "Free ai cat & pet stories AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "AI Cat & Pet Stories Video Prompts",
    intro:
      "AI Cat & Pet Stories is one of the strongest faceless formats right now: heartwarming, playful, cinematic storytelling built around the tiny hero cat. Every blueprint below locks the same character, the honey gold, moss green, dusty cream palette and gentle → emotional spike pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Tiny Hero Cat — heartwarming, playful, cinematic tone. Voice: Warm storyteller narrator, mid-range, 132 WPM, Tender with bursts of wonder. Opening line: "Nobody thought this cat could survive [your topic]."',
        visual:
          "Vertical 9:16 image of tiny hero cat in rain-soaked cobbled alley lit by a single shop window, full subject in frame, natural face and complete anatomy, miniature red knit scarf, hand-stitched edges, palette of honey gold, moss green, dusty cream, pixar-grade 3d, soft rim light, fur detail pass, shallow depth, warm bloom, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: tiny hero cat enters the frame, rain-soaked cobbled alley lit by, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Tiny Hero Cat — heartwarming, playful, cinematic tone. Voice: Warm storyteller narrator, mid-range, 132 WPM, Tender with bursts of wonder. Opening line: "This little cat walked straight into [your topic]."',
        visual:
          "Vertical 9:16 image of tiny hero cat in sunlit farmhouse kitchen with flour in the air, full subject in frame, natural face and complete anatomy, tiny leather satchel worn across the chest, palette of honey gold, moss green, dusty cream, pixar-grade 3d, soft rim light, fur detail pass, shallow depth, warm bloom, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: tiny hero cat reacts to the turn, sunlit farmhouse kitchen with flour, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Tiny Hero Cat — heartwarming, playful, cinematic tone. Voice: Warm storyteller narrator, mid-range, 132 WPM, Tender with bursts of wonder. Opening line: "[your topic] changed everything for one stray."',
        visual:
          "Vertical 9:16 image of tiny hero cat in storm-lashed rooftop above a sleeping town, full subject in frame, natural face and complete anatomy, bell collar in aged brass, palette of honey gold, moss green, dusty cream, pixar-grade 3d, soft rim light, fur detail pass, shallow depth, warm bloom, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: tiny hero cat moves toward the key prop, storm-lashed rooftop above a sleeping, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Tiny Hero Cat — heartwarming, playful, cinematic tone. Voice: Warm storyteller narrator, mid-range, 132 WPM, Tender with bursts of wonder. Opening line: "Nobody thought this cat could survive [your topic]."',
        visual:
          "Vertical 9:16 image of tiny hero cat in rain-soaked cobbled alley lit by a single shop window, full subject in frame, natural face and complete anatomy, muddy paw wraps from the last adventure, palette of honey gold, moss green, dusty cream, pixar-grade 3d, soft rim light, fur detail pass, shallow depth, warm bloom, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: tiny hero cat holds the payoff beat, rain-soaked cobbled alley lit by, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Tiny Hero Cat — heartwarming, playful, cinematic tone. Voice: Warm storyteller narrator, mid-range, 132 WPM, Tender with bursts of wonder. Opening line: "This little cat walked straight into [your topic]."',
        visual:
          "Vertical 9:16 image of tiny hero cat in sunlit farmhouse kitchen with flour in the air, full subject in frame, natural face and complete anatomy, miniature red knit scarf, hand-stitched edges, palette of honey gold, moss green, dusty cream, pixar-grade 3d, soft rim light, fur detail pass, shallow depth, warm bloom, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: tiny hero cat settles as the loop resets, sunlit farmhouse kitchen with flour, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a ai cat & pet stories video work?",
        answer:
          "Gentle → Emotional Spike pacing, one locked character (the tiny hero cat) and a consistent palette of honey gold, moss green, dusty cream. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit ai cat & pet stories?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 132 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should ai cat & pet stories videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: ["ai-animal-cooking", "pov-immersive-vlogs", "anime-fight-versus"],
  },
  {
    slug: "ai-animal-cooking",
    name: "AI Animal Cooking",
    niche: "AI Animal Cooking",
    seoTitle: "AI Animal Cooking Video Prompts | The Faceless Prompts",
    metaDescription:
      "Free ai animal cooking AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "AI Animal Cooking Video Prompts",
    intro:
      "AI Animal Cooking is one of the strongest faceless formats right now: cozy, whimsical, satisfying storytelling built around the chef bear in the forest kitchen. Every blueprint below locks the same character, the butter yellow, forest green, toasted amber palette and slow asmr → reveal pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Chef Bear in the Forest Kitchen — cozy, whimsical, satisfying tone. Voice: Low, friendly narrator, 120 WPM, Content, unhurried. Opening line: "This bear cooks [your topic] better than most humans."',
        visual:
          "Vertical 9:16 image of chef bear in the forest kitchen in log cabin kitchen with copper pans and open fire, full subject in frame, natural face and complete anatomy, cream chef jacket, double-breasted, flour-dusted, palette of butter yellow, forest green, toasted amber, hyperreal cgi fur, steam volumetrics, golden kitchen light, macro food detail, cozy realism, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: chef bear in the forest kitchen enters the frame, log cabin kitchen with copper, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Chef Bear in the Forest Kitchen — cozy, whimsical, satisfying tone. Voice: Low, friendly narrator, 120 WPM, Content, unhurried. Opening line: "Watch what happens when a bear tries [your topic]."',
        visual:
          "Vertical 9:16 image of chef bear in the forest kitchen in riverside outdoor stove with steam rolling off the pot, full subject in frame, natural face and complete anatomy, rolled linen apron tied twice at the waist, palette of butter yellow, forest green, toasted amber, hyperreal cgi fur, steam volumetrics, golden kitchen light, macro food detail, cozy realism, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: chef bear in the forest kitchen reacts to the turn, riverside outdoor stove with steam, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Chef Bear in the Forest Kitchen — cozy, whimsical, satisfying tone. Voice: Low, friendly narrator, 120 WPM, Content, unhurried. Opening line: "[your topic], made in a forest kitchen."',
        visual:
          "Vertical 9:16 image of chef bear in the forest kitchen in autumn forest table set with wooden bowls, full subject in frame, natural face and complete anatomy, tall toque with a slight lean, palette of butter yellow, forest green, toasted amber, hyperreal cgi fur, steam volumetrics, golden kitchen light, macro food detail, cozy realism, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: chef bear in the forest kitchen moves toward the key prop, autumn forest table set with, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Chef Bear in the Forest Kitchen — cozy, whimsical, satisfying tone. Voice: Low, friendly narrator, 120 WPM, Content, unhurried. Opening line: "This bear cooks [your topic] better than most humans."',
        visual:
          "Vertical 9:16 image of chef bear in the forest kitchen in log cabin kitchen with copper pans and open fire, full subject in frame, natural face and complete anatomy, wooden spoon tucked into the belt, palette of butter yellow, forest green, toasted amber, hyperreal cgi fur, steam volumetrics, golden kitchen light, macro food detail, cozy realism, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: chef bear in the forest kitchen holds the payoff beat, log cabin kitchen with copper, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Chef Bear in the Forest Kitchen — cozy, whimsical, satisfying tone. Voice: Low, friendly narrator, 120 WPM, Content, unhurried. Opening line: "Watch what happens when a bear tries [your topic]."',
        visual:
          "Vertical 9:16 image of chef bear in the forest kitchen in riverside outdoor stove with steam rolling off the pot, full subject in frame, natural face and complete anatomy, cream chef jacket, double-breasted, flour-dusted, palette of butter yellow, forest green, toasted amber, hyperreal cgi fur, steam volumetrics, golden kitchen light, macro food detail, cozy realism, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: chef bear in the forest kitchen settles as the loop resets, riverside outdoor stove with steam, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a ai animal cooking video work?",
        answer:
          "Slow ASMR → Reveal pacing, one locked character (the chef bear in the forest kitchen) and a consistent palette of butter yellow, forest green, toasted amber. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit ai animal cooking?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 120 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should ai animal cooking videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: ["pov-immersive-vlogs", "anime-fight-versus", "stickman-explainer-and-skits"],
  },
  {
    slug: "pov-immersive-vlogs",
    name: "POV Immersive Vlogs",
    niche: "POV Immersive Vlogs",
    seoTitle: "POV Immersive Vlogs AI Video Prompts | The Faceless Prompts",
    metaDescription:
      "Free pov immersive vlogs AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "POV Immersive Vlogs AI Video Prompts",
    intro:
      "POV Immersive Vlogs is one of the strongest faceless formats right now: immersive, grounded, present-tense storytelling built around the first-person traveller. Every blueprint below locks the same character, the sun-warmed sand, sky blue, worn timber palette and continuous → reveal beat pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The First-Person Traveller — immersive, grounded, present-tense tone. Voice: Close-mic conversational narrator, 138 WPM, Curious, quietly amazed. Opening line: "You just woke up in the middle of [your topic]."',
        visual:
          "Vertical 9:16 image of first-person traveller in narrow market street at golden hour, faceless framing, head cropped or shadowed, hands in sharp focus, faded canvas jacket, sleeves pushed up, palette of sun-warmed sand, sky blue, worn timber, first-person lens, natural light, handheld micro-shake, wide 18mm, photoreal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Slow push-in: first-person traveller enters the frame, narrow market street at golden, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The First-Person Traveller — immersive, grounded, present-tense tone. Voice: Close-mic conversational narrator, 138 WPM, Curious, quietly amazed. Opening line: "This is [your topic] through your own eyes."',
        visual:
          "Vertical 9:16 image of first-person traveller in wooden staircase into a fog-covered valley, faceless framing, head cropped or shadowed, hands in sharp focus, weathered hands with a braided cord bracelet, palette of sun-warmed sand, sky blue, worn timber, first-person lens, natural light, handheld micro-shake, wide 18mm, photoreal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Lateral dolly: first-person traveller reacts to the turn, wooden staircase into a fog-covered, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The First-Person Traveller — immersive, grounded, present-tense tone. Voice: Close-mic conversational narrator, 138 WPM, Curious, quietly amazed. Opening line: "Walk with me straight into [your topic]."',
        visual:
          "Vertical 9:16 image of first-person traveller in small kitchen doorway opening onto a courtyard, faceless framing, head cropped or shadowed, hands in sharp focus, scuffed boots visible on the down-look, palette of sun-warmed sand, sky blue, worn timber, first-person lens, natural light, handheld micro-shake, wide 18mm, photoreal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Handheld orbit: first-person traveller moves toward the key prop, small kitchen doorway opening onto, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The First-Person Traveller — immersive, grounded, present-tense tone. Voice: Close-mic conversational narrator, 138 WPM, Curious, quietly amazed. Opening line: "You just woke up in the middle of [your topic]."',
        visual:
          "Vertical 9:16 image of first-person traveller in narrow market street at golden hour, faceless framing, head cropped or shadowed, hands in sharp focus, worn day pack strap crossing the chest, palette of sun-warmed sand, sky blue, worn timber, first-person lens, natural light, handheld micro-shake, wide 18mm, photoreal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Low-angle rise: first-person traveller holds the payoff beat, narrow market street at golden, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The First-Person Traveller — immersive, grounded, present-tense tone. Voice: Close-mic conversational narrator, 138 WPM, Curious, quietly amazed. Opening line: "This is [your topic] through your own eyes."',
        visual:
          "Vertical 9:16 image of first-person traveller in wooden staircase into a fog-covered valley, faceless framing, head cropped or shadowed, hands in sharp focus, faded canvas jacket, sleeves pushed up, palette of sun-warmed sand, sky blue, worn timber, first-person lens, natural light, handheld micro-shake, wide 18mm, photoreal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Slow pull-back: first-person traveller settles as the loop resets, wooden staircase into a fog-covered, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a pov immersive vlogs video work?",
        answer:
          "Continuous → Reveal Beat pacing, one locked character (the first-person traveller) and a consistent palette of sun-warmed sand, sky blue, worn timber. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit pov immersive vlogs?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 138 WPM.",
      },
      {
        question: "How do I keep the character consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Keep the face hidden the same way in each shot so the silhouette reads as one person.",
      },
      {
        question: "How long should pov immersive vlogs videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "anime-fight-versus",
      "stickman-explainer-and-skits",
      "ai-asmr-cooking-cleaning-restoration",
    ],
  },
  {
    slug: "anime-fight-versus",
    name: "Anime Fight Versus",
    niche: "Anime Fight Versus",
    seoTitle: "Anime Fight Versus AI Video Prompts | The Faceless Prompts",
    metaDescription:
      "Free anime fight versus AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Anime Fight Versus AI Video Prompts",
    intro:
      "Anime Fight Versus is one of the strongest faceless formats right now: explosive, hype, cinematic storytelling built around the masked challenger. Every blueprint below locks the same character, the ink black, electric crimson, cold silver palette and fast cut → impact pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Masked Challenger — explosive, hype, cinematic tone. Voice: Intense male narrator with grit, 150 WPM, Escalating hype. Opening line: "Who actually wins [your topic]?"',
        visual:
          "Vertical 9:16 image of masked challenger in shattered rooftop under a blood-red moon, full subject in frame, natural face and complete anatomy, torn black haori with a glowing crimson seam, palette of ink black, electric crimson, cold silver, anime key frame, speed lines, impact flash, cel shading, ultra dynamic, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: masked challenger enters the frame, shattered rooftop under a blood-red, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Masked Challenger — explosive, hype, cinematic tone. Voice: Intense male narrator with grit, 150 WPM, Escalating hype. Opening line: "[your topic] has one correct answer. Watch."',
        visual:
          "Vertical 9:16 image of masked challenger in flooded temple courtyard mid-storm, full subject in frame, natural face and complete anatomy, bandaged forearms and knuckles, palette of ink black, electric crimson, cold silver, anime key frame, speed lines, impact flash, cel shading, ultra dynamic, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: masked challenger reacts to the turn, flooded temple courtyard mid-storm, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Masked Challenger — explosive, hype, cinematic tone. Voice: Intense male narrator with grit, 150 WPM, Escalating hype. Opening line: "This fight settles [your topic] forever."',
        visual:
          "Vertical 9:16 image of masked challenger in collapsing arena with floating debris, full subject in frame, natural face and complete anatomy, split-face porcelain mask, hairline cracked, palette of ink black, electric crimson, cold silver, anime key frame, speed lines, impact flash, cel shading, ultra dynamic, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: masked challenger moves toward the key prop, collapsing arena with floating debris, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Masked Challenger — explosive, hype, cinematic tone. Voice: Intense male narrator with grit, 150 WPM, Escalating hype. Opening line: "Who actually wins [your topic]?"',
        visual:
          "Vertical 9:16 image of masked challenger in shattered rooftop under a blood-red moon, full subject in frame, natural face and complete anatomy, chipped katana slung low on the hip, palette of ink black, electric crimson, cold silver, anime key frame, speed lines, impact flash, cel shading, ultra dynamic, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: masked challenger holds the payoff beat, shattered rooftop under a blood-red, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Masked Challenger — explosive, hype, cinematic tone. Voice: Intense male narrator with grit, 150 WPM, Escalating hype. Opening line: "[your topic] has one correct answer. Watch."',
        visual:
          "Vertical 9:16 image of masked challenger in flooded temple courtyard mid-storm, full subject in frame, natural face and complete anatomy, torn black haori with a glowing crimson seam, palette of ink black, electric crimson, cold silver, anime key frame, speed lines, impact flash, cel shading, ultra dynamic, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: masked challenger settles as the loop resets, flooded temple courtyard mid-storm, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a anime fight versus video work?",
        answer:
          "Fast Cut → Impact pacing, one locked character (the masked challenger) and a consistent palette of ink black, electric crimson, cold silver. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit anime fight versus?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 150 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should anime fight versus videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "stickman-explainer-and-skits",
      "ai-asmr-cooking-cleaning-restoration",
      "zombie-apocalypse-drama",
    ],
  },
  {
    slug: "stickman-explainer-and-skits",
    name: "Stickman Explainer & Skits",
    niche: "Stickman Explainer & Skits",
    seoTitle: "Stickman Explainer & Skits AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free stickman explainer & skits AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Stickman Explainer & Skits AI Video Prompts",
    intro:
      "Stickman Explainer & Skits is one of the strongest faceless formats right now: funny, fast, relatable storytelling built around the stickman everyman. Every blueprint below locks the same character, the pure white, ink black, single red accent palette and rapid → punchline pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Stickman Everyman — funny, fast, relatable tone. Voice: Bright conversational narrator, 158 WPM, Deadpan into punchline. Opening line: "Here is [your topic], explained badly on purpose."',
        visual:
          "Vertical 9:16 image of stickman everyman in empty white void with one drawn horizon line, full subject in frame, natural face and complete anatomy, pure black stick limbs, uniform 6px stroke, palette of pure white, ink black, single red accent, clean vector stickman, flat white background, bold stroke, snappy keyframes, minimal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: stickman everyman enters the frame, empty white void with one, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Stickman Everyman — funny, fast, relatable tone. Voice: Bright conversational narrator, 158 WPM, Deadpan into punchline. Opening line: "[your topic] in 30 seconds, stick figures only."',
        visual:
          "Vertical 9:16 image of stickman everyman in sketched office desk in three strokes, full subject in frame, natural face and complete anatomy, single prop per scene, drawn in the same stroke, palette of pure white, ink black, single red accent, clean vector stickman, flat white background, bold stroke, snappy keyframes, minimal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: stickman everyman reacts to the turn, sketched office desk in three, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Stickman Everyman — funny, fast, relatable tone. Voice: Bright conversational narrator, 158 WPM, Deadpan into punchline. Opening line: "Everyone gets [your topic] wrong. Watch."',
        visual:
          "Vertical 9:16 image of stickman everyman in flat side-scroll street with drawn props, full subject in frame, natural face and complete anatomy, no facial features beyond two dot eyes, palette of pure white, ink black, single red accent, clean vector stickman, flat white background, bold stroke, snappy keyframes, minimal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: stickman everyman moves toward the key prop, flat side-scroll street with drawn, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Stickman Everyman — funny, fast, relatable tone. Voice: Bright conversational narrator, 158 WPM, Deadpan into punchline. Opening line: "Here is [your topic], explained badly on purpose."',
        visual:
          "Vertical 9:16 image of stickman everyman in empty white void with one drawn horizon line, full subject in frame, natural face and complete anatomy, optional red accent object for focus, palette of pure white, ink black, single red accent, clean vector stickman, flat white background, bold stroke, snappy keyframes, minimal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: stickman everyman holds the payoff beat, empty white void with one, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Stickman Everyman — funny, fast, relatable tone. Voice: Bright conversational narrator, 158 WPM, Deadpan into punchline. Opening line: "[your topic] in 30 seconds, stick figures only."',
        visual:
          "Vertical 9:16 image of stickman everyman in sketched office desk in three strokes, full subject in frame, natural face and complete anatomy, pure black stick limbs, uniform 6px stroke, palette of pure white, ink black, single red accent, clean vector stickman, flat white background, bold stroke, snappy keyframes, minimal, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: stickman everyman settles as the loop resets, sketched office desk in three, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a stickman explainer & skits video work?",
        answer:
          "Rapid → Punchline pacing, one locked character (the stickman everyman) and a consistent palette of pure white, ink black, single red accent. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit stickman explainer & skits?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 158 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should stickman explainer & skits videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "ai-asmr-cooking-cleaning-restoration",
      "zombie-apocalypse-drama",
      "bible-and-mythology-anime",
    ],
  },
  {
    slug: "ai-asmr-cooking-cleaning-restoration",
    name: "AI ASMR",
    niche: "AI ASMR (Cooking, Cleaning, Restoration)",
    seoTitle: "AI ASMR Video Prompts | The Faceless Prompts",
    metaDescription:
      "Free ai asmr AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "AI ASMR Video Prompts",
    intro:
      "AI ASMR is one of the strongest faceless formats right now: hypnotic, tactile, wordless storytelling built around the silent hands restorer. Every blueprint below locks the same character, the soft grey, foam white, muted steel palette and very slow → satisfying release pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Silent Hands Restorer — hypnotic, tactile, wordless tone. Voice: Minimal whisper narration or none, 84 WPM, Calm, detached. Opening line: "The most satisfying part of [your topic] is the sound."',
        visual:
          "Vertical 9:16 image of silent hands restorer in white tiled workbench with one overhead softbox, full subject in frame, natural face and complete anatomy, rolled grey sleeves and clean forearms, palette of soft grey, foam white, muted steel, macro texture, soft diffused light, ultra slow motion, photoreal surfaces, clean frame, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: silent hands restorer enters the frame, white tiled workbench with one, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Silent Hands Restorer — hypnotic, tactile, wordless tone. Voice: Minimal whisper narration or none, 84 WPM, Calm, detached. Opening line: "Turn your volume up for [your topic]."',
        visual:
          "Vertical 9:16 image of silent hands restorer in restoration table with rust flaking under a brush, full subject in frame, natural face and complete anatomy, nitrile gloves, faintly powdered, palette of soft grey, foam white, muted steel, macro texture, soft diffused light, ultra slow motion, photoreal surfaces, clean frame, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: silent hands restorer reacts to the turn, restoration table with rust flaking, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Silent Hands Restorer — hypnotic, tactile, wordless tone. Voice: Minimal whisper narration or none, 84 WPM, Calm, detached. Opening line: "[your topic], in perfect slow motion."',
        visual:
          "Vertical 9:16 image of silent hands restorer in spotless counter with condensation on glass, full subject in frame, natural face and complete anatomy, neutral canvas apron with tool loops, palette of soft grey, foam white, muted steel, macro texture, soft diffused light, ultra slow motion, photoreal surfaces, clean frame, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: silent hands restorer moves toward the key prop, spotless counter with condensation on, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Silent Hands Restorer — hypnotic, tactile, wordless tone. Voice: Minimal whisper narration or none, 84 WPM, Calm, detached. Opening line: "The most satisfying part of [your topic] is the sound."',
        visual:
          "Vertical 9:16 image of silent hands restorer in white tiled workbench with one overhead softbox, full subject in frame, natural face and complete anatomy, no jewellery, short trimmed nails, palette of soft grey, foam white, muted steel, macro texture, soft diffused light, ultra slow motion, photoreal surfaces, clean frame, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: silent hands restorer holds the payoff beat, white tiled workbench with one, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Silent Hands Restorer — hypnotic, tactile, wordless tone. Voice: Minimal whisper narration or none, 84 WPM, Calm, detached. Opening line: "Turn your volume up for [your topic]."',
        visual:
          "Vertical 9:16 image of silent hands restorer in restoration table with rust flaking under a brush, full subject in frame, natural face and complete anatomy, rolled grey sleeves and clean forearms, palette of soft grey, foam white, muted steel, macro texture, soft diffused light, ultra slow motion, photoreal surfaces, clean frame, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: silent hands restorer settles as the loop resets, restoration table with rust flaking, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a ai asmr video work?",
        answer:
          "Very Slow → Satisfying Release pacing, one locked character (the silent hands restorer) and a consistent palette of soft grey, foam white, muted steel. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit ai asmr?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 84 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should ai asmr videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "zombie-apocalypse-drama",
      "bible-and-mythology-anime",
      "ai-influencer-product-reviews",
    ],
  },
  {
    slug: "zombie-apocalypse-drama",
    name: "Zombie Apocalypse Drama",
    niche: "Zombie Apocalypse Drama",
    seoTitle: "Zombie Apocalypse Drama AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free zombie apocalypse drama AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Zombie Apocalypse Drama AI Video Prompts",
    intro:
      "Zombie Apocalypse Drama is one of the strongest faceless formats right now: tense, gritty, desperate storytelling built around the last survivor. Every blueprint below locks the same character, the ash grey, dried blood red, sickly green palette and slow dread → sprint pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Last Survivor — tense, gritty, desperate tone. Voice: Hoarse male narrator, 126 WPM, Exhausted urgency. Opening line: "Day 47 and [your topic] just changed the rules."',
        visual:
          "Vertical 9:16 image of last survivor in overturned highway at dusk with abandoned cars, faceless framing, head cropped or shadowed, hands in sharp focus, blood-flecked field jacket, one sleeve torn, palette of ash grey, dried blood red, sickly green, desaturated grade, handheld realism, practical firelight, heavy grain, cinematic grime, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Slow push-in: last survivor enters the frame, overturned highway at dusk with, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Last Survivor — tense, gritty, desperate tone. Voice: Hoarse male narrator, 126 WPM, Exhausted urgency. Opening line: "Nobody survives [your topic] alone."',
        visual:
          "Vertical 9:16 image of last survivor in barricaded supermarket lit by one flare, faceless framing, head cropped or shadowed, hands in sharp focus, duct-taped forearm guards, palette of ash grey, dried blood red, sickly green, desaturated grade, handheld realism, practical firelight, heavy grain, cinematic grime, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Lateral dolly: last survivor reacts to the turn, barricaded supermarket lit by one, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Last Survivor — tense, gritty, desperate tone. Voice: Hoarse male narrator, 126 WPM, Exhausted urgency. Opening line: "[your topic] is the reason the safe zone fell."',
        visual:
          "Vertical 9:16 image of last survivor in flooded subway tunnel with distant dragging sounds, faceless framing, head cropped or shadowed, hands in sharp focus, half-empty pack with a crowbar strapped on, palette of ash grey, dried blood red, sickly green, desaturated grade, handheld realism, practical firelight, heavy grain, cinematic grime, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Handheld orbit: last survivor moves toward the key prop, flooded subway tunnel with distant, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Last Survivor — tense, gritty, desperate tone. Voice: Hoarse male narrator, 126 WPM, Exhausted urgency. Opening line: "Day 47 and [your topic] just changed the rules."',
        visual:
          "Vertical 9:16 image of last survivor in overturned highway at dusk with abandoned cars, faceless framing, head cropped or shadowed, hands in sharp focus, respirator hanging loose at the throat, palette of ash grey, dried blood red, sickly green, desaturated grade, handheld realism, practical firelight, heavy grain, cinematic grime, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Low-angle rise: last survivor holds the payoff beat, overturned highway at dusk with, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Last Survivor — tense, gritty, desperate tone. Voice: Hoarse male narrator, 126 WPM, Exhausted urgency. Opening line: "Nobody survives [your topic] alone."',
        visual:
          "Vertical 9:16 image of last survivor in barricaded supermarket lit by one flare, faceless framing, head cropped or shadowed, hands in sharp focus, blood-flecked field jacket, one sleeve torn, palette of ash grey, dried blood red, sickly green, desaturated grade, handheld realism, practical firelight, heavy grain, cinematic grime, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Slow pull-back: last survivor settles as the loop resets, barricaded supermarket lit by one, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a zombie apocalypse drama video work?",
        answer:
          "Slow Dread → Sprint pacing, one locked character (the last survivor) and a consistent palette of ash grey, dried blood red, sickly green. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit zombie apocalypse drama?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 126 WPM.",
      },
      {
        question: "How do I keep the character consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Keep the face hidden the same way in each shot so the silhouette reads as one person.",
      },
      {
        question: "How long should zombie apocalypse drama videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "bible-and-mythology-anime",
      "ai-influencer-product-reviews",
      "lullaby-and-sleep-music",
    ],
  },
  {
    slug: "bible-and-mythology-anime",
    name: "Bible & Mythology Anime",
    niche: "Bible & Mythology Anime",
    seoTitle: "Bible & Mythology Anime AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free bible & mythology anime AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Bible & Mythology Anime AI Video Prompts",
    intro:
      "Bible & Mythology Anime is one of the strongest faceless formats right now: epic, reverent, mythic storytelling built around the chosen herald. Every blueprint below locks the same character, the sun gold, ivory white, storm indigo palette and building → revelatory pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Chosen Herald — epic, reverent, mythic tone. Voice: Resonant male narrator, 116 WPM, Solemn awe. Opening line: "Scripture describes [your topic] in terrifying detail."',
        visual:
          "Vertical 9:16 image of chosen herald in desert plain split by a column of light, full subject in frame, natural face and complete anatomy, white linen robe with gold-thread hem, palette of sun gold, ivory white, storm indigo, anime epic key art, god rays, gold leaf accents, cel shaded detail, grand scale, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: chosen herald enters the frame, desert plain split by a, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Chosen Herald — epic, reverent, mythic tone. Voice: Resonant male narrator, 116 WPM, Solemn awe. Opening line: "[your topic] was never told to you this way."',
        visual:
          "Vertical 9:16 image of chosen herald in marble temple steps under gathering storm, full subject in frame, natural face and complete anatomy, bronze shoulder guard etched with script, palette of sun gold, ivory white, storm indigo, anime epic key art, god rays, gold leaf accents, cel shaded detail, grand scale, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: chosen herald reacts to the turn, marble temple steps under gathering, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Chosen Herald — epic, reverent, mythic tone. Voice: Resonant male narrator, 116 WPM, Solemn awe. Opening line: "This is what [your topic] actually looked like."',
        visual:
          "Vertical 9:16 image of chosen herald in sky above the clouds with wings unfurled, full subject in frame, natural face and complete anatomy, six-winged silhouette in backlight, palette of sun gold, ivory white, storm indigo, anime epic key art, god rays, gold leaf accents, cel shaded detail, grand scale, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: chosen herald moves toward the key prop, sky above the clouds with, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Chosen Herald — epic, reverent, mythic tone. Voice: Resonant male narrator, 116 WPM, Solemn awe. Opening line: "Scripture describes [your topic] in terrifying detail."',
        visual:
          "Vertical 9:16 image of chosen herald in desert plain split by a column of light, full subject in frame, natural face and complete anatomy, barefoot with dust to the ankles, palette of sun gold, ivory white, storm indigo, anime epic key art, god rays, gold leaf accents, cel shaded detail, grand scale, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: chosen herald holds the payoff beat, desert plain split by a, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Chosen Herald — epic, reverent, mythic tone. Voice: Resonant male narrator, 116 WPM, Solemn awe. Opening line: "[your topic] was never told to you this way."',
        visual:
          "Vertical 9:16 image of chosen herald in marble temple steps under gathering storm, full subject in frame, natural face and complete anatomy, white linen robe with gold-thread hem, palette of sun gold, ivory white, storm indigo, anime epic key art, god rays, gold leaf accents, cel shaded detail, grand scale, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: chosen herald settles as the loop resets, marble temple steps under gathering, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a bible & mythology anime video work?",
        answer:
          "Building → Revelatory pacing, one locked character (the chosen herald) and a consistent palette of sun gold, ivory white, storm indigo. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit bible & mythology anime?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 116 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should bible & mythology anime videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "ai-influencer-product-reviews",
      "lullaby-and-sleep-music",
      "analog-horror-and-unsolved-mysteries",
    ],
  },
  {
    slug: "ai-influencer-product-reviews",
    name: "AI Influencer Product Reviews",
    niche: "AI Influencer Product Reviews",
    seoTitle: "AI Influencer Product Reviews Video Prompts",
    metaDescription:
      "Free ai influencer product reviews AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "AI Influencer Product Reviews Video Prompts",
    intro:
      "AI Influencer Product Reviews is one of the strongest faceless formats right now: confident, aspirational, crisp storytelling built around the polished digital host. Every blueprint below locks the same character, the warm ivory, blush beige, brushed champagne palette and punchy → verdict pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Polished Digital Host — confident, aspirational, crisp tone. Voice: Bright female mid-tone, 146 WPM, Enthusiastic but controlled. Opening line: "I tested [your topic] so you don\'t have to."',
        visual:
          "Vertical 9:16 image of polished digital host in seamless studio backdrop with one soft gradient, full subject in frame, natural face and complete anatomy, ivory oversized blazer with sharp shoulders, palette of warm ivory, blush beige, brushed champagne, studio softbox, glossy product macro, clean gradient bg, shallow depth, editorial polish, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: polished digital host enters the frame, seamless studio backdrop with one, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Polished Digital Host — confident, aspirational, crisp tone. Voice: Bright female mid-tone, 146 WPM, Enthusiastic but controlled. Opening line: "[your topic] is either genius or a scam."',
        visual:
          "Vertical 9:16 image of polished digital host in marble vanity with product laid in a row, full subject in frame, natural face and complete anatomy, minimal gold hoop and thin chain, palette of warm ivory, blush beige, brushed champagne, studio softbox, glossy product macro, clean gradient bg, shallow depth, editorial polish, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: polished digital host reacts to the turn, marble vanity with product laid, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Polished Digital Host — confident, aspirational, crisp tone. Voice: Bright female mid-tone, 146 WPM, Enthusiastic but controlled. Opening line: "Three reasons [your topic] is worth it."',
        visual:
          "Vertical 9:16 image of polished digital host in sunlit loft corner with sheer curtain diffusion, full subject in frame, natural face and complete anatomy, glossy manicure holding the product, palette of warm ivory, blush beige, brushed champagne, studio softbox, glossy product macro, clean gradient bg, shallow depth, editorial polish, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: polished digital host moves toward the key prop, sunlit loft corner with sheer, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Polished Digital Host — confident, aspirational, crisp tone. Voice: Bright female mid-tone, 146 WPM, Enthusiastic but controlled. Opening line: "I tested [your topic] so you don\'t have to."',
        visual:
          "Vertical 9:16 image of polished digital host in seamless studio backdrop with one soft gradient, full subject in frame, natural face and complete anatomy, neutral silk shell top underneath, palette of warm ivory, blush beige, brushed champagne, studio softbox, glossy product macro, clean gradient bg, shallow depth, editorial polish, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: polished digital host holds the payoff beat, seamless studio backdrop with one, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Polished Digital Host — confident, aspirational, crisp tone. Voice: Bright female mid-tone, 146 WPM, Enthusiastic but controlled. Opening line: "[your topic] is either genius or a scam."',
        visual:
          "Vertical 9:16 image of polished digital host in marble vanity with product laid in a row, full subject in frame, natural face and complete anatomy, ivory oversized blazer with sharp shoulders, palette of warm ivory, blush beige, brushed champagne, studio softbox, glossy product macro, clean gradient bg, shallow depth, editorial polish, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: polished digital host settles as the loop resets, marble vanity with product laid, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a ai influencer product reviews video work?",
        answer:
          "Punchy → Verdict pacing, one locked character (the polished digital host) and a consistent palette of warm ivory, blush beige, brushed champagne. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit ai influencer product reviews?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 146 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should ai influencer product reviews videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "lullaby-and-sleep-music",
      "analog-horror-and-unsolved-mysteries",
      "diy-cardboard-and-miniature-builds",
    ],
  },
  {
    slug: "lullaby-and-sleep-music",
    name: "Lullaby & Sleep Music",
    niche: "Lullaby & Sleep Music",
    seoTitle: "Lullaby & Sleep Music AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free lullaby & sleep music AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Lullaby & Sleep Music AI Video Prompts",
    intro:
      "Lullaby & Sleep Music is one of the strongest faceless formats right now: soothing, dreamlike, slow storytelling built around the moonlight keeper. Every blueprint below locks the same character, the midnight blue, moon silver, soft lilac palette and very slow → loopable pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Moonlight Keeper — soothing, dreamlike, slow tone. Voice: Gentle female whisper-sing, 76 WPM, Tender, drifting. Opening line: "Close your eyes and drift into [your topic]."',
        visual:
          "Vertical 9:16 image of moonlight keeper in nursery window with slow-drifting stars, full subject in frame, natural face and complete anatomy, soft cloud-grey shawl, oversized, palette of midnight blue, moon silver, soft lilac, dreamy soft focus, painterly night, twinkle particles, slow parallax, pastel glow, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: moonlight keeper enters the frame, nursery window with slow-drifting stars, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Moonlight Keeper — soothing, dreamlike, slow tone. Voice: Gentle female whisper-sing, 76 WPM, Tender, drifting. Opening line: "[your topic], slowed down for sleep."',
        visual:
          "Vertical 9:16 image of moonlight keeper in clouds rolling under a crescent moon, full subject in frame, natural face and complete anatomy, star-embroidered blanket held loosely, palette of midnight blue, moon silver, soft lilac, dreamy soft focus, painterly night, twinkle particles, slow parallax, pastel glow, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: moonlight keeper reacts to the turn, clouds rolling under a crescent, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Moonlight Keeper — soothing, dreamlike, slow tone. Voice: Gentle female whisper-sing, 76 WPM, Tender, drifting. Opening line: "Eight hours of [your topic] to fall asleep to."',
        visual:
          "Vertical 9:16 image of moonlight keeper in sleeping village seen from a hill at night, full subject in frame, natural face and complete anatomy, bare feet on soft rug, palette of midnight blue, moon silver, soft lilac, dreamy soft focus, painterly night, twinkle particles, slow parallax, pastel glow, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: moonlight keeper moves toward the key prop, sleeping village seen from a, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Moonlight Keeper — soothing, dreamlike, slow tone. Voice: Gentle female whisper-sing, 76 WPM, Tender, drifting. Opening line: "Close your eyes and drift into [your topic]."',
        visual:
          "Vertical 9:16 image of moonlight keeper in nursery window with slow-drifting stars, full subject in frame, natural face and complete anatomy, no hard edges anywhere in frame, palette of midnight blue, moon silver, soft lilac, dreamy soft focus, painterly night, twinkle particles, slow parallax, pastel glow, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: moonlight keeper holds the payoff beat, nursery window with slow-drifting stars, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Moonlight Keeper — soothing, dreamlike, slow tone. Voice: Gentle female whisper-sing, 76 WPM, Tender, drifting. Opening line: "[your topic], slowed down for sleep."',
        visual:
          "Vertical 9:16 image of moonlight keeper in clouds rolling under a crescent moon, full subject in frame, natural face and complete anatomy, soft cloud-grey shawl, oversized, palette of midnight blue, moon silver, soft lilac, dreamy soft focus, painterly night, twinkle particles, slow parallax, pastel glow, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: moonlight keeper settles as the loop resets, clouds rolling under a crescent, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a lullaby & sleep music video work?",
        answer:
          "Very Slow → Loopable pacing, one locked character (the moonlight keeper) and a consistent palette of midnight blue, moon silver, soft lilac. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit lullaby & sleep music?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 76 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should lullaby & sleep music videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "analog-horror-and-unsolved-mysteries",
      "diy-cardboard-and-miniature-builds",
      "vegetable-and-fruit-carving",
    ],
  },
  {
    slug: "analog-horror-and-unsolved-mysteries",
    name: "Analog Horror & Unsolved Mysteries",
    niche: "Analog Horror & Unsolved Mysteries",
    seoTitle: "Analog Horror & Unsolved Mysteries AI Video Prompts",
    metaDescription:
      "Free analog horror & unsolved mysteries AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Analog Horror & Unsolved Mysteries AI Video Prompts",
    intro:
      "Analog Horror & Unsolved Mysteries is one of the strongest faceless formats right now: authoritative, unsettling, low and slow storytelling built around the relentless investigator. Every blueprint below locks the same character, the desaturated teal, sodium-vapour orange, deep ink black palette and slow-burn → accelerating pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Relentless Investigator — authoritative, unsettling, low and slow tone. Voice: Deep male baritone, 128 WPM, Restrained gravity. Opening line: "Nobody ever explained [your topic]."',
        visual:
          "Vertical 9:16 image of relentless investigator in rain-slick evidence room lit by one desk lamp, faceless framing, head cropped or shadowed, hands in sharp focus, charcoal wool overcoat, collar turned up, palette of desaturated teal, sodium-vapour orange, deep ink black, vhs analog artifact, scanline noise, emergency broadcast frame, cinematic noir, hyper-detailed, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Slow push-in: relentless investigator enters the frame, rain-slick evidence room lit by, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Relentless Investigator — authoritative, unsettling, low and slow tone. Voice: Deep male baritone, 128 WPM, Restrained gravity. Opening line: "This tape of [your topic] was never meant to air."',
        visual:
          "Vertical 9:16 image of relentless investigator in static-filled broadcast screen in an empty room, faceless framing, head cropped or shadowed, hands in sharp focus, black leather gloves, worn at the knuckles, palette of desaturated teal, sodium-vapour orange, deep ink black, vhs analog artifact, scanline noise, emergency broadcast frame, cinematic noir, hyper-detailed, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Lateral dolly: relentless investigator reacts to the turn, static-filled broadcast screen in an, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Relentless Investigator — authoritative, unsettling, low and slow tone. Voice: Deep male baritone, 128 WPM, Restrained gravity. Opening line: "They closed the file on [your topic] too fast."',
        visual:
          "Vertical 9:16 image of relentless investigator in cork board wall of photographs and pinned string, faceless framing, head cropped or shadowed, hands in sharp focus, manila case file bound with red string, palette of desaturated teal, sodium-vapour orange, deep ink black, vhs analog artifact, scanline noise, emergency broadcast frame, cinematic noir, hyper-detailed, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Handheld orbit: relentless investigator moves toward the key prop, cork board wall of photographs, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Relentless Investigator — authoritative, unsettling, low and slow tone. Voice: Deep male baritone, 128 WPM, Restrained gravity. Opening line: "Nobody ever explained [your topic]."',
        visual:
          "Vertical 9:16 image of relentless investigator in rain-slick evidence room lit by one desk lamp, faceless framing, head cropped or shadowed, hands in sharp focus, brass-bodied flashlight, scuffed lens, palette of desaturated teal, sodium-vapour orange, deep ink black, vhs analog artifact, scanline noise, emergency broadcast frame, cinematic noir, hyper-detailed, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Low-angle rise: relentless investigator holds the payoff beat, rain-slick evidence room lit by, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Relentless Investigator — authoritative, unsettling, low and slow tone. Voice: Deep male baritone, 128 WPM, Restrained gravity. Opening line: "This tape of [your topic] was never meant to air."',
        visual:
          "Vertical 9:16 image of relentless investigator in static-filled broadcast screen in an empty room, faceless framing, head cropped or shadowed, hands in sharp focus, charcoal wool overcoat, collar turned up, palette of desaturated teal, sodium-vapour orange, deep ink black, vhs analog artifact, scanline noise, emergency broadcast frame, cinematic noir, hyper-detailed, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Slow pull-back: relentless investigator settles as the loop resets, static-filled broadcast screen in an, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a analog horror & unsolved mysteries video work?",
        answer:
          "Slow-Burn → Accelerating pacing, one locked character (the relentless investigator) and a consistent palette of desaturated teal, sodium-vapour orange, deep ink black. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit analog horror & unsolved mysteries?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 128 WPM.",
      },
      {
        question: "How do I keep the character consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Keep the face hidden the same way in each shot so the silhouette reads as one person.",
      },
      {
        question: "How long should analog horror & unsolved mysteries videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "diy-cardboard-and-miniature-builds",
      "vegetable-and-fruit-carving",
      "ai-car-wash-and-restoration",
    ],
  },
  {
    slug: "diy-cardboard-and-miniature-builds",
    name: "DIY Cardboard & Miniature Builds",
    niche: "DIY Cardboard & Miniature Builds",
    seoTitle: "DIY Cardboard & Miniature Builds AI Video Prompts",
    metaDescription:
      "Free diy cardboard & miniature builds AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "DIY Cardboard & Miniature Builds AI Video Prompts",
    intro:
      "DIY Cardboard & Miniature Builds is one of the strongest faceless formats right now: focused, crafty, satisfying storytelling built around the silent maker. Every blueprint below locks the same character, the kraft brown, matte grey, workshop green palette and steady build → reveal pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Silent Maker — focused, crafty, satisfying tone. Voice: Sparse narration or captions only, 96 WPM, Focused calm. Opening line: "I built [your topic] out of cardboard."',
        visual:
          "Vertical 9:16 image of silent maker in overhead cutting mat with tools laid in a row, full subject in frame, natural face and complete anatomy, grey work shirt, sleeves rolled to the elbow, palette of kraft brown, matte grey, workshop green, top-down bench shot, warm practical light, macro craft detail, timelapse blend, clean composition, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: silent maker enters the frame, overhead cutting mat with tools, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Silent Maker — focused, crafty, satisfying tone. Voice: Sparse narration or captions only, 96 WPM, Focused calm. Opening line: "[your topic], made from a single box."',
        visual:
          "Vertical 9:16 image of silent maker in workshop shelf lined with finished miniatures, full subject in frame, natural face and complete anatomy, glue-flecked fingertips and a steel ruler, palette of kraft brown, matte grey, workshop green, top-down bench shot, warm practical light, macro craft detail, timelapse blend, clean composition, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: silent maker reacts to the turn, workshop shelf lined with finished, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Silent Maker — focused, crafty, satisfying tone. Voice: Sparse narration or captions only, 96 WPM, Focused calm. Opening line: "This took 40 hours: [your topic]."',
        visual:
          "Vertical 9:16 image of silent maker in half-built cardboard house under a desk lamp, full subject in frame, natural face and complete anatomy, craft knife with a fresh blade, palette of kraft brown, matte grey, workshop green, top-down bench shot, warm practical light, macro craft detail, timelapse blend, clean composition, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: silent maker moves toward the key prop, half-built cardboard house under a, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Silent Maker — focused, crafty, satisfying tone. Voice: Sparse narration or captions only, 96 WPM, Focused calm. Opening line: "I built [your topic] out of cardboard."',
        visual:
          "Vertical 9:16 image of silent maker in overhead cutting mat with tools laid in a row, full subject in frame, natural face and complete anatomy, cutting mat gridded in green, palette of kraft brown, matte grey, workshop green, top-down bench shot, warm practical light, macro craft detail, timelapse blend, clean composition, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: silent maker holds the payoff beat, overhead cutting mat with tools, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Silent Maker — focused, crafty, satisfying tone. Voice: Sparse narration or captions only, 96 WPM, Focused calm. Opening line: "[your topic], made from a single box."',
        visual:
          "Vertical 9:16 image of silent maker in workshop shelf lined with finished miniatures, full subject in frame, natural face and complete anatomy, grey work shirt, sleeves rolled to the elbow, palette of kraft brown, matte grey, workshop green, top-down bench shot, warm practical light, macro craft detail, timelapse blend, clean composition, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: silent maker settles as the loop resets, workshop shelf lined with finished, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a diy cardboard & miniature builds video work?",
        answer:
          "Steady Build → Reveal pacing, one locked character (the silent maker) and a consistent palette of kraft brown, matte grey, workshop green. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit diy cardboard & miniature builds?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 96 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should diy cardboard & miniature builds videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "vegetable-and-fruit-carving",
      "ai-car-wash-and-restoration",
      "miniature-asmr-cooking",
    ],
  },
  {
    slug: "vegetable-and-fruit-carving",
    name: "Vegetable & Fruit Carving",
    niche: "Vegetable & Fruit Carving",
    seoTitle: "Vegetable & Fruit Carving AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free vegetable & fruit carving AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Vegetable & Fruit Carving AI Video Prompts",
    intro:
      "Vegetable & Fruit Carving is one of the strongest faceless formats right now: precise, meditative, elegant storytelling built around the blade artisan. Every blueprint below locks the same character, the watermelon red, cucumber green, ivory flesh palette and slow → full reveal rotate pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Blade Artisan — precise, meditative, elegant tone. Voice: Minimal narration, soft, 92 WPM, Serene concentration. Opening line: "Watch a single melon become [your topic]."',
        visual:
          "Vertical 9:16 image of blade artisan in black slate board with water droplets, full subject in frame, natural face and complete anatomy, white chef coat with knife roll open, palette of watermelon red, cucumber green, ivory flesh, extreme macro, wet surface sheen, single key light, slow rotate, photoreal produce, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: blade artisan enters the frame, black slate board with water, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Blade Artisan — precise, meditative, elegant tone. Voice: Minimal narration, soft, 92 WPM, Serene concentration. Opening line: "[your topic], carved from one piece."',
        visual:
          "Vertical 9:16 image of blade artisan in rotating turntable under a hard key light, full subject in frame, natural face and complete anatomy, steady hands, no rings, palette of watermelon red, cucumber green, ivory flesh, extreme macro, wet surface sheen, single key light, slow rotate, photoreal produce, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: blade artisan reacts to the turn, rotating turntable under a hard, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Blade Artisan — precise, meditative, elegant tone. Voice: Minimal narration, soft, 92 WPM, Serene concentration. Opening line: "One knife, one hour, [your topic]."',
        visual:
          "Vertical 9:16 image of blade artisan in market stall counter with carved pieces in a row, full subject in frame, natural face and complete anatomy, thin carving blade catching the light, palette of watermelon red, cucumber green, ivory flesh, extreme macro, wet surface sheen, single key light, slow rotate, photoreal produce, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: blade artisan moves toward the key prop, market stall counter with carved, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Blade Artisan — precise, meditative, elegant tone. Voice: Minimal narration, soft, 92 WPM, Serene concentration. Opening line: "Watch a single melon become [your topic]."',
        visual:
          "Vertical 9:16 image of blade artisan in black slate board with water droplets, full subject in frame, natural face and complete anatomy, damp cloth folded beside the board, palette of watermelon red, cucumber green, ivory flesh, extreme macro, wet surface sheen, single key light, slow rotate, photoreal produce, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: blade artisan holds the payoff beat, black slate board with water, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Blade Artisan — precise, meditative, elegant tone. Voice: Minimal narration, soft, 92 WPM, Serene concentration. Opening line: "[your topic], carved from one piece."',
        visual:
          "Vertical 9:16 image of blade artisan in rotating turntable under a hard key light, full subject in frame, natural face and complete anatomy, white chef coat with knife roll open, palette of watermelon red, cucumber green, ivory flesh, extreme macro, wet surface sheen, single key light, slow rotate, photoreal produce, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: blade artisan settles as the loop resets, rotating turntable under a hard, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a vegetable & fruit carving video work?",
        answer:
          "Slow → Full Reveal Rotate pacing, one locked character (the blade artisan) and a consistent palette of watermelon red, cucumber green, ivory flesh. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit vegetable & fruit carving?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 92 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should vegetable & fruit carving videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "ai-car-wash-and-restoration",
      "miniature-asmr-cooking",
      "nostalgia-toy-unboxing",
    ],
  },
  {
    slug: "ai-car-wash-and-restoration",
    name: "AI Car Wash & Restoration",
    niche: "AI Car Wash & Restoration",
    seoTitle: "AI Car Wash & Restoration Video Prompts | Faceless Prompts",
    metaDescription:
      "Free ai car wash & restoration AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "AI Car Wash & Restoration Video Prompts",
    intro:
      "AI Car Wash & Restoration is one of the strongest faceless formats right now: satisfying, methodical, transformative storytelling built around the detail perfectionist. Every blueprint below locks the same character, the deep gloss black, foam white, chrome blue palette and slow build → big reveal pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Detail Perfectionist — satisfying, methodical, transformative tone. Voice: Low calm narrator, sparse, 104 WPM, Quiet satisfaction. Opening line: "This car hadn\'t moved in 20 years: [your topic]."',
        visual:
          "Vertical 9:16 image of detail perfectionist in detailing bay with wet concrete and overhead LEDs, full subject in frame, natural face and complete anatomy, black technician polo with rolled sleeves, palette of deep gloss black, foam white, chrome blue, hyperreal paint reflection, foam volumetrics, studio bay lighting, slow push-in, before/after split, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: detail perfectionist enters the frame, detailing bay with wet concrete, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Detail Perfectionist — satisfying, methodical, transformative tone. Voice: Low calm narrator, sparse, 104 WPM, Quiet satisfaction. Opening line: "[your topic] looked hopeless. Watch."',
        visual:
          "Vertical 9:16 image of detail perfectionist in sun-faded barn find under a dust sheet, full subject in frame, natural face and complete anatomy, foam-covered nitrile gloves, palette of deep gloss black, foam white, chrome blue, hyperreal paint reflection, foam volumetrics, studio bay lighting, slow push-in, before/after split, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: detail perfectionist reacts to the turn, sun-faded barn find under a, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Detail Perfectionist — satisfying, methodical, transformative tone. Voice: Low calm narrator, sparse, 104 WPM, Quiet satisfaction. Opening line: "The dirtiest [your topic] I have ever cleaned."',
        visual:
          "Vertical 9:16 image of detail perfectionist in mirror-finish panel reflecting the light bar, full subject in frame, natural face and complete anatomy, microfibre towel over the shoulder, palette of deep gloss black, foam white, chrome blue, hyperreal paint reflection, foam volumetrics, studio bay lighting, slow push-in, before/after split, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: detail perfectionist moves toward the key prop, mirror-finish panel reflecting the light, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Detail Perfectionist — satisfying, methodical, transformative tone. Voice: Low calm narrator, sparse, 104 WPM, Quiet satisfaction. Opening line: "This car hadn\'t moved in 20 years: [your topic]."',
        visual:
          "Vertical 9:16 image of detail perfectionist in detailing bay with wet concrete and overhead LEDs, full subject in frame, natural face and complete anatomy, pressure wand held low, palette of deep gloss black, foam white, chrome blue, hyperreal paint reflection, foam volumetrics, studio bay lighting, slow push-in, before/after split, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: detail perfectionist holds the payoff beat, detailing bay with wet concrete, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Detail Perfectionist — satisfying, methodical, transformative tone. Voice: Low calm narrator, sparse, 104 WPM, Quiet satisfaction. Opening line: "[your topic] looked hopeless. Watch."',
        visual:
          "Vertical 9:16 image of detail perfectionist in sun-faded barn find under a dust sheet, full subject in frame, natural face and complete anatomy, black technician polo with rolled sleeves, palette of deep gloss black, foam white, chrome blue, hyperreal paint reflection, foam volumetrics, studio bay lighting, slow push-in, before/after split, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: detail perfectionist settles as the loop resets, sun-faded barn find under a, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a ai car wash & restoration video work?",
        answer:
          "Slow Build → Big Reveal pacing, one locked character (the detail perfectionist) and a consistent palette of deep gloss black, foam white, chrome blue. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit ai car wash & restoration?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 104 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should ai car wash & restoration videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "miniature-asmr-cooking",
      "nostalgia-toy-unboxing",
      "ranking-and-top-5-countdowns",
    ],
  },
  {
    slug: "miniature-asmr-cooking",
    name: "Miniature ASMR Cooking",
    niche: "Miniature ASMR Cooking",
    seoTitle: "Miniature ASMR Cooking AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free miniature asmr cooking AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Miniature ASMR Cooking AI Video Prompts",
    intro:
      "Miniature ASMR Cooking is one of the strongest faceless formats right now: adorable, precise, cozy storytelling built around the tiny kitchen hands. Every blueprint below locks the same character, the copper orange, cream tile, herb green palette and very slow → plating reveal pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Tiny Kitchen Hands — adorable, precise, cozy tone. Voice: No narration, ambient only, 0 WPM, Neutral, observational. Opening line: "The world\'s smallest [your topic]."',
        visual:
          "Vertical 9:16 image of tiny kitchen hands in matchbox-scale kitchen set on a wooden board, full subject in frame, natural face and complete anatomy, thumb-sized apron on a doll-scale figure, palette of copper orange, cream tile, herb green, macro miniature, tilt-shift depth, warm practical flame, photoreal micro food, clean tabletop, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: tiny kitchen hands enters the frame, matchbox-scale kitchen set on a, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Tiny Kitchen Hands — adorable, precise, cozy tone. Voice: No narration, ambient only, 0 WPM, Neutral, observational. Opening line: "[your topic], cooked in a matchbox kitchen."',
        visual:
          "Vertical 9:16 image of tiny kitchen hands in tiny stove with a real flame under a pan, full subject in frame, natural face and complete anatomy, two human fingers as the visible operator, palette of copper orange, cream tile, herb green, macro miniature, tilt-shift depth, warm practical flame, photoreal micro food, clean tabletop, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: tiny kitchen hands reacts to the turn, tiny stove with a real, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Tiny Kitchen Hands — adorable, precise, cozy tone. Voice: No narration, ambient only, 0 WPM, Neutral, observational. Opening line: "Real fire, real food, tiny [your topic]."',
        visual:
          "Vertical 9:16 image of tiny kitchen hands in miniature plating scene with tweezers, full subject in frame, natural face and complete anatomy, miniature copper pan, real and heated, palette of copper orange, cream tile, herb green, macro miniature, tilt-shift depth, warm practical flame, photoreal micro food, clean tabletop, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: tiny kitchen hands moves toward the key prop, miniature plating scene with tweezers, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Tiny Kitchen Hands — adorable, precise, cozy tone. Voice: No narration, ambient only, 0 WPM, Neutral, observational. Opening line: "The world\'s smallest [your topic]."',
        visual:
          "Vertical 9:16 image of tiny kitchen hands in matchbox-scale kitchen set on a wooden board, full subject in frame, natural face and complete anatomy, match-stick-sized wooden spoon, palette of copper orange, cream tile, herb green, macro miniature, tilt-shift depth, warm practical flame, photoreal micro food, clean tabletop, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: tiny kitchen hands holds the payoff beat, matchbox-scale kitchen set on a, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Tiny Kitchen Hands — adorable, precise, cozy tone. Voice: No narration, ambient only, 0 WPM, Neutral, observational. Opening line: "[your topic], cooked in a matchbox kitchen."',
        visual:
          "Vertical 9:16 image of tiny kitchen hands in tiny stove with a real flame under a pan, full subject in frame, natural face and complete anatomy, thumb-sized apron on a doll-scale figure, palette of copper orange, cream tile, herb green, macro miniature, tilt-shift depth, warm practical flame, photoreal micro food, clean tabletop, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: tiny kitchen hands settles as the loop resets, tiny stove with a real, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a miniature asmr cooking video work?",
        answer:
          "Very Slow → Plating Reveal pacing, one locked character (the tiny kitchen hands) and a consistent palette of copper orange, cream tile, herb green. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit miniature asmr cooking?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 0 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should miniature asmr cooking videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "nostalgia-toy-unboxing",
      "ranking-and-top-5-countdowns",
      "vox-style-paper-cut-commentary",
    ],
  },
  {
    slug: "nostalgia-toy-unboxing",
    name: "Nostalgia Toy Unboxing",
    niche: "Nostalgia Toy Unboxing",
    seoTitle: "Nostalgia Toy Unboxing AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free nostalgia toy unboxing AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Nostalgia Toy Unboxing AI Video Prompts",
    intro:
      "Nostalgia Toy Unboxing is one of the strongest faceless formats right now: nostalgic, warm, reverent storytelling built around the time capsule collector. Every blueprint below locks the same character, the faded primary red, cardboard tan, retro teal palette and anticipation → reveal pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Time Capsule Collector — nostalgic, warm, reverent tone. Voice: Warm male mid-tone, 134 WPM, Nostalgic excitement. Opening line: "Sealed since 1997: [your topic]."',
        visual:
          "Vertical 9:16 image of time capsule collector in bedroom carpet with the box lit by one lamp, full subject in frame, natural face and complete anatomy, faded band tee under an open flannel, palette of faded primary red, cardboard tan, retro teal, retro film grade, tabletop overhead, warm tungsten, product macro, 90s print texture, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: time capsule collector enters the frame, bedroom carpet with the box, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Time Capsule Collector — nostalgic, warm, reverent tone. Voice: Warm male mid-tone, 134 WPM, Nostalgic excitement. Opening line: "I found [your topic] in my parents\' attic."',
        visual:
          "Vertical 9:16 image of time capsule collector in shelf wall of boxed figures in order, full subject in frame, natural face and complete anatomy, careful hands lifting a sealed box, palette of faded primary red, cardboard tan, retro teal, retro film grade, tabletop overhead, warm tungsten, product macro, 90s print texture, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: time capsule collector reacts to the turn, shelf wall of boxed figures, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Time Capsule Collector — nostalgic, warm, reverent tone. Voice: Warm male mid-tone, 134 WPM, Nostalgic excitement. Opening line: "[your topic] was every kid\'s dream."',
        visual:
          "Vertical 9:16 image of time capsule collector in overhead desk shot with packing foam laid out, full subject in frame, natural face and complete anatomy, retro digital watch on the wrist, palette of faded primary red, cardboard tan, retro teal, retro film grade, tabletop overhead, warm tungsten, product macro, 90s print texture, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: time capsule collector moves toward the key prop, overhead desk shot with packing, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Time Capsule Collector — nostalgic, warm, reverent tone. Voice: Warm male mid-tone, 134 WPM, Nostalgic excitement. Opening line: "Sealed since 1997: [your topic]."',
        visual:
          "Vertical 9:16 image of time capsule collector in bedroom carpet with the box lit by one lamp, full subject in frame, natural face and complete anatomy, cotton gloves for the rarest pieces, palette of faded primary red, cardboard tan, retro teal, retro film grade, tabletop overhead, warm tungsten, product macro, 90s print texture, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: time capsule collector holds the payoff beat, bedroom carpet with the box, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Time Capsule Collector — nostalgic, warm, reverent tone. Voice: Warm male mid-tone, 134 WPM, Nostalgic excitement. Opening line: "I found [your topic] in my parents\' attic."',
        visual:
          "Vertical 9:16 image of time capsule collector in shelf wall of boxed figures in order, full subject in frame, natural face and complete anatomy, faded band tee under an open flannel, palette of faded primary red, cardboard tan, retro teal, retro film grade, tabletop overhead, warm tungsten, product macro, 90s print texture, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: time capsule collector settles as the loop resets, shelf wall of boxed figures, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a nostalgia toy unboxing video work?",
        answer:
          "Anticipation → Reveal pacing, one locked character (the time capsule collector) and a consistent palette of faded primary red, cardboard tan, retro teal. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit nostalgia toy unboxing?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 134 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should nostalgia toy unboxing videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "ranking-and-top-5-countdowns",
      "vox-style-paper-cut-commentary",
      "elderly-wisdom-and-stoic-long-form",
    ],
  },
  {
    slug: "ranking-and-top-5-countdowns",
    name: "Ranking & Top 5 Countdowns",
    niche: "Ranking & Top 5 Countdowns",
    seoTitle: "Ranking & Top 5 Countdowns AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free ranking & top 5 countdowns AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Ranking & Top 5 Countdowns AI Video Prompts",
    intro:
      "Ranking & Top 5 Countdowns is one of the strongest faceless formats right now: punchy, opinionated, fast storytelling built around the verdict host. Every blueprint below locks the same character, the jet black, alert yellow, signal white palette and punchy → escalating to #1 pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Verdict Host — punchy, opinionated, fast tone. Voice: Crisp male baritone, 152 WPM, Assured, competitive. Opening line: "Ranking the top 5 [your topic]."',
        visual:
          "Vertical 9:16 image of verdict host in dark studio with a floating number graphic, full subject in frame, natural face and complete anatomy, sharp black crew neck, no logo, palette of jet black, alert yellow, signal white, bold numeral overlay, high contrast studio, split comparison frame, motion graphic wipes, ultra clean, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: verdict host enters the frame, dark studio with a floating, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Verdict Host — punchy, opinionated, fast tone. Voice: Crisp male baritone, 152 WPM, Assured, competitive. Opening line: "Number one in [your topic] will annoy people."',
        visual:
          "Vertical 9:16 image of verdict host in split-screen comparison plate, full subject in frame, natural face and complete anatomy, hands gesturing over a numbered graphic, palette of jet black, alert yellow, signal white, bold numeral overlay, high contrast studio, split comparison frame, motion graphic wipes, ultra clean, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: verdict host reacts to the turn, split-screen comparison plate, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Verdict Host — punchy, opinionated, fast tone. Voice: Crisp male baritone, 152 WPM, Assured, competitive. Opening line: "Only one of these [your topic] is worth it."',
        visual:
          "Vertical 9:16 image of verdict host in podium-style ranking board with lit tiers, full subject in frame, natural face and complete anatomy, minimal steel watch, palette of jet black, alert yellow, signal white, bold numeral overlay, high contrast studio, split comparison frame, motion graphic wipes, ultra clean, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: verdict host moves toward the key prop, podium-style ranking board with lit, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Verdict Host — punchy, opinionated, fast tone. Voice: Crisp male baritone, 152 WPM, Assured, competitive. Opening line: "Ranking the top 5 [your topic]."',
        visual:
          "Vertical 9:16 image of verdict host in dark studio with a floating number graphic, full subject in frame, natural face and complete anatomy, clean studio silhouette, palette of jet black, alert yellow, signal white, bold numeral overlay, high contrast studio, split comparison frame, motion graphic wipes, ultra clean, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: verdict host holds the payoff beat, dark studio with a floating, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Verdict Host — punchy, opinionated, fast tone. Voice: Crisp male baritone, 152 WPM, Assured, competitive. Opening line: "Number one in [your topic] will annoy people."',
        visual:
          "Vertical 9:16 image of verdict host in split-screen comparison plate, full subject in frame, natural face and complete anatomy, sharp black crew neck, no logo, palette of jet black, alert yellow, signal white, bold numeral overlay, high contrast studio, split comparison frame, motion graphic wipes, ultra clean, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: verdict host settles as the loop resets, split-screen comparison plate, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a ranking & top 5 countdowns video work?",
        answer:
          "Punchy → Escalating to #1 pacing, one locked character (the verdict host) and a consistent palette of jet black, alert yellow, signal white. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit ranking & top 5 countdowns?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 152 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should ranking & top 5 countdowns videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "vox-style-paper-cut-commentary",
      "elderly-wisdom-and-stoic-long-form",
      "ai-music-videos",
    ],
  },
  {
    slug: "vox-style-paper-cut-commentary",
    name: "Vox-Style Paper-Cut Commentary",
    niche: "Vox-Style Paper-Cut Commentary",
    seoTitle: "Vox-Style Paper-Cut Commentary AI Video Prompts",
    metaDescription:
      "Free vox-style paper-cut commentary AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Vox-Style Paper-Cut Commentary AI Video Prompts",
    intro:
      "Vox-Style Paper-Cut Commentary is one of the strongest faceless formats right now: analytical, clear, engaging storytelling built around the explainer journalist. Every blueprint below locks the same character, the newsprint cream, editorial red, slate navy palette and steady → argument build pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Explainer Journalist — analytical, clear, engaging tone. Voice: Clear neutral narrator, 148 WPM, Curious, explanatory. Opening line: "Here is why [your topic] actually happened."',
        visual:
          "Vertical 9:16 image of explainer journalist in flat paper desk with sliding chart cut-outs, full subject in frame, natural face and complete anatomy, paper-cut hand shapes moving on a flat plane, palette of newsprint cream, editorial red, slate navy, paper cut-out collage, layered drop shadow, flat editorial palette, snap transitions, infographic clarity, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: explainer journalist enters the frame, flat paper desk with sliding, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Explainer Journalist — analytical, clear, engaging tone. Voice: Clear neutral narrator, 148 WPM, Curious, explanatory. Opening line: "[your topic], explained in one chart."',
        visual:
          "Vertical 9:16 image of explainer journalist in cut-paper world map with pinned markers, full subject in frame, natural face and complete anatomy, layered card figures with drop shadow, palette of newsprint cream, editorial red, slate navy, paper cut-out collage, layered drop shadow, flat editorial palette, snap transitions, infographic clarity, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: explainer journalist reacts to the turn, cut-paper world map with pinned, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Explainer Journalist — analytical, clear, engaging tone. Voice: Clear neutral narrator, 148 WPM, Curious, explanatory. Opening line: "Everyone argues about [your topic]. The data doesn\'t."',
        visual:
          "Vertical 9:16 image of explainer journalist in stacked archive clippings under a soft light, full subject in frame, natural face and complete anatomy, highlight circles drawn in marker red, palette of newsprint cream, editorial red, slate navy, paper cut-out collage, layered drop shadow, flat editorial palette, snap transitions, infographic clarity, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: explainer journalist moves toward the key prop, stacked archive clippings under a, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Explainer Journalist — analytical, clear, engaging tone. Voice: Clear neutral narrator, 148 WPM, Curious, explanatory. Opening line: "Here is why [your topic] actually happened."',
        visual:
          "Vertical 9:16 image of explainer journalist in flat paper desk with sliding chart cut-outs, full subject in frame, natural face and complete anatomy, cut-out map pieces sliding into place, palette of newsprint cream, editorial red, slate navy, paper cut-out collage, layered drop shadow, flat editorial palette, snap transitions, infographic clarity, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: explainer journalist holds the payoff beat, flat paper desk with sliding, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Explainer Journalist — analytical, clear, engaging tone. Voice: Clear neutral narrator, 148 WPM, Curious, explanatory. Opening line: "[your topic], explained in one chart."',
        visual:
          "Vertical 9:16 image of explainer journalist in cut-paper world map with pinned markers, full subject in frame, natural face and complete anatomy, paper-cut hand shapes moving on a flat plane, palette of newsprint cream, editorial red, slate navy, paper cut-out collage, layered drop shadow, flat editorial palette, snap transitions, infographic clarity, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: explainer journalist settles as the loop resets, cut-paper world map with pinned, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a vox-style paper-cut commentary video work?",
        answer:
          "Steady → Argument Build pacing, one locked character (the explainer journalist) and a consistent palette of newsprint cream, editorial red, slate navy. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit vox-style paper-cut commentary?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 148 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should vox-style paper-cut commentary videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "elderly-wisdom-and-stoic-long-form",
      "ai-music-videos",
      "cartoon-horror-illustration",
    ],
  },
  {
    slug: "elderly-wisdom-and-stoic-long-form",
    name: "Elderly Wisdom & Stoic Long-Form",
    niche: "Elderly Wisdom & Stoic Long-Form",
    seoTitle: "Elderly Wisdom & Stoic Long-Form AI Video Prompts",
    metaDescription:
      "Free elderly wisdom & stoic long-form AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Elderly Wisdom & Stoic Long-Form AI Video Prompts",
    intro:
      "Elderly Wisdom & Stoic Long-Form is one of the strongest faceless formats right now: calm, deliberate, unshakeable storytelling built around the silent discipline keeper. Every blueprint below locks the same character, the bone white, warm amber, deep umber shadow palette and steady → contemplative pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Silent Discipline Keeper — calm, deliberate, unshakeable tone. Voice: Aged warm male baritone, 112 WPM, Composed conviction. Opening line: "At 80, he finally understood [your topic]."',
        visual:
          "Vertical 9:16 image of silent discipline keeper in colonnaded stone courtyard at dawn, faceless framing, head cropped or shadowed, hands in sharp focus, undyed linen tunic, loosely draped, palette of bone white, warm amber, deep umber shadow, marble chiaroscuro, golden hour shafts, muted stone, fine grain, sculptural, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Slow push-in: silent discipline keeper enters the frame, colonnaded stone courtyard at dawn, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Silent Discipline Keeper — calm, deliberate, unshakeable tone. Voice: Aged warm male baritone, 112 WPM, Composed conviction. Opening line: "[your topic] is a test, not a punishment."',
        visual:
          "Vertical 9:16 image of silent discipline keeper in candle-lit study with scrolls and one window, faceless framing, head cropped or shadowed, hands in sharp focus, leather-bound journal and iron stylus, palette of bone white, warm amber, deep umber shadow, marble chiaroscuro, golden hour shafts, muted stone, fine grain, sculptural, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Lateral dolly: silent discipline keeper reacts to the turn, candle-lit study with scrolls and, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Silent Discipline Keeper — calm, deliberate, unshakeable tone. Voice: Aged warm male baritone, 112 WPM, Composed conviction. Opening line: "You do not control [your topic]. Only your reply."',
        visual:
          "Vertical 9:16 image of silent discipline keeper in windswept cliff edge above grey sea, faceless framing, head cropped or shadowed, hands in sharp focus, weathered hands with deep lines, palette of bone white, warm amber, deep umber shadow, marble chiaroscuro, golden hour shafts, muted stone, fine grain, sculptural, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Handheld orbit: silent discipline keeper moves toward the key prop, windswept cliff edge above grey, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Silent Discipline Keeper — calm, deliberate, unshakeable tone. Voice: Aged warm male baritone, 112 WPM, Composed conviction. Opening line: "At 80, he finally understood [your topic]."',
        visual:
          "Vertical 9:16 image of silent discipline keeper in colonnaded stone courtyard at dawn, faceless framing, head cropped or shadowed, hands in sharp focus, plain marble ring, no ornament, palette of bone white, warm amber, deep umber shadow, marble chiaroscuro, golden hour shafts, muted stone, fine grain, sculptural, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Low-angle rise: silent discipline keeper holds the payoff beat, colonnaded stone courtyard at dawn, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Silent Discipline Keeper — calm, deliberate, unshakeable tone. Voice: Aged warm male baritone, 112 WPM, Composed conviction. Opening line: "[your topic] is a test, not a punishment."',
        visual:
          "Vertical 9:16 image of silent discipline keeper in candle-lit study with scrolls and one window, faceless framing, head cropped or shadowed, hands in sharp focus, undyed linen tunic, loosely draped, palette of bone white, warm amber, deep umber shadow, marble chiaroscuro, golden hour shafts, muted stone, fine grain, sculptural, negative space in the top third for captions --ar 9:16 --no blurry, lowres, visible face, text, watermark, extra limbs",
        camera:
          "Slow pull-back: silent discipline keeper settles as the loop resets, candle-lit study with scrolls and, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a elderly wisdom & stoic long-form video work?",
        answer:
          "Steady → Contemplative pacing, one locked character (the silent discipline keeper) and a consistent palette of bone white, warm amber, deep umber shadow. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit elderly wisdom & stoic long-form?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 112 WPM.",
      },
      {
        question: "How do I keep the character consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Keep the face hidden the same way in each shot so the silhouette reads as one person.",
      },
      {
        question: "How long should elderly wisdom & stoic long-form videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: ["ai-music-videos", "cartoon-horror-illustration", "pixel-game-pov"],
  },
  {
    slug: "ai-music-videos",
    name: "AI Music Videos",
    niche: "AI Music Videos",
    seoTitle: "AI Music Videos Video Prompts | The Faceless Prompts",
    metaDescription:
      "Free ai music videos AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "AI Music Videos Video Prompts",
    intro:
      "AI Music Videos is one of the strongest faceless formats right now: stylised, rhythmic, surreal storytelling built around the faceless performer. Every blueprint below locks the same character, the electric magenta, deep violet, chrome silver palette and beat-synced → chorus drop pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Faceless Performer — stylised, rhythmic, surreal tone. Voice: Sung vocal, no spoken narration, Tempo-locked, Stylised intensity. Opening line: "This song about [your topic] was made by AI."',
        visual:
          "Vertical 9:16 image of faceless performer in rain-lit rooftop with neon signage behind, full subject in frame, natural face and complete anatomy, mirror-visor helmet reflecting the stage lights, palette of electric magenta, deep violet, chrome silver, music video grade, beat-synced cuts, neon practicals, lens flare streaks, surreal composite, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: faceless performer enters the frame, rain-lit rooftop with neon signage, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Faceless Performer — stylised, rhythmic, surreal tone. Voice: Sung vocal, no spoken narration, Tempo-locked, Stylised intensity. Opening line: "[your topic], turned into a music video."',
        visual:
          "Vertical 9:16 image of faceless performer in infinite mirrored corridor pulsing with light, full subject in frame, natural face and complete anatomy, oversized metallic trench with hard shoulders, palette of electric magenta, deep violet, chrome silver, music video grade, beat-synced cuts, neon practicals, lens flare streaks, surreal composite, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: faceless performer reacts to the turn, infinite mirrored corridor pulsing with, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Faceless Performer — stylised, rhythmic, surreal tone. Voice: Sung vocal, no spoken narration, Tempo-locked, Stylised intensity. Opening line: "Wait for the drop: [your topic]."',
        visual:
          "Vertical 9:16 image of faceless performer in desert highway at night lit by headlights, full subject in frame, natural face and complete anatomy, chrome rings across gloved fingers, palette of electric magenta, deep violet, chrome silver, music video grade, beat-synced cuts, neon practicals, lens flare streaks, surreal composite, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: faceless performer moves toward the key prop, desert highway at night lit, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Faceless Performer — stylised, rhythmic, surreal tone. Voice: Sung vocal, no spoken narration, Tempo-locked, Stylised intensity. Opening line: "This song about [your topic] was made by AI."',
        visual:
          "Vertical 9:16 image of faceless performer in rain-lit rooftop with neon signage behind, full subject in frame, natural face and complete anatomy, boots with light strips along the sole, palette of electric magenta, deep violet, chrome silver, music video grade, beat-synced cuts, neon practicals, lens flare streaks, surreal composite, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: faceless performer holds the payoff beat, rain-lit rooftop with neon signage, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Faceless Performer — stylised, rhythmic, surreal tone. Voice: Sung vocal, no spoken narration, Tempo-locked, Stylised intensity. Opening line: "[your topic], turned into a music video."',
        visual:
          "Vertical 9:16 image of faceless performer in infinite mirrored corridor pulsing with light, full subject in frame, natural face and complete anatomy, mirror-visor helmet reflecting the stage lights, palette of electric magenta, deep violet, chrome silver, music video grade, beat-synced cuts, neon practicals, lens flare streaks, surreal composite, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: faceless performer settles as the loop resets, infinite mirrored corridor pulsing with, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a ai music videos video work?",
        answer:
          "Beat-Synced → Chorus Drop pacing, one locked character (the faceless performer) and a consistent palette of electric magenta, deep violet, chrome silver. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit ai music videos?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly Tempo-locked.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should ai music videos videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "cartoon-horror-illustration",
      "pixel-game-pov",
      "celebrity-evolution-and-glow-up",
    ],
  },
  {
    slug: "cartoon-horror-illustration",
    name: "Cartoon Horror Illustration",
    niche: "Cartoon Horror Illustration",
    seoTitle: "Cartoon Horror Illustration AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free cartoon horror illustration AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Cartoon Horror Illustration AI Video Prompts",
    intro:
      "Cartoon Horror Illustration is one of the strongest faceless formats right now: eerie, playful, sinister storytelling built around the storybook narrator with a secret. Every blueprint below locks the same character, the bruised purple, sickly yellow, ink black palette and whimsical → sudden dread pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Storybook Narrator with a Secret — eerie, playful, sinister tone. Voice: Soft storybook narrator turning cold, 122 WPM, Sweet then unsettling. Opening line: "This bedtime story about [your topic] is real."',
        visual:
          "Vertical 9:16 image of storybook narrator with a secret in crooked house interior with tilted walls, full subject in frame, natural face and complete anatomy, long-limbed cartoon figure with a stitched grin, palette of bruised purple, sickly yellow, ink black, illustrated storybook horror, ink line texture, hand-painted shadow, distorted perspective, uncanny cute, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: storybook narrator with a secret enters the frame, crooked house interior with tilted, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Storybook Narrator with a Secret — eerie, playful, sinister tone. Voice: Soft storybook narrator turning cold, 122 WPM, Sweet then unsettling. Opening line: "[your topic] is not supposed to be drawn."',
        visual:
          "Vertical 9:16 image of storybook narrator with a secret in moonlit forest path drawn in ink and wash, full subject in frame, natural face and complete anatomy, faded striped coat too long at the sleeves, palette of bruised purple, sickly yellow, ink black, illustrated storybook horror, ink line texture, hand-painted shadow, distorted perspective, uncanny cute, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: storybook narrator with a secret reacts to the turn, moonlit forest path drawn in, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Storybook Narrator with a Secret — eerie, playful, sinister tone. Voice: Soft storybook narrator turning cold, 122 WPM, Sweet then unsettling. Opening line: "The nice version of [your topic] is a lie."',
        visual:
          "Vertical 9:16 image of storybook narrator with a secret in children's bedroom with one door left open, full subject in frame, natural face and complete anatomy, button eyes catching the candlelight, palette of bruised purple, sickly yellow, ink black, illustrated storybook horror, ink line texture, hand-painted shadow, distorted perspective, uncanny cute, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: storybook narrator with a secret moves toward the key prop, children's bedroom with one door, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Storybook Narrator with a Secret — eerie, playful, sinister tone. Voice: Soft storybook narrator turning cold, 122 WPM, Sweet then unsettling. Opening line: "This bedtime story about [your topic] is real."',
        visual:
          "Vertical 9:16 image of storybook narrator with a secret in crooked house interior with tilted walls, full subject in frame, natural face and complete anatomy, wide brim hat casting a hard shadow, palette of bruised purple, sickly yellow, ink black, illustrated storybook horror, ink line texture, hand-painted shadow, distorted perspective, uncanny cute, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: storybook narrator with a secret holds the payoff beat, crooked house interior with tilted, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Storybook Narrator with a Secret — eerie, playful, sinister tone. Voice: Soft storybook narrator turning cold, 122 WPM, Sweet then unsettling. Opening line: "[your topic] is not supposed to be drawn."',
        visual:
          "Vertical 9:16 image of storybook narrator with a secret in moonlit forest path drawn in ink and wash, full subject in frame, natural face and complete anatomy, long-limbed cartoon figure with a stitched grin, palette of bruised purple, sickly yellow, ink black, illustrated storybook horror, ink line texture, hand-painted shadow, distorted perspective, uncanny cute, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: storybook narrator with a secret settles as the loop resets, moonlit forest path drawn in, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a cartoon horror illustration video work?",
        answer:
          "Whimsical → Sudden Dread pacing, one locked character (the storybook narrator with a secret) and a consistent palette of bruised purple, sickly yellow, ink black. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit cartoon horror illustration?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 122 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should cartoon horror illustration videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "pixel-game-pov",
      "celebrity-evolution-and-glow-up",
      "poor-vs-rich-animals-ai-skits",
    ],
  },
  {
    slug: "pixel-game-pov",
    name: "Pixel Game POV",
    niche: "Pixel Game POV",
    seoTitle: "Pixel Game POV AI Video Prompts | The Faceless Prompts",
    metaDescription:
      "Free pixel game pov AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Pixel Game POV AI Video Prompts",
    intro:
      "Pixel Game POV is one of the strongest faceless formats right now: retro, immersive, escalating storytelling built around the player character. Every blueprint below locks the same character, the cobalt blue, pixel gold, dungeon grey palette and level-by-level → boss spike pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Player Character — retro, immersive, escalating tone. Voice: Energetic narrator or text-box captions, 144 WPM, Playful tension. Opening line: "You are playing [your topic]. Level one."',
        visual:
          "Vertical 9:16 image of player character in side-scroll dungeon corridor with torch sprites, full subject in frame, natural face and complete anatomy, 16-bit sprite armour in four-colour ramp, palette of cobalt blue, pixel gold, dungeon grey, 16-bit pixel art, limited palette ramp, scanline overlay, parallax scroll, hud framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: player character enters the frame, side-scroll dungeon corridor with torch, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Player Character — retro, immersive, escalating tone. Voice: Energetic narrator or text-box captions, 144 WPM, Playful tension. Opening line: "[your topic] but it\'s a retro game."',
        visual:
          "Vertical 9:16 image of player character in overworld map with parallax mountain layers, full subject in frame, natural face and complete anatomy, pixel sword held at the bottom of frame, palette of cobalt blue, pixel gold, dungeon grey, 16-bit pixel art, limited palette ramp, scanline overlay, parallax scroll, hud framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: player character reacts to the turn, overworld map with parallax mountain, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Player Character — retro, immersive, escalating tone. Voice: Energetic narrator or text-box captions, 144 WPM, Playful tension. Opening line: "Can you beat [your topic] without dying?"',
        visual:
          "Vertical 9:16 image of player character in boss arena with a shaking screen effect, full subject in frame, natural face and complete anatomy, health bar and inventory hud overlay, palette of cobalt blue, pixel gold, dungeon grey, 16-bit pixel art, limited palette ramp, scanline overlay, parallax scroll, hud framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: player character moves toward the key prop, boss arena with a shaking, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Player Character — retro, immersive, escalating tone. Voice: Energetic narrator or text-box captions, 144 WPM, Playful tension. Opening line: "You are playing [your topic]. Level one."',
        visual:
          "Vertical 9:16 image of player character in side-scroll dungeon corridor with torch sprites, full subject in frame, natural face and complete anatomy, cape animated on a 4-frame loop, palette of cobalt blue, pixel gold, dungeon grey, 16-bit pixel art, limited palette ramp, scanline overlay, parallax scroll, hud framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: player character holds the payoff beat, side-scroll dungeon corridor with torch, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Player Character — retro, immersive, escalating tone. Voice: Energetic narrator or text-box captions, 144 WPM, Playful tension. Opening line: "[your topic] but it\'s a retro game."',
        visual:
          "Vertical 9:16 image of player character in overworld map with parallax mountain layers, full subject in frame, natural face and complete anatomy, 16-bit sprite armour in four-colour ramp, palette of cobalt blue, pixel gold, dungeon grey, 16-bit pixel art, limited palette ramp, scanline overlay, parallax scroll, hud framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: player character settles as the loop resets, overworld map with parallax mountain, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a pixel game pov video work?",
        answer:
          "Level-by-Level → Boss Spike pacing, one locked character (the player character) and a consistent palette of cobalt blue, pixel gold, dungeon grey. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit pixel game pov?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 144 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should pixel game pov videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: [
      "celebrity-evolution-and-glow-up",
      "poor-vs-rich-animals-ai-skits",
      "ai-cat-and-pet-stories",
    ],
  },
  {
    slug: "celebrity-evolution-and-glow-up",
    name: "Celebrity Evolution & Glow-Up",
    niche: "Celebrity Evolution & Glow-Up",
    seoTitle: "Celebrity Evolution & Glow-Up AI Video Prompts",
    metaDescription:
      "Free celebrity evolution & glow-up AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Celebrity Evolution & Glow-Up AI Video Prompts",
    intro:
      "Celebrity Evolution & Glow-Up is one of the strongest faceless formats right now: slick, curious, comparative storytelling built around the timeline curator. Every blueprint below locks the same character, the monochrome grey, spotlight white, accent gold palette and steady timeline → final reveal pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Timeline Curator — slick, curious, comparative tone. Voice: Smooth mid-range narrator, 140 WPM, Intrigued, upbeat. Opening line: "[your topic], from age 5 to today."',
        visual:
          "Vertical 9:16 image of timeline curator in black studio plate with one centred portrait, full subject in frame, natural face and complete anatomy, clean black studio silhouette, palette of monochrome grey, spotlight white, accent gold, portrait morph transition, year card overlay, archive grain blend, studio key light, timeline framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: timeline curator enters the frame, black studio plate with one, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Timeline Curator — slick, curious, comparative tone. Voice: Smooth mid-range narrator, 140 WPM, Intrigued, upbeat. Opening line: "Nobody expected [your topic] to look like this now."',
        visual:
          "Vertical 9:16 image of timeline curator in timeline strip scrolling with dated frames, full subject in frame, natural face and complete anatomy, year labels floating beside each portrait, palette of monochrome grey, spotlight white, accent gold, portrait morph transition, year card overlay, archive grain blend, studio key light, timeline framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: timeline curator reacts to the turn, timeline strip scrolling with dated, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Timeline Curator — slick, curious, comparative tone. Voice: Smooth mid-range narrator, 140 WPM, Intrigued, upbeat. Opening line: "The full glow-up of [your topic]."',
        visual:
          "Vertical 9:16 image of timeline curator in side-by-side then-and-now comparison plate, full subject in frame, natural face and complete anatomy, split-frame divider in thin white, palette of monochrome grey, spotlight white, accent gold, portrait morph transition, year card overlay, archive grain blend, studio key light, timeline framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: timeline curator moves toward the key prop, side-by-side then-and-now comparison plate, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Timeline Curator — slick, curious, comparative tone. Voice: Smooth mid-range narrator, 140 WPM, Intrigued, upbeat. Opening line: "[your topic], from age 5 to today."',
        visual:
          "Vertical 9:16 image of timeline curator in black studio plate with one centred portrait, full subject in frame, natural face and complete anatomy, archive photo borders in soft grain, palette of monochrome grey, spotlight white, accent gold, portrait morph transition, year card overlay, archive grain blend, studio key light, timeline framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: timeline curator holds the payoff beat, black studio plate with one, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Timeline Curator — slick, curious, comparative tone. Voice: Smooth mid-range narrator, 140 WPM, Intrigued, upbeat. Opening line: "Nobody expected [your topic] to look like this now."',
        visual:
          "Vertical 9:16 image of timeline curator in timeline strip scrolling with dated frames, full subject in frame, natural face and complete anatomy, clean black studio silhouette, palette of monochrome grey, spotlight white, accent gold, portrait morph transition, year card overlay, archive grain blend, studio key light, timeline framing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: timeline curator settles as the loop resets, timeline strip scrolling with dated, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a celebrity evolution & glow-up video work?",
        answer:
          "Steady Timeline → Final Reveal pacing, one locked character (the timeline curator) and a consistent palette of monochrome grey, spotlight white, accent gold. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit celebrity evolution & glow-up?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 140 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should celebrity evolution & glow-up videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: ["poor-vs-rich-animals-ai-skits", "ai-cat-and-pet-stories", "ai-animal-cooking"],
  },
  {
    slug: "poor-vs-rich-animals-ai-skits",
    name: "Poor vs. Rich Animals",
    niche: "Poor vs. Rich Animals (AI Skits)",
    seoTitle: "Poor vs. Rich Animals AI Video Prompts | Faceless Prompts",
    metaDescription:
      "Free poor vs. rich animals AI video prompts: character, image and camera prompts you can paste into Midjourney, Veo, Runway and ElevenLabs to make faceless videos.",
    h1: "Poor vs. Rich Animals AI Video Prompts",
    intro:
      "Poor vs. Rich Animals is one of the strongest faceless formats right now: comedic, contrasting, charming storytelling built around the two-sided animal cast. Every blueprint below locks the same character, the gold and cream on one side, grey and rust on the other palette and back-and-forth → heart beat pacing, so your channel looks like one show instead of twenty unrelated clips. Copy a prompt, paste it straight into your image, video or voice engine, and swap only the topic.",
    prompts: [
      {
        title: "Cold open",
        character:
          'The Two-Sided Animal Cast — comedic, contrasting, charming tone. Voice: Dual character voices, comedic, 150 WPM, Broad comedy with a soft ending. Opening line: "Poor dog versus rich dog: [your topic]."',
        visual:
          "Vertical 9:16 image of two-sided animal cast in split frame: marble penthouse against a rainy alley, full subject in frame, natural face and complete anatomy, poor side: patched brown coat and taped shoes, palette of gold and cream on one side, grey and rust on the other, pixar-style 3d, split screen contrast, warm vs cold grade, expressive animal rig, punchy comedy timing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow push-in: two-sided animal cast enters the frame, split frame: marble penthouse against, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Setup",
        character:
          'The Two-Sided Animal Cast — comedic, contrasting, charming tone. Voice: Dual character voices, comedic, 150 WPM, Broad comedy with a soft ending. Opening line: "Same animal, two worlds: [your topic]."',
        visual:
          "Vertical 9:16 image of two-sided animal cast in restaurant table set twice, luxury and scraps, full subject in frame, natural face and complete anatomy, rich side: velvet blazer, gold chain, tiny sunglasses, palette of gold and cream on one side, grey and rust on the other, pixar-style 3d, split screen contrast, warm vs cold grade, expressive animal rig, punchy comedy timing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Lateral dolly: two-sided animal cast reacts to the turn, restaurant table set twice, luxury, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Turn",
        character:
          'The Two-Sided Animal Cast — comedic, contrasting, charming tone. Voice: Dual character voices, comedic, 150 WPM, Broad comedy with a soft ending. Opening line: "Guess which one is happier in [your topic]."',
        visual:
          "Vertical 9:16 image of two-sided animal cast in shared street where both animals meet, full subject in frame, natural face and complete anatomy, both animals share the same species and build, palette of gold and cream on one side, grey and rust on the other, pixar-style 3d, split screen contrast, warm vs cold grade, expressive animal rig, punchy comedy timing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Handheld orbit: two-sided animal cast moves toward the key prop, shared street where both animals, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Payoff",
        character:
          'The Two-Sided Animal Cast — comedic, contrasting, charming tone. Voice: Dual character voices, comedic, 150 WPM, Broad comedy with a soft ending. Opening line: "Poor dog versus rich dog: [your topic]."',
        visual:
          "Vertical 9:16 image of two-sided animal cast in split frame: marble penthouse against a rainy alley, full subject in frame, natural face and complete anatomy, props: dented tin bowl versus crystal plate, palette of gold and cream on one side, grey and rust on the other, pixar-style 3d, split screen contrast, warm vs cold grade, expressive animal rig, punchy comedy timing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Low-angle rise: two-sided animal cast holds the payoff beat, split frame: marble penthouse against, continuous motion, cinematic 24fps --motion 3",
      },
      {
        title: "Loop-back",
        character:
          'The Two-Sided Animal Cast — comedic, contrasting, charming tone. Voice: Dual character voices, comedic, 150 WPM, Broad comedy with a soft ending. Opening line: "Same animal, two worlds: [your topic]."',
        visual:
          "Vertical 9:16 image of two-sided animal cast in restaurant table set twice, luxury and scraps, full subject in frame, natural face and complete anatomy, poor side: patched brown coat and taped shoes, palette of gold and cream on one side, grey and rust on the other, pixar-style 3d, split screen contrast, warm vs cold grade, expressive animal rig, punchy comedy timing, negative space in the top third for captions --ar 9:16 --no blurry, lowres, mutated anatomy, text, watermark, extra limbs",
        camera:
          "Slow pull-back: two-sided animal cast settles as the loop resets, restaurant table set twice, luxury, continuous motion, cinematic 24fps --motion 3",
      },
    ],
    faqs: [
      {
        question: "What makes a poor vs. rich animals video work?",
        answer:
          "Back-and-Forth → Heart Beat pacing, one locked character (the two-sided animal cast) and a consistent palette of gold and cream on one side, grey and rust on the other. Keep the spoken script under 30 seconds and let the visuals carry the turn.",
      },
      {
        question: "Which AI tools suit poor vs. rich animals?",
        answer:
          "Generate the stills in Midjourney, Leonardo, Flux or Imagen, animate them in Veo, Runway, Kling or Luma, and narrate with ElevenLabs at roughly 150 WPM.",
      },
      {
        question: "How do I keep the subject consistent between shots?",
        answer:
          "Reuse the same description and a fixed seed in every prompt. Describe the same markings, proportions and colours every time so the subject never mutates.",
      },
      {
        question: "How long should poor vs. rich animals videos be?",
        answer:
          "30 to 60 seconds for Shorts, Reels and TikTok — roughly 65 to 80 spoken words with four shots. Long-form works once the format is proven.",
      },
    ],
    relatedSlugs: ["ai-cat-and-pet-stories", "ai-animal-cooking", "pov-immersive-vlogs"],
  },
];

export const NICHE_SLUGS = NICHE_PAGES.map((n) => n.slug);

export function getNichePage(slug: string): NichePage | undefined {
  return NICHE_PAGES.find((n) => n.slug === slug);
}
