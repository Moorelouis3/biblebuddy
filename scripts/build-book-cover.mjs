/**
 * Builds the KDP cover wrap for a Bible Buddy book - hardcover or paperback -
 * in the style of "21 Women of the Bible": full-bleed art on the front, gold
 * display caps, the subtitle below it, and "WRITTEN BY / LOUIS MOORE III" with
 * "A BIBLE BUDDY STUDY" at the foot.
 *
 *   node scripts/build-book-cover.mjs --format paperback --pages 160 \
 *     --art public/newtempting.png \
 *     --title "The Tempting|of Jesus" \
 *     --subtitle "A 21-day study of the wilderness and the victory that followed" \
 *     --blurb "..." --out "C:/Users/Moore/Downloads/Jesus_Cover_Paperback.pdf"
 *
 * The wrap sizes are solved from the two 21 Women covers rather than from KDP's
 * calculator, so they match a cover Louis has already uploaded and had accepted:
 *
 *   paperback  12.787 x 9.250in at 239 pages -> 12.25 + 0.002252/page, 9.25 tall
 *   hardcover  14.303 x 10.417in at 239 pages -> 13.758 + 0.00228/page, 10.417 tall
 *
 * On a hardcover, 0.7085in of every outer edge wraps round the board and is
 * never seen, which is why the front panel is inset by that much; the paperback
 * only loses the 0.125in bleed.
 */
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import sharp from "sharp";

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
}

const FORMAT = arg("format", "paperback");
const PAGES = Number(arg("pages"));
const ART = arg("art");
const OUT = arg("out");
const TITLE = arg("title", "");
const SUBTITLE = arg("subtitle", "");
const AUTHOR = arg("author", "Louis Moore III");
const BLURB = arg("blurb", "");

if (!PAGES || !ART || !OUT) {
  console.error(
    'Usage: node scripts/build-book-cover.mjs --format <paperback|hardcover> --pages <n> --art <image> --out <file.pdf>',
  );
  process.exit(1);
}

const IN = 72; // points per inch
const TRIM = { width: 6, height: 9 };

const spec =
  FORMAT === "hardcover"
    ? { width: 13.758 + 0.00228 * PAGES, height: 10.417, inset: 0.7085 }
    : { width: 12.25 + 0.002252 * PAGES, height: 9.25, inset: 0.125 };

const W = spec.width * IN;
const H = spec.height * IN;
const INSET = spec.inset * IN;
const PANEL = TRIM.width * IN;
const SPINE = W - INSET * 2 - PANEL * 2;

// Front panel, measured from the left edge of the whole wrap.
const FRONT_X = INSET + PANEL + SPINE;
const SPINE_X = INSET + PANEL;

const INK = "#0d1a2b"; // the dark the back and spine are painted in
const GOLD = ["#f6e2a8", "#d4a339", "#f9edc0"]; // the three stops of the title gradient
const FONTS = {
  display: "public/fonts/Cinzel.ttf",
  body: "node_modules/@fontsource/eb-garamond/files/eb-garamond-latin-400-normal.woff",
  italic: "node_modules/@fontsource/eb-garamond/files/eb-garamond-latin-400-italic.woff",
};

/**
 * The art, cropped to fill the front panel plus everything that wraps round it.
 *
 * --crop-top and --crop-bottom cut a fraction off the source first, which is
 * how a study image that already has a title burned into it can still be used:
 * cut the lettering away and let this cover set the title itself.
 */
async function prepareArt() {
  const width = Math.round((PANEL + INSET) * (300 / 72));
  const height = Math.round(H * (300 / 72));
  const out = path.join(process.env.TEMP || ".", `cover-art-${FORMAT}.png`);
  const meta = await sharp(ART).metadata();

  const cropTop = Number(arg("crop-top", 0));
  const cropBottom = Number(arg("crop-bottom", 0));
  let pipeline = sharp(ART);
  if (cropTop || cropBottom) {
    const top = Math.round(meta.height * cropTop);
    const keep = Math.round(meta.height * (1 - cropTop - cropBottom));
    pipeline = pipeline.extract({ left: 0, top, width: meta.width, height: keep });
  }

  await pipeline.resize(width, height, { fit: "cover", position: "centre" }).png().toFile(out);
  const dpi = Math.round(meta.width / (TRIM.width + 0.25));
  return { file: out, dpi, source: `${meta.width}x${meta.height}` };
}

function goldFill(doc, x, y, width) {
  const gradient = doc.linearGradient(x, y, x + width, y);
  gradient.stop(0, GOLD[0]).stop(0.5, GOLD[1]).stop(1, GOLD[2]);
  return gradient;
}

/**
 * Display caps, centred in a box, gold, with the letterspacing the cover uses.
 * The size comes down until the line fits the panel: a long title has to shrink
 * rather than wrap, or the next line lands on top of it.
 */
