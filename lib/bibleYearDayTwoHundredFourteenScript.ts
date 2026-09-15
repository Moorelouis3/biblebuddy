import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 214, written to the Day 1 standard.
 *
 * Isaiah 55-57: an open invitation to anyone thirsty, then a house of prayer
 * for all people, undercut by watchmen who cannot bark, then the idolatry
 * Isaiah refuses to soften into metaphor - closing on the high and lofty One
 * who dwells with the contrite. Six blocks across three chapters (46 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FOURTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 214,
  title: "Invitation, Mercy, and Peace",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 214.", 700],
    ["Yesterday ended with the hardest chapter in Isaiah. Today opens with an invitation nobody has to earn.", 800],
    ["Come, thirsty. Come, with no money. That's the whole offer.", 800],
    ["Then two chapters later it turns and asks who's actually watching the flock.", 850],
    ["We are in Isaiah 55, 56, and 57.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(55, 1, 5, [
      "Ho, every one that thirsteth, come ye to the waters... come, buy wine and milk without money and without price. An invitation shouted to a crowd with nothing to pay, on purpose.",
      "Wherefore do ye spend money for that which is not bread?... hearken diligently unto me, and eat ye that which is good. He isn't just offering food. He's asking why you keep buying the kind that never fills you.",
      "I will make an everlasting covenant with you, even the sure mercies of David. David's own promise, handed to people who never sat on his throne.",
      "Thou shalt call a nation that thou knowest not, and nations that knew not thee shall run unto thee. Strangers running toward Israel now, not the other way around.",
    ]),
    g(55, 6, 13, [
      "Seek ye the LORD while he may be found, call ye upon him while he is near. Not a threat. A window, and Isaiah names it as a window.",
      "Let the wicked forsake his way... and he will have mercy upon him; and to our God, for he will abundantly pardon. The word here isn't a small pardon. It's an abundant one.",
      "My thoughts are not your thoughts, neither are your ways my ways... so are my ways higher than your ways. Said right after mercy that size, like he already expects you not to believe it.",
      "My word... shall not return unto me void, but it shall accomplish that which I please... the mountains and the hills shall break forth before you into singing. Even the trees clap in this chapter. Nothing in it stays quiet.",
    ]),
    g(56, 1, 8, [
      "Keep ye judgment, and do justice: for my salvation is near to come. He puts real ethics right beside a promise of rescue, like they're the same subject.",
      "Let not the son of the stranger... say, The LORD hath utterly separated me from his people: neither let the eunuch say, Behold, I am a dry tree. Two groups the law shut out, told directly they are not shut out here.",
      "Unto them will I give in mine house and within my walls a place and a name better than of sons and of daughters... an everlasting name, that shall not be cut off. A childless man promised something that outlasts having children.",
      "Mine house shall be called an house of prayer for all people. Not for Israel only. For all people, seven hundred years before that line gets quoted again.",
    ]),
    g(56, 9, 12, [
      "All ye beasts of the field, come to devour. A sudden invitation to predators, right after the promise of verse seven. The house of prayer has a guard problem.",
      "His watchmen are blind: they are all ignorant, they are all dumb dogs, they cannot bark; sleeping, lying down, loving to slumber. Watchmen whose entire job is barking, and they can't.",
      "They are greedy dogs which can never have enough... they all look to their own way, every one for his gain, from his quarter. Not one shepherd failing. All of them, each chasing his own cut.",
      "Come ye, say they, I will fetch wine... to morrow shall be as this day, and much more abundant. Their own words, quoted so you hear exactly how little they think is wrong.",
    ]),
    g(57, 1, 13, [
      "The righteous perisheth, and no man layeth it to heart... none considering that the righteous is taken away from the evil to come. Nobody in the room even notices. Isaiah says it plainly so somebody finally does.",
      "Draw near hither, ye sons of the sorceress, the seed of the adulterer and the whore. The tone turns hard and fast, straight at the people this chapter is really about.",
      "Enflaming yourselves with idols under every green tree, slaying the children in the valleys under the clifts of the rocks... hast thou poured a drink offering. Worship language used for something Isaiah refuses to soften into a metaphor.",
      "Thou art wearied in the greatness of thy way; yet saidst thou not, There is no hope. Exhausted from chasing other gods, and still not willing to call it a dead end.",
    ]),
    g(57, 14, 21, [
      "Thus saith the high and lofty One that inhabiteth eternity, whose name is Holy; I dwell in the high and holy place, with him also that is of a contrite and humble spirit. The highest possible claim about God, landing on the lowest possible kind of person.",
      "I will not contend for ever, neither will I be always wroth: for the spirit should fail before me, and the souls which I have made. He puts a limit on his own anger and says why. You couldn't survive it otherwise.",
      "I have seen his ways, and will heal him... I create the fruit of the lips; Peace, peace to him that is far off, and to him that is near. Healing offered to the very idolatry just described, no waiting period attached.",
      "The wicked are like the troubled sea, when it cannot rest... There is no peace, saith my God, to the wicked. The chapter that opened with the righteous quietly dying closes by naming exactly who doesn't get rest instead.",
    ]),
  ],
  closing: [
    ["So that is Day 214.", 700],
    ["Ho, every one that thirsteth, come ye to the waters. No line, no money, no waiting.", 800],
    ["My thoughts are not your thoughts, neither are your ways my ways. Said right after the kind of mercy that's hard to believe.", 800],
    ["Then a house of prayer for all people, open even to the eunuch and the stranger the law used to shut out.", 800],
    ["And watchmen who can't bark, dogs that never have enough, each one chasing his own cut while people go unwarned.", 850],
    ["Then idols under every green tree, called exactly what it is, no metaphor to hide behind.", 850],
    ["Tomorrow, Isaiah 58 through 60. What real worship looks like, and what it doesn't.", 850],
    ["For now, sit with the one who dwells in the high and holy place.", 800],
    ["With him also that is of a contrite and humble spirit.", 750],
    ["The high and the low, in the same verse.", 1200],
  ],
};
