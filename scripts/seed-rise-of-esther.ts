// Script to seed "The Rise of Esther" as a 10-chapter guided Bible study.
// Run with: npx tsx scripts/seed-rise-of-esther.ts
console.log("Executing: scripts/seed-rise-of-esther.ts");

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { parseSeriesNotesToHTML } from "../lib/seriesNotesHtml";
import { RISE_OF_ESTHER_CHAPTERS, RISE_OF_ESTHER_DEEP_NOTES } from "../lib/riseOfEstherDeepNotes";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type EstherDay = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string;
};

const ESTHER_INTROS: Record<number, {
  opening: string;
  beginsWith: string[];
  matters: string;
  watchFor: string[];
  takeaway: string;
  reflection: string;
}> = {
  1: {
    opening:
      "Esther 1 opens before Esther ever appears. The palace is loud with wealth, wine, and pride, but underneath all the royal beauty is a fragile kind of power.",
    beginsWith: [
      "King Ahasuerus displaying the riches of Persia",
      "Vashti refusing the king's command",
      "royal advisors turning embarrassment into empire policy",
      "the queen's place being opened before Esther is introduced",
    ],
    matters:
      "This chapter matters because God starts setting the stage before Esther knows she has a role. The empty throne beside the king is not random. It is providence moving through messy palace politics.",
    watchFor: [
      "how much the empire cares about public image",
      "how quickly pride becomes policy",
      "how a vacancy opens before the calling becomes visible",
      "how God can work even through scenes that do not look spiritual",
    ],
    takeaway:
      "Sometimes God prepares tomorrow's assignment through today's disruption. Esther 1 reminds us that providence can be working before the person God will use has even entered the room.",
    reflection: "Where might God be preparing space for something in your life before you can fully see what He is doing?",
  },
  2: {
    opening:
      "Esther 2 introduces Esther as an orphan in exile, raised by Mordecai and pulled into the Persian palace system.",
    beginsWith: [
      "the search for a new queen",
      "Esther's hidden Jewish identity",
      "Mordecai's faithful care and watchfulness",
      "Esther finding favor and being crowned queen",
      "Mordecai uncovering a plot that is recorded but not rewarded yet",
    ],
    matters:
      "This chapter matters because Esther's rise begins in vulnerability. She is favored, but she is not fully safe. She is crowned, but still hidden.",
    watchFor: [
      "how orphanhood and exile shape Esther's story",
      "how favor does not erase pressure",
      "how hidden faithfulness gets recorded for later",
      "how God positions people before the crisis is visible",
    ],
    takeaway:
      "Favor is not always comfort. Sometimes favor is placement. Esther 2 shows God quietly placing Esther where courage will later be required.",
    reflection: "Where do you feel both favored and vulnerable at the same time?",
  },
  3: {
    opening:
      "Esther 3 is where the story turns dark. Haman rises, Mordecai refuses to bow, and one man's pride becomes a death sentence for an entire people.",
    beginsWith: [
      "Haman being promoted above the other officials",
      "Mordecai refusing to bow",
      "Haman's anger expanding into hatred for all Jews",
      "the casting of Pur to choose a date",
      "a royal decree ordering destruction",
    ],
    matters:
      "This chapter matters because hatred receives legal power. Esther's hidden identity is now tied to the survival of her people.",
    watchFor: [
      "how pride turns personal offense into public harm",
      "how Haman tries to control the calendar through lots",
      "how the decree creates fear across the empire",
      "how Esther is not named in the chapter but is already involved",
    ],
    takeaway:
      "Human threats can look official, organized, and final. Esther 3 reminds us that even when evil gets a date on the calendar, God still rules over the story.",
    reflection: "Where do you need to remember that what looks final to people is still not final to God?",
  },
  4: {
    opening:
      "Esther 4 is the heart of the whole book. Grief fills the streets, the truth reaches the palace, and Esther must decide what to do with the place she has been given.",
    beginsWith: [
      "Mordecai tearing his clothes and wearing sackcloth",
      "Esther learning the full danger facing her people",
      "the risk of entering the king's inner court unsummoned",
      "Mordecai's challenge about such a time as this",
      "Esther calling for a fast and choosing courage",
    ],
    matters:
      "This chapter matters because Esther's crown becomes responsibility. She can stay silent, or she can risk her life for her people.",
    watchFor: [
      "how grief moves from the gate to the palace",
      "how fear and faith are both present",
      "how Mordecai believes deliverance will come",
      "how Esther's courage is rooted in fasting, not self-confidence",
    ],
    takeaway:
      "Courage is not the absence of fear. Esther 4 shows courage as obedience becoming stronger than self-protection.",
    reflection: "What step of obedience feels risky enough that part of you wants to stay silent?",
  },
  5: {
    opening:
      "Esther 5 shows Esther walking into danger with both courage and wisdom. She does not rush, panic, or waste the moment.",
    beginsWith: [
      "Esther putting on royal robes",
      "the king extending the golden scepter",
      "Esther inviting the king and Haman to a banquet",
      "Haman leaving proud and furious",
      "the gallows being built for Mordecai",
    ],
    matters:
      "This chapter matters because courage becomes strategy. Esther is brave enough to enter and wise enough to wait.",
    watchFor: [
      "how Esther's clothing signals action",
      "how the scepter means life where death was possible",
      "how Haman's pride cannot enjoy blessing while Mordecai stands",
      "how the gallows create the setup for reversal",
    ],
    takeaway:
      "Wise courage does not always speak immediately. Sometimes faith looks like entering the room, then waiting for the right moment.",
    reflection: "Where do you need courage and wisdom to work together instead of rushing out of fear?",
  },
  6: {
    opening:
      "Esther 6 is the night everything starts turning. The king cannot sleep, old records are read, and Haman is forced to honor the man he hates.",
    beginsWith: [
      "a sleepless king",
      "Mordecai's forgotten loyalty being discovered",
      "Haman assuming royal honor must be for him",
      "Mordecai being paraded through the city",
      "Haman's household sensing his downfall",
    ],
    matters:
      "This chapter matters because providence becomes almost impossible to miss. God turns the story through timing no human character could arrange.",
    watchFor: [
      "how a small detail changes the whole story",
      "how forgotten faithfulness is remembered",
      "how pride blinds Haman",
      "how reversal begins before Esther speaks at the banquet",
    ],
    takeaway:
      "God does not need loud tools to turn a story. He can use a sleepless night, an old record, and perfect timing.",
    reflection: "Where have you seen God begin turning something through timing you could not have arranged?",
  },
  7: {
    opening:
      "Esther 7 is the banquet where truth finally speaks. Esther names the danger, reveals her identity, and exposes Haman.",
    beginsWith: [
      "the king asking Esther for her request",
      "Esther pleading for her life and her people",
      "Haman being named as the enemy",
      "the king's wrath rising",
      "Haman dying on the gallows he built for Mordecai",
    ],
    matters:
      "This chapter matters because Esther's silence ends. She uses her voice when the right moment comes.",
    watchFor: [
      "how Esther connects her life to her people",
      "how truth exposes hidden evil",
      "how the gallows reverse",
      "how justice lands suddenly after long tension",
    ],
    takeaway:
      "There is a time to wait, and there is a time to speak clearly. Esther 7 shows courage becoming a voice.",
    reflection: "When the right moment comes, are you willing to speak clearly instead of hoping things fix themselves?",
  },
  8: {
    opening:
      "Esther 8 shows that one victory does not finish the work. Haman is gone, but the deadly decree still has to be answered.",
    beginsWith: [
      "Haman's house being given to Esther",
      "Mordecai receiving the king's signet ring",
      "Esther pleading again for her people",
      "a new decree authorizing the Jews to defend themselves",
      "joy spreading through the provinces",
    ],
    matters:
      "This chapter matters because Esther keeps interceding until rescue is actually opened. Courage becomes persistence.",
    watchFor: [
      "how authority changes hands",
      "why the first decree cannot simply be erased",
      "how Esther's tears show continued urgency",
      "how the new decree changes fear into hope",
    ],
    takeaway:
      "Real love keeps showing up until people are actually helped. Esther 8 teaches persistence after the first breakthrough.",
    reflection: "Where do you need to keep showing up until the work is truly done?",
  },
  9: {
    opening:
      "Esther 9 is the appointed day of reversal. The date chosen for Jewish destruction becomes the day of Jewish deliverance.",
    beginsWith: [
      "the day turning opposite from what the enemies expected",
      "the Jews defending themselves",
      "the repeated refusal to take plunder",
      "Purim being established",
      "future generations being called to remember",
    ],
    matters:
      "This chapter matters because deliverance becomes memory. Purim teaches the people not to forget what God did.",
    watchFor: [
      "how the calendar itself gets reversed",
      "how defense is separated from greed",
      "why Purim is named after the lot Haman cast",
      "how remembrance becomes part of faith",
    ],
    takeaway:
      "When God delivers, His people should remember. Esther 9 turns survival into testimony.",
    reflection: "What has God brought you through that needs to become remembered gratitude instead of a rushed-past memory?",
  },
  10: {
    opening:
      "Esther 10 closes quietly, but it matters. Mordecai stands in influence and uses his position for the welfare and peace of his people.",
    beginsWith: [
      "the king's acts being recorded",
      "Mordecai's greatness being remembered",
      "Mordecai standing second to the king",
      "leadership being defined by welfare and peace",
    ],
    matters:
      "This chapter matters because it shows what influence is for. Mordecai's greatness is connected to serving people, not feeding ego.",
    watchFor: [
      "how the ending is short but meaningful",
      "how Mordecai's position echoes Joseph in Egypt",
      "how peace becomes the final leadership note",
      "how Esther's courage leaves a legacy even when she is not named in the final verse",
    ],
    takeaway:
      "Godly influence is measured by whether people are safer, stronger, and more at peace because you held it.",
    reflection: "If God gives you influence, how can you use it for the good and peace of the people around you?",
  },
};

