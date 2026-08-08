export type JudgesFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesFiveRawNotes(rawText: string): JudgesFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 5:${startVerse}` : `Judges 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Judges 5 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_FIVE_RAW_NOTES = `# Judges 5:1-5
# 🎵 Deborah And Barak Sing
---
## 🎤 Then Sang Deborah And Barak

Deborah was a prophetess and judge introduced back in Judges four.

Barak was the commander she called to lead Israel's army.

This victory song is credited to both of them together.

Singing after a battle turned memory into worship.

This is the only full song recorded in the whole book of Judges.

🎤 Deborah was a prophetess and judge

⚔️ Barak led the army she called

🤝 Victory is credited to both together

📖 The song turned memory into worship

## ⚖️ Praise Ye The LORD For The Avenging

"Avenging" does not mean personal revenge here.

It means God stepped in to set a real wrong right.

Israel had suffered under a Canaanite king named Jabin for twenty years.

This song opens by praising God for ending that oppression.

Justice, not payback, is the reason for the praise.

⚖️ Avenging means setting a wrong right

😔 Israel suffered under Jabin for years

🙌 The song opens with praise to God

📖 Justice, not payback, drives the song

## 🙋 When The People Willingly Offered Themselves

No king forced anyone into this battle.

Ordinary Israelites chose on their own to risk their lives.

That choice becomes a major theme later in the song.

Some tribes will make this same choice.

Others will not.

🙋 No one forced anyone to fight

🫡 People chose to risk their lives

📖 Choice becomes a theme in this song

➡️ Some tribes will choose differently later

## 👑 Hear O Ye Kings Give Ear O Ye Princes

Deborah speaks past Israel here.

She addresses foreign kings and princes directly.

Kings and princes were the powerful rulers of the ancient world.

Calling them to listen made this victory matter beyond Israel's own borders.

The God who defeated Sisera is a God every ruler should take seriously.

👑 Deborah addresses foreign kings directly

🌍 Kings and princes were the powerful class

📢 This victory reached beyond Israel's borders

📖 Every ruler should take God seriously

## 🗺️ When Thou Wentest Out Of Seir

"Seir" is another name for the region of Edom, south of Israel.

The song looks back to Israel's journey after leaving Egypt.

That journey passed near this same region long ago.

Deborah reaches back to that older memory before turning to Sisera's defeat.

🗺️ Seir refers to the region of Edom

🚶 It recalls Israel's journey after Egypt

⏳ The song reaches back to that memory

➡️ Old history sets up this newer victory

## 🌍 The Earth Trembled And The Heavens Dropped

This is poetic language for God's presence arriving with visible power.

Earth shaking and rain falling are common Old Testament pictures of God appearing.

The same kind of language shows up when God gave the law at Sinai.

Nothing in nature stays calm when the LORD draws near.

🌍 Earth trembling pictures God's arrival

🌧️ Heavens dropped means rain fell

⛰️ Same imagery appears at Mount Sinai

📖 Nature responds when God draws near

## ⛰️ Even That Sinai From Before The LORD God Of Israel

Sinai is the mountain where Israel received the law through Moses.

That happened generations before this song was ever sung.

Naming it here connects this battle to that older, defining moment.

The same God who shook Sinai just defeated Sisera's army.

His power did not fade with time.

⛰️ Sinai is where Israel received the law

🔗 This links Sisera's defeat to that moment

⚡ The same God acted in both events

📖 God's power had not faded with time

# Judges 5:6-8
# 🛣️ Life Under Oppression
---
## 🐂 In The Days Of Shamgar The Son Of Anath

Shamgar was a judge who came right before Deborah.

Judges three already introduced him briefly.

He killed six hundred Philistines using only an ox goad, a farming tool for prodding cattle.

Naming him here places this song right after his short time of leadership.

Even his courage could not stop the danger described in this verse.

🐂 Shamgar killed Philistines with an ox goad

⏳ He judged Israel right before Deborah

⚠️ His courage alone could not stop the danger

📖 One judge's strength was not enough here

## 🛣️ The Highways Were Unoccupied

"Unoccupied" means the main roads sat empty.

They were too dangerous to travel on.

Canaanite raiders and Sisera's forces controlled the open routes.

Ordinary life had come to a fearful standstill.

🛣️ Unoccupied means the roads sat empty

⚠️ Raiders made the open routes dangerous

😨 Ordinary life stood still under fear

📖 Oppression reached into daily travel

## 🥾 Travellers Walked Through Byways

"Byways" means the winding back paths people used instead of main roads.

A slower, hidden route felt safer than being seen in the open.

This small detail shows how deeply fear had shaped daily decisions.

The song is not exaggerating when it calls this a low point.

🥾 Byways means hidden back paths

🙈 Hidden routes felt safer than open ones

😟 Fear shaped even simple daily choices

➡️ This marks a real low point for Israel

## 🙋 Until That I Deborah Arose

Deborah names herself directly as the turning point in this story.

Nobody else was stepping forward to lead Israel out of that fear.

She did not wait to be asked twice.

🙋 Deborah names herself as the turning point

🚫 No one else was stepping forward

💪 She did not wait to be asked

📖 One willing leader changed the whole story

## 👩 A Mother In Israel

This does not mean Deborah literally raised the whole nation as her own children.

The phrase describes protective, decisive leadership, the kind a mother gives a family.

She stepped into that role when Israel had no other protector.

That title stood out in a culture where formal leaders were almost always men.

👩 Mother in Israel describes protective leadership

🛡️ She protected the nation like a family

👑 Formal leaders were usually men then

📖 Deborah's role stood out sharply

## 🚫 They Chose New Gods

This verse names the real cause behind Israel's suffering.

Israel had turned to Canaanite gods instead of staying faithful to the LORD.

That choice opened the door to the oppression described just before this verse.

The song does not blame Sisera alone.

It blames Israel's own unfaithfulness first.

🚫 Israel chose to worship other gods

🔓 That choice opened the door to oppression

⚖️ The song blames Israel's own unfaithfulness

📖 Consequences followed the nation's choice

## ⚔️ Was There A Shield Or Spear Seen

This does not mean Israel simply forgot how to make weapons.

Sisera commanded nine hundred iron chariots, far beyond Israel's military technology.

Years of oppression had likely stripped ordinary Israelites of usable weapons.

Facing that army almost unarmed made this victory even more clearly God's doing.

⚔️ Israel had almost no shields or spears

🚗 Sisera commanded nine hundred iron chariots

📉 Oppression had stripped Israel's fighting readiness

📖 The victory could only be God's doing

## 🔢 Among Forty Thousand In Israel

Forty thousand gives a general sense of Israel's fighting age population.

It is not meant as a precise headcount.

Numbers like this in ancient poetry often stress scale, not exact math.

A large, willing people still had almost nothing to fight with.

🔢 Forty thousand describes fighting age men

📏 The number stresses scale, not precision

😳 A large people still had no weapons

➡️ Willingness alone was not enough here

# Judges 5:9-11
# 🙌 Willing Hearts
---
## 👑 My Heart Is Toward The Governors Of Israel

"Governors" here means the tribal leaders who organized Israel's response.

Deborah singles them out for personal praise before praising the ordinary people.

Leadership that steps up first matters enough to be named specifically.

That offering was not required of them.

They chose it willingly, like the rest of the nation.

👑 Governors means Israel's tribal leaders

🙌 Deborah praises them by name first

🫡 They organized the nation's response

📖 Leadership that steps up gets named

## 🐴 Speak Ye That Ride On White Asses

Riding a white donkey marked a person as wealthy or important in this culture.

Most people traveled on foot or used ordinary work animals instead.

Deborah calls the wealthy and privileged to add their voice to this praise.

Victory belonged to every level of society, not just the fighters.

🐴 White asses marked wealth and status

🚶 Most people traveled on foot instead

🙌 The wealthy are called to praise too

📖 Victory belonged to the whole nation

## ⚖️ Ye That Sit In Judgment

This phrase refers to Israel's judges and local decision makers.

It does not mean Deborah alone.

Every level of Israel's leadership gets called into this song of praise.

⚖️ Sit in judgment means local judges

👥 Every leadership level is included here

🙌 All are called to join the praise

➡️ Praise was meant to be shared widely

## 🚶 And Walk By The Way

After naming the wealthy and the judges, Deborah turns to ordinary travelers.

This verse moves from the top of society down to the common person.

Nobody is left out of the invitation to praise God.

🚶 Walk by the way means ordinary travelers

📉 The verse moves from elite to common

🙌 Nobody is left out of this praise

📖 God's victory reached every level of society

## 🏹 The Noise Of Archers In The Places Of Drawing Water

This does not describe a musical sound.

Wells were common ambush points for raiders during the oppression described earlier.

"The noise of archers" pictures the fear people once felt gathering water.

That fear is now gone.

🏹 Noise of archers means ambush danger

💧 Wells were common ambush points then

😨 This recalls the fear people once felt

📖 That old danger has now passed

## 🗣️ There Shall They Rehearse The Righteous Acts Of The LORD

"Rehearse" means to retell out loud.

It is not about practicing something in private.

People now gather safely at the same water sources raiders once made dangerous.

Instead of fear, those gathering places now fill with stories of what God did.

🗣️ Rehearse means to retell out loud

💧 Same wells once feared, now safe

📖 Danger turned into a place of testimony

➡️ Safety let ordinary life turn to worship

## 🚪 Then Shall The People Of The LORD Go Down To The Gates

City gates were the center of public business and community life in this culture.

Going down to the gates again means normal, safe community life had returned.

That simple return to routine is itself a sign of the victory God won.

🚪 Gates were the center of public life

🏘️ Returning there means normal life is back

✅ Ordinary routine itself signals the victory

📖 Peace shows up in small daily details

# Judges 5:12-15
# ⚡ Awake Awake Deborah
---
## ⏰ Awake Awake Deborah

The repeated word "awake" is a poetic call to action.

It does not mean Deborah was literally asleep.

Repeating it four times in one verse gives the song real urgency.

This is where the song shifts from remembering the past to reliving the battle.

⏰ Awake is a poetic call to action

🔁 Repetition builds urgency in the song

🎬 The song shifts into reliving the battle

📖 Poetry can command through repeated words

## ⛓️ Lead Thy Captivity Captive

This phrase means Barak led away prisoners captured from the defeated army.

It pictures a victorious commander marching captives home as proof of the win.

Barak is named "son of Abinoam" here.

That gives him the same formal honor Deborah received in verse one.

⛓️ Lead captivity captive means march prisoners home

🎖️ It pictures visible proof of victory

🤝 Barak receives the same honor as Deborah

📖 Both leaders are named with full honor

## 👑 The LORD Made Me Have Dominion Over The Mighty

Deborah credits God directly for her own authority over powerful men.

She does not claim the position came from her own ambition.

That kind of public leadership was unusual for a woman in this culture.

She names God as the reason it happened at all.

👑 Deborah credits God for her authority

🚫 She claims no ambition of her own

👩 Female leadership was unusual in this culture

📖 God, not custom, placed her there

## 🗺️ Out Of Ephraim Was There A Root Of Them Against Amalek

This likely refers to Ephraim's territory bordering land once associated with the Amalekites.

The Amalekites were a longtime enemy of Israel.

Naming this old connection reminds the reader of Ephraim's history against Israel's enemies.

This verse begins a roll call of which tribes actually showed up to fight.

🗺️ Ephraim bordered land tied to Amalek

📜 It recalls an older enemy history

📋 This verse begins a tribal roll call

➡️ The song tracks who actually showed up

## 🚶 After Thee Benjamin Among Thy People

Benjamin's territory sat right next to Ephraim's.

Their warriors likely marched in together for this fight.

Small tribes still mattered enough to be named individually in this song.

🗺️ Benjamin's land bordered Ephraim's territory

🚶 Their warriors marched in together

📝 Even small tribes are named individually

📖 Every willing tribe gets recognized

## 👥 Out Of Machir Came Down Governors

"Machir" was a clan within the tribe of Manasseh.

It is used here as another name for that whole tribe.

"Governors" again means local leaders who organized their own men to fight.

Manasseh's participation adds another major tribe to the growing list.

👥 Machir names a clan within Manasseh

🧭 Governors means local organizing leaders

📈 Another major tribe joins the roll call

➡️ Manasseh answered Deborah's call

## 🖊️ Out Of Zebulun They That Handle The Pen Of The Writer

This does not describe scribes writing documents on the battlefield.

Many scholars believe the phrase points to officers carrying a commander's staff.

That staff was a symbol of military rank.

Zebulun sent trained leaders, not just extra bodies, into this fight.

🖊️ Pen of the writer likely means officer's staff

🚫 Not literal scribes on the battlefield

🎖️ Zebulun sent trained military leaders

📖 Even an odd phrase points to real leadership

## 🤝 The Princes Of Issachar Were With Deborah

Issachar stood firmly with Deborah's leadership.

This tribe is named right alongside her and Barak.

Their loyalty is highlighted just before the song names the tribes who did not show up.

🤝 Issachar stood firmly with Deborah

🎖️ Named right alongside the two leaders

👍 Their loyalty is highlighted clearly

➡️ The song is about to name the absent

## 🚶 He Was Sent On Foot Into The Valley

"He" refers to Barak, leading troops down into the battlefield.

"On foot" stresses that he marched with his men.

He did not stay back somewhere safe.

🚶 He refers to Barak leading in person

⚔️ On foot means he marched with his men

🏔️ The valley is where the battle happened

📖 Leaders here fought alongside their troops

## 💭 For The Divisions Of Reuben There Were Great Thoughts Of Heart

This does not describe Reuben planning to help.

"Great thoughts of heart" describes deep internal debate.

That debate never turned into action.

Reuben is the first tribe in this song that talked about joining but did not come.

💭 Great thoughts means deep internal debate

🚫 That debate never turned into action

🏳️ Reuben is the first tribe called out

➡️ Talking about helping is not helping

# Judges 5:16-18
# 🚢 Tribes Who Stayed Behind
---
## ❓ Why Abodest Thou Among The Sheepfolds

This is a direct, pointed question aimed at Reuben.

Reuben chose to stay near their flocks instead of joining the fight.

The question is not really looking for an answer.

It is meant to embarrass a tribe that only talked about helping.

❓ This question targets Reuben's inaction

🐑 They stayed near their flocks instead

😳 The question is meant to embarrass

➡️ Words without action get called out

## 🐑 To Hear The Bleatings Of The Flocks

This does not mean Reuben had a legitimate reason to stay home.

The detail pictures Reuben comfortable and distracted while others risked their lives.

"Great searchings of heart" repeats the same idea from verse sixteen.

The debate went in circles without ever ending in action.

🐑 Listening to sheep pictures comfort at home

😌 Reuben stayed distracted while others fought

🔁 Great searchings of heart repeats verse sixteen

📖 Endless debate is not the same as courage

## 🗺️ Gilead Abode Beyond Jordan

"Gilead" here represents the tribes of Gad and half of Manasseh.

They had settled east of the Jordan River.

Their land sat outside the immediate danger zone west of the river.

Distance from the fighting became their excuse for staying home.

🗺️ Gilead represents Gad and half Manasseh

🌊 Their land sat east of the Jordan

📏 Distance became their excuse to stay

➡️ Being far away is still a choice

## ⛵ Why Did Dan Remain In Ships

Dan's territory bordered the coast.

That gave the tribe a strong interest in shipping and trade.

The question implies Dan cared more about business than about joining Israel's fight.

⛵ Dan's land bordered the coast

💰 Trade interests likely kept them home

❓ The question implies misplaced priorities

📖 Comfort and profit can crowd out duty

## 🌊 Asher Continued On The Sea Shore

Asher also lived along the coast.

They chose to stay in their harbors rather than march inland to fight.

"Abode in his breaches" describes staying settled in coastal inlets.

Two more tribes now stand named among those who chose comfort over battle.

🌊 Asher stayed in coastal harbors

🏘️ Breaches means inlets and harbor towns

📋 Two more tribes are named as absent

➡️ Comfort kept them from the fight

## ⚔️ Jeoparded Their Lives Unto The Death

Zebulun and Naphtali are praised in sharp contrast to the tribes just named.

"Jeoparded their lives unto the death" means they risked everything.

They were fully willing to die in this fight.

"The high places of the field" points to the exposed, open battlefield.

The song sets absence and courage side by side on purpose.

⚔️ Zebulun and Naphtali risked their lives fully

💀 They were willing to die in battle

🏔️ High places means the open battlefield

📖 Courage and absence sit side by side

# Judges 5:19-23
# ⚡ The Battle And The Curse
---
## 🏰 In Taanach By The Waters Of Megiddo

Taanach and Megiddo were two fortified cities near the same river valley.

This location names the actual battlefield where Sisera's army was defeated.

Megiddo later becomes famous in scripture as a symbol of great final battles.

🏰 Taanach and Megiddo were real cities

🗺️ This names the actual battlefield

📖 Megiddo later symbolizes great final battles

➡️ A real place anchors this poetic memory

## 💰 They Took No Gain Of Money

This does not mean the enemy kings lost interest in wealth.

It means they came expecting easy plunder and left with nothing.

Their defeat was total enough that even greed could not be satisfied.

💰 They expected easy plunder here

🚫 They left with nothing at all

📉 Their defeat was total, not partial

➡️ Even greed found nothing to take

## ☁️ They Fought From Heaven

This line states plainly that God fought alongside Israel.

Israel's small, poorly armed force could not explain this victory alone.

Verse eight already showed how unarmed Israel really was.

The song credits heaven itself, not superior weapons or numbers.

☁️ Heaven fought alongside Israel here

⚔️ Israel's army was small and unarmed

🏆 The victory cannot be explained naturally

📖 God gets full credit for this win

## ⭐ The Stars In Their Courses Fought Against Sisera

This does not describe a literal battle in outer space.

Many scholars believe this poetic image points to a storm God sent.

That storm likely flooded the battlefield at the worst moment for Sisera's chariots.

Mud and rising water could trap heavy iron chariots that had seemed unstoppable.

The very weapon that made Sisera's army frightening became useless.

⭐ Stars fighting is poetic, not literal

🌧️ It likely points to a storm God sent

🚗 Mud trapped Sisera's iron chariots

📖 God turned their strongest weapon useless

## 🌊 The River Of Kishon Swept Them Away

The Kishon was a real river running through this same valley.

It was known to flood suddenly during storms.

Calling it "that ancient river" adds weight, as if the land itself remembers this day.

Fleeing soldiers and stuck chariots likely got caught in the sudden rising water.

🌊 Kishon was a real river in the valley

⛈️ It could flood suddenly during storms

🏃 Fleeing soldiers got caught in the water

📖 Even the land remembered this day

## 🗣️ O My Soul Thou Hast Trodden Down Strength

Deborah speaks directly to her own soul in this line.

It marks the emotional peak of the song.

"Trodden down strength" means she watched a powerful enemy get crushed completely.

The personal tone shows how deeply this victory affected her, not just the nation.

🗣️ Deborah speaks directly to her own soul

👣 Trodden down strength means total defeat

❤️ This shows her personal, deep relief

📖 National victory felt personal to her too

## 🐎 Then Were The Horsehoofs Broken By The Means Of The Pransings

"Pransings" describes horses galloping and stamping hard and fast, often in panic.

This pictures the enemy's own war horses pounding through the mud and chaos of their defeat.

Even the animals meant to give Sisera's army an advantage turned into part of the disaster.

🐎 Pransings means frantic, hard galloping

🌊 Horses panicked in the mud and chaos

⚔️ Their own strength turned into disaster

➡️ Nothing about their advantage held up

## 👼 Curse Ye Meroz Said The Angel Of The LORD

Meroz was likely a town or clan located near the battle.

They had the chance to help but did not.

An angel of the LORD pronounces this curse.

That gives it unusual weight.

Unlike Reuben, Dan, or Asher, Meroz gets a formal curse instead of a pointed question.

🏘️ Meroz was likely a nearby town or clan

👼 An angel of the LORD pronounces this curse

⚖️ This is stronger than the earlier questions

📖 Nearby, able, and unwilling carries real weight

## 🤝 Because They Came Not To The Help Of The LORD

Failing to help Israel in this fight counted as failing to help God Himself.

The phrase "to the help of the LORD" repeats twice in one verse for emphasis.

Neutrality was not treated as a safe option here.

🤝 Not helping Israel meant not helping God

🔁 The phrase repeats twice for emphasis

🚫 Neutrality was not treated as safe

📖 Standing aside still counts as a choice

# Judges 5:24-27
# 🗡️ Jael's Deed
---
## 🏕️ Jael The Wife Of Heber The Kenite

The Kenites were a nomadic people connected by marriage to Moses' father in law.

They were not a tribe of Israel.

Heber, Jael's husband, had actually made peace with Sisera's king back in Judges four.

That makes Jael's choice to help Israel a risky, personal decision.

🏕️ Kenites were nomads tied to Moses' family

🤝 Heber had made peace with Sisera's king

😳 Jael's choice went against that peace

📖 She acted on her own conviction

## 🏆 Blessed Above Women

This is the highest praise the song gives to any single person.

That includes Deborah and Barak.

Jael was not a soldier and held no formal role in Israel's leadership.

One decisive, brave act earned her the greatest honor in the entire song.

🏆 Highest praise in the whole song

🚫 Jael held no formal role or title

💪 One brave act earned that honor

📖 Courage mattered more than position

## 🥛 He Asked Water And She Gave Him Milk

This is not simply a kind gesture of hospitality.

Milk was richer and more filling than the water he asked for.

Rich food likely made an exhausted man drowsy.

Jael was quietly setting up the moment that follows.

🥛 Milk was richer than plain water

😴 Rich food likely made him drowsy

🎭 This set up what happens next

➡️ Hospitality here hid a real plan

## 🍽️ Butter In A Lordly Dish

"Lordly dish" means a fine bowl usually reserved for someone important.

It was not ordinary tableware.

Serving Sisera this way flattered him and lowered his guard even further.

Every detail in this scene builds toward the moment he never sees coming.

🍽️ Lordly dish means a bowl for someone important

😌 It flattered Sisera and lowered his guard

🎯 Every detail builds toward what follows

📖 Kindness became part of the plan

## 🔨 She Put Her Hand To The Nail

"The nail" refers to a tent peg, an ordinary tool for securing a tent to the ground.

Setting up tents was typically women's work in this nomadic culture.

That means Jael already had both tools close at hand.

An everyday household object becomes the weapon in this scene.

🏕️ The nail means an ordinary tent peg

👩 Setting up tents was typically women's work

🔨 A household object became a weapon

📖 God can use the ordinary and unexpected

## ⚔️ She Smote Off His Head

This graphic repetition is not the song exaggerating for shock value.

Ancient victory poetry often repeated violent detail to stress how total a defeat was.

Sisera commanded nine hundred iron chariots and still died at the hand of one woman.

🔨 Repetition stresses total certainty here

⚔️ Ancient poetry often repeated violent detail

🚗 Sisera commanded nine hundred iron chariots

📖 One woman ended his entire threat

## 🔁 At Her Feet He Bowed He Fell He Lay Down

This line repeats with small variations to slow the moment down.

Poetry often lingers on a key moment instead of rushing past it.

The once mighty commander now lies completely still, exactly where he fell.

🔁 Repetition slows down this key moment

🐢 Poetry lingers instead of rushing past

👑 The mighty commander now lies still

📖 The song makes sure this moment is felt

# Judges 5:28-30
# 🪟 Sisera's Mother Waits
---
## 👩 The Mother Of Sisera Looked Out At A Window

The song suddenly shifts to a grieving mother.

She does not yet know her son is dead.

The reader already knows what happened in the verses just before this one.

That gap between what she believes and what actually happened gives this scene its weight.

👩 Focus shifts to Sisera's mother

❓ She does not yet know he is dead

😢 The reader already knows the truth

📖 Dramatic irony gives this scene its weight

## 🪟 Cried Through The Lattice

A "lattice" is a screened window covering, common in homes of this period.

"Cried" here means calling out anxiously.

It does not mean weeping yet.

She is watching and waiting, not mourning.

🪟 Lattice means a screened window covering

😟 Cried here means calling out anxiously

👀 She is watching and waiting still

➡️ Not yet grief, only growing worry

## ❓ Why Is His Chariot So Long In Coming

This question carries real dramatic irony.

The reader already knows exactly why he never arrives.

A mother's simple worry about a late homecoming sits right next to that knowledge.

The song lets this contrast do the work instead of stating it directly.

❓ Her question hides a tragic answer

😢 The reader already knows the truth

🎭 Dramatic irony drives this scene

📖 Silence can say more than a statement

## 👑 Her Wise Ladies Answered Her

These were likely noblewomen attending Sisera's mother.

They offer comforting guesses to ease her worry.

Their answer is not based on any real news from the battle.

It is a hopeful guess dressed up as confident reassurance.

👑 Wise ladies were noblewomen attending her

🤷 Their answer is only a hopeful guess

😌 It is dressed up as confidence

➡️ Comfort without truth is still false comfort

## 😨 Have They Not Divided The Prey

This does not describe innocent souvenirs from the battlefield.

"A damsel or two" pictures captured women treated as war trophies.

That was expected as a normal spoil for each soldier.

This detail exposes exactly how the enemy viewed the people they conquered.

🚫 Prey here means captured people and goods

😨 Women were treated as expected war trophies

💔 This exposes the enemy's true mindset

📖 The imagined victory reveals real cruelty

## 🧵 A Prey Of Divers Colours Of Needlework

"Divers colours" means brightly dyed, richly patterned cloth.

That kind of cloth was an expensive luxury in this era.

The phrase repeats several times in one verse, picturing greedy anticipation.

None of this imagined plunder will ever actually reach Sisera.

🧵 Divers colours means richly dyed cloth

🔁 Repetition pictures greedy anticipation

🚫 None of this plunder ever arrives

📖 The imagined ending never comes true

# Judges 5:31
# ☀️ The Land Had Rest
---
## 🙏 So Let All Thine Enemies Perish O LORD

This closing line is not a call for personal revenge.

It is a prayer that anyone who opposes God ends up like Sisera.

The song closes the same way it opened, aimed at God rather than at Israel's own strength.

🙏 This is a prayer, not personal revenge

⚔️ It asks God's enemies to share Sisera's fate

🔁 The song closes the way it opened

📖 God, not Israel's strength, gets the final word

## ☀️ As The Sun When He Goeth Forth In His Might

This compares those who love God to the sun rising in full strength.

A sunrise cannot be delayed, hidden, or argued with.

That is the picture the song chooses for God's people at their best.

☀️ Sun rising pictures full, unstoppable strength

🌅 A sunrise cannot be stopped or hidden

❤️ This describes those who love God

📖 The song ends on a picture of strength

## 📜 And The Land Had Rest Forty Years

This closing line is a formula repeated throughout the book of Judges.

It follows each period of deliverance.

"Forty years" marks about one generation of peace before the cycle begins again.

This same phrase closes other judges' stories earlier and later in the book.

Peace, in this book, is never described as permanent.

📜 This formula repeats throughout Judges

🔢 Forty years marks about one generation

🔁 The same phrase closes other judges' stories

📖 Peace in Judges is never called permanent
`.trim();

export const JUDGES_FIVE_PERSONAL_SECTIONS = parseJudgesFiveRawNotes(JUDGES_FIVE_RAW_NOTES);
