/**
 * Answering Louis's DMs automatically.
 *
 * 2026-11-15, first version: FAQ only. The model picked which entry in
 * lib/faq.ts a DM was asking, and the approved FAQ text was sent. It worked
 * and answered almost nothing: of the first three DMs after it went live,
 * none was an FAQ question.
 *
 * 2026-11-17, Louis: "i told you i wanted my dms to be automatically answered
 * and nothing is happening!!! i even said u can use AI". So now one model call
 * decides one of three things:
 *
 *   faq    the DM is one of the common questions -> the approved FAQ text is
 *          sent, word for word, with a button to the full answer. The model's
 *          own words are not used here.
 *   reply  anything else a short, kind, accurate reply can handle -> the
 *          model writes the reply, in Louis's voice, from the facts below.
 *   leave  it needs Louis himself -> nothing is sent; he sees it as always.
 *
 * Every automatic message ends with AUTOMATIC_REPLY_FOOTER, so nobody thinks
 * Louis typed it.
 *
 * The voice is Louis's approved one (Notion, "Bible Insights Writing Kit",
 * 4 Nov 2026): it should feel like Louis sent a DM to one person. Plain
 * words, short paragraphs, warm, no lecture.
 *
 * Pure functions here; app/api/cron/dm-faq-replies does the database and the
 * network. scripts/verify-dm-faq.ts checks this file offline.
 */

import { APP_STORE_URL, dmAnswerableFaq, faqEntry, type FaqEntry } from "../faq";

export const DM_REPLY_MODEL = "gpt-4o-mini";
/**
 * Below this the model's FAQ pick is ignored and it falls to reply or leave.
 * 0.6, not higher: the FAQ text is approved and true whichever question it
 * lands on, and at 0.8 "I like NKJV, how do I change the version" was left
 * unanswered in the trial on 17 Nov.
 */
export const DM_FAQ_MIN_CONFIDENCE = 0.6;
/** A written reply longer than this is not sent. */
export const DM_REPLY_MAX_CHARS = 900;

/** Ends every automatic reply, so nobody mistakes it for Louis typing. */
export const AUTOMATIC_REPLY_FOOTER =
  "(This is an automatic reply from Bible Buddy. If it didn't help, just reply here and I'll read it myself.)";

export type Prefilter = { ok: true; text: string } | { ok: false; reason: string };

