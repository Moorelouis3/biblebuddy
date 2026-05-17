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

type PresenceDay = {
  day_number: number;
  day_title: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  devotional_text: string;
  reflection_question: string;
};

const chapterDetails = [
  {
    chapter: 25,
    title: "Offerings for a Dwelling Place",
    focus: "God invites Israel to bring willing offerings so a holy dwelling place can be built among them.",
    watch: ["willing hearts", "costly materials", "the ark", "the mercy seat", "the table and lampstand"],
    reflection: "What does Exodus 25 teach you about offering your best for God's presence?",
  },
  {
    chapter: 26,
    title: "The Tabernacle Pattern",
    focus: "God gives the pattern for the tabernacle, showing that His dwelling place is ordered, holy, and intentional.",
    watch: ["curtains and coverings", "frames and sockets", "holy space", "the veil", "God's exact design"],
    reflection: "Where does Exodus 26 challenge you to see worship as ordered by God, not invented by people?",
  },
  {
    chapter: 27,
    title: "The Altar and the Court",
    focus: "God gives instructions for the altar, the courtyard, and the lamp, showing how sacrifice and light surround His presence.",
    watch: ["the bronze altar", "the courtyard", "boundaries for worship", "oil for the lamp", "continual light"],
    reflection: "How does Exodus 27 connect sacrifice, holiness, and light in the life of God's people?",
  },
  {
    chapter: 28,
    title: "Priests Clothed for Service",
    focus: "Aaron and his sons are set apart with holy garments so they can represent Israel before the Lord.",
    watch: ["the ephod", "stones with Israel's names", "the breastpiece", "holy to the Lord", "beauty and glory"],
    reflection: "What does Exodus 28 teach you about being represented before a holy God?",
  },
  {
    chapter: 29,
    title: "Consecrated to Draw Near",
    focus: "God gives the consecration ritual for the priests, showing that drawing near requires cleansing, sacrifice, and dedication.",
    watch: ["washing", "anointing", "sin offering", "ordination", "God meeting His people"],
    reflection: "What does Exodus 29 show you about the seriousness and mercy of being brought near to God?",
  },
  {
    chapter: 30,
    title: "Incense, Atonement, and Anointing",
    focus: "God gives instructions for incense, ransom, washing, anointing oil, and holiness around everything connected to His presence.",
    watch: ["the incense altar", "atonement money", "the bronze basin", "holy oil", "holy incense"],
    reflection: "How does Exodus 30 teach you to treat prayer, cleansing, and worship as holy?",
  },
  {
    chapter: 31,
    title: "Filled with the Spirit to Build",
    focus: "God appoints Spirit-filled craftsmen and reminds Israel that Sabbath rest remains a covenant sign.",
    watch: ["Bezalel and Oholiab", "skill from the Spirit", "holy craftsmanship", "Sabbath sign", "tablets of stone"],
    reflection: "What does Exodus 31 teach you about serving God with skill and resting under His authority?",
  },
  {
    chapter: 32,
    title: "The Golden Calf",
    focus: "Israel breaks covenant almost immediately, replacing God's unseen presence with an idol they can control.",
    watch: ["impatience", "Aaron's failure", "false worship", "Moses' intercession", "judgment and mercy"],
    reflection: "Where does Exodus 32 warn you about replacing God with something easier to manage?",
  },
  {
    chapter: 33,
    title: "If Your Presence Will Not Go",
    focus: "Moses pleads for God's presence to remain with Israel because the people cannot move forward without Him.",
    watch: ["the tent of meeting", "Moses' friendship with God", "presence over success", "show me your glory", "grace and favor"],
    reflection: "What would change if you prayed like Moses, valuing God's presence above every other blessing?",
  },
  {
    chapter: 34,
    title: "Mercy on the Mountain",
    focus: "God renews the covenant and reveals His character as merciful, gracious, patient, holy, and faithful.",
    watch: ["new tablets", "the Lord's name", "mercy and justice", "covenant renewal", "Moses' shining face"],
    reflection: "Which part of God's self-revelation in Exodus 34 do you most need to remember right now?",
  },
  {
    chapter: 35,
    title: "Willing Hearts Begin the Work",
    focus: "Israel responds with willing gifts and skilled work as the tabernacle project begins after covenant mercy.",
    watch: ["Sabbath reminder", "generous offerings", "men and women bringing gifts", "skilled hearts", "Spirit-filled work"],
    reflection: "What does Exodus 35 teach you about generosity that flows from grace?",
  },
  {
    chapter: 36,
    title: "More Than Enough",
    focus: "The people bring more than enough, and the tabernacle construction begins with careful obedience to God's pattern.",
    watch: ["abundant generosity", "stopping the gifts", "curtains", "frames", "obedient craftsmanship"],
    reflection: "How does Exodus 36 challenge scarcity thinking in the way you serve God?",
  },
  {
    chapter: 37,
    title: "The Holy Furniture Built",
    focus: "The ark, table, lampstand, and incense altar are made exactly as God commanded.",
    watch: ["the ark", "the mercy seat", "the table", "the lampstand", "the incense altar"],
    reflection: "What does Exodus 37 teach you about obedience in hidden or detailed work?",
  },
  {
    chapter: 38,
    title: "The Court and the Cost",
    focus: "The altar, basin, courtyard, and material inventory show that worship has structure, sacrifice, and real cost.",
    watch: ["bronze altar", "women serving", "courtyard boundaries", "inventory", "costly worship"],
    reflection: "How does Exodus 38 help you think about worship as something concrete, costly, and communal?",
  },
  {
    chapter: 39,
    title: "Garments for Glory",
    focus: "The priestly garments are completed, and Moses sees that the work has been done as the Lord commanded.",
    watch: ["ephod completed", "breastpiece completed", "holy crown", "as the Lord commanded", "Moses blessing the work"],
    reflection: "What does Exodus 39 teach you about finishing faithfully what God has given you to do?",
  },
  {
    chapter: 40,
    title: "Glory Fills the Tabernacle",
    focus: "The tabernacle is set up, the priests are consecrated, and God's glory fills the dwelling place among His people.",
    watch: ["setting up the tabernacle", "anointing", "obedience completed", "the cloud", "glory filling the tabernacle"],
    reflection: "How does Exodus 40 show that God's rescue is meant to bring His people into His presence?",
  },
] as const;

