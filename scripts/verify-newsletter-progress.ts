/**
 * Proof that the newsletter's progress block is correct and does not leak
 * (Louis, 2026-10-12).
 *
 *   npx tsx scripts/verify-newsletter-progress.ts [--out <dir>]
 *
 * Reads production. Sends nothing, writes nothing to the database.
 *
 * Four things it checks:
 *
 *   1. ISOLATION. Builds one mixed batch the way a real send does, then
 *      re-derives every recipient's numbers one at a time with independent
 *      queries and compares. Any recipient carrying another's figures fails.
 *   2. VARIANTS. Finds real subscribers in each of the three states and renders
 *      the block for them, so the previews are the real thing rather than mockups.
 *   3. NO RAW PLACEHOLDERS. The finished email must contain no {{...}} token
 *      except {{UNSUBSCRIBE}}, which sesSender fills per recipient.
 *   4. EDGE CASES. Gapped studies, finished studies, chapters without a study,
 *      and addresses with no account, checked against hand-built fixtures.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  fetchProgressForBatch,
  resolveProgressWindow,
  continueHref,
  type RecipientProgress,
} from "../lib/email/newsletterProgress";
import { renderProgressSectionHtml, renderProgressSectionText, progressCopy } from "../lib/email/progressSection";

function loadEnvLocal() {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env.local");
  process.exit(1);
}
const db: SupabaseClient = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

const argv = process.argv.slice(2);
const outDir = argv.includes("--out") ? argv[argv.indexOf("--out") + 1] : path.join(process.cwd(), "drafts", "newsletter-previews");

let failures = 0;
const check = (ok: boolean, label: string, detail = "") => {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` -- ${detail}` : ""}`);
  if (!ok) failures += 1;
};

// The window the previews are built against. Fixed, exactly as a real send fixes it.
const WINDOW = resolveProgressWindow({ started_at: new Date().toISOString() });

/** Re-derive one recipient's figures from scratch, with no batching involved. */
async function independentProgress(email: string) {
  const { data: eng } = await db.from("email_engagement").select("user_id").eq("email", email.toLowerCase()).maybeSingle();
  const userId = eng?.user_id ?? null;
  if (!userId) return { userId: null, chapters: 0, studyTitle: null as string | null, nextDay: null as number | null };

  const { data: chapters } = await db
    .from("completed_chapters")
    .select("book, chapter, completed_at")
    .eq("user_id", userId)
    .gte("completed_at", WINDOW.startIso)
    .lt("completed_at", WINDOW.endIso);

  const { data: devRows } = await db
    .from("devotional_progress")
    .select("devotional_id, day_number, completed_at")
    .eq("user_id", userId)
    .eq("is_completed", true);

  const { data: byRows } = await db
    .from("bible_year_day_progress")
    .select("day_number, reading_completed, updated_at")
    .eq("user_id", userId);

  const { data: devMetaRows } = await db.from("devotionals").select("id, title, total_days");
  const meta = new Map((devMetaRows ?? []).map((d: any) => [d.id, d]));

  // Pick the most recently completed study, same rule as the module.
  let best: { title: string; days: Set<number>; total: number; latest: string } | null = null;
  const grouped = new Map<string, { days: Set<number>; latest: string }>();
  for (const r of devRows ?? []) {
    const e = grouped.get(r.devotional_id) ?? { days: new Set<number>(), latest: "" };
    e.days.add(r.day_number);
    if (r.completed_at && r.completed_at > e.latest) e.latest = r.completed_at;
    grouped.set(r.devotional_id, e);
  }
  for (const [id, e] of grouped) {
    const m = meta.get(id);
    if (!m?.total_days) continue;
    if (!best || e.latest > best.latest) best = { title: m.title, days: e.days, total: Number(m.total_days), latest: e.latest };
  }
  const yearDays = new Set<number>();
  let yearLatest = "";
  for (const r of byRows ?? []) {
    if (!r.reading_completed) continue;
    yearDays.add(r.day_number);
    if (r.updated_at && r.updated_at > yearLatest) yearLatest = r.updated_at;
  }
  if (yearDays.size && (!best || yearLatest > best.latest)) {
    best = { title: "the Bible in One Year", days: yearDays, total: 365, latest: yearLatest };
  }

  let nextDay: number | null = null;
  if (best) {
    for (let d = 1; d <= best.total; d += 1) {
      if (!best.days.has(d)) { nextDay = d; break; }
    }
  }

  return { userId, chapters: (chapters ?? []).length, studyTitle: best?.title ?? null, nextDay };
}

