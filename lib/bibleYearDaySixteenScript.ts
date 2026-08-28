import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 16, written to the Day 1 standard.
 *
 * Genesis 39-40 is Joseph in Potiphar's house, then in prison, and the one
 * line that carries both chapters: the Lord was with Joseph. Nothing about
 * his circumstances changes for the better. His nearness to God does. Five
 * blocks, matching the lighter two-chapter reading.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 16,
  title: "Joseph in Egypt",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 16. Joseph is a slave in a foreign country, and Genesis keeps saying one thing about him.", 750],
    ["The Lord was with Joseph.", 850],
    ["Not once things go well. While he is still a slave. And then while he is in prison for something he did not do.", 800],
    ["Nothing about his situation gets better in this chapter. He does.", 900],
    ["We are in Genesis 39 and 40. A house he runs well, a lie that puts him in a cell, and two prisoners' dreams he did not ask to interpret.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(39, 1, 6, [
      "Joseph is bought by Potiphar, an officer of Pharaoh, and the very next sentence tells you the Lord was with Joseph, and he was a prosperous man, and he was in the house of his master the Egyptian.",
      "Potiphar sees it too. He sees the Lord made all that he did to prosper in his hand, and hands Joseph everything he owns to manage.",
      "So a slave, sold by his own brothers, ends up running an Egyptian officer's entire household. Genesis credits none of it to Joseph's talent alone. The Lord blessed the Egyptian's house for Joseph's sake.",
      "One detail sets up everything that follows. Joseph was a goodly person, and well favoured. That is about to become the problem.",
    ]),
    g(39, 7, 18, [
      "Potiphar's wife casts her eyes on Joseph and says, lie with me. Day after day. And Joseph refuses every time.",
      "Listen to his reason. Not fear of being caught. My master has trusted me with everything except you, because you are his wife. How then can I do this great wickedness, and sin against God?",
      "One day he goes into the house to do his work, and no other man is there, and she catches him by his garment. He flees, and leaves the garment in her hand.",
      "She keeps that garment and turns his refusal into an accusation, telling the household and then her husband that the Hebrew servant tried to mock her. Doing right cost him the one piece of evidence that could have cleared him.",
    ]),
    g(39, 19, 23, [
      "Potiphar's anger is kindled, and Joseph is thrown into prison, into the very place where the king's prisoners were bound. No trial. His master's wife's word was enough.",
      "And Genesis says it again, the exact phrase from the top of the chapter. The Lord was with Joseph, and shewed him mercy, and gave him favour in the sight of the keeper of the prison.",
      "So the keeper puts Joseph in charge of every prisoner in that place, and does not even bother checking on anything under his hand, because the Lord was with him.",
      "Notice the pattern now. House to prison, trusted to trusted, and the same sentence explaining both. Circumstances collapse. God's presence does not move.",
    ]),
    g(40, 1, 15, [
      "Two of Pharaoh's officers, the butler and the baker, offend him and land in the same prison, under Joseph's care.",
      "One morning Joseph finds them sad, and asks why, and they tell him each had a dream in the same night with no one to interpret it. Do not interpretations belong to God? Tell me them, I pray you.",
      "The butler dreams of a vine with three branches that bud, blossom, and bring forth ripe grapes, which he presses into Pharaoh's cup and hands to him. Joseph reads it straight. Three days, restored to his post.",
      "Then Joseph asks for something for himself, the only thing he asks in either chapter. Think on me when it shall be well with thee, and make mention of me unto Pharaoh, and bring me out of this house. He tells his own story plainly. Stolen away, and here I have done nothing that they should put me into the dungeon.",
    ]),
    g(40, 16, 23, [
      "The baker likes what he hears and offers his own dream. Three baskets of bread on his head, and the birds eating out of the top basket.",
      "Joseph does not soften this one. Three days, and Pharaoh will lift up thy head from off thee, and hang thee on a tree, and the birds shall eat thy flesh from off thee.",
      "Three days later, on Pharaoh's birthday, it happens exactly that way. The butler restored, the baker executed.",
      "And the last verse of the chapter is the hard one. Yet did not the chief butler remember Joseph, but forgat him. Joseph did everything right, told the truth, asked for one small kindness, and was forgotten anyway.",
    ]),
  ],
  closing: [
    ["So that is Day 16.", 700],
    ["A slave who runs a house well, refuses a sin that could have cost him nothing to commit, and gets punished for the refusal.", 700],
    ["Then a prison where he is trusted again, reads two dreams correctly, and is forgotten by the one person who could have helped him.", 800],
    ["Genesis never tells you Joseph felt fine about any of it. It just keeps saying the same four words. The Lord was with Joseph.", 800],
    ["That sentence does not fix his circumstances. Not in this chapter. It just stays true through all of them.", 850],
    ["Forgotten by the butler is not the same as forgotten by God. You will see the difference tomorrow.", 850],
    ["Tomorrow, Genesis 41 and 42. Two years pass, Pharaoh dreams, and Joseph finally walks out of that prison.", 850],
    ["For now, hold on to what he did in that empty house.", 800],
    ["How then can I do this great wickedness, and sin against God.", 750],
    ["Said with everything to lose, and nothing to gain.", 1200],
  ],
};
