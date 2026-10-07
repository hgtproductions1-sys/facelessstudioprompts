import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => pageHead({ path: "/terms", title: "Terms of Service — The Faceless Prompts", description: "The terms for using The Faceless Prompts and its creative planning resources." }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="Terms of Service" updated="6 October 2026">
      <LegalSection heading="Using this site">
        <p>{"These terms apply to The Faceless Prompts and its generator, prompt library, guides, and other resources. By using the site, you agree to these terms. If you do not agree, please stop using it."}</p>
      </LegalSection>
      <LegalSection heading="Use it responsibly">
        <p>{"Use the site lawfully and respect other people’s privacy and intellectual property. Do not use it to create unlawful or exploitative material, impersonate someone deceptively, or infringe another person’s rights. Do not attempt to bypass protections, disrupt the service, or overload the generator with abusive requests."}</p>
      </LegalSection>
      <LegalSection heading="Prompts and generated drafts">
        <p>{"You may adapt the prompts and production drafts for your own creative projects, including commercial projects, subject to applicable law and any third-party terms. We do not promise that an output is unique, accurate, copyrightable, or free of third-party rights. You are responsible for reviewing your final content and securing any necessary permissions."}</p>
        <p>{"This permission does not grant ownership of the site’s design, software, branding, or collected resources. Third-party names and trademarks belong to their respective owners."}</p>
      </LegalSection>
      <LegalSection heading="External tools and affiliate links">
        <p>{"Links to other tools are provided for convenience. Some are affiliate links, as explained in our Affiliate Disclosure. External services control their own pricing, subscriptions, refunds, availability, and policies. Review their terms before signing up or uploading material."}</p>
      </LegalSection>
      <LegalSection heading="Availability and results">
        <p>{"The service is provided as available. Features and resources may change, and we cannot promise uninterrupted access or error-free output. Prompts are creative starting points, not professional advice or guarantees of views, revenue, monetization, or advertising approval."}</p>
      </LegalSection>
      <LegalSection heading="Responsibility and your rights">
        <p>{"To the extent permitted by applicable law, we are not responsible for indirect losses arising from your use of the site or reliance on its output. Nothing in these terms removes rights or protections that applicable law does not allow to be excluded."}</p>
      </LegalSection>
      <LegalSection heading="Updates and questions">
        <p>{"Changes to these terms will be published here with an updated date. Review this page when using the service. For questions about these terms or a concern about the site, contact us below."}</p>
      </LegalSection>
      <div className="border-line bg-surface2 rounded-xl border p-6"><p className="text-sm text-ink-muted">Contact The Faceless Prompts</p><a href="mailto:hgtproductions1@gmail.com" className="mt-2 inline-block break-all text-base font-medium text-cyan underline underline-offset-4">hgtproductions1@gmail.com</a></div>
    </LegalLayout>
  );
}
