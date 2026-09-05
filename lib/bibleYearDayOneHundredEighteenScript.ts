import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 118, written to the Day 1 standard.
 *
 * Esther 9-10 closes the book: the day meant to destroy the Jews turns
 * into the day they survive it, Purim gets named after Haman's own lot,
 * and Mordecai's story ends in three quiet verses. Then, with no
 * transition at all, Job 1-2 opens an entirely different book: a good
 * man loses everything in one scene, and still worships on the ground.
 * Seven blocks.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 118,
  title: "Purim and Job's Testing Begins",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 118.", 700],
    ["Today you get two endings and one beginning, and they could not feel more different.", 800],
    ["First, the day Haman picked to destroy the Jews arrives, and it goes exactly backward. That is where the feast of Purim comes from.", 800],
    ["Then Esther and Mordecai close out, quietly, still looking out for their people instead of themselves.", 800],
    ["And right after that, with no warning at all, you meet a man named Job. Good, wealthy, faithful. And a courtroom you were never meant to see into decides to test all of it.", 850],
    ["We are in Esther 9 and 10, then Job 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("esther", 9, 1, 10, [
      "The exact day Haman picked to destroy the Jews arrives. And it goes exactly backward from what he planned. The Jews gather and strike first.",
      "No one can stand against them. Every official in the empire helps them, not out of principle, but because they are afraid of Mordecai now.",
      "In the fortress of Shushan alone, five hundred men die, including all ten of Haman's sons.",
      "And notice what the text says three separate times before the day is over. They did not touch the spoil. This was never about getting rich off their enemies. It was only ever about surviving.",
    ]),
    g("esther", 9, 11, 19, [
      "The king brings Esther a body count and then asks her, one more time, what else she wants. He still cannot stop asking her that question.",
      "She asks for a second day of it in Shushan, and for the bodies of Haman's ten sons to be hung up publicly. It is a harsh request, from a woman who watched a decree get written to kill everyone she loves.",
      "Across the rest of the empire, the Jews kill seventy-five thousand people who rose up against them, on the same thirteenth of Adar Haman chose. Then they rest, on the fourteenth, and turn it into a feast.",
      "Shushan needed the extra day, so its people rest and feast one day later, on the fifteenth. That is the only reason Purim still lands on two different dates depending on where you live.",
    ]),
    g("esther", 9, 20, 32, [
      "Mordecai writes to every province and tells them to keep this every single year. Feasting, joy, sending food to each other, gifts to the poor.",
      "The holiday gets its name from the coldest detail in the whole story. Haman cast Pur, the lot, like rolling dice, to pick the date that would erase a nation. So they name the feast after his own lot. Purim.",
      "This is the one book in the whole Bible where God's name is never written down, and this is the moment that absence gets loudest. Someone rolled dice to end a people, and it did not work. Nobody in the text says why out loud. You are left to notice it yourself.",
      "Esther adds her own authority to Mordecai's letter, in writing, so the memory does not fade once the generation that lived it is gone.",
    ]),
    g("esther", 10, 1, 3, [
      "The book ends almost like a footnote. Three verses, after everything that just happened.",
      "Mordecai finishes the story second only to the king himself. The man who once sat outside the gate in sackcloth, mourning a decree, is now the second most powerful person in the empire.",
      "But watch what the last line says he actually did with that power. Not that he got richer. That he sought the good of his people and spoke peace to all his descendants.",
      "That is the whole point of Esther, closed out in one sentence. Power that was never used to protect itself. It was used to protect somebody else.",
    ]),
    g("job", 1, 1, 12, [
      "New book. And it opens with the most abrupt scene change so far. From a Persian palace straight into a courtroom nobody on earth was ever meant to see into.",
      "Job is introduced as perfect and upright, a man who feared God and turned away from evil. Then, in the very next scene, God says almost that exact sentence about him, word for word.",
      "Satan does not deny that Job is good. He asks a harder question. Does Job fear God for nothing, or only because You built a hedge of blessing around everything he has?",
      "God does not defend Job by arguing about it. He removes the hedge and lets the accusation get tested for real. Everything Job has is now in Satan's power. Only Job himself is off limits.",
    ]),
    g("job", 1, 13, 22, [
      "Four messengers arrive back to back, before the last one even finishes speaking. Raiders take the oxen. Fire falls and burns the sheep. Raiders take the camels. Then a wind collapses the house on all ten of his children at once.",
      "Every messenger ends the same way. I alone escaped to tell you. Job loses everything he owns and every child he has in the space of one scene.",
      "He tears his robe, shaves his head, and falls to the ground. And what he does on the ground is worship. Naked I came from my mother's womb, and naked I will return. The Lord gave, and the Lord hath taken away. Blessed be the name of the Lord.",
      "The text is careful to tell you exactly what happened inside him. In all this, Job did not sin, and he did not blame God. Not because none of it hurt. Because it did, and he said that anyway.",
    ]),
    g("job", 2, 1, 13, [
      "God brings Job up a second time, and Satan raises the bar again. Skin for skin. A man will give up everything he owns to save his own body.",
      "So the sickness comes. Boils from the sole of his foot to the top of his head. He sits down in the ashes and scrapes himself with a broken piece of pottery.",
      "His wife looks at him and says the thing Satan predicted someone would eventually say. Curse God, and die. Job answers her without cursing her either. Shall we accept good from God's hand, and not accept trouble?",
      "Three friends come to sit with him, and when they finally see him, they do not even recognize his face. So they tear their own robes, and sit on the ground next to him for seven days, saying nothing at all, because his pain was too large for words.",
    ]),
  ],
  closing: [
    ["So that is Day 118.", 700],
    ["The day meant to destroy the Jews became the day they survived it, and it turned into a feast that is still kept every year, called Purim.", 800],
    ["Mordecai ends the book second only to the king, and the last thing said about him is that he used it to seek good for his people, not for himself.", 800],
    ["Then, without a single word of warning, the whole tone of your reading changes.", 750],
    ["Job loses everything he owns and every child he has in one scene, and still worships on the ground where he fell.", 800],
    ["Then his own body is attacked, and his wife tells him to curse God and die. He refuses, and does not sin with his lips either time.", 850],
    ["Three friends finally arrive and cannot even recognize his face. So they just sit with him, saying nothing, for seven days.", 850],
    ["Tomorrow, Job 3 through 6. That silence ends, and Job finally speaks.", 850],
    ["For now, sit with the line he said before any friend ever spoke a word to him.", 800],
    ["The Lord gave, and the Lord hath taken away. Blessed be the name of the Lord.", 1200],
  ],
};
