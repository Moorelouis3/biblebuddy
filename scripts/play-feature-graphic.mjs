/**
 * Generate the Google Play feature graphic.
 *
 * Play will not publish a store listing without one: exactly 1024x500, PNG or
 * JPEG, no transparency. It is the banner shown above the screenshots on the
 * store page, and unlike the icon there was no existing asset for it.
 *
 * Built from the same source as the app icon (native/appstore/app-icon-1024.png)
 * and the same brand blue as the Android adaptive icon background, so the
 * listing, the launcher and the splash all agree.
 *
 * Text is drawn as SVG rather than fetched from a font file, so this needs no
 * assets beyond the icon and runs anywhere sharp runs.
 *
 *   node scripts/play-feature-graphic.mjs
 */

import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SOURCE = process.argv[2] || "native/appstore/app-icon-1024.png";
const OUT = "native/appstore/play-feature-graphic-1024x500.png";

const WIDTH = 1024;
const HEIGHT = 500;
/** Same #0056FE the adaptive icon background uses. */
const BRAND = "#0056FE";
const BRAND_DEEP = "#0040C2";

/** The icon sits left, the words right. */
const MARK = 300;
const MARK_X = 72;
const MARK_Y = Math.round((HEIGHT - MARK) / 2);
const TEXT_X = MARK_X + MARK + 64;

async function main() {
  mkdirSync("native/appstore", { recursive: true });

  const background = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
       <defs>
         <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%" stop-color="${BRAND}"/>
           <stop offset="100%" stop-color="${BRAND_DEEP}"/>
         </linearGradient>
       </defs>
       <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
       <!-- Soft shapes so the banner is not a flat rectangle. -->
       <circle cx="${WIDTH - 90}" cy="${HEIGHT - 70}" r="190" fill="#ffffff" opacity="0.06"/>
       <circle cx="${WIDTH - 230}" cy="70" r="110" fill="#ffffff" opacity="0.05"/>
     </svg>`,
  );

  const words = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
       <text x="${TEXT_X}" y="218" fill="#ffffff"
             font-family="Segoe UI, Helvetica, Arial, sans-serif"
             font-size="86" font-weight="800" letter-spacing="-1">Bible Buddy</text>
       <text x="${TEXT_X}" y="286" fill="#ffffff" opacity="0.92"
             font-family="Segoe UI, Helvetica, Arial, sans-serif"
             font-size="38" font-weight="600">Making Bible study easier</text>
       <text x="${TEXT_X}" y="344" fill="#ffffff" opacity="0.72"
             font-family="Segoe UI, Helvetica, Arial, sans-serif"
             font-size="27" font-weight="500">Every chapter explained, verse by verse</text>
     </svg>`,
  );

  // The source icon is a square tile with its own blue field, which shows a
  // hard edge against the gradient. Rounding it reads as an app icon instead
  // of a pasted rectangle.
  const radius = Math.round(MARK * 0.22);
  const roundedMask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${MARK}" height="${MARK}">
       <rect width="${MARK}" height="${MARK}" rx="${radius}" ry="${radius}" fill="#fff"/>
     </svg>`,
  );

  const mark = await sharp(SOURCE)
    .resize(MARK, MARK, { fit: "cover" })
    .composite([{ input: roundedMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(background)
    .composite([
      { input: mark, left: MARK_X, top: MARK_Y },
      { input: words, left: 0, top: 0 },
    ])
    // Play rejects a feature graphic with transparency. flatten() composites
    // the alpha away, removeAlpha() drops the now-pointless channel - without
    // the second call the PNG still reports hasAlpha and gets refused.
    .flatten({ background: BRAND })
    .removeAlpha()
    .png()
    .toFile(OUT);

  const meta = await sharp(OUT).metadata();
  if (meta.width !== WIDTH || meta.height !== HEIGHT) {
    throw new Error(`Expected ${WIDTH}x${HEIGHT}, got ${meta.width}x${meta.height}`);
  }
  console.log(`Wrote ${OUT} (${meta.width}x${meta.height}, alpha: ${meta.hasAlpha})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
