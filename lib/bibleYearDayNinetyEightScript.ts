import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 98, written to the Day 1 standard.
 *
 * 1 Chronicles 17-20 turns David's own idea inside out: he wants to build
 * God a house, and God answers by promising to build David one instead -
 * the covenant that never runs out. Then war, an insult that spirals into
 * a campaign, and a last look at the giants of Gath. Five blocks across four
 * chapters, the last two short enough to stand on their own.
 */

const chron1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "1 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 98,
  title: "David's Covenant and Victories",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 98. Yesterday David finally brought God's presence home.", 700],
    ["Today he wants to build God a house to match it.", 750],
    ["God says no - and makes him a much bigger promise instead.", 800],
    ["Not a building. A throne that never actually runs out.", 1000],
    ["Then comes years of war, one insult that spirals into a whole campaign, and giants nobody has finished dealing with yet.", 850],
    ["We are in 1 Chronicles 17 through 20.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron1(17, 1, 15, [
      "David looks at his own cedar palace, looks at the ark still under a tent, and tells Nathan he wants to fix that. Nathan's first answer is a quick yes - do all that is in thine heart, for God is with thee.",
      "That same night, God corrects him. I have not dwelt in an house since the day I brought up Israel - I have gone from tent to tent. God was never asking for an upgrade. A good idea is still not the same as an assignment.",
      "Then comes the reversal the whole chapter is built around. David wanted to build God a house. God says, the Lord will build thee an house - not a building this time, but a family, a dynasty, a line that keeps going.",
      "He shall build me an house, and I will stablish his throne for ever. That promise runs straight past Solomon, past every king who fails after him, toward something that never actually expires.",
    ]),
    chron1(17, 16, 27, [
      "David sits down before the Lord, and the biggest promise of his life gets the smallest possible response: who am I, O Lord God, and what is mine house, that thou hast brought me hitherto?",
      "He does not thank God for seeing his potential. He says the opposite - for thy servant's sake, and according to thine own heart, hast thou done all this greatness. The promise is about who God is, not what David earned.",
      "Then he does something worth copying. He prays God's own words back to him. Let it even be established, that thy name may be magnified for ever... let the house of David thy servant be established before thee.",
      "That is what faithful prayer sounds like when God has already spoken. Not new requests. Just, please do what you said.",
    ]),
    chron1(18, 1, 17, [
      "David goes to war on every side - Philistines, Moab, the king of Zobah, Damascus, Edom - and wins everywhere. Twice in one chapter the text stops to say why: the Lord preserved David whithersoever he went.",
      "He takes the gold and silver he captures and dedicates it to the Lord instead of keeping it. Even the bronze from these campaigns does not disappear - it is the same brass Solomon will later use for the great basin and the pillars of the temple.",
      "So the temple David is not allowed to build gets financed, years early, out of battles he did not know were preparation for it.",
      "And the chapter ends with a plain list - a recorder, a scribe, priests, a bodyguard captain - alongside the one line that sums up the reign so far: he executed judgment and justice among all his people.",
    ]),
    chron1(19, 1, 19, [
      "David hears that the king of Ammon has died, and his first move is kindness - I will shew kindness unto Hanun, because his father shewed kindness to me. There is no angle here. He is just repaying a debt of grace.",
      "Hanun's advisors talk him out of trusting it. They convince him David's comforters are actually spies. One suspicious guess, acted on, drags an entire region into a war nobody needed.",
      "Hanun shaves David's men and cuts their clothes at the waist - an attack aimed at dignity, not safety. David's response is not rage. Tarry at Jericho until your beards be grown. He gives his own humiliated men time to heal before facing anyone.",
      "Before the battle, Joab tells his brother the whole posture in one line: be of good courage, and let us behave ourselves valiantly for our people... and let the Lord do that which is good in his sight. Do your part. Hand God the outcome.",
    ]),
    chron1(20, 1, 8, [
      "Joab finally takes Rabbah while David stays behind in Jerusalem - the same season, the same detail Chronicles uses elsewhere to mark trouble. This time, Chronicles simply does not go there. It leaves the story David would not want remembered and moves straight to the crown.",
      "David sets the captured king's crown, a talent of gold heavy with jewels, on his own head, and the campaign against Ammon's cities ends.",
      "Then three short fights against the Philistines close out the chapter - and each one is remembered by the name of the Israelite who won it, not just David's. Sibbechai. Elhanan, who kills the brother of Goliath. Jonathan, David's own nephew, who kills a six-fingered, six-toed giant that dared to defy Israel.",
      "These were born unto the giant in Gath, and they fell by the hand of David, and by the hand of his servants. Goliath's whole family line, finished off one soldier at a time, not by one champion alone.",
    ]),
  ],
  closing: [
    ["So that is Day 98.", 700],
    ["David wanted to build God a house. God turned it around completely and promised to build David one instead - a throne he is told, twice, will last for ever.", 800],
    ["And notice how David responds to the biggest promise of his life. Not with excitement about himself. With one question: who am I?", 800],
    ["Then war, city after city, and the text keeps saying the same thing about it. The Lord preserved David whithersoever he went.", 800],
    ["One insulted messenger's beard turned into a war with three nations. That is how fast pride escalates when nobody backs down first.", 800],
    ["And notice what is missing from chapter 20. The exact season, the exact detail - David tarried at Jerusalem - that opens David's worst failure elsewhere in Scripture. Chronicles leaves it out completely and goes straight to the crown.", 850],
    ["Tomorrow, 1 Chronicles 21 through 24. David makes a very different kind of mistake - and this time, Chronicles does not look away.", 850],
    ["For now, hold on to David's own words about the promise he did not earn.", 800],
    ["Not for my sake, Lord.", 800],
    ["According to thine own heart.", 1200],
  ],
};
