/** Deutsch: settings. Voice and rules: see ../de.ts. */
import type { settingsEn } from "../en/settings";

export const settingsDe: Partial<Record<keyof typeof settingsEn, string>> = {
  // Shared on the page
  "settings.loading": "Lädt ...",
  "settings.loadFailed": "Die Einstellungen konnten nicht geladen werden. Bitte versuch es gleich noch einmal.",
  "settings.errorWithMessage": "Fehler: {message}",
  "settings.saving": "Speichert ...",
  "settings.cancel": "Abbrechen",

  // Guest logging out
  "settings.guest.closeAria": "Hinweis zum Abmelden schließen",
  "settings.guest.eyebrow": "Gastkonto",
  "settings.guest.title": "Vor dem Abmelden ein Konto erstellen?",
  "settings.guest.body": "Du bist gerade als Gast hier. Wenn du dich abmeldest, kommst du nicht mehr in dieses Gastkonto zurück, es sei denn, du erstellst vorher ein Konto.",
  "settings.guest.create": "Konto erstellen",
  "settings.guest.logoutAnyway": "Trotzdem abmelden",

  // New Buddy chosen
  "settings.buddyReady.closeAria": "Hinweis schließen",
  "settings.buddyReady.eyebrow": "Bible Buddy bereit",
  "settings.buddyReady.title": "{name} ist bereit",
  "settings.buddyReady.body": "Dein neuer Bible Buddy ist bereit, dich durch die Bibel zu begleiten.",
  "settings.buddyReady.letsGo": "Los geht’s",
  "settings.buddyReady.ok": "OK",
  "settings.buddyReady.awesome": "Wie schön",

  // Bible cover
  "settings.cover.title": "Bibeleinband",
  "settings.cover.description": "Wähle die Bibel, die du bei dir tragen möchtest. Sie kleidet jede Seite von Bible Buddy ein.",
  "settings.cover.light": "Hell",
  "settings.cover.dark": "Dunkel",
  "settings.cover.lightMode": "Heller Modus",
  "settings.cover.darkMode": "Dunkler Modus",
  "settings.cover.coverAria": "Bibeleinband {cover}",
  "settings.cover.bookTitle": "DIE BIBEL",
  "settings.cover.buddies.one": "{count} Buddy",
  "settings.cover.buddies.other": "{count} Buddys",
  "settings.cover.firstUsing": "Du bist der erste Buddy mit {cover}.",
  "settings.cover.manyUsing": "{count} Buddys nutzen {cover}.",
  "settings.cover.motionNote": "Aus heißt: Das Bild steht still. Auf Handys, die nicht mitkommen, bleibt es von selbst stehen.",

  // Bible Buddy (the character)
  "settings.buddy.title": "Bible Buddy",
  "settings.buddy.description": "Wähle den Buddy, der dich auf der Startseite, im Menü, in Hinweisen, Spielen und beim Bibelstudium begleitet.",
  "settings.buddy.previousAria": "Vorheriger Bible Buddy",
  "settings.buddy.nextAria": "Nächster Bible Buddy",
  "settings.buddy.showAria": "{name} anzeigen",
  "settings.buddy.current": "Dein Buddy",
  "settings.buddy.select": "Buddy wählen",
  "settings.buddy.removing": "Wird entfernt ...",
  "settings.buddy.delete": "Löschen",
  "settings.buddy.none": "Es gibt noch keine Bible Buddys.",
  "settings.buddy.updated": "Bible Buddy geändert.",
  "settings.buddy.updateFailed": "Der Bible Buddy konnte nicht geändert werden.",
  "settings.buddy.removeConfirm": "{item} aus deinem Konto entfernen?",
  "settings.buddy.removed": "{item} wurde entfernt.",
  "settings.buddy.removeFailed": "Das konnte nicht entfernt werden.",

  // Display mode and streak flame
  "settings.display.updated": "Anzeige geändert.",
  "settings.display.updateFailed": "Die Anzeige konnte nicht geändert werden.",
  "settings.flame.updated": "Flamme geändert.",
  "settings.flame.updateFailed": "Die Flamme konnte nicht geändert werden.",

  // Profile
  "settings.profile.title": "Profil",
  "settings.profile.description": "Dein Name und deine E-Mail-Adresse.",
  "settings.profile.firstName": "Vorname",
  "settings.profile.firstNamePlaceholder": "Dein Vorname",
  "settings.profile.lastName": "Nachname",
  "settings.profile.lastNamePlaceholder": "Dein Nachname",
  "settings.profile.email": "E-Mail-Adresse",
  "settings.profile.emailPlaceholder": "deine@email.de",
  "settings.profile.save": "Speichern",
  "settings.profile.nameRequired": "Bitte gib deinen Vor- und Nachnamen ein.",
  "settings.profile.updated": "Dein Profil wurde gespeichert!",

  // Password
  "settings.password.title": "Passwort",
  "settings.password.description": "Schick dir einen Link, um ein neues festzulegen.",
  "settings.password.body": "Setz dein Passwort per E-Mail zurück. Wir schicken dir einen Link, mit dem du ein neues Passwort festlegst.",
  "settings.password.sent": "Die E-Mail ist unterwegs! Schau bitte in dein Postfach.",
  "settings.password.sending": "Wird gesendet ...",
  "settings.password.reset": "Passwort zurücksetzen",

  // Reading plan
  "settings.readingPlan.title": "Bibelleseplan",
  "settings.readingPlan.description": "Setz deinen Lesefortschritt in der Bibel auf den Anfang zurück.",
  "settings.readingPlan.resetButton": "Bibelleseplan zurücksetzen",
  "settings.readingPlan.warningTitle": "⚠️ Achtung",
  "settings.readingPlan.warningBody": "Dein Lesefortschritt, deine Level und deine Statistiken werden auf 0 zurückgesetzt. Das lässt sich nicht rückgängig machen.",
  "settings.readingPlan.resetting": "Wird zurückgesetzt ...",
  "settings.readingPlan.confirm": "Ja, zurücksetzen",
  "settings.readingPlan.done": "Dein Bibelleseplan wurde zurückgesetzt. Dein Fortschritt steht jetzt bei 0.",

  // Account
  "settings.account.title": "Konto",
  "settings.account.description": "Deine Nutzer-ID und seit wann du dabei bist.",
  "settings.account.userId": "Nutzer-ID",
  "settings.account.notAvailable": "–",
  "settings.account.joined": "Dabei seit",
  "settings.account.logout": "Abmelden",

  // Help
  "settings.help.title": "Hilfe",
  "settings.help.description": "Sieh dir die Einführung zur Startseite noch einmal an, wann immer du magst.",
  "settings.help.replay": "Einführung noch einmal ansehen",

  // Delete account
  "settings.delete.title": "Mein Konto löschen",
  "settings.delete.description": "Entferne dein Konto und alle deine Daten für immer.",
  "settings.delete.done": "Du bist abgemeldet und dein Konto kann nicht mehr benutzt werden. In 30 Tagen wird alles darin endgültig gelöscht. Das Datum haben wir dir per E-Mail geschickt. Wenn du es dir vorher anders überlegst, melde dich einfach wieder an und alles geht weiter wie bisher.",
  "settings.delete.intro": "Lösche dein Bible-Buddy-Konto und alles, was dazugehört: dein Profil, deinen Fortschritt, deine Notizen, Markierungen, Lesezeichen, Beiträge, Kommentare, Nachrichten und Chats mit Lil Louis. Du wirst sofort abgemeldet und 30 Tage später wird alles endgültig gelöscht.",
  "settings.delete.warningTitle": "Du hast 30 Tage Zeit, es dir anders zu überlegen",
  "settings.delete.warningBody": "Du wirst sofort überall abgemeldet und dein Konto funktioniert nicht mehr. Dein Fortschritt und alles, was du gepostet hast, wird in 30 Tagen endgültig gelöscht und lässt sich danach nicht wiederherstellen. Melde dich vorher wieder an, um das Löschen abzubrechen.",
  "settings.delete.typeToConfirm": "Tippe unten {word} ein, um zu bestätigen.",
  "settings.delete.placeholder": "DELETE eintippen",
  "settings.delete.typeError": "Tippe DELETE ein, um zu bestätigen.",
  "settings.delete.signInAgain": "Bitte melde dich neu an und versuch dann noch einmal, dein Konto zu löschen.",
  "settings.delete.failed": "Wir konnten dein Konto nicht löschen. Bitte versuch es noch einmal.",
  "settings.delete.deleting": "Wird gelöscht ...",
  "settings.delete.confirm": "Endgültig löschen",

  // Footer links
  "settings.legal.privacy": "Datenschutz",
  "settings.legal.terms": "Nutzungsbedingungen",
  "settings.legal.guidelines": "Community-Richtlinien",
};
