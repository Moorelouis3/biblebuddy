import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 195, written to the Day 1 standard.
 *
 * Song of Solomon 6-8 closes the book: the daughters of Jerusalem offer to
 * help her search, more praise in both directions, and then the one verse
 * that states outright what the whole book has been showing in pictures —
 * love is strong as death. Six blocks, one or two per chapter, closing the
 * book in order.
 */

const sos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Song of Solomon ${chapter}:${startVerse}-${endVerse}`,
  book: "song of solomon",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 195,
  title: "Love Is Strong as Death",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 195.", 650],
    ["Song of Solomon 6 through 8. The last three chapters of this book.", 750],
    ["Yesterday ended with her searching, wounded, and still in love.", 800],
    ["Today the daughters of Jerusalem offer to help her look. Turns out he was never really lost.", 850],
    ["And by the end, this book says something about love it never quite says twice.", 800],
    ["We are in Song of Solomon 6, 7, and 8.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sos(6, 1, 9, [
      "Whither is thy beloved gone... that we may seek him with thee? The daughters of Jerusalem, who watched her grief in chapter 5, now offer to help. Her sorrow made other people want to join the search.",
      "My beloved is gone down into his garden... I am my beloved's, and my beloved is mine. She already knows exactly where he is. He was never really lost. The searching in the dark was about her fear, not his absence.",
      "Turn away thine eyes from me, for they have overcome me. He asks her to look away because her gaze has that much power over him. This desire runs in both directions.",
      "There are threescore queens, and fourscore concubines, and virgins without number. My dove, my undefiled is but one. Set against every other woman he could name, he says only one thing actually matters. Not the biggest number in the book. The smallest one that counts.",
    ]),
    sos(6, 10, 13, [
      "Who is she that looketh forth as the morning, fair as the moon, clear as the sun, and terrible as an army with banners? The chapter stops to ask, almost in awe, who this woman even is.",
      "I went down into the garden of nuts... or ever I was aware, my soul made me like the chariots of Amminadib. She wanders out just to check on the season and gets swept up by something before she even notices it happening.",
      "Return, return, O Shulamite; return, return, that we may look upon thee. A crowd calls her back twice just to see her again. This is the first time the poem names her directly, tied to Solomon's own name.",
      "What will ye see in the Shulamite? As it were the company of two armies. Even the crowd isn't sure what they're looking at. Something powerful enough to look like two armies, not one.",
    ]),
    sos(7, 1, 9, [
      "How beautiful are thy feet with shoes, O prince's daughter! He starts at her feet this time, working upward, the opposite direction from chapter 4. Jewels, wheat, ivory, towers, one image after another.",
      "This thy stature is like to a palm tree... I will go up to the palm tree, I will take hold of the boughs thereof. Admiration turns into intention here. He doesn't just look. He says what he wants to do.",
      "The roof of thy mouth like the best wine for my beloved, that goeth down sweetly, causing the lips of those that are asleep to speak. Even a kiss gets compared to wine good enough to wake the dead.",
      "This is the last time in the book he lists her out like this. After here, the poem turns toward what they do together, not just what she looks like.",
    ]),
    sos(7, 10, 13, [
      "I am my beloved's, and his desire is toward me. Almost the same line from chapter 6, flipped around. Before it was he is mine. Now it's his desire is toward me. She's just as sure of being wanted as of belonging.",
      "Come, my beloved, let us go forth into the field; let us lodge in the villages. She's the one issuing the invitation now. Fields and villages, not palaces. Ordinary places.",
      "Let us get up early to the vineyards... there will I give thee my loves. She names exactly what she's offering, with no hedging.",
      "Which I have laid up for thee, O my beloved. Old and new fruit, saved specifically for him. Love here looks like planning ahead for someone, not only feeling something in the moment.",
    ]),
    sos(8, 1, 7, [
      "O that thou wert as my brother... when I should find thee without, I would kiss thee, yea, I should not be despised. A strange wish at first. It's really about being free to show affection in public without being judged for it.",
      "I charge you... that ye stir not up, nor awake my love, until he please. The refrain returns a final time. By now it reads less like a rule and more like something she's learned the hard way.",
      "Set me as a seal upon thine heart, as a seal upon thine arm. A seal isn't decoration. It marks ownership, official and permanent, worn where it can't be missed.",
      "For love is strong as death... many waters cannot quench love, neither can the floods drown it: if a man would give all the substance of his house for love, it would utterly be contemned. The most direct line in the whole book, said once and never repeated. Love is a force as strong as the grave, and money can't buy it.",
    ]),
    sos(8, 8, 14, [
      "We have a little sister, and she hath no breasts: what shall we do for our sister in the day when she shall be spoken for? Her brothers, worried about a much younger sister, wonder out loud how they'll protect her reputation when the time comes.",
      "I am a wall, and my breasts like towers: then was I in his eyes as one that found favour. She answers for herself, years later. She grew up strong enough that no one needed to protect her honor for her.",
      "Solomon had a vineyard at Baal-hamon; he let out the vineyard unto keepers... my vineyard, which is mine, is before me. Solomon's own vineyard gets rented out for profit. Hers isn't for rent. She decides who gets it, and she's already given it away.",
      "Make haste, my beloved, and be thou like to a roe or to a young hart upon the mountains of spices. The book ends without a wedding, without a final embrace. Just her voice, calling him one more time. Love that started with a search in the night ends with an open invitation, still waiting on him to come.",
    ]),
  ],
  closing: [
    ["So that is Day 195. And that is Song of Solomon.", 700],
    ["She was never really lost from him. Only unsure, for a moment, in the dark.", 800],
    ["He praised her again, head to toe, and told her to look away because her eyes had that much power over him.", 800],
    ["She stopped waiting to be searched for and started doing the inviting herself.", 800],
    ["And once, this book says the thing plainly. Love is strong as death, and no flood can drown it.", 850],
    ["Her brothers wondered how they would protect her one day. She answered that she had already protected herself.", 850],
    ["Tomorrow, Isaiah 1 through 3. A very different kind of book begins.", 850],
    ["For now, carry the line that makes this whole book worth keeping.", 800],
    ["Love is strong as death.", 1200],
  ],
};
