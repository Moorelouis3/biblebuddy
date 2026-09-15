import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 221, written to the Day 1 standard.
 *
 * Jeremiah 10-12: idols get mocked for needing nails to stand up, God
 * restates the covenant only to find it broken in every city, Jeremiah's
 * own hometown plots to kill him, and he ends the reading asking God
 * outright why the wicked prosper. Six blocks across three chapters
 * (65 verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 221,
  title: "Idols, Covenant, and Complaint",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 221. Jeremiah walks through how an idol actually gets built, nail by nail, just to show you it cannot even stand up on its own.", 750],
    ["Then God restates the covenant the nation signed, and finds out it got broken in every single city.", 800],
    ["And Jeremiah's own hometown decides the safest thing to do with a prophet is kill him.", 800],
    ["By the end, he asks God the question almost everyone eventually asks. Why do the wicked prosper?", 850],
    ["We are in Jeremiah 10, 11, and 12.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(10, 1, 16, [
      "God tells Israel not to learn the way of the heathen, then gives about the plainest description of idol-making in the whole Bible. One cutteth a tree out of the forest, decks it with silver and gold, fastens it with nails so it will not fall over.",
      "That last detail is the whole point. They must needs be borne, because they cannot go. A god you have to carry is not a god. It is furniture.",
      "Against that, God says who he actually is. He hath made the earth by his power, established the world by his wisdom, and stretched out the heavens by his discretion. Not built. He made everything else.",
      "So the portion of Jacob is not like them. He is the former of all things, and Israel is the rod of his inheritance. One side is a workshop project. The other made the workshop.",
    ]),
    g(10, 17, 25, [
      "The tone flips fast, from mocking idols to mourning what is coming. Gather up thy wares out of the land. God is about to sling the people out of the very ground they are standing on.",
      "Jeremiah takes the hit personally. Woe is me for my hurt, my wound is grievous. My tabernacle is spoiled, my children are gone forth of me, and they are not.",
      "He blames the shepherds directly. The pastors are become brutish, and have not sought the Lord. Leaders who never looked for God cannot lead anyone else toward him.",
      "Then Jeremiah prays the most honest line in the chapter. O Lord, correct me, but with judgment, not in thine anger, lest thou bring me to nothing. He is not asking to escape discipline. He is asking for it measured, not unleashed.",
    ]),
    g(11, 1, 14, [
      "God has Jeremiah restate the original deal from Sinai. Obey my voice, and do them, according to all which I command you, so shall ye be my people, and I will be your God. Simple terms, said plainly.",
      "Jeremiah answers for the people the way you would want anyone to. So be it, O Lord. Then God reveals what actually happened since. A conspiracy is found among the men of Judah.",
      "The whole nation went shopping for other gods, city by city. According to the number of thy cities were thy gods, O Judah. Every town got its own idol, like a franchise.",
      "So the same hard line from chapter 7 comes back. Pray not thou for this people. Even calling out to their own idols will not save them in trouble, because idols were never able to save anyone in the first place.",
    ]),
    g(11, 15, 23, [
      "God calls the nation my beloved, then immediately says what she has done in his own house. Wrought lewdness with many. Worship turned into betrayal inside the one place meant to hold the relationship together.",
      "Israel gets pictured as a green olive tree, fair and full of fruit, that God himself planted, and now sets fire to because of what grew on it. He planted it. He is also the one who has to burn it.",
      "Then the chapter turns personal in a way that should stop you. Jeremiah's own hometown, Anathoth, plots to kill him. Let us destroy the tree with the fruit thereof. He compares himself to a lamb led to slaughter, not even realizing it.",
      "His prayer back is raw, not composed. Let me see thy vengeance on them, for unto thee have I revealed my cause. The men trying to silence him are the priests of his own town. That is who wants him dead.",
    ]),
    g(12, 1, 6, [
      "Jeremiah brings God a question a lot of people carry quietly for years. Wherefore doth the way of the wicked prosper? Wherefore are all they happy that deal very treacherously? He says it straight to God's face, not behind his back.",
      "He names the imbalance out loud. Thou art near in their mouth, and far from their reins. They talk about God constantly and never actually let him near their heart.",
      "God's answer is not comfort. It is a harder question back. If thou hast run with the footmen, and they have wearied thee, then how canst thou contend with horses? Whatever Jeremiah is dealing with now is the easy version of what is coming.",
      "And the threat is not from strangers first. Even thy brethren, and the house of thy father, have dealt treacherously with thee. His own family is part of what is coming for him.",
    ]),
    g(12, 7, 17, [
      "God speaks about his own people the way you would speak about something you loved and lost. I have forsaken mine house, I have left mine heritage, I have given the dearly beloved of my soul into the hand of her enemies. This costs him too.",
      "He blames specific leadership again. Many pastors have destroyed my vineyard, they have trodden my portion under foot. Shepherds who were supposed to protect the flock are named as the ones who wrecked it.",
      "They sowed wheat and will reap thorns. Effort spent on the wrong thing does not multiply into a harvest. It just wastes the season.",
      "But the chapter does not end in ruin. After I have plucked them out I will return, and have compassion on them, and will bring them again, every man to his heritage. Even the surrounding nations get a door held open, if they will learn to swear by my name, the Lord liveth.",
    ]),
  ],
  closing: [
    ["So that is Day 221.", 700],
    ["An idol that needs nails to keep it from falling over. A covenant broken in every city that signed it. A hometown that wants its own prophet dead.", 800],
    ["Jeremiah does not stay above any of it. He prays to be corrected with judgment, not anger. He asks God to see his cause. He asks why the wicked prosper.", 800],
    ["God's only answer to that last question is another question. If the footmen already wore you out, what happens against horses?", 800],
    ["It is not comfort. But it is honest, and it is aimed at somebody God trusts enough to argue back with.", 800],
    ["And even in the middle of a chapter about a ruined vineyard, God says he will return and have compassion.", 850],
    ["Tomorrow, Jeremiah 13 through 15. A linen belt buried in the ground, a drought with no rain, and Jeremiah pleading for a nation on the edge.", 850],
    ["For now, sit with the question God asked Jeremiah back.", 750],
    ["If the footmen already wore you out, what happens with horses?", 750],
    ["Bring it to him anyway.", 1200],
  ],
};
