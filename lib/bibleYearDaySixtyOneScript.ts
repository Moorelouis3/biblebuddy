import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 61, written to the Day 1 standard.
 *
 * Joshua 20-23 closes out the conquest narrative: cities of refuge for the
 * unintentional killer, the Levites' forty-eight scattered cities alongside
 * the flat statement that every promise God made came true, the altar at
 * the Jordan that nearly starts a war between Israel's own tribes, and
 * Joshua's final address before he dies. Six blocks, splitting Joshua 22
 * into three so the near-war gets room to build and resolve.
 */

const josh = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Joshua ${chapter}:${startVerse}-${endVerse}`,
  book: "joshua",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 61,
  title: "Refuge, Rest, and Joshua's Warning",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 61. The land is basically divided now, but Joshua is not finished.", 750],
    ["Today three tribes almost start a war with their own brothers over an altar nobody explained first.", 800],
    ["And an old man stands up to give the people he has led his whole life one last warning.", 800],
    ["In between, cities get set aside for people who never meant to kill anyone.", 800],
    ["We are in Joshua 20 through 23. Refuge, rest, a near-war, and a warning.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    josh(20, 1, 9, [
      "God tells Joshua to set up cities of refuge. Not for the guilty. For the man who kills somebody by accident and now has an avenger of blood coming for him.",
      "He runs to the gate, states his case to the elders, and they take him in before anyone asks any more questions. Safety first, trial later.",
      "He stays there until he stands before the congregation, and even then he is not fully free. He waits until the high priest himself dies.",
      "Six cities, three on each side of the Jordan, spread out so nobody in Israel is too far to reach one in time. Justice, with a way out built in for the man who did not mean it.",
    ]),
    josh(21, 1, 45, [
      "The Levites never get a lot of land in this whole book. Their inheritance is the LORD himself, so every other tribe hands over some of its own cities instead.",
      "Forty-eight cities in all, scattered through every tribe's territory, so the priests and the men who carry the ark are never far from anybody in Israel.",
      "Then the list stops and the chapter says something enormous. The LORD gave them rest on every side, exactly as he swore to their fathers. Not one enemy stood against them.",
      "There failed not one thing of all the good things the LORD had spoken to the house of Israel. Every promise, kept. That is the real headline of this whole book, buried inside a list of cities.",
    ]),
    josh(22, 1, 9, [
      "Reuben, Gad, and half of Manasseh chose their land east of the Jordan years ago, on one condition. Fight alongside your brothers first, then go home.",
      "Joshua tells them straight out that they kept every word of it. Years of war, and they never once went home early.",
      "Now he sends them back east, loaded with silver, gold, cattle, and plunder to share with the families who stayed behind and waited.",
      "But the blessing carries one more line, and it matters more than the gold. Take diligent heed to love the LORD your God and keep his commandments. Obedience did not end when the fighting did.",
    ]),
    josh(22, 10, 20, [
      "The two and a half tribes cross back over the Jordan and build a massive altar right at the border, in plain sight of everybody.",
      "Word reaches the rest of Israel, and they assume the worst. A rival altar. Rebellion. They gather at Shiloh ready to march to war against their own brothers.",
      "Phinehas the priest leads the delegation, and he brings up Peor, the plague that already cost Israel thousands of lives over one act of unfaithfulness. He is not bluffing.",
      "They even offer land. If your side of the river feels unclean, come live among us instead. Anything but a second altar. That is how seriously this book takes worship split from the one place God chose.",
    ]),
    josh(22, 21, 34, [
      "Reuben, Gad, and half of Manasseh answer with the strongest oath they have. The LORD God of gods, he knows, and Israel will know, if this was rebellion.",
      "The altar was never for sacrifice. It was a witness, a copy of the real one, so that in years to come nobody could tell their children you have no part in the LORD.",
      "They saw the danger before it happened. A river between two peoples is exactly the kind of gap that makes the next generation forget they belong to each other.",
      "Phinehas hears the answer and changes his mind completely. This day we know the LORD is among us. War becomes a name instead. They call the altar Ed, Witness, and everybody goes home.",
    ]),
    josh(23, 1, 16, [
      "Years pass. Joshua is old now, and he calls every leader in Israel together one more time, because he knows what is coming for him.",
      "He does not take credit for one square foot of the conquest. The LORD your God, he tells them, is the one who fought for you.",
      "Then the warning. Do not mix with the nations still left in the land, do not marry into them, do not even speak their gods' names. Not because God is small-minded. Because he has watched what shared worship always turns into.",
      "His last line here is the hardest one to hear. Everything good God promised came true, without one thing failing. Every warning he gives will land exactly the same way.",
    ]),
  ],
  closing: [
    ["So that is Day 61.", 700],
    ["Cities of refuge for the man who never meant it. Forty-eight towns for the Levites, scattered so the LORD stays close to everybody.", 750],
    ["A war that almost started over an altar that was never for sacrifice at all. Just a witness, so the next generation would not forget where they belong.", 800],
    ["And Joshua, old now, standing up one more time to say the same thing he has said his whole life. The LORD fought for you.", 800],
    ["Not one word failed of everything God promised. Joshua wants that fact remembered before he wants anything else from them.", 850],
    ["Then he tells them plainly. Every good promise came true. Every warning will too.", 800],
    ["Tomorrow, Joshua 24 and the first chapters of Judges. Joshua dies, and Israel starts drifting almost immediately.", 850],
    ["For now, hold on to Joshua's line.", 750],
    ["Not one thing failed.", 750],
    ["Choose well.", 1200],
  ],
};
