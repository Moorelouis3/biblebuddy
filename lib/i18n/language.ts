/**
 * The language Bible Buddy speaks to a reader: one setting for the whole app.
 *
 * Started 2026-11-28. Louis lives in Germany and wants to hand Bible Buddy to
 * German Christians: "a German-speaking person should be able to download
 * Bible Buddy and experience the entire platform in German." English first,
 * German second; other languages are added to APP_LANGUAGES and given a
 * message file, nothing else.
 *
 * This is NOT the Bible version. A reader may run the app in German and read
 * the King James, or the reverse; that choice lives in
 * lib/bibleVersionPreference.ts. Picking German here only suggests the German
 * Bible the first time (see suggestBibleVersionFor).
 *
 * Where it is kept: on the phone (localStorage) so the app opens in the right
 * language at once, and on the account (auth user metadata, `app_language`)
 * so it follows the reader to another device. The same shape as the Bible
 * version preference, on purpose.
 *
 * It is an experiment for now. The picker in Settings is shown to admins only
 * until Louis says German is ready to be seen (GERMAN_IS_PUBLIC below).
 */

import { supabase } from "../supabaseClient";

export type AppLanguage = "en" | "de";

export const APP_LANGUAGES: Array<{ value: AppLanguage; name: string; englishName: string }> = [
  { value: "en", name: "English", englishName: "English" },
  { value: "de", name: "Deutsch", englishName: "German" },
];

/** Flip to true when German is ready for everyone, not just for Louis to test. */
export const GERMAN_IS_PUBLIC = false;

const KEY = "bb:app-language:v1";
const CHANGE_EVENT = "bb:app-language-changed";
const ACCOUNT_FIELD = "app_language";

export function isAppLanguage(value: unknown): value is AppLanguage {
  return value === "en" || value === "de";
}

/** The reader's language. English until they pick another. */
export function readAppLanguage(): AppLanguage {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(KEY);
    return isAppLanguage(saved) ? saved : "en";
  } catch {
    return "en";
  }
}

function writeLocal(language: AppLanguage) {
  try {
    window.localStorage.setItem(KEY, language);
  } catch {
    // Full or blocked storage: the language still holds for this visit.
  }
  // Screen readers, hyphenation and the browser's own translate offer all read this.
  document.documentElement.lang = language;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

/** Hear about a change made on any screen. Returns unsubscribe. */
export function onAppLanguageChange(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

/**
 * The reader picked a language. Kept on the phone at once, told to every
 * screen that is listening, and written to the account in the background.
 */
export function saveAppLanguage(language: AppLanguage) {
  if (typeof window === "undefined" || !isAppLanguage(language)) return;
  const changed = readAppLanguage() !== language;
  writeLocal(language);
  if (!changed) return;
  void supabase.auth
    .getSession()
    .then(({ data }) => {
      if (!data.session?.user) return;
      if (data.session.user.user_metadata?.[ACCOUNT_FIELD] === language) return;
      return supabase.auth.updateUser({ data: { [ACCOUNT_FIELD]: language } });
    })
    .catch(() => {
      // Offline or signed out. The next change will try again.
    });
}

let pulled: Promise<void> | null = null;

/** Once per page load: adopt the language saved on the account. */
export function pullAppLanguageFromAccount(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!pulled) {
    pulled = supabase.auth
      .getSession()
      .then(({ data }) => {
        const saved = data.session?.user?.user_metadata?.[ACCOUNT_FIELD];
        if (isAppLanguage(saved) && saved !== readAppLanguage()) writeLocal(saved);
      })
      .catch(() => {
        // No session to read: the phone's own choice stands.
      });
  }
  return pulled;
}

/** Dates and numbers follow the language: 28. November 2026, 1.234. */
export function localeFor(language: AppLanguage): string {
  return language === "de" ? "de-DE" : "en-US";
}
