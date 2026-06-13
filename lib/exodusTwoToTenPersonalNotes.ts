import { BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentyFourDeepNotes";
import { BIBLE_YEAR_DAY_TWENTY_THREE_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentyThreeDeepNotes";
import { BIBLE_YEAR_DAY_TWENTY_TWO_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentyTwoDeepNotes";

export type PersonalExodusPhraseSectionInput = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

const note = (lines: string[]) => lines.join("\n\n");
const phrase = (title: string, lines: string[]): [string, string] => [title, note(lines)];

function getExodusTwoToTenTitleIcon(title: string) {
  if (/pharaoh|egypt|king|magicians|wise men/i.test(title)) return "👑";
  if (/lord|god|i am|covenant|promise|name|visited/i.test(title)) return "🙌";
  if (/moses|aaron|speak|mouth|rod|hand|sign/i.test(title)) return "🧭";
  if (/blood|frog|lice|flies|murrain|boil|hail|locust|darkness|plague/i.test(title)) return "⚖️";
  if (/heart|harden|hearken|refused|let my people go/i.test(title)) return "🔒";
  if (/taskmasters|afflict|bitter|bondage|morter|brick|service|burdens/i.test(title)) return "🧱";
  if (/israel|hebrew|people|children|groaning|cried|household|souls|fruitful|multiplied|mighty|increased|abundantly|filled|more and mightier/i.test(title)) return "👥";
  if (/midwives|woman|women|daughter|mother|sister|wife/i.test(title)) return "👩";
  if (/slew|kill|die|death|cast|slay/i.test(title)) return "⚠️";
  if (/fled|went|dwelt|journey|returned|came out|departed/i.test(title)) return "🚶";
  if (/worship|bowed|serve|sacrifice|feast/i.test(title)) return "🙇";
  if (/thus saith|word|commanded|tell|said/i.test(title)) return "📣";
  if (/knew not|know|wisely|looked|believe|understand|saw/i.test(title)) return "🧠";
  if (/treasure cities|houses|stools|bedchamber|inn|house/i.test(title)) return "🏠";
  if (/ark|bulrushes|pitch|slime|babe|wept|nurse|wages|three months/i.test(title)) return "🧺";
  if (/cry|sorrows|anguish|evil case|abhorred|beaten/i.test(title)) return "💔";
  if (/good land|large|milk and honey|land of goshen|field/i.test(title)) return "🏞️";
  if (/generations|heads|fathers|years of the life|levites|armies/i.test(title)) return "🧬";
  if (/miracle|serpent|dust|heaps|stank|beast|cattle|sprinkle/i.test(title)) return "⚖️";
  if (/water|river|nile|sea/i.test(title)) return "🌊";
  if (/fire|bush|holy|mountain|horeb/i.test(title)) return "🔥";
  if (/firstborn|son|child|daughter|mother|sister/i.test(title)) return "👶";
  return "🔎";
}

function ensureExodusTwoToTenTitleEmoji(title: string) {
  const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
  return `${getExodusTwoToTenTitleIcon(cleanTitle)} ${cleanTitle}`;
}

function getExodusTwoToTenSectionIcon(section: PersonalExodusPhraseSectionInput) {
  const text = `${section.title} ${section.reference}`.toLowerCase();
  if (/oppression|fear turns|afflict|bondage/.test(text)) return "🧱";
  if (/midwives/.test(text)) return "👩";
  if (/burning bush/.test(text)) return "🔥";
  if (/i am|name|sends/.test(text)) return "✨";
  if (/objects|provides/.test(text)) return "🗣️";
  if (/returns/.test(text)) return "🚶";
  if (/runs|god hears|groaning/.test(text)) return "👂";
  if (/birth|water|drawn/.test(text)) return "🧺";
  if (/groaning|burdens|hears/.test(text)) return "👂";
  if (/horeb|mountain/.test(text)) return "🔥";
  if (/sign|rod|serpent/.test(text)) return "🐍";
  if (/speaking|mouth/.test(text)) return "🗣️";
  if (/egypt/.test(text)) return "🚶";
  if (/pharaoh|rejects/.test(text)) return "👑";
  if (/crushed|beaten|straw/.test(text)) return "😣";
  if (/promise|covenant/.test(text)) return "📜";
  if (/genealogy|named|heads/.test(text)) return "🧬";
  if (/nile|blood/.test(text)) return "🩸";
  if (/frogs/.test(text)) return "🐸";
  if (/lice|finger/.test(text)) return "☝️";
  if (/flies|goshen|separation/.test(text)) return "🛡️";
  if (/hail|locust|darkness|plague/.test(text)) return "🌩️";
  return getExodusTwoToTenTitleIcon(section.title);
}

const RAW_EXODUS_2_10_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = [
  {
    chapter: 2,
    startVerse: 1,
    endVerse: 10,
    reference: "Exodus 2:1-10",
    title: "Moses Is Drawn From The Water",
    icon: "🧺",
    phrases: [
      phrase("👶 A Son", ["A baby boy is born under Pharaoh's death sentence.", "That makes his birth dangerous before he ever has a name.", "Exodus wants readers to feel the tension: the child Pharaoh wants destroyed is the child God will use to confront Pharaoh.", "👶 Birth", "⚠️ Danger", "📜 Promise still moving", "God begins deliverance in the weakness of a baby."]),
      phrase("👀 A Goodly Child", ["Moses' mother sees that he is a goodly child.", "This does not mean his life matters only because he looks special.", "It shows that she recognizes life worth protecting when Pharaoh has commanded death.", "👀 She sees", "🕊️ She values life", "🧺 She acts", "Faith begins here with a mother refusing to treat Pharaoh's word as final."]),
      phrase("🕰️ Hid Him Three Months", ["For three months, Moses is hidden.", "That means deliverance begins inside fear, secrecy, and parental courage.", "The house becomes a place of resistance.", "🏠 Hidden child", "🤫 Quiet courage", "⏳ Waiting", "The rescue story does not begin with thunder. It begins with a family protecting life day after day."]),
      phrase("🧺 An Ark Of Bulrushes", ["The basket is like a tiny ark.", "Noah was preserved through waters of judgment, and now Moses is preserved through waters Pharaoh meant for death.", "🧺 Small ark", "🌊 Dangerous water", "🛡️ Preserved life", "The river is supposed to be a grave, but God turns it into a place of protection."]),
      phrase("🌊 Laid It In The Flags By The River's Brink", ["Moses is placed right at the edge of the water.", "His mother is not careless; she is doing the only thing she can in an impossible situation.", "🌊 River", "🌾 Reeds", "🧺 Basket", "🙏 Trust", "The scene is fragile on purpose. The deliverer is safe only because God is watching what Pharaoh cannot control."]),
      phrase("👧 His Sister Stood Afar Off", ["Moses' sister watches from a distance.", "She cannot rescue him by force, but she can stay attentive.", "👧 Watching", "👂 Listening", "🏃 Ready to move", "Her quiet presence matters. Exodus keeps showing women acting wisely while Pharaoh's power looks loud."]),
      phrase("👸 The Daughter Of Pharaoh Came Down", ["The rescue comes through Pharaoh's own house.", "That is holy irony.", "👑 Pharaoh commands death", "👸 Pharaoh's daughter shows compassion", "🏠 The palace protects the child", "God can work inside the very structures that oppose His people."]),
      phrase("💗 She Had Compassion On Him", ["Compassion interrupts Pharaoh's command.", "Pharaoh sees Hebrew sons as a threat, but his daughter sees a crying child.", "💗 Mercy", "👶 Life", "🛡️ Protection", "This phrase matters because deliverance often begins when someone sees a vulnerable person as human."]),
      phrase("🌊 She Called His Name Moses", ["Moses' name is tied to being drawn out of water.", "His personal rescue becomes a preview of Israel's national rescue.", "🌊 Moses drawn out", "🌊 Israel will pass through the sea", "📜 One life previews a whole people", "The baby saved from water will later lead God's people through water."]),
    ],
  },
  {
    chapter: 2,
    startVerse: 11,
    endVerse: 25,
    reference: "Exodus 2:11-25",
    title: "God Hears The Groaning",
    icon: "👂",
    phrases: [
      phrase("👀 He Looked On Their Burdens", ["Moses sees the suffering of his Hebrew brothers.", "He is not emotionally detached from their pain.", "👀 He sees", "🧱 He notices burdens", "💔 He identifies with the oppressed", "This is important, but seeing pain is not the same as being ready to deliver God's way."]),
      phrase("⚠️ He Slew The Egyptian", ["Moses acts against injustice, but he acts violently and secretly.", "His zeal outruns wisdom.", "⚠️ Anger", "🩸 Bloodshed", "🤫 Hidden action", "Exodus does not present this as the final model of deliverance. Moses must be formed before he can lead."]),
      phrase("❓ Who Made Thee A Prince And A Judge", ["The Hebrew man's question exposes Moses' problem.", "Moses has tried to act as rescuer, but he has not yet been sent by God.", "❓ Authority questioned", "👑 Prince", "⚖️ Judge", "Moses will become a leader, but not through self-appointment."]),
      phrase("🏃 Moses Fled", ["Moses runs from Pharaoh.", "The palace-raised Hebrew becomes a fugitive.", "🏃 Flight", "🏜️ Wilderness", "⏳ Delay", "This looks like failure, but God will use the wilderness to prepare him."]),
      phrase("🏜️ Dwelt In The Land Of Midian", ["Midian becomes Moses' hidden training ground.", "He leaves Egypt's courts and learns life away from power.", "🏜️ Desert", "🐑 Shepherd life", "⏳ Long preparation", "God often forms servants in places that look like detours."]),
      phrase("💧 Stood Up And Helped Them", ["Moses helps the daughters of Reuel at the well.", "This time his strength protects without murder.", "💧 Well", "🛡️ Protection", "🐑 Shepherds", "The scene hints that Moses is being reshaped from impulsive fighter into shepherd-deliverer."]),
      phrase("👶 Gershom", ["Moses names his son Gershom because he has been a stranger in a strange land.", "The name carries exile in it.", "🏜️ Stranger", "🏠 Far from Egypt", "💭 Unsettled identity", "Moses knows what it is to live displaced, and later he will lead a displaced people."]),
      phrase("👂 God Heard Their Groaning", ["This is the turning point of the chapter.", "Before Moses returns, God hears.", "👂 Heard", "📜 Remembered", "👀 Looked", "🧠 Knew", "Exodus piles up these verbs so we do not miss it: Israel's pain has reached God."]),
    ],
  },
  {
    chapter: 3,
    startVerse: 1,
    endVerse: 12,
    reference: "Exodus 3:1-12",
    title: "The Burning Bush",
    icon: "🔥",
    phrases: [
      phrase("🐑 Kept The Flock", ["Moses is shepherding when God calls him.", "He is not standing in a palace or chasing a platform.", "🐑 Ordinary work", "🏜️ Wilderness", "🔥 Holy interruption", "God meets Moses in the middle of faithful ordinary life."]),
      phrase("⛰️ Horeb The Mountain Of God", ["The mountain is named before Sinai becomes famous in the story.", "This place will become central to Israel's covenant life.", "⛰️ Mountain", "🔥 Revelation", "📜 Future covenant", "God is already drawing Moses toward the place where Israel will later meet Him."]),
      phrase("🔥 The Bush Burned With Fire", ["The bush burns but is not consumed.", "Fire often signals God's holy presence.", "🔥 Fire", "🌿 Bush", "🛡️ Not consumed", "The sign draws Moses near and teaches him that God's presence is powerful but not destructive to what He chooses to preserve."]),
      phrase("👣 Put Off Thy Shoes", ["God tells Moses to remove his sandals.", "The issue is reverence.", "👣 Shoes removed", "🙏 Humility", "🔥 Holy presence", "Moses cannot approach God casually. The ground is holy because God is there."]),
      phrase("📜 The God Of Abraham, Isaac, And Jacob", ["God identifies Himself by the covenant family.", "The Exodus is not random rescue.", "📜 Abraham", "📜 Isaac", "📜 Jacob", "🤲 Promise", "God is acting because He remembers what He promised in Genesis."]),
      phrase("👂 I Have Surely Seen", ["God says He has seen Israel's affliction.", "Their suffering was not invisible.", "👀 Seen", "👂 Heard", "💔 Known sorrows", "God's compassion is not vague. He knows the pain of His people."]),
      phrase("⬇️ I Am Come Down To Deliver Them", ["Deliverance begins with God's decision.", "Moses is sent, but God is the true Deliverer.", "⬇️ God comes down", "🛡️ God rescues", "🏞️ God brings out", "The mission rests on God's action before it rests on Moses' obedience."]),
      phrase("🤝 Certainly I Will Be With Thee", ["Moses asks who he is, and God answers with His presence.", "The point is not Moses' greatness.", "❓ Who am I?", "🤝 I will be with thee", "⛰️ You will worship here", "God's presence is the answer to Moses' inadequacy."]),
    ],
  },
  {
    chapter: 3,
    startVerse: 13,
    endVerse: 22,
    reference: "Exodus 3:13-22",
    title: "I AM Sends Moses",
    icon: "✨",
    phrases: [
      phrase("❓ What Is His Name", ["Moses asks how to answer Israel when they ask God's name.", "This is about authority, identity, and trust.", "❓ Name", "📣 Message", "👥 Israel", "Moses needs more than a task. He needs to know the God who sends him."]),
      phrase("✨ I AM THAT I AM", ["God reveals Himself as the One who is.", "He depends on nothing outside Himself.", "✨ Self-existent", "👑 Uncontrolled", "⏳ Always God", "Pharaoh can resist Moses, but Pharaoh cannot reduce or rule the LORD."]),
      phrase("📜 This Is My Name For Ever", ["God's revealed name is not temporary.", "It will mark Israel's worship and memory.", "📜 Name", "🧠 Memorial", "👥 Generations", "Israel's deliverance is grounded in God's unchanging identity."]),
      phrase("👴 Gather The Elders", ["Moses is told to go to Israel's elders.", "The rescue begins with a message to the suffering people.", "👴 Elders", "📣 Word", "🤲 Promise", "God does not only send Moses to Pharaoh. He first sends hope to Israel."]),
      phrase("👂 I Have Surely Visited You", ["God says He has visited His people.", "This means He has come to act, not merely observe.", "👂 Heard", "👀 Seen", "⬇️ Visited", "The God Joseph said would surely visit has now come to deliver."]),
      phrase("💪 A Mighty Hand", ["God tells Moses Pharaoh will not let Israel go except by a mighty hand.", "Resistance is expected.", "👑 Pharaoh resists", "💪 God acts", "⚖️ Egypt judged", "God is not surprised by hard hearts. His power is already greater than the resistance."]),
      phrase("💍 Spoil The Egyptians", ["Israel will leave with silver, gold, and clothing.", "The enslaved people will not leave empty.", "💍 Silver", "👑 Gold", "👗 Raiment", "God will reverse Egypt's exploitation and send His people out with provision."]),
    ],
  },
  {
    chapter: 4,
    startVerse: 1,
    endVerse: 9,
    reference: "Exodus 4:1-9",
    title: "God Gives Moses Signs",
    icon: "🐍",
    phrases: [
      phrase("❓ They Will Not Believe Me", ["Moses fears rejection from his own people.", "His fear is not imaginary; he has been rejected before.", "❓ Fear", "👥 Israel", "📣 Message", "God answers with signs, but Moses must still obey."]),
      phrase("🪵 What Is That In Thine Hand", ["God begins with what Moses already has.", "The shepherd's rod becomes a sign of God's authority.", "🪵 Ordinary staff", "✋ Moses' hand", "💪 God's power", "God can use ordinary things when He commands them."]),
      phrase("🐍 It Became A Serpent", ["The rod becomes a serpent and Moses runs from it.", "The sign is powerful and unsettling.", "🐍 Serpent", "🏃 Fear", "✋ Obedience", "Moses must learn that God's power is not tame, but it is under God's command."]),
      phrase("✋ Put Forth Thine Hand", ["God tells Moses to take the serpent by the tail.", "That requires trust.", "✋ Reach", "🐍 Danger", "🪵 Rod restored", "Faith often means obeying God in the very place that feels unsafe."]),
      phrase("🤲 His Hand Was Leprous", ["The second sign touches Moses' own body.", "His hand becomes diseased and then restored.", "🤲 Hand", "💔 Disease", "✨ Restoration", "God shows power over uncleanness and healing."]),
      phrase("🌊 Water Of The River", ["The third sign points toward the Nile.", "Water becoming blood previews the first plague.", "🌊 Nile", "🩸 Blood", "⚖️ Judgment", "God is already showing that Egypt's river is under His authority."]),
    ],
  },
  {
    chapter: 4,
    startVerse: 10,
    endVerse: 17,
    reference: "Exodus 4:10-17",
    title: "Moses Objects To Speaking",
    icon: "🗣️",
    phrases: [
      phrase("🗣️ I Am Not Eloquent", ["Moses brings his weakness in speech before God.", "He feels unfit for the assignment.", "🗣️ Slow speech", "😟 Fear", "📣 Calling", "God does not deny the weakness. He puts it under His authority."]),
      phrase("👄 Who Hath Made Man's Mouth", ["God answers Moses by pointing to creation.", "The Maker of the mouth can help the mouth.", "👄 Mouth", "👂 Ear", "👁️ Eye", "👑 Creator", "Moses' weakness is real, but it is not bigger than the God who made him."]),
      phrase("🤝 I Will Be With Thy Mouth", ["God promises help at the exact point of Moses' fear.", "Not just I will be with you, but with your mouth.", "🤝 Presence", "🗣️ Speech", "📣 Teaching", "God's presence reaches the place Moses feels most inadequate."]),
      phrase("🙏 Send By The Hand Of Him Whom Thou Wilt Send", ["Moses keeps resisting.", "This is more than humility now; it is avoidance.", "🙏 Request", "😟 Fear", "🛑 Resistance", "The passage is honest: people can sound humble while still refusing obedience."]),
      phrase("🔥 The Anger Of The Lord Was Kindled", ["God is patient, but Moses' refusal matters.", "Fear does not become harmless just because it feels understandable.", "🔥 God's anger", "🛑 Refusal", "📣 Mission", "The calling is serious because Israel's suffering is serious."]),
      phrase("🤝 Aaron Thy Brother", ["God gives Aaron as a helper.", "Help is mercy, but it does not cancel Moses' call.", "🤝 Brother", "🗣️ Spokesman", "🪵 Rod", "God provides support while still sending Moses forward."]),
    ],
  },
  {
    chapter: 4,
    startVerse: 18,
    endVerse: 31,
    reference: "Exodus 4:18-31",
    title: "Moses Returns To Egypt",
    icon: "🚶",
    phrases: [
      phrase("🚶 Let Me Go, I Pray Thee", ["Moses begins the return journey.", "The man who fled Egypt now goes back under God's command.", "🚶 Return", "🏜️ Leaving Midian", "📣 Mission", "Obedience sends Moses toward the place of old fear."]),
      phrase("⚰️ All The Men Are Dead", ["God tells Moses those who sought his life are dead.", "A barrier from the past has been removed.", "⚰️ Old threat gone", "🚪 Way opened", "⏳ Timing", "God knows the dangers behind and before His servants."]),
      phrase("🪵 The Rod Of God", ["Moses carries the rod back to Egypt.", "It is no longer just a shepherd's staff.", "🪵 Staff", "💪 Sign", "📣 Authority", "The ordinary tool has become a visible reminder of God's power."]),
      phrase("🔒 I Will Harden His Heart", ["God warns Moses that Pharaoh will resist.", "The mission includes conflict from the beginning.", "🔒 Hard heart", "👑 Pharaoh", "⚖️ Judgment", "Moses should not confuse resistance with failure."]),
      phrase("👶 Israel Is My Son", ["God calls Israel His son, His firstborn.", "This gives the conflict deep covenant weight.", "👶 Firstborn", "🏠 Belonging", "👑 Pharaoh challenged", "Pharaoh is not merely holding workers. He is holding God's son."]),
      phrase("⛰️ Aaron Met Him In The Mount Of God", ["Aaron meets Moses where God had called him.", "God provides the partnership He promised.", "⛰️ Mountain", "🤝 Brother", "📣 Shared mission", "Moses does not return alone."]),
      phrase("🙇 They Bowed Their Heads And Worshipped", ["Israel worships before Pharaoh lets them go.", "Their bodies are still enslaved, but hope has awakened.", "👂 God heard", "👀 God saw", "🙇 Israel worshiped", "Faith begins responding before the full rescue is visible."]),
    ],
  },
  {
    chapter: 5,
    startVerse: 1,
    endVerse: 9,
    reference: "Exodus 5:1-9",
    title: "Pharaoh Rejects God's Word",
    icon: "👑",
    phrases: [
      phrase("📣 Thus Saith The Lord", ["Moses and Aaron do not bring Pharaoh a private opinion.", "They speak the word of Israel's God.", "📣 God's word", "👑 Pharaoh's throne", "⚖️ Authority conflict", "The battle begins with a command: Let My people go."]),
      phrase("🕊️ Let My People Go", ["God calls Israel My people.", "Pharaoh treats them as labor, but God claims them as His own.", "🕊️ Belonging", "🔓 Freedom", "🙏 Worship", "Deliverance is about worship, not just escape."]),
      phrase("🏜️ Hold A Feast Unto Me", ["Israel is to leave Egypt to worship the LORD.", "Their freedom has a Godward purpose.", "🏜️ Wilderness", "🎉 Feast", "🙏 Worship", "God is freeing His people from Pharaoh's service for His own service."]),
      phrase("❓ Who Is The Lord", ["Pharaoh's question frames the plagues.", "He does not recognize the LORD's authority.", "❓ Defiance", "👑 Pride", "⚖️ Coming answer", "Egypt is about to learn the name Pharaoh refuses to honor."]),
      phrase("🧱 Ye Make Them Rest From Their Burdens", ["Pharaoh hears worship as laziness.", "He cannot imagine Israel belonging to anyone above him.", "🧱 Labor", "🛑 No rest", "👑 Control", "Oppression often treats worship and rest as threats."]),
      phrase("🌾 Ye Shall No More Give The People Straw", ["Pharaoh makes the work impossible.", "He removes resources but keeps the quota.", "🌾 No straw", "🧱 Same bricks", "😣 Crushing demand", "This is cruelty hidden inside administration."]),
      phrase("📉 Let There More Work Be Laid Upon The Men", ["Pharaoh uses exhaustion as a weapon.", "He wants the people too burdened to listen to hope.", "📉 More work", "😣 Less strength", "🔇 Hope silenced", "Exodus shows how oppression attacks the body and the imagination."]),
    ],
  },
  {
    chapter: 5,
    startVerse: 10,
    endVerse: 23,
    reference: "Exodus 5:10-23",
    title: "The People Are Crushed",
    icon: "😣",
    phrases: [
      phrase("🌾 Gather Stubble Instead Of Straw", ["The people scatter to find scraps for brickmaking.", "Their labor becomes more desperate.", "🌾 Stubble", "🧱 Bricks", "😣 Exhaustion", "Pharaoh's command turns survival into a daily scramble."]),
      phrase("🥀 The Officers Were Beaten", ["Israelite officers suffer under Pharaoh's impossible system.", "Oppression pushes pain down through layers of leadership.", "🥀 Beaten", "🧱 Quotas", "😣 Pressure", "The chapter wants us to feel how cruel systems make victims hurt one another."]),
      phrase("❓ Wherefore Dealest Thou Thus", ["The officers ask Pharaoh why he treats them this way.", "They are looking for reason inside a system built on control.", "❓ Why", "👑 Pharaoh", "🧱 No mercy", "Cruel power rarely gives honest answers to the people it crushes."]),
      phrase("⚠️ Ye Have Made Our Savour To Be Abhorred", ["The officers blame Moses and Aaron.", "Their pain is real, but their conclusion is incomplete.", "⚠️ Blame", "😣 Suffering", "📣 Messengers", "When rescue first meets resistance, hope can feel like harm."]),
      phrase("🙏 Moses Returned Unto The Lord", ["Moses brings the confusion back to God.", "That is important.", "🙏 Prayer", "❓ Questions", "💔 Honesty", "Moses does not quit the mission; he laments before the One who sent him."]),
      phrase("❓ Why Is It That Thou Hast Sent Me", ["Moses asks the question many servants feel when obedience gets harder.", "He does not understand the delay.", "❓ Why", "📣 Calling", "😣 Worse trouble", "Exodus gives room for honest prayer when God's work is not yet visible."]),
      phrase("⏳ Neither Hast Thou Delivered Thy People At All", ["The chapter ends unresolved.", "Moses sees no deliverance yet.", "⏳ Waiting", "😣 Pain remains", "📜 Promise pending", "This is not the end of the story. It is the dark chapter before God's answer."]),
    ],
  },
  {
    chapter: 6,
    startVerse: 1,
    endVerse: 13,
    reference: "Exodus 6:1-13",
    title: "God Repeats The Promise",
    icon: "📜",
    phrases: [
      phrase("👀 Now Shalt Thou See", ["God answers Moses' despair with a promise of action.", "The delay is not denial.", "👀 You will see", "💪 God's hand", "👑 Pharaoh forced", "God is about to show what Moses could not yet see."]),
      phrase("📜 I Am The Lord", ["This repeated phrase anchors the whole speech.", "God points Moses back to His identity.", "📜 Name", "👑 Authority", "🤲 Faithfulness", "The rescue depends on who God is, not on Moses' emotional strength."]),
      phrase("🤝 My Covenant", ["God remembers His covenant with Abraham, Isaac, and Jacob.", "Exodus is covenant faithfulness in action.", "🤝 Covenant", "🏞️ Land", "👥 Descendants", "The promises of Genesis are now pressing into Egypt."]),
      phrase("👂 I Have Also Heard The Groaning", ["God again says He has heard Israel.", "Their pain has not vanished into the air.", "👂 Heard", "💔 Groaning", "📜 Remembered", "God's memory is active mercy."]),
      phrase("💪 I Will Bring You Out", ["God gives a chain of I will promises.", "The repeated words are meant to rebuild crushed hope.", "💪 Bring out", "🤲 Redeem", "🏠 Take you", "🏞️ Give land", "God speaks deliverance before Israel can feel it."]),
      phrase("🥀 Anguish Of Spirit", ["Israel cannot listen because their spirit is crushed.", "The Bible treats that realistically.", "🥀 Anguish", "🧱 Cruel bondage", "👂 Hope hard to hear", "Suffering can make true promises difficult to receive."]),
      phrase("🗣️ Uncircumcised Lips", ["Moses again feels unfit to speak.", "He calls his lips uncircumcised, meaning unfit or blocked.", "🗣️ Weak speech", "😟 Fear", "📣 Command", "God continues sending him because God's power is not limited by Moses' mouth."]),
    ],
  },
  {
    chapter: 6,
    startVerse: 14,
    endVerse: 30,
    reference: "Exodus 6:14-30",
    title: "Moses And Aaron Are Named",
    icon: "🧬",
    phrases: [
      phrase("🧬 These Be The Heads", ["The story pauses for genealogy.", "That may feel slow, but it matters.", "🧬 Families", "📜 Names", "👥 Real people", "God's rescue works through actual family lines, not vague heroes."]),
      phrase("👨‍👦 The Sons Of Levi", ["The focus narrows to Levi because Moses and Aaron come from this tribe.", "Priestly themes are already beginning to form.", "👨‍👦 Levi", "📜 Lineage", "⛺ Future priesthood", "The deliverer and priestly family are being located in Israel's story."]),
      phrase("👶 Amram Took Jochebed", ["Moses and Aaron's parents are named.", "The deliverers are not rootless figures.", "👶 Family", "🏠 Household", "📜 Line", "Exodus grounds leadership in ordinary family history."]),
      phrase("🗣️ These Are That Aaron And Moses", ["The text identifies Aaron and Moses clearly.", "These are the men God commands to bring Israel out.", "🗣️ Aaron", "🧭 Moses", "👥 Israel", "The genealogy leads back to the mission."]),
      phrase("🪖 According To Their Armies", ["Israel is still enslaved, but God speaks of them like organized hosts.", "This is identity before visibility.", "🪖 Hosts", "🔓 Coming freedom", "📜 God's view", "God sees a people Pharaoh only sees as labor."]),
      phrase("📣 Speak Unto Pharaoh", ["After the genealogy, the command returns.", "The family history does not replace obedience.", "📣 Speak", "👑 Pharaoh", "🔓 Let Israel go", "Knowing who Moses and Aaron are leads back to what God sends them to do."]),
    ],
  },
  {
    chapter: 7,
    startVerse: 1,
    endVerse: 13,
    reference: "Exodus 7:1-13",
    title: "The Rod Before Pharaoh",
    icon: "🐍",
    phrases: [
      phrase("👑 A God To Pharaoh", ["God makes Moses stand before Pharaoh as His representative.", "This does not make Moses divine.", "👑 Authority", "📣 Representation", "⚖️ Confrontation", "Pharaoh will meet God's word through Moses and Aaron."]),
      phrase("🗣️ Aaron Thy Brother Shall Be Thy Prophet", ["Aaron speaks for Moses as Moses carries God's message.", "The mission is shared.", "🗣️ Aaron speaks", "📜 Moses receives", "🤝 God provides help", "God uses partnership without weakening the authority of His word."]),
      phrase("🔒 Pharaoh Shall Harden His Heart", ["God warns that Pharaoh will resist.", "This prepares Moses for the long conflict.", "🔒 Hard heart", "👑 Defiance", "⚖️ Signs and wonders", "Resistance is not a surprise to God."]),
      phrase("💪 I Will Lay My Hand Upon Egypt", ["God's hand will come against Egypt in judgment.", "The oppressed do not have power, but their God does.", "💪 God's hand", "⚖️ Judgment", "🔓 Deliverance", "Egypt's strength is about to meet the LORD's strength."]),
      phrase("🪖 By Great Judgments", ["The Exodus will happen through judgments, not negotiation.", "Pharaoh's cruelty will be answered.", "🪖 Hosts", "⚖️ Judgments", "📣 Testimony", "God's acts will reveal His name to Egypt and Israel."]),
      phrase("🐍 Cast Down Thy Rod", ["Aaron's rod becomes a serpent before Pharaoh.", "The sign publicly confronts Egypt's court.", "🐍 Serpent", "🪵 Rod", "👑 Throne room", "The God of Israel is challenging Egypt's power on Pharaoh's own floor."]),
      phrase("💪 Aaron's Rod Swallowed Up Their Rods", ["Egypt's magicians imitate the sign, but their rods are swallowed.", "The point is not that Egypt has no power.", "🎭 Imitation", "🐍 Serpents", "💪 Swallowed", "God's power is shown as greater than the counterfeit."]),
    ],
  },
  {
    chapter: 7,
    startVerse: 14,
    endVerse: 25,
    reference: "Exodus 7:14-25",
    title: "The Nile Turns To Blood",
    icon: "🩸",
    phrases: [
      phrase("🔒 Pharaoh's Heart Is Hardened", ["Pharaoh refuses to let the people go.", "His problem is not lack of evidence.", "🔒 Hardened heart", "👑 Pride", "📣 Refusal", "The plagues reveal a heart that will not bow."]),
      phrase("🌊 The River's Brink", ["Moses meets Pharaoh at the Nile.", "The river is central to Egypt's life and pride.", "🌊 Nile", "🌾 Food", "👑 Egypt's strength", "God confronts Pharaoh at one of Egypt's great symbols of security."]),
      phrase("🪵 The Rod That Was Turned To A Serpent", ["The same rod appears again.", "God's sign continues into judgment.", "🪵 Rod", "🐍 Earlier sign", "🩸 Coming plague", "The signs are connected; God's authority is unfolding step by step."]),
      phrase("🩸 The Waters Shall Be Turned To Blood", ["The Nile becomes blood.", "The river Pharaoh used as a place of death now becomes a sign of judgment.", "🌊 River", "🩸 Blood", "⚖️ Justice", "Egypt's life-source is under the LORD's command."]),
      phrase("🐟 The Fish That Is In The River Shall Die", ["The plague brings death into the river's life system.", "This affects food, smell, and daily survival.", "🐟 Fish die", "💀 River stinks", "😣 Water undrinkable", "Judgment touches ordinary life because Pharaoh's sin has touched ordinary lives."]),
      phrase("🎭 The Magicians Did So", ["The magicians imitate the sign but do not heal the river.", "Counterfeit power can copy destruction, but it cannot bring deliverance.", "🎭 Imitation", "🩸 More blood", "🚫 No rescue", "Egypt's spiritual power cannot undo God's judgment."]),
    ],
  },
  {
    chapter: 8,
    startVerse: 1,
    endVerse: 15,
    reference: "Exodus 8:1-15",
    title: "The Plague Of Frogs",
    icon: "🐸",
    phrases: [
      phrase("🕊️ Let My People Go", ["God repeats the same command.", "Pharaoh's refusal has not changed Israel's identity.", "🕊️ My people", "🙏 Serve Me", "👑 Pharaoh challenged", "The issue is still worship and belonging."]),
      phrase("🐸 I Will Smite All Thy Borders With Frogs", ["The frogs invade Egypt's borders, houses, beds, ovens, and kneading bowls.", "The plague is not distant.", "🐸 Frogs everywhere", "🏠 Homes invaded", "🍞 Food spaces touched", "God can unsettle the daily life Pharaoh thought he controlled."]),
      phrase("🏠 Into Thine House", ["The plague enters Pharaoh's own house.", "His power cannot keep judgment outside his door.", "🏠 Palace", "🛏️ Bedchamber", "🐸 Frogs", "No space in Egypt is beyond God's reach."]),
      phrase("🎭 The Magicians Did So", ["The magicians can bring up frogs too.", "But that only makes Egypt's problem worse.", "🎭 Imitation", "🐸 More frogs", "🚫 No relief", "Power that cannot heal is not saving power."]),
      phrase("🙏 Intreat The Lord", ["Pharaoh asks Moses to pray.", "He wants relief from the plague.", "🙏 Pray", "🐸 Remove frogs", "🔓 Promise to let go", "This is not surrender yet. Pharaoh wants the pain gone more than he wants God."]),
      phrase("🔒 He Hardened His Heart", ["Once relief comes, Pharaoh hardens his heart again.", "The pattern is becoming clear.", "😣 Trouble", "🙏 Request", "😌 Relief", "🔒 Refusal", "Temporary regret is not the same as repentance."]),
    ],
  },
  {
    chapter: 8,
    startVerse: 16,
    endVerse: 19,
    reference: "Exodus 8:16-19",
    title: "The Finger Of God",
    icon: "☝️",
    phrases: [
      phrase("🌫️ Smite The Dust", ["God commands Aaron to strike the dust.", "Dust becomes part of the plague.", "🌫️ Dust", "🪰 Lice", "🌍 All the land", "The Creator who formed man from dust commands dust in judgment."]),
      phrase("🪰 Lice In Man, And In Beast", ["The plague touches bodies directly.", "It affects people and animals.", "🪰 Skin", "👥 People", "🐄 Beasts", "Egypt cannot keep judgment at a comfortable distance."]),
      phrase("🎭 They Could Not", ["The magicians try to imitate this sign and fail.", "A limit is reached.", "🎭 Attempt", "🚫 Failure", "😶 Humbling", "Counterfeit power has boundaries. God's power does not."]),
      phrase("☝️ This Is The Finger Of God", ["The magicians recognize power beyond their arts.", "They name it as the finger of God.", "☝️ God's finger", "🎭 Magicians limited", "👑 Pharaoh warned", "Even Egypt's experts can see what Pharaoh refuses to submit to."]),
      phrase("🔒 Pharaoh's Heart Was Hardened", ["Pharaoh refuses even when his own magicians admit the truth.", "The issue is no longer evidence.", "🔒 Hardened heart", "☝️ Clear sign", "🚫 No listening", "Rebellion can reject what it cannot explain away."]),
    ],
  },
  {
    chapter: 8,
    startVerse: 20,
    endVerse: 32,
    reference: "Exodus 8:20-32",
    title: "God Makes A Division",
    icon: "🛡️",
    phrases: [
      phrase("🌅 Rise Up Early", ["Moses confronts Pharaoh again in the morning.", "God's word keeps meeting Pharaoh's refusal.", "🌅 Morning", "📣 Command", "👑 Confrontation", "The LORD is patient, but He is not silent."]),
      phrase("🪰 Swarms Of Flies", ["The flies fill houses and land.", "Egypt's environment becomes unbearable.", "🪰 Swarms", "🏠 Houses", "🌍 Land corrupted", "The plague presses into daily life again."]),
      phrase("🛡️ I Will Sever In That Day", ["God makes a distinction between Egypt and Goshen.", "Israel is protected inside the same land.", "🛡️ Distinction", "🏠 Goshen", "👥 God's people", "Deliverance is already visible before Israel leaves Egypt."]),
      phrase("🌍 That Thou Mayest Know", ["The purpose is revelation.", "Pharaoh must know the LORD is in the midst of the earth.", "🌍 Earth", "👑 Pharaoh", "📣 God's name", "The plagues preach. They reveal who rules."]),
      phrase("🪤 Only Ye Shall Not Go Very Far Away", ["Pharaoh starts bargaining.", "He offers partial obedience.", "🪤 Compromise", "🔓 Almost freedom", "👑 Control retained", "Pharaoh wants worship close enough to keep a grip on it."]),
      phrase("🔒 Pharaoh Hardened His Heart At This Time Also", ["Even after Moses prays and the flies leave, Pharaoh refuses.", "The pattern continues.", "🙏 Mercy", "😌 Relief", "🔒 Refusal", "A hard heart can receive mercy and still return to rebellion."]),
    ],
  },
  {
    chapter: 9,
    startVerse: 1,
    endVerse: 7,
    reference: "Exodus 9:1-7",
    title: "The Livestock Plague",
    icon: "🐄",
    phrases: [
      phrase("🐄 Upon Thy Cattle", ["The plague touches Egypt's livestock.", "This strikes wealth, food, transport, and labor.", "🐄 Cattle", "🐎 Horses", "🐪 Camels", "🐑 Flocks", "Egypt's economy is not outside God's judgment."]),
      phrase("🛡️ The Lord Shall Sever", ["God again distinguishes between Egypt and Israel.", "The same plague does not fall on both peoples.", "🛡️ Distinction", "🐄 Israel's cattle spared", "👑 Egypt judged", "God knows how to judge without losing track of His people."]),
      phrase("⏰ Tomorrow", ["God sets the time.", "Judgment comes by appointment, not chaos.", "⏰ Time named", "📣 Warning given", "⚖️ Judgment certain", "Pharaoh is given warning before the blow falls."]),
      phrase("🚫 Of The Cattle Of Israel Died Not One", ["Israel's livestock is preserved.", "This is another visible sign of God's care.", "🚫 Not one died", "🛡️ Protection", "👥 Covenant people", "God's distinction is not vague; it reaches actual animals and households."]),
      phrase("🔒 The Heart Of Pharaoh Was Hardened", ["Pharaoh investigates and still refuses.", "Information does not soften him.", "👀 He checks", "🛡️ Sees distinction", "🔒 Stays hard", "The heart can turn facts into further rebellion."]),
    ],
  },
  {
    chapter: 9,
    startVerse: 8,
    endVerse: 12,
    reference: "Exodus 9:8-12",
    title: "Boils From The Furnace",
    icon: "🩹",
    phrases: [
      phrase("🔥 Ashes Of The Furnace", ["The furnace connects the plague to Egypt's world of labor and oppression.", "Ashes become a sign of judgment.", "🔥 Furnace", "🧱 Forced labor", "⚖️ Judgment", "God can turn symbols of oppression into witnesses against the oppressor."]),
      phrase("🌫️ Sprinkle It Toward The Heaven", ["Moses throws ashes upward before Pharaoh.", "The act publicly announces that judgment comes from God.", "🌫️ Ashes", "☁️ Heavenward", "👑 Pharaoh watching", "This is not magic. It is a sign commanded by the LORD."]),
      phrase("🩹 A Boil Breaking Forth", ["The plague touches bodies directly.", "Egypt now carries pain in the skin.", "🩹 Boils", "👥 People", "🐄 Beasts", "Judgment moves from environment and livestock to the body itself."]),
      phrase("🎭 The Magicians Could Not Stand", ["The magicians are humiliated.", "They cannot heal, resist, or even stand before Moses.", "🎭 Magicians", "🩹 Boils", "😶 Collapse", "Egypt's spiritual performers are powerless under God's judgment."]),
      phrase("🔒 The Lord Hardened The Heart Of Pharaoh", ["The hardening language deepens here.", "Pharaoh is confirmed in the path he has chosen.", "🔒 Hardened", "👑 Pharaoh", "📣 Refusal", "Judgment is not only around Pharaoh now; it is also in the hardening of his rebellion."]),
    ],
  },
  {
    chapter: 9,
    startVerse: 13,
    endVerse: 35,
    reference: "Exodus 9:13-35",
    title: "Hail, Warning, And False Repentance",
    icon: "⛈️",
    phrases: [
      phrase("🌅 Rise Up Early", ["God sends Moses again before Pharaoh.", "The repeated confrontations show God's patience and seriousness.", "🌅 Morning", "📣 Warning", "👑 Pharaoh", "The LORD gives warning before judgment intensifies."]),
      phrase("❤️ All My Plagues Upon Thine Heart", ["God says the plagues are reaching Pharaoh's heart.", "This conflict is about inner rebellion, not only outer events.", "❤️ Heart", "⚖️ Judgment", "🔒 Pride", "God is confronting the center of Pharaoh's defiance."]),
      phrase("🌍 My Name May Be Declared Throughout All The Earth", ["God's purpose is bigger than Egypt.", "The Exodus will become testimony for generations.", "🌍 All earth", "📣 God's name", "📜 Story remembered", "Judgment on Pharaoh becomes revelation to the world."]),
      phrase("🏠 He That Feared The Word Of The Lord", ["Some Egyptians listen to the warning and shelter their servants and cattle.", "That detail matters.", "🏠 Shelter", "👂 Heard God's word", "🛡️ Mercy before judgment", "Even in Egypt, those who fear God's word can respond before the hail falls."]),
      phrase("⛈️ Hail, And Fire Mingled With The Hail", ["The storm is terrifying and unnatural.", "It breaks trees, crops, animals, and people in the field.", "⛈️ Hail", "🔥 Fire", "🌾 Crops struck", "God's judgment shakes Egypt's sky and soil."]),
      phrase("😔 I Have Sinned This Time", ["Pharaoh speaks words that sound repentant.", "But his later actions reveal the truth.", "😔 Confession", "🙏 Relief wanted", "🔒 Heart unchanged", "Regret over consequences is not the same as surrender to God."]),
      phrase("🌾 The Wheat And The Rye Were Not Smitten", ["Some crops remain, which means there is still more Pharaoh can lose.", "Judgment has been severe, but not complete.", "🌾 Some spared", "⏳ More warning", "⚖️ Mercy in delay", "The remaining crops set the stage for the locust plague."]),
    ],
  },
  {
    chapter: 10,
    startVerse: 1,
    endVerse: 20,
    reference: "Exodus 10:1-20",
    title: "Locusts Devour What Remains",
    icon: "🦗",
    phrases: [
      phrase("👪 Tell In The Ears Of Thy Son", ["God wants the plagues remembered by future generations.", "The signs are not only for Pharaoh.", "👪 Children", "📖 Story", "📣 Testimony", "God's works must be taught, not forgotten."]),
      phrase("🧠 That Ye May Know", ["The purpose is knowledge of the LORD.", "Israel must understand who delivered them.", "🧠 Know", "📣 I am the LORD", "🕊️ Rescued people", "Deliverance is meant to form faith, not only change location."]),
      phrase("🙇 How Long Wilt Thou Refuse", ["Moses' question presses Pharaoh's pride.", "The issue is refusal to humble himself.", "🙇 Humility rejected", "👑 Pride", "🔒 Hard heart", "Pharaoh's problem is not confusion. It is refusal."]),
      phrase("🦗 Locusts", ["Locusts threaten what remains after the hail.", "They can erase food security quickly.", "🦗 Swarm", "🌾 Crops", "🍽️ Food", "God dismantles Egypt's confidence layer by layer."]),
      phrase("⚠️ Knowest Thou Not Yet That Egypt Is Destroyed", ["Pharaoh's servants see the damage.", "They understand more than Pharaoh will admit.", "⚠️ Warning", "👥 Servants", "🏚️ Egypt ruined", "Pride can make a leader the last person to face reality."]),
      phrase("🪤 Go Now Ye That Are Men", ["Pharaoh offers a partial release.", "He wants to keep families under his control.", "🪤 Compromise", "👨 Men only", "🏠 Families held back", "Partial freedom is still bondage when Pharaoh sets the terms."]),
      phrase("🌬️ The Lord Turned A Mighty Strong West Wind", ["God removes the locusts by wind.", "The same creation world that brings judgment also obeys God in mercy.", "🌬️ Wind", "🦗 Locusts removed", "🙏 Relief", "But Pharaoh receives relief and hardens again."]),
    ],
  },
  {
    chapter: 10,
    startVerse: 21,
    endVerse: 29,
    reference: "Exodus 10:21-29",
    title: "Darkness That Can Be Felt",
    icon: "🌑",
    phrases: [
      phrase("🌑 Darkness Which May Be Felt", ["This is not ordinary night.", "The darkness is oppressive and immobilizing.", "🌑 Thick darkness", "✋ Felt darkness", "🚫 No movement", "Egypt's light fails before the Creator of light."]),
      phrase("🕰️ Three Days", ["The darkness lasts three days.", "The length makes the judgment heavy and unmistakable.", "🕰️ Three days", "🏠 No one rises", "😨 Egypt stopped", "The plague forces Egypt into a powerless pause."]),
      phrase("🏠 All The Children Of Israel Had Light", ["Israel has light in their dwellings.", "The contrast is sharp and beautiful.", "🏠 Homes", "💡 Light", "🛡️ Distinction", "God can give light to His people while darkness covers the surrounding land."]),
      phrase("🐑 Let Your Flocks And Your Herds Be Stayed", ["Pharaoh tries another compromise.", "He will let people go, but not the animals needed for worship.", "🐑 Flocks held", "🪤 Worship controlled", "👑 Pharaoh bargaining", "He still wants leverage over Israel's obedience."]),
      phrase("🐄 There Shall Not An Hoof Be Left Behind", ["Moses refuses partial obedience.", "Everything needed for worship must go.", "🐄 Not a hoof", "🙏 Full worship", "🔓 Full release", "God, not Pharaoh, defines what worship requires."]),
      phrase("🚫 See My Face No More", ["Pharaoh ends the conversation with a threat.", "The next encounter will come under the shadow of the final plague.", "🚫 Final warning", "👑 Hardened king", "🌙 Midnight coming", "Pharaoh thinks he is dismissing Moses, but he is moving toward judgment."]),
    ],
  },
];

type DeepStudySection = {
  reference: string;
  title: string;
  summary: string;
  markdown: string;
};

function getDeepPhraseEntries(markdown: string, fallbackTitle: string, fallbackSummary: string) {
  const entries = [...markdown.matchAll(/### ([^\n]+)\n+([\s\S]*?)(?=\n### |\n## |$)/g)]
    .map((match) => ({
      title: match[1].trim(),
      body: match[2].replace(/\n+/g, " ").trim(),
    }))
    .filter((entry) => entry.title && entry.body)
    .slice(0, 6);

  if (entries.length > 0) return entries;

  return [
    { title: fallbackTitle, body: fallbackSummary },
    { title: "What Is Happening Here", body: fallbackSummary },
    { title: "Why This Matters", body: fallbackSummary },
  ];
}

function makeGeneratedExodusPhrase(title: string, body: string, summary: string): [string, string] {
  return phrase(`📌 ${title}`, [
    body,
    summary,
    "This phrase is worth slowing down over because Exodus is building the rescue step by step.",
    "The pressure in Egypt is not random suffering; it is the place where God reveals His name, judges oppression, and begins forming a worshiping people.",
    "⛓️ Bondage",
    "🔥 Calling",
    "⚖️ Judgment",
    "🙌 Deliverance",
    "The detail helps a beginner see how the Lord is confronting Pharaoh and caring for Israel at the same time.",
  ]);
}

function makeBeginnerExodusPhrase(title: string, section: PersonalExodusPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the scene is easier to follow.`,
    focus,
    "A beginner should not have to guess why this moment matters.",
    "Exodus often teaches through pressure points: oppression, fear, signs, hard hearts, rescue, and worship.",
    "👑 Pharaoh's pride",
    "🗣️ God's word",
    "🧍 Moses' obedience",
    "🙌 Israel's rescue",
    `In ${section.title}, the detail helps show that Pharaoh is not ultimate and God's people are not forgotten.`,
  ]);
}

function ensureBeginnerExodusPhraseDepth(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerExodusPhrase("🧭 What Is Happening Here?", section, "This phrase helps the reader locate the scene: who is suffering, who is resisting God, and what step of deliverance is unfolding."),
    makeBeginnerExodusPhrase("🔎 Why This Detail Matters", section, "This detail matters because Exodus builds meaning through repeated names, signs, commands, and confrontations."),
    makeBeginnerExodusPhrase("🧠 Beginner Connection", section, "A new Bible reader may not know why the story slows down here, but the slowdown explains God's character and Israel's need for rescue."),
    makeBeginnerExodusPhrase("🧵 Watch The Pattern", section, "Watch the pattern: Pharaoh tightens control, God answers with power, Moses obeys, and Israel learns what freedom means."),
    makeBeginnerExodusPhrase("❤️ What This Shows About People", section, "This scene shows people under pressure: fear can harden rulers, but faith can make ordinary people courageous."),
    makeBeginnerExodusPhrase("🙌 What This Shows About God", section, "This scene shows the LORD hearing, remembering, judging evil, preserving life, and calling His people to worship Him."),
  ];

  return {
    ...section,
    phrases: [...section.phrases, ...additions].slice(0, 7),
  };
}

function makeExodusSectionsFromDeepStudy(
  sections: DeepStudySection[],
  allowedChapters: number[],
  icon: string,
): PersonalExodusPhraseSectionInput[] {
  return sections.flatMap((section) => {
    const match = section.reference.match(/^Exodus (\d+):(\d+)-(\d+)$/);
    if (!match) return [];

    const chapter = Number(match[1]);
    if (!allowedChapters.includes(chapter)) return [];

    const sectionStart = Number(match[2]);
    const sectionEnd = Number(match[3]);
    const phrases = getDeepPhraseEntries(section.markdown, section.title, section.summary).map((entry) =>
      makeGeneratedExodusPhrase(entry.title, entry.body, section.summary),
    );
    const chunks: PersonalExodusPhraseSectionInput[] = [];

    for (let startVerse = sectionStart; startVerse <= sectionEnd; startVerse += 6) {
      const endVerse = Math.min(startVerse + 5, sectionEnd);
      chunks.push({
        chapter,
        startVerse,
        endVerse,
        reference: `Exodus ${chapter}:${startVerse}-${endVerse}`,
        title: startVerse === sectionStart ? section.title : `${section.title} Continued`,
        icon,
        phrases,
      });
    }

    return chunks;
  });
}

const DAY_22_REAL_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 1:1-6": ["These Are The Names", "Which Came Into Egypt", "Every Man And His Household", "Seventy Souls", "Joseph Was In Egypt Already", "Joseph Died, And All His Brethren"],
  "Exodus 1:7-7": ["The Children Of Israel", "Were Fruitful", "Increased Abundantly", "Multiplied", "Waxed Exceeding Mighty", "The Land Was Filled With Them"],
  "Exodus 1:8-13": ["A New King Over Egypt", "Which Knew Not Joseph", "More And Mightier Than We", "Let Us Deal Wisely With Them", "Taskmasters To Afflict Them", "Treasure Cities, Pithom And Raamses", "The More They Afflicted Them, The More They Multiplied"],
  "Exodus 1:14-14": ["Made Their Lives Bitter", "Hard Bondage", "In Morter", "In Brick", "All Manner Of Service In The Field", "All Their Service Was With Rigour"],
  "Exodus 1:15-20": ["The Hebrew Midwives", "Shiphrah, And The Name Of The Other Puah", "Upon The Stools", "If It Be A Son, Then Ye Shall Kill Him", "If It Be A Daughter, Then She Shall Live", "The Midwives Feared God", "Did Not As The King Of Egypt Commanded", "The People Multiplied, And Waxed Very Mighty"],
  "Exodus 1:21-22": ["Because The Midwives Feared God", "He Made Them Houses", "Pharaoh Charged All His People", "Every Son That Is Born", "Ye Shall Cast Into The River", "Every Daughter Ye Shall Save Alive"],
  "Exodus 2:1-6": ["A Man Of The House Of Levi", "Bare A Son", "He Was A Goodly Child", "Hid Him Three Months", "An Ark Of Bulrushes", "Slime And With Pitch", "His Sister Stood Afar Off", "The Babe Wept"],
  "Exodus 2:7-10": ["Shall I Go And Call To Thee A Nurse", "Nurse It For Me", "I Will Give Thee Thy Wages", "The Child Grew", "He Became Her Son", "She Called His Name Moses"],
  "Exodus 2:11-16": ["When Moses Was Grown", "Looked On Their Burdens", "An Egyptian Smiting An Hebrew", "He Looked This Way And That Way", "He Slew The Egyptian", "Who Made Thee A Prince And A Judge", "Moses Feared", "Dwelt In The Land Of Midian"],
  "Exodus 2:17-22": ["Came And Drew Water", "The Shepherds Came And Drove Them Away", "Moses Stood Up And Helped Them", "Why Is It That Ye Are Come So Soon To Day", "An Egyptian Delivered Us", "That He May Eat Bread", "Zipporah His Daughter", "Gershom"],
  "Exodus 2:23-25": ["In Process Of Time", "The King Of Egypt Died", "Sighed By Reason Of The Bondage", "Their Cry Came Up Unto God", "God Heard Their Groaning", "God Remembered His Covenant", "God Looked Upon The Children Of Israel", "God Had Respect Unto Them"],
  "Exodus 3:1-6": ["Moses Kept The Flock", "Backside Of The Desert", "Horeb The Mountain Of God", "The Angel Of The LORD Appeared", "The Bush Burned With Fire, And The Bush Was Not Consumed", "I Will Now Turn Aside", "Put Off Thy Shoes From Off Thy Feet", "The God Of Abraham, The God Of Isaac, And The God Of Jacob"],
  "Exodus 3:7-12": ["I Have Surely Seen The Affliction", "I Have Heard Their Cry", "I Know Their Sorrows", "I Am Come Down To Deliver Them", "A Good Land And A Large", "A Land Flowing With Milk And Honey", "I Will Send Thee Unto Pharaoh", "Who Am I", "Certainly I Will Be With Thee"],
  "Exodus 3:13-18": ["What Is His Name", "I AM THAT I AM", "I AM Hath Sent Me Unto You", "This Is My Name For Ever", "Go, And Gather The Elders Of Israel", "I Have Surely Visited You", "I Will Bring You Up Out Of The Affliction Of Egypt", "They Shall Hearken To Thy Voice"],
  "Exodus 3:19-22": ["The King Of Egypt Will Not Let You Go", "Not By A Mighty Hand", "I Will Stretch Out My Hand", "Smite Egypt With All My Wonders", "I Will Give This People Favour", "Jewels Of Silver, And Jewels Of Gold", "Raiment", "Ye Shall Spoil The Egyptians"],
  "Exodus 4:1-6": ["They Will Not Believe Me", "Nor Hearken Unto My Voice", "What Is That In Thine Hand", "It Became A Serpent", "Put Forth Thine Hand, And Take It By The Tail", "That They May Believe", "Put Now Thine Hand Into Thy Bosom"],
  "Exodus 4:7-12": ["It Was Turned Again As His Other Flesh", "If They Will Not Believe Also These Two Signs", "Water Of The River", "Shall Become Blood Upon The Dry Land", "I Am Not Eloquent", "Slow Of Speech, And Of A Slow Tongue", "Who Hath Made Man's Mouth", "I Will Be With Thy Mouth"],
  "Exodus 4:13-17": ["Send, I Pray Thee, By The Hand Of Him Whom Thou Wilt Send", "The Anger Of The LORD Was Kindled", "Aaron The Levite Thy Brother", "He Can Speak Well", "He Will Be Glad In His Heart", "Put Words In His Mouth", "Thou Shalt Take This Rod In Thine Hand"],
  "Exodus 4:18-23": ["Let Me Go, I Pray Thee", "Go In Peace", "All The Men Are Dead Which Sought Thy Life", "Moses Took His Wife And His Sons", "The Rod Of God", "Israel Is My Son, Even My Firstborn", "Let My Son Go, That He May Serve Me"],
  "Exodus 4:24-29": ["By The Way In The Inn", "The LORD Met Him, And Sought To Kill Him", "Zipporah Took A Sharp Stone", "Cut Off The Foreskin Of Her Son", "A Bloody Husband Art Thou To Me", "Go Into The Wilderness To Meet Moses", "He Met Him In The Mount Of God, And Kissed Him"],
  "Exodus 4:30-31": ["Aaron Spake All The Words", "Did The Signs In The Sight Of The People", "The People Believed", "The LORD Had Visited The Children Of Israel", "He Had Looked Upon Their Affliction", "They Bowed Their Heads And Worshipped"],
};

const DAY_22_SECTION_EXPLANATIONS: Record<string, string[]> = {
  "Exodus 1:1-6": ["Exodus begins by tying the rescue story back to Genesis.", "Jacob's family came to Egypt through Joseph, but now that first generation is passing away.", "The names remind the reader that God is still dealing with the same promise family.", "Before bondage is described, Exodus makes sure we know whose story this is."],
  "Exodus 1:7-7": ["God's promise is multiplying right in Egypt.", "The family becomes fruitful, strong, and visible across the land.", "Pharaoh will treat that growth as a threat, but the reader should first see it as faithfulness.", "God is growing His people before He brings them out."],
  "Exodus 1:8-13": ["The new king reads Israel's growth through fear instead of gratitude.", "He forgets Joseph and turns blessing into a political problem.", "The words about wisdom, taskmasters, and treasure cities show oppression becoming organized policy.", "Pharaoh tries to crush the promise, but the more he afflicts Israel, the more God multiplies them."],
  "Exodus 1:14-14": ["This verse slows down to show what slavery felt like.", "Bitter lives, hard bondage, brickwork, field service, and rigour make the suffering concrete.", "A beginner should not picture vague sadness here; this is exhausting forced labor.", "God's coming rescue answers real cruelty in real bodies."],
  "Exodus 1:15-20": ["Pharaoh's oppression moves from labor to the murder of children.", "The midwives stand in holy courage because they fear God more than the king.", "Their names are remembered because their hidden faithfulness protects life.", "The section shows that resistance to evil can begin in a birth room before it ever reaches a palace."],
  "Exodus 1:21-22": ["God honors the midwives, while Pharaoh widens his death command to the whole nation.", "The river is meant to become a grave for Hebrew sons.", "That makes the next chapter powerful: God will preserve Moses through the very waters Pharaoh chose for death.", "The oppressor's weapon is about to become God's hiding place."],
  "Exodus 2:1-6": ["Moses is born under a death sentence, and his mother acts with careful courage.", "The ark of bulrushes, pitch, river, watching sister, and crying baby all matter.", "Deliverance begins in weakness, not spectacle.", "God is preserving the future deliverer through a mother, a sister, a basket, and compassion."],
  "Exodus 2:7-10": ["Moses' sister speaks wisely, and Pharaoh's daughter unknowingly gives Moses back to his own mother for nursing.", "The wages, adoption, and naming show holy irony at Pharaoh's expense.", "Moses grows with Hebrew roots and Egyptian access.", "The child drawn from water will later lead Israel through water."],
  "Exodus 2:11-16": ["Moses grows up and sees the burdens of his people, but his first attempt to act brings fear and exile.", "The killing of the Egyptian shows zeal without God's sending yet.", "The question about prince and judge exposes the authority issue.", "Moses will become a deliverer, but not by self-appointment."],
  "Exodus 2:17-22": ["In Midian, Moses protects vulnerable women without repeating the murder of Egypt.", "The well scene shows his strength being reshaped into service.", "Hospitality, marriage, and Gershom's name show Moses becoming a stranger in a strange land.", "God is preparing a shepherd for a people who will soon live on the road."],
  "Exodus 2:23-25": ["The chapter ends by moving from Moses' hidden life to Israel's groaning.", "The verbs are the key: God heard, remembered, looked, and knew.", "Remembered does not mean God forgot; it means He is moving to act on His covenant.", "The rescue starts in God's faithful attention before Moses ever returns."],
  "Exodus 3:1-6": ["God meets Moses in ordinary shepherd work on the far side of the desert.", "The burning bush draws Moses into holy ground and covenant revelation.", "The God who speaks is the God of Abraham, Isaac, and Jacob.", "Exodus is showing that the coming rescue is rooted in Genesis promises."],
  "Exodus 3:7-12": ["God names Israel's suffering with tenderness and detail.", "He has seen, heard, and known their sorrow, and now He has come down to deliver.", "The rescue has both an exit from Egypt and an entrance into a good land.", "Moses feels small, but God's answer is His presence."],
  "Exodus 3:13-18": ["Moses needs to know how to speak about the God who sends him.", "I AM reveals God's self-existent, unshakable identity.", "The message goes first to Israel's elders so the oppressed people hear hope.", "Joseph's old promise that God would visit His people is now becoming reality."],
  "Exodus 3:19-22": ["God prepares Moses for Pharaoh's resistance before it happens.", "The mighty hand, wonders, favor, silver, gold, and raiment show that deliverance will be public and provided for.", "Israel will not leave empty after generations of exploitation.", "God's justice reverses the flow of power and provision."],
  "Exodus 4:1-6": ["Moses fears the people will not believe him, so God gives signs.", "The rod, serpent, hand, and healing show that God's power rules creation and bodies.", "The signs are not tricks; they serve the message that the LORD has appeared.", "God meets Moses' fear with evidence and command."],
  "Exodus 4:7-12": ["God adds more signs and then answers Moses' fear about speaking.", "The Nile-water sign previews judgment on Egypt's river.", "Moses' speech weakness is real, but the Maker of the mouth is greater.", "God promises help at the exact place Moses feels inadequate."],
  "Exodus 4:13-17": ["Moses' hesitation becomes refusal, and God's anger shows the mission is serious.", "Aaron is given as a merciful helper, not as an excuse for Moses to quit.", "The brother, the words, and the rod all become part of God's provision.", "God supports the servant while still sending him."],
  "Exodus 4:18-23": ["Moses begins the return to Egypt with family, permission, and the rod of God.", "God tells him the old threat is gone but Pharaoh's hard heart remains ahead.", "Israel is called God's firstborn son, which makes the conflict deeply personal.", "Freedom is for serving the LORD, not merely escaping Pharaoh."],
  "Exodus 4:24-29": ["This difficult travel scene shows that Moses' household must stand under God's covenant before he leads covenant Israel.", "Zipporah acts quickly in a tense and bloody moment tied to circumcision.", "Then God sends Aaron exactly as promised.", "The mission moves forward with covenant seriousness and brotherly help."],
  "Exodus 4:30-31": ["Aaron speaks, the signs are shown, and the people believe.", "Before Pharaoh releases them, Israel already hears that God has visited and seen their affliction.", "Their worship comes while they are still in bondage.", "Hope begins when God's word is received, even before the rescue is complete."],
};

function explainExodusOneToTenPhrase(
  section: PersonalExodusPhraseSectionInput,
  title: string,
  sectionLines: string[],
): string {
  const lower = title.toLowerCase();
  const [scene, meaning, beginner, lesson] = sectionLines;
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("pharaoh") || lower.includes("king of egypt") || lower.includes("new king")) {
    add(`${title} points to Egypt's ruler, the man acting like he owns Israel's future.`, "In Exodus, Pharaoh is more than one stubborn man. He represents a whole system that wants control, labor, and obedience without honoring God.", "👑 Power", "🔒 Control", "🧱 Oppression", "The LORD is confronting a kingdom that refuses to let His people worship.");
  } else if (lower.includes("midwives") || lower.includes("shiphrah") || lower.includes("puah")) {
    add(`${title} names women who protected life when Pharaoh commanded death.`, "Midwives helped mothers during birth, so Pharaoh tried to turn a place of life into a place of murder.", "👶 Babies", "👐 Hidden courage", "🙏 Fear of God", "Their names are remembered because God sees faithful people even when their obedience happens far from a throne.");
  } else if (lower.includes("straw") || lower.includes("brick") || lower.includes("taskmasters") || lower.includes("bondage") || lower.includes("rigour") || lower.includes("burdens") || lower.includes("beaten")) {
    add(`${title} helps us feel what slavery looked like in daily life.`, "Israel's suffering was not vague sadness. It meant exhausting work, cruel supervisors, impossible quotas, and bodies worn down by forced labor.", "🧱 Bricks", "🌾 Straw", "💢 Harsh pressure", "God's rescue answers real oppression. He is saving Israel from bitter lives under Pharaoh.");
  } else if (lower.includes("fruitful") || lower.includes("multiplied") || lower.includes("increased") || lower.includes("mighty") || lower.includes("filled")) {
    add(`${title} echoes the blessing language from Genesis.`, "God told His people to be fruitful and multiply, and now Jacob's family is becoming a people inside Egypt.", "🌱 Growth", "📜 Promise", "🏠 Family becoming a nation", "Pharaoh sees this growth as a threat, but Exodus wants us to see it first as God keeping His word.");
  } else if (lower.includes("kept the flock") || lower.includes("flock") || lower.includes("backside of the desert")) {
    add(`${title} shows Moses in ordinary shepherd work before the burning bush.`, "He is far from Egypt, far from palace life, and doing quiet work in the wilderness.", "🐑 Flock", "🏜️ Desert", "⏳ Hidden years", "God often prepares His servants in ordinary places before anyone sees the public calling.");
  } else if (lower.includes("house of levi") || lower.includes("levi")) {
    add(`${title} places Moses inside Israel's covenant family line.`, "Levi was one of Jacob's sons in Genesis, and the Levites later become important in Israel's worship.", "🏠 Family line", "📜 Genesis connection", "🙏 Future worship", "Moses is not a random hero dropped into the story. He comes from the people God promised to preserve.");
  } else if (lower.includes("ark of bulrushes") || lower.includes("bulrushes") || lower.includes("pitch") || lower.includes("babe") || lower.includes("wept") || lower.includes("nurse") || lower.includes("moses")) {
    add(`${title} belongs to the rescue of Moses under Pharaoh's death sentence.`, "The river was supposed to be a place of death for Hebrew sons, but God uses a mother, a basket, a sister, and compassion to preserve the deliverer.", "🧺 Basket", "🌊 Water", "👶 Weakness", "Pharaoh's own household helps raise the child God will use to confront Pharaoh.");
  } else if (lower.includes("midian") || lower.includes("zipporah") || lower.includes("jethro") || lower.includes("gershom") || lower.includes("well") || lower.includes("drew water")) {
    add(`${title} shows Moses living far from Egypt before God sends him back.`, "Midian becomes a wilderness training place. Moses learns life outside the palace, serves at wells, marries, and becomes a stranger in another land.", "🏜️ Wilderness", "🐑 Shepherd life", "🚶 Stranger", "God is preparing Moses quietly before the public rescue begins.");
  } else if (lower.includes("heard") || lower.includes("groaning") || lower.includes("cry") || lower.includes("remembered") || lower.includes("looked") || lower.includes("respect")) {
    add(`${title} tells us how God responds to suffering.`, "Remembered does not mean God had forgotten. It means He is now moving to act on the covenant promises He made to Abraham, Isaac, and Jacob.", "👂 God hears", "📜 God remembers", "👀 God sees", "Before Moses returns to Egypt, the rescue has already begun in God's faithful attention.");
  } else if (lower.includes("bush") || lower.includes("holy") || lower.includes("shoes") || lower.includes("horeb") || lower.includes("angel of the lord")) {
    add(`${title} belongs to the burning bush scene where God calls Moses.`, "The ground is holy because God is present there. Moses is not walking into a normal conversation; he is standing before the living God.", "🔥 Fire", "👣 Bare feet", "⛰️ Holy ground", "The God who speaks from the bush is the God of Abraham, Isaac, and Jacob.");
  } else if (lower.includes("i am") || lower.includes("name") || lower.includes("jehovah") || lower.includes("lord")) {
    add(`${title} teaches who God is, not just what God can do.`, "God is not one more Egyptian-style god with a small territory or limited power. He is the living LORD who exists by His own power and keeps covenant.", "📛 Name", "🕊️ Presence", "📜 Promise", "Israel's hope rests on God's character. The rescue is strong because the Rescuer is faithful.");
  } else if (lower.includes("rod") || lower.includes("serpent") || lower.includes("sign") || lower.includes("blood") || lower.includes("wonders") || lower.includes("magicians")) {
    add(`${title} is part of the signs God gives to confirm His word.`, "The signs are not magic tricks. They show that the LORD rules creation, bodies, Egypt's river, and every power Pharaoh trusts.", "🐍 Rod and serpent", "🩸 Blood", "⚡ Wonder", "A sign in Exodus is meant to make people listen to God's message, not just stare at the miracle.");
  } else if (lower.includes("let my people go") || lower.includes("serve me") || lower.includes("sacrifice") || lower.includes("wilderness")) {
    add(`${title} explains the purpose of freedom in Exodus.`, "God is not merely taking Israel out of bad conditions. He is claiming them as His people so they can worship and serve Him.", "🚪 Freedom", "🙏 Worship", "⛺ Wilderness meeting", "Pharaoh wants labor from Israel. The LORD wants worship from His people.");
  } else if (lower.includes("hardened") || lower.includes("refuse") || lower.includes("hearkened not") || lower.includes("know not")) {
    add(`${title} shows Pharaoh resisting clear truth.`, "A hard heart does not simply lack information. It sees God's word, warnings, and signs, yet still refuses to bow.", "🔒 Refusal", "👂 Not listening", "⚠️ Warning ignored", "Exodus repeats this pattern so a beginner can see how dangerous stubborn pride becomes.");
  } else if (lower.includes("frogs") || lower.includes("lice") || lower.includes("flies") || lower.includes("river") || lower.includes("hail") || lower.includes("locust") || lower.includes("darkness") || lower.includes("boil")) {
    add(`${title} is one of the plague details where creation itself confronts Egypt.`, "The plagues touch water, land, animals, bodies, food, and light because the LORD rules every part of the world Pharaoh thought he controlled.", "🌊 Water", "🐸 Creatures", "🌑 Darkness", "Each plague is judgment, but it is also a lesson: Egypt will know that the LORD is God.");
  } else if (lower.includes("goshen") || lower.includes("sever") || lower.includes("division") || lower.includes("difference")) {
    add(`${title} shows God making a distinction between Egypt and His people.`, "Israel is still living inside Egypt, but they do not belong to Pharaoh in the deepest sense. They belong to the LORD.", "🛡️ Protection", "📍 Goshen", "⚖️ Precise judgment", "God's judgment is not random chaos. He knows how to protect His people while confronting their oppressor.");
  } else if (lower.includes("uncircumcised") || lower.includes("foreskin") || lower.includes("bloody husband")) {
    add(`${title} is a hard covenant moment in Moses' own household.`, "Circumcision was the sign God gave Abraham's family in Genesis. Before Moses leads covenant Israel, his own family must not ignore that sign.", "📜 Covenant sign", "🩸 Serious obedience", "🏠 Moses' household", "God's messenger must not treat God's covenant casually.");
  } else {
    add(`${title} is worth slowing down over in ${section.reference}.`, scene, meaning, beginner, lesson);
  }

  if (lines.length < 5) add(scene, meaning, "A beginner should read this phrase as part of God's rescue story, not as extra wording to skip.", lesson);
  return note(lines.slice(0, 8));
}

