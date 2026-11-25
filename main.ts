// World News — Wednesday 25 November 2026 (Node 22, standard library only).
// The entry image is entry.png beside this file; this program copies it to
// /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB and
// 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Validate before copying: a whole PNG (magic bytes) of at most 1 MiB.
const bytes = readFileSync(source);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(pngMagic)) {
  console.error('entry.png is not a PNG file');
  process.exit(1);
}
if (statSync(source).size > 1048576) {
  console.error(`${statSync(source).size} bytes, over the 1 MiB limit`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, 'entry.png'));
