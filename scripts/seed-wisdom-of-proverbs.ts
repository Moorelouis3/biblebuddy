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

const devotionalDays: DevotionalDay[] = chapterPlans.map((day) => ({
  day_number: day.chapter,
  day_title: day.title,
  bible_reading_book: "Proverbs",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: `Today we are walking through Proverbs ${day.chapter}.

${day.summary}

${day.heart}

This matters because Bible wisdom is not meant to stay abstract. Proverbs brings faith down into speech, desire, work, money, friendship, correction, temptation, justice, and ordinary decisions. The chapter in front of you is not just something to read. It is a mirror for the kind of person God is forming.

As you read Proverbs ${day.chapter}, slow down enough to notice one verse that feels especially direct. Do not rush past it. Ask why it stands out. Ask what it exposes, corrects, encourages, or clarifies.

Today's practice: ${day.practice}`,
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
