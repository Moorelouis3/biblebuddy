import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 319, written to the Day 1 standard.
 *
 * The heart of Romans: everyone stands guilty on the same terms, and God
 * offers the same righteousness by faith to everyone who believes, proven
 * first through Abraham and then through what Christ did while we were
 * still enemies. Six blocks across Romans 3, 4, and 5.
 */

const romansThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 3:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const romansFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 4:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const romansFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Romans 5:${startVerse}-${endVerse}`,
  book: "romans",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_NINETEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 319,
  title: "Justification by Faith",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 319.", 700],
    ["Yesterday Paul built a case against everyone — Jew and Gentile both, guilty on the same terms, no exceptions.", 800],
    ["Today he tells you what to do with that guilt.", 800],
    ["Three chapters, and one phrase drives every line of them. Justified by faith.", 850],
    ["Not earned. Not managed. Given.", 950],
    ["We are in Romans 3, 4, and 5.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    romansThree(1, 20, [
      "Paul asks the obvious question first. If Jew and Gentile stand equally guilty, what was the point of being Jewish at all? His answer: plenty. They were the ones trusted with God's own words.",
      "Then he heads off a shortcut people were already taking with grace. If my lie makes God's truth look better, why am I still judged as a sinner? He calls that idea exactly what it is. Slander, and whoever preaches it deserves the judgment they get.",
      "Then comes the verdict, stacked verse after verse out of the Psalms. None righteous, no not one. None who understands. None who seeks God. Throats like open graves. Feet swift to shed blood. No fear of God before their eyes.",
      "And the law was never meant to save anyone. It exists to stop every mouth, so the whole world stands there guilty, with nothing left to say in its own defense.",
    ]),
    romansThree(21, 31, [
      "Then the pivot the whole letter has been walking toward. But now, apart from the law altogether, a righteousness from God has shown up, and the law and the prophets were pointing at it the whole time.",
      "It comes by faith in Jesus Christ, for everyone that believeth, and Paul is emphatic about one detail. There is no difference. All have sinned and come short of the glory of God, on exactly the same terms.",
      "And everyone who believes is justified freely, as a gift, through the redemption in Christ, whom God set forth as a propitiation through faith in his blood — the place where God's wrath lands instead of on you.",
      "So where does that leave boasting? Excluded. Not by working harder at the law, but by the law of faith. A man is justified by faith without the deeds of the law.",
    ]),
    romansFour(1, 12, [
      "Paul goes straight to Abraham, the one man every reader in Rome would point to first. And he says even Abraham had nothing to boast of before God.",
      "Because Scripture does not say Abraham earned anything. Abraham believed God, and it was counted unto him for righteousness. A wage you earn is not a gift. This was a gift.",
      "Then he quotes David describing that same blessedness. Blessed are they whose iniquities are forgiven, whose sin the Lord will not impute to him.",
      "And here is the detail Paul wants caught. That happened to Abraham while he was still uncircumcised, before the sign, before the law existed at all. So he is the father of everyone who believes, marked or not.",
    ]),
    romansFour(13, 25, [
      "The promise to Abraham never came through the law. It came through the righteousness of faith. If it ran through the law instead, faith would be made void and the promise would be worth nothing.",
      "So Paul lays out what Abraham's faith actually looked like. A hundred years old, his own body as good as dead, Sarah's womb dead too, and he staggered not at the promise of God through unbelief, but was strong in faith, giving glory to God.",
      "That is why it was imputed to him for righteousness. And Paul says this was not written down just for Abraham. It was written for us also, whoever believes on the God who raised Jesus from the dead.",
      "Jesus was delivered for our offences, and raised again for our justification. The whole argument of these two chapters rests on that one hinge.",
    ]),
    romansFive(1, 11, [
      "Being justified by faith, Paul says, we have peace with God through our Lord Jesus Christ. Not a truce. Peace. The war is actually over.",
      "And that peace holds even inside suffering, because he traces a chain. Tribulation worketh patience, patience worketh experience, and experience, hope — and hope maketh not ashamed.",
      "Then he names exactly when this happened for you. When we were yet without strength, in due time Christ died for the ungodly. Scarcely for a righteous man will one die — but God commendeth his love toward us, in that while we were yet sinners, Christ died for us.",
      "If God did the hard part, reconciling his enemies through his Son's death while they were still against him, much more will he finish the easy part now — saving the reconciled by that same Son's life.",
    ]),
    romansFive(12, 21, [
      "Paul zooms all the way out to the beginning. By one man sin entered into the world, and death by sin, and so death passed upon all men, for that all have sinned.",
      "Then he makes the comparison explicit. Adam's one offence brought condemnation on everyone connected to him. Christ's one act of righteousness brings the free gift of justification to everyone connected to him. Same shape, opposite direction.",
      "And he is careful to say the second is not merely equal to the first. It is bigger. Where sin abounded, grace did much more abound. As by one man's disobedience many were made sinners, so by the obedience of one shall many be made righteous.",
      "The law entered so the offence might abound, not to fix it. But wherever sin multiplied, grace outran it every time. That the whole argument of these three chapters, standing in one sentence.",
    ]),
  ],
  closing: [
    ["So that is Day 319.", 700],
    ["None righteous, not one. That was yesterday's verdict, and today Paul builds the answer to it, brick by brick.", 800],
    ["A righteousness from God, apart from the law, available through faith in Jesus Christ, to everyone, with no difference between who gets it.", 850],
    ["Then he goes back to Abraham, the one man every reader in Rome already trusted, and shows that even he was justified by believing, not by working — before the law, before circumcision, before any of it existed.", 850],
    ["And Paul is specific about the timing. Christ died for you while you were still without strength. Still ungodly. Not after you improved.", 850],
    ["Then the last chapter draws the whole shape of the gospel in one comparison. One man's disobedience made many sinners. One man's obedience makes many righteous. And wherever sin multiplied, grace outran it every time.", 850],
    ["Tomorrow, Romans 6 through 8. If grace covers that much, Paul asks the question everyone eventually asks. Does that mean I can just keep sinning?", 850],
    ["For now, hold on to the phrase Paul keeps circling back to.", 750],
    ["Justified by faith.", 800],
    ["Peace with God.", 1200],
  ],
};
