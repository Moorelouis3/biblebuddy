import {
  buildPopupMeaningPrompt,
  buildQuickPopupFallback,
  ensureLouisPopupVoice,
  extractCompactPopupMeaning,
  isLegacyPopupNotes,
  type BiblePopupKind,
} from "./biblePopupContent";
import { requestLouisNotes } from "./requestLouisNotes";
import { supabase } from "./supabaseClient";

type NotesKind = "people" | "places" | "keywords";

const notesCache = new Map<string, string>();
const inFlightNotes = new Map<string, Promise<string | null>>();

function buildCacheKey(kind: NotesKind, key: string): string {
  return `${kind}:${key}`;
}

export function normalizePersonNotesKey(person: string): string {
  return person.toLowerCase().trim().replace(/\s+/g, " ");
}

export function normalizePlaceNotesKey(place: string): string {
  return place.toLowerCase().trim().replace(/\s+/g, "_");
}

export function normalizeKeywordNotesKey(keyword: string): string {
  return keyword.toLowerCase().trim().replace(/\s+/g, " ");
}

async function getCachedOrLoad(
  kind: NotesKind,
  normalizedKey: string,
  loader: () => Promise<string | null>
): Promise<string | null> {
  const cacheKey = buildCacheKey(kind, normalizedKey);
  const cached = notesCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const existingPromise = inFlightNotes.get(cacheKey);
  if (existingPromise) {
    return existingPromise;
  }

  const promise = (async () => {
    const loaded = await loader();
    if (loaded?.trim()) {
      notesCache.set(cacheKey, loaded);
      return loaded;
    }
    return null;
  })();

  inFlightNotes.set(cacheKey, promise);

  try {
    return await promise;
  } finally {
    inFlightNotes.delete(cacheKey);
  }
}

async function loadSingleNotesRow(
  table: "bible_people_notes" | "places_in_the_bible_notes" | "keywords_in_the_bible",
  column: "person_name" | "normalized_place" | "keyword",
  normalizedKey: string
): Promise<string | null> {
  const { data: exactRows, error: exactError } = await supabase
    .from(table)
    .select("notes_text")
    .eq(column, normalizedKey)
    .limit(1);

  if (exactError) {
    throw exactError;
  }

  const exactText = Array.isArray(exactRows) ? exactRows[0]?.notes_text : null;
  if (typeof exactText === "string" && exactText.trim()) {
    return exactText;
  }

  if (table !== "keywords_in_the_bible") {
    return null;
  }

  const { data: insensitiveRows, error: insensitiveError } = await supabase
    .from(table)
    .select("notes_text")
    .ilike(column, normalizedKey)
    .limit(1);

  if (insensitiveError) {
    throw insensitiveError;
  }

  const insensitiveText = Array.isArray(insensitiveRows) ? insensitiveRows[0]?.notes_text : null;
  return typeof insensitiveText === "string" && insensitiveText.trim() ? insensitiveText : null;
}

async function persistAndCache(
  kind: NotesKind,
  normalizedKey: string,
  notesText: string,
  displayName: string
): Promise<string> {
  const trimmed = extractCompactPopupMeaning(kind, notesText.trim());
  const louisStyled = ensureLouisPopupVoice(kind, displayName, trimmed || notesText.trim());

  if (!louisStyled) {
    return notesText;
  }

  if (kind === "people") {
    await supabase
      .from("bible_people_notes")
      .upsert({ person_name: normalizedKey, notes_text: louisStyled }, { onConflict: "person_name" });
  } else if (kind === "places") {
    await supabase
      .from("places_in_the_bible_notes")
      .upsert({ normalized_place: normalizedKey, notes_text: louisStyled }, { onConflict: "normalized_place" });
  } else {
    await supabase
      .from("keywords_in_the_bible")
      .upsert({ keyword: normalizedKey, notes_text: louisStyled }, { onConflict: "keyword" });
  }

  notesCache.set(buildCacheKey(kind, normalizedKey), louisStyled);
  return louisStyled;
}

async function loadOrGeneratePopupNotes(
  kind: NotesKind,
  displayName: string,
  normalizedKey: string
): Promise<string> {
  const table =
    kind === "people"
      ? "bible_people_notes"
      : kind === "places"
        ? "places_in_the_bible_notes"
        : "keywords_in_the_bible";
  const column =
    kind === "people"
      ? "person_name"
      : kind === "places"
        ? "normalized_place"
        : "keyword";

  const existingNotes = await loadSingleNotesRow(table, column, normalizedKey);
  const compactExisting = existingNotes ? extractCompactPopupMeaning(kind as BiblePopupKind, existingNotes) : null;
  const louisExisting = compactExisting
    ? ensureLouisPopupVoice(kind as BiblePopupKind, displayName, compactExisting)
    : null;

  if (compactExisting && !isLegacyPopupNotes(kind as BiblePopupKind, compactExisting)) {
    if (louisExisting && louisExisting !== compactExisting) {
      void persistAndCache(kind, normalizedKey, compactExisting, displayName).catch((error) => {
        console.error(`[bibleNotes] Failed to normalize ${kind} popup notes for ${displayName}:`, error);
      });
    }

    return louisExisting ?? compactExisting;
  }

  try {
    const generated = await requestLouisNotes(buildPopupMeaningPrompt(kind as BiblePopupKind, displayName));
    return await persistAndCache(kind, normalizedKey, generated, displayName);
  } catch (error) {
    console.error(`[bibleNotes] Failed to generate ${kind} popup notes for ${displayName}:`, error);
    if (louisExisting && louisExisting.trim()) {
      return louisExisting;
    }
    return buildQuickPopupFallback(kind as BiblePopupKind, displayName);
  }
}

export async function findPersonNotes(person: string): Promise<string | null> {
  const normalized = normalizePersonNotesKey(person);
  if (!normalized) return null;

  return getCachedOrLoad("people", normalized, async () => loadOrGeneratePopupNotes("people", person, normalized));
}

export async function savePersonNotes(person: string, notesText: string): Promise<string> {
  return persistAndCache("people", normalizePersonNotesKey(person), notesText, person);
}

export async function findPlaceNotes(place: string): Promise<string | null> {
  const normalized = normalizePlaceNotesKey(place);
  if (!normalized) return null;

  return getCachedOrLoad("places", normalized, async () => loadOrGeneratePopupNotes("places", place, normalized));
}

export async function savePlaceNotes(place: string, notesText: string): Promise<string> {
  return persistAndCache("places", normalizePlaceNotesKey(place), notesText, place);
}

export async function findKeywordNotes(keyword: string): Promise<string | null> {
  const normalized = normalizeKeywordNotesKey(keyword);
  if (!normalized) return null;

  return getCachedOrLoad("keywords", normalized, async () => loadOrGeneratePopupNotes("keywords", keyword, normalized));
}

export async function saveKeywordNotes(keyword: string, notesText: string): Promise<string> {
  return persistAndCache("keywords", normalizeKeywordNotesKey(keyword), notesText, keyword);
}

export async function getPersonPopupNotes(person: string): Promise<string> {
  return (await findPersonNotes(person)) ?? buildQuickPopupFallback("people", person);
}

export async function getPlacePopupNotes(place: string): Promise<string> {
  return (await findPlaceNotes(place)) ?? buildQuickPopupFallback("places", place);
}

export async function getKeywordPopupNotes(keyword: string): Promise<string> {
  return (await findKeywordNotes(keyword)) ?? buildQuickPopupFallback("keywords", keyword);
}
