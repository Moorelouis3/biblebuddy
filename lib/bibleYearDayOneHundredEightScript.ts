import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 108, written to the Day 1 standard.
 *
 * 2 Chronicles 28-31 pairs the worst king in this stretch of Chronicles
 * with what may be the best turnaround: Ahaz shuts the temple doors,
 * Hezekiah reopens them in his first month on the throne. Seven blocks,
 * covering all four chapters in order.
 */

const chron2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "2 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 108,
  title: "Ahaz's Failure and Hezekiah's Reform",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 108. Today has maybe the worst king in this whole stretch, then maybe the best turnaround.", 750],
    ["Ahaz burns his own children as an offering, and shuts the doors of God's house entirely.", 800],
    ["His son Hezekiah opens those same doors on day one of his own reign, and does not stop there.", 800],
    ["A shut temple. A reopened temple. Same building, one generation apart.", 850],
    ["We are in 2 Chronicles 28 through 31.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron2(28, 1, 15, [
      "Ahaz does not just do wrong like the kings before him. He burns his own children in the fire, copying the very practices of the nations God had cast out of this land.",
      "God hands Judah two crushing defeats in a row. Syria takes captives, then Israel's army kills a hundred and twenty thousand men of Judah in a single day and marches off with two hundred thousand more.",
      "Then something rare happens. A prophet named Oded meets the returning army and tells them plainly. You have slain them in a rage that reaches up to heaven, and you have sins of your own. Some of Israel's own leaders agree with him.",
      "So the very army that just conquered Judah turns around, clothes the naked captives, feeds them, and carries the weak home on donkeys. Mercy shows up in the middle of a war, from the side that just won it.",
    ]),
    chron2(28, 16, 27, [
      "Instead of turning to God after all this, Ahaz sends for the king of Assyria to rescue him. Assyria comes, and Chronicles gives you the verdict in four words. He distressed him, but strengthened him not.",
      "Ahaz strips the temple and his own palace to pay for that help, and it does not work. In his time of distress he trespasses even more, sacrificing to the gods of Damascus because, in his own words, they help the kings of Syria, so maybe they will help me.",
      "They were the ruin of him, and of all Israel, Chronicles says. Then Ahaz goes further than any king before him. He cuts the temple vessels in pieces and shuts the doors of the house of the Lord completely.",
      "When he dies, they will not even bury him among the kings. A reign that started by copying pagan nations ends with the doors of God's own house locked shut.",
    ]),
    chron2(29, 1, 19, [
      "Hezekiah becomes king, and in the first month of his first year, he opens the doors his father shut. Not eventually. Immediately.",
      "He gathers the priests and Levites and says it straight. Our fathers trespassed and turned their backs, so wrath came on us. Now it is in my heart to make a covenant with the Lord.",
      "The Levites go to work, carrying eight days' worth of filthiness out of the temple to the brook Kidron, then eight more days finishing the inner rooms. Sixteen days to undo what one king broke.",
      "They even find and clean the very vessels Ahaz cast away in his transgression. Nothing Ahaz threw out turned out to be too far gone to bring back.",
    ]),
    chron2(29, 20, 36, [
      "Hezekiah rises early and leads the sin offering himself, for the kingdom, for the sanctuary, for all Judah, with hands laid on the goats by the king and the whole assembly together.",
      "He restores the music David and the prophets Gad and Nathan had commanded generations earlier. The song of the Lord starts back up the moment the burnt offering begins, trumpets and instruments together.",
      "So much is offered that the priests alone cannot skin all of it, and the Levites, called more upright in heart than the priests that day, step in and help until enough priests can get themselves ready.",
      "Chronicles gives the reason it all moved this fast. God had prepared the people, for the thing was done suddenly. A shut temple, reopened, cleaned, and singing again inside one month.",
    ]),
    chron2(30, 1, 27, [
      "Hezekiah invites all Israel and Judah, not just his own kingdom, to keep Passover, a full month late because the priests were not yet consecrated. He would rather do it right one month behind than rush it broken.",
      "Couriers carry the invitation north into Israel's territory, and most of them laugh it to scorn and mock the messengers. But some from Asher, Manasseh, and Zebulun humble themselves and come anyway.",
      "The Passover happens with far more people who had not properly cleansed themselves than the law technically allowed, so Hezekiah prays for them instead of turning them away. The good Lord pardon everyone who prepares his heart to seek God, even if he is not clean by the letter of it.",
      "The Lord hearkened to Hezekiah, and healed the people. Chronicles says there had not been joy like this in Jerusalem since Solomon. An imperfectly kept feast, covered by one king's prayer, still counted.",
    ]),
    chron2(31, 1, 10, [
      "Before anyone even goes home, all Israel who came fans out through Judah, Benjamin, Ephraim, and Manasseh, smashing every image, cutting down every grove, tearing down every high place, until none are left standing.",
      "Hezekiah reorganizes the priests and Levites back into their proper courses, restoring the daily and sabbath offerings exactly as the law of the Lord had written them.",
      "Then he asks the people to give the priests and Levites their proper portion again, so they can devote themselves to the law instead of scraping by. The moment the word goes out, the firstfruits and tithes come pouring in.",
      "Grain, wine, oil, honey, oxen, sheep, holy things, all of it piled into heaps. Worship had been running on empty for a generation. It takes one honest invitation to fill it back up.",
    ]),
    chron2(31, 11, 21, [
      "The gifts pile up so fast that Hezekiah has to order storage chambers built inside the temple just to hold it all.",
      "He asks the chief priest Azariah what is happening, and the answer is simple. Since the people began bringing offerings, we have had enough to eat, with plenty left over, because the Lord has blessed his people.",
      "Hezekiah appoints careful men over every chamber, every courier, every family, down to the smallest child counted in the record, so that nothing given in faith gets wasted or lost.",
      "Chronicles closes with the verdict on his whole reign so far. In everything he undertook, in the service of the temple, in the law, in the commandments, he sought his God, did it with all his heart, and prospered.",
    ]),
  ],
  closing: [
    ["So that is Day 108.", 700],
    ["Ahaz burned his own children, locked the temple doors, and died unburied among the kings.", 750],
    ["His son Hezekiah opened those same doors in his first month as king, and never really stopped.", 800],
    ["Notice what Hezekiah didn't wait for. Not a perfect Passover. Not a fully ready nation. He invited everyone, prayed for the ones who came unprepared, and let God heal what the law alone would have turned away.", 850],
    ["Then the tithes came in so fast they had to build new rooms just to hold them.", 800],
    ["One generation locked God out. The next one ran out of storage because too much came back in.", 850],
    ["Tomorrow, 2 Chronicles 32 through 35. Hezekiah faces Assyria at the gates, then Manasseh and Josiah swing the story between judgment's worst and revival's best.", 850],
    ["For now, hold on to Azariah's answer.", 800],
    ["We have had enough to eat, and have left plenty.", 750],
    ["That's what a reopened door looks like.", 1200],
  ],
};
