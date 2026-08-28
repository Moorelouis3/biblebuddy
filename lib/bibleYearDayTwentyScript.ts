import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 20, written to the Day 1 standard.
 *
 * Genesis 47-48 settles the family in Egypt and then jumps ahead to Jacob's
 * deathbed: a famine so severe it costs Egypt its own land and freedom, and a
 * blessing where the old trickster crosses his hands on purpose, in the open,
 * to put the younger son first one more time. Six blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 20,
  title: "Jacob Blesses Joseph's Sons",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 20. The reunion is over. Now real life in Egypt begins.", 750],
    ["Jacob stands in front of Pharaoh and blesses him. A shepherd blessing a king.", 800],
    ["Then the famine gets so bad that an entire nation trades its cattle, its land, and finally itself for bread.", 800],
    ["And at the very end, a dying old man crosses his own hands to bless two grandsons in an order nobody expected.", 850],
    ["We are in Genesis 47 and 48.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(47, 1, 12, [
      "Joseph brings five of his brothers before Pharaoh, and when Pharaoh asks their occupation, they answer plainly. Thy servants are shepherds, both we, and also our fathers. No hiding what they are, even standing in front of a king.",
      "Pharaoh tells Joseph to settle them in the best of the land, in Goshen, and even offers to put any capable men in charge of his own cattle.",
      "Then Jacob himself is brought in, and Jacob blessed Pharaoh. The old shepherd blesses the king. When Pharaoh asks his age, Jacob answers with total honesty. Few and evil have the days of the years of my life been. No polishing the story, even in the moment he finally has everything.",
      "Joseph settles his father and brothers in the land of Rameses and nourishes the whole household with bread, according to their families. The boy who was sold for food is now the reason his entire family eats.",
    ]),
    g(47, 13, 26, [
      "Genesis says it plainly: the famine was very sore, and the money faileth. First the Egyptians trade their cattle for bread. Then, the next year, they trade something bigger. Buy us and our land for bread, and we and our land will be servants unto Pharaoh.",
      "Joseph buys all the land of Egypt for Pharaoh, every field except the priests', and moves the people into cities. The nation that came to Joseph to be saved ends up owning nothing.",
      "He sets a law that outlasts all of them. A fifth of everything to Pharaoh, forever. And the Egyptians call it grace. Thou hast saved our lives: let us find grace in the sight of my lord.",
      "Hold both of those at once. Joseph genuinely saved a whole nation from starving. That same rescue also cost every one of them their freedom. Genesis does not pretend it is only one or the other.",
    ]),
    g(47, 27, 31, [
      "Israel dwells in Goshen, gets possessions there, and grows and multiplies exceedingly. While Egypt is losing its land, Jacob's family is quietly gaining everything.",
      "Jacob lives seventeen more years in Egypt. His whole age comes to a hundred and forty-seven years.",
      "When he knows he is dying, he calls for Joseph and asks one thing. Bury me not, I pray thee, in Egypt. I will lie with my fathers. Everything he has gained in Egypt, and he still wants to go home in the end.",
      "Joseph swears it, and Israel bows himself upon the bed's head. A man who spent his whole life grabbing and running finally has one settled request, and it is granted before he even has to worry about it.",
    ]),
    g(48, 1, 7, [
      "Joseph hears his father is sick and brings his two sons, Manasseh and Ephraim, to see him.",
      "Jacob gathers himself and tells Joseph the story again, of God Almighty appearing to him at Luz, blessing him, and promising the land to his descendants forever. The same promise from the stairway at Bethel, repeated near the very end of his life.",
      "Then Jacob makes a legal claim in the middle of the blessing. Thy two sons, Ephraim and Manasseh, are mine, as Reuben and Simeon. He is adopting his grandsons as his own sons, which means Joseph gets a double share of the inheritance through them.",
      "And right in the middle of that legal language, an old grief surfaces on its own. Rachel died by me in the land of Canaan in the way. Fifty years later, and he still names exactly where he buried her.",
    ]),
    g(48, 8, 16, [
      "Israel's eyes are too dim with age to see, so he asks, Who are these? Joseph brings the boys close, and Jacob kisses them and embraces them.",
      "Then he says something that reaches all the way back to Day 19. I had not thought to see thy face: and, lo, God hath shewed me also thy seed. He had stopped hoping to see Joseph. Now he is holding Joseph's sons.",
      "Joseph positions them the normal way, Manasseh the firstborn toward Israel's stronger right hand. But Israel crosses his hands on purpose, guiding his hands wittingly, and lays his right hand on Ephraim, the younger.",
      "Then he blesses them both. The God which fed me all my life long unto this day, the Angel which redeemed me from all evil, bless the lads. A whole life of being chased and chasing, summed up in one line: God fed him, and an angel redeemed him.",
    ]),
    g(48, 17, 22, [
      "Joseph sees his father's right hand on Ephraim's head and it displeases him. He tries to move it. Not so, my father: for this is the firstborn.",
      "Jacob will not move his hand. I know it, my son, I know it. He is not confused. He is choosing, wide awake, the same way the blessing has skipped the older brother his whole family's story. Ishmael and Isaac. Esau and Jacob. Now Manasseh and Ephraim.",
      "He blesses them and sets Ephraim before Manasseh, and says a line people will use for generations after this. God make thee as Ephraim and as Manasseh.",
      "Then, to Joseph directly. Behold, I die: but God shall be with you, and bring you again unto the land of your fathers. His very last words to his favorite son are about the promise outliving him, not about himself at all.",
    ]),
  ],
  closing: [
    ["So that is Day 20.", 700],
    ["A shepherd blesses a king, a nation trades its freedom for bread, and a dying man crosses his hands on purpose.", 700],
    ["Notice Genesis will not let you feel only one thing about the famine. Joseph saved Egypt, and Egypt lost everything doing it.", 800],
    ["And notice what Jacob does at the very end. The man who once stole a blessing in the dark now gives one in broad daylight, and does it exactly the way he wants.", 850],
    ["His grief for Rachel is still there, decades later, showing up uninvited in the middle of a legal blessing.", 850],
    ["Tomorrow, Genesis 49 and 50. Jacob blesses all twelve of his sons, and Genesis ends.", 850],
    ["For now, hold on to what Jacob told Joseph at the end.", 800],
    ["Behold, I die.", 700],
    ["But God shall be with you.", 1200],
  ],
};
