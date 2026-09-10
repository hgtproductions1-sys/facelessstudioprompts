/**
 * Lightweight first-party click tracking.
 * Counts every tool button / CTA banner click in localStorage and forwards the
 * event to Google Tag Manager / gtag when either is present on the page.
 */

const STORE_KEY = "tfp:clicks";

export type ClickRecord = {
  id: string;
  count: number;
  lastAt: string;
};

type Store = Record<string, ClickRecord>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

export function trackClick(id: string, meta: Record<string, string> = {}) {
  if (typeof window === "undefined") return;

  try {
    const store = read();
    const prev = store[id]?.count ?? 0;
    store[id] = { id, count: prev + 1, lastAt: new Date().toISOString() };
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    /* storage unavailable — tracking is best effort */
  }

  const payload = { event: "cta_click", cta_id: id, page: window.location.pathname, ...meta };
  window.dataLayer?.push(payload);
  window.gtag?.("event", "cta_click", payload);
}

/** All recorded clicks, most clicked first. Handy from the browser console. */
export function getClickReport(): ClickRecord[] {
  return Object.values(read()).sort((a, b) => b.count - a.count);
}

if (typeof window !== "undefined") {
  (window as unknown as { tfpClicks: () => ClickRecord[] }).tfpClicks = getClickReport;
}
