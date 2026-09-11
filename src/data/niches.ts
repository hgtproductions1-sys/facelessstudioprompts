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
  estimatedRpm: string;
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
    metaDescription: "Generate viral AI cat and pet story videos in seconds. Get free Midjourney, ElevenLabs, and Veo 3 prompts to build a faceless animal channel today.",
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
    estimatedRpm: "$2.50–$4.50",
    intro: "The pet niche is a massive traffic driver on YouTube and TikTok, but creating original animal content without a real pet used to be impossible. Today, AI cat and pet stories are dominating the faceless video space. Viewers are captivated by emotional narratives, heroic rescue tales, and humorous feline antics. If you want to capitalize on this high-retention niche, you need the right tools to keep character consistency and hyper-realistic fur textures. This page provides a free prompt generator tailored specifically for AI animal content. Use the blueprints below to instantly generate voiceovers, visuals, and camera motions for your faceless channel.",
    prompts: [
    {
      "title": "The Stray's First Winter",
      "character": "[shivering] The snow was cold, but the glowing window across the street promised warmth. I just had to cross the white desert.",
      "visual": "A small orange tabby kitten shivering in a snowy alleyway looking toward a warmly lit bakery window, cozy cinematic lighting, hyper-realistic fur, 85mm lens --ar 9:16 --v 6.1",
      "camera": "Slow low-angle push in on kitten shivering in the snow, warm glow reflecting in its eyes, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Guard Dog's Secret",
      "character": "[deep, protective] They think I sleep all day. They don't see the shadows that try to creep in at midnight.",
      "visual": "A massive scarred German Shepherd sitting attentively in a dark living room bathed in moonlight, shadows creeping under the door, intense stare, photorealistic --ar 9:16 --v 6.1",
      "camera": "Slow tracking shot circling the German Shepherd in the dark, moonlight catching dust motes, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Clumsy Thief",
      "character": "[fast, panicked] The fish was right there! How was I supposed to know the counter was slippery?",
      "visual": "A fluffy white Persian cat slipping off a marble kitchen counter, a cooked fish suspended in mid-air, comedic action shot, bright natural kitchen lighting --ar 9:16 --v 6.1",
      "camera": "Handheld micro-shake following the cat slipping off the counter, fast motion, bright lighting, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Loyal Wait",
      "character": "[sad, drawn out] Five years. That's how long I've sat at this station. He said he'd be right back.",
      "visual": "An old Akita dog waiting faithfully at a bustling train station in the rain, people walking past in blurred motion, melancholic blue lighting, highly detailed --ar 9:16 --v 6.1",
      "camera": "Static shot with time-lapse effect of people rushing past the stationary waiting dog, rain falling, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Midnight Meeting",
      "character": "[whisper, sly] When the humans close their eyes, the real neighborhood council begins.",
      "visual": "Three neighborhood cats sitting in a circle on a moonlit rooftop, plotting, glowing yellow eyes, starry night sky background, cinematic shadows --ar 9:16 --v 6.1",
      "camera": "Slow crane shot lowering onto the three cats on the rooftop, subtle ear twitches, continuous smooth motion, cinematic 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI pet niche monetizable?",
      "answer": "Yes, the pet niche is highly monetizable on both YouTube and TikTok. Advertisers heavily target pet content, leading to stable AdSense rates, and the emotional storytelling nature of the videos results in high viewer retention."
    },
    {
      "question": "What tools do I need to make AI cat stories?",
      "answer": "You will need a script generator (like ChatGPT or Claude), an image generator that handles fur textures well (Midjourney v6 or Leonardo AI), a video motion engine (Runway Gen-3, Kling, or Veo 3), and an emotive voiceover tool (ElevenLabs)."
    },
    {
      "question": "How do I keep the same cat character in every video?",
      "answer": "To maintain consistency, use the Character Reference (--cref) parameter in Midjourney along with a specific character seed. Define your pet's exact breed, color, and unique markings in every visual prompt."
    },
    {
      "question": "Do pet stories perform better on Shorts or Long-form?",
      "answer": "Shorts are excellent for rapid subscriber growth and viral reach, while 5-to-8 minute long-form compilations of these stories generate significantly higher AdSense revenue and watch time."
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
    metaDescription: "Create viral faceless videos of animals cooking with our free AI prompt generator. Get Midjourney, Veo 3, and ElevenLabs scripts to start your channel.",
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
    estimatedRpm: "$3.00–$5.50",
    intro: "Combining the universal appeal of food content with the viral nature of animals, the AI animal cooking niche is a goldmine for high-retention faceless channels. Audiences are mesmerized by bizarre, cozy visuals of bears baking bread or cats tossing pizza dough. This highly satisfying sub-niche requires precise prompting to ensure the AI doesn't warp the animal's paws while handling utensils. Our free generator provides the exact syntax needed to create consistent, high-quality culinary scenes. Use the blueprints below to instantly generate voiceovers, cooking visuals, and dynamic camera movements for your faceless chef channel.",
    prompts: [
    {
      "title": "The Bear Baker",
      "character": "[warm, deep] First, you need wild honey. Not the store-bought kind. The kind you fight bees for.",
      "visual": "A large grizzly bear wearing a flour-dusted chef apron kneading dough on a wooden table in a cozy rustic cabin kitchen, sunlight streaming through the window, highly detailed food textures, cinematic cozy lighting --ar 9:16 --v 6.1",
      "camera": "Slow push-in on bear's paws kneading the soft dough, flour dust floating in the air, warm sunlight, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Sushi Cat",
      "character": "[sharp, precise] Precision is everything. One wrong cut, and the salmon loses its spirit.",
      "visual": "A serious tuxedo cat dressed as a sushi chef standing behind a sushi counter, cleanly slicing a beautiful piece of raw salmon with a miniature knife, neon Tokyo background lighting, hyper-realistic --ar 9:16 --v 6.1",
      "camera": "Close-up macro tracking shot of the cat's paw slicing the glossy salmon, neon reflections, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Raccoon Barista",
      "character": "[fast, energetic] Double shot of espresso, oat milk, and a tiny bit of trash-can magic. Order up!",
      "visual": "A cute raccoon wearing a green barista apron pulling an espresso shot from a gleaming silver espresso machine, cozy dimly lit coffee shop, steam rising from the cup, photorealistic --ar 9:16 --v 6.1",
      "camera": "Slow pan right revealing the raccoon barista pulling the espresso shot, steam volumetrics rising, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Fox Pizza Master",
      "character": "[smooth, confident] The secret to the perfect crust? A wood-fired oven and a lot of attitude.",
      "visual": "A red fox tossing a spinning pizza dough in the air inside a traditional Italian pizzeria, roaring fire in the brick oven behind it, flour suspended in the air, warm amber lighting --ar 9:16 --v 6.1",
      "camera": "Slow-motion tilt up following the spinning pizza dough in the air as the fox watches, fire flickering in the background, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Hedgehog Pastry Chef",
      "character": "[high-pitched, sweet] Decorating cupcakes takes a gentle touch... something my spikes don't always understand.",
      "visual": "A tiny hedgehog wearing a miniature white chef hat carefully piping pink frosting onto a small vanilla cupcake, pastel bakery background, soft macro photography, highly detailed --ar 9:16 --v 6.1",
      "camera": "Macro push-in on the hedgehog carefully piping frosting, shallow depth of field, pastel lighting, continuous smooth motion, cinematic 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI animal cooking niche monetizable?",
      "answer": "Yes. Because it is highly visual and brand-safe, it performs exceptionally well with AdSense and brand sponsorships. It also transcends language barriers, allowing for global viewership."
    },
    {
      "question": "What tools do I need for AI cooking videos?",
      "answer": "You need an image generator that excels at food textures and object permanence (Midjourney v6 is best), a motion model capable of handling subtle hand/paw movements (Kling or Runway), and ElevenLabs for the voiceover."
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
    metaDescription: "Generate cinematic POV faceless vlogs using AI. Get free prompts for ElevenLabs, Midjourney, and Runway Gen-3 to build immersive first-person video content.",
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
    estimatedRpm: "$2.00–$4.00",
    intro: "POV (Point of View) immersive vlogs are revolutionizing how creators build parasocial relationships without ever showing their faces. By placing the viewer directly in the eyes of the protagonist—whether wandering through a cyberpunk city or exploring a quiet rainy forest—this format drives massive engagement through pure atmosphere. The secret to a viral POV video is perfectly syncing realistic first-person camera sway with environmental sound design. Our free generator ensures your AI tools understand first-person framing. Use the blueprints below to instantly generate immersive voiceovers, precise POV visuals, and realistic walking camera motions for your next faceless vlog.",
    prompts: [
    {
      "title": "The Rainy Cyberpunk Walk",
      "character": "[whisper, tired] Three days in this neon maze, and the rain still hasn't stopped. I need to find the lower levels.",
      "visual": "POV shot looking down a rainy neon-lit cyberpunk alleyway, holding a glowing digital map in left hand, puddles reflecting purple and cyan lights, gritty cinematic realism, 24mm lens --ar 9:16 --v 6.1",
      "camera": "First-person POV forward walking motion, slight handheld camera bob, rain falling, neon lights reflecting, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Cozy Cabin Morning",
      "character": "[soft, relaxed] There's nothing quite like the sound of firewood cracking before the sun comes up.",
      "visual": "POV shot looking at two hands holding a steaming mug of black coffee in front of a roaring stone fireplace inside a cozy log cabin, snowy window in the background, warm amber lighting, hyper-detailed --ar 9:16 --v 6.1",
      "camera": "First-person POV static shot with slight natural breathing sway, steam rising from the coffee mug, fire flickering, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Abandoned Mall",
      "character": "[nervous, quick] They said this place was empty. But I just heard footsteps on the floor above me.",
      "visual": "POV shot holding a shaking flashlight pointing down a dark, overgrown abandoned shopping mall corridor, shattered glass on the floor, eerie moonlight filtering through broken skylights, found footage style --ar 9:16 --v 6.1",
      "camera": "First-person POV slow creeping forward motion, flashlight beam swaying erratically, dust particles in the air, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Space Station Window",
      "character": "[awe-struck, slow] Looking down at Earth from up here... it makes all our problems seem so incredibly small.",
      "visual": "POV shot looking through a massive glass observation window on a futuristic space station, Earth glowing brightly in the darkness below, reflection of an astronaut helmet in the glass, sci-fi cinematic lighting --ar 9:16 --v 6.1",
      "camera": "First-person POV slow push-in toward the observation window, Earth rotating slowly below, subtle floating sway, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Tokyo Night Drive",
      "character": "[calm, reflective] Driving at 2 AM is the only time this city actually lets you think.",
      "visual": "POV shot from the driver's seat of a vintage sports car driving down an empty Tokyo highway at night, neon streetlights blurring past the windshield, glowing dashboard dials, cinematic moody grading --ar 9:16 --v 6.1",
      "camera": "First-person POV driving forward, streetlights reflecting and passing over the windshield, subtle car vibrations, continuous smooth motion, cinematic 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the POV immersive vlog niche monetizable?",
      "answer": "Yes. POV vlogs build incredibly strong communities. Because they rely on high-quality visuals and storytelling rather than controversial topics, they maintain high AdSense RPMs and are perfect for ambient channel monetization."
    },
    {
      "question": "What tools do I need for AI POV videos?",
      "answer": "Midjourney v6 is essential for generating the initial 'POV shot looking at...' base image. Runway Gen-3 or Kling is critical for generating the first-person walking or driving motion, and you will need robust sound effect libraries for immersion."
    },
    {
      "question": "How do I make the camera motion look realistic?",
      "answer": "In your video AI prompts, use terms like 'first-person POV,' 'handheld camera bob,' or 'natural breathing sway.' Avoid high motion settings, as POV videos look best with slow, deliberate, and immersive movements."
    },
    {
      "question": "How long should POV vlogs be?",
      "answer": "Shorts (30-60 seconds) work well for intense or aesthetic moments. However, 10-to-30 minute long-form videos with ambient soundscapes (like 'A Rainy Walk in Cyberpunk Tokyo') can generate massive watch time and revenue."
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
    metaDescription: "Create viral anime character versus battles with our free AI prompt generator. Get Midjourney anime styles, Veo 3 combat motions, and high-energy voiceover scripts.",
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
    estimatedRpm: "$1.50–$3.00",
    intro: "The 'Who Would Win?' anime debate is one of the most passionate and highly-searched topics on social media. Anime Fight Versus videos pit legendary archetypes against each other, comparing stats, abilities, and power scaling. For faceless creators, this niche guarantees high engagement, debates in the comments, and endless content opportunities. However, generating consistent anime aesthetics requires specific knowledge of AI models like Midjourney's Niji. Our free generator provides the exact prompts to output stunning 2D animation styles, dynamic combat camera angles, and hype-building narrator scripts. Use the blueprints below to launch your viral anime debate channel today.",
    prompts: [
    {
      "title": "The Fire Mage vs. The Ice Swordsman",
      "character": "[fast, hyped] In the red corner, mastery over the inferno. In the blue corner, a blade cold enough to freeze time. Who takes the crown?",
      "visual": "A split screen showing a furious fire mage cloaked in rising flames on the left, and a stoic ice swordsman drawing a glowing frost katana on the right, epic anime battle aesthetic, studio ghibli mixed with ufotable style, highly detailed 2D animation --ar 9:16 --niji 6",
      "camera": "Fast dynamic zoom in on the two anime characters clashing, fire and ice particles exploding on impact, high impact motion, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Cyber Ninja vs. The Mecha Tank",
      "character": "[aggressive, intense] Speed versus absolute defense. Can a blade made of pure plasma cut through impenetrable titanium armor? Let's look at the stats.",
      "visual": "A sleek cyber ninja with a glowing neon katana leaping through the air toward a massive, heavily armed mecha tank, dystopian city background, vivid anime style, dynamic low angle perspective, 90s anime aesthetic --ar 9:16 --niji 6",
      "camera": "Slow motion panning tracking shot following the cyber ninja leaping through the air, neon trails behind the blade, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Shadow Assassin vs. The Light Paladin",
      "character": "[dark, dramatic] One strikes from the darkness, unseen. The other commands the blinding power of the sun. It's stealth versus raw holy power.",
      "visual": "A shadowy assassin with glowing purple eyes dissolving into black mist, dodging a massive beam of golden light fired by a heavily armored holy paladin, epic anime confrontation, intense contrasting lighting, ufotable animation style --ar 9:16 --niji 6",
      "camera": "Fast whip pan from the paladin firing the light beam to the assassin dodging into shadows, intense light bloom, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Gravity Manipulator vs. The Time Stopper",
      "character": "[analytical, fast] If you can crush a black hole, does it matter if your opponent can stop the clock? This is the ultimate hax battle.",
      "visual": "An anime villain floating in mid-air surrounded by crushed floating debris with glowing purple gravity rings, facing a hero holding a glowing pocket watch with time-fracture visual effects, epic anime showdown, high energy --ar 9:16 --niji 6",
      "camera": "Circular orbit shot around the floating gravity manipulator, debris floating in slow motion, intense anime aura effects, continuous smooth motion, cinematic 24fps"
    },
    {
      "title": "The Dragon Tamer vs. The Demon King",
      "character": "[loud, booming] A pact with the ancient skies, challenged by the ruler of the underworld! The scale of this fight is apocalyptic!",
      "visual": "An anime warrior riding a massive roaring red dragon breathing fire down upon a towering horned demon king shrouded in black lightning, apocalyptic wasteland, epic anime keyframe, 4k resolution --ar 9:16 --niji 6",
      "camera": "Epic aerial pull-back shot revealing the massive scale of the dragon facing the demon king, lightning flashing, continuous smooth motion, cinematic 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the anime versus niche monetizable?",
      "answer": "Yes, but you must be careful with copyright. If you use AI to generate original archetypes (e.g., 'Fire Mage vs Ice Knight') rather than exact copyrighted characters (e.g., 'Naruto vs Goku'), you will have zero issues securing AdSense approval."
    },
    {
      "question": "What tools do I need for AI anime videos?",
      "answer": "You need Midjourney (specifically utilizing the --niji 6 parameter for authentic 2D anime styles), a fast-paced AI voice generator like ElevenLabs, and video editors like CapCut for heavy VFX and sound design."
    },
    {
      "question": "How do I make the fights look dynamic?",
      "answer": "AI video generators struggle with complex martial arts choreography. Instead, prompt for 'clashing weapons,' 'aura effects,' or 'particle explosions,' and use CapCut's shake and flash transitions between clips to simulate high-speed combat."
    },
    {
      "question": "How do I drive engagement in versus videos?",
      "answer": "Always end your Shorts with a call to action asking the viewers to debate the winner in the comments. Pinned comments asking 'Did I miss a hidden ability?' will drive your algorithm metrics sky-high."
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
    metaDescription: "Create viral stickman explainer videos and comedy skits with our free AI prompt generator. Get Midjourney styles, Veo 3 motions, and voiceover scripts.",
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
    estimatedRpm: "$2.50–$4.00",
    intro: "Stickman explainers and comedic skits have quietly become one of the highest-converting formats on YouTube Shorts and TikTok. Their minimalist design strips away visual distractions, forcing the viewer to focus entirely on the witty storytelling, fast-paced educational breakdowns, or absurd hypothetical scenarios. Because these videos rely heavily on clean 2D vector aesthetics and expressive white-board or minimalist framing, they require precise prompting to avoid messy AI artifacts. Our free generator provides the exact syntax needed to create sharp, scalable stickman content. Use the blueprints below to instantly generate voiceovers, crisp vector visuals, and dynamic whiteboard motions for your channel.",
    prompts: [
    {
      "title": "The 3-Second Rule of Focus",
      "character": "[fast, energetic] You scroll past thousands of videos a day. Why did you stop on this one? It's all about dopamine timing.",
      "visual": "A minimalist black vector stickman standing against a pure white background, scratching its head with a thought bubble showing a glowing brain, clean 2D line art style, vector illustration, flat design --ar 9:16 --v 6.1",
      "camera": "Static shot with a quick digital zoom-in on the stickman's thought bubble as it pops, clean motion, 24fps"
    },
    {
      "title": "The Invisible Wall Trap",
      "character": "[panicked, high-pitched] I've been walking straight for three hours! Why is the world just a flat screen?!",
      "visual": "A black vector stickman frantically running into a transparent glass wall on a stark white grid background, minimalist comic strip style, sharp lines, highly expressive --ar 9:16 --v 6.1",
      "camera": "Tracking pan left following the running stickman until it hits the wall and bounces back, smooth vector motion, 24fps"
    },
    {
      "title": "How Money Actually Works",
      "character": "[calm, analytical] Imagine trading a chicken for a laptop. Sound ridiculous? That's literally how the banking system started.",
      "visual": "Two black vector stickmen handing a stylized gold coin back and forth over a minimal grey line graph, clean infographic aesthetic, corporate Memphis minimalist style --ar 9:16 --v 6.1",
      "camera": "Smooth pan right following the gold coin passing between hands, clean educational motion, 24fps"
    },
    {
      "title": "The Procrastination Loop",
      "character": "[whisper, guilty] I'll just check my phone for five minutes. And suddenly, it's 3 AM and I'm watching deep-sea documentaries.",
      "visual": "A stickman sitting at a minimalist desk illuminated by a harsh blue smartphone screen glow, dark minimalist background, clean white vector outlines --ar 9:16 --v 6.1",
      "camera": "Slow vertical tilt down from the phone screen glow to the slumped stickman, subtle breathing motion, 24fps"
    },
    {
      "title": "The Bad Advice Guru",
      "character": "[confident, absurd] Feeling stressed? Try screaming at your microwave until it cooks your food faster. Works every time.",
      "visual": "A stickman aggressively pointing finger at a tiny square box representing a microwave, speed lines around the hands, comical doodle art style --ar 9:16 --v 6.1",
      "camera": "Snap-zoom in on the stickman's aggressive pointing hand, high-energy framing, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the stickman explainer niche monetizable?",
      "answer": "Yes. Explainer and educational sketch channels achieve high retention rates because viewers stay to see the punchline or conclusion, which maximizes AdSense performance and sponsorship potential."
    },
    {
      "question": "What tools do I need for stickman AI videos?",
      "answer": "You need a scriptwriter (ChatGPT or Claude) for punchy dialogue, Midjourney v6 with vector terms for clean character generation, and an editor like CapCut to assemble the clips with sound effects."
    },
    {
      "question": "How do I keep stickman designs completely clean?",
      "answer": "Include terms like 'pure white background, vector line art, flat design, minimalist' in your visual prompts and use negative prompts to block gradients, shading, and realistic textures."
    },
    {
      "question": "Why do stickman skits go viral so often?",
      "answer": "They rely on universal human frustrations or relatable behavioral loops. When a viewer sees themselves in a funny stickman skit, they immediately share it."
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
    metaDescription: "Generate hyper-satisfying AI ASMR videos featuring cooking, deep cleaning, and artifact restoration. Get free Midjourney and Kling prompts.",
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
    estimatedRpm: "$3.50–$6.00",
    intro: "The human brain loves satisfying loops, tactile textures, and crisp auditory triggers. AI ASMR—spanning deep cleaning, antique object restoration, and hyper-detailed cooking preparation—is one of the most hypnotic content genres online. Viewers will watch a rusty relic transform into pristine chrome or a dusty stone slab scrubbed clean on loop for minutes at a time. Because success relies heavily on visual texture rendering, your prompts must emphasize micro-details like soap suds, metal flakes, and smooth glides. Use our free generator blueprints below to create immersive, tactile ASMR scenes that keep retention pinned at 100%.",
    prompts: [
    {
      "title": "The Rusty Pocket Watch Restoration",
      "character": "[whisper, soft] Thirty layers of oxidation couldn't hide the brass underneath. Let's bring her back to life.",
      "visual": "Macro close-up of a rusted brass pocket watch resting on a dark workbench, a metal pick scraping away crusty green corrosion, hyper-detailed textures, cinematic macro lighting, shallow depth of field --ar 9:16 --v 6.1",
      "camera": "Macro slow push-in tracking the metal pick scraping away rust flakes in ultra-sharp detail, continuous smooth motion, 24fps"
    },
    {
      "title": "The Deep Foam Clean",
      "character": "[whisper, calming] Watch the dirt lift away. Total satisfaction in three seconds flat.",
      "visual": "Macro shot of a grimy vintage leather boot covered in thick white cleaning foam, a soft-bristled brush sweeping across the surface revealing clean dark leather underneath, rich textures --ar 9:16 --v 6.1",
      "camera": "Close-up tracking shot sliding across the boot surface as the brush sweeps foam away, smooth cleaning motion, 24fps"
    },
    {
      "title": "The Kinetic Sand Slice",
      "character": "[whisper, crisp] Clean edges. Zero resistance. Pure auditory and visual harmony.",
      "visual": "A perfectly smooth brick of vibrant blue kinetic sand being sliced cleanly in half by a razor-sharp wire tool, micro-particles crumbling, clean studio lighting, 4k macro --ar 9:16 --v 6.1",
      "camera": "Slow motion macro drop shot as the wire tool slices downward through the kinetic sand block, 24fps"
    },
    {
      "title": "The Honeycomb Drizzle",
      "character": "[whisper, slow] Pure raw amber cascading over a block of fresh dairy butter. Take your time.",
      "visual": "Extreme macro shot of golden amber honey dripping slowly from a wooden dipper onto a square of yellow butter, glistening surfaces, warm lighting, hyper-realistic food textures --ar 9:16 --v 6.1",
      "camera": "Static macro shot with slow tilt down following the heavy honey stream pooling on the butter, 24fps"
    },
    {
      "title": "The Crystal Ice Crackle",
      "character": "[whisper, crisp] Hand-carved glacier ice meeting boiling water. Listen closely.",
      "visual": "A crystal clear spherical ice orb sitting on a dark slate coaster, micro-fractures glowing under subtle rim lighting, droplets of condensation sliding down the side --ar 9:16 --v 6.1",
      "camera": "Macro orbit shot slowly circling the melting ice orb, water droplets catching light highlights, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI ASMR niche monetizable?",
      "answer": "Yes, exceptionally well. Because ASMR videos attract a global audience across all languages and generate high watch time loops, AdSense earnings are strong and brand partnerships with lifestyle brands are frequent."
    },
    {
      "question": "What tools do I need for AI ASMR content?",
      "answer": "You need Midjourney v6 for ultra-sharp macro textures, Kling or Runway for smooth motion generation, and a high-end sound effects library (or ElevenLabs SFX) to layer crisp scrubbing, scraping, and crackling audio."
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
    metaDescription: "Create cinematic zombie apocalypse narrative shorts with our free AI prompt generator. Get atmospheric Midjourney prompts and survival voiceover scripts.",
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
    estimatedRpm: "$2.50–$4.50",
    intro: "Survival horror and post-apocalyptic storytelling hold a permanent grip on internet culture. Zombie apocalypse dramas allow creators to build intense, high-stakes narratives about isolation, human choice, and survival against impossible odds—all without showing a human face. By focusing on atmospheric details like overgrown highways, flickering emergency radios, and shadowy figures lurking in fog, AI video tools can produce Hollywood-grade cinematic trailers and dramatic shorts. Our free generator provides the exact prompts needed to build gritty, cinematic survival content. Use the blueprints below to launch your dystopian drama channel.",
    prompts: [
    {
      "title": "The Last Radio Broadcast",
      "character": "[raspy, exhausted] Day 412. If anyone is receiving this frequency... please tell me we aren't the only ones left in Chicago.",
      "visual": "An old analog radio sitting on a dusty wooden table inside a barricaded brick apartment, static green light glowing from the dial, overgrown weeds visible through a shattered window, gritty cinematic film grain --ar 9:16 --v 6.1",
      "camera": "Slow push-in on the glowing radio dial, dust motes floating in a single beam of moonlight, continuous motion, cinematic 24fps"
    },
    {
      "title": "The Overgrown Highway",
      "character": "[whisper, cautious] They used to call this the main evacuation route. Now it's just a graveyard of steel and silence.",
      "visual": "A desolate multi-lane highway completely overgrown with vines and abandoned rusted cars stretching into a foggy horizon, overcast grey sky, moody dystopian color grade, photorealistic --ar 9:16 --v 6.1",
      "camera": "Low-angle drone tracking shot moving slowly forward down the abandoned highway between wrecked cars, cinematic 24fps"
    },
    {
      "title": "The Shadow in the Fog",
      "character": "[tense, fast] Don't shine the flashlight. They don't need eyes to find us out here.",
      "visual": "A lone faceless survivor in a heavy hooded canvas jacket holding a tactical crossbow, standing inside a dense urban fog bank, silhouetted towering skyscrapers looming in the background --ar 9:16 --v 6.1",
      "camera": "Slow handheld orbit shot circling the survivor in the thick fog, tension-building movement, cinematic 24fps"
    },
    {
      "title": "The Supply Run",
      "character": "[breathing heavy] The pharmacy is cleared out, but there might still be antibiotics in the back dispensary.",
      "visual": "A shattered glass storefront of a ruined pharmacy, shelves stripped bare, debris scattered across the floor, harsh daylight cutting through broken security shutters, cinematic realism --ar 9:16 --v 6.1",
      "camera": "First-person POV creeping slow forward motion past broken glass displays into the dark pharmacy backroom, 24fps"
    },
    {
      "title": "The Safe Zone Beacon",
      "character": "[hopeful, solemn] They lit the green flare on the water tower. That means the outpost is still holding.",
      "visual": "A bright emerald-green flare burning intensely on top of a weathered brick water tower against a dark twilight sky, heavy smoke swirling upward, gritty post-apocalyptic atmosphere --ar 9:16 --v 6.1",
      "camera": "Tilt-up shot from ground level tracking the green smoke rising into the dark twilight sky, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the zombie apocalypse niche monetizable?",
      "answer": "Yes. Post-apocalyptic survival content enjoys high viewer retention due to suspenseful pacing. However, ensure your prompts focus on atmosphere and drama rather than graphic gore to remain fully compliant with AdSense guidelines."
    },
    {
      "question": "What tools do I need for AI zombie videos?",
      "answer": "Midjourney v6 is essential for gritty, cinematic dystopian environments. Runway Gen-3 or Kling handles eerie fog and slow camera movements, and ElevenLabs provides gritty, weathered narrator voices."
    },
    {
      "question": "How do I make apocalyptic settings look realistic?",
      "answer": "Lean heavily on environmental storytelling in your prompts: 'overgrown vines, rusted vehicles, ash particles, volumetric fog, anamorphic lens flares, gritty film grain.'"
    },
    {
      "question": "Do zombie stories work better as continuous series?",
      "answer": "Episodic storytelling (\"Day 1,\" \"Day 2\") performs exceptionally well in this niche because viewers subscribe and return to see how the protagonist survives the next obstacle."
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
    metaDescription: "Create epic anime-style biblical and mythological stories with our free AI prompt generator. Get Midjourney Niji prompts and cinematic voiceovers.",
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
    estimatedRpm: "$2.00–$4.00",
    intro: "Epic tales from ancient mythologies and biblical history—from Mount Olympus and Valhalla to Old Testament narratives—possess timeless narrative weight. When translated into high-end modern anime aesthetics, these stories pull massive engagement across YouTube and TikTok. Creators are leveraging AI to bring towering titans, legendary deities, and ancient prophets to life with breathtaking visual scale. Our free generator provides the exact prompts needed to output epic 2D anime framing, divine lighting effects, and dramatic narrator scripts. Use the blueprints below to launch your mythical storytelling channel.",
    prompts: [
    {
      "title": "The Wrath of Poseidon",
      "character": "[booming, powerful] When the ocean king raises his trident, entire empires are swallowed by the abyss in a single breath.",
      "visual": "An epic anime portrayal of Poseidon towering over a stormy sea, gripping a glowing golden trident as massive crashing waves surge toward a Greek temple, studio ufotable combat aesthetic, vivid colors --ar 9:16 --niji 6",
      "camera": "Low-angle dynamic push-up tracking Poseidon lowering his glowing trident toward the giant waves, 24fps"
    },
    {
      "title": "The Burning Bush",
      "character": "[whisper, reverent] Take off your sandals. The ground you stand upon is holy earth.",
      "visual": "A lone silhouetted ancient prophet kneeling before a gnarled desert acacia tree engulfed in brilliant, non-consuming blue and gold holy fire, dramatic dark background, masterwork anime keyframe --ar 9:16 --niji 6",
      "camera": "Slow orbit shot circling the kneeling figure and the glowing burning bush, divine light particle effects, 24fps"
    },
    {
      "title": "Thor's Final Strike",
      "character": "[grunting, fierce] Let the skies crack open! This is the end of the giants!",
      "visual": "Thor with braided red hair and glowing runic tattoos swinging Mjölnir downward, lightning exploding across a dark nordic mountain range, epic anime action sequence, high contrast --ar 9:16 --niji 6",
      "camera": "Fast whip-pan following the hammer swing as lightning shatters across the screen, high impact motion, 24fps"
    },
    {
      "title": "The Fall of Lucifer",
      "character": "[cold, defiant] Better to reign in darkness than to serve in the light.",
      "visual": "A majestic multi-winged angel falling backward through cascading celestial clouds, wings turning from pure white feathers into dark obsidian glass, dramatic divine lighting --ar 9:16 --niji 6",
      "camera": "Slow-motion downward tracking shot following the falling angel through the clouds, divine rays fading, 24fps"
    },
    {
      "title": "Anubis Weighs the Soul",
      "character": "[deep, solemn] The feather of truth decides your eternity. Let's see what your heart weighs.",
      "visual": "Anubis, the jackal-headed deity with glowing golden ornaments, standing beside an ancient scale holding a glowing human soul against a white feather, mystical temple background --ar 9:16 --niji 6",
      "camera": "Macro push-in on the ancient golden scale balancing the glowing soul, ethereal dust motes, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the mythology and biblical anime niche monetizable?",
      "answer": "Yes. Mythology and historical-religious narratives have universal appeal and high retention rates, securing strong AdSense performance. Respectful, narrative-driven framing ensures brand safety."
    },
    {
      "question": "What tools do I need for mythology anime videos?",
      "answer": "Midjourney with `--niji 6` is mandatory for the high-end 2D anime style. Runway or Kling adds divine particle movement, and ElevenLabs delivers commanding, theatrical narrator voices."
    },
    {
      "question": "How do I make mythical characters look truly epic?",
      "answer": "Incorporate scale indicators and divine lighting into your prompts: 'towering deity, glowing runic auras, dramatic volumetric god-rays, divine particle embers, masterwork anime keyframe.'"
    },
    {
      "question": "Do single-myth videos or multi-part series perform better?",
      "answer": "Episodic character deep-dives (e.g., 'The Complete History of Hades') build deep subscriber loyalty, while standalone epic battles drive viral discovery through Shorts."
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
    metaDescription: "Create viral virtual influencer product review videos with our free AI prompt generator. Get Midjourney hyper-realism and engaging script templates.",
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
    estimatedRpm: "$4.00–$8.00",
    intro: "Virtual influencers and AI-generated User Generated Content (UGC) are transforming digital marketing and affiliate e-commerce. Brands are eager for hyper-realistic virtual creators who can review products, unbox gadgets, and showcase lifestyle items on TikTok and Instagram Reels without logistical overhead. Creating consistent virtual characters requires advanced prompt structuring to maintain facial identity across different lighting conditions and outfits. Our free generator provides the exact blueprints needed to output photorealistic influencer footage and persuasive script hooks. Use the prompts below to build your automated UGC review channel.",
    prompts: [
    {
      "title": "The Minimalist Skincare Unboxing",
      "character": "[upbeat, friendly] I've tested fifty moisturizers this year, and this is the only one that didn't clog my pores by day three.",
      "visual": "A hyper-realistic 24-year-old female virtual influencer with natural skin texture holding a sleek amber glass dropper bottle in front of a sunlit modern bathroom vanity, 85mm lens, photoreal --ar 9:16 --v 6.1",
      "camera": "Handheld selfie-style micro-sway holding the skincare bottle up to the camera lens, bright natural lighting, 24fps"
    },
    {
      "title": "The Tech Gadget First Look",
      "character": "[excited, fast] Look at the bezel on this. For under fifty bucks, I honestly thought it was a scam.",
      "visual": "A young trendy male digital creator sitting at a clean desk holding a futuristic wireless charging pad, neon LED desk accents in the background, sharp focus on product --ar 9:16 --v 6.1",
      "camera": "Slow push-in framing the creator showcasing the tech gadget toward the camera, clean commercial lighting, 24fps"
    },
    {
      "title": "The Ergonomic Office Gear Test",
      "character": "[relieved, calm] If your lower back kills you after eight hours at a desk, stop scrolling right now.",
      "visual": "A professional virtual influencer adjusting a high-end ergonomic mesh office chair in a bright, minimalist loft apartment office space, photorealistic human features --ar 9:16 --v 6.1",
      "camera": "Pan left tracking the influencer adjusting the chair armrest, natural daylight streaming through large windows, 24fps"
    },
    {
      "title": "The Travel Backpack Review",
      "character": "[enthusiastic] It fits four days of clothes, a laptop, and still slides right under the airplane seat.",
      "visual": "A stylish female traveler standing in an airport terminal holding a sleek matte-black travel backpack, blurred travelers walking in the background, commercial lifestyle photography --ar 9:16 --v 6.1",
      "camera": "Handheld tracking shot as she swings the backpack around to show the zipper compartments, vibrant commercial grade, 24fps"
    },
    {
      "title": "The Smartwatch Fitness Tracking Test",
      "character": "[energetic, motivational] Tested it on a ten-mile run. The GPS accuracy is tighter than my sports watch.",
      "visual": "An athletic virtual creator with a sleek titanium smartwatch on their wrist wiping sweat in a modern gym setting, soft studio rim lighting, ultra-detailed --ar 9:16 --v 6.1",
      "camera": "Macro close-up tracking shot on the smartwatch screen lighting up as the creator taps it, dynamic motion, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI influencer product review niche monetizable?",
      "answer": "Extremely high monetization potential. Beyond AdSense, this niche is tailor-made for affiliate marketing (TikTok Shop, Amazon Associates) and direct brand sponsorship deals."
    },
    {
      "question": "What tools do I need for virtual influencer videos?",
      "answer": "Midjourney v6 for hyper-realistic human character generation, Kling or LTX Studio for natural facial expressions and hand movements, and ElevenLabs for energetic, natural voice delivery."
    },
    {
      "question": "How do I maintain character consistency across multiple videos?",
      "answer": "Utilize Midjourney's Character Reference (`--cref`) parameter combined with a fixed seed number and identical physical descriptor phrases in every prompt."
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
    metaDescription: "Create soothing ambient sleep music and lullaby videos with our free AI prompt generator. Get Midjourney calming visual prompts and audio scripts.",
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
    estimatedRpm: "$1.50–$3.00",
    intro: "Ambient sleep music and lullaby channels generate some of the most passive, long-term watch time on YouTube. Viewers leave these streams or looping videos running for eight hours straight to cope with insomnia, anxiety, or to help babies sleep. Because the content relies on hypnotic, slow-moving visuals paired with calming frequencies, your AI prompts must emphasize soft color palettes, gentle motion, and zero jarring transitions. Our free generator provides the exact syntax needed to create serene, dreamlike visual loops. Use the blueprints below to launch your automated ambient sleep channel.",
    prompts: [
    {
      "title": "The Floating Cloud Kingdom",
      "character": "[whisper, ultra-soft] Close your eyes. Let the gentle wind carry you above the clouds where time stands still.",
      "visual": "A soft glowing crescent moon resting on a bed of fluffy pastel pink and lavender clouds, gentle starlight twinkling in a deep indigo night sky, dreamlike aesthetic, cozy and serene --ar 16:9 --v 6.1",
      "camera": "Slow, ultra-smooth horizontal drift gliding across the pastel cloudscape, continuous ambient motion, 24fps"
    },
    {
      "title": "The Enchanted Forest Rain",
      "character": "[whisper, calm] Listen to the soft rain tapping on ancient leaves. You are safe here.",
      "visual": "A glowing mossy tree trunk inside a misty nighttime forest, tiny bioluminescent mushrooms casting a soft blue glow, gentle raindrops creating ripples in a clear forest stream, photorealistic --ar 16:9 --v 6.1",
      "camera": "Slow vertical tilt down from the misty canopy to the glowing stream below, gentle rain falling, 24fps"
    },
    {
      "title": "The Starry Ocean Voyage",
      "character": "[whisper, deep sleep] The ocean waves are rocking you into a deep, peaceful sleep.",
      "visual": "A vintage wooden sailboat gently drifting on a mirror-flat, midnight-blue ocean reflecting a massive glowing Milky Way galaxy, peaceful atmosphere, cinematic lighting --ar 16:9 --v 6.1",
      "camera": "Slow lateral tracking shot following the drifting boat, gentle water ripples, 24fps"
    },
    {
      "title": "The Cozy Fireplace Cabin",
      "character": "[whisper, warm] A warm fire, a cozy blanket, and nothing else you need to do tonight.",
      "visual": "A warm stone fireplace with glowing embers inside a quiet wooden cabin, frost-covered window pane showing soft falling snow outside, cozy amber lighting, hyper-detailed --ar 16:9 --v 6.1",
      "camera": "Static shot with subtle fire ember glow shifting across the stone walls, ultra-slow calming motion, 24fps"
    },
    {
      "title": "The Cosmic Nebula Lullaby",
      "character": "[whisper, soothing] You are drifting through a universe built just for your dreams.",
      "visual": "A swirling cosmic nebula composed of soft turquoise and gold stardust clouds, peaceful deep space panorama, ethereal glowing particles floating gently --ar 16:9 --v 6.1",
      "camera": "Slow continuous forward zoom drifting through the glowing cosmic stardust clouds, peaceful motion, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the sleep music niche monetizable?",
      "answer": "Yes, exceptionally well for long-term watch time. Because users stream 8-to-10 hour looping videos overnight, watch hours accumulate rapidly, leading to strong AdSense performance."
    },
    {
      "question": "What tools do I need for sleep channels?",
      "answer": "Midjourney v6 for serene landscape visuals (usually in 16:9 horizontal format), an AI music generator like Suno or Sonauto for relaxing frequencies, and an editor to loop the assets."
    },
    {
      "question": "Should sleep videos be 16:9 horizontal or 9:16 vertical?",
      "answer": "Horizontal (16:9) is traditional and preferred for YouTube long-form sleep streams and background relaxation, while vertical (9:16) works well for short ambient TikTok loops."
    },
    {
      "question": "How do I loop AI video clips smoothly?",
      "answer": "Use video generation models like Kling or Runway with very low motion settings (`--motion 1` or `--motion 2`) to ensure the transition frames loop seamlessly without sudden jumps."
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
    metaDescription: "Create chilling VHS-style analog horror and unsolved mystery videos with our free AI prompt generator. Get eerie Midjourney prompts and scripts.",
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
    estimatedRpm: "$2.50–$4.50",
    intro: "Analog horror has taken over internet culture by leveraging the unsettling aesthetic of 1980s and 90s VHS tapes, distorted emergency broadcast warnings, and corrupted archival footage. This niche relies heavily on psychological dread, cryptic anomalies, and uncanny imagery rather than jump scares. Because the visual style requires specific vintage artifacts, scanlines, and muted color grading, your prompts must capture that classic magnetic tape decay. Our free generator provides the exact syntax needed to create deeply eerie narrative content. Use the blueprints below to build your viral horror channel.",
    prompts: [
    {
      "title": "The Emergency Broadcast Override",
      "character": "[distorted, robotic voice] Warning. Do not look outside. If you see a familiar face at your window, do not open the door.",
      "visual": "An old 1980s CRT television screen displaying a corrupted amber emergency alert text box over static snow, dark living room background, VHS scanline artifacts, chromatic aberration --ar 9:16 --v 6.1",
      "camera": "Static camera with heavy VHS tape glitch flicker and subtle scanline rolling motion, 24fps"
    },
    {
      "title": "The Abandoned Ward Sign",
      "character": "[whisper, eerie] The hospital was closed in 1984. But someone is still turning on the hallway lights at night.",
      "visual": "A weathered metal sign reading 'Oakridge Asylum' hanging from a rusted chain against a rotting concrete wall, heavy green-tinted night-vision grain, creepy VHS aesthetic --ar 9:16 --v 6.1",
      "camera": "Slow handheld night-vision pan across the rusted sign, grain distortion and digital noise, 24fps"
    },
    {
      "title": "The Uncanny Smiling Figure",
      "character": "[calm, unsettling] We thought it was a mannequin in the forest. Then it turned its head when we blinked.",
      "visual": "Found footage style snapshot of a tall, faceless figure in a vintage suit standing perfectly still among dark pine trees, unnatural proportions, heavy VHS film degradation --ar 9:16 --v 6.1",
      "camera": "Slow micro-zoom in on the shadowy figure standing between the trees, static grain jitter, 24fps"
    },
    {
      "title": "The Missing Persons Tape",
      "character": "[static crackle] Last footage recovered from Camera B before signal loss at Sublevel 3.",
      "visual": "A timestamp overlay reading '03:14:1987' in bright green font over a dark underground concrete corridor lit by a single flickering fluorescent tube light --ar 9:16 --v 6.1",
      "camera": "Handheld jerky camera movement mimicking someone walking cautiously down a dark hallway, 24fps"
    },
    {
      "title": "The Decayed Family Portrait",
      "character": "[whisper] They smiled for the camera. But their reflections in the mirror were missing.",
      "visual": "A faded 1970s Polaroid photograph of a smiling family sitting on a porch, their facial features blurred into smooth skin, eerie vintage color grading, analog noise --ar 9:16 --v 6.1",
      "camera": "Static shot with a slow vintage projector flicker effect and dust particles, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the analog horror niche monetizable?",
      "answer": "Yes. Analog horror channels command extremely loyal subscriber bases. While extreme gore can restrict AdSense, atmospheric psychological horror remains fully eligible for monetization."
    },
    {
      "question": "What tools do I need for analog horror?",
      "answer": "Midjourney v6 for vintage, grainy base images, video editors like CapCut or Premiere with VHS overlay effects and audio distortion plugins, and ElevenLabs for eerie or robotic voice filters."
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
    metaDescription: "Create viral DIY miniature cardboard creation videos with our free AI prompt generator. Get macro Midjourney prompts and crafting script guides.",
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
    estimatedRpm: "$3.00–$5.00",
    intro: "Watching raw cardboard, hot glue, and everyday household materials transform into intricate working miniature castles, arcade cabinets, or sports cars is mesmerizing. The DIY miniature build niche captures millions of views because it combines crafty ingenuity with deeply satisfying ASMR pacing. Creators often present these builds from a macro first-person perspective, showcasing every precise cut and glue drop. Our free generator provides the exact syntax needed to render hyper-realistic miniature structures and crafting tools. Use the blueprints below to launch your viral crafting channel.",
    prompts: [
    {
      "title": "The Cardboard Cyberpunk Arcade",
      "character": "[upbeat, clever] Two cereal boxes, a hot glue gun, and forty hours of cutting. Welcome to the micro-arcade.",
      "visual": "Extreme macro shot of a tiny fully-detailed miniature arcade cabinet built entirely out of corrugated cardboard, working tiny LED screen glowing inside, workbench background --ar 9:16 --v 6.1",
      "camera": "Slow macro push-in panning across the miniature arcade cabinet details, shallow depth of field, 24fps"
    },
    {
      "title": "The Miniature Cliffside Castle",
      "character": "[whisper, focused] Every stone carved by hand using balsa wood and grey acrylic paint.",
      "visual": "Macro top-down view of a miniature medieval fortress built on a small rocky outcrop, tiny moss details and wooden drawbridge, realistic weathering textures --ar 9:16 --v 6.1",
      "camera": "Slow overhead macro orbiting shot circling the miniature castle on the rock, 24fps"
    },
    {
      "title": "The Working Cardboard Hydraulic Press",
      "character": "[fast, curious] Can a tiny cardboard press crush a solid steel nut? Let's find out.",
      "visual": "Macro close-up of a miniature wooden and cardboard hydraulic press mechanism compressing a small toy object, detailed gears and levers, workshop lighting --ar 9:16 --v 6.1",
      "camera": "Macro side tracking shot as the miniature press lever pushes downward, smooth mechanical motion, 24fps"
    },
    {
      "title": "The Secret Underground Vault",
      "character": "[satisfying, calm] Building a secret subterranean bunker beneath a standard wooden desk.",
      "visual": "Macro cross-section view of a miniature underground bunker connected by tiny ladders and secret rooms carved into foam board, warm interior lighting --ar 9:16 --v 6.1",
      "camera": "Slow vertical tilt down revealing the multi-level underground miniature bunker, 24fps"
    },
    {
      "title": "The Tiny V8 Engine Build",
      "character": "[enthusiastic] Working miniature pistons built from soda cans and paperclips. Hear it click.",
      "visual": "Extreme macro shot of miniature metallic engine blocks and tiny pistons assembled on a workshop mat, ultra-sharp focus, metallic reflections --ar 9:16 --v 6.1",
      "camera": "Macro push-in tracking tiny mechanical parts fitting together, crisp focus, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the DIY miniature building niche monetizable?",
      "answer": "Yes. Crafting and DIY content is highly brand-safe, family-friendly, and attracts strong advertiser demand, resulting in stable AdSense revenue."
    },
    {
      "question": "What tools do I need for miniature AI videos?",
      "answer": "Midjourney v6 with macro lens parameters (`macro photography, shallow depth of field`), Kling or Runway for motion, and crisp crafting sound effects (scissor snips, glue gun clicks)."
    },
    {
      "question": "How do I make cardboard look hyper-realistic?",
      "answer": "Include tactile descriptors in your prompts: 'corrugated cardboard texture, frayed paper edges, acrylic paint weathering, micro-dust particles, macro photography.'"
    },
    {
      "question": "Why do miniature builds keep retention high?",
      "answer": "Viewers stay to see the final reveal at the end of the video. Structuring your video as a progression from raw materials to a finished masterpiece guarantees high watch completion rates."
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
    metaDescription: "Create mesmerizing fruit and vegetable carving ASMR shorts with our free AI prompt generator. Get macro Midjourney prompts and satisfying scripts.",
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
    estimatedRpm: "$3.00–$5.50",
    intro: "The ancient art of fruit and vegetable carving transforms ordinary watermelons, pumpkins, and soaps into breathtaking floral sculptures and intricate 3D dragons. When presented as ASMR-style macro shorts, these videos captivate millions of viewers who love watching raw produce transform into masterpieces under a razor-sharp carving knife. Because the aesthetic depends entirely on vibrant color contrast and precise blade work, your prompts must highlight glossy textures and clean cuts. Our free generator provides the exact syntax needed to render stunning culinary art. Use the blueprints below to launch your carving channel.",
    prompts: [
    {
      "title": "The Watermelon Dragon Lotus",
      "character": "[whisper, calm] One clean stroke transforms a heavy melon into a blooming lotus flower.",
      "visual": "Extreme macro shot of a sharp artisan carving knife peeling back the dark green rind of a watermelon to reveal vibrant pink inner layers sculpted into intricate dragon scales, studio lighting --ar 9:16 --v 6.1",
      "camera": "Macro slow push-in tracking the knife blade slicing into the watermelon rind, ultra-sharp detail, 24fps"
    },
    {
      "title": "The Pumpkin Lantern Peony",
      "character": "[satisfying, smooth] Thin layers of orange flesh falling away like velvet silk.",
      "visual": "Macro close-up of a vibrant orange pumpkin being carved into a multi-layered blooming peony flower, crisp edges, wood carving table background, soft rim lighting --ar 9:16 --v 6.1",
      "camera": "Close-up macro tracking shot sliding across the pumpkin petals as the carving tool shapes them, 24fps"
    },
    {
      "title": "The Soap Bar Flower Carving",
      "character": "[whisper, crisp] The cleanest curls you'll see all day. Pure visual satisfaction.",
      "visual": "A translucent emerald-green soap bar being shaved into delicate, curling rose petals by a small chisel tool, soapy flakes dusting the workbench, bright macro photography --ar 9:16 --v 6.1",
      "camera": "Macro drop shot following the curved chisel slicing off a translucent soap curl, 24fps"
    },
    {
      "title": "The Radish Swan Masterpiece",
      "character": "[precise, delicate] Turning a simple white root vegetable into an elegant floating swan.",
      "visual": "Macro shot of a crisp white daikon radish being carved into delicate feathered wings, droplets of water glistening on the vegetable surface, clean studio lighting --ar 9:16 --v 6.1",
      "camera": "Slow rotating macro orbit around the partially carved radish swan, glistening water droplets, 24fps"
    },
    {
      "title": "The Avocado Rose Bloom",
      "character": "[smooth, slow] Perfectly ripe, perfectly sliced, perfectly arranged.",
      "visual": "Top-down macro shot of thin, fan-folded green avocado slices being curled into a blooming rose shape on a dark slate board, glistening olive oil sheen --ar 9:16 --v 6.1",
      "camera": "Static macro top-down shot with slow tilt as the final avocado petal locks into place, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the fruit and vegetable carving niche monetizable?",
      "answer": "Yes. It is highly visual, culturally universal, and completely brand-safe, making it ideal for high AdSense RPMs and culinary brand sponsorships."
    },
    {
      "question": "What tools do I need for carving ASMR videos?",
      "answer": "Midjourney v6 for ultra-vibrant macro food photography, Kling or Runway for smooth knife motion, and crisp ASMR cutting/scraping audio effects."
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
    metaDescription: "Create hyper-satisfying AI car washing and vehicle restoration videos with our free AI prompt generator. Get Midjourney prompts and scripts.",
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
    estimatedRpm: "$4.00–$7.00",
    intro: "The transformation from thick layers of mud, grime, and rust to mirror-finish chrome and pristine paint is one of the most satisfying visual arcs on the internet. AI car washing and deep vehicle restoration videos pull massive view counts because they trigger instant gratification. Whether it's a high-pressure foam wash blasting away decades of dirt or a classic truck getting a showroom polish, this niche thrives on tactile realism and rich reflections. Our free generator provides the exact syntax needed to render stunning automotive finishes. Use the blueprints below to launch your viral detailing channel.",
    prompts: [
    {
      "title": "The Muddy Off-Road Foam Blast",
      "character": "[whisper, satisfying] Watch that caked-on clay slide off the rocker panel in one thick sheet.",
      "visual": "Macro close-up of a high-pressure spray nozzle blasting thick white snow foam off the muddy side panel of a matte-black off-road truck, water droplets glistening, cinematic lighting --ar 9:16 --v 6.1",
      "camera": "Fast tracking pan left following the high-pressure water stream stripping away mud layers, 24fps"
    },
    {
      "title": "The Vintage Porsche Paint Polish",
      "character": "[smooth, calm] Twenty years of oxidation wiped away to reveal glass-like crimson paint.",
      "visual": "Close-up of a rotary buffer spinning across the faded red hood of a vintage 1975 Porsche 911, white polishing compound swirling under studio overhead lights, hyper-realistic reflections --ar 9:16 --v 6.1",
      "camera": "Macro push-in tracking the spinning polishing pad as dull paint instantly turns into mirror-gloss, 24fps"
    },
    {
      "title": "The Rusted Wheel Hub Restoration",
      "character": "[firm, satisfying] Stripping away thirty winters of road salt down to bare forged alloy.",
      "visual": "Extreme macro shot of a wire brush wheel scrubbing heavy orange rust off a vintage wire wheel hub, sparks and iron dust flying, dark garage workshop lighting --ar 9:16 --v 6.1",
      "camera": "Close-up macro tracking shot of wire bristles clearing rust flakes off the chrome spokes, 24fps"
    },
    {
      "title": "The Crystal Clear Headlight Restoration",
      "character": "[whisper] Yellowed, hazy plastic turned completely transparent with one swipe.",
      "visual": "Macro shot of a mechanic's gloved hand wiping a specialized ceramic coating across a foggy, yellowed car headlight, half of the lens instantly turning crystal clear, sharp contrast --ar 9:16 --v 6.1",
      "camera": "Slow lateral wipe tracking the microfiber cloth revealing the clear lens underneath, 24fps"
    },
    {
      "title": "The Hydrophobic Water Beading",
      "character": "[calm] Water doesn't even touch the paint. Pure ceramic protection.",
      "visual": "Extreme macro shot of pure crystal water beads rolling effortlessly off a newly ceramic-coated midnight blue supercar hood, neon shop lights reflecting in every droplet --ar 9:16 --v 6.1",
      "camera": "Slow motion macro drop shot as water droplets slide rapidly off the angled hood surface, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the car wash and restoration niche monetizable?",
      "answer": "Yes, exceptionally well. Automotive content attracts high-paying advertisers (tools, detailing brands, insurance), leading to above-average AdSense RPMs."
    },
    {
      "question": "What tools do I need for car detailing AI videos?",
      "answer": "Midjourney v6 for hyper-realistic car paint reflections and textures, Kling or Runway for water spray and buffer motion, and crisp pressure washer/polisher audio effects."
    },
    {
      "question": "How do I make automotive paint look realistic?",
      "answer": "Include reflection and lighting keywords in your prompts: 'mirror-gloss paint finish, studio overhead light reflections, water bead physics, metallic flake clear coat.'"
    },
    {
      "question": "Why do transformation videos perform so well?",
      "answer": "The contrast between extreme decay (mud/rust) and extreme perfection (mirror polish) triggers a strong psychological reward loop in viewers, maximizing watch time."
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
    metaDescription: "Create viral miniature cooking ASMR videos with our free AI prompt generator. Get macro Midjourney prompts and satisfying recipe scripts.",
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
    estimatedRpm: "$3.50–$6.00",
    intro: "Tiny kitchens, miniature working stoves, and tiny ingredients cooked into real, edible meals have captivated hundreds of millions of viewers worldwide. Miniature ASMR cooking combines the obsessive precision of scale models with the universal comfort of food preparation. Because everything is built on a micro scale, your AI prompts must emphasize shallow depth of field, tiny utensils, and macro food textures. Our free generator provides the exact syntax needed to render flawless miniature culinary scenes. Use the blueprints below to launch your viral tiny kitchen channel.",
    prompts: [
    {
      "title": "The Tiny Cast-Iron Pancake",
      "character": "[whisper, soft] A drop of batter on a coin-sized skillet. Watch it bubble.",
      "visual": "Extreme macro shot of a tiny copper skillet on a miniature working stove, a single silver-dollar-sized golden pancake bubbling, tiny pat of butter melting on top, shallow depth of field --ar 9:16 --v 6.1",
      "camera": "Macro push-in tracking a tiny spatula flipping the miniature pancake over, 24fps"
    },
    {
      "title": "The Micro Sushi Platter",
      "character": "[whisper, crisp] Grain by grain. The smallest salmon nigiri you've ever seen.",
      "visual": "Macro top-down view of a tiny wooden cutting board, tweezers placing a microscopic slice of salmon over a tiny ball of sushi rice, pristine studio lighting --ar 9:16 --v 6.1",
      "camera": "Static top-down macro shot with a subtle focus pull onto the tiny salmon grain, 24fps"
    },
    {
      "title": "The Tiny Teapot Brew",
      "character": "[whisper, calming] Boiling water in a teapot no larger than your thumb.",
      "visual": "Macro close-up of a tiny ceramic teapot resting over a miniature candle flame, delicate steam rising from the spout, rustic wooden counter background --ar 9:16 --v 6.1",
      "camera": "Slow vertical tilt tracking the delicate steam trail rising from the tiny teapot spout, 24fps"
    },
    {
      "title": "The Micro Burger Assembly",
      "character": "[satisfying, slow] Lettuce, cheese, and a beef patty smaller than a dime.",
      "visual": "Extreme macro cross-section view of tiny sesame seed bun halves stacked over a microscopic grilled beef patty and melted cheese square, vivid colors --ar 9:16 --v 6.1",
      "camera": "Macro slow orbit shot circling the tiny assembled burger on a slate tile, 24fps"
    },
    {
      "title": "The Miniature Honey Pot",
      "character": "[whisper] Golden amber sweetness poured from a ceramic pot the size of a marble.",
      "visual": "Macro shot of a tiny ceramic honey jar tilted over a miniature wooden waffle, a thick golden strand of honey pooling on the grid, hyper-detailed textures --ar 9:16 --v 6.1",
      "camera": "Macro tracking shot following the heavy honey strand dripping onto the tiny waffle, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the miniature cooking niche monetizable?",
      "answer": "Yes, exceptionally well. It transcends language barriers, appeals to all age groups, and commands high completion rates due to the hypnotic visual payoff."
    },
    {
      "question": "What tools do I need for miniature cooking AI videos?",
      "answer": "Midjourney v6 for macro food textures, Kling or Runway for subtle flame and motion rendering, and crisp ASMR cooking audio effects (frying sizzle, utensil clinks)."
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
    metaDescription: "Create retro 90s and 2000s nostalgia toy unboxing videos with our free AI prompt generator. Get Midjourney vintage toy prompts and scripts.",
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
    estimatedRpm: "$3.00–$5.50",
    intro: "Nostalgia is one of the most powerful emotional drivers on social media. Videos unboxing pristine 90s and 2000s toys—vintage action figures, translucent electronics, Tamagotchis, and classic trading card packs—trigger an immediate wave of dopamine for millennial and Gen-Z viewers. Because AI can generate rare, mint-condition retro packaging that no longer exists in reality, creators can build massive collector communities from scratch. Our free generator provides the exact syntax needed to render hyper-detailed vintage toy packaging. Use the blueprints below to launch your retro unboxing channel.",
    prompts: [
    {
      "title": "The Translucent 90s Handheld",
      "character": "[excited, fast] Look at that atomic purple shell. They don't build them with clear plastic like this anymore.",
      "visual": "Macro unboxing shot of a pristine translucent purple 90s handheld gaming console inside its original retro cardboard box with colorful neon graphics, mint condition, studio lighting --ar 9:16 --v 6.1",
      "camera": "Handheld macro pull-back revealing the vintage console lifting out of its molded plastic insert, 24fps"
    },
    {
      "title": "The Sealed Holographic Card Pack",
      "character": "[whisper, tense] Twenty-five years old, and the foil wrapper is still factory sealed. Do we open it?",
      "visual": "Close-up of a pair of hands holding a pristine 1999 holographic trading card booster pack under warm retail display lighting, sharp retro typography on foil wrapper --ar 9:16 --v 6.1",
      "camera": "Slow push-in framing the foil pack with light reflecting off the holographic seal, 24fps"
    },
    {
      "title": "The Cybernetic Action Figure",
      "character": "[energetic] Chrome armor, spring-loaded missile launcher, and cardback art that belongs in a museum.",
      "visual": "A vintage 90s action figure still sealed inside a mint-condition blister pack hanging on a peg, vibrant cartoon illustrations on cardboard backing, glossy plastic bubble --ar 9:16 --v 6.1",
      "camera": "Pan right tracking across the blister pack bubble, catching vintage plastic glare, 24fps"
    },
    {
      "title": "The Virtual Pet Keychain",
      "character": "[nostalgic, warm] The beep when it hatched. The panic when you forgot to feed it at school.",
      "visual": "Macro shot of a neon pink digital pet keychain resting on a colorful 90s geometric patterned desk mat, glowing LCD screen, retro packaging box blurred in background --ar 9:16 --v 6.1",
      "camera": "Macro push-in on the glowing pixel screen as the virtual pet icon blinks, 24fps"
    },
    {
      "title": "The Modular Racing Track Set",
      "character": "[excited] Glow-in-the-dark loop tracks and blue plastic cars. Peak Saturday morning engineering.",
      "visual": "A massive vintage 2000s toy box piled high with colorful modular track pieces and translucent cars, vibrant studio lighting, hyper-detailed cardboard texture --ar 9:16 --v 6.1",
      "camera": "Low-angle tracking shot moving slowly past the towering retro toy box stack, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the nostalgia toy niche monetizable?",
      "answer": "Yes. Nostalgia-driven content boasts high audience engagement, excellent watch retention from older demographics, and strong merchandising or affiliate revenue potential."
    },
    {
      "question": "What tools do I need for nostalgia toy videos?",
      "answer": "Midjourney v6 for rendering accurate retro packaging fonts and plastic textures, Runway or Kling for unboxing motions, and classic 90s background audio tracks."
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
    metaDescription: "Create viral top 5 ranking and countdown shorts with our free AI prompt generator. Get Midjourney comparison visuals and engaging script hooks.",
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
    estimatedRpm: "$2.50–$4.50",
    intro: "Listicles and Top 5 countdowns form the structural backbone of viral social media video content. Whether ranking the most powerful historical empires, deepest ocean creatures, or futuristic tech concepts, countdowns harness an innate psychological curiosity that forces viewers to stay until #1. Because these videos require striking visual contrasts between each ranked item, your prompts must maintain thematic consistency while escalating in scale. Our free generator provides the exact syntax needed to build high-retention listicle content. Use the blueprints below to launch your ranking channel.",
    prompts: [
    {
      "title": "The Deep Sea Depth Scale (#1)",
      "character": "[deep, dramatic] At eleven thousand meters down, pressure crushes steel like paper. And yet, something is moving.",
      "visual": "Cinematic digital depth chart illustration showing a colossal bioluminescent leviathan lurking in the pitch-black abyss of the Mariana Trench, glowing blue accents, hyper-detailed --ar 9:16 --v 6.1",
      "camera": "Slow vertical pull-up tracking from total darkness toward a faint blue surface light far above, 24fps"
    },
    {
      "title": "The Most Expensive Supercar Ever Built (#1)",
      "character": "[fast, hyped] Number one. A fifty-million-dollar custom hypercar crafted entirely from exposed carbon and titanium.",
      "visual": "A sleek matte-black futuristic hypercar parked under neon display lights inside an underground Tokyo showroom, sharp geometric angles, photorealistic luxury automotive photography --ar 9:16 --v 6.1",
      "camera": "Slow cinematic orbit shot circling the luxury hypercar, reflections gleaming off body panels, 24fps"
    },
    {
      "title": "The Tallest Skyscraper Concept (#1)",
      "character": "[awe-struck] Piercing the stratosphere at four thousand meters high. Look down at the clouds.",
      "visual": "A colossal futuristic mega-skyscraper piercing through a blanket of white fluffy clouds into the upper atmosphere, golden hour sun setting against glass facade, sci-fi concept art --ar 9:16 --v 6.1",
      "camera": "Low-angle tilt-up tracking shot scaling the immense height of the mega-skyscraper into the clouds, 24fps"
    },
    {
      "title": "The Strongest Ancient Armor (#1)",
      "character": "[commanding] Forged from meteorite iron, capable of deflecting a direct ballista bolt.",
      "visual": "An ornate black steel suit of samurai armor glowing with faint red internal heat runes on a dark museum pedestal, dramatic single key light, hyper-detailed textures --ar 9:16 --v 6.1",
      "camera": "Slow push-in framing the intricate helmet crest and shoulder guards of the armor, 24fps"
    },
    {
      "title": "The Most Isolated Place on Earth (#1)",
      "character": "[whisper, eerie] Two thousand miles from the nearest human settlement. Absolute silence.",
      "visual": "An aerial view of a tiny frozen research outpost sitting alone on a massive sheet of white Antarctic ice under a green aurora borealis sky, epic scale --ar 9:16 --v 6.1",
      "camera": "Slow high-altitude drone pull-back revealing the vast isolation of the polar ice shelf, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the ranking countdown niche monetizable?",
      "answer": "Yes. Listicles and countdowns enjoy some of the highest audience retention rates on social media because viewers want to see what claims the #1 spot, driving strong AdSense revenue."
    },
    {
      "question": "What tools do I need for countdown videos?",
      "answer": "Midjourney v6 for high-impact visual comparisons, a script generator for structured countdown scripts, and CapCut for dynamic number overlays and transition sound effects."
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
    metaDescription: "Create Vox-style paper-cut vector animation commentary videos with our free AI prompt generator. Get Midjourney vector prompts and essay scripts.",
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
    estimatedRpm: "$5.00–$9.00",
    intro: "Vox-style explanatory journalism—characterized by clean paper-cut vector graphics, bold typography callouts, isometric maps, and smooth animated layers—has set the gold standard for high-intellect video essays. This aesthetic breaks down complex economic, historical, and geopolitical topics into digestible, visually striking components. Because generating precise infographic art requires strict vector rules, your prompts must emphasize clean lines and layered paper textures. Our free generator provides the exact syntax needed to produce professional explanatory assets. Use the blueprints below to launch your intellectual commentary channel.",
    prompts: [
    {
      "title": "The Global Shipping Bottleneck",
      "character": "[calm, analytical] When one cargo ship blocks a single canal, the price of coffee in three countries doubles overnight.",
      "visual": "A stylized isometric paper-cut vector illustration of a massive cargo container ship wedged inside a narrow blue canal, miniature paper trees and container boxes lining the banks, clean flat design --ar 9:16 --v 6.1",
      "camera": "Smooth isometric camera pan sliding across the paper-cut container ship and canal layout, 24fps"
    },
    {
      "title": "The Urban Housing Crisis",
      "character": "[narrator, steady] Zoning laws weren't designed to protect neighborhoods. They were designed to limit supply.",
      "visual": "A layered paper-cut vector infographic showing miniature paper apartment buildings scaling upward against a clean grid background, bold red accent lines, flat vector art --ar 9:16 --v 6.1",
      "camera": "Smooth digital zoom-in focusing on the shifting paper building heights on the grid, 24fps"
    },
    {
      "title": "The Rise of Synthetic Currency",
      "character": "[analytical] Fiat money relies on trust. Code relies on mathematics. Here is how the shift happened.",
      "visual": "A minimalist paper-cut vector graphic of a golden physical coin dissolving into glowing digital binary code nodes, layered flat design, crisp shadows --ar 9:16 --v 6.1",
      "camera": "Smooth pan right following the paper coin transforming into digital data nodes, 24fps"
    },
    {
      "title": "The Psychology of Supermarkets",
      "character": "[whisper, engaging] Why is milk always forced to the absolute back corner of every grocery store?",
      "visual": "Top-down paper-cut vector blueprint of a grocery store floor plan, bright yellow and blue retail zones marked with tiny paper shopping cart icons, clean minimalism --ar 9:16 --v 6.1",
      "camera": "Overhead static shot with a smooth push-in toward the dairy aisle at the back corner, 24fps"
    },
    {
      "title": "The Lithium Battery Gold Rush",
      "character": "[steady, urgent] Electric cars run on lithium. But mining it creates a geopolitical chessboard.",
      "visual": "Layered paper-cut vector map of South America highlighting glittering mineral deposits with glowing isometric pins connected by thin dotted lines, clean editorial style --ar 9:16 --v 6.1",
      "camera": "Smooth pan across the paper-cut topographical map following the connecting dotted lines, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the Vox-style commentary niche monetizable?",
      "answer": "Yes, exceptionally well. Explanatory journalism attracts highly educated audiences, commanding top-tier AdSense RPMs and lucrative sponsorship opportunities from tech and finance brands."
    },
    {
      "question": "What tools do I need for Vox-style videos?",
      "answer": "Midjourney v6 with vector keywords (`paper-cut vector art, flat design, isometric infographic`), a deep-dive scriptwriter (Claude/ChatGPT), and a timeline editor like Premiere or CapCut for motion graphics."
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
    metaDescription: "Create profound stoic philosophy and elderly wisdom long-form video essays with our free AI prompt generator. Get atmospheric prompts and scripts.",
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
    estimatedRpm: "$6.00–$12.00",
    intro: "Stoicism, contemplative philosophy, and deep life advice delivered by timeless cinematic mentors have captured billions of views across YouTube long-form content. Viewers turn to these channels for grounding, emotional resilience, and quiet reflection amidst a chaotic modern world. Because success hinges on profound atmosphere, weathered realism, and cinematic gravitas, your AI prompts must capture soulful textures and dramatic lighting. Our free generator provides the exact syntax needed to render unforgettable philosophical content. Use the blueprints below to build your wisdom channel.",
    prompts: [
    {
      "title": "The Weight of Silence",
      "character": "[deep, gravelly, slow] You are suffering more in imagination than in reality. Sit down. Let me tell you what my grandfather taught me.",
      "visual": "Cinematic portrait of an elderly wise mentor with deep silver beard and weathered lines on his face sitting by a hearth fire inside a stone cabin, warm dramatic rim lighting, 85mm anamorphic lens --ar 16:9 --v 6.1",
      "camera": "Slow, ultra-subtle push-in framing the mentor's expressive eyes, fire embers flickering, 24fps"
    },
    {
      "title": "The Art of Letting Go",
      "character": "[calm, measured] Control what is within your power. Everything else belongs to the wind.",
      "visual": "An elderly monk standing on a high mountain cliff overlooking a misty valley at sunrise, wearing simple robes, dramatic god-rays piercing through clouds, photorealistic --ar 16:9 --v 6.1",
      "camera": "Slow crane shot rising slowly past the monk toward the vast horizon at sunrise, 24fps"
    },
    {
      "title": "On Facing Hardship",
      "character": "[wise, steady] Obstacles are not blocking the path. The obstacle *is* the path.",
      "visual": "Cinematic close-up of weathered hands carving a wooden figure in a quiet dimly lit workshop, dust motes dancing in a single window beam, deep cinematic shadows --ar 16:9 --v 6.1",
      "camera": "Macro slow pan tracking the carving knife shaving thin wood curls, contemplative pacing, 24fps"
    },
    {
      "title": "The Illusion of Urgency",
      "character": "[deep, reflective] Most men spend their lives preparing to live, while forgetting how to draw a single breath.",
      "visual": "An elderly scholar sitting at a heavy oak desk filled with ancient leather-bound books and an oil lamp burning low, midnight blue atmospheric grading, cinematic masterwork --ar 16:9 --v 6.1",
      "camera": "Static shot with a slow focal shift from the oil lamp flame to the scholar's contemplative face, 24fps"
    },
    {
      "title": "The Final Legacy",
      "character": "[warm, solemn] When your time comes, make sure the only thing empty is your potential.",
      "visual": "Cinematic wide shot of an old man walking down a tranquil stone pathway lined by ancient cypress trees under a golden autumn twilight sky, melancholic beauty --ar 16:9 --v 6.1",
      "camera": "Slow tracking shot walking backwards ahead of the old man down the tranquil path, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the stoic philosophy niche monetizable?",
      "answer": "Yes, exceptionally well. Philosophical and long-form advisory content attracts mature, engaged audiences, resulting in some of the highest AdSense RPMs on YouTube."
    },
    {
      "question": "What tools do I need for stoic wisdom videos?",
      "answer": "Midjourney v6 for cinematic, soulful portraiture (typically in 16:9 horizontal format), ElevenLabs for deep, commanding mentor voiceovers, and atmospheric ambient soundtracks."
    },
    {
      "question": "Should wisdom videos be Shorts or Long-form?",
      "answer": "While shorts help build rapid initial subscriber counts, 10-to-20 minute long-form video essays are where this niche thrives, generating massive watch time and peak RPMs."
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
    metaDescription: "Create stunning cinematic AI music videos with our free prompt generator. Get Midjourney visual style prompts and dynamic Runway/Kling motion settings.",
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
    estimatedRpm: "$2.50–$4.50",
    intro: "Music videos have entered a radical new era where surrealism, hyper-detailed dreamscapes, and rapid cinematic editing can be generated entirely with AI. Whether producing Lofi hip-hop loops, electronic dance tracks, or atmospheric dark ambient scores, creators use synchronized visualizers to hook viewers instantly. Because music videos require a cohesive artistic world, your prompts must maintain unified lighting and thematic color grades across every sequence. Our free generator provides the exact syntax needed to produce professional musical art. Use the blueprints below to launch your AI music channel.",
    prompts: [
    {
      "title": "The Neon Cyberpunk Synthwave Ride",
      "character": "[beat drop, energetic] Feel the bass line hit as we cruise through an endless neon expressway above a flooded futuristic metropolis.",
      "visual": "A vintage sports car driving fast down an elevated glowing pink neon highway slicing through a towering cyberpunk city, heavy rain reflections, synthwave aesthetic, cinematic 35mm --ar 16:9 --v 6.1",
      "camera": "Fast forward-tracking shot driving right behind the sports car, neon lights blurring past, 24fps"
    },
    {
      "title": "The Surreal Dreamscape Ballad",
      "character": "[slow tempo, dreamy] Floating weightless in a sea of forgotten memories and golden starlight.",
      "visual": "A lone astronaut floating peacefully inside a vast baroque cathedral where massive trees grow from the stone floor and the ceiling is open to a glowing nebula, surrealism art --ar 16:9 --v 6.1",
      "camera": "Slow, ultra-smooth orbital tracking shot circling the floating astronaut inside the surreal cathedral, 24fps"
    },
    {
      "title": "The Dark Techno Underground",
      "character": "[heavy bass, aggressive] Strobe lights, concrete pillars, and a rhythm you can't escape.",
      "visual": "Silhouetted crowd dancing inside an industrial brutalist concrete warehouse illuminated by harsh flashing white strobe lights and deep crimson laser beams, high contrast --ar 16:9 --v 6.1",
      "camera": "Handheld fast whip-pan tracking across the dancing silhouette crowd, intense strobe lighting flicker, 24fps"
    },
    {
      "title": "The Ethereal Forest Awakening",
      "character": "[ambient chords, light] When the first morning rays touch the ancient canopy, the magic begins to breathe.",
      "visual": "A glowing mystical deer with crystalline antlers standing inside an enchanted forest surrounded by floating amber light spores, hyper-detailed fantasy art, volumetric god-rays --ar 16:9 --v 6.1",
      "camera": "Slow push-in toward the mystical deer as light spores drift past the camera lens, 24fps"
    },
    {
      "title": "The Lo-Fi Rainy Window",
      "character": "[chill beats, nostalgic] Coffee cooling on the desk while the city sleeps outside the glass.",
      "visual": "Close-up of a steaming coffee mug sitting on a wooden windowsill inside a cozy bedroom, blurred Tokyo streetlights glowing through rain-streaked window glass, cozy lofi aesthetic --ar 16:9 --v 6.1",
      "camera": "Static camera shot with gentle condensation droplets sliding down the window glass, lofi vibe, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the AI music video niche monetizable?",
      "answer": "Yes. Music channels command dedicated listener bases and high repeat-viewing rates, making them exceptionally strong for long-term AdSense growth and streaming distribution partnerships."
    },
    {
      "question": "What tools do I need for AI music videos?",
      "answer": "Midjourney v6 for hyper-stylized visual frames (typically 16:9 horizontal), Suno or Udio for original AI music composition, and Runway or Kling for synced motion sequences."
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
    metaDescription: "Create chilling vintage 1930s rubber-hose cartoon horror illustrations with our free AI generator. Get eerie Midjourney prompts and spooky scripts.",
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
    estimatedRpm: "$2.50–$4.50",
    intro: "The juxtaposition of cheerful, classic 1930s rubber-hose cartoon aesthetics with deeply unsettling, psychological horror elements has become a massive viral phenomenon. Inspired by retro animation styles and indie horror gaming tropes, this niche draws viewers in with nostalgic character designs before pulling the rug out with twisted, eerie transformations. Because the visual style requires precise retro ink-and-paint framing, your prompts must specify black-and-white grain or faded sepia tones. Our free generator provides the exact syntax needed to produce haunting animated art. Use the blueprints below to launch your creepy cartoon channel.",
    prompts: [
    {
      "title": "The Smiling Feline's Secret",
      "character": "[cheerful, distorted] Welcome to the clubhouse! We've been waiting for you to join our forever party.",
      "visual": "A vintage 1930s rubber-hose cartoon cat character with oversized pie-cut eyes and exaggerated wide grin standing on a stark white stage, ink splatter, retro cel animation style --ar 9:16 --v 6.1",
      "camera": "Static vintage projector frame with slow jitter, suddenly snap-zooming into the cartoon cat's black eyes, 24fps"
    },
    {
      "title": "The Abandoned Animation Studio",
      "character": "[whisper, eerie] The ink dried forty years ago. But someone is still drawing new frames on the desk.",
      "visual": "A dilapidated 1930s animation studio room covered in thick black ink drips, an old wooden desk with a glowing drafting board showing a terrifying sketch, sepia tone --ar 9:16 --v 6.1",
      "camera": "Slow handheld push-in panning across the ink-splattered drafting desk, eerie shadows, 24fps"
    },
    {
      "title": "The Creepy Singing Teapot",
      "character": "[high-pitched, glitching] Pour yourself a cup of liquid sorrow! It never gets cold!",
      "visual": "A classic rubber-hose cartoon teapot with a grinning human face pouring black ink instead of tea into a cracked porcelain teacup, surreal horror illustration --ar 9:16 --v 6.1",
      "camera": "Macro tracking shot following the thick black ink pouring out of the teapot spout, 24fps"
    },
    {
      "title": "The Distorted Mickey Blueprint",
      "character": "[deep laugh, glitching] You thought this was a children's show? Look closer at the background.",
      "visual": "A vintage monochrome character poster peeling off a damp brick wall, revealing razor-sharp teeth and hollow eye sockets underneath, distressed grain texture --ar 9:16 --v 6.1",
      "camera": "Slow vertical tilt down past the peeling poster edges revealing the terrifying illustration underneath, 24fps"
    },
    {
      "title": "The Midnight Projection Room",
      "character": "[film crackle] The film reel is playing backwards. And the character on screen is walking toward the audience.",
      "visual": "A dark movie projection room illuminated only by a bright cone of dusty projector light shining toward an empty screen, vintage horror atmosphere --ar 9:16 --v 6.1",
      "camera": "Slow push-in tracking forward through the dusty projector light beam toward the blank screen, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the cartoon horror niche monetizable?",
      "answer": "Yes. Creepy animation and analog horror subgenres command high viewer engagement and loyal subscriber communities, keeping AdSense performance strong."
    },
    {
      "question": "What tools do I need for creepy cartoon videos?",
      "answer": "Midjourney v6 for 1930s rubber-hose character generation, video editors with vintage film grain and projector flicker plugins, and eerie voice modulation tools."
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
    metaDescription: "Create immersive retro pixel art RPG and survival game POV videos with our free AI prompt generator. Get Midjourney pixel prompts and adventure scripts.",
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
    estimatedRpm: "$2.00–$4.00",
    intro: "Retro 16-bit and 32-bit pixel art evokes an intense wave of gaming nostalgia while offering a clean, hypnotic aesthetic for modern social media feeds. Pixel Game POV videos place the viewer directly inside legendary fantasy RPGs, cozy farming sims, or cyberpunk dungeon crawlers through a first-person perspective. Because pixel art requires rigorous grid alignment and color palette restraint, your prompts must specify precise retro resolutions. Our free generator provides the exact syntax needed to render stunning pixel landscapes. Use the blueprints below to launch your retro gaming channel.",
    prompts: [
    {
      "title": "The Cozy RPG Tavern Fireplace",
      "character": "[chiptune ambient, warm] Outside, a blizzard is burying the village. Inside, the hearth is burning bright.",
      "visual": "First-person POV in a 16-bit pixel art medieval tavern, sitting at a wooden table looking at a glowing stone fireplace and a mug of ale, warm amber pixel shading, retro RPG style --ar 9:16 --v 6.1",
      "camera": "Static 16-bit pixel art frame with subtle flame flickering animation and floating dust pixels, 24fps"
    },
    {
      "title": "The Cyberpunk Street Vendor",
      "character": "[synth beat, dark] Rain is pouring on the lower blocks. Time for a bowl of synthetic noodles.",
      "visual": "First-person POV in a 32-bit pixel art cyberpunk Tokyo alleyway, looking at a glowing neon noodle cart vendor shrouded in rain, intricate pixel details --ar 9:16 --v 6.1",
      "camera": "Subtle pixelated vertical bobbing motion mimicking first-person walking approach toward the noodle cart, 24fps"
    },
    {
      "title": "The Haunted Dungeon Entrance",
      "character": "[tense chiptune] The torch is flickering out. Step lightly down the stone steps.",
      "visual": "First-person POV holding a pixelated flickering torch looking down dark dungeon stone steps, eerie green slime on walls, retro gothic RPG aesthetic --ar 9:16 --v 6.1",
      "camera": "Slow pixelated forward creep down the dungeon stone steps, torch light swaying rhythmically, 24fps"
    },
    {
      "title": "The Midnight Fishing Trip",
      "character": "[relaxing synth] Just you, the calm lake, and whatever is biting under the moonlight.",
      "visual": "First-person POV looking out over a calm pixelated lake under a giant 16-bit full moon, holding a wooden fishing rod, peaceful indie game aesthetic --ar 9:16 --v 6.1",
      "camera": "Subtle water ripple pixel animation shifting across the calm lake surface under moonlight, 24fps"
    },
    {
      "title": "The Spaceship Cockpit Launch",
      "character": "[sci-fi alert] Initiating hyperdrive sequence. Hold onto your controls.",
      "visual": "First-person POV sitting inside a retro 16-bit spaceship cockpit looking out the front window at a massive glowing star system, blinking control panel buttons --ar 9:16 --v 6.1",
      "camera": "Rapid forward starfield stretch effect as spaceship engages hyperdrive, pixel art style, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the pixel game POV niche monetizable?",
      "answer": "Yes. Gaming and retro nostalgia communities are exceptionally active, driving strong subscriber growth, high share rates, and solid AdSense revenue."
    },
    {
      "question": "What tools do I need for pixel art videos?",
      "answer": "Midjourney v6 with explicit pixel art descriptors, retro chiptune background tracks, and video editors to maintain crisp pixel scaling without blurring."
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
    metaDescription: "Create viral celebrity evolution and fictional character glow-up transition videos with our free AI prompt generator. Get Midjourney prompts and scripts.",
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
    estimatedRpm: "$3.00–$5.50",
    intro: "Before they were icons, how did legendary figures, historical legends, or fictional characters evolve? Celebrity evolution and glow-up comparison videos capture massive social media traffic by showcasing dramatic visual transformations across time, status, or style eras. Because AI can seamlessly generate age progression and alternative styling for iconic archetypes, creators can build addictive chronological journey shorts. Our free generator provides the exact syntax needed to render consistent character evolution across decades. Use the blueprints below to launch your pop-culture channel.",
    prompts: [
    {
      "title": "The Streetwear Icon Evolution",
      "character": "[upbeat, fast] From thrift store hustler to global fashion week headliner. Watch the evolution.",
      "visual": "A hyper-realistic 25-year-old male fashion designer wearing vintage 90s oversized denim and thrift jacket standing against a raw urban brick wall, photoreal portrait --ar 9:16 --v 6.1",
      "camera": "Smooth portrait framing with micro head tilt, natural studio lighting, 24fps"
    },
    {
      "title": "The Cyberpunk Hacker Glow-Up",
      "character": "[confident, sleek] Started in a basement with a cracked monitor. Now running the grid.",
      "visual": "A hyper-realistic female tech prodigy with glowing augmented reality glasses and sleek futuristic jacket standing inside a glowing neon server room, cinematic lighting --ar 9:16 --v 6.1",
      "camera": "Slow push-in framing the subject as neon reflections glow across her glasses lens, 24fps"
    },
    {
      "title": "The Medieval Knight to Emperor",
      "character": "[deep, authoritative] A foot soldier in rusted chainmail. Ten years later, crowned ruler of the realm.",
      "visual": "A weathered medieval warlord wearing ornate black steel armor inlaid with gold filigree, standing inside a grand stone throne room, dramatic god-rays --ar 9:16 --v 6.1",
      "camera": "Low-angle majestic push-in tracking the emperor standing tall in the throne room, 24fps"
    },
    {
      "title": "The Vintage Starlet Transformation",
      "character": "[glamorous, smooth] Hollywood's golden age created stars. But she redefined the standard.",
      "visual": "A cinematic portrait of a 1950s classic Hollywood actress with vintage pin-up hairstyle and diamond necklace under moody retro spotlight, 35mm film grain --ar 9:16 --v 6.1",
      "camera": "Slow cinematic pan across her face catching sparkling diamond reflections, 24fps"
    },
    {
      "title": "The Athlete's Championship Journey",
      "character": "[intense, motivational] Sweat, setbacks, and endless repetition until the trophy was in his hands.",
      "visual": "An athletic sports star in a high-tech athletic training kit standing inside a massive packed stadium under bright floodlights, hyper-detailed sweat sheen --ar 9:16 --v 6.1",
      "camera": "Slow tracking orbit shot circling the athlete inside the glowing stadium arena, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the celebrity evolution niche monetizable?",
      "answer": "Yes. Pop culture, fashion, and character transformation content enjoy massive algorithmic reach and strong viewer retention, leading to solid AdSense earnings."
    },
    {
      "question": "What tools do I need for evolution videos?",
      "answer": "Midjourney v6 with Character Reference (`--cref`) to maintain facial structure across different ages/eras, and CapCut for smooth morphing or hard-cut transition editing."
    },
    {
      "question": "How do I maintain character consistency across transformations?",
      "answer": "Lock your character seed number and use Midjourney's `--cref` parameter while changing only the clothing, setting, and age markers in each prompt."
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
    metaDescription: "Create viral poor vs rich animal comparison skit videos with our free AI prompt generator. Get Midjourney funny animal prompts and comedy scripts.",
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
    estimatedRpm: "$2.50–$4.50",
    intro: "Comparative skits—specifically contrasting the absurdly pampered lifestyles of wealthy pets with the scrappy antics of street animals—form one of the funniest and most viral content formats in the animal niche. These videos lean heavily into humorous anthropomorphism, putting golden retrievers in silk bathrobes or tuxedo cats in miniature mansions. Because success relies on clean comedic contrast and expressive animal reactions, your prompts must highlight clothing and setting details. Our free generator provides the exact syntax needed to produce hilarious animal comedy. Use the blueprints below to launch your viral animal skit channel.",
    prompts: [
    {
      "title": "The Diamond Collar Breakfast",
      "character": "[snobby, posh] Caviar and organic goat milk served on fine porcelain. Anything less gives me allergies.",
      "visual": "A pampered white Persian cat wearing a tiny diamond-studded collar sitting at a miniature mahogany dining table eating gourmet salmon from a gold bowl inside a luxury penthouse, bright lighting --ar 9:16 --v 6.1",
      "camera": "Slow macro push-in on the posh cat looking down its nose at the gold dining bowl, 24fps"
    },
    {
      "title": "The Cardboard Box Mansion",
      "character": "[cheerful, proud] Who needs a mansion when you have a pristine refrigerator box and a piece of string?",
      "visual": "A happy scruffy stray dog wearing a makeshift bandana sitting proudly inside a cardboard box fort decorated with old tennis balls, cozy alleyway background, warm sunlight --ar 9:16 --v 6.1",
      "camera": "Handheld micro-shake tracking shot smiling at the dog inside its cozy cardboard castle, 24fps"
    },
    {
      "title": "The Spa Day Pampering",
      "character": "[relaxed, pampered] Cucumber slices on the eyes, blueberry facial mask. Just a standard Tuesday.",
      "visual": "A fluffy golden retriever puppy lying comfortably in a marble spa bathtub wearing a fluffy white bathrobe and cucumber slices over its eyes, luxury spa interior --ar 9:16 --v 6.1",
      "camera": "Slow panning shot across the relaxed puppy in the luxury marble spa bath, 24fps"
    },
    {
      "title": "The Street Smart Hustle",
      "character": "[street-smart, fast] You buy your chew toys at the pet store. I negotiate mine directly from the neighborhood butcher.",
      "visual": "A sly-looking street cat wearing a tiny leather jacket sitting atop a stack of vintage wooden crates in a bustling outdoor market, cinematic golden hour lighting --ar 9:16 --v 6.1",
      "camera": "Low-angle tracking shot looking up at the cool street cat on the wooden crates, 24fps"
    },
    {
      "title": "The Private Jet Nap",
      "character": "[sleepy, rich] Flying first class is exhausting when your custom velvet seat is so plush.",
      "visual": "A pampered French bulldog wearing tiny aviator sunglasses sleeping soundly on a plush leather armchair inside a private jet cabin, sun streaming through oval window --ar 9:16 --v 6.1",
      "camera": "Slow macro push-in on the sleeping bulldog wearing aviator sunglasses, 24fps"
    }
  ],
    faqs: [
    {
      "question": "Is the poor vs. rich animal skit niche monetizable?",
      "answer": "Yes, exceptionally well. Animal comedy attracts massive family-friendly audiences across global markets, driving high view counts and robust AdSense performance."
    },
    {
      "question": "What tools do I need for animal skit videos?",
      "answer": "Midjourney v6 for humorous anthropomorphic animal styling, Kling or Runway for subtle expressions, and ElevenLabs for comedic, expressive voiceovers."
    },
    {
      "question": "How do I make the animal comedy land successfully?",
      "answer": "Pair absurd human luxury items (tiny sunglasses, gold bowls, silk bathrobes) with deadpan, serious voiceover delivery to maximize comedic contrast."
    },
    {
      "question": "Why do animal comparison videos go viral?",
      "answer": "They combine cute pet imagery with relatable social satire, prompting viewers to tag friends and share the content widely across social platforms."
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
