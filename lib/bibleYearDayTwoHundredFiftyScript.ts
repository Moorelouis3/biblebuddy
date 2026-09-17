import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 250, written to the Day 1 standard.
 *
 * Ezekiel 40-42 is a guided tour of a temple that does not exist yet: gate
 * after gate, wall after wall, measured with the same exact care every time.
 * Six blocks, two per chapter, matching Day 249's pattern for a heavy
 * three-chapter reading.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 250,
  title: "Vision of a Restored Temple",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 250. Ezekiel gets a guide with a measuring reed today.", 750],
    ["This is fourteen years after Jerusalem fell. Half a lifetime in exile, still watching for God to keep a promise.", 800],
    ["No new judgment this time. Just a man whose whole body shines like brass, walking him through a temple that does not exist yet.", 850],
    ["Gate by gate, wall by wall, cubit by cubit. Nothing about this vision is left vague.", 800],
    ["We are in Ezekiel 40 through 42.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(40, 1, 24, [
      "In the five and twentieth year of our captivity... the hand of the LORD was upon me, and brought me thither. Twenty five years gone. Ezekiel is an old man now, still being shown things.",
      "A man stands waiting at the gate whose appearance was like the appearance of brass, with a line of flax in his hand, and a measuring reed. This is not a vision to feel. It is a vision to measure.",
      "Declare all that thou seest to the house of Israel. Ezekiel is not just seeing this for himself. He has to carry every cubit of it back to people who have nothing left standing.",
      "So the man starts at the east gate and measures the threshold, the little chambers, the posts, the porch, then moves to the outward court where thirty chambers sit on a pavement. Nothing about this house is going to be approximate.",
    ]),
    ez(40, 25, 49, [
      "The south gate gets measured exactly like the east one did, down to the seven steps going up to it. Then the inner court gates, measured a third time, come out fifty cubits by twenty five, same as before.",
      "That repetition is not filler. It is the point. A God accused of abandoning His house is shown taking the same careful measure of every single gate into it, on every side, without favoring one.",
      "Inside are eight tables to slay the burnt offering, the sin offering, and the trespass offering, and hooks fastened round about for the flesh of the offering. The plan accounts for the mess of worship, not just its ceremony.",
      "Chambers are set aside for the sons of Zadok, which come near to the LORD to minister unto him. Then, finally, the man brings Ezekiel to the porch of the house itself. Twenty five years ago this city burned. Now someone is measuring the steps up to its door.",
    ]),
    ez(41, 1, 13, [
      "He brought me to the temple, and measured the posts... this is the most holy place. The space gets smaller and the language gets weightier the closer they get to the center.",
      "Side chambers wrap the house three stories high, thirty in order, but they had not hold in the wall of the house. Support built around the center. Never load-bearing on it.",
      "He measures the height of the house, the thickness of the wall, the width between the chambers. Every surface gets the same attention the gates already got.",
      "So he measured the house, an hundred cubits long. The whole structure, the separate place, and the building all come out square. A house with no crooked lines anywhere in it.",
    ]),
    ez(41, 14, 26, [
      "The breadth of the face of the house eastward comes out an hundred cubits too. Galleries run three stories, ceiled with wood round about, the whole building measured by the same reed from the ground up.",
      "It was made with cherubims and palm trees, so that a palm tree was between a cherub and a cherub, and every cherub had two faces. The same image that guarded Eden's gate is carved into every wall of this house.",
      "This is the table that is before the LORD. A wooden altar, three cubits high, given the plainest possible name. Whatever else surrounds it, that is where the meeting actually happens.",
      "Even the doors get cherubims and palm trees carved into them, like as were made upon the walls. There is no plain, undecorated surface left in the whole building.",
    ]),
    ez(42, 1, 10, [
      "He brought me forth into the utter court, the way toward the north, into a chamber over against the separate place. Whole buildings of chambers now, measured before a single priest has been assigned to use them.",
      "Three stories of galleries, walkways, doors that all face north, laid out with the same patience as the temple itself. Nothing here is an afterthought room.",
      "The south side gets an identical set of chambers, measured the same way, right down to the doors. Whatever gets built north gets matched south, without exception.",
      "This much space, given over entirely to rooms nobody has entered yet, says something plain. A house built for God gets built for the people who will serve in it too.",
    ]),
    ez(42, 11, 20, [
      "There shall they lay the most holy things, and the meat offering, and the sin offering... for the place is holy. Storage gets the same weight as sacrifice. Holiness is not only what happens at the altar.",
      "They shall not go out of the holy place into the utter court, but there they shall lay their garments... and shall put on other garments. The priests change clothes before they walk back out to ordinary people.",
      "That single instruction says the most. What is holy does not get casually carried into what is common. The line between them is drawn on purpose, at the level of a robe.",
      "When the measuring is finally finished, the man walks Ezekiel around all four sides, east, north, south, west, five hundred reeds every time, a wall round about to make a separation between the sanctuary and the profane place. Tomorrow this whole empty structure gets its answer.",
    ]),
  ],
  closing: [
    ["So that is Day 250.", 700],
    ["Three chapters, and almost nothing happens except measuring.", 750],
    ["No sacrifice offered yet. No glory arrived yet. Just gate after gate, wall after wall, taken with the same exact care.", 800],
    ["Ezekiel is fourteen years past watching Jerusalem burn, and God hands him a measuring reed instead of another warning.", 800],
    ["That is its own kind of promise. You do not measure a house you plan to leave empty.", 850],
    ["Every gate matched. Every wall the same length on every side. Nothing about this restoration is careless.", 800],
    ["Tomorrow, Ezekiel 43 through 45. The glory that left this city years ago comes back through the east gate.", 850],
    ["For now, sit with the picture of a prophet in exile, measuring a temple that does not exist yet.", 750],
    ["Because Someone was planning to build it.", 1200],
  ],
};
