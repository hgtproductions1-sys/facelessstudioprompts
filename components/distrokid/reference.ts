export async function readExcerpt(blob: Blob) {
  const bytes = new DataView(await blob.arrayBuffer());
  let offset = 12;
  while (offset + 8 <= bytes.byteLength) {
    const length = bytes.getUint32(offset + 4, true);
    if (offset + 8 + length > bytes.byteLength) break;
    if (bytes.getUint32(offset, false) === 0x64617461) {
      const count = Math.floor(length / 2);
      const samples = new Float32Array(Math.floor(count / 8));
      for (let i = 0; i < samples.length; i++) {
        let sum = 0;
        for (let j = 0; j < 8; j++) sum += bytes.getInt16(offset + 8 + (i * 8 + j) * 2, true);
        samples[i] = sum / (8 * 32768);
      }
      return { duration: count / 22050, samples };
    }
    offset += 8 + length + (length % 2);
  }
  throw new Error('The audio excerpt could not be read.');
}

export function isAudible(samples: Float32Array) {
  let square = 0;
  for (const sample of samples) square += sample * sample;
  return samples.length > 0 && square / samples.length > 0.000001;
}

function correlation(left: Float32Array, right: Float32Array, lag: number, stride: number) {
  const startLeft = Math.max(0, lag);
  const startRight = Math.max(0, -lag);
  const overlap = Math.min(left.length - startLeft, right.length - startRight);
  if (overlap < Math.min(left.length, right.length) * 0.8) return 0;
  let xy = 0;
  let xx = 0;
  let yy = 0;
  for (let i = 0; i < overlap; i += stride) {
    const x = left[startLeft + i];
    const y = right[startRight + i];
    xy += x * y;
    xx += x * x;
    yy += y * y;
  }
  return xx > 0 && yy > 0 ? Math.abs(xy) / Math.sqrt(xx * yy) : 0;
}

export function similarWaveforms(left: Float32Array, right: Float32Array) {
  if (!isAudible(left) || !isAudible(right)) return false;
  const limit = Math.min(2756, Math.floor(Math.min(left.length, right.length) / 5));
  for (let lag = -limit; lag <= limit; lag++) {
    if (correlation(left, right, lag, 53) >= 0.76 && correlation(left, right, lag, 3) >= 0.84) return true;
  }
  return false;
}
