import 'server-only';
import {cache} from 'react';
import {createClient, defineQuery} from 'next-sanity';
import {createImageUrlBuilder} from '@sanity/image-url';
import config from '@/config/editorial.json';
import {ARTICLE_GUIDES} from '@/data/articleGuides';
import type {EDITORIAL_QUERY_RESULT} from '@/sanity.types';

// Only server components and route handlers may import this module.
// Draft credentials are never passed to browser components or public queries.
export const editorialEnabled = process.env.SANITY_ENABLED === undefined ? config.enabled : process.env.SANITY_ENABLED === 'true';
export const editorialClient = createClient({
  projectId: config.projectId, dataset: config.dataset, apiVersion: config.apiVersion,
  useCdn: false, perspective: 'published',
});
export const EDITORIAL_QUERY = defineQuery(`*[_type == "editorialPost" && defined(slug.current)] | order(publishedAt desc) {
  _id, _updatedAt, title, "slug": slug.current, section, excerpt, publishedAt,
  authorName, authorType, authorBio, category, takeaways, body, sources, relatedGuideSlugs,
  seoTitle, seoDescription, "cover": cover{alt, "url": asset->url, "dimensions": asset->metadata.dimensions}
}`);
export type EditorialPost = NonNullable<EDITORIAL_QUERY_RESULT>[number];
const sourceGuideSlugs = new Set(ARTICLE_GUIDES.filter(g => !(config.migratedGuideSlugs as string[]).includes(g.slug)).map(g => g.slug));

export const getEditorialPosts = cache(async (): Promise<EditorialPost[]> => {
  if (!editorialEnabled) return [];
  // No cross-request cache: publication/unpublication must be visible on the next request.
  // React cache deduplicates metadata/page queries within a single render.
  const posts = await editorialClient.fetch<EDITORIAL_QUERY_RESULT>(EDITORIAL_QUERY, {}, {
    cache: 'no-store', perspective: 'published', token: process.env.SANITY_API_READ_TOKEN,
  });
  return posts.filter(p => p.slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) && ['articles','guides'].includes(p.section||'') && !(p.section === 'guides' && sourceGuideSlugs.has(p.slug)) && p.title && p.excerpt && p.authorName && p.publishedAt && Number.isFinite(Date.parse(p.publishedAt)) && Date.parse(p.publishedAt) <= Date.now() && p.body?.length);
});
export async function getEditorialPost(section: 'articles'|'guides', slug: string) {
  return (await getEditorialPosts()).find(p => p.section === section && p.slug === slug) || null;
}
export function editorialPath(post: Pick<EditorialPost,'section'|'slug'>) {
  return `/${post.section === 'guides' ? 'guides' : 'articles'}/${post.slug}`;
}
export function safeContentUrl(value: unknown) {
  if (typeof value !== 'string' || /[\\\u0000-\u0020]/.test(value)) return undefined;
  if (/^\/(?!\/)/.test(value)) return value;
  try { const u = new URL(value); return !u.username&&!u.password&&['https:', 'http:', 'mailto:'].includes(u.protocol) ? value : undefined; }
  catch { return undefined; }
}
export function cmsImageUrl(url: string|undefined|null, width=1280) {
  if (!url) return undefined;
  try { const u=new URL(url); if(u.protocol!=='https:'||u.hostname!=='cdn.sanity.io'||!u.pathname.startsWith(`/images/${config.projectId}/${config.dataset}/`))return undefined;u.searchParams.set('w',String(width));u.searchParams.set('auto','format');u.searchParams.set('fit','max');return u.toString(); }
  catch { return undefined; }
}
const imageBuilder = createImageUrlBuilder({projectId: config.projectId, dataset: config.dataset});
export function cmsBodyImage(ref: unknown, width = 1280) {
  if (typeof ref !== 'string') return undefined;
  const match = /^image-([a-zA-Z0-9]+)-(\d+)x(\d+)-(jpg|jpeg|png|webp|avif)$/.exec(ref);
  if (!match || !Number(match[2]) || !Number(match[3])) return undefined;
  return {url: imageBuilder.image({_type: 'image', asset: {_ref: ref}}).width(width).fit('max').auto('format').url(), width: Number(match[2]), height: Number(match[3])};
}
