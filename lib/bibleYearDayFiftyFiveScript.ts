import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 55, written to the Day 1 standard.
 *
 * Deuteronomy 30-33: the promise of restoration after exile, the "choose
 * life" charge that closes the covenant speeches, Moses at a hundred and
 * twenty handing the nation to Joshua and ordering the law read publicly
 * every seven years, God telling Moses plainly that Israel will fall away
 * and having him write the Song of Moses as future evidence, the Song
 * itself (the Rock, the eagle, Jeshurun growing fat, the vengeance that
 * belongs to God alone, and Moses sent up Nebo for Meribah), and finally
 * Moses blessing every tribe by name before he dies. Seven blocks, with
 * chapter 32 split across two of them since the Song runs to 52 verses.
 */

const deut = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Deuteronomy ${chapter}:${startVerse}-${endVerse}`,
  book: "deuteronomy",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_FIFTY_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 55,
  title: "Choose Life and Receive Moses' Blessing",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 55. Moses is near the end now.", 750],
    ["He has said almost everything he came to say. What is left is the last of it, and then a mountain he will not come down from.", 800],
    ["A choice put in front of the whole nation. A charge handed to Joshua. A song meant to outlive everyone in the room. And a blessing, tribe by tribe, before he goes.", 850],
    ["This is the most personal Moses gets in the entire book.", 850],
    ["We are in Deuteronomy 30 through 33.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    deut(30, 1, 10, [
      "Chapter 28 promised the curse. Chapter 30 already assumes it landed. Israel scattered among the nations, and Moses is still not done talking to them.",
      "If they call it to mind out there, and turn back with everything in them, God will turn their captivity and gather them home. Even from the outmost parts of heaven, he says. There is no distance too far for this.",
      "Then one line goes further than repentance. The LORD thy God will circumcise thine heart. Not a scar cut by a knife this time. A change cut into the part of him that keeps saying no.",
      "So the return is never just Israel deciding to try harder. God does the deepest part of the work himself.",
    ]),
    deut(30, 11, 20, [
      "Moses shuts down every excuse before anyone can make it. This commandment is not in heaven, so you cannot say someone needs to go get it for you. It is not beyond the sea either.",
      "The word is very nigh unto thee, in thy mouth, and in thy heart, that thou mayest do it. Not hidden. Not complicated. Close enough to touch.",
      "Then Moses lays it out as plainly as anything gets said in this whole book. I have set before thee this day life and good, and death and evil. Two options, out loud, no fine print.",
      "Therefore choose life. Not a slogan. A command, given to people about to spend the rest of their lives making exactly that choice in small, ordinary decisions.",
    ]),
    deut(31, 1, 13, [
      "Moses is a hundred and twenty years old, and he says it straight. I can no more go out and come in. He is not stepping down quietly. He is naming his own limit out loud.",
      "God has already told him he will not cross the Jordan. So the next thing Moses does is hand the job to someone else, in public, in front of the whole nation.",
      "Be strong and of a good courage. He says it to the people, then he says it again straight to Joshua. Fear not, neither be dismayed. The same courage, passed forward like a torch.",
      "Then he orders the law read out loud to everyone, every seven years, at the Feast of Tabernacles. Men, women, children, the stranger at the gate. So no generation grows up not knowing what it agreed to.",
    ]),
    deut(31, 14, 30, [
      "God calls Moses and Joshua to the tabernacle, and what he says there is not comforting. This people will rise up and go a whoring after the gods of the strangers of the land.",
      "No illusions about how this ends. Then will they turn unto other gods, and serve them, and provoke me, and break my covenant. Said before they have even crossed the river.",
      "So God has Moses write a song and teach it to them, on purpose, as future evidence. This song shall testify against them as a witness. A warning they cannot later claim they never heard.",
      "Moses gathers the elders and does not soften it either. I know thy rebellion, and thy stiff neck. His last public words to Israel's leaders are not sentimental. They are honest.",
    ]),
    deut(32, 1, 27, [
      "Then Moses sings. Give ear, O ye heavens, and I will speak. He calls sky and ground as witnesses, and opens by naming exactly who God is. He is the Rock, his work is perfect. A God of truth and without iniquity.",
      "He remembers what God actually did for them in the wilderness. He found him in a desert land, kept him as the apple of his eye, carried him the way an eagle carries its young on its own wings.",
      "Then the turn. Jeshurun waxed fat, and kicked. Fed on honey from the rock and the finest wheat, and the fullness is exactly what made him forget who fed him. Then he forsook God which made him.",
      "Notice what did the damage. Not famine. Not hardship. Comfort. Forgetting God rarely happens in the desert. It happens once the table is full.",
    ]),
    deut(32, 28, 52, [
      "The song turns to judgment, and God claims something no other god in the ancient world could claim for himself. To me belongeth vengeance, and recompence. I kill, and I make alive; I wound, and I heal.",
      "Every rock the other nations trusted gets named and dismissed in the same breath. For their rock is not as our Rock, even our enemies themselves being judges. There is no second power to appeal to.",
      "Then the song ends, and God speaks to Moses directly, plainly, one more time. Go up into mount Nebo, and behold the land of Canaan. And die in the mount whither thou goest up.",
      "Because ye trespassed against me among the children of Israel at the waters of Meribah. One old failure, still costing him the one thing he has walked forty years to reach. He will see it. He will not enter it.",
    ]),
    deut(33, 1, 29, [
      "Before he goes, Moses blesses the tribes one at a time, by name, the way a father blesses sons before he dies. The LORD came from Sinai, he opens, remembering exactly where all of this started.",
      "Some blessings are short. Let Reuben live, and not die. Some carry an old debt paid in full. Levi gets praised for choosing the covenant over his own family at Massah and Meribah, saying of his own kin, I have not seen him.",
      "Joseph gets the richest language in the whole chapter. The precious things of heaven and the precious things of the earth, blessing piled on blessing for the son who was separated from his brothers.",
      "Then Moses closes with the line people still hold onto three thousand years later. The eternal God is thy refuge, and underneath are the everlasting arms. His very last public words are not a warning. They are a blessing.",
    ]),
  ],
  closing: [
    ["So that is Day 55.", 700],
    ["Life and death, blessing and curse, laid out in plain language and handed straight to them. Joshua commissioned in public. A song written down as a witness against a future Moses will not live to see.", 800],
    ["And underneath all of it, Moses telling them exactly what is coming. I know thy rebellion. He is not guessing. He has watched this exact people for forty years.", 850],
    ["Then he blesses every tribe by name anyway. Knowing what he knows about them, and blessing them anyway.", 850],
    ["Tomorrow, Deuteronomy 34 and Joshua 1 through 3. Moses climbs the mountain one last time, and Joshua picks up what he leaves behind.", 850],
    ["For now, hold on to the choice Moses put in front of them.", 800],
    ["Life and death were both on the table.", 750],
    ["So choose life.", 1200],
  ],
};
