import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/contact")({
  head: () => pageHead({ path: "/contact", title: "Contact Us — The Faceless Prompts", description: "Contact The Faceless Prompts for support, feedback, partnerships, or privacy enquiries." }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="Contact Us" updated="6 October 2026">
      <LegalSection heading="Get in touch">
        <p>{"Have a question about the generator, an idea for the prompt library, or feedback on a guide? Use the email below to reach the site contact. A clear subject line helps us understand your message."}</p>
      </LegalSection>
      <LegalSection heading="Help with a tool or page">
        <p>{"For a problem with the site, include the page address, what you were trying to do, and what happened. If useful, attach a screenshot and tell us which browser or device you used. Leave out passwords, API keys, and other sensitive information."}</p>
      </LegalSection>
      <LegalSection heading="Partnerships and advertising">
        <p>{"For a collaboration or advertising enquiry, introduce yourself and explain how your proposal would help video creators. Please include the relevant product or website link."}</p>
      </LegalSection>
      <LegalSection heading="Privacy and content concerns">
        <p>{"For a privacy question, data request, or copyright concern, include enough detail for us to locate the relevant information. For content concerns, send the page URL and a short explanation of the issue."}</p>
      </LegalSection>
      <LegalSection heading="Third-party purchases">
        <p>{"Subscriptions, billing, and refunds for external tools are handled by those providers. Contact their support team for account or payment issues; we do not have access to your account with them."}</p>
      </LegalSection>
      <div className="border-line bg-surface2 rounded-xl border p-6"><p className="text-sm text-ink-muted">Email us</p><a href="mailto:hgtproductions1@gmail.com" className="mt-2 inline-block break-all text-base font-medium text-cyan underline underline-offset-4">hgtproductions1@gmail.com</a></div>
    </LegalLayout>
  );
}
