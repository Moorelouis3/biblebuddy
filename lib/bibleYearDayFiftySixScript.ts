import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 56, written to the Day 1 standard.
 *
 * Deuteronomy 34 closes the Torah: Moses views the whole land from Nebo,
 * dies there, and is buried by God in a grave no one has ever found. Joshua
 * 1-3 opens the next book in a completely different key - Joshua charged
 * to lead, the two and a half tribes pledging loyalty, the spies hidden by
 * Rahab in Jericho, and Israel crossing the Jordan on dry ground behind the
 * ark. Six blocks across the two books, matching the shape Day 47 used for
 * the Numbers-to-Deuteronomy turn.
 */

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const josh = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Joshua ${chapter}:${startVerse}-${endVerse}`,
  book: "joshua",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 56,
  title: "Moses Dies and Joshua Leads",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 56. Everything changes today.", 750],
    ["Moses climbs one more mountain, and this time he does not come back down.", 800],
    ["Then the man who has spent his whole life a step behind Moses has to become the one everyone follows instead.", 800],
    ["A funeral, a charge, two spies in an enemy city, and a river that stops moving. All in one day's reading.", 850],
    ["We are in Deuteronomy 34 and Joshua 1 through 3.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    deut(34, 1, 12, [
      "Moses climbs Pisgah alone, and God shows him the whole land from that one mountain. Gilead, Naphtali, Ephraim, Manasseh, Judah, all the way to the sea, down to Zoar.",
      "Then the line that has to hurt. I have caused thee to see it with thine eyes, but thou shalt not go over thither. Forty years walking toward this, and God only lets him look.",
      "Moses dies there, and God buries him himself. No man knoweth of his sepulchre unto this day. No monument. No grave anyone could turn into a shrine.",
      "The last thing said about him is not a eulogy about failure. His eye was not dim, nor his natural force abated. And there has not risen a prophet since like him, one the LORD knew face to face.",
    ]),
    josh(1, 1, 9, [
      "The book opens with no pause to grieve. Moses my servant is dead. Now therefore arise. Joshua is not even given a full sentence to feel the loss before the next line comes.",
      "God hands him one promise, word for word, that used to belong to Moses. As I was with Moses, so I will be with thee. Same presence. New name attached to it.",
      "Be strong and of a good courage gets said three separate times in nine verses. Not because the text shows Joshua flinching. Because leading this exact people into this exact land is going to cost him that, over and over.",
      "And the charge is not about strategy. This book of the law shall not depart out of thy mouth. Whatever happens at Jericho starts with what Joshua says to himself long before it.",
    ]),
    josh(1, 10, 18, [
      "Joshua's first move as leader is not a speech. It is logistics. Prepare food, three days, get ready to cross. The next practical step, nothing more.",
      "Then he turns to the tribes who already have land east of the Jordan and reminds them of the deal they made with Moses. Cross armed with everyone else first. Settle after.",
      "Their answer is the real evidence of what kind of leader they think he might be, before he has led anything yet. All that thou commandest us we will do, and whithersoever thou sendest us, we will go.",
      "Then one more line, half blessing and half open question. Only the LORD thy God be with thee, as he was with Moses. They are hoping he is the real thing. Nobody knows yet.",
    ]),
    josh(2, 1, 14, [
      "Joshua sends two spies into Jericho, and of every house in that city, they end up in Rahab's. A prostitute's house, built into the city wall.",
      "The king's men come asking for them by name, and she lies without hesitating, then hides the two men under flax stalks on her own roof.",
      "What she says next is the real turn in the story. I know that the LORD hath given you the land. She heard about the Red Sea and Sihon and Og from outside the covenant entirely, and it convinced her before Israel ever reached her gate.",
      "So she asks for one thing in return, and it is not gold and it is not just her own life. Save alive my father, and my mother, and my brethren. She is already thinking about everyone she loves.",
    ]),
    josh(2, 15, 24, [
      "The spies agree, on one condition. A scarlet cord tied in the same window she lowers them through, and everyone she loves gathered under that roof when the attack comes.",
      "She lets them down by a rope, tells them exactly where to hide from the men chasing them, and they wait three days in the hills until it is safe to move.",
      "She ties the scarlet line in the window right then, with no proof yet that any of it will matter. Faith acted on before the outcome is visible.",
      "The spies get back to Joshua and say one confident line. Truly the LORD hath delivered into our hands all the land. A prostitute in an enemy city just told two spies what forty years in the wilderness could not get the last generation to believe.",
    ]),
    josh(3, 1, 17, [
      "Three days later Israel moves to the Jordan's edge, and the plan is strange. Follow the ark, but stay two thousand cubits back. Nobody has walked this road before. The ark goes first.",
      "Joshua tells the priests to carry it straight into the river at flood stage, before there is any sign the water will do anything. They walk in on faith, not onto a path that is already dry.",
      "Then it happens. The water stops far upstream, and the priests stand on dry ground in the middle of the Jordan while the whole nation crosses in front of them.",
      "God explains the point of the miracle before it even happens. That they may know that, as I was with Moses, so I will be with thee. Not proof for Joshua alone. Proof for everyone watching him lead for the first time.",
    ]),
  ],
  closing: [
    ["So that is Day 56.", 700],
    ["Moses saw the whole land from one mountain, and was buried by God himself in a grave nobody has ever found.", 800],
    ["Joshua stood up before he had time to grieve, because the people needed someone leading them by the very next morning.", 800],
    ["A prostitute in Jericho believed what a whole generation of Israelites in the wilderness never could. The LORD hath given you the land.", 850],
    ["And the Jordan stopped moving before Israel's feet ever touched dry ground. The proof came after the priests stepped into the water, not before.", 850],
    ["Tomorrow, Joshua 4 through 7. Memorial stones, the fall of Jericho, and a man named Achan.", 850],
    ["For now, sit with what God told Joshua at the river.", 800],
    ["As I was with Moses, so I will be with thee.", 750],
    ["The presence moves forward. Even when the man does not.", 1200],
  ],
};
