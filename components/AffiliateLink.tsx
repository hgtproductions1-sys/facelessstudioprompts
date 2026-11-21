import type {ReactNode} from 'react';
import {affiliateDisclosureCopy, type ResolvedAffiliate} from '@/lib/affiliates';

export default function AffiliateLink({link, className, children}: {
  link: ResolvedAffiliate;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a className={className} href={link.href} target={link.target} rel={link.rel}>
      {children}
    </a>
  );
}

export function AffiliateDisclosure({links}: {links: readonly ResolvedAffiliate[]}) {
  if (!links.some(link => link.isAffiliateActive)) return null;
  return (
    <p className="notice" data-affiliate-disclosure>
      <strong>Disclosure.</strong> {affiliateDisclosureCopy} <a href="/affiliate-disclosure">Affiliate disclosure ↗</a>
    </p>
  );
}
