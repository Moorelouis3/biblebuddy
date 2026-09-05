import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 111, written to the Day 1 standard.
 *
 * Ezra 4-7 spans decades and three kings in four chapters: opposition stalls
 * the temple for years, Darius unexpectedly becomes its guarantor, the house
 * gets finished and dedicated, and Ezra himself finally arrives with royal
 * authority to teach the Law. Six blocks, matching Day 110.
 */

const ezra = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezra ${chapter}:${startVerse}-${endVerse}`,
  book: "ezra",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_ELEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 111,
  title: "Opposition and Renewed Teaching",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 111. The building stalls today, for years.", 750],
    ["Neighbors offer to help, get turned down, and then spend the next few decades finding new ways to shut the project down instead.", 800],
    ["Letters go back and forth between three different kings before another stone moves.", 800],
    ["And then, of all people, a Persian emperor becomes the reason the temple actually gets finished.", 850],
    ["We are in Ezra 4 through 7.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ezra(4, 1, 5, [
      "The adversaries of Judah and Benjamin hear the temple is going up, and they come to Zerubbabel with an offer. Let us build with you, they say. We seek your God the same as you do.",
      "Zerubbabel and the leaders turn them down flat. You have nothing to do with us to build a house unto our God. Cyrus gave this job to Israel alone, and they hold that line even when saying no makes enemies.",
      "So the offer becomes something else. The people of the land weaken the hands of the people of Judah, trouble them in building, and hire counsellors against them.",
      "This drags on through the rest of Cyrus's reign and into the reign of Darius. Real opposition here is not one bad afternoon. It is years of steady pressure, built to wear people down instead of stopping them outright.",
    ]),
    ezra(4, 6, 24, [
      "Verses 6 through 23 jump the story forward on purpose, past Cyrus to two later kings, Ahasuerus and Artaxerxes, and to a different project: the city and its walls, not the temple.",
      "Officials named Rehum and Shimshai write to Artaxerxes calling Jerusalem 'the rebellious and the bad city,' warning that if it gets rebuilt, the king will lose the whole province beyond the river.",
      "Artaxerxes checks the records, agrees Jerusalem has a history of revolt, and orders the work stopped by force and power until he says otherwise. Rehum rushes to Jerusalem and does exactly that.",
      "Then verse 24 snaps back to where verse 5 left off. Then ceased the work of the house of God. Same opposition, different kings, decades apart. It never really left. It just changed its paperwork.",
    ]),
    ezra(5, 1, 17, [
      "Two prophets show up, Haggai and Zechariah, and they prophesy in the name of the God of Israel. Zerubbabel and Jeshua get up and start building again, with the prophets right there helping them.",
      "Tatnai, governor of the province beyond the river, comes and asks the obvious question. Who commanded you to build this house?",
      "But he does not shut them down. Verse 5 says the eye of their God was upon the elders of the Jews, so the work continues while a letter goes to Darius instead.",
      "That letter is strikingly fair. Tatnai reports exactly what the Jews told him, that Cyrus himself decreed this house be built, and simply asks Darius to check the record. He is not hostile. He is just doing his job.",
    ]),
    ezra(6, 1, 12, [
      "Darius orders a search, and the decree turns up not in Babylon but in the fortress at Achmetha, in the province of the Medes. A promise made under one empire survives into the files of the next one.",
      "The decree is restated in full: the house shall be built, its dimensions given, and the cost paid out of the king's own revenue.",
      "Then Darius goes further than Cyrus did. He orders the Jews' expenses paid promptly from the king's tribute, and whatever they need for offerings supplied day by day, so they can pray for the life of the king and his sons.",
      "And he sets the penalty for interfering: a beam pulled from the offender's own house, and he hanged on it, his house made a dunghill. The king who could have crushed this project becomes its guarantor instead.",
    ]),
    ezra(6, 13, 22, [
      "Tatnai and Shethar-boznai do exactly as Darius commanded, and do it speedily. The elders build and prosper through the prophesying of Haggai and Zechariah, and the house is finished on the third day of the month Adar, in the sixth year of King Darius.",
      "The dedication is enormous. A hundred bullocks, two hundred rams, four hundred lambs, and twelve goats for a sin offering, one for every tribe of Israel, even though most of those tribes never came home from exile.",
      "Then they keep the Passover. The priests and Levites purify themselves together, all of them, and kill the lamb for the returned exiles and for everyone who separated themselves from the filthiness of the nations to seek the Lord.",
      "Verse 22 says the Lord made them joyful, and turned the heart of the king of Assyria toward them to strengthen their hands. An older empire's name gets used for a Persian king here, because the point is not which empire it technically was. It is that God can turn any throne.",
    ]),
    ezra(7, 1, 28, [
      "The story jumps decades ahead again, to the seventh year of Artaxerxes, and finally introduces Ezra: a scribe ready in the law of Moses, traced all the way back to Aaron the high priest.",
      "Verse 10 is the hinge of his whole life. Ezra had prepared his heart to seek the law of the Lord, and to do it, and to teach in Israel statutes and judgments. Seek it, do it, then teach it. In that order.",
      "Artaxerxes hands him sweeping authority: gold and silver for the temple, freewill offerings from the whole province, power to appoint judges and magistrates, and instructions to teach the law to anyone who does not already know it.",
      "Ezra's own response closes the chapter. Blessed be the Lord God of our fathers, which hath put such a thing as this in the king's heart. Then: I was strengthened, as the hand of the Lord my God was upon me. He credits the king's generosity to God before he takes any credit himself.",
    ]),
  ],
  closing: [
    ["So that is Day 111.", 700],
    ["Neighbors who offered to help, then spent decades trying to stop the work instead. Letters to three different kings before anyone laid another stone.", 800],
    ["And then Darius, of all people, ends up enforcing the build, paying for it from his own treasury, and threatening to hang anyone who interferes with it.", 850],
    ["The temple that looked permanently stalled gets finished on a specific day, in a specific year, exactly the way Cyrus and God both said it would.", 800],
    ["Then Ezra finally arrives, decades later, with one order set for his whole life: seek the law, do it, then teach it.", 800],
    ["Delay is not the same thing as defeat. Ezra 4 through 6 makes you sit through that the hard way.", 800],
    ["Tomorrow, Ezra 8 through 10, and Nehemiah 1. A dangerous river crossing, and a prayer that starts the next rebuilding.", 850],
    ["For now, hold on to one line.", 750],
    ["Ezra prepared his heart to seek the law, and to do it, and to teach it.", 800],
    ["In that order.", 1200],
  ],
};
