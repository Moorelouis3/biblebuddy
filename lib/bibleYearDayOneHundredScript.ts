import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 100, written to the Day 1 standard.
 *
 * 1 Chronicles 25-28 closes out David's organizing work: singers, gatekeepers,
 * treasurers, and army divisions all sorted by lot, then one last public
 * assembly where David hands Solomon the actual blueprint for the temple.
 * Five blocks across four chapters - the three list-heavy chapters (25-27)
 * each get one tight block, leaving room for David's closing speech in 28.
 */

const chron1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "1 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SCRIPT: BibleYearDayScript = {
  dayNumber: 100,
  title: "Worship Teams and Temple Plans",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 100. David's last organizing work before he hands it all over.", 750],
    ["Singers, gatekeepers, treasurers, an army - all sorted, all in order.", 800],
    ["Then one last assembly, where David gives Solomon the actual blueprint.", 850],
    ["We are in 1 Chronicles 25 through 28.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron1(25, 1, 31, [
      "The musicians get the same treatment as the priests - two hundred eighty-eight of them, cast by lot into twenty-four courses, just like chapter 24.",
      "They prophesy with harps and cymbals, the text says. Worship here is not background music. It is skilled work, assigned like any other service in God's house.",
    ]),
    chron1(26, 1, 32, [
      "More lots - gatekeepers guarding every side of the temple, treasurers over the gold won in battle and dedicated to the Lord.",
      "Obed-edom is singled out for a reason. He once kept the ark in his house after Uzzah died touching it, and God blessed him for it. Now sixty-two of his sons and grandsons guard the gates.",
    ]),
    chron1(27, 1, 34, [
      "Twenty-four thousand men a month, one division at a time, so the whole army never has to serve at once. One tribal leader per tribe keeps every family represented.",
      "David did not count the men under twenty - the Lord had promised to multiply Israel like the stars. And Joab's chapter-21 count is named as never finished, never entered in the record.",
    ]),
    chron1(28, 1, 10, [
      "David gathers everyone to Jerusalem to explain himself in public. I had in mine heart to build an house. But God said, thou shalt not, because thou hast been a man of war.",
      "Then why Solomon, specifically: of all my sons, he hath chosen Solomon. Not the oldest. Not the strongest. Chosen.",
      "The real charge, straight to his son. Serve him with a perfect heart. If thou seek him, he will be found of thee.",
    ]),
    chron1(28, 11, 21, [
      "David hands over the pattern itself - the porch, the mercy seat, the exact weight of gold for each lampstand. All this, the Lord made me understand in writing by his hand upon me. Not his taste. Something he was shown.",
      "Be strong and of good courage, and do it. Fear not, nor be dismayed. The same words God gave Joshua before Jericho, now from a father to a son who has never built anything this big.",
    ]),
  ],
  closing: [
    ["So that is Day 100.", 700],
    ["A hundred days in, and today was mostly people you have never heard of - singers, gatekeepers, treasurers, division captains.", 800],
    ["Every one of them cast by lot, in public, so no family could grab the best assignment.", 800],
    ["Then David says the quiet part out loud. He wanted to build God a house. God said no. He is at peace with it, and hands his son the whole plan anyway.", 850],
    ["Tomorrow, 1 Chronicles 29 and 2 Chronicles 1 through 3. Solomon actually begins to build.", 850],
    ["For now, hold on to the charge David gave his son.", 800],
    ["Be strong, and of good courage.", 800],
    ["Fear not, nor be dismayed.", 1200],
  ],
};
