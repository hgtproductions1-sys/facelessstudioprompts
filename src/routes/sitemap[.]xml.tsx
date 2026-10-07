import { createFileRoute } from "@tanstack/react-router";
import { NICHE_SLUGS } from "@/data/niches";
import { PROMPT_COLLECTION_SLUGS, PROMPT_PAGE_SLUGS } from "@/data/promptPages";
import { ARTICLE_GUIDE_SLUGS } from "@/data/articleGuides";
import { SITE_ROUTES, SITE_URL } from "@/lib/seo";

const LAST_MEANINGFUL_UPDATE = "2026-10-07";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          ...SITE_ROUTES,
          ...NICHE_SLUGS.map((s) => `/niches/${s}`),
          ...PROMPT_COLLECTION_SLUGS.map((s) => `/prompts/${s}`),
          ...PROMPT_PAGE_SLUGS.map((s) => `/prompts/${s}`),
          ...ARTICLE_GUIDE_SLUGS.map((s) => `/guides/${s}`),
        ];
        const urls = paths.map(
          (path) =>
            `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${LAST_MEANINGFUL_UPDATE}</lastmod>\n  </url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
