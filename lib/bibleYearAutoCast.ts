import {
  BIBLE_YEAR_CAST,
  genderForRole,
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
  // Name only, same reasoning as Adam above: "the woman" gave Eve's voice to
  // every unnamed woman in Scripture - Manoah's wife spent Judges 13 as Eve.
  { test: /\beve\b/i, role: "eve" },
  // Abram/Abraham and Sarai/Sarah are the same people either side of Genesis 17.
  { test: /\babra(?:m|ham)\b/i, role: "abraham" },
  { test: /\bsara(?:i|h)\b/i, role: "sarah" },
  { test: /\bisaac\b/i, role: "isaac" },
  { test: /\brebekah\b/i, role: "rebekah" },
  // Not "israel": from Exodus on it is the nation in nearly every clause,
  // which cast whole chapters of Moses and David as Jacob.
  { test: /\bjacob\b/i, role: "jacob" },
  { test: /\besau\b/i, role: "esau" },
  { test: /\blaban\b/i, role: "laban" },
  { test: /\brachel\b/i, role: "rachel" },
  { test: /\bleah\b/i, role: "leah" },
  { test: /\bhagar\b/i, role: "hagar" },
  { test: /\bpharaoh\b/i, role: "pharaoh" },
  // Kept last: "the man" is generic and would otherwise swallow named speakers.
  // Name only. "the man" used to match here, which was right for Genesis 3 but
  // handed Adam's voice to every anonymous man in Scripture - the one who
  // wrestles Jacob in Genesis 32, the stranger who directs Joseph in Genesis 37.
  // Adam speaks in a single chapter while "the man" recurs throughout, so losing
  // his lines to the narrator costs far less than miscasting everyone else.
  { test: /\badam\b/i, role: "adam" },
];


/**
 * Capitalised words that are not people. Place names are the real risk: the
 * attribution clause has already had "to <addressee>" removed, so what is
 * left is usually the speaker, but a stray place name would otherwise become
 * a character with a voice of its own.
 */
const NOT_A_PERSON = new Set([
  // Sentence starters and function words. Every verse begins with a capital,
  // so without these "Then he said" yields a character called Then.
  // Threshingfloor of Atad (Genesis 50:11) - a place, and the Canaanites are
  // the ones speaking there. "the Kenite" in Numbers 24:21 is who Balaam is
  // looking at, not who is talking. "Beware" is an imperative that only looks
  // like a name because every verse starts with a capital.
  // "which is by the River" (Numbers 22:5) capitalises the Euphrates, so it
  // reads as a name sitting right where a speaker would be.
  "atad", "kenite", "beware", "river",
  // "Please" opening a quoted request reads as a capitalised name. Mount
  // Gerizim gave Jotham's whole parable of the trees to a character called
  // Mount; Jebus, Laish and Zorah are towns in Judges.
  "please", "mount", "gerizim", "jebus", "laish", "zorah",
  "and", "but", "so", "then", "now", "when", "after", "before", "behold",
  "therefore", "moreover", "again", "also", "thus", "yet", "for", "if", "as",
  "at", "on", "in", "it", "he", "she", "they", "them", "their", "there",
  "this", "that", "these", "those", "all", "every", "one", "two", "three",
  "who", "what", "why", "how", "where", "which", "while", "until", "upon",
  "unto", "with", "from", "into", "out", "over", "under", "about", "against",
  "among", "because", "since", "though", "although", "however", "indeed",
  "surely", "truly", "verily", "the", "his", "her", "its", "you", "your",
  "we", "our", "she's", "afterward", "immediately", "meanwhile",

  // Titles and common nouns that are not a specific person.
  // Objects and abstractions. Genesis 9 produced a character called Food
  // and Genesis 26 one called Rehoboth, which is a well.
  "food", "water", "bread", "wine", "well", "wells", "land", "city", "tent",
  "altar", "covenant", "blessing", "birthright", "famine", "dream", "ladder",
  "stone", "oath", "gift", "flock", "sheep", "camels", "cattle", "field",
  "sword", "ark", "rain", "flood", "seed", "name", "day", "night", "morning",

  // More place names, including the ones Genesis coins mid-story. These are
  // the worst offenders, because the verse that names them reads exactly like
  // an attribution: "therefore he called it Mizpah, for he said...".
  "rehoboth", "beersheba", "sitnah", "esek", "luz", "paddan", "mahanaim",
  "peniel", "succoth", "goshen", "ararat", "salem", "machpelah", "ephron",
  "mizpah", "galeed", "jegar", "bethuel", "gilead", "moreh", "bochim",
  "massah", "meribah", "marah", "elim", "rephidim", "kadesh", "ebenezer",

  "baal", "asherah", "molech", "dagon",
  "lord", "god", "yahweh", "spirit", "heaven", "earth", "father", "son",
  "king", "queen", "priest", "prophet", "servant", "man", "woman", "men",
  "women", "people", "children", "sons", "daughters", "brother", "sister",
  "wife", "husband", "angel", "angels", "disciples", "elders", "scribes",
  "pharisees", "sadducees", "crowd", "multitude", "jews", "gentiles",

  // Nations, peoples and places. These sit inside attribution clauses
  // constantly ("the God of Israel said"), and Israel in particular cast
  // whole chapters of Moses and David as a character of its own.
  "israel", "egypt", "canaan", "judah", "samaria", "galilee", "jerusalem",
  "babylon", "assyria", "moab", "edom", "midian", "amalek", "ammon", "syria",
  "bethel", "haran", "sodom", "gomorrah", "jordan", "eden", "babel", "ur",
  "moriah", "gerar", "shechem", "hebron", "seir", "sinai", "horeb", "zion",
  "nazareth", "capernaum", "bethlehem", "jericho", "philistines", "egyptians",
  "israelites", "hebrews", "chaldeans", "romans",
]);

