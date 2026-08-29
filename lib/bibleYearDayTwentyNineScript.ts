import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 29, written to the Day 1 standard.
 *
 * Exodus 29-32: Aaron's ordination and the daily offering, the incense altar,
 * the census ransom and bronze laver, the holy anointing oil and incense,
 * Bezaleel and Aholiab called to build, the Sabbath sign, and then the
 * golden calf while Moses is still on the mountain. Seven blocks, teaching
 * kept to four lines so a four-chapter day still lands in range; the calf
 * narrative gets two blocks because it is the day's turn.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 29,
  title: "The Golden Calf",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 29. Yesterday God gave Moses the plans for the tabernacle and the priest's clothes. Today those plans become people.", 750],
    ["Aaron and his sons get washed, dressed, and anointed for the job.", 750],
    ["And while that ordination is still happening on paper, up on the mountain, the people at the bottom of it get tired of waiting.", 800],
    ["They melt down their jewelry and build a calf out of it.", 850],
    ["Same forty days. Two completely different answers to the same question. How do you approach God.", 900],
    ["We are in Exodus 29 through 32.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(29, 1, 9, [
      "God tells Moses exactly how to set Aaron apart for this job. Wash him with water, dress him in the priestly garments, pour the anointing oil on his head.",
      "None of it is Aaron's idea and none of it is optional. He does not nominate himself for this.",
      "His sons get the same treatment beside him, and God calls it a statute forever. This job passes down. It is not chosen.",
      "Before a single sacrifice happens, the man himself has to be washed and covered. God deals with the priest before He deals with the sin.",
    ]),
    g(29, 10, 46, [
      "Three animals die before Aaron ever serves a single day. A bull for sin, a ram burned whole, a second ram of ordination, its blood put on his ear, his thumb, his big toe.",
      "Ear to hear God, hand to do the work, foot to walk it out. Every part of him gets marked before he goes near the altar.",
      "Then God sets up a sacrifice that never stops. One lamb every morning, one every evening, at the door of the tent, forever.",
      "And He tells Moses exactly why, in one line at the end of it all. I will dwell among the children of Israel, and will be their God.",
    ]),
    g(30, 1, 21, [
      "An altar for incense goes right next to the ark, so morning and evening prayer rises the same moment the lamps get tended.",
      "Then a census tax. Rich or poor, everyone pays the same half shekel, because no one's life costs more ransom than anyone else's.",
      "And a bronze basin, just for washing hands and feet, sitting between the altar and the tent.",
      "It is easy to skip past, but the warning attached to it is not. Wash, or die. Coming near God was never meant to feel casual.",
    ]),
    g(30, 22, 38, [
      "God gives Moses a recipe. Myrrh, cinnamon, calamus, cassia, olive oil, blended by a perfumer into a holy anointing oil.",
      "That exact formula gets used for one thing only, anointing the tabernacle and the priests, and no one else is allowed to wear it.",
      "Same with the incense. A specific blend, burned in one place, and copying it for yourself gets you cut off from the people.",
      "God is not being possessive over a smell. He is teaching Israel that some things stay set apart, or they stop meaning anything.",
    ]),
    g(31, 1, 18, [
      "God calls two men by name to build all of this. Bezaleel and Aholiab, filled, He says, with His own Spirit, for wisdom and understanding and craftsmanship.",
      "Sit with that. Skill with your hands, cutting stone, working gold, is called a gift of the Spirit of God, long before anyone writes a hymn about it.",
      "Then God repeats the Sabbath command one more time, right before the building starts. Six days of work. One day that belongs to Him.",
      "The chapter ends with two tablets of stone, written with the finger of God Himself. That is what Moses is carrying down the mountain.",
    ]),
    g(32, 1, 14, [
      "Moses is gone forty days, and the people cannot wait that long. Make us gods, they tell Aaron, because we do not know what happened to this Moses.",
      "Aaron does not resist. He collects the earrings, melts them down, shapes a calf, and calls it worship. Tomorrow is a feast to the Lord, he says, about a statue he just made.",
      "God sees it from the mountain and tells Moses to go down, calling them thy people, not His own. Then He offers to start over with Moses alone.",
      "And Moses argues Him out of it. Remember Abraham, Isaac, and Israel. He reminds God of God's own promise, and the Lord repents of the evil He thought to do.",
    ]),
    g(32, 15, 35, [
      "Moses comes down carrying tablets written by God, sees the calf and the dancing, and smashes them at the bottom of the mountain.",
      "The covenant breaks in his hands the moment he sees what the covenant people are doing.",
      "He burns the calf, grinds it to powder, and makes them drink it. Then the Levites go through the camp with swords, and three thousand die that day.",
      "Moses goes back up and offers something nobody asked him to. If you will not forgive them, blot me out of your book instead. He offers to trade his own name for theirs.",
    ]),
  ],
  closing: [
    ["So that is Day 29.", 700],
    ["A priest washed and anointed, an altar for incense, a tax for a census, a basin for washing, an oil no one else could wear, two craftsmen filled with God's own Spirit, and a golden calf that broke the covenant in Moses's hands.", 750],
    ["Two ways of approaching God, happening on the same mountain, in the same forty days.", 800],
    ["One is careful, specific, washed, and set apart.", 800],
    ["The other is impatient, and settles for a god you can see because the real one is taking too long.", 850],
    ["And when it falls apart, Moses does not walk away from the people who wrecked it. He offers to be erased instead of them.", 850],
    ["Tomorrow, Exodus 33 through 36. Moses asks to see God's glory, and gets an answer nobody expects.", 850],
    ["For now, hold on to what Moses asked for.", 800],
    ["Blot me out of your book.", 750],
    ["Instead of them.", 1200],
  ],
};
