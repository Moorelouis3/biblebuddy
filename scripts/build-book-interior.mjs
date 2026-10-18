/**
 * Typesets a Bible Buddy study as a 6x9 print-ready interior PDF, in the layout
 * of "21 Women of the Bible" (the book Louis published in October 2026).
 *
 *   node scripts/build-book-interior.mjs --study "The Tempting of Jesus" \
 *     --title "The Tempting|of Jesus" \
 *     --subtitle "A 21-DAY STUDY OF THE WILDERNESS|AND THE VICTORY THAT FOLLOWED" \
 *     --out "C:/Users/Moore/Downloads/Tempting_of_Jesus_Interior.pdf"
 *
 * A "|" in --title or --subtitle is a line break on the title page.
 *
 * Every measurement here was read off 21_Women_of_the_Bible_Interior.pdf with
 * pdfjs rather than guessed: 6x9 trim, EB Garamond throughout, a 302pt text
 * block with 65pt side margins, 11.2pt body on 16.3pt leading, letterspaced
 * caps for every heading, a drop cap opening each day, and the folio at the
 * foot.
 *
 * The text comes from the devotional in Supabase, which is where the published
 * edition of a study lives: scripts/apply-proverbs-book-days.ts and
 * apply-tempting-book-days.ts push a book edition back into those same rows, so
 * the app and the book stay one text. It is written in markdown, so this reads
 * markdown - headings, bullets, **bold** and *italic*.
 *
 * Two passes: the first lays the book out to learn which page each day starts
 * on, the second prints it with a table of contents that points somewhere.
 */
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { config } from "dotenv";

config({ path: ".env.local" });

// ---------------------------------------------------------------- arguments

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
}

const STUDY = arg("study");
const OUT = arg("out");
if (!STUDY || !OUT) {
  console.error('Usage: node scripts/build-book-interior.mjs --study "<devotional title>" --out "<file.pdf>"');
  process.exit(1);
}

// ------------------------------------------------------------------- layout

const PAGE = { width: 432, height: 648 }; // 6 x 9 inches
const MARGIN = { left: 65, right: 65, top: 67, bottom: 72 };
const TEXT_WIDTH = PAGE.width - MARGIN.left - MARGIN.right; // 302pt
const BODY_SIZE = 11.2;
const BODY_LEADING = 16.3;
const PARA_GAP = 8;

/** pdfjs reports baselines from the foot of the page; pdfkit draws from its head. */
const fromFoot = (y, size) => PAGE.height - y - size;

const HEAD_Y = fromFoot(606, 8.6); // running head, 0.58in below the trim
const FOLIO_Y = fromFoot(32, 8.6);
const TOP = fromFoot(570, BODY_SIZE); // first line of body on a normal page
const BOTTOM = PAGE.height - MARGIN.bottom;

const FONT_DIR = "node_modules/@fontsource/eb-garamond/files";
const FONTS = {
  display: `${FONT_DIR}/eb-garamond-latin-500-normal.woff`,
  body: `${FONT_DIR}/eb-garamond-latin-400-normal.woff`,
  italic: `${FONT_DIR}/eb-garamond-latin-400-italic.woff`,
  bold: `${FONT_DIR}/eb-garamond-latin-700-normal.woff`,
};

/** Headings in this book are letterspaced caps; the template runs about 0.22em. */
function caps(doc, text, size, y, { font = "display", spacing = size * 0.22 } = {}) {
  doc.font(FONTS[font]).fontSize(size);
  doc.text(text.toUpperCase(), MARGIN.left, y, {
    width: TEXT_WIDTH,
    align: "center",
    lineBreak: false,
    characterSpacing: spacing,
  });
}

// --------------------------------------------------------------- the source

