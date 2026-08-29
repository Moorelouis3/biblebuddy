import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 37, written to the Day 1 standard.
 *
 * Leviticus 21-24 moves from priestly holiness to the sacred calendar to a
 * single hard case tried in the camp. Seven blocks, one per natural unit,
 * consolidating the long festival chapter into two so the day stays the
 * standard length.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Leviticus ${chapter}:${startVerse}-${endVerse}`,
  book: "leviticus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 37,
  title: "Priests, Feasts, and Sacred Order",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 37.", 700],
    ["Who gets to stand at the altar. What a sacrifice is allowed to look like. What the whole nation does on the one day a year it stops.", 850],
    ["And near the end, a man curses God's name in the middle of a fight, and the camp has to decide what that actually costs.", 850],
    ["We are in Leviticus 21 through 24.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(21, 1, 15, [
      "An ordinary priest can defile himself for close family - mother, father, son, daughter, brother, an unmarried sister. Not for anyone else.",
      "The high priest gets no exceptions at all. Not even for his own mother or father. He can't leave the sanctuary, can't tear his clothes, can't uncover his head, because the anointing oil is on him.",
      "Marriage narrows the same way. A priest can't marry a prostitute or a divorced woman. The high priest can only marry a virgin from his own people.",
      "The reason repeats twice. I am the LORD which sanctify you. The closer a man stood to the altar, the less room he had to just be an ordinary man.",
    ]),
    g(21, 16, 24, [
      "God tells Moses to tell Aaron: none of his descendants with a physical defect may approach to offer the bread of God. The list is long and specific. Blind. Lame. A flattened nose. A crooked back. A crushed limb.",
      "He does not lose his place in the family. He still eats the priest's food, the holy portions and the most holy.",
      "What he loses is the altar itself. He cannot come near the veil, so the sanctuary itself is not profaned.",
      "It reads hard today. Read it the way Leviticus means it. The offering was meant to picture wholeness, so the one presenting it had to as well. This was never a verdict on the man.",
    ]),
    g(22, 1, 16, [
      "Any priest carrying uncleanness, a skin disease, a discharge, contact with a dead body, stays away from the holy portions until he's clean.",
      "Even a hired servant or a guest under a priest's roof can't eat the holy food. It's household only. Someone born there, someone bought with money, family.",
      "A priest's daughter married to an outsider loses that right too. Widowed or divorced, with no child, back in her father's house, she eats it again like she did growing up.",
      "Every line circles the same point. The holy things are not just food. Treat them carelessly and the guilt is real, which is why an accidental violation still costs a fifth added back.",
    ]),
    g(22, 17, 33, [
      "Any offering brought to God, vow or freewill, has to be a male without blemish. Blind, broken, maimed, scabbed. None of it is acceptable.",
      "A freewill gift had a little more room. Something slightly too much or too little could pass. A vow never could. What you promised had to be your best, no exceptions.",
      "Don't kill a mother animal and her young the same day. Let a newborn stay under its mother seven days before it can be offered at all. A small mercy folded into a law about sacrifice.",
      "And a thanksgiving offering had to be eaten the same day it was given. Nothing left until morning. Gratitude here was not allowed to sit around and go stale.",
    ]),
    g(23, 1, 22, [
      "This chapter lays out Israel's whole sacred calendar, and it starts with the weekly Sabbath before a single festival is named. Rest comes first.",
      "Passover falls on the fourteenth day of the first month. The next day opens seven days of unleavened bread.",
      "Firstfruits comes early in the harvest. A sheaf is waved before the Lord before anyone eats from the new crop. You don't consume the harvest before you've handed some of it back.",
      "Fifty days later comes the Feast of Weeks, with two loaves of bread. And right there, in the middle of festival law, Leviticus repeats the command to leave the corners of the field for the poor and the stranger. Worship and mercy sit in the same paragraph.",
    ]),
    g(23, 23, 44, [
      "The seventh month opens with a day of trumpets. A memorial. A holy day. No work.",
      "Ten days later comes the Day of Atonement. Do no work, afflict your soul, and whoever ignores it is cut off from the people. One day a year, the whole nation stops to face what stands between it and God.",
      "Five days after that, the mood turns completely. The Feast of Tabernacles. Seven days living in booths, branches of palm and willow, rejoicing before the Lord.",
      "Grief has a day. Joy has a day, five days later. Neither one gets skipped, and neither one crowds out the other.",
    ]),
    g(24, 1, 23, [
      "The lamp on the pure gold lampstand burns continually, tended by Aaron every evening. Twelve loaves sit on the table before the Lord, one for each tribe, replaced every Sabbath.",
      "Then the scene turns sharply. A man, half Israelite, half Egyptian, fights with another man in the camp, and curses the name of the Lord in the middle of it.",
      "They hold him in custody until God tells Moses what to do. The answer: everyone who heard him lay a hand on his head, and the whole camp stones him. The same law applies whether he was born in Israel or not.",
      "Then comes the line most people know without knowing where it's from. Eye for eye, tooth for tooth. Not a license for revenge. A ceiling on it. The punishment could never outgrow the injury, for the stranger and the citizen alike.",
    ]),
  ],
  closing: [
    ["So that is Day 37.", 700],
    ["Who could serve at the altar. What a sacrifice had to look like. What the whole nation did on the one day of atonement, and how it celebrated five days later.", 850],
    ["Some of this chapter is hard to hear out loud, especially the rules about a priest's body. Leviticus is not grading anyone's worth. It is protecting a picture of wholeness at the one place that pictured God's presence.", 900],
    ["And the calendar in the middle of it all is not random. Grief gets a day. So does joy. Neither one is skipped.", 850],
    ["Then a man curses God's name in a fight, and the law that follows is not cruelty. Eye for eye, tooth for tooth, puts a ceiling on revenge. It does not hand out a license for it.", 900],
    ["One law, it says, for the stranger and the native alike. That line shows up here before it shows up almost anywhere else in Scripture.", 850],
    ["Tomorrow, Leviticus 25 through 27, and the start of Numbers. Jubilee, covenant, and a nation getting counted.", 850],
    ["For now, sit with the ceiling this law puts on anger.", 800],
    ["Eye for eye.", 750],
    ["Not an inch more.", 1200],
  ],
};
