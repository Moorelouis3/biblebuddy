import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 34, written to the Day 1 standard.
 *
 * Leviticus 9-12: the consecration finally pays off, then goes wrong within
 * the same day, then the lens narrows all the way down to a dinner plate and
 * a birth. Seven blocks, one per natural unit, each confined to a chapter.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Leviticus ${chapter}:${startVerse}-${endVerse}`,
  book: "leviticus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THIRTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 34,
  title: "Worship, Holiness, and Clean Living",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 34. The consecration is finally over.", 750],
    ["Aaron's first official act as priest starts with an offering for his own sin, before he does anything for anyone else.", 850],
    ["Then the day turns, fast. Fire falls from God in celebration, and then fire falls from God again, and it isn't celebration anymore.", 850],
    ["After that, the rules turn toward something smaller. What you eat, and what happens after a birth.", 800],
    ["We are in Leviticus 9 through 12.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(9, 1, 14, [
      "Seven days of consecration are finally over, and on the eighth day Aaron is told exactly what to do next. And the very first thing on the list is a sin offering for himself.",
      "Not for the people yet. For Aaron. He has just spent a week being washed, dressed, and anointed, and he still can't approach the altar for anyone else until his own sin is dealt with first.",
      "A high priest with a gold plate on his forehead reading Holiness To The Lord still needed a calf to die for him before he served a single person.",
      "Nobody in this story skips the line, not even the man standing closest to God.",
    ]),
    g(9, 15, 24, [
      "Then Aaron works through the people's offerings, one after another, exactly the way the last four chapters laid it out. Nothing new. Just the pattern finally in motion.",
      "He lifts his hands and blesses the people, and then he and Moses come out of the tabernacle together and bless them again.",
      "And that's when it happens. Fire comes out from before the LORD and consumes the offering right there on the altar, in front of everyone.",
      "The whole camp sees it, and shouts, and falls on their faces. Seven days of ceremony, and then God answers with fire, in front of witnesses, instead of just words to Moses alone.",
    ]),
    g(10, 1, 7, [
      "Then, almost immediately, it goes wrong. Nadab and Abihu, Aaron's own sons, take their censers and offer fire the LORD had not commanded them.",
      "Fire goes out from the LORD again, the same kind that just fell in celebration, and this time it kills them both, right there before the LORD.",
      "Moses tells Aaron why. I will be sanctified in them that come near me. And Aaron holds his peace. Not a word. His two sons are carried out of the very tent he just spent seven days getting ready to serve in.",
      "He isn't even allowed to mourn the normal way, uncover his head or tear his clothes, because the anointing oil is still on him. Grief had to wait behind the job.",
    ]),
    g(10, 8, 20, [
      "Right after that, God speaks to Aaron directly, which almost never happens in this book. Don't drink wine or strong drink when you go into the tabernacle, or you'll die. A statute forever.",
      "The reason given is exactly what a priest is for. To tell the difference between holy and unholy, clean and unclean, and to teach Israel the rest of it. A clear head was part of the job.",
      "Then Moses finds out the sin offering goat was burned instead of eaten the way it was supposed to be, and he's angry with Aaron's remaining sons.",
      "Aaron answers with a question instead of an excuse. Things like this have happened to me today, would it have been good in the LORD's sight if I had eaten it? Moses hears that, and lets it go.",
    ]),
    g(11, 1, 23, [
      "Now the rules turn toward the dinner table. Land animals are clean if they do two things at once. Chew the cud and have a split hoof. Miss either one, and it's off the menu.",
      "The camel chews the cud but doesn't split the hoof. The pig splits the hoof but doesn't chew the cud. Both unclean, for opposite reasons, and pork gets singled out. Don't even touch the carcass.",
      "Water creatures need fins and scales together. Anything else in the water is called an abomination, no matter how normal it looks swimming past.",
      "A long list of birds gets named unclean, and most of them share one thing in common. They eat carrion or prey on other creatures. Even food had a shape to it now.",
    ]),
    g(11, 24, 47, [
      "Touch the carcass of an unclean animal, even by accident, and you're unclean until evening. Certain pots it falls into just get broken. You don't scrub your way out of that one.",
      "Then a long list of things that creep on the ground. The weasel, the mouse, the lizard, the mole. All unclean, all called abominations, all off limits to touch or eat.",
      "And in the middle of the list, God finally says why any of this matters. Sanctify yourselves, and be holy, for I am holy.",
      "This was never really about food safety. It was a whole nation being trained, meal by meal, to notice the difference between clean and unclean everywhere else too.",
    ]),
    g(12, 1, 8, [
      "A woman who gives birth is ceremonially unclean, the same as during her monthly cycle, and stays that way through a longer period of purifying before she can come near the sanctuary.",
      "On the eighth day, the boy is circumcised. That timing wasn't incidental. It's the same eighth day Aaron began serving on, two chapters ago.",
      "When her purifying days are finished, she brings a lamb and a bird. And if she can't afford the lamb, two birds instead, one for each offering. Same forgiveness, smaller price.",
      "This is the fourth time in four chapters this book has made room for whoever couldn't afford the full offering. That pattern is not an accident either.",
    ]),
  ],
  closing: [
    ["So that is Day 34.", 700],
    ["Aaron's first act as priest was a sacrifice for himself. Then fire fell, and the whole camp shouted.", 800],
    ["Then his own sons offered fire God never asked for, and the same fire that had just fallen in celebration took them instead.", 850],
    ["Aaron said nothing. Some grief doesn't get words, even from a priest.", 800],
    ["After that, God narrowed the lens all the way down to a dinner plate and a birth. Clean and unclean, everywhere, all the time.", 850],
    ["And even there, the poor still got a way in. Two birds, if a lamb was too much.", 800],
    ["Tomorrow, Leviticus 13 through 16. Skin disease, and then the one day a year the high priest goes where nobody else is allowed.", 850],
    ["For now, sit with Aaron's silence.", 800],
    ["No excuse.", 700],
    ["No explanation. Just holding his peace.", 1200],
  ],
};
