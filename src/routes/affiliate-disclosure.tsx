import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

const TITLE = "Affiliate Disclosure — Faceless Studio Pro";
const DESC =
  "Plain-English, FTC-compliant disclosure of how Faceless Studio Pro earns affiliate commissions and why that never changes our recommendations.";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DisclosurePage,
});

function DisclosurePage() {
  return (
    <LegalLayout title="Affiliate Disclosure" updated="1 January 2025">
      <LegalSection heading="The Short Version">
        <p>
          Faceless Studio Pro is free to use because some of the links on this site are affiliate
          links. If you click one and buy something, we may earn a commission. It costs you nothing
          extra — the price is the same whether you use our link or go direct.
        </p>
      </LegalSection>

      <LegalSection heading="FTC Compliance Statement">
        <p>
          In accordance with the U.S. Federal Trade Commission's 16 CFR Part 255 guidelines on
          endorsements and testimonials, we disclose that a material connection exists between this
          site and certain products and services mentioned on it. Where such a connection exists,
          the link is labelled as an affiliate link at or near the point of click.
        </p>
      </LegalSection>

      <LegalSection heading="Programs We Participate In">
        <p>We may earn commissions from these categories of partners:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>AI video generation and animation tools</li>
          <li>AI voiceover, voice cloning, and audio software</li>
          <li>Image generation platforms and prompt marketplaces</li>
          <li>Web hosting, domains, and creator infrastructure</li>
          <li>Courses, templates, and digital products for content creators</li>
        </ul>
      </LegalSection>

      <LegalSection heading="How Commissions Affect Recommendations">
        <p>
          They don't. We feature tools we consider genuinely useful for faceless creators, and the
          existence or size of a commission never determines placement, wording, or ranking. Some
          tools we recommend pay us nothing at all.
        </p>
        <p>
          We are also not affiliated with, endorsed by, or sponsored by any platform named on this
          site, including Leonardo.ai, Midjourney, TikTok, YouTube, and Instagram.
        </p>
      </LegalSection>

      <LegalSection heading="Questions">
        <p>
          If anything here is unclear, or you want to know whether a specific link is monetised,
          email <span className="text-cyan">privacy@facelessstudiopro.com</span> and we will tell
          you plainly.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
