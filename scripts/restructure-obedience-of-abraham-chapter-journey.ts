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

type AbrahamDay = {
  chapter: number;
  title: string;
  reflection: string;
  opening: string;
  beginsWith: string[];
  matters: string;
  givesUs: string[];
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

const beginsWithIcons = ["🎬", "👂", "🛣️", "🔥", "🔎"];
const watchForIcons = ["👀", "⚠️", "📍", "💬", "🧭"];

const abrahamChapterDays: AbrahamDay[] = [
  {
    chapter: 11,
    title: "The Family Before the Call",
    reflection: "What unfinished place in your life might God still be preparing to speak into?",
    opening:
      "Genesis 11 gives the background before Abraham ever hears the call. The chapter moves from Babel's proud attempt to make a name to Terah's family beginning a journey that stops short in Haran.",
    beginsWith: [
      "the people of Babel trying to build upward without surrender",
      "God scattering pride before it hardens into a false security",
      "the line of Shem narrowing toward Abram",
      "Terah's household leaving Ur and starting toward Canaan",
      "the family settling in Haran before the promise fully opens",
    ],
    matters:
      "This chapter matters because Abraham's story does not begin with a perfect spiritual moment. It begins inside family history, grief, movement, and an unfinished road. God often begins His call before a person understands how much is being prepared.",
    givesUs: ["🏙️ Babel", "🧬 family line", "🧳 movement", "⏸️ Haran", "🌅 a story about to open"],
    watchFor: [
      "how human pride at Babel contrasts with Abraham's future life of trust",
      "how the genealogy slows down as Abram comes into view",
      "how Sarai's barrenness is named before the promise is given",
      "how the road toward Canaan begins before Abram receives his direct call",
      "how God can work inside an unfinished family journey",
    ],
    takeaway:
      "Genesis 11 is about the background before the breakthrough. It prepares you to see that Abraham's obedience grows out of a real family story, not a clean spiritual fantasy.",
  },
  {
    chapter: 12,
    title: "Go to the Land I Will Show You",
    reflection: "What step has God already made clear that you may be overthinking instead of obeying?",
    opening:
      "Genesis 12 is where Abram's life begins to move by the word of God. The Lord calls him to leave what is familiar and walk toward a future that is promised before it is fully explained.",
    beginsWith: [
      "God calling Abram away from country, kindred, and father's house",
      "a promise of land, nation, blessing, and blessing for all families of the earth",
      "Abram building altars in the land God shows him",
      "famine pushing Abram into Egypt",
      "fear causing Abram to risk Sarai through a half-truth",
    ],
    matters:
      "This chapter matters because it shows both real obedience and real weakness in the same man. Abram goes when God speaks, but fear still rises when famine arrives. Faith is real, but it is not yet fully matured.",
    givesUs: ["📣 calling", "🛣️ obedience", "🪨 altars", "🌾 famine", "⚠️ fear"],
    watchFor: [
      "how God gives a promise before Abram receives a map",
      "how altars mark places where Abram responds to God's presence",
      "how famine tests faith immediately after obedience",
      "how fear makes Abram protect himself at Sarai's expense",
      "how God protects the promise even when Abram acts poorly",
    ],
    takeaway:
      "Genesis 12 is about stepping out on God's word while still needing God to shape the heart. Abram obeys, stumbles, and is preserved by grace.",
  },
  {
    chapter: 13,
    title: "Trusting God Enough to Let Go",
    reflection: "When relationships get tense, do you trust God enough to choose peace over grasping?",
    opening:
      "Genesis 13 shows that obedience is tested not only by leaving, but also by how a person handles blessing, conflict, and opportunity.",
    beginsWith: [
      "Abram returning from Egypt with great possessions",
      "the land becoming too crowded for Abram and Lot together",
      "strife rising between their herdsmen",
      "Abram giving Lot the first choice",
      "God renewing the promise after Abram releases control",
    ],
    matters:
      "This chapter matters because Abram refuses to secure his future by grasping. He can let Lot choose first because he believes God's promise is stronger than the visible advantage.",
    givesUs: ["🤝 peace", "🌄 choice", "👀 Lot's eyes", "🧭 Abram's trust", "📜 promise renewed"],
    watchFor: [
      "how prosperity can create pressure if the heart is not guarded",
      "how Abram values peace more than winning the best-looking land",
      "how Lot chooses by sight and moves toward Sodom",
      "how God speaks after Abram surrenders the first choice",
      "how faith frees a person from frantic self-protection",
    ],
    takeaway:
      "Genesis 13 is about trusting God enough to let go. Abram learns that the promise does not need to be protected by selfishness.",
  },
  {
    chapter: 14,
    title: "Courage, Rescue, and Worship",
    reflection: "Where might God be asking you to act with courage instead of standing at a distance?",
    opening:
      "Genesis 14 suddenly puts Abram in the middle of kings, war, rescue, blessing, and worship. Faith is no longer only about travel. It now requires courage.",
    beginsWith: [
      "regional kings going to war",
      "Lot being captured because he lives near Sodom",
      "Abram gathering trained men to rescue his family",
      "Melchizedek blessing Abram after the victory",
      "Abram refusing to let the king of Sodom claim credit for his wealth",
    ],
    matters:
      "This chapter matters because Abram's obedience is active. He rescues, fights, receives blessing, gives a tithe, and refuses a compromise that could confuse who truly provides for him.",
    givesUs: ["⚔️ battle", "🛡️ rescue", "🍞 Melchizedek", "🙌 worship", "🚫 refusal"],
    watchFor: [
      "how Lot's earlier direction now creates real danger",
      "how Abram's courage is connected to covenant responsibility",
      "how Melchizedek points Abram back to God Most High",
      "how worship follows victory before pride can take over",
      "how Abram refuses gain that would tie his blessing to Sodom",
    ],
    takeaway:
      "Genesis 14 is about courage under God's authority. Abram's strength is not meant to become pride; it is meant to stay surrendered.",
  },
  {
    chapter: 15,
    title: "Looking at the Stars",
    reflection: "What promise of God feels hardest to hold onto because the current facts look so different?",
    opening:
      "Genesis 15 lets us hear Abram's honest fear and ache. The man who has obeyed still carries the question of an unfulfilled promise.",
    beginsWith: [
      "God telling Abram not to fear",
      "Abram naming the pain of having no child",
      "God bringing Abram outside to look at the stars",
      "Abram believing the Lord and being counted righteous",
      "God making covenant promises about land, descendants, suffering, and deliverance",
    ],
    matters:
      "This chapter matters because biblical faith is not pretending delay does not hurt. Abram brings his ache to God, and God answers with promise, covenant, and a vision bigger than one lifetime.",
    givesUs: ["🛡️ reassurance", "🌌 stars", "🙏 faith", "📜 covenant", "🔥 God's commitment"],
    watchFor: [
      "how God speaks comfort before Abram asks his question",
      "how Abram's honesty is brought into relationship with God",
      "how righteousness is connected to trusting God's word",
      "how the covenant ceremony shows God binding Himself to the promise",
      "how God sees both future suffering and future deliverance",
    ],
    takeaway:
      "Genesis 15 is about believing God in the gap between promise and fulfillment. Abram does not yet hold the son, but he holds the word.",
  },
  {
    chapter: 16,
    title: "When Waiting Gets Dangerous",
    reflection: "Where are you tempted to rush what God told you to trust Him with?",
    opening:
      "Genesis 16 is painful because waiting turns into control. Sarai, Abram, and Hagar are pulled into a human solution that creates real wounds.",
    beginsWith: [
      "Sarai naming the pain of barrenness",
      "Abram listening to a plan God did not command",
      "Hagar conceiving and the household breaking into conflict",
      "Hagar fleeing into the wilderness",
      "the Angel of the Lord finding Hagar and naming her future",
    ],
    matters:
      "This chapter matters because impatience does not stay private. When people try to force God's promise by fleshly wisdom, others often carry the pain of that decision.",
    givesUs: ["⏳ waiting", "⚠️ control", "💔 household pain", "🏜️ Hagar", "👁️ El Roi"],
    watchFor: [
      "how delay exposes what people really believe about God",
      "how Abram's passivity harms the people around him",
      "how Hagar is seen by God even when mistreated by people",
      "how a fast result is not the same thing as God's fulfillment",
      "how mercy appears in the wilderness",
    ],
    takeaway:
      "Genesis 16 is about the danger of forcing what God promised to give. It warns us that human shortcuts can create long pain.",
  },
  {
    chapter: 17,
    title: "Covenant and New Names",
    reflection: "Can you receive what God says about your future even when it feels too large to make sense?",
    opening:
      "Genesis 17 brings covenant identity into clearer focus. Abram and Sarai receive new names because God is naming the future over them.",
    beginsWith: [
      "God revealing Himself as God Almighty",
      "Abram falling on his face before the Lord",
      "Abram becoming Abraham and Sarai becoming Sarah",
      "circumcision being given as the covenant sign",
      "God promising Isaac through Sarah despite Abraham's laughter",
    ],
    matters:
      "This chapter matters because God's covenant does not merely add information. It marks identity, body, family, and future. Abraham must live under a promise that still sounds impossible.",
    givesUs: ["🙇 surrender", "🪪 new names", "📜 covenant", "✂️ sign", "😂 impossible promise"],
    watchFor: [
      "how God calls Abraham to walk before Him and be wholehearted",
      "how a new name carries a future Abraham cannot produce alone",
      "how covenant has both promise and obedience",
      "how Abraham still struggles to imagine Sarah bearing Isaac",
      "how God names Isaac before Isaac exists",
    ],
    takeaway:
      "Genesis 17 is about covenant identity. God names Abraham according to promise before the visible evidence arrives.",
  },
  {
    chapter: 18,
    title: "The God Who Draws Near",
    reflection: "Do you believe God wants closeness with you, not just outward obedience from you?",
    opening:
      "Genesis 18 shows Abraham receiving divine visitors, hearing the Isaac promise again, and being drawn into intercession for Sodom.",
    beginsWith: [
      "Abraham welcoming three visitors with urgent hospitality",
      "Sarah hearing the promise and laughing inside the tent",
      "the Lord asking whether anything is too hard for Him",
      "God revealing His concern about Sodom",
      "Abraham pleading for mercy with reverent boldness",
    ],
    matters:
      "This chapter matters because Abraham's walk with God becomes relationally deep. He is not only called to obey; he is invited near enough to speak, ask, and intercede.",
    givesUs: ["🏕️ hospitality", "😂 Sarah's laugh", "❓ impossible made possible", "⚖️ justice", "🙏 intercession"],
    watchFor: [
      "how Abraham honors the visitors before he fully understands the moment",
      "how Sarah's hidden laughter is still heard by God",
      "how the question about God's power prepares the reader for Isaac",
      "how Abraham's friendship with God includes concern for justice",
      "how reverence and bold prayer can stand together",
    ],
    takeaway:
      "Genesis 18 is about closeness with God. Abraham learns that covenant life includes hospitality, promise, honesty, and intercession.",
  },
  {
    chapter: 19,
    title: "Mercy and Judgment",
    reflection: "How does remembering God's holiness change the way you think about obedience?",
    opening:
      "Genesis 19 is a dark chapter near Abraham's story. Sodom's judgment arrives, Lot is rescued by mercy, and the danger of living near corruption becomes painfully clear.",
    beginsWith: [
      "the angels entering Sodom and Lot sitting at the gate",
      "the city's wickedness coming into the open",
      "Lot hesitating even while judgment is near",
      "God mercifully pulling Lot's family out",
      "Sodom falling and Lot's household carrying deep damage",
    ],
    matters:
      "This chapter matters because the God of promise is also holy. Abraham's intercession in Genesis 18 is followed by the reality that mercy and judgment are both part of God's character.",
    givesUs: ["🌃 Sodom", "⚠️ warning", "🤲 mercy", "🔥 judgment", "💔 consequences"],
    watchFor: [
      "how Lot is too attached to a place that is destroying him",
      "how hesitation can become dangerous when God is calling someone out",
      "how mercy physically pulls Lot away from judgment",
      "how Abraham's earlier prayer is not forgotten",
      "how compromise leaves wounds even after rescue",
    ],
    takeaway:
      "Genesis 19 is about the seriousness of holiness. God is merciful, but the chapter refuses to treat sin as harmless.",
  },
  {
    chapter: 20,
    title: "Old Fears Return",
    reflection: "What fear keeps showing back up in your life even after God has already helped you before?",
    opening:
      "Genesis 20 is uncomfortable because Abraham repeats an old failure. The same fear that appeared in Egypt returns in Gerar.",
    beginsWith: [
      "Abraham calling Sarah his sister again",
      "Abimelech taking Sarah into his house",
      "God warning Abimelech in a dream",
      "Abraham explaining his fear",
      "God protecting Sarah and restoring the situation",
    ],
    matters:
      "This chapter matters because growth is not always clean and straight. Abraham has received covenant promises, but fear still bends his judgment.",
    givesUs: ["🔁 repeated fear", "😟 self-protection", "🛑 God's warning", "🩹 correction", "🛡️ protection"],
    watchFor: [
      "how old patterns can return even after real encounters with God",
      "how Abraham's fear puts Sarah and others at risk",
      "how God intervenes to protect the promise",
      "how Abimelech shows more integrity than Abraham in the moment",
      "how grace corrects without pretending the failure was small",
    ],
    takeaway:
      "Genesis 20 is about old fears needing deeper healing. Abraham's failure is real, but God's faithfulness is still stronger.",
  },
  {
    chapter: 21,
    title: "Isaac at Last",
    reflection: "Where do you need to remember that God's delay is not the same as God's denial?",
    opening:
      "Genesis 21 finally brings the promised son. Isaac is born, Sarah laughs with joy, and years of waiting are answered by God's faithfulness.",
    beginsWith: [
      "the Lord visiting Sarah as He had promised",
      "Isaac being born to Abraham in old age",
      "Sarah's laughter turning from doubt into joy",
      "conflict rising around Hagar and Ishmael",
      "God caring for Hagar, Ishmael, and Abraham's household future",
    ],
    matters:
      "This chapter matters because fulfillment arrives, but the story still carries complexity. God's promise is joyful, yet the consequences of earlier choices still require mercy and wisdom.",
    givesUs: ["👶 Isaac", "😂 joy", "💔 family pain", "🏜️ provision", "🌳 worship"],
    watchFor: [
      "how God's timing is exact even when it feels late",
      "how Isaac's birth proves the promise did not die in delay",
      "how earlier compromise still creates household pain",
      "how God hears Ishmael in the wilderness",
      "how Abraham calls on the Everlasting God",
    ],
    takeaway:
      "Genesis 21 is about promise fulfilled in God's time. The waiting was long, but the word of the Lord held.",
  },
  {
    chapter: 22,
    title: "The Lord Will Provide",
    reflection: "What promise or gift would be hardest for you to surrender back to God?",
    opening:
      "Genesis 22 is the deepest test of Abraham's obedience. God asks for Isaac, the son of promise, and Abraham walks into a surrender that only makes sense if God Himself can be trusted.",
    beginsWith: [
      "God testing Abraham by naming Isaac as the offering",
      "Abraham rising early and beginning the journey",
      "Isaac carrying the wood and asking about the lamb",
      "Abraham saying God will provide",
      "the angel stopping Abraham and the ram appearing in the thicket",
    ],
    matters:
      "This chapter matters because Abraham is asked to place the promise back into God's hands. The test exposes whether he loves the gift more than the Giver.",
    givesUs: ["⛰️ Moriah", "🪵 wood", "❓ Isaac's question", "🕊️ surrender", "🐏 provision"],
    watchFor: [
      "how the text slows down the emotional weight of the journey",
      "how Abraham's obedience is immediate but not shallow",
      "how Isaac's question pierces the scene",
      "how God provides at the point of surrender",
      "how the chapter points forward to substitution and sacrifice",
    ],
    takeaway:
      "Genesis 22 is about costly trust and divine provision. Abraham learns that surrender does not outrun the goodness of God.",
  },
  {
    chapter: 23,
    title: "Grief in the Land of Promise",
    reflection: "How can faith and grief honestly exist together in your life?",
    opening:
      "Genesis 23 slows Abraham's story with grief. Sarah dies, Abraham mourns, and he purchases a burial place in the land God promised.",
    beginsWith: [
      "Sarah's death at Hebron",
      "Abraham mourning and weeping for her",
      "Abraham negotiating for the cave of Machpelah",
      "the land being purchased publicly and honorably",
      "Sarah being buried in the promised land",
    ],
    matters:
      "This chapter matters because faith does not float above sorrow. Abraham believes God's promise, yet the first clear piece of land he owns is a grave.",
    givesUs: ["😭 grief", "🪦 burial", "⚖️ honorable purchase", "📍 Machpelah", "🌱 hope in sorrow"],
    watchFor: [
      "how Scripture gives space for Abraham's mourning",
      "how promise does not remove the reality of death",
      "how Abraham acts with dignity among the Hittites",
      "how the burial site becomes a concrete sign of future hope",
      "how faith can buy a grave and still believe in promise",
    ],
    takeaway:
      "Genesis 23 is about grief held inside promise. Abraham mourns honestly while still anchoring his family in the land God named.",
  },
  {
    chapter: 24,
    title: "Guidance for the Next Generation",
    reflection: "Where do you need to seek God's guidance for decisions that will outlive this moment?",
    opening:
      "Genesis 24 shifts toward Isaac's future. Abraham sends his servant to find a wife for Isaac, and the chapter becomes a long story of prayer, guidance, and covenant continuity.",
    beginsWith: [
      "Abraham charging his servant not to take Isaac back to the old land",
      "the servant praying for specific guidance by the well",
      "Rebekah showing kindness before she knows the full story",
      "the servant worshiping when God answers",
      "Rebekah choosing to go and Isaac receiving her",
    ],
    matters:
      "This chapter matters because Abraham's obedience is now thinking generationally. The promise must continue, but not by compromise or panic.",
    givesUs: ["🧭 guidance", "🙏 prayer", "💧 well", "🤲 kindness", "💍 covenant future"],
    watchFor: [
      "how Abraham protects Isaac's connection to the promised land",
      "how the servant prays before acting",
      "how Rebekah's character is revealed through ordinary kindness",
      "how worship appears when guidance becomes clear",
      "how God's faithfulness moves from Abraham to Isaac",
    ],
    takeaway:
      "Genesis 24 is about guided faith for the next generation. Abraham's story is not ending; the promise is being carried forward.",
  },
  {
    chapter: 25,
    title: "Full of Years",
    reflection: "What kind of legacy are your daily choices quietly building?",
    opening:
      "Genesis 25 closes Abraham's earthly life and opens the next generation. The chapter records his final family lines, his death, and the beginning tension between Esau and Jacob.",
    beginsWith: [
      "Abraham's later family through Keturah",
      "Abraham giving Isaac the inheritance tied to promise",
      "Abraham dying old and full of years",
      "Isaac and Ishmael burying him together",
      "the story moving forward into Rebekah's pregnancy and Jacob and Esau",
    ],
    matters:
      "This chapter matters because Abraham's life becomes legacy. He dies, but God's promise does not. The covenant story continues beyond the first man who heard the call.",
    givesUs: ["👨‍👩‍👦 family lines", "📜 inheritance", "🕊️ death", "🤝 burial", "🌅 next generation"],
    watchFor: [
      "how Abraham's life is described as full",
      "how Isaac is distinguished as the covenant son",
      "how Ishmael is still remembered and multiplied",
      "how death does not end God's promise",
      "how the story naturally moves toward Isaac, Jacob, and the next chapter of Genesis",
    ],
    takeaway:
      "Genesis 25 is about finishing a life of faith. Abraham is not remembered as flawless; he is remembered as a man who kept walking with God.",
  },
];

function buildAbrahamStudyIntro(day: AbrahamDay) {
  return `${day.opening}

# 📍 Where This Chapter Begins

**The scene opens with:**

${formatIntroList(day.beginsWith, beginsWithIcons)}

---

# 💡 Why This Chapter Matters

${day.matters}

**This chapter gives us:**

${day.givesUs.map((item) => `* ${item}`).join("\n\n")}

---

# 🔍 What To Watch For

**As you read, pay attention to:**

${formatIntroList(day.watchFor, watchForIcons)}

---

# 🎬 The Bigger Takeaway

${formatTakeawayCallout(day.takeaway)}`;
}

const abrahamDays = abrahamChapterDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Genesis",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: buildAbrahamStudyIntro(day),
}));

