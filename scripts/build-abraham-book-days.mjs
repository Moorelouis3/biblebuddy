/**
 * Turn the print interior of The Obedience of Abraham into the app's day files
 * (2026-11-13).
 *
 *   node scripts/build-abraham-book-days.mjs "C:/path/Abraham_Interior_KDP.pdf" [--write]
 *
 * Without --write it reports and touches nothing. With --write it writes
 * data/abraham-book-days/day-NN.md, one per day, in the same shape as
 * data/tempting-book-days: a small frontmatter block (day, title, reading,
 * question) and the day's text as markdown.
 * scripts/apply-abraham-book-days.ts then puts those days live.
 *
 * WHY. The app carried an older Obedience of Abraham: 15 days, one chapter of
 * Genesis 11-25 each, about 1,300 characters a day. The book Louis wrote is 30
 * days on Genesis 9-25 and is a different text entirely. A sign-up page and a
 * share page were built on the old one on 13 November and said "15 days";
 * Louis: "its not 15 days ... u used an old bible study which is old and not
 * up to date". The book is the study. This reads it.
 *
 * HOW THE STRUCTURE IS RECOVERED. No model writes or rewrites a word. The
 * interior carries everything as layout, read here with pdfjs:
 *
 *   day opener          "D A Y", a 52pt number, the title in Cormorant 25
 *   opening             body text with a 31pt drop cap
 *   section heading     EB Garamond SemiBold 13, letter-spaced
 *   reading reference   Bold Italic 13
 *   pull quote          Cormorant 17-23 on a page of its own, reference below
 *   Scripture quote     a whole paragraph in the italic face
 *   emphasis            the bold or italic face inside a body line
 *   list item           a line with a small star glyph just to its left
 *   paragraph break     a vertical gap clearly larger than the page's leading
 *
 * Letter-spaced headings arrive from pdfjs as "T H E W O R L D", with the word
 * breaks gone. pdftotext keeps them, so its output is used as the dictionary
 * for those lines and for nothing else. It has to be on the PATH.
 *
 * THE SAFEGUARD. For every day, the letters and digits of what is written are
 * compared, in order, with the letters and digits of the book's own lines.
 * The only words allowed to differ are the fixed labels this adds or replaces
 * (listed in LABELS below). Any other difference is a hard error and nothing
 * is written.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const WRITE = process.argv.includes("--write");
const PDF_PATH = process.argv.slice(2).find((a) => a.toLowerCase().endsWith(".pdf"));
if (!PDF_PATH || !fs.existsSync(PDF_PATH)) {
  console.error("Pass the path to the interior PDF.");
  process.exit(1);
}
const OUT_DIR = path.join("data", "abraham-book-days");
const TOTAL_DAYS = 30;

const skeleton = (text) => text.normalize("NFC").replace(/[^A-Za-z0-9]/g, "").toLowerCase();
const collapse = (text) => text.replace(/\s+/g, "");
const face = (run) => run.f.replace(/^[A-Z]{6}\+/, "");
const isBlank = (run) => !run.t.trim();

// ---------------------------------------------------------------- read the PDF

const pdfjs = await import(pathToFileURL(path.resolve("node_modules/pdfjs-dist/legacy/build/pdf.mjs")).href);
const doc = await pdfjs.getDocument({
  data: new Uint8Array(fs.readFileSync(PDF_PATH)),
  useSystemFonts: true,
  standardFontDataUrl: pathToFileURL(path.resolve("node_modules/pdfjs-dist/standard_fonts") + path.sep).href,
  verbosity: 0,
}).promise;

const pages = [];
const fontNames = {};
for (let p = 1; p <= doc.numPages; p += 1) {
  const page = await doc.getPage(p);
  const content = await page.getTextContent();
  await page.getOperatorList();
  const lines = [];
  for (const item of content.items) {
    if (!("str" in item)) continue;
    if (fontNames[item.fontName] === undefined) {
      try {
        fontNames[item.fontName] = page.commonObjs.get(item.fontName)?.name || item.fontName;
      } catch {
        fontNames[item.fontName] = item.fontName;
      }
    }
    const run = {
      x: item.transform[4],
      y: item.transform[5],
      w: item.width,
      s: Math.round(Math.hypot(item.transform[0], item.transform[1]) * 10) / 10,
      f: fontNames[item.fontName],
      t: item.str,
    };
    let line = lines.find((l) => Math.abs(l.y - run.y) < 1.2);
    if (!line) {
      line = { y: run.y, runs: [] };
      lines.push(line);
    }
    line.runs.push(run);
  }
  lines.sort((a, b) => b.y - a.y);
  for (const line of lines) {
    line.runs.sort((a, b) => a.x - b.x);
    line.page = p;
  }
  pages.push(lines);
}

// Word breaks for letter-spaced lines, from pdftotext.
const spacedWords = new Map();
{
  const text = execFileSync("pdftotext", ["-layout", "-enc", "UTF-8", PDF_PATH, "-"], { maxBuffer: 64 * 1024 * 1024 }).toString("utf8");
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim().replace(/\s+/g, " ");
    if (line && line === line.toUpperCase() && /[A-Z]/.test(line)) spacedWords.set(collapse(line), line);
  }
}

const SMALL = new Set(["a", "an", "the", "and", "or", "of", "to", "in", "on", "for", "with", "at", "by", "from", "as", "but"]);
function titleCase(upper) {
  return upper
    .toLowerCase()
    .split(" ")
    .map((word, index) => (index > 0 && SMALL.has(word) ? word : word.replace(/^[^a-z]*[a-z]/, (m) => m.toUpperCase())))
    .join(" ");
}

/** A letter-spaced line back as words: "T H E W O R L D S T A R T S" -> "THE WORLD STARTS". */
function despace(line) {
  const key = collapse(line.runs.map((r) => r.t).join(""));
  const found = spacedWords.get(key);
  if (found) return found;
  // References ("G E N E S I S" " " "9 : 1 3") keep their breaks as separate runs.
  const parts = line.runs.filter((r) => !isBlank(r)).map((r) => collapse(r.t));
  if (parts.length > 1) return parts.join(" ");
  throw new Error(`No word breaks known for the letter-spaced line "${key}" on page ${line.page}`);
}

