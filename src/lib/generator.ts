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
    leonardoPrompt: string;
    midjourneyPrompt: string;
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
    }[];
    rigCheatSheet: string[];
    soundDesign: string[];
  };
}

interface NicheProfile {
  archetype: string;
  toneTags: string[];
  wardrobe: string[];
  voice: {
    voiceType: string;
    wpm: string;
    pitch: string;
    accent: string;
    register: string;
    pause: string;
  };
  styleDNA: string[];
  palette: string;
  environments: string[];
  pacing: string;
  sound: string[];
  hooks: string[];
  descriptors: string[];
}

export const NICHES = [
  "True Crime & Unsolved Mysteries",
  "Stoic Philosophy & Discipline",
  "Wealth, Finance & Passive Income",
  "Dark Psychology & Human Behavior",
  "Ancient History & Lost Civilizations",
  "Space, Science & the Unknown",
  "Stoicism for Entrepreneurs",
  "Survival & Prepper Skills",
  "Luxury Lifestyle & Success Mindset",
  "Health, Longevity & Biohacking",
] as const;

export type Niche = (typeof NICHES)[number];

export const NICHE_PROFILES: Record<string, NicheProfile> = {
  "True Crime & Unsolved Mysteries": {
    archetype: "The Relentless Investigator",
    toneTags: ["Authoritative", "Measured", "Low and Slow"],
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
    styleDNA: ["Cinematic Noir", "Volumetric Fog", "Teal & Orange", "35mm Grain", "Hyper-Detailed"],
    palette: "desaturated teal, sodium-vapour orange, deep ink black",
    environments: [
      "rain-slick evidence room lit by one desk lamp",
      "abandoned highway motel at 3 AM",
      "cork board wall of photographs and pinned string",
    ],
    pacing: "Slow-Burn → Accelerating",
    sound: [
      "Bed track: 68 BPM sub-drone with tape hiss",
      "SFX: single reverb-tailed impact on every reveal",
      "Silence: 1.2s of dead air before the final line",
    ],
    hooks: [
      "Nobody ever explained {topic}.",
      "The truth about {topic} is worse.",
      "They closed the file on {topic} too fast.",
    ],
    descriptors: ["forensic", "unresolved", "documented", "buried"],
  },
  "Stoic Philosophy & Discipline": {
    archetype: "The Silent Discipline Keeper",
    toneTags: ["Calm", "Deliberate", "Unshakeable"],
    wardrobe: [
      "Undyed linen tunic, loosely draped",
      "Leather-bound journal and iron stylus",
      "Simple sandals, cracked from use",
      "Plain marble ring, no ornament",
    ],
    voice: {
      "Voice Type": "Warm male mid-baritone",
      "Pace (WPM)": "118 WPM",
      Pitch: "Even, unhurried",
      Accent: "Neutral transatlantic",
      "Emotional Register": "Composed conviction",
      "Signature Pause": "1.0s after every maxim",
    },
    styleDNA: ["Marble Chiaroscuro", "Golden Hour Shafts", "Muted Stone", "Fine Grain", "Sculptural"],
    palette: "bone white, warm amber, deep umber shadow",
    environments: [
      "colonnaded stone courtyard at dawn",
      "candle-lit study with scrolls and a single window",
      "windswept cliff edge above grey sea",
    ],
    pacing: "Steady → Contemplative",
    sound: [
      "Bed track: 60 BPM strings with slow swell",
      "SFX: distant wind and a single struck bell",
      "Silence: 1.5s hold on the closing maxim",
    ],
    hooks: [
      "Marcus Aurelius would recognise {topic}.",
      "{topic} is a test, not a punishment.",
      "You do not control {topic}. Only your reply.",
    ],
    descriptors: ["disciplined", "enduring", "measured", "unmoved"],
  },
  "Wealth, Finance & Passive Income": {
    archetype: "The Quiet Operator",
    toneTags: ["Confident", "Direct", "Insider"],
    wardrobe: [
      "Tailored navy suit, no tie, cuffs visible",
      "Steel chronograph on the left wrist",
      "Matte black card between two fingers",
      "Leather portfolio, monogram removed",
    ],
    voice: {
      "Voice Type": "Crisp male baritone",
      "Pace (WPM)": "142 WPM",
      Pitch: "Mid, forward-placed",
      Accent: "Neutral North American",
      "Emotional Register": "Assured, faintly amused",
      "Signature Pause": "0.5s before every number",
    },
    styleDNA: ["Executive Minimal", "Glass Reflections", "Cool Steel & Gold", "Shallow Depth", "Ultra Clean"],
    palette: "graphite grey, brushed gold, night-blue glass",
    environments: [
      "glass boardroom above a night skyline",
      "private terminal lounge at pre-dawn",
      "desk of layered documents and one open laptop",
    ],
    pacing: "Punchy → Escalating",
    sound: [
      "Bed track: 92 BPM muted trap percussion",
      "SFX: coin-chime accent on every figure",
      "Silence: 0.8s beat before the payoff number",
    ],
    hooks: [
      "{topic} is not taught in school for a reason.",
      "Rich people already solved {topic}.",
      "You are losing money to {topic} today.",
    ],
    descriptors: ["leveraged", "compounding", "asymmetric", "structural"],
  },
  "Dark Psychology & Human Behavior": {
    archetype: "The Behavioural Analyst",
    toneTags: ["Clinical", "Hypnotic", "Unsettling"],
    wardrobe: [
      "Black roll-neck under a grey blazer",
      "Wire-frame glasses catching the key light",
      "Annotated case notes in red ink",
      "Silver pen tapped once per point",
    ],
    voice: {
      "Voice Type": "Smooth male tenor",
      "Pace (WPM)": "124 WPM",
      Pitch: "Low-mid, close-mic'd",
      Accent: "Neutral British",
      "Emotional Register": "Detached fascination",
      "Signature Pause": "0.7s after each accusation",
    },
    styleDNA: ["Clinical Noir", "Hard Rim Light", "Cold Cyan Wash", "Micro-Contrast", "Surgical Detail"],
    palette: "cold cyan, clinical white, black negative space",
    environments: [
      "observation room behind one-way glass",
      "bare interview table under a single fixture",
      "corridor of identical closed doors",
    ],
    pacing: "Hypnotic → Snapping",
    sound: [
      "Bed track: 74 BPM pulse with heartbeat sub",
      "SFX: reversed cymbal into each turn",
      "Silence: full mute for 1.0s on the reveal",
    ],
    hooks: [
      "{topic} is being used on you right now.",
      "Your brain lies to you about {topic}.",
      "Manipulators love {topic}. Here is why.",
    ],
    descriptors: ["predictive", "subconscious", "conditioned", "exploitable"],
  },
  "Ancient History & Lost Civilizations": {
    archetype: "The Field Archivist",
    toneTags: ["Wondering", "Scholarly", "Cinematic"],
    wardrobe: [
      "Sand-worn canvas field jacket",
      "Leather satchel of rolled site maps",
      "Brass compass and hand lens",
      "Dust-caked boots and wrapped forearms",
    ],
    voice: {
      "Voice Type": "Resonant male baritone",
      "Pace (WPM)": "126 WPM",
      Pitch: "Warm, documentary",
      Accent: "Received Pronunciation",
      "Emotional Register": "Awed restraint",
      "Signature Pause": "0.9s before each date",
    },
    styleDNA: ["Epic Documentary", "Dust Shafts", "Ochre & Sandstone", "Anamorphic Flare", "Weathered Texture"],
    palette: "ochre, sandstone, deep temple shadow",
    environments: [
      "half-buried stone chamber lit by a shaft of sun",
      "desert excavation grid at golden hour",
      "flooded corridor of carved reliefs",
    ],
    pacing: "Expansive → Revealing",
    sound: [
      "Bed track: 64 BPM ethnic percussion and drone",
      "SFX: stone-scrape riser into each cut",
      "Silence: 1.3s under the widest shot",
    ],
    hooks: [
      "{topic} should not exist.",
      "Historians still argue about {topic}.",
      "We found {topic} and stopped digging.",
    ],
    descriptors: ["excavated", "predynastic", "unexplained", "carved"],
  },
  "Space, Science & the Unknown": {
    archetype: "The Deep Field Narrator",
    toneTags: ["Expansive", "Precise", "Reverent"],
    wardrobe: [
      "Charcoal technical shell with taped seams",
      "Gloved hands adjusting a holographic readout",
      "Silhouette against an observation window",
      "Wrist unit glowing faint cyan",
    ],
    voice: {
      "Voice Type": "Airy male baritone",
      "Pace (WPM)": "120 WPM",
      Pitch: "Low, breath-forward",
      Accent: "Neutral North American",
      "Emotional Register": "Quiet awe",
      "Signature Pause": "1.1s on scale reveals",
    },
    styleDNA: ["Hard Sci-Fi Realism", "Volumetric Starlight", "Cyan & Deep Violet", "Lens Bloom", "8K Detail"],
    palette: "void black, plasma cyan, violet nebula bloom",
    environments: [
      "observation deck facing a gas giant",
      "empty control room lit by telemetry screens",
      "surface of an airless moon under hard sun",
    ],
    pacing: "Drifting → Overwhelming",
    sound: [
      "Bed track: 58 BPM ambient pad with sub swell",
      "SFX: telemetry blips on each data point",
      "Silence: 2.0s of vacuum before the scale shot",
    ],
    hooks: [
      "{topic} breaks everything we assumed.",
      "Nothing prepares you for {topic}.",
      "{topic} is closer than you think.",
    ],
    descriptors: ["astronomical", "improbable", "measurable", "silent"],
  },
  "Stoicism for Entrepreneurs": {
    archetype: "The Composed Founder",
    toneTags: ["Grounded", "Tactical", "Unbothered"],
    wardrobe: [
      "Plain black crew tee, no branding",
      "Analogue watch, leather strap",
      "Notebook of hand-written constraints",
      "Single espresso cup, always half-full",
    ],
    voice: {
      "Voice Type": "Dry male mid-range",
      "Pace (WPM)": "134 WPM",
      Pitch: "Level, conversational",
      Accent: "Neutral North American",
      "Emotional Register": "Calm authority",
      "Signature Pause": "0.6s before each rule",
    },
    styleDNA: ["Modern Monastic", "Window Light", "Warm Concrete", "Soft Grain", "Editorial"],
    palette: "warm concrete, off-white, olive shadow",
    environments: [
      "empty office at 5 AM, one lamp on",
      "concrete stairwell with a single window",
      "desk holding only a notebook and a pen",
    ],
    pacing: "Deliberate → Decisive",
    sound: [
      "Bed track: 70 BPM piano and soft kick",
      "SFX: pen click on each rule",
      "Silence: 1.0s before the last instruction",
    ],
    hooks: [
      "{topic} destroys more founders than failure.",
      "Treat {topic} like a system, not a feeling.",
      "Your competitors panic about {topic}.",
    ],
    descriptors: ["controllable", "unemotional", "repeatable", "durable"],
  },
  "Survival & Prepper Skills": {
    archetype: "The Field Operator",
    toneTags: ["Blunt", "Practical", "Urgent"],
    wardrobe: [
      "Weathered olive field coat",
      "Chest rig with fire steel and cord",
      "Gloved hands working a fixed blade",
      "Mud-caked boots and gaiters",
    ],
    voice: {
      "Voice Type": "Gravel male baritone",
      "Pace (WPM)": "138 WPM",
      Pitch: "Low, throat-forward",
      Accent: "Rural North American",
      "Emotional Register": "Controlled urgency",
      "Signature Pause": "0.4s between steps",
    },
    styleDNA: ["Rugged Realism", "Overcast Diffusion", "Olive & Rust", "Heavy Texture", "Documentary Grit"],
    palette: "olive drab, rust orange, wet slate",
    environments: [
      "treeline camp under low cloud and drizzle",
      "gear laid out on a wet tarp",
      "ridge trail at last light",
    ],
    pacing: "Fast → Instructional",
    sound: [
      "Bed track: 88 BPM percussive tension loop",
      "SFX: gear clack and fire-strike on each step",
      "Silence: 0.6s before the survival rule",
    ],
    hooks: [
      "{topic} kills people who prepared wrong.",
      "You have 72 hours to solve {topic}.",
      "Everyone gets {topic} backwards.",
    ],
    descriptors: ["field-tested", "redundant", "load-bearing", "critical"],
  },
  "Luxury Lifestyle & Success Mindset": {
    archetype: "The Unseen Insider",
    toneTags: ["Smooth", "Aspirational", "Selective"],
    wardrobe: [
      "Ivory silk shirt, sleeves rolled once",
      "Gold signet ring catching key light",
      "Keys to something expensive, unbranded",
      "Tailored trousers, no belt",
    ],
    voice: {
      "Voice Type": "Velvet male baritone",
      "Pace (WPM)": "130 WPM",
      Pitch: "Low, intimate",
      Accent: "Neutral European",
      "Emotional Register": "Effortless certainty",
      "Signature Pause": "0.6s before each flex",
    },
    styleDNA: ["Luxe Editorial", "Golden Reflection", "Champagne & Onyx", "Silky Bokeh", "Magazine Finish"],
    palette: "champagne gold, onyx black, marble white",
    environments: [
      "penthouse terrace over a lit skyline",
      "marble corridor with mirrored walls",
      "night garage, one car under a single beam",
    ],
    pacing: "Smooth → Climactic",
    sound: [
      "Bed track: 96 BPM deep house with filtered intro",
      "SFX: glass chime on each cut",
      "Silence: 0.9s before the closing line",
    ],
    hooks: [
      "{topic} separates rich from wealthy.",
      "Nobody flexes {topic}. They just have it.",
      "{topic} is the last thing money buys.",
    ],
    descriptors: ["understated", "exclusive", "compounded", "quiet"],
  },
  "Health, Longevity & Biohacking": {
    archetype: "The Protocol Architect",
    toneTags: ["Evidence-Led", "Focused", "Optimistic"],
    wardrobe: [
      "White technical zip-top, sleeves pushed up",
      "Continuous glucose monitor on the arm",
      "Timed supplement tray in frame",
      "Bare hands preparing a protocol log",
    ],
    voice: {
      "Voice Type": "Bright male mid-range",
      "Pace (WPM)": "136 WPM",
      Pitch: "Mid, energised",
      Accent: "Neutral North American",
      "Emotional Register": "Precise enthusiasm",
      "Signature Pause": "0.5s before each metric",
    },
    styleDNA: ["Clinical Futurism", "Soft Daylight", "Ice White & Mint", "Clean Gradient", "Macro Detail"],
    palette: "ice white, mint green, cool chrome",
    environments: [
      "sunrise lab bench with glassware and data",
      "recovery room with cold plunge steam",
      "macro shot of a supplement protocol tray",
    ],
    pacing: "Brisk → Data-Driven",
    sound: [
      "Bed track: 100 BPM clean electronic pulse",
      "SFX: soft UI blip per metric",
      "Silence: 0.7s before the protocol summary",
    ],
    hooks: [
      "{topic} ages you faster than smoking.",
      "The data on {topic} changed last year.",
      "Fix {topic} in fourteen days.",
    ],
    descriptors: ["measurable", "dose-dependent", "circadian", "reversible"],
  },
};

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
  return arr[(seed + offset) % arr.length];
}

