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

type JacobDay = {
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

const beginsWithIcons = ["🏃", "💔", "🌌", "🙏", "🧬", "🔥"];
const watchForIcons = ["🔍", "😨", "⚖️", "🧠", "👣", "👑"];

const jacobDays: JacobDay[] = [
  {
    chapter: 28,
    title: "Jacob Meets God at Bethel",
    reflection: "Where do you need to believe that God can meet you even while you are living with consequences?",
    opening:
      "Genesis 28 begins with Jacob alone. He has the blessing, but he also has the consequences that came with it. Esau wants him dead, his family is divided, and Jacob is now running into the unknown. But in the middle of fear and isolation, God meets him personally for the first time. Jacob has known about the God of Abraham and Isaac. Now God speaks directly to him.",
    beginsWith: ["Jacob fleeing from Esau", "family tension after the stolen blessing", "Jacob sleeping alone in the wilderness", "a ladder reaching into heaven", "God repeating the covenant promises", "Jacob marking Bethel as sacred"],
    matters:
      "This chapter matters because Jacob's relationship with God begins becoming personal. The covenant promise moves from family background into direct encounter, and Jacob's long transformation journey begins.",
    watchFor: ["how fear shapes Jacob's movement", "what the ladder vision reveals", "how God repeats Abraham's covenant", "how Jacob responds with an imperfect vow", "how running from consequences changes Jacob's life"],
    takeaway:
      "Jacob's story begins with deception and fear.\n\nBut God does not abandon him. The wrestling has only just begun.",
  },
  {
    chapter: 29,
    title: "Jacob Meets Rachel and Is Deceived",
    reflection: "Where do you see old patterns repeating, and what would it look like to let God interrupt them?",
    opening:
      "Genesis 29 begins with hope. Jacob reaches the land of his relatives, meets Rachel at a well, and feels love rise quickly. But the chapter turns when Laban deceives Jacob and gives him Leah first. The man who deceived his father is now deceived by his uncle, and the family line begins growing inside rivalry, rejection, and pain.",
    beginsWith: ["Jacob arriving in the east", "Rachel coming with the sheep", "Jacob meeting Laban's household", "Jacob loving Rachel", "Laban switching Leah for Rachel", "Leah bearing sons while longing to be loved"],
    matters:
      "This chapter matters because it shows consequences and mercy together. Jacob is deceived, Leah is wounded, Rachel is loved, and God begins building Israel's tribes through a painfully complicated family.",
    watchFor: ["how the well scene echoes earlier Genesis marriage stories", "how Laban manipulates Jacob", "how Leah's pain is seen by God", "how rivalry begins shaping the household", "how Judah is born from the unloved place"],
    takeaway:
      "Genesis 29 is not a clean romance.\n\nIt is a family story where love, deception, rejection, and covenant future all collide.",
  },
  {
    chapter: 30,
    title: "Family Rivalry Grows",
    reflection: "How can unmet longing become unhealthy comparison if it is not brought honestly to God?",
    opening:
      "Genesis 30 shows Jacob's household growing, but not peacefully. Rachel and Leah are caught in jealousy, pain, and competition. Bilhah and Zilpah are drawn into the struggle. Sons are born, names are spoken, and the future tribes of Israel begin forming inside a house full of longing.",
    beginsWith: ["Rachel envying Leah", "Bilhah and Zilpah being brought into the rivalry", "sons being named from emotional pain", "God remembering Rachel", "Joseph being born", "Jacob's flocks increasing"],
    matters:
      "This chapter matters because the tribes of Israel are forming inside a deeply wounded family system. God is working, but Genesis does not hide the jealousy and pain surrounding the births.",
    watchFor: ["how children become tied to identity and status", "how names reveal emotional tension", "how God remembers Rachel", "how Jacob grows wealthy under Laban", "how blessing does not automatically heal rivalry"],
    takeaway:
      "Genesis 30 shows God building a people through a messy family.\n\nThat does not make the rivalry good, but it does make grace feel real.",
  },
  {
    chapter: 31,
    title: "Jacob Flees Laban",
    reflection: "What unhealthy situation might God be calling you to leave with wisdom and courage?",
    opening:
      "Genesis 31 shows Jacob running again. This time he is not running from Esau, but from Laban. Years of manipulation have worn down trust. God tells Jacob to return home, Rachel steals the household idols, Laban pursues, and the chapter ends with a boundary covenant between two men who do not fully trust each other.",
    beginsWith: ["Laban's attitude changing toward Jacob", "God telling Jacob to return", "Rachel and Leah naming their father's injustice", "Rachel stealing the household images", "Laban pursuing Jacob", "a covenant heap marking a boundary"],
    matters:
      "This chapter matters because Jacob's return to the promised land begins. But before he faces Esau, he has to separate from Laban and close a long season of manipulation.",
    watchFor: ["how God protects Jacob from Laban", "how deception still appears through Rachel", "how Jacob finally names years of mistreatment", "why the heap matters as a boundary", "how going home means facing old fear"],
    takeaway:
      "Genesis 31 is about leaving a controlling place.\n\nGod brings Jacob out, but the road home will require him to face what he ran from.",
  },
  {
    chapter: 32,
    title: "Jacob Wrestles With God",
    reflection: "What are you wrestling with God about, and what might dependence look like on the other side?",
    opening:
      "Genesis 32 is the night Jacob stops running and wrestles. Esau is coming with four hundred men, and Jacob is afraid. He divides the camp, prays honestly, sends gifts ahead, and then ends up alone in the dark. There, a mysterious man wrestles with him until daybreak, touches his thigh, and gives him a new name: Israel.",
    beginsWith: ["Jacob preparing to meet Esau", "fear rising at the news of four hundred men", "Jacob praying from a humbled place", "gifts being sent ahead", "Jacob being left alone", "the wrestling that changes his name"],
    matters:
      "This chapter matters because Jacob's identity changes through struggle. He enters the night as Jacob, the heel-grabber, and leaves as Israel, limping and dependent after an encounter with God.",
    watchFor: ["how fear and faith exist together", "how Jacob's prayer shows growth", "why the wrestling happens before Esau", "what the new name Israel means", "why the limp matters"],
    takeaway:
      "Genesis 32 is the center of Jacob's transformation.\n\nGod changes Jacob in the dark, then sends him forward with a new name and a limp.",
  },
  {
    chapter: 33,
    title: "Jacob and Esau Meet Again",
    reflection: "Where might humility be the first faithful step toward healing a damaged relationship?",
    opening:
      "Genesis 33 carries years of fear into one meeting. Jacob has wrestled through the night, but now morning comes and Esau is in front of him. Jacob bows, Esau runs, the brothers embrace, and the moment Jacob feared becomes a scene of mercy. Still, the chapter is careful. Reconciliation is real, but the brothers do not simply erase the past.",
    beginsWith: ["Jacob seeing Esau approach", "Jacob arranging his family", "Jacob bowing seven times", "Esau running to embrace him", "the brothers weeping", "Jacob building an altar later in the land"],
    matters:
      "This chapter matters because Jacob faces the brother he wronged and receives mercy instead of revenge. It shows reconciliation with emotion, humility, and wisdom.",
    watchFor: ["how Jacob approaches Esau humbly", "how Esau surprises the reader", "why Jacob compares Esau's face to God's face", "why the brothers still move separately", "how Jacob worships after mercy"],
    takeaway:
      "Genesis 33 is a mercy chapter.\n\nThe brother Jacob feared becomes the brother who embraces him.",
  },
  {
    chapter: 34,
    title: "Dinah, Shechem, and Violent Revenge",
    reflection: "How can anger over real wrong become dangerous if it turns into revenge instead of justice?",
    opening:
      "Genesis 34 is one of the hardest chapters in Jacob's story. Dinah is violated, Shechem wants to marry her, Jacob's sons answer deceitfully, and Simeon and Levi carry out violent revenge. The chapter is painful, morally complex, and deeply unsettling. It must be read carefully, without blaming Dinah and without excusing revenge.",
    beginsWith: ["Dinah going out to see the daughters of the land", "Shechem violating Dinah", "Jacob's sons grieving and becoming angry", "a deceptive marriage negotiation", "circumcision being misused", "Simeon and Levi attacking the city"],
    matters:
      "This chapter matters because it shows real harm, family rage, deceit, and revenge. It exposes how moral chaos spreads when people answer violence with more violence.",
    watchFor: ["how the text treats Shechem's act as wrong", "how Jacob's sons use deception", "how sacred covenant signs are misused", "how Simeon and Levi escalate revenge", "how Jacob fears the consequences"],
    takeaway:
      "Genesis 34 does not give easy comfort.\n\nIt shows the damage of violation and the danger of revenge taking control.",
  },
  {
    chapter: 35,
    title: "Return to Bethel",
    reflection: "What would returning to a place of worship and surrender look like in this season of your life?",
    opening:
      "Genesis 35 brings Jacob back to Bethel, the place where God first met him in the wilderness. After the darkness of Shechem, God calls Jacob to return, build an altar, and lead his household in spiritual renewal. But the chapter also carries grief: Rachel dies, Benjamin is born, Reuben sins, and Isaac dies.",
    beginsWith: ["God calling Jacob back to Bethel", "Jacob telling his household to put away strange gods", "the family burying old idols", "God reaffirming Jacob's name Israel", "Rachel dying as Benjamin is born", "Isaac's death closing a generation"],
    matters:
      "This chapter matters because God calls Jacob back to worship and identity. The covenant is reaffirmed, but renewal happens in a chapter full of grief and family pain.",
    watchFor: ["why strange gods must be put away", "how Bethel connects to Genesis 28", "why God repeats Jacob's new name", "how Rachel's death affects the story", "how Isaac's death closes the previous generation"],
    takeaway:
      "Genesis 35 is renewal mixed with sorrow.\n\nGod brings Jacob back to worship, but the family still walks through grief.",
  },
  {
    chapter: 36,
    title: "Esau's Line Becomes Edom",
    reflection: "How does Genesis 36 help you remember that God knows every family line, even outside the main covenant focus?",
    opening:
      "Genesis 36 slows down to trace Esau's descendants. At first, it can feel like a list of names, but it explains how Esau becomes Edom and how the brothers' lines separate into future peoples. Jacob carries the covenant line, but Esau's story does not disappear. Genesis gives his family a place in the record.",
    beginsWith: ["Esau being identified as Edom", "Esau's wives and sons being listed", "Esau moving to Mount Seir", "chiefs and kings appearing in Edom", "the brothers' lines separating", "the Joseph story being prepared next"],
    matters:
      "This chapter matters because it explains Edom, a people who will matter later in the Old Testament. It also shows that family conflict can grow into national history.",
    watchFor: ["why Esau is called Edom", "how geography and genealogy work together", "what the KJV word dukes means", "why Edom's kings are mentioned", "how this chapter closes Esau's branch before Joseph begins"],
    takeaway:
      "Genesis 36 is not filler.\n\nIt shows Esau's line becoming Edom while Jacob's covenant line moves toward the Joseph story.",
  },
];

function buildJacobStudyIntro(day: JacobDay) {
  return `${day.opening}

# 📍 Where This Chapter Begins

**The chapter opens with:**

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

const devotionalDays = jacobDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Genesis",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: buildJacobStudyIntro(day),
}));

async function upsertWrestlingOfJacobStudy() {
  const title = "The Wrestling of Jacob";
  const description =
    "A 9-chapter Bible Buddy journey through Genesis 28-36 with intro, Bible reading, notes, trivia, Scrambled, and reflection centered on Jacob fleeing, Bethel, Rachel and Leah, Laban's deception, family rivalry, the tribes of Israel, wrestling with God, reconciliation with Esau, Dinah, renewal at Bethel, and Esau's line becoming Edom.";

  const { data: existing, error: existingError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", title)
    .maybeSingle();

  if (existingError) throw existingError;

  let devotionalId = existing?.id as string | undefined;

  if (devotionalId) {
    const { error } = await supabase
      .from("devotionals")
      .update({
        subtitle: "A 9-Chapter Journey",
        description,
        total_days: devotionalDays.length,
      })
      .eq("id", devotionalId);

    if (error) throw error;
  } else {
    const { data, error } = await supabase
      .from("devotionals")
      .insert({
        title,
        subtitle: "A 9-Chapter Journey",
        description,
        total_days: devotionalDays.length,
      })
      .select("id")
      .single();

    if (error) throw error;
    devotionalId = data.id as string;
  }

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", devotionalDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of devotionalDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Wrestling of Jacob day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log("The Wrestling of Jacob is now a 9-chapter journey.");
}

upsertWrestlingOfJacobStudy().catch((error) => {
  console.error(error);
  process.exit(1);
});
