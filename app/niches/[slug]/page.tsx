import AuthorByline from '@/components/AuthorByline';
import CopyButton from '@/components/CopyButton';
import FieldTestNote from '@/components/FieldTestNote';
import SampleOutputs from '@/components/SampleOutputs';
import {Breadcrumbs, Faq, JsonLd, PageIntro} from '@/components/Shared';
import {getArticleGuide} from '@/data/articleGuides';
import {getNicheGuide} from '@/data/nicheGuides';
import {NICHE_IMAGES} from '@/data/nicheImages';
import {getNichePage, NICHE_LINKS, NICHE_PAGES} from '@/data/niches';
import {START_PATHS} from '@/data/startPaths';
import {getPrimaryVideoForGuide} from '@/data/videos';
import {articleAuthor, founderPerson} from '@/lib/authors';
import {getRelatedNiches} from '@/lib/relatedNiches';
import {getSampleOutputs} from '@/lib/sampleOutputs';
import {faqJsonLd, metadataFor, SITE_NAME, SITE_URL} from '@/lib/site';
import {notFound} from 'next/navigation';

type Props = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return NICHE_PAGES.map(({slug}) => ({slug}));
}

export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  const niche = getNichePage(slug);
  return niche ? metadataFor('/niches/' + slug, niche.name + ' Prompts & Video Playbook',
    getNicheGuide(slug)?.searchSummary || niche.metaDescription, 'article', NICHE_IMAGES[slug]) : {};
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  const niche = getNichePage(slug);
  if (!niche) notFound();

  const path = '/niches/' + slug;
  const url = SITE_URL + path;
  const sampleOutputs = await getSampleOutputs(path, niche.sampleOutputs);
  const content = getNicheGuide(slug);
  const related = getRelatedNiches(NICHE_LINKS, slug);
  const guideSlug = START_PATHS.find(item => item.niche === slug)?.guide || (
    /asmr|ambient|music/.test(slug) ? 'faceless-content-workflow'
      : /horror|mystery|crime|wisdom|bible/.test(slug) ? 'avoid-generic-ai-videos' : 'write-ai-video-prompts'
  );
  const guide = getArticleGuide(guideSlug);
  const lesson = getPrimaryVideoForGuide(guideSlug);
  const topic = content?.videoIdeas[0] || niche.prompts[0]?.title || niche.name;
  const studio = '/studio?niche=' + encodeURIComponent(slug) + '&topic=' + encodeURIComponent(topic);
  const publisher = articleAuthor(SITE_NAME, 'Organization');

  return (
    <div className="container page-content">
      <Breadcrumbs items={[{label: 'Niches', href: '/niches'}, {label: niche.name, href: path}]}/>
      <PageIntro eyebrow="Niche playbook" title={niche.name} description={content?.searchSummary || niche.intro}>
        <div className="button-row">
          <a className="button" href={studio}>Plan a video in this niche ↗</a>
          <span className="pill">{niche.difficulty === 'Easy' ? 'Beginner friendly' : niche.difficulty === 'Medium' ? 'Some experience' : 'More involved'}</span>
        </div>
      </PageIntro>
      <AuthorByline authorName={SITE_NAME} authorType="Organization"/>
      <div className="article-layout">
        <article className="prose">
          <section id="overview">
            <h2>Start with the viewer promise.</h2>
            <p>{niche.intro}</p>
            {content && <div className="callout">
              <h3>{content.promise}</h3>
              <p><strong>Who it may suit</strong> {content.audience}</p>
              <p><strong>Formats to try</strong> {content.bestFormats.join(' · ')}</p>
            </div>}
          </section>
          <SampleOutputs samples={sampleOutputs}/>
          {content && <>
            <section id="angles">
              <h2>Make the channel distinct.</h2>
              {content.channelAngles.map(angle => (
                <div key={angle.title}><h3>{angle.title}</h3><p>{angle.description}</p></div>
              ))}
            </section>
            <section id="ideas">
              <h2>Ideas for your first episodes</h2>
              <ul>{content.videoIdeas.map(idea => (
                <li key={idea}><a href={'/studio?niche=' + slug + '&topic=' + encodeURIComponent(idea)}>{idea}</a></li>
              ))}</ul>
            </section>
            <section id="structure">
              <h2>Build a repeatable episode.</h2>
              <div className="step-list">{content.episodeStructure.map((step, index) => (
                <div className="step-item" key={step.title}>
                  <span>0{index + 1}</span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                </div>
              ))}</div>
            </section>
          </>}
          <section id="prompts">
            <h2>Editable scene examples</h2>
            <p>Keep one action per clip. Use the camera and lighting cues as a starting point and change one setting per take so you can see what improved.</p>
            {niche.prompts.map(prompt => (
              <div className="prompt-example" key={prompt.title}>
                <h3>{prompt.title}</h3>
                <h4>Narration / character direction</h4>
                <p>{prompt.character}</p>
                <h4>Image prompt</h4>
                <p>{prompt.visual}</p>
                <CopyButton text={prompt.visual} label="Copy image prompt"/>
                <h4>Motion prompt</h4>
                <p>{prompt.camera}</p>
                <CopyButton text={prompt.camera} label="Copy motion prompt"/>
              </div>
            ))}
          </section>
          <FieldTestNote note={niche.fieldTest}/>
          {content && <section id="quality">
            <h2>Before you publish</h2>
            <ul>{content.qualityChecks.map(check => <li key={check}>{check}</li>)}</ul>
            <p>For factual content, keep a source record and verify the narration. For fictional scenes, make the presentation clear to your audience.</p>
          </section>}
          <section id="questions">
            <h2>Common questions</h2>
            <Faq items={niche.faqs}/>
          </section>
          <section id="next-steps">
            <h2>Keep building this video</h2>
            <div className="related-grid">
              {guide && <a className="related-card" href={'/guides/' + guide.slug}>{guide.title} ↗</a>}
              {lesson && <a className="related-card" href={'/videos/' + lesson.slug}>Watch: {lesson.title} ↗</a>}
              <a className="related-card" href="/prompts/video-generation">Browse video prompt templates ↗</a>
            <a className="related-card" href="/free-tools/faceless-video-script-generator">Draft a faceless video script ↗</a>
              <a className="related-card" href="/start-here">Follow the beginner checklist ↗</a>
            </div>
          </section>
          <section id="related">
            <h2>Explore another direction</h2>
            <div className="related-grid">{related.map(item => (
              <a className="related-card" href={'/niches/' + item.slug} key={item.slug}>{item.name} ↗</a>
            ))}</div>
            <a className="button" href={studio}>Make your first plan ↗</a>
          </section>
        </article>
        <aside className="toc">
          <h2>In this playbook</h2>
          <a href="#overview">Audience & promise</a>
          {content && <><a href="#angles">Channel angles</a><a href="#ideas">Episode ideas</a><a href="#structure">Episode structure</a></>}
          <a href="#prompts">Prompt examples</a>
          {content && <a href="#quality">Quality checks</a>}
          <a href="#questions">Common questions</a>
          <a href="#next-steps">Guides, prompts & lessons</a>
          <a className="button button-small" href={studio}>Use this niche ↗</a>
        </aside>
      </div>
      <JsonLd data={{
        '@type': 'Article',
        '@id': url + '#article',
        headline: niche.name + ' Creator Playbook',
        description: content?.searchSummary || niche.metaDescription,
        url,
        mainEntityOfPage: {'@type': 'WebPage', '@id': url},
        author: publisher,
        publisher,
        editor: founderPerson(),
        image: SITE_URL + (NICHE_IMAGES[slug]?.src || '/social-cover.jpg'),
      }}/>
      {niche.faqs.length > 0 && <JsonLd data={faqJsonLd(niche.faqs)}/>}
    </div>
  );
}
