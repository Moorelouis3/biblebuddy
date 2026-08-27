import {
  segment,
  type BibleYearAudioRole,
  type BibleYearAudioSegment,
  type BibleYearSceneTone,
} from "./bibleYearAudioCast";

/**
 * Day 1 hand-authors every character line. That does not scale to 365 days, so
 * this splits a verse into narration and quoted speech and casts each quote to
 * a role - reproducing the Day 1 three-beat shape:
 *
 *   narrator("God said.") -> god("Let there be light.") -> narrator("And there was light.")
 *
 * Anything it cannot confidently attribute stays with the narrator, so the
 * failure mode is "sounds like today", never "wrong character speaks".
 */

/**
 * Include the participle forms. Genesis introduces most divine speech with
 * "saying" rather than "said" - "the word of Yahweh came to Abram in a vision,
 * saying" - and omitting it silently drops God's voice from whole chapters.
 *
 * "blessing" and "calling" are deliberately absent: both are common nouns in
 * these chapters ("the blessing", "a calling") and would match false positives.
 */
const SPEECH_VERB =
  "(?:said|saith|saying|answered|answering|replied|spoke|speaking|speaketh|called|cried|crying|commanded|commanding|blessed|asked|asking|told|telling)";

/** Ordered: first match wins, so specific names beat generic ones. */
const SPEAKER_PATTERNS: Array<{ test: RegExp; role: BibleYearAudioRole }> = [
  { test: /\bserpent\b/i, role: "serpent" },
  // The angel speaks for God but is not God, so it has to be tested first:
  // "the angel of Yahweh" contains "Yahweh" and would otherwise cast as God.
  { test: /\bangel\b/i, role: "angel" },
  { test: /\b(?:yahweh|the lord|god)\b/i, role: "god" },
  { test: /\b(?:the woman|eve)\b/i, role: "eve" },
  // Abram/Abraham and Sarai/Sarah are the same people either side of Genesis 17.
  { test: /\babra(?:m|ham)\b/i, role: "abraham" },
  { test: /\bsara(?:i|h)\b/i, role: "sarah" },
  { test: /\bisaac\b/i, role: "isaac" },
  { test: /\brebekah\b/i, role: "rebekah" },
  { test: /\b(?:jacob|israel)\b/i, role: "jacob" },
  { test: /\besau\b/i, role: "esau" },
  { test: /\blaban\b/i, role: "laban" },
  { test: /\brachel\b/i, role: "rachel" },
  { test: /\bleah\b/i, role: "leah" },
  { test: /\bhagar\b/i, role: "hagar" },
  { test: /\bpharaoh\b/i, role: "pharaoh" },
  // Kept last: "the man" is generic and would otherwise swallow named speakers.
  { test: /\b(?:the man|adam)\b/i, role: "adam" },
];

const ROLE_GENDER: Record<BibleYearAudioRole, "male" | "female" | "none"> = {
  narrator: "none",
  god: "male",
  adam: "male",
  serpent: "male",
  eve: "female",
  abraham: "male",
  sarah: "female",
  isaac: "male",
  rebekah: "female",
  jacob: "male",
  esau: "male",
  laban: "male",
  rachel: "female",
  leah: "female",
  hagar: "female",
  angel: "male",
  pharaoh: "male",
};

function roleForSpeaker(subject: string): BibleYearAudioRole | null {
  for (const entry of SPEAKER_PATTERNS) {
    if (entry.test.test(subject)) return entry.role;
  }
  return null;
}

type QuoteSpan = { start: number; end: number };
type QuoteScan = { spans: QuoteSpan[]; openFrom: number | null };

/**
 * Outer-level quoted spans only. A quote inside a quote - the serpent quoting
 * God in Genesis 3:1 - belongs to the outer speaker and must not be split out.
 *
 * `openFrom` is set when the verse opens a quote it never closes. WEB routinely
 * runs one speech across several verses (the serpent in 3:4-5, Eve in 3:2-3),
 * so the caller carries that speaker into the next verse.
 */
function scanQuotes(text: string): QuoteScan {
  const spans: QuoteSpan[] = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "“") {
      if (depth === 0) start = i;
      depth += 1;
    } else if (ch === "”") {
      depth = Math.max(0, depth - 1);
      if (depth === 0 && start >= 0) {
        spans.push({ start, end: i + 1 });
        start = -1;
      }
    } else if (ch === '"') {
      // Straight quotes carry no direction, so treat them as a simple toggle.
      if (depth === 0) {
        depth = 1;
        start = i;
      } else {
        depth = 0;
        if (start >= 0) spans.push({ start, end: i + 1 });
        start = -1;
      }
    }
  }

  return { spans, openFrom: depth > 0 && start >= 0 ? start : null };
}

