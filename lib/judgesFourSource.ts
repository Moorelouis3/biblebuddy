export type JudgesFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesFourRawNotes(rawText: string): JudgesFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 4:${startVerse}` : `Judges 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Judges 4 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_FOUR_RAW_NOTES = `# Judges 4:1-3
# 🔄 Israel Sins Again
---
## 🔄 Again Did Evil In The Sight Of The LORD

This chapter opens with the same word used at the start of every judge cycle in this book.

Israel does not learn from the last oppression.

They fall back into the same sin the moment things get comfortable again.

The pattern is not random.

It repeats because the people keep choosing it.

🔄 The evil cycle repeats again

⏳ Comfort leads back to old sin

📖 The pattern is a choice, not fate

➡️ Freedom did not change their hearts

## ⚔️ When Ehud Was Dead

Ehud was the judge from the previous chapter, the one who killed the Moabite king Eglon.

As long as Ehud lived, Israel stayed faithful and the land had rest.

His death removes the one steady leader holding the nation together.

Judges keeps showing that Israel's faithfulness often depended on one person, not on their own conviction.

⚔️ Ehud was last chapter's judge

🕊️ His life kept the land at rest

📉 His death removes that steady influence

📖 Faith leaned on a leader, not conviction

## 💰 Sold Them Into The Hand Of Jabin King Of Canaan

"Sold" is covenant language, not a business term.

It means God handed Israel over to an enemy as the direct consequence of their sin.

This is the same wording used earlier in Judges for earlier oppressions.

God is not absent from this defeat.

He is the one allowing it.

💰 Sold means handed over as judgment

📜 This wording repeats through Judges

🚫 God is not absent from this

📖 Consequence follows the choice to sin

## 🏰 That Reigned In Hazor

Hazor was one of the largest and most powerful cities in ancient Canaan.

Joshua had already conquered and burned this exact city years earlier in Joshua chapter eleven.

A new King Jabin now rules from a rebuilt Hazor, proof that old threats can return.

Victory once does not guarantee an enemy stays defeated forever.

🏰 Hazor was a major Canaanite city

🔥 Joshua had already destroyed it once

🏗️ It was rebuilt under a new king

➡️ Old threats can return over time

## 🗡️ The Captain Of Whose Host Was Sisera

"Host" is an old word for an army.

Sisera commands Jabin's forces, and he becomes the real villain of this chapter, more than Jabin himself.

He lives in Harosheth of the Gentiles, a settlement with a mixed, non Israelite population.

🗡️ Host means an army

👤 Sisera commands Jabin's forces

🌍 Harosheth held a mixed population

📖 Sisera drives the chapter's conflict

## 🛡️ Nine Hundred Chariots Of Iron

Israel fought mostly on foot with simple weapons at this point in their history.

Iron chariots were the most feared war machine of the ancient world.

They were fast, armored, and nearly impossible to stop in open country.

Nine hundred of them made Sisera's army look unbeatable on paper.

🛡️ Chariots were the era's deadliest weapon

🏃 Israel had no such technology

😨 Nine hundred looked unbeatable

📖 Fear set the stage for a rescue

## ⏳ Twenty Years He Mightily Oppressed The Children Of Israel

Twenty years is a full generation of hardship.

"Mightily" tells the reader this was not a mild inconvenience but a crushing, ongoing weight on the whole nation.

Long suffering often comes before the cry that finally turns things around.

⏳ Twenty years spans a generation

💪 Mightily means a crushing weight

😣 The oppression was constant, not occasional

➡️ Long suffering often precedes a turn

# Judges 4:4-5
# 👩‍⚖️ Deborah The Prophetess
---
## 👩‍⚖️ Deborah, A Prophetess, The Wife Of Lapidoth

A prophetess is a woman through whom God spoke directly to His people.

Deborah is the only woman among all the judges named in this book.

She is introduced by two roles at once, a wife and a prophetess.

Both were true of her at the same time.

👩‍⚖️ Prophetess means a woman speaking for God

⭐ Deborah is the only female judge

👰 She is named as a wife too

📖 Both roles belonged to her fully

## ⚖️ She Judged Israel At That Time

A judge in this book was not simply a courtroom official.

Judges settled disputes, but they also led Israel militarily and spiritually during a period with no king.

Deborah holding that role already shows how unusual and trusted her leadership was.

⚖️ Judged means led, not just ruled

🗡️ Judges also led in battle

🕊️ Judges filled the gap before kings

📖 Her leadership was rare and trusted

## 🌴 She Dwelt Under The Palm Tree Of Deborah

This specific palm tree became known by her name because people gathered there so often to seek her out.

It sat between Ramah and Bethel in the hill country of Ephraim, a well known and central location.

A single tree became a landmark simply because of who sat under it.

🌴 The tree carried her own name

🗺️ It stood between Ramah and Bethel

📍 The location was well known and central

📖 One person's presence made it a landmark

## 🚶 The Children Of Israel Came Up To Her For Judgment

People traveled to Deborah to have real disputes settled.

This detail shows her authority was not symbolic, it was actively used by ordinary Israelites with real problems.

Long before Barak enters the story, Deborah is already the nation's trusted leader.

🚶 People traveled to reach her

⚖️ Her authority was actively used

👥 Ordinary Israelites brought real disputes

➡️ She led before Barak ever appears

# Judges 4:6-7
# 📯 The LORD's Command Through Deborah
---
## 📯 She Sent And Called Barak The Son Of Abinoam

Deborah does not act alone.

She summons Barak, a military leader from the tribe of Naphtali, to carry out what God has already commanded.

This sets up a partnership between a prophetess who hears from God and a commander who must act on it.

📯 Deborah summons Barak by name

🗡️ Barak leads from the tribe of Naphtali

🤝 Together they form God's plan

📖 Hearing and acting work together here

## ❓ Hath Not The LORD God Of Israel Commanded

Deborah opens with a question instead of a plain command.

The question form makes clear this order did not originate with her.

She is delivering God's instruction, not inventing a military strategy of her own.

❓ The question signals a message from God

🗣️ Deborah is a messenger, not the source

🚫 This is not her own strategy

📖 She speaks for God, not for herself

## ⛰️ Go And Draw Toward Mount Tabor

Mount Tabor rises sharply out of the valley floor in northern Israel, giving Barak's forces the high ground.

Chariots struggled badly on steep or uneven terrain.

Choosing this mountain was already a strategic advantage handed to Israel before the battle even began.

⛰️ Tabor rises sharply above the valley

🏔️ High ground favored Barak's side

🚫 Chariots struggled on steep terrain

📖 God's plan included the terrain itself

## 🔟 Take With Thee Ten Thousand Men

Ten thousand men from Zebulun and Naphtali were ordinary farmers and shepherds, not a standing professional army.

Sisera's nine hundred iron chariots vastly outmatched them in equipment and training.

The mismatch on paper makes the coming victory impossible to credit to human strength alone.

🔟 Ten thousand were ordinary men

🛡️ Sisera's army had far better gear

⚖️ The odds looked deeply uneven

➡️ Victory here could not be human skill

## 🌊 I Will Draw Unto Thee To The River Kishon Sisera

God promises to personally lure Sisera's army to a specific location, the river Kishon.

This is not a vague promise of help.

It names the enemy commander, his forces, and the exact place the battle will happen.

The LORD is the one arranging the trap, not Barak.

🌊 Kishon is the named battle site

🎯 God targets Sisera by name

🪤 God arranges the trap Himself

📖 Barak only has to follow the plan

## 🙌 I Will Deliver Him Into Thine Hand

This is a direct promise of victory before a single soldier moves.

"Deliver into thine hand" is common covenant language throughout Judges for a total, guaranteed defeat of an enemy.

Barak is being offered certainty, not just encouragement.

🙌 Deliver means a guaranteed victory

📜 This phrase repeats often in Judges

✅ The outcome is promised in advance

📖 Certainty is offered before the fight

# Judges 4:8-11
# 🐫 Barak's Condition And The March To Kedesh
---
## 🤝 If Thou Wilt Go With Me, Then I Will Go

Barak agrees to obey, but only on one condition, that Deborah goes with him personally.

This is not simple cowardice, since Barak still leads the army into battle himself.

It reveals how much Barak's confidence depended on Deborah's presence as a sign that God was truly in this.

🤝 Barak sets one condition

🗡️ He still leads the battle himself

👀 Deborah's presence confirmed God's backing

📖 Confidence leaned on her presence

## 👩 The Journey Shall Not Be For Thine Honour

Deborah agrees to go, but warns Barak the credit for this victory will not land on him.

"Notwithstanding" here simply means despite what was just said, the plan still moves forward anyway.

Barak's hesitation costs him the honor he might otherwise have received.

👩 Deborah agrees despite the warning

⚠️ The honor will not be Barak's

🚫 His hesitation has a real cost

➡️ A condition here shapes the outcome

## 👤 The LORD Shall Sell Sisera Into The Hand Of A Woman

Deborah announces in advance that a woman, not Barak, will personally defeat Sisera.

This does not point to herself, since she stays with the army the whole battle.

The reader is meant to wonder who this other woman could possibly be, a question the chapter answers later.

👤 A woman will defeat Sisera

❓ Deborah does not mean herself

🔍 The reader is left wondering who

➡️ The answer comes later in the chapter

## 🐑 Barak Called Zebulun And Naphtali To Kedesh

Barak gathers his ten thousand men specifically from these two northern tribes.

Kedesh serves as the staging point before the march up to Mount Tabor.

Deborah goes up with him, keeping her word from verse nine.

🐑 Zebulun and Naphtali supply the men

📍 Kedesh is the staging point

⛰️ Tabor is their next destination

📖 Deborah keeps her word to go

## ⛺ Heber The Kenite Had Severed Himself From The Kenites

The Kenites were longtime allies of Israel, descended from Moses' own father in law Hobab.

Heber has broken away from his own people and pitched his tent near Kedesh, unusually close to this unfolding conflict.

This small detail sets up a major twist that does not pay off until much later in the chapter.

⛺ Kenites were traditional allies of Israel

👨‍👩‍👧 Heber breaks off from that group

📍 His tent sits near Kedesh

➡️ This detail matters much later

## 🗺️ Pitched His Tent Unto The Plain Of Zaanaim

The exact placement of Heber's tent puts his household directly in the path of what is about to happen.

Nothing about this detail seems important yet.

The narrator is quietly planting a fact the reader will need later without any explanation of why.

🗺️ Zaanaim sits near the coming battle

🤫 The detail seems unimportant now

🧩 The narrator plants it for later

📖 Scripture often hides setup in plain sight

# Judges 4:12-13
# 🐎 Sisera Gathers His Army
---
## 👁️ They Shewed Sisera That Barak Was Gone Up To Mount Tabor

Word of Barak's mobilization reaches Sisera quickly.

Sisera now knows exactly where the Israelite forces are gathering.

This report is what actually triggers his massive military response in the next verse.

👁️ Sisera learns of Barak's movement

⛰️ Tabor is named as the location

📢 A report triggers his response

➡️ Sisera's decision follows this news

## 🛡️ Sisera Gathered Together All His Chariots, Even Nine Hundred Chariots Of Iron

Sisera commits his entire chariot force to this one battle, holding nothing back.

The number nine hundred is repeated here from verse three, reminding the reader exactly what Israel is facing.

Confidence in overwhelming force will soon prove to be a fatal mistake.

🛡️ Sisera commits his whole chariot force

🔁 Nine hundred repeats from verse three

😤 His confidence looks total here

➡️ That confidence is about to fail

## 🌊 From Harosheth Of The Gentiles Unto The River Of Kishon

Sisera marches his full army down from his home base to the river named earlier in God's promise to Deborah.

He is walking directly into the exact location God already said the battle would happen.

Every move Sisera makes is actually moving him into God's trap.

🌊 Kishon was already named by God

🚶 Sisera marches straight toward it

🪤 He is walking into the trap

📖 Even the enemy's choices serve God's plan

# Judges 4:14-16
# ⚡ The Battle And The Rout
---
## ⬆️ Up, For This Is The Day

Deborah gives Barak the signal to attack, framing this moment as the specific day God already promised.

Her confidence comes from the promise back in verse seven, not from watching the battlefield herself.

Israel is meant to act the instant God's timing arrives, not wait for more certainty.

⬆️ Deborah signals the moment to move

📅 This is the promised day

🙏 Her confidence rests on God's word

➡️ Obedience means acting on His timing

## 🌊 The LORD Discomfited Sisera

"Discomfited" is a strong old word meaning thrown into total panic and confusion.

This describes something closer to a supernatural rout than an ordinary military defeat.

Other passages describing this same battle mention a storm and a flooding river.

That flood likely trapped the heavy iron chariots in the mud.

🌊 Discomfited means total panic

⛈️ Other scripture points to a storm

🪤 Mud likely trapped the iron chariots

📖 The chariots became a weakness, not a strength

## 🏃 Sisera Lighted Down Off His Chariot, And Fled Away On His Feet

The commander of nine hundred chariots ends up running for his life on foot.

His own greatest weapon, the iron chariot, becomes useless the moment it gets stuck.

The very thing that made his army look unstoppable in verse three now leaves its commander with nothing.

🏃 Sisera abandons his own chariot

🛞 His strongest weapon becomes useless

😨 He is left running on foot

➡️ Strength can fail at the worst moment

## ⚔️ There Was Not A Man Left

Barak pursues the fleeing chariots and soldiers all the way back to Harosheth of the Gentiles.

This phrase describes a complete and total destruction of Sisera's entire army.

The nine hundred chariots that made Israel tremble in verse three are gone by the end of this verse.

⚔️ Barak pursues all the way back

🏚️ Harosheth marks the chase's end point

💀 The destruction is total

📖 The feared army is completely gone

# Judges 4:17-18
# 🏕️ Sisera Flees To Jael's Tent
---
## 🚶 Sisera Fled Away On His Feet To The Tent Of Jael

Sisera survives the battle itself only to run straight toward the household introduced back in verse eleven.

He assumes he is running toward safety, since peace existed between his king and Heber's family.

The reader already knows something Sisera does not, that this detail was planted earlier for a reason.

🚶 Sisera runs to Jael's tent

🤝 He assumes this household is safe

🧩 The reader recalls verse eleven's setup

➡️ His assumption is about to be wrong

## 🕊️ There Was Peace Between Jabin And The House Of Heber

This peace explains exactly why Sisera trusted this specific tent over any other hiding place.

A tent belonging to a woman was also considered the one place an enemy soldier would not think to search.

Both facts combine to make this the most dangerous possible place for Sisera to trust.

🕊️ Peace made this tent seem safe

👩 A woman's tent seemed unsearchable

⚠️ Both facts made it truly dangerous

📖 Safety here was only an illusion

## 👋 Turn In, My Lord, Turn In To Me, Fear Not

Jael greets Sisera warmly and by his proper title, giving him no reason to suspect danger.

"Fear not" is exactly what a desperate, exhausted man on the run would want to hear most.

She covers him with a mantle, a heavy blanket, adding to the sense of safety and rest.

👋 Jael greets him with respect

🛌 Fear not offers false comfort

🧣 A mantle adds to the disguise

➡️ Every kindness here hides a trap

# Judges 4:19-21
# 🗡️ Jael Kills Sisera
---
## 🥛 She Opened A Bottle Of Milk, And Gave Him Drink

Sisera asks only for water, but Jael gives him rich milk instead.

Milk was heavier and more likely to make an exhausted man fall into a deep sleep quickly.

Every choice Jael makes in this scene, even a simple drink, moves toward the same goal.

🥛 Sisera asked only for water

🍼 Milk was heavier and richer

😴 It encouraged a deeper sleep

📖 Every kindness serves one hidden goal

## 🚪 Stand In The Door Of The Tent, And Say No

Sisera gives Jael one final instruction before falling asleep, to lie and protect his hiding place.

He fully trusts her to guard him from anyone searching for him.

His last words place his complete safety in her hands.

She is the very person about to kill him.

🚪 Sisera asks her to lie for him

🛡️ He trusts her to guard his hiding place

😴 These are his final words before sleeping

➡️ His trust is placed in the wrong hands

## 🔨 Took A Nail Of The Tent, And An Hammer In Her Hand

A tent nail was a long wooden or metal stake used to secure tent ropes into the ground.

These were common household tools, not weapons, which is exactly why Sisera never saw this coming.

Jael uses the most ordinary items in her own tent to end the threat.

🔨 A tent nail secured the ropes

🏠 It was a tool, not a weapon

😱 That is why Sisera never expected it

📖 God used what was already close at hand

## 💀 Smote The Nail Into His Temples... So He Died

Jael drives the tent nail through Sisera's temple while he sleeps, fastening him to the ground.

"Fast asleep and weary" explains exactly why he never woke to stop her.

Deborah's prophecy from verse nine is fulfilled precisely, a woman, not Barak, delivers the final blow to Sisera.

💀 Sisera dies while completely asleep

😴 Exhaustion left him unable to resist

📜 This fulfills Deborah's exact prophecy

📖 God's word landed exactly as spoken

# Judges 4:22-24
# 🏆 Victory Over Jabin
---
## 🚶 Behold, As Barak Pursued Sisera, Jael Came Out To Meet Him

Barak arrives at the very tent he was chasing Sisera toward, still expecting a fight.

Jael meets him calmly and invites him inside instead of hiding what happened.

The chase that filled the last several verses ends the moment Barak steps into her tent.

🚶 Barak still expects to fight Sisera

🚪 Jael invites him in instead

🏁 The long chase quietly ends here

➡️ The final scene was already decided

## 👀 Behold, Sisera Lay Dead, And The Nail Was In His Temples

Barak finally finds the enemy commander he pursued through this entire chapter, already dead.

He arrives too late to deliver the final blow himself, exactly as Deborah warned back in verse nine.

The honor of this victory belongs to a woman most of the story never even names as a soldier.

👀 Barak finds Sisera already dead

⏰ He arrives too late for the kill

📜 Deborah's earlier warning proves true

📖 An unlikely person carried the honor

## ⚖️ So God Subdued On That Day Jabin The King Of Canaan

Scripture credits this victory to God, not to Barak, Deborah, or Jael individually.

Every human choice in this chapter, from Deborah's summons to Jael's nail, served one larger plan.

The chapter never lets the reader forget who was actually in control the whole time.

⚖️ God gets credit for the victory

🧩 Every human choice served His plan

👑 God remained in control throughout

📖 Human courage still served a bigger hand

## 📈 The Hand Of Israel Prospered Until They Had Destroyed Jabin

This was not a single lucky battle but the beginning of an ongoing shift in power.

Israel continued gaining strength against Jabin's kingdom until his rule was completely ended.

Twenty years of oppression, named back in verse three, finally closes with total, lasting relief.

📈 Israel's strength grew steadily afterward

🏰 Jabin's power kept shrinking over time

⏳ Twenty years of oppression finally end

📖 God's deliverance was lasting, not brief
`.trim();

export const JUDGES_FOUR_PERSONAL_SECTIONS = parseJudgesFourRawNotes(JUDGES_FOUR_RAW_NOTES);
