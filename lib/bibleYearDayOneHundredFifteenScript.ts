import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 115, written to the Day 1 standard.
 *
 * Nehemiah 10-13 closes the book: the covenant gets sealed by name, Jerusalem
 * gets repopulated by lot and by choice, the wall gets a joyful dedication,
 * and then Nehemiah leaves for a while and comes back to find the covenant
 * already unraveling. Seven blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Nehemiah ${chapter}:${startVerse}-${endVerse}`,
  book: "nehemiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 115,
  title: "Covenant Renewal and Reform",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 115. Yesterday ended with a signed, sealed covenant. Today you get to watch how long it actually lasts.", 750],
    ["It starts well. Names get listed, Jerusalem gets people living inside its new wall, and the city throws the biggest celebration this whole book has seen.", 800],
    ["Then Nehemiah leaves for a while. And almost everything they promised starts coming apart.", 800],
    ["Tobiah, the man who spent years trying to stop this wall from ever going up, ends up with a private room inside the temple itself.", 800],
    ["We are in Nehemiah 10 through 13, the last four chapters of the book.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(10, 1, 27, [
      "This chapter opens with a literal list of signatures. Nehemiah signs first, as governor, then priest after priest, then Levite after Levite, then the heads of the ordinary families.",
      "These are not new names. Every family here has already shown up somewhere in Ezra or Nehemiah, the same people who first came home from exile, still standing behind the same project.",
      "This is not a group feeling. It is a sealed document, kept on record, the kind you cannot quietly walk back from later.",
      "Sometimes a decision you make in your heart needs a version you can point to later. Something with your actual name attached to it.",
    ]),
    g(10, 28, 39, [
      "The rest of the people join the leaders in one oath, to walk in God's law and to keep and do all his commandments.",
      "The terms are specific. No marrying into the nations around them. No buying from anyone selling on the Sabbath. Letting the land rest and canceling debts every seventh year, exactly as the law said.",
      "Then comes the money. A third of a shekel a year for the temple's upkeep. Wood for the altar assigned by lot. Firstfruits, firstborn animals, and tithes, all promised in advance, all itemized.",
      "The whole list ends in one line. We will not forsake the house of our God. Real repentance is rarely just a feeling. It is a specific, funded, dated commitment.",
    ]),
    g(11, 1, 19, [
      "Jerusalem has a new wall, but almost nobody lives inside it yet. The rulers already dwell there, so lots are cast, and one out of every ten men from the rest of Judah is chosen to move into the city.",
      "Verse two adds something the lot could not force. The people blessed all the men that willingly offered themselves to dwell at Jerusalem. Obligation and willingness sit side by side in the same verse.",
      "Then comes the list of who actually moved in. Leaders from Judah and Benjamin. Priests doing the work of the house of God. Levites in charge of the outward business, and singers, and gatekeepers.",
      "A wall means nothing left empty. Somebody has to actually live behind it, day after ordinary day, for the rebuilding to be finished.",
    ]),
    g(11, 20, 36, [
      "The rest of Israel, the priests, and the Levites settle in every town of Judah, each on his own family's old ground, all the way out toward the edge of the territory.",
      "Then Benjamin's towns get listed too. Geba, Michmash, Bethel, places with names going back to Joshua's conquest centuries earlier, now quietly repopulated by descendants of the very families who once held them.",
      "None of this made it into the celebration later in the book. It happened before anyone sang about it.",
      "Faithfulness is not always the loud moment. Sometimes it is a family moving back to a small forgotten town and just staying there.",
    ]),
    g(12, 1, 26, [
      "Nehemiah records the priests and Levites who first came back with Zerubbabel and Jeshua, then traces their families forward, generation by generation, down to a high priest named Jaddua.",
      "It says plainly this was written down in the book of the chronicles, kept current all the way to the days of Johanan. Not a memory anyone was trusting to hold onto. A record.",
      "The Levites' assignment gets stated too. To praise and give thanks, ward over against ward, according to the commandment of David the man of God. Roles set generations earlier, still being honored.",
      "This is the unglamorous half of legacy work. Writing down names so the next generation knows exactly who was trusted with what.",
    ]),
    g(12, 27, 47, [
      "At the wall's dedication, Levites are gathered from everywhere to bring gladness, thanksgiving, singing, cymbals, and harps. Priests and Levites purify themselves, then the gates, then the wall, then the people.",
      "Two choirs climb up onto the wall and walk it in opposite directions, one toward the dung gate, one the other way, until they meet at the temple. The wall itself becomes the instrument.",
      "God made them rejoice with great joy, the wives also and the children rejoiced, so that the joy of Jerusalem was heard even afar off. Not just leaders celebrating. Whole families, and a sound that traveled.",
      "After everything, threats, forced lists, years of grinding work, this is what finally carries. Joy, loud enough to be heard outside the city.",
    ]),
    g(13, 1, 31, [
      "The moment Nehemiah goes back to serve the king for a while, the covenant from chapter ten starts coming apart. Eliashib the priest, related to Tobiah by marriage, gives Tobiah a private room inside the temple courts.",
      "Nehemiah comes back and the first thing he does is throw all of Tobiah's furniture out of that chamber. He also finds the Levites unpaid and gone back to farming, and the Sabbath being worked like any other day, market stalls and all.",
      "He orders the city gates shut before sundown, restores the Levites' pay, and confronts families who intermarried with the surrounding nations, hard enough that verse twenty-five says he pulled out their hair.",
      "Almost every time he fixes something in this chapter, he adds a short prayer under his breath. Not looking for the crowd's approval. Looking for God to remember what it actually cost him.",
    ]),
  ],
  closing: [
    ["So that is Day 115.", 700],
    ["The covenant gets sealed by name, Jerusalem gets repopulated by lot and by choice, and the wall finally gets dedicated with two choirs walking its length in opposite directions.", 800],
    ["The joy of Jerusalem was heard even afar off. After years of threats, labor, and lists, that is the sound that finally carries.", 800],
    ["Then Nehemiah goes back to the king for a while, and the moment he is gone, the covenant starts leaking.", 800],
    ["Tobiah gets a room inside the temple. The Levites stop getting paid and go back to their fields. The Sabbath gets treated like any other day. Families intermarry again.", 850],
    ["Nehemiah comes back and fixes every one of it by force. Furniture thrown out of the temple. Gates shut by his own order. Hair pulled out. Oaths sworn again.", 850],
    ["Tomorrow, Esther 1 through 4. A very different story starts, far from Jerusalem, inside a Persian palace.", 850],
    ["For now, hold on to the line Nehemiah keeps repeating, after nearly every hard thing he does in this chapter.", 800],
    ["Remember me, O my God,", 750],
    ["for good.", 1200],
  ],
};
