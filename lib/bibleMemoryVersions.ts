"use client";

/**
 * Bible Memory: a saved verse in another Bible version (2026-11-27).
 *
 * Louis: "to pick the translation when you are there, so if you save a verse
 * from verse of the day or from the bible you can read it in the other
 * translations when trying to memorize".
 *
 * A verse is saved once, in the wording it had where it was saved (almost
 * always the King James). The picker in Bible Memory does not change that
 * row. It asks for the same reference in the picked version and the screens
 * use that wording instead, so progress, medals and "I know it" stay on the
 * one verse whichever version it is being learned in.
 *
 * Where the words come from:
 *   KJV   the app's own files, public/kjv.
 *   WEB   bible-api.com, the same service the chapter reader uses.
 *   ASV   the same.
 * All three are public domain. Each verse is fetched once and then kept on
 * the phone, so the next visit does not ask again.
 *
 * A verse that cannot be fetched keeps its saved wording and its saved
 * label, so the card never claims a version it is not showing.
 */

import { cleanVerseText, type MemoryVerse } from "./bibleMemoryGames";
import type { BibleVersion } from "./bibleVersionPreference";

const CACHE_KEY = "bb:memory-verse-text:v1";
const MAX_CACHED = 400;

type Cache = Record<string, string>;

function readCache(): Cache {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CACHE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? (parsed as Cache) : {};
  } catch {
    return {};
  }
}

function writeCache(cache: Cache) {
  if (typeof window === "undefined") return;
  try {
    const keys = Object.keys(cache);
    // Oldest out first: object keys keep the order they were added in.
    for (const key of keys.slice(0, Math.max(0, keys.length - MAX_CACHED))) delete cache[key];
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Full or blocked storage: the verse is simply fetched again next time.
  }
}

type Reference = Pick<MemoryVerse, "book" | "chapter" | "verse" | "verse_end">;

function cacheKey(version: BibleVersion, verse: Reference) {
  return `${version}|${verse.book.toLowerCase()}|${verse.chapter}|${verse.verse}|${verse.verse_end ?? ""}`;
}

async function fetchKjv(verse: Reference): Promise<string | null> {
  const slug = verse.book.toLowerCase().trim().replace(/\s+/g, "-");
  const response = await fetch(`/kjv/${slug}/${verse.chapter}.json`);
  if (!response.ok) return null;
  const rows = (await response.json()) as Array<{ number: number; text: string }>;
  const last = verse.verse_end && verse.verse_end > verse.verse ? verse.verse_end : verse.verse;
  const text = rows
    .filter((row) => row.number >= verse.verse && row.number <= last)
    .map((row) => row.text)
    .join(" ");
  return cleanVerseText(text) || null;
}

async function fetchFromBibleApi(verse: Reference, version: BibleVersion): Promise<string | null> {
  const range = verse.verse_end && verse.verse_end > verse.verse ? `-${verse.verse_end}` : "";
  const reference = `${encodeURIComponent(verse.book.toLowerCase())}+${verse.chapter}:${verse.verse}${range}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`https://bible-api.com/${reference}?translation=${version}`, { signal: controller.signal });
    if (!response.ok) return null;
    const data = (await response.json()) as { verses?: Array<{ text?: string }> };
    const text = (data.verses || []).map((row) => row.text || "").join(" ");
    return cleanVerseText(text) || null;
  } finally {
    clearTimeout(timer);
  }
}

/** The wording already on the phone for this verse in this version, if any. */
export function cachedVerseText(verse: MemoryVerse, version: BibleVersion): string | null {
  if (verse.translation.toUpperCase() === version.toUpperCase()) return cleanVerseText(verse.verse_text);
  return readCache()[cacheKey(version, verse)] ?? null;
}

/**
 * The saved verses in the picked version. Returns a map of verse id to its
 * wording; a verse that is missing from the map could not be loaded and
 * should be shown as it was saved.
 *
 * One request at a time: the verse service allows only a handful a few
 * seconds apart, and a first visit with twenty saved verses must not trip it.
 */
export async function loadVersesInVersion(
  verses: readonly MemoryVerse[],
  version: BibleVersion,
  onEach?: (id: string, text: string) => void,
): Promise<Record<string, string>> {
  const cache = readCache();
  const out: Record<string, string> = {};
  let fetched = 0;
  for (const verse of verses) {
    if (verse.translation.toUpperCase() === version.toUpperCase()) {
      out[verse.id] = cleanVerseText(verse.verse_text);
      continue;
    }
    const key = cacheKey(version, verse);
    let text: string | null = cache[key] ?? null;
    if (!text) {
      try {
        // After the first dozen, wait between requests rather than be refused.
        if (version !== "kjv" && fetched >= 12) await new Promise((resolve) => setTimeout(resolve, 2100));
        text = version === "kjv" ? await fetchKjv(verse) : await fetchFromBibleApi(verse, version);
        fetched += 1;
      } catch {
        text = null;
      }
      if (text) {
        cache[key] = text;
        writeCache(cache);
      }
    }
    if (text) {
      out[verse.id] = text;
      onEach?.(verse.id, text);
    }
  }
  return out;
}
