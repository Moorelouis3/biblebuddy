import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 15, written to the Day 1 standard.
 *
 * Genesis 37-38 opens the Joseph story and interrupts it hard: the dreams,
 * the coat, the pit, the sale, and then Genesis stops to spend a whole
 * chapter on Judah and Tamar before Joseph reappears. Six blocks, the
 * detour through Genesis 38 kept as its own beat rather than skipped.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 15,
  title: "Joseph Is Betrayed",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 15. A new story starts, and it starts with a coat.", 750],
    ["Jacob loves one son more than the other ten, and does not hide it.", 800],
    ["Then that son starts talking about dreams where his whole family bows down to him.", 800],
    ["You can guess how that goes over.", 900],
    ["And right in the middle of it, Genesis stops to tell you about Judah and a woman named Tamar.", 1000],
    ["We are in Genesis 37 and 38. A pit, a price, and a promise almost lost inside one family's worst year.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(37, 1, 11, [
      "Jacob loves Joseph more than all his other sons, because he was the son of his old age, and he makes him a coat of many colors. Everyone in the tent can see who the favorite is.",
      "So his brothers hate him, and cannot speak peaceably to him. That is the verse. Not tension. Hate, stated flat.",
      "Then Joseph has a dream. Their sheaves bow down to his sheaf. Then another dream, bigger. The sun, the moon, and eleven stars bow down to him.",
      "And he tells them both dreams, out loud, to the very people they are about. Even Jacob rebukes him for it. But Jacob also keeps the saying in mind.",
    ]),
    g(37, 12, 24, [
      "Jacob sends Joseph out alone to check on his brothers and the flocks, miles from home. A man finds him wandering, lost, and points him toward Dothan.",
      "The brothers see him coming from a distance, before he ever reaches them, and start plotting. Behold, this dreamer cometh.",
      "Reuben talks them out of killing him outright, and says to throw him in a pit instead, planning to come back and pull him out later. Genesis tells you his real motive: to rid him out of their hands, to deliver him to his father again.",
      "So they strip him of that coat the moment he arrives, and throw him into a pit with no water in it. Then they sit down to eat.",
    ]),
    g(37, 25, 36, [
      "While they are eating, a caravan of Ishmaelites comes by, headed to Egypt with spices to sell. Judah has an idea. What profit is it if we kill our brother? Let us sell him instead.",
      "So for twenty pieces of silver, they sell their own brother, and he is carried off to Egypt.",
      "Then they kill a goat, dip Joseph's coat in the blood, and bring it to their father. Know now whether it is thy son's coat or not.",
      "Jacob does not need convincing. He tears his clothes, puts on sackcloth, and mourns for many days, refusing every comfort. I will go down into the grave unto my son mourning. And Joseph is sold in Egypt, to Potiphar, an officer of Pharaoh.",
    ]),
    g(38, 1, 11, [
      "Right here, mid-story, Genesis turns away from Joseph completely and follows Judah instead. He marries a Canaanite woman and has three sons: Er, Onan, and Shelah.",
      "Er marries Tamar, and Genesis says plainly that Er was wicked in the sight of the Lord, and the Lord slew him. No further explanation given.",
      "By custom, Onan is told to raise up children for his dead brother through Tamar, and refuses to let it happen, and the Lord slays him too.",
      "Judah tells Tamar to wait as a widow in her father's house until his youngest son grows up, and Genesis tells you the truth behind it. He was afraid he would die too. He has no intention of keeping his word.",
    ]),
    g(38, 12, 26, [
      "Years pass, Shelah grows up, and nobody comes for Tamar. So she takes matters into her own hands. She hears Judah is coming, takes off her widow's clothes, and sits by the road disguised as a temple prostitute.",
      "Judah does not recognize his own daughter-in-law, and propositions her, leaving his signet, cord, and staff as a pledge for payment. Everything that identifies a man in that world, handed to a stranger by the road.",
      "Three months later, Judah is told Tamar is pregnant by prostitution, and orders her burned. She sends back his own signet and staff. Discern, I pray thee, whose are these.",
      "Judah says it out loud, in front of everyone. She hath been more righteous than I. And he never lay with her again.",
    ]),
    g(38, 27, 30, [
      "When Tamar gives birth, there are twins, and a hand comes out first with a scarlet thread tied to it, and then pulls back in. The other twin is born first instead.",
      "Genesis names the reversal on purpose. This one is called Pharez, meaning a breach, breaking through. His brother, marked first and born second, is Zarah.",
      "Two sons who never should have existed, born from a widow's desperate plan and a father-in-law's failure. And Pharez is the line the Messiah comes through.",
    ]),
  ],
  closing: [
    ["So that is Day 15.", 700],
    ["A coat, a pit, and a brother sold for silver. Then a whole chapter about the family Judah started while nobody was watching Joseph.", 700],
    ["Notice what Genesis will not do. It will not soften the brothers, and it will not soften Judah either. She hath been more righteous than I. He said it himself.", 800],
    ["Joseph is in Egypt now, sold as a slave, and nothing in this chapter tells you God is anywhere near him.", 800],
    ["But you already know how the story ends. You are just not there yet.", 850],
    ["And the son born from Judah's worst failure is the son the promise runs through. God did not wait for the family to get clean first.", 850],
    ["Tomorrow, Genesis 39 and 40. Joseph in Potiphar's house, and then in prison, and God with him in both.", 850],
    ["For now, hold on to Judah's own words.", 800],
    ["She hath been more righteous than I.", 750],
    ["Said about the very people he had wronged.", 1200],
  ],
};
