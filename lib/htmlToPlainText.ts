/**
 * Rich text out of the group editor, turned into text that keeps its shape.
 *
 * Every automatic post Bible Buddy writes is stored as HTML, because the group
 * wall renders HTML. The feed renders text. The first pass between the two
 * replaced each tag with a space and then collapsed every run of whitespace
 * into one, which produced exactly what Louis saw on 2026-10-18: a study with
 * a verse, four paragraphs and three bullets arriving as a single unbroken
 * line, bullet emoji stranded mid-sentence - "the formatting is terrible, it
 * all jumbled".
 *
 * A space is the wrong substitute for a block boundary. A paragraph that ends
 * is a blank line; a list item is its own line; a <br> is a line break. Those
 * three rules are the whole of this file, and they are the difference between
 * a post and a wall of words.
 *
 * Inline emphasis is dropped rather than carried as markdown, because nothing
 * downstream renders markdown and literal asterisks would be a second kind of
 * mess. The sentences survive, which is what the emphasis was decorating.
 */

const BLOCK_END = /<\s*\/\s*(p|div|section|article|h[1-6]|blockquote|ul|ol|tr)\s*>/gi;

/**
 * A link, kept as [label](href) for the feed to render.
 *
 * Dropping the tag and keeping the words is what the first version did, and
 * it turned the daily study's "📖 Complete Day 18 here →" into a sentence
 * that goes nowhere - the one line on the pinned post whose whole job is to
 * open the day (Louis, 2026-10-18: "the pinned daily devotional day thing
 * doesn't show the actual devotional day"). The same went for every "read
 * the article" and "get it in print" line in every mirrored post.
 *
 * Markdown rather than the raw URL, because the label is what somebody wrote
 * and a bare https://www.mybiblebuddy.net/devotionals/<uuid>/day/18 in the
 * middle of a devotional is not something anybody meant to publish.
 * components/feed PostBody turns these back into real links.
 */
const LINK = /<\s*a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\s*\/\s*a\s*>/gi;

export function htmlToPlainText(html: string | null | undefined): string {
  return String(html ?? "")
    .replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(LINK, (_match, href: string, label: string) => {
      const text = label.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      if (!text) return href;
      return `[${text}](${href})`;
    })
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\s*li[^>]*>/gi, "\n• ")
    .replace(/<\s*\/\s*li\s*>/gi, "\n")
    .replace(BLOCK_END, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    // Trim each line before judging whether it is blank, so that an empty
    // <p></p> - which the editor writes between paragraphs - collapses with
    // the break it already created instead of leaving a gap of three.
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * The post as it reads in the feed: headline first, then the body.
 *
 * Group posts carry their heading in a separate `title` column, so a mirror
 * that copies only the content drops it - "Genesis 7 Explained" vanishes and
 * the post opens mid-thought on "The ark door finally shuts in this chapter."
 * The feed has no title column, so the headline becomes the first line, which
 * is how a post is written anywhere else.
 *
 * Skipped when the body already opens on the same words, so nothing is said
 * twice.
 */
export function feedBodyFromGroupPost(title: string | null | undefined, html: string | null | undefined): string {
  const body = htmlToPlainText(html);
  const heading = String(title ?? "").trim();
  if (!heading) return body;

  const simplify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const headingKey = simplify(heading);
  if (!headingKey) return body;

  const firstLine = simplify(body.split("\n", 1)[0] ?? "");
  if (firstLine.startsWith(headingKey) || (firstLine.length > 8 && headingKey.startsWith(firstLine))) {
    return body;
  }

  return body ? `${heading}\n\n${body}` : heading;
}
