import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 103, written to the Day 1 standard.
 *
 * 2 Chronicles 8-11 is the hinge of the whole book: Solomon's kingdom at its
 * richest and most admired, then his death, then one bad answer at Shechem
 * that splits it in two. Seven blocks, following the chapter breaks.
 */

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 103,
  title: "Solomon's Reign and the Divided Kingdom",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 103. This is the hinge of the whole book.", 750],
    ["Solomon's kingdom reaches its highest point in these chapters. Then it breaks.", 800],
    ["A queen crosses a desert just to see if the reports about him are true. Gold gets so common that silver stops counting for anything.", 850],
    ["Then Solomon dies. His son opens his mouth once, at one meeting. And ten tribes walk away in a single afternoon.", 900],
    ["We are in 2 Chronicles 8 through 11.", 700],
    ["The temple you just heard get dedicated is about to watch its kingdom come apart.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron2(8, 1, 18, [
      "Twenty years. That is how long it took Solomon to finish the temple and his own house combined. This chapter opens with nothing but administration. Cities rebuilt, store cities, chariot cities, walls, gates, and bars.",
      "He moves his wife, Pharaoh's daughter, out of the house of David and into a new house he built her. His reason: the ark of the Lord has come into the places where David lived, and he will not let her live where the ark had been.",
      "He keeps the temple worship running exactly the way his father set it up. The priest courses, the Levite duties, the porters at every gate. Chronicles says he never departed from it in any matter.",
      "And notice who does the hard labor. Not Israel. Solomon presses the Hittites, Amorites, Perizzites, Hivites, and Jebusites still left in the land into forced service. He keeps the letter of the promise without ever asking whether the arrangement is right.",
    ]),
    chron2(9, 1, 12, [
      "A queen travels a great distance, camels loaded with spices, gold, and precious stones, because she heard a report about Solomon's wisdom and had to test it herself with hard questions.",
      "Solomon has an answer for every one of them. There was nothing hid from Solomon which he told her not.",
      "But it is not just his answers that undo her. It is the whole operation. His house, the food on his table, how his officials sit, what his servants wear, the burnt offerings he goes up to present. She says there was no more spirit in her.",
      "She ends up blessing the Lord, not just Solomon. Blessed be the Lord thy God, she says, which delighted in thee to set thee on his throne. A foreign queen names correctly what an Israelite king can too easily forget. None of this is really his.",
    ]),
    chron2(9, 13, 31, [
      "Six hundred and sixty six talents of gold a year, before counting what the merchants and the kings of Arabia bring. Two hundred shields of beaten gold. A throne of ivory overlaid with gold, six steps, twelve lions standing on them. Nothing like it built in any kingdom.",
      "Silver becomes as common as stones in Jerusalem. Every drinking vessel is gold. Not one is silver, because silver was accounted nothing in Solomon's day. This is the peak.",
      "And in one line, all of it is gone. Solomon slept with his fathers, and was buried in the city of David his father. Forty years, then a grave, like every king who came before him.",
      "Rehoboam his son reigned in his stead. That is the whole sentence. The golden age changes hands in six words, and everything that comes next belongs to a very different man.",
    ]),
    chron2(10, 1, 15, [
      "Rehoboam goes to Shechem to be made king, and the people bring him one request before they will crown him. Your father made our yoke heavy. Lighten it, and we will serve you.",
      "He asks the old men who stood before his father Solomon. Speak good words to this people, they tell him, and they will be your servants forever. Simple advice. He walks away from it.",
      "He asks the young men who grew up with him instead. Tell them your little finger is thicker than your father's loins. Tell them, my father chastised you with whips, but I will chastise you with scorpions. That is the answer he takes.",
      "Chronicles does not blame it only on Rehoboam's pride. It says the cause was of God, that the Lord might perform his word which he had spoken by Ahijah to Jeroboam. A young king's foolishness becomes the hinge God uses to keep an old promise.",
    ]),
    chron2(10, 16, 19, [
      "The people hear Rehoboam's answer and they are done. What portion have we in David? they say. We have no inheritance in the son of Jesse. Every man to your tents, Israel. Ten tribes walk away in one afternoon.",
      "Rehoboam still sends Hadoram, the man over the tribute, to try to collect from them anyway. They stone him to death. Rehoboam barely gets into his own chariot fast enough to escape to Jerusalem.",
      "Only Judah is left under the house of David. The kingdom Solomon spent forty years building whole is now two kingdoms, and it happened over one bad answer at one meeting.",
      "Israel rebelled against the house of David unto this day, the chapter says. This day, meaning whoever first wrote this down was still living inside the split, watching two nations act like they had always been enemies.",
    ]),
    chron2(11, 1, 12, [
      "Rehoboam gathers a hundred and eighty thousand fighting men from Judah and Benjamin to force Israel back under his rule. Before he can march, a word comes to Shemaiah the man of God. You shall not go up and fight your brethren. This thing is done of me. Go home.",
      "Rehoboam obeys, fast, no argument recorded. This is the same king who would not listen to wise old men over his own pride, and he listens instantly to a prophet over a war he was ready to start.",
      "He turns his energy toward defense instead of conquest. Fifteen cities across Judah and Benjamin, fortified, stocked with shields, spears, oil, and wine. Bethlehem is on the list, centuries before anyone knows why that will matter.",
      "He builds what he can actually hold instead of chasing what he already lost. It is a smaller kingdom than his father's. It is also the one that survives.",
    ]),
    chron2(11, 13, 23, [
      "Jeroboam, ruling the ten northern tribes, casts the priests and Levites out of his territory and sets up his own priests for the high places and the golden calves he made. So every Levite who wants to actually serve the Lord has to leave everything and move to Judah.",
      "For three years it works. Chronicles says the people who set their hearts to seek the Lord came to Jerusalem with them, and Judah walked in the way of David and Solomon. Past tense already, because it will not last.",
      "Rehoboam takes eighteen wives and sixty concubines, twenty eight sons and sixty daughters. And of all of them, he loves Maachah, Absalom's daughter, more than the rest, and marks her son Abijah as the one he plans to crown.",
      "He deals wisely with the rest, scattering his sons across the fortified cities instead of keeping them together at court, feeding them well, keeping them busy. He learned that much, at least, from watching his own father's household come apart.",
    ]),
  ],
  closing: [
    ["So that is Day 103.", 700],
    ["Solomon's glory and Solomon's grave, four chapters apart.", 750],
    ["Then one bad answer at Shechem, and a kingdom that took two lifetimes to build tears in half in an afternoon.", 800],
    ["Rehoboam loses nine tenths of his father's kingdom, and God tells him flatly not to try to take it back by force.", 850],
    ["So he builds what is left instead. Fortified cities, priests and Levites who would rather lose everything than worship a golden calf, and a family he is finally learning to manage with some wisdom.", 850],
    ["It is a smaller Judah than the Israel Solomon once ruled whole. It is also the one that lasts.", 850],
    ["Tomorrow, 2 Chronicles 12 through 15. An invasion tests what is left of Rehoboam's kingdom, and the reforms begin.", 850],
    ["For now, hold on to Shemaiah's word.", 800],
    ["Ye shall not fight against your brethren.", 750],
    ["Return every man to his house.", 1200],
  ],
};
