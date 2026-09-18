import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 299, written to the Day 1 standard.
 *
 * Luke 16-18 is a three-chapter reading about money, faith, and who
 * actually goes home justified: the unjust steward, the rich man and
 * Lazarus, the ten lepers, the persistent widow, the Pharisee and the
 * publican, the rich young ruler, and the blind beggar at Jericho. Seven
 * blocks across the three chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Luke ${chapter}:${startVerse}-${endVerse}`,
  book: "luke",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 299,
  title: "Wealth, Faith, and Humility",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 299. A dishonest manager gets praised for being shrewd with somebody else's money.", 800],
    ["A rich man in torment begs for one drop of water, from a beggar he stepped over every day and never once noticed.", 850],
    ["A widow wears down a judge who fears nobody, just by refusing to stop asking.", 800],
    ["A Pharisee thanks God he is better than the tax collector standing near him. The tax collector will not even lift his eyes.", 850],
    ["And a rich young man walks away sad, because Jesus asked for the one thing he could not hand over.", 850],
    ["We are in Luke 16, 17, and 18. Money, faith, and who actually goes home justified.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(16, 1, 13, [
      "A rich man's steward is accused of wasting his goods, and told to turn in his accounts because he is about to lose the job. The steward thinks it through out loud. I cannot dig, to beg I am ashamed. I know what I will do, so that when I am put out of the stewardship, people will receive me into their houses.",
      "He calls in his master's debtors one at a time and quietly cuts their bills. A hundred measures of oil becomes fifty. A hundred measures of wheat becomes eighty. He is buying himself friends on the way out the door, with money that was never his.",
      "And here is the surprising line. The lord commends the unjust steward, not for the dishonesty, for the shrewdness. The children of this world are wiser in their generation than the children of light. Jesus is not telling you to cheat anyone. He is asking why people plan harder for money that runs out than for anything that lasts.",
      "Make to yourselves friends of the mammon of unrighteousness, so that when it fails, you are received into everlasting habitations. If you have not been faithful in what belongs to someone else, who will give you what is truly your own? No servant can serve two masters. Ye cannot serve God and mammon.",
    ]),
    g(16, 14, 31, [
      "The Pharisees, who love money, hear all this and sneer at him. Jesus does not back down. Ye are they which justify yourselves before men, but God knoweth your hearts. That which is highly esteemed among men is abomination in the sight of God.",
      "He adds one hard line about marriage, that not one tittle of the law will fail, and then tells the story the Pharisees needed most. A rich man dresses in purple and fine linen and feasts every day. At his gate lies a beggar named Lazarus, covered in sores, longing for the crumbs that fall from that table, with dogs licking his wounds.",
      "Both men die. The beggar is carried by angels to Abraham's side. The rich man is buried, and lifts up his eyes in torment, and sees Lazarus far off, comforted. Father Abraham, he begs, send Lazarus to dip his finger in water and cool my tongue.",
      "Abraham reminds him he already received his good things, and that there is a great gulf fixed which no one can cross either way. The rich man asks him to warn his five brothers. Abraham answers, they have Moses and the prophets. If they will not hear them, neither will they be persuaded, though one rose from the dead.",
    ]),
    g(17, 1, 19, [
      "Jesus warns that offenses will come, but woe to the one who causes them. It were better that a millstone were hanged about his neck, and he cast into the sea, than that he should offend one of these little ones. If thy brother trespass against thee, rebuke him, and if he repent, forgive him, even seven times in a day.",
      "The apostles ask him, Lord, increase our faith. He does not hand them more faith like a quantity. If ye had faith as a grain of mustard seed, he says, you could tell this sycamine tree to be plucked up and planted in the sea, and it would obey you. It was never about the size of the faith.",
      "Then a small, uncomfortable parable. A servant comes in from plowing the field. Does he get to sit down and eat first? No, he makes his master's supper, serves him, and eats afterward. Even doing everything he was told, he says, we are unprofitable servants, we have only done that which was our duty.",
      "Ten lepers cry out to him for mercy, and he sends them to show themselves to the priests, and as they go they are cleansed. Only one comes back, a Samaritan, falling at Jesus's feet, giving thanks. Were there not ten cleansed, Jesus asks, where are the nine? To the one who returned: arise, go thy way, thy faith hath made thee whole.",
    ]),
    g(17, 20, 37, [
      "Pharisees ask him when the kingdom of God will come. Jesus tells them it does not come with outward signs you can watch for. The kingdom of God is within you, already among you, and you missed it looking for something more dramatic.",
      "He warns the disciples of days coming they will long to see and will not. It will be like the days of Noah, people eating, drinking, marrying, right up until the flood came and destroyed them all. Like the days of Lot, people eating and buying and building, right up until fire and brimstone rained down from heaven.",
      "Remember Lot's wife, he says. Whosoever shall seek to save his life shall lose it, and whosoever shall lose his life shall preserve it. In that night there will be two in one bed, one taken and the other left. Two grinding together, one taken and the other left.",
      "Where, Lord? they ask. He answers with a saying instead of a location. Wheresoever the body is, thither will the eagles be gathered together. Some things do not come with a map. You just stay ready.",
    ]),
    g(18, 1, 14, [
      "Jesus tells a parable so the disciples would always pray and not give up. A judge in a certain city fears neither God nor man. A widow keeps coming to him saying, avenge me of mine adversary. He refuses for a while, then thinks, though I fear not God nor regard man, yet because this widow troubles me, I will avenge her, lest by her continual coming she weary me.",
      "If even a corrupt judge gives in to persistence, shall not God avenge his own elect, which cry day and night unto him? He tells them God will avenge them speedily, then asks a harder question back. When the Son of man cometh, shall he find faith on the earth?",
      "Two men go up to the temple to pray. The Pharisee stands and prays with himself, thanking God he is not like other men, extortioners, unjust, adulterers, or even like this publican standing nearby. I fast twice in the week, I give tithes of all that I possess.",
      "The publican, standing afar off, will not so much as lift up his eyes unto heaven, but smites his breast, saying, God be merciful to me a sinner. I tell you, Jesus says, this man went down to his house justified rather than the other, for every one that exalteth himself shall be abased, and he that humbleth himself shall be exalted.",
    ]),
    g(18, 15, 30, [
      "People bring infants to Jesus just to have him touch them, and the disciples try to send them away. Jesus calls the children to him instead. Suffer little children to come unto me, and forbid them not, for of such is the kingdom of God. Whosoever shall not receive the kingdom of God as a little child shall in no wise enter therein.",
      "A ruler asks him what he must do to inherit eternal life. Jesus lists the commandments, and the man says he has kept every one of them since he was young. Jesus tells him one thing is still missing. Sell all that thou hast, distribute unto the poor, and thou shalt have treasure in heaven, then come, follow me.",
      "The man goes away very sorrowful, for he was very rich. Jesus watches him go and says how hardly shall they that have riches enter into the kingdom of God. It is easier for a camel to go through a needle's eye. The people ask, who then can be saved? The things which are impossible with men are possible with God.",
      "Peter points out, we have left all and followed thee. Jesus tells him no man who has left house, or parents, or brethren, or wife, or children, for the kingdom of God's sake, will fail to receive manifold more in this present time, and in the world to come life everlasting.",
    ]),
    g(18, 31, 43, [
      "Jesus takes the twelve aside and tells them plainly what is coming. He will be delivered unto the Gentiles, mocked, spitefully treated, spit upon, scourged, and put to death, and the third day he will rise again. They understand none of these things. It is hid from them, and they are afraid to even ask him what he means.",
      "Near Jericho, a blind man sitting by the road begging hears the crowd passing and asks what it means. He is told Jesus of Nazareth passeth by. He cries out, Jesus, thou son of David, have mercy on me. The people in front tell him to be quiet. He cries so much the more.",
      "Jesus stops, has him brought over, and asks him plainly, what wilt thou that I shall do unto thee? Lord, he says, that I may receive my sight. Jesus tells him, receive thy sight, thy faith hath saved thee.",
      "Immediately he can see, and he follows Jesus, glorifying God, and all the people who see it give praise to God too. A ruler who owned everything walked away sad. A beggar who owned nothing got his sight and followed singing. That is the whole shape of this reading.",
    ]),
  ],
  closing: [
    ["So that is Day 299.", 700],
    ["A steward who cheated his master and still got praised, not for the cheating, for finally taking his future seriously.", 800],
    ["A rich man who had everything, and still ended up begging, on the wrong side of a gulf nobody can cross after death.", 800],
    ["Nine healed lepers who never came back, and one who did.", 750],
    ["A widow who got justice by refusing to quit, and a tax collector who got mercy by refusing to look up.", 800],
    ["A ruler who kept every commandment and still could not let go of what he owned.", 800],
    ["And a blind beggar who asked for exactly what he wanted, and got it.", 800],
    ["Tomorrow, Luke 19 through 21. Zacchaeus climbs a tree just to see him, and Jesus rides into Jerusalem for the last time.", 850],
    ["For now, sit with the tax collector's prayer.", 750],
    ["God be merciful to me, a sinner.", 1200],
  ],
};
