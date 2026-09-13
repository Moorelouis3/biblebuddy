import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 194, written to the Day 1 standard.
 *
 * Song of Solomon 3-5 turns the celebration from Day 193 into something more
 * complicated: a night search through the city, a royal wedding procession
 * with swords drawn, a full description of the bride, and then a missed door
 * that costs her. Six blocks covering the whole arc in order.
 */

const sos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Song of Solomon ${chapter}:${startVerse}-${endVerse}`,
  book: "song of solomon",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 194,
  title: "Sick of Love",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 194.", 650],
    ["Song of Solomon 3 through 5.", 700],
    ["Yesterday she said, my beloved is mine, and I am his.", 800],
    ["Today that gets tested. She loses him in the night. Finds him. Loses him again.", 850],
    ["And in between, there is a wedding procession moving through the dark with swords drawn, just in case.", 800],
    ["We are in Song of Solomon 3, 4, and 5.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    sos(3, 1, 5, [
      "By night on my bed I sought him whom my soul loveth: I sought him, but I found him not. She wakes up wanting him, he isn't there, so she goes out looking, at night, through the streets.",
      "The watchmen that go about the city found me... Saw ye him whom my soul loveth? She isn't embarrassed to ask strangers where he is.",
      "I found him whom my soul loveth: I held him, and would not let him go. Once she has him again, she isn't gentle about it. She holds on.",
      "I charge you, O ye daughters of Jerusalem... that ye stir not up, nor awake my love, till he please. The line comes back a third time. Even right after finding him, the warning holds: don't force this before it's ready.",
    ]),
    sos(3, 6, 11, [
      "Who is this that cometh out of the wilderness like pillars of smoke, perfumed with myrrh and frankincense? The scene changes without warning. Suddenly this looks like a royal procession moving through smoke and perfume.",
      "Threescore valiant men are about it... every man hath his sword upon his thigh because of fear in the night. Even a wedding procession travels armed. Joy doesn't get to pause the dangers of the world it moves through.",
      "King Solomon made himself a chariot... the midst thereof being paved with love. Silver pillars, gold floor, purple covering, and at the center of all that wealth, one plain word: love. That's what it was built to carry.",
      "Go forth... and behold king Solomon with the crown wherewith his mother crowned him... in the day of the gladness of his heart. A king remembered here not for a conquest, but for the joy on his own wedding day.",
    ]),
    sos(4, 1, 7, [
      "Behold, thou art fair, my love... thou hast doves' eyes... thy hair is as a flock of goats. He goes head to toe, reaching for the richest images his world has: goats moving down a hillside, sheep fresh from washing, a scarlet thread.",
      "Thy neck is like the tower of David... whereon there hang a thousand bucklers. Not just beauty. He compares her neck to a fortified tower hung with shields. There's strength and dignity in how he sees her, not only softness.",
      "Thy two breasts are like two young roes that are twins, which feed among the lilies. The images stay physical and unashamed. This poem never apologizes for desire.",
      "Thou art all fair, my love; there is no spot in thee. After naming her piece by piece, he ends with one flat statement. Nothing wrong with her at all. That's how he actually sees her.",
    ]),
    sos(4, 8, 16, [
      "Come with me from Lebanon, my spouse... from the lions' dens, from the mountains of the leopards. He calls her away from danger, toward himself. This isn't only admiration. It's an invitation out of a hard place.",
      "Thou hast ravished my heart, my sister, my spouse; thou hast ravished my heart with one of thine eyes. One glance did this to him, and he says so plainly, no embarrassment about it.",
      "A garden inclosed is my sister, my spouse; a spring shut up, a fountain sealed. She's described as something private, not available to everyone. Kept, not hidden out of shame, but reserved for one person.",
      "Awake, O north wind... blow upon my garden, that the spices thereof may flow out. Let my beloved come into his garden. She answers by inviting the wind to stir what's sealed so its scent reaches him. She's the one who opens it.",
    ]),
    sos(5, 1, 8, [
      "I am come into my garden, my sister, my spouse... eat, O friends; drink, yea, drink abundantly, O beloved. He answers her invitation right away. What was sealed is now shared, and the poem says so without flinching.",
      "I sleep, but my heart waketh: it is the voice of my beloved that knocketh... I have put off my coat; how shall I put it on? He knocks at night. She hesitates over something small, already undressed, not wanting the hassle of getting up.",
      "I opened to my beloved; but my beloved had withdrawn himself, and was gone: my soul failed when he spake. By the time she opens the door, he's gone. A small delay costs her something real here.",
      "The watchmen... smote me, they wounded me... I charge you... tell him, that I am sick of love. The same watchmen who once just found her now wound her. And she still can't stop talking about him. Sick of love isn't shame. It's just an honest name for how much this hurts.",
    ]),
    sos(5, 9, 16, [
      "What is thy beloved more than another beloved, O thou fairest among women? The daughters of Jerusalem ask a fair question. What makes him worth all this grief? She could just say she loves him. Instead she answers in full.",
      "His head is as the most fine gold... his eyes are as the eyes of doves... his legs are as pillars of marble. Gold, ivory, marble, cedar. King language now describing the ordinary man she happens to love.",
      "His mouth is most sweet: yea, he is altogether lovely. After naming everything about how he looks, that's the word she lands on. Lovely. Not just handsome.",
      "This is my beloved, and this is my friend, O daughters of Jerusalem. After nine verses of appearance, the last word isn't about looks at all. It's friendship. And she never says where he went. She just keeps searching, still sure of him.",
    ]),
  ],
  closing: [
    ["So that is Day 194.", 700],
    ["A woman searches the city at night for the man she loves, finds him, and will not let go.", 800],
    ["A king marries with an armed escort, because even joy travels through a dangerous world.", 800],
    ["He praises her from head to toe and says there is no spot in her.", 800],
    ["Then later, she hesitates for a moment at a door, and he is gone before she opens it.", 850],
    ["The watchmen who once just found her now wound her.", 800],
    ["And still, when the daughters of Jerusalem ask what makes him worth all this, she answers in detail, and ends on friendship.", 850],
    ["Tomorrow, Song of Solomon 6 through 8. Love as strong as death.", 850],
    ["For now, hold onto her last word about him.", 750],
    ["This is my beloved, and this is my friend.", 1200],
  ],
};
