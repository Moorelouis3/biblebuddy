import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 189, written to the Day 1 standard.
 *
 * Proverbs 31 closes the book with a mother's charge to a king and then the
 * acrostic poem about the capable woman, praised entirely for what her hands
 * do. Ecclesiastes 1-2 opens immediately after in a different voice
 * entirely: Solomon running wisdom, pleasure, and monument-building as
 * experiments and calling all three vanity. Six blocks across two books.
 */

const prov = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const eccl = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ecclesiastes ${chapter}:${startVerse}-${endVerse}`,
  book: "ecclesiastes",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 189,
  title: "Noble Wisdom and Life's Vapor",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 189.", 650],
    ["Proverbs 31, then Ecclesiastes 1 and 2.", 750],
    ["A poem about a woman who never stops moving, praised for what her hands actually do. Then a king who built everything a person could want, and called all of it a chasing after wind.", 800],
    ["One book closes on a life fully lived. The next opens by asking whether any of it matters.", 800],
    ["We are in Proverbs 31, Ecclesiastes 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    prov(31, 1, 9, [
      "The words of king Lemuel, the prophecy that his mother taught him. Give not thy strength unto women, nor thy ways to that which destroyeth kings. This chapter opens with a mother, not a father, handing down the rules for how to actually rule.",
      "It is not for kings, O Lemuel, it is not for kings to drink wine... lest they drink, and forget the law, and pervert the judgment of any of the afflicted. The warning isn't really about wine. It's about who gets hurt when a leader's judgment goes soft. The afflicted, not the king.",
      "Give strong drink unto him that is ready to perish, and wine unto those that be of heavy hearts. Let him drink, and forget his poverty. The same thing that ruins a king is offered here as mercy to someone with nothing left. Context decides whether it helps or destroys.",
      "Open thy mouth for the dumb in the cause of all such as are appointed to destruction. Open thy mouth, judge righteously, and plead the cause of the poor and needy. Lemuel's mother doesn't ask him to be strong. She asks him to speak up for people who can't speak for themselves.",
    ]),
    prov(31, 10, 31, [
      "Who can find a virtuous woman? for her price is far above rubies. The heart of her husband doth safely trust in her. The chapter shifts completely here, into a poem where every line is something she does, not something she is.",
      "She riseth also while it is yet night, and giveth meat to her household... She considereth a field, and buyeth it: with the fruit of her hands she planteth a vineyard. This isn't a decoration in someone else's house. She's making decisions, buying land, running a business.",
      "She stretcheth out her hand to the poor; yea, she reacheth forth her hands to the needy. Strength and honour are her clothing; and she shall rejoice in time to come. Her strength is aimed outward, at people with less than her, not just inward at her own household.",
      "Favour is deceitful, and beauty is vain: but a woman that feareth the LORD, she shall be praised. Give her of the fruit of her hands; and let her own works praise her in the gates. Thirty verses on what she does, and it ends by saying that's exactly what should be praised. Not her face. Her hands.",
    ]),
    eccl(1, 1, 11, [
      "The words of the Preacher, the son of David, king in Jerusalem. Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. New book, and a completely different voice. Solomon opens by naming the conclusion before he's given a single argument for it.",
      "One generation passeth away, and another generation cometh: but the earth abideth for ever. The sun also ariseth, and the sun goeth down, and hasteth to his place where he arose. People are temporary. The sun, the wind, the sea just keep repeating the same circuit, generation after generation.",
      "All the rivers run into the sea; yet the sea is not full; unto the place from whence the rivers come, thither they return again. Something can be endlessly filled and never actually change. That's the picture handed to you before the Preacher even gets to human effort.",
      "The thing that hath been, it is that which shall be... and there is no new thing under the sun. This is the line the whole book keeps circling back to. Not that nothing happens. That nothing happening is actually new.",
    ]),
    eccl(1, 12, 18, [
      "I the Preacher was king over Israel in Jerusalem. And I gave my heart to seek and search out by wisdom concerning all things that are done under heaven. Solomon isn't guessing at this from the outside. He had the resources to actually run the experiment.",
      "I have seen all the works that are done under the sun; and, behold, all is vanity and vexation of spirit. Vexation of spirit shows up here for the first time, and it will not be the last. Chasing wind is the picture underneath that phrase.",
      "I communed with mine own heart, saying, Lo, I am come to great estate, and have gotten more wisdom than all they that have been before me in Jerusalem. This isn't false modesty. He states it as a fact before he tells you what it cost him.",
      "For in much wisdom is much grief: and he that increaseth knowledge increaseth sorrow. The very thing everyone assumes will satisfy him is the thing he says made him sadder, not less.",
    ]),
    eccl(2, 1, 11, [
      "I said in mine heart, Go to now, I will prove thee with mirth, therefore enjoy pleasure: and, behold, this also is vanity. Wisdom didn't satisfy him, so he runs the next experiment. Pleasure. Same result, named before he even describes it.",
      "I made me great works; I builded me houses; I planted me vineyards... I made me pools of water... I gathered me also silver and gold. Verse after verse of nothing but what he built and acquired. No king before him had more to point to.",
      "Whatsoever mine eyes desired I kept not from them, I withheld not my heart from any joy. He isn't describing restraint here. He's describing a man who denied himself nothing, on purpose, as an experiment.",
      "Then I looked on all the works that my hands had wrought... and, behold, all was vanity and vexation of spirit, and there was no profit under the sun. Every house, every vineyard, every pool of water, and the verdict is identical to the one wisdom got.",
    ]),
    eccl(2, 12, 26, [
      "Then I saw that wisdom excelleth folly, as far as light excelleth darkness. He isn't taking it back. Wisdom is still better than folly. That much he'll still say plainly.",
      "The wise man's eyes are in his head; but the fool walketh in darkness: and I myself perceived also that one event happeneth to them all... And how dieth the wise man? as the fool. The advantage is real, and it still ends at the exact same grave as the fool's.",
      "There is a man whose labour is in wisdom, and in knowledge, and in equity; yet shall he leave it for his portion to a man that hath not laboured therein. Everything he built gets handed to someone who never lifted a finger for it. He calls that a great evil, not just bad luck.",
      "There is nothing better for a man, than that he should eat and drink, and that he should make his soul enjoy good in his labour. This also I saw, that it was from the hand of God. After two chapters of dead ends, the first real answer is small. Not wealth, not a legacy. The ordinary meal in front of you, received as a gift.",
    ]),
  ],
  closing: [
    ["So that is Day 189.", 700],
    ["Seventy-five verses. The end of Proverbs, and the opening two chapters of a very different book.", 750],
    ["A woman praised for thirty verses of what her hands actually did, not what she looked like.", 800],
    ["And a king who built more than anyone before him, kept nothing from himself that he wanted, and called all of it vanity and vexation of spirit.", 800],
    ["Wisdom still beats folly. He says that plainly. It just doesn't buy an exemption from the same grave everyone else gets.", 850],
    ["And after two chapters of dead ends, the first real answer in the whole book is small. Eat your bread. Enjoy your work. Receive it as a gift, not a prize you earned.", 850],
    ["Tomorrow, Ecclesiastes 3 through 5. A time for everything, and a warning about what your mouth owes God.", 850],
    ["For now, sit with the phrase this book keeps repeating.", 750],
    ["Vanity of vanities.", 750],
    ["All is vanity.", 1200],
  ],
};
