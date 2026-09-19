import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 328, written to the Day 1 standard.
 *
 * First Corinthians 14 through 16: Paul sorts out the chaos of tongues and
 * prophecy in worship, then stops correcting the church long enough to lay
 * out the one fact the whole faith stands or falls on, and closes with
 * ordinary logistics — a collection, travel plans, a final warning and a
 * blessing. Six blocks across three chapters.
 */

const firstCorinthiansFourteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 14:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 14,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansFifteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 15:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 15,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansSixteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 16:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 16,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 328,
  title: "Order, Resurrection, and Hope",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 328.", 700],
    ["Corinth's worship services had turned into chaos. Everyone talking over everyone, nobody understanding anybody.", 800],
    ["Paul spends a chapter fixing that.", 700],
    ["Then he stops and asks the biggest question in the whole letter. What if Jesus never actually got up from that grave?", 900],
    ["We are in First Corinthians 14, 15, and 16.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    firstCorinthiansFourteen(1, 19, [
      "He that speaketh in an unknown tongue speaketh not unto men, but unto God. But he that prophesieth speaketh unto men to edification, and exhortation, and comfort. Paul ranks the gifts by one question. Does it help the person sitting next to you.",
      "If the trumpet give an uncertain sound, who shall prepare himself to the battle? A sound nobody can understand does nobody any good, no matter how impressive it is to make.",
      "Yet in the church I had rather speak five words with my understanding, that by my voice I might teach others also, than ten thousand words in an unknown tongue. He would rather be small and clear than large and confusing.",
      "It's not really about tongues. It's about who the performance is for. If nobody understands you, you might be speaking to yourself.",
    ]),
    firstCorinthiansFourteen(20, 40, [
      "Brethren, be not children in understanding: howbeit in malice be ye children, but in understanding be men. He wants them to grow up, not put on a better show.",
      "If the whole church come together and all speak with tongues, and there come in those that are unlearned or unbelievers, will they not say that ye are mad? But if all prophesy, a visitor is convinced, is judged, and falling down on his face he will worship God. Clarity converts. Confusion just confuses.",
      "In the middle of this, Paul tells the women to keep silence in the churches and ask their husbands at home if they want to learn something. That instruction is aimed at the specific disorder in this specific congregation. Read it plainly and let it sit.",
      "Let all things be done decently and in order. One sentence, and it's the whole chapter. Not no gifts. Not no Spirit. Just — take turns.",
    ]),
    firstCorinthiansFifteen(1, 11, [
      "Paul reminds them what he actually preached. That Christ died for our sins according to the scriptures, and that he was buried, and that he rose again the third day according to the scriptures.",
      "Then he lists who saw him alive. Cephas, then the twelve. Then above five hundred brethren at once, most of whom were still around to be asked about it. Then James. Then all the apostles. And last of all, Paul himself, as of one born out of due time.",
      "I am the least of the apostles, that am not meet to be called an apostle, because I persecuted the church of God. But by the grace of God I am what I am. He never gets comfortable with his own resume.",
      "Whether it were I or they, so we preach, and so ye believed. This was never Paul's private opinion. It's a report from people who were there.",
    ]),
    firstCorinthiansFifteen(12, 34, [
      "If Christ be not risen, then is our preaching vain, and your faith is also vain. Paul stakes the entire religion on a historical event, not a feeling. If it didn't happen, none of this is worth keeping.",
      "If in this life only we have hope in Christ, we are of all men most miserable. He does not soften that. A faith that's only useful if it's true is a faith that has to actually be true.",
      "But now is Christ risen from the dead, and become the firstfruits of them that slept. Three words carry the whole turn. But now is.",
      "If the dead rise not, let us eat and drink, for tomorrow we die. Paul names exactly what the alternative looks like. Every risk he's taken for the gospel only makes sense on one condition.",
    ]),
    firstCorinthiansFifteen(35, 58, [
      "How are the dead raised up? Thou fool, that which thou sowest is not quickened, except it die. A seed goes into the ground and disappears before it becomes anything. God gives it a body as it hath pleased him.",
      "It is sown in corruption, it is raised in incorruption. Sown in dishonour, raised in glory. Sown in weakness, raised in power. Sown a natural body, raised a spiritual body. Everything about it changes except that it's still you.",
      "Behold, I shew you a mystery. We shall not all sleep, but we shall all be changed, in a moment, in the twinkling of an eye, at the last trump. Not a gradual fade. An instant.",
      "O death, where is thy sting? O grave, where is thy victory? Thanks be to God, which giveth us the victory through our Lord Jesus Christ. He answers his own question before he asks it.",
    ]),
    firstCorinthiansSixteen(1, 24, [
      "Now concerning the collection for the saints. Upon the first day of the week let every one of you lay by him in store, as God hath prospered him. Right after the resurrection chapter, Paul talks about money. The hope doesn't excuse them from ordinary generosity.",
      "A great door and effectual is opened unto me, and there are many adversaries. He describes his situation in Ephesus with both halves in the same breath. Opportunity and opposition, together.",
      "Watch ye, stand fast in the faith, quit you like men, be strong. Let all your things be done with charity. After sixteen chapters correcting this church, that's his last instruction. Whatever else you do, do it in love.",
      "If any man love not the Lord Jesus Christ, let him be Anathema Maranatha. My love be with you all in Christ Jesus. Amen. A hard line and a warm one, back to back, in the last breath of the letter.",
    ]),
  ],
  closing: [
    ["So that is Day 328.", 700],
    ["A church talking over each other in tongues, and Paul telling them to grow up and take turns.", 750],
    ["Then he stops correcting worship and lays out the one fact everything else stands on.", 800],
    ["If Christ be not risen, your faith is vain. You are yet in your sins.", 850],
    ["But now is Christ risen from the dead. Everything after that sentence changes.", 850],
    ["Tomorrow, Second Corinthians 1 through 3. Paul writes about the comfort he found in the worst suffering of his life.", 850],
    ["For now, sit with the question he answers.", 800],
    ["O death, where is thy sting?", 750],
    ["O grave, where is thy victory?", 1200],
  ],
};
