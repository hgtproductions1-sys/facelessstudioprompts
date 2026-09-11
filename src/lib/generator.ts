import {
  buildParagraph,
  dedupePhrases,
  extractMixDirective,
  normalizeCameraMove,
  stripArticle,
  renderTemplate,
  stripFormatSpecs,
  sanitizeMidjourneyPrompt,
  sanitizeTopic,
  topicPhrase,
  toElevenLabsCue,
} from "@/lib/prompt-sanitize";
import { fillTemplate } from "@/lib/nicheScaffolds";
import { resolveStyle, type StyleSelection } from "@/lib/styleOptions";
import {
  isHumanSubject,
  midjourneyNegativeFor,
  subjectFramingClause,
  subjectPrefix,
} from "@/lib/subject";

export interface ProductionPackage {
  niche: string;
  topic: string;
  seed: number;
  generatedAt: string;
  character: {
    archetype: string;
    consistencyScore: number;
    toneTags: string[];
    physicalDescription: string;
    wardrobe: string[];
    voiceSpec: Record<string, string>;
    hooks: { label: string; text: string }[];
    cueSheet: { timestamp: string; line: string; cue: string }[];
    retentionBeats: string[];
  };
  visual: {
    styleDNA: string[];
    aspectRatio: string;
    resolution: string;
    model: string;
    stylize: number;
    chaos: number;
    seedValue: number;
    negativePrompt: string;
    /** One universal, engine-neutral image prompt that works in any image model. */
    masterPrompt: string;
    leonardoPrompt: string;
    midjourneyPrompt: string;
    googleFlowPrompt: string;
    consistencyToken: string;
    negativeLibrary: string[];
  };
  camera: {
    overview: Record<string, string>;
    shots: {
      index: number;
      timecode: string;
      motion: string;
      transition: string;
      animationCue: string;
      /** Engine-ready prompt for Runway Gen-3 / Kling — no NLE transitions. */
      prompt: string;
    }[];
    rigCheatSheet: string[];
    soundDesign: string[];
  };
  variation: {
    hookStyle: string;
    storyStructure: string;
    pacingProfile: string;
    editingStyle: string;
    emotionalTone: string;
    copyPastePrompt: string;
  };
}

export interface NicheProfile {
  archetype: string;
  toneTags: string[];
  wardrobe: string[];
  voice: Record<string, string>;
  styleDNA: string[];
  palette: string;
  environments: string[];
  pacing: string;
  sound: string[];
  hooks: string[];
  descriptors: string[];
  hookFormat: string;
  voVoiceType: string;
  voEmotionalRegister: string;
  cameraMotions: [string, string, string, string, string, string];
  retentionBeatLabels: [string, string, string];
  soundDesign: { bedTrack: string; sfx: string[]; silenceCue: string };
  imageStyleFlags: string;
  imageNegativePrompt: string;
  variationTone: string;
  forbiddenVocabulary: string[];
}

type LegacyNicheProfile = Omit<
  NicheProfile,
  | "hookFormat"
  | "voVoiceType"
  | "voEmotionalRegister"
  | "cameraMotions"
  | "retentionBeatLabels"
  | "soundDesign"
  | "imageStyleFlags"
  | "imageNegativePrompt"
  | "variationTone"
  | "forbiddenVocabulary"
>;

export const NICHES = [
  "AI Cat & Pet Stories",
  "AI Animal Cooking",
  "POV Immersive Vlogs",
  "Anime Fight Versus",
  "Stickman Explainer & Skits",
  "AI ASMR (Cooking, Cleaning, Restoration)",
  "Zombie Apocalypse Drama",
  "Bible & Mythology Anime",
  "AI Influencer Product Reviews",
  "Lullaby & Sleep Music",
  "Analog Horror & Unsolved Mysteries",
  "DIY Cardboard & Miniature Builds",
  "Vegetable & Fruit Carving",
  "AI Car Wash & Restoration",
  "Miniature ASMR Cooking",
  "Nostalgia Toy Unboxing",
  "Ranking & Top 5 Countdowns",
  "Vox-Style Paper-Cut Commentary",
  "Elderly Wisdom & Stoic Long-Form",
  "AI Music Videos",
  "Cartoon Horror Illustration",
  "Pixel Game POV",
  "Celebrity Evolution & Glow-Up",
  "Poor vs. Rich Animals (AI Skits)",
] as const;

export type Niche = (typeof NICHES)[number];

