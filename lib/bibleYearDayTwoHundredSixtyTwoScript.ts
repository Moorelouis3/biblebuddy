import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 262, written to the Day 1 standard.
 *
 * Joel closes with a full turn - locusts to restoration to the Spirit poured
 * out on everyone - and then Amos opens with a farmer from Tekoa naming five
 * nations for their war crimes before he ever mentions Israel. Six blocks,
 * two per chapter across Joel 2, Joel 3, and Amos 1.
 */

const joel = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Joel ${chapter}:${startVerse}-${endVerse}`,
  book: "joel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

const amos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Amos ${chapter}:${startVerse}-${endVerse}`,
  book: "amos",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 262,
  title: "The Day of the Lord Begins",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 262. Yesterday ended with locusts stripping a country bare.", 750],
    ["Today Joel tells you what that swarm actually was. A warning, not the disaster itself.", 800],
    ["Then he turns all the way around, promises restoration, and promises something no one saw coming. The Spirit, poured out on everyone.", 850],
    ["And right after that, a new voice. A farmer, not a professional prophet, naming nation after nation for what they did in war.", 800],
    ["We are in Joel 2 and 3, and the opening of Amos.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    joel(2, 1, 17, [
      "Blow ye the trumpet in Zion, and sound an alarm. Joel reaches back to the locust plague and tells you it was a preview. A day of darkness and of gloominess is coming, and it is bigger than any swarm of insects.",
      "The army he describes climbs walls, runs like mighty men, and never breaks ranks. Nature itself becomes a war machine, disciplined and unstoppable, and Joel says even the sun and moon go dark in front of it.",
      "Then, right in the middle of that terror, one line changes everything. Turn ye even to me with all your heart, and with fasting, and with weeping, and with mourning. God is not just announcing judgment. He is leaving a door open in it.",
      "Rend your heart, and not your garments. In that culture, tearing your clothes was the normal show of grief. Joel says the show means nothing. He wants the actual heart, not the costume of one.",
    ]),
    joel(2, 18, 32, [
      "Then the LORD will answer and say unto his people, Behold, I will send you corn, and wine, and oil. The exact things the locusts ate get promised right back, named one by one.",
      "I will restore to you the years that the locust hath eaten. Not just the next harvest. God says he will give back the years themselves, the ones that felt wasted.",
      "And it shall come to pass afterward, that I will pour out my spirit upon all flesh. Sons and daughters, old men, young men, even servants and slave women. Every line before this named who God's Spirit came to specially. This one names everybody.",
      "Whosoever shall call on the name of the LORD shall be delivered. Peter stands up in Acts chapter two and quotes this exact promise, and says it just happened, in that room, in front of everyone.",
    ]),
    joel(3, 1, 13, [
      "I will gather all nations, and will bring them down into the valley of Jehoshaphat, and will plead with them there for my people. The nations who scattered Israel and sold her children for wine now stand accountable for it, by name.",
      "They have given a boy for an harlot, and sold a girl for wine, that they might drink. Joel does not summarize the cruelty. He names the exact trade, children for a night's drinking, so nobody can soften what happened.",
      "Beat your plowshares into swords, and your pruninghooks into spears. Isaiah and Micah picture the opposite of this verse, weapons turned into farm tools, as the sign of peace finally arriving. Joel reverses it on purpose. This is a call to war, aimed at the nations about to be judged.",
      "Put ye in the sickle, for the harvest is ripe. Come, get you down; for the press is full, the fats overflow; for their wickedness is great. Harvest and wine press, usually pictures of a good year, become pictures of judgment stacked up and finally ready.",
    ]),
    joel(3, 14, 21, [
      "Multitudes, multitudes in the valley of decision: for the day of the LORD is near in the valley of decision. Joel repeats the word on purpose. Every nation standing there has already decided, by what it did, which side it is on.",
      "The LORD also shall roar out of Zion, and utter his voice from Jerusalem. But the LORD will be the hope of his people. The same voice that terrifies the nations is shelter for the ones who belong to him. It depends entirely on where you are standing.",
      "A fountain shall come forth of the house of the LORD, and shall water the valley of Shittim. Shittim was where Israel fell into idolatry with Moab, back in Numbers 25. Joel names that exact place and says one day it will be watered by God's own house instead.",
      "Judah shall dwell for ever, and Jerusalem from generation to generation. Joel started with a locust swarm eating everything down to bare wood. He ends with a promise that outlasts every empire that will ever threaten this land.",
    ]),
    amos(1, 1, 8, [
      "The words of Amos, who was among the herdmen of Tekoa. No priestly family, no prophetic school. A shepherd from a small town, sent to confront kings.",
      "The LORD will roar from Zion, and utter his voice from Jerusalem. Amos opens with the same picture Joel just closed with. These two books were placed side by side on purpose.",
      "For three transgressions of Damascus, and for four, I will not turn away the punishment thereof; because they have threshed Gilead with threshing instruments of iron. That number pattern, three and then a fourth, means the cup is already full and this last one broke it. Amos will repeat it nation after nation.",
      "Then Gaza. For three transgressions of Gaza, and for four... because they carried away captive the whole captivity, to deliver them up to Edom. Selling entire populations into slavery. God is naming a specific crime, not a general grudge.",
    ]),
    amos(1, 9, 15, [
      "Tyrus is charged with delivering up the whole captivity to Edom, and remembered not the brotherly covenant. Tyre had a treaty with Israel going back to Solomon. Amos says breaking that covenant is its own crime, on top of the slave trade itself.",
      "Edom is next, because he did pursue his brother with the sword, and did cast off all pity, and his anger did tear perpetually. Edom is Esau's own descendants, Israel's actual blood relatives. This is family violence with no cooling-off point, ever.",
      "Then Ammon, because they have ripped up the women with child of Gilead, that they might enlarge their border. Land grabbed through the worst possible act, done to pregnant women, just to move a border line a little further.",
      "Notice what none of these five nations has in common with Israel. None of them had the law, the covenant, or the prophets. God still holds every one of them to a real standard of basic human decency. Tomorrow, Amos keeps counting, and the list does not stop with foreigners.",
    ]),
  ],
  closing: [
    ["So that is Day 262.", 700],
    ["Locusts, then restoration, then a promise nobody was expecting.", 700],
    ["I will pour out my spirit upon all flesh. Not on a priest class. On sons, daughters, old men, young men, even the servants.", 800],
    ["Whosoever shall call on the name of the LORD shall be delivered. Peter stood up and quoted that verse the day it happened.", 800],
    ["Then Amos walks in, a farmer with no title, and starts naming nations for exactly what they did.", 800],
    ["Threshing Gilead with iron. Selling children for wine. Chasing a brother with a sword and never once letting the anger cool.", 800],
    ["Tomorrow, Amos 2 through 4. The list of nations keeps going, and then it turns, and lands on Israel itself.", 850],
    ["For now, hold the number pattern.", 750],
    ["Three transgressions, and for four.", 750],
    ["The cup was already full before the last drop fell.", 1200],
  ],
};
