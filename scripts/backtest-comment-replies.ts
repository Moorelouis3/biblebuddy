/**
 * Runs the zero-AI replier over every real study comment and reports what it
 * would have done. Nothing is written and nothing is posted.
 *
 *   npx tsx scripts/backtest-comment-replies.ts
 *   npx tsx scripts/backtest-comment-replies.ts --show=replied
 *   npx tsx scripts/backtest-comment-replies.ts --show=review --limit=40
 *
 * This is the check that matters before any of it goes live: the failure mode
 * of a template library is not "it answered too few", it is "it answered a
 * woman's miscarriage with Amen". So read the `replied` list in full. Every
 * line in it is something that would have been posted publicly under Louis's
 * name.
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import { classify } from "../lib/commentReplies/classify";
import { selectTemplate } from "../lib/commentReplies/selectTemplate";
import { CATEGORIES, RULES, TEMPLATES } from "../lib/commentReplies/seed";
import { fingerprint, wordCount } from "../lib/commentReplies/normalise";

const env = fs.readFileSync(".env.local", "utf8");
const get = (k: string) => (env.match(new RegExp("^" + k + "=(.*)$", "m")) || [])[1]?.trim().replace(/^["']|["']$/g, "");
const db = createClient(get("NEXT_PUBLIC_SUPABASE_URL")!, get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

const args = process.argv.slice(2);
const show = (args.find((a) => a.startsWith("--show=")) || "").split("=")[1] || "";
const limit = Number((args.find((a) => a.startsWith("--limit=")) || "").split("=")[1] || 25);

type Row = { id: string; article_slug: string; user_id: string | null; user_name: string | null; content: string; parent_id: string | null; is_deleted: boolean };

async function everyComment(): Promise<Row[]> {
  const out: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("article_comments")
      .select("id, article_slug, user_id, user_name, content, parent_id, is_deleted")
      .order("created_at", { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    out.push(...((data || []) as Row[]));
    if (!data || data.length < 1000) break;
  }
  return out;
}

async function main() {
const rows = await everyComment();

// Louis is whoever owns the most replies - same inference the analysis used,
// and it avoids hard-coding a uuid into a script.
const replyCount = new Map<string, number>();
for (const r of rows) if (r.parent_id && r.user_id) replyCount.set(r.user_id, (replyCount.get(r.user_id) ?? 0) + 1);
const louisId = [...replyCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

const incoming = rows.filter((r) => !r.is_deleted && !r.parent_id && r.user_id && r.user_id !== louisId);

const results = incoming.map((c) => {
  const decision = classify(c.content, CATEGORIES, RULES);
  const template =
    decision.action === "replied"
      ? selectTemplate(
          TEMPLATES.filter((t) => t.categorySlug === decision.categorySlug),
          { random: () => 0.5 },
        )
      : null;
  return { comment: c, decision, template, words: wordCount(c.content) };
});

const counts = { replied: 0, review: 0, skipped: 0 } as Record<string, number>;
for (const r of results) counts[r.decision.action] += 1;
const pct = (n: number) => `${((100 * n) / results.length).toFixed(1)}%`;

console.log(`\nBACKTEST — ${results.length} real incoming comments\n${"=".repeat(52)}`);
console.log(`  replied  ${String(counts.replied).padStart(4)}  ${pct(counts.replied).padStart(6)}   a template would be posted`);
console.log(`  review   ${String(counts.review).padStart(4)}  ${pct(counts.review).padStart(6)}   goes on Louis's list`);
console.log(`  skipped  ${String(counts.skipped).padStart(4)}  ${pct(counts.skipped).padStart(6)}   nothing happens`);
console.log(`\n  PAID AI CALLS: 0   (this file imports no AI client; see scripts/verify-comment-replies-no-ai.ts)`);

const byCategory = new Map<string, { replied: number; review: number; skipped: number }>();
for (const r of results) {
  const key = r.decision.categorySlug ?? "(none)";
  const e = byCategory.get(key) ?? { replied: 0, review: 0, skipped: 0 };
  e[r.decision.action] += 1;
  byCategory.set(key, e);
}
console.log(`\n  BY CATEGORY`);
for (const [slug, e] of [...byCategory.entries()].sort((a, b) => (b[1].replied + b[1].review + b[1].skipped) - (a[1].replied + a[1].review + a[1].skipped))) {
  console.log(`    ${slug.padEnd(14)} replied ${String(e.replied).padStart(3)}  review ${String(e.review).padStart(3)}  skipped ${String(e.skipped).padStart(3)}`);
}

// Safety check: nothing long should ever be in the replied pile.
const longReplies = results.filter((r) => r.decision.action === "replied" && r.words > 10);
console.log(`\n  SAFETY`);
console.log(`    replies to comments over 10 words: ${longReplies.length}  (must be 0)`);
const personalReplies = results.filter(
  (r) => r.decision.action === "replied" && /\b(i am|i'm|my son|my daughter|my husband|my wife|i lost|i feel)\b/i.test(r.comment.content),
);
console.log(`    replies to first-person comments:  ${personalReplies.length}  (must be 0)`);

// Repeats: how often the same body would land under one article.
const perArticle = new Map<string, string[]>();
for (const r of results) {
  if (r.decision.action !== "replied" || !r.template) continue;
  const list = perArticle.get(r.comment.article_slug) ?? [];
  list.push(r.template.body);
  perArticle.set(r.comment.article_slug, list);
}
const dupes = [...perArticle.entries()].filter(([, l]) => l.length !== new Set(l).size);
console.log(`    articles where one body repeats:   ${dupes.length}  (selection spreads these at runtime)`);

if (show) {
  const picked = results.filter((r) => r.decision.action === show).slice(0, limit);
  console.log(`\n  ${show.toUpperCase()} — first ${picked.length}\n${"-".repeat(52)}`);
  for (const r of picked) {
    console.log(`  [${r.decision.categorySlug ?? "-"} ${r.decision.confidence.toFixed(2)} ${r.words}w] ${r.decision.reason}`);
    console.log(`    comment: ${r.comment.content.replace(/\s+/g, " ").slice(0, 150)}`);
    if (r.template) console.log(`    reply:   ${r.template.body}`);
    console.log("");
  }
}

// What keeps coming back with no rule to match it - the input to Phase 4.
const unmatched = new Map<string, { n: number; sample: string }>();
for (const r of results) {
  if (r.decision.action !== "skipped" || r.decision.reason !== "no rule matched") continue;
  if (r.words > 8) continue; // only short ones are candidates for a template
  const fp = fingerprint(r.comment.content);
  const e = unmatched.get(fp) ?? { n: 0, sample: r.comment.content };
  e.n += 1;
  unmatched.set(fp, e);
}
const topUnmatched = [...unmatched.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, 15);
console.log(`\n  SHORT COMMENTS WITH NO RULE (template candidates)`);
for (const [fp, e] of topUnmatched) console.log(`    ${String(e.n).padStart(3)}  ${fp.slice(0, 70)}`);
console.log("");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
