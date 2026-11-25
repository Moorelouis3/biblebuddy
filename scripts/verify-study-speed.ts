/**
 * Offline checks that opening a study stays fast.
 *
 *   npm run verify:study-speed
 *
 * Same idiom as the other verify-* scripts: no network, no database, assert
 * against the real source text.
 *
 * These exist because of what was measured on 2026-11-25
 * (docs/SPEED_REPORT_2026-11-25.md). Opening a study day took three blank
 * redirects, 58 database calls and 7.9 MB of code, and the text was still
 * not on screen at ten seconds. None of it was a bug that raises an error.
 * Each cause was one ordinary-looking line, and each can come back the same
 * way:
 *
 *   - a client file importing lib/bibleReaderStudyNotes for its value, which
 *     bundles every note in the Bible (about 33 MB) into that screen;
 *   - the study's own address mounting the whole study before redirecting;
 *   - the study's requests going back to one-after-another;
 *   - "who is signed in?" going back to a network request.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { strict as assert } from "assert";

const read = (p: string) => readFileSync(p, "utf8");
let checks = 0;
function check(label: string, fn: () => void) {
  fn();
  checks += 1;
  console.log(`  ok  ${label}`);
}

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(full, out);
    } else if (/\.(ts|tsx)$/.test(name)) {
      out.push(full.replace(/\\/g, "/"));
    }
  }
  return out;
}

/** A value import of the aggregator: `import {` or `import X from`, but not `import type`. */
const VALUE_IMPORT = /^import\s+(?!type\b)[^;]*from\s+["'][^"']*\/bibleReaderStudyNotes["'];?/m;

console.log("\nNo screen bundles the whole Bible's notes");

check("no component imports the notes aggregator for its value", () => {
  const offenders = walk("components").filter((file) => VALUE_IMPORT.test(read(file)));
  assert.deepEqual(offenders, []);
});

check("no page does either (API routes run on the server and may)", () => {
  const offenders = walk("app")
    .filter((file) => !file.startsWith("app/api/"))
    .filter((file) => VALUE_IMPORT.test(read(file)));
  assert.deepEqual(offenders, []);
});

check("the Bible in One Year content, which the Plans screen imports, goes through the lazy module", () => {
  for (const file of [
    "lib/bibleYearDaysContent.ts",
    "lib/bibleYearDayOneDeepStudy.ts",
    "lib/bibleYearDayTwoDeepStudy.ts",
    "lib/bibleYearDayFourDeepNotes.ts",
  ]) {
    const source = read(file);
    assert.ok(!VALUE_IMPORT.test(source), `${file} imports the aggregator`);
    assert.ok(source.includes("./bibleReaderStudyNotesLazy"), `${file} does not use the lazy module`);
  }
});

const lazy = read("lib/bibleReaderStudyNotesLazy.ts");

check("the lazy module only reaches the aggregator inside an inline server check", () => {
  // The bundler drops the require from the browser build only when the
  // `typeof window` test is written directly around it.
  const requires = lazy.match(/require\("\.\/bibleReaderStudyNotes"\)/g) || [];
  const guarded =
    lazy.match(/if \(typeof window === "undefined"\) \{\s*\/\/[^\n]*\n\s*const aggregator = require\("\.\/bibleReaderStudyNotes"\)/g) || [];
  assert.ok(requires.length > 0);
  assert.equal(guarded.length, requires.length);
  assert.ok(!/^import\s+(?!type\b)[^;]*bibleReaderStudyNotes["']/m.test(lazy));
});

check("a chapter that did not arrive is not remembered as empty", () => {
  assert.ok(lazy.includes("if (sections === null) {"));
});

check("a day's notes are only looked up by code that reads them", () => {
  const content = read("lib/bibleYearDaysContent.ts");
  assert.ok(content.includes("get studyNotesMarkdown() {"));
  assert.ok(content.includes("get studyNotesSections() {"));
});

console.log("\nA study's address is one hop, and loads nothing on the way");

const study = read("app/devotionals/[id]/page.tsx");

check("reached as a route, the page renders the door and not the study", () => {
  assert.ok(study.includes("if (!props.embedded) return <DevotionalRouteDoor />;"));
});

check("the door goes straight to /plan", () => {
  const door = study.slice(study.indexOf("function DevotionalRouteDoor"), study.indexOf("export default function DevotionalDetailPage"));
  assert.ok(door.includes("router.replace(`/plan?view=bible_studies&study="));
  assert.ok(!door.includes("/dashboard"));
  assert.ok(!door.includes("supabase"));
});

check("the server sends a study's uuid address to /plan as well", () => {
  const config = read("next.config.ts");
  assert.ok(config.includes('source: "/devotionals/:id('));
  assert.ok(config.includes('destination: "/plan?view=bible_studies&study=:id"'));
});

console.log("\nThe study's requests run together, once");

const load = study.slice(study.indexOf("async function loadDevotional()"), study.indexOf("void loadDevotional();"));

check("the devotional, its days and the reader's progress are asked for together", () => {
  const first = load.slice(0, load.indexOf("if (cancelled) return;"));
  assert.ok(first.includes("await Promise.all(["));
  assert.ok(first.includes('.from("devotionals")'));
  assert.ok(first.includes('.from("devotional_days")'));
  assert.ok(first.includes('.from("devotional_progress")'));
});

check("the load waits to know who is signed in, so it runs once", () => {
  assert.ok(study.includes("if (!devotionalId || !authResolved) return;"));
});

check("nothing in the load asks the server who is signed in", () => {
  assert.ok(!load.includes("auth.getUser()"));
});

check("who else started the study never holds the study up", () => {
  assert.ok(load.includes("void loadStarterBuddies(devotionalData.title);"));
  assert.ok(!load.includes("await loadStarterBuddies"));
});

check("the phone's copy is shown before the database answers", () => {
  const effect = study.slice(study.indexOf("const cached = readStudyCache(userId, devotionalId);"), study.indexOf("async function loadStarterBuddies"));
  assert.ok(effect.includes("setDays(cached.days);"));
  assert.ok(effect.includes("setLoading(false);"));
});

check("a failed read keeps the phone's copy instead of leaving the study", () => {
  assert.ok(load.includes("if (cached) return;"));
});

console.log("\nThe sign-in is read from the phone");

check("supabase.auth.getUser() answers from the stored session", () => {
  const client = read("lib/supabaseClient.ts");
  assert.ok(client.includes("supabase.auth.getUser = (async (jwt?: string) => {"));
  assert.ok(client.includes("await supabase.auth.getSession();"));
  assert.ok(client.includes("return getUserFromServer(jwt);"));
});

console.log(`\n${checks} checks passed.\n`);