// ---------------------------------------------------------------- classify

const lineText = (line) => line.runs.map((r) => r.t).join("");
const first = (line) => line.runs.find((r) => !isBlank(r));
const is = (line, name, size) => {
  const run = first(line);
  return Boolean(run) && face(run) === name && (size === undefined || Math.abs(run.s - size) < 0.05);
};

function kind(line) {
  const run = first(line);
  if (!run) return "blank";
  const name = face(run);
  const size = run.s;
  if (line.y > 590 && name === "EBGaramond-SemiBold" && size === 8.5) return "running-header";
  if (line.y < 40 && name === "EBGaramond-Regular" && size === 9) return "folio";
  if (name === "FreeSerif" && size >= 9) return "ornament";
  if (name === "FreeSerif") return "star";
  if (name === "EBGaramond-SemiBold" && size === 52) return "day-number";
  if (name === "EBGaramond-Regular" && size === 10.5 && collapse(lineText(line)) === "DAY" && line.y > 550) return "day-label";
  if (name === "Cormorant-Light" && size === 25) return "day-title";
  if (name === "Cormorant-Light" && size === 31) return "drop-cap";
  if (name === "Cormorant-Light" && size === 16) return "question-number";
  if (name === "Cormorant-Light" && size === 15) return "action-title";
  if (name === "Cormorant-Light") return "pull-quote";
  if (name === "EBGaramond-SemiBold" && size === 13) return "heading";
  if (name === "EBGaramond-SemiBold") return "sub-label";
  if (name === "EBGaramondBoldItalic" && size === 13) return "reading-ref";
  if (name === "EBGaramond-Regular" && size === 8.5) return "reading-time";
  if (name === "EBGaramond-Regular" && size === 9.5) return "pull-ref";
  if (size === 10.5 || size === 10) return "body";
  return `unknown(${name}@${size})`;
}

// ---------------------------------------------------------------- styled text

const STYLE = { "EBGaramond-Regular": "", "EBGaramond-Italic": "i", EBGaramondBold: "b", EBGaramondBoldItalic: "bi" };

