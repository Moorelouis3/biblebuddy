import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 264, written to the Day 1 standard.
 *
 * Amos 5 finally offers the invitation the last two days of warning were
 * building toward - seek the LORD and live - then chapter 6 shows exactly
 * who is not listening, and chapter 7 moves from vision to confrontation
 * when a priest tries to shut Amos up in person. Seven blocks: three across
 * Amos 5, two across Amos 6, and two across Amos 7, since 7 splits cleanly
 * into the three visions and the Amaziah scene.
 */

const amos = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Amos ${chapter}:${startVerse}-${endVerse}`,
  book: "amos",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 264,
  title: "Seek the Lord and Live",
  opening: [
    ["Hey. Good to have you back.", 700],
    ["Day 263 ended with a refrain. Five disasters, and after every one of them, yet have ye not returned unto me.", 800],
    ["Today Amos finally says what the returning would actually look like.", 750],
    ["Seek ye me, and ye shall live. Three words, twice, and then a whole chapter showing why almost nobody will do it.", 850],
    ["Then Amos sees three visions in a row, and the third one is different from the first two. Something runs out.", 850],
    ["We are in Amos 5, 6, and 7.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    amos(5, 1, 9, [
      "Hear ye this word which I take up against you, even a lamentation, O house of Israel. Amos opens this chapter singing a funeral song for a nation that has not died yet. He is not predicting. He is grieving in advance.",
      "The virgin of Israel is fallen; she shall no more rise. That is language for a battlefield, and Amos is using it at a moment when the country still thinks it is thriving.",
      "For thus saith the LORD unto the house of Israel, Seek ye me, and ye shall live. After chapters of listed crimes and coming disaster, this is the actual offer. It was never really about the punishment.",
      "Seek him that maketh the seven stars and Orion, and turneth the shadow of death into the morning. Amos points them at the sky and the sunrise before he tells them where not to go looking instead.",
    ]),
    amos(5, 10, 17, [
      "They hate him that rebuketh in the gate, and they abhor him that speaketh uprightly. This is Amos describing his own reception, in real time, inside the very sermon they are hating him for.",
      "Ye have built houses of hewn stone, but ye shall not dwell in them; ye have planted pleasant vineyards, but ye shall not drink wine of them. Every comfort they built on the backs of the poor gets named and then taken back, item by item.",
      "Seek good, and not evil, that ye may live. The same offer as before, just turned from worship language into daily behavior. Seeking God and doing good are not two different assignments.",
      "Wailing shall be in all streets. Amos hears the funeral before it happens, loud enough that even the professional mourners, the ones skilful of lamentation, will have work.",
    ]),
    amos(5, 18, 27, [
      "Woe unto you that desire the day of the LORD! The day of the LORD is darkness, and not light. Some in Israel are actually looking forward to God's judgment, assuming it will fall on their enemies. Amos corrects the address.",
      "As if a man did flee from a lion, and a bear met him. Amos stacks disaster on disaster to make one point. Running from the thing you fear does not guarantee landing somewhere safer.",
      "I hate, I despise your feast days, and I will not smell in your solemn assemblies... but let judgment run down as waters, and righteousness as a mighty stream. God names the exact thing He rejects, worship with no justice under it, and the exact thing He wants instead.",
      "Have ye offered unto me sacrifices and offerings in the wilderness forty years, O house of Israel? But ye have borne the tabernacle of your Moloch. The rhetorical question exposes the real history. Ritual was never the substitute for loyalty God asked for.",
    ]),
    amos(6, 1, 8, [
      "Woe to them that are at ease in Zion, and trust in the mountain of Samaria. Amos names both capitals, north and south, in the same breath. Comfort has made both of them equally unable to see what is coming.",
      "That lie upon beds of ivory, and stretch themselves upon their couches, and eat the lambs out of the flock. Amos lists the furniture and the menu on purpose. This is not a general accusation. It is an inventory.",
      "That chant to the sound of the viol, and invent to themselves instruments of musick, like David. Even their entertainment gets compared to something sacred, and found empty. David wrote for worship. They are writing for background noise.",
      "But they are not grieved for the affliction of Joseph. One line undoes the whole scene. Every comfort just listed sits directly on top of suffering they have simply stopped noticing.",
    ]),
    amos(6, 9, 14, [
      "If there remain ten men in one house, that they shall die. And a man's uncle shall take him up... and shall say, Hold thy tongue: for we may not make mention of the name of the LORD. The devastation gets so total that even grief becomes dangerous to speak out loud.",
      "Shall horses run upon the rock? will one plow there with oxen? Amos asks two things nobody would ever try, because they would break instantly. That is exactly what Israel has done to justice, forcing it into a shape it was never built for.",
      "Ye which rejoice in a thing of nought, which say, Have we not taken to us horns by our own strength? Their confidence is in power they credit entirely to themselves, with no room left for the God who actually gave it.",
      "Behold, I will raise up against you a nation, O house of Israel... and they shall afflict you from the entering in of Hemath unto the river of the wilderness. The threat stops being abstract. Amos names a border-to-border invasion, and everyone listening would know exactly which empire that meant.",
    ]),
    amos(7, 1, 9, [
      "Thus hath the Lord GOD shewed unto me... he formed grasshoppers... Then said I, O Lord GOD, forgive, I beseech thee: by whom shall Jacob arise? for he is small. Amos sees locusts stripping the land bare, and instead of preaching this vision, he begs God to stop it. The LORD repented for this.",
      "The Lord GOD called to contend by fire, and it devoured the great deep. Same pattern. Amos pleads, O Lord GOD, cease, I beseech thee, and again the LORD repented. Twice now, the prophet's intercession is enough to turn back total destruction.",
      "Then he shewed me: and, behold, the Lord stood upon a wall made by a plumbline, with a plumbline in his hand. A plumbline just measures. It does not create the crookedness, it only proves it was already there.",
      "I will set a plumbline in the midst of my people Israel: I will not again pass by them any more. This time Amos does not intercede. The tool has already confirmed what two visions of mercy could not fix.",
    ]),
    amos(7, 10, 17, [
      "Amaziah the priest of Bethel sent to Jeroboam king of Israel, saying, Amos hath conspired against thee... the land is not able to bear all his words. The confrontation stops being about theology. A priest goes straight to the king to get a prophet removed.",
      "Amaziah said unto Amos, O thou seer, go, flee thee away into the land of Judah... prophesy not again any more at Bethel: for it is the king's chapel. Amaziah is not disputing what Amos said. He is objecting to where he said it, because Bethel answers to the throne, not to God.",
      "Then answered Amos, and said to Amaziah, I was no prophet, neither was I a prophet's son; but I was an herdman, and a gatherer of sycomore fruit: and the LORD took me as I followed the flock. Amos has no credentials to defend, only an assignment he did not go looking for.",
      "Therefore thus saith the LORD; Thy wife shall be an harlot in the city, and thy sons and thy daughters shall fall by the sword... and thou shalt die in a polluted land. Amaziah tried to silence the word by removing the messenger. The word answers him back by name.",
    ]),
  ],
  closing: [
    ["So that is Day 264.", 700],
    ["Seek ye me, and ye shall live. That is the whole chapter's real subject, even with all the woe wrapped around it.", 800],
    ["And right next to that offer sits a nation lying on ivory beds, not grieved for the affliction of Joseph. Comfort had made them unable to hear the invitation at all.", 850],
    ["Then two visions where Amos begs, and God relents both times. Locusts, stopped. Fire, stopped.", 800],
    ["But the third vision is just a plumbline. It does not cause anything. It only measures what is already crooked. And this time, no prayer changes the outcome.", 850],
    ["Then a priest tries to solve all of this the easy way, by getting rid of the man saying it. Amos answers him with the plainest resume in the Bible. I was no prophet. I was a herdman. The LORD took me.", 850],
    ["Tomorrow, Amos 8 and 9, then Obadiah 1. A famine of hearing the word itself, and a very old grudge from Edom finally comes due.", 850],
    ["For now, hold the plumbline.", 750],
    ["It did not bend anything.", 700],
    ["It just showed what was already bent.", 1200],
  ],
};
