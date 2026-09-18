import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 304, written to the Day 1 standard.
 *
 * John 7-9 is three arguments about who Jesus is: a feast crowd split on
 * whether he is dangerous or the Christ, a woman thrown at his feet as a
 * trap, and a man born blind who ends up seeing more than the men who wrote
 * the law. A heavy three-chapter reading, consolidated into seven blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `John ${chapter}:${startVerse}-${endVerse}`,
  book: "john",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FOUR_SCRIPT: BibleYearDayScript = {
  dayNumber: 304,
  title: "Living Water, Light, and Sight",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 304. Three arguments, and Jesus is the reason for every one of them.", 800],
    ["A crowd split over whether he is dangerous or the Christ.", 750],
    ["A woman thrown at his feet as a trap, and a courtroom of accusers that Jesus somehow turns around on themselves.", 850],
    ["And a man born blind who ends up seeing more than the people who could already see.", 850],
    ["We are in John 7, 8, and 9. A feast, a temple courtyard, and a pool called Siloam.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(7, 1, 13, [
      "Jesus stays in Galilee on purpose, because the Jews in Judea are already looking for a way to kill him. His own brothers do not believe in him, and they needle him about it. Go to Judea, they say, so your disciples can see the works you do. If you are who you say you are, prove it in public.",
      "He does not take the bait. My time is not yet come, but your time is alway ready. So the brothers go up to the feast without him. Then, quietly, so as not to draw attention, he goes up too.",
      "By the time he arrives, the whole feast is already arguing about him before he has said a word. Some call him a good man. Others say, nay, but he deceiveth the people. Nobody says it loudly, because they are afraid of the leaders.",
      "You have probably felt that. An opinion you hold but will not say out loud because of who might hear it. That fear was already running Jerusalem before Jesus even showed up.",
    ]),
    g(7, 14, 36, [
      "Halfway through the feast Jesus starts teaching in the temple, and the crowd marvels that a man with no formal training knows the Scriptures this well. His answer is direct. My doctrine is not mine, but his that sent me. He is not claiming to be self-taught. He is claiming a source.",
      "He presses them on their own law. Moses gave you circumcision, and you circumcise a boy on the Sabbath without blinking, but you are furious at me for healing a whole man on the Sabbath. Judge not according to the appearance, but judge righteous judgment.",
      "The crowd starts arguing about his identity instead. Is not this he whom they seek to kill? We know this man, whence he is; but when Christ cometh, no man knoweth whence he is. They think knowing his hometown disqualifies him.",
      "Jesus answers loud enough for the temple to hear. Ye both know me, and ye know whence I am. Ye know where I come from and still miss who sent me. Familiarity is not the same thing as knowing someone.",
    ]),
    g(7, 37, 53, [
      "On the last day of the feast, the great day, Jesus stands up and cries out. If any man thirst, let him come unto me, and drink. He is not offering information. He is offering himself, standing in the middle of the biggest crowd of the week.",
      "He says out of his belly shall flow rivers of living water, and John explains it. This spake he of the Spirit, which they that believe on him should receive, for the Holy Ghost was not yet given, because Jesus was not yet glorified. The full picture is still ahead of them.",
      "The temple officers get sent to arrest him and come back empty-handed. Why have ye not brought him? Never man spake like this man. Even the men sent to silence him could not do it.",
      "Nicodemus, the same man who came to Jesus at night back in chapter 3, speaks up for him now, in daylight, in front of the council. Doth our law judge any man before it hear him? It is a small, risky sentence, and it costs him standing with his own colleagues.",
    ]),
    g(8, 1, 11, [
      "Scribes and Pharisees drag a woman into the temple courtyard, caught in the very act of adultery, and set her in the middle of the crowd. This is not about justice. It is a trap, meant to catch Jesus between the law of Moses and Roman law.",
      "He does not answer right away. He stoops down and writes on the ground with his finger, and lets the silence sit while they keep demanding an answer.",
      "Then he stands up. He that is without sin among you, let him first cast a stone at her. One by one, beginning at the eldest, they walk away, until only Jesus and the woman are left standing.",
      "Woman, where are those thine accusers? hath no man condemned thee? Neither do I condemn thee: go, and sin no more. He does not excuse what she did. He just refuses to add to the stones.",
    ]),
    g(8, 12, 30, [
      "I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life. The Pharisees immediately go after his credentials, not his claim. Thou bearest record of thyself; thy record is not true.",
      "Jesus answers with something bigger than a technicality. I know whence I came, and whither I go; but ye cannot tell whence I come, and whither I go. They are arguing rules while he is describing where he came from and where he is headed.",
      "He tells them plainly what is at stake. I go my way, and ye shall seek me, and shall die in your sins: whither I go, ye cannot come. When they ask who he even is, he answers, even the same that I said unto you from the beginning.",
      "As he speaks, many believe on him, right there in the middle of an argument that started as an attack. Sometimes the clearest testimony comes out under pressure, not in comfort.",
    ]),
    g(8, 31, 59, [
      "To the ones who just believed, Jesus says something that will thin the crowd fast. If ye continue in my word, then are ye my disciples indeed; and ye shall know the truth, and the truth shall make you free. They bristle immediately. We were never in bondage to any man. How sayest thou, ye shall be made free?",
      "Jesus goes straight at it. Whosoever committeth sin is the servant of sin. Being Abraham's descendants by blood was never the same thing as being free from what actually enslaves a person.",
      "The argument escalates into an argument about fathers. Abraham is your father, they say. Jesus answers that their behavior gives them away. Ye do the deeds of your father. Ye are of your father the devil. It is one of the hardest things he says in any Gospel, aimed at religious men who thought their bloodline covered them.",
      "Then he says the line that ends the conversation with stones. Before Abraham was, I am. They know exactly what he is claiming, the name God gave Moses at the burning bush, and they pick up rocks. Jesus hid himself, and went out of the temple, going through the midst of them, and so passed by.",
    ]),
    g(9, 1, 41, [
      "Jesus and his disciples pass a man blind from birth, and the disciples ask the wrong question. Who did sin, this man, or his parents, that he was born blind? Jesus answers that this happened so the works of God could be made manifest in him. Then he spits on the ground, makes clay, puts it on the man's eyes, and sends him to wash in the pool of Siloam. The man goes, washes, and comes back seeing.",
      "The neighbors cannot agree it is even the same man. The Pharisees get involved because it happened on the Sabbath, and they split down the middle. This man is not of God, because he keepeth not the sabbath day. How can a man that is a sinner do such miracles? So they ask the man himself, and he will not soften it for them. He is a prophet.",
      "His parents get dragged in and dodge the question out of fear, because the leaders had already agreed that anyone who confessed Jesus as the Christ would be put out of the synagogue. The healed man gets called back a second time, and this time he stops being careful. Whether he be a sinner or no, I know not: one thing I know, that, whereas I was blind, now I see. They throw him out.",
      "Jesus finds him afterward, the same way he found the woman in chapter 8, and asks, Dost thou believe on the Son of God? Who is he, Lord, that I might believe on him? Thou hast both seen him, and it is he that talketh with thee. Lord, I believe. And he worshipped him. The man born blind ends the day seeing more clearly than the men who wrote the law.",
    ]),
  ],
  closing: [
    ["So that is Day 304.", 700],
    ["A crowd arguing in the temple over where Jesus really comes from.", 750],
    ["A woman set up as a trap, and a courtroom of accusers who walked away without throwing a single stone.", 800],
    ["A man born blind, healed with mud and spit, who ends the day worshipping the Son of God.", 800],
    ["And religious men who could quote the law from memory and still could not see who was standing in front of them.", 850],
    ["Tomorrow, John 10 through 12. A good shepherd, a friend called out of a tomb, and an hour that finally arrives.", 850],
    ["For now, sit with what the healed man said.", 800],
    ["One thing I know.", 750],
    ["That, whereas I was blind, now I see.", 1200],
  ],
};