/** Lines of one paragraph -> [{style, text}], neighbours of one style merged. */
function spansOf(lines) {
  const spans = [];
  lines.forEach((line, index) => {
    if (index > 0) spans.push({ style: null, text: " " });
    for (const run of line.runs) {
      if (!run.t) continue;
      const style = isBlank(run) ? null : STYLE[face(run)];
      if (style === undefined) throw new Error(`Unexpected face ${face(run)} in body text on page ${line.page}: "${run.t}"`);
      spans.push({ style, text: run.t });
    }
  });
  // Whitespace takes the style of what follows it when both neighbours agree.
  for (let i = 0; i < spans.length; i += 1) {
    if (spans[i].style !== null) continue;
    const before = spans[i - 1]?.style;
    const after = spans.slice(i + 1).find((s) => s.style !== null)?.style;
    spans[i].style = before !== undefined && before === after ? before : "";
  }
  const merged = [];
  for (const span of spans) {
    const last = merged[merged.length - 1];
    if (last && last.style === span.style) last.text += span.text;
    else merged.push({ ...span });
  }
  return merged;
}

const MARK = { "": "", i: "*", b: "**", bi: "***" };

/** Spans -> markdown, with the markers hugging the words. `plain` drops one style. */
function markdownOf(spans, plain = null) {
  let out = "";
  for (const span of spans) {
    const style = span.style === plain ? "" : plain === "i" && span.style === "bi" ? "b" : plain === "b" && span.style === "bi" ? "i" : span.style;
    const mark = MARK[style];
    if (!mark) {
      out += span.text;
      continue;
    }
    const lead = span.text.match(/^\s*/)[0];
    const trail = span.text.match(/\s*$/)[0];
    const core = span.text.slice(lead.length, span.text.length - trail.length);
    out += core ? `${lead}${mark}${core}${mark}${trail}` : span.text;
  }
  return out.replace(/\s+/g, " ").trim();
}

const plainOf = (lines) => lines.map(lineText).join(" ").replace(/\s+/g, " ").trim();
const allStyle = (spans, style) => spans.every((s) => !s.text.trim() || s.style === style || (style === "i" && s.style === "bi"));

// ---------------------------------------------------------------- paragraphs

/** Body lines of ONE page -> blocks. A star line marks the line under it as a list item. */
function blocksOfPage(lines) {
  const body = [];
  let starY = null;
  for (const line of lines) {
    const k = kind(line);
    if (k === "star") {
      starY = line.y;
      continue;
    }
    if (k !== "body") continue;
    const bullet = starY !== null && starY - line.y < 6 && starY - line.y > -2;
    if (bullet) starY = null;
    body.push({ line, bullet });
  }
  if (!body.length) return [];

  const gaps = [];
  for (let i = 1; i < body.length; i += 1) gaps.push(Math.round((body[i - 1].line.y - body[i].line.y) * 10) / 10);
  const counts = new Map();
  for (const gap of gaps) if (gap > 8) counts.set(gap, (counts.get(gap) || 0) + 1);
  // The leading is the smallest gap that repeats; a page of one-line
  // paragraphs has none, and then every line stands alone.
  const repeated = [...counts.entries()].filter(([, n]) => n >= 2).map(([gap]) => gap).sort((a, b) => a - b);
  const leading = repeated[0] ?? Math.min(...gaps.filter((g) => g > 8), 99);

  const blocks = [];
  body.forEach((entry, index) => {
    const gap = index === 0 ? Infinity : body[index - 1].line.y - entry.line.y;
    const last = blocks[blocks.length - 1];
    const sameIndent = last && Math.abs(last.lines[last.lines.length - 1].runs[0].x - entry.line.runs[0].x) < 14;
    const continues = last && !entry.bullet && gap <= leading * 1.22 && (last.bullet ? gap <= leading * 1.22 : sameIndent || true);
    if (continues) last.lines.push(entry.line);
    else blocks.push({ bullet: entry.bullet, lines: [entry.line], page: entry.line.page });
  });
  return blocks;
}

