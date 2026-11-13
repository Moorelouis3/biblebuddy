/**
 * The feed's Auto Comment: routing, prepared lines and prompt, checked offline.
 *
 *   npm run verify:auto-comment
 *
 * No database, no network and no OpenAI request. It proves the things that
 * would be embarrassing to get wrong in public: a person's own words are
 * never ignored, a prayer request is never cheered, a low trivia score is
 * never called perfect, no line uses a name, and nothing here can publish.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { milestoneSentence } from "../lib/communityMilestones";
import { routeFeedPost, isHardTopic, type AutoCommentDecision, type FeedPostForRouting, type PreparedKind } from "../lib/autoComment/router";
import { normaliseLine, pickPrepared, poolFor } from "../lib/autoComment/prepared";
import {
  AUTO_COMMENT_MAX_OUTPUT_TOKENS,
  AUTO_COMMENT_MODEL,
  autoCommentSystemPrompt,
  autoCommentUserPrompt,
  tidyDraft,
} from "../lib/autoComment/prompt";
import { ESTIMATED_COST_USD, isBillableFeature } from "../lib/openAiBudget";

let passed = 0;
function check(label: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`ok ${label}`);
}

const ME = "owner";
const BRAND = "brand";
const post = (content: string | null, extra: Partial<FeedPostForRouting> = {}): FeedPostForRouting => ({
  user_id: "member",
  post_type: "thought",
  content,
  verse_ref: null,
  verse_text: null,
  ...extra,
});
const route = (p: FeedPostForRouting) => routeFeedPost(p, [ME, BRAND]);
const prepared = (d: AutoCommentDecision) => {
  assert.equal(d.route, "prepared");
  return d as Extract<AutoCommentDecision, { route: "prepared" }>;
};
const ai = (d: AutoCommentDecision) => {
  assert.equal(d.route, "ai");
  return d as Extract<AutoCommentDecision, { route: "ai" }>;
};

check("our own posts and the brand account's get no draft", () => {
  assert.equal(route(post("Anything at all here", { user_id: ME })).route, "none");
  assert.equal(route(post("📖 Verse of the Day - John 3:16", { user_id: BRAND })).route, "none");
});

check("the sentences the app really writes are recognised - generated from the milestone code itself", () => {
  const bioy = milestoneSentence("bible_in_one_year_day_completed", "Bible in One Year Day 204 Completed: Title");
  const study = milestoneSentence("devotional_day_completed", "The Tempting of Jesus - Day 3");
  const studyOther = milestoneSentence("devotional_day_completed", "Day 16 of The Wisdom of Proverbs");
  const book = milestoneSentence("book_completed", "Genesis");
  assert.ok(bioy && study && studyOther && book, "the milestone code still produces all four sentences");

  assert.deepEqual(prepared(route(post(bioy))).fields, { day: 204 });
  assert.equal(prepared(route(post(bioy))).kind, "bioy_day");
  assert.deepEqual(prepared(route(post(study))).fields, { day: 3, title: "The Tempting of Jesus" });
  assert.deepEqual(prepared(route(post(studyOther))).fields, { day: 16, title: "The Wisdom of Proverbs" });
  assert.deepEqual(prepared(route(post(book))).fields, { book: "Genesis" });
  assert.equal(prepared(route(post('✅ Completed Day 4 of a Bible study.'))).kind, "study_day");
});

check("the three Share buttons' untouched text is routine - read from the components", () => {
  const root = path.resolve(__dirname, "..");
  const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
  // If a default is reworded in the component, this check fails rather than the router silently missing it.
  assert.ok(read("components/TriviaGamePlayer.tsx").includes("defaultText={`Got ${correctCount} out of ${questions.length} on ${bookName} ${chapter.chapter} trivia.`}"));
  assert.ok(read("components/FullChapterReader.tsx").includes("defaultText={`Just finished reading ${bookDisplayName} ${chapter}.`}"));
  assert.ok(read("components/VerseOfTheDayBreakdown.tsx").includes("defaultText={`${entry.reference} is my verse today.`}"));

  assert.deepEqual(prepared(route(post("Got 4 out of 5 on 1 Samuel 17 trivia."))).fields, { score: 4, total: 5, book: "1 Samuel", chapter: 17 });
  assert.deepEqual(prepared(route(post("Just finished reading Song of Solomon 2."))).fields, { book: "Song of Solomon", chapter: 2 });
  assert.deepEqual(
    prepared(route(post("Psalm 51:10 is my verse today.", { post_type: "verse", verse_ref: "Psalm 51:10", verse_text: "Create in me a clean heart" }))).fields,
    { reference: "Psalm 51:10" },
  );
});

check("a person's own words are never ignored, even on an activity card", () => {
  // A verse post with their own words: the words go to the model, with the verse as context.
  const verse = ai(route(post("It’s not easy…", { post_type: "verse", verse_ref: "Luke 9:23", verse_text: "If any man will come after me" })));
  assert.equal(verse.text, "It’s not easy…");
  assert.equal(verse.verseRef, "Luke 9:23");
  assert.ok(verse.verseText);

  // A share with a sentence added is no longer a routine share.
  const trivia = ai(route(post("Got 2 out of 5 on Genesis 1 trivia. I really need to slow down when I read.")));
  assert.ok(trivia.text.includes("slow down"));
  assert.equal(ai(route(post("Just finished reading Job 3. This one hit me hard today."))).route, "ai");
  assert.equal(ai(route(post("John 3:16 is my verse today. My mum used to read it to me."))).route, "ai");

  const prompt = autoCommentUserPrompt(verse);
  assert.ok(prompt.includes("It’s not easy…") && prompt.includes("Luke 9:23"));
  assert.equal(prompt.split("It’s not easy…").length - 1, 1, "their words are sent once, not twice");
});

check("prayer and hardship are always careful, and never get a prepared cheer", () => {
  assert.equal(ai(route(post("Pray for a renewed mind for God", { post_type: "prayer_request" }))).careful, true);
  assert.equal(ai(route(post("Lord, stand beside me as I face the unknown.", { post_type: "prayer" }))).careful, true);
  for (const text of [
    "Please pray for my finances & my relationship with my daughter",
    "I was recently terminated from my job after just five months",
    "My dad passed away last night",
    "Got 5 out of 5 on Psalms 23 trivia. Needed that after the diagnosis this week.",
    "Feeling so alone lately",
    "Financial needs to be met.",
    "I need to continue walking by the Spirit, it still gets hard on my flesh and makes me want to smoke cigarettes",
  ]) {
    assert.ok(isHardTopic(text), text);
    assert.equal(ai(route(post(text))).careful, true, text);
  }
  assert.equal(ai(route(post("Most of the time we feel the person that wronged us deserves to be paid back."))).careful, false);
  const careful = autoCommentSystemPrompt(true);
  assert.ok(/Do not congratulate/.test(careful) && /exclamation mark/.test(careful) && /praying/.test(careful));
  assert.equal(tidyDraft('"Praying for you and your daughter!"', true), "Praying for you and your daughter.");
  assert.equal(tidyDraft("Love that point!", false), "Love that point!");
  // An emoji appears in the draft only when the post had one, and never in a careful reply.
  assert.equal(tidyDraft("Glad you think so! 😊", false, "This is really cool"), "Glad you think so!");
  assert.equal(tidyDraft("So good 🙌", false, "Loving this study 🙌"), "So good 🙌");
  assert.equal(tidyDraft("Praying for you 🙏", true, "Please pray 🙏"), "Praying for you");
  // Questions and app problems are steered, not answered with confidence.
  assert.ok(/Never settle a disputed doctrine/.test(autoCommentSystemPrompt(false)));
  assert.ok(/do not guess how the app works/.test(autoCommentSystemPrompt(false)));
});

check("captions too short to understand get a short friendly line, and an empty text post gets nothing", () => {
  assert.equal(prepared(route(post("Bible study…", { post_type: "photo" }))).kind, "short_caption");
  assert.equal(prepared(route(post("", { post_type: "photo" }))).kind, "short_caption");
  assert.equal(prepared(route(post("", { post_type: "verse", verse_ref: "John 1:1", verse_text: "In the beginning" }))).kind, "verse_share");
  assert.equal(route(post("")).route, "none");
  assert.equal(ai(route(post("Thank You God!"))).route, "ai");
});

const KINDS: Array<[PreparedKind, Record<string, unknown>]> = [
  ["bioy_day", { day: 1 }],
  ["bioy_day", { day: 37 }],
  ["bioy_day", { day: 100 }],
  ["bioy_day", { day: 365 }],
  ["study_day", { day: 1, title: "The Beginning of Everything" }],
  ["study_day", { day: 9, title: "The Wisdom of Proverbs" }],
  ["study_day", { day: 9 }],
  ["book_finished", { book: "Ruth" }],
  ["trivia_share", { score: 5, total: 5, book: "Genesis", chapter: 2 }],
  ["trivia_share", { score: 3, total: 5, book: "Genesis", chapter: 2 }],
  ["trivia_share", { score: 1, total: 5, book: "Genesis", chapter: 2 }],
  ["verse_share", { reference: "Psalm 51:10" }],
  ["chapter_share", { book: "John", chapter: 3 }],
  ["short_caption", {}],
];

check("every prepared line: short, filled in, no name, no claimed experience", () => {
  for (const [kind, fields] of KINDS) {
    const pool = poolFor(kind, fields);
    assert.ok(pool.length >= 3, `${kind} has a pool`);
    for (let turn = 0; turn < pool.length; turn += 1) {
      const line = pickPrepared(kind, fields, { seed: "post-1", turn });
      assert.ok(line.length > 3 && line.length <= 90, `${kind}: "${line}" is a short line`);
      assert.ok(!/undefined|NaN|\$\{/.test(line), `${kind}: "${line}" is fully filled in`);
      assert.ok(!/bible buddy user|buddy,|\bI (too|also|remember|went|was|had)\b|\bme too\b/i.test(line), `${kind}: "${line}"`);
      assert.ok(!/memori[sz]ed/i.test(line));
    }
  }
});

check("the reply matches the result: a low score is never called perfect or awesome", () => {
  const low = poolFor("trivia_share", { score: 1, total: 5, book: "Genesis", chapter: 2 }).map((line) =>
    typeof line === "function" ? line({ score: 1, total: 5, book: "Genesis", chapter: 2 }) : line,
  );
  for (const line of low) assert.ok(!/perfect|awesome|great job|well done|nailed|clean sweep|1 out of 5/i.test(line), line);
  const perfect = pickPrepared("trivia_share", { score: 5, total: 5, book: "Genesis", chapter: 2 }, { seed: "x" });
  assert.ok(perfect.length > 0);
  // Day 365 is the finish, not "keep going".
  for (let turn = 0; turn < 3; turn += 1) {
    assert.ok(!/keep going/i.test(pickPrepared("bioy_day", { day: 365 }, { seed: "y", turn })));
  }
});

check("variety: the same post gives the same line, and recently used lines are skipped", () => {
  const fields = { day: 37 };
  const first = pickPrepared("bioy_day", fields, { seed: "post-9" });
  assert.equal(pickPrepared("bioy_day", fields, { seed: "post-9" }), first, "stable for one post");
  const second = pickPrepared("bioy_day", fields, { seed: "post-9", avoid: [first.toUpperCase()] });
  assert.notEqual(normaliseLine(second), normaliseLine(first), "a line just used is not offered again");
  assert.notEqual(pickPrepared("bioy_day", fields, { seed: "post-9", turn: 1 }), first, "asking again moves on");

  // Thirty different posts in a row, each avoiding the last ten: no line twice within ten.
  const said: string[] = [];
  for (let index = 0; index < 30; index += 1) {
    const line = pickPrepared("bioy_day", { day: 20 + index }, { seed: `post-${index}`, avoid: said.slice(-10) });
    const recent = said.slice(-10).map(normaliseLine);
    assert.ok(!recent.includes(normaliseLine(line)), `"${line}" repeated within ten`);
    said.push(line);
  }
  // Everything used: still returns a line rather than nothing.
  const all = poolFor("short_caption", {}).map((line) => (typeof line === "function" ? line({}) : line));
  assert.ok(pickPrepared("short_caption", {}, { seed: "z", avoid: all }).length > 0);
});

check("the prompt: no name is sent, nothing is invented, and long posts are clipped", () => {
  const system = autoCommentSystemPrompt(false);
  assert.ok(/Do not invent anything/.test(system));
  assert.ok(/Do not use their name or any name/.test(system));
  assert.ok(/he will read it, edit it and post it himself/i.test(system));
  const prompt = autoCommentUserPrompt({ text: "word ".repeat(1000), postType: "thought", verseRef: null, verseText: null });
  assert.ok(prompt.length < 1500, "a very long post is clipped");
  assert.ok(!/Bible Buddy User|Comment from/.test(prompt));
  assert.equal(AUTO_COMMENT_MODEL, "gpt-4o-mini");
  assert.ok(AUTO_COMMENT_MAX_OUTPUT_TOKENS <= 150);
});

check("it drafts and never publishes; it is off unless switched on; spend is gated and capped", () => {
  const root = path.resolve(__dirname, "..");
  const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
  const api = read("app/api/feed/auto-comment/route.ts");
  // The only table this route may write to is the events ledger.
  const writes = [...api.matchAll(/\.from\("([a-z_]+)"\)\s*\.(insert|update|upsert|delete)\(/g)].map((m) => m[1]);
  assert.deepEqual([...new Set(writes)], ["landing_page_events"], "the route writes drafts nowhere");
  assert.ok(!api.includes('from("feed_post_comments").insert') && !/feed_post_comments"\)\s*\.insert/.test(api));
  assert.ok(api.includes('(process.env.AUTO_REPLY_DRAFTS || "").toLowerCase() === "on"'));
  assert.ok(api.includes("MAX_AI_DRAFTS_PER_DAY = 50") && api.includes("SAME_POST_COOLDOWN_SECONDS = 60"));
  assert.ok(api.includes('assertOpenAiSpendAllowed(admin, "feed_auto_comment_draft"'));
  assert.ok(api.includes("max_tokens: AUTO_COMMENT_MAX_OUTPUT_TOKENS"));
  assert.ok(isBillableFeature("feed_auto_comment_draft"));
  assert.ok(ESTIMATED_COST_USD.feed_auto_comment_draft <= 0.001);
  // Not on a schedule, and the button still fills the box for a person to post.
  assert.ok(!read("vercel.json").includes("/api/feed/auto-comment"));
  const feed = read("app/bb-feed/page.tsx");
  assert.ok(feed.includes("requestAutoCommentDraft(postId, autoCommentTurn)") && feed.includes("setNewComment(draft.reply)"));
});

console.log(`\n${passed} checks passed`);
