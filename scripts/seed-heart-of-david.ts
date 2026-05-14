// Script to seed "The Heart of David" as a 21-chapter guided Bible study.
// Run with: npx tsx scripts/seed-heart-of-david.ts
console.log("Executing: scripts/seed-heart-of-david.ts");

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { parseSeriesNotesToHTML } from "../lib/seriesNotesHtml";
import { HEART_OF_DAVID_CHAPTERS, HEART_OF_DAVID_DEEP_NOTES } from "../lib/heartOfDavidDeepNotes";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type DavidDay = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string;
};

function formatIntroList(items: string[], icons: string[]) {
  return items.map((item, index) => `* ${icons[index % icons.length]} ${item}`).join("\n\n");
}

function buildDavidIntro(day: number, title: string, book: string, chapter: number) {
  const isPsalm = book === "Psalms";
  const isSinOrRepentance =
    (book === "2 Samuel" && [11, 12].includes(chapter)) || (book === "Psalms" && chapter === 51);
  const isFugitive = book === "1 Samuel" && [19, 20, 21, 24, 25, 26].includes(chapter);
  const isKingship = book === "2 Samuel" && [2, 5, 6, 7, 15, 22].includes(chapter);

  const beginsWith = isPsalm
    ? [
        "David turning lived experience into prayer",
        "the inner world behind the public story",
        "worship, fear, confession, or trust being spoken honestly",
        "God meeting David in the language of song",
      ]
    : isSinOrRepentance
      ? [
          "power becoming dangerous",
          "hidden sin being exposed",
          "mercy and consequence standing together",
          "David learning that the heart still needs cleansing",
        ]
      : isFugitive
        ? [
            "David living between anointing and fulfillment",
            "Saul's jealousy becoming a threat",
            "friendship, fear, restraint, and wisdom shaping David",
            "the future king learning how not to seize power wrongly",
          ]
        : isKingship
          ? [
              "David stepping into public responsibility",
              "Jerusalem, worship, covenant, or family pain coming into view",
              "the throne testing David's dependence on God",
              "kingship revealing both strength and weakness",
            ]
          : [
              "David being formed in the hidden place",
              "God seeing beyond appearance",
              "courage being built before the crowd sees it",
              "David's heart beginning to show under pressure",
            ];

  const matters = isPsalm
    ? "This chapter matters because it lets us hear David's inner life, not only watch his public actions."
    : isSinOrRepentance
      ? "This chapter matters because David's story refuses to hide sin, cheapen mercy, or erase consequences."
      : isFugitive
        ? "This chapter matters because David is learning how to trust God while the promise is still delayed and dangerous."
        : isKingship
          ? "This chapter matters because David's public calling now tests the private heart God saw in the field."
          : "This chapter matters because David's story begins with God's choice, hidden formation, and courage that grows before applause.";

  const watchFor = [
    "what this chapter reveals about David's heart",
    "how God forms David through pressure",
    "where worship, courage, sin, repentance, or restraint appears",
    "how this scene points toward the larger covenant story",
  ];

  const takeaway = isPsalm
    ? "David teaches us to turn real life into honest prayer before God."
    : isSinOrRepentance
      ? "A heart after God is not a heart that never falls. It is a heart that returns when God confronts it."
      : isFugitive
        ? "Waiting on God's promise includes refusing shortcuts that would damage your soul."
        : isKingship
          ? "The throne does not remove David's need for dependence. It makes dependence even more important."
          : "God often forms the heart in private before He reveals the calling in public.";

  return `David's life is one of the most human stories in Scripture.

This is not a quick devotional anymore.

This is a guided chapter journey through ${book} ${chapter}: ${title}.

Read the chapter slowly.

Watch David's heart.

Watch what pressure reveals.

Watch where God forms him, corrects him, protects him, or calls him deeper.

---

# 🎬 Where This Chapter Begins

${formatIntroList(beginsWith, ["🐑", "👑", "💔", "🙏"])}

---

# 💡 Why This Chapter Matters

${matters}

---

# 🔎 What To Watch For

${formatIntroList(watchFor, ["👀", "📍", "🧠", "🔥"])}

---

# 🎯 The Bigger Takeaway

> **${takeaway}**`;
}

