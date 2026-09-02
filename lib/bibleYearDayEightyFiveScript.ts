import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 85, written to the Day 1 standard.
 *
 * 1 Kings 12-15: Solomon's kingdom splits in one bad answer, Jeroboam
 * answers a real threat with two golden calves, a prophet's obedience gets
 * tested by a lying old man and a lion, and four kings — two in Israel, two
 * in Judah — get measured against the same standard. Seven blocks across
 * four chapters, matching the shape Day 84 used for the temple chapters.
 */

const kings = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "1 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 85,
  title: "The Kingdom Divides",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 85. One bad answer costs Solomon's son ten of Israel's twelve tribes.", 750],
    ["Rehoboam had older men telling him to go easy on the people. He listened to his friends instead.", 800],
    ["By the end of these four chapters, two kingdoms exist where there used to be one, a king's hand withers at his own altar, and a lion kills a prophet for one bite of bread he wasn't supposed to eat.", 850],
    ["It's a hard, strange stretch of Scripture. Stay with it.", 900],
    ["We are in 1 Kings 12 through 15.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings(12, 1, 15, [
      "Rehoboam has one question in front of him — will you lighten the load your father put on us — and two sets of advisors give him opposite answers.",
      "The old men who'd stood before Solomon say: serve this people today, and they'll serve you forever. The young men who grew up with Rehoboam say the opposite — answer them harder than your father did.",
      "Rehoboam picks the friends who talk like him over the men who actually watched a kingdom get built. My little finger will be thicker than my father's loins. My father chastised you with whips; I will chastise you with scorpions.",
      "Verse fifteen says it plainly: the king wouldn't listen, because this was from the Lord, to bring about the word he'd already spoken to Jeroboam through Ahijah. Rehoboam thought he was picking an image. He was fulfilling a prophecy he'd never even heard.",
    ]),
    kings(12, 16, 33, [
      "The people's answer is instant and total. What portion do we have in David? To your tents, O Israel. Ten tribes walk away in one afternoon.",
      "Rehoboam sends his labor boss to reason with them, and they stone him to death in the road. That's the temperature. Rehoboam barely makes it back to his own chariot alive.",
      "He raises an army to force the ten tribes back, and a prophet named Shemaiah stops him with one line: this thing is from me, return home. Remarkably, they listen.",
      "Jeroboam gets the kingdom, and immediately turns a political worry into a theological one. If the people keep going to Jerusalem to worship, they'll want their old king back. So he builds two golden calves and says the exact words spoken at Sinai: behold your gods, which brought you up out of Egypt. He knows that story. He repeats the sin anyway.",
    ]),
    kings(13, 1, 10, [
      "While Jeroboam is standing at his own altar burning incense, a stranger walks in and names a king who won't be born for three hundred years. Josiah, by name. Scripture doesn't wait to see if history matches. It says it in advance.",
      "Jeroboam points at him and orders his arrest, and his own arm freezes in the air. Not the prophet's. The king's hand, stuck reaching out, unable to pull back.",
      "Jeroboam asks the man he just tried to have seized to pray for him, and the man does, and the hand comes back. Mercy, from the very person he tried to arrest.",
      "Then Jeroboam offers him a meal and a reward, and the man of God turns it down flat, because God had already told him: eat no bread, drink no water, don't go back the way you came. A clear instruction. Watch what happens to it next.",
    ]),
    kings(13, 11, 34, [
      "An old prophet in Bethel hears what happened and rides after the man, finds him sitting under a tree, and lies to his face — an angel told me to bring you back. He never checked. He just said what would work.",
      "The man of God believes him, and goes back, and eats the bread and drinks the water he was told never to touch. One clear word from God, undone by one confident stranger.",
      "While he's still at the table, the same old prophet who just lied to him speaks a true word over him — because you disobeyed, your body will not reach your own family's grave. He deceived him and pronounced judgment on him in the same sitting.",
      "A lion kills him on the road home, and then does something a hungry lion doesn't do. It doesn't eat him, and it doesn't touch the donkey. It just stands there, guarding the body, until someone comes to bury him.",
    ]),
    kings(14, 1, 20, [
      "Jeroboam's son gets sick, and Jeroboam sends his wife in disguise to the prophet Ahijah, hoping a stranger will get a better answer than a king would. Ahijah is blind by now. He recognizes her by the sound of her feet at the door.",
      "The word he gives her is brutal — I will cut off the house of Jeroboam, every male, the way you scrape dung off a plate until nothing's left. God is not vague about how this ends.",
      "But one line inside the judgment doesn't fit the rest. This one child alone will be buried and mourned, because in him alone, out of Jeroboam's whole house, is found some good thing toward the Lord. God notices the one decent thing in a rotten family, even while ending it.",
      "The boy dies the moment his mother's foot crosses the threshold, exactly as spoken. Twenty-two years later, Jeroboam is dead too. The man handed ten tribes for free spent every one of those years building golden calves instead of trusting the God who gave them to him.",
    ]),
    kings(14, 21, 31, [
      "Meanwhile in Jerusalem, Rehoboam isn't doing any better. Judah builds high places and sacred poles on every hill and under every green tree, doing the very things the nations before them did.",
      "In his fifth year, Pharaoh Shishak marches up and strips the temple and the palace bare, including the gold shields Solomon made. Everything Solomon spent decades collecting, gone in one raid.",
      "Rehoboam replaces them with bronze, and keeps them locked in the guard chamber, brought out only when he walks into the temple, then put straight back. A fake standing in for the real thing that got taken away — that's Judah's whole story for the next few chapters, in one object.",
      "There is war between Rehoboam and Jeroboam every single day of their reigns. Two kingdoms that used to be one family, permanently at war with each other.",
    ]),
    kings(15, 1, 34, [
      "Abijam reigns three years, copying his father's sins exactly, but God still keeps a lamp burning in Jerusalem, for David's sake. Mercy that's leftover from a promise, not earned by Abijam.",
      "Then Asa takes over and does something nobody has done since Solomon's early years — right in the sight of the Lord. He removes the idols, and even strips his own mother of her title as queen because she'd built a shrine, and burns it himself at the brook Kidron.",
      "Even Asa, the best king so far, leaves the high places standing. Scripture says so plainly instead of pretending its heroes finish every job. And when Baasha of Israel threatens to choke off Judah, Asa strips the temple treasury to pay a foreign king to attack his own countrymen — buying a war against family with gold that was supposed to belong to God.",
      "Meanwhile in Israel, Baasha wipes out every last person in Jeroboam's house, word for word what Ahijah said back at that sick child's bedside. Even a man grabbing power for himself ends up finishing God's sentence.",
    ]),
  ],
  closing: [
    ["So that is Day 85.", 700],
    ["One kingdom becomes two. A king's hand withers and is restored. A lion kills a prophet for one bite of bread he wasn't supposed to eat.", 800],
    ["Every king in these four chapters gets measured against the same person — did he do right, like David, or did he walk in the way of Jeroboam.", 800],
    ["Rehoboam lost ten tribes over pride. Jeroboam kept them by building golden calves. Both men had God's own word in front of them and chose something else instead.", 850],
    ["And in the middle of all that failure, God keeps doing small, specific things nobody asked for. A lamp for David's sake. A child buried with honor because he had one good thing in him.", 850],
    ["Asa is the first real relief in this stretch — a king who tears down his own mother's idol. Even he leaves work unfinished.", 800],
    ["Tomorrow, 1 Kings 16 through 19. Elijah shows up, and idolatry in Israel gets a name: Ahab.", 800],
    ["For now, hold on to the lion.", 750],
    ["It didn't eat the body.", 700],
    ["It just stood there and guarded it.", 1200],
  ],
};
