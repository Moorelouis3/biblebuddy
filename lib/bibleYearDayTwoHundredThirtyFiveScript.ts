import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 235, written to the Day 1 standard.
 *
 * Jeremiah 52 tells the fall of Jerusalem in plain historical prose - dates,
 * a siege, a burned temple, exile counts by year. Lamentations 1-2 then
 * tells the same event again as a poem written by someone standing in the
 * ashes. Six blocks across three chapters and two books (78 verses), no
 * gaps.
 */

const jer = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const lam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Lamentations ${chapter}:${startVerse}-${endVerse}`,
  book: "lamentations",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 235,
  title: "Jerusalem's Ruin and Grief",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 235. We already knew Jerusalem was going to fall. Today we watch it happen.", 750],
    ["Jeremiah 52 tells the siege and the burning in plain historical prose - dates, numbers, names.", 800],
    ["Then Lamentations opens, and the same event gets told again, this time as a poem written by someone standing in the ashes.", 800],
    ["Same city. Same disaster. Two completely different ways of telling the truth about it.", 800],
    ["We are in Jeremiah 52, and Lamentations 1 and 2.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    jer(52, 1, 11, [
      "Zedekiah does exactly what got two kings before him removed. He did that which was evil in the eyes of the LORD, according to all that Jehoiakim had done. Same sin, same warnings, same ending coming.",
      "He rebels, and Nebuchadrezzar king of Babylon came, he and all his army, against Jerusalem, and pitched against it, and built forts against it round about. A siege is not fast. It is patient, and it works.",
      "The famine was sore in the city, so that there was no bread for the people of the land. Only after that does the wall finally break, at night, through a gate by the king's garden. Hunger came before the breach.",
      "All his army was scattered from him in the plains of Jericho. Then the king of Babylon slew the sons of Zedekiah before his eyes before he put out the eyes of Zedekiah. The last thing that man ever saw was his own sons dying.",
    ]),
    jer(52, 12, 34, [
      "A month later, Nebuzar-adan burned the house of the LORD, and the king's house, and all the houses of Jerusalem, and all the houses of the great men, burned he with fire. The temple Solomon built does not survive this chapter.",
      "The pillars of brass that were in the house of the LORD, and the bases, and the brasen sea that was in the house of the LORD, the Chaldeans brake, and carried all the brass of them to Babylon. Even the bronze gets hauled away and melted down.",
      "Jeremiah counts the exiles by year, almost like a ledger. All the persons were four thousand and six hundred, across three separate deportations. A tragedy this size still gets recorded one number at a time.",
      "Then, decades later, one strange note of kindness closes the book. A new king of Babylon lifted up the head of Jehoiachin king of Judah, and brought him forth out of prison, and he did continually eat bread before him all the days of his life. Even in exile, the story does not end in a cell.",
    ]),
    lam(1, 1, 11, [
      "The book opens with a question that is really a lament. How doth the city sit solitary, that was full of people! How is she become as a widow, she that was great among the nations!",
      "Nobody comforts her. Among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her. The nations Judah once trusted to help now watch her fall.",
      "And the writer will not let anyone pretend this came from nowhere. Jerusalem hath grievously sinned; therefore she is removed. Grief here does not erase responsibility.",
      "Then the voice shifts, and the city itself seems to speak. Behold my affliction: for the enemy hath magnified himself. A whole city given a voice just to say how much it hurts.",
    ]),
    lam(1, 12, 22, [
      "Is it nothing to you, all ye that pass by? Behold, and see if there be any sorrow like unto my sorrow. The city asks strangers walking past to actually look at what happened here.",
      "Whatever collapsed did not happen to an innocent bystander, and the poem says so plainly. The LORD is righteous; for I have rebelled against his commandment. Even mid-collapse, the blame lands where it belongs.",
      "I called for my lovers, but they deceived me. Every alliance Judah leaned on instead of God turns out to be exactly as reliable as God said it would be.",
      "The chapter ends asking for the same justice that fell on her to fall on her enemies too. Let all their wickedness come before thee; and do unto them, as thou hast done unto me. Grief here does not pretend to be neutral.",
    ]),
    lam(2, 1, 10, [
      "Chapter two turns the anger toward heaven itself, without softening it. How hath the Lord covered the daughter of Zion with a cloud in his anger! The poem does not blame Babylon first. It blames God first, and lets that stand.",
      "The Lord was as an enemy: he hath swallowed up Israel. That sentence would be unthinkable almost anywhere else in Scripture. Here it is the only way the writer can describe what covenant discipline actually looked like from the inside.",
      "The LORD hath caused the solemn feasts and sabbaths to be forgotten in Zion. Not just buildings fell. The entire rhythm of worship that shaped daily life stopped overnight.",
      "The elders of the daughter of Zion sit upon the ground, and keep silence. Sackcloth, dust, silence. When words run out, this is what grief still knows how to do.",
    ]),
    lam(2, 11, 22, [
      "Mine eyes do fail with tears, my bowels are troubled, my liver is poured upon the earth, for the destruction of the daughter of my people; because the children and the sucklings swoon in the streets of the city. The poem stops being abstract right here.",
      "They say to their mothers, Where is corn and wine? when they swooned as the wounded in the streets of the city. A mother with nothing to give her own starving child is the image Lamentations refuses to look away from.",
      "Then a question aimed straight at heaven. Shall the women eat their fruit, and children of a span long? The famine got so severe that the unthinkable actually happened, and the poet makes God look at it directly.",
      "The book ends without a resolution. Those that I have swaddled and brought up hath mine enemy consumed. No comfort tacked on at the end. Just the wreckage, named honestly, and left there.",
    ]),
  ],
  closing: [
    ["So that is Day 235.", 700],
    ["A siege told in dates and numbers, and then the same collapse told again as a poem written by someone who was actually there.", 800],
    ["The city sits solitary, that was full of people. How is she become as a widow.", 800],
    ["And the book will not let grief erase the reason. The LORD is righteous; for I have rebelled against his commandment.", 850],
    ["Then it gets specific in a way numbers never do. Children fainting in the street, asking their mothers for bread that does not exist.", 850],
    ["Lamentations does not end with comfort. It ends with the wreckage, named honestly.", 800],
    ["Tomorrow, Lamentations 3 through 5. Mercy, somehow, shows up in the middle of this.", 850],
    ["For now, sit with the question the city asks everyone walking by.", 800],
    ["Is it nothing to you, all ye that pass by?", 750],
    ["Behold, and see if there be any sorrow like unto my sorrow.", 1200],
  ],
};
