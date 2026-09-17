import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 239, written to the Day 1 standard.
 *
 * The countdown Ezekiel has been acting out gets a date. Then the vision
 * pulls him back to Jerusalem itself, through a hole in a wall, to see
 * exactly what the temple has become - and who gets marked before the
 * end arrives. Six blocks across three chapters (56 verses), no gaps.
 */

const ez = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ezekiel ${chapter}:${startVerse}-${endVerse}`,
  book: "ezekiel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 239,
  title: "The End Comes",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 239. No more model tiles. No more acting it out slowly.", 750],
    ["Today the word is just: the end is come.", 800],
    ["Then the vision grabs Ezekiel by the hair, lifts him up, and carries him straight into Jerusalem's temple.", 800],
    ["What he sees there explains everything about why the end is coming - and one detail explains who gets spared.", 800],
    ["We are in Ezekiel 7 through 9.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ez(7, 1, 13, [
      "An end, the end is come upon the four corners of the land. No more delay language. No more three hundred and ninety symbolic days. Just the word itself, twice in one breath.",
      "Mine eye shall not spare, neither will I have pity: but I will recompense thy ways upon thee. This is not random disaster. It is Jerusalem's own conduct, handed back to her exactly as she gave it.",
      "Let not the buyer rejoice, nor the seller mourn: for wrath is upon all the multitude thereof. Ordinary life - buying, selling, the small business of getting by - gets swallowed by something bigger than anyone's individual fortune.",
      "The seller shall not return to that which is sold, although they were yet alive. Property, deals, plans for tomorrow - all of it assumes there will be a tomorrow to collect on. That assumption is what is ending.",
    ]),
    ez(7, 14, 19, [
      "They have blown the trumpet, even to make all ready; but none goeth to the battle. The alarm sounds. Nobody musters. When wrath is already decided, courage has nowhere useful to go.",
      "He that is in the field shall die with the sword; and he that is in the city, famine and pestilence shall devour him. There is no safer direction to run. Outside the walls or inside them, the same ending waits.",
      "All hands shall be feeble, and all knees shall be weak as water. Not cowardice. Just what real terror does to a body when there is nowhere left to be brave toward.",
      "They shall cast their silver in the streets, and their gold shall be removed... it shall not be able to deliver them in the day of the wrath of the Lord. Everything they trusted to buy their way out turns out to be worth exactly nothing on that day.",
    ]),
    ez(7, 20, 27, [
      "The robbers shall enter into it, and defile it. God does not personally destroy the sanctuary. He simply stops protecting it, and lets strangers walk in and do what strangers do.",
      "The land is full of bloody crimes, and the city is full of violence. Long before soldiers arrive, the city had already filled itself with exactly this.",
      "They shall seek peace, and there shall be none... then shall they seek a vision of the prophet; but the law shall perish from the priest, and counsel from the ancients. Every source of guidance a people leans on in a crisis goes quiet at once.",
      "The king shall mourn, and the prince shall be clothed with desolation. Not just ordinary people caught in this. The throne itself has nothing left to rule over.",
    ]),
    ez(8, 1, 6, [
      "As I sat in mine house, and the elders of Judah sat before me, that the hand of the Lord God fell there upon me. In the middle of an ordinary meeting, the vision simply arrives. Ezekiel does not go looking for it.",
      "He put forth the form of an hand, and took me by a lock of mine head; and the spirit lifted me up between the earth and the heaven... to Jerusalem. Not a dream about the city. He is physically, visibly moved there in the vision, hundreds of miles from where his body sits.",
      "The glory of the God of Israel was there, according to the vision that I saw in the plain. The same throne-fire he fell on his face before in chapter one is already standing at the temple gate, watching.",
      "Behold northward at the gate of the altar this image of jealousy. An idol set up at the entrance to God's own house. Before Ezekiel sees the worse things inside, he first sees what has already been let in at the front door.",
    ]),
    ez(8, 7, 18, [
      "Son of man, dig now in the wall: and when I had digged in the wall, behold a door. God does not just show him what is visible. He has him break through to what Jerusalem thought no one could see.",
      "I saw; and behold every form of creeping things, and abominable beasts, and all the idols of the house of Israel, pourtrayed upon the wall. Seventy elders inside, censers in hand, because they say, the Lord seeth us not; the Lord hath forsaken the earth. Their whole secret worship depends on believing no one is watching.",
      "Turn thee yet again, and thou shalt see greater abominations. Four times God says this, and each time it gets worse - women weeping for Tammuz, a foreign god of death, right at the gate of the Lord's house.",
      "About five and twenty men, with their backs toward the temple of the Lord, and their faces toward the east; and they worshipped the sun. The final image: men standing inside God's own house, turned completely away from Him, worshipping something else in plain sight.",
    ]),
    ez(9, 1, 11, [
      "Cause them that have charge over the city to draw near, even every man with his destroying weapon in his hand. After everything just shown him, the vision moves straight from what Jerusalem is doing to what is now coming for it.",
      "Go through the midst of the city... and set a mark upon the foreheads of the men that sigh and that cry for all the abominations that be done in the midst thereof. Before a single blow lands, one man is sent ahead just to mark who grieved over what they saw. Nobody who was actually paying attention gets missed.",
      "Slay utterly old and young... but come not near any man upon whom is the mark; and begin at my sanctuary. The judgment starts exactly where the idols were - inside God's own house, among the very elders who thought no one was watching.",
      "I fell upon my face, and cried, Ah Lord God! wilt thou destroy all the residue of Israel? Even after showing Ezekiel every reason for this, God still lets him ask that question out loud, grief and all, before the answer comes back unchanged.",
    ]),
  ],
  closing: [
    ["So that is Day 239.", 700],
    ["No more slow-motion siege on a tile. Just the word itself: the end is come.", 800],
    ["And underneath the wrath is a very plain reason - a temple with an idol at the gate, elders burning incense in a hidden room, men with their backs turned on God inside His own house.", 850],
    ["None of it was secret from God. They say, the Lord seeth us not. He was watching the whole time.", 800],
    ["But before the destroying men move, one man goes ahead first, just to mark who grieved. Nobody who actually mourned this got missed.", 850],
    ["Ezekiel still falls on his face and asks if God will really destroy all of it. God lets him ask. The answer does not change, but the asking is not refused.", 850],
    ["Tomorrow, Ezekiel 10 through 12. The glory that has been standing at the gate finally leaves.", 850],
    ["For now, sit with the mark.", 750],
    ["Set a mark upon the foreheads of the men that sigh and that cry.", 800],
    ["Grief over what was wrong was never invisible to God.", 1200],
  ],
};
