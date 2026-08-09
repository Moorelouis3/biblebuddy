import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { CloserConfig } from "./types";

// Everything Louis might want to change lives in closer_config in Supabase,
// so trigger words and message wording can be edited without a deploy. These
// defaults only apply if the row is missing.
export const CLOSER_DEFAULT_CONFIG: CloserConfig = {
  dryRun: true,
  hourlyCap: 100,
  triggerWords: ["BIBLE", "APP", "LINK", "STUDY"],
  signupLink: "https://www.mybiblebuddy.net/signup",
  dmTemplate:
    "Hey! I saw you commented on my post. So glad you want the Bible study app. Here is your link: {SIGNUP_LINK} see you inside!",
  fallbackCommentTemplate:
    "Just sent you the link in your DMs! If you do not see it, Instagram may have filtered it because we are not connected yet. Follow me and send me a quick message, or tap the link in my bio, and I will make sure you get it.",
  publicReplyTemplate: "So glad you want the Bible study app! Here is your link: {SIGNUP_LINK}",
};

export function getCloserSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function loadCloserConfig(supabase: SupabaseClient): Promise<CloserConfig> {
  const { data, error } = await supabase
    .from("closer_config")
    .select(
      "dry_run, hourly_cap, trigger_words, signup_link, dm_template, fallback_comment_template, public_reply_template",
    )
    .eq("id", 1)
    .maybeSingle();

  // Failing open here would mean sending live messages with default wording
  // because a query hiccuped. Failing closed to dry_run is the safe direction.
  if (error || !data) {
    return { ...CLOSER_DEFAULT_CONFIG, dryRun: true };
  }

  const row = data as {
    dry_run: boolean | null;
    hourly_cap: number | null;
    trigger_words: string[] | null;
    signup_link: string | null;
    dm_template: string | null;
    fallback_comment_template: string | null;
    public_reply_template: string | null;
  };

  return {
    dryRun: row.dry_run !== false,
    hourlyCap: typeof row.hourly_cap === "number" && row.hourly_cap > 0 ? row.hourly_cap : CLOSER_DEFAULT_CONFIG.hourlyCap,
    triggerWords:
      Array.isArray(row.trigger_words) && row.trigger_words.length
        ? row.trigger_words
        : CLOSER_DEFAULT_CONFIG.triggerWords,
    signupLink: row.signup_link || CLOSER_DEFAULT_CONFIG.signupLink,
    dmTemplate: row.dm_template || CLOSER_DEFAULT_CONFIG.dmTemplate,
    fallbackCommentTemplate: row.fallback_comment_template || CLOSER_DEFAULT_CONFIG.fallbackCommentTemplate,
    publicReplyTemplate: row.public_reply_template || CLOSER_DEFAULT_CONFIG.publicReplyTemplate,
  };
}

export function renderTemplate(template: string, signupLink: string) {
  return template.replace(/\{SIGNUP_LINK\}/g, signupLink);
}

// Case insensitive, and matched on word boundaries so "APP" does not fire on
// "happy" and "LINK" does not fire on "blinking".
export function findTrigger(text: string, triggerWords: string[]): string | null {
  const haystack = (text || "").toLowerCase();
  for (const word of triggerWords) {
    const needle = (word || "").trim().toLowerCase();
    if (!needle) continue;
    const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegex(needle)}([^a-z0-9]|$)`, "i");
    if (pattern.test(haystack)) return word;
  }
  return null;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
