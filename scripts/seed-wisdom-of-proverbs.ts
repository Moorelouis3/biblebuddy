
// Script to seed "The Wisdom of Proverbs" devotional with all 21 days
// Run with: npx tsx scripts/seed-wisdom-of-proverbs.ts
console.log("🔍 Executing: scripts/seed-wisdom-of-proverbs.ts");

// Load environment variables from .env or .env.local file
import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env') });
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing environment variables!");
  console.error("");
  console.error("Required variables:");
  console.error("  SUPABASE_URL=https://your-project-id.supabase.co");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key");
  console.error("");
  console.error("Create a .env file in the project root (or add to .env.local)");
  console.error("Get these values from: Supabase Dashboard → Project Settings → API");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function parseBibleReading(reference: string): { book: string; chapter: number } {
  const match = reference.match(/^(\d+\s+)?([A-Za-z]+)\s+(\d+)/);
  if (match) {
    const book = match[1] ? `${match[1].trim()} ${match[2]}` : match[2];
    const chapter = parseInt(match[3], 10);
    return { book: book.trim(), chapter };
  }
  return { book: "Proverbs", chapter: 1 };
}

interface DevotionalDay {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_reference: string;
  reflection_question: string | null;
}

const devotionalDays: DevotionalDay[] = [
  // ─────────────────────────────────────────────
  // PART 1 — THE BOOK
  // ─────────────────────────────────────────────
  {
    day_number: 1,
    day_title: "What Is Proverbs?",
    devotional_text: `Most people treat Proverbs like a fortune cookie factory.

They flip it open, land on something like "A cheerful heart is good medicine" or "Pride goes before a fall," screenshot it, post it, and move on. And that's not wrong, exactly — those are real lines, real truth. But if that's all you've ever done with Proverbs, you've barely touched the surface of what this book is.

Proverbs is one of the oldest and most carefully constructed books in the entire Bible. It belongs to what scholars call the "wisdom literature" of the ancient Near East — a tradition of serious, deliberate reflection on what it means to live well. The Hebrews were not the only people writing wisdom literature. The Egyptians had it. The Babylonians had it. But Israel's version had something the others didn't: it was rooted in a personal God who made the world with intention, who cares about how you live in it, and who offers His own understanding to anyone who asks.

The Hebrew word at the center of this book is hokhmah. We translate it "wisdom," but that translation is thin. Hokhmah is not just book knowledge. It's not intelligence or cleverness. Hokhmah is the skill of living — the ability to navigate the real world with integrity, discernment, and clarity. It's the difference between a person who knows the right answer on a test and a person whose life actually works. Between someone who can quote principles and someone who lives by them under pressure.

The book opens in chapter 1 with a kind of table of contents for what it's trying to do: "for gaining wisdom and instruction; for understanding words of insight; for receiving instruction in prudent behavior, doing what is right and just and fair; for giving prudence to those who are simple, knowledge and discretion to the young." This is practical. It's intentional. Proverbs was written to make you better — not just more informed, but actually better.

One thing you have to understand about proverbs as a literary form: they are not promises. They are principles. There is a massive difference. A promise is unconditional: God says it, it will happen, full stop. A principle is a pattern — what tends to be true across the arc of a life, all things being equal. "Train up a child in the way he should go, and when he is old he will not depart from it." That's a principle, not a guarantee. Good parenting generally produces good outcomes. But it's not a vending machine. Proverbs is not telling you that if you do all the right things, nothing bad will ever happen to you. It's telling you that the patterns of wisdom and foolishness tend to play out in predictable ways over time.

That distinction matters. People have had their faith shipwrecked because they expected Proverbs to work like a contract and found it didn't. Read it correctly — as wisdom that shapes a life over decades, not magic words that control outcomes — and it becomes one of the most practically powerful books in the Bible.

Here's what this book is really doing. It's taking the vast, eternal wisdom of God — the same wisdom that structured the cosmos, that set the boundaries of the sea, that wove intelligence into the fabric of creation — and bringing it down to the level of your Tuesday afternoon. Your argument with your coworker. Your spending habits. Your temper. Your loneliness. Your choice of who to spend time with. It takes the character of God and says: here is what that looks like lived out in a human life.

That's what Proverbs is.

It's not a book of quick quotes. It's an invitation into a whole way of living. And it's going to take your whole life to get there — but the journey starts with one sentence, the most important sentence in the book: "The fear of the LORD is the beginning of wisdom."

We'll get there. But first, let's understand who wrote this.`,
    bible_reading_reference: "Proverbs 1:1-7",
    reflection_question: "When you think of the word 'wisdom,' what comes to mind? How does the idea of hokhmah — skill for living, not just knowledge — challenge or expand how you've thought about what it means to be a wise person?",
  },
  {
    day_number: 2,
    day_title: "Solomon — The Man Who Asked for Wisdom",
    devotional_text: `There's a moment in Solomon's life that doesn't get talked about enough.

He has just become king. His father David is dead. He is young — the text implies he was somewhere in his teens or early twenties — and the weight of the entire nation of Israel has just landed on his shoulders. He goes to Gibeon to offer sacrifices, and while he is there, God appears to him in a dream.

God says: "Ask for whatever you want me to give you."

Blank check. Anything. God Himself, offering to grant whatever you ask.

Solomon says: "Give your servant a discerning heart to govern your people and to distinguish between right and wrong."

Not wealth. Not long life. Not victory over his enemies. Wisdom. He asks for wisdom, specifically because he knows he doesn't have it and desperately needs it.

God's response is striking: "Since you have asked for this and not for long life or wealth for yourself, nor have you asked for the death of your enemies but for discernment in administering justice, I will do what you have asked. I will give you a wise and discerning heart, so that there will never have been anyone like you, nor will there ever be."

And then — because Solomon asked for the one thing and not the others — God adds the others anyway.

This is where Solomon's story is at its most beautiful. He understood that wisdom is foundational. Everything else in a life — wealth, influence, relationships, legacy — depends on whether the person at the center of it has the character and discernment to handle those things rightly. Without wisdom, power corrupts. Without wisdom, wealth destroys. Without wisdom, relationships implode. Solomon understood this at an age when most men are still figuring out what they want for dinner.

And God gave it to him. 1 Kings 4:29-31 says that God gave Solomon "wisdom and very great insight, and a breadth of understanding as measureless as the sand on the seashore... and his fame spread to all the surrounding nations." The Queen of Sheba traveled from the far side of the known world to hear him and left breathless.

So Solomon writes Proverbs. He writes most of it — chapters 1 through 29 are primarily attributed to him. He is not just a collector of sayings; he is a man who has stared at the architecture of a life from every angle and is trying to pass on what he has learned.

But here is the part of Solomon's story that you cannot skip, because Proverbs doesn't make sense without it.

Solomon fell.

The man who wrote "Above all else, guard your heart, for everything you do flows from it" — his own heart was turned. 1 Kings 11 is one of the most sobering passages in all of Scripture: "As Solomon grew old, his wives turned his heart after other gods, and his heart was not fully devoted to the LORD his God." The man who had built the Temple, who had prayed the most magnificent dedication prayer in the Bible, who had been given wisdom like no one before or since — in the end, didn't live by it.

This is not a detail to be embarrassed about or explained away. It is the whole point.

Proverbs is not the biography of a perfect man. It is the hard-won wisdom of a man who knew what was right, who had it spelled out for him in extraordinary clarity, and who still had to battle — and sometimes lose — to live it. The book is more honest, not less, because of who wrote it.

When Solomon writes about the dangers of adultery, he had been there. When he writes about money and power and pride, he was not speaking in the abstract. He was writing from the inside of a life where wisdom and foolishness were constantly at war.

That should encourage you. You are not reading the counsel of someone who had it easy. You are reading the tested wisdom of someone who knew the cost of ignoring it.

The question Solomon's life leaves on the table is the one Proverbs is trying to answer: you can know what wisdom is and still not live by it. So how do you close the gap?

That's what the next 19 days are for.`,
    bible_reading_reference: "1 Kings 3:5-14",
    reflection_question: "Solomon asked for wisdom instead of wealth or power — and got all three. What does the thing you most want to ask God for right now reveal about where your heart is? Is there something you're not asking for because you don't actually want it, even if you know you need it?",
  },
  {
    day_number: 3,
    day_title: "Three Voices, One Book",
    devotional_text: `Proverbs wasn't written all at once.

Most people assume it was — that Solomon sat down, wrote the whole thing, and handed it off. But if you actually read the book carefully, you'll notice something: it has section headers. "The proverbs of Solomon son of David, king of Israel." Then later: "These are more proverbs of Solomon, compiled by the men of Hezekiah king of Judah." Then: "The sayings of Agur son of Jakeh." Then: "The sayings of King Lemuel — an oracle his mother taught him."

Three distinct voices. Three different authors. One carefully compiled book.

The first and dominant voice is Solomon. Chapters 1 through 9 are a series of extended speeches — a father talking to his son, laying out the foundations of wisdom. This isn't proverbs yet in the traditional sense; it's extended wisdom poetry, flowing arguments about why you want wisdom and how to get it. Then chapters 10 through 22, and again chapters 25 through 29, are the collections of Solomon's proverbs — short, sharp observations about human behavior and its outcomes. He observes the lazy man, the honest trader, the quarrelsome wife, the trusted friend, the fool who speaks before thinking. He is cataloguing the patterns he has seen across decades of governing the most complex nation in the ancient world.

The second voice is Agur, in chapter 30. He is almost entirely unknown — his name appears nowhere else in Scripture, and scholars have debated for centuries whether "Agur son of Jakeh" is a real person's name or a symbolic title. What we know is his writing. And what immediately strikes you is that it sounds nothing like Solomon. Agur opens with an extraordinary confession: "I am weary, God, but I can prevail. Surely I am only a brute, not a man; I do not have human wisdom. I have not learned wisdom, nor have I attained to the knowledge of the Holy One."

This is radical humility. While Solomon writes from the position of a man who has been given vast wisdom, Agur begins by saying he doesn't have it. His chapter is full of questions and observations — four things the earth cannot bear, four things that are small but wise, four things that walk with stately bearing. He is observing the world with the posture of a student. And buried in that chapter is one of the most honest prayers in the Bible: "Give me neither poverty nor riches, but give me only my daily bread. Otherwise, I may have too much and disown you and say, 'Who is the LORD?' Or I may become poor and steal, and so dishonor the name of my God." He is asking God to keep him in the middle — not because he's afraid of abundance, but because he knows his own weaknesses well enough to be dangerous.

The third voice is Lemuel, and here the story takes an unexpected turn. Lemuel's proverbs — which close the book in chapter 31 — come not from his own wisdom. The text is explicit: "the sayings of King Lemuel — an oracle his mother taught him." A mother's wisdom, passed to her king son, preserved in Scripture. She warns him against women who will destroy him, against strong drink that clouds judgment, and then charges him to speak up for those who cannot speak for themselves: "Speak up for those who cannot speak for themselves, for the rights of all who are destitute. Speak up and judge fairly; defend the rights of the poor and needy."

And then chapter 31 ends with the famous poem about the woman of noble character — which is an acrostic in the original Hebrew, each verse beginning with the next letter of the Hebrew alphabet. A poem of such care and structure that it functions almost as a crown placed on the head of the entire book.

Why does it matter that three people wrote Proverbs?

Because it means the book is not a single perspective — it is a community of wisdom. The confident authority of Solomon. The honest humility of Agur. The maternal love of Lemuel's mother. Each voice adds something the others don't have. And the God who supervised the writing of Scripture chose to leave all three voices in, intact, rather than smooth them into one.

That's a statement about wisdom itself. Wisdom is not one person's voice. It is a chorus. It accumulates. It is passed down. It is tested by multiple lives in multiple circumstances and refined.

Which means that one of the ways you become wise is by listening — really listening — to people whose wisdom comes from a different experience than yours.`,
    bible_reading_reference: "Proverbs 30:1-9",
    reflection_question: "Agur's prayer — 'Give me neither poverty nor riches' — is an act of knowing your own weaknesses. Do you know yours well enough to pray that honestly? What conditions in your life tend to pull you away from God, and have you ever asked Him to keep you from them?",
  },
  {
    day_number: 4,
    day_title: "How to Read Proverbs Correctly",
    devotional_text: `Before we go any further, there is one thing I need to tell you about Proverbs that most people were never taught.

Proverbs are not promises.

This is not a technicality. It is not a loophole or a theological escape hatch. It is the difference between reading the book the way it was intended to be read — and having your faith shaken because you expected something the book was never designed to give you.

Here's what I mean. Proverbs 22:6: "Start children off on the way they should go, and even when they are old they will not turn from it." How many parents have held onto that verse like a lifeline? How many have done everything right — church, family dinners, prayer, modeling faith — and watched their child walk away from God anyway? And how many of those parents have wondered: was it my fault? Did I do something wrong? God said this would work. Why didn't it work?

The verse was not a guarantee. It was a principle. The principle is true: good formation in childhood gives a person the best possible chance of a rooted adult life. But children are not machines, and parenting is not a formula. The principle does not override free will. It does not promise that every child raised well will turn out well. To read it as a promise is to read it wrong — and the misreading is what sets people up for a crisis of faith.

Or take Proverbs 10:22: "The blessing of the LORD brings wealth, without painful toil for it." Does that mean every wealthy person is blessed by God and every poor person is not? Does that mean if you're struggling financially, God hasn't blessed you? Of course not. Proverbs elsewhere acknowledges that the wicked sometimes prosper (Proverbs 11:16) and that injustice is real (Proverbs 13:23). The proverb is observing a general pattern: when God's blessing is present in a life, that life tends to bear fruit. It is not a formula for getting rich. It is not telling you that all wealth is divine favor or all poverty is divine punishment.

So what is a proverb, then?

A proverb is a compressed observation about patterns in the world, drawn from long experience and filtered through the lens of wisdom. It's like a signpost — it points you in the right direction without telling you every single thing you'll encounter along the road. When Solomon writes "A gentle answer turns away wrath, but a harsh word stirs up anger," he is not promising that if you speak gently, the other person will always calm down. He is telling you what tends to be true across thousands of interactions in thousands of lives — and he is right. Gentle answers tend to de-escalate. Harsh words tend to inflame. If you build your conversational habits around that principle, your life will generally go better than if you don't.

There is another thing you need to know: Proverbs sometimes contains apparent tensions. "Do not answer a fool according to his folly, or you yourself will be just like him" (26:4). "Answer a fool according to his folly, or he will be wise in his own eyes" (26:5). Two consecutive verses that seem to contradict each other. Scholars have wrestled with this for centuries. The right answer is not to pick one and dismiss the other. The right answer is that both are true — in different situations. Sometimes you engage with foolish arguments, because silence can look like agreement. Sometimes you don't, because engaging just drags you into their level. Wisdom is knowing which situation you're in.

This is why Proverbs can't just be memorized — it has to be inhabited. You don't just learn the proverbs; you develop the judgment to know which proverb applies when. That takes time. It takes failure. It takes a life lived with your eyes open, paying attention to what works and what doesn't.

That's the work Proverbs is calling you to. Not to memorize a list of rules. To become the kind of person who sees clearly.

Read it slowly. Sit with it. Ask yourself not just "is this true?" but "when is this true? When have I seen this play out? Where has my life demonstrated this principle — or shown me the cost of ignoring it?"

That's how you read Proverbs correctly.`,
    bible_reading_reference: "Proverbs 26:1-12",
    reflection_question: "Is there a verse from Proverbs (or anywhere in the Bible) that you've been reading as a promise when it's really a principle? How does re-framing it change what you expect — and what you ask God for?",
  },
  {
    day_number: 5,
    day_title: "The Fear of the Lord — Where It All Starts",
    devotional_text: `"The fear of the LORD is the beginning of wisdom."

This sentence appears more than once in Proverbs. It appears in Psalms. It appears in Job. It is the cornerstone of the entire wisdom tradition of the Old Testament. And it is almost certainly misunderstood by most people who read it.

Because when we hear "fear," we hear something primarily emotional. Dread. Terror. The feeling you get when your car slides on ice or a doctor's appointment goes badly. And if that's what "fear of the LORD" means, then wisdom starts with cowering — with feeling constantly threatened by an unpredictable, dangerous God. That's not a foundation for a flourishing life. That's a recipe for anxiety.

That's not what the Hebrew means.

The word is yirah. And yirah is bigger than terror. The closest thing in English might be reverence — but even that is too passive, too much like sitting quietly in a cathedral. Yirah is more active than that. It is what you feel when you are in the presence of something so much larger than you that it recalibrates everything. It is awe with consequence. It is the feeling of standing at the edge of the Grand Canyon and stepping back instinctively — not because the canyon will hurt you if you don't, but because your whole body recognizes it for what it is.

The fear of the LORD is the recognition of God for what He actually is.

Not the God of your imagination — tame, manageable, somewhat like a grandfather who approves of your choices and occasionally helps you find parking. Not the God of cultural Christianity — a supporting character in your story, available when needed. The actual God. The one who spoke the cosmos into existence. The one before whom Isaiah fell on his face saying "Woe to me! I am ruined!" The one who answered Job from the whirlwind with a series of questions that left Job in silence. That God.

When you truly encounter that God, something happens to you. Your priorities rearrange. Your ego shrinks. The things that felt enormous — your reputation, your bank account, your five-year plan — suddenly look very small. And the things that felt small — integrity in unobserved moments, faithfulness when it costs something, justice for people who can't repay you — suddenly look enormously important.

That's what yirah does. It resets the scale.

And that reset is the beginning of wisdom. Because most foolish decisions in life are made by people whose scale is off. The person who lies to protect their reputation has decided that what people think of them is more important than truth. The person who cheats financially has decided that money is worth more than integrity. The person who lets bitterness take root has decided that their grievance is bigger than their calling. These are all scale problems. They are all the result of not having a clear picture of what actually matters and what doesn't.

The fear of the LORD fixes the scale.

When you know who God is — really know it, in your bones, not just as a theological statement — you can't live the same way. You stop making decisions based on what impresses people and start making decisions based on what pleases God. You stop managing your image and start developing your character. You stop trying to control outcomes and start trusting the One who actually controls them.

Proverbs 3:7: "Do not be wise in your own eyes; fear the LORD and shun evil." The alternative to fearing God is fearing yourself — trusting your own intelligence, your own judgment, your own moral instincts above everything else. And that is the definition of foolishness, because you are not that reliable. Your intelligence is limited. Your judgment is biased. Your moral instincts have been shaped by a culture that is itself confused.

The fear of the LORD is not a posture of cringing. It is a posture of clarity. It is knowing who is God and who isn't. It is knowing that you are dependent, limited, fallen — and that there is One who is not. And it is choosing to organize your whole life around that reality.

Everything else in Proverbs flows from this. Every proverb about money, about speech, about relationships, about self-control — it all assumes a person who has this foundation in place. A person who has gotten the most basic question right.

Who is God, and who are you?

Once you've answered that honestly, the rest of the book starts to make sense.`,
    bible_reading_reference: "Proverbs 3:1-12",
    reflection_question: "Be honest: in the day-to-day decisions of your life — how you spend money, how you talk about people, what you do when no one is watching — do your choices reflect someone who truly fears the LORD? Where is the gap between what you believe about God and how you actually live?",
  },

  // ─────────────────────────────────────────────
  // PART 2 — THEMES FOR TODAY
  // ─────────────────────────────────────────────
  {
    day_number: 6,
    day_title: "Your Words — The Tongue That Builds or Burns",
    devotional_text: `No single topic gets more attention in Proverbs than what comes out of your mouth.

If you went through the book and marked every verse about speech, words, the tongue, lies, gossip, slander, boasting, and flattery — you would mark well over a hundred verses. No other topic comes close. Which tells you something about what the ancient sages understood: that the most powerful and most dangerous thing a person carries into every room they walk into is their mouth.

Proverbs 18:21 says it plainly: "The tongue has the power of life and death, and those who love it will eat its fruit." Life and death. Not a minor issue. Not a personality quirk to be smiled at. The words you speak have the power to build a person up or dismantle them. They have the power to repair a relationship or end it. They have the power to spread peace or ignite a conflict that burns for years.

Let's start with the most common way people misuse words: gossip.

Proverbs 16:28: "A perverse person stirs up conflict, and a gossip separates close friends." Gossip doesn't feel dangerous in the moment because it usually travels under the disguise of concern. "I'm just saying, did you notice how she's been acting lately?" "I heard something about him that I probably shouldn't repeat, but..." The moment you say "I probably shouldn't repeat this," you have already diagnosed the problem. You know it's wrong. You're doing it anyway.

What gossip does to a community is insidious. It creates an inner circle of people who know things about someone who isn't in the room to defend themselves. It makes the listener feel special — included, trusted. And it slowly erodes trust in everyone, because if this person is telling you private things about someone else, they are telling someone else private things about you. Proverbs 11:13: "A gossip betrays a confidence, but a trustworthy person keeps a secret."

Then there are lies. Proverbs has no patience for dishonesty in any form. "The LORD detests lying lips, but he delights in people who are trustworthy" (12:22). Not "the LORD prefers honesty" or "honesty is a good policy." Lying lips are an abomination — the same word used for idolatry. The reason is not simply that lying is rude or that it causes practical problems. It's that lying distorts reality. God is truth. He made a world that operates on truth. When you introduce a lie, you are introducing a foreign substance into something built to run on something else — and things break.

And yet. The same Proverbs that commands honesty also has things to say about how honesty is delivered. Proverbs 25:11: "Like apples of gold in settings of silver is a ruling rightly given." What you say and how you say it both matter. Truth without love is brutality. There is a kind of person who prides themselves on "just being honest" as a cover for the fact that they enjoy the power of saying cutting things. That's not wisdom. That's cruelty with a virtuous label.

Proverbs 15:1: "A gentle answer turns away wrath, but a harsh word stirs up anger." The gentle answer and the harsh word can contain the same information. The difference is not what is said but how. Wisdom knows the difference — and chooses the delivery that builds rather than damages.

There is also something in Proverbs about the discipline of saying less. Proverbs 10:19: "Sin is not ended by multiplying words, but the prudent hold their tongues." Proverbs 17:28: "Even fools are thought wise if they keep silent, and discerning if they hold their tongues." There is a kind of maturity that knows not every thought needs to be spoken, not every reaction needs to be shared, not every opinion needs to be voiced. The person who is always talking is usually not saying more — they're just saying everything that crosses their mind. The person who speaks carefully and selectively carries far more weight when they do speak.

Here's a practical test Proverbs is pointing toward. Before you speak, three questions: Is it true? Is it necessary? Is it kind? Not all three are required every time — sometimes you have to say things that are true but painful, or necessary but unkind. But if the answer to all three is no, put it away.

Your words are not neutral. Every time you open your mouth, you are either building something or tearing something down. Wisdom chooses to build.`,
    bible_reading_reference: "Proverbs 18:1-21",
    reflection_question: "What is the pattern of your speech? Do you tend toward too many words, or too few? Do you struggle more with gossip, with dishonesty, or with harshness? What is one specific change you could make this week in how you use your words?",
  },
  {
    day_number: 7,
    day_title: "Pride — The Root of Most of Your Problems",
    devotional_text: `Proverbs 16:18 is probably the most famous line in the entire book: "Pride goes before destruction, a haughty spirit before a fall."

You've heard it. You've probably said it about someone else. But Proverbs is not primarily interested in the pride of other people. It is interested in yours.

Pride is the one sin that hides itself better than any other. Greed looks like greed. Lust looks like lust. Even anger is hard to disguise when it's happening. But pride — pride comes dressed as confidence, or high standards, or a refusal to be walked on, or simply knowing what you're talking about. Pride is remarkably good at sounding like something else.

Here is what pride actually is, beneath all its disguises: it is the belief that you are the standard by which things should be measured.

Not God. Not truth. Not the wisdom passed down through centuries of human failure and success. You. Your judgment. Your instincts. Your version of events.

Proverbs 12:15: "The way of fools seems right to them, but the wise listen to advice." The fool is not stupid. The fool is certain. Certainty — the kind that never questions itself, never seeks outside input, never admits the possibility of error — is the heartbeat of pride. And it leads directly to destruction, because a person who never questions themselves never catches their own mistakes.

Pride also expresses itself relationally. Proverbs 13:10: "Where there is strife, there is pride, but wisdom is found in those who take advice." Next time you find yourself in a protracted conflict with someone — not a one-time argument, but a sustained pattern of tension and hostility — ask yourself honestly: is there pride involved? Whose? Is the conflict still alive because neither person is willing to be the first to back down? Is the issue the issue, or is the real issue that someone's ego is on the line?

Most relational conflict is a pride problem wearing the costume of a principle problem.

Then there is the pride that refuses help. Proverbs 11:2: "When pride comes, then comes disgrace, but with humility comes wisdom." One of the most consistent patterns in Proverbs is the contrast between the person who receives correction and the one who rejects it. The wise person, when told they are wrong, considers it. The fool, when told they are wrong, argues. The proud person cannot receive criticism because criticism threatens the image — the carefully constructed presentation of self that says "I have it together." Admitting you were wrong dismantles the image. And the image feels worth protecting, because it's what holds everything else together.

Except it doesn't. That's the lie pride tells. The image is not load-bearing. Dropping it does not cause you to collapse. In fact, the people who drop it — who learn to say "I was wrong, I'm sorry, I don't know, I need help" — are almost always the ones whose lives actually work. Because they're living in reality instead of in the self-constructed fiction that pride requires.

There's another dimension to pride that doesn't get preached enough: spiritual pride. This is the pride of the person who believes their relationship with God is evidence of their own spiritual achievement. Who carries their Bible and their prayer life and their theological knowledge as credentials. Who measures their standing with God by comparing themselves to other people and finding themselves more devoted, more serious, more doctrinally correct.

Proverbs doesn't have a single verse on spiritual pride by that name, but the whole book is structured against it. The fear of the LORD — true wisdom's foundation — is the opposite of spiritual pride. You cannot genuinely stand before God as He actually is and come away feeling superior to other people. That's not possible. The same God who humbles the proud (Proverbs 29:23) sees right through the veneer.

Humility is not thinking poorly of yourself. It's not self-deprecation or endless apology or refusing to own your gifts. It's having an accurate picture of who you are — which means seeing both what you genuinely have and what you genuinely lack, without inflating either.

The person who can do that — who can say "here is what I'm good at, and here is where I need help" with equal comfort — is someone who has beaten pride. That's rare. That's wisdom.`,
    bible_reading_reference: "Proverbs 16:1-20",
    reflection_question: "Where does pride show up most in your life — in relationships, at work, in how you receive feedback, or in your spiritual life? What would it look like to genuinely humble yourself in that specific area this week?",
  },
  {
    day_number: 8,
    day_title: "Money — What Proverbs Actually Says",
    devotional_text: `Proverbs has more to say about money than almost any other topic.

And what it says is not what you might expect. It's not a prosperity gospel — "do the right things and God will make you rich." It's also not an asceticism gospel — "money is evil and you should want as little of it as possible." It's something more nuanced and more honest than either.

Let's start with what Proverbs does affirm. Work and diligence genuinely tend to produce wealth. "Diligent hands bring wealth, but lazy hands make for poverty" (10:4). "The plans of the diligent lead to profit as surely as haste leads to poverty" (21:5). There is no shame in legitimate prosperity. Proverbs does not romanticize poverty. It does not say that being poor is spiritually superior to being wealthy. If you work hard, live honestly, make good decisions, and manage well what you've been given — Proverbs says that tends to produce a good outcome. That is a principle worth taking seriously.

But Proverbs is equally clear that wealth is not the highest good. Proverbs 15:16-17: "Better a little with the fear of God than great wealth with turmoil. Better a small serving of vegetables with love than a fattened calf with hatred." There is something more important than the size of your bank account, and that is the quality of your life. A quiet, honest, loving life with modest means is better than a wealthy life full of anxiety, conflict, and compromise. Proverbs knows that people sometimes gain money by losing the things that actually matter — and it says clearly that this is a bad trade.

Then there is the issue of how you got the money.

Proverbs 10:2: "Ill-gotten treasures have no lasting value, but righteousness delivers from death." Proverbs 13:11: "Dishonest money dwindles away, but whoever gathers money little by little makes it grow." The book has zero tolerance for wealth acquired through deception, exploitation, or injustice. Not just because it's morally wrong — though it is — but because it doesn't last. Money gained by cheating someone, by cutting corners, by lying on a contract — it erodes. The same ethical compromise that built it continues to eat at the foundation. It cannot sustain what it pretends to produce.

There is also a consistent warning about the seductive power of wealth. Proverbs 28:22: "The stingy are eager to get rich and are unaware that poverty awaits them." Proverbs 23:4-5: "Do not wear yourself out to get rich; do not trust your own cleverness. Cast but a glance at riches, and they are gone, for they will surely sprout wings and fly off to the sky like an eagle." Wealth is unstable. It can evaporate. Building your whole sense of security on it is building on sand. The person who has money but no character, no integrity, no healthy relationships — has nothing that holds up under pressure.

This brings us to one of the most repeated economic principles in Proverbs: generosity. Proverbs 11:24-25: "One person gives freely, yet gains even more; another withholds unduly, but comes to poverty. A generous person will prosper; whoever refreshes others will be refreshed." This is not primarily a formula for getting more by giving more. It's a description of the kind of person that flourishing people tend to be. Generous people are not white-knuckling their wealth. They hold it loosely. They trust that there is enough. They don't shrink down into hoarding and protecting. And that orientation — open-handed, trusting, willing to share — turns out to be the orientation that produces actual abundance.

Proverbs 22:7 adds a note about debt: "The rich rule over the poor, and the borrower is slave to the lender." This is not saying you can never borrow. It's naming the power dynamic that debt creates. When you are indebted to someone, you are obligated. You are not fully free. Wisdom takes that seriously before signing anything.

And then there is this, the bottom line of everything Proverbs says about money: Proverbs 3:9-10: "Honor the LORD with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing." The first question about money is not how much do you have. It's what do you do with it first? Does God come first, or does He get what's left over? Wisdom puts God first — not because that earns you more, but because it settles the question of who your money actually belongs to.

Your relationship with money will tell you a great deal about your relationship with God. Proverbs knew that long before you did.`,
    bible_reading_reference: "Proverbs 11:24-28",
    reflection_question: "Be honest about your relationship with money. Is your financial life characterized more by diligence, generosity, and trust — or by anxiety, hoarding, and shortcuts? What is one specific thing Proverbs is pointing out in your financial life that you need to address?",
  },
  {
    day_number: 9,
    day_title: "Laziness vs. Diligence — The Ant Knows Something You Don't",
    devotional_text: `Proverbs is not subtle about laziness.

If you looked up every reference to the "sluggard" in Proverbs — that's the word the book uses, sluggard, a delightfully contemptuous term — you would find a character study that is both highly specific and uncomfortably recognizable. The sluggard doesn't just fail to work. The sluggard has a whole philosophy about it.

Proverbs 26:13-16: "A sluggard says, 'There's a lion in the road, a fierce lion roaming the streets!' As a door turns on its hinges, so a sluggard turns on his bed. A sluggard buries his hand in the dish; he is too lazy to bring it back to his mouth. A sluggard is wiser in his own eyes than seven people who answer discreetly."

The lion in the road. That is the sluggard's excuse — there's always a reason why today is not the day. Too risky. Too hard. The timing isn't right. The conditions aren't perfect. The lion is different every time, but there is always a lion, and the lion always keeps the sluggard in bed. And the last line is the most cutting: the sluggard is "wiser in his own eyes" than seven discerning people. Because the sluggard does not lack self-confidence. He has plenty of reasons for why his approach is actually correct and why the people who are working hard just don't understand.

Go to chapter 6 for the most famous section on this. Proverbs 6:6-11: "Go to the ant, you sluggard; consider its ways and be wise! It has no commander, no overseer or ruler, yet it stores its provisions in summer and gathers its food at harvest. How long will you lie there, you sluggard? When will you get up from your sleep? A little sleep, a little slumber, a little folding of the hands to rest — and poverty will come on you like a thief and hardship like an armed man."

The ant has no supervisor. No one is standing over it, checking its work, incentivizing its behavior. It does the work because it understands the season and acts accordingly. It sees that summer is here — the time to gather — and it gathers. It does not wait to be told. It does not require an overseer. It is internally motivated by an honest assessment of reality.

That's what Proverbs is asking from you. Not that you work yourself to death. Not that you be driven by anxiety or performance or the need to prove yourself. But that you be honest about the season you're in and do the work that the season requires — without needing someone to push you.

The contrast figure is the diligent person. Proverbs 10:4: "Lazy hands make for poverty, but diligent hands bring wealth." Proverbs 12:27: "The lazy do not roast any game, but the diligent feed on the riches of the hunt." The diligent person follows through. They don't just start — they finish. They don't just plan — they execute. And over time, that consistency accumulates into something real.

Here is what Proverbs understands that our culture sometimes doesn't: the gap between the life you want and the life you have is often not a gap of talent, or opportunity, or privilege. It is a gap of diligence. Of daily, unglamorous, showing-up-when-you-don't-feel-like-it faithfulness to work. The person who does that, year after year, tends to end up somewhere significant. The person who doesn't — who waits for the perfect conditions, who always has a reason why today isn't the day — tends to end up exactly where they are right now.

There's something else worth noting. Proverbs 18:9: "One who is slack in his work is brother to one who destroys." Laziness is not neutral. It is not a benign quirk. When you fail to do the work you are responsible for — as a parent, an employee, a spouse, a friend, a citizen — it does not simply leave things unchanged. It allows things to deteriorate. Slack is destruction in slow motion.

This is not about productivity culture or hustle for its own sake. Proverbs 21:5 says: "The plans of the diligent lead to profit as surely as haste leads to poverty." Haste and diligence are different things. Diligence is steady, consistent work toward something meaningful. Haste is frantic, unfocused doing driven by anxiety. You can work frantically and accomplish nothing. You can work calmly and build something that lasts.

The ant is the model. Steady. Consistent. Doing the work that the season requires, without fanfare and without excuses.

Whatever season you are in right now — what work does it require? Are you doing it?`,
    bible_reading_reference: "Proverbs 6:6-11",
    reflection_question: "Where in your life are you the sluggard right now — where is there a 'lion in the road' that is really just an excuse? What would it look like to work like the ant this week in that specific area?",
  },
  {
    day_number: 10,
    day_title: "Friendships — Who You're Walking With",
    devotional_text: `Proverbs 13:20 is one of the most important verses in the entire book: "Walk with the wise and become wise, for a companion of fools suffers harm."

That verse is not complicated. But what it is asking of you is harder than it sounds.

Because it means the people you spend the most time with are shaping you. Not just influencing you — shaping you. The way you think, the way you talk, what you find funny, what you take seriously, what you're willing to do and unwilling to do — all of that is being formed in real time by the people you're closest to. Proverbs knows this. It takes proximity seriously. And it asks you to take it seriously too.

The word "companion" in that verse is important. It doesn't say "be careful which strangers you meet" or "avoid interacting with foolish people entirely." It says companion — the people you walk with. The ones you consistently choose to be near. The ones who see you most and influence you most. Proverbs is asking you to be intentional about that small group of people.

Proverbs 17:17: "A friend loves at all times, and a brother is born for a time of adversity." This is what real friendship looks like. Not a fair-weather relationship that's pleasant when life is going well and disappears when it isn't. A friend who loves at all times is still there when you're struggling, when you're wrong, when you're not fun to be around. When your situation is messy and there's nothing convenient about sticking close. That kind of friendship is rare. And when you find it, Proverbs says, you are finding something more precious than most people have.

Proverbs 27:6: "Wounds from a friend can be trusted, but an enemy multiplies kisses." A true friend will tell you things you don't want to hear. Not cruelly — not using "honesty" as a license to tear you down — but honestly, out of genuine love. If everyone around you agrees with everything you do, that is not a sign of how good you are. It is a sign that the people around you value your approval more than your wellbeing. The friend who will tell you the truth even when it costs them something is worth far more than a crowd of people who will tell you what you want to hear.

And then there is the companion of fools.

Proverbs 22:24-25: "Do not make friends with a hot-tempered person, do not associate with one easily angered, or you may learn their ways and get yourself ensnared." The danger is not just that a hot-tempered friend will get you into trouble with their temper. The danger is that you will learn their ways. You will start handling conflict the way they do, because that's what you've been watching and participating in. You will absorb the patterns of the people you are closest to — including the patterns you would choose not to have if you thought about it clearly.

This is hard because choosing friendships wisely can feel elitist, or cold, or like abandoning people who need you. Let me be clear about what Proverbs is not saying. It is not saying to only associate with perfect people, or to drop anyone who makes mistakes. It is not a license for spiritual snobbery or for cutting off people who are going through hard times. It is saying: be intentional about who you are walking with — who you are doing life with at a close level — because the direction they are walking will influence the direction you walk.

There is a difference between loving someone and building your life around them. You can love a destructive person — pursue their good, show them grace, be present in their pain — without making their life patterns the pattern of your own. Proverbs calls you to do both: love people in their mess, while being deliberate about not absorbing the mess.

Who are the two or three people who most consistently shape how you think and who you are becoming?

Are those the people you would choose, if you were choosing intentionally?

That's the question Proverbs is asking.`,
    bible_reading_reference: "Proverbs 27:1-10",
    reflection_question: "Think honestly about your closest friendships. Are these people making you wiser, more honest, more faithful — or more comfortable with things you know aren't good for you? Is there a friendship you need to invest more in, or one you need to have an honest conversation with yourself about?",
  },
  {
    day_number: 11,
    day_title: "Anger — The Fire You Think You Can Control",
    devotional_text: `Proverbs 29:11: "Fools give full vent to their rage, but the wise bring calm in the end."

Anger is complicated in Scripture. It's not simply forbidden. God gets angry. Jesus got angry — turned over tables, called people whitewashed tombs to their face. Righteous anger, in response to genuine injustice or sin, is part of how a morally serious person is supposed to function. The absence of anger at things that deserve anger is not virtue. It's indifference.

But that is not the anger Proverbs is worried about. Proverbs is worried about the anger that belongs to you — the habitual, reflexive, self-serving rage that fires up when things don't go your way, when people disrespect you, when life doesn't cooperate with your plans. That anger. And Proverbs is not gentle about it.

Proverbs 14:29: "Whoever is patient has great understanding, but one who is quick-tempered displays folly." Notice the framing. Patient people have great understanding. Quick-tempered people display folly. This isn't just a preference — it's a verdict on character. A hot temper is not a personality type to be accepted. It is a form of foolishness to be addressed.

Here's why. When you act out of anger, you are not thinking clearly. The emotional intensity that anger produces — the adrenaline, the narrowing of perspective, the urgent sense that something must be done right now — all of that is working against careful judgment. You say things you wouldn't say if you were calm. You make decisions you wouldn't make if you were thinking straight. And you damage relationships in ways that take years to repair, sometimes never.

Proverbs 15:18: "A hot-tempered person stirs up conflict, but the one who is patient calms a quarrel." The patient person and the hot-tempered person encounter the same situations. The same provocation, the same disrespect, the same frustrating circumstance. The difference in outcome is not in what happened to them — it's in what they do with what happened to them. The patient person slows down. Waits. Responds from a place of thought rather than reaction. And the conflict calms. The hot-tempered person fires immediately — and everything escalates.

Proverbs 19:11: "A person's wisdom yields patience; it is to one's glory to overlook an offense." Overlook an offense. This is one of the most difficult things Proverbs asks of you, because there is a part of the human ego that demands redress. When someone wrongs you, something in you says you deserve an apology, or an acknowledgment, or at minimum the satisfaction of making clear that what they did was not okay. And sometimes you do need to address it. But often — more often than you probably act on — wisdom says: let it go. This isn't worth the cost of the conflict it would start. I can absorb this.

That is not weakness. Proverbs calls it glory. The person who can take an offense and choose not to make it the center of the moment has more actual strength than the person who fires back every time. Because controlling your temper requires the same muscle as everything else in Proverbs — discipline, long-term thinking, the ability to act on principle rather than impulse.

Proverbs 25:28: "Like a city whose walls are broken through is a person who lacks self-control." A city without walls in the ancient world was defenseless — open to invasion from any direction, at any time, with no capacity to protect itself. That is what a person without self-control looks like. Every little irritant gets in. Every provocation produces a reaction. There is no capacity to screen, filter, or choose. You are at the mercy of whatever hits you.

The walls are self-control. And they have to be built.

If anger is a pattern for you — if the people closest to you have learned to walk on eggshells, if you have said things in anger that you deeply regret, if your temper has cost you relationships or opportunities — Proverbs is not simply telling you to try harder. It is telling you that something deeper needs to happen. The person who is quick to anger is usually afraid of something, or feels threatened by something. Get there. What is it? What is the thing under the anger that believes it needs to fight to be safe?

When you find that, you're getting somewhere.`,
    bible_reading_reference: "Proverbs 15:1-18",
    reflection_question: "How does anger show up in your life — as a pattern, as occasional explosions, as passive-aggressive silence? What is usually underneath it? What would it look like to build 'walls' of self-control in the specific situation where your anger is most likely to fire?",
  },
  {
    day_number: 12,
    day_title: "Honesty — Living Without a Double Life",
    devotional_text: `Proverbs 12:17: "An honest witness tells the truth, but a false witness tells lies."

That sounds obvious. But Proverbs spends a remarkable amount of time on honesty because living honestly is harder than it sounds — and because dishonesty in its many forms is one of the most common ways that people quietly destroy the things they're trying to build.

Let's start with the big one. Lying.

Proverbs 12:19: "Truthful lips endure forever, but a lying tongue lasts only a moment." Proverbs 19:9: "A false witness will not go unpunished, and whoever pours out lies will perish." The repeated verdict in Proverbs on lying is not just that it's wrong — it's that it doesn't work. Not in the long run. The lie that protects you today becomes the thing you have to maintain tomorrow, and the lie you have to tell to maintain it, and the life you have to construct around all of it. The liar doesn't just sin once — they enter a maintenance project that never ends, that consumes energy that could have gone elsewhere, and that almost always eventually collapses.

The honest person has none of that overhead. What they said yesterday is what they'll say today. They don't have to remember their story. Their life has integrity in the literal sense — it holds together as one piece.

But Proverbs is honest that there are subtler forms of dishonesty too.

Proverbs 20:14: "It's no good, it's no good!" says the buyer — then goes off and boasts about the purchase." This is the ancient version of negotiating in bad faith — playing down what something is worth to get a better price, then bragging about the deal. The transaction is technically legal. No laws are broken. But something has been misrepresented. Someone has been deceived. Proverbs calls it out without flinching.

Proverbs 26:24-26: "Enemies disguise themselves with their lips, but in their hearts they harbor deceit. Though their speech is charming, do not believe them, for seven abominations fill their hearts. Their malice may be concealed by deception, but their wickedness will be exposed in the assembly." This is about the person whose outward presentation — friendly, agreeable, charming — conceals what they are actually thinking and actually doing. Double life. Public face. This is one of the most corrosive forms of dishonesty because it is invisible to everyone except the person doing it. And it corrodes from the inside.

Proverbs 11:3: "The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity." Integrity is the word — wholeness, one-ness, the same person in every room. The upright person is guided by their integrity. It's what tells them which way to go, because they only have one set of values, not different ones for different audiences. The duplicitous person has split themselves — and the split eventually tears them apart.

There is something deeply freeing about complete honesty. Not performative honesty — not weaponized "I'm just being real" that uses truth as a bludgeon. But the kind of honesty where you are genuinely the same person in every room, where what you say about someone to their face is what you say about them behind their back, where your public life and your private life are the same life.

Proverbs 10:9: "Whoever walks in integrity walks securely, but whoever takes crooked paths will be found out." Security — that is what integrity gives you. Not safety from every external problem. But a kind of internal security that comes from having nothing to hide. No story to maintain. No version of events to remember. You told the truth. You did what you said you would do. You are the same in every room.

That is not a small thing. In a world saturated with spin, performance, and carefully curated presentations of self — the person who just tells the truth is unusual. Trustworthy. Safe to be around.

Is that you?`,
    bible_reading_reference: "Proverbs 12:17-22",
    reflection_question: "Where is there a gap between your public self and your private self — between what you present and what is actually true? Is there something you are not being honest about, either with God, with someone close to you, or with yourself?",
  },
  {
    day_number: 13,
    day_title: "Trusting God — Letting Go of the Need to Control",
    devotional_text: `There is one passage in Proverbs that most people know even if they've never read the book.

Proverbs 3:5-6: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."

It appears on coffee mugs and Instagram captions and wall art in countless Christian homes. And the familiarity of it has, I suspect, dulled us to how radical it actually is.

"Lean not on your own understanding."

That is a staggering instruction. Not a caveat — "lean less on your own understanding" or "supplement your own understanding with God's." Complete it. All the way. Don't lean on it. Because here is what it is saying: your understanding is not the measure of what is true.

This is the deepest possible challenge to the natural human posture, which is to trust ourselves. We filter everything through our own experience, our own judgment, our own interpretation of events. "This is how I see it." "This is what makes sense to me." "I've thought about this, and here's my conclusion." We treat our understanding as relatively reliable — not perfect, but good enough to navigate by.

Proverbs is saying: it isn't. Not because you are stupid, but because you are limited. Your perspective is partial. Your knowledge is incomplete. Your emotional state at any given moment distorts your interpretation of what is happening. The story you tell yourself about why things happened the way they did — it's a story, shaped by your fears and hopes and history, not simply a transparent record of objective reality.

And next to all of that: there is a God who sees everything, knows everything, is not distorted by emotion or history or fear, and who is working with purposes that are larger than your life and longer than your timeline. To "lean on your own understanding" in the face of that is to insist on navigating with a small flashlight when there is a sun.

Proverbs 16:9: "In their hearts humans plan their course, but the LORD establishes their steps." This is not saying planning is wrong. Make plans. Work hard. Think carefully. Do the responsible thing. But hold the plan loosely, because the one who actually establishes where you end up is not you.

Proverbs 19:21: "Many are the plans in a person's heart, but it is the LORD's purpose that prevails." How many of your most significant moments in life were things you planned? How many of them came sideways — through an unexpected conversation, a door that closed when you wanted it open, a person you met by accident, a failure that redirected you somewhere better? The control you think you have over your own story is far smaller than it feels.

The instruction to trust God is not passive. It is not "do nothing and see what happens." Proverbs elsewhere instructs diligence, wisdom, seeking counsel, making plans, working hard. Trust is not abdication of responsibility. It is doing everything you can, faithfully, and then releasing the outcome.

That release is where most people struggle. Because control is comforting. Having a plan feels safe. Knowing what's coming next feels manageable. And trust — genuine trust in a God whose ways are not your ways and whose timeline is not your timeline — requires you to sit with uncertainty. To be okay not knowing. To do the right thing today without being able to see what it produces tomorrow.

Proverbs 3:7-8 continues: "Do not be wise in your own eyes; fear the LORD and shun evil. This will bring health to your body and nourishment to your bones." The physical language is deliberate. Anxiety lives in the body. The person who cannot release control, who is always scanning for threat, who needs to manage every outcome — their body pays for it. The person who has genuinely learned to trust God experiences something different: peace. Not as an emotion, but as a structural orientation toward life.

You are not the main character of the story. You are a character in it. And the Author knows how this ends.

Lean not on your own understanding.`,
    bible_reading_reference: "Proverbs 3:1-12",
    reflection_question: "What is the situation in your life right now where you are 'leaning on your own understanding' — relying most on your own plan, your own reading of the situation, your own ability to manage the outcome? What would it actually look like to trust God with that, today?",
  },
  {
    day_number: 14,
    day_title: "Generosity — The Open Hand",
    devotional_text: `Proverbs 11:24-25 is one of the most counterintuitive verses in Scripture:

"One person gives freely, yet gains even more; another withholds unduly, but comes to poverty. A generous person will prosper; whoever refreshes others will be refreshed."

This is not, as it's sometimes preached, a transactional formula. It is not saying: give money so that God will multiply it back to you. That reading turns generosity into a financial strategy, which is precisely the wrong way to hold money and precisely the wrong motivation for giving. You can't be generous for profit. That's just a long-term investment strategy dressed up in spiritual language.

What Proverbs is observing is a pattern in the character of people. The generous person — the one who holds their resources with an open hand, who gives without calculating whether they can afford to, who sees a need and responds — tends to be the kind of person whose life flourishes. Not because giving always produces financial return, but because the open-handed orientation toward life and toward others is the orientation of someone who trusts God, who values people, and who is not being consumed by fear. And that orientation tends to produce good outcomes in every area — not just financial.

The person who withholds — who is technically wealthy but tight-fisted, always calculating, always holding back, always finding reasons why this isn't the right time to give — ends up poor in the ways that actually matter. Poor in relationships, because people know what you really care about. Poor in joy, because the anxiety of protecting what you have consumes the pleasure of having it. Poor in spiritual vitality, because a clenched fist cannot receive.

Proverbs 19:17: "Whoever is kind to the poor lends to the LORD, and he will reward them for what they have done." There is something astonishing in that image. Lending to the LORD. When you give to someone who has nothing to give back — who cannot repay you, whose gratitude will not advance your career, whose need has no benefit to you — you are entering a transaction with God Himself. He takes your gift to the poor as a gift to Him. And He repays.

Proverbs 21:13: "Whoever shuts their ears to the cry of the poor will also cry out and not be answered." This is one of the harder sayings in Proverbs. Closed ears to the poor produce, eventually, prayers that feel like they hit the ceiling. There is a connection — mystical and practical both — between how you treat people in need and how your own cry for help is received. Generosity is not optional. It is not a virtue for particularly spiritual people. It is a requirement of character.

Proverbs 22:9: "The generous will themselves be blessed, for they share their food with the poor." The blessing here is not specified in economic terms. The generous person is blessed. Their life has the quality of blessing in it — a flourishing that goes beyond circumstances and comes from right relationship with God and with people.

Here is what generosity requires: it requires that you actually believe there is enough. The person who cannot give is the person who is afraid there won't be enough left. The fear of scarcity is what drives the closed fist. And that fear is, at its root, a statement about God — it is saying that God cannot or will not provide, that the resources available to you are only what you can hold in your hand right now, and therefore you must protect every bit of it.

Generosity says the opposite. It says: God provides. There is more where this came from. And even if there isn't — even if giving costs me — people matter more than possessions.

That is hard to feel when you are genuinely stretched. Generosity in comfort is easy. Generosity when you don't have much — that is the thing that takes faith. That is where Proverbs 11:24-25 really applies. The person who gives even from a place of limitation, who holds loosely even what they can't afford to lose — that is the person whose life Proverbs says will be filled.

What does your hand look like right now — open or closed?`,
    bible_reading_reference: "Proverbs 11:24-28",
    reflection_question: "Generosity is not just about money — it includes time, attention, and energy. Where are you most closed-fisted right now? What would it look like to give more freely in that area — and what is the fear that's keeping the hand closed?",
  },
  {
    day_number: 15,
    day_title: "Seeking Counsel — You Don't Know What You Don't Know",
    devotional_text: `Proverbs 15:22: "Plans fail for lack of counsel, but with many advisers they succeed."

There is a kind of person who never asks for help. They figure things out alone. They trust their own judgment. When things go wrong, they course-correct themselves, learn from their mistakes themselves, and move forward — alone. And there's something respectable in that. Self-reliance is not nothing. The ability to function without constant hand-holding is genuinely valuable.

But Proverbs says it's not enough. And the reason is not that self-reliant people are arrogant (though they sometimes are). The reason is simpler: you don't know what you don't know.

Every person's perspective is shaped by their experience. Their blind spots are invisible to them — by definition, if you could see them, they wouldn't be blind spots. The things you consistently get wrong are the things that feel most right to you, which is exactly why you keep getting them wrong. You need someone outside your own head to see what you can't see.

Proverbs 12:15: "The way of fools seems right to them, but the wise listen to advice." The fool's way seems right. That's the trap. Bad decisions rarely feel bad in the moment — they feel like the obvious move, the necessary choice, the reasonable response. It's only afterward that the shape of the mistake becomes clear. And by then, the damage is done.

Proverbs is pushing you toward the practice of actively seeking counsel before major decisions, not just after you've already made up your mind. There is a version of "seeking counsel" that is really just looking for someone who will agree with you. You've already decided, and now you're shopping for validation. That is not what Proverbs means. Proverbs means genuinely consulting people who know things you don't, who see your situation from outside your perspective, who are free to tell you the truth — and then actually listening to what they say.

Proverbs 19:20: "Listen to advice and accept discipline, and at the end you will be counted among the wise." Listen and accept. Not just listen and nod politely. Not listen and then do what you were going to do anyway. Actually change your course when the evidence and the counsel point in a different direction. That's what it means to be teachable. And teachability, over the course of a life, is what separates people who grow from people who stagnate.

Notice also the word "many" in Proverbs 15:22 — "with many advisers they succeed." One person's counsel is helpful. But a single advisor can have their own biases, their own limitations, their own blind spots. Multiple perspectives — especially perspectives that come from different backgrounds and different kinds of experience — give you a much fuller picture. When three different people who have nothing to gain from your decision tell you the same thing, pay attention.

Who are the people in your life who can actually tell you the truth?

Not just people who love you — though that's important. People who are further down the road than you in the area you're navigating. People who have earned the right to speak into your life and have the courage to say what they actually think. People who will push back, not just affirm.

If you don't have those people, that is the first thing to fix.

Proverbs 27:17: "As iron sharpens iron, so one person sharpens another." Sharpening requires friction. The counselors who matter most are not always the ones who make you feel good. They are the ones who leave you clearer, wiser, and more capable of seeing what is actually in front of you.

Don't be the person who figured out the hard way what someone could have told them before they tried it. Proverbs has been trying to tell you: before the plans fail, before the decision is made, before the course is set — ask.`,
    bible_reading_reference: "Proverbs 15:18-33",
    reflection_question: "Think about a significant decision you're facing right now. Have you genuinely sought counsel from people who can see your situation clearly? Who are one or two people who have earned the right to speak into your life, and what would it look like to actually ask them?",
  },
  {
    day_number: 16,
    day_title: "Sexual Integrity — Proverbs Is Not Vague About This",
    devotional_text: `Proverbs devotes more space to sexual integrity than almost any other topic in the book.

Chapters 5, 6, and 7 are extended, detailed, urgent warnings about the consequences of sexual immorality. Solomon — who, we should note, had 700 wives and 300 concubines and whose compromised relationships eventually turned his heart from God — writes about this with the intensity of someone who knows exactly what he's talking about.

Chapter 7 contains one of the most vivid narrative passages in Proverbs: a young man without sense walking down the street at twilight, drawn toward a woman whose husband is away, seduced by her flattery, and following her like an ox to the slaughter. The detail is almost cinematic. And the conclusion is devastating: "her house is a highway to the grave, leading down to the chambers of death."

That sounds extreme. But Proverbs is not trying to be dramatic for effect. It is trying to tell you what the stakes actually are.

Sexual temptation works through a very specific mechanism: it makes the short term feel real and the long term feel abstract. The consequences — the broken marriage, the shattered trust, the children in a split home, the reputation in ruins, the shame that outlasts the pleasure by years — all of that is somewhere in the future. And the future is abstract. The desire in front of you is immediate, vivid, and real. Proverbs is trying to make the future real before it arrives.

Proverbs 5:3-5: "For the lips of the adulterous woman drip honey, and her speech is smoother than oil; but in the end she is bitter as gall, sharp as a double-edged sword. Her feet go down to death; her steps lead straight to the grave." In the end. The end is always different from the beginning. The thing that promises sweetness delivers bitterness. The thing that looks like life leads to death. Not every time. Not inevitably in the short run. But over the arc of a life — almost always.

Proverbs 6:27-29: "Can a man scoop fire into his lap without his clothes being burned? Can a man walk on hot coals without his feet being scorched? So is he who sleeps with another man's wife; no one who touches her will go unpunished." The fire image is important. Fire is not malicious. It doesn't hate you. It doesn't decide to burn you. It burns because that's what it does. The consequences of sexual immorality are not punishments God sends from a distance. They are built into the nature of the thing itself. Trust breaks. Relationships fracture. Children are wounded. People carry what happened to them for years. That's not punishment — it's physics.

But Proverbs isn't just about avoiding the wrong thing. Chapter 5 also contains one of the most beautiful passages in the whole book about the right thing. Proverbs 5:15-19: "Drink water from your own cistern, running water from your own well... May your fountain be blessed, and may you rejoice in the wife of your youth... May you ever be intoxicated with her love." This is erotic poetry in the middle of a wisdom book. Proverbs is not anti-pleasure. It is not saying that desire is dirty or that sex is shameful. It is saying: the right place, protected and cultivated, is not just acceptable — it is a blessing. Drink deeply from your own well.

The person who maintains sexual integrity over a lifetime builds something rare and extraordinarily valuable: a relationship where there is nothing to hide, where trust has never been broken in the deepest way, where the intimacy that sexuality is designed to protect has actually been protected. That is not nothing. That is one of the most countercultural and difficult acts of wisdom a person can pursue in this culture.

This applies to more than just physical faithfulness. Proverbs 6:25: "Do not lust in your heart after her beauty or let her captivate you with her eyes." The heart. The thought life. The private fantasy. Proverbs understands that the physical act begins in the imagination, long before it ever reaches the body. The integrity Proverbs calls you to begins in your mind.

What are you feeding your mind? What are you cultivating in your imagination? Because what you water grows.`,
    bible_reading_reference: "Proverbs 5:1-23",
    reflection_question: "Sexual integrity begins in the thought life, long before it reaches behavior. Where are you most vulnerable — what feeds the imagination in a direction you know isn't good? What practical change would it take to cut off that feed and protect your heart?",
  },
  {
    day_number: 17,
    day_title: "Justice — Proverbs Is Political",
    devotional_text: `Here is something about Proverbs that tends to get overlooked in devotionals and sermons: it is intensely concerned with justice.

Not just personal ethics — not just how you treat the people in your immediate circle. Structural justice. How wealth and power are used. What happens to people who have no voice. Whether the systems and structures of society treat people fairly. Proverbs does not let you live in a private spiritual bubble where your personal morality is excellent and your public indifference to suffering is never addressed.

Proverbs 21:13: "Whoever shuts their ears to the cry of the poor will also cry out and not be answered." Shuts their ears. This is not about people who happen not to be aware. It's about people who hear the cry and choose not to respond. Who turn away. Who find reasons why it's not their problem, why the poor are responsible for their own condition, why the complicated nature of poverty makes intervention pointless. Proverbs says: that posture has consequences. The person who will not hear the cry of those in need finds, eventually, that their own cry does not seem to be heard.

Proverbs 31:8-9 — the words of Lemuel's mother, which we discussed earlier — makes this a direct command: "Speak up for those who cannot speak for themselves, for the rights of all who are destitute. Speak up and judge fairly; defend the rights of the poor and needy." Speak up. Not: pray for them privately. Not: feel compassion. Use your voice. Use the access and influence you have to defend the people who don't have it. That is not a suggestion for particularly activist-minded people. It is a command placed at the end of the book as a kind of capstone.

Proverbs 17:5: "Whoever mocks the poor shows contempt for their Maker; whoever gloats over disaster will not go unpunished." The poor person is made in the image of God. To look at someone in poverty with contempt — to mock their situation, to attribute it entirely to moral failure, to gloat when things go further wrong for them — is to show contempt for the God who made them. This is stark. It means how you think about poor people is a theological statement.

Proverbs 14:31: "Whoever oppresses the poor shows contempt for their Maker, but whoever is kind to the needy honors God." Oppression here is not just direct exploitation — it includes systems and structures that keep people poor while the powerful benefit. Proverbs was written in an agricultural society where scales could be falsified, interest could be extorted, and the powerless had little recourse. The specific applications are different today. The principle is identical.

Proverbs 29:7: "The righteous care about justice for the poor, but the wicked have no such concern." Righteous and wicked. These are not mild categories. Proverbs uses them to describe the difference between people who are living correctly before God and people who are not. And concern for the justice of the poor is listed as a marker of righteousness. Its absence is listed as a marker of wickedness.

This does not mean there is one political party that has it right, or one economic system that Proverbs endorses. The application of these principles to policy is complicated, and reasonable people will disagree. But the principles themselves are not optional. Care for the poor. Speak for the voiceless. Do not exploit those who have no power to stop you. Do not mock or dehumanize people because of their material situation.

Proverbs 11:1: "The LORD detests dishonest scales, but accurate weights find favor with him." The scales were the primary economic tool of the ancient world — how commerce was conducted and how people were compensated. Cheating the scales was cheating people, specifically people who had less power to verify or contest the measure. God detests it. Not dislikes. Detests.

You have scales too. The ways you transact with people who have less power than you — employees, contractors, vendors, tenants. The question Proverbs asks is: are your scales accurate?`,
    bible_reading_reference: "Proverbs 31:1-9",
    reflection_question: "Where in your daily life do you encounter people with less power and voice than you — and are you using whatever influence you have to speak for them or simply benefiting from the imbalance? What would 'speaking up' look like in your specific context?",
  },
  {
    day_number: 18,
    day_title: "Parenting and Legacy — What You're Actually Passing On",
    devotional_text: `From beginning to end, Proverbs is addressed to a son.

"Listen, my son, to your father's instruction and do not forsake your mother's teaching" (1:8). "My son, if sinful men entice you, do not give in to them" (1:10). "My son, do not forget my teaching, but keep my commands in your heart" (3:1). The form of the book is a parent transmitting wisdom to a child. And the entire project of Proverbs rests on the assumption that this transmission is the most important work a person does.

Proverbs 22:6: "Start children off on the way they should go, and even when they are old they will not turn from it." We've already established that this is a principle, not a guaranteed promise. But let's sit with what it is actually saying. The early years are formative in a way that nothing else is. The patterns laid down in childhood — about God, about integrity, about how you treat people, about what matters and what doesn't — become the default operating system that runs for the rest of a person's life. Even when they rebel, even when they wander, the formation of childhood is still there. Not always sufficient to bring them back. But always present.

Which means the question for parents is not just "are my kids surviving?" but "what am I forming in them?"

Because you are always forming something. The question is what. Children absorb not just what you teach them explicitly but how you live. They watch how you talk about money. They watch how you treat your spouse. They watch what you do when you're angry, whether you tell the truth when it's inconvenient, whether Sunday morning worship corresponds to Monday morning behavior. They are learning your values not primarily from what you say but from what you do when you think the stakes are low.

Proverbs 20:7: "The righteous lead blameless lives; blessed are their children after them." The children of the righteous are blessed — not because righteousness earns God's favor in a transactional way, but because righteousness produces a household that is structured rightly. Where honesty is practiced. Where integrity is modeled. Where God is genuinely present in the rhythm of daily life. Children grow up in that — breathe it, absorb it — and they carry it with them.

Proverbs 13:22: "A good person leaves an inheritance for their children's children." The inheritance is material here — wealth passed down through generations. But the principle is broader. What are you leaving? Not just financially — what values, what habits, what faith, what patterns are you building in the people who will come after you? The question of legacy is really the question: what will still be true after you're gone?

Here is what is hard about parenting through the lens of Proverbs. You cannot give your children what you do not have. You cannot form them in wisdom you have not sought. You cannot model integrity you are not practicing. The most powerful thing you can do for the next generation is not a parenting strategy — it is being the person yourself that you want them to become.

This applies whether or not you have biological children. You are always passing something on. The young people who watch your life, the people you mentor formally or informally, the community you participate in — you are forming something in all of them. Every adult who takes their character seriously is doing the work of Proverbs: trying to embody wisdom well enough that it can be transmitted.

Proverbs 23:24-25: "The father of a righteous child has great joy; a man who fathers a wise child rejoices in him. May your father and mother rejoice; may she who gave you birth be joyful!" This is what it looks like when the transmission works. A parent who can look at their adult child and see someone who actually lives wisely — that is one of the deepest joys available to a human being.

Are you building toward that? And are you being the kind of person that could produce it?`,
    bible_reading_reference: "Proverbs 22:1-6",
    reflection_question: "Whether or not you have children, you are forming something in the people who watch your life. What are you actually modeling? Is there a gap between what you want to pass on and how you are actually living? What needs to change for the legacy you're building to be the one you intend?",
  },
  {
    day_number: 19,
    day_title: "The Proverbs 31 Woman — Read It Again",
    devotional_text: `Proverbs 31 has been the source of more inspiration and more shame in the lives of women than almost any other passage in the Bible.

On one hand, it's upheld as the ideal — the portrait of godly womanhood, the standard toward which women should aspire. On the other hand, it's been used — sometimes explicitly, often implicitly — to make women feel that they are not enough, that they are failing, that the standard is impossible and they don't measure up. Sermons, Mother's Day cards, women's Bible studies — the Proverbs 31 woman has been everywhere. And often, the effect has been more burden than blessing.

Let's read it again. Slowly. As literature.

The poem is an acrostic in the original Hebrew — each verse beginning with the next letter of the Hebrew alphabet. That means it is carefully crafted, deliberately structured, a work of art. It is not a checklist. It is a portrait. The difference matters.

Who is this woman? She is a businesswoman. She considers a field and buys it (v. 16). She trades — "her merchandise is profitable" (v. 18). She produces goods for sale: "She makes linen garments and sells them, and supplies merchants with sashes" (v. 24). She is not primarily a domestic figure — she is economically active, she has commercial acumen, she exercises independent judgment in financial matters.

She manages a household, yes — but not in a diminished sense. Her household is a significant operation: she has servants (v. 15), she provides food for her household, she oversees the work of those in her charge. This is leadership. This is management. This is someone exercising real authority and responsibility.

She cares for the poor. Verse 20: "She opens her arms to the poor and extends her hands to the needy." The concern for justice and generosity we've seen throughout Proverbs shows up in her as well. She is not so consumed with her household that she forgets the world outside it.

And then — what might be the most important line in the poem: verse 25. "She is clothed with strength and dignity; she can laugh at the days to come." She laughs at the future. Not with nervous optimism or forced positivity. With real confidence — the confidence of someone who has built well, lived faithfully, and trusts the One who holds what she cannot control.

Verse 26: "She speaks with wisdom, and faithful instruction is on her tongue." She is not silent. Her wisdom finds expression. Her voice matters. Her instruction is described as faithful — not just factually accurate, but trustworthy, reliable, worth following.

The final verses are the frame: "Charm is deceptive, and beauty is fleeting; but a woman who fears the LORD is to be praised" (v. 30). There it is. The bottom line. The Proverbs 31 woman is not the woman who never drops a ball, who serves a home-cooked meal every night, who is always organized and always available and always beautiful. She is the woman who fears the LORD. Everything else in the poem flows from that — the work ethic, the generosity, the commercial wisdom, the care for her household, the ability to laugh at the future.

This poem was written by Lemuel's mother. A mother, teaching her son what to look for in a wife. Not a checklist for women to perform against. A son's education in what wisdom looks like in a woman's life.

If you are a woman who has felt crushed by this passage — I want you to hear this. The Proverbs 31 woman is not a performance standard. She is a portrait of a woman whose life has been organized around something real. She doesn't have it all together because she works harder than you. She has it all together because the fear of the LORD is the organizing principle of her life.

That is available to you. Today.`,
    bible_reading_reference: "Proverbs 31:10-31",
    reflection_question: "Has Proverbs 31 felt like an inspiration or a burden to you? Re-read verse 30: 'A woman who fears the LORD is to be praised.' How does making the fear of the LORD the organizing center — rather than the performance of tasks — change how you read this chapter and how you live?",
  },
  {
    day_number: 20,
    day_title: "Guard Your Heart — The Wellspring of Everything",
    devotional_text: `Proverbs 4:23: "Above all else, guard your heart, for everything you do flows from it."

Above all else. Of all the things Proverbs could have elevated to the top of the list — wisdom, honesty, diligence, humility — it chose this one. Guard your heart. Because the heart is the source. Everything else flows from it.

In Hebrew thought, the heart was not primarily the seat of emotion the way we use the word in English. It was the center of a person's will, intellect, and moral decision-making. Your heart is who you actually are — the real you, underneath the public presentation, underneath the behavior that can be monitored and adjusted based on who's watching. Your heart is the place where you decide what you actually believe, what you actually value, what you will actually do when no one is looking.

And Proverbs says: guard it.

The word for "guard" here is the same word used for keeping a city fortified against enemy attack. Active vigilance. Not casual oversight — intentional, sustained protection. Because just as a city with unguarded walls is vulnerable to whatever walks in, a heart that is unguarded absorbs everything it is exposed to. Every image. Every voice. Every value embedded in the entertainment you consume, the people you surround yourself with, the thoughts you allow to take up residence.

What goes into the heart shapes what comes out. This is not a metaphor. It is a description of how human beings actually work.

Proverbs 4:20-22 leads into the command to guard the heart with its own instruction: "My son, pay attention to what I say; turn your ear to my words. Do not let them out of your sight, keep them within your heart; for they are life to those who find them and health to one's whole body." The words of wisdom. The instruction of Scripture. These are not just intellectually true — they are health-producing. They go in and do something. They shape the way the heart processes reality, makes decisions, interprets events.

This is why regular reading of Scripture is not just a devotional nicety. It is a medical intervention for the heart.

What are you putting in?

Because your heart is being shaped, all the time, by everything it's exposed to. The algorithm knows you. It feeds you more of what already interests you — which means whatever patterns are in your heart get reinforced, not challenged. If the pattern is anxiety, the algorithm feeds you more anxiety. If the pattern is comparison, it feeds you more comparison. If the pattern is outrage, more outrage. The feed is designed to deepen existing grooves, not wear new ones.

Guarding your heart means deciding what gets in — not just passively receiving what shows up. What are you feeding it? What voices are shaping how you see the world? What values are embedded in the stories you're consuming? These are not small questions. They are the questions that determine, over time, who you become.

Proverbs 4:25-27: "Let your eyes look straight ahead; fix your gaze directly before you. Give careful thought to the paths for your feet and be steadfast in all your ways. Do not turn to the right or the left; keep your foot from evil." Directional. Intentional. The wise person is not wandering through life absorbing whatever happens to cross their path. They are looking where they are going. They are being careful about what they give their attention to. They are choosing their direction.

This is the work of a lifetime. The heart does not become what you want it to be quickly, or automatically, or without effort. It becomes what you feed it, what you protect it from, what you consistently choose to put before it.

Solomon, who wrote these words, did not finish well. His heart turned. The man who wrote "above all else, guard your heart" lost his own.

Let that be a warning, not just an instruction. Guarding your heart is not a one-time decision. It is a daily choice, every day, for the rest of your life.

Start today.`,
    bible_reading_reference: "Proverbs 4:20-27",
    reflection_question: "What are you currently feeding your heart most consistently — what occupies most of your mental attention and shapes how you see the world? Is what you're feeding it producing wisdom, peace, and clarity — or anxiety, comparison, and confusion? What would it mean to 'guard your heart' in one specific practical way this week?",
  },

  // ─────────────────────────────────────────────
  // OUTRO
  // ─────────────────────────────────────────────
  {
    day_number: 21,
    day_title: "Living Wisdom Daily",
    devotional_text: `You've spent 21 days in Proverbs. And the book is still there — all 31 chapters of it, with more in it than any 21-day devotional can touch.

Here is what I want to say on the last day.

Wisdom is not a destination. It's not a certification you receive at the end of a study series. It's not something you unlock once and then have forever. It is a daily practice. An orientation. A posture that must be chosen again, every morning, in the specific conditions of today.

Proverbs knew this. The book is not structured as a one-time lecture. It's structured as an ongoing conversation between a parent and a child — repeated, patient, coming at the same principles from different angles, circling back, reemphasizing. Because the sages knew that humans need to hear things more than once. We absorb wisdom gradually, through repetition and experience and failure and trying again.

Solomon had more wisdom than anyone in his generation and still fell. Agur confessed that he barely felt like he had it. Lemuel's mother spent her life pouring wisdom into her son and could not control what he did with it. This is the honest picture.

And yet — and this is the grace of the book — every day is a new opportunity to choose the path of wisdom. Proverbs doesn't say you have to be perfect. It says walk with the wise. Guard your heart. Trust the LORD with all your heart. Fear Him who is actually worth fearing. Let go of your illusions of control. Open your hand. Watch your tongue. Do the work in front of you today.

These are not aspirational goals for exceptional people. They are daily instructions for ordinary people who want their lives to amount to something real.

Proverbs 8 contains the most magnificent section in the book — where Wisdom herself speaks. She stands at the crossroads, at the city gates, calling out to anyone who will hear: "To you, O people, I call out; I raise my voice to all mankind. You who are simple, gain prudence; you who are foolish, set your hearts on it. Listen, for I have trustworthy things to say; I open my lips to speak what is right." She is not hidden. She is not reserved for the elite. She is standing where everyone walks, available to anyone who wants her.

Proverbs 8:17: "I love those who love me, and those who seek me find me."

Seek her. That's it. That's the whole instruction. Seek wisdom. Not for one 21-day stretch, but as a permanent orientation toward your life. Read this book again. Read it slowly, one chapter a day — there are 31 chapters, one for every day of the month. Come back to the parts that convicted you. Sit with the parts you don't understand. Bring the hard ones into your actual life and watch what happens when you try to live them.

God gave Solomon wisdom when he asked for it. He gave it generously, abundantly, more than Solomon even knew to want. And James 1:5 — written centuries later — confirms that the offer still stands: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you."

Without finding fault. He is not going to list your foolish decisions before He agrees to help. He is not going to make you justify why you deserve wisdom. He gives it generously, to everyone who asks.

That is who you're dealing with.

You started this devotional as someone who wanted to understand a book. I hope you're ending it as someone who wants to live differently. Because that's what the book is for. Not to be understood. To be lived.

Fear the LORD. Guard your heart. Walk with the wise. Hold your tongue. Open your hand. Do the work. Trust the One who actually runs things.

And then — as Proverbs 3:17 says of wisdom — "Her ways are pleasant ways, and all her paths are peace."`,
    bible_reading_reference: "Proverbs 8:1-36",
    reflection_question: "Of everything you've encountered in Proverbs over the past 21 days — which single principle or verse has most directly challenged or changed how you're living? What is one specific, concrete commitment you're making coming out of this devotional to live differently?",
  },
];

