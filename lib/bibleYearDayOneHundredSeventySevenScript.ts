import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 177, written to the Day 1 standard.
 *
 * Psalms 145-147: three psalms of praise that keep refusing to stay vague,
 * naming princes, stars, ravens, snow, and ice as the actual evidence.
 * Six blocks, splitting 145 and 147 across their turns, 146 taken whole.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 177,
  title: "Great Is the Lord",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 177.", 650],
    ["Yesterday ended in a peaceful street. Today tells you exactly who put it there.", 750],
    ["Three straight psalms of praise, and none of them stay vague about it.", 800],
    ["Stars called by name. Ravens fed. Snow and ice obeying a word.", 800],
    ["We are in Psalms 145, 146, and 147.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(145, 1, 7, [
      "I will extol thee, my God, O king. Every day will I bless thee. Not a one-time high. A discipline he repeats daily.",
      "Great is the Lord, and greatly to be praised; and his greatness is unsearchable. He is not claiming to have found the bottom of it. He is saying there is no bottom to find.",
      "One generation shall praise thy works to another, and shall declare thy mighty acts. This praise is not meant to stay private. It gets handed down.",
      "Men shall speak of the might of thy terrible acts, right next to they shall utter the memory of thy great goodness. Terrible and good, in the same breath, neither one softened to fit the other.",
    ]),
    g(145, 8, 13, [
      "The Lord is gracious, and full of compassion; slow to anger, and of great mercy. Not an idea about God. A description of how he actually acts.",
      "The Lord is good to all: and his tender mercies are over all his works. Not good to a few, or good in general. All, and all his works.",
      "To make known to the sons of men his mighty acts, and the glorious majesty of his kingdom. The point of the kingdom's greatness is stated outright: it exists to be told, not kept.",
      "Thy kingdom is an everlasting kingdom, and thy dominion endureth throughout all generations. Every kingdom you have ever heard of has an end date. This one does not.",
    ]),
    g(145, 14, 21, [
      "The Lord upholdeth all that fall, and raiseth up all those that be bowed down. Present tense. Not a story about something he once did.",
      "Thou openest thine hand, and satisfiest the desire of every living thing. The scope of this psalm keeps widening. Now it includes every living thing, not just the people singing it.",
      "The Lord is nigh unto all them that call upon him, to all that call upon him in truth. Notice the qualifier. Nearness is tied to honesty, not performance.",
      "My mouth shall speak the praise of the Lord: and let all flesh bless his holy name for ever and ever. It starts with one mouth and ends by inviting every mouth there is.",
    ]),
    g(146, 1, 10, [
      "Put not your trust in princes, nor in the son of man, in whom there is no help. His breath goeth forth, he returneth to his earth; in that very day his thoughts perish. Blunt, not bitter. Even the best human plan dies with the man who made it.",
      "Which made heaven, and earth, the sea, and all that therein is: which keepeth truth for ever. Set right next to a prince's last breath, on purpose.",
      "He executeth judgment for the oppressed: he giveth food to the hungry. The Lord looseth the prisoners. The Lord openeth the eyes of the blind. This is not abstract praise. It names the actual people he moves toward.",
      "He relieveth the fatherless and widow: but the way of the wicked he turneth upside down. The Lord shall reign for ever. The psalm answers its own opening line. Rulers die. This reign does not.",
    ]),
    g(147, 1, 11, [
      "The Lord doth build up Jerusalem: he gathereth together the outcasts of Israel. He healeth the broken in heart, and bindeth up their wounds. A nation's restoration and one person's grief, in the same two lines.",
      "He telleth the number of the stars; he calleth them all by their names. The largest thing anyone can picture, described with the smallest, most personal act there is. Naming.",
      "He giveth to the beast his food, and to the young ravens which cry. Nothing grand about a young raven crying for food. He still answers it.",
      "He delighteth not in the strength of the horse: he taketh not pleasure in the legs of a man. The Lord taketh pleasure in them that fear him, in those that hope in his mercy. He is not impressed by strength. He is moved by trust.",
    ]),
    g(147, 12, 20, [
      "He hath strengthened the bars of thy gates; he hath blessed thy children within thee. He maketh peace in thy borders, and filleth thee with the finest of the wheat. Ordinary security and a full table, counted here as things worth praising him for.",
      "He sendeth forth his commandment upon earth: his word runneth very swiftly. He giveth snow like wool: he scattereth the hoar frost like ashes. Weather itself takes orders from the same word.",
      "He sendeth out his word, and melteth them: he causeth his wind to blow, and the waters flow. Ice comes and goes on command. So does the thaw.",
      "He sheweth his word unto Jacob, his statutes and his judgments unto Israel. He hath not dealt so with any nation. The word that controls frost and wind was also handed, on purpose, to one specific people.",
    ]),
  ],
  closing: [
    ["So that is Day 177.", 700],
    ["Three psalms, and not one line of vague praise in them.", 750],
    ["Psalm 145 says his greatness is unsearchable, then spends twenty verses trying anyway.", 800],
    ["Psalm 146 tells you plainly not to trust princes, because their breath goes forth and their plans die with them.", 800],
    ["Psalm 147 numbers the stars and calls them each by name, then turns around and feeds a young raven that is only crying.", 850],
    ["Same God, same reading, no contradiction between the two.", 800],
    ["Tomorrow, Psalms 148 through 150. The whole book of Psalms ends on nothing but praise.", 850],
    ["For now, hold on to the line that started today's reading.", 800],
    ["Great is the Lord, and greatly to be praised.", 1200],
  ],
};
