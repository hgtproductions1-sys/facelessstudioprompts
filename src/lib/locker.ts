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
 * Triggers the installed CPA content locker.
 * Returns true if a locker function was found and called,
 * false if no locker script is installed yet.
 */
export function openContentLocker(): boolean {
  if (typeof window === "undefined") return false;

  // ── EDIT HERE ─────────────────────────────────────────────
  // Replace the block below with your network's trigger call,
  // e.g.: window.og_load(); return true;
  // ──────────────────────────────────────────────────────────
  const candidates = [window.og_load, window.CPABuildLock, window.call_locker];
  for (const fn of candidates) {
    if (typeof fn === "function") {
      fn();
      return true;
    }
  }

  return false;
}
