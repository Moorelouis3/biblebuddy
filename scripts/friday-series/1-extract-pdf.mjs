/**
 * One-time extractor: Bible_Buddy_Friday_Emails_12.pdf -> structured JSON.
 *
 * The PDF is the source copy for the 12 Friday teaching emails. It carries no
 * tagged structure, but the generator used consistent styling, so the
 * structure is recoverable from font weight, size and geometry.
 *
 * SIZES ARE RELATIVE, NOT ABSOLUTE. The generator shrank each page to fit its
 * content, so body text is 9.5pt on page 3, 9.1pt on page 6 and 8.6pt on
 * page 7. Classifying by absolute point size silently lost every heading in
 * email 4. What IS constant is the ratio to the page's own body size:
 *
 *   ~2.00x body  -> H1 title (may wrap over two lines)
 *   ~1.22x body  -> H3 section heading
 *   ~1.00x body  -> body text; bold weight marks an emphasis run
 *   ~0.85x body  -> the URL belonging to the line above it
 *   x = 54       -> body left margin;  x > 60 at body size -> list item
 *   gap < 1.5x   -> wrapped continuation of the same paragraph
 *   gap > 1.5x   -> a new block
 *
 * Emitted blocks: h1 | h3 | p | ul | cta | signoff. The footer (Email
 * preferences / Unsubscribe) is dropped: the send template owns it.
 */
import { readFileSync, writeFileSync } from "node:fs";

import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

// The approved copy Louis handed over on 2026-10-12. Pass a different path
// as argv[2] if a revised document ever replaces it.
const PDF = process.argv[2] || "C:/Users/Moore/Downloads/Bible_Buddy_Friday_Emails_12.pdf";
const OUT = new URL("./friday-emails.json", import.meta.url);

const LIST_X = 60; // body sits at x=54; anything further right is indented
const WRAP_RATIO = 1.5; // y-gap below this (x body size) continues a paragraph

const furniture = /^Bible Buddy \| Friday teaching series \| October 12, 2026\s*\d*$/;
const emailHeader = /^EMAIL (\d+) \/ 12 • LAUNCH GROUP: (.+?) • 8:00 A\.M\. ET$/;
const continued = /^EMAIL \d+ \/ 12 • CONTINUED$/;

/** Every page's text as lines of styled runs, in reading order. */
async function readPages() {
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(readFileSync(PDF)),
    useSystemFonts: true,
  }).promise;

  const pages = [];
  for (let p = 1; p <= doc.numPages; p += 1) {
    const page = await doc.getPage(p);
    const lines = [];
    for (const item of (await page.getTextContent()).items) {
      if (!item.str.trim()) continue;
      const x = item.transform[4];
      const y = item.transform[5];
      let line = lines.find((l) => Math.abs(l.y - y) < 3);
      if (!line) lines.push((line = { y, runs: [] }));
      line.runs.push({
        text: item.str,
        bold: item.fontName.endsWith("f4"),
        size: Math.round(item.height * 10) / 10,
        x,
        width: item.width,
      });
    }
    lines.sort((a, b) => b.y - a.y);
    for (const line of lines) line.runs.sort((a, b) => a.x - b.x);

    // The page's body size: the most common size among lines on the left
    // margin, ignoring the fixed-size running header and the metadata lines.
    const tally = new Map();
    for (const line of lines) {
      const text = line.runs.map((r) => r.text).join("");
      if (furniture.test(text) || emailHeader.test(text) || continued.test(text)) continue;
      if (/^Subject:/.test(text) || /^\d+$/.test(text)) continue;
      if (line.runs[0].x > LIST_X) continue;
      const size = line.runs[0].size;
      tally.set(size, (tally.get(size) || 0) + 1);
    }
    const bodySize = [...tally.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 9.5;
    pages.push({ number: p, lines, bodySize });
  }
  return pages;
}

/**
 * Join a line's runs into text plus bold spans.
 *
 * A bold run is a separate text item with no space glyph between it and its
 * neighbour, so "the Bible" + bold "while..." arrives as "Biblewhile". The
 * x-gap tells us whether a space belonged there.
 */
function joinRuns(runs) {
  let text = "";
  const bolds = [];
  let prev = null;
  for (const run of runs) {
    if (prev && run.x - (prev.x + prev.width) > 0.8) text += " ";
    const start = text.length;
    text += run.text;
    if (run.bold) bolds.push([start, text.length]);
    prev = run;
  }
  return { text: text.replace(/\s+/g, " ").trim(), bolds };
}

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Render a line as HTML, merging adjacent bold spans into <strong>. */
function toHtml({ text, bolds }) {
  if (!bolds.length) return escape(text);
  const merged = [];
  for (const span of bolds) {
    const last = merged[merged.length - 1];
    if (last && span[0] <= last[1] + 1) last[1] = span[1];
    else merged.push([...span]);
  }
  let out = "";
  let at = 0;
  for (const [start, end] of merged) {
    out += escape(text.slice(at, Math.min(start, text.length)));
    const inner = text.slice(start, end);
    out += inner.trim() ? `<strong>${escape(inner)}</strong>` : escape(inner);
    at = end;
  }
  return out + escape(text.slice(Math.min(at, text.length)));
}

const pages = await readPages();
const emails = [];
let current = null;

