import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 275, written to the Day 1 standard.
 *
 * Zechariah closes his night visions with chariots patrolling the earth and
 * a crown placed on the high priest naming him the Branch. Then a
 * delegation asks about a fast kept since the exile, and God answers with
 * what he actually wanted all along, before reversing the desolation into
 * streets full of old men and playing children. Seven blocks across
 * Zechariah 6, 7, and 8.
 */

const zechariahSix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 6:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

const zechariahSeven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 7:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 7,
  startVerse,
  endVerse,
  teaching,
});

const zechariahEight = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 8:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 8,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 275,
  title: "Branch, Temple, and Restoration",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 275. A patrol of chariots rides out to the ends of the earth, and a crown gets placed on the wrong man's head.", 800],
    ["Then a delegation shows up asking whether they still need to keep crying over a ruined city.", 800],
    ["God's answer to that question is longer, and harder, than anyone expected.", 800],
    ["By the end, the same streets are full of old men leaning on canes and children playing games.", 850],
    ["We are in Zechariah 6, 7, and 8.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    zechariahSix(1, 8, [
      "Four chariots come out from between two mountains of bronze, pulled by horses in four colors, and the angel says plainly what they are. The four spirits of the heavens, standing before the Lord of all the earth, now sent out to patrol it.",
      "These are the same riders from Zechariah's first vision, back at the start of this whole night, except this time they are not just reporting. They are moving.",
      "The black horses head north, toward Babylon, and the vision does not let that pass unnoticed. Behold, these that go toward the north country have quieted my spirit in the north country. The empire that scattered Jerusalem gets dealt with, and God says so directly.",
      "Two mountains of bronze frame where all of this comes from. Whatever rides out into the earth to patrol it, answers back to something fixed and unmovable.",
    ]),
    zechariahSix(9, 15, [
      "God tells Zechariah to take silver and gold from men just back from exile and make an actual crown. Then put it, of all people, on Joshua the high priest.",
      "And the words spoken over him belong to a king, not a priest. Behold the man whose name is the BRANCH. He shall build the temple of the Lord, and he shall bear the glory, and sit and rule upon his throne.",
      "Then the line that resolves centuries of tension in one breath. He shall be a priest upon his throne, and the counsel of peace shall be between them both. King and priest, one man, no rivalry between the two offices at all.",
      "The crown does not get melted back down afterward. It stays for a memorial in the temple of the Lord, something anyone could go look at, tied to a promise that still had not happened yet.",
    ]),
    zechariahSeven(1, 7, [
      "Two years later, a delegation comes to ask the priests and prophets a very practical question. Should we still weep and fast in the fifth month, the way we have done for seventy years, now that rebuilding has started?",
      "It sounds like a sincere question about ritual. God's answer goes underneath it instead of answering it directly.",
      "When ye fasted and mourned, did ye at all fast unto me, even to me? And when ye did eat, and when ye did drink, did not ye eat for yourselves? Seventy years of mourning, and the whole time it may have been about them, not him.",
      "He points them back to the years before the exile, when the earlier prophets said the same things to a comfortable, prosperous Jerusalem, and nobody listened then either. The question was never really about which month to fast.",
    ]),
    zechariahSeven(8, 14, [
      "Then comes the fast God actually wanted, and it was never about food. Execute true judgment, and shew mercy and compassions every man to his brother.",
      "Oppress not the widow, nor the fatherless, the stranger, nor the poor, and let none of you imagine evil against his brother in your heart. Specific people, named on purpose. Not abstract virtue.",
      "But they refused to hearken, and pulled away the shoulder, and made their hearts as an adamant stone. Adamant was the hardest material anyone knew. That is the picture. A heart that will not move even under direct pressure from God himself.",
      "So the reversal lands exactly even. As he cried, and they would not hear, so they cried, and I would not hear. Then the whirlwind, the scattering, the land left desolate behind them.",
    ]),
    zechariahEight(1, 8, [
      "God speaks again, and starts with the word underneath everything else in this book. I was jealous for Zion with great jealousy. Not distant. Not managing the situation from far away.",
      "I am returned unto Zion, and will dwell in the midst of Jerusalem, and Jerusalem shall be called a city of truth. The same city that was just called desolate gets renamed before it is even finished being rebuilt.",
      "Then the picture that undoes chapter 7's ending. Old men and old women in the streets, each with a staff in hand for very age, and the streets full of boys and girls playing. Long life and safe childhood, in the same place that was empty rubble.",
      "God asks his own question about it. If it be marvellous in the eyes of the remnant, should it also be marvellous in mine eyes? He is not limited by how impossible it looks to the people standing in it.",
    ]),
    zechariahEight(9, 17, [
      "Let your hands be strong, God says, the same line Haggai gave Zerubbabel, now tied to the day the temple's foundation was laid. One repeated command running under this whole rebuilding project.",
      "Before that day, there was no wage worth earning and no safety in traveling, because I set all men every one against his neighbour. Now the reversal gets specific. The vine gives its fruit, the ground gives its increase, the heavens give their dew.",
      "As ye were a curse among the heathen, so will I save you, and ye shall be a blessing. Not just relief from judgment. A complete reversal of reputation.",
      "And the blessing comes with the same instructions as before the exile, word for word almost. Speak truth to your neighbor, judge with truth and peace, do not plot evil against each other, do not love a false oath, for all these are things I hate. Nothing new is being asked.",
    ]),
    zechariahEight(18, 23, [
      "The fast that opened chapter 7 finally gets its answer. The fasts of the fourth, fifth, seventh, and tenth months shall be to the house of Judah joy and gladness, and cheerful feasts. Mourning turned to celebration, once truth and peace are actually loved.",
      "Then the vision widens past just Jerusalem. The inhabitants of one city shall go to another, saying, let us go speedily to pray before the Lord. Cities inviting cities. Many people and strong nations coming to seek him.",
      "It ends on the strangest, most hopeful image in the whole book. Ten men shall take hold of the skirt of him that is a Jew, saying, we will go with you.",
      "And their reason is not fear, and it is not force. For we have heard that God is with you. Reputation alone pulls the nations in, after everything else in this book has been about scattering, curses, and exile.",
    ]),
  ],
  closing: [
    ["So that is Day 275.", 700],
    ["Chariots rode out to patrol the whole earth and came back having quieted God's own anger toward the empire that scattered Jerusalem.", 800],
    ["A crown that should have gone on a king went on the high priest instead, and God named him the Branch. One man to build the temple and sit on the throne, priest and king with no conflict between them.", 850],
    ["A delegation asked if they still had to fast over a ruined city. God asked whether any of that fasting was ever really for him.", 800],
    ["Then he named the fast he actually wanted. True judgment. Mercy. No hand against the widow, the orphan, the stranger, the poor. Their fathers refused it, and their hearts turned to stone, and the land went desolate.", 850],
    ["Now those same streets have old men leaning on canes and children playing games in them, and God calls it a city of truth. As you were a curse, he says, I will make you a blessing. Let your hands be strong.", 850],
    ["And the fasts turn into feasts. Ten men from every language grab the robe of one Jew and say, we will go with you, for we have heard that God is with you.", 850],
    ["Tomorrow, Malachi 1 through 3. The last prophet before four hundred years of silence.", 850],
    ["For now, hold on to the robe.", 750],
    ["We have heard that God is with you.", 1200],
  ],
};