const BASE_NICHE_PROFILES: Record<string, LegacyNicheProfile> = {
  "AI Cat & Pet Stories": {
    archetype: "The Tiny Hero Cat",
    toneTags: ["Heartwarming", "Playful", "Cinematic"],
    wardrobe: [
      "Miniature red knit scarf, hand-stitched edges",
      "Tiny leather satchel worn across the chest",
      "Bell collar in aged brass",
      "Muddy paw wraps from the last adventure",
    ],
    voice: {
      "Voice Type": "Warm storyteller narrator, mid-range",
      "Pace (WPM)": "132 WPM",
      Pitch: "Soft, slightly bright",
      Accent: "Neutral North American",
      "Emotional Register": "Tender with bursts of wonder",
      "Signature Pause": "0.7s before every emotional turn",
    },
    styleDNA: [
      "Pixar-Grade 3D",
      "Soft Rim Light",
      "Fur Detail Pass",
      "Shallow Depth",
      "Warm Bloom",
    ],
    palette: "honey gold, moss green, dusty cream",
    environments: [
      "rain-soaked cobbled alley lit by a single shop window",
      "sunlit farmhouse kitchen with flour in the air",
      "storm-lashed rooftop above a sleeping town",
    ],
    pacing: "Gentle → Emotional Spike",
    sound: [
      "Bed track: 74 BPM felt piano with light strings",
      "SFX: soft paw pads, distant thunder, one purr close-mic",
      "Silence: 1.0s hold on the reunion frame",
    ],
    hooks: [
      "Nobody thought this cat could survive {topic}.",
      "This little cat walked straight into {topic}.",
      "{topic} changed everything for one stray.",
    ],
    descriptors: ["tender", "brave", "small", "unbreakable"],
  },
  "AI Animal Cooking": {
    archetype: "The Chef Bear in the Forest Kitchen",
    toneTags: ["Cozy", "Whimsical", "Satisfying"],
    wardrobe: [
      "Cream chef jacket, double-breasted, flour-dusted",
      "Rolled linen apron tied twice at the waist",
      "Tall toque with a slight lean",
      "Wooden spoon tucked into the belt",
    ],
    voice: {
      "Voice Type": "Low, friendly narrator",
      "Pace (WPM)": "120 WPM",
      Pitch: "Warm and rounded",
      Accent: "Soft neutral",
      "Emotional Register": "Content, unhurried",
      "Signature Pause": "0.9s before the first bite",
    },
    styleDNA: [
      "Hyperreal CGI Fur",
      "Steam Volumetrics",
      "Golden Kitchen Light",
      "Macro Food Detail",
      "Cozy Realism",
    ],
    palette: "butter yellow, forest green, toasted amber",
    environments: [
      "log cabin kitchen with copper pans and open fire",
      "riverside outdoor stove with steam rolling off the pot",
      "autumn forest table set with wooden bowls",
    ],
    pacing: "Slow ASMR → Reveal",
    sound: [
      "Bed track: 68 BPM acoustic guitar loop",
      "SFX: sizzle, chop, bubbling pot, all close-mic",
      "Silence: 1.2s before the finished plate",
    ],
    hooks: [
      "This bear cooks {topic} better than most humans.",
      "Watch what happens when a bear tries {topic}.",
      "{topic}, made in a forest kitchen.",
    ],
    descriptors: ["rustic", "steaming", "handmade", "hearty"],
  },
  "POV Immersive Vlogs": {
    archetype: "The First-Person Traveller",
    toneTags: ["Immersive", "Grounded", "Present-Tense"],
    wardrobe: [
      "Faded canvas jacket, sleeves pushed up",
      "Weathered hands with a braided cord bracelet",
      "Scuffed boots visible on the down-look",
      "Worn day pack strap crossing the chest",
    ],
    voice: {
      "Voice Type": "Close-mic conversational narrator",
      "Pace (WPM)": "138 WPM",
      Pitch: "Natural, intimate",
      Accent: "Neutral",
      "Emotional Register": "Curious, quietly amazed",
      "Signature Pause": "0.6s at every doorway",
    },
    styleDNA: [
      "First-Person Lens",
      "Natural Light",
      "Handheld Micro-Shake",
      "Wide 18mm",
      "Photoreal",
    ],
    palette: "sun-warmed sand, sky blue, worn timber",
    environments: [
      "narrow market street at golden hour",
      "wooden staircase into a fog-covered valley",
      "small kitchen doorway opening onto a courtyard",
    ],
    pacing: "Continuous → Reveal Beat",
    sound: [
      "Bed track: 80 BPM ambient pads, low mix",
      "SFX: full location ambience, footsteps, cloth movement",
      "Silence: 1.0s on the first view of the destination",
    ],
    hooks: [
      "You just woke up in the middle of {topic}.",
      "This is {topic} through your own eyes.",
      "Walk with me straight into {topic}.",
    ],
    descriptors: ["immersive", "handheld", "lived-in", "immediate"],
  },
  "Anime Fight Versus": {
    archetype: "The Masked Challenger",
    toneTags: ["Explosive", "Hype", "Cinematic"],
    wardrobe: [
      "Torn black haori with a glowing crimson seam",
      "Bandaged forearms and knuckles",
      "Split-face porcelain mask, hairline cracked",
      "Chipped katana slung low on the hip",
    ],
    voice: {
      "Voice Type": "Intense male narrator with grit",
      "Pace (WPM)": "150 WPM",
      Pitch: "Mid, aggressive",
      Accent: "Neutral",
      "Emotional Register": "Escalating hype",
      "Signature Pause": "0.4s before the clash frame",
    },
    styleDNA: ["Anime Key Frame", "Speed Lines", "Impact Flash", "Cel Shading", "Ultra Dynamic"],
    palette: "ink black, electric crimson, cold silver",
    environments: [
      "shattered rooftop under a blood-red moon",
      "flooded temple courtyard mid-storm",
      "collapsing arena with floating debris",
    ],
    pacing: "Fast Cut → Impact",
    sound: [
      "Bed track: 145 BPM orchestral taiko hybrid",
      "SFX: blade ring, sonic boom, glass shatter",
      "Silence: 0.5s freeze before the finishing blow",
    ],
    hooks: [
      "Who actually wins {topic}?",
      "{topic} has one correct answer. Watch.",
      "This fight settles {topic} forever.",
    ],
    descriptors: ["explosive", "kinetic", "overpowered", "final"],
  },
  "Stickman Explainer & Skits": {
    archetype: "The Stickman Everyman",
    toneTags: ["Funny", "Fast", "Relatable"],
    wardrobe: [
      "Pure black stick limbs, uniform 6px stroke",
      "Single prop per scene, drawn in the same stroke",
      "No facial features beyond two dot eyes",
      "Optional red accent object for focus",
    ],
    voice: {
      "Voice Type": "Bright conversational narrator",
      "Pace (WPM)": "158 WPM",
      Pitch: "High-mid, energetic",
      Accent: "Neutral North American",
      "Emotional Register": "Deadpan into punchline",
      "Signature Pause": "0.3s before every joke landing",
    },
    styleDNA: [
      "Clean Vector Stickman",
      "Flat White Background",
      "Bold Stroke",
      "Snappy Keyframes",
      "Minimal",
    ],
    palette: "pure white, ink black, single red accent",
    environments: [
      "empty white void with one drawn horizon line",
      "sketched office desk in three strokes",
      "flat side-scroll street with drawn props",
    ],
    pacing: "Rapid → Punchline",
    sound: [
      "Bed track: 118 BPM light comedic ukulele",
      "SFX: whoosh, pop, cartoon thud on every beat",
      "Silence: 0.4s dead stop before the punchline",
    ],
    hooks: [
      "Here is {topic}, explained badly on purpose.",
      "{topic} in 30 seconds, stick figures only.",
      "Everyone gets {topic} wrong. Watch.",
    ],
    descriptors: ["snappy", "minimal", "absurd", "clear"],
  },
  "AI ASMR (Cooking, Cleaning, Restoration)": {
    archetype: "The Silent Hands Restorer",
    toneTags: ["Hypnotic", "Tactile", "Wordless"],
    wardrobe: [
      "Rolled grey sleeves and clean forearms",
      "Nitrile gloves, faintly powdered",
      "Neutral canvas apron with tool loops",
      "No jewellery, short trimmed nails",
    ],
    voice: {
      "Voice Type": "Minimal whisper narration or none",
      "Pace (WPM)": "84 WPM",
      Pitch: "Breathy, very low volume",
      Accent: "Neutral",
      "Emotional Register": "Calm, detached",
      "Signature Pause": "2.0s between actions",
    },
    styleDNA: [
      "Macro Texture",
      "Soft Diffused Light",
      "Ultra Slow Motion",
      "Photoreal Surfaces",
      "Clean Frame",
    ],
    palette: "soft grey, foam white, muted steel",
    environments: [
      "white tiled workbench with one overhead softbox",
      "restoration table with rust flaking under a brush",
      "spotless counter with condensation on glass",
    ],
    pacing: "Very Slow → Satisfying Release",
    sound: [
      "Bed track: none or 55 BPM sub pad at -24dB",
      "SFX: binaural scrape, foam crackle, water trickle",
      "Silence: 2.5s after the final wipe",
    ],
    hooks: [
      "The most satisfying part of {topic} is the sound.",
      "Turn your volume up for {topic}.",
      "{topic}, in perfect slow motion.",
    ],
    descriptors: ["tactile", "crisp", "satisfying", "unhurried"],
  },
  "Zombie Apocalypse Drama": {
    archetype: "The Last Survivor",
    toneTags: ["Tense", "Gritty", "Desperate"],
    wardrobe: [
      "Blood-flecked field jacket, one sleeve torn",
      "Duct-taped forearm guards",
      "Half-empty pack with a crowbar strapped on",
      "Respirator hanging loose at the throat",
    ],
    voice: {
      "Voice Type": "Hoarse male narrator",
      "Pace (WPM)": "126 WPM",
      Pitch: "Low, breath-heavy",
      Accent: "Neutral North American",
      "Emotional Register": "Exhausted urgency",
      "Signature Pause": "0.8s before every noise cue",
    },
    styleDNA: [
      "Desaturated Grade",
      "Handheld Realism",
      "Practical Firelight",
      "Heavy Grain",
      "Cinematic Grime",
    ],
    palette: "ash grey, dried blood red, sickly green",
    environments: [
      "overturned highway at dusk with abandoned cars",
      "barricaded supermarket lit by one flare",
      "flooded subway tunnel with distant dragging sounds",
    ],
    pacing: "Slow Dread → Sprint",
    sound: [
      "Bed track: 70 BPM low drone with heartbeat pulse",
      "SFX: distant groan, glass crunch, ragged breathing",
      "Silence: 1.5s of dead air before the attack",
    ],
    hooks: [
      "Day 47 and {topic} just changed the rules.",
      "Nobody survives {topic} alone.",
      "{topic} is the reason the safe zone fell.",
    ],
    descriptors: ["desperate", "grim", "rationed", "hunted"],
  },
  "Bible & Mythology Anime": {
    archetype: "The Chosen Herald",
    toneTags: ["Epic", "Reverent", "Mythic"],
    wardrobe: [
      "White linen robe with gold-thread hem",
      "Bronze shoulder guard etched with script",
      "Six-winged silhouette in backlight",
      "Barefoot with dust to the ankles",
    ],
    voice: {
      "Voice Type": "Resonant male narrator",
      "Pace (WPM)": "116 WPM",
      Pitch: "Deep, cathedral-resonant",
      Accent: "Neutral transatlantic",
      "Emotional Register": "Solemn awe",
      "Signature Pause": "1.2s after every proclamation",
    },
    styleDNA: [
      "Anime Epic Key Art",
      "God Rays",
      "Gold Leaf Accents",
      "Cel Shaded Detail",
      "Grand Scale",
    ],
    palette: "sun gold, ivory white, storm indigo",
    environments: [
      "desert plain split by a column of light",
      "marble temple steps under gathering storm",
      "sky above the clouds with wings unfurled",
    ],
    pacing: "Building → Revelatory",
    sound: [
      "Bed track: 72 BPM choir with slow brass swell",
      "SFX: wind rush, distant horn, single chime",
      "Silence: 1.8s before the final verse line",
    ],
    hooks: [
      "Scripture describes {topic} in terrifying detail.",
      "{topic} was never told to you this way.",
      "This is what {topic} actually looked like.",
    ],
    descriptors: ["ancient", "radiant", "prophetic", "vast"],
  },
  "AI Influencer Product Reviews": {
    archetype: "The Polished Digital Host",
    toneTags: ["Confident", "Aspirational", "Crisp"],
    wardrobe: [
      "Ivory oversized blazer with sharp shoulders",
      "Minimal gold hoop and thin chain",
      "Glossy manicure holding the product",
      "Neutral silk shell top underneath",
    ],
    voice: {
      "Voice Type": "Bright female mid-tone",
      "Pace (WPM)": "146 WPM",
      Pitch: "Clear, forward",
      Accent: "Neutral North American",
      "Emotional Register": "Enthusiastic but controlled",
      "Signature Pause": "0.5s before every verdict",
    },
    styleDNA: [
      "Studio Softbox",
      "Glossy Product Macro",
      "Clean Gradient BG",
      "Shallow Depth",
      "Editorial Polish",
    ],
    palette: "warm ivory, blush beige, brushed champagne",
    environments: [
      "seamless studio backdrop with one soft gradient",
      "marble vanity with product laid in a row",
      "sunlit loft corner with sheer curtain diffusion",
    ],
    pacing: "Punchy → Verdict",
    sound: [
      "Bed track: 104 BPM clean pop-house loop",
      "SFX: soft click and shimmer on every product cut",
      "Silence: 0.6s before the final rating",
    ],
    hooks: [
      "I tested {topic} so you don't have to.",
      "{topic} is either genius or a scam.",
      "Three reasons {topic} is worth it.",
    ],
    descriptors: ["polished", "premium", "tested", "honest"],
  },
  "Lullaby & Sleep Music": {
    archetype: "The Moonlight Keeper",
    toneTags: ["Soothing", "Dreamlike", "Slow"],
    wardrobe: [
      "Soft cloud-grey shawl, oversized",
      "Star-embroidered blanket held loosely",
      "Bare feet on soft rug",
      "No hard edges anywhere in frame",
    ],
    voice: {
      "Voice Type": "Gentle female whisper-sing",
      "Pace (WPM)": "76 WPM",
      Pitch: "Soft high-mid",
      Accent: "Neutral",
      "Emotional Register": "Tender, drifting",
      "Signature Pause": "2.0s between phrases",
    },
    styleDNA: [
      "Dreamy Soft Focus",
      "Painterly Night",
      "Twinkle Particles",
      "Slow Parallax",
      "Pastel Glow",
    ],
    palette: "midnight blue, moon silver, soft lilac",
    environments: [
      "nursery window with slow-drifting stars",
      "clouds rolling under a crescent moon",
      "sleeping village seen from a hill at night",
    ],
    pacing: "Very Slow → Loopable",
    sound: [
      "Bed track: 56 BPM music box with warm pad",
      "SFX: distant chimes and soft rain, low mix",
      "Silence: none, seamless 8-hour loop",
    ],
    hooks: [
      "Close your eyes and drift into {topic}.",
      "{topic}, slowed down for sleep.",
      "Eight hours of {topic} to fall asleep to.",
    ],
    descriptors: ["gentle", "drifting", "soft", "endless"],
  },
  "Analog Horror & Unsolved Mysteries": {
    archetype: "The Relentless Investigator",
    toneTags: ["Authoritative", "Unsettling", "Low and Slow"],
    wardrobe: [
      "Charcoal wool overcoat, collar turned up",
      "Black leather gloves, worn at the knuckles",
      "Manila case file bound with red string",
      "Brass-bodied flashlight, scuffed lens",
    ],
    voice: {
      "Voice Type": "Deep male baritone",
      "Pace (WPM)": "128 WPM",
      Pitch: "Low, chest-resonant",
      Accent: "Neutral North American",
      "Emotional Register": "Restrained gravity",
      "Signature Pause": "0.8s before every reveal",
    },
    styleDNA: [
      "VHS Analog Artifact",
      "Scanline Noise",
      "Emergency Broadcast Frame",
      "Cinematic Noir",
      "Hyper-Detailed",
    ],
    palette: "desaturated teal, sodium-vapour orange, deep ink black",
    environments: [
      "rain-slick evidence room lit by one desk lamp",
      "static-filled broadcast screen in an empty room",
      "cork board wall of photographs and pinned string",
    ],
    pacing: "Slow-Burn → Accelerating",
    sound: [
      "Bed track: 68 BPM sub-drone with tape hiss",
      "SFX: VHS tracking whine and one reverb-tailed impact",
      "Silence: 1.2s of dead air before the final line",
    ],
    hooks: [
      "Nobody ever explained {topic}.",
      "This tape of {topic} was never meant to air.",
      "They closed the file on {topic} too fast.",
    ],
    descriptors: ["forensic", "unresolved", "documented", "buried"],
  },
  "DIY Cardboard & Miniature Builds": {
    archetype: "The Silent Maker",
    toneTags: ["Focused", "Crafty", "Satisfying"],
    wardrobe: [
      "Grey work shirt, sleeves rolled to the elbow",
      "Glue-flecked fingertips and a steel ruler",
      "Craft knife with a fresh blade",
      "Cutting mat gridded in green",
    ],
    voice: {
      "Voice Type": "Sparse narration or captions only",
      "Pace (WPM)": "96 WPM",
      Pitch: "Low, matter-of-fact",
      Accent: "Neutral",
      "Emotional Register": "Focused calm",
      "Signature Pause": "1.5s between build steps",
    },
    styleDNA: [
      "Top-Down Bench Shot",
      "Warm Practical Light",
      "Macro Craft Detail",
      "Timelapse Blend",
      "Clean Composition",
    ],
    palette: "kraft brown, matte grey, workshop green",
    environments: [
      "overhead cutting mat with tools laid in a row",
      "workshop shelf lined with finished miniatures",
      "half-built cardboard house under a desk lamp",
    ],
    pacing: "Steady Build → Reveal",
    sound: [
      "Bed track: 88 BPM lo-fi beat, low mix",
      "SFX: blade slice, cardboard flex, glue squeeze",
      "Silence: 1.5s on the finished build reveal",
    ],
    hooks: [
      "I built {topic} out of cardboard.",
      "{topic}, made from a single box.",
      "This took 40 hours: {topic}.",
    ],
    descriptors: ["handmade", "precise", "layered", "scaled"],
  },
  "Vegetable & Fruit Carving": {
    archetype: "The Blade Artisan",
    toneTags: ["Precise", "Meditative", "Elegant"],
    wardrobe: [
      "White chef coat with knife roll open",
      "Steady hands, no rings",
      "Thin carving blade catching the light",
      "Damp cloth folded beside the board",
    ],
    voice: {
      "Voice Type": "Minimal narration, soft",
      "Pace (WPM)": "92 WPM",
      Pitch: "Low, breathy",
      Accent: "Neutral",
      "Emotional Register": "Serene concentration",
      "Signature Pause": "1.4s before each cut",
    },
    styleDNA: [
      "Extreme Macro",
      "Wet Surface Sheen",
      "Single Key Light",
      "Slow Rotate",
      "Photoreal Produce",
    ],
    palette: "watermelon red, cucumber green, ivory flesh",
    environments: [
      "black slate board with water droplets",
      "rotating turntable under a hard key light",
      "market stall counter with carved pieces in a row",
    ],
    pacing: "Slow → Full Reveal Rotate",
    sound: [
      "Bed track: 62 BPM koto or soft harp",
      "SFX: crisp blade cuts and juice drip, close-mic",
      "Silence: 2.0s on the completed rotation",
    ],
    hooks: [
      "Watch a single melon become {topic}.",
      "{topic}, carved from one piece.",
      "One knife, one hour, {topic}.",
    ],
    descriptors: ["intricate", "glistening", "symmetrical", "delicate"],
  },
  "AI Car Wash & Restoration": {
    archetype: "The Detail Perfectionist",
    toneTags: ["Satisfying", "Methodical", "Transformative"],
    wardrobe: [
      "Black technician polo with rolled sleeves",
      "Foam-covered nitrile gloves",
      "Microfibre towel over the shoulder",
      "Pressure wand held low",
    ],
    voice: {
      "Voice Type": "Low calm narrator, sparse",
      "Pace (WPM)": "104 WPM",
      Pitch: "Even, relaxed",
      Accent: "Neutral",
      "Emotional Register": "Quiet satisfaction",
      "Signature Pause": "1.2s before each reveal wipe",
    },
    styleDNA: [
      "Hyperreal Paint Reflection",
      "Foam Volumetrics",
      "Studio Bay Lighting",
      "Slow Push-In",
      "Before/After Split",
    ],
    palette: "deep gloss black, foam white, chrome blue",
    environments: [
      "detailing bay with wet concrete and overhead LEDs",
      "sun-faded barn find under a dust sheet",
      "mirror-finish panel reflecting the light bar",
    ],
    pacing: "Slow Build → Big Reveal",
    sound: [
      "Bed track: 90 BPM deep house, filtered",
      "SFX: pressure spray, foam hiss, squeegee glide",
      "Silence: 1.5s on the final gloss reveal",
    ],
    hooks: [
      "This car hadn't moved in 20 years: {topic}.",
      "{topic} looked hopeless. Watch.",
      "The dirtiest {topic} I have ever cleaned.",
    ],
    descriptors: ["glossy", "restored", "layered", "transformed"],
  },
  "Miniature ASMR Cooking": {
    archetype: "The Tiny Kitchen Hands",
    toneTags: ["Adorable", "Precise", "Cozy"],
    wardrobe: [
      "Thumb-sized apron on a doll-scale figure",
      "Two human fingers as the visible operator",
      "Miniature copper pan, real and heated",
      "Match-stick-sized wooden spoon",
    ],
    voice: {
      "Voice Type": "No narration, ambient only",
      "Pace (WPM)": "0 WPM",
      Pitch: "N/A",
      Accent: "N/A",
      "Emotional Register": "Neutral, observational",
      "Signature Pause": "2.0s between cooking steps",
    },
    styleDNA: [
      "Macro Miniature",
      "Tilt-Shift Depth",
      "Warm Practical Flame",
      "Photoreal Micro Food",
      "Clean Tabletop",
    ],
    palette: "copper orange, cream tile, herb green",
    environments: [
      "matchbox-scale kitchen set on a wooden board",
      "tiny stove with a real flame under a pan",
      "miniature plating scene with tweezers",
    ],
    pacing: "Very Slow → Plating Reveal",
    sound: [
      "Bed track: none or 60 BPM soft chimes at -20dB",
      "SFX: micro sizzle, tiny chop, oil pop, binaural",
      "Silence: 2.5s on the finished miniature plate",
    ],
    hooks: [
      "The world's smallest {topic}.",
      "{topic}, cooked in a matchbox kitchen.",
      "Real fire, real food, tiny {topic}.",
    ],
    descriptors: ["tiny", "precise", "edible", "charming"],
  },
  "Nostalgia Toy Unboxing": {
    archetype: "The Time Capsule Collector",
    toneTags: ["Nostalgic", "Warm", "Reverent"],
    wardrobe: [
      "Faded band tee under an open flannel",
      "Careful hands lifting a sealed box",
      "Retro digital watch on the wrist",
      "Cotton gloves for the rarest pieces",
    ],
    voice: {
      "Voice Type": "Warm male mid-tone",
      "Pace (WPM)": "134 WPM",
      Pitch: "Friendly, slightly bright",
      Accent: "Neutral North American",
      "Emotional Register": "Nostalgic excitement",
      "Signature Pause": "0.8s before the seal breaks",
    },
    styleDNA: [
      "Retro Film Grade",
      "Tabletop Overhead",
      "Warm Tungsten",
      "Product Macro",
      "90s Print Texture",
    ],
    palette: "faded primary red, cardboard tan, retro teal",
    environments: [
      "bedroom carpet with the box lit by one lamp",
      "shelf wall of boxed figures in order",
      "overhead desk shot with packing foam laid out",
    ],
    pacing: "Anticipation → Reveal",
    sound: [
      "Bed track: 96 BPM warm synth nostalgia loop",
      "SFX: cardboard tear, plastic crinkle, blister pop",
      "Silence: 1.0s the moment the toy is free",
    ],
    hooks: [
      "Sealed since 1997: {topic}.",
      "I found {topic} in my parents' attic.",
      "{topic} was every kid's dream.",
    ],
    descriptors: ["sealed", "vintage", "collectible", "untouched"],
  },
  "Ranking & Top 5 Countdowns": {
    archetype: "The Verdict Host",
    toneTags: ["Punchy", "Opinionated", "Fast"],
    wardrobe: [
      "Sharp black crew neck, no logo",
      "Hands gesturing over a numbered graphic",
      "Minimal steel watch",
      "Clean studio silhouette",
    ],
    voice: {
      "Voice Type": "Crisp male baritone",
      "Pace (WPM)": "152 WPM",
      Pitch: "Mid, forward-placed",
      Accent: "Neutral North American",
      "Emotional Register": "Assured, competitive",
      "Signature Pause": "0.5s before every rank number",
    },
    styleDNA: [
      "Bold Numeral Overlay",
      "High Contrast Studio",
      "Split Comparison Frame",
      "Motion Graphic Wipes",
      "Ultra Clean",
    ],
    palette: "jet black, alert yellow, signal white",
    environments: [
      "dark studio with a floating number graphic",
      "split-screen comparison plate",
      "podium-style ranking board with lit tiers",
    ],
    pacing: "Punchy → Escalating to #1",
    sound: [
      "Bed track: 124 BPM tension riser loop",
      "SFX: whoosh and stamp on every rank card",
      "Silence: 0.8s before number one",
    ],
    hooks: [
      "Ranking the top 5 {topic}.",
      "Number one in {topic} will annoy people.",
      "Only one of these {topic} is worth it.",
    ],
    descriptors: ["ranked", "decisive", "comparative", "definitive"],
  },
  "Vox-Style Paper-Cut Commentary": {
    archetype: "The Explainer Journalist",
    toneTags: ["Analytical", "Clear", "Engaging"],
    wardrobe: [
      "Paper-cut hand shapes moving on a flat plane",
      "Layered card figures with drop shadow",
      "Highlight circles drawn in marker red",
      "Cut-out map pieces sliding into place",
    ],
    voice: {
      "Voice Type": "Clear neutral narrator",
      "Pace (WPM)": "148 WPM",
      Pitch: "Mid, articulate",
      Accent: "Neutral North American",
      "Emotional Register": "Curious, explanatory",
      "Signature Pause": "0.6s before each data reveal",
    },
    styleDNA: [
      "Paper Cut-Out Collage",
      "Layered Drop Shadow",
      "Flat Editorial Palette",
      "Snap Transitions",
      "Infographic Clarity",
    ],
    palette: "newsprint cream, editorial red, slate navy",
    environments: [
      "flat paper desk with sliding chart cut-outs",
      "cut-paper world map with pinned markers",
      "stacked archive clippings under a soft light",
    ],
    pacing: "Steady → Argument Build",
    sound: [
      "Bed track: 100 BPM light editorial percussion",
      "SFX: paper slide, snip, stamp on each transition",
      "Silence: 0.8s before the conclusion line",
    ],
    hooks: [
      "Here is why {topic} actually happened.",
      "{topic}, explained in one chart.",
      "Everyone argues about {topic}. The data doesn't.",
    ],
    descriptors: ["explanatory", "sourced", "layered", "clear"],
  },
  "Elderly Wisdom & Stoic Long-Form": {
    archetype: "The Silent Discipline Keeper",
    toneTags: ["Calm", "Deliberate", "Unshakeable"],
    wardrobe: [
      "Undyed linen tunic, loosely draped",
      "Leather-bound journal and iron stylus",
      "Weathered hands with deep lines",
      "Plain marble ring, no ornament",
    ],
    voice: {
      "Voice Type": "Aged warm male baritone",
      "Pace (WPM)": "112 WPM",
      Pitch: "Even, unhurried",
      Accent: "Neutral transatlantic",
      "Emotional Register": "Composed conviction",
      "Signature Pause": "1.4s after every maxim",
    },
    styleDNA: [
      "Marble Chiaroscuro",
      "Golden Hour Shafts",
      "Muted Stone",
      "Fine Grain",
      "Sculptural",
    ],
    palette: "bone white, warm amber, deep umber shadow",
    environments: [
      "colonnaded stone courtyard at dawn",
      "candle-lit study with scrolls and one window",
      "windswept cliff edge above grey sea",
    ],
    pacing: "Steady → Contemplative",
    sound: [
      "Bed track: 58 BPM strings with slow swell",
      "SFX: distant wind and a single struck bell",
      "Silence: 2.0s hold on the closing maxim",
    ],
    hooks: [
      "At 80, he finally understood {topic}.",
      "{topic} is a test, not a punishment.",
      "You do not control {topic}. Only your reply.",
    ],
    descriptors: ["disciplined", "enduring", "measured", "unmoved"],
  },
  "AI Music Videos": {
    archetype: "The Faceless Performer",
    toneTags: ["Stylised", "Rhythmic", "Surreal"],
    wardrobe: [
      "Mirror-visor helmet reflecting the stage lights",
      "Oversized metallic trench with hard shoulders",
      "Chrome rings across gloved fingers",
      "Boots with light strips along the sole",
    ],
    voice: {
      "Voice Type": "Sung vocal, no spoken narration",
      "Pace (WPM)": "Tempo-locked",
      Pitch: "Genre-dependent",
      Accent: "Neutral",
      "Emotional Register": "Stylised intensity",
      "Signature Pause": "Beat-drop hold on every chorus",
    },
    styleDNA: [
      "Music Video Grade",
      "Beat-Synced Cuts",
      "Neon Practicals",
      "Lens Flare Streaks",
      "Surreal Composite",
    ],
    palette: "electric magenta, deep violet, chrome silver",
    environments: [
      "rain-lit rooftop with neon signage behind",
      "infinite mirrored corridor pulsing with light",
      "desert highway at night lit by headlights",
    ],
    pacing: "Beat-Synced → Chorus Drop",
    sound: [
      "Bed track: full song, 110-128 BPM",
      "SFX: riser and impact on each section change",
      "Silence: 0.5s cut to black before the final chorus",
    ],
    hooks: [
      "This song about {topic} was made by AI.",
      "{topic}, turned into a music video.",
      "Wait for the drop: {topic}.",
    ],
    descriptors: ["stylised", "neon", "rhythmic", "surreal"],
  },
  "Cartoon Horror Illustration": {
    archetype: "The Storybook Narrator with a Secret",
    toneTags: ["Eerie", "Playful", "Sinister"],
    wardrobe: [
      "Long-limbed cartoon figure with a stitched grin",
      "Faded striped coat too long at the sleeves",
      "Button eyes catching the candlelight",
      "Wide brim hat casting a hard shadow",
    ],
    voice: {
      "Voice Type": "Soft storybook narrator turning cold",
      "Pace (WPM)": "122 WPM",
      Pitch: "Mid, sing-song into flat",
      Accent: "Neutral",
      "Emotional Register": "Sweet then unsettling",
      "Signature Pause": "1.0s before every twist",
    },
    styleDNA: [
      "Illustrated Storybook Horror",
      "Ink Line Texture",
      "Hand-Painted Shadow",
      "Distorted Perspective",
      "Uncanny Cute",
    ],
    palette: "bruised purple, sickly yellow, ink black",
    environments: [
      "crooked house interior with tilted walls",
      "moonlit forest path drawn in ink and wash",
      "children's bedroom with one door left open",
    ],
    pacing: "Whimsical → Sudden Dread",
    sound: [
      "Bed track: 66 BPM detuned music box",
      "SFX: creak, distant giggle, single low string hit",
      "Silence: 1.5s before the final frame",
    ],
    hooks: [
      "This bedtime story about {topic} is real.",
      "{topic} is not supposed to be drawn.",
      "The nice version of {topic} is a lie.",
    ],
    descriptors: ["uncanny", "storybook", "twisted", "hand-drawn"],
  },
  "Pixel Game POV": {
    archetype: "The Player Character",
    toneTags: ["Retro", "Immersive", "Escalating"],
    wardrobe: [
      "16-bit sprite armour in four-colour ramp",
      "Pixel sword held at the bottom of frame",
      "Health bar and inventory HUD overlay",
      "Cape animated on a 4-frame loop",
    ],
    voice: {
      "Voice Type": "Energetic narrator or text-box captions",
      "Pace (WPM)": "144 WPM",
      Pitch: "Mid-bright",
      Accent: "Neutral",
      "Emotional Register": "Playful tension",
      "Signature Pause": "0.4s before every level transition",
    },
    styleDNA: [
      "16-Bit Pixel Art",
      "Limited Palette Ramp",
      "Scanline Overlay",
      "Parallax Scroll",
      "HUD Framing",
    ],
    palette: "cobalt blue, pixel gold, dungeon grey",
    environments: [
      "side-scroll dungeon corridor with torch sprites",
      "overworld map with parallax mountain layers",
      "boss arena with a shaking screen effect",
    ],
    pacing: "Level-by-Level → Boss Spike",
    sound: [
      "Bed track: 130 BPM chiptune loop",
      "SFX: coin blip, hit thud, level-up jingle",
      "Silence: 0.5s freeze before the boss appears",
    ],
    hooks: [
      "You are playing {topic}. Level one.",
      "{topic} but it's a retro game.",
      "Can you beat {topic} without dying?",
    ],
    descriptors: ["pixelated", "retro", "leveled", "arcade"],
  },
  "Celebrity Evolution & Glow-Up": {
    archetype: "The Timeline Curator",
    toneTags: ["Slick", "Curious", "Comparative"],
    wardrobe: [
      "Clean black studio silhouette",
      "Year labels floating beside each portrait",
      "Split-frame divider in thin white",
      "Archive photo borders in soft grain",
    ],
    voice: {
      "Voice Type": "Smooth mid-range narrator",
      "Pace (WPM)": "140 WPM",
      Pitch: "Warm, conversational",
      Accent: "Neutral North American",
      "Emotional Register": "Intrigued, upbeat",
      "Signature Pause": "0.5s at every year jump",
    },
    styleDNA: [
      "Portrait Morph Transition",
      "Year Card Overlay",
      "Archive Grain Blend",
      "Studio Key Light",
      "Timeline Framing",
    ],
    palette: "monochrome grey, spotlight white, accent gold",
    environments: [
      "black studio plate with one centred portrait",
      "timeline strip scrolling with dated frames",
      "side-by-side then-and-now comparison plate",
    ],
    pacing: "Steady Timeline → Final Reveal",
    sound: [
      "Bed track: 108 BPM smooth electronic pulse",
      "SFX: shutter click on every year transition",
      "Silence: 0.8s on the present-day frame",
    ],
    hooks: [
      "{topic}, from age 5 to today.",
      "Nobody expected {topic} to look like this now.",
      "The full glow-up of {topic}.",
    ],
    descriptors: ["chronological", "transformative", "archival", "striking"],
  },
  "Poor vs. Rich Animals (AI Skits)": {
    archetype: "The Two-Sided Animal Cast",
    toneTags: ["Comedic", "Contrasting", "Charming"],
    wardrobe: [
      "Poor side: patched brown coat and taped shoes",
      "Rich side: velvet blazer, gold chain, tiny sunglasses",
      "Both animals share the same species and build",
      "Props: dented tin bowl versus crystal plate",
    ],
    voice: {
      "Voice Type": "Dual character voices, comedic",
      "Pace (WPM)": "150 WPM",
      Pitch: "Contrasting high and low",
      Accent: "Neutral, slightly exaggerated",
      "Emotional Register": "Broad comedy with a soft ending",
      "Signature Pause": "0.4s before every side-swap",
    },
    styleDNA: [
      "Pixar-Style 3D",
      "Split Screen Contrast",
      "Warm vs Cold Grade",
      "Expressive Animal Rig",
      "Punchy Comedy Timing",
    ],
    palette: "gold and cream on one side, grey and rust on the other",
    environments: [
      "split frame: marble penthouse against a rainy alley",
      "restaurant table set twice, luxury and scraps",
      "shared street where both animals meet",
    ],
    pacing: "Back-and-Forth → Heart Beat",
    sound: [
      "Bed track: 116 BPM comedic orchestral swap",
      "SFX: cash register on rich cuts, tin clatter on poor cuts",
      "Silence: 1.0s before the kind ending",
    ],
    hooks: [
      "Rich {topic} vs Poor {topic} — guess who eats better.",
      "Rich {topic} vs Poor {topic} — same day, two worlds.",
      "Rich {topic} vs Poor {topic} — the twist is at the end.",
    ],
    descriptors: ["contrasting", "comedic", "heartfelt", "exaggerated"],
  },
};

