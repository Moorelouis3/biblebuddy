import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type FloodDay = {
  chapter: number;
  title: string;
  reflection: string;
  opening: string;
  beginsWith: string[];
  matters: string;
  watchFor: string[];
  takeaway: string;
};

function formatIntroList(items: string[], icons: string[]) {
  return items.map((item, index) => `* ${icons[index % icons.length]} ${item}`).join("\n\n");
}

function formatTakeawayCallout(text: string) {
  return text
    .split("\n\n")
    .map((paragraph) => `> **${paragraph}**`)
    .join("\n>\n");
}

const beginsWithIcons = ["⚰️", "🧬", "🌊", "⚖️", "🛶", "🕊️", "🌍"];
const watchForIcons = ["🔍", "🧠", "💔", "⚖️", "🙏", "🌈", "🏙️"];

const floodDays: FloodDay[] = [
  {
    chapter: 5,
    title: "Death Spreads Through the Generations",
    reflection: "Where do you need to keep walking with God faithfully, even when the world around you feels spiritually heavy?",
    opening:
      "Genesis 5 can look like a quiet genealogy, but it is one of the most haunting chapters in early Genesis. After the fall and Cain's violence, the Bible traces Adam's line through Seth and lets one phrase echo again and again: and he died. The chapter feels like a family record, but underneath the names is the sound of the curse moving through generations. Still, the darkness is not total. Enoch walks with God, and Noah is born as a child connected to comfort from the cursed ground.",
    beginsWith: [
      "Adam's family line being recorded",
      "the image of God still mattering after the fall",
      "death repeating through generation after generation",
      "Enoch walking with God",
      "Noah being introduced before the flood",
    ],
    matters:
      "This chapter matters because it shows that death has moved from Eden into ordinary family history. It also shows that faithfulness is still possible in a dying world, and it prepares the reader for Noah before the flood begins.",
    watchFor: [
      "how often the phrase `and he died` appears",
      "how Enoch interrupts the death pattern",
      "how Noah's name connects to comfort and the cursed ground",
      "how genealogy carries theology, not just information",
      "how Genesis moves from Adam toward the flood",
    ],
    takeaway:
      "Genesis 5 is not just a list of names.\n\nIt is a chapter about death spreading after sin, faithfulness still shining in Enoch, and Noah quietly entering the story before judgment arrives.",
  },
  {
    chapter: 6,
    title: "Corruption Fills the Earth",
    reflection: "What does Noah's obedience teach you about trusting God before other people can see why it matters?",
    opening:
      "Genesis 6 opens with humanity multiplying, but the growth of people does not mean the growth of righteousness. Wickedness spreads. Violence fills the earth. Human thoughts bend toward evil continually. Then the chapter says something devastating: God is grieved at His heart. And yet, in the middle of that corruption, one sentence cuts through the darkness: Noah found grace in the eyes of the LORD.",
    beginsWith: [
      "humanity multiplying across the earth",
      "corruption spreading through human society",
      "violence filling the earth",
      "God grieving over human wickedness",
      "Noah finding grace and receiving ark instructions",
    ],
    matters:
      "This chapter matters because it explains why the flood happens. Genesis does not present judgment as random. The earth has become corrupt and violent, but God still prepares rescue through Noah and establishes the first stated covenant promise.",
    watchFor: [
      "how corruption is described as both inward and social",
      "how God grieves without being weak or confused",
      "how Noah is described as walking with God",
      "how the ark instructions make obedience practical",
      "how judgment and mercy appear together",
    ],
    takeaway:
      "Genesis 6 is not just about an ark.\n\nIt is about a world collapsing morally while God prepares a way of rescue through grace, covenant, and obedient faith.",
  },
  {
    chapter: 7,
    title: "The Waters of Judgment Rise",
    reflection: "What part of God's warning or instruction do you need to take seriously before life forces you to?",
    opening:
      "Genesis 7 is the moment warning becomes reality. Noah enters the ark with his family. The animals come. The LORD shuts him in. Then the fountains of the deep break open, the windows of heaven open, and the waters rise over the earth. This chapter should feel serious and unsettling. The flood is not a cute story. It is judgment, survival, obedience, and mercy inside the same terrifying scene.",
    beginsWith: [
      "God calling Noah and his household into the ark",
      "clean and unclean animals being preserved",
      "Noah obeying all that the LORD commanded",
      "the fountains of the deep breaking open",
      "the flood covering the earth",
    ],
    matters:
      "This chapter matters because it shows that God's warnings are not empty. The same God who gave time to build the ark also closes the door and brings the waters. Genesis 7 teaches the seriousness of judgment and the mercy of being inside the refuge God provided.",
    watchFor: [
      "the difference between entering by faith and seeing the flood afterward",
      "why the LORD shutting Noah in feels both safe and sobering",
      "how the flood imagery sounds like creation being undone",
      "how total the judgment outside the ark becomes",
      "how the ark floats because God preserves life",
    ],
    takeaway:
      "Genesis 7 is about the waters rising.\n\nIt shows that judgment is real, obedience matters, and the only safe place is the refuge God Himself provides.",
  },
  {
    chapter: 8,
    title: "The Waters Recede and Worship Returns",
    reflection: "How can you keep trusting God while you are waiting for the waters to fully recede?",
    opening:
      "Genesis 8 begins with hope after terror: God remembered Noah. The flood waters begin to recede, but Noah still has to wait. The ark rests, the raven goes out, the dove returns, and time passes slowly. Then Noah finally leaves the ark and steps into a changed world. His first recorded act outside the ark is worship. He builds an altar to the LORD.",
    beginsWith: [
      "God remembering Noah and every living thing in the ark",
      "wind passing over the waters",
      "the ark resting on the mountains of Ararat",
      "the raven and dove being sent out",
      "Noah leaving the ark and worshiping",
    ],
    matters:
      "This chapter matters because it shows mercy after judgment. God remembers, the waters recede, life begins again, and worship rises from the rescued world. But the chapter also reminds us that the human heart still needs deeper redemption.",
    watchFor: [
      "what `God remembered Noah` means",
      "how wind over waters echoes creation",
      "why Noah waits instead of rushing out",
      "why the dove and olive leaf became signs of life",
      "why Noah builds an altar before building anything else",
    ],
    takeaway:
      "Genesis 8 is about rescue becoming worship.\n\nGod brings Noah through the flood, teaches him to wait, opens the door in His timing, and receives worship in a world beginning again.",
  },
  {
    chapter: 9,
    title: "Covenant, Blood, Rainbow, and Noah's Failure",
    reflection: "What does the rainbow covenant teach you about God's mercy after judgment?",
    opening:
      "Genesis 9 starts with blessing. God tells Noah and his sons to be fruitful and multiply. He speaks about life, blood, human dignity, justice, and covenant. Then He gives the rainbow as a sign that flood judgment will not destroy all flesh again. But the chapter does not end with Noah looking flawless. It ends with drunkenness, shame, family dishonor, and consequences. Genesis is honest: Noah is faithful, but Noah is still human.",
    beginsWith: [
      "humanity restarting after the flood",
      "God blessing Noah and his sons",
      "blood and life being treated as sacred",
      "the image of God being reaffirmed",
      "the rainbow covenant being given",
    ],
    matters:
      "This chapter matters because it gives one of the Bible's great covenant signs and teaches the sacredness of human life. It also shows that a new world does not automatically create a new heart. Humanity still needs redemption.",
    watchFor: [
      "how Genesis 9 echoes Genesis 1",
      "why blood is connected to life",
      "why murder is so serious in a world made in God's image",
      "what the rainbow means as a covenant sign",
      "how Noah's failure keeps the story honest",
    ],
    takeaway:
      "Genesis 9 is hopeful and sobering at the same time.\n\nThe rainbow says God remembers mercy, but Noah's failure reminds us that rescued people still need God's grace.",
  },
  {
    chapter: 10,
    title: "The Nations Spread Across the Earth",
    reflection: "How does Genesis 10 change the way you think about nations, people groups, and God's plan for the whole world?",
    opening:
      "Genesis 10 is often called the Table of Nations. It traces the families of Noah's sons as humanity spreads across the earth after the flood. At first, the chapter can feel like a long list of names, but it is actually a wide-angle view of the world God preserved. The nations are not random. The people groups, lands, languages, cities, and kingdoms are all known by God.",
    beginsWith: [
      "the generations of Shem, Ham, and Japheth",
      "families spreading after the flood",
      "early lands, peoples, and languages being named",
      "Nimrod and early kingdoms appearing",
      "the world being prepared for Babel and Abraham",
    ],
    matters:
      "This chapter matters because it shows humanity spreading after judgment and covenant. It prepares the reader for Babel, for Abraham, and for the larger biblical promise that all families of the earth will one day be blessed.",
    watchFor: [
      "how the nations come from one preserved family",
      "how geography and genealogy work together",
      "why Nimrod and Babel are mentioned before Genesis 11",
      "how future biblical peoples are introduced here",
      "how God's plan is bigger than one nation from the beginning",
    ],
    takeaway:
      "Genesis 10 is not just a list.\n\nIt is the Bible opening the map after the flood, showing the nations spreading while God's promise keeps moving forward.",
  },
];

