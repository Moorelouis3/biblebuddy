import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 278, written to the Day 1 standard.
 *
 * Malachi runs on one move the whole way through: God makes a statement, the
 * people talk back, and God answers the talk-back. Priests offering blind and
 * lame animals, husbands breaking covenant with the wife of their youth, and
 * a nation accusing God of not loving them - all answered by a refiner's fire
 * that purifies instead of just destroying. Seven blocks across Malachi 1, 2,
 * and 3.
 */

const malachiOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Malachi 1:${startVerse}-${endVerse}`,
  book: "malachi",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const malachiTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Malachi 2:${startVerse}-${endVerse}`,
  book: "malachi",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const malachiThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Malachi 3:${startVerse}-${endVerse}`,
  book: "malachi",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 278,
  title: "Covenant Worship and Refining Fire",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 278. Malachi. The last prophet before four hundred years of silence.", 800],
    ["The priests are going through the motions, and God is done pretending not to notice.", 800],
    ["He asks them straight out. If I am your father, where is my honor? If I am your master, where is my fear?", 850],
    ["But this book does not end in anger. It ends with a refiner's fire, and a promise that not everyone gets burned by it.", 900],
    ["We are in Malachi 1, 2, and 3.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    malachiOne(1, 5, [
      "Malachi opens with a title that doubles as the whole book's method. God says, I have loved you. Israel answers, wherein hast thou loved us? Almost every point from here on works exactly that way.",
      "God's proof is Jacob and Esau. Two brothers, one chosen, and Esau's mountains left to the dragons of the wilderness while Jacob's line still stands. Love, argued from history, not from a feeling.",
      "Edom says it will rebuild what was torn down. God says it can try. What man calls building, God calls the border of wickedness, and he will keep throwing it down.",
      "This is a people who have already forgotten why the exile happened, and now they need convincing that God still loves them at all. That is where Malachi has to start.",
    ]),
    malachiOne(6, 14, [
      "A son honors his father. A servant fears his master. So where, God asks the priests directly, is my honor, and where is my fear? They cannot even see the disrespect they have gotten used to.",
      "Look at what is making it onto the altar. Bread they call polluted. Animals that are blind, lame, sick. Try giving that to your governor and see if he is pleased with you. God is asking for less courtesy than a Persian official would get.",
      "What makes it worse is the attitude underneath it. What a weariness is it, they say, and snuff at the whole thing like it is beneath them. Worship reduced to an obligation nobody wants to be doing.",
      "And in the middle of this small, contemptuous scene, God says something enormous. His name will be great among the Gentiles, incense offered in every place, whether or not these priests ever get it right. Their contempt does not shrink him.",
    ]),
    malachiTwo(1, 9, [
      "This is aimed squarely at professional clergy. If you will not lay it to heart, God says, I will curse your blessings, and spread the dung of your own feasts on your faces. As graphic a warning as any priest gets in Scripture.",
      "He measures them against Levi, the ancestor of their own order, who walked with God in peace and equity and turned people away from sin by his life, not just his words. A priest's job description, before it got corrupted.",
      "The priest's lips should keep knowledge, because people seek the law at his mouth. He is called, plainly, the messenger of the Lord of hosts. That title makes the failure heavier, not lighter.",
      "Instead they caused many to stumble, showed partiality in the law, corrupted the very covenant they were ordained to protect. So God makes them contemptible before the people, the exact reversal of what a priest is supposed to be.",
    ]),
    malachiTwo(10, 17, [
      "Have we not all one father? Has not one God made us? Then why does one brother deal treacherously with another by profaning the covenant of the fathers? Malachi turns from priesthood to marriage without changing subject, because both are covenant.",
      "Judah has married the daughter of a strange god. And at the same time, men are covering the altar with tears because God no longer regards their offering. The two things are connected. Worship goes cold when covenant is broken at home.",
      "God is witness between a man and the wife of his youth, his companion, the wife of his covenant. Dealing treacherously with her is not a private matter. It happens in front of the one who made the covenant possible.",
      "And they call it fine. Every one that doeth evil is good in the sight of the Lord, they say, or where is the God of judgment? Malachi's whole structure, question answered by question, comes straight out of denial like this.",
    ]),
    malachiThree(1, 6, [
      "Behold, I will send my messenger to prepare the way, and the Lord you seek will suddenly come to his temple. Four hundred years later, this verse is the reason a wilderness preacher makes any sense at all.",
      "But who can stand it? He comes like a refiner's fire, like a launderer's soap. Not warmth for people who wanted comfort. Something that burns off what does not belong.",
      "He sits as a refiner, purifying the sons of Levi like gold and silver, until Judah's offering is pleasant again, as in the days of old. The fix for corrupted worship is not a new system. It is purification of the same priesthood.",
      "Then the line underneath everything. I am the Lord, I change not, therefore the sons of Jacob are not consumed. The reason this rebellious, complaining, half-hearted people still exists at all is God's unchanging nature, not their track record.",
    ]),
    malachiThree(7, 12, [
      "From the days of your fathers, God says, you have gone away from my ordinances. Return to me, and I will return to you. And even that invitation gets an argument back. Wherein shall we return?",
      "Will a man rob God? Yet you have robbed me, he says, in tithes and offerings. It is a shocking accusation to level at people who thought they were the religious ones in the room.",
      "Bring the whole tithe into the storehouse, and prove me now with this. Open the windows of heaven, pour out a blessing you do not have room to receive. God rarely invites anyone to test him. Here he does, specifically about generosity.",
      "The devourer rebuked, the vine no longer casting its fruit before the time, every nation calling them blessed. All of it tied to one obedience they had been skipping.",
    ]),
    malachiThree(13, 18, [
      "Your words have been stout against me, God says, and they answer, in effect, we never said anything. It is vain to serve God, they had been saying. What profit is there in walking mournfully before him?",
      "Meanwhile the proud look happy, the wicked get set up, people who test God seem to get away with it. The oldest complaint in Scripture, dressed in Malachi's own words.",
      "But not everyone in the room is saying that. Those who feared the Lord spoke often, one to another, and the Lord listened, and a book of remembrance was written before him. Every quiet, unnoticed word of faith, recorded.",
      "They shall be mine, he says, in the day I make up my jewels, and I will spare them the way a man spares a son who serves him. The chapter closes on the line the whole book has been driving toward. The difference between the righteous and the wicked, between the one who serves God and the one who does not.",
    ]),
  ],
  closing: [
    ["So that is Day 278.", 700],
    ["Malachi's whole book runs on one move. God makes a statement, and the people talk back. I have loved you. Wherein? You have robbed me. Wherein?", 800],
    ["Underneath the arguing is a real accusation. Priests offering blind and lame animals like it doesn't matter who is watching. Husbands breaking covenant with the wife of their youth while wondering why God stopped listening.", 850],
    ["But this book does not end in anger. It ends with fire that refines instead of just destroying, and a God who says plainly, I do not change, that is the only reason you are still standing.", 850],
    ["He promises a messenger to prepare the way, and windows of heaven for anyone who tests him with real generosity.", 800],
    ["And for everyone who kept speaking quietly about him anyway, even surrounded by people calling that vain, there is a book of remembrance with their name in it.", 850],
    ["Tomorrow, Malachi 4 and Matthew 1 and 2. Four hundred years of silence, and then a birth.", 850],
    ["For now, sit with the question underneath all of Malachi.", 750],
    ["Will a man rob God?", 1200],
  ],
};
