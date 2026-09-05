import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 117, written to the Day 1 standard.
 *
 * Esther 5-8 is the turn of the whole book: Esther walks into the throne
 * room unsummoned, Haman's pride curdles into a gallows built the same
 * night, a sleepless king forces Haman to honor the man he wants dead,
 * Esther finally names Haman at the second banquet, and a decree sealed
 * by the king's own ring turns out to be unbreakable even by the king.
 * Six blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Esther ${chapter}:${startVerse}-${endVerse}`,
  book: "esther",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 117,
  title: "Reversal and Deliverance",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 117.", 700],
    ["Yesterday Esther said, if I perish, I perish. Today she actually walks in.", 800],
    ["By the end of these four chapters, the man who built a gallows for someone else is hanging on it himself.", 800],
    ["And a decree that was supposed to be unbreakable gets answered by another one, in the same king's name.", 800],
    ["This is the turn of the whole book. Nobody saw it coming from where chapter four left off.", 850],
    ["We are in Esther 5 through 8.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(5, 1, 8, [
      "Esther puts on her royal robes and stands in the inner court without being called. That is the exact death sentence she named in chapter four, actually happening now.",
      "The king holds out the golden scepter before she says a single word. He does not know yet what she wants. He has already decided to let her live.",
      "He offers her up to half his kingdom. Twice, in the same conversation. She asks for a dinner instead.",
      "Not because she is losing her nerve. She is building a room. She wants Haman sitting in it when she finally says what she came to say.",
    ]),
    g(5, 9, 14, [
      "Haman walks out of the palace joyful and full of himself. Then he passes Mordecai at the gate, and the man still will not stand for him.",
      "He goes home and lists everything he has for his friends and his wife Zeresh. His wealth, his sons, every promotion, and now the queen has invited him to a private dinner with the king. Twice.",
      "Then he says the line that tells you what is actually running him. Yet all this availeth me nothing, so long as I see Mordecai the Jew sitting at the king's gate.",
      "Zeresh and his friends do not tell him to let it go. They tell him to build a gallows fifty cubits high and get permission from the king in the morning. He builds it that same night.",
    ]),
    g(6, 1, 14, [
      "The king cannot sleep, so he has the palace records read to him. And there it is. The night Mordecai reported a plot and saved his life. Nobody was ever rewarded for it.",
      "The king asks who is waiting in the outer court. It is Haman, arriving at dawn to ask permission to hang Mordecai. Neither man knows what the other is about to say.",
      "The king asks Haman what should be done for a man he wants to honor. Haman assumes it means him, so he describes the full treatment. Royal robes, the king's own horse, a prince to lead it through the city.",
      "Then the king tells him to do all of it, for Mordecai. Haman spends the day parading the man he built a gallows for the night before, then goes home with his head covered, mourning.",
    ]),
    g(7, 1, 10, [
      "The king asks his question a third time, and this time Esther answers it. Let my life be given me at my petition, and my people at my request.",
      "She does not accuse Haman by title. She names what he is. The adversary and enemy is this wicked Haman.",
      "The king storms out into the garden in his wrath. Haman, terrified, falls across the couch where Esther is reclining to beg for his life. The king walks back in at exactly the wrong moment and reads it as an attack on his own wife.",
      "Then a servant remembers the gallows Haman built for Mordecai, still standing in his own yard. The king hangs him on the very thing he built for someone else.",
    ]),
    g(8, 1, 8, [
      "Haman's whole estate is handed to Esther in a single day. Mordecai receives the ring the king once gave to the man who wanted him dead.",
      "But none of that touches the actual decree. Somewhere across a hundred and twenty-seven provinces, the order to kill every Jew is still standing, still legal.",
      "Esther falls at the king's feet again, in tears, and begs him to reverse it. And here is the catch nobody saw coming back in chapter three. A law sealed with the king's own ring cannot be reversed. Not even by the king who sealed it.",
      "So he cannot cancel Haman's decree. He can only tell Mordecai and Esther to write a new one and seal it the same way. The threat is not erased. It has to be answered.",
    ]),
    g(8, 9, 17, [
      "The new letter goes out just as fast as the first one, in every language, to every province, this time giving the Jews the right to defend themselves on the very day they were meant to die.",
      "It is set for the same date Haman picked. The thirteenth day of the month Adar. Nothing about that day changes except who is allowed to survive it.",
      "Mordecai walks out of the palace in the exact kind of robes Haman once used to parade him for the king's amusement. Except this time it is real, and it is his.",
      "The city that was thrown into confusion at the first decree is now glad and rejoicing at the second one. And people who watched it all happen start calling themselves Jews too, because now that is the side you would want to be on.",
    ]),
  ],
  closing: [
    ["So that is Day 117.", 700],
    ["Esther walked into a room she was not summoned to, and the king held out the scepter before she said a word.", 800],
    ["Haman went home boasting about his wealth and his sons and still could not enjoy any of it, because one man would not stand up for him.", 800],
    ["Then a sleepless night turned into the worst day of his life. He built a gallows for Mordecai and ended up leading him through the streets in honor instead.", 800],
    ["At the second banquet, Esther finally names him. The adversary and enemy is this wicked Haman. And he dies on the very gallows he built.", 850],
    ["But naming Haman did not undo the decree. A law sealed by the king's own ring cannot be canceled, even by the king.", 850],
    ["So a new letter goes out, giving the Jews the right to fight back on the exact day they were supposed to die.", 850],
    ["Tomorrow, Esther 9 and 10, and Job begins. Purim gets its name, and then everything turns to a man losing everything he has.", 850],
    ["For now, hold on to what actually saved a nation here.", 800],
    ["Not a miracle out of nowhere. A woman willing to walk into a room she was not invited to.", 1200],
  ],
};
