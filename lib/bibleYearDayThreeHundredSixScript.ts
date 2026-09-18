import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 306, written to the Day 1 standard.
 *
 * John 13-15 is the last supper turning into a long goodbye: a towel and a
 * basin, a traitor sent out into the dark, a new commandment, and a vine
 * that only bears fruit if the branch stays attached. Seven blocks, matching
 * Day 303 through Day 305.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `John ${chapter}:${startVerse}-${endVerse}`,
  book: "john",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SIX_SCRIPT: BibleYearDayScript = {
  dayNumber: 306,
  title: "Love, Service, and Abiding",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 306. Jesus and his friends are at the last supper, and he already knows exactly how tonight ends.", 800],
    ["Before it's over, he kneels down and washes their feet like a servant, hands a traitor his exit, and tells the rest of them how to keep going without him.", 850],
    ["A towel and a basin. A new commandment. A vine that only lives if you stay attached to it.", 850],
    ["He spends the whole night getting them ready for a morning none of them can imagine yet.", 850],
    ["We are in John 13, 14, and 15. An upper room, a long goodbye, and a love he's about to prove with his own life.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(13, 1, 17, [
      "It's the night of the last supper, and Jesus already knows what's coming. Having loved his own which were in the world, he loved them unto the end. Not almost the end. All the way to it.",
      "He gets up from supper, takes off his outer robe, ties a towel around his waist, and washes their feet. That's a servant's job, not a rabbi's, and nobody at that table offered to do it first.",
      "Peter refuses. Lord, dost thou wash my feet? Thou shalt never wash my feet. Jesus tells him plainly, If I wash thee not, thou hast no part with me. Peter swings the other way immediately. Not my feet only, but also my hands and my head.",
      "Ye call me Master and Lord: and ye say well; for so I am. If I then, your Lord and Master, have washed your feet, ye also ought to wash one another's feet. He doesn't lecture them into humility. He kneels down and shows them.",
    ]),
    g(13, 18, 38, [
      "Jesus is troubled in spirit and says it plainly. Verily, verily, I say unto you, that one of you shall betray me. The disciples look at each other, doubting of whom he spake. Nobody suspects Judas.",
      "John, leaning on Jesus' chest, asks who it is. Jesus dips a piece of bread and hands it to Judas. Then Satan entered into him, and Jesus tells him, That thou doest, do quickly. Judas gets up and walks out. And it was night, John says, and he means it two ways.",
      "With Judas gone, Jesus gives the new commandment. A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another. By this shall all men know that ye are my disciples, if ye have love one to another. Not by their doctrine first. By their love.",
      "Peter says he'll lay down his life for Jesus. Jesus answers with the hardest line of the night. The cock shall not crow, till thou hast denied me thrice. Peter means every word of his promise. He just doesn't know himself as well as Jesus does.",
    ]),
    g(14, 1, 14, [
      "Let not your heart be troubled: ye believe in God, believe also in me. He's about to leave them, and the first thing he does is tell them not to panic. In my Father's house are many mansions. I go to prepare a place for you.",
      "Thomas says what everyone's thinking. Lord, we know not whither thou goest; and how can we know the way? Jesus doesn't hand him directions. He hands him himself. I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
      "Philip asks to see the Father, as if that would finally settle it. Jesus answers almost hurt. Have I been so long time with you, and yet hast thou not known me, Philip? He that hath seen me hath seen the Father. They've been looking at him the whole time.",
      "He that believeth on me, the works that I do shall he do also; and greater works than these shall he do; because I go unto my Father. His leaving isn't the end of the mission. It's how the mission gets bigger.",
    ]),
    g(14, 15, 31, [
      "If ye love me, keep my commandments. Then the promise. I will pray the Father, and he shall give you another Comforter, that he may abide with you for ever, even the Spirit of truth. He isn't leaving them alone. He's sending someone to stay.",
      "I will not leave you comfortless: I will come to you. Judas, not Iscariot, asks why Jesus will show himself to them and not to the world. If a man love me, he will keep my words: and my Father will love him, and we will come unto him, and make our abode with him. It comes down to love, not spectacle.",
      "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid. The world's peace depends on what's happening around you. His doesn't.",
      "If ye loved me, ye would rejoice, because I said, I go unto the Father: for my Father is greater than I. Then, still at the table, he says, Arise, let us go hence. He finishes the sermon and starts walking toward what it costs.",
    ]),
    g(15, 1, 8, [
      "I am the true vine, and my Father is the husbandman. Every branch in me that beareth not fruit he taketh away: and every branch that beareth fruit, he purgeth it, that it may bring forth more fruit. Even the fruitful branches get cut back. Growth isn't gentle here.",
      "Abide in me, and I in you. As the branch cannot bear fruit of itself, except it abide in the vine, no more can ye, except ye abide in me. A branch doesn't try harder to grow fruit. It stays attached, and the vine does the rest.",
      "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing. Not a little less. Nothing.",
      "If a man abide not in me, he is cast forth as a branch, and is withered. Herein is my Father glorified, that ye bear much fruit; so shall ye be my disciples. The fruit was never the point by itself. It's evidence of where the branch has been staying.",
    ]),
    g(15, 9, 17, [
      "As the Father hath loved me, so have I loved you: continue ye in my love. This is my commandment, That ye love one another, as I have loved you. He keeps circling back to the same command, because it's the one they'll be tempted to skip.",
      "Greater love hath no man than this, that a man lay down his life for his friends. He says it hours before he does exactly that. Tonight it isn't a slogan yet. It's a plan already moving.",
      "Henceforth I call you not servants; for the servant knoweth not what his lord doeth: but I have called you friends; for all things that I have heard of my Father I have made known unto you. He's telling them everything, on purpose, before he leaves.",
      "Ye have not chosen me, but I have chosen you, and ordained you, that ye should go and bring forth fruit. Before they picked him, he'd already picked them. That order matters more than it sounds like it should.",
    ]),
    g(15, 18, 27, [
      "If the world hate you, ye know that it hated me before it hated you. He doesn't promise them an easier road than his own. He tells them up front it will look the same.",
      "If ye were of the world, the world would love his own: but because ye are not of the world, the world hateth you. Remember the word that I said unto you, The servant is not greater than his lord. If they have persecuted me, they will also persecute you.",
      "He that hateth me hateth my Father also. If I had not done among them the works which none other man did, they had not had sin: but now have they both seen and hated both me and my Father. Seeing him clearly and hating him anyway is its own kind of guilt.",
      "But when the Comforter is come, whom I will send unto you from the Father, even the Spirit of truth, which proceedeth from the Father, he shall testify of me: And ye also shall bear witness, because ye have been with me from the beginning. The Spirit testifies, and so do they. Both at once.",
    ]),
  ],
  closing: [
    ["So that is Day 306.", 700],
    ["A Lord who ties on a towel and washes feet instead of demanding they be washed.", 750],
    ["A new commandment that isn't complicated. Love one another, the way he loved them.", 800],
    ["A vine that does the growing, if the branch will just stay attached.", 800],
    ["And a promise that the world will hate them the same way it hated him, so none of it catches them by surprise.", 850],
    ["Tomorrow, John 16 through 18. Jesus prays for them out loud, and then soldiers come for him in a garden.", 850],
    ["For now, carry the towel.", 800],
    ["Love one another, as I have loved you.", 1200],
  ],
};
