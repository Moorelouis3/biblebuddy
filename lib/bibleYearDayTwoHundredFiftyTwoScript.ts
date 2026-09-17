import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 252, written to the Day 1 standard.
 *
 * Ezekiel 46-48: the last three chapters of the book. The gate rhythm and
 * daily offerings get set, then a river no one adds water to grows from
 * ankle-deep to too deep to cross and heals the Dead Sea, then the land
 * gets divided tribe by tribe and the whole vision ends on a new name for
 * the city. Six blocks, two per chapter, matching Day 249-251's pattern.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 252,
  title: "Living Water and Restored Inheritance",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 252. The last three chapters of Ezekiel.", 750],
    ["We start with a gate that only opens on certain days, and offerings that happen every single morning without fail.", 800],
    ["Then water starts trickling out from under the temple door. Ankle deep at first.", 800],
    ["By the end of the chapter it is a river too deep to cross, and it is healing the deadest water on earth.", 850],
    ["Then the land gets divided, tribe by tribe, and the whole book ends on a new name for the city.", 800],
    ["We are in Ezekiel 46 through 48.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(46, 1, 15, [
      "The gate of the inner court that looketh toward the east shall be shut the six working days; but on the sabbath it shall be opened, and in the day of the new moon it shall be opened. Even access to God now runs on a rhythm. Not open all the time. Not shut all the time either.",
      "The prince shall enter by the way of the porch of that gate without, and shall stand by the post of the gate... he shall worship at the threshold of the gate: then he shall go forth. Even the king stops at the threshold. He does not walk through like he owns the place.",
      "He that entereth in by the way of the north gate to worship shall go out by the way of the south gate... he shall not return by the way of the gate whereby he came in. Nobody leaves the way they came in. Worship is supposed to change your direction, not just your location.",
      "Thou shalt daily prepare a burnt offering unto the LORD... every morning... a meat offering continually by a perpetual ordinance unto the LORD. After forty-five chapters of judgment and vision, the instruction that survives all of it is: show up again tomorrow morning.",
    ]),
    ez(46, 16, 24, [
      "If the prince give a gift unto any of his sons, the inheritance thereof shall be his sons'; it shall be their possession by inheritance. But if he give a gift... to one of his servants, then it shall be his to the year of liberty; after it shall return to the prince. A gift to family stays in the family. A gift to a servant has an expiration date built in.",
      "The prince shall not take of the people's inheritance by oppression, to thrust them out of their possession; but he shall give his sons inheritance out of his own possession: that my people be not scattered every man from his possession. This is aimed at exactly what kings had already done. A vineyard stolen from a man named Naboth, forbidden here by name in everything but the name itself.",
      "He brought me forth into the utter court... in every corner of the court there was a court... made with boiling places under the rows round about. These are the places of them that boil, where the ministers of the house shall boil the sacrifice of the people. Even the kitchens get drawn into the plan. Holiness needs plumbing, not just good intentions.",
      "That they bear them not out into the utter court, to sanctify the people. The sacrifice gets cooked on holy ground so its holiness never brushes against the ordinary crowd by accident. The boundary gets protected all the way down to where the pot sits.",
    ]),
    ez(47, 1, 12, [
      "Waters issued out from under the threshold of the house eastward... he measured a thousand cubits, and he brought me through the waters; the waters were to the ancles. It starts as a trickle at the doorstep of God's own house. Barely enough to wet your feet.",
      "Again he measured a thousand... the waters were to the knees... to the loins... a river that I could not pass over: for the waters were risen, waters to swim in. Four measurements, four deepenings, and nobody ever names a second source. The same river just keeps growing the farther it runs from the house.",
      "These waters issue out toward the east country, and go down into the desert, and go into the sea: which being brought forth into the sea, the waters shall be healed... every thing that liveth, which moveth, whithersoever the rivers shall come, shall live. That sea is the Dead Sea. The saltiest, deadest water anyone in that room had ever seen. This river reaches it and it starts holding fish.",
      "The leaf thereof shall not fade, neither shall the fruit thereof be consumed: it shall bring forth new fruit according to his months... the fruit thereof shall be for meat, and the leaf thereof for medicine. One line of trees. Fruit every month, and leaves that heal. Even the marshes get left alone on purpose, given to salt, so there is still a place for what this river does not reach.",
    ]),
    ez(47, 13, 23, [
      "This shall be the border, whereby ye shall inherit the land according to the twelve tribes of Israel: Joseph shall have two portions. The double share promised to Joseph, all the way back in Genesis, is still being honored here, centuries later, in a vision of a land that has not been rebuilt yet.",
      "The north side... the east side... the south side... the west side. So shall ye divide this land unto you according to the tribes of Israel. The whole map gets drawn out, four directions, one land, no tribe left off the list.",
      "Ye shall divide it by lot for an inheritance unto you, and to the strangers that sojourn among you, which shall beget children among you: and they shall be unto you as born in the country among the children of Israel; they shall have inheritance with you among the tribes of Israel. This is new. A foreigner living among Israel does not just get tolerated. He gets land, the same as a native son.",
      "In what tribe the stranger sojourneth, there shall ye give him his inheritance, saith the Lord GOD. Whichever tribe takes a foreigner in becomes the tribe responsible for his share. Belonging is not a feeling here. It is an address.",
    ]),
    ez(48, 1, 14, [
      "These are the names of the tribes... a portion for Dan... a portion for Asher... a portion for Naphtali... a portion for Manasseh... a portion for Ephraim... a portion for Reuben... a portion for Judah. Seven tribes in a row, each one a straight strip of land, east to west. No tribe missing, not even the ones whose history got messy.",
      "The sanctuary shall be in the midst of it. Judah's strip is the one the whole map is centered on. The tribe the Messiah comes from ends up closest to God's own house.",
      "It shall be for the priests that are sanctified of the sons of Zadok; which have kept my charge, which went not astray when the children of Israel went astray, as the Levites went astray. One family, named directly, for one reason: they did not wander when everyone around them did.",
      "They shall not sell of it, neither exchange, nor alienate the firstfruits of the land: for it is holy unto the LORD. That portion can never be traded away. Faithfulness gets repaid with land that no later generation is allowed to gamble off.",
    ]),
    ez(48, 15, 35, [
      "The five thousand... shall be a profane place for the city, for dwelling, and for suburbs: and the city shall be in the midst thereof. Right beside the holiest ground in the whole vision sits an ordinary word: profane. Not evil. Just common. Everyday life gets its own space, right next to the sacred.",
      "The residue shall be for the prince, on the one side and on the other of the holy oblation... over against the five and twenty thousand toward the west border. The ruler's land gets defined entirely by where it sits next to what belongs to God and to the priests. His portion is real. It is just never first.",
      "The gates of the city shall be after the names of the tribes of Israel: three gates northward... three gates... three gates... three gates. Twelve gates, three to a side, one for every son of Israel. Every one of them still has a door with his own name over it.",
      "The name of the city from that day shall be, The LORD is there. Forty-eight chapters that opened with the glory walking out of Jerusalem end with a city renamed, permanently, for the one fact that matters most: He does not leave again.",
    ]),
  ],
  closing: [
    ["So that is Day 252.", 700],
    ["The last three chapters of Ezekiel, and they end further out than they start.", 750],
    ["A gate with a rhythm. A daily offering that never skips a morning.", 750],
    ["Then a trickle of water at the door that grows into a river too deep to cross, and it heals the Dead Sea on the way.", 800],
    ["The land gets split, tribe by tribe, with room made for the stranger who has thrown in his lot with Israel.", 800],
    ["And the whole book, all forty-eight chapters of it, lands on one sentence for the city's new name.", 800],
    ["The LORD is there.", 900],
    ["Tomorrow we leave Ezekiel behind. Daniel 1 through 3. Four young men in Babylon who will not bow, even when the furnace is real.", 850],
    ["For now, sit with the river that started at someone's ankles.", 800],
    ["Every living thing it touches, lives.", 1200],
  ],
};
