import { FRIDAY_LESSONS, type FridayLesson, type FridayLessonBlock } from "./fridayTeachingSeriesContent";
import { THEMED_FRIDAYS } from "./fridayThemedEmails";

export { FRIDAY_LESSONS };
export type { FridayLesson, FridayLessonBlock };


/**
 * The Friday email: one email, to everybody, every Friday (Louis, 2026-10-25).
 *
 * THIS USED TO BE A DRIP AND IS NOT ANY MORE.
 *
 * Until today each subscriber walked the twelve lessons from their own
 * position: your next lesson was the first one email_campaign_sends had no
 * row for, so somebody who joined in January would have started at lesson 1
 * in January while everybody else was on lesson 11. Louis killed that:
 *
 *   "just make the damn friday emails go out weekly and that's it, nobody
 *    needs to get the first one if they weren't there, we have more than
 *    enough content to have fresh emails"
 *
 * Which is right, and it deletes a whole machine. A Friday is now a DATE,
 * not a position. Everybody on the list gets the same email on the same
 * morning; somebody who joins in week nine starts at week nine and has
 * missed weeks one to eight, exactly as they would have missed a newsletter.
 *
 * WHAT THAT BUYS, beyond being easier to think about:
 *
 *   - every Friday email can be about something that is true that week -
 *     a holiday, a new study, this week's blog post - which a drip can
 *     never do, because no two people are on the same lesson;
 *   - there is no sender to maintain. These are ordinary scheduled
 *     campaigns posted by /api/cron/email-campaign-send, the same path as
 *     every other dated broadcast, so pacing, duplicate protection, open
 *     and click stats, the dashboard schedule and the /admin/campaigns
 *     editor are all already there;
 *   - /api/cron/friday-teaching is deleted, along with the enrolment
 *     arithmetic, the per-person position lookup and the paging over every
 *     subscriber and every send row that it did weekly.
 *
 * Nobody gets anything twice: email_campaign_sends is still keyed
 * (campaign_id, email). The 917 people who received lesson 1 on 13 October
 * are simply skipped when it goes out to the rest of the list.
 *
 * The copy lives in fridayTeachingSeriesContent.ts (generated from the PDF
 * Louis approved on 2026-10-12) and fridayThemedEmails.ts (the dated four).
 * This file holds the calendar and turns either into the branded email.
 */

/** Fridays, 8am, in Louis's audience's timezone. */
export const SERIES_TIMEZONE = "America/New_York";
export const SERIES_SEND_HOUR = 8;

/**
 * Every Friday that has an email on it, in order.
 *
 * The four dated ones are fixed points - they are about the week they land
 * in - and the twelve lessons fill the Fridays around them. 30 Oct is the
 * only one in EDT (US clocks go back on 1 Nov), hence 12:00 rather than
 * 13:00 UTC.
 *
 * To add a Friday: write the email, give it a row here, run
 * `install-friday-series.ts --schedule`. To move one, change its date and
 * re-run; a date change cannot resend anything, because the send record is
 * keyed to the id.
 */
export type FridaySlot = {
  /** The Friday it goes out, Eastern. */
  date: string;
  /** 8am Eastern on that date, as UTC. */
  utc: string;
  /** A lesson id, or a themed email id. */
  id: string;
};

export const FRIDAY_CALENDAR: FridaySlot[] = [
  { date: "2026-10-30", utc: "2026-10-30T12:00:00Z", id: "friday-01-understand-the-bible" },
  { date: "2026-11-13", utc: "2026-11-13T13:00:00Z", id: "friday-03-study-guides" },
  { date: "2026-11-20", utc: "2026-11-20T13:00:00Z", id: "friday-themed-thanksgiving-2026" },
  { date: "2026-11-27", utc: "2026-11-27T13:00:00Z", id: "friday-04-read-the-context" },
  { date: "2026-12-04", utc: "2026-12-04T13:00:00Z", id: "friday-05-highlight-with-purpose" },
  { date: "2026-12-11", utc: "2026-12-11T13:00:00Z", id: "friday-06-people-and-places" },
  { date: "2026-12-18", utc: "2026-12-18T13:00:00Z", id: "friday-themed-first-christmas-2026" },
  { date: "2026-12-25", utc: "2026-12-25T13:00:00Z", id: "friday-themed-christmas-day-2026" },
  { date: "2027-01-01", utc: "2027-01-01T13:00:00Z", id: "friday-themed-new-year-2027" },
  { date: "2027-01-08", utc: "2027-01-08T13:00:00Z", id: "friday-07-take-notes" },
  { date: "2027-01-15", utc: "2027-01-15T13:00:00Z", id: "friday-08-review-what-you-read" },
  { date: "2027-01-22", utc: "2027-01-22T13:00:00Z", id: "friday-09-fit-your-life" },
  { date: "2027-01-29", utc: "2027-01-29T13:00:00Z", id: "friday-10-study-together" },
  { date: "2027-02-05", utc: "2027-02-05T13:00:00Z", id: "friday-11-ask-your-question" },
  { date: "2027-02-12", utc: "2027-02-12T13:00:00Z", id: "friday-12-build-your-routine" },
  // Displaced by the Genesis study campaign, which takes 6 Nov (2026-10-28).
  { date: "2027-02-19", utc: "2027-02-19T13:00:00Z", id: "friday-02-what-is-the-bible" },
];

