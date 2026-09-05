import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 114, written to the Day 1 standard.
 *
 * Nehemiah 6-9 finishes the wall, survives two more attempts to trap or
 * scare Nehemiah into a mistake, re-establishes the community by an old
 * genealogy record, and then turns to something bigger than construction:
 * the Law read aloud, understood, wept over, celebrated, and confessed.
 * Seven blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Nehemiah ${chapter}:${startVerse}-${endVerse}`,
  book: "nehemiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FOURTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 114,
  title: "Completion, Scripture, and Confession",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 114. The wall gets finished today, but not before someone tries to lure Nehemiah into a trap disguised as a friendly meeting.", 750],
    ["Then a hired prophet tells him to hide in the temple to save his life. That is a trick too.", 800],
    ["Once the wall stands, Nehemiah does something you might not expect. He counts everyone, family by family, before he celebrates anything.", 800],
    ["And then, for the first time in this whole book, nobody has to be summoned. The people ask for the Law themselves, and when they hear it, they weep.", 800],
    ["By the end of today they have gone from grief in the street, to a feast nobody has kept properly in generations, to one long prayer confessing everything.", 800],
    ["We are in Nehemiah 6 through 9.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(6, 1, 9, [
      "The wall stands. Every gap is closed, only the doors are not hung yet, and that is exactly when Sanballat and Geshem invite Nehemiah to a friendly meeting on neutral ground in the plain of Ono.",
      "Verse two says plainly what it actually was. They thought to do me mischief. Nehemiah does not go, and does not pretend to consider it. I am doing a great work, so that I cannot come down. They ask four times. He gives the same answer four times.",
      "When that fails, Sanballat sends an open letter — deliberately unsealed, so every courier who carries it reads the accusation too. You are building this wall to rebel and crown yourself king, and you have hired prophets to announce it.",
      "None of it is true, and Nehemiah says so in one line. There are no such things done as thou sayest, but thou feignest them out of thine own heart. Then he stops arguing and prays instead. Now therefore, O God, strengthen my hands.",
    ]),
    g(6, 10, 19, [
      "Next comes Shemaiah, a man shut up in his house, who tells Nehemiah to hide inside the temple because assassins are coming for him that very night.",
      "It would have looked wise. It was actually a trap. Nehemiah was not a priest, and running into the sanctuary to save his life would have broken the law and handed his enemies exactly the scandal they wanted. Should such a man as I flee? He refuses.",
      "Verse twelve tells you what tipped him off. He perceived that God had not sent him, because Tobiah and Sanballat had hired him. Fear dressed up as prophecy is still just fear.",
      "The wall is finished in fifty-two days, and even the surrounding nations are cast down in their own eyes, because they perceived this work was wrought of our God. But Tobiah still has in-laws among Judah's own nobles, sending letters back and forth to keep frightening Nehemiah even after the work is done.",
    ]),
    g(7, 1, 73, [
      "This chapter is another long list, and if the names look familiar, that is because they are. It is nearly the exact same roll call of returned exiles you already heard in Ezra chapter two, recorded here a second time.",
      "That repetition is the point. Before Nehemiah does anything else with a finished wall, he wants the community itself accounted for, family by family, checked against the same old record.",
      "A few families cannot find their names in that register at all, so they are set aside from the priesthood until a priest could consult the Urim and Thummim. Belonging here was never casual, and neither was serving as a priest, even for people who assumed they qualified.",
      "The chapter ends with people giving freely, out of their own resources, into the treasury of the work — gold, silver, priests' garments. A finished wall still needed people willing to keep funding what happened inside it.",
    ]),
    g(8, 1, 12, [
      "For the first time in this whole book, nobody has to be summoned. All the people gathered themselves together as one man and asked Ezra to bring out the Book of the Law. They wanted to hear it before anyone told them to.",
      "Ezra reads from early morning until midday, standing on a wooden platform built just for this, and the ears of all the people were attentive unto the book of the law. Levites move through the crowd giving the sense, and cause them to understand the reading, because hearing words is not the same as understanding them.",
      "When they finally understand what the law actually says, they weep, right there in the street. Not performance. Real grief at how far they had drifted from it.",
      "And Nehemiah stops them. This day is holy unto the Lord your God. Mourn not, nor weep. Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared, for the joy of the Lord is your strength. Conviction was the right first response. It was never meant to be the last one.",
    ]),
    g(8, 13, 18, [
      "The next day, the family leaders come back to study further, and find a command in the law they had apparently stopped keeping generations ago — to live in booths made of branches during the seventh month's feast.",
      "So they go gather branches, olive, pine, myrtle, palm, and build booths everywhere — rooftops, courtyards, even the temple courts and the city squares.",
      "Since the days of Jeshua the son of Nun unto that day had not the children of Israel done so. And there was very great gladness. Obedience they had never even attempted turns into the happiest scene in the whole book.",
      "For seven straight days Ezra keeps reading the law out loud, and on the eighth day they hold one more solemn assembly, according unto the manner, exactly as it is written. They did not just rediscover the command. They kept doing it until it was finished right.",
    ]),
    g(9, 1, 15, [
      "Three weeks after that celebration, the same people gather again, but this time it is fasting, sackcloth, and earth on their heads. They spend a full fourth of the day just listening to the law read, and another fourth confessing.",
      "Then the Levites lead a prayer that starts nowhere near Israel's own sin. It starts with who God is. Thou, even thou, art Lord alone. Thou hast made heaven... and thou preservest them all.",
      "It walks through the whole story in order — choosing Abraham, hearing Israel cry out in Egypt, splitting the sea, the pillar of cloud and fire, Sinai, and God feeding a whole nation with bread and water it never had to provide.",
      "Every line so far is thanksgiving. No confession yet. Before this prayer says one word about what Israel did wrong, it spends verse after verse just remembering what God did right.",
    ]),
    g(9, 16, 38, [
      "Then comes the turn. But they and our fathers dealt proudly, and hardened their necks. The golden calf, right in the middle of the God who had just parted a sea for them.",
      "And the pattern repeats, verse after verse. They rebel, God hands them over to enemies, they cry out, God sends deliverance, they get comfortable, they rebel again. The prayer names the whole cycle instead of hiding it.",
      "Then it lands on the plainest confession in the book. Thou art just in all that is brought upon us, for thou hast done right, but we have done wickedly. No blaming the exile on bad luck or foreign kings. They call it exactly what it was.",
      "And the response is not just words. Because of all this we make a sure covenant, and write it, and our princes, Levites, and priests, seal unto it. A prayer that names centuries of failure ends in a signed, sealed commitment to do better.",
    ]),
  ],
  closing: [
    ["So that is Day 114.", 700],
    ["Sanballat tries a fake meeting, then a fake prophet, and Nehemiah refuses both traps without ever raising his voice.", 750],
    ["The wall goes up in fifty-two days, fast enough that even Israel's enemies admit this was God's doing, not just good masonry.", 800],
    ["Then, before any celebration, Nehemiah counts the people, family by family, against an old record most of them had probably forgotten existed.", 800],
    ["And the people themselves ask for the Law to be read. When they finally understand it, they weep in the street, until Nehemiah tells them grief was never meant to be the last word. Go eat. Send food to whoever has none. The joy of the Lord is your strength.", 850],
    ["They keep a feast nobody had kept properly since Joshua, and it turns into the happiest scene in the whole book.", 800],
    ["Then they fast, and pray one long prayer that spends verse after verse thanking God before it confesses a single sin, and ends by putting their repentance in writing and sealing it.", 850],
    ["Tomorrow, Nehemiah 10 through 13. That sealed promise gets tested almost immediately.", 850],
    ["For now, hold on to one line from today.", 750],
    ["The joy of the Lord is your strength.", 1200],
  ],
};
