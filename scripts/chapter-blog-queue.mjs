#!/usr/bin/env node
/**
 * Queue + tracker for the "<Book> <N> Explained" chapter blog library
 * (Louis, 2026-09-17: every chapter of the Bible, 5 a day, in order).
 *
 * The Chapter Blog Writer routine never decides "what's next" itself - it
 * asks this script, so order, retries and duplicate protection live in one
 * place. State is data/chapter-blog/progress.json (committed with each
 * article). See docs/CHAPTER_BLOG_WRITER_AGENT.md.
 *
 *   node scripts/chapter-blog-queue.mjs status
 *   node scripts/chapter-blog-queue.mjs next            # peek, no changes
 *   node scripts/chapter-blog-queue.mjs claim           # mark next as generating
 *   node scripts/chapter-blog-queue.mjs set <slug> <status> ["note"]
 *   node scripts/chapter-blog-queue.mjs verify-live     # committed -> published once live
 *   node scripts/chapter-blog-queue.mjs self-test
 *
 * Statuses: generating, quality_check, committed (pushed, waiting for the
 * Deploy routine), published (seen live), failed (retried first next run),
 * needs_louis (failed MAX_ATTEMPTS times; skipped until Louis looks).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROGRESS_FILE = path.join(ROOT, "data/chapter-blog/progress.json");
const BLOG_CONTENT = path.join(ROOT, "lib/blogContent.ts");
const SITE = "https://www.mybiblebuddy.net";
const MAX_ATTEMPTS = 3;
const STALE_GENERATING_MS = 3 * 60 * 60 * 1000;

// Protestant canon, canonical order. Chapter counts must total 1,189.
export const BOOKS = [
  ["Genesis", 50], ["Exodus", 40], ["Leviticus", 27], ["Numbers", 36], ["Deuteronomy", 34],
  ["Joshua", 24], ["Judges", 21], ["Ruth", 4], ["1 Samuel", 31], ["2 Samuel", 24],
  ["1 Kings", 22], ["2 Kings", 25], ["1 Chronicles", 29], ["2 Chronicles", 36], ["Ezra", 10],
  ["Nehemiah", 13], ["Esther", 10], ["Job", 42], ["Psalms", 150], ["Proverbs", 31],
  ["Ecclesiastes", 12], ["Song of Solomon", 8], ["Isaiah", 66], ["Jeremiah", 52], ["Lamentations", 5],
  ["Ezekiel", 48], ["Daniel", 12], ["Hosea", 14], ["Joel", 3], ["Amos", 9],
  ["Obadiah", 1], ["Jonah", 4], ["Micah", 7], ["Nahum", 3], ["Habakkuk", 3],
  ["Zephaniah", 3], ["Haggai", 2], ["Zechariah", 14], ["Malachi", 4], ["Matthew", 28],
  ["Mark", 16], ["Luke", 24], ["John", 21], ["Acts", 28], ["Romans", 16],
  ["1 Corinthians", 16], ["2 Corinthians", 13], ["Galatians", 6], ["Ephesians", 6], ["Philippians", 4],
  ["Colossians", 4], ["1 Thessalonians", 5], ["2 Thessalonians", 3], ["1 Timothy", 6], ["2 Timothy", 4],
  ["Titus", 3], ["Philemon", 1], ["Hebrews", 13], ["James", 5], ["1 Peter", 5],
  ["2 Peter", 3], ["1 John", 5], ["2 John", 1], ["3 John", 1], ["Jude", 1], ["Revelation", 22],
];

// "Psalm 23 Explained" is how people search, not "Psalms 23".
function displayBook(book) {
  return book === "Psalms" ? "Psalm" : book;
}

export function chapterSlug(book, chapter) {
  return `${displayBook(book).toLowerCase().replace(/\s+/g, "-")}-${chapter}-explained`;
}

export function allChapters() {
  const list = [];
  for (const [book, count] of BOOKS) {
    for (let chapter = 1; chapter <= count; chapter += 1) {
      list.push({
        book,
        chapter,
        slug: chapterSlug(book, chapter),
        label: `${displayBook(book)} ${chapter}`,
        isLastInBook: chapter === count,
        kjvSourceUrl: `https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/${book.replace(/\s+/g, "")}.json`,
      });
    }
  }
  return list;
}

function loadProgress() {
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
}

function saveProgress(progress) {
  progress.updatedAt = new Date().toISOString();
  // Stored so the admin page can show it without re-running the queue logic.
  progress.nextChapter = findNext(progress)?.label || "All chapters complete";
  fs.writeFileSync(PROGRESS_FILE, `${JSON.stringify(progress, null, 2)}\n`);
}

function berlinDate(iso) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(iso ? new Date(iso) : new Date());
}

/** An article counts as existing if it is wired into BLOG_ARTICLES or has a page folder. */
function articleExists(slug) {
  const content = fs.readFileSync(BLOG_CONTENT, "utf8");
  return content.includes(`slug: "${slug}"`) || fs.existsSync(path.join(ROOT, "app/blog", slug, "page.tsx"));
}