function tokenFrom(seed: number, topic: string): string {
  const base = (slugify(topic).replace(/-/g, "") + "faceless").toUpperCase();
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += base[(seed + i * 7) % base.length];
  }
  return `FSP-CORE-${out}-v1`;
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generatePackage({
  niche,
  topic,
  seed,
}: {
  niche: string;
  topic: string;
  seed?: number;
}): ProductionPackage {
  const profile = NICHE_PROFILES[niche] ?? NICHE_PROFILES[NICHES[0]];
  const s = seed ?? hashSeed(`${niche}::${topic}`);
  const cleanTopic = topic.trim().replace(/\.$/, "");
  const lowTopic = cleanTopic.charAt(0).toLowerCase() + cleanTopic.slice(1);
  const env = pick(profile.environments, s);
  const env2 = pick(profile.environments, s, 1);
  const desc = pick(profile.descriptors, s);
  const desc2 = pick(profile.descriptors, s, 2);

  const physicalDescription = [
    `Faceless figure, shot from behind and at chest height — the face is never visible, always cropped, shadowed, or turned away.`,
    `Silhouette: ${pick(["tall and still", "broad and grounded", "lean and deliberate"], s)}, shoulders squared, head slightly lowered.`,
    `Hands are the hero: close macro on ${pick(["gloved fingers", "bare knuckles", "steady hands"], s, 3)} handling material tied to ${lowTopic}.`,
    `Environment: ${env}; secondary set-up in ${env2}.`,
    `Lighting: single hard key from ${pick(["camera left", "camera right", "behind the subject"], s, 4)}, deep falloff, ${profile.palette}.`,
  ].join("\n");

  const hooks = profile.hooks.map((h, i) => ({
    label: `Hook ${["A", "B", "C"][i]}`,
    text: h.replace("{topic}", lowTopic),
  }));

  const cueSheet = [
    {
      timestamp: "0:00",
      line: hooks[0].text,
      cue: "[cold open, no music, dry close-mic]",
    },
    {
      timestamp: "0:04",
      line: `Everything you were told about ${lowTopic} came from one source.`,
      cue: "[pause 0.5s, drop pitch]",
    },
    {
      timestamp: "0:11",
      line: `Here is what the ${desc} record actually shows.`,
      cue: "[bed track enters, lift energy 10%]",
    },
    {
      timestamp: "0:19",
      line: `Detail one: ${lowTopic} does not behave the way the story requires.`,
      cue: "[accelerate, build tension]",
    },
    {
      timestamp: "0:27",
      line: `Detail two: the timeline only works if someone is lying.`,
      cue: "[clip consonants, forward placement]",
    },
    {
      timestamp: "0:35",
      line: `Which leaves one ${desc2} explanation.`,
      cue: `[${profile.voice["Signature Pause"]}, full stop]`,
    },
    {
      timestamp: "0:41",
      line: `Follow for part two on ${lowTopic}.`,
      cue: "[drop to intimate volume, music out]",
    },
  ];

  const negativePrompt =
    "blurry, lowres, deformed hands, extra fingers, visible face, text, watermark, logo, cartoon, oversaturated";

  const leonardoPrompt = [
    `Cinematic vertical still of a faceless ${profile.archetype.toLowerCase()} in a ${env},`,
    `theme: ${lowTopic}. Face fully obscured by shadow and framing, shot from behind at chest height.`,
    `${profile.wardrobe[0].toLowerCase()}, ${profile.wardrobe[1].toLowerCase()}.`,
    `Palette of ${profile.palette}. ${profile.styleDNA.join(", ")}.`,
    `Single hard key light with deep falloff, atmospheric haze, fine film grain, shallow depth of field,`,
    `photoreal texture on fabric and skin, negative space reserved at the top third for caption text.`,
    `--ar 9:16 --style raw --stylize 250`,
  ].join(" ");

  const midjourneyPrompt = [
    `faceless ${profile.archetype.toLowerCase()} :: ${lowTopic} ::`,
    `${env2}, anonymous silhouette, head cropped out of frame, hands in sharp focus,`,
    `${profile.styleDNA.slice(0, 3).join(", ").toLowerCase()}, ${profile.palette},`,
    `volumetric light shafts, 35mm anamorphic, high micro-contrast, editorial photography`,
    `--ar 9:16 --v 6.1 --stylize 250 --chaos 12 --no text, watermark, extra limbs`,
  ].join(" ");

  const shotMotions = [
    "Slow push-in, 5% scale over 4s",
    "Lateral dolly right, 3% drift with parallax",
    "Static locked-off with 2% breathing zoom",
    "Slow tilt up from hands to shoulders",
    "Handheld micro-shake, 1.5% amplitude",
    "Pull-back reveal, 8% scale over 5s",
    "Orbit left, 6 degrees, subject centred",
  ];
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
  const shotCount = 6 + (s % 2);
  const shots = Array.from({ length: shotCount }, (_, i) => {
    const start = i * 7;
    const end = start + 7;
    const fmt = (n: number) => `0:${String(n).padStart(2, "0")}`;
    return {
      index: i + 1,
      timecode: `${fmt(start)}–${fmt(end)}`,
      motion: pick(shotMotions, s, i),
      transition: pick(transitions, s, i * 3),
      animationCue: pick(cues, s, i * 5),
    };
  });

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
      voiceSpec: profile.voice,
      hooks,
      cueSheet,
      retentionBeats: [
        `0:03 — Open loop: promise the ${desc} detail but withhold it until 0:27.`,
        `0:18 — Pattern interrupt: change shot scale and drop the music bed for one beat.`,
        `0:38 — Cliffhanger: tease part two on ${lowTopic} before the CTA lands.`,
      ],
    },
    visual: {
      styleDNA: profile.styleDNA,
      aspectRatio: "9:16",
      resolution: "1080x1920",
      model: "Leonardo Phoenix / MJ v6.1",
      stylize: 250,
      chaos: 12,
      seedValue: s,
      negativePrompt,
      leonardoPrompt,
      midjourneyPrompt,
      consistencyToken: tokenFrom(s, cleanTopic),
      negativeLibrary: [
        "no visible face, no eye contact, no portrait framing",
        "no text, no watermark, no logo, no UI overlay",
        "no extra fingers, no warped hands, no plastic skin",
      ],
    },
    camera: {
      overview: {
        "Total Runtime": `0:${String(shotCount * 7).padStart(2, "0")}`,
        "Shot Count": String(shotCount),
        "Avg Shot Length": "7.0s",
        "Pacing Profile": profile.pacing,
        "Target Platform": "TikTok / Shorts / Reels (9:16)",
      },
      shots,
      rigCheatSheet: [
        "AI video tool: motion strength 3–4 of 10 — anything higher warps the faceless silhouette.",
        "Render at 24 FPS for film feel, then interpolate to 60 FPS for the platform upload.",
        `Lock camera seed to ${s} across every shot so ${titleCase(desc)} framing stays consistent.`,
      ],
      soundDesign: profile.sound,
    },
  };
}

