/**
 * Fits a cover design inside the part of a hardcover wrap that is actually seen.
 *
 *   node scripts/fit-hardcover-wrap.mjs <wrap.pdf> <out.pdf> <width-in> <height-in>
 *
 * A KDP hardcover folds 0.7085in of every outer edge around the board, where it
 * is glued down and never seen again. Art drawn flat to the edge - which is what
 * an image generator gives you - loses that much off each side: the 21 Women
 * wrap lost the N of WOMEN and the E of BIBLE (2026-10-18).
 *
 * So the design is scaled to the width that survives, cropped a little top and
 * bottom (sky and steps, never type), and centred. The fold area is filled with
 * a mirrored copy of the edge, so the scenery keeps going round the board
 * instead of showing a white band.
 */
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import PDFDocument from "pdfkit";
import fs from "node:fs";

const [, , SRC, OUT, widthArg, heightArg] = process.argv;
const W_IN = Number(widthArg);
const H_IN = Number(heightArg);
const WRAP_IN = 0.7085; // what folds round the board, per edge
const DPI = 300;

const visible = { w: W_IN - WRAP_IN * 2, h: H_IN - WRAP_IN * 2 };

const doc = await pdf(SRC, { scale: DPI / 72 });
let source;
for await (const image of doc) { source = image; break; }

const px = (inches) => Math.round(inches * DPI);
// Scale to the visible width, then take the middle of the result for the height.
const design = await sharp(source)
  .resize({ width: px(visible.w) })
  .toBuffer();
const designMeta = await sharp(design).metadata();
const cropTop = Math.max(0, Math.round((designMeta.height - px(visible.h)) / 2));

const fitted = await sharp(design)
  .extract({ left: 0, top: cropTop, width: designMeta.width, height: Math.min(designMeta.height, px(visible.h)) })
  .extend({
    top: px(WRAP_IN),
    bottom: px(WRAP_IN),
    left: px(WRAP_IN),
    right: px(WRAP_IN),
    extendWith: "mirror",
  })
  .resize(px(W_IN), px(H_IN), { fit: "fill" })
  .jpeg({ quality: 92 })
  .toBuffer();

const out = new PDFDocument({ size: [W_IN * 72, H_IN * 72], margin: 0 });
const stream = fs.createWriteStream(OUT);
out.pipe(stream);
out.image(fitted, 0, 0, { width: W_IN * 72, height: H_IN * 72 });
out.end();
await new Promise((resolve) => stream.on("finish", resolve));

console.log(
  `design fitted to the visible ${visible.w.toFixed(3)} x ${visible.h.toFixed(3)}in ` +
    `(cropped ${(cropTop / DPI).toFixed(2)}in top and bottom) -> ${OUT} ` +
    `(${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB)`,
);
