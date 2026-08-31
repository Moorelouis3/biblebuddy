import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 60, written to the Day 1 standard.
 *
 * Joshua 16-19 keeps dividing the land: Ephraim and Manasseh's territory
 * with the recurring note that the Canaanites were not fully driven out,
 * Zelophehad's daughters receiving their promised inheritance, Joseph's
 * tribe complaining about its one lot, the Shiloh assembly and survey for
 * the remaining seven tribes, Benjamin's border past Jebusite Jerusalem,
 * Simeon settling inside Judah's excess territory, and the final lots
 * closing with Dan taking Leshem by force and Joshua receiving his own
 * city last of all. Seven blocks, splitting chapters 17, 18, and 19 in two
 * each so the narrative beats get their own room apart from the borders
 * and city lists around them.
 */

const josh = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Joshua ${chapter}:${startVerse}-${endVerse}`,
  book: "joshua",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SIXTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 60,
  title: "Inheritance for the Tribes",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 60. Nine more lots left to draw, and this reading has two very different kinds of people asking for things.", 750],
    ["Five sisters ask for what they were promised.", 800],
    ["One tribe complains that it did not get enough.", 800],
    ["Watch how differently those two requests get answered.", 900],
    ["We are in Joshua 16 through 19. Borders, city lists, a tribe that runs out of room, and the man who led the whole conquest waiting until last for his own share.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    josh(16, 1, 10, [
      "Ephraim and Manasseh split Joseph's one lot between them. Jacob adopted them as his own sons back in Genesis, and this is where that blessing finally becomes ground.",
      "Ephraim's border runs from Jericho out to the sea, through town after town, some renamed so many times the list itself gets hard to follow.",
      "And buried in it is a crack that keeps showing up in this book. They did not drive out the Canaanites in Gezer. Those Canaanites are still there, the text says, unto this day, paying tribute instead of leaving.",
      "Unfinished obedience does not disappear. It just moves in next door and starts paying rent.",
    ]),
    josh(17, 1, 13, [
      "Manasseh's lot splits again. Machir, the firstborn, already claimed Gilead and Bashan on the far side of the Jordan for being a man of war.",
      "Then five sisters step forward. Mahlah, Noah, Hoglah, Milcah, and Tirzah, the daughters of Zelophehad, come to Eleazar and Joshua and ask for the inheritance the LORD already promised them through Moses. They get it.",
      "And the same failure from Ephraim's chapter shows up again, worse. The Canaanites in the valley cities keep their iron chariots and keep their land. Israel taxes them once it is strong enough, but the text will not soften it. They did not utterly drive them out.",
      "The book keeps repeating this on purpose. It is not hiding the gap between what God promised and what Israel actually finished.",
    ]),
    josh(17, 14, 18, [
      "Joseph's tribe complains. Why did you give us only one lot, one portion, when the LORD has made us this many people?",
      "Joshua's answer is not comfort, it is a dare. If you are that large a people, go up to the forest country and clear it yourself.",
      "They push back. The hill is not big enough, and the Canaanites in the valley have iron chariots. Joshua does not argue with the danger. He just repeats the assignment.",
      "You are strong, you have great power, go drive them out anyway, iron chariots and all. Nobody hands Joseph's tribe more room. They are told to go take it.",
    ]),
    josh(18, 1, 10, [
      "The whole camp moves to Shiloh and sets up the tabernacle there. It becomes the meeting place for the rest of this book. And seven tribes still have not received a single acre.",
      "Joshua's question to them has an edge to it. How long are you slack to go possess the land the LORD God of your fathers has already given you? The land was given. They just had not gone to get it.",
      "So he sends surveyors, three men from each tribe, to walk the whole country and write it down in a book, city by city, divided into seven parts.",
      "Then he casts lots at Shiloh, before the LORD. The promise was finished the moment God spoke it. Living in it still takes people willing to walk the ground and write it down.",
    ]),
    josh(18, 11, 28, [
      "Benjamin's lot lands right between Judah and Joseph, and its border runs straight through the valley of the son of Hinnom and past Jebusi.",
      "That is the same Jerusalem Judah could not fully clear back in chapter fifteen. It sits right on Benjamin's line now too.",
      "Fourteen cities get named for Benjamin, ending with Jebusi itself, Gibeath, and Kirjath.",
      "This is the tribe that will one day hand Israel its first king. Right now it is just a border description next to a city still full of people who will not leave.",
    ]),
    josh(19, 1, 9, [
      "Simeon goes second, and it is an odd inheritance. Their cities sit inside Judah's territory, carved out of land Judah already owned.",
      "The text gives the plain reason. Judah's portion was too much for them, so Simeon gets folded into the middle of it.",
      "Go back to Jacob's deathbed blessing in Genesis. Simeon was told he would be scattered in Israel for what he did at Shechem.",
      "Generations later, that scattering is still happening. Just now it looks like a tribe living inside somebody else's borders instead of a curse with nowhere to land.",
    ]),
    josh(19, 10, 51, [
      "Five more lots go out quickly. Zebulun, Issachar, Asher, Naphtali, Dan. Each one closes with the same formula: this is the inheritance, these cities with their villages.",
      "Dan runs into a problem the others do not. Their assigned land goes out too little for them, so they go to war on their own, take a city called Leshem, and rename it Dan, after their father.",
      "And after every tribe has ground under it, one man is still standing empty-handed. Joshua asks for a city, and by the word of the LORD they give him Timnath-serah. He builds it himself, and lives there.",
      "The man who led the entire conquest is the very last name on the list. So they made an end of dividing the country.",
    ]),
  ],
  closing: [
    ["So that is Day 60.", 700],
    ["Ephraim, Manasseh, Benjamin, Simeon, Zebulun, Issachar, Asher, Naphtali, and Dan. Nine more lots drawn, and the whole land finally has names on it.", 750],
    ["Twice in these four chapters the text admits the same thing. They did not drive them out. Once in Gezer, once in the valley cities. Both times tribute instead of freedom.", 800],
    ["But twice something better happens too. Five sisters ask for what was promised and get it. A tribe with no room left goes and takes more instead of complaining forever.", 850],
    ["Then the man who led the entire conquest waits until every tribe is settled before he asks for anything for himself.", 850],
    ["Tomorrow, Joshua 20 through 23. Cities of refuge, an altar that nearly starts a war, and Joshua's last warning before he is gone.", 850],
    ["For now, hold on to the sisters.", 750],
    ["They asked for what they were promised.", 750],
    ["Moses' word outlived Moses.", 1200],
  ],
};
