import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 186, written to the Day 1 standard.
 *
 * Proverbs 22-24: partway through chapter 22 the book renames its own
 * material - "the words of the wise" instead of just Solomon's couplets -
 * and the reading closes with a near word-for-word repeat of the sluggard's
 * field from chapter 6 (Day 180). Six blocks split the ninety-eight verses
 * roughly in half by chapter, following canonical order.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 186,
  title: "Wisdom for Daily Life",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 186.", 650],
    ["Still Proverbs. Twenty-two through twenty-four today.", 750],
    ["Partway through, the book actually renames itself. It starts calling its own sayings the words of the wise.", 800],
    ["And near the end there is a passage about drink that might be the most honest lines in the whole book.", 800],
    ["We are in Proverbs 22 through 24.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(22, 1, 16, [
      "A good name is rather to be chosen than great riches, and loving favour rather than silver and gold. The very first line of the day sets the rank. Reputation and love outweigh what is in the bank.",
      "Train up a child in the way he should go: and when he is old, he will not depart from it. Not a guarantee stamped on every child. A description of which way the weight usually falls.",
      "The rich ruleth over the poor, and the borrower is servant to the lender. A plain description of what debt actually does to a relationship, not advice dressed up as a warning.",
      "He that oppresseth the poor to increase his riches, and he that giveth to the rich, shall surely come to want. Squeezing the poor to get ahead, and flattering the rich to get ahead, are named here as the same failed plan.",
    ]),
    g(22, 17, 29, [
      "Bow down thine ear, and hear the words of the wise. Right here the book changes its own label. Everything through the end of chapter twenty-four is called the words of the wise, not just Solomon's short lines anymore.",
      "That thy trust may be in the LORD, I have made known to thee this day, even to thee. The purpose of this new section gets stated up front. Not clever sayings for their own sake. Trust, aimed at one listener, on purpose.",
      "Rob not the poor, because he is poor: neither oppress the afflicted in the gate: For the LORD will plead their cause. The poor person's case, this verse says, is already on someone's docket.",
      "Seest thou a man diligent in his business? he shall stand before kings. A plain observation about where diligence tends to lead, left there without being turned into a formula.",
    ]),
    g(23, 1, 18, [
      "When thou sittest to eat with a ruler, consider diligently what is before thee: And put a knife to thy throat, if thou be a man given to appetite. A strange, vivid image for something simple. Watch yourself around power, especially the part of you that wants to be fed.",
      "Labour not to be rich: cease from thine own wisdom. Wilt thou set thine eyes upon that which is not? for riches certainly make themselves wings; they fly away as an eagle toward heaven. Money gets pictured here with wings of its own, leaving on its own schedule, not yours.",
      "Withhold not correction from the child: for if thou beatest him with the rod, he shall not die. The same hard instruction from chapter twenty-two, said again in stronger language. This book keeps coming back to it.",
      "Let not thine heart envy sinners: but be thou in the fear of the LORD all the day long. For surely there is an end; and thine expectation shall not be cut off. Whatever looks unfair right now, this verse says, is not the end of the story.",
    ]),
    g(23, 19, 35, [
      "Be not among winebibbers; among riotous eaters of flesh: For the drunkard and the glutton shall come to poverty. Two appetites named side by side, drink and food, both able to run a life into the ground.",
      "Buy the truth, and sell it not; also wisdom, and instruction, and understanding. Truth gets described here as something you pay for once and then never trade away again, whatever the offer later.",
      "Who hath woe? who hath sorrow? who hath contentions? who hath babbling? who hath wounds without cause? who hath redness of eyes? They that tarry long at the wine. A whole list of miseries, and then one answer for all of them at once.",
      "They have stricken me, shalt thou say, and I was not sick; they have beaten me, and I felt it not: when shall I awake? I will seek it yet again. This might be the most honest description of addiction in the Bible. Even the pain does not stop the wanting.",
    ]),
    g(24, 1, 22, [
      "Be not thou envious against evil men, neither desire to be with them. For their heart studieth destruction, and their lips talk of mischief. The warning reaches past their actions, all the way back to what they spend their thinking on.",
      "If thou forbear to deliver them that are drawn unto death... If thou sayest, Behold, we knew it not; doth not he that pondereth the heart consider it? Claiming you did not know gets answered here before you even say it. Someone already knows what you knew.",
      "For a just man falleth seven times, and riseth up again: but the wicked shall fall into mischief. The righteous life in this verse is not spotless. It is seven falls, and seven times back up.",
      "Rejoice not when thine enemy falleth, and let not thine heart be glad when he stumbleth: Lest the LORD see it, and it displease him. Even watching someone else's downfall has a right and a wrong way to feel, according to this verse.",
    ]),
    g(24, 23, 34, [
      "These things also belong to the wise. It is not good to have respect of persons in judgment. He that saith unto the wicked, Thou art righteous; him shall the people curse. Calling wrong right does not stay a private opinion. This verse says it earns a public curse.",
      "Say not, I will do so to him as he hath done to me: I will render to the man according to his work. Revenge gets handed off again, the same as a few chapters back. Still not your job to settle.",
      "I went by the field of the slothful... and, lo, it was all grown over with thorns... Then I saw, and considered it well: I looked upon it, and received instruction. The wise man here does not need to fail himself. Watching someone else's field teaches him just as well.",
      "Yet a little sleep, a little slumber, a little folding of the hands to sleep: So shall thy poverty come as one that travelleth; and thy want as an armed man. This is nearly word for word what chapter six already said, back on Day 180. Some warnings this book is willing to give you twice.",
    ]),
  ],
  closing: [
    ["So that is Day 186.", 700],
    ["Three chapters, and partway through, the book changes its own name for itself. From here it calls its own sayings the words of the wise.", 800],
    ["The drunkard passage may be the most honest lines in the whole book. Even the pain does not stop the wanting.", 800],
    ["A just man falls seven times in this chapter, and gets back up seven times. That is what the righteous life actually looks like here.", 800],
    ["And the last picture is one you already know. Chapter six warned you about the sluggard's field back on Day 180. Today you get to see it, grown over with thorns.", 850],
    ["Tomorrow, Proverbs 25 through 27. Self-control, and what makes a friend worth having.", 850],
    ["For now, here is the last picture chapter twenty-four leaves you with.", 750],
    ["A little sleep. A little slumber.", 750],
    ["And poverty walks in like an armed man.", 1200],
  ],
};
