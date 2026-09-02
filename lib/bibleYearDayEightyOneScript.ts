import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 81, written to the Day 1 standard.
 *
 * 2 Samuel 20-23 closes out David's wars: one more rebellion, a famine traced
 * back to a broken oath, more giants, then a turn into David's own voice — a
 * song of deliverance, his last words, and a roll call of his mighty men that
 * ends, deliberately, on Uriah the Hittite. Seven blocks across four chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "2 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 81,
  title: "David's Later Reign and Mighty Men",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 81. The rebellion you just watched David survive wasn't the last one.", 750],
    ["A new man, Sheba, tries to split the kingdom again — and Joab answers it the way Joab answers everything. With a hidden knife.", 800],
    ["Then the chapters turn strange. A three-year famine tied to a promise Saul broke. A mother guarding bodies on a hillside. Giants. A song. A list of names.", 850],
    ["By the end, one name closes the whole list of David's wars, and it's a name you already know.", 850],
    ["We are in 2 Samuel 20 through 23.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(20, 1, 13, [
      "Two chapters ago you watched Judah and Israel start arguing over who owns the king. This is that crack splitting wide open. A worthless man named Sheba blows a trumpet and says it out loud. We have no part in David, neither have we inheritance in the son of Jesse. Every man to his tents, O Israel. And Israel goes.",
      "David hands the army to Amasa now, not Joab, and gives him three days to gather Judah. Amasa takes longer than that, so David sends Abishai instead — and Joab tags along uninvited.",
      "At Gibeon, Joab walks up to Amasa with a friendly word and a hand on his beard like he's going to kiss him. Art thou in health, my brother? Amasa never sees the sword in Joab's other hand. One stroke to the belly, and Amasa is dead on the ground.",
      "It's the second commander Joab has killed this way — hand extended, word soft, blade already moving. Amasa's body lies in the highway wallowing in his blood, and every soldier who passes stops to stare, until someone finally drags him into a field and throws a cloth over him just so the army will keep marching.",
    ]),
    g(20, 14, 26, [
      "Sheba runs north to a walled city called Abel of Beth-maachah, and Joab's men build a siege bank against the wall to batter it down.",
      "A wise woman calls out from the top of the wall before a single stone falls. I am one of them that are peaceable and faithful in Israel. Why wilt thou swallow up the inheritance of the Lord? She stops a war with a question.",
      "Joab tells her the truth. He doesn't want the city. He wants one man — Sheba, who lifted his hand against the king. Give him up, and the siege ends.",
      "She goes back in her wisdom, and the city cuts off Sheba's head and throws it over the wall to Joab. The trumpet blows, the men scatter home, and the chapter ends with a list of David's officials — the same Joab who just murdered Amasa, back running the whole army.",
    ]),
    g(21, 1, 14, [
      "A famine sits on the land three years running, and when David asks the Lord why, the answer reaches back to Saul. It is for Saul, and for his bloody house, because he slew the Gibeonites — a people Israel had sworn by oath to leave alive, generations earlier.",
      "David asks the Gibeonites what will settle it. They don't want silver. They want seven of Saul's descendants handed over to be hanged before the Lord. David spares Mephibosheth, Jonathan's son, because of his own oath to Jonathan — but hands over two of Rizpah's sons and five more from Saul's line.",
      "Rizpah, the mother of two of them, takes sackcloth and spreads it on the rock beside the bodies. She stays there guarding them from the birds by day and the wild animals by night, from the start of the harvest until rain finally falls from heaven.",
      "Word reaches David, and he goes and gathers the bones of Saul and Jonathan themselves, buries them with the bones of the hanged men in the family tomb, and the text says plainly — after that, God was entreated for the land.",
    ]),
    g(21, 15, 22, [
      "The wars with the Philistines aren't over, and this time David himself nearly dies in one. Ishbi-benob, a descendant of the old giants, is about to strike him down when Abishai steps in and kills the man instead.",
      "David's own men make him swear an oath after that. Thou shalt go no more out with us to battle, that thou quench not the light of Israel. The king who once faced Goliath alone is now the one they're protecting.",
      "Three more battles, three more giants. Sibbechai kills Saph. Elhanan kills Goliath's brother, whose spear staff was like a weaver's beam. Jonathan, David's own nephew, kills a giant with six fingers on each hand and six toes on each foot.",
      "All four of them were born to the giant in Gath, and all four fell by the hand of David and his servants — not David's hand anymore, but the men he raised up around him.",
    ]),
    g(22, 1, 51, [
      "This whole chapter is a song, not a story — word for word the same one you'll find later as Psalm 18. David sings it looking back over an entire life of being chased, cursed, betrayed, and grieving, and somehow still standing.",
      "The Lord is my rock, and my fortress, and my deliverer. He piles up image after image — rock, shield, horn of salvation, high tower, refuge — because one word was never going to cover what he'd actually lived through.",
      "He remembers the worst of it in physical terms. The sorrows of death compassed me, the floods of ungodly men made me afraid. Then the rescue, described like an earthquake and a storm — smoke out of his nostrils, fire out of his mouth, the foundations of heaven moved.",
      "He ends looking outward instead of just at himself — praise among the heathen, mercy to his seed forevermore. After Absalom, after Amnon, after everything in the last several days you've read, this is a man still choosing to call God faithful.",
    ]),
    g(23, 1, 7, [
      "The text calls this David's last words, and calls him the sweet psalmist of Israel — his own summary of what it means to lead well, at the very end of his life.",
      "He that ruleth over men must be just, ruling in the fear of God. And he shall be as the light of the morning, when the sun riseth, even a morning without clouds — as the tender grass springing out of the earth by clear shining after rain. That's the ideal. You've just spent four chapters watching how far David's own reign fell short of it.",
      "He still calls God's covenant with him everlasting, ordered in all things, and sure — even knowing his own house has been anything but clean.",
      "And he closes with a warning about the sons of Belial, worthless men, who will be thrust away like thorns too dangerous to touch by hand. After Sheba and Amnon and Absalom, David knows exactly what he means.",
    ]),
    g(23, 8, 39, [
      "The chapter turns into a list — David's mighty men, one by one. Three of them once broke through an entire Philistine garrison just to bring David water from the well at Bethlehem, because he said out loud that he wished for a drink from it. He gets the water and won't touch it. He pours it out to the Lord instead — is not this the blood of the men that went in jeopardy of their lives?",
      "Benaiah alone kills two lion-like men of Moab, climbs down into a pit and kills an actual lion on a day it's snowing, then takes on an Egyptian giant armed with nothing but a staff — wrestles the spear out of the giant's own hand and kills him with it.",
      "Name after name after name. Thirty-seven men who bled for David, most of them getting one line in the whole Bible and nothing more.",
      "And the list ends on the thirty-seventh name. Uriah the Hittite. The husband David had killed to cover up Bathsheba, listed here as one of his own mighty men — the text puts him last, on purpose, so you can't read this list without remembering exactly what David did to him.",
    ]),
  ],
  closing: [
    ["So that is Day 81.", 700],
    ["Another rebellion. Another murder by Joab, hand on a beard, sword already moving.", 750],
    ["A famine that traced all the way back to a broken promise, and a mother who sat on a rock guarding bodies until the rain finally came.", 800],
    ["Then, out of nowhere, a song. The Lord is my rock, my fortress, my deliverer. David singing his whole life back to God, right after living through the worst of it.", 850],
    ["His last words describe a king who rules in the fear of God, like morning light after rain. You've just watched how far short his own reign fell.", 850],
    ["And the list of his mighty men ends on Uriah the Hittite — the man David had killed, given the very last word in the list.", 850],
    ["Tomorrow, 2 Samuel 24 and 1 Kings 1 through 3. One more sin, one more son, and Solomon's kingdom begins.", 850],
    ["For now, sit with what three men did for a cup of water.", 800],
    ["They risked their lives for it.", 750],
    ["David poured it out to God instead of drinking it.", 1200],
  ],
};
