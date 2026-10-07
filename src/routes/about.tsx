import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/about")({
  head: () => pageHead({ path: "/about", title: "About Us — The Faceless Prompts", description: "Why The Faceless Prompts exists and how its tools help you plan videos." }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="About Us" updated="7 October 2026">
      <LegalSection heading="A clearer starting point for your next video">
        <p>{"The Faceless Prompts is a creative planning resource for people who want to make videos without appearing on camera. We bring scripts, visual prompts, and shot planning into one place so you can spend less time staring at a blank page and more time developing your idea."}</p>
        <p>{"Whether you are exploring a new niche or building a repeatable video format, the goal is the same: give you a useful draft that you can make your own."}</p>
      </LegalSection>
      <LegalSection heading="What you can find here">
        <p>{"The generator turns your niche, topic, and style choices into a production package with voiceover ideas, character details, image prompts, and camera directions. The prompt library, niche directory, and tool guides help you explore different approaches and choose the tools that fit your workflow."}</p>
      </LegalSection>
      <LegalSection heading="A draft, with you in control">
        <p>{"This site produces text prompts and planning notes; it does not render the finished images, videos, or audio. The generator uses AI to create drafts from your niche, topic, and style choices. Check the facts, refine the writing, and review any permissions before you publish."}</p>
      </LegalSection>
      <LegalSection heading="How we create and review content">
        <p>{"Guides and prompt resources are published by The Faceless Prompts editorial team. AI may help with drafting, structure, and prompt variation, but it is not treated as a factual source. For platform rules and other information that can change, we prefer current first-party documentation and avoid claiming hands-on testing that did not occur."}</p>
        <p>{"You can read the full process, correction standard, and sourcing approach on our Editorial Policy page."}</p>
        <p><a className="text-cyan underline" href="/editorial-policy">Read the Editorial Policy</a></p>
      </LegalSection>
      <LegalSection heading="Independent and transparent">
        <p>{"We are independent of the platforms and tools mentioned on this site. Some outbound links may earn us a referral commission. You can read more on our Affiliate Disclosure page. A tool recommendation or generated prompt is not a promise of views, income, or platform approval."}</p>
      </LegalSection>
      <LegalSection heading="Help us improve">
        <p>{"If you spot an error, have a suggestion, or want to tell us how you use the site, we would like to hear from you."}</p>
      </LegalSection>
      <div className="border-line bg-surface2 rounded-xl border p-6"><p className="text-sm text-ink-muted">Contact The Faceless Prompts</p><a href="mailto:hgtproductions1@gmail.com" className="mt-2 inline-block break-all text-base font-medium text-cyan underline underline-offset-4">hgtproductions1@gmail.com</a></div>
    </LegalLayout>
  );
}
