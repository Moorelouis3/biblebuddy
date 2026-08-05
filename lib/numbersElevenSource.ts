export type NumbersElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersElevenRawNotes(rawText: string): NumbersElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 11:${startVerse}` : `Numbers 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 11 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_ELEVEN_RAW_NOTES = `# Numbers 11:1-3
# 🔥 Fire At Taberah
---
## 🔥 It Displeased The Lord

"Complained" means grumbling under the breath, not asking a clear question.

The same word describes Israel's complaints back in Exodus, right after they left Egypt.

This time it happens after nearly a year of receiving God's law at Sinai.

Old habits return the moment the journey starts moving again.

😤 Complained means grumbling, not a clear request

🕰️ Comes after a year of law at Sinai

🔁 The same pattern already seen in Exodus

➡️ Old habits return once the journey restarts

## 🔥 The Uttermost Parts Of The Camp

The fire did not strike the whole camp at once.

It hit the outer edges first, the parts farthest from the tabernacle.

The tabernacle sat at the center of the camp, closest to God's presence.

A crowd of non Israelites likely camped near those outer edges.

They are named a few verses later as the ones who start the next complaint.

🔥 A targeted judgment, not a random one

📍 Hit the edges, farthest from the tabernacle

⛺ The tabernacle sat at the center

➡️ That crowd starts the next complaint

## 🙏 When Moses Prayed Unto The Lord

The people panic and run straight to Moses.

Moses prays to the Lord on their behalf, and the fire stops.

This same rescue pattern already showed up during the plagues in Egypt.

It keeps repeating through the rest of the wilderness years.

😭 The people panic and run to Moses

🙏 Moses prays and the fire stops

🔁 The same pattern from the plagues in Egypt

📖 Moses keeps standing between the people and God

## 🗺️ He Called The Name Of The Place Taberah

"Taberah" means burning in Hebrew.

Naming a place after what happened there is a habit that repeats through the wilderness years.

Massah and Meribah in Exodus 17 are two more examples of that same habit.

The name becomes a permanent marker.

Anyone who hears it again remembers exactly what happened here.

🔥 Taberah means burning in Hebrew

🗺️ Places get named after events, not geography

📜 Massah and Meribah work the same way

📖 The name keeps the memory alive

# Numbers 11:4-9
# 🥒 Craving The Food Of Egypt
---
## 🚶 The Mixt Multitude

This phrase names a group of non Israelites who left Egypt together with Israel.

They were not part of the covenant people by birth.

They still traveled along with everyone else in the Exodus.

Exodus 12 already calls this same group a mixed multitude at the actual exodus.

The text names them as the ones who start this complaint first.

🚶 Non Israelites who left Egypt with them

📖 Named already back in Exodus 12

😤 They start this complaint first

➡️ The rest of Israel picks it up next

## 😤 Fell A Lusting

"Lusting" here means a strong, uncontrolled craving for food, not anything sexual.

It spreads through the whole camp like a sudden mood.

The word choice shows this is not a reasonable request for variety.

It reads as an overwhelming, almost uncontrollable desire.

🍖 Means a strong craving, specifically for food

😤 Spreads through the camp like a mood

📖 Not a reasonable request, an overwhelming one

➡️ Sets the tone for the whole complaint

## ❓ Who Shall Give Us Flesh To Eat

The specific complaint is about meat, not food in general.

Israel already has bread from heaven every single morning, called manna.

This is not about hunger.

It is about wanting something different from what God is already faithfully providing.

🍖 A craving for meat specifically

🍞 They already have daily bread from heaven

😤 Not hunger, a craving for variety

➡️ Faithful provision gets read as not enough

## 🐟 We Remember The Fish, Which We Did Eat In Egypt Freely

"Freely" means without cost, not without effort.

The Nile River was full of fish, so it really was cheap and easy to get.

The people leave out that they ate this free fish as slaves under Pharaoh.

Their memory of Egypt keeps the good and quietly erases the forced labor.

🐟 Freely means cheap, from the Nile

⛓️ They ate it while enslaved

😔 A one sided memory of Egypt

📖 Nostalgia can erase real suffering

## 🥒 The Cucumbers, And The Melons, And The Leeks, And The Onions, And The Garlick

These are real garden vegetables that grew easily in Egypt's irrigated fields.

None of them need much explaining beyond being common, everyday produce.

Listing five foods by name makes the complaint feel vivid and specific.

The detail makes the plain manna in front of them feel duller by comparison.

🥒 Common vegetables from Egypt's irrigated fields

📝 A specific list, not a vague memory

😋 Makes the complaint feel vivid

➡️ The manna feels duller by comparison

## 😔 Our Soul Is Dried Away

This is a Hebrew idiom for total exhaustion and emptiness, not just an empty stomach.

"Soul" here means the whole person, body and spirit together.

It is a dramatic way of saying life itself feels drained, all over a food complaint.

The intensity of the words shows how much this craving has taken over.

😔 An idiom for whole person exhaustion

🫀 Soul means the whole person here

😤 Dramatic language for a food complaint

➡️ Shows how far the craving has spread

## 🌾 The Manna Was As Coriander Seed

This matches how manna already gets described back in Exodus 16, small, round, and pale.

Coriander seed gives a sense of the actual size.

The color is compared to bdellium, a pale, light colored natural resin.

The narrator pauses here almost as a reminder of what a strange, wonderful substance manna is.

🌾 Matches the description already in Exodus 16

💎 Bdellium is a pale natural resin

📏 Coriander seed gives a sense of size

📖 A reminder of how strange this food is

## ⚒️ Ground It In Mills, Or Beat It In A Mortar

Manna was not eaten raw straight off the ground.

People ground or pounded it first, then baked it into cakes, real work every single day.

This quietly undercuts the complaint that follows.

The people are not rejecting manna because it takes real work.

They are only bored of eating the same thing every day.

⚒️ Had to be ground, then baked

👩‍🍳 Daily preparation, not effortless food

😤 The people are bored, not overworked

➡️ Undercuts the idea manna was too easy

## 🌙 When The Dew Fell Upon The Camp In The Night

Manna arrived quietly overnight, together with the dew, like a daily gift.

This is a small, easy to miss detail.

The quietness of the miracle may be part of why it stopped feeling miraculous.

Something that happens every single night without fail becomes easy to take for granted.

🌙 Arrived quietly overnight with the dew

😴 A daily miracle, easy to miss

😐 Quiet miracles can stop feeling miraculous

📖 Faithfulness can look ordinary if it never stops

# Numbers 11:10-15
# 😩 Moses Reaches His Breaking Point
---
## 😭 Every Man In The Door Of His Tent

This detail shows the weeping was not private.

Every family cried out loud, right at their own tent entrance, where everyone could see and hear.

A whole camp visibly falling apart creates a very different mood than a few isolated complaints.

Moses is surrounded by it from every side.

😭 Public weeping, not private grumbling

⛺ Happening at every family's tent door

😤 A whole camp visibly falling apart

➡️ Moses is surrounded on every side

## 🔥 The Anger Of The Lord Was Kindled Greatly

Two different reactions show up side by side here.

God is angry at the people's ingratitude.

Moses is frustrated on top of that, worn down by the weight of leading them.

This sets up the raw honesty of the prayer that follows.

🔥 God's anger and Moses' frustration, both named

😤 Moses is worn down, not just calm

🙏 Sets up the raw prayer that follows

➡️ Even Moses reaches a breaking point

## 😩 Wherefore Hast Thou Afflicted Thy Servant

Moses speaks to God with raw, almost accusing honesty.

He is asking God directly why this job feels like punishment.

The Bible allows this kind of honest complaint straight to God.

The same kind of raw prayer shows up later in Psalms and in prophets like Jeremiah.

😩 A raw, almost accusing question

🗣️ Honest complaint prayed straight to God

📜 A pattern that continues in Psalms

📖 Also seen later in Jeremiah

## ⚖️ That Thou Layest The Burden Of All This People Upon Me

"Burden" is a weight picture for responsibility.

It stands for the emotional and practical load of leading a whole complaining nation.

Moses names this weight directly instead of quietly enduring it.

It becomes the exact word God answers a few verses later.

⚖️ Burden pictures leadership as a weight

🗣️ Moses names the weight out loud

🔁 The exact word God answers later

📖 Naming the load is not weakness

## ❓ Have I Conceived All This People

This is a rhetorical question with an obvious answer, no.

Moses is not Israel's father.

He did not create this nation.

He is pointing out that the people belong to God by covenant promise.

Providing for them was never a job Moses could carry alone.

❓ A rhetorical question, the answer is no

👪 Israel belongs to God by covenant

😤 Moses did not create this nation

➡️ Points the responsibility back toward God

## 👶 As A Nursing Father Beareth The Sucking Child

"Nursing father" is an unusual, vivid image, a father doing a nursing mother's job.

Moses feels expected to give this kind of constant, tender care to a whole nation.

It is a role he never signed up to fill.

He does not feel equipped to carry it alone.

👶 A father doing a nursing mother's job

😩 Constant care Moses never signed up for

😔 A role he feels unequipped to fill

➡️ One person cannot carry a whole nation

## 🍖 Whence Should I Have Flesh To Give Unto All This People

This is a genuine, practical question about impossible logistics.

Feeding meat to hundreds of thousands of people is not something one leader could arrange.

The scale of the problem sets up the exact math Moses lists a few verses later.

This is not exaggeration, it is a real, practical worry.

🍖 A real question about impossible logistics

🔢 Sets up the math Moses gives later

😤 Not exaggeration, a genuine worry

➡️ The scale of the need feels impossible

## 😮‍💨 I Am Not Able To Bear All This People Alone

"Heavy" repeats the same weight picture as "burden" from a few verses earlier.

Moses says plainly that this load has become more than one person can carry.

This is not Moses failing at his job.

It is an honest admission that no single person was ever meant to carry a whole nation alone.

⚖️ Heavy repeats the earlier burden picture

😮‍💨 A plain admission of a real limit

😔 Not failure, just an honest limit

📖 No one carries a nation alone

## 😰 Let Me Not See My Wretchedness

"Wretchedness" means ongoing trouble, not personal sin or guilt.

Moses asks to be spared from watching more of this suffering play out.

He even asks to die rather than keep carrying this weight, a shocking, desperate request.

This is the raw, unfiltered end of a prayer with no attempt to sound composed.

😞 Wretchedness means ongoing trouble, not sin

😰 Moses even asks to die instead

🙏 A raw prayer with no composure

📖 God can hear a prayer this honest

# Numbers 11:16-20
# 👴 Seventy Elders And A Month Of Meat
---
## 👴 Gather Unto Me Seventy Men Of The Elders

Seventy is a meaningful number, echoing the seventy elders who already went partway up Sinai with Moses.

This is not a brand new idea.

It expands something already established.

"Whom thou knowest" means God is not asking Moses to pick strangers.

These are already recognized leaders the people already trust.

🔢 Seventy echoes the elders from Sinai

👴 Whom thou knowest means already trusted leaders

🔁 Expands existing leadership, not a new system

➡️ God builds on what already works

## 📋 Officers Over Them

"Officers" is a different role from elders, closer to administrators or record keepers.

The same word describes the Israelite foremen forced to enforce Pharaoh's brick quotas back in Exodus 5.

Pairing elders with officers means wisdom and organization both get shared.

Leadership here is not just spiritual authority.

It is also practical structure.

📋 Officers means administrators, a different role

🧱 Also names the foremen in Exodus 5

🤝 Wisdom and organization shared together

➡️ Leadership needs structure, not just authority

## 🕊️ I Will Take Of The Spirit Which Is Upon Thee

This does not mean Moses ends up with less of the Spirit.

Sharing is not the same as slicing a pie into smaller pieces.

The same kind of empowerment God gave Moses now gets extended to others too.

Sharing responsibility here means sharing real spiritual authority, not just handing off busywork.

🕊️ Not division, Moses loses nothing

🤝 The same empowerment extended to others

😤 Not just busywork, real authority

📖 Shared leadership does not mean less leadership

## 🧼 Sanctify Yourselves Against To Morrow

"Sanctify" means a ritual act of preparation, getting ready to receive something significant from God.

The announcement sounds like good news on the surface, meat is coming.

The rest of the passage reveals this gift is actually framed as judgment in disguise.

It is a warning wrapped inside what sounds like a reward.

🧼 Sanctify means ritual preparation

🍖 Sounds like a reward on the surface

⚖️ Actually framed as judgment

➡️ A warning wrapped inside good news

## 👂 Ye Have Wept In The Ears Of The Lord

This is a vivid, physical way of saying God directly and personally heard every complaint.

God was not simply aware of it from a distance.

This matches the pattern already seen in verse one.

There, the Lord heard the people complaining before the fire broke out.

Nothing about their complaint went unnoticed.

👂 Pictures God personally hearing every word

🔥 Matches the Lord heard it from verse one

😤 Not distant awareness, direct hearing

📖 Nothing said in complaint goes unnoticed

## 🔢 Not Eat One Day, Nor Two Days, Nor Five Days

The list escalates on purpose, one day, two days, five days, each number bigger than the last.

It works like a countdown building toward something bigger.

The buildup makes the actual answer that follows land with much more force.

A whole month is far worse than any number in this list.

🔢 An escalating list, on purpose

⏳ Works like a countdown

😤 Builds toward a bigger answer

➡️ Makes the real answer land harder

## 🤢 Until It Come Out At Your Nostrils, And It Be Loathsome Unto You

This is a disturbing, almost sickening image on purpose.

So much meat for so long that it turns sickening instead of satisfying.

This is not framed as a reward for asking.

It is a corrective consequence, meant to teach the people what they were really asking for.

🤢 A deliberately sickening image

⚖️ Framed as correction, not reward

😤 So much meat it becomes torment

📖 Meant to teach a lesson

## ⛺ Because That Ye Have Despised The Lord Which Is Among You

This names the real charge behind the punishment.

It is not just about wanting different food.

It is about rejecting God's provision and His presence living right there in the camp.

"Despised" is a strong word, showing this goes past pickiness into real disrespect toward God.

⛺ God's presence lives in the camp

😤 Despised is strong, past pickiness

⚖️ The real charge is rejecting God

📖 Not about the menu, about God

# Numbers 11:21-23
# 🤔 Moses Doubts, God Answers
---
## 🔢 Six Hundred Thousand Footmen

This matches the exact census number from Numbers chapter one, over six hundred thousand fighting men.

That count does not even include women, children, or the elderly.

The real total population was likely several million people.

Moses brings up this number to show how impossible God's promise sounds from a human point of view.

🔢 Matches the census count from chapter one

👪 Does not count women or children

📏 The real population was far larger

➡️ Used to show an impossible scale

## 🐑 Shall The Flocks And The Herds Be Slain For Them

Moses does the math out loud.

Even slaughtering every animal Israel owns would not feed this many people for a whole month.

He asks whether even every fish in the sea could be gathered for them instead.

This is honest problem solving, not defiance.

🐑 Even all their livestock is not enough

🐟 Even every fish in the sea

🧮 Honest math, not open defiance

➡️ A real limit, from a human view

## ✋ Is The Lord's Hand Waxed Short

"Waxed short" is an old way of saying grown weak or limited.

God's "hand" is a common Bible picture for His power to act.

This is a direct, pointed question aimed at Moses' doubt.

It is a firm reminder that the real question was never about God's power.

✋ Hand pictures God's power to act

📏 Waxed short means grown weak

⚖️ A firm rebuke of doubt

📖 The real question was never God's power

## 🔮 Thou Shalt See Now Whether My Word Shall Come To Pass

Instead of arguing the math with Moses, God simply promises to prove it by doing it.

Actions will settle the doubt here, not more explanation.

This sets up the very next part of the story, where the promised meat actually arrives.

Proof follows this promise within the very same chapter.

🗣️ God answers with proof, not argument

🔮 Settles doubt by demonstration

🍖 Sets up the quail that follows

📖 Proof arrives within this same chapter

# Numbers 11:24-30
# 🗣️ The Spirit Rests On Seventy Men And Two More
---
## ⛺ Set Them Round About The Tabernacle

This is the formal, visible moment God's plan from verse sixteen actually happens.

Moses gathers the seventy elders and arranges them in a circle around the tabernacle.

Doing it this way makes the ceremony public and orderly.

Everyone in view can see exactly who has just received a new share of leadership.

⛺ The formal moment the plan happens

👥 Arranged visibly, so the camp can see

🔁 Carries out the plan from verse sixteen

➡️ A public ceremony, not a quiet one

## ☁️ The Lord Came Down In A Cloud

This is the same kind of visible divine appearance already seen at Sinai.

God's presence is not abstract here.

It is described as physically coming down.

Repeating this pattern reminds the reader that this is the same God who spoke from the mountain.

☁️ A visible appearance, like at Sinai

👁️ God's presence pictured as physically descending

🔁 Ties this event back to Sinai

📖 The same God who spoke from the mountain

## 🕊️ Took Of The Spirit That Was Upon Him

This confirms exactly what God promised back in verse seventeen.

Empowerment gets shared with others here, not drained away from Moses.

The event happens in full view of the camp.

That makes it clear this authority truly comes from God.

It does not come from Moses simply picking favorites.

🕊️ Confirms the promise from verse seventeen

👀 Happens visibly, in front of the camp

😤 Moses loses nothing by sharing it

📖 The authority comes from God, not favoritism

## 🗣️ They Prophesied, And Did Not Cease

"Prophesied" here most likely means spontaneous, spirit filled speech or praise.

It works as a visible, public sign confirming these seventy men were genuinely equipped for the job.

It functioned like a one time proof to the whole watching camp.

It was not a permanent new role each elder would keep performing every day.

🗣️ Likely spontaneous, spirit filled speech

✅ A public sign their new role was real

⏳ A one time proof, not daily practice

➡️ Confirms the calling without repeating it

## 🚶 There Remained Two Of The Men In The Camp

Eldad and Medad never made it out to the tabernacle with the other elders.

The Spirit rested on them anyway, right where they already were.

God's Spirit is not limited by physical location.

It is also not limited by whether someone made it to the official ceremony on time.

🚶 Did not make it to the tabernacle

🕊️ The Spirit rested on them anyway

📍 Not limited by physical location

➡️ Not limited by official timing either

## 📝 They Were Of Them That Were Written

"Written" means these two were already enrolled on the original list of seventy chosen elders.

They were not outsiders or impostors, just absent from the ceremony itself.

This detail matters for what happens next.

It means their prophesying is legitimate, not something Joshua is right to be alarmed about.

📝 Already listed among the seventy

✅ Absent, but not outsiders

😤 Sets up Joshua's coming alarm

➡️ Their prophesying is fully legitimate

## 🏃 A Young Man Ran, And Told Moses

The urgency of running suggests this seemed alarming to the person watching.

The activity was happening outside the official ceremony at the tabernacle.

It gets reported almost like a problem needing Moses' attention.

This sets up Joshua's reaction in the very next verse.

🏃 The running suggests real urgency

❓ Reported like a problem, not good news

⛺ Happening outside the official ceremony

➡️ Sets up Joshua's reaction next

## 🛡️ My Lord Moses, Forbid Them

Joshua is already introduced as Moses' close assistant back in Exodus.

He reacts protectively here, wanting Moses to shut this down.

His concern seems to be about protecting order and Moses' unique authority.

He treats this unofficial prophesying as a kind of threat.

🛡️ Joshua, already Moses' close assistant

⚠️ Worried about order and Moses' status

😤 Treats it like a threat

➡️ Wants Moses to shut it down

## ❓ Enviest Thou For My Sake

Moses answers with a pointed question of his own.

Is Joshua really concerned about God's order, or protecting Moses' own reputation instead?

It is a gentle but direct challenge.

It asks Joshua to examine his own motive instead of assuming his instinct was automatically right.

❓ A pointed question back at Joshua

🪞 Asks Joshua to examine his motive

😤 Gentle correction, not harsh anger

➡️ Challenges the real reason for concern

## 🙌 Would God That All The Lord's People Were Prophets

This is a remarkably generous, forward looking wish from Moses.

He shows zero jealousy over sharing his unique authority as widely as possible.

Centuries later, the prophet Joel pictures this exact kind of widespread outpouring of God's Spirit.

The apostle Peter points back to this same promise at Pentecost in the book of Acts.

🙌 A generous wish, zero jealousy

📜 Echoed later by the prophet Joel

📖 Peter points back to it at Pentecost

➡️ Moses wanted this for everyone

# Numbers 11:31-35
# 🪶 Quails And The Graves Of Craving
---
## 🌬️ There Went Forth A Wind From The Lord

Quail migrations across this region were a real, natural seasonal event.

Birds exhausted from flying low enough to be caught by hand were common at this time of year.

God uses an ordinary natural process to deliver an extraordinary, precisely timed answer.

A natural means does not make this any less miraculous.

🌬️ Quail migrations were a real seasonal event

⏰ The timing lines up with God's promise

🔮 A natural process, a supernatural purpose

📖 Ordinary means can carry an extraordinary answer

## 📏 Two Cubits High Upon The Face Of The Earth

A cubit is about a foot and a half, so two cubits is about three feet deep.

That is an enormous, almost overwhelming layer of birds covering the ground.

This description shows the answer to Moses' doubt was not modest or careful.

It was extravagant, far beyond what the math in verse twenty two seemed to allow.

📏 About three feet deep in quail

🤯 An extravagant amount, not a modest one

😤 Far beyond what the math suggested

➡️ Answers Moses' doubt with abundance

## 📦 He That Gathered Least Gathered Ten Homers

A homer is a large unit of dry measure, somewhere between sixty and ninety gallons.

Even the person with the smallest haul still ended up with an enormous personal supply.

This directly answers the question about gathering all the fish of the sea.

The answer turns out to be an emphatic yes, and then some.

📦 A homer is a huge unit of measure

🥇 Even the smallest haul was enormous

❓ Answers the earlier question about the sea

📖 God's answer is yes, and then some

## ☀️ Spread Them All Abroad For Themselves

Drying meat in the sun was a common, practical way to preserve food in the ancient world.

There was no refrigeration then, so the sun did the work instead.

The huge effort needed to spread and dry this much meat shows just how much quail actually fell.

It paints a picture of total, overwhelming abundance.

☀️ Sun drying was a normal method

🌾 The huge effort shows the true scale

🤯 A picture of total abundance

➡️ Even preserving the gift took real work

## 👄 While The Flesh Was Yet Between Their Teeth

This is a strikingly immediate, vivid detail.

Judgment strikes at the very moment people are still chewing their first bites of meat.

The timing ties the punishment directly to the sin itself.

It draws an unmistakable line between craving meat and the consequence that follows.

👄 Strikingly immediate, mid first bite

⚡ Ties judgment straight to the craving

😤 Not a delayed consequence, an instant one

➡️ An unmistakable line between sin and result

## ⚖️ The Wrath Of The Lord Was Kindled Against The People

The meat itself was never the real problem.

This plague is a consequence for the contempt behind the complaint.

It is about treating God's daily provision and presence with real disrespect.

Getting exactly what was demanded does not always turn out to be a blessing.

🍖 The meat was not the problem

⚖️ A consequence for real disrespect

😤 Contempt, not hunger, caused this

📖 What you demand is not always a blessing

## ⚰️ He Called The Name Of That Place Kibrothhattaavah

"Kibrothhattaavah" means graves of craving in Hebrew.

It is a permanent, sobering name for a place.

It matches the naming pattern already seen at Taberah earlier in this same chapter.

Every time Israel hears this name again, it remembers exactly what happened here.

⚰️ Means graves of craving in Hebrew

🔥 Matches the Taberah naming pattern

😤 A sobering, permanent name

📖 A built in reminder of the lesson

## 🗺️ The People Journeyed From Kibrothhattaavah Unto Hazeroth

This short travel note quietly sets up the next chapter.

Hazeroth is exactly where Miriam and Aaron will challenge Moses' unique authority.

Even a brief geography note is often doing more work than it looks.

It connects one story directly into the next.

🗺️ Hazeroth is the setting for what comes next

👨‍👩‍👧 Miriam and Aaron's challenge happens there

🔁 A quiet transition between stories

➡️ Sets up the next chapter's conflict
`.trim();

export const NUMBERS_ELEVEN_PERSONAL_SECTIONS = parseNumbersElevenRawNotes(NUMBERS_ELEVEN_RAW_NOTES);