type NicheRules = Pick<
  NicheProfile,
  | "hookFormat"
  | "voVoiceType"
  | "voEmotionalRegister"
  | "cameraMotions"
  | "retentionBeatLabels"
  | "soundDesign"
  | "imageStyleFlags"
  | "imageNegativePrompt"
  | "variationTone"
  | "forbiddenVocabulary"
>;

const R = (
  hookFormat: string,
  voVoiceType: string,
  voEmotionalRegister: string,
  cameraMotions: NicheRules["cameraMotions"],
  retentionBeatLabels: NicheRules["retentionBeatLabels"],
  bedTrack: string,
  sfx: string[],
  silenceCue: string,
  imageStyleFlags: string,
  imageNegativePrompt: string,
  variationTone: string,
  forbiddenVocabulary: string[],
): NicheRules => ({
  hookFormat, voVoiceType, voEmotionalRegister, cameraMotions, retentionBeatLabels,
  soundDesign: { bedTrack, sfx, silenceCue }, imageStyleFlags, imageNegativePrompt,
  variationTone, forbiddenVocabulary,
});

const NICHE_RULES: Record<Niche, NicheRules> = {
  "AI Cat & Pet Stories": R("The pet who {topic} — and no one knew why.", "Warm single narrator, gentle storytelling pace", "Heartwarming with bittersweet beats", ["slow push toward subject's face", "gentle tilt following paw movement", "static wide reveal", "slight pan across environment", "close-up reaction hold", "pull-back emotional reveal"], ["Emotional hook", "Story reveal", "Heart-tug payoff"], "70 BPM soft piano + strings", ["soft meow", "purr", "paw steps"], "1.5s before the emotional climax", "Pixar-style 3D animated, soft fur texture, warm golden lighting, cinematic emotional tone", "realistic gore, violence, disturbing imagery, mutated features", "Warm and hopeful", ["timeline", "investigation", "suspect", "evidence"]),
  "AI Animal Cooking": R("An animal chef makes {topic} from scratch.", "Playful single narrator, children's-book energy", "Cheerful, silly, upbeat", ["overhead ingredient reveal", "macro whisking close-up", "pan across countertop", "static side-angle cooking shot", "low-angle hero plate reveal", "quick cut combo rhythm"], ["Curiosity opener", "Silly mishap", "Satisfying finish"], "128 BPM bouncy ukulele + marimba", ["chop", "sizzle", "plate clink"], "None — continuous music", "Pixar-style 3D cartoon, cute anthropomorphic animals, bright kitchen palette, warm cinematic lighting", "realistic cooking, real animals, blood, distorted faces", "Playful and light", ["timeline", "investigation", "crisis", "grave"]),
  "POV Immersive Vlogs": R("POV: You {topic}.", "First-person narrator, whispered internal monologue", "Raw, intimate, observational", ["handheld first-person shake", "slow tilt up from ground", "walking forward motion", "glance left then right", "camera lowers as subject sits", "static first-person hold"], ["Immersive opener", "Sensory detail", "Reveal moment"], "ambient field recording, no music", ["footsteps", "breathing", "environment ambience"], "Nothing — no silence cues", "Photoreal 35mm, handheld POV, natural lighting, shallow depth of field", "cgi, cartoon, anime, stylized", "Immersive and observational", ["countdown", "top 5", "comedy", "joke"]),
  "Anime Fight Versus": R("{topic} — the fight you've been waiting for.", "High-energy announcer, hype-man pacing", "Explosive, competitive, dramatic", ["fast dolly-in on clash", "wide establishing power-up shot", "slow-motion impact freeze", "rapid pan following punch", "low-angle hero shot", "pull-back reveal of destruction"], ["Power-up hype", "Impact clash", "Winning blow reveal"], "140 BPM epic orchestral + taiko drums", ["whoosh", "impact boom", "energy charge"], "1.0s before the finishing blow", "Anime style, cel-shaded, dramatic speed lines, vibrant energy effects, cinematic widescreen", "photoreal, 3D render, muted colors, western cartoon", "Bold and explosive", ["gentle", "cozy", "soft"]),
  "Stickman Explainer & Skits": R("Here's why {topic} actually works.", "Deadpan educational narrator", "Dry, witty, informative", ["static wide frame", "quick zoom on stickman face", "pan across diagram", "hard cut between panels", "push-in on chart", "cutaway to visual metaphor"], ["Curiosity opener", "Absurd analogy", "Punchline explanation"], "minimal lo-fi beat, 90 BPM", ["pen click", "whoosh transition", "record scratch on beat"], "0.5s before punchline", "Minimalist 2D stickman cartoon, white background, thin black outlines, pale yellow accent", "photoreal, detailed textures, 3D, complex rendering", "Deadpan and clever", ["emotional", "heartfelt", "moving"]),
  "AI ASMR (Cooking, Cleaning, Restoration)": R("No narration — pure ASMR of {topic}.", "No voiceover — sound design only", "Calm, satisfying, meditative", ["fixed macro overhead", "slow zoom on texture", "static close-up hold", "gentle tilt across surface", "micro push on detail", "no camera movement — locked frame"], ["Texture reveal", "Satisfying process", "Perfect finish"], "no music", ["liquid pour", "brush scrape", "foam burst", "metal click"], "None — continuous ambient", "Hyper-realistic macro, sharp detail, soft natural lighting, shallow depth of field", "cartoon, stylized, animation, illustration", "Calm and satisfying", ["hook", "cliffhanger", "countdown"]),
  "Zombie Apocalypse Drama": R("A survivor has 60 seconds to escape {topic}.", "Tense first-person survivor, breathless", "Panicked, urgent, survival-focused", ["handheld chase shake", "running forward motion", "whip pan to check behind", "fall to ground impact", "close-up on terrified face", "wide shot of horde approaching"], ["Threat reveal", "Near-miss beat", "Escape moment"], "85 BPM tense drone + percussion", ["moan", "footsteps", "breath", "metal clang"], "2s before the escape moment", "Hyper-realistic cinematic, desaturated palette, film grain, dust and debris", "cartoon, anime, colorful, stylized", "Tense and cinematic", ["comedy", "cute", "playful"]),
  "Bible & Mythology Anime": R("The story of {topic} — as you've never seen it.", "Reverent epic narrator, storybook pacing", "Dramatic, awe-inspiring, mythic", ["slow reveal from clouds", "ascending crane shot", "wide epic establishing shot", "close-up on divine glow", "orbit around character", "pull-back to cosmic scale"], ["Divine reveal", "Mythic conflict", "Transcendent ending"], "60 BPM choir + orchestral swells", ["thunder", "holy chime", "wind"], "2s before the divine revelation", "Anime style, cel-shaded, divine lighting, ornate detail, cinematic widescreen", "photoreal, cartoon, modern clothing, contemporary setting", "Reverent and epic", ["comedy", "silly", "meme"]),
  "AI Influencer Product Reviews": R("I've been using {topic} for 30 days — here's the truth.", "Casual friend-next-door, natural Filipina accent", "Conversational, authentic, honest", ["handheld selfie angle", "close-up on product", "medium shot talking head", "pan across workspace", "static reviewer POV", "quick cut to product in use"], ["First impression", "Testing surprise", "Honest verdict"], "no music, natural room tone", ["product click", "paper rustle", "typing"], "None", "Photoreal, natural lighting, modern home/studio background, 4K", "cartoon, anime, stylized, CGI", "Authentic and conversational", ["mythology", "epic", "dramatic"]),
  "Lullaby & Sleep Music": R("No hook — soft opening fade-in of {topic}.", "Soft breathy female vocals only, no narration", "Calm, soothing, sleepy", ["static locked frame", "very slow tilt across sleeping subject", "no movement", "gentle drift on ambient particles", "slow dissolve to next scene", "static hold"], ["Gentle entry", "Peaceful drift", "Soft landing"], "62 BPM music box + soft piano", ["very soft chime", "gentle breath"], "Never silent — continuous ambient", "Pixar-style 3D, soft pastel colors, warm nursery lighting, sleepy atmosphere", "fast motion, flashing lights, loud colors, scary imagery", "Gentle and soothing", ["hook", "cliffhanger", "payoff", "countdown"]),
  "Analog Horror & Unsolved Mysteries": R("Recording recovered: {topic}. Subject unknown.", "Distorted broadcast voice, unsettling monotone", "Creepy, wrong, uncanny", ["static found-footage hold", "sudden tilt to hidden figure", "distorted zoom in", "VHS tracking glitch shake", "static wide with slow figure approach", "cut to black abruptly"], ["Anomaly detected", "Escalating dread", "Unresolved terror"], "static drone + low rumble", ["VHS whir", "static burst", "distant scream"], "Long uncomfortable silence before the reveal", "VHS found-footage aesthetic, low-fi, grain, distorted color, 1980s camcorder", "modern high-def, clean, cartoon, anime", "Unsettling and wrong", ["cute", "cheerful", "upbeat", "heartwarming"]),
  "DIY Cardboard & Miniature Builds": R("Making {topic} from cardboard — no power tools.", "Friendly maker narrator, step-by-step pacing", "Satisfying, methodical, encouraging", ["overhead build shot", "macro close on glue bond", "timelapse sequence", "side-angle assembly shot", "static workbench hold", "reveal spin of finished piece"], ["Build start", "Satisfying assembly", "Finished reveal"], "100 BPM acoustic guitar + light percussion", ["cardboard fold", "hot glue squeeze", "scissors snip"], "1s before final reveal", "Photoreal craft photography, warm workshop lighting, macro detail", "cartoon, anime, CGI, floating objects", "Satisfying and methodical", ["investigation", "threat", "horror"]),
  "Vegetable & Fruit Carving": R("Carving {topic} into a watermelon.", "No narration, ambient workshop sound only", "Satisfying, focused, meditative", ["locked macro overhead", "slow zoom on knife tip", "static side angle", "micro push into carving detail", "no movement — locked frame", "final spin of finished piece"], ["First cut", "Reveal progress", "Finished sculpture"], "no music", ["knife slice", "rind peel", "juice drip"], "None — continuous ambient", "Photoreal macro, sharp focus, natural lighting, shallow depth of field", "cartoon, anime, drawing, illustration", "Satisfying and precise", ["comedy", "character", "narrative"]),
  "AI Car Wash & Restoration": R("This {topic} hasn't been cleaned in 20 years.", "No narration, satisfying transformation only", "Satisfying, dramatic reveal", ["steady close-up on dirty surface", "slow cinematic zoom during wash", "static wide transformation reveal", "macro foam detail", "pull-back before-after shot", "locked frame with water motion"], ["Grime reveal", "Satisfying wash", "Mirror-finish payoff"], "120 BPM uplifting cinematic beat", ["water spray", "foam burst", "brush scrub", "metal sparkle chime"], "1s before the final reveal", "Photoreal, automotive commercial lighting, high detail, HDR", "cartoon, anime, stylized, illustration", "Satisfying and dramatic", ["narrative", "character", "story"]),
  "Miniature ASMR Cooking": R("Tiny kitchen — {topic} at 1:12 scale.", "No narration — pure miniature ASMR", "Satisfying, precise, miniature wonder", ["macro overhead on tiny stove", "close-up on miniature knife", "static side shot of tiny cooking", "micro push on steam", "locked frame with food sizzle", "final plate reveal"], ["Tiny prep", "Macro cooking detail", "Finished mini dish"], "no music", ["tiny sizzle", "mini clink", "soft pour"], "None — continuous ambient", "Photoreal macro, miniature scale, cinematic macro lighting, warm kitchen tones", "cartoon, stylized, full-size objects", "Satisfying and precise", ["character", "story", "narrative"]),
  "Nostalgia Toy Unboxing": R("Opening a vintage {topic} — unopened for 30 years.", "No narration, ASMR unboxing focus", "Nostalgic, satisfying, gentle", ["POV overhead unboxing", "macro close on tape seal", "static side angle with hands entering", "slow zoom on reveal", "locked frame on display shelf", "gentle pan across collection"], ["Box inspection", "Reveal moment", "Collection placement"], "ambient 80s synth pad, no rhythm", ["cardboard crease", "plastic crinkle", "tape peel"], "2s before the toy reveal", "Photoreal, 1990s camcorder look, warm nostalgic lighting, sharp detail", "cartoon, anime, modern aesthetic, 4K clean", "Nostalgic and gentle", ["investigation", "threat", "horror"]),
  "Ranking & Top 5 Countdowns": R("Top 5 {topic} — number one will surprise you.", "Energetic countdown narrator, build-up pacing", "Curious, competitive, escalating", ["zoom-in on rank number", "static wide with animated rank", "cut between items", "push-in on the number one reveal", "slow pan across ranked items", "dramatic pull-back on final"], ["Curiosity opener", "Ranking buildup", "Number one reveal"], "110 BPM tension-building electronic", ["countdown tick", "drum hit", "whoosh"], "1s before number one reveal", "Clean editorial illustration, bold typography, high-contrast palette", "photoreal, cinematic, dark, moody", "Curious and competitive", ["gentle", "soft", "quiet"]),
  "Vox-Style Paper-Cut Commentary": R("{topic} — and why it matters more than you think.", "Investigative documentary narrator, measured pacing", "Analytical, credible, thoughtful", ["overhead tabletop with paper reveal", "slow push on evidence board", "static paper-slide animation", "pan across documents", "zoom on map or chart", "reveal of final paper stack"], ["Central question", "Evidence buildup", "Conclusion reveal"], "95 BPM minimal documentary score", ["paper slide", "pin push", "typewriter click"], "1.5s before the conclusion", "Paper-cut collage, torn edges, vintage textures, editorial design, beige + red accents", "photoreal, cartoon, 3D, glossy", "Analytical and credible", ["joke", "silly", "playful", "cute"]),
  "Elderly Wisdom & Stoic Long-Form": R("The Stoics taught this 2,000 years ago — most people still ignore {topic}.", "Wise elder narrator, slow deliberate pacing", "Reflective, patient, timeless", ["static wide with slow text overlay", "slow pan across classical imagery", "gentle zoom on statue or scene", "locked frame with ambient nature", "slow tilt across landscape", "fade transitions between scenes"], ["Timeless premise", "Wisdom reveal", "Reflective close"], "70 BPM soft orchestral, no percussion", ["wind", "distant birds", "soft footsteps"], "2s before the final wisdom line", "Cinematic painterly realism, muted earthy palette, museum-quality composition", "cartoon, anime, modern, neon, stylized", "Reflective and timeless", ["meme", "comedy", "trending", "viral"]),
  "AI Music Videos": R("No hook — music starts immediately with {topic}.", "Music vocals only, no narration", "Musical, artistic, cinematic", ["beat-synced cut rhythm", "cinematic dolly through scene", "slow push on performer", "spin around subject", "static hold with light change", "lyric-synced zoom"], ["Beat entry", "Chorus visual peak", "Emotional outro"], "song-driven, no separate bed", ["matched to song beats"], "None — music continuous", "Cinematic artistic style, high contrast lighting, music-video aesthetic", "documentary, casual, handheld", "Artistic and cinematic", ["narration", "explainer", "tutorial"]),
  "Cartoon Horror Illustration": R("You shouldn't have opened {topic}.", "Creepy playful narrator, unsettling singsong", "Eerie, unsettling, darkly comedic", ["static hold with subtle zoom", "sudden whip to hidden figure", "slow push on expression", "creepy tilt down", "locked frame with movement in background", "freeze frame on horror reveal"], ["Creepy setup", "Wrong detail", "Horror payoff"], "95 BPM off-kilter music box + drone", ["creak", "whisper", "child laughter reversed"], "3s of dead silence before the reveal", "Adult indie cartoon, thick outlines, flat colors, hand-drawn texture, eerie atmosphere", "cute, wholesome, bright, cheerful, disney", "Eerie and unsettling", ["cute", "wholesome", "family-friendly", "cheerful"]),
  "Pixel Game POV": R("POV: You're the last {topic} in a pixel world.", "Retro game announcer or silent POV", "Nostalgic, adventurous, retro", ["retro 90s pixel scrolling", "top-down walking motion", "side-scroll pan", "static pixel frame with cursor", "pixelated zoom-in", "locked frame with sprite animation"], ["World entry", "Retro encounter", "Victory screen"], "8-bit chiptune, 130 BPM", ["coin ping", "jump", "enemy hit", "level-up jingle"], "None — continuous chiptune", "90s pixel art, 16-bit SNES palette, retro game aesthetic, crisp sprite detail", "photoreal, 3D, HD, modern rendering", "Nostalgic and retro", ["photoreal", "cinematic", "editorial"]),
  "Celebrity Evolution & Glow-Up": R("{topic} then vs now — the transformation is wild.", "Dramatic reveal narrator, punchy pacing", "Shocking, dramatic, satisfying", ["split-screen slide reveal", "zoom-in on before photo", "wipe transition to after", "static hold with morph effect", "pan across transformation timeline", "final pull-back reveal"], ["Before reveal", "Transformation moment", "After shock"], "105 BPM dramatic electronic", ["whoosh", "camera shutter", "impact hit"], "1s before the after reveal", "Photoreal, magazine-quality portraits, cinematic lighting", "cartoon, anime, stylized, illustration", "Dramatic and shocking", ["gentle", "quiet", "calm"]),
  "Poor vs. Rich Animals (AI Skits)": R("Rich {topic} vs Poor {topic} — the twist changes everything.", "Dual comedic character voices, contrasting pitch", "Broad comedy with a soft ending", ["whip pan between characters", "snap zoom on reaction", "split-screen slide-in", "low-angle hero shot", "slow tilt from rich side to poor side", "hard cut on punchline"], ["Setup beat", "Reaction beat", "Payoff beat"], "116 BPM comedic orchestral swap", ["cash register on rich cuts", "tin clatter on poor cuts"], "1.0s before the kind ending", "Pixar-style 3D cartoon render, expressive animal rig, split-screen warm vs cold grade, punchy comedy lighting", "gore, realistic, dark, horror", "Comedic and warm", ["timeline", "investigation", "evidence", "part two", "one source"]),
};

