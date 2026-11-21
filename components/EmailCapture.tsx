'use client';

import { useId, useState, type FormEvent } from 'react';
import type { Blueprint } from '@/lib/studioOptions';
import styles from './EmailCapture.module.css';

type Reply = {ok?:boolean; error?:string; confirmation?:boolean; tracker?:string; trackerEmailed?:boolean; subscribed?:boolean};

function EmailForm({ blueprint, offerNewsletter = false }: {blueprint?:Blueprint;offerNewsletter?:boolean}) {
  const id = useId();
  const endpoint=blueprint?'/api/studio-email':'/api/subscribe';
  const [pending,setPending] = useState(false);
  const [reply,setReply] = useState<Reply>({});
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setReply({});
    setPending(true);
    const form = new FormData(event.currentTarget);
    const body = {email:form.get('email'),website:form.get('website'),
      ...(blueprint?{newsletter:form.get('newsletter')==='on',summary:{
        topic:blueprint.topic.slice(0,300),niche:blueprint.niche.slice(0,120),hook:blueprint.hook.slice(0,300),
        shots:blueprint.shots.map(shot=>({title:shot.title.slice(0,120),time:shot.time.slice(0,35),action:shot.action.slice(0,260)})),
      }}:{})};
    try {
      const response = await fetch(endpoint,{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),
      });
      setReply(await response.json() as Reply);
    } catch { setReply({error:'The request could not finish. Please try again.'}); }
    finally { setPending(false); }
  }

  return <form className={styles.form} method="post" action={endpoint} onSubmit={submit}>
    <div className={styles.fields}>
      <label htmlFor={id}>Email address
        <input id={id} name="email" type="email" autoComplete="email" maxLength={254} required/>
      </label>
      <div className={styles.honeypot} aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off"/></label>
      </div>
      <button type="submit" className="button" disabled={pending || reply.ok}>
        {pending?'Sending…':blueprint?'Email blueprint':'Get the tracker'}
      </button>
    </div>
    {blueprint && offerNewsletter && <label className={styles.consent}><input type="checkbox" name="newsletter"/>
      Also send me a weekly faceless production workflow. I can unsubscribe anytime.
    </label>}
    <p className="muted small">{blueprint?'We use your address to send this blueprint.':'Signing up also subscribes you to the weekly workflow email. Unsubscribe anytime.'}{' '}
      <a href="/privacy" className="inline-link">Privacy policy</a>
    </p>
    <div className={styles.status} role="status" aria-live="polite">
      {reply.error && <p className="notice">{reply.error}</p>}
      {reply.ok && blueprint && <p>Blueprint accepted for delivery.
        {reply.subscribed && (reply.confirmation?' Check your inbox to confirm the newsletter signup.':' Newsletter signup accepted.')}
        {reply.subscribed===false && ' The newsletter signup is still pending. Try again from the prompt library.'}
      </p>}
      {reply.ok && !blueprint && <p>{reply.confirmation?'Check your inbox to confirm your signup.':'Signup accepted.'}{' '}
        {reply.trackerEmailed && 'The tracker was accepted for email delivery. '}
        {reply.tracker==='/faceless-production-tracker.csv' && <a className="inline-link" href={reply.tracker} download>Download the tracker</a>}
      </p>}
    </div>
  </form>;
}

export function NewsletterCapture() {
  return <section className={'callout '+styles.newsletter} aria-label="Creator workflow email">
    <div><h2>Get a faceless video workflow each week</h2>
      <p className="muted">Get prompt, pacing, and production notes, plus the free Faceless Production Tracker.</p>
    </div>
    <EmailForm/>
  </section>;
}

export function BlueprintEmail({blueprint,offerNewsletter}:{blueprint:Blueprint;offerNewsletter:boolean}) {
  return <details className={'prompt-quick-preview '+styles.blueprint}>
    <summary>Email this blueprint</summary>
    <EmailForm blueprint={blueprint} offerNewsletter={offerNewsletter}/>
  </details>;
}
