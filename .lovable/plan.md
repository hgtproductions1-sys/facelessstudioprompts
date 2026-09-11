# Rewrite the 24 niche generation profiles

## Goal

Make every niche generate from its own complete creative profile, eliminating shared-template language and cross-niche bleed in local, GLM, and fallback output.

## Changes

1. **Create one authoritative profile shape**
   - Extend each `NICHE_PROFILES` entry with `hookFormat`, `voVoiceType`, `voEmotionalRegister`, six `cameraMotions`, three `retentionBeatLabels`, structured `soundDesign`, `imageStyleFlags`, `imageNegativePrompt`, `variationTone`, and `forbiddenVocabulary`.
   - Populate all 24 profiles with the supplied niche-specific values.
   - Remove duplicate creative rules from the older scaffold layer so generation cannot choose between conflicting definitions.

2. **Make local generation profile-driven**
   - Interpolate each niche's hook format with grammar-aware topic handling, including paired subjects for rich-versus-poor animal skits.
   - Start image prompts with a complete contextual sentence instead of the raw topic, and apply the profile's style and negative prompt.
   - Shuffle from six niche motions while preventing adjacent repeats of the same motion type.
   - Build retention beats from the profile's three labels and exact cue-sheet timestamps, never beyond the final payoff.
   - Build sound design from the structured bed track, effects, and silence cue.
   - Generate variation language from the profile tone and replace only the variation field if its emotional tone conflicts.

3. **Enforce profiles in AI generation**
   - Send the complete active profile to both GLM and Lovable AI, including hook, voice, camera, retention, sound, image, variation, and forbidden-language constraints.
   - Scan the complete normalized package for the active niche's forbidden vocabulary.
   - Retry once with the exact detected terms explicitly banned; if the retry still fails, return the profile-driven local package.
   - Preserve the existing provider order and package response shape.

4. **Validate every niche**
   - Add deterministic checks across all 24 niches for six distinct configured motions, no adjacent shot-motion repeats, profile retention labels/timestamps, full-sentence image openings, matching variation tone, and forbidden-language rejection.
   - Run TypeScript with zero errors and focused generation regression tests, including paired-animal parsing and an investigative niche.

## Technical notes

- Keep `ProductionPackage` unchanged; the richer profile is internal generation configuration.
- Treat the profile in `src/lib/generator.ts` as the source of truth and expose a getter for server prompt/validation use.
- Topic placeholders that name roles rather than `{topic}` will be normalized internally while preserving the requested visible hook grammar.
- Existing UI and routes remain unchanged.