import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 271, written to the Day 1 standard.
 *
 * Habakkuk gets his answer: five woes against the very empire God just
 * raised up, then a prayer that turns into worship without the questions
 * ever fully resolving. Then Zephaniah opens a new book, judgment landing
 * on Judah even under King Josiah's reforms. Seven blocks: three across
 * Habakkuk 2, two across Habakkuk 3, two opening Zephaniah 1.
 */

const habakkukTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Habakkuk 2:${startVerse}-${endVerse}`,
  book: "habakkuk",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const habakkukThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Habakkuk 3:${startVerse}-${endVerse}`,
  book: "habakkuk",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const zephaniah = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zephaniah 1:${startVerse}-${endVerse}`,
  book: "zephaniah",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 271,
  title: "The Righteous Live by Faith",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 271. Habakkuk is still on the tower, waiting to see how God will answer his own complaint.", 800],
    ["The answer comes as five woes, aimed straight at the violent empire God just said he was raising up. Justice for the Chaldeans is already written before they even arrive.", 850],
    ["Then Habakkuk's argument turns into a prayer, and the prayer turns into worship, even though nothing about his situation has actually changed yet.", 850],
    ["After that, a new book opens. Zephaniah, writing under a good king, and still announcing judgment.", 800],
    ["We are in Habakkuk 2 and 3, and Zephaniah 1.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    habakkukTwo(1, 5, [
      "Habakkuk does something practical with his unanswered question. He climbs the watchtower and waits to see what the Lord will say, and how he'll answer being questioned.",
      "God tells him to write the vision down, plain, on tablets, so that someone running past can read it at a glance. This answer is not just for Habakkuk. It's meant to outlast him.",
      "Then comes the line the rest of Scripture keeps returning to. The just shall live by his faith. Not by having every question answered. By faith, while the vision still waits to happen.",
      "And God describes the very empire he just raised up. A man drunk on wine, proud, never at home, his appetite as wide as death and never satisfied, gathering nation after nation like death gathers everyone eventually.",
    ]),
    habakkukTwo(6, 14, [
      "The nations get their own voice here, a taunting proverb aimed straight at the empire crushing them. Woe to him who piles up what isn't his. How long can that even last?",
      "The picture turns physical. Woe to the man who builds his nest up high to escape trouble, but even the stone in his own wall cries out against him, and the beam in the timber answers it back.",
      "Woe to him who builds a town with blood and secures a city with injustice, Habakkuk says. Every empire built on violence carries its own accusation in its own foundation.",
      "Then, right in the middle of five woes, one verse breaks the pattern completely. The earth will be filled with the knowledge of the glory of the Lord, as the waters cover the sea. Not someday, maybe. As certain as the ocean.",
    ]),
    habakkukTwo(15, 20, [
      "The next woe is uncomfortably specific. Woe to him who gives his neighbor drink just to look at his shame. Whatever cup you pour for someone else, God says, that same cup turns and comes back to you.",
      "The last woe is for the idol, carved by the very hands that then bow down to it. It cannot speak, cannot breathe, cannot teach anything. A lie standing there dressed in gold and silver.",
      "Every proud empire and every homemade god gets answered by one short line. The Lord is in his holy temple.",
      "Let all the earth keep silence before him. After five straight woes of shouting, Habakkuk ends the chapter by finally going quiet himself.",
    ]),
    habakkukThree(1, 13, [
      "Habakkuk turns his complaint into a prayer, and it opens with something rare for Scripture. O Lord, I have heard your speech, and was afraid. He doesn't pretend the answer didn't shake him.",
      "Then he asks for something very specific. In wrath remember mercy. Not for God to stop being just. For justice to still leave room for mercy.",
      "What follows is God shown at full force, glory covering the sky, the everlasting mountains scattered, the sun and moon stopped in their place. This is not a gentle vision.",
      "But watch where all that power is aimed. Thou wentest forth for the salvation of thy people, even for salvation with thine anointed. Every bit of that terror is moving toward rescuing someone, not just punishing someone.",
    ]),
    habakkukThree(14, 19, [
      "The vision leaves Habakkuk shaking. His lips quiver, rottenness enters his bones. Seeing God's power up close is not a comfortable experience, even when it's on your side.",
      "Then he says something remarkable in the middle of that trembling. That I might rest in the day of trouble. He wants the terror to settle into peace, not just pass over him.",
      "And here is the line that answers the whole book. Although the fig tree does not blossom, no fruit on the vine, no herd left in the stalls, everything stripped away, yet I will rejoice in the Lord.",
      "That's not a feeling that shows up once things work out. It's a decision made before the harvest fails, not after it turns out fine. The Lord God is my strength. He doesn't need the crop to be good first.",
    ]),
    zephaniah(1, 9, [
      "Zephaniah writes during Josiah's reign, the one king actively tearing down the altars and turning the nation back to God. Even under a reforming king, Zephaniah says the judgment is already decided.",
      "God's opening line covers everything that breathes. I will utterly consume all things from off the land, man and beast, birds, fish, even the idols people trip over. This is not one sin. It's an entire way of life.",
      "Then it gets specific and close to home. Cut off the leftover Baal worship, the priests serving both sides, people who swear by the Lord and by Malcham in the same breath. Trying to keep both gods is its own kind of verdict.",
      "It isn't only the obviously religious sins either. Punish those clothed in strange foreign fashion, those who leap on the threshold filling their masters' houses with violence and deceit. Superstition, style, and theft in the palace get named in the same breath as idolatry.",
    ]),
    zephaniah(10, 18, [
      "God says he will search Jerusalem with candles, meaning nobody gets to hide in the dark. He's looking for people settled comfortably on their lees, who say the Lord will do neither good nor evil. Assuming God won't actually act is its own kind of unbelief.",
      "The wealth people trusted turns against them. They will build houses and not live in them, plant vineyards and never taste the wine. Whatever they built their security around gets taken out of their hands.",
      "Then comes the description most people know this book for, four verses stacked on the same phrase. A day of wrath, a day of trouble, a day of darkness, a day of the trumpet against every high tower. Zephaniah does not soften a single line of it.",
      "Neither their silver nor their gold shall be able to deliver them in the day of the Lord's wrath. The one thing this whole chapter has watched people trust, money, walls, position, is named as useless on the one day it would have mattered.",
    ]),
  ],
  closing: [
    ["So that is Day 271.", 700],
    ["Habakkuk got his answer, five woes against the very empire God said he was raising up. Justice for the oppressor was already written before the oppressor even arrived.", 800],
    ["Then his complaint turned into a prayer. In wrath remember mercy. He never asked God to stop being just, only to leave room in it.", 800],
    ["And after seeing that vision shake him to his bones, he said the line that answers the whole book. Even if the fig tree never blossoms, yet I will rejoice in the Lord.", 850],
    ["That's not a feeling that waits for good news. It's a decision made before the harvest comes in either way.", 850],
    ["Then Zephaniah opens under a king who was actually fixing things, and still says the day of the Lord is near. Reform does not undo what came before it by itself.", 850],
    ["Neither silver nor gold shall deliver them, Zephaniah says. Whatever you're trusting instead of God, that line is for you too.", 850],
    ["Tomorrow, Zephaniah 2 and 3, and the start of Haggai. Judgment keeps going, and then someone finally gets told to rebuild.", 850],
    ["For now, hold on to Habakkuk's line.", 750],
    ["The just shall live by his faith.", 1200],
  ],
};
