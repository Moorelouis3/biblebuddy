import type { ClueCard, ClueDeck, ClueRef } from "../types";

/**
 * The Genesis deck. The first five People, transcribed from Louis's card
 * mockups (Google Drive, "1 - God.png" ... "5 - Noah.png", 2026-11-22). The
 * card fronts are public/games/clue/genesis/<id>.webp, cropped from those
 * same files.
 *
 * The other 47 of the 52 (Notion roster) are added here as they are written.
 * Abraham is next.
 */

function ref(label: string): ClueRef {
  // "Genesis 6:13–18", "2 Peter 2:5", "Exodus 33:18–23"
  const m = label.match(/^(.+?)\s+(\d+):(\d+)(?:\s*[–-]\s*(\d+))?$/);
  if (!m) throw new Error(`Bad clue reference: ${label}`);
  const verseStart = Number(m[3]);
  return { label, book: m[1], chapter: Number(m[2]), verseStart, verseEnd: m[4] ? Number(m[4]) : verseStart };
}

const card = (c: Omit<ClueCard, "deck">): ClueCard => ({ ...c, deck: "genesis" });

export const GENESIS_CARDS: ClueCard[] = [
  card({
    id: "god",
    number: 1,
    category: "person",
    answer: "God",
    accepted: ["the lord", "lord", "lord god", "yahweh", "jehovah", "god almighty", "the lord god", "i am", "elohim"],
    art: "/games/clue/genesis/god.webp",
    clues: [
      { text: "I asked a man whether he had entered the storehouses of the snow.", ref: ref("Job 38:22") },
      { text: "I told a prophet to take a scroll and write on it again after a king burned the first one.", ref: ref("Jeremiah 36:27–28") },
      { text: "When a man asked to see my glory, I covered him with my hand in a cleft in the rock.", ref: ref("Exodus 33:18–23") },
      { text: "I told Moses, “I AM WHO I AM.”", ref: ref("Exodus 3:14") },
      { text: "In the beginning, I created the heavens and the earth.", ref: ref("Genesis 1:1") },
    ],
  }),
  card({
    id: "adam",
    number: 2,
    category: "person",
    answer: "Adam",
    accepted: ["adam the first man", "the first man"],
    art: "/games/clue/genesis/adam.webp",
    clues: [
      { text: "I lived 800 years after Seth was born.", ref: ref("Genesis 5:4") },
      { text: "Jude describes Enoch as the seventh from me.", ref: ref("Jude 1:14") },
      { text: "Paul said death reigned from my time to Moses.", ref: ref("Romans 5:14") },
      { text: "God brought the animals to me to see what I would call them.", ref: ref("Genesis 2:19–20") },
      { text: "God formed me from the dust and breathed life into me.", ref: ref("Genesis 2:7") },
    ],
  }),
  card({
    id: "eve",
    number: 3,
    category: "person",
    answer: "Eve",
    accepted: ["eva", "chavah", "havah"],
    art: "/games/clue/genesis/eve.webp",
    clues: [
      { text: "After Abel died, I said God had given me another child in his place.", ref: ref("Genesis 4:25") },
      { text: "Paul worried the Corinthians could be led astray the way I was.", ref: ref("2 Corinthians 11:3") },
      { text: "My husband named me because I would be the mother of all the living.", ref: ref("Genesis 3:20") },
      { text: "I gave my husband fruit from the tree after I ate it.", ref: ref("Genesis 3:6") },
      { text: "God made me from one of Adam’s ribs.", ref: ref("Genesis 2:21–22") },
    ],
  }),
  card({
    id: "cain",
    number: 4,
    category: "person",
    answer: "Cain",
    accepted: ["kain", "cane"],
    art: "/games/clue/genesis/cain.webp",
    clues: [
      { text: "I built a city and named it after my son.", ref: ref("Genesis 4:17") },
      { text: "Jude warned about people who followed my way.", ref: ref("Jude 1:11") },
      { text: "I brought God an offering from the ground I worked.", ref: ref("Genesis 4:2–3") },
      { text: "I asked God whether I was my brother’s keeper.", ref: ref("Genesis 4:9") },
      { text: "I killed my brother Abel.", ref: ref("Genesis 4:8") },
    ],
  }),
  card({
    id: "noah",
    number: 5,
    category: "person",
    answer: "Noah",
    accepted: ["noe", "noach"],
    art: "/games/clue/genesis/noah.webp",
    clues: [
      // Louis, 2026-11-22: the 5-point clue, replacing the flood clue. "Ark"
      // and "flood" are saved for the 1-point clue.
      { text: "God found me righteous in a world of unrighteousness.", ref: ref("Genesis 7:1") },
      { text: "Ezekiel named me alongside Daniel and Job.", ref: ref("Ezekiel 14:14") },
      { text: "Peter called me a preacher of righteousness.", ref: ref("2 Peter 2:5") },
      { text: "I sent out a dove that came back with an olive leaf.", ref: ref("Genesis 8:10–11") },
      { text: "God told me to build an ark before the flood.", ref: ref("Genesis 6:13–18") },
    ],
  }),
];

export const GENESIS_DECK: ClueDeck = { id: "genesis", name: "Genesis", theme: "genesis", cards: GENESIS_CARDS };
