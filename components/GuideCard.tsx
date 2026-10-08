import {ArrowUpRight} from 'lucide-react';
import type {ArticleGuide} from '@/data/articleGuides';
import {GUIDE_IMAGES} from '@/data/guideImages';
import {responsiveImage} from '@/lib/images';

export default function GuideCard({guide,headingLevel='h2'}:{guide:ArticleGuide;headingLevel?:'h2'|'h3'}) {
  const image=GUIDE_IMAGES[guide.slug];
  const Heading=headingLevel;
  return <a className="guide-card" href={'/guides/'+guide.slug}>
    <div className="guide-art">
      {image&&<img src={image.src} {...responsiveImage(image.src)} alt={image.alt} width="1280" height="720" loading="lazy" decoding="async"/>}
      <span className="pill">{guide.category}</span>
    </div>
    <div className="guide-card-body">
      <div className="card-meta"><span>{guide.readMinutes} min read</span><ArrowUpRight size={17}/></div>
      <Heading className="guide-title">{guide.title}</Heading>
      <p>{guide.summary}</p>
    </div>
  </a>;
}
