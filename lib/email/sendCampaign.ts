import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sendEmail, sesSendingEnabled } from "./sesSender";
import { unsubscribeUrl } from "./unsubscribeLink";
import { fetchProgressForBatch, resolveProgressWindow, type ProgressWindow } from "./newsletterProgress";
import { renderProgressSectionHtml, renderProgressSectionText } from "./progressSection";

/**
 * Send one email to the mailing list.
 *
 * `sesSender.sendEmail` sends to one address; this is the part that walks the
 * list and does it properly for thousands.
 *
 * Four things it refuses to get wrong:
 *
 *  - **Never twice.** Every address is claimed in email_campaign_sends before
 *    it is sent, and anyone already claimed is skipped. A campaign to 5,000
 *    people takes hours, so it WILL be interrupted eventually; a resume has to
 *    be safe. Re-running the same campaign id simply continues.
 *  - **Never to someone who said no.** marketing_recipients() excludes
 *    suppressed addresses, and sendEmail checks email_suppressions again
 *    itself before each send.
 *  - **Never more often than the person's group allows.** Quiet subscribers
 *    take two campaigns per rolling seven days and inactive ones take one,
 *    counted across ALL marketing campaigns rather than per campaign.
 *  - **Never faster than allowed.** SES caps the send rate - 1/second in the
 *    sandbox, 14/second by default in production.
 *  - **Never somebody else's progress.** A body containing `{{progress_section}}`
 *    is rendered per recipient from that address's own account. The lookup is
 *    keyed by the address being sent to, the rendered block is built inside the
 *    send loop for that one address, and nothing is carried between iterations.
 *    See the progress-section comment further down.
 *
 * WHO GETS IT IS NOT DECIDED HERE. The queue comes from marketing_recipients()
 * in the database, which is the same function /api/admin/campaigns calls to
 * show Louis the recipient count before he arms a campaign. One query, two
 * callers: the number on screen cannot drift from what actually goes out.
 *
 * Call it with a stable campaignId (e.g. "2026-10-13-proverbs-launch"). Running
 * it again with that id resumes; running it with a new id sends to everyone
 * eligible.
 */

export type CampaignResult = {
  campaignId: string;
  /** How many this run found waiting, not the whole remaining list. */
  eligible: number;
  sent: number;
  skipped: number;
  failed: number;
  stoppedEarly: boolean;
  /** Dropped between queueing and sending because a cap filled up mid-run. */
  cappedDuringRun: number;
};

type Recipient = {
  email: string;
  first_name: string | null;
  engagement_group: string;
  weekly_cap: number | null;
  marketing_sends_7d: number;
};

function admin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase credentials are required.");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

/**
 * How many people are eligible for this campaign right now.
 *
 * Exported because the dashboard shows this number before anything is armed,
 * and it has to be produced by the same query the sender walks.
 */
export async function countEligible(campaignId: string, db: SupabaseClient = admin()): Promise<number> {
  const { count, error } = await db.rpc(
    "marketing_recipients",
    { p_campaign_id: campaignId },
    { count: "exact", head: true },
  );
  if (error) throw new Error(`marketing_recipients(${campaignId}): ${error.message}`);
  return count ?? 0;
}

