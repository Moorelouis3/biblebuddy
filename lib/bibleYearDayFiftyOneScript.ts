import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 51, written to the Day 1 standard.
 *
 * Deuteronomy 14-17: clean and unclean food as a daily marker of identity,
 * the third-year tithe for the Levite and the poor, the seven-year release
 * of debt, a servant who stays by choice, the three pilgrim feasts, judges
 * warned against bribes, and a law for a king Israel has not asked for yet.
 * Seven blocks across one four-chapter reading, matching the shape Day 50
 * used.
 */

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 51,
  title: "Worship, Justice, and Leadership",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 51. Moses keeps circling the heart, and today he starts filling in what a circumcised heart actually does.", 750],
    ["It shows up at the dinner table, in how you treat debt, in who gets invited to the feast, and in who is allowed to judge.", 800],
    ["There is even a law here for a king Israel has not asked for yet, telling him in advance what he cannot become.", 800],
    ["And more than once, Moses stops mid-instruction to remind them why. Because you were slaves in Egypt. Memory is doing a lot of the work in this book.", 850],
    ["We are in Deuteronomy 14 through 17.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    deut(14, 1, 21, [
      "Before Moses lists a single animal, he tells them who they are. Ye are the children of the Lord your God. Everything after that is instruction for people who already belong to somebody.",
      "He starts with grief. Do not cut yourselves or shave a bald spot between your eyes for the dead. That was how the nations around them mourned. Israel is told to grieve differently, because even their sorrow belongs to God now.",
      "Then comes the long list. Ox, sheep, goat, yes. Camel, hare, pig, no. Fins and scales, yes. Everything else in the water, no. It reads like trivia. It is really a daily reminder, three meals a day, that this is a set-apart people.",
      "And the chapter ends on one strange, specific line. Do not boil a young goat in its mother's milk. Small and odd, and it will keep echoing later. For now, notice the pattern. Holiness here is not abstract. It is what is on your plate.",
    ]),
    deut(14, 22, 29, [
      "Every year, a tenth of the harvest goes to a meal eaten in God's presence. Not sent away. Eaten there, together, as a family.",
      "If the distance to that place is too far, Moses gives an oddly generous workaround. Turn the tithe into money, carry the money, and spend it there on whatever your soul desires. Oxen, sheep, wine, strong drink, whatever you want to eat. Worship here includes real joy, not just duty.",
      "And do not forget the Levite within your gates. He has no portion or inheritance with you, so your table is part of how he eats.",
      "Every third year, the tithe stays home instead of traveling, and it goes to the Levite, the stranger, the fatherless, and the widow, until they are satisfied. Provision for the people with no land and no safety net was written into the calendar, not left to chance.",
    ]),
    deut(15, 1, 11, [
      "Every seven years, Israel cancels debt. Not renegotiates it. Releases it. Moses calls it the Lord's release, which means it was never really about economics.",
      "He knows exactly what that law tempts people to do. Watch the calendar and stop lending as year seven gets close, so you never have to forgive anything. He names the temptation directly. Do not let a wicked thought keep your hand shut against your poor brother.",
      "The poor shall never cease out of the land. That line gets quoted as pessimism. Read in context, it is the reason for the command, not an excuse to skip it. Since the need never ends, the open hand cannot end either.",
      "Give, and do not let your heart grieve when you do it. God ties the blessing on their work directly to how they treat the person with less than them.",
    ]),
    deut(15, 12, 23, [
      "A Hebrew servant works six years and goes free in the seventh, and Moses will not let them send him away with nothing. Furnish him liberally from your flock, your floor, your winepress. Remember you were a slave in Egypt and the Lord redeemed you. That memory is the reason, every time.",
      "Then a strange exception. If the servant loves his master and does not want to leave, his ear gets pierced against the doorpost, and he stays for good. A bond chosen because of love, marked on the body, instead of one forced by debt.",
      "The firstborn males of the herd and flock belong to the Lord. No work out of the firstborn ox, no shearing the firstling sheep. The first and the best gets set aside before anyone touches the rest.",
      "And the blood rule returns one more time. Eat the meat, but pour out the blood like water. Some lines in this book repeat because Israel needed to hear them more than once.",
    ]),
    deut(16, 1, 17, [
      "Three festivals structure the whole year. Passover and unleavened bread remember the night they left Egypt in haste, eating the bread of affliction so they would never forget how fast deliverance came.",
      "Weeks comes at harvest, counted seven weeks from the sickle first touching the grain, and it is a feast built entirely around rejoicing. Your son, your daughter, your servant, the Levite, the stranger, the fatherless, the widow. Nobody sits it out.",
      "Tabernacles comes after everything is gathered in, another seven days, another command to rejoice, for the same reason. Because the Lord has blessed the work of your hands.",
      "Three times a year, every man appears before the Lord, and Moses adds one line that keeps it honest. Give as you are able. Worship here is not a flat tax. It scales to what you actually have.",
    ]),
    deut(16, 18, 22, [
      "Judges and officers go in every town, and their one job is just judgment. No twisting it, no favoritism, no bribes, because a gift blinds even wise eyes and perverts even righteous words.",
      "That which is altogether just shalt thou follow. Not partly just. Not just enough. Altogether.",
      "Then a short warning against two specific things. No grove of trees planted by God's altar, no carved image set up anywhere near it. Both were standard worship furniture for the nations around them.",
      "It is a small pairing that says something large. Justice in the town gate and purity at the altar are treated as one issue, not two. How you worship and how you judge are the same test.",
    ]),
    deut(17, 1, 20, [
      "No animal with a blemish gets offered to God, because handing God your damaged leftovers is called an abomination here. Then the chapter turns to someone caught worshipping the sun, moon, or stars in secret. The penalty is death, but only on the word of two or three witnesses. One accusation is never enough to kill a man.",
      "When a case is too hard for the local judges, it goes up to the priests and the judge at the central place, and the ruling there is final. Do not turn from it to the right or the left. A system needs somewhere the appeals stop.",
      "Then Moses looks ahead to a request they have not made yet. If you say, I will set a king over me like the nations, here is what that king cannot do. Multiply horses, multiply wives, multiply silver and gold for himself.",
      "And he must write his own copy of this law and read it every day of his life, so his heart is not lifted up above his brothers. A king in Israel was never supposed to rule above the law. He was supposed to be the man who read it the most.",
    ]),
  ],
  closing: [
    ["So that is Day 51.", 700],
    ["Clean and unclean food, a year that cancels debt, a servant who stays because he chooses to, and three feasts nobody sits out.", 800],
    ["Then judges warned against bribes, an altar warned against imitation, and a king warned in advance about horses, wives, and gold he is not supposed to collect.", 850],
    ["Underneath almost every law today is the same instruction, said a different way. Remember you were a slave. Remember what it cost to be free.", 850],
    ["That memory is supposed to turn into an open hand. Toward the poor, the Levite, the stranger, the fatherless, the widow.", 850],
    ["Tomorrow, Deuteronomy 18 through 21. Prophets, cities of refuge, and what happens when justice gets complicated.", 850],
    ["For now, hold on to the king who was never above the law.", 800],
    ["Reading it every day of his life.", 750],
    ["So his heart would not be lifted up.", 1200],
  ],
};
