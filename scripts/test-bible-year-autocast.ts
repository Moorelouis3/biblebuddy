import { config } from "dotenv";
import { existsSync } from "fs";
import { fetchChapterVerses } from "../lib/bibleYearScripture";
import { createOpenQuote, verseToSegments } from "../lib/bibleYearAutoCast";
import type { BibleYearAudioRole } from "../lib/bibleYearAudioCast";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

/**
 * Regression suite for automatic speaker casting.
 *
 * Every case here is a bug that actually shipped during the Day 1-10 build.
 * The rule the suite enforces is that a miscast is far worse than a missed
 * cast: leaving a line with the narrator sounds normal, while putting Cain's
 * words in God's voice does not. `forbid` is therefore checked strictly;
 * `expect` allows narrator as a safe fallback unless `strict` is set.
 */

type Case = {
  chapter: number;
  verse: number;
  note: string;
  expect?: BibleYearAudioRole[];
  forbid?: BibleYearAudioRole[];
  strict?: boolean;
};

const CASES: Case[] = [
  {
    chapter: 3, verse: 1, note: "serpent introduced by name, speaks via pronoun",
    expect: ["narrator", "serpent"], strict: true,
  },
  {
    chapter: 3, verse: 13, note: "two speakers in one verse",
    expect: ["narrator", "god", "narrator", "eve"], strict: true,
  },
  {
    chapter: 3, verse: 16, note: "'To the woman he said' - addressee is not the speaker",
    forbid: ["eve"],
  },
  {
    chapter: 4, verse: 9, note: "Cain answers God; must not inherit God's voice",
    expect: ["narrator", "god", "narrator", "narrator"], strict: true,
  },
  {
    chapter: 4, verse: 25, note: "'She ... saying' after Adam is named - gender decides",
    forbid: ["adam", "god"],
  },
  {
    chapter: 15, verse: 1, note: "'the word of Yahweh came to Abram ... saying'",
    expect: ["narrator", "god"], strict: true,
  },
  {
    chapter: 22, verse: 1, note: "short dramatic line - God calling 'Abraham!'",
    forbid: [], expect: ["narrator", "god", "narrator", "narrator"], strict: true,
  },
  {
    chapter: 22, verse: 7, note: "Isaac is unmapped and must stay narrator",
    forbid: ["god", "eve", "serpent", "adam"],
  },
  {
    chapter: 26, verse: 2, note: "'Yahweh appeared to him, and said'",
    expect: ["narrator", "god"], strict: true,
  },
];

async function main() {
  let failures = 0;

  for (const testCase of CASES) {
    const verses = await fetchChapterVerses("genesis", testCase.chapter);
    const verse = verses.find((v) => v.verse === testCase.verse);
    if (!verse) {
      console.log(`FAIL Genesis ${testCase.chapter}:${testCase.verse} - verse not found`);
      failures += 1;
      continue;
    }

    const roles = verseToSegments(verse.text, "eden", createOpenQuote()).map((s) => s.role);
    const label = `Genesis ${testCase.chapter}:${testCase.verse}`.padEnd(16);
    const problems: string[] = [];

    for (const role of testCase.forbid || []) {
      if (roles.includes(role)) problems.push(`must never cast ${role}`);
    }

    if (testCase.expect && testCase.strict && roles.join(">") !== testCase.expect.join(">")) {
      problems.push(`expected [${testCase.expect.join(" > ")}]`);
    }

    if (problems.length) {
      failures += 1;
      console.log(`FAIL ${label} [${roles.join(" > ")}]`);
      for (const problem of problems) console.log(`       ${problem}  (${testCase.note})`);
    } else {
      console.log(`ok   ${label} [${roles.join(" > ")}]`);
    }
  }

  console.log(`\n${CASES.length - failures}/${CASES.length} passed`);
  if (failures) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
