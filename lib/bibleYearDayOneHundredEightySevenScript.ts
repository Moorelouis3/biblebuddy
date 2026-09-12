import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 187, written to the Day 1 standard.
 *
 * Proverbs 25-27: a new editorial note opens the reading (Hezekiah's men
 * copying out more of Solomon's sayings), self-control gets its clearest
 * image yet (the city with no walls), a deliberate contradiction sits two
 * verses apart on how to answer a fool, and the day closes on the most
 * famous line about friendship in the book. Six blocks split the eighty-three
 * verses roughly in half by chapter, following canonical order.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 187,
  title: "Self-Control and Friendship",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 187.", 650],
    ["Proverbs 25 through 27 today.", 750],
    ["Two things keep showing up. What it costs you to have no self-control. And what a real friend is actually for.", 800],
    ["There's also a repeat waiting for you, and two verses sitting right next to each other that look like they disagree.", 800],
    ["We are in Proverbs 25 through 27.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(25, 1, 14, [
      "These are also proverbs of Solomon, which the men of Hezekiah king of Judah copied out. This chapter opens with a footnote about itself. Centuries after Solomon, someone still thought these words were worth preserving by hand.",
      "It is the glory of God to conceal a thing: but the honour of kings is to search out a matter. The heaven for height, and the earth for depth, and the heart of kings is unsearchable. Two kinds of hidden things in one breath. What God keeps on purpose, and what a king's own heart hides even from himself.",
      "A word fitly spoken is like apples of gold in pictures of silver. Not just true words. The right words, at the right time. That timing is what earns the comparison to gold.",
      "As the cold of snow in the time of harvest, so is a faithful messenger to them that send him... Whoso boasteth himself of a false gift is like clouds and wind without rain. One picture of someone who delivers exactly what was promised. One picture of someone who promises rain and gives nothing.",
    ]),
    g(25, 15, 28, [
      "By long forbearing is a prince persuaded, and a soft tongue breaketh the bone. The softest thing named in this verse does more damage to resistance than force ever could.",
      "If thine enemy be hungry, give him bread to eat; and if he be thirsty, give him water to drink: For thou shalt heap coals of fire upon his head, and the LORD shall reward thee. Kindness to an enemy is not pictured here as weakness. It is pictured as the sharper move.",
      "It is better to dwell in the corner of the housetop, than with a brawling woman and in a wide house. The same measurement from a few chapters back, applied again. Peace in a small space outranks conflict in a large one.",
      "He that hath no rule over his own spirit is like a city that is broken down, and without walls. This is the line the whole day takes its name from. A city with no walls cannot keep out anything. Neither can a person with no rule over their own spirit.",
    ]),
    g(26, 1, 16, [
      "As snow in summer, and as rain in harvest, so honour is not seemly for a fool. Some things are simply out of season, wherever they land. Honor on a fool is named here as one of them.",
      "Answer not a fool according to his folly, lest thou also be like unto him. Answer a fool according to his folly, lest he be wise in his own conceit. These two lines sit right next to each other and look like a contradiction. The book is not confused. It is saying the right answer depends on which danger you are actually facing.",
      "As a dog returneth to his vomit, so a fool returneth to his folly. One of the most graphic pictures in the whole book, used here for something as ordinary as repeating the same mistake.",
      "Seest thou a man wise in his own conceit? there is more hope of a fool than of him. A plain fool can still be told something. A man convinced of his own wisdom has already closed that door himself.",
    ]),
    g(26, 17, 28, [
      "He that passeth by, and meddleth with strife belonging not to him, is like one that taketh a dog by the ears. A vivid, almost funny picture for a very unfunny mistake. Getting into someone else's fight rarely ends the way you pictured it.",
      "As a mad man who casteth firebrands, arrows, and death, So is the man that deceiveth his neighbour, and saith, Am not I in sport? Hiding behind a joke does not soften what the joke actually does to the person on the other end of it.",
      "Where no wood is, there the fire goeth out: so where there is no talebearer, the strife ceaseth. This names the fuel, not just the fire. Take away the person carrying the story, and the argument runs out of what it needs to keep burning.",
      "He that hateth dissembleth with his lips, and layeth up deceit within him; When he speaketh fair, believe him not: for there are seven abominations in his heart. A warning about someone whose words and whose heart have come completely apart from each other.",
    ]),
    g(27, 1, 14, [
      "Boast not thyself of to morrow; for thou knowest not what a day may bring forth. Not just a warning about pride. A warning about a certainty you were never actually given.",
      "Open rebuke is better than secret love. Faithful are the wounds of a friend; but the kisses of an enemy are deceitful. A friend willing to hurt you with the truth is ranked above an enemy who only ever flatters you.",
      "Ointment and perfume rejoice the heart: so doth the sweetness of a man's friend by hearty counsel. Thine own friend, and thy father's friend, forsake not... for better is a neighbour that is near than a brother far off. Nearness gets weighed against blood here, and nearness wins.",
      "A prudent man foreseeth the evil, and hideth himself; but the simple pass on, and are punished. The same line from Proverbs twenty-two, word for word, back again. Some lessons this book is willing to repeat exactly.",
    ]),
    g(27, 15, 27, [
      "A continual dropping in a very rainy day and a contentious woman are alike. Whosoever hideth her hideth the wind. Two things named here as impossible to contain once they get started. Wind, and constant conflict.",
      "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend. This is the line the whole day has been building toward. Friendship, in this picture, is not soft. It is friction that leaves both people sharper.",
      "As in water face answereth to face, so the heart of man to man. What you bring to another person tends to come back reflected. The heart shows the other heart what it already is.",
      "Be thou diligent to know the state of thy flocks, and look well to thy herds. For riches are not for ever: and doth the crown endure to every generation? The chapter ends on ordinary work, not a grand finish. Know what you actually have, because none of it, not even a crown, lasts forever.",
    ]),
  ],
  closing: [
    ["So that is Day 187.", 700],
    ["Eighty-three verses, three chapters, and two threads pulled through all of them. Self-control. And friendship.", 800],
    ["A person with no rule over their own spirit gets compared to a city with broken walls. Nothing can be kept out.", 800],
    ["And two verses sit right next to each other looking like they disagree. Answer a fool. Do not answer a fool. The book is not confused. It just knows the right move depends on which danger you are facing.", 850],
    ["A prudent man foreseeing evil and hiding himself showed up again today, word for word from a few chapters back.", 800],
    ["Tomorrow, Proverbs 28 through 30. Justice, confession, and wonder.", 850],
    ["For now, here is what a real friend actually does.", 750],
    ["Iron sharpeneth iron.", 750],
    ["So a man sharpeneth the countenance of his friend.", 1200],
  ],
};
