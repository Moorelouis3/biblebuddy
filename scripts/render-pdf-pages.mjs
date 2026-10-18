/**
 * Renders chosen pages of a PDF to PNGs, so a book proof can actually be looked
 * at rather than described.
 *
 *   node scripts/render-pdf-pages.mjs book.pdf ./out 1 3 5
 */
import { pdf } from "pdf-to-img";
import fs from "node:fs";

const [file, outDir, ...wanted] = process.argv.slice(2);
if (!file || !outDir || !wanted.length) {
  console.error("Usage: node scripts/render-pdf-pages.mjs <file.pdf> <out-dir> <page> [page...]");
  process.exit(1);
}

const pages = new Set(wanted.map(Number));
const last = Math.max(...pages);
const document = await pdf(file, { scale: 2 });

let index = 0;
for await (const image of document) {
  index += 1;
  if (pages.has(index)) fs.writeFileSync(`${outDir}/p${index}.png`, image);
  if (index >= last) break;
}
console.log("rendered", [...pages].join(", "));
