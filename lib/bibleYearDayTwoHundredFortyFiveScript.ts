import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 245, written to the Day 1 standard.
 *
 * Ezekiel 25-27 turns away from Israel and toward the nations that watched
 * her fall - four short sentences, then a chapter and a half spent on one
 * of them, Tyre, told as a shipwreck instead of a siege. Six blocks, each
 * kept inside its own chapter.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 245,
  title: "Nations and Tyre Judged",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 245. God turns away from Israel and starts naming everyone who watched her fall and liked it.", 750],
    ["Ammon laughed. Moab shrugged her off. Edom settled an old score. Philistia did the same. Four short sentences, one after another.", 800],
    ["Then a chapter and a half on one city. Tyre.", 750],
    ["Tyre never invaded anyone. It just saw an open trade route where Jerusalem used to be, and got excited.", 800],
    ["So Ezekiel writes Tyre a funeral song. And it comes out as a shipwreck.", 850],
    ["We are in Ezekiel 25 through 27.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(25, 1, 11, [
      "God turns from Israel's own sin to the neighbor who cheered it. Ammon said 'Aha' against the sanctuary the moment it was profaned - laughed at exactly the wrong moment.",
      "The sentence fits the crime. Ammon is handed to the men of the east, and Rabbah, their capital, becomes a stable for camels. The nation that mocked a fall gets erased the same way.",
      "Moab and Seir's crime gets named just as plainly. They said the house of Judah is like unto all the heathen - erasing what made Judah different in the first place.",
      "Same sentence again, same invaders, and one detail worth catching. It is so that the Ammonites may not be remembered among the nations. Being forgotten is part of the punishment.",
    ]),
    ez(25, 12, 17, [
      "Edom's crime: taking vengeance on Judah, greatly offended, and revenged himself upon them. Kicking a nation that was already down.",
      "God's answer is specific in a way that should catch your attention. He will lay His vengeance on Edom by the hand of my people Israel. The very people Edom kicked become the hand that delivers it.",
      "Philistia's crime is named with one more word attached. Revenge, with a despiteful heart, to destroy it for the old hatred. A grudge that outlived any reason for it.",
      "Four nations, and the same line lands after each one. They shall know that I am the LORD. Not a threat reserved for Israel. Everybody gets the same verdict.",
    ]),
    ez(26, 1, 14, [
      "Tyre's crime gets its own single sentence. Aha, she is broken that was the gates of the people... now she is laid waste. Someone else's ruin, read as an opportunity.",
      "God answers with the sea itself as the picture. Many nations will come up against Tyre as the sea causeth his waves to come up - the very element that made her rich becomes the image of what drowns her.",
      "Nebuchadnezzar gets named directly, a king of kings, with a mound, siege engines, and axes against the towers. Then the detail that lands hardest. The noise of thy songs shall cease, and the sound of thy harps shall be no more heard.",
      "The sentence repeats through the whole chapter until it is unmistakable. I will make thee like the top of a rock... thou shalt be built no more. Not exile. Erasure.",
    ]),
    ez(26, 15, 21, [
      "Other kings of the sea hear the noise of the fall and actually get off their thrones - lay away their robes, sit on the ground, tremble at every moment. Tyre's fall terrifies people who never once feared Israel's God.",
      "Their own lament names exactly what is gone. How art thou destroyed, that wast inhabited of seafaring men, the renowned city, which wast strong in the sea.",
      "God's language for it goes underground, literally. Brought down with them that descend into the pit, with the people of old time, set among ruins that were already ancient before Tyre existed.",
      "The coldest line in the chapter closes it. Though thou be sought for, yet shalt thou never be found again. Not just destroyed. Un-locatable.",
    ]),
    ez(27, 1, 25, [
      "Ezekiel is told to take up a lamentation for Tyrus, and then, strangely, spends the whole chapter describing a ship. Because that is exactly what Tyre was. A floating economy, not a fortress.",
      "Every plank has a pedigree. Fir boards from Senir, cedar masts from Lebanon, oak oars from Bashan, ivory-inlaid benches, an embroidered Egyptian linen sail. Beauty assembled from everywhere at once.",
      "Then the trade list, and it is staggering. Tarshish's silver and iron, Javan and Tubal trading the persons of men alongside vessels of brass, Judah's wheat and honey and oil, Damascus's wine, Sheba's spices and gold. Every nation shows up on this one manifest.",
      "Thou hast said, I am of perfect beauty. The whole chapter reads like a hymn Tyre wrote about herself, right before the water takes her.",
    ]),
    ez(27, 26, 36, [
      "One line ends all of it. Thy rowers have brought thee into great waters: the east wind hath broken thee in the midst of the seas. All that engineering, undone by weather.",
      "Everyone who worked the ship goes down with it. Rowers, mariners, pilots, all thy men of war. The whole floating economy sinks as one body.",
      "The world's reaction is grief, not gloating. Sailors shave their heads, wear sackcloth, cast dust on themselves, and ask the question the whole chapter has been building toward. What city is like Tyrus?",
      "The last line is flat and final. Thou shalt be a terror, and never shalt be any more. The city that called itself perfectly beautiful becomes a warning instead.",
    ]),
  ],
  closing: [
    ["So that is Day 245.", 700],
    ["Four nations, four short sentences. Ammon and Moab laughed at Judah's fall. Edom and Philistia used it to settle old scores. All four end the same way.", 800],
    ["Then Tyre. Not an enemy soldier - just a merchant who saw a trade route open up and said, Aha, I shall be replenished.", 800],
    ["God answers with the sea itself. Nebuchadnezzar's armies come up against her walls the way waves come up against a shore.", 850],
    ["And Ezekiel writes the strangest lament in the whole book. Not a eulogy for a king. A ship's manifest - every plank, every trade partner, every cargo, named in full.", 850],
    ["Because that is exactly what Tyre was. Not a fortress. A floating economy, entirely dependent on calm water.", 800],
    ["One line ends it. The east wind hath broken thee in the midst of the seas.", 800],
    ["Tomorrow, Ezekiel 28 through 30. Pride brings down Tyre's own king personally, and then it is Egypt's turn.", 850],
    ["For now, sit with Tyre's own words.", 750],
    ["I am of perfect beauty. Said right before the wind found her.", 1200],
  ],
};
