/**
 * Offline checks for the FAQ DM replier (lib/dmFaq/answer.ts, lib/faq.ts,
 * app/api/cron/dm-faq-replies). No database, no network.
 *
 *   npm run verify:dm-faq
 */
import { readFileSync } from "node:fs";
import { FAQ, dmAnswerableFaq } from "../lib/faq";
import {
  AUTOMATIC_REPLY_FOOTER,
  buildDmReply,
  classifierSystemPrompt,
  parseClassification,
  prefilterDm,
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
check("every answerable entry has phrasings for the classifier", dmAnswerableFaq().every((e) => e.askedAs.length >= 2));
check("translations answer names the free translations", /KJV/.test(FAQ[0].dm || "") && /WEB/.test(FAQ[0].dm || ""));
check("no answer promises a translation we do not have", FAQ.every((e) => !/switch to (the )?(NIV|ESV|NKJV|NLT)/i.test(e.answer.join(" ") + (e.dm || ""))));

// ---- prefilter: what never reaches the model ----
const skipped: Array<[string, string]> = [
  ["Problem Report Category: App bug Area: Plan Day Message: I can't open day 3", "problem_report"],
  ["hey", "too_short"],
  ["Thank you Louis for your response. God bless you.", "thanks_or_greeting"],
  ["Good morning", "too_short"],
  ["word ".repeat(120), "too_long"],
];
for (const [text, reason] of skipped) {
  const result = prefilterDm(text);
  check(`prefilter skips: ${text.slice(0, 40).trim()}`, !result.ok && result.reason === reason, JSON.stringify(result));
}
const passed = [
  "How do I change the version of the Bible. I like NKJV",
  "Good morning Louis. I'm having trouble finding the app in PlayStore. Can you assist?",
  "Is there an app to download?",
  "Thank you! Is there a way to see what days I missed?",
];
for (const text of passed) {
  check(`prefilter lets through: ${text.slice(0, 40)}`, prefilterDm(text).ok);
}

// ---- the model's answer is only ever a pick ----
check("parse: a known id", parseClassification('{"faq_id":"translations","confidence":0.93}').faqId === "translations");
check("parse: none", parseClassification('{"faq_id":"none","confidence":0.9}').faqId === null);
check("parse: an invented id is none", parseClassification('{"faq_id":"refunds","confidence":0.99}').faqId === null);
check("parse: a page-only id is none", parseClassification('{"faq_id":"streak","confidence":0.99}').faqId === null);
check("parse: garbage is none", parseClassification("sure! translations").faqId === null);
check("parse: confidence is clamped", parseClassification('{"faq_id":"translations","confidence":7}').confidence === 1);

// ---- what is sent ----
for (const entry of dmAnswerableFaq()) {
  const reply = buildDmReply(entry.id);
  check(`reply for ${entry.id} is the approved text`, Boolean(reply && reply.text.startsWith(entry.dm!)));
  check(`reply for ${entry.id} says it is automatic`, Boolean(reply && reply.text.endsWith(AUTOMATIC_REPLY_FOOTER)));
  check(`reply for ${entry.id} has a button`, Boolean(reply && reply.action.href && reply.action.label));
}
check("no reply for a page-only entry", buildDmReply("streak") === null);

const prompt = classifierSystemPrompt();
check("prompt lists every answerable id", dmAnswerableFaq().every((e) => prompt.includes(`- ${e.id}:`)));
check("prompt leaves out page-only ids", !prompt.includes("- streak:"));

// ---- spending ----
check("dm_faq_classify is a billable feature", isBillableFeature("dm_faq_classify"));
check("dm_faq_classify is estimated under a tenth of a cent", ESTIMATED_COST_USD.dm_faq_classify <= 0.001);

// ---- the cron's guard rails, read from the source ----
const route = readFileSync("app/api/cron/dm-faq-replies/route.ts", "utf8");
check("cron refuses without CRON_SECRET", route.includes("if (!secret ||"));
check("cron gates spending", route.includes('assertOpenAiSpendAllowed(admin, "dm_faq_classify"'));
check("cron never writes model text: it sends buildDmReply", route.includes("buildDmReply(faqId)") && !/sendDirectMessage\([^)]*completion/.test(route));
check("cron flags its messages automated", route.includes("{ automated: true }"));
check("cron never marks a message read", !route.includes("read_at:"));
check("cron stays out of a thread Louis is talking in", route.includes('"in_conversation_with_louis"'));
check("cron is scheduled", readFileSync("vercel.json", "utf8").includes("/api/cron/dm-faq-replies"));

console.log(failures ? `\n${failures} failed` : "\nall passed");
process.exit(failures ? 1 : 0);
