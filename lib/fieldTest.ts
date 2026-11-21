import {z} from 'zod';

const evidenceText = z.string().trim().min(1);
const imageDimension = z.number().int().positive().max(2200).optional();

const fieldTestSchema = z.object({
  title: evidenceText.max(160),
  toolVersion: evidenceText.max(100),
  testedDate: evidenceText.regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value
      && timestamp <= Date.now();
  }),
  takeOneIssue: evidenceText.max(1500),
  promptFixApplied: evidenceText.max(3000),
  takeTwoOutcome: evidenceText.max(1500),
  beforeImageSrc: evidenceText.optional(),
  beforeImageAlt: evidenceText.max(300).optional(),
  beforeImageWidth: imageDimension,
  beforeImageHeight: imageDimension,
  afterImageSrc: evidenceText.optional(),
  afterImageAlt: evidenceText.max(300).optional(),
  afterImageWidth: imageDimension,
  afterImageHeight: imageDimension,
});

export type FieldTestNote = z.input<typeof fieldTestSchema>;
type ResolveImage = (value: string) => string | undefined;

function image(src: string | undefined, alt: string | undefined, width: number | undefined,
  height: number | undefined, resolveImage: ResolveImage) {
  if (src === undefined && alt === undefined && width === undefined && height === undefined) return undefined;
  const safeSrc = src && resolveImage(src);
  if (!safeSrc || !alt || !width || !height || width > 1200) return null;
  return {src: safeSrc, alt, width, height};
}

export function normalizeFieldTest(value: unknown, resolveImage: ResolveImage) {
  const parsed = fieldTestSchema.safeParse(value);
  if (!parsed.success) return undefined;
  const data = parsed.data;
  const before = image(data.beforeImageSrc, data.beforeImageAlt, data.beforeImageWidth, data.beforeImageHeight, resolveImage);
  const after = image(data.afterImageSrc, data.afterImageAlt, data.afterImageWidth, data.afterImageHeight, resolveImage);
  if (before === null || after === null) return undefined;
  return {
    title: data.title, toolVersion: data.toolVersion, testedDate: data.testedDate,
    takeOneIssue: data.takeOneIssue, promptFixApplied: data.promptFixApplied, takeTwoOutcome: data.takeTwoOutcome,
    before, after,
  };
}
