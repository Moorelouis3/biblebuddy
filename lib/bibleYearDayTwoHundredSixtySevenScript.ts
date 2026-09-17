import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 267, written to the Day 1 standard.
 *
 * Jonah closes with the real reason he ran: he knew mercy would work, and
 * resented it. Then Micah opens immediately after, naming the exact sins
 * Jonah's Nineveh was spared for repenting of - stolen fields, evicted
 * families, bought prophets - and pointing them at Samaria and Jerusalem
 * instead. Six blocks: two finishing Jonah, four across Micah 1 and 2.
 */

const jonah = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jonah 4:${startVerse}-${endVerse}`,
  book: "jonah",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const micah = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Micah ${chapter}:${startVerse}-${endVerse}`,
  book: "micah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 267,
  title: "God's Compassion and Israel's Sin",
  opening: [
    ["Hey. Good to see you.", 700],
    ["Day 266 ended with the worst city Jonah knew repenting before he even finished the sentence.", 800],
    ["Today we find out how he actually felt about that.", 800],
    ["Then a new book opens, and it names the exact sins Nineveh was just forgiven for, aimed at God's own people instead.", 850],
    ["We are finishing Jonah, then starting Micah 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    jonah(1, 5, [
      "It displeased Jonah exceedingly, and he was very angry. Nineveh's repentance is the best possible outcome of his mission, and it is the worst day of his life.",
      "I pray thee, O LORD, was not this my saying, when I was yet in my country? Therefore I fled before unto Tarshish: for I knew that thou art a gracious God, and merciful, slow to anger, and of great kindness. He finally says the real reason he ran. Not fear of failing. Fear of succeeding.",
      "Take, I beseech thee, my life from me; for it is better for me to die than to live. A prophet who just watched an entire empire's capital turn to God would rather die than watch it work.",
      "So Jonah went out of the city, and sat on the east side, and made him a booth, and sat under it, till he might see what would become of the city. He is still hoping God changes His mind and destroys it anyway. He built a shelter to have a front row seat.",
    ]),
    jonah(6, 11, [
      "The LORD God prepared a gourd, and made it to come up over Jonah, to deliver him from his grief. So Jonah was exceeding glad of the gourd. One plant, and the man who resents an entire city's mercy is suddenly happy.",
      "God prepared a worm when the morning rose the next day, and it smote the gourd that it withered. Then a vehement east wind, and the sun beat upon Jonah's head, that he fainted, and wished to die.",
      "Doest thou well to be angry for the gourd? And he said, I do well to be angry, even unto death. Jonah will defend his anger over a dead plant with the same intensity he used to defend fleeing an entire mission.",
      "Should not I spare Nineveh, that great city, wherein are more than sixscore thousand persons that cannot discern between their right hand and their left hand, and also much cattle? God's last word in the book is a question, not an answer, and Jonah never gets to respond. The book just ends there, on purpose.",
    ]),
    micah(1, 1, 9, [
      "The word of the LORD that came to Micah the Morasthite, which he saw concerning Samaria and Jerusalem. Two capital cities, two kingdoms, one prophet, one message.",
      "Behold, the LORD cometh forth out of his place, and will come down, and tread upon the high places of the earth. And the mountains shall be molten under him, and the valleys shall be cleft, as wax before the fire. This is not gentle. Solid ground turns liquid when God shows up to deal with sin.",
      "What is the transgression of Jacob? is it not Samaria? and what are the high places of Judah? are they not Jerusalem? Micah will not let either kingdom hide behind the other's failure. The capital city is the source, not just the backdrop.",
      "For her wound is incurable; for it is come unto Judah; he is come unto the gate of my people, even to Jerusalem. Samaria falls first, and Micah warns that the same sickness is already at Jerusalem's own gate.",
    ]),
    micah(1, 10, 16, [
      "Declare ye it not at Gath. Micah opens his lament by quoting the exact line David used mourning Saul and Jonathan. Old grief becomes the language for new grief.",
      "Then Micah does something you cannot fully hear in English. He walks through a string of small towns near his own hometown, and puns on what each name means, matching it to the disaster arriving there. Dust to the house of dust. Nakedness to the town whose name means beautiful. Silence to the town whose name means coming out.",
      "It is not wordplay for its own sake. Micah is from this region. These are his own neighbors' towns, and he names every one of them by the thing about to happen to it.",
      "Make thee bald, and poll thee for thy delicate children; enlarge thy baldness as the eagle; for they are gone into captivity from thee. Shaving the head was mourning. Micah tells his own people to start grieving children who have not even been taken yet.",
    ]),
    micah(2, 1, 5, [
      "Woe to them that devise iniquity, and work evil upon their beds! when the morning is light, they practise it, because it is in the power of their hand. These are not crimes of passion. They are planned overnight and executed on schedule.",
      "They covet fields, and take them by violence; and houses, and take them away: so they oppress a man and his house, even a man and his heritage. Land in Israel was not just property. It was a family's permanent inheritance. Stealing it erased a household's whole future at once.",
      "Against this family do I devise an evil, from which ye shall not remove your necks. God answers their scheming with the same word. They devised evil against families. He devises it back against theirs.",
      "We be utterly spoiled: he hath changed the portion of my people. Micah writes the funeral song the land-grabbers will one day sing over their own stolen ground.",
    ]),
    micah(2, 6, 13, [
      "Prophesy ye not, say they to them that prophesy. The powerful do not want to stop sinning. They want quieter prophets.",
      "The women of my people have ye cast out from their pleasant houses; from their children have ye taken away my glory for ever. Micah names exactly who ends up homeless when the powerful get what they want. Not an abstraction. Women and children.",
      "If a man walking in the spirit and falsehood do lie, saying, I will prophesy unto thee of wine and of strong drink; he shall even be the prophet of this people. Tell them what they want to hear, and they will call you a prophet. Micah is describing his own competition.",
      "I will surely gather the remnant of Israel; I will put them together as the sheep of Bozrah... the breaker is come up before them... and their king shall pass before them, and the LORD on the head of them. After two chapters of theft and eviction, the book turns without warning to a shepherd breaking down every fence between His scattered people and home.",
    ]),
  ],
  closing: [
    ["So that is Day 267.", 700],
    ["Jonah never answers God's last question. The book just ends, mid-argument, because the point was never Jonah's answer. It was yours.", 800],
    ["He knew God was gracious and merciful and slow to anger, and he ran from that, not from danger.", 800],
    ["Then Micah opens naming the same mercy's opposite. People who plan theft overnight and evict women and children from their own homes by morning.", 850],
    ["Nineveh repented for violence in a single day. Micah is watching God's own people do the same violence and refuse to.", 850],
    ["And even after two chapters of stolen fields and silenced prophets, the last image is a shepherd breaking down every fence between His people and home.", 850],
    ["Tomorrow we stay in Micah, chapters 3 through 5. Corrupt leaders, and a ruler promised out of the smallest town in Judah.", 850],
    ["For now, sit with Jonah's silence.", 750],
    ["God asked him a question.", 750],
    ["He never said a word back.", 1200],
  ],
};
