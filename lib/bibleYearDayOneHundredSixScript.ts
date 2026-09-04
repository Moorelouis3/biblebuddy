import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 106, written to the Day 1 standard.
 *
 * 2 Chronicles 20-23 covers Jehoshaphat's finest hour and his next mistake,
 * then two evil, short-lived kings, then the six years a stolen baby spent
 * hiding in the temple while a queen thought she had erased the whole
 * house of David. Six blocks, covering all four chapters in order.
 */

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 106,
  title: "Worship in Battle and Joash Preserved",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 106. Jehoshaphat is about to win a war without swinging a single sword.", 750],
    ["Then, one chapter later, he makes almost the exact mistake he was just rebuked for.", 800],
    ["His son murders his own brothers to secure the throne. His grandson dies in someone else's purge.", 800],
    ["And a queen tries to wipe out the entire royal line, except one baby gets hidden in the temple for six years.", 850],
    ["We are in 2 Chronicles 20 through 23.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron2(20, 1, 19, [
      "Moab, Ammon, and others march on Jehoshaphat, and this time he does not reach for gold or a foreign king. He is afraid, and he sets himself to seek the Lord, and proclaims a fast across all Judah.",
      "His prayer names exactly what he does not have. We have no might against this great company that cometh against us, neither know we what to do, but our eyes are upon thee. That is not a battle plan. That is surrender with your eyes open.",
      "The Spirit of the Lord falls on a Levite named Jahaziel, standing in the middle of the crowd with everyone's wives and children watching, and he says, be not afraid nor dismayed, for the battle is not yours, but God's. Ye shall not need to fight in this battle. Set yourselves, stand ye still, and see the salvation of the Lord.",
      "Jehoshaphat bows his face to the ground, and the whole nation falls down and worships. They praise God before they have seen a single result. The worship comes before the win, not after it.",
    ]),
    chron2(20, 20, 30, [
      "Morning comes, and Jehoshaphat sends singers out ahead of the army instead of soldiers. Praise the Lord, for his mercy endureth for ever. That is the battle cry.",
      "The moment they begin to sing, the Lord sets ambushments against the invading armies, and they turn on each other and destroy one another. Judah never swings a weapon.",
      "When Judah reaches the field, there is nothing left but dead bodies. It takes three days to gather the spoil, because there is too much of it to carry. They name the place the valley of Berachah, valley of blessing, because that is where they stopped to bless the Lord.",
      "Fear falls on every kingdom nearby, and Jehoshaphat's realm goes quiet, for his God gave him rest round about. An entire national crisis, ended by people who never drew a sword.",
    ]),
    chron2(20, 31, 37, [
      "Chronicles sums up the reign. He walked in the way of Asa his father, and did that which was right in the sight of the Lord - though the high places stayed, because the people had not yet prepared their hearts either.",
      "Then, after all of that, he joins himself with Ahaziah king of Israel, who did very wickedly, to build a fleet of ships together at Ezion-geber.",
      "A prophet named Eliezer tells him plainly. Because thou hast joined thyself with Ahaziah, the Lord hath broken thy works. And the ships break apart before they ever sail.",
      "The same king who just watched God win an entire war with nothing but singers ties himself to the wrong ally one chapter later. Trusting God well once does not mean the lesson never needs relearning.",
    ]),
    chron2(21, 1, 20, [
      "Jehoshaphat dies, and his son Jehoram takes the throne, and the first thing he does is kill every one of his own brothers with the sword to secure it.",
      "He marries Ahab's daughter and walks in the way of the house of Ahab, doing evil in the sight of the Lord. Chronicles says the Lord would not destroy the house of David only because of the covenant he had made with David.",
      "Edom revolts. Libnah revolts. And Elijah sends him a written letter while he is still alive. Because thou hast not walked in the ways of Jehoshaphat or Asa, but hast slain thy brethren, better than thyself, the Lord will smite thy people, thy wives, thy goods, and thee with a disease of the bowels until thy bowels fall out.",
      "Two years later, that is exactly how he dies. His own people make no burning for him, unlike his fathers, and he is buried in the city of David but not among the kings. He departed, Chronicles says, without being desired.",
    ]),
    chron2(22, 1, 12, [
      "Ahaziah becomes king only because raiders killed off his older brothers, and he walks the same road his father did, because his mother Athaliah is his counselor toward wickedness.",
      "He rides to war alongside Israel's king at Ramoth-gilead, and while visiting him wounded in Jezreel, gets swept into Jehu's purge of the house of Ahab and dies with him. Chronicles states it plainly. The destruction of Ahaziah was of God, by his coming to Joram.",
      "When Athaliah, his mother, sees her son is dead, she does not grieve. She rises and destroys the entire royal seed of Judah herself, to hold the throne for herself alone.",
      "But Jehoshabeath, Ahaziah's sister, steals one baby, Joash, along with his nurse, and hides them in a bedchamber and then in the house of God itself, for six years, while Athaliah reigns believing the line of David is finished.",
    ]),
    chron2(23, 1, 21, [
      "In the seventh year, Jehoiada the priest strengthens himself and brings the Levites and the family heads into a covenant to bring the hidden boy out at last.",
      "He arms the guard with David's own spears and shields, kept for generations in the house of God, stations men through the whole temple, and brings out the king's son, sets the crown on him, and anoints him. God save the king.",
      "Athaliah hears the noise, comes into the temple, sees the boy standing at his pillar, and tears her clothes screaming treason - the one true accusation nobody expected her, of all people, to be right about. Jehoiada has her taken outside and killed, refusing to let blood be shed inside the Lord's house.",
      "Then the people go straight to the house of Baal, tear it down, and kill its priest at his own altars. The line of David that Athaliah tried to erase survives because one woman hid a baby, and the city goes quiet again once the throne is finally where it belonged.",
    ]),
  ],
  closing: [
    ["So that is Day 106.", 700],
    ["Jehoshaphat wins a war with singers instead of soldiers, then loses a fleet of ships by trusting the wrong ally.", 750],
    ["Jehoram kills his own brothers for a throne he then loses to disease, unmourned by his own people.", 800],
    ["And Athaliah nearly erases the entire house of David in one afternoon, except a sister hides a baby in a bedroom, and then in the temple itself, for six years.", 850],
    ["Notice what saved the promise both times. Not a king, not an army. A word from a Levite in a crowd, and one woman's decision nobody saw happen.", 850],
    ["Tomorrow, 2 Chronicles 24 through 27. The boy from the temple grows up, and his own story does not stay simple either.", 850],
    ["For now, hold on to what Jahaziel told a frightened nation.", 800],
    ["The battle is not yours.", 750],
    ["It is God's.", 1200],
  ],
};
