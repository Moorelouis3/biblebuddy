import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 44, written to the Day 1 standard.
 *
 * Numbers 22-25: Balak hires Balaam to curse Israel, a donkey sees the angel
 * of the Lord before the prophet does, four oracles that turn every curse
 * into a blessing (ending in a Star out of Jacob), and the compromise at
 * Baal-Peor that costs Israel more than Balaam's curse ever could. Six
 * blocks across four chapters.
 */

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 44,
  title: "Balaam, Blessing, and Compromise",
  opening: [
    ["Hey. Good to see you.", 700],
    ["Day 44. Israel just took down two kings. Now a third king wants a different weapon.", 750],
    ["He hires a prophet to curse them instead of fighting them.", 800],
    ["And the prophet's own donkey turns out to see more than he does.", 850],
    ["What Balak cannot do with an army, someone tries to do with words. And what an army could not do, a bad night with the wrong women almost does.", 850],
    ["We are in Numbers 22 through 25.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    num(22, 1, 20, [
      "Balak, king of Moab, watches what Israel did to Sihon and is sick with dread. He sends elders to Balaam with money for divination, asking him to curse this people, for they are too mighty for me.",
      "God tells Balaam plainly, do not go with them, do not curse the people, for they are blessed. Balaam sends the elders home. That should be the end of it.",
      "Balak tries again with more princes and a bigger offer. Balaam says even a house full of silver and gold could not make him go beyond the word of the Lord his God.",
      "This time God tells him, go with them, but only speak the word I tell you. Permission is not the same thing as approval. Balaam wanted to go, and God let him find that out the hard way.",
    ]),
    num(22, 21, 41, [
      "Balaam saddles his donkey and goes, and God's anger burns because he went. The angel of the Lord stands in the road as an adversary, and only the donkey sees him.",
      "Three times the donkey balks, and three times Balaam beats her, blind to the drawn sword right in front of him. Then the Lord opens the donkey's mouth, and she asks him what she ever did to deserve three beatings.",
      "Only then does God open Balaam's eyes. He sees the angel and falls on his face. The angel says the donkey saved his life. Had she not turned aside, Balaam would already be dead and she would still be standing.",
      "A famous prophet, hired to see what others cannot, is the last one in the story to see anything at all. His own donkey outperforms him at his own job.",
    ]),
    num(23, 1, 26, [
      "Balak builds altars and offers sacrifices, trying to buy a curse the normal way. Balaam meets God, and God puts words in his mouth that are not the ones Balak paid for.",
      "How shall I curse whom God has not cursed? Let me die the death of the righteous, Balaam says, staring at a people he has no personal love for at all.",
      "Balak drags him to a second mountain and tries again. God is not a man, that he should lie. He has blessed, and I cannot reverse it. The Lord his God is with him.",
      "Balak is not hiring a weapon. He is discovering there isn't one. You cannot pay for a curse on people God has already decided to bless.",
    ]),
    num(24, 1, 25, [
      "Balaam stops even bothering with omens this time. He just looks out at Israel camped tribe by tribe, and the Spirit of God comes on him. How lovely are your tents, O Jacob.",
      "Balak's anger finally breaks. I called you to curse my enemies, and you have blessed them three times. Balaam reminds him he said from the start he could only speak what God gives him.",
      "Then, unpaid and about to leave, Balaam gives one more oracle anyway. I see him, but not now. A star will come out of Jacob, a scepter will rise out of Israel. He is describing a king he will never meet.",
      "A hired outsider, with no stake in Israel at all, ends up naming the Messiah centuries early. God can put the truth in a mouth that never intended to serve Him.",
    ]),
    num(25, 1, 9, [
      "Israel camps at Shittim, and the men begin sleeping with the women of Moab, then get pulled into worshiping their gods at Baal-Peor. The Lord's anger burns against Israel.",
      "This is what forty years in a wilderness, a wall of manna, and a bronze serpent could not undo. Comfort and a border did what plagues and hunger never managed.",
      "In the middle of the weeping at the tabernacle door, an Israelite man walks a Midianite woman into his tent in plain sight of everyone. Phinehas takes a spear and follows them in, and kills them both.",
      "The plague stops. Twenty-four thousand had already died. What Balaam's curses could not touch, a quiet compromise nearly finished on its own.",
    ]),
    num(25, 10, 18, [
      "God tells Moses that Phinehas has turned back His wrath, because he was jealous with God's own jealousy for Him.",
      "God gives Phinehas a covenant of peace, an everlasting priesthood for him and his descendants, because he was zealous for his God and made atonement for the people.",
      "Then God tells Israel to treat the Midianites as enemies, because of what they did in seducing Israel at Peor. Later Scripture reveals it was Balaam himself who advised that plan, once he found out he could not curse Israel outright.",
      "The prophet who blessed Israel with his mouth still found a way to hurt them, through a door his mouth was never allowed to open. That is worth remembering the next time something you cannot argue against just quietly gets invited in.",
    ]),
  ],
  closing: [
    ["So that is Day 44.", 700],
    ["A hired prophet, a talking donkey, four blessings nobody paid for, and a plague that started in a tent.", 750],
    ["Balak spent a fortune trying to get Israel cursed by a professional, and God turned every attempt into a blessing instead. Not one word landed the way Balak wanted.", 850],
    ["Then Israel did more damage to itself at Baal-Peor in an afternoon than three failed curses ever managed. The threat Israel could not be talked out of, it eventually walked into.", 850],
    ["And in the middle of it, a star out of Jacob got named by a man who was only ever trying to get paid.", 850],
    ["God does not need a willing mouth to tell the truth. He just needs a mouth.", 850],
    ["Tomorrow, Numbers 26 through 29. A whole new generation gets counted, ready to do what their parents would not.", 850],
    ["For now, hold on to the donkey.", 800],
    ["She saw the sword first.", 750],
    ["The prophet was the last to see anything.", 1200],
  ],
};
