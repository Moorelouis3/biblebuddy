import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 212, written to the Day 1 standard.
 *
 * Isaiah 49-51: the Servant speaks in the first person for the first time,
 * Zion's despair gets answered with a mother's love and then something
 * stronger than a mother's love, and the word "awake" gets said three times
 * to two different parties. Seven blocks across three chapters (60 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWELVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 212,
  title: "The Servant Restores Zion",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 212.", 700],
    ["The Servant everyone's been hearing about finally speaks for himself today - called before he was born, and honest enough to admit some of the work has felt like nothing.", 850],
    ["Then Zion says the thing you're not supposed to say out loud. The LORD hath forsaken me.", 800],
    ["And three times in these chapters, somebody gets told the same word. Awake.", 800],
    ["We are in Isaiah 49, 50, and 51.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(49, 1, 7, [
      "Listen, O isles, unto me... The LORD hath called me from the womb; from the bowels of my mother hath he made mention of my name. He introduces himself before he's done a single thing to earn it.",
      "I have laboured in vain, I have spent my strength for nought, and in vain: yet surely my judgment is with the LORD, and my work with my God. A discouraged admission in the middle of the mission, not after it's finished.",
      "I will also give thee for a light to the Gentiles, that thou mayest be my salvation unto the end of the earth. The job just got bigger than the nation he was called to.",
      "To him whom man despiseth, to him whom the nation abhorreth... Kings shall see and arise, princes also shall worship. Same person, both sentences. Despised first, worshipped after.",
    ]),
    g(49, 8, 13, [
      "In an acceptable time have I heard thee, and in a day of salvation have I helped thee... and give thee for a covenant of the people. Not just someone who delivers a covenant. He becomes it.",
      "To them that are in darkness, Shew yourselves. They shall not hunger nor thirst... for he that hath mercy on them shall lead them. Prisoners let out into a homecoming somebody is shepherding, not just freedom with no one watching over it.",
      "I will make all my mountains a way, and my highways shall be exalted. The terrain that used to block the road becomes the road.",
      "These shall come from far... from the land of Sinim. Sing, O heavens... for the LORD hath comforted his people. People returning from the far edge of the map, and heaven gets told to sing about it before they've even arrived.",
    ]),
    g(49, 14, 26, [
      "But Zion said, The LORD hath forsaken me, and my Lord hath forgotten me. After everything just promised, she still says this out loud.",
      "Can a woman forget her sucking child... yea, they may forget, yet will I not forget thee. God answers with the strongest bond he can name, then says he's more reliable than even that.",
      "Behold, I have graven thee upon the palms of my hands; thy walls are continually before me. Not a note God might misplace. A mark cut into skin.",
      "Kings shall be thy nursing fathers, and their queens thy nursing mothers: they shall bow down to thee... and lick up the dust of thy feet. The same empires that tore Zion down end up serving the children she thought she'd lost.",
    ]),
    g(50, 1, 11, [
      "Where is the bill of your mother's divorcement...? Behold, for your iniquities have ye sold yourselves. God didn't put them away. They sold themselves and are looking for someone else to blame.",
      "Wherefore, when I came, was there no man? when I called, was there none to answer? Is my hand shortened at all, that it cannot redeem? The silence wasn't God running out of power. It's God asking why nobody answered when he showed up.",
      "The Lord GOD hath opened mine ear, and I was not rebellious... I gave my back to the smiters, and my cheeks to them that plucked off the hair: I hid not my face from shame and spitting. The obedient one, taking what the rebellious nation deserved.",
      "I have set my face like a flint, and I know that I shall not be ashamed. Not because the smiting and spitting didn't hurt. Because he decided in advance not to flinch from it.",
    ]),
    g(51, 1, 8, [
      "Look unto the rock whence ye are hewn... Look unto Abraham your father... for I called him alone, and blessed him, and increased him. A whole nation, reminded it started as one man.",
      "The LORD shall comfort Zion... he will make her wilderness like Eden. The ruin gets reversed back into garden language, on purpose.",
      "The heavens shall vanish away like smoke, and the earth shall wax old like a garment... but my salvation shall be for ever. Everything you can see is temporary. What he's offering isn't.",
      "Fear ye not the reproach of men... the moth shall eat them up like a garment: but my righteousness shall be for ever. The same moth that eats enemies down to nothing can't touch what he's promised.",
    ]),
    g(51, 9, 16, [
      "Awake, awake, put on strength, O arm of the LORD... Art thou not it that hath cut Rahab, and wounded the dragon? Now it's Zion begging God to wake up, reaching back for old victories to prove he still can.",
      "Hath made the depths of the sea a way for the ransomed to pass over. The same sea their ancestors walked through dry, brought back up as proof.",
      "I, even I, am he that comforteth you: who art thou, that thou shouldest be afraid of a man that shall die... and forgettest the LORD thy maker? He turns the question back on them. Afraid of men who die, and they'd forgotten who stretched out the sky.",
      "I have put my words in thy mouth, and I have covered thee in the shadow of mine hand... and say unto Zion, Thou art my people. Back to the servant, handed the exact words to carry.",
    ]),
    g(51, 17, 23, [
      "Awake, awake, stand up, O Jerusalem, which hast drunk at the hand of the LORD the cup of his fury. Now Jerusalem herself gets the wake-up call. The cup is already finished.",
      "There is none to guide her among all the sons whom she hath brought forth. No one left standing to walk her home. As bleak an image as this book has.",
      "I have taken out of thine hand the cup of trembling... thou shalt no more drink it again. Not just endured. Removed.",
      "I will put it into the hand of them that afflict thee... thou hast laid thy body as the ground... to them that went over. What was done to Jerusalem gets handed to the ones who did it.",
    ]),
  ],
  closing: [
    ["So that is Day 212.", 700],
    ["The Servant said his work felt like nothing, and then found out kings would rise for him anyway.", 800],
    ["Zion said, The LORD hath forsaken me. God answered with a mother's love, and then said he's more reliable than that.", 800],
    ["Graven on the palms of his hands. Not a note God might lose. A mark he carries.", 800],
    ["Three times, awake. The arm of the LORD, then Jerusalem herself, both told to get up and remember who they are.", 850],
    ["And the cup Jerusalem drank to the dregs gets taken out of her hand and put into someone else's.", 850],
    ["Tomorrow, Isaiah 52 through 54. The Servant everyone's been hearing about gets described in full, and it isn't kind.", 850],
    ["For now, remember what gets carried on the palm of a hand.", 800],
    ["Not a memory. A mark.", 750],
    ["Put there on purpose.", 1200],
  ],
};