for (const page of pages) {
  const { bodySize } = page;
  let prevY = null; // reset per page: a gap across a page break is meaningless

  for (const line of page.lines) {
    const joined = joinRuns(line.runs);
    const text = joined.text;
    const size = line.runs[0].size;
    const ratio = size / bodySize;

    if (furniture.test(text) || /^\d+$/.test(text)) continue;

    const header = text.match(emailHeader);
    if (header) {
      const num = Number(header[1]);
      const existing = emails.find((e) => e.number === num);
      current = existing || { number: num, launchDate: header[2], subject: null, blocks: [] };
      if (!existing) emails.push(current);
      prevY = null;
      continue;
    }
    // "EMAIL 02 / 12 • CONTINUED" reopens the email it belongs to.
    if (continued.test(text)) {
      const num = Number(text.match(/^EMAIL (\d+)/)[1]);
      current = emails.find((e) => e.number === num) || current;
      prevY = null;
      continue;
    }
    if (!current) continue; // front matter and instruction pages

    if (/^Subject:/.test(text)) {
      current.subject = text.replace(/^Subject:\s*/, "").trim();
      prevY = null;
      continue;
    }

    const gap = prevY === null ? Infinity : prevY - line.y;
    prevY = line.y;

    const blocks = current.blocks;
    const last = blocks[blocks.length - 1];

    // Footer - the send template owns it.
    if (/\{\{email_preferences_link\}\}|\{\{unsubscribe_link\}\}/.test(text)) continue;
    if (/^Email preferences$/.test(text) || /^Unsubscribe$/.test(text) || text === "·") continue;

    // A small line carrying a URL belongs to the CTA above it.
    if (ratio <= 0.92) {
      if (last && last.type === "cta" && !last.url) last.url = text;
      else if (/\{\{bible_buddy_url\}\}|^https?:/.test(text)) {
        blocks.push({ type: "cta", label: null, url: text });
      }
      continue;
    }

    if (ratio >= 1.6) {
      if (last && last.type === "h1" && gap <= bodySize * 3) last.text += " " + text;
      else blocks.push({ type: "h1", text });
      continue;
    }

    if (ratio >= 1.12) {
      blocks.push({ type: "h3", text });
      continue;
    }

    if (text === "Louis") {
      blocks.push({ type: "signoff", name: "Louis", title: null });
      continue;
    }
    if (last && last.type === "signoff" && /^Founder of Bible Buddy$/.test(text)) {
      last.title = text;
      continue;
    }

    // The primary link: a fully bold line ending in an arrow.
    if (line.runs.every((r) => r.bold) && /→\s*$/.test(text)) {
      blocks.push({ type: "cta", label: text.replace(/\s*→\s*$/, "").trim(), url: null });
      continue;
    }

    if (line.runs[0].x > LIST_X) {
      if (last && last.type === "ul" && gap <= bodySize * 2) last.items.push(toHtml(joined));
      else blocks.push({ type: "ul", items: [toHtml(joined)] });
      continue;
    }

    // Body text: continue the previous paragraph when the line simply wrapped.
    if (last && last.type === "p" && gap <= bodySize * WRAP_RATIO) {
      last.html += " " + toHtml(joined);
      continue;
    }
    blocks.push({ type: "p", html: toHtml(joined) });
  }
}

// ---- checks -------------------------------------------------------------
const problems = [];
if (emails.length !== 12) problems.push(`expected 12 emails, got ${emails.length}`);
for (const e of emails) {
  if (!e.subject) problems.push(`email ${e.number}: no subject`);
  const ctas = e.blocks.filter((b) => b.type === "cta");
  if (ctas.length !== 1) problems.push(`email ${e.number}: ${ctas.length} CTA blocks`);
  for (const c of ctas) {
    if (!c.url) problems.push(`email ${e.number}: CTA "${c.label}" has no url`);
    if (!c.label) problems.push(`email ${e.number}: url ${c.url} has no label`);
  }
  if (!e.blocks.some((b) => b.type === "h1")) problems.push(`email ${e.number}: no H1`);
  if (!e.blocks.some((b) => b.type === "h3")) problems.push(`email ${e.number}: no H3`);
  if (!e.blocks.some((b) => b.type === "signoff")) problems.push(`email ${e.number}: no sign-off`);
  if (!/Hey \{\{first_name\}\}/.test(e.blocks.find((b) => b.type === "p")?.html || "")) {
    problems.push(`email ${e.number}: does not open with the greeting`);
  }
  for (const b of e.blocks) {
    const body = b.html || b.text || (b.items || []).join(" ");
    if (/\{\{(?!first_name)/.test(body)) {
      problems.push(`email ${e.number}: stray placeholder: ${body.slice(0, 50)}`);
    }
    // A paragraph that ends mid-sentence means a wrap was not rejoined.
    if (b.type === "p" && /\b(and|the|a|to|of|in|that|with|your|you)$/i.test(b.html.trim())) {
      problems.push(`email ${e.number}: paragraph ends mid-sentence: ...${b.html.slice(-46)}`);
    }
  }
}

writeFileSync(OUT, JSON.stringify(emails, null, 2));

for (const e of emails) {
  const counts = {};
  for (const b of e.blocks) counts[b.type] = (counts[b.type] || 0) + 1;
  const shape = Object.entries(counts).map(([k, v]) => `${k}:${v}`).join(" ");
  const url = e.blocks.find((b) => b.type === "cta")?.url || "-";
  console.log(`${String(e.number).padStart(2)}  ${String(e.launchDate).padEnd(18)} ${shape.padEnd(38)} ${url}`);
}
console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n - ${problems.join("\n - ")}` : "\nAll checks passed.");
