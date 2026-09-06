import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 129, written to the Day 1 standard.
 *
 * Psalms 1-3 opens the Psalter: the blessed man and the tree, the nations
 * raging against God's anointed king, and David praying his way through
 * Absalom's rebellion. Six blocks across three short chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 129,
  title: "The Blessed Way and Trust in Trouble",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 129. New book, and a completely different kind of writing.", 750],
    ["No more kings and armies and family feuds strung into one long story.", 800],
    ["Just prayers. Songs. Real people talking straight to God.", 800],
    ["Today you get three of them back to back. One about a tree. One about a furious rebellion. One about a king who cannot sleep for fear, and then suddenly can.", 850],
    ["We are in Psalms 1 through 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(1, 1, 3, [
      "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful. Blessed is the very first word in the whole book of Psalms. Not happy. Favored. Rightly lined up with God.",
      "Then it draws the opposite in three verbs. Walk. Stand. Sit. A quick visit to bad advice turns into lingering in a bad path, and lingering turns into a permanent seat.",
      "But his delight is in the law of the Lord, and in his law doth he meditate day and night. Meditate just means turning words over quietly, again and again, until they shape you.",
      "He shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season. Planted, not wild. Somebody put that tree exactly where the water was.",
    ]),
    g(1, 4, 6, [
      "The ungodly are not so. Four words that erase every bit of stability the psalm just described.",
      "They are like the chaff which the wind driveth away. No roots, no weight, gone the moment the wind picks up.",
      "For the Lord knoweth the way of the righteous. Knoweth here is not just knowing facts about someone. It is close, watchful care.",
      "But the way of the ungodly shall perish. That is the last word of the psalm. Psalm one opens the whole book by making you choose a tree or the wind.",
    ]),
    g(2, 1, 6, [
      "Why do the heathen rage, and the people imagine a vain thing. Whole nations plotting a rebellion the psalm has already told you fails.",
      "The kings of the earth set themselves, and the rulers take counsel together, against the Lord, and against his anointed. This attacks two targets at once. God, and the king God chose.",
      "He that sitteth in the heavens shall laugh. Not amusement. It is the calm of someone who was never actually in danger.",
      "Yet have I set my king upon my holy hill of Zion. While they were still plotting, God had already finished the job.",
    ]),
    g(2, 7, 12, [
      "Thou art my son, this day have I begotten thee. That is coronation language, not a birth. Ask of me, and I shall give thee the heathen for thine inheritance, and the uttermost parts of the earth for thy possession.",
      "Thou shalt break them with a rod of iron, thou shalt dash them in pieces like a potter's vessel. A shepherd's rod turned into a weapon. Resistance to this king does not get outlasted.",
      "Be wise now therefore, O ye kings, be instructed, ye judges of the earth. The same rulers who were plotting a few verses ago are offered a way out instead of only judgment.",
      "Kiss the Son, lest he be angry. Blessed are all they that put their trust in him. Psalm two ends on the exact word Psalm one opened with. Blessed.",
    ]),
    g(3, 1, 4, [
      "Lord, how are they increased that trouble me. This psalm is David's own prayer when he fled from Absalom, his own son, who led a revolt against him.",
      "Many are they that rise up against me. Many there be which say of my soul, there is no help for him in God. That is an attack aimed straight at his faith, not just his throne.",
      "But thou, O Lord, art a shield for me, my glory, and the lifter up of mine head. Every claim his enemies just made gets answered in one sentence.",
      "I cried unto the Lord with my voice, and he heard me out of his holy hill. Zion is the very city he just fled. Distance never shrank God's hearing.",
    ]),
    g(3, 5, 8, [
      "I laid me down and slept, I awaked, for the Lord sustained me. A hunted king, in the middle of an active rebellion, sleeping undefended. That is not carelessness. That is trust.",
      "I will not be afraid of ten thousands of people, that have set themselves against me round about. He is not claiming to feel nothing. He is choosing what he trusts over what he can count.",
      "Arise, O Lord, save me, O my God. He takes the same word used for the enemies rising up back in verse one, and points it straight at heaven instead.",
      "Salvation belongeth unto the Lord. The psalm that opened in panic ends there, and then turns outward: thy blessing is upon thy people.",
    ]),
  ],
  closing: [
    ["So that is Day 129.", 700],
    ["A tree by a river. A king laughing in heaven. And a father hiding from his own son.", 750],
    ["Psalm one gives you two roads, and tells you exactly where the wind takes the one that never put down roots.", 800],
    ["Psalm two gives you a whole planet in revolt, and a God who had already finished the job before they even started plotting.", 850],
    ["Psalm three gives you David at his lowest, betrayed by his own child, sleeping anyway because God was still holding him up.", 850],
    ["Three very different prayers. All three land on the same word. Blessed. Salvation belongs to the Lord.", 850],
    ["Tomorrow, Psalms 4 through 6. More of David's prayers, moving from anger straight down into grief.", 850],
    ["For now, hold on to that tree.", 800],
    ["Planted by the water.", 750],
    ["Not going anywhere.", 1200],
  ],
};
