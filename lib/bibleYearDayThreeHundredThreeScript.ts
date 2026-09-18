import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 303, written to the Day 1 standard.
 *
 * John 4-6 moves from a well in Samaria to a pool in Jerusalem to a
 * hillside full of five thousand people: living water, a Sabbath healing
 * that turns into a fight about who Jesus claims to be, and the bread of
 * life discourse that costs him most of his crowd. A heavy three-chapter
 * reading, consolidated into seven blocks.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `John ${chapter}:${startVerse}-${endVerse}`,
  book: "john",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THREE_SCRIPT: BibleYearDayScript = {
  dayNumber: 303,
  title: "Living Water and Bread of Life",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 303. Two conversations and one crowd, and by the end of today all three groups have to decide what they actually believe about him.", 850],
    ["A woman at a well who has been married five times gets the longest one-on-one conversation with Jesus in any Gospel.", 800],
    ["A man who has been sick for thirty-eight years gets healed on the one day that makes it a crime.", 800],
    ["And a crowd that follows him for free bread walks away the moment the teaching gets hard to swallow.", 850],
    ["We are in John 4, 5, and 6. A well, a pool, and a hillside.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(4, 1, 42, [
      "Jesus is tired from the journey and sits down at Jacob's well in Samaria, a place most Jews avoided entirely, and asks a Samaritan woman for a drink. She is stunned that a Jew would even speak to her. He answers with an offer instead of an explanation. If thou knewest the gift of God, thou wouldest have asked of him, and he would have given thee living water.",
      "She asks how, since he has no bucket, and he tells her that whosoever drinketh of this water shall thirst again, but whosoever drinketh of the water that I shall give him shall never thirst. She wants that water so she never has to keep coming back to this well.",
      "Then he turns the conversation somewhere she was not expecting. Go, call thy husband. She has had five, and the man she is with now is not one of them. He knows her whole story and does not walk away from her because of it. She runs off and tells the whole town, come, see a man, which told me all things that ever I did. Is not this the Christ?",
      "The disciples come back with food and are confused that he is not hungry. My meat is to do the will of him that sent me. Meanwhile the Samaritans come out to see for themselves, and after hearing him they tell the woman, now we believe, not because of thy saying, for we have heard him ourselves, and know that this is indeed the Christ, the Saviour of the world.",
    ]),
    g(4, 43, 54, [
      "Jesus heads on to Galilee, where his own countrymen receive him, though he had said a prophet hath no honour in his own country. A nobleman comes to him whose son is at the point of death and begs him to come down and heal him.",
      "Except ye see signs and wonders, ye will not believe. Jesus says it almost like a sigh, but he does not turn the man away. Go thy way, thy son liveth. He does not go to the house. He just says the word, from a distance, and the man believes it and leaves.",
      "On the road home his servants meet him with the news that the boy is alive, and when he asks what hour the fever left, it is the exact hour Jesus spoke. No delay, no travel time needed. The word did the healing by itself.",
      "And himself believed, and his whole house. One man's desperate request turns into an entire household's faith, and John marks it as the second sign Jesus did after coming out of Judaea into Galilee.",
    ]),
    g(5, 1, 18, [
      "At the pool of Bethesda in Jerusalem, a great crowd of sick, blind, halt, and withered people wait by the water. One man has been there thirty-eight years, and Jesus asks him a question that sounds strange until you think about it. Wilt thou be made whole?",
      "The man does not even answer yes. He explains why he keeps failing to get into the water in time. Jesus does not need the water at all. Rise, take up thy bed, and walk. And immediately the man was made whole, and took up his bed, and walked.",
      "It happens to be the Sabbath, and the Jews stop the healed man, not to celebrate, but to accuse him of carrying his bed on the wrong day. He points them to Jesus, who quietly slips away into the crowd.",
      "When Jesus finds him later and tells him to sin no more, the man reports him. The Jews go after Jesus for healing on the Sabbath, and he answers in a way that makes it worse. My Father worketh hitherto, and I work. So they sought the more to kill him, because he had made himself equal with God.",
    ]),
    g(5, 19, 47, [
      "Jesus does not back off the claim. He leans into it. The Son can do nothing of himself, but what he seeth the Father do, and the Father loveth the Son, and sheweth him all things that himself doeth. He says the dead will one day hear his voice and come out of the graves, some to the resurrection of life, some to the resurrection of damnation.",
      "He knows a claim that big needs more than his own word behind it, so he lists witnesses. John the Baptist testified. The works he does testify. The Father himself testified. And the very Scriptures they study testify of him too.",
      "Search the scriptures, for in them ye think ye have eternal life, and they are they which testify of me. And ye will not come to me, that ye might have life. Their own Bibles were pointing at the man standing in front of them, and they still would not come.",
      "He ends with a hard line. Had ye believed Moses, ye would have believed me, for he wrote of me. If they trusted what Moses actually wrote, they would have recognized Jesus already. Their problem was never a lack of information.",
    ]),
    g(6, 1, 21, [
      "A great multitude follows Jesus because they have seen his miracles on the sick, and he goes up a mountain with his disciples. Seeing the crowd, he tests Philip. Whence shall we buy bread, that these may eat? A boy has five barley loaves and two small fishes, and Andrew says it almost apologetically. What are they among so many?",
      "Jesus has everyone sit down, gives thanks, and starts distributing, and it just keeps being enough. When they are filled, he tells the disciples to gather up the fragments, that nothing be lost, and they fill twelve baskets from leftovers of a lunch meant for one boy.",
      "The crowd is so amazed they want to take him by force and make him a king, and Jesus, seeing that, departs alone into a mountain by himself. He will feed them, but he will not be crowned on their terms.",
      "That night the disciples row out on the sea, a storm rises, and they see Jesus walking on the water toward the boat and are afraid. It is I, be not afraid. He gets into the boat, and immediately they arrive at the land they were heading for.",
    ]),
    g(6, 22, 40, [
      "The crowd tracks Jesus down on the other side of the sea, and he sees right through why they came. Ye seek me, not because ye saw the miracles, but because ye did eat of the loaves, and were filled. Labour not for the meat which perisheth, but for that meat which endureth unto everlasting life.",
      "They ask what work God requires, and Jesus reduces it to one thing. This is the work of God, that ye believe on him whom he hath sent. They push back and ask for a sign like the manna Moses gave, missing that they are looking right at something greater than manna.",
      "I am the bread of life. He that cometh to me shall never hunger, and he that believeth on me shall never thirst. This is the first of the great I am statements in this Gospel, and he says it to people who are still thinking about their stomachs.",
      "All that the Father giveth me shall come to me, and him that cometh to me I will in no wise cast out. And this is the will of him that sent me, that every one which seeth the Son, and believeth on him, may have everlasting life, and I will raise him up at the last day.",
    ]),
    g(6, 41, 71, [
      "The Jews start murmuring because he said, I am the bread which came down from heaven, and they know his father and mother. Is not this Jesus, the son of Joseph? They cannot get past what they think they already know about him.",
      "Jesus pushes further instead of softening it. Except ye eat the flesh of the Son of man, and drink his blood, ye have no life in you. Many even of his own disciples hear it and say, this is an hard saying, who can hear it? He does not chase them down to explain it away. It is the spirit that quickeneth, the flesh profiteth nothing.",
      "From that time many of his disciples went back, and walked no more with him. This is the moment the crowd that wanted to crown him king a chapter earlier finally thins out, because following him has stopped being free.",
      "Jesus turns to the twelve. Will ye also go away? And Simon Peter answers with one of the best lines in the whole Bible. Lord, to whom shall we go? thou hast the words of eternal life. Not because everything makes sense to him yet. Because there is nowhere better to go.",
    ]),
  ],
  closing: [
    ["So that is Day 303.", 700],
    ["A Samaritan woman who came for water and left with the whole town believing because of her.", 800],
    ["A man healed after thirty-eight years, on the one day that turned his healing into an accusation.", 800],
    ["A crowd fed until twelve baskets were left over, still hungry for a king they could crown on their own terms.", 800],
    ["And a room full of disciples thinning out the moment the teaching stopped being easy.", 800],
    ["Tomorrow, John 7 through 9. The feast at Jerusalem, a woman caught in the act and forgiven, and a man born blind who ends up seeing more than the people who could already see.", 850],
    ["For now, sit with Peter's answer.", 800],
    ["Lord, to whom shall we go?", 750],
    ["Thou hast the words of eternal life.", 1200],
  ],
};
