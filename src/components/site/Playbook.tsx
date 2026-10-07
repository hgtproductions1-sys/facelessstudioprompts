import { Link } from "@tanstack/react-router";
import { YouTubeTutorial } from "./YouTubeTutorial";

const videos = [
  { id: "MsVl_CKu_gk", title: "Using Workflows | Runway Academy", description: "See how Runway connects generation steps into a repeatable workflow. Use it as a practical follow-up once your script and shot plan are ready." },
  { id: "lfiASPH1lvE", title: "Gen-4 References | Runway Academy", description: "Explore how reference images can guide recurring subjects and settings. Compare each result with your own reference before using it in a sequence." },
  { id: "OLWd5O1O66s", title: "Gen-4 Image to Video | Runway Academy", description: "Watch an image-to-video walkthrough, then try one simple subject action and camera movement from your shot plan." },
];
const sections = [
  { title: "Start with one idea you can explain", text: "Choose a topic and write its payoff in one sentence. A tiny robot growing its first plant gives you a visible ending; a broad topic like success needs a more specific story. Decide what the viewer should understand or feel by the final shot before selecting tools." },
  { title: "Build the script, then plan the shots", text: "Draft a short opening, one clear development, and an ending. Read the script aloud and time it. Remove anything you cannot show or explain in the available time. Give each shot a purpose: introduce the setting, show an action, reveal a change, or deliver the payoff. The worked examples above show two complete text plans.", video: videos[0] },
  { title: "Keep visual details consistent", text: "Write down the subject's distinctive features, wardrobe or surface details, props, lighting, and setting. Reuse that description and reference images where your chosen tool supports them. Check every output against your reference; a seed or a made-up character token cannot guarantee the same appearance across different prompts.", video: videos[1], source: "https://docs.midjourney.com/hc/en-us/articles/32604356340877-Seeds", sourceTitle: "Midjourney's guide to seeds" },
  { title: "Animate one action at a time", text: "For an image-to-video shot, focus on the movement you want rather than repeating the entire image description. Try a single subject action and a clear camera direction. If the result changes the subject unexpectedly, simplify the action and test again. Combine separate clips in your editor rather than asking one generation to handle a whole story.", source: "https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide", sourceTitle: "Runway's image-to-video prompting guide", video: videos[2] },
  { title: "Review the edit before you publish", text: "Listen to the narration, check names and factual statements, inspect captions, and watch the sequence on a phone. Check licenses for music and imagery and follow the rules of the platform where you publish. A useful prompt does not establish rights to the final output or guarantee monetization." },
  { title: "Improve one choice per video", text: "Keep a note of what you changed: the opening, shot length, visual style, or ending. Compare your own published results before deciding what to repeat. Tool lists and niche suggestions are starting points, not forecasts of audience demand or income." },
];
export function Playbook() {
  return (
    <section id="playbook" className="border-line mt-20 scroll-mt-24 border-t">
      <article className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm text-cyan">Practical creator guide</p>
        <h2 className="mt-3 text-3xl font-bold">The Faceless Creator Playbook</h2>
        <p className="mt-4 text-sm text-ink-muted">Selected tutorials from Runway Academy. These demonstrate the versions shown in each video; interfaces and available features may have changed.</p>
        <div className="mt-8 space-y-8 text-base leading-relaxed text-ink-dim">
          {sections.map((section) => <section key={section.title}>
            <h3 className="text-xl font-semibold text-ink">{section.title}</h3>
            <p className="mt-3">{section.text}</p>
            {section.source ? <p className="mt-3 text-sm">Provider guidance: <a href={section.source} className="text-cyan underline">{section.sourceTitle}</a></p> : null}
            {section.video ? <YouTubeTutorial {...section.video} /> : null}
          </section>)}
          <p>For your next step, browse the <Link to="/library" className="text-cyan underline">prompt library</Link> or compare the <Link to="/ai-tools-hub" className="text-cyan underline">tools for each production stage</Link>.</p>
        </div>
      </article>
    </section>
  );
}
