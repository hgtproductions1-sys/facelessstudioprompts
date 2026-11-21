import 'server-only';

export function studioAiKey() {
  if (process.env.NEXT_PUBLIC_STUDIO_AI_ENABLED !== 'true') return undefined;
  return process.env.GLM_API_KEY?.trim() || undefined;
}
