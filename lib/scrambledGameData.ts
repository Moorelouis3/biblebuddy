export type ScrambledDifficulty = "easy" | "medium" | "hard";

export interface ScrambledQuestion {
  id: string;
  answer: string;
  reference: string;
  sourceLine: string;
  clue: string;
  difficulty: ScrambledDifficulty;
}

export interface ScrambledChapterPack {
  chapter: number;
  title: string;
  description: string;
  questions: ScrambledQuestion[];
}

export interface ScrambledBookPack {
  slug: string;
  name: string;
  shortDescription: string;
  accentClassName: string;
  chapters: ScrambledChapterPack[];
}

export interface ScrambledChapterProgress {
  completed: boolean;
  bestScore: number;
  lastPlayedAt: string;
}

export type ScrambledProgressMap = Record<string, ScrambledChapterProgress>;

export const SCRAMBLED_PROGRESS_STORAGE_KEY = "bb_scrambled_progress_v1";

export const SCRAMBLED_BOOKS: ScrambledBookPack[] = [
  {
    slug: "genesis",
    name: "Genesis",
    shortDescription: "Start with creation, the garden, and the first brokenness of sin.",
    accentClassName: "border-[#e8b9c1] bg-[#f6dce1]",
    chapters: [
      {
        chapter: 1,
        title: "Genesis 1",
        description: "Creation unfolds in order as God speaks light, sky, land, life, and humanity into place.",
        questions: [
          { id: "genesis-1-01", answer: "light", reference: "Genesis 1:3", sourceLine: "Let there be light", clue: "The first thing God speaks into existence.", difficulty: "easy" },
          { id: "genesis-1-02", answer: "day", reference: "Genesis 1:5", sourceLine: "God called the light Day", clue: "What God called the light.", difficulty: "easy" },
          { id: "genesis-1-03", answer: "night", reference: "Genesis 1:5", sourceLine: "the darkness he called Night", clue: "What God called the darkness.", difficulty: "easy" },
          { id: "genesis-1-04", answer: "earth", reference: "Genesis 1:10", sourceLine: "God called the dry land Earth", clue: "The name God gives the dry land.", difficulty: "easy" },
          { id: "genesis-1-05", answer: "waters", reference: "Genesis 1:6", sourceLine: "in the midst of the waters", clue: "What the firmament divides.", difficulty: "medium" },
          { id: "genesis-1-06", answer: "heaven", reference: "Genesis 1:8", sourceLine: "God called the firmament Heaven", clue: "What God called the firmament.", difficulty: "medium" },
          { id: "genesis-1-07", answer: "firmament", reference: "Genesis 1:6", sourceLine: "Let there be a firmament", clue: "The expanse God places between the waters.", difficulty: "medium" },
          { id: "genesis-1-08", answer: "creature", reference: "Genesis 1:21", sourceLine: "every living creature that moveth", clue: "A living thing God creates in the seas.", difficulty: "medium" },
          { id: "genesis-1-09", answer: "dominion", reference: "Genesis 1:26", sourceLine: "let them have dominion", clue: "The stewardship God gives humanity over creation.", difficulty: "hard" },
          { id: "genesis-1-10", answer: "replenish", reference: "Genesis 1:28", sourceLine: "replenish the earth", clue: "The KJV word in the blessing to fill the earth.", difficulty: "hard" }
        ],
      },
      {
        chapter: 2,
        title: "Genesis 2",
        description: "The chapter slows down to focus on Eden, Adam's formation, God's command, and the first marriage.",
        questions: [
          { id: "genesis-2-01", answer: "dust", reference: "Genesis 2:7", sourceLine: "formed man of the dust", clue: "What man was formed from.", difficulty: "easy" },
          { id: "genesis-2-02", answer: "eden", reference: "Genesis 2:8", sourceLine: "a garden eastward in Eden", clue: "The place where God planted the garden.", difficulty: "easy" },
          { id: "genesis-2-03", answer: "river", reference: "Genesis 2:10", sourceLine: "a river went out of Eden", clue: "What went out of Eden to water the garden.", difficulty: "easy" },
          { id: "genesis-2-04", answer: "garden", reference: "Genesis 2:15", sourceLine: "put him into the garden", clue: "The place Adam was put to dress and keep.", difficulty: "easy" },
          { id: "genesis-2-05", answer: "naked", reference: "Genesis 2:25", sourceLine: "they were both naked", clue: "How Adam and Eve are described before sin.", difficulty: "medium" },
          { id: "genesis-2-06", answer: "formed", reference: "Genesis 2:19", sourceLine: "the LORD God formed every beast", clue: "What the Lord did to the beasts of the field.", difficulty: "medium" },
          { id: "genesis-2-07", answer: "breathed", reference: "Genesis 2:7", sourceLine: "breathed into his nostrils", clue: "What God did to give man the breath of life.", difficulty: "medium" },
          { id: "genesis-2-08", answer: "pleasant", reference: "Genesis 2:9", sourceLine: "pleasant to the sight", clue: "How the trees were described to the sight.", difficulty: "hard" },
          { id: "genesis-2-09", answer: "cleave", reference: "Genesis 2:24", sourceLine: "shall cleave unto his wife", clue: "The word for holding fast in marriage.", difficulty: "hard" },
          { id: "genesis-2-10", answer: "commanded", reference: "Genesis 2:16", sourceLine: "the LORD God commanded the man", clue: "What the Lord did before giving the boundary in Eden.", difficulty: "hard" }
        ],
      },
      {
        chapter: 3,
        title: "Genesis 3",
        description: "Temptation, disobedience, judgment, and exile reshape the whole human story in this chapter.",
        questions: [
          { id: "genesis-3-01", answer: "tree", reference: "Genesis 3:3", sourceLine: "the fruit of the tree", clue: "The forbidden fruit came from this.", difficulty: "easy" },
          { id: "genesis-3-02", answer: "serpent", reference: "Genesis 3:1", sourceLine: "the serpent was more subtil", clue: "The creature that speaks to the woman.", difficulty: "easy" },
          { id: "genesis-3-03", answer: "subtil", reference: "Genesis 3:1", sourceLine: "more subtil than any beast", clue: "The KJV word describing the serpent's craftiness.", difficulty: "medium" },
          { id: "genesis-3-04", answer: "naked", reference: "Genesis 3:7", sourceLine: "they knew that they were naked", clue: "What Adam and Eve realized about themselves after eating.", difficulty: "medium" },
          { id: "genesis-3-05", answer: "cursed", reference: "Genesis 3:14", sourceLine: "thou art cursed above all cattle", clue: "The judgment word spoken over the serpent and the ground.", difficulty: "medium" },
          { id: "genesis-3-06", answer: "sorrow", reference: "Genesis 3:16", sourceLine: "I will greatly multiply thy sorrow", clue: "What would be multiplied in childbearing.", difficulty: "medium" },
          { id: "genesis-3-07", answer: "enmity", reference: "Genesis 3:15", sourceLine: "I will put enmity between thee and the woman", clue: "The conflict God puts between the serpent and the woman.", difficulty: "hard" },
          { id: "genesis-3-08", answer: "thistles", reference: "Genesis 3:18", sourceLine: "thorns also and thistles", clue: "What the cursed ground would also bring forth.", difficulty: "hard" },
          { id: "genesis-3-09", answer: "beguiled", reference: "Genesis 3:13", sourceLine: "The serpent beguiled me", clue: "Eve's word for how the serpent deceived her.", difficulty: "hard" },
          { id: "genesis-3-10", answer: "cherubims", reference: "Genesis 3:24", sourceLine: "he placed at the east of the garden of Eden Cherubims", clue: "The heavenly beings placed at Eden's east gate.", difficulty: "hard" }
        ],
      },
    ],
  },
];

export function getScrambledBook(bookSlug: string) {
  return SCRAMBLED_BOOKS.find((book) => book.slug === bookSlug) ?? null;
}

export function getScrambledChapter(bookSlug: string, chapterNumber: number) {
  return getScrambledBook(bookSlug)?.chapters.find((chapter) => chapter.chapter === chapterNumber) ?? null;
}

export function getScrambledProgressKey(bookSlug: string, chapterNumber: number) {
  return `${bookSlug}:${chapterNumber}`;
}
