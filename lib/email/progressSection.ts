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

const ACCENT = "#5268a7";
const HEADING = "#17233b";
const BODY = "#263244";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

type Copy = { heading: string; lines: string[]; cta: string; href: string };

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
    const heading = name ? `Your week, ${name}` : "Your week";
    const lines: string[] = [
      `You covered ${n} ${plural(n, "chapter", "chapters")} this week.`,
    ];

    if (study && !study.finished) {
      lines.push(
        `You're ${study.daysCompleted} ${plural(study.daysCompleted, "day", "days")} into ${study.title}, and Day ${study.nextDay} is ready when you are.`,
      );
      return { heading, lines, cta: continueCta(study, "Continue with"), href };
    }

    if (study && study.finished) {
      lines.push(`You also finished ${study.title} — the whole thing. Beautiful work.`);
      return { heading, lines, cta: "Choose your next study", href };
    }

    // Chapters but no study. The reading link stands on its own.
    if (progress.lastChapter) {
      lines.push(`You were last in ${titleCaseBook(progress.lastChapter.book)}.`);
      return { heading, lines, cta: `Keep reading in ${titleCaseBook(progress.lastChapter.book)}`, href };
    }
    return { heading, lines, cta: "Keep reading", href };
  }

  if (progress.variant === "study" && study) {
    const heading = "Where you left off";

    if (study.finished) {
      return {
        heading: "You finished it",
        lines: [`You completed every day of ${study.title}. That is worth sitting with.`],
        cta: "Choose your next study",
        href,
      };
    }

    return {
      heading,
      lines: [
        `You're ${study.daysCompleted} ${plural(study.daysCompleted, "day", "days")} into ${study.title}.`,
        `Day ${study.nextDay} is waiting whenever you'd like it.`,
      ],
      cta: continueCta(study, "Open"),
      href,
    };
  }

  return {
    heading: "Start when you're ready",
    lines: [
      "Bible Buddy explains each chapter in plain English, a day at a time.",
      "The Wisdom of Proverbs is a gentle place to begin.",
    ],
    cta: "Start The Wisdom of Proverbs",
    href,
  };
}

/** The block as it appears in the HTML part, matching the newsletter's table style. */
export function renderProgressSectionHtml(progress: RecipientProgress): string {
  const { heading, lines, cta, href } = progressCopy(progress);
  const paragraphs = lines
    .map((line) => `<p style="margin:0 0 12px;font-size:16px;line-height:1.65;color:${BODY};">${escapeHtml(line)}</p>`)
    .join("\n");

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:32px 0 8px;">
<tr><td style="background:#f7f8fb;border-left:4px solid ${ACCENT};padding:22px 24px;">
<p style="margin:0 0 10px;font-size:12px;font-weight:bold;letter-spacing:1.5px;color:${ACCENT};text-transform:uppercase;">${escapeHtml(heading)}</p>
${paragraphs}
<p style="margin:16px 0 0;"><a href="${escapeHtml(href)}" style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;padding:11px 20px;font-size:15px;font-weight:bold;">${escapeHtml(cta)} →</a></p>
</td></tr>
</table>`;
}

/** The same block for the plain-text part. */
export function renderProgressSectionText(progress: RecipientProgress): string {
  const { heading, lines, cta, href } = progressCopy(progress);
  return [heading.toUpperCase(), "", ...lines, "", `${cta}: ${href}`].join("\n");
}
