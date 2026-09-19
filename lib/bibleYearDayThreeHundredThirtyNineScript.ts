import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 339, written to the Day 1 standard.
 *
 * Colossians finishes today. Paul fights for a church he has never met,
 * warns them off hollow philosophy and rule-keeping, then lays out what
 * a life actually looks like once you are hidden with Christ - put off,
 * put on, and a household reordered around a new Master. Six blocks
 * across three chapters.
 */

const colossiansTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Colossians 2:${startVerse}-${endVerse}`,
  book: "colossians",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const colossiansThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Colossians 3:${startVerse}-${endVerse}`,
  book: "colossians",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const colossiansFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Colossians 4:${startVerse}-${endVerse}`,
  book: "colossians",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 339,
  title: "Fullness in Christ",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 339.", 700],
    ["Paul is fighting for a church he has never even visited.", 800],
    ["People there are being pulled toward hollow philosophy and a long list of rules. Paul says none of it adds anything.", 850],
    ["In Christ, he says, you are already complete. Then he tells them what that actually looks like on a Tuesday.", 850],
    ["We finish Colossians today. Chapters 2 through 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    colossiansTwo(1, 15, [
      "Paul says he is struggling for them, though they have never met face to face, so their hearts would be encouraged and knit together in love, reaching the full riches of understanding Christ.",
      "In Him, he says, are hidden all the treasures of wisdom and knowledge. He tells them this so no one can talk them out of it with fine-sounding arguments.",
      "Watch that nobody takes you captive through hollow and deceptive philosophy, human tradition dressed up as wisdom. Because in Christ all the fullness of God lives in bodily form, and you have been given fullness in Him.",
      "You were dead in your sins, and God made you alive with Christ, forgiving every one of them, canceling the record of debt that stood against you, nailing it to the cross. He disarmed the powers and authorities and made a public spectacle of them, triumphing over them by the cross.",
    ]),
    colossiansTwo(16, 23, [
      "So do not let anyone judge you over food or drink, or over a festival, new moon, or sabbath. Those things were a shadow of what was coming. The reality is found in Christ.",
      "Do not let anyone disqualify you by insisting on false humility and the worship of angels, puffed up without cause by a mind set on nothing.",
      "Such a person has lost connection to the head, from whom the whole body grows as God causes it to grow. Rules like do not touch, do not taste, do not handle have an appearance of wisdom, but no power to restrain the flesh.",
      "If you died with Christ to the basic principles of this world, why submit to rules as though you still belonged to it. All of it is destined to perish with use, human commands and teachings dressed up as spirituality.",
    ]),
    colossiansThree(1, 17, [
      "Since you have been raised with Christ, set your hearts and minds on things above, not on earthly things. For you died, and your life is hidden with Christ in God.",
      "So put to death whatever belongs to your earthly nature. Sexual immorality, impurity, lust, evil desires, and greed, which is idolatry. And rid yourselves of anger, rage, malice, slander, filthy language, and lying to one another.",
      "You have taken off the old self and its practices, and put on the new self, being renewed in the image of its Creator. Here there is no Greek or Jew, slave or free. Christ is all, and is in all.",
      "So clothe yourselves with compassion, kindness, humility, gentleness, patience. Bear with each other and forgive whatever grievances you have, as the Lord forgave you. And over all these virtues put on love, which binds them all together in perfect unity.",
    ]),
    colossiansThree(18, 25, [
      "Then Paul writes to the household directly. Wives, submit to your husbands, as is fitting in the Lord. Husbands, love your wives, and do not be harsh with them.",
      "Children, obey your parents in everything, for this pleases the Lord. Fathers, do not embitter your children, or they will become discouraged.",
      "Servants, obey your earthly masters in everything, not just to win their favor, but with sincerity of heart, whatever you do, working at it with all your heart, as working for the Lord, not for people.",
      "It is the Lord Christ you are serving, Paul reminds them. And anyone who does wrong will be repaid for their wrongs, and there is no favoritism. The instructions run to everyone in the house, not just the ones with less power.",
    ]),
    colossiansFour(1, 9, [
      "Masters, give your servants what is right and fair, because you know that you also have a Master in heaven. Authority does not exempt you from the same accountability you expect from others.",
      "Devote yourselves to prayer, being watchful and thankful. And pray for us too, that God may open a door for our message, the mystery of Christ, for which Paul is in chains.",
      "Be wise in the way you act toward outsiders, making the most of every opportunity. Let your conversation be full of grace, seasoned with salt, so you know how to answer everyone.",
      "Tychicus will tell you all the news about me, Paul says, sent so that he may encourage your hearts, along with Onesimus, a faithful and dear brother, one of you. Real names, sent to a real church, carrying a real letter.",
    ]),
    colossiansFour(10, 18, [
      "Greetings pour in. Aristarchus, Paul's fellow prisoner. Mark, Barnabas's cousin, with instructions to welcome him if he comes. Jesus who is called Justus. All Jews, and Paul says they have been a comfort to him.",
      "Epaphras, one of you, a servant of Christ, is always wrestling in prayer for you, that you may stand firm, mature, and fully assured in everything God wills. Luke, the beloved doctor, and Demas send greetings too.",
      "Give my greetings to the brothers at Laodicea, and to Nympha and the church in her house. After this letter is read among you, make sure it is read in the church of the Laodiceans, and that you read the letter from Laodicea too.",
      "Tell Archippus, see to it that you complete the ministry you have received in the Lord. Then Paul signs it in his own hand. Remember my chains. Grace be with you. A letter that ends where it began, with a man in prison thinking about everyone but himself.",
    ]),
  ],
  closing: [
    ["So that is Day 339. Colossians is finished.", 700],
    ["Paul spent the whole letter fighting for people he had never met, because he knew what was at stake.", 800],
    ["In Christ you are already complete. Not almost. Not once you keep enough rules. Already.", 800],
    ["And then he shows you what that looks like in a house. Set your mind above, then put off the old, put on the new, then let it reach your marriage, your kids, your work.", 850],
    ["The theology and the household instructions are not two different letters. They are one sentence.", 800],
    ["Tomorrow, 1 Thessalonians 1 through 3. A church Paul planted, and how fast he had to leave it.", 850],
    ["For now, carry the line about what actually holds a life together.", 800],
    ["Over all these virtues put on love.", 800],
    ["Which binds them all together.", 1200],
  ],
};