const DAY_22_EXACT_EXPLANATIONS: Record<string, string[]> = {
  "These Are The Names": [
    "Exodus begins with names because this story is about real people.",
    "These are not random names on a list.",
    "They are the sons of Jacob.",
    "They are the family God promised to bless back in Genesis.",
    "\u{1F4DC} Reuben",
    "\u{1F4DC} Simeon",
    "\u{1F4DC} Levi",
    "\u{1F4DC} Judah",
    "The rescue story does not begin with Pharaoh. It begins with the promise family.",
    "Before Exodus shows slavery, plagues, and deliverance, it reminds us who these people are.",
  ],
  "Which Came Into Egypt": [
    "This points backward to Genesis.",
    "Jacob's family did not start in Egypt.",
    "They came there during the famine, when Joseph was already in power.",
    "\u{1F33E} Famine brought need",
    "\u{1F3DB}\u{FE0F} Egypt became shelter",
    "\u{1F46A} Jacob's family moved there",
    "\u{1F4DC} God's promise kept moving",
    "At first, Egypt was a place of preservation.",
    "Later, it becomes a place of bondage.",
    "God will rescue His people from the very land where He once preserved them.",
  ],
  "Every Man And His Household": [
    "The sons of Jacob did not come alone.",
    "They came with their families.",
    "A household could include wives, children, servants, and everyone connected to the family line.",
    "\u{1F468} Father",
    "\u{1F469} Mother",
    "\u{1F466} Children",
    "\u{1F3E0} Household",
    "Exodus wants us to see more than individual men.",
    "It wants us to see families.",
    "God is building a people, not just saving one person.",
  ],
  "Seventy Souls": [
    "Souls here means people.",
    "It does not mean ghosts or spirits floating around.",
    "It means the living members of Jacob's family who came into Egypt.",
    "\u{1F465} Seventy people",
    "\u{1F331} One family",
    "\u{1F4C8} A growing promise",
    "\u{1F3DB}\u{FE0F} Entering Egypt",
    "Exodus begins with a family small enough to count.",
    "Soon, that family will multiply so much that Pharaoh becomes afraid.",
    "God's promise is growing before anyone can stop it.",
  ],
  "Joseph Was In Egypt Already": [
    "Joseph was already in Egypt because Genesis told his story first.",
    "His brothers sold him.",
    "He suffered.",
    "God raised him up.",
    "Through Joseph, God saved the family during famine.",
    "\u{26D3}\u{FE0F} Sold by his brothers",
    "\u{1F3DB}\u{FE0F} Raised in Egypt",
    "\u{1F33E} Used during famine",
    "\u{1F46A} Preserved his family",
    "What looked like family betrayal became part of God's preservation plan.",
  ],
  "Joseph Died, And All His Brethren": [
    "This sentence marks the end of a generation.",
    "Joseph dies.",
    "His brothers die.",
    "The people who personally knew the Genesis story are gone.",
    "\u{26B0}\u{FE0F} Joseph died",
    "\u{26B0}\u{FE0F} His brothers died",
    "\u{23F3} Time passed",
    "\u{1F4DC} The promise remained",
    "God's promise does not die when people die.",
    "A new generation is about to suffer, but the God of Abraham, Isaac, Jacob, and Joseph still knows them.",
  ],
};

