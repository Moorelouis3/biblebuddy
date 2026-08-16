/**
 * Genesis 1 Study Mode - prototype only.
 *
 * The existing study notes are stored per verse RANGE (Genesis 1:1-5) with the
 * phrase notes as free text inside them. Nothing in that data says which verse
 * a phrase belongs to, and the phrase titles do not match the KJV wording
 * ("Formless And Empty" vs "without form, and void"), so the phrases cannot be
 * matched to verses automatically.
 *
 * This file supplies the missing link for Genesis 1 and nothing else:
 *   - which verse each phrase sits under
 *   - the exact KJV words to draw the dotted underline beneath
 *   - a one-line preview shown without tapping
 *
 * The full note text is NOT duplicated here. It is read from the existing
 * notes at render time, so Louis's writing stays the single source of truth.
 *
 * Nothing outside Genesis 1 reads this file.
 */

export type GenesisOnePhrase = {
  /** Verse this phrase belongs under. */
  verse: number;
  /** Phrase title as written in the existing notes, used to find the full note. */
  noteTitle: string;
  /** Exact KJV text in that verse to underline. Must match the verse exactly. */
  underline: string;
  /** One or two sentences, visible without tapping. */
  preview: string;
};

/** Pastel colours, rotated in order. Underline and card share a colour. */
export const GENESIS_ONE_PHRASE_COLORS = [
  { key: "amber", underline: "#cfa863", cardBg: "#fefcf7", cardBorder: "#f1ebdd" },
  { key: "green", underline: "#7fb08c", cardBg: "#f8fcf9", cardBorder: "#e2eee6" },
  { key: "purple", underline: "#a595d9", cardBg: "#fbfafe", cardBorder: "#e8e3f3" },
  { key: "orange", underline: "#dda57c", cardBg: "#fefaf6", cardBorder: "#f3e6da" },
  { key: "teal", underline: "#7fb2bc", cardBg: "#f7fbfc", cardBorder: "#dfebee" },
  { key: "rose", underline: "#d295a5", cardBg: "#fdfafb", cardBorder: "#f0e3e7" },
] as const;

export function getGenesisOnePhraseColor(index: number) {
  return GENESIS_ONE_PHRASE_COLORS[index % GENESIS_ONE_PHRASE_COLORS.length];
}

/**
 * Every phrase in Genesis 1 that has a note, in reading order.
 *
 * `underline` is quoted from the KJV verse text exactly as it appears, so the
 * reader can find it without guessing.
 */
export const GENESIS_ONE_PHRASES: GenesisOnePhrase[] = [
  {
    verse: 1,
    noteTitle: "In The Beginning",
    underline: "In the beginning",
    preview: "These words mark the beginning of creation, not the beginning of God.",
  },
  {
    verse: 1,
    noteTitle: "God Created",
    underline: "God created",
    preview: "Creating from nothing is a power that belongs to God alone.",
  },
  {
    verse: 1,
    noteTitle: "The Heavens And The Earth",
    underline: "the heaven and the earth",
    preview: "A Bible way of saying everything - the skies above and the ground below.",
  },
  {
    verse: 2,
    noteTitle: "Formless And Empty",
    underline: "without form, and void",
    preview: "The earth was not ruined, just not yet arranged for life. What is formless, God will form.",
  },
  {
    verse: 2,
    noteTitle: "The Deep",
    underline: "the face of the deep",
    preview: "Deep water meant danger and chaos to ancient readers - and it is already under God's rule.",
  },
  {
    verse: 2,
    noteTitle: "The Spirit Of God Was Hovering",
    underline: "the Spirit of God moved",
    preview: "The world is unfinished, but it is not abandoned. God is already present over it.",
  },
  {
    verse: 3,
    noteTitle: "Let There Be Light",
    underline: "Let there be light",
    preview: "God's first recorded words - and light arrives before the sun exists.",
  },
  {
    verse: 4,
    noteTitle: "God Saw That It Was Good",
    underline: "God saw the light, that it was good",
    preview: "Good means fitting and working as intended, not simply pretty.",
  },
  {
    verse: 5,
    noteTitle: "Evening And Morning",
    underline: "the evening and the morning",
    preview: "Darkness first, then light. From page one, darkness does not get the final word.",
  },
  {
    verse: 6,
    noteTitle: "Let There Be An Expanse",
    underline: "Let there be a firmament",
    preview: "God makes the sky before filling it with birds. He prepares places before filling them.",
  },
  {
    verse: 6,
    noteTitle: "Let It Divide",
    underline: "let it divide the waters from the waters",
    preview: "Dividing here is order, not damage. Life needs boundaries.",
  },
  {
    verse: 9,
    noteTitle: "Let The Waters Be Gathered",
    underline: "Let the waters under the heaven be gathered together",
    preview: "The sea does not choose its own place. What feels overwhelming answers to God.",
  },
  {
    verse: 9,
    noteTitle: "Let The Dry Land Appear",
    underline: "let the dry land appear",
    preview: "Dry land means stability - God making a home before placing life in it.",
  },
  {
    verse: 11,
    noteTitle: "Let The Earth Sprout Vegetation",
    underline: "Let the earth bring forth grass",
    preview: "The earth answers God's word by becoming fruitful. The physical world matters to Him.",
  },
  {
    verse: 11,
    noteTitle: "Seed",
    underline: "whose seed is in itself",
    preview: "A small word with a long future - Genesis keeps returning to offspring and promise.",
  },
];

/**
 * The card title, built from the verse's own words so it can never drift from
 * the KJV.
 *
 * The notes were written with their own headings - "Formless And Empty" while
 * the verse reads "without form, and void", "The Spirit Of God Was Hovering"
 * while the verse reads "the Spirit of God moved". Reading a card titled one
 * thing while looking at a verse that says another is confusing, so the title
 * shown is the underlined words themselves, title-cased. noteTitle is kept only
 * to find the matching note.
 */
export function getPhraseDisplayTitle(phrase: GenesisOnePhrase): string {
  const smallWords = new Set(["and", "the", "of", "a", "an", "in", "on", "upon", "was", "is", "be", "that", "it", "from", "under", "there", "let"]);

  return phrase.underline
    .replace(/[,;:]+$/g, "")
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && smallWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

/** Phrases for one verse, in order. */
export function getGenesisOnePhrasesForVerse(verse: number) {
  return GENESIS_ONE_PHRASES.filter((phrase) => phrase.verse === verse);
}

/** True only for Genesis 1, so no other chapter changes. */
export function isGenesisOneStudyModeChapter(book: string | null | undefined, chapter: number | null | undefined) {
  return String(book || "").trim().toLowerCase() === "genesis" && Number(chapter) === 1;
}

/**
 * Pull the full note for a phrase out of the existing notes.
 *
 * Phrase notes are stored as strings that begin with the quoted title, e.g.
 *   "In The Beginning"\nThis is the beginning of creation...
 * so the title line is matched and the rest returned as the body.
 */
export function extractPhraseNote(keyPhraseEntries: string[], noteTitle: string): string[] {
  const wanted = noteTitle.trim().toLowerCase();

  for (const entry of keyPhraseEntries) {
    const [firstLine, ...rest] = String(entry || "").split("\n");
    const heading = firstLine.replace(/^["“”']+|["“”']+$/g, "").trim().toLowerCase();
    if (heading === wanted) {
      return rest.map((line) => line.trim()).filter(Boolean);
    }
  }

  return [];
}
