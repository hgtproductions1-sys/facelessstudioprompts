import type {NicheComparisonMeta} from './nicheComparison';
import type {NicheGuide} from './nicheGuides';
import type {NicheFaq, NichePage, NichePrompt} from './niches';
import type {NicheData} from '../types';

type ImportedNiche = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  difficulty: NichePage['difficulty'];
  format: NicheComparisonMeta['primaryFormat'];
  length: string;
  voice: NicheComparisonMeta['voiceoverType'];
  continuity: NicheComparisonMeta['characterConsistencyNeed'];
  sensitive?: boolean;
  audience: string;
  promise: string;
  angle: NicheGuide['channelAngles'][number];
  ideas: string[];
  example: NichePrompt;
  steps: [string, string, string];
  checks: string[];
  faq: NicheFaq;
  related: [string, string, string];
};

const shorts = 'Shorts (9:16)';
const narration = 'Required (AI or Human)';
const effects = 'None / SFX Only';
const entries: ImportedNiche[] = [
  {
    slug: '3d-educational-explainers', name: '3D Educational Explainers',
    summary: 'Explain one idea at a time with simple 3D demonstrations, verified narration, and a clear visual payoff for the viewer.',
    category: 'Education & Games', difficulty: 'Medium', format: 'Both', length: '30–90s', voice: narration, continuity: 'Medium',
    audience: 'Curious viewers learning a practical concept, sports play, or career task for the first time.',
    promise: 'Use the model to show the cause of a visible change. Choose one mechanism the viewer can describe after a single watch.',
    angle: {title: 'One variable at a time', description: 'Turn common assumptions into paired demonstrations. Use the same scale and camera angle so viewers can see which variable changed.'},
    ideas: ['Why a wide base keeps a tripod steady', 'How an animated baseball double play unfolds', 'What a theatre sound technician checks before a show'],
    example: {title: 'Why a wide base helps', character: 'Which stand tips first when both get the same gentle push?', visual: 'Two identical matte 3D stands on a grid, one with a visibly narrower base, side light and no labels.', camera: 'Lock the side view. Show one identical push per stand and pause on the moment a foot lifts.'},
    steps: ['Write a question the demonstration can answer on screen.', 'Build a comparison with only one meaningful difference.', 'Replay the deciding moment with an editor-added label.'],
    checks: ['Check the explanation against a reliable reference.', 'Compare every visible input before presenting a causal claim.'],
    faq: {question: 'When is a 3D visual worth using?', answer: 'Use 3D when angle, depth, or movement makes something easier to see. An overhead diagram can do the job for a straightforward sports play.'},
    related: ['stickman-explainer-and-skits', '3d-fitness-anatomy', 'factory-documentaries'],
  },
  {
    slug: 'anime-cooking', name: 'Anime Cooking',
    summary: 'Storyboard a short anime cooking montage with original characters, distinct ingredient changes, and sound synced to each action.',
    category: 'Food, Culinary & ASMR', difficulty: 'Medium', format: shorts, length: '8–30s', voice: effects, continuity: 'High',
    audience: 'Viewers who enjoy illustrated food, cozy routines, and quick sensory details.',
    promise: 'Make the food recognizable from prep through plating. Use one change in heat or texture to give the montage a payoff.',
    angle: {title: 'A kitchen with its own rhythm', description: 'Use a recurring cook and counter, then give every new dish a different sound cue, such as a crackle or a tap.'},
    ideas: ['Miso-glazed eggplant at a rainy market stall', 'A quiet breakfast of tamagoyaki and rice'],
    example: {title: 'Eggplant hits the grill', character: 'An original cook in a striped apron brushes glaze across a single row of eggplant slices.', visual: 'Warm cel-shaded market kitchen, deep eggplant purple, amber glaze, rain haze beyond the awning.', camera: 'Hold a close side angle for the first sizzle, then cut to the glaze bubbling in the same row.'},
    steps: ['Draw the kitchen and finished dish as a reference pair.', 'Assign one motion and one cooking sound to each shot.', 'Match the plate to the ingredients shown at the start.'],
    checks: ['Verify consistent knife, pan, and portion sizes.', 'Keep the cast and kitchen design original.'],
    faq: {question: 'Can a cooking montage work without narration?', answer: 'Yes. Make each ingredient change legible, keep the shot order clear, and let the sounds mark the steps.'},
    related: ['miniature-asmr-cooking', 'ai-animal-cooking', 'preschool-3d-animation'],
  },
  {
    slug: 'block-world-stories', name: 'Block-World Stories',
    summary: 'Tell original short stories in a block-built world, with a readable environment, a recurring cast, and visible choices that change the scene.',
    category: 'Animated Stories', difficulty: 'Medium', format: shorts, length: '30–60s', voice: 'Optional', continuity: 'High',
    audience: 'Short-form viewers drawn to playful geometric worlds and small, emotional character choices.',
    promise: 'Make the setting part of the story. Let the character move, build, or share something visible to solve the problem.',
    angle: {title: 'One neighborhood, many small problems', description: 'Return to a few recognizable landmarks and let small changes to the set accumulate across the series.'},
    ideas: ['A lantern keeper rebuilds a ferry landing before dark', 'Two neighbors carry tiles across a flooded garden'],
    example: {title: 'The missing step', character: 'A lantern keeper with a square canvas satchel notices one missing tile between the landing and the ferry.', visual: 'Original block-built harbor with asymmetrical wooden shapes, warm terracotta roofs, and blue-green water.', camera: 'Hold at dock level. The figure picks up a loose tile and slides it into the obvious gap.'},
    steps: ['Sketch the map and a small original cast.', 'Open with the obstacle and let the viewer see the attempt.', 'End by showing what changed in the world.'],
    checks: ['Maintain a stable visual grid across angles.', 'Create your own textures, silhouettes, sounds, and interface art.'],
    faq: {question: 'How do I make the setting feel original?', answer: 'Choose a distinctive architecture, color palette, and rule for how objects behave. Build your own landmarks and character shapes.'},
    related: ['pixel-game-pov', 'diy-cardboard-and-miniature-builds', 'fruit-drama'],
  },
  {
    slug: 'tagalog-folklore-horror', name: 'Tagalog Folklore Horror',
    summary: 'Write a fictional Tagalog horror short using a local setting, a single unsettling detail, and an original twist that works in narration.',
    category: 'Horror & Mystery', difficulty: 'Medium', format: shorts, length: '45–90s', voice: narration, continuity: 'Medium', sensitive: true,
    audience: 'Tagalog-speaking viewers who enjoy folklore-inspired suspense and illustrated or live-action storytelling.',
    promise: 'Give the narrator one ordinary thing to notice twice. On the second pass, change a detail that makes the first scene feel different.',
    angle: {title: 'Mga kuwentong naririnig sa biyahe', description: 'Use a familiar journey, like a late jeepney ride, and make a mundane route detail part of the ending.'},
    ideas: ['Bakit bukas na naman ang bintana?', 'May ilaw sa lumang hintayan kahit putol ang kuryente'],
    example: {title: 'Ang ilaw sa hintayan', character: 'Sabi ni Lola, huwag kang lilingon kapag namatay ang ilaw. Pero sa salamin ng traysikel, may nakaupo pa rin.', visual: 'Empty rural waiting shed at dusk, one amber bulb, rain on a tricycle mirror, original illustrated suspense frame.', camera: 'Hold on the shed until the bulb goes dark, then cut to the small reflection in the mirror.'},
    steps: ['Write the first clue in natural spoken Tagalog.', 'Repeat it later with one concrete difference.', 'Leave room for a beat of silence after the last line.'],
    checks: ['Label the story as fiction.', 'When drawing on folklore, verify details and avoid attributing invented customs to a real community.'],
    faq: {question: 'Do I need to show the creature?', answer: 'A light, shadow, repeated sound, or a character reaction can carry the reveal. Save the close shot for the clue the ending depends on.'},
    related: ['cartoon-horror-illustration', 'analog-horror-and-unsolved-mysteries', 'vertical-microdrama'],
  },
  {
    slug: 'vertical-microdrama', name: 'Vertical Microdrama',
    summary: 'Write a vertical microdrama with one turning point, actor-ready dialogue, and continuity cues for Tagalog, English, or Mandarin scenes.',
    category: 'Animated Stories', difficulty: 'Hard', format: shorts, length: '30–90s', voice: narration, continuity: 'High', sensitive: true,
    audience: 'Creators and viewers who enjoy compact teleserye, suspense, or relationship scenes.',
    promise: 'Build each short around one choice. Give the audience enough time to register the decision and the other character’s reaction.',
    angle: {title: 'A turn in one room', description: 'Build standalone scenes around a prop that changes hands. Film a wide master for geography and close shots for the reactions.'},
    ideas: ['A misdelivered envelope changes a promise', 'A late train leaves two rivals with one spare ticket'],
    example: {title: 'The returned key', character: '“Sa ’yo pa rin ang susi.” Wait for the other actor to set down their bag before the reply.', visual: 'Two original characters separated by a narrow kitchen counter, with an old brass key centered between them.', camera: 'Hold the two-shot through the line. Cut to the key only after the listener looks down.'},
    steps: ['Give each character a different goal in the scene.', 'Write dialogue short enough to leave space for reactions.', 'Match eyelines and prop placement before editing the turn.'],
    checks: ['Have a fluent speaker check idiom and emotional register when localizing.', 'Use original dialogue and clear performers for any synthetic voices.'],
    faq: {question: 'Can I adapt the same scene into several languages?', answer: 'Start with one original scene. Adjust idioms, address terms, and line length to sound natural in each language while preserving the turning point.'},
    related: ['tagalog-folklore-horror', 'original-clipping-and-dubbing', 'fruit-drama'],
  },
  {
    slug: 'fruit-drama', name: 'Fruit Drama',
    summary: 'Plan a serialized fruit comedy with original characters, consistent peel markings, readable visual gags, and a payoff in each part.',
    category: 'Animated Stories', difficulty: 'Medium', format: shorts, length: '15–45s per part', voice: 'Optional', continuity: 'High',
    audience: 'Short-form comedy viewers who like expressive objects, recurring rivals, and small cliffhangers.',
    promise: 'Use a recognizable fruit shape, a simple personality, and a physical problem viewers can understand before anyone speaks.',
    angle: {title: 'A market-stall ensemble', description: 'Build episodes around an opening-time problem that lets different fruit characters take the lead.'},
    ideas: ['A pear and a plum fight over the last market stall', 'A lemon detective follows a trail of mint leaves'],
    example: {title: 'The squeaky stall', character: 'A proud pear with one leaf shaped like a comma tries to keep a crooked shelf level.', visual: 'Soft 3D market set, yellow awning, a squat purple plum and a tall green pear with clear silhouettes.', camera: 'The shelf leans one more degree as the plum adds a basket. Hold for the pear’s reaction.'},
    steps: ['Give each fruit a shape and a fixed visual detail.', 'Write a five-part arc with one resolved beat in every episode.', 'Repeat one prop so the next part feels like a continuation.'],
    checks: ['Check color and proportions through different lighting.', 'Make each short understandable when watched on its own.'],
    faq: {question: 'What belongs at the end of each part?', answer: 'Finish one small action, then open one clear question. Let the end frame show the new problem without needing a title card.'},
    related: ['ai-cat-and-pet-stories', 'poor-vs-rich-animals-ai-skits', 'vertical-microdrama'],
  },
  {
    slug: 'preschool-3d-animation', name: 'Preschool 3D Animation',
    summary: 'Create a gentle preschool 3D story with a small choice, reassuring pacing, and simple actions that young viewers can follow.',
    category: 'Animated Stories', difficulty: 'Hard', format: 'Both', length: '45s–3 min', voice: 'Optional', continuity: 'High', sensitive: true,
    audience: 'Families looking for gentle animated stories about everyday experiences.',
    promise: 'Follow one character through one familiar problem. Give children time to notice a clue before the character acts.',
    angle: {title: 'One phrase children can say along', description: 'Use a recurring phrase such as ‘Can I have a turn?’ and show a different everyday situation where it fits.'},
    ideas: ['A shy kite asks a friend for help', 'Two rabbits take turns with the big blue shovel'],
    example: {title: 'The blue shovel', character: '“You can use it when my hole is done.” After a short pause, the second rabbit nods.', visual: 'Round original rabbit characters by a shallow sandbox with one blue shovel and a wide clear background.', camera: 'Static medium shot for the exchange, then cut wide when both characters start working together.'},
    steps: ['State the problem in one short sentence.', 'Show one patient, safe response.', 'Repeat the action or phrase once to give the story a clear ending.'],
    checks: ['Review sound volume and flashing or rapid changes.', 'Set the audience designation required by the platform for child-directed material.'],
    faq: {question: 'How can I support young viewers following the story?', answer: 'Use few characters, keep props prominent, repeat important words, and let the scene pause after each new action.'},
    related: ['ai-cat-and-pet-stories', 'lullaby-and-sleep-music', '3d-educational-explainers'],
  },
  {
    slug: 'factory-documentaries', name: 'Factory Documentaries',
    summary: 'Plan a faceless factory documentary that follows a verified production process from raw materials through inspection and packing.',
    category: 'Documentary, Commentary & Analysis', difficulty: 'Hard', format: 'Both', length: '60s–8 min', voice: narration, continuity: 'Low', sensitive: true,
    audience: 'Process-video viewers curious about how an ordinary object is made.',
    promise: 'Give the material a continuous journey. Each station should change its shape, surface, or readiness for the next step.',
    angle: {title: 'Follow one object through the shop', description: 'Anchor the edit to a single object or batch so viewers can compare it before and after each visible station.'},
    ideas: ['From blank sheets to a sewn notebook', 'How a ceramic mug goes from mold to packed carton'],
    example: {title: 'Fold and stitch', character: 'The sheets are folded into sections before the stitching joins them along the spine.', visual: 'Verified notebook making sequence, neutral workbench, folded paper sections and equipment shown from a safe marked filming position.', camera: 'Match-cut from a folded paper edge to the same edge on the finished stack. Keep movement out of the machine envelope.'},
    steps: ['Verify the actual production order with a reliable source.', 'Pair each verified stage with one clear material change.', 'Label any generated scene as a reconstruction and add narration.'],
    checks: ['Check your filming permissions and safety expectations at the location.', 'Confirm machine terms, sequence, and other factual claims before recording.'],
    faq: {question: 'How much of a factory process should I show in a Short?', answer: 'Pick one transformation and use the setup and result to orient the viewer. Save inspection, packing, and extra stations for a longer version.'},
    related: ['3d-educational-explainers', 'diy-cardboard-and-miniature-builds', 'ai-car-wash-and-restoration'],
  },
  {
    slug: '3d-fitness-anatomy', name: '3D Fitness Anatomy',
    summary: 'Storyboard a short anatomy visualization around one movement with verified joint positions, clear overlays, and controlled pacing.',
    category: 'Education & Games', difficulty: 'Hard', format: shorts, length: '20–60s', voice: 'Optional', continuity: 'High', sensitive: true,
    audience: 'Fitness and anatomy learners who want to see how one movement looks from a clear angle.',
    promise: 'Show one repeatable movement and explain what the camera reveals. Keep any labeling within what you can verify.',
    angle: {title: 'One movement from two angles', description: 'Show the same action from the side and front when each view answers a different question. Match timing and body position.'},
    ideas: ['Compare start and finish of an unloaded elbow bend', 'Show how the shoulder blade moves during a gentle reach'],
    example: {title: 'One elbow bend', character: 'Follow the angle between upper arm and forearm through one slow repetition.', visual: 'Neutral anatomical mannequin with a plain joint overlay, side view, full arm in frame, no embedded labels.', camera: 'Lock the side angle. Hold the starting position, animate one smooth bend, and freeze on the final angle.'},
    steps: ['Choose one movement and check it with an anatomy reference.', 'Lock the camera and mark start and end positions.', 'Add only the labels you can verify in the edit.'],
    checks: ['Check the geometry against a qualified reference.', 'Present generated imagery as an illustration and avoid prescribing exercise or treatment.'],
    faq: {question: 'Should I trust generated muscle labels?', answer: 'Use a reviewable reference and add the labels yourself. A polished render can still place a highlight on the wrong structure.'},
    related: ['3d-educational-explainers', 'stickman-explainer-and-skits', 'factory-documentaries'],
  },
  {
    slug: 'horoscope-shorts', name: 'Horoscope Shorts',
    summary: 'Make an entertainment horoscope short with cohesive zodiac visuals, one reflective question, and language that leaves viewers free to decide.',
    category: 'Reflection & Devotion', difficulty: 'Easy', format: shorts, length: '15–45s', voice: 'Optional', continuity: 'Low',
    audience: 'Viewers who enjoy zodiac visuals and reflective writing as entertainment.',
    promise: 'Give each sign a dramatic visual motif and one open-ended question. Keep the writing grounded in everyday choices.',
    angle: {title: 'A constellation and a question', description: 'Pair one original sign motif with a small decision viewers can consider in their own context.'},
    ideas: ['A Taurus reflection on practicing a craft', 'A Libra reflection on choosing which task to finish first'],
    example: {title: 'One unfinished page', character: 'What small thing would you finish today if you gave it your full attention for ten minutes?', visual: 'An original illustrated bull-shaped constellation reflected in ink on a cream notebook page.', camera: 'Slow top-down push toward the reflection. Leave space above the page for the editor’s title.'},
    steps: ['Choose a sign and a small relatable theme.', 'Write a reflection the viewer can consider on their own terms.', 'Give the visual and the spoken question time to land.'],
    checks: ['Frame the segment as entertainment.', 'Keep health, money, and legal decisions out of the horoscope.'],
    faq: {question: 'What is a good alternative to a prediction?', answer: 'Ask about a concrete experience or choice. A question about a habit can give viewers something to reflect on without promising an outcome.'},
    related: ['daily-prayer-shorts', 'elderly-wisdom-and-stoic-long-form', 'lullaby-and-sleep-music'],
  },
  {
    slug: 'visual-quiz-shorts', name: 'Visual Quiz Shorts',
    summary: 'Make logo guessing rounds or printed quiz videos with a fair clue, a clear answer reveal, and enough time for the viewer to play.',
    category: 'Education & Games', difficulty: 'Easy', format: shorts, length: '15–60s', voice: 'Optional', continuity: 'Low',
    audience: 'Viewers who enjoy guessing games, short trivia rounds, and timed worksheet questions.',
    promise: 'Set a consistent rhythm from clue to reveal. The viewer should know what counts as an answer before the timer starts.',
    angle: {title: 'A fair three-round ladder', description: 'Start with an obvious clue, make the second round a little harder, and explain the distinction behind the last reveal.'},
    ideas: ['Guess the fictional bakery from its three symbols', 'Choose which capital city is above the equator'],
    example: {title: 'The printed answer reveal', character: 'Which answer is above the equator? Give viewers five seconds after they have read all three options.', visual: 'Locked overhead view of a printed multiple-choice worksheet, black ink on matte white paper with a free margin.', camera: 'Hold while the viewer reads. Bring a blue pen into frame and place one tick next to the verified answer.'},
    steps: ['Check the answer and build fair distractors.', 'Allow enough time to read the whole clue.', 'Reveal the answer with a cue that works with sound muted.'],
    checks: ['Use original symbols or marks cleared for use.', 'Read the quiz on a phone at normal size before recording.'],
    faq: {question: 'How long should the quiz timer be?', answer: 'Time yourself reading the clue and options from a phone, then allow a separate pause for the answer. Try five seconds for one short clue.'},
    related: ['ranking-and-top-5-countdowns', '3d-educational-explainers', 'nostalgia-toy-unboxing'],
  },
  {
    slug: 'daily-prayer-shorts', name: 'Daily Prayer Shorts',
    summary: 'Prepare a short daily prayer with natural spoken pacing, room for quiet reflection, and gentle visuals or instrumental backing.',
    category: 'Reflection & Devotion', difficulty: 'Easy', format: 'Both', length: '30–90s', voice: narration, continuity: 'Low',
    audience: 'Listeners looking for a short devotional practice or a calm moment in their day.',
    promise: 'Write a prayer that fits a specific moment, such as the start of a shift or the end of a difficult day. Let each phrase finish before the next one begins.',
    angle: {title: 'A prayer for one ordinary moment', description: 'Build a series around moments like starting a shift, waiting for news, or sitting down for a meal.'},
    ideas: ['A morning prayer before a long commute', 'A quiet prayer of gratitude after making it home'],
    example: {title: 'Before the day begins', character: 'God, give me the patience to listen closely today. [Pause briefly.] Help me notice who could use a kind word.', visual: 'Warm early light on a kitchen window, a plain mug and soft steam in a quiet frame.', camera: 'Hold a steady medium shot as the steam rises. Keep room tone just audible beneath the prayer.'},
    steps: ['Pick one ordinary moment to anchor the prayer.', 'Read the draft aloud and mark natural pauses.', 'Mix a quiet music bed or leave space for room tone.'],
    checks: ['Use an original prayer or attribute a cleared quotation.', 'Check every spoken word on a small speaker at a low volume.'],
    faq: {question: 'Can the same instrumental support a prayer series?', answer: 'Yes. Use a track you can reuse and keep the backing level consistent. Give each prayer a distinct occasion and opening line.'},
    related: ['bible-and-mythology-anime', 'lullaby-and-sleep-music', 'horoscope-shorts'],
  },
  {
    slug: 'scripted-podcast-clips', name: 'Scripted Podcast Clips',
    summary: 'Script an original podcast clip with a short exchange, distinct speakers, and a clear edit plan for captions and reaction shots.',
    category: 'Documentary, Commentary & Analysis', difficulty: 'Medium', format: shorts, length: '20–60s', voice: narration, continuity: 'Medium', sensitive: true,
    audience: 'Viewers interested in compact conversations about a specific creator decision or topic.',
    promise: 'Build a short exchange around one real question. Give the second speaker a concrete observation the first speaker can react to.',
    angle: {title: 'One question and one useful example', description: 'Use a recurring pair of speakers who bring different experiences. Center each short on something the audience can try or observe.'},
    ideas: ['Why a product demo should show one stressful use case', 'Two producers compare a close sound recording to room ambience'],
    example: {title: 'One useful sound comparison', character: 'Host: “Why record the paper twice?” Guest: “The close mic catches the tear. The room mic tells you where it happened.”', visual: 'Two cleared performers at opposite sides of a table, with a paper sample and two distinctly positioned microphones.', camera: 'Hold on the guest for the full answer. Cut to a single insert of the paper before returning for a reaction.'},
    steps: ['Write one question and a short answer grounded in an example.', 'Record each speaker to a separate track.', 'Cut on changes in thought and check captions against the voices.'],
    checks: ['Obtain approval for the voices or use original authorized voices.', 'Identify fictional scripted speakers in the clip presentation.'],
    faq: {question: 'What makes a podcast clip work on its own?', answer: 'Put the subject in the opening line and include enough of the answer to deliver a complete point. Leave any sponsor or longer-show message for the end.'},
    related: ['original-clipping-and-dubbing', 'ranking-and-top-5-countdowns', 'ai-influencer-product-reviews'],
  },
  {
    slug: 'underwater-wildlife-explainers', name: 'Underwater Wildlife Explainers',
    summary: 'Plan an underwater wildlife explainer with species references, believable motion, and clear labels for any generated reconstruction.',
    category: 'Pets, Animals & Character Lore', difficulty: 'Hard', format: 'Both', length: '30s–3 min', voice: 'Optional', continuity: 'Medium', sensitive: true,
    audience: 'Nature viewers who want to learn how a marine animal moves or fits into its habitat.',
    promise: 'Make one observable trait the center of the episode. Establish where the scene takes place and which parts are a reconstruction.',
    angle: {title: 'A field guide in motion', description: 'Choose a feature a viewer could spot on a real dive, then give it a close shot before widening to the habitat.'},
    ideas: ['How a cuttlefish hovers near a seagrass bed', 'Recognizing a ray by how it moves along the sand'],
    example: {title: 'A cuttlefish at the edge of seagrass', character: 'Watch the thin fins along the sides of the body as the animal holds its place.', visual: 'Cuttlefish and seagrass based on verified species references, suspended particles, realistic muted contrast at depth.', camera: 'Hold a side view long enough to see the small fin waves. Leave a lower corner open for an AI reconstruction label.'},
    steps: ['Verify one trait and the habitat where it can be seen.', 'Build close and wide frames around the same species reference.', 'Add sourcing and clarify reconstructed scenes in the edit.'],
    checks: ['Confirm fin, limb, and eye placement at full size.', 'Identify the source of licensed footage and the status of generated scenes.'],
    faq: {question: 'Can I mix reconstructed visuals and real footage?', answer: 'Yes. Label the reconstructed section clearly and keep the source record and license information for each real clip.'},
    related: ['3d-educational-explainers', 'ai-cat-and-pet-stories', 'pov-immersive-vlogs'],
  },
  {
    slug: 'original-clipping-and-dubbing', name: 'Original Clipping & Dubbing',
    summary: 'Edit owned or licensed footage into clear standalone clips, and prepare a timed translation sheet for an authorized dub or voice track.',
    category: 'Documentary, Commentary & Analysis', difficulty: 'Medium', format: 'Both', length: '20–90s', voice: 'Optional', continuity: 'Low', sensitive: true,
    audience: 'Creators repurposing their own interviews, demonstrations, gameplay, or original drama for a new audience.',
    promise: 'Preserve the meaning of the source when shortening or translating it. Give the finished excerpt one point a viewer can follow without the original.',
    angle: {title: 'The excerpt and the context', description: 'Use a short original introduction to explain where the source clip came from and why the moment matters.'},
    ideas: ['Make a standalone clip from an original repair interview', 'Dub a scene you produced into conversational Tagalog'],
    example: {title: 'The line and its reaction', character: '“Sandali. Bakit nandito pa ’yung susi?” Record a pause before the reply so the question fits the picture.', visual: 'Use a cleared source frame. Place a neutral subtitle sample within the vertical crop, outside the speaker’s face.', camera: 'Preview the crop across the full line. Hold the original listener reaction before cutting to the next caption.'},
    steps: ['Log source rights and select a complete thought or scene beat.', 'Preserve a timestamped copy of the original dialogue.', 'Review the shortened or translated version against the original.'],
    checks: ['Confirm edits, translations, music, and performer voices are covered by the relevant permissions.', 'Check for missing context at the beginning and end of the clip.'],
    faq: {question: 'How do I check whether a dub fits?', answer: 'Play the edit with a scratch read and mark where lines collide with reactions, pauses, or effects. Ask a fluent speaker to check the finished language.'},
    related: ['scripted-podcast-clips', 'vertical-microdrama', 'ranking-and-top-5-countdowns'],
  },
];

