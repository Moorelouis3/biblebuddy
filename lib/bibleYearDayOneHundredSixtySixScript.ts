import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 166, written to the Day 1 standard.
 *
 * Psalms 112-114: an acrostic companion to yesterday's Psalm 111, describing
 * the man who lives out the fear of the LORD; a hymn asking who is like God,
 * then watching him stoop to lift the poor; and the Exodus retold as a poem,
 * with the sea fleeing and the mountains skipping. Six blocks, splitting each
 * psalm in half.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 166,
  title: "Fear of the Lord and Exodus Praise",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 166. Psalms 112 through 114.", 700],
    ["Yesterday ended on one line: the fear of the LORD is the beginning of wisdom. Today opens by naming the man who actually lives that way.", 800],
    ["Then a psalm that starts as pure praise and ends with a childless woman singing in her own house.", 800],
    ["And the day closes by singing the Exodus itself. Mountains skipping like lambs, a sea running scared.", 850],
    ["The fear of the LORD, then wonder, then history turned into song.", 750],
    ["We are in Psalms 112, 113, and 114.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(112, 1, 5, [
      "Praise ye the LORD. Blessed is the man that feareth the LORD, that delighteth greatly in his commandments. Same phrase that closed yesterday's psalm, now given its own acrostic to unpack it.",
      "His seed shall be mighty upon earth: the generation of the upright shall be blessed. The blessing is not framed as one lucky life. It is framed as a legacy.",
      "Unto the upright there ariseth light in the darkness: he is gracious, and full of compassion, and righteous. Light that shows up specifically in the dark, not just in the easy stretches.",
      "A good man sheweth favour, and lendeth: he will guide his affairs with discretion. This is not abstract piety. It is money lent and decisions made wisely, ordinary weekday stuff.",
    ]),
    g(112, 6, 10, [
      "Surely he shall not be moved for ever: the righteous shall be in everlasting remembrance. His heart is fixed, trusting in the LORD. That exact phrase, heart is fixed, is what David said of himself back in Psalm 108. Now it describes anyone who trusts God, not just the king.",
      "He shall not be afraid of evil tidings. Not because bad news never comes. Because the heart was settled before the news arrived.",
      "He hath dispersed, he hath given to the poor; his righteousness endureth for ever; his horn shall be exalted with honour. Generosity again, and this time it is named as the source of lasting honor.",
      "The wicked shall see it, and be grieved; he shall gnash with his teeth, and melt away. A stark opposite ending. One man stands fixed. The other watches and comes undone.",
    ]),
    g(113, 1, 5, [
      "Praise ye the LORD. Praise, O ye servants of the LORD, praise the name of the LORD. Three times in one verse. This psalm does not ease into it.",
      "From the rising of the sun unto the going down of the same the LORD'S name is to be praised. Every hour of the day gets claimed for it, from sunrise to sunset.",
      "The LORD is high above all nations, and his glory above the heavens. About as exalted a claim as a psalm can make. Above every nation, above the sky itself.",
      "Who is like unto the LORD our God, who dwelleth on high. A question asked and left hanging. The next four verses are the answer.",
    ]),
    g(113, 6, 9, [
      "Who humbleth himself to behold the things that are in heaven, and in the earth! The God who is high above the heavens has to bend down just to look at heaven. That is how high he actually is.",
      "He raiseth up the poor out of the dust, and lifteth the needy out of the dunghill. Dust and a garbage heap. The lowest, most overlooked places a person can end up.",
      "That he may set him with princes, even with the princes of his people. From the dunghill to the palace. The distance covered is the whole point.",
      "He maketh the barren woman to keep house, and to be a joyful mother of children. Praise ye the LORD. The cosmic God who is high above all nations turns out to also notice one woman's empty house.",
    ]),
    g(114, 1, 4, [
      "When Israel went out of Egypt, the house of Jacob from a people of strange language. No warning, no transition. The hymn just becomes history.",
      "Judah was his sanctuary, and Israel his dominion. The nation itself, freshly out of slavery, described as God's own holy ground.",
      "The sea saw it, and fled: Jordan was driven back. Two different waters, two different moments in the story, told back to back as if they happened the same day.",
      "The mountains skipped like rams, and the little hills like lambs. Sinai's shaking turned into the most playful image in the whole psalm.",
    ]),
    g(114, 5, 8, [
      "What ailed thee, O thou sea, that thou fleddest? thou Jordan, that thou wast driven back? The psalm turns and asks the water itself what happened, like a reporter chasing down a witness.",
      "Ye mountains, that ye skipped like rams; and ye little hills, like lambs? Same question, aimed at the mountains this time.",
      "Tremble, thou earth, at the presence of the Lord, at the presence of the God of Jacob. There is the answer, repeated for weight. Not Israel's strength. His presence.",
      "Which turned the rock into a standing water, the flint into a fountain of waters. One more miracle folded in at the very end, water out of stone in the wilderness, closing the whole Exodus story in a single line.",
    ]),
  ],
  closing: [
    ["So that is Day 166.", 700],
    ["Psalm 112 describes the man who fears the LORD: steady, generous, unafraid of bad news. Psalm 113 asks who is like our God, then answers by watching him stoop down to lift the poor out of the dust. Psalm 114 sings the Exodus like it just happened.", 850],
    ["Three psalms, one movement. Fear of the LORD becomes a life. That life becomes wonder at how far God bends down. And that wonder becomes a song about the day he actually did.", 850],
    ["Notice what made the sea run and the mountains skip. Not Israel's strength. The presence of the Lord, the God of Jacob.", 800],
    ["The same God Jacob met at Bethel with a stone for a pillow, still called by his name centuries later.", 800],
    ["Tomorrow, Psalms 115 through 117. Idols that cannot speak, a prayer from the edge of death, and the shortest psalm in the whole book.", 850],
    ["For now, hold on to Psalm 113.", 750],
    ["Who is like unto the LORD our God.", 750],
    ["Who stoops that low.", 1200],
  ],
};