async function main() {
  console.log("Starting to seed 'The Wisdom of Proverbs' devotional...");

  // Step 1: Insert the devotional
  let devotionalId: string | null = null;

  try {
    const { data, error } = await supabase
      .from("devotionals")
      .insert({
        title: "The Wisdom of Proverbs",
        subtitle: "A 21-Day Bible Buddy Study",
        description:
          "A 21-day journey through the most practical book in the Bible. Discover what wisdom really means, who wrote Proverbs and why, and how its ancient insights speak directly to what you face today.",
        total_days: 21,
        cover_image: "/wisdomofproverbs.png",
      })
      .select("id")
      .single();

    if (error) {
      console.warn("⚠️  Insert with cover_image failed, trying without:", error.message);
      const { data: data2, error: error2 } = await supabase
        .from("devotionals")
        .insert({
          title: "The Wisdom of Proverbs",
          subtitle: "A 21-Day Bible Buddy Study",
          description:
            "A 21-day journey through the most practical book in the Bible. Discover what wisdom really means, who wrote Proverbs and why, and how its ancient insights speak directly to what you face today.",
          total_days: 21,
        })
        .select("id")
        .single();

      if (error2) {
        console.error("❌ Failed to insert devotional:", error2);
        process.exit(1);
      }
      devotionalId = data2.id;
    } else {
      devotionalId = data.id;
    }
  } catch (err) {
    console.error("❌ Unexpected error inserting devotional:", err);
    process.exit(1);
  }

  console.log(`✅ Devotional created with ID: ${devotionalId}`);

  // Step 2: Insert all 21 days
  let successCount = 0;
  let failCount = 0;

  for (const day of devotionalDays) {
    const parsed = parseBibleReading(day.bible_reading_reference);

    const { error } = await supabase.from("devotional_days").insert({
      devotional_id: devotionalId,
      day_number: day.day_number,
      day_title: day.day_title,
      devotional_text: day.devotional_text,
      bible_reading_book: parsed.book,
      bible_reading_chapter: parsed.chapter,
      reflection_question: day.reflection_question,
    });

    if (error) {
      console.error(`❌ Failed to insert Day ${day.day_number} (${day.day_title}):`, error);
      failCount++;
    } else {
      console.log(`✅ Day ${day.day_number}: ${day.day_title}`);
      successCount++;
    }
  }

  console.log("\n📊 Seed Summary:");
  console.log(`  ✅ Successfully seeded: ${successCount} days`);
  if (failCount > 0) {
    console.log(`  ❌ Failed: ${failCount} days`);
  }
  console.log("\n🎉 Done! 'The Wisdom of Proverbs' devotional is ready.");
}

main().catch(console.error);
