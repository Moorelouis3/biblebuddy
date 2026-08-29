import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 36, written to the Day 1 standard.
 *
 * Leviticus 17-20 is the holiness code proper: where to bring blood, who you
 * can and cannot marry or sleep with, how to treat the poor and the stranger,
 * and what enforcement looks like when Israel ignores any of it. Seven
 * blocks, one per natural unit, staying descriptive rather than preachy on
 * the harder material - the text itself does not linger, and neither does
 * the teaching.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Leviticus ${chapter}:${startVerse}-${endVerse}`,
  book: "leviticus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 36,
  title: "Holy Living Before a Holy God",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 36. This is the chapter people skip.", 750],
    ["Where blood belongs. Who you can marry. How you treat the poor and the stranger. What happens when nobody follows any of it.", 850],
    ["It's blunt. It doesn't apologize for being blunt. And buried in the middle of it is a line Jesus later calls the second greatest command in the whole Bible.", 850],
    ["We are in Leviticus 17 through 20.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(17, 1, 16, [
      "The rule is simple and total. Any animal killed for sacrifice has to come to the door of the tabernacle first. No side altars, no offering it wherever you happen to be standing.",
      "The reason given cuts to the center of the whole book. The life of the flesh is in the blood, and I have given it to you upon the altar to make atonement for your souls. Blood was never just a substance here. It was a life, handed over in place of another.",
      "That's also why eating blood is forbidden, even from an animal caught hunting. Pour it out, cover it with dust. You don't casually consume the very thing that buys atonement.",
      "One altar, one place, one meaning for blood. Israel wasn't left free to define that for themselves.",
    ]),
    g(18, 1, 18, [
      "Before a single rule is listed, God says who's talking. I am the LORD your God. That line will repeat like a drumbeat through these four chapters.",
      "The command is framed as a break from both directions. Don't live like Egypt, where you came from. Don't live like Canaan, where you're going. Two whole cultures, and Israel is told not to inherit either one by default.",
      "What follows is a boundary drawn around the home. Family members who are off-limits to marry or sleep with, close enough by blood or marriage that the relationship stays a relationship, not something else.",
      "It's not a list built to entertain curiosity. It's a fence around the household, so the place meant to be safest doesn't become the place where people get hurt worst.",
    ]),
    g(18, 19, 30, [
      "The chapter keeps going. Adultery. Child sacrifice to Molech. Relationships the text calls confusion and abomination, without softening either word.",
      "Then it says something unusual for a law code. The land itself is defiled by this, and the land vomits out its own inhabitants because of it. Not just people breaking rules. A place that cannot hold what's done in it forever.",
      "And then a warning aimed squarely at Israel, not just the nations around them. Do the same things, and the same land will do the same thing to you. No exemption for being the chosen people.",
      "Whatever discomfort this chapter raises, the text doesn't rush past it to a tidy resolution. It just states the boundary and the cost of crossing it, and moves on.",
    ]),
    g(19, 1, 18, [
      "Chapter 19 opens with the one line that explains everything else in this book. Ye shall be holy, for I the LORD your God am holy. Not a suggestion. A reason.",
      "Then it gets specific in ways that still land. Leave the corners of your field unharvested. Don't strip your vineyard bare. Leave something for the poor and the stranger to gather for themselves.",
      "Don't steal, don't lie, don't hold a hired man's wages overnight. Don't curse someone who can't hear you do it, and don't put an obstacle in front of someone who can't see it coming.",
      "And then the line Jesus later names as the second greatest commandment in all of Scripture. Thou shalt love thy neighbour as thyself. Sitting right here, in the middle of Leviticus, not somewhere you'd expect to find it.",
    ]),
    g(19, 19, 37, [
      "More rules follow, some practical, some almost symbolic. Don't crossbreed your livestock, don't mix your seed in one field, don't wear a garment woven from two different fabrics. Boundaries kept visible, even in small things.",
      "No cutting your flesh for the dead. No occult practices, no consulting mediums. Stand up when an old man enters the room. Do not cheat a stranger.",
      "And then this. The stranger that dwells with you shall be as one born among you, and thou shalt love him as thyself, for ye were strangers in the land of Egypt. Their own history becomes the reason to treat outsiders decently.",
      "Honest scales. Honest measurements. The chapter ends on the most unglamorous kind of holiness there is. Don't cheat people in ordinary business.",
    ]),
    g(20, 1, 21, [
      "Now the same ground gets covered again, this time with the penalties attached. Giving a child to Molech is punished by death, and if the community looks away and pretends not to see it, God says He will deal with that family Himself.",
      "The phrase cut off from among his people repeats again and again through this chapter. Whatever the exact form it took, the point is consistent. Some choices don't just affect the person who makes them.",
      "The same relationships named as off-limits back in chapter 18 get named again here, now with consequences spelled out. The text isn't adding anything new. It's making sure nobody can say they didn't know the cost.",
      "It's a hard chapter to sit through out loud. It was written to be a hard chapter to sit through out loud.",
    ]),
    g(20, 22, 27, [
      "And then the reason, one more time, plain as it's been all along. Keep all my statutes, and all my judgments, and do them, that the land spue you not out.",
      "Ye shall be holy unto me, for I the LORD am holy, and have severed you from other people, that ye should be mine. Separation isn't the goal for its own sake. Belonging to God is the goal. Separation is just what belonging looks like from the outside.",
      "The same clean and unclean language from the food laws shows back up here, tying this chapter back to the ones about diet and disease. One consistent habit of attention, applied to everything.",
      "Notice, none of you should be common. That's the whole ask, running underneath four chapters of specifics. Nothing about this people was supposed to look like everyone else's default.",
    ]),
  ],
  closing: [
    ["So that is Day 36.", 700],
    ["Where blood belongs. Who's off-limits. What's owed to the poor, the stranger, the deaf, the blind, the old man in the room.", 800],
    ["This is one of the harder stretches to read out loud, and it doesn't ask to be softened. It just asks to be heard.", 850],
    ["And in the middle of all of it, one line outlasts every rule around it. Love thy neighbour as thyself.", 800],
    ["Jesus picks that exact verse back up centuries later and calls it the second greatest command there is.", 800],
    ["Holiness here was never just about staying separate. It was about what a separated people owed everyone around them.", 850],
    ["Tomorrow, Leviticus 21 through 24. Priests, feasts, and sacred order.", 850],
    ["For now, sit with the line in the middle of the hard chapter.", 800],
    ["Love thy neighbour.", 750],
    ["As thyself.", 1200],
  ],
};
