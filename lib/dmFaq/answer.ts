/**
 * Answering common DMs with the FAQ (Louis, 2026-11-15: "it's about taking my
 * time. I don't need to be answering these questions over and over").
 *
 * THE MODEL NEVER WRITES THE REPLY. It is asked one thing: which entry in
 * lib/faq.ts, if any, is this message asking? The words that go to the person
 * are always that entry's `dm` text, which Louis approved, plus a button to
 * the full answer. A wrong pick can send a true answer to the wrong question;
 * it can never send something untrue. And anything the model is not sure of
 * goes nowhere - Louis sees the message as he always has.
 *
 * Pure functions here; the cron (app/api/cron/dm-faq-replies) does the
 * database and the network. scripts/verify-dm-faq.ts checks this file
 * offline.
 */

import { dmAnswerableFaq, faqEntry, type FaqEntry } from "../faq";

export const DM_FAQ_MODEL = "gpt-4o-mini";
/** Below this the model's pick is ignored. */
export const DM_FAQ_MIN_CONFIDENCE = 0.8;

/** Ends every automatic reply, so nobody mistakes it for Louis typing. */
export const AUTOMATIC_REPLY_FOOTER =
  "(This is an automatic answer to a question I get a lot. If it didn't help, just reply here and I'll read it myself.)";

export type Prefilter = { ok: true; text: string } | { ok: false; reason: string };

const clean = (value: string) => value.replace(/\s+/g, " ").trim();
const words = (value: string) => (value.match(/[A-Za-z0-9’']+/g) || []).length;

/**
 * Messages that never reach the model.
 *
 *   - Problem reports already get the bug tracker's acknowledgement.
 *   - Two words or fewer ("hey", "Thank you") are greetings, not questions.
 *   - Long messages are people talking - testimonies, prayer, life - and an
 *     FAQ answer under one of those would be the worst thing to send.
 *   - Thanks and blessings with no question in them.
 */
export function prefilterDm(raw: string): Prefilter {
  const text = clean(raw);
  if (!text) return { ok: false, reason: "empty" };
  if (/^problem report/i.test(text)) return { ok: false, reason: "problem_report" };
  const count = words(text);
  if (count <= 2) return { ok: false, reason: "too_short" };
  if (count > 90) return { ok: false, reason: "too_long" };
  const thanksOnly =
    /^(thank(s| you)|thx|god bless|bless you|amen|ok(ay)?|got it|you'?re welcome|hello|hi|hey|good (morning|evening|afternoon))\b/i.test(text) &&
    !/\?|how |where |can i|is there|why /i.test(text);
  if (thanksOnly) return { ok: false, reason: "thanks_or_greeting" };
  return { ok: true, text: text.slice(0, 700) };
}

export function classifierSystemPrompt(entries: FaqEntry[] = dmAnswerableFaq()): string {
  const list = entries
    .map((entry) => `- ${entry.id}: ${entry.question} (people write things like: ${entry.askedAs.map((a) => `"${a}"`).join(", ")})`)
    .join("\n");
  return [
    "You sort direct messages sent to Louis, the founder of Bible Buddy, a free Bible study app.",
    "Decide whether the message is mainly asking ONE of these common questions:",
    list,
    "",
    "Rules:",
    "- Pick an id only if answering that question would fully answer what the person wants.",
    "- If the message reports something broken in a specific place, shares a testimony, asks for prayer, asks a Bible question, is personal, or asks several different things, answer none.",
    "- If unsure, answer none.",
    'Reply with JSON only: {"faq_id": "<one id from the list, or none>", "confidence": <0 to 1>}',
  ].join("\n");
}

export type Classification = { faqId: string | null; confidence: number };

/** Reads the model's JSON. Anything malformed, unknown or not answerable is "none". */
export function parseClassification(raw: string, entries: FaqEntry[] = dmAnswerableFaq()): Classification {
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(match ? match[0] : raw) as { faq_id?: unknown; confidence?: unknown };
    const id = typeof parsed.faq_id === "string" ? parsed.faq_id.trim() : "";
    const confidence = typeof parsed.confidence === "number" ? Math.max(0, Math.min(1, parsed.confidence)) : 0;
    if (!id || id === "none" || !entries.some((entry) => entry.id === id)) return { faqId: null, confidence };
    return { faqId: id, confidence };
  } catch {
    return { faqId: null, confidence: 0 };
  }
}

export type DmReply = { text: string; action: { label: string; href: string } };

/** The message that is sent: the approved answer, the footer, and a button. */
export function buildDmReply(faqId: string): DmReply | null {
  const entry = faqEntry(faqId);
  if (!entry || !entry.dm) return null;
  return {
    text: `${entry.dm}\n\n${AUTOMATIC_REPLY_FOOTER}`,
    action: entry.dmAction ?? { label: "Read the full answer", href: `/faq#${entry.id}` },
  };
}
