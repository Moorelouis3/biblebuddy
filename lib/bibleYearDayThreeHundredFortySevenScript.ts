import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 347, written to the Day 1 standard.
 *
 * Philemon - one page, one favor, Paul asking a friend to take back a
 * runaway slave as a brother instead of property. Then Hebrews opens,
 * a book that starts with no small talk at all: the Son is greater than
 * the prophets, greater than the angels, and he suffered to get there.
 * Five blocks across Philemon and the first two chapters of Hebrews.
 */

const philemon = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Philemon 1:${startVerse}-${endVerse}`,
  book: "philemon",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const hebrewsOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 1:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const hebrewsTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hebrews 2:${startVerse}-${endVerse}`,
  book: "hebrews",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 347,
  title: "Reconciliation and the Son's Supremacy",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 347.", 700],
    ["Two very different books today. One page from Paul about a runaway slave. Then the opening of Hebrews, about who Jesus actually is.", 850],
    ["Philemon is the smallest fight in the New Testament. One friend asking another to forgive someone and take him back as family, not property.", 850],
    ["Then Hebrews opens with no small talk at all. It just starts telling you the Son is greater than everything that came before him.", 850],
    ["Philemon, and Hebrews 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    philemon(1, 11, [
      "This whole letter is one page, and it is Paul asking his friend Philemon for a favor about a runaway slave named Onesimus.",
      "Paul opens warm. Grace and peace to Philemon, to Apphia, to Archippus, and to the church that meets in Philemon's own house. He says he is thankful for Philemon's love and faith every time he prays.",
      "Then Paul could pull rank. He is an apostle, he could just tell Philemon what to do. Instead he says, I would rather appeal to you in love. An old man now, and a prisoner for Christ.",
      "And here is the appeal. It is for Onesimus, Paul's own son now, born through Paul's chains. Onesimus used to be useless to you, Paul admits. Now he is useful to both of us.",
    ]),
    philemon(12, 25, [
      "I am sending him back to you, Paul says, and that costs Paul something, because he calls Onesimus his own heart. Paul wanted to keep him, but would not do anything without Philemon's consent.",
      "Maybe this is why he was gone a while, Paul says, so you could get him back for good. Not as a slave anymore, but as a brother you love, especially to me, and even more to you.",
      "So if you call me your partner, receive him the way you would receive me. Whatever he owes you, put it on my account. I will repay it, Paul says, though technically you owe me your whole self anyway.",
      "Then it turns personal again. Refresh my heart, Paul says. Get a guest room ready, because I am hoping to see you soon. Epaphras, Mark, Aristarchus, Demas, and Luke all send their love. Grace be with your spirit.",
    ]),
    hebrewsOne(1, 14, [
      "New book, and it opens like nothing else in the New Testament. God spoke through the prophets in many ways, piece by piece, across a long time. But now, in these last days, he has spoken through a Son.",
      "And look at what is said about this Son. Heir of everything. The one God made the universe through. The exact likeness of God's own being, holding all things together by the power of his word.",
      "Then the writer stacks up quote after quote from the Old Testament to prove the point. The Son is not one more angel delivering a message. Angels are told to worship him. God himself calls him Son, calls him God, says his throne lasts forever.",
      "Angels are servants, sent out to help the people who are going to inherit salvation. The Son sits down at God's right hand. Nobody ever told an angel to do that.",
    ]),
    hebrewsTwo(1, 9, [
      "So pay closer attention to what we have heard, the writer says, or we are going to drift right past it. If the old message, given through angels, held people accountable for every violation, how do we think we will escape if we ignore a salvation this much greater?",
      "This salvation was first announced by the Lord himself, and confirmed by those who heard him, and God backed it up with signs, wonders, and gifts of the Holy Spirit, exactly the way he wanted.",
      "Then a quote from the Psalms. What is man, that you think about him? You made him a little lower than the angels, crowned him with glory and honor, put everything under his feet.",
      "Right now we do not see everything under human control yet. But we do see Jesus, made lower than the angels for a while, then crowned with glory and honor, because he suffered death, so that by God's grace he could taste death for everyone.",
    ]),
    hebrewsTwo(10, 18, [
      "It made sense for God, who made everything and owns everything, to bring many children into glory by making Jesus, the one leading them there, perfect through suffering.",
      "Because the one who makes people holy and the people he makes holy all come from the same family. That is why Jesus is not ashamed to call them brothers. I will announce your name to my brothers, he says, quoting the Psalms.",
      "Since those children are flesh and blood, Jesus took on flesh and blood too, so that through death he could break the power of the one who held death over people, the devil, and free everyone who has been enslaved their whole life by the fear of dying.",
      "He did not come to help angels. He came to help Abraham's descendants. That is why he had to become like his brothers in every way, so he could be a merciful and faithful high priest, and because he himself suffered temptation, he is able to help everyone else going through it.",
    ]),
  ],
  closing: [
    ["So that's Day 347.", 700],
    ["A slave sent home as a brother, and a Son announced as greater than angels, greater than prophets, greater than anything Israel had seen before.", 850],
    ["Paul could have ordered Philemon around. He did not. He appealed to love, and put Onesimus's debt on his own account.", 850],
    ["That is not a small move. Somebody paying what somebody else owes, so the relationship can be made new.", 850],
    ["Hebrews then opens by telling you exactly who did that on a much bigger scale. Not an angel. Not a prophet. The Son, who upholds everything by his word, and who was made lower than the angels for a while just so he could suffer and die for you.", 950],
    ["Tomorrow, Hebrews 3 through 5. Jesus compared to Moses, and the beginning of the priesthood language that runs through the rest of the book.", 850],
    ["For now, carry Paul's line about Onesimus.", 800],
    ["Put that on mine account.", 900],
    ["That is what happened to you too.", 1200],
  ],
};