function goldLine(doc, text, { x, y, width, size, spacing = size * 0.04, pad = 0.3 * IN }) {
  const upper = text.toUpperCase();
  const box = width - pad * 2;
  doc.font(FONTS.display).fontSize(size);
  const natural = doc.widthOfString(upper, { characterSpacing: spacing });
  if (natural > box) {
    size = size * (box / natural);
    spacing = size * 0.04;
    doc.fontSize(size);
  }
  // Centred by hand: pdfkit wraps a long line when it is given a width, even
  // with lineBreak off, and a wrapped title lands on top of the line below it.
  const drawn = doc.widthOfString(upper, { characterSpacing: spacing });
  doc.fillColor(goldFill(doc, x, y, width));
  doc.text(upper, x + (width - drawn + spacing) / 2, y, {
    lineBreak: false,
    characterSpacing: spacing,
  });
  return y + size * 1.1;
}

const art = await prepareArt();
const doc = new PDFDocument({ size: [W, H], margin: 0, info: { Title: TITLE.replace(/\|/g, " ") } });
const stream = fs.createWriteStream(OUT);
doc.pipe(stream);

// Back and spine first, then the art over the front.
doc.rect(0, 0, W, H).fill(INK);
doc.image(art.file, SPINE_X + SPINE, 0, { width: PANEL + INSET, height: H });

// A thin gold rule where the art meets the spine, as the printed covers have.
doc.rect(SPINE_X + SPINE - 1.5, 0, 1.5, H).fill(GOLD[1]);

// ------------------------------------------------------------------- front

// Scrims, so gold type reads over whatever the art is doing underneath it.
const topScrim = doc.linearGradient(0, 0, 0, H * 0.46);
topScrim.stop(0, "#04080f", 0.82).stop(1, "#04080f", 0);
doc.rect(SPINE_X + SPINE, 0, PANEL + INSET, H * 0.46).fill(topScrim);

const footScrim = doc.linearGradient(0, H * 0.72, 0, H);
footScrim.stop(0, "#04080f", 0).stop(1, "#04080f", 0.86);
doc.rect(SPINE_X + SPINE, H * 0.72, PANEL + INSET, H * 0.28).fill(footScrim);

const titleLines = TITLE.split("|").map((line) => line.trim()).filter(Boolean);
const titleSize = titleLines.length > 1 ? 58 : 66;
let y = INSET + 0.55 * IN;
for (const line of titleLines) {
  y = goldLine(doc, line, { x: FRONT_X, y, width: PANEL, size: titleSize });
}

if (SUBTITLE) {
  doc.font(FONTS.display).fontSize(13).fillColor("#ffffff");
  doc.text(SUBTITLE.toUpperCase(), FRONT_X + 0.35 * IN, y + 14, {
    width: PANEL - 0.7 * IN,
    align: "center",
    lineGap: 5,
    characterSpacing: 0.8,
  });
}

// The author block sits on the bottom edge of the front panel.
const footTop = H - INSET - 1.5 * IN;
doc.font(FONTS.display).fontSize(12).fillColor("#ffffff");
doc.text("WRITTEN BY", FRONT_X, footTop, {
  width: PANEL,
  align: "center",
  lineBreak: false,
  characterSpacing: 2.4,
});
goldLine(doc, AUTHOR, { x: FRONT_X, y: footTop + 20, width: PANEL, size: 30, spacing: 1.2 });
doc.font(FONTS.display).fontSize(11).fillColor("#f2e6c8");
doc.text("A BIBLE BUDDY STUDY", FRONT_X, footTop + 62, {
  width: PANEL,
  align: "center",
  lineBreak: false,
  characterSpacing: 3,
});

// ------------------------------------------------------------------- spine

if (SPINE > 24) {
  doc.save();
  doc.rotate(90, { origin: [SPINE_X + SPINE / 2, H / 2] });
  const spineText = titleLines.join(" ").toUpperCase();
  doc.font(FONTS.display).fontSize(Math.min(18, SPINE * 0.42)).fillColor(GOLD[0]);
  doc.text(spineText, SPINE_X + SPINE / 2 - H / 2, H / 2 - SPINE / 2 + 2, {
    width: H,
    align: "center",
    lineBreak: false,
    characterSpacing: 1.5,
  });
  doc.restore();
}

// -------------------------------------------------------------------- back

const backX = INSET + 0.55 * IN;
const backWidth = PANEL - 1.1 * IN;
doc.font(FONTS.display).fontSize(16).fillColor(GOLD[1]);
doc.text(titleLines.join(" ").toUpperCase(), backX, INSET + 0.7 * IN, {
  width: backWidth,
  align: "center",
  characterSpacing: 2,
  lineGap: 6,
});

if (BLURB) {
  doc.font(FONTS.body).fontSize(12.5).fillColor("#edf1f7");
  doc.text(BLURB, backX, doc.y + 22, { width: backWidth, align: "left", lineGap: 5 });
}

doc.font(FONTS.display).fontSize(10.5).fillColor("#c9bd79");
doc.text("WWW.MYBIBLEBUDDY.NET", backX, H - INSET - 0.75 * IN, {
  width: backWidth,
  align: "center",
  lineBreak: false,
  characterSpacing: 2.5,
});

doc.end();
await new Promise((resolve) => stream.on("finish", resolve));

console.log(
  `${FORMAT} wrap ${spec.width.toFixed(3)} x ${spec.height.toFixed(3)}in at ${PAGES} pages -> ${OUT}` +
    `\n  spine ${(SPINE / IN).toFixed(3)}in, art ${art.source} (about ${art.dpi} dpi on the front panel)`,
);
