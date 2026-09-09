import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 157, written to the Day 1 standard.
 *
 * Psalms 85-87: a prayer for revival that remembers grace already given,
 * David calling himself poor and needy in the same breath as holy, and a
 * short psalm that lists Israel's old enemies as children born in Zion.
 * Six blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 157,
  title: "Revival and Zion's Hope",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 157. Psalms 85 through 87.", 700],
    ["A prayer for revival that remembers grace already given.", 750],
    ["David, a king, calling himself poor and needy and holy in the same breath.", 800],
    ["And a short psalm that lists Israel's old enemies as children born in its own city.", 850],
    ["Memory, mercy, and a surprising kind of family.", 750],
    ["We are in Psalms 85, 86, and 87.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(85, 1, 7, [
      "This psalm opens by remembering, not asking. Thou hast been favourable unto thy land: thou hast brought back the captivity of Jacob. Something real already happened.",
      "Thou hast forgiven the iniquity of thy people, thou hast covered all their sin. Past tense. Already done. And yet the very next line still asks, wilt thou be angry with us for ever?",
      "That is not a contradiction. That is what real faith sounds like. Remembering what God already did does not erase the ache of what still feels unfinished.",
      "Wilt thou not revive us again, that thy people may rejoice in thee? He is not asking for something new. He is asking God to do again what God has already proven he does.",
    ]),
    g(85, 8, 13, [
      "I will hear what God the LORD will speak. Before anything else happens, he stops talking and listens.",
      "For he will speak peace unto his people, and to his saints: but let them not turn again to folly. Peace is offered, and a warning rides right alongside it.",
      "Mercy and truth are met together; righteousness and peace have kissed each other. Four things that usually pull against each other, pictured here holding on to one another instead.",
      "Truth shall spring out of the earth, and righteousness shall look down from heaven. Two directions closing the gap. That is what this whole psalm has been asking for.",
    ]),
    g(86, 1, 7, [
      "This is David, and he opens with the plainest words in the whole psalm. Bow down thine ear, O LORD, hear me: for I am poor and needy.",
      "No title. No credentials. Just poor and needy, from the man who is actually the king.",
      "I cry unto thee daily. Not once, in a crisis. Daily. This is a habit, not an emergency call.",
      "In the day of my trouble I will call upon thee: for thou wilt answer me. He is not hoping God might answer. He states it like something he already knows.",
    ]),
    g(86, 8, 13, [
      "Among the gods there is none like unto thee. David lived surrounded by nations that worshipped plenty of other gods. He is not being polite. He means it as a direct comparison, and there is no contest.",
      "All nations whom thou hast made shall come and worship before thee. Centuries early, he already sees where this is going. Every nation, eventually, turning the same direction.",
      "Teach me thy way, O LORD; I will walk in thy truth: unite my heart to fear thy name. That last part is the real request. He does not just want to know what is right. He wants to stop being pulled in different directions inside himself.",
      "For great is thy mercy toward me: and thou hast delivered my soul from the lowest hell. He is not speaking in theory. Something specific already happened to him.",
    ]),
    g(86, 14, 17, [
      "O God, the proud are risen against me, and the assemblies of violent men have sought after my soul. This is not abstract danger. Real people are actively trying to kill him.",
      "And look at the turn. But thou, O Lord, art a God full of compassion, and gracious, longsuffering, and plenteous in mercy and truth. He answers a death threat by describing who God is.",
      "Save the son of thine handmaid. That is how David identifies himself here. Not king. Just someone's son, asking to be saved.",
      "Show me a token for good, that they which hate me may see it, and be ashamed. He wants proof his enemies cannot argue with, not for his own pride, but so they finally see what he already knows.",
    ]),
    g(87, 1, 7, [
      "This whole psalm is only seven verses, and it is doing something bigger than it looks. The LORD loveth the gates of Zion more than all the dwellings of Jacob. God has a favorite address.",
      "Then it names Rahab, meaning Egypt, and Babylon, and Philistia, and Tyre, and Ethiopia. Israel's oldest enemies and its trading partners, named one at a time.",
      "And of Zion it shall be said, this and that man was born in her. God writes citizens from every one of those nations into Zion's own birth record, as if they had been born there.",
      "All my springs are in thee. One short line closes a short psalm. Everything that keeps a person alive traces back to this one place.",
    ]),
  ],
  closing: [
    ["So that is Day 157.", 700],
    ["A plea for revival, a king who calls himself poor and needy, and a city that claims old enemies as its own children.", 750],
    ["Psalm 85 does not ask God to start being merciful. It asks him to do it again.", 800],
    ["Psalm 86 shows you can be a king and still pray like someone with nothing.", 800],
    ["And Psalm 87 says the strangest thing in these three chapters. Egypt, Babylon, and Philistia, all listed as born in Zion.", 850],
    ["God was never planning to keep this to one nation.", 850],
    ["Tomorrow, Psalms 88 through 90. The darkest psalm in the whole book, and Moses counting his days.", 850],
    ["For now, hold on to the shortest line in today's reading.", 750],
    ["All my springs are in thee.", 800],
    ["Everything that keeps you alive traces back to one place.", 1200],
  ],
};
