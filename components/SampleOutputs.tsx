import Image from 'next/image';
import SampleVideo from './SampleVideo';
import type {SampleOutputMedia} from '@/lib/sampleOutput';
import styles from './SampleOutputs.module.css';

export function SampleOutputCard({sample}: {sample: SampleOutputMedia}) {
  const maxWidth = Math.min(760, Math.round(720 * sample.width / sample.height));
  const sizes = '(max-width: ' + (maxWidth + 32) + 'px) calc(100vw - 32px), ' + maxWidth + 'px';
  return (
    <figure className={styles.card} style={{maxWidth}}>
      {sample.mediaType === 'image' ? (
        <div className={styles.frame} style={{aspectRatio: sample.width + ' / ' + sample.height}}>
          <Image src={sample.src} alt={sample.alt} fill sizes={sizes} loading="lazy"/>
        </div>
      ) : <SampleVideo sample={sample} sizes={sizes}/>}
      <figcaption className={styles.caption}>
        <p>Generated with {sample.modelUsed}{sample.settingsNote ? ' · ' + sample.settingsNote : ''}</p>
        <p className="muted small">Captured <time dateTime={sample.capturedAt}>{sample.capturedAt}</time></p>
        <details>
          <summary>Exact prompt used</summary>
          <pre>{sample.promptExcerpt}</pre>
        </details>
      </figcaption>
    </figure>
  );
}

export default function SampleOutputs({samples}: {samples?: readonly SampleOutputMedia[]}) {
  if (!samples?.length) return null;
  return (
    <section className={styles.samples} aria-labelledby="sample-outputs">
      <h2 id="sample-outputs">Sample outputs</h2>
      {samples.map(sample => <SampleOutputCard key={sample.id} sample={sample}/>)}
    </section>
  );
}