export function packageToText(pkg: ProductionPackage): string {
  const c = pkg.character;
  const v = pkg.visual;
  const cam = pkg.camera;
  const div = "\n\n===============================\n\n";
  return [
    `FACELESS STUDIO PRO — PRODUCTION PACKAGE\nNiche: ${pkg.niche}\nTopic: ${pkg.topic}\nSeed: ${pkg.seed}\nGenerated: ${pkg.generatedAt}`,
    `CARD 1 — MASTER CHARACTER PROFILE\nArchetype: ${c.archetype}\nTone: ${c.toneTags.join(", ")}\nConsistency Score: ${c.consistencyScore}/100\n\nPHYSICAL DESCRIPTION\n${c.physicalDescription}\n\nWARDROBE & PROPS\n${c.wardrobe.map((w) => `- ${w}`).join("\n")}\n\nVOICE & DELIVERY\n${Object.entries(c.voiceSpec)
      .map(([k, val]) => `${k}: ${val}`)
      .join("\n")}\n\nHOOKS\n${c.hooks.map((h) => `${h.label}: ${h.text}`).join("\n")}\n\nVOICEOVER CUE SHEET\n${c.cueSheet
      .map((r) => `${r.timestamp} | ${r.line} | ${r.cue}`)
      .join("\n")}\n\nRETENTION BEATS\n${c.retentionBeats.map((b) => `- ${b}`).join("\n")}`,
    `CARD 2 — VISUAL STYLE PROMPTS\nStyle DNA: ${v.styleDNA.join(", ")}\nAspect Ratio: ${v.aspectRatio}\nResolution: ${v.resolution}\nModel: ${v.model}\nStylize: ${v.stylize}\nChaos: ${v.chaos}\nSeed: ${v.seedValue}\nNegative Prompt: ${v.negativePrompt}\n\nLEONARDO.AI PROMPT\n${v.leonardoPrompt}\n\nMIDJOURNEY PROMPT\n${v.midjourneyPrompt}\n\nCHARACTER CONSISTENCY TOKEN\n${v.consistencyToken}\n\nNEGATIVE PROMPT LIBRARY\n${v.negativeLibrary.map((n) => `- ${n}`).join("\n")}`,
    `CARD 3 — CAMERA MOTION PLAN\n${Object.entries(cam.overview)
      .map(([k, val]) => `${k}: ${val}`)
      .join("\n")}\n\nSHOT LIST\n${cam.shots
      .map(
        (sh) =>
          `Shot ${String(sh.index).padStart(2, "0")} — ${sh.timecode}\n  Motion: ${sh.motion}\n  Transition: ${sh.transition}\n  Animation Cue: ${sh.animationCue}`,
      )
      .join("\n")}\n\nCAMERA RIG CHEAT SHEET\n${cam.rigCheatSheet.map((r) => `- ${r}`).join("\n")}\n\nSOUND DESIGN LAYER\n${cam.soundDesign.map((r) => `- ${r}`).join("\n")}`,
  ].join(div);
}