export const NICHE_PROFILES: Record<string, NicheProfile> = NICHES.reduce<Record<string, NicheProfile>>(
  (profiles, niche) => {
    const base = BASE_NICHE_PROFILES[niche];
    if (!base) throw new Error(`Missing base profile for ${niche}`);
    profiles[niche] = { ...base, ...NICHE_RULES[niche] };
    return profiles;
  },
  {},
);

export function getNicheProfile(niche: string): NicheProfile {
  return (NICHE_PROFILES[niche] ?? NICHE_PROFILES[NICHES[0]]) as NicheProfile;
}

const SAFE_TERM_REPLACEMENTS: Record<string, string> = {
  cinematic: "film-grade",
  emotional: "expressive",
  heartfelt: "warm",
  moving: "affecting",
  hook: "opening",
  cliffhanger: "unresolved beat",
  payoff: "resolution",
  countdown: "sequence",
  narrative: "sequence",
  character: "subject",
  story: "concept",
};

function scrubForbiddenVocabulary(text: string, profile: NicheProfile): string {
  return profile.forbiddenVocabulary.reduce((output, term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const replacement = SAFE_TERM_REPLACEMENTS[term.toLowerCase()] ?? "excluded concept";
    return output.replace(new RegExp(`\\b${escaped}\\b`, "gi"), replacement);
  }, text);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (Math.abs(h) % 900000) + 100000;
}

