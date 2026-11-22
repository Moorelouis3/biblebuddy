/**
 * The soft side fill for each Bible Cover on wide screens: a small, blurred,
 * darker copy of the cover's picture, made once here because a live CSS blur
 * is too slow to paint behind every page (scripts/verify-bible-covers.ts
 * bans it). Run after adding or changing a cover's art:
 *   node scripts/generate-cover-fills.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const jobs = [];
const opt = "public/skins/optimized";
for (const f of fs.readdirSync(opt).filter((f) => f.endsWith("-mobile.webp"))) {
  jobs.push([path.join(opt, f), path.join(opt, f.replace("-mobile.webp", "-fill.webp"))]);
}
jobs.push(["public/covers/winter-cabin-mobile.webp", "public/covers/winter-cabin-fill.webp"]);

for (const [src, out] of jobs) {
  await sharp(src)
    .resize({ width: 360 })
    .blur(18)
    .modulate({ brightness: 0.62, saturation: 1.15 })
    .webp({ quality: 55 })
    .toFile(out);
  console.log(out, Math.round(fs.statSync(out).size / 1024) + "KB");
}
