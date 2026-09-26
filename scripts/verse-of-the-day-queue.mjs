#!/usr/bin/env node
/**
 * Queue + tracker for Verse of the Day (Louis, 2026-09-26).
 *
 * The original run was a 30-day pilot (scripts/seed-verse-of-the-day.ts) and
 * quietly ran out. This is the same pattern as the chapter blog library: the
 * writer routine never decides "what's next" itself, it asks this script, so
 * scheduling, duplicate protection and the runway target live in one place.
 *
 * State is the database, not a JSON file - verse_of_the_day_entries is the
 * single source of truth, so a run on any machine sees the same queue.
 *
 *   node scripts/verse-of-the-day-queue.mjs status
 *   node scripts/verse-of-the-day-queue.mjs next            # peek, no writes
 *   node scripts/verse-of-the-day-queue.mjs used            # references already taken
 *   node scripts/verse-of-the-day-queue.mjs record &lt;file&gt;   # write one entry from JSON
 *   node scripts/verse-of-the-day-queue.mjs self-test
 *
 * `record` fetches the KJV text itself from bible-api.com (never trust a
 * hand-typed verse) and upserts on scheduled_date, so re-running is safe.
 */
import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const TABLE = "verse_of_the_day_entries";
/** Keep this many approved days ahead; the writer stops when it is reached. */
export const TARGET_RUNWAY_DAYS = 90;
const BACKGROUND_ROTATION = ["purple-sunrise", "blue-sunrise", "green-mountains", "orange-night"];
const REQUIRED_FIELDS = [
  "reference",
  "book",
  "chapter",
  "verse_start",
  "title",
  "author_section",
  "context_section",
  "meaning_section",
  "application_section",
  "takeaway",
  "reflection_question",
  "prayer",
];

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env.local");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

/** Berlin calendar day, the same boundary the app and the watchdog use. */
export function berlinDay(offsetDays = 0) {
  const at = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(at);
}

export function addDays(isoDate, days) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

/** Normalised for duplicate checks: "Psalm 23:1" and "psalms 23:1" are one verse. */
export function referenceKey(reference) {
  return String(reference)
    .toLowerCase()
    .replace(/^psalms?\b/, "psalm")
    .replace(/\s+/g, " ")
    .replace(/[.,]/g, "")
    .trim();
}

async function loadEntries(supabase) {
  const { data, error } = await supabase.from(TABLE).select("scheduled_date, status, reference").order("scheduled_date");
  if (error) throw new Error(`${TABLE}: ${error.message}`);
  return data || [];
}

/**
 * The next date to write: the first day from today onward with no approved
 * entry. Gaps are filled before the queue extends, so a missing day in the
 * middle is never skipped.
 */
export function findNextDate(entries, today = berlinDay()) {
  const approved = new Set(entries.filter((e) => e.status === "approved").map((e) => e.scheduled_date));
  for (let i = 0; i < 400; i += 1) {
    const day = addDays(today, i);
    if (!approved.has(day)) return day;
  }
  return null;
}

export function runwayDays(entries, today = berlinDay()) {
  const approved = new Set(entries.filter((e) => e.status === "approved").map((e) => e.scheduled_date));
  let days = 0;
  while (approved.has(addDays(today, days))) days += 1;
  return days;
}

function summary(entries) {
  const today = berlinDay();
  const approved = entries.filter((e) => e.status === "approved");
  const runway = runwayDays(entries, today);
  const next = findNextDate(entries, today);
  return {
    today,
    totalEntries: entries.length,
    approved: approved.length,
    runwayDays: runway,
    lastCoveredDay: runway ? addDays(today, runway - 1) : null,
    targetRunwayDays: TARGET_RUNWAY_DAYS,
    shortBy: Math.max(0, TARGET_RUNWAY_DAYS - runway),
    writeMore: runway < TARGET_RUNWAY_DAYS,
    nextDateToWrite: next,
    usedReferences: approved.length,
  };
}

async function fetchKjv(book, chapter, verseStart, verseEnd) {
  const range = verseEnd ? `${verseStart}-${verseEnd}` : `${verseStart}`;
  const url = `https://bible-api.com/${encodeURIComponent(book)}+${chapter}:${range}?translation=kjv`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const res = await fetch(url);
    if (res.ok) {
      const payload = await res.json();
      const text = String(payload.text || "").replace(/\s+/g, " ").trim();
      if (text) return text;
      throw new Error(`bible-api returned no text for ${book} ${chapter}:${range}`);
    }
    if (res.status !== 429) throw new Error(`bible-api ${res.status} for ${book} ${chapter}:${range}`);
    await new Promise((r) => setTimeout(r, attempt * 1500));
  }
  throw new Error(`bible-api rate limited for ${book} ${chapter}:${range}`);
}

