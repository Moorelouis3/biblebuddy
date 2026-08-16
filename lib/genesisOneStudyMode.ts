/**
 * Genesis 1 Study Mode - prototype only.
 *
 * The existing study notes are stored per verse RANGE (Genesis 1:1-2, 1:3-5,
 * and so on, parsed out of lib/genesisOneSource.ts) with the phrase notes as
 * free text inside them. Nothing in that data says which verse a phrase
 * belongs to, and the phrase titles do not match the KJV wording ("Without
 * Form And Void" is one note but "Darkness Was Upon The Face Of The Deep" is
 * another), so the phrases cannot be matched to verses automatically.
 *
 * `noteTitle` therefore has to be the heading EXACTLY as it is written in
 * lib/genesisOneSource.ts, minus its emoji. If a heading is reworded there,
 * the matching noteTitle here has to be reworded with it or the card loses its
 * note.
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
  /** Emoji from the note, kept here so an Insight Card needs nothing else to render. */
  icon: string;
  /** Exact KJV text in that verse to underline. Must match the verse exactly. */
  underline: string;
  /** One or two sentences, visible without tapping. */
  preview: string;
};

/** Pastel colours, rotated in order. Underline and Insight Card share a colour. */
export const GENESIS_ONE_PHRASE_COLORS = [
  { key: "amber", underline: "#d9a441", cardBg: "#fdf6e6", cardBorder: "#f0dfb8" },
  { key: "green", underline: "#5aa06a", cardBg: "#eef7ef", cardBorder: "#cfe6d4" },
  { key: "purple", underline: "#8b6fd0", cardBg: "#f4f0fd", cardBorder: "#ddd2f5" },
  { key: "orange", underline: "#dd8a4e", cardBg: "#fdf1e8", cardBorder: "#f5dcc6" },
  { key: "teal", underline: "#4c9aa8", cardBg: "#ecf6f8", cardBorder: "#c9e4ea" },
  { key: "rose", underline: "#c86b86", cardBg: "#fcf0f3", cardBorder: "#f2d3dc" },
] as const;

export function getGenesisOnePhraseColor(index: number) {
  return GENESIS_ONE_PHRASE_COLORS[index % GENESIS_ONE_PHRASE_COLORS.length];
}

/**
 * Every phrase in Genesis 1 that has an Insight Card, in reading order.
 *
 * `underline` is quoted from the KJV verse text exactly as it appears, so the
 * reader can find it without guessing.
 */
