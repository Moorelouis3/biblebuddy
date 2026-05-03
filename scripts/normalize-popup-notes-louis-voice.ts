import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { BIBLE_KEYWORDS_LIST } from "../lib/bibleKeywordsList";
import { BIBLE_PEOPLE_LIST } from "../lib/biblePeopleList";
import { BIBLE_PLACES_LIST } from "../lib/biblePlacesList";
import {
  ensureLouisPopupVoice,
  extractCompactPopupMeaning,
  type BiblePopupKind,
} from "../lib/biblePopupContent";

type TableConfig = {
  kind: BiblePopupKind;
  table: "bible_people_notes" | "places_in_the_bible_notes" | "keywords_in_the_bible";
  keyColumn: "person_name" | "normalized_place" | "keyword";
  selectColumns: string;
  displayNameForRow: (row: Record<string, string | null>) => string;
};

function buildDisplayMap(values: string[], normalize: (value: string) => string) {
  return new Map(values.map((value) => [normalize(value), value]));
}

const peopleNames = buildDisplayMap(
  BIBLE_PEOPLE_LIST.map((entry) => entry.name),
  (value) => value.toLowerCase().trim().replace(/\s+/g, " ")
);

const placeNames = buildDisplayMap(
  BIBLE_PLACES_LIST.map((entry) => entry.name),
  (value) => value.toLowerCase().trim().replace(/\s+/g, "_")
);

const keywordNames = buildDisplayMap(
  BIBLE_KEYWORDS_LIST.map((entry) => entry.term),
  (value) => value.toLowerCase().trim().replace(/\s+/g, " ")
);

function titleCaseFallback(value: string) {
  return value
    .replace(/_/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(" ");
}

const CONFIGS: TableConfig[] = [
  {
    kind: "people",
    table: "bible_people_notes",
    keyColumn: "person_name",
    selectColumns: "person_name, notes_text",
    displayNameForRow: (row) => peopleNames.get(String(row.person_name || "").trim()) || titleCaseFallback(String(row.person_name || "")),
  },
  {
    kind: "places",
    table: "places_in_the_bible_notes",
    keyColumn: "normalized_place",
    selectColumns: "normalized_place, place, notes_text",
    displayNameForRow: (row) =>
      String(row.place || "").trim() ||
      placeNames.get(String(row.normalized_place || "").trim()) ||
      titleCaseFallback(String(row.normalized_place || "")),
  },
  {
    kind: "keywords",
    table: "keywords_in_the_bible",
    keyColumn: "keyword",
    selectColumns: "keyword, notes_text",
    displayNameForRow: (row) => keywordNames.get(String(row.keyword || "").trim()) || titleCaseFallback(String(row.keyword || "")),
  },
];

function hasFlag(name: string) {
  return process.argv.includes(name);
}

async function normalizeTable(config: TableConfig, supabase: any, dryRun: boolean) {
  const pageSize = 500;
  let from = 0;
  let scanned = 0;
  let updated = 0;

  console.log(`\n${config.kind.toUpperCase()}`);

  while (true) {
    const { data, error } = await supabase
      .from(config.table)
      .select(config.selectColumns)
      .order(config.keyColumn)
      .range(from, from + pageSize - 1);

    if (error) {
      throw error;
    }

    const rows = (data || []) as Array<Record<string, string | null>>;
    if (!rows.length) break;

    for (const row of rows) {
      scanned += 1;

      const key = String(row[config.keyColumn] || "").trim();
      const existing = String(row.notes_text || "").trim();
      if (!key || !existing) continue;

      const displayName = config.displayNameForRow(row);
      const compact = extractCompactPopupMeaning(config.kind, existing);
      const louisStyled = ensureLouisPopupVoice(config.kind, displayName, compact);

      if (!louisStyled || louisStyled === existing) continue;

      updated += 1;
      if (dryRun) continue;

      const payload: Record<string, string> = {
        [config.keyColumn]: key,
        notes_text: louisStyled,
      };

      if (config.kind === "places" && displayName) {
        payload.place = displayName;
      }

      const { error: updateError } = await supabase
        .from(config.table)
        .upsert(payload, { onConflict: config.keyColumn });

      if (updateError) {
        throw updateError;
      }
    }

    if (rows.length < pageSize) break;
    from += pageSize;
  }

  console.log(`Scanned: ${scanned}`);
  console.log(`${dryRun ? "Would update" : "Updated"}: ${updated}`);
}

async function main() {
  const dryRun = hasFlag("--dry-run");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase env vars are missing.");
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log(`Normalizing popup notes into Louis voice (${dryRun ? "dry run" : "live"})`);

  for (const config of CONFIGS) {
    await normalizeTable(config, supabase, dryRun);
  }

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