function pick<T>(arr: T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length] as T;
}

function tokenFrom(seed: number, topic: string): string {
  const base = (slugify(topic).replace(/-/g, "") + "faceless").toUpperCase();
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += base[(seed + i * 7) % base.length] ?? "X";
  }
  return `FSP-CORE-${out}-v1`;
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const ANIMAL_SKIT_NICHE = "Poor vs. Rich Animals (AI Skits)";

function cueEndTime(cueSheet: { timestamp: string }[], index: number): string {
  return cueSheet[index + 1]?.timestamp ?? "0:30";
}

function animalMotionType(motion: string): string {
  return motion.toLowerCase().split(/\s+(?:from|on|between|comparing|of)\s+/)[0]?.trim() ?? motion;
}

function orderDistinctMotions(motions: string[], seed: number, count: number): string[] {
  const ordered: string[] = [];
  for (let i = 0; ordered.length < count && i < motions.length * 2; i++) {
    const candidate = motions[(seed + i) % motions.length];
    if (!candidate) continue;
    const previous = ordered.at(-1);
    if (!previous || animalMotionType(previous) !== animalMotionType(candidate)) ordered.push(candidate);
  }
  return ordered;
}

const VARIATION_OPTIONS = {
  hookStyle: [
    "Cold open with a surprising statistic",
    "Rhetorical question that challenges an assumption",
    "Start in the middle of the decisive action",
    "Contrarian claim followed by immediate proof",
    "Sensory detail before revealing the subject",
    "Outcome-first reveal with the cause withheld",
    "Direct viewer challenge with a specific stake",
    "Quiet confession that opens an unanswered loop",
  ],
  storyStructure: [
    "Chronological escalation from setup to payoff",
    "Flash-forward opening, then rewind to the cause",
    "Two contrasting timelines that converge at the reveal",
    "Problem, failed attempt, insight, final transformation",
    "Three clues arranged from subtle to undeniable",
    "Before-and-after comparison with a midpoint reversal",
    "Single-moment deep dive with widening context",
    "Myth, evidence, verdict structure",
  ],
  pacingProfile: [
    "Slow build, rapid payoff, one-beat closing pause",
    "Immediate burst, controlled middle, accelerating finish",
    "Steady curiosity climb with two sharp pattern interrupts",
    "Measured setup, compressed proof sequence, held reveal",
    "Alternating quick and quiet beats with a clean final hit",
    "Fast first five seconds, deliberate explanation, snap ending",
  ],
  editingStyle: [
    "Hard cuts on actions with one held detail shot",
    "Smooth match cuts supported by restrained b-roll",
    "Graphic cutaways alternating with close observational footage",
    "Rhythmic jump cuts followed by a continuous final shot",
    "Object-led match cuts with minimal on-screen text",
    "Clean documentary cuts with one visual callback",
  ],
  emotionalTone: [
    "Skeptical and investigative",
    "Warm and nostalgic",
    "Playfully competitive",
    "Quietly suspenseful",
    "Earnest and hopeful",
    "Precise and satisfying",
    "Urgent but credible",
    "Curious and slightly uncanny",
  ],
} as const;

