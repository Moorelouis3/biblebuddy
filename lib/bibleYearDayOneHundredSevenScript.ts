import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 107, written to the Day 1 standard.
 *
 * 2 Chronicles 24-27 runs the same shape three times in a row - a king who
 * starts right, gets strong, and forgets who made him strong - before
 * Jotham breaks the pattern in the fourth chapter. Seven blocks, one per
 * natural scene, covering all four chapters in order.
 */

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 107,
  title: "Faithfulness and Forgetting God",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 107. Every king in today's reading starts well.", 750],
    ["One after another, they lose it. Except for the last one.", 800],
    ["Joash rebuilds the temple, then kills the prophet who confronts him.", 800],
    ["Amaziah wins a war, then bows down to the gods of the people he just beat.", 800],
    ["Uzziah becomes one of Judah's strongest kings, then can't stand being told no.", 850],
    ["We are in 2 Chronicles 24 through 27.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron2(24, 1, 16, [
      "Joash becomes king at seven years old, guided the whole time by Jehoiada the priest. Chronicles is careful to say it: Joash did right all the days of Jehoiada.",
      "He wants the temple repaired, and when the Levites drag their feet, he doesn't wait on them. He sets a chest at the gate and lets the whole nation give directly.",
      "It works. Money pours in faster than they can spend it, and the house of God gets fixed, strengthened, and filled with new vessels for worship.",
      "None of this was Joash's idea alone. He was raised inside it. That matters for what happens the moment the man who raised him is gone.",
    ]),
    chron2(24, 17, 27, [
      "Jehoiada dies at a hundred and thirty and is buried among the kings, the only priest in Chronicles given that honor. Within one verse, everything changes.",
      "The princes come and bow to Joash, and this time he listens to them. Judah leaves the house of the Lord and goes back to serving the very groves and idols Jehoiada spent his life clearing out.",
      "God sends prophets, and they testify, and nobody listens. Then Zechariah, Jehoiada's own son, stands up and says it plainly. Why transgress the commandments of the Lord, that ye cannot prosper?",
      "Joash has him stoned to death in the court of the temple his own father rebuilt. The boy Jehoiada raised just killed Jehoiada's son. Within the year, Joash is dead too, murdered in his own bed by his own servants.",
    ]),
    chron2(25, 1, 14, [
      "Amaziah becomes king next, and Chronicles gives him a strange line up front. He did right, but not with a perfect heart. Watch for what that means.",
      "He hires a hundred thousand mercenaries from Israel, and a man of God tells him to send them home, because the Lord is not with Israel. Amaziah asks about the silver he already paid. The answer comes back: the Lord is able to give thee much more than this.",
      "He obeys, sends them home, and wins a brutal victory over Seir. Ten thousand killed in battle, ten thousand more thrown off a cliff.",
      "Then, fresh off a battle God clearly won for him, he comes home carrying the gods of the very people he just destroyed, sets them up, and bows down and burns incense to them.",
    ]),
    chron2(25, 15, 28, [
      "A prophet asks the obvious question. Why seek after gods that could not even save their own people out of your hand? Amaziah cuts him off. Since when were you the king's counselor? Stop, before I have you killed.",
      "The prophet stops, but not before saying God has already determined to destroy him for this. Then, proud from beating Edom, Amaziah picks a fight with Israel's king, who answers with a story about a thistle that tried to marry into a cedar's family and got trampled by a passing animal instead.",
      "Amaziah won't hear it, and Chronicles tells you exactly why he can't. It came of God, that he might deliver them into their enemies' hand, because they had sought after the gods of Edom. Judah is crushed, Jerusalem's wall is broken down, the temple stripped.",
      "He lives fifteen more years after that, but a conspiracy finally catches up to him, and he's hunted down and killed at Lachish. Same pattern as Joash. A king who did right, then bowed down to something smaller than the God who had just handed him a win.",
    ]),
    chron2(26, 1, 15, [
      "Uzziah becomes king at sixteen, and as long as Zechariah is alive to teach him, he seeks God, and God makes him prosper. That's the deal Chronicles keeps putting in front of you.",
      "He breaks down enemy walls, builds towers in the desert, digs wells, and Chronicles even bothers to mention he loved farming. Three hundred and seven thousand five hundred men serve under him, armed like nothing Judah has fielded in generations.",
      "He builds engines for the towers, made to shoot arrows and stones. His name spreads all the way to Egypt.",
      "Chronicles says it outright. He was marvelously helped, till he was strong. Read that again. Helped, until he was strong. The help is what got him there. Watch what strength does to him next.",
    ]),
    chron2(26, 16, 23, [
      "When he was strong, his heart was lifted up to his destruction. He walks into the temple to burn incense himself, a job that belongs only to the priests.",
      "Eighty priests stand up to him and tell him to leave. While he is raging at them, censer still in his hand, leprosy breaks out on his own forehead, right there in front of all of them.",
      "They thrust him out of the building he just tried to walk into like he owned it, and he hurries out himself once he feels what has happened to him.",
      "He lives out his life quarantined in a separate house, cut off from the temple, while his son Jotham runs the kingdom in his place. The most powerful king Judah had seen in generations dies alone.",
    ]),
    chron2(27, 1, 9, [
      "Jotham takes the throne next, and Chronicles gives him something none of the last three kings kept. A clean report.",
      "He did right, just like his father did. But there's one line added just for him. He entered not into the temple of the Lord. He watched exactly what his father's pride cost him, and he never went near it.",
      "The Ammonites pay him tribute for three straight years without a fight. Chronicles gives you the reason in one sentence. He became mighty, because he prepared his ways before the Lord his God.",
      "No downfall recorded. No leprosy, no conspiracy, no stoning in the courtyard. Just a king who remembered what the last three forgot.",
    ]),
  ],
  closing: [
    ["So that is Day 107.", 700],
    ["Four kings, three of them running the same shape. Start right. Get strong. Forget who made you strong.", 750],
    ["Joash rebuilds the temple, then kills the priest's son in its own courtyard.", 800],
    ["Amaziah wins a war God handed him, then worships the gods of the men he just beat.", 800],
    ["Uzziah gets helped until he is strong, then can't stand being told he isn't a priest.", 800],
    ["And then Jotham. Same title as the other three, same start. But nothing goes wrong. He just keeps preparing his ways before the Lord.", 850],
    ["Tomorrow, 2 Chronicles 28 through 31. Ahaz nearly ruins everything, and Hezekiah spends the rest of the day cleaning it up.", 850],
    ["For now, hold on to that one line about Uzziah.", 800],
    ["He was helped, until he was strong.", 750],
    ["Strength was never his. It was lent to him.", 1200],
  ],
};
