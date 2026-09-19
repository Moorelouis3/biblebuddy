import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 326, written to the Day 1 standard.
 *
 * First Corinthians 7 through 10: marriage and singleness answered
 * question by question, food offered to idols weighed against a weaker
 * brother's conscience, Paul refusing rights he actually has, and Israel's
 * wilderness collapse held up as a warning to a church that thinks it is
 * standing safely. Seven blocks across four chapters.
 */

const firstCorinthiansSeven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 7:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 7,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansEight = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 8:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 8,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansNine = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 9:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 9,
  startVerse,
  endVerse,
  teaching,
});

const firstCorinthiansTen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Corinthians 10:${startVerse}-${endVerse}`,
  book: "1 corinthians",
  chapter: 10,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 326,
  title: "Marriage, Freedom, and Warning",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 326.", 700],
    ["The Corinthians had been writing Paul questions, and today he answers a stack of them.", 800],
    ["Should you marry. Should you stay single. Can you eat meat that was offered to an idol before it hit the market.", 800],
    ["And underneath all of it, one bigger question. What do you owe the people around you when you're free to do something they can't handle yet.", 850],
    ["We are in First Corinthians 7 through 10.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    firstCorinthiansSeven(1, 16, [
      "It is good for a man not to touch a woman, Paul opens, answering something they'd asked him directly. But to avoid fornication, let every man have his own wife, and every woman her own husband. He isn't ranking marriage below singleness. He's saying neither one is the default everyone must copy.",
      "The wife hath not power of her own body, but the husband, and likewise the husband hath not power of his own body, but the wife. In a world where a husband owned his wife, Paul hands the ownership back the other direction too. That line alone was radical.",
      "To the married he gives it straight from the Lord: let not the wife depart from her husband. To a believer married to an unbeliever, he adds his own counsel: if the unbelieving spouse is willing to stay, don't leave. The unbelieving husband is sanctified by the wife, he says. Your staying isn't wasted.",
      "But if the unbelieving depart, let him depart. God hath called us to peace. Paul doesn't chain a believer to someone determined to walk out. For what knowest thou, O wife, whether thou shalt save thy husband? Staying is hope, not obligation.",
    ]),
    firstCorinthiansSeven(17, 40, [
      "As God hath distributed to every man, as the Lord hath called every one, so let him walk. Circumcised or not, slave or free, married or single — the calling you're already in is the room God put you in, not a waiting room before the real life starts.",
      "I suppose therefore that this is good for the present distress, that it is good for a man so to be. Corinth was under real pressure, and Paul is being practical, not writing a universal law against marriage. Art thou loosed from a wife? Seek not a wife. Different season, different counsel.",
      "But this I say, brethren, the time is short. It remaineth, that both they that have wives be as though they had none, and they that weep as though they wept not. He isn't telling them to stop feeling things. He's telling them not to build a permanent home out of things that are already passing away.",
      "He that is unmarried careth for the things that belong to the Lord, how he may please the Lord. He that is married careth for the things of the world, how he may please his wife. Not a insult to marriage — a plain description of divided attention, said so nobody enters it blind.",
    ]),
    firstCorinthiansEight(1, 13, [
      "Now as touching things offered unto idols, we know that we all have knowledge. Knowledge puffeth up, but charity edifieth. Corinth's educated members knew an idol is nothing, so eating meat sacrificed to one meant nothing spiritually. True. And also not the whole answer.",
      "We know that an idol is nothing in the world, and that there is none other God but one. Paul agrees with their theology completely. But howbeit there is not in every man that knowledge — some, with conscience of the idol, still eat it as a real sacrifice, and their conscience is defiled.",
      "Take heed lest by any means this liberty of yours become a stumblingblock to them that are weak. Through thy knowledge shall the weak brother perish, for whom Christ died? He puts a face on the argument. Not an abstract weaker brother — one Christ died for, standing right there.",
      "Wherefore, if meat make my brother to offend, I will eat no flesh while the world standeth, lest I make my brother to offend. Paul's own rule for himself is the strongest version of the argument. He'd rather give up something harmless forever than wound someone he could have protected.",
    ]),
    firstCorinthiansNine(1, 18, [
      "Am I not an apostle? Am I not free? Have I not seen Jesus Christ our Lord? Paul defends his own authority for one reason — to immediately set it down. Have we not power to eat and to drink? Have we not power to lead about a wife, as well as other apostles?",
      "Who goeth a warfare any time at his own charges? He stacks up plain, common-sense pictures — the soldier, the vineyard planter, the shepherd who drinks the milk — to make one point. A worker earns his wage, and even God's law says don't muzzle the ox that treads the corn.",
      "Even so hath the Lord ordained that they which preach the gospel should live of the gospel. Paul has every right to be supported by the churches he plants. But I have used none of these things, he says. It were better for me to die than that any man should make my glorying void.",
      "What is my reward then? That when I preach the gospel, I may make the gospel of Christ without charge, that I abuse not my power in the gospel. He turns a right into a gift, on purpose, so nobody can say he preached for the money.",
    ]),
    firstCorinthiansNine(19, 27, [
      "For though I be free from all men, yet have I made myself servant unto all, that I might gain the more. Freedom, for Paul, isn't the right to do whatever he wants. It's having enough room to give it away for someone else's sake.",
      "Unto the Jews I became as a Jew. To them that are without law, as without law. To the weak became I as weak. Not a different gospel for each audience — the same gospel, carried by a man willing to set down his own comfort to get it into the room.",
      "Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain. Every athlete is temperate in all things, to obtain a corruptible crown, but we an incorruptible. He isn't talking about earning salvation. He's talking about running like the finish line is real.",
      "I keep under my body, and bring it into subjection, lest that by any means, when I have preached to others, I myself should be a castaway. The man with the authority to demand support disciplines himself the hardest. Rights and self-control were never opposites for Paul.",
    ]),
    firstCorinthiansTen(1, 13, [
      "Moreover, brethren, I would not that ye should be ignorant, how that all our fathers were under the cloud, and all passed through the sea. Paul reaches back to the exodus. Every one of that generation had the same rescue, the same bread from heaven, the same water from the rock. And that Rock was Christ, he says — Christ was already there, long before Bethlehem.",
      "But with many of them God was not well pleased: for they were overthrown in the wilderness. Now these things were our examples, to the intent we should not lust after evil things, as they also lusted. Rescued people can still be lost people. Getting out of Egypt didn't guarantee getting into Canaan.",
      "Neither be ye idolaters... neither let us commit fornication... neither let us tempt Christ... neither murmur ye. Four specific failures, four specific warnings, all aimed at a church that thought its knowledge made it safe.",
      "Wherefore let him that thinketh he standeth take heed lest he fall. There hath no temptation taken you but such as is common to man, but God is faithful, who will not suffer you to be tempted above that ye are able, but will with the temptation also make a way to escape. The warning and the promise sit in the same breath on purpose.",
    ]),
    firstCorinthiansTen(14, 33, [
      "Wherefore, my dearly beloved, flee from idolatry. The cup of blessing which we bless, is it not the communion of the blood of Christ? Sharing the Lord's table binds you to something. Sharing a table at an idol's feast binds you to something else. Ye cannot drink the cup of the Lord, and the cup of devils.",
      "All things are lawful for me, but all things are not expedient. All things are lawful for me, but all things edify not. Let no man seek his own, but every man another's wealth. He circles back to exactly where chapter eight started — the same freedom, the same limit.",
      "Whatsoever is sold in the shambles, that eat, asking no question for conscience sake. He isn't building a new law out of scruples. Eat what's put in front of you, unless someone tells you plainly it was offered to an idol — then, for that person's sake, don't.",
      "Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God. Give none offence, neither to the Jews, nor to the Gentiles, nor to the church of God. Four chapters of specific questions land on one sentence big enough to hold all of them.",
    ]),
  ],
  closing: [
    ["So that is Day 326.", 700],
    ["Marriage and singleness. Meat and idols. A worker's wage Paul refused to take.", 750],
    ["Different questions, same thread running under all of them.", 800],
    ["All things are lawful for me, but all things are not expedient. Freedom was never the finish line for Paul. Love was.", 850],
    ["And the wilderness generation is standing there the whole chapter as proof. Rescued is not the same as safe.", 850],
    ["Let him that thinketh he standeth take heed lest he fall.", 800],
    ["Tomorrow, First Corinthians 11 through 13. Worship, spiritual gifts, and the most quoted chapter on love in the whole Bible.", 850],
    ["For now, sit with the escape God promises in the middle of the warning.", 800],
    ["He will make a way.", 750],
    ["That ye may be able to bear it.", 1200],
  ],
};
