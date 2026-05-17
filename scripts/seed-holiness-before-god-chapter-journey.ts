import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { LEVITICUS_DEEP_NOTES } from "../lib/leviticusDeepNotes";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type HolinessDay = {
  day_number: number;
  day_title: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  devotional_text: string;
  reflection_question: string;
};

const chapterDetails = [
  {
    chapter: 1,
    title: "The Burnt Offering",
    focus: "God begins Leviticus with sacrifice, showing Israel that drawing near starts with surrender, substitution, and atonement.",
    watch: ["the tabernacle doorway", "a costly offering", "laying on hands", "blood at the altar", "a pleasing aroma"],
    reflection: "What does Leviticus 1 teach you about bringing your whole life before God?",
  },
  {
    chapter: 2,
    title: "The Grain Offering",
    focus: "God teaches Israel to honor Him with ordinary provision, daily work, thanksgiving, and worship that belongs fully to Him.",
    watch: ["fine flour", "oil and frankincense", "no leaven or honey", "salt of the covenant", "the memorial portion"],
    reflection: "How can Leviticus 2 shape the way you honor God with ordinary daily provision?",
  },
  {
    chapter: 3,
    title: "The Peace Offering",
    focus: "The peace offering shows fellowship with God, gratitude, and shared worship flowing from a restored relationship.",
    watch: ["offering from the herd or flock", "blood on the altar", "fat belonging to the Lord", "shared peace", "thankful worship"],
    reflection: "Where do you need to receive and practice peace with God this week?",
  },
  {
    chapter: 4,
    title: "The Sin Offering",
    focus: "God shows that sin pollutes, even when it is unintentional, and He mercifully provides atonement for His people.",
    watch: ["unintentional sin", "leaders and people", "blood purification", "atonement", "forgiveness"],
    reflection: "What does Leviticus 4 teach you about taking hidden or unintentional sin seriously?",
  },
  {
    chapter: 5,
    title: "Confession and Restitution",
    focus: "God calls His people to confess guilt, make wrongs right, and trust His mercy when they cannot fix themselves.",
    watch: ["public responsibility", "uncleanness", "confession", "accessible sacrifices", "restitution"],
    reflection: "Where might God be inviting you to confess honestly or make something right?",
  },
  {
    chapter: 6,
    title: "Fire on the Altar",
    focus: "God gives priestly instructions that keep worship burning, justice honest, and holiness guarded at the altar.",
    watch: ["repayment with extra", "the continual fire", "priestly service", "holy portions", "guarded worship"],
    reflection: "What helps you keep worship alive instead of treating it like a one-time moment?",
  },
  {
    chapter: 7,
    title: "Offerings and Holy Portions",
    focus: "God brings order to the offerings so thanksgiving, vows, fellowship, and priestly portions remain holy.",
    watch: ["guilt offering instructions", "thanksgiving sacrifices", "vow offerings", "blood and fat", "the priests' portions"],
    reflection: "How can Leviticus 7 teach you gratitude with reverence instead of casual worship?",
  },
  {
    chapter: 8,
    title: "Priests Consecrated",
    focus: "Aaron and his sons are washed, clothed, anointed, and set apart for service before the holy God.",
    watch: ["the whole congregation", "washing", "holy garments", "anointing oil", "ordination sacrifices"],
    reflection: "What does Leviticus 8 teach you about preparation before service?",
  },
  {
    chapter: 9,
    title: "Glory and Fire",
    focus: "The priestly ministry begins, sacrifices are offered, and the Lord's glory appears to the people.",
    watch: ["the eighth day", "offerings for priests and people", "Aaron's blessing", "God's glory", "fire from the Lord"],
    reflection: "How does obedience prepare space for God's glory to be seen?",
  },
  {
    chapter: 10,
    title: "Strange Fire",
    focus: "Nadab and Abihu treat holy worship carelessly, and God teaches Israel the difference between holy and common.",
    watch: ["unauthorized fire", "God's holiness", "priestly grief", "sober service", "holy discernment"],
    reflection: "Where does Leviticus 10 challenge you to treat God as holy?",
  },
  {
    chapter: 11,
    title: "Clean and Unclean Animals",
    focus: "God teaches Israel that holiness reaches ordinary habits, even what His people eat and touch.",
    watch: ["clean animals", "unclean animals", "creeping things", "daily distinctions", "be holy"],
    reflection: "What ordinary habit might God be using to shape your holiness?",
  },
  {
    chapter: 12,
    title: "Purification After Childbirth",
    focus: "God gives purification instructions after childbirth, showing that life, cleansing, mercy, and restoration all matter to Him.",
    watch: ["birth", "days of purification", "a lamb or birds", "accessible mercy", "restored worship"],
    reflection: "How does Leviticus 12 remind you that God cares about embodied life and restoration?",
  },
  {
    chapter: 13,
    title: "Examining Uncleanness",
    focus: "God gives careful instructions for examining disease, teaching patient discernment about what is clean and unclean.",
    watch: ["the priest's examination", "waiting seven days", "skin disease", "garment disease", "outside the camp"],
    reflection: "Where do you need patient honesty instead of rushing past what is unhealthy?",
  },
  {
    chapter: 14,
    title: "Cleansing and Restoration",
    focus: "God makes a way for the unclean person to be cleansed, restored, and brought back into worship and community.",
    watch: ["two birds", "washing and shaving", "return to the camp", "offerings", "cleansed houses"],
    reflection: "What does Leviticus 14 show you about God's desire to restore people?",
  },
  {
    chapter: 15,
    title: "Bodily Uncleanness",
    focus: "God addresses real human weakness and teaches His people that holiness reaches even private and physical parts of life.",
    watch: ["bodily discharges", "washing", "evening cleansing", "human weakness", "protected worship"],
    reflection: "How does Leviticus 15 help you bring real human weakness before God without pretending?",
  },
  {
    chapter: 16,
    title: "The Day of Atonement",
    focus: "At the center of Leviticus, God provides atonement so a holy God can continue dwelling among a sinful people.",
    watch: ["Aaron entering carefully", "the mercy seat", "the two goats", "confession", "atonement for the holy place"],
    reflection: "What does Leviticus 16 teach you about your need for mercy and a mediator?",
  },
  {
    chapter: 17,
    title: "Life Is in the Blood",
    focus: "God teaches Israel that life belongs to Him and that blood is sacred because He gives it for atonement.",
    watch: ["sacrifices brought to the tabernacle", "no blood consumed", "life in the blood", "atonement", "holy worship"],
    reflection: "How does Leviticus 17 deepen your reverence for life and atonement?",
  },
  {
    chapter: 18,
    title: "Holy Boundaries",
    focus: "God calls Israel away from Egypt and Canaan by giving holy boundaries for desire, sexuality, and family life.",
    watch: ["do not copy the nations", "God's statutes", "uncovering nakedness", "protected relationships", "the land defiled"],
    reflection: "Where does holiness need to shape your desires and relationships?",
  },
  {
    chapter: 19,
    title: "Love Your Neighbor",
    focus: "God shows that holiness is practical: worship, justice, speech, work, generosity, and neighbor-love all belong together.",
    watch: ["be holy", "honor parents", "leave gleanings", "do not steal or lie", "love your neighbor"],
    reflection: "How can Leviticus 19 reshape the way you love your neighbor today?",
  },
  {
    chapter: 20,
    title: "Set Apart from the Nations",
    focus: "God warns Israel against the practices of the nations and calls His people to live set apart because He is holy.",
    watch: ["Molech", "judgment", "family holiness", "clean and unclean", "set apart by the Lord"],
    reflection: "What would it look like for your life to be clearly set apart for God?",
  },
  {
    chapter: 21,
    title: "Priests and Holiness",
    focus: "God gives priestly standards because those who lead worship must reflect the holiness of the God they serve.",
    watch: ["priestly conduct", "holy marriage", "the high priest", "approaching the altar", "bearing God's holiness"],
    reflection: "How does Leviticus 21 challenge the way you think about leadership and holiness?",
  },
  {
    chapter: 22,
    title: "Holy Offerings",
    focus: "God guards His holy name by teaching priests and people to bring offerings with reverence, integrity, and honor.",
    watch: ["holy food", "clean priests", "acceptable offerings", "no blemish", "I am the Lord who sanctifies"],
    reflection: "What would it mean to bring God what is honorable instead of leftover?",
  },
  {
    chapter: 23,
    title: "The Feasts of the Lord",
    focus: "God forms Israel's calendar around Sabbath, feasts, remembrance, worship, harvest, atonement, and joyful dwelling with Him.",
    watch: ["Sabbath", "Passover", "Firstfruits", "Weeks", "Atonement and Booths"],
    reflection: "How can God's rhythms reshape your time and attention?",
  },
  {
    chapter: 24,
    title: "Lamp, Bread, and Justice",
    focus: "God connects continual worship with public justice, showing that holiness includes both reverence and righteousness.",
    watch: ["pure oil", "continual lamp", "bread before the Lord", "blasphemy", "equal justice"],
    reflection: "How does Leviticus 24 hold worship and justice together?",
  },
  {
    chapter: 25,
    title: "Sabbath and Jubilee",
    focus: "God teaches Israel to trust Him with land, time, debt, freedom, and redemption through Sabbath years and Jubilee.",
    watch: ["Sabbath year", "Jubilee", "land returning", "debt mercy", "the kinsman-redeemer"],
    reflection: "Where do you need to trust God with time, resources, or release?",
  },
  {
    chapter: 26,
    title: "Blessing and Warning",
    focus: "God lays out covenant blessings and warnings so Israel will understand the seriousness of faithfulness and return.",
    watch: ["obedience", "peace in the land", "God walking among them", "discipline", "remembering the covenant"],
    reflection: "How does Leviticus 26 help you take covenant faithfulness seriously?",
  },
  {
    chapter: 27,
    title: "Vows and Devotion",
    focus: "Leviticus ends by teaching Israel to honor vows, dedicated things, tithes, and everything that belongs to the Lord.",
    watch: ["vows", "dedicated people and animals", "redeeming property", "devoted things", "the tithe is holy"],
    reflection: "What part of your life do you need to remember already belongs to God?",
  },
] as const;

