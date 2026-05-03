/**
 * Backfill compact popup notes for Bible people, places, and keywords.
 *
 * Usage:
 *   npx tsx scripts/backfill-bible-popup-notes.ts --dry-run
 *   npx tsx scripts/backfill-bible-popup-notes.ts --kind people
 *   npx tsx scripts/backfill-bible-popup-notes.ts --kind places --limit 200
 *   npx tsx scripts/backfill-bible-popup-notes.ts --kind keywords
 */

import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { BIBLE_KEYWORDS_LIST } from "../lib/bibleKeywordsList";
import { BIBLE_PEOPLE_LIST } from "../lib/biblePeopleList";
import { BIBLE_PLACES_LIST } from "../lib/biblePlacesList";
import {
  buildPopupMeaningPrompt,
  extractCompactPopupMeaning,
  isLegacyPopupNotes,
  type BiblePopupKind,
} from "../lib/biblePopupContent";

function normalizePersonNotesKey(person: string): string {
  return person.toLowerCase().trim().replace(/\s+/g, " ");
}

function normalizePlaceNotesKey(place: string): string {
  return place.toLowerCase().trim().replace(/\s+/g, "_");
}

function normalizeKeywordNotesKey(keyword: string): string {
  return keyword.toLowerCase().trim().replace(/\s+/g, " ");
}

type CliKind = "people" | "places" | "keywords" | "all";

type EntityConfig = {
  kind: BiblePopupKind;
  table: "bible_people_notes" | "places_in_the_bible_notes" | "keywords_in_the_bible";
  column: "person_name" | "normalized_place" | "keyword";
  items: string[];
  normalizeKey: (value: string) => string;
};

type ExistingRow = {
  key: string;
  notes_text: string | null;
};

type BackfillItem = {
  name: string;
  normalizedKey: string;
  existingNotes: string | null;
  reason: "missing" | "legacy";
};

type SupabaseAnyClient = any;

function parseArg(name: string): string | null {
  const index = process.argv.indexOf(name);
  if (index === -1) return null;
  return process.argv[index + 1] ?? null;
}

function hasFlag(name: string) {
  return process.argv.includes(name);
}

function dedupe(values: string[], normalize: (value: string) => string) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const normalized = normalize(value);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(value);
  }

  return result;
}

function getConfig(kind: BiblePopupKind): EntityConfig {
  if (kind === "people") {
    return {
      kind,
      table: "bible_people_notes",
      column: "person_name",
      items: dedupe(BIBLE_PEOPLE_LIST.map((entry) => entry.name), normalizePersonNotesKey),
      normalizeKey: normalizePersonNotesKey,
    };
  }

  if (kind === "places") {
    return {
      kind,
      table: "places_in_the_bible_notes",
      column: "normalized_place",
      items: dedupe(BIBLE_PLACES_LIST.map((entry) => entry.name), normalizePlaceNotesKey),
      normalizeKey: normalizePlaceNotesKey,
    };
  }

  return {
    kind,
    table: "keywords_in_the_bible",
    column: "keyword",
    items: dedupe(BIBLE_KEYWORDS_LIST.map((entry) => entry.term), normalizeKeywordNotesKey),
    normalizeKey: normalizeKeywordNotesKey,
  };
}

async function fetchExistingRows(config: EntityConfig, supabase: SupabaseAnyClient) {
  const rows = new Map<string, string | null>();
  const pageSize = 1000;
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from(config.table)
      .select(`${config.column}, notes_text`)
      .order(config.column)
      .range(from, from + pageSize - 1);

    if (error) {
      throw error;
    }

    const chunk = (data || []) as Array<Record<string, string | null>>;
    for (const row of chunk) {
      const key = String(row[config.column] || "").trim();
      if (!key) continue;
      rows.set(key, typeof row.notes_text === "string" ? row.notes_text : null);
    }

    if (chunk.length < pageSize) break;
    from += pageSize;
  }

  return rows;
}

