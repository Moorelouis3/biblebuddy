"use client";

/**
 * Text in the reader's language.
 *
 *   const t = useT();
 *   <button>{t("settings.save")}</button>
 *   <p>{t("bible.chaptersDone", { done: 3, total: 50 })}</p>
 *
 * English is the source and lives in lib/i18n/messages/en.ts; every key must
 * exist there. German is lib/i18n/messages/de.ts. A key with no German yet
 * shows its English, so a screen can be converted before it is translated and
 * nothing is ever blank.
 *
 * Only the reader's own language is downloaded: the German file is a separate
 * chunk fetched the first time someone needs it, so English readers never pay
 * for it.
 *
 * No library. The app needs lookups, {placeholders} and a singular/plural
 * pair, and a dependency that hooks into the build would cost more on Vercel
 * than this file does to keep.
 */

import { useCallback, useEffect, useState } from "react";
import { en, type MessageKey } from "./messages/en";
import {
  localeFor,
  onAppLanguageChange,
  pullAppLanguageFromAccount,
  readAppLanguage,
  saveAppLanguage,
  type AppLanguage,
} from "./language";

type Messages = Partial<Record<MessageKey, string>>;
type Vars = Record<string, string | number>;

const loaded: Partial<Record<AppLanguage, Messages>> = { en };
const loading: Partial<Record<AppLanguage, Promise<void>>> = {};
const LOADED_EVENT = "bb:app-language-loaded";

function load(language: AppLanguage): Promise<void> {
  if (loaded[language]) return Promise.resolve();
  if (!loading[language]) {
    loading[language] = (language === "de" ? import("./messages/de").then((m) => m.de) : Promise.resolve(en))
      .then((messages) => {
        loaded[language] = messages;
        if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(LOADED_EVENT));
      })
      .catch(() => {
        // The chunk did not arrive. English shows; the next page load tries again.
        delete loading[language];
      });
  }
  return loading[language]!;
}

function fill(text: string, vars?: Vars) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (whole, name: string) => (name in vars ? String(vars[name]) : whole));
}

export function translate(language: AppLanguage, key: MessageKey, vars?: Vars): string {
  return fill(loaded[language]?.[key] ?? en[key] ?? key, vars);
}

/** The app language as state: `[language, setLanguage]`. */
export function useAppLanguage(): [AppLanguage, (language: AppLanguage) => void] {
  // Starts on English (what the server renders), then takes the saved choice.
  const [language, setLanguage] = useState<AppLanguage>("en");
  const [, bump] = useState(0);

  useEffect(() => {
    const adopt = () => {
      const saved = readAppLanguage();
      setLanguage(saved);
      void load(saved);
      if (document.documentElement.lang !== saved) document.documentElement.lang = saved;
    };
    const redraw = () => bump((n) => n + 1);
    adopt();
    const stop = onAppLanguageChange(adopt);
    window.addEventListener(LOADED_EVENT, redraw);
    void pullAppLanguageFromAccount();
    return () => {
      stop();
      window.removeEventListener(LOADED_EVENT, redraw);
    };
  }, []);

  const choose = useCallback((next: AppLanguage) => {
    setLanguage(next);
    void load(next);
    saveAppLanguage(next);
  }, []);

  return [language, choose];
}

export type Translate = {
  (key: MessageKey, vars?: Vars): string;
  /** The reader's language, for the few places that need to branch on it. */
  language: AppLanguage;
  /** "1 chapter" / "3 chapters": pass the two keys and the count. */
  plural: (count: number, one: MessageKey, other: MessageKey, vars?: Vars) => string;
  /** A date or number the way the reader's language writes it. */
  locale: string;
};

export function useT(): Translate {
  const [language] = useAppLanguage();
  const t = ((key: MessageKey, vars?: Vars) => translate(language, key, vars)) as Translate;
  t.language = language;
  t.locale = localeFor(language);
  t.plural = (count, one, other, vars) => translate(language, count === 1 ? one : other, { count, ...vars });
  return t;
}
