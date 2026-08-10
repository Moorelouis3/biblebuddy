export type FirstSamuelThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelThirteenRawNotes(rawText: string): FirstSamuelThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 13:${startVerse}` : `1 Samuel 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Samuel 13 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_THIRTEEN_RAW_NOTES = `# FirstSamuel 13:1-3
# 🎺 Saul's Reign And Jonathan's Strike
---
## 📜 Saul Reigned One Year

This verse follows a set pattern used to introduce Israel's kings.

The pattern always gives a king's age at the start, then how long he ruled.

The number for Saul's starting age is missing from the Hebrew text.

Many scholars believe a copyist lost that number long before any surviving copy was made.

This chapter is not a summary of Saul's whole reign.

It opens the story of one crisis early in his kingship.

📜 Kings are always introduced this way

🔢 A king's starting age comes first

❓ Saul's exact age went missing early

➡️ This chapter covers one early crisis

## 🎯 Saul Chose Him Three Thousand Men Of Israel

"Chose him" means Saul personally selected these men.

This was not a nationwide draft calling up every man in Israel.

Ancient Israel had no standing army before this point in its history.

A king who raises his own selected force acts like the kings of other nations.

That is exactly what Israel had asked for back in chapter eight.

🎯 Chose means Saul personally selected them

🚫 This was not a nationwide draft

🏛️ Israel had no standing army yet

📖 Saul now rules like the nations wanted

## 🗺️ Two Thousand Were With Saul In Michmash And In Mount Bethel

Michmash and Bethel sat close together in the hill country north of Jerusalem.

Saul kept the larger share of his force near his own position.

This placed his troops close to the coming fight with the Philistines.

Keeping the main force nearby was a basic move for any king leading a war.

🗺️ Michmash and Bethel sat close together

👑 Saul kept the larger force near himself

⚔️ This placed troops near the coming fight

📖 Kings led their armies from the front

## ⚔️ A Thousand Were With Jonathan In Gibeah Of Benjamin

This is the first time Jonathan appears by name in the Bible.

He is Saul's son, and Gibeah was Saul's own hometown and capital.

Splitting off a full thousand men shows Jonathan already held real command.

Jonathan's story as a warrior and leader begins right here.

🆕 Jonathan is introduced here by name

🏠 Gibeah was Saul's own hometown

⚔️ A thousand men shows real command

📖 Jonathan's story as a leader starts here

## 🏕️ And The Rest Of The People He Sent Every Man To His Tent

"To his tent" means sent back home to daily life.

Saul kept only three thousand men and released everyone else.

That is a small force to defend a whole nation from invasion.

This small number matters once the Philistines gather for battle in the next verses.

🏕️ To his tent means sent home

🔢 Only three thousand men stayed with Saul

⚠️ That was a small force for a nation

➡️ The next verses show why that mattered

## 🏰 Jonathan Smote The Garrison That Was In Geba

A garrison was a small group of enemy soldiers stationed to hold a location.

Geba sat inside territory the Philistines had been controlling.

"Smote" means Jonathan attacked and struck them down, not just harassed them.

This was Jonathan's first recorded act of war in the story.

🏰 A garrison is a stationed enemy outpost

📍 Geba was under Philistine control

⚔️ Smote means Jonathan struck them down

📖 This was Jonathan's first act of war

## 📯 Saul Blew The Trumpet Throughout All The Land

The trumpet here was a ram's horn, not a brass instrument.

Blowing it was Israel's standard way to sound an alarm or call troops to war.

Saul used it to turn Jonathan's raid into a call for national war.

One young man's attack just became the whole nation's problem.

📯 The trumpet was a ram's horn

🚨 It was Israel's standard war alarm

📢 Saul used it to call the nation

➡️ One raid became a national crisis

## 🏷️ Let The Hebrews Hear

"Hebrews" was often a name outsiders used for Israel's people, especially their enemies.

Saul phrases his announcement almost like the Philistines themselves would describe it.

Saul does not mention Jonathan's name in this announcement at all.

The victory becomes Saul's rallying cry, even though Jonathan struck the blow.

🏷️ Hebrews was a name outsiders used

📢 Saul frames it as a national call

🙅 Jonathan's name goes unmentioned

📖 Saul claims the moment as his own

# FirstSamuel 13:4-7
# 😨 Israel Hides In Fear
---
## 💢 Israel Also Was Had In Abomination With The Philistines

"Abomination" usually describes something detestable in God's sight.

Here it describes how the Philistines now felt about Israel.

Jonathan's attack turned simmering tension into open hatred between the two nations.

There was no going back to an uneasy peace after this.

💢 Abomination means something deeply hated

👹 The Philistines now hated Israel openly

⚔️ Jonathan's attack ended an uneasy peace

➡️ War was now unavoidable

## 🏕️ The People Were Called Together After Saul To Gilgal

Gilgal was where Israel first camped after crossing the Jordan into the promised land.

It was also where Saul had just been confirmed as king in chapter eleven.

Gathering there again connects this new crisis back to that earlier victory.

The same place that once marked a fresh start now becomes a place of fear.

🏕️ Gilgal was Israel's first camp in Canaan

👑 Saul was confirmed king there

🔄 The same place returns for a new crisis

📖 The same place now holds fear

## 🐎 Thirty Thousand Chariots

Thirty thousand chariots would be an enormous force for this era.

Even Egypt, the strongest military power nearby, rarely fielded numbers that high.

Many scholars believe an early copying error changed an original three thousand into thirty thousand.

Either way, the text wants the reader to feel an overwhelming force.

🐎 Thirty thousand chariots was an enormous number

🇪🇬 Even Egypt rarely matched that size

🔢 A copying error may explain the number

📖 The point is an overwhelming force

## 🏚️ Pitched In Michmash, Eastward From Bethaven

"Bethaven" means house of wickedness or house of emptiness.

Some believe it was a small town near Bethel, whose name means house of God.

Later prophets used Bethaven as a mocking substitute name for Bethel itself.

Camping near a place with that name adds a dark note to the scene.

🏚️ Bethaven means house of wickedness

📍 It sat near Bethel, house of God

😏 Prophets later used the name as mockery

📖 The setting carries a dark undertone

## 😰 The People Did Hide Themselves In Caves, And In Thickets, And In Rocks

"In a strait" means squeezed into a position with no good options.

Caves, thickets, rocks, and pits were the only shelter the hill country offered.

This was not a strategic retreat, it was outright panic in the army.

Fear had already scattered the very force Saul was counting on.

😰 In a strait means trapped with no options

🕳️ Caves and pits were the only shelter

😨 This was panic, not strategy

📖 Fear was scattering Saul's own army

## 🏃 Some Of The Hebrews Went Over Jordan To The Land Of Gad And Gilead

These were Israelite soldiers, not enemies, choosing to run rather than fight.

Crossing the Jordan put a whole river between them and the Philistine threat.

Gad and Gilead were territories on the far side of the Jordan, away from the danger.

Saul's army was shrinking before a single battle had even begun.

🏃 Israelite soldiers fled rather than fight

🌊 The Jordan gave them distance from danger

🗺️ Gad and Gilead sat on the far side

📖 The army was shrinking before battle began

## 😨 All The People Followed Him Trembling

Trembling here means shaking from real fear, not just nervous energy.

The men who stayed with Saul were not confident, they were terrified.

Saul's new kingdom is being tested by fear before it is tested by battle.

This is the exact pressure that leads to Saul's mistake in the next verses.

😨 Trembling means shaking from real fear

👑 Saul's men stayed, but terrified

⚠️ Fear is testing the kingdom already

➡️ This pressure leads to Saul's next mistake

# FirstSamuel 13:8-10
# 🔥 Saul Offers The Sacrifice
---
## 📜 He Tarried Seven Days, According To The Set Time That Samuel Had Appointed

This instruction goes back to 1 Samuel chapter ten, right after Saul was anointed.

Samuel had told Saul then to wait seven days at Gilgal for him to arrive.

That wait was meant to test whether Saul would trust Samuel's word under pressure.

Seven days of a shrinking, terrified army made that test much harder.

📜 This command goes back to chapter ten

⏳ Saul was told to wait seven days

🧪 The wait was a test of trust

📖 Fear made the test much harder

## ⏰ Samuel Came Not To Gilgal, And The People Were Scattered From Him

The deadline arrived, and Samuel still had not come.

Saul was watching his own army disappear in real time.

Every hour of waiting cost him more soldiers than the one before it.

The pressure to act kept building toward the breaking point.

⏰ The deadline came and Samuel was absent

📉 Saul watched his army shrink further

⏳ Every hour cost him more soldiers

➡️ The pressure built toward a breaking point

## 🔥 Bring Hither A Burnt Offering To Me, And Peace Offerings

A burnt offering was fully burned up as a gift devoted entirely to God.

A peace offering was partly burned and partly shared in a meal with God.

Offering sacrifices like these was normally the role of a priest, not a king.

Saul is about to step into a role that was never his to take.

🔥 A burnt offering was fully given to God

🍽️ A peace offering was shared as a meal

👤 Offering sacrifices was a priest's role

➡️ Saul is about to overstep that role

## 🚫 He Offered The Burnt Offering

Saul does not just ask for the sacrifice, he personally carries it out.

Nothing in his calling as king ever gave him that authority.

Samuel had told him plainly to wait for him to come and offer it.

This single choice becomes the reason everything unravels next.

🔥 Saul personally performs the sacrifice

🚫 Kingship never gave him that authority

📜 Samuel had told him to wait

📖 This choice unravels everything that follows

## ⏱️ As Soon As He Had Made An End Of Offering The Burnt Offering, Behold, Samuel Came

Samuel arrives within moments of Saul finishing the offering.

A little more patience would have meant Saul never crossed this line.

The timing makes Saul's failure impossible to excuse as simple bad luck.

A test always seems to end right before the wait is over.

⏱️ Samuel arrives moments too late

😩 A little more patience would have been enough

🚫 The timing removes any excuse

📖 The test ended right before it was due

## 🤝 Saul Went Out To Meet Him, That He Might Salute Him

"Salute" here means to greet warmly, not a military gesture.

Saul walks out acting as if nothing was wrong.

He is about to find out that Samuel already knows what happened.

A warm greeting is a strange opening to the confrontation that follows.

🤝 Salute means to greet warmly

😐 Saul acts as if nothing happened

👀 Samuel already knows the truth

➡️ A warm greeting opens a hard confrontation

# FirstSamuel 13:11-15
# ⚖️ Samuel's Verdict
---
## ❓ What Hast Thou Done?

Samuel already knows what happened before he asks this.

The question is not a real request for information.

It is meant to make Saul say the failure out loud himself.

Naming a mistake out loud is harder than having it discovered.

❓ Samuel already knows the answer

🎯 The question forces Saul to admit it

🗣️ Saying it out loud is harder

📖 Confession is the point of the question

## 👀 Because I Saw That The People Were Scattered From Me

Saul opens with what he saw, not with what God had said.

His decision is driven entirely by the shrinking size of his army.

Fear of circumstances is replacing trust in Samuel's word.

This is the same fear that had already made the whole army tremble.

👀 Saul leads with what he saw

📉 His army's shrinking size drove the choice

😨 Fear replaced trust in Samuel's word

📖 The same fear had gripped the whole army

## 👉 And That Thou Camest Not Within The Days Appointed

Saul shifts part of the blame onto Samuel's timing.

Samuel does arrive, just after the offering is already finished.

Blaming another person's timing is a common way to excuse a rushed decision.

The excuse does not hold up, since those seven days were the agreed test all along.

👉 Saul blames Samuel's timing

⏱️ Samuel arrives just after the offering

🗣️ Blaming timing excuses a rushed choice

📖 The excuse ignores that this was the test

## 😖 I Forced Myself Therefore, And Offered A Burnt Offering

"Forced myself" means Saul felt he had no other option.

He treats the sacrifice as something forced on him.

Real obedience under pressure looks like waiting, not finding a way around it.

Saul explains his fear clearly, but a clear explanation is not the same as being right.

😖 Forced myself means he felt cornered

🚫 He treats it as unavoidable, not chosen

⏳ Real obedience would have kept waiting

📖 Explaining is not the same as excusing

## 🙅 Thou Hast Done Foolishly

"Foolishly" in this kind of statement means far more than a careless mistake.

It describes a choice that disregards God, not just a poor decision.

Samuel is naming a moral failure, not criticizing Saul's judgment as a general.

The word cuts straight past the excuses Saul just gave.

🙅 Foolishly means more than careless

💔 It names disregard for God

⚖️ This is a moral failure, not bad judgment

📖 The word cuts past every excuse

## 👑 For Now Would The LORD Have Established Thy Kingdom Upon Israel For Ever

God had been ready to make Saul's family the permanent royal line.

That offer was real, and it was standing right up until this decision.

One act of impatience closed a door that would not open again.

The size of what was lost only becomes clear after it is gone.

👑 God offered a permanent royal line

🚪 That door was open until this moment

💔 Impatience closed it for good

📖 The loss is clear only after the fact

## 🎯 The LORD Hath Sought Him A Man After His Own Heart

This man is not named yet in the story.

Readers later learn this is David, though Saul does not know that here.

"After his own heart" describes someone whose loyalty matches what God actually wants.

Saul's failure and this future king's calling happen in the very same breath.

❓ The man is not named yet

🎯 Readers later learn this is David

❤️ After his own heart means true loyalty

📖 Saul's fall and David's calling meet here

## 🚶 Samuel Arose, And Gat Him Up From Gilgal Unto Gibeah Of Benjamin

Samuel simply leaves after delivering this verdict.

He offers no comfort and no second chance in this scene.

His departure leaves Saul to face the coming battle without the prophet's support.

The silence that follows says as much as Samuel's words just did.

🚶 Samuel leaves without comfort

🚫 No second chance is offered here

⚔️ Saul faces the battle alone

📖 Silence speaks as loud as the words

## 🔢 Saul Numbered The People That Were Present With Him, About Six Hundred Men

Saul started this chapter with three thousand chosen men.

Only six hundred are left standing with him now.

That is a loss of four out of every five soldiers before any battle was fought.

Saul is about to face a huge Philistine army with a fraction of his force.

🔢 Saul began with three thousand men

📉 Only six hundred now remain

💔 Four of five soldiers are gone

📖 Saul faces battle badly outnumbered

# FirstSamuel 13:16-18
# 🗡️ Philistine Raiders
---
## 📍 Abode In Gibeah Of Benjamin: But The Philistines Encamped In Michmash

Gibeah and Michmash sat only a few miles apart in the hill country.

Saul's small remaining force and the huge Philistine army were now within sight of each other.

Neither side was fighting yet, but both were watching and waiting.

The standoff itself was already a kind of pressure on Saul's shrinking army.

📍 The two camps sat only miles apart

👀 Both armies were within sight of each other

⏳ Neither side had moved to fight yet

📖 The standoff added to Saul's pressure

## 🗡️ The Spoilers Came Out Of The Camp Of The Philistines In Three Companies

"Spoilers" means raiding parties sent out to plunder, not the main army marching to battle.

Sending three separate raiding groups let the Philistines strike many places at once.

This kind of raiding terrorized the countryside without a full battle yet.

The Philistines were showing Israel exactly how much control they already held.

🗡️ Spoilers means raiding parties

🔀 Three groups struck multiple places at once

😨 Raids terrorized the land without full battle

📖 It showed Israel who held control

## 📍 One Company Turned Unto The Way That Leadeth To Ophrah, Unto The Land Of Shual

Ophrah was a town north of Michmash.

"Shual" means fox, and likely named a wider district around that town.

This raiding party swept the land in that northern direction.

Every direction the Philistines rode, they found no army left to stop them.

📍 Ophrah sat north of Michmash

🦊 Shual means fox, a district name

🧭 This raid swept the northern area

📖 No army was left to stop them

## 🛤️ Another Company Turned The Way To Bethhoron

Bethhoron guarded a major mountain pass connecting the coast to the hill country.

Joshua had won a famous battle on that same pass generations earlier.

Controlling Bethhoron meant controlling a key route in and out of Israel's territory.

The Philistines were now free to raid the ground of an old Israelite victory.

🛤️ Bethhoron guarded a major mountain pass

📜 Joshua once won a battle there

🗺️ It controlled a key route into Israel

📖 Enemies now raided an old victory site

## 🐾 Another Company Turned To The Way Of The Border That Looketh To The Valley Of Zeboim Toward The Wilderness

"Zeboim" means hyenas, a name likely tied to the wild animals living in that valley.

This raiding party rode east, toward the edge of the wilderness near the Jordan.

Between the three raids, the Philistines had covered nearly every direction out of Michmash.

Saul's kingdom was being squeezed from every side at once.

🐾 Zeboim means hyenas

🧭 This raid rode east toward the wilderness

🔄 The three raids covered nearly every direction

📖 Saul's kingdom was squeezed on all sides

# FirstSamuel 13:19-23
# 🔨 No Smith In Israel
---
## 🔨 There Was No Smith Found Throughout All The Land Of Israel

A smith is a craftsman who works metal into tools and weapons.

The Philistines controlled the technology for working iron at this point in history.

Israel had no way to produce its own iron weapons at all.

This single gap in skill left the whole nation dependent on its enemy.

🔨 A smith works metal into tools

⚙️ Philistines controlled iron working technology

🚫 Israel could not produce iron weapons

📖 The whole nation depended on its enemy

## 🚫 For The Philistines Said, Lest The Hebrews Make Them Swords Or Spears

This was not an accident of trade or geography.

The Philistines banned smithing in Israel on purpose to keep the nation weak.

A people that cannot make weapons cannot mount a real rebellion.

Saul's small army was already the result of a deliberate enemy strategy.

🚫 The ban was intentional, not accidental

⚔️ It kept Israel from arming itself

🛡️ A disarmed people cannot rebel easily

📖 Saul's weak army came from that strategy

## 🌾 Went Down To The Philistines, To Sharpen Every Man His Share, And His Coulter

A share, or plowshare, was the metal blade that cut into the soil on a plow.

A coulter was a second blade on the plow that sliced the ground ahead of the share.

Both were basic farming tools, not weapons at all.

Even ordinary farm work now required a trip into enemy territory.

🌾 A share was a plow's cutting blade

🔪 A coulter sliced ahead of the share

🚜 Both were farming tools, not weapons

📖 Even farm work depended on the enemy

## 🪓 His Axe, And His Mattock

An axe was used for chopping wood, much like today.

A mattock was a heavy digging tool, something like a pickaxe for breaking up soil.

Together with the share and coulter, these were every farmer's basic equipment.

None of these tools could stand in for a real sword in a battle.

🪓 An axe was used for chopping wood

⛏️ A mattock was a heavy digging tool

🌾 These were basic farm equipment

📖 None of them worked as real weapons

## ❓ Yet They Had A File For The Mattocks, And For The Coulters, And For The Forks, And For The Axes

The word translated "file" here was a genuine mystery for a long time.

No one was fully sure what the original Hebrew word meant.

Archaeologists later found small stone weights stamped with that same word.

Those weights now suggest the word named a price paid for sharpening, not a tool at all.

❓ The word file was long a mystery

🏺 Archaeologists found weights stamped with it

💰 It likely named a sharpening price

📖 Old digs can still explain old words

## ⚔️ So It Came To Pass In The Day Of Battle, That There Was Neither Sword Nor Spear Found

This confirms just how disarmed Saul's remaining six hundred men really were.

Most of them likely carried farm tools instead of real weapons into battle.

Facing a large, armed Philistine force with plow blades was a desperate position.

The odds against Israel were far worse than numbers alone could show.

⚔️ Most soldiers had no real weapons

🌾 Farm tools stood in for swords and spears

😨 The odds were desperate before the fight began

📖 The disadvantage went beyond numbers alone

## 🗡️ But With Saul And With Jonathan His Son Was There Found

Only the king and his son are described as carrying real weapons.

Everyone else with them went into danger with whatever tool they had at hand.

This detail sets up Jonathan's coming raid on the Philistine garrison next chapter.

A single true weapon in Jonathan's hand is about to matter a great deal.

🗡️ Only Saul and Jonathan had real weapons

🌾 Everyone else carried farm tools instead

➡️ This sets up Jonathan's raid next chapter

📖 One good weapon is about to matter

## 🏔️ And The Garrison Of The Philistines Went Out To The Passage Of Michmash

The passage of Michmash was a narrow mountain crossing between the two camps.

Philistine soldiers now moved to guard that crossing directly.

This detail closes the chapter right at the edge of the coming fight.

The next chapter picks up at this exact pass, with Jonathan at the center of it.

🏔️ The passage was a narrow mountain crossing

🛡️ Philistines moved to guard it directly

⏳ The chapter ends right at this edge

➡️ Jonathan returns to this pass next
`.trim();

export const FIRST_SAMUEL_THIRTEEN_PERSONAL_SECTIONS = parseFirstSamuelThirteenRawNotes(FIRST_SAMUEL_THIRTEEN_RAW_NOTES);
