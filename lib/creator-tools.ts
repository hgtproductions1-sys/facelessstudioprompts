import {countSpokenWords, estimatedSpeakingSeconds} from './studio-exports';

export const PACING_PRESETS = [
  {label: 'Slow / Stoic', wpm: 125},
  {label: 'Documentary', wpm: 145},
  {label: 'Standard YouTube', wpm: 160},
  {label: 'Fast Shorts', wpm: 185},
] as const;

export const PACING_DURATIONS = [15, 30, 45, 60, 300, 480, 720] as const;
export const HOOK_PATTERNS = ['Pattern Interrupt', 'Contrarian', 'Visual Reveal', 'Story Stakes'] as const;
export type HookPattern = typeof HOOK_PATTERNS[number];
export const SCRIPT_TONES = ['Conversational', 'Documentary', 'Warm', 'Playful'] as const;
export type ScriptTone = typeof SCRIPT_TONES[number];
export const SCRIPT_FORMATS = [
  {id: 'short-45', label: 'Shorts · 45 seconds', seconds: 45},
  {id: 'short', label: 'Shorts · 60 seconds', seconds: 60},
  {id: 'long-8', label: 'Long-form · 8 minutes', seconds: 480},
] as const;
export type ScriptFormatId = typeof SCRIPT_FORMATS[number]['id'];

export function pacingForScript(text: string, wpm: number) {
  const words = countSpokenWords(text);
  return {words, seconds: estimatedSpeakingSeconds(words, wpm)};
}

export function pacingForDuration(seconds: number, wpm: number) {
  if (!Number.isFinite(seconds) || !Number.isFinite(wpm) || seconds <= 0 || wpm <= 0) return {words: 0, cuts: [0, 0] as const};
  const words = Math.round(seconds * wpm / 60);
  const averageHold = seconds <= 60 ? [4, 5] : [8, 16];
  return {words, cuts: [Math.max(1, Math.floor(seconds / averageHold[1])), Math.max(1, Math.ceil(seconds / averageHold[0]))] as const};
}

export function durationLabel(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return minutes + ':' + String(seconds % 60).padStart(2, '0');
}

export function buildQuickHooks(topic: string) {
  const premise = topic.trim();
  if (premise.length < 3) return [];
  return [
    'What changes when ' + premise.toLowerCase() + '?',
    'Start with the moment everything changes in “' + premise + '”.',
    'Tell “' + premise + '” from a point of view the audience hasn’t seen.',
    'Show the result first. Then explain how “' + premise + '” got there.',
    'Open with one concrete detail from “' + premise + '”—then reveal why it matters.',
  ];
}

type HookTemplate = {line: string; visual: string};
const HOOKS: Record<HookPattern, readonly HookTemplate[]> = {
  'Pattern Interrupt': [
    {line: 'Wait. Look at the one thing that moved.', visual: 'Start on a still composition, then move the key object without moving the camera.'},
    {line: 'Watch this once at full speed.', visual: 'Show a single quick movement. Hold the final frame just long enough to register it.'},
    {line: 'That changed before the clip even started.', visual: 'Open on the outcome. Match-cut to the starting position on the same surface.'},
    {line: 'Pause here. What is out of place?', visual: 'Frame two familiar details and one unexpected one at the same scale.'},
    {line: 'Turn the sound up for this part.', visual: 'Place the source of a distinct click, scrape, or rustle in an unobstructed close-up.'},
    {line: 'Keep your eye on the corner of the frame.', visual: 'Place the most important small movement in a well-lit corner of an otherwise still view.'},
    {line: 'The first frame gives it away.', visual: 'Open on the clue at a readable size. Bring the wider scene in on the next shot.'},
    {line: 'Hold on. This should look different.', visual: 'Cut from the expected layout to the actual one at the same angle and exposure.'},
  ],
  Contrarian: [
    {line: 'Start with the result. The setup can wait.', visual: 'Show the finished state in an uncluttered frame, then cut to the first step.'},
    {line: 'The obvious first step can make this harder.', visual: 'Show the tempting action and the visible obstacle it creates.'},
    {line: 'Before you change the whole setup, try this.', visual: 'Keep the scene fixed and adjust one object the viewer can see clearly.'},
    {line: 'The smallest change is the easiest one to check.', visual: 'Frame the single adjustment close enough for a side-by-side comparison.'},
    {line: 'Watch what happens when we change the order.', visual: 'Place the two required items side by side, then reach for the less obvious one first.'},
    {line: 'Start with the part you usually leave until last.', visual: 'Show the last item in the workflow next to the unfinished starting state.'},
    {line: 'This shortcut deserves a closer look.', visual: 'Open on the moment the shortcut skips. Keep the affected detail in focus.'},
    {line: 'One test tells us which approach belongs here.', visual: 'Show both approaches under the same framing and mark the single difference.'},
  ],
  'Visual Reveal': [
    {line: 'Here is the result. Now follow the change.', visual: 'Open on the finished frame, then rewind visually to the clearly matched start.'},
    {line: 'The answer is just behind this edge.', visual: 'Frame a plausible foreground obstruction and move only far enough to clear it.'},
    {line: 'Look closely at the surface.', visual: 'Use a fixed close-up to show one small mark, texture, or state change.'},
    {line: 'This is what the wide shot missed.', visual: 'Begin with the detail already unobstructed. Cut wide after viewers can read it.'},
    {line: 'Watch the gap disappear.', visual: 'Center the empty space between two visible edges as one moves toward the other.'},
    {line: 'Wait for the light to move across it.', visual: 'Hold the angle while motivated light reveals the detail one part at a time.'},
    {line: 'The difference shows up side by side.', visual: 'Match angle, scale, and lighting across a two-panel before-and-after view.'},
    {line: 'Watch what is left when this slides away.', visual: 'Use one foreground object to uncover the final detail and hold on it.'},
  ],
  'Story Stakes': [
    {line: 'One small choice changes the ending.', visual: 'Open with two plausible options in frame and a hand or character hesitating between them.'},
    {line: 'The plan works if this piece fits.', visual: 'Show the missing connection and a single piece approaching it.'},
    {line: 'These tracks stop here. What happened next?', visual: 'Cut from the recognizably continuous trail to its abrupt, visible end.'},
    {line: 'Everything depends on what is behind that door.', visual: 'Show a closed door and the reveal cue, such as light underneath or a moving shadow.'},
    {line: 'There is one step left, and the obvious route is blocked.', visual: 'Establish the blocked path and show the unfinished goal in the same frame.'},
    {line: 'This is where the first attempt went wrong.', visual: 'Show the actual snag or interruption as it occurs, then hold on its cause.'},
    {line: 'The easy part is over. Now it has to stay together.', visual: 'Frame the finished-looking result at the moment it faces a practical stability check.'},
    {line: 'Would you try again or change one thing?', visual: 'Show the failed first state next to the single part available to adjust.'},
  ],
};

