import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 119, written to the Day 1 standard.
 *
 * Job breaks his seven days of silence and curses the day he was born - not
 * God, his birthday. Eliphaz answers him, kindly at first, then lands his
 * real argument: the innocent do not really suffer like this. Job's reply
 * defends his right to grieve this loudly and asks for proof instead of
 * assumption. Seven blocks across four chapters.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 119,
  title: "Job Laments His Suffering",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 119.", 700],
    ["Seven days of silence just ended. Job finally opens his mouth.", 750],
    ["And what comes out is not what you would expect from the man who just blessed the name of the Lord.", 800],
    ["He curses the day he was born. Out loud. In detail.", 800],
    ["Then his friend Eliphaz answers him. Gently at first. It does not stay gentle.", 850],
    ["We are in Job 3 through 6. A curse, a vision, a promise, and a reply.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 3, 1, 16, [
      "Job breaks seven days of silence, and the first words out of him are a curse. Not on God. On the day he was born.",
      "He does not ask to die today. He wishes that day had never existed at all, wiped off the calendar like it never happened.",
      "Then he goes further still. Why did I not die the moment I was born. He pictures the peace of never starting instead of the pain of continuing.",
      "This is not Job planning anything. It is grief that has run out of a smaller way to say itself.",
    ]),
    g("job", 3, 17, 26, [
      "Job pictures death as the one place everything finally levels out. The wicked stop hurting people. The weary rest. The servant is free from his master.",
      "Small and great end up in the same ground. For a man who just lost everything, that sounds less like fear and more like relief.",
      "Then the question underneath all of it. Why is light given to a man in misery, a man digging for death the way other people dig for treasure.",
      "He ends the chapter with a line that should stop you. I was not in safety, neither had I rest, neither was I quiet, yet trouble came. He was anxious before disaster ever hit. It did not wait for him to deserve it.",
    ]),
    g("job", 4, 1, 11, [
      "Job's friend Eliphaz speaks first, probably because he is the oldest. He starts kindly, reminding Job of his old reputation. You used to strengthen weak hands and steady shaking knees.",
      "Then the turn. Now trouble has come to you, and you are fainting. The man who comforted everyone else cannot comfort himself.",
      "And here is Eliphaz's real belief, stated plainly. Who ever perished, being innocent. Where were the righteous cut off. In his mind, disaster only lands on people who earned it.",
      "Whatever a man plants, he reaps, Eliphaz says. It is a tidy rule. It is about to be tested against a man who did nothing to deserve any of this.",
    ]),
    g("job", 4, 12, 21, [
      "Eliphaz backs up his theory with a story. A spirit passed in front of his face one night, and the hair on his body stood up. He never says whether it was good, evil, or something else entirely.",
      "The voice asks, can a mortal man be more righteous than God. True enough. Even His angels, it says, are charged with folly.",
      "Then the point lands. People are houses of clay, crushed as easily as a moth, gone between one morning and the next evening, forgotten before the dust even settles.",
      "It is true that no one is as solid as they think. Watch where Eliphaz is about to point that truth.",
    ]),
    g("job", 5, 1, 16, [
      "Eliphaz tells Job to go ahead and call for help. Which angel will you turn to. He already believes no one will answer, because he already believes Job is guilty.",
      "Wrath kills the foolish man, he says, and envy slays the simple. Every prosperous fool he has watched eventually loses it all, suddenly, and his own children pay for it.",
      "Then he turns to praising God directly, and this part is honestly good theology. God sends rain to the fields, sets the lowly up on high, and catches clever men in their own scheming.",
      "None of that is wrong. Eliphaz has real things to say about who God is. The trouble is what he is about to do with it.",
    ]),
    g("job", 5, 17, 27, [
      "Happy is the man whom God correcteth, Eliphaz says, so do not despise the discipline of the Almighty. He pictures God as a hand that wounds and then binds up that same wound.",
      "Then he promises Job total rescue. Six troubles, seven, it will not matter. Famine, war, cruel words, wild animals, none of it will touch you.",
      "You will be safe at home, safe in the field, and you will die old, like a shock of corn brought in at the right season.",
      "It is a beautiful promise, and Eliphaz means every word of it. It is also built on an idea the rest of this book is going to take apart.",
    ]),
    g("job", 6, 1, 30, [
      "Job answers, and the first thing he does is defend his right to grieve this loudly. Weigh my suffering against all the sand of every sea, he says, and mine would be heavier.",
      "He says he would rather God just finish it. Let loose his hand and cut me off. Death would be a comfort, at least he could say he never denied what God had spoken.",
      "Then he turns on his friends directly. You are like a wadi, a desert stream that looks full in the winter and is bone dry by the time a thirsty traveler actually needs it.",
      "He ends by asking for one specific thing. Show me exactly where I am wrong. Teach me, and I will be silent. Nobody has offered him proof. Only assumption.",
    ]),
  ],
  closing: [
    ["So that is Day 119.", 700],
    ["Job cursed the day he was born, wished he had never drawn a single breath, and still never once cursed God.", 800],
    ["Eliphaz answered him kindly, then not so kindly, all built on one idea. Good people do not really suffer like this.", 800],
    ["It is a comforting rule, if you have never had to live inside it.", 800],
    ["Job's answer was not a rebuttal of theology. It was a man telling his friends they showed up looking like water and turned out to be sand.", 850],
    ["He never asked them for money. He never asked to be rescued. He asked to be shown proof instead of guessed at.", 850],
    ["Tomorrow, Job 7 through 10. Job keeps talking, and it gets more honest, not less.", 850],
    ["For now, sit with the line Job said before anyone argued with him at all.", 800],
    ["The Lord gave, and the Lord hath taken away.", 900],
    ["Blessed be the name of the Lord.", 1200],
  ],
};
