import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/editorial-policy")({
  head: () =>
    pageHead({
      path: "/editorial-policy",
      title: "Editorial Policy — The Faceless Prompts",
      description:
        "How The Faceless Prompts creates, reviews, updates, sources, and corrects guides, prompt resources, and tool information.",
    }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="Editorial Policy" updated="7 October 2026">
      <LegalSection heading="Why our content exists">
        <p>
          The Faceless Prompts publishes practical resources for creators who plan videos, images,
          scripts, and repeatable faceless-content workflows. Pages are written to help a creator
          make a decision or complete a task, not simply to target a search phrase.
        </p>
      </LegalSection>

      <LegalSection heading="Who creates the content">
        <p>
          Articles, prompt guides, niche playbooks, and tool pages are published by The Faceless
          Prompts editorial team. We do not use invented expert identities, fabricated credentials,
          or fictional first-hand experiences. When a page depends on a named external policy or
          platform rule, we prefer the platform's own documentation as the source of record.
        </p>
      </LegalSection>

      <LegalSection heading="How AI is used">
        <p>
          AI may be used as a drafting aid for outlines, wording alternatives, prompt variations,
          and content organization. AI output is not treated as a factual source. Material claims,
          platform-policy statements, and current product details should be checked against reliable
          sources before publication, and generated examples are reviewed for usefulness and safety.
        </p>
        <p>
          We do not claim that every external tool has been personally tested. When hands-on testing
          or first-hand experience is relevant, the page should say what was actually tested rather
          than imply experience that did not occur.
        </p>
      </LegalSection>

      <LegalSection heading="How guides and prompt pages are reviewed">
        <p>
          We review pages for a clear purpose, original practical value, readable structure,
          internally consistent examples, and links that help readers take a next step. Prompt pages
          include customization and review guidance because a generated result is a draft, not a
          guarantee of accuracy, originality, platform approval, or performance.
        </p>
      </LegalSection>

      <LegalSection heading="Sources and changing information">
        <p>
          For rules that can change—such as YouTube monetization, advertising policies, privacy
          requirements, or software features—we prefer first-party documentation and date-sensitive
          wording. A guide may link to the official source so readers can verify the current rule.
          Product prices, feature availability, and free tiers can change without notice; verify them
          with the provider before purchasing or building a workflow around them.
        </p>
      </LegalSection>

      <LegalSection heading="Affiliate relationships and recommendations">
        <p>
          Commercial relationships do not change the standard used for editorial claims. Affiliate
          links are disclosed, and outbound affiliate links are marked for search engines. A listing
          or referral link is not a promise that a product is the best option for every creator.
          See the Affiliate Disclosure for more detail.
        </p>
      </LegalSection>

      <LegalSection heading="Corrections and updates">
        <p>
          If a factual error, broken link, outdated policy statement, or misleading description is
          identified, we aim to correct the page and update its revision date when the change is
          meaningful. If you spot an issue, send the page address and a short explanation through the
          Contact page.
        </p>
      </LegalSection>

      <LegalSection heading="What we do not promise">
        <p>
          We do not guarantee rankings, views, RPM, revenue, virality, AdSense approval, YouTube
          monetization, or acceptance by any third-party platform. Creator results depend on the
          final work, audience, niche, execution, compliance, and factors outside this site's control.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
