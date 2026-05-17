import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { EXODUS_DEEP_NOTES } from "../lib/exodusDeepNotes";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type SinaiDay = {
  day_number: number;
  day_title: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  devotional_text: string;
  reflection_question: string;
};

const chapterDetails = [
  {
    chapter: 19,
    title: "Israel Arrives at Sinai",
    focus: "Israel reaches Mount Sinai, and God prepares the rescued people to meet Him as a holy covenant nation.",
    watch: ["arrival at the mountain", "God's covenant invitation", "a treasured possession", "boundaries around holiness", "thunder, cloud, trumpet, and trembling"],
    reflection: "What does Exodus 19 teach you about approaching God with both nearness and reverence?",
  },
  {
    chapter: 20,
    title: "The Ten Commandments",
    focus: "God speaks the Ten Commandments, revealing what life with Him and life with one another must look like.",
    watch: ["no other gods", "worship without idols", "honoring God's name", "Sabbath rest", "commands for family, neighbor, truth, and desire"],
    reflection: "Which command in Exodus 20 most clearly exposes what covenant faithfulness looks like in daily life?",
  },
  {
    chapter: 21,
    title: "Justice for Real Life",
    focus: "God begins applying covenant law to ordinary situations where power, injury, responsibility, and restitution matter.",
    watch: ["servants and limits on power", "protection for vulnerable people", "justice for violence", "responsibility for harm", "restitution instead of chaos"],
    reflection: "How does Exodus 21 show that God's holiness cares about practical justice?",
  },
  {
    chapter: 22,
    title: "Restitution and Mercy",
    focus: "God teaches Israel how to handle theft, damage, borrowing, vulnerability, worship, and mercy inside the covenant community.",
    watch: ["making wrongs right", "property and responsibility", "widows, orphans, and strangers", "false worship", "mercy with money and pledges"],
    reflection: "Where does Exodus 22 challenge you to care about both justice and mercy?",
  },
  {
    chapter: 23,
    title: "Truth, Sabbath, and Promise",
    focus: "God calls Israel to truthful justice, compassion, Sabbath rhythms, faithful worship, and trust as He promises to lead them forward.",
    watch: ["refusing false reports", "justice without favoritism", "Sabbath for land, servants, and animals", "three feasts", "the angel and the promised land"],
    reflection: "What does Exodus 23 teach you about building a community shaped by truth and worship?",
  },
  {
    chapter: 24,
    title: "The Covenant Confirmed",
    focus: "Israel confirms the covenant with blood, worship, a covenant meal, and Moses entering the cloud of God's glory.",
    watch: ["all the words of the Lord", "the blood of the covenant", "elders seeing God", "a covenant meal", "Moses entering the glory cloud"],
    reflection: "What does Exodus 24 teach you about covenant commitment, worship, and the seriousness of God's presence?",
  },
] as const;

function formatList(items: readonly string[], icons: readonly string[]) {
  return items.map((item, index) => `* ${icons[index % icons.length]} ${item}`).join("\n\n");
}

function buildIntro(detail: (typeof chapterDetails)[number]) {
  return `${detail.focus}

# 📍 Where This Chapter Begins

Exodus ${detail.chapter} belongs to **The Covenant at Sinai**, the Bible Study that moves from deliverance into covenant. Israel is out of Egypt, but now they must learn who the holy God is and how His people are called to live.

**The scene opens with:**

${formatList(detail.watch, ["⛰️", "🔥", "📜", "🩸", "🙏"])}

---

# 💡 Why This Chapter Matters

This chapter matters because Sinai shows that deliverance is not the end of the story. God rescues His people so they can belong to Him, worship Him, obey Him, and become a holy people in the world.

**This chapter gives us:**

* ⛰️ the mountain where God meets His people

* 🔥 holiness that cannot be treated casually

* 📜 covenant words that shape daily life

* ⚖️ justice for real people and real situations

* 🩸 covenant commitment before the Lord

---

# 🔎 What To Watch For

As you read Exodus ${detail.chapter}, pay attention to how God connects worship, obedience, justice, and His presence.

---

# 🎬 The Bigger Takeaway

> **${detail.focus}**

> **The God who delivers His people also teaches them how to live as His covenant people.**`;
}

const sinaiDays: SinaiDay[] = chapterDetails.map((detail, index) => ({
  day_number: index + 1,
  day_title: detail.title,
  bible_reading_book: "Exodus",
  bible_reading_chapter: detail.chapter,
  devotional_text: buildIntro(detail),
  reflection_question: detail.reflection,
}));

async function getOrCreateStudyId() {
  const { data: existing, error: existingError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Covenant at Sinai")
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing?.id) return existing.id as string;

  const { data: created, error: createError } = await supabase
    .from("devotionals")
    .insert({
      title: "The Covenant at Sinai",
      subtitle: "A 6-Chapter Journey",
      description:
        "A 6-chapter Bible study through Exodus 19-24. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so Mount Sinai, God's holiness, the Ten Commandments, covenant law, worship, blood, and Israel's covenant identity stay centered on Scripture.",
      total_days: sinaiDays.length,
    })
    .select("id")
    .single();

  if (createError) throw createError;
  if (!created?.id) throw new Error("Failed to create The Covenant at Sinai Bible Study.");
  return created.id as string;
}

async function main() {
  const devotionalId = await getOrCreateStudyId();

  const { error: updateError } = await supabase
    .from("devotionals")
    .update({
      subtitle: "A 6-Chapter Journey",
      description:
        "A 6-chapter Bible study through Exodus 19-24. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so Mount Sinai, God's holiness, the Ten Commandments, covenant law, worship, blood, and Israel's covenant identity stay centered on Scripture.",
      total_days: sinaiDays.length,
    })
    .eq("id", devotionalId);

  if (updateError) throw updateError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", sinaiDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of sinaiDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Sinai day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  const notesRows = sinaiDays.map((day) => {
    const notesText = EXODUS_DEEP_NOTES[day.bible_reading_chapter - 1];
    if (!notesText?.trim()) {
      throw new Error(`Missing Exodus ${day.bible_reading_chapter} notes.`);
    }

    return {
      book: "exodus",
      chapter: day.bible_reading_chapter,
      notes_text: notesText,
    };
  });

  const { error: notesError } = await supabase
    .from("bible_notes")
    .upsert(notesRows, { onConflict: "book,chapter" });

  if (notesError) throw notesError;

  console.log("Seeded The Covenant at Sinai and Exodus 19-24 notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
