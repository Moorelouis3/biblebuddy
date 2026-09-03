import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 95, written to the Day 1 standard.
 *
 * 1 Chronicles 5-8 leaves David's line and walks the rest of the tribes -
 * Reuben's lost birthright, Gad's war won by a prayer, the priesthood's own
 * exile inside its own list, the Levites who own no land but hold the cities
 * of refuge, Ephraim's grief, and Benjamin's family tree ending at Saul and
 * Jonathan. Seven blocks across four chapters, matching Day 94.
 */

const chron1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "1 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 95,
  title: "Tribes, Genealogies, and Identity",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 95. Yesterday it was Judah's line, all the way down to David and Zerubbabel. Today the record turns to look at everyone else.", 800],
    ["A tribe that loses its birthright in one verse. Two and a half tribes carried off by Assyria years before Israel even falls. A priesthood traced generation by generation straight through the same exile you read about two days ago.", 850],
    ["And buried in the very last chapter, a family tree that ends at two names you already know - Saul, and his son Jonathan.", 850],
    ["Some of these names never do anything else in the whole Bible. A few of them explain a war that was won, or a family that disappeared, or a king that came from nowhere.", 800],
    ["We are in 1 Chronicles 5 through 8.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron1(5, 1, 10, [
      "Chronicles opens Reuben's line with an explanation before it even lists a name. Reuben was the firstborn - but he defiled his father's bed, so the birthright went to the sons of Joseph instead. Genesis 35, one verse, paid for chapters later.",
      "That is why the record even bothers to say it: the genealogy is not to be reckoned after the birthright. Reuben stays the firstborn on paper. He does not stay the firstborn in what actually happens next.",
      "The line runs down through six more generations to one man, Beerah - prince of the Reubenites - and then stops on a single fact. Tilgath-pileser, king of Assyria, carried him away captive.",
      "That happened generations before the exile you have been reading about all week. Reuben's people were already gone from the land long before Israel fell, long before Judah's temple burned. The consequences of one bad night reach a long way.",
    ]),
    chron1(5, 11, 22, [
      "Gad settles next door in Bashan, and the list names their chiefs the same plain way it names everyone - Joel, Shapham, Jaanai, Shaphat - men with no story attached, just a place on a family tree.",
      "Then for one paragraph the genealogy turns into a battle report. Reuben, Gad, and half of Manasseh together, forty-four thousand seven hundred and sixty men able to bear sword and bow, go to war against the Hagarites.",
      "And the text tells you exactly why they won: they cried to God in the battle, and he was intreated of them, because they put their trust in him. Not because of the number of men. Because of what they did in the middle of the fight.",
      "Fifty thousand camels, two hundred fifty thousand sheep, a hundred thousand people taken in one campaign - and the record hands the credit to a prayer, not a sword.",
    ]),
    chron1(5, 23, 26, [
      "Half of Manasseh spreads out from Bashan all the way to Mount Hermon, led by seven named men the text calls mighty men of valour, famous men. For a moment the record almost sounds proud of them.",
      "Then verse twenty-five, one sentence, undoes it. They transgressed against the God of their fathers, and went a whoring after the gods of the people of the land, whom God destroyed before them. The very idols that got the land's previous owners wiped out.",
      "So God stirs up the spirit of the king of Assyria - the same Tilgath-pileser from Reuben's list - and Reuben, Gad, and half of Manasseh are all carried off together, to Halah, Habor, Hara, and the river Gozan.",
      "The chapter ends with four words that are not comforting: unto this day. Whoever compiled this genealogy after the exile knew exactly how that sentence still felt. These two and a half tribes never really came back.",
    ]),
    chron1(6, 1, 15, [
      "Levi's line narrows fast to one family: Aaron, then Eleazar, then a straight chain of fathers and sons - Phinehas, Abishua, Bukki, Uzzi - each one just begetting the next, generation after generation of the high priesthood.",
      "Verse ten breaks the pattern for one line, naming Azariah as the one who executed the priest's office in the temple that Solomon built - a small note that this whole list is walking through real buildings and real centuries, not just names.",
      "The chain keeps going through Hilkiah - the priest who later finds the lost Book of the Law - and Seraiah, all the way to a final name, Jehozadak.",
      "And Jehozadak went into captivity, when the LORD carried away Judah and Jerusalem by the hand of Nebuchadnezzar. Even the priesthood's own list ends at the same burned temple you read about two days ago.",
    ]),
    chron1(6, 16, 81, [
      "The rest of Levi's family fills most of this chapter - Gershom, Kohath, and Merari's descendants traced down, clan by clan, until the list reaches men you would actually recognize: Heman, Asaph, and Ethan, the singers David set over the service of song in the house of the Lord.",
      "Each of their family trees is walked all the way back - Heman's to Kohath, Ethan's to Merari, Asaph's to Gershom - and then, past all of it, to the same two names: the son of Levi, the son of Israel. Worship music with its own paperwork, tracing straight back to Jacob.",
      "Then the tone shifts. Aaron and his sons offered upon the altar and made atonement, according to all that Moses commanded - but nowhere in Israel do the Levites get their own territory. Instead they get scattered cities, one at a time, borrowed out of every other tribe's land.",
      "Six of those cities are set aside as cities of refuge - places a person could run to and actually be safe. The tribe with no land of its own ends up holding the ground where mercy lives.",
    ]),
    chron1(7, 1, 40, [
      "Issachar, Benjamin, Naphtali, the other half of Manasseh, Ephraim, and Asher each get their moment, mostly counted in fighting men - eighty-seven thousand here, twenty-six thousand there - tribes measured by how many swords they could put in a field.",
      "Then Ephraim's list stops being numbers. Ezer and Elead go down to raid cattle from the men of Gath and are killed, and Ephraim their father mourned many days, and his brethren came to comfort him. One grieving father, inside a wall of census figures.",
      "When Ephraim finally has another son, he names him Beriah - because it went evil with his house. A child's whole name built out of his father's grief. And a few verses later, his daughter Sherah is named as the one who built Beth-horon, upper and lower, and Uzzen-sherah - three towns credited to a woman's own hands.",
      "Asher's count closes the chapter the same way - twenty-six thousand men, apt to the war and to battle. But it is Ephraim's grief and Sherah's towns that stay with you, not the numbers around them.",
    ]),
    chron1(8, 1, 40, [
      "Benjamin's family tree gets walked twice in four chapters - briefly in chapter seven, in full detail here - because this is the line the whole book is steering toward. Bela, Ashbel, Aharah, all the way down through Ner.",
      "And Ner begat Kish, and Kish begat Saul, and Saul begat Jonathan. The first king of Israel, sitting inside a genealogy, one name among hundreds.",
      "The line does not stop at Saul's death. Jonathan's son is Merib-baal - Mephibosheth, the crippled prince David brought to his own table out of loyalty to his father - and his family keeps going for generations after that, down to Azel's six sons, and Ulam's sons, a hundred and fifty of them, mighty men and archers.",
      "A king who lost the throne, a grandson who lived on charity at another man's table - and here, long after all of it, someone still cared enough to write down exactly how many descendants they had. Nobody in this book disappears completely.",
    ]),
  ],
  closing: [
    ["So that is Day 95.", 700],
    ["Four more chapters of names - Reuben, Gad, half of Manasseh, all of Levi, Issachar, Benjamin, Naphtali, Ephraim, Asher, and Benjamin again.", 800],
    ["Inside them: a birthright lost in one bad night, a battle won by a prayer instead of a sword, and two exiles - Reuben's and the priesthood's - both landing in the same list.", 800],
    ["A father who mourned his sons by name. A daughter who built three towns. A tribe with no land of its own, holding the cities where a person on the run could be safe.", 850],
    ["And at the very end, Saul's whole family, kept alive on paper for generations after the throne was gone - down to a crippled grandson who ate at David's table out of nothing but loyalty.", 850],
    ["Every name in these four chapters belonged to someone who thought their life was too small to matter beyond it.", 800],
    ["Tomorrow, 1 Chronicles 9 through 12. The exile ends, the list turns to who came home, and Saul's story gets told one more time - the day he died.", 850],
    ["For now, hold on to one line from the middle of a war.", 800],
    ["They cried to God in the battle, and he was intreated of them.", 800],
    ["Because they put their trust in him.", 1200],
  ],
};