function formatIntroList(items: string[], icons: string[]) {
  return items.map((item, index) => `* ${icons[index % icons.length]} ${item}`).join("\n\n");
}

function buildEstherIntro(chapter: number) {
  const detail = ESTHER_INTROS[chapter];

  return `${detail.opening}

This is not a random devotional day anymore.

This is a guided chapter journey through Esther ${chapter}.

Read the chapter slowly.

Watch the people.

Watch the power.

Watch the timing.

And especially watch how God can be present even when His name is hidden.

---

# 🎬 Where This Chapter Begins

${formatIntroList(detail.beginsWith, ["🏛️", "👀", "⚠️", "🧭", "🔥"])}

---

# 💡 Why This Chapter Matters

${detail.matters}

---

# 🔎 What To Watch For

${formatIntroList(detail.watchFor, ["👀", "📍", "🧠", "🔥"])}

---

# 🎯 The Bigger Takeaway

> **${detail.takeaway}**`;
}

const estherDays: EstherDay[] = RISE_OF_ESTHER_CHAPTERS.map((chapterMeta, index) => {
  const detail = ESTHER_INTROS[chapterMeta.chapter];

  return {
    day_number: index + 1,
    day_title: chapterMeta.title,
    devotional_text: buildEstherIntro(chapterMeta.chapter),
    bible_reading_book: "Esther",
    bible_reading_chapter: chapterMeta.chapter,
    reflection_question: detail.reflection,
  };
});

