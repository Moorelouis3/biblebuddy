import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 32, written to the Day 1 standard.
 *
 * Leviticus 1-4 opens the book of procedures: no characters, no plot, just
 * God teaching a nation how to actually use the tent that got finished
 * yesterday. Seven blocks, working through the offerings in the order given.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Leviticus ${chapter}:${startVerse}-${endVerse}`,
  book: "leviticus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 32,
  title: "Offerings and Atonement",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 32. Leviticus starts today.", 750],
    ["Yesterday the tent went up and the glory moved in. Today God tells them how to actually walk toward it.", 850],
    ["No plot. No characters you'll remember by name. Just procedure, over and over.", 850],
    ["And underneath the procedure is one question that matters to you personally. What does it actually cost to be made right with God?", 900],
    ["We are in Leviticus 1 through 4. Four kinds of offering, each one answering that question a different way.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(1, 1, 9, [
      "The first offering God explains is the burnt offering, and the instructions start with a hand. The offerer lays his hand on the animal's head before it dies.",
      "That is not a formality. It is identification. This animal is standing in for me. What happens to it should be happening to me.",
      "The whole thing, every part, gets burned. Nothing kept back, nothing eaten, nothing taken home.",
      "That is the shape of the burnt offering. Total surrender, freely brought, before anyone has even been accused of a specific sin.",
    ]),
    g(1, 10, 17, [
      "Then God scales the same offering down. A sheep or goat if you cannot afford from the herd, or two birds if you cannot afford either.",
      "Same offering. Same word, sweet savour unto the Lord, used for the bird that a poor family could actually bring.",
      "God did not build one path to Himself for the wealthy and a lesser one for everyone else.",
      "Whatever you had in your hand was enough, as long as you brought it honestly and gave the whole thing.",
    ]),
    g(2, 1, 16, [
      "Next comes an offering with no blood in it at all. Fine flour, oil, frankincense, sometimes baked into cakes.",
      "And two things are banned from it by name. No leaven, no honey. The two ingredients that make bread taste better and last longer, kept out of what belongs to God.",
      "But salt is required in every one of them, called here the salt of the covenant. Salt does not spoil. It holds.",
      "Even a gift with no death in it still had to be handled like something set apart, not just whatever was left over from the kitchen.",
    ]),
    g(3, 1, 17, [
      "The peace offering is the one offering in this whole section where the person who brought it gets to eat part of it. Every other one goes entirely to God or to the priest.",
      "Herd, flock, or goat, the fat goes up in smoke to the Lord, and the rest becomes a shared meal. Fellowship, literally, at the altar.",
      "And one line closes the chapter as a permanent statute. You shall eat neither fat nor blood. The best part and the life itself both belong to God alone, always.",
      "This is the one sacrifice built for a relationship already at peace, not one trying to repair a breach. Not every offering here is about guilt.",
    ]),
    g(4, 1, 12, [
      "Now the sin offering, and Leviticus starts at the top. If the anointed priest sins, his blood does not just touch the altar outside. It gets carried inside, sprinkled seven times before the veil itself.",
      "The man closest to God's presence pollutes the most ground when he fails, so his atonement has to reach the furthest in.",
      "The whole animal is then carried outside the camp and burned, not eaten by anyone. His sin cost the priesthood something real.",
      "Position near God is not protection from consequence. If anything, it raises what a failure touches.",
    ]),
    g(4, 13, 21, [
      "Then the whole congregation, sinning together without even realizing it. The elders lay their hands on the bull on behalf of everyone.",
      "Same treatment as the priest. Blood before the veil, the animal burned outside the camp.",
      "A nation can be guilty of something none of them meant, and Leviticus still calls it sin and still requires blood for it.",
      "Ignorance did not cancel the debt. It just meant nobody had noticed yet that there was one.",
    ]),
    g(4, 22, 35, [
      "Finally, a ruler, and then an ordinary person, each bringing what fits their situation. A leader a male goat, common people a female goat or a lamb.",
      "Their blood does not go inside the tent at all. Just on the horns of the altar outside, where the burnt offering is killed.",
      "Different animal, different amount of blood, different distance it travels into the tabernacle. But the same phrase closes every single case. It shall be forgiven him.",
      "The size of the ceremony changed with your rank. The forgiveness at the end of it never did.",
    ]),
  ],
  closing: [
    ["So that is Day 32.", 700],
    ["Four offerings, and not one of them was free.", 750],
    ["A hand on a head. A death instead of yours. Something burned, something eaten, something poured out at the bottom of an altar.", 850],
    ["Leviticus is not trying to be interesting. It is trying to make sure nobody ever thinks forgiveness is casual.", 850],
    ["And notice who gets in. The wealthy with a bull, the poor with two birds, the priest, the whole nation, one person who never even knew they were guilty.", 850],
    ["Different animals. Different amounts of blood. The same last line every time. It shall be forgiven him.", 800],
    ["Tomorrow, Leviticus 5 through 8. The guilt offering, and then Aaron and his sons get consecrated to actually do all of this.", 850],
    ["For now, sit with that hand resting on the animal's head.", 800],
    ["Someone else, standing in.", 750],
    ["So that you would not have to.", 1200],
  ],
};
