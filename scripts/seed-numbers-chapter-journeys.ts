import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { NUMBERS_DEEP_NOTES } from "../lib/numbersDeepNotes";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type NumbersDayDetail = {
  chapter: number;
  title: string;
  focus: string;
  watch: string[];
  reflection: string;
};

type NumbersJourney = {
  title: string;
  subtitle: string;
  description: string;
  range: string;
  chapters: NumbersDayDetail[];
};

const wildernessJourneyChapters: NumbersDayDetail[] = [
  {
    chapter: 1,
    title: "Counted Before the Journey",
    focus: "God counts Israel's fighting men before the wilderness journey, showing that His people are known, ordered, and prepared for what comes next.",
    watch: ["the wilderness of Sinai", "tribe leaders named", "men counted for service", "the Levites set apart", "a people prepared to move"],
    reflection: "How does Numbers 1 help you see that God knows and prepares His people before the hard part of the journey?",
  },
  {
    chapter: 2,
    title: "Camped Around God's Presence",
    focus: "God arranges the tribes around the tabernacle so Israel learns that His presence belongs at the center of their life together.",
    watch: ["tribes placed by standard", "the tabernacle in the center", "Judah leading the east side", "order before movement", "worship shaping community"],
    reflection: "What would change if God's presence was truly at the center of your daily order?",
  },
  {
    chapter: 3,
    title: "The Levites Set Apart",
    focus: "God gives the Levites to Aaron for tabernacle service, showing that worship requires care, calling, and holy responsibility.",
    watch: ["Aaron's sons", "the Levites taken instead of the firstborn", "tabernacle duties", "guarding holy things", "redemption money"],
    reflection: "Where is God inviting you to treat service, worship, or responsibility with more care?",
  },
  {
    chapter: 4,
    title: "Carrying Holy Things",
    focus: "God gives detailed duties for carrying the tabernacle, teaching that holy things must not be handled casually.",
    watch: ["Kohathites carrying covered furniture", "Gershonites carrying curtains", "Merarites carrying frames", "Aaron's sons supervising", "ordered service"],
    reflection: "What does Numbers 4 teach you about honoring God in the practical details of service?",
  },
  {
    chapter: 5,
    title: "Purity in the Camp",
    focus: "God protects the camp by addressing uncleanness, restitution, and hidden sin because His presence lives among His people.",
    watch: ["unclean persons outside the camp", "confession and repayment", "wrong made right", "the jealousy test", "God seeing what is hidden"],
    reflection: "What hidden or unresolved thing might God be calling you to bring into the light?",
  },
  {
    chapter: 6,
    title: "Set Apart and Blessed",
    focus: "God teaches voluntary devotion through the Nazirite vow and then gives Israel a blessing that places His name over His people.",
    watch: ["separation to the Lord", "no wine or strong drink", "uncut hair", "completion offerings", "the priestly blessing"],
    reflection: "How does Numbers 6 invite you to both deeper devotion and deeper confidence in God's blessing?",
  },
  {
    chapter: 7,
    title: "Offerings from Every Tribe",
    focus: "Each tribal leader brings offerings for the tabernacle, showing that every part of God's people has a place in worship.",
    watch: ["leaders bringing gifts", "wagons and oxen", "repeated offerings", "each tribe named", "God speaking from the mercy seat"],
    reflection: "What does Numbers 7 teach you about bringing your part faithfully, even when it feels ordinary or repeated?",
  },
  {
    chapter: 8,
    title: "Light and Levites",
    focus: "God prepares the lamps and cleanses the Levites, showing that service before Him requires light, cleansing, and dedication.",
    watch: ["lamps shining forward", "Levites cleansed", "hands laid on them", "offered as a wave offering", "service with limits"],
    reflection: "Where do you need God's cleansing before you serve with steadiness?",
  },
  {
    chapter: 9,
    title: "Passover and the Cloud",
    focus: "Israel keeps Passover in the wilderness and follows the cloud, learning to remember redemption and move only when God leads.",
    watch: ["Passover kept at Sinai", "mercy for delayed participation", "the cloud over the tabernacle", "staying when God stays", "moving when God moves"],
    reflection: "Where do you need to slow down and follow God's timing instead of forcing your own?",
  },
  {
    chapter: 10,
    title: "Leaving Sinai",
    focus: "The silver trumpets signal movement as Israel finally leaves Sinai, showing that ordered worship must become obedient walking.",
    watch: ["silver trumpets", "the camp setting out", "Judah moving first", "Hobab invited along", "Moses' prayer as the ark moves"],
    reflection: "What does Numbers 10 teach you about carrying worship into the next step of obedience?",
  },
  {
    chapter: 11,
    title: "Complaint in the Wilderness",
    focus: "Israel complains about hardship and food, exposing how quickly rescued hearts can forget God's provision.",
    watch: ["fire at the outskirts", "craving Egypt's food", "Moses overwhelmed", "seventy elders", "quail and judgment"],
    reflection: "Where has complaint been making you forget what God has already done?",
  },
  {
    chapter: 12,
    title: "Moses Under Attack",
    focus: "Miriam and Aaron challenge Moses, and God defends His servant while also showing mercy after discipline.",
    watch: ["criticism of Moses", "Moses described as meek", "God speaking face to face", "Miriam's leprosy", "Moses interceding"],
    reflection: "How does Numbers 12 challenge the way you speak about people God has called to lead?",
  },
  {
    chapter: 13,
    title: "The Spies See the Land",
    focus: "The spies see the goodness of the land, but most of them interpret God's promise through fear instead of faith.",
    watch: ["twelve spies sent", "fruit from the land", "a good land", "giants and fortified cities", "Caleb's faith"],
    reflection: "What promise of God are you tempted to measure by the size of the obstacle?",
  },
  {
    chapter: 14,
    title: "Fear Refuses the Promise",
    focus: "Israel refuses to trust God and faces wilderness judgment, while Joshua and Caleb show what faith looks like under pressure.",
    watch: ["the people wanting Egypt", "Joshua and Caleb pleading", "God's glory appearing", "Moses interceding", "forty years in the wilderness"],
    reflection: "Where do you need to choose faithful obedience instead of letting fear send you backward?",
  },
];

