import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 279, written to the Day 1 standard.
 *
 * The last words of the Old Testament give way to four hundred years of
 * silence, then Matthew opens the New Testament with a genealogy that
 * insists Jesus belongs to a real, messy family line, followed by his
 * birth, the wise men, and Herod's massacre. Six blocks across Malachi 4
 * and Matthew 1-2.
 */

const malachiFour = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Malachi 4:${startVerse}-${endVerse}`,
  book: "malachi",
  chapter: 4,
  startVerse,
  endVerse,
  teaching,
});

const matthewOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 1:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

const matthewTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 2:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 279,
  title: "Promise Fulfilled in Jesus' Birth",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 279. Malachi just finished speaking, and then four hundred years pass with no prophet at all.", 800],
    ["No voice from heaven. No new word. Just silence, generation after generation.", 800],
    ["Then Matthew opens with the last thing you'd expect after four centuries of nothing. A genealogy, forty-two generations long, leading to one name.", 900],
    ["And then an angel, a pregnant virgin, and wise men chasing a star into a king's court.", 850],
    ["We are in Malachi 4, and Matthew 1 and 2.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    malachiFour(1, 6, [
      "The day comes, burning like an oven. The proud, everyone who does wickedly, become stubble, burned up with neither root nor branch left. Malachi's last chapter does not soften anything on the way out.",
      "But to those who fear God's name, the Sun of righteousness rises with healing in its wings, and they go out and grow like calves let loose from the stall. Same day, completely different experience, depending on which side you're standing on.",
      "Remember the law of Moses, God says, the statutes and judgments given at Horeb. Even as the book closes on something new coming, it points back to what was already given.",
      "Then the last words of the Old Testament in most English Bibles. I will send you Elijah before the great and dreadful day of the Lord, and he will turn the hearts of fathers to children and children to fathers, lest the earth be struck with a curse. That is where the silence begins.",
    ]),
    matthewOne(1, 17, [
      "Matthew starts a book about the Son of God with a list of names. Deliberately. He wants you to know Jesus fits inside a real family, a real line, not a story dropped from nowhere.",
      "The book of the generation of Jesus Christ, the son of David, the son of Abraham. Two names picked out of the whole list on purpose. The one God promised land and nations to, and the one God promised an eternal throne to.",
      "And the list is not clean. Thamar, Rachab, Ruth, and her that had been the wife of Urias, meaning Bathsheba. Matthew could have left the women out. He puts in four whose stories involve scandal, foreignness, or another man's wife, right inside the ancestry of the Messiah.",
      "Fourteen generations from Abraham to David, fourteen from David to the captivity, fourteen from the captivity to Christ. A shape, not an accident. Matthew is telling you this name is the one everything was arranged around.",
    ]),
    matthewOne(18, 25, [
      "Mary is found with child before she and Joseph have come together. Joseph, called a just man, decides to put her away privily rather than make her a public example. Kindness, even while he believes the worst.",
      "Then an angel meets him in a dream and reframes everything. What is conceived in her is of the Holy Ghost. Fear not to take Mary as your wife. Joseph's obedience here gets almost no attention, but it is total. He does exactly what the angel said.",
      "She will bring forth a son, and you will call his name Jesus, for he shall save his people from their sins. The name is the mission, stated before the birth even happens.",
      "Matthew ties it straight back to the prophet. A virgin shall be with child, and they shall call his name Emmanuel, God with us. The genealogy proved he belongs to this family. This verse says what he actually is.",
    ]),
    matthewTwo(1, 12, [
      "Wise men arrive from the east asking, openly, in Jerusalem, where the one born King of the Jews is. Not a safe question to ask in a city that already has a king.",
      "Herod is troubled, and all Jerusalem with him. Fear spreading downward from a throne that has everything to lose from a real king being born.",
      "The chief priests and scribes know the answer instantly. Bethlehem, exactly as it is written by the prophet, a governor to rule God's people Israel. They have the right information and do nothing with it.",
      "The wise men find the young child, fall down and worship him, and open their treasures. Gold, and frankincense, and myrrh. Then, warned of God in a dream, they depart into their own country another way. The men from furthest away are the ones who actually worship him.",
    ]),
    matthewTwo(13, 18, [
      "An angel warns Joseph in a dream again. Arise, take the young child and his mother, flee into Egypt, because Herod will seek the young child to destroy him. Joseph obeys again, by night, no argument.",
      "Matthew reads it as fulfillment. Out of Egypt have I called my son. The exodus story happening again, in miniature, around one family.",
      "Herod, mocked by the wise men who never reported back, is exceeding wroth, and sends men to slay every child in Bethlehem two years old and under. A king willing to slaughter a town's children to protect his own position.",
      "Rachel weeping for her children, refusing to be comforted, because they are not. Matthew quotes Jeremy the prophet, and the grief in that verse is not softened or explained away. It is simply named.",
    ]),
    matthewTwo(19, 23, [
      "After Herod dies, an angel tells Joseph again, in Egypt this time, to go back into the land of Israel, because the ones who sought the young child's life are dead.",
      "Joseph hears that Archelaus reigns in Judaea in his father's place and is afraid to go there. So he turns aside instead into the parts of Galilee, being warned of God in a dream.",
      "He comes and dwells in a city called Nazareth, so that what was spoken by the prophets would be fulfilled. He shall be called a Nazarene. A title with almost no prestige attached to it, and Jesus grows up carrying it.",
      "Look at how many times this short chapter says warned of God in a dream, or an angel appeareth. God is moving this family through danger one instruction at a time, and Joseph never once argues.",
    ]),
  ],
  closing: [
    ["So that is Day 279.", 700],
    ["Malachi ended with fire for the proud, healing for the ones who feared God's name, and a promise that Elijah would come before it was over.", 800],
    ["Then four hundred years of nothing. And Matthew opens that silence with a list of forty-two names, ending in one.", 800],
    ["An angel tells a confused, kind man named Joseph to marry a pregnant woman anyway, because what is growing in her is from God. He does it without arguing.", 850],
    ["Wise men travel a long way to ask a dangerous question in the wrong city, and end up the only ones in the story who actually kneel down and worship.", 850],
    ["Herod tries to end it with a massacre. Joseph gets moved to Egypt and back by dream after dream, and settles finally in a town called Nazareth.", 850],
    ["Tomorrow, Matthew 3 through 5. A wilderness preacher, a baptism, and the start of the hardest teaching Jesus ever gives.", 850],
    ["For now, sit with what the angel told Joseph.", 750],
    ["He shall save his people from their sins.", 1200],
  ],
};
