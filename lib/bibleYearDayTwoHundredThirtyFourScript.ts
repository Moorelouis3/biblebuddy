import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 234, written to the Day 1 standard.
 *
 * Jeremiah 49-51: five smaller nations get a chapter's worth of oracles
 * between them - Ammon, Edom, Damascus, Kedar and Hazor, Elam - and then
 * Jeremiah spends two full chapters on one more name. Babylon, the empire
 * God used to execute every judgment in this book, including Judah's own,
 * finally stands in the same courtroom it built for everyone else. The
 * oracle ends outside the poetry entirely, with a real man named Seraiah
 * carrying the scroll to Babylon and sinking it in the Euphrates. Six
 * blocks across three chapters (149 verses), no gaps.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 234,
  title: "Babylon Will Fall",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 234. Every nation around Judah gets a turn in this book.", 750],
    ["Ammon. Edom. Damascus. Kedar. Elam. Jeremiah works through them one by one, a chapter's worth between them.", 800],
    ["Then he gets to the last name on the list, and it takes two entire chapters.", 800],
    ["Babylon. The empire God used to punish everyone else, including Judah, now stands in the same courtroom.", 850],
    ["We are in Jeremiah 49, 50, and 51.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(49, 1, 22, [
      "Ammon moved into land that belonged to the tribe of Gad the moment Gad was carried off, and God asks why. Hath Israel no sons? Hath he no heir? Why then doth their king inherit Gad, and his people dwell in his cities? Taking what a wounded neighbor left behind gets named for exactly what it is.",
      "Edom lives up in the rock, cliff cities cut into stone, hard to reach and easy to feel safe in. Though thou shouldest make thy nest as high as the eagle, I will bring thee down from thence, saith the LORD. No wall built that high is God-proof.",
      "Then, aimed at the very people being judged, one line of mercy nobody expects. Leave thy fatherless children, I will preserve them alive; and let thy widows trust in me. Judgment on a nation is not judgment on every person left standing inside it.",
      "The block ends with a warning that reaches past Edom entirely. They whose judgment was not to drink of the cup have assuredly drunken; and art thou he that shall altogether go unpunished? Thou shalt not go unpunished, but thou shalt surely drink of it. If it came to people who deserved it less, it is coming to whoever hears this next.",
    ]),
    g(49, 23, 39, [
      "Damascus gets six verses, and they read like someone watching their own city end in real time. Fear hath seized on her: anguish and sorrows have taken her, as a woman in travail. Then a line of pure grief. How is the city of praise not left, the city of my joy!",
      "Kedar and Hazor are tent-dwelling desert peoples who never even built walls. Arise, get you up unto the wealthy nation, that dwelleth without care, saith the LORD, which have neither gates nor bars, which dwell alone. Isolation was never the same thing as safety.",
      "Elam sits far to the east, barely named anywhere else in Scripture, and God still sends a word there by name. I will break the bow of Elam, the chief of their might, and scatter them toward all those winds. No nation is too small or too far away to answer to Him.",
      "And even at the edge of the list, the sentence does not end in silence. It shall come to pass in the latter days, that I will bring again the captivity of Elam. The same door left open for Ammon and Edom stays open for Elam too.",
    ]),
    g(50, 1, 20, [
      "Now the oracle Jeremiah has been building toward this whole book. Babylon is taken, Bel is confounded, Merodach is broken in pieces. The gods Babylon trusted get named and knocked down by name, one at a time.",
      "And the same breath that sentences Babylon turns straight toward home. The children of Israel shall come, they and the children of Judah together, going and weeping: they shall go, and seek the LORD their God. The exile ends with people walking back, not just being marched out.",
      "God explains what actually got them there. My people hath been lost sheep: their shepherds have caused them to go astray. Judah did not fall because Babylon was strong. Judah fell because its own leaders drove the flock into the wrong hills long before Babylon ever showed up.",
      "Then the line that explains everything else in these three chapters. The iniquity of Israel shall be sought for, and there shall be none; and the sins of Judah, and they shall not be found: for I will pardon them whom I reserve. Babylon's fall clears ground for something Judah could never have earned.",
    ]),
    g(50, 21, 46, [
      "God names the target directly. Behold, I am against thee, O thou most proud. Babylon gets called the hammer of the whole earth here, and the same chapter says, how is it cut asunder and broken! The empire that flattened everyone else finally meets something harder.",
      "Babylon's own methods get read back to it. Recompense her according to her work; according to all that she hath done, do unto her. Whatever measure this empire used on Judah is the measure now coming home.",
      "There is a reason underneath the armies. Their Redeemer is strong; the LORD of hosts is his name: he shall throughly plead their cause. This was never only Babylon losing a war. It is God settling a case for people who had no way to argue their own.",
      "And right in the middle of it, one sentence repeated word for word from Edom's chapter earlier today. Who is like me? And who is that shepherd that will stand before me? The same unanswerable question, this time aimed at an empire instead of a small neighbor.",
    ]),
    g(51, 1, 33, [
      "God sends a destroying wind against Babylon, then explains why the whole earth got swept into her sin in the first place. Babylon hath been a golden cup in the LORD'S hand, that made all the earth drunken. The most seductive empire in the world was still just a cup in someone else's hand.",
      "In the middle of naming armies and the kings of the Medes, Jeremiah stops to say who is actually running the world. He hath made the earth by his power, he hath established the world by his wisdom. Every empire looks eternal until you remember who is holding the sky up.",
      "Then the line that gives Judah its whole identity in the middle of someone else's funeral. Every founder is confounded by the graven image: for his molten image is falsehood, and there is no breath in them. But the portion of Jacob is not like them; for he is the former of all things. Their gods are things that got made. Israel's God is the one doing the making.",
      "God calls Babylon His own battle axe, used against every nation around it - with thee will I break in pieces the nations - and then turns and breaks the axe itself. Being useful to God's plans was never the same thing as being safe from His judgment.",
    ]),
    g(51, 34, 64, [
      "Jerusalem finally gets to speak inside its own oracle. The violence done to me and to my flesh be upon Babylon, shall the inhabitant of Zion say. Decades of being talked about ends with Zion having something to say back.",
      "The verdict lands on an image that keeps returning through this whole prophecy. Babylon's own leaders shall sleep a perpetual sleep, and not wake. Not exile this time. An ending with no morning scheduled after it.",
      "Then the book steps clean outside the poetry. Jeremiah hands the actual scroll to a real man, Seraiah, already on his way to Babylon on other business, with exact instructions. When thou comest to Babylon, and shalt see, and shalt read all these words.",
      "Bind a stone to it, and cast it into the midst of Euphrates. Thus shall Babylon sink, and shall not rise from the evil that I will bring upon her. Decades of prophecy against an empire ends with one prophet's friend sinking a book in a river, trusting it would still come true.",
    ]),
  ],
  closing: [
    ["So that is Day 234.", 700],
    ["Ammon, Edom, Damascus, Kedar, and Elam all got their turn today. Then Jeremiah spent two whole chapters on one more name.", 800],
    ["Babylon. The empire God used to punish everyone else, judged by the exact standard it enforced on everybody.", 800],
    ["Recompense her according to her work; according to all that she hath done, do unto her. The measure Babylon used is the measure coming back.", 850],
    ["And underneath the armies, one line about who is actually behind all of it. Their Redeemer is strong; the LORD of hosts is his name; he shall throughly plead their cause.", 850],
    ["Then it stops being poetry. Jeremiah hands the actual scroll to a real man named Seraiah, walking into Babylon with real instructions.", 800],
    ["Tomorrow, Jeremiah 52 and Lamentations 1 and 2. The fall itself, told plainly, and then the grief that follows it.", 850],
    ["For now, picture that scroll going into the river.", 800],
    ["A stone tied to it, and a prophet trusting it would still come true.", 750],
    ["Thus shall Babylon sink, and shall not rise.", 1200],
  ],
};
