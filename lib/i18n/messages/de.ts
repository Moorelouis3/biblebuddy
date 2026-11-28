/**
 * Bible Buddy auf Deutsch.
 *
 * Voice: "du", never "Sie". Short, warm, plain sentences, the way Louis
 * writes in English. Church words follow what German free churches and the
 * Luther Bible say: Altes Testament, Kapitel, Andacht, Bibelleseplan.
 *
 * Names that stay as they are: Bible Buddy, Lil Louis, Feed.
 *
 * A key left out of this file shows its English (see ./en.ts). That is fine
 * while a screen is being converted; it is not fine at release.
 */
import type { MessageKey } from "./en";
import { authDe } from "./de/auth";
import { homeDe } from "./de/home";
import { readerDe } from "./de/reader";
import { settingsDe } from "./de/settings";
import { shellDe } from "./de/shell";

const core: Partial<Record<MessageKey, string>> = {
  // Bottom menu
  "nav.home": "Start",
  "nav.bible": "Bibel",
  "nav.library": "Bibliothek",
  "nav.games": "Spiele",
  "nav.feed": "Feed",
  "nav.lilLouis": "Lil Louis",
  "nav.tv": "TV",

  // Shared
  "common.tryAgain": "Nochmal versuchen",
  "common.completed": "Abgeschlossen",
  "common.english": "Englisch",

  // Settings
  "settings.title": "Einstellungen",
  "settings.language.title": "Sprache",
  "settings.language.description": "Die Sprache, in der Bible Buddy mit dir spricht. Deine Notizen, dein Fortschritt und alles andere bleiben, wie sie sind.",
  "settings.language.note": "Deutsch ist neu. Was noch nicht übersetzt ist, erscheint auf Englisch.",
  "settings.language.suggestBible": "Auch die Bibel auf Deutsch lesen (Luther 1912)",
  "settings.bibleVersion.title": "Bibelübersetzung",
  "settings.bibleVersion.description": "Die Übersetzung, in der du liest. Sie gilt für die Bibel, die Bibel in einem Jahr und Bibelverse lernen.",
  "settings.bibleVersion.note": "Studiennotizen, Vers des Tages, die Studienhefte und die Spiele sind auf Grundlage der King James Version geschrieben und bleiben deshalb vorerst auf Englisch.",

  // The Bible menu
  "bible.title": "Die Bibel",
  "bible.subtitle": "Entdecke jedes Buch der Bibel. Lies, lerne und wachse im Glauben.",
  "bible.tab.all": "Alle Bücher",
  "bible.tab.old": "Altes Testament",
  "bible.tab.new": "Neues Testament",
  "bible.tab.progress": "Mein Fortschritt",
  "bible.tab.favorites": "Favoriten",
  "bible.tabs.label": "Teile der Bibel",
  "bible.search.placeholder": "Buch suchen...",
  "bible.search.label": "Buch suchen",
  "bible.alphabetical": "Alphabetisch",
  "bible.row.notStarted": "Noch nicht begonnen",
  "bible.row.progress": "{done} von {total} Kapiteln",
  "bible.row.chapters.one": "{count} Kapitel",
  "bible.row.chapters.other": "{count} Kapitel",
  "bible.favorite.add": "{book} zu den Favoriten hinzufügen",
  "bible.favorite.remove": "{book} aus den Favoriten entfernen",
  "bible.stat.books": "Bücher abgeschlossen",
  "bible.stat.chapters": "Kapitel gelesen",
  "bible.stat.percent": "der Bibel",
  "bible.progress.failed": "Dein Fortschritt konnte nicht geladen werden. Er ist weiterhin gespeichert.",
  "bible.progress.loading": "Dein Fortschritt wird geladen...",
  "bible.empty.search": "Kein Buch passt zu „{query}“.",
  "bible.empty.favorites": "Tippe bei einem Buch auf den Stern, dann findest du es hier.",
  "bible.empty.progress": "Lies ein Kapitel zu Ende, dann erscheint das Buch hier.",

  // One book: pick a chapter
  "book.allBooks": "Alle Bücher",
  "book.progress.failed": "Dein Fortschritt konnte nicht geladen werden",
  "book.intro.label": "Einführung",
  "book.intro.title": "{book} verstehen",
  "book.intro.fallback": "Lass uns {book} gemeinsam durchgehen, ein Kapitel nach dem anderen.",
  "book.roadmap": "Kapitelübersicht",
  "book.button.again": "Nochmal lesen: {book} 1",
  "book.button.continue": "Weiterlesen: {book} {chapter}",
  "book.button.start": "{book} 1 beginnen",
  "book.button.open": "{book} 1 öffnen",
  "book.pickChapter": "Wähle ein Kapitel",
  "book.chapter.label": "{book}, Kapitel {chapter}",
  "book.chapter.finished": "{book}, Kapitel {chapter}, gelesen",
  "book.chapter.next": "{book}, Kapitel {chapter}, als Nächstes",

  // The chapter reader
  "reader.listen": "{book} {chapter} anhören",
};

export const de: Partial<Record<MessageKey, string>> = { ...core, ...settingsDe, ...authDe, ...homeDe, ...shellDe, ...readerDe };
