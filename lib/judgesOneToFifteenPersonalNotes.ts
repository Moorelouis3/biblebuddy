import { JUDGES_DEEP_NOTES } from "./judgesDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import { DAY_61_80_JUDGES_1_15_SUPPLEMENTAL_SECTIONS } from "./daySixtyOneToEightySupplementalPersonalNotes";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

const generatedJudgesOneToNineSections = buildGeneratedPersonalSections({
  book: "Judges",
  notes: JUDGES_DEEP_NOTES,
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  icon: "⚔️",
  fallbackPhrases: [
    "The Children Of Israel",
    "Did Evil In The Sight Of The LORD",
    "The LORD Raised Up",
    "Delivered Them",
    "The Spirit Of The LORD",
    "Cried Unto The LORD",
    "Judged Israel",
  ],
});

type GeneratedJudgesSection = (typeof generatedJudgesOneToNineSections)[number];

const note = (lines: string[]) => lines.join("\n\n");

function stripLeadingEmoji(value: string) {
  return value.replace(/^[\p{Extended_Pictographic}\uFE0F\s]+/u, "").trim();
}

function teachingLine(title: string) {
  const cleanTitle = title.replace(/^[^\p{L}\p{N}]+/u, "").trim().toLowerCase();

  if (/died|buried|fell|die/.test(cleanTitle)) {
    return "This wording reminds the reader that every judge was temporary.";
  }

  if (/judged|judge|head|captain/.test(cleanTitle)) {
    return "Judges is showing the kind of leadership Israel was depending on in that moment.";
  }

  if (/lord|spirit|deliver|delivered|called on/.test(cleanTitle)) {
    return "God's action stays at the center of the story.";
  }

  if (/vow|mouth|words|witness/.test(cleanTitle)) {
    return "Spoken words before God are being treated as serious.";
  }

  if (/daughter|virginity|fellows|wept|low/.test(cleanTitle)) {
    return "The scene slows down so the reader feels the human cost.";
  }

  if (/ammon|philistines|battle|war|smote|slew/.test(cleanTitle)) {
    return "Israel's trouble becomes visible through conflict.";
  }

  if (/land|gilead|mizpeh|border|shamir|bethlehem/.test(cleanTitle)) {
    return "The lesson is grounded in real places, not vague ideas.";
  }

  if (/evil|gods|baalim|ashtaroth|sinned|strange/.test(cleanTitle)) {
    return "The spiritual problem underneath the crisis is being named.";
  }

  return "The detail belongs in the story because it helps explain the moment in front of the reader.";
}

function phrase(title: string, meaning: string, bullets: string[], close: string): [string, string] {
  return [
    title,
    note([
      meaning,
      teachingLine(title),
      ...bullets,
      close,
    ]),
  ];
}

function section(chapter: number, startVerse: number, endVerse: number, title: string, icon: string, phrases: Array<[string, string]>): GeneratedJudgesSection {
  return {
    chapter,
    startVerse,
    endVerse,
    reference: `Judges ${chapter}:${startVerse}-${endVerse}`,
    title,
    icon,
    phrases,
  };
}

const judgesTenToFifteenFallbackSections: GeneratedJudgesSection[] = [
  section(10, 1, 5, "Tola Judges Israel", "🧭", [
    phrase("🧭 Tola The Son Of Puah", "Tola is named as a judge who rises after Abimelech's violent failure.", ["👤 A named deliverer", "🏚️ After chaos", "🧭 Stabilizing leadership"], "The short notice shows mercy after disorder."),
    phrase("🛡️ To Defend Israel", "To defend Israel means Tola's role was protective.", ["🛡️ Protection", "👥 God's people", "⚖️ Restored order"], "Judges often gives long failure stories and short mercy notes."),
    phrase("🏔️ Dwelt In Shamir", "Dwelt in Shamir locates Tola's leadership in the hill country of Ephraim.", ["📍 Real place", "🏔️ Hill country", "👣 Local leadership"], "The detail keeps the story grounded in Israel's lived history."),
    phrase("⚰️ He Died, And Was Buried", "He died, and was buried closes Tola's brief service.", ["⏳ Limited life", "🧭 Temporary judge", "📖 Story moves on"], "Every judge is temporary, which keeps the reader longing for deeper rescue."),
  ]),
  section(10, 6, 10, "Israel Serves Many Gods", "🚨", [
    phrase("🚨 Did Evil Again In The Sight Of The LORD", "Did evil again shows the cycle of rebellion returning.", ["🔁 Repeated sin", "👁️ Before the LORD", "⚠️ Spiritual danger"], "The phrase tells us Israel's problem is seen by God."),
    phrase("🪵 Served Baalim, And Ashtaroth", "Served Baalim and Ashtaroth means Israel turns to Canaanite idols.", ["🪵 False worship", "💔 Divided loyalty", "🌾 Fertility idols"], "Judges shows idolatry as covenant betrayal."),
    phrase("🌍 The Gods Of Syria", "The gods of Syria shows Israel's idolatry spreading in many directions.", ["🌍 Borrowed gods", "🧭 Lost worship", "⚠️ Cultural pull"], "The people are collecting false help instead of clinging to the LORD."),
    phrase("😢 Cried Unto The LORD", "Cried unto the LORD means suffering finally drives Israel back toward God.", ["😢 Distress", "🙏 Cry for help", "🕊️ Mercy needed"], "Their cry does not erase the sin, but it opens the next moment of mercy."),
  ]),
  section(10, 11, 16, "The LORD Confronts Israel", "⚖️", [
    phrase("⚖️ Did Not I Deliver You", "Did not I deliver you reminds Israel of the LORD's past rescues.", ["📖 Memory", "🛡️ Deliverance", "💔 Forgotten grace"], "God confronts forgetfulness by naming His mercy."),
    phrase("🪵 Go And Cry Unto The Gods", "Go and cry unto the gods exposes the emptiness of Israel's idols.", ["🪵 False helpers", "⚠️ Hard lesson", "👁️ Exposed trust"], "The phrase forces Israel to face what their worship has become."),
    phrase("🙏 We Have Sinned", "We have sinned is Israel's confession.", ["🙏 Confession", "💔 Guilt named", "↩️ Turning point"], "Judges makes confession simple, direct, and serious."),
    phrase("🧹 They Put Away The Strange Gods", "They put away the strange gods means repentance becomes visible.", ["🧹 Idols removed", "🙌 Serving the LORD", "🕊️ Mercy sought"], "The phrase shows that repentance is more than words."),
  ]),
  section(10, 17, 18, "Ammon Gathers For Battle", "⛺", [
    phrase("⛺ The Children Of Ammon Were Gathered Together", "The children of Ammon gathered together means the threat becomes organized.", ["⚔️ Enemy pressure", "⛺ Armies gather", "😟 Israel feels exposed"], "The chapter moves from confession to the need for deliverance."),
    phrase("📍 Pitched In Gilead", "Pitched in Gilead means the danger is now near Israel's own people.", ["📍 Gilead", "⚔️ Near conflict", "🏠 Threatened homes"], "The location matters because Jephthah's story will rise from Gilead."),
    phrase("❓ What Man Is He", "What man is he shows Israel looking for leadership.", ["❓ Need for a leader", "⚔️ Battle ahead", "👥 Public question"], "The people need someone to begin the fight."),
    phrase("👑 Shall Be Head Over All", "Shall be head over all means leadership will be offered to the one who can deliver.", ["👑 Authority", "🛡️ Deliverance expected", "⚠️ Pressure"], "Judges keeps tying leadership to crisis."),
  ]),
  section(11, 1, 3, "Jephthah Is Rejected", "🏚️", [
    phrase("💪 Jephthah The Gileadite Was A Mighty Man Of Valour", "Mighty man of valour means Jephthah is known as a capable warrior.", ["💪 Strength", "📍 Gilead", "⚔️ Battle skill"], "The phrase introduces ability before the pain of rejection."),
    phrase("🏚️ He Was The Son Of An Harlot", "Son of an harlot explains the family shame used against Jephthah.", ["🏚️ Painful background", "👥 Family rejection", "💔 Social shame"], "Judges does not hide the brokenness around its deliverers."),
    phrase("🚪 They Thrust Out Jephthah", "They thrust out Jephthah means his brothers force him away.", ["🚪 Rejection", "🏠 Family conflict", "😢 Exile from home"], "The deliverer Israel later needs is first pushed out."),
    phrase("🏜️ Dwelt In The Land Of Tob", "Dwelt in the land of Tob shows Jephthah living away from his family inheritance.", ["🏜️ Outside home", "👥 New companions", "⏳ Waiting season"], "His story begins with displacement before leadership."),
  ]),
  section(11, 4, 8, "Gilead Calls Jephthah", "🤝", [
    phrase("⚔️ The Children Of Ammon Made War", "The children of Ammon made war explains why Gilead suddenly needs Jephthah.", ["⚔️ Crisis", "😟 Pressure", "🛡️ Need for help"], "Conflict changes how people treat the one they rejected."),
    phrase("🤝 Come, And Be Our Captain", "Come, and be our captain is the elders' request for Jephthah to lead.", ["🤝 Invitation", "⚔️ Military need", "👑 Leadership offered"], "The rejected man is now asked to rescue the community."),
    phrase("💔 Did Not Ye Hate Me", "Did not ye hate me shows Jephthah naming the wound honestly.", ["💔 Rejection remembered", "🗣️ Honest speech", "⚖️ Past wrong"], "The Bible lets the pain of the story speak."),
    phrase("🏠 Why Are Ye Come Unto Me Now", "Why are ye come unto me now exposes the elders' desperation.", ["❓ Hard question", "😟 Need", "🧭 Crisis leadership"], "The phrase shows that need does not erase history."),
  ]),
  section(11, 9, 11, "Jephthah Becomes Head", "👑", [
    phrase("👑 Shall I Be Your Head", "Shall I be your head clarifies that Jephthah is asking about real leadership.", ["👑 Authority", "🤝 Agreement", "⚔️ Victory hoped for"], "The issue is not only fighting but leading."),
    phrase("🙏 The LORD Be Witness Between Us", "The LORD be witness between us brings the agreement before God.", ["🙏 God's witness", "🤝 Covenant-like promise", "⚖️ Accountability"], "Their words are not treated as casual politics."),
    phrase("🗣️ Jephthah Uttered All His Words Before The LORD", "Jephthah uttered all his words before the LORD means his leadership begins with public accountability.", ["🗣️ Spoken words", "🙏 Before the LORD", "📍 Mizpeh"], "The phrase slows down the seriousness of the moment."),
    phrase("📍 In Mizpeh", "In Mizpeh locates the agreement and prepares the reader for the conflict ahead.", ["📍 Real place", "👥 Public setting", "⚔️ Before battle"], "Judges keeps its stories grounded in places and people."),
  ]),
  section(11, 12, 17, "Jephthah Sends Messengers", "📜", [
    phrase("📜 Jephthah Sent Messengers", "Jephthah sent messengers shows he does not rush straight into battle.", ["📜 Diplomacy", "🗣️ Words before war", "⚖️ Seeking clarity"], "The phrase shows restraint and order."),
    phrase("❓ What Hast Thou To Do With Me", "What hast thou to do with me asks why Ammon is attacking.", ["❓ Dispute named", "⚖️ Cause examined", "🗣️ Direct question"], "Jephthah wants the reason stated clearly."),
    phrase("🏞️ Israel Took Away My Land", "Israel took away my land is Ammon's accusation.", ["🏞️ Land claim", "⚔️ Conflict reason", "📜 History disputed"], "The battle is tied to a disagreement about inheritance."),
    phrase("🕊️ Let Us Pass", "Let us pass recalls Israel's earlier request during the wilderness journey.", ["🕊️ Peaceful request", "🚶 Journey memory", "⚠️ Refusal"], "Jephthah will answer the present accusation with remembered history."),
  ]),
  section(11, 18, 23, "Jephthah Retells The Journey", "🧭", [
    phrase("🧭 Went Along Through The Wilderness", "Went along through the wilderness points back to Israel's long journey.", ["🧭 Wilderness route", "⏳ Patient movement", "📖 History matters"], "Jephthah knows the story that explains the land."),
    phrase("🚫 Came Not Within The Border Of Moab", "Came not within the border of Moab shows Israel avoided taking land God had not given.", ["🚫 Restraint", "🏞️ Borders respected", "📜 Accurate memory"], "The phrase answers the accusation with careful detail."),
    phrase("⚔️ Sihon Gathered All His People", "Sihon gathered all his people shows that Israel fought after being opposed.", ["⚔️ Battle", "👑 Sihon", "📖 History recalled"], "Jephthah presents Israel's possession as the result of conflict God allowed."),
    phrase("🙌 The LORD God Of Israel Delivered Sihon", "The LORD God of Israel delivered Sihon means the land came by God's hand.", ["🙌 God's action", "🛡️ Deliverance", "🏞️ Land given"], "The phrase puts inheritance under God's authority."),
  ]),
  section(11, 24, 28, "The King Refuses To Listen", "👂", [
    phrase("🪵 Wilt Not Thou Possess That Which Chemosh Thy God Giveth Thee", "Jephthah uses Ammon's own way of thinking to expose the land claim.", ["🪵 False god named", "🏞️ Possession argument", "🗣️ Jephthah reasons"], "Jephthah is arguing that Israel will hold what the LORD gave."),
    phrase("👑 Art Thou Any Thing Better Than Balak", "Art thou any thing better than Balak compares Ammon's king to Moab's earlier king.", ["👑 Kings compared", "📖 Earlier history", "⚖️ Weak claim"], "History becomes part of Jephthah's defense."),
    phrase("⚖️ The LORD The Judge Be Judge", "The LORD the Judge be judge means Jephthah appeals the dispute to God.", ["⚖️ God judges", "🏞️ Land dispute", "🙏 Final appeal"], "The phrase places the conflict under divine judgment."),
    phrase("👂 The King Of The Children Of Ammon Hearkened Not", "Hearkened not means Ammon's king refuses Jephthah's answer.", ["👂 Refusal", "📜 Rejected message", "⚔️ Battle remains"], "Words have been offered, but the conflict continues."),
  ]),
  section(11, 29, 33, "The Spirit Comes Upon Jephthah", "🕊️", [
    phrase("🕊️ The Spirit Of The LORD Came Upon Jephthah", "The Spirit of the LORD came upon Jephthah means God's power comes for deliverance.", ["🕊️ Spirit's power", "💪 Enabled leader", "⚔️ Battle ahead"], "The phrase marks God's mercy in the middle of a messy story."),
    phrase("🗺️ He Passed Over Gilead", "He passed over Gilead shows Jephthah moving through the region he will defend.", ["🗺️ Movement", "📍 Gilead", "⚔️ Mobilization"], "The geography follows the coming battle."),
    phrase("🗣️ Jephthah Vowed A Vow", "Jephthah vowed a vow introduces the tragic turn in the chapter.", ["🗣️ Serious words", "⚠️ Rash promise", "🙏 Spoken before God"], "The phrase warns readers to treat vows carefully."),
    phrase("🛡️ The LORD Delivered Them Into His Hands", "The LORD delivered them into his hands means victory comes from God.", ["🛡️ Deliverance", "🙌 God's action", "⚔️ Victory"], "The victory is real, but the vow will bring sorrow."),
  ]),
  section(11, 34, 36, "Jephthah's Daughter Comes Out", "💔", [
    phrase("💃 His Daughter Came Out To Meet Him", "His daughter came out to meet him turns the vow into personal grief.", ["💃 Celebration", "💔 Sudden sorrow", "🏠 Family cost"], "The story becomes tragic the moment she appears."),
    phrase("🥁 With Timbrels And With Dances", "With timbrels and dances shows she comes in joy, not knowing the vow.", ["🥁 Celebration", "😢 Joy interrupted", "💔 Tragedy"], "The contrast makes the scene painful."),
    phrase("😢 Thou Hast Brought Me Very Low", "Thou hast brought me very low expresses Jephthah's grief and shock.", ["😢 Grief", "🗣️ Painful words", "⚠️ Rash vow exposed"], "His own words have trapped his household."),
    phrase("🗣️ I Have Opened My Mouth Unto The LORD", "I have opened my mouth unto the LORD means Jephthah knows his vow was spoken before God.", ["🗣️ Spoken vow", "🙏 Before the LORD", "⚠️ Serious words"], "The phrase shows why careless words can become deeply destructive."),
  ]),
  section(11, 37, 40, "The Daughter Mourns Her Future", "⛰️", [
    phrase("⛰️ Bewail My Virginity", "Bewail my virginity points to her grief over a future family she will not have.", ["⛰️ Mourning", "👧 Daughter's sorrow", "💔 Lost future"], "The phrase helps readers feel the cost of Jephthah's vow."),
    phrase("👭 I And My Fellows", "I and my fellows shows Jephthah's daughter grieving with other young women.", ["👭 Companions", "⛰️ Shared mourning", "💔 Public sorrow"], "Her grief is not hidden; the community feels the weight of it."),
    phrase("📅 Two Months", "Two months gives a measured time of mourning before the vow's result.", ["📅 Time given", "⏳ Delay", "😢 Sorrow"], "The detail slows the story and keeps the tragedy from feeling rushed."),
    phrase("📜 A Custom In Israel", "A custom in Israel means the sorrow was remembered yearly.", ["📜 Memory", "👧 Daughter remembered", "💔 Lasting grief"], "The ending makes Jephthah's vow a warning Israel does not forget."),
  ]),
  section(12, 1, 6, "Ephraim Fights Jephthah", "⚔️", [
    phrase("⚔️ The Men Of Ephraim Gathered Themselves Together", "The men of Ephraim gathered themselves together means conflict rises inside Israel.", ["⚔️ Internal conflict", "👥 Tribal anger", "🔥 Threat"], "The danger now comes from brothers, not only enemies."),
    phrase("🔥 We Will Burn Thine House Upon Thee", "We will burn thine house upon thee is a violent threat.", ["🔥 Threat", "💔 Tribal hostility", "⚠️ Escalation"], "The phrase shows how fractured Israel has become."),
    phrase("🗣️ I Called You, And Ye Delivered Me Not", "I called you, and ye delivered me not is Jephthah's answer to Ephraim.", ["🗣️ Defense", "⚖️ Blame answered", "⚔️ Conflict deepens"], "The argument reveals broken unity after battle."),
    phrase("🗡️ Say Now Shibboleth", "Say now Shibboleth becomes a tragic test of identity at the Jordan.", ["🗡️ Test word", "🌊 Jordan crossings", "💔 Civil bloodshed"], "A word becomes the marker of life or death."),
  ]),
  section(12, 7, 10, "Ibzan Judges Israel", "📜", [
    phrase("📜 Jephthah Judged Israel Six Years", "Jephthah judged Israel six years closes his troubled leadership.", ["📜 Brief rule", "⏳ Limited season", "⚖️ Judge remembered"], "The short note ends a painful story."),
    phrase("👤 Ibzan Of Bethlehem Judged Israel", "Ibzan of Bethlehem judged Israel introduces another judge after Jephthah.", ["👤 Named judge", "📍 Bethlehem", "🧭 Continuing leadership"], "Judges keeps moving through temporary leaders."),
    phrase("👥 Thirty Sons, And Thirty Daughters", "Thirty sons and thirty daughters highlights Ibzan's large household.", ["👥 Family line", "🏠 Household influence", "📖 Brief record"], "Family details often hint at status and influence."),
    phrase("⚰️ Then Died Ibzan", "Then died Ibzan closes another short judgeship.", ["⚰️ Death", "⏳ Temporary leader", "📖 Story continues"], "The repeated deaths remind readers that each judge is limited."),
  ]),
  section(12, 11, 15, "Elon And Abdon Judge Israel", "🧭", [
    phrase("🧭 Elon, A Zebulonite, Judged Israel", "Elon a Zebulonite judged Israel introduces another brief judge.", ["🧭 Leadership", "📍 Zebulun", "⏳ Short account"], "The Bible records him, but gives little detail."),
    phrase("⏳ He Judged Israel Ten Years", "He judged Israel ten years gives the length of Elon's leadership.", ["⏳ Ten years", "⚖️ Judge", "📖 Measured season"], "Judges often marks leadership by time because each season passes."),
    phrase("⚰️ Elon The Zebulonite Died", "Elon the Zebulonite died reminds readers that every judge is temporary.", ["⚰️ Death", "⏳ Passing leadership", "📖 Story continues"], "The repeated endings make Israel's need for lasting leadership clearer."),
    phrase("🐴 Forty Sons And Thirty Nephews", "Forty sons and thirty nephews points to Abdon's large and influential household.", ["🐴 Donkeys", "👥 Large family", "🏠 Status"], "The detail shows social strength, but it still cannot give Israel lasting rescue."),
  ]),
  section(13, 1, 5, "Samson's Birth Is Announced", "👶", [
    phrase("🚨 Did Evil Again In The Sight Of The LORD", "Did evil again means Samson's story begins inside the same painful cycle.", ["🚨 Repeated sin", "👁️ Before God", "⚠️ Oppression follows"], "The setting is spiritual failure, not hero worship."),
    phrase("🧔 Manoah, Of The Family Of The Danites", "Manoah of the family of the Danites introduces Samson's household and tribe.", ["🧔 Father named", "👥 Danite family", "📍 Tribal setting"], "Samson's story begins in a real family line."),
    phrase("👶 Thou Shalt Conceive, And Bear A Son", "Thou shalt conceive and bear a son announces life where there had been barrenness.", ["👶 Promised son", "🕊️ Mercy", "⏳ Future deliverance"], "God begins deliverance before Samson is born."),
    phrase("✂️ No Razor Shall Come On His Head", "No razor shall come on his head points to Samson's Nazirite calling.", ["✂️ Set-apart sign", "🙏 Nazirite life", "👶 From the womb"], "His hair will become a visible sign of consecration."),
  ]),
  section(13, 6, 10, "Manoah's Wife Reports The Message", "🗣️", [
    phrase("🕊️ A Man Of God Came Unto Me", "A man of God came unto me is how Manoah's wife describes the angelic visitor.", ["🕊️ Divine messenger", "🗣️ Reported message", "😳 Awe"], "The phrase captures her reverence and wonder."),
    phrase("😨 His Countenance Was Like The Countenance Of An Angel", "His countenance was like an angel describes the fearsome holiness of the visitor.", ["😨 Awe", "✨ Holy appearance", "👁️ Unusual encounter"], "She knows this is not an ordinary man."),
    phrase("🚫 Drink No Wine Nor Strong Drink", "Drink no wine nor strong drink belongs to the Nazirite instructions around Samson's birth.", ["🚫 Separation", "🍷 No wine", "🙏 Set apart"], "The mother is drawn into the seriousness of Samson's calling."),
    phrase("🙏 Manoah Entreated The LORD", "Manoah entreated the LORD means he prays for more instruction.", ["🙏 Prayer", "👂 Need to understand", "👶 Concern for the child"], "His prayer is a good response to a holy calling."),
  ]),
  section(13, 11, 14, "The Child's Rule Of Life", "📜", [
    phrase("❓ Art Thou The Man", "Art thou the man is Manoah's question when the messenger returns.", ["❓ Confirmation", "🕊️ Messenger", "👂 Need clarity"], "Manoah wants to know if this is the same visitor."),
    phrase("👶 How Shall We Order The Child", "How shall we order the child asks how Samson should be raised.", ["👶 Parenting", "📜 Instruction", "🙏 Dependent question"], "The phrase shows the calling affects the household."),
    phrase("📜 Of All That I Said Unto The Woman Let Her Beware", "Let her beware means the earlier instructions must be carefully kept.", ["📜 Careful obedience", "👩 Mother included", "⚠️ Serious calling"], "God's command is not casual advice."),
    phrase("🚫 Eat Not Any Thing That Cometh Of The Vine", "Eat not anything that cometh of the vine expands the Nazirite restriction.", ["🚫 Separation", "🍇 Vine avoided", "🙏 Consecration"], "Samson's life is marked as set apart before birth."),
  ]),
  section(13, 15, 20, "The Angel Ascends", "🔥", [
    phrase("🍽️ Let Us Detain Thee", "Let us detain thee shows Manoah wanting to honor the visitor with a meal.", ["🍽️ Hospitality", "🕊️ Holy visitor", "🙏 Reverence"], "He still does not fully understand who is speaking."),
    phrase("❓ What Is Thy Name", "What is thy name asks for the messenger's identity.", ["❓ Mystery", "🕊️ Angel of the LORD", "😳 Awe"], "The answer will show that the name is beyond ordinary understanding."),
    phrase("✨ Seeing It Is Secret", "Seeing it is secret means the name is wonderful or beyond Manoah's grasp.", ["✨ Mystery", "🙏 Holy awe", "👁️ More than ordinary"], "The phrase protects the wonder of the encounter."),
    phrase("🔥 The Angel Of The LORD Ascended In The Flame", "The angel of the LORD ascended in the flame reveals the holiness of the messenger.", ["🔥 Fire", "🕊️ Angel of the LORD", "😨 Worshipful fear"], "The sign makes Manoah and his wife fall on their faces."),
  ]),
  section(13, 21, 25, "Samson Is Born", "🌱", [
    phrase("😨 We Shall Surely Die", "We shall surely die is Manoah's fearful response after seeing the angel.", ["😨 Fear", "🔥 Holy encounter", "💭 Limited understanding"], "He knows they have encountered divine holiness."),
    phrase("🕊️ If The LORD Were Pleased To Kill Us", "If the LORD were pleased to kill us is Manoah's wife's wise answer.", ["🕊️ Reassurance", "🧠 Wise reasoning", "🙏 God's mercy"], "She reads God's actions as mercy, not death."),
    phrase("👶 The Woman Bare A Son", "The woman bare a son means the promise begins to happen.", ["👶 Birth", "✅ Promise kept", "🌱 New beginning"], "The deliverer has arrived as God said."),
    phrase("💪 The Spirit Of The LORD Began To Move Him", "The Spirit of the LORD began to move him shows God's power beginning in Samson.", ["💪 Spirit's stirring", "👦 Young Samson", "⚔️ Future conflict"], "The phrase prepares the reader for Samson's strength."),
  ]),
  section(14, 1, 4, "Samson Desires A Philistine Woman", "👀", [
    phrase("👀 Samson Went Down To Timnath", "Samson went down to Timnath places him among the Philistines.", ["👀 Movement", "📍 Timnath", "⚠️ Dangerous direction"], "The story begins with Samson moving toward temptation and conflict."),
    phrase("💍 Get Her For Me To Wife", "Get her for me to wife shows Samson's desire driving the scene.", ["💍 Marriage desire", "🔥 Impulse", "👪 Parents involved"], "The phrase reveals appetite before wisdom."),
    phrase("❓ Is There Never A Woman Among The Daughters Of Thy Brethren", "Samson's parents are concerned about him marrying among the Philistines.", ["❓ Parental concern", "👥 Covenant people", "⚠️ Mixed loyalty"], "They sense the spiritual danger in the request."),
    phrase("🕊️ It Was Of The LORD", "It was of the LORD means God is working through the conflict with the Philistines.", ["🕊️ God's purpose", "⚔️ Occasion sought", "🧩 Complicated providence"], "The phrase does not excuse Samson's impulses, but it shows God is still ruling."),
  ]),
  section(14, 5, 9, "The Lion And The Honey", "🦁", [
    phrase("🦁 A Young Lion Roared Against Him", "A young lion roared against him introduces sudden danger on Samson's way.", ["🦁 Danger", "📍 Vineyards", "⚔️ Test of strength"], "The moment reveals Samson's Spirit-empowered strength."),
    phrase("💪 The Spirit Of The LORD Came Mightily Upon Him", "The Spirit of the LORD came mightily upon him means Samson's strength comes from God.", ["💪 Power", "🕊️ Spirit", "🛡️ Deliverance strength"], "Samson's ability is not merely natural muscle."),
    phrase("✋ He Rent Him As He Would Have Rent A Kid", "He rent him as a young goat means Samson tears the lion with shocking ease.", ["✋ Strength", "🦁 Lion defeated", "😳 Astonishing power"], "The phrase shows the scale of the Spirit-given strength."),
    phrase("🍯 Honey In The Carcase Of The Lion", "Honey in the carcass of the lion becomes the strange source of Samson's riddle.", ["🍯 Honey", "🦁 Dead lion", "⚠️ Unclean tension"], "The detail also hints at Samson's careless relationship with his calling."),
  ]),
  section(14, 10, 14, "Samson's Riddle", "🧩", [
    phrase("🎉 Samson Made There A Feast", "Samson made there a feast places him inside Philistine celebration.", ["🎉 Feast", "👥 Philistine setting", "⚠️ Social pressure"], "The chosen deliverer is mingling deeply with the oppressor's world."),
    phrase("👥 Thirty Companions To Be With Him", "Thirty companions to be with him shows the social circle around Samson at the feast.", ["👥 Companions", "📍 Philistine company", "🧩 Riddle audience"], "These men become part of the conflict."),
    phrase("🧩 I Will Now Put Forth A Riddle", "I will put forth a riddle shows Samson turning the lion story into a contest.", ["🧩 Riddle", "🎲 Wager", "🗣️ Provocation"], "His strength is joined with play, pride, and risk."),
    phrase("🍽️ Out Of The Eater Came Forth Meat", "Out of the eater came forth meat is the riddle drawn from the lion and honey.", ["🍽️ Meat", "🦁 Eater", "🍯 Sweetness"], "The phrase is clever, but the contest will bring conflict."),
  ]),
  section(14, 15, 20, "The Riddle Turns Bitter", "💔", [
    phrase("🔥 Lest We Burn Thee And Thy Father's House", "The Philistine companions quickly turn to violent pressure.", ["🔥 Threat", "😨 Pressure", "💔 Fear"], "The wedding feast turns dangerous."),
    phrase("😢 Samson's Wife Wept Before Him", "Samson's wife wept before him shows emotional pressure being used to get the answer.", ["😢 Tears", "🗣️ Pressure", "🧩 Secret sought"], "The riddle becomes a test of loyalty."),
    phrase("🐄 If Ye Had Not Plowed With My Heifer", "If ye had not plowed with my heifer is Samson's angry way of saying they manipulated his wife.", ["🐄 Harsh image", "😠 Anger", "🧩 Riddle solved by pressure"], "The phrase shows Samson's rough speech and wounded pride."),
    phrase("💪 The Spirit Of The LORD Came Upon Him", "The Spirit of the LORD came upon him again connects Samson's action to divine empowerment.", ["💪 Power", "⚔️ Conflict", "🕊️ Spirit"], "The chapter ends with strength, anger, and broken relationships tangled together."),
  ]),
  section(15, 1, 5, "Samson Burns The Philistine Fields", "🔥", [
    phrase("🌾 In The Time Of Wheat Harvest", "In the time of wheat harvest sets the scene during an economically important season.", ["🌾 Harvest", "💰 Food supply", "🔥 Vulnerable fields"], "The timing makes Samson's revenge especially damaging."),
    phrase("🚪 I Verily Thought That Thou Hadst Utterly Hated Her", "The father-in-law explains why he gave Samson's wife away.", ["🚪 Broken marriage", "🗣️ Excuse", "💔 Betrayal"], "The words explain the personal conflict behind the next act."),
    phrase("🦊 Three Hundred Foxes", "Three hundred foxes are the animals Samson uses in his revenge.", ["🦊 Foxes", "🔥 Firebrands", "🌾 Fields targeted"], "The strange detail shows Samson's creativity and anger."),
    phrase("🔥 Burnt Up Both The Shocks, And Also The Standing Corn", "Samson destroys Philistine food and wealth at harvest time.", ["🔥 Fire", "🌾 Harvest ruined", "⚔️ Retaliation"], "Samson's personal conflict becomes national conflict."),
  ]),
  section(15, 6, 8, "Violence Escalates", "⚠️", [
    phrase("❓ Who Hath Done This", "Who hath done this shows the Philistines investigating the destruction.", ["❓ Investigation", "🔥 Burned fields", "⚔️ Retaliation cycle"], "The question pulls Samson's private revenge into public conflict."),
    phrase("🔥 Burnt Her And Her Father With Fire", "Burnt her and her father with fire shows brutal Philistine retaliation.", ["🔥 Violence", "💔 Tragedy", "⚠️ Escalation"], "The cycle of revenge becomes darker."),
    phrase("⚔️ Though Ye Have Done This", "Though ye have done this begins Samson's answer to the Philistine violence.", ["⚔️ Response", "😠 Revenge", "🔥 Escalation"], "Samson does not step back from the cycle."),
    phrase("🪨 Dwelt In The Top Of The Rock Etam", "Dwelt in the top of the rock Etam shows Samson withdrawing after striking them.", ["🪨 Hiding place", "📍 Etam", "⚔️ Aftermath"], "The place becomes the setting for the next confrontation."),
  ]),
  section(15, 9, 13, "Judah Hands Samson Over", "⛓️", [
    phrase("⛺ The Philistines Went Up", "The Philistines went up means the enemy comes against Judah because of Samson.", ["⛺ Enemy movement", "⚔️ Pressure", "👥 Judah threatened"], "Samson's conflict now affects his own people."),
    phrase("❓ Knowest Thou Not That The Philistines Are Rulers Over Us", "Judah's question shows fear and resignation under Philistine rule.", ["❓ Fearful question", "👑 Philistine rule", "😟 Accepted oppression"], "Judah sounds more afraid of Samson's disruption than Philistine control."),
    phrase("⛓️ We Are Come Down To Bind Thee", "We are come down to bind thee means Judah chooses to hand Samson over.", ["⛓️ Binding", "👥 Own people", "⚔️ Avoiding conflict"], "The deliverer is restrained by the people he is meant to help."),
    phrase("🤝 Swear Unto Me", "Swear unto me shows Samson asking Judah not to kill him themselves.", ["🤝 Oath", "⚠️ Danger", "⛓️ Surrender"], "Even this moment is full of distrust inside Israel."),
  ]),
  section(15, 14, 17, "The Jawbone Victory", "🦴", [
    phrase("💪 The Spirit Of The LORD Came Mightily Upon Him", "The Spirit of the LORD came mightily upon him marks the source of Samson's strength.", ["💪 Power", "🕊️ Spirit", "⛓️ Bonds break"], "The victory is not explained as ordinary strength."),
    phrase("⛓️ The Cords That Were Upon His Arms Became As Flax", "The cords became as flax shows the bindings losing all power over Samson.", ["⛓️ Broken bonds", "🔥 Like burned flax", "💪 Freedom"], "What Judah used to restrain him cannot hold him when the Spirit empowers him."),
    phrase("🦴 A New Jawbone Of An Ass", "A new jawbone of an ass is the unexpected weapon Samson finds.", ["🦴 Simple weapon", "😳 Unlikely tool", "⚔️ Battle"], "Judges often shows God using surprising means."),
    phrase("⚔️ Slew A Thousand Men Therewith", "Slew a thousand men therewith shows the scale of Samson's victory.", ["⚔️ Victory", "👥 Philistines struck", "💪 Great strength"], "The deliverance is real, even though Samson remains deeply flawed."),
  ]),
  section(15, 18, 20, "Samson Cries For Water", "💧", [
    phrase("💧 He Was Sore Athirst", "He was sore athirst shows Samson's weakness after victory.", ["💧 Thirst", "😩 Human weakness", "⚔️ After battle"], "The strong man still depends on God for life."),
    phrase("🙏 He Called On The LORD", "He called on the LORD means Samson prays in desperation.", ["🙏 Prayer", "💧 Need", "🕊️ Dependence"], "This is one of Samson's clearest moments of direct appeal to God."),
    phrase("🪨 God Clave An Hollow Place", "God clave a hollow place means God provides water miraculously.", ["🪨 Rock opened", "💧 Water", "🙌 Provision"], "The LORD gives mercy even to a messy deliverer."),
    phrase("⚖️ He Judged Israel In The Days Of The Philistines Twenty Years", "He judged Israel twenty years summarizes Samson's long role during Philistine oppression.", ["⚖️ Judge", "⏳ Twenty years", "⚔️ Philistine days"], "The phrase closes this part while the larger Samson story is not finished yet."),
  ]),
];

