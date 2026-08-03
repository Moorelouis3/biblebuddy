import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendFunnelEmailViaSysteme, updateEmailFunnelState } from "@/lib/emailFunnelHelpers";
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
// Marker stamped into email_funnel_sends.template_version for rows this
// route creates, so we can count "how many has this campaign enrolled" by
// querying that marker directly -- NOT by signup_timestamp, which organic
// signups going through the normal hourly cron also set to "now", and would
// otherwise get miscounted against this campaign's cap.
const CAMPAIGN_MARKER = "day1_bulk_backfill_aug2026";
// Hard safety net independent of the campaign counter above: never push
// Systeme.io's real contact count past this, regardless of any accounting
// bug. Leaves a buffer under the actual 5,000 plan cap.
const SYSTEME_CONTACT_SAFETY_CEILING = 4900;

async function countCampaignEnrollments(supabaseAdmin: any): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("email_funnel_sends")
    .select("*", { count: "exact", head: true })
    .eq("email_day", 1)
    .eq("template_version", CAMPAIGN_MARKER);
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

async function countLiveSystemeContacts(apiKey: string): Promise<number> {
  let count = 0;
  let cursor: number | null = null;
  for (let page = 0; page < 60; page++) {
    const url: string =
      "https://api.systeme.io/api/contacts?limit=100" + (cursor ? `&startingAfter=${cursor}` : "");
    const res: globalThis.Response = await fetch(url, { headers: { "X-API-Key": apiKey } });
    if (!res.ok) break;
    const data: { items?: Array<{ id: number }>; hasMore?: boolean } = await res.json();
    const items = data?.items || [];
    count += items.length;
    if (!items.length || !data?.hasMore) break;
    cursor = items[items.length - 1].id;
  }
  return count;
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
  const systemeKey = process.env.SYSTEME_API_KEY;
  if (!supabaseUrl || !serviceKey || !systemeKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const enrolledByCampaign = await countCampaignEnrollments(supabaseAdmin);
    const campaignRemaining = CAMPAIGN_CAP - enrolledByCampaign;

    if (campaignRemaining <= 0) {
      return NextResponse.json({
        ok: true,
        message: "Campaign cap reached, no more enrollments",
        enrolledByCampaign,
      });
    }

    const liveSystemeContacts = await countLiveSystemeContacts(systemeKey);
    const systemeRemaining = SYSTEME_CONTACT_SAFETY_CEILING - liveSystemeContacts;

    if (systemeRemaining <= 0) {
      return NextResponse.json({
        ok: true,
        message: "Systeme.io contact safety ceiling reached, no more enrollments",
        liveSystemeContacts,
        enrolledByCampaign,
      });
    }

    const batchTarget = Math.min(DAILY_BATCH_SIZE, campaignRemaining, systemeRemaining);
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
        const { error: sendInsertError } = await supabaseAdmin.from("email_funnel_sends").insert({
          user_id: candidate.user_id,
          email_day: 1,
          template_version: CAMPAIGN_MARKER,
          systeme_io_response: result.response,
        });
        if (sendInsertError) console.error("[EMAIL_FUNNEL] Enroll record error:", sendInsertError.message);
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
      liveSystemeContactsBeforeThisRun: liveSystemeContacts,
      failures: failures.slice(0, 10),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Enroll-remaining-signups error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
