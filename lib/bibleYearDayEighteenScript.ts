import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 18, written to the Day 1 standard.
 *
 * Genesis 43-44 is Judah's turn. The brother who suggested selling Joseph
 * for silver is the one who now puts his own life up as collateral for
 * Benjamin, twice - once to his father, once to Joseph. Six blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 18,
  title: "Judah Defends Benjamin",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 18. The famine has not let up, and the food from Egypt is gone.", 750],
    ["Which means Jacob has to send his sons back. And this time, the man in charge said he will not even see them without Benjamin.", 800],
    ["Jacob has already lost one son from Rachel. He is terrified of losing the other.", 800],
    ["Today you watch Judah, of all people, become the one who finally protects this family instead of tearing it apart.", 850],
    ["We are in Genesis 43 and 44. A reluctant goodbye, a planted cup, and the bravest thing Judah ever says.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(43, 1, 14, [
      "The famine is still heavy, and the grain from Egypt runs out. Jacob tells his sons to go back and buy more food, as if the last trip never happened.",
      "Judah reminds him. The man did solemnly protest unto us, saying, Ye shall not see my face, except your brother be with you. There is no version of this trip without Benjamin.",
      "Jacob turns on them. Wherefore dealt ye so ill with me, as to tell the man whether ye had yet a brother? As if the problem was ever what they said, and not what happened in that field years before.",
      "Then Judah does something new for this family. I will be surety for him. If I bring him not unto thee, let me bear the blame for ever. He puts his own life on the line, and Jacob finally says go.",
    ]),
    g(43, 15, 25, [
      "Jacob sends double money, and a present of the best of the land, balm, honey, spices, myrrh, nuts, and almonds. And one prayer. God Almighty give you mercy before the man. If I be bereaved of my children, I am bereaved. He is bracing for the worst before they even leave.",
      "In Egypt, Joseph sees Benjamin with them and tells his steward to bring the men to his house and prepare a feast. The brothers see themselves being led there and panic. They think it is about the money that turned up in their sacks last time.",
      "They explain themselves to the steward right at the door, before anyone accuses them of anything. He answers them plainly. Peace be to you, fear not: your God, and the God of your father, hath given you treasure in your sacks. I had your money.",
      "Then he brings Simeon out to them. The brother they left behind in an Egyptian prison is standing in front of them again, safe.",
    ]),
    g(43, 26, 34, [
      "Joseph comes home, and they bow to the ground and give him the present. Then he asks the question he has been waiting to ask. Is your father well, the old man of whom ye spake? Is he yet alive?",
      "Then he sees Benjamin, his own mother's son, and asks, Is this your younger brother? God be gracious unto thee, my son.",
      "And that is as far as he can hold it together. His bowels did yearn upon his brother, and he sought where to weep, and he entered into his chamber, and wept there.",
      "He washes his face, comes back out, and orders the meal served. The brothers are seated in exact birth order, which stuns them, and Benjamin's portion is five times everyone else's. He is testing something. Watching to see if this family still treats one son as more loved than the rest.",
    ]),
    g(44, 1, 13, [
      "Joseph tells his steward to fill every sack with food, put each man's money back in again, and hide his own silver cup in Benjamin's sack, on top of his money.",
      "They leave the city at first light, and before they get far, the steward catches up and accuses them. Wherefore have ye rewarded evil for good? Is not this it in which my lord drinketh?",
      "They are so sure of their innocence they offer their own death sentence. With whomsoever it be found, let him die, and we also will be my lord's bondmen. He tells them only the guilty one will be held. They open the sacks eldest to youngest, sure it will turn up nowhere.",
      "It is found in Benjamin's sack. And Genesis says exactly what they do next. They rent their clothes, and returned to the city.",
    ]),
    g(44, 14, 17, [
      "Judah and his brothers come before Joseph and fall to the ground. Joseph asks what they have done, as if he does not already know.",
      "Judah does not try to explain the cup. He cannot. What shall we say? God hath found out the iniquity of thy servants. He does not know what sin Joseph means, but he knows this family owes a debt, and he stops arguing about which one this is.",
      "He offers all of them as slaves. Joseph refuses. Only the man with the cup will stay. The rest of you, go home to your father in peace.",
      "It is the exact same test as the pit. Walk away from one brother, keep the rest safe, and go home. Last time, they took it.",
    ]),
    g(44, 18, 34, [
      "Judah steps forward, and what follows is the longest speech any of Jacob's sons gives in Genesis. He retells the whole story to Joseph, as if Joseph does not already know it better than anyone alive.",
      "He quotes his own father back to Joseph, word for word. Ye know that my wife bare me two sons. One went out, and I said, surely he is torn in pieces, and I saw him not since. If ye take this also from me, and mischief befall him, ye shall bring down my gray hairs with sorrow to the grave.",
      "Then Judah does what he never did in that field with the pit. Now therefore, let thy servant abide instead of the lad a bondman to my lord, and let the lad go up with his brethren.",
      "For how shall I go up to my father, and the lad be not with me, lest peradventure I see the evil that shall come on my father? The man who once sold his brother for silver is now offering his own freedom so a different brother can go home.",
    ]),
  ],
  closing: [
    ["So that is Day 18.", 700],
    ["A father who finally let go, a feast with a favorite son's portion piled high, and a silver cup planted to force one more test.", 700],
    ["And Judah, of all people, is the one who passes it.", 800],
    ["Years ago he said, what profit is it if we kill our brother? Let us sell him instead. Today he says, let me be the slave, and let the boy go home.", 800],
    ["That is not the same man wearing a nicer coat. That is a different man.", 850],
    ["Joseph has not said one word about who he is yet. He is just watching to see if his family has actually changed.", 850],
    ["Tomorrow, Genesis 45 and 46. Joseph cannot hold it in any longer.", 850],
    ["For now, hold on to Judah's offer.", 800],
    ["Let thy servant abide instead of the lad.", 750],
    ["The brother who sold Joseph into slavery just offered to become one, to save someone else.", 1200],
  ],
};
