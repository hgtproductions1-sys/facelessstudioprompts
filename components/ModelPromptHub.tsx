import {Breadcrumbs, JsonLd, PageIntro} from '@/components/Shared';
import type {ModelHub} from '@/data/modelPromptHubs';
import {getModelHubPrompts} from '@/data/modelPromptHubs';
import {PROMPTS} from '@/data/promptLibrary';
import {CATEGORY_LABELS} from '@/lib/categories';
import {SITE_URL} from '@/lib/site';

export default function ModelPromptHub({hub}: {hub: ModelHub}) {
  const path = '/prompts/' + hub.slug;
  const prompts = getModelHubPrompts(hub, PROMPTS);

  return (
    <div className="container page-content">
      <Breadcrumbs items={[{label: 'Prompt library', href: '/prompts'}, {label: hub.label, href: path}]}/>
      <PageIntro eyebrow="Model prompt library" title={hub.title} description={hub.intro}/>
      <div className="article-layout">
        <article className="prose">
          {hub.sections.map(section => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <section className="callout" aria-labelledby="model-prompt-example">
            <h2 id="model-prompt-example">{hub.example.label}</h2>
            <blockquote>{hub.example.text}</blockquote>
          </section>
          <section id="model-prompt-fixes">
            <h2>Troubleshoot the first draft</h2>
            {hub.failures.map(issue => (
              <div key={issue.heading}>
                <h3>{issue.heading}</h3>
                <p>{issue.symptom} {issue.fix}</p>
              </div>
            ))}
          </section>
          <section id="model-prompt-sources">
            <h2>Official model guidance</h2>
            <ul>{hub.sources.map(source => <li key={source.href}>
              <a href={source.href} rel="noopener noreferrer">{source.label}</a>
            </li>)}</ul>
          </section>
        </article>
        <aside className="toc">
          <h2>Use this model guide</h2>
          <a href="#model-compatible-prompts">Browse compatible templates</a>
          <a href="#model-prompt-example">Read the example</a>
          <a href="#model-prompt-fixes">Troubleshoot the first draft</a>
          <a href="#model-prompt-sources">Check the official guidance</a>
          <a href="/ai-tools-hub">Compare production tools</a>
          <a className="button button-small" href="/studio">Plan in Studio ↗</a>
        </aside>
      </div>
      <section id="model-compatible-prompts" className="section">
        <h2 className="section-title">Compatible prompt templates</h2>
        <p className="muted">Choose a starting template and adapt any references, duration, audio, and aspect ratio to the controls in your version.</p>
        <div className="prompt-grid">{prompts.map(prompt => (
          <article className="prompt-card" key={prompt.id}>
            <p className="eyebrow">{CATEGORY_LABELS[prompt.category]}</p>
            <h3><a href={'/prompts/' + prompt.id}>{prompt.title}</a></h3>
            {prompt.tips && <p>{prompt.tips}</p>}
          </article>
        ))}</div>
      </section>
      <JsonLd data={{
        '@type': 'CollectionPage', url: SITE_URL + path, name: hub.title, description: hub.description,
        mainEntity: {'@type': 'ItemList', itemListElement: prompts.map(({id, title}, index) => ({
          '@type': 'ListItem', position: index + 1, name: title, url: SITE_URL + '/prompts/' + id,
        }))},
      }}/>
    </div>
  );
}
