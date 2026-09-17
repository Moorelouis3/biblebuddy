import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 260, written to the Day 1 standard.
 *
 * Hosea 10-12: the sowing imagery from chapter 8 comes back and gets
 * personal, and then the book steps back into Jacob's own story to show
 * Israel where its trouble actually started. Six blocks, two per chapter.
 */

const hos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hosea ${chapter}:${startVerse}-${endVerse}`,
  book: "hosea",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 260,
  title: "Sowing Sin and Remembering Jacob",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 260. Yesterday ended with no fruit left on the vine.", 750],
    ["Today Hosea tells Israel exactly how the ground got that way, and then does something you would not expect. He looks back at Jacob.", 850],
    ["A trained heifer, a father teaching a toddler to walk, and a man wrestling all night by a river.", 800],
    ["The same family, the same patterns, going back further than anyone in Samaria wants to admit.", 800],
    ["We are in Hosea 10 through 12.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    hos(10, 1, 8, [
      "Israel is an empty vine, he bringeth forth fruit unto himself. The more he prospered, the more he built with it. According to the multitude of his fruit he hath increased the altars. Success did not turn Israel toward God. It funded more places to worship someone else.",
      "For now they shall say, We have no king, because we feared not the LORD. Watch the logic. A king was never really the thing holding this nation together. Once the fear of the LORD was gone, the throne was already empty, whoever happened to be sitting on it.",
      "The calves of Beth-aven. Beth-el means house of God. Hosea will not even say the name. He calls it Beth-aven, house of nothing, because that is what a golden calf turns a house of God into. That same calf will be carried off to Assyria as a present to a foreign king.",
      "They shall say to the mountains, Cover us; and to the hills, Fall on us. A cry so desperate it shows up again centuries later, on the lips of people begging for the exact same thing. Israel is the first to say it, standing in front of altars grown over with thorns.",
    ]),
    hos(10, 9, 15, [
      "O Israel, thou hast sinned from the days of Gibeah. Gibeah was generations back, a night of horror at the start of the book of Judges that nearly ended the tribe of Benjamin. Hosea is saying the sickness is not new. It has old roots.",
      "Ephraim is as an heifer that is taught, and loveth to tread out the corn. A heifer treading grain gets to eat while it works, an easy, comfortable job. But I passed over upon her fair neck. God is done letting her walk the easy circle. The plow is coming next.",
      "Sow to yourselves in righteousness, reap in mercy; break up your fallow ground: for it is time to seek the LORD. Fallow ground is unused ground, packed hard from years of nothing being planted in it. Before any seed can take, somebody has to break it open first.",
      "Ye have plowed wickedness, ye have reaped iniquity. They already knew how to farm. They just planted the wrong thing, in the multitude of thy mighty men, trusting armies to grow what only God could. And Shalman spoiled Beth-arbel, the mother dashed in pieces upon her children. A remembered atrocity, dropped in without softening, to show exactly what trusting the sword instead of God actually costs.",
    ]),
    hos(11, 1, 7, [
      "When Israel was a child, then I loved him, and called my son out of Egypt. The chapter turns completely. After two chapters of plowed wickedness, God starts talking like a father remembering his kid.",
      "I taught Ephraim also to go, taking them by their arms. Picture a parent walking behind a toddler, hands out, ready to catch him. But they knew not that I healed them. The whole time, Israel thought he was learning to walk on his own.",
      "I drew them with cords of a man, with bands of love, and I laid meat unto them. Not chains. Not threats. Cords soft enough to call love, and a father who fed his own child by hand. This is the same God whose calves and altars just got torn apart two chapters ago.",
      "And still, my people are bent to backsliding from me. Bent is the word to catch. Not a stumble. A permanent lean, built into how they stand, so that even when they are called upward, none at all would exalt him.",
    ]),
    hos(11, 8, 12, [
      "How shall I give thee up, Ephraim? How shall I deliver thee, Israel? How shall I make thee as Admah? How shall I set thee as Zeboim? Two cities destroyed alongside Sodom. God is asking himself out loud whether Israel deserves the very same ending, and cannot finish the sentence.",
      "Mine heart is turned within me, my repentings are kindled together. There is no verse like this anywhere else in Hosea. Not anger. Not distance. God describing his own heart turning over inside him, torn between justice and love for the same people.",
      "I will not execute the fierceness of mine anger... for I am God, and not man. That is the reason given for holding back. Not that Israel earned it. Because he is God, and a man who felt what God is describing here would not have the strength to stop.",
      "They shall tremble as a bird out of Egypt, and as a dove out of the land of Assyria: and I will place them in their houses. After all of it, a promise of coming home. The trembling does not disappear. It just turns into the trembling of somebody finally walking back through their own front door.",
    ]),
    hos(12, 1, 7, [
      "Ephraim feedeth on wind, and followeth after the east wind. The east wind in this part of the world is the hot one, the one that scorches crops. Israel is chasing exactly the thing that will burn her, making treaties with Assyria while sending oil to buy favor in Egypt at the same time.",
      "He took his brother by the heel in the womb, and by his strength he had power with God... he wept, and made supplication unto him: he found him in Bethel. Hosea suddenly reaches all the way back to Jacob grabbing Esau's heel, and to the night he wrestled the angel and would not let go until he was blessed.",
      "The LORD God of hosts; the LORD is his memorial. His name itself is the thing meant to be remembered. Not a monument, not an altar on a hilltop. The name.",
      "Therefore turn thou to thy God: keep mercy and judgment, and wait on thy God continually. The appeal lands right where the history lesson was pointing. Jacob eventually let go of his grabbing and held onto God instead. Hosea is asking the nation named after him to do the same thing.",
    ]),
    hos(12, 8, 14, [
      "Ephraim said, Yet I am become rich, I have found me out substance: in all my labours they shall find none iniquity in me that were sin. This is the voice of a man checking his own bank account for proof of his own innocence. Wealth does not settle the question. It just makes it easier to avoid asking.",
      "I have also spoken by the prophets, and I have multiplied visions, and used similitudes. That word explains this entire book. A cake not turned, a silly dove, a heifer treading corn, wind, an east wind, cords of love. God has always taught this way, in pictures a person can actually see.",
      "Jacob fled into the country of Syria, and Israel served for a wife, and for a wife he kept sheep. The nation's own name began with a man running for his life with nothing, working for years just to earn what he wanted. There was no dignity in the beginning to be nostalgic about.",
      "By a prophet the LORD brought Israel out of Egypt, and by a prophet was he preserved. Moses. The same office Israel now resents in Hosea's mouth is the office that carried their ancestors out of slavery in the first place.",
    ]),
  ],
  closing: [
    ["So that is Day 260.", 700],
    ["Fallow ground that has to be broken up before anything new can grow in it.", 700],
    ["A father teaching a child to walk, who never once found out who was really holding him up.", 800],
    ["And God's own heart, turning over inside him, torn between what Israel deserves and what he still feels for her.", 800],
    ["Then the book reaches back to Jacob. A man who spent his early life grabbing, and finally became someone by holding on to God instead and refusing to let go.", 850],
    ["That is the whole appeal. Not stop being bad. Turn, the way Jacob eventually turned.", 800],
    ["Tomorrow, Hosea 13 and 14, and the start of Joel. Hosea's last word, and then a new voice.", 850],
    ["For now, sit with the name itself.", 750],
    ["The LORD God of hosts. The LORD is his memorial.", 800],
    ["That is what is supposed to be remembered.", 1200],
  ],
};
