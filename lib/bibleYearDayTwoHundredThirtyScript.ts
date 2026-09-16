import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 230, written to the Day 1 standard.
 *
 * Jeremiah 37-39: a false reprieve when Egypt's army draws the siege off for
 * a moment; Jeremiah beaten and jailed for trying to leave the city; a
 * second secret meeting with Zedekiah that ends with the king ignoring the
 * truth he asked for; a muddy dungeon and the foreign servant who pulls him
 * out of it; and then the city actually falls, exactly as told. Six blocks
 * across three chapters (67 verses), no gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 230,
  title: "Jerusalem Falls",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 230. Jeremiah tells the truth one more time, and it costs him almost everything.", 750],
    ["Egypt's army shows up, the siege lifts for a moment, and the whole city breathes — everyone except Jeremiah.", 800],
    ["He gets thrown in a mud pit for saying it won't last. Then Jerusalem falls exactly the way he said it would.", 800],
    ["One king loses his sons, his eyes, and his throne in a single night. One servant who showed Jeremiah kindness gets a promise no one else in this book gets.", 850],
    ["We are in Jeremiah 37, 38, and 39.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(37, 1, 10, [
      "Zedekiah is on the throne now, put there by the king of Babylon himself, in place of Jehoiachin. But neither he, nor his servants, nor the people of the land, listened to the word of the LORD by Jeremiah. Nothing about this king is new.",
      "Pharaoh's army marches out of Egypt, and when the Chaldeans surrounding Jerusalem hear about it, they pull back and lift the siege. For one moment, the whole city can breathe.",
      "Zedekiah sends men to ask Jeremiah to pray for them. He wants Jeremiah's access to God without doing anything Jeremiah has actually told him to do.",
      "Jeremiah's answer kills the relief in the room. Do not deceive yourselves. Pharaoh's army will go home to Egypt, and the Chaldeans will come back and burn this city. Even if you struck down their whole army and left only wounded men in their tents, those wounded men would still rise up and burn it.",
    ]),
    g(37, 11, 21, [
      "With the siege lifted, Jeremiah tries to walk out toward Benjamin to see to his own property among his own people. At the gate a captain named Irijah grabs him and says, Thou fallest away to the Chaldeans. Jeremiah tells him it is false. Irijah does not listen.",
      "The princes beat him and lock him in the house of Jonathan the scribe, turned into a prison. Jeremiah sits there many days, in a hole, for telling the truth in public.",
      "Then Zedekiah sends for him secretly and asks, Is there any word from the LORD? Jeremiah does not soften it. There is. Thou shalt be delivered into the hand of the king of Babylon. Then he turns the question back on the king. What have I done to you to deserve prison? Where are the prophets who told you Babylon would never come?",
      "Zedekiah does not free him, but he does move him — out of Jonathan's dungeon and into the court of the prison, with a piece of bread from the bakers' street every day, for as long as the city has bread left to give.",
    ]),
    g(38, 1, 13, [
      "Four officials hear Jeremiah telling the people plainly: stay in this city and you die by sword, famine, or plague; go out to the Chaldeans and you live, and keep your life as a prize. They go straight to the king and ask for him dead, saying he weakens the hands of the soldiers and everyone left in the city.",
      "Zedekiah's answer tells you everything about him. Behold, he is in your hand: for the king is not he that can do any thing against you. A king who cannot even protect the prophet standing in front of him.",
      "They lower Jeremiah by ropes into Malchiah's dungeon in the court of the prison. There is no water down there, only mire, and Jeremiah sinks into it.",
      "Ebedmelech, a Cushite official in the king's house, goes straight to Zedekiah and says Jeremiah will starve to death in that hole. He gets thirty men, lowers old rags for Jeremiah to pad his armpits so the ropes will not tear him, and pulls him out alive.",
    ]),
    g(38, 14, 28, [
      "Zedekiah calls for him again in secret and says, hide nothing from me. Jeremiah says what is true either way. If I tell you, you will kill me. If I counsel you, you will not listen. The king swears in secret that he will not kill him or hand him over — the same king who just let his own officials throw Jeremiah in a pit.",
      "Jeremiah gives him one last straight answer. Surrender to Babylon's officers and you live, and this city is not burned. Refuse, and it burns, and you will not escape their hand.",
      "Zedekiah's real fear comes out. He is afraid of what the Jews who already defected will do to him, not of what God is saying. Jeremiah tells him to just obey, and it will go well with him.",
      "He does not obey. He swears Jeremiah to silence, hands him a cover story for when the princes ask, and Jeremiah uses it word for word. The princes leave him alone. He sits in the court of the prison until the day the city falls.",
    ]),
    g(39, 1, 10, [
      "In the ninth year of Zedekiah, Nebuchadnezzar's whole army comes against Jerusalem. A year and a half later, the wall is finally broken through, and Babylon's princes walk in and sit down in the middle gate like the city already belongs to them. It does.",
      "Zedekiah and his soldiers run for it in the dark, out through the king's garden, between the two walls, toward the plain. The Chaldeans catch him in the plains of Jericho and drag him to Nebuchadnezzar at Riblah.",
      "There, Zedekiah watches his own sons killed in front of him. That is the last thing his eyes ever see. Then they put them out and take him to Babylon in chains.",
      "The city burns — the king's house, every house, the walls torn down. Most of the people are marched off to Babylon. The poorest, who had nothing to lose or steal, are the ones left behind with fields and vineyards of their own for the first time.",
    ]),
    g(39, 11, 18, [
      "Nebuchadnezzar, of all people, gives specific orders about Jeremiah. Take him, look well to him, do him no harm, do exactly as he asks. The prophet Judah imprisoned gets better treatment from the invading king than he ever got from his own.",
      "They pull him out of the court of the prison and hand him to Gedaliah to take home. After everything, he ends up free, walking among his own people again.",
      "And God has one more word, for one man only. Ebedmelech, the servant who pulled Jeremiah out of the mud, gets a direct promise. I will surely deliver thee, and thou shalt not fall by the sword.",
      "Why him. Because thou hast put thy trust in me, saith the LORD. Out of a burning city, one man's small act of kindness gets its own personal ending.",
    ]),
  ],
  closing: [
    ["So that is Day 230.", 700],
    ["Jerusalem falls exactly the way Jeremiah said it would, down to the muddy pit they threw him in for saying it.", 800],
    ["Zedekiah asked him for the truth twice, in secret, and got it both times — and obeyed neither.", 800],
    ["He lost his sons, his eyes, and his throne rather than lose face in front of his own officials.", 800],
    ["And the one person in this whole story who comes out with a personal promise from God is a foreign servant who risked his own neck to pull a prophet out of a hole.", 850],
    ["Tomorrow, Jeremiah 40 through 42. The remnant left in the land tries to figure out what to do next.", 850],
    ["For now, hold Ebedmelech's line.", 750],
    ["Thou hast put thy trust in me.", 800],
    ["That was the whole reason.", 1200],
  ],
};
