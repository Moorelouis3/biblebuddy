import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 88, written to the Day 1 standard.
 *
 * 2 Kings 2-5 hands the whole story over to Elisha: Elijah is taken up in a
 * whirlwind, a double portion of his spirit falls on the man who wouldn't
 * leave his side, and then four chapters of a prophet who keeps showing up
 * in ordinary kitchens and sickrooms instead of on mountains. Seven blocks
 * across four chapters.
 */

const kings2 = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `2 Kings ${chapter}:${startVerse}-${endVerse}`,
  book: "2 kings",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_EIGHTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 88,
  title: "Elisha's Ministry Begins",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 88. Elijah's story ends today, in a whirlwind, without a funeral.", 750],
    ["Elisha watches it happen and picks up the mantle that falls from him. Literally.", 800],
    ["From here the miracles get smaller and closer. Not fire from the sky. Oil in a jar. A boy's fever. A leper in a river.", 850],
    ["This is what it looks like when a prophet spends his time in ordinary houses instead of on ordinary mountains.", 800],
    ["We are in 2 Kings 2 through 5.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    kings2(2, 1, 14, [
      "Three times Elijah tells Elisha to stay behind, and three times Elisha refuses. As the Lord liveth, and as thy soul liveth, I will not leave thee. He says it at Bethel, at Jericho, and at the Jordan. Loyalty that repeats itself is not an accident.",
      "Everyone else already knows what's coming. The sons of the prophets ask Elisha twice if he knows his master is being taken today. Yea, I know it, he says both times. Hold your peace. He doesn't want to talk about it. He wants to stay close.",
      "Elijah finally asks him what he wants before it happens, and Elisha asks for a double portion of his spirit. Not power for its own sake. He's about to be the only prophet left, and he knows exactly how much he's about to lose.",
      "Then a chariot of fire and horses of fire come between them, and Elijah goes up by a whirlwind. Elisha never gets to say goodbye. He just watches the sky, tears his own clothes, and picks up the mantle that falls from a man who is simply gone.",
    ]),
    kings2(2, 15, 25, [
      "Elisha strikes the Jordan with the fallen mantle and asks one question out loud: where is the Lord God of Elijah? The water parts, and the answer is right there. The power was never Elijah's own to begin with.",
      "The other prophets bow to him, then spend three days searching the hills for Elijah's body against Elisha's advice, because they can't quite believe a man is just taken, whole, with nothing left to bury.",
      "At Jericho he heals a poisoned spring with a handful of salt in a new bowl, and the text makes a point of saying it, healed unto this day. His first public act is fixing something that had been killing people slowly for years.",
      "Then young people from Bethel mock him for being bald, and two bears maul forty-two of them. This is a hard scene, and it should stay hard. Scripture doesn't soften it or explain it away, and neither should you.",
    ]),
    kings2(3, 1, 27, [
      "Jehoram is better than his parents, barely. He removes Baal's image but keeps Jeroboam's golden calves. Partial reform still isn't reform. When Moab rebels after paying tribute in sheep for years, he goes to war with Jehoshaphat and Edom beside him.",
      "Seven days into the march the army runs out of water in the desert, and Jehoram's first instinct is despair. Elisha only agrees to help because Jehoshaphat is standing there. Were it not that I regard the presence of Jehoshaphat, I would not look toward thee.",
      "God fills dry ditches with water overnight with no rain and no wind, water so ordinary it tricks the Moabite army into thinking it's blood in the morning light and charging in for easy plunder instead of a fight they could have avoided.",
      "Israel wins completely. Then the king of Moab, cornered on his own wall, burns his own firstborn son as a sacrifice in full view of the armies, and Israel simply leaves in horror. Some victories end with nobody wanting to celebrate.",
    ]),
    kings2(4, 1, 17, [
      "A widow is about to lose her two sons to a creditor as slaves, and all she has left in the house is one small pot of oil. Elisha doesn't hand her anything. He tells her to borrow every empty jar her neighbors own.",
      "She shuts the door on her whole household and starts pouring. The oil doesn't stop until she runs out of jars to fill. The miracle is exactly the size of her own faith to go ask the neighbors, not one drop bigger.",
      "In Shunem, a woman with means notices Elisha passing through and builds him a small room on her own roof, unasked, just because she recognizes a holy man when she sees one and wants to make room for him.",
      "Elisha wants to repay her kindness, and Gehazi points out what she never once mentioned wanting. She has no child. So Elisha promises her a son by this time next year, and she pushes back immediately. Do not lie to me. She's afraid to hope for something this specific.",
    ]),
    kings2(4, 18, 37, [
      "The promised son is born, grows, and then dies suddenly in his mother's lap in the middle of a workday, complaining of his head. No warning, no illness described. Just gone.",
      "She doesn't wail or tell her husband what happened. She lays the boy on Elisha's own bed, shuts the door, and rides straight for Carmel, telling everyone along the way it is well, before it is anywhere close to well.",
      "She grabs Elisha's feet and won't let go, and when he sends his staff ahead with Gehazi, she refuses to leave without Elisha himself. As the Lord liveth, I will not leave thee. The same vow Elisha once made to Elijah, now made to him.",
      "Elisha shuts himself in with the boy and stretches out over him twice before the child sneezes seven times and opens his eyes. This isn't a quick word from a distance. It costs Elisha real time, alone, pressed against a body that isn't breathing.",
    ]),
    kings2(4, 38, 44, [
      "A famine hits while the sons of the prophets are gathered, and someone tosses wild gourds into the communal pot without knowing what they are. One taste and the whole group is shouting, there is death in the pot, unable to eat.",
      "Elisha doesn't throw the food out. He adds meal to it, and the poison is simply gone. Whatever was wrong with the meal, the fix is smaller than the problem looked.",
      "Then a man brings twenty barley loaves as an offering, and Elisha tells his servant to feed a hundred men with them. The servant asks the obvious question. How is this enough for so many?",
      "Give it to the people, Elisha says, for thus saith the Lord, they shall eat and leave some. They do. Bread multiplying in ordinary hands to feed more people than it should is not a new idea by the time it shows up centuries later on a hillside in Galilee.",
    ]),
    kings2(5, 1, 27, [
      "Naaman is Syria's best general, and he has leprosy. A captured Israelite servant girl, with every reason to hate the man who commands the army that took her from home, tells his wife about the prophet in Samaria anyway. Kindness from the exact person owed none.",
      "Naaman shows up expecting a show, some hand-waving over the wound. Elisha doesn't even come to the door. He sends a message. Wash in the Jordan seven times. Naaman is furious. He came for a miracle and got an instruction he finds beneath him.",
      "It's his own servants who talk him down. If he'd asked you to do some great thing, wouldn't you have done it? Why walk away from an easy one? So he goes and dips seven times, and his skin comes back like a child's. He offers Elisha payment, and Elisha refuses every bit of it.",
      "Gehazi can't let that kind of restraint stand. He chases Naaman down, lies about a need Elisha never mentioned, and pockets silver and clothing for himself. Elisha already knows before Gehazi opens his mouth. The leprosy that just left Naaman's body moves straight onto Gehazi's, permanently.",
    ]),
  ],
  closing: [
    ["So that is Day 88.", 700],
    ["Elijah leaves in a whirlwind, and Elisha spends the rest of the day just picking up what fell.", 750],
    ["No more mountains, no more fire from an open sky. Just a widow's oil, a boy's fever, a poisoned pot, and a leper standing waist-deep in an unimpressive river.", 800],
    ["Elisha's miracles keep happening in kitchens and sickrooms instead of on stages, to people nobody else was paying attention to.", 850],
    ["And Gehazi's story sits right next to Naaman's as a warning. The same power that heals a stranger's skin can, misused, cost a servant his own.", 850],
    ["Naaman came for a spectacle and got an instruction instead. The obedience he almost skipped was the whole miracle.", 800],
    ["Tomorrow, 2 Kings 6 through 9. Rescue in a siege, and Jehu rides in to end a dynasty.", 800],
    ["For now, hold onto the servant girl's kindness.", 750],
    ["Owed nothing.", 700],
    ["Gave everything she had, which was just a name.", 1200],
  ],
};