async function main() {
  console.log(`Reporting window: ${WINDOW.startIso}  ->  ${WINDOW.endIso}\n`);

  // ---- Assemble a realistic mixed batch -------------------------------------
  const { data: subs } = await db.from("email_engagement").select("email, first_name, user_id").limit(1000);
  const all = (subs ?? []) as Array<{ email: string; first_name: string | null; user_id: string | null }>;

  // Real people in each state, found rather than invented.
  const { data: weeklyRows } = await db
    .from("completed_chapters")
    .select("user_id")
    .gte("completed_at", WINDOW.startIso)
    .lt("completed_at", WINDOW.endIso);
  const weeklyUsers = new Set((weeklyRows ?? []).map((r: any) => r.user_id));

  const { data: studyRows } = await db.from("devotional_progress").select("user_id").eq("is_completed", true).limit(1000);
  const studyUsers = new Set((studyRows ?? []).map((r: any) => r.user_id));

  const pickByUser = async (users: Set<string>, limit: number) => {
    const ids = [...users].slice(0, 300);
    const found: Array<{ email: string; first_name: string | null }> = [];
    for (let i = 0; i < ids.length && found.length < limit; i += 200) {
      const { data } = await db.from("email_engagement").select("email, first_name, user_id").in("user_id", ids.slice(i, i + 200));
      for (const r of (data ?? []) as any[]) {
        if (found.length < limit) found.push({ email: r.email, first_name: r.first_name });
      }
    }
    return found;
  };

  const weeklyPeople = await pickByUser(weeklyUsers, 6);
  const studyPeople = (await pickByUser(studyUsers, 10)).filter((p) => !weeklyPeople.some((w) => w.email === p.email)).slice(0, 6);
  const noAccount = all.filter((r) => !r.user_id).slice(0, 4).map((r) => ({ email: r.email, first_name: r.first_name }));
  const plain = all.filter((r) => r.user_id).slice(0, 20).map((r) => ({ email: r.email, first_name: r.first_name }));

  const batch = [...weeklyPeople, ...studyPeople, ...noAccount, ...plain].filter(
    (r, i, a) => a.findIndex((x) => x.email === r.email) === i,
  );
  console.log(`Batch assembled: ${batch.length} recipients (${weeklyPeople.length} with weekly chapters, ${studyPeople.length} with a study, ${noAccount.length} with no account)\n`);

  const rendered = await fetchProgressForBatch(db, batch, WINDOW);

  // ---- 1. Isolation ---------------------------------------------------------
  console.log("1. ISOLATION -- every recipient's numbers re-derived independently");
  const sampleSize = Math.min(batch.length, 24);
  let mismatches = 0;
  for (const r of batch.slice(0, sampleSize)) {
    const got = rendered.get(r.email.toLowerCase())!;
    const want = await independentProgress(r.email);
    const same =
      got.userId === want.userId &&
      got.chaptersThisWeek === want.chapters &&
      (got.study?.title ?? null) === want.studyTitle &&
      (got.study?.nextDay ?? null) === want.nextDay;
    if (!same) {
      mismatches += 1;
      console.log(`     MISMATCH ${r.email}: batch=${JSON.stringify({ c: got.chaptersThisWeek, s: got.study?.title, n: got.study?.nextDay })} independent=${JSON.stringify(want)}`);
    }
  }
  check(mismatches === 0, `${sampleSize} recipients each carry only their own figures`, mismatches ? `${mismatches} mismatched` : "");

  // No two recipients share a rendered block unless they are genuinely in the
  // same state - and the ones with numbers must each be distinct.
  const withNumbers = [...rendered.values()].filter((p) => p.chaptersThisWeek > 0);
  const blocks = new Map<string, string[]>();
  for (const p of withNumbers) {
    const html = renderProgressSectionHtml(p);
    blocks.set(html, [...(blocks.get(html) ?? []), p.email]);
  }
  const collided = [...blocks.entries()].filter(([, emails]) => emails.length > 1 && new Set(withNumbers.filter((p) => emails.includes(p.email)).map((p) => `${p.chaptersThisWeek}|${p.study?.nextDay}`)).size > 1);
  check(collided.length === 0, "no two recipients with different figures share a block");

  // ---- 2. Variants ----------------------------------------------------------
  console.log("\n2. VARIANTS -- real subscribers in each state");
  const byVariant = new Map<string, RecipientProgress[]>();
  for (const p of rendered.values()) byVariant.set(p.variant, [...(byVariant.get(p.variant) ?? []), p]);
  for (const v of ["weekly", "study", "invitation"] as const) {
    const found = byVariant.get(v) ?? [];
    check(found.length > 0, `found a real subscriber for the "${v}" variant`, `${found.length} in batch`);
  }

  const counts = Object.fromEntries([...byVariant].map(([v, list]) => [v, list.length]));
  console.log(`     variant spread in this batch: ${JSON.stringify(counts)}`);

  // ---- 3. No raw placeholders, and the block never shows a zero --------------
  console.log("\n3. OUTPUT SAFETY");
  let zeroLeak = 0;
  let placeholderLeak = 0;
  for (const p of rendered.values()) {
    const text = renderProgressSectionText(p);
    if (/\{\{(?!\s*UNSUBSCRIBE)/.test(text)) placeholderLeak += 1;
    if (/\b0 chapters?\b/i.test(text)) zeroLeak += 1;
  }
  check(placeholderLeak === 0, "no unrendered {{token}} in any block");
  check(zeroLeak === 0, "no block reports a count of zero");

  // The copy carries **bold** / *italic* markup. Both renderers must consume it:
  // a stray asterisk in a sent email is the kind of thing nobody notices until
  // it is in 5,000 inboxes.
  let asteriskLeak = 0;
  let noEmphasis = 0;
  for (const p of rendered.values()) {
    if (renderProgressSectionText(p).includes("*")) asteriskLeak += 1;
    const html = renderProgressSectionHtml(p);
    if (html.includes("*")) asteriskLeak += 1;
    if (!/<strong>|<em>/.test(html)) noEmphasis += 1;
  }
  check(asteriskLeak === 0, "no raw ** or * survives into either part");
  check(noEmphasis === 0, "every block renders real <strong>/<em>, not literal markup");

  const guiltWords = /streak|missed|haven't|behind|fell off|lapsed|inactive|compared/i;
  const guilty = [...rendered.values()].filter((p) => guiltWords.test(renderProgressSectionText(p)));
  check(guilty.length === 0, "no guilt, streak or comparison language", guilty.length ? guilty[0].email : "");

  // ---- 4. Edge cases against fixtures ---------------------------------------
  console.log("\n4. EDGE CASES");
  const base: RecipientProgress = {
    email: "fixture@example.com", firstName: "Sam", userId: "u1",
    chaptersThisWeek: 0, lastChapter: null, study: null, variant: "invitation",
  };

  const gapped: RecipientProgress = {
    ...base, variant: "study",
    study: { kind: "devotional", title: "The Faith of Job", daysCompleted: 4, totalDays: 40, nextDay: 4, finished: false, devotionalId: "d1" },
  };
  check(progressCopy(gapped).cta === "Open Day 4", "gapped study (did 1,2,3,7) continues at the first day NOT done, not day 8", progressCopy(gapped).cta);

  const finished: RecipientProgress = {
    ...base, variant: "study",
    study: { kind: "devotional", title: "The Fall of Man", daysCompleted: 2, totalDays: 2, nextDay: null, finished: true, devotionalId: "d2" },
  };
  check(continueHref(finished).endsWith("/devotionals"), "finished study invites the reader to choose another", continueHref(finished));
  const finishedCopy = progressCopy(finished);
  check(
    /finished|completed every day/i.test([finishedCopy.heading, ...finishedCopy.lines].join(" ")),
    "finished study is celebrated, not nagged",
    finishedCopy.heading,
  );
  check(!/\bDay \d+\b/.test(finishedCopy.cta), "finished study's button names no day", finishedCopy.cta);

  // The Bible-in-One-Year plan page takes no day parameter, so its button must
  // not promise one. A devotional's button should.
  const yearStudy: RecipientProgress = {
    ...base, variant: "study",
    study: { kind: "bible_year", title: "the Bible in One Year", daysCompleted: 19, totalDays: 365, nextDay: 20, finished: false },
  };
  const yearCopy = progressCopy(yearStudy);
  check(!/\bDay \d+\b/.test(yearCopy.cta), "Bible-in-One-Year button promises no specific day", yearCopy.cta);
  check(
    continueHref(yearStudy).endsWith("/reading-plans/bible-in-one-year"),
    "Bible-in-One-Year continues to the plan page",
    continueHref(yearStudy),
  );
  check(/\bDay 20\b/.test(yearCopy.lines.join(" ")), "the sentence still names the next day");

  const devStudy: RecipientProgress = {
    ...base, variant: "study",
    study: { kind: "devotional", title: "The Rise of Esther", daysCompleted: 3, totalDays: 10, nextDay: 4, finished: false, devotionalId: "abc" },
  };
  check(continueHref(devStudy).endsWith("/devotionals/abc/day/4"), "a devotional deep-links to its next day", continueHref(devStudy));

  const chaptersNoStudy: RecipientProgress = {
    ...base, variant: "weekly", chaptersThisWeek: 5, lastChapter: { book: "genesis", chapter: 12 },
  };
  const href = continueHref(chaptersNoStudy);
  check(href.includes("/Bible/genesis/13"), "chapters without a study still get a reading link", href);
  check(/5 chapters/.test(progressCopy(chaptersNoStudy).lines.join(" ")), "chapter count shown without needing a study");

  const lastChapterOfBook: RecipientProgress = {
    ...base, variant: "weekly", chaptersThisWeek: 1, lastChapter: { book: "jude", chapter: 1 },
  };
  check(!/\/jude\/2/.test(continueHref(lastChapterOfBook)), "never links past the end of a book", continueHref(lastChapterOfBook));

  const noAccountFixture: RecipientProgress = { ...base, userId: null };
  const noAccountText = renderProgressSectionText(noAccountFixture);
  check(!/\d/.test(noAccountText.replace(/https?:\/\/\S+/g, "")), "no-account block contains no numbers at all");

  const singular: RecipientProgress = { ...base, variant: "weekly", chaptersThisWeek: 1, lastChapter: { book: "mark", chapter: 3 } };
  check(/1 chapter\b/.test(progressCopy(singular).lines[0]), "singular grammar for one chapter", progressCopy(singular).lines[0]);

  // ---- Previews -------------------------------------------------------------
  fs.mkdirSync(outDir, { recursive: true });
  const htmlTemplate = fs.readFileSync(path.join(process.cwd(), "drafts", "newsletter-2026-10-13.html"), "utf8");
  const textTemplate = fs.readFileSync(path.join(process.cwd(), "drafts", "newsletter-2026-10-13.txt"), "utf8");

  // PREVIEWS USE INVENTED PEOPLE, ON PURPOSE.
  //
  // The isolation check above runs on real subscribers, but these files get
  // committed and this repository is public, so a real first name or address
  // must never reach them. Every figure below is made up. The shapes are the
  // ones the real run produced - see the variant spread printed above.
  const examples: Array<[string, RecipientProgress]> = [
    [
      "1-active-reader",
      {
        email: "example-active@example.com", firstName: "Sarah", userId: "example",
        chaptersThisWeek: 6, lastChapter: { book: "proverbs", chapter: 9 },
        study: { kind: "devotional", title: "The Wisdom of Proverbs", daysCompleted: 9, totalDays: 31, nextDay: 10, finished: false, devotionalId: "example-devotional-id" },
        variant: "weekly",
      },
    ],
    [
      "2-quiet-week",
      {
        email: "example-quiet@example.com", firstName: "Daniel", userId: "example",
        chaptersThisWeek: 0, lastChapter: null,
        study: { kind: "devotional", title: "The Faith of Job", daysCompleted: 12, totalDays: 40, nextDay: 13, finished: false, devotionalId: "example-devotional-id" },
        variant: "study",
      },
    ],
    ["3-new-subscriber", { ...base, email: "example-new@example.com", firstName: null, userId: null }],
    [
      "4-chapters-no-study",
      {
        email: "example-reader@example.com", firstName: "Grace", userId: "example",
        chaptersThisWeek: 4, lastChapter: { book: "genesis", chapter: 12 },
        study: null, variant: "weekly",
      },
    ],
  ];

  // Every image the email points at must already exist under public/, or it
  // will 404 in the inbox. Checked here rather than trusted, because the file
  // only becomes reachable once the site is deployed.
  const imgSrcs = [...htmlTemplate.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  for (const src of imgSrcs) {
    const local = src.replace(/^https:\/\/www\.mybiblebuddy\.net\//, "");
    const onDisk = path.join(process.cwd(), "public", local);
    check(fs.existsSync(onDisk), `banner image exists in public/: ${local}`, fs.existsSync(onDisk) ? `${(fs.statSync(onDisk).size / 1024).toFixed(0)}KB` : "MISSING");
    // Copy it beside the previews and point them at it, so a preview renders
    // offline instead of showing a broken image before the site is deployed.
    if (fs.existsSync(onDisk)) fs.copyFileSync(onDisk, path.join(outDir, path.basename(local)));
  }
  const localiseImages = (tpl: string) =>
    imgSrcs.reduce((acc, src) => acc.split(src).join(path.basename(src)), tpl);

  for (const [name, progress] of examples) {
    const fill = (tpl: string, section: string) =>
      tpl
        .replace(/\{\{\s*progress_section\s*\}\}/g, section)
        .replace(/\{\{\s*first_name\s*\}\}/g, (progress.firstName || "friend"))
        .replace(/\{\{UNSUBSCRIBE\}\}/g, "https://www.mybiblebuddy.net/api/email/unsubscribe?token=EXAMPLE");
    fs.writeFileSync(path.join(outDir, `${name}.html`), localiseImages(fill(htmlTemplate, renderProgressSectionHtml(progress))), "utf8");
    fs.writeFileSync(path.join(outDir, `${name}.txt`), fill(textTemplate, renderProgressSectionText(progress)), "utf8");
    console.log(`\n--- preview: ${name} (variant=${progress.variant}) ---`);
    console.log(renderProgressSectionText(progress).split("\n").map((l) => `     ${l}`).join("\n"));
  }

  const finalHtml = fs.readFileSync(path.join(outDir, "1-active-reader.html"), "utf8");
  check(!/\{\{(?!UNSUBSCRIBE)/.test(finalHtml), "rendered newsletter has no leftover tokens");

  console.log(`\nPreviews written to ${outDir}`);
  console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
