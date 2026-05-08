import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { BIBLE_PEOPLE_LIST } from "../lib/biblePeopleList";
import { isLegacyPopupNotes } from "../lib/biblePopupContent";

function parseArg(name: string): string | null {
  const index = process.argv.indexOf(name);
  if (index === -1) return null;
  return process.argv[index + 1] ?? null;
}

function normalizePersonNotesKey(person: string) {
  return person.toLowerCase().trim().replace(/\s+/g, " ");
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

async function main() {
  const limitArg = parseArg("--limit");
  const limit = limitArg ? Number(limitArg) : 100;

  if (!Number.isFinite(limit) || limit <= 0) {
    throw new Error(`Invalid --limit value: ${limitArg}`);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase env vars are missing.");
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const items = dedupe(BIBLE_PEOPLE_LIST.map((entry) => entry.name), normalizePersonNotesKey);
  const rows = new Map<string, string | null>();
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from("bible_people_notes")
      .select("person_name, notes_text")
      .order("person_name")
      .range(from, from + pageSize - 1);

    if (error) {
      throw error;
    }

    const chunk = (data || []) as Array<{ person_name: string | null; notes_text: string | null }>;
    for (const row of chunk) {
      const key = String(row.person_name || "").trim();
      if (!key) continue;
      rows.set(key, typeof row.notes_text === "string" ? row.notes_text : null);
    }

    if (chunk.length < pageSize) break;
    from += pageSize;
  }

  const pending: Array<{ term: string; reason: "missing" | "legacy" }> = [];

  for (const name of items) {
    const normalized = normalizePersonNotesKey(name);
    const existing = rows.get(normalized) ?? null;

    if (!existing?.trim()) {
      pending.push({ term: name, reason: "missing" });
    } else {
      if (isLegacyPopupNotes("people", existing)) {
        pending.push({ term: name, reason: "legacy" });
      }
    }

    if (pending.length >= limit) break;
  }

  console.log(JSON.stringify(pending, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
