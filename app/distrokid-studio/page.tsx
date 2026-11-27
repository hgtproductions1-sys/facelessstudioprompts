import DistrokidStudio from '@/components/distrokid/DistrokidStudio';
import { EarningMethodsTutorial, StudentOffer } from '@/components/distrokid/ReleaseResources';
import { Breadcrumbs, JsonLd } from '@/components/Shared';
import { metadataFor, webApplicationJsonLd } from '@/lib/site';

const path = '/distrokid-studio';
const title = 'Distrokid Studio';
const description = 'Compile videos into one audio master, generate a release title and cover, check for catalog matches, and download the English or Tagalog tutorial.';

export const metadata = metadataFor(path, title, description);

export default function Page() {
  return (
    <div className="container page-content">
      <Breadcrumbs items={[{ label: 'Free tools', href: '/free-tools' }, { label: title, href: path }]} />
      <DistrokidStudio offer={<StudentOffer />} />
      <EarningMethodsTutorial />
      <JsonLd data={webApplicationJsonLd(path, title, description)} />
    </div>
  );
}
