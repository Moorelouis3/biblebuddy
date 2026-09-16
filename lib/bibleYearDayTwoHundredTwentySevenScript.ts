import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 227, written to the Day 1 standard.
 *
 * Jeremiah 28-30: Hananiah breaks Jeremiah's wooden yoke and promises a
 * two-year return, only to get an iron yoke and a death sentence in reply;
 * Jeremiah's letter tells the exiles to build houses and pray for Babylon
 * while three named false prophets are answered one by one; and the book
 * of consolation opens with the worst name yet for the trouble ("Jacob's
 * trouble") sitting inside the same verse as its rescue. Six blocks across
 * three chapters (73 verses), no gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 227,
  title: "False Hope and Promised Restoration",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 227. Another prophet stands up in the temple and says the opposite of everything Jeremiah has been saying.", 750],
    ["Hananiah breaks Jeremiah's wooden yoke in front of everyone and promises the exile ends in two years.", 800],
    ["Jeremiah wants him to be right. He is not.", 800],
    ["Then comes a letter to the exiles telling them to build houses in the very city that took them captive, and a book that finally turns toward hope.", 850],
    ["We are in Jeremiah 28, 29, and 30.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(28, 1, 11, [
      "Hananiah stands in the same temple courtyard, in front of the same priests and people, and says the exact opposite of what Jeremiah has been saying for weeks. Within two years, the yoke breaks. The vessels come home. Jeconiah comes home.",
      "Jeremiah's response is almost startling. Amen. The Lord do so. He does not want to be right about the coming disaster. He wants Hananiah's version to be true more than anyone else in the room.",
      "But he will not let hope override the test. Prophets before us prophesied war and evil against great kingdoms. A prophet who speaks of peace only gets proven right when the peace actually shows up.",
      "Hananiah does not argue back. He grabs the wooden yoke off Jeremiah's neck and snaps it in front of everyone. A visual answer to a visual sermon.",
    ]),
    g(28, 12, 17, [
      "God waits until after Hananiah has already broken the yoke to send Jeremiah back with the real answer. You have broken wood. You shall make iron yokes in place of them.",
      "The upgrade is the punishment. What was a temporary, breakable image becomes an unbreakable one. Hananiah's optimism did not soften anything. It hardened it.",
      "Then Jeremiah says the line that decides everything. The Lord has not sent thee, but thou makest this people to trust in a lie. Being sincere and being sent are not the same thing.",
      "Hananiah dies within the year, exactly as told, in the seventh month. The text does not gloat over it. It just lets the timeline prove the point his own broken yoke could not.",
    ]),
    g(29, 1, 14, [
      "Jeremiah writes a letter to the exiles already sitting in Babylon, and it is the opposite of what they want to hear. Build houses and live in them. Plant gardens and eat what they grow. Take wives. Have children.",
      "Then the line that must have landed hard. Seek the peace of the city where I have sent you, and pray to the Lord for it, for in its peace you shall have peace. Their captor's welfare is now tied to their own.",
      "He also gives them the number again. After seventy years are accomplished at Babylon, God will visit them and perform his good word to bring them home. Not vague someday. A real number, the same one from chapter 25.",
      "And underneath the waiting sits one of the most quoted lines in the whole book. I know the thoughts that I think toward you, thoughts of peace and not of evil, to give you an expected end. It was written to people told to unpack, not people about to leave.",
    ]),
    g(29, 15, 23, [
      "Some in Babylon were leaning on a comfortable rumor, that things are actually fine back home since Jerusalem still stands and a king still sits on David's throne. God answers that comfort directly. The sword, the famine, and the pestilence are coming for the ones who stayed.",
      "He calls them vile figs, the exact image from the two baskets back in chapter 24. Being left in the land was never the safer option, even though it looked that way from Babylon.",
      "Two named prophets in Babylon, Ahab and Zedekiah, have been prophesying lies to the exiles in God's name. God says Nebuchadnezzar himself will kill them in front of everyone.",
      "Their deaths become such a byword that people start using their names as a curse. The Lord make thee like Zedekiah and like Ahab, whom the king of Babylon roasted in the fire. A false prophet's punishment turns into someone else's swear word.",
    ]),
    g(29, 24, 32, [
      "A third voice enters. Shemaiah, writing letters from Babylon back to the priest in Jerusalem, demanding Jeremiah be locked up in stocks for daring to prophesy at all.",
      "The letter actually quotes Jeremiah's real words back as the accusation. This captivity is long. Build houses. Plant gardens. The truth itself is treated as the crime.",
      "The priest reads Shemaiah's letter straight to Jeremiah, expecting nothing to come of it. Instead God answers Shemaiah by name, the same way he answered Hananiah.",
      "Because he has taught rebellion against the Lord, his line will not survive to see the good God does for his people. Three false prophets across two chapters, three specific, personal sentences.",
    ]),
    g(30, 1, 24, [
      "The tone changes completely. God tells Jeremiah to write everything down in a book, because for the first time in a long stretch of this prophet's life, most of what follows is not a threat.",
      "He does not pretend the pain is small first. Thy bruise is incurable, and thy wound is grievous. There is none to plead thy cause. No healing medicines. This is not a pep talk that skips the wound.",
      "The phrase that names it is the time of Jacob's trouble, called worse than anything that came before it, yet the same verse adds, he shall be saved out of it. The worst point in the story is not the last word.",
      "Then the reversal comes, piece by piece. The yoke breaks for real this time. The city is built again on her own ruins. Ye shall be my people, and I will be your God. The same words Eden and Sinai both carried, spoken again after the worst has already happened.",
    ]),
  ],
  closing: [
    ["So that is Day 227.", 700],
    ["A prophet who wanted the good news to be true, and would not pretend it was anyway.", 800],
    ["Hananiah broke a wooden yoke and got handed an iron one. Wanting peace does not make it real.", 800],
    ["Then Babylon itself became the address God told his people to put down roots in. Build. Plant. Pray for the very city that took you captive.", 850],
    ["Three false voices across two chapters, Hananiah, Ahab and Zedekiah, Shemaiah, each answered by name, each ended by name.", 850],
    ["And underneath every warning in this whole book sat one line waiting its turn. Thoughts of peace, not evil, to give you an expected end.", 850],
    ["Then Jacob's trouble gets a worse name than anything before it, and a better ending than anything before it, in the same breath.", 850],
    ["Tomorrow, Jeremiah 31 through 33. A new covenant gets promised, written on hearts instead of stone.", 850],
    ["For now, hold the whole sentence.", 750],
    ["He shall be saved out of it.", 1200],
  ],
};