const rebellionJourneyChapters: NumbersDayDetail[] = [
  {
    chapter: 15,
    title: "Holiness After Failure",
    focus: "After Israel's failure at Kadesh, God gives offering instructions that point forward to life in the land and call His people back to holiness.",
    watch: ["when you come into the land", "offerings and grain", "one law for Israel and the stranger", "intentional sin", "tassels to remember"],
    reflection: "How does Numbers 15 help you keep obeying after failure instead of giving up?",
  },
  {
    chapter: 16,
    title: "Korah's Rebellion",
    focus: "Korah and others challenge God's appointed leadership, and the chapter shows the danger of spiritual pride dressed up as fairness.",
    watch: ["Korah's challenge", "censers before the Lord", "Moses falling on his face", "the earth opening", "Aaron standing between death and life"],
    reflection: "Where do you need to guard your heart from pride, resentment, or rebellion against God's order?",
  },
  {
    chapter: 17,
    title: "Aaron's Rod Buds",
    focus: "God confirms Aaron's priesthood through a dead rod that buds, blossoms, and bears almonds, showing that true authority comes from Him.",
    watch: ["twelve rods", "Aaron's name", "buds and blossoms", "almonds", "a sign kept before the testimony"],
    reflection: "What does Numbers 17 teach you about trusting God's choice instead of fighting for control?",
  },
  {
    chapter: 18,
    title: "Priests, Levites, and Holy Gifts",
    focus: "God clarifies priestly and Levitical responsibilities so worship can continue with order, provision, and reverence.",
    watch: ["bearing responsibility for the sanctuary", "Levites given as a gift", "holy portions", "tithes", "no inheritance but the Lord"],
    reflection: "How does Numbers 18 reshape the way you think about serving, giving, and belonging to God?",
  },
  {
    chapter: 19,
    title: "Cleansing from Death",
    focus: "The red heifer ritual teaches that contact with death requires cleansing because God's holy presence is life-giving.",
    watch: ["the red heifer", "ashes for purification", "uncleanness from death", "water for cleansing", "purity for the community"],
    reflection: "Where do you need God's cleansing from what has spiritually weighed you down?",
  },
  {
    chapter: 20,
    title: "Meribah and Moses' Failure",
    focus: "Israel complains again, Miriam and Aaron die, and Moses dishonors God at the rock, showing that leadership still requires humble obedience.",
    watch: ["Miriam's death", "water from the rock", "Moses' anger", "not honoring God as holy", "Aaron's death on the mountain"],
    reflection: "Where do you need to obey God carefully instead of letting frustration lead you?",
  },
  {
    chapter: 21,
    title: "The Bronze Serpent",
    focus: "Israel grumbles and faces judgment, but God provides healing through a lifted serpent that points forward to salvation by faith.",
    watch: ["victory over Arad", "impatience on the way", "fiery serpents", "look and live", "victories over kings"],
    reflection: "What does Numbers 21 teach you about looking to God's mercy instead of trying to heal yourself?",
  },
  {
    chapter: 22,
    title: "Balaam Is Summoned",
    focus: "Balak hires Balaam to curse Israel, but God shows that no enemy plan can override His authority or blessing.",
    watch: ["Balak's fear", "Balaam invited", "God's warning", "the angel of the Lord", "the donkey speaking"],
    reflection: "How does Numbers 22 remind you that God sees dangers and pressures you cannot see?",
  },
  {
    chapter: 23,
    title: "No Curse Can Stand",
    focus: "Balaam tries to curse Israel, but God turns the moment into blessing because His covenant word cannot be manipulated.",
    watch: ["altars and sacrifices", "God putting words in Balaam's mouth", "Israel blessed", "God not lying", "Balak's frustration"],
    reflection: "Where do you need to trust that God's word over you is stronger than opposition?",
  },
  {
    chapter: 24,
    title: "Blessing and the Coming King",
    focus: "Balaam sees Israel's beauty and future victory, including a star and scepter that point toward God's coming King.",
    watch: ["the Spirit of God", "beautiful tents", "blessing instead of cursing", "a star from Jacob", "a scepter from Israel"],
    reflection: "How does Numbers 24 help you look beyond the wilderness toward God's bigger promise?",
  },
  {
    chapter: 25,
    title: "Compromise at Peor",
    focus: "Israel falls into idolatry and immorality at Peor, showing that compromise can do what outside curses could not do.",
    watch: ["Moabite temptation", "Baal of Peor", "the Lord's anger", "Phinehas' zeal", "covenant of peace"],
    reflection: "Where do you need to resist compromise before it pulls your heart away from God?",
  },
];

