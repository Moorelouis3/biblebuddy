import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 359, written to the Day 1 standard.
 *
 * Revelation 2-4: five real letters to five real churches, each one ending
 * with the same phrase - to the one who overcomes - and then a door opens
 * in heaven and the letters get set down next to the throne they came from.
 * Six blocks: two paired letters, three solo letters, then the throne room.
 */

const rev = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Revelation ${chapter}:${startVerse}-${endVerse}`,
  book: "revelation",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 359,
  title: "Churches Warned and Heaven Opened",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 359.", 700],
    ["Today Jesus walks into five churches he knows by name and says exactly what he sees.", 800],
    ["Some of it is hard to hear.", 900],
    ["Then the scene breaks wide open. A door stands open in heaven, and John gets pulled straight into the throne room.", 900],
    ["Revelation 2 through 4.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    rev(2, 1, 11, [
      "Jesus opens with real praise. Ephesus works hard, will not put up with evil people, and has tested false apostles and caught them lying. That is not nothing.",
      "Then he says the one thing that undoes all of it. You have left your first love. They kept every rule and lost the relationship the rules were supposed to protect.",
      "Smyrna gets no correction at all, only comfort. Jesus already knows their poverty, and calls them rich anyway. Do not fear what you are about to suffer, he says. Be faithful to death, and I will give you the crown of life.",
      "Put those two side by side. A church with everything in order and no love left in it. A church with nothing but its own poverty, and Jesus is the one calling it rich.",
    ]),
    rev(2, 12, 29, [
      "Pergamos lives where Satan's throne is, Jesus says, and they have not denied his name, not even when Antipas was killed for it there. That took real nerve.",
      "But some in the church hold to Balaam's teaching, the old trick of pulling God's people into compromise instead of fighting them head on. A few false teachers inside can do more damage than persecution outside ever could.",
      "Thyatira gets praised for love, faith, service, and patience, and told they are doing more now than when they started. Then the same problem, worse. They tolerate a woman Jesus calls Jezebel, teaching his servants to sin, and she was given time to repent and would not take it.",
      "Jesus says he searches hearts and minds, and gives back to each person exactly what their deeds deserve. To the rest, who never followed her, he asks nothing more than to hold on to what they already have until he comes.",
    ]),
    rev(3, 1, 6, [
      "Sardis has a name for being alive, and Jesus says flatly, you are dead. Nobody outside that church could have told them that. It took him.",
      "Wake up, he says. Strengthen what little is left before it dies too. I have not found your works complete before my God.",
      "But even here, a few names have not stained their clothes, and Jesus says they will walk with him, dressed in white.",
      "He promises never to blot their names out of the book of life, and to say their name out loud in front of his Father. A church can go dead. A person inside it does not have to go with it.",
    ]),
    rev(3, 7, 13, [
      "Philadelphia has almost no strength left, Jesus says, and no complaint follows that line. Just this. You have kept my word, and you have not denied my name.",
      "I have set an open door in front of you, he says, and no one can shut it. Small and weak was never the same thing as forgotten.",
      "Because you kept my command to endure, he says, I will keep you from the hour of testing coming on the whole world. Hold on to what you have, so no one takes your crown.",
      "He promises to make them a pillar in the temple of his God, permanent, and to write on them the name of his God and the name of the new Jerusalem. Every other church in this chapter gets a warning. Philadelphia just gets promises.",
    ]),
    rev(3, 14, 22, [
      "Laodicea is the only church here with nothing good said about it, and Jesus tells them exactly why. You are lukewarm, neither cold nor hot, and I am about to spit you out of my mouth.",
      "They call themselves rich, and needing nothing. Jesus calls them wretched, pitiful, poor, blind, and naked. They cannot see their own condition at all.",
      "So he tells them what they actually need. Gold refined in the fire. White clothes to cover a shame they cannot see. Salve for eyes that do not work.",
      "Then the line everyone knows, and it lands softer than the rest of the letter. Behold, I stand at the door and knock. He is not breaking it down. He is asking to be let back into his own church.",
    ]),
    rev(4, 1, 11, [
      "The tone breaks completely here. A door stands open in heaven, and a voice like a trumpet says, come up here. John is pulled straight out of the seven letters and into the throne room itself.",
      "He sees someone on the throne who looks like jasper and carnelian, with a rainbow like an emerald wrapped around it, and twenty-four elders in white robes wearing gold crowns.",
      "Four living creatures, covered in eyes, never stop saying the same three words. Holy, holy, holy, Lord God Almighty, who was, and is, and is to come.",
      "Every time they say it, the twenty-four elders fall down, lay their crowns in front of the throne, and say, you are worthy, because you created all things, and by your will they exist.",
    ]),
  ],
  closing: [
    ["So that's Day 359.", 700],
    ["Five letters and a throne room.", 800],
    ["Ephesus worked hard and forgot why. Smyrna had nothing and got called rich. Pergamos held the line in public and let it slide in private. Thyatira grew in love and tolerated evil at the same time.", 850],
    ["Sardis looked alive and was already dead. Philadelphia was weak and got promised everything. Laodicea felt fine, and it was the one Jesus could not stand.", 850],
    ["Every single letter ends the same way. To the one who overcomes.", 800],
    ["Then the door opens, and all of it gets set down next to the throne it was written from.", 850],
    ["Tomorrow, Revelation 5 through 7. A scroll nobody can open, and a Lamb who can.", 850],
    ["For now, hold on to the door.", 750],
    ["He is not breaking it down.", 750],
    ["He is knocking.", 1200],
  ],
};
