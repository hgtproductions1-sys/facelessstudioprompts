import { schema } from '@/lib/site';

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema(data) }}/>;
}
