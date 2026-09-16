import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 236, written to the Day 1 standard.
 *
 * Lamentations 1-2 named the ruin and left it unresolved. Chapter 3 is where
 * the same poet, still inside the wreckage, stops and remembers who God is -
 * the acrostic's hinge line, "great is thy faithfulness," is written from
 * the bottom of a literal pit. Chapters 4-5 then return to the horror in
 * full (famine, cannibalism, a captured king) and the book ends without a
 * clean resolution. Six blocks across three chapters (110 verses), no gaps.
 */

const lam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Lamentations ${chapter}:${startVerse}-${endVerse}`,
  book: "lamentations",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 236,
  title: "Mercy in the Middle of Lament",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 236. Yesterday left the city in ashes, no comfort tacked on at the end.", 750],
    ["Today the same poet is still standing in that wreckage. And right in the middle of it, he stops and remembers something.", 800],
    ["Then chapters 4 and 5 pull us back into the horror, in full, with nothing softened.", 800],
    ["Grief and mercy, sitting in the same book, not cancelling each other out.", 800],
    ["We are in Lamentations 3 through 5.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    lam(3, 1, 18, [
      "The voice narrows from a whole city to one man. I am the man that hath seen affliction by the rod of his wrath. Chapter 3 speaks in first person, in a way 1 and 2 did not.",
      "He hath builded against me, and compassed me with gall and travail. He hath hedged me about, that I cannot get out: he hath made my chain heavy. This is a man describing his own suffering as a wall built on purpose.",
      "Also when I cry and shout, he shutteth out my prayer. Even the one place he might run to feels closed off.",
      "And it bottoms out here. My strength and my hope is perished from the LORD. Lamentations lets a believer say that sentence out loud, without rushing to correct him.",
    ]),
    lam(3, 19, 33, [
      "Then, mid-poem, the turn. Remembering mine affliction and my misery, the wormwood and the gall. This I recall to my mind, therefore have I hope. He does not stop remembering the pain. He starts remembering something alongside it.",
      "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness. That line was written from inside the ruin, not after it. Hope here is not the absence of grief.",
      "The LORD is good unto them that wait for him, to the soul that seeketh him. It is good that a man should both hope and quietly wait for the salvation of the LORD. Waiting gets named as its own kind of good, not just a delay before the real thing starts.",
      "For he doth not afflict willingly nor grieve the children of men. Even in the middle of describing God's discipline as a wall and a chain, the poet insists this is not who God enjoys being.",
    ]),
    lam(3, 34, 53, [
      "The poem turns to reasoning next. To turn aside the right of a man before the face of the most High, to subvert a man in his cause, the Lord approveth not. Whatever God is doing to Jerusalem, injustice is still not something He approves of anywhere.",
      "Wherefore doth a living man complain, a man for the punishment of his sins? Let us search and try our ways, and turn again to the LORD. Complaint turns into self-examination. He will not let lament skip past what caused it.",
      "We have transgressed and have rebelled: thou hast not pardoned. Thou hast covered thyself with a cloud, that our prayer should not pass through. Confession does not make the pain stop on the spot. He says both are true at once.",
      "Mine eye trickleth down, and ceaseth not, without any intermission, till the LORD look down, and behold from heaven. The weeping has a direction. It is not despair for its own sake. It is aimed at getting God's attention.",
    ]),
    lam(3, 54, 66, [
      "Waters flowed over mine head; then I said, I am cut off. I called upon thy name, O LORD, out of the low dungeon. He names the exact moment he thought it was over, and the exact moment he still called out anyway.",
      "Thou drewest near in the day that I called upon thee: thou saidst, Fear not. Somewhere in his own past, in his own real trouble, God had already answered him this way once before. He is arguing from memory, not just from theology.",
      "O Lord, thou hast pleaded the causes of my soul; thou hast redeemed my life. A man who a few lines ago said his hope had perished is now describing God as his defender.",
      "Then the poem ends asking God to judge the people who hurt him. Render unto them a recompence, O LORD, according to the work of their hands. He hands the vengeance to God instead of keeping it for himself, and stops there.",
    ]),
    lam(4, 1, 16, [
      "Chapter 4 pulls back into the disaster without softening anything. How is the gold become dim! The precious sons of Zion, comparable to fine gold, how are they esteemed as earthen pitchers. The people themselves are the treasure this verse says got devalued.",
      "The tongue of the sucking child cleaveth to the roof of his mouth for thirst: the young children ask bread, and no man breaketh it unto them. There is no vaguer way this could have been written. The poet chooses the sharpest image available.",
      "For the punishment of the iniquity of the daughter of my people is greater than the punishment of the sin of Sodom, that was overthrown as in a moment. Sodom died fast. Jerusalem starved slowly, and the poem says the slow way was worse.",
      "Then the line that is hardest to read: the hands of the pitiful women have sodden their own children: they were their meat in the destruction of the daughter of my people. Lamentations does not look away from what famine drove people to do.",
    ]),
    lam(4, 17, 22, [
      "As for us, our eyes as yet failed for our vain help: in our watching we have watched for a nation that could not save us. They kept scanning the horizon for a rescue that was never coming, from allies who never had the power to give it.",
      "The breath of our nostrils, the anointed of the LORD, was taken in their pits, of whom we said, Under his shadow we shall live among the heathen. That is the king, captured. The one person they thought guaranteed their safety is gone.",
      "The chapter turns and speaks straight to Edom, the neighbor who celebrated Jerusalem's fall. Rejoice and be glad, O daughter of Edom. The cup also shall pass through unto thee: thou shalt be drunken, and shalt make thyself naked. Their turn is coming too.",
      "The punishment of thine iniquity is accomplished, O daughter of Zion; he will no more carry thee away into captivity. In the middle of the taunt to Edom sits a genuine word of hope for Judah. This particular exile has an end.",
    ]),
    lam(5, 1, 22, [
      "The last chapter drops the poem's alphabet pattern and becomes one plain, communal prayer. Remember, O LORD, what is come upon us: consider, and behold our reproach. No more description. Now it is a direct address to God.",
      "We are orphans and fatherless, our mothers are as widows. Servants have ruled over us: there is none that doth deliver us out of their hand. The whole social order has been turned upside down, and they say so without flinching.",
      "Our fathers have sinned, and are not; and we have borne their iniquities. The crown is fallen from our head: woe unto us, that we have sinned! They own their own part in this too, not just their fathers'.",
      "Then the book ends on a request, not an answer. Turn thou us unto thee, O LORD, and we shall be turned; renew our days as of old. But thou hast utterly rejected us; thou art very wroth against us. Lamentations closes mid-prayer, still waiting.",
    ]),
  ],
  closing: [
    ["So that is Day 236.", 700],
    ["A man in a chain he says God built, who still stops to say His mercies are new every morning.", 800],
    ["A city starving badly enough to do the unthinkable, described without a single word softened.", 800],
    ["And a whole book that ends not with resolution, but with a prayer still in the air. Turn thou us unto thee, O LORD, and we shall be turned.", 850],
    ["Lamentations never tells you grief and hope have to take turns. It puts them in the same chapter, sometimes the same verse.", 850],
    ["Tomorrow we leave Jeremiah's generation and meet a new prophet, already in exile, already seeing visions.", 850],
    ["Tomorrow, Ezekiel 1 through 3. A wheel within a wheel, and a scroll that tastes like honey.", 850],
    ["For now, sit with the line written from the bottom of the pit.", 800],
    ["It is of the LORD's mercies that we are not consumed.", 750],
    ["Because his compassions fail not.", 1200],
  ],
};
