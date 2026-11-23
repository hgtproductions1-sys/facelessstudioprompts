import {getPromptImage} from '@/data/promptImages';
import {responsiveImage} from '@/lib/images';
import styles from './PromptArtwork.module.css';

type PromptReference = {id: string; title: string};

export default function PromptArtwork({prompt, detail = false}: {prompt: PromptReference; detail?: boolean}) {
  const image = getPromptImage(prompt.id);
  if (!image) return null;
  // eslint-disable-next-line @next/next/no-img-element -- Responsive WebP files are generated alongside the original artwork.
  const media = <img src={image.src} {...responsiveImage(image.src, detail
    ? '(max-width: 820px) calc(100vw - 36px), (max-width: 1200px) 65vw, 890px'
    : '(max-width: 520px) calc(100vw - 36px), (max-width: 820px) 50vw, 400px')}
    alt={image.alt} width={image.width} height={image.height}
    loading={detail ? 'eager' : 'lazy'} fetchPriority={detail ? 'high' : undefined} decoding="async"/>;
  return detail ? <figure className={styles.detail}>{media}<figcaption>Visual inspiration for your version of the prompt.</figcaption></figure>
    : <a className={styles.card} href={'/prompts/' + prompt.id} aria-label={'View ' + prompt.title}>{media}</a>;
}

export function RelatedPrompt({prompt}: {prompt: PromptReference}) {
  const image = getPromptImage(prompt.id);
  return <a className={'related-card ' + styles.related} href={'/prompts/' + prompt.id}>
    {/* eslint-disable-next-line @next/next/no-img-element -- Use the pre-generated small cover. */}
    {image && <img src={image.src.replace('.webp', '-480.webp')} alt="" width="1280" height="720" loading="lazy" decoding="async"/>}
    <span>{prompt.title} ↗</span>
  </a>;
}
