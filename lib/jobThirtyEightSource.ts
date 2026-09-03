export type JobThirtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtyEightRawNotes(rawText: string): JobThirtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+38:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 38 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+38:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+38:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 38 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 38,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 38:${startVerse}` : `Job 38:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Job 38 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_EIGHT_RAW_NOTES = `# Job 38:1-3
# 🌪️ The LORD Speaks From The Whirlwind
---
## 🌪️ Then The LORD Answered Job Out Of The Whirlwind

A whirlwind is a violent, swirling storm, not a gentle breeze.

God did not answer Job with a quiet whisper.

He answered from raw, visible power.

Job had spent thirty seven chapters demanding an audience with God.

Now he finally gets one, and it does not look like he expected.

🌪️ Whirlwind means a violent storm

😲 God finally speaks directly

📢 Job demanded this moment for chapters

📖 God's answer comes wrapped in power

## 🌫️ Who Is This That Darkeneth Counsel By Words Without Knowledge

"Darkeneth" means to make dark or confused, like clouding something clear.

God is not asking who Job is.

He is rebuking how Job has been speaking.

Job's long speeches sounded wise, but they were built on limited human knowledge.

God calls that mixture of confidence and ignorance a fog over the truth.

🌫️ Darkeneth means clouded or confused

❓ God is not confused about Job's identity

🗣️ He is correcting Job's speeches

📖 Confidence without knowledge only clouds truth

## 👘 Gird Up Now Thy Loins Like A Man

Ancient robes were long and loose, made for walking, not working.

To gird up the loins meant tucking the hem into a belt.

That freed the legs for hard labor, a fight, or a fast journey.

God is telling Job to prepare himself, not for comfort but for a real challenge.

👘 Loins refers to the long ancient robe

🪢 Girding meant tucking it into a belt

🏃 It freed the body for hard work

➡️ God is preparing Job for a challenge

## 🔄 I Will Demand Of Thee, And Answer Thou Me

Job had spent this whole book wanting to question God.

He said earlier he would meet God like a prince and demand answers.

Now the roles reverse completely.

God will ask the questions, and Job will have to answer.

🔄 The roles between Job and God reverse

👑 Job wanted to question God like a prince

🎤 Now God does the questioning

📖 Job must answer instead of demand

# Job 38:4-7
# 🏗️ Laying The Foundations Of The Earth
---
## 🏗️ Where Wast Thou When I Laid The Foundations Of The Earth

God pictures the earth as a massive building project.

A foundation is the base that holds up everything built on top.

Job did not exist yet when that foundation was laid.

He cannot claim any inside knowledge of how creation actually began.

🏗️ Foundations means the base of a building

🌍 God pictures earth as His construction project

👤 Job was not there to see it

📖 Job has no firsthand knowledge of creation

## 📏 Who Hath Stretched The Line Upon It

A "line" here is a measuring cord builders used to keep walls straight.

Ancient builders stretched a cord tight between two points before laying stone.

That kept the whole structure level and even.

God claims that same careful precision over the entire earth.

📏 Line means a builder's measuring cord

🧱 It kept ancient walls straight and level

🌍 God used the same precision on earth

📖 Creation was planned, not random

## 🧱 Who Laid The Corner Stone Thereof

A cornerstone was the first stone set in an ancient building.

Every other wall and angle lined up against it.

Get the cornerstone wrong, and the whole structure leans.

The Bible later uses this same image for Christ as the foundation of the church.

🧱 Cornerstone means the first stone set down

📐 Every other wall aligned to it

⚠️ One wrong stone would ruin the building

📖 Scripture later applies this image to Christ

## ⭐ The Morning Stars Sang Together, And All The Sons Of God Shouted For Joy

"The sons of God" refers to angelic beings, the same title used earlier in Job chapter one.

"Morning stars" is poetic language for those same heavenly beings.

They are pictured celebrating with singing and shouting the moment the earth was formed.

Creation had an audience of pure joy before a single human ever existed.

⭐ Morning stars means angelic beings

👼 Sons of God matches Job chapter one

🎉 They celebrated when the earth was made

📖 Joy filled creation before humans existed

# Job 38:8-11
# 🌊 Locking The Sea Behind Doors
---
## 🌊 Who Shut Up The Sea With Doors

The sea in the ancient world felt wild and uncontrollable.

God describes closing it in with doors, the way a gate locks something in.

Something that terrified ancient sailors obeys God without question.

The ocean is not a rival force but a creature under command.

🌊 The sea felt wild and untamed

🚪 Doors means God enclosed and controlled it

😨 Sailors feared what obeys God easily

📖 The ocean answers directly to God

## 👶 The Cloud The Garment Thereof, And Thick Darkness A Swaddlingband

A "swaddlingband" is the cloth wrapped tightly around a newborn baby.

God pictures the sea bursting out like a baby being born.

Clouds become its clothing, and darkness becomes the cloth wrapped around it.

The same God who tames a raging ocean also wraps it gently, like a parent.

👶 Swaddlingband means cloth wrapped around a newborn

🌊 The sea is pictured bursting out like birth

☁️ Clouds and darkness become its wrapping

📖 God controls the sea with a parent's care

## 📜 Brake Up For It My Decreed Place, And Set Bars And Doors

"Decreed" means officially and permanently established, not open to negotiation.

God fixed one exact boundary for the ocean to fill.

"Bars and doors" pictures that boundary like a locked enclosure.

The sea cannot simply spread wherever it wants.

📜 Decreed means permanently fixed by God

🗺️ The ocean got one exact boundary

🔒 Bars and doors picture a locked space

📖 The sea cannot spread without permission

## 🗣️ Hitherto Shalt Thou Come, But No Further

God speaks directly to the sea, like giving an order to a person.

"Hitherto" is an old word meaning up to this point.

The coastline itself becomes God's spoken command made visible.

Every wave that stops at the shore is still obeying that first order.

🗣️ God speaks to the sea directly

📍 Hitherto means up to this exact point

🏖️ The coastline marks God's spoken command

📖 Every wave still obeys that order today

# Job 38:12-15
# 🌅 Commanding The Dawn
---
## 🌅 Caused The Dayspring To Know His Place

"Dayspring" is an old word for the first light of dawn.

God pictures the sunrise like a servant who knows exactly where to report.

Job has never once controlled when or where the sun rises.

Something this reliable only happens because God commands it every single day.

🌅 Dayspring means the first light of dawn

🧭 Dawn is pictured as an obedient servant

👤 Job has never controlled a sunrise

📖 God commands it new every day

## 🧺 Take Hold Of The Ends Of The Earth

Morning light is described spreading across the earth all at once.

Think of grabbing the corners of a blanket and shaking it out fully.

That sudden light exposes anyone trying to do harm under cover of darkness.

Daylight itself becomes a kind of justice, stripping away hiding places.

🌍 Light spreads over the earth at dawn

🧺 Picture shaking out a blanket by its corners

🕵️ Daylight exposes people hiding to do harm

📖 Light itself works like justice

## 🖋️ It Is Turned As Clay To The Seal

A seal was a carved stamp pressed into soft clay to leave a mark.

Ancient people used seals the way a signature is used today.

At sunrise, the earth's hills and shapes appear the way an image appears on stamped clay.

Before dawn none of that shape could be seen at all.

🖋️ A seal was an ancient signature stamp

🏺 It was pressed into soft clay

🏔️ Sunrise reveals earth's shape the same way

📖 Nothing was visible before that light came

## 💪 The High Arm Shall Be Broken

"Arm" is a common Bible picture for strength or raised power.

Daylight strips away the darkness the wicked depend on to act.

Once exposed, their threatening strength cannot hold up.

Light does more than let people see. It takes away hidden power.

💪 Arm is a Hebrew picture for strength

🌑 The wicked rely on darkness to act

☀️ Daylight removes that cover completely

📖 Light strips away hidden power

# Job 38:16-18
# 🔍 The Springs Of The Sea
---
## 🔍 Entered Into The Springs Of The Sea

Ancient people believed the ocean was fed by hidden underwater springs.

No person in Job's time could dive deep enough to see them.

God asks Job if he has personally walked through that hidden source.

The bottom of the sea remained a total mystery to every human alive then.

🌊 Springs of the sea means its hidden source

🤿 No ancient person could reach that depth

❓ God asks if Job has seen it

📖 The ocean floor stayed a total mystery

## 🚪 The Gates Of Death... The Shadow Of Death

Ancient Hebrew poetry often pictured death as a place with actual gates.

"Shadow of death" describes deep, overwhelming darkness, not just dying itself.

The same phrase appears later in Psalm twenty three, describing a dark valley.

God asks if Job has ever stood at that gate and looked in.

🚪 Gates of death pictures death as a place

🌑 Shadow of death means overwhelming darkness

📜 The same phrase appears in Psalm twenty three

📖 Job has never stood at that gate

## 🌍 Perceived The Breadth Of The Earth

Nobody in the ancient world could measure the whole size of the earth.

Even the most traveled person had only seen a small piece of it.

God's question exposes exactly how limited human experience really is.

Total knowledge of the earth was never available to any person, only to its maker.

🌍 Breadth means the earth's full size

🚶 Even wide travel covers only a small part

👤 Human experience is always limited

📖 Only the maker knows the earth fully

# Job 38:19-21
# 🌗 The Dwelling Place Of Light And Darkness
---
## 🏠 Where Is The Way Where Light Dwelleth

God speaks of light as if it lives somewhere, like a person with a home.

Darkness gets the same treatment, pictured with its own separate dwelling.

This is poetry, not a claim that light is literally a person.

The picture forces Job to admit he has no map to either place.

🏠 Light is pictured as having a home

🌑 Darkness gets its own separate home

🎨 This is poetic language, not literal

➡️ Job has no map to either place

## 🛤️ The Paths To The House Thereof

God keeps building the same picture, now asking about a path leading home.

He asks if Job could personally walk light and darkness back where they belong.

It is a strange, almost playful question, meant to feel impossible.

Nobody can guide light or darkness anywhere. They simply obey God's schedule.

🛤️ God asks about a path to their home

🚶 Could Job guide light and darkness back

😅 The question is meant to feel impossible

📖 Light and darkness just obey God's schedule

## 😏 Because Thou Wast Then Born? Or Because The Number Of Thy Days Is Great

This line carries real sarcasm.

God asks if Job is simply old enough to know these secrets.

Job was not alive at creation, and his lifespan is nowhere near ancient.

The question quietly ends any claim Job might have to hidden wisdom.

😏 This line carries real sarcasm

👴 God asks if Job is somehow ancient

❌ Job was not present at creation

📖 His claim to hidden wisdom collapses

# Job 38:22-24
# ❄️ Storehouses Of Snow And Hail
---
## 🏰 The Treasures Of The Snow... The Treasures Of The Hail

"Treasures" here means storehouses, like a king's private armory.

God describes snow and hail as if they are kept in reserve somewhere.

Job has never opened those doors or seen what is inside.

Weather itself becomes something ruled and stored, not random chance.

🏰 Treasures means storehouses, like an armory

❄️ Snow and hail are kept in reserve

🚪 Job has never opened those doors

📖 Weather is ruled, not random chance

## ⚔️ Reserved Against The Time Of Trouble, Against The Day Of Battle And War

Hail was not always just weather in the Bible's story.

God once used hail as a weapon against Egypt in the plagues.

He used it again during Israel's battle at Gibeon in the book of Joshua.

This verse ties that same stored hail to God's power in judgment.

⚔️ Hail was sometimes used as a weapon

🇪🇬 God once sent hail on Egypt

🪨 Hail also struck Israel's enemies at Gibeon

📖 Weather can serve God's judgment

## 🏜️ Scattereth The East Wind Upon The Earth

The east wind blew in off the desert, hot and destructive.

Farmers in this region dreaded it for scorching crops and drying up water.

The same wind appears elsewhere, drying the Red Sea and killing Jonah's shade plant.

God claims authority over even this feared, damaging weather.

🏜️ East wind means a hot desert wind

🌾 It scorched crops and dried water

📜 The same wind appears elsewhere in scripture

➡️ God directs even destructive weather

# Job 38:25-30
# 🌧️ Rain, Ice, And Frost Without A Father
---
## 🌊 Divided A Watercourse For The Overflowing Of Waters

A "watercourse" is a channel that carries floodwater somewhere specific.

God asks who carved the paths that storm runoff and lightning follow.

Nothing about a storm is actually random or out of control.

Even lightning strikes travel a path someone had to design first.

🌊 Watercourse means a channel for floodwater

⚡ Lightning also follows a designed path

🎯 Nothing in a storm is truly random

📖 God designed the paths storms follow

## 🏜️ To Rain On The Earth, Where No Man Is

God sends rain to empty deserts that no person will ever see.

There is no human benefit, no audience, and no one to thank Him.

His care for creation does not depend on being watched or needed.

God tends what nobody else will ever notice.

🏜️ Rain falls where no person lives

👀 There is no human audience at all

💧 God's care does not need to be seen

📖 God tends what nobody else notices

## 🌱 To Cause The Bud Of The Tender Herb To Spring Forth

Even the smallest, most fragile plant gets God's personal attention.

A "tender herb" is delicate new growth, easily missed or trampled.

God brings it to life in ground nobody farms and nobody visits.

Nothing in creation is too small or too remote for His care.

🌱 Tender herb means delicate new growth

🏞️ It grows in ground nobody farms

👣 Easily missed, yet still cared for

📖 Nothing is too small for God's care

## 👨 Hath The Rain A Father

God uses family language, asking if rain has a father.

Ancient cultures sometimes explained weather through stories of gods giving birth to it.

This question strips that idea away completely.

Rain and dew answer to one source only, and it is not a family tree.

👨 Father language personifies rain's origin

🌍 Ancient cultures often explained weather that way

🚫 This verse rejects that whole idea

📖 Rain answers to God alone

## 🧊 Out Of Whose Womb Came The Ice

God keeps using birth language, now asking about ice and frost.

"Gendered" is an old word meaning fathered or brought into being.

Ice and frost seem to appear out of nowhere every winter.

This verse insists they still have exactly one true source.

🧊 Womb language personifies where ice comes from

📜 Gendered is an old word for fathered

❄️ Frost seems to appear from nowhere

➡️ It still comes from one true source

## 🪨 The Waters Are Hid As With A Stone

Freezing water is pictured as if a stone lid sealed it shut.

Anything moving freely underneath suddenly stops and locks in place.

The same water that flows and splashes becomes solid overnight.

That total change, from moving to frozen, happens only when God allows it.

🪨 Frozen water is pictured like a stone lid

🧊 Moving water suddenly locks in place

🌡️ Liquid becomes solid overnight

📖 That change happens only by God's will

# Job 38:31-33
# ⭐ The Stars And Their Laws
---
## ✨ The Sweet Influences Of Pleiades

Pleiades is a tight cluster of stars visible to the naked eye.

Ancient farmers called it the seven sisters and used it to track the seasons.

Its rise in the sky signaled planting time in many ancient cultures.

God asks if Job can control what farmers only knew how to watch.

✨ Pleiades is a star cluster, the seven sisters

🌱 Farmers used it to mark planting season

👀 People could only watch, never control it

📖 God asks if Job can command it

## 🌌 Loose The Bands Of Orion

Orion is a constellation known for the three stars forming its belt.

"Bands" pictures those stars as actual ropes or chains.

God asks if Job can tie or untie a constellation like a knot.

The stars stay fixed in the sky only because God holds that pattern in place.

🌌 Orion is a well known constellation

⛓️ Bands pictures its stars as chains

🪢 Job cannot tie or untie the stars

📖 God alone holds their pattern in place

## 🌠 Bring Forth Mazzaroth In His Season

"Mazzaroth" likely refers to the constellations that mark the changing seasons.

Ancient people tracked time by watching which stars rose and set.

God claims personal responsibility for bringing each one out on schedule.

The night sky was never a random display. It runs on God's calendar.

🌠 Mazzaroth likely means the zodiac constellations

📆 Ancient people tracked seasons by the stars

🗓️ God brings each one out on schedule

📖 The night sky runs on God's calendar

## 🐻 Canst Thou Guide Arcturus With His Sons

Arcturus, sometimes translated as the Bear, is another well known constellation.

"His sons" pictures smaller nearby stars as children following behind it.

God asks if Job can lead that whole family of stars across the sky.

Not one star anywhere moves without God's direction.

🐻 Arcturus is sometimes called the Bear

👥 His sons pictures smaller stars nearby

🧭 Job cannot guide even one star

➡️ Every star moves under God's direction

# Job 38:34-38
# 🌩️ Voice, Wisdom, And The Bottles Of Heaven
---
## 🗣️ Lift Up Thy Voice To The Clouds

God asks if Job can simply call out and make a storm obey.

A command like that only works when the one speaking actually holds the power.

Job's voice cannot move a single cloud.

Only God speaks and the sky responds.

🗣️ Job asks if a shout can command clouds

⛈️ Real command requires real power

🙅 Job's voice moves nothing in the sky

📖 Only God speaks and the sky obeys

## ⚡ Canst Thou Send Lightnings, That They May Go, And Say Unto Thee, Here We Are

God pictures lightning bolts like soldiers reporting for duty.

They go exactly where sent and answer the instant they are called.

No human command could ever move that fast or that precisely.

Even the fastest, most dangerous force in nature answers to God alone.

⚡ Lightning is pictured like an obedient soldier

🫡 It reports the instant it is called

🙅 No human command moves that fast

📖 Even lightning answers only to God

## 🧠 Who Hath Put Wisdom In The Inward Parts

God shifts the questioning from nature to the human mind itself.

"Inward parts" refers to a person's inner self, thoughts and instincts.

Even the ability to think clearly did not originate with the person thinking.

Human wisdom is a gift placed there, not something people built on their own.

🧠 Inward parts means a person's inner self

🎁 Wisdom is placed there, not self made

💭 Even clear thinking is a gift

📖 God is the source of human wisdom

## 🏺 Who Can Stay The Bottles Of Heaven

"Bottles of heaven" pictures the clouds as jars that hold rain.

Someone has to tip and pour them for rain to fall at all.

Right after this, the dust itself hardens once that rain lands.

Even something as ordinary as dry ground turning to clay depends on God's timing.

🏺 Bottles of heaven pictures clouds as jars

💧 Rain only falls when God pours them

🟤 Dust hardens once the rain arrives

📖 Even dirt depends on God's timing

# Job 38:39-41
# 🦁 Feeding The Lion And The Raven
---
## 🦁 Wilt Thou Hunt The Prey For The Lion

God shifts the challenge from the sky to living, hungry creatures.

Lions are among the most feared predators in the ancient world.

God claims personal responsibility for feeding even them.

His care reaches into places most people would never want to go.

🦁 The challenge shifts to feared predators

🍖 God personally provides a lion's food

😨 Lions were feared throughout the ancient world

📖 God's care reaches even dangerous places

## 🌿 Abide In The Covert To Lie In Wait

"Covert" is an old word for a hidden, sheltered spot.

Lions crouch there quietly, waiting to ambush their next meal.

God knows that secretive corner of nature just as fully as the open sky.

Nothing hides well enough to be outside His attention.

🌿 Covert means a hidden, sheltered spot

🦁 Lions wait there to ambush prey

👁️ God sees even that hidden corner

📖 Nothing hides outside His attention

## 🐦 Who Provideth For The Raven His Food

Ravens were considered unclean, scavenging birds under Israelite law in Leviticus eleven.

Nobody prized them or expected God to bother with them.

Yet their hungry chicks are described crying out, and God still hears them.

If God feeds an unwanted bird, Job's own needs are never overlooked.

🐦 Ravens were considered unclean scavengers

📜 Leviticus eleven lists them as unwanted

😢 Even their chicks cry out and are heard

📖 God overlooks nothing, not even a raven
`.trim();

export const JOB_THIRTY_EIGHT_PERSONAL_SECTIONS = parseJobThirtyEightRawNotes(JOB_THIRTY_EIGHT_RAW_NOTES);
