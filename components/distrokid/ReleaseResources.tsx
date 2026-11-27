import { BookOpen, Download, ExternalLink, GraduationCap } from 'lucide-react';
import { distributionRequirements, studentOfferTerms, studentReferral, tutorialEditions } from '@/lib/distrokid-studio/resources';
import styles from './releaseResources.module.css';

export function StudentOffer() {
  return (
    <aside className={styles.offer} aria-label="DistroKid student discount">
      <div className={styles.offerIcon}><GraduationCap size={26} aria-hidden="true" /></div>
      <div className={styles.offerCopy}>
        <p className={styles.offerLabel}>DistroKid student offer</p>
        <strong>50% off your first year</strong>
        <p>Valid student email required. <a href={studentOfferTerms}>See offer terms</a>.</p>
      </div>
      <div className={styles.offerAction}>
        <a className={styles.offerButton} href={studentReferral} rel="sponsored noopener noreferrer">
          Get the student discount <ExternalLink size={15} aria-hidden="true" />
        </a>
        <p>We may earn a referral fee if you sign up.</p>
      </div>
    </aside>
  );
}

export function EarningMethodsTutorial() {
  return (
    <section id="earning-methods" className={styles.tutorial} aria-labelledby="earning-methods-heading">
      <div className={styles.tutorialIntro}>
        <span className={styles.guideIcon}><BookOpen size={24} aria-hidden="true" /></span>
        <h2 id="earning-methods-heading">Earning Methods Tutorial</h2>
        <p>Download the four-chapter guide covering DistroKid, Douyin, TikTok, and Facebook in your preferred language.</p>
        <p className={styles.terms}>DistroKid requires a <a href={studentOfferTerms}>valid student email</a> for the discount and <a href={distributionRequirements}>permission to distribute the audio</a> you upload.</p>
      </div>
      <ul className={styles.editions} aria-label="PDF editions">
        {tutorialEditions.map(edition => (
          <li key={edition.lang}>
            <a className={styles.edition} href={edition.path} download hrefLang={edition.lang}>
              <Download size={20} aria-hidden="true" />
              <span>
                <strong>Download {edition.language} PDF</strong>
                <small>{edition.description}</small>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
