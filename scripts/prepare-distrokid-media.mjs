import { createReadStream, createWriteStream } from "node:fs";
import { copyFile, mkdir, rename, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createGzip } from "node:zlib";

const assetVersion = "ffmpeg-0.12.15-core-0.12.10";
const output = fileURLToPath(new URL(`../public/distrokid-media/${assetVersion}/`, import.meta.url));
const worker = fileURLToPath(import.meta.resolve("@ffmpeg/ffmpeg/worker"));
const core = fileURLToPath(import.meta.resolve("@ffmpeg/core"));
const wasm = fileURLToPath(import.meta.resolve("@ffmpeg/core/wasm"));
const compressed = join(output, "ffmpeg-core.wasm.gz");
const cloudflareLimit = 25 * 1024 * 1024;

export async function prepareDistroKidMedia() {
  await mkdir(output, { recursive: true });
  await Promise.all([
    copyFile(core, join(output, "ffmpeg-core.js")),
    ...["worker.js", "const.js", "errors.js"].map((file) => copyFile(join(dirname(worker), file), join(output, file))),
    writeFile(join(output, "SOURCE.txt"), [
      "FFmpeg.wasm browser worker 0.12.15 (MIT), Copyright (c) 2019 Jerome Wu.",
      "FFmpeg.wasm single-thread core 0.12.10 (GPL-2.0-or-later).",
      "Upstream source and build scripts: https://github.com/ffmpegwasm/ffmpeg.wasm",
      "Core license: https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt",
      "Wrapper license: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/main/LICENSE",
      "",
    ].join("\n")),
  ]);

  const existing = await stat(compressed).catch(() => null);
  if (!existing) {
    // The original WASM exceeds the per-asset limit on the Sites worker host.
    const staging = `${compressed}.${process.pid}.tmp`;
    await pipeline(createReadStream(wasm), createGzip({ level: 9 }), createWriteStream(staging));
    await rename(staging, compressed);
  }
  const binary = await stat(compressed);
  if (binary.size === 0 || binary.size > cloudflareLimit) {
    throw new Error("The compressed Studio audio engine has an invalid asset size.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await prepareDistroKidMedia();
}
