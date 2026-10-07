import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AI_TOOLS, ENGINE_GROUPS } from "@/config/aiTools";
import { handleCtaClick } from "@/config/affiliates";

const TOOL_NOTES: Record<string, { use: string; start: string; limit: string }> = {
  midjourney: { use: "Explore still-image compositions and visual styles.", start: "One specific subject, setting, lighting direction, and framing choice.", limit: "A seed is not a character lock. Use supported reference controls and compare every frame." },
  leonardo: { use: "Develop still images and visual references for your scenes.", start: "Your master image prompt and a reference image, where the selected model supports it.", limit: "Models and presets behave differently. Test one scene before producing a batch." },
  flux: { use: "Explore an image model for your subject and visual direction.", start: "A clear natural-language description of the scene.", limit: "Access, settings, and output rights depend on the provider or implementation you use." },
  imagen: { use: "Create image concepts from a natural-language scene description.", start: "The subject, environment, composition, and lighting you want.", limit: "Access and features can vary. Check the available controls instead of pasting another tool's flags." },
  runway: { use: "Turn an idea or starting frame into a motion shot.", start: "One subject action and one clear camera direction per shot.", limit: "Generated movement can introduce visual changes. Review the clip before building the next scene." },
  kling: { use: "Explore generated motion for a planned video scene.", start: "A concise action prompt and a suitable starting image if supported.", limit: "Check clip-length, reference, and export options in the model and plan you select." },
  luma: { use: "Develop motion concepts from your scene description or reference.", start: "A simple action with a clear beginning and end.", limit: "Complex sequences may need several clips and manual editing. Inspect continuity between shots." },
  veo: { use: "Explore video generation for scenes with a defined action and setting.", start: "Describe the shot, desired movement, and any intended audio clearly.", limit: "Audio, reference controls, and access depend on the service and model available to you." },
  elevenlabs: { use: "Turn a reviewed script into narration.", start: "A short script with clear punctuation and a voice you are allowed to use.", limit: "Listen for pronunciation and pacing. Follow the provider's permissions and verification rules for voice cloning." },
};

const TITLE = "AI Video, Image & Voice Tools | The Faceless Prompts";
const DESC =
  "Compare the roles of image, video, and voice tools in a faceless-video workflow, with practical limitations and link disclosures.";

export const Route = createFileRoute("/ai-tools-hub")({
  head: () => pageHead({ path: "/ai-tools-hub", title: TITLE, description: DESC, type: "website" }),
  component: ToolsHub,
});

function ToolsHub() {
  return (
    <div className="bg-canvas min-h-screen overflow-x-hidden text-ink">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-20 pt-28">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          The <span className="gradient-text">AI Tools Hub</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-ink-dim md:text-base">
          Choose a tool for the job you need to finish. These are workflow suggestions, not rankings or guarantees. The ElevenLabs link is a referral link and may earn us a commission; the other listed destinations are direct links. Check current pricing, features, and usage rights before signing up.
        </p>

        {ENGINE_GROUPS.map((group) => (
          <section key={group.key} className="mt-14">
            <h2 className="text-xl font-bold">{group.label}</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {AI_TOOLS.filter((t) => t.category === group.key).map((tool) => (
                <article key={tool.id} className="glass-card flex flex-col p-5">
                  <h3 className="text-lg font-semibold text-ink">{tool.name}</h3>
                  <p className="mt-2 text-base text-ink-dim">{TOOL_NOTES[tool.id]?.use}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-dim"><span className="font-semibold text-ink">Start with: </span>{TOOL_NOTES[tool.id]?.start}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim"><span className="font-semibold text-ink">Before you commit: </span>{TOOL_NOTES[tool.id]?.limit}</p>
                  <p className="mt-4 text-sm text-cyan">{tool.id === "elevenlabs" ? "Referral link — we may earn a commission." : "Direct link to the provider."}</p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel={tool.id === "elevenlabs" ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                    onClick={() => { if (tool.id === "elevenlabs") handleCtaClick(tool.id); }}
                    className="from-purple to-cyan mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-semibold text-[#0a0a0c] transition-all hover:brightness-110"
                  >
                    Visit {tool.name}
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16">
          <Link
            to="/"
            className="border-line bg-surface2 hover:border-purple inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-ink-dim transition-colors hover:text-white"
          >
            Back to the Generator
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