const day62JudgesSectionTitles: Record<string, string> = {
  "Judges 1:1-6": "⚔️ Who Shall Go Up First",
  "Judges 1:7-12": "👑 As I Have Done So God Hath Requited Me",
  "Judges 1:13-18": "💧 Give Me A Blessing",
  "Judges 1:19-24": "🚫 They Could Not Drive Out The Inhabitants Of The Valley",
  "Judges 1:25-30": "⚠️ They Did Not Utterly Drive Them Out",
  "Judges 1:31-36": "📍 The Hand Of The House Of Joseph Prevailed",
  "Judges 2:1-6": "⚖️ Their Gods Shall Be A Snare Unto You",
  "Judges 2:7-12": "🧠 There Arose Another Generation",
  "Judges 2:13-18": "🔥 The Anger Of The LORD Was Hot",
  "Judges 2:19-23": "🔁 They Returned And Corrupted Themselves",
  "Judges 3:1-6": "🧪 The LORD Left To Prove Israel",
  "Judges 3:7-12": "🛐 They Forgat The LORD Their God",
  "Judges 3:13-18": "👑 Eglon The King Of Moab",
  "Judges 3:19-24": "🗡️ I Have A Message From God Unto Thee",
  "Judges 3:25-30": "📯 Follow After Me",
  "Judges 3:31-31": "🐂 An Ox Goad",
};

const day63JudgesSectionTitles: Record<string, string> = {
  "Judges 4:1-6": "👩 Deborah Judges Israel",
  "Judges 4:7-12": "⚔️ The LORD Shall Sell Sisera",
  "Judges 4:13-18": "🏃 Is Not The LORD Gone Out Before Thee",
  "Judges 4:19-24": "✅ So God Subdued Jabin",
  "Judges 5:1-6": "🎵 Praise Ye The LORD",
  "Judges 5:7-12": "🚨 They Chose New Gods",
  "Judges 5:13-18": "🧠 Great Searchings Of Heart",
  "Judges 5:19-24": "⭐ The Stars In Their Courses Fought",
  "Judges 5:25-30": "🔨 She Put Her Hand To The Nail",
  "Judges 5:31-31": "☀️ Let Them That Love Him Be As The Sun",
  "Judges 6:1-6": "🌾 Midian Prevailed Against Israel",
  "Judges 6:7-12": "📣 The LORD Sent A Prophet",
  "Judges 6:13-18": "❓ If The LORD Be With Us",
  "Judges 6:19-24": "🕊️ The LORD Is Peace",
  "Judges 6:25-30": "🪓 Throw Down The Altar Of Baal",
  "Judges 6:31-36": "🗣️ Let Baal Plead For Himself",
  "Judges 6:37-40": "🧶 Let Not Thine Anger Be Hot",
  "Judges 7:1-6": "💧 Every One That Lappeth",
  "Judges 7:7-12": "🌙 Arise, Get Thee Down Unto The Host",
  "Judges 7:13-18": "🍞 Into His Hand Hath God Delivered Midian",
  "Judges 7:19-24": "📯 The Sword Of The LORD And Of Gideon",
  "Judges 7:25-25": "🪨 Oreb And Zeeb",
};

