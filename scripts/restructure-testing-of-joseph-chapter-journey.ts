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

type JosephIntroDetail = {
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

const beginsWithIcons = ["\u{1F3AC}", "\u{1F442}", "\u{26A0}\u{FE0F}", "\u{1F6E3}\u{FE0F}", "\u{1F50E}"];
const watchForIcons = ["\u{26A0}\u{FE0F}", "\u{1F440}", "\u{1F3DB}\u{FE0F}", "\u{1F512}", "\u{1F50D}"];

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

const josephIntroDetailsByChapter: Record<number, JosephIntroDetail> = {
  37: {
    opening:
      "Genesis 37 opens the Joseph story by bringing family tension into the light. Joseph is loved by Jacob in a visible way, hated by his brothers in a growing way, and marked by dreams that point beyond what anyone in the house can understand yet.",
    beginsWith: [
      "Joseph introduced as a seventeen-year-old son in Jacob's household",
      "a bad report that adds tension between Joseph and his brothers",
      "Jacob's visible favoritism through the special coat",
      "two dreams that reveal a future Joseph cannot control",
      "the brothers' jealousy turning into betrayal, the pit, and Egypt",
    ],
    matters:
      "This chapter matters because Joseph's testing begins before Egypt. It begins in the pain of family dysfunction, favoritism, jealousy, and being misunderstood. Genesis 37 shows that the road God uses can begin in a place that looks completely unfair.",
    givesUs: ["\u{1F3A8} visible favor", "\u{1F525} jealousy", "\u{1F4AD} dreams", "\u{1F573}\u{FE0F} the pit", "\u{1F6E3}\u{FE0F} the road to Egypt"],
    watchFor: [
      "how Jacob's favoritism affects the whole household",
      "how Joseph's dreams are true but still create tension",
      "how jealousy grows from hatred into violent action",
      "how the brothers hide their sin behind Joseph's coat",
      "how the chapter ends in Egypt, where God is already moving the story forward",
    ],
    takeaway:
      "Genesis 37 is about the beginning of a test Joseph did not choose. It prepares you to read the Joseph story with your eyes open: people can strip the coat, but they cannot cancel what God is quietly carrying forward.",
  },
  38: {
    opening:
      "Genesis 38 feels like a detour, but it is not random. Right after Joseph is sold, the story turns toward Judah so we can see what is happening inside the family that betrayed him.",
    beginsWith: [
      "Judah moving away from his brothers",
      "a broken household marked by sin and loss",
      "Tamar being wronged and left without justice",
      "Judah's hypocrisy being exposed through his own pledge",
      "the first sign that Judah can still be confronted by truth",
    ],
    matters:
      "This chapter matters because God is not only forming Joseph in Egypt. He is also dealing with the brother who will later stand in the gap for Benjamin. Before Judah can become a changed man, he has to face what is crooked in himself.",
    givesUs: ["\u{1F32B}\u{FE0F} drift", "\u{1F494} family damage", "\u{2696}\u{FE0F} injustice", "\u{1F50D} exposure", "\u{1F331} the beginning of change"],
    watchFor: [
      "how Judah's separation reveals the condition of his heart",
      "how Tamar sees responsibility that Judah refuses to honor",
      "how hypocrisy judges others before it judges itself",
      "how confession begins when Judah says she is more righteous than he is",
      "how God keeps the covenant line moving through a messy chapter",
    ],
    takeaway:
      "Genesis 38 is about God working in the mess, not pretending the mess is clean. It prepares you to see that Joseph is not the only one being tested; Judah is being exposed and reshaped too.",
  },
  39: {
    opening:
      "Genesis 39 brings the focus back to Joseph in Egypt. He has lost the coat, the comfort of home, and the control of his future, but the chapter keeps repeating the most important truth: the Lord was with Joseph.",
    beginsWith: [
      "Joseph serving in Potiphar's house",
      "God giving Joseph favor even in slavery",
      "temptation arriving through Potiphar's wife",
      "Joseph choosing integrity when no one else is watching",
      "a false accusation that sends Joseph to prison",
    ],
    matters:
      "This chapter matters because it shows that God's presence is not proven by easy circumstances. Joseph is faithful in a place he never wanted to be, and even when obedience costs him, God is still shaping his character.",
    givesUs: ["\u{1F6E1}\u{FE0F} integrity", "\u{1F441}\u{FE0F} hidden temptation", "\u{1F3E0} service", "\u{1F512} prison", "\u{1F64F} God's presence"],
    watchFor: [
      "how often the chapter says the Lord was with Joseph",
      "how Joseph works faithfully before any promotion arrives",
      "how temptation attacks him through secrecy and pressure",
      "how doing right does not immediately protect him from suffering",
      "how God's favor follows Joseph from the house into the prison",
    ],
    takeaway:
      "Genesis 39 is about faithfulness when life is unfair. It prepares you to see that Joseph's character is being formed long before his calling is visible.",
  },
  40: {
    opening:
      "Genesis 40 shows Joseph still in prison, but he is not spiritually shut down. He notices people, serves with his gift, and keeps pointing dream interpretation back to God.",
    beginsWith: [
      "Pharaoh's cupbearer and baker being placed in prison",
      "two troubled men with two troubling dreams",
      "Joseph paying attention to their sadness",
      "God giving Joseph the meaning of the dreams",
      "the cupbearer being restored and then forgetting Joseph",
    ],
    matters:
      "This chapter matters because waiting can either make a person bitter or faithful. Joseph is still using what God gave him even though his own situation has not changed yet.",
    givesUs: ["\u{23F3} waiting", "\u{1F441}\u{FE0F} noticing people", "\u{1F4AD} dreams", "\u{1F9E0} interpretation", "\u{1F614} being forgotten"],
    watchFor: [
      "how Joseph serves others while he still needs help himself",
      "how he refuses to take credit for what belongs to God",
      "how the dreams are fulfilled exactly as Joseph says",
      "how painful the final line feels when the cupbearer forgets him",
      "how God is still preparing the connection that will matter later",
    ],
    takeaway:
      "Genesis 40 is about serving faithfully while you are still waiting. It prepares you to see that forgotten seasons are not wasted seasons when God is still at work.",
  },
  41: {
    opening:
      "Genesis 41 is the turning point where Joseph is lifted from prison to Pharaoh's court. But the chapter is not only about promotion. It is about timing, readiness, wisdom, and God opening a door no person could force open.",
    beginsWith: [
      "two full years passing after the cupbearer forgot Joseph",
      "Pharaoh receiving dreams no one in Egypt can interpret",
      "the cupbearer finally remembering Joseph",
      "Joseph giving God credit before Pharaoh",
      "Joseph moving from interpretation to wise leadership",
    ],
    matters:
      "This chapter matters because God can open a door suddenly after forming a person slowly. Joseph's gift brings him before Pharaoh, but his wisdom makes him useful for the crisis ahead.",
    givesUs: ["\u{23F0} timing", "\u{1F451} Pharaoh's court", "\u{1F4AD} dreams", "\u{1F9E0} wisdom", "\u{1F33E} provision in famine"],
    watchFor: [
      "how long Joseph waits before anything changes",
      "how Joseph keeps the attention on God, not himself",
      "how wisdom includes practical planning, not only spiritual insight",
      "how Joseph is given authority for the sake of preserving life",
      "how the names of Joseph's sons reveal what God has done in his pain",
    ],
    takeaway:
      "Genesis 41 is about being ready when God opens the door. It prepares you to see that Joseph's hidden years were not delay without purpose; they were preparation.",
  },
  42: {
    opening:
      "Genesis 42 brings Joseph's brothers back into the story, but now the power has shifted. They come to Egypt for grain and bow before the brother they do not recognize.",
    beginsWith: [
      "famine pushing Jacob's sons toward Egypt",
      "the brothers bowing before Joseph without knowing him",
      "Joseph remembering the dreams from Genesis 37",
      "a test that exposes guilt still living in the brothers",
      "Joseph weeping privately while acting wisely publicly",
    ],
    matters:
      "This chapter matters because old wounds do not disappear just because time has passed. Joseph has power now, but he does not use it carelessly. He begins testing whether his brothers are the same men who sold him.",
    givesUs: ["\u{1F33E} famine", "\u{1F501} reversal", "\u{1F4AD} remembered dreams", "\u{1F4A7} hidden tears", "\u{2696}\u{FE0F} testing"],
    watchFor: [
      "how the dreams begin to come true in a way no one expected",
      "how guilt speaks from the brothers before Joseph reveals anything",
      "how Joseph feels deeply but still moves carefully",
      "how Reuben's words show the old family blame is still alive",
      "how the chapter leaves Jacob afraid to risk Benjamin",
    ],
    takeaway:
      "Genesis 42 is about the past walking back into the room. It prepares you to see that reconciliation requires truth, wisdom, and time, not just emotion.",
  },
  43: {
    opening:
      "Genesis 43 shows the pressure increasing. Hunger forces Jacob's family back toward Egypt, but this time Benjamin must go, and Judah begins taking responsibility in a way he did not before.",
    beginsWith: [
      "the famine continuing until the family has to act",
      "Judah pledging himself for Benjamin's safety",
      "the brothers returning to Egypt with fear in their hearts",
      "Joseph seeing Benjamin and being overcome with emotion",
      "a meal where Benjamin receives special favor",
    ],
    matters:
      "This chapter matters because trust is being tested slowly. Joseph is watching whether the brothers still resent Rachel's son when he receives favor, or whether something has changed in them.",
    givesUs: ["\u{1F35E} hunger", "\u{1F91D} responsibility", "\u{1F630} fear", "\u{1F622} emotion", "\u{1F37D}\u{FE0F} the table"],
    watchFor: [
      "how Judah's voice is different from Genesis 37 and 38",
      "how fear shapes the brothers before they understand Joseph's kindness",
      "how Joseph has to leave the room because his emotions are so strong",
      "how Benjamin's portion tests the old jealousy",
      "how the chapter holds tension and mercy together",
    ],
    takeaway:
      "Genesis 43 is about the slow work of rebuilding trust. It prepares you to see that Joseph is not rushing the process; he is letting truth become visible.",
  },
  44: {
    opening:
      "Genesis 44 is the final test before Joseph reveals himself. Benjamin is placed in danger, and the brothers face the same kind of choice they failed in Genesis 37.",
    beginsWith: [
      "Joseph placing the silver cup in Benjamin's sack",
      "the brothers being stopped on the road",
      "Benjamin appearing guilty and vulnerable",
      "the brothers returning together instead of abandoning him",
      "Judah offering himself in Benjamin's place",
    ],
    matters:
      "This chapter matters because repentance becomes visible when the old test returns and a person chooses differently. Judah once helped sell Joseph. Now he is willing to suffer in Benjamin's place.",
    givesUs: ["\u{1F964} the cup", "\u{1F6D1} a stopped journey", "\u{1F501} the old test returning", "\u{1F6E1}\u{FE0F} sacrifice", "\u{1F331} changed character"],
    watchFor: [
      "how the test recreates the old opportunity to abandon Rachel's son",
      "how the brothers return together instead of saving themselves",
      "how Judah tells the family story with grief and responsibility",
      "how his offer reveals real change, not just regret",
      "how this prepares the way for Joseph's reveal",
    ],
    takeaway:
      "Genesis 44 is about repentance becoming action. It prepares you to see that God has been working not only in Joseph, but also in the brothers who hurt him.",
  },
  45: {
    opening:
      "Genesis 45 is the release after chapters of pressure. Joseph can no longer hold back, and the hidden governor of Egypt finally says the words that change everything: I am Joseph.",
    beginsWith: [
      "Joseph sending everyone else out of the room",
      "a loud weeping that reaches Pharaoh's house",
      "Joseph revealing himself to his brothers",
      "the brothers being terrified before him",
      "Joseph explaining God's providence without denying their sin",
    ],
    matters:
      "This chapter matters because forgiveness is shown with both honesty and faith. Joseph does not pretend the brothers did no wrong, but he sees God's hand working beyond what they meant for evil.",
    givesUs: ["\u{1F62D} weeping", "\u{1F4A1} revelation", "\u{1F64F} providence", "\u{1F91D} forgiveness", "\u{1F33E} life preserved"],
    watchFor: [
      "how emotional Joseph becomes when the truth finally comes out",
      "how fear grips the brothers before comfort comes",
      "how Joseph names their sin honestly",
      "how he also sees God's larger purpose in preserving life",
      "how Pharaoh's favor helps move the family toward Egypt",
    ],
    takeaway:
      "Genesis 45 is about seeing God's hand without calling evil good. It prepares you to understand forgiveness as truth held together with trust in God's bigger story.",
  },
  46: {
    opening:
      "Genesis 46 follows Jacob as he leaves the land and goes down to Egypt. The joy of Joseph being alive is real, but the move is still a major step into the unknown.",
    beginsWith: [
      "Jacob setting out with everything he has",
      "God speaking to Jacob at Beersheba",
      "a promise that Egypt will not cancel God's covenant plan",
      "the family list showing Israel going down together",
      "Joseph and Jacob finally being reunited",
    ],
    matters:
      "This chapter matters because restoration does not always look like returning to the old life. God meets Jacob on the way and promises to be with him in the very place that feels uncertain.",
    givesUs: ["\u{1F6E4}\u{FE0F} movement", "\u{1F64F} God's promise", "\u{1F46A} family", "\u{1F622} reunion", "\u{1F30D} Egypt as part of the plan"],
    watchFor: [
      "how God tells Jacob not to fear going down to Egypt",
      "how the family is counted because the covenant story is still moving",
      "how Joseph prepares the family to settle wisely",
      "how the reunion carries years of grief in one moment",
      "how God is carrying the promise forward, not backward",
    ],
    takeaway:
      "Genesis 46 is about trusting God when restoration leads into new territory. It prepares you to see that God can be with His people even in places they did not expect.",
  },
  47: {
    opening:
      "Genesis 47 shows Joseph as more than a survivor. He is now stewarding Egypt through famine while his own family settles in Goshen under Pharaoh's favor.",
    beginsWith: [
      "Joseph presenting his family before Pharaoh",
      "Jacob blessing Pharaoh",
      "Israel settling in Goshen",
      "Joseph managing the famine with wisdom and authority",
      "Jacob making Joseph promise to bury him in the land of promise",
    ],
    matters:
      "This chapter matters because provision and exile sit beside each other. God sustains Jacob's family in Egypt, but Egypt is not the final home. The promise still points beyond where they are surviving.",
    givesUs: ["\u{1F3E1} Goshen", "\u{1F33E} provision", "\u{1F451} leadership", "\u{1F4B0} famine economy", "\u{1F5FA}\u{FE0F} promise remembered"],
    watchFor: [
      "how Joseph uses wisdom to preserve life during crisis",
      "how Jacob blesses Pharaoh even as a stranger in Egypt",
      "how Israel grows in a land that is not the final inheritance",
      "how famine changes the whole structure of Egypt",
      "how Jacob's burial request keeps the family's hope tied to God's promise",
    ],
    takeaway:
      "Genesis 47 is about provision in a temporary place. It prepares you to see that God can sustain His people where they are while still pointing them toward where He promised.",
  },
  48: {
    opening:
      "Genesis 48 slows the story down for a blessing scene. Jacob is near death, Joseph brings his sons, and the future of the family is spoken over the next generation.",
    beginsWith: [
      "Joseph hearing that Jacob is sick",
      "Jacob remembering God's promise",
      "Ephraim and Manasseh being received as Jacob's own sons",
      "Jacob crossing his hands over the younger and older",
      "Joseph learning again that God's blessing does not always follow human expectation",
    ],
    matters:
      "This chapter matters because Joseph's suffering is not only redeemed in his lifetime. His sons are folded into the covenant story, and God's grace reaches forward into the next generation.",
    givesUs: ["\u{1F64C} blessing", "\u{1F476} next generation", "\u{1F501} reversal", "\u{1F4DC} covenant memory", "\u{1F331} future grace"],
    watchFor: [
      "how Jacob remembers what God spoke before blessing the boys",
      "how Joseph's sons are brought into Israel's family identity",
      "how the younger is placed before the older again",
      "how Joseph reacts when the order is not what he expected",
      "how blessing flows beyond Joseph into those who come after him",
    ],
    takeaway:
      "Genesis 48 is about grace reaching the next generation. It prepares you to see that God can turn survival into inheritance and pain into blessing beyond one lifetime.",
  },
  49: {
    opening:
      "Genesis 49 gathers Jacob's sons around his deathbed. This is not a simple sentimental goodbye. Jacob speaks about character, consequences, future direction, and the promises still moving through the family.",
    beginsWith: [
      "Jacob calling his sons together",
      "Reuben, Simeon, and Levi facing consequences from earlier choices",
      "Judah receiving a royal promise",
      "Joseph being described as fruitful through affliction",
      "Jacob giving final instructions about his burial",
    ],
    matters:
      "This chapter matters because legacy is not vague. The sons' lives have direction, weight, and consequence, yet God's promise still moves through imperfect people.",
    givesUs: ["\u{1F5E3}\u{FE0F} final words", "\u{2696}\u{FE0F} consequences", "\u{1F981} Judah's promise", "\u{1F33F} Joseph's fruitfulness", "\u{1F4DC} legacy"],
    watchFor: [
      "how Jacob's words connect past character to future direction",
      "how sin leaves consequences even inside a family God is using",
      "how Judah's line receives kingship language",
      "how Joseph is pictured as fruitful though attacked",
      "how the chapter keeps hope alive through a flawed family",
    ],
    takeaway:
      "Genesis 49 is about legacy, consequences, and promise. It prepares you to see that God's faithfulness does not erase human choices, but it does carry His plan through them.",
  },
  50: {
    opening:
      "Genesis 50 closes Joseph's story with grief, fear, forgiveness, and hope. Jacob dies, the brothers worry Joseph may finally take revenge, and Joseph gives the sentence that explains the whole journey.",
    beginsWith: [
      "Jacob's death and Joseph's mourning",
      "the burial journey back to Canaan",
      "the brothers fearing revenge after their father is gone",
      "Joseph saying they meant evil but God meant it for good",
      "Joseph dying with hope that God will bring Israel up again",
    ],
    matters:
      "This chapter matters because it names evil honestly while refusing to make evil ultimate. Joseph's faith does not excuse what happened to him. It sees God working above it, through it, and beyond it to preserve life.",
    givesUs: ["\u{1F622} grief", "\u{1F630} fear", "\u{1F91D} forgiveness", "\u{1F64F} providence", "\u{1F305} hope beyond Egypt"],
    watchFor: [
      "how grief and faith are both present in the chapter",
      "how the brothers still carry fear from what they did",
      "how Joseph refuses to sit in God's place as judge",
      "how Genesis 50:20 summarizes the whole Joseph story",
      "how Joseph's final words look ahead to the Exodus",
    ],
    takeaway:
      "Genesis 50 is about trusting that human evil is real but not ultimate. It prepares you to finish Joseph's story remembering that the pit was not the end, the prison was not the end, and Egypt was not the end.",
  },
};

function buildJosephStudyIntro(chapter: number) {
  const detail = josephIntroDetailsByChapter[chapter];
  if (!detail) return `Today's full chapter focus is Genesis ${chapter}.`;

  return `${detail.opening}

# ${"\u{1F4CD}"} Where This Chapter Begins

**The scene opens with:**

${formatIntroList(detail.beginsWith, beginsWithIcons)}

---

# ${"\u{1F4A1}"} Why This Chapter Matters

${detail.matters}

**This chapter gives us:**

${detail.givesUs.map((item) => `* ${item}`).join("\n\n")}

---

# ${"\u{1F50D}"} What To Watch For

**As you read, pay attention to:**

${formatIntroList(detail.watchFor, watchForIcons)}

---

# ${"\u{1F3AC}"} The Bigger Takeaway

${formatTakeawayCallout(detail.takeaway)}`;
}

const josephDays: JosephDay[] = josephChapterDays.map((day, index) => ({
  day_number: index + 1,
  day_title: day.title,
  bible_reading_book: "Genesis",
  bible_reading_chapter: day.chapter,
  reflection_question: day.reflection,
  devotional_text: buildJosephStudyIntro(day.chapter),
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
