import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 113, written to the Day 1 standard.
 *
 * Nehemiah 2-5 moves from permission to progress: the king lets Nehemiah go,
 * he surveys Jerusalem's broken wall at night before telling anyone his
 * plan, ordinary named people rebuild it section by section, enemies
 * escalate from mockery to a plotted attack, and an internal debt crisis
 * gets resolved in public. Seven blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Nehemiah ${chapter}:${startVerse}-${endVerse}`,
  book: "nehemiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 113,
  title: "Rebuilding the Wall",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 113. Nehemiah has been sitting on this grief for four months, and today it finally shows on his face.", 750],
    ["The king notices. And instead of getting in trouble for it, Nehemiah walks out with letters, timber, and an armed escort.", 800],
    ["He rides into Jerusalem, looks at the wreckage himself in the dark, and only then hands the job to everyone else — priests, goldsmiths, a man and his own daughters.", 800],
    ["Two men outside the city do not want any of this to happen, and they escalate from laughing at the workers to plotting an actual attack.", 800],
    ["By the end of today, half the builders are holding a weapon in one hand and a trowel in the other.", 800],
    ["We are in Nehemiah 2 through 5.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(2, 1, 10, [
      "Nehemiah has been praying about this wall for four months and has never once mentioned it to the king. Today his sadness finally shows on his face, and the king asks why. Verse two says Nehemiah was very sore afraid — a servant's sad face near a king was not a safe thing to have.",
      "He answers honestly anyway. The city, the place of my fathers' sepulchres, lies waste, and the gates thereof are consumed with fire. He does not soften it or explain it away.",
      "Then the king asks what he wants. And right there, mid-conversation, before he says a word back, Nehemiah prays. Not a ceremony. A half-second appeal to God while the king is still waiting on him.",
      "Then he asks for exactly what he needs — permission, letters for safe passage, timber for the gates — and gets all of it, plus an escort of captains and horsemen. Four months of praying, then one sentence of asking. That is usually the order it goes in.",
    ]),
    g(2, 11, 20, [
      "Nehemiah reaches Jerusalem and rests three days. Then, before he tells a single Jewish leader anything, he rides out at night with a few men to look at the damage himself. Verse sixteen says even the rulers did not know where he went.",
      "He counts the wreckage gate by gate — the valley gate, the dung gate, the fountain gate — until the rubble is too thick for his animal to climb and he has to turn back on foot in the dark.",
      "Only after he has seen it with his own eyes does he say anything. Ye see the distress that we are in. Come, and let us build up the wall of Jerusalem, that we be no more a reproach. And the people answer, let us rise up and build.",
      "Then Sanballat, Tobiah, and Geshem hear about it and laugh them to scorn. Will ye rebel against the king? Nehemiah does not argue with them. The God of heaven, he will prosper us. Ye have no portion, nor right, nor memorial, in Jerusalem. He simply tells them they are not part of this story.",
    ]),
    g(3, 1, 32, [
      "This whole chapter is a list — more than forty names, each one repairing one stretch of wall, all the way around the city. Easy to skim. Do not skim it.",
      "Notice who goes first. Eliashib the high priest and his fellow priests open the list, building the sheep gate. A few verses later, Shallum repairs his section together with his own daughters. This was never one class of people working while everyone else watched.",
      "Then verse five, one line buried in the middle of the names: the nobles of Tekoa put not their necks to the work of their Lord. Everyone around them is lifting stone. They will not lower their heads to do it.",
      "Over and over the list repeats the same phrase — repaired the piece over against his own house. People rebuilt the wall closest to where they actually lived. Nobody was handed a stranger's section before their own.",
    ]),
    g(4, 1, 9, [
      "Sanballat does not attack the wall. He attacks the workers with words, loud enough for them to hear it. What do these feeble Jews? Will they revive the stones out of the heaps of the rubbish which are burned?",
      "Tobiah adds the insult that lands hardest. Even that which they build, if a fox go up, he shall even break down their stone wall. Mockery like this is built to make people quit before anyone lifts a weapon.",
      "Nehemiah's answer is a prayer, not a comeback aimed at Sanballat. Hear, O our God, for we are despised. He takes the insult straight to God and keeps building. So built we the wall, for the people had a mind to work.",
      "When mockery does not stop them, the threat gets real — Sanballat, Tobiah, and three more nations conspiring together to come fight against Jerusalem and hinder it. Nehemiah's response is still two things at once. We made our prayer unto our God, and set a watch against them day and night. Praying did not replace the watch. It came with it.",
    ]),
    g(4, 10, 23, [
      "Even Nehemiah's own people start to lose heart here. Judah says the strength of the bearers of burdens is decayed, and there is much rubbish, so that we are not able to build the wall. Exhaustion is doing what the threats could not.",
      "Nehemiah answers both problems the same way. He stations people, by family, with real swords, spears, and bows, at the exposed places, then reminds them out loud what they are protecting. Remember the Lord, and fight for your brethren, your sons and your daughters, your wives, and your houses.",
      "From then on, half the men build and half stand guard, and even the builders work with a trowel in one hand and a weapon strapped to their side. Nobody gets to choose between working and being ready.",
      "Verse twenty-three says none of them even took off their clothes the whole time, except to wash. That is what building under real threat looks like. Not fear that stops the work. Fear that gets folded into the schedule.",
    ]),
    g(5, 1, 13, [
      "While the wall goes up outside, something cracks inside the community. People are mortgaging their land for food, borrowing to pay the king's tax, and some have started selling their own children into servitude just to survive.",
      "And the ones doing this to them are not foreign enemies. It is their own brethren, charging other Jews interest during a famine. Nehemiah says he was very angry when he heard their cry, and he does not cool off before he acts.",
      "He calls a great public assembly and says it plainly. Ye exact usury, every one of his brother. Ought ye not to walk in the fear of our God, because of the reproach of the heathen our enemies? A finished wall will not matter if the people inside it are eating each other alive.",
      "He does not just rebuke them. He makes them give it back — land, vineyards, the interest, all of it — under oath, in front of the priests, on the spot. Then he shakes out the fold of his robe and says may God shake out any man who breaks this promise. The whole assembly says Amen, and does exactly what it promised.",
    ]),
    g(5, 14, 19, [
      "Nehemiah adds a detail he did not have to. For twelve full years as governor, he and his brothers never once ate the food allowance that came with the job.",
      "The governors before him took it — forty shekels of silver, plus bread and wine — and their own servants pushed the people around while they did it. Nehemiah had every legal right to the same thing and refused it.",
      "Instead he fed a hundred and fifty people at his own table daily, one ox and six choice sheep, because the bondage was heavy upon this people. He could see they had nothing left to spare him.",
      "The chapter ends with one line of prayer, not a summary of his own goodness. Think upon me, my God, for good, according to all that I have done for this people. He wants God to remember it. He is not trying to make sure anyone else does.",
    ]),
  ],
  closing: [
    ["So that is Day 113.", 700],
    ["A cupbearer's sad face turns into a rebuilt wall in four chapters.", 750],
    ["Nehemiah prays before he answers the king, surveys the damage before he asks anyone to lift a stone, and only then says come, let us build.", 800],
    ["And the people who show up are not specialists. Priests, goldsmiths, a father working next to his own daughters, each one repairing the section closest to their own house.", 800],
    ["When mockery does not stop them, the enemies plan a real attack. Nehemiah's answer is the same move twice — pray, and also post a guard.", 800],
    ["Inside the walls, a worse threat shows up — their own people charging each other interest during a famine. Nehemiah makes them give it all back, under oath, in public.", 850],
    ["Then he tells us what he did not take. Twelve years as governor, and he never touched the food allowance that came with the job.", 800],
    ["Tomorrow, Nehemiah 6 through 9. The wall gets finished, and someone reads the whole Law out loud to a crowd that weeps.", 850],
    ["For now, hold on to one line.", 750],
    ["The people had a mind to work.", 1200],
  ],
};
