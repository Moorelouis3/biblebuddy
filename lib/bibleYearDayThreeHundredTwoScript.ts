import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 302, written to the Day 1 standard.
 *
 * John 1-3 opens the fourth Gospel: the Word who was God and became flesh,
 * John the Baptist's testimony and the first disciples, the wedding at Cana
 * and the temple cleansed, and Nicodemus coming by night to hear about being
 * born again. A three-chapter reading, consolidated into seven blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `John ${chapter}:${startVerse}-${endVerse}`,
  book: "john",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 302,
  title: "The Word Became Flesh",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 302. New Gospel. Same Jesus, told a completely different way.", 800],
    ["Matthew, Mark, and Luke start with a birth. John starts before there was time to have a birth in.", 850],
    ["In the beginning was the Word, and the Word was with God, and the Word was God.", 900],
    ["Then, a few verses later, that same Word puts on flesh and moves into the neighborhood.", 850],
    ["We are in John 1, 2, and 3. A prologue, a wedding, a temple, and a man who comes to ask questions in the dark.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(1, 1, 18, [
      "John does not open with a manger. He opens with eternity. In the beginning was the Word, and the Word was with God, and the Word was God. All things were made by him, and without him was not any thing made that was made.",
      "In him was life, and the life was the light of men. And the light shineth in darkness, and the darkness comprehended it not. Whatever comes next in this book, that line is already true before anyone in the story has met him.",
      "Then the turn that makes the whole Gospel possible. And the Word was made flesh, and dwelt among us, full of grace and truth. The one who made everything puts on a body and moves into the world he made.",
      "No man hath seen God at any time. The only begotten Son, which is in the bosom of the Father, he hath declared him. John is telling you up front what this whole book is for. To show you what God is actually like.",
    ]),
    g(1, 19, 34, [
      "The priests and Levites ask John the Baptist straight out who he is, and he is just as straight back. He confessed, and denied not, but confessed, I am not the Christ. He will not let anyone mistake the messenger for the message.",
      "He calls himself the voice of one crying in the wilderness, make straight the way of the Lord, and tells them someone greater is already standing among them, unknown, whose shoe's latchet he is not worthy to unloose.",
      "The next day he sees Jesus coming and says the line the whole book turns on. Behold the Lamb of God, which taketh away the sin of the world. Everyone in that culture knew exactly what a lamb was for.",
      "John tells them how he knew. He saw the Spirit descending from heaven like a dove, and it abode upon him. This is he which baptizeth with the Holy Ghost. This is the Son of God. One man's testimony, staking everything on what he saw.",
    ]),
    g(1, 35, 51, [
      "Two of John's own disciples hear him point at Jesus and just leave to follow Jesus instead. One of them is Andrew, and the first thing he does is go find his brother Simon and say, we have found the Messias. He brings him to Jesus, who renames him on the spot. Thou art Simon. Thou shalt be called Cephas, a stone.",
      "Philip gets called next, and he goes straight to Nathanael with the same kind of news. We have found him, of whom Moses in the law, and the prophets, did write, Jesus of Nazareth. Nathanael is not impressed. Can there any good thing come out of Nazareth?",
      "Philip does not argue. Come and see. That is the whole evangelism strategy in this chapter, three times over. Not a debate. An invitation to look for yourself.",
      "Jesus tells Nathanael he saw him under the fig tree before Philip ever called him, and Nathanael's skepticism turns into the boldest confession in the chapter. Rabbi, thou art the Son of God, thou art the King of Israel. From nothing to everything, in one sentence.",
    ]),
    g(2, 1, 12, [
      "A wedding in Cana runs out of wine, which in that culture was a real shame on the family, and Jesus's mother brings it straight to him. They have no wine. His answer sounds like a refusal. Woman, what have I to do with thee? Mine hour is not yet come.",
      "She does not argue either. She just turns to the servants. Whatsoever he saith unto you, do it. Six stone waterpots, used for ceremonial washing, get filled to the brim with plain water.",
      "The governor of the feast tastes it and has no idea what just happened. Thou hast kept the good wine until now. Only the servants who filled the pots know where it came from.",
      "This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory, and his disciples believed on him. His first public sign is not a healing or a rescue. It is generosity at a wedding nobody outside that family would remember.",
    ]),
    g(2, 13, 25, [
      "Passover comes, and Jesus finds the temple courts turned into a marketplace, oxen and sheep and doves for sale, moneychangers sitting at their tables. He makes a whip of small cords and drives them all out, pouring out the changers' money and overthrowing the tables.",
      "Make not my Father's house an house of merchandise. This is the only time in the Gospels Jesus turns over furniture. What is supposed to be a house of prayer has become a business, and he will not let it stand.",
      "The Jews ask him for a sign to prove he has the right to do this. Destroy this temple, and in three days I will raise it up. They think he means the building they are standing in. He means his own body.",
      "John tells us straight out that the disciples only understood this after the resurrection, and then they believed the scripture, and the word which Jesus had said. Some things in this Gospel only make sense looking backward.",
    ]),
    g(3, 1, 21, [
      "A Pharisee named Nicodemus, a ruler of the Jews, comes to Jesus by night, careful about being seen. Rabbi, we know that thou art a teacher come from God. Jesus does not accept the compliment. He goes straight to the heart of it. Except a man be born again, he cannot see the kingdom of God.",
      "Nicodemus takes it literally, and Jesus explains he means something deeper. Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God. That which is born of the flesh is flesh, and that which is born of the Spirit is spirit.",
      "Then he compares it to the wind, which you hear but cannot see or control. So is every one that is born of the Spirit. Whatever this new birth is, it is not something a person can manufacture on their own.",
      "And then the verse that ends up on more signs and t-shirts than any other in the whole Bible. For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life. Said, in this Gospel, to one confused religious leader in the dark.",
    ]),
    g(3, 22, 36, [
      "Jesus and his disciples go out into the Judaean countryside and start baptizing, and John is still baptizing too, not far away, and John's own disciples come to him worried. Everyone is going to him instead of us.",
      "John's answer is one of the most settled responses to jealousy in the whole Bible. A man can receive nothing, except it be given him from heaven. He is not the Christ, he says again, only the friend of the bridegroom, standing near enough to hear his voice and rejoicing at it.",
      "Then the line that sums up his entire ministry. He must increase, but I must decrease. John spent his whole life pointing at someone else, and he says it like relief, not defeat.",
      "The chapter closes back on Jesus. He that believeth on the Son hath everlasting life. And he that believeth not the Son shall not see life, but the wrath of God abideth on him. Two roads, and John wants you to know exactly where each one leads.",
    ]),
  ],
  closing: [
    ["So that is Day 302.", 700],
    ["A Word that was God before anything else existed, and then moved into a body to live among the people he made.", 800],
    ["A voice in the wilderness who was thrilled to become smaller so someone greater could be seen.", 750],
    ["A wedding saved by more wine than anyone could drink, and a temple cleared out because worship had become a business.", 800],
    ["And a religious leader who came at night with a question, and left holding the most famous sentence in the book.", 800],
    ["Tomorrow, John 4 through 6. A woman at a well who gets the longest conversation with Jesus in any Gospel, and a crowd who follows him for bread and walks away when the teaching gets hard.", 850],
    ["For now, sit with John the Baptist's line.", 800],
    ["He must increase.", 750],
    ["But I must decrease.", 1200],
  ],
};
