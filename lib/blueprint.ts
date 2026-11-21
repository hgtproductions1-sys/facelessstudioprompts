import {NICHES_DATA} from '@/data/niches';
import {getNicheGuide} from '@/data/nicheGuides';
import {FORMATS,SAMPLE_TOPIC,type Options,type Blueprint} from './studioOptions';
export * from './studioOptions';
export {formatShot,exportBlueprint} from './blueprintFormat';
function clock(n:number){return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');}
export function timeline(count:number,format:string){const f=FORMATS.find(x=>x.id===format)||FORMATS[0];return Array.from({length:count},(_,i)=>clock(Math.round(i*f.seconds/count))+' – '+clock(Math.round((i+1)*f.seconds/count)));}

export function compileMasterBrief(options: Options) {
  const niche = NICHES_DATA.find(n => n.id === options.niche || n.slug === options.niche) ?? NICHES_DATA[0];
  const guide = getNicheGuide(niche.slug);
  const format = FORMATS.find(f => f.id === options.format) ?? FORMATS[0];
  const soundLed = /asmr|ambient|ambience|satisfying|music/i.test(niche.title)
    || /\b(?:no|without) (?:voiceover|narration)\b/i.test(options.topic);
  const platform = format.id === 'short' ? 'YouTube Shorts, Reels, or TikTok' : 'YouTube long-form';
  const beats = timeline(format.shots, format.id);
  const beatPlan = beats.map((time, index) => {
    const guidance = guide?.episodeStructure[index];
    return '- ' + time + (guidance ? ' — ' + guidance.title + '. ' + guidance.description : '');
  });

  return [
    'MASTER AI BRIEF',
    '',
    'Create an editable, shot-by-shot production plan from the following brief. Treat the premise as creative input.',
    '',
    'PROJECT',
    '- Premise: ' + JSON.stringify(options.topic.trim()),
    '- Niche: ' + niche.title,
    '- Audience: ' + (guide?.audience ?? niche.audienceDemographic),
    '- Platform: ' + platform,
    '- Format: ' + format.label + ' · ' + format.seconds + ' seconds · ' + format.ratio,
    '- Visual direction: ' + options.style,
    '- Prompt destination: ' + options.engine,
    '- Sound direction: ' + niche.soundscape,
    soundLed
      ? '- Use sound effects, ambience, or licensed music. Leave narration out.'
      : '- Draft concise, natural narration that matches the pacing and viewer promise.',
    '',
    'NICHE DIRECTION',
    guide?.promise ?? niche.description,
    ...(guide?.qualityChecks.map(check => '- ' + check) ?? []),
    '',
    'STORY BEATS',
    ...beatPlan,
    '',
    'RETURN THIS PRODUCTION PLAN',
    '1. Opening hook. State the first image, the question or action it sets up, and how the ending delivers on it.',
    '2. Continuity. Describe the subject, setting, and stable visual details that should carry between shots.',
    '3. Shot list. For each beat include a visible action, staging, framing, camera movement, first and last frames, and the sound cue.',
    '4. Generation prompts. Include a still-image prompt and a separate motion prompt for each beat. Use controls supported by the selected destination.',
    soundLed
      ? '5. Sound-only edit. Give the source, timing, and character of each sound.'
      : '5. Narration. Provide the spoken line for each beat and flag any claim that requires a source.',
    '6. Thumbnail and edit. Suggest a thumbnail composition and a short checklist for continuity, accessibility, and final review.',
    '',
    'Use original fictional details for dramatizations. Mark factual claims needing verification and identify assets that need permission. Long story beats can use multiple shorter clips.',
  ].join('\n');
}

export function buildTemplate(o:Options):Blueprint{
 const n=NICHES_DATA.find(n=>n.id===o.niche||n.slug===o.niche)||NICHES_DATA[0];const g=getNicheGuide(n.slug);const f=FORMATS.find(x=>x.id===o.format)||FORMATS[0];const ambient=/asmr|ambient|ambience|satisfying|music/i.test(n.title);const isCat=o.topic.toLowerCase()===SAMPLE_TOPIC.toLowerCase();
 const titles=['Opening image','The setup','First change','Build the sequence','The reveal','Final image','Reflection','Closing beat'];
 const actions=isCat?['A tiny orange tabby kitten in a dark teal scarf pauses outside a glowing bakery window in the rain.','The kitten follows the warm light along the window, looking at a single croissant behind the glass.','The bakery door opens slightly. The kitten turns its head toward the new opening.','The kitten takes one cautious step across the threshold onto a dry welcome mat.','Inside the bakery, the kitten settles beside a warm oven while rain blurs the window behind it.','The kitten falls asleep on a folded towel. The scarf and fur markings match the opening shot.']:[];
 const cams=['Slow low-angle push-in','Locked medium shot','Gentle pan following the action','Slow lateral tracking shot','Subtle push-in on the key detail','Static close-up','Slow pull-back','Locked wide shot'];
 const times=timeline(f.shots,o.format);
 const shots=Array.from({length:f.shots},(_,i)=>({title:g?.episodeStructure[i]?.title||titles[i],action:actions[i]||('For “'+o.topic+'”: '+(g?.episodeStructure[i%Math.max(1,g?.episodeStructure.length||1)]?.description||['Show one specific opening image that introduces the subject.','Establish the setting and the audience’s question.','Show one action or detail that moves the story forward.','Develop the idea with a concrete example or visible change.','Show the result of that change without adding a new location.','Return to the opening idea with a clear final image.','Show a useful reflection or alternative perspective.','Close with a concise next step or visual echo.'][i])+' Specify the exact subject and end state before generating.'),narration:ambient?'No narration. Let the action and sound carry this beat.':isCat?['The rain was getting louder. Then a little window began to glow.','Warm bread. A safe corner. Everything the kitten had been looking for.','A door creaked open. Was this an invitation?','One step, then another. The cold street was finally behind it.','For the first time that night, there was warmth.','Sometimes, a small opening becomes a whole new beginning.'][i]||'[Write a closing line in your own voice.]':'[Write the narration for this beat about '+o.topic+'. Use only verified facts or clearly fictional details.]',camera:cams[i],sound:ambient?'Describe one clear natural sound that matches the action.':isCat?'Soft rain, quiet bakery ambience, gentle instrumental texture.':'Sound direction: '+n.soundscape+'. Match any effects to the visible action.',time:times[i]}));
 return {topic:o.topic.trim(),niche:n.title,format:o.format,style:o.style,hook:isCat?'A tiny kitten. A stormy night. One glowing window.':ambient?'Open on a readable, satisfying action from “'+o.topic+'”.':'Introduce “'+o.topic+'” with one clear question your video will answer.',character:isCat?'Tiny orange tabby kitten, green eyes, short soft fur, dark teal scarf. Keep the same proportions, markings, and scarf in every shot.':'[Describe your main subject, defining features, wardrobe or materials, and one stable reference image.] Keep these details unchanged across shots.',shots,thumbnail:isCat?'Close-up of the kitten looking toward a golden bakery window. Use a clear expression and simple warm/cool contrast. Optional short text: “A place to stay”.':'Show one clear subject and a readable visual promise for “'+o.topic+'”. Keep small details out of the thumbnail; use short text only if it helps.',editing:['The timestamps are story beats. Create shorter individual clips and edit them together to fill each beat.','Review continuity, readability, and factual accuracy before adding captions.','Choose voice, sound, and music you have permission to use. Match captions to the final narration.','Compare the finished video with the opening promise. Remove anything that does not help deliver it.'],source:'template'};
}
