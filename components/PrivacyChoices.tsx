'use client';

import {useEffect, useState} from 'react';

type FundingChoices = {
  callbackQueue: {CONSENT_API_READY: () => void}[];
  showRevocationMessage?: () => void;
};

function fundingChoices() {
  const browser = window as Window & {googlefc?: FundingChoices};
  browser.googlefc ??= {callbackQueue: []};
  browser.googlefc.callbackQueue ??= [];
  return browser.googlefc;
}

export default function PrivacyChoices() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const updateReady = () => {
      if (active) setReady(typeof fundingChoices().showRevocationMessage === 'function');
    };
    const funding = fundingChoices();
    if (typeof funding.showRevocationMessage === 'function') {
      queueMicrotask(updateReady);
    } else {
      funding.callbackQueue.push({CONSENT_API_READY: updateReady});
    }
    return () => { active = false; };
  }, []);

  if (!ready) return null;
  return (
    <button className="footer-privacy-choice" type="button" onClick={() => fundingChoices().showRevocationMessage?.()}>
      Privacy and cookie settings
    </button>
  );
}