Object.assign(DAY_22_EXACT_EXPLANATIONS, {
  "The Children Of Israel": [
    "This is Jacob's family being named as a people.",
    "In Genesis, Jacob was given the name Israel.",
    "Now his children are becoming the children of Israel.",
    "\u{1F46A} Jacob's family",
    "\u{1F4DC} Covenant name",
    "\u{1F465} A people forming",
    "Exodus is not starting a brand-new story.",
    "It is carrying forward the promise God already made.",
  ],
  "Were Fruitful": [
    "Fruitful means the family is producing life.",
    "This echoes the Genesis blessing to be fruitful and multiply.",
    "Israel is not shrinking in Egypt.",
    "\u{1F331} Life is growing",
    "\u{1F476} Children are being born",
    "\u{1F4DC} Promise is visible",
    "Before Pharaoh ever reacts, the reader is meant to see God's faithfulness.",
  ],
  "Increased Abundantly": [
    "The wording adds strength to the idea of growth.",
    "Israel is not barely surviving.",
    "They are increasing in a noticeable way.",
    "\u{1F4C8} More people",
    "\u{1F3E0} More households",
    "\u{1F465} More presence in the land",
    "God's promise is becoming too visible for Egypt to ignore.",
  ],
  "Multiplied": [
    "Multiplied means the family kept becoming larger.",
    "The promise to Abraham about many descendants is moving forward in Egypt.",
    "\u{1F46A} One family",
    "\u{1F465} Many people",
    "\u{1F4DC} Covenant promise",
    "The growth is not random population increase.",
    "It is God keeping His word.",
  ],
  "Waxed Exceeding Mighty": [
    "This means Israel became very strong and numerous.",
    "The wording sounds intense because their growth was intense.",
    "\u{1F4AA} Strength",
    "\u{1F4C8} Increase",
    "\u{26A0}\u{FE0F} Egypt notices",
    "What God calls blessing, Pharaoh will soon call a threat.",
  ],
  "The Land Was Filled With Them": [
    "Israel's growth spread across the land.",
    "They were no longer a tiny family hidden in one corner.",
    "\u{1F5FA}\u{FE0F} The land",
    "\u{1F465} The people",
    "\u{1F331} The promise spreading",
    "This sets up Pharaoh's fear.",
    "He sees the people everywhere, but Exodus wants us to see God keeping His promise.",
  ],
  "A New King Over Egypt": [
    "A new ruler changes the whole atmosphere of the story.",
    "Joseph once had favor in Egypt, but this king does not honor that history.",
    "\u{1F451} New king",
    "\u{1F6AB} Old gratitude forgotten",
    "\u{26A0}\u{FE0F} Danger rising",
    "The same land that once sheltered Israel is about to oppress Israel.",
  ],
  "Which Knew Not Joseph": [
    "This does not mean Pharaoh never heard Joseph's name.",
    "It means he does not honor Joseph's place in Egypt's story.",
    "\u{1F4DC} Joseph's service forgotten",
    "\u{1F451} New power",
    "\u{1F512} Fear replacing gratitude",
    "When Egypt forgets how God used Joseph to preserve life, Israel becomes easier to mistreat.",
  ],
  "More And Mightier Than We": [
    "Pharaoh looks at Israel's growth and feels threatened.",
    "He does not see blessing.",
    "He sees competition.",
    "\u{1F465} Israel growing",
    "\u{1F451} Pharaoh afraid",
    "\u{26A0}\u{FE0F} Fear twisting judgment",
    "This is the beginning of oppression: fear tells lies about people made in God's image.",
  ],
  "Let Us Deal Wisely With Them": [
    "Pharaoh calls his plan wisdom.",
    "But it is not true wisdom.",
    "It is control, fear, and cruelty dressed up as strategy.",
    "\u{1F9E0} Political planning",
    "\u{1F512} Control",
    "\u{1F9F1} Forced labor coming",
    "Evil often tries to sound reasonable before it becomes openly violent.",
  ],
  "Taskmasters To Afflict Them": [
    "Taskmasters were supervisors over forced labor.",
    "Their job was to make Israel work under pressure.",
    "\u{1F9F1} Bricks",
    "\u{1F4A2} Affliction",
    "\u{1F512} No freedom",
    "Pharaoh turns people into tools for his building projects.",
    "God sees that kind of oppression clearly.",
  ],
  "Treasure Cities, Pithom And Raamses": [
    "These were storage or supply cities for Pharaoh's kingdom.",
    "Israel's forced labor helped build Egypt's wealth and power.",
    "\u{1F3D7}\u{FE0F} Building projects",
    "\u{1F3DB}\u{FE0F} Pharaoh's cities",
    "\u{26D3}\u{FE0F} Israel's bondage",
    "The text names the cities so the suffering does not stay vague.",
  ],
  "The More They Afflicted Them, The More They Multiplied": [
    "Pharaoh's plan backfires.",
    "The pressure meant to crush Israel does not stop God's promise.",
    "\u{1F4A2} Affliction",
    "\u{1F331} Growth",
    "\u{1F4DC} Promise stronger than oppression",
    "Exodus is showing that Pharaoh can hurt God's people, but he cannot cancel God's word.",
  ],
  "Made Their Lives Bitter": [
    "This tells us what slavery felt like from the inside.",
    "Israel's work was not merely tiring.",
    "It made life painful and heavy.",
    "\u{1F622} Bitter life",
    "\u{26D3}\u{FE0F} Bondage",
    "\u{1F4A2} Cruel pressure",
    "God's rescue answers real suffering, not a small inconvenience.",
  ],
  "Hard Bondage": [
    "Bondage means slavery.",
    "Hard bondage means the slavery was severe and crushing.",
    "\u{26D3}\u{FE0F} No freedom",
    "\u{1F4A2} Harsh labor",
    "\u{1F9F1} Daily pressure",
    "The Bible wants the reader to feel the weight of what Israel needed rescue from.",
  ],
  "In Morter": [
    "Morter was the mixture used in brickmaking and building.",
    "The wording brings the reader down into the worksite.",
    "\u{1F9F1} Mud and mortar",
    "\u{1F4AA} Physical labor",
    "\u{1F4A2} Exhaustion",
    "Israel's suffering happened in ordinary work over and over again.",
  ],
  "In Brick": [
    "Brickmaking was part of Israel's forced labor.",
    "The people were building for the empire that oppressed them.",
    "\u{1F9F1} Bricks",
    "\u{1F3D7}\u{FE0F} Construction",
    "\u{26D3}\u{FE0F} Slavery",
    "Every brick reminds the reader that Pharaoh is using people for power.",
  ],
  "All Manner Of Service In The Field": [
    "Israel's slavery was not only city construction.",
    "They were also forced into field labor.",
    "\u{1F33E} Fields",
    "\u{1F4A2} Forced work",
    "\u{2600}\u{FE0F} Long days",
    "Egypt's oppression reached across many kinds of work.",
  ],
  "All Their Service Was With Rigour": [
    "Rigour means harshness or severity.",
    "The work was pushed with cruelty.",
    "\u{1F4A2} Harsh treatment",
    "\u{1F512} No mercy",
    "\u{26D3}\u{FE0F} Forced service",
    "The closing words make sure we do not soften Pharaoh's oppression.",
  ],
  "Did Not As The King Of Egypt Commanded": [
    "The midwives disobey Pharaoh's evil command.",
    "This is not rebellion for selfish reasons.",
    "It is obedience to God over a command to murder.",
    "\u{1F451} Pharaoh commanded death",
    "\u{1F64F} The midwives feared God",
    "\u{1F476} Babies lived",
    "Sometimes faithfulness means refusing an order that defies God.",
  ],
  "Because The Midwives Feared God": [
    "This explains why the midwives chose life.",
    "They feared God more than they feared Pharaoh.",
    "\u{1F64F} Reverence for God",
    "\u{1F476} Protection of life",
    "\u{1F4AA} Courage",
    "Their fear of God made them brave in front of human power.",
  ],
  "Zipporah His Daughter": [
    "Zipporah is the daughter Moses receives in marriage while living in Midian.",
    "Her name shows Moses is building a life far from Egypt.",
    "\u{1F3DC}\u{FE0F} Midian",
    "\u{1F491} Marriage",
    "\u{1F6B6} Moses as a stranger",
    "This family detail matters because Moses' wilderness years are part of God's preparation.",
  ],
  "Not By A Mighty Hand": [
    "God tells Moses Pharaoh will not release Israel easily.",
    "The wording prepares Moses for resistance before it happens.",
    "\u{1F512} Pharaoh refuses",
    "\u{1F4AA} Power will be required",
    "\u{26A0}\u{FE0F} Conflict ahead",
    "The rescue will come because God's hand is stronger than Pharaoh's hand.",
  ],
  "I Am Not Eloquent": [
    "Moses is saying he does not feel like a strong speaker.",
    "He looks at the mission and notices his weakness.",
    "\u{1F5E3}\u{FE0F} Speech fear",
    "\u{1F610} Insecurity",
    "\u{1F64F} God still calls",
    "God does not build the mission on Moses sounding impressive.",
    "He promises to help Moses speak.",
  ],
  "A Bloody Husband Art Thou To Me": [
    "Zipporah speaks this during the difficult circumcision scene.",
    "The words are intense because the moment is intense.",
    "\u{1FA78} Blood",
    "\u{1F4DC} Covenant sign",
    "\u{1F3E0} Moses' household",
    "Before Moses leads covenant Israel, his own home must not ignore God's covenant sign.",
  ],
  "God Looked Upon The Children Of Israel": [
    "God's looking means His attention is fixed on His suffering people.",
    "Israel may feel unseen in Egypt, but they are not unseen by God.",
    "\u{1F441}\u{FE0F} God sees",
    "\u{1F465} His people",
    "\u{1F4DC} Covenant attention",
    "The wording prepares the reader for rescue before Moses even returns.",
  ],
  "The LORD Had Visited The Children Of Israel": [
    "Visited means God has turned His attention toward His people to act.",
    "It does not mean a casual visit.",
    "\u{1F442} God heard",
    "\u{1F441}\u{FE0F} God saw",
    "\u{1F6AA} Rescue beginning",
    "The people worship because they realize God has not abandoned them.",
  ],
  "Why Is It That Ye Are Come So Soon To Day": [
    "Reuel is surprised that his daughters return from the well so quickly.",
    "Usually the shepherds pushed them away and delayed their work.",
    "\u{1F4A7} The well",
    "\u{1F6AB} Shepherds blocking them",
    "\u{23F1}\u{FE0F} They return early",
    "The question helps the reader notice that Moses' help made a real difference in their day.",
  ],
  "An Egyptian Delivered Us": [
    "The daughters describe Moses as an Egyptian because that is how he appears to them.",
    "He has come from Egypt, and they do not yet know his full story.",
    "\u{1F3DB}\u{FE0F} Egyptian appearance",
    "\u{1F4AA} He defended them",
    "\u{1F4A7} He watered the flock",
    "The future deliverer of Israel is first seen delivering vulnerable women at a well.",
  ],
  "That They May Believe": [
    "The signs are given so the people will trust the message Moses brings.",
    "God is not asking Israel to believe Moses with no witness at all.",
    "\u{1F40D} Rod sign",
    "\u{270B} Hand sign",
    "\u{2705} Belief",
    "The signs serve the word of God. They point beyond Moses to the LORD who sent him.",
  ],
  "It Was Turned Again As His Other Flesh": [
    "Moses' hand is restored after becoming diseased.",
    "The sign shows that God has power both to strike and to heal.",
    "\u{270B} Hand restored",
    "\u{1F4A7} Cleansing picture",
    "\u{2728} Power over the body",
    "This matters because Moses is being sent by the God who rules bodies, sickness, and restoration.",
  ],
  "Go Into The Wilderness To Meet Moses": [
    "God sends Aaron toward Moses before Moses reaches Egypt.",
    "The help God promised is already moving.",
    "\u{1F3DC}\u{FE0F} Wilderness meeting",
    "\u{1F91D} Brotherly help",
    "\u{1F4DC} God's promise kept",
    "Moses does not have to create his own support. God provides Aaron at the right time.",
  ],
});

