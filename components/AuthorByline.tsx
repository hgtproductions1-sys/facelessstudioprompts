import Link from 'next/link';
import type {ReactNode} from 'react';
import {articleAuthor, editorialDate, FOUNDER_PROFILE} from '@/lib/authors';
import {SITE_NAME} from '@/lib/site';

type Props = {
  updated?: string | null;
  published?: string | null;
  authorName?: string | null;
  authorType?: string | null;
  children?: ReactNode;
};

export default function AuthorByline({updated, published, authorName, authorType, children}: Props) {
  const author = articleAuthor(authorName, authorType);
  const founderIsAuthor = author['@type'] === 'Person' && author.name === FOUNDER_PROFILE.name;
  const firstPublished = editorialDate(published);
  const modified = editorialDate(updated);
  const showUpdated = modified && (!firstPublished || modified.timestamp > firstPublished.timestamp);
  const date = showUpdated ? modified : firstPublished;

  return <div className="article-meta">
    <span>By {founderIsAuthor
      ? <Link className="inline-link" href={FOUNDER_PROFILE.aboutAnchorUrl}>{author.name}</Link>
      : author['@type'] === 'Organization' && author.name === SITE_NAME
        ? <Link className="inline-link" href="/about">{author.name}</Link>
        : author.name}</span>
    {founderIsAuthor ? <span>{FOUNDER_PROFILE.role}</span> : <span>
      Editorial lead <Link className="inline-link" href={FOUNDER_PROFILE.aboutAnchorUrl}>{FOUNDER_PROFILE.name}</Link>
    </span>}
    {date && <span>{showUpdated ? 'Updated' : 'Published'} <time dateTime={date.dateTime}>{date.label}</time></span>}
    {children}
    <Link className="inline-link" href="/editorial-policy">Editorial approach</Link>
  </div>;
}