const promisedLandChapters: NumbersDayDetail[] = [
  {
    chapter: 26,
    title: "The New Generation Counted",
    focus: "God counts the new generation after the wilderness judgment, showing that His promise continues even after years of failure and loss.",
    watch: ["a new census", "families named", "the generation after the plague", "inheritance by size", "Caleb and Joshua still standing"],
    reflection: "How does Numbers 26 help you see God's faithfulness after a long season of discipline or delay?",
  },
  {
    chapter: 27,
    title: "Daughters, Inheritance, and Joshua",
    focus: "God protects Zelophehad's daughters and commissions Joshua, showing His care for justice, inheritance, and future leadership.",
    watch: ["Zelophehad's daughters", "a right inheritance", "Moses seeing the land", "Joshua commissioned", "leadership passed on publicly"],
    reflection: "Where does Numbers 27 help you trust God with both justice and the next season of leadership?",
  },
  {
    chapter: 28,
    title: "Daily and Festival Offerings",
    focus: "God reviews Israel's offerings so the new generation enters the land with worship rhythms already in place.",
    watch: ["daily offerings", "Sabbath offerings", "monthly offerings", "Passover and Unleavened Bread", "Weeks offerings"],
    reflection: "What daily or weekly rhythm would help you keep worship central before the next season begins?",
  },
  {
    chapter: 29,
    title: "Worship Through the Seventh Month",
    focus: "God continues the calendar of offerings, reminding Israel that the promised land must be entered as a worshiping people.",
    watch: ["trumpets", "Day of Atonement", "Booths", "repeated sacrifices", "joy and reverence together"],
    reflection: "How can Numbers 29 teach you to mark your time around God instead of only around your own plans?",
  },
  {
    chapter: 30,
    title: "Vows and Faithful Words",
    focus: "God teaches Israel to take vows seriously because words spoken before Him carry weight.",
    watch: ["a vow to the Lord", "keeping your word", "family authority", "binding promises", "faithful speech"],
    reflection: "Where do your words, promises, or commitments need more faithfulness before God?",
  },
  {
    chapter: 31,
    title: "Judgment on Midian",
    focus: "God commands judgment on Midian because compromise at Peor had attacked Israel's covenant faithfulness.",
    watch: ["vengeance on Midian", "Phinehas with holy instruments", "Balaam's end", "purification after battle", "plunder offered to the Lord"],
    reflection: "What does Numbers 31 teach you about taking spiritual compromise seriously?",
  },
  {
    chapter: 32,
    title: "Settling East of Jordan",
    focus: "Reuben and Gad ask for land east of Jordan, and Moses warns them not to discourage the rest of Israel from obeying God.",
    watch: ["much livestock", "land east of Jordan", "Moses remembering the spies", "fighting for the brothers", "promise before possession"],
    reflection: "Where do you need to make sure your comfort does not keep you from helping others obey God?",
  },
  {
    chapter: 33,
    title: "Remembering the Whole Journey",
    focus: "Moses records Israel's journeys from Egypt to Moab so the people remember how God carried them through every stage.",
    watch: ["stages of the journey", "leaving Egypt", "many wilderness stops", "Aaron's death", "drive out the inhabitants"],
    reflection: "How could remembering your journey help you trust God for what comes next?",
  },
  {
    chapter: 34,
    title: "Boundaries of the Land",
    focus: "God defines the borders of Canaan and names leaders to divide the inheritance, showing that His promise has real shape and order.",
    watch: ["southern border", "western border", "northern border", "eastern border", "leaders appointed for inheritance"],
    reflection: "How does Numbers 34 help you see that God's promises are not vague, but ordered and intentional?",
  },
  {
    chapter: 35,
    title: "Levite Cities and Refuge",
    focus: "God provides cities for the Levites and cities of refuge, showing that worship, justice, mercy, and life must shape the land.",
    watch: ["cities for Levites", "pasturelands", "six cities of refuge", "manslayer and avenger", "no ransom for murder"],
    reflection: "What does Numbers 35 teach you about holding justice and mercy together?",
  },
  {
    chapter: 36,
    title: "Inheritance Protected",
    focus: "God protects tribal inheritance through Zelophehad's daughters, closing Numbers with order, obedience, and preserved promise.",
    watch: ["inheritance concerns", "marrying within the tribe", "the daughters obeying", "land staying with the tribe", "commands on the plains of Moab"],
    reflection: "How does Numbers 36 help you think about obedience that protects future generations?",
  },
];

