export const ADSENSE_CLIENT = "ca-pub-3120853344446369";

/**
 * Add real ad-unit slot IDs from AdSense before enabling manual units.
 * Leaving these blank keeps the reserved manual units out of production while
 * still allowing the site-level AdSense script to be present for ownership review.
 */
export const ADSENSE_SLOTS = {
  leaderboard: "",
  inArticle: "",
} as const;

export function isAdSenseSlotConfigured(slot: string) {
  return /^\d{6,}$/.test(slot) && !/^0+$/.test(slot);
}
