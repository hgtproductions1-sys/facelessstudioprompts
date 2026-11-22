import Link from 'next/link';
import {ArrowUpRight, Layers} from 'lucide-react';
import {NICHE_PREVIEWS, NICHE_PREVIEW_ALTS} from '@/data/nichePreviewMedia';
import {responsiveImage} from '@/lib/images';
import MotionPreview from './MotionPreview';

export type NicheCardData = {
  slug: string;
  name: string;
  description: string;
  difficulty: string;
  category?: string;
  image?: string;
  imageAlt?: string;
};

export default function NicheCard({card, index, autoPreview = false}: {card: NicheCardData; index: number; autoPreview?: boolean}) {
  const {slug, name, description, difficulty, category, image, imageAlt} = card;
  const clip = NICHE_PREVIEWS[slug];
  const art = image && clip ? (
    <MotionPreview clip={clip} poster={'/preview-media/' + clip + '.webp'} alt={NICHE_PREVIEW_ALTS[slug] || imageAlt || name} label={name} className="niche-art" auto={autoPreview}/>
  ) : (
    <div className="niche-art">
      {/* eslint-disable-next-line @next/next/no-img-element -- The responsive WebP sizes are pre-generated. */}
      {image ? <img src={image} {...responsiveImage(image)} alt={imageAlt || name}
        loading="lazy" decoding="async" width="1280" height="720"/> : <>
        <div className="art-ring"/>
        <Layers size={43} strokeWidth={1.2} aria-hidden="true"/>
        {category && <span className="art-code">{category}</span>}
      </>}
    </div>
  );

  return (
    <article className={'niche-card niche-tone-' + index % 6}>
      {art}
      <div className="niche-card-body">
        <span className="pill">{difficulty === 'Easy' ? 'Beginner friendly' : difficulty === 'Medium' ? 'Some experience' : 'More involved'}</span>
        <h3><Link className="niche-card-link" href={'/niches/' + slug}>{name}<ArrowUpRight size={16} aria-hidden="true"/></Link></h3>
        <p className="line-clamp-3 max-sm:line-clamp-none">{description}</p>
      </div>
    </article>
  );
}