const journeys: NumbersJourney[] = [
  {
    title: "The Wilderness Journey",
    subtitle: "A 14-Chapter Journey",
    range: "Numbers 1-14",
    description:
      "A 14-chapter Bible study through Numbers 1-14. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so the ordered camp, wilderness guidance, complaint, leadership pressure, spies, fear, faith, and trust in God's promise stay centered on Scripture.",
    chapters: wildernessJourneyChapters,
  },
  {
    title: "The Rebellion in the Wilderness",
    subtitle: "An 11-Chapter Journey",
    range: "Numbers 15-25",
    description:
      "An 11-chapter Bible study through Numbers 15-25. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so rebellion, holiness, chosen priesthood, judgment, mercy, Balaam, blessing, compromise, and faithfulness in the wilderness stay centered on Scripture.",
    chapters: rebellionJourneyChapters,
  },
  {
    title: "The Promised Land Ahead",
    subtitle: "An 11-Chapter Journey",
    range: "Numbers 26-36",
    description:
      "An 11-chapter Bible study through Numbers 26-36. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so the new generation, inheritance, Joshua's commissioning, offerings, vows, justice, refuge, boundaries, and promised land preparation stay centered on Scripture.",
    chapters: promisedLandChapters,
  },
];

function formatList(items: readonly string[]) {
  return items.map((item) => `* ${item}`).join("\n\n");
}

