import { BLOG_ARTICLES, type BlogArticle } from "@/lib/blogContent";

/**
 * The weekly newsletter, assembled from the week's own blog output
 * (Louis, 2026-10-23).
 *
 * WHY THIS IS NOT "the three newest articles".
 *
 * The chapter library publishes about five "Leviticus 14 Explained" posts a
 * day. In the week this was written that was 20 of the 22 articles published.
 * A newsletter that took the three newest would have been Leviticus 19, 18 and
 * 17, three weeks running, and nobody wants that email.
 *
 * So the week is read as two different things:
 *
 *   FEATURES     the pieces that are not part of a chapter run - the essays,
 *                the news, the study tips. Rare, and the real reason to open
 *                the email. These lead.
 *   CHAPTER RUN  the chapter-library posts, collapsed into one block that says
 *                "we explained Leviticus 1 to 19 this week" with a couple of
 *                links, instead of nineteen bullet points.
 *
 * When a week has no features at all - a pure chapter-run week - the run
 * becomes the lead rather than the email being skipped. There is always
 * something true to say.
 */

const SITE_URL = "https://www.mybiblebuddy.net";

/** Chapter-library posts are titled "<Book> <N> Explained: ...". */
const CHAPTER_TITLE = /^(\d?\s?[A-Za-z][A-Za-z ]*?)\s+(\d+)\s+Explained\b/;

export type ChapterRun = {
  book: string;
  from: number;
  to: number;
  count: number;
  /** A couple of representative posts to link to, not the whole run. */
  samples: BlogArticle[];
};

export type WeeklySelection = {
  weekOf: string;
  since: string;
  features: BlogArticle[];
  chapterRun: ChapterRun | null;
  /** Everything considered, for logging and tests. */
  totalInWindow: number;
};

function parseChapter(article: BlogArticle): { book: string; chapter: number } | null {
  const m = article.title.match(CHAPTER_TITLE);
  if (!m) return null;
  const chapter = Number(m[2]);
  if (!Number.isFinite(chapter)) return null;
  return { book: m[1].trim(), chapter };
}

/**
 * What goes in this week's email.
 *
 * `now` is injected rather than read from the clock so a send that spans
 * midnight, and every test, see the same week.
 */
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

  const chapters: Array<{ article: BlogArticle; book: string; chapter: number }> = [];
  const features: BlogArticle[] = [];
  for (const article of inWindow) {
    const parsed = parseChapter(article);
    if (parsed) chapters.push({ article, ...parsed });
    else features.push(article);
  }

  // The biggest run of the week, by book. A week that touched two books gets
  // the one with more chapters; the other simply is not mentioned, which is
  // better than two near-identical blocks.
  const byBook = new Map<string, Array<{ article: BlogArticle; chapter: number }>>();
  for (const c of chapters) {
    byBook.set(c.book, [...(byBook.get(c.book) ?? []), { article: c.article, chapter: c.chapter }]);
  }
  let chapterRun: ChapterRun | null = null;
  for (const [book, list] of byBook) {
    if (chapterRun && list.length <= chapterRun.count) continue;
    const sorted = list.slice().sort((a, b) => a.chapter - b.chapter);
    chapterRun = {
      book,
      from: sorted[0].chapter,
      to: sorted[sorted.length - 1].chapter,
      count: sorted.length,
      // First and last of the run: the two a reader is most likely to click.
      samples: sorted.length > 1 ? [sorted[0].article, sorted[sorted.length - 1].article] : [sorted[0].article],
    };
  }

  return {
    weekOf,
    since,
    features: features.slice(0, maxFeatures),
    chapterRun,
    totalInWindow: inWindow.length,
  };
}

/**
 * Drop anything that is not actually live yet.
 *
 * BLOG_ARTICLES is the source of truth for what EXISTS, not for what is
 * DEPLOYED. The chapter-library routine commits an article and the page only
 * appears at the next build, so on any given Tuesday the newest post can be in
 * the array and still 404 on the site. The first render of this newsletter
 * linked to leviticus-19-explained, published that morning, which was a 404.
 *
 * So every URL the email would link to is checked before it is written. A
 * handful of HEAD requests, and a broken link can never reach an inbox.
 * Anything unreachable is simply left out of the week.
 */
