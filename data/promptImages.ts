import artwork from './promptImages.generated.json';

export type PromptImage = {src: string; alt: string; width: number; height: number};
export const PROMPT_IMAGES: Readonly<Record<string, PromptImage | undefined>> = artwork;

export function getPromptImage(id: string) {
  return PROMPT_IMAGES[id];
}
