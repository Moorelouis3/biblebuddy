import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 308, written to the Day 1 standard.
 *
 * John 19-21 closes the gospel: the cross, the empty tomb, and a fire on the
 * beach where Jesus asks Peter the same question three times. Seven blocks,
 * matching Day 303 through Day 307.
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
    ["Day 308. Yesterday ended with Pilate asking what truth is.", 750],
    ["Today he hands Jesus over to be crucified anyway.", 800],
    ["And then, three days later, an empty tomb, a gardener who isn't a gardener, and a locked room Jesus walks into without opening the door.", 900],
    ["By the end of today he's cooking breakfast on a beach, and asking the man who denied him three times the same question, three times.", 900],
    ["We are in John 19, 20, and 21. The cross, the resurrection, and the restoration of Peter.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 16, [
      "Pilate has Jesus scourged, and the soldiers platt a crown of thorns, put a purple robe on him, and mock him. Hail, King of the Jews. Then they strike him.",
      "Pilate brings him out and says, Behold the man. He tells the crowd plainly, I find no fault in him. It doesn't matter. Crucify him, crucify him, they cry.",
      "Pilate asks where Jesus is from. Jesus gives him no answer. Pilate reminds him he has power to crucify or release him. Jesus says the only power Pilate has was given him from above.",
      "The crowd shouts, If thou let this man go, thou art not Caesar's friend. Pilate sits in the judgment seat one last time and asks, Shall I crucify your King? We have no king but Caesar, the chief priests answer. Then he delivers him to be crucified.",
    ]),
    g(19, 17, 27, [
      "He carries his own cross out to a place called the skull, Golgotha, and they crucify him there between two others, Jesus in the middle.",
      "Pilate writes a title and puts it on the cross. Jesus of Nazareth, the King of the Jews. The chief priests object. Pilate answers, What I have written I have written. He won't take it back.",
      "The soldiers part his garments and cast lots for his coat, because it was woven without a seam. Genesis to the gospels, this whole story keeps landing exactly where it was written that it would.",
      "His mother is standing at the cross, with Mary Magdalene beside her. Jesus looks at her and at the disciple he loved and says, Woman, behold thy son. Then to the disciple, Behold thy mother. Even here, he is still taking care of someone.",
    ]),
    g(19, 28, 42, [
      "Knowing that everything is now finished, Jesus says, I thirst, and they lift vinegar to his mouth on a stalk of hyssop.",
      "He takes the vinegar and says, It is finished. Then he bows his head and gives up the ghost. He isn't overtaken by death. He hands himself over to it.",
      "Because it's the day before the sabbath, soldiers come to break the legs of the men on the crosses so the bodies won't stay up. They find Jesus already dead, so they don't break his. One soldier pierces his side instead, and blood and water come out.",
      "Joseph of Arimathaea, a secret disciple, asks Pilate for the body. Nicodemus, the man who once came to Jesus by night, brings a hundred pounds of spices. Together they wrap him and lay him in a new tomb in a garden, one nobody had ever been buried in.",
    ]),
    g(20, 1, 18, [
      "Early on the first day of the week, while it's still dark, Mary Magdalene finds the stone rolled away. She runs and tells Peter and John, They have taken away the Lord, and we know not where they have laid him.",
      "Both men run. John outruns Peter but stops at the entrance. Peter goes straight in and sees the linen clothes lying there, and the napkin that was around his head, folded by itself. Then John goes in too, sees it, and believes.",
      "The men go home, but Mary stays, weeping. She looks into the tomb and sees two angels, and then turns and sees a man she takes for the gardener. Woman, why weepest thou? Then he says one word. Mary.",
      "She turns and says, Rabboni. Teacher. He tells her not to cling to him, but to go tell the others, I ascend unto my Father, and your Father, and to my God, and your God. She goes and tells them, I have seen the Lord.",
    ]),
    g(20, 19, 31, [
      "That evening, the disciples are behind locked doors, afraid. Jesus stands in the middle of the room and says, Peace be unto you. He shows them his hands and his side. No knock, no door opening. He's just there.",
      "He breathes on them and says, Receive ye the Holy Ghost. Thomas isn't in the room, and when they tell him, he says he won't believe it unless he puts his own finger in the nail prints and his hand in Jesus's side.",
      "Eight days later Jesus comes again, doors still shut, and goes straight to Thomas. Reach hither thy finger, and behold my hands. Thrust thy hand into my side. Be not faithless, but believing.",
      "Thomas doesn't touch a thing. He just says, My Lord and my God. Jesus answers, Blessed are they that have not seen, and yet have believed. That's the line John hands to you, centuries later, still not having seen.",
    ]),
    g(21, 1, 14, [
      "Some of the disciples go back to fishing on the sea of Tiberias and catch nothing all night. At daybreak a man on the shore calls out, Children, have ye any meat? No, they answer.",
      "Cast the net on the right side of the ship, he tells them, and they can't even haul it in for the weight of fish. John says it first. It is the Lord. Peter throws on his coat and jumps into the water.",
      "When they reach the shore there's already a fire burning, with fish and bread on it. Jesus tells them to bring some of what they just caught. A hundred and fifty-three fish, and the net doesn't tear.",
      "Come and dine, he says. Nobody asks who he is. They already know. He's the one who made breakfast while they were still hauling in the net.",
    ]),
    g(21, 15, 25, [
      "After they eat, Jesus asks Simon Peter, Lovest thou me more than these? Yea, Lord, thou knowest that I love thee. Feed my lambs.",
      "He asks it again, and Peter answers the same way. Feed my sheep. Then a third time, and Peter is grieved, because it's the third time. Three questions for three denials, and Peter feels every one of them land.",
      "Lord, thou knowest all things, thou knowest that I love thee, Peter says. Feed my sheep. Then Jesus tells him plainly that one day he'll be led where he doesn't want to go. And still, the instruction is the same. Follow me.",
      "John closes his book by saying there's more than could ever be written down, if every one of it were told. Twenty-one chapters, and he says himself it isn't even close to the whole story.",
    ]),
  ],
  closing: [
    ["So that is Day 308.", 700],
    ["A crown of thorns, a title Pilate refused to take back, and a coat too well made to tear, so the soldiers gambled for it instead.", 800],
    ["It is finished. Not a collapse. A completion.", 800],
    ["Then a folded napkin, a gardener who says one word, Mary, and she knows exactly who it is.", 850],
    ["A door that stays shut and doesn't stop him. A doubter who only needed to see him to stop doubting.", 850],
    ["And Peter, who denied him three times by a fire, forgiven three times by another fire, and handed the same two words he got at the very start. Follow me.", 900],
    ["Tomorrow we leave the gospels and start the book of Acts, where the story keeps going without him standing there in person.", 850],
    ["For now, carry what he said to Peter.", 800],
    ["Follow me.", 1200],
  ],
};
