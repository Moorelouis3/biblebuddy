import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 273, written to the Day 1 standard.
 *
 * Haggai closes with a discouraged crew, a promise bigger than the building,
 * and a personal word to Zerubbabel. Then Zechariah opens with a call to
 * return, a night full of visions - patrol riders, four horns and four
 * craftsmen, and a measuring line that gives up on walls. Seven blocks:
 * three across Haggai 2, three across Zechariah 1, one across Zechariah 2.
 */

const haggaiTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Haggai 2:${startVerse}-${endVerse}`,
  book: "haggai",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const zechariahOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 1:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const zechariahTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Zechariah 2:${startVerse}-${endVerse}`,
  book: "zechariah",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 273,
  title: "Future Glory and Jerusalem's Hope",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 273. The foundation is laid, and some of the builders are disappointed by it.", 800],
    ["It looks like nothing next to the temple their grandparents remembered.", 800],
    ["God's answer is not to make the building bigger. It is a promise that reaches past the building entirely.", 850],
    ["Then a second prophet starts seeing things at night. Horses patrolling the earth, and a measuring line stretched over a city that will not be able to hold walls.", 850],
    ["We are in Haggai 2, and Zechariah 1 and 2.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    haggaiTwo(1, 9, [
      "A month after the work restarts, some of the older men who remember Solomon's temple look at this new foundation, and in their eyes it is as nothing by comparison. Grief and progress are sitting in the same room.",
      "God's answer is not to defend the building. It is be strong, and work, for I am with you. The same phrase he gave the people the moment they first obeyed, now repeated to the leaders and everyone else by name.",
      "Then a promise that reaches way past this construction project. I will shake the heavens and the earth, and the desire of all nations shall come, and I will fill this house with glory. A discouraged remnant with no gold to show for it is told the silver and gold already belong to God anyway.",
      "The glory of this latter house shall be greater than the former, God says, and in this place I will give peace. Not a bigger building. A peace the first temple, for all its splendor, never actually delivered.",
    ]),
    haggaiTwo(10, 19, [
      "Haggai asks the priests a pop quiz about holiness law. Can holy meat make ordinary bread holy just by touching it? No, they say. Can something unclean make ordinary bread unclean by touching it? Yes.",
      "Uncleanness spreads by contact. Holiness does not. That is the whole point of the question, and Haggai applies it straight to the nation. So is every work of their hands, and what they offer here is unclean. One building project does not sanctify a people still carrying corruption everywhere else.",
      "Then he reminds them what life looked like before this exact day, the day the foundation was actually laid. Twenty measures expected, ten delivered. Blasting, mildew, hail on everything their hands touched, and none of it turned them back to God until now.",
      "Then, dated to that same day, one line changes everything. From this day will I bless you. Not because the temple is finished. Because obedience finally started.",
    ]),
    haggaiTwo(20, 23, [
      "The same day, a second word comes, this time just for Zerubbabel, the governor. God repeats the shaking of the nations. Thrones overturned, armies destroying each other by their own hand.",
      "And in the middle of that upheaval, God makes a personal promise to one discouraged builder. I will make thee as a signet, a ring that carries the king's own seal and authority. A small provincial governor gets treated like royalty.",
      "It matters who Zerubbabel is. He is in the line back to David, and the line forward to Jesus. God is quietly keeping the promise to David alive in a man rebuilding a small, unimpressive temple.",
      "Being chosen, in Haggai, has nothing to do with how big the project looks from the outside. The signet ring promise lands on the same men who were just told their foundation looked like nothing.",
    ]),
    zechariahOne(1, 6, [
      "A second prophet starts speaking two months after Haggai, to the same builders, and he opens with the reason their fathers ended up in exile in the first place. The Lord hath been sore displeased with your fathers.",
      "Then the offer, plain and mutual. Turn ye unto me, and I will turn unto you. Not a threat this time. An open door, held out to people who are already turning back toward the temple site.",
      "He warns them not to repeat their fathers' pattern. The earlier prophets cried out the same thing for generations, and nobody listened. Both those prophets and the fathers they warned are gone now. Only God's word outlasted them.",
      "And here is the haunting part. The fathers eventually admitted it themselves. Like as the Lord thought to do unto us, so hath he dealt with us. They agreed with the verdict only after there was nothing left to do but agree with it.",
    ]),
    zechariahOne(7, 17, [
      "Three months later Zechariah gets a night vision. A rider on a red horse standing among myrtle trees, patrol riders behind him who have been sent to walk the whole earth and report back.",
      "Their report is unsettling in context. All the earth sitteth still, and is at rest. The nations are comfortable while Jerusalem is still rubble. Peace for everyone else, seventy years of ruin for God's own city.",
      "So the angel asks the question on everyone's mind. How long will you withhold mercy from Jerusalem? And God answers with, literally, good and comfortable words. I am jealous for Zion, I am returned to Jerusalem with mercies, my house shall be built.",
      "Notice the reason God gives for judging the nations. I was but a little displeased, and they helped forward the affliction. God's discipline had limits the nations did not respect, and now that gets answered too.",
    ]),
    zechariahOne(18, 21, [
      "Next, four horns. The picture of raw strength, like an animal's weapon. The angel says plainly what they are. These are the horns which have scattered Judah, Israel, and Jerusalem.",
      "Then God shows Zechariah four craftsmen, workers with tools, and their whole job is to terrify those horns and cut them down.",
      "Every power that ever scattered God's people eventually meets its own craftsman. Power that scatters does not get to stand forever unanswered.",
      "It is a short vision, almost a footnote next to the one before it, but the message is the same one running through the whole night. What scattered you is not the end of the story.",
    ]),
    zechariahTwo(1, 13, [
      "A man shows up with a measuring line to size up Jerusalem, width and length. The ordinary work of a city planner sizing up walls that do not exist yet.",
      "But the answer he gets overturns the whole plan. Jerusalem shall be inhabited as towns without walls, too full of people and cattle to fence in, because God himself will be a wall of fire round about her, and the glory in the midst of her.",
      "Then the tone sharpens. He that toucheth you toucheth the apple of his eye. God takes what is done to his people as personal as it is possible to be, and promises the very nations that plundered them will end up plundered by their own servants.",
      "It ends on the line the whole book keeps circling back to. I will dwell in the midst of thee. Not just visit, not just protect from a distance. Many nations shall be joined to the Lord in that day, and become his people too. The promise was never going to stay small.",
    ]),
  ],
  closing: [
    ["So that is Day 273.", 700],
    ["Haggai told a discouraged crew that the glory of this latter house would be greater than the first one, and that in this place God would give peace.", 800],
    ["Then Zerubbabel, one small governor rebuilding a small, unimpressive temple, got called a signet ring. Chosen, in the middle of the least impressive moment of the project.", 850],
    ["Then Zechariah saw riders sent to patrol the whole earth, and came back to a God who said, I am jealous for Jerusalem.", 850],
    ["Four horns that scattered God's people, met by four craftsmen sent to cut them back down.", 800],
    ["And a measuring line that gave up trying to measure walls, because God said he would be the wall himself. A wall of fire, with his glory in the middle of the city.", 850],
    ["He that toucheth you toucheth the apple of his eye, God said. And I will dwell in the midst of thee.", 850],
    ["Tomorrow, Zechariah 3 through 5. A high priest cleansed, a lampstand that runs on nothing, and wickedness carried away in a basket.", 850],
    ["For now, hold on to the wall that is not a wall.", 800],
    ["A wall of fire, with the glory inside it.", 1200],
  ],
};
