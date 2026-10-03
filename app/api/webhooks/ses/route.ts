import { NextRequest, NextResponse } from "next/server";
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