function formatList(items: readonly string[]) {
  return items.map((item) => `* ${item}`).join("\n\n");
}

function buildIntro(detail: (typeof chapterDetails)[number]) {
  return `${detail.focus}

# Where This Chapter Begins

Exodus ${detail.chapter} belongs to **The Presence of God**, the Bible Study that moves from tabernacle instructions to idolatry, intercession, covenant mercy, obedient construction, and the glory of the Lord filling the tabernacle.

**The scene opens with:**

${formatList(detail.watch)}

---

# Why This Chapter Matters

This chapter matters because Exodus does not end with escape from Egypt. It ends with the holy God choosing to dwell among His rescued people.

**This chapter helps us see:**

* God's presence is holy, not casual

* worship is shaped by God's word

* sin threatens fellowship with God

* mercy makes restored presence possible

* obedience prepares space for God's glory

---

# What To Watch For

As you read Exodus ${detail.chapter}, watch how God's presence becomes the central question: How can a holy God live among sinful people without destroying them?

---

# The Bigger Takeaway

> **${detail.focus}**

> **God rescues His people so He can dwell with them, guide them, forgive them, and make His glory known among them.**`;
}

const presenceDays: PresenceDay[] = chapterDetails.map((detail, index) => ({
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
    .eq("title", "The Presence of God")
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing?.id) return existing.id as string;

  const { data: created, error: createError } = await supabase
    .from("devotionals")
    .insert({
      title: "The Presence of God",
      subtitle: "A 16-Chapter Journey",
      description:
        "A 16-chapter Bible study through Exodus 25-40. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so the tabernacle, priesthood, golden calf, intercession, covenant mercy, obedient construction, and God's glory filling the tabernacle stay centered on Scripture.",
      total_days: presenceDays.length,
    })
    .select("id")
    .single();

  if (createError) throw createError;
  if (!created?.id) throw new Error("Failed to create The Presence of God Bible Study.");
  return created.id as string;
}

async function main() {
  const devotionalId = await getOrCreateStudyId();

  const { error: updateError } = await supabase
    .from("devotionals")
    .update({
      subtitle: "A 16-Chapter Journey",
      description:
        "A 16-chapter Bible study through Exodus 25-40. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so the tabernacle, priesthood, golden calf, intercession, covenant mercy, obedient construction, and God's glory filling the tabernacle stay centered on Scripture.",
      total_days: presenceDays.length,
    })
    .eq("id", devotionalId);

  if (updateError) throw updateError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", presenceDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of presenceDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Presence of God day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  const notesRows = presenceDays.map((day) => {
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

  console.log("Seeded The Presence of God and Exodus 25-40 notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
