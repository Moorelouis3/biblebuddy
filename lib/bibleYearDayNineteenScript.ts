import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 19, written to the Day 1 standard.
 *
 * Genesis 45-46 is the reveal and the reunion: Joseph breaks twenty-two years
 * of silence, Jacob gets the news he had stopped hoping for, and the family
 * of seventy goes down into Egypt. Genesis 46:8-27 is almost entirely names,
 * so that block runs shorter, three-line teaching, the way Day 14 consolidated
 * Esau's genealogy. Seven blocks total.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 19,
  title: "Joseph Reveals Himself",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 19. Judah just offered to trade his own freedom for Benjamin's.", 750],
    ["And that is the moment Joseph cannot hold it together anymore.", 800],
    ["Twenty-two years of silence are about to break, all at once, in a room full of his brothers.", 800],
    ["Then a very old man gets news he had stopped letting himself hope for.", 850],
    ["We are in Genesis 45 and 46. A confession, a reunion, and a family of seventy moving to Egypt.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(45, 1, 8, [
      "Joseph cannot hold it any longer, and he clears the room. Cause every man to go out from me. No Egyptians watching when this happens.",
      "Then he says the two words this whole story has been building toward. I am Joseph. And in the same breath, doth my father yet live?",
      "His brothers cannot answer him. They were troubled at his presence. The brother they sold for silver is standing in front of them, dressed as the second most powerful man in Egypt.",
      "And Joseph does not make them beg for it. God did send me before you to preserve life, he says. Not you sent me. God sent me. He puts twenty-two years of pain inside a bigger story without pretending it never hurt.",
    ]),
    g(45, 9, 15, [
      "Joseph tells them to hurry back to his father with the news, and bring him down to Goshen where Joseph can provide for him. Haste ye, he says, twice in this one speech.",
      "He even tells them exactly what to say. Thus saith thy son Joseph, God hath made me lord of all Egypt: come down unto me, tarry not. No blame in the message. Just come.",
      "Then he falls on Benjamin's neck and weeps, and Benjamin weeps on his. His only full brother. The one who never touched him, never sold him.",
      "He kisses all his brothers and weeps on them too, and only after that do they talk with him. The weeping had to come first. Words could not have gotten there on their own.",
    ]),
    g(45, 16, 24, [
      "The news reaches Pharaoh's house, and it pleases Pharaoh well. Joseph's brethren are come. The famine that nearly destroyed this family becomes the very reason it gets rescued.",
      "Pharaoh tells Joseph to send wagons for the women and the children, and promises the best of the land. Regard not your stuff, he says. Just come.",
      "Joseph gives each brother a change of clothes. To Benjamin he gives five, and three hundred pieces of silver besides. The same kind of favor their father once showed him, and this time nobody plots murder over it.",
      "He sends his father provisions for the road and one instruction as they leave. See that ye fall not out by the way. He knows exactly what this family is still capable of on a long journey together.",
    ]),
    g(45, 25, 28, [
      "They come home and tell Jacob that Joseph is alive, and governor over all the land of Egypt. And Jacob's heart fainted, for he believed them not. Twenty-two years of grief does not undo itself in one sentence.",
      "Then he sees the wagons Joseph sent to carry him, and the spirit of Jacob their father revived. Not their words this time. The proof, sitting right there in front of him.",
      "And Israel says it. It is enough. Joseph my son is yet alive: I will go and see him before I die. The man who mourned a torn coat for two decades finally lets himself hope again.",
      "Notice the name change inside the one story. Jacob's heart fainted. Israel decides to go. The man wrestling with grief becomes the man walking toward his son.",
    ]),
    g(46, 1, 7, [
      "Israel takes the journey and stops first at Beersheba to offer sacrifices to the God of his father Isaac. Before Egypt, worship.",
      "And God speaks to him in the night. Jacob, Jacob. And he said, Here am I. The same kind of answer his grandfather Abraham once gave, in the same kind of night.",
      "God tells him not to be afraid to go down. I will there make of thee a great nation. I will also surely bring thee up again. Egypt is not an exile from the promise. It is where the promise grows into a nation.",
      "So Jacob goes down with his sons, his sons' sons, his daughters, his flocks, and everything he built in Canaan. An old man leaving the only land he has ever known, told by God that this move is part of the plan, not a detour from it.",
    ]),
    g(46, 8, 27, [
      "Genesis stops the story and names every person who goes down to Egypt. Sons, grandsons, even one grandson's mother by name, all the way to Benjamin's ten sons.",
      "It adds up the count on purpose. Leah's line, thirty and three. Zilpah's, sixteen. Rachel's, fourteen. Bilhah's, seven. All the souls that came out of Jacob's own body, besides his sons' wives, threescore and six.",
      "Seventy people, total, walk into Egypt. From that small number, God will grow a nation too large for any king to control. The list is not filler. It is the seed before the harvest.",
    ]),
    g(46, 28, 34, [
      "Jacob sends Judah ahead of him to Joseph, to point the way to Goshen. The same brother who once sold Joseph now leads the rest of the family safely to him.",
      "Joseph makes ready his chariot and goes up to meet his father, and falls on his neck, and weeps there a good while. The reunion Jacob had stopped believing would ever happen.",
      "Israel says the only thing left to say. Now let me die, since I have seen thy face, because thou art yet alive. He is not being morbid. He is saying his life is finished, and finished well.",
      "Joseph plans ahead for Pharaoh's question, coaching his family to say their trade has always been cattle, so they can settle apart in Goshen. He is still protecting them, the same as he did with the silver cup and the tested feast.",
    ]),
  ],
  closing: [
    ["So that is Day 19.", 700],
    ["A brother finally says who he is, and a father who had given up hope gets his son back.", 700],
    ["God did send me before you to preserve life. Joseph says that to the same men who once threw him in a pit.", 800],
    ["Jacob's heart fainted at the news, and revived at the proof. Grief does not lift on command. It lifts when it sees something real.", 850],
    ["Seventy people walk down into Egypt. That whole nation starts that small.", 850],
    ["Tomorrow, Genesis 47 and 48. Jacob settles in Goshen, and blesses Joseph's two sons before he dies.", 850],
    ["For now, hold on to Israel's line at the chariot.", 800],
    ["Now let me die, since I have seen thy face.", 750],
    ["Because thou art yet alive.", 1200],
  ],
};
