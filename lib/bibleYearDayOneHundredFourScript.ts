import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 104, written to the Day 1 standard.
 *
 * 2 Chronicles 12-15 runs four kings' worth of the same test: what a man
 * does the moment the pressure comes off, or comes down. Rehoboam fails it,
 * Abijah passes it once under fire, and Asa builds a whole reign on it. Six
 * blocks, following the chapter breaks.
 */

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 104,
  title: "Kings, Reform, and Returning to God",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 104. Four kings, four chapters, and the same question keeps landing on each one.", 750],
    ["What do you do the moment the pressure is finally off?", 850],
    ["Rehoboam gets his kingdom established and forgets God within a verse. Egypt invades before the ink is dry.", 800],
    ["His son Abijah goes to war outnumbered two to one and remembers God just in time to win.", 800],
    ["And Asa tears down every idol he can find, then faces a million-man army with nothing in his hand but a prayer.", 850],
    ["We are in 2 Chronicles 12 through 15.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron2(12, 1, 12, [
      "Rehoboam finally gets his kingdom established and strong, and the very next line says he forsook the law of the Lord, and all Israel with him. Stability turns out to be more dangerous to him than the split ever was.",
      "In his fifth year, Shishak king of Egypt marches in with twelve hundred chariots, sixty thousand horsemen, and more soldiers than anyone bothers to count. He takes every fenced city in Judah before he even reaches Jerusalem.",
      "Shemaiah the prophet does not soften it. Thus saith the Lord, ye have forsaken me, and therefore have I also left you in the hand of Shishak. So the princes and the king humble themselves and say simply, the Lord is righteous.",
      "That is all it takes for God to change course. Not full deliverance - they will still serve Shishak, still lose the temple treasures and Solomon's gold shields - but the wrath does not finish them. My wrath shall not be poured out upon Jerusalem.",
    ]),
    chron2(12, 13, 16, [
      "Rehoboam replaces the gold shields Solomon made with brass ones, and has the guard carry them out and back in every time the king enters the temple. The shine is gone, but the ceremony keeps going through the motions.",
      "Chronicles gives Rehoboam one line as a verdict on his whole seventeen-year reign. He did evil, because he prepared not his heart to seek the Lord. Not because wisdom was never near him - Solomon was his father - but because he never actually decided to seek God for himself.",
      "There were wars between Rehoboam and Jeroboam continually. Even after Shishak, even after the humbling, the two kingdoms he split apart never stop bleeding into each other.",
      "He dies, buried in the city of David, and his son Abijah takes the throne. The war with the north is the one thing that gets passed down along with the crown.",
    ]),
    chron2(13, 1, 12, [
      "Abijah takes the field against Jeroboam with four hundred thousand men. Jeroboam brings eight hundred thousand. Before a sword is drawn, Abijah stands on a mountain and just talks.",
      "He reminds Jeroboam what he is actually fighting. The Lord God of Israel gave the kingdom to David and his sons forever, by a covenant of salt. Jeroboam's rebellion is not a political dispute. It is a fight against a promise God made.",
      "Then he names what Jeroboam built instead. Golden calves for gods, priests who are not even sons of Aaron, ordained with nothing more than a young bull and seven rams. Anyone off the street can buy the job.",
      "Abijah is not a good king by most measures - Chronicles later calls his heart divided - but here, standing outnumbered two to one, he says the one true thing. God himself is with us for our captain. Fight not against the Lord, for ye shall not prosper.",
    ]),
    chron2(13, 13, 22, [
      "While Abijah is still talking, Jeroboam sends an ambush around behind Judah's army. Judah turns and finds the battle in front of them and behind them at once, surrounded, and outnumbered before that.",
      "They do not have a clever countermove. They cry unto the Lord, and the priests sound the trumpets, and the men of Judah shout. And God strikes Jeroboam and all Israel before Abijah's eyes.",
      "Five hundred thousand of Israel's chosen men fall in a single day. Chronicles is blunt about why Judah won. They relied upon the Lord God of their fathers. Not better strategy. Reliance.",
      "Jeroboam never recovers his strength in Abijah's lifetime, and the Lord struck him, and he died. The man who tore the kingdom in two back in chapter ten is finished off two chapters later, and the text does not spend a single verse mourning him.",
    ]),
    chron2(14, 1, 15, [
      "Asa becomes king, and the land is quiet for ten years. He uses the quiet to tear things down: the altars of strange gods, the high places, the images, the Asherah groves, and he tells Judah plainly to seek the Lord and keep the law.",
      "He builds fenced cities while there is peace to build them in, and says exactly why. Because we have sought the Lord our God, he hath given us rest on every side. Rest is not luck to Asa. It is a result.",
      "Then Zerah the Ethiopian comes against him with a million men and three hundred chariots. Asa's whole army together is barely more than half that. He does not pretend the numbers are close.",
      "He cries out instead. Lord, it is nothing with thee to help, whether with many, or with them that have no power. Help us, for we rest on thee, and in thy name we go against this multitude. Let not man prevail against thee. And the Lord strikes the Ethiopians down before him.",
    ]),
    chron2(15, 1, 19, [
      "A prophet named Azariah meets Asa on his way home from the battle and hands him the whole principle in one line. The Lord is with you, while ye be with him. If ye seek him, he will be found of you. If ye forsake him, he will forsake you.",
      "Asa takes courage from it and goes further than before, clearing idols out of every city he has taken, renewing the altar, and calling the whole nation to Jerusalem to enter into a covenant to seek the Lord with all their heart and all their soul.",
      "They swear it with a loud voice, with shouting, trumpets, and cornets. Chronicles says the whole nation rejoiced at the oath, because they had sought him with their whole desire, and he was found of them.",
      "Asa even removes his own grandmother Maachah from her place as queen mother because she made an idol, and burns the thing himself at the brook Kidron. Chronicles does not pretend Asa was flawless - the high places stayed in Israel - but it says the heart of Asa was perfect all his days. Not sinless. Undivided.",
    ]),
  ],
  closing: [
    ["So that is Day 104.", 700],
    ["Rehoboam forgets God the moment life gets easy, and Egypt walks through his cities to remind him.", 750],
    ["Abijah stands surrounded on two sides and wins the moment Judah cries out instead of panicking.", 800],
    ["And Asa spends ten quiet years tearing down idols, then meets a million-man army with one sentence. Lord, it is nothing with thee to help, whether with many, or with them that have no power.", 850],
    ["Every king in these four chapters gets tested by the exact thing he was not ready for. Comfort tests Rehoboam. Numbers test Abijah. An army tests Asa. Only one of them fails it.", 850],
    ["Tomorrow, 2 Chronicles 16 through 19. Asa's story keeps going, and it does not end as well as it starts.", 850],
    ["For now, hold on to Azariah's word to Asa.", 800],
    ["The Lord is with you, while ye be with him.", 800],
    ["If ye seek him, he will be found of you.", 1200],
  ],
};
