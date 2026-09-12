import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 184, written to the Day 1 standard.
 *
 * Proverbs 16-18: still the two-line saying shape, but three threads pull
 * tight across all three chapters - what a person plans versus what actually
 * happens, pride showing up twice in almost identical language, and the
 * tongue as something that can do real damage or real good. Six blocks split
 * the eighty-five verses roughly in half by chapter, following canonical
 * order.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 184,
  title: "Plans, Pride, and Wise Words",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 184.", 650],
    ["Still Proverbs. Still short sayings, two lines each.", 750],
    ["But today three things keep circling back. What you plan versus what actually happens. Pride, twice, in almost the same words. And your mouth, doing more than you probably think it is.", 800],
    ["There is also an echo waiting near the end. A line from yesterday shows back up today, almost word for word.", 800],
    ["We are in Proverbs 16 through 18.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(16, 1, 15, [
      "The preparations of the heart in man, and the answer of the tongue, is from the LORD. You can plan the words ahead of time. What actually comes out of your mouth in the moment is not fully yours to control.",
      "All the ways of a man are clean in his own eyes: but the LORD weigheth the spirits. Nobody feels like the villain in their own story. This verse says your own verdict on yourself is not the one that decides anything.",
      "Commit thy works unto the LORD, and thy thoughts shall be established. Not figure it all out first, then hand it over. Hand it over first. The clarity comes after, not before.",
      "A man's heart deviseth his way: but the LORD directeth his steps. You can lay out the whole route. The actual walking still belongs to someone else.",
    ]),
    g(16, 16, 33, [
      "How much better is it to get wisdom than gold! and to get understanding rather to be chosen than silver! The chapter has already said your plans are not fully in your hands. Here it says get the one thing that still is.",
      "Pride goeth before destruction, and an haughty spirit before a fall. Hold on to this one. It comes back before the day is over.",
      "There is a way that seemeth right unto a man, but the end thereof are the ways of death. This is the same line, almost word for word, as two chapters ago. Proverbs is not afraid to say a thing twice if you did not catch it the first time.",
      "He that is slow to anger is better than the mighty; and he that ruleth his spirit than he that taketh a city. Taking a city is a war story. Ruling your own spirit is quieter, and this verse ranks it higher.",
    ]),
    g(17, 1, 14, [
      "Better is a dry morsel, and quietness therewith, than an house full of sacrifices with strife. A full table with fighting at it loses to a bare table with peace at it. No contest, according to this line.",
      "The fining pot is for silver, and the furnace for gold: but the LORD trieth the hearts. Metal gets heated to find out what it really is. This verse says people go through the same process, just without the furnace you can see.",
      "He that covereth a transgression seeketh love; but he that repeateth a matter separateth very friends. Bringing something up again and again is named here as a way of ending a friendship, not fixing one.",
      "The beginning of strife is as when one letteth out water: therefore leave off contention, before it be meddled with. Once the water is out of the dam, you cannot put it back. The instruction is to stop before the first crack, not after.",
    ]),
    g(17, 15, 28, [
      "A friend loveth at all times, and a brother is born for adversity. Not a friend for the good years. A friend for all of them, including the ones you would rather nobody saw.",
      "A merry heart doeth good like a medicine: but a broken spirit drieth the bones. The body is named here as something that actually carries what the heart is going through.",
      "He that hath knowledge spareth his words: and a man of understanding is of an excellent spirit. Knowing a lot and saying a lot are treated as two different things, and this verse only respects one of them.",
      "Even a fool, when he holdeth his peace, is counted wise: and he that shutteth his lips is esteemed a man of understanding. You do not have to be wise to sound wise. Sometimes you just have to stop talking.",
    ]),
    g(18, 1, 12, [
      "A fool hath no delight in understanding, but that his heart may discover itself. This one is blunt. Some people are not actually looking for an answer. They are just looking for a reason to talk.",
      "The words of a man's mouth are as deep waters, and the wellspring of wisdom as a flowing brook. Two pictures of the same thing. Water that can drown you, or water that keeps you alive. Both come out of the same mouth.",
      "The name of the LORD is a strong tower: the righteous runneth into it, and is safe. Not a place you build. A place you run to when you already need it.",
      "Before destruction the heart of man is haughty, and before honour is humility. This is the line from yesterday. Day 183 ended on the second half of it. Today the first half shows up right alongside it.",
    ]),
    g(18, 13, 24, [
      "He that answereth a matter before he heareth it, it is folly and shame unto him. Answering fast feels like confidence. This verse calls it shame, because you spoke before you actually knew what was said.",
      "The spirit of a man will sustain his infirmity; but a wounded spirit who can bear? A body can carry a lot of pain if the spirit underneath it is still steady. This verse asks what happens when the spirit itself is the thing that is hurt.",
      "Death and life are in the power of the tongue: and they that love it shall eat the fruit thereof. Not a small warning about rude words. The tongue is named here as something with the weight of death and life inside it.",
      "A man that hath friends must shew himself friendly: and there is a friend that sticketh closer than a brother. Friendship is not described here as something that just happens to you. It starts with you showing yourself friendly first.",
    ]),
  ],
  closing: [
    ["So that is Day 184.", 700],
    ["Eighty-five verses, three chapters, and the same few threads pulled tight.", 750],
    ["You can plan the way. The LORD still directs the steps.", 800],
    ["Pride shows up twice, almost in the same words, like the book wants to make sure you actually heard it.", 800],
    ["And the tongue keeps coming back around. It can hold death and life in the same breath.", 850],
    ["Tomorrow, Proverbs 19 through 21. Justice, wealth, and what humility actually costs.", 850],
    ["For now, here is that echo from yesterday, said in full this time.", 800],
    ["Before destruction the heart of man is haughty.", 750],
    ["And before honour is humility.", 1200],
  ],
};
