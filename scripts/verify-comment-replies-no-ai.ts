/**
 * Proves the study-comment replier cannot reach a paid AI provider.
 *
 *   npx tsx scripts/verify-comment-replies-no-ai.ts
 *
 * Two ways, because either alone is weak. The static half reads the files and
 * fails on an import or a hostname; the runtime half replaces global fetch
 * with one that throws on any AI host, then pushes real comments through the
 * actual decision path. A regression that reintroduces a model call fails here
 * rather than on the bill.
 */
import fs from "node:fs";
import path from "node:path";
import { classify } from "../lib/commentReplies/classify";
import { selectTemplate } from "../lib/commentReplies/selectTemplate";
import { CATEGORIES, FALLBACK_BY_SOURCE, RULES, TEMPLATES } from "../lib/commentReplies/seed";

let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

// ---------------------------------------------------------------------------
// Static: nothing in the replier may even mention an AI provider
// ---------------------------------------------------------------------------
const WATCHED = [
  "app/api/cron/auto-comment-replies/route.ts",
  "lib/commentReplies/classify.ts",
  "lib/commentReplies/normalise.ts",
  "lib/commentReplies/selectTemplate.ts",
  "lib/commentReplies/seed.ts",
  "lib/commentReplies/sources.ts",
  "lib/commentReplies/store.ts",
  "lib/commentReplies/types.ts",
  // The admin page can create templates, so it is on the list too: a panel
  // that could write a reply with a model would be the same leak by another
  // door.
  "app/api/admin/comment-replies/route.ts",
];

