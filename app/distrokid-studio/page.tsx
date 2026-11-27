import DistrokidStudio from '@/components/distrokid/DistrokidStudio';
import { Breadcrumbs, JsonLd } from '@/components/Shared';
import { metadataFor, webApplicationJsonLd } from '@/lib/site';

const path = '/distrokid-studio';
const title = 'Distrokid Studio';
const description = 'Check audio for catalog matches, convert video to audio, compile clips, and create a title and cover for your next release.';

export const metadata = metadataFor(path, title, description);

export default function Page() {
  return (
    <div className="container page-content">
      <Breadcrumbs items={[{ label: 'Free tools', href: '/free-tools' }, { label: title, href: path }]} />
      <DistrokidStudio />
      <JsonLd data={webApplicationJsonLd(path, title, description)} />
    </div>
  );
}
