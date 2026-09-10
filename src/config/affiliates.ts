import { toast } from "sonner";

/**
 * Affiliate / CPA destinations.
 * TODO: replace every URL below with your real tracking link.
 */
export const AFFILIATE_LINKS: Record<string, string> = {
  // TODO: replace with your tracking link
  "navbar-creator-stack": "https://example.com/offers/creator-stack",
  // TODO: replace with your tracking link
  "card1-voiceover-scripts": "https://example.com/offers/voiceover-scripts",
  // TODO: replace with your tracking link
  "card1-voice-studio": "https://example.com/offers/ai-voice-studio",
  // TODO: replace with your tracking link
  "card2-leonardo-credits": "https://example.com/offers/leonardo-free-credits",
  // TODO: replace with your tracking link
  "card2-prompt-pack": "https://example.com/offers/prompt-pack",
  // TODO: replace with your tracking link
  "card3-animate-shots": "https://example.com/offers/animation-engine",
  // TODO: replace with your tracking link
  "card3-animation-engine": "https://example.com/offers/animation-engine-trial",
  // TODO: replace with your tracking link
  "final-creator-stack": "https://example.com/offers/creator-stack",
  // TODO: replace with your tracking link
  "final-free-resources": "https://example.com/resources",
};

export function handleCtaClick(id: string) {
  toast.success("Opening partner offer…", {
    description: "Affiliate link — we may earn a commission at no cost to you.",
  });
  // In a real deploy: window.open(AFFILIATE_LINKS[id], "_blank", "noopener");
  if (typeof console !== "undefined") console.info("[cta]", id, AFFILIATE_LINKS[id]);
}
