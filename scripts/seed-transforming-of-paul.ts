// Script to seed "The Transforming of Paul" as a 21-chapter guided Bible study.
// Run with: npx tsx scripts/seed-transforming-of-paul.ts
console.log("Executing: scripts/seed-transforming-of-paul.ts");

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { parseSeriesNotesToHTML } from "../lib/seriesNotesHtml";
import {
  TRANSFORMING_OF_PAUL_CHAPTERS,
  TRANSFORMING_OF_PAUL_DEEP_NOTES,
} from "../lib/transformingOfPaulDeepNotes";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type PaulDay = {
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

function buildPaulIntro(day: number, title: string, book: string, chapter: number) {
  const isEarlySaul = day <= 3;
  const isMission = book === "Acts" && chapter >= 13 && chapter <= 20;
  const isTrialOrPrison = book === "Acts" && chapter >= 21;
  const isLetter = book !== "Acts";

  const beginsWith = isEarlySaul
    ? [
        "Saul before he becomes Paul",
        "religious certainty aimed in the wrong direction",
        "Jesus interrupting a violent mission",
        "grace reaching someone who was actively resisting Christ",
      ]
    : isMission
      ? [
          "Paul carrying the gospel into cities and synagogues",
          "opposition rising alongside fruit",
          "Gentiles hearing the good news",
          "mission becoming costly but unstoppable",
        ]
      : isTrialOrPrison
        ? [
            "Paul under arrest, accusation, or threat",
            "testimony becoming part of his defense",
            "Roman systems becoming roads for the gospel",
            "Jesus strengthening Paul inside pressure",
          ]
        : isLetter
          ? [
              "Paul reflecting from deep ministry experience",
              "old confidence being counted differently",
              "faithfulness being measured by Christ",
              "the race of faith coming into focus",
            ]
          : [
              "Paul being received into real ministry",
              "the church discerning how to trust and send him",
              "grace becoming visible through community",
              "calling taking shape over time",
            ];

  const matters = isEarlySaul
    ? "This chapter matters because Paul's transformation only makes sense when we feel how far Saul had to be turned."
    : isMission
      ? "This chapter matters because Paul's changed life is now producing gospel movement in hard places."
      : isTrialOrPrison
        ? "This chapter matters because Paul keeps bearing witness even when his freedom is restricted."
        : isLetter
          ? "This chapter matters because Paul interprets his whole life through Christ, not through his old status."
          : "This chapter matters because transformation becomes something the church has to recognize, test, and support.";

  const watchFor = [
    "how Jesus redirects Saul's old zeal",
    "how Paul handles pressure",
    "where grace becomes the main point",
    "how suffering and mission stay connected",
  ];

  const takeaway = isEarlySaul
    ? "Jesus does not only correct Saul. He remakes him."
    : isMission
      ? "A transformed life becomes a sent life."
      : isTrialOrPrison
        ? "Chains can restrict movement, but they cannot restrict the gospel."
        : isLetter
          ? "The worth of Christ changes what Paul counts as gain."
          : "God often rebuilds a changed life through community, trust, and patient obedience.";

  return `Paul's story begins before he is Paul.

This is not a quick devotional anymore.

This is a guided chapter journey through ${book} ${chapter}: ${title}.

Read the chapter slowly.

Watch Saul.

Watch Paul.

Watch what Jesus changes.

And watch how grace turns a former enemy into a servant of the gospel.

---

# 🎬 Where This Chapter Begins

${formatIntroList(beginsWith, ["🔥", "👀", "🧭", "✝️"])}

---

# 💡 Why This Chapter Matters

${matters}

---

# 🔎 What To Watch For

${formatIntroList(watchFor, ["👀", "📍", "🧠", "⛓️"])}

---

# 🎯 The Bigger Takeaway

> **${takeaway}**`;
}

const paulDays: PaulDay[] = TRANSFORMING_OF_PAUL_CHAPTERS.map((chapterMeta) => ({
  day_number: chapterMeta.day,
  day_title: chapterMeta.title,
  devotional_text: buildPaulIntro(
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
  console.log("Starting to seed 'The Transforming of Paul' as a chapter journey...");

  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Transforming of Paul")
    .maybeSingle();

  if (devotionalError) {
    console.error("Failed to fetch Paul devotional:", devotionalError);
    process.exit(1);
  }

  let devotionalId = devotional?.id as string | undefined;

  const devotionalPayload = {
    title: "The Transforming of Paul",
    subtitle: "A 21-Chapter Journey",
    description:
      "A 21-chapter guided Bible study through Saul's transformation into Paul across Acts, Philippians, and 2 Timothy. Each chapter follows the full Bible Buddy flow: intro, Bible reading, deep chapter notes, trivia, Scrambled, and reflection, so Paul's conversion, mission, suffering, grace, and final faithfulness stay centered on Scripture.",
    total_days: paulDays.length,
  };

  if (devotionalId) {
    const { error } = await supabase.from("devotionals").update(devotionalPayload).eq("id", devotionalId);
    if (error) {
      console.error("Failed to update Paul devotional:", error);
      process.exit(1);
    }
  } else {
    const { data, error } = await supabase.from("devotionals").insert(devotionalPayload).select("id").single();
    if (error || !data?.id) {
      console.error("Failed to create Paul devotional:", error);
      process.exit(1);
    }
    devotionalId = data.id;
  }

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", paulDays.length);

  if (deleteOldDaysError) {
    console.error("Failed to remove old Paul extra days:", deleteOldDaysError);
    process.exit(1);
  }

  for (const day of paulDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) {
      console.error(`Failed to upsert Paul chapter ${day.day_number}:`, error);
      process.exit(1);
    }
  }

  const weekRows = TRANSFORMING_OF_PAUL_DEEP_NOTES.map((notesText, index) => ({
    series_key: "transforming_of_paul",
    week_number: index + 1,
    notes_text: notesText,
    notes_html: parseSeriesNotesToHTML(notesText),
  }));

  const { error: seriesNotesError } = await supabase
    .from("series_week_notes")
    .upsert(weekRows, { onConflict: "series_key,week_number" });

  if (seriesNotesError) {
    console.error("Failed to upsert Paul series notes:", seriesNotesError);
    process.exit(1);
  }

  const bibleNoteRows = TRANSFORMING_OF_PAUL_DEEP_NOTES.map((notesText, index) => {
    const chapterMeta = TRANSFORMING_OF_PAUL_CHAPTERS[index];
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
    console.error("Failed to upsert Paul Bible notes:", bibleNotesError);
    process.exit(1);
  }

  console.log("Seeded The Transforming of Paul as a 21-chapter journey and updated its chapter notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
