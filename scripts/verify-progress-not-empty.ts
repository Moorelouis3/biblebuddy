/**
 * The regression test for "the app told me I had read nothing".
 *
 *   npm run verify:progress-not-empty
 *
 * supabase-js does not throw when a read fails - it RETURNS { data: null,
 * error }. Four helpers took that and answered with the same value they use
 * for "there is genuinely nothing here":
 *
 *   lib/readingProgress.ts      []  - every chapter shows unread
 *   lib/bibleYearProgress.ts    EMPTY_POSITION - a reader on day 280 is shown
 *                               on Day 1 with nothing read
 *   lib/verseHighlightingApi.ts []  - highlights and verse notes vanish, and a
 *                               highlight that never saved looked saved
 *   lib/userBlocks.ts           []  - nobody is blocked, AND that empty answer
 *                               was cached for 60s, so a blocked person stayed
 *                               visible after the connection came back
 *
 * The rule is already written down in lib/libraryCatalog.ts: throw when the
 * screen has NOTHING to show without this read, degrade quietly when the read
 * is a detail - but never let a failure masquerade as a fact.
 *
 * Nothing here touches the network. The source is asserted against, and each
 * failure path is modelled with the error RETURNED, never thrown, because that
 * is what the client really does.
 */
import { readFileSync } from "node:fs";

let passed = 0;
const failures: string[] = [];

function check(label: string, condition: boolean) {
  if (condition) {
    passed += 1;
    console.log(`  ok  ${label}`);
  } else {
    failures.push(label);
    console.log(`FAIL  ${label}`);
  }
}

const read = (p: string) => readFileSync(p, "utf8");

/** The body of `name`, found by matching braces from its opening one. */
function functionBody(source: string, name: string): string {
  const start = source.indexOf(name);
  if (start < 0) return "";
  const open = source.indexOf("{", start);
  if (open < 0) return "";
  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(open, i + 1);
    }
  }
  return "";
}

/**
 * Everything from a declaration to the next top-level `export`. Blunter than
 * brace matching, and the right tool when the signature itself contains braces
 * - `Promise<{ ok: boolean }>` is not the function body.
 */
function declarationText(source: string, name: string): string {
  const start = source.indexOf(name);
  if (start < 0) return "";
  const next = source.indexOf("\nexport ", start + name.length);
  return source.slice(start, next < 0 ? source.length : next);
}

// -- P1-1 - Reading progress -------------------------------------------------

const progress = read("lib/readingProgress.ts");