export async function sendCampaign(options: {
  campaignId: string;
  subject: string;
  /** `{{first_name}}` is replaced per recipient; it falls back to "friend". */
  html: string;
  text: string;
  /** Only send to subscribers carrying this tag, e.g. "bb-day1-welcome". */
  tag?: string;
  /** Sends per second. SES sandbox allows 1; production usually 14. */
  ratePerSecond?: number;
  /** Stop after this many sends - use a small number for a real-world test. */
  limit?: number;
  dryRun?: boolean;
  /**
   * The seven-day window the `{{progress_section}}` block reports on. Pass the
   * campaign row so every batch of a multi-hour send measures the same week;
   * see resolveProgressWindow.
   */
  progressWindow?: ProgressWindow;
}): Promise<CampaignResult> {
  const { campaignId, subject, html, text, tag, limit } = options;
  const rate = Math.max(0.2, options.ratePerSecond ?? 1);
  const gapMs = Math.ceil(1000 / rate);
  const db = admin();

  if (!options.dryRun && !sesSendingEnabled()) {
    throw new Error(
      "SES is not configured. Needs SES_SENDING_ENABLED=true, AWS_SES_REGION, " +
        "AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY and SES_FROM_ADDRESS.",
    );
  }

  // Only this run's worth. PostgREST caps a result at 1,000 rows anyway, and
  // the queue is ordered by address, so the next run picks up where this one
  // stopped - the addresses it sent to are claimed and no longer returned.
  //
  // This used to be preceded by a countEligible() call, which meant building
  // the engagement view TWICE per run for a number only used to decide
  // whether the campaign had finished. An empty batch answers that just as
  // well and costs nothing, and halving the heavy queries halves the chance
  // of the run tripping over a slow one.
  const batchSize = Math.min(limit ?? 1000, 1000);
  const { data, error } = await db
    .rpc("marketing_recipients", { p_campaign_id: campaignId })
    .limit(batchSize);
  if (error) {
    throw new Error(
      `marketing_recipients(${campaignId}): ${error.message || "no message - usually a dropped connection"}`,
    );
  }
  let queue = (data ?? []) as Recipient[];

  // How many this run found, not how many remain on the whole list. The cron
  // only asks whether it is zero.
  const eligible = queue.length;

  // Tag targeting predates engagement groups and is still honoured. It is not
  // part of the view because it describes the list row rather than the
  // person's behaviour, and no campaign currently sets it.
  if (tag && queue.length) {
    const { data: tagged, error: tagError } = await db
      .from("email_subscribers")
      .select("email")
      .contains("tags", [tag])
      .in(
        "email",
        queue.map((r) => r.email),
      );
    if (tagError) throw new Error(`tag filter: ${tagError.message}`);
    const keep = new Set((tagged ?? []).map((r) => r.email));
    queue = queue.filter((r) => keep.has(r.email));
  }

  const result: CampaignResult = {
    campaignId,
    eligible,
    sent: 0,
    skipped: 0,
    failed: 0,
    stoppedEarly: false,
    cappedDuringRun: 0,
  };

  if (options.dryRun) return result;

  // The personalised progress block.
  //
  // Fetched ONCE for the whole batch rather than per address: three windowed
  // lookups chunked at 250 cost about 1.8s for 1,000 recipients, where a
  // per-person query would be one round trip each. Only addresses in THIS
  // batch are looked up, and the result is a map keyed by address.
  //
  // A campaign whose body does not mention {{progress_section}} skips all of
  // this, so existing campaigns are untouched and cost nothing extra.
  //
  // It runs BEFORE the send loop, which is what makes a failure here harmless:
  // nothing has been claimed yet, so the throw reaches the cron, costs that run
  // its ten minutes, and the next one re-queues the same people. Sending the
  // whole batch a numberless email because one query timed out would be worse
  // than sending it late.
  const needsProgress = html.includes("{{progress_section}}") || text.includes("{{progress_section}}");
  const progressByEmail = needsProgress
    ? await fetchProgressForBatch(
        db,
        queue.map((r) => ({ email: r.email, first_name: r.first_name })),
        options.progressWindow ?? resolveProgressWindow({}),
      )
    : new Map();

  for (const subscriber of queue) {
    if (limit && result.sent >= limit) {
      result.stoppedEarly = true;
      break;
    }

    // Ask again, one address at a time, immediately before sending.
    //
    // The queue above was built at the start of the run and the seven-day
    // window is rolling, so by the time a batch reaches its last address the
    // answer can have changed - another campaign may have gone out, or the
    // person may have unsubscribed in the last ten minutes. This is what makes
    // the cap and the suppression list true at the moment of sending rather
    // than at the moment of queueing.
    const { data: allowed, error: checkError } = await db.rpc("can_send_campaign_now", {
      p_campaign_id: campaignId,
      p_email: subscriber.email,
    });
    // A failed CHECK is not a failed campaign. Skip this one address and move
    // on: it was never claimed, so the next run picks it up. Throwing here
    // abandoned the other ninety-nine people in the batch and handed the cron
    // an error, which is how one slow query stopped a send to 4,400.
    //
    // Failing closed - skipping rather than sending - is the right direction:
    // the cost is one email ten minutes late, against possibly mailing
    // somebody who had just unsubscribed.
    if (checkError) {
      result.skipped += 1;
      continue;
    }
    if (!allowed) {
      result.cappedDuringRun += 1;
      continue;
    }

    // Claim first. If this insert loses a race or the process dies immediately
    // after, the address is still marked and will not be sent to twice.
    const { error: claimError } = await db
      .from("email_campaign_sends")
      .insert({ campaign_id: campaignId, email: subscriber.email, status: "pending" });
    if (claimError) {
      result.skipped += 1; // already claimed by an earlier run
      continue;
    }

    const name = (subscriber.first_name || "friend").trim() || "friend";

    // Built inside the loop, from this one address's own row. If the lookup
    // returned nothing for this address - no account, or a row that arrived
    // between queueing and sending - the block falls back to the invitation
    // variant, which contains no numbers at all. It never falls back to
    // somebody else's progress, and it is never left as a raw placeholder.
    const progress = progressByEmail.get(subscriber.email.toLowerCase()) ?? {
      email: subscriber.email,
      firstName: subscriber.first_name,
      userId: null,
      chaptersThisWeek: 0,
      lastChapter: null,
      study: null,
      variant: "invitation" as const,
    };

    const personalise = (value: string, section: string) =>
      value
        .replace(/\{\{\s*progress_section\s*\}\}/g, section)
        .replace(/\{\{\s*first_name\s*\}\}/g, name);

    let status: "sent" | "failed" | "skipped" = "failed";
    let detail: string | null = null;
    try {
      const sendResult = await sendEmail({
        to: subscriber.email,
        subject: personalise(subject, ""),
        html: personalise(html, renderProgressSectionHtml(progress)),
        text: personalise(text, renderProgressSectionText(progress)),
        unsubscribeUrl: unsubscribeUrl(subscriber.email),
        tags: { campaign: campaignId.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 60) },
      });
      if (sendResult.sent) {
        status = "sent";
        result.sent += 1;
      } else if (sendResult.reason === "suppressed") {
        status = "skipped";
        result.skipped += 1;
      } else {
        detail = sendResult.detail || sendResult.reason || "unknown";
        result.failed += 1;
      }
    } catch (error) {
      detail = error instanceof Error ? error.message : String(error);
      result.failed += 1;
    }

    await db
      .from("email_campaign_sends")
      .update({ status, detail, sent_at: new Date().toISOString() })
      .eq("campaign_id", campaignId)
      .eq("email", subscriber.email);

    await new Promise((resolve) => setTimeout(resolve, gapMs));
  }

  return result;
}
