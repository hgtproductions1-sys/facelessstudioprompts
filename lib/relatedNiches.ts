function rotate<T>(items: T[], seed: number): T[] {
  if (!items.length) return items;
  const offset = seed % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

export function getRelatedNiches<T extends {slug: string; category?: string}>(
  allNiches: readonly T[],
  currentSlug: string,
  count = 3,
): T[] {
  const bySlug = new Map(allNiches.map(niche => [niche.slug, niche]));
  const category = bySlug.get(currentSlug)?.category;
  bySlug.delete(currentSlug);
  const candidates = [...bySlug.values()];
  const limit = Math.min(candidates.length, Math.floor(count));
  if (!(limit > 0)) return [];

  const seed = Array.from(currentSlug).reduce(
    (total, char, index) => total + char.charCodeAt(0) * (index + 1),
    0,
  );
  const sameCategory = category ? candidates.filter(niche => niche.category === category) : [];
  const otherCategories = category ? candidates.filter(niche => niche.category !== category) : candidates;
  const selected = [
    ...rotate(sameCategory, seed).slice(0, 1),
    ...rotate(otherCategories, seed).slice(0, limit - Math.min(1, sameCategory.length)),
  ];
  const picked = new Set(selected.map(niche => niche.slug));
  return [
    ...selected,
    ...rotate(candidates, seed).filter(niche => !picked.has(niche.slug)).slice(0, limit - selected.length),
  ];
}
