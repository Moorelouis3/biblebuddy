// Script to seed "The Courage of Daniel" as a 12-chapter guided Bible study.
// Run with: npx tsx scripts/seed-courage-of-daniel.ts
console.log("Executing: scripts/seed-courage-of-daniel.ts");

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { parseSeriesNotesToHTML } from "../lib/seriesNotesHtml";
import { COURAGE_OF_DANIEL_CHAPTERS, COURAGE_OF_DANIEL_DEEP_NOTES } from "../lib/courageOfDanielDeepNotes";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type DanielDay = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string;
};

const DANIEL_INTROS: Record<number, {
  opening: string;
  beginsWith: string[];
  matters: string;
  watchFor: string[];
  takeaway: string;
  reflection: string;
}> = {
  1: {
    opening:
      "Daniel 1 begins with exile, loss, pressure, and a quiet decision to stay loyal to God inside Babylon.",
    beginsWith: [
      "Jerusalem being conquered",
      "temple vessels being carried into Babylon",
      "young men from Judah being trained in Babylon's system",
      "Daniel being renamed",
      "Daniel resolving not to defile himself",
    ],
    matters:
      "This chapter matters because Daniel's first battle is identity. Before lions, visions, or kings, Daniel has to decide who owns his heart.",
    watchFor: [
      "how Babylon tries to reshape Daniel",
      "why food becomes a loyalty issue",
      "how quiet courage starts before public courage",
      "how God gives wisdom in a foreign court",
    ],
    takeaway:
      "Courage often begins as quiet faithfulness before it becomes public drama.",
    reflection: "Where is God asking you to stay loyal in a place where compromise would be easier?",
  },
  2: {
    opening:
      "Daniel 2 puts Daniel under impossible pressure when Nebuchadnezzar demands both the dream and its interpretation.",
    beginsWith: [
      "a troubled king",
      "wise men admitting their limits",
      "a death decree",
      "Daniel asking friends to pray",
      "God revealing the mystery",
    ],
    matters:
      "This chapter matters because Daniel shows that wisdom under pressure starts with prayer and dependence on God.",
    watchFor: [
      "how human wisdom reaches its limit",
      "how Daniel gathers friends before God",
      "how the statue shows kingdoms rising and falling",
      "how God's kingdom is the only kingdom that lasts",
    ],
    takeaway:
      "When pressure becomes impossible, prayer is not weakness. It is the doorway to wisdom.",
    reflection: "When pressure hits, is your first instinct control or prayer?",
  },
  3: {
    opening:
      "Daniel 3 shows the courage of Daniel's companions when Babylon demands worship and threatens fire.",
    beginsWith: [
      "a golden image",
      "music signaling worship",
      "three men refusing to bow",
      "a furnace heated seven times hotter",
      "a fourth figure in the fire",
    ],
    matters:
      "This chapter matters because it shows loyalty that does not depend on guaranteed rescue.",
    watchFor: [
      "how worship and empire collide",
      "what even-if-not faith sounds like",
      "how God meets His people in the fire",
      "how public pressure tests private conviction",
    ],
    takeaway:
      "Real faith says God is able, but even if He does not, He is still worthy.",
    reflection: "Would your loyalty to God still stand if obedience became costly in front of everyone?",
  },
  4: {
    opening:
      "Daniel 4 is the story of a proud king being humbled until he learns that heaven rules.",
    beginsWith: [
      "Nebuchadnezzar's tree dream",
      "Daniel's troubled interpretation",
      "a warning to repent",
      "the king boasting over Babylon",
      "the king being brought low like a beast",
    ],
    matters:
      "This chapter matters because it shows God confronting pride at the highest level of power.",
    watchFor: [
      "how greatness becomes dangerous when it forgets God",
      "how Daniel tells hard truth with concern",
      "how pride dehumanizes Nebuchadnezzar",
      "how mercy restores understanding",
    ],
    takeaway:
      "No throne is too high for God to humble, and no proud heart is safe from His mercy and correction.",
    reflection: "Where do you need to remember that heaven rules over what looks untouchable?",
  },
  5: {
    opening:
      "Daniel 5 is a feast that turns into judgment when Belshazzar uses holy vessels like party cups.",
    beginsWith: [
      "a proud royal feast",
      "temple vessels being profaned",
      "a hand writing on the wall",
      "Daniel refusing the king's gifts",
      "Babylon falling that night",
    ],
    matters:
      "This chapter matters because Belshazzar knows the lesson of Nebuchadnezzar and refuses to humble himself.",
    watchFor: [
      "how sacred things are mocked",
      "how quickly arrogance turns into terror",
      "how Daniel stays steady in a panicked room",
      "what numbered, weighed, and divided means",
    ],
    takeaway:
      "Do not confuse delay with escape. Pride can party right beside judgment and not realize the night is almost over.",
    reflection: "Are there lessons God has already shown you that you still need to humble yourself under?",
  },
  6: {
    opening:
      "Daniel 6 is famous for the lions, but the real center is Daniel's prayer life.",
    beginsWith: [
      "Daniel's excellent spirit",
      "jealous officials searching for fault",
      "a decree against prayer",
      "Daniel praying as he had done before",
      "God shutting the lions' mouths",
    ],
    matters:
      "This chapter matters because Daniel does not become faithful in the crisis. The crisis reveals the faithful rhythm he already had.",
    watchFor: [
      "how integrity makes Daniel both useful and targeted",
      "how his enemies weaponize his devotion",
      "why he prays toward Jerusalem",
      "how morning brings deliverance",
    ],
    takeaway:
      "Your crisis habits usually come from your normal habits. Daniel's public courage was built by private prayer.",
    reflection: "What rhythms of loyalty are you building now that would still hold if pressure came tomorrow?",
  },
  7: {
    opening:
      "Daniel 7 shifts from court stories to vision. Daniel sees beastly kingdoms, heaven's throne, and one like a Son of Man.",
    beginsWith: [
      "four beasts rising from the sea",
      "the Ancient of Days sitting in judgment",
      "books being opened",
      "the Son of Man receiving dominion",
      "the saints receiving the kingdom",
    ],
    matters:
      "This chapter matters because it shows that beastly power is real, but it is not final.",
    watchFor: [
      "how the beasts picture violent empires",
      "how heaven's court outranks earthly courts",
      "why Son of Man matters for Jesus",
      "how everlasting dominion changes courage",
    ],
    takeaway:
      "The future does not belong to the beasts. It belongs to God's appointed King.",
    reflection: "What earthly power feels huge to you, and how does God's throne change your fear?",
  },
  8: {
    opening:
      "Daniel 8 gives Daniel a heavy vision of the ram, the goat, broken horns, and future pressure against worship.",
    beginsWith: [
      "a ram with two horns",
      "a goat coming from the west",
      "a great horn breaking",
      "Gabriel explaining the vision",
      "Daniel becoming sick from what he saw",
    ],
    matters:
      "This chapter matters because seeing clearly can be heavy, but God still sets limits over history.",
    watchFor: [
      "how kingdom power rises and breaks",
      "how worship becomes a target",
      "how Gabriel helps Daniel understand",
      "how Daniel is physically affected by revelation",
    ],
    takeaway:
      "Spiritual maturity does not mean hard truth stops affecting you. It means you keep serving faithfully while carrying it.",
    reflection: "Can you stay open to God's truth even when it feels heavy instead of easy?",
  },
  9: {
    opening:
      "Daniel 9 shows Daniel reading Jeremiah and turning Scripture into confession, fasting, and prayer.",
    beginsWith: [
      "Daniel studying Jeremiah",
      "prayer with fasting, sackcloth, and ashes",
      "confession for the sins of Israel",
      "Gabriel arriving while Daniel prays",
      "the prophecy of seventy weeks",
    ],
    matters:
      "This chapter matters because Daniel responds to prophecy with prayer, not passive curiosity.",
    watchFor: [
      "how Scripture moves Daniel to seek God",
      "how Daniel says we have sinned",
      "how mercy is the ground of his appeal",
      "how Gabriel's answer reaches toward Messiah",
    ],
    takeaway:
      "The word of God should not only inform you. It should pull you into prayer.",
    reflection: "When Scripture opens your eyes, does it move you toward deeper prayer and repentance?",
  },
  10: {
    opening:
      "Daniel 10 pulls back the curtain and shows that delayed answers can involve unseen spiritual conflict.",
    beginsWith: [
      "Daniel mourning three weeks",
      "a glorious messenger by the river",
      "Daniel losing strength",
      "the prince of Persia resisting",
      "Michael coming to help",
    ],
    matters:
      "This chapter matters because Daniel is told his words were heard from the first day.",
    watchFor: [
      "how prayer and unseen battle connect",
      "how heavenly glory overwhelms Daniel",
      "how God strengthens Daniel to receive more",
      "why delay is not the same as abandonment",
    ],
    takeaway:
      "Delay is not proof that heaven is silent. God may be moving in ways you cannot see yet.",
    reflection: "How would your prayer life change if you believed heaven heard you from the first day?",
  },
  11: {
    opening:
      "Daniel 11 is dense because broken history is dense. Kings rise, fight, flatter, betray, and fall.",
    beginsWith: [
      "Persian kings",
      "a mighty kingdom divided",
      "kings of the north and south",
      "covenant people under pressure",
      "the wise instructing many",
    ],
    matters:
      "This chapter matters because courage cannot be based on pretending the future will be easy.",
    watchFor: [
      "how power keeps shifting",
      "how flattery corrupts",
      "how the covenant is attacked",
      "how the wise stay useful under pressure",
    ],
    takeaway:
      "God's people do not need soft illusions. They need clear-eyed trust in God's rule over hard realities.",
    reflection: "Are you trying to be brave by denying reality or by trusting God over reality?",
  },
  12: {
    opening:
      "Daniel 12 closes the book with trouble, deliverance, resurrection, wisdom, waiting, and rest.",
    beginsWith: [
      "Michael standing for Daniel's people",
      "deliverance for those written in the book",
      "resurrection from the dust",
      "the wise shining like stars",
      "Daniel being told to go his way and rest",
    ],
    matters:
      "This chapter matters because Daniel's courage is anchored beyond this life.",
    watchFor: [
      "how resurrection changes the meaning of courage",
      "how Daniel admits limited understanding",
      "how waiting remains part of faith",
      "how God gives Daniel personal hope at the end",
    ],
    takeaway:
      "Daniel can go his way because God holds the end. Resurrection and final rest are stronger than exile.",
    reflection: "What changes in your daily courage when you remember that resurrection and eternal life are real?",
  },
};

