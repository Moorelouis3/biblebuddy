import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email/sesSender";
import { unsubscribeUrl } from "@/lib/email/unsubscribeLink";
import { WELCOME_SEQUENCE, FINAL_WELCOME_STEP } from "@/lib/email/welcomeSequence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The five-day welcome funnel — Bucket 1.
 *
 * Rewritten on 2026-11-11. It used to send one email, campaign_id 'welcome'.
 * Louis's routing spec calls for five, one per day, in order, tracked per
 * subscriber. The old row is paused and stays in the database with its 387
 * sends; these five take over.
 *
 * HOW A SUBSCRIBER MOVES
 *
 *   signs up        -> welcome_step null, welcome_completed_at null
 *   run 1           -> Welcome 1 sent, welcome_step 1
 *   ~24h later      -> Welcome 2, welcome_step 2 ... and so on
 *   Welcome 5 sent  -> welcome_step 5 AND welcome_completed_at set
 *
 * welcome_completed_at is the single thing marketing_recipients checks, so the
 * moment it is set the subscriber becomes visible to Part 2 broadcasts, and
 * until then they are invisible to every one of them. They join the NEXT
 * scheduled campaign with everybody else; nothing is replayed, because a
 * campaign that already ran is simply not run again.
 *
 * NEVER TWICE, AND NOT BY A NEW MECHANISM. Each step is its own campaign_id
 * and email_campaign_sends is keyed (campaign_id, email), so the claiming
 * insert below is both the record and the lock. Two overlapping runs cannot
 * both claim the same step for the same person, and somebody who unsubscribes
 * and signs up again cannot replay a step they already had.
 *
 * WHO IS EXCLUDED. Everyone who was already on the list at the 2026-11-11
 * cutoff had welcome_completed_at backdated by the migration, so they are
 * Bucket 2 and can never be pulled in here. That is the spec's "Existing
 * subscribers are NOT automatically put back into the welcome sequence".
 *
 * SAFE BEFORE THE MIGRATION. If welcome_step does not exist yet the route
 * idles and says so rather than failing, so the code can deploy before the
 * columns land.
 *
 * SAFE BEFORE LOUIS ARMS IT. A step whose campaign is not 'sending' is
 * skipped and the subscriber does not advance, so they wait at that step
 * rather than losing it. Installed paused, every step, so this does nothing at
 * all until he says.
 */

/** Approximately one per day, with enough slack that a 15-minute cron does not drift. */
const MIN_GAP_HOURS = 20;

/** Nobody who signed up longer ago than this is ever enrolled. */
const MAX_AGE_DAYS = 7;

/** Sends per run. Well above the ~20 signups a day Bible Buddy sees. */
const MAX_PER_RUN = 200;

/** Subscribers examined per run. */
const MAX_CANDIDATES = 500;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  // Matches the other crons here: no secret configured means the route is
  // open, because Vercel's own cron caller sets no header.
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

