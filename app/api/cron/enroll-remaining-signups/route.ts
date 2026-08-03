import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendFunnelEmailViaSysteme, recordEmailSent, updateEmailFunnelState } from "@/lib/emailFunnelHelpers";
import { SystemePlanLimitError } from "@/lib/systemeTagSender";

export const runtime = "nodejs";
export const maxDuration = 540;
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

const DAILY_BATCH_SIZE = 500;

// Total new enrollments this campaign is allowed to add to Systeme.io,
// separate from the day1-3/backfill enrollments that came before it.
// Systeme.io's plan caps total contacts at 5,000; as of 2026-08-03 that had
// ~1,099 used, so 3,000 new leaves ~900 slots free for organic signups.
const CAMPAIGN_CAP = 3000;
// Rows created by this campaign are given signup_timestamp >= this instant,
// so later runs can count "how many has this campaign enrolled so far"
// without a separate counter table.
const CAMPAIGN_START = "2026-08-03T00:00:00Z";

async function countRows(
  supabaseAdmin: any,
  table: string,
  filter: (q: any) => any,
): Promise<number> {
  const { count, error } = await filter(
    supabaseAdmin.from(table).select("*", { count: "exact", head: true }),
  );
  if (error) throw new Error(error.message);
  return count ?? 0;
}

async function fetchAllUserIds(supabaseAdmin: any, table: string): Promise<Set<string>> {
  const ids = new Set<string>();
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select("user_id")
      .range(from, from + pageSize - 1);
    if (error) throw new Error(error.message);
    for (const row of data || []) ids.add(row.user_id);
    if (!data || data.length < pageSize) break;
  }
  return ids;
}

// Enrolls signups that were never part of the email funnel (older than the
// original 30-day backfill) at a controlled daily pace, stopping cleanly if
// Systeme.io's contact cap is hit mid-batch.
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const enrolledByCampaign = await countRows(supabaseAdmin, "email_funnel_state", (q) =>
      q.gte("signup_timestamp", CAMPAIGN_START),
    );
    const remainingCapacity = CAMPAIGN_CAP - enrolledByCampaign;

    if (remainingCapacity <= 0) {
      return NextResponse.json({
        ok: true,
        message: "Campaign cap reached, no more enrollments",
        enrolledByCampaign,
      });
    }

    const batchTarget = Math.min(DAILY_BATCH_SIZE, remainingCapacity);
    const alreadyEnrolled = await fetchAllUserIds(supabaseAdmin, "email_funnel_state");

    // Pull signups newest-first, skip anyone already in the funnel, until we
    // have enough candidates for today's batch.
    const candidates: Array<{ user_id: string; email: string }> = [];
    const pageSize = 1000;
    for (let from = 0; candidates.length < batchTarget; from += pageSize) {
      const { data, error } = await supabaseAdmin
        .from("user_signups")
        .select("user_id, email, created_at")
        .order("created_at", { ascending: false })
        .range(from, from + pageSize - 1);
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) break;
      for (const row of data) {
        if (!alreadyEnrolled.has(row.user_id)) candidates.push({ user_id: row.user_id, email: row.email });
        if (candidates.length >= batchTarget) break;
      }
      if (data.length < pageSize) break;
    }

    let enrolledCount = 0;
    let failedCount = 0;
    let capReached = false;
    const failures: Array<{ user_id: string; email: string; error: string }> = [];

    for (const candidate of candidates) {
      try {
        const result = await sendFunnelEmailViaSysteme(candidate.email, 1);
        if (!result.ok) {
          failedCount++;
          failures.push({ ...candidate, error: result.error || "Unknown" });
          continue;
        }

        const now = new Date().toISOString();
        await supabaseAdmin.from("email_funnel_state").upsert(
          { user_id: candidate.user_id, signup_timestamp: now },
          { onConflict: "user_id" },
        );
        await recordEmailSent(supabaseAdmin, candidate.user_id, 1, undefined, result.response);
        await updateEmailFunnelState(supabaseAdmin, candidate.user_id, { day1_sent_at: now });
        enrolledCount++;
      } catch (err) {
        if (err instanceof SystemePlanLimitError) {
          capReached = true;
          break;
        }
        failedCount++;
        failures.push({ ...candidate, error: err instanceof Error ? err.message : "Unknown error" });
      }
      // Small pacing delay so we don't hammer Systeme.io's rate limit across
      // hundreds of sequential contacts in one run.
      await new Promise((resolve) => setTimeout(resolve, 150));
    }

    return NextResponse.json({
      ok: true,
      candidatesConsidered: candidates.length,
      enrolled: enrolledCount,
      failed: failedCount,
      capReachedMidBatch: capReached,
      enrolledByCampaignBeforeThisRun: enrolledByCampaign,
      enrolledByCampaignAfterThisRun: enrolledByCampaign + enrolledCount,
      campaignCap: CAMPAIGN_CAP,
      failures: failures.slice(0, 10),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Enroll-remaining-signups error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
