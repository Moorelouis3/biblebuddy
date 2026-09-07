import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 135, written to the Day 1 standard.
 *
 * Psalms 19-21: the sky preaching without a single word, God's own word named
 * six different ways and found sweeter than honey, a prayer said over a king
 * before he even leaves for battle, and then that exact prayer, answered.
 * Five blocks, splitting each psalm where its own tone turns.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 135,
  title: "Creation, Scripture, and the King",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 135. Yesterday ended with an earthquake of a rescue in Psalm eighteen.", 750],
    ["Today opens completely differently. No enemies. No crisis. Just a sky.", 800],
    ["Psalm nineteen says that sky has been preaching since the day it was made, without ever saying a word.", 850],
    ["Psalm twenty is a prayer prayed over someone else, before he has even left for battle.", 800],
    ["And Psalm twenty-one is what that same prayer looked like once it came back answered.", 850],
    ["We are in Psalms 19 through 21.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 6, [
      "The heavens declare the glory of God; and the firmament sheweth his handywork. No person has said anything yet. The sky itself is doing the preaching.",
      "Day unto day uttereth speech, and night unto night sheweth knowledge. Not a one-time sermon. This happens every single day and every single night, on repeat, whether anyone looks up or not.",
      "There is no speech nor language, where their voice is not heard. Their line is gone out through all the earth. A voice with no words that still reaches every language on earth. That is the paradox on purpose.",
      "In them hath he set a tabernacle for the sun, which is as a bridegroom coming out of his chamber, and rejoiceth as a strong man to run a race. God did not just hang the sun up. He gave it a home and a reason to run.",
    ]),
    g(19, 7, 14, [
      "The law of the LORD is perfect, converting the soul: the testimony of the LORD is sure, making wise the simple. After six verses of sky, David turns to something louder: actual words from God, not just light and weather.",
      "The statutes of the LORD are right, rejoicing the heart: the commandment of the LORD is pure, enlightening the eyes: the fear of the LORD is clean, enduring for ever: the judgments of the LORD are true and righteous altogether. Six different names for the same thing, on purpose. God's word does not do one job. It corrects, it clarifies, it lights up, it lasts.",
      "More to be desired are they than gold, yea, than much fine gold: sweeter also than honey and the honeycomb. Not useful. Desirable. David is not describing a rulebook he tolerates. He is describing something he wants.",
      "Who can understand his errors? cleanse thou me from secret faults. Keep back thy servant also from presumptuous sins. Let the words of my mouth, and the meditation of my heart, be acceptable in thy sight, O LORD, my strength, and my redeemer. Presumptuous means done on purpose, eyes open. He asks to be kept from those, right after admitting he cannot even see all of the accidental ones.",
    ]),
    g(20, 1, 9, [
      "The LORD hear thee in the day of trouble; the name of the God of Jacob defend thee; send thee help from the sanctuary, and strengthen thee out of Zion. Notice the pronoun. This whole psalm is thee, not me. It is the nation praying over their king before he goes to war, not the king praying for himself.",
      "We will rejoice in thy salvation... the LORD fulfil all thy petitions. Now know I that the LORD saveth his anointed. The prayer shifts mid-verse from asking to being certain. Something has settled in the room before any answer has actually come.",
      "Some trust in chariots, and some in horses: but we will remember the name of the LORD our God. They are brought down and fallen: but we are risen, and stand upright. Two armies get named without a single sword being drawn. One trusts hardware. One trusts a name.",
      "Save, LORD: let the king hear us when we call. It ends back where it started, asking. But watch the shape: the people prayed for the king, and now they want the king to hear them too. That request gets its answer in the very next psalm.",
    ]),
    g(21, 1, 7, [
      "The king shall joy in thy strength, O LORD; and in thy salvation how greatly shall he rejoice! Thou hast given him his heart's desire, and hast not withholden the request of his lips. This is Psalm 20's prayer, read back after it worked.",
      "For thou preventest him with the blessings of goodness: thou settest a crown of pure gold on his head. Preventest does not mean stopped here. It means went ahead of. God met him with good things before he even arrived.",
      "He asked life of thee, and thou gavest it him, even length of days for ever and ever. No king actually lives forever. The words are already reaching past the man sitting on the throne.",
      "For the king trusteth in the LORD, and through the mercy of the most High he shall not be moved. That phrase again, the same one that has followed David through these last several psalms. It still means the same thing: held, not self-made.",
    ]),
    g(21, 8, 13, [
      "Thine hand shall find out all thine enemies: thy right hand shall find out those that hate thee. Thou shalt make them as a fiery oven in the time of thine anger. This part of the psalm is harsh, and it is not softened. The same king who just received a crown of pure gold now describes fire.",
      "Their fruit shalt thou destroy from the earth, and their seed from among the children of men. For they intended evil against thee: they imagined a mischievous device, which they are not able to perform. The plan fails specifically because it was aimed at God, not just at a man on a throne.",
      "Therefore shalt thou make them turn their back, when thou shalt make ready thine arrows upon thy strings against the face of them. Even the archery detail is precise. This is not vague doom. It is a very specific picture of a battle actually being won.",
      "Be thou exalted, LORD, in thine own strength: so will we sing and praise thy power. The psalm ends exactly where it began. The king rejoiced in God's strength in verse one. The people ask for that same strength to be lifted up in the very last line.",
    ]),
  ],
  closing: [
    ["So that is Day 135.", 700],
    ["A sky that preaches without words, a word from God named six different ways, and a prayer that gets answered between one psalm and the next.", 800],
    ["Notice what Psalm nineteen does. It puts the sky and the Scriptures side by side, on purpose.", 800],
    ["The sky tells you God is real. The word tells you what he actually said. Both are called perfect and pure, and only one of them uses language.", 850],
    ["And Psalms twenty and twenty-one are not two separate songs. They are the same prayer, on either side of the answer.", 850],
    ["Ask, and then watch what it looked like once it landed.", 800],
    ["Tomorrow, Psalms 22 through 24. A cry of being forsaken, a shepherd, and a King of glory coming through the gates.", 850],
    ["For now, hold on to the sky.", 800],
    ["It has been preaching this whole time.", 750],
    ["You just had to look up.", 1200],
  ],
};