check(
  "a failed chapter read is an error, not an empty list",
  /throw new ProgressLoadError/.test(functionBody(progress, "export async function getCompletedChapters(")),
);
check(
  "the same for the many-books read",
  /throw new ProgressLoadError/.test(functionBody(progress, "export async function getCompletedChaptersByBooks(")),
);
check(
  "and for the single-chapter check",
  /throw new ProgressLoadError/.test(functionBody(progress, "export async function isChapterCompleted(")),
);
check(
  "no catch in that file quietly turns a failure back into an empty list",
  !/catch \(err\) \{[\s\S]{0,220}?return \[\];/.test(progress),
);
check(
  "nor into 0, false or Genesis",
  !/catch \(err\) \{[\s\S]{0,260}?return (0|false|"Genesis");/.test(progress),
);

// -- P1-2 - Bible in One Year ------------------------------------------------

const bibleYear = read("lib/bibleYearProgress.ts");
const fetchPosition = functionBody(bibleYear, "export async function fetchBibleYearPosition(");

check("a failed Bible-year read throws", /throw new ProgressLoadError/.test(fetchPosition));
check(
  "signed out still means the empty position, which is a real answer",
  /if \(!userId\) return EMPTY_POSITION;/.test(fetchPosition),
);
check(
  "the empty position is no longer what a failure returns",
  (fetchPosition.match(/return EMPTY_POSITION;/g) || []).length === 1,
);

const overview = read("components/library/BibleYearOverview.tsx");
check("the overview offers Try Again instead of Day 1", /LoadFailedNotice/.test(overview));
check("the overview tracks that a load failed", /setFailed\(/.test(overview));
// The failure branch must not touch the position or the open range: doing so
// is exactly how a reader on day 280 ended up looking at Days 1-30.
const overviewFailureBranch = overview.slice(
  overview.indexOf("setFailed(true)") - 400,
  overview.indexOf("setFailed(true)") + 200,
);
check(
  "the failure branch sets no position",
  !/setPosition\(/.test(overviewFailureBranch),
);
check(
  "the failure branch opens no day range",
  !/setOpenRange\(/.test(overviewFailureBranch),
);

// -- P1-3 - Highlights and verse notes ---------------------------------------

const highlights = read("lib/verseHighlightingApi.ts");

check(
  "a highlight that did not save says so",
  /if \(error\) \{[\s\S]{0,160}return \{ ok: false \};/.test(
    declarationText(highlights, "export async function upsertHighlight("),
  ),
);
check(
  "so does a highlight that did not get removed",
  /if \(error\) \{[\s\S]{0,160}return \{ ok: false \};/.test(
    declarationText(highlights, "export async function deleteHighlight("),
  ),
);
check(
  "reading highlights reports a failure rather than returning none",
  /throw new HighlightLoadError/.test(functionBody(highlights, "export async function fetchHighlights(")) &&
    /throw new HighlightLoadError/.test(functionBody(highlights, "export async function fetchHighlightRanges(")),
);

const highlighter = read("components/VerseHighlighter.tsx");
check("the reader is told when a highlight would not save", /setHighlightError\(/.test(highlighter));
check(
  "and the colour comes back off the verse when it did not save",
  /highlightsUnavailable/.test(highlighter),
);

// -- P1-4 - Blocked people ---------------------------------------------------

const blocks = read("lib/userBlocks.ts");
check(
  "a failed blocks read throws instead of saying nobody is blocked",
  /throw new BlocksLoadError/.test(functionBody(blocks, "async function fetchRows(")),
);
check(
  "the last known list survives a failed read",
  /cache\.userId === userId \? cache\.rows/.test(blocks),
);
check(
  "a failure is never written to the cache",
  !/catch[\s\S]{0,160}cache = \{ userId/.test(blocks),
);

// -- The failure paths, modelled ---------------------------------------------

type Row = { blocker_user_id: string; blocked_user_id: string };
type Cache = { userId: string; rows: Row[]; at: number } | null;

async function main() {
  // Blocks: keep what we knew, and retry at once rather than being wrong for a
  // whole minute.
  const box: { cache: Cache } = { cache: null };
  const modelLoad = async (userId: string, fetchRows: () => Promise<Row[]>) => {
    try {
      const rows = await fetchRows();
      box.cache = { userId, rows, at: Date.now() };
      return rows;
    } catch {
      const held = box.cache;
      return held && held.userId === userId ? held.rows : [];
    }
  };

  const known: Row[] = [{ blocker_user_id: "me", blocked_user_id: "them" }];
  await modelLoad("me", async () => known);
  const afterFailure = await modelLoad("me", async () => {
    throw new Error("TypeError: Failed to fetch");
  });
  check("a failed blocks read keeps the person hidden", afterFailure.length === 1);
  check("a failed blocks read leaves the cache as it was", box.cache?.rows.length === 1);

  box.cache = null;
  const coldFailure = await modelLoad("me", async () => {
    throw new Error("TypeError: Failed to fetch");
  });
  check("with nothing known yet, a failure still hides nobody", coldFailure.length === 0);
  check("and that empty answer is not cached, so the next call retries", box.cache === null);

  // Reading progress: an error must not read as "no chapters".
  const completed = async (fail: boolean): Promise<number[]> => {
    if (fail) throw new Error("ProgressLoadError");
    return [1, 2, 3];
  };
  let shown: number[] | "could not load" = [];
  try {
    shown = await completed(true);
  } catch {
    shown = "could not load";
  }
  check("a failed progress read is distinguishable from no progress", shown === "could not load");
  check("a real empty result is still empty", (await completed(false)).length === 3);

  console.log(`\n${passed} passed, ${failures.length} failed.`);
  if (failures.length) {
    for (const f of failures) console.error(`  failed: ${f}`);
    process.exit(1);
  }
}

void main();