function formatList(items: readonly string[]) {
  return items.map((item) => `* ${item}`).join("\n\n");
}

function buildIntro(detail: (typeof chapterDetails)[number]) {
  return `${detail.focus}

# Where This Chapter Begins

Leviticus ${detail.chapter} belongs to **Holiness Before God**, the Bible Study that walks through sacrifice, priesthood, clean and unclean, atonement, holy living, feasts, Jubilee, covenant blessing, and devotion to the Lord.

**The scene opens with:**

${formatList(detail.watch)}

---

# Why This Chapter Matters

This chapter matters because Leviticus answers a huge Bible question: How can a holy God live with His people, and how should His people live near Him?

**This chapter helps us see:**

* God is holy and merciful

* sin affects worship, community, and daily life

* atonement is necessary for fellowship with God

* holiness reaches ordinary habits, relationships, time, and worship

* God's people are called to be set apart because He is holy

---

# What To Watch For

As you read Leviticus ${detail.chapter}, watch how God teaches His people to draw near with reverence and live every part of life before Him.

---

# The Bigger Takeaway

> **${detail.focus}**

> **Holiness is not distance from God. Holiness is the way God mercifully teaches His people to live near Him.**`;
}

const holinessDays: HolinessDay[] = chapterDetails.map((detail, index) => ({
  day_number: index + 1,
  day_title: detail.title,
  bible_reading_book: "Leviticus",
  bible_reading_chapter: detail.chapter,
  devotional_text: buildIntro(detail),
  reflection_question: detail.reflection,
}));

