import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 216, written to the Day 1 standard.
 *
 * Isaiah 61-63: the anointed one who preaches good tidings and proclaims
 * both the acceptable year and the day of vengeance in the same breath,
 * Zion renamed instead of Forsaken, then the lone figure coming from Edom
 * in bloodstained garments who trod the winepress alone, followed by a
 * full recounting of God's old mercies and a plea for him to return. Six
 * blocks across three chapters (42 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 216,
  title: "Good News and the Day of Vengeance",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 216.", 700],
    ["Yesterday a forsaken city was told to rise and shine. Today you find out who's coming to it.", 800],
    ["One man, anointed to preach good news to the poor. Same man, come to tread a winepress alone in his anger.", 850],
    ["Both of those are on the very same page. Not a contradiction. Just two ends of the same rescue.", 850],
    ["We are in Isaiah 61, 62, and 63.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(61, 1, 7, [
      "The Spirit of the Lord GOD is upon me... he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives. Jesus reads this exact passage out loud in a synagogue centuries later and says it is about him, right then.",
      "To proclaim the acceptable year of the LORD, and the day of vengeance of our God. Mercy and judgment named in the same sentence, by the same mouth, with no pause between them.",
      "To give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness. Three straight trades. Nothing stays as it was.",
      "For your shame ye shall have double... everlasting joy shall be unto them. What used to cost them shame now pays out double. That's not how debts usually work.",
    ]),
    g(61, 8, 11, [
      "For I the LORD love judgment, I hate robbery for burnt offering. He tells you what he loves and what he hates in the same verse, and they're not in tension.",
      "I will make an everlasting covenant with them. And their seed shall be known among the Gentiles. A promise that outlives the person it's made to.",
      "I will greatly rejoice in the LORD... he hath clothed me with the garments of salvation. The speaker shifts from God's messenger to Zion herself, dressed like a bride on her wedding day.",
      "As the earth bringeth forth her bud... so the Lord GOD will cause righteousness and praise to spring forth before all the nations. Nobody forces a bud open. It just does what it was made to do, on time.",
    ]),
    g(62, 1, 7, [
      "For Zion's sake will I not hold my peace... until the righteousness thereof go forth as brightness. God commits to not shutting up about this city until it's visibly true.",
      "Thou shalt no more be termed Forsaken... but thou shalt be called Hephzi-bah, and thy land Beulah: for the LORD delighteth in thee. Two new names. Both mean, roughly, my delight is in her.",
      "As the bridegroom rejoiceth over the bride, so shall thy God rejoice over thee. Not tolerate. Not forgive and move on. Rejoice, the way a groom does on the one day that's entirely about her.",
      "I have set watchmen upon thy walls... which shall never hold their peace day nor night... give him no rest. Watchmen who pray without stopping, because the thing they're praying for matters that much.",
    ]),
    g(62, 8, 12, [
      "The LORD hath sworn by his right hand... Surely I will no more give thy corn to be meat for thine enemies. An oath, not just a promise. What was taken by force stops being taken.",
      "They that have gathered it shall eat it, and praise the LORD. The people who plant finally get to eat what they planted. That's the whole complaint of exile, undone in one line.",
      "Go through, go through the gates; prepare ye the way of the people; cast up, cast up the highways. Road-building language. Someone is coming, and the road has to be ready.",
      "Behold, thy salvation cometh... thou shalt be called, Sought out, A city not forsaken. The chapter started by refusing the name Forsaken. It ends by replacing it for good.",
    ]),
    g(63, 1, 9, [
      "Who is this that cometh from Edom, with dyed garments from Bozrah?... mighty to save. The prophet sees a figure coming from the direction of Israel's old enemy, stained red, and asks who it is.",
      "I have trodden the winepress alone; and of the people there was none with me... their blood shall be sprinkled upon my garments. He answers his own question. The stains are from the fight, and he fought it by himself.",
      "For the day of vengeance is in mine heart, and the year of my redeemed is come. Same two words from chapter 61 — vengeance and the acceptable year — now paired again, this time in his own voice.",
      "In all their affliction he was afflicted, and the angel of his presence saved them: in his love and in his pity he redeemed them; and he bare them, and carried them all the days of old. Then the anger drops completely, and what's left is a father who felt every bit of what his people felt.",
    ]),
    g(63, 10, 19, [
      "But they rebelled, and vexed his holy Spirit: therefore he was turned to be their enemy, and he fought against them. The turn is on their side, not his. He becomes what they made him.",
      "Then he remembered the days of old, Moses, and his people... where is he that put his holy Spirit within him? The rest of the chapter is a prayer, and it starts by looking backward at the Red Sea, wondering out loud if that power is still around.",
      "Doubtless thou art our father, though Abraham be ignorant of us, and Israel acknowledge us not: thou, O LORD, art our father, our redeemer. Even the ancestors don't recognize them anymore. God is the only relationship left standing.",
      "O LORD, why hast thou made us to err from thy ways, and hardened our heart from thy fear? Return for thy servants' sake. A hard, honest question with no answer given yet, and then a plea. Come back.",
    ]),
  ],
  closing: [
    ["So that is Day 216.", 700],
    ["The Spirit of the Lord GOD is upon me... he hath sent me to bind up the brokenhearted. Jesus stood up in a synagogue and said that was written about him.", 800],
    ["Thou shalt no more be termed Forsaken... for the LORD delighteth in thee. Two new names for a city that used to define itself by what it lost.", 800],
    ["Then a figure comes from Edom in bloodstained clothes. I have trodden the winepress alone. He fought that battle by himself, and it cost him.", 850],
    ["And right after the anger, without warning, it turns tender. In all their affliction he was afflicted... he bare them, and carried them all the days of old.", 850],
    ["The chapter ends with a raw question and a short prayer. Why hast thou made us to err from thy ways? Return, for thy servants' sake.", 800],
    ["Tomorrow, Isaiah 64 through 66. The prayer keeps going, and then the whole story closes on new heavens and a new earth.", 850],
    ["For now, sit with the line that holds both halves of today together.", 800],
    ["The acceptable year of the LORD, and the day of vengeance of our God.", 800],
    ["Named in the very same breath.", 1200],
  ],
};
