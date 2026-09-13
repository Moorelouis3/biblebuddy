import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 193, written to the Day 1 standard.
 *
 * Ecclesiastes 12 closes the book with a poem about an aging, dying body and
 * a final "fear God, keep his commandments." Then Song of Solomon 1-2 opens
 * a completely different kind of book: two voices, back and forth, saying
 * exactly what they feel about each other in gardens and open fields. Six
 * blocks covering the whole shift in one day.
 */

const eccl = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ecclesiastes ${chapter}:${startVerse}-${endVerse}`,
  book: "ecclesiastes",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const sos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Song of Solomon ${chapter}:${startVerse}-${endVerse}`,
  book: "song of solomon",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 193,
  title: "My Beloved Is Mine",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 193.", 650],
    ["Ecclesiastes 12, and then Song of Solomon 1 and 2.", 700],
    ["One book ends with a poem about a body wearing out and a spirit going home.", 800],
    ["And then, without warning, a completely different book opens with two people who cannot stop talking about each other.", 850],
    ["Same Bible. Very different sound.", 900],
    ["We are in Ecclesiastes 12, and Song of Solomon 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    eccl(12, 1, 8, [
      "Remember now thy Creator in the days of thy youth, while the evil days come not. This isn't a threat. It's timing wisdom. Build that relationship now, before the hard years make everything, including remembering God, feel heavier.",
      "The keepers of the house shall tremble, and the strong men shall bow themselves, and the grinders cease because they are few... and the almond tree shall flourish, and the grasshopper shall be a burden. Shaking hands, failing teeth, white hair, a body that tires under the smallest weight. He never says the word old. He just paints it.",
      "Or ever the silver cord be loosed, or the golden bowl be broken... Then shall the dust return to the earth as it was: and the spirit shall return unto God who gave it. Broken cords, broken bowls, and then he states it plainly. Body to dust. Spirit back to the God who gave it in the first place.",
      "Vanity of vanities, saith the preacher; all is vanity. The refrain comes back one last time, right after he's described death itself. It's the closing word before he sums up the whole book.",
    ]),
    eccl(12, 9, 14, [
      "Because the preacher was wise, he still taught the people knowledge... The preacher sought to find out acceptable words: and that which was written was upright, even words of truth. Even after eleven chapters of naming how little makes sense, he's still choosing his words with care. Honesty was the goal, not despair for its own sake.",
      "The words of the wise are as goads, and as nails fastened by the masters of assemblies. A goad prods an animal forward. A nail holds fast once it's driven in. Real wisdom is meant to do both. Sting you into moving, and then hold.",
      "Of making many books there is no end; and much study is a weariness of the flesh. The wisest man alive admits that endless study, by itself, just wears a person out. Knowledge alone was never going to be the answer.",
      "Fear God, and keep his commandments: for this is the whole duty of man. For God shall bring every work into judgment, with every secret thing. After chapters of calling everything vanity, this is where the whole book actually lands. Not a formula that explains life. Just this: fear God, keep His commands, and know that everything gets weighed in the end.",
    ]),
    sos(1, 1, 8, [
      "The song of songs, which is Solomon's. The title alone tells you what you're getting. Not a song among songs. The best of its kind.",
      "Let him kiss me with the kisses of his mouth: for thy love is better than wine. No introduction, no setup. A woman's voice opens the whole book, and she's the one asking.",
      "I am black, but comely, O ye daughters of Jerusalem... they made me the keeper of the vineyards; but mine own vineyard have I not kept. Before the poem lets her be adored, she names her own insecurity out loud. Sun-darkened skin, family pressure, a self she feels she's neglected.",
      "Tell me, O thou whom my soul loveth, where thou feedest, where thou makest thy flock to rest at noon. Shepherd language frames the whole courtship. She doesn't just want a feeling about him. She wants to know exactly where to find him.",
    ]),
    sos(1, 9, 17, [
      "I have compared thee, O my love, to a company of horses in Pharaoh's chariots... We will make thee borders of gold with studs of silver. Extravagant, almost over the top. He's reaching for the richest images available to him and still not sure they're enough.",
      "A bundle of myrrh is my wellbeloved unto me; he shall lie all night betwixt my breasts. My beloved is unto me as a cluster of camphire. She answers back with her own imagery. This is a conversation, not one voice admiring another in silence.",
      "Behold, thou art fair, my love... thou hast doves' eyes. Behold, thou art fair, my beloved, yea, pleasant. They say almost the exact same line back to each other. The admiration is matched, not one-sided.",
      "The beams of our house are cedar, and our rafters of fir. After all the extravagant language, it lands on something plain and domestic. Cedar beams. Love that has an actual home, not just a feeling.",
    ]),
    sos(2, 1, 7, [
      "I am the rose of Sharon, and the lily of the valleys... As the apple tree among the trees of the wood, so is my beloved among the sons. I sat down under his shadow with great delight, and his fruit was sweet to my taste. She describes him as shelter and sweetness. Something to rest under, not only something to look at.",
      "He brought me to the banqueting house, and his banner over me was love. A banner is a battle image, a flag claiming ground. Here it claims her, in public, on purpose.",
      "Stay me with flagons, comfort me with apples: for I am sick of love. She's honest about how much this costs her. Love described almost like something she needs medicine for.",
      "I charge you, O ye daughters of Jerusalem... that ye stir not up, nor awake my love, till he please. The poem stops itself here with a warning. Love has its own timing. Don't force it awake before it's ready.",
    ]),
    sos(2, 8, 17, [
      "The voice of my beloved! behold, he cometh leaping upon the mountains, skipping upon the hills. He isn't strolling over. He's covering ground fast to get to her.",
      "Rise up, my love, my fair one, and come away. For, lo, the winter is past, the rain is over and gone; the flowers appear on the earth. He uses the turning season itself as the invitation. Come outside, because everything alive is starting up again.",
      "Take us the foxes, the little foxes, that spoil the vines: for our vines have tender grapes. A sudden, practical warning right inside a love poem. Small things left unchecked can ruin something that's still young and easily damaged.",
      "My beloved is mine, and I am his: he feedeth among the lilies. Mutual belonging, stated as plainly as it can be said. Then the chapter closes the same way it opened, with her calling him to come.",
    ]),
  ],
  closing: [
    ["So that is Day 193.", 700],
    ["Ecclesiastes ends the only way it could. Remember your Creator, fear God, keep His commandments, because everything gets judged eventually.", 800],
    ["And then Song of Solomon opens, and the whole sound of the Bible changes in one page.", 800],
    ["Two people, speaking to each other in gardens and open fields, saying exactly what they feel out loud.", 800],
    ["It's still Scripture. It just teaches through desire and delight here instead of through commands.", 850],
    ["Notice the refrain that keeps interrupting the poem. Don't stir up love. Don't force it before it's ready.", 850],
    ["Tomorrow, Song of Solomon 3 through 5. The love in this book gets tested, not just celebrated.", 850],
    ["For now, hold onto one line from today.", 750],
    ["My beloved is mine, and I am his.", 1200],
  ],
};