export function buildShortsHooks(topic: string, pattern: HookPattern, nicheCue: string) {
  const premise = topic.trim();
  if (premise.length < 3) return [];
  return HOOKS[pattern].map(({line, visual}, index) => ({
    id: index + 1,
    line,
    visual: visual + ' Adapt the shot to “' + premise + '”.' + (nicheCue ? ' ' + nicheCue : ''),
  }));
}

export function scriptBeats(format: ScriptFormatId) {
  if (format === 'short-45') return [
    {start: 0, end: 3, label: 'Hook'}, {start: 3, end: 10, label: 'Setup'},
    {start: 10, end: 24, label: 'First change'}, {start: 24, end: 38, label: 'Payoff'},
    {start: 38, end: 45, label: 'Loop or close'},
  ];
  if (format === 'short') return [
    {start: 0, end: 3, label: 'Hook'}, {start: 3, end: 12, label: 'Setup'},
    {start: 12, end: 30, label: 'First change'}, {start: 30, end: 49, label: 'Payoff'},
    {start: 49, end: 60, label: 'Loop or close'},
  ];
  return [
    {start: 0, end: 20, label: 'Hook'}, {start: 20, end: 75, label: 'Setup'},
    {start: 75, end: 175, label: 'First change'}, {start: 175, end: 295, label: 'Develop the idea'},
    {start: 295, end: 440, label: 'Payoff'}, {start: 440, end: 480, label: 'Outro'},
  ];
}

export function compileScriptOutline({
  topic, tone, format, hook, nicheCue,
}: {topic: string; tone: ScriptTone; format: ScriptFormatId; hook: HookPattern; nicheCue: string}) {
  const premise = topic.trim().replace(/[.!?]+$/, '');
  const hookLine = buildShortsHooks(premise, hook, nicheCue)[0]?.line ?? 'Watch what changes in the first shot.';
  const setup = {
    Conversational: 'Here is what we are working on. ' + premise + '. Start with the detail you can see.',
    Documentary: 'This story follows one clear change. ' + premise + '. Begin with the earlier state.',
    Warm: 'Take a moment to look at this. ' + premise + '. We will follow the change one step at a time.',
    Playful: 'Here is the setup. ' + premise + '. Keep your eye on the detail that gets in the way.',
  }[tone];
  const lines: Record<string, string> = {
    Hook: hookLine,
    Setup: setup,
    'First change': 'Here is where the change begins. [Name the action and what the viewer can recognize after it.]',
    'Develop the idea': 'Now compare that with a second example. [Explain what stays the same and what changes. Cite any factual claim.]',
    Payoff: 'Look at the result alongside the opening. [Name the specific detail that answers the opening question or resolves the action.]',
    'Loop or close': format === 'short-45'
      ? 'Look back at the first frame. [Name the detail that makes sense now.]'
      : 'Here is the change to watch for next time. [Name the detail and end on the completed action.]',
    Outro: 'Here is the result you can take into your own project. [Give one next action that follows from the examples.]',
  };
  return scriptBeats(format).map(beat => ({
    ...beat,
    narration: lines[beat.label],
    ...(beat.label === 'Hook' ? {note: nicheCue} : {}),
  }));
}
