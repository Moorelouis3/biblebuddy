import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 79, written to the Day 1 standard.
 *
 * 2 Samuel 12-15 is the sword Nathan promised, arriving one room at a time:
 * a dead infant, a raped daughter, a murdered son, a two-year silence, a
 * false reconciliation, and a rebellion that puts David on the road out of
 * his own capital. Six blocks across four chapters.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Samuel ${chapter}:${startVerse}-${endVerse}`,
  book: "2 samuel",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_SEVENTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 79,
  title: "Consequences in David's House",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 79. Nathan told David a story about a stolen lamb.", 750],
    ["David didn't know he was the man in the story. Then Nathan told him.", 800],
    ["After that, the sword Nathan promised starts moving through David's own house. A dead child. A ruined daughter. A murdered son. A father who won't stop it.", 850],
    ["By the end of today, the king is running from his own son, barefoot, up a hill, weeping.", 850],
    ["We are in 2 Samuel 12 through 15.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(12, 1, 14, [
      "Nathan tells David about a rich man with more flocks and herds than he could count, and a poor man with exactly one lamb, a lamb that ate off his plate and slept in his lap like a daughter. When a traveler shows up, the rich man serves the poor man's lamb instead of touching his own.",
      "David doesn't recognize himself yet. His anger burns, and he pronounces a death sentence and fourfold restitution on a man who, as far as he knows, is a stranger.",
      "Then Nathan says four words that end the performance. Thou art the man. God gave David Saul's house, Saul's wives, the whole kingdom, and would have given more besides. Wherefore hast thou despised the commandment of the Lord, to do evil in his sight?",
      "The sentence matches the crime almost line for line. Thou hast killed Uriah with the sword, so the sword shall never depart from thine house. Thou didst it secretly, so this will happen before all Israel and before the sun. David says one sentence back. I have sinned against the Lord. Nathan answers that the sin is put away, David will not die — but the child born to him will.",
    ]),
    g(12, 15, 31, [
      "The Lord strikes the child, and David fasts, lies all night on the bare ground, and refuses to eat or be raised up by his own elders for seven days straight.",
      "On the seventh day the child dies, and David's servants are too afraid to tell him — they'd watched him ignore every plea while the boy lived and don't know what grief will do to him now. David reads their whispering and asks directly. Is the child dead? They said, He is dead.",
      "Then David gets up off the ground, washes, changes his clothes, goes to the house of the Lord and worships, and finally eats. His servants are stunned. He tells them plainly. While the child was yet alive, I fasted and wept, for I said, who can tell whether God will be gracious to me. But now he is dead. I shall go to him, but he shall not return to me.",
      "David comforts Bathsheba, and Solomon is born — the Lord loved him, and sends word through Nathan to call him Jedidiah. In the same breath, Joab finishes the siege of Rabbah and holds back the final blow so David himself can walk in and take the crown. Mercy and judgment sitting inside the same chapter.",
    ]),
    g(13, 1, 22, [
      "Amnon is sick with wanting his own half-sister Tamar, until his friend Jonadab, a very subtil man, hands him a plan. Fake an illness, ask for Tamar by name, have her cook for you by hand where you can watch.",
      "David sends Tamar to Amnon's house without knowing what he's sending her into. Amnon clears the room, and when she brings him the food he grabs her. Come lie with me, my sister. She begs him by name, not by feeling. Do not force me. No such thing ought to be done in Israel. Speak to the king — he will not withhold me from thee. He is stronger than she, and forces her anyway.",
      "The moment it's over, the text says something worse than the assault itself. Amnon hated her, with a hatred greater than the love he'd had for her, and has her thrown out and the door bolted behind her — a second violation stacked on the first. Tamar tears the royal robe that marked her as a virgin daughter of the king, puts ashes on her head, and walks away crying out loud.",
      "Absalom tells his sister to be quiet — he is thy brother, regard not this thing — and takes her into his own house, desolate. David hears everything and is very angry. And does nothing. Absalom says nothing to Amnon either way, but from that day he hates him.",
    ]),
    g(13, 23, 39, [
      "Two full years pass in total silence. Then Absalom throws a sheep-shearing feast and maneuvers David into sending all the king's sons — David himself declines to come, but Absalom presses until Amnon is sent along with the rest.",
      "Absalom gives his servants one instruction. Watch for the moment Amnon's heart is merry with wine, then strike him. Be courageous. Have not I commanded you? They do exactly that, and the other king's sons scatter on their mules in panic.",
      "A false report reaches David that Absalom has slaughtered every one of his sons. It's Jonadab — the same clever friend who designed Amnon's trap two years earlier — who corrects the king instantly. Only Amnon is dead, and it's been decided since the day Tamar was forced.",
      "Absalom flees to his grandfather's country at Geshur and stays three years. David mourns for Amnon every day. And in the very same verse, the king's heart longs to go out to Absalom. Grief and longing, aimed at two different sons, sitting in one sentence.",
    ]),
    g(14, 1, 33, [
      "Joab sees which way David's heart is leaning and hires a wise woman from Tekoah to act out a parable of her own — a made-up story about two feuding sons, built to trap David into ruling against his own logic before he realizes what he's agreeing to.",
      "David catches part of it. Is not the hand of Joab with thee in all this? He grants the request anyway. Go, bring the young man Absalom again.",
      "But it's only half a homecoming. Let him turn to his own house, and let him not see my face. Absalom lives back in Jerusalem two full years without once being allowed into his father's presence.",
      "Famous across Israel for having no blemish from the sole of his foot to the crown of his head, Absalom finally forces the issue by burning Joab's barley field to get his attention. Joab brings him to the king at last, and David kisses him. It looks like peace. Watch what actually grows out of it.",
    ]),
    g(15, 1, 37, [
      "Absalom gets himself chariots, horses, and fifty men to run ahead of him — the entrance of a king, before he is king of anything — and stations himself at the city gate. Every petitioner who comes for the king's judgment hears the same line from him. Thy matters are good and right, but there is no man deputed of the king to hear thee.",
      "Oh that I were made judge in the land, that every man which hath any suit might come unto me, and I would do him justice. He kisses everyone who bows to him, and the text names exactly what's happening in plain words. So Absalom stole the hearts of the men of Israel.",
      "Under cover of a vow to pay in Hebron, he launches a coordinated uprising — spies planted in every tribe waiting on a trumpet signal, two hundred invited guests from Jerusalem who don't even know what they've walked into, and David's own trusted counselor Ahithophel joining the conspiracy.",
      "A messenger tells David the hearts of Israel are with Absalom now. David doesn't defend the city. He runs — weeping, barefoot, head covered, up the ascent of the Mount of Olives — while men like Ittai the Gittite refuse to leave him. As the Lord liveth, and as my lord the king liveth, surely in what place my lord the king shall be, there also will thy servant be. David sends his friend Hushai back into the collapsing city as one voice he can still trust near the throne.",
    ]),
  ],
  closing: [
    ["So that is Day 79.", 700],
    ["Nathan said the sword would never leave David's house. This is what that looked like from the inside.", 800],
    ["A child David couldn't save by fasting or lying on the ground all night.", 750],
    ["A daughter violated by her own brother, and a father who heard about it and did nothing.", 800],
    ["A son who waited two silent years, then paid Amnon back with murder instead of justice.", 800],
    ["And a homecoming that looked like peace — a kiss — while underneath it Absalom was already stealing the kingdom one petitioner at a time.", 850],
    ["Tomorrow, 2 Samuel 16 through 19. Absalom's rebellion, and how far a father will go for a son who's trying to kill him.", 850],
    ["For now, sit with the words David gave his servants after the fasting ended.", 800],
    ["I shall go to him.", 750],
    ["But he shall not return to me.", 1200],
  ],
};
