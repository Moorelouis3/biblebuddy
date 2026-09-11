import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 169, written to the Day 1 standard.
 *
 * Psalms 121-123: three of the fifteen Songs of Ascents, short pilgrim
 * psalms sung walking up to Jerusalem. A much lighter reading than Day 168
 * (twenty-one verses total across three chapters), so five blocks split
 * roughly in half by psalm, with fuller four-line teaching on each.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 169,
  title: "Help From the Lord",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 169. Yesterday ended with the longest chapter in the Bible. Today is the opposite. Three short songs, twenty-one verses total.", 750],
    ["These are three of the fifteen Songs of Ascents, the psalms pilgrims sang walking uphill toward Jerusalem.", 800],
    ["One is about not falling on the road. One is about being glad to arrive. One is about waiting on God while people who have it easy look down on you.", 800],
    ["Short songs, for a long climb.", 900],
    ["We are in Psalms 121, 122, and 123.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(121, 1, 4, [
      "I will lift up mine eyes unto the hills, from whence cometh my help. One of the most familiar lines in the whole Bible, and it opens with a question hanging in the air before it answers it.",
      "My help cometh from the LORD, which made heaven and earth. He does not stop at the hills. He goes straight to who actually made them.",
      "He will not suffer thy foot to be moved: he that keepeth thee will not slumber. A pilgrim walking uphill on a rocky road cares about exactly one thing here. Not falling.",
      "Behold, he that keepeth Israel shall neither slumber nor sleep. Said twice on purpose. Not one nap. Not for the whole nation, not ever.",
    ]),
    g(121, 5, 8, [
      "The LORD is thy keeper: the LORD is thy shade upon thy right hand. Shade only matters if the sun is actually beating down on you. This is a psalm for the middle of the walk, not the start.",
      "The sun shall not smite thee by day, nor the moon by night. Ancient travelers feared both. Heatstroke by day, and in that world, the moon was blamed for sickness too. Both are covered.",
      "The LORD shall preserve thee from all evil: he shall preserve thy soul. From the physical danger of the road straight to the deepest part of the person walking it.",
      "The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore. Every trip up to Jerusalem, and every trip back home again. All of it, for good.",
    ]),
    g(122, 1, 5, [
      "I was glad when they said unto me, Let us go into the house of the LORD. This is what it sounds like when somebody is actually happy to be going to worship, not just going through the motions.",
      "Our feet shall stand within thy gates, O Jerusalem. He is not there yet. He is still picturing his own feet arriving.",
      "Jerusalem is builded as a city that is compact together. All the tribes climbing toward the same gates, the same city, packed in close together instead of scattered.",
      "For there are set thrones of judgment, the thrones of the house of David. The city is not just a place to worship. It is where justice is supposed to get done.",
    ]),
    g(122, 6, 9, [
      "Pray for the peace of Jerusalem: they shall prosper that love thee. A pilgrim on the road is told to pray for the very city he is walking toward.",
      "Peace be within thy walls, and prosperity within thy palaces. He prays it over the whole city, not just the temple he is heading for.",
      "For my brethren and companions' sakes, I will now say, Peace be within thee. He names exactly who he is praying this for. Not an abstract wish. The people he actually knows.",
      "Because of the house of the LORD our God I will seek thy good. The reason for all of it, stated plainly at the end. Because God's house is there.",
    ]),
    g(123, 1, 4, [
      "Unto thee lift I up mine eyes, O thou that dwellest in the heavens. Same opening gesture as Psalm 121, but this time the eyes go straight up, not to the hills.",
      "As the eyes of servants look unto the hand of their masters... so our eyes wait upon the LORD our God, until that he have mercy upon us. A servant watches a master's hand for the smallest signal. That is the kind of attention being described.",
      "Have mercy upon us, O LORD, have mercy upon us. Said twice in a row. Asking once was not enough for how he felt.",
      "We are exceedingly filled with contempt... the scorning of those that are at ease, and with the contempt of the proud. This whole song of waiting turns out to be written by someone being mocked by people who have it easy.",
    ]),
  ],
  closing: [
    ["So that is Day 169.", 700],
    ["Three short climbs. Help on the road, joy at arriving, and eyes lifted up while waiting for mercy.", 750],
    ["Psalm 121 promises a keeper who never sleeps. Psalm 122 prays for the very city it is walking toward. Psalm 123 admits what it feels like to be looked down on while you wait.", 800],
    ["None of these songs pretend the road is easy. They just keep naming who is walking it with you.", 800],
    ["Tomorrow, Psalms 124 through 126. More songs for the same road, and one about a trap that did not catch the bird after all.", 850],
    ["For now, hold on to the servant's eyes.", 800],
    ["Watching the master's hand.", 750],
    ["Waiting for the smallest sign of mercy.", 1200],
  ],
};
