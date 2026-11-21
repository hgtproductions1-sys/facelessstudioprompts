import {FOUNDER_NAME, SITE_NAME, SITE_URL} from '@/lib/site';

export interface AuthorProfile {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  avatarUrl?: string;
  aboutAnchorUrl: string;
  sameAs: string[];
}

export const FOUNDER_PROFILE: AuthorProfile = {
  id: 'vince-elijah-alvarez',
  name: FOUNDER_NAME,
  role: 'Founder and Editorial Lead',
  shortBio: FOUNDER_NAME + ' leads the creator guides, prompt library, and production-planning tools at The Faceless Prompts.',
  aboutAnchorUrl: '/about#editorial-team',
  sameAs: [],
};

export function founderPerson() {
  const profile = FOUNDER_PROFILE;
  const url = SITE_URL + profile.aboutAnchorUrl;
  return {
    '@type': 'Person' as const,
    '@id': url,
    name: profile.name,
    jobTitle: profile.role,
    url,
    ...(profile.avatarUrl ? {image: new URL(profile.avatarUrl, SITE_URL).href} : {}),
    ...(profile.sameAs.length ? {sameAs: profile.sameAs} : {}),
  };
}

export function articleAuthor(authorName?: string | null, authorType?: string | null) {
  const name = authorName?.trim() || SITE_NAME;
  const type = authorType === 'Person' || authorType === 'Organization'
    ? authorType
    : name === SITE_NAME ? 'Organization' : 'Person';
  if (type === 'Person' && name === FOUNDER_PROFILE.name) return founderPerson();
  if (type === 'Organization' && name === SITE_NAME) {
    return {'@type': type, '@id': SITE_URL + '/#organization', name, url: SITE_URL + '/about'};
  }
  return {'@type': type, name};
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {dateStyle: 'long', timeZone: 'UTC'});
const isoDay = /^\d{4}-\d{2}-\d{2}$/;
const isoTimestamp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/i;
const longEnglishDate = /^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/;

export function editorialDate(input?: string | null) {
  const value = input?.trim();
  if (!value || !(isoDay.test(value) || isoTimestamp.test(value) || longEnglishDate.test(value))) return undefined;
  const legacy = longEnglishDate.test(value);
  const date = new Date(legacy ? value + ' UTC' : value);
  const timestamp = date.getTime();
  if (!Number.isFinite(timestamp)) return undefined;
  const utcDay = date.toISOString().slice(0, 10);
  if (isoDay.test(value) && utcDay !== value) return undefined;
  return {dateTime: legacy ? utcDay : value, label: dateFormatter.format(date), timestamp};
}
