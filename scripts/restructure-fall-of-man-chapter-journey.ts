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

type FallDay = {
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

const beginsWithIcons = ["🐍", "👀", "😨", "⚖️", "🚪"];
const watchForIcons = ["🔍", "🧠", "💔", "🩸", "🌍"];

const fallDays: FallDay[] = [
  {
    chapter: 3,
    title: "The Day Shame Entered the Garden",
    reflection:
      "Where are you tempted to hide from God instead of coming honestly to Him?",
    opening:
      "Genesis 3 opens in the garden, but the peace of Eden is about to be tested. A new voice enters the story. It questions God, twists His words, and makes disobedience look like freedom. This chapter is where trust breaks, shame enters, and humanity begins to hide from the God who made them.",
    beginsWith: [
      "the serpent questioning God's command",
      "Eve seeing the forbidden tree differently",
      "Adam and Eve eating the fruit",
      "shame and fear entering the human heart",
      "humanity being sent out from Eden",
    ],
    matters:
      "This chapter matters because it explains why the world is not the way Genesis 1 and 2 showed it should be. Sin does not only break a rule. It breaks trust, identity, relationships, work, creation, and humanity's life with God.",
    watchFor: [
      "how temptation begins by questioning God's goodness",
      "how desire grows before the action happens",
      "how shame makes Adam and Eve hide",
      "how blame damages relationship",
      "how God judges sin while still giving a promise of rescue",
    ],
    takeaway:
      "Genesis 3 is tragic, but it is not hopeless. The garden is lost, shame is real, and death enters the story, but God is already speaking a promise that evil will not have the final word.",
  },
  {
    chapter: 4,
    title: "When Sin Moves Into the Family",
    reflection:
      "Where do anger, comparison, or resentment need to be brought honestly before God?",
    opening:
      "Genesis 4 shows that sin does not stay in the garden. It moves into the family. The first children born outside Eden become part of a story filled with worship, comparison, anger, warning, murder, exile, culture, violence, and a small line of hope.",
    beginsWith: [
      "Cain and Abel being born outside Eden",
      "two brothers bringing offerings to the LORD",
      "Cain becoming angry when his offering is rejected",
      "sin crouching at Cain's door",
      "Abel's blood crying from the ground",
    ],
    matters:
      "This chapter matters because it shows sin spreading from hidden distrust into visible violence. Genesis 4 helps us understand anger, jealousy, responsibility, revenge, and why humanity needs more than progress. It needs redemption.",
    watchFor: [
      "how Cain responds to rejection",
      "how God warns Cain before the murder",
      "how Abel's blood cries out from the ground",
      "how Cain's line develops culture and violence at the same time",
      "how Seth's line keeps hope alive",
    ],
    takeaway:
      "Genesis 4 shows sin moving from the heart into the home and then into society. But even after murder and exile, God preserves a line where people begin to call on His name.",
  },
];

function buildFallStudyIntro(day: FallDay) {
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

const devotionalDays = fallDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Genesis",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: buildFallStudyIntro(day),
}));

async function upsertFallOfManStudy() {
  const title = "The Fall of Man";
  const description =
    "A 2-chapter Bible Buddy journey through Genesis 3-4 with intro, Bible reading, notes, trivia, Scrambled, and reflection centered on temptation, shame, sin, blame, violence, exile, and the first promise of redemption.";

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

    if (error) throw new Error(`Failed to upsert Fall of Man day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log("The Fall of Man is now a 2-chapter journey.");
}

upsertFallOfManStudy().catch((error) => {
  console.error(error);
  process.exit(1);
});
