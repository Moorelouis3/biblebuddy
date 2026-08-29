export type NehemiahNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahNineRawNotes(rawText: string): NehemiahNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 9:${startVerse}` : `Nehemiah 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Nehemiah 9 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_NINE_RAW_NOTES = `
# Nehemiah 9:1-3
# 😢 Fasting And Confession Begin
---
## 📅 The Twenty And Fourth Day Of This Month

The Feast of Tabernacles from chapter eight had just ended two days earlier.

That feast was a week of joy, eating, and thanking God for the harvest.

Now the mood shifts completely, from celebration to mourning over sin.

The people did not wait long to turn from joy to repentance.

📅 Chapter eight's feast just ended

🔄 Joy turns to mourning fast

⏳ Only two days had passed

📖 Repentance followed celebration quickly

## 👕 With Sackclothes, And Earth Upon Them

"Sackclothes" means rough, scratchy clothing worn only to show deep sorrow.

It was made from coarse goat hair, never worn for comfort.

"Earth upon them" means they put dirt or ashes on their own heads.

Both actions matched the body to the grief felt inside.

👕 Sackclothes means rough grieving clothing

🐐 Made from coarse goat hair

🌍 Earth means dirt or ashes

📖 The body matched the sorrow

## 🚫 Separated Themselves From All Strangers

"Strangers" here means people from other nations who did not worship the LORD.

This echoes the reforms Ezra had already pushed for years earlier.

The point was not hatred of foreigners as people.

It was refusing to keep copying the practices that had once led Israel into idolatry.

🚫 Strangers means non Israelite worshippers

🔁 This echoes Ezra's earlier reform

⚠️ The goal was avoiding old idolatry

📖 Worship, not ethnicity, was the line

## 📖 Read In The Book Of The Law One Fourth Part Of The Day

A full day in that culture ran about twelve hours from sunrise to sunset.

One fourth of that is about three hours of straight reading.

The people stood and listened to scripture for hours without complaint.

That kind of sustained attention shows how seriously they treated this moment.

⏳ One fourth of a day means hours

📖 The law was read for hours

👂 The people listened the whole time

➡️ Their attention shows real seriousness

## 🙏 Another Fourth Part They Confessed, And Worshipped

The pattern here matters as much as the words.

First they listened to what God's law actually said.

Only after hearing it did they confess and worship in response.

Real repentance starts with hearing the truth, not just feeling sorry.

🙏 Confession followed hearing the law

👂 Listening came before responding

🔄 Hearing, then confessing, then worship

📖 Truth heard shapes true repentance

# Nehemiah 9:4-5
# 🎤 The Levites Lead The Cry
---
## 🪜 Stood Up Upon The Stairs

These were the raised wooden stairs built for the platform described back in chapter eight.

Standing up high let a leader's voice reach the whole crowd without shouting.

The same structure used to read the law is now used to lead confession.

🪜 The stairs come from chapter eight

📣 Height helped a voice carry far

🔁 One structure served two purposes

📖 Reading and confessing shared one platform

## 📛 Jeshua, And Bani, Kadmiel, Shebaniah, Bunni, Sherebiah, Bani, And Chenani

This is a list of Levite leaders naming who actually led the prayer.

The name Bani appears twice in this list, likely marking two different men or two branches of one family.

Recording exact names mattered in this culture as a form of honor and record keeping.

Nothing about this worship service was anonymous.

📛 Named Levites led this moment

🔁 Bani appears twice in the list

📜 Naming names was a form of honor

📖 Worship here was not anonymous

## 📣 Cried With A Loud Voice Unto The LORD Their God

This was not a quiet, private prayer.

It was a loud, public cry meant for the whole assembly to hear and join.

Confession this size needed a voice big enough to carry the weight of the moment.

📣 The cry was loud and public

👥 Meant for the whole assembly

⚖️ The moment matched the volume

📖 Public sin called for public confession

## 🙌 Stand Up And Bless The LORD Your God For Ever And Ever

This phrase opens the long prayer that fills the rest of the chapter.

"Bless the LORD" means speaking well of God and praising who He is.

"For ever and ever" sets the tone before a single line of history is even told.

Praise comes first, before the hard parts of the story are named.

🙌 This opens the long prayer

🗣️ Bless means speaking well of God

⏳ For ever and ever sets the tone

📖 Praise comes before the hard history

## ✨ Thy Glorious Name, Which Is Exalted Above All Blessing And Praise

The Levites say God's reputation is bigger than any words used to describe it.

No amount of human praise could ever fully measure up to who God actually is.

This line sets a ceiling that the rest of the prayer never tries to reach past.

✨ God's name outranks all praise

📏 No words fully measure God

🚫 Human praise has a real limit

📖 The prayer bows before it even starts

# Nehemiah 9:6
# 🌌 Thou Art LORD Alone
---
## ☝️ Thou, Even Thou, Art LORD Alone

The prayer opens its history lesson by naming God as the only true God first.

This was a direct rejection of every other nation's many gods.

Everything that follows in this chapter rests on that one claim.

☝️ God alone is named LORD

🚫 Every other god is rejected

🏛️ This claim opens the whole prayer

📖 History only makes sense under one God

## 🌠 Made Heaven, The Heaven Of Heavens, With All Their Host

"Heaven of heavens" is a Hebrew way of saying the highest, most complete heaven that exists.

"Host" here means the sun, moon, and stars, pictured like a vast army.

Nations around Israel worshipped the sun and stars as gods themselves.

This line insists they are creations, not deities to bow to.

🌠 Heaven of heavens means the highest heaven

⭐ Host means the sun, moon, stars

🙅 Neighboring nations worshipped these as gods

📖 Scripture calls them creations instead

## 🛡️ Thou Preservest Them All

Creation was not a one time act that God then walked away from.

"Preservest" means God actively keeps everything running, moment by moment.

The sun still rises because God still holds it in place.

🛡️ Preservest means actively sustaining

🌅 God did not just start creation

⏳ He keeps it running every moment

📖 Nothing exists apart from His care

## 🎶 The Host Of Heaven Worshippeth Thee

The very things some nations wrongly worshipped are shown here worshipping the true God instead.

The sun, moon, and stars are pictured as creatures bowing to their maker.

That image quietly corrects the whole error of star worship in one line.

🎶 The stars are shown worshipping God

🔄 This corrects star worship directly

👑 Creation bows to its maker

📖 Even the sky points back to God

# Nehemiah 9:7-8
# 🕊️ God Chooses Abram
---
## ✋ Who Didst Choose Abram

Out of every family on earth, God is remembered here as the one who selected Abram specifically.

This was not Abram earning the choice through some achievement.

The whole story of Israel starts with an act of God's own choosing.

✋ God chose Abram specifically

🚫 Not earned by Abram's own merit

🌍 Chosen out of every family on earth

📖 Israel's story begins with God's choice

## 🏺 Broughtest Him Forth Out Of Ur Of The Chaldees

"Ur of the Chaldees" was a real, advanced city in ancient Mesopotamia, near the Persian Gulf.

People there worshipped the moon god as their chief deity.

God called Abram out of that city and away from its false worship completely.

🏺 Ur was a real Mesopotamian city

🌙 Its people worshipped a moon god

🚶 God called Abram away from it

📖 The call meant leaving false worship behind

## 🔤 Gavest Him The Name Of Abraham

Abram's original name meant "exalted father."

God later changed it to Abraham, meaning "father of many nations."

The name change itself was a promise, spoken before Abraham had any of those descendants yet.

🔤 Abram meant exalted father

🌍 Abraham means father of many nations

⏳ The promise came before the proof

📖 God's names carry His promises

## 💛 Foundest His Heart Faithful Before Thee

This line credits Abraham's loyalty to God, not his perfection.

Abraham still made real mistakes across his life, including lying about Sarah more than once.

Faithful here means consistently trusting, not flawless.

💛 Faithful means consistently trusting

⚠️ Abraham still made real mistakes

🎯 God valued the trust, not perfection

📖 Faithfulness does not require flawlessness

## 🗺️ To Give The Land Of The Canaanites, The Hittites, The Amorites, And The Perizzites, And The Jebusites, And The Girgashites

These six names list the nations already living in the land God promised to Abraham's descendants.

Each was a distinct people group with its own cities, kings, and gods.

Naming them all shows the promise was specific, not a vague blessing.

🗺️ Six named nations already lived there

👑 Each had its own cities and kings

🎯 The promise named a specific land

📖 God's promises are exact, not vague

## ⚖️ For Thou Art Righteous

After telling the whole story of the promise, the prayer pauses to affirm God's character.

Everything God did with Abraham, He did rightly, not on a whim.

This short line closes the Abraham section before moving into Egypt.

⚖️ God is declared righteous here

🎯 His actions with Abraham were right

🔚 This closes the Abraham section

📖 Righteousness anchors every promise made

# Nehemiah 9:9-12
# 🌊 Deliverance From Egypt
---
## 😢 Didst See The Affliction Of Our Fathers In Egypt

"Affliction" means the harsh forced labor and cruelty Israel suffered as slaves.

The prayer states plainly that God saw this suffering firsthand.

He was never a distant observer to what His people endured.

😢 Affliction means harsh forced slavery

👁️ God saw the suffering directly

🚫 He was not a distant observer

📖 Suffering did not go unseen

## 👂 Heardest Their Cry By The Red Sea

This points back to Israel trapped between Pharaoh's army and the sea, crying out in fear.

That moment felt like a dead end with no way out.

God heard the cry at the exact point it seemed most hopeless.

👂 Israel cried out at the sea

🚧 They were trapped with no way out

⏳ God heard at the worst moment

📖 Hopeless moments still reach God's ears

## ⚡ Shewedst Signs And Wonders Upon Pharaoh

"Signs and wonders" refers to the ten plagues that struck Egypt before the exodus.

Each plague targeted something Egypt worshipped, like the Nile River or the sun.

These were not random disasters, but a direct confrontation with Egypt's false gods.

⚡ Signs and wonders means the ten plagues

🌊 Each plague struck an Egyptian god

⚔️ This was a direct confrontation

📖 God defeated Egypt's gods one by one

## 👑 Thou Knewest That They Dealt Proudly Against Them

God is described here as fully aware of Pharaoh's arrogant refusal to let Israel go.

Pharaoh kept hardening his own heart even as plague after plague struck his land.

Pride, not ignorance, kept Pharaoh fighting a battle he could not win.

👑 Pharaoh's pride is named directly

🔁 He hardened his heart repeatedly

⚔️ Pride, not ignorance, drove his refusal

📖 Pride fights battles it cannot win

## 🌊 Thou Didst Divide The Sea Before Them

This recalls the Red Sea splitting to let Israel cross on dry ground.

Walking through walls of water on a dry path was an experience no one there would ever forget.

The same sea that trapped them became the road that saved them.

🌊 The sea split into two walls

🚶 Israel crossed on completely dry ground

🔄 A trap became their escape route

📖 God turned danger into deliverance

## 🪨 Their Persecutors Thou Threwest Into The Deeps, As A Stone Into The Mighty Waters

Egypt's chasing army followed Israel into the same sea path and drowned when the water returned.

The comparison to a stone paints a picture of how completely and quickly they sank.

There was no struggle, no escape, once the water closed back in.

🪨 Compared to a stone sinking fast

🌊 Egypt's army drowned in the sea

⚡ The water closed in completely

📖 God's judgment matched His deliverance

## ☁️ Leddest Them In The Day By A Cloudy Pillar

This "pillar" was a visible column that showed God's presence and guidance in the wilderness.

By day it appeared as cloud, giving shade from the desert heat.

Israel never had to guess which direction to travel.

☁️ The pillar showed God's guidance

🌤️ By day it gave shade as cloud

🧭 Israel never had to guess direction

📖 God's presence was visible, not hidden

## 🔥 In The Night By A Pillar Of Fire, To Give Them Light

The same pillar changed appearance at night, glowing like fire to light the camp.

Fire also provided a sense of warmth and safety through the cold desert nights.

One presence covered every hour of the journey, day and night alike.

🔥 By night it lit up like fire

🌙 It gave light through the dark

🛡️ One presence covered day and night

📖 God's guidance never took a break

# Nehemiah 9:13-15
# ⛰️ Sinai And Provision
---
## ⛰️ Camest Down Also Upon Mount Sinai

This recalls the moment God's presence visibly came down on the mountain to meet with Israel.

Exodus describes this scene with thunder, smoke, and fire covering the mountain.

God did not stay distant while giving His law.

He came close enough for the people to see and tremble.

⛰️ God's presence came down visibly

⚡ Thunder, smoke, and fire covered it

😨 The people saw and trembled

📖 God drew close to give His law

## 📜 Gavest Them Right Judgments, And True Laws, Good Statutes And Commandments

Four different words stack up here to describe the law God gave at Sinai.

Each word emphasizes that the law was fair, honest, and genuinely good for the people.

This was not a harsh list of rules for its own sake.

📜 Four words describe one good law

⚖️ The law was fair and honest

💚 It was meant for their good

📖 God's rules were never arbitrary

## 🛌 Madest Known Unto Them Thy Holy Sabbath

The Sabbath was a weekly day of rest, set apart before this from the surrounding nations' constant labor.

No other ancient culture nearby built in a guaranteed day of rest like this.

It taught Israel that their worth was not measured only by their work.

🛌 Sabbath means a set apart rest day

🌍 No neighboring culture had this rule

💛 Worth was not just about labor

📖 Rest itself became a form of worship

## 🍞 Gavest Them Bread From Heaven For Their Hunger

This "bread from heaven" refers to manna, the flaky food that appeared on the ground each morning.

Israel had no farms or stored food while wandering through the wilderness.

God provided a daily meal with no harvest required.

🍞 Bread from heaven means manna

🏜️ Israel had no farms in the desert

📅 Provision came fresh, one day at a time

📖 God fed them without a harvest

## 💧 Broughtest Forth Water For Them Out Of The Rock For Their Thirst

This recalls Moses striking a rock and water pouring out for the whole camp to drink.

A dry, solid rock producing enough water for a huge traveling nation was clearly beyond nature.

Thirst in the desert could kill quickly without a real answer.

💧 Water poured out from solid rock

🏜️ The desert offered no natural source

⚡ This went beyond ordinary nature

📖 God met their most urgent need

## 🗺️ Promisedst Them That They Should Go In To Possess The Land

Even while still wandering with nothing, Israel already carried a promise of a future home.

The land was not something they earned by wandering well.

It was a gift already promised long before they ever arrived.

🗺️ A land was promised in advance

🎁 The land was a gift, not a wage

⏳ The promise came before the arrival

📖 Hope was given before the reward

# Nehemiah 9:16-18
# 🐂 Rebellion And The Golden Calf
---
## 😤 Dealt Proudly, And Hardened Their Necks

"Hardened their necks" is an old picture of an ox refusing to bend under its yoke.

It describes a stubborn refusal to be led, even by someone who has proven trustworthy.

Israel is compared here to an animal that will not cooperate with its owner.

😤 Hardened necks pictures a stubborn ox

🐂 An ox refusing its own yoke

🚫 They refused to be led

📖 Stubbornness rejects even proven guidance

## 🙅 Refused To Obey, Neither Were Mindful Of Thy Wonders

Despite everything they had just watched God do, from plagues to the parted sea, they still refused Him.

"Mindful" means keeping something in memory and letting it shape your choices.

They had the memory available and simply chose not to use it.

🙅 They refused despite seeing wonders

🧠 Mindful means remembering on purpose

🚫 They had memory but ignored it

📖 Seeing miracles does not guarantee obedience

## 🔙 In Their Rebellion Appointed A Captain To Return To Their Bondage

This recalls the people wanting to pick a new leader and go back to slavery in Egypt.

Freedom in the wilderness felt harder than the familiar misery of slavery.

Choosing to return would have undone everything God had just done for them.

🔙 They wanted to return to Egypt

⛓️ Familiar slavery felt easier than freedom

🚫 This would undo God's rescue

📖 Fear can make bondage look safe

## 💛 Thou Art A God Ready To Pardon, Gracious And Merciful, Slow To Anger, And Of Great Kindness

This string of words is one of the fullest descriptions of God's character in all of scripture.

It closely echoes what God told Moses about Himself back at Sinai.

Every rebellion in this story gets met with a God already described as ready to forgive.

💛 One of scripture's fullest descriptions of God

🔁 It echoes what God told Moses

🤝 Ready to pardon comes before the failure

📖 Mercy is named before it is needed

## 🐂 Made Them A Molten Calf

This is the golden calf incident, where Israel melted jewelry into an idol shaped like a young bull.

Bull imagery was common in Egyptian worship, showing old habits had not fully left them.

They credited a lifeless statue with the very rescue God had just accomplished.

🐂 A molten calf means an idol bull

🇪🇬 Bull worship echoed Egyptian religion

🙅 A statue got credit for God's work

📖 Old habits followed them out of Egypt

## 🤝 Forsookest Them Not

Even after the golden calf, God did not walk away from His people.

"Forsookest" means abandoned or left behind completely.

The prayer keeps returning to this same pattern of failure followed by continued mercy.

🤝 Forsookest means completely abandoned

🐂 This follows right after the calf

🔁 Failure met with continued mercy

📖 God stayed even after the worst failure

# Nehemiah 9:19-21
# 🌥️ Mercy In The Wilderness
---
## 🌥️ Yet Thou In Thy Manifold Mercies Forsookest Them Not In The Wilderness

"Manifold" means many and varied, not just one single act of kindness.

The prayer stacks up example after example of mercy shown across forty years.

Even after the golden calf, the guidance and provision never simply stopped.

🌥️ Manifold means many different kinds

📆 Mercy continued across forty years

🐂 Even after the golden calf failure

📖 One failure did not end the mercy

## 👍 Thou Gavest Also Thy Good Spirit To Instruct Them

God's own Spirit is credited here with teaching the people, not just Moses alone.

"Instruct" means active teaching, not distant observation.

Guidance in the wilderness came from God Himself working directly among them.

👍 God's Spirit is credited with teaching

📚 Instruct means active, hands on teaching

🚫 This was not distant observation

📖 God taught them directly, not from afar

## 🍽️ Withheldest Not Thy Manna From Their Mouth, And Gavest Them Water For Their Thirst

Both daily needs, food and water, are named together here as continuous gifts.

"Withheldest not" means God never once cut off the supply out of anger.

Even during years of complaining and rebellion, the provisions kept coming.

🍽️ Manna and water named together

🚫 Withheldest not means never cut off

😤 Even during years of complaining

📖 Provision continued despite the rebellion

## 👗 Forty Years Didst Thou Sustain Them In The Wilderness

Forty years covers an entire generation living without permanent homes or farms.

"Sustain" means to keep someone going, not just barely surviving.

The math alone shows this was long term, ongoing care, not a quick rescue.

👗 Forty years spans a whole generation

🏕️ No permanent homes or farms existed

⏳ Sustain means ongoing, not one time care

📖 This was decades of faithful provision

## 👣 Their Clothes Waxed Not Old, And Their Feet Swelled Not

"Waxed not old" means their clothing did not wear out despite decades of use.

Feet normally swell painfully from that much walking without proper rest or care.

Both details describe provision beyond what normal wear and tear should allow.

👣 Clothes did not wear out

🦶 Feet did not swell from walking

⚡ Both go beyond normal wear and tear

📖 Even small daily needs were covered

# Nehemiah 9:22-25
# 🏞️ Possessing The Land
---
## 👑 Gavest Them Kingdoms And Nations, And Didst Divide Them Into Corners

This describes Israel defeating established kingdoms, not just settling empty land.

"Corners" pictures the land being carefully divided up piece by piece among the tribes.

Nothing about this conquest happened randomly or by accident.

👑 Real kingdoms were defeated, not empty land

🗺️ Corners pictures careful land division

🎯 Nothing about this was random

📖 God's plan reached every detail

## ⚔️ So They Possessed The Land Of Sihon, And The Land Of The King Of Heshbon, And The Land Of Og King Of Bashan

Sihon and Og were two specific kings who ruled land east of the Jordan River.

Naming them by name, not just as generic enemies, shows real historical memory.

These victories happened before Israel ever crossed into the promised land itself.

⚔️ Sihon and Og were real named kings

🗺️ Their lands sat east of the Jordan

📜 Real names show real historical memory

📖 Victories came before crossing the Jordan

## ⭐ Their Children Also Multipliedst Thou As The Stars Of Heaven

This directly recalls God's ancient promise to Abraham about descendants too many to count.

Generations later, that exact promise had visibly come true.

The prayer points back to Abraham's story on purpose here.

⭐ This recalls Abraham's ancient promise

📈 The population had visibly grown huge

🔁 The prayer points back on purpose

📖 A promise made good, generations later

## 🏙️ Took Strong Cities, And A Fat Land

"Fat" here is an old word meaning rich, fertile, and productive, not a description of size.

Israel inherited cities and farmland that were already built and thriving.

They did not have to start entirely from nothing.

🏙️ Fat means rich and fertile

🏗️ Cities and farms already existed

🎁 Israel inherited, not just built

📖 Blessing included ready made provision

## 🍇 Wells Digged, Vineyards, And Oliveyards, And Fruit Trees In Abundance

This list names specific infrastructure, water sources, and food crops already in place when Israel arrived.

Digging a well by hand in that era took real time and labor.

Israel walked into decades of someone else's hard work already finished.

🍇 A list of ready made provisions

⛏️ Wells took real labor to dig

🚶 Israel inherited finished, not started, work

📖 They ate what they never planted

# Nehemiah 9:26-31
# 🔄 The Cycle Of Rebellion And Rescue
---
## 📚 Cast Thy Law Behind Their Backs, And Slew Thy Prophets

"Cast behind their backs" is an old picture for deliberately ignoring something important.

It is not forgetting by accident, but choosing to turn away on purpose.

Killing the prophets who warned them shows how far that ignoring eventually went.

📚 Casting behind means deliberate ignoring

🚫 Not an accident, but a choice

⚔️ Prophets were killed for the warnings

📖 Ignored truth can turn violent

## ⚔️ Thou Deliveredst Them Into The Hand Of Their Enemies

This describes the period of the judges, when Israel's own sin left them open to attack.

God did not force the disaster directly with His own hand.

He allowed the natural consequence of turning away from His protection.

⚔️ This matches the era of judges

🚫 God did not force it directly

🔓 Sin removed their own protection

📖 Consequences can flow from freedom, not force

## 🦸 Gavest Them Saviours, Who Saved Them Out Of The Hand Of Their Enemies

"Saviours" here refers to the judges, leaders like Gideon and Deborah raised up to rescue Israel.

Each time the people cried out, help came from an unexpected, ordinary person.

The pattern in Judges repeats again and again across generations.

🦸 Saviours means judges like Gideon

😢 Rescue came after they cried out

🔁 This pattern repeats through Judges

📖 Help often rose from ordinary people

## 🔁 Did Evil Again Before Thee

This one short line summarizes the entire repeating cycle found in the book of Judges.

Rescue was followed by relief, and relief was too often followed by forgetting.

The cycle kept turning across many generations, not just once.

🔁 This sums up the whole Judges cycle

😌 Relief too often led to forgetting

📆 The cycle repeated many generations

📖 One rescue rarely broke the pattern

## 👐 Withdrew The Shoulder, And Hardened Their Neck

This picture returns to an ox again, this time pulling its shoulder away from the yoke entirely.

It describes flatly refusing correction, not just struggling under it.

The image makes stubbornness easy to picture, even for a modern reader.

👐 Withdrawing the shoulder pictures an ox again

🚫 This means flatly refusing correction

🐂 The animal image returns here

📖 Stubbornness resists even gentle guidance

## ⏳ Many Years Didst Thou Forbear Them

"Forbear" means holding back deserved judgment out of patience, not weakness.

This patience lasted years, not days or weeks.

The delay in judgment was itself an act of mercy, giving room to turn back.

⏳ Forbear means patiently holding back judgment

📆 This patience lasted many years

🤝 Delay was itself an act of mercy

📖 Patience gave room to turn back

## 🏹 Gavest Thou Them Into The Hand Of The People Of The Lands

This points ahead to the exile, when Israel was eventually conquered and scattered.

Patience had limits, and the warnings finally became reality.

This is the darkest turn in the whole historical review.

🏹 This points ahead to the exile

⏳ Patience finally reached its limit

⚠️ Warnings became a real reality

📖 The darkest turn in the story

## 💛 For Thy Great Mercies' Sake Thou Didst Not Utterly Consume Them

Even at the lowest point of exile, total destruction never actually happened.

"Utterly consume" would mean wiping the nation out completely, with nothing left.

Mercy, not Israel's own effort, is credited as the reason they survived at all.

💛 Total destruction never actually happened

🚫 Utterly consume means wiped out completely

🎁 Mercy, not effort, gets the credit

📖 Survival itself was a gift of mercy

# Nehemiah 9:32-37
# 😔 A Prayer In Present Distress
---
## 👑 The Great, The Mighty, And The Terrible God

Three separate titles stack up here to describe God's overwhelming power.

"Terrible" in this old usage means awe inspiring and fearsome, not flawed or bad.

The prayer reaches for God's biggest names right before naming its hardest request.

👑 Three titles stack up together

😨 Terrible means awe inspiring here

🙏 Big names come before a hard request

📖 Weighty prayers reach for God's full power

## 🙏 Let Not All The Trouble Seem Little Before Thee

This is a direct plea asking God to actually notice their current suffering.

It is an honest fear that hardship might somehow look small from God's perspective.

Naming that fear out loud is itself an act of trust, not doubt.

🙏 A direct plea to be noticed

😟 Fear that suffering looks small to God

💬 Naming fear honestly is still trust

📖 Honest prayer includes honest worry

## 📆 Since The Time Of The Kings Of Assyria Unto This Day

This marks a long historical span, from Assyria's rise centuries earlier down to Nehemiah's own moment.

Assyria was the empire that first conquered the northern kingdom of Israel.

The prayer is tracing one long, connected story of hardship, not a single recent event.

📆 A span of many centuries is named

🏛️ Assyria conquered the northern kingdom first

🔗 Hardship traced as one long story

📖 Present suffering has a long history

## ⚖️ Thou Art Just In All That Is Brought Upon Us

Even while describing real suffering, the prayer refuses to accuse God of unfairness.

"Just" means acting rightly, even when the outcome is hard.

This is a striking move, taking responsibility instead of shifting blame upward.

⚖️ Just means acting rightly, even in judgment

🙅 God is not accused of unfairness

💪 The prayer takes responsibility instead

📖 Owning fault is stronger than blaming

## 🏙️ In The Large And Fat Land Which Thou Gavest Before Them

The prayer circles back to the good land already described earlier in verse twenty five.

Bringing it up again highlights the contrast between the blessing given and the ingratitude shown.

A gift this large makes the later disobedience even harder to excuse.

🏙️ This recalls the good land from earlier

⚖️ It highlights blessing versus ingratitude

🎁 A large gift makes disobedience worse

📖 Bigger blessings raise the bar for gratitude

## ⛓️ Behold, We Are Servants This Day

This is a stunning admission, standing on land God promised as free, yet living under foreign rule.

The word servants here means being subject to another nation's control and taxes.

The promised freedom has not fully arrived, even generations after returning from exile.

⛓️ Servants means living under foreign control

🗺️ This happens on the promised land itself

⏳ Freedom has not fully arrived yet

📖 A promise fulfilled only in part

## 💰 It Yieldeth Much Increase Unto The Kings Whom Thou Hast Set Over Us

The good harvests from this fertile land are being paid out as tribute to foreign rulers.

"Increase" means the crops and produce the land naturally produces.

The land's own blessing is being taken by someone else's hand.

💰 Increase means crops and produce

👑 Harvests go to foreign kings instead

🎁 Their own blessing is taken away

📖 Even good land can feel like a burden

## 😔 We Are In Great Distress

The long prayer closes its historical review on this raw, honest note.

There is no forced happy ending tacked on here.

The people simply name their real pain and leave it before God.

😔 The review ends on raw honesty

🚫 No forced happy ending is added

🙏 Real pain is named plainly

📖 Honest prayer does not have to resolve neatly

# Nehemiah 9:38
# 📜 The Sure Covenant
---
## ✍️ We Make A Sure Covenant, And Write It

After all the history and honest confession, the people respond with a formal, written commitment.

A "covenant" here means a binding promise, not just a passing feeling.

Writing it down made the commitment lasting and impossible to quietly forget later.

✍️ A covenant means a binding promise

📖 It followed history and honest confession

📝 Writing made it lasting, not fleeting

➡️ Real repentance led to real commitment

## 🔏 Our Princes, Levites, And Priests, Seal Unto It

"Seal" means physically marking a document to make it official and binding, much like a signature today.

Naming these specific groups shows leaders at every level stood behind this commitment together.

This chapter's long list of names continues right to its final line.

🔏 Seal means making it official

👥 Leaders at every level signed on

📜 Named leadership continues to the end

📖 The whole nation stood behind this promise





`.trim();

export const NEHEMIAH_NINE_PERSONAL_SECTIONS = parseNehemiahNineRawNotes(NEHEMIAH_NINE_RAW_NOTES);
