import { PDFDocument, PDFName, PDFRawStream, decodePDFRawStream } from "pdf-lib";
import fs from "node:fs";

/**
 * Every page of the 21 Women interior is painted with an off-white rectangle
 * that runs 2pt past the trim on all four sides:
 *
 *   1 .996078 .984314 rg
 *   n -2 -2 436 652 re f*
 *
 * KDP's previewer reads that as an object sitting in the margins and refuses to
 * let the book be approved. The paper is already this colour, so the rectangle
 * is doing nothing but failing the check - this takes it out and leaves every
 * other operator alone.
 */
// Usage: node scripts/strip-pdf-page-background.mjs <interior.pdf> <out.pdf>
const [, , SRC, OUT] = process.argv;
const doc = await PDFDocument.load(fs.readFileSync(SRC));
const BG = /n -2 -2 436 652 re f\*\s*/g;
const COLOUR = /1 \.996078 \.984314 rg\s*/g;

let stripped = 0;
for (const page of doc.getPages()) {
  const contents = page.node.get(PDFName.of("Contents"));
  const resolved = doc.context.lookup(contents);
  const parts = resolved instanceof PDFRawStream ? [contents] : resolved.asArray();

  const rewritten = parts.map((ref) => {
    const part = doc.context.lookup(ref);
    let text = Buffer.from(decodePDFRawStream(part).decode()).toString("latin1");
    if (!BG.test(text)) return ref;
    BG.lastIndex = 0;
    text = text.replace(BG, "").replace(COLOUR, "");
    stripped += 1;
    return doc.context.register(doc.context.flateStream(Buffer.from(text, "latin1")));
  });

  page.node.set(PDFName.of("Contents"), doc.context.obj(rewritten));
}

fs.writeFileSync(OUT, await doc.save());
console.log(`stripped the background from ${stripped} pages -> ${OUT} (${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB)`);
