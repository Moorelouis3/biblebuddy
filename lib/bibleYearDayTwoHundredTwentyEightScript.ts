import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 228, written to the Day 1 standard.
 *
 * Jeremiah 31-33: the new covenant gets promised in the middle of the same
 * book that has spent chapters on judgment; Jeremiah, imprisoned during the
 * siege, buys a field he may never see because God told him to; and the
 * Branch of righteousness and the covenant with David get pinned to day and
 * night themselves. Seven blocks across three chapters (110 verses), no
 * gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 228,
  title: "New Covenant and Future Hope",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 228. Yesterday ended with a promise. Today it actually gets spoken.", 750],
    ["Jeremiah is under siege, locked in the palace court for saying the truth out loud, and in the middle of that he buys a field he may never see.", 800],
    ["Then comes the line the rest of the Bible keeps returning to. A new covenant, written on the heart instead of stone.", 800],
    ["And underneath it, a promise tied to David's throne that God says can only break if day and night stop trading places.", 850],
    ["We are in Jeremiah 31, 32, and 33.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(31, 1, 20, [
      "After chapters of warning, Jeremiah gets a line this soft. I have loved thee with an everlasting love, therefore with lovingkindness have I drawn thee. That is not a new decision. It is the reason the rest of this book gets to end the way it does.",
      "The homecoming that follows is physical, not vague. The blind and the lame come home in the same caravan as a woman with child and one already in labor. Nobody gets left behind because the road is hard.",
      "Then a sound cuts straight through the good news. A voice heard in Ramah - the text names her Rachel - weeping for her children, refused to be comforted, because they are not. The promise does not skip past that grief to get to the ending.",
      "Right next to it, God answers his own question about a son he disciplined. Since I spake against him, I do earnestly remember him still. My bowels are troubled for him. I will surely have mercy upon him. The discipline never once turned into indifference.",
    ]),
    g(31, 21, 40, [
      "Then comes the line the whole rest of the Bible keeps circling back to. The days come, saith the LORD, that I will make a new covenant with the house of Israel and with the house of Judah. Not like the one they broke at Sinai.",
      "This one goes somewhere different. I will put my law in their inward parts, and write it in their hearts. Obedience stops being an assignment handed down and becomes something planted inside a person.",
      "And it comes with an ending nobody had heard yet. They shall all know me, from the least of them unto the greatest. I will forgive their iniquity, and I will remember their sin no more. Forgiven and forgotten in the same sentence.",
      "God backs the whole promise with the sun, moon, and stars. If those ordinances ever depart, saith the LORD, then Israel shall cease from being a nation before me. They have not departed. Neither has the promise.",
    ]),
    g(32, 1, 15, [
      "Babylon's army is camped outside the walls right now, and Jeremiah is locked in the court of the prison for telling Zedekiah the city will fall. In the middle of that, his cousin Hanameel shows up exactly as God said he would, offering to sell him a field in Anathoth.",
      "Buying land is normally a bet that the future is stable. Jeremiah buys this field while the army that will make it worthless is visibly camped outside the gate.",
      "He weighs out seventeen shekels of silver, signs the deed, seals it, gets witnesses, and does the whole ordinary transaction in front of everyone sitting in the prison court.",
      "Then he hands both copies to Baruch with one instruction. Put them in an earthen vessel, that they may continue many days. He is burying paperwork for a return he will not personally get to see soon.",
    ]),
    g(32, 16, 25, [
      "Only after he has already obeyed does Jeremiah start asking questions, and he asks them in prayer instead of out loud to anyone else. Ah Lord God, behold, thou hast made the heaven and the earth by thy great power, and there is nothing too hard for thee.",
      "He walks back through everything God has already proven. Signs and wonders in Egypt. A strong hand and a stretched out arm. A land flowing with milk and honey, given exactly as promised.",
      "Then the actual complaint surfaces, and it is not rebellious, just honest. They obeyed not thy voice, neither walked in thy law. Therefore thou hast caused all this evil to come upon them. He is not confused about why judgment is coming.",
      "His real question is smaller and sharper. Thou hast said unto me, buy thee the field for money, and take witnesses, for the city is given into the hand of the Chaldeans. He never resolves it himself. He hands it back to God unfinished.",
    ]),
    g(32, 26, 44, [
      "God's answer opens by picking up Jeremiah's own words and handing them back. Behold, I am the LORD, the God of all flesh. Is there any thing too hard for me? The prophet's question becomes the prophet's answer.",
      "God does not soften why the judgment is deserved. Sons and daughters were passed through the fire to Molech in the valley of Hinnom, a thing, he says plainly, which I commanded them not, neither came it into my mind.",
      "Then the promise lands on the exact ground Jeremiah just paid for. Fields shall be bought in this land, whereof ye say, it is desolate. Men shall buy fields for money, and subscribe evidences, and seal them, and take witnesses. The identical paperwork Jeremiah just did, promised back to everyone.",
      "It ends somewhere warmer than a legal contract. I will rejoice over them to do them good, and I will plant them in this land assuredly with my whole heart and with my whole soul. Not obligation. Joy.",
    ]),
    g(33, 1, 13, [
      "The word comes to Jeremiah a second time, still shut up in the same prison court. Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not. The invitation does not wait for the siege to lift first.",
      "The promise is not just safety. I will bring it health and cure, and I will cure them, and will reveal unto them the abundance of peace and truth. Something broken, named as broken, and healed anyway.",
      "Then a picture of the exact streets sitting empty right now. The voice of joy, and the voice of gladness, the voice of the bridegroom, and the voice of the bride, for his mercy endureth for ever. A wedding, in the same city currently under siege.",
      "It ends on something almost plain. The flocks shall pass again under the hands of him that telleth them. After all the judgment language, restoration looks like a shepherd counting sheep.",
    ]),
    g(33, 14, 26, [
      "God says he will perform the good thing he promised, and names it. I will cause the Branch of righteousness to grow up unto David, and he shall execute judgment and righteousness in the land. The job David's line failed at gets a second name for it.",
      "The city itself gets renamed for the occasion. Jerusalem shall dwell safely, and this is the name wherewith she shall be called: The LORD our righteousness. Not the throne's righteousness. His.",
      "Then the guarantee gets pinned to something nobody can touch. If ye can break my covenant of the day, and my covenant of the night, then may also my covenant be broken with David my servant. Day and night have not stopped. Neither has this.",
      "This gets spoken exactly when people are saying the opposite out loud, that God has already cast off the two families for good. His answer is to multiply David's line like the host of heaven and the sand of the sea. Uncountable, on purpose, to the very people counting him out.",
    ]),
  ],
  closing: [
    ["So that is Day 228.", 700],
    ["A new covenant that does not depend on people remembering to obey it, because it gets written where they cannot lose it.", 800],
    ["A field bought in a city under siege, sealed and witnessed and buried in a jar, because someone was going to need the deed later.", 800],
    ["Jeremiah's own question - is there anything too hard for you? - handed back to him as God's answer.", 800],
    ["Streets that are silent right now, promised the sound of a wedding again.", 800],
    ["And a name for a city that used to carry nothing but warnings. The Lord our righteousness.", 850],
    ["Tomorrow, Jeremiah 34 through 36. Broken promises, and a scroll that gets burned and rewritten.", 850],
    ["For now, hold the shortest version of it.", 750],
    ["Write it on the heart.", 1200],
  ],
};
