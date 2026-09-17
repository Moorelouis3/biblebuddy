import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 256, written to the Day 1 standard.
 *
 * Daniel 10-12: Daniel's last vision, and the one where the curtain gets
 * pulled back on what a delayed prayer answer actually costs behind the
 * scenes. Then a long, dense sweep of kings fighting over Israel for
 * centuries, ending on the plainest promise in the book: some will wake to
 * everlasting life, some to everlasting shame, and Daniel himself just has
 * to wait for it. Six blocks: two for chapter 10, three for chapter 11
 * (the heaviest reading of the three), one for chapter 12.
 */

const dan = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Daniel ${chapter}:${startVerse}-${endVerse}`,
  book: "daniel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 256,
  title: "Spiritual Conflict and Final Hope",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 256. Daniel 10 through 12. The last three chapters of the book.", 750],
    ["Yesterday an angel told Daniel his answer left heaven the moment he started praying.", 750],
    ["Today you find out where that answer actually was for three weeks.", 800],
    ["Then Daniel gets one final vision, longer and more detailed than anything before it, and it runs centuries past his own lifetime.", 850],
    ["We are in Daniel 10 through 12.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    dan(10, 1, 9, [
      "A thing was revealed unto Daniel... and the thing was true, but the time appointed was long. Three full weeks of mourning, no pleasant bread, no anointing, before Daniel sees anything at all.",
      "A certain man clothed in linen... his body also was like the beryl, and his face as the appearance of lightning. This is not the Ancient of days from chapter 7. This is a messenger, and even a messenger is this much to look at.",
      "The men that were with me saw not the vision... but a great quaking fell upon them, so that they fled to hide themselves. Daniel's companions run from something they cannot even see, just from what it does to the air around it.",
      "There remained no strength in me... I was in a deep sleep on my face. The most experienced man in Babylon, decades into knowing God, still ends up face down in the dirt.",
    ]),
    dan(10, 10, 21, [
      "Fear not, Daniel: for from the first day that thou didst set thine heart to understand, and to chasten thyself before thy God, thy words were heard, and I am come for thy words. Day one of the fast. Not day twenty-one, when Daniel finally saw something.",
      "The prince of the kingdom of Persia withstood me one and twenty days: but, lo, Michael, one of the chief princes, came to help me. Here is the answer to yesterday's question. The delay was never in heaven and never in Daniel. It was a fight Daniel could not see and was never told to fight himself.",
      "O man greatly beloved, fear not: peace be unto thee, be strong, yea, be strong... let my lord speak; for thou hast strengthened me. Twice in one scene Daniel is touched and told to be strong before he can even ask his question. Strength gets given before it gets required.",
      "Now will I return to fight with the prince of Persia: and when I am gone forth, lo, the prince of Grecia shall come. The messenger is not staying to chat. He came, delivered the one thing Daniel needed, and goes straight back into a war that never actually stopped.",
    ]),
    dan(11, 1, 20, [
      "There shall stand up yet three kings in Persia; and the fourth shall be far richer than they all... and a mighty king shall stand up, that shall rule with great dominion. Before any of these kings have a name in history, they already have a place in this vision.",
      "When he shall stand up, his kingdom shall be broken, and shall be divided toward the four winds of heaven; and not to his posterity. A conquering king's empire gets torn apart the moment he is gone, and none of it goes to his own children. Power here never outlives the man who grabbed it.",
      "The king's daughter of the south shall come to the king of the north to make an agreement: but she shall not retain the power of the arm... she shall be given up. A marriage arranged for peace between two kingdoms collapses, and the bride pays for it with her life.",
      "So the king of the south shall come into his kingdom, and shall return into his own land... but his sons shall be stirred up. Every fragile truce in this chapter buys a season, never an ending. The next generation just picks the fight back up.",
    ]),
    dan(11, 21, 35, [
      "In his estate shall stand up a vile person, to whom they shall not give the honour of the kingdom: but he shall come in peaceably, and obtain the kingdom by flatteries. This one does not conquer his way to power. He talks his way there, and Scripture calls him vile before he does a single visible thing.",
      "Arms shall stand on his part, and they shall pollute the sanctuary of strength, and shall take away the daily sacrifice, and they shall place the abomination that maketh desolate. Worship itself becomes the target. Jesus will later point back to this exact line and tell people to watch for it again.",
      "Such as do wickedly against the covenant shall he corrupt by flatteries: but the people that do know their God shall be strong, and do exploits. Two responses to the same pressure, in the same verse. Flattery corrupts some. The same threat makes others stronger, because they actually know God rather than just knowing about him.",
      "They that understand among the people shall instruct many: yet they shall fall by the sword, and by flame, by captivity, and by spoil, many days. Teaching the truth here does not buy anyone safety. Some of the wisest people in the story die for it anyway.",
    ]),
    dan(11, 36, 45, [
      "The king shall do according to his will; and he shall exalt himself, and magnify himself above every god, and shall speak marvellous things against the God of gods. Every earlier king in this chapter wanted territory. This one wants worship, and takes it from every god including the true one.",
      "Neither shall he regard the God of his fathers, nor the desire of women, nor regard any god: for he shall magnify himself above all. He does not trade one god for another. He clears the field so nothing stands higher than himself.",
      "He shall enter also into the glorious land, and many countries shall be overthrown... even Edom, and Moab, and the chief of the children of Ammon. Notice the list of who escapes him. Old enemies of Israel slip through untouched, while nations that seem safer fall.",
      "He shall plant the tabernacles of his palace between the seas in the glorious holy mountain; yet he shall come to his end, and none shall help him. The man who magnified himself above every god dies with nobody left willing to lift a hand for him. Not defeated by an army. Just abandoned.",
    ]),
    dan(12, 1, 13, [
      "At that time shall Michael stand up, the great prince which standeth for the children of thy people: and there shall be a time of trouble, such as never was since there was a nation. The same Michael who fought the prince of Persia in chapter ten is still the one standing guard at the very end.",
      "Many of them that sleep in the dust of the earth shall awake, some to everlasting life, and some to shame and everlasting contempt. This is one of the plainest resurrection promises in the entire Old Testament, sitting inside a vision most people never finish reading.",
      "But thou, O Daniel, shut up the words, and seal the book, even to the time of the end... none of the wicked shall understand; but the wise shall understand. The same vision lands differently depending on who reads it. Not because the words changed. Because the reader did.",
      "Blessed is he that waiteth, and cometh to the thousand three hundred and five and thirty days... but go thou thy way till the end be: for thou shalt rest, and stand in thy lot at the end of the days. Daniel does not get the ending explained to him. He gets told to go rest. After a lifetime of visions, that is the last word he receives.",
    ]),
  ],
  closing: [
    ["So that is Day 256. And that is the book of Daniel finished.", 750],
    ["A man in linen so bright his own friends ran from something they never saw.", 700],
    ["A three-week fight in the unseen world, over one prayer, that Daniel never even knew was happening.", 800],
    ["Then kings after kings after kings, clawing at each other for centuries, until one man tries to sit higher than every god there is.", 850],
    ["And even he does not get to finish standing. He comes to his end, and none help him.", 800],
    ["The vision closes on the only thing that actually holds up. Some wake to life. Some wake to shame. Michael still stands guard either way.", 850],
    ["Daniel spent his whole book faithful in a country that was not his, and the last thing he is ever told is simply: go rest. Your part is done.", 850],
    ["Tomorrow we leave Daniel behind and open Hosea 1 through 3. God tells a prophet to marry a woman who will not stay faithful to him, and to keep loving her anyway.", 850],
    ["For now, hold on to the man in the fight nobody saw.", 800],
    ["Twenty-one days, unseen, before a single word reached Daniel.", 1200],
  ],
};
