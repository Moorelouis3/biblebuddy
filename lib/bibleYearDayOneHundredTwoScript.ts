import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 102, written to the Day 1 standard.
 *
 * 2 Chronicles 4-7 finishes the temple, brings the ark home, and dedicates
 * the whole thing in one massive ceremony. The furnishings in chapter 4 are
 * list-heavy and get a light touch; chapter 6's long prayer and God's night
 * answer in chapter 7 carry most of the teaching weight. Seven blocks.
 */

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 102,
  title: "Temple Dedication and God's Glory",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 102. The temple is finished. Now it gets used for the first time.", 750],
    ["The ark comes home, fire falls from heaven, and God says something Christians still quote today.", 800],
    ["If my people, which are called by my name, shall humble themselves, and pray.", 900],
    ["We are in 2 Chronicles 4 through 7.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron2(4, 1, 22, [
      "Before anything gets used, everything gets made. A bronze altar, a massive bronze Sea resting on twelve oxen, ten lavers, ten golden candlesticks, ten tables, a hundred golden basins.",
      "Nothing here is improvised. Every piece matches something Moses was shown for the tabernacle, just built bigger, in bronze and gold instead of the wilderness version. This house is meant to be the tent, finally permanent.",
    ]),
    chron2(5, 1, 10, [
      "Solomon brings in everything his father David had dedicated, silver and gold, and stores it in the treasuries. Then he calls the whole nation to Jerusalem to bring up the ark.",
      "Priests carry it into the inner room, under the wings of the cherubim, and pull the staves out so they can no longer be seen from outside. The ark has traveled since the wilderness. This is the last time it ever moves.",
      "And when they look inside, there is nothing there but the two tables of stone which Moses put there at Horeb. No relics, no extras. Just the covenant itself, exactly as it was given.",
    ]),
    chron2(5, 11, 14, [
      "Every priest, whether or not it was his division's turn, is there for this. The singers and trumpeters make one sound together, praising and thanking the LORD, for he is good, for his mercy endureth for ever.",
      "And the moment they become one voice, the house is filled with a cloud, so that the priests could not stand to minister by reason of the cloud: for the glory of the LORD had filled the house of God.",
      "Nobody built that. All the bronze and gold and careful craftsmanship in chapter 4 could not make this happen. Unity in worship opened the door, and God simply walked in.",
      "The men trained to serve in that room get sent out of it. Even the priesthood has a limit in the presence of God.",
    ]),
    chron2(6, 1, 11, [
      "Solomon turns and blesses the whole assembly. The LORD said he would dwell in the thick darkness, he says, and yet I have built an house of habitation for thee. Both things are true at once. God is unapproachable, and God agreed to a house.",
      "He retells the whole promise plainly. God chose David, told him no, chose Solomon instead, and here Solomon stands, having done exactly what his father was told he could not do.",
      "None of this started with Solomon's ambition. It started with a promise made to a man who never got to see it finished.",
    ]),
    chron2(6, 12, 42, [
      "Solomon kneels in front of the whole nation, spreads his hands toward heaven, and prays the longest prayer in his life on record. Over and over the same phrase returns. Then hear thou from heaven.",
      "He names every disaster he can imagine for his people. Defeat in battle. Drought. Famine. Plague. Enemies at the gate. Every time, the request is the same. Not that it won't happen, but that God will hear when it does.",
      "Then he prays for someone who isn't even Israelite. Moreover concerning the stranger, that is not of thy people Israel, but is come from a far country for thy great name's sake. Hear thou from the heavens, and do according to all that the stranger calleth to thee for.",
      "He knows exactly how this ends before it happens. For there is no man which sinneth not. This prayer isn't written for a people who will keep the covenant perfectly. It's written for one that won't, asking God to keep listening anyway.",
    ]),
    chron2(7, 1, 10, [
      "Solomon finishes praying, and fire comes down from heaven and consumes the burnt offering and the sacrifices, and the glory of the LORD filled the house.",
      "The priests can't even enter this time. It happened once when the ark came in, and now it happens again, in front of everyone, at the exact moment Solomon stops speaking. God answers out loud.",
      "The people fall on their faces and worship, singing the same line the priests sang in chapter 5. For he is good; for his mercy endureth for ever. The whole nation offers so many sacrifices they dedicate the middle of the court because the bronze altar can't hold it all.",
      "They keep the feast for two full weeks, then Solomon sends everyone home glad and merry in heart for all the goodness that the LORD had done. This is the high point of Solomon's entire reign.",
    ]),
    chron2(7, 11, 22, [
      "That night, privately this time, the LORD appears to Solomon again. I have heard thy prayer, he says, and have chosen this place to myself for an house of sacrifice.",
      "Then comes the line that outlived the temple itself. If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.",
      "It isn't a promise that trouble won't come. God has just listed famine, plague, and defeat as things he expects. It's a promise about what happens after, if his people turn back instead of turning away.",
      "Then the warning. If you turn and forsake me, this house will become a proverb, a byword among the nations. The same chapter that holds the highest moment of Solomon's life also names exactly how it could all fall apart.",
    ]),
  ],
  closing: [
    ["So that is Day 102.", 700],
    ["A house gets built, filled, and dedicated, all in four chapters.", 750],
    ["Twice, the same glory shows up and empties the room of the very priests trained to be there.", 800],
    ["Solomon's prayer doesn't ask for a people who never fail. It asks God to keep hearing them when they do.", 850],
    ["And God's answer becomes one of the most quoted lines in the whole Bible. Humble yourselves. Pray. Turn back. He will hear.", 850],
    ["But the same night carries a warning too. This house can become a ruin if the people who built it walk away from the God it was built for.", 850],
    ["Tomorrow, 2 Chronicles 8 through 11. Solomon's kingdom peaks, and then it splits in two.", 850],
    ["For now, hold on to the line God spoke back to Solomon.", 800],
    ["I will hear from heaven, and will forgive their sin, and will heal their land.", 1200],
  ],
};
