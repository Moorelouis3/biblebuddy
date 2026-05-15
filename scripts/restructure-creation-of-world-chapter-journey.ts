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

type CreationDay = {
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

const beginsWithIcons = ["🌌", "🌊", "💡", "🌱", "👤"];
const watchForIcons = ["👀", "🗣️", "✨", "⚖️", "🧠"];

const creationDays: CreationDay[] = [
  {
    chapter: 1,
    title: "The God Who Speaks Everything Into Order",
    reflection:
      "Where do you need to trust that God can bring order, light, and purpose into what feels dark or unfinished?",
    opening:
      "Genesis 1 opens before humanity, nations, kingdoms, or history itself. There is no earth as we know it yet. No cities. No suffering. No death. Only God. And from the first verse, Genesis introduces a God who speaks order into chaos.",
    beginsWith: [
      "the heavens and the earth being created",
      "darkness and deep waters over the unfinished world",
      "God speaking light into existence",
      "creation being formed, filled, blessed, and named",
      "humanity being created in God's image",
    ],
    matters:
      "This chapter matters because it becomes the foundation for the entire Bible. Before sin, Israel, kings, prophets, or Jesus' earthly ministry, Genesis tells us who created the world, who holds authority, what humanity is, and what creation was designed to be.",
    watchFor: [
      "how often God speaks and creation responds",
      "how creation moves from unformed and empty into ordered and full",
      "how light, sky, land, seas, plants, stars, animals, and humanity each receive a place",
      "how humanity is different from the animals",
      "what it means to be made in the image of God",
    ],
    takeaway:
      "Genesis 1 is not just explaining that the world began. It is introducing the God who made it with power, wisdom, beauty, order, and purpose.",
  },
  {
    chapter: 2,
    title: "Eden, Humanity, And Life With God",
    reflection:
      "What does Genesis 2 teach you about your purpose, your relationships, your work, and your need for life with God?",
    opening:
      "Genesis 2 slows the camera down. Genesis 1 gave us the wide view of creation. Genesis 2 brings us close to the ground, close to the garden, close to Adam, and close to the first human relationship.",
    beginsWith: [
      "God resting after creation is complete",
      "the seventh day being blessed and made holy",
      "Adam being formed from the dust of the ground",
      "Eden being planted as a place of beauty and life",
      "Eve being created and the first marriage beginning",
    ],
    matters:
      "This chapter matters because it shows what human life was meant to be before sin entered the story: life with God, work with purpose, creation cared for, obedience trusted, relationship without shame, and rest received as holy.",
    watchFor: [
      "how rest is introduced before any human work is described",
      "how God forms Adam personally from dust and breath",
      "how Eden is both a garden and a sacred place of fellowship",
      "how the command creates real trust and responsibility",
      "how Eve is created as a fitting partner, not an afterthought",
    ],
    takeaway:
      "Genesis 2 shows that humanity was made for more than survival. We were made for worship, work, relationship, obedience, rest, and unashamed life with God.",
  },
];

function buildCreationStudyIntro(day: CreationDay) {
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

const devotionalDays = creationDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Genesis",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: buildCreationStudyIntro(day),
}));

async function upsertCreationOfWorldStudy() {
  const title = "The Creation of the World";
  const description =
    "A 2-chapter Bible Buddy journey through Genesis 1-2 with intro, Bible reading, notes, trivia, Scrambled, and reflection centered on creation, order, Eden, humanity in God's image, purpose, rest, and relationship.";

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

    if (error) throw new Error(`Failed to upsert Creation day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log("The Creation of the World is now a 2-chapter journey.");
}

upsertCreationOfWorldStudy().catch((error) => {
  console.error(error);
  process.exit(1);
});
