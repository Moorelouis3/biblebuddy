import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 182, written to the Day 1 standard.
 *
 * Proverbs 10-12: the book turns from wisdom's long speeches into a run of
 * short, mostly disconnected two-line sayings. No story, no named characters.
 * Six blocks split the ninety-one verses into manageable chunks, grouped by
 * the themes that keep resurfacing - the tongue, work, money, and the
 * righteous/wicked contrast that structures nearly every verse.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 182,
  title: "Words, Work, and Righteousness",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 182.", 650],
    ["Yesterday wisdom and folly were both shouting from the same street corner. Today the shouting stops.", 800],
    ["For a long stretch of this book now, there is no story at all. Just short sayings, one after another, almost all of them two lines.", 800],
    ["Some feel obvious. Some will stop you cold if you actually sit with them.", 800],
    ["The same handful of subjects keep coming back. Words. Work. Money. Who you become.", 800],
    ["We are in Proverbs 10 through 12.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(10, 1, 16, [
      "A wise son maketh a glad father: but a foolish son is the heaviness of his mother. That is the very first proverb in the whole collection, and it is about what a child does to a parent's heart, not the other way around.",
      "The hand of the diligent maketh rich, and he that gathereth in summer is a wise son. Wisdom here is not mystical. It is getting up early enough to bring the harvest in before the season ends.",
      "Hatred stirreth up strifes: but love covereth all sins. Not that love pretends nothing happened. It just refuses to keep digging the same wound back up.",
      "And then a line that should slow you down. The memory of the just is blessed: but the name of the wicked shall rot. One kind of life gets remembered. The other gets forgotten on purpose.",
    ]),
    g(10, 17, 32, [
      "In the multitude of words there wanteth not sin: but he that refraineth his lips is wise. The more anyone talks, the higher the odds something in it is a lie, a jab, or just noise.",
      "The tongue of the just is as choice silver: the heart of the wicked is little worth. Not volume. Value. A little of the right kind of speech outweighs a lot of the wrong kind.",
      "The blessing of the LORD, it maketh rich, and he addeth no sorrow with it. Compare that to gain made another way. Some money comes with a weight attached to it. This kind doesn't.",
      "As the whirlwind passeth, so is the wicked no more: but the righteous is an everlasting foundation. One image is violent and gone in a moment. The other is quiet and permanent. Permanent wins.",
    ]),
    g(11, 1, 15, [
      "A false balance is abomination to the LORD: but a just weight is his delight. That is a scale in a marketplace. God cares about the honesty of an ordinary business transaction enough to call cheating there an abomination.",
      "When pride cometh, then cometh shame: but with the lowly is wisdom. Pride and shame are pictured travelling together. You rarely get one without the other showing up right behind it.",
      "By the blessing of the upright the city is exalted: but it is overthrown by the mouth of the wicked. Notice the scale just widened. It is not only your own house at stake here. Your mouth can lift or wreck the whole place you live in.",
      "Where no counsel is, the people fall: but in the multitude of counsellors there is safety. Nobody who ever fell was warned by no one. They were warned, and they were the only vote in the room.",
    ]),
    g(11, 16, 31, [
      "As a jewel of gold in a swine's snout, so is a fair woman which is without discretion. A harsh image on purpose. Something valuable, wasted completely, because of where it ended up.",
      "He that troubleth his own house shall inherit the wind. You can spend a whole life chasing something and end up holding nothing you can even feel.",
      "The liberal soul shall be made fat: and he that watereth shall be watered also himself. Generosity is not pictured here as loss. It is pictured as the way you end up filled yourself.",
      "The fruit of the righteous is a tree of life; and he that winneth souls is wise. That line is bigger than the rest of the chapter. It stops being about your own character and starts being about who you help become someone else's.",
    ]),
    g(12, 1, 14, [
      "Whoso loveth instruction loveth knowledge: but he that hateth reproof is brutish. Loving correction and loving knowledge get named as the same thing here. You cannot actually want one without the other.",
      "A virtuous woman is a crown to her husband: but she that maketh ashamed is as rottenness in his bones. Both pictures are physical. One decorates him in public. The other rots him where nobody can see it.",
      "A righteous man regardeth the life of his beast: but the tender mercies of the wicked are cruel. How a person treats an animal that cannot repay them or complain about them tells you something a courtroom never could.",
      "The wicked is snared by the transgression of his lips: but the just shall come out of trouble. Trouble comes to both. The difference this chapter keeps drawing is what happens on the way out of it.",
    ]),
    g(12, 15, 28, [
      "There is that speaketh like the piercings of a sword: but the tongue of the wise is health. Same mouth, same few inches of muscle, and it is capable of either one.",
      "A fool's wrath is presently known: but a prudent man covereth shame. Not hiding the truth. Refusing to let every feeling out the second it shows up.",
      "Heaviness in the heart of man maketh it stoop: but a good word maketh it glad. This book keeps insisting that one ordinary sentence, said at the right moment, can change what somebody's whole body does.",
      "And the last line of the chapter, plain after ninety verses of two-line contrasts. In the way of righteousness is life; and in the pathway thereof there is no death.",
    ]),
  ],
  closing: [
    ["So that is Day 182.", 700],
    ["Ninety-some verses, almost none of them connected to each other, and they still keep circling the same handful of things.", 800],
    ["What you say. What you do with your hands. What you do with money. Who you become because of both.", 800],
    ["Nobody in these three chapters gets a name or a story. That is the point. This is not about one person's choice on one day. It is about the kind of life you build one sentence and one morning at a time.", 850],
    ["A wise son. A false balance. A jewel wasted on a pig. A tree of life. Small pictures, doing a lot of work.", 800],
    ["Tomorrow, Proverbs 13 through 15. More of the same shape, and it gets sharper about discipline and the heart.", 850],
    ["For now, hold on to the plainest line in the whole reading.", 800],
    ["In the way of righteousness is life.", 800],
    ["And in that path, there is no death.", 1200],
  ],
};
