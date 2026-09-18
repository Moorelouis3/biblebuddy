import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 308, written to the Day 1 standard.
 *
 * John 19-21 closes the gospel: the crucifixion, the empty tomb, and the
 * epilogue where Jesus undoes Peter's three denials with three questions by
 * a charcoal fire. Seven blocks, matching Day 307.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `John ${chapter}:${startVerse}-${endVerse}`,
  book: "john",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 308,
  title: "Finished Work and Restored Disciples",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 308. This is where John's gospel ends.", 700],
    ["Yesterday closed with Pilate asking, What is truth, while truth stood right in front of him.", 800],
    ["Today that same truth gets beaten, mocked, and nailed to a cross.", 800],
    ["Then, three days later, an empty tomb, and a gardener who isn't a gardener.", 850],
    ["And it doesn't stop there. It ends with Jesus finding the disciple who denied him three times, and asking him the same question back, three times.", 900],
    ["We are in John 19, 20, and 21. The cross, the empty tomb, and a fire on the beach.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 16, [
      "Pilate has Jesus scourged, and the soldiers plait a crown of thorns, put it on his head, dress him in a purple robe, and mock him: Hail, King of the Jews, and smite him with their hands. They're making fun of a throne they don't know is real.",
      "Pilate goes out and says, Behold the man. He's presenting a beaten, bleeding man as proof there's nothing left to fear. The chief priests cry, Crucify him. Pilate says, I find no fault in him, and hands him over anyway. He keeps saying it's unjust and does it regardless.",
      "The Jews answer, We have a law, and by our law he ought to die, because he made himself the Son of God. When Pilate hears that, he is the more afraid. Even a Roman governor who believes none of it can feel something is wrong here.",
      "Pilate asks, Shall I crucify your King? and the chief priests answer, We have no king but Caesar. The men guarding the law of Moses just swore loyalty to Rome to get rid of Jesus. That's the price they paid to win.",
    ]),
    g(19, 17, 30, [
      "He goes out bearing his own cross to Golgotha, the place of a skull, and they crucify him between two others, Jesus in the midst. Pilate writes a title for the cross: JESUS OF NAZARETH THE KING OF THE JEWS, in Hebrew, Greek, and Latin, so nobody passing by could miss it.",
      "The chief priests ask Pilate to change it to say he only claimed to be king. Pilate refuses: What I have written I have written. The one man in the story with no stake in Jesus being king is the one who won't take the sign down.",
      "Soldiers part his garments into four shares, and for his coat, woven without seam, they cast lots instead of tearing it. Jesus sees his mother and the disciple he loved standing there and says, Woman, behold thy son, then to John, Behold thy mother. Dying, and still making sure she's cared for.",
      "Then, I thirst — and after the vinegar, It is finished, and he bows his head and gives up the ghost. Not a cry of defeat. A word stamped on a bill once it's paid in full.",
    ]),
    g(19, 31, 42, [
      "Because it's the day before the Sabbath, the Jews ask Pilate to break the legs of the men on the crosses so the bodies won't stay up on that holy day. Soldiers break the legs of the two thieves, but Jesus is already dead, so his legs are left unbroken.",
      "Instead, a soldier pierces his side with a spear, and out comes blood and water. John, who was standing right there, stops to say he saw it himself. He wants you to know this wasn't a fainting spell. It was a verified, witnessed death.",
      "Joseph of Arimathaea, a secret disciple for fear of the Jews, asks Pilate for the body. Nicodemus comes too, the man who once visited Jesus by night, now carrying a hundred pounds of myrrh and aloes in broad daylight. Fear is turning into courage in real time.",
      "They wrap him in linen with the spices and lay him in a new tomb in a garden nearby, because it's close and the Sabbath is coming fast. Nobody planned a proper burial. It's rushed and borrowed — which is exactly why Sunday morning matters.",
    ]),
    g(20, 1, 18, [
      "Mary Magdalene comes to the tomb while it's still dark and finds the stone rolled away. She runs and tells Peter and John, We know not where they have laid him. Her first thought isn't resurrection. It's grave robbery.",
      "Peter and John run together. John outruns him but waits at the entrance; Peter goes straight in and sees the linen lying there, and the napkin that was on his head folded up by itself, apart. Nobody in a hurry to steal a body stops to fold the laundry.",
      "Mary stays outside weeping, sees two angels, then turns and sees Jesus but doesn't know it's him, supposing him to be the gardener, until he says one word: Mary. She turns and says, Rabboni — Teacher. Her own name is what breaks through the grief.",
      "He tells her, Touch me not; for I am not yet ascended to my Father: but go to my brethren, and say unto them, I ascend unto my Father, and your Father; and to my God, and your God. Mary goes and tells the disciples, I have seen the Lord. The first witness to the resurrection is a woman — and she's sent anyway.",
    ]),
    g(20, 19, 31, [
      "That evening, doors shut for fear of the Jews, Jesus stands in the midst and says, Peace be unto you, then shows them his hands and his side. The wounds aren't hidden or healed away. They're still there, and they're the proof.",
      "He says again, Peace be unto you: as my Father hath sent me, even so send I you. Then he breathes on them and says, Receive ye the Holy Ghost. The same breath that raised Adam from dust now sends ordinary men out to carry this.",
      "Thomas wasn't there, and says, Except I shall see in his hands the print of the nails... I will not believe. Eight days later Jesus comes back just for him: Reach hither thy finger, and behold my hands... be not faithless, but believing. Thomas says, My Lord and my God. Jesus doesn't shame the doubt. He walks straight into it.",
      "Jesus says, blessed are they that have not seen, and yet have believed. Then John tells you why he wrote any of this down: these are written, that ye might believe that Jesus is the Christ, the Son of God; and that believing ye might have life through his name. That line is written for you, two thousand years later.",
    ]),
    g(21, 1, 14, [
      "Peter says, I go a fishing, and six others go with him, and they catch nothing all night. Old habits, old nets, old results. In the morning Jesus stands on the shore, and they don't recognize him.",
      "He calls out, Children, have ye any meat? and they say no. Cast the net on the right side of the ship, and ye shall find. They do, and now they can't haul it in for the sheer number of fish. John is the one who says it: It is the Lord.",
      "Peter doesn't wait for the boat. He girds his fisher's coat around him and throws himself into the water to reach Jesus faster. The same man who denied him three times by a fire is now swimming toward him.",
      "On the beach there's already a fire of coals with fish and bread laid on it. Jesus didn't need their catch. He asks for it anyway — Bring of the fish which ye have now caught — and it comes to a hundred fifty-three, and the net isn't torn. Then he just says, Come and dine.",
    ]),
    g(21, 15, 25, [
      "Three times Jesus asks him, Simon, son of Jonas, lovest thou me? and three times Peter says yes, and three times Jesus says, Feed my lambs... Feed my sheep. Three questions by a charcoal fire, undoing three denials by a charcoal fire. Jesus doesn't just forgive Peter. He puts him back to work.",
      "By the third time Peter is grieved, and says, Lord, thou knowest all things; thou knowest that I love thee. He stops defending himself and just lets Jesus see him completely. That's the version of Peter that gets used.",
      "Jesus tells him plainly how he'll die — when thou shalt be old, thou shalt stretch forth thy hands, and another shall gird thee, and carry thee whither thou wouldest not — then says the same two words he said at the start, by the same sea: Follow me.",
      "John closes the book by saying he's the one who wrote it and it's true, and that Jesus did so much more that the world itself could not contain the books that should be written. Everything you've read for 307 days is the part that got written down.",
    ]),
  ],
  closing: [
    ["So that is Day 308.", 700],
    ["A cross, an empty tomb, a doubting friend, and a breakfast on a beach.", 750],
    ["John spends three chapters making sure you know this really happened — Jesus really died, the tomb was really empty, and he really stood there in a body you could touch.", 800],
    ["And the gospel doesn't end with anyone throwing a party. It ends with Jesus finding the one who failed worst and asking him three simple questions.", 850],
    ["Not, why did you deny me. Just: do you love me. Then, feed my sheep. He hands Peter his life's work back before Peter has even finished apologizing.", 850],
    ["Tomorrow, Acts 1 through 3. The disciples wait in a room, the Spirit falls like fire, and the church starts with a sermon and three thousand people.", 850],
    ["For now, carry the fire on the beach.", 800],
    ["Three denials.", 700],
    ["Three questions.", 750],
    ["One job, handed right back.", 1200],
  ],
};
