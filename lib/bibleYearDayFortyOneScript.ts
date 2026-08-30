import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 41, written to the Day 1 standard.
 *
 * Numbers 10-13: the trumpets, the cloud finally lifting off Sinai after a
 * full year camped there, and then the fast unraveling that follows -
 * complaining at Taberah, craving at Kibroth-hattaavah, Miriam and Aaron
 * turning on Moses, and the spies bringing back fear instead of faith. Six
 * blocks across four chapters, teaching four lines each like Day 11.
 */

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 41,
  title: "Journey, Complaints, and Spies",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 41. The cloud lifts.", 750],
    ["Israel has been camped at Sinai for almost a year. Law given, tabernacle built, everyone counted and organized.", 800],
    ["Today they finally move.", 850],
    ["And it goes wrong faster than you would think.", 1000],
    ["Complaining, craving, a family fight in Moses' own tent, and then twelve men sent to look at the promised land who come back with two completely different stories.", 850],
    ["We are in Numbers 10 through 13.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    num(10, 1, 10, [
      "God tells Moses to make two silver trumpets, and gives him a reason for every kind of blast. One trumpet calls the leaders. Both together call the whole camp. A different sound tells the tribes when it is time to set out.",
      "An alarm sounds them into battle, so that Israel is remembered before the Lord and saved from their enemies. The same trumpets also sound over the offerings, on feast days, at the beginning of every month.",
      "Even the noise in this camp is not left to chance. Nobody has to guess whether it is time to gather, march, fight, or worship.",
      "That level of order is about to matter, because after a year of standing still, everything is about to start moving at once.",
    ]),
    num(10, 11, 36, [
      "On the twentieth day of the second month, in the second year, the cloud lifts from over the tabernacle. And the people of Israel set out, by stages, from the wilderness of Sinai.",
      "The tribes move in the exact order God laid out back in chapter 2, camp by camp, the tabernacle taken down and carried in the middle of the line. A year of organizing was not busywork. It was rehearsal for this morning.",
      "Moses asks Hobab, his father-in-law's son, to come with them. You know where we should camp in the wilderness, and you will be as eyes for us. Even with the cloud leading them, Moses still wants a man who knows the ground.",
      "And the ark itself goes before them three days' journey, to search out a resting place. Every time it set out Moses said, Rise up, Lord, and let your enemies be scattered. Every time it rested, he said, Return, O Lord, to the many thousands of Israel.",
    ]),
    num(11, 1, 15, [
      "The people complain, and it displeases the Lord, and fire from Him burns among them until Moses prays and it stops. They name the place Taberah. Burning. This is the very first stop.",
      "Then the mixed multitude among them starts craving, and the people of Israel start weeping again, remembering the fish they ate in Egypt for free, the cucumbers, the melons, the leeks, the onions, the garlic.",
      "But now our soul is dried away. There is nothing at all besides this manna before our eyes. The bread that fell from heaven every single morning has stopped looking like a gift and started looking like a punishment.",
      "Moses breaks under it and says the rawest thing he has said yet. Why have you laid the burden of all this people on me? Did I conceive them, did I give birth to them, that you should say to me, carry them in your bosom?",
    ]),
    num(11, 16, 35, [
      "God tells Moses to gather seventy elders. He will take some of the Spirit that is on Moses and put it on them, so Moses will not carry this people alone. When the Spirit rests on them, they prophesy.",
      "Two of them, Eldad and Medad, prophesy back in the camp instead of at the tent. Joshua wants Moses to stop them. Moses answers, Are you jealous for my sake? Would that all the Lord's people were prophets, that the Lord would put His Spirit on them.",
      "Then a wind drives in quail from the sea, piled up two cubits deep on the ground all around the camp, and the people gather it for two days straight, greedy for the meat they demanded.",
      "While the meat is still between their teeth, before it is even chewed, the Lord strikes them with a very great plague. They call the place Kibroth-hattaavah. The graves of craving. They got exactly what they asked for, and it buried some of them.",
    ]),
    num(12, 1, 16, [
      "Miriam and Aaron speak against Moses, because of the Cushite woman he had married, and then say what is really underneath it. Has the Lord indeed spoken only through Moses? Has He not spoken through us also?",
      "Scripture stops to tell you something before God answers. Now the man Moses was very meek, more than all the men who were on the face of the earth. That detail matters for what happens next.",
      "God calls all three to the tabernacle, comes down in the pillar of cloud, and says it plainly. With Moses I speak mouth to mouth, clearly, not in riddles. Why then were you not afraid to speak against my servant Moses?",
      "Miriam is struck with leprosy, white as snow. Aaron begs Moses not to hold the sin against them, and Moses cries out, Heal her now, O God, I beg you. She is shut outside the camp seven days, and the whole nation, hundreds of thousands of people, waits for her before moving on.",
    ]),
    num(13, 1, 33, [
      "God tells Moses to send one leader from each tribe to spy out the land of Canaan, and Moses gives Hoshea the son of Nun a new name before he goes. Joshua. The Lord is salvation.",
      "For forty days they search the land, and come back carrying a single cluster of grapes so heavy it takes two men on a pole to carry it, along with pomegranates and figs. It really is flowing with milk and honey, exactly as promised.",
      "But ten of the twelve focus on what stands between Israel and that land. The cities are fortified, very large, and the descendants of Anak are there. We seemed to ourselves like grasshoppers, and so we seemed to them.",
      "Caleb tries to quiet the people. Let us go up at once and possess it, for we are well able to overcome it. Twelve men saw the exact same land. Only two of them saw a God big enough to take it.",
    ]),
  ],
  closing: [
    ["So that is Day 41.", 700],
    ["Trumpets, a cloud lifting after a year of standing still, and then a nation coming apart in four fast chapters.", 750],
    ["Notice where the trouble actually starts. Not at the edge of the land. At the very first stop, over food they were already being fed.", 800],
    ["Complaining at Taberah. Craving at Kibroth-hattaavah. A sister and brother questioning the man God chose. Ten spies who let giants get bigger than God.", 850],
    ["And through every single one of it, Moses keeps praying for the people who keep attacking him. Even for the sister who just accused him.", 850],
    ["That is the real center of this day. Not the rebellion. The mediator who will not stop interceding.", 850],
    ["Tomorrow, Numbers 14 through 17. The whole nation refuses to go up, and God has to decide what happens to a people who will not trust Him.", 850],
    ["For now, hold on to what the ten spies said about themselves.", 800],
    ["We were like grasshoppers in our own eyes.", 750],
    ["Nobody made them small. They made themselves small.", 1200],
  ],
};
