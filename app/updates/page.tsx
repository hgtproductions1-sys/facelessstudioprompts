import Link from 'next/link';
import {Breadcrumbs, PageIntro} from '@/components/Shared';
import {PRODUCT_UPDATES} from '@/data/productUpdates';
import {metadataFor} from '@/lib/site';

export const metadata = metadataFor('/updates', 'Product updates', 'Dated updates to The Faceless Prompts video planning tools and creator resources.');

export default function Updates() {
  return <div className="container page-content">
    <Breadcrumbs items={[{label: 'Product updates', href: '/updates'}]}/>
    <PageIntro eyebrow="Product updates" title="What’s new in the project." description="A short record of changes to the tools and creator resources."/>
    <div className="footer-spacer"/>
    <article className="prose legal-prose">
      {PRODUCT_UPDATES.map(update => <section key={update.date}>
        <p className="article-meta"><time dateTime={update.date}>{new Date(update.date + 'T00:00:00Z').toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'})}</time></p>
        <h2>{update.title}</h2>
        {update.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <p><Link href="/studio">Open the Video Planning Studio ↗</Link></p>
      </section>)}
      <p><Link href="/contact">Share feedback or report an issue ↗</Link></p>
    </article>
  </div>;
}
