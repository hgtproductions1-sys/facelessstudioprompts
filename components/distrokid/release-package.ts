import { Zip, ZipPassThrough } from 'fflate';

export async function buildReleaseZip(files: { name: string; blob: Blob }[], signal: AbortSignal) {
  const chunks: Blob[] = [];
  const zip = new Zip((error, data) => {
    if (error) throw error;
    chunks.push(new Blob([data as Uint8Array<ArrayBuffer>]));
  });

  try {
    for (const { name, blob } of files) {
      signal.throwIfAborted();
      const entry = new ZipPassThrough(name);
      zip.add(entry);
      const reader = blob.stream().getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          signal.throwIfAborted();
          if (done) break;
          entry.push(value);
        }
        entry.push(new Uint8Array(0), true);
      } finally {
        await reader.cancel();
        reader.releaseLock();
      }
    }
    zip.end();
    signal.throwIfAborted();
    return new Blob(chunks, { type: 'application/zip' });
  } catch (error) {
    zip.terminate();
    throw error;
  }
}
