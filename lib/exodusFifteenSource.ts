export type ExodusFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFifteenRawNotes(rawText: string): ExodusFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 15:${startVerse}` : `Exodus 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Exodus 15 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FIFTEEN_RAW_NOTES = `# Exodus 15:1-3
# 🎵 The Song Begins
---
## 🎵 Then Sang Moses And The Children Of Israel

This is the first song written down in the whole Bible.

It comes right after Israel walks through the Red Sea on dry ground.

The whole nation sings together, not just Moses by himself.

Worship here grows straight out of something God had just done.

🎵 First song ever recorded in the Bible

👥 The whole nation sings together

⏱️ Praise comes right after the miracle

📖 Worship followed straight from real deliverance

## 🌊 The Horse And His Rider Hath He Thrown Into The Sea

This exact line becomes the refrain of the whole song.

Miriam repeats it word for word later in verse twenty one.

Horse and rider together picture Egypt's whole cavalry force, not one man.

Chariots depended on horses, so losing the horse ended the whole chariot line.

🌊 This line becomes the song's refrain

🔁 Miriam repeats it later in verse twenty one

⚔️ Horse and rider stand for Egypt's whole army

📖 The defeat pictured here is total

## 🛡️ He Is Become My Salvation

The words strength and song are paired together on purpose.

Strength means the power that carried Israel through the sea.

Song means the reason Israel now has something to celebrate.

Salvation here does not mean a future hope.

It means something that already happened, watched with their own eyes.

🛡️ Strength means the power God provided

🎶 Song means the reason to celebrate

🙌 Moses calls him my God, not our God

📖 Salvation already happened, not a future hope

## 📜 I Will Prepare Him An Habitation

Habitation means a dwelling place, somewhere God would live among His people.

Israel has no tabernacle and no temple yet at this point in the story.

Moses sings about a future dwelling before it exists.

This song looks forward, not just backward at the Red Sea.

📜 Habitation means a dwelling place for God

📆 No tabernacle or temple exists yet

🔮 The song looks ahead, not only back

📖 The tabernacle later fulfills this line

## ⚔️ The LORD Is A Man Of War

This does not mean God has a human body or fights with a physical sword.

Man of war means a warrior, someone who actively fights for his people.

Egypt just watched an entire army destroyed without Israel lifting a weapon.

God is not a distant observer in this story.

🚫 Does not mean God has a body

🛡️ It means God actively fought for Israel

🌊 Egypt's army fell without Israel raising a weapon

📖 God fought personally, not from a distance

# Exodus 15:4-8
# 🌊 Recounting The Red Sea Victory
---
## 🐎 Pharaoh's Chariots And His Host Hath He Cast Into The Sea

Host means Pharaoh's whole army, not just a portion of it.

Cast means thrown, a deliberate act, not an accident of nature.

Egypt owned the most advanced military technology of the ancient world in its chariots.

The song credits this to God's direct action, not luck or timing.

🐎 Host means Pharaoh's entire army

💧 Cast means thrown, done on purpose

⚔️ Egypt's most advanced weapon is destroyed

📖 God gets the credit, not chance

## 🎖️ His Chosen Captains Also Are Drowned

Chosen captains means the elite officers, Egypt's best trained commanders.

These were not ordinary foot soldiers caught by surprise.

Losing the top command crippled Egypt's military far beyond one battle.

Even Egypt's strongest men could not survive God's judgment here.

🎖️ Chosen captains means Egypt's elite officers

🛡️ These were the best trained commanders

💥 Egypt's top command was wiped out

📖 Even the strongest could not survive

## 🌊 They Sank Into The Bottom As A Stone

A stone sinks fast, with no floating and no struggle.

This simile pictures instant, total defeat, not a slow drowning.

There was no dramatic rescue attempt or delay.

The speed of the image matches the size of the miracle.

🌊 A stone sinks fast, without floating

⚡ This pictures instant, total defeat

🚫 No delay and no struggle shown

📖 Speed here matches the size of the miracle

## ✋ Thy Right Hand, O LORD

Right hand is an old way of picturing strength and skilled action.

Most people favor their right hand for their strongest, most precise work.

The phrase repeats twice in this one verse for emphasis.

Poetry often repeats a line on purpose to make the point land harder.

✋ Right hand pictures strength and skill

🔁 The phrase repeats twice in one verse

📣 Repetition in poetry adds emphasis on purpose

📖 God's power gets full weight here

## 🔥 Consumed Them As Stubble

Stubble means the dry leftover stalks in a field after harvest.

Stubble catches fire instantly and burns completely within seconds.

Egypt's mighty army is compared to something that disappears almost instantly.

Thy wrath here pictures God's judgment as fire, quick and total.

🌾 Stubble means dry leftover stalks after harvest

💨 Stubble burns fast and completely

⚔️ Egypt's army vanishes just as quickly

📖 God's judgment here is pictured as fire

## 💨 With The Blast Of Thy Nostrils

This pictures God's breath as the force behind the parting sea.

It is poetic language, not a claim that God has a physical nose.

The Bible often describes God in human terms so people can picture his power.

A blast of breath moving an entire sea shows power beyond anything human.

💨 Pictures God's breath as raw power

🚫 Not a claim that God has a body

🌊 One breath moves an entire sea

📖 Human terms help picture power beyond words

## 🧱 The Floods Stood Upright As An Heap

Heap means a mound or pile, water standing up like a wall.

This describes the parted sea from Exodus fourteen, now sung back as poetry.

Water does not naturally stand upright on its own.

The picture confirms this was a real, physical, visible miracle.

🧱 Heap means a mound or wall of water

🌊 This recalls the parted sea from chapter fourteen

🚫 Water does not stand up on its own

📖 The miracle here is real and visible

# Exodus 15:9-11
# 😤 The Enemy's Boast And God's Power
---
## 🗣️ I Will Pursue, I Will Overtake, I Will Divide The Spoil

The song quotes Egypt's own words spoken before their defeat.

Four short I will statements pile up one after another.

Spoil means the plunder a winning army takes from the loser.

Egypt speaks here as though the outcome is already certain.

🗣️ Four I will statements show Egypt's confidence

💰 Spoil means plunder taken from the defeated

🎭 Egypt speaks as if victory is already certain

📖 That confidence collapses in the next verse

## 📝 My Lust Shall Be Satisfied Upon Them

Lust here is an old word for a strong, greedy desire.

It does not carry the narrower meaning most people think of today.

Egypt's army wanted plunder and revenge, not just victory.

The word captures raw appetite, not a careful military plan.

📝 Lust here means strong, greedy desire

🔍 Not the narrow meaning used today

💰 Egypt wanted both plunder and revenge

📖 This was appetite, not a careful plan

## 🪨 They Sank As Lead In The Mighty Waters

Lead is heavier than the stone already used back in verse five.

The song escalates its own imagery as it builds toward its point.

Egypt boasted about overtaking Israel just one verse earlier.

Instead, Egypt becomes the one who goes straight to the bottom.

🪨 Lead sinks even faster than stone

📈 The imagery escalates as the song builds

🔄 Egypt's boast is reversed in one line

📖 The pursuer becomes the one destroyed

## ❓ Who Is Like Unto Thee, O LORD, Among The Gods?

This is a rhetorical question, not a real search for an answer.

It does not admit that Egypt's gods were actually real and simply weaker.

The point is that no other god could do what just happened at the sea.

Every plague in Egypt had already targeted a specific Egyptian god.

🗣️ A rhetorical question, not a real search

🚫 Does not admit other gods are real

⚡ No other god could do this

📖 The plagues already answered this question

## 😮 Fearful In Praises, Doing Wonders

Fearful here means awe inspiring, not something to be scared of in a bad way.

Wonders means miracles, acts only God could perform.

Praises paired with fearful shows worship and awe belong together.

Israel is not just grateful, they are stunned by what they witnessed.

😮 Fearful means awe inspiring, not scary

🌟 Wonders means acts only God could do

🙌 Worship and awe are paired together

📖 Israel is stunned, not just grateful

# Exodus 15:12-13
# 🛡️ Mercy That Leads And Redeems
---
## 🕳️ The Earth Swallowed Them

This line completes the picture of Egypt's total defeat at the sea.

Stretched out thy right hand shows this happened by God's own action, not chance.

Swallowed pictures the sea and shore closing completely over Egypt's army.

Nothing about this defeat was left partial or open to question.

🕳️ Swallowed pictures total, complete defeat

✋ God's own hand caused this, not chance

🌊 The sea and shore closed completely

📖 Nothing here was left partial

## 🛡️ Thou In Thy Mercy Hast Led Forth

The song shifts here from looking backward to looking forward.

Mercy means God's loyal kindness toward people who did not earn it.

Everything before this line described the battle already won.

From here forward, the song describes the journey still ahead.

🛡️ Mercy means loyal kindness, not earned

🔄 The song shifts from past to future

⚔️ Before this line, the battle was won

📖 After this line, the journey lies ahead

## 💰 Which Thou Hast Redeemed

Redeemed means bought back, a picture borrowed from ancient family life.

A close relative called a kinsman redeemer could buy back land or free a relative.

Israel did not walk out of Egypt on their own strength.

God is described here as the one who paid to bring them out.

💰 Redeemed means bought back, not earned

👨‍👩‍👧 Comes from a kinsman buying back family

🚶 Israel did not escape by their own strength

📖 God is pictured paying the price for them

# Exodus 15:14-16
# 😨 The Nations Tremble
---
## 🗺️ The Inhabitants Of Palestina

Palestina here refers to the Philistines, an ancient people group living along the coast.

It does not refer to the same borders people mean by that name today.

The Philistines become one of Israel's most lasting enemies later in the story.

News of the Red Sea travels fast enough to reach them already.

🗺️ Palestina here means the Philistines

🌍 Not the same borders used today

⚔️ Philistines become a lasting enemy later

📖 News of the Red Sea spreads fast

## 🏔️ The Dukes Of Edom Shall Be Amazed

Dukes here means tribal chiefs, not the modern royal title.

Edom was the nation descended from Esau, Jacob's brother.

This means Israel's own extended family is one of the nations who hears and fears.

News of this victory reaches every neighboring people, not just distant strangers.

🏔️ Dukes means tribal chiefs, not royalty

👨‍👩‍👦 Edom descends from Esau, Jacob's brother

😨 Even relatives fear what they hear

📖 This news reaches every neighboring people

## 🏹 The Mighty Men Of Moab

Moab was the nation descended from Lot, Abraham's nephew.

Trembling here pictures literal physical shaking from fear.

Even Moab's strongest warriors are described as gripped by dread.

Israel has not fought a single battle yet, and enemies are already afraid.

🏹 Moab descends from Lot, Abraham's nephew

😰 Trembling pictures literal physical shaking

💪 Even Moab's strongest men feel dread

📖 Fear arrives before any battle is fought

## 🧊 They Shall Be As Still As A Stone

This echoes the same stone image already used for Egypt back in verse five.

There, a stone pictured Egypt sinking to the bottom of the sea.

Here, a stone pictures the nations frozen, unable to move or interfere.

The same image now describes two very different kinds of stillness.

🧊 This echoes the stone image from verse five

🌊 There, stone pictured Egypt sinking

🧍 Here, stone pictures nations frozen with fear

📖 One image, two very different meanings

## 💵 Which Thou Hast Purchased

Purchased connects directly back to redeemed in verse thirteen.

Both words picture God paying a price to make Israel his own.

This is not a casual rescue, it is ownership language.

Israel belongs to God now because of what he paid to free them.

💵 Purchased echoes redeemed from verse thirteen

🔗 Both words picture God paying a price

🚫 Not a casual rescue, but ownership

📖 Israel belongs to God because of this price

## 🚧 Till Thy People Pass Over

This phrase repeats twice in the same verse for emphasis.

Pass over here pictures Israel's whole journey still ahead, not just the Red Sea.

The fear gripping the nations lasts only as long as Israel is traveling through.

God's people are moving toward a destination, not wandering without direction.

🔁 This phrase repeats for emphasis

🧭 Pass over pictures the journey still ahead

⏳ The nations' fear lasts through that journey

📖 Israel is moving toward a real destination

# Exodus 15:17-18
# 👑 The Promise Of The Sanctuary
---
## 🌱 Plant Them In The Mountain Of Thine Inheritance

Planting pictures permanent, secure settlement, not a temporary stay.

Mountain of thine inheritance points ahead to the land God promised, and later to Jerusalem itself.

A plant puts down roots and stays, unlike a tent that moves each season.

This song looks generations ahead while Israel is still standing at the edge of the sea.

🌱 Planting pictures permanent, secure settlement

⛰️ This points ahead to the promised land

🏕️ A tent moves, but a planted thing stays

📖 This song looks far ahead of the moment

## 🏛️ The Sanctuary, O LORD, Which Thy Hands Have Established

Sanctuary means a set apart place where God's presence dwells.

Israel has no tabernacle yet, and no temple exists for hundreds of years.

Moses sings about this building before a single piece of it is built.

The tabernacle and later the temple will fulfill exactly what this line describes.

🏛️ Sanctuary means a place set apart for God

📆 No tabernacle or temple exists yet

🔮 Moses sings this before it is built

📖 Later history fulfills this exact line

## 👑 The LORD Shall Reign For Ever And Ever

The song builds toward this one line as its highest point.

Reign means to rule as king, with full and lasting authority.

For ever and ever removes any limit on how long that rule lasts.

Every image in the song leads toward this one ending.

👑 Reign means to rule with full authority

⏳ For ever and ever removes any limit

🎵 The whole song builds toward this line

📖 Every earlier image points to this ending

# Exodus 15:19-21
# 🎉 Miriam's Song And Dance
---
## 📝 The Children Of Israel Went On Dry Land

This verse steps out of the song and back into plain narration.

It confirms in plain words what the poem just described.

Pharaoh's horses, chariots, and horsemen all went into the sea.

Israel walked through on dry ground the entire time.

📝 This steps back into plain narration

✅ It confirms what the poem just sang

🐎 Pharaoh's whole cavalry went into the sea

📖 Israel walked through on dry ground

## 📣 Miriam The Prophetess, The Sister Of Aaron

Miriam is the first woman in the Bible directly called a prophetess.

A prophetess speaks for God, the same role a prophet holds.

She is identified here by her own name and her own title, not only as a relative.

Her leadership in this moment is treated as real and significant.

📣 First woman in the Bible called prophetess

🗣️ A prophetess speaks for God, like a prophet

👩 She is named for her own role here

📖 Her leadership is treated as significant

## 🥁 Took A Timbrel In Her Hand

A timbrel was a small hand drum, close to a modern tambourine.

Miriam leads the women of Israel out in celebration.

Dancing here is not a side detail, it is full bodied worship.

This kind of praise involves the whole body, not just quiet words.

🥁 A timbrel was a small hand drum

💃 Miriam leads the women out in celebration

🙌 Dancing here is full bodied worship

📖 Praise here involves more than quiet words

## 🎶 Miriam Answered Them

Answered here pictures a back and forth, not a solo performance.

Miriam's line matches the opening line Moses already sang in verse one.

This shows the celebration belonged to the whole camp, not one leader alone.

Worship moves between voices here, not from a single leader.

🎶 Answered pictures a back and forth song

🔁 Her line echoes Moses from verse one

👥 The celebration belongs to the whole camp

📖 Worship moves between voices, not one leader

## 🎤 Sing Ye To The LORD, For He Hath Triumphed Gloriously

This is the exact refrain Moses sang all the way back in verse one.

Miriam's song bookends the whole poem with its opening image.

Repeating a refrain was a common structure in ancient song and poetry.

The whole celebration circles back to Egypt's army lost at sea.

🎤 The same refrain Moses sang in verse one

📚 Refrains were common in ancient song structure

🌊 The whole song circles back to this image

📖 Egypt's defeat stays the central image

# Exodus 15:22-24
# 🏜️ Bitter Water At Marah
---
## 🏜️ The Wilderness Of Shur

Shur was a wilderness region along Egypt's eastern border.

Israel leaves the celebration at the sea and walks straight into a harsh, dry landscape.

This sat at the edge of the ancient trade routes leading out of Egypt.

The change from sea to desert happens almost immediately.

🏜️ Shur was a wilderness on Egypt's border

🚶 Israel walks straight from celebration into hardship

🗺️ Sat at the edge of Egypt's trade routes

📖 The change in scene happens almost instantly

## 💧 Three Days In The Wilderness, And Found No Water

Three days without water in a desert is a real, dangerous crisis.

This happens only days after the greatest miracle Israel has ever witnessed.

A miracle at the sea did not remove every future hardship.

Real need can show up almost right after real celebration.

💧 Three days without water is a real crisis

📆 This comes right after the Red Sea miracle

⚠️ One miracle did not remove future hardship

📖 Real need can follow real celebration quickly

## 😖 The Waters Of Marah, For They Were Bitter

Marah is a Hebrew word that means bitter.

The place gets its name directly from this undrinkable water.

Israel can see water after three dry days, but still cannot drink it.

Relief looked close, but it was not relief at all yet.

📛 Marah means bitter in Hebrew

💧 The place is named for this water

👀 Water was visible but still undrinkable

📖 Relief looked close but was not there yet

## 😠 The People Murmured Against Moses

Murmured means to complain persistently and bitterly, not a single quiet remark.

This becomes a repeated pattern through the rest of Israel's wilderness years.

Real thirst produces real doubt, even days after the Red Sea.

Witnessing a miracle firsthand did not stop this complaint from coming.

😠 Murmured means bitter, repeated complaining

🔁 This pattern repeats through the wilderness years

💧 Real thirst produced real doubt quickly

📖 Even a recent miracle did not prevent it

## ❓ What Shall We Drink?

This is a real, practical question, not just an emotional outburst.

Moses has no water source of his own to offer them.

The question puts the crisis directly back on Moses' leadership.

It sets up exactly what happens in the very next verse.

❓ A real, practical question about survival

🙋 Moses has no water source of his own

⚖️ The crisis lands on his leadership

📖 This sets up the next verse directly

# Exodus 15:25-27
# 🌳 The Tree, The Statute, And Elim
---
## 🌳 The LORD Shewed Him A Tree

Shewed is an old spelling of showed.

God points Moses to a specific tree as the answer to the crisis.

The Bible does not name what kind of tree it was.

The provision meets a real, physical need, not just a spiritual one.

📝 Shewed is an old spelling of showed

🌳 God points Moses to a specific tree

❓ The Bible does not name the tree

📖 This meets a real, physical need

## ✨ The Waters Were Made Sweet

Sweet here simply means drinkable, the opposite of the bitter water from Marah.

Moses does something small, casting a tree into the water, and God does the rest.

This is the second water related miracle since Israel left Egypt.

The pattern already forming is that God provides exactly what the moment requires.

✨ Sweet here means drinkable, not sugary

🌊 Moses acts small, God does the rest

🔁 The second water miracle since leaving Egypt

📖 God provides exactly what the moment needs

## ⚖️ There He Made For Them A Statute And An Ordinance

Statute and ordinance both mean a binding rule or command.

This happens before the law is given at Mount Sinai later in Exodus.

Israel is already being shaped by rules and expectations this early in the journey.

Law and provision arrive together here, not as separate topics.

⚖️ Statute and ordinance mean binding rules

📆 This comes before the law at Sinai

📜 Rules shape Israel already, this early

📖 Provision and law arrive together here

## 🔍 There He Proved Them

Proved here means tested, not proved in the modern sense of demonstrated.

The test is not random, it follows right after this new statute is given.

This begins a pattern that defines much of Israel's time in the wilderness.

God provides, then asks whether his people will actually obey.

🔍 Proved means tested, not demonstrated

📏 The test follows right after the statute

🔁 This pattern defines the wilderness years ahead

📖 God provides, then waits to see obedience

## 💊 I Am The LORD That Healeth Thee

This is a new title for God, tied directly to obedience and health.

Healeth means the one who heals, a description of God's own character.

The diseases named here point back to the plagues Egypt suffered.

Obedience is connected here to protection, not just to being a good person.

💊 Healeth means the one who heals

📛 A new title for God appears here

🐛 The diseases recall the plagues on Egypt

📖 Obedience is tied here to protection

## 🌴 Twelve Wells Of Water, And Threescore And Ten Palm Trees

Threescore means sixty, so seventy palm trees stood at this location.

Twelve wells lines up with Israel's twelve tribes, one source for each.

Elim arrives right after the hardship at Marah, real relief after real testing.

The wilderness is not only a place of thirst, it also holds real provision.

🔢 Threescore means sixty, so seventy trees total

🏕️ Twelve wells match Israel's twelve tribes

🌴 Elim brings relief right after Marah

📖 The wilderness holds provision, not only thirst
`.trim();

export const EXODUS_FIFTEEN_PERSONAL_SECTIONS = parseExodusFifteenRawNotes(EXODUS_FIFTEEN_RAW_NOTES);