function buildVariationPlan(seed: number, niche: string, topic: string, profile: NicheProfile) {
  const hookStyle = pick([...VARIATION_OPTIONS.hookStyle], seed, 1);
  const storyStructure = pick([...VARIATION_OPTIONS.storyStructure], seed, 3);
  const pacingProfile = pick([...VARIATION_OPTIONS.pacingProfile], seed, 5);
  const editingStyle = pick([...VARIATION_OPTIONS.editingStyle], seed, 7);
  const emotionalTone = profile.variationTone;

  return {
    hookStyle,
    storyStructure,
    pacingProfile,
    editingStyle,
    emotionalTone,
    copyPastePrompt: `For this ${niche} video about ${topic}, follow the opening device ${profile.hookFormat.toLowerCase()}. Use ${hookStyle.toLowerCase()}, structure the story as ${storyStructure.toLowerCase()}, shape the pacing as ${pacingProfile.toLowerCase()}, edit with ${editingStyle.toLowerCase()}, and keep the emotional tone ${emotionalTone.toLowerCase()}. Preserve the niche voice while changing the information order, shot rhythm, transitions, and framing so this upload feels deliberately original.`,
  };
}

function variationMatchesNiche(variation: ReturnType<typeof buildVariationPlan>, profile: NicheProfile): boolean {
  const tone = variation.emotionalTone.toLowerCase();
  const variationText = Object.values(variation).join(" ").toLowerCase();
  const required = profile.variationTone.toLowerCase().split(/\s+(?:and|with)\s+/).filter((word) => word.length > 3);
  return required.some((word) => tone.includes(word)) && !profile.forbiddenVocabulary.some((word) => variationText.includes(word.toLowerCase()));
}

