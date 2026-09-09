import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 161, written to the Day 1 standard.
 *
 * Psalms 97-99: three psalms that all open the same way - the LORD reigns -
 * and then spend their verses showing what that reign actually costs and
 * actually gives. Thirty verses across three short chapters, so six blocks
 * covers it with room to breathe.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Psalms ${chapter}:${startVerse}-${endVerse}`,
  book: "psalms",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 161,
  title: "The Holy King Reigns",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 161. Psalms 97 through 99.", 700],
    ["Yesterday the whole earth was invited to sing. Today it's asked to tremble too.", 800],
    ["Three psalms, and every one of them opens the same way. The LORD reigneth.", 800],
    ["But reigning here is not quiet royalty sitting still. Fire goes ahead of him. Hills melt like wax. Nations answer him whether they meant to or not.", 850],
    ["And right in the middle of all that power, this set of psalms keeps stopping to name real men. Moses. Aaron. Samuel.", 850],
    ["We are in Psalms 97, 98, and 99.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(97, 1, 6, [
      "The LORD reigneth; let the earth rejoice. The psalm does not argue for this. It just states it, and tells the earth how to respond.",
      "Clouds and darkness are round about him: righteousness and judgment are the habitation of his throne. You cannot see straight into it. What you can trust is what it is built on.",
      "A fire goeth before him, and burneth up his enemies round about. His lightnings enlightened the world: the earth saw, and trembled. This is not a gentle picture. Power like this does not ask permission to be noticed.",
      "The hills melted like wax at the presence of the LORD. If mountains cannot hold their shape in front of him, that tells you something about the size of what you are dealing with.",
    ]),
    g(97, 7, 12, [
      "Confounded be all they that serve graven images, that boast themselves of idols: worship him, all ye gods. Even the things people built to replace him end up bowing to him instead.",
      "Zion heard, and was glad; and the daughters of Judah rejoiced because of thy judgments, O LORD. Their joy is not vague good feeling. It is relief that real judgment finally landed somewhere.",
      "Ye that love the LORD, hate evil. The psalm pairs those two on purpose. Loving him without hating what he hates is not actually love. It is comfort.",
      "Light is sown for the righteous, and gladness for the upright in heart. Rejoice in the LORD, ye righteous. Sown, like a seed. The light is not always up yet. It is planted, and it is coming.",
    ]),
    g(98, 1, 5, [
      "O sing unto the LORD a new song; for he hath done marvellous things. His right hand, and his holy arm, hath gotten him the victory. A new song because something actually happened. Not a song about ideas. A song about a win he pulled off himself.",
      "The LORD hath made known his salvation: his righteousness hath he openly shewed in the sight of the heathen. Openly. Not hidden in one nation's private records. Shown where outsiders could see it too.",
      "He hath remembered his mercy and his truth toward the house of Israel: all the ends of the earth have seen the salvation of our God. What starts as a promise kept to one family ends up visible to everyone alive.",
      "Make a joyful noise unto the LORD, all the earth. Sing unto the LORD with the harp; with the harp, and the voice of a psalm. Not just noise. An actual instrument, an actual song. Worship with detail, not just volume.",
    ]),
    g(98, 6, 9, [
      "With trumpets and sound of cornet make a joyful noise before the LORD, the King. This is the sound you would use to announce a ruler arriving, because that is exactly what is happening.",
      "Let the sea roar, and the fulness thereof; the world, and they that dwell therein. The invitation to praise stops being just a human thing here. The ocean gets included.",
      "Let the floods clap their hands: let the hills be joyful together. Water does not have hands. Hills do not have expressions. The psalm hands them both anyway, because nothing gets left silent in this song.",
      "For he cometh to judge the earth: with righteousness shall he judge the world, and the people with equity. That is the actual reason for all the noise. Judgment is coming, and for once that is the good news, not the threat.",
    ]),
    g(99, 1, 5, [
      "The LORD reigneth; let the people tremble: he sitteth between the cherubims; let the earth be moved. Same opening line as Psalm 97. This time the response asked for is not joy first. It is trembling.",
      "The LORD is great in Zion; and he is high above all the people. Let them praise thy great and terrible name; for it is holy. Terrible here does not mean evil. It means worthy of real fear, the old sense of the word - something too large to be casual about.",
      "The king's strength also loveth judgment; thou dost establish equity, thou executest judgment and righteousness in Jacob. His power is not loose or arbitrary. It is aimed, on purpose, at fairness.",
      "Exalt ye the LORD our God, and worship at his footstool; for he is holy. Before you get anywhere near the throne, you are still just at the footstool. And that is already holy ground.",
    ]),
    g(99, 6, 9, [
      "Moses and Aaron among his priests, and Samuel among them that call upon his name; they called upon the LORD, and he answered them. After two chapters of cosmic imagery, the psalm suddenly names three actual men, centuries apart, who prayed and were heard.",
      "He spake unto them in the cloudy pillar: they kept his testimonies, and the ordinance that he gave them. That pillar was real. You have already walked through that story earlier this year, on the road out of Egypt.",
      "Thou answeredst them, O LORD our God: thou wast a God that forgavest them, though thou tookest vengeance of their inventions. Both halves of that sentence stay true at once. He forgave them. He also did not simply erase what their choices cost.",
      "Exalt the LORD our God, and worship at his holy hill; for the LORD our God is holy. Holy, for the third time in three psalms. By now the word has stopped being decoration and started being the point.",
    ]),
  ],
  closing: [
    ["So that is Day 161.", 700],
    ["Three psalms built on one claim. The LORD reigneth. Not might. Not will someday. Reigns, right now.", 750],
    ["Psalm 97 shows what that reign looks like up close. Fire ahead of him, hills melting, idols put to shame.", 800],
    ["Psalm 98 answers with a new song, and hands the microphone to the sea and the floods and the hills.", 800],
    ["And Psalm 99 will not let you stop at the singing. Holy, said three times. Terrible in the old sense, meaning worth real fear, not evil.", 850],
    ["Then it does something the first two psalms never do. It names names. Moses. Aaron. Samuel. Men who actually called on him and were actually answered.", 850],
    ["Tomorrow, Psalms 100 through 102. The tone turns from trembling toward thanksgiving, and then toward a prayer prayed by someone who feels forgotten.", 850],
    ["For now, hold on to verse eight of Psalm 99.", 800],
    ["Thou wast a God that forgavest them, though thou tookest vengeance of their inventions.", 900],
    ["Both true. At the same time.", 1200],
  ],
};
