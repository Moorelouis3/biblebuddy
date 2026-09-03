import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 89, written to the Day 1 standard.
 *
 * 2 Kings 6-9 moves from a floating axe head to a cannibalized siege to a
 * king's chariot flying furiously across Jezreel. Seven blocks across four
 * chapters, with chapter 9 - Jehu's whole purge - given its own two blocks
 * because it is the day's climax and deserves the room.
 */

const kings2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "2 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 89,
  title: "Rescue, Siege, and Jehu's Judgment",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 89. We open small. An axe head, borrowed, lost in a river.", 750],
    ["Then it gets very large. An army surrounded, a city starving, mothers eating their own children.", 850],
    ["And it ends with a chariot driving so hard everyone on the wall recognizes the driver before they can see his face.", 850],
    ["Jehu is coming, and by the time he's done, three people are dead and a dynasty is finished.", 800],
    ["We are in 2 Kings 6 through 9.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings2(6, 1, 23, [
      "It starts with nothing. A borrowed axe head flies into the Jordan, and the young prophet cries out, alas master, for it was borrowed. Elisha doesn't lecture him about carelessness. He cuts a stick, throws it in, and makes the iron swim.",
      "Then the war widens. The king of Syria keeps setting ambushes, and Elisha keeps warning Israel's king exactly where they are, until Syria sends a whole army by night to surround one man in Dothan.",
      "Elisha's servant sees the horses and chariots ringing the city and panics. Elisha prays not for rescue but for sight. Lord, open his eyes. And the servant sees the mountain full of fire all around them. It was already there. He just couldn't see it yet.",
      "God strikes the Syrian army blind, and Elisha walks them straight into Samaria before opening their eyes again. Then instead of killing them, he tells the king to feed them and send them home. And the bands of Syria came no more into the land of Israel. Mercy did what the sword couldn't.",
    ]),
    kings2(6, 24, 33, [
      "Peace doesn't last. Ben-hadad gathers his whole army and lays siege to Samaria until a donkey's head sells for eighty pieces of silver and a handful of dove's dung goes for five. People are eating what they'd normally step over.",
      "A woman cries out to the king on the wall, and what she wants isn't bread. She and another woman agreed to boil their sons and eat them, one today, one tomorrow. They ate hers. Now the other woman has hidden her son instead of keeping the bargain.",
      "The king tears his clothes right there on the wall, and underneath is sackcloth he's been wearing against his own skin the whole time. Grief and control, layered on top of each other, hidden until this moment.",
      "He blames Elisha for the famine and sends a man to take his head. This is a king so undone by what he's watched a mother do that he needs someone, anyone, to be responsible for it.",
    ]),
    kings2(7, 1, 11, [
      "Elisha answers the death threat with a prophecy. Tomorrow about this time, a measure of fine flour will sell for a shekel at the gate of Samaria. Impossible relief, promised for tomorrow, to a city eating its own children today.",
      "A lord on whose hand the king leans doesn't believe it. If the Lord would make windows in heaven, might this thing be. Elisha tells him he'll see it happen and not get to eat any of it.",
      "Four men with leprosy are sitting outside the gate, already treated as good as dead by the famine. Why sit we here until we die, they say, and decide the Syrian camp can't kill them any worse than starving will.",
      "They walk in expecting arrows and find the camp empty. Tents standing, food out, silver and gold left behind. God had made the Syrians hear a noise of chariots and horses and they ran in the night, leaving everything, convinced a whole army was coming for them.",
    ]),
    kings2(7, 12, 20, [
      "The four men eat, hide silver in one tent, then stop themselves. We do not well. This day is a day of good tidings, and we hold our peace. Men who had nothing left to lose are the ones who decide the city needs to know first.",
      "The king suspects a trap and sends scouts, who follow a trail of garments and vessels the Syrians threw away in their haste, all the way to the Jordan. The empty camp was real.",
      "So the people rush out and plunder it, and a measure of flour does sell for a shekel at the gate, exactly as Elisha said, on exactly the day he said it.",
      "And the lord who doubted is put in charge of the gate, where the starving crowd tramples him to death rushing through. He saw the flour with his own eyes and never got to eat it. Word for word, as the man of God had spoken.",
    ]),
    kings2(8, 1, 29, [
      "The Shunammite woman, whose son Elisha once raised from the dead, comes home from seven years in Philistine country to find her land taken. By coincidence, the king is asking Gehazi to tell him about Elisha's miracles at the exact moment she walks in to beg for her house back. Her whole land is restored, plus everything it earned while she was gone.",
      "In Damascus, Ben-hadad is sick and sends Hazael to ask Elisha if he'll recover. Elisha stares at Hazael until Hazael is ashamed, then weeps, because he can see what Hazael will do to Israel. Hazael goes home, soaks a cloth in water, and smothers the king in his own bed. Is thy servant a dog, he'd asked. He becomes exactly that kind of man.",
      "In Judah, Jehoram marries into Ahab's family and walks in the way of the kings of Israel, and only David's sake keeps the LORD from wiping Judah out entirely. His son Ahaziah does the same, because his mother is Athaliah, Ahab's own daughter. The rot in the north has married straight into the south.",
      "Ahaziah joins Joram, king of Israel, in a war against the very Hazael that Elisha wept over. Joram is wounded and goes to Jezreel to recover, and Ahaziah goes down to visit him there. Two kings, both from Ahab's tangled family line, sitting in the same city, about to run out of time.",
    ]),
    kings2(9, 1, 13, [
      "Elisha sends a young prophet to Ramoth Gilead with one job. Find Jehu, get him alone in an inner chamber, pour the oil, and run. Don't stay for the conversation.",
      "The oil goes on Jehu's head with a sentence attached. Thou shalt smite the house of Ahab, that I may avenge the blood of my servants the prophets at the hand of Jezebel. The dogs shall eat Jezebel in the portion of Jezreel. Then the young man opens the door and flees, just as told.",
      "Jehu comes out shaken, and his fellow officers ask what the mad fellow wanted. When he tells them, they don't hesitate. They strip off their own garments, spread them under his feet on the bare steps, and blow the trumpet. Jehu is king.",
      "There's no ceremony, no waiting period. A coup announced on borrowed cloaks in the space of one conversation.",
    ]),
    kings2(9, 14, 37, [
      "Jehu rides for Jezreel so hard that the watchman on the tower can identify him from a distance by nothing but his driving. The driving is like the driving of Jehu the son of Nimshi, for he driveth furiously. Joram rides out to meet him and asks, is it peace. What peace, Jehu says, so long as the whoredoms of thy mother Jezebel are so many. Then he draws his bow and kills Joram in the exact field that once belonged to Naboth, the man Ahab and Jezebel murdered for it.",
      "Ahaziah of Judah flees and is struck down too, dying at Megiddo, caught in a war that was never his to begin with, just for visiting a dying relative at the wrong time.",
      "Jezebel hears Jehu is coming and doesn't run. She paints her eyes, arranges her hair, and looks out the window to meet him with her own kind of defiance. Had Zimri peace, who slew his master, she calls down. Jehu doesn't answer her. He asks who's on his side, and her own eunuchs throw her down at his word.",
      "Jehu eats a meal before he even orders her buried, and by the time anyone goes to bury her, the dogs have already eaten her, exactly as Elisha said in the vineyard that used to belong to Naboth. They find nothing left but her skull, her feet, and the palms of her hands.",
    ]),
  ],
  closing: [
    ["So that is Day 89.", 700],
    ["An axe head floats, an army goes blind and gets fed instead of killed, and a siege ends in cannibalism before it ends in relief.", 800],
    ["Then Hazael smothers a king with a wet cloth, and Jehu rides into Jezreel so hard everyone knows his name before he arrives.", 800],
    ["Two kings die in an afternoon. Jezebel dies exactly where Elisha's word said she would, in the field Ahab stole from a man named Naboth.", 850],
    ["Notice who moves through this whole chapter unseen until the very end. Not armies. Not kings. A word, spoken years earlier, finally landing.", 850],
    ["The four lepers get one line that's worth keeping. We do not well to keep silent about good news.", 800],
    ["Tomorrow, 2 Kings 10 through 13. Jehu keeps going, and Israel keeps sliding anyway.", 800],
    ["For now, sit with the mercy in chapter six.", 750],
    ["An army at Israel's mercy, alive.", 750],
    ["Fed, and sent home in peace.", 1200],
  ],
};
