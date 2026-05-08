// Seed or update "The Wisdom of Proverbs" as a 31-day chapter-based devotional.
// Run with: npx tsx scripts/seed-wisdom-of-proverbs.ts
console.log("Executing: scripts/seed-wisdom-of-proverbs.ts");

import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing environment variables.");
  console.error("Required: SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL, plus SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const DEVOTIONAL_TITLE = "The Wisdom of Proverbs";
const devotionalPayload = {
  title: DEVOTIONAL_TITLE,
  subtitle: "A 31-Day Chapter Journey",
  description:
    "A 31-day chapter-by-chapter journey through Proverbs. Each day follows one full chapter so the devotional, Bible reading, notes, trivia, Scrambled, and reflection all stay aligned around the same daily focus.",
  total_days: 31,
  cover_image: "/wisdomofproverbs.png",
};
const devotionalPayloadWithoutCover = {
  title: devotionalPayload.title,
  subtitle: devotionalPayload.subtitle,
  description: devotionalPayload.description,
  total_days: devotionalPayload.total_days,
};

type ChapterPlan = {
  chapter: number;
  title: string;
  summary: string;
  heart: string;
  practice: string;
  reflection: string;
};

type DevotionalDay = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string;
};

const chapterPlans: ChapterPlan[] = [
  {
    chapter: 1,
    title: "Wisdom Starts With Reverence",
    summary: "Proverbs opens by telling you what the whole book is for: wisdom, instruction, justice, judgment, and discretion. It also makes the foundation plain: the fear of the Lord is the beginning of knowledge.",
    heart: "Before Proverbs gives you hundreds of wise sayings, it asks you where your life is centered. Wisdom does not begin with technique. It begins with seeing God clearly and letting His authority reorder your choices.",
    practice: "Pay attention today to the voices asking for your attention. Some voices invite you into wisdom, and some invite you into shortcuts that look easy but cost more later.",
    reflection: "Where do you most need to let the fear of the Lord, not pressure or impulse, become the starting point for your next decision?",
  },
  {
    chapter: 2,
    title: "Search for Wisdom Like Treasure",
    summary: "Proverbs 2 pictures wisdom as something worth seeking with energy. The person who searches for it like hidden treasure begins to understand the fear of the Lord and receives protection from destructive paths.",
    heart: "Wisdom rarely lands in the lap of someone who does not want it. This chapter teaches hunger. It says to incline your ear, call out, seek, and search. God gives wisdom, but He also forms people who are willing to pursue it.",
    practice: "Do one concrete thing today that shows you are seeking wisdom: ask a mature believer for counsel, pause before reacting, or write down what Scripture is showing you.",
    reflection: "What would change in your habits if you treated wisdom like treasure instead of background information?",
  },
  {
    chapter: 3,
    title: "Trust the Lord With All Your Heart",
    summary: "Proverbs 3 calls you to trust the Lord, honor Him with what you have, welcome His correction, and value wisdom more than silver or gold.",
    heart: "This chapter is about the deep relief of not having to be your own god. You are invited to acknowledge the Lord in all your ways, not just the religious ones. Wisdom means bringing God into the ordinary places where you usually lean on yourself.",
    practice: "Name one area where you have been leaning on your own understanding. Pray over it plainly, then choose one obedient next step.",
    reflection: "What part of your life is hardest to entrust to God, and what would acknowledging Him there actually look like today?",
  },
  {
    chapter: 4,
    title: "Guard Your Heart",
    summary: "Proverbs 4 shows wisdom being passed down like a family inheritance. It urges you to get wisdom, stay on the right path, and guard your heart with all diligence.",
    heart: "Your heart is not a small private compartment. It is the spring that feeds the rest of your life. What you allow to shape your desires will eventually shape your words, your decisions, and your direction.",
    practice: "Notice what is feeding your heart today. Remove one influence that is pulling you toward foolishness and replace it with something that helps you walk straight.",
    reflection: "What has been shaping your heart lately, and is it leading you toward life or away from it?",
  },
  {
    chapter: 5,
    title: "Faithfulness Is Wisdom",
    summary: "Proverbs 5 warns against the seductive path that looks sweet at first but becomes bitter. It calls for faithfulness, self-control, and delight in covenant love.",
    heart: "Sin often speaks in the language of immediate satisfaction. Wisdom looks past the first impression and asks where the road ends. This chapter teaches you to take desire seriously without letting desire become your master.",
    practice: "Be honest about one temptation you tend to underestimate. Put distance between yourself and that path before you are standing at the door.",
    reflection: "Where do you need wisdom to help you see the end of a path, not just the appeal of the first step?",
  },
  {
    chapter: 6,
    title: "Wake Up and Walk Wisely",
    summary: "Proverbs 6 gathers warnings about reckless promises, laziness, destructive speech, pride, and adultery. It is practical wisdom with no patience for passive living.",
    heart: "Wisdom is not vague spirituality. It touches your calendar, money, work ethic, speech, and private life. God cares about the small patterns because small patterns become a direction.",
    practice: "Choose one neglected responsibility and take a real step toward it today. Do not wait for motivation to become obedience.",
    reflection: "Which warning in Proverbs 6 feels most personally relevant right now, and why?",
  },
  {
    chapter: 7,
    title: "Do Not Drift Toward Danger",
    summary: "Proverbs 7 tells a vivid story of a simple young man walking toward temptation until it overtakes him. The chapter shows how danger often begins with careless direction.",
    heart: "The young man does not fall all at once. He wanders near the wrong corner at the wrong time with an unguarded heart. Wisdom learns to avoid the setup, not just resist the final moment.",
    practice: "Identify one place, pattern, conversation, or time of day where you are more vulnerable. Build a boundary before you need it.",
    reflection: "Where are you walking too close to something you already know can pull you away from God?",
  },
  {
    chapter: 8,
    title: "Wisdom Calls in the Open",
    summary: "Proverbs 8 personifies Wisdom as calling publicly at the gates. Wisdom is valuable, truthful, older than creation, and available to those who seek her.",
    heart: "God's wisdom is not hidden because He is stingy. Wisdom stands in the open and calls. The question is not whether God speaks, but whether we slow down enough to listen.",
    practice: "Before making one decision today, pause and ask: what would wisdom say here? Then answer honestly from Scripture, not convenience.",
    reflection: "What is wisdom already saying to you that you have been slow to receive?",
  },
  {
    chapter: 9,
    title: "Two Invitations",
    summary: "Proverbs 9 contrasts Wisdom and Folly as two voices inviting the simple. One leads to life and understanding; the other hides death behind stolen sweetness.",
    heart: "Every day comes with invitations. Some are loud, flattering, and easy. Some require humility and correction. Wisdom begins when you learn to recognize the difference before you sit down at the wrong table.",
    practice: "Pay attention to one invitation today: a reaction, purchase, habit, or conversation. Ask whether it is forming wisdom or feeding folly.",
    reflection: "Which invitation has been louder in your life lately: wisdom's call or folly's shortcut?",
  },
  {
    chapter: 10,
    title: "The Shape of a Wise Life",
    summary: "Proverbs 10 begins the short sayings of Solomon, contrasting righteousness and wickedness, diligence and laziness, wise speech and destructive words.",
    heart: "This chapter feels like rapid flashes of everyday life. It shows that wisdom is not one dramatic choice but a thousand small choices repeated until they become character.",
    practice: "Choose one proverb from this chapter to carry with you today. Let it interrupt you before you speak or act.",
    reflection: "Which contrast in Proverbs 10 best describes a choice in front of you right now?",
  },
  {
    chapter: 11,
    title: "Integrity Holds the Weight",
    summary: "Proverbs 11 emphasizes honest scales, humility, generosity, discretion, and the security of righteousness.",
    heart: "Integrity is what keeps a life from collapsing under pressure. God sees the hidden scale, the private motive, and the quiet choice no one else notices. Wisdom lives honestly because the Lord is present there too.",
    practice: "Look for one place where you can practice hidden integrity today, especially where no one will applaud you for it.",
    reflection: "Where is God inviting you to become more honest, generous, or humble?",
  },
  {
    chapter: 12,
    title: "Words, Work, and Correction",
    summary: "Proverbs 12 teaches that wise people receive correction, work diligently, speak truthfully, and use words to heal rather than harm.",
    heart: "A wise life can be seen in how a person handles correction and how they use their mouth. Defensiveness and careless speech can undo more than we realize.",
    practice: "Receive one piece of correction without arguing today, or choose one moment to answer with healing words instead of sharp ones.",
    reflection: "What do your recent words reveal about the condition of your heart?",
  },
  {
    chapter: 13,
    title: "Discipline Builds the Future",
    summary: "Proverbs 13 connects wisdom with discipline, teachability, careful speech, honest gain, and hope that is rightly ordered.",
    heart: "Wisdom thinks long term. Folly lives by the immediate appetite. This chapter keeps asking whether today's habits are building the future you say you want.",
    practice: "Take one disciplined step today that your future self will thank you for, even if it feels small.",
    reflection: "Where are you choosing short-term ease over long-term wisdom?",
  },
  {
    chapter: 14,
    title: "The Way That Seems Right",
    summary: "Proverbs 14 warns that a way can seem right and still lead to death. It teaches prudence, patience, compassion for the poor, and reverence for the Lord.",
    heart: "Not every path that feels natural is wise. Wisdom asks for more than sincerity. It asks whether a path is true, humble, and aligned with God's character.",
    practice: "Question one assumption today. Ask whether it is actually wise or just familiar.",
    reflection: "What is one area where you need God's wisdom to challenge what simply seems right to you?",
  },
  {
    chapter: 15,
    title: "A Gentle Answer",
    summary: "Proverbs 15 focuses on speech, teachability, prayer, joy, and the kind of answer that turns away wrath.",
    heart: "Your tone can either carry wisdom or sabotage it. This chapter does not treat speech as small. Words can calm, crush, heal, provoke, teach, or reveal.",
    practice: "Choose gentleness in one conversation where you would normally defend, snap, or withdraw.",
    reflection: "Where would a gentle answer change the atmosphere around you today?",
  },
  {
    chapter: 16,
    title: "Plans Under God's Rule",
    summary: "Proverbs 16 holds human planning together with God's sovereignty. It speaks about motives, pride, leadership, patience, and the Lord directing steps.",
    heart: "Wisdom plans, but it does not pretend to control everything. The wise person works faithfully while remembering that the Lord weighs motives and establishes steps.",
    practice: "Offer one plan to God today without pretending you can force the outcome. Ask Him to purify your motive as much as your strategy.",
    reflection: "What plan do you need to hold with open hands before the Lord?",
  },
  {
    chapter: 17,
    title: "Wisdom in Relationships",
    summary: "Proverbs 17 speaks into family, friendship, conflict, restraint, justice, and the value of a cheerful heart.",
    heart: "Wisdom is deeply relational. It shows up in how you handle tension, loyalty, disappointment, and the urge to say too much. Sometimes wisdom looks like restraint.",
    practice: "Practice restraint in one relationship today. Refuse to add fuel to a conflict that does not need more fire.",
    reflection: "Which relationship needs more wisdom from you right now: patience, honesty, restraint, or courage?",
  },
  {
    chapter: 18,
    title: "The Power of the Tongue",
    summary: "Proverbs 18 teaches about isolation, listening before answering, humility, friendship, and the power of life and death in the tongue.",
    heart: "Words are not weightless. They can open doors, close hearts, deepen friendship, or wound someone made in God's image. Wisdom listens before it answers.",
    practice: "In one conversation today, listen all the way through before forming your response.",
    reflection: "Are your words lately giving life, taking life, or simply escaping without wisdom?",
  },
  {
    chapter: 19,
    title: "Wisdom Slows Down",
    summary: "Proverbs 19 highlights patience, generosity to the poor, teachability, discipline, and the difference between human plans and the Lord's purpose.",
    heart: "Foolishness often rushes. Wisdom can wait, listen, and be corrected. A patient heart is not passive; it is strong enough not to be ruled by the first impulse.",
    practice: "Delay one reaction today. Give yourself time to choose wisdom instead of speed.",
    reflection: "Where would slowing down help you obey God more clearly?",
  },
  {
    chapter: 20,
    title: "Honest Measures",
    summary: "Proverbs 20 addresses wine, conflict, diligence, counsel, honesty in business, and the Lord's searching light within a person.",
    heart: "This chapter keeps bringing wisdom into ordinary life: how you work, spend, speak, buy, sell, and seek advice. God is not absent from practical matters.",
    practice: "Look at one practical area of life, such as money, work, or conflict, and ask what honesty requires today.",
    reflection: "Where do you need the Lord's lamp to search your motives or habits?",
  },
  {
    chapter: 21,
    title: "The Lord Weighs the Heart",
    summary: "Proverbs 21 teaches that God directs kings, weighs hearts, loves righteousness and justice more than empty sacrifice, and calls His people away from pride.",
    heart: "It is possible to look religious and still avoid obedience. Wisdom refuses that trade. God is after a heart that practices justice, mercy, humility, and truth.",
    practice: "Choose one act of righteousness or justice today that costs you a little convenience.",
    reflection: "Where might God be asking for obedience instead of religious appearance?",
  },
  {
    chapter: 22,
    title: "A Good Name",
    summary: "Proverbs 22 values a good name above riches and teaches humility, training, generosity, boundaries, and careful listening to wise words.",
    heart: "Reputation is not image management. In Proverbs, a good name grows from character. It is the fruit of humility, consistency, and trustworthy choices over time.",
    practice: "Make one choice today that protects character over convenience.",
    reflection: "What kind of name are your repeated choices building?",
  },
  {
    chapter: 23,
    title: "Guard Your Appetite",
    summary: "Proverbs 23 warns about envy, greed, gluttony, drunkenness, lust, and misplaced desire while calling the heart to pursue truth and wisdom.",
    heart: "Appetite is not only about food. It is the pull of wanting more without asking whether more is good. Wisdom teaches desire to answer to God.",
    practice: "Notice one appetite today and practice saying no, not because the thing is always evil, but because you are not its servant.",
    reflection: "What desire has been discipling you more than wisdom has?",
  },
  {
    chapter: 24,
    title: "Do Not Envy Evil",
    summary: "Proverbs 24 urges you not to envy the wicked, to build with wisdom, seek counsel, rescue those in danger, and learn from the field of the sluggard.",
    heart: "Envy distorts your vision. It makes foolishness look successful because you only see the surface. Wisdom looks at the end of the road and keeps building what lasts.",
    practice: "Instead of envying someone else's path, take one faithful step in the work God has put in front of you.",
    reflection: "Where are you tempted to admire a path that Scripture warns you not to follow?",
  },
  {
    chapter: 25,
    title: "Words Fitly Spoken",
    summary: "Proverbs 25 begins the sayings copied by Hezekiah's men and teaches humility, patience, restraint, wise timing, and gentle strength.",
    heart: "Wisdom knows that timing matters. A true word can still be poorly placed. This chapter trains you to value restraint, humility, and speech that fits the moment.",
    practice: "Before giving advice or correction today, ask whether the words, timing, and tone are all wise.",
    reflection: "Where do you need more restraint or better timing in how you speak?",
  },
  {
    chapter: 26,
    title: "Discernment With Folly",
    summary: "Proverbs 26 exposes the patterns of fools, sluggards, meddlers, deceivers, and gossips. It shows that wisdom requires discernment, not automatic responses.",
    heart: "Some situations require an answer; some require silence. Some conflicts are yours to enter; some are not. Wisdom is not a script. It is discernment shaped by the fear of the Lord.",
    practice: "Refuse one foolish argument, gossip thread, or lazy excuse today.",
    reflection: "Where do you need discernment to know whether to speak, stay silent, engage, or walk away?",
  },
  {
    chapter: 27,
    title: "Faithful Friendship",
    summary: "Proverbs 27 teaches humility about tomorrow, the value of faithful wounds, iron sharpening iron, careful stewardship, and honest friendship.",
    heart: "Wisdom is not meant to be lived alone. God often sharpens you through people who love you enough to tell the truth. Faithful correction can be a gift, not an attack.",
    practice: "Thank someone who sharpens you, or invite honest feedback from someone who loves God and loves you.",
    reflection: "Who has permission to sharpen you, and how do you usually respond when they do?",
  },
  {
    chapter: 28,
    title: "Confession and Courage",
    summary: "Proverbs 28 contrasts wickedness and righteousness through justice, confession, generosity, integrity, and boldness.",
    heart: "Concealment keeps sin powerful. Confession brings it into the light where mercy can meet it. Wisdom is brave enough to be honest before God.",
    practice: "Confess one hidden sin, motive, or compromise to God today. If needed, take the next step toward accountability.",
    reflection: "What would it look like to stop covering and start walking in mercy?",
  },
  {
    chapter: 29,
    title: "Correction Before Collapse",
    summary: "Proverbs 29 warns against hardening the neck after correction, celebrates righteous leadership, teaches discipline, and exposes the fear of man.",
    heart: "A teachable heart is a protected heart. The danger is not being corrected; the danger is becoming the kind of person who cannot receive correction anymore.",
    practice: "When correction comes today, pause before defending yourself. Ask what part of it might be a mercy from God.",
    reflection: "Where has fear of people been stronger than trust in the Lord?",
  },
  {
    chapter: 30,
    title: "The Humility of Agur",
    summary: "Proverbs 30 gives the words of Agur, who confesses his limits, honors God's pure words, asks for neither poverty nor riches, and learns wisdom from creation.",
    heart: "Agur is wise because he knows he is limited. He does not posture as someone who has mastered life. He asks God for the kind of life that will keep his heart near Him.",
    practice: "Pray Agur's prayer in your own words: ask God for what will keep you faithful, not merely what will make you comfortable.",
    reflection: "Do you know your weaknesses well enough to ask God for the kind of provision that protects your soul?",
  },
  {
    chapter: 31,
    title: "Wisdom That Serves",
    summary: "Proverbs 31 records the words taught to King Lemuel by his mother and closes with the portrait of a woman whose wisdom is active, generous, strong, and rooted in the fear of the Lord.",
    heart: "The book ends by showing wisdom embodied. Wisdom speaks for the vulnerable, works faithfully, strengthens a household, opens its hand to the poor, and fears the Lord above charm or appearance.",
    practice: "Choose one embodied act of wisdom today: speak up for someone, serve your household, work faithfully, or open your hand to someone in need.",
    reflection: "After walking through Proverbs, what kind of wise life is God calling you to practice, not just admire?",
  },
];

