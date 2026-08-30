import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 47, written to the Day 1 standard.
 *
 * Numbers 34-36 closes the book: the land's borders drawn out, the tribal
 * leaders appointed to divide it, the Levites' scattered cities and cities
 * of refuge, the murder-versus-manslaughter law, and Zelophehad's daughters
 * settling their inheritance within the tribe. Deuteronomy 1 then opens the
 * next book in a different voice - Moses himself, retelling the journey and
 * the spies from his own angle. Seven blocks across two books, matching the
 * shape Day 38 used for the Leviticus-to-Numbers turn.
 */

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 47,
  title: "Land Boundaries and Moses Looks Back",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 47. The book of Numbers finishes today.", 750],
    ["The land gets an actual border drawn on a map. The Levites get scattered cities instead of one territory. And six of those cities become somewhere to run if you kill someone by accident.", 850],
    ["Then, right after Zelophehad's daughters get one more ruling on their inheritance, the whole book ends.", 800],
    ["And the next book opens with Moses himself talking, looking back over forty years out loud.", 800],
    ["We are in Numbers 34 through 36, and Deuteronomy chapter 1.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    num(34, 1, 15, [
      "God does not leave the land vague. He draws an actual border. South to the Salt Sea, past Kadesh-barnea, west along the whole coast of the Great Sea, north past Hamath, east down along the Jordan and back to the Salt Sea.",
      "Kadesh-barnea sits right on that southern line. The same place this generation's parents refused to go up thirty-eight years ago is now just a boundary marker on the map their children are about to walk into.",
      "Moses reminds everyone this land belongs to nine and a half tribes only. Reuben, Gad, and half of Manasseh already have their ground, on the far side of the river, settled yesterday before anyone else even crosses.",
      "A promise on paper and a promise with mile markers are two different things. This is the second one. You can walk to every edge of it.",
    ]),
    num(34, 16, 29, [
      "God does not leave this to a committee with no names on it. Eleazar the priest and Joshua son of Nun run the whole division, and one leader is named from every tribe that is about to inherit.",
      "Caleb, son of Jephunneh, gets the job for Judah. The same man who stood alone with Joshua thirty-eight years ago, telling everyone the land could be taken. He is still here, still trusted with the land itself.",
      "Ten names in a row, one per tribe, mean ten families back home who now know exactly who to trust with drawing the lines around their inheritance.",
      "Big decisions in this story keep landing on specific people with specific names, not on an anonymous process. You are trusted with a job here, not absorbed into a system.",
    ]),
    num(35, 1, 15, [
      "The Levites never get a slice of the map like the other tribes. Instead, every tribe gives up cities out of its own territory, forty-eight in all, with grazing land measured out around each one.",
      "That is a strange kind of inheritance. No fields of your own to farm, no single region to call home, just towns scattered through everyone else's land.",
      "Six of those forty-eight cities get a second job. Cities of refuge, three on each side of the Jordan, so that anyone who kills a person by accident has somewhere to run before an angry relative catches him on the road.",
      "Even in a story full of hard justice, there is a door built in for the person who never meant to do it. You just have to be able to reach it in time.",
    ]),
    num(35, 16, 34, [
      "The law draws a sharp line here. Strike someone with an iron tool, a stone, or a wooden weapon and they die, that is murder, and the murderer is put to death. Push someone in hatred, or hurl something at them on purpose, same verdict.",
      "But if it happens suddenly, with no hatred behind it and no one lying in wait, the whole congregation has to judge between the killer and the avenger of blood, and rule in favor of the one who never meant it.",
      "No ransom buys back a murderer's life, and no ransom lets the man in the city of refuge pay his way home early. He stays until the high priest dies, not until he can afford to leave.",
      "The reasoning given is not just fairness between two families. Blood pollutes the land, and only blood atones for it, because the Lord himself lives among these people. Justice here is about who they are living next to, not only who broke the law.",
    ]),
    num(36, 1, 13, [
      "The heads of Gilead's family come back to Moses with a real worry. If Zelophehad's five daughters marry outside their own tribe, their inherited land goes with them, and Manasseh loses ground for good at the next Jubilee.",
      "This is the same five daughters from a few weeks back, the ones who asked for their father's inheritance because he had no sons. Their win just created a problem nobody had thought through yet.",
      "Moses gives the ruling, straight from the Lord. Daughters who inherit land have to marry within their father's own tribe. Not because their claim was wrong, but so the tribes stay whole the way God assigned them.",
      "Mahlah, Tirzah, Hoglah, Milcah, and Noah marry their cousins, exactly as they are told, and the book of Numbers ends right there, on a family keeping the land in the family.",
    ]),
    deut(1, 1, 18, [
      "The book changes completely here. Numbers has been God speaking through Moses. Deuteronomy is Moses speaking to the people directly, in his own voice, in the plains of Moab, with the Jordan right in front of them.",
      "He starts by naming exactly where they are and how long the trip should have taken. Eleven days from Horeb to Kadesh-barnea by the mountain road. It took thirty-eight years.",
      "Then he retells appointing judges over thousands, hundreds, fifties, and tens, because one man could not carry the weight of every dispute alone. Hear the small cases yourselves, he tells them, and bring me the hard ones.",
      "This is an old man handing off a system he built decades ago, to people who were not even alive when he built it.",
    ]),
    deut(1, 19, 46, [
      "Moses retells the spies, but from his own angle. You came to me and asked to send men ahead, he says. In Numbers, God gave the order. Here, forty years later, Moses remembers it as the people's idea.",
      "He does not soften what happened next. Ten spies talked, the whole camp wept all night, and said the Lord hated them and brought them out of Egypt just to hand them to the Amorites.",
      "God's sentence is total. Not one man of that generation would see the land, except Caleb and Joshua. And Moses says plainly that he was shut out too, because of you, for your sakes, laying his own exclusion on the people.",
      "Then, too late, the people changed their minds and tried to charge up the hill anyway, without God and without Moses. The Amorites chased them like bees and beat them down from Seir to Hormah. So they stayed in Kadesh, Moses says, many days. A whole generation's life, summed up in one flat sentence.",
    ]),
  ],
  closing: [
    ["So that is Day 47.", 700],
    ["A border with mile markers, cities scattered through everyone else's land, and a law that makes room for the person who never meant to do it.", 800],
    ["Then Zelophehad's daughters married their cousins, and Numbers just ends. No fanfare. The book closes on a family keeping its land.", 800],
    ["And Moses stood up in the plains of Moab and started talking. Not God speaking through him this time. Moses, in his own voice, looking back.", 850],
    ["Eleven days, he said. It took thirty-eight years.", 800],
    ["He owns his exclusion from the land, even while he lays the blame on the people who caused it. That is a very human way to tell your own story.", 850],
    ["Tomorrow, Deuteronomy 2 through 5. Moses keeps looking back, and the Ten Commandments get repeated to a generation that never heard them the first time.", 850],
    ["For now, hold on to his line about the border.", 750],
    ["You can walk to every edge of it.", 1200],
  ],
};
