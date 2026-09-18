import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 307, written to the Day 1 standard.
 *
 * John 16-18 moves from promise to prayer to arrest: the Spirit is coming,
 * Jesus prays out loud for people who don't exist yet, and then he walks
 * straight into a garden his betrayer already knows by heart. Seven blocks,
 * matching Day 303 through Day 306.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `John ${chapter}:${startVerse}-${endVerse}`,
  book: "john",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SEVEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 307,
  title: "Spirit, Prayer, and Arrest",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 307. Jesus finishes talking and starts walking straight toward the men coming to arrest him.", 800],
    ["He prays out loud for the friends who are about to scatter, then he goes to a garden his betrayer already knows by heart.", 850],
    ["He already told them: in the world you'll have trouble. Tonight is where that starts.", 850],
    ["By the end of today he's been arrested, denied three times by his closest friend, and stood in front of a Roman governor asking what truth even is.", 900],
    ["We are in John 16, 17, and 18. A promise of the Spirit, a prayer for people who don't exist yet, and the night everything gets taken from him.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(16, 1, 15, [
      "These things have I spoken unto you, that ye should not be offended. He's warning them now so the shock doesn't wreck their faith later. They shall put you out of the synagogues; the time cometh, that whosoever killeth you will think that he doeth God service. Religious people will kill his followers and call it worship.",
      "It is expedient for you that I go away: for if I go not away, the Comforter will not come unto you; but if I depart, I will send him unto you. His leaving isn't a loss to manage. It's the condition for what comes next.",
      "When he is come, he will reprove the world of sin, and of righteousness, and of judgment. Of sin, because they believe not on me. The world's real problem was never a shortage of rules. It's unbelief.",
      "Howbeit when he, the Spirit of truth, is come, he will guide you into all truth. He shall not speak of himself, but whatsoever he shall hear, that shall he speak. He shall glorify me. The Spirit doesn't build his own following. He points at Jesus.",
    ]),
    g(16, 16, 33, [
      "A little while, and ye shall not see me: and again, a little while, and ye shall see me. The disciples are confused and start asking each other what he means. He knows it, and doesn't over-explain. He just tells them what's coming.",
      "Ye shall weep and lament, but the world shall rejoice: and ye shall be sorrowful, but your sorrow shall be turned into joy. A woman in travail has sorrow, because her hour is come, but as soon as she is delivered of the child, she remembers no more the anguish. The grief is real. It isn't the end of the story.",
      "Whatsoever ye shall ask the Father in my name, he will give it you. Hitherto have ye asked nothing in my name: ask, and ye shall receive, that your joy may be full. He's handing them a door that's about to open, before they've even walked through it.",
      "Behold, the hour cometh, that ye shall be scattered, every man to his own, and shall leave me alone: and yet I am not alone, because the Father is with me. In the world ye shall have tribulation: but be of good cheer; I have overcome the world. He names his own coming abandonment and calls it victory in the same breath.",
    ]),
    g(17, 1, 19, [
      "These words spake Jesus, and lifted up his eyes to heaven, and said, Father, the hour is come; glorify thy Son. This isn't a private moment he hides from them. He prays it out loud, with them standing right there listening.",
      "This is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent. I have glorified thee on the earth: I have finished the work which thou gavest me to do. He calls it finished before the cross even happens, because in his mind it's already as good as done.",
      "I pray for them: I pray not for the world, but for them which thou hast given me; for they are thine. Holy Father, keep through thine own name those whom thou hast given me, that they may be one, as we are. His last request before the arrest is their unity, not their safety.",
      "I pray not that thou shouldest take them out of the world, but that thou shouldest keep them from the evil. Sanctify them through thy truth: thy word is truth. He doesn't ask God to remove them from the hard place. He asks God to protect them inside it.",
    ]),
    g(17, 20, 26, [
      "Neither pray I for these alone, but for them also which shall believe on me through their word. He's praying for you specifically, centuries before you existed, through nothing but the word these eleven men are about to carry.",
      "That they all may be one; as thou, Father, art in me, and I in thee, that they also may be one in us: that the world may believe that thou hast sent me. The unity he's asking for isn't for comfort. It's evidence, meant to convince a watching world.",
      "Father, I will that they also, whom thou hast given me, be with me where I am; that they may behold my glory. He isn't just asking God to save them. He's asking for them to be with him, specifically, by name, forever.",
      "O righteous Father, the world hath not known thee: but I have known thee, and these have known that thou hast sent me. I have declared unto them thy name, and will declare it, that the love wherewith thou hast loved me may be in them, and I in them. The prayer ends where it started. Love, passed all the way down.",
    ]),
    g(18, 1, 14, [
      "Jesus goes with his disciples over the brook Cedron into a garden, and Judas knows exactly where to find him, because Jesus often met there. He doesn't run. He goes to the place his betrayer already knows.",
      "Judas arrives with a band of men and officers carrying lanterns and torches and weapons, to arrest one man who was never hiding. Jesus asks them, Whom seek ye? They answer, Jesus of Nazareth. He says, I am he, and they go backward and fall to the ground. His arrest starts with the arresting party on the ground.",
      "Peter draws a sword and cuts off the high priest's servant's ear. Jesus tells him, Put up thy sword into the sheath: the cup which my Father hath given me, shall I not drink it? Peter is trying to fight for a rescue Jesus already refused.",
      "They take Jesus, bind him, and lead him first to Annas, father-in-law to Caiaphas, the high priest that same year, the one who'd already said it was expedient that one man should die for the people. The trial is rigged before it starts.",
    ]),
    g(18, 15, 27, [
      "Peter follows at a distance and gets into the high priest's courtyard through another disciple who knew the household. A servant girl asks him, Art not thou also one of this man's disciples? He saith, I am not. First denial, and it comes from a doorkeeper, not a soldier.",
      "Meanwhile the high priest questions Jesus about his disciples and his doctrine. Jesus answers, I spake openly to the world; in secret have I said nothing. Why askest thou me? Ask them which heard me. An officer strikes him for it. Jesus doesn't flinch. If I have spoken evil, bear witness of the evil: but if well, why smitest thou me?",
      "Peter is standing by the fire warming himself, and they ask him again. He denies it again. John doesn't soften it or explain it away. He just records it happening, twice, while Jesus stands bound a few feet away.",
      "A relative of the man whose ear Peter cut off asks, Did not I see thee in the garden with him? Peter denies it a third time, and immediately the cock crew. The exact word Jesus spoke at the table is landing in real time.",
    ]),
    g(18, 28, 40, [
      "They lead Jesus to Pilate's judgment hall, and the leaders themselves won't go inside, so they won't be defiled and can still eat the Passover. They can hand an innocent man over to die and still worry about ceremonial cleanliness on the same morning.",
      "Pilate asks if he is the King of the Jews. Jesus answers, My kingdom is not of this world: if my kingdom were of this world, then would my servants fight, that I should not be delivered to the Jews: but now is my kingdom not from hence. He isn't denying the throne. He's describing a different kind of one.",
      "To this end was I born, and for this cause came I into the world, that I should bear witness unto the truth. Every one that is of the truth heareth my voice. Pilate saith unto him, What is truth? and doesn't wait around for an answer.",
      "Pilate finds no fault in him and still offers the crowd a choice: release Jesus, or release Barabbas, a robber. Then cried they all again, saying, Not this man, but Barabbas. Given a straight choice between the innocent one and the guilty one, the crowd picks the guilty one.",
    ]),
  ],
  closing: [
    ["So that is Day 307.", 700],
    ["A promise that the Spirit is coming, so his leaving isn't actually a loss.", 750],
    ["A prayer, prayed out loud, asking not for their comfort but for their unity — and for you, by name, though he never met you.", 800],
    ["A garden where the arresting party hits the ground before they even lay a hand on him.", 800],
    ["Peter's sword put away, and Peter's own voice denying him three times before the sun comes up.", 850],
    ["And a governor asking what truth is, while truth is standing right in front of him.", 850],
    ["Tomorrow, John 19 through 21. The cross, the empty tomb, and a fire on the beach where Jesus asks Peter the same question three times.", 850],
    ["For now, carry his answer to Pilate.", 800],
    ["My kingdom is not of this world.", 1200],
  ],
};
