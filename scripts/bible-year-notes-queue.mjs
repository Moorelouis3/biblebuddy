#!/usr/bin/env node
/**
 * Queue + tracker for the "Bible in One Year Day N Study Notes" blog series
 * (Louis, 2026-09-19: 3 new Study Notes a day, in Day order, Day 1 through
 * Day 365 - replacing the chapter blog library as the production priority;
 * see scripts/chapter-blog-queue.mjs's own "paused" flag).
 *
 * Same shape as scripts/chapter-blog-queue.mjs on purpose: the Writer
 * routine never decides "what's next" itself - it asks this script, so
 * order, retries, pausing and duplicate protection live in one place.
 * State is data/bible-year-notes/progress.json (committed with each
 * article). See docs/BIBLE_YEAR_STUDY_NOTES_WRITER_AGENT.md.
 *
 *   node scripts/bible-year-notes-queue.mjs status
 *   node scripts/bible-year-notes-queue.mjs next            # peek, no changes
 *   node scripts/bible-year-notes-queue.mjs claim           # mark next as generating
 *   node scripts/bible-year-notes-queue.mjs set <slug> <status> ["note"]
 *   node scripts/bible-year-notes-queue.mjs verify-live     # committed -> published once live
 *   node scripts/bible-year-notes-queue.mjs check <slug>
 *   node scripts/bible-year-notes-queue.mjs self-test
 *
 * Statuses: generating, quality_check, committed (pushed, waiting for the
 * Deploy routine), published (seen live), failed (retried first next run),
 * needs_louis (failed MAX_ATTEMPTS times; skipped until Louis looks).
 *
 * IMPORTANT: progress.json starts with "paused": true. `claim` refuses to
 * hand out work while paused and prints { paused: true, reason }. This is
 * the hold Louis's Notion prompt asked for: do not turn the recurring 3/day
 * job on until he has reviewed Day 1 in production. Only Louis (or someone
 * acting on his explicit go-ahead) should flip it to false.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROGRESS_FILE = path.join(ROOT, "data/bible-year-notes/progress.json");
const BLOG_CONTENT = path.join(ROOT, "lib/blogContent.ts");
const MASTER_PLAN = path.join(ROOT, "docs/bible-in-one-year-master-plan.md");
const SITE = "https://www.mybiblebuddy.net";
const MAX_ATTEMPTS = 3;
const STALE_GENERATING_MS = 3 * 60 * 60 * 1000;

export function daySlug(day) {
  return `bible-in-one-year-day-${day}-study-notes`;
}

/**
 * Parses the "| Day | Reading | Title / Main Theme |" table in
 * docs/bible-in-one-year-master-plan.md - the doc Louis's prompt named as
 * the canonical Day 1 to 365 schedule - instead of hand copying 365 rows
 * into this script, so the two can never drift apart.
 */
export function allDays() {
  const text = fs.readFileSync(MASTER_PLAN, "utf8");
  const rows = [];
  for (const line of text.split("\n")) {
    const match = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$/);
    if (!match) continue;
    const day = Number(match[1]);
    const reading = match[2].trim();
    const title = match[3].trim();
    rows.push({
      day,
      reading,
      themeTitle: title,
      slug: daySlug(day),
      label: `Day ${day}`,
    });
  }
  return rows;
}

function loadProgress() {
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
}

