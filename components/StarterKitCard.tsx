import type {StarterKit} from '@/lib/starterKits';

export default function StarterKitCard({kit}: {kit?: StarterKit}) {
  if (!kit) return null;
  return (
    <section id="starter-kit" className="callout">
      <p className="eyebrow">Optional paid starter kit</p>
      <h2>{kit.title}</h2>
      <p>{kit.description}</p>
      <ul className="basic-list">{kit.includes.map(item => <li key={item}>{item}</li>)}</ul>
      <p>The playbook and Instant Blueprint are free to use.</p>
      <a className="button" href={kit.productUrl} target="_blank" rel="sponsored noopener noreferrer">View the starter kit ↗</a>
    </section>
  );
}
