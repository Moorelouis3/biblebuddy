import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 249, written to the Day 1 standard.
 *
 * Ezekiel 37-39 moves from a battlefield of dry bones brought back to life,
 * to two broken kingdoms rejoined in one hand, to a coalition called Gog
 * mustered against a nation finally at peace - and God ending it Himself.
 * Six blocks, consolidated to keep the runtime in line with a three-chapter
 * day.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 249,
  title: "Dry Bones and Final Deliverance",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 249. Ezekiel gets set down in a valley full of bones today.", 750],
    ["Not a battlefield fresh from a fight. Old death. Sun-bleached, picked clean, very dry.", 800],
    ["God asks him one question before anything else happens. Can these bones live?", 850],
    ["Ezekiel does not guess. He hands the question back to the only one who actually knows.", 800],
    ["By the end of these three chapters, that valley stands up as an army, and a nation everyone thought was finished gets invaded one last time and does not fall.", 850],
    ["We are in Ezekiel 37 through 39.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(37, 1, 14, [
      "The hand of the LORD... set me down in the midst of the valley which was full of bones. And they were very dry. Not fresh casualties. Old death, picked clean.",
      "God asks a question that is really a test. Son of man, can these bones live? Ezekiel does not guess. O Lord GOD, thou knowest. He leaves the real answer to God.",
      "So he prophesies to bones, and it plays out like creation running backward. Bone to his bone... the sinews and the flesh came up upon them... but there was no breath in them. A body with no life in it yet, close and still nothing.",
      "Then he prophesies to the wind itself, and breath comes into them, and they lived, and stood up upon their feet, an exceeding great army. God names the vision before Ezekiel can ask - these bones are the whole house of Israel... I will open your graves... and put my spirit in you.",
    ]),
    ez(37, 15, 28, [
      "God hands Ezekiel a prop this time instead of a vision. Take thee one stick, and write upon it, For Judah... take another stick... For Joseph... and join them one to another into one stick. Two kingdoms that split apart generations ago, held together in one hand.",
      "When people ask what it means, the answer is bigger than reunited tribes. I will make them one nation... and one king shall be king to them all: and they shall be no more two nations. The split itself gets undone, not just the exile.",
      "Neither shall they defile themselves any more with their idols... but I will save them out of all their dwellingplaces... and will cleanse them. Reunification and holiness arrive together, not one before the other.",
      "And David my servant shall be king over them... my tabernacle also shall be with them. Same shepherd promised back in chapter 34, and now God says where He will actually live - in the midst of them for evermore.",
    ]),
    ez(38, 1, 13, [
      "God turns Ezekiel toward a name that has not come up before. Set thy face against Gog, the land of Magog, the chief prince of Meshech and Tubal. A far-off power, called out by name before it has done anything yet.",
      "And the guest list is enormous. Persia, Ethiopia, and Libya with them... Gomer... Togarmah of the north quarters, and many people with thee. This is not one enemy. It is nearly every direction on the map, together.",
      "God even says why Gog decides to come. Thou shalt think an evil thought... I will go to them that are at rest, that dwell safely... to take a spoil. Israel finally at peace becomes the very thing that draws the attack.",
      "And the smaller nations watching just ask the obvious question out loud. Sheba, and Dedan, and the merchants of Tarshish... shall say unto thee, Art thou come to take a spoil? Even bystanders can see exactly what this is.",
    ]),
    ez(38, 14, 23, [
      "God tells Gog the attack was never his own idea to begin with. Art thou he of whom I have spoken in old time by my servants the prophets of Israel? The invasion was announced before Gog ever saddled a horse.",
      "Then God says what it costs Him personally to answer it. My fury shall come up in my face... in my jealousy and in the fire of my wrath have I spoken. Not distant policy. Described as anger on God's own face.",
      "The response is not army against army. There shall be a great shaking in the land of Israel... the mountains shall be thrown down... every wall shall fall to the ground. Creation reacts before a battle is even fought.",
      "And the strangest weapon of all. Every man's sword shall be against his brother. Confusion turns the invading coalition on itself, on top of pestilence, hailstones, fire, and brimstone. Gog's own army becomes the casualty count.",
    ]),
    ez(39, 1, 16, [
      "God repeats the sentence from chapter 38 almost word for word, then finishes it. I will turn thee back, and leave but the sixth part of thee... Thou shalt fall upon the mountains of Israel. Five out of six do not go home.",
      "I will give thee unto the ravenous birds of every sort, and to the beasts of the field to be devoured. No proper burial for most of them. The land itself is left to deal with the bodies.",
      "What is left gets an entire operation. Seven months shall the house of Israel be burying of them, that they may cleanse the land. Victory here is not just winning. It is a nation spending seven months making its own ground livable again.",
      "Even the leftover weapons become fuel. They shall burn them with fire seven years... so that they shall take no wood out of the field. One invasion supplies Israel's fires for seven years without cutting down a single tree.",
    ]),
    ez(39, 17, 29, [
      "God turns the aftermath into an image almost too grim to picture straight. Speak unto every feathered fowl, and to every beast of the field... gather yourselves... to my sacrifice... that ye may eat flesh, and drink blood. The battlefield itself becomes the feast, and the dead army is the meal.",
      "Ye shall eat the flesh of the mighty... of rams, of lambs, and of goats. Kings and commanders, described the same way livestock is described. Whatever made them feel untouchable does not survive being on this list.",
      "Then the chapter finally says what all three chapters have been circling. The heathen shall know... the house of Israel went into captivity for their iniquity... therefore hid I my face from them. Nothing that happened to Israel was random. It was named, the sin and the consequence both.",
      "And it ends on the line the whole book has been reaching for. I have poured out my spirit upon the house of Israel, saith the Lord GOD. Neither will I hide my face any more from them. The bones that were dry at the start of today's reading end it with God's face finally turned back toward them for good.",
    ]),
  ],
  closing: [
    ["So that is Day 249.", 700],
    ["A valley of dry bones stood up as an army, because God said so, not because anything in the valley earned it.", 800],
    ["Two broken kingdoms became one stick in Ezekiel's hand.", 750],
    ["Then a coalition with a name from nowhere - Gog, Magog, Meshech, Tubal - came for a nation finally at rest.", 800],
    ["And God said the quiet part out loud. He announced that invasion through His own prophets long before it happened.", 850],
    ["The fight was never close. Confusion, fire, and hailstones did more than any sword did.", 800],
    ["What was left took Israel seven months just to bury and seven years just to burn.", 800],
    ["Tomorrow, Ezekiel 40 through 42. A vision of a temple no one has built yet.", 850],
    ["For now, sit with the question God asked before any of it started.", 750],
    ["Son of man, can these bones live?", 1200],
  ],
};
