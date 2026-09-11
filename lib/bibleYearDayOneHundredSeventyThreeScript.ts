import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 173, written to the Day 1 standard.
 *
 * Psalms 133-135: two short songs about brothers in unity and a night
 * watch that blesses God in the dark, then a longer psalm of praise that
 * remembers the Exodus by name and mocks idols that cannot speak, see, or
 * hear. Five blocks, the last three carrying Psalm 135's 21 verses.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 173,
  title: "Unity and Praise",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 173. Yesterday ended with David's vow, and God's bigger one back.", 750],
    ["Today starts even smaller. Two short songs, six verses between them.", 750],
    ["Then a longer one that names the Exodus out loud and laughs at idols that cannot see or hear.", 800],
    ["We are in Psalms 133, 134, and 135.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(133, 1, 3, [
      "Behold, how good and how pleasant it is for brethren to dwell together in unity! Three words in and the psalm already says look at this. It wants you to actually notice how rare it is.",
      "It is like the precious ointment upon the head, that ran down upon the beard, even Aaron's beard: that went down to the skirts of his garments. Not a drop. Oil poured so generously it runs off the beard and down the robe. That is the picture for unity. Nothing measured out.",
      "As the dew of Hermon, and as the dew that descended upon the mountains of Zion. Hermon is far north. Zion is far south. The psalm pictures dew from one reaching the other, unity covering ground it has no business covering.",
      "For there the LORD commanded the blessing, even life for evermore. Wherever brothers actually dwell together, God has already ordered a blessing to be waiting.",
    ]),
    g(134, 1, 3, [
      "Behold, bless ye the LORD, all ye servants of the LORD, which by night stand in the house of the LORD. The temple never really closes. Someone is on duty in the dark, blessing God when nobody is watching them do it.",
      "Lift up your hands in the sanctuary, and bless the LORD. No long ceremony. Just hands raised, in the middle of a night shift.",
      "The LORD that made heaven and earth bless thee out of Zion. The whole psalm has been people blessing God. The last line flips it. He made heaven and earth, and he still turns to bless the ones standing watch.",
      "Two verses of people blessing the Lord, and one verse of the Lord blessing them back. That is the shape of the whole relationship, not just this one night.",
    ]),
    g(135, 1, 7, [
      "Praise ye the LORD. Praise ye the name of the LORD; praise him, O ye servants of the LORD. Ye that stand in the house of the LORD, in the courts of the house of our God. Same language as the night watch in the last psalm. Now everyone is called to join them.",
      "Praise the LORD; for the LORD is good: sing praises unto his name; for it is pleasant. For the LORD hath chosen Jacob unto himself, and Israel for his peculiar treasure. A reason is given both times. He is good, and he chose them. Neither one was earned.",
      "For I know that the LORD is great, and that our Lord is above all gods. A communal psalm, and suddenly one voice says I know. Not we assume. A personal claim, dropped into the middle of a crowd.",
      "Whatsoever the LORD pleased, that did he in heaven, and in earth, in the seas, and all deep places. He causeth the vapours to ascend from the ends of the earth; he maketh lightnings for the rain; he bringeth the wind out of his treasuries. This is not a God managing things from far away. He runs the actual weather.",
    ]),
    g(135, 8, 14, [
      "Who smote the firstborn of Egypt, both of man and beast. Who sent tokens and wonders into the midst of thee, O Egypt, upon Pharaoh, and upon all his servants. The psalm names the night of Passover directly. Not a vague rescue. A specific, terrible night.",
      "Who smote great nations, and slew mighty kings: Sihon king of the Amorites, and Og king of Bashan, and all the kingdoms of Canaan. And gave their land for an heritage, an heritage unto Israel his people. Named kings, not vague enemies. Their land became somebody's actual inheritance.",
      "Thy name, O LORD, endureth for ever; and thy memorial, O LORD, throughout all generations. The psalm shifts from what he did back then to what outlives all of it. His name, still standing, long after every king listed is gone.",
      "For the LORD will judge his people, and he will repent himself concerning his servants. A striking line in the middle of a war story. The same God who struck down kings turns around and has compassion on his own.",
    ]),
    g(135, 15, 21, [
      "The idols of the heathen are silver and gold, the work of men's hands. They have mouths, but they speak not; eyes have they, but they see not; they have ears, but they hear not; neither is there any breath in their mouths. Every sense named, and every one denied. These gods cannot do the one thing Psalm 130 begged God to do. Hear.",
      "They that make them are like unto them: so is every one that trusteth in them. A hard line. What you worship, you start to resemble. Silent gods make silent worshippers.",
      "Bless the LORD, O house of Israel: bless the LORD, O house of Aaron: bless the LORD, O house of Levi: ye that fear the LORD, bless the LORD. The same night-watch family from Psalm 134, the house of Levi, gets named again. The circle keeps widening until it includes anyone who fears him.",
      "Blessed be the LORD out of Zion, which dwelleth at Jerusalem. Praise ye the LORD. The last line matches the first one almost exactly. Praise ye the LORD, opening the door and closing it again.",
    ]),
  ],
  closing: [
    ["So that is Day 173.", 700],
    ["Oil running down a beard, a night watch blessing God in the dark, and idols that cannot hear a word said to them.", 750],
    ["Psalm 133 says unity is not just nice. It is the place God has already decided to bless.", 800],
    ["Psalm 134 is six verses of people blessing God, then one line of him blessing them back. That is the whole relationship in miniature.", 800],
    ["And Psalm 135 names Egypt, Sihon, and Og out loud, then says the idols those nations trusted could not see or hear any of it happen.", 850],
    ["Tomorrow, Psalms 136 through 138. One phrase, repeated twenty-six times in a row.", 850],
    ["For now, hold on to the line about what you worship.", 800],
    ["They that make them are like unto them.", 850],
    ["Like unto them.", 1200],
  ],
};
