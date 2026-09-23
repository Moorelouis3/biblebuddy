// The Wisdom of Proverbs: the 31 daily group posts (2026-09-23).
//
// Louis wrote these (PROVERBS_DAILY_POSTS_REWRITTEN_WITH_LINKS.md) - keep the
// wording as it is. One entry per community day. Key verse text was checked
// word for word against the KJV the Bible reader uses
// (public/kjv/proverbs/<chapter>.json). The daily cron turns an entry into a
// group post with buildPostContent() in lib/communityEventDailyPost.ts, which
// adds the "Complete Day N here" link to that day in the devotional.
//
// Rendered review copy of all 31: docs/PROVERBS_DAILY_POSTS.md.

export type ProverbsDailyPost = {
  day: number;
  chapter: number;
  title: string;
  /** Milestone line above the reading (day 1, 7, 10, 15, 21, 25, 28, 30, 31). */
  milestone: string | null;
  /** The body, one paragraph per entry. */
  paragraphs: string[];
  keyVerse: { reference: string; text: string };
  question: string;
  /** Extra lines under the closing (day 31 only). */
  closing: string[];
};

export const PROVERBS_DAILY_POSTS: ProverbsDailyPost[] = [
  {
    day: 1,
    chapter: 1,
    title: "Whose Voice Will You Listen To?",
    milestone: "🙌 Welcome to Day 1. We’re starting this 31-day walk through Proverbs together.",
    paragraphs: [
      "There are a lot of voices trying to tell you how to live, and Proverbs 1 opens by asking which one you will follow.",
      "Solomon, the king who asked God for wisdom, lays the foundation for the whole book: wisdom starts with God, not with you. Then another voice shows up saying 'come with us,' and the chapter shows exactly where that road ends.",
    ],
    keyVerse: {
      reference: "Proverbs 1:7",
      text: "The fear of the LORD is the beginning of knowledge: but fools despise wisdom and instruction.",
    },
    question: "Which voice has the most say in your decisions right now, and is it pulling you toward God or away from Him?",
    closing: [],
  },
  {
    day: 2,
    chapter: 2,
    title: "How Badly Do You Want Wisdom?",
    milestone: null,
    paragraphs: [
      "Proverbs 2 opens with the word 'if,' because wisdom does not just show up.",
      "Solomon says to search for it like silver and hidden treasure, which starts with admitting you need it and then going after it on purpose. And the good news is that God is the one who gives it.",
    ],
    keyVerse: {
      reference: "Proverbs 2:4-5",
      text: "If thou seekest her as silver, and searchest for her as for hid treasures; Then shalt thou understand the fear of the LORD, and find the knowledge of God.",
    },
    question: "What is one area of your life where you need God's wisdom right now, and what would really searching for it look like this week?",
    closing: [],
  },
  {
    day: 3,
    chapter: 3,
    title: "How to Trust in God's Wisdom",
    milestone: null,
    paragraphs: [
      "Most of us already know some of what God wants from us.",
      "Proverbs 3 is about the gap between knowing and doing, and Solomon puts one word right in the middle of it: trust. Trusting God means you stop being the final authority, bring Him into your decisions, and let Him correct you when you are wrong.",
    ],
    keyVerse: {
      reference: "Proverbs 3:5-6",
      text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    },
    question: "Where are you leaning on your own understanding right now instead of trusting God with it?",
    closing: [],
  },
  {
    day: 4,
    chapter: 4,
    title: "How to Walk in God's Wisdom",
    milestone: null,
    paragraphs: [
      "Knowing the right path does not mean you will stay on it.",
      "Proverbs 4 is about what to do after you find wisdom: guard your heart, keep your eyes looking straight ahead, and do not turn to the right or the left. Solomon taught all of this and still drifted later in life, which makes him the warning.",
    ],
    keyVerse: {
      reference: "Proverbs 4:23",
      text: "Keep thy heart with all diligence; for out of it are the issues of life.",
    },
    question: "What is one thing that has been slowly pulling your heart off course, and what would guarding against it look like?",
    closing: [],
  },
  {
    day: 5,
    chapter: 5,
    title: "How Lust Can Take You Off the Path",
    milestone: null,
    paragraphs: [
      "Sometimes the thing that pulls you off the path is simply what you want.",
      "Proverbs 5 warns about lust, a desire strong enough to make you forget what you know and risk what you spent years building. David and Solomon both knew God, and both let desire take them somewhere they should never have gone.",
    ],
    keyVerse: {
      reference: "Proverbs 5:22",
      text: "His own iniquities shall take the wicked himself, and he shall be holden with the cords of his sins.",
    },
    question: "Proverbs 5 says to stay far away from temptation instead of testing how close you can get. Why do you think God gives us boundaries like that?",
    closing: [],
  },
  {
    day: 6,
    chapter: 6,
    title: "Seven Things God Hates",
    milestone: null,
    paragraphs: [
      "Proverbs 6 lists seven things the LORD hates, and what stands out is how normal some of them can feel.",
      "Pride, lying, and words that stir up trouble between people rarely blow up your life in one day. They just slowly change who you are, one small step at a time.",
    ],
    keyVerse: {
      reference: "Proverbs 6:16-19",
      text: "These six things doth the LORD hate: yea, seven are an abomination unto him: A proud look, a lying tongue, and hands that shed innocent blood, An heart that deviseth wicked imaginations, feet that be swift in running to mischief, A false witness that speaketh lies, and he that soweth discord among brethren.",
    },
    question: "Of the seven things God hates in Proverbs 6, which one stood out to you the most, and why that one?",
    closing: [],
  },
  {
    day: 7,
    chapter: 7,
    title: "Stop Flirting With Temptation",
    milestone: "🔥 One full week down. Keep showing up.",
    paragraphs: [
      "Proverbs 7 tells the story of a young man who never decided to sin.",
      "He only decided to take a walk, and he walked right past her corner. Solomon shows that the fall starts long before the door, so the wise move is to stop asking how close you can get.",
    ],
    keyVerse: {
      reference: "Proverbs 7:25",
      text: "Let not thine heart decline to her ways, go not astray in her paths.",
    },
    question: "Proverbs 6:27 asks, \"Can a man take fire in his bosom, and his clothes not be burned?\" What does that picture teach you about how temptation works?",
    closing: [],
  },
  {
    day: 8,
    chapter: 8,
    title: "Wisdom Was Here First",
    milestone: null,
    paragraphs: [
      "In Proverbs 8, Wisdom speaks for herself.",
      "She calls out in the streets to anyone who will listen, then takes us back before the mountains and before the world was made to show that she was with God from the beginning. The wisdom this whole book points us to is the same wisdom God used to build everything.",
    ],
    keyVerse: {
      reference: "Proverbs 8:35",
      text: "For whoso findeth me findeth life, and shall obtain favour of the LORD.",
    },
    question: "What does it mean to you that God's wisdom is older than the world itself?",
    closing: [],
  },
  {
    day: 9,
    chapter: 9,
    title: "Two Invitations",
    milestone: null,
    paragraphs: [
      "Proverbs 9 ends with two invitations on the same street.",
      "Wisdom has built a house and set a table, and Folly sits at her own door calling to the same people with almost the same words. The difference is what each one leaves out, and every one of us has to turn in somewhere.",
    ],
    keyVerse: {
      reference: "Proverbs 9:10",
      text: "The fear of the LORD is the beginning of wisdom: and the knowledge of the holy is understanding.",
    },
    question: "Wisdom and Folly both call out in Proverbs 9. Which invitation do you hear the loudest in your life right now?",
    closing: [],
  },
  {
    day: 10,
    chapter: 10,
    title: "While It's Still Summer",
    milestone: "💪 Day 10. You’re almost one-third of the way through Proverbs.",
    paragraphs: [
      "Proverbs 10 names another way to end up off the path: laziness.",
      "Not only the obvious kind, but the kind that wants the harvest without doing any of the gathering. Solomon says the wise son gathers in summer, while there is still time, before the season turns.",
    ],
    keyVerse: {
      reference: "Proverbs 10:5",
      text: "He that gathereth in summer is a wise son: but he that sleepeth in harvest is a son that causeth shame.",
    },
    question: "What is one thing you could start preparing for now, while it is still summer in your life?",
    closing: [],
  },
  {
    day: 11,
    chapter: 11,
    title: "Your Path Runs Through Other People",
    milestone: null,
    paragraphs: [
      "Proverbs 11 turns the camera around and asks what wisdom looks like once other people are involved.",
      "Solomon talks about honest scales, keeping what people trust you with, and being generous, because wisdom is not only what happens inside you but how you treat the person standing right next to you.",
    ],
    keyVerse: {
      reference: "Proverbs 11:1",
      text: "A false balance is abomination to the LORD: but a just weight is his delight.",
    },
    question: "Proverbs 11 says honest scales delight God. Why do you think honesty in the small things matters so much to Him?",
    closing: [],
  },
  {
    day: 12,
    chapter: 12,
    title: "Nobody Can Tell Him Anything",
    milestone: null,
    paragraphs: [
      "In Proverbs 12, Solomon starts putting the wise man and the fool side by side.",
      "His fool is not someone who knows too little. He is someone nobody can tell anything, because he always feels right, and that kind of pride cost Solomon's own son most of a kingdom.",
    ],
    keyVerse: {
      reference: "Proverbs 12:15",
      text: "The way of a fool is right in his own eyes: but he that hearkeneth unto counsel is wise.",
    },
    question: "When was the last time you changed something because someone gave you honest counsel?",
    closing: [],
  },
  {
    day: 13,
    chapter: 13,
    title: "What Your Mouth Costs You",
    milestone: null,
    paragraphs: [
      "Proverbs 13 says guarding your mouth guards your life.",
      "Solomon is not only warning about hurting other people with words, but about what our own words do to us. A lot of what people carry started as one sentence said in anger, embarrassment, or the need to be liked.",
    ],
    keyVerse: {
      reference: "Proverbs 13:3",
      text: "He that keepeth his mouth keepeth his life: but he that openeth wide his lips shall have destruction.",
    },
    question: "Think of a time your own words cost you something. What would guarding your mouth have looked like in that moment?",
    closing: [],
  },
  {
    day: 14,
    chapter: 14,
    title: "How Do You Know It's God?",
    milestone: null,
    paragraphs: [
      "The hard part is often not wanting to follow God but telling which thought in your head is really Him.",
      "Proverbs 14 warns that there is a way that seems right and still ends in death, and Solomon writes that sentence twice in this book so we will not miss it. You will not know it is God by how it feels, but because it holds up when you check it against what He has already said.",
    ],
    keyVerse: {
      reference: "Proverbs 14:12",
      text: "There is a way which seemeth right unto a man, but the end thereof are the ways of death.",
    },
    question: "When you are trying to figure out whether something is from God, how do you check it?",
    closing: [],
  },
  {
    day: 15,
    chapter: 15,
    title: "How You Answer People",
    milestone: "📍 Day 15. We’re right around the halfway point.",
    paragraphs: [
      "Someone is going to say something unfair to you today, and you will have about two seconds to answer.",
      "Proverbs 15 says a soft answer turns away wrath and harsh words stir up anger. You can be completely right and still make things worse, so it matters what your answer is really for.",
    ],
    keyVerse: {
      reference: "Proverbs 15:1",
      text: "A soft answer turneth away wrath: but grievous words stir up anger.",
    },
    question: "What does giving a soft answer look like when you know you are right?",
    closing: [],
  },
  {
    day: 16,
    chapter: 16,
    title: "Pride Doesn't Feel Like Pride",
    milestone: null,
    paragraphs: [
      "Everybody agrees pride is bad, and almost nobody thinks they have it.",
      "Proverbs 16 says pride goes before destruction, which means it shows up first, while there is still time to deal with it. The trouble is that pride never feels like pride, only like confidence and being right.",
    ],
    keyVerse: {
      reference: "Proverbs 16:18",
      text: "Pride goeth before destruction, and an haughty spirit before a fall.",
    },
    question: "If pride does not feel like pride, how can you tell when it is creeping into your life?",
    closing: [],
  },
  {
    day: 17,
    chapter: 17,
    title: "Who Shows Up",
    milestone: null,
    paragraphs: [
      "We call almost anybody a friend, but Proverbs 17 describes something much smaller and much heavier.",
      "A real friend loves at all times, shows up when life is hard, lets things go, and tells you the truth. The harder question is not whether you have friends like that, but whether you are one.",
    ],
    keyVerse: {
      reference: "Proverbs 17:17",
      text: "A friend loveth at all times, and a brother is born for adversity.",
    },
    question: "Who has been that kind of friend to you, and who could you be that kind of friend to this week?",
    closing: [],
  },
  {
    day: 18,
    chapter: 18,
    title: "The Wall That Isn't There",
    milestone: null,
    paragraphs: [
      "Most of us carry a number in our heads, the amount of money we think would finally make us feel safe.",
      "Proverbs 18 says the rich man's wealth is a high wall only in his own imagination. The name of the LORD is the real strong tower, and the question is which one you run to when something goes wrong.",
    ],
    keyVerse: {
      reference: "Proverbs 18:10",
      text: "The name of the LORD is a strong tower: the righteous runneth into it, and is safe.",
    },
    question: "When something goes wrong in your life, what do you run to first for safety?",
    closing: [],
  },
  {
    day: 19,
    chapter: 19,
    title: "Mad at God for a Fire You Set",
    milestone: null,
    paragraphs: [
      "Anger always tells you something matters, but it often points at the wrong person.",
      "Proverbs 19 describes a man whose own foolishness ruins his way, and then his heart frets against the LORD. Solomon asks us to be slow to anger and to trace it back honestly before we aim it at anyone, especially God.",
    ],
    keyVerse: {
      reference: "Proverbs 19:3",
      text: "The foolishness of man perverteth his way: and his heart fretteth against the LORD.",
    },
    question: "Have you ever been angry at God about something that started with your own choice? What helped you see it?",
    closing: [],
  },
  {
    day: 20,
    chapter: 20,
    title: "Waiting Is Not the Same as Forgiving",
    milestone: null,
    paragraphs: [
      "Sometimes we say we have moved on from a hurt when we are really just waiting for a chance to even the score.",
      "Proverbs 20 says not to repay evil but to wait on the LORD, and He will save you. Solomon takes the wrong seriously, but he says it is not yours to settle.",
    ],
    keyVerse: {
      reference: "Proverbs 20:22",
      text: "Say not thou, I will recompense evil; but wait on the LORD, and he shall save thee.",
    },
    question: "What is the difference between waiting on God and quietly holding on to a grudge?",
    closing: [],
  },
  {
    day: 21,
    chapter: 21,
    title: "Prepare the Horse Anyway",
    milestone: "🔥 Three weeks in. Ten days left after today.",
    paragraphs: [
      "Some people stop preparing because God is in control, and others work like everything depends on them.",
      "Proverbs 21 answers both in one verse: the horse is prepared for battle, but safety is of the LORD. You own the work, and God owns the outcome.",
    ],
    keyVerse: {
      reference: "Proverbs 21:31",
      text: "The horse is prepared against the day of battle: but safety is of the LORD.",
    },
    question: "In what you are working toward right now, what part is yours to do and what part do you need to hand to God?",
    closing: [],
  },
  {
    day: 22,
    chapter: 22,
    title: "Who You Work For",
    milestone: null,
    paragraphs: [
      "Debt is a trade you make with your future self.",
      "Proverbs 22 says the borrower is servant to the lender, which means some of your hours and options are already spoken for. Solomon does not shame anyone for owing money, but he wants you to see what it really costs and to value a good name over great riches.",
    ],
    keyVerse: {
      reference: "Proverbs 22:7",
      text: "The rich ruleth over the poor, and the borrower is servant to the lender.",
    },
    question: "Proverbs 22:1 says \"A good name is rather to be chosen than great riches.\" What does a good name mean to you?",
    closing: [],
  },
  {
    day: 23,
    chapter: 23,
    title: "How Much Is Too Much?",
    milestone: null,
    paragraphs: [
      "Wine shows up all through the Bible, so the question in Proverbs 23 is not whether it exists but where the line is.",
      "Solomon's longest warning on any one subject is here, a picture of a man who cannot stop. The line was never the drink itself, but whether you are still in control.",
    ],
    keyVerse: {
      reference: "Proverbs 23:31-32",
      text: "Look not thou upon the wine when it is red, when it giveth his colour in the cup, when it moveth itself aright. At the last it biteth like a serpent, and stingeth like an adder.",
    },
    question: "What does having enough look like to you, whether it is food, drink, money, or anything else?",
    closing: [],
  },
  {
    day: 24,
    chapter: 24,
    title: "Seven Times",
    milestone: null,
    paragraphs: [
      "Most of us treat falling as a verdict on who we are.",
      "Proverbs 24 says a just man falls seven times and rises up again, and that verse describes the good example, not the bad one. Solomon is not counting how many times you fell, only asking whether you are getting back up today.",
    ],
    keyVerse: {
      reference: "Proverbs 24:16",
      text: "For a just man falleth seven times, and riseth up again: but the wicked shall fall into mischief.",
    },
    question: "What helps you get back up after you fall short?",
    closing: [],
  },
  {
    day: 25,
    chapter: 25,
    title: "A City With No Walls",
    milestone: "🏁 We’re in the final week now. Don’t coast.",
    paragraphs: [
      "Most of the time we already know what we should do.",
      "What is missing is the thing that stands between knowing and doing. Proverbs 25 pictures a person without self control as a city whose walls are broken down, and those walls go back up one stone at a time.",
    ],
    keyVerse: {
      reference: "Proverbs 25:28",
      text: "He that hath no rule over his own spirit is like a city that is broken down, and without walls.",
    },
    question: "What is one small area where you could start rebuilding self control this week?",
    closing: [],
  },
  {
    day: 26,
    chapter: 26,
    title: "Why People Repeat It",
    milestone: null,
    paragraphs: [
      "Everybody agrees gossip is wrong, and everybody does it anyway.",
      "Proverbs 26 explains why: a whisper tastes good and goes all the way down. But where there is no talebearer, the strife dies out, so you do not have to start a fire to keep one burning.",
    ],
    keyVerse: {
      reference: "Proverbs 26:20",
      text: "Where no wood is, there the fire goeth out: so where there is no talebearer, the strife ceaseth.",
    },
    question: "Why do you think gossip is so easy to pass along, and what can you do the next time someone leans in with it?",
    closing: [],
  },
  {
    day: 27,
    chapter: 27,
    title: "Iron Sharpens Iron",
    milestone: null,
    paragraphs: [
      "You become like the people you spend your time with.",
      "Proverbs 27 says iron sharpens iron, and sharpening always involves some friction. The people who make you better are the ones allowed to tell you the truth, and you are meant to do the same for someone else.",
    ],
    keyVerse: {
      reference: "Proverbs 27:17",
      text: "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",
    },
    question: "Who in your life has permission to tell you the truth, even when it is hard to hear?",
    closing: [],
  },
  {
    day: 28,
    chapter: 28,
    title: "Admit It and Stop",
    milestone: "⏳ Four days left, including today. Finish what you started.",
    paragraphs: [
      "Everybody has something they have never said out loud.",
      "Proverbs 28 says hiding your sin will cost you, and it gives two steps instead: confess it and forsake it. And on the other side of both is not a lecture but mercy.",
    ],
    keyVerse: {
      reference: "Proverbs 28:13",
      text: "He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy.",
    },
    question: "Why do you think confessing and actually stopping both matter, and not just one of them?",
    closing: [],
  },
  {
    day: 29,
    chapter: 29,
    title: "Worried About What People Think",
    milestone: null,
    paragraphs: [
      "We change what we say and do all the time because of how people might take it.",
      "Proverbs 29 calls the fear of man a snare, a trap we walk into while chasing approval. Solomon does not tell you to stop caring about people, but to put your trust in the LORD instead.",
    ],
    keyVerse: {
      reference: "Proverbs 29:25",
      text: "The fear of man bringeth a snare: but whoso putteth his trust in the LORD shall be safe.",
    },
    question: "Where has worrying about what people think held you back, and what would trusting God look like there?",
    closing: [],
  },
  {
    day: 30,
    chapter: 30,
    title: "A Different Voice",
    milestone: "👀 Tomorrow is Day 31. One more chapter after today.",
    paragraphs: [
      "After 29 chapters of Solomon, Proverbs 30 hands the pen to a man named Agur, and the first thing he says is that he does not know very much.",
      "That humility leads to one of the most honest prayers in the Bible. He does not ask God for more, only for enough.",
    ],
    keyVerse: {
      reference: "Proverbs 30:8-9",
      text: "Remove far from me vanity and lies: give me neither poverty nor riches; feed me with food convenient for me: Lest I be full, and deny thee, and say, Who is the LORD? or lest I be poor, and steal, and take the name of my God in vain.",
    },
    question: "Agur prays, \"give me neither poverty nor riches.\" What do you think of a prayer like that?",
    closing: [],
  },
  {
    day: 31,
    chapter: 31,
    title: "What It Looks Like on Somebody",
    milestone: "🎉 Day 31. You made it through the entire book of Proverbs with us.",
    paragraphs: [
      "The book ends with a mother teaching her son, King Lemuel, what wisdom looks like when someone is actually living it.",
      "After a month of being told about wisdom, we finally get to see it in a person who works hard, deals honestly, speaks with kindness, and helps people who cannot help her back. And it all comes from the fear of the LORD, right where the book began.",
    ],
    keyVerse: {
      reference: "Proverbs 31:30",
      text: "Favour is deceitful, and beauty is vain: but a woman that feareth the LORD, she shall be praised.",
    },
    question: "Which part of the picture of wisdom in Proverbs 31 do you most want your own life to look like?",
    closing: ["🏆 **You finished all 31 chapters of Proverbs.**", "Before you leave, tell the group one thing from this month that you want to carry into your everyday life."],
  },
];

export function getProverbsDailyPost(day: number): ProverbsDailyPost | null {
  return PROVERBS_DAILY_POSTS.find((entry) => entry.day === day) || null;
}