function explainDay62JudgesAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: [string, string] = [
    `The wording "${cleanTitle}" sits inside one step of Israel's early collapse in Judges.`,
    "The line should be read as part of the cycle of compromise, oppression, crying out, and rescue.",
  ];
  let lead = "⚔️ Judges 1-3 shows Israel drifting, suffering, and needing deliverers.";
  let support = ["⚠️ Compromise grows quickly", "🙏 The LORD remains the true rescuer", "🧠 The book is teaching Israel's pattern of failure"];

  if (section.chapter === 1) {
    lead = "⚔️ Judges 1 begins with conquest questions but keeps exposing incomplete obedience.";
    support = ["👣 Israel keeps moving into the land", "⚠️ Many enemies remain", "🧱 Compromise starts shaping the future"];
  } else if (section.chapter === 2) {
    lead = "🔥 Judges 2 explains the spiritual cycle that will control the whole book.";
    support = ["🛐 Israel keeps forsaking the LORD", "😭 Oppression drives them to cry out", "⚖️ God's mercy and discipline both appear"];
  } else if (section.chapter === 3) {
    lead = "🗡️ Judges 3 shows the first tests and first deliverers in the book.";
    support = ["🧪 The remaining nations test Israel", "🙏 The LORD raises rescuers", "⚔️ Othniel, Ehud, and Shamgar enter the story"];
  }

  if (/children of israel asked the lord saying/.test(lower)) {
    opening = ["Israel begins Judges by asking the LORD who should go first against the Canaanites.", "The line shows they still know they need God's direction at the start."];
  } else if (/of israel asked the lord saying who/.test(lower)) {
    opening = ["The question is about leadership in battle, not curiosity.", "Israel wants to know who should take the first step in finishing the conquest."];
  } else if (/israel asked the lord saying who shall/.test(lower)) {
    opening = ["Who shall go up means which tribe should lead the next attack.", "The line treats the remaining conquest as unfinished business."];
  } else if (/asked the lord saying who shall go/.test(lower)) {
    opening = ["Asking the LORD before going up shows that battle decisions are supposed to come under God's rule.", "Israel is at least starting in the right direction here."];
  } else if (/lord saying who shall go up for/.test(lower)) {
    opening = ["Go up for us means one tribe will lead on behalf of the others.", "The line reveals corporate dependence inside Israel's warfare."];
  } else if (/lord said judah shall go up behold/.test(lower)) {
    opening = ["Judah is chosen to go first in the continuing conquest.", "The line makes Judah the leading tribe in this new stage after Joshua."];
  } else if (/judah went up and the lord delivered/.test(lower)) {
    opening = ["Judah went up means the tribe acted on God's direction instead of merely hearing it.", "The LORD delivering the enemy shows success still depends on Him."];
  } else if (/adoni-bezek said threescore and ten kings/.test(lower)) {
    opening = ["Adoni-bezek is confessing his own cruel history after being captured.", "The line turns his suffering into a public acknowledgment of former brutality."];
  } else if (/said threescore and ten kings having their/.test(lower)) {
    opening = ["Seventy kings under his table shows how violently Adoni-bezek had treated other rulers.", "The image is meant to feel humiliating and harsh."];
  } else if (/threescore and ten kings having their thumbs/.test(lower)) {
    opening = ["The missing thumbs and great toes symbolize defeated strength and disabled rule.", "The line explains why those kings were reduced to helpless dependents."];
  } else if (/ten kings having their thumbs and their great/.test(lower)) {
    opening = ["Great toes mattered for standing and moving in battle, just as thumbs mattered for grasping.", "The line describes deliberate crippling, not a minor punishment."];
  } else if (/kings having their thumbs and their great/.test(lower)) {
    opening = ["Adoni-bezek's words expose a pattern of domination he once practiced on others.", "The line prepares for his conclusion that God has now repaid him."];
  } else if (/table as i have done so god/.test(lower)) {
    opening = ["Adoni-bezek recognizes that what happened to him matches what he had done to others.", "He interprets the reversal as requital from God."];
  } else if (/as i have done so god hath/.test(lower)) {
    opening = ["So God hath requited me means he sees his punishment as repayment.", "The line sounds like a rough confession of justice."];
  } else if (/he gave him achsah his daughter to wife/.test(lower)) {
    opening = ["Caleb gives Achsah in marriage as the reward for taking the city.", "The line joins conquest, family alliance, and inheritance."];
  } else if (/othniel the son of kenaz caleb s younger/.test(lower)) {
    opening = ["Othniel is identified as Caleb's younger relative to place him within a faithful family line.", "The line introduces a man who will matter again later in Judges."];
  } else if (/son of kenaz caleb s younger brother took/.test(lower)) {
    opening = ["Took it means Othniel captured Kirjath-sepher successfully.", "The line explains why he receives Achsah as promised."];
  } else if (/of kenaz caleb s younger brother took it/.test(lower)) {
    opening = ["The city falls because Othniel acts where the offer was set before him.", "The line turns Caleb's promise into a completed conquest."];
  } else if (/kenaz caleb s younger brother took it and/.test(lower)) {
    opening = ["The marriage follows directly after the capture, linking victory and household inheritance.", "The line keeps the story grounded in real family consequences."];
  } else if (/caleb s younger brother took it and he/.test(lower)) {
    opening = ["Othniel's success gives him both honor and place within Caleb's house.", "The line makes bravery materially consequential."];
  } else if (/she said unto him give me a blessing/.test(lower)) {
    opening = ["Achsah asks for a blessing because dry land without water would not sustain life well.", "Her request is practical, wise, and tied to inheritance."];
  } else if (/lord was with judah and he drave/.test(lower)) {
    opening = ["The LORD being with Judah explains why the tribe had real success in the hill country.", "The line keeps victory tied to God's presence rather than human strength alone."];
  } else if (/went up against bethel and the lord/.test(lower)) {
    opening = ["The house of Joseph attacks Bethel under the LORD's favor.", "The line shows another conquest move after Judah's opening battles."];
  } else if (/up against bethel and the lord was/.test(lower)) {
    opening = ["Bethel is not just a map point; it is another place Israel must take possession of.", "The LORD's presence is again named as the decisive help."];
  } else if (/against bethel and the lord was with/.test(lower)) {
    opening = ["The line keeps putting divine help at the center of military progress.", "Conquest succeeds where God is with His people."];
  } else if (/bethel and the lord was with them/.test(lower)) {
    opening = ["With them means the attacking tribe is not left to fight alone.", "The line credits the LORD for the outcome."];
  } else if (/city and we will shew thee mercy/.test(lower)) {
    opening = ["Shew thee mercy means the spies promise sparing to the man who reveals the city's entrance.", "The line mixes strategy with an offer of life."];
  } else if (/and the lord was with judah and/.test(lower)) {
    opening = ["Judah's gains are explained first by God's presence, not by Judah's own power.", "The line also prepares for the painful limit that follows in the valley."];
  } else if (/city with the edge of the sword/.test(lower)) {
    opening = ["With the edge of the sword means the city was taken by violent conquest.", "The line is blunt about the severity of ancient warfare."];
  } else if (/edge of the sword but they let/.test(lower)) {
    opening = ["The contrast matters: the city falls, but one man and his family are spared.", "The line highlights selective mercy inside a violent scene."];
  } else if (/of the sword but they let go/.test(lower)) {
    opening = ["Let go means the man who helped them was allowed to escape safely.", "The line explains how he survived when the city did not."];
  } else if (/sword but they let go the man/.test(lower)) {
    opening = ["The man's release comes because he cooperated with Israel's spies.", "The line ties mercy to the earlier promise made to him."];
  } else if (/with the edge of the sword but/.test(lower)) {
    opening = ["The phrase keeps conquest and mercy side by side in one sentence.", "A whole city is judged while one household is spared."];
  } else if (/the edge of the sword but they/.test(lower)) {
    opening = ["Israel's victory is complete enough to destroy the city, but not indiscriminate enough to kill the informant.", "The line preserves that distinction."];
  } else if (/the sword but they let go the/.test(lower)) {
    opening = ["The spared family becomes the exception inside the city's fall.", "The line makes good on Israel's earlier pledge of mercy."];
  } else if (/aijalon and in shaalbim yet the hand/.test(lower)) {
    opening = ["The place names show that Dan's struggle was not theoretical but geographical and local.", "The line prepares for Joseph's stronger hand in the region."];
  } else if (/in shaalbim yet the hand of the/.test(lower)) {
    opening = ["The hand of the house of Joseph means Joseph's family line eventually gained control there.", "The line describes pressure overcoming resistance."];
  } else if (/shaalbim yet the hand of the house/.test(lower)) {
    opening = ["House of Joseph here means the tribes descended from Joseph acting with strength.", "The line shows power increasing even where full obedience had been missing."];
  } else if (/yet the hand of the house of joseph/.test(lower)) {
    opening = ["Prevailed means Joseph's power pressed the Amorites down into forced labor.", "The line reveals domination without complete cleansing of the land."];
  } else if (/hand of the house of joseph prevailed/.test(lower)) {
    opening = ["Prevailed sounds strong, but the chapter still treats this as less than full obedience.", "The enemy is controlled, not removed."];
  } else if (/of the house of joseph prevailed so/.test(lower)) {
    opening = ["So that they became tributaries means the Canaanites stayed under forced service.", "The line names compromise where God had commanded fuller action."];
  } else if (/house of joseph prevailed so that they/.test(lower)) {
    opening = ["Forced tribute may look like victory, but Judges presents it as unfinished obedience.", "The enemy remains in the land under pressure rather than being driven out."];
  } else if (/their gods shall be a snare unto you/.test(lower)) {
    opening = ["A snare is a trap that catches someone before they fully realize the danger.", "God warns that the false gods left in the land will trap Israel spiritually."];
  } else if (/an angel of the lord came up/.test(lower)) {
    opening = ["The angel of the LORD comes as a covenant messenger bringing rebuke, not comfort first.", "His arrival turns the chapter from military history to spiritual diagnosis."];
  } else if (/angel of the lord came up from/.test(lower)) {
    opening = ["From Gilgal to Bochim links this rebuke to the place where Israel had once known covenant beginnings.", "The movement itself deepens the warning."];
  } else if (/of the lord came up from gilgal/.test(lower)) {
    opening = ["The messenger comes from a place associated with God's earlier faithfulness to a people now drifting.", "The line sharpens the contrast."];
  } else if (/lord came up from gilgal to bochim/.test(lower)) {
    opening = ["Bochim means weepers, and the place receives that name because the rebuke cuts deeply.", "The line sets the scene for sorrow after disobedience."];
  } else if (/said i will never break my covenant/.test(lower)) {
    opening = ["God begins by reminding Israel of His own covenant faithfulness.", "The rebuke lands harder because the LORD has not failed them first."];
  } else if (/i will never break my covenant with/.test(lower)) {
    opening = ["Never break my covenant means God's commitment has remained steady even while Israel has wavered.", "The line exposes the imbalance between divine faithfulness and human compromise."];
  } else if (/people served the lord all the days/.test(lower)) {
    opening = ["This line remembers a healthier season when Israel still served the LORD under Joshua's influence.", "It creates a contrast with the decline that follows."];
  } else if (/served the lord all the days of/.test(lower)) {
    opening = ["The days of Joshua mark a generation held together by living memory of God's works.", "The line measures faithfulness by that remembered experience."];
  } else if (/lord all the days of joshua and/.test(lower)) {
    opening = ["The elders outlived Joshua, and while they remained, covenant memory still held weight.", "The line shows leadership memory delaying collapse."];
  } else if (/all the great works of the lord/.test(lower)) {
    opening = ["The great works of the LORD are His mighty acts in rescue, conquest, and provision.", "The line ties obedience to remembered divine action."];
  } else if (/great works of the lord that he/.test(lower)) {
    opening = ["These leaders had seen what the LORD had done, not merely heard stories about it.", "That firsthand knowledge mattered spiritually."];
  } else if (/works of the lord that he did/.test(lower)) {
    opening = ["God's works are what made Israel's story different from the surrounding nations.", "The line implies that forgetting those works is dangerous."];
  } else if (/of the lord that he did for/.test(lower)) {
    opening = ["The line keeps the focus on what the LORD did for Israel rather than what Israel achieved for itself.", "Memory is being treated as a form of spiritual protection."];
  } else if (/yet they would not hearken unto their judges/.test(lower)) {
    opening = ["Hearken means listen with obedience, not merely hear the sound of words.", "The line says Israel resisted the very leaders God raised to help them."];
  } else if (/they forsook the lord and served baal/.test(lower)) {
    opening = ["Forsook the LORD means they abandoned covenant loyalty for false worship.", "Serving Baal shows that their problem was not weakness only but active idolatry."];
  } else if (/forsook the lord and served baal and/.test(lower)) {
    opening = ["Baal and Ashtaroth were Canaanite deities tied to fertility and local religion.", "The line names the specific idolatry replacing devotion to the LORD."];
  } else if (/anger of the lord was hot against/.test(lower)) {
    opening = ["Hot anger means God's wrath is burning against covenant betrayal.", "The line shows that idolatry is not treated as spiritually harmless."];
  } else if (/of the lord was hot against israel/.test(lower)) {
    opening = ["God's anger is directed at Israel because the covenant people have broken faith.", "The line turns the chapter from sin into judgment."];
  } else if (/lord was hot against israel and he/.test(lower)) {
    opening = ["The burning anger of the LORD moves toward action, not empty emotion.", "The line prepares for Israel to be handed over to oppressors."];
  } else if (/as the lord had sworn unto them/.test(lower)) {
    opening = ["As the LORD had sworn means the covenant warnings were always real, not decorative.", "Israel is now tasting the judgment long attached to disobedience."];
  } else if (/it came to pass when the judge/.test(lower)) {
    opening = ["The line marks the moment after a judge's death when the cycle starts sliding again.", "Temporary leaders cannot permanently heal Israel's heart."];
  } else if (/came to pass when the judge was/.test(lower)) {
    opening = ["When the judge was alive, restraint and deliverance held for a season.", "The line prepares for what happens when that restraint is gone."];
  } else if (/to pass when the judge was dead/.test(lower)) {
    opening = ["The judge's death exposes how short-lived Israel's reform really was.", "The line is painful because the people do not stay steady."];
  } else if (/pass when the judge was dead that/.test(lower)) {
    opening = ["That they returned means Israel went back to old corruption once the judge was gone.", "The line names relapse, not mere weakness."];
  } else if (/judge was dead that they returned and/.test(lower)) {
    opening = ["Returned means the people reverted to the sins they had seemed to leave behind.", "The line shows how deep the spiritual problem really was."];
  } else if (/than their fathers in following other gods/.test(lower)) {
    opening = ["Corrupted themselves more than their fathers means the decline is intensifying across generations.", "Following other gods is not static failure but worsening rebellion."];
  } else if (/their fathers in following other gods to/.test(lower)) {
    opening = ["The line shows the next generation outstripping the previous one in idolatry.", "Judges is tracing deepening corruption, not random slips."];
  } else if (/these are the nations which the lord/.test(lower)) {
    opening = ["The nations left in the land became a deliberate test for Israel.", "The line explains why complete conquest had not been finished."];
  } else if (/are the nations which the lord left/.test(lower)) {
    opening = ["Left does not mean God forgot them; it means He allowed them to remain for a purpose.", "That purpose was to test Israel's obedience."];
  } else if (/nations which the lord left to prove/.test(lower)) {
    opening = ["To prove Israel means to test whether the people would obey the LORD in a pressured setting.", "The line turns geography into spiritual examination."];
  } else if (/which the lord left to prove israel/.test(lower)) {
    opening = ["The remaining peoples are described as part of God's testing process.", "The line says Israel's heart will now be revealed by how it responds."];
  } else if (/lord left to prove israel by them/.test(lower)) {
    opening = ["By them means the nations themselves become the instrument of testing.", "The line makes clear that Israel's environment will expose its loyalty."];
  } else if (/namely five lords of the philistines and/.test(lower)) {
    opening = ["The five lords of the Philistines were the major Philistine rulers in the region.", "The line names the political powers involved in Israel's testing."];
  } else if (/five lords of the philistines and all/.test(lower)) {
    opening = ["Joshua's old enemies are now becoming Judges' ongoing pressure points.", "The line shows how many surrounding peoples remained in place."];
  } else if (/children of israel did evil in the/.test(lower)) {
    opening = ["Israel is now being described in the language of moral and covenant failure.", "The line begins another turn of the Judges cycle."];
  } else if (/of israel did evil in the sight/.test(lower)) {
    opening = ["In the sight means God Himself is the one evaluating Israel's conduct.", "The line says their evil is measured before the LORD, not by local opinion."];
  } else if (/israel did evil in the sight of/.test(lower)) {
    opening = ["The line states Israel's sin plainly before telling the consequences.", "Judges does not hide the spiritual cause behind the political trouble."];
  } else if (/did evil in the sight of the/.test(lower)) {
    opening = ["Did evil points to covenant rebellion, not to a passing mistake.", "The line names the root problem directly."];
  } else if (/evil in the sight of the lord/.test(lower)) {
    opening = ["Evil in the sight of the LORD means behavior God openly judges as wrong.", "The standard is divine, not merely social."];
  } else if (/in the sight of the lord and/.test(lower)) {
    opening = ["The line moves from God's verdict on their evil to the specific form that evil took.", "What follows will show forgetfulness and false worship."];
  } else if (/sight of the lord and forgat the/.test(lower)) {
    opening = ["Forgat the LORD means Israel stopped living as though His acts and claims mattered.", "The line describes spiritual amnesia with serious consequences."];
  } else if (/children of israel served eglon the king/.test(lower)) {
    opening = ["Served Eglon means Israel lived under Moabite domination, not willing service.", "The line measures the humiliation of their oppression."];
  } else if (/of israel served eglon the king of/.test(lower)) {
    opening = ["Eglon is named because the oppressor is now personal and political, not abstract.", "The line shows who held power over Israel."];
  } else if (/israel served eglon the king of moab/.test(lower)) {
    opening = ["Moabite rule has replaced Israelite freedom for a season.", "The line shows what covenant discipline looked like on the ground."];
  } else if (/served eglon the king of moab eighteen/.test(lower)) {
    opening = ["Eighteen years means this oppression lasted long enough to wear Israel down deeply.", "The line turns suffering into measured time."];
  } else if (/eglon the king of moab eighteen years/.test(lower)) {
    opening = ["The chapter wants the reader to feel the length as well as the reality of Moab's dominance.", "Eglon is not a brief nuisance but a prolonged oppressor."];
  } else if (/children of israel cried unto the lord/.test(lower)) {
    opening = ["Cried unto the LORD means distress has finally driven Israel back to God for help.", "The line marks the usual turning point toward rescue."];
  } else if (/of israel cried unto the lord the/.test(lower)) {
    opening = ["The cry is followed quickly by God's answer in the form of a deliverer.", "The line shows mercy interrupting oppression."];
  } else if (/a secret errand unto thee o king/.test(lower)) {
    opening = ["Ehud uses a secret errand as the way to get near Eglon privately.", "The line begins the deception that makes the rescue possible."];
  } else if (/secret errand unto thee o king who/.test(lower)) {
    opening = ["Ehud's secret errand sounds political, which is why the king listens.", "The line shows cunning at work before the blow is struck."];
  } else if (/errand unto thee o king who said/.test(lower)) {
    opening = ["Keep silence means Eglon dismisses the others so he can hear the message alone.", "The line opens the private space Ehud wanted."];
  } else if (/thee o king who said keep silence/.test(lower)) {
    opening = ["Eglon is confident enough to receive the message in private.", "That confidence becomes part of his vulnerability."];
  } else if (/o king who said keep silence and/.test(lower)) {
    opening = ["The king's command clears the room and heightens the danger of the moment.", "The line narrows the scene to a deadly private encounter."];
  } else if (/king who said keep silence and all/.test(lower)) {
    opening = ["All that stood by him go out, leaving the king exposed.", "The line explains why Ehud is able to act alone."];
  } else if (/said i have a message from god/.test(lower)) {
    opening = ["A message from God sounds like a solemn word, but here it is tied to judgment on Eglon.", "The line gives the scene its sharpest irony."];
  } else if (/opened them and behold their lord was/.test(lower)) {
    opening = ["The servants finally open the doors and discover their lord dead.", "The line reveals the success of Ehud's hidden strike."];
  } else if (/them and behold their lord was fallen/.test(lower)) {
    opening = ["Fallen down dead means Eglon's rule ends suddenly and publicly.", "The line confirms that the rescue plan has worked."];
  } else if (/behold their lord was fallen down dead/.test(lower)) {
    opening = ["The discovery scene turns rumor into certainty for the servants.", "Their master is no longer merely delayed; he is dead."];
  } else if (/their lord was fallen down dead on/.test(lower)) {
    opening = ["The body on the floor is the visible proof that Moab's king has been struck down.", "The line makes the reversal unmistakable."];
  } else if (/lord was fallen down dead on the/.test(lower)) {
    opening = ["The lord of the servants is now a lifeless body, not an untouchable ruler.", "The line dramatizes the fall of oppressive power."];
  } else if (/them follow after me for the lord/.test(lower)) {
    opening = ["Ehud calls Israel to follow because the time for open action has arrived.", "He turns a secret act into public deliverance."];
  } else if (/follow after me for the lord hath/.test(lower)) {
    opening = ["For the LORD hath delivered means Ehud interprets the coming victory as God's work.", "The line keeps the rescue from becoming mere human daring."];
  } else if (/of anath which slew of the philistines/.test(lower)) {
    opening = ["Shamgar is briefly introduced by his family connection and his blow against the Philistines.", "Even this short line adds another deliverer to the pattern of mercy."];
  } else if (/anath which slew of the philistines six/.test(lower)) {
    opening = ["The six hundred Philistines show the scale of Shamgar's victory in a single sentence.", "The line is short, but the deliverance is not small."];
  } else if (/which slew of the philistines six hundred/.test(lower)) {
    opening = ["Slew here means Shamgar struck down a large Philistine force with an unlikely tool.", "The line compresses a major rescue into a very brief report."];
  } else if (/slew of the philistines six hundred men/.test(lower)) {
    opening = ["The number six hundred makes the victory feel intentionally memorable.", "The line wants the reader to feel both the scale and the surprise."];
  } else if (/of the philistines six hundred men with/.test(lower)) {
    opening = ["The victory is not attributed to elite weaponry or royal resources.", "The line is preparing for the strange tool that follows."];
  } else if (/philisti(nes)? six hundred men with an ox/.test(lower)) {
    opening = ["An ox goad was a farm tool used to drive cattle, not a normal battlefield weapon.", "The line highlights how unexpected Shamgar's deliverance was."];
  } else if (/an ox goad and he also delivered/.test(lower)) {
    opening = ["The ox goad becomes the sign that God can rescue through humble means.", "Shamgar also delivered Israel, even though his story is told in one verse."];
  }

  return note([opening[0], opening[1], lead, ...support]);
}

