import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 132, written to the Day 1 standard.
 *
 * Psalms 10-12 sit with the hardest question in the run so far: what do you
 * do when evil looks like it is winning and God looks silent. Psalm 10 has
 * no title of its own in Hebrew tradition - it reads as the back half of
 * Psalm 9's acrostic, split into its own chapter in English Bibles. Six
 * blocks across three chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 132,
  title: "When Evil Seems Strong",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 132. Yesterday God was a righteous judge sitting on a throne.", 750],
    ["Today the question is harder. What if the judge looks like He is not doing anything?", 800],
    ["Psalm ten opens with it directly. Why standest thou afar off, O Lord? Why hidest thou thyself in times of trouble?", 850],
    ["Then a friend tells David to just run. And he refuses.", 850],
    ["And Psalm twelve ends without the danger actually being over.", 850],
    ["We are in Psalms 10 through 12.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(10, 1, 6, [
      "Why standest thou afar off, O LORD? why hidest thou thyself in times of trouble? This psalm does not open with praise. It opens with a real complaint about where God seems to be.",
      "The wicked, through the pride of his countenance, will not seek after God: God is not in all his thoughts. Not open rebellion. Just total indifference. God simply does not come up.",
      "His judgments are far above out of his sight: as for all his enemies, he puffeth at them. A puff of air is how much weight he gives to anyone standing against him, God included.",
      "He hath said in his heart, I shall not be moved: for I shall never be in adversity. A private confidence built on nothing but the fact that nothing bad has happened yet.",
    ]),
    g(10, 7, 11, [
      "His mouth is full of cursing and deceit and fraud. He sitteth in the lurking places of the villages: in the secret places doth he murder the innocent. Everything here happens in secret, aimed at the poor specifically.",
      "He lieth in wait secretly as a lion in his den, to catch the poor, when he draweth him into his net. The same lion image from Psalm seven, but now it is a person hunting other people instead of a false accuser hunting David.",
      "He croucheth, and humbleth himself, that the poor may fall by his strong ones. That crouching looks like humility. It is actually a hunting position.",
      "He hath said in his heart, God hath forgotten: he hideth his face; he will never see it. That is the actual bet underneath everything this man does. That nobody, including God, is watching.",
    ]),
    g(10, 12, 18, [
      "Arise, O LORD; O God, lift up thine hand: forget not the humble. That is a direct answer to verse one's why standest thou afar off. And the same word, arise, that has now shown up in three psalms in a row.",
      "Thou hast seen it; for thou beholdest mischief and spite, to requite it with thy hand. Direct reply to the wicked man's bet two verses earlier. He said God would never see it. The psalm answers him mid-poem.",
      "Break thou the arm of the wicked: seek out his wickedness till thou find none. Not asked for revenge exactly. Asked for the wickedness itself to run out completely.",
      "The LORD is King for ever and ever. Thou wilt judge the fatherless and the oppressed, that the man of the earth may no more oppress. The goal stated plainly. Not just stopping one man. Stopping oppression itself.",
    ]),
    g(11, 1, 7, [
      "In the LORD put I my trust: how say ye to my soul, Flee as a bird to your mountain? Someone is giving David sensible advice. Get out while you can. He turns it down flat.",
      "If the foundations be destroyed, what can the righteous do? That is the real fear under the advice to run. When everything holding things up looks like it is collapsing, is staying steady even possible.",
      "The LORD is in his holy temple, the LORD's throne is in heaven: his eyes behold, his eyelids try, the children of men. The answer. The foundation that actually matters was never on the ground in the first place.",
      "Upon the wicked he shall rain snares, fire and brimstone. For the righteous LORD loveth righteousness; his countenance doth behold the upright. The same watching eyes from two verses earlier turn out to be good news, not just surveillance.",
    ]),
    g(12, 1, 4, [
      "Help, LORD; for the godly man ceaseth; for the faithful fail from among the children of men. The plainest, shortest cry in this whole reading. He feels like he might be the last honest person left standing.",
      "They speak vanity every one with his neighbour: with flattering lips and with a double heart do they speak. A double heart is not simple lying. It is one heart split in two, saying one thing to your face and meaning another.",
      "The LORD shall cut off all flattering lips, and the tongue that speaketh proud things. The judgment matches the crime exactly. The mouth that did the damage is the thing that gets removed.",
      "Who have said, With our tongue will we prevail; our lips are our own: who is lord over us? The actual claim hiding under all the flattery. Total ownership of their own words, answerable to no one.",
    ]),
    g(12, 5, 8, [
      "For the oppression of the poor, for the sighing of the needy, now will I arise, saith the LORD. God speaks in His own voice here, the only place He does in these three psalms, answering every arise David has cried out since Psalm seven.",
      "I will set him in safety from him that puffeth at him. The same contemptuous puff from Psalm ten, named directly, with a promise attached to it.",
      "The words of the LORD are pure words: as silver tried in a furnace of earth, purified seven times. Set against the double heart from four verses ago. God's words are proven pure by repeated testing, not just claimed pure.",
      "The wicked walk on every side, when the vilest men are exalted. The psalm does not end with the danger gone. It ends with David standing on a promise instead of a guess.",
    ]),
  ],
  closing: [
    ["So that is Day 132.", 700],
    ["A man asking God why He looks absent. A man refusing good advice to run. And a promise given while the wicked are still walking free.", 800],
    ["This is the most honest these psalms have been yet. Nobody pretends the danger is over.", 800],
    ["What changes is not the circumstances. It is where David decides to stand while they stay exactly the same.", 850],
    ["If the foundations be destroyed, what can the righteous do? Look up, not down. The throne that matters was never on the ground.", 850],
    ["And notice who finally speaks out loud in Psalm twelve. Not David asking again. God, answering.", 850],
    ["Tomorrow, Psalms 13 through 15. A prayer with a deadline, a settled trust, and the kind of life that can actually stand in God's presence.", 850],
    ["For now, hold on to the silver.", 800],
    ["Tried in a furnace. Purified seven times.", 750],
    ["Proven, not just promised.", 1200],
  ],
};