async function main() {
  console.log("Starting to seed 'The Rise of Esther' as a chapter journey...");

  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Rise of Esther")
    .maybeSingle();

  if (devotionalError) {
    console.error("Failed to fetch Esther devotional:", devotionalError);
    process.exit(1);
  }

  let devotionalId = devotional?.id as string | undefined;

  const devotionalPayload = {
    title: "The Rise of Esther",
    subtitle: "A 10-Chapter Journey",
    description:
      "A 10-chapter guided Bible study through Esther 1-10. Each chapter follows the full Bible Buddy flow: intro, Bible reading, deep chapter notes, trivia, Scrambled, and reflection, so Esther's courage, timing, hidden identity, and God's providence stay centered on Scripture.",
    total_days: estherDays.length,
  };

  if (devotionalId) {
    const { error } = await supabase.from("devotionals").update(devotionalPayload).eq("id", devotionalId);
    if (error) {
      console.error("Failed to update Esther devotional:", error);
      process.exit(1);
    }
  } else {
    const { data, error } = await supabase.from("devotionals").insert(devotionalPayload).select("id").single();
    if (error || !data?.id) {
      console.error("Failed to create Esther devotional:", error);
      process.exit(1);
    }
    devotionalId = data.id;
  }

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", estherDays.length);

  if (deleteOldDaysError) {
    console.error("Failed to remove old Esther extra days:", deleteOldDaysError);
    process.exit(1);
  }

  for (const day of estherDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) {
      console.error(`Failed to upsert Esther chapter ${day.day_number}:`, error);
      process.exit(1);
    }
  }

  const weekRows = RISE_OF_ESTHER_DEEP_NOTES.map((notesText, index) => ({
    series_key: "rise_of_esther",
    week_number: index + 1,
    notes_text: notesText,
    notes_html: parseSeriesNotesToHTML(notesText),
  }));

  const { error: seriesNotesError } = await supabase
    .from("series_week_notes")
    .upsert(weekRows, { onConflict: "series_key,week_number" });

  if (seriesNotesError) {
    console.error("Failed to upsert Esther series notes:", seriesNotesError);
    process.exit(1);
  }

  const bibleNoteRows = RISE_OF_ESTHER_DEEP_NOTES.map((notesText, index) => ({
    book: "esther",
    chapter: index + 1,
    notes_text: notesText,
  }));

  const { error: bibleNotesError } = await supabase
    .from("bible_notes")
    .upsert(bibleNoteRows, { onConflict: "book,chapter" });

  if (bibleNotesError) {
    console.error("Failed to upsert Esther Bible notes:", bibleNotesError);
    process.exit(1);
  }

  console.log("Seeded The Rise of Esther as a 10-chapter journey and updated Esther 1-10 notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
