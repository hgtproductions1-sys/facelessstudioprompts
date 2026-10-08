/**
 * The Faceless Prompts: 24 Authentic Niches Reference & Dataset
 * Restored from repository commit 271d346371f0528234145ff51ff46d5888d0c248
 * 
 * Contains:
 * - 24 Authentic Programmatic SEO Niche Pages (NICHE_PAGES)
 * - 24 Unified Niche Studio Data definitions (NICHES_DATA)
 * - Types and lookup helpers
 */

import type { NicheData } from '../types';

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
  primaryKeyword: string;
  secondaryKeywords: string[];
  difficulty: "Easy" | "Medium" | "Hard";
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
    seoTitle: "AI Cat & Pet Stories Prompts — Free Generator",
    metaDescription: "Explore AI Cat & Pet Stories with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "AI Cat & Pet Stories Prompt Generator",
    primaryKeyword: "AI cat video prompt generator",
    secondaryKeywords: [
    "ai pet stories",
    "faceless cat video generator",
    "how to make ai cat videos",
    "best pet niches for youtube",
    "midjourney cat prompts",
    "ai animal story generator"
  ],
    difficulty: "Medium",
    intro: "This format may suit animal-story viewers. Start with a specific idea, such as a stray cat finding shelter. Keep fur markings and proportions consistent, and label fictional scenes clearly. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Stray's First Winter",
      "character": "[shivering] The snow was cold, but the glowing window across the street promised warmth. I just had to cross the white desert.",
      "visual": "A small orange tabby kitten shivering in a snowy alleyway looking toward a warmly lit bakery window, cozy cinematic lighting, hyper-realistic fur, 85mm lens",
      "camera": "Slow low-angle push in on kitten shivering in the snow, warm glow reflecting in its eyes, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Guard Dog's Secret",
      "character": "[deep, protective] They think I sleep all day. They don't see the shadows that try to creep in at midnight.",
      "visual": "A massive scarred German Shepherd sitting attentively in a dark living room bathed in moonlight, shadows creeping under the door, intense stare, photorealistic",
      "camera": "Slow tracking shot circling the German Shepherd in the dark, moonlight catching dust motes, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Clumsy Thief",
      "character": "[fast, panicked] The fish was right there! How was I supposed to know the counter was slippery?",
      "visual": "A fluffy white Persian cat slipping off a marble kitchen counter, a cooked fish suspended in mid-air, comedic action shot, bright natural kitchen lighting",
      "camera": "Handheld micro-shake following the cat slipping off the counter, fast motion, bright lighting, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Loyal Wait",
      "character": "[sad, drawn out] Five years. That's how long I've sat at this station. He said he'd be right back.",
      "visual": "An old Akita dog waiting faithfully at a bustling train station in the rain, people walking past in blurred motion, melancholic blue lighting, highly detailed",
      "camera": "Static shot with time-lapse effect of people rushing past the stationary waiting dog, rain falling, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Midnight Meeting",
      "character": "[whisper, sly] When the humans close their eyes, the real neighborhood council begins.",
      "visual": "Three neighborhood cats sitting in a circle on a moonlit rooftop, plotting, glowing yellow eyes, starry night sky background, cinematic shadows",
      "camera": "Slow crane shot lowering onto the three cats on the rooftop, subtle ear twitches, continuous smooth motion, cinematic 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI pet niche monetizable?",
      "answer": "It can support ads, sponsorships, affiliates, or pet-related offers, but revenue varies by audience, geography, originality, watch behavior, and platform eligibility. Treat monetization as something to test after you have a consistent format and real viewer data."
    },
    {
      "question": "What tools do I need to make AI cat stories?",
      "answer": "You will need a script generator (like ChatGPT or Claude), an image generator that handles fur textures well (Midjourney or Leonardo AI), a video motion engine (Runway, Kling, or Veo), and an emotive voiceover tool (ElevenLabs)."
    },
    {
      "question": "How do I keep the same cat character in every video?",
      "answer": "Use an approved reference image and the character controls supported by your selected model. Repeat the pet's breed, color, proportions, and unique markings in every scene, then compare the outputs for continuity. A seed alone does not guarantee identity."
    },
    {
      "question": "Do pet stories perform better on Shorts or Long-form?",
      "answer": "Shorts are useful for testing characters and story hooks quickly. Longer compilations can create more watch time when viewers already care about the series, but neither format guarantees growth or higher revenue. Compare retention and returning-viewer data on your own channel."
    }
  ],
    relatedSlugs: [
    "ai-animal-cooking",
    "poor-vs-rich-animals-ai-skits",
    "lullaby-and-sleep-music"
  ],
  },
  {
    slug: "ai-animal-cooking",
    name: "AI Animal Cooking",
    niche: "AI Animal Cooking",
    seoTitle: "AI Animal Cooking Prompts — Free Generator",
    metaDescription: "Explore AI Animal Cooking with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "AI Animal Cooking Prompt Generator",
    primaryKeyword: "AI animal cooking video generator",
    secondaryKeywords: [
    "animals cooking youtube shorts",
    "faceless animal chef prompts",
    "how to make ai cooking videos",
    "midjourney animal prompts",
    "ai food video generator"
  ],
    difficulty: "Hard",
    intro: "This format may suit viewers who enjoy playful food stories. Start with a specific idea, such as a bear preparing campfire ramen. Keep utensils, ingredient scale, and the cooking sequence readable. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Bear Baker",
      "character": "[warm, deep] First, you need wild honey. Not the store-bought kind. The kind you fight bees for.",
      "visual": "A large grizzly bear wearing a flour-dusted chef apron kneading dough on a wooden table in a cozy rustic cabin kitchen, sunlight streaming through the window, highly detailed food textures, cinematic cozy lighting",
      "camera": "Slow push-in on bear's paws kneading the soft dough, flour dust floating in the air, warm sunlight, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Sushi Cat",
      "character": "[sharp, precise] Precision is everything. One wrong cut, and the salmon loses its spirit.",
      "visual": "A serious tuxedo cat dressed as a sushi chef standing behind a sushi counter, cleanly slicing a beautiful piece of raw salmon with a miniature knife, neon Tokyo background lighting, hyper-realistic",
      "camera": "Close-up macro tracking shot of the cat's paw slicing the glossy salmon, neon reflections, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Raccoon Barista",
      "character": "[fast, energetic] Double shot of espresso, oat milk, and a tiny bit of trash-can magic. Order up!",
      "visual": "A cute raccoon wearing a green barista apron pulling an espresso shot from a gleaming silver espresso machine, cozy dimly lit coffee shop, steam rising from the cup, photorealistic",
      "camera": "Slow pan right revealing the raccoon barista pulling the espresso shot, steam volumetrics rising, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Fox Pizza Master",
      "character": "[smooth, confident] The secret to the perfect crust? A wood-fired oven and a lot of attitude.",
      "visual": "A red fox tossing a spinning pizza dough in the air inside a traditional Italian pizzeria, roaring fire in the brick oven behind it, flour suspended in the air, warm amber lighting",
      "camera": "Slow-motion tilt up following the spinning pizza dough in the air as the fox watches, fire flickering in the background, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Hedgehog Pastry Chef",
      "character": "[high-pitched, sweet] Decorating cupcakes takes a gentle touch... something my spikes don't always understand.",
      "visual": "A tiny hedgehog wearing a miniature white chef hat carefully piping pink frosting onto a small vanilla cupcake, pastel bakery background, soft macro photography, highly detailed",
      "camera": "Macro push-in on the hedgehog carefully piping frosting, shallow depth of field, pastel lighting, continuous smooth motion, cinematic 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI animal cooking niche monetizable?",
      "answer": "It can be suitable for ads, food or kitchen sponsorships, and affiliate links when the content is original and advertiser-friendly. Visual storytelling may travel across languages, but actual revenue and reach depend on the audience and platform."
    },
    {
      "question": "What tools do I need for AI cooking videos?",
      "answer": "You need an image generator that excels at food textures and object permanence (choose a tool that keeps the food and utensils consistent), a motion model capable of handling subtle hand/paw movements (Kling or Runway), and ElevenLabs for the voiceover."
    },
    {
      "question": "How do I prevent the AI from generating weird paws?",
      "answer": "AI struggles with animals holding human tools. Always use negative prompts like 'extra limbs, deformed paws, warped tools' and prompt for 'macro close-up on paws' rather than full-body action shots to reduce rendering errors."
    },
    {
      "question": "Should I add real cooking sound effects?",
      "answer": "Absolutely. Adding high-quality ASMR sound effects (chopping, sizzling, pouring) is critical for viewer retention and helps disguise any slight visual imperfections in the AI video generation."
    }
  ],
    relatedSlugs: [
    "miniature-asmr-cooking",
    "ai-cat-and-pet-stories",
    "ai-asmr-cooking-cleaning-restoration"
  ],
  },
  {
    slug: "pov-immersive-vlogs",
    name: "POV Immersive Vlogs",
    niche: "POV Immersive Vlogs",
    seoTitle: "POV Immersive Vlog Prompts — Free Generator",
    metaDescription: "Explore POV Immersive Vlogs with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "POV Immersive Vlog Prompt Generator",
    primaryKeyword: "POV AI video generator",
    secondaryKeywords: [
    "immersive vlog prompts",
    "first person ai video generator",
    "how to make pov faceless videos",
    "midjourney pov prompts",
    "runway gen 3 pov settings",
    "faceless travel vlog ai"
  ],
    difficulty: "Easy",
    intro: "This format may suit viewers who enjoy immersive scenes. Start with a specific idea, such as a quiet walk through a miniature night market. Keep viewpoint and spatial direction consistent between shots. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Rainy Cyberpunk Walk",
      "character": "[whisper, tired] Three days in this neon maze, and the rain still hasn't stopped. I need to find the lower levels.",
      "visual": "POV shot looking down a rainy neon-lit cyberpunk alleyway, holding a glowing digital map in left hand, puddles reflecting purple and cyan lights, gritty cinematic realism, 24mm lens",
      "camera": "First-person POV forward walking motion, slight handheld camera bob, rain falling, neon lights reflecting, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Cozy Cabin Morning",
      "character": "[soft, relaxed] There's nothing quite like the sound of firewood cracking before the sun comes up.",
      "visual": "POV shot looking at two hands holding a steaming mug of black coffee in front of a roaring stone fireplace inside a cozy log cabin, snowy window in the background, warm amber lighting, hyper-detailed",
      "camera": "First-person POV static shot with slight natural breathing sway, steam rising from the coffee mug, fire flickering, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Abandoned Mall",
      "character": "[nervous, quick] They said this place was empty. But I just heard footsteps on the floor above me.",
      "visual": "POV shot holding a shaking flashlight pointing down a dark, overgrown abandoned shopping mall corridor, shattered glass on the floor, eerie moonlight filtering through broken skylights, found footage style",
      "camera": "First-person POV slow creeping forward motion, flashlight beam swaying erratically, dust particles in the air, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Space Station Window",
      "character": "[awe-struck, slow] Looking down at Earth from up here... it makes all our problems seem so incredibly small.",
      "visual": "POV shot looking through a massive glass observation window on a futuristic space station, Earth glowing brightly in the darkness below, reflection of an astronaut helmet in the glass, sci-fi cinematic lighting",
      "camera": "First-person POV slow push-in toward the observation window, Earth rotating slowly below, subtle floating sway, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Tokyo Night Drive",
      "character": "[calm, reflective] Driving at 2 AM is the only time this city actually lets you think.",
      "visual": "POV shot from the driver's seat of a vintage sports car driving down an empty Tokyo highway at night, neon streetlights blurring past the windshield, glowing dashboard dials, cinematic moody grading",
      "camera": "First-person POV driving forward, streetlights reflecting and passing over the windshield, subtle car vibrations, continuous smooth motion, cinematic 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the POV immersive vlog niche monetizable?",
      "answer": "It can be monetized through ads, sponsorships, affiliates, or longer ambient videos if the channel develops an audience. RPM and eligibility vary widely, so build around viewer satisfaction and original production rather than assuming a particular rate."
    },
    {
      "question": "What tools do I need for AI POV videos?",
      "answer": "Midjourney is essential for generating the initial 'POV shot looking at...' base image. Runway or Kling is critical for generating the first-person walking or driving motion, and you will need robust sound effect libraries for immersion."
    },
    {
      "question": "How do I make the camera motion look realistic?",
      "answer": "In your video AI prompts, use terms like 'first-person POV,' 'handheld camera bob,' or 'natural breathing sway.' Avoid high motion settings, as POV videos look best with slow, deliberate, and immersive movements."
    },
    {
      "question": "How long should POV vlogs be?",
      "answer": "Shorts can test intense or aesthetic moments efficiently, while longer ambient videos give interested viewers more time in the setting. Use your own retention and watch-time data to decide which format deserves more production effort."
    }
  ],
    relatedSlugs: [
    "analog-horror-and-unsolved-mysteries",
    "pixel-game-pov",
    "zombie-apocalypse-drama"
  ],
  },
  {
    slug: "anime-fight-versus",
    name: "Anime Fight Versus",
    niche: "Anime Fight Versus",
    seoTitle: "Anime Fight Versus Prompts — Free Generator",
    metaDescription: "Explore Anime Fight Versus with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Anime Fight Versus Prompt Generator",
    primaryKeyword: "AI anime fight generator",
    secondaryKeywords: [
    "anime versus video prompts",
    "faceless anime shorts generator",
    "how to make anime comparison videos",
    "midjourney niji anime prompts",
    "ai combat video generator"
  ],
    difficulty: "Easy",
    intro: "This format may suit animation and action fans. Start with a specific idea, such as a friendly contest between two original characters. Choreograph one readable action at a time and use characters you have rights to depict. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Fire Mage vs. The Ice Swordsman",
      "character": "[fast, hyped] In the red corner, mastery over the inferno. In the blue corner, a blade cold enough to freeze time. Who takes the crown?",
      "visual": "A split screen showing a furious fire mage cloaked in rising flames on the left, and a stoic ice swordsman drawing a glowing frost katana on the right, epic anime battle aesthetic, studio ghibli mixed with ufotable style, highly detailed 2D animation --niji 6",
      "camera": "Fast dynamic zoom in on the two anime characters clashing, fire and ice particles exploding on impact, high impact motion, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Cyber Ninja vs. The Mecha Tank",
      "character": "[aggressive, intense] Speed versus absolute defense. Can a blade made of pure plasma cut through impenetrable titanium armor? Let's look at the stats.",
      "visual": "A sleek cyber ninja with a glowing neon katana leaping through the air toward a massive, heavily armed mecha tank, dystopian city background, vivid anime style, dynamic low angle perspective, 90s anime aesthetic --niji 6",
      "camera": "Slow motion panning tracking shot following the cyber ninja leaping through the air, neon trails behind the blade, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Shadow Assassin vs. The Light Paladin",
      "character": "[dark, dramatic] One strikes from the darkness, unseen. The other commands the blinding power of the sun. It's stealth versus raw holy power.",
      "visual": "A shadowy assassin with glowing purple eyes dissolving into black mist, dodging a massive beam of golden light fired by a heavily armored holy paladin, epic anime confrontation, intense contrasting lighting, ufotable animation style --niji 6",
      "camera": "Fast whip pan from the paladin firing the light beam to the assassin dodging into shadows, intense light bloom, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Gravity Manipulator vs. The Time Stopper",
      "character": "[analytical, fast] If you can crush a black hole, does it matter if your opponent can stop the clock? This is the ultimate hax battle.",
      "visual": "An anime villain floating in mid-air surrounded by crushed floating debris with glowing purple gravity rings, facing a hero holding a glowing pocket watch with time-fracture visual effects, epic anime showdown, high energy --niji 6",
      "camera": "Circular orbit shot around the floating gravity manipulator, debris floating in slow motion, intense anime aura effects, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Dragon Tamer vs. The Demon King",
      "character": "[loud, booming] A pact with the ancient skies, challenged by the ruler of the underworld! The scale of this fight is apocalyptic!",
      "visual": "An anime warrior riding a massive roaring red dragon breathing fire down upon a towering horned demon king shrouded in black lightning, apocalyptic wasteland, epic anime keyframe, 4k resolution --niji 6",
      "camera": "Epic aerial pull-back shot revealing the massive scale of the dragon facing the demon king, lightning flashing, continuous smooth motion, cinematic 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the anime versus niche monetizable?",
      "answer": "Original fighters reduce some intellectual-property risk compared with copying protected characters, but monetization approval is never automatic. Keep designs, names, music, footage, and story elements original and review the platform's current monetization and reused-content rules before publishing."
    },
    {
      "question": "What tools do I need for AI anime videos?",
      "answer": "Use an image tool that supports the original illustration style you want, a video tool for readable motion, and an editor for timing and sound. Check the current controls supported by your selected model."
    },
    {
      "question": "How do I make the fights look dynamic?",
      "answer": "AI video generators struggle with complex martial arts choreography. Instead, prompt for 'clashing weapons,' 'aura effects,' or 'particle explosions,' and use CapCut's shake and flash transitions between clips to simulate high-speed combat."
    },
    {
      "question": "How do I drive engagement in versus videos?",
      "answer": "A specific question can encourage genuine discussion, such as asking which ability changed the matchup. Use calls to action only when they fit the episode; judge them by your own comment quality and retention rather than assuming an algorithm boost."
    }
  ],
    relatedSlugs: [
    "cartoon-horror-illustration",
    "bible-and-mythology-anime",
    "ranking-and-top-5-countdowns"
  ],
  },
  {
    slug: "stickman-explainer-and-skits",
    name: "Stickman Explainer & Skits",
    niche: "Stickman Explainer & Skits",
    seoTitle: "Stickman Explainer & Skits Prompts — Free Generator",
    metaDescription: "Explore Stickman Explainer & Skits with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Stickman Explainer & Skits Prompt Generator",
    primaryKeyword: "stickman video generator ai",
    secondaryKeywords: [
    "stickman animation prompts",
    "how to make stickman skits",
    "ai whiteboard animation generator",
    "midjourney vector prompts",
    "faceless sketch comedy ai"
  ],
    difficulty: "Easy",
    intro: "This format may suit viewers who like concise visual explanations. Start with a specific idea, such as a stick figure learning to organize a busy day. Give each scene one point and check that the visuals explain it. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The 3-Second Rule of Focus",
      "character": "[fast, energetic] You scroll past thousands of videos a day. Why did you stop on this one? It's all about dopamine timing.",
      "visual": "A minimalist black vector stickman standing against a pure white background, scratching its head with a thought bubble showing a glowing brain, clean 2D line art style, vector illustration, flat design",
      "camera": "Static shot with a quick digital zoom-in on the stickman's thought bubble as it pops, clean motion, 24fps"
    },
    {
      "title": "The Invisible Wall Trap",
      "character": "[panicked, high-pitched] I've been walking straight for three hours! Why is the world just a flat screen?!",
      "visual": "A black vector stickman frantically running into a transparent glass wall on a stark white grid background, minimalist comic strip style, sharp lines, highly expressive",
      "camera": "Tracking pan left following the running stickman until it hits the wall and bounces back, smooth vector motion, 24fps"
    },
    {
      "title": "How Money Actually Works",
      "character": "[calm, analytical] Imagine trading a chicken for a laptop. Sound ridiculous? That's literally how the banking system started.",
      "visual": "Two black vector stickmen handing a stylized gold coin back and forth over a minimal grey line graph, clean infographic aesthetic, corporate Memphis minimalist style",
      "camera": "Smooth pan right following the gold coin passing between hands, clean educational motion, 24fps"
    },
    {
      "title": "The Procrastination Loop",
      "character": "[whisper, guilty] I'll just check my phone for five minutes. And suddenly, it's 3 AM and I'm watching deep-sea documentaries.",
      "visual": "A stickman sitting at a minimalist desk illuminated by a harsh blue smartphone screen glow, dark minimalist background, clean white vector outlines",
      "camera": "Slow vertical tilt down from the phone screen glow to the slumped stickman, subtle breathing motion, 24fps"
    },
    {
      "title": "The Bad Advice Guru",
      "character": "[confident, absurd] Feeling stressed? Try screaming at your microwave until it cooks your food faster. Works every time.",
      "visual": "A stickman aggressively pointing finger at a tiny square box representing a microwave, speed lines around the hands, comical doodle art style",
      "camera": "Snap-zoom in on the stickman's aggressive pointing hand, high-energy framing, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the stickman explainer niche monetizable?",
      "answer": "Explainer channels can support ads and sponsorships when the material is original, useful, and suitable for advertisers. Retention depends on the topic and execution, so prioritize clarity and evidence instead of stretching a video for monetization."
    },
    {
      "question": "What tools do I need for stickman AI videos?",
      "answer": "You need a scriptwriter (ChatGPT or Claude) for punchy dialogue, Midjourney with vector terms for clean character generation, and an editor like CapCut to assemble the clips with sound effects."
    },
    {
      "question": "How do I keep stickman designs completely clean?",
      "answer": "Include terms like 'pure white background, vector line art, flat design, minimalist' in your visual prompts and use negative prompts to block gradients, shading, and realistic textures."
    },
    {
      "question": "How should I evaluate this format?",
      "answer": "Test a specific idea with your intended audience, review your own results, and improve one choice at a time. This format does not guarantee views or earnings."
    }
  ],
    relatedSlugs: [
    "ranking-and-top-5-countdowns",
    "vox-style-paper-cut-commentary",
    "ai-influencer-product-reviews"
  ],
  },
  {
    slug: "ai-asmr-cooking-cleaning-restoration",
    name: "AI ASMR",
    niche: "AI ASMR (Cooking, Cleaning, Restoration)",
    seoTitle: "AI ASMR Prompts (Cooking, Cleaning, Restoration) — Free",
    metaDescription: "Explore AI ASMR with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "AI ASMR Prompt Generator",
    primaryKeyword: "ai asmr video generator",
    secondaryKeywords: [
    "ai restoration video prompts",
    "satisfying ai cleaning videos",
    "midjourney asmr textures",
    "how to make ai asmr content",
    "faceless satisfying shorts ai"
  ],
    difficulty: "Medium",
    intro: "This format may suit viewers who enjoy texture and quiet motion. Start with a specific idea, such as rain falling on a tiny greenhouse. Plan the sound separately and keep motion simple. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Rusty Pocket Watch Restoration",
      "character": "[whisper, soft] Thirty layers of oxidation couldn't hide the brass underneath. Let's bring her back to life.",
      "visual": "Macro close-up of a rusted brass pocket watch resting on a dark workbench, a metal pick scraping away crusty green corrosion, hyper-detailed textures, cinematic macro lighting, shallow depth of field",
      "camera": "Macro slow push-in tracking the metal pick scraping away rust flakes in ultra-sharp detail, continuous smooth motion, 24fps"
    },
    {
      "title": "The Deep Foam Clean",
      "character": "[whisper, calming] Watch the dirt lift away. Total satisfaction in three seconds flat.",
      "visual": "Macro shot of a grimy vintage leather boot covered in thick white cleaning foam, a soft-bristled brush sweeping across the surface revealing clean dark leather underneath, rich textures",
      "camera": "Close-up tracking shot sliding across the boot surface as the brush sweeps foam away, smooth cleaning motion, 24fps"
    },
    {
      "title": "The Kinetic Sand Slice",
      "character": "[whisper, crisp] Clean edges. Zero resistance. Pure auditory and visual harmony.",
      "visual": "A perfectly smooth brick of vibrant blue kinetic sand being sliced cleanly in half by a razor-sharp wire tool, micro-particles crumbling, clean studio lighting, 4k macro",
      "camera": "Slow motion macro drop shot as the wire tool slices downward through the kinetic sand block, 24fps"
    },
    {
      "title": "The Honeycomb Drizzle",
      "character": "[whisper, slow] Pure raw amber cascading over a block of fresh dairy butter. Take your time.",
      "visual": "Extreme macro shot of golden amber honey dripping slowly from a wooden dipper onto a square of yellow butter, glistening surfaces, warm lighting, hyper-realistic food textures",
      "camera": "Static macro shot with slow tilt down following the heavy honey stream pooling on the butter, 24fps"
    },
    {
      "title": "The Crystal Ice Crackle",
      "character": "[whisper, crisp] Hand-carved glacier ice meeting boiling water. Listen closely.",
      "visual": "A crystal clear spherical ice orb sitting on a dark slate coaster, micro-fractures glowing under subtle rim lighting, droplets of condensation sliding down the side",
      "camera": "Macro orbit shot slowly circling the melting ice orb, water droplets catching light highlights, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI ASMR niche monetizable?",
      "answer": "ASMR can support ads, sponsorships, or product affiliates, but earnings vary and repetitive or low-value generated content may not qualify for monetization. Original sound design, visible transformation, and meaningful editing make the format more defensible."
    },
    {
      "question": "What tools do I need for AI ASMR content?",
      "answer": "You need Midjourney for ultra-sharp macro textures, Kling or Runway for smooth motion generation, and a high-end sound effects library (or ElevenLabs SFX) to layer crisp scrubbing, scraping, and crackling audio."
    },
    {
      "question": "How do I make the visuals look hyper-realistic?",
      "answer": "Use macro photography keywords in your visual prompts, such as 'extreme macro close-up, shallow depth of field, micro-particles, rich textures, rim lighting' to force the AI to render fine tactile details."
    },
    {
      "question": "Why is audio more important than video in ASMR?",
      "answer": "ASMR is an auditory-first medium. If your visual generation is 90% good but your scrubbing, scraping, or sizzling sound design is pristine, viewers will watch the entire loop."
    }
  ],
    relatedSlugs: [
    "miniature-asmr-cooking",
    "ai-animal-cooking",
    "ai-car-wash-and-restoration"
  ],
  },
  {
    slug: "zombie-apocalypse-drama",
    name: "Zombie Apocalypse Drama",
    niche: "Zombie Apocalypse Drama",
    seoTitle: "Zombie Apocalypse Drama Prompts — Free Generator",
    metaDescription: "Explore Zombie Apocalypse Drama with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Zombie Apocalypse Drama Prompt Generator",
    primaryKeyword: "ai zombie video generator",
    secondaryKeywords: [
    "zombie apocalypse shorts prompts",
    "faceless survival story ai",
    "midjourney apocalyptic landscape prompts",
    "runway cinematic zombie settings",
    "how to make survival horror shorts"
  ],
    difficulty: "Medium",
    intro: "This format may suit fiction and suspense viewers. Start with a specific idea, such as a survivor finding a working radio. Maintain the setting and keep fictional events separate from real reporting. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Last Radio Broadcast",
      "character": "[raspy, exhausted] Day 412. If anyone is receiving this frequency... please tell me we aren't the only ones left in Chicago.",
      "visual": "An old analog radio sitting on a dusty wooden table inside a barricaded brick apartment, static green light glowing from the dial, overgrown weeds visible through a shattered window, gritty cinematic film grain",
      "camera": "Slow push-in on the glowing radio dial, dust motes floating in a single beam of moonlight, continuous motion, cinematic 24fps"
    },
    {
      "title": "The Overgrown Highway",
      "character": "[whisper, cautious] They used to call this the main evacuation route. Now it's just a graveyard of steel and silence.",
      "visual": "A desolate multi-lane highway completely overgrown with vines and abandoned rusted cars stretching into a foggy horizon, overcast grey sky, moody dystopian color grade, photorealistic",
      "camera": "Low-angle drone tracking shot moving slowly forward down the abandoned highway between wrecked cars, cinematic 24fps"
    },
    {
      "title": "The Shadow in the Fog",
      "character": "[tense, fast] Don't shine the flashlight. They don't need eyes to find us out here.",
      "visual": "A lone faceless survivor in a heavy hooded canvas jacket holding a tactical crossbow, standing inside a dense urban fog bank, silhouetted towering skyscrapers looming in the background",
      "camera": "Slow handheld orbit shot circling the survivor in the thick fog, tension-building movement, cinematic 24fps"
    },
    {
      "title": "The Supply Run",
      "character": "[breathing heavy] The pharmacy is cleared out, but there might still be antibiotics in the back dispensary.",
      "visual": "A shattered glass storefront of a ruined pharmacy, shelves stripped bare, debris scattered across the floor, harsh daylight cutting through broken security shutters, cinematic realism",
      "camera": "First-person POV creeping slow forward motion past broken glass displays into the dark pharmacy backroom, 24fps"
    },
    {
      "title": "The Safe Zone Beacon",
      "character": "[hopeful, solemn] They lit the green flare on the water tower. That means the outpost is still holding.",
      "visual": "A bright emerald-green flare burning intensely on top of a weathered brick water tower against a dark twilight sky, heavy smoke swirling upward, gritty post-apocalyptic atmosphere",
      "camera": "Tilt-up shot from ground level tracking the green smoke rising into the dark twilight sky, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the zombie apocalypse niche monetizable?",
      "answer": "It can be advertiser-friendly when the focus stays on story, atmosphere, and non-graphic suspense, but ad suitability is assessed per platform and sometimes per video. Review current violence and monetization policies rather than assuming compliance."
    },
    {
      "question": "What tools do I need for AI zombie videos?",
      "answer": "Midjourney is essential for gritty, cinematic dystopian environments. Runway or Kling handles eerie fog and slow camera movements, and ElevenLabs provides gritty, weathered narrator voices."
    },
    {
      "question": "How do I make apocalyptic settings look realistic?",
      "answer": "Lean heavily on environmental storytelling in your prompts: 'overgrown vines, rusted vehicles, ash particles, volumetric fog, anamorphic lens flares, gritty film grain.'"
    },
    {
      "question": "Do zombie stories work better as continuous series?",
      "answer": "Episodic labels such as \"Day 1\" and \"Day 2\" can make continuity easy to understand. Whether viewers return depends on the characters and unresolved stakes, so compare returning-viewer and completion data before committing to a long season."
    }
  ],
    relatedSlugs: [
    "pov-immersive-vlogs",
    "analog-horror-and-unsolved-mysteries",
    "cartoon-horror-illustration"
  ],
  },
  {
    slug: "bible-and-mythology-anime",
    name: "Bible & Mythology Anime",
    niche: "Bible & Mythology Anime",
    seoTitle: "Bible & Mythology Anime Prompts — Free Generator",
    metaDescription: "Explore Bible & Mythology Anime with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Bible & Mythology Anime Prompt Generator",
    primaryKeyword: "ai mythology anime generator",
    secondaryKeywords: [
    "biblical anime video prompts",
    "greek mythology anime shorts generator",
    "midjourney epic anime prompts",
    "how to make mythology animation",
    "faceless anime storytelling ai"
  ],
    difficulty: "Easy",
    intro: "This format may suit viewers interested in religious stories or mythology. Start with a specific idea, such as a scene adapted from a chosen source passage. Name the source and distinguish quotations from creative interpretation. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Wrath of Poseidon",
      "character": "[booming, powerful] When the ocean king raises his trident, entire empires are swallowed by the abyss in a single breath.",
      "visual": "An epic anime portrayal of Poseidon towering over a stormy sea, gripping a glowing golden trident as massive crashing waves surge toward a Greek temple, studio ufotable combat aesthetic, vivid colors --niji 6",
      "camera": "Low-angle dynamic push-up tracking Poseidon lowering his glowing trident toward the giant waves, 24fps"
    },
    {
      "title": "The Burning Bush",
      "character": "[whisper, reverent] Take off your sandals. The ground you stand upon is holy earth.",
      "visual": "A lone silhouetted ancient prophet kneeling before a gnarled desert acacia tree engulfed in brilliant, non-consuming blue and gold holy fire, dramatic dark background, masterwork anime keyframe --niji 6",
      "camera": "Slow orbit shot circling the kneeling figure and the glowing burning bush, divine light particle effects, 24fps"
    },
    {
      "title": "Thor's Final Strike",
      "character": "[grunting, fierce] Let the skies crack open! This is the end of the giants!",
      "visual": "Thor with braided red hair and glowing runic tattoos swinging Mjölnir downward, lightning exploding across a dark nordic mountain range, epic anime action sequence, high contrast --niji 6",
      "camera": "Fast whip-pan following the hammer swing as lightning shatters across the screen, high impact motion, 24fps"
    },
    {
      "title": "The Fall of Lucifer",
      "character": "[cold, defiant] Better to reign in darkness than to serve in the light.",
      "visual": "A majestic multi-winged angel falling backward through cascading celestial clouds, wings turning from pure white feathers into dark obsidian glass, dramatic divine lighting --niji 6",
      "camera": "Slow-motion downward tracking shot following the falling angel through the clouds, divine rays fading, 24fps"
    },
    {
      "title": "Anubis Weighs the Soul",
      "character": "[deep, solemn] The feather of truth decides your eternity. Let's see what your heart weighs.",
      "visual": "Anubis, the jackal-headed deity with glowing golden ornaments, standing beside an ancient scale holding a glowing human soul against a white feather, mystical temple background --niji 6",
      "camera": "Macro push-in on the ancient golden scale balancing the glowing soul, ethereal dust motes, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the mythology and biblical anime niche monetizable?",
      "answer": "Mythology and religious-story content can support ads or sponsorships when it is original, accurate about its sources, and handled respectfully. Monetization and ad suitability still depend on the specific treatment, audience, and platform review."
    },
    {
      "question": "What tools do I need for mythology anime videos?",
      "answer": "Use an image generator that can produce your chosen illustration style, a motion tool for simple movement, and an editor for pacing and sound. No single provider is required; test a short scene before committing to a workflow."
    },
    {
      "question": "How do I make mythical characters look truly epic?",
      "answer": "Incorporate scale indicators and divine lighting into your prompts: 'towering deity, glowing runic auras, dramatic volumetric god-rays, divine particle embers, masterwork anime keyframe.'"
    },
    {
      "question": "Do single-myth videos or multi-part series perform better?",
      "answer": "Character deep-dives can reward viewers who want context, while standalone visual shorts are easier to sample. Test both and compare search traffic, completion, and returning viewers rather than assuming one format will go viral."
    }
  ],
    relatedSlugs: [
    "anime-fight-versus",
    "cartoon-horror-illustration",
    "elderly-wisdom-and-stoic-long-form"
  ],
  },
  {
    slug: "ai-influencer-product-reviews",
    name: "AI Influencer Product Reviews",
    niche: "AI Influencer Product Reviews",
    seoTitle: "AI Influencer Product Review Prompts — Free Generator",
    metaDescription: "Explore AI Influencer Product Reviews with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "AI Influencer Product Review Prompt Generator",
    primaryKeyword: "ai influencer video generator",
    secondaryKeywords: [
    "virtual influencer product reviews",
    "faceless UGC video prompts",
    "midjourney hyperrealistic human prompts",
    "how to make ai UGC content",
    "ai affiliate marketing shorts generator"
  ],
    difficulty: "Hard",
    intro: "This format may suit people comparing products. Start with a specific idea, such as a clearly labeled demonstration of a desk accessory. Do not invent first-hand testing, testimonials, or product capabilities. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Minimalist Skincare Unboxing",
      "character": "[upbeat, friendly] I've tested fifty moisturizers this year, and this is the only one that didn't clog my pores by day three.",
      "visual": "A hyper-realistic 24-year-old female virtual influencer with natural skin texture holding a sleek amber glass dropper bottle in front of a sunlit modern bathroom vanity, 85mm lens, photoreal",
      "camera": "Handheld selfie-style micro-sway holding the skincare bottle up to the camera lens, bright natural lighting, 24fps"
    },
    {
      "title": "The Tech Gadget First Look",
      "character": "[excited, fast] Look at the bezel on this. For under fifty bucks, I honestly thought it was a scam.",
      "visual": "A young trendy male digital creator sitting at a clean desk holding a futuristic wireless charging pad, neon LED desk accents in the background, sharp focus on product",
      "camera": "Slow push-in framing the creator showcasing the tech gadget toward the camera, clean commercial lighting, 24fps"
    },
    {
      "title": "The Ergonomic Office Gear Test",
      "character": "[relieved, calm] If your lower back kills you after eight hours at a desk, stop scrolling right now.",
      "visual": "A professional virtual influencer adjusting a high-end ergonomic mesh office chair in a bright, minimalist loft apartment office space, photorealistic human features",
      "camera": "Pan left tracking the influencer adjusting the chair armrest, natural daylight streaming through large windows, 24fps"
    },
    {
      "title": "The Travel Backpack Review",
      "character": "[enthusiastic] It fits four days of clothes, a laptop, and still slides right under the airplane seat.",
      "visual": "A stylish female traveler standing in an airport terminal holding a sleek matte-black travel backpack, blurred travelers walking in the background, commercial lifestyle photography",
      "camera": "Handheld tracking shot as she swings the backpack around to show the zipper compartments, vibrant commercial grade, 24fps"
    },
    {
      "title": "The Smartwatch Fitness Tracking Test",
      "character": "[energetic, motivational] Tested it on a ten-mile run. The GPS accuracy is tighter than my sports watch.",
      "visual": "An athletic virtual creator with a sleek titanium smartwatch on their wrist wiping sweat in a modern gym setting, soft studio rim lighting, ultra-detailed",
      "camera": "Macro close-up tracking shot on the smartwatch screen lighting up as the creator taps it, dynamic motion, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI influencer product review niche monetizable?",
      "answer": "Product content can support ads, affiliate links, and sponsorships, but it also requires careful disclosure and accurate claims. An AI presenter should not imply personal use or testing that never occurred, and affiliate eligibility varies by program and location."
    },
    {
      "question": "What tools do I need for virtual influencer videos?",
      "answer": "Midjourney for hyper-realistic human character generation, Kling or LTX Studio for natural facial expressions and hand movements, and ElevenLabs for energetic, natural voice delivery."
    },
    {
      "question": "How do I maintain character consistency across multiple videos?",
      "answer": "Use an approved character reference and the identity controls supported by your chosen model. Repeat the defining physical details, keep the reference stable, and review every result for continuity."
    },
    {
      "question": "Do viewers mind that the creator is AI?",
      "answer": "As long as the product review is genuinely informative, engaging, and fast-paced, audiences treat AI influencers similarly to traditional UGC creators."
    }
  ],
    relatedSlugs: [
    "nostalgia-toy-unboxing",
    "ai-cat-and-pet-stories",
    "stickman-explainer-and-skits"
  ],
  },
  {
    slug: "lullaby-and-sleep-music",
    name: "Lullaby & Sleep Music",
    niche: "Lullaby & Sleep Music",
    seoTitle: "Lullaby & Sleep Music Prompts — Free Generator",
    metaDescription: "Explore Lullaby & Sleep Music with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Lullaby & Sleep Music Prompt Generator",
    primaryKeyword: "ai sleep music video generator",
    secondaryKeywords: [
    "lullaby video prompts",
    "ambient sleep music channel AI",
    "midjourney relaxing visual prompts",
    "how to make sleep channels youtube",
    "faceless ambient video ai"
  ],
    difficulty: "Easy",
    intro: "This format may suit listeners seeking a quiet background soundtrack. Start with a specific idea, such as a gentle instrumental bedtime scene. Use licensed audio and avoid promises about sleep or health outcomes. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Floating Cloud Kingdom",
      "character": "[whisper, ultra-soft] Close your eyes. Let the gentle wind carry you above the clouds where time stands still.",
      "visual": "A soft glowing crescent moon resting on a bed of fluffy pastel pink and lavender clouds, gentle starlight twinkling in a deep indigo night sky, dreamlike aesthetic, cozy and serene",
      "camera": "Slow, ultra-smooth horizontal drift gliding across the pastel cloudscape, continuous ambient motion, 24fps"
    },
    {
      "title": "The Enchanted Forest Rain",
      "character": "[whisper, calm] Listen to the soft rain tapping on ancient leaves. You are safe here.",
      "visual": "A glowing mossy tree trunk inside a misty nighttime forest, tiny bioluminescent mushrooms casting a soft blue glow, gentle raindrops creating ripples in a clear forest stream, photorealistic",
      "camera": "Slow vertical tilt down from the misty canopy to the glowing stream below, gentle rain falling, 24fps"
    },
    {
      "title": "The Starry Ocean Voyage",
      "character": "[whisper, deep sleep] The ocean waves are rocking you into a deep, peaceful sleep.",
      "visual": "A vintage wooden sailboat gently drifting on a mirror-flat, midnight-blue ocean reflecting a massive glowing Milky Way galaxy, peaceful atmosphere, cinematic lighting",
      "camera": "Slow lateral tracking shot following the drifting boat, gentle water ripples, 24fps"
    },
    {
      "title": "The Cozy Fireplace Cabin",
      "character": "[whisper, warm] A warm fire, a cozy blanket, and nothing else you need to do tonight.",
      "visual": "A warm stone fireplace with glowing embers inside a quiet wooden cabin, frost-covered window pane showing soft falling snow outside, cozy amber lighting, hyper-detailed",
      "camera": "Static shot with subtle fire ember glow shifting across the stone walls, ultra-slow calming motion, 24fps"
    },
    {
      "title": "The Cosmic Nebula Lullaby",
      "character": "[whisper, soothing] You are drifting through a universe built just for your dreams.",
      "visual": "A swirling cosmic nebula composed of soft turquoise and gold stardust clouds, peaceful deep space panorama, ethereal glowing particles floating gently",
      "camera": "Slow continuous forward zoom drifting through the glowing cosmic stardust clouds, peaceful motion, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the sleep music niche monetizable?",
      "answer": "Long ambient videos can accumulate watch time when listeners choose to keep them on, but watch hours do not guarantee monetization or strong RPM. Use original or properly licensed audio and avoid mass-produced near-duplicate uploads."
    },
    {
      "question": "What tools do I need for sleep channels?",
      "answer": "Midjourney for serene landscape visuals (usually in 16:9 horizontal format), an AI music generator like Suno or Sonauto for relaxing frequencies, and an editor to loop the assets."
    },
    {
      "question": "Should sleep videos be 16:9 horizontal or 9:16 vertical?",
      "answer": "Horizontal (16:9) is traditional and preferred for YouTube long-form sleep streams and background relaxation, while vertical (9:16) works well for short ambient TikTok loops."
    },
    {
      "question": "How do I loop AI video clips smoothly?",
      "answer": "Keep motion subtle and plan matching opening and ending states. Use supported motion controls in your selected tool, then compare the loop boundary in your editor and adjust it until the transition is smooth."
    }
  ],
    relatedSlugs: [
    "ai-cat-and-pet-stories",
    "pov-immersive-vlogs",
    "elderly-wisdom-and-stoic-long-form"
  ],
  },
  {
    slug: "analog-horror-and-unsolved-mysteries",
    name: "Analog Horror & Unsolved Mysteries",
    niche: "Analog Horror & Unsolved Mysteries",
    seoTitle: "Analog Horror Series Prompts — Free Generator",
    metaDescription: "Explore Analog Horror & Unsolved Mysteries with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Analog Horror & Unsolved Mysteries Prompt Generator",
    primaryKeyword: "ai analog horror generator",
    secondaryKeywords: [
    "analog horror video prompts",
    "vhs style ai generator",
    "unsolved mysteries shorts prompts",
    "midjourney creepy vintage prompts",
    "how to make analog horror"
  ],
    difficulty: "Medium",
    intro: "This format may suit fictional mystery and atmospheric horror viewers. Start with a specific idea, such as an invented broadcast from an abandoned station. Label fiction and avoid presenting invented events as real evidence. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Emergency Broadcast Override",
      "character": "[distorted, robotic voice] Warning. Do not look outside. If you see a familiar face at your window, do not open the door.",
      "visual": "An old 1980s CRT television screen displaying a corrupted amber emergency alert text box over static snow, dark living room background, VHS scanline artifacts, chromatic aberration",
      "camera": "Static camera with heavy VHS tape glitch flicker and subtle scanline rolling motion, 24fps"
    },
    {
      "title": "The Abandoned Ward Sign",
      "character": "[whisper, eerie] The hospital was closed in 1984. But someone is still turning on the hallway lights at night.",
      "visual": "A weathered metal sign reading 'Oakridge Asylum' hanging from a rusted chain against a rotting concrete wall, heavy green-tinted night-vision grain, creepy VHS aesthetic",
      "camera": "Slow handheld night-vision pan across the rusted sign, grain distortion and digital noise, 24fps"
    },
    {
      "title": "The Uncanny Smiling Figure",
      "character": "[calm, unsettling] We thought it was a mannequin in the forest. Then it turned its head when we blinked.",
      "visual": "Found footage style snapshot of a tall, faceless figure in a vintage suit standing perfectly still among dark pine trees, unnatural proportions, heavy VHS film degradation",
      "camera": "Slow micro-zoom in on the shadowy figure standing between the trees, static grain jitter, 24fps"
    },
    {
      "title": "The Missing Persons Tape",
      "character": "[static crackle] Last footage recovered from Camera B before signal loss at Sublevel 3.",
      "visual": "A timestamp overlay reading '03:14:1987' in bright green font over a dark underground concrete corridor lit by a single flickering fluorescent tube light",
      "camera": "Handheld jerky camera movement mimicking someone walking cautiously down a dark hallway, 24fps"
    },
    {
      "title": "The Decayed Family Portrait",
      "character": "[whisper] They smiled for the camera. But their reflections in the mirror were missing.",
      "visual": "A faded 1970s Polaroid photograph of a smiling family sitting on a porch, their facial features blurred into smooth skin, eerie vintage color grading, analog noise",
      "camera": "Static shot with a slow vintage projector flicker effect and dust particles, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the analog horror niche monetizable?",
      "answer": "Atmospheric horror can be more advertiser-friendly than graphic material, but no horror format is automatically eligible for monetization. Keep violence restrained, label fiction clearly, and review current ad-suitability rules for each platform."
    },
    {
      "question": "What tools do I need for analog horror?",
      "answer": "Midjourney for vintage, grainy base images, video editors like CapCut or Premiere with VHS overlay effects and audio distortion plugins, and ElevenLabs for eerie or robotic voice filters."
    },
    {
      "question": "How do I achieve the authentic VHS look?",
      "answer": "Include keywords like 'VHS scanlines, chromatic aberration, magnetic tape noise, CRT television distortion, analog color grading' in your visual prompts."
    },
    {
      "question": "Why is sound design critical in horror?",
      "answer": "Analog horror is 70% sound. Low-frequency drone hums, tape static, muffled radio squelch, and sudden silence create the psychological dread that drives viewer retention."
    }
  ],
    relatedSlugs: [
    "pov-immersive-vlogs",
    "zombie-apocalypse-drama",
    "cartoon-horror-illustration"
  ],
  },
  {
    slug: "diy-cardboard-and-miniature-builds",
    name: "DIY Cardboard & Miniature Builds",
    niche: "DIY Cardboard & Miniature Builds",
    seoTitle: "DIY Cardboard & Miniature Build Prompts — Free Generator",
    metaDescription: "Explore DIY Cardboard & Miniature Builds with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "DIY Cardboard & Miniature Build Prompt Generator",
    primaryKeyword: "ai miniature build video generator",
    secondaryKeywords: [
    "diy cardboard crafts shorts prompts",
    "miniature architecture building ai",
    "midjourney macro crafting prompts",
    "how to make miniature building videos",
    "satisfying craft shorts ai"
  ],
    difficulty: "Medium",
    intro: "This format may suit craft and miniature enthusiasts. Start with a specific idea, such as a cardboard room with a working-looking lamp. Distinguish generated concept imagery from a build you actually completed. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Cardboard Cyberpunk Arcade",
      "character": "[upbeat, clever] Two cereal boxes, a hot glue gun, and forty hours of cutting. Welcome to the micro-arcade.",
      "visual": "Extreme macro shot of a tiny fully-detailed miniature arcade cabinet built entirely out of corrugated cardboard, working tiny LED screen glowing inside, workbench background",
      "camera": "Slow macro push-in panning across the miniature arcade cabinet details, shallow depth of field, 24fps"
    },
    {
      "title": "The Miniature Cliffside Castle",
      "character": "[whisper, focused] Every stone carved by hand using balsa wood and grey acrylic paint.",
      "visual": "Macro top-down view of a miniature medieval fortress built on a small rocky outcrop, tiny moss details and wooden drawbridge, realistic weathering textures",
      "camera": "Slow overhead macro orbiting shot circling the miniature castle on the rock, 24fps"
    },
    {
      "title": "The Working Cardboard Hydraulic Press",
      "character": "[fast, curious] Can a tiny cardboard press crush a solid steel nut? Let's find out.",
      "visual": "Macro close-up of a miniature wooden and cardboard hydraulic press mechanism compressing a small toy object, detailed gears and levers, workshop lighting",
      "camera": "Macro side tracking shot as the miniature press lever pushes downward, smooth mechanical motion, 24fps"
    },
    {
      "title": "The Secret Underground Vault",
      "character": "[satisfying, calm] Building a secret subterranean bunker beneath a standard wooden desk.",
      "visual": "Macro cross-section view of a miniature underground bunker connected by tiny ladders and secret rooms carved into foam board, warm interior lighting",
      "camera": "Slow vertical tilt down revealing the multi-level underground miniature bunker, 24fps"
    },
    {
      "title": "The Tiny V8 Engine Build",
      "character": "[enthusiastic] Working miniature pistons built from soda cans and paperclips. Hear it click.",
      "visual": "Extreme macro shot of miniature metallic engine blocks and tiny pistons assembled on a workshop mat, ultra-sharp focus, metallic reflections",
      "camera": "Macro push-in tracking tiny mechanical parts fitting together, crisp focus, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the DIY miniature building niche monetizable?",
      "answer": "Craft content can support ads, tool or material affiliates, and sponsorships when the videos are original and safe. Revenue is not inherently stable; it depends on audience, geography, advertiser demand, and the platform's monetization review."
    },
    {
      "question": "What tools do I need for miniature AI videos?",
      "answer": "Midjourney with macro lens parameters (`macro photography, shallow depth of field`), Kling or Runway for motion, and crisp crafting sound effects (scissor snips, glue gun clicks)."
    },
    {
      "question": "How do I make cardboard look hyper-realistic?",
      "answer": "Include tactile descriptors in your prompts: 'corrugated cardboard texture, frayed paper edges, acrylic paint weathering, micro-dust particles, macro photography.'"
    },
    {
      "question": "Why do miniature builds keep retention high?",
      "answer": "A clear progression from raw materials to a finished object gives viewers a reason to continue. Show meaningful steps and an honest final reveal, then use your own retention data to assess the edit."
    }
  ],
    relatedSlugs: [
    "miniature-asmr-cooking",
    "ai-asmr-cooking-cleaning-restoration",
    "vegetable-and-fruit-carving"
  ],
  },
  {
    slug: "vegetable-and-fruit-carving",
    name: "Vegetable & Fruit Carving",
    niche: "Vegetable & Fruit Carving",
    seoTitle: "Vegetable & Fruit Carving Prompts — Free Generator",
    metaDescription: "Explore Vegetable & Fruit Carving with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Vegetable & Fruit Carving Prompt Generator",
    primaryKeyword: "ai fruit carving video generator",
    secondaryKeywords: [
    "vegetable carving shorts prompts",
    "satisfying food art ai",
    "midjourney macro carving prompts",
    "how to make fruit carving videos",
    "faceless food craft ai"
  ],
    difficulty: "Medium",
    intro: "This format may suit viewers interested in decorative food presentation. Start with a specific idea, such as a carved apple flower concept. Show clear stages and avoid presenting generated imagery as a tested tutorial. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Watermelon Dragon Lotus",
      "character": "[whisper, calm] One clean stroke transforms a heavy melon into a blooming lotus flower.",
      "visual": "Extreme macro shot of a sharp artisan carving knife peeling back the dark green rind of a watermelon to reveal vibrant pink inner layers sculpted into intricate dragon scales, studio lighting",
      "camera": "Macro slow push-in tracking the knife blade slicing into the watermelon rind, ultra-sharp detail, 24fps"
    },
    {
      "title": "The Pumpkin Lantern Peony",
      "character": "[satisfying, smooth] Thin layers of orange flesh falling away like velvet silk.",
      "visual": "Macro close-up of a vibrant orange pumpkin being carved into a multi-layered blooming peony flower, crisp edges, wood carving table background, soft rim lighting",
      "camera": "Close-up macro tracking shot sliding across the pumpkin petals as the carving tool shapes them, 24fps"
    },
    {
      "title": "The Soap Bar Flower Carving",
      "character": "[whisper, crisp] The cleanest curls you'll see all day. Pure visual satisfaction.",
      "visual": "A translucent emerald-green soap bar being shaved into delicate, curling rose petals by a small chisel tool, soapy flakes dusting the workbench, bright macro photography",
      "camera": "Macro drop shot following the curved chisel slicing off a translucent soap curl, 24fps"
    },
    {
      "title": "The Radish Swan Masterpiece",
      "character": "[precise, delicate] Turning a simple white root vegetable into an elegant floating swan.",
      "visual": "Macro shot of a crisp white daikon radish being carved into delicate feathered wings, droplets of water glistening on the vegetable surface, clean studio lighting",
      "camera": "Slow rotating macro orbit around the partially carved radish swan, glistening water droplets, 24fps"
    },
    {
      "title": "The Avocado Rose Bloom",
      "character": "[smooth, slow] Perfectly ripe, perfectly sliced, perfectly arranged.",
      "visual": "Top-down macro shot of thin, fan-folded green avocado slices being curled into a blooming rose shape on a dark slate board, glistening olive oil sheen",
      "camera": "Static macro top-down shot with slow tilt as the final avocado petal locks into place, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the fruit and vegetable carving niche monetizable?",
      "answer": "Food-art content can support ads or culinary partnerships, but 'brand-safe' and RPM are not guaranteed. Keep the presentation original, avoid unsafe technique claims, and let actual audience data guide monetization decisions."
    },
    {
      "question": "What tools do I need for carving ASMR videos?",
      "answer": "Midjourney for ultra-vibrant macro food photography, Kling or Runway for smooth knife motion, and crisp ASMR cutting/scraping audio effects."
    },
    {
      "question": "How do I make the produce look glossy and fresh?",
      "answer": "Add lighting and texture descriptors to your prompts: 'glistening water droplets, vibrant color saturation, glossy surface sheen, macro photography, shallow depth of field.'"
    },
    {
      "question": "Why do carving shorts get high replay value?",
      "answer": "Viewers often re-watch the beginning of the video once they see the final sculpted result, trying to figure out how the creator managed such precision from a raw vegetable."
    }
  ],
    relatedSlugs: [
    "miniature-asmr-cooking",
    "ai-asmr-cooking-cleaning-restoration",
    "diy-cardboard-and-miniature-builds"
  ],
  },
  {
    slug: "ai-car-wash-and-restoration",
    name: "AI Car Wash & Restoration",
    niche: "AI Car Wash & Restoration",
    seoTitle: "AI Car Wash & Restoration Prompts — Free Generator",
    metaDescription: "Explore AI Car Wash & Restoration with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "AI Car Wash & Restoration Prompt Generator",
    primaryKeyword: "ai car wash video generator",
    secondaryKeywords: [
    "car restoration ai prompts",
    "satisfying pressure washing shorts",
    "midjourney automotive textures",
    "how to make car cleaning videos",
    "faceless vehicle detailing ai"
  ],
    difficulty: "Medium",
    intro: "This format may suit vehicle-detailing enthusiasts. Start with a specific idea, such as a dusty model car cleaned in four stages. Keep the vehicle geometry and before-and-after framing consistent. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Muddy Off-Road Foam Blast",
      "character": "[whisper, satisfying] Watch that caked-on clay slide off the rocker panel in one thick sheet.",
      "visual": "Macro close-up of a high-pressure spray nozzle blasting thick white snow foam off the muddy side panel of a matte-black off-road truck, water droplets glistening, cinematic lighting",
      "camera": "Fast tracking pan left following the high-pressure water stream stripping away mud layers, 24fps"
    },
    {
      "title": "The Vintage Porsche Paint Polish",
      "character": "[smooth, calm] Twenty years of oxidation wiped away to reveal glass-like crimson paint.",
      "visual": "Close-up of a rotary buffer spinning across the faded red hood of a vintage 1975 Porsche 911, white polishing compound swirling under studio overhead lights, hyper-realistic reflections",
      "camera": "Macro push-in tracking the spinning polishing pad as dull paint instantly turns into mirror-gloss, 24fps"
    },
    {
      "title": "The Rusted Wheel Hub Restoration",
      "character": "[firm, satisfying] Stripping away thirty winters of road salt down to bare forged alloy.",
      "visual": "Extreme macro shot of a wire brush wheel scrubbing heavy orange rust off a vintage wire wheel hub, sparks and iron dust flying, dark garage workshop lighting",
      "camera": "Close-up macro tracking shot of wire bristles clearing rust flakes off the chrome spokes, 24fps"
    },
    {
      "title": "The Crystal Clear Headlight Restoration",
      "character": "[whisper] Yellowed, hazy plastic turned completely transparent with one swipe.",
      "visual": "Macro shot of a mechanic's gloved hand wiping a specialized ceramic coating across a foggy, yellowed car headlight, half of the lens instantly turning crystal clear, sharp contrast",
      "camera": "Slow lateral wipe tracking the microfiber cloth revealing the clear lens underneath, 24fps"
    },
    {
      "title": "The Hydrophobic Water Beading",
      "character": "[calm] Water doesn't even touch the paint. Pure ceramic protection.",
      "visual": "Extreme macro shot of pure crystal water beads rolling effortlessly off a newly ceramic-coated midnight blue supercar hood, neon shop lights reflecting in every droplet",
      "camera": "Slow motion macro drop shot as water droplets slide rapidly off the angled hood surface, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the car wash and restoration niche monetizable?",
      "answer": "Automotive audiences may attract relevant advertisers and affiliate opportunities, but RPM varies widely. Original transformations, accurate product claims, and clear differentiation from reused detailing footage matter more than assuming a premium ad rate."
    },
    {
      "question": "What tools do I need for car detailing AI videos?",
      "answer": "Midjourney for hyper-realistic car paint reflections and textures, Kling or Runway for water spray and buffer motion, and crisp pressure washer/polisher audio effects."
    },
    {
      "question": "How do I make automotive paint look realistic?",
      "answer": "Include reflection and lighting keywords in your prompts: 'mirror-gloss paint finish, studio overhead light reflections, water bead physics, metallic flake clear coat.'"
    },
    {
      "question": "Why do transformation videos perform so well?",
      "answer": "A clear before-and-after contrast makes the transformation easy to understand. Match the opening and final camera angle so viewers can judge the change directly rather than relying on exaggerated claims."
    }
  ],
    relatedSlugs: [
    "diy-cardboard-and-miniature-builds",
    "ai-asmr-cooking-cleaning-restoration",
    "miniature-asmr-cooking"
  ],
  },
  {
    slug: "miniature-asmr-cooking",
    name: "Miniature ASMR Cooking",
    niche: "Miniature ASMR Cooking",
    seoTitle: "Miniature ASMR Cooking Prompts — Free Generator",
    metaDescription: "Explore Miniature ASMR Cooking with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Miniature ASMR Cooking Prompt Generator",
    primaryKeyword: "ai miniature cooking video generator",
    secondaryKeywords: [
    "miniature kitchen ASMR prompts",
    "tiny cooking shorts AI",
    "midjourney macro food photography prompts",
    "how to make mini cooking videos",
    "satisfying tiny food AI"
  ],
    difficulty: "Medium",
    intro: "This format may suit miniature and food-video viewers. Start with a specific idea, such as a tiny kitchen preparing a bowl of noodles. Maintain scale across ingredients, props, and utensils. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Tiny Cast-Iron Pancake",
      "character": "[whisper, soft] A drop of batter on a coin-sized skillet. Watch it bubble.",
      "visual": "Extreme macro shot of a tiny copper skillet on a miniature working stove, a single silver-dollar-sized golden pancake bubbling, tiny pat of butter melting on top, shallow depth of field",
      "camera": "Macro push-in tracking a tiny spatula flipping the miniature pancake over, 24fps"
    },
    {
      "title": "The Micro Sushi Platter",
      "character": "[whisper, crisp] Grain by grain. The smallest salmon nigiri you've ever seen.",
      "visual": "Macro top-down view of a tiny wooden cutting board, tweezers placing a microscopic slice of salmon over a tiny ball of sushi rice, pristine studio lighting",
      "camera": "Static top-down macro shot with a subtle focus pull onto the tiny salmon grain, 24fps"
    },
    {
      "title": "The Tiny Teapot Brew",
      "character": "[whisper, calming] Boiling water in a teapot no larger than your thumb.",
      "visual": "Macro close-up of a tiny ceramic teapot resting over a miniature candle flame, delicate steam rising from the spout, rustic wooden counter background",
      "camera": "Slow vertical tilt tracking the delicate steam trail rising from the tiny teapot spout, 24fps"
    },
    {
      "title": "The Micro Burger Assembly",
      "character": "[satisfying, slow] Lettuce, cheese, and a beef patty smaller than a dime.",
      "visual": "Extreme macro cross-section view of tiny sesame seed bun halves stacked over a microscopic grilled beef patty and melted cheese square, vivid colors",
      "camera": "Macro slow orbit shot circling the tiny assembled burger on a slate tile, 24fps"
    },
    {
      "title": "The Miniature Honey Pot",
      "character": "[whisper] Golden amber sweetness poured from a ceramic pot the size of a marble.",
      "visual": "Macro shot of a tiny ceramic honey jar tilted over a miniature wooden waffle, a thick golden strand of honey pooling on the grid, hyper-detailed textures",
      "camera": "Macro tracking shot following the heavy honey strand dripping onto the tiny waffle, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the miniature cooking niche monetizable?",
      "answer": "Miniature cooking can work across languages and may suit ads, sponsors, or craft/food affiliates, but completion and revenue depend on execution. Original sets, coherent scale, and satisfying process are more useful goals than assumed performance."
    },
    {
      "question": "What tools do I need for miniature cooking AI videos?",
      "answer": "Midjourney for macro food textures, Kling or Runway for subtle flame and motion rendering, and crisp ASMR cooking audio effects (frying sizzle, utensil clinks)."
    },
    {
      "question": "How do I make food look convincing at a micro scale?",
      "answer": "Use macro photography tags: 'extreme macro close-up, shallow depth of field, micro-scale props, macro lens bokeh, vibrant food textures.'"
    },
    {
      "question": "Why do miniature videos hold attention so well?",
      "answer": "The novelty of tiny, fully functional objects creates instant cognitive curiosity, keeping viewers locked in to see if the food actually comes together."
    }
  ],
    relatedSlugs: [
    "ai-animal-cooking",
    "vegetable-and-fruit-carving",
    "ai-asmr-cooking-cleaning-restoration"
  ],
  },
  {
    slug: "nostalgia-toy-unboxing",
    name: "Nostalgia Toy Unboxing",
    niche: "Nostalgia Toy Unboxing",
    seoTitle: "Nostalgia Toy Unboxing Prompts — Free Generator",
    metaDescription: "Explore Nostalgia Toy Unboxing with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Nostalgia Toy Unboxing Prompt Generator",
    primaryKeyword: "ai toy unboxing video generator",
    secondaryKeywords: [
    "nostalgia toy unboxing shorts",
    "retro 90s toy prompts AI",
    "midjourney vintage packaging prompts",
    "how to make nostalgia content",
    "faceless toy collecting AI"
  ],
    difficulty: "Easy",
    intro: "This format may suit toy collectors and nostalgic viewers. Start with a specific idea, such as an original retro-style toy revealed from its box. Use accurate product details and distinguish imagined toys from real releases. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Translucent 90s Handheld",
      "character": "[excited, fast] Look at that atomic purple shell. They don't build them with clear plastic like this anymore.",
      "visual": "Macro unboxing shot of a pristine translucent purple 90s handheld gaming console inside its original retro cardboard box with colorful neon graphics, mint condition, studio lighting",
      "camera": "Handheld macro pull-back revealing the vintage console lifting out of its molded plastic insert, 24fps"
    },
    {
      "title": "The Sealed Holographic Card Pack",
      "character": "[whisper, tense] Twenty-five years old, and the foil wrapper is still factory sealed. Do we open it?",
      "visual": "Close-up of a pair of hands holding a pristine 1999 holographic trading card booster pack under warm retail display lighting, sharp retro typography on foil wrapper",
      "camera": "Slow push-in framing the foil pack with light reflecting off the holographic seal, 24fps"
    },
    {
      "title": "The Cybernetic Action Figure",
      "character": "[energetic] Chrome armor, spring-loaded missile launcher, and cardback art that belongs in a museum.",
      "visual": "A vintage 90s action figure still sealed inside a mint-condition blister pack hanging on a peg, vibrant cartoon illustrations on cardboard backing, glossy plastic bubble",
      "camera": "Pan right tracking across the blister pack bubble, catching vintage plastic glare, 24fps"
    },
    {
      "title": "The Virtual Pet Keychain",
      "character": "[nostalgic, warm] The beep when it hatched. The panic when you forgot to feed it at school.",
      "visual": "Macro shot of a neon pink digital pet keychain resting on a colorful 90s geometric patterned desk mat, glowing LCD screen, retro packaging box blurred in background",
      "camera": "Macro push-in on the glowing pixel screen as the virtual pet icon blinks, 24fps"
    },
    {
      "title": "The Modular Racing Track Set",
      "character": "[excited] Glow-in-the-dark loop tracks and blue plastic cars. Peak Saturday morning engineering.",
      "visual": "A massive vintage 2000s toy box piled high with colorful modular track pieces and translucent cars, vibrant studio lighting, hyper-detailed cardboard texture",
      "camera": "Low-angle tracking shot moving slowly past the towering retro toy box stack, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the nostalgia toy niche monetizable?",
      "answer": "Nostalgia content can support ads, affiliates, or collector partnerships, but results depend on the audience and the rights around the products and media shown. Avoid unsupported value claims and keep AI recreations distinct from authentic collectibles."
    },
    {
      "question": "What tools do I need for nostalgia toy videos?",
      "answer": "Midjourney for rendering accurate retro packaging fonts and plastic textures, Runway or Kling for unboxing motions, and classic 90s background audio tracks."
    },
    {
      "question": "How do I make vintage packaging look authentic?",
      "answer": "Include era-specific design keywords in your prompts: '1990s retro packaging typography, translucent plastic blister pack, glossy cardboard box art, nostalgic toy aesthetic.'"
    },
    {
      "question": "Why does nostalgia content perform so well?",
      "answer": "Emotional resonance drives comments, shares, and high watch completion as viewers reminisce about their childhood items in the comment section."
    }
  ],
    relatedSlugs: [
    "ai-influencer-product-reviews",
    "ranking-and-top-5-countdowns",
    "stickman-explainer-and-skits"
  ],
  },
  {
    slug: "ranking-and-top-5-countdowns",
    name: "Ranking & Top 5 Countdowns",
    niche: "Ranking & Top 5 Countdowns",
    seoTitle: "Ranking & Top 5 Countdown Prompts — Free Generator",
    metaDescription: "Explore Ranking & Top 5 Countdowns with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Ranking & Top 5 Countdown Prompt Generator",
    primaryKeyword: "ai countdown video generator",
    secondaryKeywords: [
    "top 5 shorts prompts AI",
    "ranking video script generator",
    "midjourney comparison visual prompts",
    "how to make top 10 countdowns",
    "faceless listicle channel AI"
  ],
    difficulty: "Easy",
    intro: "This format may suit viewers comparing a clearly defined topic. Start with a specific idea, such as five unusual fictional vehicles. State your ranking criteria and verify factual entries before publishing. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Deep Sea Depth Scale (#1)",
      "character": "[deep, dramatic] At eleven thousand meters down, pressure crushes steel like paper. And yet, something is moving.",
      "visual": "Cinematic digital depth chart illustration showing a colossal bioluminescent leviathan lurking in the pitch-black abyss of the Mariana Trench, glowing blue accents, hyper-detailed",
      "camera": "Slow vertical pull-up tracking from total darkness toward a faint blue surface light far above, 24fps"
    },
    {
      "title": "The Most Expensive Supercar Ever Built (#1)",
      "character": "[fast, hyped] Number one. A fifty-million-dollar custom hypercar crafted entirely from exposed carbon and titanium.",
      "visual": "A sleek matte-black futuristic hypercar parked under neon display lights inside an underground Tokyo showroom, sharp geometric angles, photorealistic luxury automotive photography",
      "camera": "Slow cinematic orbit shot circling the luxury hypercar, reflections gleaming off body panels, 24fps"
    },
    {
      "title": "The Tallest Skyscraper Concept (#1)",
      "character": "[awe-struck] Piercing the stratosphere at four thousand meters high. Look down at the clouds.",
      "visual": "A colossal futuristic mega-skyscraper piercing through a blanket of white fluffy clouds into the upper atmosphere, golden hour sun setting against glass facade, sci-fi concept art",
      "camera": "Low-angle tilt-up tracking shot scaling the immense height of the mega-skyscraper into the clouds, 24fps"
    },
    {
      "title": "The Strongest Ancient Armor (#1)",
      "character": "[commanding] Forged from meteorite iron, capable of deflecting a direct ballista bolt.",
      "visual": "An ornate black steel suit of samurai armor glowing with faint red internal heat runes on a dark museum pedestal, dramatic single key light, hyper-detailed textures",
      "camera": "Slow push-in framing the intricate helmet crest and shoulder guards of the armor, 24fps"
    },
    {
      "title": "The Most Isolated Place on Earth (#1)",
      "character": "[whisper, eerie] Two thousand miles from the nearest human settlement. Absolute silence.",
      "visual": "An aerial view of a tiny frozen research outpost sitting alone on a massive sheet of white Antarctic ice under a green aurora borealis sky, epic scale",
      "camera": "Slow high-altitude drone pull-back revealing the vast isolation of the polar ice shelf, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the ranking countdown niche monetizable?",
      "answer": "Countdowns can create a clear reason to keep watching, but retention and ad revenue are not automatically high. Strong sourcing, a defensible ranking rule, and concise explanations matter more than withholding number one for its own sake."
    },
    {
      "question": "What tools do I need for countdown videos?",
      "answer": "Midjourney for high-impact visual comparisons, a script generator for structured countdown scripts, and CapCut for dynamic number overlays and transition sound effects."
    },
    {
      "question": "How do I keep engagement high throughout the video?",
      "answer": "Tease the #1 spot immediately in your opening hook (e.g., 'Number one will completely change how you view...') and pace your script to escalate stakes with each step down."
    },
    {
      "question": "Should countdowns go from 5 down to 1 or 1 up to 5?",
      "answer": "Always count down from 5 to 1. Reaching the #1 spot at the very end of the video provides the psychological payoff that prevents viewers from swiping away early."
    }
  ],
    relatedSlugs: [
    "anime-fight-versus",
    "stickman-explainer-and-skits",
    "vox-style-paper-cut-commentary"
  ],
  },
  {
    slug: "vox-style-paper-cut-commentary",
    name: "Vox-Style Paper-Cut Commentary",
    niche: "Vox-Style Paper-Cut Commentary",
    seoTitle: "Vox-Style Paper-Cut Commentary Prompts — Free Generator",
    metaDescription: "Explore Vox-Style Paper-Cut Commentary with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Vox-Style Paper-Cut Commentary Prompt Generator",
    primaryKeyword: "ai vox style video generator",
    secondaryKeywords: [
    "paper cut animation prompts AI",
    "explanatory video style generator",
    "midjourney vector infographic prompts",
    "how to make vox style essays",
    "faceless commentary video AI"
  ],
    difficulty: "Medium",
    intro: "This format may suit viewers who enjoy visual explainers. Start with a specific idea, such as a paper-cut explanation of a daily habit. Use original graphics and cite evidence for factual claims. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Global Shipping Bottleneck",
      "character": "[calm, analytical] When one cargo ship blocks a single canal, the price of coffee in three countries doubles overnight.",
      "visual": "A stylized isometric paper-cut vector illustration of a massive cargo container ship wedged inside a narrow blue canal, miniature paper trees and container boxes lining the banks, clean flat design",
      "camera": "Smooth isometric camera pan sliding across the paper-cut container ship and canal layout, 24fps"
    },
    {
      "title": "The Urban Housing Crisis",
      "character": "[narrator, steady] Zoning laws weren't designed to protect neighborhoods. They were designed to limit supply.",
      "visual": "A layered paper-cut vector infographic showing miniature paper apartment buildings scaling upward against a clean grid background, bold red accent lines, flat vector art",
      "camera": "Smooth digital zoom-in focusing on the shifting paper building heights on the grid, 24fps"
    },
    {
      "title": "The Rise of Synthetic Currency",
      "character": "[analytical] Fiat money relies on trust. Code relies on mathematics. Here is how the shift happened.",
      "visual": "A minimalist paper-cut vector graphic of a golden physical coin dissolving into glowing digital binary code nodes, layered flat design, crisp shadows",
      "camera": "Smooth pan right following the paper coin transforming into digital data nodes, 24fps"
    },
    {
      "title": "The Psychology of Supermarkets",
      "character": "[whisper, engaging] Why is milk always forced to the absolute back corner of every grocery store?",
      "visual": "Top-down paper-cut vector blueprint of a grocery store floor plan, bright yellow and blue retail zones marked with tiny paper shopping cart icons, clean minimalism",
      "camera": "Overhead static shot with a smooth push-in toward the dairy aisle at the back corner, 24fps"
    },
    {
      "title": "The Lithium Battery Gold Rush",
      "character": "[steady, urgent] Electric cars run on lithium. But mining it creates a geopolitical chessboard.",
      "visual": "Layered paper-cut vector map of South America highlighting glittering mineral deposits with glowing isometric pins connected by thin dotted lines, clean editorial style",
      "camera": "Smooth pan across the paper-cut topographical map following the connecting dotted lines, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the Vox-style commentary niche monetizable?",
      "answer": "Well-researched explainers can support ads and sponsorships, but advertiser demand and RPM vary by topic and audience. For commentary, sourcing, originality, and a clear distinction between reporting and opinion are essential."
    },
    {
      "question": "What tools do I need for Vox-style videos?",
      "answer": "Midjourney with vector keywords (`paper-cut vector art, flat design, isometric infographic`), a deep-dive scriptwriter (Claude/ChatGPT), and a timeline editor like Premiere or CapCut for motion graphics."
    },
    {
      "question": "How do I make vector art look professional?",
      "answer": "Use clean design language in your prompts: 'layered paper cutouts, flat vector illustration, isometric perspective, clean editorial color palette, drop shadows.'"
    },
    {
      "question": "Why do explanatory video essays hold attention?",
      "answer": "They answer burning curiosity questions with authoritative pacing and clean visual aids, keeping viewers hooked on the logic of the narrative from start to finish."
    }
  ],
    relatedSlugs: [
    "stickman-explainer-and-skits",
    "ranking-and-top-5-countdowns",
    "elderly-wisdom-and-stoic-long-form"
  ],
  },
  {
    slug: "elderly-wisdom-and-stoic-long-form",
    name: "Elderly Wisdom & Stoic Long-Form",
    niche: "Elderly Wisdom & Stoic Long-Form",
    seoTitle: "Elderly Wisdom & Stoic Long-Form Prompts — Free",
    metaDescription: "Explore Elderly Wisdom & Stoic Long-Form with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Elderly Wisdom & Stoic Long-Form Prompt Generator",
    primaryKeyword: "ai stoic philosophy video generator",
    secondaryKeywords: [
    "stoic wisdom video prompts AI",
    "elderly mentor storytelling generator",
    "midjourney cinematic cinematic portraits",
    "how to make stoic YouTube channels",
    "faceless philosophy video AI"
  ],
    difficulty: "Easy",
    intro: "This format may suit viewers interested in reflective storytelling. Start with a specific idea, such as a fictional elder discussing a small daily habit. Do not attribute invented quotations to real people or present fiction as lived testimony. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Weight of Silence",
      "character": "[deep, gravelly, slow] You are suffering more in imagination than in reality. Sit down. Let me tell you what my grandfather taught me.",
      "visual": "Cinematic portrait of an elderly wise mentor with deep silver beard and weathered lines on his face sitting by a hearth fire inside a stone cabin, warm dramatic rim lighting, 85mm anamorphic lens",
      "camera": "Slow, ultra-subtle push-in framing the mentor's expressive eyes, fire embers flickering, 24fps"
    },
    {
      "title": "The Art of Letting Go",
      "character": "[calm, measured] Control what is within your power. Everything else belongs to the wind.",
      "visual": "An elderly monk standing on a high mountain cliff overlooking a misty valley at sunrise, wearing simple robes, dramatic god-rays piercing through clouds, photorealistic",
      "camera": "Slow crane shot rising slowly past the monk toward the vast horizon at sunrise, 24fps"
    },
    {
      "title": "On Facing Hardship",
      "character": "[wise, steady] Obstacles are not blocking the path. The obstacle *is* the path.",
      "visual": "Cinematic close-up of weathered hands carving a wooden figure in a quiet dimly lit workshop, dust motes dancing in a single window beam, deep cinematic shadows",
      "camera": "Macro slow pan tracking the carving knife shaving thin wood curls, contemplative pacing, 24fps"
    },
    {
      "title": "The Illusion of Urgency",
      "character": "[deep, reflective] Most men spend their lives preparing to live, while forgetting how to draw a single breath.",
      "visual": "An elderly scholar sitting at a heavy oak desk filled with ancient leather-bound books and an oil lamp burning low, midnight blue atmospheric grading, cinematic masterwork",
      "camera": "Static shot with a slow focal shift from the oil lamp flame to the scholar's contemplative face, 24fps"
    },
    {
      "title": "The Final Legacy",
      "character": "[warm, solemn] When your time comes, make sure the only thing empty is your potential.",
      "visual": "Cinematic wide shot of an old man walking down a tranquil stone pathway lined by ancient cypress trees under a golden autumn twilight sky, melancholic beauty",
      "camera": "Slow tracking shot walking backwards ahead of the old man down the tranquil path, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the stoic philosophy niche monetizable?",
      "answer": "Long-form philosophy can support ads, memberships, books, or relevant sponsors if viewers find the material useful. Avoid assuming a premium RPM, and prioritize sourced quotations, original commentary, and appropriate disclaimers for sensitive advice."
    },
    {
      "question": "What tools do I need for stoic wisdom videos?",
      "answer": "Midjourney for cinematic, soulful portraiture (typically in 16:9 horizontal format), ElevenLabs for deep, commanding mentor voiceovers, and atmospheric ambient soundtracks."
    },
    {
      "question": "Should wisdom videos be Shorts or Long-form?",
      "answer": "Shorts can introduce a single idea quickly, while 10-to-20 minute essays give you room for context and practical examples. Compare retention, returning viewers, and production effort on your own channel instead of assuming one length will produce a higher RPM."
    },
    {
      "question": "How do I make the AI characters look genuinely wise?",
      "answer": "Incorporate soulful descriptors into your prompts: 'weathered facial lines, contemplative expression, cinematic rim lighting, anamorphic lens, deep emotional gravitas.'"
    }
  ],
    relatedSlugs: [
    "lullaby-and-sleep-music",
    "bible-and-mythology-anime",
    "vox-style-paper-cut-commentary"
  ],
  },
  {
    slug: "ai-music-videos",
    name: "AI Music Videos",
    niche: "AI Music Videos",
    seoTitle: "AI Music Video Prompts — Free Generator",
    metaDescription: "Explore AI Music Videos with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "AI Music Video Prompt Generator",
    primaryKeyword: "ai music video generator",
    secondaryKeywords: [
    "ai music video prompts",
    "midjourney surreal visual prompts",
    "how to make ai music videos",
    "runway gen 3 music video settings",
    "faceless visualizer ai"
  ],
    difficulty: "Medium",
    intro: "This format may suit music and visual-art audiences. Start with a specific idea, such as a color-themed sequence set to licensed music. Time the cuts to the track and confirm rights to music and likenesses. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Neon Cyberpunk Synthwave Ride",
      "character": "[beat drop, energetic] Feel the bass line hit as we cruise through an endless neon expressway above a flooded futuristic metropolis.",
      "visual": "A vintage sports car driving fast down an elevated glowing pink neon highway slicing through a towering cyberpunk city, heavy rain reflections, synthwave aesthetic, cinematic 35mm",
      "camera": "Fast forward-tracking shot driving right behind the sports car, neon lights blurring past, 24fps"
    },
    {
      "title": "The Surreal Dreamscape Ballad",
      "character": "[slow tempo, dreamy] Floating weightless in a sea of forgotten memories and golden starlight.",
      "visual": "A lone astronaut floating peacefully inside a vast baroque cathedral where massive trees grow from the stone floor and the ceiling is open to a glowing nebula, surrealism art",
      "camera": "Slow, ultra-smooth orbital tracking shot circling the floating astronaut inside the surreal cathedral, 24fps"
    },
    {
      "title": "The Dark Techno Underground",
      "character": "[heavy bass, aggressive] Strobe lights, concrete pillars, and a rhythm you can't escape.",
      "visual": "Silhouetted crowd dancing inside an industrial brutalist concrete warehouse illuminated by harsh flashing white strobe lights and deep crimson laser beams, high contrast",
      "camera": "Handheld fast whip-pan tracking across the dancing silhouette crowd, intense strobe lighting flicker, 24fps"
    },
    {
      "title": "The Ethereal Forest Awakening",
      "character": "[ambient chords, light] When the first morning rays touch the ancient canopy, the magic begins to breathe.",
      "visual": "A glowing mystical deer with crystalline antlers standing inside an enchanted forest surrounded by floating amber light spores, hyper-detailed fantasy art, volumetric god-rays",
      "camera": "Slow push-in toward the mystical deer as light spores drift past the camera lens, 24fps"
    },
    {
      "title": "The Lo-Fi Rainy Window",
      "character": "[chill beats, nostalgic] Coffee cooling on the desk while the city sleeps outside the glass.",
      "visual": "Close-up of a steaming coffee mug sitting on a wooden windowsill inside a cozy bedroom, blurred Tokyo streetlights glowing through rain-streaked window glass, cozy lofi aesthetic",
      "camera": "Static camera shot with gentle condensation droplets sliding down the window glass, lofi vibe, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI music video niche monetizable?",
      "answer": "Music videos can support ads, distribution, or artist promotion when the audio and visuals are properly licensed. Rights management is the main constraint; repeated listening does not override copyright or monetization requirements."
    },
    {
      "question": "What tools do I need for AI music videos?",
      "answer": "Midjourney for hyper-stylized visual frames (typically 16:9 horizontal), Suno or Udio for original AI music composition, and Runway or Kling for synced motion sequences."
    },
    {
      "question": "How do I sync visuals to the music beat?",
      "answer": "Use video editing software like Premiere or CapCut to cut your generated AI clips precisely on the snare or bass drop, matching the pacing of the track."
    },
    {
      "question": "Should music video aspect ratios be 16:9 or 9:16?",
      "answer": "16:9 horizontal is the standard for YouTube music video premieres, while vertical 9:16 edits are essential for promoting song snippets on TikTok and YouTube Shorts."
    }
  ],
    relatedSlugs: [
    "lullaby-and-sleep-music",
    "ai-music-videos",
    "pov-immersive-vlogs"
  ],
  },
  {
    slug: "cartoon-horror-illustration",
    name: "Cartoon Horror Illustration",
    niche: "Cartoon Horror Illustration",
    seoTitle: "Cartoon Horror Illustration Prompts — Free Generator",
    metaDescription: "Explore Cartoon Horror Illustration with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Cartoon Horror Illustration Prompt Generator",
    primaryKeyword: "ai cartoon horror generator",
    secondaryKeywords: [
    "rubber hose horror prompts AI",
    "creepy 1930s cartoon generator",
    "midjourney vintage horror prompts",
    "how to make creepy cartoon shorts",
    "faceless horror animation AI"
  ],
    difficulty: "Medium",
    intro: "This format may suit fans of stylized spooky fiction. Start with a specific idea, such as a cheerful cartoon hallway that slowly changes. Use original characters and match the intensity to your intended audience. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Smiling Feline's Secret",
      "character": "[cheerful, distorted] Welcome to the clubhouse! We've been waiting for you to join our forever party.",
      "visual": "A vintage 1930s rubber-hose cartoon cat character with oversized pie-cut eyes and exaggerated wide grin standing on a stark white stage, ink splatter, retro cel animation style",
      "camera": "Static vintage projector frame with slow jitter, suddenly snap-zooming into the cartoon cat's black eyes, 24fps"
    },
    {
      "title": "The Abandoned Animation Studio",
      "character": "[whisper, eerie] The ink dried forty years ago. But someone is still drawing new frames on the desk.",
      "visual": "A dilapidated 1930s animation studio room covered in thick black ink drips, an old wooden desk with a glowing drafting board showing a terrifying sketch, sepia tone",
      "camera": "Slow handheld push-in panning across the ink-splattered drafting desk, eerie shadows, 24fps"
    },
    {
      "title": "The Creepy Singing Teapot",
      "character": "[high-pitched, glitching] Pour yourself a cup of liquid sorrow! It never gets cold!",
      "visual": "A classic rubber-hose cartoon teapot with a grinning human face pouring black ink instead of tea into a cracked porcelain teacup, surreal horror illustration",
      "camera": "Macro tracking shot following the thick black ink pouring out of the teapot spout, 24fps"
    },
    {
      "title": "The Distorted Mickey Blueprint",
      "character": "[deep laugh, glitching] You thought this was a children's show? Look closer at the background.",
      "visual": "A vintage monochrome character poster peeling off a damp brick wall, revealing razor-sharp teeth and hollow eye sockets underneath, distressed grain texture",
      "camera": "Slow vertical tilt down past the peeling poster edges revealing the terrifying illustration underneath, 24fps"
    },
    {
      "title": "The Midnight Projection Room",
      "character": "[film crackle] The film reel is playing backwards. And the character on screen is walking toward the audience.",
      "visual": "A dark movie projection room illuminated only by a bright cone of dusty projector light shining toward an empty screen, vintage horror atmosphere",
      "camera": "Slow push-in tracking forward through the dusty projector light beam toward the blank screen, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the cartoon horror niche monetizable?",
      "answer": "Illustrated horror can support monetization when it is original and suitable for advertisers, but engagement and ad performance vary. Keep graphic content controlled and review the current platform rules for horror and violence."
    },
    {
      "question": "What tools do I need for creepy cartoon videos?",
      "answer": "Midjourney for 1930s rubber-hose character generation, video editors with vintage film grain and projector flicker plugins, and eerie voice modulation tools."
    },
    {
      "question": "How do I get the authentic 1930s cartoon look?",
      "answer": "Include vintage animation descriptors in your prompts: '1930s rubber-hose cartoon, pie-cut eyes, monochrome ink texture, vintage cel animation, sepia film grain.'"
    },
    {
      "question": "Why does cartoon horror resonate so well?",
      "answer": "It subverts wholesome childhood nostalgia into psychological dread, creating an instant curiosity gap that viewers watch until the very end."
    }
  ],
    relatedSlugs: [
    "analog-horror-and-unsolved-mysteries",
    "anime-fight-versus",
    "zombie-apocalypse-drama"
  ],
  },
  {
    slug: "pixel-game-pov",
    name: "Pixel Game POV",
    niche: "Pixel Game POV",
    seoTitle: "Pixel Game POV Prompts — Free Generator",
    metaDescription: "Explore Pixel Game POV with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Pixel Game POV Prompt Generator",
    primaryKeyword: "ai pixel art video generator",
    secondaryKeywords: [
    "pixel art game POV prompts",
    "retro RPG video generator AI",
    "midjourney 16 bit pixel prompts",
    "how to make pixel art shorts",
    "faceless gaming content AI"
  ],
    difficulty: "Easy",
    intro: "This format may suit pixel-art and game-inspired story viewers. Start with a specific idea, such as a first-person walk through an original pixel village. Keep the palette and sprite scale coherent between frames. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Cozy RPG Tavern Fireplace",
      "character": "[chiptune ambient, warm] Outside, a blizzard is burying the village. Inside, the hearth is burning bright.",
      "visual": "First-person POV in a 16-bit pixel art medieval tavern, sitting at a wooden table looking at a glowing stone fireplace and a mug of ale, warm amber pixel shading, retro RPG style",
      "camera": "Static 16-bit pixel art frame with subtle flame flickering animation and floating dust pixels, 24fps"
    },
    {
      "title": "The Cyberpunk Street Vendor",
      "character": "[synth beat, dark] Rain is pouring on the lower blocks. Time for a bowl of synthetic noodles.",
      "visual": "First-person POV in a 32-bit pixel art cyberpunk Tokyo alleyway, looking at a glowing neon noodle cart vendor shrouded in rain, intricate pixel details",
      "camera": "Subtle pixelated vertical bobbing motion mimicking first-person walking approach toward the noodle cart, 24fps"
    },
    {
      "title": "The Haunted Dungeon Entrance",
      "character": "[tense chiptune] The torch is flickering out. Step lightly down the stone steps.",
      "visual": "First-person POV holding a pixelated flickering torch looking down dark dungeon stone steps, eerie green slime on walls, retro gothic RPG aesthetic",
      "camera": "Slow pixelated forward creep down the dungeon stone steps, torch light swaying rhythmically, 24fps"
    },
    {
      "title": "The Midnight Fishing Trip",
      "character": "[relaxing synth] Just you, the calm lake, and whatever is biting under the moonlight.",
      "visual": "First-person POV looking out over a calm pixelated lake under a giant 16-bit full moon, holding a wooden fishing rod, peaceful indie game aesthetic",
      "camera": "Subtle water ripple pixel animation shifting across the calm lake surface under moonlight, 24fps"
    },
    {
      "title": "The Spaceship Cockpit Launch",
      "character": "[sci-fi alert] Initiating hyperdrive sequence. Hold onto your controls.",
      "visual": "First-person POV sitting inside a retro 16-bit spaceship cockpit looking out the front window at a massive glowing star system, blinking control panel buttons",
      "camera": "Rapid forward starfield stretch effect as spaceship engages hyperdrive, pixel art style, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the pixel game POV niche monetizable?",
      "answer": "Original gaming-style content can support ads, sponsorships, or game-related affiliates, but growth and revenue vary. Avoid copying a real game's protected assets or UI too closely and focus on a distinctive playable-looking concept."
    },
    {
      "question": "What tools do I need for pixel art videos?",
      "answer": "Midjourney with explicit pixel art descriptors, retro chiptune background tracks, and video editors to maintain crisp pixel scaling without blurring."
    },
    {
      "question": "How do I make AI generate clean pixel art?",
      "answer": "Incorporate strict pixel art tags in your prompts: '16-bit pixel art, retro RPG aesthetic, clean pixel grid, limited color palette, 90s video game style.'"
    },
    {
      "question": "Why do pixel art videos attract high engagement?",
      "answer": "They combine immersive game storytelling with visual comfort, making them ideal background loops for gaming enthusiasts and chill-hop listeners."
    }
  ],
    relatedSlugs: [
    "pov-immersive-vlogs",
    "analog-horror-and-unsolved-mysteries",
    "nostalgia-toy-unboxing"
  ],
  },
  {
    slug: "celebrity-evolution-and-glow-up",
    name: "Celebrity Evolution & Glow-Up",
    niche: "Celebrity Evolution & Glow-Up",
    seoTitle: "Celebrity Evolution & Glow-Up Prompts — Free Generator",
    metaDescription: "Explore Celebrity Evolution & Glow-Up with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Celebrity Evolution & Glow-Up Prompt Generator",
    primaryKeyword: "ai celebrity evolution video generator",
    secondaryKeywords: [
    "glow up transition prompts AI",
    "character evolution video generator",
    "midjourney age progression prompts",
    "how to make glow up shorts",
    "faceless pop culture content AI"
  ],
    difficulty: "Medium",
    intro: "This format may suit viewers interested in visual timelines. Start with a specific idea, such as the changing wardrobe of an original fictional character. Use documented facts for real people and clearly label synthetic or speculative imagery. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Streetwear Icon Evolution",
      "character": "[upbeat, fast] From thrift store hustler to global fashion week headliner. Watch the evolution.",
      "visual": "A hyper-realistic 25-year-old male fashion designer wearing vintage 90s oversized denim and thrift jacket standing against a raw urban brick wall, photoreal portrait",
      "camera": "Smooth portrait framing with micro head tilt, natural studio lighting, 24fps"
    },
    {
      "title": "The Cyberpunk Hacker Glow-Up",
      "character": "[confident, sleek] Started in a basement with a cracked monitor. Now running the grid.",
      "visual": "A hyper-realistic female tech prodigy with glowing augmented reality glasses and sleek futuristic jacket standing inside a glowing neon server room, cinematic lighting",
      "camera": "Slow push-in framing the subject as neon reflections glow across her glasses lens, 24fps"
    },
    {
      "title": "The Medieval Knight to Emperor",
      "character": "[deep, authoritative] A foot soldier in rusted chainmail. Ten years later, crowned ruler of the realm.",
      "visual": "A weathered medieval warlord wearing ornate black steel armor inlaid with gold filigree, standing inside a grand stone throne room, dramatic god-rays",
      "camera": "Low-angle majestic push-in tracking the emperor standing tall in the throne room, 24fps"
    },
    {
      "title": "The Vintage Starlet Transformation",
      "character": "[glamorous, smooth] Hollywood's golden age created stars. But she redefined the standard.",
      "visual": "A cinematic portrait of a 1950s classic Hollywood actress with vintage pin-up hairstyle and diamond necklace under moody retro spotlight, 35mm film grain",
      "camera": "Slow cinematic pan across her face catching sparkling diamond reflections, 24fps"
    },
    {
      "title": "The Athlete's Championship Journey",
      "character": "[intense, motivational] Sweat, setbacks, and endless repetition until the trophy was in his hands.",
      "visual": "An athletic sports star in a high-tech athletic training kit standing inside a massive packed stadium under bright floodlights, hyper-detailed sweat sheen",
      "camera": "Slow tracking orbit shot circling the athlete inside the glowing stadium arena, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the celebrity evolution niche monetizable?",
      "answer": "Public-figure timelines can attract entertainment audiences, but monetization depends on originality, rights, and treatment. Avoid deceptive synthetic likenesses, private speculation, and unlicensed media; focus on sourced public milestones."
    },
    {
      "question": "What tools do I need for evolution videos?",
      "answer": "For real people, use properly licensed source images and clearly label any illustrative synthetic imagery. Build the timeline around documented public milestones and use an editor for transitions."
    },
    {
      "question": "How do I maintain character consistency across transformations?",
      "answer": "Use consistent source references and verify each depicted era against reliable public records. Keep illustrative recreations clearly distinguished from genuine archival images."
    },
    {
      "question": "Why do glow-up videos hook viewers instantly?",
      "answer": "The visual contrast between humble beginnings and ultimate success triggers instant psychological gratification, prompting users to watch until the final transformation."
    }
  ],
    relatedSlugs: [
    "ai-influencer-product-reviews",
    "anime-fight-versus",
    "ranking-and-top-5-countdowns"
  ],
  },
  {
    slug: "poor-vs-rich-animals-ai-skits",
    name: "Poor vs. Rich Animals",
    niche: "Poor vs. Rich Animals (AI Skits)",
    seoTitle: "Poor vs. Rich Animals AI Skits Prompts — Free Generator",
    metaDescription: "Explore Poor vs. Rich Animals with editable script, image, and camera prompts, practical planning notes, and examples for your next video.",
    h1: "Poor vs. Rich Animals AI Skits Prompt Generator",
    primaryKeyword: "ai animal skits video generator",
    secondaryKeywords: [
    "poor vs rich animal prompts AI",
    "funny animal comparison shorts generator",
    "midjourney comedic animal prompts",
    "how to make animal skits YouTube",
    "faceless animal comedy AI"
  ],
    difficulty: "Easy",
    intro: "This format may suit viewers who enjoy light animal comedy. Start with a specific idea, such as two fictional pets finding different uses for the same box. Make the contrast clear through props and action without relying on stereotypes. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    prompts: [
    {
      "title": "The Diamond Collar Breakfast",
      "character": "[snobby, posh] Caviar and organic goat milk served on fine porcelain. Anything less gives me allergies.",
      "visual": "A pampered white Persian cat wearing a tiny diamond-studded collar sitting at a miniature mahogany dining table eating gourmet salmon from a gold bowl inside a luxury penthouse, bright lighting",
      "camera": "Slow macro push-in on the posh cat looking down its nose at the gold dining bowl, 24fps"
    },
    {
      "title": "The Cardboard Box Mansion",
      "character": "[cheerful, proud] Who needs a mansion when you have a pristine refrigerator box and a piece of string?",
      "visual": "A happy scruffy stray dog wearing a makeshift bandana sitting proudly inside a cardboard box fort decorated with old tennis balls, cozy alleyway background, warm sunlight",
      "camera": "Handheld micro-shake tracking shot smiling at the dog inside its cozy cardboard castle, 24fps"
    },
    {
      "title": "The Spa Day Pampering",
      "character": "[relaxed, pampered] Cucumber slices on the eyes, blueberry facial mask. Just a standard Tuesday.",
      "visual": "A fluffy golden retriever puppy lying comfortably in a marble spa bathtub wearing a fluffy white bathrobe and cucumber slices over its eyes, luxury spa interior",
      "camera": "Slow panning shot across the relaxed puppy in the luxury marble spa bath, 24fps"
    },
    {
      "title": "The Street Smart Hustle",
      "character": "[street-smart, fast] You buy your chew toys at the pet store. I negotiate mine directly from the neighborhood butcher.",
      "visual": "A sly-looking street cat wearing a tiny leather jacket sitting atop a stack of vintage wooden crates in a bustling outdoor market, cinematic golden hour lighting",
      "camera": "Low-angle tracking shot looking up at the cool street cat on the wooden crates, 24fps"
    },
    {
      "title": "The Private Jet Nap",
      "character": "[sleepy, rich] Flying first class is exhausting when your custom velvet seat is so plush.",
      "visual": "A pampered French bulldog wearing tiny aviator sunglasses sleeping soundly on a plush leather armchair inside a private jet cabin, sun streaming through oval window",
      "camera": "Slow macro push-in on the sleeping bulldog wearing aviator sunglasses, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the poor vs. rich animal skit niche monetizable?",
      "answer": "Fictional animal comedy can support ads or sponsorships when it is original and suitable for the intended audience, but high views and revenue are never guaranteed. Build repeatable characters and test which story setups viewers actually finish and share."
    },
    {
      "question": "What tools do I need for animal skit videos?",
      "answer": "Midjourney for humorous anthropomorphic animal styling, Kling or Runway for subtle expressions, and ElevenLabs for comedic, expressive voiceovers."
    },
    {
      "question": "How do I make the animal comedy land successfully?",
      "answer": "Pair absurd human luxury items (tiny sunglasses, gold bowls, silk bathrobes) with deadpan, serious voiceover delivery to maximize comedic contrast."
    },
    {
      "question": "How should I evaluate this format?",
      "answer": "Test a specific idea with your intended audience, review your own results, and improve one choice at a time. This format does not guarantee views or earnings."
    }
  ],
    relatedSlugs: [
    "ai-cat-and-pet-stories",
    "ai-animal-cooking",
    "nostalgia-toy-unboxing"
  ],
  }
];