function buildBackfillQueue(config: EntityConfig, existingRows: Map<string, string | null>) {
  const queue: BackfillItem[] = [];

  for (const name of config.items) {
    const normalizedKey = config.normalizeKey(name);
    const existingNotes = existingRows.get(normalizedKey) ?? null;

    if (!existingNotes?.trim()) {
      queue.push({ name, normalizedKey, existingNotes: null, reason: "missing" });
      continue;
    }

    const compact = extractCompactPopupMeaning(config.kind, existingNotes);
    if (isLegacyPopupNotes(config.kind, compact)) {
      queue.push({ name, normalizedKey, existingNotes, reason: "legacy" });
    }
  }

  return queue;
}

async function generateCompactNotes(openai: OpenAI, kind: BiblePopupKind, name: string) {
  const prompt = buildPopupMeaningPrompt(kind, name);
  const completion = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const text = completion.choices[0]?.message?.content?.trim() || "";
  if (!text) {
    throw new Error("Generated notes were empty.");
  }

  return extractCompactPopupMeaning(kind, text);
}

async function backfillKind(
  config: EntityConfig,
  supabase: SupabaseAnyClient,
  openai: OpenAI | null,
  options: { dryRun: boolean; limit: number | null }
) {
  const existingRows = await fetchExistingRows(config, supabase);
  const queue = buildBackfillQueue(config, existingRows);
  const limitedQueue = typeof options.limit === "number" ? queue.slice(0, options.limit) : queue;

  console.log(`\n${config.kind.toUpperCase()}`);
  console.log(`Total source items: ${config.items.length}`);
  console.log(`Existing DB rows: ${existingRows.size}`);
  console.log(`Needs backfill: ${queue.length}`);

  if (options.dryRun) {
    console.log(`Dry run only. No rows updated for ${config.kind}.`);
    return;
  }

  if (!openai) {
    throw new Error("OpenAI client was not initialized.");
  }

  let completed = 0;
  let failed = 0;

  for (const item of limitedQueue) {
    try {
      const notesText = await generateCompactNotes(openai, config.kind, item.name);

      const payload: Record<string, string> = {
        [config.column]: item.normalizedKey,
        notes_text: notesText,
      };

      if (config.kind === "places") {
        payload.place = item.name;
      }

      const table = supabase.from(config.table as any);
      const { error } = await table.upsert(payload as any, { onConflict: config.column });
      if (error) {
        throw error;
      }

      completed += 1;
      console.log(`[${config.kind}] ${completed}/${limitedQueue.length} ${item.name} (${item.reason})`);
    } catch (error: any) {
      failed += 1;
      console.error(`[${config.kind}] Failed for ${item.name}: ${error?.message || error}`);
    }
  }

  console.log(`Finished ${config.kind}: ${completed} updated, ${failed} failed.`);
}

async function main() {
  const kindArg = (parseArg("--kind") || "all").toLowerCase() as CliKind;
  const limitArg = parseArg("--limit");
  const dryRun = hasFlag("--dry-run");
  const limit = limitArg ? Number(limitArg) : null;

  if (!["all", "people", "places", "keywords"].includes(kindArg)) {
    throw new Error(`Invalid --kind value: ${kindArg}`);
  }

  if (limitArg && (!Number.isFinite(limit) || (limit as number) <= 0)) {
    throw new Error(`Invalid --limit value: ${limitArg}`);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");
  }

  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
  }

  if (!dryRun && !openaiKey) {
    throw new Error("OPENAI_API_KEY is not set.");
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const openai = dryRun ? null : new OpenAI({ apiKey: openaiKey });
  const kinds: BiblePopupKind[] =
    kindArg === "all" ? ["people", "places", "keywords"] : [kindArg];

  console.log(`Bible popup note backfill starting (${dryRun ? "dry run" : "live"})`);
  if (limit) {
    console.log(`Per-kind limit: ${limit}`);
  }

  for (const kind of kinds) {
    await backfillKind(getConfig(kind), supabase, openai, { dryRun, limit });
  }

  console.log("\nDone.");
}

main().catch((error) => {
  console.error("Backfill failed:", error);
  process.exit(1);
});
