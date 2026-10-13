import { createClient } from "@supabase/supabase-js";
import { EmailDay, EmailVersion } from "./emailFunnelTemplates";
import { sendFunnelEmailViaTag } from "./systemeTagSender";

// Systeme.io has no transactional send API. Instead we tag the contact and
// a Systeme.io automation ("tag added -> send email") does the sending.
export async function sendFunnelEmailViaSysteme(
  email: string,
  day: EmailDay,
  version?: EmailVersion,
  apiKey?: string,
): Promise<{ ok: boolean; error?: string; response?: any }> {
  return sendFunnelEmailViaTag(email, day, version, apiKey);
}

export async function determineUserTier(
  supabaseAdmin: any,
  userId: string,
  since: Date,
): Promise<"power_user" | "regular_user" | "ghost"> {
  // Power User: 2+ logins AND 2+ deliberate actions
  // Active User: Used app but below threshold
  // Ghost: Haven't opened app

  const { data: logins, error: loginsError } = await supabaseAdmin
    .from("master_actions")
    .select("id")
    .eq("user_id", userId)
    .eq("action_type", "user_login")
    .gte("created_at", since.toISOString());

  if (loginsError) {
    console.error("[EMAIL_FUNNEL] Error querying logins:", loginsError);
    return "ghost";
  }

  const loginCount = logins?.length || 0;

  // Deliberate actions: anything except login
  const { data: actions, error: actionsError } = await supabaseAdmin
    .from("master_actions")
    .select("id")
    .eq("user_id", userId)
    .neq("action_type", "user_login")
    .gte("created_at", since.toISOString());

  if (actionsError) {
    console.error("[EMAIL_FUNNEL] Error querying actions:", actionsError);
    return "ghost";
  }

  const actionCount = actions?.length || 0;

  if (loginCount >= 2 && actionCount >= 2) {
    return "power_user";
  }

  if (loginCount >= 1 || actionCount >= 1) {
    return "regular_user";
  }

  return "ghost";
}

export async function checkIfUserIsPro(
  supabaseAdmin: any,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from("profile_stats")
    .select("is_pro")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("[EMAIL_FUNNEL] Error checking pro status:", error);
    return false;
  }

  return data?.is_pro === true;
}

export async function getSignupTimestamp(
  supabaseAdmin: any,
  userId: string,
): Promise<Date | null> {
  const { data, error } = await supabaseAdmin
    .from("user_signups")
    .select("created_at")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("[EMAIL_FUNNEL] Error getting signup timestamp:", error);
    return null;
  }

  return data?.created_at ? new Date(data.created_at) : null;
}

export async function recordEmailSent(
  supabaseAdmin: any,
  userId: string,
  day: EmailDay,
  version?: EmailVersion,
  response?: any,
): Promise<void> {
  const { error } = await supabaseAdmin.from("email_funnel_sends").insert({
    user_id: userId,
    email_day: day,
    template_version: version ? `day${day}_version_${version}` : `day${day}`,
    systeme_io_response: response,
  });

  if (error) {
    console.error("[EMAIL_FUNNEL] Error recording email send:", error);
  }
}

export async function updateEmailFunnelState(
  supabaseAdmin: any,
  userId: string,
  updates: Record<string, any>,
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("email_funnel_state")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("user_id", userId);

  if (error) {
    console.error("[EMAIL_FUNNEL] Error updating funnel state:", error);
  }
}

export async function updateUserTier(
  supabaseAdmin: any,
  userId: string,
  tier: "power_user" | "regular_user" | "ghost",
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("user_email_funnel_tier")
    .upsert({
      user_id: userId,
      tier,
      determined_at: new Date().toISOString(),
      last_updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (error) {
    console.error("[EMAIL_FUNNEL] Error updating user tier:", error);
  }
}

function formatEmailAsHtml(plainText: string): string {
  // Convert plain text email to HTML with proper formatting
  const escaped = plainText
    .split("\n\n")
    .map((para) => {
      // Check if this paragraph is a code/link line (starts with [)
      if (para.startsWith("[")) {
        const match = para.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return `<p><a href="${match[2]}" style="color: #2563eb; text-decoration: none; font-weight: bold;">${match[1]}</a></p>`;
        }
      }
      // Bold lines (ends with **)
      const withBold = para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return `<p>${withBold}</p>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bible Buddy</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    ${escaped}
  </div>
</body>
</html>`;
}

export function calculateEmailDayNumber(signupDate: Date, now: Date = new Date()): EmailDay | null {
  const hoursSinceSignup = (now.getTime() - signupDate.getTime()) / (1000 * 60 * 60);

  // Day 1: 0-24 hours (signup day)
  if (hoursSinceSignup < 24) return 1;
  // Day 2: 24-48 hours
  if (hoursSinceSignup < 48) return 2;
  // Day 3: 48-72 hours
  if (hoursSinceSignup < 72) return 3;
  // Day 4: 72-96 hours
  if (hoursSinceSignup < 96) return 4;
  // Day 5: 96-120 hours
  if (hoursSinceSignup < 120) return 5;
  // Day 6: 120-144 hours
  if (hoursSinceSignup < 144) return 6;
  // Day 7: 144-168 hours
  if (hoursSinceSignup < 168) return 7;
  // Day 8: 168-192 hours
  if (hoursSinceSignup < 192) return 8;

  return null; // Funnel complete
}