Object.assign(DAY_22_EXACT_EXPLANATIONS, {
  "The Hebrew Midwives": [
    "The Hebrew midwives were women who helped Hebrew mothers during childbirth.",
    "Pharaoh chooses them because they are close to the moment when babies are born.",
    "That makes his command especially evil.",
    "\u{1F476} Birth",
    "\u{1F469} Women serving mothers",
    "\u{26A0}\u{FE0F} Life under threat",
    "The phrase moves the story from Pharaoh's palace into the birth room.",
    "God sees courage in hidden places.",
  ],
  "Shiphrah, And The Name Of The Other Puah": [
    "The Bible gives the names of the two midwives.",
    "Shiphrah and Puah were not queens, warriors, or rulers.",
    "But their obedience mattered so much that Scripture remembers them by name.",
    "\u{1F4DB} Shiphrah",
    "\u{1F4DB} Puah",
    "\u{1F476} Lives protected",
    "Pharaoh's name is not the focus here.",
    "The women who feared God are the ones the story honors.",
  ],
  "Upon The Stools": [
    "Upon the stools points to the place where the birth was happening.",
    "Pharaoh is telling the midwives to watch at the moment of delivery.",
    "He wants murder hidden inside ordinary birth work.",
    "\u{1FA91} Birth stool",
    "\u{1F476} Newborn child",
    "\u{1F441}\u{FE0F} Midwives watching",
    "The phrase shows how close Pharaoh's evil command came to the babies.",
    "God's protection begins right where life is most vulnerable.",
  ],
  "If It Be A Son, Then Ye Shall Kill Him": [
    "This is Pharaoh's command to murder Hebrew baby boys.",
    "He targets sons because he fears Israel's future strength.",
    "The command is not vague oppression anymore.",
    "\u{1F476} Sons targeted",
    "\u{26A0}\u{FE0F} Death command",
    "\u{1F451} Pharaoh's fear",
    "Pharaoh is trying to cut off the next generation.",
    "Exodus wants the reader to feel how dark Egypt has become.",
  ],
  "If It Be A Daughter, Then She Shall Live": [
    "Pharaoh allows the daughters to live while ordering the sons to die.",
    "This shows that his command is calculated.",
    "He wants to weaken Israel's future while still controlling the people.",
    "\u{1F476} Sons killed",
    "\u{1F467} Daughters spared",
    "\u{1F512} A people controlled",
    "The phrase exposes Pharaoh's attempt to manage life and death.",
    "But Pharaoh does not control the promise of God.",
  ],
  "The Midwives Feared God": [
    "The midwives feared God more than they feared Pharaoh.",
    "Fear of God means reverence, loyalty, and obedience before Him.",
    "They know the king has power, but God has greater authority.",
    "\u{1F64F} Reverence",
    "\u{1F4AA} Courage",
    "\u{1F476} Life protected",
    "This phrase explains why they refuse the king's evil command.",
    "Their courage grows from worship, not from pride.",
  ],
  "The People Multiplied, And Waxed Very Mighty": [
    "The people kept growing even after Pharaoh tried to stop them.",
    "Multiplied points back to the blessing language of Genesis.",
    "Waxed very mighty means Israel became strong and numerous.",
    "\u{1F331} Growth",
    "\u{1F4AA} Strength",
    "\u{1F4DC} Promise still moving",
    "Pharaoh's death plan cannot cancel God's life-giving promise.",
  ],
  "He Made Them Houses": [
    "God made houses for the midwives.",
    "This means He blessed them with households or family lines of their own.",
    "The women protected the children of others, and God honored them.",
    "\u{1F3E0} Household",
    "\u{2705} Faithfulness seen",
    "\u{1F64F} Fear of God",
    "Pharaoh tried to use them for death.",
    "God answered their obedience with life.",
  ],
  "Pharaoh Charged All His People": [
    "Pharaoh now gives the command to all his people.",
    "The murder plan moves beyond the midwives.",
    "Egyptian society is being pulled into Pharaoh's violence.",
    "\u{1F451} Royal command",
    "\u{1F465} Whole nation involved",
    "\u{26A0}\u{FE0F} Evil spreading",
    "Oppression becomes more dangerous when ordinary people are told to participate.",
  ],
  "Every Son That Is Born": [
    "Every son means Pharaoh's command targets all Hebrew baby boys.",
    "He is not attacking one family.",
    "He is attacking a generation.",
    "\u{1F476} Baby sons",
    "\u{1F4C9} Future attacked",
    "\u{1F512} Fearful control",
    "The phrase shows how complete Pharaoh wants the destruction to be.",
  ],
  "Ye Shall Cast Into The River": [
    "The river becomes Pharaoh's chosen weapon.",
    "The Nile was supposed to bring life to Egypt.",
    "Now Pharaoh wants it used for death.",
    "\u{1F30A} River",
    "\u{26A0}\u{FE0F} Death command",
    "\u{1F476} Children threatened",
    "This makes Moses' rescue powerful.",
    "God will preserve him through the very water Pharaoh meant for death.",
  ],
  "Every Daughter Ye Shall Save Alive": [
    "Pharaoh repeats that the daughters may live.",
    "His plan is selective and cruel.",
    "He wants Hebrew sons destroyed while keeping control over the surviving people.",
    "\u{1F467} Daughters spared",
    "\u{1F476} Sons threatened",
    "\u{1F451} Pharaoh controlling life",
    "The phrase shows that Pharaoh's problem is not mercy.",
    "It is fear-driven control.",
  ],
  "A Man Of The House Of Levi": [
    "This tells us Moses is born into the tribe of Levi.",
    "Levi was one of Jacob's sons.",
    "Later, the Levites will be connected to worship and priestly service.",
    "\u{1F3E0} Family line",
    "\u{1F4DC} Genesis connection",
    "\u{1F64F} Future worship",
    "Moses is not a random child in the story.",
    "He is born inside the covenant people God is preserving.",
  ],
  "Bare A Son": [
    "Bare a son means she gave birth to a baby boy.",
    "That simple sentence is full of danger because Pharaoh has commanded Hebrew sons to die.",
    "A birth that should bring joy now happens under threat.",
    "\u{1F476} A son is born",
    "\u{26A0}\u{FE0F} Death sentence",
    "\u{1F3E0} A family under pressure",
    "The phrase helps the reader feel the danger around Moses from the first moment of his life.",
  ],
  "He Was A Goodly Child": [
    "Goodly means the child was beautiful, fine, or special to behold.",
    "The phrase does not mean Moses earned rescue by being better than other babies.",
    "It shows why his mother could not look at him as disposable.",
    "\u{1F476} Child seen",
    "\u{1F441}\u{FE0F} A mother notices",
    "\u{1F64C} Life valued",
    "Pharaoh sees Hebrew sons as threats.",
    "Moses' mother sees a child worth protecting.",
  ],
  "Hid Him Three Months": [
    "Moses' mother hides him for three months.",
    "This is brave, but it is also dangerous.",
    "Every day she hides him, she is resisting Pharaoh's death command.",
    "\u{1F92B} Hidden child",
    "\u{23F3} Three months",
    "\u{1F4AA} Quiet courage",
    "Deliverance begins with a mother protecting life before any public miracle appears.",
  ],
  "An Ark Of Bulrushes": [
    "An ark of bulrushes was a small basket made from reeds.",
    "The word ark connects this rescue to Noah's ark.",
    "In both stories, God preserves life through a vessel on dangerous waters.",
    "\u{1F9FA} Reed basket",
    "\u{1F30A} Water",
    "\u{1F6E1}\u{FE0F} Life preserved",
    "The river was meant for death.",
    "God turns it into a place of protection.",
  ],
  "Slime And With Pitch": [
    "Slime and pitch were used to seal the basket.",
    "They made the ark waterproof so it could float safely.",
    "This small detail shows careful love, not careless abandonment.",
    "\u{1F9FA} Basket sealed",
    "\u{1F4A7} Water kept out",
    "\u{1F476} Baby protected",
    "Moses' mother cannot hold him openly anymore.",
    "So she prepares the safest rescue she can.",
  ],
  "His Sister Stood Afar Off": [
    "Moses' sister watches from a distance.",
    "She is not abandoning the child.",
    "She is waiting to see what will happen to him.",
    "\u{1F441}\u{FE0F} Watching",
    "\u{1F467} Sister nearby",
    "\u{1F30A} River danger",
    "Her quiet watchfulness helps show God's preservation of Moses.",
  ],
  "The Babe Wept": [
    "The baby cries from inside the basket.",
    "His cry reveals his helplessness.",
    "It also moves Pharaoh's daughter to compassion.",
    "\u{1F476} Crying baby",
    "\u{1F494} Vulnerability",
    "\u{1F90D} Compassion stirred",
    "God uses the sound of a helpless child to open the door for rescue.",
  ],
  "Shall I Go And Call To Thee A Nurse": [
    "Moses' sister offers to find a nurse for the baby.",
    "Her words sound simple, but they are wise and brave.",
    "She creates a way for Moses' own mother to care for him again.",
    "\u{1F467} Sister speaks",
    "\u{1F469} Mother restored",
    "\u{1F476} Baby preserved",
    "God uses a child's quick wisdom to protect the future deliverer.",
  ],
  "Nurse It For Me": [
    "Pharaoh's daughter asks Moses' own mother to nurse him.",
    "She does not know she is returning the child to his family.",
    "The house of Pharaoh ends up protecting the baby Pharaoh wanted dead.",
    "\u{1F476} Child nourished",
    "\u{1F469} Mother near",
    "\u{1F3DB}\u{FE0F} Palace protection",
    "This is holy irony.",
    "God preserves Moses inside the enemy's own system.",
  ],
  "I Will Give Thee Thy Wages": [
    "Pharaoh's daughter pays Moses' mother to nurse her own child.",
    "That detail is full of reversal.",
    "The mother who risked everything now receives provision while caring for him.",
    "\u{1FA99} Wages",
    "\u{1F469} Mother",
    "\u{1F476} Child protected",
    "Pharaoh tried to make Hebrew families lose their sons.",
    "God gives this mother her son back with provision.",
  ],
  "The Child Grew": [
    "The child grew means Moses survived the most dangerous stage of his early life.",
    "He is not thrown into the river to die.",
    "He is fed, protected, and allowed to grow.",
    "\u{1F476} Baby preserved",
    "\u{1F331} Growth",
    "\u{1F6E1}\u{FE0F} God protecting life",
    "Every day Moses grows is another sign that Pharaoh's command has failed.",
  ],
  "He Became Her Son": [
    "Moses becomes the son of Pharaoh's daughter by adoption.",
    "He has Hebrew birth and Egyptian palace access.",
    "That unusual position will matter later in the story.",
    "\u{1F3E0} Adopted son",
    "\u{1F3DB}\u{FE0F} Palace access",
    "\u{1F4DC} Hebrew roots",
    "God is placing Moses where no human planner could have arranged it.",
  ],
  "She Called His Name Moses": [
    "Pharaoh's daughter names him Moses because she drew him out of the water.",
    "His name remembers his rescue.",
    "The child drawn out of water will later lead Israel through water.",
    "\u{1F4DB} Name",
    "\u{1F30A} Drawn from water",
    "\u{1F6AA} Future deliverance",
    "The name becomes a quiet preview of the Exodus story.",
  ],
  "When Moses Was Grown": [
    "Moses is no longer a hidden baby.",
    "He has grown up inside a complicated identity.",
    "He belongs to the Hebrews by birth, but he has been raised with Egyptian access.",
    "\u{1F476} Baby grown",
    "\u{1F3DB}\u{FE0F} Egypt",
    "\u{1F4DC} Hebrew people",
    "The phrase moves Moses from being rescued to beginning to notice the suffering around him.",
  ],
  "Looked On Their Burdens": [
    "Moses looks at the burdens of the Hebrews.",
    "He does not stay emotionally distant from their suffering.",
    "He sees the weight Pharaoh has placed on his people.",
    "\u{1F441}\u{FE0F} Moses sees",
    "\u{1F9F1} Burdens",
    "\u{1F494} Suffering noticed",
    "Seeing pain matters, but Moses still has to learn God's way of deliverance.",
  ],
  "An Egyptian Smiting An Hebrew": [
    "This phrase shows an Egyptian beating a Hebrew man.",
    "The oppression is not only policy.",
    "It is physical violence in front of Moses' eyes.",
    "\u{1F44A} Smiting",
    "\u{1F9F1} Forced labor",
    "\u{1F494} Hebrew suffering",
    "The scene forces Moses to face the cruelty his people are living under.",
  ],
  "He Looked This Way And That Way": [
    "Moses looks around before he acts.",
    "That detail shows secrecy.",
    "He knows what he is about to do cannot stand openly.",
    "\u{1F441}\u{FE0F} Looking around",
    "\u{1F92B} Hidden action",
    "\u{26A0}\u{FE0F} Danger",
    "The phrase hints that Moses' zeal is mixed with fear and human impulse.",
  ],
  "He Slew The Egyptian": [
    "Moses kills the Egyptian who was beating the Hebrew.",
    "He acts against injustice, but he does it violently and secretly.",
    "Exodus does not present this as the final model of deliverance.",
    "\u{1FA78} Bloodshed",
    "\u{1F4A2} Anger",
    "\u{1F92B} Hidden act",
    "Moses must still be formed before he can lead God's people God's way.",
  ],
  "Who Made Thee A Prince And A Judge": [
    "This question challenges Moses' authority.",
    "The Hebrew man is asking who gave Moses the right to rule or judge.",
    "It exposes the problem with Moses' first attempt to deliver.",
    "\u{2753} Authority questioned",
    "\u{1F451} Prince",
    "\u{2696}\u{FE0F} Judge",
    "Moses will become a leader, but not by self-appointment.",
  ],
  "Moses Feared": [
    "Moses becomes afraid when he realizes the killing is known.",
    "His hidden action is no longer hidden.",
    "Fear now pushes him toward exile.",
    "\u{1F628} Fear",
    "\u{1F441}\u{FE0F} Secret exposed",
    "\u{1F3C3} Flight coming",
    "The phrase shows that Moses is not yet standing as the confident deliverer.",
  ],
  "Dwelt In The Land Of Midian": [
    "Moses settles in Midian after fleeing Egypt.",
    "Midian is away from Pharaoh's palace and away from Hebrew slavery.",
    "It becomes a wilderness place of waiting and preparation.",
    "\u{1F3DC}\u{FE0F} Midian",
    "\u{1F6B6} Exile",
    "\u{23F3} Hidden years",
    "God will prepare Moses far from the place where Moses first tried to act in his own strength.",
  ],
  "Came And Drew Water": [
    "The daughters come to draw water for their father's flock.",
    "This is ordinary daily work at a well.",
    "The scene shows vulnerable women trying to care for animals in a harsh place.",
    "\u{1F4A7} Water",
    "\u{1F411} Flock",
    "\u{1F467} Daughters working",
    "God uses this ordinary well scene to show Moses learning to help without killing.",
  ],
  "The Shepherds Came And Drove Them Away": [
    "The shepherds push the women away from the water.",
    "This shows another form of oppression, smaller than Egypt but still real.",
    "The strong are using power to block the vulnerable.",
    "\u{1F6AB} Driven away",
    "\u{1F411} Shepherds",
    "\u{1F4A7} Water withheld",
    "The scene gives Moses another chance to respond to injustice differently.",
  ],
  "Moses Stood Up And Helped Them": [
    "Moses stands up to help the daughters.",
    "This time he protects the vulnerable without secretly killing anyone.",
    "His strength is being reshaped into service.",
    "\u{1F9CD} Stood up",
    "\u{1F91D} Helped",
    "\u{1F4A7} Watered the flock",
    "The future deliverer is learning to use strength to protect.",
  ],
  "That He May Eat Bread": [
    "Reuel tells his daughters to bring Moses home to eat bread.",
    "Eating bread here means hospitality and welcome.",
    "Moses the stranger is invited into a household.",
    "\u{1F35E} Bread",
    "\u{1F3E0} Hospitality",
    "\u{1F6B6} Stranger welcomed",
    "The phrase shows God providing a place for Moses in exile.",
  ],
  "Gershom": [
    "Gershom is the name Moses gives his son.",
    "The name is connected to Moses saying he has been a stranger in a strange land.",
    "His family life now carries the memory of exile.",
    "\u{1F4DB} Name",
    "\u{1F6B6} Stranger",
    "\u{1F3DC}\u{FE0F} Foreign land",
    "The name reminds the reader that Moses is still away from home, waiting for God's next step.",
  ],
  "In Process Of Time": [
    "In process of time means a long period passes.",
    "Israel's suffering does not end quickly.",
    "Moses' hidden years and Israel's bondage both stretch across time.",
    "\u{23F3} Time passing",
    "\u{26D3}\u{FE0F} Bondage continuing",
    "\u{1F3DC}\u{FE0F} Moses waiting",
    "The phrase helps the reader feel the long wait before deliverance begins openly.",
  ],
  "The King Of Egypt Died": [
    "The king who ruled Egypt dies.",
    "But his death does not immediately end Israel's bondage.",
    "A ruler can die while a system of oppression remains.",
    "\u{26B0}\u{FE0F} King dies",
    "\u{1F451} Power changes",
    "\u{26D3}\u{FE0F} Slavery remains",
    "The story pushes the reader to look beyond politics to God's covenant action.",
  ],
  "Sighed By Reason Of The Bondage": [
    "Israel sighs because the bondage is crushing them.",
    "This is the sound of exhausted people under long suffering.",
    "The phrase gives emotional weight to their slavery.",
    "\u{1F62E}\u{200D}\u{1F4A8} Sighing",
    "\u{26D3}\u{FE0F} Bondage",
    "\u{1F494} Weariness",
    "God's rescue answers pain that has become too heavy to carry.",
  ],
  "Their Cry Came Up Unto God": [
    "Israel's cry rises to God.",
    "The people may be low in Egypt, but their cry is not trapped there.",
    "God hears what Pharaoh ignores.",
    "\u{1F64F} Cry",
    "\u{2B06}\u{FE0F} Came up",
    "\u{1F442} God hears",
    "The phrase shows suffering moving into the presence of the God who can act.",
  ],
  "God Heard Their Groaning": [
    "God hears the groaning of His people.",
    "Groaning is deeper than polished prayer.",
    "It is pain that may not have neat words.",
    "\u{1F442} God hears",
    "\u{1F494} Groaning",
    "\u{26D3}\u{FE0F} Bondage",
    "The phrase teaches that God is attentive to suffering even when people can barely speak.",
  ],
  "God Remembered His Covenant": [
    "Remembered does not mean God had forgotten.",
    "It means God is now moving to act on what He promised.",
    "The covenant goes back to Abraham, Isaac, and Jacob.",
    "\u{1F4DC} Covenant",
    "\u{1F64C} Promise",
    "\u{1F6AA} Rescue beginning",
    "The Exodus is rooted in God's faithfulness, not Israel's strength.",
  ],
  "God Had Respect Unto Them": [
    "God had respect unto them means God knew and regarded their condition.",
    "He is not cold toward their pain.",
    "He recognizes them as His covenant people.",
    "\u{1F441}\u{FE0F} God sees",
    "\u{1F465} Israel",
    "\u{1F4DC} Covenant care",
    "The phrase prepares the reader for God to speak and act in the next chapter.",
  ],
});

Object.assign(DAY_22_EXACT_EXPLANATIONS, {
  "Moses Kept The Flock": [
    "Moses is keeping sheep when God calls him.",
    "He is not standing in a palace or leading an army.",
    "He is doing ordinary shepherd work in the wilderness.",
    "\u{1F411} Flock",
    "\u{1F3DC}\u{FE0F} Wilderness",
    "\u{23F3} Hidden preparation",
    "The phrase shows God meeting Moses in ordinary work before public ministry begins.",
  ],
  "Backside Of The Desert": [
    "The backside of the desert means Moses is far out in the wilderness.",
    "He is away from Egypt, away from attention, and away from power.",
    "This hidden place becomes the place where God speaks.",
    "\u{1F3DC}\u{FE0F} Desert",
    "\u{1F6B6} Far from Egypt",
    "\u{1F525} Near God's call",
    "God can turn an unnoticed place into holy ground.",
  ],
  "Horeb The Mountain Of God": [
    "Horeb is the mountain where God meets Moses.",
    "It will become deeply important in Israel's story.",
    "The same mountain area will later be connected with covenant and worship.",
    "\u{26F0}\u{FE0F} Mountain",
    "\u{1F525} God appears",
    "\u{1F4DC} Covenant future",
    "The phrase marks the place where Moses' calling begins.",
  ],
  "The Angel Of The LORD Appeared": [
    "The Angel of the LORD appears in the burning bush.",
    "This is not an ordinary messenger bringing ordinary news.",
    "The scene is full of God's own presence and authority.",
    "\u{1F525} Fire",
    "\u{1F64F} Holy presence",
    "\u{1F4E3} Divine call",
    "The phrase tells the reader that Moses is being confronted by God, not simply inspired by an idea.",
  ],
  "The Bush Burned With Fire, And The Bush Was Not Consumed": [
    "The bush is burning, but it is not being burned up.",
    "That is what makes Moses stop and look.",
    "Fire normally consumes, but this fire reveals God's presence without destroying the bush.",
    "\u{1F525} Fire",
    "\u{1F333} Bush",
    "\u{2728} Not consumed",
    "The phrase shows that Moses is seeing something holy and impossible by ordinary explanation.",
  ],
  "I Will Now Turn Aside": [
    "Moses turns aside to look more closely.",
    "He notices something strange and does not ignore it.",
    "This moment slows the story before God speaks his name.",
    "\u{1F441}\u{FE0F} Moses sees",
    "\u{1F6B6} Turns aside",
    "\u{1F525} Burning bush",
    "The phrase shows Moses being drawn toward the place where God will call him.",
  ],
  "Put Off Thy Shoes From Off Thy Feet": [
    "God tells Moses to remove his shoes.",
    "This is a sign of reverence.",
    "Moses is not standing on ordinary ground anymore.",
    "\u{1F463} Shoes removed",
    "\u{1F64F} Reverence",
    "\u{1F525} Holy presence",
    "The ground is holy because God is there.",
  ],
  "The God Of Abraham, The God Of Isaac, And The God Of Jacob": [
    "God identifies Himself by the covenant family.",
    "He is the God who made promises in Genesis.",
    "The Exodus rescue is tied to those promises.",
    "\u{1F4DC} Abraham",
    "\u{1F4DC} Isaac",
    "\u{1F4DC} Jacob",
    "God is not starting a random rescue.",
    "He is keeping covenant.",
  ],
  "I Have Surely Seen The Affliction": [
    "God says He has surely seen Israel's affliction.",
    "Their suffering is not invisible to Him.",
    "Surely makes the statement strong and certain.",
    "\u{1F441}\u{FE0F} Seen",
    "\u{26D3}\u{FE0F} Affliction",
    "\u{1F64F} God attentive",
    "The phrase begins God's answer to Israel's pain.",
  ],
  "I Have Heard Their Cry": [
    "God has heard Israel's cry under oppression.",
    "Pharaoh may ignore their suffering, but God does not.",
    "Their pain has reached the One who can deliver them.",
    "\u{1F442} Heard",
    "\u{1F64F} Cry",
    "\u{1F494} Oppression",
    "The phrase shows that prayer and pain are not lost in Egypt.",
  ],
  "I Know Their Sorrows": [
    "God knows Israel's sorrows.",
    "Know here is personal and caring, not distant information.",
    "God understands the weight of what His people are carrying.",
    "\u{1F90D} Known",
    "\u{1F622} Sorrows",
    "\u{1F465} His people",
    "The phrase shows God's compassion before the rescue begins.",
  ],
  "I Am Come Down To Deliver Them": [
    "God says He has come down to deliver His people.",
    "Moses will be sent, but God is the true Deliverer.",
    "The rescue begins with God's decision to act.",
    "\u{2B07}\u{FE0F} Come down",
    "\u{1F6E1}\u{FE0F} Deliver",
    "\u{1F6AA} Bring out",
    "The phrase puts the weight of salvation on God, not Moses.",
  ],
  "A Good Land And A Large": [
    "A good land and a large describes the place God will bring Israel.",
    "Good means it is a place of blessing and provision.",
    "Large means spacious, not cramped like bondage.",
    "\u{1F3DE}\u{FE0F} Good land",
    "\u{1F331} Provision",
    "\u{1F6AA} Room after slavery",
    "God is not only bringing Israel out.",
    "He is bringing them somewhere.",
  ],
  "A Land Flowing With Milk And Honey": [
    "This phrase describes abundance.",
    "Milk points to flocks and herds.",
    "Honey points to sweetness and produce from the land.",
    "\u{1F95B} Milk",
    "\u{1F36F} Honey",
    "\u{1F33E} Provision",
    "God's deliverance has a destination full of life, not merely escape from pain.",
  ],
  "I Will Send Thee Unto Pharaoh": [
    "God sends Moses directly to Pharaoh.",
    "This is not Moses volunteering for an easy task.",
    "God is appointing him to confront the king who holds Israel in bondage.",
    "\u{1F4E3} Sent",
    "\u{1F451} Pharaoh",
    "\u{26D3}\u{FE0F} Israel in bondage",
    "The phrase shows that God's compassion turns into a mission for Moses.",
  ],
  "Who Am I": [
    "Moses asks who he is to do such a task.",
    "He feels too small for the mission.",
    "The question is honest, but it is focused on Moses' weakness.",
    "\u{2753} Who am I",
    "\u{1F610} Inadequacy",
    "\u{1F451} Pharaoh ahead",
    "God's answer will not be, Moses, you are enough.",
    "God's answer will be, I will be with thee.",
  ],
  "Certainly I Will Be With Thee": [
    "God promises His presence to Moses.",
    "This is the answer to Moses' fear and weakness.",
    "The mission rests on God being with him.",
    "\u{1F91D} God's presence",
    "\u{1F6B6} Moses sent",
    "\u{1F4AA} Strength from God",
    "The phrase teaches that calling is not built on human confidence.",
  ],
  "What Is His Name": [
    "Moses asks what name he should give to Israel.",
    "The people need to know who has sent him.",
    "This question leads into one of the most important revelations of God's identity in Exodus.",
    "\u{1F4DB} Name",
    "\u{1F465} Israel",
    "\u{1F4E3} Message",
    "The phrase shows that deliverance depends on who God is.",
  ],
  "I AM THAT I AM": [
    "I AM THAT I AM reveals God's self-existent identity.",
    "God does not depend on Egypt, Pharaoh, Moses, or anyone else to be God.",
    "He is the living LORD who is faithful to Himself and His promises.",
    "\u{1F4DB} God's name",
    "\u{1F525} Living presence",
    "\u{1F4DC} Covenant faithfulness",
    "The phrase gives Israel hope because the Rescuer is unshakable.",
  ],
  "I AM Hath Sent Me Unto You": [
    "Moses is to tell Israel that I AM has sent him.",
    "The authority behind Moses is God's own identity.",
    "Moses does not come with his own name as the foundation.",
    "\u{1F4DB} I AM",
    "\u{1F4E3} Sent",
    "\u{1F465} Israel addressed",
    "The phrase points the people beyond Moses to the LORD who sends him.",
  ],
  "This Is My Name For Ever": [
    "God's name is not temporary.",
    "It will be remembered by His people from generation to generation.",
    "The rescue from Egypt will be tied to the LORD's revealed name.",
    "\u{1F4DB} Name",
    "\u{23F3} For ever",
    "\u{1F465} Generations",
    "The phrase teaches that God's identity remains steady across time.",
  ],
  "Go, And Gather The Elders Of Israel": [
    "God tells Moses to gather Israel's elders first.",
    "The elders represent the people and need to hear God's message.",
    "The rescue announcement begins among the oppressed community.",
    "\u{1F465} Elders",
    "\u{1F4E3} Message",
    "\u{26D3}\u{FE0F} People in bondage",
    "God gives hope to Israel before Moses confronts Pharaoh.",
  ],
  "I Have Surely Visited You": [
    "Visited means God has turned toward His people to act.",
    "It does not mean a casual visit.",
    "It means God has seen, remembered, and is now moving to rescue.",
    "\u{1F441}\u{FE0F} God sees",
    "\u{1F4DC} God remembers",
    "\u{1F6AA} Rescue beginning",
    "The phrase tells Israel that God has not abandoned them.",
  ],
  "I Will Bring You Up Out Of The Affliction Of Egypt": [
    "God promises to bring Israel up out of Egypt's affliction.",
    "Affliction means the suffering and pressure of their slavery.",
    "Bring you up points to rescue from a low and painful place.",
    "\u{2B06}\u{FE0F} Bring up",
    "\u{26D3}\u{FE0F} Affliction",
    "\u{1F6AA} Deliverance",
    "The phrase gives Israel the direction of God's rescue.",
  ],
  "They Shall Hearken To Thy Voice": [
    "God tells Moses the elders will listen to him.",
    "Hearken means to hear with attention and response.",
    "This promise answers Moses' fear that no one will believe him.",
    "\u{1F442} Listen",
    "\u{1F4E3} Moses speaks",
    "\u{2705} God prepares the hearers",
    "The phrase shows that God is working not only in Moses, but also in the people.",
  ],
  "The King Of Egypt Will Not Let You Go": [
    "God tells Moses Pharaoh will refuse.",
    "This prepares Moses for resistance before it happens.",
    "Pharaoh's refusal will not surprise God or cancel the mission.",
    "\u{1F451} King of Egypt",
    "\u{1F512} Refusal",
    "\u{26A0}\u{FE0F} Conflict ahead",
    "The phrase teaches that hard opposition can still be inside God's known plan.",
  ],
  "I Will Stretch Out My Hand": [
    "God's stretched-out hand means His power will act openly.",
    "Pharaoh's hand is strong in Egypt, but God's hand is stronger.",
    "The rescue will happen by divine power, not human pressure.",
    "\u{1F590}\u{FE0F} God's hand",
    "\u{1F4AA} Power",
    "\u{1F6AA} Deliverance",
    "The phrase points ahead to the signs and plagues.",
  ],
  "Smite Egypt With All My Wonders": [
    "God says He will strike Egypt with wonders.",
    "Wonders are public acts that reveal His power.",
    "Egypt will not be able to treat the LORD as small or hidden.",
    "\u{2728} Wonders",
    "\u{1F3DB}\u{FE0F} Egypt",
    "\u{2696}\u{FE0F} Judgment",
    "The phrase shows that deliverance will reveal who truly rules.",
  ],
  "I Will Give This People Favour": [
    "God promises to give Israel favor in the eyes of the Egyptians.",
    "The people who were oppressed will not leave empty.",
    "God will provide for them even through Egypt.",
    "\u{1F465} This people",
    "\u{1FA99} Provision",
    "\u{1F64C} Favor",
    "The phrase shows God reversing Israel's humiliation.",
  ],
  "Jewels Of Silver, And Jewels Of Gold": [
    "Silver and gold are valuables Israel will receive when they leave Egypt.",
    "This is not random wealth.",
    "It is a sign that God is providing after years of exploitation.",
    "\u{1FA99} Silver",
    "\u{1F7E1} Gold",
    "\u{1F6AA} Leaving Egypt",
    "The phrase points to God sending His people out supplied, not empty-handed.",
  ],
  "Raiment": [
    "Raiment means clothing.",
    "Israel will receive garments along with silver and gold.",
    "God is caring for practical needs as His people prepare to leave.",
    "\u{1F455} Clothing",
    "\u{1FA99} Provision",
    "\u{1F6B6} Journey ahead",
    "The phrase reminds the reader that deliverance includes real provision for real people.",
  ],
  "Ye Shall Spoil The Egyptians": [
    "Spoil here means Israel will take goods from Egypt as they leave.",
    "It is the language of victory after oppression.",
    "The enslaved people will go out with provision from the nation that exploited them.",
    "\u{1F3DB}\u{FE0F} Egypt",
    "\u{1FA99} Goods",
    "\u{1F6AA} Exodus",
    "The phrase shows God's justice turning Pharaoh's power upside down.",
  ],
  "They Will Not Believe Me": [
    "Moses fears the people will not believe him.",
    "He is worried that his message will be rejected.",
    "This fear makes sense after years away from Egypt.",
    "\u{2753} Fear",
    "\u{1F465} The people",
    "\u{1F4E3} Message",
    "The phrase introduces why God gives signs to confirm His word.",
  ],
  "Nor Hearken Unto My Voice": [
    "Moses fears they will not listen to his voice.",
    "Hearken means more than hearing sound.",
    "It means receiving and responding to the message.",
    "\u{1F442} Listen",
    "\u{1F4E3} Moses' voice",
    "\u{2753} Fear of rejection",
    "The phrase shows Moses' anxiety about being trusted as God's messenger.",
  ],
  "What Is That In Thine Hand": [
    "God asks Moses about the rod in his hand.",
    "The object is ordinary, but God will use it as a sign.",
    "Moses does not need to invent power.",
    "\u{1F9AF} Rod",
    "\u{1F590}\u{FE0F} In his hand",
    "\u{2728} God will use it",
    "The phrase teaches that God can use what is already in a servant's hand.",
  ],
  "It Became A Serpent": [
    "The rod becomes a serpent when Moses casts it down.",
    "The sign shows that God's power can transform the ordinary instantly.",
    "It also confronts Egypt with power beyond its own symbols and magic.",
    "\u{1F9AF} Rod",
    "\u{1F40D} Serpent",
    "\u{2728} Sign",
    "The phrase makes the sign visible and startling.",
  ],
  "Put Forth Thine Hand, And Take It By The Tail": [
    "God tells Moses to take the serpent by the tail.",
    "That is a frightening command because a serpent is dangerous.",
    "Moses must obey God's word in the face of fear.",
    "\u{1F590}\u{FE0F} Hand",
    "\u{1F40D} Serpent",
    "\u{1F64F} Obedience",
    "The phrase shows trust being practiced before Moses ever stands before Pharaoh.",
  ],
  "Put Now Thine Hand Into Thy Bosom": [
    "God gives Moses another sign involving his own hand.",
    "The sign will show God's power over sickness and restoration.",
    "Moses' body is used in the lesson.",
    "\u{270B} Hand",
    "\u{1F3E0} Bosom",
    "\u{2728} Sign",
    "The phrase prepares the reader for God to reveal power over the body itself.",
  ],
  "If They Will Not Believe Also These Two Signs": [
    "God prepares Moses for the possibility that two signs may still not be enough.",
    "The phrase shows God's patience with Moses' fear.",
    "God gives layered witness, not a vague command.",
    "\u{1F40D} First sign",
    "\u{270B} Second sign",
    "\u{1F4E3} Message confirmed",
    "The signs serve God's word so the people may believe.",
  ],
  "Water Of The River": [
    "The water of the river points to the Nile.",
    "The Nile was Egypt's life source.",
    "It was also the river Pharaoh tried to use against Hebrew sons.",
    "\u{1F30A} Nile water",
    "\u{1F3DB}\u{FE0F} Egypt's life source",
    "\u{26A0}\u{FE0F} Judgment coming",
    "The phrase prepares for God to confront Egypt at the place it trusted.",
  ],
  "Shall Become Blood Upon The Dry Land": [
    "The river water will become blood on dry land.",
    "This sign points ahead to judgment on Egypt's river.",
    "It shows that God rules the water Egypt depends on.",
    "\u{1F30A} Water",
    "\u{1FA78} Blood",
    "\u{2696}\u{FE0F} Judgment sign",
    "The phrase warns that the LORD can turn Egypt's source of life into a sign of death.",
  ],
  "Slow Of Speech, And Of A Slow Tongue": [
    "Moses is describing his weakness as a speaker.",
    "He does not feel quick, smooth, or impressive with words.",
    "The phrase names the fear he brings to God.",
    "\u{1F5E3}\u{FE0F} Speech",
    "\u{1F610} Weakness",
    "\u{2753} Insecurity",
    "God does not deny the weakness.",
    "He answers it with His own power and presence.",
  ],
  "Who Hath Made Man's Mouth": [
    "God reminds Moses that He made the human mouth.",
    "The Maker of speech is greater than Moses' fear of speaking.",
    "This answer lifts Moses' eyes from himself to the Creator.",
    "\u{1F444} Mouth",
    "\u{1F64C} Creator",
    "\u{1F4E3} Speech",
    "The phrase teaches that God is Lord over the very weakness Moses is worried about.",
  ],
  "I Will Be With Thy Mouth": [
    "God promises to be with Moses' mouth.",
    "That means God will help him speak what needs to be spoken.",
    "The promise meets Moses at the exact place of fear.",
    "\u{1F5E3}\u{FE0F} Speaking",
    "\u{1F91D} God with him",
    "\u{1F4E3} Words taught",
    "The phrase shows that God's presence reaches practical weakness.",
  ],
  "Send, I Pray Thee, By The Hand Of Him Whom Thou Wilt Send": [
    "Moses is asking God to send someone else.",
    "This is more than humble fear now.",
    "He is pulling back from the calling God has given him.",
    "\u{1F6AB} Reluctance",
    "\u{1F590}\u{FE0F} Send another",
    "\u{1F4E3} Mission resisted",
    "The phrase explains why the LORD's anger is kindled in the next verse.",
  ],
  "The Anger Of The LORD Was Kindled": [
    "The LORD's anger is kindled because Moses keeps resisting the call.",
    "God has answered fear after fear.",
    "Now Moses is asking not to go.",
    "\u{1F525} Anger kindled",
    "\u{1F6AB} Reluctance",
    "\u{1F4E3} Mission serious",
    "The phrase shows that God's patience is real, but His command is not optional.",
  ],
  "Aaron The Levite Thy Brother": [
    "God points Moses to Aaron, his brother from the tribe of Levi.",
    "Aaron will become Moses' helper in speaking.",
    "God provides help without canceling Moses' calling.",
    "\u{1F91D} Brother",
    "\u{1F4E3} Speaker",
    "\u{1F4DC} Levite",
    "The phrase shows mercy inside God's correction.",
  ],
  "He Can Speak Well": [
    "Aaron can speak well.",
    "This directly answers Moses' fear about speech.",
    "God provides someone strong where Moses feels weak.",
    "\u{1F5E3}\u{FE0F} Speech",
    "\u{1F91D} Aaron helps",
    "\u{2705} Need supplied",
    "The phrase shows God giving practical help for the mission.",
  ],
  "He Will Be Glad In His Heart": [
    "Aaron will be glad when he sees Moses.",
    "God is preparing not only a helper, but a willing brother.",
    "The mission will not begin with Aaron resenting Moses.",
    "\u{1F60A} Glad heart",
    "\u{1F91D} Brotherly welcome",
    "\u{1F6B6} Meeting ahead",
    "The phrase shows God's care in the relationship between Moses and Aaron.",
  ],
  "Put Words In His Mouth": [
    "God tells Moses to put words in Aaron's mouth.",
    "Aaron will speak, but the message still comes through Moses from God.",
    "This keeps the mission tied to God's word, not Aaron's talent.",
    "\u{1F4E3} Words",
    "\u{1F5E3}\u{FE0F} Aaron speaks",
    "\u{1F4DC} God's message",
    "The phrase explains how Moses and Aaron will work together.",
  ],
  "Thou Shalt Take This Rod In Thine Hand": [
    "Moses is commanded to take the rod with him.",
    "The rod will be used for signs before Israel and Egypt.",
    "An ordinary shepherd's staff becomes connected to God's power.",
    "\u{1F9AF} Rod",
    "\u{1F590}\u{FE0F} In Moses' hand",
    "\u{2728} Signs",
    "The phrase reminds the reader that God can use ordinary things for holy purposes.",
  ],
  "Let Me Go, I Pray Thee": [
    "Moses asks permission to leave Midian and return to Egypt.",
    "He speaks respectfully to Jethro before going.",
    "The hidden shepherd years are ending.",
    "\u{1F6B6} Leaving",
    "\u{1F3DC}\u{FE0F} Midian",
    "\u{1F3DB}\u{FE0F} Egypt ahead",
    "The phrase marks Moses beginning to move toward the mission.",
  ],
  "Go In Peace": [
    "Jethro sends Moses away with peace.",
    "This gives Moses permission to leave his Midian household.",
    "The journey back to Egypt begins without conflict with Jethro.",
    "\u{1F91D} Permission",
    "\u{1F54A}\u{FE0F} Peace",
    "\u{1F6B6} Journey",
    "The phrase clears the way for Moses to return.",
  ],
  "All The Men Are Dead Which Sought Thy Life": [
    "God tells Moses the men who wanted him dead are gone.",
    "The old threat from Egypt has passed.",
    "But the mission will still be dangerous because Pharaoh's resistance remains.",
    "\u{26B0}\u{FE0F} Enemies dead",
    "\u{1F3DB}\u{FE0F} Egypt return",
    "\u{26A0}\u{FE0F} Mission still hard",
    "The phrase encourages Moses to go back without pretending the road will be easy.",
  ],
  "Moses Took His Wife And His Sons": [
    "Moses takes his family with him on the journey.",
    "The mission affects his household, not only Moses by himself.",
    "This detail matters because the next scene will involve his family and covenant obedience.",
    "\u{1F469} Wife",
    "\u{1F466} Sons",
    "\u{1F6B6} Journey",
    "The phrase reminds the reader that obedience often touches the whole household.",
  ],
  "The Rod Of God": [
    "The rod is now called the rod of God.",
    "It began as Moses' ordinary staff.",
    "Now it is connected to the signs God will perform.",
    "\u{1F9AF} Rod",
    "\u{2728} Signs",
    "\u{1F64C} God's power",
    "The phrase shows that the power is not in the object itself.",
    "The power belongs to God.",
  ],
  "Israel Is My Son, Even My Firstborn": [
    "God calls Israel His son, His firstborn.",
    "This makes the conflict with Pharaoh deeply personal.",
    "Pharaoh is enslaving the people God claims as His own.",
    "\u{1F466} Son",
    "\u{1F451} Firstborn",
    "\u{1F4DC} Covenant love",
    "The phrase shows that Exodus is not only about freedom from labor.",
    "It is about God's family being released to Him.",
  ],
  "Let My Son Go, That He May Serve Me": [
    "God's command is that Pharaoh release Israel.",
    "The purpose is not freedom without direction.",
    "Israel is set free to serve the LORD.",
    "\u{1F6AA} Let go",
    "\u{1F466} My son",
    "\u{1F64F} Serve God",
    "The phrase shows that worship is the goal of the Exodus.",
  ],
  "By The Way In The Inn": [
    "This phrase gives the location of a sudden covenant crisis on Moses' journey.",
    "An inn was a stopping place on the road.",
    "The mission is moving forward when this hard moment interrupts it.",
    "\u{1F3E0} Roadside stop",
    "\u{1F4DC} Covenant issue",
    "\u{26A0}\u{FE0F} Serious moment",
    "The phrase slows the story down before Moses reaches Pharaoh.",
  ],
  "The LORD Met Him, And Sought To Kill Him": [
    "The LORD confronts Moses before Moses confronts Pharaoh.",
    "This is a severe covenant moment.",
    "Moses cannot lead covenant Israel while his own household treats the covenant sign lightly.",
    "\u{26A0}\u{FE0F} Holy warning",
    "\u{1F4DC} Covenant sign",
    "\u{1F6B6} Before Egypt",
    "The phrase teaches that God's messenger must stand under God's command too.",
  ],
  "Zipporah Took A Sharp Stone": [
    "Zipporah takes a sharp stone for circumcision.",
    "The sharp stone is the tool used in the urgent covenant act.",
    "She acts quickly in a dangerous moment.",
    "\u{1FA78} Cutting tool",
    "\u{1F469} Zipporah acts",
    "\u{1F4DC} Covenant sign",
    "The phrase explains what she uses and why the scene is so serious.",
  ],
  "Cut Off The Foreskin Of Her Son": [
    "This phrase names the act of circumcision.",
    "Circumcision was the covenant sign God gave to Abraham's family.",
    "Moses' household cannot ignore that sign while Moses is sent to lead Israel.",
    "\u{1F4DC} Abraham's covenant",
    "\u{1FA78} Circumcision",
    "\u{1F3E0} Moses' household",
    "The phrase connects this difficult scene back to God's covenant promise.",
  ],
  "He Met Him In The Mount Of God, And Kissed Him": [
    "Aaron meets Moses at the mountain of God and kisses him.",
    "The kiss shows brotherly greeting and welcome.",
    "God has provided the helper He promised.",
    "\u{26F0}\u{FE0F} Mountain of God",
    "\u{1F91D} Brotherly welcome",
    "\u{1F4E3} Shared mission",
    "Moses will not go to Pharaoh alone.",
  ],
  "Aaron Spake All The Words": [
    "Aaron speaks all the words the LORD gave to Moses.",
    "This shows Aaron stepping into the helper role God promised.",
    "The message is not Aaron's idea; it is God's word delivered through him.",
    "\u{1F4E3} Aaron speaks",
    "\u{1F4DC} God's words",
    "\u{1F465} Israel hears",
    "The phrase shows God's provision working exactly as He said.",
  ],
  "Did The Signs In The Sight Of The People": [
    "The signs are done where the people can see them.",
    "God gives visible confirmation to support the message.",
    "The signs are meant to lead the people to believe the LORD has sent Moses.",
    "\u{1F441}\u{FE0F} In their sight",
    "\u{2728} Signs",
    "\u{2705} Belief",
    "The phrase shows that God meets His oppressed people with both word and witness.",
  ],
  "The People Believed": [
    "The people believe the message Moses and Aaron bring.",
    "This is a major turn in the story.",
    "Israel is still enslaved, but hope has entered through God's word.",
    "\u{2705} Belief",
    "\u{1F442} Message heard",
    "\u{26D3}\u{FE0F} Still in bondage",
    "The phrase shows worship beginning before the rescue is complete.",
  ],
  "He Had Looked Upon Their Affliction": [
    "God has looked upon Israel's affliction.",
    "Their suffering is not hidden from Him.",
    "The same pain Pharaoh ignored is seen by the LORD.",
    "\u{1F441}\u{FE0F} God sees",
    "\u{26D3}\u{FE0F} Affliction",
    "\u{1F90D} Covenant care",
    "The phrase helps explain why the people bow and worship.",
  ],
  "They Bowed Their Heads And Worshipped": [
    "The people bow their heads and worship.",
    "They are still in Egypt and still under pressure.",
    "But they have heard that God has visited them and seen their affliction.",
    "\u{1F647} Bowed heads",
    "\u{1F64C} Worship",
    "\u{1F6AA} Hope beginning",
    "The phrase shows faith responding before freedom is fully visible.",
  ],
});

