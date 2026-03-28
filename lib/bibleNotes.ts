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

async function persistAndCache(kind: NotesKind, normalizedKey: string, notesText: string): Promise<string> {
  const trimmed = notesText.trim();
  if (!trimmed) {
    return notesText;
  }

  if (kind === "people") {
    await supabase
      .from("bible_people_notes")
      .upsert({ person_name: normalizedKey, notes_text: trimmed }, { onConflict: "person_name" });
  } else if (kind === "places") {
    await supabase
      .from("places_in_the_bible_notes")
      .upsert({ normalized_place: normalizedKey, notes_text: trimmed }, { onConflict: "normalized_place" });
  } else {
    await supabase
      .from("keywords_in_the_bible")
      .upsert({ keyword: normalizedKey, notes_text: trimmed }, { onConflict: "keyword" });
  }

  notesCache.set(buildCacheKey(kind, normalizedKey), trimmed);
  return trimmed;
}

export async function findPersonNotes(person: string): Promise<string | null> {
  const normalized = normalizePersonNotesKey(person);
  if (!normalized) return null;

  return getCachedOrLoad("people", normalized, async () => {
    const { data, error } = await supabase
      .from("bible_people_notes")
      .select("notes_text")
      .eq("person_name", normalized)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data?.notes_text?.trim() ? data.notes_text : null;
  });
}

export async function savePersonNotes(person: string, notesText: string): Promise<string> {
  return persistAndCache("people", normalizePersonNotesKey(person), notesText);
}

export async function findPlaceNotes(place: string): Promise<string | null> {
  const normalized = normalizePlaceNotesKey(place);
  if (!normalized) return null;

  return getCachedOrLoad("places", normalized, async () => {
    const { data, error } = await supabase
      .from("places_in_the_bible_notes")
      .select("notes_text")
      .eq("normalized_place", normalized)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data?.notes_text?.trim() ? data.notes_text : null;
  });
}

export async function savePlaceNotes(place: string, notesText: string): Promise<string> {
  return persistAndCache("places", normalizePlaceNotesKey(place), notesText);
}

export async function findKeywordNotes(keyword: string): Promise<string | null> {
  const normalized = normalizeKeywordNotesKey(keyword);
  if (!normalized) return null;

  return getCachedOrLoad("keywords", normalized, async () => {
    const { data, error } = await supabase
      .from("keywords_in_the_bible")
      .select("notes_text")
      .ilike("keyword", normalized)
      .limit(1)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data?.notes_text?.trim() ? data.notes_text : null;
  });
}

export async function saveKeywordNotes(keyword: string, notesText: string): Promise<string> {
  return persistAndCache("keywords", normalizeKeywordNotesKey(keyword), notesText);
}
