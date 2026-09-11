/**
 * Per-niche scaffolding: every niche gets its own hook shapes, voiceover cue
 * structure, art-style flags, camera vocabulary and sound bed. This is NOT one
 * template with find-replace — investigative language stays inside the
 * investigative niches only.
 */

export interface CueRow {
  timestamp: string;
  /** Supports {topic} and {lowTopic} placeholders. */
  line: string;
  cue: string;
}

export interface NicheScaffold {
  /** Overrides the profile hooks when present. Supports {topic} / {lowTopic}. */
  hookTemplates: string[];
  voCuePattern: CueRow[];
  /** Art-direction flags injected into every image prompt for this niche. */
  imageStyleFlags: string;
  /** At least four distinct motion patterns unique to the niche. */
  cameraMotionSet: string[];
  soundDesignDefaults: string[];
  /** Narration persona instruction handed to the model. */
  voStyle: string;
}

export function fillTemplate(template: string, topic: string): string {
  const clean = topic.trim();
  const low = clean.charAt(0).toLowerCase() + clean.slice(1);
  return template.replace(/\{topic\}/g, clean).replace(/\{lowTopic\}/g, low);
}

const S = (
  hookTemplates: string[],
  voStyle: string,
  voCuePattern: CueRow[],
  imageStyleFlags: string,
  cameraMotionSet: string[],
  soundDesignDefaults: string[],
): NicheScaffold => ({
  hookTemplates,
  voStyle,
  voCuePattern,
  imageStyleFlags,
  cameraMotionSet,
  soundDesignDefaults,
});