const davidDays: DavidDay[] = HEART_OF_DAVID_CHAPTERS.map((chapterMeta) => ({
  day_number: chapterMeta.day,
  day_title: chapterMeta.title,
  devotional_text: buildDavidIntro(
    chapterMeta.day,
    chapterMeta.title,
    chapterMeta.reading.book,
    chapterMeta.reading.chapter,
  ),
  bible_reading_book: chapterMeta.reading.book,
  bible_reading_chapter: chapterMeta.reading.chapter,
  reflection_question: chapterMeta.reflection,
}));

function normalizeBibleNoteBook(book: string) {
  return book.toLowerCase().trim();
}

async function main() {
  console.log("Starting to seed 'The Heart of David' as a chapter journey...");

  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Heart of David")
    .maybeSingle();

  if (devotionalError) {
    console.error("Failed to fetch David devotional:", devotionalError);
    process.exit(1);
  }

  let devotionalId = devotional?.id as string | undefined;

  const devotionalPayload = {
    title: "The Heart of David",
    subtitle: "A 21-Chapter Journey",
    description:
      "A 21-chapter guided Bible study through David's life across 1 Samuel, Psalms, 2 Samuel, and 1 Kings. Each chapter follows the full Bible Buddy flow: intro, Bible reading, deep chapter notes, trivia, Scrambled, and reflection, so David's shepherd heart, courage, worship, failure, repentance, and legacy stay centered on Scripture.",
    total_days: davidDays.length,
  };

  if (devotionalId) {
    const { error } = await supabase.from("devotionals").update(devotionalPayload).eq("id", devotionalId);
    if (error) {
      console.error("Failed to update David devotional:", error);
      process.exit(1);
    }
  } else {
    const { data, error } = await supabase.from("devotionals").insert(devotionalPayload).select("id").single();
    if (error || !data?.id) {
      console.error("Failed to create David devotional:", error);
      process.exit(1);
    }
    devotionalId = data.id;
  }

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", davidDays.length);

  if (deleteOldDaysError) {
    console.error("Failed to remove old David extra days:", deleteOldDaysError);
    process.exit(1);
  }

  for (const day of davidDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) {
      console.error(`Failed to upsert David chapter ${day.day_number}:`, error);
      process.exit(1);
    }
  }

  const weekRows = HEART_OF_DAVID_DEEP_NOTES.map((notesText, index) => ({
    series_key: "heart_of_david",
    week_number: index + 1,
    notes_text: notesText,
    notes_html: parseSeriesNotesToHTML(notesText),
  }));

  const { error: seriesNotesError } = await supabase
    .from("series_week_notes")
    .upsert(weekRows, { onConflict: "series_key,week_number" });

  if (seriesNotesError) {
    console.error("Failed to upsert David series notes:", seriesNotesError);
    process.exit(1);
  }

  const bibleNoteRows = HEART_OF_DAVID_DEEP_NOTES.map((notesText, index) => {
    const chapterMeta = HEART_OF_DAVID_CHAPTERS[index];
    return {
      book: normalizeBibleNoteBook(chapterMeta.reading.book),
      chapter: chapterMeta.reading.chapter,
      notes_text: notesText,
    };
  });

  const { error: bibleNotesError } = await supabase
    .from("bible_notes")
    .upsert(bibleNoteRows, { onConflict: "book,chapter" });

  if (bibleNotesError) {
    console.error("Failed to upsert David Bible notes:", bibleNotesError);
    process.exit(1);
  }

  console.log("Seeded The Heart of David as a 21-chapter journey and updated its chapter notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