/**
 * A speaker the curated list does not know still gets a role id, so they get
 * their own voice rather than the narrator's. The id is the name itself, so
 * "Moses said" produces "moses" in every episode Moses ever speaks in.
 */
/** Names the cast knows, so a real one ending in -ing is still allowed. */
const CURATED_SPEAKERS = new Set(Object.keys(BIBLE_YEAR_CAST));

function roleFromName(subject: string): BibleYearAudioRole | null {
  const names = subject.match(/\b[A-Z][a-z\u2019'\-]{2,}\b/g);
  if (!names) return null;

  // Earliest name wins, matching the curated path above. Reading backwards from
  // the verb looks right, but the name nearest the verb is usually the object:
  // "When Joseph saw Benjamin with them, he said" is Joseph speaking. Addressees
  // are already stripped by the caller, so the leading name is the subject.
  for (let i = 0; i < names.length; i += 1) {
    const id = names[i].toLowerCase().replace(/[\u2019']/g, "");
    if (NOT_A_PERSON.has(id)) continue;
    // Sentence-initial participles look exactly like names once capitalised:
    // "Laying his hands on him, he said" produced a character called Laying.
    if (id.endsWith("ing") && !CURATED_SPEAKERS.has(id)) continue;
    return id;
  }
  return null;
}

function roleForSpeaker(subject: string): BibleYearAudioRole | null {
  for (const entry of SPEAKER_PATTERNS) {
    if (entry.test.test(subject)) return entry.role;
  }
  return roleFromName(subject);
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
  const head = clause[1]
    // A patronymic identifies a man by his father, who is not in the scene:
    // "Balak sent messengers to Balaam the son of Beor... saying" is Balak, but
    // came out as Beor. Singular only - "the children of Gad... spoke" really is
    // the Gadites talking, and that group voice is worth keeping. This has to
    // run before the addressee strip below, which would eat the word "son".
    .replace(/\b(?:son|daughter)\s+of\s+[\w'’]+/gi, " ")
    .replace(/\bto\s+(?:the\s+)?(?:[\w'’]+\s+){0,2}[\w'’]+/gi, " ")
    // A possessive names whose someone is, never who is talking. "Israel saw
    // Joseph's sons, and said" is Israel speaking, and "When Joseph's brothers
    // saw" is the brothers - both used to come out as Joseph.
    .replace(/\b[\w]+['’]s\b/gi, " ")
    // Naming formulas put the child's or place's name right before the verb:
    // "he called his name Gershom, for he said" is Moses speaking, not Gershom,
    // and "called the firstborn Manasseh, for God has made me forget" is Joseph.
    .replace(/\b(?:call(?:ed|s|ing)?|nam(?:ed|es|ing))\s+(?:the\s+name\s+of\s+)?(?:him|her|it|them|his\s+name|her\s+name|the\s+name|the\s+place|the\s+firstborn|the\s+second)?\s*[\w'’]+/gi, " ")
    // The same formula written the other way round: "the name of the other was
    // Eliezer, for he said" is Moses explaining the name, not Eliezer speaking.
    .replace(/\bthe\s+name\s+of\s+(?:the\s+)?[\w'’]+\s+was\s+[\w'’]+/gi, " ");

  // When the clause's own subject is a pronoun, use its gender to filter
  // candidates. "Adam knew his wife... She... named him Seth, saying" would
  // otherwise resolve to Adam simply because his name appears first.
  const lastSentence = head.split(/(?<=[.!?])\s+/).pop() || head;
  const pronounMatches = lastSentence.match(/\b(he|she)\b/gi);
  const pronoun = pronounMatches?.[pronounMatches.length - 1]?.toLowerCase();
  const candidates = pronoun
    ? SPEAKER_PATTERNS.filter((entry) => genderForRole(entry.role) === (pronoun === "she" ? "female" : "male"))
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
  // Nobody curated matched, so fall back to the name in the clause. This is
  // what lets Moses, David, Saul, Peter and everyone else speak as themselves
  // instead of as the narrator. Curated patterns still win when they match,
  // so God and the angel can never be displaced by a stray proper noun.
  if (!role) {
    const derived = roleFromName(head);
    const wantedGender = pronoun === "she" ? "female" : "male";
    if (derived && (!pronoun || genderForRole(derived) === wantedGender)) role = derived;
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