export const GENESIS_ONE_PHRASES: GenesisOnePhrase[] = [
  {
    verse: 1,
    noteTitle: "In The Beginning",
    icon: "🌅",
    underline: "In the beginning",
    preview: "These words mark the beginning of creation, not the beginning of God.",
  },
  {
    verse: 1,
    noteTitle: "Created The Heaven And The Earth",
    icon: "🌎",
    underline: "created the heaven and the earth",
    preview: "This is the Bible’s summary statement for creation.",
  },
  {
    verse: 2,
    noteTitle: "Without Form And Void",
    icon: "🌀",
    underline: "without form, and void",
    preview: "The earth already existed, but it was not yet ready for life.",
  },
  {
    verse: 2,
    noteTitle: "Darkness Was Upon The Face Of The Deep",
    icon: "🌑",
    underline: "darkness was upon the face of the deep",
    preview: "Before God spoke light into existence, darkness covered the world.",
  },
  {
    verse: 2,
    noteTitle: "The Spirit Of God Moved",
    icon: "🕊️",
    underline: "the Spirit of God moved",
    preview: "God was never absent from His creation.",
  },
  {
    verse: 2,
    noteTitle: "Upon The Face Of The Waters",
    icon: "🌊",
    underline: "upon the face of the waters",
    preview: "“The face of the waters” simply means the surface of the water.",
  },
  {
    verse: 3,
    noteTitle: "Let There Be Light",
    icon: "💡",
    underline: "Let there be light",
    preview: "These are the first recorded words God speaks in the Bible.",
  },
  {
    verse: 3,
    noteTitle: "And There Was Light",
    icon: "✨",
    underline: "and there was light",
    preview: "God does not struggle, search for materials, or build with tools.",
  },
  {
    verse: 4,
    noteTitle: "God Saw That It Was Good",
    icon: "✅",
    underline: "God saw the light, that it was good",
    preview: "When God calls something “good,” He means it perfectly fulfills the purpose for which He created it.",
  },
  {
    verse: 4,
    noteTitle: "Divided The Light From The Darkness",
    icon: "⚖️",
    underline: "God divided the light from the darkness",
    preview: "God separates light from darkness.",
  },
  {
    verse: 5,
    noteTitle: "Called The Light Day",
    icon: "🌞",
    underline: "God called the light Day",
    preview: "God gives the light a name.",
  },
  {
    verse: 5,
    noteTitle: "Called The Darkness Night",
    icon: "🌙",
    underline: "the darkness he called Night",
    preview: "God also gives darkness a name.",
  },
  {
    verse: 5,
    noteTitle: "Evening And Morning: The First Day",
    icon: "🌇",
    underline: "the evening and the morning were the first day",
    preview: "This marks the completion of the first day of creation.",
  },
  {
    verse: 6,
    noteTitle: "Let There Be A Firmament",
    icon: "☁️",
    underline: "Let there be a firmament",
    preview: "The word “firmament” refers to the great expanse or sky above the earth.",
  },
  {
    verse: 6,
    noteTitle: "In The Midst Of The Waters",
    icon: "🌊",
    underline: "in the midst of the waters",
    preview: "The phrase “in the midst” means in the middle.",
  },
  {
    verse: 6,
    noteTitle: "Divide The Waters From The Waters",
    icon: "⚖️",
    underline: "let it divide the waters from the waters",
    preview: "God continues His work of separation.",
  },
  {
    verse: 7,
    noteTitle: "And God Made The Firmament",
    icon: "🛠️",
    underline: "And God made the firmament",
    preview: "Verse 6 records what God said.",
  },
  {
    verse: 7,
    noteTitle: "Divided The Waters Which Were Under The Firmament From The Waters Which Were Above The Firmament",
    icon: "⚖️",
    underline: "divided the waters which were under the firmament from the waters which were above the firmament",
    preview: "Water now sits in two places.",
  },
  {
    verse: 7,
    noteTitle: "And It Was So",
    icon: "✅",
    underline: "and it was so",
    preview: "This short phrase carries enormous weight.",
  },
  {
    verse: 8,
    noteTitle: "Called The Firmament Heaven",
    icon: "🌌",
    underline: "God called the firmament Heaven",
    preview: "God names the firmament Heaven.",
  },
  {
    verse: 8,
    noteTitle: "Evening And Morning: The Second Day",
    icon: "🌇",
    underline: "the evening and the morning were the second day",
    preview: "The second day comes to an end.",
  },
  {
    verse: 9,
    noteTitle: "Let The Waters Be Gathered Together",
    icon: "🌊",
    underline: "Let the waters under the heaven be gathered together",
    preview: "Until this point, the earth is described as being covered with water.",
  },
  {
    verse: 9,
    noteTitle: "Let The Dry Land Appear",
    icon: "🏔️",
    underline: "let the dry land appear",
    preview: "As the waters are gathered, dry land rises into view.",
  },
  {
    verse: 10,
    noteTitle: "Called The Dry Land Earth",
    icon: "🌍",
    underline: "God called the dry land Earth",
    preview: "God gives the dry land a name: Earth.",
  },
  {
    verse: 10,
    noteTitle: "Called The Gathering Of Waters Seas",
    icon: "🌊",
    underline: "the gathering together of the waters called he Seas",
    preview: "The gathered waters are now called Seas.",
  },
  {
    verse: 11,
    noteTitle: "Let The Earth Bring Forth Grass",
    icon: "🌱",
    underline: "Let the earth bring forth grass",
    preview: "For the first time, living things appear in creation.",
  },
  {
    verse: 11,
    noteTitle: "Herb Yielding Seed",
    icon: "🌾",
    underline: "the herb yielding seed",
    preview: "God creates plants that can reproduce.",
  },
  {
    verse: 11,
    noteTitle: "Fruit Tree Yielding Fruit",
    icon: "🌳",
    underline: "the fruit tree yielding fruit",
    preview: "God creates trees that produce fruit.",
  },
  {
    verse: 11,
    noteTitle: "Whose Seed Is In Itself",
    icon: "🌾",
    underline: "whose seed is in itself",
    preview: "God did not make plants that need replanting by hand.",
  },
  {
    verse: 12,
    noteTitle: "And The Earth Brought Forth Grass",
    icon: "🌱",
    underline: "And the earth brought forth grass",
    preview: "In verse 11 God gave the command.",
  },
  {
    verse: 12,
    noteTitle: "Herb Yielding Seed After His Kind",
    icon: "🌾",
    underline: "herb yielding seed after his kind",
    preview: "“After his kind” means each plant produces its own type.",
  },
  {
    verse: 12,
    noteTitle: "And The Tree Yielding Fruit, Whose Seed Was In Itself, After His Kind",
    icon: "🌳",
    underline: "the tree yielding fruit, whose seed was in itself, after his kind",
    preview: "Trees get their own mention, separate from grass and herbs.",
  },
  {
    verse: 12,
    noteTitle: "God Saw That It Was Good",
    icon: "✅",
    underline: "God saw that it was good",
    preview: "God looks at the land, seas, plants, and trees and calls them good.",
  },
  {
    verse: 13,
    noteTitle: "Evening And Morning: The Third Day",
    icon: "🌇",
    underline: "the evening and the morning were the third day",
    preview: "The third day comes to an end.",
  },
  {
    verse: 14,
    noteTitle: "Let There Be Lights In The Firmament Of The Heaven",
    icon: "💡",
    underline: "Let there be lights in the firmament of the heaven",
    preview: "On Day One, God created light.",
  },
  {
    verse: 14,
    noteTitle: "To Divide The Day From The Night",
    icon: "⚖️",
    underline: "to divide the day from the night",
    preview: "Light and darkness were already separated on Day One.",
  },
  {
    verse: 14,
    noteTitle: "For Signs, Seasons, Days, And Years",
    icon: "📅",
    underline: "for signs, and for seasons, and for days, and years",
    preview: "The heavenly lights do much more than simply shine.",
  },
  {
    verse: 15,
    noteTitle: "Let Them Be For Lights In The Firmament Of The Heaven",
    icon: "💡",
    underline: "let them be for lights in the firmament of the heaven",
    preview: "The word behind “lights” means lamp.",
  },
  {
    verse: 15,
    noteTitle: "To Give Light Upon The Earth",
    icon: "🌍",
    underline: "to give light upon the earth",
    preview: "Every lamp in the sky is given a job.",
  },
  {
    verse: 16,
    noteTitle: "The Greater Light",
    icon: "☀️",
    underline: "the greater light to rule the day",
    preview: "The greater light is the sun.",
  },
  {
    verse: 16,
    noteTitle: "The Lesser Light",
    icon: "🌙",
    underline: "the lesser light to rule the night",
    preview: "The lesser light is the moon.",
  },
  {
    verse: 16,
    noteTitle: "He Made The Stars Also",
    icon: "⭐",
    underline: "he made the stars also",
    preview: "Moses mentions the stars in only a few words.",
  },
  {
    verse: 17,
    noteTitle: "God Set Them In The Firmament Of The Heaven",
    icon: "🌌",
    underline: "God set them in the firmament of the heaven",
    preview: "God not only created the heavenly lights.",
  },
  {
    verse: 18,
    noteTitle: "To Rule Over The Day And Over The Night",
    icon: "👑",
    underline: "to rule over the day and over the night",
    preview: "The sun and moon are given authority to govern time.",
  },
  {
    verse: 18,
    noteTitle: "God Saw That It Was Good",
    icon: "✅",
    underline: "God saw that it was good",
    preview: "God looks at the lights He has created and calls them good.",
  },
  {
    verse: 19,
    noteTitle: "Evening And Morning: The Fourth Day",
    icon: "🌇",
    underline: "the evening and the morning were the fourth day",
    preview: "The fourth day comes to an end.",
  },
  {
    verse: 20,
    noteTitle: "Let The Waters Bring Forth Abundantly",
    icon: "🌊",
    underline: "Let the waters bring forth abundantly",
    preview: "God now begins filling the waters He prepared on Day Two.",
  },
  {
    verse: 20,
    noteTitle: "The Moving Creature That Hath Life",
    icon: "🐟",
    underline: "the moving creature that hath life",
    preview: "“Hath” is older English for has.",
  },
  {
    verse: 20,
    noteTitle: "Let Fowls Fly Above The Earth",
    icon: "🐦",
    underline: "fowl that may fly above the earth",
    preview: "God now fills the sky He created on Day Two.",
  },
  {
    verse: 20,
    noteTitle: "In The Open Firmament Of Heaven",
    icon: "🕊️",
    underline: "in the open firmament of heaven",
    preview: "“The open firmament of heaven” means the open sky.",
  },
  {
    verse: 21,
    noteTitle: "Great Whales",
    icon: "🐋",
    underline: "God created great whales",
    preview: "The phrase “great whales” refers to the large creatures of the sea.",
  },
  {
    verse: 21,
    noteTitle: "And Every Living Creature That Moveth",
    icon: "🐙",
    underline: "every living creature that moveth",
    preview: "“Moveth” is older English for moves.",
  },
  {
    verse: 21,
    noteTitle: "Which The Waters Brought Forth Abundantly",
    icon: "🌊",
    underline: "which the waters brought forth abundantly",
    preview: "This does not mean the sea produced life on its own.",
  },
  {
    verse: 21,
    noteTitle: "After Their Kind",
    icon: "🌱",
    underline: "after their kind",
    preview: "This phrase means each creature reproduces according to its own kind.",
  },
  {
    verse: 21,
    noteTitle: "And Every Winged Fowl After His Kind",
    icon: "🐦",
    underline: "every winged fowl after his kind",
    preview: "“Fowl” is the King James word for bird.",
  },
  {
    verse: 22,
    noteTitle: "And God Blessed Them",
    icon: "🙌",
    underline: "God blessed them",
    preview: "This is the first time God blesses living creatures in Genesis.",
  },
  {
    verse: 22,
    noteTitle: "Be Fruitful And Multiply",
    icon: "📈",
    underline: "Be fruitful, and multiply",
    preview: "God commands the creatures to increase in number.",
  },
  {
    verse: 22,
    noteTitle: "Fill The Waters In The Seas",
    icon: "🌊",
    underline: "fill the waters in the seas",
    preview: "God does not only permit the creatures to multiply.",
  },
  {
    verse: 23,
    noteTitle: "Evening And Morning: The Fifth Day",
    icon: "🌇",
    underline: "the evening and the morning were the fifth day",
    preview: "The fifth day comes to an end.",
  },
  {
    verse: 24,
    noteTitle: "Let The Earth Bring Forth The Living Creature After His Kind",
    icon: "🐄",
    underline: "Let the earth bring forth the living creature after his kind",
    preview: "Day six opens the same way day three did.",
  },
  {
    verse: 24,
    noteTitle: "Cattle",
    icon: "🐄",
    underline: "cattle",
    preview: "“Cattle” in the King James Version does not only mean cows.",
  },
  {
    verse: 24,
    noteTitle: "And Creeping Thing",
    icon: "🐛",
    underline: "creeping thing",
    preview: "“Creeping thing” describes the small creatures that move close to the ground.",
  },
  {
    verse: 24,
    noteTitle: "And Beast Of The Earth",
    icon: "🦁",
    underline: "beast of the earth after his kind",
    preview: "“Beast of the earth” means the wild animals.",
  },
  {
    verse: 25,
    noteTitle: "And God Made The Beast Of The Earth After His Kind",
    icon: "🦁",
    underline: "God made the beast of the earth after his kind",
    preview: "Verse 24 records the command.",
  },
  {
    verse: 25,
    noteTitle: "And Cattle After Their Kind",
    icon: "🐄",
    underline: "cattle after their kind",
    preview: "The livestock are named separately from the wild animals.",
  },
  {
    verse: 25,
    noteTitle: "And Every Thing That Creepeth Upon The Earth",
    icon: "🐜",
    underline: "every thing that creepeth upon the earth",
    preview: "“Creepeth” is older English for creeps.",
  },
  {
    verse: 26,
    noteTitle: "Let Us Make Man",
    icon: "👤",
    underline: "Let us make man",
    preview: "For the first time in Genesis, God’s words slow down.",
  },
  {
    verse: 26,
    noteTitle: "In Our Image",
    icon: "🪞",
    underline: "in our image",
    preview: "Nothing else in creation is described this way.",
  },
  {
    verse: 26,
    noteTitle: "After Our Likeness",
    icon: "🤝",
    underline: "after our likeness",
    preview: "The words “image” and “likeness” work together.",
  },
  {
    verse: 26,
    noteTitle: "Let Them Have Dominion",
    icon: "👑",
    underline: "let them have dominion",
    preview: "Dominion means authority with responsibility.",
  },
  {
    verse: 27,
    noteTitle: "So God Created Man In His Own Image",
    icon: "🪞",
    underline: "So God created man in his own image",
    preview: "This is the line the whole chapter has been building toward.",
  },
  {
    verse: 27,
    noteTitle: "In The Image Of God Created He Him",
    icon: "👤",
    underline: "in the image of God created he him",
    preview: "Genesis says the same thing twice in one verse.",
  },
  {
    verse: 27,
    noteTitle: "Male And Female Created He Them",
    icon: "👨",
    underline: "male and female created he them",
    preview: "God creates humanity as both male and female.",
  },
  {
    verse: 28,
    noteTitle: "God Blessed Them",
    icon: "🙌",
    underline: "God blessed them",
    preview: "Before giving mankind responsibilities, God first blesses them.",
  },
  {
    verse: 28,
    noteTitle: "Be Fruitful And Multiply",
    icon: "📈",
    underline: "Be fruitful, and multiply",
    preview: "God commands mankind to have children and fill the earth.",
  },
  {
    verse: 28,
    noteTitle: "Fill The Earth",
    icon: "🌍",
    underline: "replenish the earth",
    preview: "The earth was created to be inhabited.",
  },
  {
    verse: 28,
    noteTitle: "Subdue It",
    icon: "🏔️",
    underline: "subdue it",
    preview: "To subdue means to bring under wise management.",
  },
  {
    verse: 28,
    noteTitle: "Have Dominion Over Every Living Thing",
    icon: "👑",
    underline: "have dominion over the fish of the sea",
    preview: "God repeats mankind’s responsibility over creation.",
  },
  {
    verse: 29,
    noteTitle: "Herb Yielding Seed",
    icon: "🌱",
    underline: "every herb bearing seed",
    preview: "God now tells mankind what they are to eat.",
  },
  {
    verse: 29,
    noteTitle: "Fruit Tree Yielding Fruit",
    icon: "🌳",
    underline: "the fruit of a tree yielding seed",
    preview: "God also provides fruit from the trees.",
  },
  {
    verse: 29,
    noteTitle: "To You It Shall Be For Meat",
    icon: "🍽️",
    underline: "to you it shall be for meat",
    preview: "In the King James Version, the word “meat” simply means food.",
  },
  {
    verse: 30,
    noteTitle: "To Every Beast Of The Earth, And To Every Fowl Of The Air, And To Every Thing That Creepeth Upon The Earth",
    icon: "🐾",
    underline: "to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth",
    preview: "God names the same three groups He made on days five and six.",
  },
  {
    verse: 30,
    noteTitle: "Wherein There Is Life",
    icon: "🫁",
    underline: "wherein there is life",
    preview: "“Wherein” is older English for in which.",
  },
  {
    verse: 30,
    noteTitle: "Food For Every Living Creature",
    icon: "🐾",
    underline: "I have given every green herb for meat",
    preview: "God’s care extends beyond mankind.",
  },
  {
    verse: 31,
    noteTitle: "God Saw Everything That He Had Made",
    icon: "👀",
    underline: "God saw every thing that he had made",
    preview: "Earlier in Genesis, God looked at individual parts of creation and called them good.",
  },
  {
    verse: 31,
    noteTitle: "And Behold, It Was Very Good",
    icon: "✅",
    underline: "behold, it was very good",
    preview: "This is the only time in Genesis 1 that God says “very good.”",
  },
  {
    verse: 31,
    noteTitle: "Evening And Morning: The Sixth Day",
    icon: "🌇",
    underline: "the evening and the morning were the sixth day",
    preview: "The sixth day brings Creation Week to its completion.",
  },
];

