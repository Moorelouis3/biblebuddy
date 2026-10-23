/**
 * Render the weekly newsletter without sending or writing anything.
 *
 *   npx tsx scripts/preview-weekly-newsletter.ts [--asof 2026-10-27] [--out dir]
 *
 * Reads the live devotional list, checks every link, and fills the
 * per-recipient placeholders with an example reader, so what opens in the
 * browser is what a subscriber would get.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { selectWeeklyArticles, renderWeeklyNewsletter, pruneUnpublished } from "../lib/email/weeklyNewsletter";
import { fetchFeaturedDevotional } from "../lib/email/featuredDevotional";
import { renderProgressSectionHtml, renderProgressSectionText } from "../lib/email/progressSection";
import type { RecipientProgress } from "../lib/email/newsletterProgress";

function loadEnvLocal() {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnvLocal();

const argv = process.argv.slice(2);
const opt = (n: string, d?: string) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : d;
};

const asOf = opt("asof");
const outDir = opt("out", path.join(process.cwd(), "drafts", "weekly-newsletter-preview"))!;
const now = asOf ? new Date(`${asOf}T12:00:00.000Z`) : new Date();

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env.local");
    process.exit(1);
  }
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const raw = selectWeeklyArticles({ now });
  const { selection, dropped } = await pruneUnpublished(raw);
  const devotional = await fetchFeaturedDevotional(db, now);
  const rendered = renderWeeklyNewsletter(selection, devotional);

  if (dropped.length) console.log(`dropped (not live yet): ${dropped.join(", ")}`);
  console.log(`window     : ${selection.since} .. ${selection.weekOf}`);
  console.log(`subject    : ${rendered.subject}`);
  console.log(`devotional : ${devotional ? `${devotional.title} (${devotional.totalDays} days)` : "none available"}`);
  console.log(`articles   : ${selection.features.length} featured, ${selection.totalInWindow} published in window`);
  selection.features.forEach((a) => console.log(`   [${a.category}] ${a.title}`));

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

  const finalHtml = fs.readFileSync(path.join(outDir, `${base}.html`), "utf8");
  const leftovers = finalHtml.match(/\{\{[^}]+\}\}/g) ?? [];
  console.log(`\nleftover tokens: ${leftovers.length ? leftovers.join(", ") : "none"}`);
  console.log(`written to ${path.join(outDir, `${base}.html`)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
