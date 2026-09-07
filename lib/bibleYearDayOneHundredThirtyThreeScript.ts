import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 133, written to the Day 1 standard.
 *
 * Psalms 13-15 move fast: the shortest lament yet turns to trust inside six
 * verses, Psalm 14 looks at the whole human race and finds nobody good, and
 * Psalm 15 answers that indictment with a short list of costly honesty
 * instead of achievement. Five blocks across three short chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 133,
  title: "Lament, Trust, and Integrity",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 133. Yesterday ended with a promise, but the wicked were still walking free.", 750],
    ["Psalm thirteen asks how long, four times, in the first two verses.", 800],
    ["Then it turns to trust before the danger has actually lifted.", 800],
    ["Psalm fourteen asks a harder question. Is there anyone left who is actually good?", 850],
    ["And Psalm fifteen answers with a short list of the kind of life that can stand near God.", 850],
    ["We are in Psalms 13 through 15.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(13, 1, 3, [
      "How long wilt thou forget me, O LORD? for ever? how long wilt thou hide thy face from me? Two questions in one breath, and both already contain their own worst fear. Forgotten, and for ever.",
      "How long shall I take counsel in my soul, having sorrow in my heart daily? how long shall mine enemy be exalted over me? Taking counsel in his own soul means arguing with himself, alone, with the same sorrow every day and nobody else in the room.",
      "Consider and hear me, O LORD my God: lighten mine eyes, lest I sleep the sleep of death. Lighten mine eyes describes eyes going dark and dim, the way a dying person's do. He is asking, plainly, not to die.",
      "Four how longs in three verses, and not one of them gets answered yet. The complaint is allowed to just sit there.",
    ]),
    g(13, 4, 6, [
      "Lest mine enemy say, I have prevailed against him; and those that trouble me rejoice when I am moved. His fear is not only his own death. It is what his enemy would get to say about it.",
      "But I have trusted in thy mercy; my heart shall rejoice in thy salvation. One word, but, and the whole psalm turns. Nothing outside him has changed yet.",
      "I will sing unto the LORD, because he hath dealt bountifully with me. Hath dealt is past tense. He sings about mercy already received, while still living inside the trouble he opened the psalm complaining about.",
      "Six verses. Four unanswered questions and then a song. That may be the fastest turn from complaint to trust in the whole book of Psalms so far.",
    ]),
    g(14, 1, 3, [
      "The fool hath said in his heart, There is no God. In the Bible, a fool is not someone who lacks intelligence. He is someone who has decided, in his heart where nobody else can check, that God does not factor into anything he does.",
      "They are corrupt, they have done abominable works, there is none that doeth good. The denial in the heart does not stay private. It always shows up in what the hands do next.",
      "The LORD looked down from heaven upon the children of men, to see if there were any that did understand, and seek God. God is not shown as absent here. He is shown searching, actively looking for even one.",
      "They are all gone aside, they are all together become filthy: there is none that doeth good, no, not one. That last line gets picked up centuries later, word for word, in the New Testament, to make the same case about the whole human race.",
    ]),
    g(14, 4, 7, [
      "Have all the workers of iniquity no knowledge? who eat up my people as they eat bread, and call not upon the LORD. Eating people like bread is a picture of casual, routine cruelty. Not one dramatic crime, but an everyday appetite.",
      "There were they in great fear: for God is in the generation of the righteous. The fear does not come from an army. It comes from realizing, all at once, that God is actually present among the people they had been preying on.",
      "Ye have shamed the counsel of the poor, because the LORD is his refuge. They mocked the poor for trusting God instead of themselves. That mockery is about to look very foolish.",
      "Oh that the salvation of Israel were come out of Zion! when the LORD bringeth back the captivity of his people, Jacob shall rejoice, and Israel shall be glad. The psalm that opened with a fool denying God ends with a whole nation longing for God to act.",
    ]),
    g(15, 1, 5, [
      "LORD, who shall abide in thy tabernacle? who shall dwell in thy holy hill? After a psalm that found nobody good, this is the obvious next question. Who could possibly qualify to live that close to God?",
      "He that walketh uprightly, and worketh righteousness, and speaketh the truth in his heart. Not perfect. Just plain and consistent, the same person in private that he is in public.",
      "He that sweareth to his own hurt, and changeth not. That is a very specific kind of integrity. Keeping a promise even after it starts costing you something you did not expect.",
      "He that putteth not out his money to usury, nor taketh reward against the innocent. He that doeth these things shall never be moved. Never moved answers Psalm thirteen directly. That is exactly what David was afraid an enemy would get to do to him.",
    ]),
  ],
  closing: [
    ["So that is Day 133.", 700],
    ["Four unanswered questions, a fool who found nobody good, and a short list of the kind of life that can actually stand near God.", 750],
    ["Psalm thirteen did not wait for the trouble to end before it turned to trust.", 800],
    ["Psalm fourteen looked at the whole human race and did not find one exception.", 800],
    ["And Psalm fifteen does not answer that with achievement. It answers with plain, costly honesty.", 850],
    ["Uprightly. Truthfully. Keeping your word even when it hurts you to keep it.", 850],
    ["Tomorrow, Psalms 16 through 18. A refuge, a promise about the grave itself, and the longest, loudest song of deliverance yet.", 850],
    ["For now, hold on to that last word in Psalm fifteen.", 800],
    ["Never moved.", 750],
    ["Exactly what he was afraid of losing in Psalm thirteen.", 1200],
  ],
};
