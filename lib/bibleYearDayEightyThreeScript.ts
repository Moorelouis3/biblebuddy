import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 83, written to the Day 1 standard.
 *
 * 1 Kings 4-7: the kingdom at peace, Solomon's wisdom on display, and the
 * temple finally rising - seven years for God's house, thirteen for
 * Solomon's own. Seven blocks across four chapters, matching the shape
 * Day 82 used for the David-to-Solomon turn.
 */

const kings = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "1 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 83,
  title: "Solomon's Wisdom and Temple Preparations",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 83. Solomon finally starts building.", 750],
    ["Peace on every side, wisdom flowing out of him, and now the thing his father was never allowed to do — a house for God.", 800],
    ["It takes seven years. His own house takes almost twice that.", 800],
    ["Every stone is cut somewhere else, so the building site itself stays silent the whole time.", 850],
    ["We are in 1 Kings 4 through 7.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings(4, 1, 19, [
      "Solomon's government gets listed out by name — Azariah over the priests, Benaiah over the army, Jehoshaphat as recorder, twelve officers spread across the tribes, each one responsible for feeding the king's household one month a year.",
      "That system alone tells you the kingdom is running smoothly. No emergency taxes, no scrambling — just twelve months, twelve districts, each covering its turn.",
      "It's not exciting to read a list of names and territories. But an administration this organized is the fruit of the peace God promised David generations earlier.",
      "Solomon inherited a kingdom his father spent a lifetime fighting for, and the first thing he does with it is build something that runs without him standing over it.",
    ]),
    kings(4, 20, 34, [
      "Judah and Israel were many, as the sand which is by the sea in multitude, eating and drinking, and making merry. And every man dwelt safely under his own vine and his own fig tree.",
      "That's the picture David never got to see. War his whole reign, and now his son's kingdom is so secure that ordinary people just sit under their own trees and eat.",
      "And God gave Solomon wisdom and understanding exceeding much, and largeness of heart, even as the sand that is on the sea shore. Three thousand proverbs. A thousand and five songs. He spoke of trees and beasts and birds and fish, and kings from everywhere came just to listen.",
      "Hold that phrase, largeness of heart. Not just cleverness — room enough to take in the whole world and still have space left over.",
    ]),
    kings(5, 1, 18, [
      "Hiram of Tyre sends word the moment he hears Solomon is king, because he loved David. Solomon writes back with the real reason now is the time: my father could not build a house for God because of the wars, but the Lord hath given me rest on every side.",
      "He asks for cedar, because there is not among us any that can skill to hew timber like unto the Sidonians. Solomon doesn't pretend Israel has skills it doesn't have. He just asks the people who do. Hiram rejoices, and the two kings cut a deal — cedar and fir for wheat and oil, year by year.",
      "Then Solomon raises a levy — thirty thousand men, sent to Lebanon in shifts, a month there and two months home. Seventy thousand carry burdens, eighty thousand cut stone in the mountains.",
      "This is forced labor, and it will not stay small. His own son inherits the resentment it plants, and it costs him half the kingdom.",
    ]),
    kings(6, 1, 10, [
      "In the four hundred and eightieth year after Israel left Egypt, in the fourth year of his reign, Solomon begins to build the house of the Lord — sixty cubits long, twenty wide, thirty high, with a porch out front and narrow windows for light.",
      "Every stone is cut and finished at the quarry before it ever reaches Jerusalem.",
      "There was neither hammer nor axe nor any tool of iron heard in the house while it was in building. The site itself stays quiet the whole time.",
      "Picture that. A construction project this size, and the actual building site makes no noise at all. Everything loud happens somewhere else, out of sight.",
    ]),
    kings(6, 11, 38, [
      "Right in the middle of the construction details, God speaks to Solomon directly, and it's easy to read past. Concerning this house which thou art in building, if thou wilt walk in my statutes, and execute my judgments — then will I perform my word with thee, and dwell among the children of Israel, and will not forsake my people.",
      "The building isn't the point. God says he'll live among the people because of how they live, not because of how tall the walls are.",
      "Inside, everything gets covered in cedar and then gold — the floor, the walls, two carved cherubim ten cubits high with wings touching wall to wall and touching each other in the middle of the room. All was cedar; there was no stone seen.",
      "Seven years, start to finish. From the month Zif to the month Bul. Every part of it, from the stone foundation to the gold on the floor, built to hold the presence of God.",
    ]),
    kings(7, 1, 12, [
      "Then the text drops a detail you shouldn't skim past. Solomon was building his own house thirteen years. Almost twice as long as he spent on the temple.",
      "His own palace is bigger too — a hall of cedar pillars, a porch for his throne to judge in, a whole separate house for Pharaoh's daughter, his wife. Costly stones, sawed and measured, inside and out.",
      "None of this is condemned outright in the text. But set the two numbers side by side and they say something on their own. Seven years for God's house. Thirteen for his.",
      "It's the kind of gap that starts small and grows. Right now it's just a number. Later in this same book it becomes part of the reason the kingdom splits.",
    ]),
    kings(7, 13, 51, [
      "A different Hiram now — not the king, but a widow's son from Tyre, a bronze worker filled with wisdom and skill. Solomon brings him in to cast everything metal the temple needs.",
      "Two pillars of bronze, eighteen cubits high, stand at the porch. Solomon names them himself — Jachin on the right, Boaz on the left. He gives them their own permanent titles before anyone even walks through the door.",
      "Then the molten sea — a massive bronze basin, ten cubits across, resting on twelve bronze oxen, three facing each direction. Ten smaller lavers on wheeled bronze bases. Basins, pots, shovels, and snuffers, all bronze first, then the altar and the table and the ten candlesticks in pure gold.",
      "So was ended all the work that king Solomon made for the house of the Lord. And Solomon brought in the things his father David had dedicated — the silver, the gold, the vessels — and put them among the treasures of the house of the Lord. Everything David set aside for this finally has a home.",
    ]),
  ],
  closing: [
    ["So that is Day 83.", 700],
    ["Solomon built a kingdom so secure that people just sat under their own fig trees and ate.", 800],
    ["Then he spent seven years building God a house — every stone cut somewhere else, so the site itself stayed silent.", 800],
    ["And thirteen years building his own. Almost twice as long.", 800],
    ["Right in the middle of it all, God said the real thing plainly. I will dwell among my people, if they walk in my ways. Not because of the gold on the walls.", 850],
    ["Tomorrow, 1 Kings 8 through 11. The temple gets dedicated in glory. Then Solomon's own heart starts to drift.", 850],
    ["For now, hold that gap between the two numbers.", 750],
    ["Seven years for God's house.", 750],
    ["Thirteen for his own.", 1200],
  ],
};