function formatIntroList(items: string[], icons: string[]) {
  return items.map((item, index) => `* ${icons[index % icons.length]} ${item}`).join("\n\n");
}

function buildDanielIntro(chapter: number) {
  const detail = DANIEL_INTROS[chapter];

  return `${detail.opening}

This is not a random devotional day anymore.

This is a guided chapter journey through Daniel ${chapter}.

Read the chapter slowly.

Watch the empire.

Watch the pressure.

Watch Daniel's habits.

And watch how the God of heaven keeps ruling when earthly kingdoms look loud.

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

const danielDays: DanielDay[] = COURAGE_OF_DANIEL_CHAPTERS.map((chapterMeta, index) => {
  const detail = DANIEL_INTROS[chapterMeta.chapter];

  return {
    day_number: index + 1,
    day_title: chapterMeta.title,
    devotional_text: buildDanielIntro(chapterMeta.chapter),
    bible_reading_book: "Daniel",
    bible_reading_chapter: chapterMeta.chapter,
    reflection_question: detail.reflection,
  };
});

async function main() {
  console.log("Starting to seed 'The Courage of Daniel' as a chapter journey...");

  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Courage of Daniel")
    .maybeSingle();

  if (devotionalError) {
    console.error("Failed to fetch Daniel devotional:", devotionalError);
    process.exit(1);
  }

  let devotionalId = devotional?.id as string | undefined;

  const devotionalPayload = {
    title: "The Courage of Daniel",
    subtitle: "A 12-Chapter Journey",
    description:
      "A 12-chapter guided Bible study through Daniel 1-12. Each chapter follows the full Bible Buddy flow: intro, Bible reading, deep chapter notes, trivia, Scrambled, and reflection, so Daniel's exile faith, prayer, wisdom, visions, and courage stay centered on Scripture.",
    total_days: danielDays.length,
  };

  if (devotionalId) {
    const { error } = await supabase.from("devotionals").update(devotionalPayload).eq("id", devotionalId);
    if (error) {
      console.error("Failed to update Daniel devotional:", error);
      process.exit(1);
    }
  } else {
    const { data, error } = await supabase.from("devotionals").insert(devotionalPayload).select("id").single();
    if (error || !data?.id) {
      console.error("Failed to create Daniel devotional:", error);
      process.exit(1);
    }
    devotionalId = data.id;
  }

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", danielDays.length);

  if (deleteOldDaysError) {
    console.error("Failed to remove old Daniel extra days:", deleteOldDaysError);
    process.exit(1);
  }

  for (const day of danielDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) {
      console.error(`Failed to upsert Daniel chapter ${day.day_number}:`, error);
      process.exit(1);
    }
  }

  const weekRows = COURAGE_OF_DANIEL_DEEP_NOTES.map((notesText, index) => ({
    series_key: "courage_of_daniel",
    week_number: index + 1,
    notes_text: notesText,
    notes_html: parseSeriesNotesToHTML(notesText),
  }));

  const { error: seriesNotesError } = await supabase
    .from("series_week_notes")
    .upsert(weekRows, { onConflict: "series_key,week_number" });

  if (seriesNotesError) {
    console.error("Failed to upsert Daniel series notes:", seriesNotesError);
    process.exit(1);
  }

  const bibleNoteRows = COURAGE_OF_DANIEL_DEEP_NOTES.map((notesText, index) => ({
    book: "daniel",
    chapter: index + 1,
    notes_text: notesText,
  }));

  const { error: bibleNotesError } = await supabase
    .from("bible_notes")
    .upsert(bibleNoteRows, { onConflict: "book,chapter" });

  if (bibleNotesError) {
    console.error("Failed to upsert Daniel Bible notes:", bibleNotesError);
    process.exit(1);
  }

  console.log("Seeded The Courage of Daniel as a 12-chapter journey and updated Daniel 1-12 notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
