import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 163, written to the Day 1 standard.
 *
 * Psalms 103-105: the heaviest reading in a while, 102 verses across three
 * long psalms - personal mercy, then creation itself, then Israel's whole
 * history from Abraham's tents through the plagues. Seven blocks, wider
 * verse ranges per block, matching how Day 9's four-chapter reading and
 * Day 12's heavier Genesis reading got consolidated.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 163,
  title: "Bless the Lord and Remember His Works",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 163. Psalms 103 through 105.", 700],
    ["Yesterday's psalm ended with a man who felt like his days were smoke.", 800],
    ["Today opens with the same kind of voice, in a completely different mood. Bless the LORD, O my soul.", 800],
    ["Then the middle psalm walks through creation itself, and the last one walks through Israel's whole history, plague by plague.", 850],
    ["Three different angles on the same command. Remember what He has done.", 800],
    ["We are in Psalms 103, 104, and 105.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(103, 1, 10, [
      "Bless the LORD, O my soul: and all that is within me, bless his holy name. He isn't just feeling grateful. He's giving his own soul an order.",
      "Then he lists what not to forget. Forgives iniquities, heals diseases, redeems life from destruction, crowns you with lovingkindness. Four specific things, not a vague mood.",
      "The LORD is merciful and gracious, slow to anger, and plenteous in mercy. Slow to anger doesn't mean never angry. It means it takes him a long time to get there.",
      "He hath not dealt with us after our sins; nor rewarded us according to our iniquities. That's the whole psalm in one line. Not what you earned. Something else instead.",
    ]),
    g(103, 11, 22, [
      "As far as the east is from the west, so far hath he removed our transgressions from us. East and west never meet, however far you travel. That's the distance he means.",
      "Like as a father pitieth his children, so the LORD pitieth them that fear him. For he knoweth our frame; he remembereth that we are dust. He isn't surprised by your weakness. He built you out of dust and never forgot it.",
      "Then the psalm turns to how short a life actually is. Like grass, like a flower of the field - here, then the wind passes over it, and the place it stood forgets it was ever there.",
      "Against that shortness, the mercy of the LORD is from everlasting to everlasting. The psalm ends by widening out - angels, hosts, everything he ever made, all called to bless him, same as the one soul that opened it.",
    ]),
    g(104, 1, 18, [
      "Thou art clothed with honour and majesty. Who coverest thyself with light as with a garment. He wears light the way you'd wear a coat. That's the scale this psalm works at.",
      "It walks through creation almost in order - the sky stretched out like a curtain, water given a boundary it can't cross, springs sent into valleys to give every wild animal something to drink.",
      "And it gets specific. Wine that maketh glad the heart of man, oil to make his face shine, bread that strengtheneth man's heart. Not just survival. Things built in on purpose to feel good.",
      "Even the animals nobody manages get a home here - storks in the fir trees, wild goats on the high hills, rock badgers tucked into the rocks. Nothing gets left out of the plan.",
    ]),
    g(104, 19, 35, [
      "Day and night both get scheduled. The moon appointed for seasons, the sun knows when to set. Then night belongs to young lions roaring after their prey, and morning belongs to man going out to his labour.",
      "O LORD, how manifold are thy works! In wisdom hast thou made them all. Even the sea gets a creature made just to play in it - leviathan, not doing anything useful, just alive and enjoying it.",
      "Thou hidest thy face, they are troubled: thou takest away their breath, they die, and return to their dust. Thou sendest forth thy spirit, they are created. Life and death both run through the same hand, in the same breath.",
      "The psalm closes with the writer's own resolve. I will sing unto the LORD as long as I live. After thirty-five verses about the whole world, he ends by promising his own small part in it.",
    ]),
    g(105, 1, 15, [
      "O give thanks unto the LORD; call upon his name: make known his deeds among the people. This whole psalm is one long history lesson, and it opens by telling you why. So you will tell somebody else.",
      "It calls Israel by name - seed of Abraham his servant, children of Jacob his chosen - and reminds them of a covenant made when they were but a few men in number, strangers in the land they would one day own.",
      "He suffered no man to do them wrong: yea, he reproved kings for their sakes. A small, wandering family, and this psalm shows God correcting actual kings just to protect them.",
      "Touch not mine anointed, and do my prophets no harm. That warning went out while Abraham's family still had nothing but a promise and a handful of tents.",
    ]),
    g(105, 16, 25, [
      "He sent a man before them, even Joseph, who was sold for a servant. The psalm compresses Joseph's whole story - the pit, the slavery, the prison - into one line. Sold for a servant.",
      "Whose feet they hurt with fetters: he was laid in iron: until the time that his word came: the word of the LORD tried him. Joseph waited in chains for a promise God had already given him, years earlier, in a dream.",
      "Then the reversal comes just as fast. The king who could have kept him in prison instead makes him lord of his house, and ruler of all his substance.",
      "And Israel grows in Egypt exactly the way God intended, until he turned their heart to hate his people. The same nation that welcomed Joseph turns on his family after he is gone.",
    ]),
    g(105, 26, 45, [
      "Now the plagues get their own quick list. Waters turned to blood, frogs, flies and lice, hail and fire, locusts, and finally the firstborn struck. Ten chapters of Exodus compressed into a handful of verses.",
      "He brought them forth also with silver and gold: and there was not one feeble person among their tribes. Not a ragged escape. A whole nation walking out healthy and provided for.",
      "He opened the rock, and the waters gushed out; they ran in the dry places like a river. Same wilderness, same thirst you already read about earlier this year. The psalm is looking back at your own reading.",
      "The very last line explains why any of this got written down. That they might observe his statutes, and keep his laws. The history was never the point by itself. It's the reason for what comes next.",
    ]),
  ],
  closing: [
    ["So that is Day 163.", 700],
    ["Three psalms, and every one of them works the same way. Look at what God has done, then respond.", 750],
    ["Psalm 103 counts personal mercy. Forgiven sin, healed disease, a father's pity for dust.", 800],
    ["Psalm 104 counts creation itself. Light worn like a garment, wine to make the heart glad, a sea built just so leviathan could play in it.", 800],
    ["And Psalm 105 counts history. A promise kept from Abraham's tents, through Joseph's chains, through ten plagues in Egypt.", 850],
    ["Three different scales. Personal, cosmic, national. Same instruction every time. Remember, and give thanks.", 850],
    ["Tomorrow, Psalms 106 through 108. The same history gets told again, this time from the side of a people who kept forgetting it.", 850],
    ["For now, hold on to one line from Psalm 103.", 800],
    ["He hath not dealt with us after our sins.", 800],
    ["Not what you earned. Something else instead.", 1200],
  ],
};
