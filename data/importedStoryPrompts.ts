import type { Prompt } from './promptLibrary';

export const IMPORTED_STORY_PROMPTS: Prompt[] = [
  {
    id: '3d-educational-explainer-shorts',
    title: '3D CGI Educational Explainer With Off-Screen Narration',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway'],
    niche: '3D Educational Explainers',
    tips: 'Choose one concept you can demonstrate in two contrasting shots. Generate each shot separately and record the narration before setting the cut points.',
    prompt: `Create an original 9:16 CGI explainer about [TOPIC] for [AUDIENCE]. Work from [VERIFIED NOTES] and flag any claim that needs a source. Use stylized 3D characters with distinct silhouettes, clean sets, expressive gestures, and soft directional light. One off-screen narrator links the action. Keep the characters silent and use their hands, eye lines, and reactions to show what happened.

Build a four-shot sequence of about 25 seconds. Open on the surprising result, then show the ordinary setup in a medium shot. Compare two otherwise identical demonstrations from the same overhead angle so the one changing variable is easy to see. Finish on a close-up that connects the result to an everyday example. For each shot, deliver its duration, narrator line, camera position, and the object or movement that illustrates that line.

Example for condensation: open on a drop forming outside a cold glass, cut to matching cold and room-temperature glasses, hold on the same sections of both surfaces, then return to the cold glass as the narrator explains where the water came from. Make the labels and captions editable in post. Leave clear lower-frame space and let quiet practical sound sit under the narration.`,
  },
  {
    id: 'anime-cooking-montage-ten-seconds',
    title: 'Ten-Second Anime Cooking Montage Prompt',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway'],
    niche: 'Anime Cooking',
    tips: 'Use an original adult cook and one kitchen reference. Treat the timeline as an edit assembled from short clips if your model drops ingredients or steps.',
    prompt: `Create a 9:16 anime cooking montage of [DISH] with an original adult cook described by [CHARACTER REFERENCE]. Keep the cook’s hair, apron, sleeves, and proportions fixed. Match the kitchen light, countertop, tools, bowl, and ingredients throughout. Use hand-painted color, decisive silhouettes, and close-ups of the food’s texture. The cook works silently.

0–1 s: A fridge door opens and the cook collects the ingredients. 1–2 s: Ingredients land on the counter and the seasoning pours into a small bowl. 2–3 s: Cut to a tight prep shot that reads as a single clean movement. 3–5 s: The ingredients hit the pan and the cook stirs. 5–6 s: Hold on bubbling sauce and steam. 6–7 s: Show the glossy finishing sauce from the side. 7–8 s: Reveal the plated dish from overhead. 8–9 s: The cook takes a small taste and smiles. 9–10 s: Hold on the dish at table height in the kitchen light.

Build the sound around the fridge seal, cutting-board taps, pan sizzle, sauce pour, and a ceramic plate touching the table. Keep the finish clean for a title added during editing.`,
  },
  {
    id: 'block-world-emotional-story-shorts',
    title: 'First-Person Block-World Story With an Emotional Payoff',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway'],
    niche: 'Block-World Stories',
    tips: 'Give the recurring object one silhouette and one color. Show it in the setup, the memory, and the payoff so viewers can follow it in fast cuts.',
    prompt: `Make a vertical animated story in an original low-poly block world. Use [WORLD RULE], [NARRATOR], and [RECURRING OBJECT]. Design original square-bodied characters, a distinct skyline, and a small set of reusable locations. Retain clothing colors and hairstyles across shots. Use warmer indoor pools of light for memories and full daylight for the present.

Open with “In this world…” over a wide view of the town and demonstrate the rule in four quick visual examples. Switch to “And I…” and tell the rest in first person. Show a small longing, an object that makes it personal, a flashback that changes what the object means, and a reunion or quiet decision. Close with a line that echoes the opener. For example, in a town where every doorway hums its owner’s favorite tune, a mute brass key turns out to belong to a sibling who has been writing a new melody next door.

Return a 25–35 second voiceover and a cut list. Alternate a street wide, two-shot, POV, insert of the object, and a distinct memory frame. Use one calm narrator and brief natural phrases. Place synchronized captions in the lower middle with enough room for platform controls and keep the music quiet under the voice.`,
  },
  {
    id: 'tagalog-folklore-live-action-b-roll',
    title: 'Tagalog Folklore Horror B-Roll and Voiceover Prompts',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway', 'elevenlabs'],
    niche: 'Tagalog Folklore Horror',
    tips: 'Choose one legend and time each Tagalog line before generation. Reuse a location frame for matching before-and-after shots.',
    prompt: `Create an original fictional Filipino folklore short. Choose one scene below or use [FOLKLORE PREMISE]. Write three 9:16 B-roll shots: an ordinary place, one detail that breaks its pattern, and a final image that reframes it. Use natural location sound and an off-screen Tagalog narrator. Read each sample aloud and adjust rhythm for [TARGET DURATION].

1. White Lady of Balete Drive: On a quiet street inspired by the Manila legend, a taxi passes a woman under a lamp. Her pale sleeve appears in the back-seat reflection. End on the empty seatbelt swinging. Narration: “May babaeng nakaputi sa ilalim ng ilaw. Paglingon ko sa salamin, nasa loob na siya. Pero nang huminto ako, sinturon lang ang gumagalaw.”
2. Kapre: On a barrio path a walker notices two ember-like lights in a balete tree. Smoke catches the moonlight and the branch bends under a large silhouette. Narration: “Akala ko baga lang iyon. Nang yumuko ang sanga, nakita ko kung gaano siya kalaki.”
3. Manananggal: Establish tin roofs and coconut trees. A scratch interrupts the insects, then a winged silhouette crosses a lit curtain. End on a roof panel lifting in the wind. Narration: “May kumaluskos sa bubong. Tapos may aninong may pakpak na dumaan sa bintana. Bumalik iyon nang mamatay ang ilaw.”
4. Haunted school mirror: In a fictional school after closing, an adult caretaker wipes a mirror and sees a uniformed figure. The matching reverse shot shows an empty doorway. End when the condensation clears by itself. Narration: “May nakita akong batang nakauniporme sa salamin. Paglingon ko, wala. Pagharap ko ulit, mas malapit na siya.”
5. Tiyanak: A lantern lights a rainy forest trail as a cry comes from an empty cloth near a root. Leaves rustle overhead and the cry comes from behind the walker. Narration: “Parang sanggol ang umiiyak. Pero wala namang laman ang kumot. Nang tumahimik ang ulan, nasa likod ko na ang iyak.”

Keep the reveals brief and the imagery non-graphic. Layer steps, rain, branch creaks, or an engine idle in post. Leave room for captions and identify the story as folklore fiction when publishing.`,
  },
  {
    id: 'tagalog-teleserye-microdrama-scenes',
    title: 'Five Tagalog Microdrama Scenes for Vertical Shorts',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway', 'elevenlabs'],
    niche: 'Tagalog Microdrama',
    tips: 'Keep the spoken exchange to two lines and give the second performer one silent beat. If the audio fails, record each line separately and cut to hands or objects.',
    prompt: `Stage a 10-second fictional Tagalog microdrama with original adult Filipino characters. Pick [SCENE] and fix [CHARACTER REFERENCES] before generating. Use local ambient sound, conversational Tagalog, and a visible action that gives the dialogue its context. Frame vertically with a shared eyeline and a short reaction hold.

1. Home confrontation. A renter places a familiar key on the kitchen table. “Bakit ibinigay mo sa kanya ang susi?” “Akala ko pumayag ka.” End on the key still between them.
2. Restaurant discovery. A woman recognizes a jacket through a restaurant window and stops at the couple’s table. “So… totoo pala.” “Pakinggan mo muna ako.” Hold as the water glass stops moving in her hand.
3. Mother and daughter. An adult daughter folds a blouse and closes a travel bag. “Anak, huwag kang umalis.” “Kailangan ko na, Ma.” The mother leaves a second blouse on top of the bag.
4. Recognition at the gate. A woman steps out of her car and recognizes the man waiting with an envelope. “Ikaw? Bakit ka nandito?” “May kailangan akong sabihin sa’yo.” She opens the side gate before he can continue.
5. Photograph reveal. A man slides an old photograph across a living-room table during a storm. “Siya ang tatay mo.” “Bakit ngayon mo lang sinabi?” Let the rain fill the last beat as she turns the picture over.

Give the first two seconds to the prop and place, the middle six to the exchange, and the ending to a reaction. Keep mouth movements small and aligned to the recorded lines. Deliver the visual prompt, dialogue, and a version that can be dubbed over reaction shots.`,
  },
  {
    id: 'english-cinematic-microdrama-scenes',
    title: 'English Microdrama Prompts for Ten-Second Scenes',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway', 'elevenlabs'],
    niche: 'English Microdrama',
    tips: 'Play the exchange at normal speaking speed. Keep the revealing object in a consistent position when cutting between the two performers.',
    prompt: `Create one cinematic 9:16 scene with original adult characters from [CHARACTER REFERENCES]. Choose [CONFLICT] or one of these premises. Use a two-shot to establish the relationship, a prop insert where needed, and one final silent reaction. Keep room tone present and genuine pauses between lines.

1. Relationship betrayal, apartment at night. A phone lights up beside two cups. “You said the messages stopped.” “I deleted the thread.” She slides one cup away.
2. Family secret, evening kitchen. A mother unfolds an old photo at the sink. “Why is your father in this picture?” “Look at the date on the back.” Hold on the mother turning it over.
3. Workplace credit, a quiet office after hours. An employee sets down the printed presentation. “Those were my numbers.” “I thought you’d see the draft.” “I saw the announcement.” End on the boss lowering the paper.
4. Unexpected goodbye, a rain-lit train station. “Please stay until morning.” “My train leaves in two minutes.” The partner closes the gap halfway, then stops. Hold on the traveler letting go of their hand.
5. Dinner confession, a small restaurant. “I read the letter.” “Which letter?” “The one you never sent.” The other person puts down their glass without answering.

Output a 10-second shot map and exact dialogue. Frame mouths only for lines that need visible sync and use small gestures on the pauses. Keep clean sound for separately recorded dialogue, captions, and the later edit.`,
  },
  {
    id: 'illustrated-fictional-mystery-short',
    title: 'Illustrated Fictional Mystery Script and B-Roll Prompt',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway'],
    niche: 'Illustrated Mystery',
    tips: 'Put the clue in the first half and revisit it in close-up near the end. If it still fits the first explanation, the twist may need a more specific object.',
    prompt: `Write a clearly fictional 30-second mystery short using [FICTIONAL SETTING] and [CLUE]. Use invented people, places, and organizations. Build 65–75 words of narration around one concrete hook, two observable clues, and a final detail that changes the meaning of the first clue. Example: A closed station prints a ticket to a platform it never had. The punch marks match the holes in the old station clock. The final train can be heard from inside the clock.

After the script, supply five 9:16 B-roll prompts in one illustrated visual style. Use rough ink contours, dusty colors, deep pools of shadow, and restrained movement. Start with a setting detail, move to the object in an insert, show a character reacting in silhouette, connect the two clues in a tracking shot, and end on the unsettling detail. Keep the character’s coat, the object’s shape, and the light direction consistent. Use the footage under external narration and add the fiction label and captions in the edit.`,
  },
  {
    id: 'serialized-fruit-drama-five-parts',
    title: 'Five-Part Fruit Drama Series Prompt',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway'],
    niche: 'Fruit Drama',
    tips: 'Export the last frame and dialogue of each episode into the next generation. Verify the same prop remains in the same hand across an uninterrupted cut.',
    prompt: `Plan a five-part 3D fruit soap opera about [SERIES PREMISE] in [SETTING]. Use [CHARACTER REFERENCES] with a turnaround, voice direction, and one consistent accessory per lead. Example leads: a strawberry organizer with a yellow scarf, a banana partner with a cuffed jacket, and an apple rival with a red satchel. If starting from scratch, lock those references, one setting frame, and the prop scale before making Part 1.

Part 1, apparent betrayal: The strawberry sees the banana hand the apple an envelope. “You promised me you’d tell me first.” End as the apple opens it.
Part 2, missing context: Start on the opened envelope in the same hands. “You don’t know who sent it.” The apple turns it enough to expose a familiar seal.
Part 3, second discovery: A duplicate seal in the strawberry’s bag ties the letter to an earlier promise. “How long have you known?” End on the banana’s hand pausing above the bag.
Part 4, full explanation: Reveal what the banana agreed to and why the apple kept the envelope. Let the strawberry’s choice of whom to address carry the cliffhanger.
Part 5, decision: The strawberry makes a choice that closes the promise. Reuse the envelope for a final reversal and leave room for the others’ reaction.

Deliver a separate 10-second 9:16 generation prompt for each part, with two spoken lines at most, a clear first frame and last frame, and a continuity note listing the lighting, character positions, and location of the prop. Keep the fruit skin textures and color references fixed.`,
  },
  {
    id: 'preschool-gentle-3d-story-prompts',
    title: 'Five Gentle 3D Animation Prompts for Preschool Stories',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway'],
    niche: 'Preschool 3D Animation',
    tips: 'Use one action per shot and keep the goal in frame. Rewatch without sound to check that the reveal still makes sense.',
    prompt: `Create an original vertical 3D preschool story using [SCENARIO] and [CHARACTER REFERENCE]. Use rounded shapes, tactile textures, soft lighting, warm colors, readable facial reactions, and gentle camera movement. Plan three to five shots and a slow, reassuring ending. Keep the character’s outfit and favorite prop consistent. If using narration, write short, concrete lines that match the actions children can see.

1. Lost teddy bear. The child searches the pillow, finds a familiar ribbon by the basket, and discovers Teddy tucked under a folded blanket.
2. The duck’s rainy garden. A child in boots and a duck watch raindrops gather on a leaf, notice a worm at the edge of a puddle, and listen as a frog calls from a garden stone.
3. Clean-up adventure. The child matches blocks, books, and clothes to their places. Reveal a path across the floor as the child puts away the last item.
4. Friendly dinosaur. A curious child meets a little green dinosaur at a prehistoric play garden. A butterfly lands on the dinosaur’s nose while they sort colorful rocks.
5. Bedtime moon. A child turns off the bedside lamp and imagines a slow ride past soft clouds, tiny stars, and a friendly moon. Return to the same room and the same blanket for the last shot.

Return shot descriptions, soft sound cues, and a closing image. Keep the sounds gentle and the backgrounds calm. Leave captions, if needed, for the final edit.`,
  },
  {
    id: 'tagalog-horror-story-idea-generator',
    title: 'Tagalog Horror Story Idea Generator',
    category: 'Niche',
    compatibleModels: [],
    niche: 'Tagalog Folklore Horror',
    tips: 'Pick the idea with the clearest mysterious image and a twist that explains an earlier detail. Draft the full voiceover after choosing the premise.',
    prompt: `Magbigay ng limang orihinal at kathang-isip na ideya para sa Tagalog horror short, gamit ang [SETTING] at [TEMA]. Iba-ibahin ang pinagmumulan ng takot: isang pamahiin, isang maling alaala, isang bagay na bumabalik, isang tunog na nauuna sa pangyayari, at isang kuwentong-bayan. Gumamit ng likhang-isip na mga tauhan at iwasang magpakalat ng paratang tungkol sa totoong tao o lugar.

Sa bawat ideya, ibigay ang pamagat, buod sa dalawa o tatlong pangungusap, isang detalyeng puwedeng ipakita sa unang shot, at ang huling linyang magbabago sa kahulugan ng detalyeng iyon. Panatilihing natural ang Tagalog at kayang ikuwento sa loob ng isang minuto. Halimbawa: May radyo sa isang lumang karinderya na tumatawag sa pangalan ng susunod na customer. Isang gabi, pangalan ng nagsarang tindahan ang binanggit nito.

Ilista ang limang ideya at ihinto roon.`,
  },
  {
    id: 'tagalog-horror-comic-b-roll',
    title: 'Tagalog Horror 2D Comic B-Roll Prompt',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway'],
    niche: 'Tagalog Folklore Horror',
    tips: 'Make a reference sheet for faces, outfits, and common props. A held frame with a changing shadow can carry more suspense than a busy motion prompt.',
    prompt: `Turn [STORY OUTLINE] into six vertical B-roll shots for an original Tagalog horror comic. Build a character guide from [CHARACTER REFERENCE], using small expressive mouths, simple eyes, rough ink contours, muted earth tones, and flat, textured shading. Use a fictional setting with locally familiar details such as a narrow alley, a provincial kitchen, an ukay-ukay stall, or a covered tricycle stop.

Establish the everyday place, show a small change in the background, isolate a prop, cut to a character’s reaction, let a shadow or silhouette disturb the composition, and end on the same place with one visible detail changed. Use slow multiplane pushes, sparse movement, and held expressions. Example: a line of shirts at an empty stall lifts one at a time although the hanging price tags stay still. Reuse the same silhouette, clothes, direction of light, and prop design from frame to frame.

Output only the shot prompts and the shared visual reference. Generate silent B-roll without on-screen words so an external Tagalog narration and optional captions can be added in post.`,
  },
  {
    id: 'mandarin-modern-suspense-microdrama',
    title: 'Mandarin Microdrama Prompts for Modern Suspense',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway', 'elevenlabs'],
    niche: 'Mandarin Suspense Microdrama',
    tips: 'Place characters and moving lights on an off-screen storyboard before generating. Use original or authorized voices for Mandarin dubbing.',
    prompt: `Storyboard a fictional Mandarin-language suspense short about [PREMISE] with original adult characters. Frame vertically for a 10-second edit. Choose one of the visual treatments below, then use three shots: establish the location, register one surprise, finish on a character’s decision. Imply danger with weather, reflections, sound, or a cutaway. Keep physical action off-screen or in a clearly animated composite.

Urban pursuit: At a rooftop, night market, hotel, station, crowded bus, port, or airport, alternate a moving wide and a still detail. Let a figure travel left to right across both frames and build the sense of a chase through echoes and passing silhouettes.
Road or river tension: For a sedan, motorcycle, suspension bridge, desert road, bus intersection, parking garage, or stormy harbor, show the interior reaction and a wide environmental plate. Match the reflected light and wind between shots.
Contained suspense: In an elevator, apartment stairwell, warehouse, restaurant, security room, factory, forest, or service tunnel, hold a door seam or a monitor glow in the foreground. Change one familiar sound when a second presence enters the frame.
Rescue aftermath: At a mountain road, frozen lake, subway, rainy street, rooftop, smoky apartment corridor, or riverside, cut from an environmental clue to responders reuniting two people in a sheltered area. Start with tension and end with relief.

For dialogue, offer one short natural Mandarin line and its English meaning, for example “你也听见了吗？” (“Did you hear it too?”). Time it to the reaction instead of adding narration over a busy frame. Deliver visual prompts, a sound cue list, and an authorized dubbing cue sheet.`,
  },
  {
    id: 'mandarin-period-drama-suspense-staging',
    title: 'Mandarin Period Microdrama With Weather and Standoffs',
    category: 'Video Gen',
    compatibleModels: ['veo-3', 'kling', 'runway', 'elevenlabs'],
    niche: 'Mandarin Suspense Microdrama',
    tips: 'Lock the direction of wind, eyelines, and fabric between cuts. Use a wide shot followed by a close reaction to preserve the geography.',
    prompt: `Create a 10-second vertical period suspense scene set in [FICTIONAL SETTING] with [CHARACTER REFERENCES]. Work with original Mandarin-speaking characters and imagined regional costume details. Choose one dramatic treatment from the list and build it around a decision visible in a look, a held prop, or a change of posture.

A bamboo grove or mountain temple: Mist reveals two people waiting at opposite ends of a stone path. A close-up of wet bamboo interrupts their shared eyeline. A gust lifts both hems in the same direction.
A foggy bridge, old village, snowy pass, arena, or sunset courtyard: A wide shot shows the distance between two rivals. Cut to snow, dust, or falling paper crossing into the gap. End on the second person lowering their gaze and opening a hand.
A palace corridor, a train through open country, or a rider crossing a grassland: Use a lantern reflection, moving window light, or hoofbeats to imply quick movement off-screen. Resolve it on a face held still against a shifting background.
A cliff-side rescue or a train platform departure: Establish the separation in a wide composite and cut to the two figures back together in a sheltered space. Let wind, rain, and wet fabric carry across the transition.

Favor anticipation and reaction shots. Provide one natural Mandarin line, for example “我来晚了吗？” (“Am I too late?”), a plain-language translation, and a timing cue for an original or authorized voice. Use clear screen direction and keep physical impacts off-screen.`,
  },
];