type Candidate = {
  email: string;
  first_name: string | null;
  subscribed_at: string | null;
  welcome_step: number | null;
};

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }
  const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // The five rows, with their current status. A step that is not 'sending' is
  // a wall: subscribers queue at it rather than skipping past it.
  const { data: campaignRows, error: campaignError } = await db
    .from("email_campaigns")
    .select("campaign_id, subject, html, text, status, rate_per_second")
    .in("campaign_id", WELCOME_SEQUENCE.map((s) => s.campaignId));
  if (campaignError) {
    return NextResponse.json({ ok: false, error: campaignError.message }, { status: 500 });
  }
  const campaigns = new Map(
    ((campaignRows as Array<Record<string, unknown>>) || []).map((r) => [r.campaign_id as string, r]),
  );
  const armedSteps = WELCOME_SEQUENCE.filter(
    (s) => (campaigns.get(s.campaignId)?.status as string | undefined) === "sending",
  );
  if (armedSteps.length === 0) {
    return NextResponse.json({
      ok: true,
      idle: true,
      reason: "no welcome step is armed",
      installed: campaigns.size,
    });
  }

  // Candidates: in the funnel or about to enter it. welcome_completed_at null
  // is the whole condition - the migration set it for everyone who predates
  // the cutoff, so only genuinely new subscribers appear here.
  const backstop = new Date(Date.now() - MAX_AGE_DAYS * 86400000).toISOString();
  const { data: candidateRows, error: candidateError } = await db
    .from("email_subscribers")
    .select("email, first_name, subscribed_at, welcome_step")
    .is("welcome_completed_at", null)
    .gte("subscribed_at", backstop)
    .order("subscribed_at", { ascending: true })
    .limit(MAX_CANDIDATES);

  if (candidateError) {
    // The migration has not run yet. Idle rather than fail, so this route can
    // deploy before the columns exist.
    if (/welcome_step|welcome_completed_at/.test(candidateError.message)) {
      return NextResponse.json({
        ok: true,
        idle: true,
        reason: "welcome columns do not exist yet - run supabase/migrations/20261111_email_buckets.sql",
      });
    }
    return NextResponse.json({ ok: false, error: candidateError.message }, { status: 500 });
  }

  const candidates = (candidateRows as Candidate[]) || [];
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: "nobody in the funnel" });
  }

  // When each candidate last received a step, so the ~24h gap can be honoured.
  // One query for the whole batch rather than one per person.
  const { data: sendRows } = await db
    .from("email_campaign_sends")
    .select("campaign_id, email, sent_at, status")
    .in("campaign_id", WELCOME_SEQUENCE.map((s) => s.campaignId))
    .in("email", candidates.map((c) => c.email));
  const lastSentAt = new Map<string, number>();
  for (const row of ((sendRows as Array<Record<string, unknown>>) || [])) {
    const email = row.email as string;
    const at = row.sent_at ? Date.parse(row.sent_at as string) : 0;
    if (!Number.isFinite(at)) continue;
    lastSentAt.set(email, Math.max(lastSentAt.get(email) ?? 0, at));
  }

  const gapMs = MIN_GAP_HOURS * 3600000;
  const now = Date.now();

  let sent = 0;
  let failed = 0;
  let skipped = 0;
  let completed = 0;
  let waiting = 0;
  let notArmed = 0;

  for (const person of candidates) {
    if (sent + failed >= MAX_PER_RUN) break;

    const current = Number(person.welcome_step ?? 0);
    const nextStepNumber = current + 1;

    // Already had all five but never got marked complete - finish the job.
    if (nextStepNumber > FINAL_WELCOME_STEP) {
      await db
        .from("email_subscribers")
        .update({ welcome_completed_at: new Date().toISOString() })
        .eq("email", person.email);
      completed += 1;
      continue;
    }

    const step = WELCOME_SEQUENCE.find((s) => s.step === nextStepNumber);
    if (!step) continue;

    const campaign = campaigns.get(step.campaignId);
    if (!campaign || campaign.status !== "sending") {
      // Wait at this step rather than skipping it. Louis can arm the funnel one
      // email at a time and nobody loses a step in the middle.
      notArmed += 1;
      continue;
    }

    // One a day. Step 1 goes out as soon as they appear.
    const last = lastSentAt.get(person.email) ?? 0;
    if (current > 0 && last && now - last < gapMs) {
      waiting += 1;
      continue;
    }

    // Claim before sending, same as sendCampaign: a crash between the two
    // loses one email rather than sending a duplicate later. The unique key on
    // (campaign_id, email) is what makes this a lock.
    const { error: claimError } = await db
      .from("email_campaign_sends")
      .insert({ campaign_id: step.campaignId, email: person.email, status: "pending" });
    if (claimError) {
      // Already claimed by an overlapping run, or already sent. Move the
      // pointer on so the subscriber is not stuck repeating a claimed step.
      await db
        .from("email_subscribers")
        .update({ welcome_step: nextStepNumber })
        .eq("email", person.email);
      skipped += 1;
      continue;
    }

    const name = (person.first_name || "friend").trim() || "friend";
    const fill = (value: string) => String(value || "").replace(/\{\{\s*first_name\s*\}\}/g, name);

    let status: "sent" | "failed" | "skipped" = "failed";
    let detail: string | null = null;
    let advance = false;

    try {
      const result = await sendEmail({
        to: person.email,
        subject: fill(campaign.subject as string),
        html: fill(campaign.html as string),
        text: fill(campaign.text as string),
        // Suppression is checked inside sendEmail, so somebody who
        // unsubscribed cannot be reached by the funnel.
        unsubscribeUrl: unsubscribeUrl(person.email),
        tags: { campaign: step.campaignId },
      });
      if (result.sent) {
        status = "sent";
        sent += 1;
        advance = true;
      } else if (result.reason === "suppressed") {
        status = "skipped";
        skipped += 1;
        // Advance anyway. They receive nothing either way, and leaving them
        // parked here would retry a suppressed address every run forever.
        advance = true;
      } else {
        detail = result.detail || result.reason || "unknown";
        failed += 1;
      }
    } catch (error) {
      detail = error instanceof Error ? error.message : String(error);
      failed += 1;
    }

    await db
      .from("email_campaign_sends")
      .update({ status, detail, sent_at: new Date().toISOString() })
      .eq("campaign_id", step.campaignId)
      .eq("email", person.email);

    if (advance) {
      const update: Record<string, unknown> = { welcome_step: nextStepNumber };
      // Finishing step 5 is what moves them into Bucket 2.
      if (nextStepNumber >= FINAL_WELCOME_STEP) {
        update.welcome_completed_at = new Date().toISOString();
        completed += 1;
      }
      await db.from("email_subscribers").update(update).eq("email", person.email);
    }

    const perSecond = Math.max(0.2, Number(campaign.rate_per_second) || 1);
    await new Promise((resolve) => setTimeout(resolve, Math.ceil(1000 / perSecond)));
  }

  return NextResponse.json({
    ok: true,
    sent,
    failed,
    skipped,
    completed,
    waiting,
    notArmed,
    candidates: candidates.length,
    armedSteps: armedSteps.map((s) => s.campaignId),
  });
}
