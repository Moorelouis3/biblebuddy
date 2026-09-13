import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 192, written to the Day 1 standard.
 *
 * Ecclesiastes 9-11: the same fate catching the wise and the fool alike, a
 * poor man who saves a city and is forgotten, a king's court gone upside
 * down, and closing counsel to work without knowing which effort will pay
 * off and to enjoy youth without forgetting it answers to God. Six blocks
 * across three chapters.
 */

const eccl = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ecclesiastes ${chapter}:${startVerse}-${endVerse}`,
  book: "ecclesiastes",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 192,
  title: "The Race Is Not to the Swift",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 192.", 650],
    ["Ecclesiastes 9 through 11.", 700],
    ["A poor man saves an entire city under siege, and nobody remembers his name.", 800],
    ["A little folly can undo years of a good reputation, the same way one dead fly ruins a jar of good ointment.", 800],
    ["And a young man gets told to enjoy his life, then reminded that none of it is free of consequence.", 850],
    ["We are in Ecclesiastes 9, 10, and 11.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    eccl(9, 1, 10, [
      "There is one event to the righteous, and to the wicked; to the good and to the clean, and to the unclean. He states it without softening it. Death does not sort people by category. It comes for everyone the same way.",
      "A living dog is better than a dead lion. For the living know that they shall die: but the dead know not any thing. A lion is noble and a dog is despised, but the comparison isn't about dignity. It's about the sheer advantage of still being alive.",
      "Go thy way, eat thy bread with joy, and drink thy wine with a merry heart; for God now accepteth thy works. This is not resignation. He's naming ordinary pleasure, a meal, a cup of wine, as something God already approves of, not something you have to earn first.",
      "Whatsoever thy hand findeth to do, do it with thy might; for there is no work, nor device, nor knowledge, nor wisdom, in the grave, whither thou goest. The urgency is real. Whatever you're going to do with your hands, do it now, because the grave closes that door for good.",
    ]),
    eccl(9, 11, 18, [
      "The race is not to the swift, nor the battle to the strong... but time and chance happeneth to them all. Talent and effort matter, but they don't guarantee the outcome. Something outside your control gets a vote too.",
      "As the fishes that are taken in an evil net, and as the birds that are caught in the snare; so are the sons of men snared in an evil time, when it falleth suddenly upon them. Nobody sees their own bad moment coming. It just closes on them.",
      "There was found in it a poor wise man, and he by his wisdom delivered the city; yet no man remembered that same poor man. This one stings. He saved everyone. He got no credit and no memory. Being right and useful doesn't guarantee anyone will thank you for it.",
      "Wisdom is better than weapons of war: but one sinner destroyeth much good. Wisdom builds slowly, over years. One reckless person can tear that same good down fast. The math is not fair, and he says so plainly.",
    ]),
    eccl(10, 1, 11, [
      "Dead flies cause the ointment of the apothecary to send forth a stinking savour: so doth a little folly him that is in reputation for wisdom and honour. A reputation built over a lifetime can be spoiled by one small, stupid moment. That's how fragile it actually is.",
      "If the spirit of the ruler rise up against thee, leave not thy place; for yielding pacifieth great offences. Practical advice for dealing with someone else's anger, especially someone with power over you. Staying calm and staying put defuses more than fighting back does.",
      "Folly is set in great dignity, and the rich sit in low place... I have seen servants upon horses, and princes walking as servants upon the earth. He's watched the world get scrambled. Unqualified people end up ruling, and capable people end up serving. He names it as something he's actually seen, not just a theory.",
      "He that diggeth a pit shall fall into it; and whoso breaketh an hedge, a serpent shall bite him. Even ordinary labor carries its own risk. Every job, done carelessly, can turn on the person doing it.",
    ]),
    eccl(10, 12, 20, [
      "The words of a wise man's mouth are gracious; but the lips of a fool will swallow up himself. A fool doesn't need an enemy. His own mouth eventually does the damage on its own.",
      "Woe to thee, O land, when thy king is a child... Blessed art thou, O land, when thy king is the son of nobles, and thy princes eat in due season, for strength, and not for drunkenness. A whole nation suffers under an immature ruler. Self-control at the top isn't a small thing. It shapes everyone underneath it.",
      "By much slothfulness the building decayeth; and through idleness of the hands the house droppeth through. Neglect is quiet. Nobody notices it happening until the roof is already caving in.",
      "Curse not the king, no not in thy thought... for a bird of the air shall carry the voice, and that which hath wings shall tell the matter. Even private contempt, the kind you never say out loud, has a way of getting back to the person it was aimed at.",
    ]),
    eccl(11, 1, 6, [
      "Cast thy bread upon the waters: for thou shalt find it after many days. Give a portion to seven, and also to eight; for thou knowest not what evil shall be upon the earth. Generosity spread wide, rather than concentrated in one safe place, is his answer to a future nobody can predict.",
      "He that observeth the wind shall not sow; and he that regardeth the clouds shall not reap. Wait for perfect conditions and you will never plant anything. The farmer who studies the sky forever never gets to the harvest.",
      "As thou knowest not... how the bones do grow in the womb of her that is with child: even so thou knowest not the works of God who maketh all. A child forming in secret, unseen, becomes his proof that not understanding how God works is not the same as having a reason to doubt Him.",
      "In the morning sow thy seed, and in the evening withhold not thine hand: for thou knowest not whether shall prosper, either this or that. Keep working across the whole day, the whole life. You don't get to know in advance which effort is the one that counts.",
    ]),
    eccl(11, 7, 10, [
      "Truly the light is sweet, and a pleasant thing it is for the eyes to behold the sun. A plain, physical joy, just being alive to see daylight, and he calls it genuinely good. Not guilty. Good.",
      "If a man live many years, and rejoice in them all; yet let him remember the days of darkness; for they shall be many. Joy is not asked to erase the hard years ahead. He wants both held at once, not one traded for the other.",
      "Rejoice, O young man, in thy youth... walk in the ways of thine heart, and in the sight of thine eyes: but know thou, that for all these things God will bring thee into judgment. Real freedom, paired with a real reminder. Enjoy being young. It still isn't consequence-free.",
      "Remove sorrow from thy heart, and put away evil from thy flesh: for childhood and youth are vanity. Youth itself passes fast. Whatever gets built in it has to matter for more than just how it felt at the time.",
    ]),
  ],
  closing: [
    ["So that is Day 192.", 700],
    ["A poor wise man delivers a whole city, and nobody remembers his name.", 750],
    ["Time and chance catch the swift and the strong the same as everyone else.", 800],
    ["One small folly can undo years of a good reputation, the same way one dead fly ruins good ointment.", 800],
    ["And the plainest advice in all three chapters keeps repeating. Do the work in front of you. Enjoy what's actually good today.", 850],
    ["Cast your bread on the water. Sow your seed morning and evening. You don't get to see in advance which effort pays off.", 850],
    ["Tomorrow, Ecclesiastes 12 and the start of Song of Solomon. One book closes, and a very different one opens.", 850],
    ["For now, sit with the line about the sun.", 750],
    ["Truly the light is sweet.", 1200],
  ],
};