function selfTest() {
  const entries = [
    { scheduled_date: "2026-09-26", status: "approved", reference: "James 1:5" },
    { scheduled_date: "2026-09-27", status: "approved", reference: "John 14:6" },
    { scheduled_date: "2026-09-29", status: "approved", reference: "Psalm 139:14" },
  ];
  const checks = {
    addDaysRollsMonth: addDays("2026-09-30", 1) === "2026-10-01",
    addDaysRollsYear: addDays("2026-12-31", 1) === "2027-01-01",
    runwayStopsAtGap: runwayDays(entries, "2026-09-26") === 2,
    nextFillsGapFirst: findNextDate(entries, "2026-09-26") === "2026-09-28",
    nextAfterFullRun: findNextDate(entries.slice(0, 2), "2026-09-26") === "2026-09-28",
    psalmsAndPsalmMatch: referenceKey("Psalms 23:1") === referenceKey("Psalm 23:1"),
    caseInsensitive: referenceKey("JOHN 3:16") === referenceKey("john 3:16"),
    differentVersesDiffer: referenceKey("John 3:16") !== referenceKey("John 3:17"),
  };
  return { ok: Object.values(checks).every(Boolean), checks };
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  const print = (value) => console.log(JSON.stringify(value, null, 2));

  if (command === "self-test") {
    const result = selfTest();
    print(result);
    if (!result.ok) process.exitCode = 1;
    return;
  }

  const supabase = admin();
  const entries = await loadEntries(supabase);

  switch (command) {
    case "status":
      print(summary(entries));
      break;

    case "next": {
      const info = summary(entries);
      if (!info.writeMore) {
        print({ done: true, reason: `Queue already has ${info.runwayDays} days, target is ${TARGET_RUNWAY_DAYS}.`, ...info });
        break;
      }
      print({
        scheduled_date: info.nextDateToWrite,
        background_theme: BACKGROUND_ROTATION[entries.length % BACKGROUND_ROTATION.length],
        runwayDays: info.runwayDays,
        shortBy: info.shortBy,
        avoidReferences: entries.map((e) => e.reference).filter(Boolean),
      });
      break;
    }

    case "used":
      print({
        count: entries.length,
        references: entries.map((e) => e.reference).filter(Boolean).sort(),
      });
      break;

    case "record": {
      const file = args[0];
      if (!file) throw new Error("usage: record <path-to-entry.json>");
      const entry = JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
      const missing = REQUIRED_FIELDS.filter((f) => entry[f] === undefined || entry[f] === null || entry[f] === "");
      if (missing.length) throw new Error(`entry is missing: ${missing.join(", ")}`);

      const taken = new Set(entries.map((e) => referenceKey(e.reference)));
      if (taken.has(referenceKey(entry.reference))) {
        throw new Error(`${entry.reference} has already been used - pick another verse`);
      }

      const scheduled = entry.scheduled_date || findNextDate(entries);
      if (entries.some((e) => e.scheduled_date === scheduled && e.status === "approved")) {
        throw new Error(`${scheduled} already has an approved verse`);
      }

      const verseText = await fetchKjv(entry.book, entry.chapter, entry.verse_start, entry.verse_end);
      const row = {
        ...entry,
        scheduled_date: scheduled,
        translation: "KJV",
        verse_text: verseText,
        status: "approved",
        background_theme: entry.background_theme || BACKGROUND_ROTATION[entries.length % BACKGROUND_ROTATION.length],
        edited_by: entry.edited_by || "verse-writer-routine",
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from(TABLE).upsert(row, { onConflict: "scheduled_date" });
      if (error) throw new Error(`upsert: ${error.message}`);
      print({ saved: scheduled, reference: row.reference, verse_text: verseText, runwayDays: runwayDays([...entries, row]) });
      break;
    }

    default:
      console.error("commands: status | next | used | record <file> | self-test");
      process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"))) {
  // exitCode, not exit(): a hard exit with the Supabase socket still open
  // prints a libuv assertion on Windows after the real error message.
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