function rebuildVariationForNiche(seed: number, niche: string, topic: string, profile: NicheProfile) {
  const hookStyle = `Niche-specific opening based on: ${profile.hookFormat}`;
  const storyStructure = `${profile.retentionBeatLabels.join(" to ")} progression`;
  const pacingProfile = `${profile.voEmotionalRegister} pacing with a controlled final beat`;
  const editingStyle = `${profile.cameraMotions[(seed + 1) % profile.cameraMotions.length]} followed by ${profile.cameraMotions[(seed + 3) % profile.cameraMotions.length]}`;
  const emotionalTone = profile.variationTone;
  return {
    hookStyle,
    storyStructure,
    pacingProfile,
    editingStyle,
    emotionalTone,
    copyPastePrompt: scrubForbiddenVocabulary(`For this ${niche} video about ${topic}, use ${profile.hookFormat.toLowerCase()} as the opening pattern. Structure the sequence as ${storyStructure.toLowerCase()}, shape the pacing as ${pacingProfile.toLowerCase()}, edit with ${editingStyle.toLowerCase()}, and keep the tone ${emotionalTone.toLowerCase()}. Preserve the niche's ${profile.voEmotionalRegister.toLowerCase()} voice while changing the execution enough to feel original.`, profile),
  };
}

function scrubVariation(
  variation: ReturnType<typeof buildVariationPlan>,
  profile: NicheProfile,
): ReturnType<typeof buildVariationPlan> {
  return Object.fromEntries(
    Object.entries(variation).map(([key, value]) => [key, scrubForbiddenVocabulary(value, profile)]),
  ) as ReturnType<typeof buildVariationPlan>;
}

