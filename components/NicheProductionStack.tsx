import AffiliateLink, {AffiliateDisclosure} from '@/components/AffiliateLink';
import {resolveNicheProductionStack} from '@/lib/affiliates';

export default function NicheProductionStack({slug}: {slug: string}) {
  const stack = resolveNicheProductionStack(slug);
  if (!stack.length) return null;
  return (
    <section id="production-stack" className="callout">
      <h2>Recommended production stack</h2>
      <AffiliateDisclosure links={stack.map(entry => entry.link)}/>
      <ul className="basic-list">
        {stack.map(({tool, role, link}) => (
          <li key={tool}><AffiliateLink link={link}>{link.name}{link.isAffiliateActive && ' (affiliate link)'} ↗</AffiliateLink> · {role}</li>
        ))}
      </ul>
      <a className="text-link" href="/ai-tools-hub">Browse the AI tools directory ↗</a>
    </section>
  );
}
