import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 344, written to the Day 1 standard.
 *
 * Paul closes out 1 Timothy with instructions on widows, elders, and money,
 * then a brand new letter opens: 2 Timothy, written from prison, and it
 * starts in a different key entirely - tears, a grandmother's faith, and a
 * charge not to be ashamed. Seven blocks across two letters.
 */

const timothyFive = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Timothy 5:${startVerse}-${endVerse}`,
  book: "1 timothy",
  chapter: 5,
  startVerse,
  endVerse,
  teaching,
});

const timothySix = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Timothy 6:${startVerse}-${endVerse}`,
  book: "1 timothy",
  chapter: 6,
  startVerse,
  endVerse,
  teaching,
});

const secondTimothyOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Timothy 1:${startVerse}-${endVerse}`,
  book: "2 timothy",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 344,
  title: "Care, Contentment, and Courage",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 344.", 700],
    ["Paul finishes 1 Timothy today. How the church cares for widows. How it treats elders. A hard word about money.", 850],
    ["Then a brand new letter opens, and this one starts differently. This one starts in tears.", 800],
    ["Paul is older now, and something in his voice has changed.", 800],
    ["1 Timothy 5 and 6, then the start of 2 Timothy.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    timothyFive(1, 8, [
      "Paul tells Timothy how to correct people without steamrolling them. Don't lay into an older man, plead with him like a father. Treat younger men like brothers, older women like mothers, younger women like sisters, in all purity.",
      "Then he turns to widows, and the instruction is blunt. If a widow has children or grandchildren, they should learn first to care for their own family and repay their parents. That's what pleases God.",
      "But the widow who is really alone puts her hope in God and stays in prayer night and day. Paul draws a hard line next to her: the widow who lives for pleasure is dead while she's still breathing.",
      "Then the line that still stings. If anyone doesn't provide for his own, especially his own household, he's denied the faith and is worse than someone who never believed at all. Faith that won't feed its own family isn't faith yet.",
    ]),
    timothyFive(9, 16, [
      "The church kept an actual list of widows it supported, and Paul gives the qualifications. Over sixty, faithful to one husband, known for good works, raising children, showing hospitality, washing the feet of the saints, helping the afflicted.",
      "Younger widows, he says, leave off the list. Not as a judgment on them, but because he's watched what tends to happen. Idle hands turn into wandering house to house, gossiping, saying things they shouldn't.",
      "So Paul would rather see them remarry, raise a family, run a household, and give the enemy no opening to speak against them. Some, he says plainly, have already turned aside after Satan.",
      "Then he closes the loop. If a believing man or woman has widows in the family, let them carry that weight themselves, so the church's care goes to the women who truly have nobody. It starts at home before it becomes the church's job.",
    ]),
    timothyFive(17, 25, [
      "Elders who lead well, Paul says, deserve double honor, especially the ones who work hard at preaching and teaching. He backs it with two quotes: don't muzzle the ox while it treads the grain, and the laborer deserves his wages.",
      "But leadership also gets watched closer, not less. Don't even entertain an accusation against an elder unless two or three witnesses back it up. And if one is caught in sin, rebuke him publicly, so everyone else takes it seriously too.",
      "Paul charges Timothy, before God, Christ, and the elect angels, to keep these instructions without favoritism. And don't ordain anyone too quickly. Laying hands on a man too fast can make you a partner in whatever he does wrong later.",
      "Then a strange, human aside. Stop drinking only water, he tells Timothy, and use a little wine for your stomach's sake and your frequent illnesses. In the middle of church instructions, Paul notices his friend is sick and tells him to take care of himself.",
    ]),
    timothySix(1, 10, [
      "Paul tells servants under the yoke to honor their masters, believing or not, so God's name and the teaching don't get blamed for bad behavior. This wasn't Paul blessing slavery. It was survival instructions for people with no power, told to guard their witness anyway.",
      "Then he turns to teachers who chase godliness for what it can get them. Anyone who disagrees with sound teaching, Paul says, is proud, understands nothing, and has an unhealthy appetite for arguments about words.",
      "And then the line everyone half-remembers and usually misquotes. Godliness with contentment is great gain. We brought nothing into this world, and we can't take anything out of it. Food and clothing: let that be enough.",
      "People determined to get rich fall into temptation, a trap, and a pile of foolish, harmful desires that drown people in ruin. The love of money is a root of all kinds of evil, and reaching for it has made some wander from the faith and stab themselves with grief they didn't need.",
    ]),
    timothySix(11, 21, [
      "But you, man of God, Paul says to Timothy, run from all that. Chase righteousness, godliness, faith, love, endurance, gentleness instead. Fight the good fight of faith. Take hold of the eternal life you were called to, the one you already confessed in front of witnesses.",
      "Then he charges him again, this time before God who gives life to everything, and before Christ Jesus, who himself testified a good confession in front of Pontius Pilate. Keep this instruction spotless until Jesus appears.",
      "He breaks into praise mid-sentence. The blessed and only Ruler, King of kings and Lord of lords, the only one who cannot die, living in light no one can even get close to. Honor and power to Him forever.",
      "Last instruction: tell the rich in this present world not to bet their hope on money that can vanish, but on God, who richly gives us everything to enjoy. And Timothy, guard what's been entrusted to you. That's the whole letter, closed.",
    ]),
    secondTimothyOne(1, 7, [
      "New letter. Paul, an apostle by God's will, writing to Timothy, his dearly loved son. He tells him he thanks God constantly, remembering him in prayer night and day.",
      "Then something personal slips in. Paul remembers Timothy's tears, and longs to see him so he can be filled with joy again. This isn't a church manual anymore. This is one man missing another.",
      "He remembers the faith that lived first in Timothy's grandmother Lois, then his mother Eunice, and now, he says, I'm convinced it's in you too. Faith moving down a family line, one woman at a time, until it reaches a young pastor far from home.",
      "So Paul tells him to stir back up the gift God gave him through the laying on of Paul's hands. God didn't give us a spirit of fear, but of power, and love, and a sound mind. Timothy's problem wasn't a call he didn't have. It was a fire he'd let bank low.",
    ]),
    secondTimothyOne(8, 18, [
      "So don't be ashamed, Paul tells him, of testifying about our Lord, or ashamed of me, his prisoner. Instead share in suffering for the gospel, by the power of God, who saved us and called us to a holy calling, not because of anything we did, but His own purpose and grace.",
      "That grace was given before time began, and now it's out in the open because Jesus appeared, defeated death, and brought life and immortality into the light. That's the gospel Paul got appointed to preach, and it's why he's in chains. And still: I'm not ashamed. I know who I've believed.",
      "Hold on to the pattern of sound words you heard from me, Paul tells him, in the faith and love that's in Christ Jesus. Guard the good thing you were entrusted with, by the Holy Spirit living in us. This letter keeps circling one word. Guard.",
      "Then the sting. Everyone in Asia has turned away from me, Paul says, naming two of them. But not Onesiphorus. He refreshed me often, wasn't ashamed of my chains, and searched hard for me in Rome until he found me. Paul remembers exactly who showed up and exactly who didn't.",
    ]),
  ],
  closing: [
    ["So that's Day 344.", 700],
    ["Widows cared for, elders held to a higher standard, and money named for what it actually does to people who chase it.", 800],
    ["Then a new letter opens, and Paul isn't writing about church order anymore. He's writing to a friend he's afraid he won't see again.", 850],
    ["Notice where Timothy's faith actually came from. Not a program. A grandmother, then a mother, then a coach in chains reminding him to fan the flame.", 850],
    ["Tomorrow, 2 Timothy 2 through 4. Paul hands Timothy the charge to keep going even when everyone else quits.", 850],
    ["For now, carry two things from today.", 750],
    ["Godliness with contentment is great gain.", 800],
    ["And I know whom I have believed.", 1200],
  ],
};
