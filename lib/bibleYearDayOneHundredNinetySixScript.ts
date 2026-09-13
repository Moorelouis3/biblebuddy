import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 196, written to the Day 1 standard.
 *
 * Isaiah 1-3 opens the book with a lawsuit: God puts Judah on trial for
 * empty religion and corrupt leadership, offers a way back in the middle
 * of the indictment, then shows where the whole story is headed before
 * turning back to describe exactly how far Jerusalem has fallen. Seven
 * blocks, splitting chapter 3 in two to keep the pacing even.
 */

const isa = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 196,
  title: "Rebellion, Judgment, and Hope",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 196.", 650],
    ["We're leaving the love poetry of Song of Solomon behind. Today the whole tone changes.", 800],
    ["Isaiah opens with God filing a lawsuit against his own people.", 800],
    ["Empty religion. Corrupt leaders. A city that used to be faithful and isn't anymore.", 800],
    ["But buried in the middle of the indictment is one of the most famous promises in the whole book.", 850],
    ["We are in Isaiah 1, 2, and 3.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    isa(1, 1, 9, [
      "Isaiah opens with a court case, not a sermon. Hear, O heavens, and give ear, O earth — he's not calling the nation to the stand. He's calling the whole universe to watch.",
      "God's first line is personal, not political. I have nourished and brought up children, and they have rebelled against me. This is a parent talking, not a king reading out a decree.",
      "Then the line that should sting: the ox knoweth his owner... but Israel doth not know. An animal has more sense of who feeds it than God's own people do.",
      "By verse 9, the damage report: if the Lord had not left a remnant, they would be as gone as Sodom and Gomorrah. Judgment isn't hypothetical here. It's already partly happened, and grace is the only reason anyone is left standing.",
    ]),
    isa(1, 10, 20, [
      "God calls Judah rulers of Sodom and people of Gomorrah while they're still doing all the right religious things. The sacrifices never stopped. The heart behind them did.",
      "I am full of the burnt offerings of rams... I delight not in the blood of bullocks. It isn't that God hates sacrifice. He hates sacrifice used as a substitute for obedience.",
      "Wash you, make you clean... relieve the oppressed, judge the fatherless, plead for the widow. The fix was never more religion. It was justice for people who had no one else to speak for them.",
      "Then the offer that turns the whole chapter around: though your sins be as scarlet, they shall be as white as snow. Not earned with better sacrifices. Just given, if they're willing.",
    ]),
    isa(1, 21, 31, [
      "How is the faithful city become an harlot! Isaiah isn't describing some pagan city. He's describing Jerusalem, and grieving what she used to be.",
      "The corruption starts at the top. Thy princes are rebellious, and companions of thieves: every one loveth gifts... they judge not the fatherless. Leaders who should protect the weak are profiting off them instead.",
      "But the judgment God promises isn't only destruction. I will turn my hand upon thee, and purely purge away thy dross. That's a refiner's fire, not a wrecking ball. The point is to get the silver back, not just to burn the whole thing down.",
      "The chapter ends on the idols they trusted instead — the oaks and gardens they'll be ashamed of, fading like a leaf, going out like a spark no one can put out once it starts.",
    ]),
    isa(2, 1, 5, [
      "After three straight sections of indictment, Isaiah suddenly shows you where all of this ends up. In the last days, the mountain of the Lord's house will be the highest place there is, and every nation will come to it.",
      "They shall beat their swords into plowshares, and their spears into pruninghooks. Not because they lost a war. Because they finally learned it isn't the way anymore.",
      "Nation shall not lift up sword against nation, neither shall they learn war any more. That's the actual end of the story Isaiah is telling. Not judgment forever. Peace, finally, on purpose.",
      "Then he turns straight back to right now. O house of Jacob, come ye, and let us walk in the light of the LORD. The future doesn't excuse the present. It's the reason to start walking differently today.",
    ]),
    isa(2, 6, 22, [
      "Isaiah lists what Judah actually trusts: silver, gold, horses, chariots, idols they built with their own hands. A full inventory of everything standing in for God.",
      "The day of the LORD of hosts shall be upon every one that is proud and lofty. He names cedars, mountains, towers, ships — anything built to look permanent and unshakeable. All of it is getting humbled.",
      "Picture the moment: men throwing their gold and silver idols to the moles and the bats, running to hide in caves from the God they used to ignore. The things they trusted become the things they're ashamed of.",
      "Cease ye from man, whose breath is in his nostrils: for wherein is he to be accounted of? A blunt closing line. Stop building your life around something that has to keep breathing just to stay alive.",
    ]),
    isa(3, 1, 15, [
      "God is pulling away the stay and the staff — leaders, food, water, everything a functioning society leans on. When that support is gone, the cracks show fast.",
      "Children shall be their princes, and babes shall rule over them. Not literal toddlers on the throne. A nation left with no one mature enough to lead it well.",
      "It gets so desperate that a man grabs his own brother and begs him to be ruler just because he still owns a coat, and the brother refuses: in my house is neither bread nor clothing, make me not a ruler. Nobody wants the job when there's nothing left to lead.",
      "The chapter draws a hard line for two kinds of people. It shall be well with the righteous. Woe unto the wicked. Then it names the wicked specifically: leaders who have eaten up the vineyard, the spoil of the poor is in your houses. They got rich exactly the way you'd expect.",
    ]),
    isa(3, 16, 26, [
      "Isaiah zooms in on the daughters of Zion — haughty, walking with stretched-out necks, making a tinkling sound with their feet on purpose to be noticed. A picture of a whole culture obsessed with being looked at.",
      "Then comes one of the strangest lists in the Bible: chains, bracelets, mufflers, earrings, mantles, crisping pins, glasses, hoods. Verse after verse of exactly what gets stripped away.",
      "Instead of sweet smell there shall be stink; and instead of a girdle a rent; and instead of well set hair baldness. Everything they dressed up to hide, judgment brings back out into the open.",
      "The chapter ends with the men fallen by the sword, and the city herself pictured as a woman sitting on the ground, mourning at her own gates. That's the image Isaiah leaves you with as chapter 3 closes.",
    ]),
  ],
  closing: [
    ["So that is Day 196.", 700],
    ["Isaiah opens by putting Judah on trial, and the evidence is a whole nation that knows how to worship and forgot how to obey.", 800],
    ["God said He delights not in their sacrifices. Not because sacrifice is wrong, but because it was covering for injustice, not replacing it.", 800],
    ["And in the middle of all that judgment, He still says: though your sins be as scarlet, they shall be as white as snow.", 850],
    ["Then Isaiah shows you where the whole story is headed. Swords into plowshares. Nations that finally stop learning war.", 800],
    ["And then back to right now. Chapter 3 shows exactly what happens when a nation trusts everything except God — leaders who eat the vineyard, and a people stripped of everything they used to hide behind.", 850],
    ["Tomorrow, Isaiah 4 through 6. Isaiah gets his own call, standing in front of God's throne.", 850],
    ["For now, carry the line that started this whole book toward hope.", 800],
    ["Though your sins be as scarlet.", 750],
    ["They shall be as white as snow.", 1200],
  ],
};
