import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 26, written to the Day 1 standard.
 *
 * Exodus 17-20: water from a rock, a war won by tired arms, Jethro's advice,
 * and then Sinai itself - fire, smoke, and the Ten Commandments spoken out
 * loud to the whole camp. Seven blocks, teaching kept to four lines so a
 * four-chapter day still lands in range.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
  book: "exodus",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWENTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 26,
  title: "The Ten Commandments",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 26. Israel gets water from a rock, wins a war with tired arms, and then arrives at the mountain.", 750],
    ["Everything before this day has been rescue. This is the day it becomes relationship.", 800],
    ["God is about to tell a free people, out loud, in front of everyone, how to actually live.", 850],
    ["We are in Exodus 17 through 20.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(17, 1, 7, [
      "No water again, at Rephidim, and the people do not ask this time. They chide with Moses. Give us water, that we may drink.",
      "Moses asks the honest question back. Why do you tempt the Lord? And admits he is close to being stoned by his own people.",
      "God tells him to take the same rod that struck the Nile and strike a rock instead, in front of the elders, and water comes out of it.",
      "He names the place Massah and Meribah, temptation and strife, so the question itself gets written into the map. Is the Lord among us, or not?",
    ]),
    g(17, 8, 16, [
      "Amalek attacks, unprovoked, while Israel is still walking, still weak, still just out of Egypt. Moses sends Joshua to fight and climbs a hill with the rod of God in his hand.",
      "As long as Moses holds his hands up, Israel prevails. When his arms drop, Amalek prevails. Nobody explains why. It just is that way.",
      "So when his arms grow heavy, Aaron and Hur do not tell him to push through it. They sit him on a stone and hold his hands up themselves, one on each side, until the sun goes down.",
      "Moses builds an altar and calls it The Lord Is My Banner. The battle was won by a man who could not even hold up his own arms without help. That is worth remembering next time you think you have to do this alone.",
    ]),
    g(18, 1, 27, [
      "Jethro, Moses' father-in-law, hears everything God has done and brings Moses his wife and sons, who had been sent away. Moses tells him the whole story, and Jethro rejoices, and worships, and shares a meal before God with Aaron and the elders.",
      "Then Jethro watches Moses sit alone all day judging every dispute in the entire camp, and says the thing nobody else has dared to say. The thing you are doing is not good. You will wear away, both you and this people.",
      "His fix is not spiritual, it is structural. Find able men who fear God and hate a bribe, and put them over thousands, hundreds, fifties, and tens. Let them handle the small matters. Bring only the hard ones to you.",
      "Moses listens to his father-in-law and does exactly what he says. One of the most respected leaders in Scripture becomes great here by taking advice from family, not by refusing to need any.",
    ]),
    g(19, 1, 15, [
      "Three months out from Egypt, they arrive at Sinai, and God offers something new. Not just rescue this time. A relationship, and He states its terms up front.",
      "You have seen what I did to Egypt, and how I bore you on eagles' wings, and brought you to myself. Obey, and you will be a peculiar treasure, a kingdom of priests, a holy nation.",
      "The people answer together, before they have heard a single command. All that the Lord has spoken we will do. They say yes to the relationship before they know what it will cost.",
      "God tells them to wash their clothes and stay ready for two days, and sets a boundary around the mountain that nobody may cross, not even out of curiosity. Nearness to God is not casual.",
    ]),
    g(19, 16, 25, [
      "On the third morning there is thunder and lightning, a thick cloud, and a trumpet sound so loud the whole camp trembles. Sinai is on fire and smoke, and the whole mountain shakes.",
      "Moses speaks, and God answers him with a voice, and God comes down to the top of the mountain and calls Moses up.",
      "Then comes a warning that says everything about how serious this moment is. Charge the people, lest they break through to gaze, and many of them perish.",
      "This is not distance for its own sake. It is God protecting a people who are not ready for what unfiltered holiness would do to them up close.",
    ]),
    g(20, 1, 17, [
      "And God speaks all these words, out loud, to the entire nation, not just to Moses on the mountain. I am the Lord your God, who brought you out of Egypt. Everything after that sentence rests on it. Obedience follows rescue, it does not earn it.",
      "No other gods. No graven images. Do not take His name in vain. Remember the Sabbath, because He rested on the seventh day, and so you do too.",
      "Honor your father and mother. Do not kill. Do not commit adultery. Do not steal. Do not bear false witness. All of it protects something. A neighbor's life, marriage, property, reputation.",
      "And then the last one turns inward, where none of the others reach. Do not covet. You cannot police a heart from the outside. God ends the list at the one commandment only He can see you keep or break.",
    ]),
    g(20, 18, 26, [
      "The people see the thunder and the lightning and the mountain smoking, and they tremble, and stand far off, and say the thing that decides the shape of the rest of the Bible. Speak to us yourself, and we will listen. But do not let God speak to us, lest we die.",
      "Moses tells them not to be afraid. God came this way on purpose, to prove you, and put His fear before you, so you will not sin.",
      "Then Moses draws near into the thick darkness where God is, becoming the one who stands in the gap so the people do not have to.",
      "And the very next instruction is about an altar of plain earth, not silver or gold, not cut stone touched by a tool. God wants nearness that costs nothing to build and everything to keep.",
    ]),
  ],
  closing: [
    ["So that is Day 26.", 700],
    ["Water from a rock, a war won by held-up arms, good advice from a father-in-law, and then the mountain on fire.", 750],
    ["Notice what happens right before the commandments ever get spoken. God reminds them who rescued them first.", 800],
    ["This was never a ladder to climb to earn God's love. It is instructions for a people who already have it.", 850],
    ["And notice the last thing the people themselves ask for. Not less of God. Just some distance, and someone standing in the gap for them.", 850],
    ["That request does not go away. It runs all the way through the rest of the Bible, until someone finally answers it for good.", 850],
    ["Tomorrow, Exodus 21 through 24. The Ten Commandments get worked out into actual daily law, and Israel makes the covenant official.", 850],
    ["For now, hold on to what they said at the bottom of the mountain.", 800],
    ["Speak to us yourself, and we will listen.", 750],
    ["But do not let God speak to us, lest we die.", 1200],
  ],
};
