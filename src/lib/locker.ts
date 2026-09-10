// ─────────────────────────────────────────────────────────────
// CPA CONTENT LOCKER INTEGRATION POINT
//
// To go live:
//   1. Paste your CPA network's content locker <script> snippet
//      into src/routes/__root.tsx, inside the marked placeholder
//      block in the <body> (there is no index.html in this stack).
//   2. Replace the `callLocker()` stub below with the function
//      your network exposes (e.g. og_load(), CPABuildLock(), etc.).
//
// OGAds, CPAGrip, CPAlead, AdBlueMedia and similar networks all
// follow this pattern: paste a script, then call one global
// function when the user clicks "unlock".
// ─────────────────────────────────────────────────────────────

declare global {
  interface Window {
    /** Common content locker entry points exposed by CPA networks. */
    og_load?: () => void;
    CPABuildLock?: () => void;
    call_locker?: () => void;
  }
}

/**
 * Triggers the installed CPA content locker (playabledownloads.com).
 *
 * The network's script loads call_locker() asynchronously via its
 * preloader, so when it isn't ready yet we poll briefly and fire it
 * as soon as it appears. Returns false only when the locker script
 * itself is missing from the page (nothing to wait for).
 */
export function openContentLocker(): boolean {
  if (typeof window === "undefined") return false;

  // Ready now — trigger immediately.
  if (typeof window.call_locker === "function") {
    window.call_locker();
    return true;
  }

  // The include script is present but call_locker isn't defined yet —
  // poll until the preloader finishes (max ~8s), then trigger it.
  if (document.querySelector('script[src*="playabledownloads.com"]')) {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      if (typeof window.call_locker === "function") {
        window.clearInterval(timer);
        window.call_locker();
      } else if (Date.now() - startedAt > 8000) {
        window.clearInterval(timer);
        console.warn("[CPA Locker] call_locker() not available yet.");
      }
    }, 250);
    return true;
  }

  console.warn("[CPA Locker] call_locker() not available yet.");
  return false;
}
