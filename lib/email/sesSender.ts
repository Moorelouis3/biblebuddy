import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { createClient } from "@supabase/supabase-js";

/**
 * Sending email as Bible Buddy, from Bible Buddy (Louis, 2026-10-03).
 *
 * Until now every email went out through Systeme.io: the app added a tag to a
 * contact there and one of their automations did the sending. That is why the
 * Systeme contact count climbs by roughly a thousand a month - each new signup
 * has to become a contact just to receive a welcome email - and why the bill
 * is about to jump from $17 to $47. Sending it ourselves costs about $0.10 per
 * thousand emails and nothing per contact.
 *
 * Nothing here sends until the environment is complete and SES_SENDING_ENABLED
 * is "true". Without that the app keeps using Systeme exactly as before, so
 * this file can ship long before the domain finishes verifying.
 *
 * Required environment:
 *   SES_SENDING_ENABLED=true
 *   AWS_SES_REGION=eu-central-1
 *   AWS_SES_ACCESS_KEY_ID / AWS_SES_SECRET_ACCESS_KEY
 *   SES_FROM_ADDRESS="Louis at Bible Buddy <louis@mail.mybiblebuddy.net>"
 *   SES_CONFIGURATION_SET      (optional, for bounce/complaint events)
 *
 * Suppression is ours, not only Amazon's: every send checks email_suppressions
 * first, so an unsubscribe or a hard bounce stops the next email even if a
 * caller forgets to check.
 */

export type SendResult =
  | { sent: true; messageId: string }
  | { sent: false; reason: "disabled" | "suppressed" | "error"; detail?: string };

const REGION = process.env.AWS_SES_REGION || "eu-central-1";

export function sesSendingEnabled() {
  return (
    process.env.SES_SENDING_ENABLED === "true" &&
    Boolean(process.env.AWS_SES_ACCESS_KEY_ID) &&
    Boolean(process.env.AWS_SES_SECRET_ACCESS_KEY) &&
    Boolean(process.env.SES_FROM_ADDRESS)
  );
}

let client: SESv2Client | null = null;
function sesClient() {
  if (!client) {
    client = new SESv2Client({
      region: REGION,
      credentials: {
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
      },
    });
  }
  return client;
}

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Addresses that must never be emailed again: unsubscribed, bounced, complained. */
export async function isSuppressed(email: string) {
  const { data, error } = await adminClient()
    .from("email_suppressions")
    .select("email")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();
  if (error) {
    // Fail closed: if we cannot prove an address is safe to email, do not email it.
    console.error("[SES] suppression check failed:", error.message);
    return true;
  }
  return Boolean(data);
}

export async function suppress(email: string, reason: "unsubscribe" | "bounce" | "complaint" | "manual", detail?: string) {
  const { error } = await adminClient()
    .from("email_suppressions")
    .upsert(
      { email: email.trim().toLowerCase(), reason, detail: detail ?? null },
      { onConflict: "email", ignoreDuplicates: false },
    );
  if (error) throw new Error(`suppress ${email}: ${error.message}`);
}

/**
 * One email to one person. Marketing mail must carry an unsubscribe link, so
 * `unsubscribeUrl` is required unless the message is strictly transactional
 * (a password reset, a receipt) - those pass `transactional: true`.
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
  unsubscribeUrl?: string;
  transactional?: boolean;
  tags?: Record<string, string>;
}): Promise<SendResult> {
  if (!sesSendingEnabled()) return { sent: false, reason: "disabled" };

  const to = options.to.trim().toLowerCase();
  if (await isSuppressed(to)) return { sent: false, reason: "suppressed" };

  if (!options.transactional && !options.unsubscribeUrl) {
    return { sent: false, reason: "error", detail: "marketing email needs an unsubscribe link" };
  }

  // One-click unsubscribe (RFC 8058). Gmail and Yahoo require it from bulk
  // senders, and it is what keeps complaints - the thing that gets a sender
  // throttled - from being the only way out for a reader.
  const headers = options.unsubscribeUrl
    ? [
        { Name: "List-Unsubscribe", Value: `<${options.unsubscribeUrl}>` },
        { Name: "List-Unsubscribe-Post", Value: "List-Unsubscribe=One-Click" },
      ]
    : [];

  try {
    const result = await sesClient().send(
      new SendEmailCommand({
        FromEmailAddress: process.env.SES_FROM_ADDRESS,
        Destination: { ToAddresses: [to] },
        // Mail goes out from the verified sending subdomain
        // (mail.mybiblebuddy.net), which has no inbox behind it. Without this
        // every reply to a campaign would bounce into nothing - and people do
        // reply to these, which is half the point of sending them.
        ReplyToAddresses: process.env.SES_REPLY_TO ? [process.env.SES_REPLY_TO] : undefined,
        ConfigurationSetName: process.env.SES_CONFIGURATION_SET || undefined,
        EmailTags: options.tags
          ? Object.entries(options.tags).map(([Name, Value]) => ({ Name, Value }))
          : undefined,
        Content: {
          Simple: {
            Subject: { Data: options.subject, Charset: "UTF-8" },
            Body: {
              Html: { Data: options.html, Charset: "UTF-8" },
              Text: { Data: options.text, Charset: "UTF-8" },
            },
            Headers: headers.length ? headers : undefined,
          },
        },
      }),
    );
    return { sent: true, messageId: result.MessageId || "" };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "send failed";
    console.error("[SES] send failed:", detail);
    return { sent: false, reason: "error", detail };
  }
}
