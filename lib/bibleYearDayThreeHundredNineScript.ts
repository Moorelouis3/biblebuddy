import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 309, written to the Day 1 standard.
 *
 * Acts 1-3 opens the book: the ascension, Pentecost, Peter's first sermon,
 * and a lame beggar walking for the first time in his life. Seven blocks,
 * matching Day 308.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts ${chapter}:${startVerse}-${endVerse}`,
  book: "acts",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_NINE_SCRIPT: BibleYearDayScript = {
  dayNumber: 309,
  title: "Spirit, Witness, and the Church Begins",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 309. John's gospel is finished. Acts is where the story keeps going without Jesus physically standing in the room.", 800],
    ["He tells eleven ordinary men to wait in Jerusalem for power they haven't received yet, then he's gone.", 800],
    ["Ten days later, wind, fire, and a hundred and twenty people suddenly speaking languages they never learned.", 850],
    ["Peter — the same man who denied Jesus three times by a fire — stands up and preaches to the exact crowd that had him crucified. Three thousand people believe by lunch.", 900],
    ["We are in Acts 1, 2, and 3. An ascension, a promise kept, and a beggar who walks for the first time in his life.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(1, 1, 11, [
      "Luke picks up where his gospel left off: the former treatise, to Theophilus, of all that Jesus began both to do and teach, until the day in which he was taken up. Forty days he shows himself alive by many infallible proofs, speaking of things pertaining to the kingdom of God.",
      "The disciples ask the question you'd expect: Lord, wilt thou at this time restore again the kingdom to Israel? Jesus doesn't answer it. He redirects it: It is not for you to know the times or the seasons... but ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.",
      "While they're still watching, he's taken up, and a cloud receives him out of their sight. Two men in white stand by and ask, Ye men of Galilee, why stand ye gazing up into heaven? this same Jesus... shall so come in like manner as ye have seen him go into heaven. They're told to stop staring at the sky and start waiting on the promise.",
      "They return to Jerusalem and go up into an upper room, and continue with one accord in prayer and supplication, with the women, and Mary the mother of Jesus, and his brethren. No sermon yet. Just waiting, together, on purpose.",
    ]),
    g(1, 12, 26, [
      "Peter stands up in the midst of the disciples, about a hundred and twenty in number, and says Judas's place needs filling — quoting the Psalms: his bishoprick let another take. Before Pentecost even arrives, the first thing this group does is deal honestly with its own broken history.",
      "The requirement is specific: it has to be someone who companied with them the whole time Jesus went in and out among them, from the baptism of John, unto the day that he was taken up — a witness of his resurrection, not just someone who liked the idea.",
      "They put forward two names, Joseph called Barsabas, and Matthias, and pray: Thou, Lord, which knowest the hearts of all men, shew whether of these two thou hast chosen. Then they give forth their lots, and the lot fell upon Matthias.",
      "That's the last time Scripture uses casting lots to make a decision for the church. After Pentecost, the Spirit does that job instead. This is a hinge moment, and they don't even know they're standing in it.",
    ]),
    g(2, 1, 13, [
      "When the day of Pentecost was fully come, they were all with one accord in one place. Suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house. Then cloven tongues like as of fire sit upon each of them.",
      "They are all filled with the Holy Ghost, and begin to speak with other tongues, as the Spirit gave them utterance. Jerusalem is packed with Jews from every nation under heaven for the feast, and each one hears his own language being spoken.",
      "They're confounded, amazed, and say one to another, Behold, are not all these which speak Galilaeans? how hear we every man in our own tongue, wherein we were born? A room full of Galilean fishermen is suddenly fluent in Parthian, Mede, Elamite, and a dozen more.",
      "Others mock, saying, These men are full of new wine. Something genuinely supernatural just happened, and the easiest explanation some reach for is that it's just drunk men making noise. That reaction hasn't changed in two thousand years.",
    ]),
    g(2, 14, 36, [
      "Peter stands up with the eleven and answers the mockery directly: these are not drunken, as ye suppose, seeing it is but the third hour of the day. Then he quotes Joel: I will pour out of my Spirit upon all flesh... whosoever shall call on the name of the Lord shall be saved. What just happened has a name, and Peter gives it to them.",
      "Then he preaches Jesus of Nazareth, a man approved of God among you by miracles and wonders and signs... ye have taken, and by wicked hands have crucified and slain: whom God hath raised up. He puts the crime and the resurrection in the same sentence, to the very crowd capable of having done it.",
      "He quotes David — thou wilt not leave my soul in hell, neither wilt thou suffer thine Holy One to see corruption — and points out David is both dead and buried, his sepulchre is with us unto this day. David wasn't talking about himself. He was a prophet, and spake of the resurrection of Christ.",
      "Therefore let all the house of Israel know assuredly, that God hath made that same Jesus, whom ye have crucified, both Lord and Christ. The same Jesus. Peter refuses to let them separate the man they killed from the Lord they're now hearing about.",
    ]),
    g(2, 37, 47, [
      "When they hear this, they are pricked in their heart, and say unto Peter and the rest, Men and brethren, what shall we do? Conviction isn't an intellectual exercise here. Luke uses a word for being stabbed.",
      "Peter answers, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins, and ye shall receive the gift of the Holy Ghost. For the promise is unto you, and to your children, and to all that are afar off. About three thousand souls are added that same day.",
      "And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers. Fear comes upon every soul, and many wonders and signs are done by the apostles. This isn't a onetime event. It becomes a way of life overnight.",
      "All that believed were together, and had all things common, and sold their possessions and goods, and parted them to all men, as every man had need. Luke closes the summary with one line: the Lord added to the church daily such as should be saved. Three thousand in one day, and then more, every day after.",
    ]),
    g(3, 1, 11, [
      "Peter and John go up together into the temple at the hour of prayer, being the ninth hour, and a certain man lame from his mother's womb is carried and laid daily at the gate called Beautiful, to ask alms. He's been there his whole life, asking for the same small thing.",
      "He asks Peter and John for money, and Peter says, Silver and gold have I none; but such as I have give I thee: In the name of Jesus Christ of Nazareth rise up and walk. Peter doesn't apologize for having no money. He gives what he actually has.",
      "He takes him by the right hand, and lifted him up: and immediately his feet and ankle bones received strength. And he leaping up stood, and walked, and entered with them into the temple, walking, and leaping, and praising God. A man who never walked in his life is suddenly leaping through the temple courts.",
      "All the people see him walking and praising God, and they know him, that it was he which sat for alms at the Beautiful gate of the temple: and they were filled with wonder and amazement at that which had happened unto him. They ran together unto them, greatly wondering.",
    ]),
    g(3, 12, 26, [
      "Peter sees the crowd and preaches again, right there in Solomon's porch: Ye men of Israel, why marvel ye at this? or why look ye so earnestly on us, as though by our own power or holiness we had made this man to walk? He immediately points away from himself.",
      "The God of Abraham, and of Isaac, and of Jacob, the God of our fathers, hath glorified his Son Jesus; whom ye delivered up, and denied him in the presence of Pilate... ye denied the Holy One and the Just, and desired a murderer to be granted unto you; and killed the Prince of life, whom God hath raised from the dead. The same charge, named plainly again.",
      "And his name through faith in his name hath made this man strong, whom ye see and know. Peter gives the healed man's own legs as evidence for the sermon. Then, remarkably: I wot that through ignorance ye did it, as did also your rulers. He doesn't soften the crime, but he doesn't slam the door either.",
      "Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord. He reminds them Moses himself promised a prophet like him would come, and unto you first God... sent him to bless you, in turning away every one of you from his iniquities.",
    ]),
  ],
  closing: [
    ["So that is Day 309.", 700],
    ["An ascension, a promise kept, and a lame man leaping through the temple.", 750],
    ["Everything Jesus spent three years building into eleven men gets tested in a single day, and it holds.", 800],
    ["Peter, the one who couldn't stand up to a servant girl by a fire, now stands in front of the very city that crucified Jesus and doesn't flinch.", 850],
    ["That's not a personality change. That's what the Holy Ghost he was told to wait for actually does.", 850],
    ["Tomorrow, Acts 4 through 6. The apostles get arrested for this same sermon, and the church keeps growing anyway.", 850],
    ["For now, carry Peter's line to the beggar.", 800],
    ["Silver and gold have I none.", 750],
    ["But such as I have give I thee.", 1200],
  ],
};
