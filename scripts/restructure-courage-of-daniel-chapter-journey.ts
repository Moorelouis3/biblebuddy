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

type DanielDay = {
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

const beginsWithIcons = ["🎬", "🏛️", "🔥", "🙏", "🧭"];
const watchForIcons = ["👀", "⚖️", "📜", "🔥", "🧠"];

const danielChapterDays: DanielDay[] = [
  {
    chapter: 1,
    title: "Faithfulness in a New World",
    reflection: "Where is God asking you to stay loyal when the culture around you wants to rename, retrain, or reshape you?",
    opening:
      "Daniel 1 opens with loss, exile, and identity pressure. Jerusalem has been invaded, young men from Judah are taken into Babylon, and Daniel has to learn how to live faithfully in a world trying to rewrite him.",
    beginsWith: [
      "Nebuchadnezzar taking Jerusalem's vessels into Babylon",
      "Daniel and his friends being selected for palace training",
      "new language, new food, new names, and new pressure",
      "Daniel resolving not to defile himself",
      "God giving favor, wisdom, and understanding",
    ],
    matters:
      "This chapter matters because Daniel's courage begins before anything dramatic happens. His first test is not a lions' den. It is identity, appetite, discipline, and quiet obedience inside Babylon's system.",
    watchFor: [
      "how Babylon tries to reshape Daniel's mind and identity",
      "how Daniel draws a wise line without acting arrogant",
      "how God gives favor inside a hostile environment",
      "how small obedience prepares Daniel for bigger tests later",
    ],
    takeaway:
      "Daniel 1 teaches that courage often begins quietly. Before Daniel stands before kings, he purposes in his heart.",
  },
  {
    chapter: 2,
    title: "The God Who Reveals Secrets",
    reflection: "When pressure feels impossible, do you run first to panic, control, or prayer?",
    opening:
      "Daniel 2 turns the palace into a crisis. Nebuchadnezzar has a troubling dream, Babylon's wise men cannot help, and Daniel is pulled into a death sentence he did not create.",
    beginsWith: [
      "the king being troubled by a dream",
      "Babylon's wise men admitting their limits",
      "Daniel asking for time instead of panicking",
      "Daniel and his friends praying for mercy",
      "God revealing the mystery and showing His kingdom will outlast every empire",
    ],
    matters:
      "This chapter matters because Daniel's courage is prayerful, humble, and God-centered. He does not use God's gift to build his own name. He points the king to the God of heaven.",
    watchFor: [
      "how human wisdom reaches its limit",
      "how Daniel gathers his friends to pray",
      "how the dream exposes the temporary nature of empires",
      "how Daniel gives God credit before the king",
    ],
    takeaway:
      "Daniel 2 teaches that God can reveal what no human system can reach. Babylon has experts, but Daniel knows the God of heaven.",
  },
  {
    chapter: 3,
    title: "Faith Inside the Fire",
    reflection: "Would your loyalty to God still stand if obedience became public, costly, and unpopular?",
    opening:
      "Daniel 3 moves from palace training to public worship pressure. Nebuchadnezzar builds an image, music fills the plain, and everyone is commanded to bow.",
    beginsWith: [
      "a golden image set up on the plain of Dura",
      "officials gathered for a public loyalty test",
      "Shadrach, Meshach, and Abednego refusing to bow",
      "the furnace being heated seven times hotter",
      "God's presence appearing in the fire",
    ],
    matters:
      "This chapter matters because it shows courage without controlling the outcome. Daniel's friends believe God can deliver them, but they refuse to bow even if He does not.",
    watchFor: [
      "how public pressure works through fear and conformity",
      "how the phrase but if not reveals deep faith",
      "how God meets His people inside the fire",
      "how the king's question about God gets answered",
    ],
    takeaway:
      "Daniel 3 teaches that courage is worship under threat. True faith stands before the fire and says God is worthy either way.",
  },
  {
    chapter: 4,
    title: "The King Who Had to Look Up",
    reflection: "Where does pride need to be humbled before it damages your heart or the people around you?",
    opening:
      "Daniel 4 is a king's testimony about being humbled by God. Nebuchadnezzar has another dream, Daniel tells him the truth, and the proud king learns that heaven rules.",
    beginsWith: [
      "Nebuchadnezzar announcing what God did to him",
      "a dream of a massive tree cut down",
      "Daniel being troubled by the meaning",
      "a warning to break off sin and show mercy",
      "the king losing and then receiving his understanding again",
    ],
    matters:
      "This chapter matters because power without humility becomes dangerous. God warns Nebuchadnezzar, humbles him, and restores him so he can finally confess that the Most High rules.",
    watchFor: [
      "how comfort can hide pride",
      "how Daniel tells hard truth with compassion",
      "how the dream shows God ruling over kings",
      "how restoration begins when Nebuchadnezzar lifts his eyes to heaven",
    ],
    takeaway:
      "Daniel 4 teaches that God can humble any throne. Pride lowers people, but worship restores the right order of the heart.",
  },
  {
    chapter: 5,
    title: "The Writing on the Wall",
    reflection: "Are there warnings from God that you know but have not humbled yourself enough to obey?",
    opening:
      "Daniel 5 is a night of pride, wine, holy vessels, and sudden terror. Belshazzar treats sacred things casually, and God interrupts the feast with handwriting on the wall.",
    beginsWith: [
      "Belshazzar hosting a massive feast",
      "temple vessels from Jerusalem being used in mockery",
      "a mysterious hand writing on the wall",
      "Daniel being remembered and called into the room",
      "the kingdom being weighed and found wanting",
    ],
    matters:
      "This chapter matters because it shows the danger of knowing the truth and ignoring it. Belshazzar had the warning of Nebuchadnezzar's story, but he still lifted himself against the Lord of heaven.",
    watchFor: [
      "how quickly pride turns into fear",
      "how Daniel refuses to be bought by palace rewards",
      "how sacred things are treated with disrespect",
      "how judgment arrives the same night the warning is interpreted",
    ],
    takeaway:
      "Daniel 5 teaches that God is patient, but He is not mocked. The wall speaks because the king refused to humble his heart.",
  },
  {
    chapter: 6,
    title: "Prayer Above Survival",
    reflection: "What prayer rhythm are you building now that could hold steady when pressure comes later?",
    opening:
      "Daniel 6 is famous for the lions' den, but the real center is Daniel's prayer life. His enemies cannot find corruption, so they turn his faithfulness into a crime.",
    beginsWith: [
      "Daniel being promoted because of an excellent spirit",
      "jealous officials searching for fault and finding none",
      "a law designed to trap Daniel's prayer life",
      "Daniel praying with his windows open as before",
      "God shutting the lions' mouths",
    ],
    matters:
      "This chapter matters because Daniel's public courage comes from private consistency. He does not become faithful in the crisis. The crisis reveals the faithful life he already built.",
    watchFor: [
      "how integrity can make a person both trusted and hated",
      "how legal pressure is used against Daniel's faith",
      "how Daniel keeps praying as he did before",
      "how God delivers Daniel and turns the witness outward to the nations",
    ],
    takeaway:
      "Daniel 6 teaches that courage is consistency under threat. The lions' den reveals what the prayer room had already formed.",
  },
];

function buildDanielStudyIntro(day: DanielDay) {
  return `${day.opening}

# 📍 Where This Chapter Begins

**The scene opens with:**

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

const danielDays = danielChapterDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Daniel",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: buildDanielStudyIntro(day),
}));

async function restructureCourageOfDaniel() {
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Courage of Daniel")
    .maybeSingle();

  if (devotionalError) throw devotionalError;
  if (!devotional) throw new Error("Could not find devotional titled The Courage of Daniel.");

  const devotionalId = devotional.id as string;

  const { error: updateDevotionalError } = await supabase
    .from("devotionals")
    .update({
      subtitle: "A 6-Chapter Journey",
      description:
        "A chapter-by-chapter Bible study through Daniel 1-6. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, centered on courage, identity, prayer, wisdom, pressure, persecution, and faithfulness in Babylon.",
      total_days: danielDays.length,
    })
    .eq("id", devotionalId);

  if (updateDevotionalError) throw updateDevotionalError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", danielDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of danielDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Daniel day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log(`The Courage of Daniel is now a ${danielDays.length}-chapter journey.`);
}

restructureCourageOfDaniel().catch((error) => {
  console.error(error);
  process.exit(1);
});
