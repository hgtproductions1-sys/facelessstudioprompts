import type {Prompt, PromptModel} from './promptLibrary';

type HubModel = Extract<PromptModel, 'veo-3' | 'kling' | 'midjourney'>;

export type ModelHub = {
  slug: HubModel;
  label: string;
  title: string;
  description: string;
  intro: string;
  sections: {heading: string; paragraphs: string[]}[];
  example: {label: string; text: string};
  failures: {heading: string; symptom: string; fix: string}[];
  sources: {label: string; href: string}[];
};

export const modelHubs: readonly ModelHub[] = [
  {
    slug: 'veo-3',
    label: 'Veo 3 prompts',
    title: 'Veo 3 Prompts for Faceless Videos',
    description: 'Write Veo 3 prompts with one visible action, specific framing, and synchronized sound. Adapt editable templates for narrated scenes, POV, and more.',
    intro: 'Use these Veo 3 prompts for faceless video scenes where the picture and sound tell the same story. Start with a single beat. Describe what the viewer sees at the beginning, the physical change during the shot, and the image you need at the cut.',
    sections: [
      {
        heading: 'Describe a shot the viewer can follow',
        paragraphs: [
          'Put the subject and action early. An unlabeled paper parcel sliding under a doorway gives the camera a clear job. Specify who moves what, where the action happens, and which side of the frame the object enters from. Then add a framing choice such as a side-on close-up and a camera choice such as locked off. Leave incidental movement to the environment unless it helps the viewer read the action.',
          'Google’s prompt guide demonstrates writing about subject, scene, action and camera, with additional direction for the lighting or atmosphere. Use those categories to write the shot you can picture. For a low shot of a parcel at dusk, describe the thin sliver of light below the door and the damp concrete around it. Set output length and aspect ratio in the interface or API controls your version exposes.',
        ],
      },
      {
        heading: 'Write the sound as part of the event',
        paragraphs: [
          'Give an audible event an observable cause. Paper scuffs the floor only as the parcel moves. After the hand withdraws, the room returns to a quiet refrigerator hum. For a simple object scene, start with one foreground sound and a low background layer. You will hear more clearly whether the timing works, and the editor has space for narration later.',
          'If someone speaks on screen, assign a short line to a single identifiable speaker and give that speaker time to finish. Keep voice direction specific, such as a low voice speaking evenly from behind the doorway. Verify the actual recording before using exact words, especially names or translated dialogue. For a factual voiceover or music bed, plan a separate audio track and review it against the generated picture.',
        ],
      },
      {
        heading: 'Carry the visual thread across the edit',
        paragraphs: [
          'Write down three features viewers can recognize between clips. The parcel has folded brown edges, a blue string and a small torn corner. A cloudy hallway remains cool toned from shot to shot. When your chosen Veo surface supports a starting image or another reference mechanism, start from the approved frame and describe how the scene should move. Keep the reference file, prompt and model version together in the production notes.',
          'Cut the result where a viewer can read what happened. For the parcel sequence, hold the last still frame briefly before switching to the recipient’s close-up. If the same detail changes between shots, regenerate the one clip where it matters or choose a tighter insert that keeps the approved reference visible.',
        ],
      },
    ],
    example: {
      label: 'Sample direction for one scene',
      text: 'Locked side-on close-up at floor level. Blue dusk falls on a closed apartment door. A brown paper parcel with blue string slides slowly underneath. It stops against a pale floor seam with both folded edges visible. Audio: paper scrapes across concrete while it moves, followed by a quiet indoor hum.',
    },
    failures: [
      {
        heading: 'The sound competes with the focal action',
        symptom: 'A dense music bed can bury the paper scrape that tells the viewer the object moved.',
        fix: 'Specify the scrape and the hum first. Add music on a separate track after the edit if the scene needs it.',
      },
      {
        heading: 'A line arrives before the speaker is readable',
        symptom: 'A moving camera and two speakers can obscure the start of a line.',
        fix: 'Hold one shot on the speaker, use a short utterance, and move the reply to a separate shot.',
      },
      {
        heading: 'A generated label becomes an accidental claim',
        symptom: 'An address or warning on the parcel may look plausible but show the wrong words.',
        fix: 'Request unmarked paper and add the reviewed label yourself in the editor.',
      },
    ],
    sources: [
      {label: 'Google DeepMind Veo 3 prompt guide', href: 'https://deepmind.google/models/veo/prompt-guide/'},
      {label: 'Google Cloud video generation prompt guide', href: 'https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/video-gen-prompt-guide'},
    ],
  },
  {
    slug: 'kling',
    label: 'Kling prompts',
    title: 'Kling AI Prompts for Faceless Video Scenes',
    description: 'Adapt editable Kling AI prompts for image-to-video motion, clear camera moves, and stable props. Learn to repair drifting subjects and crowded action.',
    intro: 'Use Kling to turn an approved frame into a short scene with a clear path of motion. The most useful instruction tells the model which part of the frame should move, what stays fixed, and how the viewer will know the action is done.',
    sections: [
      {
        heading: 'Choose the starting frame before describing motion',
        paragraphs: [
          'A strong image-to-video input already establishes identity, light and composition. For a top-down craft demonstration, place the paper square near the middle, show the hand entering from one edge, and keep the relevant fold readable. Use the prompt to describe the fold direction and where the fingers leave the frame. Repeating a different lighting or camera angle in the text can create competing instructions.',
          'Kling’s Video 3.0 guide documents text-to-video, image-to-video and start and end frames. Available options depend on the model and input mode. Where end-frame control is available, prepare a matching composition with the subject in its finished position. Match prop scale, tabletop marks and light direction across the references so motion connects two states of the same scene.',
        ],
      },
      {
        heading: 'Separate subject motion from camera motion',
        paragraphs: [
          'Describe the subject trajectory in ordinary language the editor can check. A wooden token slides from lower left to the center and stops flush with a pencil line. The overhead camera stays fixed. For a moving camera, describe the camera move in its own sentence and name the reference surface or subject it travels past. A gentle push toward a still token is a different shot from the token itself traveling toward the lens.',
          'Name the parts that must hold through the movement. The cut edge stays sharp, the hand touches the object only once and the surrounding tools remain still. Start with a short clip and inspect frames near the beginning, the point of contact and the end. If testing Video 3.0 sound or multi-shot features, check the current model guide. On a single physical action, you can isolate motion more easily with a single shot.',
        ],
      },
      {
        heading: 'Keep reference elements consistent between shots',
        paragraphs: [
          'Use clean, rights-cleared references if your selected Kling mode supports reference elements. For a recurring object, record its finish, relative scale and most recognizable edge or mark. Use the approved reference for the next clip. Save the prompt and the chosen frame with the source in your edit folder so a collaborator can reproduce the setup.',
          'Plan the join in the edit before adding a second movement. A close insert of the folded corner often belongs after a brief hold on the overhead frame. If the next shot reveals the result, leave enough space around the result to crop for your final layout without cutting off the contact point or shifting the apparent direction of motion.',
        ],
      },
    ],
    example: {
      label: 'Sample image-to-video direction',
      text: 'Use the supplied top-down craft frame. The right hand enters from the bottom, lifts the lower corner of the yellow paper and folds it precisely to the center mark, then leaves frame. The tabletop and ruler stay fixed, with steady window light. Hold the finished crease for the last beat. Fixed overhead camera.',
    },
    failures: [
      {
        heading: 'The camera follows a hand it should observe',
        symptom: 'A tracking move can hide the exact point where the paper meets the mark.',
        fix: 'Use one locked camera instruction and keep both the hand and mark visible in the reference frame.',
      },
      {
        heading: 'The prop changes shape during contact',
        symptom: 'The object crumples or loses an edge before the intended change is complete.',
        fix: 'Reduce the action to one contact, describe the visible edge, and use a matching end frame if available.',
      },
      {
        heading: 'The clip adds a second shot during a demonstration',
        symptom: 'An extra angle interrupts an action that needs a continuous view.',
        fix: 'Use single-shot mode where available. Generate the close insert separately and add it in the edit.',
      },
    ],
    sources: [
      {label: 'Kling VIDEO 3.0 model guide', href: 'https://kling.ai/quickstart/klingai-video-3-model-user-guide'},
      {label: 'Kling image-to-video feature guide', href: 'https://kling.ai/feature/image-to-video'},
    ],
  },
  {
    slug: 'midjourney',
    label: 'Midjourney prompts',
    title: 'Midjourney Prompts for Faceless Video Assets',
    description: 'Adapt Midjourney prompts for thumbnails, keyframes and original character references. Learn framing, aspect ratio, style references and common fixes.',
    intro: 'Use Midjourney to create still assets for faceless videos. Decide whether the image is a storyboard frame, a thumbnail, a character reference, or an opening frame for animation. Each has a different job. Give the most space to the object or action the viewer needs to recognize.',
    sections: [
      {
        heading: 'Describe the image in visual terms',
        paragraphs: [
          'Midjourney’s Prompt Basics guide recommends short, specific descriptions. A good thumbnail brief names one subject, one readable visual relationship, and the background work the frame needs to do. For an overhead article cover, describe a seed tray on the left, one bright new leaf, and open space on the right. Add the title in your editor so you can control spelling, type size and placement.',
          'For an opening still that will become a motion clip, describe the exact state at the first frame. A hand has reached the table edge, the seed tray is still closed, and the soil remains level. Save the selected still separately. When animating it later, the motion brief can describe the hand lifting the lid and the camera holding long enough to see the first leaf.',
        ],
      },
      {
        heading: 'Set aspect ratio and visual style deliberately',
        paragraphs: [
          'Put documented Midjourney parameters at the end of the prompt, after the visual description. Use --ar 16:9 for a landscape thumbnail draft or --ar 9:16 for a vertical opening frame. The aspect ratio controls the shape of the image. Check the actual pixel dimensions separately, then crop or export to the delivery size your platform requires.',
          'Treat stylize as a separate layer of direction. Compare two values using the same subject, composition and aspect ratio. If a reference establishes a warm editorial palette, Midjourney’s Style Reference feature can guide the visual treatment where that feature is supported. Keep the reference type explicit. A style treatment steers the look, while the subject description still needs the physical details that identify the character or object.',
        ],
      },
      {
        heading: 'Make a reviewable set of frames',
        paragraphs: [
          'Generate the most important frame individually and use it to check composition in the actual layout. A thumbnail should stay legible at phone size. A character sheet should show proportions clearly enough to compare key details across angles. If a grid crowds the frames or changes the same character from panel to panel, generate the views separately and arrange the approved images in your editor.',
          'Keep display choices repeatable across a series. Record the margin for text, the baseline palette, the direction of light and the model version. Keep those choices steady for the next draft so you can test a new subject or crop without also changing the entire look. Verify each visual and its sources before using it to represent a real person or product.',
        ],
      },
    ],
    example: {
      label: 'Sample thumbnail still direction',
      text: 'Editorial overhead photograph, open seed tray on the left, a single bright green leaf in a paper pot as the focal point, charcoal worktop, soft window light from upper left, quiet empty space on the right for typography --ar 16:9',
    },
    failures: [
      {
        heading: 'The crop cuts off the main subject',
        symptom: 'A good square draft can lose the leaf or the text area in a vertical frame.',
        fix: 'Generate at the intended aspect ratio and ask for the subject slightly inside the frame edge.',
      },
      {
        heading: 'The treatment overwhelms the reference',
        symptom: 'Decorative details make the seed tray harder to read.',
        fix: 'Reduce stylize or simplify the reference treatment. Keep the subject, lens description and framing constant while you compare.',
      },
      {
        heading: 'Labels look readable until the final export',
        symptom: 'Several tiny words or a complex diagram can come back distorted.',
        fix: 'Request a clean plate with reserved space. Add verified typography and diagram labels in the editor.',
      },
    ],
    sources: [
      {label: 'Midjourney Prompt Basics', href: 'https://docs.midjourney.com/hc/en-us/articles/32023408776205-Prompt-Basics'},
      {label: 'Midjourney Aspect Ratio', href: 'https://docs.midjourney.com/hc/en-us/articles/31894244298125-Aspect-Ratio'},
      {label: 'Midjourney Stylize', href: 'https://docs.midjourney.com/hc/en-us/articles/32196176868109-Stylize'},
      {label: 'Midjourney Style Reference', href: 'https://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference'},
    ],
  },
];

export function getModelHub(slug: string) {
  return modelHubs.find(hub => hub.slug === slug);
}

export function getModelHubPrompts(hub: ModelHub, prompts: readonly Prompt[]) {
  return prompts.filter(prompt => prompt.compatibleModels.includes(hub.slug));
}
