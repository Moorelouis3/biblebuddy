import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 232, written to the Day 1 standard.
 *
 * Jeremiah 43-45: the remnant accuses Jeremiah of lying, drags him and Baruch
 * to Egypt anyway, and God follows them there with a sign of Babylon's coming
 * throne and a direct rebuke of the idolatry they brought with them. The
 * people answer to his face that they will not obey. Then, tucked at the very
 * end, one short private word to Baruch, written decades earlier, about a man
 * who wanted something for himself in the middle of the collapse and was told
 * no. Six blocks across three chapters (48 verses), no gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 232,
  title: "Egypt, Warning, and Baruch",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 232. They asked for a word and got one they did not want.", 750],
    ["So now they call Jeremiah a liar, blame it on his scribe, and go to Egypt anyway.", 800],
    ["God does not let them go quietly. He follows them there.", 800],
    ["And near the end, we hear from someone we have not heard from directly this whole book. The man who wrote it all down.", 850],
    ["We are in Jeremiah 43, 44, and 45.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(43, 1, 7, [
      "The moment Jeremiah finishes speaking, Azariah and Johanan and the proud men turn on him. Thou speakest falsely: the LORD our God hath not sent thee.",
      "Then they name the real target. Baruch the son of Neriah setteth thee on against us. It is easier to accuse the scribe of a conspiracy than to believe the prophet meant what he said.",
      "So they take the whole remnant, the very people God had just promised to build up if they stayed, and march them down into Egypt anyway. They obeyed not the voice of the LORD.",
      "Jeremiah and Baruch do not get a vote. They are carried along with everyone else, into the exact place they were warned would kill them.",
    ]),
    g(43, 8, 13, [
      "In Egypt, God gives Jeremiah one more sign to perform in front of the very men who dragged him there. Take great stones, and hide them in the clay at the entry of Pharaoh's house, where they can watch him do it.",
      "Then the meaning. Nebuchadrezzar my servant is coming, and he will set his throne on these very stones.",
      "God calls the king of Babylon my servant here. Not because Babylon is righteous, but because even the empire they ran to escape is still working for God's purposes, whether it knows it or not.",
      "He shall array himself with the land of Egypt, as a shepherd putteth on his garment. Egypt looked like the safe place. It was never going to be one.",
    ]),
    g(44, 1, 14, [
      "God speaks to the whole colony of Jews now scattered across Egypt, and He starts by pointing at Jerusalem's ruins, still smoking behind them. Ye have seen all the evil that I have brought upon Jerusalem.",
      "He rehearses exactly why. They burned incense to other gods despite prophet after prophet sent rising early to stop them. Oh, do not this abominable thing that I hate.",
      "And here is the part that should stop them cold. They are doing the same thing in Egypt that got Jerusalem burned. Burning incense unto other gods in the land of Egypt, whither ye be gone to dwell.",
      "So the verdict follows them across the border. I will set my face against you for evil. Egypt was never an escape from the sin. It was where they kept committing it.",
    ]),
    g(44, 15, 19, [
      "And here is the most honest, most chilling answer in the whole book. Every man who knew his wife burned incense, and a great crowd of women besides, answer Jeremiah to his face.",
      "As for the word that thou hast spoken unto us in the name of the LORD, we will not hearken unto thee. Not silence. Not excuses. A flat refusal, spoken directly to the prophet.",
      "Then they explain themselves. We will certainly do whatsoever thing goeth forth out of our own mouth, to burn incense to the queen of heaven. When we did that, we had plenty of victuals, and were well, and saw no evil.",
      "They have the whole disaster backwards. The years of comfort were not proof God's rivals were working. They were patience running out.",
    ]),
    g(44, 20, 30, [
      "Jeremiah answers the thing they actually said. Did not the LORD remember the incense you burned in Jerusalem, and did it not come into his mind? The famine and the fall were the answer, not silence.",
      "So he says it plainly. Ye will surely accomplish your vows, since that is what you have decided. Then he gives them a vow back from God. I have sworn by my great name that my name shall no more be named in the mouth of any man of Judah in all the land of Egypt.",
      "Behold, I will watch over them for evil, and not for good. The very sentence once spoken in blessing over this people, turned around and spoken over them in judgment, because they turned it around first.",
      "Then one sign, aimed at a king, so they cannot say later that no one warned them. I will give Pharaoh-hophra king of Egypt into the hand of his enemies, just as I gave Zedekiah into Nebuchadrezzar's hand. Watch what happens to the king you ran to for safety.",
    ]),
    g(45, 1, 5, [
      "Now the book steps back decades, to the fourth year of Jehoiakim, long before any of this happened, to a private word Jeremiah once gave to Baruch, the same scribe just blamed for the whole disaster.",
      "Baruch had said it out loud once. Woe is me now! For the LORD hath added grief to my sorrow. I fainted in my sighing, and I find no rest. Writing down forty years of judgment for a nation that hates you will do that.",
      "God's answer is not comfort first. That which I have built will I break down, and that which I have planted I will pluck up, even this whole land. And then, straight at him: seekest thou great things for thyself? Seek them not.",
      "But thy life will I give unto thee for a prey in all places whither thou goest. Not greatness. Survival. For the man who stayed faithful to an unpopular word his whole life, that turns out to be enough.",
    ]),
  ],
  closing: [
    ["So that is Day 232.", 700],
    ["A remnant that called the prophet a liar, blamed his scribe, and marched into Egypt anyway.", 800],
    ["And God did not let the border stop Him. The same sin, the same warning, the same coming sword, followed them there.", 800],
    ["The most honest line in the whole book. We will not hearken unto thee. Said straight to his face, not behind his back.", 850],
    ["And then, quietly, a much older word to Baruch. Do not seek great things for yourself. Just live.", 800],
    ["A man who never got to see the ending he wanted, told that staying faithful would be enough.", 800],
    ["Tomorrow, Jeremiah 46 through 48. The prophet turns from Judah to the nations around it.", 850],
    ["For now, sit with what God told the man who wrote all this down.", 800],
    ["Seekest thou great things for thyself? Seek them not.", 750],
    ["Your life will be given to you. That was the whole promise.", 1200],
  ],
};
