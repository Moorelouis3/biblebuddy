import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 211, written to the Day 1 standard.
 *
 * Isaiah 46-48 closes the Babylon sequence: Bel and Nebo carried out on
 * tired pack animals, Babylon herself told to sit in the dust, and Israel
 * charged with swearing God's name "but not in truth." Seven blocks across
 * three shorter chapters (50 verses total).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Isaiah ${chapter}:${startVerse}-${endVerse}`,
  book: "isaiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_ELEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 211,
  title: "Idols Fall, God Carries",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 211.", 700],
    ["Babylon's own gods get loaded onto tired pack animals today, while God tells Israel He's the one who has carried them since before they could walk.", 850],
    ["Then Babylon itself gets told to sit in the dust - the same words she used to boast about herself, thrown right back at her.", 850],
    ["And near the end, one verse quietly changes who's speaking, without ever stopping to explain itself.", 800],
    ["We are in Isaiah 46, 47, and 48.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(46, 1, 7, [
      "Bel boweth down, Nebo stoopeth, their idols were upon the beasts... a burden to the weary beast. Babylon's own gods get loaded onto pack animals like cargo, too heavy for the animals hauling them off.",
      "Then the contrast, stated as plainly as Isaiah ever states anything. Which are borne by me from the belly, which are carried from the womb... even to your old age I am he... I will carry you. The true God is the one doing the carrying, not the one needing to be carried.",
      "Then the idol gets built again, the same scene as a few chapters back. They lavish gold out of the bag, and weigh silver in the balance, and hire a goldsmith; and he maketh it a god. Bought, weighed, and worshipped, in that order.",
      "They bear him upon the shoulder, they carry him, and set him in his place, and he standeth... yet can he not answer, nor save him out of his trouble. A god that has to be set down exactly where someone else leaves it.",
    ]),
    g(46, 8, 13, [
      "Remember this, and shew yourselves men: bring it again to mind, O ye transgressors. Not gentle. He calls them what they are before He calls them back.",
      "I am God, and there is none else; I am God, and there is none like me, declaring the end from the beginning. The claim isn't only power. It's that He already knows how the story ends.",
      "Calling a ravenous bird from the east, the man that executeth my counsel from a far country. Another unnamed foreign king, called into God's plan the same way Cyrus was in the last chapter.",
      "I bring near my righteousness; it shall not be far off, and my salvation shall not tarry. After all the waiting in earlier chapters, God finally says a date is close.",
    ]),
    g(47, 1, 7, [
      "Come down, and sit in the dust, O virgin daughter of Babylon, sit on the ground: there is no throne. The empire that just carried its own gods on pack animals gets told to sit in the dirt like a captive.",
      "Take the millstones, and grind meal: uncover thy locks... pass over the rivers. The language of a comfortable queen gets replaced, line for line, with the language of forced labor.",
      "As for our redeemer, the LORD of hosts is his name. Right in the middle of Babylon's sentence, Isaiah drops in whose side he's actually writing from.",
      "I was wroth with my people, I have polluted mine inheritance, and given them into thine hand... upon the ancient hast thou very heavily laid thy yoke. Babylon was God's own instrument of judgment. That never excused how Babylon used the power.",
    ]),
    g(47, 8, 15, [
      "Thou that art given to pleasures, that dwellest carelessly, that sayest in thine heart, I am, and none else beside me. Babylon says the exact words God says about Himself. That's the whole indictment in one line.",
      "These two things shall come to thee in a moment in one day, the loss of children, and widowhood. Everything she assumed could never touch her arrives at once, without warning.",
      "Let now the astrologers, the stargazers, the monthly prognosticators, stand up, and save thee from these things. Babylon was famous for reading the sky. Isaiah names the exact experts and dares them to go to work.",
      "Behold, they shall be as stubble; the fire shall burn them... there shall not be a coal to warm at. No lingering embers. Nothing left even to warm your hands by.",
    ]),
    g(48, 1, 11, [
      "Hear ye this, O house of Jacob... which swear by the name of the LORD, and make mention of the God of Israel, but not in truth, nor in righteousness. The charge against God's own people is worse than idolatry. It's using His name and meaning nothing by it.",
      "I have declared the former things from the beginning... lest thou shouldest say, Mine idol hath done them. God explains His own motive for predicting things early. So no one can hand the credit to a statue.",
      "I have refined thee, but not with silver; I have chosen thee in the furnace of affliction. Not silver, because silver comes out pure. This furnace was for proving something silver can't prove.",
      "For mine own sake, even for mine own sake, will I do it: for how should my name be polluted? He states His own motive twice in one breath. Not because Israel earned any of it.",
    ]),
    g(48, 12, 16, [
      "I am he; I am the first, I also am the last. Mine hand also hath laid the foundation of the earth. The same claim from a few chapters back, said again here as the reason Babylon's fall is already settled.",
      "The LORD hath loved him: he will do his pleasure on Babylon, and his arm shall be on the Chaldeans. Cyrus again, unnamed this time but unmistakable, loved by a God he doesn't yet know he's working for.",
      "I have not spoken in secret from the beginning; from the time that it was, there am I. He isn't catching up to events. He's been present at every point of the timeline He's describing.",
      "And now the Lord GOD, and his Spirit, hath sent me. The speaker shifts here, from God talking about Himself to someone sent by God and His Spirit. Isaiah doesn't stop to explain it. He just lets it sit in the text.",
    ]),
    g(48, 17, 22, [
      "I am the LORD thy God which teacheth thee to profit, which leadeth thee by the way that thou shouldest go. Not only Redeemer. Teacher, walking ahead on a specific road.",
      "O that thou hadst hearkened to my commandments! then had thy peace been as a river, and thy righteousness as the waves of the sea. A real regret, spoken out loud, not a hypothetical.",
      "Go ye forth of Babylon, flee ye from the Chaldeans... say ye, The LORD hath redeemed his servant Jacob. The exile announced chapters ago finally gets its exit line.",
      "There is no peace, saith the LORD, unto the wicked. Isaiah plants that line here first, right after describing an exit that not everyone will actually take.",
    ]),
  ],
  closing: [
    ["So that is Day 211.", 700],
    ["Bel and Nebo start the day loaded onto pack animals. God ends it saying He's carried Israel since the womb and will carry them to gray hair.", 800],
    ["Babylon said, I am, and none else beside me. Word for word what God says about Himself a few chapters earlier. That's the whole case against her.", 800],
    ["Not one ember left to warm your hands by. That's what happens to an empire whose gods needed carrying in the first place.", 800],
    ["And God's own people get charged with something worse than idols. Swearing by His name and meaning nothing by it.", 800],
    ["Then, quietly, near the very end. The Lord GOD, and his Spirit, hath sent me. Isaiah doesn't stop to explain who's talking. He just keeps going.", 850],
    ["Tomorrow, Isaiah 49 through 51. The Servant speaks for Himself for the first time.", 850],
    ["For now, remember what actually gets carried.", 800],
    ["Not the gods. You.", 750],
    ["From the womb to gray hair, He said.", 1200],
  ],
};
