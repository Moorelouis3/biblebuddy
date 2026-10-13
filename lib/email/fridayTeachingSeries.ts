import { FRIDAY_LESSONS, type FridayLesson, type FridayLessonBlock } from "./fridayTeachingSeriesContent";

export { FRIDAY_LESSONS };
export type { FridayLesson, FridayLessonBlock };

/**
 * The Friday teaching series: 12 lessons, one a week, in a fixed order.
 *
 * The copy lives in fridayTeachingSeriesContent.ts (generated from the PDF
 * Louis approved on 2026-10-12). This file turns a lesson into the branded
 * email, and owns the scheduling arithmetic.
 *
 * WHY THESE ARE CAMPAIGNS. Each lesson is installed as its own row in
 * email_campaigns, keyed by the lesson id. That is not incidental - it is what
 * gives us, for free and already built:
 *
 *   - duplicate protection, because email_campaign_sends is keyed
 *     (campaign_id, email), so a person cannot receive a lesson twice however
 *     many times a run is retried;
 *   - per-lesson open and click numbers through ses_campaign_stats;
 *   - the existing /admin/campaigns preview and editor.
 *
 * It is also what satisfies the handoff's requirement that "edits or
 * reordering must not send an already received email again": the send record
 * is keyed to the lesson's stable id, not to its position, so renumbering the
 * series cannot resend anything.
 */

/** Where the sequence is anchored. The launch group's first Friday. */
export const SERIES_START = "2026-10-16";

/** Fridays, 8am, in Louis's audience's timezone - not a fixed UTC offset. */
export const SERIES_TIMEZONE = "America/New_York";
export const SERIES_SEND_HOUR = 8;

export function lessonById(id: string): FridayLesson | undefined {
  return FRIDAY_LESSONS.find((l) => l.id === id);
}

/** Lessons in send order. */
export function orderedLessons(): FridayLesson[] {
  return [...FRIDAY_LESSONS].sort((a, b) => a.position - b.position);
}

// ---------------------------------------------------------------------------
// Dates
//
// Everything here works in America/New_York rather than the server's clock,
// because the handoff is explicit that the weekday rules are decided in
// Eastern time and that daylight saving must be honoured. Intl is the only
// thing in the runtime that knows when the US changes its clocks.
// ---------------------------------------------------------------------------

const PARTS = new Intl.DateTimeFormat("en-US", {
  timeZone: SERIES_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  weekday: "short",
  hour12: false,
});

type EasternNow = { date: string; hour: number; weekday: string };

/** What the calendar and clock say in Eastern time at `at`. */
export function easternNow(at: Date = new Date()): EasternNow {
  const parts = PARTS.formatToParts(at);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    // Intl renders midnight as "24" in some ICU versions.
    hour: Number(get("hour")) % 24,
    weekday: get("weekday"),
  };
}

/** True when it is the 8am Eastern hour on a Friday. */
export function isFridaySendHour(at: Date = new Date()): boolean {
  const now = easternNow(at);
  return now.weekday === "Fri" && now.hour === SERIES_SEND_HOUR;
}

/**
 * The first Friday on which someone who signed up on `signupDate` may receive
 * lesson 1, as a YYYY-MM-DD date in Eastern time.
 *
 * The handoff's rules, which this one line satisfies together:
 *   - new subscribers start with lesson 1 on the NEXT Friday;
 *   - a Thursday signup may receive lesson 1 the very next day;
 *   - a FRIDAY signup skips that day's email and waits a week, whatever time
 *     of day they signed up.
 *
 * Taking the next Friday STRICTLY AFTER the signup day gives all three:
 * Thursday -> tomorrow, Saturday -> in six days, and Friday -> in seven,
 * because the same day never counts as "after".
 */
