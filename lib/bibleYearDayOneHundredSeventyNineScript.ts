import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 179, written to the Day 1 standard.
 *
 * Proverbs 1-3: the Psalms end and the book changes shape entirely, a
 * father instructing his son. Six blocks covering all of Proverbs 1-3 in
 * order, splitting chapter 1 into three scenes and taking 2 and 3 each in
 * two larger sweeps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 179,
  title: "Wisdom Begins With the Fear of the Lord",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 179.", 650],
    ["Yesterday the Psalms ended on praise. Today the whole book changes shape.", 800],
    ["No more songs to God. Now it is a father, talking straight to his son.", 800],
    ["Wisdom herself shows up as a woman, shouting in the street, begging people to listen before it is too late.", 800],
    ["We are in Proverbs 1 through 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(1, 1, 9, [
      "The proverbs of Solomon the son of David, king of Israel. Before any instruction starts, the book names exactly who wrote it and why he had the standing to.",
      "The fear of the Lord is the beginning of knowledge: but fools despise wisdom and instruction. This is the one line the whole book stands on. Not the end of knowledge. The beginning of it.",
      "My son, hear the instruction of thy father, and forsake not the law of thy mother. Wisdom here does not come from a stranger. It comes from the two people who already know you.",
      "For they shall be an ornament of grace unto thy head, and chains about thy neck. Obedience gets pictured as jewelry. Something you would actually want to wear, not just a rule to survive.",
    ]),
    g(1, 10, 19, [
      "My son, if sinners entice thee, consent thou not. The warning is specific. Not vague evil in general. Real people, inviting you somewhere.",
      "Come with us, let us lay wait for blood, let us lurk privily for the innocent without cause. Their pitch is not subtle once it is said out loud. Murder, dressed up as adventure.",
      "Cast in thy lot among us; let us all have one purse. Part of the pull is belonging. Shared money, shared risk, shared crime.",
      "For their feet run to evil, and make haste to shed blood... they lay wait for their own blood; they lurk privily for their own lives. The proverb turns the trap around. The violence they plan for others is the same violence that ends up killing them.",
    ]),
    g(1, 20, 33, [
      "Wisdom crieth without; she uttereth her voice in the streets. Wisdom is not hiding in a temple or a scroll. She is out in public, shouting where people already are.",
      "How long, ye simple ones, will ye love simplicity? and the scorners delight in their scorning, and fools hate knowledge? Three different kinds of person named here, and none of them are stupid by accident. They love it.",
      "Because I have called, and ye refused... I also will laugh at your calamity; I will mock when your fear cometh. This is hard to hear, and the text does not soften it. Wisdom offered and ignored does not wait around forever.",
      "But whoso hearkeneth unto me shall dwell safely, and shall be quiet from fear of evil. The chapter does not end on the threat. It ends by naming exactly what listening buys you. Safety, and a quiet mind.",
    ]),
    g(2, 1, 22, [
      "If thou seekest her as silver, and searchest for her as for hid treasures. Wisdom is not handed over for free. It takes the same effort you would spend digging for money.",
      "Then shalt thou understand the fear of the Lord, and find the knowledge of God. That effort is not the whole goal. It is what gets you there.",
      "To deliver thee from the way of the evil man... to deliver thee from the strange woman, even from the stranger which flattereth with her words. Two specific dangers get named outright, violent men and a woman who talks her way past your guard, and wisdom's job in both cases is the same. Keep you out of houses that lead to death.",
      "For the upright shall dwell in the land... but the wicked shall be cut off from the earth. The chapter ends by drawing the line as plainly as it can. Where you end up depends on which path you actually walked.",
    ]),
    g(3, 1, 20, [
      "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths. Maybe the most quoted line in the whole book, and it is a flat instruction, not a suggestion.",
      "Be not wise in thine own eyes: fear the Lord, and depart from evil. The warning right after trusting God is against trusting yourself too much.",
      "My son, despise not the chastening of the Lord... for whom the Lord loveth he correcteth; even as a father the son in whom he delighteth. Discipline gets reframed here. Not punishment. Evidence of being loved.",
      "She is more precious than rubies... the Lord by wisdom hath founded the earth. Wisdom stops being just good advice at this point. It is named as the thing God himself used to build the world.",
    ]),
    g(3, 21, 35, [
      "When thou liest down, thou shalt not be afraid: yea, thou shalt lie down, and thy sleep shall be sweet. After all the warnings, this is what wisdom is actually for. Sleeping well because you are not carrying a guilty conscience or plotting revenge.",
      "Withhold not good from them to whom it is due, when it is in the power of thine hand to do it. Say not unto thy neighbour, Go, and come again, and to morrow I will give; when thou hast it by thee. Wisdom gets specific and small here. Do not put off a kindness you are already able to do today.",
      "Devise not evil against thy neighbour... strive not with a man without cause, if he have done thee no harm. Envy thou not the oppressor, and choose none of his ways. Three separate warnings against three separate ways of souring a relationship with someone who never wronged you.",
      "The curse of the Lord is in the house of the wicked: but he blesseth the habitation of the just... he giveth grace unto the lowly. The chapter ends the same place chapter one did. Two paths, two very different outcomes, named without apology.",
    ]),
  ],
  closing: [
    ["So that is Day 179.", 700],
    ["The Psalms sang praise to God. Proverbs is a father teaching his son how to actually live.", 800],
    ["It starts and ends the same way. The fear of the Lord is the beginning of knowledge, and two paths that lead to two different places.", 800],
    ["In between, wisdom gets pictured as a woman shouting in the street, and as treasure worth digging for like silver.", 800],
    ["And it gets specific. Do not run with violent men. Do not let a stranger flatter you into her house. Do not put off a kindness you can do today.", 850],
    ["Tomorrow, Proverbs 4 through 6. The father keeps talking, and the warnings get sharper.", 850],
    ["For now, hold on to the line this whole book stands on.", 800],
    ["The fear of the Lord is the beginning of knowledge.", 1200],
  ],
};
