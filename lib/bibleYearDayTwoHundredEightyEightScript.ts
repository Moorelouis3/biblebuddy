import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 288, written to the Day 1 standard.
 *
 * Judas cannot live with what he did, Jesus is crucified and buried behind a
 * sealed, guarded stone, and on the third day the stone is empty anyway.
 * Then Mark opens with a completely different rhythm - no genealogy, just a
 * voice in the wilderness and a fisherman dropping his net. Six blocks
 * across Matthew 27, Matthew 28, and Mark 1.
 */

const matthewTwentySeven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 27:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 27,
  startVerse,
  endVerse,
  teaching,
});

const matthewTwentyEight = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 28:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 28,
  startVerse,
  endVerse,
  teaching,
});

const markOne = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Mark 1:${startVerse}-${endVerse}`,
  book: "mark",
  chapter: 1,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_EIGHT_SCRIPT: BibleYearDayScript = {
  dayNumber: 288,
  title: "Cross, Resurrection, and the Gospel Begins",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 288.", 700],
    ["Yesterday ended in Gethsemane, with Judas leading a mob toward Jesus and Peter swearing he never would run.", 850],
    ["Today Peter runs anyway, and Judas cannot live with what he did.", 850],
    ["Then Jesus is nailed to a cross, dies, and is buried behind a sealed stone.", 850],
    ["And on the third day, the stone is empty.", 950],
    ["We are in Matthew 27, Matthew 28, and the opening of Mark.", 700],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    matthewTwentySeven(1, 26, [
      "When Judas sees Jesus condemned, he brings the thirty pieces of silver back to the priests and says, I have sinned in that I have betrayed the innocent blood. They will not take it back. What is that to us, they say. See thou to that. The men who paid him to do it will not even own what they bought.",
      "Judas throws the silver into the temple and goes out and hangs himself. The priests will not put blood money in the treasury, so they buy a field to bury strangers in with it. It gets called the field of blood, and Matthew says that name has stuck ever since.",
      "Pilate asks Jesus straight out, Art thou the King of the Jews? Jesus answers, Thou sayest. Then he says nothing else, not one word, to every accusation the priests throw at him. Pilate marvels greatly. He has never had a prisoner refuse to defend himself before.",
      "Pilate's own wife sends word mid-trial: Have thou nothing to do with that just man, for I have suffered many things this day in a dream because of him. Pilate ignores her, offers the crowd a choice between Jesus and a convicted rebel named Barabbas, and washes his hands in front of everyone. I am innocent of the blood of this just person, he says. See ye to it. Washing your hands does not make you innocent. It just tells you he knew.",
    ]),
    matthewTwentySeven(27, 56, [
      "Soldiers strip him, dress him in a scarlet robe, jam a crown of thorns onto his head, and put a reed in his hand like a mock scepter. Hail, King of the Jews, they say, and spit on him, and take the reed and hit him in the head with it. Every detail of the mockery is aimed at exactly what he actually is.",
      "Simon of Cyrene is pulled out of the crowd to carry the cross. They come to Golgotha, place of a skull, and offer him vinegar mixed with gall. He tastes it and will not drink it. He will feel all of this.",
      "They crucify him, gamble for his clothes at the foot of the cross, and hang a sign over his head: THIS IS JESUS THE KING OF THE JEWS. People walking by wag their heads. If thou be the Son of God, come down from the cross. The priests mock him with his own miracles. He saved others, himself he cannot save. He trusted in God, let him deliver him now, if he will have him.",
      "At the ninth hour Jesus cries out, Eli, Eli, lama sabachthani, my God, my God, why hast thou forsaken me, and then cries again with a loud voice and gives up the ghost. At that instant the temple veil tears top to bottom, the earth shakes, and the centurion standing guard says the one thing nobody else in the crowd said all day. Truly this was the Son of God.",
    ]),
    matthewTwentySeven(57, 66, [
      "Joseph of Arimathaea, a rich man and a disciple, asks Pilate for the body, wraps it in clean linen, and lays it in his own new tomb cut into rock. He rolls a great stone across the entrance. Two women, both named Mary, sit across from it and watch.",
      "The next day the chief priests remember something the disciples seem to have forgotten. That deceiver said, while he was yet alive, After three days I will rise again. Fear of a lie makes them take the resurrection more seriously than grief has let the disciples take it.",
      "Pilate gives them a guard. Make it as sure as ye can, he says. They seal the stone and post soldiers. Everything human power can do to keep a dead man in a grave gets done to this one.",
      "None of it will be enough. A sealed stone, a Roman guard, and an official seal are about to mean nothing at all.",
    ]),
    matthewTwentyEight(1, 20, [
      "At dawn on the first day of the week, the two Marys come to the tomb, and there is a great earthquake. An angel rolls back the stone, not to let Jesus out, but to let the women see he is already gone. His face is like lightning, his clothing white as snow, and the guards shake and fall down like dead men.",
      "Fear not ye, the angel tells the women. He is not here, for he is risen, as he said. Come, see the place where the Lord lay. Then go quickly and tell his disciples. They run to obey, afraid and overjoyed at the same time, and Jesus himself meets them on the road. All hail, he says. They grab his feet and worship him.",
      "Some of the guards report everything to the priests, who pay them to lie: say his disciples stole the body while you were asleep. Think about what that story requires. Soldiers claiming to know what happened while they were unconscious, paid well to keep saying it.",
      "On a mountain in Galilee the eleven see him and worship him, though Matthew is honest that some still doubted. Jesus gives them the last word of the book. All power is given unto me in heaven and in earth. Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost. And lo, I am with you always, even unto the end of the world.",
    ]),
    markOne(1, 20, [
      "Mark does not slow down for a birth story. The beginning of the gospel of Jesus Christ, the Son of God, and two verses later John the Baptist is already in the wilderness, dressed in camel's hair, eating locusts and wild honey, telling the whole region to repent.",
      "John says it plainly. There cometh one mightier than I after me, the latchet of whose shoes I am not worthy to stoop down and unloose. I have baptized you with water, but he shall baptize you with the Holy Ghost. John is the most popular man in Judaea right now, and he keeps pointing away from himself.",
      "Jesus comes from Nazareth and is baptized by John in the Jordan. Coming up out of the water, he sees the heavens open, the Spirit descending on him like a dove, and a voice: Thou art my beloved Son, in whom I am well pleased. That is the last quiet moment he gets, because the Spirit immediately drives him into the wilderness, where Satan tempts him for forty days among wild beasts.",
      "Back by the sea of Galilee, he sees Simon and Andrew casting a net and says, Come ye after me, and I will make you to become fishers of men. Mark's favorite word shows up here: straightway. Straightway they forsake their nets. He calls James and John next, and they leave their father in the boat with the hired men and go.",
    ]),
    markOne(21, 45, [
      "In the Capernaum synagogue on the sabbath, people are astonished, because he taught them as one that had authority, and not as the scribes. A man with an unclean spirit interrupts him: what have we to do with thee, Jesus of Nazareth? I know thee who thou art, the Holy One of God. Jesus says, hold thy peace, and come out of him, and the spirit obeys on the spot.",
      "He goes to Simon's house and finds Simon's mother-in-law sick with a fever. He takes her by the hand, lifts her up, and the fever leaves her immediately. Immediately she gets up and starts serving them. She is not resting from the miracle. She is already working.",
      "By evening the whole city is at the door, and he heals many that were sick of divers diseases, and casts out many devils. The next morning, long before daylight, he goes off alone to pray. When Simon finds him and says everyone is looking for him, Jesus says, let us go into the next towns, that I may preach there also, for therefore came I forth. He came for the towns that had not found him yet, not just the one that had.",
      "A leper kneels and says, if thou wilt, thou canst make me clean. Jesus is moved with compassion and does something nobody in that culture does. He touches him. I will, be thou clean. The disease leaves instantly. Jesus tells him to say nothing and go show himself to the priest, but the man cannot stop talking about it, and soon Jesus can no longer even enter a city openly.",
    ]),
  ],
  closing: [
    ["So that is Day 288.", 700],
    ["A field bought with blood money. A king mocked with a real crown of thorns. A curtain torn in two the moment he died.", 800],
    ["And then, three days later, an empty tomb that no soldier, no seal, and no stone could hold shut.", 850],
    ["Judas could not live with what he had done. Peter wept over what he had done. Only one of them got a chance to be forgiven for it.", 850],
    ["The same book that tells you the temple veil tore open also tells you the guards were paid to lie about what happened next. Not everyone who saw the truth chose to tell it.", 850],
    ["Then Mark opens with a completely different rhythm. No genealogy, no manger. Just a voice in the wilderness, a dove out of an open sky, and a fisherman dropping his net the moment he is called.", 850],
    ["Tomorrow, Mark 2 through 4. A paralyzed man let down through a roof, a storm on the sea, and a question the disciples cannot yet answer.", 850],
    ["For now, hold on to the centurion.", 750],
    ["He was standing guard at an execution.", 750],
    ["Truly this was the Son of God.", 1200],
  ],
};
