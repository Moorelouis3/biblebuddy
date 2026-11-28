/**
 * Every piece of interface text, in English. This file is the source.
 *
 * Rules:
 * - A key is `area.what`, lower camel case after the dot.
 * - One whole sentence per key. Never build a sentence from pieces: German
 *   puts the words in a different order.
 * - Values that change go in {braces}: "{done} of {total} chapters".
 * - A singular and a plural get two keys, `x.one` and `x.other`, used with
 *   t.plural().
 * - Add the German in ./de.ts in the same commit when you can. A key with no
 *   German shows this English, so nothing is ever blank.
 */
import { authEn } from "./en/auth";
import { homeEn } from "./en/home";
import { readerEn } from "./en/reader";
import { settingsEn } from "./en/settings";
import { shellEn } from "./en/shell";

const core = {
  // Bottom menu
  "nav.home": "Home",
  "nav.bible": "Bible",
  "nav.library": "Library",
  "nav.games": "Games",
  "nav.feed": "Feed",
  "nav.lilLouis": "Lil Louis",
  "nav.tv": "TV",

  // Shared
  "common.tryAgain": "Try again",
  "common.completed": "Completed",
  "common.english": "English",

  // Settings
  "settings.title": "Settings",
  "settings.language.title": "Language",
  "settings.language.description": "The language Bible Buddy speaks to you. Your notes, progress and everything else stay as they are.",
  "settings.language.note": "German is new. Anything not translated yet shows in English.",
  "settings.language.suggestBible": "Read the Bible in German too (Luther 1912)",
  "settings.bibleVersion.title": "Bible version",
  "settings.bibleVersion.description": "The version you read in. It is used in the Bible, Bible in One Year and Bible Memory.",
  "settings.bibleVersion.note": "Study notes, Verse of the Day, the study guides and the games are written from the King James Version, so they stay in it.",

  // The Bible menu
  "bible.title": "The Bible",
  "bible.subtitle": "Explore every book of the Bible. Read, study, and grow in your faith.",
  "bible.tab.all": "All Books",
  "bible.tab.old": "Old Testament",
  "bible.tab.new": "New Testament",
  "bible.tab.progress": "My Progress",
  "bible.tab.favorites": "Favorites",
  "bible.tabs.label": "Bible sections",
  "bible.search.placeholder": "Search for a book...",
  "bible.search.label": "Search for a book",
  "bible.alphabetical": "Alphabetical Order",
  "bible.row.notStarted": "Not started",
  "bible.row.progress": "{done} of {total} chapters",
  "bible.row.chapters.one": "{count} chapter",
  "bible.row.chapters.other": "{count} chapters",
  "bible.favorite.add": "Add {book} to favorites",
  "bible.favorite.remove": "Remove {book} from favorites",
  "bible.stat.books": "Books completed",
  "bible.stat.chapters": "Chapters read",
  "bible.stat.percent": "Of the Bible",
  "bible.progress.failed": "Your progress did not load. It is still saved.",
  "bible.progress.loading": "Loading your progress...",
  "bible.empty.search": "No book matches \"{query}\".",
  "bible.empty.favorites": "Tap the star on any book and it will be kept here.",
  "bible.empty.progress": "Finish a chapter and its book will show up here.",

  // One book: pick a chapter
  "book.allBooks": "All books",
  "book.progress.failed": "Couldn't load your progress",
  "book.intro.label": "Book intro",
  "book.intro.title": "Understanding {book}",
  "book.intro.fallback": "Let's walk through {book} together, one chapter at a time.",
  "book.roadmap": "Chapter roadmap",
  "book.button.again": "Read again: {book} 1",
  "book.button.continue": "Continue: {book} {chapter}",
  "book.button.start": "Start {book} 1",
  "book.button.open": "Open {book} 1",
  "book.pickChapter": "Pick a chapter",
  "book.chapter.label": "{book} chapter {chapter}",
  "book.chapter.finished": "{book} chapter {chapter}, finished",
  "book.chapter.next": "{book} chapter {chapter}, next",

  // The chapter reader
  "reader.listen": "Listen to {book} {chapter}",
} as const;

/** Bigger areas keep their text in ./en/<area>.ts; they are merged here. */
export const en = { ...core, ...settingsEn, ...authEn, ...homeEn, ...shellEn, ...readerEn } as const;

export type MessageKey = keyof typeof en;