function explainDay63JudgesAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();
  let opening: [string, string] = [
    `The wording "${cleanTitle}" sits inside one of the key deliverance stories in Judges 4-7.`,
    "The line should be read as part of God's rescue of Israel through Deborah, Barak, Jael, and Gideon.",
  ];
  let lead = "⚔️ Judges 4-7 moves from Deborah's victory into Gideon's calling and Midian's defeat.";
  let support = ["🙏 The LORD remains the true deliverer", "⚠️ Israel still drifts quickly", "🧠 These chapters teach courage, weakness, and divine rescue"];

  if (section.chapter === 4) {
    lead = "👩 Judges 4 tells the story of Deborah, Barak, Sisera, and Jael.";
    support = ["⚖️ Deborah leads Israel wisely", "⚔️ The LORD fights against Sisera", "🏕️ Jael becomes the surprising finisher of the victory"];
  } else if (section.chapter === 5) {
    lead = "🎵 Judges 5 turns the victory over Sisera into a song of praise and memory.";
    support = ["🎶 The song celebrates the LORD's action", "🧠 Tribes are remembered for courage or hesitation", "⚖️ The victory is interpreted spiritually, not just militarily"];
  } else if (section.chapter === 6) {
    lead = "🌾 Judges 6 introduces Gideon in a time of Midianite oppression.";
    support = ["😭 Israel is impoverished and afraid", "📣 The LORD confronts fear and idolatry", "🕊️ Gideon is called even in weakness"];
  } else if (section.chapter === 7) {
    lead = "📯 Judges 7 shows the LORD shrinking Gideon's army before giving victory.";
    support = ["💧 The army is tested", "🌙 Fear is answered by God's reassurance", "⚔️ Midian falls because the LORD acts"];
  }

  if (/children of israel again did evil in/.test(lower)) {
    opening = ["Again did evil means Israel has fallen back into the same cycle after Ehud's death.", "The line opens Deborah's story with another return to covenant failure."];
  } else if (/of israel again did evil in the/.test(lower)) {
    opening = ["The wording keeps pressing that Israel's sin is repeated, not accidental.", "The new crisis grows out of familiar rebellion."];
  } else if (/israel again did evil in the sight/.test(lower)) {
    opening = ["In the sight means the LORD Himself is the one judging Israel's conduct.", "The line says the problem is spiritual before it becomes political."];
  } else if (/again did evil in the sight of/.test(lower)) {
    opening = ["Again marks a returning pattern of sin rather than a fresh surprise.", "The line prepares for oppression to follow rebellion."];
  } else if (/did evil in the sight of the/.test(lower) && section.chapter === 4) {
    opening = ["Did evil points to covenant rebellion, not to a small mistake.", "The line identifies the root cause of the coming oppression under Jabin."];
  } else if (/evil in the sight of the lord/.test(lower) && section.chapter === 4) {
    opening = ["Evil in the sight of the LORD means behavior God openly judges as wrong.", "The standard of judgment is divine, not public opinion."];
  } else if (/in the sight of the lord when/.test(lower)) {
    opening = ["Ehud's death matters because one deliverer's death exposed how unstable Israel still was.", "The line links the return of sin to the passing of leadership."];
  } else if (/be for thine honour for the lord/.test(lower)) {
    opening = ["Deborah tells Barak the final honor will not belong to him alone.", "The line introduces the surprising role a woman will play in Sisera's downfall."];
  } else if (/for thine honour for the lord shall/.test(lower)) {
    opening = ["Honour here means the credit for killing Sisera in the decisive moment.", "Barak will fight, but the glory of the finish will go elsewhere."];
  } else if (/thine honour for the lord shall sell/.test(lower)) {
    opening = ["Sell Sisera into the hand of a woman means the LORD will hand him over to female agency.", "The wording turns victory into a divine reversal of expectations."];
  } else if (/honour for the lord shall sell sisera/.test(lower)) {
    opening = ["Sisera is the enemy commander, and the LORD is announcing his humiliation in advance.", "The line makes the coming outcome sound certain before battle begins."];
  } else if (/for the lord shall sell sisera into/.test(lower)) {
    opening = ["Sell into a hand means deliver over into someone else's power.", "The line says Sisera's fate is already under God's control."];
  } else if (/lord shall sell sisera into the hand/.test(lower)) {
    opening = ["The LORD is named as the true actor behind Sisera's fall.", "The victory will be God's gift before it is Israel's achievement."];
  } else if (/the lord shall sell sisera into the/.test(lower)) {
    opening = ["Deborah speaks as though Sisera's defeat is already settled because the LORD has declared it.", "The line gives Barak a promise strong enough to act on."];
  } else if (/is the day in which the lord/.test(lower)) {
    opening = ["This is the day means Deborah is declaring that the decisive moment has arrived.", "The line turns waiting into action."];
  } else if (/day in which the lord hath delivered/.test(lower)) {
    opening = ["Delivered Sisera into thine hand means Barak should fight with confidence because God has already committed to the result.", "The line treats victory as promised before it is visible."];
  } else if (/in which the lord hath delivered sisera/.test(lower)) {
    opening = ["Sisera is named so Barak knows exactly which enemy God is overthrowing.", "The line narrows the promise to the commander at the center of the threat."];
  } else if (/which the lord hath delivered sisera into/.test(lower)) {
    opening = ["The line keeps stressing that Sisera's fall comes through the LORD's action first.", "Israel is stepping into a victory God has already spoken."];
  } else if (/lord hath delivered sisera into thine hand/.test(lower)) {
    opening = ["Into thine hand means into Barak's power to defeat.", "The wording joins divine promise and human obedience in one moment."];
  } else if (/into thine hand is not the lord/.test(lower)) {
    opening = ["Deborah immediately points Barak back to God's leadership rather than to his own courage.", "The line says the LORD has already gone ahead of him."];
  } else if (/thine hand is not the lord gone/.test(lower)) {
    opening = ["Gone out before thee means the LORD leads the battle before Barak even charges.", "The wording makes divine presence the real source of courage."];
  } else if (/so god subdued on that day jabin/.test(lower)) {
    opening = ["Subdued means God pressed Jabin's power down and broke it.", "The line summarizes the victory as divine action on a specific day."];
  } else if (/god subdued on that day jabin the/.test(lower)) {
    opening = ["Jabin's fall is credited to God, not only to Israel's battlefield effort.", "The line closes the chapter by naming the true conqueror."];
  } else if (/subdued on that day jabin the king/.test(lower)) {
    opening = ["The king himself is named so the chapter ends with the ruler's power broken.", "The line makes the victory political as well as military."];
  } else if (/on that day jabin the king of/.test(lower)) {
    opening = ["On that day gives the victory a fixed historical moment in Israel's memory.", "The line treats the deliverance as a real event, not a legend."];
  } else if (/day jabin the king of canaan before/.test(lower)) {
    opening = ["Before the children of Israel means Jabin was brought down in relation to the people he had oppressed.", "The line reverses the old power arrangement."];
  } else if (/jabin the king of canaan before the/.test(lower)) {
    opening = ["Jabin had ruled over Israel's distress, but now he is named as the one subdued.", "The wording underlines reversal."];
  } else if (/king of canaan before the children of/.test(lower)) {
    opening = ["The king of Canaan is no longer looming above Israel but falling before them.", "The line shows how completely the balance has shifted."];
  } else if (/praise ye the lord for the avenging/.test(lower)) {
    opening = ["Praise ye the LORD means the song begins by giving God credit for the victory.", "Avenging here means the LORD answered oppression with justice."];
  } else if (/ye the lord for the avenging of/.test(lower)) {
    opening = ["The song wants the people to bless God for acting on Israel's behalf.", "The victory is interpreted as divine intervention, not mere good fortune."];
  } else if (/lord for the avenging of israel when/.test(lower)) {
    opening = ["Avenging of Israel means God stepped in where His people had been crushed.", "The line frames the whole song as praise for rescue."];
  } else if (/hear o ye kings give ear o/.test(lower)) {
    opening = ["Deborah addresses kings and princes because the song announces the LORD's victory beyond Israel alone.", "The line widens the audience to the rulers of the nations."];
  } else if (/o ye kings give ear o ye/.test(lower)) {
    opening = ["Give ear means listen carefully to what the LORD has done.", "The line turns the song into a public proclamation."];
  } else if (/ye kings give ear o ye princes/.test(lower)) {
    opening = ["Princes are summoned because the victory over Sisera says something about all human power.", "The line lifts the song above local celebration."];
  } else if (/kings give ear o ye princes i/.test(lower)) {
    opening = ["Deborah herself promises to sing because the right response to God's rescue is praise.", "The line makes worship the natural answer to victory."];
  } else if (/they chose new gods then was war/.test(lower)) {
    opening = ["Chose new gods means Israel embraced fresh idols instead of remaining faithful to the LORD.", "Then was war in the gates shows idolatry bringing social collapse and danger."];
  } else if (/chose new gods then was war in/.test(lower)) {
    opening = ["The line links false worship directly to public crisis.", "Israel's spiritual choices have military consequences."];
  } else if (/new gods then was war in the/.test(lower)) {
    opening = ["War in the gates means danger reached the ordinary entry points of city life.", "The line says idolatry brought insecurity right to the threshold."];
  } else if (/gods then was war in the gates/.test(lower)) {
    opening = ["The gates were places of order, trade, and justice, so war there means social breakdown.", "The line shows how far the trouble had spread."];
  } else if (/my heart is toward the governors of/.test(lower)) {
    opening = ["Deborah praises the governors who willingly stepped forward for the battle.", "The line honors leadership that answered the crisis with courage."];
  } else if (/heart is toward the governors of israel/.test(lower)) {
    opening = ["Her heart is toward them means she warmly approves their readiness to serve.", "The line celebrates willing leadership, not forced duty."];
  } else if (/among the people bless ye the lord/.test(lower)) {
    opening = ["Bless ye the LORD means give God open praise among the people.", "The song keeps redirecting honor away from humans and toward the LORD."];
  } else if (/nobles among the people the lord made/.test(lower)) {
    opening = ["Deborah says the LORD gave her dominion over the mighty by His own action.", "The line keeps female leadership under divine appointment, not personal ambition."];
  } else if (/among the people the lord made me/.test(lower)) {
    opening = ["Made me have dominion means God empowered Deborah for this season of leadership.", "The line explains her authority as given, not self-created."];
  } else if (/people the lord made me have dominion/.test(lower)) {
    opening = ["The song gives the LORD credit for Deborah's role among the strong.", "The line frames leadership as divine enabling."];
  } else if (/lord made me have dominion over the/.test(lower)) {
    opening = ["Deborah is not claiming personal greatness apart from God.", "She is confessing that the LORD put her where she stood."];
  } else if (/reuben there were great thoughts of heart/.test(lower)) {
    opening = ["Great thoughts of heart means Reuben had much inner deliberation but little action.", "The song gently exposes hesitation."];
  } else if (/reuben there were great searchings of heart/.test(lower)) {
    opening = ["Great searchings of heart means Reuben wrestled inwardly instead of joining decisively.", "The line turns indecision into part of the moral memory of the battle."];
  } else if (/the nobles among the people the lord/.test(lower)) {
    opening = ["The line returns to praising the LORD for raising willing leaders.", "Deborah's song keeps weaving honor to God through the tribal memories."];
  } else if (/kings came and fought then fought the/.test(lower)) {
    opening = ["The song restates the battle to show how serious the threat really was.", "Kings came and fought means organized royal power gathered against Israel."];
  } else if (/came and fought then fought the kings/.test(lower)) {
    opening = ["The repetition of fought intensifies the sense of real conflict.", "The line is not decorative poetry; it is battle remembered in song."];
  } else if (/fought then fought the kings of canaan/.test(lower)) {
    opening = ["The kings of Canaan are named to show the victory was over actual rulers, not nameless trouble.", "The line preserves the event historically."];
  } else if (/fought the kings of canaan in taanach/.test(lower)) {
    opening = ["Taanach by the waters of Megiddo locates the battle on real ground.", "The song keeps geography tied to memory."];
  } else if (/kings of canaan in taanach by the/.test(lower)) {
    opening = ["The place names root the victory in a known region rather than in vague heroic language.", "The line lets the reader picture where God acted."];
  } else if (/meroz said the angel of the lord/.test(lower)) {
    opening = ["Meroz is cursed because it failed to come to the LORD's help in the battle.", "The line warns that neutrality in a holy crisis can be guilt."];
  } else if (/said the angel of the lord curse/.test(lower)) {
    opening = ["Curse ye Meroz means a severe judgment is being pronounced over refusal to help.", "The line makes passivity morally serious."];
  } else if (/she brought forth butter in a lordly/.test(lower)) {
    opening = ["Jael offers rich hospitality to Sisera so he lowers his guard.", "Butter in a lordly dish suggests an honoring welcome before the sudden reversal."];
  } else if (/brought forth butter in a lordly dish/.test(lower)) {
    opening = ["The rich serving deepens the contrast between Sisera's comfort and his coming death.", "The line slows the scene before the strike."];
  } else if (/her right hand to the workmen s hammer/.test(lower)) {
    opening = ["Jael's right hand taking the hammer means she becomes the active instrument of Sisera's fall.", "The line turns an ordinary household tool into a weapon of judgment."];
  } else if (/right hand to the workmen s hammer and/.test(lower)) {
    opening = ["The song remembers Jael's hands because her courage mattered in the decisive moment.", "The line gives detail to the act that fulfilled Deborah's word."];
  } else if (/hand to the workmen s hammer and with/.test(lower)) {
    opening = ["The hammer is a tent-working tool, which makes the victory even more surprising.", "The line highlights unlikely means in God's deliverance."];
  } else if (/cried through the lattice why is his chariot/.test(lower)) {
    opening = ["Sisera's mother waits at the window, expecting triumph, not defeat.", "The line turns the song toward bitter irony."];
  } else if (/she put her hand to the nail/.test(lower)) {
    opening = ["The nail is the tent peg Jael uses to kill Sisera.", "The line remembers the exact act that brought the enemy commander down."];
  } else if (/let all thine enemies perish o lord/.test(lower)) {
    opening = ["Deborah ends the song by asking that all God's enemies fall the way Sisera did.", "The line turns one victory into a prayer for God's wider justice."];
  } else if (/all thine enemies perish o lord but/.test(lower)) {
    opening = ["The contrast begins here: enemies perish, but lovers of the LORD shine.", "The line divides humanity by relation to God."];
  } else if (/thine enemies perish o lord but let/.test(lower)) {
    opening = ["The song moves from curse to blessing in one final comparison.", "Those who resist God and those who love Him end very differently."];
  } else if (/enemies perish o lord but let them/.test(lower)) {
    opening = ["Perish here means collapse under divine judgment, not merely lose a battle.", "The line gives the song a moral ending."];
  } else if (/perish o lord but let them that/.test(lower)) {
    opening = ["Those that love the LORD are set against His enemies in this closing blessing.", "The line points to a life shaped by loyalty."];
  } else if (/o lord but let them that love/.test(lower)) {
    opening = ["Love here means covenant affection and loyalty toward God.", "The line blesses those who cling to Him."];
  } else if (/lord but let them that love him/.test(lower)) {
    opening = ["Be as the sun means shine in strength, beauty, and rising power.", "The line closes the song with brightness after conflict."];
  } else if (/children of israel did evil in the/.test(lower) && section.chapter === 6) {
    opening = ["Judges 6 opens by saying Israel has again fallen into covenant evil.", "The Midianite oppression grows directly out of that rebellion."];
  } else if (/of israel did evil in the sight/.test(lower) && section.chapter === 6) {
    opening = ["In the sight means the LORD Himself is naming Israel's guilt.", "The problem is spiritual before it becomes agricultural and military."];
  } else if (/israel did evil in the sight of/.test(lower) && section.chapter === 6) {
    opening = ["The line states Israel's sin plainly before telling what Midian did to them.", "Judges wants the reader to see cause before consequence."];
  } else if (/did evil in the sight of the/.test(lower) && section.chapter === 6) {
    opening = ["Did evil here points to covenant rebellion rather than mere weakness.", "The phrase sets up the discipline that follows."];
  } else if (/evil in the sight of the lord/.test(lower) && section.chapter === 6) {
    opening = ["Evil in the sight of the LORD means behavior judged wrong by God Himself.", "The line places Midian's oppression under divine discipline."];
  } else if (/in the sight of the lord and the lord/.test(lower)) {
    opening = ["The line moves straight from Israel's evil to God's response.", "The oppressor arrives as part of covenant discipline."];
  } else if (/sight of the lord and the lord/.test(lower)) {
    opening = ["The same LORD who once delivered Israel is now handing them over for correction.", "The line makes discipline deeply personal."];
  } else if (/children of israel cried unto the lord/.test(lower) && section.chapter === 6) {
    opening = ["Israel finally cries out because Midian's oppression has become unbearable.", "The line marks the turn from suffering toward divine response."];
  } else if (/of israel cried unto the lord because/.test(lower)) {
    opening = ["Because of the Midianites means the people are driven to prayer by prolonged misery.", "The line shows affliction pushing them back toward God."];
  } else if (/israel cried unto the lord because of/.test(lower)) {
    opening = ["The cry is connected directly to Midian's crushing pressure on the land.", "The line is a distress signal more than a mature reform."];
  } else if (/cried unto the lord because of the/.test(lower)) {
    opening = ["The wording slows the cry long enough for the reader to feel the burden behind it.", "Israel is not praying from comfort."];
  } else if (/lord sent a prophet unto the children/.test(lower)) {
    opening = ["Before Gideon is raised, God first sends a prophet to explain the reason for Israel's trouble.", "The line says deliverance must be preceded by truth."];
  } else if (/said unto them thus saith the lord/.test(lower)) {
    opening = ["Thus saith the LORD means the prophet is delivering God's own accusation and reminder.", "The line gives divine interpretation of the crisis."];
  } else if (/them thus saith the lord god of/.test(lower)) {
    opening = ["The LORD God of Israel is the covenant name attached to the rebuke.", "The line reminds the people who brought them up from Egypt."];
  } else if (/gideon said unto him oh my lord/.test(lower)) {
    opening = ["Gideon begins with honest confusion and pain rather than quick confidence.", "The line lets the reader hear how oppression has shaken his faith."];
  } else if (/said unto him oh my lord if/.test(lower)) {
    opening = ["If the LORD be with us is Gideon's question about the gap between Israel's stories and Israel's present suffering.", "He is asking how divine presence fits their misery."];
  } else if (/him oh my lord if the lord/.test(lower)) {
    opening = ["Gideon addresses the messenger respectfully but still speaks his doubt aloud.", "The line is reverent and troubled at the same time."];
  } else if (/oh my lord if the lord be/.test(lower)) {
    opening = ["If the LORD be with us asks why His presence feels absent in practice.", "Gideon is voicing a natural question from inside affliction."];
  } else if (/my lord if the lord be with us/.test(lower)) {
    opening = ["Gideon measures the present against the old stories of exodus rescue.", "The line shows how suffering can make remembered faith feel difficult."];
  } else if (/my lord if the lord be with/.test(lower)) {
    opening = ["Gideon keeps pressing the same question because Midian's oppression feels hard to reconcile with God's nearness.", "The line lets his doubt stay personal and direct."];
  } else if (/lord if the lord be with us why/.test(lower)) {
    opening = ["Why then is all this befallen us is the hidden ache inside Gideon's question.", "The line brings lament into the calling scene."];
  } else if (/lord if the lord be with us/.test(lower)) {
    opening = ["The repeated LORD language shows Gideon struggling to connect God's name with Israel's present misery.", "He is trying to understand how divine presence fits the pain around him."];
  } else if (/if the lord be with us why/.test(lower)) {
    opening = ["Gideon is not denying God's existence; he is struggling with God's seeming absence.", "The line is a complaint born of pain."];
  } else if (/gideon built an altar there unto the lord/.test(lower)) {
    opening = ["Gideon builds an altar because fear has turned into worship after God's reassurance.", "The line marks one of the clearest peace moments in his call."];
  } else if (/angel of god said unto him take/.test(lower)) {
    opening = ["The angel tells Gideon exactly how to present the meal he has brought.", "The line shows the offering being drawn into a holy sign."];
  } else if (/of god said unto him take the/.test(lower)) {
    opening = ["The command over the flesh and broth prepares for a miraculous confirmation.", "The line keeps the focus on obedience to the messenger."];
  } else if (/god said unto him take the flesh/.test(lower)) {
    opening = ["Gideon is being guided step by step because the sign will teach him who is speaking.", "The line turns a meal into an altar-like moment."];
  } else if (/angel of the lord put forth the/.test(lower)) {
    opening = ["The angel touching the offering shows supernatural acceptance and power.", "The line reveals that this is no ordinary visitor."];
  } else if (/of the lord put forth the end/.test(lower)) {
    opening = ["The end of the staff becomes the point of contact for the sign.", "The line slows the miracle into one vivid gesture."];
  } else if (/lord put forth the end of the/.test(lower)) {
    opening = ["Fire from the rock confirms the holiness of the encounter.", "The line gives Gideon visible proof."];
  } else if (/lord said unto him take thy father s/.test(lower)) {
    opening = ["God tells Gideon to begin reform at home by tearing down his father's Baal altar.", "The line makes obedience costly and personal."];
  } else if (/did as the lord had said unto him/.test(lower)) {
    opening = ["Gideon obeys, though fear shapes the timing of that obedience.", "The line shows imperfect courage still moving in the right direction."];
  } else if (/pass the same night that the lord/.test(lower) && section.reference === "Judges 6:25-30") {
    opening = ["That same night means Gideon receives the command with urgency and no long delay.", "The line pushes immediate obedience against household idolatry."];
  } else if (/same night that the lord said unto/.test(lower) && section.reference === "Judges 6:25-30") {
    opening = ["The night setting underscores both fear and urgency in Gideon's obedience.", "The work must begin before the next day exposes it."];
  } else if (/night that the lord said unto him/.test(lower) && section.reference === "Judges 6:25-30") {
    opening = ["The LORD's command comes into Gideon's darkness before daylight public action.", "The line links divine instruction to hidden courage."];
  } else if (/build an altar unto the lord thy/.test(lower)) {
    opening = ["The old pagan altar must be replaced by a true altar to the LORD.", "The line turns destruction into redirected worship."];
  } else if (/an altar unto the lord thy god/.test(lower)) {
    opening = ["The LORD thy God is named to contrast Him directly with Baal.", "The line makes the issue one of exclusive worship."];
  } else if (/yet morning if he be a god/.test(lower)) {
    opening = ["Joash's answer exposes Baal's emptiness by challenging him to defend himself.", "The line mocks an idol that needs human rescue."];
  } else if (/morning if he be a god let/.test(lower)) {
    opening = ["If he be a god means let Baal prove his own reality by acting.", "The line undercuts false religion with sharp logic."];
  } else if (/if he be a god let him/.test(lower)) {
    opening = ["Let him plead for himself means Baal should handle his own case if he is truly divine.", "The line shows the absurdity of protecting an idol."];
  } else if (/he be a god let him plead/.test(lower)) {
    opening = ["Plead for himself means defend his own altar without human help.", "The line exposes false gods as powerless objects."];
  } else if (/be a god let him plead for/.test(lower)) {
    opening = ["Joash turns the accusation back onto Baal's supposed power.", "The line starts to free Gideon from immediate blame."];
  } else if (/a god let him plead for himself/.test(lower)) {
    opening = ["Jerubbaal comes from this challenge, because Baal is invited to contend if he can.", "The line turns ridicule into naming."];
  } else if (/god let him plead for himself because/.test(lower)) {
    opening = ["Because one hath cast down his altar gives the specific reason for the challenge.", "The line shows how thin Baal's honor really is."];
  } else if (/gideon said unto god let not thine/.test(lower)) {
    opening = ["Gideon asks for patience because he is about to request another sign.", "The line shows a faith still mixed with fear."];
  } else if (/said unto god let not thine anger/.test(lower)) {
    opening = ["Let not thine anger be hot means Gideon knows repeated testing could offend God.", "The line is cautious and pleading."];
  } else if (/god let not thine anger be hot/.test(lower)) {
    opening = ["Hot anger is what Gideon fears provoking by asking again.", "The line reveals his nervousness before God."];
  } else if (/god did so that night for it/.test(lower)) {
    opening = ["God answers Gideon's fleece request exactly, even in his weakness.", "The line shows divine patience with a fearful servant."];
  } else if (/and gideon said unto god let not/.test(lower)) {
    opening = ["Gideon repeats his request carefully because he still needs reassurance.", "The line slows the moment into fragile dependence."];
  } else if (/unto god let not thine anger be/.test(lower)) {
    opening = ["Gideon speaks as someone aware that he is pressing God's patience.", "The line makes the second sign request humble, not proud."];
  } else if (/and god did so that night for/.test(lower)) {
    opening = ["The repeated answer shows that God is willing to strengthen Gideon's weak faith.", "The line highlights mercy as much as miracle."];
  } else if (/lord said unto gideon the people that/.test(lower)) {
    opening = ["God begins reducing Gideon's army because too many soldiers would tempt Israel to boast.", "The line opens the lesson that victory will not come from numbers."];
  } else if (/lord said unto gideon the people are/.test(lower)) {
    opening = ["Too many means the army is too large for God's purpose, not too small for battle.", "The line overturns ordinary military logic."];
  } else if (/people unto the water and the lord/.test(lower)) {
    opening = ["The water test separates the men in a way that makes no human strategic sense on its own.", "The line prepares for God to choose by an unexpected sign."];
  } else if (/water and the lord said unto gideon/.test(lower)) {
    opening = ["The LORD is the one interpreting the water behavior and assigning the outcome.", "The test comes from God's selection, not Gideon's instincts."];
  } else if (/lord said unto gideon every one that/.test(lower)) {
    opening = ["Every one that lappeth is being marked out for a special purpose in God's plan.", "The line turns a small physical act into a sorting sign."];
  } else if (/and the lord said unto gideon the/.test(lower)) {
    opening = ["The line keeps the decision in God's mouth rather than Gideon's.", "The army will be shaped by divine instruction."];
  } else if (/the lord said unto gideon the people/.test(lower)) {
    opening = ["God keeps narrowing the force so the coming victory will clearly belong to Him.", "The line deepens the lesson against self-congratulation."];
  } else if (/lord said unto gideon by the three/.test(lower)) {
    opening = ["By the three hundred means God will save through the tiny group that remains.", "The line makes the point of the reduction unmistakable."];
  } else if (/pass the same night that the lord/.test(lower) && section.reference === "Judges 7:7-12") {
    opening = ["That same night means God moves Gideon toward action without delay after choosing the three hundred.", "The line shows reassurance arriving right at the edge of battle."];
  } else if (/same night that the lord said unto/.test(lower) && section.reference === "Judges 7:7-12") {
    opening = ["The night command sends Gideon down toward the Midianite camp when fear would naturally be strongest.", "The timing itself is part of God's way of strengthening him."];
  } else if (/night that the lord said unto him/.test(lower) && section.reference === "Judges 7:7-12") {
    opening = ["The LORD speaks into the dark before Gideon faces the enemy host below.", "The line ties courage to divine word."];
  } else if (/lord said unto him arise get thee/.test(lower)) {
    opening = ["Arise, get thee down means Gideon must move toward the danger instead of away from it.", "The command turns reassurance into action."];
  } else if (/and the lord said unto gideon by/.test(lower)) {
    opening = ["The LORD keeps repeating His word so Gideon knows the plan rests on divine certainty.", "The line reinforces that the three hundred are enough because God is enough."];
  } else if (/the lord said unto gideon by the/.test(lower)) {
    opening = ["The phrase ties victory to God's chosen number rather than to Israel's military confidence.", "The smallness of the army is part of the point."];
  } else if (/into his hand hath god delivered midian/.test(lower)) {
    opening = ["The Midianite dream is interpreted as proof that God has already handed Midian over.", "The line gives Gideon courage from the enemy's own camp."];
  } else if (/israel for into his hand hath god/.test(lower)) {
    opening = ["The dream is understood as God's decision to save Israel through Gideon.", "The line turns overheard fear into confirmation."];
  } else if (/for into his hand hath god delivered/.test(lower)) {
    opening = ["Into his hand means into Gideon's power to strike successfully.", "The line again places victory under God's determination."];
  } else if (/his hand hath god delivered midian and/.test(lower)) {
    opening = ["Midian and all the host are included so the promise covers the whole enemy force.", "The line makes the coming victory sound sweeping."];
  } else if (/hand hath god delivered midian and all/.test(lower)) {
    opening = ["The line grows from one commander to the entire camp to widen Gideon's courage.", "No part of Midian's host lies outside God's control."];
  } else if (/hath god delivered midian and all the/.test(lower)) {
    opening = ["Delivered here means handed over under divine judgment.", "The line turns the dream into a battlefield promise."];
  } else if (/god delivered midian and all the host/.test(lower)) {
    opening = ["All the host means the whole opposing camp, not only a few leaders.", "The line leaves Gideon with a broad assurance before the attack."];
  } else if (/trumpets and the lord set every man s/.test(lower)) {
    opening = ["The trumpets do not win the battle by themselves; the LORD creates the confusion that breaks Midian.", "The line joins human obedience with divine intervention."];
  } else if (/lord set every man s sword against his/.test(lower)) {
    opening = ["Every man's sword against his fellow means the Midianites turn on one another in panic.", "The line describes God-made chaos inside the enemy camp."];
  } else if (/they cried the sword of the lord/.test(lower)) {
    opening = ["The battle cry names the LORD first because the victory is understood to be His.", "Gideon's name comes second under God's rule."];
  } else if (/cried the sword of the lord and/.test(lower)) {
    opening = ["The shout is meant to fill the darkness with fear and declare divine attack.", "The line turns sound into psychological warfare."];
  } else if (/sword of the lord and of gideon/.test(lower)) {
    opening = ["The phrase puts Gideon under the LORD rather than beside Him as an equal.", "It is God's sword first, Gideon's leadership second."];
  } else if (/hundred blew the trumpets and the lord/.test(lower)) {
    opening = ["The three hundred act in unison, but the LORD is the one who makes their action decisive.", "The line keeps the miracle behind the tactic."];
  } else if (/blew the trumpets and the lord set/.test(lower)) {
    opening = ["The trumpet blast is the human trigger, but the LORD's intervention is the real turning point.", "The line keeps credit where it belongs."];
  } else if (/they took two princes of the midianites oreb/.test(lower)) {
    opening = ["Oreb and Zeeb are named because the victory reaches leadership level in the Midianite camp.", "The line records the capture of real enemy rulers."];
  } else if (/zeeb they slew at the winepress of zeeb/.test(lower)) {
    opening = ["The winepress of Zeeb becomes a memorial place because that prince died there.", "The line ties judgment to geography in a memorable way."];
  } else if (/zeeb to gideon on the other side jordan/.test(lower)) {
    opening = ["Bringing the heads to Gideon shows the victory being gathered and reported back to the leader.", "The line keeps the pursuit connected across the Jordan."];
  } else if (/they slew oreb upon the rock oreb/.test(lower)) {
    opening = ["The rock receives Oreb's name because his death marked the place permanently.", "The line turns the battlefield into memory."];
  } else if (/two princes of the midianites oreb and/.test(lower)) {
    opening = ["Two princes means Midian loses important commanders, not only ordinary soldiers.", "The line shows the depth of the defeat."];
  } else if (/princes of the midianites oreb and zeeb/.test(lower)) {
    opening = ["Oreb and Zeeb stand as named symbols of Midian's broken power.", "The line closes the chapter with defeated enemy leaders."];
  } else if (/of the midianites oreb and zeeb and/.test(lower)) {
    opening = ["The line strings together the names and outcomes so the victory will be remembered precisely.", "This is not a vague end but a recorded finish."];
  }

  return note([opening[0], opening[1], lead, ...support]);
}