function explainDay22ExodusPhrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const exact = DAY_22_EXACT_EXPLANATIONS[title];
  if (exact) return note(exact);

  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower.includes("children of israel")) {
    add(`${title} is the family name becoming a people name.`, "Israel was Jacob's new name in Genesis, and his children became the children of Israel.", "The promise family is growing into a nation.", "\u{1F46A} Jacob's family", "\u{1F4DC} Covenant name", "\u{1F465} A people forming", "The phrase keeps the reader connected to Genesis while the rescue story begins.");
  } else if (lower.includes("all his people")) {
    add(`${title} shows Pharaoh spreading his evil command beyond the palace.`, "The order is no longer only given to midwives.", "Pharaoh pulls the whole society into his attempt to destroy Hebrew sons.", "\u{1F451} Royal command", "\u{1F465} Public pressure", "\u{26A0}\u{FE0F} Shared guilt", "Oppression becomes more dangerous when ordinary people are commanded to participate.");
  } else if (lower.includes("every son that is born")) {
    add(`${title} shows how specific Pharaoh's attack becomes.`, "The command targets Hebrew baby boys because Pharaoh fears the future strength of Israel.", "He is trying to kill the next generation before it can grow.", "\u{1F476} Sons targeted", "\u{1F4C9} Future attacked", "\u{1F512} Fear-driven control", "Exodus wants the reader to feel how dark Egypt has become before Moses is born.");
  } else if (lower.includes("fruitful") || lower.includes("increased") || lower.includes("multiplied") || lower.includes("mighty") || lower.includes("filled")) {
    add(`${title} shows the promise still growing under pressure.`, "Back in Genesis, God promised Abraham a family that would become many people.", "Now that promise is becoming visible.", "\u{1F331} Growth", "\u{1F46A} Family becoming a people", "\u{1F4DC} Promise kept", "Pharaoh will see this growth as a threat, but Exodus wants us to see it first as God's faithfulness.");
  } else if (lower.includes("new king") || lower.includes("knew not joseph")) {
    add(`${title} marks a dangerous change in Egypt.`, "Joseph once saved Egypt from famine, but this ruler does not honor that history.", "When memory is lost, gratitude can turn into fear.", "\u{1F451} New ruler", "\u{1F6AB} Joseph forgotten", "\u{26A0}\u{FE0F} Fear rising", "The same family once welcomed in Egypt is now treated like a threat.");
  } else if (lower.includes("more and mightier") || lower.includes("deal wisely")) {
    add(`${title} shows Pharaoh turning blessing into suspicion.`, "Israel's growth is good, but Pharaoh reads it through fear.", "His wisdom is really political control dressed up as strategy.", "\u{1F512} Control", "\u{1F4C8} Israel growing", "\u{26A0}\u{FE0F} Fear-driven leadership", "Exodus begins showing how evil power often calls oppression wisdom.");
  } else if (lower.includes("taskmasters") || lower.includes("treasure cities") || lower.includes("pithom") || lower.includes("raamses") || lower.includes("bondage") || lower.includes("rigour") || lower.includes("morter") || lower.includes("brick") || lower.includes("field")) {
    add(`${title} makes Israel's slavery concrete.`, "The suffering was not vague sadness.", "It was organized labor, harsh supervisors, brickwork, fieldwork, and exhausting pressure.", "\u{1F9F1} Bricks", "\u{1F3D7}\u{FE0F} Building projects", "\u{1F4A2} Harsh labor", "God's rescue answers real cruelty in real bodies.");
  } else if (lower.includes("bitter")) {
    add(`${title} tells us what slavery felt like.`, "The work did not merely make Israel tired.", "It made life painful, heavy, and hard to endure.", "\u{1F622} Bitter life", "\u{1F9F1} Forced labor", "\u{1F512} No freedom", "When God delivers Israel, He is rescuing people from misery.");
  } else if (lower.includes("midwives") || lower.includes("shiphrah") || lower.includes("puah") || lower.includes("stools")) {
    add(`${title} brings us into the birth room, away from Pharaoh's palace.`, "Pharaoh tries to use midwives as tools of death, but these women fear God more than the king.", "\u{1F476} Babies", "\u{1F64F} Fear of God", "\u{1F4AA} Hidden courage", "Their faithfulness matters because God sees obedience even when it happens quietly.");
  } else if ((lower.includes("son") && lower.includes("kill")) || lower.includes("daughter") || lower.includes("river") || lower.includes("cast")) {
    add(`${title} shows Pharaoh's fear becoming a death command.`, "The attack moves from forced labor to the murder of children.", "Pharaoh wants to stop the promise by destroying Hebrew sons.", "\u{26A0}\u{FE0F} Death command", "\u{1F476} Children targeted", "\u{1F30A} River weaponized", "The next chapter will show God preserving Moses through the very water Pharaoh meant for death.");
  } else if (lower.includes("made them houses")) {
    add(`${title} shows God honoring the midwives.`, "The women protected Hebrew babies when Pharaoh commanded murder.", "God responds by blessing them with households of their own.", "\u{1F3E0} Houses", "\u{1F64F} Fear of God", "\u{2705} Faithfulness seen", "Pharaoh had power, but God had the final word over their lives.");
  } else if (lower.includes("house of levi") || lower.includes("bare a son") || lower.includes("goodly child") || lower.includes("hid him")) {
    add(`${title} places Moses under Pharaoh's death sentence.`, "Moses is born into danger, but his family does not surrender him to Pharaoh's command.", "\u{1F476} A child is born", "\u{1F3E0} Levite family", "\u{1F92B} Hidden three months", "Deliverance begins quietly through parental courage before anyone sees a miracle.");
  } else if (lower.includes("ark of bulrushes") || lower.includes("bulrushes") || lower.includes("pitch") || lower.includes("sister") || lower.includes("babe wept")) {
    add(`${title} slows down the fragile rescue of Moses.`, "A basket, waterproof pitch, a watching sister, and a crying baby all become part of God's preservation.", "\u{1F9FA} Basket", "\u{1F30A} Water", "\u{1F441}\u{FE0F} Sister watching", "God can use small, ordinary details to protect the future deliverer.");
  } else if (lower.includes("nurse") || lower.includes("wages") || lower.includes("child grew") || lower.includes("became her son") || lower.includes("called his name moses")) {
    add(`${title} lets Pharaoh's house protect the child Pharaoh tried to kill.`, "Pharaoh tried to destroy Hebrew sons, but his own daughter helps preserve one.", "Moses is nursed by his own mother and later raised with Egyptian access.", "\u{1F476} Child preserved", "\u{1F469} Mother restored", "\u{1F3DB}\u{FE0F} Palace access", "The child drawn from water will one day lead Israel through water.");
  } else if (lower.includes("grown") || lower.includes("burdens") || lower.includes("egyptian smiting") || lower.includes("slew") || lower.includes("prince and a judge") || lower.includes("moses feared")) {
    add(`${title} puts Moses face to face with Hebrew suffering.`, "He sees Hebrew suffering, but his first attempt to act brings fear, exposure, and exile.", "\u{1F441}\u{FE0F} He sees the burden", "\u{1F4A5} Violence erupts", "\u{1F3C3} Moses flees", "Moses will become a deliverer, but not by self-appointment.");
  } else if (lower.includes("inn") || lower.includes("sought to kill") || lower.includes("sharp stone") || lower.includes("foreskin") || lower.includes("bloody husband") || lower.includes("mount of god") || lower.includes("kissed")) {
    if (lower.includes("inn")) {
      add(`${title} gives the location of a sudden covenant crisis on Moses' journey back to Egypt.`, "An inn was a stopping place on the road.", "Moses is already moving toward his calling when this hard moment interrupts the journey.", "\u{1F3E0} Roadside stop", "\u{1F4DC} Covenant sign", "\u{26A0}\u{FE0F} Serious obedience", "The phrase slows the story down before Moses reaches Pharaoh.");
    } else if (lower.includes("sought to kill")) {
      add(`${title} shows the LORD confronting Moses before Moses confronts Pharaoh.`, "This is one of the most serious moments in Moses' early calling.", "The problem is connected to covenant obedience in Moses' own household.", "\u{26A0}\u{FE0F} Holy warning", "\u{1F4DC} Covenant matter", "\u{1F6B6} Before Egypt", "God's messenger must not treat God's covenant sign as optional.");
    } else if (lower.includes("sharp stone")) {
      add(`${title} shows Zipporah acting quickly in a dangerous covenant moment.`, "The sharp stone is the tool used for circumcision.", "Circumcision was the sign God gave to Abraham's family.", "\u{1FA78} Cutting tool", "\u{1F4DC} Covenant sign", "\u{23F1}\u{FE0F} Urgent action", "The phrase explains what Zipporah uses and why the moment is so serious.");
    } else if (lower.includes("foreskin")) {
      add(`${title} names the act of circumcision connected to God's covenant with Abraham.`, "This was not a random action.", "It was the sign that marked Abraham's family as God's covenant people.", "\u{1F4DC} Abraham's covenant", "\u{1FA78} Circumcision", "\u{1F3E0} Moses' household", "Moses cannot lead the covenant people while his own home ignores the covenant sign.");
    } else if (lower.includes("bloody husband")) {
      add(`${title} shows how shocking and costly the circumcision moment felt to Zipporah.`, "Her words are emotional because blood, danger, family, and obedience are all happening at once.", "The phrase does not make the scene comfortable.", "\u{1FA78} Blood", "\u{1F5E3}\u{FE0F} Hard words", "\u{1F4DC} Covenant cost", "It reminds the reader that covenant obedience was serious, not decorative.");
    } else {
      add(`${title} shows God providing Aaron as Moses continues toward Egypt.`, "Aaron's meeting with Moses is not accidental.", "God sends the brother Moses needs for the work ahead.", "\u{1F3DC}\u{FE0F} Wilderness meeting", "\u{1F91D} Brotherly help", "\u{1F4E3} Shared mission", "Moses will not stand before Pharaoh alone.");
    }
  } else if (lower.includes("midian") || lower.includes("shepherds") || lower.includes("drew water") || lower.includes("helped them") || lower.includes("eat bread") || lower.includes("zipporah") || lower.includes("gershom")) {
    add(`${title} moves Moses deeper into life outside Egypt.`, "In Midian, Moses is no longer in Pharaoh's palace.", "He protects vulnerable women, receives hospitality, marries, and becomes a stranger in another land.", "\u{1F3DC}\u{FE0F} Midian", "\u{1F4A7} Well", "\u{1F6B6} Stranger", "God is shaping a shepherd before sending him to lead a people through the wilderness.");
  } else if (lower.includes("process of time") || lower.includes("king of egypt died")) {
    add(`${title} reminds us that suffering can last longer than one ruler.`, "A king dies, but Israel's bondage does not disappear overnight.", "\u{23F3} Time passes", "\u{1F451} Kings change", "\u{26D3}\u{FE0F} Bondage remains", "The story is preparing us to look beyond politics to God's covenant action.");
  } else if (lower.includes("sighed") || lower.includes("cry") || lower.includes("heard") || lower.includes("groaning") || lower.includes("remembered") || lower.includes("looked") || lower.includes("respect")) {
    add(`${title} brings Israel's pain before God.`, "Remembered does not mean God had forgotten.", "It means He is now moving to act on His covenant promises.", "\u{1F442} God hears", "\u{1F4DC} God remembers", "\u{1F441}\u{FE0F} God sees", "Before Moses returns to Egypt, rescue has already begun in God's faithful attention.");
  } else if (lower.includes("flock") || lower.includes("desert") || lower.includes("horeb")) {
    add(`${title} places Moses in ordinary wilderness work before God's call.`, "He is far from Egypt and far from palace life.", "The calling comes while he is keeping sheep, not while he is chasing greatness.", "\u{1F411} Flock", "\u{1F3DC}\u{FE0F} Desert", "\u{26F0}\u{FE0F} Mountain of God", "God often prepares servants in hidden places.");
  } else if (lower.includes("angel of the lord") || lower.includes("bush") || lower.includes("fire") || lower.includes("turn aside") || lower.includes("shoes") || lower.includes("abraham") || lower.includes("isaac") || lower.includes("jacob")) {
    add(`${title} belongs to the burning bush encounter.`, "The bush burns without being consumed, and Moses learns that he is standing on holy ground.", "\u{1F525} Fire", "\u{1F463} Shoes removed", "\u{1F4DC} Covenant God", "The God who calls Moses is the same God who made promises to Abraham, Isaac, and Jacob.");
  } else if (lower.includes("seen the affliction") || lower.includes("heard their cry") || lower.includes("know their sorrows") || lower.includes("come down to deliver")) {
    add(`${title} shows God's compassion in action.`, "God does not speak about Israel's pain coldly.", "He sees, hears, knows, and comes down to deliver.", "\u{1F441}\u{FE0F} Seen", "\u{1F442} Heard", "\u{1F90D} Known", "The rescue begins in God's heart before it appears in Egypt.");
  } else if (lower.includes("good land") || lower.includes("large") || lower.includes("milk and honey")) {
    add(`${title} describes the destination of the rescue.`, "God is not only bringing Israel out of slavery.", "He is bringing them toward a spacious land of provision.", "\u{1F6AA} Out of Egypt", "\u{1F33E} Provision", "\u{1F3DE}\u{FE0F} Promised land", "Deliverance in Exodus has both an exit and a destination.");
  } else if (lower.includes("send thee") || lower.includes("who am i") || lower.includes("with thee")) {
    add(`${title} meets Moses at the point of weakness.`, "Moses looks at himself and feels small.", "God answers by promising His presence.", "\u{2753} Moses' weakness", "\u{1F91D} God's presence", "\u{1F4E3} Sent to Pharaoh", "The strength of the mission is not Moses' confidence. It is God's nearness.");
  } else if (lower.includes("what is his name") || lower.includes("i am") || lower.includes("name for ever")) {
    add(`${title} reveals the identity of the God who sends Moses.`, "God is not borrowing power from Egypt or depending on another god.", "He is the living LORD who exists by His own power and keeps covenant.", "\u{1F4DB} Name", "\u{1F54A}\u{FE0F} Presence", "\u{1F4DC} Promise", "Israel's hope rests on who God is.");
  } else if (lower.includes("elders") || lower.includes("visited you") || lower.includes("bring you up") || lower.includes("hearken")) {
    add(`${title} is part of the first hope-filled message to Israel.`, "The oppressed people need to hear that God has seen them and is moving to rescue.", "\u{1F465} Elders gathered", "\u{1F442} Message heard", "\u{1F6AA} Brought up from affliction", "Hope begins when God's word reaches people still living under pressure.");
  } else if (lower.includes("not let you go") || lower.includes("mighty hand") || lower.includes("stretch out") || lower.includes("wonders") || lower.includes("favour") || lower.includes("silver") || lower.includes("gold") || lower.includes("raiment") || lower.includes("spoil")) {
    add(`${title} tells Moses what will happen before he returns to Pharaoh.`, "God tells Moses ahead of time that Pharaoh will resist.", "The rescue will not be quiet or empty-handed.", "\u{1F4AA} Mighty hand", "\u{2728} Wonders", "\u{1FA99} Silver and gold", "After years of exploitation, Israel will leave with provision because God is just.");
  } else if (lower.includes("believe me") || lower.includes("hearken") || lower.includes("hand") || lower.includes("serpent") || lower.includes("sign") || lower.includes("bosom") || lower.includes("blood")) {
    add(`${title} is one of the signs God gives Moses.`, "Moses is afraid people will not listen, so God gives signs that confirm His message.", "\u{1F40D} Rod and serpent", "\u{270B} Hand restored", "\u{1FA78} Water to blood", "The signs are not tricks. They point people back to God's word.");
  } else if (lower.includes("eloquent") || lower.includes("slow of speech") || lower.includes("mouth") || lower.includes("tongue")) {
    add(`${title} names Moses' fear about speaking.`, "Moses is honest about his weakness.", "God does not deny that Moses feels limited; He reminds Moses who made the mouth.", "\u{1F5E3}\u{FE0F} Speech", "\u{1F610} Weakness", "\u{1F91D} God helps", "God's calling is not built on Moses being impressive.");
  } else if (lower.includes("send") || lower.includes("anger") || lower.includes("aaron") || lower.includes("speak well") || lower.includes("glad") || lower.includes("words in his mouth") || lower.includes("rod")) {
    add(`${title} shows God's provision for a reluctant servant.`, "Moses keeps pulling back, and God's anger shows the mission is serious.", "Aaron is given as help, not as an excuse to quit.", "\u{1F91D} Aaron helps", "\u{1F4E3} Words given", "\u{1F9AF} Rod in hand", "God supports His servant without canceling obedience.");
  } else if (lower.includes("let me go") || lower.includes("peace") || lower.includes("men are dead") || lower.includes("wife and his sons") || lower.includes("rod of god") || lower.includes("firstborn") || lower.includes("serve me")) {
    add(`${title} moves Moses back toward Egypt and the mission.`, "The old threat is gone, but the hard mission remains.", "God calls Israel His firstborn son, which makes the conflict deeply personal.", "\u{1F6B6} Moses returns", "\u{1F9AF} Rod of God", "\u{1F466} Israel my firstborn", "Freedom is for serving the LORD, not merely escaping Pharaoh.");
  } else if (lower.includes("aaron spake") || lower.includes("sight of the people") || lower.includes("people believed") || lower.includes("visited") || lower.includes("affliction") || lower.includes("worshipped")) {
    add(`${title} shows Israel receiving the first message of hope.`, "The people are still enslaved, but they hear that God has visited them and seen their affliction.", "\u{1F442} Word heard", "\u{2705} People believed", "\u{1F64C} Worship in bondage", "Worship begins before the rescue is complete because God's promise has reached them.");
  } else {
    add(`${title} helps explain ${section.title.toLowerCase()}.`, "The wording names something God included in the rescue story.", "\u{1F4DC} Scripture wording", "\u{1F9ED} Story direction", "\u{1F64F} God at work", `${title} helps the reader follow how God preserves, calls, sends, and rescues His people.`);
  }

  return note(lines.slice(0, 10));
}
function makeDay22PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`\u{1F4CC} ${title}`, explainDay22ExodusPhrase(section, title)];
}
function deepenDay22PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_22_REAL_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay22PhraseCard(section, title)),
  };
}

const DAY_23_REAL_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 5:1-6": ["Thus Saith The LORD God Of Israel", "Let My People Go", "Who Is The LORD", "I Know Not The LORD", "Neither Will I Let Israel Go", "The God Of The Hebrews Hath Met With Us", "Let Us Go, We Pray Thee"],
  "Exodus 5:7-9": ["Ye Shall No More Give The People Straw", "Let Them Go And Gather Straw For Themselves", "The Tale Of The Bricks", "Ye Shall Not Diminish Ought Thereof", "They Be Idle", "Let There More Work Be Laid Upon The Men"],
  "Exodus 5:10-15": ["Thus Saith Pharaoh", "I Will Not Give You Straw", "Go Ye, Get You Straw Where Ye Can Find It", "Yet Not Ought Of Your Work Shall Be Diminished", "The People Were Scattered Abroad", "The Taskmasters Hasted Them", "The Officers Of The Children Of Israel Were Beaten"],
  "Exodus 5:16-21": ["There Is No Straw Given Unto Thy Servants", "Thy Servants Are Beaten", "Ye Are Idle, Ye Are Idle", "Go Therefore Now, And Work", "They Were In Evil Case", "The LORD Look Upon You, And Judge", "Ye Have Made Our Savour To Be Abhorred"],
  "Exodus 5:22-23": ["Moses Returned Unto The LORD", "Lord, Wherefore Hast Thou So Evil Entreated This People", "Why Is It That Thou Hast Sent Me", "Since I Came To Pharaoh", "He Hath Done Evil To This People", "Neither Hast Thou Delivered Thy People At All"],
  "Exodus 6:1-6": ["Now Shalt Thou See What I Will Do", "With A Strong Hand", "I Am The LORD", "By My Name JEHOVAH", "I Have Also Established My Covenant", "I Have Also Heard The Groaning", "I Will Bring You Out From Under The Burdens"],
  "Exodus 6:7-12": ["I Will Take You To Me For A People", "I Will Be To You A God", "Ye Shall Know That I Am The LORD", "I Will Bring You In Unto The Land", "They Hearkened Not Unto Moses", "Anguish Of Spirit", "Cruel Bondage", "Uncircumcised Lips"],
  "Exodus 6:13-13": ["The LORD Spake Unto Moses And Unto Aaron", "Unto Moses And Unto Aaron", "Gave Them A Charge", "Unto The Children Of Israel", "Unto Pharaoh King Of Egypt", "To Bring The Children Of Israel Out"],
  "Exodus 6:14-19": ["These Be The Heads Of Their Fathers' Houses", "The Sons Of Reuben", "The Sons Of Simeon", "The Sons Of Levi", "According To Their Generations", "The Years Of The Life Of Levi"],
  "Exodus 6:20-25": ["Amram Took Him Jochebed His Father's Sister To Wife", "She Bare Him Aaron And Moses", "The Years Of The Life Of Amram", "Eleazar Aaron's Son", "Took Him One Of The Daughters Of Putiel", "These Are The Heads Of The Fathers Of The Levites"],
  "Exodus 6:26-30": ["These Are That Aaron And Moses", "Bring Out The Children Of Israel", "According To Their Armies", "These Are They Which Spake To Pharaoh", "I Am The LORD", "Speak Thou Unto Pharaoh", "I Am Of Uncircumcised Lips"],
  "Exodus 7:1-6": ["I Have Made Thee A God To Pharaoh", "Aaron Thy Brother Shall Be Thy Prophet", "Thou Shalt Speak All That I Command Thee", "I Will Harden Pharaoh's Heart", "Multiply My Signs And My Wonders", "The Egyptians Shall Know That I Am The LORD", "Moses And Aaron Did As The LORD Commanded"],
  "Exodus 7:7-12": ["Moses Was Fourscore Years Old", "Aaron Fourscore And Three Years Old", "Shew A Miracle For You", "Take Thy Rod", "It Shall Become A Serpent", "The Magicians Of Egypt", "Aaron's Rod Swallowed Up Their Rods"],
  "Exodus 7:13-13": ["He Hardened Pharaoh's Heart", "Pharaoh's Heart", "He Hearkened Not Unto Them", "Unto Them", "As The LORD Had Said", "The LORD Had Said"],
  "Exodus 7:14-19": ["Pharaoh's Heart Is Hardened", "He Refuseth To Let The People Go", "Get Thee Unto Pharaoh In The Morning", "The Rod Which Was Turned To A Serpent", "In This Thou Shalt Know That I Am The LORD", "The Waters Which Are In The River", "They Shall Be Turned To Blood"],
  "Exodus 7:20-25": ["He Lifted Up The Rod", "Smote The Waters That Were In The River", "All The Waters Were Turned To Blood", "The Fish That Was In The River Died", "The River Stank", "The Magicians Of Egypt Did So", "Pharaoh Turned And Went Into His House"],
  "Exodus 8:1-6": ["Let My People Go, That They May Serve Me", "If Thou Refuse To Let Them Go", "I Will Smite All Thy Borders With Frogs", "The River Shall Bring Forth Frogs Abundantly", "Into Thine House", "Into Thy Bedchamber", "The Frogs Came Up"],
  "Exodus 8:7-12": ["The Magicians Did So", "Intreat The LORD", "That He May Take Away The Frogs", "Glory Over Me", "To Morrow", "That Thou Mayest Know", "There Is None Like Unto The LORD Our God"],
  "Exodus 8:13-15": ["The Frogs Died Out", "They Gathered Them Together Upon Heaps", "The Land Stank", "When Pharaoh Saw That There Was Respite", "He Hardened His Heart", "Hearkened Not Unto Them"],
  "Exodus 8:16-19": ["Smite The Dust Of The Land", "It May Become Lice", "In Man, And In Beast", "The Magicians Did So With Their Enchantments", "But They Could Not", "This Is The Finger Of God", "Pharaoh's Heart Was Hardened"],
  "Exodus 8:20-25": ["Rise Up Early In The Morning", "Let My People Go, That They May Serve Me", "Swarms Of Flies", "The Land Was Corrupted", "I Will Sever In That Day The Land Of Goshen", "No Swarms Of Flies Shall Be There", "I Will Put A Division Between My People And Thy People"],
  "Exodus 8:26-31": ["It Is Not Meet So To Do", "We Shall Sacrifice The Abomination Of The Egyptians", "Three Days' Journey Into The Wilderness", "Only Ye Shall Not Go Very Far Away", "Intreat For Me", "Let Not Pharaoh Deal Deceitfully Any More", "There Remained Not One"],
  "Exodus 8:32-32": ["Pharaoh Hardened His Heart At This Time Also", "At This Time Also", "Neither Would He Let The People Go", "The People", "Let The People Go", "His Heart"],
};

