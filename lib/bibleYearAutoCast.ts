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

const SPEECH_VERB = "(?:said|saith|answered|replied|spoke|speaketh|called|cried|commanded|blessed|asked|told)";

/** Ordered: first match wins, so specific names beat generic ones. */
const SPEAKER_PATTERNS: Array<{ test: RegExp; role: BibleYearAudioRole }> = [
  { test: /\bserpent\b/i, role: "serpent" },
  { test: /\b(?:yahweh|the lord|god)\b/i, role: "god" },
  { test: /\b(?:the woman|eve)\b/i, role: "eve" },
  { test: /\b(?:the man|adam)\b/i, role: "adam" },
];

const PRONOUN = /^(?:he|she|they|it)$/i;

function roleForSpeaker(subject: string): BibleYearAudioRole | null {
  for (const entry of SPEAKER_PATTERNS) {
    if (entry.test.test(subject)) return entry.role;
  }
  return null;
}

type QuoteSpan = { start: number; end: number };

/**
 * Outer-level quoted spans only. A quote inside a quote - the serpent quoting
 * God in Genesis 3:1 - belongs to the outer speaker and must not be split out.
 */
function findQuoteSpans(text: string): QuoteSpan[] {
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
  return spans;
}

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

  const head = clause[1];
  // Words immediately before the speech verb are the grammatical subject.
  const tail = head.trim().split(/\s+/).slice(-4).join(" ");
  const lastWord = tail.split(/\s+/).pop() || "";

  if (!PRONOUN.test(lastWord)) {
    // Strip any "to <addressee>" phrase so it cannot be read as the speaker.
    const subject = tail.replace(/\bto\s+[\w'’ ]+$/i, "").trim();
    return roleForSpeaker(subject || tail);
  }

  // Pronoun: resolve only against names introduced earlier in this same verse,
  // ignoring anything that appears as an addressee.
  const antecedentText = head.replace(/\bto\s+(?:the\s+)?[\w'’]+/gi, " ");
  let firstRole: BibleYearAudioRole | null = null;
  let firstIndex = Number.MAX_SAFE_INTEGER;
  for (const entry of SPEAKER_PATTERNS) {
    const match = entry.test.exec(antecedentText);
    if (match && match.index < firstIndex) {
      firstIndex = match.index;
      firstRole = entry.role;
    }
  }
  return firstRole;
}

export function verseToSegments(
  verseText: string,
  scene: BibleYearSceneTone,
  minimumQuoteLength = 18,
): BibleYearAudioSegment[] {
  const spans = findQuoteSpans(verseText).filter(
    (span) => stripQuoteMarks(verseText.slice(span.start, span.end)).length >= minimumQuoteLength,
  );

  if (!spans.length) return [segment("narrator", scene, verseText)];

  const out: BibleYearAudioSegment[] = [];
  let cursor = 0;

  for (const span of spans) {
    const before = verseText.slice(cursor, span.start);
    const quote = stripQuoteMarks(verseText.slice(span.start, span.end));
    const role = roleFromAttribution(before);

    const leadIn = tidyLeadIn(before);
    if (leadIn) out.push(segment("narrator", scene, leadIn));
    out.push(segment(role || "narrator", scene, quote));

    cursor = span.end;
  }

  const tail = verseText.slice(cursor).trim().replace(/^[,\s]+/, "");
  if (tail) out.push(segment("narrator", scene, tidyLeadIn(tail)));

  return out.filter((item) => item.text.trim().length > 0);
}
