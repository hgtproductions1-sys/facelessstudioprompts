import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { LegalLayout, LegalSection } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () => pageHead({ path: "/affiliate-disclosure", title: "Affiliate Disclosure — The Faceless Prompts", description: "How referral links and advertising may support The Faceless Prompts." }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="Affiliate Disclosure" updated="6 October 2026">
      <LegalSection heading="Some links can earn us a commission">
        <p>{"Some links on The Faceless Prompts are affiliate or referral links. If you follow one and make a qualifying purchase or sign up, we may receive a commission or other referral benefit. This can help support the site."}</p>
        <p>{"A referral commission does not add a separate fee from us to your purchase. The provider sets the final price, discounts, and subscription conditions, so check those details before paying."}</p>
      </LegalSection>
      <LegalSection heading="What a mention means">
        <p>{"Our guides and tool listings help you explore options for image generation, video production, voiceover, and related tasks. A listing does not mean that we have personally tested every feature or that a tool will suit every creator. Compare current features, pricing, licensing, and terms with your needs."}</p>
      </LegalSection>
      <LegalSection heading="Independent of the tools we list">
        <p>{"Mentioning a platform does not mean that it owns, approves, or sponsors this site. Referral relationships may exist where we use affiliate links. Product names and trademarks belong to their respective owners."}</p>
      </LegalSection>
      <LegalSection heading="Advertising and your choice">
        <p>{"Where advertising appears, it is separate from the content and generator results. An ad is not a guarantee about the advertiser or its product. You are free to visit a provider directly, use a different tool, or decide not to buy."}</p>
      </LegalSection>
      <LegalSection heading="Ask about a link">
        <p>{"If you want to know whether a particular link is a referral link, send us its page address and the tool name. Questions about a purchase, cancellation, or refund should go to the provider that took your payment."}</p>
      </LegalSection>
      <div className="border-line bg-surface2 rounded-xl border p-6"><p className="text-sm text-ink-muted">Contact The Faceless Prompts</p><a href="mailto:hgtproductions1@gmail.com" className="mt-2 inline-block break-all text-base font-medium text-cyan underline underline-offset-4">hgtproductions1@gmail.com</a></div>
    </LegalLayout>
  );
}