/**
 * The Insight Card title, built from the verse's own words so it can never drift from
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
  const smallWords = new Set([
    "and", "the", "of", "a", "an", "in", "on", "upon", "was", "is", "be", "that", "it", "from",
    "under", "there", "let", "to", "for", "so", "he", "were", "which", "above",
  ]);

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
 * Reduce a stored heading to bare words so it can be compared to a noteTitle.
 *
 * By the time the notes reach the reader they have been through the shared
 * phrase formatter, which prefixes the title with an emoji, so the stored line
 * reads 🌅 "In The Beginning" rather than the plain title this file records.
 * The emoji and the quotes both have to come off before comparing.
 */
const LEADING_EMOJI_RUN = /^(?:[\p{Extended_Pictographic}️‍]+\s*)+/u;
const LEADING_EMOJI = /^([\p{Extended_Pictographic}](?:️|‍[\p{Extended_Pictographic}]️?)*)/u;

function normalizePhraseHeading(line: string): string {
  return String(line || "")
    .replace(LEADING_EMOJI_RUN, "")
    .replace(/^["“”']+|["“”']+$/g, "")
    .trim()
    .toLowerCase();
}

/** The raw stored note entry for a phrase, title line included, or null. */
export function findPhraseNoteEntry(keyPhraseEntries: string[], noteTitle: string): string | null {
  const wanted = normalizePhraseHeading(noteTitle);

  for (const entry of keyPhraseEntries) {
    const [firstLine] = String(entry || "").split("\n");
    if (normalizePhraseHeading(firstLine) === wanted) return String(entry || "");
  }

  return null;
}

/**
 * Pull the full note for a phrase out of the existing notes.
 *
 * Phrase notes are stored as strings that begin with the quoted title, e.g.
 *   "In The Beginning"\nThis is the beginning of creation...
 * so the title line is matched and the rest returned as the body.
 */
export function extractPhraseNote(keyPhraseEntries: string[], noteTitle: string): string[] {
  const entry = findPhraseNoteEntry(keyPhraseEntries, noteTitle);
  if (entry === null) return [];

  const [, ...rest] = entry.split("\n");
  return rest.map((line) => line.trim()).filter(Boolean);
}

/** The emoji the formatter put on the note's title line, if there is one. */
export function getPhraseNoteIcon(keyPhraseEntries: string[], noteTitle: string): string | null {
  const entry = findPhraseNoteEntry(keyPhraseEntries, noteTitle);
  if (entry === null) return null;

  const [firstLine] = entry.split("\n");
  const match = firstLine.trim().match(LEADING_EMOJI);
  return match?.[1] || null;
}