const day62JudgesSupplementalSections = DAY_61_80_JUDGES_1_15_SUPPLEMENTAL_SECTIONS
  .filter((section) => section.chapter >= 1 && section.chapter <= 3)
  .map((section) => ({
    ...section,
    title: day62JudgesSectionTitles[section.reference] ?? section.title,
    phrases: section.phrases.map(([phraseTitle]) => [
      phraseTitle,
      explainDay62JudgesAt95(section as PersonalLeviticusPhraseSectionInput, stripLeadingEmoji(phraseTitle)),
    ]) as [string, string][],
  }));

const day63JudgesSupplementalSections = DAY_61_80_JUDGES_1_15_SUPPLEMENTAL_SECTIONS
  .filter((section) => section.chapter >= 4 && section.chapter <= 7)
  .map((section) => ({
    ...section,
    title: day63JudgesSectionTitles[section.reference] ?? section.title,
    phrases: section.phrases.map(([phraseTitle]) => [
      phraseTitle,
      explainDay63JudgesAt95(section as PersonalLeviticusPhraseSectionInput, stripLeadingEmoji(phraseTitle)),
    ]) as [string, string][],
  }));

function explicitPhrase(
  title: string,
  lineOne: string,
  lineTwo: string,
  bullets: string[],
  close: string,
): [string, string] {
  return [title, note([lineOne, lineTwo, ...bullets, close])];
}