function saveProgress(progress) {
  progress.updatedAt = new Date().toISOString();
  progress.nextDay = findNext(progress)?.label || "All 365 days complete";
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
 * The next day to write: the earliest day (Day 1 to 365) that has no
 * article and is not done, in flight, or parked for Louis. Same "failed
 * sits earlier than anything after it" retry rule as the chapter queue. A
 * day whose article already exists is reported as `existing` instead of
 * being claimed again.
 */
export function findNext(progress) {
  for (const item of allDays()) {
    const entry = progress.days[String(item.day)];
    if (entry && ["committed", "published", "needs_louis"].includes(entry.status)) continue;
    if (entry && ["generating", "quality_check"].includes(entry.status) && !isStaleGenerating(entry)) continue;
    if (articleExists(item.slug)) return { ...item, existing: true };
    return { ...item, attempts: entry?.attempts || 0, previousError: entry?.lastError || null };
  }
  return null;
}

function summary(progress) {
  const days = allDays();
  const entries = Object.entries(progress.days);
  const done = days.filter((d) => ["committed", "published"].includes(progress.days[String(d.day)]?.status));
  const published = entries.filter(([, e]) => e.status === "published");
  const today = berlinDate();
  const next = findNext(progress);
  const lastPublished = published
    .filter(([, e]) => e.publishedAt)
    .sort((a, b) => (a[1].publishedAt < b[1].publishedAt ? 1 : -1))[0];
  return {
    paused: Boolean(progress.paused),
    totalDays: days.length,
    completed: done.length,
    remaining: days.length - done.length,
    nextDay: next ? next.label : "All 365 days complete",
    dailyTarget: progress.dailyTarget,
    writtenToday: entries.filter(([, e]) => e.committedAt && berlinDate(e.committedAt) === today).length,
    publishedToday: entries.filter(([, e]) => e.publishedAt && berlinDate(e.publishedAt) === today).length,
    inProgress: entries.filter(([, e]) => ["generating", "quality_check"].includes(e.status)).map(([d]) => d),
    waitingForDeploy: entries.filter(([, e]) => e.status === "committed").map(([d]) => d),
    failed: entries.filter(([, e]) => e.status === "failed").map(([d, e]) => ({ day: d, attempts: e.attempts, lastError: e.lastError })),
    needsLouis: entries.filter(([, e]) => e.status === "needs_louis").map(([d, e]) => ({ day: d, lastError: e.lastError })),
    lastPublished: lastPublished ? { day: lastPublished[0], at: lastPublished[1].publishedAt } : null,
  };
}

async function verifyLive(progress) {
  const results = [];
  for (const [day, entry] of Object.entries(progress.days)) {
    if (entry.status !== "committed") continue;
    const slug = daySlug(Number(day));
    try {
      const res = await fetch(`${SITE}/blog/${slug}`, { redirect: "follow" });
      const html = res.ok ? await res.text() : "";
      if (res.ok && html.includes(`/blog/${slug}`)) {
        entry.status = "published";
        entry.publishedAt = new Date().toISOString();
        results.push({ day, slug, live: true });
      } else {
        results.push({ day, slug, live: false, http: res.status });
      }
    } catch (error) {
      results.push({ day, slug, live: false, error: String(error) });
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Quality gate: `check <slug>` must pass before a day is committed.
// ---------------------------------------------------------------------------

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

/** "Genesis 4:3 to 5", "1 John 3:11 and 12", "Psalm 23:1" -> { book, chapter, from, to } */
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
  const data = await kjvBook(ref.book);
  const chapter = data.chapters.find((c) => Number(c.chapter) === ref.chapter);
  if (!chapter) return `${reference}: chapter does not exist`;
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

async function checkArticle(slug) {
  const days = allDays();
  const dayItem = days.find((d) => d.slug === slug);
  if (!dayItem) throw new Error(`${slug} is not a Bible in One Year Study Notes slug`);
  const file = path.join(ROOT, "app/blog", slug, "page.tsx");
  if (!fs.existsSync(file)) throw new Error(`${file} does not exist`);
  const source = fs.readFileSync(file, "utf8");
  const text = articleText(source);
  const words = normalize(text).split(" ").filter(Boolean).length;
  const problems = [];
  const warnings = [];

  // 10 to 20 minute read, ~200 words/minute, per Louis's prompt.
  if (words < 1900) problems.push(`only ~${words} words; a 10 to 20 minute Study Notes read needs more`);
  if (words > 4200) warnings.push(`~${words} words; make sure nothing is padded (never pad to reach a target)`);

  const quotes = [...source.matchAll(/<VerseQuote\s+text="([^"]*)"\s+reference="([^"]*)"/g)];
  if (quotes.length < 5) problems.push(`only ${quotes.length} VerseQuote blocks`);
  for (const [, quoteText, reference] of quotes) {
    const verseProblem = await checkVerse(quoteText, reference);
    if (verseProblem) problems.push(verseProblem);
  }

  const internalLinks = [...source.matchAll(/<ArticleLink\s+href="(\/blog\/[^"]+)"/g)].map((m) => m[1]);
  const blogContent = fs.readFileSync(BLOG_CONTENT, "utf8");
  for (const href of internalLinks) {
    const target = href.replace(/^\/blog\//, "").replace(/[#?].*$/, "");
    if (!blogContent.includes(`slug: "${target}"`)) problems.push(`broken internal link ${href}`);
  }

  if (/Keep Growing With Bible Buddy|StudyCta|clicking the button below/i.test(source)) {
    problems.push("contains an end-of-post CTA; the end card is the only CTA");
  }
  if (!/Frequently Asked Questions/i.test(source)) problems.push("missing a Frequently Asked Questions section");
  if (!blogContent.includes(`bibleYearDay: ${dayItem.day},`)) problems.push(`BLOG_ARTICLES entry is missing bibleYearDay: ${dayItem.day}`);
  if (!blogContent.includes(`slug: "${slug}"`)) problems.push(`${slug} is not in BLOG_ARTICLES`);

  // Never invent a video: a videoId in the page must trace back to the
  // registry, never a bare string typed into the page itself.
  const videoIds = [...source.matchAll(/videoId="([^"]+)"/g)].map((m) => m[1]);
  if (videoIds.length) {
    const registry = fs.readFileSync(path.join(ROOT, "lib/bibleYearDayYoutubeVideos.ts"), "utf8");
    for (const id of videoIds) {
      if (!registry.includes(id)) problems.push(`videoId "${id}" is not in lib/bibleYearDayYoutubeVideos.ts; never hand type a video id`);
    }
  }

  return { slug, day: dayItem.day, ok: problems.length === 0, words, verseQuotes: quotes.length, internalLinks: internalLinks.length, problems, warnings };
}

function selfTest() {
  const days = allDays();
  const slugs = new Set(days.map((d) => d.slug));
  const checks = {
    days365: days.length === 365,
    uniqueSlugs: slugs.size === 365,
    day1: days[0]?.slug === "bible-in-one-year-day-1-study-notes" && days[0]?.reading === "Genesis 1-2",
    day365: days[364]?.day === 365,
    daysAscending: days.every((d, i) => d.day === i + 1),
  };
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
        print({ paused: true, reason: progress.pausedReason || "Waiting on Louis's approval. Do not claim a day." });
        break;
      }
      let next = findNext(progress);
      while (next?.existing) {
        progress.days[String(next.day)] = { ...(progress.days[String(next.day)] || {}), status: "published", note: "article already existed; not rewritten" };
        next = findNext(progress);
      }
      if (!next) {
        saveProgress(progress);
        print({ done: true });
        break;
      }
      const entry = progress.days[String(next.day)] || { attempts: 0 };
      entry.status = "generating";
      entry.attempts = (entry.attempts || 0) + 1;
      entry.startedAt = new Date().toISOString();
      progress.days[String(next.day)] = entry;
      saveProgress(progress);
      print({ ...next, attempts: entry.attempts });
      break;
    }
    case "set": {
      const [dayArg, status, note] = args;
      const allowed = ["generating", "quality_check", "committed", "published", "failed", "needs_louis"];
      const day = Number(dayArg);
      if (!day || !allowed.includes(status)) throw new Error(`usage: set <day> <${allowed.join("|")}> ["note"]`);
      if (!allDays().some((d) => d.day === day)) throw new Error(`${day} is not a Bible in One Year day (1 to 365)`);
      const entry = progress.days[String(day)] || { attempts: 0 };
      entry.status = status;
      if (status === "committed") entry.committedAt = new Date().toISOString();
      if (status === "published") entry.publishedAt = new Date().toISOString();
      if (status === "failed") {
        entry.lastError = note || "unspecified";
        if ((entry.attempts || 0) >= MAX_ATTEMPTS) entry.status = "needs_louis";
      } else if (note) {
        entry.note = note;
      }
      progress.days[String(day)] = entry;
      saveProgress(progress);
      print({ day, ...entry });
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
      console.error("commands: status | next | claim | set <day> <status> [note] | verify-live | check <slug> | self-test");
      process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
