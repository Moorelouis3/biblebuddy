import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 251, written to the Day 1 standard.
 *
 * Ezekiel 43-45: the glory that left Jerusalem years ago comes home through
 * the east gate, that gate gets shut for good, the priesthood gets sorted by
 * who stayed faithful in exile, and the land and calendar both get put back
 * in order. Six blocks, two per chapter, matching Day 249 and 250's pattern.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 251,
  title: "Glory Returns and Worship Is Ordered",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 251. Yesterday was all measurements. Today the house finally gets used for what it was built for.", 750],
    ["The glory that walked out of Jerusalem years ago, over Ezekiel's own eyes, comes back through the east gate today.", 800],
    ["And once it is home, that gate gets shut. For good.", 850],
    ["Then the priests get their rules, the land gets divided, and the feasts get put back on the calendar.", 800],
    ["We are in Ezekiel 43 through 45.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(43, 1, 12, [
      "The glory of the God of Israel came from the way of the east... and I fell upon my face. This is the same glory Ezekiel watched leave through this same gate years ago. It is coming back through the same door.",
      "The spirit took me up, and brought me into the inner court; and, behold, the glory of the LORD filled the house. Three chapters of empty measurements just got filled with exactly what they were built for.",
      "The place of my throne, and the place of the soles of my feet, where I will dwell in the midst of the children of Israel for ever. God names this permanent residence, not a visit.",
      "Now let them put away their whoredom, and the carcases of their kings, far from me, and I will dwell in the midst of them for ever. The promise itself is unconditional. What it costs the people to keep the house clean is not.",
    ]),
    ez(43, 13, 27, [
      "The altar gets measured the same meticulous way the gates did, settle by settle, horn by horn, twelve cubits long, twelve broad, square. The same precision applied to worship that was already applied to the walls.",
      "Before anyone offers on this altar, the altar itself gets cleansed with a young bullock without blemish, and a ram out of the flock without blemish.",
      "Seven days shalt thou prepare every day a goat for a sin offering... seven days shall they purge the altar and purify it, and they shall consecrate themselves. A whole week just to make it fit to be used.",
      "Upon the eighth day, and so forward, the priests shall make your burnt offerings upon the altar... and I will accept you. Acceptance comes after the cleansing. Not instead of it.",
    ]),
    ez(44, 1, 14, [
      "This gate shall be shut, it shall not be opened, and no man shall enter in by it; because the LORD, the God of Israel, hath entered in by it. The very gate the glory just walked through gets closed behind it, permanently.",
      "Ye have brought into my sanctuary strangers, uncircumcised in heart, and uncircumcised in flesh, to be in my sanctuary, to pollute it. God names exactly what went wrong the last time this house stood.",
      "The Levites that are gone away far from me, when Israel went astray... they shall even bear their iniquity. Past failure does not just vanish. It carries a lasting cost, even after the relationship is restored.",
      "Yet they shall be ministers in my sanctuary... they shall not come near unto me, to do the office of a priest unto me. Demotion, not exile. They still serve. Just not at the same distance as before.",
    ]),
    ez(44, 15, 31, [
      "The priests the Levites, the sons of Zadok, that kept the charge of my sanctuary when the children of Israel went astray from me, they shall come near to me to minister unto me. Faithfulness during the exile earns nearness in what comes after it.",
      "No wool shall come upon them, whiles they minister... they shall not gird themselves with any thing that causeth sweat. Clothing chosen so a priest will not sweat while he serves. Even comfort gets written into holiness.",
      "They shall teach my people the difference between the holy and profane, and cause them to discern between the unclean and the clean. Their job is not only sacrifice. It is teaching people to see the line at all.",
      "I am their inheritance: and ye shall give them no possession in Israel: I am their possession. Every other tribe gets land. The priests get told plainly that God Himself is what they own.",
    ]),
    ez(45, 1, 12, [
      "When ye shall divide by lot the land for inheritance, ye shall offer an oblation unto the LORD, an holy portion of the land. Before anyone gets their share, God's portion is marked off first.",
      "The holy portion of the land shall be for the priests... and the Levites... have for themselves. Sanctuary, priesthood, and Levites all get named territory, not just spiritual duties.",
      "A portion shall be for the prince on the one side and on the other side of the oblation of the holy portion. Even the ruler's land gets defined in relation to what belongs to God, not the other way around.",
      "Let it suffice you, O princes of Israel: remove violence and spoil, and execute judgment and justice, take away your exactions from my people. The land laws end on an old complaint. Kings who stole from their own people are told plainly to stop.",
    ]),
    ez(45, 13, 25, [
      "Ye shall have just balances, and a just ephah, and a just bath. Before a single feast is described, the law insists that ordinary daily measuring, grain and oil and money, stays honest.",
      "The prince's part to give burnt offerings, and meat offerings, and drink offerings, in the feasts, and in the new moons, and in the sabbaths... to make reconciliation for the house of Israel. The ruler's job includes paying for the nation's worship, not just governing it.",
      "In the first month, in the fourteenth day of the month, ye shall have the passover, a feast of seven days; unleavened bread shall be eaten. The oldest feast in Israel's story gets reinstated in the newest vision of its future.",
      "In the seventh month... shall he do the like. The calendar itself gets restored along with the temple. Restoration is not just a building standing again. It is a whole rhythm of life starting back up.",
    ]),
  ],
  closing: [
    ["So that is Day 251.", 700],
    ["The glory came back through the same gate it left, and God said He is staying this time. For ever.", 800],
    ["Then that gate got shut. Nobody walks through the door the glory of God used.", 800],
    ["The priests who stayed faithful in exile got called near. The ones who had not got a smaller job, not none at all.", 800],
    ["Land got measured out, starting with God's own portion, before anyone else's.", 800],
    ["And the calendar got restored. Passover, back on the schedule, inside a vision about a temple nobody has built yet.", 850],
    ["Tomorrow, Ezekiel 46 through 48, the last three chapters of this book. A river flowing out of the temple, and the land finally split by tribe.", 850],
    ["For now, sit with a gate that only ever opens one direction.", 750],
    ["The LORD, the God of Israel, hath entered in by it.", 1200],
  ],
};