export function generatePackage({
  niche,
  topic,
  seed,
  style,
}: {
  niche: string;
  topic: string;
  seed?: number;
  style?: StyleSelection;
}): ProductionPackage {
  const profile = getNicheProfile(niche);
  const st = resolveStyle(style);
  const ar = st.format.aspectRatio;
  const orient = st.format.orientation;
  const s = seed ?? hashSeed(`${niche}::${topic}`);
  const cleanTopic = sanitizeTopic(topic);
  const phrase = topicPhrase(cleanTopic);
  const lowTopic = phrase.charAt(0).toLowerCase() + phrase.slice(1);
  const env = pick(profile.environments, s);
  const env2 = pick(profile.environments, s, 1);
  const desc = pick(profile.descriptors, s);
  const desc2 = pick(profile.descriptors, s, 2);

  const human = isHumanSubject(niche);
  const framing = subjectFramingClause(niche);
  const subjPrefix = subjectPrefix(niche);

  const physicalDescription = [
    human
      ? `Faceless figure, shot from behind and at chest height — the face is never visible, always cropped, shadowed, or turned away.`
      : `${titleCase(profile.archetype.toLowerCase().replace(/^the /, ""))} shown complete and in full detail — natural face and anatomy clearly visible, consistent markings and proportions in every shot.`,
    human
      ? `Silhouette: ${pick(["tall and still", "broad and grounded", "lean and deliberate"], s)}, shoulders squared, head slightly lowered.`
      : `Silhouette: ${pick(["compact and rounded", "sturdy and grounded", "sleek and defined"], s)}, instantly recognisable at thumbnail size.`,
    human
      ? `Hands are the hero: close macro on ${pick(["gloved fingers", "bare knuckles", "steady hands"], s, 3)} handling material tied to ${lowTopic}.`
      : `Hero detail: close macro on the ${desc} surface tied to ${lowTopic}.`,
    `Environment: ${env}; secondary set-up in ${env2}.`,
    `Lighting: single hard key from ${pick(["camera left", "camera right", "behind the subject"], s, 4)}, deep falloff, ${profile.palette}.`,
  ].join("\n");

  // "a whale and a rat" -> ["whale", "rat"] so versus-style hooks read cleanly.
  const versusNiche = /poor vs|versus/i.test(niche);
  const pair = versusNiche
    ? stripArticle(lowTopic)
        .split(/\s+(?:and|versus|vs\.?)\s+/i)
        .map((part) => stripArticle(part.trim()))
        .filter(Boolean)
    : [];
  const fill = (template: string): string => {
    if (pair.length !== 2) return fillTemplate(template, phrase);
    let i = 0;
    return template.replace(/\{(?:topic|lowTopic)\}/g, () => pair[i++ % 2] ?? phrase);
  };

  const hookSource = [profile.hookFormat, ...profile.hooks.slice(0, 2)];
  const hooks = hookSource.map((h, i) => ({
    label: `Hook ${["A", "B", "C"][i] ?? String(i + 1)}`,
    text: scrubForbiddenVocabulary(fill(h), profile),
  }));

  const rawCueSheet = [
    {
      timestamp: "0:00",
      line: hooks[0]?.text ?? "",
      cue: `cold open, ${profile.voEmotionalRegister.toLowerCase()}`,
    },
    {
      timestamp: "0:05",
      line: `${profile.retentionBeatLabels[0]} begins as ${lowTopic} reveals one ${desc} detail worth noticing.`,
      cue: "pause 0.4s",
    },
    {
      timestamp: "0:11",
      line: `${profile.retentionBeatLabels[1]} changes the rhythm, bringing the ${desc2} contrast clearly into view.`,
      cue: "increase pace slightly",
    },
    {
      timestamp: "0:18",
      line: `Now ${lowTopic} shifts again, and the central idea becomes impossible to overlook.`,
      cue: "pause 0.3s",
    },
    {
      timestamp: "0:25",
      line: `${profile.retentionBeatLabels[2]} lands with a final ${desc} image that completes the moment.`,
      cue: `${profile.voice["Signature Pause"] ?? "pause 0.8s"}, intimate finish`,
    },
  ];

  // Voiceover script keeps ElevenLabs-supported tags only; mixing notes move to sound design.
  const cueSheet = rawCueSheet.map((r) => ({
    timestamp: r.timestamp,
    line: scrubForbiddenVocabulary(dedupePhrases(r.line), profile),
    cue: toElevenLabsCue(r.cue),
  }));

  const mixCues = rawCueSheet
    .map((r) => {
      const mix = extractMixDirective(r.cue);
      return mix ? `${r.timestamp} — ${mix}` : null;
    })
    .filter((x): x is string => Boolean(x));

  const negativePrompt = `${profile.imageNegativePrompt}, text, watermark`;

  const archetypeNoun = profile.archetype.toLowerCase().replace(/^the /, "");

  const wardrobeLead = [profile.wardrobe[0], profile.wardrobe[1]]
    .filter(Boolean)
    .join(", ")
    .toLowerCase();
  const lightingLine = scrubForbiddenVocabulary(`${st.vibe.lighting}, palette of ${profile.palette}`, profile);

  // Non-human niches anchor on the actual topic subject, never a human persona.
  const topicSubject = stripArticle(lowTopic) || archetypeNoun;
  const heroSubject = human ? `${subjPrefix}${archetypeNoun}` : topicSubject;
  const animalSkits = niche === ANIMAL_SKIT_NICHE;
  const animalImageOpening =
    animalSkits && pair.length === 2
      ? `A rich ${pair[0]} and a poor ${pair[1]}, both with full expressive animal features, stage a playful side-by-side comedy contrast`
      : heroSubject;
  const imageSubjectLead = animalSkits
    ? animalImageOpening
    : human
      ? `A cinematic scene featuring ${heroSubject} connected to ${lowTopic}`
      : `A complete ${topicSubject} presented as the central subject`;

  // Art direction comes from the niche scaffold so each niche renders in its own medium.
  const styleFlags = profile.imageStyleFlags;

  const leonardoPrompt = stripFormatSpecs(
    buildParagraph(
      [
        `${imageSubjectLead} in ${env}`,
        framing,
        human ? wardrobeLead : "",
        lightingLine,
        `${styleFlags}, negative space at the top third for captions`,
      ],
      100,
    ),
  );

  const midjourneyPrompt = sanitizeMidjourneyPrompt(
    stripFormatSpecs(
      buildParagraph(
        [`${imageSubjectLead}`, `${env2}, ${framing}`, `${styleFlags}, ${profile.palette}`],
        80,
      ),
    ),
    s,
    ar,
    midjourneyNegativeFor(niche),
  );

  const googleFlowPrompt = stripFormatSpecs(
    buildParagraph(
      [
        `${imageSubjectLead} in ${env}`,
        human ? `${framing}, ${(profile.wardrobe[0] ?? "").toLowerCase()}` : framing,
        `camera motion: ${normalizeCameraMove(profile.cameraMotions[0] ?? st.pacing.camera)}`,
        lightingLine,
        styleFlags,
        `no text, no watermark${human ? ", no visible face, no warped hands" : ", no deformed anatomy"}`,
      ],
      100,
    ),
  );

  const masterPrompt = `${stripFormatSpecs(
    buildParagraph(
      [
        `${imageSubjectLead}`,
        framing,
        human ? wardrobeLead : "",
        `environment: ${env}, ${env2}`,
        lightingLine,
        `${styleFlags}, negative space in the top third for captions`,
      ],
      100,
    ),
  )} --ar ${ar}`;

  // Niche-specific camera vocabulary first; generic cinematography as the fallback.
  const shotMotions = profile.cameraMotions.map((motion) => {
    if (!animalSkits || pair.length !== 2) return motion;
    return motion
      .replace("between characters", `from rich ${pair[0]} to poor ${pair[1]}`)
      .replace("on reaction", `on poor ${pair[1]}'s reaction`)
      .replace("rich side", `rich ${pair[0]}'s side`)
      .replace("poor side", `poor ${pair[1]}'s side`);
  });
  const transitions = [
    "Hard cut on beat",
    "Whip-pan blur, 4 frames",
    "Match cut on hand position",
    "Luma dissolve, 8 frames",
    "Cut to black, 6 frames",
    "Speed ramp into cut",
    "Hard cut on silence",
  ];
  const cues = [
    "Subtle parallax on foreground fog; particle drift",
    "Dust motes crossing the key light, 20% opacity",
    "Caption pops in on beat, 120ms scale bounce",
    "Light flicker every 2s, 4% intensity",
    "Depth-of-field rack from background to hands",
    "Slow grain intensification toward the reveal",
    "Vignette closes 8% over the final beat",
  ];
  const subjectActions = human
    ? [
        `faceless ${archetypeNoun} hands working with ${lowTopic}`,
        `faceless ${archetypeNoun} turning toward the ${desc} detail, shoulders only`,
        `close macro on hands adjusting ${lowTopic}`,
        `faceless ${archetypeNoun} stepping forward, head out of frame`,
        `hands lifting the key prop tied to ${lowTopic}`,
      ]
    : [
        `the ${topicSubject} fills frame as its ${desc} detail catches the light`,
        `close macro across the ${desc2} surface of the ${topicSubject}`,
        `the ${topicSubject} shifts into view, ${desc} texture in sharp focus`,
        `dust motes swirl past the ${topicSubject}`,
        `the ${topicSubject} settles centre frame, ${desc2} highlight rolling across it`,
      ];
  const environmentLighting = [env, env2];

  const shotCount = 4;
  const orderedMotions = orderDistinctMotions(shotMotions, s, shotCount);
  const shots = Array.from({ length: shotCount }, (_, i) => {
    const cue = cueSheet[i] ?? cueSheet[cueSheet.length - 1];
    const start = cue?.timestamp ?? "0:00";
    const end = cueEndTime(cueSheet, i);
    const motion = orderedMotions[i] ?? shotMotions[i % shotMotions.length] ?? "Push-in";
    const voLine = cue?.line ?? hooks[0]?.text ?? cleanTopic;
    const storyboardPrompt = `Shot ${String(i + 1).padStart(2, "0")} — ${start}–${end} | VO: '${voLine}' | Motion: ${motion}`;
    return {
      index: i + 1,
      timecode: `${start}–${end}`,
      motion,
      transition: pick(transitions, s, i * 3),
      animationCue: pick(cues, s, i * 5),
      prompt: animalSkits
        ? storyboardPrompt
        : `${storyboardPrompt} | Scene: ${pick(subjectActions, s, i)} in ${pick(environmentLighting, s, i)}, ${st.vibe.lighting}, continuous natural motion, 24fps`,
    };
  });
  const initialVariation = scrubVariation(buildVariationPlan(s, niche, cleanTopic, profile), profile);
  const variation = variationMatchesNiche(initialVariation, profile)
    ? initialVariation
    : scrubVariation(rebuildVariationForNiche(s, niche, cleanTopic, profile), profile);

  return {
    niche,
    topic: cleanTopic,
    seed: s,
    generatedAt: new Date().toISOString(),
    character: {
      archetype: profile.archetype,
      consistencyScore: 88 + (s % 11),
      toneTags: profile.toneTags,
      physicalDescription,
      wardrobe: profile.wardrobe,
      voiceSpec: {
        ...profile.voice,
        "Voice Type": profile.voVoiceType,
        "Emotional Register": profile.voEmotionalRegister,
        "Pace (WPM)": st.pacing.wpm,
      },
      hooks,
      cueSheet,
      retentionBeats: [
        `${cueSheet[0]?.timestamp ?? "0:00"} — ${profile.retentionBeatLabels[0]}: establish ${lowTopic}.`,
        `${cueSheet[2]?.timestamp ?? "0:12"} — ${profile.retentionBeatLabels[1]}: develop the central turn.`,
        `${cueSheet.at(-1)?.timestamp ?? "0:25"} — ${profile.retentionBeatLabels[2]}: land the final moment.`,
      ],
    },
    visual: {
      styleDNA: profile.styleDNA,
      aspectRatio: ar,
      resolution: st.format.resolution,
      model: "Leonardo Phoenix / MJ v6.1",
      stylize: 250,
      chaos: 12,
      seedValue: s,
      negativePrompt,
      masterPrompt,
      leonardoPrompt,
      midjourneyPrompt,
      googleFlowPrompt,
      consistencyToken: tokenFrom(s, cleanTopic),
      negativeLibrary: human
        ? [
            "no visible face, no eye contact, no portrait framing",
            "no text, no watermark, no logo, no UI overlay",
            "no extra fingers, no warped hands, no plastic skin",
          ]
        : [
            "no mutated anatomy, no missing face, no extra limbs",
            "no text, no watermark, no logo, no UI overlay",
            "no melted geometry, no duplicated subject, no plastic sheen",
          ],
    },
    camera: {
      overview: {
        "Total Runtime": `0:${String(shotCount * 7).padStart(2, "0")}`,
        "Shot Count": String(shotCount),
        "Avg Shot Length": st.pacing.avgShotLength,
        "Pacing Profile": `${st.pacing.label} — ${profile.pacing}`,
        "Target Platform":
          st.format.id === "youtube"
            ? `YouTube long-form (${ar})`
            : `TikTok / Shorts / Reels (${ar})`,
      },
      shots,
      rigCheatSheet: [
        `AI video tool: motion strength 3–4 of 10 — anything higher warps the ${human ? "faceless silhouette" : "subject's anatomy"}.`,
        "Render at 24 FPS for film feel, then interpolate to 60 FPS for the platform upload.",
        `Lock camera seed to ${s} across every shot so ${titleCase(desc)} framing stays consistent.`,
      ],
      soundDesign: [
        `Bed track: ${profile.soundDesign.bedTrack}`,
        `SFX: ${profile.soundDesign.sfx.join(", ")}`,
        `Silence: ${profile.soundDesign.silenceCue}`,
        ...mixCues,
      ],
    },
    variation,
  };
}

export function packageToText(pkg: ProductionPackage): string {
  const c = pkg.character;
  const v = pkg.visual;
  const cam = pkg.camera;
  const variation = pkg.variation;
  const div = "\n\n===============================\n\n";
  return [
    `FACELESS STUDIO PRO — PRODUCTION PACKAGE\nNiche: ${pkg.niche}\nTopic: ${pkg.topic}\nSeed: ${pkg.seed}\nGenerated: ${pkg.generatedAt}`,
    `STEP 1 — SCRIPT & VOICEOVER\n\nVOICE & DELIVERY\n${Object.entries(c.voiceSpec)
      .map(([k, val]) => `${k}: ${val}`)
      .join(
        "\n",
      )}\n\nHOOKS\n${c.hooks.map((h) => `${h.label}: ${h.text}`).join("\n")}\n\nVOICEOVER CUE SHEET\n${c.cueSheet
      .map((r) => `${r.timestamp} | ${r.cue} ${r.line}`)
      .join("\n")}\n\nRETENTION BEATS\n${c.retentionBeats.map((b) => `- ${b}`).join("\n")}`,
    `STEP 2 — MASTER IMAGE PROMPT\n\nMASTER PROMPT\n${v.masterPrompt}\n\nNEGATIVE PROMPT\n${v.negativePrompt}`,
    `STEP 3 — VIDEO GENERATION PROMPTS\n${cam.shots
      .map((sh) => `Shot ${String(sh.index).padStart(2, "0")}\n${sh.prompt}`)
      .join("\n\n")}\n\nSOUND DESIGN & MUSIC CUES\n${cam.soundDesign.map((r) => `- ${r}`).join("\n")}`,
    `STEP 4 — VARIATION & ANTI-GENERIC PLAN\n\nCOPY-PASTE PROMPT\n${variation.copyPastePrompt}\n\nHook Style: ${variation.hookStyle}\nStory Structure: ${variation.storyStructure}\nPacing Profile: ${variation.pacingProfile}\nEditing Style: ${variation.editingStyle}\nEmotional Tone: ${variation.emotionalTone}`,
  ].join(div);
}
