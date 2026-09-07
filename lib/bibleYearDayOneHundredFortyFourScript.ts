import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 144, written to the Day 1 standard.
 *
 * Psalms 46-48, three of the "Songs of Zion": refuge when the earth itself
 * shakes, God as King over the whole earth, and the city that made invading
 * armies turn and run. Six blocks across three short chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 144,
  title: "God Is Our Refuge",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 144. Psalms 46 through 48.", 700],
    ["Three short psalms, and they all point at the same city.", 750],
    ["Refuge when the earth itself falls apart.", 800],
    ["A King loud enough to be clapped for.", 800],
    ["And a city that made invading armies turn and run.", 850],
    ["We are in Psalms 46, 47, and 48.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(46, 1, 7, [
      "New psalm, straight statement. God is our refuge and strength, a very present help in trouble. Not a refuge you have to search for. Present. Already here.",
      "Therefore will not we fear, though the earth be removed, and the mountains carried into the midst of the sea. That is not a metaphor for a bad day. That is the whole world falling apart, and the psalm still says do not fear.",
      "There is a river, the streams whereof shall make glad the city of God. Jerusalem has no river running through it. This one is pictured, not literal. Even without water, the city has gladness because God is in her.",
      "The LORD of hosts is with us; the God of Jacob is our refuge. Jacob, the schemer who wrestled all night and still limped away blessed. If refuge worked for him, it holds for whoever is reading this.",
    ]),
    g(46, 8, 11, [
      "Come, behold the works of the LORD, what desolations he hath made in the earth. He is inviting them to go look at the wreckage of every enemy that ever came against them.",
      "He maketh wars to cease unto the end of the earth; he breaketh the bow, and cutteth the spear in sunder. Not just wins the wars. Ends them. Breaks the weapons so they cannot be picked back up.",
      "Be still, and know that I am God. Ten words, and they are not comfort. They are a command, aimed at people who keep trying to fix the world themselves.",
      "I will be exalted among the heathen, I will be exalted in the earth. He does not need their help to be God. He is asking them to stop thrashing and see it.",
    ]),
    g(47, 1, 5, [
      "O clap your hands, all ye people; shout unto God with the voice of triumph. This psalm does not whisper. It is loud on purpose.",
      "The LORD most high is terrible; he is a great King over all the earth. Terrible here does not mean bad. It means the kind of great that makes you catch your breath.",
      "He shall choose our inheritance for us, the excellency of Jacob whom he loved. Israel did not pick their own land. God picked it, because He loved them, not because they earned it.",
      "God is gone up with a shout, the LORD with the sound of a trumpet. Picture a king returning from battle to a city throwing a parade. That is the sound this verse wants in your ear.",
    ]),
    g(47, 6, 9, [
      "Sing praises to God, sing praises: sing praises unto our King, sing praises. Said four times in one verse. Some things are worth repeating past the point of subtlety.",
      "For God is the King of all the earth: sing ye praises with understanding. Not mindless noise. Praise that knows exactly who it is singing to.",
      "God reigneth over the heathen: God sitteth upon the throne of his holiness. Even the nations who never claimed Him are still under Him. His reign was never limited to the ones who noticed.",
      "The princes of the people are gathered together, even the people of the God of Abraham. Outsiders end up gathered in with Abraham's people. The invitation was always wider than one bloodline.",
    ]),
    g(48, 1, 8, [
      "Great is the LORD, and greatly to be praised in the city of our God, in the mountain of his holiness. This whole psalm is a walking tour of Jerusalem, and every landmark points back to God.",
      "Beautiful for situation, the joy of the whole earth, is mount Zion. It is a modest hill by any real measure. The psalm calls it beautiful because of who lives there, not its height.",
      "For, lo, the kings were assembled, they passed by together. They saw it, and so they marvelled; they were troubled, and hasted away. Fear took hold upon them there, and pain, as of a woman in travail. An army came to take the city and left running, gripped by a fear they cannot even name.",
      "As we have heard, so have we seen in the city of the LORD of hosts. The stories their grandparents told turned out to be true in front of their own eyes.",
    ]),
    g(48, 9, 14, [
      "We have thought of thy lovingkindness, O God, in the midst of thy temple. Worship here starts with remembering, not asking for anything.",
      "Walk about Zion, and go round about her: tell the towers thereof. Mark ye well her bulwarks, consider her palaces. They are told to actually go look, count the towers, notice the walls, so they have something specific to hand down.",
      "That ye may tell it to the generation following. The whole point of noticing is so somebody who was not there yet can still know it happened.",
      "For this God is our God for ever and ever: he will be our guide even unto death. Not just until things get hard. Not just for this one crisis. All the way to the end, and past the point where anyone else could go with you.",
    ]),
  ],
  closing: [
    ["So that is Day 144.", 700],
    ["Refuge, a King worth shouting for, and a city that lived up to its own reputation.", 750],
    ["Psalm 46 does not promise a calm world. It promises a steady God inside a world that shakes.", 800],
    ["Be still, and know that I am God is not relaxation. It is a command to stop thrashing.", 800],
    ["Psalm 47 says that King reigns over everyone, not just the people who already believe it.", 850],
    ["And Psalm 48 ends with a promise bigger than any wall around that city. He will be our guide even unto death.", 850],
    ["Tomorrow, Psalms 49 through 51. Wealth that cannot buy anyone out of the grave, and a king who finally admits what he did.", 850],
    ["For now, hold on to the command in the middle of today's reading.", 800],
    ["Be still.", 750],
    ["And know that He is God.", 1200],
  ],
};
