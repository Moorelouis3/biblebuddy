import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 75, written to the Day 1 standard.
 *
 * 1 Samuel 27-30 closes out David's fugitive years: he survives by moving in
 * with the Philistines and lying to stay alive, Saul raises Samuel's ghost to
 * hear his own death sentence, and Ziklag burns to the ground before David
 * recovers everything he lost. Six blocks across four chapters, matching Day
 * 74's shape.
 */

const sam = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "1 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 75,
  title: "David in Exile",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 75. David has been running so long he moves in with the enemy.", 750],
    ["Saul, meanwhile, is out of answers. No word from God, no prophet left alive who'll speak straight to him.", 800],
    ["So he goes looking for one anyway, in the one place he outlawed.", 800],
    ["Today has a spy's double life, a raised ghost, a burned city, and a king who already knows how he dies.", 850],
    ["We are in 1 Samuel 27 through 30.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sam(27, 1, 12, [
      "David has been running so long he starts to believe the worst thing he can imagine. He says it to himself: one day Saul is going to kill me. Better to run to the enemy than wait for that.",
      "So the man God anointed to be king of Israel goes and lives among the Philistines for over a year, and it works. Saul stops looking for him entirely.",
      "But look at what that safety costs. David raids towns and leaves no one alive to tell Achish who he really attacked. He never lies to God in this chapter. He lies constantly to the king protecting him.",
      "Achish believes every word, and thinks David has made himself hated by his own people for good. David is buying his life with silence and slaughter, in a chapter that never once mentions God.",
    ]),
    sam(28, 1, 14, [
      "This chapter opens with a trap quietly being set. Achish tells David he's expected to fight beside him against Israel. Keep that thread hanging. It matters soon.",
      "Samuel is dead. Saul is out of options. He asks God and gets nothing back, not a dream, not a priest, not a prophet. Silence is its own kind of answer.",
      "So the king who once outlawed mediums puts on a disguise and goes looking for one in the dark. The same law he enforced, he's now breaking to get what he wants.",
      "The moment Samuel actually appears, the medium screams. She wasn't expecting this to work. Whatever she normally does, this isn't it. Something real just happened, and it terrifies her.",
    ]),
    sam(28, 15, 25, [
      "Samuel doesn't comfort Saul. He asks why he was disturbed, then hands him the same verdict from years back. The kingdom is torn from you and given to David, because you would not finish what God told you to do.",
      "Then Samuel adds tomorrow to it. You and your sons will be with me. Not might. Will. Saul went looking for a word from God and got the last one he ever wanted to hear.",
      "He falls flat on the ground with no strength left, and it isn't only fear. He hasn't eaten all day. His body is failing right alongside everything else.",
      "And here's the strange mercy tucked into this chapter. A woman he came to for forbidden magic ends up feeding him like a mother would, hours before his death. Even here, kindness shows up that he didn't ask for and didn't earn.",
    ]),
    sam(29, 1, 11, [
      "Remember the trap building in the last chapter? Here's the release. The Philistine commanders take one look at David and refuse to let him march with them. What if he turns on us mid-battle to win back his old master's favor?",
      "They even quote the song written about him. Saul has slain his thousands, David his ten thousands. His own reputation, earned fighting for Israel, is what saves him from having to fight against Israel.",
      "David objects, and it's worth noticing how it sounds. What have I done, that I can't go fight the enemies of my lord the king? He's playing the loyal servant to a Philistine king he's been quietly betraying for over a year.",
      "Achish sends him home anyway, still convinced David is a good man. God moved through the very people David had been deceiving, to keep him off a battlefield against Israel. David never had to choose. The choice got made for him.",
    ]),
    sam(30, 1, 20, [
      "David comes home to ashes. Ziklag burned, wives and children gone, and his own men, sick with grief, start talking about stoning him. Everyone he protected turns on him at once.",
      "And here's the line worth carrying out of this chapter. David encouraged himself in the Lord his God. No prophet this time. No friend like Jonathan. He has to find strength with nobody but God to hand it to him.",
      "Then he does what he always does when the ground shifts under him. He asks before he moves. Shall I pursue? Will I overtake them? And God answers plainly. Pursue. You will recover all.",
      "An abandoned Egyptian slave, left to die by the very raiders David is chasing, becomes the map that finds them. God uses the enemy's own cast-off to hand David everything back.",
    ]),
    sam(30, 21, 31, [
      "David gets everything back. Wives, children, flocks, nothing lacking. Then almost immediately, his own men start fighting over who deserves a share of it.",
      "Some want to cut out the two hundred who were too exhausted to cross the brook and finish the chase. David won't have it. The share of the man who guarded the supplies is the same as the man who fought. What the Lord gave, nobody earned alone.",
      "He turns that into a permanent law in Israel, not just a one-time call. A future king starts governing before he's even crowned.",
      "Then he sends gifts from the plunder to the elders of Judah, people who never knew he'd been protecting them from the Amalekites this whole time. The same hands that lied to Achish for a year just quietly bought Judah's loyalty.",
    ]),
  ],
  closing: [
    ["So that is Day 75.", 700],
    ["David survived by lying to everyone except God.", 750],
    ["Saul got the one answer he never wanted, from a prophet he had to raise from the dead to hear it.", 800],
    ["And when David lost everything at Ziklag, he had nobody left to lean on but the Lord himself. So that's exactly what he did.", 850],
    ["Notice what he never once did across these four chapters. He never took the throne by force, even in a hunted, homeless year with a price on his life.", 850],
    ["Tomorrow, 1 Samuel 31 and 2 Samuel 1 through 3. Saul's story ends on a mountain, and David's kingdom finally begins.", 850],
    ["For now, hold onto David's line at the brook.", 750],
    ["He encouraged himself in the Lord his God.", 800],
    ["Nobody else was going to.", 1200],
  ],
};
