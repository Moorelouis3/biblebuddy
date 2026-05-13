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

type JosephDay = {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string;
};

const josephChapterDays = [
  {
    chapter: 37,
    title: "The Coat, the Dreams, and the Pit",
    reflection: "What does Genesis 37 show you about favor, jealousy, family pain, and God's hidden plan?",
    focus:
      "Joseph steps into the center of the story. The coat, the dreams, and the brothers' jealousy all collide until Joseph is stripped, thrown into a pit, and sold into Egypt.",
    application:
      "The story does not begin in a vacuum. Jacob loved Rachel deeply, and Joseph was Rachel's long-awaited son. If you want the family background, Genesis 29-30 explains why Joseph carried so much emotional weight in Jacob's house. But today's full chapter focus is Genesis 37, because this is where Joseph's testing begins.",
    closing:
      "People can strip what they see, but they cannot strip what God has spoken. The coat can be taken. The dream cannot.",
  },
  {
    chapter: 38,
    title: "Judah's Detour",
    reflection: "What does Genesis 38 teach you about guilt, compromise, and the beginning of repentance?",
    focus:
      "Genesis 38 turns aside to Judah, but it is not a random interruption. Judah helped sell Joseph, and now God begins exposing and reshaping the brother who will later stand in the gap for Benjamin.",
    application:
      "God is not only forming Joseph in Egypt. He is also dealing with the family that betrayed him. Judah's confession, 'She is more righteous than I,' is an early crack in a hardened heart.",
    closing: "Real repentance is not just feeling bad. It becomes a different kind of action when the test comes again.",
  },
  {
    chapter: 39,
    title: "Faithful in Potiphar's House",
    reflection: "What does Genesis 39 teach you about integrity when life is unfair?",
    focus:
      "Joseph is in Egypt, far from home and far from the coat, but Genesis 39 keeps repeating the most important truth: the Lord was with Joseph.",
    application:
      "Joseph serves faithfully, resists temptation, and chooses integrity even when obedience costs him. He is falsely accused and imprisoned, but his character is not imprisoned.",
    closing:
      "God's presence is not proven by easy circumstances. Sometimes His presence is revealed by the character He forms in unfair ones.",
  },
  {
    chapter: 40,
    title: "Serving While Forgotten",
    reflection: "How can you stay faithful with your gifts while you are still waiting for your own breakthrough?",
    focus:
      "Genesis 40 shows Joseph in prison, still noticing people, still serving, and still pointing others back to God.",
    application:
      "Joseph interprets dreams for the cupbearer and baker, but the chapter ends with the cupbearer forgetting him. That kind of waiting is a deep test.",
    closing: "Waiting does not have to become wasting. Joseph's prison still became a place of faithfulness.",
  },
  {
    chapter: 41,
    title: "From Prison to Wisdom",
    reflection: "What does Genesis 41 teach you about being ready when God opens a door?",
    focus:
      "After two full years, Pharaoh dreams, the cupbearer remembers, and Joseph is brought from prison to the palace in a single day.",
    application:
      "Joseph does not grab glory. He gives credit to God, interprets the dreams, and gives wise counsel for Egypt's future. His gift opens the door, but his wisdom makes him useful.",
    closing: "God can open a door suddenly, but He often forms the person slowly. Joseph was made ready before the palace ever called.",
  },
  {
    chapter: 42,
    title: "The Past Walks Into the Room",
    reflection: "How does Genesis 42 challenge the way you respond when old wounds resurface?",
    focus:
      "Joseph's brothers come to Egypt for grain, bow before him, and do not recognize the brother they sold.",
    application:
      "Joseph has power now, but he does not use it carelessly. He tests his brothers to see whether they have changed, and he weeps because the wound is still real.",
    closing: "Maturity is not pretending the past did not hurt. Maturity is refusing to let hurt become your master.",
  },
  {
    chapter: 43,
    title: "Benjamin at the Table",
    reflection: "What does Genesis 43 teach you about emotion, wisdom, and the slow work of rebuilding trust?",
    focus:
      "Benjamin comes to Egypt, Judah takes responsibility, and Joseph nearly breaks when he sees Rachel's other son.",
    application:
      "Joseph watches how the brothers respond when Benjamin receives special favor. The old jealousy could return, so Joseph lets the moment reveal what is in them.",
    closing: "Forgiveness does not always mean instant closeness. Sometimes love waits for truth to become visible.",
  },
  {
    chapter: 44,
    title: "Judah Stands in the Gap",
    reflection: "Where do you see real repentance in Judah's actions, not just his words?",
    focus:
      "Joseph gives the brothers one final test. Benjamin appears guilty, and the brothers can save themselves by abandoning Rachel's son again.",
    application:
      "Judah steps forward and offers himself in Benjamin's place. The man who once helped sell a brother is now willing to sacrifice himself for a brother.",
    closing: "Real repentance shows up when the old test returns and you choose a new way.",
  },
  {
    chapter: 45,
    title: "I Am Joseph",
    reflection: "How does Joseph's view of God's providence make forgiveness possible?",
    focus:
      "Joseph can no longer hold back. He reveals himself to his brothers with the words, 'I am Joseph.'",
    application:
      "Joseph does not deny their sin. He says they sold him. But he also sees God's larger hand: God sent him ahead to preserve life.",
    closing: "Forgiveness becomes possible when you trust that God is greater than what people did to you.",
  },
  {
    chapter: 46,
    title: "Jacob Goes Down to Egypt",
    reflection: "What does Genesis 46 teach you about trusting God when restoration does not look like returning to the old life?",
    focus:
      "Jacob hears Joseph is alive and begins the journey to Egypt. God meets him with the promise that Egypt is part of the plan.",
    application:
      "Joseph and Jacob reunite with deep weeping, but restoration does not mean everything goes back to the way it was. God is redeeming the family forward.",
    closing: "God does not always rewind the story. He carries it into the next chapter with His faithfulness still intact.",
  },
  {
    chapter: 47,
    title: "Life in Goshen",
    reflection: "What does Genesis 47 show you about God's provision in a place that was not originally home?",
    focus:
      "Jacob's family settles in Goshen while Joseph continues stewarding Egypt through famine.",
    application:
      "This chapter shows both provision and tension. Israel is preserved in Egypt, but Egypt is not the final promise. God can provide in a temporary place while still keeping His people pointed toward a future hope.",
    closing: "Sometimes God sustains you in a place you would not have chosen, while still moving the bigger promise forward.",
  },
  {
    chapter: 48,
    title: "Blessing Ephraim and Manasseh",
    reflection: "How does Genesis 48 show God's grace working beyond expected order and human control?",
    focus:
      "Jacob blesses Joseph's sons, Ephraim and Manasseh, and brings them into the covenant family story.",
    application:
      "The younger is placed before the older, reminding us that Genesis has always been a story where God's grace does not simply follow human expectation. Joseph's suffering is now connected to future blessing for his children.",
    closing: "God's redemption is not only about surviving the test. It can become blessing that reaches the next generation.",
  },
  {
    chapter: 49,
    title: "Jacob Blesses His Sons",
    reflection: "What does Genesis 49 teach you about legacy, consequences, and God's promises moving through imperfect people?",
    focus:
      "Jacob gathers his sons and speaks over their futures. The family history is not erased; character, choices, and promise all matter.",
    application:
      "Judah receives a royal promise, Joseph receives words of fruitfulness through affliction, and the covenant story keeps moving through a deeply imperfect family.",
    closing: "God's promise does not require a perfect family tree. He is faithful through flawed people, painful histories, and surprising grace.",
  },
  {
    chapter: 50,
    title: "God Meant It for Good",
    reflection: "Where do you need to trust that human evil is real, but not ultimate?",
    focus:
      "Jacob dies, the brothers fear revenge, and Joseph gives the sentence that explains the whole journey: 'You meant evil against me, but God meant it for good.'",
    application:
      "Joseph does not call evil good. He names it honestly. But he also sees that God was working above it, through it, and beyond it to preserve life.",
    closing: "The pit was not the end. The prison was not the end. Egypt was not the end. God was writing a bigger story.",
  },
] as const;

const josephDays: JosephDay[] = josephChapterDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Genesis",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: `Today's full chapter focus is Genesis ${day.chapter}.

${day.focus}

${day.application}

${day.closing}`,
}));

async function restructureTestingOfJoseph() {
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Testing of Joseph")
    .maybeSingle();

  if (devotionalError) throw devotionalError;
  if (!devotional) throw new Error("Could not find devotional titled The Testing of Joseph.");

  const devotionalId = devotional.id as string;

  const { error: updateDevotionalError } = await supabase
    .from("devotionals")
    .update({
      subtitle: "A 14-Day Chapter Journey",
      description:
        "A 14-chapter Bible study through Genesis 37-50. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so Joseph's testing, waiting, wisdom, reconciliation, and God's providence stay centered on the same passage.",
      total_days: josephDays.length,
    })
    .eq("id", devotionalId);

  if (updateDevotionalError) throw updateDevotionalError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", josephDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of josephDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Joseph day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log(`The Testing of Joseph is now a ${josephDays.length}-day chapter journey.`);
}

restructureTestingOfJoseph().catch((error) => {
  console.error(error);
  process.exit(1);
});
