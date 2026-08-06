export type DeuteronomySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomySixRawNotes(rawText: string): DeuteronomySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 6:${startVerse}` : `Deuteronomy 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Deuteronomy 6 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_SIX_RAW_NOTES = `# Deuteronomy 6:1-3
# 📜 Why These Commands Were Given
---
## 📜 The Commandments And The Statutes And The Judgments

"Commandments" means direct orders for specific actions.

"Statutes" means fixed rules carved into permanent practice.

"Judgments" means rulings that settle disputes between people.

Moses uses all three words together in one sentence.

That covers every angle of a life under God's law.

📜 Commandments means direct orders

🪨 Statutes means fixed permanent rules

⚖️ Judgments means rulings for disputes

📖 Together they cover the whole of life

## 🗺️ That Ye Might Do Them In The Land Whither Ye Go To Possess It

The goal was never simply to hear these laws.

The goal was to live by them once inside the land.

Israel had wandered outside the land for forty years already.

These commands were made for real life, not just for listening.

🎯 The goal was obedience, not just hearing

🗺️ The land is where the law gets applied

⏳ Forty years of wandering are ending

📖 God's law is made for real life

## 😨 That Thou Mightest Fear The Lord Thy God

"Fear" here does not mean being scared.

It means deep reverence and awe toward God.

The same word describes how a subject would respect a king.

That respect shapes how someone lives, not just how they feel.

😨 Fear here does not mean terror

👑 Reverence like a subject before a king

🙏 Respect for God shapes daily choices

📖 Fear leads to obedience, not fright

## 👨‍👦 Thou And Thy Son And Thy Son's Son

This law was never meant for one generation alone.

Moses names three generations in a row on purpose.

A father teaching a son who then teaches his own son.

The chain was meant to run for as long as the family lasted.

👨‍👦 Three generations named on purpose

🔁 Fathers were meant to teach sons

♾️ The chain was meant to continue

📖 God's law outlives any one generation

## 📆 That Thy Days May Be Prolonged

Long life in the land is tied directly to obedience here.

This is not a magic guarantee for every individual choice.

It describes the normal pattern for a whole nation staying faithful.

A nation that keeps God's law tends to endure in its land.

📆 Long days means a long life

🚫 Not a promise for every single choice

🏛️ It describes a whole nation's pattern

📖 Faithfulness and endurance move together

## 📈 That Ye May Increase Mightily

This links obedience to real growth in population.

A small group of former slaves is promised to become a strong nation.

That promise reaches all the way back to God's promise to Abraham.

Growing numbers were a visible sign that God was keeping His word.

📈 Obedience is linked to population growth

👥 Former slaves promised to become a strong nation

📜 The promise traces back to Abraham

📖 Growing numbers proved God kept His word

## 🍯 A Land That Floweth With Milk And Honey

This phrase describes a land rich enough to support life easily.

"Milk" points to healthy flocks and herds grazing on good pasture.

"Honey" likely refers to the sweet syrup made from dates, not only bee honey.

The picture is abundance, not luxury.

🐐 Milk points to healthy flocks

🍯 Honey likely means date syrup

🌿 The land supports life easily

📖 The picture is abundance, not luxury

# Deuteronomy 6:4-9
# 🕎 Hear O Israel
---
## 🕎 Hear O Israel The Lord Our God Is One Lord

This verse is called the Shema, the Hebrew word for hear.

It is the central declaration of faith in the entire Old Testament.

"One" means there is no other god beside the Lord.

It also carries the sense of a united, undivided being.

Jewish tradition still recites this verse every single day.

🕎 Called the Shema, meaning hear

☝️ One means there is no other god

🔗 One also means undivided

📖 Still recited daily in Jewish tradition

## ❤️ Thou Shalt Love The Lord Thy God

"Love" here means far more than a feeling.

In covenant language, love means loyalty and total commitment.

It is the same kind of love a spouse owes a spouse.

God asks for the same devotion He gives His people.

❤️ Love here means loyalty, not just feeling

🤝 Covenant love means total commitment

💍 Similar to the loyalty in a marriage

📖 God gives the same devotion He asks for

## 💪 With All Thine Heart And With All Thy Soul And With All Thy Might

This command names three different parts of a whole person.

"Heart" means the mind and the will.

"Soul" means a person's whole life and being.

"Might" means physical strength and everything a person owns.

Nothing about a person is left outside this command.

❤️ Heart means the mind and will

🌬️ Soul means a person's whole being

💪 Might means strength and possessions

📖 Total love leaves nothing out

## 📥 These Words Which I Command Thee This Day Shall Be In Thine Heart

This adds something the earlier commands did not require.

The law had to move from outward action into inward belief.

A person could obey without ever loving what they obeyed.

God asks for the heart to actually agree with the command.

❤️ The law must reach the heart

🚫 Outward obedience alone is not enough

🙏 God wants agreement, not just action

📖 Belief and obedience are meant to match

## 📚 Thou Shalt Teach Them Diligently Unto Thy Children

"Diligently" means repeated, careful, and intentional effort.

This is not a single lesson taught once and forgotten.

Parents carried the main responsibility for passing down the faith.

No school or priest could replace that daily job.

📚 Diligently means repeated and careful teaching

🔁 Not a one time lesson

👨‍👩‍👧 Parents carried the main responsibility

📖 Faith was passed down at home

## 🚶 When Thou Sittest In Thine House And When Thou Walkest By The Way

This phrase lists four ordinary moments of daily life.

Sitting at home, walking outside, lying down, and getting up.

Together those four moments cover an entire day.

Teaching God's words was meant to fill ordinary time, not just formal moments.

🏠 Sitting at home is one moment

🚶 Walking on the road is another

🌙 Lying down and rising up complete the day

📖 Teaching filled ordinary time, not just formal moments

## ✋ Bind Them For A Sign Upon Thine Hand And As Frontlets Between Thine Eyes

"Frontlets" means bands worn across the forehead.

This command became the origin of a real Jewish practice called tefillin.

Small leather boxes holding scripture verses are strapped to the arm and forehead.

The hand represents a person's actions.

The forehead represents a person's thoughts.

🎀 Frontlets means bands worn on the forehead

📦 This became the Jewish practice of tefillin

✋ The hand represents a person's actions

➡️ God's words shape the mind too

## 🚪 Write Them Upon The Posts Of Thy House And On Thy Gates

This command became the origin of the mezuzah.

A mezuzah is a small case holding scripture, fixed to a doorframe.

Doorposts and gates were the most public parts of any home.

Everyone entering or leaving would see a visible sign of faith.

🚪 This became the Jewish practice of the mezuzah

📜 A mezuzah holds scripture on the doorframe

👀 Doorposts and gates were the most public spot

📖 Faith was meant to be visible, not hidden

# Deuteronomy 6:10-12
# 🏡 Houses You Did Not Build
---
## 🏙️ Great And Goodly Cities Which Thou Buildedst Not

Israel is about to inherit cities they never built themselves.

Canaanite peoples had already built roads, walls, and homes over generations.

That inheritance was a gift, not a personal achievement.

Blessings that come free are easy to take credit for anyway.

🏙️ Cities already built by other nations

🎁 The inheritance was a gift

🚫 Not something Israel earned by labor

📖 Free blessings are easy to misclaim

## 📦 Houses Full Of All Good Things Which Thou Filledst Not

These homes would already be stocked with food, tools, and goods.

Nothing needed to be built or gathered again.

An entire life's worth of preparation was handed over already finished.

That kind of ease can make a gift feel ordinary.

🏠 Houses already full of goods

📦 Nothing needed to be gathered first

🎁 A finished life, handed over

📖 Ease can hide where a blessing came from

## 🕳️ Wells Digged Which Thou Diggedst Not Vineyards And Olive Trees Which Thou Plantedst Not

Digging a well by hand in this region took real skilled labor.

Vineyards and olive trees took years to mature before producing fruit.

Israel would step into decades of someone else's patient work.

None of that patience or labor belonged to them.

🕳️ Wells took real skilled labor to dig

🍇 Vineyards took years to mature

🫒 Olive trees took just as long

📖 Israel inherited decades of patient work

## 👀 Then Beware Lest Thou Forget The Lord Which Brought Thee Forth Out Of The Land Of Egypt From The House Of Bondage

"Beware" means stay alert, not just be careful once.

Comfort and full pantries make it easy to forget who provided them.

"House of bondage" is another name for slavery in Egypt.

The warning is that ease can erase memory faster than hardship can.

👀 Beware means stay alert, not just careful once

🍞 Full pantries can dull memory

⛓️ House of bondage means slavery in Egypt

📖 Comfort forgets faster than hardship does

# Deuteronomy 6:13-15
# ⚡ A Jealous God
---
## 🙏 Thou Shalt Fear The Lord Thy God And Serve Him

Fear and service are paired together here on purpose.

Reverence without action is empty.

Action without reverence becomes empty ritual.

Real worship holds both together at the same time.

🙏 Fear and service are paired on purpose

💨 Reverence without action is empty

⚙️ Action without reverence is empty ritual

📖 Real worship holds both together

## 🤝 Shalt Swear By His Name

Swearing an oath meant calling on a god as a witness to a promise.

Every nearby nation had its own gods available for this kind of oath.

Israel is told to use only the Lord's name for that purpose.

An oath by another god would treat that god as real and equal.

🤝 An oath called on a god as witness

🌍 Other nations had many gods for oaths

☝️ Israel could only swear by the Lord

📖 An oath names who a person really trusts

## 🌦️ Ye Shall Not Go After Other Gods

Canaan was full of local gods tied to weather, crops, and fertility.

Following one of those gods meant more than private belief.

It meant joining that god's rituals and often its temple practices.

The warning is aimed at real neighbors Israel was about to live beside.

🌦️ Local gods claimed power over weather and crops

🛕 Following a god meant joining its rituals

🏘️ These were Israel's actual future neighbors

📖 The warning was aimed at a real threat

## 💍 The Lord Thy God Is A Jealous God

"Jealous" here does not mean petty envy.

It describes a husband's rightful claim to full loyalty from a spouse.

God had entered a covenant with Israel like a marriage.

Sharing that loyalty with another god broke the relationship at its core.

💍 Jealous here means a husband's rightful claim

🚫 Not petty envy

🤝 The covenant worked like a marriage

📖 Shared loyalty would break the relationship

## 🔥 Lest The Anger Of The Lord Be Kindled Against Thee And Destroy Thee

This warning is severe on purpose.

"Kindled" pictures anger catching like a fire.

The threat is not a small inconvenience or a scolding.

Breaking covenant loyalty put the nation's very existence at risk.

🔥 Kindled pictures anger catching like fire

⚠️ The warning is severe on purpose

🚫 Not a small inconvenience

📖 Covenant loyalty was tied to survival itself

# Deuteronomy 6:16-19
# 🪨 Do Not Test The Lord
---
## 🧪 Ye Shall Not Tempt The Lord Your God

"Tempt" here means to test or put someone to the proof.

It is not about resisting a personal urge to sin.

It means demanding that God prove Himself on command.

That demand treats God like a servant who owes evidence.

🧪 Tempt means to test or demand proof

🚫 Not about resisting a personal urge

👑 It treats God like He owes evidence

📖 Trust does not need a fresh test

## 📍 As Ye Tempted Him In Massah

"Massah" means testing, and it names a real place in the wilderness.

Israel had run out of water there and doubted God was even with them.

That story is told fully back in Exodus chapter seventeen.

Moses brings up that failure now as a warning, not a distant memory.

📍 Massah means testing

💧 Israel doubted God during a water shortage

📖 The story is told in Exodus seventeen

➡️ Moses uses it as a direct warning

## 🔁 Ye Shall Diligently Keep The Commandments Of The Lord Your God

"Diligently" appears again here, the same word used back in verse seven.

Obedience was never meant to be occasional or half hearted.

The word calls for steady, repeated effort over time.

Moses repeats key words on purpose throughout this chapter.

🔁 Diligently repeats the word from verse seven

🚫 Not occasional or half hearted obedience

⏳ It calls for steady effort over time

📖 Real obedience does not come and go

## ⚖️ That Which Is Right And Good In The Sight Of The Lord

This goes further than simply following the letter of the law.

A person could technically obey every rule and still act unfairly.

God asks for right and good behavior, not just legal compliance.

That standard reaches into motives, not only actions.

⚖️ Goes beyond the letter of the law

🚫 Technical obedience is not always fair

❤️ God asks for right and good behavior

📖 The standard reaches into motives too

## ⚔️ To Cast Out All Thine Enemies From Before Thee

This promise ties directly back to obedience in the verses just before it.

"Cast out" describes driving nations out of the land ahead of Israel.

The conquest itself depended on Israel keeping its side of the agreement.

Nothing about the land was guaranteed without that obedience.

⚔️ Cast out means driving nations from the land

🤝 The promise depended on Israel's obedience

🗺️ The conquest and the covenant were linked

📖 God's promises and Israel's obedience moved together

# Deuteronomy 6:20-25
# 👶 Teaching The Next Generation
---
## ❓ When Thy Son Asketh Thee In Time To Come

Moses is speaking to a generation that lived through the Exodus firsthand.

He knows their children and grandchildren will not share that memory.

This verse plans ahead for a question that has not been asked yet.

Faith had to survive past the people who first experienced it.

👴 Moses addressed the Exodus generation

👶 Their children would not share that memory

❓ The verse plans for a future question

📖 Faith had to outlive firsthand memory

## ⛓️ We Were Pharaoh's Bondmen In Egypt

"Bondmen" means slaves, owned and controlled by someone else.

The answer to the child's question starts with total honesty.

Israel's story does not begin with power or glory.

It begins with slavery under a foreign king.

⛓️ Bondmen means slaves

🗣️ The answer starts with total honesty

🚫 Israel's story does not start with power

📖 Freedom only means something next to slavery

## 💪 The Lord Brought Us Out Of Egypt With A Mighty Hand

"Mighty hand" is a common Old Testament picture for God's raw power in action.

It describes an act of force strong enough to overturn Pharaoh's empire.

The escape from Egypt was not luck or negotiation.

It was God intervening directly and visibly.

💪 Mighty hand pictures God's raw power

👑 Strong enough to overturn Pharaoh's empire

🚫 Not luck or negotiation

📖 God intervened directly and visibly

## 🐸 The Lord Shewed Signs And Wonders Great And Sore Upon Egypt

"Shewed" is an old spelling of showed.

"Signs and wonders" refers to the plagues described in Exodus.

"Sore" here means severe, not painful in the modern sense of the word.

These were public, undeniable events, not private miracles.

✍️ Shewed is an old spelling of showed

🐸 Signs and wonders means the plagues

⚠️ Sore here means severe

📖 These events were public and undeniable

## 👁️ Before Our Eyes

This phrase insists the plagues were witnessed firsthand, not secondhand rumor.

The generation giving this account actually saw the events happen.

That firsthand testimony gave the story real weight for their children.

👁️ The plagues were seen firsthand

🗣️ This generation was a real eyewitness

👶 Firsthand testimony carried real weight

📖 Eyewitness memory anchored the story

## 🚪 That He Might Bring Us In To Give Us The Land

The Exodus was never the finish line by itself.

Freedom from Egypt existed to lead somewhere specific.

The land promised to Abraham was always the actual destination.

Rescue and promise are connected steps in the same plan.

🚪 The Exodus was not the finish line

🗺️ Freedom led toward a specific destination

📜 The land traces back to Abraham's promise

📖 Rescue and promise are one connected plan

## 🎁 Commanded Us To Do All These Statutes For Our Good Always

The law is described here as being for Israel's own benefit.

It was never meant as an arbitrary burden with no purpose.

"For our good always" ties obedience directly to lasting wellbeing.

God's rules were framed as protection, not restriction for its own sake.

🎁 The law existed for Israel's own good

🚫 Not an arbitrary burden

🛡️ Framed as protection, not restriction

📖 Obedience and wellbeing were tied together

## ⚖️ It Shall Be Our Righteousness

"Righteousness" here does not mean earning salvation through good behavior.

It means living faithfully within the covenant relationship already given.

Obedience was the proof of a relationship already in place.

It was never the price paid to start one.

The chapter closes on the same note it opened with.

Love was always meant to lead to obedience.

⚖️ Righteousness here means covenant faithfulness

🚫 Not earning salvation through good behavior

🤝 Proof of a relationship not a price

📖 Love was always meant to lead to obedience
`.trim();

export const DEUTERONOMY_SIX_PERSONAL_SECTIONS = parseDeuteronomySixRawNotes(DEUTERONOMY_SIX_RAW_NOTES);
