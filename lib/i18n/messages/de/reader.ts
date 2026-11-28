/** Deutsch: reader. Voice and rules: see ../de.ts. */
import type { readerEn } from "../en/reader";

export const readerDe: Partial<Record<keyof typeof readerEn, string>> = {
  // Chapter menu at the top of the reader
  "reader.menu.books": "Bücher",
  "reader.menu.back": "Zurück",
  "reader.menu.allBooks": "Alle Bücher",

  // Reader tabs
  "reader.tab.scripture": "Bibeltext",
  "reader.tab.trivia": "Quiz",
  "reader.tab.scrambled": "Wortsalat",
  "reader.trivia.loading": "Quiz wird geladen...",
  "reader.scrambled.loading": "Wortsalat wird geladen...",

  // Study Mode switch
  "reader.studyMode.title": "Studienmodus",
  "reader.studyMode.on": "Jede Erklärkarte steht unter ihrem Vers.",
  "reader.studyMode.offPlayer": "Tippe auf markierte Wörter und entdecke mehr",
  "reader.studyMode.offInline": "Tippe unten auf eine unterstrichene Stelle, um ihre Erklärkarte zu öffnen.",

  // Mark complete
  "reader.complete.done": "Kapitel abgeschlossen",
  "reader.complete.saving": "Wird gespeichert...",
  "reader.complete.mark": "Kapitel als gelesen markieren",

  // Discussion under the chapter
  "reader.discussion.label": "Austausch zum Kapitel",
  "reader.discussion.question":
    "Du hast {book} {chapter} gelesen: Was ist dir am meisten aufgefallen, oder was hast du in diesem Kapitel über Gott gelernt?",
  "reader.discussion.heading": "Austausch zu {book} {chapter}",
  "reader.discussion.placeholder": "Schreib hier los",
  "reader.discussion.post": "Kommentar posten",

  // The audio player
  "reader.audio.listen": "Anhören",
  "reader.audio.play": "Abspielen",
  "reader.audio.pause": "Pause",
  "reader.audio.resume": "Weiter",
  "reader.audio.loading": "Lädt",
  "reader.audio.stop": "Stopp",
  "reader.audio.stopLabel": "Audio stoppen",
  "reader.audio.playLabel": "Abspielen: {label}",
  "reader.audio.pauseLabel": "Pause: {label}",
  "reader.audio.back15": "15 Sekunden zurück",
  "reader.audio.back15Short": "15 Sekunden zurück",
  "reader.audio.forward15": "15 Sekunden vor",
  "reader.audio.forward15Short": "15 Sekunden vor",
  "reader.audio.back10": "10 Sekunden zurück",
  "reader.audio.forward10": "10 Sekunden vor",
  "reader.audio.previousChapter": "Vorheriges Kapitel",
  "reader.audio.nextChapter": "Nächstes Kapitel",
  "reader.audio.unavailable": "Audio nicht verfügbar",
  "reader.audio.unavailableRetry": "Audio nicht verfügbar. Versuch es nochmal.",
  "reader.audio.savedAt": "Gespeichert bei {time}",
  "reader.audio.aiDisclosure": "Von einer KI gesprochen, auf Wunsch mit Hintergrundmusik.",

  // Insight Cards (the frame; the note itself is content)
  "reader.insight.close": "Diese Erklärkarte schließen",
  "reader.insight.open": "Erklärkarte „{title}“ öffnen",
  "reader.insight.loading": "Die ganze Notiz wird geladen…",
  "reader.insight.failed":
    "Der Rest dieser Notiz konnte nicht geladen werden. Prüf deine Verbindung, schließ die Karte und öffne sie nochmal.",

  // Highlights
  "reader.highlight.verse": "Vers {verse} markieren",
  "reader.highlight.actions": "Aktionen für die Markierung",
  "reader.highlight.color": "Farbe",
  "reader.highlight.remove": "Entfernen",
  "reader.highlight.viewNote": "Klicke, um diese Notiz zu lesen",
  "reader.highlight.rangeHint": "Klicke, um eine Notiz hinzuzufügen, die Farbe zu ändern oder die Markierung zu entfernen",
  "reader.highlight.loadFailed":
    "Deine Markierungen für dieses Kapitel konnten nicht geladen werden. Sie sind weiterhin gespeichert. Öffne das Kapitel nochmal, um es erneut zu versuchen.",
  "reader.highlight.removeFailed": "Die Markierung konnte nicht entfernt werden. Prüf deine Verbindung und versuch es nochmal.",
  "reader.highlight.saveFailed": "Die Markierung wurde nicht gespeichert. Prüf deine Verbindung und versuch es nochmal.",
  "reader.color.yellow": "Gelb",
  "reader.color.green": "Grün",
  "reader.color.blue": "Blau",
  "reader.color.purple": "Lila",
  "reader.color.orange": "Orange",

  // A note on a highlight
  "reader.note.add": "Notiz hinzufügen",
  "reader.note.edit": "Notiz bearbeiten",
  "reader.note.delete": "Notiz löschen",
  "reader.note.deleting": "Wird gelöscht...",
  "reader.note.save": "Notiz speichern",
  "reader.note.saving": "Wird gespeichert...",
  "reader.note.cancel": "Abbrechen",
  "reader.note.close": "Schließen",
  "reader.note.closeLabel": "Notiz schließen",
  "reader.note.options": "Optionen für die Notiz",
  "reader.note.label": "Notiz zur Markierung",
  "reader.note.title": "Schreib eine Notiz zu dieser Markierung",
  "reader.note.mine": "Meine Notiz",
  "reader.note.viewerLabel": "Notiz",
  "reader.note.placeholder": "Schreib auf, was dir diese markierte Stelle bedeutet...",

  // The menu a verse number opens
  "reader.memory.add": "Zu „Bibelverse lernen“ hinzufügen",
  "reader.memory.saved": "In „Bibelverse lernen“",
  "reader.memory.failed": "Nicht gespeichert. Tippe zum Wiederholen",
  "reader.share.verse": "Vers teilen",
  "reader.share.preparing": "Wird vorbereitet…",

  // One book: pick a chapter
  "reader.book.descriptionFallback": "Geh dieses Buch Kapitel für Kapitel durch.",
};
