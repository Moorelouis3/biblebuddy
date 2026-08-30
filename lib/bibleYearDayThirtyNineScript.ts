import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 39, written to the Day 1 standard.
 *
 * Numbers 2-5: the tribes camp around the tabernacle in a fixed order, the
 * Levites are numbered and given carrying duties instead of a battle
 * assignment, and the camp is given laws for purity, restitution, and a
 * suspected wife. Seven blocks across four chapters, consolidating the
 * repetitive tribal lists and carrying duties the way Day 38 consolidated
 * the census in Numbers 1.
 */

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 39,
  title: "Camp Order and Purity",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 39.", 700],
    ["Yesterday Israel got counted. Today they get arranged.", 800],
    ["Where you pitch your tent is not random. It is assigned, tribe by tribe, around one tent in the middle.", 850],
    ["And then the camp gets rules for what is allowed to stay inside it.", 850],
    ["We are in Numbers 2 through 5.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    num(2, 1, 34, [
      "Every tribe gets a fixed position, three tribes to a side, facing outward from the tabernacle in the center. East, Judah leads. South, Reuben. West, Ephraim. North, Dan.",
      "The order of march is the order of the camp. When they move, the east side goes first, then south, then the tabernacle itself carried in the middle, then west, then north.",
      "It reads like a list because it is one, but the point is not the list. It is the shape. God's tent sits in the center of everything, and every tribe knows exactly how far it stands from it.",
      "Nobody chooses their spot. Nobody drifts closer because they feel like it. Over two million people, and not one of them is guessing where to stand.",
    ]),
    num(3, 1, 13, [
      "Aaron's sons are named, and Scripture does not skip the hard part. Nadab and Abihu are already dead, struck down for offering strange fire before the Lord. Only Eleazar and Ithamar are left serving.",
      "Then God assigns the whole tribe of Levi to Aaron, to help him and to help the congregation, doing the work of the tabernacle.",
      "And He states the trade plainly. The Levites are mine, instead of all the firstborn. On the day I struck every firstborn in Egypt, I set apart Israel's firstborn for myself. Now I am taking a tribe in their place.",
      "One tribe stands in for every family's oldest son. That is not a small swap. It touches every household in Israel at once.",
    ]),
    num(3, 14, 39, [
      "The Levites split into three families, and each one gets a different piece of the tabernacle to carry. Gershon takes the tent itself, the coverings, the curtains, the soft parts.",
      "Kohath takes the furniture. The ark, the table, the lampstand, the altars, the sacred vessels. The most dangerous cargo in the camp.",
      "Merari takes the frame. The boards, the bars, the pillars, the sockets. The structure that everything else hangs on.",
      "Three jobs, none of them optional, none of them interchangeable. A tabernacle does not move on its own, and it does not move if any one of these three families sits out.",
    ]),
    num(3, 40, 51, [
      "Moses counts every firstborn male in Israel, one month old and up, and the number comes to twenty-two thousand two hundred seventy-three.",
      "The Levites number twenty-two thousand. Close, but not even. So God has Moses collect five shekels for each of the two hundred seventy-three firstborn sons the Levites could not cover.",
      "That silver goes to Aaron and his sons. A straight, itemized redemption, down to the last few sons who did not have a substitute waiting for them.",
      "Even the leftover gets accounted for. Nobody in this census is close enough to round off.",
    ]),
    num(4, 1, 49, [
      "Before the Kohathites can touch anything, Aaron and his sons cover it first. The ark, the table, the lampstand, every sacred object wrapped before it is ever carried.",
      "They are told exactly what happens if they look at the holy things uncovered, or touch them directly. They die. Carrying the most sacred cargo in the camp is not an honor you can improvise your way into.",
      "Gershon and Merari get their own detailed instructions too, matched to what they carry, all of it under Ithamar's direction. Every man from thirty to fifty years old, in the strength of his working life.",
      "The three families total eight thousand five hundred eighty men, all assigned, all counted, all carrying something that is not theirs. The tabernacle moves because a lot of specific people know exactly what belongs on their shoulder.",
    ]),
    num(5, 1, 10, [
      "God tells Moses to put outside the camp anyone with a serious skin disease, anyone with a bodily discharge, and anyone made unclean by contact with the dead. The camp stays clean because God is living in the middle of it.",
      "Then the law turns to ordinary wrongdoing. If a person cheats or wrongs someone, they confess it, and repay the full amount, plus a fifth on top.",
      "If the person they wronged has died with no relative left to receive it, the payment goes to the priest instead. A debt does not just evaporate because the person owed is gone.",
      "Purity and restitution sit in the same breath here. What is wrong with the body and what is wrong between people both get named, and both get a fix, not just a rule.",
    ]),
    num(5, 11, 31, [
      "This is the law of jealousy. If a husband suspects his wife of unfaithfulness and has no witness or proof either way, he brings her to the priest with an offering.",
      "The priest mixes holy water with dust from the tabernacle floor, has her take an oath, and gives her the water to drink. If she is guilty, the text says her body will suffer for it. If she is innocent, nothing happens to her, and she is free, able to have children.",
      "Notice what this law does not allow. No mob, no husband taking justice into his own hands, no accusation that just hangs over her unanswered. The suspicion has to go through a priest, a process, and an outcome that ends it either way.",
      "Uncomfortable as it reads now, in a world where a jealous husband could do whatever he wanted to a wife he suspected, this took the decision out of his hands and put it in God's.",
    ]),
  ],
  closing: [
    ["So that is Day 39.", 700],
    ["A camp arranged tribe by tribe around one tent in the center. Nobody guessing where to stand.", 800],
    ["Levites given to Aaron in place of every firstborn son, then split three ways to carry the parts of that tent, family by family, shoulder by shoulder.", 850],
    ["Then the camp gets rules for what stays inside it. Disease put outside. Wrongs confessed and repaid. Even suspicion between a husband and wife handled through a process, not a fist.", 850],
    ["Notice the shape underneath all of it. Order is not control for its own sake here. It is what it looks like to live that close to God and not get burned by it.", 850],
    ["Tomorrow, Numbers 6 through 9. A vow of separation, a priestly blessing, and Israel's second Passover.", 850],
    ["For now, hold on to where the tabernacle sat.", 800],
    ["Not off to one side.", 750],
    ["Dead center, with everyone else arranged around it.", 1200],
  ],
};
