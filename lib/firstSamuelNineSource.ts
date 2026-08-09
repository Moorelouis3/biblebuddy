export type FirstSamuelNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelNineRawNotes(rawText: string): FirstSamuelNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 9:${startVerse}` : `1 Samuel 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 1 Samuel 9 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_NINE_RAW_NOTES = `# FirstSamuel 9:1-2
# 🧍 A Mighty Man's Towering Son
---
## 👨‍👦 A Man Of Benjamin, Whose Name Was Kish

Benjamin was the smallest of Israel's twelve tribes.

A civil war recorded in Judges had nearly wiped the tribe out completely.

The surviving men of Benjamin had to scramble just to find wives and rebuild.

This chapter opens two or three generations after that near destruction.

🏹 Benjamin was Israel's smallest tribe

⚔️ Judges recorded Benjamin's near destruction

🌱 The tribe was still rebuilding

📖 Israel's first king comes from Benjamin

## 📜 The Son Of Abiel, The Son Of Zeror

Four generations get named before Saul ever appears in the story.

Ancient readers used genealogies to prove a family's standing, not to fill space.

Naming four fathers back showed Kish belonged to an established, respected family.

Saul is not stepping onto the stage as a nobody.

He arrives with real family credibility already behind him.

📜 Four generations are named here

🏛️ Genealogies proved a family's standing

👨‍👩‍👧 Kish belonged to an established family

📖 Saul enters with real credibility

## 💪 A Mighty Man Of Power

"Power" here does not describe muscle or fighting skill.

The same Hebrew phrase describes Boaz in the book of Ruth, a wealthy landowner.

It marks Kish as a man of wealth and standing in his community.

Saul grew up in a well off household, not a poor one.

That detail matters once Samuel later calls Saul's family the least in the tribe.

💪 Power here means wealth, not muscle

🌾 Boaz in Ruth used the same phrase

🏡 Kish's household was well off

📖 Saul was not raised poor

## 📛 Whose Name Was Saul

The name Saul means asked for.

Later in this very chapter, Israel is doing exactly that, asking for a king.

A name that means asked for now belongs to the man Israel asked for.

The name fits the whole chapter before Saul ever says a word.

📛 Saul means asked for

🙏 Israel had just asked for a king

🎯 The name matches the moment exactly

📖 Meaning arrives before Saul even speaks

## 😍 A Choice Young Man, And A Goodly

"Choice" means outstanding, the best of a group.

"Goodly" describes an attractive, impressive appearance.

Ancient Near Eastern cultures often expected a king to look the part.

Saul's appearance alone made him look like someone born to lead.

Looking impressive and actually leading well would turn out to be two very different things.

⭐ Choice means outstanding or handpicked

😍 Goodly describes an impressive appearance

👑 Ancient kings were expected to look the part

📖 Looks and leadership are not the same

## 📏 Higher Than Any Of The People

Saul stood a full head taller than everyone else in Israel.

That height made him stand out instantly in any crowd.

Chapter ten will show Israel reacting to this exact detail.

A striking body was never proof of a strong character.

The rest of Saul's story tests whether the inside matched the outside.

📏 Saul stood a head taller than others

👀 His height made him instantly visible

👑 Chapter ten reacts to this detail

📖 Height was never proof of character

# FirstSamuel 9:3-5
# 🫏 The Search For The Lost Donkeys
---
## 🫏 The Asses Of Kish Were Lost

A lost donkey sounds like a small errand to modern readers.

In this culture, donkeys were essential animals, used for carrying loads and plowing fields.

Losing several of them threatened a family's daily work, not just spare cash.

Kish sends his own son to search instead of a servant alone.

That choice shows how seriously this loss was taken.

🫏 Donkeys sound trivial to modern readers

🌾 They were essential working animals

💰 Losing them threatened daily livelihood

📖 Kish sent his own son to search

## 🧑‍🤝‍🧑 Take Now One Of The Servants With Thee

Kish sends Saul out with a servant, not alone.

Having a servant to send along was itself a small sign of status.

Poorer families in Israel could not spare a hired hand for this kind of trip.

This servant becomes an important second voice throughout the rest of the chapter.

🧑‍🤝‍🧑 Saul travels with a servant

💰 Servants were a sign of standing

🚶 Poorer families lacked spare hands to send

📖 This servant matters later in the chapter

## 🧭 Passed Through Mount Ephraim

Saul and his servant crossed four different regions on this trip.

Mount Ephraim sat just north of Benjamin's own territory.

Shalisha, Shalim, and the land of the Benjamites are named next.

None of these places matter individually to the story.

What matters is how wide and frustrating the search became.

Every stop ended the same way, with no donkeys found.

🧭 Four regions mark a long search

🚶 Mount Ephraim sat north of Benjamin

😤 Every stop ended in failure

📖 Effort alone does not guarantee results

## 😟 Lest My Father Leave Caring For The Asses

Saul is ready to give up and turn back home.

His concern shifts from the donkeys to his own father's worry.

This decision would have quietly ended the whole story right here.

God's larger plan for Saul depended on what happens in the very next verse.

😟 Saul is ready to quit the search

🔄 His concern shifts to his father's worry

🛑 The story nearly ends right here

📖 One more conversation changes everything

## 💭 Take Thought For Us

This old phrase means to worry or grow anxious.

Saul pictures his father shifting attention from lost donkeys to his missing son.

The concern in this small family detail reveals a normal, caring household.

Nothing here hints that Saul expects to meet a prophet, or become a king.

💭 Take thought means worry or grow anxious

👨‍👦 Kish would worry about his missing son

🏡 This shows a normal, caring family

📖 Saul has no idea what is coming

# FirstSamuel 9:6-10
# 🔮 Let Us Go To The Seer
---
## 🙌 A Man Of God...An Honourable Man

The servant knows of a prophet living nearby in this city.

"Man of God" was a common title for someone who spoke for the LORD.

"Honourable" means widely respected and trusted by the whole community.

The servant trusts this stranger's reputation enough to change their entire plan.

🙌 Man of God describes a prophet

⭐ Honourable means widely trusted

🗣️ Reputation traveled even to strangers

📖 A servant's suggestion redirects the whole trip

## ✅ All That He Saith Cometh Surely To Pass

This is a specific claim about this man's track record.

Everything he has predicted has actually happened, without exception.

That reputation is exactly why the servant trusts him with a hard question.

This unnamed man of God will turn out to be Samuel himself.

✅ His predictions always came true

🎯 A reliable, tested reputation

❓ The servant trusts him with a hard question

📖 This unnamed man turns out to be Samuel

## 🗺️ Peradventure He Can Shew Us Our Way

"Peradventure" is an old word meaning perhaps or maybe.

"Shew" is simply the old spelling of show.

The servant is not certain this plan will even work.

He suggests it anyway, since the search so far has failed completely.

🗺️ Peradventure means perhaps or maybe

🔤 Shew is the old word for show

🤷 The servant admits real uncertainty

➡️ A hopeful guess replaces a failed search

## 🎁 What Shall We Bring The Man

Saul raises a real problem before they even arrive.

Visiting a man of God empty handed would have seemed disrespectful.

Bringing some kind of gift was the expected custom of the culture.

Saul is thinking practically, even in the middle of an unplanned detour.

🎁 A gift was the expected custom

🙅 Arriving empty handed seemed disrespectful

🤔 Saul thinks practically under pressure

📖 Custom shaped even a chance encounter

## 🍞 For The Bread Is Spent In Our Vessels

Their food supply has completely run out by this point in the trip.

This detail quietly marks just how long and far this search has gone.

What started as a quick errand has turned into a real journey.

Every detail in this verse builds the sense that the two men are stuck.

🍞 Their food supply had run out

⏳ The search had gone on a long time

🚶 A quick errand became a real journey

📖 The men were genuinely stuck

## 🪙 The Fourth Part Of A Shekel Of Silver

A shekel was a standard unit of weight used for silver and gold.

A fourth of a shekel was a small, modest amount of money.

The servant, not Saul, is the one who happens to have it.

This small coin becomes the ticket that gets them in to see the seer.

🪙 A shekel was a weight standard for silver

💰 A fourth shekel was a small sum

🧑‍🤝‍🧑 The servant is the one who has it

📖 A small coin opens an important door

## 🔮 He That Is Now Called A Prophet Was Beforetime Called A Seer

The narrator pauses the story to explain some older Israelite vocabulary.

"Beforetime" simply means in earlier days or in the past.

A seer was someone who received visions and could reveal hidden things.

By the time this book was written, people had started calling that same office prophet instead.

This little note helps a later reader understand why the story uses seer here.

🔮 Seer was the older word for prophet

⏳ Beforetime means in earlier days

👁️ Seers received visions and hidden knowledge

📖 Vocabulary shifted, but the office stayed the same

# FirstSamuel 9:11-14
# ⛲ Maidens At The Well
---
## ⛲ Young Maidens Going Out To Draw Water

Drawing water was daily, necessary work usually done by young women.

Wells and springs sat outside the city.

That made them an easy place to meet strangers passing through.

Saul and his servant ask their question to the first people they meet.

This everyday detail becomes the doorway into Israel's next chapter.

⛲ Drawing water was daily women's work

🚪 Wells sat where strangers could be met easily

❓ Saul asks the first people he sees

📖 An everyday errand opens the next chapter

## ⏱️ Make Haste Now, For He Came To Day To The City

"To day" is simply the old way of writing today, split into two words.

The maidens tell Saul to hurry because Samuel had just arrived himself.

Perfect timing lines up here in a way Saul cannot yet see.

The very man Saul needs happens to be in town on this exact day.

⏱️ To day is the old spelling of today

🏃 The maidens tell Saul to hurry

🎯 Samuel had arrived on this very day

📖 Perfect timing that Saul cannot yet see

## ⛰️ A Sacrifice Of The People To Day In The High Place

A "high place" was an elevated site used for worship and sacrifice.

Before the temple existed in Jerusalem, Israel offered sacrifices at many such local sites.

This particular sacrifice was a planned community event, not a private ceremony.

Saul is about to walk straight into the middle of it.

⛰️ High place means an elevated worship site

🏛️ Israel worshiped at many such sites early on

👥 This was a planned community event

📖 Saul is about to walk into it

## 🙏 The People Will Not Eat Until He Come, Because He Doth Bless The Sacrifice

Nobody at this feast eats a single bite before Samuel arrives and blesses it.

"Doth bless" simply means he blesses, using an older verb form.

That custom shows exactly how central Samuel's role was in this town.

An entire crowd is waiting on one man before the meal even starts.

🙏 Nobody eats before Samuel's blessing

🔤 Doth bless means he blesses

⭐ This shows Samuel's central role

📖 A whole town waits on one man

## ⏳ For About This Time Ye Shall Find Him

The maidens give Saul very precise, confident directions.

They know exactly where Samuel will be and almost exactly when.

That kind of small town familiarity makes Samuel's coming appearance feel almost certain.

Saul has no idea he is walking straight into a divine appointment.

⏳ The directions are precise and confident

📍 The maidens know exactly where Samuel will be

🏘️ Small town familiarity guides the way

📖 Saul is walking into a divine appointment

## 🚶 Samuel Came Out Against Them

"Against them" sounds hostile to modern ears, but it does not mean an attack.

The old phrase simply means Samuel came out to meet them.

Samuel is heading up to the high place at the very moment Saul arrives.

Two paths that started days apart finally cross at exactly the right moment.

🚶 Against them means to meet, not attack

🔤 An old phrase easy to misread today

⏰ Both men arrive at the same moment

📖 God's timing brought their paths together

# FirstSamuel 9:15-17
# 👂 The LORD's Whisper To Samuel
---
## 👂 The LORD Had Told Samuel In His Ear A Day Before Saul Came

God had already briefed Samuel a full day before Saul ever showed up.

Every event so far, even the lost donkeys, was already part of that plan.

Saul thinks he stumbled into this city by accident.

The reader already knows better.

👂 God told Samuel a day ahead

🗺️ The lost donkeys were part of the plan

🤷 Saul thinks this is an accident

📖 The reader already knows the truth

## 📅 To Morrow...I Will Send Thee A Man Out Of The Land Of Benjamin

God tells Samuel exactly who is coming and exactly when.

"To morrow" is the old way of writing tomorrow, split into two words.

God names Benjamin specifically, the same small tribe introduced back in verse one.

Nothing about Saul's arrival will be a surprise to Samuel at all.

📅 God names the day in advance

🔤 To morrow is the old spelling of tomorrow

🏹 Benjamin is named specifically

📖 Nothing about this will surprise Samuel

## 🫗 Anoint Him To Be Captain Over My People Israel

To anoint means to pour oil over someone as a sign of God's choosing.

God calls Saul a "captain," not yet a king.

That word choice matters, since Israel had asked for a king like other nations.

God is giving Israel a leader on His own terms, not fully theirs.

🫗 Anoint means pouring oil to mark God's choice

🎖️ Captain is used here, not king

👑 The word choice was deliberate

📖 God shaped this on His own terms

## ⚔️ That He May Save My People Out Of The Hand Of The Philistines

The Philistines had been a constant threat to Israel for years.

Earlier chapters already showed them capturing the ark of the covenant.

Saul's very first job as leader is described here before he is even chosen.

Rescue, not just rule, is the reason a king is being raised up now.

⚔️ Philistines had threatened Israel for years

📜 They had already captured the ark

🎯 Saul's job is named before his choosing

📖 Rescue is the reason for this king

## 👁️ For I Have Looked Upon My People, Because Their Cry Is Come Unto Me

God says plainly that He has seen Israel's suffering.

Their cry is described almost exactly like Israel's cry in Egypt long before this.

God's answer here echoes the exodus story on a smaller scale.

The people asked for a king, but it is God who is truly answering their pain.

👁️ God has seen Israel's suffering

🔁 Their cry echoes the cry in Egypt

🌊 History repeats on a smaller scale

📖 God answers the pain, not just the request

## 👉 Behold The Man Whom I Spake To Thee Of

God confirms Saul's identity the instant Samuel actually sees him.

No test or long conversation is needed first.

Samuel recognizes the moment God had promised the day before.

Prophecy and fulfillment meet face to face in this single verse.

👉 God confirms Saul on sight

⚡ No test was needed first

🔁 The promise from yesterday is fulfilled

📖 Prophecy and fulfillment meet here

# FirstSamuel 9:18-21
# 🚪 Saul Meets The Seer
---
## ❓ Tell Me...Where The Seer's House Is

Saul is standing right in front of Samuel and does not know it.

He asks a total stranger for directions to find the very man he is speaking to.

The reader already knows the truth Saul cannot see yet.

This gap between what the reader knows and what Saul knows drives the whole scene.

❓ Saul does not recognize Samuel

🎭 He asks a stranger for directions

👀 The reader already knows the truth

📖 That gap drives the whole scene

## 🙋 I Am The Seer

Samuel answers plainly, with no drama or delay.

The title Saul just heard explained back in verse nine now has a face.

Samuel could have let Saul keep guessing a little longer.

Instead he identifies himself immediately and takes control of the moment.

🙋 Samuel reveals himself at once

🔤 The seer title now has a face

⚡ No delay or drama here

📖 Samuel takes control of the moment

## 🍽️ Ye Shall Eat With Me To Day

Samuel invites a complete stranger to the sacred meal happening that day.

Sharing a meal with a prophet was a genuine honor in this culture.

Saul has no idea yet why he is suddenly this welcome.

Hospitality here is the first sign that something unusual is happening.

🍽️ Samuel invites Saul to the sacred meal

⭐ A meal with a prophet was an honor

🤷 Saul does not know why yet

📖 Hospitality signals something unusual is happening

## 💬 To Morrow I Will Tell Thee All That Is In Thine Heart

Samuel promises to answer whatever is quietly worrying Saul.

That promise implies Samuel already knows more than Saul has said out loud.

Nothing about Saul's private thoughts is hidden from this prophet.

The next two verses prove that claim is not an exaggeration.

💬 Samuel promises to answer Saul's worries

👁️ He already seems to know Saul's mind

🔓 Nothing is hidden from this prophet

📖 The next verses prove the claim true

## 🫏 Set Not Thy Mind On Them

Samuel answers a question Saul never actually asked out loud.

The lost donkeys that started this whole trip are already found.

This small detail proves Samuel's gift is real, not a lucky guess.

God's care reached all the way down to a family's missing animals.

🫏 The donkeys are already found

🔮 Samuel answers an unasked question

✅ This proves his gift is real

📖 God's care reaches even small worries

## 👑 On Whom Is All The Desire Of Israel? Is It Not On Thee

Samuel shifts from small talk about donkeys to something enormous.

Israel had just demanded a king, and Samuel names Saul as that answer.

This is the first time anyone says it to Saul's face.

The donkeys mattered, but this question changes the whole direction of Saul's life.

👑 Samuel names Saul as Israel's answer

🔄 The topic shifts from donkeys to kingship

🗣️ Said to Saul's face for the first time

📖 One question changes Saul's whole life

## 🙇 Am Not I A Benjamite, Of The Smallest Of The Tribes Of Israel

Saul reacts with genuine disbelief, not false modesty.

He calls his own tribe the smallest and his own family the least important.

This callback lands harder after section one already explained Benjamin's near destruction.

A man from the edge of Israel's story is being asked to lead all of it.

🙇 Saul reacts with real disbelief

🏹 He calls his tribe the smallest

🔁 This recalls Benjamin's near destruction

📖 The edge of the story now leads it

# FirstSamuel 9:22-24
# 🍖 The Chiefest Place
---
## 🏛️ Brought Them Into The Parlour

The "parlour" was a dining hall attached to the high place.

It was the room where the honored guests actually ate the sacrificial meal.

Saul and his servant move from a public gate straight into a private room.

Their status in this scene keeps quietly rising with every verse.

🏛️ Parlour means the dining hall

🍽️ Honored guests ate there

🚪 Saul moves from public to private space

📖 Saul's status keeps quietly rising

## 🥇 Made Them Sit In The Chiefest Place

"Chiefest" means the highest or most honored seat in the room.

Seating order in this culture openly showed a guest's importance.

About thirty people were bidden, meaning formally invited, to this meal.

Saul, a stranger an hour earlier, now outranks every other guest present.

🥇 Chiefest means the most honored seat

📊 Seating showed a guest's importance

👥 About thirty guests were formally invited

📖 A stranger now outranks them all

## 📋 Bring The Portion Which I Gave Thee

Samuel had already set aside a specific piece of meat earlier that day.

He gives that instruction to the cook before Saul had even arrived in the city.

This detail confirms again that Samuel had planned this meeting in advance.

Nothing about Saul's welcome happened by chance.

📋 Samuel had reserved a portion earlier

⏳ This happened before Saul even arrived

🎯 It confirms Samuel's advance planning

📖 Nothing here happened by chance

## 🍖 The Cook Took Up The Shoulder

The shoulder was considered a prime, valuable cut of meat.

Giving a guest that specific piece was a clear mark of highest honor.

Samuel had reserved this exact cut for Saul before knowing Saul was coming.

Every detail of this meal points back to God's earlier plan for Saul.

🍖 The shoulder was a prime cut

⭐ Giving it marked highest honor

🎯 Reserved for Saul in advance

📖 Every detail points to God's plan

## 🍽️ So Saul Did Eat With Samuel That Day

A shared meal closes out this whole scene on a note of peace.

Saul arrived that morning searching for lost donkeys, worried and unsure.

He ends the day seated in the place of highest honor at a prophet's table.

His whole world is about to change before he even understands why.

🍽️ A shared meal closes the scene

🫏 Saul began the day chasing donkeys

🥇 He ends it in the seat of honor

📖 His world is about to change

# FirstSamuel 9:25-27
# 🌙 A Secret Word Before Dawn
---
## 🏠 Communed With Saul Upon The Top Of The House

Houses in this culture had flat roofs used as an extra living space.

A rooftop was cooler at night and offered real privacy from the street below.

Samuel takes Saul there for a long, quiet conversation after the public meal.

Whatever they discussed up there is left between the two of them.

🏠 Flat roofs served as living space

🌙 Rooftops offered cool, private air

🤫 Samuel and Saul talk there alone

📖 Their conversation stays private from readers

## 🌅 About The Spring Of The Day

This phrase describes the very first light of early morning.

Samuel wakes Saul before the rest of the city is even awake.

That timing keeps whatever comes next away from public eyes.

The most important part of Saul's whole visit is still ahead of him.

🌅 Spring of the day means early dawn

👥 The city is still asleep

🤫 Early timing kept this private

📖 The most important moment is still ahead

## ⏰ Up, That I May Send Thee Away

Samuel personally wakes Saul instead of sending word through a servant.

The instruction is short and direct, with no wasted words.

Samuel is clearly in charge of how this whole morning unfolds.

Every step from here is deliberately planned, not left to chance.

⏰ Samuel wakes Saul himself

🗣️ His instruction is short and direct

🎯 Samuel controls how the morning unfolds

📖 Nothing here is left to chance

## 🚶 Bid The Servant Pass On Before Us

Samuel sends the servant walking ahead, out of hearing range.

Only Saul and Samuel are left standing together in the street.

Clearing the servant away shows that something private is about to happen.

Samuel has been carefully managing privacy since the meal the night before.

🚶 The servant is sent ahead

👂 He moves out of hearing range

🤫 Privacy is deliberately being protected

📖 Samuel has managed this privacy all along

## ✋ Stand Thou Still A While, That I May Shew Thee The Word Of God

"Shew" is once again the old spelling of show.

Samuel is about to reveal something far bigger than lost donkeys or dinner seating.

The chapter ends right at this moment, deliberately unfinished.

Readers must turn the page to chapter ten to learn what God's word actually is.

🔤 Shew is the old word for show

🌟 Something bigger than donkeys comes next

✋ Samuel asks Saul to stop and wait

➡️ Chapter ten reveals the rest
`.trim();

export const FIRST_SAMUEL_NINE_PERSONAL_SECTIONS = parseFirstSamuelNineRawNotes(FIRST_SAMUEL_NINE_RAW_NOTES);
