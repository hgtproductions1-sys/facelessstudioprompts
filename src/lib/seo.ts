export const SITE_URL = "https://thefacelessprompts.com";
export const SITE_NAME = "The Faceless Prompts";

type PageHeadInput = {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
};

export function pageHead({ path, title, description, type = "website" }: PageHeadInput) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const SITE_ROUTES = [
  "/",
  "/faceless-youtube-automation",
  "/library",
  "/prompts",
  "/guides",
  "/free-tools",
  "/niches",
  "/ai-tools-hub",
  "/about",
  "/editorial-policy",
  "/contact",
  "/affiliate-disclosure",
  "/privacy",
  "/terms",
] as const;
