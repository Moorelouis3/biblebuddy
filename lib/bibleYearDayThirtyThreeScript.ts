import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 33, written to the Day 1 standard.
 *
 * Leviticus 5-8 covers guilt sliding down to what the poor can afford, sin
 * against a neighbor instead of God, the priests' own handling rules, and
 * then Aaron's consecration. Seven blocks, one per natural unit, ending on
 * the whole of chapter 8 as a single narrative.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Leviticus ${chapter}:${startVerse}-${endVerse}`,
  book: "leviticus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 33,
  title: "Guilt, Consecration, and Priests",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 33. Leviticus keeps going.", 750],
    ["Yesterday was four offerings, one after another, for a whole nation.", 800],
    ["Today Leviticus asks a smaller question. What if you can't afford any of them? And what if the person you sinned against isn't God, it's your neighbor?", 850],
    ["Then, at the end, the book stops explaining rules and finally shows you a man living inside them.", 850],
    ["Aaron. Washed, dressed, and marked with blood on his ear, his hand, his foot.", 900],
    ["We are in Leviticus 5 through 8.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(5, 1, 13, [
      "The first sins named here are quiet ones. Hearing something and staying silent when you're a witness. Touching something unclean without meaning to. A promise made too fast, before you thought about what it would cost.",
      "None of that feels like the kind of sin that needs an altar. Leviticus disagrees. The moment you realize it, you're responsible for it.",
      "So confess it. That's the actual instruction. He shall confess that he hath sinned. Not hide it longer, not explain it away.",
      "And the offering scales all the way down for whoever can't afford a lamb. Two birds. Or if even that's too much, a handful of flour with nothing in it. Still forgiven. The price of admission was never the point.",
    ]),
    g(5, 14, 19, [
      "Now it's trespass against what belongs to God specifically. Underpaying a tithe. Being careless with something set apart. You don't get to just replace it.",
      "Pay back what you took, plus a fifth more. Then bring a ram on top of that. Restoring the loss and covering the sin are two separate debts.",
      "And then the hardest line in the chapter. A man does something the law forbids and doesn't even know it. Still guilty. Still bears the iniquity.",
      "Not knowing you did wrong never meant you hadn't. It just meant nobody had told you the bill was coming yet.",
    ]),
    g(6, 1, 7, [
      "Now the offense turns sideways, toward another person instead of toward God. Lying about something left in your care. Robbery. Cheating a neighbor. Finding something lost and keeping quiet about it.",
      "Every one of those is really the same sin wearing a different coat. Taking what wasn't yours and hoping nobody asks.",
      "The fix is the same as before. Give back the full amount, plus a fifth, on the very day you're found guilty. Then bring the ram.",
      "God will not let a man call his account with heaven settled while his account with his neighbor is still short.",
    ]),
    g(6, 8, 30, [
      "Then Leviticus stops talking about the people's sin for a while and starts training the priests. The fire on the altar is never allowed to go out. Every morning it gets fed again before anything else happens.",
      "Notice the one offering Aaron brings for himself. Unlike almost everything else in this book, it is wholly burned. Nothing kept back for him to eat. The priest doesn't get to live off his own sacrifice.",
      "The sin offering, though, the priest does eat, but only inside the holy place, and only under strict rule. Broken earthen pots. Scoured bronze ones.",
      "None of this is about hygiene. It's about making sure nothing that touched an atonement for sin gets handled like leftovers.",
    ]),
    g(7, 1, 21, [
      "The trespass offering works like the sin offering. Killed in the same spot, most holy, handled by the priest who offered it.",
      "But the peace offering has a deadline built into it. A thanksgiving offering has to be eaten the same day. A vow or a freewill offering gets one extra day.",
      "Anything left over by the third day isn't just wasted, it's called an abomination. God would rather it be burned than eaten late.",
      "Even gratitude has a shelf life here. You don't get to stretch a moment of worship out until it goes stale.",
    ]),
    g(7, 22, 38, [
      "Two things are banned outright from the table, for good. Fat and blood. Eat either one, Leviticus says, and you are cut off from your people.",
      "The blood is the life, and the fat was always God's part of the animal. Take either one for yourself and you've taken something that was never on offer.",
      "But the priests do get a permanent portion. The breast and the right shoulder, waved and lifted before the Lord, then given to Aaron and his sons as their due forever.",
      "The men who spent all day handling other people's guilt got fed by the altar they served. That much, at least, wasn't in question.",
    ]),
    g(8, 1, 36, [
      "Then the procedures stop and a person finally steps forward. Aaron, washed with water in front of the whole congregation, dressed piece by piece. Coat, robe, ephod, breastplate, and a gold plate on his forehead that just says Holiness To The Lord.",
      "Moses anoints the tabernacle, the altar, and then Aaron himself, before a single sacrifice is even offered.",
      "Then blood, on the tip of Aaron's right ear, the thumb of his right hand, the big toe of his right foot. What he hears, what he does, and where he walks, all claimed before he serves one single day.",
      "Aaron and his sons don't leave the entrance of the tabernacle for seven straight days. Not a punishment. Just what it costs to actually be made holy.",
    ]),
  ],
  closing: [
    ["So that is Day 33.", 700],
    ["Sins nobody would call dramatic. A silence, a careless touch, a promise made too fast. All of it still counted.", 800],
    ["A neighbor who was cheated gets paid back before God gets a sacrifice.", 750],
    ["And a fire that is never once allowed to go out.", 750],
    ["Then Aaron. Washed, dressed, anointed, and marked on the ear, the hand, the foot, before he does one thing as a priest.", 850],
    ["What he hears. What he does. Where he walks. All claimed before the job even starts.", 850],
    ["Tomorrow, Leviticus 9 through 12. Aaron's sons finally light the altar themselves, and it goes wrong almost immediately.", 850],
    ["For now, sit with the seven days Aaron couldn't leave that doorway.", 800],
    ["Not a punishment.", 700],
    ["Just what it costs to actually be made holy.", 1200],
  ],
};
