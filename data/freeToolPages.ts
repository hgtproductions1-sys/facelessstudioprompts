import {durationLabel, PACING_DURATIONS, PACING_PRESETS, pacingForDuration} from '@/lib/creator-tools';

export type FreeToolSlug = 'faceless-video-script-generator' | 'youtube-shorts-hook-generator' | 'voiceover-length-calculator';

type FreeToolPage = {
  slug: FreeToolSlug;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  sections: {heading: string; paragraphs?: string[]; bullets?: string[]}[];
  samples: {title: string; summary: string; beats: string[]}[];
  faq: {question: string; answer: string}[];
  links: {href: string; label: string}[];
  pacingTable?: {headings: string[]; rows: string[][]};
};

const pacingTable = {
  headings: ['Video length', ...PACING_PRESETS.map(pace => pace.wpm + ' WPM')],
  rows: PACING_DURATIONS.map(seconds => [
    durationLabel(seconds),
    ...PACING_PRESETS.map(pace => String(pacingForDuration(seconds, pace.wpm).words)),
  ]),
};

export const FREE_TOOL_PAGES: readonly FreeToolPage[] = [
  {
    slug: 'faceless-video-script-generator',
    title: 'Faceless Video Script Generator',
    seoTitle: 'Free Faceless Video Script Generator',
    description: 'Draft a faceless video script with timed story beats, an editable voiceover, and a Master AI Brief. Start with a 45- or 60-second Short or an 8-minute video.',
    intro: 'Turn an idea into a voiceover draft with timed story beats. Choose a hook and tone, write the lines you want to keep, then take your premise and runtime into Studio.',
    sections: [
      {heading: 'Build the voiceover around shots you can show', paragraphs: [
        'Open with one question or visible change. Establish the starting state in the setup. Give each middle beat a job, such as showing a step, introducing an obstacle, or comparing two outcomes.',
        'Write the payoff before you polish the hook. For a Short, a final image can echo the first once the story is complete. In a longer video, leave time for examples, evidence, and pauses between ideas.',
      ]},
      {heading: 'Estimate the words your edit can fit', paragraphs: [
        'The table estimates continuous speaking. Reserve time for demonstrations, sound cues, and transitions before you decide how many words to record. Test one representative paragraph aloud at the pace you want.',
      ]},
    ],
    samples: [
      {title: 'An orange kitten finds a dry doorway', summary: 'AI cat and pet story · 45-second Short', beats: [
        '0:00–0:03 · Show a dripping paw stopping in a warm patch of light.',
        '0:03–0:10 · Establish the rain, bakery window, and open side doorway.',
        '0:10–0:24 · Follow one hesitant step across the threshold.',
        '0:24–0:38 · Reveal the dry towel and the kitten settling down.',
        '0:38–0:45 · Return to the paw in warm light as the rain fades into the background.',
      ]},
      {title: 'A stick figure explains a lever', summary: 'Stickman explainer · 60-second Short', beats: [
        '0:00–0:03 · Show a small figure lifting a crate with a board.',
        '0:03–0:12 · Name the board, support point, and crate.',
        '0:12–0:30 · Move the support point closer to the crate in a simple side view.',
        '0:30–0:49 · Show how the same push changes what happens at the other end.',
        '0:49–1:00 · Hold a clean diagram with the three parts labeled.',
      ]},
      {title: 'What a repeatable paper-folding setup looks like', summary: 'Overhead craft tutorial · 8-minute video', beats: [
        '0:00–0:20 · Put the finished item and original sheet side by side.',
        '0:20–1:15 · Explain the paper orientation and mark the first fold.',
        '1:15–2:55 · Show the first two folds from above with the crease unobstructed.',
        '2:55–4:55 · Demonstrate a common alignment issue and redo the fold slowly.',
        '4:55–7:20 · Finish the item and test it with the insert it needs to hold.',
        '7:20–8:00 · Summarize the two measurements to check before trying again.',
      ]},
    ],
    faq: [
      {question: 'How does the script generator work?', answer: 'It organizes your topic, runtime, tone, and hook into editable story beats in your browser. Each beat includes starting language or an instruction for you to adapt.'},
      {question: 'Does this run an AI model?', answer: 'The outlines and exports run in your browser. The Master AI Brief is text you can choose to paste into a writing assistant.'},
      {question: 'Which video lengths can I choose?', answer: 'Choose a 45-second Short, a 60-second Short, or an 8-minute long-form video. The storyboard link keeps the same format in Studio.'},
      {question: 'What does the voiceover export include?', answer: 'It combines the written narration from the beat fields and removes supported production cues and formatting. Add any unfinished lines before recording.'},
      {question: 'How do I expand the script into visual prompts?', answer: 'Open the storyboard in Studio with the topic and format prefilled. Use the script as your reference while choosing the action, framing, and continuity notes for each shot.'},
    ],
    links: [
      {href: '/studio', label: 'Open Video Planning Studio'},
      {href: '/niches', label: 'Browse niche playbooks'},
      {href: '/prompts/seo-title-generator', label: 'Use the YouTube title prompt'},
      {href: '/prompts/img-storyboard-frames', label: 'Create storyboard frames'},
      {href: '/free-tools/voiceover-length-calculator', label: 'Estimate narration length'},
    ],
    pacingTable,
  },
  {
    slug: 'youtube-shorts-hook-generator',
    title: 'YouTube Shorts Hook Generator',
    seoTitle: 'Free YouTube Shorts Hook Generator',
    description: 'Build eight editable YouTube Shorts hooks with matching first-two-second visual directions. Choose an opening pattern for a faceless video.',
    intro: 'Draft a spoken opening and the shot that supports it. Choose a pattern, then adapt one of eight hook and visual pairs to footage you can deliver.',
    sections: [
      {heading: 'Four hook patterns for faceless videos', bullets: [
        'Pattern Interrupt. Change one sound, movement, or object in a frame the viewer can understand immediately.',
        'Contrarian. Put a familiar assumption next to a result viewers can check. Use a fair comparison you can show.',
        'Visual Reveal. Start on the result, a readable detail, or an obstruction that clears within the opening.',
        'Story Stakes. Make the character’s goal and the first obstacle visible together.',
      ]},
      {heading: 'Review the first three seconds', bullets: [
        'Play the first frame at phone size. Check that the subject is recognizable.',
        'Mute the clip once. Look for a readable change, question, or problem before the exposition starts.',
        'Play it with sound and captions. The spoken hook and visual should describe the same event.',
        'Watch through the payoff. Confirm the footage answers the question or delivers the result implied by the opening.',
      ]},
    ],
    samples: [],
    faq: [
      {question: 'How many Shorts hooks are generated?', answer: 'Each pattern supplies eight distinct openings. Every opening has an editable line and an editable direction for the first two seconds.'},
      {question: 'Can a visual hook work without narration?', answer: 'Yes. Choose a readable change in the first shot, then test the clip muted. You can use the spoken line as an optional caption when it adds context.'},
      {question: 'Which pattern should I use for a tutorial?', answer: 'Try Visual Reveal when you can open on the finished result. Use Contrarian when the tutorial compares two approaches you can demonstrate fairly.'},
      {question: 'Are the hook lines ready to publish?', answer: 'Check each line against your footage, then replace generic details with a specific action, object, or outcome that the video shows.'},
    ],
    links: [
      {href: '/free-tools', label: 'Browse all free tools'},
      {href: '/studio', label: 'Plan the entire video in Studio'},
      {href: '/prompts', label: 'Explore the prompt library'},
      {href: '/articles/faceless-youtube-hook-prompts', label: 'Read worked examples of faceless hooks'},
    ],
  },
  {
    slug: 'voiceover-length-calculator',
    title: 'Voiceover Length Calculator',
    seoTitle: 'Free Voiceover Length Calculator',
    description: 'Estimate speaking time from your script, or choose a target duration to get a word budget and a rough visual cut range.',
    intro: 'Paste your narration to estimate its speaking time, or work backward from a target video length. Choose a reading pace or enter your own.',
    sections: [
      {heading: 'Estimate the narration before you record', paragraphs: [
        'Speaking time in seconds is the word count divided by words per minute, multiplied by 60. Record a short sample to account for delivery, pauses, names, and emphasis.',
        'Work from the time reserved for speech. If a 45-second video opens with five seconds of music, calculate the narration budget for the remaining 40 seconds.',
      ]},
      {heading: 'Use the cut range to start a shot list', paragraphs: [
        'For Shorts, the planning range assumes a shot every four to five seconds. Longer videos use a starting range of eight to 16 seconds per shot. Let the story, movement, and reading time set the final edit.',
      ]},
    ],
    samples: [],
    faq: [
      {question: 'How exact is the speaking time?', answer: 'The estimate uses a constant pace and rounds to the nearest second. A timed read of the actual recording is the most reliable way to confirm the duration.'},
      {question: 'How many words fit into a 45-second Short?', answer: 'At 165 words per minute, 45 seconds of continuous narration is about 124 words. Allow more space if you need a pause or a silent visual beat.'},
      {question: 'What pace should I use for a documentary?', answer: 'Try 145 words per minute as a starting point. Record a representative paragraph and use the custom control to match your actual delivery.'},
      {question: 'Do the shot estimates count transitions?', answer: 'They estimate visual beats from the selected duration. Additional cuts, transitions, and held frames depend on the footage and the story.'},
    ],
    links: [
      {href: '/free-tools/faceless-video-script-generator', label: 'Draft a faceless video script'},
      {href: '/ai-tools-hub', label: 'Explore voiceover and editing tools'},
      {href: '/articles/ai-voiceover-script-prompts', label: 'Write narration for AI voiceover'},
    ],
    pacingTable,
  },
];

export function getFreeToolPage(slug: string) {
  return FREE_TOOL_PAGES.find(tool => tool.slug === slug);
}