export const NICHE_SLUGS = NICHE_PAGES.map((n) => n.slug);

export function getNichePage(slug: string): NichePage | undefined {
  return NICHE_PAGES.find((n) => n.slug === slug);
}


export const NICHES_DATA: NicheData[] = [
  {
    "id": "ai-cat-and-pet-stories",
    "title": "AI Cat & Pet Stories",
    "slug": "ai-cat-and-pet-stories",
    "category": "Pets, Animals & Character Lore",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who like short emotional, funny, or comforting animal stories with recurring characters.",
    "description": "This format may suit animal-story viewers. Start with a specific idea, such as a stray cat finding shelter. Keep fur markings and proportions consistent, and label fictional scenes clearly. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Pixar-Grade 3D, Soft Rim Light, Fur Detail Pass, Shallow Depth, Warm Bloom",
    "colorGrade": "honey gold, moss green, dusty cream",
    "soundscape": "70 BPM soft piano + strings; SFX: soft meow, purr, paw steps",
    "sampleHook": "Nobody thought this cat could survive {topic}.",
    "viralConcepts": [
      {
        "title": "The Stray's First Winter",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Guard Dog's Secret",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Clumsy Thief",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A small orange tabby kitten shivering in a snowy alleyway looking toward a warmly lit bakery window, cozy cinematic lighting, hyper-realistic fur, 85mm lens",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Warm single narrator, gentle storytelling pace)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "30–60 sec story shorts"
  },
  {
    "id": "ai-animal-cooking",
    "title": "AI Animal Cooking",
    "slug": "ai-animal-cooking",
    "category": "Food, Culinary & ASMR",
    "competition": "High",
    "difficulty": "Advanced",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who enjoy cute animals, miniature worlds, cooking visuals, and satisfying process videos.",
    "description": "This format may suit viewers who enjoy playful food stories. Start with a specific idea, such as a bear preparing campfire ramen. Keep utensils, ingredient scale, and the cooking sequence readable. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Hyperreal CGI Fur, Steam Volumetrics, Golden Kitchen Light, Macro Food Detail, Cozy Realism",
    "colorGrade": "butter yellow, forest green, toasted amber",
    "soundscape": "128 BPM bouncy ukulele + marimba; SFX: chop, sizzle, plate clink",
    "sampleHook": "This bear cooks {topic} better than most humans.",
    "viralConcepts": [
      {
        "title": "The Bear Baker",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Sushi Cat",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Raccoon Barista",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A large grizzly bear wearing a flour-dusted chef apron kneading dough on a wooden table in a cozy rustic cabin kitchen, sunlight streaming through the window, highly detailed food textures, cinematic cozy lighting",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Playful single narrator, children's-book energy)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "8–20 sec cooking loops"
  },
  {
    "id": "pov-immersive-vlogs",
    "title": "POV Immersive Vlogs",
    "slug": "pov-immersive-vlogs",
    "category": "Lifestyle, DIY & Ambience",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who want to feel placed inside unusual jobs, eras, adventures, or everyday situations.",
    "description": "This format may suit viewers who enjoy immersive scenes. Start with a specific idea, such as a quiet walk through a miniature night market. Keep viewpoint and spatial direction consistent between shots. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "First-Person Lens, Natural Light, Handheld Micro-Shake, Wide 18mm, Photoreal",
    "colorGrade": "sun-warmed sand, sky blue, worn timber",
    "soundscape": "ambient field recording, no music; SFX: footsteps, breathing, environment ambience",
    "sampleHook": "You just woke up in the middle of {topic}.",
    "viralConcepts": [
      {
        "title": "The Rainy Cyberpunk Walk",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Cozy Cabin Morning",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Abandoned Mall",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "POV shot looking down a rainy neon-lit cyberpunk alleyway, holding a glowing digital map in left hand, puddles reflecting purple and cyan lights, gritty cinematic realism, 24mm lens",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (First-person narrator, whispered internal monologue)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "8–30 sec POV shorts"
  },
  {
    "id": "anime-fight-versus",
    "title": "Anime Fight Versus",
    "slug": "anime-fight-versus",
    "category": "Animation, Anime & Gaming",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Anime and action viewers who enjoy matchups, power systems, transformations, and short fight choreography.",
    "description": "This format may suit animation and action fans. Start with a specific idea, such as a friendly contest between two original characters. Choreograph one readable action at a time and use characters you have rights to depict. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Anime Key Frame, Speed Lines, Impact Flash, Cel Shading, Ultra Dynamic",
    "colorGrade": "ink black, electric crimson, cold silver",
    "soundscape": "140 BPM epic orchestral + taiko drums; SFX: whoosh, impact boom, energy charge",
    "sampleHook": "Who actually wins {topic}?",
    "viralConcepts": [
      {
        "title": "The Fire Mage vs. The Ice Swordsman",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Cyber Ninja vs. The Mecha Tank",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Shadow Assassin vs. The Light Paladin",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A split screen showing a furious fire mage cloaked in rising flames on the left, and a stoic ice swordsman drawing a glowing frost katana on the right, epic anime battle aesthetic, studio ghibli mixed with ufotable style, highly detailed 2D animation --niji 6",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (High-energy announcer, hype-man pacing)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "8–20 sec versus shorts"
  },
  {
    "id": "stickman-explainer-and-skits",
    "title": "Stickman Explainer & Skits",
    "slug": "stickman-explainer-and-skits",
    "category": "Animation, Anime & Gaming",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who prefer quick explanations, relatable jokes, and minimal visuals that are easy to follow.",
    "description": "This format may suit viewers who like concise visual explanations. Start with a specific idea, such as a stick figure learning to organize a busy day. Give each scene one point and check that the visuals explain it. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Clean Vector Stickman, Flat White Background, Bold Stroke, Snappy Keyframes, Minimal",
    "colorGrade": "pure white, ink black, single red accent",
    "soundscape": "minimal lo-fi beat, 90 BPM; SFX: pen click, whoosh transition, record scratch on beat",
    "sampleHook": "Here is {topic}, explained badly on purpose.",
    "viralConcepts": [
      {
        "title": "The 3-Second Rule of Focus",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Invisible Wall Trap",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "How Money Actually Works",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A minimalist black vector stickman standing against a pure white background, scratching its head with a thought bubble showing a glowing brain, clean 2D line art style, vector illustration, flat design",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Deadpan educational narrator)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "30–90 sec explainers"
  },
  {
    "id": "ai-asmr-cooking-cleaning-restoration",
    "title": "AI ASMR",
    "slug": "ai-asmr-cooking-cleaning-restoration",
    "category": "Food, Culinary & ASMR",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who watch satisfying process clips for texture, sound, transformation, and calm repetition.",
    "description": "This format may suit viewers who enjoy texture and quiet motion. Start with a specific idea, such as rain falling on a tiny greenhouse. Plan the sound separately and keep motion simple. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Macro Texture, Soft Diffused Light, Ultra Slow Motion, Photoreal Surfaces, Clean Frame",
    "colorGrade": "soft grey, foam white, muted steel",
    "soundscape": "no music; SFX: liquid pour, brush scrape, foam burst, metal click",
    "sampleHook": "The most satisfying part of {topic} is the sound.",
    "viralConcepts": [
      {
        "title": "The Rusty Pocket Watch Restoration",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Deep Foam Clean",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Kinetic Sand Slice",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "Macro close-up of a rusted brass pocket watch resting on a dark workbench, a metal pick scraping away crusty green corrosion, hyper-detailed textures, cinematic macro lighting, shallow depth of field",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (No voiceover — sound design only)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "8–30 sec macro loops"
  },
  {
    "id": "zombie-apocalypse-drama",
    "title": "Zombie Apocalypse Drama",
    "slug": "zombie-apocalypse-drama",
    "category": "Horror, Mystery & Sci-Fi Drama",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Horror and survival viewers who enjoy tense choices, small mysteries, and serialized character drama.",
    "description": "This format may suit fiction and suspense viewers. Start with a specific idea, such as a survivor finding a working radio. Maintain the setting and keep fictional events separate from real reporting. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Desaturated Grade, Handheld Realism, Practical Firelight, Heavy Grain, Cinematic Grime",
    "colorGrade": "ash grey, dried blood red, sickly green",
    "soundscape": "85 BPM tense drone + percussion; SFX: moan, footsteps, breath, metal clang",
    "sampleHook": "Day 47 and {topic} just changed the rules.",
    "viralConcepts": [
      {
        "title": "The Last Radio Broadcast",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Overgrown Highway",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Shadow in the Fog",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "An old analog radio sitting on a dusty wooden table inside a barricaded brick apartment, static green light glowing from the dial, overgrown weeds visible through a shattered window, gritty cinematic film grain",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Tense first-person survivor, breathless)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "30–60 sec serialized drama"
  },
  {
    "id": "bible-and-mythology-anime",
    "title": "Bible & Mythology Anime",
    "slug": "bible-and-mythology-anime",
    "category": "Documentary, Commentary & Lore",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers interested in mythology, religious stories, symbolic battles, and stylized educational storytelling.",
    "description": "This format may suit viewers interested in religious stories or mythology. Start with a specific idea, such as a scene adapted from a chosen source passage. Name the source and distinguish quotations from creative interpretation. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Anime Epic Key Art, God Rays, Gold Leaf Accents, Cel Shaded Detail, Grand Scale",
    "colorGrade": "sun gold, ivory white, storm indigo",
    "soundscape": "60 BPM choir + orchestral swells; SFX: thunder, holy chime, wind",
    "sampleHook": "Scripture describes {topic} in terrifying detail.",
    "viralConcepts": [
      {
        "title": "The Wrath of Poseidon",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Burning Bush",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "Thor's Final Strike",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "An epic anime portrayal of Poseidon towering over a stormy sea, gripping a glowing golden trident as massive crashing waves surge toward a Greek temple, studio ufotable combat aesthetic, vivid colors --niji 6",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Reverent epic narrator, storybook pacing)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "Character explainers"
  },
  {
    "id": "ai-influencer-product-reviews",
    "title": "AI Influencer Product Reviews",
    "slug": "ai-influencer-product-reviews",
    "category": "Music, Pop Culture & Tech",
    "competition": "High",
    "difficulty": "Advanced",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Shoppers and product-curious viewers who want concise demonstrations, comparisons, and feature breakdowns.",
    "description": "This format may suit people comparing products. Start with a specific idea, such as a clearly labeled demonstration of a desk accessory. Do not invent first-hand testing, testimonials, or product capabilities. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Studio Softbox, Glossy Product Macro, Clean Gradient BG, Shallow Depth, Editorial Polish",
    "colorGrade": "warm ivory, blush beige, brushed champagne",
    "soundscape": "no music, natural room tone; SFX: product click, paper rustle, typing",
    "sampleHook": "I tested {topic} so you don't have to.",
    "viralConcepts": [
      {
        "title": "The Minimalist Skincare Unboxing",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Tech Gadget First Look",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Ergonomic Office Gear Test",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A hyper-realistic 24-year-old female virtual influencer with natural skin texture holding a sleek amber glass dropper bottle in front of a sunlit modern bathroom vanity, 85mm lens, photoreal",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Casual friend-next-door, natural Filipina accent)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "Feature demos"
  },
  {
    "id": "lullaby-and-sleep-music",
    "title": "Lullaby & Sleep Music",
    "slug": "lullaby-and-sleep-music",
    "category": "Music, Pop Culture & Tech",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Listeners looking for gentle background audio for winding down, reading, resting, or quiet environments.",
    "description": "This format may suit listeners seeking a quiet background soundtrack. Start with a specific idea, such as a gentle instrumental bedtime scene. Use licensed audio and avoid promises about sleep or health outcomes. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Dreamy Soft Focus, Painterly Night, Twinkle Particles, Slow Parallax, Pastel Glow",
    "colorGrade": "midnight blue, moon silver, soft lilac",
    "soundscape": "62 BPM music box + soft piano; SFX: very soft chime, gentle breath",
    "sampleHook": "Close your eyes and drift into {topic}.",
    "viralConcepts": [
      {
        "title": "The Floating Cloud Kingdom",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Enchanted Forest Rain",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Starry Ocean Voyage",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A soft glowing crescent moon resting on a bed of fluffy pastel pink and lavender clouds, gentle starlight twinkling in a deep indigo night sky, dreamlike aesthetic, cozy and serene",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Soft breathy female vocals only, no narration)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "1–3 hour ambience"
  },
  {
    "id": "analog-horror-and-unsolved-mysteries",
    "title": "Analog Horror & Unsolved Mysteries",
    "slug": "analog-horror-and-unsolved-mysteries",
    "category": "Horror, Mystery & Sci-Fi Drama",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who enjoy eerie archives, unexplained events, fictional investigations, and slow-burn horror.",
    "description": "This format may suit fictional mystery and atmospheric horror viewers. Start with a specific idea, such as an invented broadcast from an abandoned station. Label fiction and avoid presenting invented events as real evidence. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "VHS Analog Artifact, Scanline Noise, Emergency Broadcast Frame, Cinematic Noir, Hyper-Detailed",
    "colorGrade": "desaturated teal, sodium-vapour orange, deep ink black",
    "soundscape": "static drone + low rumble; SFX: VHS whir, static burst, distant scream",
    "sampleHook": "Nobody ever explained {topic}.",
    "viralConcepts": [
      {
        "title": "The Emergency Broadcast Override",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Abandoned Ward Sign",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Uncanny Smiling Figure",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "An old 1980s CRT television screen displaying a corrupted amber emergency alert text box over static snow, dark living room background, VHS scanline artifacts, chromatic aberration",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Distorted broadcast voice, unsettling monotone)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "Found-footage shorts"
  },
  {
    "id": "diy-cardboard-and-miniature-builds",
    "title": "DIY Cardboard & Miniature Builds",
    "slug": "diy-cardboard-and-miniature-builds",
    "category": "Lifestyle, DIY & Ambience",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Craft, miniature, diorama, and satisfying-process viewers who enjoy watching small objects take shape.",
    "description": "This format may suit craft and miniature enthusiasts. Start with a specific idea, such as a cardboard room with a working-looking lamp. Distinguish generated concept imagery from a build you actually completed. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Top-Down Bench Shot, Warm Practical Light, Macro Craft Detail, Timelapse Blend, Clean Composition",
    "colorGrade": "kraft brown, matte grey, workshop green",
    "soundscape": "100 BPM acoustic guitar + light percussion; SFX: cardboard fold, hot glue squeeze, scissors snip",
    "sampleHook": "I built {topic} out of cardboard.",
    "viralConcepts": [
      {
        "title": "The Cardboard Cyberpunk Arcade",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Miniature Cliffside Castle",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Working Cardboard Hydraulic Press",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "Extreme macro shot of a tiny fully-detailed miniature arcade cabinet built entirely out of corrugated cardboard, working tiny LED screen glowing inside, workbench background",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Friendly maker narrator, step-by-step pacing)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "30–90 sec build timelapses"
  },
  {
    "id": "vegetable-and-fruit-carving",
    "title": "Vegetable & Fruit Carving",
    "slug": "vegetable-and-fruit-carving",
    "category": "Food, Culinary & ASMR",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Food-art and satisfying-process viewers who enjoy precision cutting, pattern reveals, and visual transformations.",
    "description": "This format may suit viewers interested in decorative food presentation. Start with a specific idea, such as a carved apple flower concept. Show clear stages and avoid presenting generated imagery as a tested tutorial. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Extreme Macro, Wet Surface Sheen, Single Key Light, Slow Rotate, Photoreal Produce",
    "colorGrade": "watermelon red, cucumber green, ivory flesh",
    "soundscape": "no music; SFX: knife slice, rind peel, juice drip",
    "sampleHook": "Watch a single melon become {topic}.",
    "viralConcepts": [
      {
        "title": "The Watermelon Dragon Lotus",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Pumpkin Lantern Peony",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Soap Bar Flower Carving",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "Extreme macro shot of a sharp artisan carving knife peeling back the dark green rind of a watermelon to reveal vibrant pink inner layers sculpted into intricate dragon scales, studio lighting",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (No narration, ambient workshop sound only)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "8–30 sec carving loops"
  },
  {
    "id": "ai-car-wash-and-restoration",
    "title": "AI Car Wash & Restoration",
    "slug": "ai-car-wash-and-restoration",
    "category": "Lifestyle, DIY & Ambience",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Automotive and satisfying-process viewers who enjoy cleaning, detailing, restoration, and dramatic visual improvement.",
    "description": "This format may suit vehicle-detailing enthusiasts. Start with a specific idea, such as a dusty model car cleaned in four stages. Keep the vehicle geometry and before-and-after framing consistent. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Hyperreal Paint Reflection, Foam Volumetrics, Studio Bay Lighting, Slow Push-In, Before/After Split",
    "colorGrade": "deep gloss black, foam white, chrome blue",
    "soundscape": "120 BPM uplifting cinematic beat; SFX: water spray, foam burst, brush scrub, metal sparkle chime",
    "sampleHook": "This car hadn't moved in 20 years: {topic}.",
    "viralConcepts": [
      {
        "title": "The Muddy Off-Road Foam Blast",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Vintage Porsche Paint Polish",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Rusted Wheel Hub Restoration",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "Macro close-up of a high-pressure spray nozzle blasting thick white snow foam off the muddy side panel of a matte-black off-road truck, water droplets glistening, cinematic lighting",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (No narration, satisfying transformation only)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "30–60 sec detail transformations"
  },
  {
    "id": "miniature-asmr-cooking",
    "title": "Miniature ASMR Cooking",
    "slug": "miniature-asmr-cooking",
    "category": "Food, Culinary & ASMR",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who enjoy miniature crafts, cooking visuals, tiny-object novelty, and soft ASMR triggers.",
    "description": "This format may suit miniature and food-video viewers. Start with a specific idea, such as a tiny kitchen preparing a bowl of noodles. Maintain scale across ingredients, props, and utensils. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Macro Miniature, Tilt-Shift Depth, Warm Practical Flame, Photoreal Micro Food, Clean Tabletop",
    "colorGrade": "copper orange, cream tile, herb green",
    "soundscape": "no music; SFX: tiny sizzle, mini clink, soft pour",
    "sampleHook": "The world's smallest {topic}.",
    "viralConcepts": [
      {
        "title": "The Tiny Cast-Iron Pancake",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Micro Sushi Platter",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Tiny Teapot Brew",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "Extreme macro shot of a tiny copper skillet on a miniature working stove, a single silver-dollar-sized golden pancake bubbling, tiny pat of butter melting on top, shallow depth of field",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (No narration — pure miniature ASMR)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "15–45 sec tiny recipes"
  },
  {
    "id": "nostalgia-toy-unboxing",
    "title": "Nostalgia Toy Unboxing",
    "slug": "nostalgia-toy-unboxing",
    "category": "Lifestyle, DIY & Ambience",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Collectors and nostalgia viewers interested in toys, packaging, childhood trends, and design history.",
    "description": "This format may suit toy collectors and nostalgic viewers. Start with a specific idea, such as an original retro-style toy revealed from its box. Use accurate product details and distinguish imagined toys from real releases. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Retro Film Grade, Tabletop Overhead, Warm Tungsten, Product Macro, 90s Print Texture",
    "colorGrade": "faded primary red, cardboard tan, retro teal",
    "soundscape": "ambient 80s synth pad, no rhythm; SFX: cardboard crease, plastic crinkle, tape peel",
    "sampleHook": "Sealed since 1997: {topic}.",
    "viralConcepts": [
      {
        "title": "The Translucent 90s Handheld",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Sealed Holographic Card Pack",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Cybernetic Action Figure",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "Macro unboxing shot of a pristine translucent purple 90s handheld gaming console inside its original retro cardboard box with colorful neon graphics, mint condition, studio lighting",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (No narration, ASMR unboxing focus)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "30–60 sec object stories"
  },
  {
    "id": "ranking-and-top-5-countdowns",
    "title": "Ranking & Top 5 Countdowns",
    "slug": "ranking-and-top-5-countdowns",
    "category": "Documentary, Commentary & Lore",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who want quick comparisons, surprising lists, and structured recommendations or facts.",
    "description": "This format may suit viewers comparing a clearly defined topic. Start with a specific idea, such as five unusual fictional vehicles. State your ranking criteria and verify factual entries before publishing. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Bold Numeral Overlay, High Contrast Studio, Split Comparison Frame, Motion Graphic Wipes, Ultra Clean",
    "colorGrade": "jet black, alert yellow, signal white",
    "soundscape": "110 BPM tension-building electronic; SFX: countdown tick, drum hit, whoosh",
    "sampleHook": "Ranking the top 5 {topic}.",
    "viralConcepts": [
      {
        "title": "The Deep Sea Depth Scale (#1)",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Most Expensive Supercar Ever Built (#1)",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Tallest Skyscraper Concept (#1)",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "Cinematic digital depth chart illustration showing a colossal bioluminescent leviathan lurking in the pitch-black abyss of the Mariana Trench, glowing blue accents, hyper-detailed",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Energetic countdown narrator, build-up pacing)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "30–60 sec top-five shorts"
  },
  {
    "id": "vox-style-paper-cut-commentary",
    "title": "Vox-Style Paper-Cut Commentary",
    "slug": "vox-style-paper-cut-commentary",
    "category": "Documentary, Commentary & Lore",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "8-12 min Long-form",
    "audienceDemographic": "Viewers who like concise visual essays, current-affairs explainers, culture commentary, and design-led storytelling.",
    "description": "This format may suit viewers who enjoy visual explainers. Start with a specific idea, such as a paper-cut explanation of a daily habit. Use original graphics and cite evidence for factual claims. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Paper Cut-Out Collage, Layered Drop Shadow, Flat Editorial Palette, Snap Transitions, Infographic Clarity",
    "colorGrade": "newsprint cream, editorial red, slate navy",
    "soundscape": "95 BPM minimal documentary score; SFX: paper slide, pin push, typewriter click",
    "sampleHook": "Here is why {topic} actually happened.",
    "viralConcepts": [
      {
        "title": "The Global Shipping Bottleneck",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Urban Housing Crisis",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Rise of Synthetic Currency",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A stylized isometric paper-cut vector illustration of a massive cargo container ship wedged inside a narrow blue canal, miniature paper trees and container boxes lining the banks, clean flat design",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Investigative documentary narrator, measured pacing)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "60–180 sec visual essays"
  },
  {
    "id": "elderly-wisdom-and-stoic-long-form",
    "title": "Elderly Wisdom & Stoic Long-Form",
    "slug": "elderly-wisdom-and-stoic-long-form",
    "category": "Documentary, Commentary & Lore",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "8-12 min Long-form",
    "audienceDemographic": "Adults seeking reflective philosophy, life lessons, journaling prompts, and slower long-form listening.",
    "description": "This format may suit viewers interested in reflective storytelling. Start with a specific idea, such as a fictional elder discussing a small daily habit. Do not attribute invented quotations to real people or present fiction as lived testimony. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Marble Chiaroscuro, Golden Hour Shafts, Muted Stone, Fine Grain, Sculptural",
    "colorGrade": "bone white, warm amber, deep umber shadow",
    "soundscape": "70 BPM soft orchestral, no percussion; SFX: wind, distant birds, soft footsteps",
    "sampleHook": "At 80, he finally understood {topic}.",
    "viralConcepts": [
      {
        "title": "The Weight of Silence",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Art of Letting Go",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "On Facing Hardship",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "Cinematic portrait of an elderly wise mentor with deep silver beard and weathered lines on his face sitting by a hearth fire inside a stone cabin, warm dramatic rim lighting, 85mm anamorphic lens",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Wise elder narrator, slow deliberate pacing)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "8–20 min reflective essays"
  },
  {
    "id": "ai-music-videos",
    "title": "AI Music Videos",
    "slug": "ai-music-videos",
    "category": "Music, Pop Culture & Tech",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Independent musicians, visual creators, and viewers interested in stylized music-driven imagery.",
    "description": "This format may suit music and visual-art audiences. Start with a specific idea, such as a color-themed sequence set to licensed music. Time the cuts to the track and confirm rights to music and likenesses. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Music Video Grade, Beat-Synced Cuts, Neon Practicals, Lens Flare Streaks, Surreal Composite",
    "colorGrade": "electric magenta, deep violet, chrome silver",
    "soundscape": "song-driven, no separate bed; SFX: matched to song beats",
    "sampleHook": "This song about {topic} was made by AI.",
    "viralConcepts": [
      {
        "title": "The Neon Cyberpunk Synthwave Ride",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Surreal Dreamscape Ballad",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Dark Techno Underground",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A vintage sports car driving fast down an elevated glowing pink neon highway slicing through a towering cyberpunk city, heavy rain reflections, synthwave aesthetic, cinematic 35mm",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Music vocals only, no narration)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "15–60 sec music clips"
  },
  {
    "id": "cartoon-horror-illustration",
    "title": "Cartoon Horror Illustration",
    "slug": "cartoon-horror-illustration",
    "category": "Animation, Anime & Gaming",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who like creepy illustrated stories, urban legends, dark cartoons, and stylized suspense without photoreal gore.",
    "description": "This format may suit fans of stylized spooky fiction. Start with a specific idea, such as a cheerful cartoon hallway that slowly changes. Use original characters and match the intensity to your intended audience. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Illustrated Storybook Horror, Ink Line Texture, Hand-Painted Shadow, Distorted Perspective, Uncanny Doll-Like",
    "colorGrade": "bruised purple, sickly yellow, ink black",
    "soundscape": "95 BPM off-kilter music box + drone; SFX: creak, whisper, child laughter reversed",
    "sampleHook": "This bedtime story about {topic} is real.",
    "viralConcepts": [
      {
        "title": "The Smiling Feline's Secret",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Abandoned Animation Studio",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Creepy Singing Teapot",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A vintage 1930s rubber-hose cartoon cat character with oversized pie-cut eyes and exaggerated wide grin standing on a stark white stage, ink splatter, retro cel animation style",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Creepy playful narrator, unsettling singsong)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "30–90 sec illustrated stories"
  },
  {
    "id": "pixel-game-pov",
    "title": "Pixel Game POV",
    "slug": "pixel-game-pov",
    "category": "Animation, Anime & Gaming",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Retro-gaming, pixel-art, simulation, and challenge viewers who enjoy game-like progression and first-person scenarios.",
    "description": "This format may suit pixel-art and game-inspired story viewers. Start with a specific idea, such as a first-person walk through an original pixel village. Keep the palette and sprite scale coherent between frames. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "16-Bit Pixel Art, Limited Palette Ramp, Scanline Overlay, Parallax Scroll, HUD Framing",
    "colorGrade": "cobalt blue, pixel gold, dungeon grey",
    "soundscape": "8-bit chiptune, 130 BPM; SFX: coin ping, jump, enemy hit, level-up jingle",
    "sampleHook": "You are playing {topic}. Level one.",
    "viralConcepts": [
      {
        "title": "The Cozy RPG Tavern Fireplace",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Cyberpunk Street Vendor",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Haunted Dungeon Entrance",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "First-person POV in a 16-bit pixel art medieval tavern, sitting at a wooden table looking at a glowing stone fireplace and a mug of ale, warm amber pixel shading, retro RPG style",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Retro game announcer or silent POV)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "8–30 sec game POV"
  },
  {
    "id": "celebrity-evolution-and-glow-up",
    "title": "Celebrity Evolution & Glow-Up",
    "slug": "celebrity-evolution-and-glow-up",
    "category": "Music, Pop Culture & Tech",
    "competition": "Medium",
    "difficulty": "Intermediate",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Entertainment and pop-culture viewers interested in career timelines, style eras, public milestones, and archival comparisons.",
    "description": "This format may suit viewers interested in visual timelines. Start with a specific idea, such as the changing wardrobe of an original fictional character. Use documented facts for real people and clearly label synthetic or speculative imagery. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Portrait Morph Transition, Year Card Overlay, Archive Grain Blend, Studio Key Light, Timeline Framing",
    "colorGrade": "monochrome grey, spotlight white, accent gold",
    "soundscape": "105 BPM dramatic electronic; SFX: whoosh, camera shutter, impact hit",
    "sampleHook": "{topic}, from age 5 to today.",
    "viralConcepts": [
      {
        "title": "The Streetwear Icon Evolution",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Cyberpunk Hacker Glow-Up",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Medieval Knight to Emperor",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A hyper-realistic 25-year-old male fashion designer wearing vintage 90s oversized denim and thrift jacket standing against a raw urban brick wall, photoreal portrait",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Dramatic reveal narrator, punchy pacing)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "Career timeline shorts"
  },
  {
    "id": "poor-vs-rich-animals-ai-skits",
    "title": "Poor vs. Rich Animals",
    "slug": "poor-vs-rich-animals-ai-skits",
    "category": "Pets, Animals & Character Lore",
    "competition": "Low",
    "difficulty": "Beginner",
    "avgVideoLength": "30s - 60s Shorts",
    "audienceDemographic": "Viewers who enjoy exaggerated animal characters, status-comedy setups, visual contrasts, and short moral reversals.",
    "description": "This format may suit viewers who enjoy light animal comedy. Start with a specific idea, such as two fictional pets finding different uses for the same box. Make the contrast clear through props and action without relying on stereotypes. The examples below are editable production drafts; review the script, create the media in your chosen tools, and check the final result before publishing.",
    "visualAesthetic": "Pixar-Style 3D, Split Screen Contrast, Warm vs Cold Grade, Expressive Animal Rig, Punchy Comedy Timing",
    "colorGrade": "gold and cream on one side, grey and rust on the other",
    "soundscape": "116 BPM comedic orchestral swap; SFX: cash register on rich cuts, tin clatter on poor cuts",
    "sampleHook": "Rich {topic} vs Poor {topic} — guess who eats better.",
    "viralConcepts": [
      {
        "title": "The Diamond Collar Breakfast",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Cardboard Box Mansion",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      },
      {
        "title": "The Spa Day Pampering",
        "hook": "Watch what happens next...",
        "format": "60s Short / Reel"
      }
    ],
    "promptFormula": "A pampered white Persian cat wearing a tiny diamond-studded collar sitting at a miniature mahogany dining table eating gourmet salmon from a gold bowl inside a luxury penthouse, bright lighting",
    "recommendedStack": {
      "script": "ChatGPT / Claude 3.5 Sonnet",
      "voice": "ElevenLabs (Dual comedic character voices, contrasting pitch)",
      "visual": "Google Flow / Runway / Kling 1.5",
      "edit": "CapCut / Adobe Premiere Pro"
    },
    "bestFormat": "20–60 sec skits"
  }
];

/**
 * Universal lookup helper supporting slugs, legacy IDs, and niche names.
 */
export function getNicheBySlug(slugOrId: string): NichePage | undefined {
  if (!slugOrId) return undefined;
  const clean = slugOrId.toLowerCase().trim();
  return NICHE_PAGES.find(
    (n) => n.slug === clean || n.name.toLowerCase() === clean || n.niche.toLowerCase() === clean
  );
}

export function getNicheDataById(idOrSlug: string): NicheData {
  if (!idOrSlug) return NICHES_DATA[0];
  const clean = idOrSlug.toLowerCase().trim();
  const found = NICHES_DATA.find(
    (n) => n.id === clean || n.slug === clean || n.title.toLowerCase() === clean
  );
  return found || NICHES_DATA[0];
}
