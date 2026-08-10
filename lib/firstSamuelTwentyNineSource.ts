export type FirstSamuelTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentyNineRawNotes(rawText: string): FirstSamuelTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 29:${startVerse}` : `1 Samuel 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Samuel 29 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_NINE_RAW_NOTES = `# FirstSamuel 29:1-3
# ⚔️ Philistines Muster For War At Aphek
---
## 🏕️ Gathered Together All Their Armies To Aphek

Aphek was a Philistine staging city west of the Jezreel Valley.

Armies gathered there before marching inland toward Israel.

Israel already lost the ark of the covenant fighting the Philistines near this same ground.

This new muster puts Saul's whole kingdom in danger again.

🏕️ Aphek was a Philistine staging city

⚔️ Armies gathered there before marching to war

📜 Israel once lost the ark near this ground

📖 Saul's kingdom is in danger again

---
## 💧 The Israelites Pitched By A Fountain Which Is In Jezreel

A fountain here means a natural spring, not a manmade fountain.

Armies camped near water sources whenever they could.

Jezreel sat across a wide valley from Aphek, open ground that favored chariots.

Saul's army camps in plain sight of the enemy gathering across that valley.

💧 Fountain means a natural spring

🏕️ Armies camped near water sources

🗺️ Jezreel faced Aphek across the valley

📖 Saul's army sits in plain sight

---
## 🪖 Passed On By Hundreds, And By Thousands

This describes the Philistine army marching past in organized ranks.

Marching by hundreds and thousands means disciplined military units, not a scattered crowd.

This looks like a formal review, commanders inspecting their troops before battle.

The size and order on display were meant to intimidate any watching enemy.

🪖 Hundreds and thousands means organized units

👀 This looks like a formal troop review

😰 A show of size before battle

📖 Order and scale were meant to intimidate

---
## 🚶 David And His Men Passed On In The Rereward With Achish

"Rereward" means the rear guard, the last group marching in a column.

David is not hidden away.

He marches directly alongside his host Achish.

That closeness shows how fully David has been folded into this army.

It is exactly what is about to alarm the other Philistine leaders.

🚶 Rereward means the rear guard

🤝 David marches beside Achish himself

🏕️ David is fully folded into this army

📖 That closeness is about to cause alarm

---
## 🗣️ What Do These Hebrews Here?

"Hebrews" was a common outsider's term for the people of Israel.

The princes are not confused about who David is.

They are questioning why an Israelite fights alongside Philistines against his own people.

Their suspicion, not Achish's judgment, decides what happens to David next.

🗣️ Hebrews was an outsider's term for Israel

❓ The princes question David's presence

⚔️ They doubt his loyalty in this war

📖 Their suspicion decides what happens next

---
## 👑 Is Not This David, The Servant Of Saul The King Of Israel

Achish still describes David as belonging to Saul.

That description is already out of date.

David has been living independently in Ziklag for over a year.

Achish either does not know or does not care how far David has broken from Saul.

His outdated words show just how convinced he is of David's loyalty to him now.

👑 Achish still calls David Saul's servant

📅 That description is out of date

🏠 David has lived independently in Ziklag

📖 Achish trusts David completely now

---
## 🏃 I Have Found No Fault In Him Since He Fell Unto Me

"Fell unto me" means the day David defected to Achish for safety.

Achish believes David has been completely loyal this whole time.

The reader already knows David has been lying to Achish about who he really raids.

Achish's trust is real.

It just happens to rest on a story that is not true.

🏃 Fell unto me means the day David defected

🤝 Achish believes David has been loyal

🤥 The reader knows David has been lying

📖 His trust rests on a false story

# FirstSamuel 29:4-5
# 😠 The Princes Refuse To Trust David
---
## 😠 The Princes Of The Philistines Were Wroth With Him

"Wroth" means very angry.

The princes are angry at Achish here, not at David directly.

They think Achish has been careless trusting an Israelite this close to battle.

Their anger forces Achish into a decision he clearly did not want to make.

😠 Wroth means very angry

👑 Their anger targets Achish, not David

⚠️ They see this trust as careless

📖 Achish is forced into a decision

---
## 🚫 Make This Fellow Return

"This fellow" is a dismissive way to refer to someone.

The princes will not even use David's name here.

Their words strip away the respect Achish had shown him earlier.

The demand itself is blunt.

David is to be sent away immediately.

🗣️ This fellow is a dismissive phrase

🚫 They refuse to use David's name

📉 It strips away Achish's earlier respect

📖 The demand is blunt and immediate

---
## ⚔️ Lest In The Battle He Be An Adversary To Us

"Adversary" means an enemy.

The princes fear David could turn on them once fighting actually starts.

They suspect his loyalty to Saul would win out in a real crisis.

Their fear names a dilemma David never actually wanted to face.

⚔️ Adversary means enemy

🔄 They fear David switching sides

👑 They suspect loyalty to Saul remains

📖 Their fear names a real dilemma

---
## 🤝 Wherewith Should He Reconcile Himself Unto His Master

"Reconcile" means to repair a broken relationship.

The princes imagine David switching sides in the middle of the battle.

They picture him proving new loyalty to Saul with something dramatic.

Their imagined betrayal is answered in the very next words of this verse.

🤝 Reconcile means repairing a relationship

🔄 They imagine David switching sides

🎯 They picture him proving new loyalty

📖 Their fear is spelled out next

---
## 💀 Should It Not Be With The Heads Of These Men?

"The heads of these men" means killing Philistine soldiers as proof of loyalty.

Bringing an enemy's head was an accepted way to prove a kill in this era.

The princes fear David could slaughter their own men to win Saul's favor back.

That grim possibility alone is reason enough for them to refuse him.

💀 Heads of these men means soldiers killed

🗡️ A head proved a kill in this era

😨 They fear David turning on their men

📖 That fear alone is reason to refuse him

---
## 🎶 Of Whom They Sang One To Another In Dances

This song first appeared after David killed Goliath, back in chapter eighteen.

Israelite women sang it, dancing to celebrate his victories.

That same song once made Saul jealous enough to start hunting David.

Now it makes the Philistines suspicious of him for a similar reason.

David's own fame follows him into every army he joins.

🎶 The song dates back to chapter eighteen

💃 Women sang and danced this song for David

😡 It once made Saul jealous of David

📖 Now it follows him into Philistine ranks

---
## 🏆 Saul Slew His Thousands, And David His Ten Thousands

This line ranks David's battle success above Saul's own.

"Ten thousands" is not a literal headcount.

It is poetic exaggeration meant to show far greater fame.

The Philistines still remember this line, word for word, years later.

A song written to celebrate David is now costing him a place in this battle.

🏆 The song ranks David above Saul

🔢 Ten thousands is poetic exaggeration

🧠 The Philistines still remember it exactly

📖 Celebration now costs David his place

# FirstSamuel 29:6-7
# 🛡️ Achish Sends David Away
---
## 🙏 Surely, As The Lord Liveth, Thou Hast Been Upright

Achish swears this oath using the name of Israel's God, not his own.

That is a striking thing for a Philistine king to say.

Time spent trusting and fighting beside David shaped how Achish speaks now.

"Upright" means honest and faithful in conduct.

🙏 Achish swears by Israel's God, not his own

😮 That is striking from a Philistine king

🤝 Time with David shaped how Achish speaks

📖 Upright means honest and faithful conduct

---
## 🚶 Thy Going Out And Thy Coming In With Me In The Host

This phrase is a Hebrew idiom covering someone's entire daily conduct.

It does not describe two specific trips.

It means everything David has done the whole time he served in this army.

Achish is giving David a complete, unqualified endorsement.

🚶 Going out and coming in is an idiom

📅 It covers David's entire time of service

✅ Achish gives a complete endorsement

📖 Nothing in David's conduct is in question

---
## 🔄 Nevertheless The Lords Favour Thee Not

"Nevertheless" signals a hard turn away from everything Achish just said.

Achish personally still trusts David completely.

His trust does not settle this decision.

The other Philistine lords outrank his personal opinion here.

Even a king answers to the council of lords around him.

🔄 Nevertheless signals a hard turn

🤝 Achish personally still trusts David

👑 The lords outrank his opinion here

📖 Even a king answers to his council

---
## 🕊️ Return, And Go In Peace

"Go in peace" was a common blessing said when sending someone away.

Achish is not punishing David with this dismissal.

He is protecting David from an unwanted fight.

He is also keeping the relationship between them friendly.

This is the kindest way Achish knows how to deliver bad news.

🕊️ Go in peace was a common blessing

🚫 This is not a punishment

🛡️ Achish is protecting David here

📖 Kindness marks how Achish lets him go

# FirstSamuel 29:8-9
# 🎭 David Protests And Achish Still Praises Him
---
## 🎭 But What Have I Done?

David's question sounds like genuine protest.

On the surface he seems eager to fight beside Achish.

Underneath, this dismissal actually spares David from an impossible choice.

Staying would have meant fighting against his own people, Israel.

David's protest may be more performance than true disappointment.

🎭 The protest sounds genuine on the surface

⚔️ Staying meant fighting against his own people

🙌 This dismissal spares David that choice

📖 His protest may be more performance than real

---
## 👑 That I May Not Go Fight Against The Enemies Of My Lord The King

David calls Achish "my lord the king" here.

He is playing the loyal vassal role fully.

This kind of careful language matches how David has spoken to Achish before.

The Philistine princes end up making this decision, not David himself.

David never actually has to choose a side in this war.

👑 My lord the king plays the loyal role

🗣️ David has spoken carefully like this before

🚪 The princes make this decision, not David

📖 David never has to pick a side

---
## 👼 I Know That Thou Art Good In My Sight, As An Angel Of God

Comparing someone to an angel of God was one of the highest compliments in this culture.

Achish worships other gods, yet he still reaches for this comparison.

His praise of David could hardly be any higher.

That praise makes the rejection that follows even harder for Achish to deliver.

👼 Angel of God was the highest compliment

😮 Even a Philistine king reaches for it

🏆 Achish's praise of David is at its peak

📖 That makes the rejection harder to deliver

---
## 🔄 Notwithstanding The Princes Of The Philistines Have Said

"Notwithstanding" means however or in spite of that.

Achish's own high opinion of David changes nothing here.

The final decision still belongs to the princes, not to him.

Even Achish's praise cannot overrule the council around him.

🔄 Notwithstanding means however

🏆 Achish's high opinion changes nothing

👑 The final call belongs to the princes

📖 Even praise cannot overrule the council

# FirstSamuel 29:10-11
# 🌅 David Is Spared The Coming Battle
---
## 🌅 Rise Up Early In The Morning

Achish wants David's departure handled quickly and quietly.

Leaving early avoids any awkward encounter with the suspicious princes.

This protects Achish's own authority.

It also protects David's safety at the same time.

🌅 Rise up early means leave quickly

🤐 Early departure avoids more suspicion

🛡️ It protects both men at once

📖 Achish handles this with care

---
## ☀️ As Soon As Ye Be Up Early In The Morning, And Have Light, Depart

Traveling required daylight for safety on unfamiliar roads.

Achish times David's exit for the very first light of day.

This is the last recorded conversation between David and Achish in scripture.

Their alliance ends here, quietly and without conflict.

☀️ Light was needed for safe travel

⏰ Achish times the exit for first light

🚪 This is their last recorded exchange

📖 Their alliance ends here

---
## 🚶 David And His Men Rose Up Early To Depart In The Morning

David obeys immediately and without argument.

His earlier protest now looks like it was mostly for show.

He turns back toward Ziklag.

He does not yet know what is waiting for him there.

🚶 David obeys without further argument

🎭 His earlier protest was mostly for show

🏠 He heads back toward Ziklag

📖 He does not know what awaits him

---
## 🗺️ To Return Into The Land Of The Philistines

This means David heads back toward Philistine held territory, toward Ziklag itself.

The very next chapter opens with what David finds there.

That absence protects him from a fight he never wanted.

Being sent away turns out to matter for reasons David cannot see yet.

🗺️ David heads back toward Ziklag

📖 The next chapter opens on his arrival

⏳ Being sent away turns out to matter

➡️ For reasons David does not expect yet

---
## ⚔️ The Philistines Went Up To Jezreel

The war David was excused from continues without him.

This same battle at Jezreel becomes Saul's final defeat in the very next chapters.

Fighting here could have forced David to raise a sword against his own people.

God's providence worked through the suspicion of foreign princes.

David never had to make that choice himself.

⚔️ The war continues without David

💀 This battle becomes Saul's final defeat

🙌 David is spared an impossible choice

📖 Providence worked through others' suspicion
`.trim();

export const FIRST_SAMUEL_TWENTY_NINE_PERSONAL_SECTIONS = parseFirstSamuelTwentyNineRawNotes(
  FIRST_SAMUEL_TWENTY_NINE_RAW_NOTES,
);
