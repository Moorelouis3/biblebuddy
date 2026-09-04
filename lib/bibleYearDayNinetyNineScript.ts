import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 99, written to the Day 1 standard.
 *
 * 1 Chronicles 21-24: the one failure Chronicles does not skip past - David
 * numbers Israel, a plague follows, and the threshingfloor he buys to stop it
 * becomes the temple site. Then he hands the actual building to Solomon and
 * spends the rest of his life organizing the Levites and priests who will
 * serve there. Five blocks across four chapters, the last two consolidating
 * long lists of names into what they were actually for.
 */

const chron1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "1 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 99,
  title: "The Temple Site and Priestly Order",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 99. David has just been promised a throne that never ends.", 750],
    ["Today Chronicles shows him at his worst - and does not look away from it.", 800],
    ["A census nobody needed to take. A plague that follows. A threshingfloor that becomes holy ground.", 850],
    ["Then David spends what is left of his life getting ready for a temple he will never see finished.", 850],
    ["We are in 1 Chronicles 21 through 24.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron1(21, 1, 13, [
      "Satan provokes David to number the people. Even Joab tries to stop him - why will he be a cause of trespass to Israel? David overrules him anyway.",
      "Then it lands. David said unto God, I have sinned greatly. He does not wait to be caught. He sees it the moment it is finished.",
      "Gad offers him a choice - famine, fleeing his enemies, or plague. David picks the one where God, not man, decides how far it goes. Let me fall now into the hand of the Lord.",
    ]),
    chron1(21, 14, 30, [
      "Seventy thousand die before an angel stands over Jerusalem with a drawn sword. And the Lord beheld, and he repented him of the evil, and said, It is enough.",
      "David says the truest thing in the chapter. As for these sheep, what have they done? Let thine hand be on me.",
      "He is told to buy Ornan's threshingfloor for an altar. Ornan offers it free. David refuses - I will not offer burnt offerings without cost. That ridge is Mount Moriah, where Abraham once raised a knife over Isaac. It is about to become the temple.",
    ]),
    chron1(22, 1, 19, [
      "This is the house of the Lord God, David says, standing on the ground he just bought. He starts stockpiling iron, bronze, and cedar before Solomon lays one stone.",
      "It was in my mind to build an house unto the name of the Lord, he tells his son. But thou hast shed blood abundantly - thou shalt not build it. No bitterness. Just the reason, and then he keeps preparing anyway.",
      "Be strong, and of good courage; dread not, nor be dismayed. A man barred from the work he wanted spends everything he has so someone else can finish it.",
    ]),
    chron1(23, 1, 32, [
      "David is old and full of days when he turns to one more piece of unfinished business - the Levites. Thirty-eight thousand of them, sorted into families and jobs: overseers, officers, gatekeepers, musicians.",
      "Page after page of names most people skim past. But the tabernacle used to travel - the Levites carried it on their shoulders through the wilderness for forty years.",
      "The Lord hath given rest unto his people, David says, and changes their whole job. They shall no more carry the tabernacle. Every name in this list is someone whose work just changed because a traveling people is finally settling down.",
    ]),
    chron1(24, 1, 31, [
      "One more list, same reason. The priests descend from just two of Aaron's four sons - Nadab and Abihu died for offering strange fire, so only Eleazar and Ithamar's lines remain.",
      "David divides them into twenty-four courses and casts lots so no household can claim the best rotation. Chosen by chance in front of the king, so no one can call it favoritism.",
      "Jehoiarib gets the first lot, Jedaiah the second, and eighteen more after that - ordinary priests serving their assigned week, generation after generation.",
      "Centuries later, a priest named Zacharias will be serving his course - the eighth, Abijah's - when an angel tells him his old age is about to end in a son named John. That is what this list was quietly building toward.",
    ]),
  ],
  closing: [
    ["So that is Day 99.", 700],
    ["David's worst chapter in a while, and Chronicles does not edit it out. He sins, he sees it immediately, and he asks for the judgment to fall on him instead of his people.", 800],
    ["The place that plague stops at becomes the place the temple gets built. Judgment and mercy, standing on the exact same acre of ground.", 800],
    ["And a man told no, you cannot build this, spends his last years buying the materials and organizing the workers for a house he will never enter.", 850],
    ["Those names in chapters 23 and 24 were not filler. Centuries later, an ordinary priest serving his ordinary week is the one an angel finds.", 850],
    ["Tomorrow, 1 Chronicles 25 through 28. The singers, the guards, and the last blueprint David hands to Solomon.", 850],
    ["For now, hold on to David's own words at the threshingfloor.", 800],
    ["Let thine hand be on me.", 800],
    ["Not on thy people.", 1200],
  ],
};
