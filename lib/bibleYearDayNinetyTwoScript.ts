import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 92, written to the Day 1 standard.
 *
 * 2 Kings 18-21 pairs the best king this book has shown so far against the
 * worst: Hezekiah's reforms and trust survive an Assyrian siege by a
 * miracle, then his own pride hands Babylon a shopping list, and his son
 * Manasseh spends fifty-five years undoing almost everything. Seven blocks,
 * one per verse range within its own chapter.
 */

const kings2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "2 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 92,
  title: "Hezekiah's Faith and Manasseh's Evil",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 92. Judah finally gets a king this book can praise without a footnote.", 750],
    ["Hezekiah tears down what should have come down years ago, and then an empire shows up to test exactly how much he actually believes it.", 800],
    ["God answers with an angel, a sundial, and fifteen extra years.", 800],
    ["Then Hezekiah's own son takes the throne and spends fifty-five years undoing all of it.", 850],
    ["We are in 2 Kings 18 through 21.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings2(18, 1, 12, [
      "Hezekiah is the first king this book praises without a qualifier. None like him among all the kings of Judah, before him or after, because he clave to the Lord and kept the commandments Moses gave.",
      "He tears down the high places every king before him tolerated, and then does something nobody expected. He smashes the bronze serpent Moses made in the wilderness, because by now Israel is burning incense to it. A relic of God's own old mercy had quietly become an idol, and Hezekiah names it what it is. Nehushtan. A piece of brass.",
      "He rebels against Assyria outright, refuses tribute, and the text says plainly the Lord was with him and he prospered wherever he went.",
      "Then, almost as a warning label, the chapter reruns Samaria's fall in miniature. They obeyed not the voice of the Lord, but transgressed his covenant. Judah just watched its sister kingdom disappear for exactly the sin Hezekiah is now refusing to repeat.",
    ]),
    kings2(18, 13, 37, [
      "Sennacherib overruns Judah's fortified cities, and Hezekiah tries what Ahaz once tried. I have offended, return from me. He strips the temple gold, even peeling it off the doors, to buy Assyria off.",
      "It does not buy peace. Assyria sends a massive delegation to Jerusalem anyway, and their spokesman Rabshakeh does not attack the wall. He attacks Hezekiah's God, standing where the whole city can hear him.",
      "What confidence is this wherein thou trustest, he asks, then answers it himself, calling Egypt a bruised reed that pierces the hand of whoever leans on it, and naming off every god of every nation Assyria has already beaten.",
      "Hezekiah's officials beg Rabshakeh to speak Aramaic so the people on the wall will not understand. He refuses on purpose, shouting in the Jews' language instead. The king had ordered silence, answer him not, because the only weapon Jerusalem has left is not talking back.",
    ]),
    kings2(19, 1, 19, [
      "Hezekiah does not answer Rabshakeh with a speech. He tears his clothes, puts on sackcloth, and goes straight to the temple, then sends for the prophet Isaiah. This day of trouble, he says, is like a woman with no strength left to give birth.",
      "Isaiah's first answer is short. Be not afraid. God has heard the blasphemy, and Assyria will hear a rumor and go home to die by the sword. A word, not yet an explanation.",
      "Sennacherib does not let up. He sends a letter repeating the same taunt in writing. Hezekiah does something remarkable with a piece of hate mail. He carries it into the temple and spreads it open before the Lord, like handing God the evidence.",
      "Then he prays, and the center of it is not save me, it is for your name. Save us, that all the kingdoms of the earth may know that thou art the Lord God, even thou only. The city's survival becomes proof of who God actually is.",
    ]),
    kings2(19, 20, 37, [
      "Isaiah answers with a poem instead of a report. The virgin daughter of Zion hath despised thee, and laughed thee to scorn. Sennacherib, terror of nations, gets mocked back by a besieged little city, because the whole time he has been reproaching the Holy One of Israel, not just Judah.",
      "God speaks directly to the boasting He overheard. I know thy rage against me. I will put my hook in thy nose, my bridle in thy lips, and turn thee back the way thou camest. The image is a captured animal, not a defeated general.",
      "That night the angel of the Lord goes out and strikes a hundred eighty-five thousand men in the Assyrian camp. In the morning it is all dead corpses. No battle. No siege engine ever touches the wall.",
      "Sennacherib packs up what is left and goes home. Then, worshipping his own god Nisroch in his own temple, his own sons murder him with the sword. The empire that mocked every god of every nation loses its king inside the one house he thought was safe.",
    ]),
    kings2(20, 1, 11, [
      "Hezekiah gets sick to death, and Isaiah tells him plainly. Set thine house in order, for thou shalt die, and not live. Instead of accepting it quietly, he turns his face to the wall and weeps, reminding God how he has walked before Him in truth and with a perfect heart.",
      "Before Isaiah is even out of the middle courtyard, God sends him back with a reversal. I have heard thy prayer, I have seen thy tears. I will heal thee, and add unto thy days fifteen years.",
      "Hezekiah asks for a sign, and gets one nobody could stage. The shadow on Ahaz's sundial moves backward ten steps. Whatever else is true about this king, God keeps meeting his fear with something he can actually see.",
      "Fifteen extra years, granted after tears at a wall. It is worth watching what he does with them in the very next scene.",
    ]),
    kings2(20, 12, 21, [
      "Envoys from Babylon arrive with gifts because they heard Hezekiah had been sick, and instead of pointing them to the God who healed him, he gives them a tour. The silver, the gold, the spices, the armory. There is nothing in his house that Hezekiah does not show them.",
      "Isaiah asks two questions afterward. What did they see, and where did they come from. Both of Hezekiah's answers amount to the same thing. Everything, and it does not matter, they are far away.",
      "Isaiah's verdict lands hard. Everything you just showed off will be carried to Babylon. Nothing shall be left, saith the Lord. And your own sons will be eunuchs in a foreign king's palace.",
      "Hezekiah's reply is almost unbelievable for a man who wept and prayed for his own life one chapter ago. Good is the word of the Lord. Is it not good, if peace and truth be in my days. Fifteen extra years bought a comfortable ending for himself and a hard one for the family he will not be around to see.",
    ]),
    kings2(21, 1, 26, [
      "Manasseh becomes king at twelve and spends fifty-five years undoing everything his father built. He rebuilds every high place Hezekiah tore down, raises altars to Baal, worships the whole host of heaven, and, worse than any king yet, builds altars to them inside the Lord's own temple, the house God had named for Himself forever.",
      "He makes his own son pass through the fire, just like Ahaz before him, and adds sorcery, divination, and mediums on top. Scripture's final word on him is the starkest yet. He shed innocent blood very much, till he had filled Jerusalem from one end to another.",
      "God answers through the prophets with a sentence this time, not a warning. I will stretch over Jerusalem the same measuring line used on Samaria, the same plumb line used on Ahab's house, and wipe it as a man wipeth a dish, wiping it, and turning it upside down. What fell on the north in yesterday's reading is now scheduled for the south.",
      "Manasseh dies after the longest reign in Judah's history, and his son Amon does the same evil for two years before his own servants murder him in his own house. The people execute the conspirators and crown his son Josiah instead, a child stepping onto the throne his grandfather spent fifty-five years wrecking.",
    ]),
  ],
  closing: [
    ["So that is Day 92.", 700],
    ["Hezekiah trusts God like no king before or after him, and it gets tested by an army that mocks the Lord to His own people's faces.", 800],
    ["A hundred eighty-five thousand men die in one night without a single arrow fired at Jerusalem's wall.", 800],
    ["Then Hezekiah gets fifteen bonus years, and spends part of them showing Babylon's messengers exactly what to come back for later.", 850],
    ["His son Manasseh takes fifty-five years to erase almost everything Hezekiah did, right down to putting foreign altars inside God's own temple.", 850],
    ["The same sentence that fell on Israel in yesterday's reading gets pronounced on Judah today. It just has not landed yet.", 850],
    ["Tomorrow, 2 Kings 22 through 25. A forgotten scroll turns up in the temple, and it changes everything, right before the end finally comes.", 850],
    ["For now, hold both halves of this king together.", 800],
    ["The man who prayed with a letter spread out before God.", 750],
    ["And the man who showed a foreign empire exactly where his treasure was kept.", 1200],
  ],
};
