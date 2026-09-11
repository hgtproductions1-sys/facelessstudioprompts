# Simplify the generator into a clean 3-step output

Refactor the results area so every blueprint comes back as three focused, equally weighted steps: script and voice, one master image prompt, and a shot-by-shot video prompt list.

## 1. Remove Step 04

- Delete `src/components/site/EnginePrompts.tsx` and its render + import in `src/routes/index.tsx`.
- The AI Tools Hub page keeps using the tool config, so that config stays.

## 2. Step 01 — Script & Voiceover

In `src/components/site/CharacterCard.tsx`:

- Title becomes "Script & Voiceover", subtitle describes voice profile plus cue sheet.
- Remove the Archetype chips, Consistency Score bar, Physical Description block, and Wardrobe & Props block.
- Keep: Voice & Delivery Profile spec grid, Hook Script, Voiceover Cue Sheet with bracketed pacing tags, Retention Beats, existing CTAs, and Copy All (rewritten to match the new contents).

## 3. Step 02 — Master Image Prompt

- Add a `masterPrompt` field to the visual section of the package (`src/lib/generator.ts`), built as one engine-neutral, highly detailed paragraph (subject, wardrobe/prop detail, environment, lighting, lens, style DNA, aspect ratio). Existing per-engine fields stay in the data model so the text export and tools hub keep working.
- Ask the model for `masterPrompt` in the API schema and rules (`src/routes/api/generate.ts`), sanitised to one paragraph with no engine flags; fall back to the existing Leonardo paragraph when the model omits it.
- `VisualCard.tsx` renders only two large blocks: **Master Prompt** and **Negative Prompt**, each with its own copy button, plus Copy All. Style DNA chips, render-flag grid, per-engine blocks, consistency-token reroll, and negative-prompt chip library are removed.

## 4. Step 03 — Video Generation Prompts

In `src/components/site/CameraCard.tsx`:

- Title becomes "Video Generation Prompts", subtitle mentions Runway/Kling-ready shots.
- Remove the Sequence Overview grid, the pacing/transition line under each shot, and the Camera Rig Cheat Sheet.
- Keep a numbered list of standalone shot prompts in the `[Camera Motion] + [Subject Action] + [Environment & Lighting]` form, each with a copy button, plus Sound Design & Music Cues and the CTAs.

## 5. Layout

- Desktop keeps the equal 3-column grid (`lg:grid-cols-3`) with the three cards stretched to equal height.
- Below `lg`, the three steps render as a simple 3-tab switcher (Script / Image / Video) so mobile users see one step at a time, with copy buttons intact.

## Technical notes

- `packageToText` in `src/lib/generator.ts` is updated so the exported .txt and "Copy Full Package" mirror the new three sections (master prompt instead of three engine prompts, no archetype/wardrobe block).
- Type change is additive (`masterPrompt: string`), so the local fallback generator, GLM path, and Lovable AI path all produce it.