export const NICHE_SCAFFOLDS: Record<string, NicheScaffold> = {
  "AI Cat & Pet Stories": S(
    [
      "Nobody thought this cat could survive {lowTopic}.",
      "This little cat walked straight into {lowTopic}.",
      "{topic} changed everything for one stray.",
    ],
    "Warm storybook narrator, tender and hopeful. Never investigative.",
    [
      { timestamp: "0:00", line: "Nobody expected {lowTopic}.", cue: "[soft]" },
      { timestamp: "0:05", line: "The little one had nothing but courage.", cue: "[pause]" },
      { timestamp: "0:11", line: "Then the storm turned, and so did the story.", cue: "[hushed]" },
      { timestamp: "0:19", line: "One small act, and the whole street noticed.", cue: "[warm]" },
      { timestamp: "0:25", line: "Some heroes really do fit in your hands.", cue: "[drawn out]" },
    ],
    "pixar-grade 3d render, soft rim light, detailed fur pass, warm bloom",
    ["Push-in on the cat's eyes", "Low-angle hero shot", "Tracking shot beside the paws", "Crane shot lifting over the alley"],
    ["Bed track: 74 BPM felt piano", "SFX: paw pads, distant thunder, one close-mic purr", "Silence: 1.0s on the reunion frame"],
  ),
  "AI Animal Cooking": S(
    [
      "This bear cooks {lowTopic} better than most chefs.",
      "Forest kitchen, no words, just {lowTopic}.",
      "Watch a wild animal plate {lowTopic}.",
    ],
    "Low cozy narrator, unhurried food commentary. Never investigative.",
    [
      { timestamp: "0:00", line: "Today the forest kitchen makes {lowTopic}.", cue: "[warm]" },
      { timestamp: "0:06", line: "Everything is chopped slow, by paw.", cue: "[pause]" },
      { timestamp: "0:12", line: "Steam lifts, and the cabin smells like autumn.", cue: "[soft]" },
      { timestamp: "0:19", line: "One taste, and the whole den goes quiet.", cue: "[hushed]" },
      { timestamp: "0:25", line: "Simple food, wild hands, perfect plate.", cue: "[drawn out]" },
    ],
    "hyperreal cgi fur, steam volumetrics, golden kitchen light, macro food detail",
    ["Macro push-in on the pot", "Overhead tilt down onto the board", "Orbit around the plated dish", "Tracking shot along the counter"],
    ["Bed track: 68 BPM acoustic guitar", "SFX: knife on board, simmer, crackling fire", "Silence: 0.8s before the first bite"],
  ),
  "POV Immersive Vlogs": S(
    [
      "POV: you wake up inside {lowTopic}.",
      "You are standing in the middle of {lowTopic}.",
      "First person, no cuts, {lowTopic}.",
    ],
    "Second-person present-tense guide, immersive and grounded.",
    [
      { timestamp: "0:00", line: "POV: you step into {lowTopic}.", cue: "[whisper]" },
      { timestamp: "0:05", line: "Your hands move before your brain catches up.", cue: "[pause]" },
      { timestamp: "0:12", line: "Everything around you is closer than it looked.", cue: "[firm]" },
      { timestamp: "0:19", line: "You turn, and the space opens wide.", cue: "[excited]" },
      { timestamp: "0:25", line: "Stay here one more second before you leave.", cue: "[drawn out]" },
    ],
    "first person pov, 18mm wide lens, natural handheld feel, photoreal",
    ["Handheld push-in", "Pan right across the space", "Tilt down to the hands", "Tracking shot walking forward"],
    ["Bed track: 92 BPM ambient pulse", "SFX: breath, footsteps, room tone", "Silence: 0.6s on the turn"],
  ),
  "Anime Fight Versus": S(
    [
      "{topic} — who actually wins?",
      "This matchup breaks the power scale: {lowTopic}.",
      "Round one starts now: {lowTopic}.",
    ],
    "High-energy shonen narrator, hype commentary. Never investigative.",
    [
      { timestamp: "0:00", line: "{topic}. Round one.", cue: "[excited]" },
      { timestamp: "0:04", line: "Speed says one thing. Power says another.", cue: "[firm]" },
      { timestamp: "0:11", line: "The first clash cracks the ground open.", cue: "[pause]" },
      { timestamp: "0:18", line: "Then comes the move nobody blocks.", cue: "[shouted]" },
      { timestamp: "0:25", line: "Drop your winner before round two.", cue: "[drawn out]" },
    ],
    "cel-shaded anime key art, speed lines, dramatic rim light, high contrast ink",
    ["Snap-zoom on the impact", "Orbit around the clash", "Crane shot rising over the arena", "Whip pan between fighters"],
    ["Bed track: 150 BPM taiko and synth", "SFX: impact booms, sword ring, crowd swell", "Silence: 0.5s before the final blow"],
  ),
  "Stickman Explainer & Skits": S(
    [
      "Stickman explains {lowTopic} in thirty seconds.",
      "Here is {lowTopic}, drawn badly, explained perfectly.",
      "{topic}, but with stick figures.",
    ],
    "Fast, dry, funny explainer voice. Plain words only.",
    [
      { timestamp: "0:00", line: "Here is {lowTopic}, drawn in ten seconds.", cue: "[excited]" },
      { timestamp: "0:05", line: "Step one is simpler than it sounds.", cue: "[pause]" },
      { timestamp: "0:11", line: "Step two is where everyone messes up.", cue: "[firm]" },
      { timestamp: "0:18", line: "Now watch what happens when it works.", cue: "[excited]" },
      { timestamp: "0:25", line: "That is the whole idea. Stick figures win.", cue: "[drawn out]" },
    ],
    "clean whiteboard stickman animation, bold black lines, flat white background",
    ["Snap zoom on the drawing", "Pan right along the sketch", "Push-in on the punchline", "Tilt down to the next panel"],
    ["Bed track: 124 BPM light comedy loop", "SFX: marker squeaks, pop-ins, boing", "Silence: 0.4s before the punchline"],
  ),
  "AI ASMR (Cooking, Cleaning, Restoration)": S(
    [
      "The most satisfying {lowTopic} you will hear today.",
      "Sound on for {lowTopic}.",
      "{topic}, no talking, pure texture.",
    ],
    "Near-whisper ASMR narration, minimal words, long pauses.",
    [
      { timestamp: "0:00", line: "Sound on for {lowTopic}.", cue: "[whisper]" },
      { timestamp: "0:06", line: "Listen to the first layer lift away.", cue: "[pause]" },
      { timestamp: "0:13", line: "Slow, even, perfectly clean.", cue: "[whisper]" },
      { timestamp: "0:20", line: "This part is the reason you stayed.", cue: "[soft]" },
      { timestamp: "0:26", line: "One more pass, and it is finished.", cue: "[drawn out]" },
    ],
    "macro photoreal texture, soft diffused light, shallow depth of field",
    ["Macro push-in on the surface", "Slow tracking shot across the texture", "Tilt down onto the tool", "Orbit around the finished object"],
    ["Bed track: none, texture only", "SFX: binaural scrape, water, crinkle", "Silence: 1.2s on the final reveal"],
  ),
  "Zombie Apocalypse Drama": S(
    [
      "Day one of {lowTopic}.",
      "Nobody made it out of {lowTopic}.",
      "{topic} started quiet.",
    ],
    "Tense survivor narrator, first person, present danger.",
    [
      { timestamp: "0:00", line: "Day one of {lowTopic}.", cue: "[whisper]" },
      { timestamp: "0:05", line: "We locked the doors and counted supplies.", cue: "[firm]" },
      { timestamp: "0:12", line: "Then something outside started moving again.", cue: "[pause]" },
      { timestamp: "0:19", line: "We had one exit and no time.", cue: "[shouted]" },
      { timestamp: "0:26", line: "Whatever happens next, keep quiet.", cue: "[drawn out]" },
    ],
    "gritty photoreal, desaturated grade, volumetric haze, handheld realism",
    ["Handheld tracking shot", "Push-in through the doorway", "Low-angle hero shot", "Crane shot over the ruined street"],
    ["Bed track: 88 BPM low drone", "SFX: distant groans, debris, breath", "Silence: 1.0s before the door moves"],
  ),
  "Bible & Mythology Anime": S(
    [
      "The story of {lowTopic}, told in anime.",
      "Before the fall, there was {lowTopic}.",
      "{topic} — the version they never illustrate.",
    ],
    "Reverent epic narrator, mythic cadence, no modern slang.",
    [
      { timestamp: "0:00", line: "This is the story of {lowTopic}.", cue: "[firm]" },
      { timestamp: "0:06", line: "The sky opened before anyone spoke.", cue: "[pause]" },
      { timestamp: "0:13", line: "What came next was written in fire.", cue: "[hushed]" },
      { timestamp: "0:20", line: "One choice decided everything after it.", cue: "[firm]" },
      { timestamp: "0:26", line: "And the story never truly ended.", cue: "[drawn out]" },
    ],
    "epic anime key art, golden divine light, ornate detail, painterly texture",
    ["Crane shot rising to the sky", "Push-in on the figure", "Orbit around the altar", "Tilt up along the pillar of light"],
    ["Bed track: 70 BPM choir and strings", "SFX: wind, distant horn, low rumble", "Silence: 1.2s on the revelation"],
  ),
  "AI Influencer Product Reviews": S(
    [
      "I tested {lowTopic} so you do not have to.",
      "{topic} is everywhere right now. Is it real?",
      "Three days with {lowTopic}.",
    ],
    "Confident conversational reviewer, honest and specific.",
    [
      { timestamp: "0:00", line: "I tested {lowTopic} for three days.", cue: "[firm]" },
      { timestamp: "0:06", line: "First impression: the build feels better than expected.", cue: "[pause]" },
      { timestamp: "0:12", line: "Here is the part nobody mentions.", cue: "[excited]" },
      { timestamp: "0:19", line: "It fixes one problem and creates another.", cue: "[firm]" },
      { timestamp: "0:26", line: "Worth it, but only for the right person.", cue: "[drawn out]" },
    ],
    "clean studio product photography, soft key light, glossy surfaces, photoreal",
    ["Orbit around the product", "Macro push-in on the detail", "Tilt down onto the desk", "Tracking shot past the packaging"],
    ["Bed track: 105 BPM clean lo-fi", "SFX: unboxing crinkle, click, tap", "Silence: 0.5s before the verdict"],
  ),
  "Lullaby & Sleep Music": S(
    [
      "Fall asleep to {lowTopic}.",
      "{topic}, eight hours, no ads.",
      "Close your eyes for {lowTopic}.",
    ],
    "Extremely soft sleep narrator, slow and few words.",
    [
      { timestamp: "0:00", line: "Close your eyes for {lowTopic}.", cue: "[whisper]" },
      { timestamp: "0:07", line: "Let your shoulders drop.", cue: "[pause]" },
      { timestamp: "0:14", line: "Breathe out slowly, twice.", cue: "[whisper]" },
      { timestamp: "0:21", line: "Nothing here needs your attention.", cue: "[soft]" },
      { timestamp: "0:27", line: "Sleep well.", cue: "[drawn out]" },
    ],
    "dreamy soft illustration, moonlit pastel palette, gentle grain, hazy glow",
    ["Very slow push-in", "Drifting pan left", "Tilt up to the stars", "Slow orbit around the moon"],
    ["Bed track: 52 BPM felt piano and pads", "SFX: rain, distant chimes", "Silence: 2.0s between phrases"],
  ),
  "Analog Horror & Unsolved Mysteries": S(
    [
      "Everything about {lowTopic} came from one source.",
      "{topic} was reported once, then removed.",
      "The tape of {lowTopic} should not exist.",
    ],
    "Investigative, sceptical, evidence-first narration. This is the only niche family allowed to use case-file vocabulary.",
    [
      { timestamp: "0:00", line: "Everything you were told about {lowTopic} came from one source.", cue: "[hushed]" },
      { timestamp: "0:06", line: "Here is what the record actually shows.", cue: "[pause]" },
      { timestamp: "0:13", line: "The timeline only works if someone is lying.", cue: "[firm]" },
      { timestamp: "0:20", line: "One detail was never explained.", cue: "[whisper]" },
      { timestamp: "0:26", line: "Follow for part two.", cue: "[drawn out]" },
    ],
    "vhs analog grain, scanline artifacts, gritty photoreal, cold desaturated grade",
    ["Slow push-in on the document", "Static-glitch pan right", "Tilt down onto the evidence", "Handheld tracking shot down the corridor"],
    ["Bed track: 60 BPM low drone", "SFX: tape hiss, VHS tracking, distant hum", "Silence: 1.5s before the reveal"],
  ),
  "DIY Cardboard & Miniature Builds": S(
    [
      "I built {lowTopic} out of cardboard.",
      "{topic}, made from a single box.",
      "Day one of building {lowTopic}.",
    ],
    "Friendly maker voice, step-by-step, hands-on.",
    [
      { timestamp: "0:00", line: "I built {lowTopic} out of one cardboard box.", cue: "[excited]" },
      { timestamp: "0:06", line: "Every panel is cut by hand.", cue: "[pause]" },
      { timestamp: "0:12", line: "Glue, clamp, wait, repeat.", cue: "[firm]" },
      { timestamp: "0:19", line: "Then the paint changes everything.", cue: "[excited]" },
      { timestamp: "0:26", line: "Cardboard, and it actually works.", cue: "[drawn out]" },
    ],
    "tabletop macro photography, warm workshop light, tactile cardboard texture",
    ["Overhead tilt down onto the build", "Macro push-in on the cut", "Tracking shot across the workbench", "Orbit around the finished model"],
    ["Bed track: 100 BPM upbeat acoustic", "SFX: blade cuts, tape rip, glue squeeze", "Silence: 0.6s on the final reveal"],
  ),
  "Vegetable & Fruit Carving": S(
    [
      "Watch {lowTopic} turn into art.",
      "One knife, one {lowTopic}.",
      "{topic}, carved in thirty seconds.",
    ],
    "Calm craft narrator, precise and quiet.",
    [
      { timestamp: "0:00", line: "One knife and {lowTopic}.", cue: "[soft]" },
      { timestamp: "0:06", line: "The first cut decides the whole shape.", cue: "[pause]" },
      { timestamp: "0:13", line: "Every petal is one clean pass.", cue: "[whisper]" },
      { timestamp: "0:20", line: "Now it opens like a flower.", cue: "[soft]" },
      { timestamp: "0:26", line: "Same vegetable. Completely different thing.", cue: "[drawn out]" },
    ],
    "macro food photography, crisp specular highlights, wet surface detail, photoreal",
    ["Macro push-in on the blade", "Orbit around the carving", "Tilt down onto the board", "Rack-focus tracking shot across the petals"],
    ["Bed track: 80 BPM soft marimba", "SFX: blade slice, juice drip, board tap", "Silence: 1.0s on the finished carving"],
  ),
  "AI Car Wash & Restoration": S(
    [
      "This {lowTopic} has not moved in thirty years.",
      "First wash in decades: {lowTopic}.",
      "{topic}, from barn dust to mirror shine.",
    ],
    "Satisfying restoration narrator, process-focused, no mystery framing.",
    [
      { timestamp: "0:00", line: "First wash in thirty years: {lowTopic}.", cue: "[firm]" },
      { timestamp: "0:06", line: "The foam pulls off layers of dust.", cue: "[pause]" },
      { timestamp: "0:12", line: "Underneath, the paint is still there.", cue: "[excited]" },
      { timestamp: "0:19", line: "One polish pass, and the reflection returns.", cue: "[soft]" },
      { timestamp: "0:26", line: "Nothing replaced. Just cleaned.", cue: "[drawn out]" },
    ],
    "photoreal automotive detail, wet reflective paint, hard specular light, 35mm",
    ["Tracking shot along the body panel", "Macro push-in on the foam", "Low-angle hero shot of the grille", "Orbit around the finished car"],
    ["Bed track: 96 BPM clean groove", "SFX: pressure washer, foam hiss, polisher hum", "Silence: 0.8s on the mirror reflection"],
  ),
  "Miniature ASMR Cooking": S(
    [
      "Tiny kitchen, real {lowTopic}.",
      "{topic}, cooked at one twelfth scale.",
      "Everything here is edible, including {lowTopic}.",
    ],
    "Whisper-soft miniature narrator, few words, high texture focus.",
    [
      { timestamp: "0:00", line: "A tiny kitchen makes {lowTopic}.", cue: "[whisper]" },
      { timestamp: "0:06", line: "The pan is smaller than a coin.", cue: "[pause]" },
      { timestamp: "0:13", line: "Listen to it sizzle.", cue: "[whisper]" },
      { timestamp: "0:20", line: "Plated with tweezers, one piece at a time.", cue: "[soft]" },
      { timestamp: "0:26", line: "Two bites, and it is gone.", cue: "[drawn out]" },
    ],
    "extreme macro miniature photography, tilt-shift depth, warm tiny practical lights",
    ["Extreme macro push-in", "Tilt down onto the mini stove", "Slow orbit around the plate", "Tracking shot along the tiny counter"],
    ["Bed track: none, binaural only", "SFX: micro sizzle, tweezer clicks, tiny pour", "Silence: 1.2s before the first bite"],
  ),
  "Nostalgia Toy Unboxing": S(
    [
      "Sealed since the nineties: {lowTopic}.",
      "{topic}, opened for the first time.",
      "You had this. Admit it: {lowTopic}.",
    ],
    "Warm nostalgic narrator, memory-driven, no suspense framing.",
    [
      { timestamp: "0:00", line: "Still sealed: {lowTopic}.", cue: "[excited]" },
      { timestamp: "0:06", line: "The cardboard smells exactly like the nineties.", cue: "[pause]" },
      { timestamp: "0:12", line: "Everything inside is untouched.", cue: "[soft]" },
      { timestamp: "0:19", line: "The sticker sheet is still complete.", cue: "[excited]" },
      { timestamp: "0:26", line: "Some things were better back then.", cue: "[drawn out]" },
    ],
    "warm nostalgic product photography, soft nineties color grade, gentle film grain",
    ["Macro push-in on the seal", "Overhead tilt down onto the box", "Orbit around the toy", "Tracking shot across the accessories"],
    ["Bed track: 86 BPM warm synth nostalgia", "SFX: plastic crinkle, cardboard tear, click", "Silence: 0.8s on the full reveal"],
  ),
  "Ranking & Top 5 Countdowns": S(
    [
      "Top five {lowTopic}, ranked.",
      "Number one on {lowTopic} will annoy people.",
      "Ranking {lowTopic} from worst to best.",
    ],
    "Punchy list narrator, confident, opinionated. No case-file framing.",
    [
      { timestamp: "0:00", line: "Top five {lowTopic}, ranked.", cue: "[firm]" },
      { timestamp: "0:05", line: "Number five barely made the list.", cue: "[pause]" },
      { timestamp: "0:11", line: "Number three is the one people argue about.", cue: "[excited]" },
      { timestamp: "0:18", line: "Number two almost took the top spot.", cue: "[firm]" },
      { timestamp: "0:25", line: "And number one is not close.", cue: "[drawn out]" },
    ],
    "bold graphic poster style, high contrast, punchy saturated color, clean shapes",
    ["Snap zoom on the rank number", "Slide-in pan right between entries", "Push-in on the winner", "Tilt up to reveal the list"],
    ["Bed track: 128 BPM energetic pulse", "SFX: rank whoosh, counter tick, impact stab", "Silence: 0.5s before number one"],
  ),
  "Vox-Style Paper-Cut Commentary": S(
    [
      "Why {lowTopic} works the way it does.",
      "{topic}, explained with paper and maps.",
      "The hidden system behind {lowTopic}.",
    ],
    "Clear explanatory journalist voice, curious not accusatory.",
    [
      { timestamp: "0:00", line: "Here is why {lowTopic} works the way it does.", cue: "[firm]" },
      { timestamp: "0:06", line: "It starts with one simple decision.", cue: "[pause]" },
      { timestamp: "0:13", line: "That decision spread further than anyone planned.", cue: "[firm]" },
      { timestamp: "0:20", line: "Now the effect shows up everywhere.", cue: "[excited]" },
      { timestamp: "0:26", line: "Once you see it, you cannot unsee it.", cue: "[drawn out]" },
    ],
    "paper-cut collage illustration, layered flat shapes, editorial color palette",
    ["Parallax push-in through paper layers", "Pan right across the map", "Tilt down onto the chart", "Slide-in transition between cut-outs"],
    ["Bed track: 98 BPM bright indie pluck", "SFX: paper slides, stamp, page turn", "Silence: 0.6s before the conclusion"],
  ),
  "Elderly Wisdom & Stoic Long-Form": S(
    [
      "At eighty, you learn this about {lowTopic}.",
      "{topic} teaches you patience or nothing.",
      "What nobody tells you about {lowTopic}.",
    ],
    "Slow, grounded elder narrator, calm authority, no suspense hooks.",
    [
      { timestamp: "0:00", line: "At eighty, you understand {lowTopic} differently.", cue: "[soft]" },
      { timestamp: "0:07", line: "You stop rushing things that need time.", cue: "[pause]" },
      { timestamp: "0:14", line: "You learn which arguments are worth having.", cue: "[firm]" },
      { timestamp: "0:21", line: "And you forgive faster than you used to.", cue: "[soft]" },
      { timestamp: "0:27", line: "That is the whole lesson.", cue: "[drawn out]" },
    ],
    "painterly cinematic portrait light, muted earth palette, soft film grain",
    ["Very slow push-in", "Tilt down to the weathered hands", "Slow orbit around the chair", "Pan left across the window light"],
    ["Bed track: 62 BPM sparse piano", "SFX: clock tick, distant birds, chair creak", "Silence: 1.5s after the lesson"],
  ),
  "AI Music Videos": S(
    [
      "A music video for {lowTopic}.",
      "{topic}, but as a visual album.",
      "Every frame of {lowTopic} moves to the beat.",
    ],
    "Minimal lyrical narration or none; visuals lead.",
    [
      { timestamp: "0:00", line: "This is {lowTopic}, on beat.", cue: "[excited]" },
      { timestamp: "0:06", line: "Every cut lands with the kick.", cue: "[pause]" },
      { timestamp: "0:12", line: "The color shifts with the chorus.", cue: "[firm]" },
      { timestamp: "0:19", line: "Hold here for the drop.", cue: "[excited]" },
      { timestamp: "0:26", line: "Loop it and watch it again.", cue: "[drawn out]" },
    ],
    "stylised music video aesthetic, neon gel lighting, motion blur, high contrast grade",
    ["Beat-synced snap zoom", "Orbit around the performer", "Crane shot rising with the chorus", "Whip pan on the downbeat"],
    ["Bed track: 122 BPM the song itself", "SFX: riser, impact, tape stop", "Silence: 0.4s before the drop"],
  ),
  "Cartoon Horror Illustration": S(
    [
      "A cartoon about {lowTopic} that goes wrong.",
      "{topic}, drawn cute, ending badly.",
      "This children's style story hides {lowTopic}.",
    ],
    "Sing-song storybook voice that slowly turns unsettling.",
    [
      { timestamp: "0:00", line: "Once upon a time, there was {lowTopic}.", cue: "[soft]" },
      { timestamp: "0:06", line: "Everyone smiled, at first.", cue: "[pause]" },
      { timestamp: "0:12", line: "Then the drawings stopped matching the story.", cue: "[whisper]" },
      { timestamp: "0:19", line: "Something in the background kept moving.", cue: "[hushed]" },
      { timestamp: "0:26", line: "The book closes by itself.", cue: "[drawn out]" },
    ],
    "storybook cartoon illustration, flat bold shapes, sickly pastel palette, ink outlines",
    ["Push-in on the smiling character", "Pan right to the background figure", "Tilt up into the dark ceiling", "Slow zoom out revealing the scene"],
    ["Bed track: 66 BPM detuned music box", "SFX: page turn, giggle, low swell", "Silence: 1.4s on the final frame"],
  ),
  "Pixel Game POV": S(
    [
      "POV: you are playing {lowTopic}.",
      "Level one of {lowTopic}.",
      "{topic}, as a retro game.",
    ],
    "Player-perspective gamer narrator, quick and reactive.",
    [
      { timestamp: "0:00", line: "Level one: {lowTopic}.", cue: "[excited]" },
      { timestamp: "0:05", line: "Controls are simple. Surviving is not.", cue: "[firm]" },
      { timestamp: "0:11", line: "One wrong jump and the run resets.", cue: "[pause]" },
      { timestamp: "0:18", line: "Boss room, no checkpoints.", cue: "[shouted]" },
      { timestamp: "0:25", line: "New high score. Run it back.", cue: "[drawn out]" },
    ],
    "16-bit pixel art, crisp dithering, CRT scanline glow, limited palette",
    ["Side-scrolling tracking shot", "Snap zoom on the sprite", "Tilt up to the boss", "Screen-shake push-in on the hit"],
    ["Bed track: 140 BPM chiptune", "SFX: coin, jump blip, game-over sting", "Silence: 0.4s before the boss"],
  ),
  "Celebrity Evolution & Glow-Up": S(
    [
      "{topic}, year by year.",
      "From unknown to everywhere: {lowTopic}.",
      "The glow-up nobody saw coming: {lowTopic}.",
    ],
    "Upbeat pop-culture narrator, timeline of change, never accusatory.",
    [
      { timestamp: "0:00", line: "{topic}, year by year.", cue: "[excited]" },
      { timestamp: "0:05", line: "Early on, nothing looked planned.", cue: "[pause]" },
      { timestamp: "0:11", line: "Then one year changed the whole look.", cue: "[firm]" },
      { timestamp: "0:18", line: "The style locked in, and so did the fame.", cue: "[excited]" },
      { timestamp: "0:25", line: "Same person. Completely new era.", cue: "[drawn out]" },
    ],
    "glossy editorial portrait style, beauty light, clean retouched skin, photoreal",
    ["Morph-transition push-in between years", "Slide-in pan right across portraits", "Orbit around the final look", "Tilt up from shoes to face"],
    ["Bed track: 110 BPM glossy pop", "SFX: camera shutter, whoosh, sparkle", "Silence: 0.5s before the final era"],
  ),
  "Poor vs. Rich Animals (AI Skits)": S(
    [
      "Rich {lowTopic} vs Poor {lowTopic} — guess who eats better.",
      "Rich {lowTopic} vs Poor {lowTopic} — the twist is at the end.",
      "Rich {lowTopic} vs Poor {lowTopic} — same day, two worlds.",
    ],
    "Comedic narrator with character voice swaps between the rich and poor animal. Broad, playful, warm ending. Absolutely no investigative or case-file language.",
    [
      { timestamp: "0:00", line: "Rich {lowTopic} versus poor {lowTopic}.", cue: "[excited]" },
      { timestamp: "0:05", line: "Rich one orders the whole menu. [posh voice]", cue: "[firm]" },
      { timestamp: "0:11", line: "Poor one shares half a crumb. [small voice]", cue: "[soft]" },
      { timestamp: "0:18", line: "Then the rich one drops everything and stares.", cue: "[pause]" },
      { timestamp: "0:25", line: "Turns out the crumb tasted better shared.", cue: "[drawn out]" },
    ],
    "pixar-style 3d cartoon render, expressive animal rig, split-screen warm versus cold grade, punchy comedy lighting",
    [
      "Whip pan between the two characters",
      "Snap zoom on the reaction",
      "Low-angle hero shot of the rich animal",
      "Split-screen slide-in comparing both sides",
      "Push-in on the shared crumb",
    ],
    ["Bed track: 116 BPM comedic orchestral swap", "SFX: cash register on rich cuts, tin clatter on poor cuts", "Silence: 1.0s before the kind ending"],
  ),
};

/** True-crime / investigative vocabulary that must never leak into other niches. */
const TRUE_CRIME_PATTERNS: RegExp[] = [
  /timeline only works/i,
  /\bone source\b/i,
  /\blied\b/i,
  /\bis lying\b/i,
  /part two/i,
  /\bcold case\b/i,
  /\bthe record actually shows\b/i,
];

const INVESTIGATIVE_NICHES = ["Analog Horror & Unsolved Mysteries", "Zombie Apocalypse Drama"];

export function isInvestigativeNiche(niche: string): boolean {
  return INVESTIGATIVE_NICHES.includes(niche);
}

/** True when investigative vocabulary appears in a niche that should not use it. */
export function hasTrueCrimeLeak(text: string, niche: string): boolean {
  if (isInvestigativeNiche(niche)) return false;
  return TRUE_CRIME_PATTERNS.some((re) => re.test(text));
}

export function getScaffold(niche: string): NicheScaffold | undefined {
  return NICHE_SCAFFOLDS[niche];
}
