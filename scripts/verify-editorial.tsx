import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import {getEditorialPosts, safeContentUrl, cmsImageUrl, cmsBodyImage, cmsYoutubeId} from '../lib/editorial';
import Articles, {generateMetadata as indexMetadata} from '../app/articles/page';
import Article from '../app/articles/[slug]/page';
import {GET as sitemap, allPaths} from '../app/sitemap.xml/route';
import {GET as preview} from '../app/api/editorial/enable-preview/route';
import EditorialPost from '../components/EditorialPost';
import config from '../config/editorial.json';
import type {EditorialPost as Post} from '../lib/editorial';

const state: {posts: Post[]; fail: boolean} = {posts: [], fail: false};
(globalThis as unknown as {__cmsFetch: (query: string, params: unknown, options: {perspective: string; cache: string}) => Promise<Post[]>}).__cmsFetch = async (_query, _params, options) => {
  assert.equal(options.perspective, 'published');
  assert.equal(options.cache, 'no-store');
  if (state.fail) throw new Error('CMS unavailable');
  return state.posts;
};
const post: Post = {
  _id: 'acceptance-example', _updatedAt: '2026-11-02T00:00:00Z', title: 'A practical workflow',
  slug: 'practical-workflow', section: 'articles', excerpt: 'Plan, create, and review a useful video.',
  publishedAt: '2026-11-01T00:00:00Z', authorName: 'Test editor', authorType: 'Person', authorBio: null,
  category: 'Creator workflow', takeaways: null, sources: null, relatedGuideSlugs: null,
  seoTitle: null, seoDescription: null, cover: null, youtubeVideo: null,
  body: [{_type: 'block', _key: 'paragraph', style: 'normal', markDefs: [], children: [{_type: 'span', _key: 'text', text: 'A useful introduction.', marks: []}]}],
};
for (const url of ['javascript:alert(1)', 'data:text/html,x', '//evil.test', '/\\evil.test', 'https://user:password@evil.test', '\nhttps://evil.test']) assert.equal(safeContentUrl(url), undefined);
assert.equal(safeContentUrl('/guides'), '/guides');
assert.equal(safeContentUrl('https://example.com/source'), 'https://example.com/source');
assert.equal(cmsImageUrl('https://evil.test/a.jpg'), undefined);
assert.equal(cmsImageUrl('https://cdn.sanity.io/images/other/production/a.jpg'), undefined);
assert.equal(cmsBodyImage('invalid-ref'), undefined);
assert(cmsBodyImage('image-abc123-640x480-png')?.url.includes(`/images/${config.projectId}/${config.dataset}/`));
for (const id of ['../bad', '9nVEfjmDlVk?autoplay=1', '', null]) assert.equal(cmsYoutubeId(id), undefined);
assert.equal(cmsYoutubeId('9nVEfjmDlVk'), '9nVEfjmDlVk');
const lesson = {videoId: '9nVEfjmDlVk', title: 'Creating in Flow', creator: 'Google', description: 'A supporting tutorial.'};
const videoHtml = renderToStaticMarkup(<EditorialPost post={{...post, youtubeVideo: lesson}}/>);
assert(videoHtml.includes('Play Creating in Flow'));
assert(videoHtml.includes('https://www.youtube.com/watch?v=9nVEfjmDlVk'));
assert(videoHtml.includes('By Google'));
assert(!videoHtml.includes('<iframe'), 'YouTube loads only after a visitor clicks play');
const invalidVideoHtml = renderToStaticMarkup(<EditorialPost post={{...post, youtubeVideo: {...lesson, videoId: '../bad'}}}/>);
assert(!invalidVideoHtml.includes('Supporting YouTube lesson'));

const empty = await indexMetadata();
assert.equal((empty.robots as {index: boolean}).index, false);
assert(renderToStaticMarkup(await Articles()).includes('Explore creator guides'));
assert(!(await (await sitemap()).text()).includes('/articles</loc>'));
await assert.rejects(() => Article({params: Promise.resolve({slug: 'missing'})}), /NEXT_HTTP_ERROR_FALLBACK;404/);

state.posts = [post, {...post, _id: 'future', slug: 'future-post', publishedAt: '2999-01-01T00:00:00Z'}, {...post, _id: 'invalid', slug: '../bad'}, {...post, _id: 'empty', body: []}, {...post, _id: 'collision', section: 'guides', slug: 'choose-faceless-youtube-niche'}];
assert.deepEqual((await getEditorialPosts()).map(p => p._id), [post._id]);
assert.equal((await indexMetadata()).robots && ((await indexMetadata()).robots as {index: boolean}).index, true);
const publicHtml = renderToStaticMarkup(await Article({params: Promise.resolve({slug: post.slug!})}));
assert(publicHtml.includes('A useful introduction.'));
assert(publicHtml.includes('application/ld+json'));
const map = await (await sitemap()).text();
for (const path of allPaths()) assert(map.includes(path + '</loc>'), `Existing URL missing: ${path}`);
assert(map.includes('/articles/practical-workflow</loc>'));
assert(!map.includes('/preview/'));

// Unpublish removes the public page and discovery immediately on the next request.
state.posts = [];
await assert.rejects(() => Article({params: Promise.resolve({slug: post.slug!})}), /NEXT_HTTP_ERROR_FALLBACK;404/);
assert(!(await (await sitemap()).text()).includes('/articles/practical-workflow</loc>'));

// An outage must not masquerade as an empty index or successful truncated sitemap.
state.fail = true;
await assert.rejects(() => Articles(), /CMS unavailable/);
assert.equal((await sitemap()).status, 503);
delete process.env.SANITY_API_READ_TOKEN;
assert.equal((await preview(new Request('https://example.com/api/editorial/enable-preview'))).status, 503);
const draftHtml = renderToStaticMarkup(<EditorialPost post={{...post, publishedAt: 'invalid'}} preview/>);
assert(draftHtml.includes('Private draft preview'));
assert(!draftHtml.includes('application/ld+json') || !draftHtml.includes('"@type":"Article"'));
console.log(JSON.stringify({status: 'passed', checks: 'Editorial rendering, safe links/images, dates, publication visibility, sitemap preservation, outage handling and preview setup guard'}));
