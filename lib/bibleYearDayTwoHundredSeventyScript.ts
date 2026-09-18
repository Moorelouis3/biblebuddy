import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 270, written to the Day 1 standard.
 *
 * Nahum finishes what he started on Day 269: Nineveh's siege, fall, and the
 * question nobody survives, "who will bemoan her?" Then a new book opens on
 * the opposite problem. Habakkuk does not preach at a wicked nation. He
 * argues with God about one. Seven blocks: two closing Nahum 2, three across
 * Nahum 3, two opening Habakkuk 1.
 */

const nahumTwo = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Nahum 2:${startVerse}-${endVerse}`,
  book: "nahum",
  chapter: 2,
  startVerse,
  endVerse,
  teaching,
});

const nahumThree = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Nahum 3:${startVerse}-${endVerse}`,
  book: "nahum",
  chapter: 3,
  startVerse,
  endVerse,
  teaching,
});

const habakkuk = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Habakkuk 1:${startVerse}-${endVerse}`,
  book: "habakkuk",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_SCRIPT: BibleYearDayScript = {
  dayNumber: 270,
  title: "Nineveh Falls and Habakkuk Questions",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 270. Nineveh is under siege, and Nahum narrates it almost like he is standing on the wall watching it happen.", 800],
    ["Chariots in the streets. Gates thrown open. A city that spent a century terrifying everyone else now begging someone, anyone, to feel sorry for it.", 800],
    ["Then a new prophet opens his book, and he is not preaching at a nation at all. He is arguing with God.", 850],
    ["Habakkuk looks at violence everywhere and asks why God is silent about it. God answers. And the answer is worse than the silence.", 850],
    ["We are in Nahum 2 and 3, and Habakkuk 1.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    nahumTwo(1, 7, [
      "The chapter opens mid-siege. He that dasheth in pieces is come up before thy face. Watch the way, brace the gates, this is happening now.",
      "The attacking army is described almost lovingly by Nahum. Shields dyed red, chariots like flaming torches, running like lightning through the streets.",
      "And inside the walls, it is already falling apart. The gates of the rivers shall be opened, and the palace shall be dissolved. The queen herself, Huzzab, is led away, her maids moaning like doves.",
      "This is the same empire that once heard Jonah's warning and repented in sackcloth. That memory is generations old now. Repentance does not stay effective by itself.",
    ]),
    nahumTwo(8, 13, [
      "Nineveh is like a pool of water, Nahum says, and its people are draining out of it. Stand, stand, they cry. But nobody looks back. They are already gone.",
      "Take the spoil of silver, take the spoil of gold. The wealth this city hoarded for a hundred years gets carried off in an afternoon.",
      "Then Nahum asks where the lions' den went. Nineveh had loved that image of itself, a lion tearing prey for its cubs, filling its hole with what it killed.",
      "Behold, I am against thee, saith the Lord of hosts. Four words from God erase an empire's whole self-image. Not I am against your army. I am against thee.",
    ]),
    nahumThree(1, 7, [
      "Woe to the bloody city. Full of lies and robbery. The prey does not even leave, Nahum says, because there is always more to take.",
      "Then the sound of it. The noise of a whip, the rattling of wheels, the prancing horses, a multitude of slain, no end to the corpses, people stumbling over their own dead.",
      "Nahum names the reason underneath the violence. The whoredoms of the well-favored harlot, the mistress of witchcrafts, that sold nations through her sorceries. Nineveh built an empire on selling people out.",
      "I am against thee, saith the Lord of hosts, again. This time the punishment matches the crime exactly. I will show the nations your shame, the same shame Nineveh sold everyone else for profit.",
    ]),
    nahumThree(8, 13, [
      "Are you better than No, Nahum asks, naming Thebes, the great Egyptian city everyone assumed was untouchable. Rivers around it, the sea as its rampart, Ethiopia and Egypt as its strength.",
      "Yet she was carried away. Her children were dashed in pieces at the top of every street. Her great men were bound in chains and gambled away like coins.",
      "So Nahum tells Nineveh, you too will be drunk and hidden, hunting for strength you no longer have. Your strongholds are fig trees. Shake them once, and the ripe fruit falls straight into the eater's mouth.",
      "Behold, thy people in the midst of thee are women, he says, meaning the fight is already gone out of them. The gates stand wide open before the enemy even arrives.",
    ]),
    nahumThree(14, 19, [
      "Draw water for the siege, Nahum tells them, almost mocking. Fortify your strongholds. Go into the clay, tread the mortar, make the brick kiln strong. None of it will hold.",
      "The fire will devour you there anyway, the sword will cut you off, it will eat you like the cankerworm eats a field. Multiply yourselves like locusts, he says. It will not save you.",
      "Your merchants outnumbered the stars, and still the cankerworm strips everything and flies off with it. Your crowned princes camp in the hedges like grasshoppers, and the moment the sun gets hot they vanish, and no one knows where they went.",
      "Thy shepherds slumber, O king of Assyria. There is no healing for your wound. And everyone who hears the news claps their hands, because your cruelty passed over every single one of them at some point. Not one mourner left.",
    ]),
    habakkuk(1, 11, [
      "A new prophet, a completely different complaint. O Lord, how long shall I cry, and you will not hear? I cry out to you of violence, and you will not save.",
      "Habakkuk is not accusing pagans. He is watching his own people. Why do you show me iniquity and make me look at trouble? The law is slacked, justice never goes out, because the wicked surround the righteous and twist every judgment.",
      "God answers, and it is not comfort. Look among the nations, be utterly astounded, because I am doing something you would not believe if I told you. I am raising up the Chaldeans.",
      "That bitter, hasty nation, terrible and dreadful, horses faster than leopards, fiercer than wolves at evening, flying in like an eagle after food, coming only for violence, scoffing at kings, laughing off every fortress. God's answer to injustice at home is a worse nation from somewhere else.",
    ]),
    habakkuk(12, 17, [
      "Habakkuk does not stop at the first answer. Art thou not from everlasting, O Lord my God, mine Holy One? We shall not die. You appointed them for judgment. You established them for correction.",
      "Then he presses harder, and this is the real question underneath the whole book. You are of purer eyes than to behold evil, and cannot look on iniquity. So why do you stay quiet while the wicked swallows up someone more righteous than himself?",
      "He pictures God's own justice like a fisherman's cruelty. Men made like fish with no one to rule over them, hauled up with a hook, caught in a net, gathered in a drag.",
      "And then the Chaldeans worship the net instead of the God who let them use it. They sacrifice to their net, burn incense to their drag, because through it their portion is fat and their food is plentiful. Shall they keep emptying that net, Habakkuk asks, and never stop slaughtering nations to fill it?",
    ]),
  ],
  closing: [
    ["So that is Day 270.", 700],
    ["Nineveh spent Nahum's whole book falling. Not to a stronger empire's clever strategy. To four words. I am against thee.", 800],
    ["A city that once repented under Jonah forgot what that repentance cost, and there was no third warning this time.", 800],
    ["Then Habakkuk opens with a question you have probably asked yourself. How long do I cry to you about the wrong I see, and hear nothing back?", 850],
    ["God does answer him. Just not with comfort. I am raising up the Chaldeans. Sometimes the answer to why is God is already moving, and you will not like how.", 850],
    ["Habakkuk does not go quiet after that. He pushes back again. You are too pure to look at evil. So why do you let the wicked swallow someone better than himself?", 850],
    ["That question does not get answered today. Habakkuk has to keep waiting for it, and so do you.", 800],
    ["Tomorrow, Habakkuk 2 and 3, and the start of Zephaniah. The answer starts to come, and it changes what faith even means.", 850],
    ["For now, sit with Habakkuk's honesty.", 750],
    ["He argued with God, and God let him.", 1200],
  ],
};
