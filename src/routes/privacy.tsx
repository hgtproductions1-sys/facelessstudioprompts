import { pageHead } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

const TITLE = "Privacy Policy — The Faceless Prompts";
const DESC =
  "How The Faceless Prompts handles your data: client-side processing, cookies, affiliate networks, and your GDPR and CCPA rights.";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead({ path: "/privacy", title: TITLE, description: DESC, type: "article" }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 January 2025">
      <LegalSection heading="1. Data We Collect">
        <p>
          The Faceless Prompts is a client-side tool. The niche and topic you enter into the
          generator are processed entirely in your browser — they are never transmitted to our
          servers, stored in a database, or shared with a third party. Closing the tab discards
          them.
        </p>
        <p>
          We may collect standard, non-identifying analytics data such as page views, referring
          domain, approximate region, device type, and browser version to understand how the tool is
          used.
        </p>
      </LegalSection>

      <LegalSection heading="2. Cookies & Tracking">
        <p>
          We use a small number of cookies and similar technologies: strictly necessary cookies for
          the site to function, analytics cookies to measure aggregate usage, and affiliate tracking
          cookies set by partner networks when you click an outbound offer link. Affiliate cookies
          typically record that a visit originated here so a commission can be attributed.
        </p>
        <p>
          You can block or delete cookies through your browser settings. Doing so does not affect
          your ability to use the generator.
        </p>
      </LegalSection>

      <LegalSection heading="3. Third-Party Affiliate Networks">
        <p>
          Outbound offer links may pass through affiliate networks and merchant sites that operate
          under their own privacy policies. Once you leave this site, the receiving party controls
          what data it collects. We never sell personal data, and we do not receive your payment
          details from any partner.
        </p>
      </LegalSection>

      <LegalSection heading="4. Your Rights (GDPR & CCPA)">
        <p>
          If you are in the EEA or the UK, you have the right to access, correct, port, restrict, or
          erase personal data we hold, and to object to processing based on legitimate interests. If
          you are a California resident, you have the right to know what personal information is
          collected and to opt out of its sale — we do not sell personal information.
        </p>
        <p>
          Because generator inputs never reach us, most requests will confirm that we hold no
          personal data about you beyond aggregate analytics.
        </p>
      </LegalSection>

      <LegalSection heading="5. Data Retention">
        <p>
          Aggregate analytics are retained for up to 26 months and then deleted or further
          aggregated. Generator inputs and outputs are retained for zero seconds beyond your
          browsing session.
        </p>
      </LegalSection>

      <LegalSection heading="6. Contact">
        <p>
          Privacy questions can be sent to{" "}
          <span className="text-cyan">privacy@facelessstudiopro.com</span>. We aim to respond within
          30 days.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
