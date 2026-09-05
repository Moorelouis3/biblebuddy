import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 116, written to the Day 1 standard.
 *
 * Esther 1-4 opens the book: Vashti's refusal costs her the throne, Esther
 * becomes queen without anyone asking what she wanted, Mordecai quietly
 * saves the king's life and is forgotten, Haman turns one refusal into a
 * decree to destroy every Jew in the empire, and Esther is asked to risk
 * her own life to stop it. Seven blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Esther ${chapter}:${startVerse}-${endVerse}`,
  book: "esther",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 116,
  title: "Esther Rises for Such a Time",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 116. New book. Esther.", 700],
    ["And for the first time in this whole reading plan, God's name is never once written on the page.", 800],
    ["It opens with a king throwing a six-month party, a queen who says no, and an empire responding by passing a law about who runs a house.", 800],
    ["By the end of today, there is a decree on the books to destroy an entire people in a single day, and one woman standing between that decree and everyone she loves.", 800],
    ["She got there by accident. Or by something nobody in the story is willing to call an accident.", 900],
    ["We are in Esther 1 through 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(1, 1, 12, [
      "King Ahasuerus throws a display of his own wealth and power that runs a hundred and eighty days, then follows it with a seven-day feast for everyone in the fortress of Shushan, rich and poor alike.",
      "On the seventh day, merry with wine, he sends for Queen Vashti to come wearing her royal crown, so the officials and the people can look at how beautiful she is.",
      "Vashti refuses to come. The text does not tell you why. It only tells you the king is furious, and his anger burns in him.",
      "This whole empire runs on being seen and admired on command. Vashti is the first person in the book to simply say no to that.",
    ]),
    g(1, 13, 22, [
      "The king asks his wise men what the law says should be done to a queen who disobeys a command given in front of witnesses.",
      "Memucan answers, but notice who he is actually worried about. Not just the king's pride. He warns that when women everywhere hear what Vashti did, they will start despising their own husbands too.",
      "So letters go out to every province, in every language, declaring that every man should bear rule in his own house. An entire empire's legal system responding to one woman's private no.",
      "Vashti disappears from the story completely after this. The throne she leaves empty is exactly where Esther is about to be placed.",
    ]),
    g(2, 1, 18, [
      "Officers are sent through the whole kingdom to gather beautiful young women into the king's harem, and among them, without asking to be there, is a Jewish orphan named Hadassah, whom everyone calls Esther.",
      "She was raised by her cousin Mordecai, who took her as his own daughter after her parents died. He tells her not to say a word about being Jewish, and she does not.",
      "Esther wins favor with everyone who sees her, especially Hegai, who has charge of the women, and after a full year of preparation she is brought to the king, who loves her above every other woman there.",
      "He sets the royal crown on her head and makes her queen instead of Vashti. Nowhere in this chapter does anyone ask what Esther wants. She becomes queen inside a system built entirely around what men decide to do with women's bodies.",
    ]),
    g(2, 19, 23, [
      "Mordecai is sitting at the king's gate, an ordinary government post, when he overhears two of the king's chamberlains, Bigthan and Teresh, plotting to kill Ahasuerus.",
      "He tells Esther, and Esther tells the king in Mordecai's name. The plot is investigated, found true, and both men are hanged.",
      "The whole thing gets written down in the official record, the book of the chronicles, in front of the king. Nobody rewards Mordecai for it. Not yet.",
      "Remember that detail. A forgotten record sitting in a palace archive is going to matter enormously, several chapters from now.",
    ]),
    g(3, 1, 15, [
      "Haman gets promoted above every other prince in the kingdom, and the king commands all his servants to bow down to him. Mordecai, alone, refuses.",
      "When the other servants ask him why, he tells them he is a Jew. That single refusal, over one man's pride, is enough to make Haman decide to destroy not just Mordecai, but every Jew in the entire empire.",
      "Haman casts lots, called Pur, to pick the date, then tells the king there is a people scattered through his kingdom whose laws are different, and offers ten thousand talents of silver to have them destroyed. The king hands over his own ring without even asking who they are.",
      "A decree goes out to a hundred and twenty-seven provinces, in every language, to kill every Jew, young and old, women and children, in a single day. Then the king and Haman sit down and drink, while the city of Shushan is thrown into confusion.",
    ]),
    g(4, 1, 8, [
      "Mordecai tears his clothes, puts on sackcloth and ashes, and goes out into the middle of the city crying out loud and bitterly. He cannot pass the king's gate dressed like that, so he stops right at the edge of it.",
      "The same mourning breaks out in every province the decree reaches. Fasting, weeping, wailing, sackcloth and ashes spread out on the ground. A whole people grieving a death sentence that has not happened yet.",
      "Esther, inside the palace, hears Mordecai is in sackcloth and sends him clothes to change into. He refuses them and sends back a copy of the actual decree instead, with a message telling her everything and begging her to go to the king.",
      "She has been queen for years now, and she still finds out what is happening to her own people secondhand, through a messenger standing at a gate.",
    ]),
    g(4, 9, 17, [
      "Esther sends back the obvious problem. Anyone who approaches the king in the inner court unsummoned can be put to death, unless he holds out the golden scepter. And she has not been called to him in thirty days.",
      "Mordecai's answer is the hinge of the whole book. Do not think that you shall escape in the king's house, more than all the Jews. If you stay silent now, deliverance will rise from somewhere else, and you and your father's house will perish. And who knows whether you have come to the kingdom for such a time as this?",
      "Esther asks him to gather every Jew in Shushan to fast for her, three days, no food or water, and she and her maidens will fast the same way.",
      "Then she says the line the whole chapter has been building toward. I will go in unto the king, which is not according to the law, and if I perish, I perish.",
    ]),
  ],
  closing: [
    ["So that is Day 116.", 700],
    ["A king deposes a queen for saying no, then a Jewish orphan raised in secret becomes queen without anyone asking what she wanted.", 800],
    ["Mordecai quietly saves the king's life and gets forgotten for it. Haman gets promoted, gets bowed to by everyone but Mordecai, and turns one refusal into a plan to erase an entire people.", 800],
    ["A decree goes out to a hundred and twenty-seven provinces to kill every Jew in the empire on a single day. And the king and Haman sit down and drink.", 800],
    ["Mordecai mourns in the street in sackcloth. Esther, safe inside the palace, does not even know the details until he sends her a copy of the decree.", 850],
    ["Then he tells her the truth she cannot avoid. Silence will not protect her. And maybe this is exactly why she is there.", 850],
    ["She asks her people to fast for her, three days, and then she says the line the whole book has been walking toward.", 850],
    ["Tomorrow, Esther 5 through 8. She actually goes in to see the king.", 850],
    ["For now, hold on to what she decided before she knew how it would end.", 800],
    ["If I perish, I perish.", 1200],
  ],
};
