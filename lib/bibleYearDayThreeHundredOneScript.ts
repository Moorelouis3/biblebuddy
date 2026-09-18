import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 301, written to the Day 1 standard.
 *
 * Luke 22-24 is the Passion and resurrection: the Last Supper, Gethsemane,
 * the arrest, Peter's denial, the trials before the Sanhedrin, Pilate, and
 * Herod, the crucifixion, the empty tomb, the road to Emmaus, and the
 * ascension. A heavy, three-chapter reading, consolidated into seven
 * blocks, one per major scene.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Luke ${chapter}:${startVerse}-${endVerse}`,
  book: "luke",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_ONE_SCRIPT: BibleYearDayScript = {
  dayNumber: 301,
  title: "Cross, Resurrection, and Opened Eyes",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 301. This is the day the whole book has been walking toward.", 800],
    ["A last meal, a kiss that betrays instead of loves, and a courtyard where a friend says three times, I do not know him.", 850],
    ["A trial nobody wants to own, a cross between two criminals, and one thief who gets a promise with his very last breath.", 850],
    ["Then, three days later, an empty tomb, two strangers on a road whose hearts burn without knowing why, and a locked room where Jesus just shows up.", 900],
    ["We are in Luke 22, 23, and 24. The cross, the tomb, and the walk home.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(22, 1, 23, [
      "The chief priests are plotting to kill him, and Satan enters Judas, one of the twelve, who goes and works out a price with them behind Jesus's back. Judas has walked with him for three years and is about to sell him for money.",
      "Jesus sends Peter and John ahead to prepare the Passover, and they find everything exactly as he said, down to the man carrying a pitcher of water. He sits down with the twelve and tells them plainly, with desire I have desired to eat this passover with you before I suffer.",
      "He takes bread, gives thanks, breaks it, and says, this is my body which is given for you, this do in remembrance of me. Then the cup: this cup is the new testament in my blood, which is shed for you. He is handing them a way to remember him before he is even gone.",
      "Then, at the same table, he says it out loud. Behold, the hand of him that betrayeth me is with me on the table. Judas is right there, eating the same bread, and nobody else at the table can tell yet which one of them it is.",
    ]),
    g(22, 24, 53, [
      "While Jesus is talking about his own death, the disciples start arguing about which of them is the greatest. He does not answer with anger. He resets what greatness even means. He that is greatest among you, let him be as the younger, and he that is chief, as he that doth serve. I am among you as he that serveth.",
      "He turns to Simon and tells him Satan has asked to sift him like wheat, and that he has already prayed for him, so his faith will not fail. Peter says he is ready to go to prison and to death for him. Jesus tells him the truth instead. Before the cock crow, thou shalt thrice deny that thou knowest me.",
      "Out on the mount of Olives he tells the disciples to pray so they do not fall into temptation, then goes a little further and prays himself, sweating what looks like great drops of blood. Father, if thou be willing, remove this cup from me, nevertheless not my will, but thine, be done. He comes back and finds them asleep, worn out from sorrow, not from carelessness.",
      "Then Judas arrives with a crowd and leans in to kiss him. Judas, betrayest thou the Son of man with a kiss? Someone swings a sword and cuts off a servant's ear, and Jesus, already being arrested, stops to heal it. Be ye come out, as against a thief? This is your hour, and the power of darkness.",
    ]),
    g(22, 54, 71, [
      "They take Jesus to the high priest's house, and Peter follows at a distance and sits down by the fire with the very people who came to arrest him. A servant girl says, this man was also with him. Woman, I know him not.",
      "It happens twice more. Thou art also of them. Man, I am not. About an hour later someone else is certain. Of a truth this fellow also was with him, for he is a Galilaean. Man, I know not what thou sayest. And while the words are still in his mouth, the cock crows.",
      "Then the Lord turned, and looked upon Peter. Not a word. Just a look, across a courtyard, right as the thing Jesus told him would happen is happening. Peter goes out and weeps bitterly.",
      "The men holding Jesus blindfold him, hit him, and dare him to prophesy who struck him. At daylight the council asks him straight out, art thou the Christ? He tells them the truth even knowing what it will cost him. Ye say that I am. That is all the confession they need to move against him.",
    ]),
    g(23, 1, 25, [
      "They drag him to Pilate and accuse him of stirring up the nation and calling himself a king. Pilate questions him and tells the crowd plainly, I find no fault in this man. When he hears Jesus is from Galilee, he passes him off to Herod, who has wanted to see him perform a trick for years and gets nothing but silence.",
      "Herod's soldiers mock him, dress him in a robe, and send him back. Pilate and Herod become friends that same day, over a man neither of them will actually stand up for. Pilate tells the chief priests a second time, I have found no cause of death in him. I will chastise him, and let him go.",
      "But there is a custom of releasing one prisoner at Passover, and the crowd is given a choice. Away with this man, and release unto us Barabbas, a man in prison for sedition and murder. They ask for the criminal by name and reject the innocent one by silence.",
      "Pilate asks a third time, why, what evil hath he done? I have found no cause of death in him. The crowd just gets louder. Crucify him, crucify him. Pilate gives in, not because he is convinced, but because the shouting wins. He delivers Jesus to their will.",
    ]),
    g(23, 26, 56, [
      "They pull a stranger named Simon out of the crowd to carry the cross, and a crowd of women follow, weeping. Jesus turns and tells them not to weep for him, but for themselves and their children, because worse days than this are coming for the city.",
      "At the place called Calvary they crucify him between two criminals, and his first words from the cross are not about himself. Father, forgive them, for they know not what they do. Soldiers gamble for his clothes at the foot of the cross while he is still breathing above them.",
      "One of the criminals hanging next to him mocks him too. The other rebukes his own partner. We receive the due reward of our deeds, but this man hath done nothing amiss. Then he asks for the smallest thing. Lord, remember me when thou comest into thy kingdom. Jesus answers with more than he asked for. Today shalt thou be with me in paradise.",
      "Darkness covers the land at midday, and the temple veil tears in two. Jesus cries out, Father, into thy hands I commend my spirit, and dies. A Roman centurion, of all people, says, certainly this was a righteous man. Joseph of Arimathaea, a council member who never agreed with what they did, asks for the body and lays it in his own new tomb before the Sabbath begins.",
    ]),
    g(24, 1, 35, [
      "Women come to the tomb early with spices and find the stone already rolled away, and no body inside. Two men in shining clothes ask them a question that reframes everything. Why seek ye the living among the dead? He is not here, but is risen.",
      "They run and tell the eleven, and the men call it an idle tale and do not believe them, except Peter, who runs to check for himself and finds the linen cloths lying there, exactly where a body used to be, and goes home wondering.",
      "That same day two disciples are walking to a village called Emmaus, talking through everything that happened, and Jesus himself joins them on the road, but their eyes are kept from recognizing him. They tell him the whole story like he is a stranger, even the part about the empty tomb, and admit they had hoped he was the one who would redeem Israel.",
      "He calls them slow of heart to believe the prophets, and walks them through the Scriptures about himself, all the way from Moses. It is only that evening, when he takes bread, blesses it, and breaks it at their table, that their eyes are opened and they know him, and he is gone. Did not our heart burn within us, while he talked with us by the way?",
    ]),
    g(24, 36, 53, [
      "While the two are still telling the others what happened, Jesus himself is suddenly standing among them. Peace be unto you. They think they are seeing a ghost, so he tells them to look at his hands and his feet, and touch him, because a spirit does not have flesh and bones the way he does.",
      "He still gives them room to doubt out of sheer joy, so he asks for something to eat, and eats a piece of broiled fish in front of all of them. This is not a vision. This is not a memory. This is him, in a body, in the room.",
      "He opens their understanding of the Scriptures one more time, the same way he did on the road to Emmaus, and tells them it was always written this way, that Christ would suffer and rise the third day, and that repentance and remission of sins would be preached in his name to every nation, starting from the very city that just crucified him.",
      "He leads them out to Bethany, lifts up his hands, and blesses them, and while he is still blessing them he is carried up into heaven. They do not scatter in grief this time. They worship him and return to Jerusalem with great joy, and stay in the temple praising God. The story that started with fear in a courtyard ends with joy in the temple.",
    ]),
  ],
  closing: [
    ["So that is Day 301.", 700],
    ["A table where Jesus hands out bread and calls it his own body, while his betrayer eats the same bread beside him.", 800],
    ["A denial spoken three times before a rooster finished crowing.", 750],
    ["A cross where his first words were forgiveness for the people driving the nails.", 800],
    ["A thief who asked for almost nothing, and was promised paradise that same day.", 800],
    ["And a tomb that could not hold him, found empty by women nobody believed at first.", 800],
    ["That completes the Gospel of Luke. Tomorrow, we start the Gospel of John, beginning with the Word who was with God in the beginning.", 850],
    ["For now, sit with what the two men on the road to Emmaus said.", 800],
    ["Did not our heart burn within us, while he talked with us by the way?", 1200],
  ],
};
