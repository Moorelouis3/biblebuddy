// Script to seed "The Faith of Job" as a 42-chapter guided Bible study.
// Run with: npx tsx scripts/seed-faith-of-job.ts
console.log("Executing: scripts/seed-faith-of-job.ts");

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { parseSeriesNotesToHTML } from "../lib/seriesNotesHtml";
import { FAITH_OF_JOB_CHAPTERS, FAITH_OF_JOB_DEEP_NOTES } from "../lib/faithOfJobDeepNotes";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type JobDay = {
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

function buildJobIntro(chapter: number, title: string) {
  const isOpening = chapter <= 2;
  const isDialogue = chapter >= 3 && chapter <= 27;
  const isWisdom = chapter === 28;
  const isDefense = chapter >= 29 && chapter <= 31;
  const isElihu = chapter >= 32 && chapter <= 37;
  const isGodSpeaking = chapter >= 38 && chapter <= 41;
  const isEnding = chapter === 42;

  const beginsWith = isOpening
    ? [
        "Job being introduced as upright and God-fearing",
        "the accuser questioning Job's motives",
        "loss touching Job's family, possessions, and body",
        "grief becoming visible through ashes, silence, and mourning",
      ]
    : isGodSpeaking
      ? [
          "God answering Job from the storm",
          "creation becoming the classroom",
          "Job being asked questions instead of receiving a simple explanation",
          "human limits being exposed before divine wisdom",
        ]
      : isEnding
        ? [
            "Job answering God with humility",
            "the friends being corrected",
            "Job praying for the friends who wounded him",
            "restoration coming after encounter and repentance",
          ]
        : isElihu
          ? [
              "Elihu stepping into the conversation",
              "a younger voice challenging Job and the friends",
              "suffering being framed as instruction",
              "God's greatness being announced before the storm",
            ]
          : isDefense
            ? [
                "Job remembering his former honor",
                "Job describing present humiliation",
                "Job making a final integrity statement",
                "the courtroom tension reaching its peak",
              ]
            : isWisdom
              ? [
                  "human beings mining deep into the earth",
                  "wisdom being more valuable than gold",
                  "creation unable to produce wisdom by itself",
                  "the fear of the Lord being named as wisdom",
                ]
              : [
                  "Job and his friends continuing the debate",
                  "simple explanations being tested by real suffering",
                  "grief, justice, and wisdom colliding",
                  "Job refusing to pretend his pain makes sense",
                ];

  const matters = isOpening
    ? "This chapter matters because Job's suffering begins with integrity, not hidden rebellion."
    : isGodSpeaking
      ? "This chapter matters because God does not answer Job by shrinking the mystery. He answers by widening Job's view of creation, power, and wisdom."
      : isEnding
        ? "This chapter matters because the book ends with humility, correction, prayer, and restoration, but not with cheap answers."
        : isElihu
          ? "This chapter matters because a new voice enters the debate and prepares the reader for God's answer from the storm."
          : isDefense
            ? "This chapter matters because Job places his life, reputation, and integrity before God with nothing left to hide."
            : isWisdom
              ? "This chapter matters because it pauses the debate to ask where true wisdom can actually be found."
              : "This chapter matters because it shows how suffering can expose the limits of easy theology and force deeper honesty before God.";

  const watchFor = isGodSpeaking
    ? [
        "how God uses creation to humble Job",
        "why God's questions are not random",
        "how mystery becomes an invitation to trust",
        "how the chapter moves Job from argument toward awe",
      ]
    : isEnding
      ? [
          "what Job says after encountering God",
          "how God evaluates the friends' speeches",
          "why Job prays for the friends who hurt him",
          "how restoration comes without erasing the grief",
        ]
      : [
          "who is speaking and what they assume about suffering",
          "how the chapter talks about justice",
          "where pain becomes honest prayer",
          "where wisdom is true but incomplete",
          "how the chapter prepares us for God's final answer",
        ];

  const takeaway = isGodSpeaking
    ? "God's answer does not make Job smaller in a cruel way. It places Job's pain inside a creation much larger than his understanding."
    : isEnding
      ? "Restoration is real, but Job's deepest change comes from seeing God more truly."
      : isWisdom
        ? "Wisdom is not something humans dig up by control. Wisdom begins with the fear of the Lord."
        : "Faith can be honest about pain without letting pain become the final authority.";

  return `${isOpening ? "Job begins in the ashes of a question most people eventually face." : `Job ${chapter} keeps moving us through one of the Bible's most honest conversations about suffering.`}

This is not a quick devotional anymore.

This is a guided chapter journey through Job ${chapter}: ${title}.

Read the chapter slowly.

Listen for the pain.

Listen for the assumptions.

Listen for what is true, what is incomplete, and what still needs to be humbled before God.

---

# 🎬 Where This Chapter Begins

${formatIntroList(beginsWith, ["💔", "⚖️", "🧠", "🙏"])}

---

# 💡 Why This Chapter Matters

${matters}

---

# 🔎 What To Watch For

${formatIntroList(watchFor, ["👀", "📍", "🧠", "💬"])}

---

# 🎯 The Bigger Takeaway

> **${takeaway}**`;
}

const jobDays: JobDay[] = FAITH_OF_JOB_CHAPTERS.map((chapterMeta, index) => ({
  day_number: index + 1,
  day_title: chapterMeta.title,
  devotional_text: buildJobIntro(chapterMeta.chapter, chapterMeta.title),
  bible_reading_book: "Job",
  bible_reading_chapter: chapterMeta.chapter,
  reflection_question: `What stands out to you most in Job ${chapterMeta.chapter}, and what does it teach you about faith when suffering does not make sense?`,
}));

async function main() {
  console.log("Starting to seed 'The Faith of Job' as a chapter journey...");

  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Faith of Job")
    .maybeSingle();

  if (devotionalError) {
    console.error("Failed to fetch Job devotional:", devotionalError);
    process.exit(1);
  }

  let devotionalId = devotional?.id as string | undefined;

  const devotionalPayload = {
    title: "The Faith of Job",
    subtitle: "A 42-Chapter Journey",
    description:
      "A 42-chapter guided Bible study through Job 1-42. Each chapter follows the full Bible Buddy flow: intro, Bible reading, deep chapter notes, trivia, Scrambled, and reflection, so Job's suffering, wisdom, lament, friendship, and encounter with God stay centered on Scripture.",
    total_days: jobDays.length,
  };

  if (devotionalId) {
    const { error } = await supabase.from("devotionals").update(devotionalPayload).eq("id", devotionalId);
    if (error) {
      console.error("Failed to update Job devotional:", error);
      process.exit(1);
    }
  } else {
    const { data, error } = await supabase.from("devotionals").insert(devotionalPayload).select("id").single();
    if (error || !data?.id) {
      console.error("Failed to create Job devotional:", error);
      process.exit(1);
    }
    devotionalId = data.id;
  }

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", jobDays.length);

  if (deleteOldDaysError) {
    console.error("Failed to remove old Job extra days:", deleteOldDaysError);
    process.exit(1);
  }

  for (const day of jobDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) {
      console.error(`Failed to upsert Job chapter ${day.day_number}:`, error);
      process.exit(1);
    }
  }

  const weekRows = FAITH_OF_JOB_DEEP_NOTES.map((notesText, index) => ({
    series_key: "faith_of_job",
    week_number: index + 1,
    notes_text: notesText,
    notes_html: parseSeriesNotesToHTML(notesText),
  }));

  const { error: seriesNotesError } = await supabase
    .from("series_week_notes")
    .upsert(weekRows, { onConflict: "series_key,week_number" });

  if (seriesNotesError) {
    console.error("Failed to upsert Job series notes:", seriesNotesError);
    process.exit(1);
  }

  const bibleNoteRows = FAITH_OF_JOB_DEEP_NOTES.map((notesText, index) => ({
    book: "job",
    chapter: index + 1,
    notes_text: notesText,
  }));

  const { error: bibleNotesError } = await supabase
    .from("bible_notes")
    .upsert(bibleNoteRows, { onConflict: "book,chapter" });

  if (bibleNotesError) {
    console.error("Failed to upsert Job Bible notes:", bibleNotesError);
    process.exit(1);
  }

  console.log("Seeded The Faith of Job as a 42-chapter journey and updated Job 1-42 notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