export function firstFridayFor(signupDate: string): string {
  const [y, m, d] = signupDate.split("-").map(Number);
  // Fixed to midday UTC so that adding whole days can never slip across a
  // boundary through a DST change.
  const day = new Date(Date.UTC(y, m - 1, d, 12));
  do {
    day.setUTCDate(day.getUTCDate() + 1);
  } while (day.getUTCDay() !== 5);
  return day.toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Rendering
//
// Table-based and inline-styled, matching the welcome email, because that is
// what survives Outlook. The palette is the welcome email's: #f3f4f6 page,
// white card, #5268a7 eyebrow, #17233b headings, #334f91 button.
// ---------------------------------------------------------------------------

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * `{{first_name}}` survives into the stored body on purpose: the senders
 * (sendCampaign, and the Friday cron) replace it per recipient and fall back
 * to "friend". `{{UNSUBSCRIBE}}` is replaced by sesSender with the signed
 * one-click link. They are the only two placeholders left in a rendered body.
 */
export function renderFridayLessonHtml(lesson: FridayLesson): string {
  const parts: string[] = [];

  for (const block of lesson.blocks) {
    if (block.type === "h1") {
      parts.push(
        `<h1 style="margin:0 0 20px;font-size:28px;line-height:1.25;color:#17233b;">${escapeHtml(block.text)}</h1>`,
      );
    } else if (block.type === "h3") {
      parts.push(
        `<h3 style="margin:30px 0 12px;font-size:20px;line-height:1.3;color:#17233b;">${escapeHtml(block.text)}</h3>`,
      );
    } else if (block.type === "p") {
      // Already HTML: the generator emitted escaped text with <strong> runs.
      parts.push(`<p style="margin:0 0 16px;">${block.html}</p>`);
    } else if (block.type === "ul") {
      const items = block.items
        .map(
          (item) =>
            `<li style="margin:0 0 9px;">${lesson.bullet}&nbsp;&nbsp;${item}</li>`,
        )
        .join("");
      parts.push(
        `<ul style="margin:0 0 18px;padding:0;list-style:none;">${items}</ul>`,
      );
    } else if (block.type === "cta") {
      parts.push(
        `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:26px 0;">` +
          `<tr><td bgcolor="#334f91" style="border-radius:6px;">` +
          `<a href="${block.url}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-weight:bold;">${escapeHtml(block.label)} →</a>` +
          `</td></tr></table>`,
      );
    }
  }

  // Louis signs these personally, so the sign-off is part of the template
  // rather than the copy - it is identical in all twelve.
  parts.push(
    `<p style="margin:26px 0 0;">Louis<br>` +
      `<span style="color:#667085;">Founder of Bible Buddy</span></p>`,
  );

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(lesson.subject)}</title>
</head>
<body style="margin:0;background:#f3f4f6;color:#263244;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(lesson.preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
<td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;"><tr>
<td style="padding:32px 28px;font-size:16px;line-height:1.65;">
<p style="margin:0 0 24px;font-size:13px;font-weight:bold;letter-spacing:2px;color:#5268a7;">BIBLE BUDDY</p>
${parts.join("\n")}
</td>
</tr></table>
</td>
</tr></table>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
<td align="center" style="padding:0 12px 28px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;"><tr>
<td style="padding:16px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#667085;text-align:center;">
Bible Buddy &middot; You are receiving this because you created a Bible Buddy account.<br>
<a href="{{UNSUBSCRIBE}}" style="color:#667085;">Unsubscribe</a>
</td>
</tr></table>
</td>
</tr></table>
</body>
</html>`;
}

/** The plain-text alternative. Every send carries both. */
export function renderFridayLessonText(lesson: FridayLesson): string {
  const strip = (value: string) =>
    value
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ");

  const lines: string[] = [];
  for (const block of lesson.blocks) {
    if (block.type === "h1") lines.push(strip(block.text), "");
    else if (block.type === "h3") lines.push("", strip(block.text), "");
    else if (block.type === "p") lines.push(strip(block.html), "");
    else if (block.type === "ul") {
      for (const item of block.items) lines.push(`- ${strip(item)}`);
      lines.push("");
    } else if (block.type === "cta") {
      lines.push(`${strip(block.label)}:`, block.url, "");
    }
  }
  lines.push("Louis", "Founder of Bible Buddy", "");
  lines.push(
    "---",
    "Bible Buddy - You are receiving this because you created a Bible Buddy account.",
    "Unsubscribe: {{UNSUBSCRIBE}}",
  );
  return lines.join("\n");
}
