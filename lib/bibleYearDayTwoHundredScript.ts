import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 200, written to the Day 1 standard.
 *
 * Isaiah 13-15 opens the "burdens" section: oracles against the nations
 * surrounding Judah, starting with the empire everyone fears most. Babylon
 * falls, its king gets mocked all the way into the grave, and the burden
 * spreads to Assyria, Philistia, and Moab. Six blocks, one per natural
 * break in the three chapters.
 */

const isa = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SCRIPT: BibleYearDayScript = {
  dayNumber: 200,
  title: "Nations Under God's Judgment",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 200.", 650],
    ["Two hundred days in, and today the story turns outward.", 750],
    ["Isaiah stops preaching to Judah and starts preaching over the fence, at the nations around her.", 800],
    ["First stop: the empire everyone on earth is afraid of. Babylon.", 800],
    ["And it does not go the way you would expect for the biggest power alive.", 850],
    ["We are in Isaiah 13, 14, and 15.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    isa(13, 1, 16, [
      "Isaiah opens with a call to arms — lift ye up a banner upon the high mountain... that they may go into the gates of the nobles. God is summoning an army, and it is not Israel's.",
      "He names the target Himself. The day of the LORD is at hand; it shall come as a destruction from the Almighty. Not a natural disaster. A decision.",
      "The terror shows up in the body before it shows up as an idea — every man's heart shall melt... they shall be in pain as a woman that travaileth. Judgment does not arrive as a lecture. It arrives as fear people can feel.",
      "It reaches past Babylon into the sky itself, stars and sun and moon going dark, because I will punish the world for their evil... I will make a man more precious than fine gold. When the proud fall this hard, an ordinary human life suddenly looks priceless again.",
    ]),
    isa(13, 17, 22, [
      "God names who does it. The Medes, which shall not regard silver; and as for gold, they shall not delight in it. An empire that worships wealth gets conquered by one that does not even want it.",
      "Then the line that would have stopped every listener cold. Babylon, the glory of kingdoms, the beauty of the Chaldees' excellency, shall be as when God overthrew Sodom and Gomorrah. The greatest city on earth, filed under the same word as the worst.",
      "It shall never be inhabited... neither shall the shepherds make their fold there. Not conquered and rebuilt. Erased. No flocks, no tents, nothing ordinary ever happens there again.",
      "Instead, wild beasts of the desert shall lie there... owls shall dwell there, and satyrs shall dance there. The throne room of the world becomes a place nobody wants to stand in.",
    ]),
    isa(14, 1, 11, [
      "Before the taunt song even starts, God turns to His own people. The LORD will have mercy on Jacob, and will yet choose Israel... they shall take them captives, whose captives they were. The very people who enslaved Israel end up serving her instead.",
      "Then comes the proverb Israel gets to sing over the fallen king. How hath the oppressor ceased! the golden city ceased! The empire that never lost gets a funeral song.",
      "Even the forests get a line. The fir trees rejoice at thee, and the cedars of Lebanon... since thou art laid down, no feller is come up against us. The trees he cut down for his monuments are glad he is gone.",
      "And the underworld itself reacts. Hell from beneath is moved for thee to meet thee... Art thou also become weak as we? Dead kings, sitting up to mock the new arrival. The worst welcome imaginable.",
    ]),
    isa(14, 12, 23, [
      "The taunt reaches for the highest language it has. How art thou fallen from heaven, O Lucifer, son of the morning! Whatever this king thought he was, heaven never agreed.",
      "His own words get quoted back at him. I will ascend into heaven, I will exalt my throne above the stars of God... I will be like the most High. Five I wills, and every one of them a lie he told himself.",
      "The answer to all five is one line. Yet thou shalt be brought down to hell, to the sides of the pit. Not humbled. Buried.",
      "Other kings lie in glory, every one in his own house, but not him. Thou art cast out of thy grave like an abominable branch... as a carcase trodden under feet. Even in death, ordinary kings get more dignity than this one does.",
    ]),
    isa(14, 24, 32, [
      "God widens the lens past Babylon. The LORD of hosts hath sworn... that I will break the Assyrian in my land... his yoke shall depart from off them. The other empire Judah is afraid of gets the same sentence.",
      "Then one line for every reader, not just Judah. The LORD of hosts hath purposed, and who shall disannul it? and his hand is stretched out, and who shall turn it back? A promise this size does not come with an escape clause.",
      "The burden turns next to Philistia, the old enemy at Judah's back door. Rejoice not thou, whole Palestina, because the rod of him that smote thee is broken. Their relief is premature. Something worse is still coming.",
      "And the chapter ends where it should. The LORD hath founded Zion, and the poor of his people shall trust in it. While empires fall, the one place actually built to last is the one nobody is afraid of.",
    ]),
    isa(15, 1, 9, [
      "Moab's turn, and it opens mid collapse. In the night Ar of Moab is laid waste... in the night Kir of Moab is laid waste. No warning, no daylight. Disaster while everyone slept.",
      "The grief is physical and public. On all his heads shall be baldness, every beard cut off... in the streets... every one shall howl, weeping abundantly. Isaiah does not summarize the mourning. He puts you in the street with it.",
      "Even the land grieves. The waters of Nimrim shall be desolate: for the hay is withered away, the grass faileth, there is no green thing. A country with nothing left carries whatever it has left to the brook of the willows.",
      "And it ends on the grimmest line in the chapter. The waters of Dimon shall be full of blood: for I will bring more upon Dimon, lions upon him that escapeth of Moab. Even the ones who get away do not actually get away.",
    ]),
  ],
  closing: [
    ["So that is Day 200.", 700],
    ["Babylon, Assyria, Philistia, Moab. Four nations, one message. Power that answers to nobody still answers to God.", 800],
    ["The line that should stay with you is the one about the five I wills.", 800],
    ["Every empire in these chapters said some version of the same thing in its heart. I will ascend. I will exalt. I will be like the Most High.", 850],
    ["And every single one of them ended up in the ground instead.", 850],
    ["Meanwhile Zion, the place nobody is afraid of, is the one thing still standing when the chapter closes.", 850],
    ["Tomorrow, Isaiah 16 through 18. Moab keeps grieving, and the oracles keep moving outward.", 850],
    ["For now, carry the line about the poor.", 750],
    ["The LORD hath founded Zion, and the poor of his people shall trust in it.", 1200],
  ],
};
