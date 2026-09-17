import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 259, written to the Day 1 standard.
 *
 * Hosea 7-9: the darkest stretch of the book so far. The metaphors turn
 * strange and physical - a half-baked cake, a witless dove, a deceitful bow,
 * a prayer for barrenness - as Hosea shows exactly how far Israel is from
 * the mercy God named at the end of chapter 6. Six blocks, two per chapter,
 * so the hardest single verse in the reading (9:14) gets room of its own.
 */

const hos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hosea ${chapter}:${startVerse}-${endVerse}`,
  book: "hosea",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 259,
  title: "Israel's Wandering Heart",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 259. Yesterday God said what He actually wanted: mercy, not sacrifice.", 750],
    ["Today He shows exactly how far Israel is from either one.", 800],
    ["The images get strange fast. A cake left on the fire too long. A dove with no sense at all. A prayer for a womb that never opens.", 850],
    ["This is the darkest stretch of Hosea so far, and it does not let up until the very last verse.", 800],
    ["We are in Hosea 7 through 9.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    hos(7, 1, 9, [
      "When I would have healed Israel, then the iniquity of Ephraim was discovered, and the wickedness of Samaria. God reaches out to heal, and the healing itself is what exposes how deep the sickness actually runs.",
      "They are all adulterers, as an oven heated by the baker, who ceaseth from raising after he hath kneaded the dough, until it be leavened. A baker banks the fire low and lets it smolder while the dough works. Their scheming runs the same way: patient, hidden, timed to go off later.",
      "Ephraim is a cake not turned. One of the strangest lines in the whole book, and one of the clearest. Leave a cake on the fire too long without flipping it and it burns on one side while staying raw on the other. That is a nation trying to look like its neighbors and stay faithful to God at the same time.",
      "Strangers have devoured his strength, and he knoweth it not: yea, gray hairs are here and there upon him, yet he knoweth not. The quietest, most devastating image in the chapter. A decline so gradual that the one dying inside it never notices.",
    ]),
    hos(7, 10, 16, [
      "The pride of Israel testifieth to his face: and they do not return to the LORD their God, nor seek him for all this. Everything in this chapter has already happened to them, and still nobody turns around.",
      "Ephraim also is like a silly dove without heart: they call to Egypt, they go to Assyria. Not one strategy but two, played against each other, because a bird with no sense flies toward whichever hand looks safest that moment.",
      "They have not cried unto me with their heart, when they howled upon their beds. There was noise. There was even something that looked like grief. It just never once reached the one it should have been aimed at.",
      "They are like a deceitful bow. A good bow sends the arrow where the archer aims it. A deceitful one looks the same but never lands true. That is Israel's worship: the full shape of devotion, aimed everywhere except at God.",
    ]),
    hos(8, 1, 7, [
      "Set the trumpet to thy mouth. He shall come as an eagle against the house of the LORD. No slow build here. This is an alarm for something already inbound, fast and airborne.",
      "Israel shall cry unto me, My God, we know thee. The words are not false. They really do say His name. The chapter is about everything underneath that confession contradicting it.",
      "They have set up kings, but not by me: they have made princes, and I knew it not: of their silver and their gold have they made them idols. The same hands mint the currency and the gods, and neither one answers to God.",
      "For they have sown the wind, and they shall reap the whirlwind. One of the most quoted lines in all of Scripture on cause and consequence. Small, careless choices come back as something far bigger than the hand that planted them.",
    ]),
    hos(8, 8, 14, [
      "Israel is swallowed up: now shall they be among the Gentiles as a vessel wherein is no pleasure. A vessel nobody delights in is a vessel nobody bothers to keep. That is the actual cost of working so hard to impress the nations around them.",
      "Ephraim hath hired lovers. The same word used for the idols back in chapters one through three now describes their foreign alliances. Paying for affection instead of simply being loved, in politics same as in worship.",
      "I have written to him the great things of my law, but they were counted as a strange thing. God did not withhold instruction. He wrote it out plainly, and it was handled like something foreign in their own hands.",
      "Israel hath forgotten his Maker, and buildeth temples. More religion, not less. The shortage was never buildings or sacrifices. It was a forgotten name standing behind all of it.",
    ]),
    hos(9, 1, 9, [
      "Rejoice not, O Israel, for joy, as other people: for thou hast gone a whoring from thy God, thou hast loved a reward upon every cornfloor. Harvest season, and God tells them not to celebrate, because the joy itself has become the problem. They are thanking the harvest and skipping the one who grew it.",
      "They shall not dwell in the LORD's land... they shall eat unclean things in Assyria. The very food laws that marked them out as God's people would not even survive the exile that is coming.",
      "The days of visitation are come, the days of recompence are come; Israel shall know it: the prophet is a fool, the spiritual man is mad. When judgment finally lands, the same people who ignored the true prophets call them insane for having been right.",
      "The watchman of Ephraim was with my God: but the prophet is a snare of a fowler in all his ways. Even the office built to warn Israel had turned into a trap for it. There was no clean institution left standing.",
    ]),
    hos(9, 10, 17, [
      "I found Israel like grapes in the wilderness; I saw your fathers as the firstripe in the fig tree at her first time. God remembers exactly how this relationship began: real tenderness, a rare find in a hard place, long before any of this.",
      "But they went to Baal-peor, and separated themselves unto that shame. An old failure from the wilderness generation, still shaping the future of the children born centuries after it.",
      "Give them, O LORD: what wilt thou give? give them a miscarrying womb and dry breasts. The hardest line in the whole reading, and it is Hosea's own prayer, not God's threat. He has watched this long enough to ask for the judgment to be quick rather than drawn out.",
      "Ephraim is smitten, their root is dried up, they shall bear no fruit... they shall be wanderers among the nations. The chapter that opened with grapes in the wilderness closes with no fruit left on the vine at all.",
    ]),
  ],
  closing: [
    ["So that is Day 259.", 700],
    ["A cake left on the fire too long. A dove with no sense. A bow that never lands true.", 750],
    ["Every picture in these three chapters is something bent just slightly out of shape, and left that way long enough to ruin it.", 800],
    ["They sowed the wind. They reaped the whirlwind. Small choices came back as something far bigger than they could control.", 800],
    ["And by chapter 9, even Hosea cannot soften it. Give them a miscarrying womb and dry breasts. His own prayer, because he has watched this far enough to want it over quickly.", 850],
    ["The chapter that started with grapes in the wilderness ends with no fruit left on the vine.", 800],
    ["Tomorrow, Hosea 10 through 12. The sowing imagery keeps going, and Jacob himself gets named again.", 850],
    ["For now, sit with the vessel with no pleasure in it.", 800],
    ["That is what it costs to trade being chosen for being liked.", 750],
    ["Do not make that trade.", 1200],
  ],
};
