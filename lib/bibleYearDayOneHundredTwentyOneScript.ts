import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 121, written to the Day 1 standard.
 *
 * The third friend, Zophar, speaks - shorter and harsher than Eliphaz or
 * Bildad, with no patience left. Job's replies in chapters 12-14 are the
 * closest thing to hope he has managed yet: he still trusts God's raw power
 * even while accusing Him, still wants his day in court, and closes with the
 * first hint of resurrection hope in the whole book. Seven blocks across
 * four chapters, matching Day 120.
 */

const g = (book: string, chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${startVerse}-${endVerse}`,
  book,
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 121,
  title: "Human Frailty and Hope",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 121.", 700],
    ["A third friend steps up, and he is done being patient.", 750],
    ["Zophar tells Job that God is actually letting him off easy.", 800],
    ["And Job answers him with sarcasm, then with courage, then with something close to hope.", 800],
    ["By the end of these four chapters he is asking one question that changes everything if the answer is yes.", 850],
    ["We are in Job 11 through 14. A hard friend, a bold defense, and a man waiting for his change to come.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g("job", 11, 1, 12, [
      "Zophar the Naamathite is the third friend, and he wastes no time. Should not the multitude of words be answered, he says, and calls Job's defense of himself lies.",
      "Then he says something almost unbelievable. Know therefore that God exacteth of thee less than thine iniquity deserveth. In Zophar's mind, Job is getting off light.",
      "He asks who can find out the Almighty unto perfection. It is as high as heaven, deeper than hell, longer than the earth. True words, aimed at the wrong target.",
      "Zophar is not wrong that God is unsearchable. He is wrong to assume that unsearchable greatness proves Job's guilt.",
    ]),
    g("job", 11, 13, 20, [
      "Zophar's fix is simple. Prepare your heart, put away the iniquity in your hand, and your life gets bright again. You shall forget your misery, remember it as waters that pass away.",
      "It is the same formula every friend keeps offering. Confess, and comfort follows. Clean and simple, like a transaction.",
      "He promises Job will lie down with nobody to frighten him, and many will come begging his favor.",
      "It sounds kind. It is actually pressure dressed as comfort, built on a sin Job never committed.",
    ]),
    g("job", 12, 1, 12, [
      "Job answers with real sarcasm. No doubt but ye are the people, and wisdom shall die with you. He is not holding back anymore.",
      "He says he has understanding too, and points out something painfully true. He that is ready to slip with his feet is despised by the man at ease. Suffering makes people assume you deserved it.",
      "Then he says the tabernacles of robbers prosper, and those who provoke God stay secure. The tidy formula his friends keep repeating does not even match what everyone can see.",
      "Job tells them to just ask the animals, the birds, the earth itself. Even they would know the hand of the Lord made all this. He is not questioning God's power. He is questioning his friends' certainty.",
    ]),
    g("job", 12, 13, 25, [
      "Job pivots into something close to worship, even mid-argument. With God is wisdom and strength, he hath counsel and understanding.",
      "He breaketh down, and it cannot be built again. He withholdeth the waters, and they dry up. Nothing in creation moves without Him.",
      "He leadeth counsellors away spoiled, looseth the bond of kings, poureth contempt upon princes. Every human power structure is on loan from Him.",
      "Job is holding two things at once that his friends cannot. God is that powerful, and Job still does not know why he is suffering. Power and mystery, both true.",
    ]),
    g("job", 13, 1, 19, [
      "Job turns straight at his friends. What ye know, the same do I know also. He is not less informed. He just refuses to lie about his own innocence to fit their theory.",
      "Ye are forgers of lies, he says, physicians of no value. Oh that ye would altogether hold your peace, for that would be your wisdom. He wants silence more than their comfort.",
      "Then he says the line people still quote without knowing where it came from. Though he slay me, yet will I trust in him. In the same breath he says he will still maintain his own ways before God.",
      "That is not contradiction. Trusting God and still telling the truth about your own innocence can live in the same sentence.",
    ]),
    g("job", 13, 20, 28, [
      "Job asks God for exactly two things. Withdraw your hand from me, and stop making me so afraid that I cannot speak.",
      "Then call thou, and I will answer, he says, or let me speak, and answer thou me. He wants a real exchange, not a one-sided silence from heaven.",
      "How many are mine iniquities and sins, he asks. Make me to know my transgression. He is not refusing correction. He is asking to actually hear it, instead of guessing.",
      "Wherefore hidest thou thy face, and holdest me for thine enemy. That question sits at the center of the whole book. Why does God feel absent to the very people He has not abandoned?",
    ]),
    g("job", 14, 1, 22, [
      "Job steps back from his own case and looks at every human being. Man that is born of a woman is of few days, and full of trouble. He cometh forth like a flower, and is cut down.",
      "Then he compares us to a tree. Cut a tree down, and through the scent of water it will bud again. But man dieth, and wasteth away, and where is he?",
      "Right in the middle of that, Job asks the question the whole book has been circling. If a man die, shall he live again? He does not answer it. He just says he will wait, all the days of his appointed time, till my change come.",
      "That is not certainty. It is a man in the middle of unbearable loss, reaching toward a hope he cannot prove yet, and refusing to let go of it.",
    ]),
  ],
  closing: [
    ["So that is Day 121.", 700],
    ["A third friend arrived with less patience and a harder line than the first two.", 750],
    ["And Job answered him with sarcasm, then with worship, then with a request nobody had made yet. Just let me speak, and let God answer.", 800],
    ["He said he would trust God even if God killed him. In the very same breath, he refused to stop telling the truth about his own innocence.", 850],
    ["Then he looked past his own suffering at every human life, short as a flower, and asked the question underneath everything. If a man die, shall he live again?", 850],
    ["He did not get an answer. He got a decision instead. All the days of my appointed time will I wait, till my change come.", 850],
    ["Tomorrow, Job 15 through 18. The friends come back around for a second round, and it gets sharper, not gentler.", 850],
    ["For now, hold on to that waiting.", 800],
    ["Job did not know how his story ended.", 750],
    ["He decided to wait for the change anyway.", 1200],
  ],
};
