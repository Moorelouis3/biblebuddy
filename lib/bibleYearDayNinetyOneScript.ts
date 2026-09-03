import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 91, written to the Day 1 standard.
 *
 * 2 Kings 14-17 covers roughly two centuries in four chapters: Amaziah's
 * pride, Jeroboam II's undeserved expansion, a run of five assassinated
 * kings, Ahaz swapping the Lord's altar for a borrowed Assyrian design, and
 * finally Samaria's fall - the end of the northern kingdom, with the text's
 * own long explanation of why. Seven blocks, one per verse range within its
 * own chapter, since a block cannot cross a chapter boundary.
 */

const kings2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "2 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 91,
  title: "Israel Falls to Assyria",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 91. Two hundred years of the northern kingdom come to an end today.", 750],
    ["Kings fall so fast in these chapters you can barely track who is on the throne. Six of them die violently in just a few pages.", 800],
    ["Then Assyria stops taking tribute and starts taking land. And then it takes the whole thing.", 800],
    ["In the middle of it, one king in Judah swaps out the Lord's altar for a design he liked better on a trip.", 850],
    ["We are in 2 Kings 14 through 17.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings2(14, 1, 14, [
      "Amaziah becomes king of Judah and does right, though not like David. When he avenges his father's murder, he kills the men responsible but spares their children, keeping the law of Moses to the letter even while settling a personal score.",
      "He crushes Edom in the Valley of Salt, ten thousand men, and takes a city by war. Victory goes straight to his head. He sends word to Jehoash king of Israel: come, let us look one another in the face.",
      "Jehoash answers with a parable. A thistle in Lebanon asked a cedar for its daughter, and a wild beast passed by and trampled the thistle flat. Glory in your win, he says, and stay home, or you will fall and take Judah down with you.",
      "Amaziah will not hear it. He forces the fight, loses badly at Beth-shemesh, and gets captured. Jehoash tears down four hundred cubits of Jerusalem's wall and empties the temple treasury on his way out.",
    ]),
    kings2(14, 15, 29, [
      "Amaziah outlives his humiliation by fifteen years before his own people turn on him. A conspiracy forms in Jerusalem, he flees to Lachish, and they kill him there anyway and bring the body home on horses.",
      "The people of Judah crown his son Azariah at sixteen. In Israel, wicked Jeroboam the second gets forty-one years on the throne and pushes the nation's borders wider than they have been in generations.",
      "Scripture tells you exactly why, and it has nothing to do with Jeroboam earning it. The Lord saw that Israel's affliction was very bitter, that there was no helper left for them anywhere, and He had not yet said He would blot out their name.",
      "The word behind this expansion came through Jonah son of Amittai. The same Jonah who will run from Nineveh speaks this promise first. Mercy lands on a wicked king's watch here, and the only explanation given is God Himself.",
    ]),
    kings2(15, 1, 16, [
      "Azariah, also called Uzziah, reigns fifty-two years and does right like his father. But the high places never come down, and the Lord strikes him with leprosy for the rest of his life. He lives out his days in a separate house while his son Jotham runs the kingdom.",
      "Israel's throne turns into a revolving door next. Zachariah lasts six months before Shallum kills him in front of the people, which is the Lord's own word to Jehu landing exactly on schedule. Four generations on the throne, and not one day more.",
      "Shallum barely gets a full month before Menahem marches down from Tirzah and kills him too.",
      "Then Menahem does something this book has not shown yet. A city refuses to open its gates to him, so he slaughters everyone in it, including the pregnant women. The floor under Israel's kings is still dropping.",
    ]),
    kings2(15, 17, 38, [
      "Menahem buys off the king of Assyria with a thousand talents of silver, taxed out of Israel's wealthiest men, fifty shekels a head. The nation's independence gets purchased one payment at a time instead of repented for.",
      "His son Pekahiah reigns two years before his own army captain Pekah murders him inside the palace with fifty armed men backing him. The coups keep getting more organized, not less.",
      "Under Pekah, Assyria stops collecting money and starts collecting territory. Gilead, Galilee, all of Naphtali, marched off into exile decades before Samaria itself ever falls. Today's headline has already started.",
      "In Judah, Jotham does right, but even he leaves the high places standing. And almost as an aside, the text notes that the Lord is already stirring up Syria and Israel together against his son, who has not even taken the throne yet.",
    ]),
    kings2(16, 1, 20, [
      "Ahaz breaks the pattern completely. He does not just leave high places standing like his more decent predecessors. He makes his own son pass through the fire, the exact horror God evicted the Canaanites for doing.",
      "Attacked by Syria and Israel together, he does not call on the Lord. He writes to Assyria instead. I am thy servant and thy son, come up and save me, and pays for the rescue by stripping the temple treasury he is supposed to be guarding.",
      "Assyria obliges and kills Rezin of Syria. Ahaz travels to see the victory and comes home with a diagram. He has the priest Urijah build a copy of a pagan altar he admired in Damascus, and it is finished and burning sacrifices before Ahaz is even back in Jerusalem.",
      "Then he moves the Lord's own bronze altar out of the way, off to the side, kept only for himself to inquire by. The center of Judah's worship gets physically relocated to make room for something borrowed from the empire he is now afraid of.",
    ]),
    kings2(17, 1, 18, [
      "Hoshea plays both sides, a vassal to Assyria while secretly courting Egypt for help. Assyria's answer is to imprison him and besiege Samaria for three straight years.",
      "In the ninth year the city falls, and Israel, the whole northern kingdom, ten tribes and two hundred years of kings starting with Jeroboam, is marched off to Assyria and scattered into cities that were never theirs.",
      "Then the book stops the narrative entirely to explain why, in language it has not used this bluntly before. They feared other gods. They built high places in every city, down to the watchtowers. They served idols the Lord had explicitly told them not to serve, and He testified against them through every prophet He sent, and they hardened their necks and would not hear.",
      "Scripture will not let Judah off the hook in the same breath either. Also Judah kept not the commandments of the Lord their God, but walked in the statutes of Israel. The kingdom falling today is the warning label for the one still standing.",
    ]),
    kings2(17, 19, 41, [
      "The line runs all the way back to the original split. The Lord rent Israel from the house of David because of Jeroboam's sin, and everything since has been that first crack widening for two hundred years until the whole house comes down.",
      "Assyria does not leave the land empty. It resettles Samaria's cities with people from Babylon, Cuthah, Hamath, and other conquered places, and because they do not know how to fear the God who now owns that land, He sends lions among them until some of them die.",
      "So the king of Assyria sends back one exiled Israelite priest to teach the new residents how to fear the Lord, and it half works. They feared the Lord, and served their own gods, side by side, in the same high places.",
      "That is where the Samaritans come from. Not a footnote, but the actual origin of the people Jesus will meet at a well and defend in a parable eight hundred years later. A mixed, half-hearted worship, born out of judgment, still standing when He gets there.",
    ]),
  ],
  closing: [
    ["So that is Day 91.", 700],
    ["Amaziah's pride, a leprous king, five assassinations in Israel, and a bought-and-paid-for Assyrian rescue Judah never actually needed.", 800],
    ["Then Ahaz swaps out God's altar for Assyria's, and Israel's kings run out of road completely.", 800],
    ["Samaria falls. The ten tribes are gone from their own land, and Scripture stops to tell you plainly why. Two hundred years of warnings nobody listened to.", 850],
    ["Even the leftover population, dragged in from other conquered cities, ends up worshipping the Lord and their own gods side by side.", 850],
    ["That mixed, half-hearted worship becomes the Samaritans, the people Jesus will sit down with at a well eight hundred years later.", 850],
    ["Tomorrow, 2 Kings 18 through 21. Hezekiah's faith buys Judah more time, and his own son undoes almost all of it.", 850],
    ["For now, sit with what actually caused the fall.", 800],
    ["Not one bad king.", 750],
    ["Two hundred years of a people who would not turn.", 1200],
  ],
};
