import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 94, written to the Day 1 standard.
 *
 * 1 Chronicles 1-4 opens the Chronicles right where 2 Kings left off - a
 * ruined nation - and answers it with a genealogy running from Adam through
 * the exile to Zerubbabel. Mostly names, but the names carry the story:
 * Tamar, Ruth, Achan, Jabez, an Egyptian son-in-law, and the same kings just
 * watched falling in yesterday's reading. Seven blocks across four chapters.
 */

const chron1 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `1 Chronicles ${chapter}:${startVerse}-${endVerse}`,
  book: "1 chronicles",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_NINETY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 94,
  title: "The Family Line of God's People",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 94. Yesterday the temple burned and a king went blind. Today the Bible opens with one word. Adam.", 800],
    ["No commentary on the ashes. No mourning. Just a list of names, starting at the very beginning of everything.", 800],
    ["It might be the strangest response to a national disaster you will ever read. It might also be the most defiant.", 850],
    ["Buried inside four chapters of names are a scandal, a prayer, a servant who saves a family line, and the exact kings you just watched fall.", 850],
    ["We are in 1 Chronicles 1 through 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    chron1(1, 1, 27, [
      "Yesterday ended with a burned temple and a blinded king. Today opens with a single word. Adam. First Chronicles does not begin at the exile. It begins at the very start of everything, on purpose.",
      "The list moves fast - Adam to Noah in four verses, Noah's three sons spreading into every nation you will ever read about, all the way down to two lines buried in the middle. Cush begat Nimrod, he began to be mighty upon the earth. And Eber's son was named Peleg, because in his days the earth was divided.",
      "Two sentences of actual story inside twenty-some verses of names. That is the rhythm of this whole book. A wall of names, and then, without warning, one line that stops you.",
      "By verse twenty-seven the list has narrowed from every nation on earth down to one man. Abram, the same is Abraham. Everything before this verse was the whole world. Everything after it follows one family.",
    ]),
    chron1(1, 28, 54, [
      "Before the line narrows again to Isaac, it stops to name every son who did not carry the promise. Ishmael's twelve sons, Keturah's six, and then Esau's whole family tree, down to the kings who ruled Edom before Israel ever had a king of its own.",
      "None of this is wasted space. A nation freshly home from exile with nothing is taking the time to remember every branch of the family, including the ones who walked away from the covenant.",
      "Esau's line even gets a real royal history here - eight kings, then a line of dukes, ruling an actual kingdom while Jacob's descendants were still just a family finding their way to Egypt. The road not chosen still built something.",
      "But the list keeps moving past every one of those kings toward a single line that, as of this book, does not have a king, or a kingdom, or a homeland yet. It is choosing the smaller story on purpose.",
    ]),
    chron1(2, 1, 17, [
      "Israel's twelve sons get named first, then the list drops everyone else and follows Judah alone, generation by generation, down to one line. Jesse begat his firstborn Eliab... David the seventh.",
      "Look at what carries that line. Pharez, born through Tamar, a scandal in Genesis 38. Boaz, born through a Moabite widow. Nahshon, a nobody prince who simply obeyed when it was his turn. None of them look like the ancestors of a king in their own stories.",
      "And right beside David, without ceremony, are his sisters Zeruiah and Abigail. Zeruiah's sons are Joab, Abishai, and Asahel - the men who fight every one of David's wars for him. One verse holds the family tree behind half of Second Samuel.",
      "A slave girl's grandson, a foreign widow, a soldier's mother. This is the family the Messiah's whole line runs through. Not one impressive name yet. Just people who stayed faithful long enough to be counted.",
    ]),
    chron1(2, 18, 55, [
      "Buried in Hezron's family, one name gets a title instead of just a genealogy. Achar, the troubler of Israel, who transgressed in the thing accursed. That is Achan, from Joshua 7, still being named by what he did, generations later.",
      "Then a smaller, quieter story. Sheshan has no sons, only daughters, so he gives one to Jarha, his own Egyptian servant, and their son carries the family line forward for ten more generations. An outsider becomes the reason the line does not end.",
      "Names like Bethlehem and Kirjath-jearim show up here as literal descendants - the father of Bethlehem, the father of Kirjath-jearim. The towns from David's story and the ark's story did not appear from nowhere. A person built them, and this list remembers who.",
      "This is what a genealogy is actually doing. Not padding. Refusing to let a scandal, a servant, or a forgotten town-builder disappear from the record just because the story moved on without them.",
    ]),
    chron1(3, 1, 24, [
      "David's sons get listed by mother and by city, Hebron first, then Jerusalem - Amnon, Absalom, Adonijah, Solomon, all sitting in one list with no hint yet of what any of them will do to each other.",
      "Then the list becomes the very kings you just watched fall in yesterday's reading. Solomon, Rehoboam, all the way down to Josiah. Fourteen generations in four verses - the whole story of 1 and 2 Kings compressed into a family tree.",
      "And it does not stop at the exile. Jehoiakim's line continues through Jeconiah - the king carried off to Babylon as a teenager in yesterday's chapter twenty-four - all the way to a name you have not met yet. Zerubbabel.",
      "This list is being written for people already living on the far side of everything in yesterday's reading. And it is telling them, on purpose: the line did not end at the burned temple. It kept going, into the exile, and out the other side.",
    ]),
    chron1(4, 1, 23, [
      "In the middle of another stretch of names with no story attached, one sentence breaks the pattern completely. Jabez was more honourable than his brethren. And then it tells you why his own mother named him sorrow.",
      "Jabez asks God for four things - bless me indeed, enlarge my coast, let your hand be with me, keep me from evil - and the very next line answers before you can wonder if it worked. And God granted him that which he requested. One prayer, one answer, in the middle of a page of names.",
      "A few verses later the list quietly mentions potters and linen workers who dwelt with the king for his work. Not everyone in this family tree fought battles or wore a crown. Some of them just made things, faithfully, for generations, and still got remembered for it.",
      "A name that meant sorrow becomes attached to one of the most quoted prayers in the Bible. This list does not only track kings. It tracks anyone who called on God and got answered.",
    ]),
    chron1(4, 24, 43, [
      "Simeon's family gets one honest, unflattering note. His brethren had not many children, unlike Judah. Simeon was already the smallest tribe by the census in Numbers, and this list does not hide that either.",
      "So they go looking for room. Some head to the valley near Gedor in Hezekiah's day and wipe out a peaceful settlement of Hamites who had lived there quietly for generations, just to get their pasture.",
      "Five hundred more of them go to Mount Seir and finish something Israel started centuries earlier - striking down the last of the Amalekites who had escaped, the same enemy God told Moses to blot out completely back in Exodus seventeen.",
      "Even the smallest tribe in Israel gets its own ending recorded here. Not a triumphant one. Just an honest one. They needed room, and they took it, generations after everyone else had forgotten Simeon was still out there.",
    ]),
  ],
  closing: [
    ["So that is Day 94.", 700],
    ["Four chapters, almost entirely names, written for people who had just lost their temple, their king, and their land.", 800],
    ["And that is exactly the point. A people with nothing left still has this - proof of who they came from, and who is still theirs.", 800],
    ["Inside all those names: Tamar, a Moabite widow, a slave's grandson, an Egyptian son-in-law, a boy named Sorrow who prayed his way into something else.", 850],
    ["And the kings you watched fall yesterday, Solomon down to Josiah, the whole story compressed into four verses, still running past the exile to a name called Zerubbabel.", 850],
    ["The line did not end at the burned temple. It kept going, on paper, in a book, long before anyone knew how the story would actually end.", 850],
    ["Tomorrow, 1 Chronicles 5 through 8. More tribes, more names, and Israel's identity traced from both sides of the Jordan.", 850],
    ["For now, hold on to one small prayer inside a page of names.", 800],
    ["Oh that thou wouldest bless me indeed.", 750],
    ["And God granted him that which he requested.", 1200],
  ],
};
