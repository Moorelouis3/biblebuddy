import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 308, written to the Day 1 standard.
 *
 * John 19-21 closes the book: a scourging and a crown of thorns, a cross
 * between two others, an empty tomb before sunrise, and a fire on the beach
 * where Jesus asks Peter the same question three times. Seven blocks,
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
    ["Day 308. Pilate hands Jesus over, and by the end of the chapter he's dead.", 800],
    ["Three days later a woman finds an empty tomb before the sun is even up.", 800],
    ["And after all of that, Jesus builds a fire on a beach and asks one man the same question three times.", 850],
    ["This is the day the whole book has been walking toward, and the day it decides not to end there.", 850],
    ["We are in John 19, 20, and 21. A cross, an empty tomb, and breakfast on the shore.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 16, [
      "Pilate has Jesus scourged, and the soldiers twist a crown of thorns onto his head and dress him in a purple robe to mock him as a king. Then Pilate brings him out and says, Behold the man. He means it as pity. The crowd hears it as an opening.",
      "Crucify him, crucify him, they shout. Pilate says again, I find no fault in him. He knows the man in front of him is innocent and hands him over anyway, because the crowd is louder than his conscience.",
      "Jesus answers one of Pilate's questions and refuses to answer the others. Thou couldest have no power at all against me, except it were given thee from above. Even standing bound in front of the governor, he's the one naming who actually holds authority here.",
      "Pilate tries once more to release him, and the crowd plays their last card. If thou let this man go, thou art not Caesar's friend. That line ends it. Pilate delivers him to be crucified, and the chief priests say the ugliest sentence in the chapter: we have no king but Caesar.",
    ]),
    g(19, 17, 27, [
      "Jesus carries his own cross out to a place called the place of a skull, Golgotha, and they crucify him between two others, Jesus in the middle. Pilate writes a sign, Jesus of Nazareth the King of the Jews, in Hebrew, Greek, and Latin, so nobody passing by can miss it.",
      "The chief priests ask Pilate to change the wording. He refuses. What I have written I have written. The one man in the whole scene without a personal stake in Jesus is the one who won't budge.",
      "Below the cross, soldiers divide his clothes and cast lots for his seamless coat, fulfilling a line from the Psalms without knowing they're doing it. Meanwhile his mother is standing right there watching this happen to her son.",
      "Jesus sees her, and sees the disciple he loved standing beside her, and in the middle of dying he arranges care for the people he's leaving behind. Woman, behold thy son. Behold thy mother. From that hour that disciple took her into his own home.",
    ]),
    g(19, 28, 42, [
      "Jesus, knowing all things were now accomplished, says, I thirst, and they lift vinegar to his mouth on a hyssop branch. Then he says the two words that summarize the entire book. It is finished. Not I am finished. The work is.",
      "He bows his head and gives up the ghost. Nobody takes his life from him in this account. He lays it down, on his own timing, after saying the work was done.",
      "The soldiers break the legs of the two men crucified beside him to hasten death before the sabbath, but Jesus is already dead, so they don't break his. Instead one of them pierces his side with a spear, and blood and water come out. John insists on this detail because it fulfills two separate old prophecies at once.",
      "Joseph of Arimathaea, a secret disciple, finally acts in the open and asks Pilate for the body. Nicodemus comes too, the same man who once came to Jesus only at night, now carrying seventy-five pounds of spices in broad daylight. They bury him in a new tomb, nearby, because there's no time left before the sabbath.",
    ]),
    g(20, 1, 18, [
      "Early on the first day of the week, while it's still dark, Mary Magdalene comes to the tomb and finds the stone already moved. She doesn't stop to investigate. She runs and tells Peter and John, They have taken away the Lord, and we know not where they have laid him.",
      "Peter and John both run to the tomb. John gets there first but waits outside; Peter goes straight in. They find the linen wrappings lying there and the head cloth folded separately, not the scene of a hurried grave robbery. John sees this and believes, though neither of them yet understood from Scripture that he had to rise.",
      "The men go home. Mary stays, weeping, and looks into the tomb again. Two angels ask her why she's crying, and she gives the same answer twice. They have taken away my Lord. Then she turns and sees Jesus standing there and doesn't recognize him at all.",
      "Jesus asks her the same question the angels did, then just says her name. Mary. That's all it takes. She turns and calls him Rabboni, Teacher, and he sends her to tell the others. The first person to see the risen Christ, and the first preacher of the resurrection, is a woman who came to the tomb expecting a body.",
    ]),
    g(20, 19, 31, [
      "That evening the disciples are locked in a room out of fear, and Jesus simply appears in the middle of them. Peace be unto you. He shows them his hands and his side, and the text says plainly, then were the disciples glad, when they saw the Lord.",
      "He breathes on them and says, Receive ye the Holy Ghost, sending them out the same way the Father sent him. This isn't a farewell speech. It's a commissioning, delivered in person, to men who were hiding an hour earlier.",
      "Thomas wasn't there, and he refuses to believe secondhand. Except I shall see in his hands the print of the nails, I will not believe. A week later Jesus comes back specifically for him and says, reach hither thy finger, and be not faithless, but believing. Thomas answers with the highest confession in the book: my Lord and my God.",
      "Jesus tells him, blessed are they that have not seen, and yet have believed. That line reaches past everyone in the room and lands on whoever reads this later, including you. John says outright that's exactly why he wrote any of it down: that ye might believe.",
    ]),
    g(21, 1, 14, [
      "Some of the disciples go back to fishing, and they catch nothing all night. At daybreak a stranger on the shore tells them to cast the net on the other side, and suddenly they can't haul it in for the weight of fish.",
      "John recognizes him first. It is the Lord. Peter doesn't wait for the boat. He puts his coat back on and jumps straight into the water to get to Jesus faster than the net can be dragged in.",
      "When they reach the shore, Jesus already has a fire going with fish and bread on it. He didn't need their catch to make breakfast. He asks for some of it anyway, and lets them help serve the meal he already started.",
      "One hundred fifty-three fish, and the net doesn't tear under the weight. John counts it precisely, the way an eyewitness remembers a detail that stuck. None of the disciples dare ask him who he is. They already know.",
    ]),
    g(21, 15, 25, [
      "After breakfast Jesus asks Peter, lovest thou me more than these? Peter says yes, and Jesus says, feed my lambs. He asks it again, gets the same answer, and says, feed my sheep. The third time, Peter is grieved, because it's the third question in a row, and he answers, Lord, thou knowest all things; thou knowest that I love thee.",
      "Three denials by a fire in a courtyard get answered by three questions at a fire on a beach. Jesus doesn't ignore what happened or pretend it didn't. He walks Peter through it, on purpose, until it's undone.",
      "Then Jesus tells him plainly what his own death will look like, and simply says, Follow me. The same two words that started Peter's life with Jesus are the last words Jesus gives him here.",
      "Peter points at John and asks what will happen to him. Jesus doesn't answer the question. If I will that he tarry till I come, what is that to thee? Follow thou me. John closes his own book by saying he's the one who wrote all this down, and it's true, and that the world couldn't hold all the books it would take to write everything Jesus did.",
    ]),
  ],
  closing: [
    ["So that is Day 308.", 700],
    ["A trial where the innocent man is the only one who won't lie.", 750],
    ["A cross where dying, he still arranges who will care for his mother.", 800],
    ["Two words that carry the whole book. It is finished.", 800],
    ["A tomb that's empty before anyone goes looking for a miracle, and a woman who hears her own name and finally recognizes him.", 850],
    ["Thomas moving from I will not believe to my Lord and my God in the space of one week.", 850],
    ["And Peter, forgiven by a fire the same way he failed by one, three questions undoing three denials.", 850],
    ["That's the end of John. Tomorrow, Acts 1 through 3. The Spirit falls, and the church that was hiding behind locked doors starts preaching in the street.", 900],
    ["For now, carry the two words that mattered most today.", 800],
    ["It is finished.", 1200],
  ],
};