const DAY_23_SECTION_EXPLANATIONS: Record<string, string[]> = {
  "Exodus 5:1-6": ["Moses and Aaron stand before Pharaoh with God's command.", "Pharaoh's question, 'Who is the LORD?' becomes the issue the plagues will answer.", "The request is about worship, not laziness or politics.", "Exodus is confronting Pharaoh's control with the LORD's claim over His people."],
  "Exodus 5:7-9": ["Pharaoh answers God's word by making Israel's labor harder.", "No straw, same brick quota, and more work show cruelty hidden inside administration.", "He wants exhaustion to drown out hope.", "Oppression often tries to make people too tired to listen to God's promise."],
  "Exodus 5:10-15": ["The taskmasters and officers carry Pharaoh's harsh order into the work sites.", "The people scatter for straw but the quota remains unchanged.", "The beating of Israel's officers shows how Pharaoh turns pressure inward among the oppressed.", "This section makes the cost of Pharaoh's refusal painfully concrete."],
  "Exodus 5:16-21": ["Israel's officers appeal to Pharaoh and are blamed instead of helped.", "Then they turn on Moses and Aaron because obedience has made life harder at first.", "Deliverance has begun, but the first visible result is pain.", "God's rescue can intensify conflict before freedom appears."],
  "Exodus 5:22-23": ["Moses brings his confusion directly to the LORD.", "He does not hide that the mission looks like failure.", "His prayer is raw, frustrated, and honest.", "Faithful servants can ask hard questions when obedience becomes painful."],
  "Exodus 6:1-6": ["God answers Moses by repeating who He is and what He will do.", "The covenant, the groaning, the burdens, and the strong hand all belong together.", "God's name is the foundation of rescue.", "When Moses sees only failure, the LORD restates His promise."],
  "Exodus 6:7-12": ["God gives repeated 'I will' promises, but Israel cannot hear because their spirit is crushed.", "Anguish of spirit and cruel bondage explain why hope feels hard to receive.", "Moses also feels inadequate and brings up his uncircumcised lips again.", "God keeps speaking even when people are too hurt to listen well."],
  "Exodus 6:13-13": ["This single verse resets the mission with Moses and Aaron together.", "God gives them a charge toward Israel and Pharaoh.", "The rescue is still moving after discouragement.", "God's command stands when human confidence collapses."],
  "Exodus 6:14-19": ["The genealogy locates Moses and Aaron inside Israel's family story.", "Reuben, Simeon, and Levi connect Exodus back to Jacob's sons.", "These names show the deliverers coming from the covenant people.", "God's rescue has roots in a real family line."],
  "Exodus 6:20-25": ["The genealogy narrows to the Levite family of Moses and Aaron.", "Parents, sons, marriages, and priestly descendants are named.", "God works through actual households, not vague heroes.", "The future priestly line is already being placed into the story."],
  "Exodus 6:26-30": ["The genealogy closes by identifying the same Moses and Aaron who speak to Pharaoh.", "The repeated wording connects the family list to the mission.", "Moses' weakness is repeated too, so the focus stays on God's command.", "God uses named, limited people to carry His word."],
  "Exodus 7:1-6": ["God defines the roles of Moses and Aaron before the signs intensify.", "Moses will represent God's authority to Pharaoh, and Aaron will speak as prophet.", "Pharaoh's hard heart is expected, not surprising.", "The purpose is that Egypt will know the LORD when His hand acts."],
  "Exodus 7:7-12": ["Moses and Aaron are old when the confrontation begins, and the rod sign is given before Pharaoh.", "Egypt's magicians imitate the sign, but Aaron's rod swallows theirs.", "Counterfeit power is exposed as lesser.", "The contest is not equal."],
  "Exodus 7:13-13": ["After the rod sign, Pharaoh still refuses to listen.", "Evidence alone does not soften a hardened heart.", "The LORD had already said this would happen.", "Resistance does not mean God's word failed."],
  "Exodus 7:14-19": ["The first plague targets the Nile, Egypt's life source and the river Pharaoh used for death.", "God tells Moses to confront Pharaoh in the morning with the rod.", "The water turning to blood reveals that the LORD rules what Egypt trusts.", "Judgment begins where Egypt felt secure."],
  "Exodus 7:20-25": ["The Nile turns to blood, fish die, the river stinks, and Egypt cannot drink.", "The plague touches daily life, food, smell, water, and survival.", "The magicians imitate enough to harden Pharaoh but cannot heal the river.", "Power that only copies judgment cannot save."],
  "Exodus 8:1-6": ["God repeats the command to let His people go serve Him.", "When Pharaoh refuses, frogs invade Egypt's borders, houses, beds, ovens, and people.", "The plague is intentionally intrusive and humiliating.", "God can make creation unsettle the palace that defies Him."],
  "Exodus 8:7-12": ["The magicians imitate frogs, but Pharaoh needs Moses to pray for removal.", "This exposes the difference between imitation and deliverance.", "Moses lets Pharaoh name the time so he will know there is none like the LORD.", "God's power is not only to strike but also to remove."],
  "Exodus 8:13-15": ["The frogs die, the land stinks, and Pharaoh receives relief.", "But relief does not become repentance.", "As soon as the pressure lifts, Pharaoh hardens his heart again.", "There is a difference between wanting pain gone and surrendering to God."],
  "Exodus 8:16-19": ["The dust becomes lice on people and animals, and Egypt's magicians reach their limit.", "Their confession, 'This is the finger of God,' is a major moment.", "Even Egypt's experts recognize a power beyond them.", "Pharaoh still refuses, showing that the problem is not lack of evidence."],
  "Exodus 8:20-25": ["The flies bring another confrontation, but this time God marks out Goshen.", "The distinction shows that Israel belongs to the LORD even while still living in Egypt.", "God's judgment can be precise, not chaotic.", "The plagues reveal both judgment against Pharaoh and protection over God's people."],
  "Exodus 8:26-31": ["Pharaoh begins bargaining with partial obedience, but Moses refuses worship on Pharaoh's terms.", "The three days' journey matters because God defines the worship He requires.", "Moses warns Pharaoh not to deal deceitfully again.", "Half-obedience is still control when Pharaoh keeps setting the limits."],
  "Exodus 8:32-32": ["The final verse shows the pattern continuing.", "Pharaoh receives relief and hardens his heart again.", "The people are still not released.", "Repeated mercy can be rejected by a heart committed to control."],
};

function buildDay23PhraseExplanation(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  const is = (...items: string[]) => items.includes(title);
  const has = (...items: string[]) => items.some((item) => lower.includes(item));

  if (section.reference === "Exodus 5:1-6") {
    if (title === "Thus Saith The LORD God Of Israel") {
      add("These words mean Moses and Aaron are not speaking for themselves.", "They are carrying the command of Israel's covenant God into Pharaoh's court.", "In the ancient world, a messenger spoke with the authority of the one who sent him.", "\u{1F4DC} God's message", "\u{1F5E3}\u{FE0F} Moses and Aaron speak", "\u{1F451} Pharaoh is confronted", "Pharaoh is not being asked to consider Moses' opinion.", "He is being confronted by the LORD's command.");
    } else if (title === "Let My People Go") {
      add("This is God's claim over Israel.", "Pharaoh treats Israel like labor property.", "The LORD calls them My people.", "\u{1F6AA} Release from bondage", "\u{1F64C} Freedom for worship", "\u{1F4DC} God keeps covenant", "The command exposes the lie that Pharaoh owns them.", "Israel is the LORD's before Egypt ever tries to claim them.");
    } else if (title === "Who Is The LORD") {
      add("This is Pharaoh's challenge against God's authority.", "He is not asking a humble question because he wants to learn.", "He is saying, in effect, 'Why should I obey this God?'", "\u{1F451} Pharaoh claims power", "\u{1F64C} The LORD claims Israel", "\u{2694}\u{FE0F} The conflict is now open", "The plagues will answer Pharaoh's question.", "They will show that the LORD rules Egypt, creation, and Pharaoh himself.");
    } else if (title === "I Know Not The LORD") {
      add("This means Pharaoh refuses to recognize the God of Israel.", "In the Bible, knowing God is more than knowing a fact about Him.", "It means acknowledging Him, honoring Him, and responding rightly to Him.", "\u{1F6AB} No recognition", "\u{1F512} No obedience", "\u{1F4A2} Proud refusal", "Pharaoh hears God's command and rejects it.", "His ignorance is proud, not innocent.");
    } else if (title === "Neither Will I Let Israel Go") {
      add("This is Pharaoh's flat refusal to release God's people.", "He rejects the LORD's authority.", "He keeps Israel under forced labor.", "\u{1F512} Refusal", "\u{1F9F1} Slavery protected", "\u{2694}\u{FE0F} God versus Pharaoh", "This sentence makes the conflict plain.", "The king of Egypt is resisting the command of God.");
    } else if (title === "The God Of The Hebrews Hath Met With Us") {
      add("This explains why Israel must leave Egypt to worship.", "Hebrews is the name Pharaoh would understand for this enslaved people group.", "Hath met with us means God has appeared, spoken, and summoned His people.", "\u{1F465} The Hebrews are Israel", "\u{1F525} God has appeared", "\u{26FA} Worship requires obedience", "Israel's worship is not a hobby Pharaoh can schedule.", "Their God has called them, and Pharaoh is standing in the way.");
    } else {
      add("We pray thee is old wording for please or we ask you.", "Moses and Aaron are asking for space to obey God's summons.", "The request is about worship, not laziness.", "\u{26FA} Journey", "\u{1F525} Sacrifice", "\u{1F64F} Worship", "Pharaoh hears worship as a threat.", "Worship means Israel answers to someone higher than him.");
    }
  } else if (section.reference.startsWith("Exodus 5:7") || section.reference.startsWith("Exodus 5:10") || section.reference.startsWith("Exodus 5:16")) {
    if (has("straw")) {
      add(`${title} focuses on the material Israel needed for making bricks.`, "Straw helped mud bricks hold together.", "Pharaoh removes the supply but still demands the same work.", "\u{1F33E} Straw withheld", "\u{1F9F1} Bricks still required", "\u{1F4A2} Cruel pressure", "The phrase explains why the command was so crushing.", "Pharaoh makes obedience to God feel costly by making daily labor harder.");
    } else if (has("tale of the bricks", "diminish", "work")) {
      add(`${title} focuses on Pharaoh's impossible quota.`, "Tale means the required number or count.", "The workers must produce the same amount with fewer supplies.", "\u{1F9F1} Same count", "\u{23F3} Same deadline", "\u{1F4A2} Less help", "This is not normal discipline.", "It is a system designed to punish hope.");
    } else if (has("idle")) {
      add(`${title} is Pharaoh's accusation against Israel.`, "He claims they only want to worship because they are lazy.", "That is not true.", "\u{1F4A2} False accusation", "\u{1F9F1} Forced labor", "\u{1F64C} Worship mocked", "Pharaoh twists spiritual obedience into laziness.", "Oppression often lies about the people it is hurting.");
    } else if (has("scattered")) {
      add(`${title} shows the people spreading out to search for straw.`, "They are not resting.", "They are scrambling to survive Pharaoh's new order.", "\u{1F33E} Searching for straw", "\u{1F9F1} Still making bricks", "\u{1F623} More exhaustion", "The phrase helps the reader feel how cruel the command was.", "Israel's work has become harder before deliverance becomes visible.");
    } else if (has("taskmasters", "hasted")) {
      add(`${title} describes the pressure of Pharaoh's supervisors.`, "Hasted means they pushed the workers urgently.", "The taskmasters enforce the same quota even when the straw is gone.", "\u{23F3} Hurry", "\u{1F9F1} Brick quota", "\u{1F4A2} Threats", "The phrase shows oppression working through daily management.", "Cruelty becomes a schedule, a demand, and a beating.");
    } else if (has("beaten")) {
      add(`${title} shows the violence behind Pharaoh's command.`, "The officers of Israel are punished when the impossible quota is not met.", "These are Israelite leaders caught between Pharaoh and their own people.", "\u{1F4A2} Beaten officers", "\u{1F9F1} Impossible labor", "\u{1F623} Suffering spreads", "The phrase makes the oppression physical.", "Pharaoh's refusal lands on real backs and real families.");
    } else if (has("evil case")) {
      add(`${title} means the Israelite officers realize they are in serious trouble.`, "Their appeal to Pharaoh has failed.", "The workload remains impossible.", "\u{1F623} No relief", "\u{1F9F1} Same quota", "\u{1F4A2} Pharaoh unmoved", "The phrase captures the trapped feeling of oppression.", "They cannot satisfy Pharaoh, and they do not yet see deliverance.");
    } else if (has("savour", "abhorred")) {
      add(`${title} is old Bible wording for becoming hated in someone's eyes.`, "Savour can mean smell or reputation.", "The officers feel Moses and Aaron have made Israel offensive to Pharaoh.", "\u{1F443} Reputation", "\u{1F4A2} Pharaoh's anger", "\u{1F623} Israel's fear", "They blame the messengers because obedience has made life harder at first.", "The phrase shows how suffering can turn people against the very message God sent to rescue them.");
    } else {
      add(`${title} explains another piece of Pharaoh's forced-labor punishment.`, "The words keep the focus on how Egypt controls Israel through work.", "Pharaoh is trying to bury hope under exhaustion.", "\u{1F9F1} Labor", "\u{1F4A2} Pressure", "\u{1F623} Weariness", "The phrase matters because deliverance is not abstract.", "God is rescuing people from real oppression.");
    }
  } else if (section.reference === "Exodus 5:22-23") {
    add(`${title} comes from Moses' honest prayer after the mission becomes painful.`, "Moses obeyed God, but Pharaoh made Israel's suffering worse.", "He brings that confusion to the LORD instead of pretending everything feels fine.", "\u{1F64F} Honest prayer", "\u{1F623} Confusion", "\u{23F3} Rescue not visible yet", "The phrase teaches that faithful servants can bring hard questions to God.", "Moses is struggling, but he is struggling in God's presence.");
  } else if (section.chapter === 6) {
    if (is("I Am The LORD", "By My Name JEHOVAH", "Ye Shall Know That I Am The LORD")) {
      add(`${title} centers the rescue on God's own name.`, "The LORD is not one more power competing with Pharaoh.", "He is the covenant God who keeps His word.", "\u{1F3F7}\u{FE0F} God's name", "\u{1F4DC} Covenant faithfulness", "\u{26A1} Rescue power", "Exodus is teaching Israel who their Deliverer is.", "The rescue rests on God's character, not on Moses' confidence.");
    } else if (has("what i will do", "strong hand", "bring you out", "redeem you", "rid you out")) {
      add(`${title} explains that the rescue will come from the LORD's power.`, "Moses has just seen Pharaoh make things worse.", "God answers by pointing Moses to what He Himself will do.", "\u{1F4AA} Strong hand", "\u{1F6AA} Freedom from Egypt", "\u{1F64C} God acts", "The phrase shifts attention away from Pharaoh's cruelty.", "The LORD is about to show that Egypt's power is not final.");
    } else if (has("covenant", "abraham", "isaac", "jacob")) {
      add(`${title} ties the Exodus rescue back to God's promises in Genesis.`, "Covenant means God bound Himself to His promise.", "Israel's suffering has not erased what God said to the fathers.", "\u{1F4DC} Promise", "\u{1F474} Abraham, Isaac, and Jacob", "\u{1F64C} God remembers", "The phrase matters because Exodus is not a new plan.", "It is God keeping the promise He already made.");
    } else if (has("groaning", "anguish", "cruel bondage", "burdens")) {
      add(`${title} names the pain Israel is living under.`, "The suffering is physical, emotional, and daily.", "God hears it and answers it.", "\u{1F442} God hears", "\u{1F494} Crushed spirit", "\u{1F9F1} Heavy bondage", "The phrase keeps the rescue connected to real pain.", "The LORD does not wait for Israel to feel strong before He speaks deliverance.");
    } else if (has("bring", "take you", "people", "land")) {
      add(`${title} is one of God's rescue promises.`, "The LORD speaks in strong I will language.", "He promises more than escape from Egypt.", "\u{1F6AA} Bring out", "\u{1F465} Take as His people", "\u{1F3DE}\u{FE0F} Bring into the land", "The phrase shows deliverance with direction.", "God is bringing Israel out of bondage and toward covenant life with Him.");
    } else if (has("uncircumcised lips")) {
      add(`${title} is Moses' way of saying he feels unfit to speak.`, "Uncircumcised often means something is not prepared or acceptable for holy use.", "Moses feels his mouth is not ready for Pharaoh's court.", "\u{1F5E3}\u{FE0F} Weak speech", "\u{1F61F} Fear", "\u{1F64C} God still sends him", "The phrase keeps Moses' weakness in view.", "God's mission depends on God's command, not Moses feeling impressive.");
    } else if (has("charge", "aaron", "moses", "pharaoh", "children of israel")) {
      add(`${title} places Moses and Aaron inside the mission God gives them.`, `${title} shows real brothers from Israel's own family line being named in the rescue story.`, `Through ${title}, God sends His servants toward both Israel and Pharaoh.`, "\u{1F465} Moses and Aaron", "\u{1F4DC} Given a charge", "\u{1F6AA} Bring Israel out", `${title} shows the mission continues because God commands it.`, `${title} does not depend on the messengers feeling fearless.`);
    } else {
      add(`${title} places the deliverance story inside Israel's real family line.`, `${title} keeps the rescue tied to actual households and generations.`, `Through ${title}, the deliverers do not appear from nowhere.`, "\u{1F3E0} Family line", "\u{1F4DC} Genesis connection", "\u{1F64F} Future priesthood", `${title} shows God preserving His promise through named families.`, `${title} keeps the promise grounded in real history.`);
    }
  } else if (section.chapter === 7) {
    if (has("god to pharaoh", "prophet", "speak all that i command")) {
      add(`${title} explains the speaking role God gives Moses and Aaron.`, "Moses stands before Pharaoh with God's authority behind him.", "Aaron speaks the message as God's appointed spokesman.", "\u{1F5E3}\u{FE0F} Aaron speaks", "\u{1F4DC} Moses carries authority", "\u{1F451} Pharaoh is confronted", "This does not make Moses divine.", "It means Pharaoh must deal with God's word through Moses.");
    } else if (has("harden", "heart", "hearken", "refuseth")) {
      add(`${title} describes stubborn resistance to God's word.`, "A hard heart is not just a person lacking information.", "Pharaoh sees warnings and signs yet keeps refusing the LORD's command.", "\u{1F512} Stubborn heart", "\u{1F442} Refuses to listen", "\u{26A0}\u{FE0F} Warning ignored", "The phrase exposes pride at the center of the conflict.", "Pharaoh's problem is spiritual before it is political.");
    } else if (has("signs", "wonders", "miracle", "rod", "serpent", "magicians", "swallowed")) {
      add(`${title} explains one of the public signs before Pharaoh.`, `${title} is not a trick for entertainment.`, `${title} confirms that the LORD's message is backed by His power.`, "\u{1F40D} Rod and serpent", "\u{26A1} Signs", "\u{1F525} Counterfeit power exposed", `${title} shows Egypt's magicians can imitate some things.`, `${title} also shows they cannot defeat God's authority.`);
    } else if (has("know that i am the lord", "egyptians shall know")) {
      add(`${title} gives the teaching purpose behind God's judgments.`, "The plagues are not only punishments.", "They reveal who truly rules.", "\u{26A1} Judgment", "\u{1F440} Revelation", "\u{1F64C} No rival", "Egypt, Pharaoh, and Israel are being shown that the LORD alone is God.", "God is making His name known.");
    } else if (has("river", "waters", "blood", "fish", "stank")) {
      add(`${title} explains the Nile plague, where Egypt's life source becomes death.`, "The Nile was central to Egypt's food, water, economy, and religious imagination.", "God strikes the place Egypt trusted most.", "\u{1F30A} Nile River", "\u{1FA78} Blood", "\u{1F41F} Fish died", "The river Pharaoh once used for Hebrew death becomes a sign of judgment against Egypt.", "The LORD rules what Egypt worshiped and depended on.");
    } else {
      add(`${title} helps explain the first public confrontation before the plagues intensify.`, `${title} keeps the reader close to the exact action God commanded.`, `Through ${title}, Pharaoh is seeing God's message backed by God's power.`, "\u{1F4DC} Command", "\u{1F451} Pharaoh confronted", "\u{26A1} God's power", `${title} matters because Exodus is proving the LORD's authority step by step.`);
    }
  } else if (section.chapter === 8) {
    if (has("let my people go", "if thou refuse")) {
      add(`${title} keeps the LORD's command clear before another plague falls.`, "Pharaoh is not confused about what God requires.", "He is refusing a direct command.", "\u{1F6AA} Release", "\u{1F64C} Worship", "\u{26A0}\u{FE0F} Warning", "The phrase shows that judgment comes after clear warning.", "God tells Pharaoh what obedience would look like before the plague arrives.");
    } else if (has("that thou mayest know", "there is none like")) {
      add(`${title} explains why the LORD times and removes the plague so clearly.`, "The point is not only that frogs leave Egypt.", "The point is that Pharaoh must know the LORD has no equal.", "\u{1F440} Pharaoh sees", "\u{1F64C} No rival", "\u{23F3} God's timing", "The phrase turns the miracle into a lesson.", "Relief itself becomes evidence that the LORD rules.");
    } else if (has("there remained not one")) {
      add(`${title} means the LORD removed the flies completely after Moses prayed.`, "The plague does not fade away halfway.", "God removes it so clearly that Pharaoh receives unmistakable mercy.", "\u{1F64F} Moses prays", "\u{1FAB0} Flies removed", "\u{26A0}\u{FE0F} Mercy tested", "The phrase matters because relief should have led Pharaoh to obey.", "Instead, he hardens his heart again.");
    } else if (has("at this time also")) {
      add(`${title} means Pharaoh repeats the same hard-hearted response again.`, "He has already seen warnings, plagues, prayer, and relief.", "Still, he returns to refusal.", "\u{1F501} Again", "\u{1F512} Same hard heart", "\u{1F6AB} Release denied", "The phrase shows a pattern, not one bad moment.", "Repeated mercy can be rejected by a heart committed to control.");
    } else if (title === "The People") {
      add("The People refers to Israel, the enslaved people Pharaoh still refuses to release.", "They are not just workers in Egypt's economy.", "They are the people the LORD has claimed as His own.", "\u{1F465} Israel", "\u{1F9F1} Enslaved laborers", "\u{1F64C} Claimed by God", "The phrase keeps real families in view.", "Pharaoh's refusal is hurting people God intends to rescue.");
    } else if (has("frogs", "bedchamber", "house", "heaps", "land stank")) {
      add(`${title} explains the frog plague invading ordinary life.`, `${title} shows frogs entering houses, bedrooms, ovens, and kneading bowls.`, `${title} makes the plague powerful, humiliating, and impossible to ignore.`, "\u{1F438} Frogs everywhere", "\u{1F3E0} Homes invaded", "\u{1F443} The land stank", `${title} shows the LORD can make creation unsettle the palace that refuses Him.`, `${title} reminds the reader that even Pharaoh's private spaces are not outside God's reach.`);
    } else if (has("intreat", "glory over me", "to morrow", "respite")) {
      add(`${title} shows Pharaoh wanting relief from the plague.`, "Intreat means ask or plead in prayer.", "Pharaoh wants Moses to pray, but he does not truly surrender.", "\u{1F64F} Prayer requested", "\u{23F3} Relief comes", "\u{1F512} Heart hardens", "The phrase helps separate relief from repentance.", "Pharaoh wants pain removed, but he still wants control.");
    } else if (has("lice", "dust", "could not", "finger of god")) {
      add(`${title} explains the plague where Egypt's magicians reach their limit.`, "The dust becoming lice touches people and animals throughout Egypt.", "When the magicians say, 'This is the finger of God,' they admit a power beyond their enchantments.", "\u{1F32B}\u{FE0F} Dust", "\u{1FAB2} Lice", "\u{261D}\u{FE0F} God's finger", "Pharaoh still refuses.", "The issue is no longer lack of evidence.");
    } else if (has("swarms of flies", "land was corrupted", "goshen", "no swarms", "division", "sever")) {
      add(`${title} explains how God makes a visible difference during the fly plague.`, "Goshen is the region where Israel lived inside Egypt.", "The LORD marks His people off from Egypt's judgment.", "\u{1FAB0} Swarms", "\u{1F4CD} Goshen", "\u{1F6E1}\u{FE0F} Protection", "Judgment in Exodus is precise, not random.", "The plague teaches Pharaoh that the LORD can judge Egypt while preserving Israel.");
    } else if (has("not meet", "abomination", "three days", "not go very far", "deal deceitfully")) {
      add(`${title} explains why Pharaoh's compromise is not true obedience.`, "Moses refuses worship on Pharaoh's terms.", "Egyptian religion would treat Israel's sacrifices as offensive.", "\u{26FA} Wilderness worship", "\u{1F6AB} Pharaoh's limits rejected", "\u{1F4DC} God's terms", "Three days' journey means Israel must worship where and how God commanded.", "Partial permission still keeps Pharaoh in control.");
    } else if (has("hardened", "heart", "would he let", "let the people go")) {
      add(`${title} describes Pharaoh returning to refusal after relief.`, "The pressure lifts, but his heart does not soften.", "He keeps denying the release God commanded.", "\u{23F3} Relief received", "\u{1F512} Hard heart", "\u{1F6AB} Release refused", "The phrase shows a repeated pattern.", "Pharaoh wants mercy without surrender.");
    } else {
      add(`${title} keeps the reader close to the exact movement of the plague story.`, "The LORD is confronting Pharaoh through warnings, judgments, mercy, and clear commands.", "Each phrase helps decode what Pharaoh is refusing and what God is revealing.", "\u{1F4DC} Command", "\u{2696}\u{FE0F} Judgment", "\u{1F64C} The LORD revealed", "The words should be read slowly because every detail is teaching Pharaoh who the LORD is.");
    }
  } else {
    add(`${title} is wording the reader should slow down and understand.`, "The phrase comes from the conflict between the LORD and Pharaoh.", "It keeps the reader close to the exact movement of Exodus.", "\u{1F4DC} Command", "\u{2694}\u{FE0F} Refusal", "\u{1F64C} The LORD revealed", "The card is meant to decode the words, not skip over them.");
  }

  return note(lines.slice(0, 8));
}
function explainDay23Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  return buildDay23PhraseExplanation(section, title);

  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower === "thus saith the lord god of israel") {
    add("Thus Saith The LORD God Of Israel means Moses and Aaron are not bringing a personal request.", "They are speaking as messengers for Israel's covenant God.", "In the ancient world, a messenger spoke with the authority of the one who sent him.", "🗣️ God is the speaker", "📜 Moses carries the message", "👑 Pharaoh is being confronted", "Pharaoh is not being asked to consider Moses' opinion. He is being confronted by the LORD's command.");
  } else if (lower === "who is the lord") {
    add("Who Is The LORD is Pharaoh's challenge against God's authority.", "Pharaoh is not asking a humble Bible-study question.", "He is saying, in effect, 'Why should I obey this God?'", "👑 Pharaoh claims power", "🙌 The LORD claims Israel", "⚔️ The conflict is now open", "The plagues will answer Pharaoh's question by showing that the LORD rules Egypt, creation, and Pharaoh himself.");
  } else if (lower === "i know not the lord") {
    add("I Know Not The LORD means Pharaoh refuses to recognize the God of Israel.", "In the Bible, to know God is not just to know a fact about Him.", "It means to acknowledge Him, honor Him, and respond rightly to Him.", "🚫 No recognition", "🔒 No obedience", "💢 Proud refusal", "Pharaoh's ignorance is moral, not innocent. He hears God's command and rejects it.");
  } else if (lower === "the god of the hebrews hath met with us") {
    add("The God Of The Hebrews Hath Met With Us explains why Israel must leave Egypt to worship.", "Hebrews is the name Pharaoh would understand for this enslaved people group.", "Hath met with us means God has appeared, spoken, and summoned His people.", "👥 The Hebrews are Israel", "🔥 God has appeared to Moses", "⛺ Worship requires obedience", "Moses is saying that Israel's worship is not a hobby Pharaoh can schedule. Their God has called them, and Pharaoh is standing in the way.");
  } else if (lower === "let my people go") {
    add("Let My People Go is God's claim over Israel.", "Pharaoh treats Israel like labor property, but the LORD calls them My people.", "Freedom in Exodus is not just escape from bad conditions.", "🚪 Release from bondage", "🙌 Freedom for worship", "📜 God keeps covenant", "The command confronts Pharaoh's ownership. Israel is claimed by the LORD before Egypt ever tries to claim them.");
  } else if (lower === "let my people go, that they may serve me" && section.reference === "Exodus 8:1-6") {
    add("Let My People Go, That They May Serve Me repeats the purpose of Israel's freedom before the frog plague.", "The LORD does not ask Pharaoh for vague kindness. He commands release so Israel can serve Him.", "🚪 Let them go", "🙌 Serve the LORD", "🐸 Warning before frogs", "The plague comes because Pharaoh keeps blocking worship.");
  } else if (lower === "let my people go, that they may serve me") {
    add("Let My People Go, That They May Serve Me is repeated before the fly plague so Pharaoh cannot pretend he misunderstood.", "The demand has stayed the same from the beginning.", "🚪 Release", "🙌 Worship", "📜 Same command", "The LORD's word is clear even when Pharaoh keeps trying to bargain around it.");
  } else if (lower.includes("let us go")) {
    add(`${title} is Moses and Aaron's respectful request for Israel to obey God's summons.`, "We pray thee is old wording for please or we ask you.", "The request is not laziness. It is about leaving Egypt long enough to worship and sacrifice to the LORD.", "⛺ Journey", "🔥 Sacrifice", "🙏 Worship", "Pharaoh hears worship as a threat because worship means Israel answers to someone higher than him.");
  } else if (lower.includes("neither will i let israel go")) {
    add(`${title} is Pharaoh's flat refusal to release God's people.`, "He rejects the LORD's authority and keeps Israel under forced labor.", "This is the human conflict at the surface of Exodus.", "🔒 Refusal", "🧱 Slavery protected", "⚔️ God versus Pharaoh", "The rest of the plague story shows what happens when a king refuses the command of God.");
  } else if (lower.includes("thus saith pharaoh")) {
    add(`${title} deliberately echoes God's messenger formula, but now Pharaoh speaks his own cruel command.`, "The story sets two voices against each other.", "God says, 'Let My people go.' Pharaoh says, 'I will not give you straw.'", "📜 God's word", "👑 Pharaoh's decree", "🧱 Hard labor", "Pharaoh tries to answer God's command with heavier oppression.");
  } else if (lower.includes("straw") || lower.includes("bricks") || lower.includes("tale of the bricks") || lower.includes("diminish") || lower.includes("work") || lower.includes("idle") || lower.includes("taskmasters") || lower.includes("beaten") || lower.includes("evil case")) {
    add(`${title} shows how Pharaoh turns worship into a labor crisis.`, "Bricks in Egypt were often made with mud and straw. Straw helped hold the bricks together.", "Pharaoh removes the straw but keeps the same quota.", "🧱 Same brick count", "🌾 No supplied straw", "💢 More pressure", "The cruelty is calculated: Pharaoh wants Israel too exhausted to listen to Moses or hope in God's rescue.");
  } else if (lower.includes("savour") || lower.includes("abhorred")) {
    add(`${title} is old Bible wording for becoming hated or disgusting in someone's eyes.`, "The Israelite officers mean Moses and Aaron have made them look offensive to Pharaoh.", "They blame the messengers because obedience has made life harder at first.", "👃 Savour means smell or reputation", "💢 Pharaoh is angrier", "😣 Israel feels trapped", "Oppression can turn suffering people against the very rescue God has begun.");
  } else if (lower.includes("moses returned") || lower.includes("wherefore") || lower.includes("why is it") || lower.includes("since i came") || lower.includes("done evil") || lower.includes("neither hast thou delivered")) {
    add(`${title} shows Moses bringing his confusion directly to the LORD.`, "Moses obeyed, but the first result looked worse, not better.", "His prayer is honest pain from a servant who does not understand God's timing.", "🙏 Honest prayer", "😣 Confusion", "⏳ Deliverance not visible yet", "Faithful people can bring hard questions to God instead of pretending they are fine.");
  } else if (lower === "i am the lord" && section.reference === "Exodus 6:1-6") {
    add("I Am The LORD is God's answer to Moses' fear after things got worse.", "The rescue does not rest on Pharaoh changing his mind or Moses feeling confident.", "📛 God's name", "💪 God's authority", "📜 God's promise", "The LORD anchors Moses in who He is before explaining what He will do.");
  } else if (lower === "i am the lord") {
    add("I Am The LORD repeats God's identity after the genealogy returns to the mission.", "The family line matters, but God's name is still the foundation of the rescue.", "📛 The LORD speaks", "👥 Moses and Aaron are sent", "👑 Pharaoh must hear", "The deliverers are human, but the authority behind them is divine.");
  } else if (lower.includes("strong hand") || lower.includes("bring you out") || lower.includes("burdens") || lower.includes("take you to me") || lower.includes("be to you a god") || lower.includes("bring you in")) {
    add(`${title} is God's rescue promise stated with certainty.`, "The repeated I will language matters because Israel cannot free themselves.", "God promises rescue from burdens, relationship with Him, and movement toward the land He swore to give.", "💪 Strong hand", "🚪 Bring out", "🏞️ Bring in", "The LORD's promise is bigger than Pharaoh's pressure.");
  } else if (lower.includes("i am the lord") || lower.includes("jehovah") || lower.includes("ye shall know")) {
    add(`${title} anchors the rescue in God's own name and character.`, "The LORD is not proving Himself because He is insecure.", "He is teaching Israel and Egypt who truly rules.", "📛 God's name", "📜 Covenant faithfulness", "⚡ Rescue power", "Knowing the LORD in Exodus means seeing His word, judgment, mercy, and promises prove true.");
  } else if (lower.includes("covenant") || lower.includes("groaning") || lower.includes("anguish") || lower.includes("cruel bondage")) {
    add(`${title} connects Israel's suffering to God's remembered promise.`, "God hears the groaning of enslaved people and acts because He keeps covenant.", "Anguish of spirit means their pain is so deep that hope feels hard to receive.", "👂 God hears", "📜 God remembers", "💔 Crushed spirit", "The LORD does not wait for Israel to feel strong before He speaks rescue.");
  } else if (lower.includes("uncircumcised lips")) {
    add(`${title} is Moses' way of saying he feels unfit to speak.`, "Uncircumcised often means something is not prepared, clean, or acceptable for holy use.", "Moses is saying his mouth feels inadequate for Pharaoh's court.", "🗣️ Weak speech", "😟 Fear", "🙌 God still sends him", "The focus stays on God's command, not Moses' confidence.");
  } else if (lower.includes("charge") || lower.includes("aaron") || lower.includes("moses") || lower.includes("bring the children") || lower.includes("spake to pharaoh")) {
    add(`${title} shows God assigning the mission to real people with real weakness.`, "Moses and Aaron are named because Exodus is not a myth about vague heroes.", "God uses brothers from Israel's own family line to confront Pharaoh.", "👥 Moses and Aaron", "📜 Given a charge", "🚪 Bring Israel out", "The mission continues because God commands it, not because the messengers feel fearless.");
  } else if (lower.includes("reuben") || lower.includes("simeon") || lower.includes("levi") || lower.includes("generations") || lower.includes("fathers") || lower.includes("jochebed") || lower.includes("amram") || lower.includes("eleazar") || lower.includes("putiel") || lower.includes("levites")) {
    add(`${title} places the deliverance story inside Israel's real family line.`, "Genealogies can feel slow, but they show that God works through actual households and generations.", "Reuben, Simeon, and Levi connect Exodus back to Jacob's sons in Genesis.", "🏠 Family line", "📜 Genesis connection", "🙏 Future priesthood", "The deliverers do not appear from nowhere. They come from the covenant people God promised to preserve.");
  } else if (lower.includes("god to pharaoh") || lower.includes("prophet")) {
    add(`${title} explains the speaking roles God gives Moses and Aaron.`, "Moses will stand before Pharaoh with God's authority behind him.", "Aaron will speak the message like a prophet, meaning a spokesman for another.", "🗣️ Aaron speaks", "📜 Moses carries authority", "👑 Pharaoh is confronted", "This does not make Moses divine. It means Pharaoh must deal with God's word through Moses.");
  } else if (lower === "pharaoh's heart") {
    add("Pharaoh's Heart points to the inner center of Pharaoh's refusal.", "The Bible is not only describing Pharaoh's policy choices.", "It is exposing the stubborn place inside him that will not bow to the LORD.", "👑 Pharaoh", "🔒 Heart shut", "⚠️ Warning ignored", "The conflict is spiritual before it is political.");
  } else if (lower === "unto them") {
    add("Unto Them refers to Moses and Aaron as God's messengers before Pharaoh.", "Pharaoh is not merely ignoring two Hebrew men.", "He is refusing the message God sent through them.", "👥 Moses and Aaron", "📜 God's message", "👂 Pharaoh will not listen", "Rejecting the messenger becomes rejection of the One who sent them.");
  } else if (lower === "the lord had said") {
    add("The LORD Had Said reminds the reader that Pharaoh's refusal did not surprise God.", "God had already warned Moses that Pharaoh would resist.", "📜 God spoke beforehand", "🔒 Pharaoh resisted", "🙌 God's plan still stands", "Resistance does not mean God's word failed.");
  } else if (lower === "his heart") {
    add("His Heart names the inner place where Pharaoh keeps choosing resistance.", "The pressure lifts, but Pharaoh's heart does not soften.", "🔒 Closed heart", "⏳ Relief received", "🚫 Release refused", "The verse shows that the deepest problem is not the flies. It is Pharaoh's refusal to surrender.");
  } else if (lower === "at this time also") {
    add("At This Time Also means Pharaoh repeats the same hard-hearted response again.", "He has already seen signs, warnings, prayer, and relief.", "🔁 Again", "⚠️ More evidence ignored", "🔒 Same hard heart", "The phrase shows a pattern, not a one-time bad decision.");
  } else if (lower === "the people" && section.reference === "Exodus 8:32-32") {
    add("The People refers to Israel, the enslaved people Pharaoh still refuses to release.", "They are not just workers in Egypt's economy.", "They are the people the LORD has claimed as His own.", "👥 Israel", "🧱 Enslaved laborers", "🙌 Claimed by God", "Pharaoh's refusal keeps real families under bondage.");
  } else if (lower === "let the people go") {
    add("Let The People Go is the release Pharaoh keeps denying.", "The issue is simple by this point: God has commanded release, and Pharaoh will not obey.", "🚪 Release", "🙌 Worship", "👑 Pharaoh refuses", "The phrase keeps the reader focused on the central demand of Exodus.");
  } else if (lower.includes("harden") || lower.includes("heart") || lower.includes("hearkened not") || lower.includes("refuseth") || lower.includes("refuse") || lower.includes("would not")) {
    add(`${title} describes stubborn resistance to God's word.`, "A hard heart is not just a person lacking information.", "Pharaoh sees warnings, signs, and relief, yet keeps refusing the LORD's command.", "🔒 Stubborn heart", "👂 Refuses to listen", "⚠️ Warning ignored", "Exodus repeats this so beginners can see how pride can become more fixed over time.");
  } else if (lower.includes("signs") || lower.includes("wonders") || lower.includes("miracle") || lower.includes("rod") || lower.includes("serpent") || lower.includes("magicians") || lower.includes("swallowed")) {
    add(`${title} deals with the public signs before Pharaoh.`, "The signs are not party tricks. They confirm that the LORD's message is backed by His power.", "Egypt's magicians can imitate some things, but they cannot defeat God's authority.", "🐍 Rod and serpent", "⚡ Signs", "🔥 Counterfeit power exposed", "Aaron's rod swallowing their rods shows that the contest is not equal.");
  } else if (lower.includes("egyptians shall know") || lower.includes("in this thou shalt know") || lower.includes("that thou mayest know") || lower.includes("none like")) {
    add(`${title} gives the teaching purpose behind the plagues.`, "The plagues are judgments, but they are also revelations.", "Egypt, Pharaoh, and Israel are being shown that the LORD alone is God.", "⚡ Judgment", "👀 Revelation", "🙌 No rival", "God is not only removing Israel from Egypt. He is making His name known.");
  } else if (lower.includes("river") || lower.includes("waters") || lower.includes("blood") || lower.includes("fish") || lower.includes("stank")) {
    add(`${title} points to the Nile plague, where Egypt's life source becomes death.`, "The Nile was central to Egypt's food, water, economy, and religious imagination.", "God strikes the place Egypt trusted most.", "🌊 Nile River", "🩸 Blood", "🐟 Fish died", "The river Pharaoh once used for Hebrew death now becomes a sign of judgment against Egypt.");
  } else if (lower.includes("frogs") || lower.includes("bedchamber") || lower.includes("house") || lower.includes("heaps")) {
    add(`${title} describes the frog plague invading ordinary life.`, "The frogs enter houses, bedrooms, ovens, and kneading bowls.", "The plague is not only powerful. It is humiliating and impossible to ignore.", "🐸 Frogs everywhere", "🏠 Homes invaded", "👃 The land stank", "The LORD can make creation unsettle the palace that refuses Him.");
  } else if (lower.includes("intreat") || lower.includes("glory over me") || lower.includes("to morrow") || lower.includes("respite") || lower.includes("relief")) {
    add(`${title} shows Pharaoh wanting relief without surrender.`, "Intreat means ask or plead in prayer.", "Pharaoh asks Moses to pray when the plague hurts, but he hardens again when the pressure lifts.", "🙏 Prayer requested", "⏳ Relief comes", "🔒 Heart hardens", "There is a difference between wanting pain removed and truly yielding to God.");
  } else if (lower.includes("lice") || lower.includes("dust") || lower.includes("finger of god") || lower.includes("could not")) {
    add(`${title} marks the point where Egypt's magicians hit their limit.`, "The dust becoming lice touches people and animals throughout Egypt.", "When the magicians say, 'This is the finger of God,' they admit a power beyond their enchantments.", "🌫️ Dust", "🪲 Lice", "☝️ God's finger", "Pharaoh still refuses, so the issue is no longer lack of evidence.");
  } else if (lower.includes("swarms of flies")) {
    add(`${title} names the plague that filled Egypt with swarming insects.`, "The word swarms pictures a mass of pests invading daily life.", "This judgment reaches Pharaoh's servants, houses, and land.", "🪰 Swarms", "🏠 Houses invaded", "👑 Pharaoh confronted", "The LORD can make even small creatures overthrow Egypt's sense of control.");
  } else if (lower.includes("land was corrupted")) {
    add(`${title} means the fly plague ruined the condition of the land.`, "Corrupted here means damaged, spoiled, or made unbearable by the swarm.", "Egypt's land becomes unclean-feeling, chaotic, and miserable under judgment.", "🪰 Flies everywhere", "🌍 Land spoiled", "⚠️ Judgment felt", "Pharaoh's refusal does not stay private. It spreads pain across the land he rules.");
  } else if (lower.includes("land of goshen")) {
    add(`${title} names the region where Israel lived inside Egypt.`, "God says Goshen will be treated differently during the fly plague.", "📍 Goshen", "👥 Israel's dwelling place", "🛡️ Protected area", "The distinction shows that Israel is still in Egypt, but they are not abandoned to Egypt's judgment.");
  } else if (lower.includes("no swarms of flies shall be there")) {
    add(`${title} promises protection for Israel during the plague.`, "The LORD does not merely send chaos and hope His people avoid it.", "He names the place where the flies will not be.", "🚫 No swarm", "📍 Goshen spared", "🛡️ God protects", "Judgment in Exodus is precise, not random.");
  } else if (lower.includes("division between my people and thy people")) {
    add(`${title} draws a line between the LORD's people and Pharaoh's people.`, "My people means Israel is under the LORD's covenant care.", "Thy people means Pharaoh's kingdom remains under Pharaoh's hardened rule.", "👥 My people", "👑 Thy people", "⚖️ Clear division", "The plague teaches Pharaoh that the LORD can judge Egypt while preserving Israel.");
  } else if (lower.includes("sever")) {
    add(`${title} means God will set Goshen apart from the plague falling on Egypt.`, "Sever means separate or distinguish.", "The LORD is making the difference visible so Pharaoh cannot call it chance.", "✂️ Separated", "📍 Goshen marked out", "👀 Pharaoh can see it", "The protection itself becomes a sign that the LORD rules the plague.");
  } else if (lower.includes("not meet") || lower.includes("abomination") || lower.includes("three days") || lower.includes("not go very far") || lower.includes("deal deceitfully")) {
    add(`${title} explains why Pharaoh's compromise is not true obedience.`, "Moses refuses worship on Pharaoh's terms because Egyptian religion would treat Israel's sacrifices as offensive.", "Three days' journey means Israel must worship where and how God commanded.", "⛺ Wilderness worship", "🚫 Pharaoh's limits rejected", "📜 God's terms", "Partial permission still keeps Pharaoh in control.");
  } else if (lower.includes("there remained not one")) {
    add(`${title} shows the LORD completely removing the plague after Moses prays.`, "God does not merely reduce the flies. He removes them.", "Pharaoh receives mercy and then is responsible for how he responds.", "🙏 Moses prays", "🪰 Flies removed", "⚠️ Mercy tested", "Relief should have led Pharaoh to obedience, but he hardened again.");
  } else if (lower.includes("pattern continues") || lower.includes("relief did not become repentance")) {
    add(`${title} summarizes Pharaoh's repeated response to mercy.`, "Pressure makes him negotiate, but relief exposes his heart.", "Once the pain is gone, he returns to refusal.", "⏳ Relief", "🔒 Hard heart", "🔁 Repeated rebellion", "Exodus is teaching the difference between temporary regret and real repentance.");
  } else {
    add(`${title} names a real phrase in the conflict between the LORD and Pharaoh.`, "The words help a beginner follow the exact movement of Exodus: command, refusal, oppression, promise, signs, judgment, and mercy.", "📜 Bible wording", "⚔️ Pharaoh confronted", "🙌 The LORD revealed", "The card should help decode the verse, not skip over it.");
  }

  return note(lines.slice(0, 8));
}

