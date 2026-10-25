/**
 * Put Bible Buddy's icon into the generated Android project.
 *
 * The iOS side of this is three lines (scripts/ios-app-icon.sh) because Apple
 * takes one 1024px square and cuts the rest itself. Android does not: it wants
 * an ADAPTIVE icon, which is two layers - a background and a foreground - that
 * the launcher composites and then crops to whatever shape the phone uses, a
 * circle on a Pixel, a squircle on a Samsung, a rounded square elsewhere. Only
 * the middle 72 of the layer's 108 units is guaranteed to survive that crop.
 *
 * Hand Android the flat square instead and the "B" loses its sides on a round
 * launcher. Hand it nothing, which is what `npx cap add android` leaves, and
 * the app wears Capacitor's grey placeholder on the home screen AND in the
 * Play listing.
 *
 * So, from the same native/appstore/app-icon-1024.png the iPhone build uses:
 *
 *   background  the brand blue, flat, as a colour resource - no image needed,
 *               since the source's background is one solid colour
 *   foreground  the white mark alone, on transparency, scaled to sit inside
 *               the safe circle
 *   legacy      ic_launcher / ic_launcher_round, the flat square and a
 *               circular crop of it, for Android 7 and below
 *   play store  a 512px square with no alpha, which is what the listing form
 *               accepts
 *
 * Pulling the mark off its background is done by luminance rather than by
 * matching the blue exactly: the artwork is two-tone, so "how white is this
 * pixel" IS the alpha channel, and reading it that way keeps the anti-aliased
 * edges smooth instead of leaving a blue fringe around every curve.
 *
 * Run after `npx cap add android`, before the build:
 *   node scripts/android-app-icon.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE = process.argv[2] || "native/appstore/app-icon-1024.png";
const RES = "android/app/src/main/res";
const PLAY_ICON = "native/appstore/play-store-icon-512.png";

/** Launcher icons are 48dp, adaptive layers 108dp. These are the multipliers. */
const DENSITIES = [
  { dir: "mdpi", scale: 1 },
  { dir: "hdpi", scale: 1.5 },
  { dir: "xhdpi", scale: 2 },
  { dir: "xxhdpi", scale: 3 },
  { dir: "xxxhdpi", scale: 4 },
];

const LEGACY_DP = 48;
const ADAPTIVE_DP = 108;
/**
 * How much of the 108dp foreground the mark fills.
 *
 * The guaranteed-visible area is a 72dp CIRCLE, and a square does not fit a
 * circle of its own width - a 72dp circle holds a square of only about 51dp
 * (72 / root 2). The first attempt here used 62%, which is 67dp, and the
 * preview showed exactly what that predicts: the top and bottom of the "B"
 * sliced off on a round launcher.
 *
 * At 50% the mark is 54dp. The "B" is roughly 0.8 as wide as it is tall, so
 * its diagonal is about 69dp - inside the circle with a little to spare. It
 * is not small: against the 72dp the user actually sees, the mark reads at
 * three quarters of the icon, which is the proportion Android's own icons
 * use.
 */
const MARK_FRACTION = 0.5;

async function readSource() {
  const { data, info } = await sharp(SOURCE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}

/** The flat colour behind the mark, read off a corner rather than hard-coded. */
function backgroundHex({ data, channels }) {
  const [r, g, b] = [data[0], data[1], data[2]];
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

/**
 * The mark alone: white, with luminance as the alpha channel, cropped to its
 * own bounding box so the scaling below is about the mark and not about
 * however much padding the artwork happens to carry.
 */
async function extractMark(src) {
  const { data, width, height, channels } = src;
  const out = Buffer.alloc(width * height * 4);

  // Everything at or below the background's luminance is fully transparent;
  // pure white is fully opaque; the anti-aliased edge lands in between.
  const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const floor = lum(data[0], data[1], data[2]);
  const span = Math.max(1, 255 - floor);

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const alpha = Math.max(0, Math.min(255, Math.round(((lum(data[i], data[i + 1], data[i + 2]) - floor) / span) * 255)));
      const o = (y * width + x) * 4;
      out[o] = 255;
      out[o + 1] = 255;
      out[o + 2] = 255;
      out[o + 3] = alpha;
      if (alpha > 32) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) throw new Error(`${SOURCE} has no mark to extract - is it a flat colour?`);

  // Squared off around the mark's centre, so the aspect ratio is not changed
  // by the crop and the mark stays centred when it is placed.
  const markWidth = maxX - minX + 1;
  const markHeight = maxY - minY + 1;
  const side = Math.max(markWidth, markHeight);
  const left = Math.max(0, Math.round(minX + markWidth / 2 - side / 2));
  const top = Math.max(0, Math.round(minY + markHeight / 2 - side / 2));
  const size = Math.min(side, width - left, height - top);

  return sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: size, height: size })
    .png()
    .toBuffer();
}

async function write(file, buffer) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, buffer);
}

/** A circular crop, for the round launcher icon on Android 7. */
function circleMask(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );
}

async function main() {
  try {
    await fs.access(RES);
  } catch {
    console.error(`No ${RES} - run 'npx cap add android' first.`);
    process.exit(1);
  }

  const src = await readSource();
  const background = backgroundHex(src);
  const mark = await extractMark(src);

  for (const { dir, scale } of DENSITIES) {
    const legacy = Math.round(LEGACY_DP * scale);
    const adaptive = Math.round(ADAPTIVE_DP * scale);
    const markSize = Math.round(adaptive * MARK_FRACTION);
    const inset = Math.round((adaptive - markSize) / 2);
    const out = `${RES}/mipmap-${dir}`;

    // Adaptive foreground: the mark, centred on transparency.
    await write(
      `${out}/ic_launcher_foreground.png`,
      await sharp({
        create: { width: adaptive, height: adaptive, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
      })
        .composite([{ input: await sharp(mark).resize(markSize, markSize).toBuffer(), top: inset, left: inset }])
        .png()
        .toBuffer(),
    );

    // Legacy square, and the same square cropped to a circle.
    const square = await sharp(SOURCE).resize(legacy, legacy).png().toBuffer();
    await write(`${out}/ic_launcher.png`, square);
    await write(
      `${out}/ic_launcher_round.png`,
      await sharp(square)
        .composite([{ input: circleMask(legacy), blend: "dest-in" }])
        .png()
        .toBuffer(),
    );
  }

  await write(
    `${RES}/values/ic_launcher_background.xml`,
    Buffer.from(
      `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${background}</color>\n</resources>\n`,
    ),
  );

  // The listing icon. Flattened onto the background because the Play Console
  // rejects a 512 with an alpha channel, the same way App Store Connect does.
  await write(
    PLAY_ICON,
    await sharp(SOURCE).resize(512, 512).flatten({ background }).png().toBuffer(),
  );

  console.log(`Installed the Android icon from ${SOURCE}`);
  console.log(`  adaptive background ${background}, mark at ${Math.round(MARK_FRACTION * 100)}% of the 108dp layer`);
  console.log(`  densities: ${DENSITIES.map((d) => d.dir).join(", ")}`);
  console.log(`  play listing icon: ${PLAY_ICON}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