function buildFloodStudyIntro(day: FloodDay) {
  return `${day.opening}

# 📍 Where This Chapter Begins

**The chapter opens with:**

${formatIntroList(day.beginsWith, beginsWithIcons)}

---

# 💡 Why This Chapter Matters

${day.matters}

---

# 🔍 What To Watch For

**As you read, pay attention to:**

${formatIntroList(day.watchFor, watchForIcons)}

---

# 🎬 The Bigger Takeaway

${formatTakeawayCallout(day.takeaway)}`;
}

const devotionalDays = floodDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Genesis",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: buildFloodStudyIntro(day),
}));

async function upsertFloodOfNoahStudy() {
  const title = "The Flood of Noah";
  const description =
    "A 6-chapter Bible Buddy journey through Genesis 5-10 with intro, Bible reading, notes, trivia, Scrambled, and reflection centered on death spreading after the fall, corruption, violence, judgment, Noah's obedience, the flood, covenant mercy, and the nations after the flood.";

  const { data: existing, error: existingError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", title)
    .maybeSingle();

  if (existingError) throw existingError;

  let devotionalId = existing?.id as string | undefined;

  if (devotionalId) {
    const { error } = await supabase
      .from("devotionals")
      .update({
        subtitle: "A 6-Chapter Journey",
        description,
        total_days: devotionalDays.length,
      })
      .eq("id", devotionalId);

    if (error) throw error;
  } else {
    const { data, error } = await supabase
      .from("devotionals")
      .insert({
        title,
        subtitle: "A 6-Chapter Journey",
        description,
        total_days: devotionalDays.length,
      })
      .select("id")
      .single();

    if (error) throw error;
    devotionalId = data.id as string;
  }

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", devotionalDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of devotionalDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Flood of Noah day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log("The Flood of Noah is now a 6-chapter journey.");
}

upsertFloodOfNoahStudy().catch((error) => {
  console.error(error);
  process.exit(1);
});
