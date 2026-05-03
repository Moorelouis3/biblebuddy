import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

import { createClient } from "@supabase/supabase-js";
import { BIBLE_KEYWORDS_LIST } from "../lib/bibleKeywordsList";
import { extractCompactPopupMeaning, isLegacyPopupNotes } from "../lib/biblePopupContent";

function normalizeKeywordNotesKey(keyword: string): string {
  return String(keyword || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function dedupeKeywords() {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const entry of BIBLE_KEYWORDS_LIST) {
    const term = entry.term;
    const normalized = normalizeKeywordNotesKey(term);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(term);
  }

  return result;
}

async function main() {
  const limitArg = process.argv.indexOf("--limit");
  const limit = limitArg >= 0 ? Number(process.argv[limitArg + 1] || "25") : 25;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase env vars are missing.");
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const existingRows = new Map<string, string | null>();
  let from = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from("keywords_in_the_bible")
      .select("keyword, notes_text")
      .order("keyword")
      .range(from, from + pageSize - 1);

    if (error) throw error;

    const chunk = data || [];
    for (const row of chunk) {
      existingRows.set(String(row.keyword || "").trim(), typeof row.notes_text === "string" ? row.notes_text : null);
    }

    if (chunk.length < pageSize) break;
    from += pageSize;
  }

  const pending: Array<{ term: string; reason: "missing" | "legacy" }> = [];
  for (const term of dedupeKeywords()) {
    const normalized = normalizeKeywordNotesKey(term);
    const existing = existingRows.get(normalized) || null;

    if (!existing?.trim()) {
      pending.push({ term, reason: "missing" });
      continue;
    }

    const compact = extractCompactPopupMeaning("keywords", existing);
    if (isLegacyPopupNotes("keywords", compact)) {
      pending.push({ term, reason: "legacy" });
    }
  }

  console.log(JSON.stringify(pending.slice(0, limit), null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