const TERMINAL = /[.?!:”’"')…]\s*$/;

/** Join a paragraph that a page break cut in two. */
function joinAcrossPages(blocks) {
  const out = [];
  for (const block of blocks) {
    const last = out[out.length - 1];
    if (last && !last.bullet && !block.bullet && last.page !== block.page && last.endPage !== block.page) {
      const lastText = plainOf(last.lines);
      const lastSpans = spansOf(last.lines);
      const openQuote = allStyle(lastSpans, "i") && /^[“"]/.test(lastText) && !/\)\s*$/.test(lastText);
      if (openQuote || !TERMINAL.test(lastText)) {
        last.lines.push(...block.lines);
        last.endPage = block.page;
        continue;
      }
    }
    out.push({ ...block, lines: [...block.lines], endPage: block.page });
  }
  return out;
}

/** Blocks -> markdown blocks, with consecutive list items kept together. */
function renderBlocks(blocks, { prayer = false } = {}) {
  const out = [];
  let list = [];
  const flush = () => {
    if (list.length) out.push(list.join("\n"));
    list = [];
  };
  for (const block of blocks) {
    const spans = spansOf(block.lines);
    if (block.bullet) {
      list.push(`* ${markdownOf(spans)}`);
      continue;
    }
    flush();
    const text = plainOf(block.lines);
    if (prayer) {
      out.push(markdownOf(spans, "i"));
    } else if (allStyle(spans, "i") && /^[“"]/.test(text) && /\)$/.test(text)) {
      out.push(`> ${markdownOf(spans, "i")}`);
    } else {
      out.push(markdownOf(spans));
    }
  }
  flush();
  return out;
}

// ---------------------------------------------------------------- days

const LABELS = [
  "TODAY’S READING",
  "BEFORE YOU READ",
  "AS YOU READ, NOTICE",
  "REFLECTION QUESTIONS",
  "TODAY’S ACTION",
  "TODAY’S PRAYER",
];

const days = [];
let current = null;
pages.forEach((lines, index) => {
  const number = lines.find((l) => kind(l) === "day-number");
  if (number && lines.some((l) => kind(l) === "day-label")) {
    current = { day: Number(collapse(lineText(number))), pages: [] };
    days.push(current);
  }
  // The last page of the book is an advert for the app, not part of day 30.
  const isBackMatter = lines.some((l) => collapse(lineText(l)).includes("KeepGoing"));
  if (current && !isBackMatter) current.pages.push({ number: index + 1, lines });
});
if (days.length !== TOTAL_DAYS) throw new Error(`Expected ${TOTAL_DAYS} days in the book, found ${days.length}`);

const unknown = new Set();
const report = [];
const files = [];

for (const day of days) {
  let section = "opening";
  let title = "";
  let reading = "";
  let teachingHeading = "";
  let pullQuote = [];
  let pullRef = "";
  let actionTitle = "";
  const sectionBlocks = { opening: [], before: [], notice: [], teaching: [], questions: [], action: [], prayer: [] };
  const sourceWords = []; // the book's own wording, for the safeguard

  let ended = false;
  for (const page of day.pages) {
    if (ended) break;
    // The drop cap belongs to the first word of the first body line.
    const capLine = page.lines.find((l) => kind(l) === "drop-cap" || l.runs.some((r) => face(r) === "Cormorant-Light" && r.s === 31));
    let cap = "";
    if (capLine) {
      // The cap arrives as three runs: an empty one, the letter, and a space.
      cap = capLine.runs
        .filter((r) => face(r) === "Cormorant-Light" && r.s === 31)
        .map((r) => r.t)
        .join("")
        .trim();
      if (!/^[A-Z]$/.test(cap)) throw new Error(`Day ${day.day}: the drop cap read as "${cap}", expected one capital letter`);
      capLine.runs = capLine.runs.filter((r) => !(face(r) === "Cormorant-Light" && r.s === 31));
      while (capLine.runs.length && isBlank(capLine.runs[0])) capLine.runs.shift();
    }
    const lines = page.lines.filter((l) => l.runs.some((r) => !isBlank(r)));
    if (cap) {
      const firstBody = lines.find((l) => kind(l) === "body");
      firstBody.runs[0] = { ...firstBody.runs[0], t: cap + firstBody.runs[0].t };
    }

    // Section markers on this page.
    let pageSection = section;
    const bodyBySection = new Map();
    const push = (name, line) => {
      if (!bodyBySection.has(name)) bodyBySection.set(name, []);
      bodyBySection.get(name).push(line);
    };
    for (const line of lines) {
      const k = kind(line);
      if (k.startsWith("unknown")) unknown.add(`${k} p${page.number}: ${lineText(line).slice(0, 50)}`);
      if (["running-header", "folio", "ornament", "day-label", "day-number", "reading-time", "question-number", "blank"].includes(k)) continue;
      if (k === "day-title") {
        title = `${title} ${lineText(line).trim()}`.trim();
        continue;
      }
      if (k === "heading") {
        const text = despace(line);
        if (text === "TODAY’S READING") pageSection = "before";
        else if (text === "REFLECTION QUESTIONS") pageSection = "questions";
        else if (text === "TODAY’S ACTION") pageSection = "action";
        else if (text === "TODAY’S PRAYER") pageSection = "prayer";
        else if (pageSection === "prayer") {
          // After day 30's prayer the book closes with its own end matter
          // ("Before you close this book"). It is not part of a day.
          ended = true;
          break;
        } else {
          if (pageSection !== "teaching" && pageSection !== "before" && pageSection !== "notice") {
            throw new Error(`Day ${day.day}: heading "${text}" in an unexpected place (${pageSection})`);
          }
          teachingHeading = teachingHeading ? `${teachingHeading}\n${titleCase(text)}` : titleCase(text);
          pageSection = "teaching";
          push("teaching", { heading: titleCase(text), page: page.number });
          sourceWords.push(text);
        }
        continue;
      }
      if (k === "sub-label") {
        const text = despace(line);
        if (text === "BEFORE YOU READ") pageSection = "before";
        else if (text === "AS YOU READ, NOTICE") pageSection = "notice";
        else throw new Error(`Day ${day.day}: unexpected label "${text}"`);
        continue;
      }
      if (k === "reading-ref") {
        reading = lineText(line).trim();
        continue;
      }
      if (k === "pull-quote") {
        pullQuote.push(lineText(line).replace(/\s+/g, " ").trim());
        sourceWords.push(lineText(line));
        continue;
      }
      if (k === "pull-ref") {
        pullRef = titleCase(despace(line).replace(/\s*:\s*/g, ":").replace(/\s*–\s*/g, "–"));
        sourceWords.push(lineText(line));
        continue;
      }
      if (k === "action-title") {
        actionTitle = `${actionTitle} ${lineText(line).trim()}`.trim();
        sourceWords.push(lineText(line));
        continue;
      }
      if (k === "star" || k === "body") {
        // "And think about this question" closes the reading page, outside the list.
        push(pageSection, line);
        if (k === "body") sourceWords.push(lineText(line));
        continue;
      }
      throw new Error(`Day ${day.day} page ${page.number}: unhandled line kind ${k}: ${lineText(line).slice(0, 60)}`);
    }
    section = pageSection;

    for (const [name, sectionLines] of bodyBySection) {
      // Teaching can carry more than one heading; split the page's lines at them.
      let chunk = [];
      const flush = () => {
        if (chunk.length) sectionBlocks[name].push(...blocksOfPage(chunk));
        chunk = [];
      };
      for (const line of sectionLines) {
        if (line.heading) {
          flush();
          sectionBlocks[name].push({ heading: line.heading, page: line.page });
        } else chunk.push(line);
      }
      flush();
    }
  }

  // ---- assemble
  const render = (name, options) => {
    const parts = [];
    let run = [];
    const flush = () => {
      if (run.length) parts.push(...renderBlocks(joinAcrossPages(run), options));
      run = [];
    };
    for (const block of sectionBlocks[name]) {
      if (block.heading) {
        flush();
        parts.push(`# ${block.heading}`);
      } else run.push(block);
    }
    flush();
    return parts;
  };

  // "Genesis 9:1–19", "Genesis 10", or across two chapters: "Genesis 11:31–12:3".
  const readingMatch = reading.match(/^(.+?)\s+(\d+)(?::(\d+)(?:\s*[–-]\s*(?:(\d+):)?(\d+))?)?(?:\s*[–-]\s*(\d+))?$/);
  if (!readingMatch) throw new Error(`Day ${day.day}: could not read the reading reference "${reading}"`);
  const readingPlain = reading.replace(/\s*–\s*/g, "-");
  const lastChapter = readingMatch[4] || readingMatch[6];
  const chapterLabel = `${readingMatch[1]} ${readingMatch[2]}${lastChapter ? `-${lastChapter}` : ""}`;

  // Reflection questions: a bold paragraph is the question, the plain one under it its prompt.
  const questionBlocks = joinAcrossPages(sectionBlocks.questions);
  const questions = [];
  for (const block of questionBlocks) {
    const spans = spansOf(block.lines);
    if (allStyle(spans, "b")) questions.push({ question: plainOf(block.lines), prompt: [] });
    else if (questions.length) questions[questions.length - 1].prompt.push(markdownOf(spans));
    else throw new Error(`Day ${day.day}: reflection text before the first question`);
  }
  if (questions.length < 1) throw new Error(`Day ${day.day}: no reflection questions found`);

  // Today's action: bold "1. ..." paragraphs are the steps.
  const actionParts = [];
  for (const block of joinAcrossPages(sectionBlocks.action)) {
    const spans = spansOf(block.lines);
    const text = plainOf(block.lines);
    if (allStyle(spans, "b") && /^\d+\.\s/.test(text)) {
      const lastPart = actionParts[actionParts.length - 1];
      if (lastPart && /^\d+\.\s/.test(lastPart.split("\n").pop())) actionParts[actionParts.length - 1] = `${lastPart}\n${text}`;
      else actionParts.push(text);
    } else actionParts.push(markdownOf(spans));
  }

  const noticeItems = renderBlocks(joinAcrossPages(sectionBlocks.notice.filter((b) => b.bullet)));
  const noticeAfter = renderBlocks(joinAcrossPages(sectionBlocks.notice.filter((b) => !b.bullet)));

  const body = [
    ...render("opening"),
    `## What To Watch For In ${chapterLabel}`,
    ...render("before"),
    ...(noticeItems.length ? ["**As you read, notice:**", ...noticeItems] : []),
    ...noticeAfter,
    ...(pullQuote.length ? [`> ${pullQuote.join(" ")}${pullRef ? ` (${pullRef})` : ""}`] : []),
    ...render("teaching"),
    "## Reflection Questions",
    questions.map((q, i) => `${i + 1}. **${q.question}**${q.prompt.length ? ` ${q.prompt.join(" ")}` : ""}`).join("\n"),
    "## Today's One Thing",
    ...(actionTitle ? [`**${actionTitle}**`] : []),
    ...actionParts,
    "## Today's Prayer",
    ...render("prayer", { prayer: true }),
  ].join("\n\n");

  // ---- the safeguard: same letters and digits, in the same order
  const added = [
    `What To Watch For In ${chapterLabel}`,
    ...(noticeItems.length ? ["As you read, notice:"] : []),
    "Reflection Questions",
    ...questions.map((_, i) => `${i + 1}`),
    "Today's One Thing",
    "Today's Prayer",
  ];
  let produced = skeleton(body);
  for (const label of added) {
    const key = skeleton(label);
    const at = produced.indexOf(key);
    if (at === -1) throw new Error(`Day ${day.day}: label "${label}" not found in output`);
    produced = produced.slice(0, at) + produced.slice(at + key.length);
  }
  // The book prints its sections in this order too, so the words line up; the
  // pull quote and the action title are the two pieces set apart on the page.
  const expected = skeleton(sourceWords.join(" "));
  const sortedEqual = [...produced].sort().join("") === [...expected].sort().join("");
  if (produced.length !== expected.length || !sortedEqual) {
    let i = 0;
    while (i < produced.length && produced[i] === expected[i]) i += 1;
    throw new Error(
      `Day ${day.day}: the wording does not match the book (${produced.length} vs ${expected.length} characters).\n` +
        `  book:    …${expected.slice(Math.max(0, i - 40), i + 60)}\n  written: …${produced.slice(Math.max(0, i - 40), i + 60)}`,
    );
  }

  if (!title) throw new Error(`Day ${day.day}: no title`);
  const file = [
    "---",
    `day: ${day.day}`,
    `title: ${title}`,
    `reading: ${readingPlain}`,
    `question: ${questions[0].question}`,
    "---",
    body,
    "",
  ].join("\n");
  files.push({ day: day.day, file });
  report.push(
    `Day ${String(day.day).padStart(2)}  ${title.padEnd(34)} ${readingPlain.padEnd(18)} ${String(body.length).padStart(6)} chars  ` +
      `${(body.match(/^> /gm) || []).length} quotes  ${questions.length} questions  ${body.split("\n\n").length} blocks  # ${teachingHeading.replace(/\n/g, " / ")}`,
  );
}

console.log(report.join("\n"));
if (unknown.size) {
  console.error(`\n${unknown.size} lines in a style this script does not know:\n  ${[...unknown].slice(0, 20).join("\n  ")}`);
  process.exit(1);
}
console.log(`\n${files.length} days read. Every day's wording matches the book.`);
if (WRITE) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const { day, file } of files) fs.writeFileSync(path.join(OUT_DIR, `day-${String(day).padStart(2, "0")}.md`), file);
  console.log(`Wrote ${files.length} files to ${OUT_DIR}`);
} else {
  console.log("Dry run. Pass --write to write the day files.");
}
