/**
 * Turn an approved welcome body into the house email HTML.
 *
 * The shell is copied from renderFridayLessonHtml so the welcome funnel looks
 * like the rest of Bible Buddy's mail: same 600px white card on #f3f4f6, same
 * BIBLE BUDDY eyebrow, same footer with the {{UNSUBSCRIBE}} token the sender
 * fills per address. Stored HTML is a full document - that is what
 * email_campaigns holds for every other campaign.
 *
 * The bodies in welcomeSequence.ts are Louis's approved plain text. This only
 * formats them. It never rewrites a line: every paragraph that goes in comes
 * out, in order, with the same words.
 *
 * What it recognises, by shape alone:
 *   [LABEL](url)                        a CTA button
 *   a line of ALL CAPS ending in !/?    a heading
 *   a line starting with an emoji       a bullet
 *   __IMAGE_PENDING__                   a visible red block, never sendable
 */
import { IMAGE_PENDING, type WelcomeStep } from "./welcomeSequence";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;
/** A heading: mostly capitals, no lowercase run, and short. */
function isHeading(line: string): boolean {
  if (line.length > 90) return false;
  const letters = line.replace(/[^A-Za-z]/g, "");
  if (letters.length < 3) return false;
  const upper = line.replace(/[^A-Z]/g, "").length;
  return upper / letters.length > 0.85;
}
/** A bullet: starts with an emoji or symbol, then text. */
function isBullet(line: string): boolean {
  return /^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u.test(line) && !isHeading(line);
}

/** Inline **bold** and [text](url), on already-escaped text. */
function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, url) =>
      `<a href="${url}" style="color:#334f91;font-weight:bold;">${label}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export function renderWelcomeHtml(step: WelcomeStep): string {
  const parts: string[] = [];
  const lines = step.body.split("\n");
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    parts.push(
      `<ul style="margin:0 0 18px;padding:0;list-style:none;">${bullets
        .map((b) => `<li style="margin:0 0 9px;">${b}</li>`)
        .join("")}</ul>`,
    );
    bullets = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushBullets();
      continue;
    }

    if (line === IMAGE_PENDING) {
      flushBullets();
      const pending = step.pendingAsset;
      parts.push(
        `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:22px 0;">` +
          `<tr><td style="border:2px dashed #c0392b;background:#fdecea;padding:16px 18px;text-align:center;">` +
          `<p style="margin:0;font-size:14px;font-weight:bold;color:#c0392b;">IMAGE NOT YET HOSTED &mdash; THIS EMAIL CANNOT BE SENT</p>` +
          (pending ? `<p style="margin:8px 0 0;font-size:13px;color:#c0392b;">${escapeHtml(pending.what)}</p>` : "") +
          `</td></tr></table>`,
      );
      continue;
    }

    const cta = line.match(LINK);
    if (cta) {
      flushBullets();
      parts.push(
        `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:26px 0;">` +
          `<tr><td bgcolor="#334f91" style="border-radius:6px;">` +
          `<a href="${cta[2]}" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-weight:bold;">${escapeHtml(cta[1])} &rarr;</a>` +
          `</td></tr></table>`,
      );
      continue;
    }

    if (isBullet(line)) {
      bullets.push(inline(line));
      continue;
    }

    flushBullets();

    if (isHeading(line)) {
      parts.push(
        `<h3 style="margin:30px 0 12px;font-size:20px;line-height:1.3;color:#17233b;">${inline(line)}</h3>`,
      );
      continue;
    }

    parts.push(`<p style="margin:0 0 16px;">${inline(line)}</p>`);
  }
  flushBullets();

  // First line of the body, as the hidden preview text.
  const preheader = lines.find((l) => l.trim() && !l.startsWith("Hey ")) ?? step.subject;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(step.subject)}</title>
</head>
<body style="margin:0;background:#f3f4f6;color:#263244;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader.trim().slice(0, 140))}</div>
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
export function renderWelcomeText(step: WelcomeStep): string {
  const body = step.body
    .split("\n")
    .map((line) => {
      const cta = line.trim().match(LINK);
      if (cta) return `${cta[1]}: ${cta[2]}`;
      if (line.trim() === IMAGE_PENDING) return "[IMAGE NOT YET HOSTED]";
      return line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1: $2").replace(/\*\*([^*]+)\*\*/g, "$1");
    })
    .join("\n");

  return `${body}

---
Bible Buddy. You are receiving this because you created a Bible Buddy account.
Unsubscribe: {{UNSUBSCRIBE}}`;
}
