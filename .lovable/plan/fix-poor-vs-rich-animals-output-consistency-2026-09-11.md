# Fix Poor vs. Rich Animals output consistency

## Implementation
- Give animal skits five distinct camera moves and select shots without repeating a movement type consecutively.
- Build every shot from the matching voiceover timestamp and spoken line, using the requested storyboard format.
- Turn paired-animal topics into a capitalized, contextual image-prompt opening instead of inserting the raw topic.
- Replace generic retention copy with comedy-specific beats whose timestamps stay within the cue sheet.
- Constrain and validate variation structure and tone against the niche voice profile, rebuilding only the variation when inconsistent.

## Technical details
- Keep the existing `ProductionPackage` shape and all other niche behavior intact.
- Add focused helper functions in the generator for cue ranges, motion-family checks, animal-pair phrasing, retention timing, and variation compatibility.
- Verify with deterministic Poor vs. Rich Animals generations and a zero-error TypeScript check.