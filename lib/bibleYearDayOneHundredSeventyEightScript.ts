import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 178, written to the Day 1 standard.
 *
 * Psalms 148-150: the last three psalms in the book, and the whole thing
 * closes on nothing but praise. Six blocks, splitting 148 and 150 across
 * their turns, 149 taken whole.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 178,
  title: "Let Everything Praise the Lord",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 178.", 650],
    ["This is the last day in the Psalms. A hundred and fifty songs, and it ends with nothing but praise.", 800],
    ["No requests today. No enemies. No complaints. Just praise, stacked verse on verse.", 800],
    ["Everything gets called on to join in. Angels, stars, snow, kings, children, animals. All of it.", 800],
    ["We are in Psalms 148, 149, and 150.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(148, 1, 6, [
      "Praise ye the Lord from the heavens: praise him in the heights. The psalm starts as high up as it can go, before it ever reaches the ground.",
      "Praise ye him, all his angels: praise ye him, all his hosts. Praise him, sun and moon: praise him, all ye stars of light. Nothing up there is exempt from this.",
      "For he commanded, and they were created. That is the whole reason given for why the sun and stars owe him praise. He spoke, and they exist.",
      "He hath also stablished them for ever and ever: he hath made a decree which shall not pass. The stars are not just made. They are held in place by a decree that does not expire.",
    ]),
    g(148, 7, 14, [
      "Praise the Lord from the earth, ye dragons, and all deeps. From the highest heights to sea monsters in the deep, in two verses.",
      "Fire, and hail; snow, and vapours; stormy wind fulfilling his word. The weather is not background noise here. It is named as an act of obedience.",
      "Mountains, and cedars. Beasts, and cattle, and creeping things, and flying fowl. Kings of the earth, and princes, and judges. Young men, and maidens, old men, and children. Every category of living thing, in order, called into the same choir.",
      "He also exalteth the horn of his people, even of the children of Israel, a people near unto him. After naming the whole universe, the psalm narrows to one detail. God stays near to a people in particular.",
    ]),
    g(149, 1, 5, [
      "Sing unto the Lord a new song. Israel already has a stack of a hundred and forty-eight songs by this point. This one asks for a fresh one anyway.",
      "Let Israel rejoice in him that made him: let the children of Zion be joyful in their King. Let them praise his name in the dance: let them sing praises unto him with the timbrel and harp. This is not quiet praise. It has rhythm and movement built into it.",
      "For the Lord taketh pleasure in his people: he will beautify the meek with salvation. The word is taketh pleasure. Not merely tolerates. Delights in.",
      "Let the saints be joyful in glory: let them sing aloud upon their beds. Even alone, at night, lying down, the praise does not stop.",
    ]),
    g(149, 6, 9, [
      "Let the high praises of God be in their mouth, and a twoedged sword in their hand. Worship and a weapon, in the same line. This psalm does not soften into something safe.",
      "To execute vengeance upon the heathen, and punishments upon the people. Israel is handed a role as God's instrument of judgment against nations, stated plainly, not explained away.",
      "To bind their kings with chains, and their nobles with fetters of iron. The picture is a full reversal. The powerful, chained.",
      "This honour have all his saints. Praise ye the Lord. Whatever this psalm's violence unsettles in you, it calls the whole thing an honor, and closes the same way it opened.",
    ]),
    g(150, 1, 3, [
      "Praise God in his sanctuary: praise him in the firmament of his power. The last psalm opens by naming his house, then the whole sky, as reasons for praise.",
      "Praise him for his mighty acts: praise him according to his excellent greatness. Two different reasons stacked in one line. What he has done, and simply who he is.",
      "Praise him with the sound of the trumpet: praise him with the psaltery and harp. The praise stops being just words and starts naming actual instruments.",
      "Every instrument Israel owned is about to get listed before this psalm is finished. It is building toward something loud.",
    ]),
    g(150, 4, 6, [
      "Praise him with the timbrel and dance: praise him with stringed instruments and organs. Still adding instruments. Still not finished.",
      "Praise him upon the loud cymbals: praise him upon the high sounding cymbals. The last two instruments named are the loudest ones in the room, and they get a verse each.",
      "Let every thing that hath breath praise the Lord. After a hundred and fifty psalms of anger, doubt, war, guilt, and grief, this is where the whole book decides to land.",
      "Praise ye the Lord. Two words. The very last line of the Psalms, and there is no argument left to make.",
    ]),
  ],
  closing: [
    ["So that is Day 178.", 700],
    ["The book of Psalms just ended.", 700],
    ["A hundred and fifty songs of anger, doubt, war, guilt, and grief, and it chooses to end on nothing but praise.", 800],
    ["Every kind of living thing got called into that praise. Angels, stars, snow, kings, children, animals. And you.", 800],
    ["Even the sword in Psalm 149 got called an honor to hold.", 800],
    ["Tomorrow the whole shape of the reading changes. Proverbs 1 through 3, and wisdom instead of song.", 850],
    ["For now, sit with the last line of the Psalms.", 800],
    ["Let every thing that hath breath praise the Lord.", 800],
    ["Praise ye the Lord.", 1200],
  ],
};
