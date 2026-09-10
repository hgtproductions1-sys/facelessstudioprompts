import { toast } from "sonner";

/**
 * Every affiliate / CPA destination in the app lives here.
 * TODO: replace each `url` with your real tracking link.
 */
export const AFFILIATES = {
  navbarCreatorStack: {
    label: "Get the Creator Stack",
    url: "https://example.com/creator-stack",
    id: "navbar-creator-stack",
  },
  card1Mid: {
    label: "Get 5,000+ Done-For-You Voiceover Scripts",
    url: "https://example.com/voiceover-scripts",
    id: "card1-mid",
  },
  card1Foot: {
    label: "Unlock AI Voice Studio",
    url: "https://example.com/ai-voice",
    id: "card1-footer",
  },
  card2Mid: {
    label: "Generate These Visuals — Free Credits",
    url: "https://example.com/leonardo",
    id: "card2-mid",
  },
  card2Foot: {
    label: "Download the Prompt Pack",
    url: "https://example.com/prompt-pack",
    id: "card2-footer",
  },
  card3Mid: {
    label: "Animate These Shots in One Click",
    url: "https://example.com/animation",
    id: "card3-mid",
  },
  card3Foot: {
    label: "Try the Animation Engine",
    url: "https://example.com/animation-engine",
    id: "card3-footer",
  },
  finalBanner: {
    label: "Get the Complete Creator Stack",
    url: "https://example.com/creator-stack",
    id: "final-banner",
  },
} as const;

export type AffiliateKey = keyof typeof AFFILIATES;

export function handleCtaClick(id: string) {
  if (typeof console !== "undefined") console.info("[cta]", id);
  toast.success("Opening partner offer…", {
    description: "Affiliate link — we may earn a commission at no cost to you.",
  });
}
