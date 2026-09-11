# Add the Variation & Anti-Generic Plan

## What will change

- Extend each generated production package with a `variation` block containing hook style, story structure, pacing profile, editing style, emotional tone, and one copy-paste creator prompt.
- Add a fourth result card named **Variation & Anti-Generic Plan**, using the existing card shell, copy controls, dark-studio styling, and the requested Shuffle icon, labels, note, and affiliate CTA.
- Change the output area to a responsive four-card grid: one column on mobile, two on medium screens, and four on large screens. The variation card will appear last.
- Add the variation plan to both text-export paths so “Export as .txt,” “Copy Full Package,” and the blueprint download remain consistent.
- Expand the loading placeholders to four cards so the loading and completed layouts match.

## Generation behavior

- Add varied option pools for hook style, story structure, pacing, editing, and emotional tone in the local generator, selected from the package seed and niche/topic context rather than one fixed template.
- Pass the regeneration seed through the generation request. Each regeneration already advances that seed; the API will use it so local, GLM, and backup AI generation all receive a different variation directive.
- Extend the AI JSON schema and system rules with the new variation object, requiring a coherent combination tailored to the selected niche/topic and different from the previous seed-driven combination.
- Normalize and sanitize the returned variation fields, falling back to the seeded local plan if an AI response omits or malforms them.

## CTA

- Add a tracked affiliate configuration entry for **Get 50 Done-For-You Video Hooks** using the supplied `https://example.com/hooks` destination, opening in a sponsored new tab like existing partner links.

## Verification

- Run the TypeScript check with zero errors.
- Verify generation and regeneration produce complete variation fields and different combinations.
- Verify the four-card layout at mobile, tablet, and desktop widths, including internal card scrolling and the affiliate link behavior.
