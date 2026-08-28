import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 17, written to the Day 1 standard.
 *
 * Genesis 41-42 turns the story. Joseph goes from forgotten prisoner to
 * second-in-command of Egypt in one chapter, then his brothers walk in and
 * bow to him without knowing who he is - his own dream, thirty years later.
 * Seven blocks: four to carry chapter 41, three for the reunion in 42.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
  book: "genesis",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 17,
  title: "Joseph Rises to Power",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 17. Two years have passed since we left Joseph forgotten in an Egyptian prison.", 750],
    ["Then in one day, everything changes.", 800],
    ["Pharaoh has a dream nobody can explain. And somebody finally remembers the man who reads dreams.", 800],
    ["By the end of today's reading, Joseph is running Egypt. And his brothers are bowing in front of him without knowing who he is.", 850],
    ["We are in Genesis 41 and 42. A famine, a promotion, and a family reunion that starts as an interrogation.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(41, 1, 13, [
      "Two full years go by, and then Pharaoh dreams. Seven fat cows come up out of the Nile, and seven thin, ugly cows come up after them and eat them.",
      "He dreams it again. Seven full heads of grain, then seven thin ones swallow them whole. All his magicians and wise men have nothing.",
      "Then the chief butler finally remembers. I do remember my faults this day. Two years, and it takes his own trouble to jog his memory.",
      "He tells Pharaoh about the young Hebrew who read his dream right, and the baker's, exactly as it happened.",
    ]),
    g(41, 14, 32, [
      "They shave him and change his clothes and rush him in front of Pharaoh. Joseph's first words are not about himself. It is not in me. God shall give Pharaoh an answer of peace.",
      "He says the two dreams are one dream. Seven years of great plenty are coming, then seven years of famine so severe the plenty will not even be remembered.",
      "God hath shewed Pharaoh what he is about to do. The dream was never a puzzle to solve. It was a warning, given twice so nobody could call it luck.",
      "Joseph does not ask for anything here. He just tells the truth about what is coming. The asking comes next.",
    ]),
    g(41, 33, 45, [
      "Then Joseph does something bold. He was only asked to interpret. He goes ahead and gives Pharaoh a plan. Find a discreet and wise man, and set him over the land.",
      "Pharaoh's answer. Can we find such a one as this is, a man in whom the Spirit of God is? Then he puts that job on Joseph himself, the same day.",
      "Ring off his own hand onto Joseph's. Fine linen. A gold chain. A chariot, and men shouting before him. The prisoner is second in command of Egypt by sundown.",
      "He is thirty years old. Thirteen years since the pit, since the coat, since Potiphar's house, since the prison. None of it was wasted.",
    ]),
    g(41, 46, 57, [
      "For seven years the earth brings forth by handfuls, and Joseph gathers grain in every city until it stops being measured, like the sand of the sea.",
      "Two sons are born, and their names tell you where Joseph is at. Manasseh, God hath made me forget all my toil, and all my father's house. Ephraim, God hath caused me to be fruitful in the land of my affliction.",
      "Then the seven years of plenty end, and the famine comes just as he said, over all the earth, while Egypt alone has bread because one man planned ahead.",
      "When the people cry out, Pharaoh gives them two words. Go unto Joseph. The one his own family sold ends up feeding nations, including, though nobody knows it yet, the family that sold him.",
    ]),
    g(42, 1, 17, [
      "Jacob hears there is grain in Egypt and asks his sons why they are just looking at each other. Get you down thither, and buy for us from thence, that we may live and not die.",
      "He sends ten. Benjamin stays home. Lest peradventure mischief befall him. He already lost one son from this family. He is not risking the other.",
      "Joseph's brothers come and bow down with their faces to the earth. His dream from years earlier, the one that got him thrown in a pit for telling it, plays out exactly.",
      "He knows them instantly. They do not know him at all. He speaks roughly to them and calls them spies. Ye are spies; to see the nakedness of the land ye are come.",
    ]),
    g(42, 18, 24, [
      "On the third day Joseph changes the plan. This do, and live, for I fear God. One of you stay bound here, the rest take grain home to your starving families.",
      "Then, thinking he cannot understand them, they start talking among themselves. We are verily guilty concerning our brother, in that we saw the anguish of his soul, when he besought us, and we would not hear.",
      "Reuben says it out loud. Spake I not unto you, saying, Do not sin against the child, and ye would not hear? Therefore, behold, also his blood is required.",
      "Joseph turns himself about from them, and wept. Then comes back, and takes Simeon, and binds him before their eyes. He is still not ready to tell them who he is.",
    ]),
    g(42, 25, 38, [
      "Joseph orders their sacks filled with grain, each man's money quietly put back in his sack, and provision given for the road. On the way, one of them opens his sack and finds his money, and his heart fails him. What is this that God hath done unto us?",
      "They get home and tell Jacob everything. The harsh ruler, the spy accusation, Simeon held, the demand to bring Benjamin. Then they empty their sacks and find every man's money still there. Now they are all afraid.",
      "Jacob says the words that show exactly where his heart still is. Me have ye bereaved of my children. Joseph is not, and Simeon is not, and ye will take Benjamin away. All these things are against me.",
      "Reuben offers his own two sons as collateral. Jacob still says no. My son shall not go down with you, for his brother is dead, and he is left alone. Ye shall bring down my gray hairs with sorrow to the grave. He is still grieving Joseph, in front of the son who is standing right there, alive, and he does not know it.",
    ]),
  ],
  closing: [
    ["So that is Day 17.", 700],
    ["Two dreams nobody could explain, a prisoner remembered too late, and a promotion in a single day.", 700],
    ["Then a famine that brought his own brothers to their knees in front of him, bowing exactly the way his dream said they would.", 800],
    ["Joseph recognized them the moment they walked in. They had no idea.", 800],
    ["And under the rough act, he had to turn away and weep. Whatever he has become in Egypt, Genesis 42 is the first time in this whole story we see how much it still costs him.", 850],
    ["Jacob, meanwhile, is still burying a son who is alive. Me have ye bereaved of my children. He does not know the truth yet either.", 850],
    ["Tomorrow, Genesis 43 and 44. Benjamin has to go down to Egypt, and Judah is the one who makes it possible.", 850],
    ["For now, hold on to what the brothers said when they thought no one understood them.", 800],
    ["We are verily guilty concerning our brother.", 750],
    ["Years later, that debt is still unpaid.", 1200],
  ],
};
