import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 338, written to the Day 1 standard.
 *
 * Philippians closes with Paul's own reckoning of loss and gain, the race he
 * has not finished, and the peace that guards a mind under pressure. Then
 * Colossians opens with the highest claim in the New Testament about who
 * Christ actually is. Six blocks across three chapters.
 */

const philippiansThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Philippians 3:${startVerse}-${endVerse}`,
  book: "philippians",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const philippiansFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Philippians 4:${startVerse}-${endVerse}`,
  book: "philippians",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const colossiansOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Colossians 1:${startVerse}-${endVerse}`,
  book: "colossians",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 338,
  title: "Knowing Christ and His Supremacy",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 338.", 700],
    ["Paul just told a church in prison that dying is gain. Today he tells you why he actually believes it.", 800],
    ["He lists everything he used to be proud of, and calls it garbage next to knowing Christ.", 850],
    ["Then a new letter opens, and it asks one question. Who is Jesus, really.", 850],
    ["We are in Philippians 3 and 4, then Colossians 1.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    philippiansThree(1, 11, [
      "Paul warns them about the ones insisting on circumcision, and then flips the whole idea. We are the circumcision, he says, the ones who worship by the Spirit and put no confidence in the flesh.",
      "So he lists his own resume. Circumcised the eighth day, of the people of Israel, a Pharisee, blameless under the law. If anyone had a case for earning God's favor, it was him.",
      "And then he throws all of it out. Whatever were gains to me, I have counted as loss for the sake of Christ. Not just loss. He calls it garbage, so he can gain Christ and be found in Him.",
      "Not having a righteousness of my own that comes from the law, he says, but one that comes through faith in Christ. He wants to know Him, and the power of His resurrection, and the fellowship of sharing His sufferings.",
    ]),
    philippiansThree(12, 21, [
      "Not that I have already attained this, Paul says. He has been a believer for decades and he still calls himself unfinished. One thing I do, forgetting what is behind, straining toward what is ahead.",
      "I press on toward the goal, for the prize of the upward call of God in Christ Jesus. It is a runner's word. This is not a man who thinks he has arrived.",
      "Then he grieves out loud for a moment. Many walk as enemies of the cross of Christ, whose god is their belly, whose glory is in their shame, whose minds are set on earthly things. He says it with tears, not contempt.",
      "But our citizenship is in heaven, he says. And from there we wait for a Savior, the Lord Jesus Christ, who will transform our lowly bodies to be like His glorious body.",
    ]),
    philippiansFour(1, 9, [
      "My joy and crown, stand firm in the Lord, he says to them. Then he names two women by name, Euodia and Syntyche, and asks them plainly to agree in the Lord. Real people, a real disagreement, settled in public.",
      "Rejoice in the Lord always. I will say it again, rejoice. Let your gentleness be known to everyone. The Lord is at hand.",
      "Do not be anxious about anything, he says, but in everything, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which surpasses all understanding, will guard your hearts and minds in Christ Jesus.",
      "Whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable, think about such things. Not a suggestion to feel better. Instructions for where to put your mind.",
    ]),
    philippiansFour(10, 23, [
      "Paul thanks them for the gift they sent, but he is careful how he says it. Not that I am speaking of being in need, for I have learned, in whatever situation I am, to be content.",
      "I know how to be brought low, and I know how to abound. In any and every circumstance, I have learned the secret of facing plenty and hunger, abundance and need.",
      "Then the line everyone knows, in its actual context. I can do all things through Him who strengthens me. Not a promise of success. A confession about contentment, in a cell, with or without the money.",
      "He calls their gift a fragrant offering, a sacrifice acceptable and pleasing to God. And my God will supply every need of yours according to His riches in glory in Christ Jesus. Then greetings, and grace, and the letter ends.",
    ]),
    colossiansOne(1, 14, [
      "A new letter, to a church Paul has never visited. Paul and Timothy, to the saints in Colossae. He thanks God for their faith in Christ and their love for all the saints, because of the hope stored up for them in heaven.",
      "They heard it from Epaphras, a faithful minister who told Paul about their love in the Spirit. Paul has not met these people, but the report of them moves him to pray.",
      "And this is the prayer. That they be filled with the knowledge of God's will, walking in a manner worthy of the Lord, bearing fruit, growing in the knowledge of God, strengthened for all endurance and patience with joy.",
      "Giving thanks to the Father who qualified you to share in the inheritance of the saints in light. He has delivered us from the domain of darkness and transferred us into the kingdom of His beloved Son, in whom we have redemption, the forgiveness of sins.",
    ]),
    colossiansOne(15, 29, [
      "Then Paul writes the highest thing anyone ever wrote about Jesus. He is the image of the invisible God, the firstborn over all creation. By Him all things were created, in heaven and on earth, visible and invisible.",
      "All things were created through Him and for Him. He is before all things, and in Him all things hold together. He is the head of the body, the church, so that in everything He might have first place.",
      "For God was pleased to have all His fullness dwell in Him, and through Him to reconcile everything to Himself, making peace through the blood of His cross. You who were once alienated, enemies in your minds, He has now reconciled in His body of flesh through death.",
      "Paul says he rejoices in his sufferings for them, filling up what is still lacking in Christ's afflictions, for the sake of His body, the church. The mystery hidden for ages is now revealed. Christ in you, the hope of glory. That is who Paul labors, struggling with all the energy Christ powerfully works in him, to present everyone mature in Christ.",
    ]),
  ],
  closing: [
    ["So that is Day 338.", 700],
    ["Paul takes everything he used to be proud of and calls it garbage next to knowing Christ.", 800],
    ["He has not arrived. He is still straining forward, still pressing toward the goal.", 800],
    ["And the peace that guards your heart does not come from having no problems. It comes from bringing them to God instead of carrying them alone.", 850],
    ["Then Colossians opens, and answers the only question that actually matters. Who is Jesus.", 800],
    ["The image of the invisible God. Before all things. Holding all things together.", 800],
    ["Tomorrow, Colossians 2 through 4. What it looks like to live like that is true.", 850],
    ["For now, carry Paul's line about the fight for your mind.", 800],
    ["Whatever is true, whatever is noble, whatever is pure.", 800],
    ["Think about such things.", 1200],
  ],
};