async function restructureObedienceOfAbraham() {
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Obedience of Abraham")
    .maybeSingle();

  if (devotionalError) throw devotionalError;
  if (!devotional) throw new Error("Could not find devotional titled The Obedience of Abraham.");

  const devotionalId = devotional.id as string;

  const { error: updateDevotionalError } = await supabase
    .from("devotionals")
    .update({
      subtitle: "A 15-Day Chapter Journey",
      description:
        "A 15-chapter Bible study through Genesis 11-25. Each chapter follows the full Bible Buddy flow: intro, Bible reading, notes, trivia, Scrambled, and reflection, so Abraham's call, waiting, covenant, mistakes, obedience, and legacy stay centered on the same passage.",
      total_days: abrahamDays.length,
    })
    .eq("id", devotionalId);

  if (updateDevotionalError) throw updateDevotionalError;

  const { error: deleteOldDaysError } = await supabase
    .from("devotional_days")
    .delete()
    .eq("devotional_id", devotionalId)
    .gt("day_number", abrahamDays.length);

  if (deleteOldDaysError) throw deleteOldDaysError;

  for (const day of abrahamDays) {
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: devotionalId,
        ...day,
      },
      { onConflict: "devotional_id,day_number" },
    );

    if (error) throw new Error(`Failed to upsert Abraham day ${day.day_number}: ${error.message}`);
    console.log(`Upserted day ${day.day_number}: ${day.day_title} (${day.bible_reading_book} ${day.bible_reading_chapter})`);
  }

  console.log(`The Obedience of Abraham is now a ${abrahamDays.length}-day chapter journey.`);
}

restructureObedienceOfAbraham().catch((error) => {
  console.error(error);
  process.exit(1);
});
