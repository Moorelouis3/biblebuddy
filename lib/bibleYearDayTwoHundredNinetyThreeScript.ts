import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 293, written to the Day 1 standard.
 *
 * Mark's Gospel ends the way it has moved the whole way through: fast,
 * plain, almost breathless. A woman anoints him for burial before anyone
 * else understands he is dying. Every man closest to him fails him in some
 * way before morning. And then the stone is already rolled away. Seven
 * blocks across Mark 14, 15, and 16.
 */

const markFourteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 14:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 14,
  startVerse,
  endVerse,
  teaching,
});

const markFifteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 15:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 15,
  startVerse,
  endVerse,
  teaching,
});

const markSixteen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 16:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 16,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 293,
  title: "Jesus' Death and Resurrection",
  opening: [
    ["Hey. Thank you for being here for this one.", 750],
    ["Day 293.", 700],
    ["A woman pours out a year's wages in perfume on his head, and he says she is preparing him for burial. Nobody else in the room understands that yet.", 850],
    ["Before the sun rises again, every man who swore he would die with him has run, or lied, or both.", 850],
    ["Then a cross. Then a tomb. Then, impossibly, an empty one.", 900],
    ["We are in Mark 14, 15, and 16. This is the end of Mark's Gospel.", 750],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    markFourteen(1, 11, [
      "The chief priests and scribes are already plotting to kill Jesus by craft, just not during the feast, lest the people riot. Two days out from Passover, the machinery is already moving.",
      "In Bethany, a woman breaks open an alabaster box of very costly ointment and pours it on his head. Some in the room are indignant. Why this waste? This might have been sold for more than three hundred pence and given to the poor.",
      "Jesus stops them cold. Let her alone. She hath wrought a good work on me. Ye have the poor with you always, and whensoever ye will ye may do them good, but me ye have not always. She has done what she could. She has anointed his body beforehand for the burying.",
      "Verily I say unto you, wherever this gospel is preached in the whole world, what she has done will be told as a memorial of her. Right after that verse, Judas Iscariot goes to the chief priests to sell him. One person gives everything she has. One gives him away for money. Both happen in the same room, on the same day.",
    ]),
    markFourteen(12, 31, [
      "The disciples prepare the Passover exactly as Jesus directs, down to a man carrying a pitcher of water they are told to follow. As they eat, Jesus says plainly, one of you shall betray me, even he that eateth with me. Woe to that man. Good were it for that man if he had never been born.",
      "Then he takes bread, blesses it, breaks it, and says, take, eat, this is my body. He takes the cup and says, this is my blood of the new testament, which is shed for many. He is naming his own death at the same table where they are eating.",
      "After they sing a hymn and go out to the Mount of Olives, Jesus tells them all of you will be offended because of me tonight, for it is written, I will smite the shepherd, and the sheep shall be scattered.",
      "Peter insists, although all shall be offended, yet will not I. Jesus tells him plainly, this day, even in this night, before the cock crow twice, thou shalt deny me thrice. Peter says he would rather die with him. He means it when he says it. That is what makes what comes later so hard to watch.",
    ]),
    markFourteen(32, 52, [
      "In Gethsemane, Jesus takes Peter, James, and John further in and begins to be sore amazed and very heavy. My soul is exceeding sorrowful unto death. Abba, Father, all things are possible unto thee, take away this cup from me. Nevertheless not what I will, but what thou wilt.",
      "Three times he comes back and finds them sleeping. Simon, sleepest thou? Couldest not thou watch one hour? Watch ye and pray, lest ye enter into temptation. The spirit truly is ready, but the flesh is weak. He says it gently. He is not surprised by them.",
      "Then he says, rise up, let us go, lo, he that betrayeth me is at hand. Judas arrives with an armed crowd from the chief priests, kisses him as the prearranged signal. Master, master, and kissed him. That is how they find him in the dark. Not by force. By a kiss.",
      "Someone draws a sword and cuts off a servant's ear. Jesus asks them, are ye come out as against a thief, with swords and staves to take me? I was daily with you in the temple teaching, and ye took me not. But the scriptures must be fulfilled. Then all of them forsake him and flee. Every single one.",
    ]),
    markFourteen(53, 72, [
      "Before the high priest and the whole council, they look for testimony against him and cannot find any that agrees. False witnesses finally claim he said he would destroy the temple and rebuild another in three days, and even that testimony does not agree.",
      "The high priest asks him directly, art thou the Christ, the Son of the Blessed? Jesus answers, I am, and ye shall see the Son of man sitting on the right hand of power, and coming in the clouds of heaven. The high priest tears his own clothes and calls it blasphemy. They all condemn him to death, then spit on him and strike him and tell him to prophesy who hit him.",
      "Down in the courtyard, Peter is warming himself at a fire. A servant girl says, thou also wast with Jesus of Nazareth. I know not, neither understand I what thou sayest, he says, and moves toward the porch.",
      "She points him out again, and he denies it a second time. Then bystanders say, surely thou art one of them, for thou art a Galilaean. He begins to curse and swear, I know not this man of whom ye speak. Immediately the cock crows the second time, and Peter remembers the word Jesus said to him, and when he thought thereon, he wept.",
    ]),
    markFifteen(1, 20, [
      "At dawn they bind Jesus and hand him to Pilate. Art thou the King of the Jews? Thou sayest it, Jesus answers. The chief priests accuse him of many things, and Jesus answers nothing more at all, so that Pilate marvels.",
      "It was custom to release one prisoner at the feast. The crowd asks for Barabbas, a man in prison for murder committed during an insurrection, instead of Jesus. Pilate asks what he should do then with the one they call King of the Jews. Crucify him, they shout. Why, what evil hath he done? They only shout it louder.",
      "Pilate, wanting to satisfy the crowd, releases Barabbas and delivers Jesus to be scourged and crucified. A guilty man walks free. An innocent one takes his place. That trade is the whole point, not an accident in the story.",
      "The soldiers dress him in purple, twist a crown of thorns onto his head, and mock him on their knees. Hail, King of the Jews. They strike him with a reed and spit on him. Then they take the robe off, put his own clothes back on him, and lead him out to be crucified.",
    ]),
    markFifteen(21, 47, [
      "Simon of Cyrene is pulled from the road and made to carry the cross. They bring Jesus to Golgotha, the place of a skull, offer him wine mixed with myrrh, and he will not take it. They crucify him and divide his clothes by casting lots, at the third hour. The sign over his head reads, THE KING OF THE JEWS. Two thieves hang on either side of him.",
      "Those who pass by mock him, wagging their heads. He saved others, himself he cannot save. Let Christ the King of Israel descend now from the cross, that we may see and believe. Even the men dying beside him join in.",
      "At the sixth hour darkness covers the whole land until the ninth hour. Then Jesus cries out with a loud voice, Eloi, Eloi, lama sabachthani, my God, my God, why hast thou forsaken me? Someone runs to give him vinegar on a sponge. Jesus cries out again and gives up the ghost.",
      "At that exact moment, the veil of the temple is torn in two, from the top to the bottom. A Roman centurion standing right there says, truly this man was the Son of God. Joseph of Arimathaea asks Pilate for the body, wraps it in linen, and lays it in a tomb cut out of rock, with a stone rolled against the door. Two women watch and see exactly where he is laid.",
    ]),
    markSixteen(1, 20, [
      "When the sabbath is over, Mary Magdalene, Mary the mother of James, and Salome buy spices to anoint him. Very early on the first day of the week, at sunrise, they walk to the tomb asking each other, who shall roll us away the stone? It was very great.",
      "They arrive to find it already rolled away. Inside, a young man in a white robe tells them, be not affrighted, ye seek Jesus of Nazareth, which was crucified. He is risen. He is not here. Go, tell his disciples, and Peter, that he goes before you into Galilee. They flee the tomb trembling and amazed, and at first say nothing to anyone, because they are afraid.",
      "Jesus appears first to Mary Magdalene, the same woman he had once cast seven devils out of. She tells the others, and they do not believe her. He appears to two more on the road, and they do not believe them either. Finally he appears to the eleven themselves at the table and rebukes them for their unbelief and hard hearts, because they would not believe the ones who had already seen him.",
      "Then he sends them out. Go ye into all the world, and preach the gospel to every creature. He that believeth and is baptized shall be saved. After he had spoken to them, he was received up into heaven, and sat on the right hand of God. And they went out and preached everywhere, the Lord working with them. The men who scattered in fear a few chapters ago are the ones carrying that message now.",
    ]),
  ],
  closing: [
    ["So that is Day 293. That is the end of Mark.", 750],
    ["A woman poured out everything she had on him before anyone else understood what was coming.", 800],
    ["A friend sold him for money. A crowd chose a murderer over him. A man who swore he would die with him denied even knowing his name.", 850],
    ["And Jesus went through all of it without once trying to talk his way out of it.", 800],
    ["The last thing he said from the cross was a question. My God, my God, why hast thou forsaken me?", 850],
    ["Then silence. A stone. A guard. Two days that must have felt final to everyone who loved him.", 850],
    ["And then a young man in white saying four words that undo everything. He is not here.", 900],
    ["Tomorrow we start a new Gospel. Luke 1 through 3. Two impossible births, and a promise being kept before either child can speak.", 850],
    ["For now, sit with the women at the tomb.", 800],
    ["They came expecting a body, and found it already gone.", 1200],
  ],
};
