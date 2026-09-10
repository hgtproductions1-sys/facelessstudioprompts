import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

const TITLE = "Terms of Service — The Faceless Prompts";
const DESC =
  "The terms covering use of the The Faceless Prompts generator: acceptable use, output ownership, no guarantee of results, and liability limits.";

export const Route = createFileRoute("/terms")({
  head: () => pageHead({ path: "/terms", title: TITLE, description: DESC, type: "article" }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="1 January 2025">
      <LegalSection heading="1. Acceptance of Terms">
        <p>
          By accessing or using The Faceless Prompts you agree to these terms. If you do not agree,
          do not use the site. We may update these terms at any time, and continued use after an
          update constitutes acceptance of the revised version.
        </p>
      </LegalSection>

      <LegalSection heading="2. Acceptable Use">
        <p>
          You agree not to use the tool to produce content that is unlawful, defamatory, harassing,
          hateful, sexually exploitative, or that infringes someone else's rights. You also agree
          not to scrape, resell, or automate bulk access to the generator, and not to misrepresent
          generated output as verified fact.
        </p>
      </LegalSection>

      <LegalSection heading="3. No Guarantee of Results">
        <p>
          The Faceless Prompts produces creative starting points, not outcomes. We make no
          representation that using the output will produce views, followers, revenue, or any
          commercial result. Results vary by effort, niche, execution, and platform conditions
          outside our control.
        </p>
      </LegalSection>

      <LegalSection heading="4. Intellectual Property">
        <p>
          You own the production packages you generate and may use them commercially without
          attribution. The site itself — its code, design, wording, and curated niche datasets —
          remains our property and may not be copied or redistributed as a competing tool.
        </p>
        <p>
          You remain responsible for complying with the terms of any third-party AI service into
          which you paste generated prompts.
        </p>
      </LegalSection>

      <LegalSection heading="5. Third-Party Links">
        <p>
          The site links to third-party tools and offers, some of them affiliate links. We do not
          control those services and are not responsible for their content, pricing, availability,
          or conduct. Any transaction is strictly between you and the third party.
        </p>
      </LegalSection>

      <LegalSection heading="6. Limitation of Liability">
        <p>
          The site is provided "as is" and "as available" without warranties of any kind. To the
          maximum extent permitted by law, we are not liable for indirect, incidental, special, or
          consequential damages, or for lost profits, revenue, data, or goodwill arising from your
          use of the site or its output.
        </p>
      </LegalSection>

      <LegalSection heading="7. Changes to Terms">
        <p>
          We may modify or discontinue any part of the service at any time without notice. Material
          changes to these terms will be reflected in the "Last updated" date above.
        </p>
      </LegalSection>

      <LegalSection heading="8. Governing Law">
        <p>
          These terms are governed by the laws of [Governing Jurisdiction Placeholder], without
          regard to conflict-of-law principles. Disputes will be handled in the courts of that
          jurisdiction.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
