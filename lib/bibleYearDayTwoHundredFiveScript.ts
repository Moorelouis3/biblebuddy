import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 205, written to the Day 1 standard.
 *
 * Isaiah 28-30 is one long pattern repeated three times: God offers real
 * rest, and three different groups turn it down for a false security of
 * their own making. Seven blocks for a heavier, three-chapter reading.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 205,
  title: "False Security and True Rest",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 205.", 700],
    ["Three chapters, three different groups, and the same mistake running under all of them.", 800],
    ["Ephraim's leaders trade God's rest for wine. Jerusalem's rulers trade it for a covenant with death. Judah trades it for Egypt's army instead of God's word.", 850],
    ["Every single time, God offers real rest first. Every single time, it gets turned down.", 850],
    ["We are in Isaiah 28, 29, and 30.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(28, 1, 13, [
      "Isaiah opens with woe to the crown of pride, the drunkard leaders of Ephraim's capital. Their glory is called a fading flower, gone as fast as ripe fruit eaten the moment it is picked.",
      "Verse seven makes it worse. It is not only the leaders. The priest and the prophet have erred through strong drink too. The exact people meant to see clearly for everyone else are the ones stumbling.",
      "Verse twelve is the center of the whole passage. God had already offered this. This is the rest, this is the refreshing. Yet they would not hear. Not a missed opportunity. A refusal.",
      "So the same message that could have been rest becomes, in verse thirteen, the thing that trips them. Precept upon precept, line upon line, until it makes them fall backward and break. The same word lands differently depending on whether it is received or resisted.",
    ]),
    g(28, 14, 22, [
      "The rulers in Jerusalem have made what they call a covenant with death, an agreement with hell. They actually believe their own political maneuvering will keep disaster away from them.",
      "God's answer is one of the most quoted lines in all the prophets. I lay in Zion a tried stone, a precious corner stone, a sure foundation. He that believeth shall not make haste. A real foundation, offered in place of a false one built on lies.",
      "Verse seventeen: judgment laid to the line, righteousness to the plummet, and hail will sweep away the very refuge of lies they were counting on.",
      "Verse twenty gives the picture that sums up every false security. A bed too short to stretch out on. A blanket too narrow to wrap in. Whatever you build to protect yourself instead of trusting God, it will not actually cover you.",
    ]),
    g(28, 23, 29, [
      "Isaiah shifts to something almost gentle. A farmer plowing, planting, and threshing. Nobody plows forever. Nobody threshes wheat the same rough way he threshes cumin.",
      "Verse twenty-six says his God instructs him to discretion, and teaches him. Even ordinary farm wisdom gets credited to God, quietly teaching a man how to do his work well.",
      "That is the point of the whole picture. God's judgment, like a good farmer's methods, is fitted to what it is actually dealing with. Never harsher than it needs to be. Never careless either.",
      "Verse twenty-nine closes it. This too comes from the Lord of hosts, wonderful in counsel, excellent in working. Even the discipline running through this book has real intelligence behind it, not just anger.",
    ]),
    g(29, 1, 12, [
      "Jerusalem gets called Ariel here, and God says he himself will bring distress to the very city where David once lived, laying siege against it as if he were the enemy.",
      "Verses seven and eight compare the attacking nations to a dream. A hungry man dreams he is eating and wakes up still empty. All that military threat is going to evaporate exactly like that.",
      "But then the vision turns inward, onto the people themselves. They are the ones who cannot see. The prophecy has become like a sealed book, handed to the learned man who cannot open it, and the unlearned man who was never taught to read it anyway.",
      "God himself has poured out a spirit of deep sleep over them, closing their own eyes. The blindness in this chapter is not only an enemy problem. It runs both ways.",
    ]),
    g(29, 13, 24, [
      "God names the real problem in verse thirteen. This people honor me with their lips, but their heart is far from me. Their fear of God was taught to them by other people's rules, not something they ever came to on their own.",
      "Verse sixteen pictures them like clay arguing with the potter. As if the thing made could tell its maker it was never made, or that its maker does not understand it.",
      "Then in a few short verses everything flips. The deaf hear the words of the book. The blind see out of darkness. The meek increase their joy. The poor rejoice in the Holy One of Israel.",
      "The chapter ends with Jacob no longer ashamed, once he actually sees what God's hands have done among his own children. Even the ones who erred in spirit and murmured come to understanding. Nobody on this list gets written off as unreachable.",
    ]),
    g(30, 1, 17, [
      "The rebellious children add sin to sin by going down to Egypt for help without ever asking God first. Verse two says it plainly. They trust the shadow of Egypt instead of consulting the Lord's mouth.",
      "Verse seven calls that help worthless in the sharpest way it can be said. Their strength is to sit still. Egypt cannot even act on their behalf once they arrive there.",
      "Verse fifteen is the center of the whole chapter, and it names exactly what this day is about. In returning and rest shall ye be saved, in quietness and in confidence shall be your strength. And ye would not.",
      "Instead they choose speed and force. We will flee upon horses, we will ride upon the swift. And they get exactly what they asked for, in the worst possible way. Fleeing at the rebuke of one man.",
    ]),
    g(30, 18, 33, [
      "Right after describing their stubborn refusal, verse eighteen turns tender without warning. Therefore will the Lord wait, that he may be gracious unto you. God's waiting here is not distance. It is patience aimed straight at mercy.",
      "Verse twenty promises something concrete. Even in the bread of adversity and the water of affliction, your teachers will no longer be removed into a corner. You will hear a voice behind you saying, this is the way, walk in it.",
      "The chapter turns to Assyria's actual downfall. Thunder, earthquake, hailstones, God's own voice doing the fighting. It even names Tophet, prepared long before, deep and large, ready for a king who thought he was untouchable.",
      "The very last image is worship. A song as in the night of a holy solemnity, gladness like someone walking with a pipe up to the mountain of the Lord. Rest, refused at the start of this chapter, still shows up as celebration by the end of it.",
    ]),
  ],
  closing: [
    ["So that is Day 205.", 700],
    ["Three refusals of the same offer. Drunk leaders who would not hear. Rulers who trusted a lie instead of a foundation. A whole nation that ran to Egypt instead of standing still.", 800],
    ["And under every one of those refusals, the same line keeps surfacing. This is the rest. In returning and rest shall ye be saved. Rest was never withheld from any of them. It was turned down.", 850],
    ["Watch what God does not stop doing anyway. He lays a sure foundation in Zion regardless. He waits to be gracious regardless. He gives a song at the end of the very chapter that opened with woe.", 850],
    ["That is who you are dealing with, in the middle of whatever false security you have been leaning on instead.", 800],
    ["Tomorrow, Isaiah 31 through 33. More woe, a real rescue, and a first clear look at the king who is actually coming.", 850],
    ["For now, sit with the line Judah would not listen to.", 800],
    ["In quietness and in confidence shall be your strength.", 750],
    ["And ye would not.", 1200],
  ],
};
