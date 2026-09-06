import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 131, written to the Day 1 standard.
 *
 * Psalms 7-9 are David under a real, named accusation, then two psalms of
 * praise built entirely on the idea that God actually judges fairly. Six
 * blocks across three chapters, the shortest of which (Psalm 8) gets its
 * own single block.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 131,
  title: "God Judges Righteously",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 131. Yesterday ended with a man weeping in the dark and then suddenly sure God had heard him.", 750],
    ["Today he is being lied about by name, and he does not ask God to smooth it over.", 800],
    ["He asks God to actually judge the case.", 900],
    ["Then two psalms of praise, built entirely on the idea that the judge can be trusted.", 850],
    ["One line, right in the middle, asks what a human being even is, next to all this.", 850],
    ["We are in Psalms 7 through 9.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(7, 1, 9, [
      "O Lord my God, in thee do I put my trust: save me from all them that persecute me, and deliver me: lest he tear my soul like a lion, rending it in pieces, while there is none to deliver. This psalm carries a name in its title, Cush the Benjamite, someone who accused David of something specific and false.",
      "If I have done this; if there be iniquity in my hands; if I have rewarded evil unto him that was at peace with me. Then let the enemy persecute my soul, and take it. That is a real oath. A guilty man does not stake his own life on his innocence like that.",
      "Arise, O LORD, in thine anger, and awake for me to the judgment that thou hast commanded. Judge me, O LORD, according to my righteousness, and according to mine integrity that is in me. He is not asking to be spared a trial. He is asking for one.",
      "The righteous God trieth the hearts and reins. Reins meant the kidneys, the deepest, most hidden part of a person in that world's picture of the body. He is not asking God to check his story. He is asking God to check him.",
    ]),
    g(7, 10, 17, [
      "My defence is of God, which saveth the upright in heart. And God is angry with the wicked every day. Not one flash of temper. A settled, daily opposition to what is false.",
      "If he turn not, he will whet his sword; he hath bent his bow, and made it ready. Notice the door left open. The weapon is ready, but it waits on whether the wicked man turns.",
      "Behold, he travaileth with iniquity, and hath conceived mischief, and brought forth falsehood. He made a pit, and digged it, and is fallen into the ditch which he made. Sin gets described like a pregnancy carried to term, and then the man who dug the trap falls into his own hole.",
      "His mischief shall return upon his own head. I will praise the LORD according to his righteousness. A psalm that opened with a lion tearing flesh ends in praise, before a single thing has visibly changed.",
    ]),
    g(8, 1, 9, [
      "O LORD our Lord, how excellent is thy name in all the earth! Out of the mouth of babes and sucklings hast thou ordained strength. The loudest display of God's glory in this psalm is not an army. It is an infant's cry.",
      "When I consider thy heavens, the work of thy fingers, the moon and the stars. What is man, that thou art mindful of him? He is not complaining about being small. He is stunned that something this small gets noticed at all.",
      "Thou hast made him a little lower than the angels, and hast crowned him with glory and honour. Thou madest him to have dominion over the works of thy hands. Crowned and put in charge, right after being called almost nothing.",
      "All sheep and oxen, the beasts of the field, the fowl of the air, and the fish of the sea. O LORD our Lord, how excellent is thy name in all the earth! The psalm ends exactly where it started. The whole tour of creation was there to prove one sentence, not replace it.",
    ]),
    g(9, 1, 8, [
      "I will praise thee, O LORD, with my whole heart; I will shew forth all thy marvellous works. Whole heart. All his works. This is not a partial thank you.",
      "When mine enemies are turned back, they shall fall and perish at thy presence. They fall at God's presence, not at David's sword. He is not the one who won this.",
      "Thou hast maintained my right and my cause; thou satest in the throne judging right. That is courtroom language. God did not just help David. God sat down and heard the case.",
      "The LORD shall endure for ever: he hath prepared his throne for judgment. Cities get destroyed and their memorial perishes with them, but one throne in this psalm never moves.",
    ]),
    g(9, 9, 16, [
      "The LORD also will be a refuge for the oppressed, a refuge in times of trouble. Said twice in one breath. And they that know thy name will put their trust in thee. Trust here follows knowing, not guessing.",
      "When he maketh inquisition for blood, he remembereth them: he forgetteth not the cry of the humble. Inquisition means an actual investigation. God does not lose track of a death nobody else is asking about.",
      "Have mercy upon me, O LORD; consider my trouble, thou that liftest me up from the gates of death: that I may shew forth all thy praise in the gates of the daughter of Zion. Two gates. He is asking to be moved from one to the other.",
      "The heathen are sunk down in the pit that they made: in the net which they hid is their own foot taken. Higgaion. Selah. The same trap from Psalm seven, back again. Then the psalm just stops and asks you to sit with it.",
    ]),
    g(9, 17, 20, [
      "The wicked shall be turned into hell, and all the nations that forget God. Notice what wicked means here. Not just cruelty. Forgetting God is enough to be named alongside it.",
      "For the needy shall not alway be forgotten: the expectation of the poor shall not perish for ever. Alway. He knows it feels like forgotten right now. He is promising it does not stay that way.",
      "Arise, O LORD; let not man prevail: let the heathen be judged in thy sight. The exact same word that opened Psalm seven. This whole reading keeps circling back to that one request.",
      "Put them in fear, O LORD: that the nations may know themselves to be but men. Selah. The last ask is not destruction. It is nations remembering how small they actually are.",
    ]),
  ],
  closing: [
    ["So that is Day 131.", 700],
    ["A false accusation, a pit dug and fallen into twice, and a question about what man even is.", 750],
    ["Notice what David never does across these three chapters. He never once takes the sword himself.", 800],
    ["He argues his case, he asks for an actual trial, and then he waits for a throne that does not move.", 850],
    ["And right in the middle of all that legal language, Psalm eight stops everything to marvel that God bothers with people at all.", 850],
    ["Crowned with glory and honour. A little lower than the angels. And still small enough to be forgotten by everyone but God.", 850],
    ["Tomorrow, Psalms 10 through 12. What it feels like when evil looks like it is winning.", 850],
    ["For now, hold on to the trap in Psalm seven.", 800],
    ["He made a pit, and digged it.", 750],
    ["And he is the one who fell in.", 1200],
  ],
};
