import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { resolveLouisUserId } from "@/lib/bugReports";
import { classify } from "@/lib/commentReplies/classify";
import { selectTemplate } from "@/lib/commentReplies/selectTemplate";
import { fingerprint, wordCount } from "@/lib/commentReplies/normalise";
import { loadLibrary, logDecision, notePattern } from "@/lib/commentReplies/store";
import { FALLBACK_BY_SOURCE } from "@/lib/commentReplies/seed";
import { SOURCES, type Candidate } from "@/lib/commentReplies/sources";

/**
 * Louis's replies to comments, everywhere comments are, with no AI of any kind.
 *
 * This used to send every comment to gpt-4o-mini and post whatever came back.
 * Louis, 2026-11-02: "OpenAI is not used by anything but the Louis AI chat
 * bot." A library of replies he has approved takes its place, with
 * deterministic rules choosing which one fits.
 *
 * TWO SURFACES, one rule between them (lib/commentReplies/sources.ts):
 *
 *   article  study chapters, Bible in One Year days, /bible pages, blog posts
 *   feed     the social feed - only comments on Louis's own posts
 *
 * Louis: "i can comment for people except if its them talking to another
 * Buddy." A comment under a study is addressed to the study. A comment under
 * another member's post, or a reply under another member's comment, is two
 * people talking, and those are filtered out in the source before they are
 * ever classified.
 *
 * WHAT IT WILL AND WILL NOT SAY, measured on all 571 article comments:
 *
 *   replied    ~1%   short reactions - "God is good", "Bible study", "Yes"
 *   review    ~19%   prayer, testimony, questions, grief - Louis's own list
 *   skipped   ~80%   nothing matched, so nothing is said
 *
 * The low number is the point. People write paragraphs about their own lives
 * in these threads, and there is no library that can answer those honestly.
 * Louis: "I prefer an unanswered comment over an inappropriate automated
 * response." The per-category word ceiling is what enforces it.
 *
 * AUTO_COMMENT_REPLIES:
 *   unset / anything else  nothing runs
 *   shadow                 decide and log, post nothing
 *   on                     post the replies
 *
 * ?dryRun=1 shows what a run would do without writing anything at all.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * How long a comment is left for the humans before Louis answers it.
 *
 * Three hours since 2026-11-02, at Louis's request - it was one. Replying the
 * moment somebody posts reads as a bot, and it lands before anybody else in
 * the study has had a chance to say anything, which is the opposite of what
 * the thread is for.
 */
const MIN_AGE_MINUTES = 180;

/**
 * Per source, per run. Deciding is free with no model involved and these are
 * our own tables, so there is nothing to throttle for: one run walks the whole
 * open list newest-first and posts every reply it finds.
 */
const EXAMINE_PER_SOURCE = 600;

/** Nothing to say to "👍". */
const MIN_COMMENT_CHARS = 2;

/** Comments this job has already ruled on, so a skip is not re-logged forever. */
async function fetchDecided(db: SupabaseClient) {
  const decided = new Set<string>();
  const { data } = await db.from("comment_reply_log").select("comment_id").limit(50000);
  for (const row of data || []) if (row.comment_id) decided.add(String(row.comment_id));
  return decided;
}

