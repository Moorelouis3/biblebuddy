import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 40, written to the Day 1 standard.
 *
 * Numbers 6-9: the Nazirite vow, the priestly blessing, the tribal leaders'
 * offerings at the tabernacle's dedication, the Levites set apart to serve
 * in place of every firstborn, and Israel's second Passover with the
 * provision made for anyone unclean or far off. Seven blocks across four
 * chapters, consolidating the twelve-day dedication offerings the way
 * Day 38 consolidated the census.
 */

const num = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Numbers ${chapter}:${startVerse}-${endVerse}`,
  book: "numbers",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FORTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 40,
  title: "Blessing, Dedication, and Passover",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 40.", 700],
    ["A vow anyone can take. A blessing only a priest can give. And twelve days of leaders bringing the exact same gift, one tribe at a time.", 850],
    ["Then Passover comes around again, and this time there is a problem nobody planned for.", 850],
    ["What do you do when you want to obey and the law itself is standing in your way?", 900],
    ["We are in Numbers 6 through 9.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    num(6, 1, 21, [
      "Anyone, man or woman, could take a Nazirite vow. No wine, no grapes, no cutting the hair, no going near a dead body, not even a parent's. All of it, for a set time, by choice.",
      "It was not a job you were born into like the priesthood. It was a vow an ordinary person volunteered for, a way of saying, for this season, I am setting myself apart on purpose.",
      "If someone died suddenly beside them, the vow broke, and they started the whole count over from nothing. The cost of an accident they never chose was real, and the law does not pretend otherwise.",
      "When the time was finished, there was a full set of offerings, and only then could the hair grow out again. Samson will break this vow later. Right now, it is just a door open to anyone who wants to walk through it.",
    ]),
    num(6, 22, 27, [
      "God gives Aaron the exact words to bless the people with. The Lord bless you and keep you. The Lord make His face shine upon you and be gracious to you. The Lord lift up His countenance upon you and give you peace.",
      "Three lines, and they build. Blessing and protection, then favor and grace, then His face turned toward you and peace.",
      "God says the priests will put His name on Israel this way, and He will bless them. The blessing does not originate with Aaron. He just carries the words.",
      "This is still the blessing spoken over people today. Three thousand years, and the words have not needed updating.",
    ]),
    num(7, 1, 89, [
      "The day the tabernacle is finished, the leaders of the twelve tribes bring wagons and oxen to help carry it, and then something unusual starts. For twelve straight days, one leader brings an offering, then the next day the next leader brings his.",
      "Every single gift is identical. Same silver dish, same bowl, same weight, same animals, listed in full, for every one of the twelve tribes, back to back.",
      "Scripture could have said it once and noted eleven more just like it. Instead it names each leader and repeats the whole list twelve times. Each tribe's gift got written down in full, not folded into a summary.",
      "Then Moses goes into the tent to speak with God, and hears the voice speaking to him from above the mercy seat, between the two cherubim. The tabernacle is finished, and God is already using it exactly the way it was built for.",
    ]),
    num(8, 1, 26, [
      "Aaron lights the lamps so they face forward, toward the front of the lampstand, exactly as commanded, and Scripture notes that he did it just so.",
      "Then the Levites are cleansed and set apart in a public ceremony. Water sprinkled on them, their whole bodies shaved, their clothes washed, and the people of Israel lay hands on them in front of everyone.",
      "God repeats the trade from chapter 3. The Levites are mine, instead of the firstborn. I have taken them for myself in place of every firstborn son in Israel.",
      "Levites serve from twenty-five to fifty, then step back from the heavy work at fifty, though they can still assist. Even service to God has a season that ends, not because the calling stops mattering, but because the body does.",
    ]),
    num(9, 1, 14, [
      "One year out from Egypt, God tells Israel to keep the Passover again, on the same date, the same way. And then a specific group of men come to Moses with a real problem. They are unclean from touching a dead body, and cannot keep it on the appointed day.",
      "Notice what they do. They do not skip it quietly. They bring the conflict straight to Moses. Why should we be kept back from offering the Lord's offering?",
      "Moses does not have an answer, so he goes and asks God. And God makes a second Passover, exactly one month later, for anyone unclean or off on a long journey.",
      "The rule stays exactly as strict as before. Unleavened bread, bitter herbs, none of the lamb left until morning, none of its bones broken. Only the date moves. The provision is mercy, not a loophole.",
    ]),
    num(9, 15, 23, [
      "From the day the tabernacle is set up, a cloud covers it, and at night it looks like fire. That is how it stays, day after day, for however long they camp there.",
      "When the cloud lifted, Israel moved. When it stayed, they stayed, whether that meant one night or a full year. Nobody is told the schedule in advance.",
      "Numbers repeats it verse after verse, almost word for word, until you feel the waiting yourself. At the commandment of the Lord they rested in their tents, and at the commandment of the Lord they journeyed.",
      "Two million people organized their whole lives around a cloud they could not control and were not told when it would move. That is what following God looked like here. Not a plan handed out in advance. A cloud, watched daily.",
    ]),
  ],
  closing: [
    ["So that is Day 40.", 700],
    ["A vow anyone could take, and a blessing only a priest could speak. Both of them still standing exactly as written.", 800],
    ["Twelve tribes bringing the same gift twelve days running, and Scripture naming every single one instead of summarizing them away.", 800],
    ["The Levites set apart in front of the whole nation, in place of every firstborn son. And then a second Passover, made for the people the law would otherwise have shut out.", 850],
    ["That second Passover is worth sitting with. When obedience and circumstance collided, God did not lower the standard. He made room for the people who wanted to keep it and could not.", 900],
    ["Then the whole book slows down to a cloud. Move when it moves. Stay when it stays. No schedule handed out ahead of time.", 850],
    ["Tomorrow, Numbers 10 through 13. The trumpets sound, the cloud finally lifts, and the journey actually begins.", 850],
    ["For now, hold on to the men who asked their question.", 800],
    ["Why should we be kept back?", 750],
    ["God made room for them.", 1200],
  ],
};
