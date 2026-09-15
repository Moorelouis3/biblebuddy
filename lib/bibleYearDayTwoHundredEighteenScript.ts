import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 218, written to the Day 1 standard.
 *
 * Jeremiah 1-3: Isaiah closes and Jeremiah opens - a prophet called before
 * he is born, shown judgment before it happens, then spends two chapters
 * explaining exactly why. Not a broken rule. A forsaken spring, traded for
 * cracked holes in the ground. Seven blocks across three chapters (81
 * verses).
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Jeremiah ${chapter}:${startVerse}-${endVerse}`,
  book: "jeremiah",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 218,
  title: "Jeremiah's Call and Israel's Unfaithfulness",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 218. New book.", 750],
    ["Isaiah is finished. Today we meet the man who watched Jerusalem fall and had to keep speaking anyway.", 800],
    ["Jeremiah gets called before he is old enough to argue, and he tries to argue anyway.", 800],
    ["Before we are out of chapter one, we already know judgment is coming. The rest of the book is God explaining exactly why.", 850],
    ["We are in Jeremiah 1, 2, and 3.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(1, 1, 10, [
      "Jeremiah, son of Hilkiah, a priest from Anathoth. The word of the Lord comes to him in the days of King Josiah, and it will not stop coming for the next forty years.",
      "Before I formed thee in the belly I knew thee, and before thou camest forth out of the womb I sanctified thee, and I ordained thee a prophet unto the nations. Jeremiah is not chosen for this. He is assigned to it, before he exists.",
      "And he argues immediately. Ah, Lord God, behold, I cannot speak, for I am a child. The most honest first response in the whole book.",
      "God does not talk him out of being young. Say not, I am a child. Go wherever I send thee. Speak whatever I command thee. I have put my words in thy mouth. The job was never about his talent. It was about who sent him.",
    ]),
    g(1, 11, 19, [
      "Two visions, and God asks what Jeremiah sees instead of just telling him. First, a branch of an almond tree. Thou hast well seen, God says, for I will hasten my word to perform it. The word is already moving.",
      "Second, a boiling pot, tipping over from the north. Out of the north an evil shall break forth upon all the inhabitants of the land. And it is named exactly, not random cruelty. They have forsaken me, and burned incense unto other gods, and worshipped the works of their own hands.",
      "Then the commission turns hard. Gird up thy loins, and arise. Be not dismayed at their faces, lest I confound thee before them. The fear only gets to run one direction.",
      "I have made thee this day a defenced city, an iron pillar, and brasen walls, against the whole land - kings, princes, priests, people, all of it. They shall fight against thee, but they shall not prevail. For I am with thee, saith the Lord, to deliver thee.",
    ]),
    g(2, 1, 13, [
      "God does not open the case with anger. He opens with a memory. I remember thee, the kindness of thy youth, the love of thine espousals, when thou wentest after me in the wilderness. Like remembering a wedding day.",
      "Then the turn. I brought you into a plentiful land, and you defiled it. Even the priests never asked, Where is the Lord? The prophets prophesied by Baal and walked after things that do not profit.",
      "And the charge, named as two crimes, not one. My people have committed two evils. They have forsaken me the fountain of living waters, and hewed them out cisterns, broken cisterns, that can hold no water.",
      "Say the picture plainly. A spring that never runs dry, against a hole you dig yourself that leaks everything you pour into it. Judah picked the hole, and kept digging more.",
    ]),
    g(2, 14, 28, [
      "God moves to pictures that do not flatter anyone. A wild donkey in heat, sniffing the wind, nobody has to chase her, she goes looking on her own.",
      "Also a vine God planted himself, wholly a right seed, that turned wild anyway. Not corrupted from outside. Degenerated from what it was supposed to be.",
      "And the strangest line in the chapter. They say to a piece of wood, thou art my father, and to a stone, thou hast brought me forth. Then trouble comes and they run back to the real God saying, arise, and save us.",
      "God's answer has no comfort in it. Where are thy gods that thou hast made thee? Let them arise, if they can save thee. According to the number of thy cities are thy gods, O Judah. That many gods, and not one shows up.",
    ]),
    g(2, 29, 37, [
      "God asks a question that should stop you cold. Have I been a wilderness unto Israel? A land of darkness? In other words - did I fail you first?",
      "Then a comparison built to sting. Can a maid forget her ornaments, or a bride her attire? Yet my people have forgotten me days without number. Nobody forgets their own wedding day. They forgot him for years.",
      "And there is no guilt in it. Because I am innocent, surely his anger shall turn from me. That is what they are actually telling themselves, quoted directly.",
      "So they run to Egypt, then to Assyria, looking for someone else to save them. And God says you will be ashamed of this one too, the same way you were ashamed of the last one, because I have rejected the very people you are trusting instead of me.",
    ]),
    g(3, 1, 13, [
      "Jeremiah opens with a law everyone knew. If a man divorces his wife and she becomes another man's, he cannot take her back - it would pollute the land. Then God breaks his own logic. Yet return again to me, saith the Lord. Mercy overriding the rule mercy would normally require.",
      "Then the family history. Israel, the northern kingdom, was already sent away with a bill of divorce for exactly this.",
      "And Judah watched the whole thing happen, then did it anyway, just quieter. Feignedly, the word says. Going through the motions. Never turning with a whole heart.",
      "And still, only one thing is asked. Not payment. Not proving anything first. Only acknowledge thine iniquity, that thou hast transgressed against the Lord thy God.",
    ]),
    g(3, 14, 25, [
      "Even after all of it, God says, I am married unto you. Present tense. Still standing in it. And he promises a future so full that the ark of the covenant itself will not even be missed, because the whole city becomes the place he sits.",
      "Then he says out loud what he wanted from the very beginning. Thou shalt call me, My father. Not a system of sacrifices. A family. And he names how it actually went instead. As a wife treacherously departeth from her husband, so have ye dealt treacherously with me.",
      "You can hear it start to turn. A voice heard upon the high places, weeping, people finally saying it out loud. They have perverted their way, and they have forgotten the Lord their God.",
      "The chapter ends where real repentance always ends. Not with an excuse. We lie down in our shame, and our confusion covereth us, for we have sinned against the Lord our God, we and our fathers, and have not obeyed.",
    ]),
  ],
  closing: [
    ["So that is Day 218.", 700],
    ["Jeremiah's first day on the job, and it is already the whole book in miniature.", 750],
    ["A God who calls him before he is born, shows him what is coming before it happens, and then spends two straight chapters explaining exactly why.", 800],
    ["Not because Judah broke a rule. Because they left a spring of living water for holes in the ground that cannot hold anything.", 800],
    ["And even after the wild donkey, the fake gods, the divorce, God still says the door is open. Only acknowledge thine iniquity.", 850],
    ["That is the whole ask. Not fixing yourself first. Just telling the truth about where you are.", 800],
    ["Tomorrow, Jeremiah 4 through 6. The judgment gets specific, and so does the grief.", 850],
    ["For now, hold onto the picture God chose for himself.", 750],
    ["A fountain. Not a cistern.", 750],
    ["Living water, waiting.", 1200],
  ],
};