const clean = (value: string) => value.replace(/\s+/g, " ").trim();
const words = (value: string) => (value.match(/[A-Za-z0-9’']+/g) || []).length;

/**
 * Anything that sounds like a person in danger is never answered by a machine.
 * Deliberately broad: a false positive only means Louis answers it himself.
 */
const CRISIS =
  /\b(suicid|kill (myself|me)|end (my|it all)|want to die|wanna die|self[- ]?harm|cutting myself|hurt myself|overdos|abus(e|ed|ing)|rape|assault|domestic violence|in danger|not safe)/i;

/**
 * Messages that never reach the model.
 *
 *   - Problem reports already get the bug tracker's acknowledgement.
 *   - Two words or fewer ("hey", "hi") give a reply nothing to work with.
 *   - A short thank-you or greeting with no question in it needs no answer.
 *   - Crisis words: Louis answers those himself, always.
 */
export function prefilterDm(raw: string): Prefilter {
  const text = clean(raw);
  if (!text) return { ok: false, reason: "empty" };
  if (/^problem report/i.test(text)) return { ok: false, reason: "problem_report" };
  if (CRISIS.test(text)) return { ok: false, reason: "crisis_words" };
  const count = words(text);
  if (count <= 2) return { ok: false, reason: "too_short" };
  const hasQuestion = /\?|\bhow\b|\bwhere\b|\bcan i\b|\bis there\b|\bwhy\b|\bwhat\b|\bwhen\b/i.test(text);
  const thanksOrHello =
    /^(thank(s| you)|thx|god bless|bless you|amen|ok(ay)?|got it|you'?re welcome|hello|hi|hey|good (morning|evening|afternoon|night))\b/i.test(text);
  if (thanksOrHello && !hasQuestion && count <= 8) return { ok: false, reason: "thanks_or_greeting" };
  return { ok: true, text: text.slice(0, 1500) };
}

/** What the model may say about Bible Buddy. Nothing outside this is a fact. */
const FACTS = [
  "Bible Buddy is a free Bible study app made by Louis Moore III, a Bible teacher. Everything is free. There is no paid plan.",
  "Bible tab: the whole Bible in KJV, WEB and ASV. Every chapter has study notes: tap a highlighted phrase to see what it means. Chapters can be listened to, and each chapter has trivia.",
  "Library tab: guided studies with a short lesson each day. Among them: The Beginning of Everything (Genesis 1-8, 21 days), The Obedience of Abraham (Genesis 9-25, 30 days, running as a group study from 1 December), The Wisdom of Proverbs, The Tempting of Jesus, 21 Women of the Bible, The Disciples of Jesus, The Heart of David, The Calling of Moses, The Faith of Job, The Transforming of Paul, and Higher Hope (60 days, for people fighting addiction). Also Bible in One Year, a 365-day plan.",
  "A good place for a beginner to start is The Beginning of Everything, or a gospel such as Mark or John in the Bible tab with the study notes open.",
  "Lil Louis tab: an AI Bible helper you can ask questions while you read.",
  "Feed tab: the Bible Buddy community, where people share what they are learning.",
  `iPhone: Bible Buddy is in the App Store (${APP_STORE_URL}). Android: still in testing; sign up at mybiblebuddy.net/android.`,
  "Something broken in the app: the Report a Problem card at the bottom of every page sends it straight into Louis's bug tracker, and the person gets a message when it is fixed.",
];

export function dmSystemPrompt(entries: FaqEntry[] = dmAnswerableFaq()): string {
  const faqList = entries
    .map((entry) => `- ${entry.id}: ${entry.question} (people write things like: ${entry.askedAs.map((a) => `"${a}"`).join(", ")})`)
    .join("\n");
  return [
    "You answer direct messages sent to Louis, the founder of Bible Buddy, a free Bible study app. You write AS Louis, in first person.",
    "",
    "FACTS YOU MAY USE (nothing else about the app is true unless it is here):",
    ...FACTS.map((fact) => `- ${fact}`),
    "",
    "COMMON QUESTIONS that have an approved answer:",
    faqList,
    "",
    "DECIDE ONE:",
    '1. "faq": the message is mainly one of the common questions above. Give its id.',
    '2. "reply": you can help with a short, kind, accurate reply. Welcomes and "can\'t wait to start" messages, where to start, how to use the app, simple Bible questions, how to help a friend read the Bible, feedback and ideas (thank them warmly; do not promise it will be built), something broken (point them to the Report a Problem card).',
    '3. "leave": it needs Louis himself. Prayer requests, grief, anything heavy or deeply personal, anything about money, payments, partnerships or press, requests about their account or data, a message continuing a personal conversation, or anything you are unsure of.',
    "",
    "HOW LOUIS WRITES A DM:",
    "- Like a DM to one person. Warm, plain words, contractions, short paragraphs. Use their first name if given.",
    "- 40 to 110 words. No headings, no lists, no hashtags, no emoji.",
    "- No stock customer-service phrases: never \"feel free to\", \"great question\", \"I appreciate your patience\", \"happy to help\", \"Hi there\". Talk like a friend who teaches the Bible.",
    "- For something broken, say the Report a Problem card puts it straight into the bug tracker; do not promise when it will be fixed.",
    "- Answer what they asked first. For a Bible question give a short, clear, mainstream Christian answer and point them to the chapter's study notes in the Bible tab or to Lil Louis for more.",
    "- Never quote a Bible verse word for word. Name the reference instead (e.g. John 3:16).",
    "- Never invent features, dates, prices or links. Never promise that Louis will do something later. Never say you are praying. Never ask them for personal information.",
    "- Do not sign off with your name and do not add a disclaimer; one is added automatically.",
    "",
    'Reply with JSON only: {"action": "faq" | "reply" | "leave", "faq_id": "<id or none>", "faq_confidence": <0 to 1>, "reply": "<the message, only when action is reply>", "why": "<a few words>"}',
  ].join("\n");
}

export function dmUserPrompt(firstName: string | null, text: string): string {
  return `${firstName ? `From: ${firstName}\n` : ""}Message:\n${text}`;
}

export type DmDecision =
  | { kind: "faq"; faqId: string; confidence: number }
  | { kind: "reply"; text: string }
  | { kind: "leave"; reason: string };

/**
 * Reads the model's JSON. Anything malformed, unknown, too long or carrying a
 * link that is not ours becomes "leave": the safe failure is that Louis
 * answers it himself.
 */
export function parseDmDecision(raw: string, entries: FaqEntry[] = dmAnswerableFaq()): DmDecision {
  let parsed: { action?: unknown; faq_id?: unknown; faq_confidence?: unknown; reply?: unknown; why?: unknown };
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(match ? match[0] : raw);
  } catch {
    return { kind: "leave", reason: "unreadable" };
  }
  const action = typeof parsed.action === "string" ? parsed.action.trim() : "";
  const faqId = typeof parsed.faq_id === "string" ? parsed.faq_id.trim() : "";
  const confidence = typeof parsed.faq_confidence === "number" ? Math.max(0, Math.min(1, parsed.faq_confidence)) : 0;
  const why = typeof parsed.why === "string" ? parsed.why.slice(0, 80) : "";

  if (action === "faq" || (faqId && faqId !== "none")) {
    if (entries.some((entry) => entry.id === faqId) && confidence >= DM_FAQ_MIN_CONFIDENCE) {
      return { kind: "faq", faqId, confidence };
    }
    if (action === "faq") return { kind: "leave", reason: "faq_unsure" };
  }

  if (action === "reply") {
    const text = tidyReply(typeof parsed.reply === "string" ? parsed.reply : "");
    if (!text) return { kind: "leave", reason: "empty_reply" };
    if (text.length > DM_REPLY_MAX_CHARS) return { kind: "leave", reason: "reply_too_long" };
    const links = text.match(/https?:\/\/[^\s)]+/gi) || [];
    if (links.some((link) => !/^https?:\/\/(www\.)?mybiblebuddy\.net|^https:\/\/apps\.apple\.com\//i.test(link))) {
      return { kind: "leave", reason: "outside_link" };
    }
    return { kind: "reply", text };
  }

  return { kind: "leave", reason: why || "model_left_it" };
}

/** Strips what the prompt asked the model not to add, if it added it anyway. */
export function tidyReply(raw: string): string {
  return raw
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\n*[-–—]?\s*(Louis|Louis Moore( III)?|Blessings,?\s*Louis)\s*$/i, "")
    .replace(/\(?this is an automatic[^)]*\)?\s*$/i, "")
    .trim();
}

export type DmReply = { text: string; action: { label: string; href: string } | null };

/** The FAQ answer as sent: the approved text, the footer, and a button. */
export function buildFaqReply(faqId: string): DmReply | null {
  const entry = faqEntry(faqId);
  if (!entry || !entry.dm) return null;
  return {
    text: `${entry.dm}\n\n${AUTOMATIC_REPLY_FOOTER}`,
    action: entry.dmAction ?? { label: "Read the full answer", href: `/faq#${entry.id}` },
  };
}

/** A written reply as sent: the model's words and the footer. */
export function buildWrittenReply(text: string): DmReply {
  return { text: `${text}\n\n${AUTOMATIC_REPLY_FOOTER}`, action: null };
}