const CLOSING_QUOTE = /[”"]/;

function stripQuoteMarks(text: string) {
  return text.replace(/^[\s“"]+/, "").replace(/[\s”"]+$/, "").trim();
}

/** Turn a trailing attribution into its own spoken beat: "God said," -> "God said." */
function tidyLeadIn(text: string) {
  const trimmed = text.trim().replace(/[,:;]\s*$/, "");
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

/**
 * Attribution is deliberately conservative: cast only when the speaker is
 * unambiguous, otherwise leave the line with the narrator. An uncast line just
 * sounds like today's audio; a miscast line puts Cain's words in God's voice.
 *
 * Two traps this has to avoid, both found in Genesis 3-4:
 *   "To the woman he said, ..."  - "the woman" is the addressee, not the speaker
 *   "Yahweh said to Cain, ...  He said, ..." - the second speaker is Cain, and
 *   carrying the last named speaker across turns attributes it to God.
 */
function roleFromAttribution(before: string): BibleYearAudioRole | null {
  const clause = new RegExp(`(.*?)\\b(${SPEECH_VERB})\\b(?![\\s\\S]*\\b${SPEECH_VERB}\\b)`, "i").exec(before);
  if (!clause) return null;

  // Drop "to <addressee>" phrases first, so "To the woman he said" cannot read
  // the woman as the speaker, and "Yahweh said to Cain" still resolves to God.
  const head = clause[1].replace(/\bto\s+(?:the\s+)?(?:[\w'’]+\s+){0,2}[\w'’]+/gi, " ");

  // When the clause's own subject is a pronoun, use its gender to filter
  // candidates. "Adam knew his wife... She... named him Seth, saying" would
  // otherwise resolve to Adam simply because his name appears first.
  const lastSentence = head.split(/(?<=[.!?])\s+/).pop() || head;
  const pronounMatches = lastSentence.match(/\b(he|she)\b/gi);
  const pronoun = pronounMatches?.[pronounMatches.length - 1]?.toLowerCase();
  const candidates = pronoun
    ? SPEAKER_PATTERNS.filter((entry) => ROLE_GENDER[entry.role] === (pronoun === "she" ? "female" : "male"))
    : SPEAKER_PATTERNS;

  // The earliest-positioned name wins, not the first pattern in the list -
  // otherwise "The woman said to Yahweh" would come out as God. This also
  // handles subjects that sit well before the verb, as in "the word of Yahweh
  // came to Abram in a vision, saying".
  let role: BibleYearAudioRole | null = null;
  let bestIndex = Number.MAX_SAFE_INTEGER;
  for (const entry of candidates) {
    const match = entry.test.exec(head);
    if (match && match.index < bestIndex) {
      bestIndex = match.index;
      role = entry.role;
    }
  }
  return role;
}

/** Carries a speech that runs past the end of a verse into the next one. */
export type OpenQuote = { role: BibleYearAudioRole | null };

export function createOpenQuote(): OpenQuote {
  return { role: null };
}

export function verseToSegments(
  verseText: string,
  scene: BibleYearSceneTone,
  open: OpenQuote = createOpenQuote(),
  // Low enough to catch short dramatic lines - God calling "Abraham!" in
  // Genesis 22:1 is eight characters and is the point of the scene.
  minimumQuoteLength = 8,
): BibleYearAudioSegment[] {
  const out: BibleYearAudioSegment[] = [];
  let text = verseText;

  // Still inside a speech that began in an earlier verse.
  if (open.role) {
    const closeIndex = text.search(CLOSING_QUOTE);
    if (closeIndex === -1) {
      return [segment(open.role, scene, stripQuoteMarks(text))];
    }
    const continuation = stripQuoteMarks(text.slice(0, closeIndex));
    if (continuation) out.push(segment(open.role, scene, continuation));
    open.role = null;
    text = text.slice(closeIndex + 1);
  }

  const { spans, openFrom } = scanQuotes(text);
  const usable = spans.filter(
    (span) => stripQuoteMarks(text.slice(span.start, span.end)).length >= minimumQuoteLength,
  );

  let cursor = 0;
  for (const span of usable) {
    const before = text.slice(cursor, span.start);
    const quote = stripQuoteMarks(text.slice(span.start, span.end));
    const role = roleFromAttribution(before);

    const leadIn = tidyLeadIn(before);
    if (leadIn) out.push(segment("narrator", scene, leadIn));
    out.push(segment(role || "narrator", scene, quote));
    cursor = span.end;
  }

  if (openFrom !== null && openFrom >= cursor) {
    const before = text.slice(cursor, openFrom);
    const role = roleFromAttribution(before);
    const leadIn = tidyLeadIn(before);
    if (leadIn) out.push(segment("narrator", scene, leadIn));

    const quote = stripQuoteMarks(text.slice(openFrom));
    if (quote) out.push(segment(role || "narrator", scene, quote));
    open.role = role;
    cursor = text.length;
  }

  const tail = text.slice(cursor).trim().replace(/^[,\s]+/, "");
  if (tail) out.push(segment("narrator", scene, tidyLeadIn(tail)));

  if (!out.length) return [segment("narrator", scene, verseText)];
  return out.filter((item) => item.text.trim().length > 0);
}
