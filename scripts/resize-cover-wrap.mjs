/**
 * Re-sizes a finished KDP cover wrap to the exact size KDP asks for.
 *
 *   node scripts/resize-cover-wrap.mjs <wrap.pdf> <out.pdf> <width-in> <height-in>
 *
 * KDP computes the wrap from the page count and the binding, and its number is
 * not always the one the cover was built to: 21 Women of the Bible was drawn at
 * 14.303 x 10.417in for the hardcover and KDP wanted 14.361, and 12.787 x 9.250
 * for the paperback against its 12.847. The previewer refuses the file over a
 * difference that small.
 *
 * So the wrap is rendered at 300dpi and redrawn at the size KDP named. The
 * stretch is a fraction of a percent on the width only - invisible on a printed
 * cover, and the wrap area it lands in folds round the board anyway.
 */
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import PDFDocument from "pdfkit";
import fs from "node:fs";

const SRC = process.argv[2];
const OUT = process.argv[3];
const W_IN = Number(process.argv[4]);
const H_IN = Number(process.argv[5]);
const DPI = 300;

const doc = await pdf(SRC, { scale: 300 / 72 });
let page;
for await (const image of doc) { page = image; break; }

const px = { w: Math.round(W_IN * DPI), h: Math.round(H_IN * DPI) };
const stretched = await sharp(page).resize(px.w, px.h, { fit: "fill" }).jpeg({ quality: 92 }).toBuffer();

const out = new PDFDocument({ size: [W_IN * 72, H_IN * 72], margin: 0 });
const stream = fs.createWriteStream(OUT);
out.pipe(stream);
out.image(stretched, 0, 0, { width: W_IN * 72, height: H_IN * 72 });
out.end();
await new Promise((r) => stream.on("finish", r));
console.log(`${W_IN} x ${H_IN} in at ${DPI}dpi -> ${OUT} (${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB)`);
