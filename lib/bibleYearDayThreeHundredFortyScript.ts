import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 340, written to the Day 1 standard.
 *
 * 1 Thessalonians 1 through 3. Paul planted this church and got run out of
 * town almost before he'd finished. The whole letter is a man checking
 * whether any of it took, sending Timothy because he can't stand not
 * knowing, and finally getting the answer he was afraid he wouldn't get.
 * Six blocks across three chapters.
 */

const thessOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Thessalonians 1:${startVerse}-${endVerse}`,
  book: "1 thessalonians",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const thessTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Thessalonians 2:${startVerse}-${endVerse}`,
  book: "1 thessalonians",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const thessThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Thessalonians 3:${startVerse}-${endVerse}`,
  book: "1 thessalonians",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 340,
  title: "Faith, Love, and Encouragement",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 340.", 700],
    ["Paul planted a church in Thessalonica and had to leave it almost before he'd finished.", 800],
    ["A mob ran him out of town a few weeks in. He never got a real goodbye.", 800],
    ["So this whole letter is written by a man who has spent months not knowing if any of it held.", 850],
    ["We're in 1 Thessalonians 1 through 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    thessOne(1, 10, [
      "Paul opens with Silvanus and Timothy, and goes straight into thanks. No correction yet, because he hasn't heard anything that needs correcting.",
      "He names three things: your work of faith, your labor of love, your patience of hope. Faith works. Love labors. Hope holds on. None of them just sit there.",
      "He reminds them how the gospel actually arrived. Not in word only, but in power, and in the Holy Ghost, and in much assurance. And they took it in the middle of affliction, with joy.",
      "You turned to God from idols, he says, to serve the living and true God, and to wait for His Son from heaven. Turn, serve, wait. That's the whole shape of it.",
    ]),
    thessTwo(1, 8, [
      "Paul reminds them what he'd just been through before he ever got to their city. Beaten and humiliated at Philippi, and he came to Thessalonica anyway and spoke boldly, in much contention.",
      "Then he defends himself, almost line by line. Not deceit. Not uncleanness. Not guile. Not flattering words. Not a cloak for greed. Somebody, after he left, must have said otherwise.",
      "We could have thrown our weight around as apostles of Christ, he says. Instead we were gentle among you, like a nurse cherishing her own children.",
      "We were willing to give you not only the gospel, but our own lives, because you had become dear to us. For Paul, this was never information handed down from a safe distance.",
    ]),
    thessTwo(9, 16, [
      "He reminds them of the labor. Night and day, so he wouldn't be a burden on people he'd just met. And how holily and justly and unblameably he behaved among them.",
      "We exhorted and comforted and charged every one of you, he says, the way a father does his own children, that you would walk worthy of the God who called you into His kingdom and glory.",
      "And when you received the word, you took it not as the word of men, but as what it actually is, the word of God, which works in everyone who believes it.",
      "Then he says something harder. You suffered from your own countrymen, the way the churches in Judea suffered from theirs, from people who tried to stop him preaching to the Gentiles at all. Paul himself was Jewish, and so was almost everyone in that first church. This is a man naming the specific opponents who ran him out of one specific town, not handing down a verdict on a whole people.",
    ]),
    thessTwo(17, 20, [
      "Taken from you for a short time, he says, in presence, not in heart. He wants them to know the distance was never his idea.",
      "We wanted to come to you, even I, Paul, more than once, but Satan hindered us. He doesn't know exactly what stopped him. He just knows something did, and it wasn't a lack of wanting to.",
      "Then the line that tells you what this whole letter actually is. What is our hope, or joy, or crown of rejoicing? Are not even you, in the presence of our Lord Jesus at His coming?",
      "You are our glory and joy, he tells them. Not converts on a list. Joy.",
    ]),
    thessThree(1, 8, [
      "He couldn't stand it anymore, so he stayed behind alone at Athens and sent Timothy to establish them and comfort them concerning their faith.",
      "He didn't want anyone shaken by the afflictions. We told you beforehand this would happen, he says. You know we are appointed to this.",
      "He was afraid the tempter had gotten to them and that his labor had been for nothing. That fear is sitting right there in the text, from the man who planted the church.",
      "Then Timothy comes back with good news. Your faith, your love, and that you still remember Paul kindly and want to see him. And Paul writes the line underneath all of it: now we live, if you stand fast in the Lord.",
    ]),
    thessThree(9, 13, [
      "What thanks can we give God for you, he asks, for all the joy we have because of you before our God?",
      "Night and day praying exceedingly, he says, to see your face again and finish what's still lacking in your faith. He doesn't pretend they've arrived.",
      "May the Lord make you increase and overflow in love, toward each other and toward everyone, the same way we love you.",
      "So that He may establish your hearts unblameable in holiness before God, at the coming of our Lord Jesus with all His saints. The letter ends looking straight at the thing they're all waiting for.",
    ]),
  ],
  closing: [
    ["So that's Day 340.", 700],
    ["A church Paul barely had time to plant before he had to run.", 750],
    ["This whole letter is a man checking: is it still standing? Did any of it take?", 800],
    ["He couldn't bear not knowing, so he sent Timothy to go find out.", 800],
    ["What is our hope, our joy, our crown of rejoicing, he asks. Not doctrine. Not a title. You.", 850],
    ["Tomorrow, 1 Thessalonians 4 and 5, and the start of 2 Thessalonians. Holiness, and how the Lord's return actually works.", 850],
    ["For now, carry the line Paul writes the moment the news finally comes back good.", 800],
    ["Now we live.", 800],
    ["If you stand fast in the Lord.", 1200],
  ],
};
