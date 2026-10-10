import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { suppress } from "@/lib/email/sesSender";

/**
 * Where Amazon tells us an email failed (Louis, 2026-10-03).
 *
 * SES publishes bounces and complaints to an SNS topic, and SNS posts them
 * here. Acting on them is not optional housekeeping: AWS watches the bounce
 * rate (keep under 5%) and the complaint rate (under 0.1%), and a sender that
 * keeps mailing dead addresses gets throttled or shut off. Every address that
 * hard-bounces or reports us as spam goes straight onto the suppression list
 * that lib/email/sesSender.ts checks before each send.
 *
 * Soft bounces (a full mailbox, a server having a bad day) are recorded but
 * not suppressed - that address is usually fine next week.
 *
 * Auth: SNS cannot send a custom header, so the secret rides in the URL
 * (?token=SES_WEBHOOK_TOKEN) and the topic ARN is checked as well.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SnsEnvelope = {
  Type?: string;
  TopicArn?: string;
  Message?: string;
  SubscribeURL?: string;
};

type SesEvent = {
  eventType?: string;
  notificationType?: string;
  mail?: {
    messageId?: string;
    timestamp?: string;
    destination?: string[];
    tags?: Record<string, string[]>;
  };
  open?: { timestamp?: string; userAgent?: string; ipAddress?: string };
  click?: { timestamp?: string; userAgent?: string; ipAddress?: string; link?: string };
  delivery?: { timestamp?: string };
  bounce?: {
    bounceType?: string;
    bounceSubType?: string;
    bouncedRecipients?: Array<{ emailAddress?: string; diagnosticCode?: string }>;
  };
  complaint?: {
    complaintFeedbackType?: string;
    complainedRecipients?: Array<{ emailAddress?: string }>;
  };
};

function authorized(request: NextRequest, envelope: SnsEnvelope) {
  const expected = process.env.SES_WEBHOOK_TOKEN;
  if (!expected) return false;
  if (new URL(request.url).searchParams.get("token") !== expected) return false;
  const allowedTopic = process.env.SES_SNS_TOPIC_ARN;
  if (allowedTopic && envelope.TopicArn && envelope.TopicArn !== allowedTopic) return false;
  return true;
}

/**
 * Keep every event SES reports, not just the ones that suppress someone.
 *
 * Louis, 2026-10-10: moving off Systeme meant losing the open and click rates
 * he had always measured by - 17-20% opens, 0.7-2% clicks. SES publishes the
 * same events to this topic once Open and Click tracking are on, so the
 * numbers come back as long as something writes them down. This is that.
 *
 * The campaign comes from the EmailTags that sendCampaign already sets, so an
 * open can be attributed without matching on subject lines.
 *
 * Deliberately best-effort: a failure here must never make this endpoint
 * return non-2xx, because SNS retries on error and a retry storm over a
 * statistic is worse than a missing statistic. Suppression is the part that
 * matters, and it has already happened by the time this runs.
 */
async function recordEvent(kind: string, event: SesEvent) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const messageId = event.mail?.messageId;
  if (!url || !key || !messageId) return;

  const detail =
    kind === "Open" ? event.open : kind === "Click" ? event.click : kind === "Delivery" ? event.delivery : null;
  const occurredAt = detail?.timestamp || event.mail?.timestamp || new Date().toISOString();

  // SES tags arrive as { campaign: ["2026-10-13-first"] }.
  const campaignId = event.mail?.tags?.campaign?.[0] ?? null;

  try {
    const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
    await db.from("email_events").upsert(
      {
        message_id: messageId,
        event_type: kind.toLowerCase(),
        occurred_at: occurredAt,
        campaign_id: campaignId,
        email: event.mail?.destination?.[0] ?? null,
        link_url: kind === "Click" ? event.click?.link ?? null : null,
        user_agent: (detail as { userAgent?: string } | null)?.userAgent ?? null,
        ip_address: (detail as { ipAddress?: string } | null)?.ipAddress ?? null,
      },
      // SNS delivers at least once, so the same event can arrive twice.
      { onConflict: "message_id,event_type,occurred_at", ignoreDuplicates: true },
    );
  } catch (error) {
    console.error("[SES WEBHOOK] could not record event:", error instanceof Error ? error.message : error);
  }
}

export async function POST(request: NextRequest) {
  let envelope: SnsEnvelope;
  try {
    envelope = JSON.parse(await request.text()) as SnsEnvelope;
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }

  if (!authorized(request, envelope)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // SNS confirms a new subscription by posting a URL that has to be fetched
  // once. Without this the topic never starts delivering.
  if (envelope.Type === "SubscriptionConfirmation" && envelope.SubscribeURL) {
    try {
      await fetch(envelope.SubscribeURL, { cache: "no-store" });
      console.log("[SES WEBHOOK] subscription confirmed");
    } catch (error) {
      console.error("[SES WEBHOOK] confirmation failed:", error instanceof Error ? error.message : error);
    }
    return NextResponse.json({ ok: true, confirmed: true });
  }

  let event: SesEvent;
  try {
    event = JSON.parse(envelope.Message || "{}") as SesEvent;
  } catch {
    return NextResponse.json({ ok: true, ignored: "unparseable message" });
  }

  const kind = event.eventType || event.notificationType;
  const suppressed: string[] = [];

  if (kind) await recordEvent(kind, event);

  if (kind === "Bounce" && event.bounce) {
    const permanent = event.bounce.bounceType === "Permanent";
    for (const recipient of event.bounce.bouncedRecipients || []) {
      if (!recipient.emailAddress) continue;
      if (!permanent) {
        console.log(`[SES WEBHOOK] soft bounce, kept: ${recipient.emailAddress}`);
        continue;
      }
      await suppress(recipient.emailAddress, "bounce", recipient.diagnosticCode || event.bounce.bounceSubType);
      suppressed.push(recipient.emailAddress);
    }
  }

  if (kind === "Complaint" && event.complaint) {
    for (const recipient of event.complaint.complainedRecipients || []) {
      if (!recipient.emailAddress) continue;
      await suppress(recipient.emailAddress, "complaint", event.complaint.complaintFeedbackType);
      suppressed.push(recipient.emailAddress);
    }
  }

  return NextResponse.json({ ok: true, kind: kind ?? null, suppressed: suppressed.length });
}
