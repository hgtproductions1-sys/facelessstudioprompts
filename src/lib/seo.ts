export const SITE_URL = "https://www.thefacelessprompts.com";
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
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
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
  "/ai-tools-hub",
  "/contact",
  "/affiliate-disclosure",
  "/privacy",
  "/terms",
] as const;