const difficulty: Record<NichePage['difficulty'], {
  studio: NicheData['difficulty'];
  effort: NicheComparisonMeta['estimatedEffort'];
  score: NicheComparisonMeta['beginnerFriendlyScore'];
}> = {
  Easy: {studio: 'Beginner', effort: 'Low (1–2h)', score: 3},
  Medium: {studio: 'Intermediate', effort: 'Medium (2–5h)', score: 2},
  Hard: {studio: 'Advanced', effort: 'High (5h+)', score: 1},
};

export const IMPORTED_NICHE_PAGES: NichePage[] = entries.map(entry => ({
  slug: entry.slug,
  name: entry.name,
  niche: entry.name,
  shortSummary: entry.summary,
  seoTitle: `${entry.name} Prompts & Video Playbook`,
  metaDescription: entry.summary,
  h1: entry.name,
  primaryKeyword: `${entry.name.toLowerCase()} prompts`,
  secondaryKeywords: [],
  difficulty: entry.difficulty,
  intro: entry.promise,
  prompts: [entry.example],
  faqs: [entry.faq],
  relatedSlugs: entry.related,
}));

export const IMPORTED_NICHE_STUDIO: NicheData[] = entries.map(entry => ({
  id: entry.slug,
  slug: entry.slug,
  title: entry.name,
  category: entry.category,
  competition: 'Medium',
  difficulty: difficulty[entry.difficulty].studio,
  avgVideoLength: entry.length,
  audienceDemographic: entry.audience,
  description: entry.promise,
  visualAesthetic: entry.example.visual,
  colorGrade: 'Use consistent tones across shots and keep the main subject legible.',
  soundscape: entry.voice === effects ? 'Record and sync one distinct sound per action.' : 'Keep speech clear over quiet room tone or a cleared music bed.',
  sampleHook: '{topic}. Here’s where it starts.',
  viralConcepts: [],
  promptFormula: entry.example.visual,
  recommendedStack: {script: 'Script editor', voice: entry.voice === effects ? 'Foley recorder' : 'Microphone or authorized voice', visual: 'Camera, illustrator, or video generator', edit: 'Video editor'},
  bestFormat: `${entry.format} · ${entry.length}`,
}));

export const IMPORTED_NICHE_GUIDES: Record<string, NicheGuide> = Object.fromEntries(entries.map(entry => [entry.slug, {
  searchSummary: entry.summary,
  audience: entry.audience,
  promise: entry.promise,
  bestFormats: [entry.format, entry.length],
  channelAngles: [entry.angle],
  videoIdeas: entry.ideas,
  episodeStructure: entry.steps.map((description, index) => ({title: ['Plan the opening', 'Build the middle', 'Finish the episode'][index], description})),
  qualityChecks: entry.checks,
}]));

export const IMPORTED_NICHE_COMPARISON: Record<string, NicheComparisonMeta> = Object.fromEntries(entries.map(entry => [entry.slug, {
  primaryFormat: entry.format,
  typicalVideoLength: entry.length,
  estimatedEffort: difficulty[entry.difficulty].effort,
  voiceoverType: entry.voice,
  characterConsistencyNeed: entry.continuity,
  policyDisclosureSensitivity: entry.sensitive ? 'Elevated (Synthetic / Sensitive)' : 'Standard',
  beginnerFriendlyScore: difficulty[entry.difficulty].score,
}]));
