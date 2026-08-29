/**
 * Shrink the blog banner PNGs in public/ in place.
 *
 * Louis's banners export at ~2.3MB each. Readers never feel that (next/image
 * serves optimised WebP), but 100MB+ of source art slows every build and every
 * clone. Palette quantisation cuts ~75% of the bytes: the art is flat poster
 * type over a photo, so 256 colours holds the gradients without banding.
 *
 * Safe to re-run - a file is only rewritten when the result is actually
 * smaller, so already-compressed banners are left alone.
 *
 *   npx tsx scripts/compress-blog-banners.ts
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");

async function main() {
  const files = fs
    .readdirSync(PUBLIC_DIR)
    .filter((f) => /-banner\.png$/i.test(f))
    .sort();

  let before = 0;
  let after = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(PUBLIC_DIR, file);
    const originalSize = fs.statSync(filePath).size;
    const buf = await sharp(filePath)
      .png({ compressionLevel: 9, quality: 82, effort: 8, palette: true })
      .toBuffer();

    before += originalSize;

    if (buf.length >= originalSize) {
      after += originalSize;
      skipped += 1;
      continue;
    }

    fs.writeFileSync(filePath, buf);
    after += buf.length;
    const pct = Math.round(100 - (buf.length / originalSize) * 100);
    console.log(
      `${String(pct).padStart(3)}%  ${(originalSize / 1048576).toFixed(2)}MB -> ${(buf.length / 1048576).toFixed(2)}MB  ${file}`,
    );
  }

  console.log(`\n${files.length} banners, ${skipped} already small enough to leave alone`);
  console.log(
    `${(before / 1048576).toFixed(0)}MB -> ${(after / 1048576).toFixed(0)}MB  (${Math.round(100 - (after / before) * 100)}% smaller)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
