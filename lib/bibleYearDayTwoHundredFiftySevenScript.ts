import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 257, written to the Day 1 standard.
 *
 * Hosea 1-3: the first book after Daniel, and the pivot into the Minor
 * Prophets. God tells a prophet to marry a woman who will not stay
 * faithful, names her children after the nation's coming judgment, and
 * then buys her back after she leaves. Five blocks: two for chapter 1,
 * two for chapter 2, one for chapter 3.
 */

const hos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Hosea ${chapter}:${startVerse}-${endVerse}`,
  book: "hosea",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 257,
  title: "Love for the Unfaithful",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 257. We just closed the book of Daniel. Today we open Hosea, and the ground shifts completely.", 800],
    ["No kings' courts. No lions' dens. Just a prophet, a marriage, and an order from God he cannot possibly want to obey.", 800],
    ["Go, take unto thee a wife of whoredoms. That is the actual first instruction God gives him.", 850],
    ["Hosea's whole life is about to become a sermon he lives instead of preaches.", 800],
    ["We are in Hosea 1 through 3.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    hos(1, 1, 7, [
      "Go, take unto thee a wife of whoredoms and children of whoredoms: for the land hath committed great whoredom, departing from the LORD. God does not ask Hosea to preach about Israel's unfaithfulness. He asks him to marry into it.",
      "So he went and took Gomer the daughter of Diblaim; which conceived, and bare him a son. No argument recorded. No negotiation. Hosea just goes and does it.",
      "Call his name Jezreel; for yet a little while, and I will avenge the blood of Jezreel upon the house of Jehu. A newborn's name is now a countdown to a coming judgment. Every time someone says the boy's name, they are saying a sentence over the kingdom.",
      "And she conceived again, and bare a daughter... Call her name Lo-ruhamah: for I will no more have mercy upon the house of Israel. Lo-ruhamah means no mercy. A father has to call his own daughter that, every single day.",
    ]),
    hos(1, 8, 11, [
      "Then said God, Call his name Lo-ammi: for ye are not my people, and I will not be your God. Three children. Three names. Judgment, no mercy, not my people. The family itself has become the message.",
      "Yet the number of the children of Israel shall be as the sand of the sea... in the place where it was said unto them, Ye are not my people, there it shall be said unto them, Ye are the sons of the living God. In the very next breath, the worst name in the family gets reversed completely.",
      "Then shall the children of Judah and the children of Israel be gathered together, and appoint themselves one head... for great shall be the day of Jezreel. Even Jezreel, the name that opened this chapter as a threat, ends it as something great.",
      "Notice the order here. The judgment is named first, and named through real children with real futures. The mercy comes after, but it comes. Nothing about this book skips the hard part to get to the comfort.",
    ]),
    hos(2, 1, 13, [
      "Plead with your mother, plead: for she is not my wife, neither am I her husband... I will go after my lovers, that give me my bread and my water. This is Israel's own excuse, quoted back word for word. She credits her provision to anyone but the one actually giving it.",
      "I will hedge up thy way with thorns, and make a wall, that she shall not find her paths. This is not abandonment. It is God making the wrong road harder to walk, on purpose, so she has a reason to turn around.",
      "For she did not know that I gave her corn, and wine, and oil, and multiplied her silver and gold, which they prepared for Baal. The bitterest line in the chapter. She took what God gave her and used it to worship someone else.",
      "I will also cause all her mirth to cease, her feast days, her new moons, and her sabbaths... and she went after her lovers, and forgat me, saith the LORD. Every celebration gets stripped away, because every one of them had quietly become about Baal instead of about God.",
    ]),
    hos(2, 14, 23, [
      "Therefore, behold, I will allure her, and bring her into the wilderness, and speak comfortably unto her. After verses of hedges and stripped-away feasts, this is the turn nobody sees coming. The wilderness is not only punishment. It is where He gets her alone to talk.",
      "And I will give her her vineyards from thence, and the valley of Achor for a door of hope. Achor means trouble. It is the valley where Israel's sin was buried generations earlier. God takes the very place named for disaster and turns it into a doorway.",
      "Thou shalt call me Ishi; and shalt call me no more Baali... for I will take away the names of Baalim out of her mouth. Ishi means my husband. Baali also means my husband, but it shares a root with Baal. God will not share the word, let alone the worship.",
      "I will betroth thee unto me for ever... in righteousness, and in judgment, and in lovingkindness, and in mercies. I will even betroth thee unto me in faithfulness: and thou shalt know the LORD. Four qualities, stacked one on another, for a bride who has already been unfaithful once. This is a proposal made after the worst has already happened.",
    ]),
    hos(3, 1, 5, [
      "Then said the LORD unto me, Go yet, love a woman beloved of her friend, yet an adulteress, according to the love of the LORD toward the children of Israel. Hosea is told to go again. This is not a new woman. Most readers understand this as Gomer, found again after she has left.",
      "So I bought her to me for fifteen pieces of silver, and for an homer of barley, and an half homer of barley. Half the price of a slave, paid in cash and grain, for the woman who was legally his wife already. Buying back what already belonged to him.",
      "Thou shalt abide for me many days; thou shalt not play the harlot... so will I also be for thee. Hosea commits to her before she has proven anything. The waiting period is the relationship, not a condition before it starts.",
      "Afterward shall the children of Israel return, and seek the LORD their God, and David their king; and shall fear the LORD and his goodness in the latter days. The marriage was never only about Hosea and Gomer. It was Israel's whole future, acted out in one house, for anyone willing to watch.",
    ]),
  ],
  closing: [
    ["So that is Day 257.", 700],
    ["Three children with names nobody would choose. Judgment. No mercy. Not my people.", 750],
    ["And a God who reverses every single one of those names before the book is even finished making its point.", 800],
    ["Hosea did not preach a sermon about a broken marriage. He lived inside one, so Israel could see its own story from the outside for once.", 850],
    ["A hedge of thorns was never cruelty for its own sake. It was a wall built around the wrong road.", 800],
    ["And fifteen pieces of silver bought back a wife who was already his, because love here does not wait for someone to deserve it first.", 850],
    ["Tomorrow, Hosea 4 through 6. The accusation gets specific, and one line lands that Jesus himself will later quote twice.", 850],
    ["For now, sit with the valley of trouble.", 800],
    ["God turned it into a door of hope.", 750],
    ["That is what he does with the worst place in your story too.", 1200],
  ],
};
