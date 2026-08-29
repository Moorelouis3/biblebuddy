import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 38, written to the Day 1 standard.
 *
 * Leviticus 25-27 closes the book with the sabbath year, the Jubilee,
 * blessing and curse, and vows; Numbers 1 opens the next book with the
 * census. Seven blocks across two books, consolidating the heavier
 * chapters (25, 26) the way Day 36 consolidated Leviticus 17-20.
 */

const lev = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Leviticus ${chapter}:${startVerse}-${endVerse}`,
  book: "leviticus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 38,
  title: "Jubilee, Covenant, and Israel Counted",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 38.", 700],
    ["A rest year for the land. A full reset every fifty years. Then a long, plain list of what obedience buys and what walking away costs.", 850],
    ["And then the whole book changes. Leviticus ends, and Numbers opens with an army being counted, tribe by tribe.", 850],
    ["We are in Leviticus 25 through 27, and Numbers chapter 1.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    lev(25, 1, 22, [
      "Even the land gets a Sabbath. Every seventh year, no sowing, no pruning. Whatever grows on its own is free food for the owner, the servant, and the stranger alike.",
      "Count seven of those cycles, forty-nine years, and the fiftieth is the Jubilee. The trumpet sounds on the Day of Atonement, and liberty is proclaimed across the whole land.",
      "In that year, everyone returns to their own family and their own property. Land in Israel was never sold forever, only leased until the reset date.",
      "Someone always asks the obvious question. What do we eat in the seventh year if nothing is planted? God's answer is blunt. I will command a blessing in the sixth year, enough to carry you through. Trust tied to a calendar, not a feeling.",
    ]),
    lev(25, 23, 55, [
      "The reasoning behind all of it: the land was never really Israel's to sell. It is mine, God says. You are strangers and guests with me.",
      "If a poor man sold his property, a close relative had the right, really the responsibility, to buy it back for him. That's the kinsman redeemer role Ruth will need later.",
      "If a man had to sell himself into service to survive, he could not be worked as a slave for life. He served like a hired man, and he and his children went free at the Jubilee, because, God says, they are already my servants, brought out of Egypt.",
      "The whole chapter protects one thing. Nobody in Israel was supposed to end up permanently landless, or permanently owned by another Israelite. The reset was built into the calendar itself.",
    ]),
    lev(26, 1, 13, [
      "No idols, keep the Sabbaths, reverence the sanctuary. Then a list of what obedience brings. Rain in season, harvests so full the threshing runs into the grape harvest and the grape harvest runs into planting again.",
      "Peace in the land. Nothing to make you afraid. Wild animals removed. Five of you chasing off a hundred, a hundred chasing off ten thousand.",
      "And under all of it, the real point. I will set my tabernacle among you. I will walk among you. I will be your God, and you will be my people. The harvests are not the prize. Nearness is the prize.",
      "Egypt gets named again as the reason for it all. I have broken the bands of your yoke, and made you go upright. Freedom first, then blessing, then presence.",
    ]),
    lev(26, 14, 46, [
      "The warning escalates in a pattern that repeats through the whole chapter. If you still will not listen after this, I will punish you seven times more. That phrase, or something close to it, lands four separate times.",
      "What follows is graphic. Terror and disease. Drought. Wild animals. A siege so severe that parents eat their own children. This is not a distant threat. Most of it plays out almost verse for verse when Assyria and Babylon arrive centuries later.",
      "And after that whole avalanche, one condition changes everything. If they confess their sin, and the sin of their fathers, and their uncircumcised hearts are humbled. Not perfection. Confession.",
      "Then this. I will remember my covenant with Jacob, and Isaac, and Abraham. I will remember the land. Even after everything just described, I will not utterly destroy them, or break my covenant with them. Judgment is real here. It is never the last word.",
    ]),
    lev(27, 1, 34, [
      "The last chapter turns practical. If a man vows a person to God, there's a set price by age and by sex, lowered for anyone too poor to pay the full amount.",
      "The same logic covers animals, houses, and fields. A priest sets the value, and if the person wants it back, they add a fifth on top. You cannot swap something devoted to God for something worse, or even something better. Once given, it's given.",
      "One category allows no redemption at all. Anything devoted absolutely to the Lord cannot be bought back. And the tithe, a tenth of everything the land and the herd produce, already belongs to God before anyone decides to give it.",
      "Leviticus closes on that note. Not sacrifice. Ownership. What already belongs to God, and what a person can promise on top of it.",
    ]),
    num(1, 1, 46, [
      "Numbers opens one month after the tabernacle was finished, with God telling Moses to count every man twenty years old and up who can go to war.",
      "One leader from every tribe stands with Moses to help take the count. Reuben, Simeon, Judah, and on down the list. A whole nation reduced to names and numbers, tribe by tribe.",
      "The total comes to over six hundred thousand fighting men, not counting women, children, or the elderly. This is a nation now, not a family, and it is about to move as one.",
      "Judah comes out the largest tribe, over seventy-four thousand. The tribe the Messiah will come through is already, quietly, the biggest army in the camp.",
    ]),
    num(1, 47, 54, [
      "One tribe is deliberately left out of the count. The Levites are not numbered with the rest, because their job is not fighting. It is carrying the tabernacle.",
      "They take it down when the camp moves and set it back up when it stops. Anyone else who comes too close to it is put to death. The sacred and the ordinary are not allowed to blur.",
      "The Levites camp in a ring around the tabernacle itself, tent after tent, so Israel's camp is never exposed to God's presence without a buffer of people whose whole job is guarding it.",
      "One tribe was set apart from the fighting so the other twelve could camp safely around something holy. Numbers opens with a war census and closes this chapter with the one group excused from it.",
    ]),
  ],
  closing: [
    ["So that is Day 38.", 700],
    ["The land got its own Sabbath. Every fiftieth year, property went home and people went home, whether or not they could afford to buy it back themselves.", 850],
    ["Then Leviticus lays out blessing and curse in full, plain terms, and lands on the one condition that reopens the door after everything falls apart. Confess it. That's it.", 900],
    ["The last chapter turns to vows and valuations. What a person owed once they promised something to God, and what already belonged to Him before anyone promised anything.", 850],
    ["And then Numbers opens with an entire nation reduced to a headcount. Over six hundred thousand men able to fight, tribe by tribe, Judah already the largest.", 850],
    ["Except one tribe. The Levites were not counted with the rest, because their job was never the battlefield. It was standing guard around the tabernacle.", 850],
    ["Tomorrow, Numbers 2 through 5. Camp order and purity.", 850],
    ["For now, sit with the line under the curses.", 800],
    ["If they confess.", 750],
    ["I will remember.", 1200],
  ],
};