export async function pruneUnpublished(
  selection: WeeklySelection,
  fetchImpl: typeof fetch = fetch,
): Promise<{ selection: WeeklySelection; dropped: string[] }> {
  const dropped: string[] = [];

  const live = async (url: string): Promise<boolean> => {
    try {
      const res = await fetchImpl(url, { method: "HEAD", redirect: "follow" });
      return res.ok;
    } catch {
      return false;
    }
  };

  const keptFeatures: BlogArticle[] = [];
  for (const a of selection.features) {
    if (await live(absolute(a.canonicalPath))) keptFeatures.push(a);
    else dropped.push(a.canonicalPath);
  }

  let chapterRun = selection.chapterRun;
  if (chapterRun) {
    const keptSamples: BlogArticle[] = [];
    for (const s of chapterRun.samples) {
      if (await live(absolute(s.canonicalPath))) keptSamples.push(s);
      else dropped.push(s.canonicalPath);
    }
    // The run itself still happened even if a sample is not live yet; it only
    // loses the link. With no live sample at all the block still stands on the
    // "see the whole library" link.
    chapterRun = { ...chapterRun, samples: keptSamples };
  }

  // The hero image is a separate URL and can 404 on its own.
  const lead = keptFeatures[0];
  if (lead?.image && !(await live(absolute(lead.image)))) {
    dropped.push(lead.image);
    keptFeatures[0] = { ...lead, image: "" };
  }

  return { selection: { ...selection, features: keptFeatures, chapterRun }, dropped };
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

function articleBlock(article: BlogArticle, emoji: string): string {
  return `<h3 style="margin:0 0 12px;font-size:20px;line-height:1.3;color:${INK};">${emoji}&nbsp;&nbsp;${escapeHtml(article.title)}</h3>
<p style="margin:0 0 16px;">${escapeHtml(article.description)}</p>
<p style="margin:0 0 28px;"><a href="${escapeHtml(absolute(article.canonicalPath))}" style="color:${ACCENT};font-weight:bold;text-decoration:underline;">Read it &rarr;</a></p>`;
}

function rule(): string {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 28px;"><tr><td style="border-top:1px solid ${RULE};font-size:0;line-height:0;">&nbsp;</td></tr></table>`;
}

export type RenderedNewsletter = { subject: string; preview: string; html: string; text: string };

/**
 * The email. `{{first_name}}`, `{{progress_section}}` and `{{UNSUBSCRIBE}}`
 * are left for sendCampaign and sesSender to fill per recipient.
 */
export function renderWeeklyNewsletter(selection: WeeklySelection): RenderedNewsletter {
  const { features, chapterRun } = selection;
  const lead = features[0] ?? null;

  const subject = lead
    ? lead.title.replace(/\s*[:–-].*$/, "").slice(0, 80)
    : chapterRun
      ? `We went through ${chapterRun.book} ${chapterRun.from}-${chapterRun.to} this week`
      : "This week in Bible Buddy";

  const preview = lead
    ? lead.description.slice(0, 140)
    : chapterRun
      ? `${chapterRun.count} chapters explained in plain English.`
      : "Your week in Bible Buddy.";

  const hero = lead?.image ? absolute(lead.image) : null;

  const featureHtml = features.map((a, i) => articleBlock(a, i === 0 ? "\u{1F4D6}" : i === 1 ? "\u{1F64F}" : "✨") + (i < features.length - 1 || chapterRun ? rule() : "")).join("\n");

  const runHtml = chapterRun
    ? `<h3 style="margin:0 0 12px;font-size:20px;line-height:1.3;color:${INK};">\u{1F4DA}&nbsp;&nbsp;${escapeHtml(chapterRun.book)} ${chapterRun.from}&ndash;${chapterRun.to}, Explained</h3>
<p style="margin:0 0 16px;">We worked through <strong>${chapterRun.count} ${chapterRun.count === 1 ? "chapter" : "chapters"}</strong> of ${escapeHtml(chapterRun.book)} this week.</p>
<p style="margin:0 0 16px;">Every one in plain English, verse by verse.</p>
<ul style="margin:0 0 18px;padding:0;list-style:none;">
${chapterRun.samples.map((s) => `<li style="margin:0 0 9px;">\u{1F4DA}&nbsp;&nbsp;<a href="${escapeHtml(absolute(s.canonicalPath))}" style="color:${ACCENT};font-weight:bold;text-decoration:underline;">${escapeHtml(s.title.replace(/:.*$/, ""))}</a></li>`).join("\n")}
</ul>
<p style="margin:0 0 28px;"><a href="${SITE_URL}/blog" style="color:${ACCENT};font-weight:bold;text-decoration:underline;">See the whole library &rarr;</a></p>`
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
${hero ? `<tr><td style="font-size:0;line-height:0;"><a href="${SITE_URL}/blog" style="text-decoration:none;"><img src="${escapeHtml(hero)}" width="600" alt="${escapeHtml(lead!.title)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;"></a></td></tr>` : ""}
<tr><td style="padding:32px 28px;font-size:16px;line-height:1.65;">

<p style="margin:0 0 24px;font-size:13px;font-weight:bold;letter-spacing:2px;color:${ACCENT};">BIBLE BUDDY</p>

<h1 style="margin:0 0 20px;font-size:28px;line-height:1.25;color:${INK};">This Week in Bible Buddy</h1>

<p style="margin:0 0 28px;">Hey {{first_name}}</p>

${featureHtml}
${runHtml}

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
    "THIS WEEK IN BIBLE BUDDY",
    "",
    "Hey {{first_name}}",
    "",
    ...features.flatMap((a) => [a.title.toUpperCase(), "", a.description, "", `Read it: ${absolute(a.canonicalPath)}`, "", "---", ""]),
    ...(chapterRun
      ? [
          `${chapterRun.book.toUpperCase()} ${chapterRun.from}-${chapterRun.to}, EXPLAINED`,
          "",
          `We worked through ${chapterRun.count} ${chapterRun.count === 1 ? "chapter" : "chapters"} of ${chapterRun.book} this week.`,
          "Every one in plain English, verse by verse.",
          "",
          ...chapterRun.samples.map((s) => `- ${s.title.replace(/:.*$/, "")}: ${absolute(s.canonicalPath)}`),
          "",
          `See the whole library: ${SITE_URL}/blog`,
          "",
          "---",
          "",
        ]
      : []),
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
