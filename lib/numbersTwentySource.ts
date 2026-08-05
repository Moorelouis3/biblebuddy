export type NumbersTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyRawNotes(rawText: string): NumbersTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 20:${startVerse}` : `Numbers 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 20 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_RAW_NOTES = `# Numbers 20:1-6
# 🏜️ Miriam Dies And The People Rebel
---
## 🏜️ Into The Desert Of Zin

The desert of Zin sits on the southern edge of Canaan, right at the border of the promised land.

Kadesh was a key oasis inside that desert, and this is where Israel stops.

This is the same Kadesh where the twelve spies gave their unfaithful report back in Numbers thirteen.

Nearly forty years have passed since that visit.

A new generation now stands in the very place their parents once refused to trust God.

🏜️ Zin sits on Canaan's southern border

🏕️ Kadesh is an oasis inside that desert

🔁 The spies gave their report here too

📖 A new generation returns to an old failure

## 👩 Miriam Died There, And Was Buried There

Miriam was the older sister of Moses and Aaron.

She watched over baby Moses in the basket back in Exodus two.

She led the women in song after the Red Sea crossing in Exodus fifteen.

She was struck with a skin disease for opposing Moses in Numbers twelve.

Her death is told in a single flat sentence, with no ceremony described at all.

👩 Miriam was Moses and Aaron's sister

🎶 She led the women's song at the sea

⚠️ She once challenged Moses in Numbers twelve

📖 Her death opens a chapter about loss

## 💧 There Was No Water For The Congregation

This is not the first time Israel ran out of water in the wilderness.

The same crisis already happened once, decades earlier, at a place called Rephidim in Exodus seventeen.

Most of the people standing here now were not even alive for that first crisis.

The problem repeats anyway.

A physical need turns immediately into complaint instead of prayer.

💧 A water shortage already happened once before

👥 This generation is mostly new to the desert

🔁 The same failure pattern repeats itself

📖 Need turned to complaint instead of prayer

## 👥 Gathered Themselves Together Against Moses And Against Aaron

Gathering together here does not mean a peaceful meeting.

It means the people organized as a group specifically to confront their leaders.

This is a hostile crowd forming with a shared complaint.

Moses and Aaron take the blame directly, even though the real problem is trust in God.

👥 The people organized against their own leaders

🎯 Moses and Aaron take the blame directly

😠 This is confrontation, not a calm request

➡️ Anger aimed at people instead of God

## 😠 The People Chode With Moses

"Chode" is an old word.

It is the past tense of "chide," meaning to argue or quarrel sharply.

This is not a calm complaint.

It is a bitter, angry confrontation.

😠 Chode means quarreled or argued sharply

🗣️ Directed straight at Moses himself

🔥 Sets an angry tone for the chapter

📖 Anger, not calm disagreement

## ☠️ Would God That We Had Died When Our Brethren Died

This is an old idiom.

It means "we wish we had died," using God's name inside the wish itself.

The people used almost the same despairing words back in Numbers fourteen.

This is bitter exaggeration born from real fear, not a literal death wish.

☠️ An idiom meaning we wish we had died

🔁 Nearly identical language appears in Numbers fourteen

😨 Fear speaking through exaggeration

📖 Despair, not a literal plan to die

## 📤 Why Have Ye Brought Up The Congregation Of The LORD Into This Wilderness

"Brought up" is the same phrase normally used for God bringing Israel up out of Egypt.

Here the people twist it into an accusation against Moses and Aaron.

They are blaming their leaders for a rescue that was actually God's own doing.

The very language of salvation gets turned into a complaint.

📤 Brought up usually describes God's rescue

🔄 Here it becomes an accusation instead

🎯 Moses and Aaron take blame for God's plan

📖 Salvation language twisted into complaint

## 🍇 No Place Of Seed, Or Of Figs, Or Of Vines, Or Of Pomegranates

These are the exact crops the twelve spies carried back as proof of Canaan's richness in Numbers thirteen.

Deuteronomy eight later lists these same crops as part of the good land's bounty.

Complaining about their absence here is a bitter irony.

A land full of exactly this was available a whole generation earlier.

Their own parents refused to enter it.

🍇 The exact crops the spies once praised

📖 Deuteronomy eight lists this same bounty

😢 What they miss was once offered and refused

➡️ Irony sits underneath this complaint

## 🙇 Fell Upon Their Faces

Moses and Aaron do not argue back against the accusations.

Instead they fall facedown before God at the door of the tabernacle.

This is the same posture they took during the spies' rebellion back in Numbers fourteen.

It is a plea for help, not a retreat from responsibility.

🙇 Falling facedown is a posture of pleading

🔁 The same posture used in Numbers fourteen

🚪 Done at the tabernacle door specifically

📖 Turning to God instead of arguing back

## ✨ The Glory Of The LORD Appeared Unto Them

The glory of the LORD is a real, visible sign of God's presence.

It is not a vague feeling.

The same glory filled the tabernacle back in Exodus forty and Leviticus nine.

Its arrival here signals that God is about to act.

✨ Glory means a visible sign of God's presence

🏛️ The same glory filled the tabernacle before

👁️ A real appearance, not a private feeling

📖 God moves before Moses even asks

# Numbers 20:7-9
# 🪨 Speak To The Rock
---
## 🪄 Take The Rod

The most likely rod meant here is Aaron's rod that budded.

That rod had just been commanded kept before the Testimony at the end of Numbers seventeen.

It was placed there as a permanent sign against future rebellion.

Carrying that specific rod into this new crisis carries its own quiet warning.

🪄 Likely Aaron's rod that budded

📜 Kept before the Testimony since Numbers seventeen

⚠️ Its presence already warns against rebellion

📖 A past sign carried into a new test

## 🗣️ Speak Ye Unto The Rock Before Their Eyes

God's instruction here is precise.

Moses is told to speak to the rock.

He is not told to strike it.

The miracle must also happen where the whole community can watch.

This one word, speak, becomes the detail everything else in the chapter hinges on.

🗣️ The command is to speak, not strike

👀 Done publicly, before the people's eyes

🎯 One word becomes the hinge of the story

📖 Precise instructions carry real weight

## 🐄 So Thou Shalt Give The Congregation And Their Beasts Drink

This miracle has to be enormous.

It needs to water not just the people but every animal in the whole camp.

That is a massive volume of water for a wilderness nation this size.

The size of the miracle matches the size of God's care.

🐄 Water enough for people and livestock both

📏 A miracle sized for an entire nation

💧 Not a small or token provision

📖 God's care shown at full scale

## ✅ Moses Took The Rod From Before The LORD, As He Commanded Him

So far Moses does exactly what he is told.

He takes the correct rod from its place before the Testimony.

Nothing has gone wrong yet.

The coming failure will be in how Moses uses the rod, not in this first step.

✅ Moses obeys the first instruction exactly

🪄 Takes the rod from where it was kept

🔜 The failure is still ahead of him

📖 Obedience so far, trouble still coming

# Numbers 20:10-13
# 😡 Moses Strikes The Rock Twice
---
## 😤 Hear Now, Ye Rebels

Moses' tone here is sharp and angry.

He calls the whole congregation rebels to their faces.

This is a real shift from his earlier, more patient responses to complaints.

Decades of leading this same kind of grumbling has clearly worn on him.

😤 A harsh address, calling the people rebels

📉 A shift from Moses' usual patience

⏳ Years of repeated complaints add up

📖 Even a great leader can reach a limit

## 🙋 Must We Fetch You Water Out Of This Rock

Moses says "we," not "God."

He folds himself and Aaron into credit for a miracle that belongs to God alone.

That single word choice becomes part of exactly what God names as the failure in the next verse.

A small slip in language, but not a small offense.

🙋 Moses says we, not God

⚖️ A subtle claim of credit

🎯 Named directly as the real offense

📖 Small words can carry real weight

## 🔨 Smote The Rock Twice

Instead of speaking to the rock as instructed, Moses strikes it.

He strikes it twice, not once.

This echoes Exodus seventeen, where God had actually commanded Moses to strike a rock for water years earlier.

Moses may be repeating what worked once instead of listening to this new instruction.

🔨 Moses strikes the rock instead of speaking

🔁 Echoes a striking command from Exodus seventeen

🎧 An old habit replaces a new instruction

📖 Familiar action instead of fresh obedience

## 💦 The Water Came Out Abundantly

Despite Moses' disobedience, the miracle still works.

Water pours out generously for the whole camp and their animals.

God's provision for the people is not withheld because of their leader's failure.

The judgment that follows lands on Moses and Aaron, not on the thirsty crowd.

💦 Water still flows generously despite the method

🙏 The people's need is met anyway

⚖️ Judgment falls on the leaders, not the crowd

📖 Grace for the people, consequence for Moses

## 🚫 Because Ye Believed Me Not, To Sanctify Me

"Sanctify" means to treat as holy.

It means representing God's character accurately and trustworthily in front of others.

This failure was not a small procedural mistake.

It was a public misrepresentation of who God is, done in front of the whole watching nation.

🚫 Sanctify means to treat as holy

👀 The failure happened in front of everyone

🎭 A misrepresentation of God's character

📖 Leadership carries the weight of representing God

## 🚷 Ye Shall Not Bring This Congregation Into The Land

The consequence here is enormous.

Both Moses and Aaron are barred from entering the promised land.

Not Moses alone, both of them.

One moment of disobedience costs both leaders the destination of their entire life's work.

🚷 Both Moses and Aaron are barred

⏳ Forty years of work, one costly moment

👑 No leader is exempt from consequences

📖 Even Israel's greatest leaders answer to God

## 📛 This Is The Water Of Meribah

"Meribah" means strife, or bitter arguing.

There is already an earlier place with this same name, back in Exodus seventeen.

That was a different location, but the same word.

Two separate places in Israel's story now carry the label for arguing with God over water.

📛 Meribah means strife or bitter arguing

🔁 A second place shares this exact name

💧 Both disputes were about water

📖 A recurring label for a recurring pattern

## ✨ He Was Sanctified In Them

Moses and Aaron failed to represent God rightly.

God's holiness still comes through anyway.

It shows in the judgment given to the leaders.

It shows in the mercy given to the thirsty people.

God's reputation never depended on Moses and Aaron getting it right.

✨ God's holiness still shown despite the failure

⚖️ Seen in both judgment and mercy

🛡️ God's reputation does not depend on people

📖 God stays holy even when leaders fail

# Numbers 20:14-17
# ✉️ Messengers To The King Of Edom
---
## 👑 Thus Saith Thy Brother Israel

Edom descends from Esau, the twin brother of Jacob, told back in Genesis thirty six.

That makes "thy brother Israel" more than polite language.

It is a direct appeal to an actual, centuries old family relationship.

Moses is asking a literal relative for a favor.

👑 Edom descends from Esau, Jacob's twin

🤝 Brother here is a real family claim

📖 An old kinship, not just courtesy

➡️ Moses appeals to blood, not just diplomacy

## 😩 Thou Knowest All The Travail That Hath Befallen Us

"Travail" means hard labor, or intense suffering.

Moses assumes Edom already knows something about Israel's hardships.

He builds on shared knowledge before asking for anything.

This is common ground offered before the actual request.

😩 Travail means hard labor or suffering

📢 Moses assumes Edom already knows their story

🤝 Common ground offered before the ask

📖 Shared history opens the conversation

## 📜 The Egyptians Vexed Us, And Our Fathers

Moses compresses generations of history into a few short lines.

Slavery, suffering, and rescue all get summarized quickly.

This is Israel's own short version of the whole Exodus story.

It is meant to explain why they are traveling at all.

📜 A short summary of generations of suffering

⛓️ Vexed means harshly mistreated

🏃 Explains why Israel is traveling now

📖 History compressed into a request

## 👼 Sent An Angel, And Hath Brought Us Forth Out Of Egypt

Moses credits an angel with leading Israel out of Egypt.

This likely points back to God's own promise in Exodus twenty three.

There God said He would send a messenger ahead of Israel on their journey.

The rescue was never Israel's own doing.

👼 The angel likely recalls Exodus twenty three

📜 God promised a messenger ahead of Israel

🙏 The rescue came from God, not Israel

📖 Credit given to God's own promise

## 🗺️ Kadesh, A City In The Uttermost Of Thy Border

This detail explains why Edom's permission even matters.

Kadesh sits right against the edge of Edom's territory.

Passing through Edom's land is simply the natural route forward.

This is a practical, geographic reason behind the whole request.

🗺️ Kadesh sits directly on Edom's border

🚶 Passing through was the natural route

📍 A geographic fact, not just a preference

📖 Geography explains why Israel needs permission

## 🛣️ We Will Go By The King's High Way

This is not a vague phrase.

The King's High Way was a real, well known ancient trade route.

It ran north to south through the region east of the Jordan.

Naming it specifically shows Israel is not asking to wander freely.

They are asking to travel one known, established road.

🛣️ A real, specific ancient trade route

📍 Shows exactly how narrow the ask is

🚶 One known road, not open wandering

📖 A specific request, not a vague one

## 🌾 We Will Not Pass Through The Fields, Or Through The Vineyards

Israel spells out exactly what they promise not to touch.

No crops will be taken.

No vineyards will be touched.

These are careful assurances meant to show this is peaceful transit, not the start of an invasion.

🌾 A promise to leave crops untouched

🍇 Vineyards specifically named and protected

🕊️ Meant to show peaceful intent

📖 Careful words meant to prevent fear

## 💧 Neither Will We Drink Of The Water Of The Wells

Israel also promises not to take water for free.

This becomes important once Edom actually refuses in the next section.

Israel is offering to pass through and take nothing without paying for it.

The request could hardly be more limited.

💧 A promise not to take water freely

💰 Sets up the later payment offer

🤝 An intentionally limited, respectful request

📖 Israel asks for passage, not resources

# Numbers 20:18-21
# 🚫 Edom Refuses
---
## ⚔️ Thou Shalt Not Pass By Me, Lest I Come Out Against Thee With The Sword

Edom's answer is an immediate, flat refusal.

It comes with an explicit threat of violence.

This happens right after Moses appealed to their shared family history.

The old rivalry between Jacob and Esau still seems to color this moment.

That rivalry is told back in Genesis twenty seven and Genesis thirty three.

⚔️ A flat refusal paired with a threat

👥 Comes right after an appeal to kinship

🔁 An old family rivalry lives on

📖 History still shapes how nations treat each other

## 💰 If I And My Cattle Drink Of Thy Water, Then I Will Pay For It

Israel responds with an even more generous offer than before.

They promise to pay for anything they use rather than take it freely.

This is de escalation, not pride.

Israel keeps trying peace even after being threatened.

💰 A second, more generous offer of payment

🕊️ Israel chooses to lower the tension

🙏 Peace pursued even after a threat

📖 Generosity as a response to hostility

## 🚶 I Will Only, Without Doing Anything Else, Go Through On My Feet

This phrase is an old idiom.

It means simply walking through, with no other agenda.

No fighting, no settling, nothing but passage is intended.

Israel is trying to make the request as small and unthreatening as possible.

🚶 An idiom meaning simply walking through

🎯 No hidden agenda, only passage

🕊️ Meant to sound as harmless as possible

📖 A small ask made even smaller

## 🚫 Thou Shalt Not Go Through

Edom's second answer is just as flat as the first.

There is no negotiation and no compromise offered.

Even a more generous offer changes nothing.

The door stays firmly shut.

🚫 A second flat refusal from Edom

🙅 No negotiation is offered

🚪 The door stays completely shut

📖 A closed answer, twice given

## 🛡️ Edom Came Out Against Him With Much People, And With A Strong Hand

Edom's response escalates from words to action.

Troops are mobilized to physically block Israel's path.

This is a real show of armed force, not just a spoken no.

The threat from earlier in the chapter is now backed by numbers.

🛡️ Words turn into military mobilization

📈 A clear escalation from the first refusal

⚔️ A real, physical show of force

📖 A threat now backed by numbers

## 🙅 Thus Edom Refused To Give Israel Passage Through His Border

The whole exchange ends the same way it began.

Edom refuses, plainly and completely.

Every attempt at peace from Israel changed nothing.

The final answer matches the very first one.

🙅 Edom's final answer never really changes

🔁 The same refusal as the beginning

🚫 No offer from Israel was accepted

📖 Some doors stay closed no matter what

## ↩️ Israel Turned Away From Him

Rather than force the issue, Israel simply withdraws.

They find another route instead of fighting.

This restraint matches a later instruction in Deuteronomy two, where God specifically tells Israel not to contend with Edom.

God had already given Edom their own land as Esau's inheritance.

↩️ Israel withdraws instead of fighting

📖 Matches Deuteronomy two's later instruction

🛡️ Edom's land was already Esau's inheritance

➡️ Restraint chosen even with good reason to fight

# Numbers 20:22-24
# ⛰️ Journey To Mount Hor
---
## ⛰️ Journeyed From Kadesh, And Came Unto Mount Hor

Mount Hor sits on the edge of Edom's territory.

This move marks Israel finally leaving the standoff with Edom behind.

The long journey toward the promised land continues.

Being turned away did not end the mission.

⛰️ Mount Hor sits on Edom's edge

🚶 The Edom standoff is now behind them

➡️ The larger journey continues forward

📖 A setback did not end the mission

## 🗺️ By The Coast Of The Land Of Edom

"Coast" in the King James Bible almost always means border or region.

It does not mean a seashore.

Edom has no relevant coastline in this context at all.

This phrase is simply saying Mount Hor sits along Edom's edge.

🗺️ Coast here means border, not a seashore

🌊 Edom has no relevant sea coast

📖 A common older meaning throughout the Bible

➡️ An easy phrase to misread today

## ☠️ Aaron Shall Be Gathered Unto His People

This phrase is a gentle way of announcing death.

It does not describe a literal gathering of a crowd.

The Bible often uses phrases like this instead of speaking plainly about dying.

Aaron's death is being announced here before it actually happens.

☠️ Gathered unto his people means death

🕊️ A gentle, indirect way to say it

📢 Announced here before it happens

📖 Scripture often softens the word death

## ⚖️ Because Ye Rebelled Against My Word At The Water Of Meribah

This directly carries out the judgment God already announced earlier in the chapter.

It happens soon afterward, not as some distant future consequence.

Aaron's sentence catches up with him quickly.

The words spoken earlier in the chapter are not forgotten.

⚖️ Fulfills the judgment named earlier in the chapter

⏱️ Happens soon, not far in the future

🔁 An earlier sentence gets carried out

📖 God's word does not go forgotten

# Numbers 20:25-29
# 👳 Aaron's Death, The Priesthood Passes On
---
## 📋 Take Aaron And Eleazar His Son, And Bring Them Up Unto Mount Hor

God gives Moses specific, deliberate instructions.

Both Aaron and his son Eleazar are told to climb the mountain together.

This is not a private, sudden event.

It is planned in advance and carried out on purpose.

📋 A deliberate, planned set of instructions

👨‍👦 Father and son climb the mountain together

🗓️ Nothing about this happens suddenly

📖 God plans even the ending carefully

## 👔 Strip Aaron Of His Garments, And Put Them Upon Eleazar His Son

Aaron's priestly garments are described in detail back in Exodus twenty eight and Exodus twenty nine.

They are not just clothing.

They represent the office of high priest itself.

Physically moving them from Aaron to Eleazar transfers the priesthood in a visible, deliberate ceremony.

👔 The garments represent the office, not just fabric

📜 Detailed earlier in Exodus twenty eight

🔄 Moving them transfers the priesthood itself

📖 A visible ceremony, not a quiet handoff

## 👥 In The Sight Of All The Congregation

This is not a private family moment.

Aaron's death is staged as something the whole community watches.

It is treated as a major, public transition of national leadership.

Miriam's death earlier in the chapter, by contrast, is told in a single quiet sentence.

👥 Witnessed publicly by the whole nation

🏛️ Treated as a national leadership transition

🔁 Contrasts with Miriam's quiet death

📖 Some losses are public, some are private

## ⛰️ Aaron Died There In The Top Of The Mount

The ceremony ends with Aaron's actual death on the mountain.

Moses personally performs the ceremony that ends his own brother's life.

The garments have already passed to Eleazar by this point.

The priesthood continues even as one man's life ends.

⛰️ Aaron dies on the mountain itself

👨‍👦 Moses personally leads the ceremony

🔄 The priesthood already passed to Eleazar

📖 One life ends, the office continues

## 🚶 Moses And Eleazar Came Down From The Mount

Moses walks back down the mountain without his brother.

This is a quiet but heavy detail.

The same leader who carried Israel through every crisis in this chapter now carries this loss too.

He keeps leading anyway.

🚶 Moses walks down without his brother

💔 A quiet but heavy personal loss

👑 Leadership continues in spite of grief

📖 Grief carried while duty continues

## 👀 All The Congregation Saw That Aaron Was Dead

The people below watch and understand what has happened.

There is no confusion or rumor about Aaron's fate.

The public nature of the ceremony makes the moment undeniable to everyone.

The whole nation shares the same knowledge at once.

👀 The people see and understand at once

🚫 No confusion about what happened

🏛️ The public ceremony leaves nothing in doubt

📖 A shared moment for the whole nation

## 😢 They Mourned For Aaron Thirty Days

Thirty days of formal, national mourning is a significant length of time.

The same period is later given to Moses himself after his own death in Deuteronomy thirty four.

Very few people in the Old Testament receive this kind of extended, nationwide mourning.

Aaron is remembered among that small number.

😢 Thirty days of formal national mourning

🔁 The same length later given to Moses

👑 Very few receive this level of mourning

📖 Aaron is honored among Israel's greatest
`.trim();

export const NUMBERS_TWENTY_PERSONAL_SECTIONS = parseNumbersTwentyRawNotes(NUMBERS_TWENTY_RAW_NOTES);
