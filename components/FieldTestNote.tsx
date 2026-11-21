import Image from 'next/image';
import config from '@/config/editorial.json';
import {editorialDate} from '@/lib/authors';
import {normalizeFieldTest, type FieldTestNote as TestNote} from '@/lib/fieldTest';
import {sampleAssetUrl} from '@/lib/sampleOutput';
import styles from './FieldTestNote.module.css';

export default function FieldTestNote({note}: {note?: TestNote}) {
  const content = normalizeFieldTest(note, src => sampleAssetUrl(src, 'image', config));
  if (!content) return null;
  const {title, toolVersion, testedDate, takeOneIssue, promptFixApplied, takeTwoOutcome, before, after} = content;
  const frames = [
    before ? {image: before, label: 'Take 1'} : null,
    after ? {image: after, label: 'Take 2'} : null,
  ].filter(frame => frame !== null);
  const date = editorialDate(testedDate)?.label ?? testedDate;
  return (
    <section className={styles.note} aria-labelledby="field-test-note">
      <h2 id="field-test-note">{title}</h2>
      <p className="muted small">{toolVersion} · Tested <time dateTime={testedDate}>{date}</time></p>
      <dl className={styles.results}>
        <div><dt>Take 1 issue</dt><dd>{takeOneIssue}</dd></div>
        <div><dt>Prompt change</dt><dd>{promptFixApplied}</dd></div>
        <div><dt>Take 2 outcome</dt><dd>{takeTwoOutcome}</dd></div>
      </dl>
      {frames.length > 0 && <div className={styles.frames}>{frames.map(({image, label}) => (
        <figure key={label}>
          <Image {...image} sizes="(max-width: 640px) 100vw, 370px" loading="lazy"/>
          <figcaption>{label}</figcaption>
        </figure>
      ))}</div>}
    </section>
  );
}
