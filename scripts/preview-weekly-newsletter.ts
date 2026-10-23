/**
 * Render the weekly newsletter without sending or writing anything.
 *
 *   npx tsx scripts/preview-weekly-newsletter.ts [--asof 2026-10-23] [--out dir]
 *
 * Writes <out>/weekly-<date>.html and .txt with the per-recipient placeholders
 * filled by an example reader, so what you open is what a subscriber gets.
 */
import fs from "node:fs";
import path from "node:path";
import { selectWeeklyArticles, renderWeeklyNewsletter, pruneUnpublished } from "../lib/email/weeklyNewsletter";
import { renderProgressSectionHtml, renderProgressSectionText } from "../lib/email/progressSection";
import type { RecipientProgress } from "../lib/email/newsletterProgress";

const argv = process.argv.slice(2);
const opt = (n: string, d?: string) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : d;
};

const asOf = opt("asof");
const outDir = opt("out", path.join(process.cwd(), "drafts", "weekly-newsletter-preview"))!;
const now = asOf ? new Date(`${asOf}T12:00:00.000Z`) : new Date();

async function main() {
  const raw = selectWeeklyArticles({ now });
  const { selection, dropped } = await pruneUnpublished(raw);
  const rendered = renderWeeklyNewsletter(selection);
  if (dropped.length) console.log("dropped (not live yet): " + dropped.join(", "));

  console.log(`window      : ${selection.since} .. ${selection.weekOf}`);
  console.log(`articles    : ${selection.totalInWindow} in window`);
  console.log(`subject     : ${rendered.subject}`);
  console.log(`preview text: ${rendered.preview}`);
  console.log(`\nfeatures (${selection.features.length}):`);
  selection.features.forEach((a) => console.log(`   [${a.category}] ${a.title}`));
  console.log(
    `chapter run : ${
      selection.chapterRun
        ? `${selection.chapterRun.book} ${selection.chapterRun.from}-${selection.chapterRun.to} (${selection.chapterRun.count} posts, linking ${selection.chapterRun.samples.length})`
        : "none"
    }`,
  );

  // An example reader, so the progress block is visible. Invented numbers.
  const example: RecipientProgress = {
    email: "example@example.com",
    firstName: "Sarah",
    userId: "example",
    chaptersThisWeek: 6,
    lastChapter: { book: "leviticus", chapter: 19 },
    study: null,
    variant: "weekly",
  };

  const fill = (tpl: string, section: string) =>
    tpl
      .replace(/\{\{\s*progress_section\s*\}\}/g, section)
      .replace(/\{\{\s*first_name\s*\}\}/g, example.firstName || "friend")
      .replace(/\{\{UNSUBSCRIBE\}\}/g, "https://www.mybiblebuddy.net/api/email/unsubscribe?token=EXAMPLE");

  fs.mkdirSync(outDir, { recursive: true });
  const base = `weekly-${selection.weekOf}`;
  fs.writeFileSync(path.join(outDir, `${base}.html`), fill(rendered.html, renderProgressSectionHtml(example)), "utf8");
  fs.writeFileSync(path.join(outDir, `${base}.txt`), fill(rendered.text, renderProgressSectionText(example)), "utf8");

  // Nothing may ship with an unrendered token.
  const finalHtml = fs.readFileSync(path.join(outDir, `${base}.html`), "utf8");
  const leftovers = finalHtml.match(/\{\{[^}]+\}\}/g) ?? [];
  console.log(`\nleftover tokens in rendered html: ${leftovers.length ? leftovers.join(", ") : "none"}`);
  console.log(`written to ${outDir}/${base}.html`);

}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
