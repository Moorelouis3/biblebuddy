import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 353, written to the Day 1 standard.
 *
 * James closes with rich men who hoarded wages and a call to patience like
 * Job's. Then a brand new letter opens: Peter, writing to people scattered
 * and suffering, starting not with a warning but with a living hope. Six
 * blocks across James 5 and 1 Peter 1-2.
 */

const jamesFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `James 5:${startVerse}-${endVerse}`,
  book: "james",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

const firstPeterOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Peter 1:${startVerse}-${endVerse}`,
  book: "1 peter",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const firstPeterTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Peter 2:${startVerse}-${endVerse}`,
  book: "1 peter",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 353,
  title: "Patient Faith and Living Hope",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 353.", 700],
    ["James signs off with a warning nobody wants to hear. Rich men, weeping for what's coming.", 800],
    ["Then a brand new letter opens. Peter, writing to people scattered and suffering, and he starts with hope, not warning.", 850],
    ["Living hope. A living stone. A people who used to be nobody, and now belong to somebody.", 850],
    ["James 5, and 1 Peter 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    jamesFive(1, 11, [
      "James turns to rich men and does not soften it. Weep and howl for the misery coming on you. Your gold is corroding in the vault while people go hungry.",
      "He names the actual sin. Wages you held back from the men who worked your fields. Their cries, James says, have already reached the ears of the Lord of hosts. You lived in luxury while the bill quietly ran up.",
      "Then he turns to everyone else and says something almost gentle after that. Be patient, like a farmer waiting on rain he cannot control. The coming of the Lord is near.",
      "Job gets named as the model. Not because Job understood what was happening to him. Because he outlasted it. The Lord is very pitiful, and of tender mercy, James says. That is the end of the story worth remembering, not the middle.",
    ]),
    jamesFive(12, 20, [
      "Above all things, James says, do not swear oaths. Let your yes be yes and your no be no. Stop dressing up your word with extra guarantees, like your plain word was never enough.",
      "Then practical instructions land one after another. Suffering? Pray. Cheerful? Sing. Sick? Call the elders, let them anoint you with oil and pray in the Lord's name, and the prayer of faith will save the sick.",
      "Confess your faults to each other, and pray for each other, so you can be healed. James backs it up with Elijah, a man with the same weaknesses you have, who prayed and the sky stayed shut for three and a half years, then opened again.",
      "He ends the whole letter without a goodbye. Just this. If someone wanders from the truth and you bring him back, you save a soul from death and cover a multitude of sins. That is how James chooses to close five chapters of hard sayings.",
    ]),
    firstPeterOne(1, 12, [
      "New writer, and you can feel the difference in the first line. Peter, writing to strangers scattered through five provinces, people who left home or got pushed out of it.",
      "He does not open with instructions. He opens with praise. Blessed be God, who caused us to be born again to a living hope, through the resurrection of Jesus Christ from the dead. An inheritance that cannot rot, spoil, or fade, kept in heaven for you.",
      "Your faith gets tested like gold in fire, Peter says, so it comes out worth more than gold, because gold burns up and faith does not. You love someone you have never seen, and it fills you with a joy too big for words.",
      "Even the prophets who wrote about this salvation searched their own writings trying to understand it. Peter says angels themselves are still leaning in, trying to see into what you have just been handed for free.",
    ]),
    firstPeterOne(13, 25, [
      "So get your mind ready for action, Peter says. Stay sober. Set your hope completely on the grace coming to you when Jesus returns. Stop shaping your life around the wants you had before you knew better.",
      "Be holy, because I am holy, God said, and Peter quotes it straight at people who are scattered, unsettled, and far from anything that looks holy. Live the rest of your time here with reverence, he says, not comfort.",
      "You were not bought back with silver or gold, the currency that runs out. You were bought with the precious blood of Christ, like a lamb with no defect, no blemish, chosen before the world existed and revealed now, for you.",
      "You have been born again, Peter says, not from a seed that rots, but from one that does not, through the living and enduring word of God. All flesh is like grass, it withers and falls, but the word of the Lord lasts forever. That is the seed you came from now.",
    ]),
    firstPeterTwo(1, 10, [
      "Get rid of malice, deceit, hypocrisy, envy, and every kind of slander, Peter says, and crave the pure milk of the word like a newborn craves milk, so you grow up into salvation.",
      "Come to Jesus, Peter says, a living stone. Rejected by the people building the house, but chosen and precious to God. And you are being built into that same house, living stones stacked on a stone that was thrown away.",
      "A chosen generation, a royal priesthood, a holy nation, a people who belong to God. Called out of darkness into a light you did not turn on yourself.",
      "Once you were not a people, Peter says. Now you are the people of God. Once you had not received mercy. Now you have. That is the entire difference stated in one sentence, twice, so you do not miss it.",
    ]),
    firstPeterTwo(11, 25, [
      "You are strangers and exiles here, Peter says, so keep away from the fleshly desires that go to war against your own soul. Live so well among people who do not believe that when they accuse you of wrong, your good works answer them before you ever open your mouth.",
      "Submit to every human authority for the Lord's sake, Peter says, kings and governors alike. Not because they have earned it. Because that is how you silence foolish accusations with good behavior instead of arguments.",
      "Then he turns to servants under harsh masters, and says something hard. Bearing up patiently under unfair suffering, that is what God calls praiseworthy. Because that is exactly what Christ did for you.",
      "He committed no sin. No deceit was found in his mouth. Insulted, he did not insult back. Suffering, he made no threats. He just handed himself over to the one who judges justly, and by his wounds, Peter says, you were healed. You were like sheep going astray, but you have returned now, to the Shepherd and Overseer of your souls.",
    ]),
  ],
  closing: [
    ["So that's Day 353.", 700],
    ["A rich man's gold rusting while he sleeps, a farmer waiting on rain, and a brand new letter that opens with hope instead of a warning.", 850],
    ["James ends by telling you to bring someone back when they wander. Peter opens by telling you what you were brought back to.", 850],
    ["A living hope. A living stone. A people who used to be nobody and are now somebody, on purpose, not by accident.", 850],
    ["And that last line should stay with you. By his wounds you were healed. Not by your own effort catching up.", 850],
    ["Tomorrow, 1 Peter 3 through 5. Wives, husbands, suffering for doing good, and elders told to shepherd instead of rule.", 850],
    ["For now, carry Peter's line about the seed.", 800],
    ["You were born again. Not of corruptible seed, but incorruptible.", 800],
    ["By the word of God, which lives and remains forever.", 1200],
  ],
};
