export const PROMPTS_PER_PAGE = 18;

export function promptPageNumber(value: string | string[] | undefined): number | null {
  if (value === undefined) return 1;
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value) || value === '1') return null;
  return Number(value);
}

export function promptPageHref(page: number): string {
  return page === 1 ? '/prompts' : '/prompts?page=' + page;
}
