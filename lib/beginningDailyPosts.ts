import type { ProverbsDailyPost } from "./proverbsDailyPosts";

/**
 * The Beginning of Everything: the 21 daily group posts (2026-10-26).
 *
 * Same job as lib/proverbsDailyPosts.ts, for the study that opens on
 * 1 November. Without these the daily cron finds no content, posts nothing,
 * and the study runs for three weeks with no post in the feed and no thread
 * for anybody to answer into.
 *
 * DRAFTED, NOT WRITTEN BY LOUIS. The Proverbs entries are his own words and
 * are not to be touched. These were drafted from the study's own day files in
 * data/beginning-of-everything, so the title and the reflection question on
 * every day are exactly what the devotional already asks. The two paragraphs
 * are a short trailer for that day's reading. Edit freely.
 *
 * Key verse text was checked word for word against the KJV the reader uses
 * (public/kjv/genesis/<chapter>.json).
 *
 * House style, taken from the Proverbs posts: no hyphens or dashes inside the
 * prose, second person, two short paragraphs, nothing the reading does not
 * actually say.
 *
 * This study paces by passage rather than by chapter. Genesis 1 alone takes
 * four days, so every entry carries its own `reading` label and `chapter` is
 * only the chapter the passage starts in.
 */

export const BEGINNING_DAILY_POSTS: ProverbsDailyPost[] = [
  {
    day: 1,
    chapter: 1,
    reading: "Genesis 1:1-2",
    title: "Meeting God",
    milestone: "🙌 Welcome to Day 1. We are starting at the very beginning, and we are doing it together.",
    paragraphs: [
      "Every story has a first line, and the first line tells you what kind of story you are in. Get it wrong and you will misread everything that comes after it.",
      "The Bible has a first line too, and it does not start with us. Not with a man, not with a nation, not with a problem that needs fixing. It starts with a Person. Before we meet anything God made, we meet Him.",
    ],
    keyVerse: {
      reference: "Genesis 1:1",
      text: "In the beginning God created the heaven and the earth.",
    },
    question: "What have you heard about God from other people that you have never checked in the Bible for yourself?",
    closing: [],
  },
  {
    day: 2,
    chapter: 1,
    reading: "Genesis 1:3-13",
    title: "God Brings Order",
    milestone: null,
    paragraphs: [
      "Walk into a dark room and you bump into the table and stub your toe. Nothing in it makes sense until somebody finds the switch.",
      "That is where we left the world. Dark, watery, unformed, and not empty of God. Then God speaks four words and the dark has a shape. Watch the pattern start here: three days to make the spaces, three days coming to fill them.",
    ],
    keyVerse: {
      reference: "Genesis 1:3",
      text: "And God said, Let there be light: and there was light.",
    },
    question: "God spoke, and light was there. Do you treat God's word like it actually has power?",
    closing: [],
  },
  {
    day: 3,
    chapter: 1,
    reading: "Genesis 1:14-25",
    title: "A World Filled with Life",
    milestone: null,
    paragraphs: [
      "A house can be finished and still be empty. The walls are up, the lights work, and nobody is walking the halls.",
      "Today God fills it. Lights across the sky, fish in the seas, birds in the air, animals on the land. Nothing arrives to a home that was not ready for it. And notice what the sun and moon are: servants put in the sky to rule a day, not gods to be worshipped.",
    ],
    keyVerse: {
      reference: "Genesis 1:16",
      text: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.",
    },
    question: "God made the sun and moon to serve Him, not to be worshipped. What things in your life have you looked to as if they were in charge?",
    closing: [],
  },
  {
    day: 4,
    chapter: 1,
    reading: "Genesis 1:26-31",
    title: "Made in God's Image",
    milestone: null,
    paragraphs: [
      "Parents get the nursery ready before the baby comes home. The crib is built, the clothes are folded, the food is in the cupboard. Nobody is in that room yet, but everything in it is waiting for one person.",
      "That is what the last three days have been. Today we find out who it was all for. People come last, made to reflect Him, trusted with His world, and fed before they were ever hungry. Then God looks at the whole thing and calls it very good.",
    ],
    keyVerse: {
      reference: "Genesis 1:27",
      text: "So God created man in his own image, in the image of God created he him; male and female created he them.",
    },
    question: "What changes when you see every person as someone made in God's image?",
    closing: [],
  },
  {
    day: 5,
    chapter: 2,
    reading: "Genesis 2:1-3",
    title: "God Rests",
    milestone: null,
    paragraphs: [
      "Out of everything God could have done with the seventh day, He stopped. No new planet, no new animal, nothing left to fix.",
      "He did not rest because He was tired. He rested because the work was finished and it was very good. You will never finish all of yours. So the question is not whether you have earned your rest. It is whether you trust Him enough to take it.",
    ],
    keyVerse: {
      reference: "Genesis 2:3",
      text: "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made.",
    },
    question: "When was the last time you truly stopped?",
    closing: [],
  },
  {
    day: 6,
    chapter: 2,
    reading: "Genesis 2:4-18",
    title: "The Man and the Garden of Eden",
    milestone: null,
    paragraphs: [
      "Genesis 1 is the wide shot of a whole world. Genesis 2 drops the camera down through one window, into one room, and stops on one face.",
      "God forms the man out of the dust with His own hands and breathes life into him. Then He plants a garden, gives him real work and one clear command. Everything is ready, and God still says that something here is not good.",
    ],
    keyVerse: {
      reference: "Genesis 2:7",
      text: "And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",
    },
    question: "God formed the man with His own hands and breathed life into him. How does that change the way you see your own life?",
    closing: [],
  },
  {
    day: 7,
    chapter: 2,
    reading: "Genesis 2:19-25",
    title: "Adam, the Animals, and the First Marriage",
    milestone: "🙌 One week in. Seven days through the Bible's opening, and you are still here.",
    paragraphs: [
      "For the first time in the Bible, God looks at something and says it is not good. The man is alone in a perfect garden.",
      "God does not wait to be asked. He brings the animals, lets Adam name every one, and lets him feel exactly what is missing. Then He makes the woman. The chapter closes on two people with nothing between them and nothing to hide.",
    ],
    keyVerse: {
      reference: "Genesis 2:24",
      text: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",
    },
    question: "God saw Adam's need before Adam said a word. What need in your life do you need to trust God with?",
    closing: [],
  },
  {
    day: 8,
    chapter: 3,
    reading: "Genesis 3:1-13",
    title: "Temptation, the Fall, and Hiding from God",
    milestone: null,
    paragraphs: [
      "Same garden. Same two people. Same bodies. Yesterday they had nothing to hide. Today they are crouched behind the trees with leaves tied around them, hoping God will not find them.",
      "It started with a question. Did God really say that. One bite turned openness into hiding and love into blame, and both of them pointed at somebody else before either admitted a thing.",
    ],
    keyVerse: {
      reference: "Genesis 3:1",
      text: "Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?",
    },
    question: "Where is a voice in your life asking, did God really say that?",
    closing: [],
  },
  {
    day: 9,
    chapter: 3,
    reading: "Genesis 3:14-24",
    title: "Judgment and Leaving the Garden",
    milestone: null,
    paragraphs: [
      "This is the hardest part of the opening of Genesis to read. God speaks judgment over the serpent, the woman, the man and the ground itself, and the world gets hard.",
      "Now notice how fast the hope comes. Before the man and the woman hear one word about themselves, God tells the serpent that the woman's seed will crush his head. They walk out into a hard world clothed in skins God made, carrying a promise.",
    ],
    keyVerse: {
      reference: "Genesis 3:15",
      text: "And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel.",
    },
    question: "What does Genesis 3:15 tell you about how quickly God moves toward hope?",
    closing: [],
  },
  {
    day: 10,
    chapter: 4,
    reading: "Genesis 4:1-10",
    title: "Cain and Abel",
    milestone: "📖 Day 10 of 21. Almost halfway.",
    paragraphs: [
      "Two brothers. Same mother, same father, same family story. Both bring something to God, and one gift is received and one is not.",
      "Look at what each of them brought. Abel brought the firstlings of his flock and the fat of them. Cain brought some of the fruit. And before the day is over, one brother is dead in a field, after God had already warned the other that sin was crouching at his door.",
    ],
    keyVerse: {
      reference: "Genesis 4:4",
      text: "And Abel, he also brought of the firstlings of his flock and of the fat thereof. And the LORD had respect unto Abel and to his offering:",
    },
    question: "Does God get your first and best, or what is left over?",
    closing: [],
  },
  {
    day: 11,
    chapter: 4,
    reading: "Genesis 4:11-18",
    title: "Cain's Judgment and the Land of Nod",
    milestone: null,
    paragraphs: [
      "Cain is a farmer. The ground is how he eats and where he poured his sweat every day, and now the ground he loved is going to turn on him.",
      "Listen to what he says when he hears the sentence. He is not crying about his brother. He is frightened of what it will cost him. He goes out from the presence of the LORD and builds a city, but a man running from God is still a man running from God.",
    ],
    keyVerse: {
      reference: "Genesis 4:13",
      text: "And Cain said unto the LORD, My punishment is greater than I can bear.",
    },
    question: "When you face the consequences of something you did, are you sorrier about what you did or about what it cost you?",
    closing: [],
  },
  {
    day: 12,
    chapter: 4,
    reading: "Genesis 4:19-26",
    title: "Lamech and the Birth of Seth",
    milestone: null,
    paragraphs: [
      "Cain hid a killing in a field. A few generations later Lamech stands in front of his two wives and turns his own into a song.",
      "That is how fast it falls. And right there in the same chapter a second line begins. Adam and Eve have another son, and the chapter ends not with a man shouting his own name but with people calling on the name of the LORD.",
    ],
    keyVerse: {
      reference: "Genesis 4:26",
      text: "And to Seth, to him also there was born a son; and he called his name Enos: then began men to call upon the name of the LORD.",
    },
    question: "Is there someone who hurt you that you still want to pay back?",
    closing: [],
  },
  {
    day: 13,
    chapter: 5,
    reading: "Genesis 5:1-32",
    title: "From Adam to Noah",
    milestone: null,
    paragraphs: [
      "Most people skip the page full of begat and enormous numbers. Slow down today, because this list is doing something.",
      "Ten men, the same sentences over and over, and the same ending every single time. And he died. Then one man does not get that ending at all. The longest life on the page is not the one you will remember. The one you remember is the man who walked with God.",
    ],
    keyVerse: {
      reference: "Genesis 5:24",
      text: "And Enoch walked with God: and he was not; for God took him.",
    },
    question: "If your life were written in Genesis 5, what would be said about it besides how long it lasted?",
    closing: [],
  },
  {
    day: 14,
    chapter: 6,
    reading: "Genesis 6:1-8",
    title: "What Happened to Humanity?",
    milestone: "📖 Day 14 of 21. One week left.",
    paragraphs: [
      "God looked at everything He had made and called it very good. Now He looks at the same world and sees that every imagination of the thoughts of the heart is only evil continually.",
      "And it grieved Him at His heart. That is not a God who stopped caring. Every other report in today's reading starts with God seeing evil. This one ends with God looking at one man with favour.",
    ],
    keyVerse: {
      reference: "Genesis 6:8",
      text: "But Noah found grace in the eyes of the LORD.",
    },
    question: "What has the world around you made feel normal that God calls evil?",
    closing: [],
  },
  {
    day: 15,
    chapter: 6,
    reading: "Genesis 6:9-22",
    title: "Building Before the Rain",
    milestone: null,
    paragraphs: [
      "God tells Noah to build something he has never built, for a disaster nobody can see coming. No storm clouds. No warning. Just a word from God and a set of measurements.",
      "Most of us will never be asked to build an ark. Most of us already know something God has told us to do and have not done yet. Noah did all of it, and when he finished, nothing in the sky had changed.",
    ],
    keyVerse: {
      reference: "Genesis 6:22",
      text: "Thus did Noah; according to all that God commanded him, so did he.",
    },
    question: "What is one thing you already know God wants you to do that you have not done yet?",
    closing: [],
  },
  {
    day: 16,
    chapter: 7,
    reading: "Genesis 7:1-10",
    title: "Entering the Ark",
    milestone: null,
    paragraphs: [
      "A finished boat sitting on dry ground has not saved anybody yet. You can build something for years and never step inside it.",
      "Building is one thing. Going in is another. God says come, and Noah walks in, with seven days still to go and not a drop of rain on the ground.",
    ],
    keyVerse: {
      reference: "Genesis 7:1",
      text: "And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation.",
    },
    question: "Is there something you have been preparing for a long time but have not actually stepped into yet?",
    closing: [],
  },
  {
    day: 17,
    chapter: 7,
    reading: "Genesis 7:11-24",
    title: "When the Waters Rose",
    milestone: null,
    paragraphs: [
      "Most of us have seen this painted on a nursery wall. A cute boat, smiling giraffes, a rainbow in the corner. Genesis 7 describes the end of a world.",
      "Water burst up from below and poured down from above until the highest hills were covered. And in the middle of it is one short line that changes how you read everything around it. Noah was not the one who shut the door.",
    ],
    keyVerse: {
      reference: "Genesis 7:16",
      text: "And they that went in, went in male and female of all flesh, as God had commanded him: and the LORD shut him in.",
    },
    question: "Why do you think Genesis tells us that the LORD shut the door instead of Noah?",
    closing: [],
  },
  {
    day: 18,
    chapter: 8,
    reading: "Genesis 8:1-5",
    title: "God Remembered Noah",
    milestone: null,
    paragraphs: [
      "Months of water. No land anywhere, no other people anywhere, just eight of them and the sound of water against the wood. If you were in that boat you would start to wonder whether God still knew you were in it.",
      "Then comes the line the whole story turns on. God remembered Noah. It does not mean He had forgotten. It means He moved. A wind passes over the earth, the waters go down, and the ark comes to rest.",
    ],
    keyVerse: {
      reference: "Genesis 8:1",
      text: "And God remembered Noah, and every living thing, and all the cattle that was with him in the ark: and God made a wind to pass over the earth, and the waters asswaged;",
    },
    question: "Is there a place in your life where you feel like God has forgotten you?",
    closing: [],
  },
  {
    day: 19,
    chapter: 8,
    reading: "Genesis 8:6-12",
    title: "The Raven, the Dove, and the Wait",
    milestone: null,
    paragraphs: [
      "Noah could have sat there and waited for a voice from heaven. He could have kicked the door open and walked out. He does neither.",
      "He opens a window and sends a bird. It finds nowhere to rest. He waits seven days and sends it again, and this time it comes back with a fresh olive leaf in its mouth. Waiting on God is not the same as doing nothing, and it is not the same as rushing ahead.",
    ],
    keyVerse: {
      reference: "Genesis 8:11",
      text: "And the dove came in to him in the evening; and, lo, in her mouth was an olive leaf pluckt off: so Noah knew that the waters were abated from off the earth.",
    },
    question: "When you are waiting on God, do you lean more toward doing nothing or toward rushing ahead?",
    closing: [],
  },
  {
    day: 20,
    chapter: 8,
    reading: "Genesis 8:13-19",
    title: "Stepping onto Dry Ground",
    milestone: null,
    paragraphs: [
      "The ground is dry. Noah can see it from the window. And he stays inside.",
      "A bird finding a home is not the same thing as God saying go. He went in because God said come in, and he comes out because God says go forth. The ark was where God kept them. The open ground is where God sends them.",
    ],
    keyVerse: {
      reference: "Genesis 8:16",
      text: "Go forth of the ark, thou, and thy wife, and thy sons, and thy sons' wives with thee.",
    },
    question: "Is there a place where you can see dry ground but have not heard God say go?",
    closing: [],
  },
  {
    day: 21,
    chapter: 8,
    reading: "Genesis 8:20-22",
    title: "An Altar and a New Beginning",
    milestone: "🎉 Day 21. The last day. You have read the first eight chapters of the Bible.",
    paragraphs: [
      "Dry ground for the first time in a year. The first thing Noah does is not build a house, or plant a field, or go and look around. He builds an altar.",
      "And God answers with a promise held up by nothing except His own word. Seedtime and harvest, cold and heat, summer and winter, day and night. People have not changed. God gives them a future anyway, and it starts with worship.",
    ],
    keyVerse: {
      reference: "Genesis 8:22",
      text: "While the earth remaineth, seedtime and harvest, and cold and heat, and summer and winter, and day and night shall not cease.",
    },
    question: "When God brings you through something hard, what is the first thing you do?",
    closing: [
      "That is all 21 days. Thank you for reading the beginning of everything with us.",
    ],
  },
];

export function getBeginningDailyPost(day: number) {
  return BEGINNING_DAILY_POSTS.find((entry) => entry.day === day) || null;
}