const day64JudgesEightAndNineSections: GeneratedJudgesSection[] = [
  section(8, 2, 3, "Gideon Answers Ephraim Gently", "🕊️", [
    explicitPhrase("🕊️ What Have I Done Now In Comparison Of You", "Gideon answers Ephraim with humility instead of defending himself.", "He lowers the tension by giving them honor.", ["🕊️ A soft answer", "🤝 Pride is calmed", "👥 Unity is protected"], "Victory is preserved here by gentleness, not by force."),
    explicitPhrase("🌾 The Gleaning Of Ephraim", "Gleaning means the leftovers gathered after the main harvest.", "Gideon is saying Ephraim's later part in the battle was still very important.", ["🌾 Leftovers are still valuable", "🏹 Their part mattered", "🧠 Gideon speaks wisely"], "The comparison turns a complaint into peace."),
    explicitPhrase("⚔️ Oreb And Zeeb", "Oreb and Zeeb were Midianite leaders Ephraim captured.", "Gideon points to them as proof that Ephraim was used mightily in the victory.", ["⚔️ Enemy princes fell", "🙌 God used Ephraim", "📖 Real success is named"], "Gideon quiets jealousy by remembering what God already did through them."),
    explicitPhrase("😌 Their Anger Was Abated", "Their anger was abated means their sharp spirit settled down.", "The conflict ended because Gideon answered wisely.", ["😌 Anger cools", "🗣️ Words matter", "🤝 Brothers are reconciled"], "A gentle response keeps Israel from turning inward after battle."),
  ]),
  section(8, 5, 6, "Succoth Refuses Bread", "🍞", [
    explicitPhrase("🍞 Give, I Pray You, Loaves Of Bread", "Gideon is asking for food for exhausted men, not luxury or reward.", "The request is simple help for soldiers still chasing the enemy.", ["🍞 Bread is basic help", "🥵 The men are weary", "🏃 The pursuit is not over"], "The request tests whether fellow Israelites will support God's deliverance."),
    explicitPhrase("🥵 The People That Follow Me Are Faint", "Faint means worn out and weak from the pursuit.", "The line shows victory can still require endurance after the first breakthrough.", ["🥵 Strength is running low", "👣 The work continues", "⚔️ Battle pressure remains"], "God's people still need help when they are tired."),
    explicitPhrase("👑 Zebah And Zalmunna", "Zebah and Zalmunna are the Midianite kings Gideon is still chasing.", "The enemy leadership is not yet gone, so stopping now would be dangerous.", ["👑 Midian's kings remain", "🏃 Gideon keeps pursuing", "⚠️ The threat is unfinished"], "The line explains why Gideon cannot rest yet."),
    explicitPhrase("❓ Are The Hands Of Zebah And Zalmunna Now In Thine Hand", "Succoth is saying, 'You have not captured them yet, so why should we help?'", "They want visible success before they risk loyalty.", ["❓ Skeptical response", "😬 Fear rules them", "🤝 Help is withheld"], "Their words expose unbelief more than caution."),
  ]),
  section(8, 8, 9, "Penuel Refuses Help", "🏰", [
    explicitPhrase("🏰 He Went Up Thence To Penuel", "Penuel is another nearby place Gideon turns to for help.", "The move shows he is still seeking support from his own people.", ["📍 Another town", "🍞 Help still needed", "👥 Israel is being tested"], "The second refusal makes the problem deeper."),
    explicitPhrase("🗣️ Spake Unto Them Likewise", "Likewise means Gideon asks Penuel the same thing he asked Succoth.", "The need has not changed: tired men still need food.", ["🗣️ Same request", "🥵 Same weariness", "🤝 Another chance to help"], "Penuel is being given an opportunity Succoth already failed."),
    explicitPhrase("🚫 The Men Of Penuel Answered Him As The Men Of Succoth", "Penuel gives the same unbelieving answer as Succoth.", "Instead of helping the deliverer, they copy another town's refusal.", ["🚫 Help is denied", "👥 Unbelief spreads", "😞 Israel fails Israel"], "The repeated answer shows a shared hardness of heart."),
    explicitPhrase("🧱 I Will Break Down This Tower", "The tower represented Penuel's strength and security.", "Gideon warns that the place they trust will not save them.", ["🧱 Human security", "⚠️ Judgment threatened", "🏰 False confidence exposed"], "The warning is aimed at their pride as much as their building."),
  ]),
  section(8, 10, 12, "Gideon Captures Midian's Kings", "⚔️", [
    explicitPhrase("⚔️ Gideon Smote The Host", "Smote means Gideon struck the enemy camp in battle.", "The attack lands on a force that already feels secure.", ["⚔️ The army is hit", "😴 The enemy feels safe", "🙌 God gives success"], "The victory continues because Gideon does not stop too soon."),
    explicitPhrase("🏃 Zebah And Zalmunna Fled", "The Midianite kings run because their army has been broken.", "Their flight shows the battle is turning into total defeat.", ["🏃 Leaders flee", "👑 Midian is collapsing", "⚠️ The pursuit continues"], "The line marks the enemy moving from strength to fear."),
    explicitPhrase("👣 Gideon Pursued After Them", "Gideon keeps chasing instead of settling for a partial win.", "His pursuit shows determination to finish what God started.", ["👣 He keeps moving", "🎯 Partial victory is not enough", "🙌 Deliverance is completed"], "Faithful pursuit matters after the first success."),
    explicitPhrase("🔒 Took The Two Kings Of Midian", "Taking the two kings means Midian's leadership is finally in Gideon's hand.", "The capture turns pursuit into a decisive finish.", ["🔒 Kings are captured", "👑 Leadership falls", "✅ The chase ends"], "The enemy that terrorized Israel is brought low."),
  ]),
  section(8, 13, 14, "A Young Man Of Succoth Is Taken", "📝", [
    explicitPhrase("🌅 Gideon Returned From Battle Before The Sun Was Up", "Gideon returns quickly after the victory, before the day is fully up.", "The wording keeps the story moving with urgency.", ["🌅 Early return", "⚔️ Battle has just ended", "⏱️ No delay"], "The matter with Succoth is addressed immediately."),
    explicitPhrase("🧑 Caught A Young Man Of The Men Of Succoth", "A young man from Succoth is seized so Gideon can learn who led the refusal.", "The focus shifts from the town in general to the men responsible.", ["🧑 A witness is taken", "🏘️ The town is identified", "⚖️ Accountability is coming"], "The story narrows from battle to local reckoning."),
    explicitPhrase("🖊️ He Described Unto Him The Princes Of Succoth", "Described means he wrote down or named the leaders for Gideon.", "The guilty men are not left hidden inside the crowd.", ["🖊️ Leaders are listed", "👥 Names matter", "⚖️ Responsibility is specific"], "The line shows judgment is aimed at real people, not vague groups."),
    explicitPhrase("👴 The Elders Thereof", "Elders were the recognized leaders of the city.", "Their refusal carried weight because they guided the community.", ["👴 Public leaders", "🏘️ Civic authority", "⚠️ Influence misused"], "Leadership is being measured by how it treated weary brothers."),
  ]),
  section(8, 15, 17, "Gideon Punishes Succoth And Penuel", "⚖️", [
    explicitPhrase("👑 Behold Zebah And Zalmunna", "Gideon presents the captured kings as proof that his warning was not empty.", "Succoth mocked a future victory that God has now given.", ["👑 The kings are present", "✅ Gideon's word stands", "🙌 God has answered"], "The mockery of faith is exposed by the finished victory."),
    explicitPhrase("🗣️ With Them Ye Did Upbraid Me", "Upbraid means to taunt or insult.", "Succoth had treated Gideon's need with contempt.", ["🗣️ They mocked him", "🥵 They ignored weakness", "⚠️ Hardness is remembered"], "Their sin was not just caution but scorn."),
    explicitPhrase("🌵 He Took The Elders Of The City, And Thorns Of The Wilderness", "Gideon disciplines Succoth with thorns as a harsh form of punishment.", "The line shows his leadership turning severe after victory.", ["🌵 Painful judgment", "⚖️ The elders are punished", "😬 Gideon grows harsher"], "The chapter is beginning to show troubling edges in Gideon."),
    explicitPhrase("🧱 Beat Down The Tower Of Penuel", "Destroying the tower means breaking the place they trusted for safety.", "Their stronghold could not protect them from judgment.", ["🧱 The tower falls", "🏰 False security fails", "⚖️ Pride is judged"], "The punishment matches the confidence they placed in the tower."),
  ]),
  section(8, 18, 19, "Gideon Questions The Kings", "💔", [
    explicitPhrase("❓ What Manner Of Men Were They", "Gideon is asking what the slain men looked like.", "He wants to know whether these kings killed his own brothers.", ["❓ A question of identity", "💔 Personal loss", "⚔️ The past is surfacing"], "The battle becomes personal in this moment."),
    explicitPhrase("👑 As Thou Art, So Were They", "The kings answer that the men looked like Gideon himself.", "They are admitting those men were noble and kingly in appearance.", ["👑 Royal likeness", "🧍 Family resemblance", "📖 The answer confirms much"], "Their answer tells Gideon exactly who was murdered."),
    explicitPhrase("👑 Resembled The Children Of A King", "Children of a king means men with dignity, bearing, and noble appearance.", "The line honors Gideon's brothers even while recounting their death.", ["👑 Noble bearing", "💔 A costly loss", "🧠 The memory is vivid"], "The phrase adds weight to Gideon's grief."),
    explicitPhrase("🩸 They Were My Brethren", "Gideon reveals that the dead men were his own brothers.", "The kings' execution will be tied to bloodguilt, not only military victory.", ["🩸 Family blood", "💔 Brotherly grief", "⚖️ Justice and revenge meet"], "The pursuit is now shown as deeply personal."),
  ]),
  section(8, 20, 21, "Zebah And Zalmunna Are Killed", "🗡️", [
    explicitPhrase("🗡️ Slay Them", "Gideon first tells his young son to kill the kings.", "The moment is meant to shame the defeated rulers as well as end them.", ["🗡️ A command is given", "👦 A youth is involved", "👑 The kings are humiliated"], "The scene is heavy and uncomfortable on purpose."),
    explicitPhrase("😨 The Youth Drew Not His Sword", "The boy is too afraid to strike seasoned kings.", "His fear shows the weight of what Gideon asked him to do.", ["😨 Fear takes over", "👦 He is not ready", "⚖️ The moment is too much"], "The hesitation makes the scene feel human and tragic."),
    explicitPhrase("⚔️ Rise Thou, And Fall Upon Us", "The kings ask Gideon himself to kill them.", "They would rather die by a grown warrior than by a fearful boy.", ["⚔️ A warrior's death", "👑 The kings speak boldly", "😬 Honor still matters to them"], "Their request reflects the hard world of battle and shame."),
    explicitPhrase("📿 Gideon Took The Ornaments", "The ornaments were royal decorations taken from the camels' necks.", "Taking them marks the kings' full defeat and loss of status.", ["📿 Signs of royalty", "👑 Spoil is taken", "✅ Their power is ended"], "The enemy is stripped of both life and honor."),
  ]),
  section(8, 24, 26, "Gideon Requests Gold Earrings", "🪙", [
    explicitPhrase("🪙 I Would Desire A Request Of You", "Gideon is asking the people for a gift from the battle spoil.", "The request sounds modest at first, but it will lead somewhere dangerous.", ["🪙 A gift is requested", "👥 Israel agrees", "⚠️ Trouble is coming"], "A small request can open the door to a larger snare."),
    explicitPhrase("👂 Give Me Every Man The Earrings Of His Prey", "Prey means the goods taken from defeated enemies.", "The earrings are part of Midian's captured wealth.", ["👂 Gold earrings", "💰 Battle spoil", "👥 The people contribute"], "The victory is being turned into something visible and lasting."),
    explicitPhrase("🧥 They Spread A Garment", "The garment becomes the place where the people throw their gold.", "It shows a willing, public response to Gideon's request.", ["🧥 A collection is made", "👥 The people participate", "🪙 Wealth gathers"], "What begins as generosity is building toward a bad outcome."),
    explicitPhrase("⚖️ The Weight Of The Golden Earrings", "Weight points to how much gold was collected.", "The number shows this was no small personal gift.", ["⚖️ A large amount", "💰 Rich spoil", "📖 The scale is stressed"], "The size of the gift helps explain why the next step matters so much."),
  ]),
  section(8, 29, 32, "Gideon's House Grows Great", "🏠", [
    explicitPhrase("🏠 Jerubbaal Went And Dwelt In His Own House", "Jerubbaal is another name for Gideon.", "Dwelling in his own house marks a season of settled life after war.", ["🏠 Peace at home", "⚔️ Battle has ended", "⏱️ A new season begins"], "The judge now lives in quiet rather than conflict."),
    explicitPhrase("👥 Gideon Had Threescore And Ten Sons", "Threescore and ten means seventy sons.", "The line shows Gideon's household became very large and powerful.", ["👥 A huge family", "🏠 Household strength", "👑 Influence grows"], "His life is beginning to look more king-like."),
    explicitPhrase("👶 His Concubine Bare Him Abimelech", "Abimelech is Gideon's son by a concubine in Shechem.", "The name means 'my father is king,' which already hints at trouble ahead.", ["👶 A son is named", "🏙️ Shechem matters", "👑 Kingship is hinted"], "The chapter quietly plants the seed for the next disaster."),
    explicitPhrase("⚰️ Gideon Died In A Good Old Age", "A good old age means Gideon lived a long life.", "The wording sounds honorable, even though the chapter has shown mixed fruit.", ["⚰️ Gideon dies", "⏳ His years were long", "📖 His story closes"], "The judge's life ends, but the spiritual problem does not."),
  ]),
  section(8, 34, 35, "Israel Forgets The LORD And Gideon's House", "🧠", [
    explicitPhrase("🧠 Remembered Not The LORD Their God", "Remembered not means Israel stopped living in conscious gratitude and loyalty to God.", "Forgetfulness here is spiritual, not just mental.", ["🧠 They forget mercy", "💔 Loyalty fades", "⚠️ The cycle returns"], "The chapter ends by exposing Israel's real problem."),
    explicitPhrase("🛡️ Delivered Them Out Of The Hands Of All Their Enemies", "The LORD had rescued them from enemies on every side.", "Forgetting Him after that deliverance shows deep ingratitude.", ["🛡️ God rescued them", "🙌 Mercy was real", "💔 They still forgot"], "The line makes Israel's failure more serious."),
    explicitPhrase("🤝 Neither Shewed They Kindness", "Kindness means covenant loyalty and grateful love.", "Israel did not treat Gideon's family with the mercy his service deserved.", ["🤝 Kindness is missing", "🏠 Gideon's house is neglected", "😔 Gratitude disappears"], "People who forget God often fail people too."),
    explicitPhrase("📖 According To All The Goodness Which He Had Shewed Unto Israel", "Goodness here means the benefit Gideon brought to the nation through God's help.", "Israel enjoyed the rescue but did not honor the man or the LORD behind it.", ["📖 Past good is ignored", "🙌 Rescue is forgotten", "⚠️ Memory fails"], "The ending warns that victory can be wasted by forgetfulness."),
  ]),
  section(9, 1, 2, "Abimelech Seeks Power Through Family Ties", "👑", [
    explicitPhrase("👑 Abimelech The Son Of Jerubbaal", "Abimelech is Gideon's son, and he is stepping into the story with ambition.", "His family connection gives him access to power he did not earn.", ["👑 A powerful son", "🏠 Gideon's house matters", "⚠️ Ambition begins"], "The next crisis rises from inside Gideon's own family."),
    explicitPhrase("🗣️ Commune, I Pray You, In The Ears Of All The Men Of Shechem", "Abimelech wants his relatives in Shechem to campaign for him.", "He builds support through clan loyalty before he ever proves character.", ["🗣️ Private persuasion", "🏙️ Shechem is targeted", "👥 Family influence"], "The plan begins with politics, not godliness."),
    explicitPhrase("⚖️ Whether Is Better For You, Either That All The Sons Of Jerubbaal Reign", "Abimelech frames the choice to make himself look practical.", "He talks as if the issue is efficiency, not his own hunger for rule.", ["⚖️ A loaded choice", "👑 Power is simplified", "🧠 Self-interest is hidden"], "Bad leadership often sells itself as common sense."),
    explicitPhrase("🦴 Remember Also That I Am Your Bone And Your Flesh", "Bone and flesh means close family relation.", "Abimelech is asking them to choose blood loyalty over righteousness.", ["🦴 Family language", "🤝 Tribal loyalty", "⚠️ Truth is pushed aside"], "He uses kinship to gain a crown."),
  ]),
  section(9, 5, 6, "Abimelech Murders His Brothers", "🩸", [
    explicitPhrase("🩸 He Slew His Brethren, Threescore And Ten Persons, Upon One Stone", "Abimelech kills seventy brothers in one place as a single act of slaughter.", "The stone makes the violence deliberate and public.", ["🩸 Family murder", "🪨 One stone", "😨 Evil is concentrated"], "This is not strong leadership. It is bloody ambition."),
    explicitPhrase("🏃 Jotham The Youngest Son Of Jerubbaal Was Left", "Jotham survives because he hides.", "One brother remains alive to speak truth into the evil.", ["🏃 One escapes", "👦 The youngest lives", "📖 A witness remains"], "God preserves a voice even in a massacre."),
    explicitPhrase("🏙️ All The Men Of Shechem Gathered Together", "The men of Shechem gather in support of Abimelech.", "They are not innocent bystanders. They are participating in the rise of a violent ruler.", ["🏙️ A city gathers", "🤝 Public support", "⚠️ Shared guilt"], "The community helps crown the sin."),
    explicitPhrase("👑 Made Abimelech King", "Abimelech becomes king by human agreement, not by divine calling.", "The crown rests on bloodshed from the very beginning.", ["👑 A false kingship", "🩸 Built on murder", "⚠️ Bad beginnings"], "The chapter warns that not every king is a blessing."),
  ]),
  section(9, 8, 9, "The Olive Tree Refuses To Reign", "🫒", [
    explicitPhrase("🌳 The Trees Went Forth To Anoint A King Over Them", "Jotham's story imagines trees choosing a ruler.", "The parable lets him expose Shechem's choice without naming them first.", ["🌳 A parable begins", "👑 The question is kingship", "🧠 Symbolic teaching"], "The trees stand in for people and leaders."),
    explicitPhrase("🫒 Reign Thou Over Us", "The trees are asking the olive tree to leave its work and take power.", "The request makes rulership sound attractive, but the answer will challenge that assumption.", ["👑 Power is offered", "🌳 A useful tree is asked", "❓ Is ruling always best?"], "Jotham is already questioning what kind of leader should reign."),
    explicitPhrase("🫒 Should I Leave My Fatness", "Fatness means the richness and usefulness of the olive.", "The olive tree refuses to abandon its fruitful purpose for status.", ["🫒 Useful fruit", "🙅 Good work is not abandoned", "👑 Status is questioned"], "A healthy leader does not chase power for its own sake."),
    explicitPhrase("🙌 Wherewith By Me They Honour God And Man", "Olive oil served sacred and ordinary life alike.", "The line shows that real value comes from fruitfulness, not from sitting over others.", ["🙌 Service to God", "👥 Service to people", "🌳 Fruit over power"], "Jotham starts by showing that worthy things do not always seek the throne."),
  ]),
  section(9, 10, 11, "The Fig Tree Refuses To Reign", "🍇", [
    explicitPhrase("🌳 Then Said The Trees To The Fig Tree", "After the olive refuses, the trees ask the fig tree.", "The search continues because they still want a ruler over them.", ["🌳 Another tree is asked", "👑 The search continues", "🧠 Desire for rule remains"], "The people in the parable are still looking in the wrong way."),
    explicitPhrase("👑 Come Thou, And Reign Over Us", "The fig tree is invited to exchange fruitfulness for authority.", "Again the offer treats ruling as higher than serving.", ["👑 Power is offered", "🍇 Fruitfulness is tested", "⚖️ Service versus status"], "Jotham keeps pressing the same question from different angles."),
    explicitPhrase("🍯 Should I Forsake My Sweetness", "Sweetness points to the good fruit the fig tree already provides.", "The tree knows there is value in nourishing others where it stands.", ["🍯 Good fruit", "🙅 It refuses the throne", "👥 Others already benefit"], "Fruitful service can be better than visible authority."),
    explicitPhrase("🍇 My Good Fruit", "Good fruit means what the fig tree naturally produces for blessing.", "The point is that a healthy life does not need the crown to matter.", ["🍇 Blessing already given", "🧠 Worth without a throne", "🌳 Calling matters"], "The parable honors usefulness over ambition."),
  ]),
  section(9, 12, 13, "The Vine Refuses To Reign", "🍷", [
    explicitPhrase("🌿 Then Said The Trees Unto The Vine", "The trees now turn to the vine after other fruitful trees refuse.", "The repeated request shows their stubborn desire for a ruler.", ["🌿 Another choice is sought", "👑 The search continues", "🧠 They still do not understand"], "The parable is building toward a bad final choice."),
    explicitPhrase("🍷 Should I Leave My Wine", "Wine stands for the vine's productive and joyful fruit.", "The vine will not stop bearing that fruit just to rule over others.", ["🍷 Fruit with purpose", "🙅 The vine refuses", "👑 Power is not the prize"], "The vine values calling over control."),
    explicitPhrase("😊 Which Cheereth God And Man", "Cheereth means bringing gladness or joy.", "The vine's fruit serves both worship and human celebration.", ["😊 Joy is given", "🙌 Worship is served", "👥 People are blessed"], "A fruitful life can bless many without becoming a throne."),
    explicitPhrase("⬆️ Go To Be Promoted Over The Trees", "Promoted means lifted up over the rest.", "The vine refuses to trade humble usefulness for exalted position.", ["⬆️ Exaltation is offered", "🙅 The vine declines", "🌿 Humble service remains"], "Jotham keeps showing that the best candidates do not hunger for rank."),
  ]),
  section(9, 14, 15, "The Bramble Accepts The Throne", "🔥", [
    explicitPhrase("🌵 Then Said All The Trees Unto The Bramble", "The bramble is a thorny, low plant, not a fruitful tree.", "When useful trees refuse, the parable turns to something dangerous.", ["🌵 A worthless ruler", "⚠️ The choice gets worse", "👑 Power falls low"], "Bad leadership often rises when good leadership is refused."),
    explicitPhrase("👑 Come Thou, And Reign Over Us", "The trees ask the bramble to rule because they still want a king at any cost.", "Their desire for a ruler has become more important than the ruler's character.", ["👑 A desperate choice", "⚠️ Character is ignored", "🧠 Desire controls judgment"], "Wanting power structure can lead people to accept destruction."),
    explicitPhrase("🌥️ Put Your Trust In My Shadow", "A bramble has no meaningful shelter to offer.", "The promise of shadow is empty because the bramble cannot really protect anyone.", ["🌥️ False safety", "🌵 Empty promise", "⚠️ Bad leadership lies"], "The ruler offers protection he cannot truly give."),
    explicitPhrase("🔥 Let Fire Come Out Of The Bramble", "The bramble threatens to burn those who reject it.", "Its rule is based on destruction, not blessing.", ["🔥 Fire as judgment", "🌵 Rule by threat", "💔 Destructive kingship"], "Jotham is warning that Abimelech's reign will consume people."),
  ]),
  section(9, 16, 18, "Jotham Exposes Shechem's Evil", "⚖️", [
    explicitPhrase("⚖️ If Ye Have Dealt Truly And Sincerely", "Jotham is testing whether Shechem acted with honesty and righteousness.", "He knows their choice of Abimelech must be judged morally, not just politically.", ["⚖️ Truth is examined", "🧠 Motives matter", "👑 Kingship is judged"], "The issue is not simply who rules, but whether the rule was righteous."),
    explicitPhrase("👑 Have Made Abimelech King", "Jotham names their act directly so they cannot hide behind ceremony.", "Making him king was a moral decision with blood behind it.", ["👑 The act is named", "🩸 Blood is behind it", "⚠️ Public guilt"], "The crown cannot hide the crime that carried it there."),
    explicitPhrase("🩸 Have Slain His Seventy Sons", "Seventy sons means the broader house of Gideon has been butchered.", "Jotham brings the massacre back to the center of the story.", ["🩸 Mass murder", "🏠 Gideon's house falls", "😨 Evil is remembered"], "A new kingdom has been built on family blood."),
    explicitPhrase("🛡️ Because He Fought For You", "Gideon had risked himself to save Israel.", "Shechem rewarded that service by supporting the murder of his sons.", ["🛡️ Gideon once saved them", "💔 Gratitude is missing", "⚖️ Their betrayal is exposed"], "Jotham forces them to see how evil their choice really was."),
  ]),
  section(9, 19, 21, "Jotham Calls Down Fire And Flees", "🔥", [
    explicitPhrase("🙂 If Ye Then Have Dealt Truly And Sincerely", "Jotham speaks with sharp irony because he knows they have not acted well.", "He lets their own conscience hear the contradiction.", ["🙂 Bitter irony", "⚖️ Their claim is hollow", "🧠 The verdict is obvious"], "The words expose false celebration."),
    explicitPhrase("🎉 Rejoice Ye In Abimelech", "If their choice were righteous, then joy would make sense.", "But Jotham's point is that this joy rests on wickedness.", ["🎉 Celebration is questioned", "🩸 Joy is corrupted", "⚠️ Evil dressed as success"], "The line makes their feast sound hollow."),
    explicitPhrase("🔥 Let Fire Come Out From Abimelech", "Fire pictures destructive judgment breaking out between allies.", "Jotham warns that evil partnerships eventually consume each other.", ["🔥 Destruction will spread", "👑 The ruler will wound his own people", "⚠️ Sin turns inward"], "The curse predicts mutual ruin."),
    explicitPhrase("🏃 Jotham Ran Away And Fled", "Jotham leaves because speaking truth against power makes him unsafe.", "His flight shows how dangerous Abimelech's rise already is.", ["🏃 Truth-teller flees", "⚠️ Evil rules the city", "📍 Beer becomes refuge"], "The righteous man must leave while the violent man stays."),
  ]),
  section(9, 22, 23, "God Sends Division", "🧨", [
    explicitPhrase("👑 Abimelech Reigned Three Years Over Israel", "Abimelech's rule lasts for a season, but it is not secure.", "The short length already hints that this kingship will not stand.", ["👑 A brief reign", "⏱️ Evil rules for a time", "⚠️ Instability is near"], "Power can last for a while without being blessed."),
    explicitPhrase("🧨 God Sent An Evil Spirit", "God sends division as judgment between Abimelech and Shechem.", "The alliance built on sin begins to break apart from within.", ["🧨 Judgment enters", "⚖️ God is acting", "💔 Unity collapses"], "The LORD does not ignore bloodshed forever."),
    explicitPhrase("💔 Between Abimelech And The Men Of Shechem", "The friendship between ruler and city turns into hostility.", "The same men who raised him up will now help bring him down.", ["💔 Alliance breaks", "🏙️ Shechem turns", "👑 The ruler is isolated"], "Sinful partnerships are unstable by nature."),
    explicitPhrase("🗡️ Dealt Treacherously", "Treacherously means acting falsely or faithlessly.", "The men who cooperated in evil now begin betraying one another.", ["🗡️ Betrayal grows", "⚠️ Trust is gone", "⚖️ Evil repays evil"], "What was built by treachery continues in treachery."),
  ]),
  section(9, 24, 25, "Violence Begins To Be Repaid", "🩸", [
    explicitPhrase("🩸 The Cruelty Done To The Threescore And Ten Sons", "Cruelty names the murder of Gideon's sons as moral evil, not political necessity.", "The chapter insists that bloodshed matters to God.", ["🩸 Cruelty is named", "⚖️ God sees blood", "🏠 Gideon's house is remembered"], "The dead are not forgotten by heaven."),
    explicitPhrase("⚖️ Their Blood Be Laid Upon Abimelech", "Their blood being laid upon him means he bears guilt for the murders.", "The line speaks of accountability, not accident.", ["⚖️ Bloodguilt", "👑 The king is answerable", "🧠 Justice is personal"], "God is tracing the crime back to its doer."),
    explicitPhrase("🥷 They Set Liers In Wait", "Liers in wait are men hiding in ambush.", "Shechem now begins using violence against the ruler it once supported.", ["🥷 Hidden attack", "💔 Alliance decays", "⚠️ Ambush replaces trust"], "The city is starting to live inside Jotham's curse."),
    explicitPhrase("↩️ God Did Render", "Render means to repay or return what is deserved.", "The chapter is showing that judgment is not random chaos.", ["↩️ God repays", "⚖️ Justice works", "📖 Events have meaning"], "The unraveling is part of divine response."),
  ]),
  section(9, 26, 27, "Gaal Wins Shechem's Confidence", "🍇", [
    explicitPhrase("🚶 Gaal The Son Of Ebed Came", "Gaal arrives as a new rival who will stir the city.", "His entrance gives Shechem another man to trust besides Abimelech.", ["🚶 A challenger appears", "🏙️ The city is restless", "⚠️ Rivalry grows"], "The broken alliance creates room for another voice."),
    explicitPhrase("🤝 Went Over To Shechem", "Went over suggests moving into the city and gaining influence there.", "Gaal is not passing through. He is settling in as a contender.", ["🤝 Influence enters", "🏙️ Shechem receives him", "👥 Loyalties shift"], "The city is ready to listen to rebellion."),
    explicitPhrase("🌾 They Went Out Into The Fields", "Going into the fields suggests ordinary harvest work and celebration.", "Life seems normal on the surface even while political danger is growing underneath.", ["🌾 Harvest setting", "😌 False calm", "⚠️ Trouble is near"], "The chapter often places danger inside ordinary moments."),
    explicitPhrase("🪵 Praised The God Of Shechem", "They celebrate at an idolatrous shrine instead of turning to the LORD.", "Their confidence is being shaped by false worship as well as politics.", ["🪵 False worship", "🏙️ Local pride", "💔 God is absent"], "The revolt grows in a spiritually dark setting."),
  ]),
  section(9, 28, 29, "Gaal Challenges Abimelech", "🗣️", [
    explicitPhrase("🗣️ Who Is Abimelech", "Gaal is belittling Abimelech's right to rule.", "The question is not sincere curiosity but public contempt.", ["🗣️ Open mockery", "👑 Authority is challenged", "🏙️ Shechem is stirred"], "The city is being taught to despise the king it once chose."),
    explicitPhrase("🏙️ Serve The Men Of Hamor", "Hamor was tied to Shechem's earlier identity.", "Gaal is appealing to local pride against Abimelech.", ["🏙️ Civic pride", "🧠 Old identity invoked", "⚠️ Loyalty is redirected"], "He is trying to turn the city back toward itself."),
    explicitPhrase("⚔️ Increase Thine Army, And Come Out", "Gaal dares Abimelech to face him in battle.", "The line turns political boasting into open conflict.", ["⚔️ A challenge is issued", "🔥 Pride escalates", "👥 War language returns"], "Proud speech is pushing the chapter toward bloodshed."),
    explicitPhrase("✋ Under My Hand", "To be under someone's hand means under his power or control.", "Gaal wishes he held authority so he could remove Abimelech himself.", ["✋ Hunger for control", "👑 Rival ambition", "⚠️ Pride speaks loudly"], "The city now has two men chasing power."),
  ]),
  section(9, 30, 33, "Zebul Secretly Warns Abimelech", "📨", [
    explicitPhrase("😠 When Zebul Heard The Words Of Gaal", "Zebul is the city ruler under Abimelech, so Gaal's speech threatens his position.", "His anger comes from political loyalty and personal stake.", ["😠 Anger rises", "🏙️ Authority is challenged", "👑 Loyalty is tested"], "The city leadership is now divided inside itself."),
    explicitPhrase("🔥 His Anger Was Kindled", "Kindled means his anger flared up intensely.", "The line shows how quickly words can move a city toward violence.", ["🔥 Hot anger", "🗣️ Speech has consequences", "⚠️ Conflict is close"], "Public boasting is turning into military response."),
    explicitPhrase("📨 Send Privily Unto Abimelech", "Privily means secretly.", "Zebul sends a hidden warning so Abimelech can prepare an ambush.", ["📨 Secret message", "🥷 Quiet strategy", "⚔️ Violence is planned"], "The answer to Gaal's pride will be cunning, not peace."),
    explicitPhrase("🌙 Rise By Night", "Rising by night means moving under cover of darkness.", "The plan depends on surprise rather than open debate.", ["🌙 Night movement", "🥷 Ambush", "⚔️ Sudden attack"], "The city is sliding deeper into treachery."),
  ]),
  section(9, 34, 36, "Abimelech Lies In Wait", "🌄", [
    explicitPhrase("🌙 Abimelech Rose Up By Night", "Abimelech moves at night to carry out the hidden attack.", "He answers challenge with stealth and violence.", ["🌙 Night action", "⚔️ The trap begins", "👑 Ruthless leadership"], "His rule keeps acting like the bramble in Jotham's story."),
    explicitPhrase("4️⃣ The People Were In Four Companies", "Four companies means the men are divided into separate attack groups.", "The arrangement shows planning and military coordination.", ["4️⃣ Multiple groups", "🧠 Strategic setup", "⚔️ Ambush is organized"], "The scene shifts from speech to battle formation."),
    explicitPhrase("🚪 Gaal Stood In The Entering Of The Gate", "Standing in the gate means Gaal is in the public place of authority and decision.", "He does not yet realize the danger around him.", ["🚪 Public space", "👀 He is exposed", "⚠️ The trap is near"], "The man who spoke boldly is now vulnerable."),
    explicitPhrase("⛰️ People Come Down From The Top Of The Mountains", "Gaal sees movement and senses men coming down toward the city.", "The hills that seemed quiet are hiding armed danger.", ["⛰️ Hidden forces appear", "👀 Danger is spotted", "⚔️ Battle is beginning"], "The ambush is now becoming visible."),
  ]),
  section(9, 37, 38, "Zebul Exposes Gaal's Pride", "🪞", [
    explicitPhrase("⛰️ The People Be Come Down From The Mountains", "The movement Gaal saw was real, not imagined.", "The threat he mocked is now standing before him.", ["⛰️ The enemy appears", "👀 His warning was right", "⚔️ The test has arrived"], "The moment turns boasting into reality."),
    explicitPhrase("❓ Is Not This The People", "Zebul points directly at the army to silence Gaal's denial.", "The question corners him with the truth he can no longer dismiss.", ["❓ Reality is pointed out", "🧠 Excuses collapse", "⚠️ Truth is unavoidable"], "Words cannot hide facts now."),
    explicitPhrase("👄 Where Is Now Thy Mouth", "Zebul is asking where Gaal's bold talk has gone.", "The line exposes how quickly pride shrinks when danger is real.", ["👄 Proud speech is tested", "😶 Boasting fades", "⚔️ Battle proves people"], "Empty confidence sounds different when the enemy arrives."),
    explicitPhrase("⚔️ Go Out, I Pray Now, And Fight", "Zebul tells Gaal to back up his words with action.", "The challenge forces him from speech into the battlefield.", ["⚔️ Speech becomes action", "🔥 Pride is cornered", "👣 He must answer now"], "The chapter keeps showing how reckless words lead to bloodshed."),
  ]),
  section(9, 39, 41, "Gaal Is Driven Out", "🏃", [
    explicitPhrase("⚔️ Gaal Went Out Before The Men Of Shechem", "Gaal leads Shechem's men out to fight Abimelech.", "He has moved from loud rebellion to open battle.", ["⚔️ The battle is joined", "🏙️ Shechem follows him", "🔥 Pride leads others"], "His words now carry a public cost."),
    explicitPhrase("🩹 Many Were Overthrown And Wounded", "The defeat is serious enough to leave many men injured and falling.", "The rebellion that sounded strong quickly bleeds on the field.", ["🩹 Real casualties", "⚔️ Rebellion fails", "😞 Pride wounds many"], "Boasting leadership often hurts the people with it."),
    explicitPhrase("🏠 Abimelech Dwelt At Arumah", "Abimelech pulls back to Arumah rather than settling peaceably in Shechem.", "The separation shows the relationship is still unstable.", ["🏠 A separate base", "💔 Trust is gone", "⚠️ Peace has not returned"], "Victory in battle does not heal a sinful alliance."),
    explicitPhrase("🚪 Zebul Thrust Out Gaal", "Thrust out means Gaal is forced from the city.", "The man welcomed as a challenger is now expelled in disgrace.", ["🚪 Expulsion", "🏙️ Shechem rejects him", "↩️ Reversal"], "The city eats one more failed leader and moves on."),
  ]),
  section(9, 42, 45, "Abimelech Destroys Shechem", "🧂", [
    explicitPhrase("🌄 On The Morrow The People Went Out Into The Field", "The people return to ordinary activity the next day.", "They act as if the danger has passed, but Abimelech is still watching.", ["🌄 A new day", "🌾 Ordinary life resumes", "⚠️ Danger remains"], "The calm is deceptive."),
    explicitPhrase("3️⃣ Abimelech Divided The People Into Three Companies", "Three companies means he arranges another coordinated attack.", "He is planning destruction, not reconciliation.", ["3️⃣ Organized assault", "⚔️ Strategy returns", "💔 Peace is not sought"], "His leadership keeps choosing violence."),
    explicitPhrase("🏙️ Smote The City", "Smote the city means Abimelech strikes Shechem itself, not just its fighters.", "The judgment now falls on the place that crowned him.", ["🏙️ The city is attacked", "⚖️ Former allies suffer", "🔥 Violence turns inward"], "The partnership ends in ruin for both sides."),
    explicitPhrase("🧂 Sowed It With Salt", "Sowing with salt is a sign of devastation and curse.", "The city is not merely defeated. It is marked as ruined.", ["🧂 Symbol of desolation", "🏙️ Shechem is cursed", "⚠️ Ruin is made visible"], "The place that chose a false king reaps bitter destruction."),
  ]),
  section(9, 46, 49, "The Tower Of Shechem Burns", "🔥", [
    explicitPhrase("🏰 All The Men Of The Tower Of Shechem Heard That", "The tower people learn what has happened and rush for safety.", "Their response shows fear spreading through the city.", ["🏰 The tower reacts", "😨 Fear spreads", "🏃 Refuge is sought"], "The survivors run to a place they think will protect them."),
    explicitPhrase("🔒 Entered Into An Hold", "A hold is a fortified inner refuge.", "The people hide there because they believe strong walls will save them.", ["🔒 A fortified refuge", "🏰 Defensive retreat", "⚠️ Human security"], "They trust the stronghold when judgment is already moving."),
    explicitPhrase("🪵 The House Of The God Berith", "This was a shrine tied to covenant language but false worship.", "They flee to an idolatrous place for safety.", ["🪵 False worship", "🏰 False refuge", "💔 God is not sought"], "The place of trust reveals the heart of the people."),
    explicitPhrase("🔥 Set The Hold On Fire", "Abimelech burns the refuge with the people inside.", "The bramble's fire from Jotham's parable is now coming true.", ["🔥 Fire consumes", "⚖️ The curse unfolds", "😨 Many die"], "Jotham's warning is no longer a story. It is history."),
  ]),
  section(9, 50, 52, "Abimelech Attacks Thebez", "🏰", [
    explicitPhrase("🏃 Then Went Abimelech To Thebez", "Abimelech does not stop after Shechem. He keeps spreading violence.", "His appetite for control moves on to another city.", ["🏃 He keeps advancing", "⚔️ Violence travels", "👑 Power is restless"], "Sin rarely stays contained once it is fed."),
    explicitPhrase("🏰 There Was A Strong Tower Within The City", "The tower is the inner place of defense for Thebez.", "Like Penuel and Shechem, a tower becomes central in the story.", ["🏰 Defensive tower", "🏙️ Last refuge", "⚠️ A pattern repeats"], "The scene intentionally echoes earlier strongholds."),
    explicitPhrase("👥 All The Men And Women Fled Thither", "The whole population rushes to the tower for survival.", "The danger is not limited to soldiers. Ordinary people are caught in it.", ["👥 Everyone flees", "😨 Civilian fear", "🏰 Shelter is sought"], "Abimelech's violence crushes communities, not only enemies."),
    explicitPhrase("🚪 Abimelech Came Unto The Tower", "He goes right up to the place of refuge to destroy it.", "His method is the same as before: burn the stronghold and everyone in it.", ["🚪 He presses close", "🔥 Threat returns", "⚠️ Cruelty repeats"], "He has learned nothing from the blood already shed."),
  ]),
  section(9, 54, 55, "Abimelech Dies In Shame", "🪨", [
    explicitPhrase("🪨 A Certain Woman Cast A Piece Of A Millstone", "A millstone was a heavy stone used for grinding grain.", "A woman drops part of one from the tower onto Abimelech.", ["🪨 A heavy stone", "👩 An unexpected striker", "⚖️ Judgment falls"], "The violent king is brought down from above, not crowned from below."),
    explicitPhrase("💀 All To Brake His Skull", "The blow crushes his head and leaves him dying.", "The wording shows the judgment is direct and fatal.", ["💀 Deadly wound", "⚖️ The end arrives", "👑 Power collapses"], "The man who shed blood meets sudden ruin."),
    explicitPhrase("🗡️ Draw Thy Sword, And Slay Me", "Abimelech begs his armorbearer to finish him off.", "He is more concerned with his reputation than with repentance.", ["🗡️ He asks for death", "😬 Shame drives him", "👑 Pride remains"], "Even dying, he still wants to control the story."),
    explicitPhrase("👩 Lest Men Say, A Woman Slew Him", "His fear is that people will remember the disgrace of his death.", "The line exposes the pride still alive in him at the end.", ["👩 Shame is feared", "🧠 Reputation matters most", "⚠️ Pride survives to the grave"], "The false king dies worrying about honor, not truth."),
  ]),
  section(9, 56, 57, "God Repays Abimelech And Shechem", "⚖️", [
    explicitPhrase("⚖️ Thus God Rendered The Wickedness Of Abimelech", "Rendered means God repaid Abimelech for his evil.", "The chapter ends by telling us this judgment had meaning.", ["⚖️ God repays", "👑 Evil is answered", "📖 The story is interpreted"], "The ruin was not random. God saw it and responded."),
    explicitPhrase("🏠 Which He Did Unto His Father", "Abimelech's sin was also against his father's house.", "He destroyed Gideon's family in pursuit of his own greatness.", ["🏠 Family betrayal", "🩸 House destroyed", "⚠️ Ambition turns inward"], "The judgment answers what he did close to home."),
    explicitPhrase("🩸 In Slaying His Seventy Brethren", "The seventy brothers remain central to the chapter's moral weight.", "Their murder is the crime that hangs over everything else.", ["🩸 Murder remembered", "👥 Brothers lost", "⚖️ Blood still speaks"], "The end of the story keeps the massacre in view."),
    explicitPhrase("🔥 Upon Them Came The Curse Of Jotham", "Jotham's spoken curse now proves true.", "The fire he described has run through ruler and city alike.", ["🔥 The warning stands", "🗣️ Truth is fulfilled", "⚖️ Evil consumes itself"], "The chapter closes by showing that God did not let wickedness rule forever."),
  ]),
];

