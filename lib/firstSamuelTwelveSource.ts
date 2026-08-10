export type FirstSamuelTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwelveRawNotes(rawText: string): FirstSamuelTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 12:${startVerse}` : `1 Samuel 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Samuel 12 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWELVE_RAW_NOTES = `# FirstSamuel 12:1-3
# ⚖️ Samuel Puts Himself On Trial
---
## 👂 I Have Hearkened Unto Your Voice

"Hearkened" means listened and then actually obeyed.

Samuel had warned Israel plainly that a king would cost them.

He still carries out what they asked for anyway.

A true leader can follow a decision he personally disagreed with.

👂 Hearkened means listened and obeyed

⚠️ Samuel had already warned them

🤝 He carries out their choice anyway

📖 Real leadership can follow a decision it opposed

## 👑 Have Made A King Over You

Samuel is not claiming credit for Saul's crown.

The people demanded a king back in chapter eight.

Samuel simply carried out what Israel itself chose.

He wants that fact remembered before he says anything else.

👑 Samuel installed the king they asked for

📜 The demand began back in chapter eight

🙋 The choice belonged to the people

📖 Samuel wants that fact on the record

## 🚶 The King Walketh Before You

To walk before a nation means to lead and govern it.

That role used to belong to Samuel alone as judge.

Saul has now stepped into the place Samuel once held.

Israel's whole system of leadership just changed in front of them.

🚶 Walking before them means leading them

⚖️ Samuel once held that role alone

👑 Saul now stands in Samuel's place

📖 Israel's leadership has genuinely changed

## 🧓 I Am Old And Grayheaded

Samuel names his own age out loud, without complaint.

He has led Israel since he was a boy at Shiloh.

Naming his age marks the moment as a real handoff, not just a speech.

One generation of leadership is closing so another can begin.

🧓 Samuel openly names his age

🏛️ He has led since he was a boy

🔄 This moment marks a real handoff

📖 One generation ends so another begins

## 👦 My Sons Are With You

This line is not a boast about his sons.

Samuel's own sons were the corrupt judges from chapter eight.

Their dishonesty was the very reason Israel demanded a king.

Samuel names them plainly instead of hiding that painful part of his record.

👦 His sons caused real trouble

📜 Their corruption is described in chapter eight

😔 That failure led to Israel's demand

📖 Samuel names it instead of hiding it

## 🚶 Walked Before You From My Childhood

Samuel had served as God's prophet and judge since he was young.

First Samuel chapter three describes God calling him as a boy at Shiloh.

He is reminding Israel that his service spans his entire life.

His whole life has now led up to this single closing speech.

🚶 Samuel served from childhood on

📖 Chapter three describes his early calling

⏳ His service spans his entire life

➡️ This speech is where that life leads

## ⚖️ Witness Against Me Before The LORD

Samuel opens something like a courtroom trial against himself.

He calls on God and on Saul, the newly anointed king, to testify.

He is inviting Israel to accuse him publicly if he ever wronged them.

Very few leaders would ever risk a challenge this open.

⚖️ Samuel opens a public trial

🙏 God and Saul are named as witnesses

📢 Israel is invited to accuse him

📖 Few leaders would risk this

## 🐂 Whose Ox Have I Taken

Samuel lists specific ancient crimes a corrupt leader could commit.

Taking an ox or donkey meant seizing someone's livelihood by force.

Defrauding or oppressing someone meant using power to cheat the weak.

A bribe meant taking money to twist a legal decision unfairly.

🐂 Taking an ox meant stealing a livelihood

⚖️ Defrauding meant cheating someone weaker

💰 A bribe meant twisting justice for money

📖 Samuel denies every one of these crimes

## 🔁 I Will Restore It You

Samuel does not just deny wrongdoing in words.

He offers to pay back anything proven against him.

That offer only makes sense from someone confident he is innocent.

Samuel's integrity becomes the standard the king he installed will now be judged against.

🔁 Samuel offers full repayment

💪 Only real confidence makes that offer safe

⚖️ It proves his own integrity

📖 That integrity becomes the standard for Saul

# FirstSamuel 12:4-7
# 🙋 The People Clear Samuel's Name
---
## 🙋 Thou Hast Not Defrauded Us

The people answer Samuel's challenge immediately and completely.

They find no crime to bring against him at all.

His decades of leadership end with a clean, public record.

Few leaders in the Bible receive a verdict this clear.

🙋 The people answer at once

🧾 They find no crime against him

📜 His record ends completely clean

📖 Few leaders get a verdict this clear

## ✋ The LORD Is Witness Against You This Day

Samuel restates the verdict so it becomes official and permanent.

Calling God and Saul as witness turns this into a binding record.

The people cannot walk back their answer later.

Samuel is closing this chapter of his life on solid ground.

✋ Samuel makes the verdict official

🙏 God and Saul witness the agreement

🔒 The people cannot take it back

📖 Samuel closes this chapter cleanly

## 🎤 Stand Still That I May Reason With You

"Reason" here means Samuel is about to argue a formal case.

This pattern of God bringing a case against His people appears elsewhere in scripture.

Samuel is not just giving a farewell speech.

He is putting Israel's whole history of choices on trial next.

🎤 Reason means arguing a formal case

⚖️ This pattern appears elsewhere in scripture

📜 It is not just a farewell speech

📖 Israel's choices go on trial next

## 📖 The Righteous Acts Of The LORD

Samuel is about to retell Israel's history from Egypt onward.

He calls these events righteous acts, not just old stories.

Every deliverance in that history reveals something true about God's character.

Samuel wants Israel to hear their own story as evidence, not nostalgia.

📖 Samuel retells Israel's history

⚖️ He calls it righteous acts

🕊️ Each event reveals God's character

➡️ The history is offered as evidence

# FirstSamuel 12:8-11
# 🕰️ Samuel Retells The Judges
---
## 🇪🇬 When Jacob Was Come Into Egypt

Jacob was the father of the twelve tribes of Israel.

His family moved to Egypt generations before this speech, fleeing famine.

That move eventually led to centuries of slavery under later pharaohs.

Samuel starts the history all the way back at the very beginning.

🇪🇬 Jacob fathered the twelve tribes

🌾 His family moved to Egypt in famine

⛓️ That move led to slavery later

📖 Samuel starts at the very beginning

## 🙏 Your Fathers Cried Unto The LORD

Crying out here describes a desperate plea, not casual complaint.

It marks the exact moment Israel's slavery in Egypt became unbearable.

That single cry led directly to the exodus under Moses and Aaron.

Samuel shows a pattern about to repeat itself again and again.

🙏 Crying out means a desperate plea

⛓️ Slavery had become unbearable

🚶 That cry led to the exodus

📖 A pattern is about to repeat

## 😨 They Forgat The LORD Their God

Forgetting God here does not mean simply losing a memory.

It means Israel drifted into worshipping other gods instead.

This same cycle of forgetting repeats through the entire book of Judges.

Samuel is naming the root sin behind every disaster he is about to list.

😨 Forgetting God means turning to idols

🔄 This cycle repeats through Judges

📉 It is the root of every disaster

📖 Samuel names that root sin plainly

## ⚔️ Sold Them Into The Hand Of Sisera

God did not simply abandon Israel to these enemies.

Selling them means He allowed their own sin to have real consequences.

Sisera commanded the enemy army of Hazor.

The Philistines and the king of Moab oppressed Israel too.

Each of these oppressors matches a story found earlier in Judges.

⚔️ Selling them means real consequences for sin

🗺️ Three separate enemies attacked Israel

📜 Each one appears earlier in Judges

📖 God let their sin play out fully

## 🔥 We Have Sinned Because We Have Forsaken The LORD

This is the exact confession Israel repeats every time trouble comes.

Forsaking God means walking away from Him on purpose, not by accident.

Baalim and Ashtaroth were the false gods of Canaan that Israel kept worshipping instead.

Naming the sin honestly is always the first step back toward God.

🔥 This is Israel's repeated confession

🚶 Forsaking means walking away on purpose

👹 Baalim and Ashtaroth were Canaanite gods

📖 Honest confession is always the first step

## 🛡️ The LORD Sent Jerubbaal

Jerubbaal is another name for Gideon, the judge who defeated Midian.

He earned that name after tearing down his father's altar to Baal.

Samuel lists him first as the most famous deliverer in that era.

Every name on this list rescued Israel after they cried out to God.

🛡️ Jerubbaal is Gideon's other name

🔨 He earned it tearing down Baal's altar

🏆 He was the most famous deliverer

📖 Every name here answered a desperate cry

## 🧑‍⚖️ And Bedan And Jephthah And Samuel

Bedan is not named as a judge anywhere else in the Bible.

Some scholars believe it may be another name for Barak or a copying difference in the text.

Jephthah was a judge who defeated the Ammonites after being rejected by his own family.

Samuel names himself last, placing his own life inside this same rescue story.

🧑‍⚖️ Bedan's identity is genuinely uncertain

🤔 It may be another name for Barak

⚔️ Jephthah defeated the Ammonites

📖 Samuel places himself in the story too

## 🕊️ And Ye Dwelled Safe

Every cycle in Israel's history ends the same way once God sends help.

Crying out is followed by rescue, and rescue is followed by peace.

That repeated pattern is the whole point of the history lesson.

Samuel wants Israel to recognize the pattern before it happens again with a king.

🕊️ Peace always followed rescue

🔄 Cry, rescue, and peace repeat together

📚 That pattern is the whole lesson

📖 Samuel wants them to see it clearly

# FirstSamuel 12:12-15
# 👑 The King You Demanded
---
## 🐍 Nahash The King Of The Children Of Ammon

This is the same Nahash whose siege of Jabeshgilead is told in chapter eleven.

His threat was the final push that led Israel to demand a king right then.

Samuel is connecting this new king directly back to that one crisis.

Fear, not patience, is what actually drove Israel's decision.

🐍 This is chapter eleven's Nahash

🔥 His threat pushed Israel toward a king

😨 Fear, not patience, drove the choice

📖 Samuel connects the decision to that crisis

## 👑 When The LORD Your God Was Your King

This is the real accusation buried inside Samuel's history lesson.

Israel already had a king in the fullest sense, God Himself.

Asking for a human king was not really about Nahash at all.

It was a rejection of trusting God as their ruler and defender.

👑 God was already Israel's true king

🐍 Nahash was only the surface reason

💔 The real issue was a rejection

📖 They wanted a king instead of trust

## 🙌 The King Whom Ye Have Chosen

Samuel is careful to name Saul as the people's own choice.

He refuses to let Israel later claim this was somehow forced on them.

Responsibility for this decision belongs to the nation, not to Samuel or to God alone.

Every choice this king makes will also reflect back on the people who chose him.

🙌 Samuel names Saul as their choice

📜 Israel cannot later deny the decision

⚖️ Responsibility belongs to the nation

📖 The king's choices reflect on them too

## ✅ The LORD Hath Set A King Over You

Even though Israel's request came from wrong motives, God still honored it.

Saul's kingship carries God's own blessing despite how it began.

Human choices and God's sovereign plan are not shown here as opposites.

God can work His purposes even through a request born from fear.

✅ God honored the request anyway

👑 Saul's kingship carries real blessing

🤝 Human choice and God's plan overlap

📖 God works through imperfect requests

## 🌱 If Ye Will Fear The LORD And Serve Him

Samuel now lays out the terms for what comes next.

Fearing the Lord means treating Him with genuine reverence, not just following rules.

Obedience under this new king is still owed to God first.

Having a human king was never meant to replace that basic requirement.

🌱 Samuel sets the terms going forward

🙏 Fear means genuine reverence, not just rules

⚖️ Obedience to God still comes first

📖 A king never replaces that requirement

## ⚡ Then Shall The Hand Of The LORD Be Against You

Samuel also spells out the cost of disobedience plainly.

"The hand of the Lord" being against them describes real, active judgment.

This is the same warning God gave earlier through Moses in Deuteronomy.

A king changes Israel's government, but it never changes the terms of the covenant.

⚡ Disobedience brings real judgment

📜 This warning echoes Deuteronomy

👑 A king changes the government

📖 The covenant terms never change

# FirstSamuel 12:16-19
# ⛈️ Thunder In Wheat Harvest
---
## 👀 Stand And See This Great Thing

Samuel is about to prove everything he just said with a visible sign.

He wants Israel to watch, not just to listen and nod along.

A sign like this could not be faked or explained away easily.

What happens next will settle any doubt about who is really speaking.

👀 Samuel promises a visible sign

👂 He wants them to watch, not just listen

🔒 The sign cannot be faked

📖 It settles any doubt about his words

## 🌾 Is It Not Wheat Harvest To Day

Wheat harvest in Israel fell in the dry season, usually around early summer.

Rain almost never fell during this time of year.

A storm arriving now would be plainly unnatural to everyone present.

Samuel picks the one season where this sign could not be mistaken for luck.

🌾 Wheat harvest came in the dry season

☀️ Rain almost never fell then

⛈️ A storm now would look unnatural

📖 Samuel picks a season no one could doubt

## ⛈️ He Shall Send Thunder And Rain

This storm was not random weather.

Samuel names it in advance and then it happens exactly as spoken.

Ancient Canaanite religion credited storms to the god Baal, not to the God of Israel.

This sign quietly proves whose hand actually controls the sky.

⛈️ Samuel names the storm in advance

🎯 It happens exactly as spoken

👹 Canaanites credited storms to Baal

📖 The sign shows who truly controls the sky

## 😨 Your Wickedness Is Great Which Ye Have Done

The storm is not just a display of power for its own sake.

It is meant to make Israel feel the weight of what they asked for.

Wanting a king was not a small preference, it was a real act of rejecting God.

Fear here is the beginning of honest reflection, not just panic.

😨 The storm carries a real point

⚖️ It shows the weight of their request

💔 Wanting a king rejected God's rule

📖 Fear here leads to honest reflection

## 🙏 Pray For Thy Servants Unto The LORD Thy God

The people's reaction shows the sign worked exactly as intended.

They finally understand the seriousness of what they had asked for.

They turn to Samuel because he still stands as their mediator before God.

Conviction, not despair, is the response Samuel was hoping to produce.

🙏 The sign worked as intended

😳 They finally grasp the seriousness

🤝 Samuel still mediates for them

📖 Conviction was the response Samuel wanted

# FirstSamuel 12:20-25
# 🌾 Samuel's Final Charge
---
## 🙅 Fear Not, Ye Have Done All This Wickedness

Samuel does not pretend their sin was not real.

He names it plainly, the same as he just did with the thunderstorm.

But naming the sin is followed immediately by comfort, not condemnation.

Samuel refuses to leave Israel crushed under guilt with no way forward.

🙅 Samuel does not excuse their sin

📢 He names it plainly again

🕊️ Comfort follows the honest naming

📖 He refuses to leave them crushed

## 🚶 Turn Not Aside From Following The LORD

The real danger was never having a king in itself.

The danger was letting that king slowly replace their devotion to God.

Samuel tells them exactly how to avoid the mistake from repeating.

Serving the Lord "with all your heart" leaves no room for a divided loyalty.

🚶 The king itself was not the danger

⚠️ Replacing devotion to God was

🧭 Samuel gives clear direction forward

📖 Full devotion allows no divided loyalty

## 🕳️ Ye Should Go After Vain Things

"Vain" means empty or worthless, not simply foolish.

Samuel is describing the false gods and idols of the surrounding nations.

An idol cannot rescue anyone the way God had rescued Israel again and again.

Chasing something empty always leaves the chaser empty too.

🕳️ Vain means empty or worthless

👹 Samuel means the surrounding idols

🚫 An idol cannot rescue like God can

📖 Chasing emptiness leaves you empty

## 🛡️ The LORD Will Not Forsake His People

This promise does not rest on Israel's good behavior.

It rests on God's own reputation, described here as "his great name's sake."

God bound Himself to Israel through covenant long before this failure happened.

His faithfulness was never up for renegotiation just because the people failed.

🛡️ The promise is not earned by them

🏛️ It rests on God's own reputation

🤝 The covenant came before this failure

📖 God's faithfulness was never up for debate

## 🙏 God Forbid That I Should Sin In Ceasing To Pray For You

Samuel makes a striking claim about his own future role.

He treats failing to pray for Israel as a sin against God himself.

Even after stepping down as judge, Samuel keeps his role as intercessor.

Leadership in Israel was never only about political power.

🙏 Samuel calls silence in prayer a sin

🔄 He steps down but keeps interceding

📢 Leadership was never only political

📖 Prayer remained his lasting responsibility

## 📚 I Will Teach You The Good And The Right Way

Samuel's job is not finished just because Saul now rules.

He commits to keep teaching Israel what faithful obedience actually looks like.

A nation can drift even under a king who means well.

Ongoing teaching, not just a single farewell speech, is what will keep Israel steady.

📚 Samuel keeps teaching after stepping down

👑 A king ruling does not end that need

🧭 Ongoing teaching keeps a nation steady

📖 One farewell speech was never enough

## ⚠️ If Ye Shall Still Do Wickedly, Ye Shall Be Consumed

Samuel closes with the same warning he opened the covenant terms with.

"Consumed" describes total ruin, not a light setback.

This warning applies to the king Israel chose just as much as to the people.

Saul's own story later in this book will prove exactly how real this warning was.

⚠️ Samuel repeats the covenant warning

💥 Consumed means total ruin

👑 The warning includes the king himself

📖 Saul's own story proves it true
`.trim();

export const FIRST_SAMUEL_TWELVE_PERSONAL_SECTIONS = parseFirstSamuelTwelveRawNotes(FIRST_SAMUEL_TWELVE_RAW_NOTES);
