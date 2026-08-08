export type JudgesTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesTenRawNotes(rawText: string): JudgesTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Judges 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+10:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Judges\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 10:${startVerse}` : `Judges 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Judges 10 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_TEN_RAW_NOTES = `# Judges 10:1-5
# ⚖️ Tola And Jair Judge Israel
---
## ⚔️ Arose To Defend Israel

Abimelech was never a true judge.

He crowned himself king and split Israel with violence.

Tola arises now to save Israel from that chaos.

The word defend carries the same weight as deliver, the word used for earlier judges.

Tola is not fighting a foreign army.

He is healing damage that came from inside Israel.

⚔️ Abimelech ruled through violence

🩹 Tola arises after civil chaos

🛡️ Defend carries the weight of deliver

📖 God raises leaders to heal Israel

## 👨‍👦 Tola The Son Of Puah, The Son Of Dodo

Tola's family line is named three generations deep.

His father was Puah and his grandfather was Dodo.

Naming a full lineage proved someone had real standing in Israel.

Tola shares a name with one of Issachar's own sons listed back in Genesis forty six.

That shared name ties this judge back to his tribe's founding family.

👨‍👦 Puah is Tola's father

👴 Dodo is Tola's grandfather

📜 A full lineage proved real standing

📖 Tola's name echoes Issachar's own son

## 🌾 A Man Of Issachar

Issachar was one of the twelve tribes of Israel.

The tribe descended from Jacob's ninth son.

Issachar's land sat in the fertile Jezreel Valley in the north.

This tribe rarely appears as a leader elsewhere in Judges.

Tola's rise here is a rare spotlight on a usually quiet tribe.

🌾 Issachar was one of Jacob's sons

🗺️ Their land sat in the Jezreel Valley

🤫 Issachar rarely leads elsewhere in Judges

📖 This chapter gives them a rare spotlight

## 🏔️ He Dwelt In Shamir In Mount Ephraim

Shamir was a town inside the hill country of Ephraim.

Tola belonged to Issachar but lived on land that was not his own tribe's.

Judges did not always rule from inside their own tribal borders.

Tola's influence reached across tribal lines instead of staying local.

🏔️ Shamir sat in Ephraim's hill country

🌾 Tola himself belonged to Issachar

🧭 He judged from outside his own tribe

➡️ His influence crossed tribal lines

## 📆 Judged Israel Twenty And Three Years

Twenty and three years is one of the longer judgeships in this book.

No war and no crisis is recorded during that whole span.

A quiet stretch was still worth recording as part of Israel's story.

Peace under a faithful judge mattered as much as any battlefield victory.

📆 Twenty and three years is a long judgeship

🕊️ No war is recorded during it

✍️ Quiet years still counted as history

📖 Peace itself was worth remembering

## ⚰️ Buried In Shamir

Tola was buried in the same town he had lived in.

Many judges in this book die suddenly or violently instead.

Tola's death reads as calm and unremarkable.

A quiet burial closes out a quiet, stable life.

⚰️ Tola was buried where he lived

😌 His death was calm, not violent

🕊️ A stable life closed peacefully

➡️ Quiet endings still mattered

## 🏔️ Jair, A Gileadite

Gilead was the region east of the Jordan River.

Its mountains and open land favored raising flocks.

Jair rises as judge right after Tola's death.

Gilead already carries deep meaning from Jacob's own story with Laban.

A new judge rises from ground tied to Israel's oldest promises.

🏔️ Gilead sat east of the Jordan

🐑 Its land favored herding and flocks

🪨 Gilead recalls Jacob's peace with Laban

📖 A new judge rises from old ground

## 📆 Judged Israel Twenty And Two Years

Twenty and two years under Jair adds to Tola's twenty and three.

Together the two judgeships cover close to two generations.

That long calm makes the coming Ammonite crisis feel sharper by contrast.

Scripture often lets quiet years build before the next storm arrives.

📆 Twenty and two years continues the calm

➕ Two judges span close to two generations

⚡ Calm years sharpen the crisis ahead

📖 Quiet often comes before a storm

## 🐴 Thirty Sons That Rode On Thirty Ass Colts

Riding a young donkey was a mark of wealth and rank in this culture.

Judges five already links riding donkeys to people of high standing.

Thirty sons each with an animal of his own shows a wealthy household.

Jair was not a poor farmer.

He led a large and prosperous family.

🐴 Riding a colt marked wealth and rank

🎶 Judges five links this custom to rank

👨‍👦‍👦 Thirty sons show a large household

📖 Jair led with real resources

## 🏘️ Thirty Cities, Which Are Called Havothjair

Havothjair means the villages of Jair.

The name is drawn directly from this judge himself.

Each of his thirty sons apparently controlled one town in the region.

Naming a whole cluster of towns after one family shows lasting influence.

Long after Jair died, people still remembered whose family had ruled there.

🏘️ Havothjair means villages of Jair

👨‍👦 Each son likely held one town

🗺️ Thirty towns show real influence

📖 The name outlasted the man

## 🏔️ Jair Died, And Was Buried In Camon

Camon was a town inside Gilead, the same region Jair had judged.

Like Tola before him, Jair dies with no violence recorded.

Two judges in a row close their lives in ordinary, peaceful ways.

This calm ending is about to break sharply in the very next verse.

🏔️ Camon sat inside Gilead

😌 Jair died without violence, like Tola

🕊️ Two peaceful endings in a row

➡️ That calm breaks sharply next

# Judges 10:6-9
# 😈 Israel Turns To Foreign Gods
---
## 🔁 Did Evil Again In The Sight Of The LORD

The word again marks the return of a cycle already repeated in this book.

Israel does not fall into sin only once.

The same pattern keeps repeating across generations.

Each cycle moves through sin, oppression, a cry, and rescue.

This verse signals that the wheel is about to turn once more.

🔁 Again marks a repeating cycle

📖 Sin, oppression, a cry, then rescue

⚠️ The pattern returns once more

➡️ Judges keeps retelling this same wheel

## ⛈️ Served Baalim, And Ashtaroth

Baalim is the plural of Baal, a Canaanite storm and fertility god.

Ashtaroth is the plural of Ashtoreth, a goddess linked to love and war.

Worshiping the plural forms means Israel served many local versions of these gods.

These same two gods already tempted Israel earlier in the book of Judges.

⛈️ Baal was a Canaanite storm god

💫 Ashtoreth was a fertility goddess

🔢 Plural forms mean many local versions

📖 These same gods tempted Israel before

## 🗺️ The Gods Of Syria, And The Gods Of Zidon, And The Gods Of Moab

This verse lists gods from seven different peoples that Israel chose to worship.

Syria, Zidon, Moab, Ammon, and Philistia all sit close to Israel's own borders.

Israel did not fall for one false religion.

It borrowed a little from nearly every neighbor around it.

This is the widest spread of idolatry named anywhere in the book of Judges.

🗺️ Seven nations worth of gods are named

🧭 All of them border Israel's own land

🌐 Israel borrowed from every neighbor

📖 This is Judges' widest idolatry list

## 🚫 Forsook The LORD, And Served Not Him

Forsook means Israel completely abandoned its relationship with God.

This is not distraction.

It is a full switch of loyalty to other gods.

The verse repeats the point twice for emphasis.

Total abandonment is what finally provokes the anger described next.

🚫 Forsook means fully abandoned

🔁 The verse repeats this point twice

💔 Loyalty shifted completely away from God

➡️ Full abandonment provokes what comes next

## 🔥 The Anger Of The LORD Was Hot Against Israel

This phrase describes God's response as intense, not distant or indifferent.

God's anger here answers Israel's own choice to abandon him.

This same phrase appears again and again throughout the book of Judges.

It marks the turning point where oppression is about to begin.

🔥 God's anger is described as hot

⚖️ It answers Israel's own choice

🔁 This phrase repeats often in Judges

➡️ It signals oppression is about to start

## 💰 Sold Them Into The Hands Of The Philistines, And Into The Hands Of The Children Of Ammon

Sold is a figure of speech for God allowing Israel to fall under foreign control.

Two enemies are named at once, the Philistines from the west and Ammon from the east.

Israel faces pressure from both directions at the same time.

No side of the land is left safe.

💰 Sold means handed over to control

🧭 Philistines pressed from the west

🌅 Ammon pressed from the east

📖 No side of Israel stayed safe

## 📆 Eighteen Years

Eighteen years is one of the longest oppressions recorded anywhere in Judges.

It lasted longer than many of the judgeships that came before it.

The length itself shows how deep Israel's rebellion had gone.

A long punishment matched a long pattern of unfaithfulness.

📆 Eighteen years is a long oppression

📏 It outlasts many earlier judgeships

⚖️ Length matched the depth of rebellion

📖 A long fall led to a long fix

## 🗺️ On The Other Side Jordan, In The Land Of The Amorites, Which Is In Gilead

This phrase points east of the Jordan River, the region Jair had ruled.

The tribes of Reuben, Gad, and half of Manasseh had settled there.

Being farthest from the rest of Israel left them more exposed to Ammon.

Geography itself decided who would suffer first under this oppression.

🗺️ This region sits east of the Jordan

🏕️ Reuben, Gad, and half Manasseh lived there

📍 Distance left them more exposed

➡️ Geography shaped who suffered first

## 🌊 Passed Over Jordan To Fight Also Against Judah

Ammon does not stay content with the tribes already under its control.

It crosses the Jordan to attack Judah, Benjamin, and Ephraim as well.

The threat spreads from one region into the heart of Israel's land.

What began as local pressure has now become a national crisis.

🌊 Ammon crosses the Jordan River

⚔️ Judah, Benjamin, and Ephraim are attacked

📈 A local threat becomes a national one

📖 The crisis now reaches everyone

## 📕 Israel Was Sore Distressed

Sore is an old word meaning severe, not physical soreness.

Distressed describes a nation under real, crushing pressure.

Eighteen years of this, plus an expanding war, finally reach a breaking point.

The next verse shows exactly where that breaking point leads.

📕 Sore is an old word for severe

😖 Distressed means under crushing pressure

⏳ Years of pressure reach a peak

➡️ The next verse shows where this leads

# Judges 10:10-14
# 🚫 God Refuses To Deliver
---
## 🗣️ We Have Sinned Against Thee

This is a direct, plain confession, not an excuse.

Earlier cycles in Judges rarely name sin this plainly.

Honesty here is the first real step toward change.

Confession comes before any rescue is offered.

🗣️ This is a direct confession

📖 Earlier cries rarely name sin so plainly

✅ Honesty is the first real step

➡️ Confession comes before any rescue

## 🌱 Both Because We Have Forsaken Our God, And Also Served Baalim

Israel names two connected sins instead of one vague failure.

Forsaking God was the root problem.

Serving Baalim was what filled the space left behind.

Naming both shows Israel finally understands the full shape of its failure.

🌱 Forsaking God was the root sin

🕳️ Baal worship filled the empty space

🔗 Both sins are named together

📖 Full honesty names the whole failure

## 🏺 Did Not I Deliver You From The Egyptians

God begins his answer by reminding Israel of the exodus itself.

This was the first and greatest rescue in Israel's whole history.

God is not silent here.

He recounts a long record before he responds any further.

🏺 God recalls the Exodus first

🥇 It was Israel's greatest rescue

📜 God recounts history before responding

📖 Every rescue is measured against this one

## 📜 From The Amorites, From The Children Of Ammon, And From The Philistines

God lists three more nations he had already delivered Israel from in the past.

Ammon and the Philistines are named here as repeat offenders from verse seven.

Israel has faced these exact enemies before, and God rescued them each time.

History is not repeating by accident.

📜 Three more past deliverances are listed

🔁 Ammon and Philistia are repeat enemies

🛡️ God rescued Israel from them before

📖 Israel keeps forgetting the same lesson

## ❓ The Zidonians Also, And The Amalekites, And The Maonites

These three nations are not described anywhere else in the book of Judges.

Their oppressions are only known because God names them here.

Many scholars believe Maonites points to a people connected to Maon or Midian.

God's memory of Israel's rescues reaches further back than the text itself records.

❓ These nations appear nowhere else in Judges

📖 Only this verse records their oppression

🗺️ Maonites likely links to Maon or Midian

➡️ God remembers what scripture leaves out

## 🔁 Ye Cried To Me, And I Delivered You Out Of Their Hand

God is describing a cycle Israel has lived through many times.

Israel cries out, and God delivers, every time without exception.

God is pointing out how many times this exact pattern has played out.

A pattern repeated this often should have taught Israel something by now.

🔁 The same cycle repeats every time

🗣️ Israel cries, then God delivers

📊 God counts how often this happened

📖 The pattern alone should teach a lesson

## 🔀 Yet Ye Have Forsaken Me, And Served Other Gods

Yet marks a sharp turn after that whole long list of past rescues.

Every single rescue was met with the same betrayal afterward.

This is not one lapse.

It is a pattern repeated after every deliverance.

🔀 Yet marks a sharp turn here

💔 Every rescue was met with betrayal

🔁 The pattern repeats after each deliverance

📖 God names the full weight of it

## 😳 I Will Deliver You No More

God speaks one of the most startling lines found anywhere in Judges.

Every earlier cycle ended in rescue no matter how bad the sin had been.

Here God says plainly that the pattern will not simply repeat on its own.

Grace was never something to take for granted.

😳 A startling refusal from God

🔁 Every earlier cycle ended in rescue

🛑 This time God says otherwise

📖 Grace was never something to take for granted

## 🗣️ Go And Cry Unto The Gods Which Ye Have Chosen

God tells Israel to ask the false gods for the rescue only he can give.

This is not a real offer.

It exposes just how useless those gods actually are.

Baal and Ashtoreth cannot deliver anyone from anything.

🗣️ God tells Israel to ask its idols

🚫 This exposes how useless they are

⛈️ Baal cannot deliver anyone

➡️ Israel must feel its choice first

## 📕 In The Time Of Your Tribulation

Tribulation means a season of severe trouble or crushing pressure.

This word describes the eighteen years already suffered under Ammon and the Philistines.

God is naming the real suffering happening right now, not a vague future threat.

The trouble is already here, and Israel is told to face it alone for now.

📕 Tribulation means severe trouble

⏳ It names the eighteen years already suffered

📍 The suffering is happening right now

➡️ Israel is told to face it alone

# Judges 10:15-16
# 🙏 Israel Repents And Puts Away The Gods
---
## 🙌 Do Thou Unto Us Whatsoever Seemeth Good Unto Thee

Israel stops trying to bargain and simply surrenders to whatever God decides.

This is different from earlier confessions that only asked for rescue.

Full surrender replaces any attempt to control the outcome.

Israel finally trusts God's judgment over its own preference.

🙌 Israel surrenders fully here

🚫 No bargaining or conditions attached

⚖️ God's judgment is trusted completely

📖 Real repentance lets go of control

## ⏰ Deliver Us Only, We Pray Thee, This Day

This day shows the urgency of a crisis already happening right now.

Israel is not asking for a future promise.

It needs help immediately.

The request stays simple even after a full and honest confession.

⏰ This day shows real urgency

🙏 Israel needs help immediately

✂️ The request stays simple and direct

➡️ Desperation strips prayer to its core

## 🗿 They Put Away The Strange Gods From Among Them

Strange gods means the foreign idols named back in verse six.

Israel backs up its words with a real, visible action.

Removing the idols was not private.

The whole community had to take part.

🗿 Strange gods means the foreign idols

✅ Israel backs words with real action

👥 The whole community took part

📖 Actions finally matched the confession

## 💔 His Soul Was Grieved For The Misery Of Israel

God's own reaction here is described in deeply personal language.

Grieved means God felt real sorrow over Israel's suffering, not distant judgment.

Just verses earlier, God said he would deliver Israel no more.

God's compassion moves ahead of Israel's own next request for help.

💔 Grieved means real sorrow, not distance

😢 God feels Israel's suffering personally

🔀 This follows his earlier refusal

📖 Compassion moves before Israel even asks

# Judges 10:17-18
# ⚔️ Gilead Searches For A Leader
---
## ⛺ The Children Of Ammon Were Gathered Together, And Encamped In Gilead

Ammon moves from raiding into a full military buildup inside Israelite territory.

Encamping means setting up a fixed base to prepare for battle.

This is no longer scattered pressure.

It is one massed army in one place.

⛺ Ammon sets up a fixed camp

📍 The camp sits inside Gilead itself

⚔️ This signals a coming battle

➡️ The threat can no longer be ignored

## 🗼 The Children Of Israel Assembled Themselves Together, And Encamped In Mizpeh

This Mizpeh sits in Gilead, a different place from the Mizpah tied to Jacob and Laban.

Mizpeh means watchtower, a name shared by several lookout towns in ancient Israel.

Israel finally responds by gathering its own forces to meet the threat.

Both armies now sit close enough that a battle feels inevitable.

🗼 Mizpeh means watchtower

📍 This is a different Mizpeh from Jacob's

⚔️ Israel gathers to meet the threat

📖 Both camps now sit close together

## ❓ What Man Is He That Will Begin To Fight Against The Children Of Ammon

Israel has an army but no one yet willing to lead it.

This question exposes a real leadership gap at the moment it matters most.

Fear or uncertainty is keeping every capable man from stepping forward first.

The next chapter answers this exact question with an unexpected name.

❓ Israel has soldiers but no leader

😨 Fear keeps everyone from stepping forward

🕳️ A real leadership gap is exposed

➡️ The next chapter answers this question

## 👑 He Shall Be Head Over All The Inhabitants Of Gilead

Gilead's leaders offer real, lasting power as a reward for taking the first risk.

Whoever leads this fight will not just win a battle.

He will rule the region afterward.

A desperate people are willing to hand power to whoever proves brave enough to act.

👑 Leadership is offered as the reward

⚔️ Fighting first earns ruling power after

🚪 This sets up the next chapter's hero

📖 Desperate people reward whoever acts first
`.trim();

export const JUDGES_TEN_PERSONAL_SECTIONS = parseJudgesTenRawNotes(JUDGES_TEN_RAW_NOTES);
