import { BLOG_ARTICLES, type BlogArticle } from "@/lib/blogContent";

/**
 * The weekly newsletter (Louis, 2026-10-23).
 *
 * WHAT GOES IN IT
 *
 *   1. the devotional we are pushing right now - the newest published one
 *   2. the week's real articles - essays, news, study tips
 *   3. the reader's own progress block
 *
 * WHAT IS DELIBERATELY NOT IN IT: the chapter library. It publishes about five
 * "Leviticus 14 Explained" posts a day, which was 20 of 22 articles the week
 * this was written. A first version collapsed them into a "Leviticus 1-19"
 * block and it read like a filing cabinet - Louis's word was "weird". The
 * library is better found by browsing than announced by email, so chapter posts
 * are filtered out entirely and the devotional takes that slot.
 *
 * THE VOICE: short lines, one idea each, the strong line in bold. The specific
 * words come from the devotional's own subtitle and description and from each
 * article's own description, because those are already written in Louis's
 * voice - the template only supplies the frame around them.
 */

const SITE_URL = "https://www.mybiblebuddy.net";

/** Chapter-library posts are titled "<Book> <N> Explained: ...". */
const CHAPTER_TITLE = /^\d?\s?[A-Za-z][A-Za-z ]*?\s+\d+\s+Explained\b/;

export type FeaturedDevotional = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  totalDays: number;
  coverImage: string | null;
};

export type WeeklySelection = {
  weekOf: string;
  since: string;
  features: BlogArticle[];
  totalInWindow: number;
};

export function selectWeeklyArticles(
  options: { now?: Date; days?: number; articles?: BlogArticle[]; maxFeatures?: number } = {},
): WeeklySelection {
  const now = options.now ?? new Date();
  const days = options.days ?? 7;
  const maxFeatures = options.maxFeatures ?? 3;
  const articles = options.articles ?? BLOG_ARTICLES;

  const since = new Date(now.getTime() - days * 86400000).toISOString().slice(0, 10);
  const weekOf = now.toISOString().slice(0, 10);

  const inWindow = articles
    .filter((a) => a.publishedAt >= since && a.publishedAt <= weekOf)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));

  const features = inWindow.filter((a) => !CHAPTER_TITLE.test(a.title));

  return { weekOf, since, features: features.slice(0, maxFeatures), totalInWindow: inWindow.length };
}

/**
 * Drop anything that is not live yet.
 *
 * BLOG_ARTICLES says what EXISTS, not what is DEPLOYED: a post committed this
 * morning is in the array and still 404s until the next build. The first render
 * of this newsletter linked to leviticus-19-explained, published hours earlier,
 * which was a 404. So every URL is checked before the email is written.
 */
