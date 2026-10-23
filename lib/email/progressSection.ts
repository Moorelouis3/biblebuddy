import { continueHref, type RecipientProgress } from "./newsletterProgress";

/**
 * The words for the personalised block (Louis, 2026-10-12).
 *
 * Three variants, and the rules they are written against:
 *
 *   weekly      they covered chapters inside the reporting window
 *   study       no chapters this week, but we know where they are in a study
 *   invitation  nothing usable, or no account behind the address
 *
 * THINGS THIS COPY NEVER DOES, deliberately:
 *   - no streaks, no "you missed", no "last week you did more"
 *   - no comparison to other readers
 *   - no zeros: a count of nothing is a variant that omits the line, not a "0"
 *   - no mention of a gap in the study variant. "Where you left off" is a
 *     neutral fact; "you haven't studied since August" is a telling-off.
 *
 * "Covered" rather than "read" is load-bearing: completing one Bible-in-One-Year
 * day marks every chapter that day covers, so the number counts chapters the
 * reader's completed work covered, not chapters they sat and read one by one.
 */

/**
 * Back to the standard email palette (2026-10-23).
 *
 * These were briefly teal and gold, sampled from the one-off "A Little Wisdom
 * for Your Week" banner. That artwork belonged to a single issue and the brand
 * went back to Bible Buddy on 10-15, so a teal card with a gold button now sits
 * in an otherwise blue email looking like a mistake. Same values the rest of
 * the newsletter uses.
 */
const ACCENT = "#5268a7";
const HEADING = "#17233b";
const BODY = "#263244";
const BUTTON_TEXT = "#ffffff";
const CARD_BG = "#f7f8fb";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * The copy is written once, with `**bold**` and `*italic*`, and each renderer
 * does what it can with it. Writing the HTML tags into the sentences instead
 * would mean keeping a second, tag-free copy for the plain-text part, and the
 * two would drift the first time a line was reworded.
 *
 * Applied AFTER escaping, so the markup produces the only tags in the output.
 * Double asterisks are consumed first; whatever single ones remain are italic.
 */
function inlineMarkupToHtml(escaped: string): string {
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

/** The same markup removed, for the plain-text part. */
function stripInlineMarkup(value: string): string {
  return value.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
}

function titleCaseBook(book: string): string {
  return book
    .split(" ")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}

/**
 * Button wording for a study in progress.
 *
 * Only a devotional gets a day number on the button, because only a devotional
 * has a per-day URL (/devotionals/<id>/day/<n>). The Bible-in-One-Year plan page
 * takes no day parameter and resumes by itself, so a button reading "Open Day
 * 20" there would promise a destination the link cannot deliver. The sentence
 * above it still names the day, which is a true statement either way.
 */
function continueCta(study: { kind: "devotional" | "bible_year"; nextDay: number | null }, verb: "Continue with" | "Open"): string {
  if (study.kind === "bible_year") return "Continue the Bible in One Year";
  return `${verb} Day ${study.nextDay}`;
}

type Copy = { emoji: string; heading: string; lines: string[]; cta: string; href: string };

/**
 * The single place the variant is turned into sentences, so the HTML and the
 * plain-text part can never drift apart.
 */
export function progressCopy(progress: RecipientProgress): Copy {
  const href = continueHref(progress);
  const name = progress.firstName;
  const study = progress.study;

  if (progress.variant === "weekly") {
    const n = progress.chaptersThisWeek;
    const heading = name ? `Your Week, ${name}` : "Your Week";
    const lines: string[] = [`You covered **${n} ${plural(n, "chapter", "chapters")}** this week.`];

    if (study && !study.finished) {
      lines.push(`You're **${study.daysCompleted} ${plural(study.daysCompleted, "day", "days")}** into *${study.title}*.`);
      lines.push(`**Day ${study.nextDay} is ready when you are.**`);
      return { emoji: "📖", heading, lines, cta: continueCta(study, "Continue with"), href };
    }

    if (study && study.finished) {
      lines.push(`You also finished *${study.title}*.`);
      lines.push("**The whole thing.** 🎉");
      return { emoji: "📖", heading, lines, cta: "Choose your next study", href };
    }

    // Chapters but no study. The reading link stands on its own.
    if (progress.lastChapter) {
      const book = titleCaseBook(progress.lastChapter.book);
      lines.push(`You were last in **${book}**.`);
      lines.push("Pick it back up whenever you like.");
      return { emoji: "📖", heading, lines, cta: `Keep reading in ${book}`, href };
    }
    return { emoji: "📖", heading, lines, cta: "Keep reading", href };
  }

  if (progress.variant === "study" && study) {
    if (study.finished) {
      return {
        emoji: "🎉",
        heading: "You Finished It",
        lines: [`You completed **every day** of *${study.title}*.`, "That is worth sitting with."],
        cta: "Choose your next study",
        href,
      };
    }

    return {
      emoji: "📖",
      heading: "Where You Left Off",
      lines: [
        `You're **${study.daysCompleted} ${plural(study.daysCompleted, "day", "days")}** into *${study.title}*.`,
        `**Day ${study.nextDay} is waiting** whenever you'd like it.`,
      ],
      cta: continueCta(study, "Open"),
      href,
    };
  }

  return {
    emoji: "✨",
    heading: "Start When You're Ready",
    lines: [
      "Bible Buddy explains each chapter in **plain English**, a day at a time.",
      "*The Wisdom of Proverbs* is a gentle place to begin.",
    ],
    cta: "Start The Wisdom of Proverbs",
    href,
  };
}

/** The block as it appears in the HTML part, matching the newsletter's table style. */
export function renderProgressSectionHtml(progress: RecipientProgress): string {
  const { emoji, heading, lines, cta, href } = progressCopy(progress);
  const paragraphs = lines
    .map(
      (line) =>
        `<p style="margin:0 0 10px;font-size:16px;line-height:1.6;color:${BODY};">${inlineMarkupToHtml(escapeHtml(line))}</p>`,
    )
    .join("\n");

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:30px 0 8px;">
<tr><td style="background:${CARD_BG};border-left:4px solid ${ACCENT};padding:22px 24px;">
<h3 style="margin:0 0 12px;font-size:20px;line-height:1.3;color:${HEADING};">${escapeHtml(emoji)}&nbsp;&nbsp;${escapeHtml(heading)}</h3>
${paragraphs}
<p style="margin:16px 0 0;"><a href="${escapeHtml(href)}" style="display:inline-block;background:${ACCENT};color:${BUTTON_TEXT};text-decoration:none;padding:12px 22px;font-size:15px;font-weight:bold;">${escapeHtml(cta)} →</a></p>
</td></tr>
</table>`;
}

/** The same block for the plain-text part. */
export function renderProgressSectionText(progress: RecipientProgress): string {
  const { emoji, heading, lines, cta, href } = progressCopy(progress);
  return [
    `${emoji} ${heading.toUpperCase()}`,
    "",
    ...lines.map(stripInlineMarkup),
    "",
    `${cta}: ${href}`,
  ].join("\n");
}
