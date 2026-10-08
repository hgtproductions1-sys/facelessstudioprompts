export const VIDEO_CATEGORIES=['Planning','Images & characters','Video prompts','Voice & editing','Publishing'] as const;
export type VideoLesson={
  slug:string;id:string;title:string;originalTitle:string;creator:string;creatorUrl:string;
  uploaded:string|null;category:typeof VIDEO_CATEGORIES[number];level:'Beginner'|'Intermediate';
  description:string;takeaway:string;exercise:string;prompt:string;guide:string;
  relatedGuides?:string[];practiceTips:string[];studioTopic?:string;note?:string;
  resourceUrl:string;resourceLabel:string;
};

export const VIDEOS:VideoLesson[]=[
  {
    "slug": "creating-in-google-flow",
    "id": "9nVEfjmDlVk",
    "title": "Creating in Flow: a practical introduction",
    "originalTitle": "Creating in Flow | How to use Google’s new AI Filmmaking Tool",
    "creator": "Google",
    "creatorUrl": "https://www.youtube.com/@Google",
    "uploaded": "2025-05-20",
    "category": "Video prompts",
    "level": "Beginner",
    "description": "Google introduces clips, scenes, and stories in Flow. Watch the official tutorial, then plan a short scene with our editable prompts.",
    "takeaway": "Start with a clear subject, keep reference details consistent, and build the story one scene at a time.",
    "exercise": "Write a three-scene story about a kitten finding shelter. Keep the kitten’s fur, scarf, and proportions identical in each scene.",
    "prompt": "A small orange tabby kitten with a dark teal scarf pauses outside a warmly lit bakery on a rainy evening. The kitten looks up at the window. Slow low-angle push-in; golden reflections on wet cobblestones; one continuous shot.",
    "guide": "consistent-ai-characters",
    "relatedGuides": [
      "write-ai-video-prompts"
    ],
    "practiceTips": [
      "Write the character’s fixed details before planning the shots.",
      "Change one action or camera instruction at a time.",
      "Check each draft for costume, scale, and location continuity."
    ],
    "studioTopic": "A tiny cat finds shelter in a midnight bakery",
    "resourceUrl": "https://flow.google/",
    "resourceLabel": "Visit Google Flow"
  },
  {
    "slug": "introducing-google-flow",
    "id": "A0VttaLy4sU",
    "title": "Meet Flow: from idea to a visual story",
    "originalTitle": "Introducing Flow | Google’s New AI Filmmaking Tool",
    "creator": "Google",
    "creatorUrl": "https://www.youtube.com/@Google",
    "uploaded": "2025-05-20",
    "category": "Video prompts",
    "level": "Beginner",
    "description": "Google’s official Flow introduction offers a starting point for AI filmmaking. Pair it with a manageable three-shot storyboard.",
    "takeaway": "Treat the video tool as one part of a production workflow built from deliberate shots.",
    "exercise": "Pick one original premise. Write the opening image, one meaningful change, and the final image before generating any media.",
    "prompt": "Plan a three-shot, 20-second fictional scene. Premise: a tiny robot discovers a greenhouse on an abandoned space station. For each shot, describe one action, one camera movement, the lighting, and the end state. Keep the robot’s design consistent.",
    "guide": "faceless-content-workflow",
    "practiceTips": [
      "Keep the pilot short enough to review in one sitting.",
      "Give every shot a purpose in the story.",
      "Choose the final image before filling in extra details."
    ],
    "studioTopic": "A tiny robot discovers a greenhouse on an abandoned space station",
    "resourceUrl": "https://flow.google/",
    "resourceLabel": "Visit Google Flow"
  },
  {
    "slug": "runway-character-references",
    "id": "lfiASPH1lvE",
    "title": "Keep characters consistent with Runway References",
    "originalTitle": "Gen-4 References | Runway Academy",
    "creator": "Runway",
    "creatorUrl": "https://www.youtube.com/@RunwayML",
    "uploaded": null,
    "category": "Images & characters",
    "level": "Beginner",
    "description": "Runway Academy demonstrates using reference images to carry a character or location into new compositions. Practice a three-view character brief.",
    "takeaway": "A stable reference image gives you a clearer starting point than rewriting a character description for every scene.",
    "exercise": "Plan three views of the same small explorer robot. Keep its body shape, backpack, colors, and eye design fixed while changing the framing.",
    "prompt": "Use the same reference character in three separately generated images: front view, three-quarter view, and side view. Character: a small cream explorer robot with a dark teal backpack, amber eyes, and an orange shoulder stripe. Keep all design details identical. Plain warm studio background; consistent lighting and scale.",
    "guide": "consistent-ai-characters",
    "practiceTips": [
      "Pick one clear reference before exploring new compositions.",
      "Keep the costume and color palette fixed.",
      "Compare the three views side by side and record any drift."
    ],
    "studioTopic": "A small explorer robot discovers an overgrown greenhouse",
    "resourceUrl": "https://academy.runwayml.com/tutorial/gen-4-references",
    "resourceLabel": "Open the official Runway Academy lesson"
  },
  {
    "slug": "adobe-image-prompt-structure",
    "id": "1gu5jS9kGB8",
    "title": "Give image prompts a clear visual structure",
    "originalTitle": "Structuring Text to Image Prompts | Prompting for Generative AI | Adobe",
    "creator": "Adobe",
    "creatorUrl": "https://www.youtube.com/@Adobe",
    "uploaded": "2026-03-27",
    "category": "Images & characters",
    "level": "Beginner",
    "description": "Adobe’s image-prompting lesson introduces subject, action, lighting, and style as useful visual direction. Try a controlled still-life comparison.",
    "takeaway": "A specific subject and a deliberate visual treatment make a prompt easier to evaluate and refine.",
    "exercise": "Write two image prompts for the same paper crane. Keep the subject and composition fixed; change only the lighting to compare the results.",
    "prompt": "Editorial still life: a cream folded paper crane beside a clear glass vase with one green leaf on a dark teal plinth. Three-quarter view; uncluttered background; visible paper grain and glass reflections. Version A: soft window light. Version B: a warm directional spotlight with deeper shadows. Generate the versions separately.",
    "guide": "write-ai-image-prompts",
    "practiceTips": [
      "Name the focal subject before adding style words.",
      "Describe the materials and framing in concrete terms.",
      "Change one visual variable so the comparison teaches you something."
    ],
    "resourceUrl": "https://www.youtube.com/watch?v=1gu5jS9kGB8",
    "resourceLabel": "Open Adobe’s original lesson"
  },
  {
    "slug": "google-flow-beginner-workflow",
    "id": "bAUHPkjRmAE",
    "title": "Build a small project in Google Flow",
    "originalTitle": "How To Use Google Flow For Beginners (Step-By-Step Guide)",
    "creator": "Paul J Lipsky",
    "creatorUrl": "https://www.youtube.com/@PaulJLipsky",
    "uploaded": "2026-06-05",
    "category": "Video prompts",
    "level": "Beginner",
    "description": "A creator’s step-by-step Flow walkthrough follows images, moving clips, and connected scenes. Use it alongside a simple shot-by-shot production brief.",
    "takeaway": "Break the project into small scenes so you can review the visuals and continuity before assembling the story.",
    "exercise": "Make a three-shot plan about a paper boat crossing a miniature town. Give each shot one action and a clear end state.",
    "prompt": "Create three separate five-second shot briefs for a fictional miniature town. Shot 1: a red paper boat enters a shallow puddle. Shot 2: the boat passes beneath a small stone bridge. Shot 3: the boat settles beside a glowing lantern. Preserve boat shape, scale, wet cobblestones, and golden evening light. Use one deliberate camera move per shot.",
    "guide": "write-ai-video-prompts",
    "relatedGuides": [
      "faceless-content-workflow"
    ],
    "practiceTips": [
      "Write each clip’s beginning and end before generating it.",
      "Keep the location and subject details consistent.",
      "Review the clips together before adding extra shots."
    ],
    "studioTopic": "A red paper boat crosses a lantern-lit miniature town",
    "note": "The creator discloses sponsorship and affiliate links in the original video.",
    "resourceUrl": "https://flow.google/",
    "resourceLabel": "Check Google Flow’s current product information"
  },
  {
    "slug": "elevenlabs-natural-voiceovers",
    "id": "Vs6vJwmJL0Y",
    "title": "Shape a more natural voiceover",
    "originalTitle": "How to make AI Voiceovers that sound Human (2025 ElevenLabs Text to Speech Tutorial)",
    "creator": "ElevenLabs",
    "creatorUrl": "https://www.youtube.com/@elevenlabs",
    "uploaded": "2025-07-20",
    "category": "Voice & editing",
    "level": "Beginner",
    "description": "ElevenLabs introduces voice selection and delivery for narration. Practice a short script with purposeful pauses and a clear emotional direction.",
    "takeaway": "Choose the voice and delivery for the story, then review the narration before placing it into the edit.",
    "exercise": "Write a 30-second narration about a robot finding its first living plant. Make one version curious and another reassuring; compare the pacing.",
    "prompt": "Write a 60–70 word voiceover for a fictional short about a tiny robot discovering a living plant inside an abandoned greenhouse. Use short, clear sentences. Mark two natural pauses. Create a curious version and a reassuring version. Keep the events identical and avoid imitating any real person’s voice.",
    "guide": "faceless-content-workflow",
    "practiceTips": [
      "Choose a voice you have permission to use.",
      "Listen to the complete narration before exporting it.",
      "Check that pauses and emphasis support the cut rather than slowing every sentence."
    ],
    "studioTopic": "A tiny robot discovers its first living plant",
    "resourceUrl": "https://elevenlabs.io/docs/overview/capabilities/text-to-speech",
    "resourceLabel": "Check current ElevenLabs text-to-speech documentation"
  },
  {
    "slug": "runway-3d-scene-references",
    "id": "bAk-ZAoRoTA",
    "title": "Art-direct a scene with prepared references",
    "originalTitle": "Using 3D Assets in Gen-4 References | Runway Academy",
    "creator": "Runway",
    "creatorUrl": "https://www.youtube.com/@RunwayML",
    "uploaded": "2025-05-08",
    "category": "Images & characters",
    "level": "Intermediate",
    "description": "Runway Academy uses a prepared 3D composition to guide generated imagery. Apply the idea to a scene whose layout you want to control deliberately.",
    "takeaway": "A prepared reference can express composition more clearly than adding a longer list of adjectives.",
    "exercise": "Sketch a small greenhouse scene with one robot, one plant, and a single window. Keep that layout fixed while testing two visual treatments.",
    "prompt": "Preserve the composition of the supplied layout reference: one small robot on the left, a single potted plant at center, and a tall greenhouse window on the right. Keep the camera angle and relative scale fixed. Create a warm handcrafted storybook treatment, then a restrained cinematic treatment. Generate each version separately.",
    "guide": "avoid-generic-ai-videos",
    "relatedGuides": [
      "consistent-ai-characters"
    ],
    "practiceTips": [
      "Make a simple layout before committing to detailed art.",
      "Keep subject placement stable during style comparisons.",
      "Use a reference you created or have permission to use."
    ],
    "resourceUrl": "https://academy.runwayml.com/tutorial/using-3d-assets-in-references",
    "resourceLabel": "Open the official Runway Academy lesson"
  },
  {
    "slug": "youtube-content-analytics",
    "id": "nuC5iwpNgIE",
    "title": "Use analytics to test your channel direction",
    "originalTitle": "Content Tab in Analytics (Sort by Videos, Shorts, Live or Posts)",
    "creator": "YouTube Creators",
    "creatorUrl": "https://www.youtube.com/user/creatoracademy",
    "uploaded": "2022-05-31",
    "category": "Planning",
    "level": "Beginner",
    "description": "YouTube Creators introduces format-specific content analytics. Use the underlying ideas to compare your pilots and refine your viewer promise.",
    "takeaway": "Compare performance within a format before deciding which topics or production choices to repeat.",
    "exercise": "Choose three original pilot ideas for one niche. Decide what you will compare after publishing, without treating one video’s views as a complete verdict.",
    "prompt": "Design a three-video pilot for a faceless channel about satisfying restoration stories. For each pilot, define a distinct topic, a viewer promise, the format, and one hypothesis to review in YouTube Analytics. Separate Shorts from long-form comparisons. Do not invent performance data or predict guaranteed views.",
    "guide": "choose-faceless-youtube-niche",
    "relatedGuides": [
      "faceless-channel-content-pillars"
    ],
    "practiceTips": [
      "Compare similar formats and publishing windows.",
      "Use actual channel data when it becomes available.",
      "Record the creative hypothesis before looking at results."
    ],
    "note": "Analytics fundamentals from 2022; the current Studio layout may differ.",
    "resourceUrl": "https://support.google.com/youtube/answer/12220281?hl=en",
    "resourceLabel": "Read the current YouTube Analytics guidance"
  },
  {
    "slug": "youtube-ai-content-disclosure",
    "id": "9kt9-L1ymFA",
    "title": "Understand AI and altered-content disclosure",
    "originalTitle": "Disclosing altered or synthetic content on YouTube",
    "creator": "Creator Insider",
    "creatorUrl": "https://www.youtube.com/channel/UCGg-UqjRgzhYDPJMr-9HXCg",
    "uploaded": "2024-03-18",
    "category": "Publishing",
    "level": "Beginner",
    "description": "Creator Insider introduces altered and synthetic content disclosure. Pair the video with current YouTube Help before reviewing your own project.",
    "takeaway": "Distinguish realistic synthetic depictions from routine production assistance, and check the current disclosure requirements.",
    "exercise": "Review an original fictional project and document which visuals, voices, or events were generated or meaningfully altered.",
    "prompt": "Create a review worksheet for my video project. Ask what was generated or altered, whether the result could be mistaken for a real person or event, which third-party assets were used, and whether the title and thumbnail accurately describe it. Link the current YouTube disclosure guidance. Do not decide eligibility or guarantee monetization.",
    "guide": "youtube-ai-content-monetization",
    "practiceTips": [
      "Describe the media honestly before choosing upload settings.",
      "Check the current official Help page for your situation.",
      "Review copyright permissions separately from disclosure."
    ],
    "note": "The 2024 introduction provides context; use current YouTube Help for today’s requirements.",
    "resourceUrl": "https://support.google.com/youtube/answer/14328491?hl=en",
    "resourceLabel": "Read YouTube’s current altered-content disclosure guidance"
  },
  {
    "slug": "youtube-content-plan-community",
    "id": "MeVHGEdXcRI",
    "title": "Build a content plan around your audience",
    "originalTitle": "Building Community on YouTube | Amplify Voices featuring Tiffany Rothe (TiffanyRotheWorkouts)",
    "creator": "YouTube Creators",
    "creatorUrl": "https://www.youtube.com/user/creatoracademy",
    "uploaded": "2021-06-29",
    "category": "Planning",
    "level": "Beginner",
    "description": "A YouTube Creators interview explores goals, recurring content, and viewer interaction. Adapt those planning principles to a faceless channel.",
    "takeaway": "A clear purpose and recurring themes help you plan meaningful variations instead of interchangeable uploads.",
    "exercise": "Create three content pillars for an original faceless channel. Give each pillar four distinct episode ideas and one reason viewers would return.",
    "prompt": "Build a simple content plan for a faceless channel about miniature worlds. Define a one-sentence viewer promise, three content pillars, four distinct episode ideas per pillar, and one useful audience question per pillar. Choose a realistic publishing pace. Avoid repeated titles with only a few nouns swapped.",
    "guide": "faceless-channel-content-pillars",
    "relatedGuides": [
      "choose-faceless-youtube-niche"
    ],
    "practiceTips": [
      "Make each pillar serve the same broad audience promise.",
      "Choose a pace you can sustain with your current time.",
      "Use viewer questions to improve the next episode."
    ],
    "note": "The interview features a fitness creator; its channel-planning principles can be adapted to other subjects.",
    "resourceUrl": "https://support.google.com/youtube/answer/11913421?hl=en",
    "resourceLabel": "Read YouTube’s current content-planning guidance"
  }
];