function makeDay23PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`📌 ${title}`, explainDay23Phrase(section, title)];
}
function deepenDay23PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_23_REAL_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay23PhraseCard(section, title)),
  };
}

const DAY_24_EXODUS_9_10_PHRASE_TITLES: Record<string, string[]> = {
  "Exodus 9:1-6": ["Let My People Go, That They May Serve Me", "The Hand Of The LORD", "Upon Thy Cattle", "The LORD Shall Sever", "There Shall Nothing Die", "Tomorrow The LORD Shall Do This Thing"],
  "Exodus 9:7-7": ["Pharaoh Sent", "There Was Not One", "Of The Cattle Of The Israelites Dead", "The Heart Of Pharaoh", "Was Hardened", "He Did Not Let The People Go"],
  "Exodus 9:8-12": ["Take To You Handfuls Of Ashes", "Sprinkle It Toward The Heaven", "A Boil Breaking Forth", "Upon Man, And Upon Beast", "The Magicians Could Not Stand", "The LORD Hardened The Heart Of Pharaoh"],
  "Exodus 9:13-18": ["Rise Up Early In The Morning", "All My Plagues Upon Thine Heart", "That Thou Mayest Know", "There Is None Like Me In All The Earth", "For This Cause Have I Raised Thee Up", "That My Name May Be Declared Throughout All The Earth", "Tomorrow About This Time"],
  "Exodus 9:19-24": ["Send Therefore Now", "Gather Thy Cattle", "He That Feared The Word Of The LORD", "He That Regarded Not The Word Of The LORD", "Stretch Forth Thine Hand Toward Heaven", "Hail, And Fire Mingled With The Hail", "Such As There Was None Like It"],
  "Exodus 9:25-30": ["The Hail Smote Throughout All The Land Of Egypt", "Only In The Land Of Goshen", "I Have Sinned This Time", "The LORD Is Righteous", "Intreat The LORD", "The Thunder Shall Cease", "I Know That Ye Will Not Yet Fear The LORD God"],
  "Exodus 9:31-35": ["The Flax And The Barley Was Smitten", "The Wheat And The Rye Were Not Smitten", "When Pharaoh Saw", "He Sinned Yet More", "Hardened His Heart", "As The LORD Had Spoken By Moses"],
  "Exodus 10:1-6": ["Go In Unto Pharaoh", "I Have Hardened His Heart", "That I Might Shew These My Signs", "Tell In The Ears Of Thy Son", "That Ye May Know", "How Long Wilt Thou Refuse To Humble Thyself", "Tomorrow Will I Bring The Locusts"],
  "Exodus 10:7-12": ["How Long Shall This Man Be A Snare Unto Us", "Knowest Thou Not Yet That Egypt Is Destroyed", "Who Are They That Shall Go", "We Will Go With Our Young And With Our Old", "Go Now Ye That Are Men", "They Were Driven Out From Pharaoh's Presence", "Stretch Out Thine Hand Over The Land Of Egypt"],
  "Exodus 10:13-18": ["The LORD Brought An East Wind", "The Locusts Went Up Over All The Land", "Before Them There Were No Such Locusts", "They Covered The Face Of The Whole Earth", "There Remained Not Any Green Thing", "I Have Sinned Against The LORD Your God", "Forgive, I Pray Thee"],
  "Exodus 10:19-20": ["The LORD Turned A Mighty Strong West Wind", "Cast Them Into The Red Sea", "There Remained Not One Locust", "Not One Locust", "The LORD Hardened Pharaoh's Heart", "He Would Not Let The Children Of Israel Go"],
  "Exodus 10:21-26": ["Darkness Which May Be Felt", "There Was A Thick Darkness", "They Saw Not One Another", "All The Children Of Israel Had Light", "Only Let Your Flocks And Your Herds Be Stayed", "There Shall Not An Hoof Be Left Behind", "We Know Not With What We Must Serve The LORD"],
  "Exodus 10:27-29": ["The LORD Hardened Pharaoh's Heart", "He Would Not Let Them Go", "Get Thee From Me", "Take Heed To Thyself", "See My Face No More", "Thou Hast Spoken Well", "I Will See Thy Face Again No More"],
};

function makeDay24Exodus9To10PhraseCard(section: PersonalExodusPhraseSectionInput, title: string): [string, string] {
  return [`📌 ${title}`, explainDay24Exodus9To10Phrase(section, title)];
}

function getDay24ExodusVisualLines(title: string): string[] {
  const lower = title.toLowerCase();

  if (lower.includes("cattle") || lower.includes("flax") || lower.includes("barley") || lower.includes("wheat") || lower.includes("rye")) {
    return ["\u{1F404} Animals", "\u{1F33E} Crops", "\u{1F35E} Food supply"];
  }

  if (lower.includes("sever") || lower.includes("goshen") || lower.includes("israelites") || lower.includes("children of israel") || lower.includes("light")) {
    return ["\u{1F6E1}\u{FE0F} Protection", "\u{1F4CD} Goshen", "\u{2696}\u{FE0F} Clear difference"];
  }

  if (lower.includes("tomorrow") || lower.includes("send therefore") || lower.includes("rise up early")) {
    return ["\u{1F4E3} Warning", "\u{1F4C5} Appointed time", "\u{26A0}\u{FE0F} Pharaoh responsible"];
  }

  if (lower.includes("ashes") || lower.includes("boil") || lower.includes("man") || lower.includes("beast") || lower.includes("magicians")) {
    return ["\u{1F525} Ashes", "\u{1FA79} Painful sores", "\u{1F647} Egypt humbled"];
  }

  if (lower.includes("hail") || lower.includes("thunder") || lower.includes("fire")) {
    return ["\u{26C8}\u{FE0F} Hail", "\u{1F525} Fire", "\u{1F329}\u{FE0F} Thunder"];
  }

  if (lower.includes("feared") || lower.includes("regarded not") || lower.includes("word of the lord")) {
    return ["\u{1F442} Heard the warning", "\u{1F3E0} Shelter or exposure", "\u{1F64F} Response matters"];
  }

  if (lower.includes("sinned") || lower.includes("righteous") || lower.includes("intreat") || lower.includes("fear the lord")) {
    return ["\u{1F5E3}\u{FE0F} Right words", "\u{1F512} Hard heart", "\u{1F64F} True surrender needed"];
  }

  if (lower.includes("signs") || lower.includes("shew") || lower.includes("know") || lower.includes("name")) {
    return ["\u{26A1} Signs", "\u{1F440} God made known", "\u{1F4DC} Story remembered"];
  }

  if (lower.includes("son") || lower.includes("ears")) {
    return ["\u{1F9D2} Children", "\u{1F442} Listening", "\u{1F4D6} Story remembered"];
  }

  if (lower.includes("locust") || lower.includes("green thing") || lower.includes("face of the whole earth")) {
    return ["\u{1F997} Locusts", "\u{1F33E} Crops eaten", "\u{1F35E} Food threatened"];
  }

  if (lower.includes("east wind") || lower.includes("west wind") || lower.includes("red sea")) {
    return ["\u{1F32C}\u{FE0F} Wind", "\u{1F997} Locusts moved", "\u{1F30A} Sea"];
  }

  if (lower.includes("darkness") || lower.includes("saw not")) {
    return ["\u{1F311} Darkness", "\u{1F648} Could not see", "\u{23F8}\u{FE0F} Life stopped"];
  }

  if (lower.includes("flocks") || lower.includes("herds") || lower.includes("hoof") || lower.includes("serve the lord")) {
    return ["\u{1F410} Flocks", "\u{1F404} Herds", "\u{1F64C} Worship"];
  }

  if (lower.includes("face") || lower.includes("take heed") || lower.includes("spoken well")) {
    return ["\u{1F6AA} Meeting closed", "\u{1F451} Pharaoh threatens", "\u{23F3} Final plague near"];
  }

  if (lower.includes("heart") || lower.includes("hardened") || lower.includes("would not let")) {
    return ["\u{1F512} Hard heart", "\u{1F6AB} Release refused", "\u{1F501} Pattern repeated"];
  }

  return ["\u{1F4DC} Scripture wording", "\u{1F50D} Phrase meaning", "\u{1F9E0} Story understanding"];
}

