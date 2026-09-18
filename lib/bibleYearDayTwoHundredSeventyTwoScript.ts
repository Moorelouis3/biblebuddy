import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 272, written to the Day 1 standard.
 *
 * Zephaniah closes out with judgment on the nations, then Jerusalem judged
 * by the same standard, then a complete reversal into God singing over his
 * people. Then Haggai opens: sixteen years of "not yet" ends in twenty-three
 * days once the people actually listen. Six blocks: three across Zephaniah 2
 * and 3, one for the rebuke, one for the response.
 */

const zephaniahTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zephaniah 2:${startVerse}-${endVerse}`,
  book: "zephaniah",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const zephaniahThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zephaniah 3:${startVerse}-${endVerse}`,
  book: "zephaniah",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const haggaiOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Haggai 1:${startVerse}-${endVerse}`,
  book: "haggai",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 272,
  title: "Seek the Lord and Rebuild",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 272. Zephaniah has one more turn left in him.", 750],
    ["Judgment on the nations, judgment on Jerusalem, and then a promise nobody saw coming. God singing over his people.", 850],
    ["Then a new book starts. Sixteen years after the exiles came home, and the temple everyone was supposed to rebuild is still a pile of rubble.", 850],
    ["Haggai does not preach a sermon about it. He just tells them to look at their own houses.", 800],
    ["We are in Zephaniah 2 and 3, and Haggai 1.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    zephaniahTwo(1, 7, [
      "Zephaniah opens chapter two with an invitation right in the middle of judgment. Gather yourselves, seek the Lord, seek righteousness, seek meekness. There is still time to seek, even after chapter one sounded final.",
      "It may be ye shall be hid in the day of the Lord's anger, he says. Not a guarantee. An invitation to try anyway. That kind of humility is the opposite of the pride the whole book keeps confronting.",
      "Then judgment turns outward, to Philistia. Gaza, Ashkelon, Ashdod, Ekron, the cities that spent centuries as Israel's enemies, forsaken and rooted up.",
      "And the land that took Israel's inheritance becomes pasture for the very remnant that survives. Shepherds' folds where the Philistines' cities used to stand.",
    ]),
    zephaniahTwo(8, 15, [
      "Moab and Ammon get judged for one specific sin. Pride, mocking Israel's God as if he had no power over their border. They reproached and magnified themselves against the people of the Lord of hosts.",
      "Then a promise almost buried in the middle of the woes. Men shall worship him, every one from his place, even all the islands of the nations. Judgment on the nations is aimed at the same goal as judgment on Judah. Worship, not just punishment.",
      "Then Assyria, the empire that already destroyed the northern kingdom a century earlier, gets named too. Nineveh, the city Jonah once warned and watched repent, becomes a dry wasteland where wild animals bed down.",
      "And her epitaph is the saddest line in the chapter. She said in her heart, I am, and there is none beside me. That is the line God alone gets to say. Every empire that ever said it ended up exactly like Nineveh.",
    ]),
    zephaniahThree(1, 8, [
      "Chapter three turns back to Jerusalem itself, and the charge sheet is brutal. She obeyed not, received no correction, trusted not the Lord, drew not near to her God. Four refusals in one verse.",
      "Every leader who was supposed to protect the city gets named as a predator instead. Princes like roaring lions, judges like wolves that do not even leave bones till morning, prophets treacherous, priests polluting the very sanctuary they served.",
      "And right in the middle of that list, one line about God himself. The just Lord is in the midst of her, he will not do iniquity, every morning he brings his judgment to light. He never stopped being faithful while everyone around him stopped noticing.",
      "God says he already tried the gentler road. Surely thou wilt fear me, thou wilt receive instruction. And they rose early and corrupted everything anyway. So now comes the fire of his jealousy, and it is aimed at every nation, not just Judah.",
    ]),
    zephaniahThree(9, 20, [
      "After three straight chapters of judgment, Zephaniah turns completely. God will leave behind an afflicted and poor people who trust in his name instead of their pride. The ones judgment could not touch are the ones who had nothing left to trust but him.",
      "Then a line worth stopping on. The Lord thy God in the midst of thee is mighty, he will save, he will rejoice over thee with joy, he will rest in his love, he will joy over thee with singing. God singing over his people is not a metaphor Zephaniah softens. It is the last word of the book.",
      "Sing, O daughter of Zion, the prophet says. Not someday when everything is fixed. The singing starts before the captivity is actually reversed, because the promise is already as good as done.",
      "The book that opened with I will utterly consume all things from off the land ends with I will make you a name and a praise among all people of the earth. Same God, same book, completely different ending, because judgment was never the destination.",
    ]),
    haggaiOne(1, 11, [
      "Sixteen years after the exiles came home, the temple is still a pile of rubble, and the excuse people give is timing. The time is not come. Not that they refuse to build it. Just not yet, not now.",
      "Meanwhile they have finished their own houses, paneled and comfortable, while God's house lies waste. Haggai does not argue theology with them. He just holds up the receipts.",
      "Consider your ways, he says twice. You sow much, harvest little. You eat and you are never full. You earn wages and put them in a bag with holes. Every ordinary frustration of their lives traces back to the same misplaced priority.",
      "Then God names exactly what is happening. I called for a drought, on the corn, the wine, the oil, the cattle, all the labor of your hands. Nothing about their hardship was random. It was aimed.",
    ]),
    haggaiOne(12, 15, [
      "And here is what makes Haggai different from most of the prophets we have read. The people actually listen. Obeyed the voice of the Lord, and the people feared before the Lord. No forty years of stalling this time.",
      "The very next thing God says, the moment they turn, is four words. I am with you. Not a lecture about how long they took. Just presence, offered the second they moved.",
      "Then the Lord stirred up the spirit of Zerubbabel, Joshua, and the whole remnant. Twenty-three days after the rebuke, they are back at the site with tools in their hands.",
      "It took one prophet, one sermon, and twenty-three days to undo sixteen years of not yet. Obedience is rarely as far away as the excuse makes it sound.",
    ]),
  ],
  closing: [
    ["So that is Day 272.", 700],
    ["Zephaniah judged the nations first. Philistia, Moab, Ammon, Assyria. Then turned around and judged Jerusalem by the exact same standard.", 800],
    ["And then, after three straight chapters of judgment, the whole book flips. The Lord thy God in the midst of thee is mighty, he will rejoice over thee with joy, he will joy over thee with singing.", 850],
    ["Judgment was never where that book was headed.", 800],
    ["Then Haggai found a people who had finished their own houses and left God's house in ruins for sixteen years, and called it exactly what it was.", 850],
    ["Consider your ways, he said twice. And this time, for once, they actually did.", 850],
    ["Twenty-three days later they were back at the site with tools in their hands.", 800],
    ["Tomorrow, Haggai 2 and the start of Zechariah. A discouraging foundation, and a vision of horses riding the whole earth at night.", 850],
    ["For now, hold on to four words.", 800],
    ["I am with you.", 1200],
  ],
};
