import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 343, written to the Day 1 standard.
 *
 * 1 Timothy 2 through 4. Paul moves from how the church prays, to who leads
 * it and how, to a warning about teachers who will show up later forbidding
 * things God never forbade, and finally turns personal: instructions to a
 * young pastor on how to carry himself so his life backs up his teaching.
 * Six blocks across three chapters.
 */

const timothyTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Timothy 2:${startVerse}-${endVerse}`,
  book: "1 timothy",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const timothyThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Timothy 3:${startVerse}-${endVerse}`,
  book: "1 timothy",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const timothyFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Timothy 4:${startVerse}-${endVerse}`,
  book: "1 timothy",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 343,
  title: "Church Order and Godliness",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 343.", 700],
    ["Paul keeps writing Timothy, and today it's the practical stuff. How the church prays. Who leads it. What to watch for.", 850],
    ["And near the end, Paul stops talking about the church and starts talking straight to Timothy himself.", 800],
    ["1 Timothy 2, 3, and 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    timothyTwo(1, 8, [
      "First of all, Paul says, pray for everyone. Petitions, prayers, intercession, thanksgiving, for all people, including kings and everyone in authority, so we can live a quiet, peaceful life, godly and dignified.",
      "That's good, he says, and pleases God our Savior, who wants everyone to be saved and come to know the truth.",
      "There's one God, he says, and one mediator between God and mankind, the man Christ Jesus, who gave Himself as a ransom for everyone. That's the testimony Paul was appointed to preach and teach.",
      "So he wants the men everywhere to pray, lifting up holy hands, without anger or arguing.",
    ]),
    timothyTwo(9, 15, [
      "Paul then turns to how the women dress for worship, telling them to dress modestly, with decency and good sense, not with elaborate hair, gold, pearls, or expensive clothes, but with good works, which is what suits women who profess to worship God.",
      "He says a woman should learn quietly, in full submission, and he does not allow a woman to teach or hold authority over a man, but to be quiet.",
      "His reasoning goes back to Eden. Adam was formed first, then Eve. And Adam was not deceived, but the woman was deceived and fell into transgression.",
      "This is one of the most debated passages Paul wrote, and different faithful churches read it differently today. What the text itself says is what it says. Sit with it honestly rather than rushing past it.",
    ]),
    timothyThree(1, 7, [
      "If anyone desires to be an overseer, Paul says, he desires a good work. But the list of qualifications is long and it's about character, not talent.",
      "Above reproach, husband of one wife, sober-minded, self-controlled, respectable, hospitable, able to teach. Not a drunkard, not violent, but gentle, not quarrelsome, not a lover of money.",
      "He has to manage his own household well, with his children under control and respectful, because if a man can't manage his own house, how will he take care of God's church?",
      "Not a new believer, Paul says, or pride could puff him up and he'd fall under the same judgment the devil did. And he has to have a good reputation with outsiders, too, so he doesn't fall into disgrace and the devil's trap.",
    ]),
    timothyThree(8, 16, [
      "Deacons, the same way, need to be dignified, not two-faced, not heavy drinkers, not greedy for money, holding on to the deep truths of the faith with a clear conscience.",
      "Let them be tested first, he says, then serve if they're found blameless. Their wives, too, dignified, not gossips, sober-minded, faithful in everything. A deacon should be a one-woman man, managing his children and his household well.",
      "Paul says he's writing this so Timothy will know how people ought to conduct themselves in God's household, which is the church of the living God, the pillar and foundation of the truth.",
      "And without question, he says, the mystery of godliness is great: God appeared in the flesh, was vindicated by the Spirit, seen by angels, preached among the nations, believed on in the world, taken up in glory.",
    ]),
    timothyFour(1, 5, [
      "The Spirit clearly says, Paul writes, that in later times some will abandon the faith, following deceiving spirits and demonic teaching, through the hypocrisy of liars whose own conscience is seared, as if branded with a hot iron.",
      "They'll forbid people to marry, and demand they abstain from foods God created to be received with thanksgiving by those who believe and know the truth.",
      "Everything God created is good, he says, and nothing should be rejected if it's received with thanksgiving, because it's made holy by God's word and prayer.",
      "Notice what Paul calls false teaching here. Not always some exotic new idea. Sometimes it's just piling rules onto things God already called good.",
    ]),
    timothyFour(6, 16, [
      "If you point these things out to the brothers, Paul tells Timothy, you'll be a good servant of Christ Jesus, nourished on the words of the faith and the good teaching you've followed.",
      "Reject irreverent, silly myths, he says. Train yourself instead for godliness. Physical training has some value, but godliness is valuable in every way, holding promise for this life and the next.",
      "Don't let anyone look down on you for your youth, Paul says. Instead be an example to the believers in speech, conduct, love, faith, and purity. Give attention to public reading of Scripture, to exhortation, to teaching.",
      "Don't neglect the gift you were given, he says. Practice these things, immerse yourself in them, so everyone can see your progress. Watch your life and your doctrine closely. Persevere, and you'll save both yourself and those who hear you.",
    ]),
  ],
  closing: [
    ["So that's Day 343.", 700],
    ["A chapter on prayer, a chapter on qualifications for leading, and then Paul stops writing about the church and starts writing to Timothy the man.", 800],
    ["Watch your life and your doctrine closely, he tells him. Not one or the other. Both, held together.", 850],
    ["That's the whole letter in a sentence. What you believe and how you live are not two separate things.", 800],
    ["Tomorrow, 1 Timothy 5 and 6, then the start of 2 Timothy. How to treat people in the church, contentment, and a charge to guard what's been entrusted to him.", 850],
    ["For now, carry Paul's charge to a young man who felt too young for the job.", 800],
    ["Let no one despise your youth.", 800],
    ["Be an example.", 1200],
  ],
};
