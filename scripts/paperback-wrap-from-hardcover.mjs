#!/usr/bin/env node
/**
 * Derives a KDP paperback wrap from a finished KDP hardcover wrap.
 *
 *   node scripts/paperback-wrap-from-hardcover.mjs <hardcover.pdf> <out.pdf> <pages> [--trim 6x9] [--paper white|cream]
 *
 * This gap has now cost two books. Louis supplies a hardcover wrap, the
 * paperback needs a different shape, and the whole paperback edition sits
 * blocked on artwork that does not exist (Bible in One Year, 2026-10-24).
 *
 * The two shapes are not a scale of each other, which is why resize-cover-wrap
 * cannot do this:
 *
 *   hardcover  0.7085in folds round the board on every edge, and the spine
 *              zone is wider than the spine because it carries a hinge gap
 *              on each side.
 *   paperback  0.125in of bleed is trimmed off every edge, there is no hinge,
 *              and the spine is exactly pages x paper thickness.
 *
 * So the panels are lifted out of the hardcover art rather than squeezed:
 *
 *   back cover   the 6in panel just inside the left fold
 *   spine        the middle of the hardcover's spine zone, cropped to the
 *                paperback spine width. Only hinge area is lost, which on
 *                every Bible Buddy cover so far is flat background.
 *   front cover  the 6in panel just inside the right fold
 *   bleed        taken from the real artwork inside the fold, not mirrored,
 *                because a hardcover wrap always has 0.7085in of art there.
 *
 * Nothing is stretched, so the spine type keeps its proportions. Render the
 * result and look at it before uploading: if the spine text is wider than the
 * paperback spine, this script cannot save it and the cover has to be redrawn.
 */
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import PDFDocument from "pdfkit";
import fs from "node:fs";

const FOLD_IN = 0.7085; // hardcover board fold, per edge
const BLEED_IN = 0.125; // paperback bleed, per edge
const THICKNESS = { white: 0.002252, cream: 0.0025 }; // inches per page
const DPI = 300;

const [, , SRC, OUT, pagesArg, ...rest] = process.argv;
if (!SRC || !OUT || !pagesArg) {
  console.error("usage: paperback-wrap-from-hardcover.mjs <hardcover.pdf> <out.pdf> <pages> [--trim 6x9] [--paper white|cream]");
  process.exit(1);
}
const flag = (name, fallback) => {
  const i = rest.indexOf(`--${name}`);
  return i === -1 ? fallback : rest[i + 1];
};
const PAGES = Number(pagesArg);
const [TRIM_W, TRIM_H] = String(flag("trim", "6x9")).split("x").map(Number);
const PAPER = flag("paper", "white");
if (!THICKNESS[PAPER]) throw new Error(`paper must be white or cream, got ${PAPER}`);

const spine = PAGES * THICKNESS[PAPER];
const outW = BLEED_IN * 2 + TRIM_W * 2 + spine;
const outH = TRIM_H + BLEED_IN * 2;

const doc = await pdf(SRC, { scale: DPI / 72 });
let source;
for await (const image of doc) { source = image; break; }
const meta = await sharp(source).metadata();

// The hardcover wrap's own size, read back from the raster.
const srcW_IN = meta.width / DPI;
const srcH_IN = meta.height / DPI;
const visibleW = srcW_IN - FOLD_IN * 2;
const spineZone = visibleW - TRIM_W * 2; // spine + both hinges
if (spineZone < spine) {
  throw new Error(`the hardcover's spine zone is ${spineZone.toFixed(3)}in but the paperback spine needs ${spine.toFixed(3)}in. Check the page count.`);
}
if (Math.abs(srcH_IN - FOLD_IN * 2 - TRIM_H) > 0.02) {
  console.warn(`WARNING: hardcover height ${srcH_IN.toFixed(3)}in does not look like ${TRIM_H}in plus two ${FOLD_IN}in folds. Check the trim size.`);
}

const px = (i) => Math.round(i * DPI);
const cut = (leftIn, widthIn) =>
  sharp(source).extract({
    left: px(leftIn),
    top: px(FOLD_IN - BLEED_IN),
    width: px(widthIn),
    height: px(TRIM_H + BLEED_IN * 2),
  }).png().toBuffer();

// Back cover with its outer bleed, the spine, and the front cover with its outer bleed.
const back = await cut(FOLD_IN - BLEED_IN, TRIM_W + BLEED_IN);
const spineStrip = await cut(FOLD_IN + TRIM_W + (spineZone - spine) / 2, spine);
const front = await cut(srcW_IN - FOLD_IN - TRIM_W, TRIM_W + BLEED_IN);

const canvas = await sharp({ create: { width: px(outW), height: px(outH), channels: 3, background: "#000" } })
  .composite([
    { input: back, left: 0, top: 0 },
    { input: spineStrip, left: px(BLEED_IN + TRIM_W), top: 0 },
    { input: front, left: px(BLEED_IN + TRIM_W + spine), top: 0 },
  ])
  .jpeg({ quality: 94 })
  .toBuffer();

const out = new PDFDocument({ size: [outW * 72, outH * 72], margin: 0 });
const stream = fs.createWriteStream(OUT);
out.pipe(stream);
out.image(canvas, 0, 0, { width: outW * 72, height: outH * 72 });
out.end();
await new Promise((r) => stream.on("finish", r));

console.log(`hardcover in : ${srcW_IN.toFixed(3)} x ${srcH_IN.toFixed(3)} in`);
console.log(`spine zone   : ${spineZone.toFixed(3)} in (hinge ${((spineZone - spine) / 2).toFixed(3)} in a side, dropped)`);
console.log(`paperback out: ${outW.toFixed(3)} x ${outH.toFixed(3)} in  spine ${spine.toFixed(3)} in on ${PAPER} at ${PAGES} pages`);
console.log(`${OUT}  (${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB)`);
