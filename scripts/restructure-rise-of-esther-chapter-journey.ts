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

type EstherDay = {
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

const beginsWithIcons = ["🎬", "👑", "📍", "🔥", "🧭"];
const watchForIcons = ["👀", "⚖️", "📜", "🎭", "🔥"];

const estherChapterDays: EstherDay[] = [
  {
    chapter: 1,
    title: "The Fall of Vashti",
    reflection: "Where do you see pride, image, or fear trying to control the way people make decisions?",
    opening:
      "Esther 1 opens with power, luxury, pride, and celebration. But underneath the gold, wine, and royal authority, the chapter is already showing cracks in the Persian empire.",
    beginsWith: [
      "Ahasuerus showing off the size and wealth of Persia",
      "royal feasts filled with excess and image",
      "Queen Vashti refusing the king's command",
      "court advisors turning one refusal into empire-wide fear",
    ],
    matters:
      "This chapter matters because it introduces one of Esther's biggest themes: the instability of human power. Persia looks unstoppable on the outside, but inside the palace the empire is being shaped by pride, impulse, fear, and image.",
    watchFor: [
      "how alcohol and public honor shape the king's decision",
      "how quickly fear spreads through leadership",
      "how Persian law becomes a trap once written",
      "how Vashti's removal creates the opening Esther will later enter",
    ],
    takeaway:
      "Esther begins by showing a kingdom that looks powerful but is fragile underneath the surface. The chapter quietly asks what happens when people build power on pride, appearance, fear, and control.",
  },
  {
    chapter: 2,
    title: "Esther Enters the Palace",
    reflection: "How might God be working in a hidden season before the reason becomes clear?",
    opening:
      "Esther 2 moves from the empty queen's place to Esther herself. The chapter introduces an orphaned Jewish girl, her guardian Mordecai, and the palace system that draws her into Persian power.",
    beginsWith: [
      "the king's servants proposing a search for a new queen",
      "Mordecai and Esther being introduced in exile",
      "Esther hiding her Jewish identity",
      "Esther gaining favor and becoming queen",
      "Mordecai uncovering a plot against the king",
    ],
    matters:
      "This chapter matters because Esther's rise is not simple or painless. She is lifted into influence while carrying grief, hidden identity, and life inside a system she did not design.",
    watchFor: [
      "how Esther's orphan background makes her feel human",
      "how favor appears quietly throughout the chapter",
      "how Mordecai watches and protects from the outside",
      "how the forgotten record of Mordecai's loyalty becomes important later",
    ],
    takeaway:
      "Esther's crown is not only a promotion. It is placement. God is quietly positioning her before the danger is fully visible.",
  },
  {
    chapter: 3,
    title: "Haman's Rage",
    reflection: "Where can wounded pride become dangerous if it is not brought under God's authority?",
    opening:
      "Esther 3 brings the enemy onto the stage. Haman rises in power, Mordecai refuses to bow, and one man's pride turns into a death sentence for the Jews.",
    beginsWith: [
      "Haman being promoted above the princes",
      "Mordecai refusing to bow at the king's gate",
      "Haman's anger growing beyond one man",
      "Pur being cast to choose the date",
      "a decree going out across the empire",
    ],
    matters:
      "This chapter matters because private hatred becomes public policy. Haman uses the king's system to turn ethnic hatred into law.",
    watchFor: [
      "how Haman's Agagite background adds old tension",
      "how Mordecai's refusal exposes Haman's pride",
      "how Haman hides hatred under political language",
      "how the city is left confused while the king and Haman drink",
    ],
    takeaway:
      "Esther 3 shows how dangerous pride becomes when it gains authority. Evil does not always look chaotic; sometimes it arrives sealed, written, and official.",
  },
  {
    chapter: 4,
    title: "For Such a Time as This",
    reflection: "What responsibility might God be placing in front of you that fear wants you to avoid?",
    opening:
      "Esther 4 is the heart of the book. Grief fills the streets, Mordecai challenges Esther, and Esther must decide whether she will risk her life for her people.",
    beginsWith: [
      "Mordecai mourning in sackcloth and ashes",
      "Esther learning the full danger of the decree",
      "the law about approaching the king uncalled",
      "Mordecai naming Esther's moment",
      "Esther calling for fasting and choosing courage",
    ],
    matters:
      "This chapter matters because Esther's position becomes responsibility. She has to choose whether palace safety will silence her or whether she will step into the moment God has allowed her to hold.",
    watchFor: [
      "how grief moves from the streets to the palace",
      "how Mordecai tells Esther the truth without softening the cost",
      "how the golden scepter shows the danger of approaching the king",
      "how fasting prepares Esther before action",
    ],
    takeaway:
      "Courage in Esther 4 is not loud confidence. It is trembling obedience that says, If I perish, I perish.",
  },
  {
    chapter: 5,
    title: "The First Banquet",
    reflection: "Where do you need courage and wisdom together instead of rushing ahead in panic?",
    opening:
      "Esther 5 turns courage into movement. Esther enters the court, receives the king's scepter, and begins a careful banquet strategy while Haman's pride grows darker.",
    beginsWith: [
      "Esther putting on royal apparel",
      "the king extending the golden scepter",
      "Esther inviting the king and Haman to a banquet",
      "Haman raging because Mordecai still will not bow",
      "the gallows being built for Mordecai",
    ],
    matters:
      "This chapter matters because Esther shows that courage can be patient and strategic. She does not blurt out everything. She moves with timing.",
    watchFor: [
      "how close Esther comes to danger in the inner court",
      "how the king keeps asking for her petition",
      "how Haman can enjoy honor and still be ruled by one offense",
      "how the gallows prepare the next reversal",
    ],
    takeaway:
      "Esther 5 teaches that wise courage is not always instant. Sometimes the brave thing is to step forward, wait, and speak at the right time.",
  },
  {
    chapter: 6,
    title: "The Great Reversal Begins",
    reflection: "What forgotten act of faithfulness do you need to trust God still sees?",
    opening:
      "Esther 6 is built on timing no human could control. A king cannot sleep, an old record is read, and Haman is forced to honor the man he planned to kill.",
    beginsWith: [
      "the king's sleepless night",
      "Mordecai's loyalty being found in the chronicles",
      "Haman entering to ask for Mordecai's death",
      "Haman describing the honor he wants for himself",
      "Mordecai being honored publicly",
    ],
    matters:
      "This chapter matters because it shows providence without a visible miracle. God is not named, but the timing is too perfect to ignore.",
    watchFor: [
      "how a sleepless night changes everything",
      "how delayed honor becomes perfectly timed honor",
      "how pride blinds Haman",
      "how public humiliation begins Haman's fall",
    ],
    takeaway:
      "Esther 6 shows that God can turn a story through ordinary details: insomnia, records, timing, and a proud man's wrong assumption.",
  },
  {
    chapter: 7,
    title: "Haman Falls",
    reflection: "Where do you need the courage to name the truth clearly?",
    opening:
      "Esther 7 is the banquet where hidden danger becomes public truth. Esther names her request, reveals her people, and exposes Haman.",
    beginsWith: [
      "the king asking again for Esther's petition",
      "Esther asking for her life and the life of her people",
      "Haman being named as the adversary",
      "the king leaving in anger",
      "Haman being hanged on the gallows he built",
    ],
    matters:
      "This chapter matters because Esther's voice changes the room. The enemy is exposed at the king's own table, and justice begins through reversal.",
    watchFor: [
      "how Esther ties her own life to her people",
      "how Haman's hidden plot is dragged into the light",
      "how the gallows become a symbol of reversal",
      "how Haman dies by the instrument he prepared for Mordecai",
    ],
    takeaway:
      "Esther 7 teaches that truth spoken at the right time can expose evil that power tried to hide.",
  },
  {
    chapter: 8,
    title: "The Counter Decree",
    reflection: "Where does faithfulness require you to keep pressing for repair after one victory?",
    opening:
      "Esther 8 shows that Haman's death is not the end of the danger. The old decree still stands, so Esther must plead again for her people.",
    beginsWith: [
      "Haman's house being given to Esther",
      "Mordecai receiving the king's ring",
      "Esther pleading with tears",
      "a new decree giving Jews the right to defend themselves",
      "joy spreading through the empire",
    ],
    matters:
      "This chapter matters because deliverance has to become practical. The danger must be answered in writing, in law, and across every province.",
    watchFor: [
      "how Esther continues after Haman is gone",
      "how Persian law creates a legal problem",
      "how Mordecai's authority replaces Haman's",
      "how mourning turns into light, gladness, joy, and honor",
    ],
    takeaway:
      "Esther 8 teaches that courage keeps going after the dramatic moment. Esther pleads until her people have a real path to survive.",
  },
  {
    chapter: 9,
    title: "Purim Established",
    reflection: "What deliverance do you need to remember, retell, and celebrate instead of forgetting?",
    opening:
      "Esther 9 reaches the day Haman chose for destruction. But the day turns the other way, and the Jewish people survive, rest, and establish Purim.",
    beginsWith: [
      "the thirteenth day of Adar arriving",
      "the enemies of the Jews being defeated",
      "the repeated detail that the Jews do not take spoil",
      "rest turning into feasting and gladness",
      "Purim being written into memory",
    ],
    matters:
      "This chapter matters because deliverance becomes remembrance. The rescue is not only survived; it is written, celebrated, and passed on.",
    watchFor: [
      "how the phrase turned to the contrary captures the whole story",
      "how the Jews defend themselves instead of plundering",
      "how sorrow turns to joy",
      "how Purim is tied to memory, generosity, and future generations",
    ],
    takeaway:
      "Esther 9 teaches that rescued people must remember. Purim turns fear into testimony and survival into shared joy.",
  },
  {
    chapter: 10,
    title: "Mordecai's Legacy",
    reflection: "How can the influence God gives you be used for the good and peace of others?",
    opening:
      "Esther 10 is short, but it closes the book with Mordecai's legacy. The Jewish people are alive, and Mordecai uses influence to seek their peace.",
    beginsWith: [
      "Ahasuerus still ruling a wide empire",
      "Mordecai's greatness recorded in royal chronicles",
      "Mordecai standing next to the king",
      "Mordecai being accepted by his people",
      "peace being spoken to the next generation",
    ],
    matters:
      "This chapter matters because the story ends with influence being used for others. Mordecai's greatness is measured by service, not self-display.",
    watchFor: [
      "how the ending is quiet but weighty",
      "how records frame the legacy of Mordecai",
      "how survival becomes stability",
      "how leadership is described as seeking the welfare of the people",
    ],
    takeaway:
      "Esther 10 teaches that real greatness serves. Mordecai rises, but his legacy is the peace and welfare of his people.",
  },
];

function buildEstherStudyIntro(day: EstherDay) {
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

const estherDays = estherChapterDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Esther",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: buildEstherStudyIntro(day),
}));

async function restructureRiseOfEsther() {
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Rise of Esther")
    .maybeSingle();

  if (devotionalError) throw devotionalError;
  if (!devotional) throw new Error("Could not find devotional titled The Rise of Esther.");

  const devotionalId = devotional.id as string;

  const { error: updateDevotionalError } = await supabase
    .from("devotionals")
    .update({
      subtitle: "A 10-Chapter Journey",
      description:
        "A 10-chapter Bible study through Esther 1-10. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so Esther's courage, hidden identity, palace pressure, providence, reversal, and legacy stay centered on the same passage.",
      total_days: estherDays.length,
    })
    .eq("id", devotionalId);

  if (updateDevotionalError) throw updateDevotionalError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", estherDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of estherDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Esther day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log(`The Rise of Esther is now a ${estherDays.length}-chapter journey.`);
}

restructureRiseOfEsther().catch((error) => {
  console.error(error);
  process.exit(1);
});
