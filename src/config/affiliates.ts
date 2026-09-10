import { toast } from "sonner";

/**
 * Every CTA destination in the app lives here.
 * `internal: true` marks links that stay on this site (open in the same tab).
 */
export const AFFILIATES = {
  navbarCreatorStack: {
    label: "Browse the AI Tools Hub",
    url: "/ai-tools-hub",
    id: "navbar-creator-stack",
    internal: true,
  },
  card1Mid: {
    label: "Voice This Script with ElevenLabs",
    url: "https://try.elevenlabs.io/la852vd4qv68",
    id: "card1-mid",
    internal: false,
  },
  card1Foot: {
    label: "Unlock AI Voice Studio",
    url: "https://try.elevenlabs.io/la852vd4qv68",
    id: "card1-footer",
    internal: false,
  },
  card2Mid: {
    label: "Generate These Visuals on Leonardo.ai",
    url: "https://leonardo.ai",
    id: "card2-mid",
    internal: false,
  },
  card2Foot: {
    label: "Open the Prompt Library",
    url: "/library",
    id: "card2-footer",
    internal: true,
  },
  card3Mid: {
    label: "Animate These Shots in Runway",
    url: "https://runwayml.com",
    id: "card3-mid",
    internal: false,
  },
  card3Foot: {
    label: "Try the Animation Engine",
    url: "https://runwayml.com",
    id: "card3-footer",
    internal: false,
  },
  finalBanner: {
    label: "Explore Every AI Tool We Prompt For",
    url: "/ai-tools-hub",
    id: "final-banner",
    internal: true,
  },
} as const;

export type AffiliateKey = keyof typeof AFFILIATES;

export function handleCtaClick(_id: string, internal = false) {
  if (internal) {
    toast.success("Opening…");
    return;
  }
  toast.success("Opening partner offer…", {
    description: "Affiliate link — we may earn a commission at no cost to you.",
  });
}