function isStaleGenerating(entry) {
  return entry.status === "generating" && Date.now() - Date.parse(entry.startedAt || 0) > STALE_GENERATING_MS;
}

/**
 * Chapters in the order the queue will write them.
 *
 * Normally that is canonical order. `priorityBooks` (2026-09-25, Louis: cover
 * Proverbs during the October study) pulls whole books to the front, in the
 * order listed. The sort is stable, so chapters keep canonical order inside
 * each group and everything else keeps its place - which means no bookmark is
 * needed. Once the priority book is finished the queue simply carries on at
 * the earliest unwritten chapter, exactly where it left off.
 */
export function orderedChapters(progress) {
  const priority = (progress?.priorityBooks || []).map((book) => String(book).toLowerCase());
  const all = allChapters();
  if (!priority.length) return all;
  const rank = (item) => {
    const index = priority.indexOf(item.book.toLowerCase());
    return index === -1 ? priority.length : index;
  };
  return [...all].sort((a, b) => rank(a) - rank(b));
}

/**
 * The next chapter to write: earliest chapter (priority books first, then
 * canonical order) that has no article and is not done, in flight, or parked
 * for Louis. A failed chapter sits earlier in the order than anything after
 * it, so it is always retried before the queue moves on. A chapter whose
 * article already exists is reported as `existing` instead - never written
 * twice.
 */
export function findNext(progress) {
  for (const item of orderedChapters(progress)) {
    const entry = progress.chapters[item.slug];
    if (entry && ["committed", "published", "needs_louis"].includes(entry.status)) continue;
    if (entry && ["generating", "quality_check"].includes(entry.status) && !isStaleGenerating(entry)) continue;
    if (articleExists(item.slug)) return { ...item, existing: true };
    return { ...item, attempts: entry?.attempts || 0, previousError: entry?.lastError || null };
  }
  return null;
}

function summary(progress) {
  const chapters = allChapters();
  const entries = Object.entries(progress.chapters);
  const done = chapters.filter((c) => ["committed", "published"].includes(progress.chapters[c.slug]?.status));
  const published = entries.filter(([, e]) => e.status === "published");
  const today = berlinDate();
  const next = findNext(progress);
  const lastPublished = published
    .filter(([, e]) => e.publishedAt)
    .sort((a, b) => (a[1].publishedAt < b[1].publishedAt ? 1 : -1))[0];
  const priorityBooks = progress.priorityBooks || [];
  const priorityRemaining = priorityBooks.length
    ? chapters.filter(
        (c) =>
          priorityBooks.some((b) => b.toLowerCase() === c.book.toLowerCase()) &&
          !["committed", "published"].includes(progress.chapters[c.slug]?.status),
      ).length
    : 0;
  return {
    totalChapters: chapters.length,
    completed: done.length,
    remaining: chapters.length - done.length,
    priorityBooks,
    priorityRemaining,
    priorityReason: priorityBooks.length ? progress.priorityReason || null : null,
    currentBook: next?.book || null,
    nextChapter: next ? next.label : "All chapters complete",
    dailyTarget: progress.dailyTarget,
    writtenToday: entries.filter(([, e]) => e.committedAt && berlinDate(e.committedAt) === today).length,
    publishedToday: entries.filter(([, e]) => e.publishedAt && berlinDate(e.publishedAt) === today).length,
    inProgress: entries.filter(([, e]) => ["generating", "quality_check"].includes(e.status)).map(([s]) => s),
    waitingForDeploy: entries.filter(([, e]) => e.status === "committed").map(([s]) => s),
    failed: entries.filter(([, e]) => e.status === "failed").map(([s, e]) => ({ slug: s, attempts: e.attempts, lastError: e.lastError })),
    needsLouis: entries.filter(([, e]) => e.status === "needs_louis").map(([s, e]) => ({ slug: s, lastError: e.lastError })),
    lastPublished: lastPublished ? { slug: lastPublished[0], at: lastPublished[1].publishedAt } : null,
  };
}