function buildIntro(journey: NumbersJourney, detail: NumbersDayDetail) {
  return `${detail.focus}

# Where This Chapter Begins

Numbers ${detail.chapter} belongs to **${journey.title}**, the Bible Study that walks through ${journey.range} and helps you follow Israel's wilderness story one chapter at a time.

**The scene opens with:**

${formatList(detail.watch)}

---

# Why This Chapter Matters

This chapter matters because Numbers is not just about Israel wandering. It shows what happens when God's rescued people have to learn trust, obedience, worship, leadership, patience, and faith in the space between deliverance and promise.

**This chapter helps us see:**

* God orders and guides His people

* the wilderness reveals what is really in the heart

* complaint, fear, pride, and compromise are spiritually dangerous

* God's holiness remains serious even when His mercy is present

* faith means trusting God's promise when the journey feels hard

---

# What To Watch For

As you read Numbers ${detail.chapter}, watch how God keeps teaching His people to trust Him in the wilderness.

---

# The Bigger Takeaway

> **${detail.focus}**

> **The wilderness is not wasted when it teaches God's people to trust His presence, His word, and His promise.**`;
}

async function getOrCreateStudyId(journey: NumbersJourney) {
  const { data: existing, error: existingError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", journey.title)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing?.id) return existing.id as string;

  const { data: created, error: createError } = await supabase
    .from("devotionals")
    .insert({
      title: journey.title,
      subtitle: journey.subtitle,
      description: journey.description,
      total_days: journey.chapters.length,
    })
    .select("id")
    .single();

  if (createError) throw createError;
  if (!created?.id) throw new Error(`Failed to create ${journey.title} Bible Study.`);
  return created.id as string;
}

async function seedJourney(journey: NumbersJourney) {
  const devotionalId = await getOrCreateStudyId(journey);

  const { error: updateError } = await supabase
    .from("devotionals")
    .update({
      subtitle: journey.subtitle,
      description: journey.description,
      total_days: journey.chapters.length,
    })
    .eq("id", devotionalId);

  if (updateError) throw updateError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", journey.chapters.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const [index, detail] of journey.chapters.entries()) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        day_number: index + 1,
        day_title: detail.title,
        bible_reading_book: "Numbers",
        bible_reading_chapter: detail.chapter,
        devotional_text: buildIntro(journey, detail),
        reflection_question: detail.reflection,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert ${journey.title} day ${index + 1}: ${error.message}`);
    console.log(`Upserted ${journey.title} day ${index + 1}: Numbers ${detail.chapter} - ${detail.title}`);
  }
}

async function seedNotes() {
  const notesRows = Array.from({ length: 36 }, (_, index) => {
    const notesText = NUMBERS_DEEP_NOTES[index];
    if (!notesText?.trim()) {
      throw new Error(`Missing Numbers ${index + 1} notes.`);
    }

    return {
      book: "numbers",
      chapter: index + 1,
      notes_text: notesText,
    };
  });

  const { error } = await supabase
    .from("bible_notes")
    .upsert(notesRows, { onConflict: "book,chapter" });

  if (error) throw error;
}

async function main() {
  for (const journey of journeys) {
    await seedJourney(journey);
  }

  await seedNotes();
  console.log("Seeded Numbers Bible Studies and Numbers 1-36 notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
