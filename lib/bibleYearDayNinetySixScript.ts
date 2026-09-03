import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 96, written to the Day 1 standard.
 *
 * 1 Chronicles 9-12 is where the genealogies finally break into narrative:
 * Jerusalem resettled after the exile, Saul's death compressed into one
 * chapter and one verdict, David anointed and Jerusalem captured, the mighty
 * men and the well of Bethlehem, and the army that gathered to David at
 * Ziklag and Hebron. Seven blocks across four chapters, matching Days 94-95.
 */

const chron1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "1 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 96,
  title: "Return, Saul, and David's Supporters",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 96. Yesterday closed with Saul's family tree, repeated on purpose. Today his whole reign ends in fourteen verses - and then the real story finally starts moving.", 800],
    ["Jerusalem gets resettled after the exile. Saul dies on a mountain, and Chronicles hands down its verdict in a single sentence.", 800],
    ["Then a small army of outsiders starts gathering around one man - archers from Saul's own family, soldiers who crossed a flooded river, three men who broke through an entire camp for a cup of water.", 850],
    ["We are in 1 Chronicles 9 through 12.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron1(9, 1, 9, [
      "The chapter opens by naming exactly what happened and why: all Israel were reckoned by genealogies, written in the book of the kings of Israel and Judah, who were carried away to Babylon for their transgression. No softer word than that. Transgression.",
      "Then the list turns from who was carried away to who came back. Priests, Levites, ordinary Israelites from Judah, Benjamin, Ephraim, and Manasseh, all resettling the same city their grandparents were dragged out of.",
      "Uthai comes from Pharez's line - the same Pharez born through Tamar's scandal back in chapter two - still showing up, generations later, walking home into Jerusalem.",
      "A city that was rubble a chapter and a half ago now has names living in it again. That is what this whole list is quietly celebrating: not a battle won, just people back in their own streets.",
    ]),
    chron1(9, 10, 34, [
      "The priests get counted first - one thousand seven hundred sixty of them, very able men for the work of the service of the house of God - and then the list moves to jobs you would not expect a genealogy to care about.",
      "Gatekeepers who lodged around the house of God, because the charge was upon them, and the opening thereof every morning pertained to them. Someone had to be the one who actually unlocked the doors, every single morning, for generations.",
      "Others kept the ministering vessels by tale - counted in and counted out - or mixed the ointment of the spices, or prepared the shewbread fresh every sabbath. Small, repeatable jobs, named here as if they mattered as much as any battle.",
      "And the singers - free from other duties because they were employed in that work day and night. A temple does not run on the big miracle. It runs on people who show up every morning to do the same small job again.",
    ]),
    chron1(9, 35, 44, [
      "Then, without warning, the list backs up and gives you Saul's family tree one more time - almost word for word what you already read at the end of chapter eight. Jeiel, Ner, Kish, Saul, Jonathan, all repeated.",
      "That is not a mistake. It is Chronicles setting the stage. Everything you are about to read next - a king's death, an army's collapse - needs you to already know exactly whose family this is.",
      "The line runs the same course as before, through Jonathan's son Merib-baal, down to Azel's six sons. Saul's family did not vanish when his reign did. It just stopped being the family anyone was watching.",
      "One paragraph of genealogy, repeated on purpose, and then the narrative finally starts moving again - for the first time in ninety-five days of reading.",
    ]),
    chron1(10, 1, 14, [
      "The Philistines fight Israel at Gilboa, and it goes as badly as it can go. Israel flees, Saul's three sons - including Jonathan - are killed, and the archers hit Saul himself.",
      "Draw thy sword, and thrust me through, he tells his armourbearer, so the Philistines will not abuse him. The man refuses. So Saul falls on his own sword. His armourbearer, seeing him dead, falls on his too.",
      "The Philistines find the bodies, cut off Saul's head, hang his armor in the house of their gods, and fasten his head in the temple of Dagon. It is the men of Jabesh-gilead - the city Saul rescued as his very first act as king - who risk everything to retrieve the bodies and bury them with a seven-day fast.",
      "And Chronicles gives its own verdict before moving on: so Saul died for his transgression which he committed against the Lord... and enquired not of the Lord. One king's whole reign, reduced to a single sentence about where he stopped asking.",
    ]),
    chron1(11, 1, 9, [
      "All Israel gathers to David at Hebron and says something remarkable: we are thy bone and thy flesh. Even in the days when Saul was king, thou wast he that leddest out and broughtest in Israel. They are naming what was already true before they make it official.",
      "The elders make a covenant with David before the Lord, and they anoint him king - not a coup, not a conquest. An entire nation choosing, out loud, the man God had already chosen.",
      "Then David and all Israel go straight after Jerusalem - still held by the Jebusites, who are so confident they taunt David from the walls. Thou shalt not come hither.",
      "Whosoever smiteth the Jebusites first shall be chief and captain, David says, and Joab takes him up on it. The city falls, becomes the city of David, and a nation with no capital finally has one.",
    ]),
    chron1(11, 10, 47, [
      "Then the list turns to the men who made David king with him - starting with Jashobeam, who lifted up his spear against three hundred slain by him at one time, and Eleazar, who stood alone with David in a barley field when everyone else ran, and the Lord saved them by a great deliverance.",
      "The most famous line in the whole chapter: David, hiding in a cave, says out loud that he longs for water from the well of Bethlehem. Three of his mighty men hear him, break straight through the Philistine camp to get it, and bring it back.",
      "And David will not drink it. He pours it out to the Lord instead - shall I drink the blood of these men that have put their lives in jeopardy? Water that cost that much was too holy to swallow. It belonged to God, not to David's thirst.",
      "After that comes Benaiah, who killed a lion in a pit on a snowy day and disarmed an Egyptian giant with the giant's own spear, and then thirty more names with no story attached at all - men David trusted his life to, remembered here by name alone.",
    ]),
    chron1(12, 1, 40, [
      "Before any of that, men had already been finding their way to David while he was still hiding from Saul at Ziklag - including archers from Saul's own tribe of Benjamin, kinsmen of the very king trying to kill him.",
      "Gadites cross the Jordan in flood season, when it had overflown all his banks, just to reach him. And men of Issachar arrive with a description no other tribe gets: men that had understanding of the times, to know what Israel ought to do.",
      "When David questions a group's loyalty, the Spirit comes on Amasai and he answers for all of them: thine are we, David... peace be unto thee. Not a calculation. A declaration.",
      "By the end, tribe after tribe is counted - Judah, Simeon, Levi, Benjamin, Ephraim, every one of them - all these men of war came with a perfect heart to Hebron to make David king. And there was joy in Israel. After four chapters of loss and exile and a dead king, the story finally lands on that word.",
    ]),
  ],
  closing: [
    ["So that is Day 96.", 700],
    ["A city resettled after exile. A king who died for the questions he stopped asking. And an army that gathered around David one household at a time.", 800],
    ["Doorkeepers who never missed a morning. Three men who broke through a camp for a cup of water David refused to drink. A tribe remembered for understanding the times, not for its numbers.", 800],
    ["And Saul's own family, listed twice on purpose - once as the man who fell on his sword, once as the line that kept going anyway, generations after the throne was gone.", 850],
    ["Every one of these names chose a side before it was safe to. That is what the whole chapter twelve muster is actually counting.", 800],
    ["Tomorrow, 1 Chronicles 13 through 16. The ark finally comes to Jerusalem - and not everything about bringing it home goes the way David expects.", 850],
    ["For now, hold on to the line about the water.", 800],
    ["My God forbid it me, that I should do this thing.", 800],
    ["Shall I drink the blood of these men that have put their lives in jeopardy?", 850],
    ["He poured it out to the Lord.", 1200],
  ],
};