const cinematicDevotionalTextByChapter: Record<number, string> = {
  1: `Before Proverbs becomes a book of short sayings, picture the throne room of Israel.

Solomon is not just a wise man with clever lines. He is the son of David, the king who fought giants, wrote songs, sinned deeply, repented honestly, and carried Israel through war, worship, victory, and failure. Solomon grew up in the shadow of that kind of father. He inherited a throne, a nation, a history, and the weight of leading people who belonged to God.

So when Proverbs opens, it is not random advice. It sounds like a king leaning toward his son, the future heir, saying, "Before you learn how to rule people, you need to learn how to rule yourself."

That matters because Proverbs is not a promise book where every sentence is a guaranteed outcome. It is wisdom. It teaches patterns, not contracts. It shows the paths that usually lead to life and the paths that usually lead to ruin.

Proverbs 1 sets the whole scene. Solomon tells his son why this wisdom exists: to train the simple, sharpen the wise, protect the young, and teach people how to see. Then he lays the foundation: the fear of the Lord is where knowledge begins.

This chapter also introduces the first major choice. One voice says, "Come with us." It offers belonging, gain, and excitement, but the road leads to destruction. Another voice is Wisdom, crying in the streets, calling people before consequences arrive.

As you read Proverbs 1, imagine Solomon trying to save his son from learning everything the hard way. The question under the whole chapter is simple: when wisdom calls, will you listen?`,

  2: `Imagine Solomon walking with his son before the city is fully awake.

The palace is quiet, but outside its walls the real world is already moving. Merchants are opening stalls. Men are making deals. Young people are choosing friends. Somewhere, temptation is dressing itself up to look harmless. Somewhere else, wisdom is waiting to be searched for.

That is the feel of Proverbs 2. Solomon does not describe wisdom like loose change on the ground. He talks about it like buried treasure. His son will not stumble into it by accident. He must incline his ear, call out, seek, and search.

This is a powerful chapter for anyone who thinks wisdom should come easily. Solomon is saying, "Son, the throne will give you access to power, but power will not make you wise. You have to want wisdom enough to dig for it."

The chapter also shows why wisdom matters. It protects. It guards the path. It helps a person recognize crooked speech, dangerous people, and seductive roads before they become traps. Wisdom is not just about sounding deep. It is about surviving the choices that quietly shape your life.

As you read Proverbs 2, see a father teaching his son how to search. Not for gold, not for applause, not for control, but for the kind of understanding God gives to those who value it. Today the chapter asks: are you waiting for wisdom to fall into your lap, or are you willing to seek it like treasure?`,

  3: `Now picture Solomon standing at the edge of the royal court with his son beside him.

People are coming with questions. Disputes need answers. Money must be managed. Alliances must be weighed. The young prince can see how much a king has to decide. Every day will bring moments where he can lean on his own instincts or acknowledge the Lord.

That is where Proverbs 3 lives. It is not advice for a quiet life with no pressure. It is wisdom for someone who will be tempted to trust his own heart, his own rank, his own intelligence, and his own resources.

Solomon tells his son not to forget teaching, not to let mercy and truth leave him, and not to lean on his own understanding. That line is famous because it reaches into every age. But in the scene of Proverbs, it is a father warning a future king: "Your understanding is not big enough to carry your life by itself."

This chapter also brings wisdom into money, correction, peace, sleep, and how you treat your neighbor. It shows that trusting God is not a slogan. It becomes visible in ordinary decisions.

As you read Proverbs 3, imagine Solomon trying to teach his son the relief of not having to be his own god. The Lord can direct paths the prince cannot see yet. Wisdom begins when the heart bows before it acts.`,

  4: `Picture an older Solomon remembering what it felt like to be young.

Before he was Israel's king, he was David's son. He heard stories of battlefields, caves, betrayal, mercy, worship, and failure. David knew what it meant to follow God, and he also knew what it meant to suffer from foolish choices. That kind of father would not pass down wisdom like a decoration. He would pass it down like survival.

Proverbs 4 feels like wisdom moving from one generation to the next. Solomon tells his son, "I was my father's son too." The lesson did not begin with him. It came through family, through memory, through correction, through a father pleading with his child to choose the right path before the wrong one becomes familiar.

The chapter has movement in it. Get wisdom. Do not enter the path of the wicked. Keep your heart. Watch your mouth. Look straight ahead. Make your feet sure.

This is not abstract. Solomon knows the heart is the spring of everything else. A crooked heart eventually produces crooked steps. A guarded heart gives life room to flow in the right direction.

As you read Proverbs 4, imagine a torch being handed from David to Solomon, and from Solomon to his son. Wisdom is not just something to admire. It is something to guard, carry, and walk out one step at a time.`,

  5: `The palace could be beautiful and dangerous at the same time.

Solomon knew that better than most. Scripture tells us his life became tangled with many women, political marriages, divided desires, and eventually a heart pulled away from the Lord. That makes Proverbs 5 feel heavier. It is not the warning of a man who knows nothing about desire. It is the warning of a man who knows desire can sound sweet and still lead a person into bitterness.

In this chapter, Solomon speaks to his son about faithfulness. He describes temptation as smooth, flattering, and close enough to seem harmless. But then he pulls back the curtain and shows where that road goes: regret, loss, shame, and a life spent wishing you had listened sooner.

This is not just about avoiding scandal. It is about learning to see the end of a path before you take the first step. Wisdom teaches a person to ask, "Where will this lead if I keep walking?"

Solomon also points his son toward delight in covenant love. The answer to temptation is not only fear of consequences. It is learning to treasure what God has made good and refuse what destroys it.

As you read Proverbs 5, remember that sin rarely introduces itself as destruction. It usually introduces itself as pleasure without a price. Wisdom tells the truth before the bill comes due.`,

  6: `Imagine the young prince watching the palace from the inside.

He sees servants who rise early and servants who avoid work. He sees men make promises they cannot keep. He hears whispers that divide people. He watches proud eyes, lying tongues, quick feet, and hidden schemes. A kingdom is not only damaged by armies outside the walls. It can be weakened by foolish patterns inside ordinary lives.

Proverbs 6 is Solomon giving practical warnings with urgency. Do not trap yourself with reckless promises. Do not sleep through responsibility. Learn from the ant. Do not become the kind of person who spreads trouble. Do not play with adultery like fire will not burn.

This chapter feels like a father saying, "Son, small choices are not small when they become habits."

Solomon is preparing his son for the real world, not a fantasy version of it. Laziness has consequences. Dishonesty has consequences. Lust has consequences. Pride has consequences. The wise person does not wait until the house is burning to respect the flame.

As you read Proverbs 6, let it feel practical on purpose. Wisdom is not only for temples and throne rooms. It belongs in your schedule, your promises, your work, your conversations, and your private choices.`,

  7: `Proverbs 7 reads almost like a night scene.

Solomon looks through a window and sees a young man without direction. The sun is going down. The streets are changing. The young man is not dragged into danger. He drifts toward it. Step by step, corner by corner, he moves closer to a place he should not be.

That is what makes the chapter so vivid. Temptation does not begin at the final moment. It begins with direction. The wrong road usually looks manageable at first. Then the voice comes. Then the invitation comes. Then the trap closes.

Solomon tells this story because stories can show what warnings alone sometimes cannot. He wants his son to see the whole path. The flattering words, the secrecy, the excitement, the false sense of safety, and then the sudden realization that the cost is far greater than expected.

This chapter is about more than one kind of temptation. It teaches a larger truth: do not walk casually toward what can destroy you.

As you read Proverbs 7, imagine Solomon pointing out the window and saying, "Watch carefully. This is how people fall when they think they are only exploring." Wisdom does not just resist sin at the door. Wisdom learns not to wander down the street that leads there.`,

  8: `Now the scene moves from the dark street to the open city.

Wisdom is no longer just a lesson from a father. Solomon pictures Wisdom like a woman standing at the gates, lifting her voice where everyone can hear. She is not hidden in a private room for scholars. She is in the public places, near decisions, trade, leadership, family life, and daily movement.

This matters because people often act like wisdom is impossible to find. Proverbs 8 says wisdom has been calling all along.

Solomon gives Wisdom a voice, and her voice is noble. She speaks truth. She hates pride and evil. She is better than silver and gold. Kings reign well by her. Rulers need her. Ordinary people need her. Everyone passing through the gates needs her.

Then the chapter lifts even higher. Wisdom is pictured as present with God before the world was formed, rejoicing in His creation. Solomon wants his son to understand that wisdom is not a trend, a mood, or a clever technique. It is woven into the way God made life to work.

As you read Proverbs 8, picture Wisdom calling over the noise of the city. She is not trying to impress you. She is trying to save you. The question is whether her voice will matter more than the louder voices around you.`,

  9: `Picture two houses on the same road.

One belongs to Wisdom. She has prepared a table, sent out invitations, and called the simple to come learn the way of life. The other belongs to Folly. She is loud, seductive, and careless. She also calls to the simple, but what she offers is stolen and dangerous.

That is the choice in Proverbs 9. Solomon makes wisdom and foolishness feel like two hosts inviting the same person to dinner. Both are calling. Both are offering something. Both want the young and undecided to come inside.

This chapter is important because not every invitation feels evil at first. Folly can sound exciting. It can sound secret. It can sound like freedom. Wisdom may require humility, correction, and the willingness to learn. But one table leads to life, and the other hides death in the room.

Solomon is teaching his son how to recognize the invitations behind his decisions. Every path is forming him. Every voice is training him. Every table has a future attached to it.

As you read Proverbs 9, ask which voice has been easiest for you to answer lately. Wisdom is not only calling you away from bad things. She is calling you into a life that can actually hold the weight of blessing.`,

  10: `Proverbs 10 feels like Solomon opens a window and lets you see life in quick flashes.

A wise son. A foolish son. Lazy hands. Diligent hands. A mouth that gives life. A mouth that hides violence. Hatred stirring trouble. Love covering offense. The righteous remembered. The wicked fading.

After the long father-to-son speeches of Proverbs 1 through 9, the book now shifts into the short sayings people usually think of when they hear the word proverb. It can feel less like one storyline and more like walking through a gallery of choices.

But there is still a story underneath it. Solomon is showing his son what a life becomes when wisdom or foolishness is repeated over time. One decision may seem small, but a pattern becomes a person. A person becomes a reputation. A reputation shapes a household, and a household shapes the future.

This chapter introduces the daily texture of wisdom. It is not only about major crossroads. It is about how you speak, how you work, how you respond, what you hide, what you love, and whether righteousness is shaping the ordinary parts of you.

As you read Proverbs 10, do not rush because the verses are short. Let each proverb be a quick scene. Ask yourself which kind of life is being built by the choices you keep repeating.`,

  11: `Imagine Solomon watching the marketplace from the palace gates.

Scales are being used. Deals are being made. People are measuring grain, silver, trust, and reputation. Some are honest when others are looking. Some know how to tilt the scale just enough to gain more than they should.

Proverbs 11 steps into that kind of world. It is about integrity when life gives you room to be crooked. Solomon knows a kingdom cannot be healthy if people only look righteous in public. Dishonest scales, pride, cruelty, gossip, and selfish gain all weaken the fabric of a people.

But righteousness holds weight. Humility brings wisdom. Generosity refreshes. Discretion protects. Integrity guides.

This chapter reminds us that wisdom is not image. It is structure. Like beams inside a house, integrity may be hidden, but it decides whether the house can stand.

Solomon is training his son to care about what God sees, not just what people applaud. A king especially must learn this, because power gives a person more ways to hide selfishness behind official language.

As you read Proverbs 11, picture God watching the scales. Not only the scales in a market, but the hidden measurements of your motives, your words, your generosity, and your honesty. Wisdom lives straight even when crooked would be easier.`,

  12: `In Proverbs 12, Solomon turns his son toward the daily evidence of a teachable life.

Some people love correction because they want to grow. Others hate it because correction threatens the version of themselves they are trying to protect. Solomon is blunt because he knows a future king who cannot receive correction will eventually harm everyone under him.

This chapter moves through work, speech, truth, anxiety, kindness, and discipline. It feels like Solomon is saying, "Do not tell me you love wisdom only in theory. Show me how you respond when someone corrects you. Show me how you speak when truth costs you. Show me how you work when no one is cheering."

The mouth gets a lot of attention here. Words can wound or heal. Lies can last for a moment, but truth endures. A careless sentence can pierce like a sword, while wise speech can bring health.

This is a chapter about visible wisdom. The wise life shows up in the field, at the table, in conflict, under pressure, and in the way a person handles being wrong.

As you read Proverbs 12, imagine Solomon preparing his son for a throne by first preparing his character. The person who cannot be corrected cannot be trusted with much for long.`,

  13: `Proverbs 13 sounds like a father thinking about the future.

Solomon knows his son will inherit more than land and title. He will inherit habits. He will inherit appetites. He will inherit the results of repeated decisions. So this chapter keeps pressing the difference between the wise path and the easy one.

A wise son hears instruction. A guarded mouth protects life. Diligence brings fruit over time. Hope deferred can make the heart ache. Walking with wise people shapes a person, while the companion of fools suffers harm.

There is a long road feeling to this chapter. Solomon is teaching his son that the future is often built quietly. One restrained word. One honest gain. One accepted correction. One wise friend. One disciplined step when laziness would be easier.

That is why wisdom can feel slow at first. Foolishness often offers immediate relief, immediate pleasure, or immediate pride. Wisdom asks you to care about what your life is becoming.

As you read Proverbs 13, picture Solomon asking his son to look further down the road. Not just at what feels good today, but at what today's choices are growing into. The question is not only, "What do I want now?" It is, "What kind of person is this making me?"`,

  14: `Proverbs 14 opens the door to a sobering truth: a way can seem right and still lead to death.

Imagine Solomon saying that to a son who will one day make decisions from a throne. Many ideas will sound reasonable. Many voices will sound confident. Many paths will feel natural. But feeling right is not the same as being wise.

This chapter walks through the difference between appearance and reality. A wise woman builds. A fool tears down. A witness can tell truth or breathe lies. Laughter can hide heaviness. A simple person believes too quickly. A prudent person pays attention to steps.

Solomon is training his son to see beneath the surface. Wisdom is not gullible. It does not assume that confidence equals truth or that success equals God's approval. It learns to test a path by where it leads and whether it honors the Lord.

There is also compassion in the chapter. The poor, the oppressed, the nation, the household, the angry heart, the patient heart; all of these matter to God.

As you read Proverbs 14, let it slow you down. Ask where you may be trusting a path simply because it seems right. Wisdom is willing to let God challenge what feels obvious.`,

  15: `Picture a tense room in the palace.

Someone is angry. Someone has been insulted. Someone wants to answer sharply and win the moment. A king's court can turn on words, and so can a home, a friendship, a church, or a marriage.

Proverbs 15 begins with one of the most practical scenes in all of wisdom: a soft answer turning away wrath. Solomon is teaching his son that strength is not always loud. Sometimes the person with the most power in the room is the one who can calm anger instead of feeding it.

This chapter keeps returning to speech, correction, prayer, joy, and the condition of the heart. The tongue can use knowledge well or pour out foolishness. The Lord sees everywhere. A cheerful heart changes a face. Better is a little with reverence than abundance with trouble.

Solomon wants his son to understand that wisdom changes the atmosphere a person carries. A wise person can make a room safer. A foolish person can make even a good room heavy.

As you read Proverbs 15, listen for the sound of your own words. Are they healing, stirring, teaching, cutting, calming, or revealing? Wisdom is not only what you know. It is what comes out of you when pressure touches your heart.`,

  16: `Proverbs 16 feels like Solomon standing between the planning table and the throne of God.

Kings make plans. Leaders prepare speeches. Armies move. Builders measure. Families dream. People decide what they want and how they will get there. Solomon understands planning, but he also knows the Lord is not pushed aside by human strategy.

This chapter teaches that the heart may make plans, but the Lord weighs motives and directs steps. That is not meant to make people passive. It is meant to make them humble.

Solomon warns about pride because pride forgets the King above every king. Pride believes its own press. Pride looks at influence, wealth, intelligence, or strength and assumes it is untouchable. But destruction often begins long before the fall is visible.

The chapter also speaks to leadership, patience, self-control, and honest speech. A ruler needs more than power. A person needs more than ambition. Wisdom asks not only, "What is the plan?" but "What kind of heart is making the plan?"

As you read Proverbs 16, bring your plans with you. Lay them before the Lord instead of clutching them like you control the whole story. Wisdom works faithfully, but it lets God be God.`,

  17: `Proverbs 17 brings wisdom into the rooms where life is most personal.

The dinner table. The family argument. The loyal friendship. The quiet grief. The moment when someone could forgive or keep feeding conflict. Solomon knows a kingdom is not only built by laws and armies. It is built by homes, friendships, justice, and the way people handle each other.

This chapter says a dry crust with peace is better than a house full of feasting with strife. That one image says a lot. A rich table cannot fix a divided spirit. Noise, food, money, and appearance cannot replace peace.

Solomon also talks about refined hearts, faithful friends, cheerful hearts, restrained speech, and the danger of rewarding evil. He is teaching his son that wisdom is relational. It is not only about making smart moves. It is about becoming the kind of person who can carry love, justice, loyalty, and restraint.

Some of the strongest wisdom in this chapter is quiet. A friend loves at all times. A cheerful heart does good. Even a fool can seem wise when silent.

As you read Proverbs 17, think about the rooms you affect. Do you bring peace or pressure? Do you cover offenses wisely or keep conflict alive? Wisdom begins to show in how people experience you up close.`,

  18: `Imagine the city gate again, but this time listen.

People are talking over each other. Someone answers before hearing the whole matter. Someone isolates and then trusts only his own desire. Someone uses words like weapons. Someone else speaks words that become shelter.

Proverbs 18 is a chapter about the danger and power of the mouth, but it starts deeper than speech. It begins with the isolated person who separates himself and seeks his own desire. Solomon knows that when a person refuses wisdom from others, their words often become reckless too.

This chapter teaches that listening is part of wisdom. Answering before hearing is shameful. The tongue carries life and death. The name of the Lord is a strong tower. Friendship matters. Humility comes before honor.

For a future king, this is crucial. A ruler who cannot listen will judge badly. A friend who cannot listen will wound people. A believer who cannot listen will confuse impulse with discernment.

As you read Proverbs 18, imagine Solomon asking his son to slow his mouth down long enough for wisdom to catch up. Words are never just air. They build, break, invite, reveal, and sometimes protect. The wise person learns to hear before speaking.`,

  19: `Proverbs 19 feels like wisdom walking slowly through everyday life.

Solomon points out the poor person with integrity, the soul without knowledge, the person who ruins his way and then blames the Lord, the quick temper, the generous hand, the teachable ear, and the fear of the Lord that leads to life.

This chapter has a steady patience to it. It is not impressed by speed. It keeps showing that foolishness often rushes, reacts, blames, and refuses correction. Wisdom can pause. Wisdom can receive instruction. Wisdom can choose integrity even when another path looks more profitable.

Imagine Solomon telling his son, "You will have power, but do not let power make you impatient. You will have plans, but remember the Lord's purpose stands. You will see poverty and need, but do not treat people as invisible. You will be corrected, and you must decide whether correction becomes a gift or an offense."

The chapter also reminds us that life is not only shaped by what we intend. It is shaped by what we learn, how we respond, and whether we fear the Lord more than we fear inconvenience.

As you read Proverbs 19, notice where wisdom asks you to slow down. Sometimes the most spiritual thing you can do is stop reacting long enough to obey.`,

  20: `Proverbs 20 feels like Solomon taking his son through the public life of the kingdom.

There is wine and the loss of self-control. There are quarrels that wise people avoid. There are workers who prepare and workers who sleep through harvest. There are buyers and sellers, vows and counsel, hidden motives and public claims.

This chapter is full of ordinary scenes because ordinary life reveals the truth about a person. Anyone can sound wise for a moment. But what happens in business, conflict, appetite, work, and private motives tells a fuller story.

Solomon wants his son to become the kind of ruler who can see through appearances. Many people proclaim their own goodness, but faithfulness is rarer. A child is known by his actions. Unequal weights and dishonest measures are not small to God. The Lord searches the inward parts like a lamp.

That image matters. God is not fooled by polished words or public confidence. His light reaches motives people would rather keep dim.

As you read Proverbs 20, picture the Lord walking through the marketplace, the courtroom, the home, and the hidden places of the heart. Wisdom invites His light instead of hiding from it.`,

  21: `Proverbs 21 begins with a king's heart in the hand of the Lord.

That would have landed heavily on Solomon's son. A king might sit above the people, but he does not sit above God. The Lord can direct rulers like channels of water. He weighs hearts. He sees pride. He cares more about righteousness and justice than religious performance without obedience.

This chapter is a needed warning for anyone with influence. It is possible to do spiritual-looking things while avoiding what God actually wants. Sacrifice can look impressive, but the Lord loves justice, humility, mercy, and obedience.

Solomon moves through themes of diligence, quarrels, false treasure, generosity, violence, and victory. He keeps showing that wisdom is not only about making life smoother. It is about living under God's authority in the way we treat people.

The chapter also challenges the illusion of control. Horses can be prepared for battle, but safety belongs to the Lord. Plans matter, but God is not dependent on human strength.

As you read Proverbs 21, imagine Solomon reminding his son that the throne is not a shield from accountability. God sees the king's heart, and He sees yours too. Wisdom does not hide behind religion. It practices what is right.`,

  22: `Proverbs 22 sounds like a father thinking beyond one generation.

A good name is better than riches. The rich and poor meet together before the same Maker. Children are trained. The generous are blessed. Boundaries are respected. The words of the wise are meant to be kept in the heart and ready on the lips.

For Solomon's son, this chapter would have felt like preparation for legacy. A prince may inherit wealth, but he still has to build a name. He may receive a crown, but he still has to become trustworthy. He may grow up around power, but God still cares about humility and the poor.

This chapter also begins a section that sounds like collected sayings of the wise. It is as if Solomon is opening the treasury wider and saying, "Do not only listen to me. Listen to wisdom wherever God has preserved it."

That is important. Wise people do not act like they are the only ones who know anything. They gather counsel. They store truth. They let instruction become part of them.

As you read Proverbs 22, think about the name your habits are building. Not your brand. Not your image. Your name. The quiet reputation formed by repeated choices when God, neighbors, family, and the vulnerable are watching.`,

  23: `Proverbs 23 feels like Solomon warning his son about appetites.

Not just hunger for food, but hunger for status, wealth, pleasure, approval, wine, lust, and the life someone else seems to have. A palace can make appetite look normal because abundance is everywhere. But abundance without wisdom can train the heart to want without limits.

This chapter begins with a table. The son is told to pay attention when he sits before a ruler. Food is not just food in that scene. It represents desire, opportunity, and the need for self-control when something attractive is placed in front of you.

Solomon warns against wearing yourself out to get rich. He warns against envying sinners. He pleads with his son to give him his heart. Then he paints the sadness of drunkenness, lust, and a life ruled by craving.

This is not anti-joy. It is pro-freedom. Wisdom teaches desire to submit to God so desire does not become a master.

As you read Proverbs 23, imagine Solomon watching his son enter rooms full of temptation disguised as privilege. The question is not whether you have desires. The question is whether your desires are being discipled by wisdom or fed by whatever sits on the table.`,

  24: `Proverbs 24 has the feel of a father preparing his son not to be impressed by the wrong people.

Solomon knows evil can look successful from a distance. The wicked may seem powerful. Their houses may look full. Their shortcuts may appear to work. But wisdom looks past the surface and asks what kind of foundation is underneath.

This chapter tells the son not to envy evil people. It says a house is built by wisdom and established by understanding. It praises counsel, strength in trouble, rescuing those in danger, and refusing to rejoice when an enemy falls.

Then Solomon takes his son to a field. The field belongs to a lazy man. The wall is broken. Thorns have grown. The vineyard tells a story without saying a word. Neglect has a visible harvest.

That image is powerful because many lives do not collapse from one dramatic rebellion. They become overgrown through neglect.

As you read Proverbs 24, picture Solomon pointing first to the impressive house of the wicked, then to the neglected field of the sluggard, and asking his son to learn from both. Wisdom builds what lasts. Foolishness either chases the wrong success or lets good things fall apart.`,

  25: `Centuries after Solomon, men under King Hezekiah copied more of his proverbs.

That detail matters. It means Solomon's wisdom outlived his reign. Long after the palace scenes changed and new kings sat on the throne, these sayings were still worth preserving. Proverbs 25 begins with that sense of recovered treasure.

The chapter feels royal in many places. It speaks of kings searching matters out, standing humbly before rulers, handling disputes carefully, and speaking words at the right time. There is wisdom here for anyone who wants to rush into visibility, rush into conflict, or rush into speech.

Solomon teaches that timing matters. A word fitly spoken is beautiful because it fits the moment. A true thing said wrongly can still do damage. A person who lacks self-control is like a city broken down without walls.

This chapter also teaches quiet strength. Gentle speech can break resistance. Patience can accomplish what force cannot. Humility can protect a person from shame.

As you read Proverbs 25, imagine old scrolls being unrolled and Solomon's voice speaking again to a later generation. Wisdom is not always loud. Sometimes it is the right word, in the right spirit, at the right time, from a heart with walls still standing.`,

  26: `Proverbs 26 is one of the sharpest chapters in the book.

Solomon pulls back the curtain on foolishness and lets his son study its patterns. The fool repeats folly. The sluggard makes excuses. The meddler grabs conflict that is not his. The gossip carries words like fuel. The deceiver hides harm behind charm.

This chapter can feel uncomfortable because it is so direct. But Solomon is not being harsh for entertainment. A future king must learn discernment. Not every situation deserves the same response. Not every argument deserves your energy. Not every person is safe with your trust.

There is even tension in the chapter: do not answer a fool according to his folly, and answer a fool according to his folly. That is not contradiction. It is wisdom training discernment. Sometimes answering pulls you into foolishness. Sometimes silence lets foolishness parade as truth. The wise person must learn the difference.

As you read Proverbs 26, picture Solomon teaching his son how to recognize patterns before they spread through a court, a home, or a heart. Wisdom is not naive. It can be gentle and still be clear-eyed.`,

  27: `Proverbs 27 feels like wisdom sitting with real relationships.

Do not boast about tomorrow. Let another praise you. Faithful wounds are better than flattering kisses. Iron sharpens iron. Know the condition of your flocks. These are not random ideas. They are the kind of truths a person needs when life becomes personal and responsibility becomes heavy.

Solomon knows his son will be surrounded by voices. Some will flatter him because he is powerful. Some will avoid telling him the truth because truth is risky near a throne. That makes faithful friendship priceless.

This chapter teaches that love is not always soft in the way we expect. Sometimes love wounds faithfully because it refuses to let someone drift. Sometimes wisdom comes through the person who sharpens you instead of simply agreeing with you.

It also brings attention to stewardship. A wise person pays attention to what has been entrusted to them. Flocks, fields, friendships, family, character; all need care before neglect becomes visible.

As you read Proverbs 27, imagine Solomon telling his son, "Do not build a life where no one can correct you." Wisdom needs honest friends, humble ears, and careful attention to what God has placed in your hands.`,

  28: `Proverbs 28 has the sound of footsteps in the dark and footsteps in the light.

The wicked flee when no one pursues, but the righteous are bold as a lion. That opening image sets the tone. Sin makes people restless even before consequences arrive. Righteousness gives a courage that does not have to keep hiding.

Solomon speaks here about justice, law, poverty, oppression, confession, greed, integrity, and generosity. The chapter is not interested in fake confidence. It is interested in the kind of boldness that comes from walking honestly before God.

One of the clearest moments says that whoever covers sin will not prosper, but whoever confesses and forsakes it will find mercy. That is the heart of the chapter. Concealment keeps a person trapped. Confession opens the door for mercy and change.

For a future king, this matters deeply. A ruler who hides sin becomes dangerous. A person who refuses correction becomes hard. A society that ignores justice becomes unstable.

As you read Proverbs 28, picture two roads: one where a person keeps covering, and one where a person steps into the light. Wisdom is brave enough to be honest because it trusts God's mercy more than its own disguise.`,

  29: `Proverbs 29 feels like the last strong warning from a father who has seen what stubbornness can do.

A person often reproved who hardens his neck will suddenly be broken. That is a serious opening. Solomon is telling his son that correction is mercy before collapse. The dangerous person is not the one who gets corrected. The dangerous person is the one who can no longer receive it.

This chapter moves through leadership, justice, anger, discipline, vision, fear of man, and trust in the Lord. It shows how private character affects public life. When the righteous are in authority, people rejoice. When wickedness rules, people groan.

For a prince, these words are not theoretical. His choices will affect households he never enters. His justice or injustice will be felt by people who cannot speak into the palace. That is why wisdom must shape leadership before power magnifies foolishness.

The fear of man also appears here. It is a trap. A leader who fears people more than God will bend truth for approval. But whoever trusts in the Lord is safe.

As you read Proverbs 29, listen for correction as a gift. Wisdom does not ask, "How can I avoid being challenged?" It asks, "What truth is God using to keep me from breaking?"`,

  30: `Proverbs 30 introduces a different voice: Agur.

After so many sayings connected to Solomon, this chapter feels like someone stepping forward with humility. Agur does not begin by boasting about what he knows. He confesses his limits. He is aware of God's greatness, the purity of God's words, and his own need for protection from both poverty and riches.

That humility is part of the lesson. Wisdom is not pretending to have mastered life. Wisdom knows when to put a hand over its mouth and wonder. Agur looks at creation, human behavior, small creatures, and mysterious things, and he learns from them.

His prayer is especially striking. He does not simply ask for more. He asks for what will keep him faithful. Not so little that he is tempted to steal. Not so much that he forgets God. That is a deeply wise request.

This chapter helps the Proverbs journey breathe. After many direct sayings, Agur reminds us that wisdom includes awe, limits, observation, and prayer.

As you read Proverbs 30, do not rush past the humility. Ask God for the kind of life that keeps your heart close to Him, not merely the kind of life that looks impressive from the outside.`,

  31: `Proverbs ends with the words taught to King Lemuel by his mother.

That is a beautiful turn. A book full of fatherly instruction closes by honoring a mother's wisdom. Lemuel is warned about the dangers that can weaken a king: uncontrolled desire, blurred judgment, and silence when the vulnerable need an advocate.

Then the chapter gives the famous portrait of the virtuous woman. This is not meant to be a shallow checklist for comparison. It is wisdom embodied. Strength, diligence, generosity, courage, business sense, care for the household, compassion for the poor, and fear of the Lord all take on flesh in one life.

The ending matters. Proverbs began with a father teaching his son to fear the Lord. It ends by showing a life where wisdom has become visible. Not just studied. Lived.

Charm can deceive. Beauty can fade. Public attention can rise and fall. But the fear of the Lord gives a life a different kind of weight.

As you read Proverbs 31, let it gather the whole journey. Wisdom is not only for kings, courts, markets, and arguments. It is for homes, work, service, leadership, speech, generosity, and worship. The final question is not whether you admire wisdom. It is whether wisdom is becoming visible in the way you live.`,
};

