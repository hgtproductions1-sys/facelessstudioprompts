import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

const TITLE = "Contact Us — Faceless Studio Pro";
const DESC =
  "Get in touch with the Faceless Studio Pro team about the generator, partnerships, advertising, or privacy requests.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <LegalLayout title="Contact Us" updated="1 January 2025">
      <LegalSection heading="General & Support">
        <p>
          Questions about the generator, a broken prompt, or a feature request? Email{" "}
          <span className="text-cyan">support@facelessstudiopro.com</span> and we usually reply
          within two business days.
        </p>
      </LegalSection>

      <LegalSection heading="Partnerships & Advertising">
        <p>
          For tool partnerships, sponsorships, or advertising enquiries, email{" "}
          <span className="text-cyan">partners@facelessstudiopro.com</span>.
        </p>
      </LegalSection>

      <LegalSection heading="Privacy & Legal">
        <p>
          Data, privacy, or takedown requests go to{" "}
          <span className="text-cyan">privacy@facelessstudiopro.com</span>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
