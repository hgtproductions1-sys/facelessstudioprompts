import { notFound, permanentRedirect } from 'next/navigation';
import PromptExplorer from '@/components/PromptExplorer';
import PromptDirectory from '@/components/PromptDirectory';
import { Breadcrumbs, PageIntro, Cta, JsonLd } from '@/components/Shared';
import { PROMPTS } from '@/data/promptLibrary';
import { PROMPT_COLLECTIONS } from '@/data/promptPages';
import { metadataFor, SITE_URL } from '@/lib/site';
import { PROMPTS_PER_PAGE, promptPageHref, promptPageNumber } from '@/lib/prompt-pagination';

type Query = Record<string, string | string[] | undefined>;
type Props = { searchParams: Promise<Query> };
const title = 'Free AI Prompt Library for Faceless Creators';
const description = 'Browse editable AI image, video, character, and YouTube prompts. Search the free library, save templates, and customize prompts for your next video.';
const totalPages = Math.ceil(PROMPTS.length / PROMPTS_PER_PAGE);
const filters = ['category', 'q', 'level', 'tool', 'format'] as const;
const queryValue = (value: Query[string]) => typeof value === 'string' ? value : value?.[0];

function resolvePage(query: Query) {
  const page = promptPageNumber(query.page);
  if (page === null) permanentRedirect('/prompts');
  if (page > totalPages) notFound();
  return page;
}

export async function generateMetadata({ searchParams }: Props) {
  const query = await searchParams;
  const page = resolvePage(query);
  if (filters.some(key => Boolean(queryValue(query[key])))) {
    const metadata = metadataFor('/prompts', title, description);
    return { ...metadata, robots: { index: false, follow: true } };
  }
  return metadataFor(
    promptPageHref(page),
    page === 1 ? title : title + ' — Page ' + page,
    page === 1 ? description : 'Browse page ' + page + ' of ' + totalPages + ' in the free AI prompt library, with editable creator templates for images, videos and YouTube.',
  );
}

function Pagination({ page }: { page: number }) {
  return <nav className="prompt-pagination" aria-label="Prompt library pagination">
    {page > 1 && <a className="button button-outline" href={promptPageHref(page - 1)} rel="prev">Previous</a>}
    {Array.from({ length: totalPages }, (_, index) => {
      const number = index + 1;
      return <a className="button button-outline" key={number} href={promptPageHref(number)}
        aria-label={'Page ' + number} aria-current={page === number ? 'page' : undefined}>{number}</a>;
    })}
    {page < totalPages && <a className="button button-outline" href={promptPageHref(page + 1)} rel="next">Next</a>}
  </nav>;
}

export default async function Page({ searchParams }: Props) {
  const query = await searchParams;
  const page = resolvePage(query);
  const canonical = filters.some(key => Boolean(queryValue(query[key]))) ? '/prompts' : promptPageHref(page);
  return <div className="container page-content">
    <Breadcrumbs items={[{ label: 'Prompt library', href: '/prompts' }]}/>
    <PageIntro eyebrow={PROMPTS.length + ' editable starting points'} title="Find your next good prompt."
      description="From the first hook to the final frame. Search, save, and customize templates for the work you want to make."/>
    <div className="category-links">
      {PROMPT_COLLECTIONS.map(collection => <a href={'/prompts/' + collection.slug} key={collection.slug}>{collection.label} ↗</a>)}
    </div>
    <PromptExplorer key={page} prompts={PROMPTS} validIds={PROMPTS.map(prompt => prompt.id)}
      initialCategory={queryValue(query.category)} initialQuery={queryValue(query.q)}
      initialLevel={queryValue(query.level)} initialTool={queryValue(query.tool)}
      initialFormat={queryValue(query.format)}
      browseWindow={{ offset: (page - 1) * PROMPTS_PER_PAGE, size: PROMPTS_PER_PAGE }}
      pagination={<Pagination page={page}/>}/>
    <PromptDirectory/>
    <div className="footer-spacer"/>
    <Cta/>
    <JsonLd data={{ '@type': 'CollectionPage', name: 'Free AI Prompt Library', url: SITE_URL + canonical,
      description: 'Editable prompts for image generation, video generation, characters, and YouTube planning.' }}/>
  </div>;
}
