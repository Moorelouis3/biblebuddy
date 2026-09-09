import type { SupabaseClient } from "@supabase/supabase-js";
import { createHmac } from "crypto";
import { BLOG_ARTICLES } from "./blogContent";

// Twice-weekly "new studies" email (2026-09-09). Replaces the retired
// 8-step onboarding sequence: a cron drafts the email from whatever went
// up on the blog, Louis reads and edits it on /admin/email-broadcasts, and
// nothing reaches a single inbox until he presses send.

export const SITE_URL = "https://www.mybiblebuddy.net";

export type BroadcastRow = {
  id: string;
  subject: string;
  intro: string | null;
  post_slugs: string[];
  body_html: string | null;
  status: string;
  recipient_count: number | null;
  send_error: string | null;
  sent_at: string | null;
  created_at: string;
};

/** Stable per-address unsubscribe token, so the link needs no login. */
export function unsubscribeToken(email: string) {
  const secret = process.env.CRON_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "bb";
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

export function unsubscribeUrl(email: string) {
  const params = new URLSearchParams({ email: email.trim().toLowerCase(), t: unsubscribeToken(email) });
  return `${SITE_URL}/unsubscribe?${params.toString()}`;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Posts published since the last broadcast went out (or the last 4 days). */
export function pickPostsSince(sinceIso: string | null, limit = 4) {
  const cutoff = sinceIso ? Date.parse(sinceIso) : Date.now() - 4 * 24 * 60 * 60 * 1000;
  const fresh = BLOG_ARTICLES.filter((post) => Date.parse(post.publishedAt) >= cutoff);
  const pool = fresh.length
    ? fresh
    : // Nothing new: fall back to the newest posts so the email still has
      // something worth reading rather than going out empty.
      [...BLOG_ARTICLES].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  return [...pool].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, limit);
}

export function buildBroadcastDraft(posts: ReturnType<typeof pickPostsSince>) {
  const lead = posts[0];
  const subject = posts.length > 1 ? `${lead.title} (and ${posts.length - 1} more)` : lead.title;
  const intro =
    posts.length > 1
      ? "A few new studies went up on Bible Buddy this week. Here they are."
      : "A new study went up on Bible Buddy this week.";
  return { subject, intro, postSlugs: posts.map((post) => post.slug) };
}

/**
 * The email itself. Plain, single column, inline styles - the only thing
 * that renders consistently across mail clients. {{UNSUBSCRIBE}} is
 * swapped per recipient at send time.
 */
export function renderBroadcastHtml(subjectIntro: string, slugs: string[]) {
  const posts = slugs
    .map((slug) => BLOG_ARTICLES.find((post) => post.slug === slug))
    .filter((post): post is (typeof BLOG_ARTICLES)[number] => Boolean(post));

  const cards = posts
    .map((post) => {
      const url = `${SITE_URL}${post.canonicalPath}?utm_source=email&utm_medium=broadcast`;
      return `
      <tr><td style="padding:0 0 22px 0;">
        <a href="${url}" style="text-decoration:none;color:inherit;">
          <img src="${SITE_URL}${post.image}" width="520" alt="${escapeHtml(post.title)}"
               style="width:100%;max-width:520px;border-radius:14px;display:block;" />
          <div style="font:700 12px/1.4 -apple-system,Segoe UI,Arial,sans-serif;color:#0056fd;padding:12px 0 4px;text-transform:uppercase;letter-spacing:.08em;">
            ${escapeHtml(post.category)}
          </div>
          <div style="font:800 19px/1.35 -apple-system,Segoe UI,Arial,sans-serif;color:#0f172a;">
            ${escapeHtml(post.title)}
          </div>
          <div style="font:400 15px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#41506b;padding-top:6px;">
            ${escapeHtml(post.description)}
          </div>
          <div style="font:700 14px/1.4 -apple-system,Segoe UI,Arial,sans-serif;color:#0056fd;padding-top:8px;">
            Read it &rarr;
          </div>
        </a>
      </td></tr>`;
    })
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#f4f8ff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8ff;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;padding:28px 24px;">
        <tr><td style="font:800 20px/1.3 -apple-system,Segoe UI,Arial,sans-serif;color:#0f172a;padding-bottom:6px;">Bible Buddy</td></tr>
        <tr><td style="font:400 16px/1.65 -apple-system,Segoe UI,Arial,sans-serif;color:#41506b;padding-bottom:22px;">
          ${escapeHtml(subjectIntro)}
        </td></tr>
        ${cards}
        <tr><td style="padding-top:6px;border-top:1px solid #e6eefc;">
          <div style="font:400 13px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#6d7789;padding-top:14px;">
            You're getting this because you signed up for Bible Buddy. Everything in the app is free.
            <br />
            <a href="{{UNSUBSCRIBE}}" style="color:#6d7789;">Unsubscribe</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/** Everyone who signed up, minus anyone who opted out. */
export async function loadRecipients(supabase: SupabaseClient) {
  const emails = new Set<string>();
  for (let page = 0; page < 20; page += 1) {
    const { data, error } = await supabase
      .from("user_signups")
      .select("email")
      .range(page * 1000, page * 1000 + 999);
    if (error) throw new Error(error.message);
    if (!data?.length) break;
    data.forEach((row) => {
      const email = (row.email || "").trim().toLowerCase();
      if (email.includes("@")) emails.add(email);
    });
    if (data.length < 1000) break;
  }

  const { data: optOuts } = await supabase.from("email_unsubscribes").select("email");
  (optOuts || []).forEach((row) => emails.delete((row.email || "").trim().toLowerCase()));

  return Array.from(emails);
}
