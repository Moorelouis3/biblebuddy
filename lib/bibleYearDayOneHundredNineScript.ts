import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 109, written to the Day 1 standard.
 *
 * 2 Chronicles 32-35 carries three kings back to back: Hezekiah survives
 * Sennacherib and then nearly loses himself to pride, Manasseh becomes the
 * worst king Judah has and repents in chains anyway, and Josiah finds a lost
 * book and rebuilds a covenant around it before walking into an arrow he was
 * warned about by name. Seven blocks, covering all four chapters in order.
 */

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 109,
  title: "Hezekiah, Manasseh, and Josiah",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 109. Three kings today, and they could not be more different from each other.", 750],
    ["Hezekiah stares down the biggest army of his life and gets rescued, then almost blows it with pride the moment the danger passes.", 800],
    ["His son Manasseh becomes the worst king Judah ever has, gets dragged to Babylon in chains, and repents anyway.", 800],
    ["And his grandson Josiah finds a lost book in a dusty temple and rebuilds a whole nation around it.", 850],
    ["One family. Three completely different responses to God.", 900],
    ["We are in 2 Chronicles 32 through 35.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron2(32, 1, 15, [
      "Sennacherib brings the biggest army Judah has faced, and Hezekiah's first move is not a speech. He stops every spring outside the city, rebuilds the wall, and arms the people. Faith and preparation are not opposites here.",
      "Only then does he speak. With Assyria is an arm of flesh. With us is the Lord our God, to help us and to fight our battles.",
      "So Sennacherib's officers shout under the wall in Hebrew instead, aiming one ugly question straight at the people. Why should your God be different from every god we have already crushed.",
      "That question finds you too, whenever something bigger than you camps outside your door. Whereon do you trust. Worth answering before the shouting starts.",
    ]),
    chron2(32, 16, 33, [
      "Hezekiah and Isaiah pray and cry out to heaven. In one night, an angel wipes out the Assyrian camp. Sennacherib goes home in disgrace and is murdered by his own sons in the house of his own god.",
      "Then Hezekiah gets sick to death, prays, and God grants more years and a sign. And the rescue almost undoes him faster than the siege did. His heart lifts with pride, until wrath is already headed for the city over it.",
      "He humbles himself in time, so it holds off. Even his tunnel, the one still running water into the city today, gets one flat line. Hezekiah prospered in all his works.",
      "But watch verse 31. When Babylon's ambassadors come asking about a miracle, God steps back and leaves him to it, just to see what is in his heart. Surviving the siege was easier than surviving the compliment.",
    ]),
    chron2(33, 1, 13, [
      "Manasseh is twelve when he takes the throne, and he becomes the worst king Judah will have. He rebuilds every high place his father tore down, puts a foreign altar inside the temple, and burns his own children as offerings.",
      "God speaks to him and the people directly, and they will not listen. So God sends Assyrian officers who take Manasseh with hooks, bind him in bronze chains, and drag him to Babylon.",
      "And there, in chains, Manasseh finally prays. The worst behavior in the book meets an actual answer. God hears him and brings him home to his own throne.",
      "Then Manasseh knew that the Lord, he was God. Thirteen verses of the ugliest choices in Judah's history, and God still leaves the door open at the bottom of it.",
    ]),
    chron2(33, 14, 25, [
      "Manasseh does not just go back to his old life. He tears the idol out of God's house himself, rebuilds the altar, and tells the nation to serve God again. Real repentance rebuilt something.",
      "But repentance is not inherited. Chronicles gives you the one line that separates father from son. Amon trespassed more, and humbled not himself, as Manasseh his father had humbled himself.",
      "Same sins, same palace. One generation learns it the hard way and turns. The next watches the turning happen and walks the old road anyway.",
      "Amon's own servants kill him within two years, and it is the ordinary people of the land, not the palace, who put the next king on the throne. His name is Josiah. He is eight years old.",
    ]),
    chron2(34, 1, 18, [
      "Josiah becomes king at eight. At sixteen he starts seeking God for himself. At twenty he starts tearing down every idol in the land, clear up into territory that used to be the northern kingdom.",
      "By eighteen years in, he has spent a decade purging the country before he even starts repairing the temple building. Reform came before renovation.",
      "And in the middle of that ordinary construction project, just collecting money to pay workmen, Hilkiah the priest finds a book. The Law of the Lord, given by Moses, lost inside God's own house.",
      "Nobody was looking for Scripture that day. They were looking for lumber and stone. What changes everything can show up while you're doing the unrelated, faithful thing in front of you.",
    ]),
    chron2(34, 19, 33, [
      "Josiah hears the book read, maybe for the first time in his life, and tears his own clothes. Not because someone else sinned. Because he sees how far the nation has drifted from what is written.",
      "He sends for a word from God, and it goes to Huldah the prophetess. Her answer runs both ways. The judgment is still coming. The nation broke this long ago, and that does not simply unbreak.",
      "But she adds something just for Josiah. Because your heart was tender, and you humbled yourself, you will not live to see it. God draws a line around one honest response even while the consequence keeps moving.",
      "So Josiah reads the whole book to the nation and makes a public covenant with all his heart and soul. He cannot undo the judgment coming. He can decide what he does with the years he has left.",
    ]),
    chron2(35, 1, 27, [
      "Josiah throws the biggest Passover since the prophet Samuel, funded out of his own pocket. Thirty thousand lambs and goats, three thousand bulls, just from the king.",
      "Years later, Necho of Egypt marches through toward somewhere else and actually sends word first. I am not coming against you. God told me to hurry. Leave me alone.",
      "Josiah does not listen. He disguises himself, fights anyway at Megiddo, and archers shoot him. He dies on the road home.",
      "The king who found the book and rebuilt a covenant with his whole heart still walked into an arrow he was warned about by name. Knowing the right thing and doing it are not always the same day's work.",
    ]),
  ],
  closing: [
    ["So that is Day 109.", 700],
    ["A miracle at the wall, a tyrant in chains who prayed anyway, and a king who found a book and rebuilt a nation around it.", 750],
    ["Watch how differently pride shows up here. Hezekiah survives an army and nearly loses himself to a compliment. Manasseh survives nothing on his own and only turns once he has lost everything.", 850],
    ["Amon watched his own father's whole story and still chose the old way. Every generation has to humble itself. Watching someone else do it is not the same thing.", 850],
    ["And Josiah spent his best years digging a nation out of a hole he did not dig, then walked straight into an arrow God warned him about by name.", 850],
    ["None of these three men get a clean ending. All three still mattered.", 800],
    ["Tomorrow, 2 Chronicles 36 and Ezra 1 through 3. The kingdom finally falls, and seventy years later, the exiles go home and start over.", 850],
    ["For now, hold on to Manasseh's chains.", 800],
    ["God heard him in Babylon before anyone heard him in Jerusalem.", 750],
    ["It is never too late, and it is never too far.", 1200],
  ],
};