async function verifyLive(progress) {
  const results = [];
  for (const [slug, entry] of Object.entries(progress.chapters)) {
    if (entry.status !== "committed") continue;
    try {
      const res = await fetch(`${SITE}/blog/${slug}`, { redirect: "follow" });
      const html = res.ok ? await res.text() : "";
      if (res.ok && html.includes(`/blog/${slug}`)) {
        entry.status = "published";
        entry.publishedAt = new Date().toISOString();
        results.push({ slug, live: true });
      } else {
        results.push({ slug, live: false, http: res.status });
      }
    } catch (error) {
      results.push({ slug, live: false, error: String(error) });
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Quality gate: `check <slug>` must pass before a chapter is committed.
// ---------------------------------------------------------------------------

const FILLER_PHRASES = [
  "god has a plan",
  "this reminds us to trust god",
  "this teaches us that faith is important",
  "in today's world",
  "in conclusion",
  "it is important to note",
  "delve",
  "tapestry",
  "testament to",
  "journey of faith",
];

const kjvCache = new Map();
async function kjvBook(book) {
  if (!kjvCache.has(book)) {
    const res = await fetch(`https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/${book.replace(/\s+/g, "")}.json`);
    if (!res.ok) throw new Error(`KJV source for ${book} returned ${res.status}`);
    kjvCache.set(book, await res.json());
  }
  return kjvCache.get(book);
}

const normalize = (text) =>
  text
    .replace(/&apos;|&#39;|’/g, "'")
    .replace(/&quot;|[“”]/g, '"')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

function decodeEntities(text) {
  return text.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}

/** "Genesis 4:3 to 5", "1 John 3:11 and 12", "Psalm 23:1-3" -> { book, chapter, from, to } */
function parseReference(reference) {
  const match = reference.trim().match(/^(.+?)\s+(\d+):(\d+)(?:\s*(?:to|and|-|–|,)\s*(\d+))?/i);
  if (!match) return null;
  let book = match[1].trim();
  if (/^psalm$/i.test(book)) book = "Psalms";
  if (/^song of songs$/i.test(book)) book = "Song of Solomon";
  const from = Number(match[3]);
  return { book, chapter: Number(match[2]), from, to: match[4] ? Math.max(from, Number(match[4])) : from };
}

async function checkVerse(text, reference) {
  const ref = parseReference(reference);
  if (!ref) return `could not read reference "${reference}"`;
  const bookName = BOOKS.find(([name]) => name.toLowerCase() === ref.book.toLowerCase())?.[0];
  if (!bookName) return `unknown book in "${reference}"`;
  const data = await kjvBook(bookName);
  const chapter = data.chapters.find((c) => Number(c.chapter) === ref.chapter);
  if (!chapter) return `${reference}: chapter does not exist`;
  // Allow a verse on either side so "4:6 and 7" style ranges never false-fail.
  const passage = chapter.verses
    .filter((v) => Number(v.verse) >= ref.from - 1 && Number(v.verse) <= ref.to + 1)
    .map((v) => v.text)
    .join(" ");
  const haystack = normalize(passage);
  const parts = decodeEntities(text).split(/\.\.\.|…/).map(normalize).filter((p) => p.split(" ").length >= 3);
  const missing = parts.filter((p) => !haystack.includes(p));
  return missing.length ? `${reference}: not word-for-word KJV ("${missing[0].slice(0, 80)}")` : null;
}

function articleText(source) {
  return decodeEntities(
    source
      .replace(/^\s*(import|export const metadata)[^\n]*\n/gm, " ")
      .replace(/function (VerseQuote|ArticleLink)[\s\S]*?\n}\n/g, " ")
      .replace(/className="[^"]*"/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\{"\s*"\}/g, " ")
      .replace(/[{}()]/g, " "),
  );
}

function shingles(text, size = 8) {
  const words = normalize(text).split(" ");
  const set = new Set();
  for (let i = 0; i + size <= words.length; i += 1) set.add(words.slice(i, i + size).join(" "));
  return set;
}

async function checkArticle(slug) {
  const chapters = allChapters();
  const index = chapters.findIndex((c) => c.slug === slug);
  if (index < 0) throw new Error(`${slug} is not a Bible chapter slug`);
  const file = path.join(ROOT, "app/blog", slug, "page.tsx");
  if (!fs.existsSync(file)) throw new Error(`${file} does not exist`);
  const source = fs.readFileSync(file, "utf8");
  const text = articleText(source);
  const words = normalize(text).split(" ").filter(Boolean).length;
  const problems = [];
  const warnings = [];

  if (words < 1800) problems.push(`only ~${words} words; the chapter explanation is too thin`);
  if (words > 4200) warnings.push(`~${words} words; make sure nothing is padded`);

  const quotes = [...source.matchAll(/<VerseQuote\s+text="([^"]*)"\s+reference="([^"]*)"/g)];
  if (quotes.length < 5) problems.push(`only ${quotes.length} VerseQuote blocks`);
  for (const [, quoteText, reference] of quotes) {
    const verseProblem = await checkVerse(quoteText, reference);
    if (verseProblem) problems.push(verseProblem);
  }

  const internalLinks = [...source.matchAll(/<ArticleLink\s+href="(\/blog\/[^"]+)"/g)].map((m) => m[1]);
  if (internalLinks.length < 3) problems.push(`only ${internalLinks.length} internal links (need 3 to 6)`);
  const blogContent = fs.readFileSync(BLOG_CONTENT, "utf8");
  for (const href of internalLinks) {
    const target = href.replace(/^\/blog\//, "").replace(/[#?].*$/, "");
    if (!blogContent.includes(`slug: "${target}"`)) problems.push(`broken internal link ${href}`);
  }

  if (/Keep Growing With Bible Buddy|StudyCta|clicking the button below/i.test(source)) {
    problems.push("contains an end-of-post CTA; the end card is the only CTA");
  }
  if (/[—–]/.test(text)) warnings.push("contains long dashes; the voice rules say no dashes");

  const lower = normalize(text);
  for (const phrase of FILLER_PHRASES) {
    const count = lower.split(normalize(phrase)).length - 1;
    if (count > 0) warnings.push(`filler phrase "${phrase}" x${count}`);
  }

  // The chapter must actually be about its chapter.
  const selfRefs = quotes.filter(([, , reference]) => {
    const ref = parseReference(reference);
    return ref && ref.book.toLowerCase() === chapters[index].book.toLowerCase() && ref.chapter === chapters[index].chapter;
  }).length;
  if (selfRefs < 4) problems.push(`only ${selfRefs} quotes come from ${chapters[index].label} itself`);

  // Copy check against the most recent earlier chapter articles.
  const mine = shingles(text);
  const overlaps = [];
  for (const other of chapters.slice(Math.max(0, index - 6), index)) {
    const otherFile = path.join(ROOT, "app/blog", other.slug, "page.tsx");
    if (!fs.existsSync(otherFile)) continue;
    const theirs = shingles(articleText(fs.readFileSync(otherFile, "utf8")));
    let shared = 0;
    for (const s of mine) if (theirs.has(s)) shared += 1;
    const pct = mine.size ? Math.round((shared / mine.size) * 1000) / 10 : 0;
    overlaps.push({ slug: other.slug, sharedPercent: pct });
    if (pct > 6) problems.push(`${pct}% of 8-word runs repeat ${other.slug}; rewrite the repeated parts`);
    else if (pct > 3) warnings.push(`${pct}% of 8-word runs repeat ${other.slug}`);
  }

  if (!blogContent.includes(`slug: "${slug}"`)) problems.push(`${slug} is not in BLOG_ARTICLES`);

  return { slug, ok: problems.length === 0, words, verseQuotes: quotes.length, internalLinks: internalLinks.length, overlaps, problems, warnings };
}

function selfTest() {
  const chapters = allChapters();
  const slugs = new Set(chapters.map((c) => c.slug));
  const checks = {
    books66: BOOKS.length === 66,
    chapters1189: chapters.length === 1189,
    uniqueSlugs: slugs.size === 1189,
    genesis5Slug: chapterSlug("Genesis", 5) === "genesis-5-explained",
    psalmSlug: chapterSlug("Psalms", 23) === "psalm-23-explained",
    genesisToExodus: chapters[49].slug === "genesis-50-explained" && chapters[50].slug === "exodus-1-explained",
    lastIsRevelation22: chapters[1188].slug === "revelation-22-explained",
  };

  // Priority ordering: Proverbs first, canonical order preserved everywhere
  // else, and nothing lost or duplicated by the reorder.
  const prioritised = orderedChapters({ priorityBooks: ["Proverbs"] });
  const proverbs = prioritised.slice(0, 31);
  checks.priorityFirst = proverbs.every((c) => c.book === "Proverbs") && proverbs[0].slug === "proverbs-1-explained";
  checks.priorityKeepsOrder = proverbs[30].slug === "proverbs-31-explained" && prioritised[31].slug === "genesis-1-explained";
  checks.priorityKeepsEveryChapter =
    prioritised.length === 1189 && new Set(prioritised.map((c) => c.slug)).size === 1189;
  // Once the priority book is written, the queue resumes where it left off.
  const mid = { priorityBooks: ["Proverbs"], chapters: {} };
  for (let n = 1; n <= 31; n += 1) mid.chapters[chapterSlug("Proverbs", n)] = { status: "published" };
  for (let n = 1; n <= 31; n += 1) mid.chapters[chapterSlug("Genesis", n)] = { status: "published" };
  checks.resumesAfterPriority = orderedChapters(mid).find(
    (c) => !["committed", "published"].includes(mid.chapters[c.slug]?.status),
  )?.slug === "genesis-32-explained";
  checks.noPriorityIsCanonical = orderedChapters({}).at(0).slug === "genesis-1-explained";

  return { ok: Object.values(checks).every(Boolean), checks };
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  const progress = command === "self-test" ? null : loadProgress();
  const print = (value) => console.log(JSON.stringify(value, null, 2));

  switch (command) {
    case "status":
      print(summary(progress));
      break;
    case "next":
      print(findNext(progress));
      break;
    case "claim": {
      if (progress.paused) {
        print({ paused: true, reason: progress.pausedReason || "This library is paused. Do not claim a chapter." });
        break;
      }
      // Walk past chapters that already exist (recording them) until a real one is found.
      let next = findNext(progress);
      while (next?.existing) {
        progress.chapters[next.slug] = { ...(progress.chapters[next.slug] || {}), status: "published", note: "article already existed; not rewritten" };
        next = findNext(progress);
      }
      if (!next) {
        saveProgress(progress);
        print({ done: true });
        break;
      }
      const entry = progress.chapters[next.slug] || { attempts: 0 };
      entry.status = "generating";
      entry.attempts = (entry.attempts || 0) + 1;
      entry.startedAt = new Date().toISOString();
      progress.chapters[next.slug] = entry;
      saveProgress(progress);
      print({ ...next, attempts: entry.attempts });
      break;
    }
    case "set": {
      const [slug, status, note] = args;
      const allowed = ["generating", "quality_check", "committed", "published", "failed", "needs_louis"];
      if (!slug || !allowed.includes(status)) throw new Error(`usage: set <slug> <${allowed.join("|")}> ["note"]`);
      if (!allChapters().some((c) => c.slug === slug)) throw new Error(`${slug} is not a Bible chapter slug`);
      const entry = progress.chapters[slug] || { attempts: 0 };
      entry.status = status;
      if (status === "committed") entry.committedAt = new Date().toISOString();
      if (status === "published") entry.publishedAt = new Date().toISOString();
      if (status === "failed") {
        entry.lastError = note || "unspecified";
        if ((entry.attempts || 0) >= MAX_ATTEMPTS) entry.status = "needs_louis";
      } else if (note) {
        entry.note = note;
      }
      progress.chapters[slug] = entry;
      saveProgress(progress);
      print({ slug, ...entry });
      break;
    }
    case "priority": {
      // priority Proverbs "reason"   -> write Proverbs next, then carry on
      // priority --clear             -> back to plain canonical order
      if (args[0] === "--clear") {
        delete progress.priorityBooks;
        delete progress.priorityReason;
        saveProgress(progress);
        print({ priorityBooks: [], nextChapter: findNext(progress)?.label || null });
        break;
      }
      const known = new Map(BOOKS.map(([book]) => [book.toLowerCase(), book]));
      const books = [];
      let reason = null;
      for (const arg of args) {
        const match = known.get(arg.toLowerCase());
        if (match) books.push(match);
        else reason = reason ? `${reason} ${arg}` : arg;
      }
      if (!books.length) throw new Error(`usage: priority <Book> [<Book>...] ["reason"] | priority --clear`);
      progress.priorityBooks = books;
      if (reason) progress.priorityReason = reason;
      saveProgress(progress);
      print(summary(progress));
      break;
    }
    case "verify-live": {
      const results = await verifyLive(progress);
      saveProgress(progress);
      print(results);
      break;
    }
    case "check": {
      const result = await checkArticle(args[0]);
      print(result);
      if (!result.ok) process.exitCode = 2;
      break;
    }
    case "self-test": {
      const result = selfTest();
      print(result);
      if (!result.ok) process.exitCode = 1;
      break;
    }
    default:
      console.error("commands: status | next | claim | set <slug> <status> [note] | verify-live | self-test");
      process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