const devotionalDays: DevotionalDay[] = chapterPlans.map((day) => ({
  day_number: day.chapter,
  day_title: day.title,
  bible_reading_book: "Proverbs",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: cinematicDevotionalTextByChapter[day.chapter],
}));

async function main() {
  console.log("Starting Proverbs 31-day chapter devotional seed...");

  const { data: existingRows, error: findError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", DEVOTIONAL_TITLE);

  if (findError) {
    console.error("Failed to find existing Proverbs devotionals:", findError);
    process.exit(1);
  }

  let devotionalIds = (existingRows || []).map((row) => row.id as string);

  if (devotionalIds.length === 0) {
    let { data, error } = await supabase
      .from("devotionals")
      .insert(devotionalPayload)
      .select("id")
      .single();

    if (error?.code === "PGRST204" || /cover_image/i.test(error?.message || "")) {
      const fallback = await supabase
        .from("devotionals")
        .insert(devotionalPayloadWithoutCover)
        .select("id")
        .single();
      data = fallback.data;
      error = fallback.error;
    }

    if (error || !data) {
      console.error("Failed to create Proverbs devotional:", error);
      process.exit(1);
    }

    devotionalIds = [data.id];
    console.log(`Created devotional ${data.id}`);
  } else {
    let { error } = await supabase
      .from("devotionals")
      .update(devotionalPayload)
      .eq("title", DEVOTIONAL_TITLE);

    if (error?.code === "PGRST204" || /cover_image/i.test(error?.message || "")) {
      const fallback = await supabase
        .from("devotionals")
        .update(devotionalPayloadWithoutCover)
        .eq("title", DEVOTIONAL_TITLE);
      error = fallback.error;
    }

    if (error) {
      console.error("Failed to update Proverbs devotional metadata:", error);
      process.exit(1);
    }

    console.log(`Updated ${devotionalIds.length} Proverbs devotional row(s).`);
  }

  for (const devotionalId of devotionalIds) {
    const { error: deleteError } = await supabase
      .from("devotional_days")
      .delete()
      .eq("devotional_id", devotionalId);

    if (deleteError) {
      console.error(`Failed to clear days for devotional ${devotionalId}:`, deleteError);
      process.exit(1);
    }

    const rows = devotionalDays.map((day) => ({
      devotional_id: devotionalId,
      day_number: day.day_number,
      day_title: day.day_title,
      devotional_text: day.devotional_text,
      bible_reading_book: day.bible_reading_book,
      bible_reading_chapter: day.bible_reading_chapter,
      reflection_question: day.reflection_question,
    }));

    const { error: insertError } = await supabase.from("devotional_days").insert(rows);

    if (insertError) {
      console.error(`Failed to insert 31 Proverbs days for devotional ${devotionalId}:`, insertError);
      process.exit(1);
    }

    console.log(`Seeded ${rows.length} chapter-based days for devotional ${devotionalId}.`);
  }

  console.log("Done. The Wisdom of Proverbs is now a 31-day chapter journey.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
