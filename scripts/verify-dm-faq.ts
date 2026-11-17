/**
 * Offline checks for the automatic DM replier (lib/dmFaq/answer.ts,
 * lib/faq.ts, app/api/cron/dm-faq-replies). No database, no network.
 *
 *   npm run verify:dm-faq
 */
import { readFileSync } from "node:fs";
import { FAQ, dmAnswerableFaq } from "../lib/faq";
import {
  DM_REPLY_MAX_CHARS,
  buildFaqReply,
  buildWrittenReply,
  dmSystemPrompt,
  parseDmDecision,
  prefilterDm,
  tidyReply,
} from "../lib/dmFaq/answer";
import { ESTIMATED_COST_USD, isBillableFeature } from "../lib/openAiBudget";

let failures = 0;
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok || !detail ? "" : `  (${detail})`}`);
  if (!ok) failures += 1;
}

// ---- the FAQ list ----
const ids = FAQ.map((entry) => entry.id);
check("FAQ ids are unique", new Set(ids).size === ids.length);
check("FAQ ids are anchor-safe", ids.every((id) => /^[a-z0-9-]+$/.test(id)), ids.join(","));
check("every answerable entry has phrasings", dmAnswerableFaq().every((e) => e.askedAs.length >= 2));
check("translations answer names the free translations", /KJV/.test(FAQ[0].dm || "") && /WEB/.test(FAQ[0].dm || ""));

// ---- prefilter: what never reaches the model ----
const skipped: Array<[string, string]> = [
  ["Problem Report Category: App bug Area: Plan Day Message: I can't open day 3", "problem_report"],
  ["hey", "too_short"],
  ["Thank you Louis. God bless you.", "thanks_or_greeting"],
  ["I don't want to live anymore and I keep thinking about suicide", "crisis_words"],
  ["Please help, I'm not safe at home", "crisis_words"],
];
for (const [text, reason] of skipped) {
  const result = prefilterDm(text);
  check(`prefilter skips (${reason}): ${text.slice(0, 36)}`, !result.ok && result.reason === reason, JSON.stringify(result));
}
const passed = [
  "How do I change the version of the Bible. I like NKJV",
  "Hey Lewis Wowza!!! I can't wait to get started in this Bible Buddy App that you created looks AWESOME! Thanks",
  "Hi Louis I have a friend who is catholic and doesn't understand what he reading so what should I do",
  "Thank you! Is there a way to see what days I missed?",
];
for (const text of passed) check(`prefilter lets through: ${text.slice(0, 40)}`, prefilterDm(text).ok);

// ---- reading the model's decision ----
check("faq: a known id, confident", parseDmDecision('{"action":"faq","faq_id":"translations","faq_confidence":0.93}').kind === "faq");
check("faq: unsure falls to leave", parseDmDecision('{"action":"faq","faq_id":"translations","faq_confidence":0.4}').kind === "leave");
check("faq: an invented id is not sent", parseDmDecision('{"action":"faq","faq_id":"refunds","faq_confidence":0.99}').kind === "leave");
check("faq: a page-only id is not sent", parseDmDecision('{"action":"faq","faq_id":"streak","faq_confidence":0.99}').kind === "leave");
const reply = parseDmDecision('{"action":"reply","faq_id":"none","reply":"So glad you are here, Ann! Start with The Beginning of Everything."}');
check("reply: text comes through", reply.kind === "reply" && reply.text.startsWith("So glad"));
check("reply: empty is left", parseDmDecision('{"action":"reply","reply":"  "}').kind === "leave");
check("reply: too long is left", parseDmDecision(JSON.stringify({ action: "reply", reply: "a".repeat(DM_REPLY_MAX_CHARS + 1) })).kind === "leave");
check("reply: an outside link is left", parseDmDecision('{"action":"reply","reply":"Read this: https://example.com/x"}').kind === "leave");
check("reply: our own link is fine", parseDmDecision('{"action":"reply","reply":"Sign up at https://www.mybiblebuddy.net/android"}').kind === "reply");
check("leave: kept", parseDmDecision('{"action":"leave","why":"prayer request"}').kind === "leave");
check("garbage is left", parseDmDecision("sure thing!").kind === "leave");
check("tidy: strips a sign-off", tidyReply("Glad you're here!\n\n- Louis") === "Glad you're here!");

// ---- what is sent ----
for (const entry of dmAnswerableFaq()) {
  const built = buildFaqReply(entry.id);
  check(`faq reply ${entry.id}: exactly the approved text + a button`, Boolean(built && built.text === entry.dm && built.action));
}
check("no faq reply for a page-only entry", buildFaqReply("streak") === null);
check("written reply is sent as written, nothing added", buildWrittenReply("Hi!").text === "Hi!");
check("prompt tells the model never to say it is automatic", /Never say or hint that the reply is automatic/.test(dmSystemPrompt()));

const prompt = dmSystemPrompt();
check("prompt lists every answerable id", dmAnswerableFaq().every((e) => prompt.includes(`- ${e.id}:`)));
check("prompt sends prayer requests to Louis", /Prayer requests/.test(prompt));
check("prompt forbids word-for-word verses", /Never quote a Bible verse word for word/.test(prompt));

// ---- spending ----
check("dm_auto_reply is a billable feature", isBillableFeature("dm_auto_reply"));
check("dm_auto_reply is estimated at a tenth of a cent or less", ESTIMATED_COST_USD.dm_auto_reply <= 0.001);

// ---- the cron's guard rails, read from the source ----
const route = readFileSync("app/api/cron/dm-faq-replies/route.ts", "utf8");
check("cron refuses without CRON_SECRET", route.includes("if (!secret ||"));
check("cron gates spending", route.includes('assertOpenAiSpendAllowed(admin, "dm_auto_reply"'));
check("cron flags its messages automated", route.includes("{ automated: true }"));
check("cron never marks a message read", !route.includes("read_at:"));
check("cron does not skip messages Louis has opened", !route.includes('.is("read_at", null)'));
check("cron stays out of a thread Louis is talking in", route.includes('"in_conversation_with_louis"'));
check("cron is scheduled", readFileSync("vercel.json", "utf8").includes("/api/cron/dm-faq-replies"));

console.log(failures ? `\n${failures} failed` : "\nall passed");
process.exit(failures ? 1 : 0);
