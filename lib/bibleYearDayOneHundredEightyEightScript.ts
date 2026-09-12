import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 188, written to the Day 1 standard.
 *
 * Proverbs 28-30: the cover-versus-confess line that names the day's first
 * half, a run of rulers and poor men that keeps circling back to the same
 * point, and then Agur's words in chapter 30 - a total shift in voice, a man
 * who opens by calling himself stupid and closes with the most honest prayer
 * in the book. Six blocks split the eighty-eight verses across the three
 * chapters, following canonical order.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 188,
  title: "Justice, Confession, and Wonder",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 188.", 650],
    ["Proverbs 28 through 30 today.", 750],
    ["A line about what happens when you hide a sin versus when you admit it. A run of rulers and the people under them.", 800],
    ["And then a whole new voice shows up in chapter 30, and opens by calling himself stupid.", 800],
    ["We are in Proverbs 28 through 30.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(28, 1, 14, [
      "The wicked flee when no man pursueth: but the righteous are bold as a lion. Guilt invents pursuers where there are none. A clean conscience doesn't flinch at a sound in the dark.",
      "He that by usury and unjust gain increaseth his substance, he shall gather it for him that will pity the poor. Wealth built on squeezing people doesn't stay put. Proverbs says it ends up back with the poor anyway, just by a longer road.",
      "Whoso causeth the righteous to go astray in an evil way, he shall fall himself into his own pit. The trap gets built for someone else and catches its own builder instead.",
      "He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy. This is the line the day is named for. Hiding a sin keeps it alive. Naming it and leaving it is the only door out.",
    ]),
    g(28, 15, 28, [
      "As a roaring lion, and a ranging bear; so is a wicked ruler over the poor people. Two animals that don't reason with what they're hunting. That is the picture given for power with no conscience over people with no defense.",
      "He that tilleth his land shall have plenty of bread: but he that followeth after vain persons shall have poverty enough. Steady, unglamorous work outlasts chasing whoever looks exciting. Every time, according to this book.",
      "A faithful man shall abound with blessings: but he that maketh haste to be rich shall not be innocent. Speed toward money and innocence rarely survive in the same person. The hurry itself is the warning sign.",
      "He that giveth unto the poor shall not lack: but he that hideth his eyes shall have many a curse. Looking away from someone in need isn't neutral here. It's named right alongside cursing.",
    ]),
    g(29, 1, 14, [
      "He, that being often reproved hardeneth his neck, shall suddenly be destroyed, and that without remedy. It isn't the first correction that ruins a person. It's refusing every one that comes after it.",
      "When the righteous are in authority, the people rejoice: but when the wicked beareth rule, the people mourn. Proverbs keeps circling back to this. Who is in charge changes how a whole population feels, not just how it's governed.",
      "The righteous considereth the cause of the poor: but the wicked regardeth not to know it. Notice the wording. The wicked man's failure isn't cruelty first. It's refusing to even find out.",
      "A fool uttereth all his mind: but a wise man keepeth it in till afterwards. Saying everything you think the moment you think it isn't honesty. It's just a fool with no filter.",
    ]),
    g(29, 15, 27, [
      "The rod and reproof give wisdom: but a child left to himself bringeth his mother to shame. Correct thy son, and he shall give thee rest; yea, he shall give delight unto thy soul. Discipline isn't framed here as harshness. It's framed as the only path to real rest later.",
      "Where there is no vision, the people perish: but he that keepeth the law, happy is he. Without direction, people don't just wander. They come apart. Proverbs ties survival itself to having something to aim at.",
      "A man's pride shall bring him low: but honour shall uphold the humble in spirit. The same law running through this whole book. Pride and humility always land somewhere, just never where you'd expect.",
      "The fear of man bringeth a snare: but whoso putteth his trust in the LORD shall be safe. Caring more about what people think than what God says is named as a trap here, not just bad advice.",
    ]),
    g(30, 1, 9, [
      "The words of Agur the son of Jakeh, even the prophecy. Surely I am more brutish than any man, and have not the understanding of a man. A new voice enters Proverbs here, and he opens by calling himself stupid. After twenty-nine chapters of confident sayings, that is a strange way to start a chapter.",
      "Who hath ascended up into heaven, or descended? who hath gathered the wind in his fists? who hath bound the waters in a garment? what is his name, and what is his son's name, if thou canst tell? Agur stacks up questions no human can answer, then dares you to try. That's the whole point. Some things are simply out of reach.",
      "Every word of God is pure: he is a shield unto them that put their trust in him. Add thou not unto his words, lest he reprove thee, and thou be found a liar. Agur can't explain God, and he still trusts God's word completely. Not knowing everything and trusting fully are not opposites here.",
      "Remove far from me vanity and lies: give me neither poverty nor riches; feed me with food convenient for me: lest I be full, and deny thee... or lest I be poor, and steal, and take the name of my God in vain. This might be the most honest prayer in the whole book. He doesn't ask to be blessed. He asks for exactly enough, because he doesn't trust himself with more or less.",
    ]),
    g(30, 10, 33, [
      "There is a generation that curseth their father, and doth not bless their mother. There is a generation that are pure in their own eyes, and yet is not washed from their filthiness. Agur lists four kinds of people who look fine to themselves and are anything but. None of them think the warning is about them.",
      "There be three things which are too wonderful for me, yea, four which I know not: the way of an eagle in the air; the way of a serpent upon a rock; the way of a ship in the midst of the sea; and the way of a man with a maid. Four things that leave no trace once they've happened. Agur admits he can watch all of them and still not understand how they work.",
      "The ants are a people not strong, yet they prepare their meat in the summer... the conies are but a feeble folk, yet make they their houses in the rocks... the spider taketh hold with her hands, and is in kings' palaces. Four small, unimpressive creatures, each one wiser than its size would suggest. None of them need strength to succeed.",
      "If thou hast done foolishly in lifting up thyself, or if thou hast thought evil, lay thine hand upon thy mouth. Surely the churning of milk bringeth forth butter... so the churning of wrath bringeth forth strife. The whole reading ends on one image. Keep stirring anger, and strife is exactly what comes out. Every time.",
    ]),
  ],
  closing: [
    ["So that is Day 188.", 700],
    ["Eighty-eight verses across three chapters, and they end up somewhere unexpected.", 750],
    ["Twenty-nine chapters of Solomon's confident sayings, and then Agur opens chapter thirty by calling himself stupid.", 800],
    ["He can't answer who gathered the wind in his fists, or who bound the waters in a garment. And he trusts God's word completely anyway.", 800],
    ["He doesn't ask God for wealth or poverty. Just enough. Because he knows exactly what he'd do with either extreme.", 850],
    ["And the confession versus the cover-up from chapter twenty-eight is still sitting underneath all of it. Hiding a sin keeps it alive. Naming it is the only way out.", 850],
    ["Tomorrow, Proverbs 31 and Ecclesiastes 1 and 2. A poem about a noble wife, then a king who tried everything under the sun.", 850],
    ["For now, here is the line to carry.", 750],
    ["Every word of God is pure.", 750],
    ["He is a shield unto them that put their trust in him.", 1200],
  ],
};
