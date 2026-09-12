import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 185, written to the Day 1 standard.
 *
 * Proverbs 19-21: still short sayings, two lines each, but the ninety verses
 * sort themselves around three questions - whether something is fair,
 * what money actually does to a person versus what it cannot do, and what
 * happens to a proud heart. Six blocks split the reading roughly in half by
 * chapter, following canonical order.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Proverbs ${chapter}:${startVerse}-${endVerse}`,
  book: "proverbs",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 185,
  title: "Justice, Wealth, and Humility",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 185.", 650],
    ["Proverbs again. Ninety more verses, still two lines at a time.", 750],
    ["Today they sort themselves around three questions. Is it fair. What is money actually worth. And what happens to a man who thinks a little too highly of himself.", 800],
    ["There is also another repeat waiting for you. A line from Day 184 shows up again today, almost the same words.", 800],
    ["We are in Proverbs 19 through 21.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 14, [
      "Better is the poor that walketh in his integrity, than he that is perverse in his lips, and is a fool. The very first line sets the trade the whole chapter keeps making. Character against money, and character wins every time it is named.",
      "Wealth maketh many friends; but the poor is separated from his neighbour. The book states this flatly, the way it does when it is describing the world, not approving of it.",
      "A false witness shall not be unpunished, and he that speaketh lies shall not escape. This same warning gets said twice in this chapter, almost word for word, a few verses apart. Some things this book will not say only once.",
      "The discretion of a man deferreth his anger; and it is his glory to pass over a transgression. Not letting something go because you have to. Letting it go and calling that glory.",
    ]),
    g(19, 15, 29, [
      "He that hath pity upon the poor lendeth unto the LORD; and that which he hath given will he pay him again. Give to someone who cannot pay you back, and this verse says the LORD Himself takes on the debt.",
      "Chasten thy son while there is hope, and let not thy soul spare for his crying. The same hard instruction from a few chapters back, said again. It costs something to hear the crying and stay the course anyway.",
      "Hear counsel, and receive instruction, that thou mayest be wise in thy latter end. Wisdom here is not a feeling you arrive at alone. It is something you receive from someone else, on purpose.",
      "There are many devices in a man's heart; nevertheless the counsel of the LORD, that shall stand. You can make plan after plan. Only one of them was always going to hold.",
    ]),
    g(20, 1, 15, [
      "Wine is a mocker, strong drink is raging: and whosoever is deceived thereby is not wise. Not a ban. A description. This verse says the deception is part of what the drink does, not a side effect.",
      "The sluggard will not plow by reason of the cold; therefore shall he beg in harvest, and have nothing. One small excuse in the planting season becomes an empty hand at the harvest. The gap between them is the whole verse.",
      "Who can say, I have made my heart clean, I am pure from my sin? A question with no comfortable answer built in. Nobody in this book gets to claim that about themselves.",
      "There is gold, and a multitude of rubies: but the lips of knowledge are a precious jewel. Money gets named here too, but it loses. What someone actually knows and says truly is ranked above both.",
    ]),
    g(20, 16, 30, [
      "He that goeth about as a talebearer revealeth secrets: therefore meddle not with him that flattereth with his lips. Two warnings in one line. Do not trust the person collecting everyone's business, and do not trust the person only saying nice things to your face.",
      "An inheritance may be gotten hastily at the beginning; but the end thereof shall not be blessed. Speed is the problem this verse names, not the money itself. What comes too fast rarely lands well.",
      "Say not thou, I will recompense evil; but wait on the LORD, and he shall save thee. Justice gets handed somewhere else here. Not because the wrong does not matter. Because settling it is not your job.",
      "Man's goings are of the LORD; how can a man then understand his own way? The same idea from two days ago, back again. You can walk the road. You do not get the full view of where it leads.",
    ]),
    g(21, 1, 16, [
      "Every way of a man is right in his own eyes: but the LORD pondereth the hearts. This is the repeat. Almost word for word what Day 184 already said about the same thing. Feeling right about yourself and being right are still two different things.",
      "To do justice and judgment is more acceptable to the LORD than sacrifice. This is the chapter's center. Not the ritual. What you actually do to the person standing in front of you.",
      "An high look, and a proud heart, and the plowing of the wicked, is sin. Pride is not called a flaw here, or a bad habit. It is put in the same sentence as sin itself, no softer word used.",
      "Whoso stoppeth his ears at the cry of the poor, he also shall cry himself, but shall not be heard. What you refuse to hear from someone else is named here as the exact thing that will come back around to you.",
    ]),
    g(21, 17, 31, [
      "He that loveth pleasure shall be a poor man: he that loveth wine and oil shall not be rich. What you chase after ends up costing you the thing you thought it would get you.",
      "He that followeth after righteousness and mercy findeth life, righteousness, and honour. This is the trade the whole day has been making, said out loud one more time. Chase the right thing, and it hands back more than itself.",
      "Whoso keepeth his mouth and his tongue keepeth his soul from troubles. The tongue again, same as yesterday. Still named as something worth guarding on purpose.",
      "There is no wisdom nor understanding nor counsel against the LORD. The horse is prepared against the day of battle: but safety is of the LORD. The chapter closes by pulling everything up to one level. Plan all you want. Prepare all you can. The actual safety was never coming from the plan.",
    ]),
  ],
  closing: [
    ["So that is Day 185.", 700],
    ["Ninety verses, and three questions kept showing up. Is it fair. What is it actually worth. And who does the honor belong to.", 800],
    ["A false witness gets condemned twice in the same chapter, almost word for word, like the book wants to be sure it was heard.", 800],
    ["Wealth buys friends. It does not buy character. This day keeps naming those as two separate things.", 800],
    ["And a proud heart does not get called a flaw. It gets called sin, plainly, no softer word around it.", 800],
    ["Tomorrow, Proverbs 22 through 24. Wisdom for the ordinary parts of a day.", 850],
    ["For now, here is where chapter twenty-one lands.", 750],
    ["The horse is prepared against the day of battle.", 750],
    ["But safety is of the LORD.", 1200],
  ],
};
