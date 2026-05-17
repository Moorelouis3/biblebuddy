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

type MosesDay = {
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
    title: "Slavery in Egypt",
    focus: "Israel grows in Egypt, Pharaoh becomes afraid, and fear turns into oppression.",
    watch: ["Jacob's family becoming a nation", "Pharaoh's fear of growth", "forced labor", "the courage of the Hebrew midwives", "the river order against Hebrew sons"],
    reflection: "Where do you see fear turning into control in Exodus 1, and what does the courage of the midwives teach you?",
  },
  {
    chapter: 2,
    title: "Moses Is Born and Hidden",
    focus: "Moses is born under a death sentence, preserved through the river, raised in Pharaoh's house, and eventually driven into Midian.",
    watch: ["Moses' mother hiding him", "the basket in the river", "Pharaoh's daughter rescuing him", "Moses defending the oppressed", "Moses becoming a stranger in Midian"],
    reflection: "How does Exodus 2 show God preserving a deliverer before anyone can see the full plan?",
  },
  {
    chapter: 3,
    title: "The Burning Bush",
    focus: "God meets Moses in the wilderness, reveals His holiness, hears Israel's cry, and sends Moses back to Egypt.",
    watch: ["holy ground", "God hearing the cry of His people", "the name I AM", "Moses' fear", "God's promise to be with him"],
    reflection: "What does Exodus 3 teach you about God's timing, holiness, and compassion for the oppressed?",
  },
  {
    chapter: 4,
    title: "Moses Resists the Call",
    focus: "Moses keeps objecting, but God gives signs, Aaron, and a path back toward Egypt.",
    watch: ["the staff becoming a sign", "Moses' doubts", "Aaron's role", "obedience on the journey", "Israel believing and worshiping"],
    reflection: "Which part of Moses' resistance feels most human to you, and how does God answer it?",
  },
  {
    chapter: 5,
    title: "Pharaoh Makes the Burden Heavier",
    focus: "Moses confronts Pharaoh, Pharaoh refuses, and Israel's suffering gets worse before deliverance becomes visible.",
    watch: ["Pharaoh's question about the Lord", "bricks without straw", "Israel blaming Moses", "Moses bringing the pain back to God", "the tension before rescue"],
    reflection: "What does Exodus 5 teach you about obeying God when circumstances get harder first?",
  },
  {
    chapter: 6,
    title: "God Remembers His Covenant",
    focus: "God answers Moses with covenant language and promises to redeem Israel with power.",
    watch: ["I am the Lord", "God remembering His covenant", "redemption language", "Moses' discouragement", "the genealogy anchoring Moses and Aaron"],
    reflection: "Which promise in Exodus 6 do you most need to remember when deliverance feels delayed?",
  },
  {
    chapter: 7,
    title: "The Signs Begin",
    focus: "Moses and Aaron stand before Pharaoh, the staff becomes a serpent, and the Nile turns to blood.",
    watch: ["Aaron speaking for Moses", "Pharaoh's hardened heart", "Egypt's magicians", "the Nile judged", "the first plague beginning the showdown"],
    reflection: "How does Exodus 7 show that the conflict is not Moses versus Pharaoh, but the Lord versus Egypt's gods?",
  },
  {
    chapter: 8,
    title: "Frogs, Lice, and Flies",
    focus: "The plagues intensify as God exposes Pharaoh's false control and begins making a distinction for His people.",
    watch: ["frogs filling Egypt", "Pharaoh asking for relief but not surrendering", "the magicians reaching their limit", "God separating Goshen", "partial repentance fading away"],
    reflection: "Where do you see Pharaoh wanting relief without surrender in Exodus 8?",
  },
  {
    chapter: 9,
    title: "Judgment Falls Harder",
    focus: "Livestock disease, boils, and hail reveal God's power over Egypt's economy, bodies, land, and sky.",
    watch: ["God distinguishing Israel", "boils on people and animals", "warning before hail", "some Egyptians fearing the word of the Lord", "Pharaoh hardening again"],
    reflection: "What does Exodus 9 teach you about warnings, mercy, and hardened resistance?",
  },
  {
    chapter: 10,
    title: "Locusts and Darkness",
    focus: "Locusts consume what remains, darkness covers Egypt, and Pharaoh keeps trying to bargain with God's command.",
    watch: ["Pharaoh's servants pleading", "partial obedience", "locusts devouring the land", "darkness that can be felt", "Pharaoh refusing full surrender"],
    reflection: "Where are you tempted to offer God partial obedience instead of full surrender?",
  },
  {
    chapter: 11,
    title: "The Final Plague Announced",
    focus: "God announces the death of the firstborn and prepares Israel for the decisive night of deliverance.",
    watch: ["one final plague", "Israel receiving favor", "midnight judgment", "a cry through Egypt", "God making a distinction"],
    reflection: "How does Exodus 11 connect judgment, warning, and mercy before the Passover night?",
  },
  {
    chapter: 12,
    title: "Passover and the Exodus",
    focus: "The Passover lamb, the blood on the doors, and the death of the firstborn lead to Israel's release from Egypt.",
    watch: ["the lamb without blemish", "blood as a sign", "unleavened bread", "the Lord passing over", "Israel leaving Egypt in haste"],
    reflection: "What does Exodus 12 teach you about deliverance through the blood of the lamb?",
  },
  {
    chapter: 13,
    title: "Remembering Deliverance",
    focus: "God commands Israel to remember the exodus, consecrate the firstborn, and follow His cloud and fire.",
    watch: ["memory becoming worship", "teaching children", "Joseph's bones", "the longer wilderness route", "the pillar of cloud and fire"],
    reflection: "Why does God make remembrance part of deliverance in Exodus 13?",
  },
  {
    chapter: 14,
    title: "The Red Sea Opens",
    focus: "Israel is trapped between Pharaoh's army and the sea, but God opens a path through the waters.",
    watch: ["fear at the sea", "stand still and see salvation", "the cloud moving between Israel and Egypt", "waters like walls", "Egypt defeated in the sea"],
    reflection: "What does Exodus 14 teach you about fear when every visible direction looks impossible?",
  },
  {
    chapter: 15,
    title: "The Song and the Bitter Water",
    focus: "Israel sings after the Red Sea, then immediately begins learning trust in the wilderness at Marah.",
    watch: ["Moses' victory song", "Miriam leading worship", "bitter water", "the tree thrown into the water", "the Lord who heals"],
    reflection: "How does Exodus 15 hold worship and wilderness testing together?",
  },
  {
    chapter: 16,
    title: "Manna in the Wilderness",
    focus: "God feeds Israel with manna and quail, teaching daily dependence and Sabbath rest.",
    watch: ["complaining in the wilderness", "bread from heaven", "daily gathering", "double portion before Sabbath", "manna kept as testimony"],
    reflection: "What does Exodus 16 teach you about trusting God one day at a time?",
  },
  {
    chapter: 17,
    title: "Water From the Rock and Battle With Amalek",
    focus: "God provides water from the rock, then Israel faces Amalek while Moses' lifted hands show dependence on God.",
    watch: ["Massah and Meribah", "water from the rock", "Amalek attacking", "Aaron and Hur supporting Moses", "the Lord as banner"],
    reflection: "Where do you need support like Moses received from Aaron and Hur?",
  },
  {
    chapter: 18,
    title: "Jethro's Wisdom",
    focus: "Jethro rejoices over God's deliverance and teaches Moses to share leadership before he wears himself out.",
    watch: ["Jethro hearing what God did", "worship and sacrifice", "Moses judging alone", "wise delegation", "leaders who fear God and hate covetousness"],
    reflection: "What does Exodus 18 teach you about humility, shared leadership, and sustainable service?",
  },
] as const;

