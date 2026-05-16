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

type IsaacDay = {
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

const beginsWithIcons = ["🌾", "🧬", "👨", "😨", "💧", "💔"];
const watchForIcons = ["🔍", "⚖️", "🧠", "👀", "🙏", "🔥"];

const isaacDays: IsaacDay[] = [
  {
    chapter: 26,
    title: "Isaac Carries the Promise",
    reflection: "Where do you need to trust God's promise for yourself instead of only living off someone else's faith?",
    opening:
      "Genesis 26 begins with Isaac standing in a familiar kind of pressure. There is famine in the land again, and Abraham is gone. The promise did not die with Abraham, but now Isaac must learn what it means to trust the God of his father for himself. This chapter shows God repeating the covenant promises, Isaac repeating some of Abraham's fear, conflict rising over wells, and the first signs of grief inside Isaac's own household.",
    beginsWith: [
      "famine in the land",
      "Isaac carrying Abraham's covenant line",
      "God speaking promises directly to Isaac",
      "fear shaping Isaac's decisions",
      "conflict over wells and territory",
      "Esau's marriages grieving the family",
    ],
    matters:
      "This chapter matters because it shows that the covenant did not end with Abraham. Isaac receives God's promise personally, but Genesis also shows that fear, conflict, and family tension continue into the next generation.",
    watchFor: [
      "how Isaac repeats some of Abraham's failures",
      "how God repeats covenant promises",
      "why wells become major sources of conflict",
      "how Isaac responds when people oppose him",
      "how Esau's choices begin to grieve the family",
    ],
    takeaway:
      "Genesis 26 shows that Isaac is not just a background character.\n\nHe is the covenant bridge between Abraham and Jacob, and God meets him personally while the family story grows more tense.",
  },
  {
    chapter: 27,
    title: "The Blessing Taken Through Deception",
    reflection: "Where do fear, favoritism, or manipulation need to be brought into the light before they damage something important?",
    opening:
      "Genesis 27 is one of the most emotionally tense family chapters in Genesis. Isaac wants to bless Esau. Rebekah wants Jacob to receive the blessing. Jacob lies. Esau weeps. Isaac trembles. The covenant promise keeps moving, but the family is tearing itself apart from the inside. This chapter is not only about who receives the blessing. It is about favoritism, identity, deception, grief, and the painful consequences of trying to force God's promise through broken methods.",
    beginsWith: [
      "Isaac growing old and losing his sight",
      "Isaac preparing to bless Esau",
      "Rebekah overhearing and making a plan",
      "Jacob disguising himself as Esau",
      "the blessing being spoken over the wrong son",
      "Esau's grief turning toward revenge",
    ],
    matters:
      "This chapter matters because it shows how the covenant blessing moves to Jacob, but not through a clean family moment. Genesis makes the tension real: God's promise continues, but deception and favoritism leave deep wounds.",
    watchFor: [
      "how favoritism has divided Isaac's house",
      "why the blessing mattered so much",
      "how Jacob lies about his identity",
      "how Esau responds when he learns the truth",
      "how receiving the blessing still leads Jacob into exile",
    ],
    takeaway:
      "Genesis 27 is about blessing and brokenness at the same time.\n\nGod's promise continues through Jacob, but the chapter makes us feel the cost of deception inside a family.",
  },
];

function buildIsaacStudyIntro(day: IsaacDay) {
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

const devotionalDays = isaacDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Genesis",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: buildIsaacStudyIntro(day),
}));

async function upsertPromiseThroughIsaacStudy() {
  const title = "The Promise Through Isaac";
  const description =
    "A 2-chapter Bible Buddy journey through Genesis 26-27 with intro, Bible reading, notes, trivia, Scrambled, and reflection centered on covenant inheritance, Isaac carrying Abraham's promise, fear, wells, favoritism, Jacob and Esau, deception, blessing, and family consequences.";

  const { data: oldPlaceholder } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Covenant Through Isaac")
    .maybeSingle();

  const { data: existing, error: existingError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", title)
    .maybeSingle();

  if (existingError) throw existingError;

  let devotionalId = (existing?.id || oldPlaceholder?.id) as string | undefined;

  if (devotionalId) {
    const { error } = await supabase
      .from("devotionals")
      .update({
        title,
        subtitle: "A 2-Chapter Journey",
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
        subtitle: "A 2-Chapter Journey",
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

    if (error) throw new Error(`Failed to upsert Promise Through Isaac day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log("The Promise Through Isaac is now a 2-chapter journey.");
}

upsertPromiseThroughIsaacStudy().catch((error) => {
  console.error(error);
  process.exit(1);
});
