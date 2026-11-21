import Link from 'next/link';
import {notFound} from 'next/navigation';
import AuthorByline from '@/components/AuthorByline';
import DedicatedFreeTool from '@/components/DedicatedFreeTool';
import styles from '@/components/DedicatedFreeTool.module.css';
import {Breadcrumbs, Faq, JsonLd, PageIntro} from '@/components/Shared';
import {FREE_TOOL_PAGES, getFreeToolPage} from '@/data/freeToolPages';
import {NICHES_DATA} from '@/data/niches';
import {getNicheGuide} from '@/data/nicheGuides';
import {faqJsonLd, metadataFor, webApplicationJsonLd} from '@/lib/site';

type Props = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return FREE_TOOL_PAGES.map(tool => ({slug: tool.slug}));
}

export async function generateMetadata({params}: Props) {
  const tool = getFreeToolPage((await params).slug);
  return tool ? metadataFor('/free-tools/' + tool.slug, tool.seoTitle, tool.description) : {};
}

export default async function Page({params}: Props) {
  const tool = getFreeToolPage((await params).slug);
  if (!tool) notFound();
  const path = '/free-tools/' + tool.slug;
  const niches = tool.slug === 'voiceover-length-calculator' ? [] : NICHES_DATA.map(niche => ({
    id: niche.id,
    label: niche.title,
    cue: getNicheGuide(niche.slug)?.episodeStructure[0]?.description ?? 'Keep the subject visible at phone size.',
  }));

  return <div className="container page-content">
    <Breadcrumbs items={[{label: 'Free tools', href: '/free-tools'}, {label: tool.title, href: path}]}/>
    <PageIntro eyebrow="Free creator tools" title={tool.title} description={tool.intro}/>
    <div className="free-tools-layout">
      <DedicatedFreeTool slug={tool.slug} niches={niches}/>
      <AuthorByline/>
      <article className="prose">
        {tool.sections.map(section => <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
        </section>)}
        {tool.samples.length > 0 && <section>
          <h2>Sample scripts by niche</h2>
          {tool.samples.map(sample => <div key={sample.title}>
            <h3>{sample.title}</h3>
            <p>{sample.summary}</p>
            <ol>{sample.beats.map(beat => <li key={beat}>{beat}</li>)}</ol>
          </div>)}
        </section>}
        {tool.pacingTable && <section>
          <h2>Word count by video duration</h2>
          <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Estimated narration word counts">
            <table className={styles.table}>
              <thead><tr>{tool.pacingTable.headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
              <tbody>{tool.pacingTable.rows.map(([duration, ...words]) => <tr key={duration}>
                <th scope="row">{duration}</th>{words.map((word, index) => <td key={index}>{word}</td>)}
              </tr>)}</tbody>
            </table>
          </div>
        </section>}
        <section>
          <h2>Common questions</h2>
          <Faq items={tool.faq}/>
        </section>
        <section>
          <h2>Continue planning your video</h2>
          <ul>{tool.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
        </section>
      </article>
    </div>
    <JsonLd data={webApplicationJsonLd(path, tool.title, tool.description)}/>
    <JsonLd data={faqJsonLd(tool.faq)}/>
  </div>;
}
