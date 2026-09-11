import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 172, written to the Day 1 standard.
 *
 * Psalms 130-132: a cry from the bottom of a pit, a king who stopped
 * grasping at things too big for him, and David's vow to find God a house,
 * answered by a bigger vow back. Five blocks, split by psalm the way Day
 * 169 through Day 171 were.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 172,
  title: "Waiting, Forgiveness, and David's Promise",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 172. Yesterday ended with a back that would not break.", 750],
    ["Today opens somewhere lower than that. A man crying up from the bottom of a pit.", 800],
    ["Then a heart that has stopped fighting to be great.", 750],
    ["Then a king who would not sleep until God had a house.", 800],
    ["We are in Psalms 130, 131, and 132.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(130, 1, 4, [
      "Out of the depths have I cried unto thee, O LORD. Not a polished prayer. A shout from underwater.",
      "Lord, hear my voice: let thine ears be attentive to the voice of my supplications. He says it twice, because he does not trust that once was enough.",
      "If thou, LORD, shouldest mark iniquities, O Lord, who shall stand? He asks the honest question. If God kept a ledger of every failure, nobody would still be standing. Not you either.",
      "But there is forgiveness with thee, that thou mayest be feared. Forgiveness does not make God smaller. It is the reason anyone can stay close to him at all.",
    ]),
    g(130, 5, 8, [
      "I wait for the LORD, my soul doth wait, and in his word do I hope. The cry from the first verse turns into something slower. Waiting is not what you do when prayer fails. It is what comes right after it.",
      "My soul waiteth for the Lord more than they that watch for the morning: I say, more than they that watch for the morning. He says it twice again. Picture a guard on a long night shift, aching for the first light. That is how hard he is waiting.",
      "Let Israel hope in the LORD: for with the LORD there is mercy, and with him is plenteous redemption. Plenteous. Not just enough. More than the debt required.",
      "And he shall redeem Israel from all his iniquities. The psalm started in the depths of sin and ends with all of it paid for. Full circle, in eight verses.",
    ]),
    g(131, 1, 3, [
      "LORD, my heart is not haughty, nor mine eyes lofty: neither do I exercise myself in great matters, or in things too high for me. David, a king, says he has stopped chasing things too big for him. That is not small talk from someone who ran an empire.",
      "Surely I have behaved and quieted myself, as a child that is weaned of his mother: my soul is even as a weaned child. A hungry baby screams the second it needs something. A weaned child can sit on its mother's lap wanting nothing but her.",
      "That might be closer to where you actually are with God some days than you want to admit. Not needing him for what he gives. Just wanting to be near.",
      "Let Israel hope in the LORD from henceforth and for ever. Three verses, and the shortest psalm in a long time still lands on the same word as the one before it. Hope.",
    ]),
    g(132, 1, 10, [
      "LORD, remember David, and all his afflictions: how he sware unto the LORD, and vowed unto the mighty God of Jacob. This psalm looks back at a vow David actually made.",
      "Surely I will not come into the tabernacle of my house, nor go up into my bed; I will not give sleep to mine eyes, or slumber to mine eyelids, until I find out a place for the LORD, an habitation for the mighty God of Jacob. He would not rest until God had a house. Not a guest room. A home.",
      "Lo, we heard of it at Ephratah: we found it in the fields of the wood. We will go into his tabernacles: we will worship at his footstool. That is the ark, tracked down after years sitting forgotten out in the countryside.",
      "Arise, O LORD, into thy rest; thou, and the ark of thy strength. Let thy priests be clothed with righteousness; and let thy saints shout for joy. For thy servant David's sake turn not away the face of thine anointed. The prayer shifts from David's own memory to whoever sits on the throne now, asking God to keep showing up for someone else's sake too.",
    ]),
    g(132, 11, 18, [
      "The LORD hath sworn in truth unto David; he will not turn from it: of the fruit of thy body will I set upon thy throne. David swore to find God a house. Now God swears something back, and his oath is the bigger one.",
      "If thy children will keep my covenant and my testimony that I shall teach them, their children shall also sit upon thy throne for evermore. A real condition, but aimed at generations, not one bad day.",
      "For the LORD hath chosen Zion; he hath desired it for his habitation. This is my rest for ever: here will I dwell; for I have desired it. God wanted this place. That is the whole reason David's search mattered.",
      "I will also clothe her priests with salvation: and her saints shall shout aloud for joy. There will I make the horn of David to bud: I have ordained a lamp for mine anointed. His enemies will I clothe with shame: but upon himself shall his crown flourish. The psalm ends with everyone in that house blessed, because David would not stop looking for it.",
    ]),
  ],
  closing: [
    ["So that is Day 172.", 700],
    ["A voice out of the depths, a heart that stopped grasping, and a king who would not sleep until God had a house.", 750],
    ["Psalm 130 says forgiveness is not softness. It is the reason God can be feared and trusted at the same time.", 800],
    ["Psalm 131 is three verses of a king who quit fighting to be impressive. He just wanted to sit still near God.", 800],
    ["And Psalm 132 remembers David's vow, then hands back a bigger one. God swore to David in return.", 800],
    ["Tomorrow, Psalms 133 through 135. Brothers living in unity, and a house full of praise.", 850],
    ["For now, hold on to the picture from Psalm 131.", 800],
    ["A hungry baby cries the second it needs something.", 850],
    ["A weaned child just wants to be held.", 900],
    ["Just held.", 1200],
  ],
};
