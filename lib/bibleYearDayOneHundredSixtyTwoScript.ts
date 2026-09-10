import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 162, written to the Day 1 standard.
 *
 * Psalms 100-102: a short shout of thanksgiving, a king's private vow of
 * integrity, and then the longest, heaviest lament since the early book -
 * a prayer prayed by "the afflicted, when he is overwhelmed." Six blocks
 * carries the full range without rushing the turn into lament.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 162,
  title: "Thanksgiving and Mercy",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 162. Psalms 100 through 102.", 700],
    ["We start with five verses of pure celebration. Loud, glad, no complications.", 800],
    ["Then a king makes a private vow about who he'll let stand near him.", 750],
    ["And then the mood drops hard. A prayer from someone who says his days are like smoke, and his bones are burning.", 850],
    ["Same book. Same God. Two very different rooms.", 800],
    ["We are in Psalms 100, 101, and 102.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(100, 1, 5, [
      "Make a joyful noise unto the LORD, all ye lands. This psalm doesn't ease in. It opens at full volume, and it's addressed to every land, not just one nation.",
      "Know ye that the LORD he is God: it is he that hath made us, and not we ourselves. That line is aimed at pride. You didn't make yourself. Somebody else did, and it wasn't you.",
      "Enter into his gates with thanksgiving, and into his courts with praise. There's an order here. You don't sneak in. You come in already grateful, before you've asked for anything.",
      "For the LORD is good; his mercy is everlasting; and his truth endureth to all generations. Three claims, stacked. Good now. Merciful without an expiration date. True for every generation that comes after this one.",
    ]),
    g(101, 1, 4, [
      "I will sing of mercy and judgment: unto thee, O LORD, will I sing. This is David, and he's singing about both halves of who God is at once, not just the comfortable one.",
      "I will behave myself wisely in a perfect way. O when wilt thou come unto me? I will walk within my house with a perfect heart. That middle line is easy to miss. Even while making this vow, he's asking God to come near, not just watching himself from a distance.",
      "I will set no wicked thing before mine eyes. Not just avoiding wicked actions. Being careful about what he lets himself look at in the first place.",
      "A froward heart shall depart from me: I will not know a wicked person. This is a king deciding, in advance, who gets access to him. Character before company.",
    ]),
    g(101, 5, 8, [
      "Whoso privily slandereth his neighbour, him will I cut off. Privily means in secret. The kind of talk that happens where nobody can be corrected for it - that's exactly what he's naming.",
      "Him that hath an high look and a proud heart will not I suffer. A high look is a face that's already decided it's above you. He won't have it in the room.",
      "Mine eyes shall be upon the faithful of the land, that they may dwell with me: he that walketh in a perfect way, he shall serve me. He's not just excluding people. He's actively looking for the faithful ones to bring close.",
      "I will early destroy all the wicked of the land; that I may cut off all wicked doers from the city of the LORD. Early, meaning he won't wait for it to get worse. This whole psalm is a king setting the culture of his own house on purpose.",
    ]),
    g(102, 1, 11, [
      "Now the tone changes completely. Hear my prayer, O LORD, and let my cry come unto thee. Hide not thy face from me in the day when I am in trouble. This is not a king's confident vow anymore. This is someone in real trouble asking not to be ignored.",
      "For my days are consumed like smoke, and my bones are burned as an hearth. My heart is smitten, and withered like grass; so that I forget to eat my bread. He's not exaggerating for effect. He's saying he has genuinely stopped eating.",
      "I am like a pelican of the wilderness: I am like an owl of the desert. I watch, and am as a sparrow alone upon the house top. Three pictures of isolation in a row. Birds that live apart from the flock, awake when everyone else is asleep.",
      "My days are like a shadow that declineth; and I am withered like grass. He keeps returning to that same image. Grass, fading. He feels like something that's already halfway gone.",
    ]),
    g(102, 12, 22, [
      "But thou, O LORD, shalt endure for ever; and thy remembrance unto all generations. Right in the middle of the worst of it, the pronoun changes. From my days to thou. That's the turn.",
      "Thou shalt arise, and have mercy upon Zion: for the time to favour her, yea, the set time, is come. He can't fix his own collapse, but he's confident there's a set time when God will act. Not maybe. A set time, already coming.",
      "This shall be written for the generation to come: and the people which shall be created shall praise the LORD. He knows he might not see the relief himself. He's still writing it down so the next generation will know it happened.",
      "For he hath looked down from the height of his sanctuary... to hear the groaning of the prisoner; to loose those that are appointed to death. That's who this God is, according to someone currently suffering. Not distant. Listening for groaning specifically.",
    ]),
    g(102, 23, 28, [
      "He weakened my strength in the way; he shortened my days. I said, O my God, take me not away in the midst of my days: thy years are throughout all generations. He's honest that this feels unfair timing, and he says so directly to God's face.",
      "Of old hast thou laid the foundation of the earth: and the heavens are the work of thy hands. They shall perish, but thou shalt endure. Even the earth and the sky, the most permanent things he knows, are temporary compared to God.",
      "They shall wax old like a garment; as a vesture shalt thou change them, and they shall be changed: but thou art the same, and thy years shall have no end. Everything else ages and gets swapped out. God doesn't. He's the one constant behind a psalm about running out of time.",
      "The children of thy servants shall continue, and their seed shall be established before thee. The very last line isn't about him at all. It's about the ones who come after him, still standing, because the God he's praying to doesn't run out either.",
    ]),
  ],
  closing: [
    ["So that is Day 162.", 700],
    ["Psalm 100 opens loud and grateful. No complications, no requests, just thanks.", 750],
    ["Psalm 101 is a king deciding in advance who gets to stand near him, and who doesn't.", 800],
    ["And Psalm 102 is a completely different voice. Someone whose days feel like smoke, who has stopped eating, who watches the night alone like a bird on a rooftop.", 850],
    ["But even there, in the middle of the worst verse, the prayer turns. From my days, to thou.", 800],
    ["He may not see the relief himself. He writes it down anyway, for the people who come after him.", 850],
    ["Tomorrow, Psalms 103 through 105. Bless the Lord, O my soul, and a long look back at everything God has already done.", 850],
    ["For now, hold on to the pivot in Psalm 102.", 800],
    ["But thou, O LORD, shalt endure for ever.", 800],
    ["Even when your days don't.", 1200],
  ],
};
