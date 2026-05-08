import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { BIBLE_PLACES_LIST } from "../lib/biblePlacesList";
import { normalizePopupMarkdown } from "../lib/biblePopupContent";

function parseArg(name: string): string | null {
  const index = process.argv.indexOf(name);
  if (index === -1) return null;
  return process.argv[index + 1] ?? null;
}

function normalize(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "_");
}

function dedupe(values: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const key = normalize(value);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(value);
  }

  return result;
}

function isTooLongForNewPopup(notes: string) {
  const clean = notes.replace(/\s+/g, " ").trim();
  const sentenceCount = (clean.match(/[.!?](?=\s|$)/g) || []).length;
  return clean.length > 700 || sentenceCount > 9;
}

function isLegacyPlacePopup(notes: string) {
  const normalized = normalizePopupMarkdown(notes);
  if (!normalized) return true;

  const headerMatches = normalized.match(/^# /gm) || [];
  if (headerMatches.length > 1) {
    return true;
  }

  return /still being filled in|quick meaning|quick anchor|keep reading without getting stuck|fuller explanation|what this place is|where it appears in the story|why this place matters/i.test(
    normalized
  );
}

async function main() {
  const limitArg = parseArg("--limit");
  const skipArg = parseArg("--skip");
  const limit = limitArg ? Number(limitArg) : 100;
  const skip = skipArg ? Number(skipArg) : 0;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase env vars are missing.");
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const items = dedupe(BIBLE_PLACES_LIST.map((entry) => entry.name));
  const rows = new Map<string, string | null>();
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from("places_in_the_bible_notes")
      .select("normalized_place, notes_text")
      .order("normalized_place")
      .range(from, from + pageSize - 1);

    if (error) throw error;

    const chunk = (data || []) as Array<{ normalized_place: string | null; notes_text: string | null }>;
    for (const row of chunk) {
      const key = String(row.normalized_place || "").trim();
      if (!key) continue;
      rows.set(key, typeof row.notes_text === "string" ? row.notes_text : null);
    }

    if (chunk.length < pageSize) break;
    from += pageSize;
  }

  const pending: Array<{ term: string; reason: "missing" | "legacy" | "long" }> = [];
  let missing = 0;
  let legacy = 0;
  let tooLong = 0;

  for (const name of items) {
    const existing = rows.get(normalize(name)) ?? null;

    if (!existing?.trim()) {
      missing += 1;
      pending.push({ term: name, reason: "missing" });
      continue;
    }

    if (isLegacyPlacePopup(existing)) {
      legacy += 1;
      pending.push({ term: name, reason: "legacy" });
      continue;
    }

    if (isTooLongForNewPopup(existing)) {
      tooLong += 1;
      pending.push({ term: name, reason: "long" });
    }
  }

  console.log(
    JSON.stringify(
      {
        totalPlaces: items.length,
        notesRows: rows.size,
        missing,
        legacy,
        tooLong,
        pendingTotal: pending.length,
        firstBatch: pending.slice(skip, skip + limit),
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