export const GUIDE_LESSONS:Record<string,string|undefined>={
  'choose-faceless-youtube-niche':'youtube-content-analytics',
  'consistent-ai-characters':'runway-character-references',
  'write-ai-image-prompts':'adobe-image-prompt-structure',
  'write-ai-video-prompts':'google-flow-beginner-workflow',
  'faceless-content-workflow':'elevenlabs-natural-voiceovers',
  'avoid-generic-ai-videos':'runway-3d-scene-references',
  'youtube-ai-content-monetization':'youtube-ai-content-disclosure',
  'faceless-channel-content-pillars':'youtube-content-plan-community',
};
export function getPrimaryVideoForGuide(slug:string){return VIDEOS.find(v=>v.slug===GUIDE_LESSONS[slug]);}
export function getVideosForGuide(slug:string){return VIDEOS.filter(v=>v.guide===slug||v.relatedGuides?.includes(slug));}
export function filterVideos(videos:VideoLesson[],query:string,category:string){
  const q=query.trim().toLowerCase().replace(/\s+/g,' ');
  return videos.filter(v=>(!category||v.category===category)&&(!q||[v.title,v.originalTitle,v.description,v.creator,v.category].join(' ').toLowerCase().includes(q)));
}
export function formatVideoDate(date:string){return new Intl.DateTimeFormat('en-US',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(date));}

