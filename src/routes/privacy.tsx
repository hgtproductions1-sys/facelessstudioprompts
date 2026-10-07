import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead({ path: "/privacy", title: "Privacy Policy — The Faceless Prompts", description: "How The Faceless Prompts handles your inputs, email enquiries, browser storage, and third-party services." }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="Privacy Policy" updated="7 October 2026">
      <LegalSection heading="What this policy covers">
        <p>{"This page explains how information is handled when you use The Faceless Prompts. It covers the generator, browser storage, email enquiries, analytics, advertising, and outbound links. External websites and tools have their own privacy policies."}</p>
      </LegalSection>
      <LegalSection heading="Information you enter into the generator">
        <p>{"When you generate a package, your niche, topic, style choices, and variation seed are sent to our server to prepare a response. Those inputs and reference prompts are sent to our configured AI provider through api.hcnsec.cn, or the Lovable AI gateway if configured. If generation fails, we show an error so you can retry."}</p>
        <p>{"The generator does not save your prompts or results to an application database. Hosting services and AI providers may retain request information in their logs. Avoid entering confidential information or sensitive personal details."}</p>
      </LegalSection>
      <LegalSection heading="Messages you send us">
        <p>{"If you email us, we receive your email address, the contents of your message, and any attachments you choose to send. We use that information to respond to your enquiry or handle the issue you raise. Email is handled through Gmail and is subject to Google’s service policies. Please send only the information needed for your enquiry."}</p>
      </LegalSection>
      <LegalSection heading="Browser storage and analytics">
        <p>{"The site stores tool-link click counts and timestamps in your browser’s local storage. You can remove those records by clearing this site’s browser data. Analytics and hosting services may process page addresses, referral information, device and browser details, IP addresses, and approximate location to measure usage, maintain the service, and investigate errors."}</p>
      </LegalSection>
      <LegalSection heading="Advertising cookies and consent choices">
        <p>{"The site includes Google AdSense code. If ads are served, Google and other advertising vendors may use cookies or similar technologies to deliver, personalize, and measure ads based on visits to this and other websites. Your available advertising choices depend on your location and the relevant service."}</p>
        <p>{"Where required, a consent message may be shown before advertising cookies or personalized advertising are enabled. The site owner may use Google Privacy & messaging or another Google-certified consent management platform for regions where Google requires one."}</p>
        <p>Learn how <a className="text-cyan underline" href="https://policies.google.com/technologies/partner-sites">Google uses information from partner sites</a>. Manage personalized advertising through <a className="text-cyan underline" href="https://myadcenter.google.com/">My Ad Center</a>, or visit <a className="text-cyan underline" href="https://www.aboutads.info/choices/">AdChoices</a> for participating third-party advertising providers.</p>
      </LegalSection>
      <LegalSection heading="Embedded YouTube videos">
        <p>Our guides include tutorials hosted on YouTube. Loading an embedded player connects your browser to YouTube and may share technical information such as your IP address, browser details, and the page address. We use YouTube's privacy-enhanced player. Playing a video or opening YouTube is subject to Google's privacy practices.</p>
        <p><a className="text-cyan underline" href="https://policies.google.com/privacy">Read Google's Privacy Policy</a> for information about its handling of this data.</p>
      </LegalSection>
      <LegalSection heading="External tools and referral links">
        <p>{"Following an outbound link takes you to a service that controls its own data collection. Referral links may allow a provider or network to attribute a visit or purchase to this site. Purchases and payment details are handled by the external provider, not by this generator."}</p>
      </LegalSection>
      <LegalSection heading="Retention and your choices">
        <p>{"Generated results remain in the page during your session. Files you export stay on your device until you delete them. Browser click records remain until you clear the site’s storage. Email, hosting, analytics, and AI-provider records follow the settings and retention policies of the relevant service."}</p>
        <p>{"You can manage cookies and storage in your browser. Depending on applicable law, you may have rights to request access, correction, deletion, or restrictions on the use of personal information. Contact us to make a request; we may need information to verify and locate the records involved."}</p>
      </LegalSection>
      <LegalSection heading="Changes and contact">
        <p>{"We may update this policy as the site or its services change. The date above shows the latest revision. Contact us below with privacy questions or requests."}</p>
      </LegalSection>
      <div className="border-line bg-surface2 rounded-xl border p-6"><p className="text-sm text-ink-muted">Contact The Faceless Prompts</p><a href="mailto:hgtproductions1@gmail.com" className="mt-2 inline-block break-all text-base font-medium text-cyan underline underline-offset-4">hgtproductions1@gmail.com</a></div>
    </LegalLayout>
  );
}
