import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 46, written to the Day 1 standard.
 *
 * Numbers 30-33: the law of vows, the war of vengeance against Midian that
 * closes out Moses's public life, Reuben and Gad asking to settle east of
 * the Jordan before the conquest even starts, and the full forty-two-station
 * itinerary of the whole wilderness journey written down by Moses himself.
 * Seven blocks across four chapters, consolidating the station list the way
 * Day 26/39/45 consolidated their census and tribal lists.
 */

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 46,
  title: "Vows, Victory, and the Journey Reviewed",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 46. Moses is nearing the end of his part in this story.", 750],
    ["Today he settles the law on keeping your word, fights his last battle, and then sits down and writes out every single place Israel has camped since Egypt.", 850],
    ["Two tribes also ask to stay on this side of the river. Not everyone wants to keep going.", 800],
    ["We are in Numbers 30 through 33.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    num(30, 1, 16, [
      "The rule starts flat and total. If a man vows a vow to the Lord, he does not break his word. Whatever came out of his mouth, he does it.",
      "For a young woman still in her father's house, or a wife in her husband's house, the vow stands unless the man over her speaks against it the very day he hears it. Silence is agreement. A word later, once the day has passed, changes nothing.",
      "But notice who gets full authority over her own word. A widow, or a woman who is divorced. Whatever she vows stands, because there is no husband or father positioned over her to overrule it.",
      "This is not a chapter about women's word meaning less. It is about a household speaking with one voice before God, and it draws a hard line for exactly the women that structure could otherwise leave stuck. Once she answers to no man, her vow is entirely her own.",
    ]),
    num(31, 1, 12, [
      "God tells Moses to avenge Israel on Midian, and then says something else in the same breath. Afterward you will be gathered to your people. This is Moses's last assignment before he dies.",
      "A thousand men from every tribe, twelve thousand in all, go out with Phinehas and the trumpets. Every king of Midian falls, five of them named outright.",
      "And one more name is buried in that list. Balaam, son of Beor, they killed with the sword. The prophet who could not curse Israel with his mouth dies by the very war his own advice helped provoke.",
      "He blessed Israel four times because God would not let him do otherwise, then went and found another way to hurt them. That other way caught up with him here.",
    ]),
    num(31, 13, 24, [
      "Moses comes out to meet the returning army and is furious with the officers. Have you saved all the women alive? These are the same women who, on Balaam's advice, led Israel into Baal-Peor and cost twenty-four thousand lives to a plague.",
      "His order is severe and the text does not soften it. Kill the boys, kill the women who were complicit, keep the virgin girls alive for yourselves. This is one of the hardest passages in the whole reading, and it deserves to be read as exactly that hard, not explained away.",
      "What follows is a purification law, not a footnote. Anyone who killed or touched a body waits seven days outside the camp, washes on the third and seventh day, and every metal object goes through fire before it is called clean.",
      "War in this story never gets treated as neutral, even when God commands it. It leaves the men who fought unclean for a week before they are allowed to come home.",
    ]),
    num(31, 25, 54, [
      "The plunder gets split in half, one side for the soldiers, one for the whole congregation, and out of each half a tribute goes to the Lord. One of every five hundred from the fighters' share, one of every fifty from the congregation's, given to the priests and Levites.",
      "The totals are almost too large to picture. Six hundred seventy-five thousand sheep, seventy-two thousand cattle, sixty-one thousand donkeys, thirty-two thousand women. All of it counted out to the exact tribute owed.",
      "Then the officers come to Moses with something unexpected. Not one man of us is missing. Twelve thousand went to war against Midian and every single one came home.",
      "So they bring a freewill offering of gold jewelry, to make atonement for their own souls, and it gets carried into the tabernacle as a memorial before the Lord. Even a battle with zero Israelite casualties still calls for atonement in this story, not a victory lap.",
    ]),
    num(32, 1, 42, [
      "Reuben and Gad have huge herds, and the land of Jazer and Gilead is good grazing country on the near side of the Jordan. So they ask Moses to let them settle there instead of crossing over.",
      "Moses does not hear a logistics request. He hears the spies at Kadesh-barnea again. Shall your brothers go to war while you sit here? That is exactly what discouraged this whole nation forty years ago, and it cost that generation the land.",
      "So they offer a compromise. Build pens for the cattle and towns for the children now, then cross over armed, ahead of everyone else, and do not go home until every other tribe has its inheritance too.",
      "Moses agrees, on those exact terms, and warns them plainly what happens if they break the deal. They keep it. Gilead gets rebuilt, old Amorite cities get new names, and two and a half tribes settle before the conquest of Canaan has even begun.",
    ]),
    num(33, 1, 49, [
      "Moses himself writes this list, by the Lord's command. Every departure, every campsite, from Rameses on the night of the plague to the plains of Moab by the Jordan. Forty-two stops.",
      "Most of them are a single line. They departed from here, and pitched there. Rephidim, where there was no water. Kibroth-hattaavah, the graves of craving. Names that were entire chapters earlier in this journey, reduced now to one clause each.",
      "And right in the middle of the list, without warning, Aaron climbs Mount Hor and dies there, a hundred and twenty-three years old, in the fortieth year out of Egypt. The list does not pause for him. It just keeps moving to the next campsite.",
      "That is what forty years looks like from far enough away. Water miracles, rebellions, a brother's death, all of it compressed into place names in a row, because the story is not over yet and Moses still has to get to the last one.",
    ]),
    num(33, 50, 56, [
      "God tells Moses exactly what has to happen once they cross the Jordan. Drive out everyone living there. Destroy every carved image, every idol, every high place, completely.",
      "Then divide the land by lot, more to the larger tribes, less to the smaller ones, each family settling where the lot falls.",
      "And then the warning, stated as plainly as anything in this book. Whatever you do not drive out will become pricks in your eyes and thorns in your sides in the very land where you live.",
      "The last line is the sharpest. What I planned to do to them, I will do to you. The same command that gives Israel the land also puts them on notice that the land does not protect anyone who does what its previous residents did.",
    ]),
  ],
  closing: [
    ["So that is Day 46.", 700],
    ["A law about keeping your word, a war that finished the account Balaam opened, and two tribes who wanted to stop just short of the finish line.", 800],
    ["Moses fought his last battle, and did not once ask for it to be about him.", 800],
    ["And then he sat down and wrote out forty-two campsites, one line at a time, with his own brother's death tucked into the middle of the list like it was just another stop.", 850],
    ["That is honest about what a long obedience actually looks like from the outside. Mostly it looks like a list.", 800],
    ["Tomorrow, Numbers 34 through 36 and the first chapter of Deuteronomy. The borders of the land get drawn, and Moses starts looking back over the whole journey out loud.", 850],
    ["For now, hold on to the list.", 750],
    ["Forty-two stops.", 750],
    ["Every one of them on the way somewhere.", 1200],
  ],
};
