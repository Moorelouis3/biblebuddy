import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 246, written to the Day 1 standard.
 *
 * Ezekiel 28-30 closes the oracles against the nations with two kings and
 * one dragon. Tyre's king gets an Eden lament, Zidon gets four flat verses
 * before Israel finally hears good news, and Pharaoh is called out as the
 * great dragon lying in his own river. Seven blocks, each kept inside its
 * own chapter.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 246,
  title: "Pride Falls and Egypt Judged",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 246. Yesterday the ship went down. Today it gets personal.", 750],
    ["Tyre had a king, and Ezekiel goes after him by name - a king who decided he was a god.", 800],
    ["Zidon gets a much shorter word. And Israel gets the mercy neither of them did.", 800],
    ["Then Egypt. Ezekiel calls Pharaoh a dragon lying in his own river, telling himself he made it.", 850],
    ["God puts a hook in that dragon's jaw.", 900],
    ["We are in Ezekiel 28 through 30.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(28, 1, 10, [
      "The prince of Tyre says it plainly. I am a God, I sit in the seat of God, in the midst of the seas. Not an accusation. His own words.",
      "So God doesn't argue theology with him. He just names what happened. With thy wisdom and thine understanding thou hast gotten thee riches - and thine heart is lifted up because of thy riches.",
      "Wiser than Daniel, the text even says. Real skill, spent entirely on building a throne out of gold.",
      "Then one line ends the argument. Thou shalt be a man, and no God, in the hand of him that slayeth thee. Strangers with swords are coming, and a god doesn't die by a sword.",
    ]),
    ez(28, 11, 19, [
      "This is a different figure now - the king of Tyre, and the language goes somewhere the prince's oracle never touched. Thou hast been in Eden the garden of God, covered in precious stones, the anointed cherub that covereth.",
      "Whatever else this lament is doing, Ezekiel reaches for the oldest fall there is. Something that started perfect, close to God, and corrupted itself from the inside.",
      "Thou wast perfect in thy ways from the day that thou wast created, till iniquity was found in thee. Nobody put that iniquity there. It was found in him - already growing.",
      "Thine heart was lifted up because of thy beauty. So the gift becomes the weapon, and the fire that ends him comes from the midst of thee. Not an outside enemy. Something already inside.",
    ]),
    ez(28, 20, 26, [
      "Zidon gets four verses. Pestilence, blood in the streets, the sword on every side. No lament, no long history. Just a short, flat sentence.",
      "And after two chapters of oracles against Tyre's king and Zidon, the mood changes completely. I will gather the house of Israel from the people among whom they are scattered.",
      "No more a pricking brier unto the house of Israel, nor any grieving thorn. Every neighbor who scratched at her for years finally stops.",
      "They shall build houses, and plant vineyards, and dwell with confidence. After this much wreckage in this book, that is the first quiet paragraph in a long time.",
    ]),
    ez(29, 1, 16, [
      "Pharaoh gets called a title he might enjoy hearing, until the rest of the sentence lands. The great dragon that lieth in the midst of his rivers.",
      "His own words get quoted back at him. My river is mine own, and I have made it for myself. As if the Nile owed its existence to Pharaoh instead of the other way around.",
      "So God fishes for him. I will put hooks in thy jaws... and bring thee up out of the midst of thy rivers, then leaves him in the open field for the beasts and the birds. The river Pharaoh claimed becomes useless to him.",
      "Forty years desolate, then Egypt does come back - but only as the basest of the kingdoms, never able to rule over the nations again. Not destroyed forever. Just permanently cut down to size.",
    ]),
    ez(29, 17, 21, [
      "This oracle is dated later than everything around it - Ezekiel looking back at a siege that already happened. Nebuchadnezzar's army spent years against Tyre. Every head made bald, every shoulder peeled, from the labor of it.",
      "And Tyre still didn't pay. Yet had he no wages, nor his army, for Tyrus, for the service that he had served against it. A long, grinding siege that came up empty.",
      "So God redirects the payment. Egypt becomes the wages for his army instead - a king who worked hard for one city gets handed the wealth of another.",
      "It is a strange kind of fairness. The labor was real, so the pay is real, even when it comes from somewhere the laborer never expected.",
    ]),
    ez(30, 1, 19, [
      "Howl ye, Woe worth the day. Ezekiel opens this chapter as a funeral cry before a single detail is given.",
      "The day of the LORD is near, and it does not stop at Egypt's border. Ethiopia, Libya, Lydia - every ally who leaned on Egypt's strength goes down with her.",
      "Then the chapter walks city by city. Fire in Zoan, judgment in No, daily distress in Noph, the young men of Aven and Pi-beseth falling by the sword. Egypt's whole map, struck one place at a time.",
      "They shall know that I am the LORD runs through this chapter like a drumbeat. Every city on the list gets the same sentence attached to it.",
    ]),
    ez(30, 20, 26, [
      "This oracle is dated too - a specific day, months into Jerusalem's final siege. I have broken the arm of Pharaoh king of Egypt.",
      "Not going to break it. Already broken. And it shall not be bound up to be healed - no splint, no strength, ever again, to hold a sword.",
      "Then the other arm in the same breath. I will strengthen the arms of the king of Babylon, and put my sword in his hand. One king disarmed, one king armed, by the same hand.",
      "He shall groan before him with the groanings of a deadly wounded man. Not a battle. A slow, permanent injury, with everyone left standing watching it happen.",
    ]),
  ],
  closing: [
    ["So that is Day 246.", 700],
    ["Two kings judged back to back. Tyre's king trusted his own wisdom until it convinced him he was God. Egypt's king trusted a river he never made.", 800],
    ["Zidon gets four flat verses, and then, for the first time in a while, Israel hears good news. Gathered home. Building houses. Planting vineyards.", 800],
    ["Then Pharaoh - a dragon in his own river, hooked and dragged into a field, left there because pride does not get an honorable death.", 850],
    ["Egypt does come back, forty years later. Just never allowed to be anyone's crutch again.", 800],
    ["And the chapter ends on two arms in the same sentence. One broken beyond healing. One handed a sword.", 850],
    ["Tomorrow, Ezekiel 31 through 33. Another tall tree forgets who planted it, and Ezekiel becomes a watchman with a debt to pay.", 850],
    ["For now, sit with the dragon's own words.", 750],
    ["My river is mine own, and I have made it for myself.", 1200],
  ],
};
