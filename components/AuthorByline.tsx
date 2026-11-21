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
      ? <a className="inline-link" href={FOUNDER_PROFILE.aboutAnchorUrl}>{author.name}</a>
      : author['@type'] === 'Organization' && author.name === SITE_NAME
        ? <a className="inline-link" href="/about">{author.name}</a>
        : author.name}</span>
    {founderIsAuthor ? <span>{FOUNDER_PROFILE.role}</span> : <span>
      Editorial lead <a className="inline-link" href={FOUNDER_PROFILE.aboutAnchorUrl}>{FOUNDER_PROFILE.name}</a>
    </span>}
    {date && <span>{showUpdated ? 'Updated' : 'Published'} <time dateTime={date.dateTime}>{date.label}</time></span>}
    {children}
    <a className="inline-link" href="/editorial-policy">Editorial approach</a>
  </div>;
}
