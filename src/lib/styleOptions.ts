/**
 * Smart input variables for the generator: output format, visual vibe and pacing.
 * These drive aspect-ratio flags, lighting keywords and camera-motion speed.
 */

export type FormatId = "shorts" | "youtube";
export type VibeId = "cinematic" | "bright" | "hyperreal" | "anime" | "render3d";
export type PacingId = "fast" | "slow";

export interface FormatOption {
  id: FormatId;
  label: string;
  aspectRatio: string;
  resolution: string;
  orientation: string;
}

export interface VibeOption {
  id: VibeId;
  label: string;
  lighting: string;
  style: string;
}

export interface PacingOption {
  id: PacingId;
  label: string;
  camera: string;
  avgShotLength: string;
  wpm: string;
}

export const FORMATS: FormatOption[] = [
  {
    id: "shorts",
    label: "Shorts / TikTok (9:16)",
    aspectRatio: "9:16",
    resolution: "1080x1920",
    orientation: "vertical",
  },
  {
    id: "youtube",
    label: "YouTube (16:9)",
    aspectRatio: "16:9",
    resolution: "1920x1080",
    orientation: "widescreen",
  },
];

export const VIBES: VibeOption[] = [
  {
    id: "cinematic",
    label: "Cinematic / Moody",
    lighting:
      "low-key cinematic lighting, single hard key, deep shadow falloff, volumetric haze, teal and amber grade",
    style: "photoreal 35mm anamorphic, fine film grain, shallow depth of field",
  },
  {
    id: "bright",
    label: "Bright / Clean",
    lighting:
      "bright soft daylight, large diffused key, clean white bounce, airy highlights, minimal shadow",
    style: "crisp commercial photography, clean minimal composition, high clarity",
  },
  {
    id: "hyperreal",
    label: "Hyperreal",
    lighting:
      "razor-sharp studio lighting, crisp specular highlights, high micro-contrast, ultra-detailed textures",
    style: "hyperrealistic 8K macro detail, skin and material pores visible, photographic realism",
  },
  {
    id: "anime",
    label: "Anime / 2D",
    lighting: "cel-shaded rim light, dramatic gradient sky, bold colour blocking, glowing highlights",
    style: "modern anime key art, clean line work, 2D animation cel style",
  },
  {
    id: "render3d",
    label: "3D Render",
    lighting: "soft global illumination, studio HDRI lighting, gentle ambient occlusion, glossy reflections",
    style: "stylised 3D render, Octane/Blender look, subsurface scattering, smooth subdivided geometry",
  },
];

export const PACINGS: PacingOption[] = [
  {
    id: "fast",
    label: "Fast / High-Energy",
    camera: "rapid punch-in, snappy whip motion, quick lateral dolly, high motion energy",
    avgShotLength: "1.5s",
    wpm: "170-185 WPM",
  },
  {
    id: "slow",
    label: "Slow / ASMR",
    camera: "very slow creeping push-in, locked-off breathing zoom, gentle drift, minimal motion",
    avgShotLength: "5s",
    wpm: "105-120 WPM",
  },
];

export interface StyleSelection {
  format?: string;
  vibe?: string;
  pacing?: string;
}

export interface ResolvedStyle {
  format: FormatOption;
  vibe: VibeOption;
  pacing: PacingOption;
}

const DEFAULT_STYLE: ResolvedStyle = {
  format: FORMATS[0] as FormatOption,
  vibe: VIBES[0] as VibeOption,
  pacing: PACINGS[0] as PacingOption,
};

export function resolveStyle(sel?: StyleSelection): ResolvedStyle {
  if (!sel) return DEFAULT_STYLE;
  return {
    format: FORMATS.find((f) => f.id === sel.format) ?? DEFAULT_STYLE.format,
    vibe: VIBES.find((v) => v.id === sel.vibe) ?? DEFAULT_STYLE.vibe,
    pacing: PACINGS.find((p) => p.id === sel.pacing) ?? DEFAULT_STYLE.pacing,
  };
}