function formatList(items: readonly string[], icons: readonly string[]) {
  return items.map((item, index) => `* ${icons[index % icons.length]} ${item}`).join("\n\n");
}

function buildIntro(detail: (typeof chapterDetails)[number]) {
  return `${detail.focus}

# 📍 Where This Chapter Begins

Exodus ${detail.chapter} belongs to **The Deliverance of Moses**, the Bible Study that moves from Israel's slavery in Egypt to God's rescue, Passover, the Red Sea, and the first wilderness lessons.

**The scene opens with:**

${formatList(detail.watch, ["🎬", "👀", "⚠️", "🔥", "🧭"])}

---

# 💡 Why This Chapter Matters

This chapter matters because it shows God moving the rescue story forward. The deliverance is not random. God hears, remembers, acts, judges evil, preserves His people, and forms them into a people who must learn to trust Him.

**This chapter gives us:**

* 🧱 pressure that reveals what people trust

* 🙏 cries that God hears

* 🔥 signs of God's power and holiness

* 🩸 deliverance that depends on God's provision

* 🧭 a next step for Israel's journey

---

# 🔎 What To Watch For

As you read Exodus ${detail.chapter}, pay attention to how God is forming a delivered people, not only removing them from Egypt.

---

# 🎬 The Bigger Takeaway

> **${detail.focus}**

> **The same God who delivers His people also teaches them how to walk after deliverance.**`;
}

const mosesDays: MosesDay[] = chapterDetails.map((detail, index) => ({
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
    .eq("title", "The Deliverance of Moses")
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing?.id) return existing.id as string;

  const { data: created, error: createError } = await supabase
    .from("devotionals")
    .insert({
      title: "The Deliverance of Moses",
      subtitle: "An 18-Chapter Journey",
      description:
        "An 18-chapter Bible study through Exodus 1-18. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so Israel's slavery, Moses' calling, the plagues, Passover, the Red Sea, and wilderness provision stay centered on Scripture.",
      total_days: mosesDays.length,
    })
    .select("id")
    .single();

  if (createError) throw createError;
  if (!created?.id) throw new Error("Failed to create The Deliverance of Moses Bible Study.");
  return created.id as string;
}

async function main() {
  const devotionalId = await getOrCreateStudyId();

  const { error: updateError } = await supabase
    .from("devotionals")
    .update({
      subtitle: "An 18-Chapter Journey",
      description:
        "An 18-chapter Bible study through Exodus 1-18. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so Israel's slavery, Moses' calling, the plagues, Passover, the Red Sea, and wilderness provision stay centered on Scripture.",
      total_days: mosesDays.length,
    })
    .eq("id", devotionalId);

  if (updateError) throw updateError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", mosesDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of mosesDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Moses day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  const notesRows = mosesDays.map((day) => {
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

  console.log("Seeded The Deliverance of Moses and Exodus 1-18 notes.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
