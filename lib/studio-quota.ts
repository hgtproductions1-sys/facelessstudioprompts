/** Reserved for future authenticated Studio usage. */
export type StudioPlanTier = 'free' | 'pro';

export interface StudioQuotaState {
  tier: StudioPlanTier;
  liveBlueprintsRemaining: number | null;
  resetsAt: string | null;
}
