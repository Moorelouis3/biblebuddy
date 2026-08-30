import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 49, written to the Day 1 standard.
 *
 * Deuteronomy 6-9: the Shema and the command to love God with everything,
 * the warning about forgetting him once the houses are built and the
 * stomachs are full, why Israel was chosen at all, the wilderness testing
 * and the manna, and Moses retelling the golden calf and his forty-day
 * intercession from the inside. Seven blocks across one heavy four-chapter
 * reading, matching the shape Day 48 used.
 */

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 49,
  title: "Love God and Remember Grace",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 49. Moses keeps talking, and today the stakes get personal.", 750],
    ["Love God with everything you have. That is the command.", 800],
    ["Then two warnings folded inside it. Do not forget him once life gets good. And do not think you got here on your own.", 850],
    ["And right in the middle, Moses tells on Israel. The worst thing they ever did, while he was standing there watching it happen.", 900],
    ["Not because they earned this land. Because he loved them first.", 950],
    ["We are in Deuteronomy 6 through 9. The Shema, the manna, and the golden calf retold.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    deut(6, 1, 9, [
      "Moses gives Israel the command everything else hangs on. Hear, O Israel: the Lord our God is one Lord. And you shall love the Lord your God with all your heart, all your soul, all your might.",
      "Not just obey him. Love him. With the whole of you, not the parts that are easy to give.",
      "Then he says where these words go. Not on a shelf. In your heart. Talk about them at home, on the road, lying down, getting up. Tie them on your hand. Write them on your door.",
      "This was never meant to be a once-a-week religion. Moses is describing a life so soaked in God that a stranger walking through your house would trip over it.",
    ]),
    deut(6, 10, 25, [
      "Moses looks ahead to a problem success is going to cause. Houses you did not build. Wells you did not dig. Vineyards you did not plant. All of it just handed to you.",
      "And his warning is not about failure. It is about comfort. Beware, lest when you have eaten and are full, you forget the Lord who brought you out of the house of slaves.",
      "He also tells them not to test God the way their parents did at Massah, demanding proof before they would trust him again.",
      "Then he pictures a child years from now asking what these laws even mean. And the answer Moses hands down is not a rule. It is a story. We were slaves in Egypt, and he brought us out.",
    ]),
    deut(7, 1, 11, [
      "God is about to hand Israel seven nations bigger and stronger than they are, and the instruction is total. Make no treaty with them. Show them no mercy. Do not marry into their families, because it will pull your children away from me.",
      "Then Moses tells them exactly why they were picked, and it is not flattering. The Lord did not set his love on you because you were more in number than other people. You were the fewest of all.",
      "He loved you because he loved you. Because he kept a promise made to your fathers before any of you existed.",
      "Sit with that. There is no version of this where Israel earned the choosing. The choosing came first, and everything else is a response to it.",
    ]),
    deut(7, 12, 26, [
      "Moses lists what obedience actually gets them. Blessed above every people. Nothing barren among you or your livestock. Every sickness taken away.",
      "Then he answers the fear before they say it out loud. If you say in your heart, these nations are more than I am, how can I drive them out — do not be afraid of them. Remember what he did to Pharaoh.",
      "God promises to clear the land little by little, not all at once, so wild animals do not overrun it faster than Israel can settle it. Even the conquest is paced for their sake.",
      "And one more warning, easy to skip past. Do not covet the silver and gold on their idols. Detest it completely. A trophy taken from a false god is still a trap, even sitting in your own house.",
    ]),
    deut(8, 1, 10, [
      "Moses turns to the forty years in the wilderness and tells them plainly what it was for. To humble you, to test you, to know what was in your heart, whether you would keep his commands or not.",
      "He let them get hungry on purpose, then fed them with manna, food neither they nor their fathers had ever seen, so they would learn that man does not live by bread alone, but by every word that comes from the mouth of God.",
      "Forty years, and their clothes did not wear out, and their feet did not swell. He compares it to a father disciplining a son. The hardship was not abandonment.",
      "And now he describes what is waiting on the other side. A land of wheat and barley, vines and fig trees, olive oil and honey. Bread without scarcity. Nothing lacking.",
    ]),
    deut(8, 11, 20, [
      "Right after describing that good land, Moses gives the warning that matters most in this whole reading. Beware that you do not forget the Lord your God by not keeping his commandments.",
      "He spells out exactly how it happens. You eat and are full. You build good houses and live in them. Your herds and silver and gold multiply. And then your heart gets lifted up, and you forget.",
      "He even names the sentence people say to themselves. My power and the might of my own hand have gotten me this wealth. Moses corrects it before they can say it. It is the Lord who gives you the power to get wealth.",
      "And he does not soften the ending. If you forget the Lord your God and go after other gods, you will perish, the same way the nations before you perished. Prosperity, not poverty, is the real danger in this chapter.",
    ]),
    deut(9, 1, 29, [
      "Moses tells them again that they are about to face nations greater and taller than they are, cities fortified up to the sky, and then he corrects a story they might tell themselves about why they are winning. Do not say, for my righteousness the Lord has brought me in to possess this land. It is for the wickedness of these nations, and to keep a promise made to Abraham, Isaac, and Jacob.",
      "Then he says it flat out. You are a stiff-necked people. And to prove it, he takes them back to Horeb, the mountain, forty days after they had just heard God's own voice out of the fire.",
      "While Moses was up there fasting, receiving two tables of stone written by the finger of God, the people melted their jewelry and made a calf and bowed down to it. Moses came down, saw it, and threw the tablets from his hands and shattered them in front of everyone.",
      "Then he tells them what it cost him personally. Forty more days face down on the ground, not eating, not drinking, begging God not to destroy them. He prayed for Aaron too, who had made the calf. Remember your servants, Abraham, Isaac, and Jacob. Look not at the stubbornness of this people. That prayer is the only reason there is anyone left to be reading this today.",
    ]),
  ],
  closing: [
    ["So that is Day 49.", 700],
    ["Love God with everything you have. Do not forget him when life gets easy. And remember exactly why you are standing where you are standing.", 800],
    ["Those three ideas keep circling back through all four chapters, and they need to, because Moses knows what is coming.", 800],
    ["He just told them the ugliest thing they ever did, the golden calf, right after telling them how good this new land is going to feel.", 800],
    ["That is not an accident. The warning comes right where the comfort does.", 800],
    ["And the only thing standing between Israel and total ruin at that mountain was one man face down on the ground for forty days, praying on behalf of people who did not deserve it.", 850],
    ["Tomorrow, Deuteronomy 10 through 13. Moses talks about circumcising the heart, and what covenant loyalty looks like once the fear wears off.", 850],
    ["For now, hold on to the reason Moses gave for all of it.", 800],
    ["Not because you were many.", 750],
    ["Because he loved you.", 1200],
  ],
};