export async function pruneUnpublished(
  selection: WeeklySelection,
  fetchImpl: typeof fetch = fetch,
): Promise<{ selection: WeeklySelection; dropped: string[] }> {
  const dropped: string[] = [];
  const live = async (url: string) => {
    try {
      return (await fetchImpl(url, { method: "HEAD", redirect: "follow" })).ok;
    } catch {
      return false;
    }
  };

  const kept: BlogArticle[] = [];
  for (const a of selection.features) {
    if (await live(absolute(a.canonicalPath))) kept.push(a);
    else dropped.push(a.canonicalPath);
  }

  return { selection: { ...selection, features: kept }, dropped };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const INK = "#17233b";
const ACCENT = "#5268a7";
const RULE = "#e3e6ee";

function absolute(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

function rule(): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 28px;"><tr><td style="border-top:1px solid ${RULE};font-size:0;line-height:0;">&nbsp;</td></tr></table>`;
}

/** Strip a trailing "... : subtitle" so a headline stays a headline. */
function shortTitle(title: string): string {
  return title.replace(/\s*:\s.*$/, "");
}

export type RenderedNewsletter = { subject: string; preview: string; html: string; text: string };

export function renderWeeklyNewsletter(
  selection: WeeklySelection,
  devotional: FeaturedDevotional | null,
): RenderedNewsletter {
  const { features } = selection;
  const lead = features[0] ?? null;

  const subject = devotional
    ? `${devotional.totalDays} days through ${devotional.title}`
    : lead
      ? shortTitle(lead.title)
      : "This week in Bible Buddy";

  const preview = devotional?.subtitle || lead?.description?.slice(0, 140) || "Your week in Bible Buddy.";

  // The hero is the lead ARTICLE's banner, which is landscape. A devotional
  // cover is a book cover - portrait, about 850px tall at 600px wide - and as
  // a full-bleed hero it is a wall you scroll past before reading a word. The
  // cover still appears, at book size, inside the devotional block below.
  const hero = lead?.image ? absolute(lead.image) : null;
  const heroHref = lead ? absolute(lead.canonicalPath) : `${SITE_URL}/blog`;

  // The cover at book size rather than full bleed, so it reads as a book
  // being recommended instead of a billboard.
  const coverHtml = devotional?.coverImage
    ? `<p style="margin:0 0 20px;"><a href="${SITE_URL}/devotionals/${escapeHtml(devotional.id)}" style="text-decoration:none;"><img src="${escapeHtml(absolute(devotional.coverImage))}" width="240" alt="${escapeHtml(devotional.title)}" style="display:block;width:240px;max-width:100%;height:auto;border:0;outline:none;"></a></p>`
    : "";

  const devotionalHtml = devotional
    ? `<h3 style="margin:0 0 12px;font-size:21px;line-height:1.3;color:${INK};">\u{1F4D6}&nbsp;&nbsp;${escapeHtml(devotional.title)}</h3>
${coverHtml}
${devotional.subtitle ? `<p style="margin:0 0 16px;"><strong>${escapeHtml(devotional.subtitle)}</strong></p>` : ""}
${devotional.description ? `<p style="margin:0 0 16px;">${escapeHtml(devotional.description)}</p>` : ""}
<p style="margin:0 0 16px;"><strong>${devotional.totalDays} days. One a day.</strong></p>
<p style="margin:0 0 16px;">A few minutes each. Miss one and the next is still there.</p>
<p style="margin:0 0 28px;"><a href="${SITE_URL}/devotionals/${escapeHtml(devotional.id)}" style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;padding:14px 26px;font-size:16px;font-weight:bold;">Start ${escapeHtml(devotional.title)} &rarr;</a></p>`
    : "";

  const featuresHtml = features.length
    ? `${devotional ? rule() : ""}<h3 style="margin:0 0 18px;font-size:16px;font-weight:bold;letter-spacing:1px;color:${ACCENT};text-transform:uppercase;">Also written this week</h3>
${features
  .map(
    (a) => `<p style="margin:0 0 6px;font-size:18px;line-height:1.35;"><a href="${escapeHtml(absolute(a.canonicalPath))}" style="color:${INK};font-weight:bold;text-decoration:none;">${escapeHtml(a.title)}</a></p>
<p style="margin:0 0 8px;color:#4a5668;">${escapeHtml(a.description)}</p>
<p style="margin:0 0 24px;"><a href="${escapeHtml(absolute(a.canonicalPath))}" style="color:${ACCENT};font-weight:bold;text-decoration:underline;">Read it &rarr;</a></p>`,
  )
  .join("\n")}`
    : "";

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;background:#f3f4f6;color:#263244;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(preview)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
<td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;">
${hero ? `<tr><td style="font-size:0;line-height:0;"><a href="${escapeHtml(heroHref)}" style="text-decoration:none;"><img src="${escapeHtml(hero)}" width="600" alt="${escapeHtml(devotional?.title ?? lead?.title ?? "Bible Buddy")}" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;"></a></td></tr>` : ""}
<tr><td style="padding:32px 28px;font-size:16px;line-height:1.65;">

<p style="margin:0 0 24px;font-size:13px;font-weight:bold;letter-spacing:2px;color:${ACCENT};">BIBLE BUDDY</p>

<p style="margin:0 0 16px;">Hey {{first_name}}</p>

<p style="margin:0 0 28px;">Here's what's new this week. \u{1F44B}</p>

${devotionalHtml}
${featuresHtml}

{{progress_section}}

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:32px 0 0;"><tr><td style="border-top:1px solid ${RULE};padding-top:20px;">
<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#5f6b80;">Thanks for reading,<br><strong>Louis</strong></p>
<p style="margin:0;font-size:12px;line-height:1.6;color:#8c95a8;">You're receiving this because you signed up for Bible Buddy.<br><a href="{{UNSUBSCRIBE}}" style="color:#8c95a8;text-decoration:underline;">Unsubscribe</a></p>
</td></tr></table>

</td></tr></table>
</td></tr></table>
</body>
</html>`;

  const text = [
    "BIBLE BUDDY",
    "",
    "Hey {{first_name}}",
    "",
    "Here's what's new this week.",
    "",
    ...(devotional
      ? [
          devotional.title.toUpperCase(),
          "",
          ...(devotional.subtitle ? [devotional.subtitle, ""] : []),
          ...(devotional.description ? [devotional.description, ""] : []),
          `${devotional.totalDays} days. One a day.`,
          "A few minutes each. Miss one and the next is still there.",
          "",
          `Start it: ${SITE_URL}/devotionals/${devotional.id}`,
          "",
          "---",
          "",
        ]
      : []),
    ...(features.length ? ["ALSO WRITTEN THIS WEEK", ""] : []),
    ...features.flatMap((a) => [a.title, a.description, `Read it: ${absolute(a.canonicalPath)}`, ""]),
    ...(features.length ? ["---", ""] : []),
    "{{progress_section}}",
    "",
    "---",
    "",
    "Thanks for reading,",
    "Louis",
    "",
    "You're receiving this because you signed up for Bible Buddy.",
    "Unsubscribe: {{UNSUBSCRIBE}}",
    "",
  ].join("\n");

  return { subject, preview, html, text };
}
