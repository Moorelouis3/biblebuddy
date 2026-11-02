/**
 * Pushes lib/commentReplies/seed.ts into Supabase.
 *
 *   npx tsx scripts/seed-comment-replies.ts          # add what is missing
 *   npx tsx scripts/seed-comment-replies.ts --force  # also reset changed rows
 *
 * Run it after the migration, and again whenever seed.ts changes. Without
 * --force it only inserts what is not there, so anything Louis has edited or
 * disabled in /admin/comment-replies survives a re-run.
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import { CATEGORIES, RULES, TEMPLATES } from "../lib/commentReplies/seed";

const env = fs.readFileSync(".env.local", "utf8");
const get = (k: string) => (env.match(new RegExp("^" + k + "=(.*)$", "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");
const db = createClient(get("NEXT_PUBLIC_SUPABASE_URL")!, get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

const force = process.argv.includes("--force");

async function main() {
  const categoryRows = CATEGORIES.map((c) => ({
    slug: c.slug,
    label: c.label,
    strategy: c.strategy,
    max_words: c.maxWords,
    enabled: c.enabled,
  }));
  const { error: catError } = await db
    .from("comment_reply_categories")
    .upsert(categoryRows, { onConflict: "slug", ignoreDuplicates: !force });
  if (catError) throw new Error(`categories: ${catError.message}`);
  console.log(`categories: ${categoryRows.length} ${force ? "upserted" : "ensured"}`);

  // Rules and templates have generated uuid primary keys, so "already there"
  // means the same category + pattern (or body), not the same id.
  //
  // With --force, every seed-managed rule is deleted and rewritten. A rule
  // carries its seed id in `notes`, so anything Louis added by hand - which
  // has no seed id - survives. Without this, changing a rule in seed.ts would
  // leave the old version live in the database alongside the new one: that is
  // how the un-firing question blocker would have stayed un-firing even after
  // being fixed in code.
  if (force) {
    // Every seed-managed row goes, not just the ones still named in seed.ts.
    // Deleting only the current ids leaves RETIRED rules behind, still enabled
    // and still firing - which is exactly what happened to the old blocking
    // "block-personal" rule: it kept sending reflections to review after the
    // code had stopped doing so. A rule added by hand has no seed id in
    // `notes`, so it survives.
    const { error, count } = await db
      .from("comment_reply_rules")
      .delete({ count: "exact" })
      .not("notes", "is", null);
    if (error) throw new Error(`clearing seed rules: ${error.message}`);
    console.log(`rules: cleared ${count ?? 0} seed-managed rows (hand-added rules kept)`);
  }

  const { data: existingRules } = await db.from("comment_reply_rules").select("category_slug, pattern");
  const haveRule = new Set((existingRules || []).map((r) => `${r.category_slug}::${r.pattern}`));
  const newRules = RULES.filter((r) => !haveRule.has(`${r.categorySlug}::${r.pattern}`)).map((r) => ({
    category_slug: r.categorySlug,
    kind: r.kind,
    pattern: r.pattern,
    weight: r.weight,
    blocks: r.blocks,
    enabled: r.enabled,
    notes: r.id,
  }));
  if (newRules.length) {
    const { error } = await db.from("comment_reply_rules").insert(newRules);
    if (error) throw new Error(`rules: ${error.message}`);
  }
  console.log(`rules: ${newRules.length} inserted, ${RULES.length - newRules.length} already there`);

  const { data: existingTemplates } = await db.from("comment_reply_templates").select("category_slug, body");
  const haveTemplate = new Set((existingTemplates || []).map((t) => `${t.category_slug}::${t.body}`));
  const newTemplates = TEMPLATES.filter((t) => !haveTemplate.has(`${t.categorySlug}::${t.body}`)).map((t) => ({
    category_slug: t.categorySlug,
    body: t.body,
    approved: true,
    enabled: true,
    source: "seed",
  }));
  if (newTemplates.length) {
    const { error } = await db.from("comment_reply_templates").insert(newTemplates);
    if (error) throw new Error(`templates: ${error.message}`);
  }
  console.log(`templates: ${newTemplates.length} inserted, ${TEMPLATES.length - newTemplates.length} already there`);

  for (const slug of CATEGORIES.filter((c) => c.strategy === "reply").map((c) => c.slug)) {
    const { count } = await db
      .from("comment_reply_templates")
      .select("id", { count: "exact", head: true })
      .eq("category_slug", slug)
      .eq("approved", true)
      .eq("enabled", true);
    if (!count) console.warn(`  WARNING: "${slug}" can reply but has no approved template, so it will skip.`);
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