/** Both sets of copy, by id. */
export function fridayEmailById(id: string): FridayLesson | undefined {
  return FRIDAY_LESSONS.find((l) => l.id === id) ?? THEMED_FRIDAYS.find((t) => t.id === id);
}

export function lessonById(id: string): FridayLesson | undefined {
  return FRIDAY_LESSONS.find((l) => l.id === id);
}

/** Lessons in their original course order. The calendar decides send order. */
export function orderedLessons(): FridayLesson[] {
  return [...FRIDAY_LESSONS].sort((a, b) => a.position - b.position);
}

/** Every calendar slot with its copy attached, soonest first. */
export function scheduledFridays(): Array<FridaySlot & { email: FridayLesson }> {
  return FRIDAY_CALENDAR.map((slot) => {
    const email = fridayEmailById(slot.id);
    if (!email) throw new Error(`FRIDAY_CALENDAR: no copy for "${slot.id}"`);
    return { ...slot, email };
  }).sort((a, b) => a.date.localeCompare(b.date));
}

/** The next Friday email due after `at`, or null once the calendar runs out. */
export function nextFriday(at: Date = new Date()): (FridaySlot & { email: FridayLesson }) | null {
  const now = at.toISOString();
  return scheduledFridays().find((slot) => slot.utc > now) ?? null;
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
/**
 * A pulled-out KJV quote, and an optional sign-off (2026-10-28).
 *
 * Added for the Genesis study campaign, which quotes Scripture far more often
 * than a Friday lesson does and wanted it to read as a quote rather than as
 * another paragraph. Purely additive: every existing block type renders
 * exactly as before, the 16 Friday emails are untouched, and the extension
 * lives here rather than in fridayTeachingSeriesContent.ts because that file
 * is generated and would lose it on the next regeneration.
 */
export type ScriptureBlock = { type: "scripture"; reference: string; text: string };

export type RenderableLesson = Omit<FridayLesson, "blocks"> & {
  blocks: Array<FridayLessonBlock | ScriptureBlock>;
  /** Overrides the default "Louis / Founder of Bible Buddy". */
  signoff?: { name: string; title: string };
};

export function renderFridayLessonHtml(lesson: RenderableLesson): string {
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
    } else if (block.type === "scripture") {
      parts.push(
        `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:22px 0;">` +
          `<tr><td style="border-left:4px solid #334f91;background:#f7f8fb;padding:14px 18px;">` +
          `<p style="margin:0 0 6px;font-size:13px;font-weight:bold;letter-spacing:1px;color:#5268a7;">${escapeHtml(block.reference)}</p>` +
          `<p style="margin:0;font-size:17px;line-height:1.55;color:#17233b;">&ldquo;${escapeHtml(block.text)}&rdquo;</p>` +
          `</td></tr></table>`,
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
  const signName = lesson.signoff?.name ?? "Louis";
  const signTitle = lesson.signoff?.title ?? "Founder of Bible Buddy";
  parts.push(
    `<p style="margin:26px 0 0;">${escapeHtml(signName)}<br>` +
      `<span style="color:#667085;">${escapeHtml(signTitle)}</span></p>`,
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
export function renderFridayLessonText(lesson: RenderableLesson): string {
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
    } else if (block.type === "scripture") {
      lines.push(`"${strip(block.text)}" - ${strip(block.reference)}`, "");
    } else if (block.type === "cta") {
      lines.push(`${strip(block.label)}:`, block.url, "");
    }
  }
  lines.push(lesson.signoff?.name ?? "Louis", lesson.signoff?.title ?? "Founder of Bible Buddy", "");
  lines.push(
    "---",
    "Bible Buddy - You are receiving this because you created a Bible Buddy account.",
    "Unsubscribe: {{UNSUBSCRIBE}}",
  );
  return lines.join("\n");
}
