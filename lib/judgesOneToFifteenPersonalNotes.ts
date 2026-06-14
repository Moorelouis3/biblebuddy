import { JUDGES_DEEP_NOTES } from "./judgesDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

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

function teachingLine(title: string) {
  const cleanTitle = title.replace(/^[^\p{L}\p{N}]+/u, "").trim().toLowerCase();

  if (/died|buried|fell|die/.test(cleanTitle)) {
    return "This wording reminds the reader that every judge was temporary.";
  }

  if (/judged|judge|head|captain/.test(cleanTitle)) {
    return "This phrase explains the kind of leadership Israel was depending on in that moment.";
  }

  if (/lord|spirit|deliver|delivered|called on/.test(cleanTitle)) {
    return "This phrase keeps God's action at the center of the story.";
  }

  if (/vow|mouth|words|witness/.test(cleanTitle)) {
    return "This phrase shows that spoken words before God are serious.";
  }

  if (/daughter|virginity|fellows|wept|low/.test(cleanTitle)) {
    return "This phrase slows the reader down to feel the human cost of the scene.";
  }

  if (/ammon|philistines|battle|war|smote|slew/.test(cleanTitle)) {
    return "This phrase shows how Israel's trouble becomes visible through conflict.";
  }

  if (/land|gilead|mizpeh|border|shamir|bethlehem/.test(cleanTitle)) {
    return "This phrase grounds the lesson in real places, not vague ideas.";
  }

  if (/evil|gods|baalim|ashtaroth|sinned|strange/.test(cleanTitle)) {
    return "This phrase names the spiritual problem underneath the crisis.";
  }

  return "This phrase helps the reader understand why the detail belongs in the story.";
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
    phrase("🪵 Wilt Not Thou Possess That Which Chemosh Thy God Giveth Thee", "This phrase uses Ammon's own way of thinking to expose the land claim.", ["🪵 False god named", "🏞️ Possession argument", "🗣️ Jephthah reasons"], "Jephthah is arguing that Israel will hold what the LORD gave."),
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
    phrase("❓ Is There Never A Woman Among The Daughters Of Thy Brethren", "This question shows his parents' concern about marrying among the Philistines.", ["❓ Parental concern", "👥 Covenant people", "⚠️ Mixed loyalty"], "They sense the spiritual danger in the request."),
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
    phrase("🔥 Lest We Burn Thee And Thy Father's House", "This threat shows how quickly the Philistine companions use violence.", ["🔥 Threat", "😨 Pressure", "💔 Fear"], "The wedding feast turns dangerous."),
    phrase("😢 Samson's Wife Wept Before Him", "Samson's wife wept before him shows emotional pressure being used to get the answer.", ["😢 Tears", "🗣️ Pressure", "🧩 Secret sought"], "The riddle becomes a test of loyalty."),
    phrase("🐄 If Ye Had Not Plowed With My Heifer", "If ye had not plowed with my heifer is Samson's angry way of saying they manipulated his wife.", ["🐄 Harsh image", "😠 Anger", "🧩 Riddle solved by pressure"], "The phrase shows Samson's rough speech and wounded pride."),
    phrase("💪 The Spirit Of The LORD Came Upon Him", "The Spirit of the LORD came upon him again connects Samson's action to divine empowerment.", ["💪 Power", "⚔️ Conflict", "🕊️ Spirit"], "The chapter ends with strength, anger, and broken relationships tangled together."),
  ]),
  section(15, 1, 5, "Samson Burns The Philistine Fields", "🔥", [
    phrase("🌾 In The Time Of Wheat Harvest", "In the time of wheat harvest sets the scene during an economically important season.", ["🌾 Harvest", "💰 Food supply", "🔥 Vulnerable fields"], "The timing makes Samson's revenge especially damaging."),
    phrase("🚪 I Verily Thought That Thou Hadst Utterly Hated Her", "This line is the father-in-law's explanation for giving Samson's wife away.", ["🚪 Broken marriage", "🗣️ Excuse", "💔 Betrayal"], "The phrase explains the personal conflict behind the next act."),
    phrase("🦊 Three Hundred Foxes", "Three hundred foxes are the animals Samson uses in his revenge.", ["🦊 Foxes", "🔥 Firebrands", "🌾 Fields targeted"], "The strange detail shows Samson's creativity and anger."),
    phrase("🔥 Burnt Up Both The Shocks, And Also The Standing Corn", "This phrase describes the destruction of Philistine food and wealth.", ["🔥 Fire", "🌾 Harvest ruined", "⚔️ Retaliation"], "Samson's personal conflict becomes national conflict."),
  ]),
  section(15, 6, 8, "Violence Escalates", "⚠️", [
    phrase("❓ Who Hath Done This", "Who hath done this shows the Philistines investigating the destruction.", ["❓ Investigation", "🔥 Burned fields", "⚔️ Retaliation cycle"], "The question pulls Samson's private revenge into public conflict."),
    phrase("🔥 Burnt Her And Her Father With Fire", "Burnt her and her father with fire shows brutal Philistine retaliation.", ["🔥 Violence", "💔 Tragedy", "⚠️ Escalation"], "The cycle of revenge becomes darker."),
    phrase("⚔️ Though Ye Have Done This", "Though ye have done this begins Samson's answer to the Philistine violence.", ["⚔️ Response", "😠 Revenge", "🔥 Escalation"], "Samson does not step back from the cycle."),
    phrase("🪨 Dwelt In The Top Of The Rock Etam", "Dwelt in the top of the rock Etam shows Samson withdrawing after striking them.", ["🪨 Hiding place", "📍 Etam", "⚔️ Aftermath"], "The place becomes the setting for the next confrontation."),
  ]),
  section(15, 9, 13, "Judah Hands Samson Over", "⛓️", [
    phrase("⛺ The Philistines Went Up", "The Philistines went up means the enemy comes against Judah because of Samson.", ["⛺ Enemy movement", "⚔️ Pressure", "👥 Judah threatened"], "Samson's conflict now affects his own people."),
    phrase("❓ Knowest Thou Not That The Philistines Are Rulers Over Us", "This question from Judah shows fear and resignation.", ["❓ Fearful question", "👑 Philistine rule", "😟 Accepted oppression"], "Judah sounds more afraid of Samson's disruption than Philistine control."),
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

export const JUDGES_1_15_PERSONAL_SECTIONS = [...generatedJudgesOneToNineSections, ...judgesTenToFifteenFallbackSections];
