import type { SupabaseClient } from "@supabase/supabase-js";
import { sendEmail } from "./sesSender";
import { unsubscribeUrl } from "./unsubscribeLink";

/**
 * The parts every behaviour-triggered email needs (Louis, 2026-10-25).
 *
 * Three of these now exist - the stalled study, the streak about to break,
 * the finished devotional - and they differ only in who they pick and what
 * they say. Arming, claiming, suppression, the greeting and the shell all
 * behave identically, and the moment that is copied three times it starts
 * drifting three ways.
 *
 * The welcome email is why these exist at all: it clicks at 9.1% against
 * 0.7-1.8% for broadcasts to the same list, and the difference is that it
 * arrives when somebody has just done something.
 */

export const SITE = "https://www.mybiblebuddy.net";

/**
 * NOTHING SENDS UNTIL LOUIS ARMS IT.
 *
 * A behaviour trigger fires on its own the moment it is deployed, so without
 * this, shipping one would be the same as approving it. It sends only when an
 * email_campaigns row with this id exists AND says 'sending'. No row, or a
 * paused one, leaves the route reporting who it WOULD reach - which is the
 * useful half while deciding.
 */
export async function isArmed(db: SupabaseClient, campaignId: string): Promise<boolean> {
  const { data } = await db
    .from("email_campaigns")
    .select("status")
    .eq("campaign_id", campaignId)
    .maybeSingle();
  return data?.status === "sending";
}

/**
 * A name worth saying out loud, or nothing.
 *
 * first_name is often just the address with the @ cut off - a dry run turned
 * up "wendy.prudhomme1989" - and "Hey wendy.prudhomme1989" is worse than no
 * name at all.
 */
export function usableFirstName(raw: string | null | undefined, email: string): string {
  const name = (raw || "").trim();
  if (!name) return "friend";
  if (/[0-9._@]/.test(name)) return "friend";
  if (name.toLowerCase() === email.split("@")[0]?.toLowerCase()) return "friend";
  if (name.length > 24) return "friend";
  return name;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** The same card every trigger email sits in. */
export function shell(bodyHtml: string, unsubscribe: string) {
  return `<!doctype html><html><body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#263244;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;" cellspacing="0" cellpadding="0"><tr><td style="padding:32px;">
${bodyHtml}
<p style="margin:24px 0 0;font-size:12px;color:#94a3b8;"><a href="${escapeHtml(unsubscribe)}" style="color:#94a3b8;">Unsubscribe</a></p>
</td></tr></table></td></tr></table></body></html>`;
}

export function button(href: string, label: string) {
  return `<p style="margin:0 0 28px;"><a href="${escapeHtml(href)}" style="display:inline-block;background:#2f7fe8;color:#ffffff;text-decoration:none;padding:14px 26px;font-size:16px;font-weight:bold;border-radius:8px;">${escapeHtml(label)} &rarr;</a></p>`;
}

/**
 * Claim the send, then send it.
 *
 * email_campaign_sends is keyed (campaign_id, email) and the row goes in
 * BEFORE the message leaves, so it is the lock as well as the record: two
 * overlapping runs cannot both send, and a crash mid-send cannot produce a
 * second attempt. A failed insert means somebody else already has this
 * person, so this run quietly moves on.
 *
 * Returns true only when SES accepted it.
 */
export async function claimAndSend(
  db: SupabaseClient,
  campaignId: string,
  person: { email: string },
  message: { subject: string; html: string; text: string },
): Promise<boolean> {
  const { error: claimError } = await db
    .from("email_campaign_sends")
    .insert({ campaign_id: campaignId, email: person.email, status: "pending" });
  if (claimError) return false;

  const result = await sendEmail({
    to: person.email,
    subject: message.subject,
    html: message.html,
    text: message.text,
    unsubscribeUrl: unsubscribeUrl(person.email),
    tags: { campaign: campaignId },
  });

  await db
    .from("email_campaign_sends")
    .update({
      status: result.sent ? "sent" : "failed",
      detail: result.sent ? null : `${result.reason}${result.detail ? `: ${result.detail}` : ""}`,
      sent_at: result.sent ? new Date().toISOString() : null,
    })
    .eq("campaign_id", campaignId)
    .eq("email", person.email);

  return result.sent;
}

/** Who already has this one, so nobody gets it twice. */
export async function alreadySent(db: SupabaseClient, campaignId: string): Promise<Set<string>> {
  const { data } = await db
    .from("email_campaign_sends")
    .select("email")
    .eq("campaign_id", campaignId);
  return new Set((data || []).map((r) => String(r.email).toLowerCase()));
}