function explainDay64JudgesTenAndEleven(section: GeneratedJudgesSection, cleanTitle: string) {
  const title = cleanTitle.toLowerCase();

  if (/tola the son of puah/.test(title)) return note(["Tola is introduced as the judge who rises after Abimelech's chaos.", "His brief notice shows God giving stability after disorder.", "👤 A named judge", "🛡️ Israel is defended", "↩️ Mercy follows chaos", "The short record still matters because it shows God has not abandoned Israel."]);
  if (/to defend israel/.test(title)) return note(["To defend Israel means Tola's role was protective, not decorative.", "He stands between the nation and further collapse.", "🛡️ Protection", "👥 Israel is guarded", "⚖️ Order is restored", "Judges often records mercy in very simple lines."]);
  if (/dwelt in shamir/.test(title)) return note(["Shamir is the place where Tola lived and judged.", "The location keeps the judge rooted in real history, not legend.", "📍 A real place", "🏔️ Hill country setting", "📖 History stays concrete", "The Bible keeps naming places because God's work happened among real people."]);
  if (/he died, and was buried/.test(title)) return note(["The line closes Tola's life with the usual end all judges share.", "Even helpful leaders are temporary.", "⚰️ A judge dies", "⏳ His season ends", "📖 The story moves on", "The repeated endings make Israel's deeper need clearer."]);
  if (/did evil again/.test(title)) return note(["Again means Israel has returned to the same rebellion.", "The cycle is repeating because the heart problem has not been healed.", "🔁 Repeated sin", "👁️ The LORD sees it", "⚠️ Trouble is returning", "Judges keeps showing that short relief is not the same as lasting faithfulness."]);
  if (/served baalim, and ashtaroth/.test(title)) return note(["Baalim and Ashtaroth were false gods tied to the nations around Israel.", "Serving them means Israel is giving worship and trust where it does not belong.", "🪵 False worship", "💔 Covenant loyalty is broken", "🌍 Pagan influence grows", "Idolatry is the root problem underneath the oppression."]);
  if (/the gods of syria/.test(title)) return note(["The line widens the list to show Israel borrowing gods from many peoples.", "Their unfaithfulness is spreading in every direction.", "🌍 Foreign gods multiply", "🧠 Trust is scattered", "⚠️ The fall is deepening", "Israel is not drifting in one small way. The whole worship life is collapsing."]);
  if (/cried unto the lord/.test(title) && section.reference === "Judges 10:6-10") return note(["Israel cries because suffering has made their sin impossible to ignore.", "The cry is a plea for mercy from the God they abandoned.", "😢 Distress", "🙏 Help is sought", "↩️ They turn back under pressure", "Pain is driving them to the only One who can save them."]);
  if (/did not i deliver you/.test(title)) return note(["The LORD is reminding Israel of rescues they should have remembered.", "He confronts their forgetfulness before He gives relief.", "📖 Past deliverances", "🛡️ God has saved before", "💔 Mercy was forgotten", "The rebuke forces Israel to face how much grace they ignored."]);
  if (/go and cry unto the gods/.test(title)) return note(["God tells them to seek help from the idols they chose.", "The answer exposes how empty those false gods really are.", "🪵 Idols cannot save", "⚠️ The rebuke is sharp", "🧠 False trust is exposed", "The sentence is meant to wake them up, not comfort them."]);
  if (/we have sinned/.test(title)) return note(["This confession is simple and direct.", "Israel finally names guilt instead of only naming pain.", "🙏 Sin is admitted", "💔 Guilt is owned", "↩️ The heart begins to turn", "Real repentance starts by telling the truth about sin."]);
  if (/they put away the strange gods/.test(title)) return note(["Putting away the strange gods means repentance becomes visible.", "They are not only speaking differently. They are removing what drew them away.", "🧹 Idols are removed", "🙌 The LORD is served", "✅ Repentance has action", "The change becomes real when the false worship is actually put away."]);
  if (/children of ammon were gathered together/.test(title)) return note(["Ammon gathering means the threat is now organized and near.", "Israel's need for a deliverer is becoming urgent.", "⛺ The enemy assembles", "⚔️ Pressure rises", "😟 Israel is exposed", "The chapter moves from confession to the danger that demands rescue."]);
  if (/pitched in gilead/.test(title)) return note(["Pitched means the Ammonites have set up camp in Gilead.", "The battle is no longer distant. It is near Israel's own people.", "📍 Gilead is threatened", "⛺ The enemy is settled", "🏠 Homes are near danger", "The place matters because Jephthah comes from this region."]);
  if (/what man is he/.test(title)) return note(["The question asks who can begin the fight against Ammon.", "Israel knows it needs leadership, but it does not yet know where that leader will come from.", "❓ A leader is needed", "⚔️ Battle is ahead", "👥 The people are searching", "The crisis is creating the opening for Jephthah's return."]);
  if (/shall be head over all/.test(title)) return note(["Head means ruler or chief over the people in Gilead.", "Leadership is being offered as the reward for deliverance.", "👑 Authority is promised", "🛡️ Rescue is expected", "⚠️ Crisis shapes leadership", "Judges often ties public power to moments of national danger."]);
  if (/jephthah the gileadite/.test(title)) return note(["Jephthah is introduced as a strong warrior from Gilead.", "His ability is clear before his pain is described.", "💪 He is capable", "📍 He belongs to Gilead", "⚔️ Battle skill is in view", "The story starts by showing he has the strength Israel will need."]);
  if (/son of an harlot/.test(title)) return note(["The line names the background used to shame and exclude Jephthah.", "His rejection begins in the brokenness of his family story.", "🏚️ Social shame", "👥 Family tension", "💔 Painful origin", "Judges does not hide the wounds behind its deliverers."]);
  if (/they thrust out jephthah/.test(title)) return note(["Jephthah is forced away by his brothers.", "The man later needed for rescue is first treated as unwanted.", "🚪 Rejection", "🏠 Home is lost", "😢 Exile begins", "The chapter makes the future leader start as an outcast."]);
  if (/dwelt in the land of tob/.test(title)) return note(["Tob is the place where Jephthah lives after being driven out.", "He is away from inheritance, family, and public place.", "🏜️ Exile setting", "👣 Life away from home", "⏳ Waiting season", "His leadership story begins far from honor."]);
  if (/children of ammon made war/.test(title)) return note(["War with Ammon is the reason Gilead turns back to Jephthah.", "Crisis makes people seek the one they once rejected.", "⚔️ Battle pressure", "😟 Need grows urgent", "↩️ The outcast is remembered", "Their need is changing how they see him."]);
  if (/come, and be our captain/.test(title)) return note(["Captain means military leader in battle.", "The elders are asking Jephthah to become the rescuer they pushed away.", "🤝 A request is made", "⚔️ Leadership is needed", "👑 Honor is offered", "The rejected man is now wanted because the danger is real."]);
  if (/did not ye hate me/.test(title)) return note(["Jephthah names the wrong done to him without pretending it never happened.", "The question forces the elders to face their history honestly.", "💔 Old hatred is remembered", "🗣️ He speaks plainly", "⚖️ Past wrong is not erased", "Need does not automatically heal betrayal."]);
  if (/why are ye come unto me now/.test(title)) return note(["Jephthah is asking why they seek him only in distress.", "The line exposes their desperation and their inconsistency.", "🏠 They come in trouble", "😟 Need changes their tone", "🧠 The motive is tested", "The question keeps the wound in view."]);
  if (/shall i be your head/.test(title)) return note(["Jephthah wants the agreement stated clearly.", "He is not asking only about fighting. He is asking about real authority.", "👑 Leadership is clarified", "🤝 Terms are named", "⚖️ Words matter", "The moment is political as well as military."]);
  if (/lord be witness between us/.test(title)) return note(["Calling the LORD as witness brings the agreement under divine oversight.", "Their promise is not being treated as casual bargaining.", "🙏 God hears the words", "⚖️ Accountability matters", "🤝 The agreement is serious", "They are binding themselves before more than one another."]);
  if (/uttered all his words before the lord/.test(title)) return note(["Jephthah speaks his terms publicly before the LORD.", "His leadership begins under open accountability, not hidden arrangement.", "🗣️ Words are spoken", "🙏 God is invoked", "👥 The moment is public", "The scene slows down so the covenant weight is felt."]);
  if (/in mizpeh/.test(title)) return note(["Mizpeh is the place where this agreement is made.", "The location grounds the leadership change in a real public setting.", "📍 A real place", "👥 Public gathering", "⚔️ Battle is near", "The Bible keeps its turning points rooted in history."]);
  if (/jephthah sent messengers/.test(title)) return note(["Jephthah begins with communication before he begins with attack.", "He tries to understand and answer the dispute before battle starts.", "📜 Diplomacy first", "🗣️ Words before war", "⚖️ The issue is examined", "The chapter shows restraint before conflict."]);
  if (/what hast thou to do with me/.test(title)) return note(["The question asks why Ammon is attacking Israel at all.", "Jephthah wants the accusation stated plainly.", "❓ The cause is asked", "🧠 The dispute is named", "🗣️ He presses for clarity", "He will answer the war with history and argument."]);
  if (/israel took away my land/.test(title)) return note(["This is the Ammonite claim behind the conflict.", "They say Israel seized land that did not belong to them.", "🏞️ A land dispute", "⚔️ Reason for war", "📖 History is contested", "The battle is tied to who has the right to possess the land."]);
  if (/let us pass/.test(title)) return note(["Jephthah recalls Israel's old request to travel through peacefully.", "He is showing that Israel did not begin by taking what was not theirs.", "🕊️ A peaceful request", "🚶 Journey memory", "📖 History becomes evidence", "The present argument will be answered from the past."]);
  if (/went along through the wilderness/.test(title)) return note(["The wilderness route shows Israel traveling patiently instead of seizing land at will.", "Jephthah is retelling the journey to prove restraint.", "🧭 The route matters", "⏳ Patience is shown", "📖 History explains the claim", "He is building a legal case from Israel's story."]);
  if (/came not within the border of moab/.test(title)) return note(["Israel did not cross into Moab to take what God had not given.", "The line shows respect for boundaries.", "🚫 Borders were honored", "🏞️ Restraint is remembered", "🧠 The accusation is answered", "The history is careful because the land issue is serious."]);
  if (/sihon gathered all his people/.test(title)) return note(["Sihon came out against Israel in battle.", "Israel's possession of the land followed conflict with the Amorites, not theft from Ammon.", "⚔️ Sihon attacked", "📖 The enemy is identified", "🏞️ The story is clarified", "Jephthah is separating Ammon's claim from what really happened."]);
  if (/lord god of israel delivered sihon/.test(title)) return note(["The land came by the LORD's hand in victory over Sihon.", "Jephthah places the whole inheritance question under God's action.", "🙌 God delivered", "🛡️ Victory was given", "🏞️ The land is tied to God", "The argument ends with the LORD as the decisive giver."]);
  if (/chemosh thy god giveth thee/.test(title)) return note(["Jephthah uses Ammon's own logic to make a point about possession.", "If they hold what their god gives, Israel will hold what the LORD gives.", "🪵 False god is named", "🏞️ Possession is argued", "🧠 Jephthah reasons from their terms", "He is exposing how weak their complaint really is."]);
  if (/better than balak/.test(title)) return note(["Jephthah asks whether Ammon's king has a stronger claim than Balak had before.", "The question points back to older history to weaken the accusation.", "👑 Earlier kings matter", "📖 History is compared", "⚖️ The claim is challenged", "He is showing this dispute has already been tested by time."]);
  if (/lord the judge be judge/.test(title)) return note(["Jephthah hands the final verdict to the LORD.", "The line turns a land dispute into a matter of divine judgment.", "⚖️ God is Judge", "🙏 Final appeal is made", "🏞️ The conflict is placed before Him", "When human argument ends, Jephthah points to God's verdict."]);
  if (/hearkened not/.test(title) && section.reference === "Judges 11:24-28") return note(["Hearkened not means the king of Ammon refused to listen.", "The chance for peace closes because he rejects the answer given to him.", "👂 He refuses to hear", "📜 The message is rejected", "⚔️ Battle remains", "War continues after words have done what they could."]);
  if (/spirit of the lord came upon jephthah/.test(title)) return note(["The Spirit coming upon Jephthah means God empowers him for the coming deliverance.", "The chapter reminds us that victory will still depend on the LORD.", "🕊️ Divine power", "💪 Jephthah is enabled", "⚔️ Battle is near", "God's mercy is active even in a messy story."]);
  if (/passed over gilead/.test(title)) return note(["Jephthah moves through Gilead and Manasseh gathering for battle.", "This movement shows practical preparation under God's empowering.", "🗺️ Regional movement", "⚔️ Forces are gathering", "👣 Action follows empowerment", "The geography tracks the march toward conflict."]);
  if (/vowed a vow/.test(title)) return note(["Jephthah makes a solemn promise to the LORD before battle.", "The line opens the tragic part of the chapter because his words are rash.", "🗣️ A vow is made", "⚠️ Rash speech", "🙏 Spoken before God", "The chapter warns that serious words can be spoken foolishly."]);
  if (/delivered them into his hands/.test(title)) return note(["Victory comes because the LORD gives Ammon into Jephthah's hand.", "The triumph is real, but it will not erase the sorrow Jephthah has set in motion.", "🛡️ God gives victory", "🙌 Deliverance is from Him", "⚔️ Ammon is subdued", "The battle is won by God even as tragedy approaches at home."]);
  if (/daughter came out to meet him/.test(title)) return note(["Jephthah's daughter is the first one to come out after the victory.", "The vow suddenly becomes personal and devastating.", "💃 She comes out first", "💔 Joy turns to grief", "🏠 The cost reaches home", "The chapter's sorrow begins the moment she appears."]);
  if (/timbrels and with dances/.test(title)) return note(["She comes in celebration because she does not know the vow her father made.", "The joy of the scene makes the tragedy hit even harder.", "🥁 Celebration", "😢 Joy is interrupted", "💔 The contrast hurts", "Her gladness makes the moment even heavier."]);
  if (/thou hast brought me very low/.test(title)) return note(["Jephthah is crushed because his own words have trapped his household.", "The line is grief mixed with the shock of seeing the vow's cost.", "😢 Deep grief", "🗣️ Words have consequences", "⚠️ Rash speech is exposed", "The wound here came from the vow, not from the battle."]);
  if (/opened my mouth unto the lord/.test(title)) return note(["Jephthah knows he spoke this promise before the LORD.", "That is why the vow now feels so terrible and binding to him.", "🗣️ A word before God", "🙏 Sacred speech", "⚠️ Careless vows are dangerous", "The line shows why words to God must never be treated lightly."]);
  if (/bewail my virginity/.test(title)) return note(["She mourns the future family life she will never have.", "The grief is focused on a lost future, not on battlefield defeat.", "⛰️ Mourning", "👧 A future is lost", "💔 Her sorrow is personal", "The Bible makes room for the daughter's pain to be heard."]);
  if (/i and my fellows/.test(title)) return note(["Her fellows are her companions who mourn with her.", "The sorrow is shared publicly rather than hidden away.", "👭 Companions join her", "⛰️ Shared mourning", "💔 The community feels it", "The chapter lets other women stand with her in grief."]);
  if (/two months/.test(title)) return note(["Two months gives a measured period for mourning before the vow is carried through.", "The time slows the story and makes the weight linger.", "📅 Set time", "⏳ The sorrow stretches on", "💔 The moment is not rushed", "The delay makes the tragedy feel even more real."]);
  if (/a custom in israel/.test(title)) return note(["The daughters of Israel remembered her year by year.", "Her sorrow becomes a lasting warning in the community's memory.", "📜 A memorial practice", "👧 She is not forgotten", "💔 The grief endures", "The ending turns the story into a national memory of costly words."]);

  return note(["This phrase belongs to the movement of Judges 10-11 and needs to be read in its immediate story.", "The line carries its meaning by showing where Israel, Jephthah, or the LORD stands in that moment.", "📖 Context matters", "🧠 The story is specific", "⚠️ The wording is not filler", "Each phrase here pushes the chapter's lesson forward."]);
}

const day64JudgesTenAndElevenSections = judgesTenToFifteenFallbackSections
  .filter((section) => section.chapter >= 10 && section.chapter <= 11)
  .map((section) => ({
    ...section,
    phrases: section.phrases.map(([phraseTitle]) => [
      phraseTitle,
      explainDay64JudgesTenAndEleven(section, stripLeadingEmoji(phraseTitle)),
    ]) as [string, string][],
  }));

const day65JudgesSectionTitles: Record<string, string> = {
  "Judges 12:1-6": "Jephthah Answers Ephraim",
  "Judges 12:7-12": "Jephthah Dies And Ibzan Judges",
  "Judges 12:13-15": "Abdon Judges Israel",
  "Judges 13:1-6": "Samson's Birth Is Promised",
  "Judges 13:7-12": "A Nazirite From The Womb",
  "Judges 13:13-18": "Manoah Asks About The Child",
  "Judges 13:19-24": "The Angel Ascends In The Flame",
  "Judges 13:25-25": "The Spirit Begins To Move Samson",
  "Judges 14:1-6": "Samson Seeks A Philistine Wife",
  "Judges 14:7-12": "Honey, The Feast, And The Companions",
  "Judges 14:13-18": "Samson's Riddle Is Forced Open",
  "Judges 14:19-20": "Samson Strikes Ashkelon",
  "Judges 15:1-6": "Samson Burns The Philistine Fields",
  "Judges 15:7-12": "Judah Hands Samson Over",
  "Judges 15:13-18": "Samson Wins With A Jawbone",
  "Judges 15:19-20": "God Gives Water To Samson",
};

