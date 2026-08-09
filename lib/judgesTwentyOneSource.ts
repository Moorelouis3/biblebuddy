export type JudgesTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesTwentyOneRawNotes(rawText: string): JudgesTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 21:${startVerse}` : `Judges 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Judges 21 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_TWENTY_ONE_RAW_NOTES = `# Judges 21:1-4
# 😢 Israel Mourns The Missing Tribe
---
## 📍 Sworn In Mizpeh

This oath was not made after the war.

It was made in Mizpeh before the fighting against Benjamin ever began.

Judges chapter twenty already recorded this same gathering and this same vow.

Now Israel is stuck living inside a promise made before anyone saw its true cost.

📍 Mizpeh is where the war vow began

⚔️ The oath came before the fighting, not after

📜 Judges twenty already recorded this vow

➡️ A hasty promise now shapes what happens next

---
## 🚫 Give His Daughter Unto Benjamin To Wife

The men of Israel had vowed never to let their daughters marry into the tribe of Benjamin.

A marriage vow like this was not a small social rule.

Marriage was how a tribe stayed alive from one generation to the next.

By cutting off marriage, Israel had accidentally cut off Benjamin's future too.

🚫 No Israelite daughter could marry a Benjamite

👪 Marriage kept a tribe alive across generations

💔 The vow threatened to erase Benjamin

➡️ One angry promise created a second crisis

---
## ⛺ The House Of God

"The house of God" refers to the tabernacle, the tent where Israel worshiped and the ark rested.

At this point in Israel's history the tabernacle stood in Shiloh, not yet in a permanent temple.

Coming here was not a casual stop.

It meant standing in the one place Israel believed God's presence actually dwelled.

⛺ House of God means the tabernacle

📦 The ark of the covenant rested there

🗺️ At this time it stood in Shiloh

📖 They came to stand before God himself

---
## 😭 Lifted Up Their Voices, And Wept Sore

"Wept sore" means they cried with intense, uncontrolled grief, not quiet tears.

Only chapters earlier this same nation was furious enough to nearly wipe out an entire tribe.

Now that same nation lies on the ground in grief over what it did.

Rage and regret can belong to the very same people within days of each other.

😭 Wept sore means intense uncontrolled grief

⚔️ This same nation just fought Benjamin

🔄 Fury turned into regret within days

➡️ Anger and grief can share one cause

---
## ❓ Why Is This Come To Pass In Israel

This question is not really asking what happened.

Everyone already knows what happened.

It is a cry of disbelief that their own nation caused this much damage to itself.

Israel is grieving a wound it gave to its own body.

❓ The question is disbelief, not confusion

🪞 Israel is grieving a self inflicted wound

⚔️ They already know what caused it

📖 Self examination follows the anger

---
## 🧩 One Tribe Lacking In Israel

Israel was built from twelve tribes, each one tracing back to one of Jacob's sons.

Losing Benjamin as a functioning tribe meant losing a permanent piece of that twelve part family.

This was not just about numbers.

It threatened to break a structure God had set in place generations earlier.

🔢 Israel was built from twelve tribes

👪 Each tribe traced to a son of Jacob

🧩 Losing Benjamin broke that structure

➡️ A missing tribe meant more than a number

---
## 🌅 Rose Early, And Built There An Altar

Building an altar first thing in the morning shows how urgent this felt to them.

This was not a delayed, half hearted response.

They turned to worship before they turned to a plan.

Grief sent them toward God before it sent them toward a solution.

🌅 Rising early shows real urgency

🪨 An altar came before any plan

🙏 Worship came before problem solving

➡️ Grief pointed them toward God first

---
## 🔥 Burnt Offerings And Peace Offerings

A burnt offering was completely burned up and given entirely to God.

Nothing was kept back for the person bringing it.

A peace offering was partly burned and partly shared in a meal.

Sharing that meal restored fellowship between the offerer and God.

Together they cover full surrender for sin and restored fellowship with God.

🔥 Burnt offerings were given completely to God

🍽️ Peace offerings restored fellowship through a shared meal

🙌 Together they cover sin and restoration

📖 Worship addressed guilt and relationship at once

# Judges 21:5-7
# 🤔 Searching For A Loophole
---
## ⚖️ He Shall Surely Be Put To Death

Before the war even began, Israel made a second vow at Mizpeh.

Any tribe that skipped the assembly and refused to help fight Benjamin faced death.

That old vow is about to become the loophole that saves Benjamin's future.

A forgotten promise from before the war is about to solve the problem the war caused.

⚔️ A second vow was made before the fighting

🚫 Skipping the assembly carried a death penalty

🔑 That old vow becomes today's loophole

➡️ An old promise solves a new problem

---
## 😔 Repented Them For Benjamin Their Brother

"Repented" here means they deeply regretted what had happened, not that they apologized directly.

Calling Benjamin "their brother" matters.

Even after a brutal civil war, Israel still calls the tribe family, not enemy.

Kinship survived the fighting even though so many Benjamites did not.

😔 Repented means deep regret, not an apology

👪 Brother shows Benjamin was still family

⚔️ Kinship outlasted the war itself

📖 Regret grew out of love, not just guilt

---
## 🌳 There Is One Tribe Cut Off From Israel This Day

This is the same twelve tribe concern from verse three, said again with more weight.

"Cut off" is stronger than simply reduced or weakened.

It means completely severed, like a branch removed from a tree.

Israel is describing Benjamin as functionally gone, not just diminished.

🌳 Cut off means completely severed

🔁 This repeats the concern from verse three

📉 Benjamin looked functionally gone

➡️ The nation feared a permanent loss

---
## 👰 How Shall We Do For Wives For Them That Remain

This question is about survival, not romance.

A tribe without wives cannot produce the next generation.

Judges twenty already reported only six hundred Benjamite men survived the war.

Without wives, those six hundred men are the last generation of their tribe.

👰 Wives were needed for survival, not romance

🔢 Six hundred men survived the war

⏳ No wives means no next generation

➡️ Benjamin's whole future rests on this question

---
## 📜 Sworn By The LORD That We Will Not Give Them Of Our Daughters

A modern reader might expect Israel to simply take the vow back now that they regret it.

In this culture, a vow made in the LORD's name could not be casually canceled.

Judges eleven already showed how seriously a vow was treated, even when it caused real pain.

Israel has to find a way around the oath instead of breaking it outright.

🙅 They could not simply cancel the vow

📜 Vows made to the LORD were binding

🔁 Judges eleven already showed this pattern

➡️ They needed a workaround, not a broken promise

# Judges 21:8-12
# ⚔️ The Judgment On Jabeshgilead
---
## 🗺️ Jabeshgilead

"Jabeshgilead" was a city east of the Jordan River, in the region called Gilead.

It sat outside the main cluster of Israelite tribal land west of the Jordan.

This same city is remembered later in the Bible for a very different reason.

In first Samuel it is the city Saul rescues early in his reign as king.

🗺️ Jabeshgilead sat east of the Jordan River

🏙️ It was part of the region called Gilead

👑 Saul later rescues this same city

📖 One city, two very different moments

---
## 🚫 There Came None To The Camp From Jabeshgilead

The city's absence from the war effort is not a minor detail.

It is exactly the crime the death oath from verse five was written to punish.

Jabeshgilead had skipped the fight against Benjamin entirely.

That absence is about to cost the whole city everything.

🚫 Jabeshgilead skipped the war against Benjamin

⚖️ This matched the crime named in verse five

💀 Their absence carried a death penalty

➡️ One city's choice is about to be punished

---
## 💪 Twelve Thousand Men Of The Valiantest

"Valiantest" is an old way of saying the bravest and most capable.

Twelve thousand of Israel's best fighters were sent for this mission.

That is a serious military force for what looks like a punishment raid.

The size of the force shows how seriously Israel treated the broken oath.

💪 Valiantest means the bravest and most capable

🔢 Twelve thousand men were sent

⚔️ A large force for a punishment raid

➡️ The size shows how serious the oath was

---
## 🗡️ Smite The Inhabitants Of Jabeshgilead With The Edge Of The Sword

This command called for total destruction of the city, not a limited strike.

"The edge of the sword" is a common Old Testament phrase for complete military defeat.

Whole households, not just soldiers, were included in the order.

This is one of the harder passages in Judges.

Innocent people paid for a choice they never made.

⚔️ Edge of the sword means total defeat

🏘️ Whole households were included in the order

😔 Innocent people paid for a leaders' decision

📖 Judges keeps showing how far chaos spread

---
## 🎯 Utterly Destroy Every Male, And Every Woman That Hath Lain By Man

This instruction was not random cruelty.

It specifically separated virgin women out from the rest of the population.

"Known no man by lying with any male" was a way of saying a woman had never married.

This detail exists because those unmarried women were about to solve Benjamin's wife shortage.

🎯 The order specifically spared unmarried women

🚫 Everyone else in the city was not spared

👰 Known no man means never married

➡️ This detail sets up the next problem's fix

---
## 🔢 Four Hundred Young Virgins

Four hundred women survived this attack and were brought to the camp.

Judges twenty already reported six hundred surviving Benjamite men.

Four hundred wives for six hundred men still leaves a real shortage.

This solution helps Benjamin.

It does not finish solving the problem.

🔢 Four hundred women survived and were spared

⚖️ Six hundred Benjamite men still needed wives

➖ Two hundred men were still left short

➡️ One fix created the need for another

---
## ⛺ Brought Them Unto The Camp To Shiloh

Shiloh was already named earlier in this chapter as the location of the tabernacle.

Bringing the women here kept this decision under the whole nation's watch.

They were not sent straight to Benjamin's camp.

This was treated as a national matter, not a private deal between two groups.

Everything about this plan happened in full view of Israel's worship center.

⛺ Shiloh again means the tabernacle site

👀 The decision stayed under the nation's watch

🤝 This was treated as a national matter

📖 Even this plan unfolded near God's presence

# Judges 21:13-15
# 🕊️ An Offer Of Peace
---
## 🪨 The Rock Rimmon

The rock Rimmon was a natural stronghold where surviving Benjamite men had been hiding.

Judges twenty already described six hundred men fleeing there for four months after the war.

This is the same location, now reached with an offer instead of another attack.

The chase from chapter twenty has turned into an attempt at peace.

🪨 Rock Rimmon was a stronghold hideout

⏳ Six hundred men hid there four months

⚔️ Judges twenty already described this place

➡️ A chase has turned into an offer

---
## 🤝 To Call Peaceably Unto Them

Israel now reaches out to the very tribe it almost destroyed.

This message carried no threat and no trap.

It was a genuine offer of reconciliation, not a trick to draw Benjamin out.

The nation is actively working to undo the damage of the war it started.

🤝 Israel reaches out to Benjamin peacefully

🚫 No threat or trap is hidden here

🕊️ This is a genuine reconciliation attempt

➡️ Israel works to repair its own damage

---
## 👰 They Gave Them Wives Which They Had Saved Alive Of The Women Of Jabeshgilead

The four hundred women from Jabeshgilead are now given to the surviving Benjamite men.

This is the direct result of the raid described in the previous section.

One tragedy is now being used to try to repair another.

Nothing about this plan resembles a normal marriage custom in Israel.

👰 The Jabeshgilead women become Benjamin's wives

🔗 This directly follows the earlier raid

🩹 One tragedy tries to repair another

📖 Nothing about this plan was a normal custom

---
## ➖ Yet So They Sufficed Them Not

"Sufficed" means it was not enough.

Four hundred wives could not cover six hundred men.

The math from the previous section catches up with them here.

Two hundred Benjamite men are still left with no wife at all.

🔢 Sufficed not means it fell short

➖ Four hundred wives, six hundred men

🧮 The earlier math catches up with them

➡️ Two hundred men still had no wife

# Judges 21:16-18
# 😟 The Elders Face A Second Problem
---
## 👴 The Elders Of The Congregation

The elders were the recognized leaders who spoke and decided on behalf of the whole nation.

When they step in, this becomes an official national concern again.

This is not a few worried families talking among themselves.

The top leadership takes on the two hundred remaining men as their own problem.

👴 Elders were Israel's recognized leaders

🏛️ Their involvement made this an official matter

🚫 This was not just a family concern

➡️ Leadership owns the problem it helped create

---
## 🏞️ There Must Be An Inheritance For Them That Be Escaped Of Benjamin

"Inheritance" here means more than land.

It means descendants to carry the family and tribal name forward.

Land without heirs to pass it to was seen as a wasted inheritance.

Wives were not a luxury for these men.

They were the only way the inheritance would mean anything.

🏞️ Inheritance includes land and descendants

👶 Land with no heirs had no lasting purpose

👪 Wives were essential, not optional

➡️ Benjamin's whole future depended on this

---
## 🎯 That A Tribe Be Not Destroyed Out Of Israel

This is the same fear that opened the whole chapter, said one more time.

The elders are not solving a side issue.

They are still fighting to prevent the exact outcome verse three already mourned.

The whole chapter circles back to this one goal again and again.

🔁 This repeats the chapter's opening fear

🎯 Preventing a lost tribe is still the goal

📖 The chapter keeps circling back to this

➡️ One outcome had to be avoided

---
## 🚫 Cursed Be He That Giveth A Wife To Benjamin

This sounds like it closes off every possible option.

The oath specifically forbids Israelite fathers from giving their daughters to Benjamite men.

It says nothing about a daughter being taken without her father directly giving her.

That gap in the wording is exactly what the next plan will use.

🚫 Fathers were cursed for giving daughters

📜 The oath covers giving, not taking

🔍 That gap becomes the next plan's loophole

➡️ A technicality is about to solve the crisis

# Judges 21:19-23
# 💃 The Dancing Daughters Of Shiloh
---
## 📅 A Feast Of The LORD In Shiloh Yearly

Israel held regular yearly feasts as part of worship, gathering the nation at the tabernacle.

This was likely one of the major harvest festivals, a joyful, public celebration.

Large public gatherings like this one drew people from across the tribes.

That is exactly the kind of crowd the elders are counting on for their plan.

📅 Israel held regular yearly worship feasts

🌾 It was likely a harvest celebration

👥 Large crowds gathered from every tribe

➡️ That crowd size becomes part of the plan

---
## 🧭 The Highway That Goeth Up From Bethel To Shechem

This verse pins down Shiloh's location using three known landmarks, Bethel, Shechem, and Lebonah.

Giving this much geographic detail was a way of making sure everyone could find the place.

It also confirms this was a real, specific location, not a vague retelling.

The writer wanted later readers to know exactly where this happened.

🗺️ Three landmarks pin down Shiloh's location

🧭 Bethel, Shechem, and Lebonah frame the spot

📍 This confirms a real, specific place

📖 The detail protects the story's accuracy

---
## 🙈 Lie In Wait In The Vineyards

"Lie in wait" means to hide and wait quietly for the right moment.

Vineyards offered natural cover, rows of vines tall enough to hide grown men.

The elders are giving Benjamin a deliberate ambush plan, not a spontaneous idea.

This was planned in advance by Israel's own leadership.

🙈 Lie in wait means hide and watch

🍇 Vineyards gave natural cover to hide in

📋 This was a planned ambush, not chance

➡️ Israel's own leaders designed this scheme

---
## 💃 Come Out To Dance In Dances

Dancing at a feast like this was a normal part of ancient worship and celebration.

Young women dancing together was an expected, respected custom at festivals like this one.

Nothing about their dancing invited what was about to happen to them.

The ambush exploited an innocent, ordinary custom.

💃 Dancing was normal at ancient feasts

🎉 It was an expected part of the celebration

🙅 The dancing itself invited nothing

➡️ An innocent custom was exploited here

---
## 🏃 Catch You Every Man His Wife Of The Daughters Of Shiloh

"Catch" here means seize or capture, not a romantic meeting.

There is no mention of the women's consent anywhere in this plan.

This does not reflect how marriage was supposed to work in Israel, with a father's agreement.

The text simply reports what the elders planned.

It does not say God approved of it.

🏃 Catch means seize or capture

🚫 The women's consent is never mentioned

📜 This skipped Israel's normal marriage customs

📖 The text reports the plan, not an endorsement

---
## 📝 We Reserved Not To Each Man His Wife In The War

The elders prepared this exact excuse in advance for when the Shiloh fathers complained.

Their argument was that no one directly gave Benjamin's men a wife.

That meant, in their eyes, no oath had been broken.

This is a legal technicality being used to justify a painful outcome.

Planning the excuse before the act shows the elders already knew how this would look.

📝 The excuse was prepared in advance

⚖️ The plan avoided the oath by wording alone

🔍 A technicality justified a painful outcome

➡️ Needing an excuse in advance says a lot

---
## 🏗️ Repaired The Cities, And Dwelt In Them

Benjamin's men return to territory that was destroyed back in Judges twenty.

Rebuilding the cities marks the tribe's survival becoming real, not just possible.

The tribe that nearly disappeared at the start of this story now has homes and a future.

The crisis that opened this chapter finally reaches a resolution, even an uncomfortable one.

🏚️ These cities were destroyed in Judges twenty

🏗️ Rebuilding shows real survival, not just hope

👪 Benjamin now has homes, wives, and a future

📖 An uncomfortable resolution still resolves the crisis

# Judges 21:24-25
# 👑 No King In Israel
---
## 🏠 Every Man To His Tribe And To His Family

This marks the real end of Judges' final story.

After chapters of civil war, this verse is almost startlingly plain.

People simply go home.

A war that nearly erased a tribe ends with an ordinary, quiet return to normal life.

🏠 The people simply return home

⚔️ This follows a brutal, tribe threatening war

😶 The ending feels startlingly plain

➡️ Peace can return quietly after real chaos

---
## 👑 In Those Days There Was No King In Israel

This exact sentence appears four separate times across the book of Judges.

Each time it explains why something has gone wrong, with no king to provide order.

Israel is not yet ready to accept a human king.

The text keeps hinting one is coming.

The next book, first Samuel, is the story of that request finally happening.

🔁 This sentence repeats four times in Judges

👑 No king is named as the cause

📖 First Samuel picks up this exact thread

➡️ Judges quietly points toward what comes next

---
## ⚖️ Every Man Did That Which Was Right In His Own Eyes

This final sentence is the verdict on the entire book of Judges.

Idol worship, broken vows, civil war, and this wife capturing scheme all trace back to one root.

Without a shared standard, everyone simply followed personal judgment instead.

The book does not end with a solution.

It ends by naming the problem clearly.

⚖️ This verse is the book's final verdict

🌀 Idolatry, war, and this scheme share one root

🪞 Without a shared standard, everyone judged alone

📖 Judges ends by naming the real problem
`.trim();

export const JUDGES_TWENTY_ONE_PERSONAL_SECTIONS = parseJudgesTwentyOneRawNotes(JUDGES_TWENTY_ONE_RAW_NOTES);
