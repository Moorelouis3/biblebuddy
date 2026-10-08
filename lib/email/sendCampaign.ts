import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sendEmail, sesSendingEnabled } from "./sesSender";
import { unsubscribeUrl } from "./unsubscribeLink";

/**
 * Send one email to the mailing list.
 *
 * `sesSender.sendEmail` sends to one address; this is the part that walks
 * email_subscribers and does it properly for thousands.
 *
 * Three things it refuses to get wrong:
 *
 *  - **Never twice.** Every address is claimed in email_campaign_sends before
 *    it is sent, and anyone already claimed is skipped. A campaign to 4,500
 *    people takes about an hour, so it WILL be interrupted eventually; a resume
 *    has to be safe. Re-running the same campaign id simply continues.
 *  - **Never to someone who said no.** sendEmail checks email_suppressions
 *    itself, and this checks again in bulk first so a suppressed address is not
 *    even attempted.
 *  - **Never faster than allowed.** SES caps the send rate - 1/second in the
 *    sandbox, 14/second by default in production. Going over gets requests
 *    rejected and, repeated, gets an account reviewed.
 *
 * Call it with a stable campaignId (e.g. "2026-10-13-proverbs-launch"). Running
 * it again with that id resumes; running it with a new id sends to everyone.
 */

export type CampaignResult = {
  campaignId: string;
  eligible: number;
  sent: number;
  skipped: number;
  failed: number;
  stoppedEarly: boolean;
};

function admin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase credentials are required.");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function allRows<T>(
  db: SupabaseClient,
  table: string,
  columns: string,
  refine?: (q: any) => any,
): Promise<T[]> {
  const out: T[] = [];
  for (let page = 0; page < 500; page += 1) {
    let q = db.from(table).select(columns).range(page * 1000, page * 1000 + 999);
    if (refine) q = refine(q);
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    if (!data?.length) break;
    out.push(...(data as T[]));
    if (data.length < 1000) break;
  }
  return out;
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

  const subscribers = await allRows<{ email: string; first_name: string | null }>(
    db,
    "email_subscribers",
    "email, first_name",
    tag ? (q: any) => q.contains("tags", [tag]) : undefined,
  );

  const suppressed = new Set(
    (await allRows<{ email: string }>(db, "email_suppressions", "email")).map((r) => r.email),
  );
  const alreadySent = new Set(
    (
      await allRows<{ email: string }>(db, "email_campaign_sends", "email", (q: any) =>
        q.eq("campaign_id", campaignId),
      )
    ).map((r) => r.email),
  );

  const queue = subscribers.filter((s) => !suppressed.has(s.email) && !alreadySent.has(s.email));

  const result: CampaignResult = {
    campaignId,
    eligible: queue.length,
    sent: 0,
    skipped: subscribers.length - queue.length,
    failed: 0,
    stoppedEarly: false,
  };

  if (options.dryRun) return result;

  for (const subscriber of queue) {
    if (limit && result.sent >= limit) {
      result.stoppedEarly = true;
      break;
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
    const personalise = (value: string) => value.replace(/\{\{\s*first_name\s*\}\}/g, name);

    let status: "sent" | "failed" | "skipped" = "failed";
    let detail: string | null = null;
    try {
      const sendResult = await sendEmail({
        to: subscriber.email,
        subject: personalise(subject),
        html: personalise(html),
        text: personalise(text),
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
