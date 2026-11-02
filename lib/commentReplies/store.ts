import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { CATEGORIES, RULES, TEMPLATES } from "./seed";
import type { Category, Rule, Template } from "./types";

/**
 * Reading the library out of Supabase, with the seed as the floor.
 *
 * If the tables are empty - the migration has run but nothing has been seeded,
 * or somebody disabled every rule by accident - the seed is used instead of
 * nothing. An empty rule set would not be a safe default: it would mean every
 * comment scores zero, which is a skip, so the cron would quietly stop working
 * and look healthy doing it. Falling back makes the failure visible in the
 * log's `source` instead.
 */

export type Library = {
  categories: Category[];
  rules: Rule[];
  templates: Template[];
  source: "database" | "seed";
};

export async function loadLibrary(db: SupabaseClient): Promise<Library> {
  const [cats, rules, templates] = await Promise.all([
    db.from("comment_reply_categories").select("slug, label, strategy, max_words, enabled").eq("enabled", true),
    db.from("comment_reply_rules").select("id, category_slug, kind, pattern, weight, blocks, enabled").eq("enabled", true),
    db
      .from("comment_reply_templates")
      .select("id, category_slug, body, approved, enabled, times_used, last_used_at")
      .eq("approved", true)
      .eq("enabled", true),
  ]);

  const haveAll = !cats.error && !rules.error && !templates.error;
  const populated = (cats.data?.length ?? 0) > 0 && (rules.data?.length ?? 0) > 0 && (templates.data?.length ?? 0) > 0;

  if (!haveAll || !populated) {
    return { categories: CATEGORIES, rules: RULES, templates: TEMPLATES, source: "seed" };
  }

  return {
    source: "database",
    categories: (cats.data || []).map((c) => ({
      slug: c.slug as string,
      label: c.label as string,
      strategy: c.strategy as Category["strategy"],
      maxWords: Number(c.max_words ?? 0),
      enabled: Boolean(c.enabled),
    })),
    rules: (rules.data || []).map((r) => ({
      id: String(r.id),
      categorySlug: r.category_slug as string,
      kind: r.kind as Rule["kind"],
      pattern: r.pattern as string,
      weight: Number(r.weight ?? 1),
      blocks: Boolean(r.blocks),
      enabled: Boolean(r.enabled),
    })),
    templates: (templates.data || []).map((t) => ({
      id: String(t.id),
      categorySlug: t.category_slug as string,
      body: t.body as string,
      approved: Boolean(t.approved),
      enabled: Boolean(t.enabled),
      timesUsed: Number(t.times_used ?? 0),
      lastUsedAt: (t.last_used_at as string) ?? null,
    })),
  };
}

/** Reply bodies already posted under this article, so one is not used twice. */
export async function bodiesUsedOnArticle(db: SupabaseClient, articleSlug: string, louisUserId: string) {
  const { data } = await db
    .from("article_comments")
    .select("content")
    .eq("article_slug", articleSlug)
    .eq("user_id", louisUserId)
    .eq("is_auto", true)
    .limit(100);
  return (data || []).map((r) => String(r.content || ""));
}

/** Bodies used anywhere recently, to keep the same line off every chapter at once. */
export async function recentlyUsedBodies(db: SupabaseClient, louisUserId: string, limit = 30) {
  const { data } = await db
    .from("article_comments")
    .select("content")
    .eq("user_id", louisUserId)
    .eq("is_auto", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data || []).map((r) => String(r.content || ""));
}

/**
 * Record what happened, including the nothings.
 *
 * Best effort on purpose: a logging failure must not stop a reply that is
 * otherwise fine, and must not make the cron retry a comment it already
 * answered.
 */
export async function logDecision(
  db: SupabaseClient,
  entry: {
    commentId: string;
    articleSlug: string | null;
    fingerprint: string;
    wordCount: number;
    categorySlug: string | null;
    ruleId: string | null;
    confidence: number;
    templateId: string | null;
    action: "replied" | "skipped" | "review" | "shadow";
    reason: string;
    /**
     * A copy of what the person wrote. Kept on the row rather than fetched
     * back later because the three sources live in three different tables -
     * the review list would otherwise need a join per source, and a deleted
     * comment would leave a blank line on Louis's list with no way to tell
     * what it had been.
     */
    commentText?: string;
  },
) {
  try {
    await db.from("comment_reply_log").insert({
      comment_id: entry.commentId,
      article_slug: entry.articleSlug,
      comment_text: entry.commentText ? entry.commentText.slice(0, 2000) : null,
      fingerprint: entry.fingerprint,
      word_count: entry.wordCount,
      category_slug: entry.categorySlug,
      // Seed rule ids are strings like "amen-exact", not uuids, so they are
      // kept in the reason rather than forced into a uuid column.
      rule_id: null,
      confidence: entry.confidence,
      template_id: null,
      action: entry.action,
      reason: entry.ruleId ? `${entry.reason} [rule ${entry.ruleId}${entry.templateId ? `, template ${entry.templateId}` : ""}]` : entry.reason,
    });
  } catch {
    /* the log is for us, not for the reader */
  }
}

/** Count short unmatched comments so the common ones can earn a template later. */
export async function notePattern(db: SupabaseClient, fp: string, sample: string, words: number) {
  if (!fp || words > 8) return;
  try {
    const { data } = await db.from("comment_reply_patterns").select("seen_count").eq("fingerprint", fp).maybeSingle();
    if (data) {
      await db
        .from("comment_reply_patterns")
        .update({ seen_count: Number(data.seen_count ?? 0) + 1, last_seen: new Date().toISOString() })
        .eq("fingerprint", fp);
    } else {
      await db.from("comment_reply_patterns").insert({ fingerprint: fp, sample_text: sample.slice(0, 500), word_count: words });
    }
  } catch {
    /* best effort */
  }
}
