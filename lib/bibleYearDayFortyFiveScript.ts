import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 45, written to the Day 1 standard.
 *
 * Numbers 26-29: after the plague at Baal-Peor kills the last of the old
 * generation, a second census counts the new one, Zelophehad's daughters
 * force a change in the inheritance law, Moses is told he will die without
 * entering the land and hands leadership to Joshua, and the chapter turns to
 * the fixed calendar of offerings that will carry on long after this
 * generation is gone. Seven blocks across four chapters, consolidating the
 * tribal census lists the way Day 39 consolidated the camp order.
 */

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 45,
  title: "A New Generation Counted",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 45. The plague is over, and Moses counts the camp again.", 750],
    ["Every single man from the first count is dead now. Every one, except two.", 800],
    ["So this count is not a record of who survived. It is a record of who is left to inherit.", 850],
    ["A father with no sons is about to change the law. And Moses is about to learn he will not be crossing the river.", 850],
    ["We are in Numbers 26 through 29.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    num(26, 1, 11, [
      "God tells Moses and Eleazar to count the men twenty and up again, the same instruction given forty years ago in Sinai. Different names, same command.",
      "Reuben's line gets a note dropped right into the list. Dathan and Abiram, the very men who stood with Korah against Moses and Aaron, until the ground opened and swallowed them.",
      "Then one line that is easy to miss and should not be. The children of Korah did not die. Judgment fell on the man who rebelled. It did not automatically fall on every child who came after him.",
      "That is worth sitting with before the numbers even start. This whole census is going to be full of names attached to old stories, some of them buried, some of them still standing.",
    ]),
    num(26, 12, 51, [
      "Tribe by tribe, family by family, the same pattern runs all the way down. A name, the family that comes from it, a total. It reads like a spreadsheet because it is one.",
      "But two things break the pattern on purpose. Judah's list remembers that Er and Onan died in Canaan, and Manasseh's list names Zelophehad, who had no sons, only daughters. Mahlah, Noah, Hoglah, Milcah, and Tirzah. Remember those five names.",
      "When the totals are added up, the number comes to six hundred one thousand seven hundred thirty. Compare that to six hundred three thousand five hundred fifty at the last census, in Sinai, forty years ago.",
      "Virtually the same number of people. Almost none of the same people. An entire generation died in the wilderness, and the nation did not shrink. God kept the count intact while completely replacing who stood inside it.",
    ]),
    num(26, 52, 65, [
      "God tells Moses the land will be divided by this count. More people, more land. Fewer people, less land. And the specific plot decided by lot, not by preference or rank.",
      "The Levites are counted separately, twenty-three thousand males a month old and up, and they get no share of the land at all, because their inheritance was never meant to be ground.",
      "Then the chapter closes with the line the whole census has been building to. Among all these, there was not a man of them whom Moses and Aaron numbered in the wilderness of Sinai.",
      "Not one, except Caleb and Joshua. The Lord had said that generation would die in the wilderness, and forty years later, Scripture checks its own math and confirms it happened exactly that way.",
    ]),
    num(27, 1, 11, [
      "Zelophehad's five daughters come forward together, right at the door of the tabernacle, in front of Moses, Eleazar, the leaders, and the whole assembly. That takes nerve.",
      "Their case is specific and fair. Our father died for his own sin, not in Korah's rebellion, and he left no son. Why should his name disappear from Israel just because he had no boy to carry it?",
      "Moses does not have an answer ready, so he takes it straight to God. And God's response is blunt. The daughters of Zelophehad speak right. Give them their father's inheritance.",
      "Then it becomes permanent law, not a one-time exception. Daughters, then brothers, then uncles, then the nearest kinsman. Five women asking a hard question in public just reshaped Israel's inheritance law for good.",
    ]),
    num(27, 12, 23, [
      "God tells Moses to climb Mount Abarim and look at the land he is giving Israel, and then tells him plainly he will die there, the way Aaron already did, for what happened at the waters of Meribah.",
      "Moses does not argue for himself. No pleading to be let in anyway. Instead he asks God for someone to lead the people so they are not left like sheep without a shepherd.",
      "That is the whole request. Not save me. Save them from being leaderless. Forty years of carrying this nation, and his last recorded ask is about who takes care of them after he is gone.",
      "God gives him Joshua, and has him lay his hands on him in front of Eleazar and the entire congregation, giving him public honor before Moses is even out of the picture. The transfer happens in daylight, not in secret.",
    ]),
    num(28, 1, 31, [
      "God lays out the fixed rhythm of worship going forward. Two lambs every single day, one in the morning, one at evening, without exception. Not something the people build up to. A floor that never moves.",
      "The Sabbath doubles that offering. The start of every month adds bulls, rams, and lambs on top of the daily pattern. Layer after layer, all of it stacking on the same continual base.",
      "Then Passover and the seven days of Unleavened Bread get their own fixed offerings, and Firstfruits gets its own again. None of it replaces the daily lambs. It all sits on top of them.",
      "This whole chapter is a calendar built for people who will not be here to see most of it kept. Moses is about to die outside the land, and he is still the one recording the offering schedule for a nation that will keep it for centuries.",
    ]),
    num(29, 1, 40, [
      "The seventh month carries three of Israel's biggest days. Trumpets on the first, a day set apart just to be marked by sound. The Day of Atonement on the tenth, the one day a year anyone afflicts their soul before the Lord.",
      "Then Tabernacles, seven days starting on the fifteenth, and the bull count does something no other offering in the Bible does. Thirteen bulls the first day, twelve the second, eleven the third, counting down one at a time to seven on the last day.",
      "Add it up and it comes to seventy bulls across the week. Seventy, the number Israel used for the nations of the earth in Genesis 10. A feast that started as thanks for Israel's own harvest ends up offered in a number that reaches past Israel.",
      "Then an eighth day, its own solemn assembly, separate from the seven. And the whole section ends with one plain sentence. Moses told the children of Israel according to all that the Lord commanded him. Everything, exactly as given.",
    ]),
  ],
  closing: [
    ["So that is Day 45.", 700],
    ["A second census, taken after an entire generation died exactly the way God said it would.", 800],
    ["Same number of people. Almost none of the same names. Caleb and Joshua the only two men left standing from the first count.", 850],
    ["Five daughters walked up to the tabernacle with a hard question, and the law changed because they asked it.", 800],
    ["Moses found out he would die outside the land, and used his last request to ask for a shepherd for the people, not a pardon for himself.", 850],
    ["Then a calendar of offerings, written by a man who would never live to see most of it kept.", 800],
    ["Tomorrow, Numbers 30 through 33. Vows that bind, a war against Midian, and the whole journey looked back on in one long list.", 850],
    ["For now, hold on to the daily lambs.", 750],
    ["Morning and evening, whether anyone is watching or not.", 800],
    ["That was the floor everything else got built on.", 1200],
  ],
};
