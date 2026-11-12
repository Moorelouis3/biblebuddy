"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addMemoryVerse,
  findMemoryVerseId,
  onMemoryVersesChange,
  removeMemoryVerse,
  type MemoryVerseInput,
} from "./bibleMemory";

/**
 * "Add to Bible Memory" for one verse, wherever the button happens to be: the
 * Daily Verse card, its popup, the reader. Flips at once, rolls back if the
 * save fails, and follows a save or removal made by any other copy on screen.
 *
 * Pass null while there is no verse to act on (a closed menu, a card that has
 * not loaded).
 */
export function useMemoryVerse(userId: string | null | undefined, verse: MemoryVerseInput | null) {
  const [savedId, setSavedId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const book = verse?.book ?? null;
  const chapter = verse?.chapter ?? null;
  const verseNumber = verse?.verse ?? null;
  const verseEnd = verse?.verseEnd ?? null;
  const translation = verse?.translation ?? null;
  const text = verse?.text ?? "";

  useEffect(() => {
    setSavedId(null);
    setFailed(false);
    if (!userId || !book || !chapter || !verseNumber) return;
    let cancelled = false;
    const key = { book, chapter, verse: verseNumber, verseEnd, translation };
    const check = () => {
      void findMemoryVerseId(userId, key).then((id) => {
        if (!cancelled) setSavedId(id);
      });
    };
    check();
    const unsubscribe = onMemoryVersesChange(check);
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [userId, book, chapter, verseNumber, verseEnd, translation]);

  const toggle = useCallback(async () => {
    if (!userId || !book || !chapter || !verseNumber || busy) return;
    setBusy(true);
    setFailed(false);
    try {
      if (savedId) {
        const previous = savedId;
        setSavedId(null);
        const ok = await removeMemoryVerse(userId, previous);
        if (!ok) {
          setSavedId(previous);
          setFailed(true);
        }
      } else {
        const result = await addMemoryVerse(userId, { book, chapter, verse: verseNumber, verseEnd, translation, text });
        if (result.status === "error") setFailed(true);
        else setSavedId(result.id ?? "saved");
      }
    } finally {
      setBusy(false);
    }
  }, [userId, book, chapter, verseNumber, verseEnd, translation, text, savedId, busy]);

  return { saved: Boolean(savedId), busy, failed, toggle };
}
