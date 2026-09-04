import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 101, written to the Day 1 standard.
 *
 * 1 Chronicles 29 closes David's story with his last public act and his
 * death; 2 Chronicles 1-3 opens Solomon's with a request that surprises God
 * and the actual start of construction on the temple David was never
 * allowed to build. Six blocks across four chapters.
 */

const chron1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "1 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 101,
  title: "David's Offering and Solomon's Temple",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 101. David gives everything he has left, and then he dies.", 750],
    ["Not in battle. Not in disgrace. In a good old age, full of days, full of riches, full of honor.", 800],
    ["Then Solomon takes the throne, and God asks him one question that changes everything.", 850],
    ["What do you actually want.", 1000],
    ["We are in 1 Chronicles 29 and 2 Chronicles 1 through 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron1(29, 1, 9, [
      "David tells the whole assembly the truth up front. Solomon is young and inexperienced, and the work is great, for the palace is not for man, but for the LORD God.",
      "So he gives from his own treasure, on top of everything already gathered. Gold of Ophir, silver to overlay the walls, because I have set my affection to the house of my God.",
      "Then he asks the leaders one question. Who then is willing to consecrate his service this day unto the LORD? And they answer with everything they own.",
      "The people rejoiced, for that they offered willingly, because with perfect heart they offered willingly to the LORD. Giving that costs nothing does not read like this in Scripture.",
    ]),
    chron1(29, 10, 19, [
      "David prays out loud in front of everyone he just watched give. Blessed be thou, LORD God of Israel our father, for ever and ever. He starts with praise, not a thank-you speech.",
      "Thine, O LORD, is the greatness, and the power, and the glory. Both riches and honour come of thee. Even the gift they just gave, he says, was never actually theirs to give.",
      "Who am I, and what is my people, that we should be able to offer so willingly as this? We are strangers before thee, and sojourners, as were all our fathers. Our days on the earth are as a shadow.",
      "Then the whole prayer turns to his son. O LORD God, keep this for ever in the imagination of the thoughts of the heart of thy people, and give unto Solomon my son a perfect heart. A father's last recorded prayer, spent almost entirely on someone else.",
    ]),
    chron1(29, 20, 30, [
      "The whole congregation bows and worships the LORD, and the king, and offers sacrifices without number. They eat and drink before the LORD that day with great gladness.",
      "Then Solomon is made king a second time, anointed unto the LORD to be the chief governor, and Zadok to be priest. Anointed twice, so no one in Israel could claim they missed it.",
      "All Israel obeyed him. The princes, the mighty men, even David's other sons submit themselves unto Solomon the king. No fight over the throne. That almost never happens in this book.",
      "David reigned forty years over Israel, seven in Hebron, thirty-three in Jerusalem, and died in a good old age, full of days, riches, and honour. The shepherd boy who fought a giant gets a death this quiet.",
    ]),
    chron2(1, 1, 17, [
      "Solomon goes to Gibeon, to the old tabernacle Moses built in the wilderness, and offers a thousand burnt offerings on its bronze altar. His first act as king is worship, not war.",
      "That night God says, Ask what I shall give thee. And Solomon does not ask for a long life, or riches, or the death of his enemies. He asks for wisdom and knowledge, to judge this people, for who is able to judge this thy great people?",
      "Because this was in thine heart, God says, and thou hast not asked riches, wealth, or honour, wisdom and knowledge is granted unto thee. And I will give thee riches, and wealth, and honour, such as none of the kings have had.",
      "He asked for the ability to serve well. He got that, and everything he didn't ask for on top of it. Silver and gold became as common as stones in Jerusalem before this chapter ends.",
    ]),
    chron2(2, 1, 18, [
      "Solomon sends word to Huram, king of Tyre, that he intends to build a house for the name of the LORD his God, great, for great is our God above all gods. Then he asks for a skilled craftsman and cedar cut by Huram's own men.",
      "Huram writes back praising the God of Israel by name, and sends Huram-abi, a master worker in gold, silver, brass, iron, stone, and wood, whose mother was of the tribe of Dan and whose father was a man of Tyre. A foreign king's gift, born of two nations, to build a house for Israel's God.",
      "The materials travel by raft down the coast to Joppa, because the temple can't be built from what's local. It takes a whole region's worth of trees and metal and skill just to start.",
      "Solomon counts every stranger living in the land, a hundred and fifty-three thousand, six hundred of them, and sets them to bear burdens, cut stone, and oversee the work. The house gets built on labor from outside Israel as much as from within it.",
    ]),
    chron2(3, 1, 17, [
      "Then Solomon begins to build the house of the LORD at Jerusalem in mount Moriah, where the LORD appeared unto David his father, in the place that David had prepared in the threshingfloor of Ornan the Jebusite.",
      "That ground is not neutral. It's the exact spot where the plague stopped, back in 1 Chronicles 21, when David bought a threshingfloor from a Jebusite rather than take it for free. Judgment ended there. Now worship begins there.",
      "The inside gets overlaid with pure gold, carved with cherubims, and hung with a veil of blue, and purple, and crimson, and fine linen, worked with cherubims. Nothing about this room is meant to look ordinary.",
      "Two pillars stand out front, thirty-five cubits tall, wrapped in chains and pomegranates. Solomon names them Jachin and Boaz, He shall establish, and In it is strength, so that everyone walking in reads a promise before they ever reach the door.",
    ]),
  ],
  closing: [
    ["So that is Day 101.", 700],
    ["David's last public act wasn't a battle. It was giving away everything he had, then thanking God for the ability to give it.", 800],
    ["He died old, at peace, having never laid one stone of the house he spent years preparing for.", 800],
    ["Solomon inherits the throne, and when God offers him anything, he asks to be able to serve well. That's the whole request.", 850],
    ["Wisdom, wealth, a foreign king's best craftsman, all of it lands on a son because a father gave everything he had and prayed for someone else's heart instead of his own legacy.", 850],
    ["And the temple rises on the exact ground where judgment once stopped.", 800],
    ["Tomorrow, 2 Chronicles 4 through 7. The house gets finished, and the glory of the LORD fills it so completely the priests can't even stand to minister.", 850],
    ["For now, hold on to Solomon's question answered before he even had to ask it twice.", 800],
    ["Give me now wisdom and knowledge.", 800],
    ["That's still the right thing to want.", 1200],
  ],
};