export async function GET(request: NextRequest) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const mode = (process.env.AUTO_COMMENT_REPLIES || "").toLowerCase();
  if (mode !== "on" && mode !== "shadow") {
    return NextResponse.json({ ok: true, skipped: "AUTO_COMMENT_REPLIES is not on or shadow" });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "Server not configured." }, { status: 500 });

  const dryRun = request.nextUrl.searchParams.get("dryRun") === "1";
  // Annotated rather than inferred: createClient's inferred generics do not
  // line up with the bare SupabaseClient the lib/ helpers take.
  const admin: SupabaseClient = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const louisUserId = await resolveLouisUserId(admin);
  if (!louisUserId) return NextResponse.json({ error: "No Louis account." }, { status: 500 });

  const { data: louisProfile } = await admin
    .from("profile_stats")
    .select("display_name")
    .eq("user_id", louisUserId)
    .maybeSingle();
  const louis = { id: louisUserId, name: louisProfile?.display_name || "Louis Moore" };

  const cutoff = new Date(Date.now() - MIN_AGE_MINUTES * 60_000).toISOString();
  const [library, decided] = await Promise.all([loadLibrary(admin), fetchDecided(admin)]);

  const counts = { replied: 0, review: 0, skipped: 0 };
  const perSource: Record<string, number> = {};
  const preview: Array<Record<string, unknown>> = [];
  const failures: string[] = [];
  let openTotal = 0;

  for (const source of SOURCES) {
    let candidates: Candidate[] = [];
    try {
      candidates = await source.fetchOpen(admin, louisUserId, cutoff, EXAMINE_PER_SOURCE);
    } catch (e) {
      failures.push(`${source.name}: ${e instanceof Error ? e.message : "fetch failed"}`);
      continue;
    }

    const open = candidates.filter(
      (c) => !decided.has(c.id) && c.content.trim().length >= MIN_COMMENT_CHARS,
    );
    openTotal += open.length;
    perSource[source.name] = open.length;

    // Bodies used lately across everything, so the same line does not appear
    // under three different posts in one pass.
    const recent: string[] = [];

    for (const candidate of open) {
      const decision = classify(
        candidate.content,
        library.categories,
        library.rules,
        FALLBACK_BY_SOURCE[source.name] ?? null,
      );
      const fp = fingerprint(candidate.content);
      const words = wordCount(candidate.content);
      const logContext = `${source.name}:${candidate.context}`;

      if (decision.action !== "replied") {
        counts[decision.action] += 1;
        if (!dryRun) {
          await logDecision(admin, {
            commentId: candidate.id,
            articleSlug: logContext,
            fingerprint: fp,
            wordCount: words,
            categorySlug: decision.categorySlug,
            ruleId: decision.ruleId,
            confidence: decision.confidence,
            templateId: null,
            action: decision.action,
            reason: decision.reason,
            commentText: candidate.content,
          });
          if (decision.reason === "no rule matched") await notePattern(admin, fp, candidate.content, words);
        }
        preview.push({ source: source.name, action: decision.action, category: decision.categorySlug, reason: decision.reason, comment: candidate.content.slice(0, 80) });
        continue;
      }

      const usedHere = await source.bodiesUsedHere(admin, candidate, louisUserId);
      const template = selectTemplate(
        library.templates.filter((t) => t.categorySlug === decision.categorySlug),
        { usedOnArticle: usedHere, recentlyUsed: recent },
      );

      if (!template) {
        // A category with nothing approved in it is a skip, never a guess.
        counts.skipped += 1;
        if (!dryRun) {
          await logDecision(admin, {
            commentId: candidate.id,
            articleSlug: logContext,
            fingerprint: fp,
            wordCount: words,
            categorySlug: decision.categorySlug,
            ruleId: decision.ruleId,
            confidence: decision.confidence,
            templateId: null,
            action: "skipped",
            reason: `no approved template in ${decision.categorySlug}`,
            commentText: candidate.content,
          });
        }
        continue;
      }

      preview.push({ source: source.name, action: "replied", category: decision.categorySlug, comment: candidate.content.slice(0, 80), reply: template.body });

      if (dryRun) {
        counts.replied += 1;
        continue;
      }

      if (mode === "shadow") {
        counts.replied += 1;
        await logDecision(admin, {
          commentId: candidate.id,
          articleSlug: logContext,
          fingerprint: fp,
          wordCount: words,
          categorySlug: decision.categorySlug,
          ruleId: decision.ruleId,
          confidence: decision.confidence,
          templateId: template.id,
          action: "shadow",
          reason: `${decision.reason} -> "${template.body}"`,
          commentText: candidate.content,
        });
        continue;
      }

      const postError = await source.postReply(admin, candidate, template.body, louis);
      if (postError) {
        failures.push(`${source.name}/${candidate.id}: ${postError}`);
        continue;
      }

      counts.replied += 1;
      recent.unshift(template.body);
      await logDecision(admin, {
        commentId: candidate.id,
        articleSlug: logContext,
        fingerprint: fp,
        wordCount: words,
        categorySlug: decision.categorySlug,
        ruleId: decision.ruleId,
        confidence: decision.confidence,
        templateId: template.id,
        action: "replied",
        reason: decision.reason,
        commentText: candidate.content,
      });
      // times_used is only meaningful for database templates; a seed fallback
      // has no row to bump, and failing to bump it must not fail the run.
      try {
        await admin
          .from("comment_reply_templates")
          .update({ times_used: template.timesUsed + 1, last_used_at: new Date().toISOString() })
          .eq("id", template.id);
      } catch {
        /* seed template, or the table is not there yet */
      }
    }
  }

  return NextResponse.json({
    ok: true,
    mode: dryRun ? "dryRun" : mode,
    library: library.source,
    waitHours: MIN_AGE_MINUTES / 60,
    openTotal,
    perSource,
    ...counts,
    aiCalls: 0,
    failures: failures.slice(0, 5),
    preview: preview.slice(0, 10),
  });
}
