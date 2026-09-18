import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 305, written to the Day 1 standard.
 *
 * John 10-12 moves from a shepherd who lays his life down on purpose, to a
 * friend Jesus lets die on purpose, to a crowd waving palms while a plan to
 * kill him is already moving underneath it. A heavy three-chapter reading,
 * consolidated into seven blocks, matching Day 303 and Day 304.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `John ${chapter}:${startVerse}-${endVerse}`,
  book: "john",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIVE_SCRIPT: BibleYearDayScript = {
  dayNumber: 305,
  title: "Good Shepherd and the Hour Arrives",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 305. A shepherd, a grave, and an hour that has been coming since chapter one.", 800],
    ["Jesus calls himself the good shepherd and says he will lay down his life for the sheep, on purpose, before anyone takes it from him.", 850],
    ["Then his friend Lazarus dies, and Jesus lets him die, on purpose, before he raises him back up.", 850],
    ["And by the end of today a crowd is waving palm branches while the leaders are already planning a funeral. His.", 900],
    ["We are in John 10, 11, and 12. A sheepfold, a tomb outside Bethany, and a road into Jerusalem.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(10, 1, 21, [
      "Jesus describes two kinds of men at a sheepfold. One climbs over the wall like a thief. The other comes through the door, and the sheep know his voice. I am the door of the sheep. By me if any man enter in, he shall be saved, and shall go in and out, and find pasture.",
      "I am the good shepherd: the good shepherd giveth his life for the sheep. He draws a hard line against the hireling, the one who works for pay and runs the moment a wolf shows up, because the sheep are not really his and he careth not for the sheep.",
      "Then he says something that widens the whole picture. Other sheep I have, which are not of this fold: them also I must bring, and they shall hear my voice; and there shall be one fold, and one shepherd. People outside Israel are already part of the plan.",
      "And he says the thing that makes his death different from every other death in the Bible. No man taketh it from me, but I lay it down of myself. I have power to lay it down, and I have power to take it again. Nobody takes his life from him. He gives it.",
    ]),
    g(10, 22, 42, [
      "Months later, at the Feast of Dedication, in the winter, Jesus is walking in the temple in Solomon's porch, and the Jews corner him. How long dost thou make us to doubt? If thou be the Christ, tell us plainly.",
      "He tells them he already has. I told you, and ye believed not: the works that I do in my Father's name, they bear witness of me. My sheep hear my voice, and I know them, and they follow me: and I give unto them eternal life. Neither shall any man pluck them out of my hand.",
      "Then the claim that ends the conversation. I and my Father are one. They pick up stones again, not for the healing this time, but for it, because that thou, being a man, makest thyself God.",
      "He points them back to their own Scripture and asks why the works themselves are not evidence enough. If I do not the works of my Father, believe me not. But if I do, though ye believe not me, believe the works. They try to take him again, and he escapes across the Jordan, where many believe on him there.",
    ]),
    g(11, 1, 16, [
      "Word comes that Lazarus, a man Jesus loves, is sick in Bethany. His sisters Mary and Martha send for Jesus with a simple message. Lord, behold, he whom thou lovest is sick. Jesus hears it and stays put two more days. This sickness is not unto death, but for the glory of God, that the Son of God might be glorified thereby.",
      "When he finally tells the disciples it is time to go back to Judea, they push back, because the Jews there had just tried to stone him. He answers with a picture of walking in daylight instead of stumbling in the dark, then says plainly, Lazarus is dead.",
      "And I am glad for your sakes that I was not there, to the intent ye may believe. Even now, he is thinking past the grief toward what their faith needs to see. Thomas, of all people, says the line that shows how little they understand yet. Let us also go, that we may die with him.",
      "By the time Jesus arrives, Lazarus has been in the tomb four days. Long enough that nobody is expecting a miracle. Long enough that it has to be one.",
    ]),
    g(11, 17, 37, [
      "Martha meets Jesus on the road before he even reaches the house. Lord, if thou hadst been here, my brother had not died. It is grief and faith tangled together in one sentence. But I know, that even now, whatsoever thou wilt ask of God, God will give it thee.",
      "Jesus tells her, thy brother shall rise again, and she answers the way anyone raised on the resurrection hope would. I know that he shall rise again in the resurrection at the last day. He is not talking about someday. I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live. Believest thou this? Yea, Lord: I believe that thou art the Christ, the Son of God.",
      "Mary comes out next and says the exact same line her sister did. Lord, if thou hadst been here, my brother had not died. She falls at his feet weeping, and the crowd around her is weeping too.",
      "Jesus groaned in the spirit, and was troubled. Where have ye laid him? Come and see. Jesus wept. Two words, the shortest verse in the whole Bible, and they carry more weight than most long ones. He is standing feet away from the power to fix this, and he still lets himself feel it first.",
    ]),
    g(11, 38, 57, [
      "At the tomb, Jesus asks them to take away the stone, and Martha, practical to the end, warns him about the smell. He has been dead four days already. Jesus answers her with a question. Said I not unto thee, that, if thou wouldest believe, thou shouldest see the glory of God?",
      "He prays out loud, not for himself but for the crowd, Father, I thank thee that thou hast heard me, that they may believe that thou hast sent me. Then he cries with a loud voice, Lazarus, come forth. And he that was dead came forth, bound hand and foot with graveclothes. Loose him, and let him go.",
      "Many of the Jews who saw it believe. Others run straight to the Pharisees to report it. The chief priests and Pharisees gather a council, afraid that if they leave him alone, the Romans will come and take away both their place and nation.",
      "Caiaphas, the high priest that year, says it is expedient that one man should die for the people, and that the whole nation perish not. John points out that Caiaphas said more than he knew. He prophesied that Jesus should die for that nation. From that day forth they took counsel together for to put him to death, and Jesus withdraws to a town called Ephraim to wait it out.",
    ]),
    g(12, 1, 19, [
      "Six days before the Passover, Jesus is back in Bethany, at a supper where Lazarus, freshly raised, is sitting at the table. Mary takes a pound of ointment of spikenard, very costly, and anoints Jesus' feet, and wipes them with her hair. The whole house is filled with the smell.",
      "Judas Iscariot objects. Why was not this ointment sold for three hundred pence, and given to the poor? John does not let that line stand unchallenged. This he said, not that he cared for the poor, but because he was a thief. Jesus answers simply. Let her alone: against the day of my burying hath she kept this. The poor always ye have with you, but me ye have not always.",
      "Word spreads that Lazarus is alive, and crowds start coming just to see the man who was raised from the dead, which pushes the chief priests to plan killing Lazarus too, because by reason of him many of the Jews went away, and believed on Jesus.",
      "The next day Jesus rides into Jerusalem on a young donkey, and the crowd cuts palm branches and shouts, Hosanna: Blessed is the King of Israel that cometh in the name of the Lord. It is the exact picture the prophet Zechariah described centuries earlier, and the Pharisees say to each other, behold, the world is gone after him.",
    ]),
    g(12, 20, 50, [
      "Some Greeks at the feast come to Philip wanting to see Jesus, and it seems to be the trigger. The hour is come, that the Son of man should be glorified. Except a corn of wheat fall into the ground and die, it abideth alone: but if it die, it bringeth forth much fruit. His death is not a defeat he is trying to avoid. It is the seed doing what a seed is for.",
      "Now is my soul troubled; and what shall I say? Father, save me from this hour: but for this cause came I unto this hour. He does not pretend it is easy. Father, glorify thy name. A voice comes out of heaven answering him, and the crowd standing there cannot agree on what they even heard. Some said it thundered: others said, an angel spake to him.",
      "Now is the judgment of this world: now shall the prince of this world be cast out. And I, if I be lifted up from the earth, will draw all men unto me. He says it plainly, signifying what death he should die, and still, after everything they have watched him do, many believed not on him, exactly as Isaiah said centuries before.",
      "Even among the chief rulers many believed on him, but because of the Pharisees they did not confess him, lest they should be put out of the synagogue: for they loved the praise of men more than the praise of God. Jesus cries out one more time in public. I am come a light into the world, that whosoever believeth on me should not abide in darkness. It is his last public word before the cross.",
    ]),
  ],
  closing: [
    ["So that is Day 305.", 700],
    ["A shepherd who says nobody takes his life from him, he lays it down himself.", 750],
    ["A friend Jesus loved enough to let die, so that raising him would mean something bigger than one family's relief.", 800],
    ["Two words in the middle of it all. Jesus wept.", 800],
    ["A crowd shouting Hosanna on a Monday, and a plan to kill him already moving underneath it.", 850],
    ["And a seed of wheat, willing to fall into the ground and die, because that is the only way it bears fruit.", 850],
    ["Tomorrow, John 13 through 15. The last supper, a towel and a basin, and Jesus teaching his own to abide in him before the night gets dark.", 850],
    ["For now, carry the hour he walked toward on purpose.", 800],
    ["For this cause came I unto this hour.", 1200],
  ],
};
