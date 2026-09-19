import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 337, written to the Day 1 standard.
 *
 * Ephesians closes with the household instructions and then the armor of
 * God - the fight named for what it really is. Philippians opens from a
 * prison cell with nothing but joy, Paul's own life laid out as living is
 * Christ and dying is gain, and then the pattern for the whole church:
 * Christ emptying himself all the way to a cross. Six blocks across three
 * chapters.
 */

const ephesiansSix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Ephesians 6:${startVerse}-${endVerse}`,
  book: "ephesians",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

const philippiansOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Philippians 1:${startVerse}-${endVerse}`,
  book: "philippians",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const philippiansTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Philippians 2:${startVerse}-${endVerse}`,
  book: "philippians",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 337,
  title: "Armor, Joy, and Christlike Humility",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 337.", 700],
    ["Ephesians ends today, and Paul names the fight for what it actually is.", 800],
    ["Then a new letter opens. Paul is writing from a prison cell, and somehow the whole thing is joy.", 850],
    ["For me to live is Christ, he says. And to die is gain.", 850],
    ["We are in Ephesians 6, then Philippians 1 and 2.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    ephesiansSix(1, 9, [
      "Children, obey your parents in the Lord, Paul says, for this is right. Then he quotes the commandment with a promise attached. Honor your father and mother, that it may go well with you, and that you may live long on the earth.",
      "Fathers, do not provoke your children to wrath. Bring them up in the training and instruction of the Lord. The command is not only downward. Authority in this house runs both ways.",
      "Then servants and masters. Servants, obey with a sincere heart, as to Christ, not just when someone is watching. Do good with your whole will, as serving the Lord, not people.",
      "And masters, do the same to them. Stop the threatening. You have the same Master in heaven, and He does not play favorites between you and the people who work for you.",
    ]),
    ephesiansSix(10, 24, [
      "Finally, be strong in the Lord, and in the strength of His might. Put on the whole armor of God, so you can stand against the devil's schemes.",
      "Because the fight was never against flesh and blood. It is against rulers, against authorities, against the powers of this dark world, against evil spirits in the heavens.",
      "So he lists the pieces. Truth for a belt. Righteousness for a breastplate. Feet fitted with the readiness that comes from the gospel of peace. Faith as a shield to put out every flaming arrow. Salvation as a helmet. The word of God as the one weapon that is a sword.",
      "And after all of it, prayer. Praying always, in the Spirit, staying alert, for all the saints, and for Paul himself, that he would speak boldly even in chains. Grace be with everyone who loves the Lord Jesus in sincerity. That is where Ephesians ends.",
    ]),
    philippiansOne(1, 11, [
      "A new letter opens, and it is warm from the first line. Paul thanks God every time he remembers them, praying with joy because of their partnership in the gospel from day one.",
      "He is sure of one thing. The one who started a good work in you will keep at it, right up to the day of Christ. Not a maybe. A confidence.",
      "He says he carries them in his heart, whether he is in chains or defending the gospel, because they share in that grace with him.",
      "And his prayer is specific. That their love would grow, in knowledge and depth of insight, so they could tell what really matters, and stand pure and blameless until the day of Christ, full of the fruit that comes through Jesus.",
    ]),
    philippiansOne(12, 30, [
      "Paul wants them to know something surprising. What happened to him, the imprisonment itself, has actually pushed the gospel forward. The whole palace guard now knows he is in chains for Christ.",
      "Some preach Christ out of envy and rivalry, hoping to make his chains harder to bear. Others preach out of love. Paul's response to both. What does it matter? Christ is preached either way, and in that I rejoice.",
      "Then one of the most famous lines he ever wrote. For me to live is Christ, and to die is gain. He is genuinely torn. Departing to be with Christ is far better, but staying to serve them is more necessary.",
      "So he tells them to stand firm, one spirit, one mind, striving together for the faith of the gospel, without being frightened by anyone opposing you. Suffering for Christ is not a sign something has gone wrong. It has been granted to you, the same way believing was.",
    ]),
    philippiansTwo(1, 11, [
      "If there is any encouragement in Christ, any comfort from love, any fellowship with the Spirit, any affection and mercy, then complete Paul's joy. Be of one mind, one love, one spirit, one purpose.",
      "Do nothing out of selfish ambition or empty pride. In humility, value others above yourselves. Do not look only to your own interests, but also to the interests of others.",
      "Then Paul hands them the pattern. Have the same mindset as Christ, who existed in the form of God, and did not consider equality with God something to cling to.",
      "Instead he emptied himself, took the form of a servant, was made in human likeness, and humbled himself to death, even death on a cross. So God exalted him, and gave him the name above every name, so that every knee will bow and every tongue confess Jesus Christ is Lord, to the glory of God the Father.",
    ]),
    philippiansTwo(12, 30, [
      "Work out your own salvation with fear and trembling, Paul says, because it is God who works in you, giving you the desire and the power to do what pleases Him.",
      "Do everything without grumbling or arguing, so you can be blameless and pure, children of God without fault, shining like stars in a warped and crooked generation.",
      "Then Paul turns personal. He hopes to send Timothy soon, the one person who genuinely cares about them the way Paul does, because everyone else is chasing their own interests.",
      "And Epaphroditus, who nearly died for the work of Christ, risking his life to make up for what the church could not do themselves. Paul says welcome him with joy, and hold men like him in high honor.",
    ]),
  ],
  closing: [
    ["So that is Day 337.", 700],
    ["Ephesians ends with armor, because Paul knows exactly what kind of fight this is. Not flesh and blood. Something bigger.", 800],
    ["Truth, righteousness, peace, faith, salvation, the word of God. And under all of it, prayer that never stops.", 800],
    ["Then Philippians opens, and Paul is writing from prison, and somehow the whole letter is joy.", 850],
    ["For me to live is Christ, and to die is gain. He means every word of it.", 800],
    ["And the pattern for the whole church is Christ himself. Not clinging to what he was owed. Emptying himself, all the way to a cross.", 850],
    ["Tomorrow, Philippians 3 and 4, then Colossians 1. Knowing Christ, and why he is enough.", 850],
    ["For now, carry Paul's line about the fight you are actually in.", 800],
    ["We wrestle not against flesh and blood.", 1200],
  ],
};
