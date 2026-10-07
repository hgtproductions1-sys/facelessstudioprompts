import { cp, mkdir, rm, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await cp(".output/server", "dist/server", { recursive: true });
await cp(".output/public", "dist/client", { recursive: true });
await writeFile("dist/server/index.js", 'export { default } from "./index.mjs";\n');