async function fetchStudy(title) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const get = async (query) => {
    const res = await fetch(`${base}/rest/v1/${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return res.json();
  };
  const [study] = await get(
    `devotionals?select=id,title,subtitle,description,total_days&title=eq.${encodeURIComponent(title)}`,
  );
  if (!study) throw new Error(`No devotional titled "${title}"`);
  const days = await get(
    `devotional_days?select=day_number,day_title,devotional_text,bible_reading_book,bible_reading_chapter,bible_reading_start_verse,bible_reading_end_verse,reflection_question&devotional_id=eq.${study.id}&order=day_number.asc`,
  );
  return { study, days };
}

/** "1 John 2:15-17", from the four reading columns. */
function readingReference(day) {
  if (!day.bible_reading_book) return null;
  let ref = `${day.bible_reading_book} ${day.bible_reading_chapter}`;
  if (day.bible_reading_start_verse) {
    ref += `:${day.bible_reading_start_verse}`;
    const end = day.bible_reading_end_verse;
    if (end && end !== day.bible_reading_start_verse) ref += `-${end}`;
  }
  return ref;
}

/** Markdown in, blocks out: headings, bullet lists, Scripture and prose. */
function parseBody(text) {
  const blocks = [];
  for (const raw of String(text || "").replace(/\r\n/g, "\n").split(/\n{2,}/)) {
    const block = raw.trim();
    if (!block) continue;

    const heading = block.match(/^#{1,4}\s+([\s\S]*)$/);
    if (heading) {
      blocks.push({ style: "heading", text: heading[1].replace(/\s*\n\s*/g, " ").trim() });
      continue;
    }

    // Bullets, which the app writes either one per line or run together.
    if (/^[*-]\s+\S/.test(block)) {
      const items = block
        .split(/\n\s*[*-]\s+|\s{2,}[*-]\s+/)
        .map((item) => item.replace(/^[*-]\s+/, "").replace(/\s*\n\s*/g, " ").trim())
        .filter(Boolean);
      if (items.length) {
        blocks.push({ style: "list", items });
        continue;
      }
    }

    blocks.push({
      style: /^["\u201c'>]/.test(block) ? "scripture" : "body",
      text: block.replace(/^>\s*/gm, "").replace(/\s*\n\s*/g, " "),
    });
  }
  return blocks;
}

/** Splits **bold** and *italic* into runs pdfkit can set inside one flowed line. */
function runs(text) {
  const out = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*\n]+\*|_[^_\n]+_)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) out.push({ text: text.slice(last, match.index), weight: "normal" });
    const token = match[0];
    if (token.startsWith("**")) out.push({ text: token.slice(2, -2), weight: "bold" });
    else out.push({ text: token.slice(1, -1), weight: "italic" });
    last = match.index + token.length;
  }
  if (last < text.length) out.push({ text: text.slice(last), weight: "normal" });
  return out.filter((run) => run.text.length);
}

/** The verse a day opens on, lifted from its first Scripture paragraph. */
function epigraphFor(blocks) {
  const first = blocks.find((b) => b.style === "scripture");
  if (!first) return null;
  const match = first.text.match(/^["\u201c']([\s\S]+?)["\u201d']\s*\(([^)]+)\)\s*$/);
  if (!match) return null;
  const quote = match[1].trim();
  if (quote.length > 200) return null; // too long to set at 13pt centred
  return { quote, reference: match[2].trim() };
}

// ---------------------------------------------------------------- the press

class Book {
  constructor({ title, subtitle, author, days, tableOfContents }) {
    this.meta = { title, subtitle, author };
    this.days = days;
    this.toc = tableOfContents; // day number -> printed page, or null on pass one
    this.dayStartPages = new Map();
    this.printedPage = 0;
    this.numbering = false;
    this.head = null;

    this.doc = new PDFDocument({
      size: [PAGE.width, PAGE.height],
      margins: { top: MARGIN.top, bottom: MARGIN.bottom, left: MARGIN.left, right: MARGIN.right },
      autoFirstPage: false,
      info: { Title: title.replace(/\|/g, " "), Author: author },
    });
    this.doc.on("pageAdded", () => this.furniture());
  }

  /**
   * Running head and folio, drawn as each page opens. The folio sits below the
   * text box, so the bottom margin comes off while it is drawn - otherwise
   * pdfkit reads it as an overflow and opens another page, and that page opens
   * another, for ever. The font is put back because a page can open in the
   * middle of a flowing paragraph.
   */
  furniture() {
    const doc = this.doc;
    const margins = doc.page.margins;
    const bottom = margins.bottom;
    const font = doc._font;
    const size = doc._fontSize;
    margins.bottom = 0;

    if (this.numbering) this.printedPage += 1;
    if (this.head) caps(doc, this.head, 8.6, HEAD_Y, { spacing: 1.9 });
    if (this.numbering) {
      doc.font(FONTS.display).fontSize(8.6);
      doc.text(`— ${this.printedPage} —`, MARGIN.left, FOLIO_Y, {
        width: TEXT_WIDTH,
        align: "center",
        lineBreak: false,
        characterSpacing: 1.9,
      });
    }

    margins.bottom = bottom;
    if (font) doc._font = font;
    doc.fontSize(size);
    doc.x = MARGIN.left;
    doc.y = TOP;
  }

  page(head = this.head) {
    this.head = head;
    this.doc.addPage();
  }

  /** Is there still room on this page for something this tall? */
  room(points) {
    return this.doc.y + points < BOTTOM;
  }

  paragraph(text, { style = "body", indent = 0, align = "left", gap = PARA_GAP } = {}) {
    const doc = this.doc;
    const base = style === "scripture" ? FONTS.italic : style === "bold" ? FONTS.bold : FONTS.body;
    doc.font(base).fontSize(BODY_SIZE);
    const lineGap = BODY_LEADING - doc.currentLineHeight();
    const options = { width: TEXT_WIDTH - indent, align, lineGap };
    const parts = runs(text);

    if (parts.length <= 1) {
      doc.text(parts[0]?.text ?? text, MARGIN.left + indent, doc.y, options);
    } else {
      let x = MARGIN.left + indent;
      let y = doc.y;
      parts.forEach((run, i) => {
        doc.font(run.weight === "bold" ? FONTS.bold : run.weight === "italic" ? FONTS.italic : base);
        doc.text(run.text, x, y, { ...options, continued: i < parts.length - 1 });
        x = undefined;
        y = undefined;
      });
    }
    doc.y += gap;
  }

  list(items) {
    for (const item of items) this.paragraph(`\u2022   ${item}`, { indent: 18, gap: 4 });
    this.doc.y += PARA_GAP - 4;
  }

  heading(text, size = 13) {
    const doc = this.doc;
    if (!this.room(size + 48)) this.page();
    doc.y += 6;
    caps(doc, text, size, doc.y, { spacing: size * 0.22 });
    doc.y += size + 14;
  }

  // ----------------------------------------------------------- front matter

  titlePage() {
    const doc = this.doc;
    this.head = null;
    this.numbering = false;
    doc.addPage();

    let y = 389;
    for (const line of this.meta.title.split("|").map((l) => l.trim())) {
      doc.font(FONTS.display).fontSize(30);
      doc.text(line, MARGIN.left, fromFoot(y, 30), { width: TEXT_WIDTH, align: "center", lineBreak: false });
      y -= 38;
    }
    this.meta.subtitle
      .split("|")
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((line, i) => caps(doc, line, 10.5, fromFoot(318 - i * 15, 10.5), { spacing: 2.3 }));

    caps(doc, "A Bible Buddy Study", 10.5, fromFoot(150, 10.5), { spacing: 2.3 });
    doc.font(FONTS.body).fontSize(10.5);
    doc.text(`Written by ${this.meta.author}`, MARGIN.left, fromFoot(129, 10.5), {
      width: TEXT_WIDTH,
      align: "center",
      lineBreak: false,
    });
  }

  copyrightPage() {
    const doc = this.doc;
    doc.addPage();
    const year = new Date().getFullYear();
    doc.font(FONTS.body).fontSize(9.5);
    let y = fromFoot(258, 9.5);
    for (const para of [
      `\u00a9 ${year} Bible Buddy`,
      `Written by ${this.meta.author}`,
      "All rights reserved. No part of this book may be reproduced, stored, or transmitted by any means, electronic, mechanical, photocopying, recording, or otherwise, without the written permission of the author, except for brief quotations used in reviews or scholarly works.",
      `First edition ${year}`,
      "www.mybiblebuddy.net",
      "Scripture quotations are from the King James Version, which is in the public domain.",
    ]) {
      const lineGap = 14.2 - doc.currentLineHeight();
      doc.text(para, MARGIN.left, y, { width: TEXT_WIDTH, lineGap });
      y = doc.y + 8;
    }
  }

  contentsPage() {
    const doc = this.doc;
    this.head = `Intro to ${this.meta.title.replace(/\|/g, " ")}`;
    doc.addPage();
    caps(doc, "Contents", 13.5, fromFoot(564, 13.5), { spacing: 3 });

    let y = fromFoot(519, 11);
    for (const day of this.days) {
      if (y > BOTTOM - 20) {
        doc.addPage();
        y = TOP;
      }
      doc.font(FONTS.display).fontSize(9);
      doc.text(`DAY ${day.day_number}`, MARGIN.left, y + 1, { lineBreak: false, characterSpacing: 1.4 });

      doc.font(FONTS.body).fontSize(11);
      const name = day.day_title;
      doc.text(name, MARGIN.left + 52, y, { width: TEXT_WIDTH - 90, lineBreak: false });

      const page = this.toc?.get(day.day_number);
      if (page != null) {
        doc.text(String(page), MARGIN.left, y, { width: TEXT_WIDTH, align: "right", lineBreak: false });
        const from = MARGIN.left + 56 + doc.widthOfString(name);
        const to = MARGIN.left + TEXT_WIDTH - doc.widthOfString(String(page)) - 6;
        if (to > from) {
          doc.fontSize(9);
          const dot = doc.widthOfString(" .");
          doc.text(" .".repeat(Math.max(0, Math.floor((to - from) / dot))), from, y + 1, {
            width: to - from,
            lineBreak: false,
          });
        }
      }
      y += 19;
    }
  }

  introPage(description) {
    const doc = this.doc;
    this.head = `Intro to ${this.meta.title.replace(/\|/g, " ")}`;
    doc.addPage();
    caps(doc, "Before you begin", 14, TOP, { spacing: 3 });
    doc.y = TOP + 36;

    for (const block of parseBody(description)) {
      if (block.style === "list") this.list(block.items);
      else if (block.style === "heading") this.heading(block.text, 13);
      else this.paragraph(block.text, { style: block.style });
    }

    this.heading("How to use this study", 14);
    for (const para of [
      `This book is divided into ${this.days.length} days, but do not let that number put pressure on you. A day is a place to stop, not a deadline. If one day takes you three sittings, take them.`,
      "Every day starts with a short Scripture reading. Please actually read it. That is where the real power is, in God's actual Word, and each day tells you what to watch for before you start.",
      "Then read the day's study, sit with the question at the end, and close with the prayer, out loud if you can.",
    ]) {
      this.paragraph(para);
    }
  }

  // ---------------------------------------------------------------- the days

  day(day) {
    const doc = this.doc;
    const blocks = parseBody(day.devotional_text);
    const epigraph = epigraphFor(blocks);

    // The opener carries the book's name above, the day's number beneath it.
    this.page(this.meta.title.replace(/\|/g, " "));
    this.dayStartPages.set(day.day_number, this.printedPage);

    caps(doc, "Day", 11, fromFoot(566, 11), { spacing: 2.4 });
    doc.font(FONTS.display).fontSize(58);
    doc.text(String(day.day_number), MARGIN.left, fromFoot(499, 58), {
      width: TEXT_WIDTH,
      align: "center",
      lineBreak: false,
    });

    doc.font(FONTS.display).fontSize(24);
    doc.text(day.day_title, MARGIN.left, fromFoot(467, 24), { width: TEXT_WIDTH, align: "center", lineGap: 6 });

    const reference = readingReference(day);
    if (reference) {
      caps(doc, `Today's reading: ${reference}`, 9.5, doc.y + 16, { spacing: 1.8 });
      doc.y += 40;
    } else {
      doc.y += 24;
    }

    if (epigraph) {
      doc.font(FONTS.italic).fontSize(13);
      doc.text(`\u201c${epigraph.quote}\u201d`, MARGIN.left + 24, doc.y, {
        width: TEXT_WIDTH - 48,
        align: "center",
        lineGap: 4,
      });
      caps(doc, epigraph.reference, 9, doc.y + 10, { spacing: 1.8 });
      doc.y += 38;
    }

    this.head = `Day ${day.day_number}`;
    let first = true;
    for (const block of blocks) {
      if (block.style === "heading") {
        this.heading(block.text, 13);
        continue;
      }
      if (block.style === "list") {
        this.list(block.items);
        continue;
      }
      if (first && block.style === "body" && runs(block.text).length <= 1 && block.text.length > 110) {
        this.dropCapParagraph(block.text);
        first = false;
        continue;
      }
      this.paragraph(block.text, { style: block.style });
      first = false;
    }

    if (day.reflection_question) {
      this.heading("A question to sit with", 13);
      this.paragraph(day.reflection_question, { style: "scripture" });
    }
  }

  /** The first paragraph of a day opens on a raised capital, as the book does. */
  dropCapParagraph(text) {
    const doc = this.doc;
    const letter = text.charAt(0);
    const rest = text.slice(1);
    const top = doc.y;

    doc.font(FONTS.display).fontSize(31);
    const indent = doc.widthOfString(letter) + 6;
    doc.text(letter, MARGIN.left - 2, top - 4, { lineBreak: false });

    doc.font(FONTS.body).fontSize(BODY_SIZE);
    const lineGap = BODY_LEADING - doc.currentLineHeight();
    const words = rest.split(" ");
    let beside = "";
    while (
      words.length &&
      doc.heightOfString(`${beside} ${words[0]}`.trim(), { width: TEXT_WIDTH - indent, lineGap }) <=
        BODY_LEADING * 2
    ) {
      beside = `${beside} ${words.shift()}`.trim();
    }
    doc.text(beside, MARGIN.left + indent, top, { width: TEXT_WIDTH - indent, lineGap });
    if (words.length) doc.text(words.join(" "), MARGIN.left, doc.y, { width: TEXT_WIDTH, lineGap });
    doc.y += PARA_GAP;
  }

  build(description) {
    this.titlePage();
    this.copyrightPage();
    this.contentsPage();
    this.introPage(description);
    this.numbering = true;
    for (const day of this.days) this.day(day);
    this.doc.end();
    return this.dayStartPages;
  }
}

// ------------------------------------------------------------------- the run

const { study, days } = await fetchStudy(STUDY);
const meta = {
  title: arg("title", study.title),
  subtitle: arg("subtitle", study.subtitle || ""),
  author: arg("author", "Louis Moore III"),
  days,
};

// Pass one lays the book out to learn the page numbers; its PDF is thrown away.
const measuring = new Book({ ...meta, tableOfContents: null });
const scratch = path.join(process.env.TEMP || ".", "book-pass-one.pdf");
measuring.doc.pipe(fs.createWriteStream(scratch));
const pages = measuring.build(study.description);
await new Promise((resolve) => measuring.doc.on("end", resolve));

const printing = new Book({ ...meta, tableOfContents: pages });
const stream = fs.createWriteStream(OUT);
printing.doc.pipe(stream);
printing.build(study.description);
await new Promise((resolve) => stream.on("finish", resolve));

const size = (fs.statSync(OUT).size / 1024 / 1024).toFixed(2);
console.log(`${study.title}: ${days.length} days, ${printing.printedPage} numbered pages -> ${OUT} (${size} MB)`);