// "openai" appears in the route's own comments explaining why it is gone, so
// the check is for the ways you could actually call one, not for the word.
const BANNED = [
  /from\s+["']openai["']/,
  /require\(\s*["']openai["']\s*\)/,
  /@anthropic-ai/,
  /api\.openai\.com/,
  /api\.anthropic\.com/,
  /generativelanguage\.googleapis\.com/,
  /process\.env\.OPENAI_API_KEY/,
  /process\.env\.ANTHROPIC_API_KEY/,
];

console.log("\nSTATIC");
for (const rel of WATCHED) {
  const file = path.join(process.cwd(), rel);
  if (!fs.existsSync(file)) {
    check(rel, false, "file missing");
    continue;
  }
  const src = fs.readFileSync(file, "utf8");
  const hit = BANNED.find((re) => re.test(src));
  check(rel, !hit, hit ? `matches ${hit}` : "");
}

// ---------------------------------------------------------------------------
// Runtime: make any AI call an immediate failure, then do real work
// ---------------------------------------------------------------------------
console.log("\nRUNTIME");
const AI_HOSTS = ["openai.com", "anthropic.com", "googleapis.com", "cohere.ai", "mistral.ai", "replicate.com"];
const realFetch = globalThis.fetch;
let blocked: string | null = null;

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const target = typeof input === "string" ? input : input instanceof URL ? input.href : (input as Request).url;
  if (AI_HOSTS.some((h) => target.includes(h))) {
    blocked = target;
    throw new Error(`BLOCKED: the replier tried to call ${target}`);
  }
  return realFetch(input as RequestInfo, init);
}) as typeof fetch;

// A spread wide enough to exercise every branch: short reactions, a question,
// grief, a long reflection, spam, emoji and the empty string.
const SAMPLES = [
  "Amen",
  "amen!!! 🙏🙏",
  "God is good",
  "Bible study",
  "Yes",
  "Thank you for this study",
  "Good morning",
  "God bless you",
  "What does propitiation actually mean?",
  "How do I start reading the Bible?",
  "Please pray for me, I am struggling",
  "My mother passed away last month and this chapter hit me hard",
  "I lost my job and I feel like God is far away right now",
  "I disagree, that is not what the text says",
  "Follow me and check my profile for free money",
  "👍",
  "🙏🙏🙏",
  "",
  "   ",
  "Yes, past traumas. For so long I couldn't understand why I wasn't getting over them, and not once did I think of God.",
];

let replied = 0;
let review = 0;
let skipped = 0;
for (const text of SAMPLES) {
  const decision = classify(text, CATEGORIES, RULES);
  if (decision.action === "replied") {
    const t = selectTemplate(TEMPLATES.filter((x) => x.categorySlug === decision.categorySlug), { random: () => 0.5 });
    check(`a reply exists for "${text.slice(0, 28)}"`, Boolean(t));
    replied += 1;
  } else if (decision.action === "review") review += 1;
  else skipped += 1;
}

check("no AI host was contacted", blocked === null, blocked ?? "");
check("something was answered", replied > 0, `${replied} replied`);
check("sensitive samples were not answered", review >= 5, `${review} to review`);

// The specific disasters, named, so a future rule change cannot quietly allow one.
const mustNotReply = [
  "My mother passed away last month and this chapter hit me hard",
  "Please pray for me, I am struggling",
  "I lost my job and I feel like God is far away right now",
  "What does propitiation actually mean?",
  "How do I start reading the Bible?",
  "I disagree, that is not what the text says",
  "Yes, past traumas. For so long I couldn't understand why I wasn't getting over them, and not once did I think of God.",
];
for (const text of mustNotReply) {
  const d = classify(text, CATEGORIES, RULES);
  check(`never auto-answers "${text.slice(0, 34)}..."`, d.action !== "replied", d.action);
}

// Spam and emoji must not even reach Louis's review list.
for (const text of ["Follow me and check my profile for free money", "👍", "🙏🙏🙏"]) {
  const d = classify(text, CATEGORIES, RULES);
  check(`silently skips "${text.slice(0, 24)}"`, d.action === "skipped", d.action);
}

// ---------------------------------------------------------------------------
// With the study-guide fallback on - the mode that actually runs on articles
// ---------------------------------------------------------------------------
// This is the half that matters most. Under a study every commenter gets a
// reply, so the blockers are the only thing standing between a canned line and
// somebody's bereavement. If one of them stops firing, it fails here.
console.log("\nRUNTIME — study-guide fallback");
const FB = FALLBACK_BY_SOURCE.article;

for (const text of mustNotReply) {
  const d = classify(text, CATEGORIES, RULES, FB);
  check(`still never answers "${text.slice(0, 32)}..."`, d.action !== "replied", d.action);
}

// More ways of saying the same awful things, since the fallback means anything
// unrecognised now gets answered rather than skipped.
const alsoMustNotReply = [
  "We buried my father on Saturday and I read this on the train home",
  "My wife has been in hospital since Tuesday and I am scared",
  "I have been struggling with addiction for years and this chapter found me",
  "Going through the hardest time of my life right now",
  "Can someone explain what this verse means",
  "My marriage is falling apart",
  "I feel hopeless most days",
  "She lost her baby last month",
];
for (const text of alsoMustNotReply) {
  const d = classify(text, CATEGORIES, RULES, FB);
  check(`blocked: "${text.slice(0, 40)}..."`, d.action !== "replied", `${d.action} (${d.categorySlug ?? "-"})`);
}

// And the thing the fallback exists for: an ordinary reflection gets answered.
const shouldReply = [
  "Covenant love to me means something carried out, with honour and integrity",
  "My favourite Bible character is Paul because of his determination",
  "As we draw closer to God the things He values become our values",
  "Book of Psalms",
];
for (const text of shouldReply) {
  const d = classify(text, CATEGORIES, RULES, FB);
  const t = d.action === "replied" ? selectTemplate(TEMPLATES.filter((x) => x.categorySlug === d.categorySlug), { random: () => 0.5 }) : null;
  check(`answers the reflection "${text.slice(0, 34)}..."`, d.action === "replied" && Boolean(t), d.action);
}

globalThis.fetch = realFetch;

console.log(`\n${failures === 0 ? "ALL PASS" : `${failures} FAILED`}  —  replied ${replied}, review ${review}, skipped ${skipped}, paid AI calls 0\n`);
process.exit(failures === 0 ? 0 : 1);
