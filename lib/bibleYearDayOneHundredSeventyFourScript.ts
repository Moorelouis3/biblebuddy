import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 174, written to the Day 1 standard.
 *
 * Psalms 136-138: the Great Hallel, twenty-six verses that all end the same
 * way, then the exiles' lament by the rivers of Babylon, then a short psalm
 * of a man whose prayer actually got answered. Five blocks, the first three
 * carrying Psalm 136's refrain in full.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 174,
  title: "His Steadfast Love Endures Forever",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 174.", 650],
    ["One psalm today repeats the same four words twenty-six times in a row.", 750],
    ["For his mercy endureth for ever. Every single line.", 800],
    ["Then the mood breaks hard. A psalm about hanging harps on willow trees, because nobody could sing.", 850],
    ["And a short one that ends on a very ordinary line. Do not forsake the work of your own hands.", 800],
    ["We are in Psalms 136, 137, and 138.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(136, 1, 9, [
      "Twenty-six verses, and every single one ends the same way. For his mercy endureth for ever. That refrain is not decoration. It is the whole point, repeated so many times you cannot skim past it.",
      "The first nine verses just name what God is. God of gods. Lord of lords. The one who alone does great wonders. Then it moves straight into the sky he made, the sun to rule the day, the moon and stars to rule the night.",
      "Notice the order. Praise comes before any request. Before the psalm asks God for one single thing, it spends nine verses just naming who he is.",
      "Try reading it out loud and actually finishing the refrain every time. It slows you down on purpose. Thanksgiving that fast usually is not real.",
    ]),
    g(136, 10, 16, [
      "Now the psalm turns from creation to history. The firstborn struck in Egypt, Israel brought out, the sea split into parts.",
      "Verses fourteen and fifteen sit right next to each other on purpose. Israel walks through the same sea that drowns Pharaoh's army. One act of God, two completely different outcomes, depending on which side you were on.",
      "Then verse sixteen jumps straight to the wilderness, skipping forty years in a single line. The refrain does not skip a single one of them though. His mercy in the wandering gets the same four words as his mercy at the sea.",
      "This is a psalm written to be sung by people who never saw the Red Sea themselves. They are giving thanks for history they only ever heard about.",
    ]),
    g(136, 17, 26, [
      "Sihon and Og get named specifically, the way Psalm 135 named them too. This is not a vague thank you. It is thanks for particular battles, particular land, particular kings who are now gone.",
      "Then verse twenty-three turns personal. Who remembered us in our low estate. The psalm stops talking about ancient kings and starts talking about the people singing it, right now, in whatever low place they are in.",
      "Verse twenty-five widens all the way out. He gives food to all flesh. Not just Israel. Every mouth that eats today is proof of the same mercy the whole psalm has been describing.",
      "Twenty-six verses, twenty-six times the same line. By the end it should not sound like a chant anymore. It should sound like something you actually believe.",
    ]),
    g(137, 1, 9, [
      "This psalm opens with one of the saddest lines in the whole book. By the rivers of Babylon, there we sat down, yea, we wept, when we remembered Zion. Grief, not anger, comes first.",
      "They hang their harps on the willows because their captors ask for a song. How shall we sing the Lord's song in a strange land. Some grief cannot perform on command, even for entertainment.",
      "Verses five and six are a vow, not a complaint. If I forget thee, O Jerusalem, let my right hand forget her cunning. The exile decides to keep caring about home even though home is gone.",
      "The last two verses are brutal, and this project will not soften them. This is a defeated, humiliated people asking for the same violence done to them to land on the ones who did it. Say what the text says and let it sit.",
    ]),
    g(138, 1, 8, [
      "After exile's grief, this small psalm answers a real prayer. In the day when I cried thou answeredst me, and strengthenedst me with strength in my soul. Not a promise for later. Something that already happened.",
      "Verse six is the hinge of the whole psalm. Though the Lord be high, yet hath he respect unto the lowly. Greatness and attention to small people are not opposites here.",
      "Even in trouble the tone does not collapse. Though I walk in the midst of trouble, thou wilt revive me. The psalm does not pretend trouble is gone. It just says God is still working inside it.",
      "The last line is almost a request tucked inside praise. Forsake not the works of thine own hands. An honest, ordinary ask, right after this whole day's worth of praise.",
    ]),
  ],
  closing: [
    ["So that is Day 174.", 700],
    ["Twenty-six repeats of one refrain, then a psalm too sad to sing, then a small one that says thank you for an answered prayer.", 750],
    ["Psalm 136 will not let you thank God quickly. It makes you say the reason every single time.", 800],
    ["Psalm 137 will not let you skip the grief either. Some things really were lost, and pretending otherwise is not faith.", 800],
    ["And Psalm 138 ends the day with the plainest kind of praise there is. He answered when I cried.", 800],
    ["Tomorrow, Psalms 139 through 141. A psalm about being known completely, right down to before you were born.", 850],
    ["For now, sit with the line from the middle psalm.", 800],
    ["How shall we sing the Lord's song in a strange land.", 850],
    ["Some places, you just have to keep singing anyway.", 1200],
  ],
};
