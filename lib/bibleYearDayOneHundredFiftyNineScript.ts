import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 159, written to the Day 1 standard.
 *
 * Psalms 91-93: a hiding place, a reason to give thanks at both ends of the
 * day, and a King whose throne needs no defending. Thirty-six verses across
 * three short chapters, so this day uses six blocks with tighter ranges
 * rather than the seven-block ceiling.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 159,
  title: "Refuge and the Lord Reigns",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 159. Psalms 91 through 93.", 700],
    ["Yesterday ended in the dark, with a prayer that never got answered and an old man counting how few days he had left.", 800],
    ["Today the tone turns. A hiding place, a life that lasts, and a King who never once has to raise his voice to be heard over the flood.", 850],
    ["Three short psalms. But they cover more ground than their length suggests.", 750],
    ["We are in Psalms 91, 92, and 93.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(91, 1, 6, [
      "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. That is the whole psalm in one sentence. Everything after this just proves it.",
      "The first move is not asking God for protection. It is deciding where you live. I will say of the LORD, He is my refuge and my fortress. A decision, spoken out loud, before anything goes wrong.",
      "He shall cover thee with his feathers, and under his wings shalt thou trust. That is not a shield held out at arm's length. That is a bird pulling you in close.",
      "Then four kinds of danger get named back to back. Terror by night. The arrow by day. Pestilence in darkness. Destruction at noonday. This psalm does not pretend those things are not real.",
    ]),
    g(91, 7, 13, [
      "A thousand shall fall at thy side, and ten thousand at thy right hand; but it shall not come nigh thee. That is not a promise that trouble stays away from the world. It is a promise about where it lands.",
      "There shall no evil befall thee, neither shall any plague come nigh thy dwelling. The protection tracks back to verse one. Where you live decides what reaches you.",
      "For he shall give his angels charge over thee, to keep thee in all thy ways. Not a vague feeling of being watched. Angels, given an assignment, about you specifically.",
      "Thou shalt tread upon the lion and adder: the young lion and the dragon shalt thou trample under feet. Two of the deadliest things anyone could meet, and the psalm puts them under your foot instead of in your path.",
    ]),
    g(91, 14, 16, [
      "And here the voice changes. For thirteen verses a person has been talking about God. Now God talks back. Because he hath set his love upon me, therefore will I deliver him.",
      "He shall call upon me, and I will answer him. That is the whole relationship in one line. Not information about God. A response from God.",
      "I will be with him in trouble. Not instead of trouble. This psalm never once promises a life with no trouble in it. It promises company inside it.",
      "With long life will I satisfy him, and shew him my salvation. The psalm that opened with hiding closes with God doing the showing.",
    ]),
    g(92, 1, 8, [
      "It is a good thing to give thanks unto the LORD. Psalm 92 is titled for the sabbath, and it opens by calling gratitude good, not just required.",
      "To shew forth thy lovingkindness in the morning, and thy faithfulness every night. Thanks at both ends of the day, whether the day was good or not.",
      "A brutish man knoweth not, neither doth a fool understand this. When the wicked spring as the grass, it is that they shall be destroyed for ever. Growing fast is not the same as lasting.",
      "But thou, LORD, art most high for evermore. Grass grows in a season and is gone. God does not have a season.",
    ]),
    g(92, 9, 15, [
      "The righteous shall flourish like the palm tree: he shall grow like a cedar in Lebanon. Two trees built for very different weather, and the psalm says a life planted in God can be both.",
      "Those that be planted in the house of the LORD shall flourish in the courts of our God. Planted, not just visiting. The flourishing depends on staying rooted somewhere.",
      "They shall still bring forth fruit in old age; they shall be fat and flourishing. This is not a promise for the strong years only. It names old age on purpose.",
      "To shew that the LORD is upright: he is my rock, and there is no unrighteousness in him. That is the whole point of the fruit. Not to prove something about the tree. To prove something about the ground.",
    ]),
    g(93, 1, 5, [
      "The LORD reigneth, he is clothed with majesty. Five verses, and the psalm never once argues the point. It just states it and keeps building.",
      "The floods have lifted up, O LORD, the floods have lifted up their voice; the floods lift up their waves. Water was the loudest, most uncontrollable thing anyone in this world knew. The psalm names it three times in one verse, on purpose.",
      "The LORD on high is mightier than the noise of many waters, yea, than the mighty waves of the sea. Whatever is loudest in your life right now, this verse was written to outlast it.",
      "Thy testimonies are very sure: holiness becometh thine house, O LORD, for ever. Refuge in Psalm 91, gratitude in 92, and now the reason both of those hold. The one they are about does not change.",
    ]),
  ],
  closing: [
    ["So that is Day 159.", 700],
    ["A secret place to live in, a reason to give thanks morning and night, and a King whose throne needs no defending.", 800],
    ["Psalm 91 never promises a life with no trouble in it. It promises whose hands you land in when trouble comes.", 800],
    ["Psalm 92 says thanks is not just for good days. It is for both ends of every day, the good ones and the hard ones.", 850],
    ["And Psalm 93 answers yesterday's whole question without raising its voice. The floods lift up. The LORD is louder.", 850],
    ["Tomorrow, Psalms 94 through 96. Justice for the ones getting away with it, and worship for everyone else.", 850],
    ["For now, hold on to where you live.", 800],
    ["He that dwelleth in the secret place of the most High.", 750],
    ["Shall abide under the shadow of the Almighty.", 1200],
  ],
};
