import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 183, written to the Day 1 standard.
 *
 * Proverbs 13-15: the same two-line-saying shape as yesterday, but this run
 * sharpens on discipline (the rod, correction, refusing reproof) and on the
 * heart as the thing every outward behavior traces back to. Six blocks split
 * the eighty-three verses in half by chapter, following canonical order.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 183,
  title: "Discipline, Speech, and the Heart",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 183.", 650],
    ["Same shape as yesterday. Short sayings, two lines each, no story.", 750],
    ["But today the collection keeps circling back to two things in particular. Correction, and what is actually going on inside a person.", 800],
    ["Some of these lines are gentle. A couple of them are hard to hear.", 800],
    ["We are in Proverbs 13 through 15.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(13, 1, 13, [
      "A wise son heareth his father's instruction: but a scorner heareth not rebuke. The chapter opens by naming the one skill everything else depends on. Whether you can actually take correction.",
      "He that keepeth his mouth keepeth his life: but he that openeth wide his lips shall have destruction. Your own words are named here as something that can put you in danger, not just other people's words about you.",
      "The soul of the sluggard desireth, and hath nothing: but the soul of the diligent shall be made fat. Wanting something is free. This book keeps pointing out that wanting is not the same as working for it.",
      "Whoso despiseth the word shall be destroyed: but he that feareth the commandment shall be rewarded. Two ways to meet the same instruction. Sneer at it, or take it seriously. The verse says only one of those ends well.",
    ]),
    g(13, 14, 25, [
      "The law of the wise is a fountain of life, to depart from the snares of death. Wisdom is not pictured as a rulebook here. It is pictured as water that keeps you alive.",
      "He that spareth his rod hateth his son: but he that loveth him chasteneth him betimes. This is the hardest line in the chapter, and it says the opposite of what feels true. Correction is named as love. Letting everything slide is named as hate.",
      "A good man leaveth an inheritance to his children's children: and the wealth of the sinner is laid up for the just. What you build outlasts you, one way or another, and this verse says it does not always end up where you planned.",
      "He that walketh with wise men shall be wise: but a companion of fools shall be destroyed. Nobody stays neutral around the people they spend their time with. You become like whoever you are actually near.",
    ]),
    g(14, 1, 15, [
      "Every wise woman buildeth her house: but the foolish plucketh it down with her hands. The very first line of the chapter puts the same set of hands doing the building or the tearing down.",
      "In the mouth of the foolish is a rod of pride: but the lips of the wise shall preserve them. Two different things called a rod in this reading. One disciplines a child out of love. The other is just pride talking, and it protects nothing.",
      "There is a way which seemeth right unto a man, but the end thereof are the ways of death. This is the line to actually be afraid of. Not being obviously wrong. Being confident, and wrong anyway.",
      "The simple believeth every word: but the prudent man looketh well to his going. Believing everything you hear is not innocence. This verse calls it simple, which here is not a compliment.",
    ]),
    g(14, 16, 35, [
      "He that is soon angry dealeth foolishly: and a man of wicked devices is hated. Speed gets named as the problem, not just anger itself. The quickness is what turns a feeling into foolishness.",
      "The poor is hated even of his own neighbour: but the rich hath many friends. The book states this one flatly, without approving of it. Naming how the world actually works is not the same as saying it should work that way.",
      "He that oppresseth the poor reproacheth his Maker: but he that honoureth him hath mercy on the poor. How you treat someone with nothing to give back is named here as something aimed directly at God, not just at them.",
      "Righteousness exalteth a nation: but sin is a reproach to any people. The lens pulls all the way back from one household to a whole nation, and the same rule still holds.",
    ]),
    g(15, 1, 17, [
      "A soft answer turneth away wrath: but grievous words stir up anger. The very first line of chapter fifteen hands you a tool. The next sentence out of your mouth can end a fight or start one, and you get to choose which.",
      "The eyes of the LORD are in every place, beholding the evil and the good. Right after a line about words spoken to another person, this one says God is watching the exchange too.",
      "A merry heart maketh a cheerful countenance: but by sorrow of the heart the spirit is broken. What is happening inside shows up on the outside. Nobody fully hides what their heart is carrying.",
      "Better is a dinner of herbs where love is, than a stalled ox and hatred therewith. A poor meal with love beats a rich one with hatred. The book keeps ranking relationship above comfort, every time it comes up.",
    ]),
    g(15, 18, 33, [
      "A wrathful man stirreth up strife: but he that is slow to anger appeaseth strife. The same warning from the top of the chapter, said again from the other direction. Slowness is not weakness here. It is what actually stops a fight.",
      "Without counsel purposes are disappointed: but in the multitude of counsellors they are established. A plan made alone is called fragile. A plan tested against other people is called stable.",
      "The heart of the righteous studieth to answer: but the mouth of the wicked poureth out evil things. One person thinks before speaking. The other just pours out whatever is already inside. The heart decides which one you are.",
      "The fear of the LORD is the instruction of wisdom; and before honour is humility. Three chapters of short, disconnected sayings, and it lands here. Respect for God first. Humility before anything gets called honor.",
    ]),
  ],
  closing: [
    ["So that is Day 183.", 700],
    ["Eighty-three more verses, and two threads kept pulling everything together.", 750],
    ["Whether you can take correction. And what your heart is actually doing when nobody is checking.", 800],
    ["A soft answer that turns away wrath. A rod that means love, not cruelty. A way that looks right and ends in death anyway.", 850],
    ["None of this is abstract. It is instruction, a rod, an answer, a heart, over and over. Ordinary moments, decided one at a time.", 850],
    ["Tomorrow, Proverbs 16 through 18. Plans, pride, and how much of what happens is actually in your hands.", 850],
    ["For now, hold on to where chapter fifteen landed.", 800],
    ["The fear of the LORD is the instruction of wisdom.", 800],
    ["And before honour is humility.", 1200],
  ],
};
