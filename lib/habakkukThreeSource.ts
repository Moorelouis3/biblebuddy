export type HabakkukThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHabakkukThreeRawNotes(rawText: string): HabakkukThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HabakkukThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Habakkuk\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Habakkuk 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Habakkuk\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Habakkuk\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Habakkuk 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Habakkuk 3:${startVerse}` : `Habakkuk 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Habakkuk 3 sections, received " + sections.length);
  }

  return sections;
}

const HABAKKUK_THREE_RAW_NOTES = `# Habakkuk 3:1-2
# 🎵 A Prayer Set To A Tune
---
## 🎵 A Prayer Of Habakkuk The Prophet Upon Shigionoth

"Shigionoth" names a style of music, likely wild and emotional.

The word shares a root with a Hebrew term for wandering.

This chapter was never meant to be a calm, steady hymn.

It was meant to be sung with raw, unsteady emotion.

Habakkuk had just heard God promise the rise of Babylon.

He writes this prayer while that news is still fresh.

🎵 Shigionoth names a wild tune

🌀 The word suggests wandering or reeling

😟 Habakkuk just heard hard news

📖 This prayer carries real emotion

## 😨 O LORD I Have Heard Thy Speech And Was Afraid

Habakkuk already heard God's full answer back in chapter two.

That answer named Babylon as the coming judgment on Judah.

Fear here does not mean weak faith.

It means an honest response to something truly terrifying.

Even strong faith can tremble before hard news.

Habakkuk does not hide that reaction from God.

😨 Habakkuk already heard God's answer

🏹 Babylon's judgment was the message

💪 Fear does not cancel faith

📖 Honest fear can stand before God

## 🌱 Revive Thy Work In The Midst Of The Years

"Revive" means to bring something back to life or strength.

"Thy work" points to everything God has done for Israel before.

"The midst of the years" means now, during this present time.

Habakkuk is not asking God to wait for a far off future.

He wants God's power active in his own lifetime.

🌱 Revive means bring back to life

📜 Thy work means God's past actions

⏳ Midst of the years means now

📖 Habakkuk wants action in his lifetime

## ⚖️ In Wrath Remember Mercy

Habakkuk accepts that judgment is coming.

He believes it is even deserved.

He does not ask God to cancel it.

He only asks God to remember mercy inside that judgment.

This is the same tension that runs through the whole book.

Justice and mercy are not opposites here.

They can arrive together.

⚖️ Habakkuk accepts the coming judgment

🙏 He asks for mercy inside it

🤝 Justice and mercy are not opposites

📖 Both can arrive at once

# Habakkuk 3:3-5
# ⚡ The Storm Of God's Arrival
---
## 🗺️ God Came From Teman And The Holy One From Mount Paran

Teman was a region in Edom, south of Israel.

Mount Paran sat in the wilderness between Edom and Sinai.

Moses described God coming from this same direction long ago.

That was when God gave Israel the law at Sinai.

Habakkuk is deliberately picturing the Exodus all over again.

God rescued His people from that direction once before.

🗺️ Teman was a region in Edom

⛰️ Paran sat near the wilderness

📜 Moses used this same picture

📖 Habakkuk expects a new Exodus

## ✨ His Glory Covered The Heavens And The Earth Was Full Of His Praise

"Glory" here means the visible weight of God's presence.

That glory stretches over the whole sky at once.

"The earth was full of his praise" does not mean people are singing.

It means creation itself reflects God's greatness just by existing.

Even silent mountains and fields testify to who God is.

✨ Glory means God's visible presence

🌌 It covers the whole sky

🌍 Creation itself gives praise

📖 Nature testifies without words

## 🌅 His Brightness Was As The Light

This brightness is compared to ordinary daylight.

Think of the sudden brightness of a sunrise breaking over a dark sky.

God's appearing is sudden and impossible to miss.

No one could mistake this light for anything ordinary.

🌅 Brightness is compared to daylight

🔆 Think of a sudden sunrise

👁️ This light cannot be missed

📖 God's arrival is unmistakable

## 🚫 He Had Horns Coming Out Of His Hand

This does not mean God literally has horns.

In this picture, horns stand for strength and radiant power.

Rays of light were sometimes pictured this way in ancient writing.

The image means raw power bursting out from His hand.

🚫 Not literal horns on God

💪 Horns here picture strength

☀️ Rays of power burst out

📖 This describes raw divine power

## 🙈 There Was The Hiding Of His Power

Even this dazzling display is not the full picture.

God's real power stays hidden behind what Habakkuk can actually see.

No human could survive seeing God's full strength directly.

What Habakkuk witnesses here is already a filtered glimpse.

🙈 Even this display is partial

💥 Full power stays hidden

⚠️ No one could survive the full sight

📖 Habakkuk sees only a glimpse

## 🦠 Before Him Went The Pestilence

"Pestilence" means a deadly plague or disease.

Here it is pictured as a herald, walking ahead of God.

Ancient kings sent messengers ahead to announce their arrival.

God's messenger here is plague itself, warning of judgment to come.

🦠 Pestilence means deadly plague

📯 It goes ahead like a herald

👑 Kings sent messengers this way

📖 Plague announces God's judgment

## 🔥 Burning Coals Went Forth At His Feet

Burning coals here picture fire and destruction trailing behind God's steps.

Every place He walks is marked by judgment.

This is not a gentle procession.

It is the path of a warrior marching into battle.

🔥 Coals picture fire and destruction

👣 Judgment follows every step

⚔️ This is a warrior's march

📖 Nothing softens this arrival

# Habakkuk 3:6-7
# 🌍 Mountains That Could Not Stand
---
## 📏 He Stood And Measured The Earth

"Measured" pictures a surveyor marking out land with full authority.

A king might do this to claim new territory.

God does not need to measure anything to learn its size.

This image shows total ownership and control over the whole earth.

📏 Measured pictures a surveyor's work

👑 Kings measured land they claimed

🌍 God already owns everything

📖 This shows total control

## 💨 He Beheld And Drove Asunder The Nations

"Drove asunder" means scattering something forcefully, breaking it apart.

A single glance from God is enough to scatter entire nations.

No army or wall offers real protection from this kind of power.

Nations that seemed permanent crumble at His attention.

💨 Drove asunder means forced scattering

👁️ One glance is enough

🏰 No wall protects against this

📖 Permanent nations still crumble

## 🔁 The Everlasting Mountains Were Scattered And The Perpetual Hills Did Bow

These two lines say almost the same thing in two different ways.

That repeating pattern is common in Hebrew poetry.

Mountains and hills were considered the oldest, most permanent things on earth.

Even those bow and break apart in front of God.

Nothing that seems unshakable is actually unshakable next to Him.

🔁 Hebrew poetry often repeats an idea

⛰️ Mountains pictured ancient permanence

🙇 Even they bow before God

📖 Nothing is truly unshakable but Him

## ♾️ His Ways Are Everlasting

The mountains just called everlasting are now shown breaking apart.

God's ways are the only thing in this scene that actually lasts forever.

This line flips the whole picture around.

What looked permanent was temporary.

What looked temporary is permanent.

⛰️ Mountains were not truly everlasting

♾️ Only God's ways last forever

🔄 The picture flips completely

📖 Real permanence belongs to God alone

## 🏕️ I Saw The Tents Of Cushan In Affliction

Cushan was likely a clan or region connected to the wider Midianite area.

"Affliction" here means fear and distress, not literal suffering yet.

Habakkuk is picturing nations terrified just from God's approach.

Nothing has even happened to them yet.

Their fear comes purely from His presence drawing near.

🏕️ Cushan was a nearby people

😟 Affliction means fear and distress

🚶 God has not even arrived

📖 His presence alone brings terror

## ⛺ The Curtains Of The Land Of Midian Did Tremble

"Curtains" here means tent fabric, the walls of a nomadic tent.

Midian was a desert region east of the land of Israel.

This line repeats the same fear just named in Cushan.

Even the cloth of their tents seems to shake from dread.

⛺ Curtains means tent fabric

🏜️ Midian was a desert region

🔁 This repeats the fear just named

📖 Even their tents seem to shake

# Habakkuk 3:8-10
# 🌊 Riding Through The Sea
---
## 🚫 Was The LORD Displeased Against The Rivers

This does not mean God is literally angry at bodies of water.

Rivers and seas stand for the chaotic forces God once defeated for Israel.

The real target was never nature itself.

These questions point back to the Exodus, when God split the sea.

🚫 Not literal anger at water

🌊 Rivers picture chaotic forces

🏃 This points back to the Exodus

📖 God defeated chaos for Israel

## 🐎 Thou Didst Ride Upon Thine Horses And Thy Chariots Of Salvation

A chariot was the ancient world's most powerful weapon of war.

Here God rides one, but His chariot brings salvation, not conquest.

This flips the normal picture of a chariot completely around.

God's power is used to rescue His people, not to crush them.

🐎 A chariot was a war weapon

🔄 God's chariot brings salvation instead

🛡️ This flips the normal picture

📖 His power rescues rather than crushes

## 🏹 Thy Bow Was Made Naked

A bow stayed covered in its case until it was needed.

"Made naked" here means fully uncovered and ready to fire.

God is pictured here as a warrior preparing for battle.

Nothing about this image is passive.

🏹 A bow stayed covered until needed

👐 Naked here means uncovered

⚔️ God is pictured as a warrior

📖 Nothing here is passive

## 📜 According To The Oaths Of The Tribes Even Thy Word

This difficult line points back to promises God made to Israel's tribes.

"Thy word" means God's own spoken promise, not a human oath.

God's coming judgment and rescue both fulfill promises already made.

Nothing here happens outside what He already said He would do.

📜 Oaths points to promises made

🗣️ Thy word means God's own promise

🤝 This fulfills earlier commitments

📖 Nothing here is a surprise

## ✂️ Thou Didst Cleave The Earth With Rivers

"Cleave" means to split something open by force.

This recalls water bursting from a rock during the wilderness years.

It also recalls rivers parting during the Exodus.

God is not just controlling water here.

He is actively reshaping the ground itself to rescue His people.

✂️ Cleave means splitting by force

🪨 This recalls water from the rock

🌊 It recalls rivers parting too

📖 God reshaped the ground to save

## 👀 The Mountains Saw Thee And They Trembled

Mountains cannot literally see or feel fear.

This gives creation a human reaction to show how total God's power is.

Even the most solid parts of the earth respond to Him.

Nothing in creation stays unmoved in His presence.

👀 Mountains cannot literally see

🎭 This personifies creation's fear

⛰️ Even solid ground reacts

📖 Nothing stays unmoved near God

## 🌊 The Deep Uttered His Voice And Lifted Up His Hands On High

"The deep" means the ocean, pictured here as a living being.

Raising hands pictures the sea's waves rising up high.

The ocean is given a voice and a body just like a person.

Even the most chaotic waters respond to God's presence.

🌊 The deep means the ocean

🙌 Raised hands pictures rising waves

🗣️ The ocean is given a voice

📖 Even chaos responds to God

# Habakkuk 3:11-13
# ☀️ Weapons Brighter Than The Sky
---
## 🌞 The Sun And Moon Stood Still In Their Habitation

This echoes the day the sun stood still during Joshua's battle at Gibeon.

"Habitation" here means their normal place in the sky.

Even the sun and moon pause when God moves in power.

The ordinary rhythm of day and night bends around His action.

📖 This echoes Joshua's long day

🌞 Habitation means their normal place

🌙 Sun and moon both pause

➡️ Even time bends around God

## ⚡ At The Light Of Thine Arrows And The Shining Of Thy Glittering Spear

God's weapons here are pictured as lightning, not metal.

An arrow that shines like light moves faster than any enemy can dodge.

A glittering spear works the same way, blinding and swift.

These are not literal weapons, but pictures of overwhelming, instant power.

⚡ Weapons are pictured as lightning

🏹 Arrows move faster than enemies

🔱 The spear blinds and strikes fast

📖 These picture instant, overwhelming power

## 🔥 Thou Didst March Through The Land In Indignation

"Indignation" means righteous anger, anger that responds to real wrong.

This is not a loss of control.

It is a deliberate, justified response to evil.

God's anger here has a clear and fitting target.

🔥 Indignation means righteous anger

🎯 It responds to real wrong

🧭 This anger is deliberate

📖 It has a fitting target

## 🌾 Thou Didst Thresh The Heathen In Anger

Threshing was the process of beating grain to separate it from its husk.

Farmers pounded stalks to free the valuable grain inside.

Here God is pictured threshing entire nations the same violent way.

The image is harsh on purpose, showing judgment with no softening.

🌾 Threshing separates grain from husk

🔨 Farmers pounded stalks to free it

🌍 Nations are threshed the same way

📖 Judgment here is not softened

## 👑 Thou Wentest Forth For The Salvation Of Thy People With Thine Anointed

"Thine anointed" means a chosen leader set apart for a specific purpose.

This could point to a king, or to the nation of Israel as a whole.

Either way, God's rescue has a clear, chosen target.

This salvation is personal, not a vague act of general kindness.

👑 Anointed means chosen for a purpose

🎯 Salvation here has a clear target

🤝 This rescue feels personal

📖 It is not vague kindness

## 🧠 Thou Woundedst The Head Out Of The House Of The Wicked

"The head" means the leader, the one directing the whole wicked system.

Striking the head disables the entire body underneath it.

This pictures a decisive, single strike that ends an entire threat.

God is not fighting randomly.

He is targeting the exact source of the danger.

🧠 The head means the leader

💥 Striking it disables the system

🎯 This strike is decisive

📖 God targets the real source

## 🏗️ By Discovering The Foundation Unto The Neck

This phrase is genuinely difficult, and scholars read it a few different ways.

Many believe it pictures a building stripped down completely, down to its base.

Others connect it to exposing an enemy from head to foot.

Either way, the image means total, complete destruction with nothing left standing.

🏗️ A hard phrase read several ways

🧱 Likely pictures a stripped building

👤 Possibly pictures a fully exposed enemy

📖 Either way, nothing is left standing

# Habakkuk 3:14-16
# 😱 Habakkuk Trembles At The Vision
---
## 🏹 Thou Didst Strike Through With His Staves The Head Of His Villages

"Staves" here means the enemy's own weapons, clubs or spear shafts.

God strikes down the enemy's leadership using the very weapons they brought.

Their own strength becomes the tool of their defeat.

Nothing they trusted in actually protects them.

🏹 Staves means the enemy's own weapons

🔄 Their weapons turn against them

💔 Their strength causes their defeat

📖 Nothing they trusted protects them

## 🌪️ They Came Out As A Whirlwind To Scatter Me

A whirlwind is a sudden, violent storm that appears without warning.

Habakkuk pictures the invading enemy army the same way.

Their attack feels chaotic and overwhelming, not organized or slow.

This is the invasion Habakkuk already feared back in chapter one.

🌪️ A whirlwind appears without warning

⚔️ The enemy army felt the same

😨 Their attack feels chaotic

📖 This is the invasion he feared

## 🐺 Their Rejoicing Was As To Devour The Poor Secretly

This pictures the enemy's cruelty toward the weakest, most defenseless people.

"Secretly" suggests ambush, striking people who cannot fight back.

Their joy comes from exploiting people who have no power to resist.

This is cruelty at its most cowardly.

🐺 This pictures cruelty toward the weak

🫥 Secretly suggests a hidden ambush

😢 Victims cannot fight back

📖 This cruelty is cowardly

## 🌊 Thou Didst Walk Through The Sea With Thine Horses Through The Heap Of Great Waters

This recalls the Exodus, when Israel walked through the parted Red Sea.

"Heap of great waters" pictures walls of water piled up on both sides.

God is not just remembered for that moment.

He is still described as actively walking through chaos today.

🌊 This recalls the parted Red Sea

🧱 Waters are pictured piled like walls

🐎 God walks through chaos himself

📖 This is not just a memory

## 😰 When I Heard My Belly Trembled My Lips Quivered

Habakkuk describes his own body's reaction to this vision.

His stomach shakes, and his lips shake too.

Rottenness enters his bones, and he trembles all over.

This is not poetic exaggeration.

It is an honest account of real physical terror.

😰 His stomach and lips both shake

🦴 He feels weak to his bones

💯 This is real physical terror

📖 Even faithful prophets can shake

## 🧘 That I Might Rest In The Day Of Trouble

"Rest" here does not mean comfort or ease.

It means staying steady and quiet instead of panicking when trouble arrives.

Habakkuk is preparing himself now so he can stand firm later.

Facing fear honestly today is what makes quiet trust possible tomorrow.

🧘 Rest means staying steady, not comfort

⏳ This prepares him for later

🛑 The goal is to avoid panic

📖 Honest fear today builds quiet trust

## ⚔️ When He Cometh Up Unto The People He Will Invade Them With His Troops

"He" here refers to the invading army, almost certainly Babylon.

"The people" means Habakkuk's own nation, Judah.

This is the exact threat God first revealed back in chapter one.

Habakkuk has now fully faced what is coming.

⚔️ He refers to Babylon's army

🏘️ The people means Habakkuk's own nation

🔁 This matches chapter one's warning

📖 Habakkuk is now ready to respond

# Habakkuk 3:17-19
# 🙌 Rejoicing Before The Harvest Comes
---
## 🌳 Although The Fig Tree Shall Not Blossom

This verse pictures total economic collapse, not just one bad crop.

The fig tree, the vines, and the olive trees all fail together.

The fields produce no food, and the flocks disappear completely.

Every major source of food a family depended on fails at once.

This is the worst case Habakkuk can imagine for his own nation.

🌳 Fig trees fail to blossom

🍇 Vines produce no grapes

🫒 Olive harvests fail completely

📖 This pictures total economic collapse

## 🙌 Yet I Will Rejoice In The LORD I Will Joy In The God Of My Salvation

These two lines say the same thing in two different ways.

That repeated pattern is common in Hebrew poetry.

This is the turning point of the entire chapter.

Habakkuk chooses joy before anything actually improves.

This is the same faith named back in chapter two.

The just shall live by faith, even now, in the middle of loss.

🙌 Rejoice and joy repeat on purpose

🔁 Hebrew poetry often doubles an idea

🔄 Joy comes before circumstances improve

📖 This is the faith named in chapter two

## 💪 The LORD God Is My Strength

Habakkuk names God directly as the source of his strength.

This is not strength he found inside himself.

It comes entirely from outside him, as a gift.

Fear earlier in the chapter does not cancel this trust now.

💪 Strength comes from God, not Habakkuk

🎁 This strength is a gift

😨 Fear and trust can coexist

📖 Trust outlasts the fear named earlier

## 🦌 He Will Make My Feet Like Hinds Feet

A hind is a female deer, known for sure, steady footing on rocky ground.

Habakkuk is not asking for an easy path.

He is asking for the ability to walk a hard one safely.

God's help here is practical, not just emotional comfort.

🦌 A hind is a swift female deer

🪨 Hinds move surely on rocky ground

🥾 Habakkuk wants safe footing, not an easy path

📖 God's help here is practical

## ⛰️ He Will Make Me To Walk Upon Mine High Places

High places were often dangerous, exposed, and hard to reach.

They could also mean places of victory and safety above danger.

Habakkuk expects God to lift him above the trouble ahead.

Trouble will still come, but it will not have the final word.

⛰️ High places were often dangerous

🏔️ They also pictured safety above danger

🙌 God will lift Habakkuk above it

📖 Trouble will not have the final word

## 🎵 To The Chief Singer On My Stringed Instruments

This closing line is a musical notation, much like many psalm titles.

"The chief singer" names a choir leader who would perform this song.

Habakkuk wrote this prayer expecting it to be sung, not just read.

The chapter that opened in fear ends ready for a congregation to sing.

🎵 This is a musical notation

🎤 The chief singer led the performance

📜 Habakkuk expected this to be sung

📖 Fear became a song for others too
`.trim();

export const HABAKKUK_THREE_PERSONAL_SECTIONS = parseHabakkukThreeRawNotes(HABAKKUK_THREE_RAW_NOTES);
