import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 248, written to the Day 1 standard.
 *
 * Ezekiel 34-36 turns from judgment to promise: bad shepherds fired, Edom
 * judged for gloating over Israel's fall, and then the two most quoted
 * promises in Ezekiel - the land restored like Eden, and a new heart to
 * replace the old one. Six blocks, consolidated to keep the runtime in line
 * with a three-chapter day.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 248,
  title: "Shepherds, New Heart, and Restoration",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 248. Ezekiel gets personal today.", 750],
    ["God spends the opening verses on the shepherds of Israel, and none of it is kind.", 800],
    ["They fed themselves. The sheep got left to the wolves.", 800],
    ["So God says He is done delegating. He is coming to shepherd the flock Himself.", 850],
    ["And by the end, He is not just replacing bad leaders. He is replacing hearts.", 900],
    ["We are in Ezekiel 34 through 36.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(34, 1, 10, [
      "God tells Ezekiel to prophesy against the shepherds of Israel, and He does not warm up first. Woe be to the shepherds of Israel that do feed themselves! should not the shepherds feed the flocks?",
      "Ye eat the fat, and ye clothe you with the wool, ye kill them that are fed: but ye feed not the flock. Every benefit of the job, taken. The actual job, never done.",
      "The diseased have ye not strengthened... neither have ye sought that which was lost. Sick sheep stayed sick. Lost sheep stayed lost. With force and with cruelty have ye ruled them - so the flock scatters and becomes meat to every beast of the field, and nobody comes looking.",
      "Then God stops describing the problem and announces the fix. Behold, I am against the shepherds... I will deliver my flock from their mouth. He is not sending a memo. He is taking the job back.",
    ]),
    ez(34, 11, 31, [
      "God says what He will do instead, in His own voice, twice for emphasis. Behold, I, even I, will both search my sheep, and seek them out... I will seek that which was lost, and bring again that which was driven away. Everything the bad shepherds failed to do, He lists off and does it Himself.",
      "Then He turns to the flock, because the scattering was not only the shepherds' fault. Seemeth it a small thing unto you to have eaten up the good pasture, but ye must tread down with your feet the residue? He judges between the fat cattle and the lean, not just the shepherds and the sheep.",
      "And I will set up one shepherd over them... even my servant David. Their king had been dead for centuries. This is a promise, not a memory - one shepherd who will not eat what the flock needs.",
      "I will make with them a covenant of peace... there shall be showers of blessing. Safety, food, no more fear. Everything the failed shepherds took, God writes back into the contract Himself.",
    ]),
    ez(35, 1, 15, [
      "God turns His face to a specific neighbor. Set thy face against mount Seir - that is Edom, Esau's country, family by blood and enemy by choice. Behold, O mount Seir, I am against thee.",
      "The charge is named plainly. Thou hast had a perpetual hatred, and hast shed the blood of the children of Israel... in the time that their iniquity had an end. Israel was already being punished. Edom piled on anyway, while their relatives were already down.",
      "Because thou hast not hated blood, even blood shall pursue thee. Edom loved watching Israel bleed, so God promises Edom the same weather, not the crime returned exactly, but the same kind of ending.",
      "And the real charge underneath it all is what Edom said out loud. These two nations and these two countries shall be mine... whereas the LORD was there. They planned to take the land while forgetting whose it actually was. God says He heard every word.",
    ]),
    ez(36, 1, 15, [
      "God turns from Edom to the actual land of Israel, and talks to the mountains like they can hear Him. Because the enemy hath said against you, Aha, even the ancient high places are ours in possession. The land got mocked while it sat empty.",
      "So God answers the mockers directly. Surely in the fire of my jealousy have I spoken against the residue of the heathen... the heathen that are about you, they shall bear their shame. Whoever laughed at empty Israel is about to trade places with it.",
      "Then the promise gets specific and physical. Ye shall shoot forth your branches, and yield your fruit to my people of Israel; for they are at hand to come. Not a spiritual idea. Actual crops, for actual people coming home.",
      "I will multiply men upon you... and will do better unto you than at your beginnings. Not just restored. Improved. God is not simply undoing the exile. He is outdoing where Israel started.",
    ]),
    ez(36, 16, 23, [
      "God explains why any of this happened in the first place. When the house of Israel dwelt in their own land, they defiled it by their own way... as the uncleanness of a removed woman. Blunt language, on purpose. That is how unclean their sin made the land feel to Him.",
      "So He scattered them, and it should have ended there. Instead it got worse somewhere new. When they entered unto the heathen... they profaned my holy name, when they said, These are the people of the LORD, and are gone forth out of his land. Their exile became evidence against God's reputation, not just their own.",
      "And here is the line that reframes the whole book. I do not this for your sakes, O house of Israel, but for mine holy name's sake. Restoration is coming, but not because Israel earned it back. It never was about them being good enough.",
      "The heathen shall know that I am the LORD... when I shall be sanctified in you before their eyes. God is going to fix His own reputation by fixing them. That is a strange kind of mercy - saved as a side effect of who He is.",
    ]),
    ez(36, 24, 38, [
      "Then comes the promise this chapter is famous for. A new heart also will I give you, and a new spirit will I put within you: and I will take away the stony heart out of your flesh, and I will give you an heart of flesh. Not advice. A transplant.",
      "And I will put my spirit within you, and cause you to walk in my statutes. For the first time in Ezekiel, obedience is not the requirement for the blessing. It is the result of the new heart. God changes the inside first.",
      "Then shall ye remember your own evil ways... and shall lothe yourselves in your own sight. The new heart does not erase the memory of the old one. It is what finally lets them see it clearly, without excuses.",
      "And they shall say, This land that was desolate is become like the garden of Eden. The book keeps circling back to that word. What sin ruined, God rebuilds all the way back to the first garden.",
    ]),
  ],
  closing: [
    ["So that is Day 248.", 700],
    ["Bad shepherds got fired, and God said He would do the job Himself.", 750],
    ["Edom got judged for celebrating while family bled.", 750],
    ["The mountains of Israel got promised fruit and people again, on purpose, better than before.", 800],
    ["And then God said the real reason for any of it. Not for your sakes... but for mine holy name's sake.", 850],
    ["Which means none of this ever hinged on Israel finally being good enough.", 800],
    ["It hinged on a new heart God said He would give them Himself. A new heart also will I give you.", 850],
    ["Tomorrow, Ezekiel 37 through 39. Dry bones stand up, and two sticks become one nation.", 850],
    ["For now, sit with the promise underneath all three chapters.", 750],
    ["A new heart. Not a better performance.", 1200],
  ],
};
