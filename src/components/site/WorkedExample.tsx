import { copyText } from "./primitives";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const examples = [
  {
    id: "robot", title: "A tiny robot's first garden", niche: "Fictional miniature story",
    script: "Every morning, this tiny robot watered a pot of ordinary soil. Nothing happened. Its neighbors suggested a faster hobby, but the robot kept returning with its little watering can. Then, one quiet morning, a green shoot appeared. It was barely taller than a screw, yet the robot treated it like a forest. By sunset, it had built a fence around the pot. Some victories only look small from far away.",
    image: "A palm-sized brass robot with round glass eyes and a dented blue watering can, standing beside a terracotta pot on a wooden windowsill, a single tiny green shoot emerging from dark soil, warm morning light through frosted glass, handcrafted miniature textures, shallow depth of field, close composition, gentle storybook mood, no lettering or watermark.",
    shots: [
      ["0–6s", "Push-in toward the robot watering an empty pot.", "Introduce the repeated routine."],
      ["6–12s", "Static close-up as a drop falls from its watering can.", "Hold attention on a small action."],
      ["12–20s", "Tilt up from the soil to the new shoot and the robot's eyes.", "Reveal the change."],
      ["20–28s", "Pull-out as the robot places a miniature fence around the pot.", "Give the story a visual payoff."],
    ],
    change: "Change the robot's prop and the final small victory while keeping its description and the windowsill setting consistent.",
  },
  {
    id: "desk", title: "A cluttered desk, one quiet reset", niche: "Everyday workspace story",
    script: "The desk wasn't broken. It was just carrying too many unfinished thoughts. A cable curled around yesterday's mug. Loose notes hid the keyboard. Instead of buying another organizer, its owner cleared one corner, moved the mug, and stacked the papers. A small lamp took the empty spot. The room stayed exactly the same, but the next task finally had somewhere to begin. The reset wasn't dramatic. It was enough.",
    image: "A small wooden home-office desk beside a window, closed notebook, neatly coiled black charging cable, a plain ceramic mug and a warm desk lamp, soft evening light, hands arranging the notebook at the edge of the frame with no face visible, realistic materials and gentle shadows, close tabletop composition, calm everyday atmosphere, no brand logos, lettering or watermark.",
    shots: [
      ["0–6s", "Pan right across loose papers and a tangled charging cable.", "Show the starting state."],
      ["6–12s", "Static overhead shot of hands moving the mug and stacking notes.", "Make the action easy to follow."],
      ["12–20s", "Tracking shot along the desk as the cable is coiled.", "Connect the small improvements."],
      ["20–28s", "Pull-out from the lit desk lamp to the clear workspace.", "End with the same setting, visibly changed."],
    ],
    change: "Swap the desk for a kitchen counter or a shelf. Keep the before-and-after framing comparable so the change is visible.",
  },
];

export function WorkedExample() {
  return (
    <section id="worked-example" className="border-line mx-auto mt-20 max-w-6xl scroll-mt-24 border-t px-4 pt-14">
      <p className="text-sm font-medium text-cyan">From idea to production plan</p>
      <h2 className="mt-3 text-2xl font-bold md:text-3xl">Two worked video examples</h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-dim">See how a topic becomes a voiceover, a visual prompt, and a four-shot edit. These are written examples, not rendered videos or performance-tested results. Time the narration and adjust the cuts before producing your version.</p>
      <Tabs defaultValue="robot" className="mt-8">
        <TabsList className="bg-surface2 flex h-auto flex-wrap justify-start gap-2 p-2">
          {examples.map((example) => <TabsTrigger key={example.id} value={example.id} className="px-4 py-3 text-sm">{example.title}</TabsTrigger>)}
        </TabsList>
        {examples.map((example) => (
          <TabsContent key={example.id} value={example.id} className="mt-6 space-y-6">
            <div className="glass-card rounded-2xl p-6"><p className="text-sm text-cyan">{example.niche}</p><h3 className="mt-2 text-xl font-semibold">{example.title}</h3><p className="mt-3 text-base text-ink-dim">Target edit: roughly 28 seconds. Use a natural delivery and shorten the script if it runs long.</p></div>
            <div className="grid gap-6 md:grid-cols-2">
              <article className="border-line bg-surface2 rounded-2xl border p-6"><h4 className="text-lg font-semibold">Voiceover draft</h4><p className="mt-4 text-base leading-relaxed text-ink-dim">{example.script}</p></article>
              <article className="border-line bg-surface2 rounded-2xl border p-6"><h4 className="text-lg font-semibold">Starting image prompt</h4><p className="mt-4 text-base leading-relaxed text-ink-dim">{example.image}</p><p className="mt-4 text-sm text-ink-muted">Set the aspect ratio in your image tool. Use the resulting frame as a reference where your video tool supports it.</p></article>
            </div>
            <div className="border-line overflow-x-auto rounded-2xl border"><table className="w-full min-w-[540px] text-left text-sm"><caption className="bg-surface2 p-4 text-left text-lg font-semibold">Four-shot edit plan</caption><thead className="bg-surface2 text-ink"><tr><th className="p-4">Approx. time</th><th className="p-4">Shot direction</th><th className="p-4">Purpose</th></tr></thead><tbody>{example.shots.map(([time,shot,purpose]) => <tr key={time} className="border-line border-t"><td className="p-4">{time}</td><td className="p-4 text-ink-dim">{shot}</td><td className="p-4 text-ink-dim">{purpose}</td></tr>)}</tbody></table></div>
            <p className="text-base leading-relaxed text-ink-dim"><span className="font-semibold text-ink">Make it yours: </span>{example.change}</p>
            <div className="flex flex-wrap gap-3"><button type="button" onClick={() => void copyText([example.title, example.script, example.image, ...example.shots.map((shot) => shot.join(" | "))].join("\n\n"), "Example copied")} className="bg-purple rounded-xl px-5 py-3 text-sm font-semibold text-white">Copy this plan</button><a href="/#generator" className="border-line rounded-xl border px-5 py-3 text-sm text-ink">Create your own draft</a></div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