async function getOrCreateStudyId() {
  const { data: existing, error: existingError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "Holiness Before God")
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing?.id) return existing.id as string;

  const { data: created, error: createError } = await supabase
    .from("devotionals")
    .insert({
      title: "Holiness Before God",
      subtitle: "A 27-Chapter Journey",
      description:
        "A 27-chapter Bible study through Leviticus 1-27. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so sacrifice, priesthood, atonement, clean and unclean, holy living, feasts, Jubilee, and covenant faithfulness stay centered on Scripture.",
      total_days: holinessDays.length,
    })
    .select("id")
    .single();

  if (createError) throw createError;
  if (!created?.id) throw new Error("Failed to create Holiness Before God Bible Study.");
  return created.id as string;
}

async function main() {
  const devotionalId = await getOrCreateStudyId();

  const { error: updateError } = await supabase
    .from("devotionals")
    .update({
      subtitle: "A 27-Chapter Journey",
      description:
        "A 27-chapter Bible study through Leviticus 1-27. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so sacrifice, priesthood, atonement, clean and unclean, holy living, feasts, Jubilee, and covenant faithfulness stay centered on Scripture.",
      total_days: holinessDays.length,
    })
    .eq("id", devotionalId);

  if (updateError) throw updateError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", holinessDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of holinessDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Holiness Before God day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  const notesRows = holinessDays.map((day) => {
    const notesText = LEVITICUS_DEEP_NOTES[day.bible_reading_chapter - 1];
    if (!notesText?.trim()) {
      throw new Error(`Missing Leviticus ${day.bible_reading_chapter} notes.`);
    }

    return {
      book: "leviticus",
      chapter: day.bible_reading_chapter,
      notes_text: notesText,
    };
  });

  const { error: notesError } = await supabase
    .from("bible_notes")
    .upsert(notesRows, { onConflict: "book,chapter" });

  if (notesError) throw notesError;

  console.log("Seeded Holiness Before God and Leviticus 1-27 notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