function explainDay65JudgesAt95(section: PersonalLeviticusPhraseSectionInput, cleanTitle: string) {
  const title = cleanTitle.toLowerCase();

  if (section.reference === "Judges 12:1-6") {
    if (/children of ammon/.test(title)) return note(["The children of Ammon are the enemy Jephthah had just fought.", "Naming them reminds Ephraim that the battle was against Israel's oppressor, not against a brother tribe.", "⚔️ Ammon was the enemy", "🛡️ Israel had been threatened", "🧠 The complaint comes after rescue", "Ephraim's anger sounds worse when the real enemy has already been defeated."]);
    if (/delivered them into my hand/.test(title)) return note(["Delivered them into my hand means the LORD gave Jephthah victory in battle.", "Jephthah is saying the rescue was God's work, not a private power grab.", "🙌 God gave the victory", "✋ Hand means power in battle", "⚖️ Jephthah defends his actions", "The answer points back to God's deliverance, not to Jephthah's pride."]);
    if (/my hand wherefore/.test(title)) return note(["Wherefore means 'why then.'", "Jephthah is asking why Ephraim has come to fight him after God already gave success.", "❓ A hard question", "🙌 Victory has already come", "💔 Israel is turning inward", "The line exposes how misplaced Ephraim's anger is."]);
    return note(["The phrase keeps Jephthah's answer tied to the victory over Ammon.", "He is reminding Ephraim that God had already settled the battle they are now using as a reason to quarrel.", "📖 The battle is still in view", "⚖️ Jephthah answers directly", "😔 Brotherly conflict follows rescue", "Israel should have been grateful, but instead it is fighting itself."]);
  }

  if (section.reference === "Judges 12:7-12") {
    if (/jephthah judged israel six years then died/.test(title) || /judged israel six years then died jephthah/.test(title)) return note(["Jephthah judged Israel six years means his leadership was real but brief.", "Then died closes his troubled story with the same limit every judge shares.", "⏳ A short judgeship", "⚰️ His life ends", "📖 The story moves on", "Even a deliverer used by God does not last forever."]);
    if (/after him ibzan of bethlehem judged israel/.test(title)) return note(["After him means one judge follows another without giving Israel permanent stability.", "Ibzan of Bethlehem is simply the next leader in the chain.", "👤 A new judge appears", "↩️ Leadership keeps changing", "📍 Bethlehem is named", "Judges keeps moving through temporary rescuers."]);
    if (/sons and he judged israel seven years/.test(title) || /for his sons and he judged israel/.test(title) || /abroad for his sons/.test(title)) return note(["The line points to Ibzan's large family and arranged marriages.", "Those details suggest influence and status, even though the Bible says little else about him.", "👥 A large household", "🏠 Family influence", "📖 Brief record", "The judge is remembered more by household reach than by a long story."]);
    return note(["The wording keeps the focus on judges rising and passing one after another after Jephthah.", "The Bible is marking short seasons of leadership because none of them solves Israel's deeper problem.", "🧭 Another leader", "⏳ Another short season", "📖 The pattern continues", "These brief records keep showing how temporary each judge was."]);
  }

  if (section.reference === "Judges 12:13-15") {
    if (/son of hillel/.test(title) || /abdon the son of hillel/.test(title)) return note(["Abdon is identified by his father Hillel and his home in Pirathon.", "The wording roots this judge in a real family and place.", "👤 A named judge", "🏠 Family line", "📍 Real location", "The Bible keeps leadership tied to actual people, not vague legend."]);
    if (/ten ass colts/.test(title) || /ass colts/.test(title) || /colts and he judged israel eight/.test(title)) return note(["Ass colts means young donkeys used for riding.", "The many sons and many donkeys point to Abdon's wealth and household strength.", "🐴 Riding donkeys", "👥 A large family", "🏠 Social status", "The details show influence, but not lasting rescue."]);
    if (/judged israel eight years/.test(title)) return note(["Eight years is the measured length of Abdon's judgeship.", "The number reminds the reader that each judge's season has a boundary.", "⏳ A limited term", "⚖️ A real judgeship", "📖 Time passes", "Leadership comes in seasons and then ends."]);
    return note(["The phrase belongs to Abdon's short record at the end of Judges 12.", "It highlights status, family, and time, but still leaves Israel without a permanent deliverer.", "📖 Brief notice", "👥 Household prominence", "⚰️ Another passing leader", "The chapter closes by reminding us how temporary these judges were."]);
  }

  if (section.reference === "Judges 13:1-6") {
    if (/did evil again/.test(title) || /sight of the lord/.test(title)) return note(["Again means Israel has fallen back into the same rebellion.", "Samson's story begins in the middle of another cycle of covenant failure.", "🔁 The cycle repeats", "👁️ The LORD sees it", "⚠️ Oppression follows sin", "The birth story starts inside national spiritual decline."]);
    if (/lord and/.test(title)) return note(["The LORD delivering Israel into Philistine hands means the oppression is under His judgment.", "The Philistines are not stronger than God. They are an instrument inside His rule.", "⚖️ Judgment is active", "🛡️ God still rules", "👥 Israel is humbled", "The line keeps the chapter from sounding like blind fate."]);
    if (/nazarite to god/.test(title) || /from the womb/.test(title)) return note(["A Nazarite was someone specially set apart to God under holy restrictions.", "From the womb means Samson's consecration begins before birth.", "🙏 Set apart to God", "👶 The calling starts early", "✂️ His life will be marked", "Samson's story begins with consecration before strength."]);
    return note(["The phrase belongs to the promise of Samson's birth.", "It introduces the child as part of God's answer before the deliverance has even started.", "👶 A promised child", "🙌 God moves first", "📖 Hope enters the chapter", "The rescue begins with a birth announcement, not a battlefield."]);
  }

  if (section.reference === "Judges 13:7-12") {
    if (/nazarite to god/.test(title) || /from the womb/.test(title) || /to the day/.test(title)) return note(["A Nazarite to God means Samson is devoted to God in a marked and visible way.", "From the womb to the day of his death means the calling is meant to shape his whole life.", "🙏 Consecrated life", "👶 Set apart from birth", "⏳ A lifelong calling", "The child is not ordinary. His whole life is claimed for God's purpose."]);
    if (/manoah/.test(title) && /i pray thee/.test(title)) return note(["Manoah is asking for the messenger to return and teach them more.", "The request shows a father wanting clear guidance for raising the promised child.", "🙏 A prayer for instruction", "👂 They want to obey well", "👶 The child matters already", "Holy calling makes Manoah seek clarity, not control."]);
    return note(["The phrase keeps the focus on Samson's calling before he is born.", "The family is learning that this child must be raised under God's instruction, not ordinary preference.", "📖 The calling is repeated", "👶 Parenting is shaped by holiness", "🙏 God must teach them", "The chapter keeps slowing down so the reader feels the seriousness of Samson's beginning."]);
  }

  if (section.reference === "Judges 13:13-18") {
    if (/angel of the lord said unto manoah/.test(title) || /of all that/.test(title)) return note(["The angel repeats the earlier instructions instead of giving Manoah a new plan.", "The point is obedience, not novelty.", "🕊️ The message is repeated", "📜 The command stands", "✅ Careful obedience matters", "God's earlier word was already enough to follow."]);
    if (/i pray thee let us detain/.test(title) || /said unto the angel of the lord/.test(title)) return note(["Detain means to keep the visitor long enough to prepare a meal.", "Manoah wants to honor the messenger even before fully grasping who He is.", "🍽️ Hospitality is offered", "🕊️ Reverence is growing", "❓ Understanding is still partial", "The family responds to holiness with honor."]);
    if (/lord i pray thee let us detain/.test(title)) return note(["The request is earnest and respectful.", "Manoah is not trying to control the messenger. He is trying to honor Him.", "🙏 Respectful appeal", "🍽️ A meal is prepared", "🧠 Reverence shapes the moment", "The line shows humble hospitality before revealed holiness."]);
    return note(["Manoah's conversation keeps turning back to God's instructions for the child.", "He is learning that the child must be ordered by God's word, not by human instinct.", "📖 God's word leads", "👶 The child's life is set apart", "🙏 Manoah listens", "The chapter keeps returning to instruction because the calling is serious."]);
  }

  if (section.reference === "Judges 13:19-24") {
    if (/offered it upon a rock unto the lord/.test(title) || /a rock unto the lord/.test(title)) return note(["Offering it on a rock turns an ordinary place into an altar of worship.", "The sacrifice is directed to the LORD, not to the messenger as though He were mere man.", "🪨 A rock becomes an altar", "🔥 Worship is offered", "🙏 The LORD is honored", "The family answers the holy encounter with sacrifice."]);
    if (/did wonderously/.test(title)) return note(["Wonderously means in a way that inspires awe.", "The sign shows that this messenger belongs to the realm of God's holy power.", "✨ A marvelous sign", "😨 Holy awe", "🧠 The moment is beyond ordinary", "The action teaches Manoah that this is no common visitor."]);
    if (/angel of the lord ascended in the flame/.test(title) || /of the lord ascended in the flame/.test(title)) return note(["Ascending in the flame reveals the messenger's heavenly holiness.", "The sacrifice fire becomes the place where the angel departs from their sight.", "🔥 Flame and holiness meet", "🕊️ The angel departs", "😨 Worshipful fear deepens", "The sign leaves no doubt that God has visited them."]);
    return note(["The phrase belongs to the sacrifice and sign given to Manoah and his wife.", "God confirms His word with a holy act they will never forget.", "📖 The promise is confirmed", "🔥 The sign is visible", "🙏 Fear turns to worship", "The family now knows the message truly came from God."]);
  }

  if (section.reference === "Judges 13:25-25") {
    if (/spirit of the lord began to move/.test(title) || /of the lord began to move him/.test(title) || /began to move him at times/.test(title)) return note(["The Spirit beginning to move Samson means God's power starts stirring him for future work.", "This is the first sign that the promised deliverer is being prepared.", "💪 Divine stirring", "👦 Samson is being readied", "⚔️ Future conflict is coming", "The chapter ends by showing God has started the work within Samson."]);
    return note(["This phrase closes the birth story by showing movement before battle.", "God is already at work in Samson before his famous acts begin.", "📖 The story shifts forward", "💪 Strength is being awakened", "🙌 God begins first", "Samson's future starts with God's Spirit, not with his own ambition."]);
  }

  if (section.reference === "Judges 14:1-6") {
    if (/it was of the lord/.test(title) || /of the lord that he sought/.test(title) || /occasion against/.test(title)) return note(["It was of the LORD means God is working through this troubled situation for His own purpose.", "Seeking an occasion against the Philistines means the conflict will become a doorway for judgment on them.", "🙌 God is still acting", "⚔️ The Philistines remain the target", "🧠 Providence is at work", "The line does not praise Samson's desire. It shows God overruling it."]);
    if (/spirit of the lord came mightily upon/.test(title) || /of the lord came mightily upon him/.test(title)) return note(["Came mightily upon him means the sudden strength came from God's Spirit, not from Samson's body alone.", "The power in the scene is divine empowerment.", "💪 Strength from God", "🦁 Danger is answered", "🙌 The Spirit enables him", "Samson's strength is introduced as a gift, not as self-made greatness."]);
    return note(["Samson's first move toward the Philistines is already tangled with danger and purpose.", "The chapter is already mixing troubled desire with God's larger purpose.", "👀 Samson desires", "⚠️ The choice is uneasy", "🙌 God still rules", "The story is messy, but the LORD is not absent from it."]);
  }

  if (section.reference === "Judges 14:7-12") {
    if (/he took thereof in his hands/.test(title) || /went on eating/.test(title) || /came to his father and mother/.test(title)) return note(["Taking it in his hands means Samson carries the honey out of the lion's carcass.", "The detail matters because this strange scene becomes the basis of his riddle.", "🍯 Honey is gathered", "🦁 It came from the lion", "🧩 The later riddle is being prepared", "The story is storing up meaning for what Samson will say next."]);
    if (/hands and went on eating/.test(title)) return note(["Went on eating makes the moment sound casual, even though the source of the honey is shocking.", "Samson treats the strange find as something usable and enjoyable.", "🍯 Honey is enjoyed", "👣 He keeps going", "😶 The scene stays odd", "The chapter wants the reader to feel the strangeness before the riddle appears."]);
    if (/went down unto the woman/.test(title)) return note(["Going down to the woman keeps Samson moving toward the marriage he wants.", "The line ties the honey episode back to the larger marriage story.", "💍 Marriage remains in view", "👣 Samson continues", "📖 The story reconnects", "The lion episode is not separate. It belongs inside the same Philistine path."]);
    return note(["The phrase belongs to the strange middle part of the chapter where danger becomes sweetness.", "That unusual mixture is exactly what Samson later turns into a riddle.", "🦁 Danger came first", "🍯 Sweetness came after", "🧩 Meaning is building", "The story is setting up a puzzle from a bizarre event."]);
  }

  if (section.reference === "Judges 14:13-18") {
    if (/samson s wife entice thy husband/.test(title) || /they said unto samson s wife/.test(title)) return note(["Entice means pressure him into telling the answer.", "The companions turn to manipulation because they cannot solve the riddle honestly.", "🗣️ Pressure is applied", "😢 The wife is used", "⚠️ Deceit replaces fairness", "The contest turns bitter because truth is forced open."]);
    if (/we burn thee and thy father s house/.test(title) || /burn thee and thy father s house with/.test(title)) return note(["Burning the house is a threat of deadly violence.", "The line shows how quickly Philistine celebration turns savage.", "🔥 A violent threat", "🏠 Family is endangered", "⚠️ Fear drives betrayal", "The riddle game has become a matter of survival."]);
    if (/seventh day/.test(title)) return note(["The seventh day means the pressure has gone on for days before they finally break Samson's wife.", "The number shows persistence in deceit.", "📅 The pressure lasts", "😓 Weariness grows", "🧠 Persistence wins access", "The answer is not discovered. It is squeezed out."]);
    return note(["Samson's riddle is now being broken open by pressure instead of wisdom.", "The companions cannot solve it, so they turn to coercion and threat.", "🧩 The riddle stands", "🔥 Fear enters", "💔 Trust is broken", "The chapter is showing celebration rotting into betrayal."]);
  }

  if (section.reference === "Judges 14:19-20") {
    if (/spirit of the lord came upon him/.test(title) || /of the lord came upon him and/.test(title) || /the lord came upon him and he/.test(title)) return note(["The Spirit coming upon him means Samson's violent strike is carried out with divine empowerment against the Philistines.", "The chapter keeps linking his power to the LORD, not to private force.", "💪 The Spirit empowers", "⚔️ The Philistines are struck", "🙌 God remains active", "Even here, Samson's strength is still presented as Spirit-given."]);
    if (/he went up to his father s house/.test(title)) return note(["Going up to his father's house means Samson leaves in anger instead of settling into the marriage.", "The wedding story breaks apart rather than becoming stable.", "🏠 He returns home", "💔 The marriage fractures", "😠 Anger drives the move", "The chapter ends with separation, not peace."]);
    return note(["The aftermath of the broken riddle leaves anger, violence, and a marriage falling apart.", "The scene ends in anger, violence, and a marriage that falls apart.", "⚔️ Violence follows betrayal", "💔 The bond breaks", "📖 The story remains unsettled", "What began as desire is already producing damage."]);
  }

  if (section.reference === "Judges 15:1-6") {
    if (/wheat harvest/.test(title) || /samson visited his wife/.test(title) || /with a kid/.test(title)) return note(["Wheat harvest places the scene in a real season of the year.", "Samson comes with a young goat as a customary gift, expecting to visit his wife.", "🌾 Harvest season", "🐐 A visit gift", "🏠 Samson expects welcome", "The ordinary details make the coming conflict feel even sharper."]);
    if (/i be more blameless than the philistines/.test(title) || /concerning them now shall i/.test(title)) return note(["Blameless means Samson thinks he now has stronger reason to strike back.", "He believes the wrong done to him justifies his revenge.", "⚖️ Samson claims justification", "😠 Anger hardens", "🔥 Revenge is coming", "The line shows how quickly grievance turns into destruction."]);
    return note(["Personal hurt is about to spill over into wide public damage across Philistine land.", "Personal hurt is about to spill over into wider public damage.", "💔 Private offense", "🔥 Public retaliation", "⚠️ The conflict spreads", "What happened at home is about to burn across the land."]);
  }

  if (section.reference === "Judges 15:7-12") {
    if (/samson said unto them though ye have/.test(title)) return note(["Samson is saying their action will not end the conflict.", "He intends to strike back before he rests.", "🗣️ Samson answers", "😠 Revenge continues", "⚔️ The cycle deepens", "The line shows retaliation feeding retaliation."]);
    if (/philistines went up and pitched in judah/.test(title)) return note(["Pitched in Judah means the Philistines set up camp inside Israel's territory.", "Their response to Samson now threatens the whole region.", "⛺ Enemy camp in Judah", "🏠 Israel is pressured", "⚠️ The conflict spreads", "Samson's private feud is becoming public danger."]);
    if (/to bind samson are we come/.test(title) || /answered to bind samson/.test(title) || /bind samson are we come up/.test(title)) return note(["Bind means tie him up and hand him over.", "Judah is choosing surrender over resistance because it fears Philistine power.", "⛓️ Samson is to be tied", "😟 Judah is afraid", "💔 Israelites hand over an Israelite", "The line shows how low Israel has sunk under Philistine rule."]);
    return note(["Judah's response to Philistine pressure is fear instead of resistance.", "Instead of fighting the oppressor, they move to restrain their own deliverer.", "⚠️ Fear rules Judah", "⛓️ Samson is handed over", "💔 Oppression has bent the people", "The chapter shows bondage shaping Israel's instincts."]);
  }

  if (section.reference === "Judges 15:13-18") {
    if (/spirit of the lord came mightily upon/.test(title) || /of the lord came mightily upon him/.test(title) || /lord came mightily upon him/.test(title)) return note(["Came mightily upon him means the LORD suddenly empowers Samson again.", "The strength for this victory comes from God's Spirit, not from the ropes breaking by chance.", "💪 Divine strength", "⛓️ Bondage is broken", "🙌 God empowers deliverance", "The battle turns because the Spirit acts."]);
    if (/cords that were upon his arms became as flax/.test(title)) return note(["Flax burns or snaps easily when touched by fire.", "The cords becoming like flax means the ropes lose all power to hold him.", "⛓️ Ropes fail", "🔥 Flax is easily consumed", "💪 Samson is freed", "What bound him becomes suddenly useless."]);
    if (/a new jawbone of an ass/.test(title)) return note(["A jawbone is the bone from a donkey's mouth.", "Samson uses a crude, unexpected object as his weapon.", "🦴 An unlikely weapon", "🐴 Donkey jawbone", "⚔️ God can use little", "The victory does not depend on polished military tools."]);
    if (/slew a thousand men therewith/.test(title)) return note(["Therewith means with that jawbone.", "The line stresses the scale of the victory through an astonishingly simple weapon.", "⚔️ A thousand fall", "🦴 The jawbone is enough", "🙌 The triumph is extraordinary", "The chapter wants the reader to feel how overwhelming the deliverance is."]);
    return note(["Samson's jawbone victory turns bondage into sudden deliverance through God's power.", "The scene turns from bondage to sudden deliverance through God's power.", "⛓️ He was bound", "💪 Then strengthened", "⚔️ The enemy falls", "The LORD turns a helpless moment into triumph."]);
  }

  if (section.reference === "Judges 15:19-20") {
    if (/god clave an hollow place/.test(title) || /an hollow place that was/.test(title)) return note(["Clave means split open.", "God opens a place so water can come out for Samson.", "🪨 God opens the ground", "💧 Water is provided", "🙌 Mercy follows victory", "The same God who gave strength now gives refreshment."]);
    if (/he had drunk his spirit came again/.test(title) || /drunk his spirit came again/.test(title) || /his spirit came again and he revived/.test(title)) return note(["His spirit came again means his life and strength returned after drinking.", "The phrase describes recovery, not the Holy Spirit leaving and returning.", "💧 Water restores him", "🫁 Strength returns", "✅ He revives", "The line simply means Samson comes back to life and vigor."]);
    if (/judged israel/.test(title)) return note(["Judged Israel twenty years means Samson served as Israel's judge for a long stretch under Philistine pressure.", "The note widens from one miracle to his larger place in Israel's story.", "⚖️ He really judged Israel", "⏳ Twenty years are marked", "⚔️ Philistine days continue", "Samson was not just a strong man in stories. He held the role of judge."]);
    return note(["The water God gives Samson after battle shows that strength still needs sustaining mercy.", "The chapter ends by showing that the strong deliverer still needs God to sustain his life.", "💧 He becomes thirsty", "🙏 Need drives prayer", "🙌 God provides", "Strength in battle does not remove dependence on God."]);
  }

  return note(["This phrase belongs to Day 65's Judges reading and should be read inside its own scene.", "The wording is there to explain the action, people, or holy meaning in front of the reader.", "📖 The story is specific", "🧠 The phrase has a job", "⚠️ The wording matters", "Each line should make the scene clearer to a new Bible reader."]);
}

const day65JudgesSupplementalSections = DAY_61_80_JUDGES_1_15_SUPPLEMENTAL_SECTIONS
  .filter((section) => section.chapter >= 12 && section.chapter <= 15)
  .map((section) => ({
    ...section,
    title: day65JudgesSectionTitles[section.reference] ?? section.title,
    phrases: section.phrases.map(([phraseTitle]) => [
      phraseTitle,
      explainDay65JudgesAt95(section as PersonalLeviticusPhraseSectionInput, stripLeadingEmoji(phraseTitle)),
    ]) as [string, string][],
  }));

export const JUDGES_1_15_PERSONAL_SECTIONS = [
  ...day62JudgesSupplementalSections,
  ...day63JudgesSupplementalSections,
  ...day64JudgesEightAndNineSections,
  ...day64JudgesTenAndElevenSections,
  ...day65JudgesSupplementalSections,
  ...judgesTenToFifteenFallbackSections.filter((section) => section.chapter < 10 || section.chapter > 15),
  ...DAY_61_80_JUDGES_1_15_SUPPLEMENTAL_SECTIONS.filter((section) => section.chapter < 1 || section.chapter > 15),
];
