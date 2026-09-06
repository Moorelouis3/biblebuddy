import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 125, written to the Day 1 standard.
 *
 * Job swears an oath of integrity, the book pauses for the wisdom poem in
 * chapter 28, and then Job spends two full chapters contrasting the honored
 * man he used to be with the outcast he has become. Seven blocks across four
 * chapters, matching Day 124.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 125,
  title: "Wisdom and Deep Distress",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 125.", 700],
    ["Job swears an oath. He will not lie about himself just to make peace with his friends.", 800],
    ["Then the whole argument stops for a moment, and the book asks a completely different question. Where do you actually find wisdom?", 800],
    ["After that, Job looks back at the man he used to be, and then looks down at the man sitting in the ashes right now.", 850],
    ["We are in Job 27 through 30. An oath, a search for wisdom, and the worst chapter of Job's life so far.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 27, 1, 10, [
      "Job swears by God's own life. As God liveth, who hath taken away my judgment, and the Almighty, who hath vexed my soul. He uses the name of the very God he is arguing with to back his own honesty.",
      "My lips shall not speak wickedness, he says, nor my tongue utter deceit. Then he says something remarkable to the men who have been accusing him for chapters. God forbid that I should justify you. He will not agree with a lie just to end the fight.",
      "Till I die I will not remove mine integrity from me. My righteousness I hold fast, and will not let it go. Job is not claiming he never sinned. He is refusing to confess to things he did not do.",
      "Then he turns their own argument back on them. What is the hope of the hypocrite, though he hath gained, when God taketh away his soul? Will God hear his cry when trouble cometh upon him? He asks the exact question they have been asking about him.",
    ]),
    g("job", 27, 11, 23, [
      "Job says he will teach them what is with the Almighty, and then describes exactly what he believes happens to a wicked man. This is the portion of a wicked man with God, and the heritage of oppressors.",
      "If his children be multiplied, it is for the sword, and his offspring shall not be satisfied with bread. Those that remain of him shall be buried in death, and his widows shall not weep. No one grieves a legacy like that.",
      "He may heap up silver as the dust, and prepare raiment as the clay. But the just shall put it on, and the innocent shall divide the silver. He builds a life someone else ends up wearing.",
      "The rich man shall lie down, but he shall not be gathered. Terrors take hold on him as waters, a tempest stealeth him away in the night. Men shall clap their hands at him, and hiss him out of his place. Job agrees with his friends about the wicked. He just will not let them call him one.",
    ]),
    g("job", 28, 1, 13, [
      "The book takes a breath and shows you something men actually can do. Surely there is a vein for the silver, and a place for gold where they fine it. Iron out of the earth, brass out of the stone.",
      "Men go down into the dark to get it. A path which no fowl knoweth, and which the vulture's eye hath not seen. The lion's whelps have not trodden it. They go where no bird and no beast has ever gone, chasing metal.",
      "He putteth forth his hand upon the rock, he overturneth the mountains by the roots, he cutteth out rivers among the rocks. Humanity can dig up almost anything hidden in the ground.",
      "But where shall wisdom be found? And where is the place of understanding? Man knoweth not the price thereof, neither is it found in the land of the living. You can mine for silver. You cannot mine for wisdom.",
    ]),
    g("job", 28, 14, 28, [
      "The depth saith, it is not in me, and the sea saith, it is not with me. Wisdom is not hiding somewhere on a map. It cannot be gotten for gold, neither shall silver be weighed for the price thereof.",
      "The gold of Ophir will not buy it. Neither will onyx, or sapphire, or crystal, or coral, or pearls. The price of wisdom is above rubies. Every currency Job's world knew, listed and rejected, one at a time.",
      "Destruction and death say, we have heard the fame thereof with our ears. Even the worst places have only heard rumors of it. God understandeth the way thereof, and he knoweth the place thereof.",
      "He looketh to the ends of the earth, weighs the wind, measures the waters, makes a decree for the rain. Then he told the one creature who would listen. Unto man he said, behold, the fear of the Lord, that is wisdom, and to depart from evil is understanding. Not a location. A relationship.",
    ]),
    g("job", 29, 1, 11, [
      "Job wishes out loud for the months that are gone. Oh that I were as in months past, as in the days when God preserved me. He is not angry here. He is grieving.",
      "When his candle shined upon his head, and by his light he walked through darkness. When the Almighty was yet with him, and his children were about him. A whole life he cannot get back in one sentence.",
      "He remembers sitting at the city gate, the seat of real authority. The young men saw me, and hid themselves, and the aged arose and stood up. The princes refrained talking, and laid their hand on their mouth.",
      "When the ear heard him, it blessed him. When the eye saw him, it gave witness to him. He was not imagining his own importance. Everyone around him confirmed it, out loud, for years.",
    ]),
    g("job", 29, 12, 25, [
      "Job is not just remembering honor. He is remembering why he had it. I delivered the poor that cried, and the fatherless, and him that had none to help him.",
      "I was eyes to the blind, and feet was I to the lame. I was a father to the poor. And I brake the jaws of the wicked, and plucked the spoil out of his teeth. He used his standing to fight for people who had none of their own.",
      "Men waited for him as for the rain, and opened their mouth wide as for the latter rain. If he laughed on them, they believed it not. His words carried that much weight.",
      "I chose out their way, and sat chief, and dwelt as a king in the army, as one that comforteth the mourners. That is who Job was. Keep that description in your head for the next chapter, because it is about to be gone.",
    ]),
    g("job", 30, 1, 31, [
      "Now the men whose fathers he would not have set with his sheep dogs mock him to his face. They abhor me, they flee far from me, and spare not to spit in my face. The people he used to lift up will not even come near him.",
      "His body is failing along with his name. My bones are pierced in me in the night season, and my sinews take no rest. My skin is black upon me, and my bones are burned with heat. This is not a figure of speech. This is what is actually happening to him.",
      "And worst of all, God has gone quiet. I cry unto thee, and thou dost not hear me. I stand up, and thou regardest me not. Thou art become cruel to me. The God who once made his candle shine now will not even answer.",
      "Did not I weep for him that was in trouble? Was not my soul grieved for the poor? He is still the man from chapter 29. He just cannot find a single reason why any of that matters right now. My harp is turned to mourning, and my organ into the voice of them that weep.",
    ]),
  ],
  closing: [
    ["So that is Day 125.", 700],
    ["Job swore an oath, argued about wisdom, and then told you exactly who he used to be.", 750],
    ["He would not lie just to make peace, and he would not pretend wisdom is something you can dig up or buy.", 800],
    ["The fear of the Lord, that is wisdom. Not a location. A relationship.", 800],
    ["Then he showed you the life he actually lived. Father to the poor. Eyes to the blind. A man people waited on like rain.", 850],
    ["And in one chapter, almost all of it is gone. Mocked by outcasts, in physical agony, and God will not answer him.", 850],
    ["Tomorrow, Job 31 through 34. Job takes one last oath, and a young man named Elihu finally speaks.", 850],
    ["For now, hold on to Job's line about wisdom.", 800],
    ["The fear of the Lord, that is wisdom.", 750],
    ["And to depart from evil is understanding.", 1200],
  ],
};