function formatDay24ExodusLines(title: string, lines: string[]) {
  const hasVisualList = lines.filter((line) => /^[^\w\s"']/.test(line.trim())).length >= 2;
  if (hasVisualList) return note(lines.slice(0, 8));

  const first = lines.slice(0, Math.min(3, lines.length));
  const rest = lines.slice(first.length);

  return note([...first, ...getDay24ExodusVisualLines(title), ...rest].slice(0, 8));
}

function explainDay24Exodus9To10Phrase(section: PersonalExodusPhraseSectionInput, title: string): string {
  const lower = title.toLowerCase();
  const lines: string[] = [];
  const add = (...items: string[]) => {
    for (const item of items) {
      if (item && !lines.includes(item)) lines.push(item);
    }
  };

  if (lower === "upon thy cattle") {
    add("Upon Thy Cattle means the plague will strike Egypt's livestock.", "Cattle here includes the animals Egypt depended on for food, work, travel, and wealth.", "The warning is practical and direct: Pharaoh's refusal will touch Egypt's daily life.", "The LORD is not only confronting Pharaoh's palace. He is confronting the whole system that profits from Israel's bondage.");
  } else if (lower === "the lord shall sever") {
    add("The LORD Shall Sever means the LORD will make a clear separation between Egypt's animals and Israel's animals.", "Sever means divide or set apart.", "This is not random sickness moving through the land.", "God is showing Pharaoh that He can judge Egypt while preserving His people.");
  } else if (lower === "tomorrow the lord shall do this thing" || lower === "tomorrow about this time") {
    add(`${title} means the plague has an appointed time set by God.`, "The judgment will not arrive by accident, superstition, or natural chance.", "The LORD names the time before it happens.", "When it arrives exactly as spoken, Pharaoh is facing God's word, not bad luck.");
  } else if (lower === "of the cattle of the israelites dead") {
    add("Of The Cattle Of The Israelites Dead means Pharaoh learns Israel's livestock were preserved.", "He checks the report after Egypt's animals die.", "The phrase is written in a negative form because the point is total protection: not one of Israel's cattle died.", "That evidence should have humbled Pharaoh, but his heart stayed shut.");
  } else if (lower === "he did not let the people go") {
    add("He Did Not Let The People Go means Pharaoh still refuses after seeing the LORD's distinction.", "The plague has ended, and Pharaoh has evidence that God protected Israel.", "But he still keeps the people in bondage.", "The problem is no longer lack of information. It is hardened rebellion.");
  } else if (lower === "sprinkle it toward the heaven") {
    add("Sprinkle It Toward The Heaven means Moses throws the ashes upward before the LORD sends the plague of boils.", "The action turns ordinary furnace ashes into a public sign of judgment.", "Heaven is mentioned because the plague does not come from Egyptian medicine or magic.", "The LORD is the One sending the painful sign over Egypt.");
  } else if (lower === "gather thy cattle") {
    add("Gather Thy Cattle is mercy inside a warning.", "Before the hail falls, God tells Egypt how to shelter people and animals from the field.", "Some Egyptians will believe the warning and act.", "The plague is judgment, but the warning gives people a real chance to respond to the LORD's word.");
  } else if (lower === "he that feared the word of the lord") {
    add("He That Feared The Word Of The LORD means some Egyptians took God's warning seriously.", "Fear here means more than being scared of hail.", "It means they believed the LORD's word enough to move servants and cattle into shelter.", "Their actions show that hearing God's warning should lead to obedience.");
  } else if (lower === "he that regarded not the word of the lord") {
    add("He That Regarded Not The Word Of The LORD means others heard the same warning and ignored it.", "Regarded not means they did not pay attention or treat it as weighty.", "They left servants and animals exposed in the field.", "The same warning that protected some people was rejected by others.");
  } else if (lower === "hail, and fire mingled with the hail") {
    add("Hail, And Fire Mingled With The Hail means the storm was more than ordinary bad weather.", "The hail crushed what stood in the field, and fire made the scene terrifying.", "Egypt is learning that the sky is not controlled by Egypt's gods or Pharaoh's power.", "The LORD commands the heavens as easily as He commands the river and the dust.");
  } else if (lower === "such as there was none like it") {
    add("Such As There Was None Like It means this storm was unmatched in Egypt's memory.", "The phrase tells the reader not to treat the hail as a normal seasonal event.", "This was a unique act of judgment tied to God's warning.", "Pharaoh is being shown that the LORD's power is not one more Egyptian weather pattern.");
  } else if (lower === "the hail smote throughout all the land of egypt") {
    add("The Hail Smote Throughout All The Land Of Egypt means the plague struck broadly across Egypt.", "Smote means hit, struck, or beat down.", "The storm damaged people, animals, trees, and crops in the field.", "Pharaoh's refusal brought judgment beyond the palace and into the land he ruled.");
  } else if (lower === "only in the land of goshen") {
    add("Only In The Land Of Goshen means Israel's dwelling place was spared from the hail.", "Goshen was the region where many Israelites lived in Egypt.", "The phrase matters because the storm is not random destruction.", "The LORD knows where His people are and can protect them inside a judged land.");
  } else if (lower === "the thunder shall cease") {
    add("The Thunder Shall Cease means Moses says the storm will stop when he prays.", "Thunder is one sound inside the terrifying hail plague.", "Moses is not controlling weather by himself.", "He is showing Pharaoh that the LORD who sent the storm can also end it.");
  } else if (lower === "i know that ye will not yet fear the lord god") {
    add("I Know That Ye Will Not Yet Fear The LORD God means Moses sees through Pharaoh's temporary confession.", "Pharaoh wants the thunder and hail gone, but he has not truly bowed to the LORD.", "Fear the LORD means reverence that leads to surrender.", "Moses knows Pharaoh's words are still ahead of his heart.");
  } else if (lower === "the flax and the barley was smitten") {
    add("The Flax And The Barley Was Smitten explains which crops were destroyed by the hail.", "Flax was used for linen, and barley was an important grain crop.", "The text notes they were mature enough to be damaged.", "This detail helps the reader see the economic cost of Pharaoh's refusal.");
  } else if (lower === "the wheat and the rye were not smitten") {
    add("The Wheat And The Rye Were Not Smitten means some later crops survived the hail because they had not grown up yet.", "This is not random farming trivia.", "It prepares the reader for the locusts in the next chapter.", "What the hail leaves behind, the locusts will later devour.");
  } else if (lower === "when pharaoh saw") {
    add("When Pharaoh Saw means Pharaoh responds after relief, not before it.", "He sees that the rain, hail, and thunder have stopped.", "That moment reveals what is really in him.", "Instead of mercy softening him, relief gives him room to harden again.");
  } else if (lower === "he sinned yet more") {
    add("He Sinned Yet More means Pharaoh's guilt increases after the storm stops.", "He had confessed sin during the plague, but once relief came, he returned to rebellion.", "That makes his response worse, not better.", "The phrase warns that religious words under pressure are not the same as repentance.");
  } else if (lower === "go in unto pharaoh") {
    add("Go In Unto Pharaoh means Moses must confront Pharaoh again even after repeated refusal.", "God sends Moses back into the same hard place with the same demand.", "The command teaches persistence in God's mission.", "Pharaoh's stubbornness does not cancel the LORD's word.");
  } else if (lower === "that i might shew these my signs") {
    add("That I Might Shew These My Signs means the plagues are meant to reveal the LORD's power.", "Shew is old spelling for show.", "The signs are not random punishments with no message.", "They teach Egypt, Israel, and future children that the LORD rules over Pharaoh and creation.");
  } else if (lower === "tell in the ears of thy son") {
    add("Tell In The Ears Of Thy Son means the Exodus story must be taught to the next generation.", "God wants children to hear what He did in Egypt.", "The rescue is not supposed to become a forgotten family legend.", "Parents are to explain the LORD's acts so children learn who saved them.");
  } else if (lower === "tomorrow will i bring the locusts") {
    add("Tomorrow Will I Bring The Locusts gives Pharaoh another timed warning before judgment.", "The locusts are not coming by chance.", "God names the plague and the time before it happens.", "The warning leaves Pharaoh responsible for refusing to humble himself.");
  } else if (lower === "they were driven out from pharaoh's presence") {
    add("They Were Driven Out From Pharaoh's Presence means Pharaoh angrily ends the meeting.", "Moses and Aaron refuse his partial compromise.", "Pharaoh does not answer with obedience; he pushes them away.", "The scene shows a ruler trying to control the conversation instead of submitting to God's command.");
  } else if (lower === "stretch out thine hand over the land of egypt") {
    add("Stretch Out Thine Hand Over The Land Of Egypt is the command connected to bringing the locusts.", "Moses' stretched hand is a visible sign of the LORD's authority being released over Egypt.", "The land itself becomes the place of judgment.", "Pharaoh's kingdom cannot hide from God's command.");
  } else if (lower === "the lord brought an east wind") {
    add("The LORD Brought An East Wind means God used the wind to carry the locusts into Egypt.", "The wind is not treated as an independent force.", "Creation obeys the Creator.", "The same LORD who names the plague also commands the movement that brings it.");
  } else if (lower === "the locusts went up over all the land") {
    add("The Locusts Went Up Over All The Land means the plague spread across Egypt.", "Locust swarms could strip fields bare and threaten food supplies.", "This plague attacks what remained after the hail.", "Egypt's land is being emptied because Pharaoh still refuses release.");
  } else if (lower === "before them there were no such locusts") {
    add("Before Them There Were No Such Locusts means this swarm was unmatched.", "The text wants the reader to feel the scale of the plague.", "This was not an ordinary insect problem.", "It was a sign of judgment unlike anything Egypt had seen.");
  } else if (lower === "they covered the face of the whole earth") {
    add("They Covered The Face Of The Whole Earth means the locusts were so many that the ground seemed hidden.", "Face of the earth is a Bible way of speaking about the surface of the land.", "The image helps beginners picture the swarm's thickness.", "Egypt's fields were overwhelmed under Pharaoh's continued refusal.");
  } else if (lower === "there remained not any green thing") {
    add("There Remained Not Any Green Thing means the locusts finished what the hail left.", "Green thing refers to living plant growth.", "The plague strips Egypt's remaining food supply.", "The land that Pharaoh ruled is being emptied by the God Pharaoh refused.");
  } else if (lower === "the lord turned a mighty strong west wind") {
    add("The LORD Turned A Mighty Strong West Wind means God also controlled the removal of the locusts.", "The east wind brought them, and the west wind carried them away.", "The plague did not end because Egypt solved it.", "Relief came when the LORD commanded creation again.");
  } else if (lower === "he would not let the children of israel go") {
    add("He Would Not Let The Children Of Israel Go means Pharaoh refuses even after the locusts are removed.", "The children of Israel are the covenant people God is rescuing.", "Pharaoh receives relief but still keeps them trapped.", "Again, the problem is not the plague. The problem is Pharaoh's hard heart.");
  } else if (lower === "darkness which may be felt") {
    add("Darkness Which May Be Felt means the darkness was heavy, oppressive, and terrifying.", "This is not normal nightfall.", "The phrase makes the darkness feel almost physical.", "Egypt's light is shut down because the LORD rules even what people assume is constant.");
  } else if (lower === "there was a thick darkness") {
    add("There Was A Thick Darkness means Egypt was covered in deep, disabling darkness.", "People could not see one another or move normally.", "The plague attacks daily life without using insects, hail, or disease.", "The LORD can judge by removing light itself.");
  } else if (lower === "all the children of israel had light") {
    add("All The Children Of Israel Had Light means God preserved Israel while Egypt sat in darkness.", "The contrast is sharp: darkness in Egypt, light in Israel's dwellings.", "This is another visible distinction between Pharaoh's people and the LORD's people.", "God's people are still in Egypt, but they are not abandoned to Egypt's judgment.");
  } else if (lower === "only let your flocks and your herds be stayed") {
    add("Only Let Your Flocks And Your Herds Be Stayed is Pharaoh's attempt at a final compromise.", "He offers to let the people go but wants to keep the animals behind.", "That would still give Pharaoh control over Israel's worship and return.", "Partial freedom is not obedience to the LORD's command.");
  } else if (lower === "there shall not an hoof be left behind") {
    add("There Shall Not An Hoof Be Left Behind means Moses refuses Pharaoh's compromise completely.", "Not even one animal hoof may stay in Egypt.", "Israel must leave with everything needed to worship as God commands.", "Pharaoh does not get to decide the limits of obedience.");
  } else if (lower === "take heed to thyself") {
    add("Take Heed To Thyself is Pharaoh's threat to Moses.", "It means be careful or watch yourself.", "Pharaoh warns Moses not to appear before him again.", "The threat sounds powerful, but Pharaoh is the one standing under the LORD's final warning.");
  } else if (lower === "i will see thy face again no more") {
    add("I Will See Thy Face Again No More means Moses accepts that the public confrontations are ending.", "Pharaoh thinks he is dismissing Moses.", "But the final plague will force Pharaoh to send Israel out.", "The conversation closes, but the LORD's judgment is not finished.");
  } else if (lower.includes("let my people go")) {
    add(`${title} keeps God's main demand in front of Pharaoh.`, "Israel is not being rescued just to wander around free.", "God says they belong to Him and must be released to worship Him.", "🚪 Let them go", "🙌 Serve the LORD", "🔒 Pharaoh has no right to keep them", "Freedom in Exodus means leaving bondage so God's people can live under God's rule.");
  } else if (lower.includes("hand of the lord")) {
    add(`${title} means the plague comes from the LORD's own power.`, "Egypt may have armies, magicians, animals, and wealth.", "But the hand of the LORD is stronger than every part of Egypt's system.", "✋ God's hand", "🐄 Livestock judged", "👑 Pharaoh humbled", "Creation answers to God, not to Egypt's king.");
  } else if (lower.includes("cattle") || lower.includes("flax") || lower.includes("barley") || lower.includes("wheat") || lower.includes("rye")) {
    add(`${title} points to Egypt's everyday life and economy.`, "These were not tiny details to the people living through the plagues.", "Animals and crops meant food, work, trade, travel, and survival.", "🐄 Animals", "🌾 Crops", "🍞 Food supply", "God's judgment reaches the things Egypt trusted for daily strength.");
  } else if (lower.includes("sever") || lower.includes("goshen") || lower.includes("israelites") || lower.includes("children of israel")) {
    add(`${title} shows God making a clear difference between Egypt and His people.`, "Israel is living inside Egypt, but they are not abandoned inside Egypt's judgment.", "The LORD can strike one place and preserve another.", "🛡️ Protection", "🏠 God's people kept", "⚖️ Judgment with precision", "God's rescue is not lucky escape. It is careful protection.");
  } else if (lower === "there remained not one locust" || lower === "not one locust") {
    add(`${title} means the LORD removed the locusts completely.`, "The same God who brought the swarm can take the swarm away.", "Egypt does not solve the plague by its own power.", "\u{1F997} Locusts gone", "\u{1F32C}\u{FE0F} Wind obeys", "\u{1F64C} The LORD removes", "The phrase shows total relief.", "But Pharaoh still refuses after mercy.");
  } else if (lower === "they saw not one another") {
    add("They Saw Not One Another means the darkness was so thick that normal human connection stopped.", "People could not see the faces of those around them.", "The plague isolated people inside the same land.", "\u{1F311} Darkness", "\u{1F648} Could not see", "\u{23F8}\u{FE0F} Life stopped", "The phrase helps the reader feel how heavy the darkness was.", "Egypt's daily life is shut down by the LORD's command.");
  } else if (lower.includes("nothing die") || lower.includes("not one")) {
    add(`${title} stresses how complete God's protection was.`, "Pharaoh checks the report and cannot explain it away.", "Egypt's livestock suffered, but Israel's were preserved.", "✅ Not one", "🐄 Preserved cattle", "👀 Evidence Pharaoh could see", "The problem is not lack of proof. The problem is Pharaoh's hard heart.");
  } else if (lower.includes("tomorrow") || lower.includes("about this time")) {
    add(`${title} shows that God controls the timing of the plague.`, "The judgment does not arrive by accident or superstition.", "God names the time before it happens.", "📅 Appointed time", "📣 Clear warning", "👑 Pharaoh still responsible", "When the plague arrives exactly as spoken, Pharaoh is facing God's word, not bad luck.");
  } else if (lower.includes("pharaoh sent")) {
    add(`${title} means Pharaoh investigates whether God's distinction was real.`, "He does not simply hear a rumor.", "He sends to check the condition of Israel's livestock.", "👀 He checks", "🐄 Israel's cattle live", "🔒 His heart stays shut", "Seeing evidence does not soften him because he does not want to surrender.");
  } else if (lower.includes("hardened") && section.reference === "Exodus 10:27-29") {
    add(`${title} prepares the reader for the final plague by showing that Pharaoh still will not release Israel.`, "The darkness has not softened him.", "He is still locked in rebellion even after Egypt has been shaken again and again.", "🔒 Hardened heart", "🌑 Darkness ignored", "⚖️ Final judgment near", "The story is moving toward the last warning because Pharaoh's refusal remains.");
  } else if (lower.includes("heart of pharaoh") || lower.includes("hardened")) {
    add(`${title} names the deep problem under Pharaoh's decisions.`, "His issue is not confusion.", "His heart is locked against the LORD.", "🔒 Closed heart", "🚫 Refusal", "📣 God's word resisted", "A hard heart can see mercy, feel judgment, ask for relief, and still refuse God.");
  } else if (lower === "he would not let them go") {
    add("He Would Not Let Them Go means Pharaoh still refuses release after the plague of darkness.", "Them refers to Israel, the people God has commanded him to release.", "By this point Pharaoh has seen plague after plague.", "His refusal shows that darkness outside him has not changed the darkness of his heart.");
  } else if (lower.includes("he did not let") || lower.includes("would not let")) {
    add(`${title} shows Pharaoh choosing refusal again.`, "The plague has ended, but Pharaoh has not changed.", "He keeps Israel trapped because his pride still wants control.", "🚫 No release", "🔒 Bondage continues", "🔁 The pattern repeats", "Relief from pain is not the same as repentance before God.");
  } else if (lower.includes("ashes") || lower.includes("boil") || lower.includes("beast")) {
    add(`${title} turns Egypt's suffering onto bodies, not only rivers, animals, or crops.`, "The ashes become a sign of painful judgment.", "People and animals are touched by the plague.", "🔥 Ashes", "🩹 Painful sores", "🐄 Beast also struck", "Pharaoh cannot protect Egypt's bodies from God's command.");
  } else if (lower.includes("magicians")) {
    add(`${title} humiliates the spiritual power Egypt trusted.`, "Earlier the magicians tried to imitate signs.", "Now they cannot even stand before Moses because the plague is on them too.", "🪄 Counterfeit power", "🩹 Boils", "🙇 Unable to stand", "Egypt's magic cannot rescue Egypt from the Creator.");
  } else if (lower.includes("rise up early") || lower.includes("send therefore now") || lower.includes("stretch forth")) {
    add(`${title} is God giving Pharaoh a clear warning before the next judgment falls.`, "The plagues are not random attacks.", "Pharaoh keeps hearing God's word before he feels God's power.", "📣 Warning", "⏳ Time to respond", "⚠️ Judgment coming", "God exposes Pharaoh's heart before the punishment arrives.");
  } else if (lower.includes("all my plagues upon thine heart")) {
    add(`${title} says the battle is aimed at Pharaoh's inner rebellion.`, "The plagues hurt Egypt, but they also expose Pharaoh.", "God is pressing the proud king at the place where he refuses to bow.", "💔 The heart", "👑 Pride", "⚖️ Judgment", "Exodus is not only about power outside Pharaoh. It is about rebellion inside Pharaoh.");
  } else if (lower.includes("that thou mayest know") || lower.includes("that ye may know")) {
    add(`${title} gives the purpose behind the signs.`, "God is not trying to impress Egypt with noise.", "He is making His identity known.", "👀 See", "🧠 Know", "🙌 The LORD is God", "The plagues teach truth: Pharaoh is not ultimate, Egypt's gods are not ultimate, the LORD is.");
  } else if (lower.includes("none like me")) {
    add(`${title} declares that the LORD has no rival anywhere on earth.`, "Egypt worshiped many gods and trusted many powers.", "God answers by showing that none can stand beside Him.", "🌍 All the earth", "👑 No rival", "🔥 God alone", "This is one of the clearest statements of God's supremacy in the plague story.");
  } else if (lower.includes("raised thee up") || lower.includes("name may be declared")) {
    add(`${title} means even Pharaoh's resistance will end up serving God's fame.`, "Pharaoh is guilty for his stubbornness.", "But God is so sovereign that He can use that stubbornness to display His power.", "👑 Proud king", "⚡ God's power", "🌍 God's name spread", "The story will be told far beyond Egypt because the LORD rules even over rulers who oppose Him.");
  } else if (lower.includes("feared the word")) {
    add(`${title} shows that some Egyptians began taking God's warning seriously.`, "They brought servants and animals inside before the hail came.", "Fear here means they believed the LORD's word enough to act.", "📣 Heard warning", "🏠 Sought shelter", "🙏 Took God seriously", "Even in Egypt, mercy is shown to those who respond to God's word.");
  } else if (lower.includes("regarded not")) {
    add(`${title} describes people who heard the warning and ignored it.`, "They left servants and cattle in the field.", "The danger was not hidden from them.", "🙈 Ignored", "⚠️ Exposed", "🌩️ Hail coming", "The same word saves some and is ignored by others.");
  } else if (lower.includes("hail") || lower.includes("fire mingled") || lower.includes("thunder")) {
    add(`${title} describes a terrifying plague from the sky.`, "Hail destroys what stands in the field, and fire makes the scene even more frightening.", "Egypt is learning that the heavens answer to the LORD.", "🌩️ Hail", "🔥 Fire", "🌍 Land struck", "The sky itself becomes a witness that creation belongs to God.");
  } else if (lower.includes("i have sinned") || lower.includes("lord is righteous") || lower.includes("intreat")) {
    add(`${title} sounds like repentance, but Pharaoh's later actions test whether it is real.`, "He admits wrong when the pressure is heavy.", "Moses already knows Pharaoh does not truly fear the LORD yet.", "🗣️ Right words", "🌩️ Pressure", "🔒 Unchanged heart", "Confession under fear is not the same as surrender from the heart.");
  } else if (lower.includes("sinned yet more")) {
    add(`${title} shows Pharaoh becoming worse after mercy arrives.`, "The hail stops, but his rebellion grows.", "Instead of relief leading him to worship, relief gives him room to resist again.", "🔁 Old pattern", "💔 More sin", "🚫 No surrender", "Mercy can soften a humble heart, but Pharaoh uses mercy as another chance to rebel.");
  } else if (lower.includes("as the lord had spoken")) {
    add(`${title} reminds the reader that the story is unfolding exactly as God said.`, "Moses is not guessing.", "Pharaoh's refusal is not surprising God.", "📜 God's word", "✅ Fulfilled", "🧭 The story stays on course", "God's word is steering the Exodus, even when Pharaoh keeps resisting.");
  } else if (lower.includes("tell in the ears") || lower.includes("son")) {
    add(`${title} shows that the plagues were meant to be remembered by children.`, "God wants future families to hear what He did in Egypt.", "The rescue story is not supposed to disappear after one generation.", "👶 Children", "👂 Listening", "📖 Story remembered", "Bible faith is handed down as people tell the next generation what the LORD has done.");
  } else if (lower.includes("refuse to humble")) {
    add(`${title} names Pharaoh's sin as pride.`, "He is not merely making a political decision.", "He is refusing to bow before the LORD.", "👑 Pride", "🚫 Refusal", "🙇 Humility rejected", "The plagues keep asking the same question: will Pharaoh humble himself before God?");
  } else if (lower.includes("locust")) {
    add(`${title} names the plague that devours what the hail left behind.`, "Locusts were feared because they could strip fields bare.", "Here they become an army of judgment over Egypt's food supply.", "🦗 Locusts", "🌾 Crops eaten", "🍞 Hunger threatened", "Egypt cannot feed itself if the Creator commands creation against it.");
  } else if (lower.includes("snare") || lower.includes("egypt is destroyed")) {
    add(`${title} means Pharaoh's servants can see what Pharaoh refuses to admit.`, "Egypt is collapsing under the cost of his pride.", "The people near Pharaoh know Moses is not the real danger; Pharaoh's stubbornness is.", "👀 Servants see", "💥 Egypt damaged", "👑 Pride remains", "Sometimes the people around a proud leader can see the ruin before the leader will confess it.");
  } else if (lower.includes("who are they") || lower.includes("young") || lower.includes("old") || lower.includes("men")) {
    add(`${title} exposes Pharaoh's attempt to control the terms of worship.`, "Moses says the whole people must go: young, old, sons, daughters, flocks, and herds.", "Pharaoh wants partial obedience because partial freedom keeps him in charge.", "🧒 Young", "🧓 Old", "👪 Whole households", "The LORD commands full release, not a small religious break.");
  } else if (lower.includes("driven out")) {
    add(`${title} shows Pharaoh ending the conversation in anger.`, "Moses and Aaron are not persuaded by Pharaoh's compromise.", "So they are pushed away from his presence.", "🚪 Driven out", "👑 Angry ruler", "🚫 No agreement", "Pharaoh keeps trying to manage God's command instead of obeying it.");
  } else if (lower.includes("east wind") || lower.includes("west wind")) {
    add(`${title} shows God commanding the wind as part of judgment and mercy.`, "The east wind brings the locusts, and the west wind removes them.", "The same creation that serves judgment also serves relief when God commands it.", "🌬️ Wind", "🦗 Locusts moved", "🌊 Red Sea", "The LORD rules both the arrival of the plague and the removal of the plague.");
  } else if (lower.includes("forgive")) {
    add(`${title} is Pharaoh asking Moses to pray for relief again.`, "His words sound humble for a moment.", "But the story will show that he mainly wants the plague removed.", "🙏 Prayer requested", "🗣️ Confession language", "🔒 Heart unchanged", "There is a difference between wanting consequences gone and wanting God Himself.");
  } else if (lower.includes("red sea")) {
    add(`${title} names the sea that will soon become the place of Israel's great deliverance.`, "Here the locusts are thrown away from Egypt into the sea.", "Later, Pharaoh's army will also meet judgment at the sea.", "🌊 Red Sea", "🦗 Locusts removed", "🧭 Future rescue hinted", "The detail quietly prepares the reader for the greater sea deliverance still coming.");
  } else if (lower.includes("darkness") || lower.includes("saw not")) {
    add(`${title} describes a plague that stops normal life in Egypt.`, "The darkness is not just nighttime.", "It is thick, terrifying, and paralyzing.", "🌑 Darkness", "🙈 Could not see", "⏸️ Life stopped", "Egypt's sun and light cannot help when the LORD commands darkness.");
  } else if (lower.includes("had light")) {
    add(`${title} shows another clear difference between Israel and Egypt.`, "Egypt sits in thick darkness.", "Israel has light in their dwellings.", "💡 Light", "🏠 Homes", "🛡️ Protected people", "The contrast makes the point visible: God's people are preserved while Egypt is judged.");
  } else if (lower.includes("flocks") || lower.includes("herds") || lower.includes("hoof")) {
    add(`${title} deals with Pharaoh's final compromise before the last plague.`, "He tries to let the people go while keeping their animals behind.", "Moses refuses because worship requires what God commands, not what Pharaoh allows.", "🐐 Flocks", "🐄 Herds", "🚫 Not one hoof left", "Pharaoh wants control over Israel's worship, but Moses will not let Egypt define obedience.");
  } else if (lower.includes("we know not with what")) {
    add(`${title} means Israel must leave with everything needed to worship the LORD.`, "Moses does not know yet which animals God will require.", "So Pharaoh cannot keep any of them.", "🙌 Worship", "🐐 Sacrifice", "📜 God's command comes first", "Worship is not negotiated with Pharaoh. It is directed by God.");
  } else if (lower.includes("get thee from me") || lower.includes("face no more") || lower.includes("spoken well")) {
    add(`${title} closes the public confrontation between Moses and Pharaoh.`, "Pharaoh thinks he is controlling access by threatening Moses.", "Moses agrees that this meeting is finished, but God's final word is still coming.", "🚪 Conversation closed", "👑 Threatening king", "⏳ Final plague near", "The king who kept saying no is about to face the judgment he cannot dismiss.");
  } else {
    add(`${title} keeps the reader close to the wording of the plague story.`, "The surrounding verses show Pharaoh, Egypt, Israel, and the LORD moving toward the final plague.", "📖 Scripture text", "🔍 Phrase meaning", "🧠 Story understanding", `${title} lets the actual words teach the story.`);
  }

  return formatDay24ExodusLines(title, lines);
}
function deepenDay24Exodus9To10PhraseCards(section: PersonalExodusPhraseSectionInput): PersonalExodusPhraseSectionInput {
  const titles = DAY_24_EXODUS_9_10_PHRASE_TITLES[section.reference];
  if (!titles) return section;

  return {
    ...section,
    phrases: titles.map((title) => makeDay24Exodus9To10PhraseCard(section, title)),
  };
}

const EXODUS_2_10_MOBILE_FORMAT_CUES: Record<number, string[]> = {
  1: ["👑 Pharaoh fears Israel's growth.", "🧱 Slavery becomes Egypt's weapon.", "👶 God preserves life under pressure."],
  2: ["🧺 Moses is rescued through ordinary courage.", "🏜️ Midian becomes a training place.", "👂 God hears the groaning of His people."],
  3: ["🔥 God calls Moses from holy ground.", "📜 The promise from Genesis is still alive.", "🤝 God's presence answers Moses' weakness."],
  4: ["🐍 Signs confirm God's sending.", "🗣️ Moses brings his fear of speaking.", "🤝 Aaron is given as help, not as a replacement for obedience."],
  5: ["👑 Pharaoh rejects God's word.", "🧱 Oppression gets heavier before rescue is visible.", "🙏 Moses brings honest questions back to the LORD."],
  6: ["📜 God repeats His covenant promise.", "💔 Crushed people struggle to hear hope.", "🧬 Moses and Aaron are placed inside Israel's family story."],
  7: ["🐍 The rod confronts Egypt's power.", "🌊 The Nile is judged.", "🔒 Pharaoh's hard heart is being exposed."],
  8: ["🐸 The plagues invade ordinary life.", "🎭 Egypt can imitate power but cannot bring rescue.", "🛡️ God distinguishes His people."],
  9: ["⚖️ Judgment grows more severe.", "📣 Warning comes before the blow.", "🔒 Pharaoh's relief does not become surrender."],
  10: ["🦗 Egypt is being emptied by judgment.", "🌑 Darkness exposes Pharaoh's blindness.", "🙏 God, not Pharaoh, defines worship."],
};

function hasExodusTwoToTenVisualList(content: string) {
  return content
    .split(/\n+/)
    .filter((line) => line.trim().length > 0)
    .some((line) => /^[^\w\s"']/.test(line.trim()));
}

function formatExodusTwoToTenPhraseExplanation(section: PersonalExodusPhraseSectionInput, content: string) {
  const cleaned = content
    .replace(/\bThis phrase matters because\b/gi, "This is important because")
    .replace(/\bThe phrase matters because\b/gi, "This is important because")
    .replace(/\bmatters because\b/gi, "is important because")
    .replace(/\bbelongs to\b/gi, "is part of")
    .replace(/\bnot filler\b/gi, "part of the story")
    .replace(/\bA beginner should see that\s*/gi, "Notice that ")
    .replace(/\bA beginner should see\s*/gi, "Notice ")
    .replace(/\bA beginner should notice that\s*/gi, "Notice that ")
    .replace(/\bA beginner should notice\s*/gi, "Notice ")
    .replace(/\bA beginner should\s+/gi, "The reader can ")
    .replace(/\bFor beginners,?\s*/gi, "")
    .replace(/\bThis phrase helps\s+/gi, "The wording helps ")
    .replace(/\bThe phrase helps\s+/gi, "The wording helps ")
    .replace(/\bBible Buddy should slow down here because\s*/gi, "Slow down here because ")
    .replace(/\bThis detail helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThis detail helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThis phrase helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThis phrase helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThe detail helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThe detail helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ")
    .replace(/\bThe phrase helps (?:a beginner|the reader) (?:see|follow|understand) that\s*/gi, "Notice that ")
    .replace(/\bThe phrase helps (?:a beginner|the reader) (?:see|follow|understand)\s*/gi, "Notice ");
  if (section.chapter >= 1 && section.chapter <= 10) {
    return cleaned;
  }

  if (section.chapter < 1 || section.chapter > 10 || hasExodusTwoToTenVisualList(cleaned)) {
    return cleaned;
  }

  const blocks = cleaned
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const cues = EXODUS_2_10_MOBILE_FORMAT_CUES[section.chapter];

  if (!cues || blocks.length < 2) {
    return blocks.join("\n\n");
  }

  const opening = blocks.slice(0, Math.min(2, blocks.length));
  const closing = blocks.slice(opening.length);

  return note([
    ...opening,
    "What to notice:",
    ...cues,
    ...closing,
  ]);
}

function getExodusTwoToTenPhraseList(section: PersonalExodusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/pharaoh|egypt|taskmaster|officer|bondage|brick|straw|burden/.test(lower)) {
    return [
      `🏛️ ${cleanTitle}`,
      "🧱 Oppression in Egypt",
      "👑 Pharaoh's control",
      "🙌 God preparing deliverance",
    ];
  }

  if (/moses|aaron|rod|mouth|speak|send|sign|hand/.test(lower)) {
    return [
      `🧭 ${cleanTitle}`,
      "📣 God's messenger",
      "🤲 Human weakness",
      "🙌 God's power at work",
    ];
  }

  if (/lord|god|i am|covenant|abraham|isaac|jacob|name|promise/.test(lower)) {
    return [
      `🙌 ${cleanTitle}`,
      "📜 Covenant promise",
      "👂 God hearing His people",
      "💪 Rescue rooted in who God is",
    ];
  }

  if (/plague|blood|frog|lice|flies|murrain|boil|hail|locust|darkness|magicians/.test(lower)) {
    return [
      `⚖️ ${cleanTitle}`,
      "👑 Pharaoh confronted",
      "🌍 Creation under God's command",
      "🚫 Egypt's power exposed",
    ];
  }

  if (/heart|harden|hearken|refused|not let|let my people go/.test(lower)) {
    return [
      `🔒 ${cleanTitle}`,
      "👑 Pharaoh resisting God",
      "📣 God's word made clear",
      "⚖️ Judgment becoming heavier",
    ];
  }

  if (/israel|hebrew|people|children|groaning|cried|heard/.test(lower)) {
    return [
      `👥 ${cleanTitle}`,
      "💔 Israel suffering",
      "👂 God hearing",
      "🕊️ Deliverance coming",
    ];
  }

  return [
    `🔎 ${cleanTitle}`,
    section.chapter <= 4 ? "🔥 God calling Moses" : "⚖️ God confronting Egypt",
    section.chapter <= 4 ? "📣 A rescuer being prepared" : "🕊️ Israel's freedom drawing near",
  ];
}

function getExodusTwoToTenTeachingLines(section: PersonalExodusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (/by the way in the inn|sought to kill|sharp stone|foreskin|bloody husband|wilderness to meet|mount of god|kissed/.test(lower)) {
    if (/by the way in the inn/.test(lower)) {
      return [
        `${cleanTitle} gives the location of a sudden covenant crisis on Moses' journey back to Egypt.`,
        `An inn was a stopping place on the road, so this moment happens while Moses is already moving toward his calling.`,
        `${cleanTitle} slows the story down to show that God's messenger must take God's covenant seriously before he confronts Pharaoh.`,
      ];
    }

    if (/sought to kill/.test(lower)) {
      return [
        `${cleanTitle} shows the LORD confronting Moses before Moses confronts Pharaoh.`,
        `This is a serious moment because Moses is carrying God's message while something in his own household is still not right before God.`,
        `${cleanTitle} teaches that God's covenant is not casual, even for the man God is sending to lead Israel.`,
      ];
    }

    if (/sharp stone/.test(lower)) {
      return [
        `${cleanTitle} shows Zipporah acting quickly in a dangerous covenant moment.`,
        `The sharp stone is the tool used for circumcision, the sign God gave to Abraham's family.`,
        `${cleanTitle} helps the reader see that this scene is about obedience to the covenant sign, not random violence on the road.`,
      ];
    }

    if (/foreskin/.test(lower)) {
      return [
        `${cleanTitle} names the act of circumcision connected to God's covenant with Abraham.`,
        `Circumcision marked the males of Abraham's family as belonging to the covenant people.`,
        `${cleanTitle} matters because Moses cannot lead the covenant people while treating the covenant sign as unimportant.`,
      ];
    }

    if (/bloody husband/.test(lower)) {
      return [
        `${cleanTitle} shows how shocking and costly the circumcision moment felt to Zipporah.`,
        `Her words are emotional because blood, danger, family, and obedience all meet in one hard scene.`,
        `${cleanTitle} keeps the reader from treating covenant obedience as a small or comfortable thing.`,
      ];
    }

    if (/wilderness to meet|mount of god|kissed/.test(lower)) {
      return [
        `${cleanTitle} shows God providing Aaron as Moses continues toward Egypt.`,
        `In ${cleanTitle}, the meeting is not accidental; God sends Aaron to join Moses in the mission.`,
        `${cleanTitle} helps the reader see that Moses will not stand before Pharaoh alone.`,
      ];
    }
  }

  if (/heard.*groaning|groaning|cried|cry/.test(lower)) {
    return [
      `${cleanTitle} shows that Israel's suffering reached God.`,
      `The pain behind ${cleanTitle} did not need polished words before God cared.`,
      `Through ${cleanTitle}, the LORD begins answering real oppression with real deliverance.`,
    ];
  }

  if (/i am that i am|name|lord god of your fathers/.test(lower)) {
    return [
      `${cleanTitle} reveals God's identity, not just Moses' assignment.`,
      `${cleanTitle} means the LORD is not one more Egyptian god with limited power.`,
      `${cleanTitle} presents the living God who exists by His own power and keeps covenant.`,
    ];
  }

  if (/lord|god|i am|covenant|promise|name/.test(lower)) {
    return [
      `${cleanTitle} pulls the reader back to God's character.`,
      `Around ${cleanTitle}, Moses may feel weak and Pharaoh may look strong.`,
      `${cleanTitle} reminds the reader that rescue rests on the LORD who remembers, speaks, and keeps His promise.`,
    ];
  }

  if (/pharaoh|harden|heart|hearken|refused|not let/.test(lower)) {
    return [
      `${cleanTitle} shows resistance against God's word.`,
      `With ${cleanTitle}, Pharaoh's problem is not that God's command is unclear.`,
      `${cleanTitle} exposes refusal against the LORD's right to claim Israel as His people.`,
    ];
  }

  if (/moses|aaron|mouth|rod|hand|speak|send/.test(lower)) {
    return [
      `${cleanTitle} shows God working through an imperfect servant.`,
      `In ${cleanTitle}, Moses does not always feel ready for what God commands.`,
      `${cleanTitle} keeps the calling attached to God's power, not Moses' confidence.`,
    ];
  }

  if (/plague|blood|frog|lice|flies|murrain|boil|hail|locust|darkness|magicians/.test(lower)) {
    return [
      `${cleanTitle} is part of God's public confrontation with Egypt.`,
      `${cleanTitle} is not random trouble dropped into the story.`,
      `${cleanTitle} shows the LORD ruling over something Egypt trusted.`,
    ];
  }

  if (/israel|hebrew|people|groaning|cried|bondage|burden/.test(lower)) {
    return [
      `${cleanTitle} keeps Israel's suffering in front of the reader.`,
      `The pain behind ${cleanTitle} is real, physical, and daily.`,
      `${cleanTitle} shows that God's rescue answers actual oppression, not an imaginary problem.`,
    ];
  }

  return [
    `${cleanTitle} explains one piece of the rescue story.`,
    `The wording of ${cleanTitle} keeps the reader close to what the verse actually says.`,
    `${cleanTitle} connects bondage, deliverance, and worship without drifting away from the text.`,
  ];
}

function normalizeRepeatedExodusTwoToTenLines(sections: PersonalExodusPhraseSectionInput[]) {
  const counts = new Map<string, number>();
  const normalizeLine = (line: string) => line.toLowerCase().replace(/[.?!]+$/, "").trim();

  for (const section of sections) {
    if (section.chapter < 1 || section.chapter > 10) continue;
    for (const [, content] of section.phrases) {
      for (const line of content.split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
        const key = normalizeLine(line);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }

  return sections.map((section) => {
    if (section.chapter < 1 || section.chapter > 10) return section;
    if (section.chapter >= 5 && section.chapter <= 10) {
      return {
        ...section,
        phrases: section.phrases.map(([title, content]) => [
          ensureExodusTwoToTenTitleEmoji(title),
          content,
        ] as [string, string]),
      };
    }

    return {
      ...section,
      phrases: section.phrases.map(([title, content]) => {
        const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
        const kept: string[] = [];

        for (const line of formatExodusTwoToTenPhraseExplanation(section, content).split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
          const key = normalizeLine(line);
          const isRepeated = (counts.get(key) ?? 0) >= 3;
          const isTitleLine = line.toLowerCase().includes(cleanTitle.toLowerCase());
          const isEmojiLine = /^[^A-Za-z0-9'"(]/.test(line);
          if (isRepeated && !isTitleLine && !isEmojiLine) continue;
          kept.push(line);
        }

        const hasList = kept.filter((line) => /^[^A-Za-z0-9'"(]/.test(line)).length >= 2;
        if (!hasList) {
          kept.splice(Math.min(2, kept.length), 0, ...getExodusTwoToTenPhraseList(section, cleanTitle));
        }

        for (const line of getExodusTwoToTenTeachingLines(section, cleanTitle)) {
          if (kept.length >= 5) break;
          if (!kept.some((keptLine) => normalizeLine(keptLine) === normalizeLine(line))) {
            kept.push(line);
          }
        }

        while (kept.length < 4) {
          const additions = [
            `${cleanTitle} keeps the reader close to the exact Bible wording.`,
            `${cleanTitle} names something God included in this scene.`,
            `${cleanTitle} should be understood before the reader moves on.`,
          ];
          kept.push(additions[kept.length % additions.length]);
        }

        return [ensureExodusTwoToTenTitleEmoji(title), note(kept)] as [string, string];
      }),
    };
  });
}

function formatExodusTwoToTenSectionExplanations(sections: PersonalExodusPhraseSectionInput[]) {
  return normalizeRepeatedExodusTwoToTenLines(sections.map((section) => ({
    ...section,
    icon: getExodusTwoToTenSectionIcon(section),
    phrases: section.phrases.map(([title, content]) => [
      title,
      formatExodusTwoToTenPhraseExplanation(section, content),
    ] as [string, string]),
  })));
}

export const EXODUS_2_10_PERSONAL_SECTIONS: PersonalExodusPhraseSectionInput[] = formatExodusTwoToTenSectionExplanations([
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_TWO_DEEP_STUDY_SECTIONS, [1, 2, 3, 4], "🔥").map(deepenDay22PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_THREE_DEEP_STUDY_SECTIONS, [5, 6, 7, 8], "⚖️").map(deepenDay23PhraseCards),
  ...makeExodusSectionsFromDeepStudy(BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_STUDY_SECTIONS, [9, 10], "🌩️").map(deepenDay24Exodus9To10PhraseCards),
  ...RAW_EXODUS_2_10_PERSONAL_SECTIONS.filter((section) => section.chapter < 1 || section.chapter > 10),
]);
